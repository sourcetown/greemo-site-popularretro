<template>
  <!-- Latest issue feature: cover, intro, contents and buy buttons -->
  <section v-if="issue">
    <div class="wrap issue-feature">
      <div class="cover"><img :src="issue.cover" :alt="`${issue.title} cover`"></div>
      <div>
        <Rich as="div" class="kicker" :field="(d.source || 'latest') + '.kicker'" :value="s.kicker" :text-style="d.textStyle" />
        <h2 style="margin:14px 0 22px">{{ (issue.headline || []).join(' ') }}</h2>
        <Rich as="p" class="lede" style="max-width:none" :field="(d.source || 'latest') + '.lede'" :value="s.lede" :text-style="d.textStyle" />
        <p v-for="p in issue.body || []" :key="p" style="margin-top:16px">{{ p }}</p>
        <ContentsList :items="issue.contents || []" />
        <div class="ctas">
          <a v-for="b in issue.buy || []" :key="b.url" class="btn arrow" :class="{ 'btn-red': b.primary }" :href="b.url" target="_blank" rel="noopener">{{ b.label }} </a>
        </div>
        <p class="src" style="margin-top:18px">Prices: <Ph>print and digital prices from Jan</Ph></p>
      </div>
    </div>
  </section>
</template>

<script setup>
import Rich from '../../components/Rich.vue'

import { computed } from 'vue'
import ContentsList from '../../components/ContentsList.vue'
import Ph from '../../components/Ph.vue'
import { bySlug } from '../../utils/issues.js'
import { useSectionSource } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
// source: latest (slug, kicker, lede)
const { s } = useSectionSource(props, 'latest')
const issue = computed(() => bySlug(s.value.slug))
</script>
