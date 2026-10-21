import { computed, useAttrs } from 'vue'

const EDITOR_KEYS = new Set(['key', 'component', '__dataset__', '__loopTile'])

/**
 * Same bind Greemo passes from toSectionBind: content fields as props, and `data` as that same object.
 * Direct fields override the same field on a nested data object.
 */
export function sectionBind(resolved = {}) {
  const content = {}
  if (resolved.data && typeof resolved.data === 'object' && !Array.isArray(resolved.data)) {
    Object.assign(content, resolved.data)
  }
  for (const [key, value] of Object.entries(resolved)) {
    if (EDITOR_KEYS.has(key) || key === 'data') continue
    if (value !== undefined && value !== null) content[key] = value
  }
  if (Array.isArray(resolved.data) && content.items === undefined) content.items = resolved.data
  return { ...content, data: content }
}

/** Read a section block. Direct props win over `data`, matching useSectionProps. */
export function useSectionBlock(props) {
  const attrs = useAttrs()
  const d = computed(() => {
    const fields = {}
    for (const [key, value] of Object.entries(attrs)) {
      if (key === 'class' || key === 'style' || key.startsWith('on')) continue
      fields[key] = value
    }
    return sectionBind({ ...fields, data: props.data }).data
  })
  return { d }
}

/** Field path for one item in the source array, so a filtered list still writes the right record. */
export function itemField(items, item, key = '') {
  const index = Array.isArray(items) ? items.indexOf(item) : -1
  if (index < 0) return ''
  return key ? `items.${index}.${key}` : `items.${index}`
}

/** Read a dotted path such as "audiencePages.businesses" from an object. */
export function getPath(obj, path) {
  if (!path) return undefined
  return String(path).split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj)
}

/**
 * A section block linked to an object dataset, reading one part of it named by `source`
 * (for example {"__dataset__":"sections","source":"featured"}). Returns the block fields (d)
 * and that part (s). Without a source, s is the block fields themselves.
 */
export function useSectionSource(props, fallbackSource = '') {
  const { d } = useSectionBlock(props)
  const s = computed(() => {
    const value = getPath(d.value, d.value.source || fallbackSource)
    return value && typeof value === 'object' ? value : d.value
  })
  return { d, s }
}
