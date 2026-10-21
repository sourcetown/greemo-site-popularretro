import { createRouter, createWebHistory } from 'vue-router'
import GreemoPage from '../pages/GreemoPage.vue'
import NotFound from '../pages/NotFound.vue'
import { pages } from '../utils/pages'

// One route per Greemo page in src/content. home.md is "/", the others use their frontmatter path (issue.md is /issues/:slug).
// Each page is a list of section blocks rendered by GreemoPage, like Andrews UK.
const routes = [
  ...pages.map(page => ({ path: page.path, name: page.name, component: GreemoPage, props: { pageName: page.name } })),
  { path: '/our-work', redirect: '/issues' },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 100, behavior: 'smooth' }
    return { top: 0 }
  }
})

// GreemoPage sets the title for content pages; the catch-all route keeps the old "Page not found" title.
router.afterEach(to => {
  if (to.name === 'NotFound') document.title = 'Page not found | Popular Retro'
})

export default router
