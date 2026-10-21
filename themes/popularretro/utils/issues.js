import issuesData from '../data/projects.json'

export const issues = Object.values(issuesData)

export const groups = [
  { key: 'print', kicker: 'Volume 2', title: 'In print', note: 'From June 2021, Popular Retro is printed on 130gsm gloss paper with 170gsm laminated covers.', dark: false },
  { key: 'specials', kicker: "Collector's books", title: 'Special editions', note: 'The best of the magazine, collected in book form.', dark: true },
  { key: 'digital', kicker: 'Volume 1 · 2018 to 2020', title: 'The digital years', note: 'Issues one to five were free PDF downloads.', gap: 'Offer the PDFs again? The old links are dead.', dark: false }
]

export const bySlug = slug => issuesData[slug]
export const inGroup = key => issues.filter(i => i.group === key)
export const groupOf = issue => groups.find(g => g.key === issue.group)
