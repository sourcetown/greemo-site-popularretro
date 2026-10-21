<template>
  <section v-if="issue && issue.previews" class="dark">
    <div class="wrap">
      <div class="sec-head">
        <div><Rich as="div" class="kicker" style="color:var(--yellow)" field="kicker" :value="d.kicker" :text-style="d.textStyle" /><Rich as="h2" style="margin-top:12px" field="title" :value="d.title" :text-style="d.textStyle" /></div>
        <Rich as="p" style="color:#CFC8D8" field="text" :value="d.text" :text-style="d.textStyle" />
      </div>
      <div class="grid grid3">
        <div v-for="p in issue.previews" :key="p" class="ph-box" style="aspect-ratio:4/3;color:var(--yellow);border-color:var(--yellow)">[spread: {{ p }}, from Jan]</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Rich from '../../components/Rich.vue'
import { computed } from 'vue'
import { bySlug } from '../../utils/issues.js'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
// The issue for this detail page (/issues/:slug).
const issue = computed(() => props.page?.record || bySlug(props.page?.objectKey) || null)
</script>
