<template>
  <section v-if="issue && issue.print">
    <div class="wrap">
      <Rich as="div" class="kicker" field="kicker" :value="d.kicker" :text-style="d.textStyle" />
      <Rich as="h2" style="margin:12px 0 44px" field="title" :value="d.title" :text-style="d.textStyle" />
      <div class="quality">
        <div v-for="q in d.items || []" :key="q.title" class="panel"><div class="big">{{ q.big }}</div><h3>{{ q.title }}</h3><p>{{ q.text }}</p></div>
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
// Only shown for print issues.
// The issue for this detail page (/issues/:slug).
const issue = computed(() => props.page?.record || bySlug(props.page?.objectKey) || null)
</script>
