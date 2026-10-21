<template>
  <section v-if="issue" class="hero dark" style="padding-bottom:90px">
    <div class="wrap">
      <div>
        <div class="crumbs"><router-link to="/issues">Issues</router-link> / <router-link :to="`/issues#${issue.group}`">{{ group?.title }}</router-link> / {{ issue.title }}</div>
        <div class="kicker bar">{{ issue.title }} · {{ issue.date }}</div>
        <h1 style="margin-top:26px;font-size:clamp(44px,6vw,92px)">{{ (issue.headline || [])[0] }} <span>{{ (issue.headline || [])[1] }}</span></h1>
        <p class="lede">{{ issue.intro }}</p>
        <div class="facts" style="color:#E6E0EE"><span v-for="f in issue.facts || []" :key="f" class="chip">{{ f }}</span></div>
        <div class="ctas">
          <a v-for="b in issue.buy || []" :key="b.url" class="btn arrow" :class="b.primary ? 'btn-red' : 'btn-ghost'" :href="b.url" target="_blank" rel="noopener">{{ b.label }} </a>
        </div>
        <p v-if="(issue.gaps || []).length" class="src" style="margin-top:18px;color:#9C94A6"><template v-for="g in issue.gaps" :key="g"><Ph>{{ g }}</Ph> </template></p>
      </div>
      <div style="max-width:440px;width:100%;justify-self:end">
        <img v-if="issue.cover" :src="issue.cover" :alt="`${issue.title} cover`" style="width:100%;transform:rotate(3deg);box-shadow:0 30px 60px rgba(0,0,0,.6)">
        <div v-else class="ph-box cover-ph" style="color:var(--yellow);border-color:var(--yellow)">[cover image from Jan]</div>
      </div>
    </div>
  </section>
  <div v-if="issue" class="stripe"></div>
</template>

<script setup>
import { computed } from 'vue'
import Ph from '../../components/Ph.vue'
import { bySlug, groupOf } from '../../utils/issues.js'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
// The issue for this detail page (/issues/:slug).
const issue = computed(() => props.page?.record || bySlug(props.page?.objectKey) || null)
const group = computed(() => (issue.value ? groupOf(issue.value) : null))
</script>
