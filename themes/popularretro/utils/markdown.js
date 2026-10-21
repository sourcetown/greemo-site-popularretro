import { marked } from 'marked'

// Markdown copy held in a section block. Square-bracket gaps such as [bio] become visible placeholders,
// as the old markdown loader did.
export function blockMarkdown(md = '') {
  return marked.parse(String(md || '')).replace(/\[([^\]]+)\]/g, '<em class="ph">[$1]</em>')
}
