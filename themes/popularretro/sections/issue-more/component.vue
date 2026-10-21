<template>
  <section v-if="more.length" :class="issue.print ? 'dark' : ''" :style="issue.print ? '' : 'background:#EDE6D8'">
    <div class="wrap">
      <div class="sec-head">
        <div><Rich as="div" class="kicker" field="kicker" :value="d.kicker" :text-style="d.textStyle" /><Rich as="h2" style="margin-top:12px" field="title" :value="d.title" :text-style="d.textStyle" /></div>
        <router-link class="btn arrow" to="/issues">{{ (d.buttonLabel || 'All issues') + ' ' }}</router-link>
      </div>
      <div class="grid grid4"><IssueCard v-for="i in more" :key="i.slug" :issue="i" /></div>
    </div>
  </section>
</template>

<script setup>
import Rich from '../../components/Rich.vue'
import { computed } from 'vue'
import IssueCard from '../../components/IssueCard.vue'
import { bySlug, issues } from '../../utils/issues.js'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
// The issue for this detail page (/issues/:slug).
const issue = computed(() => props.page?.record || bySlug(props.page?.objectKey) || null)
const more = computed(() => (issue.value ? issues.filter(i => i.slug !== issue.value.slug).slice(0, Number(d.value.limit) || 4) : []))
</script>
