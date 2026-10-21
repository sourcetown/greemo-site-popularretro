import { parseGreemoMarkdown } from './greemo'

const files = import.meta.glob('../content/*.md', { eager: true, query: '?raw', import: 'default' })

/** Greemo pages (src/content/*.md) with their route path. home.md is "/", others use frontmatter path or "/<file name>". */
export const pages = Object.entries(files).map(([file, raw]) => {
  const name = file.split('/').pop().replace(/\.md$/, '')
  const parsed = parseGreemoMarkdown(raw)
  const meta = parsed.metadata
  const path = meta.path || (name === 'home' || name === 'index' ? '/' : `/${name}`)
  return { name, path, meta, blocks: parsed.blocks }
})
