const files = import.meta.glob('../layouts/*.json', { eager: true, import: 'default' })

/** Theme layouts. The id is the file name, so new layouts show up without a registry edit. */
export const layouts = Object.entries(files).map(([file, data]) => ({
  id: file.split('/').pop().replace(/\.json$/, ''),
  ...(data && typeof data === 'object' ? data : {})
}))

export function shellFor(all, layoutId) {
  const layout = all.find(item => item.id === layoutId) || null
  if (!layout || layout.kind === 'header' || layout.kind === 'footer') {
    return { layout, header: null, footer: null }
  }
  return {
    layout,
    header: all.find(item => item.id === layout.header && item.kind === 'header') || null,
    footer: all.find(item => item.id === layout.footer && item.kind === 'footer') || null
  }
}

function pageLayoutKind(page) {
  const meta = page?.meta || {}
  let kind = String(meta.kind || '').trim().toLowerCase()
  if (kind === 'homepage') kind = 'home'
  if (kind === 'index') kind = 'list'
  if (kind === 'static') kind = 'single'
  if (!kind) {
    const name = page?.name || ''
    kind = name === 'home' || name === 'index' ? 'home' : 'single'
  }
  return ['home', 'single', 'list', 'detail'].includes(kind) ? kind : 'single'
}

/** Saved themeLayout wins. Otherwise the only layout of this page type is used. */
export function layoutForPage(all, page) {
  const saved = all.find(item => item.id === page?.meta?.themeLayout)
  if (saved && saved.kind !== 'header' && saved.kind !== 'footer') return saved
  const matches = all.filter(item => item.kind === pageLayoutKind(page))
  return matches.length === 1 ? matches[0] : null
}

export function shellForPage(all, page) {
  return shellFor(all, layoutForPage(all, page)?.id)
}
