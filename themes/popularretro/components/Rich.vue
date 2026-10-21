<template>
  <component
    :is="as"
    v-if="visible"
    ref="root"
    :class="attrs.class"
    :style="[attrs.style, css]"
    :contenteditable="editable ? 'true' : undefined"
    :data-gm-field="editable ? field : undefined"
    :data-placeholder="editable ? (placeholder || label) : undefined"
    spellcheck="true"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
    @click="onClick"
    @keydown="onKeyDown"
  />
</template>

<script setup>
import { computed, inject, nextTick, onMounted, ref, useAttrs, watch } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  as: { type: String, default: 'span' },
  value: { type: [String, Number], default: '' },
  field: { type: String, default: '' },
  textStyle: { type: Object, default: null },
  placeholder: { type: String, default: '' }
})

const attrs = useAttrs()
const inline = inject('greemoInline', null)
const root = ref(null)
const focused = ref(false)

const editable = computed(() => Boolean(inline) && Boolean(props.field))
const visible = computed(() => editable.value || String(props.value ?? '').trim() !== '')
const label = computed(() => props.field.split('.').filter(part => !/^\d+$/.test(part)).pop() || 'Text')
const css = computed(() => fieldCss(props.textStyle, props.field))

const element = () => {
  const value = root.value
  if (value instanceof HTMLElement) return value
  return value?.$el instanceof HTMLElement ? value.$el : null
}

const formatLocked = () => document.body?.dataset.gmFormat === '1'

const paint = () => {
  const node = element()
  if (!node || focused.value || formatLocked()) return
  node.innerHTML = richText(props.value ?? '')
}

onMounted(() => nextTick(paint))
watch(() => props.value, () => nextTick(paint))

const onFocus = () => {
  if (!editable.value) return
  focused.value = true
  inline.focus(props.field)
}

const onBlur = () => {
  focused.value = false
  inline?.blur(props.field)
  nextTick(paint)
}

const onInput = () => {
  if (!editable.value) return
  inline.update(props.field, element()?.innerHTML || '')
}

const onClick = (event) => {
  if (editable.value) event.preventDefault()
}

const onKeyDown = (event) => {
  if (!editable.value || event.key !== 'Enter' || event.shiftKey) return
  event.preventDefault()
  document.execCommand('insertLineBreak')
  onInput()
}

function fieldCss(textStyle, field) {
  const style = textStyle?.[field]
  if (!style) return null
  const css = {}
  if (style.align === 'left' || style.align === 'center' || style.align === 'right') css.textAlign = style.align
  if (style.size === 'small') css.fontSize = '0.875em'
  if (style.size === 'large') css.fontSize = '1.25em'
  return Object.keys(css).length ? css : null
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

function escapeHtml(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function inlineEm(text = '') {
  const escaped = String(text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return escaped
    .replace(/\[PLACEHOLDER:([^\]]*)\]/g, '<em class="ph">[PLACEHOLDER:$1]</em>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<span>$1</span>')
    .replace(/\n/g, '<br>')
}

const RICH_TAGS = new Set(['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'a', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'hr', 'small', 'sub', 'sup'])

function richText(text = '') {
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
</script>

<style scoped>
[contenteditable='true'] {
  outline: none;
  cursor: text;
}
[contenteditable='true']:hover,
[contenteditable='true']:focus {
  box-shadow: inset 0 -1px 0 rgba(23, 121, 95, 0.45);
}
[contenteditable='true']:empty::before {
  content: attr(data-placeholder);
  opacity: 0.35;
  text-transform: capitalize;
}
</style>
