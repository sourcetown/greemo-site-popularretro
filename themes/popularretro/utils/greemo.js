// Reads Greemo's file format at build time.
// parseGreemoMarkdown mirrors MarkdownParser.parse in greemo/packages/core/src/parser.ts.
// resolveSectionData mirrors resolveSectionBlockData in greemo/apps/web/src/utils/resolveSectionBlockData.ts.

import { reactive } from 'vue'

const themeFiles = import.meta.glob('../data/*.json', { eager: true, import: 'default' })
const siteFiles = import.meta.glob('../../../data/*.json', { eager: true, import: 'default' })

function readCollections(files) {
  return Object.fromEntries(
    Object.entries(files)
      .map(([path, data]) => [path.split('/').pop().replace(/\.json$/, ''), data])
      .filter(([name]) => name !== 'site' && !name.endsWith('.meta'))
  )
}

/** Saved collections. Site data wins over a copy stored inside the theme. */
export const collections = { ...readCollections(themeFiles), ...readCollections(siteFiles) }

/** Live collections from the editor, laid over the saved files. */
const editorData = reactive({})

export function setEditorData(next = {}) {
  for (const key of Object.keys(editorData)) delete editorData[key]
  Object.assign(editorData, next || {})
}

/** Collections a layout should render. Editor data wins while a site is open. */
export function siteData() {
  return { ...collections, ...editorData }
}

export const site = themeFiles['../data/site.json'] || siteFiles['../../../data/site.json'] || {}

export function collectionItems(data) {
  if (Array.isArray(data)) return data.filter(item => item && typeof item === 'object')
  if (data && typeof data === 'object' && Array.isArray(data.items)) return data.items.filter(item => item && typeof item === 'object')
  return []
}

export function findRecord(name, key) {
  const data = siteData()[name]
  // Collections saved as an object keyed by slug (e.g. projects.json { "<slug>": { ... } }).
  if (data && typeof data === 'object' && !Array.isArray(data) && !Array.isArray(data.items) && data[key] && typeof data[key] === 'object') return data[key]
  return collectionItems(data).find(item => item.key === key || item.slug === key || String(item.id) === String(key))
}

function parseFrontmatter(content) {
  const frontmatter = {}
  let offset = 0
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
  if (match) {
    match[1].split('\n').forEach(line => {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) return
      const m = trimmed.match(/^(\w+):\s*(.+)$/)
      if (!m) return
      let value = m[2].trim()
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1)
      else if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1)
      else if (value === 'true') value = true
      else if (value === 'false') value = false
      else if (!isNaN(Number(value)) && value !== '') value = Number(value)
      frontmatter[m[1].trim()] = value
    })
    offset = match[0].length
  }
  return { frontmatter, offset }
}

/** Split a Greemo page into ordered blocks: { type: 'template' | 'layout', name, config } and { type: 'markdown', content }. */
export function parseGreemoMarkdown(content) {
  const { frontmatter, offset } = parseFrontmatter(content)
  const annotations = []
  const commentRegex = /<!--[\s\S]*?-->/g
  let m
  while ((m = commentRegex.exec(content)) !== null) {
    const comment = m[0]
    const kind = comment.includes('layout name=') ? 'layout' : comment.includes('template name=') ? 'template' : null
    if (!kind) continue
    const nameMatch = comment.match(/(?:template|layout)\s+name=["']([^"']+)["']\s+/)
    if (!nameMatch) continue
    const jsonStart = comment.indexOf('{', (nameMatch.index || 0) + nameMatch[0].length)
    if (jsonStart === -1) continue
    let depth = 0
    let jsonEnd = jsonStart
    for (let i = jsonStart; i < comment.length; i++) {
      if (comment[i] === '{') depth++
      if (comment[i] === '}') depth--
      if (depth === 0) { jsonEnd = i + 1; break }
    }
    let config
    try { config = JSON.parse(comment.slice(jsonStart, jsonEnd)) } catch { continue }
    annotations.push({ type: kind, name: nameMatch[1], config, start: m.index, end: m.index + comment.length })
  }
  const blocks = []
  let pos = offset
  for (const a of annotations) {
    const text = content.slice(pos, a.start)
    if (text.trim()) blocks.push({ type: 'markdown', content: text })
    blocks.push({ type: a.type, name: a.name, config: a.config })
    pos = a.end
  }
  const tail = content.slice(pos)
  if (tail.trim()) blocks.push({ type: 'markdown', content: tail })
  return { metadata: frontmatter, blocks }
}

function findDataset(name) {
  const data = siteData()
  if (name in data) return data[name]
  const hit = Object.keys(data).find(k => k.toLowerCase() === String(name).toLowerCase())
  return hit ? data[hit] : undefined
}

/** Flatten a section's annotation config and its linked collections, the same way Greemo's preview does. */
export function resolveSectionData(config = {}, pageContext = {}) {
  let resolved = {}
  const linkedName = config.__dataset__ || (typeof config.data === 'string' && config.data ? '' : pageContext.collection)
  if (linkedName) {
    const data = findDataset(linkedName)
    if (Array.isArray(data)) resolved = { items: data, data }
    else if (data && typeof data === 'object') resolved = { ...data }
  }
  if (typeof config.data === 'string' && config.data) {
    const data = findDataset(config.data)
    if (data !== undefined) {
      if (typeof data === 'object' && !Array.isArray(data)) resolved = { ...data, ...resolved }
      else resolved.data = data
    }
  }
  for (const [key, value] of Object.entries(config)) {
    if (key === '__dataset__' || key === 'data' || key === '__loopTile') continue
    if (value !== undefined && value !== null && value !== '') resolved[key] = value
  }
  const sliceKey = resolved.key || pageContext.objectKey
  if (sliceKey && Array.isArray(resolved.items)) {
    const item = resolved.items.find(i => i?.key === sliceKey || i?.id === sliceKey)
    if (item && typeof item === 'object') resolved = { ...resolved, ...item }
  }
  return resolved
}

/** Menu items for a location, from Greemo's canonical menu dataset (locations + menus mirror). */
export function menuFrom(menu, location) {
  const source = menu || {}
  const loc = source.locations?.[location] || (source.menus || []).find(m => m.location === location || m.id === location)
  return (loc?.items || []).filter(item => item.visible !== false)
}

export function menuItems(location) {
  return menuFrom(siteData().menu, location)
}

/** Field path for one menu item, so an inline edit writes back to that location. */
export function menuField(menu, location, item, prop) {
  const items = menu?.locations?.[location]?.items || []
  const index = items.findIndex(entry => entry && entry.id === item?.id)
  return index < 0 ? '' : `menu.locations.${location}.items.${index}.${prop}`
}

/** Field path for one record in a list collection. */
export function recordField(records, collection, item, prop) {
  const items = Array.isArray(records) ? records : []
  const index = items.findIndex(entry => entry && (entry.key === item?.key || entry.id === item?.id))
  return index < 0 ? '' : `${collection}.${index}.${prop}`
}

/** Basic markdown in plain text: **bold**, *italic*, [label](url), and line breaks. */
export function inlineEm(text = '') {
  const escaped = String(text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return escaped
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label, href) => {
      const safe = safeHref(href)
      return safe ? `<a href="${safe.replace(/"/g, '')}">${label}</a>` : match
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
}

function safeColor(value) {
  const color = String(value || '').trim()
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color)) return color
  const rgb = color.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i)
  if (!rgb) return ''
  const channels = rgb.slice(1, 4).map(Number)
  if (channels.some(channel => channel > 255)) return ''
  return `rgb(${channels.join(', ')})`
}

function safeHref(value) {
  const href = String(value || '').trim()
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href
  if (href.startsWith('/') && !href.startsWith('//')) return href
  return ''
}

const RICH_TAGS = new Set(['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'a', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'hr', 'small', 'sub', 'sup'])

function escapeHtml(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** HTML tags and markdown in the same string. Tags outside the basic set are dropped. */
export function richText(text = '') {
  const raw = String(text ?? '')
  if (!raw) return ''
  if (!/<[a-z][^>]*>/i.test(raw)) return inlineEm(raw)
  const doc = new DOMParser().parseFromString(raw, 'text/html')
  const serialize = (node) => {
    let out = ''
    node.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const value = child.textContent || ''
        if (!value.trim()) {
          if (/[^\n\r\t]/.test(value)) out += ' '
          return
        }
        out += inlineEm(value)
        return
      }
      if (child.nodeType !== Node.ELEMENT_NODE) return
      const tag = child.tagName.toLowerCase()
      if (tag === 'code' || tag === 'pre') {
        out += `<${tag}>${escapeHtml(child.textContent || '')}</${tag}>`
        return
      }
      if (tag === 'br' || tag === 'hr') {
        out += `<${tag}>`
        return
      }
      const inner = serialize(child)
      if (!RICH_TAGS.has(tag)) {
        out += inner
        return
      }
      if (tag === 'b' || tag === 'strong') out += `<strong>${inner}</strong>`
      else if (tag === 'i' || tag === 'em') out += `<em>${inner}</em>`
      else if (tag === 'span') {
        const parts = []
        const weight = child.style.fontWeight
        if (['400', '500', '600', '700', 'normal', 'bold'].includes(weight)) {
          parts.push(`font-weight:${weight === 'normal' ? '400' : weight === 'bold' ? '700' : weight}`)
        }
        const color = safeColor(child.style.color)
        if (color) parts.push(`color:${color}`)
        out += parts.length ? `<span style="${parts.join(';')}">${inner}</span>` : inner
      } else if (tag === 'a') {
        const href = safeHref(child.getAttribute('href'))
        out += href ? `<a href="${href.replace(/"/g, '')}">${inner}</a>` : inner
      } else out += `<${tag}>${inner}</${tag}>`
    })
    return out
  }
  return serialize(doc.body)
}

export function fieldCss(textStyle, field) {
  const style = textStyle?.[field]
  if (!style) return null
  const css = {}
  if (style.align === 'left' || style.align === 'center' || style.align === 'right') css.textAlign = style.align
  if (style.size === 'small') css.fontSize = '0.875em'
  if (style.size === 'large') css.fontSize = '1.25em'
  return Object.keys(css).length ? css : null
}
