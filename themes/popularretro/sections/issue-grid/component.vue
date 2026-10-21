<template>
  <section>
    <div class="wrap">
      <div class="sec-head">
        <div><Rich as="div" class="kicker" :field="(d.source || 'backIssues') + '.kicker'" :value="s.kicker" :text-style="d.textStyle" /><Rich as="h2" style="margin-top:12px" :field="(d.source || 'backIssues') + '.title'" :value="s.title" :text-style="d.textStyle" /></div>
        <Rich as="p" :field="(d.source || 'backIssues') + '.text'" :value="s.text" :text-style="d.textStyle" />
      </div>
      <div class="grid grid5"><IssueCard v-for="i in list" :key="i.slug" :issue="i" /></div>
      <div style="margin-top:50px"><router-link class="btn arrow" :to="d.buttonPath || '/issues'">{{ (d.buttonLabel || 'Browse every issue') + ' ' }}</router-link></div>
    </div>
  </section>
</template>

<script setup>
import Rich from '../../components/Rich.vue'

import { computed } from 'vue'
import IssueCard from '../../components/IssueCard.vue'
import { bySlug } from '../../utils/issues.js'
import { useSectionSource } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d, s } = useSectionSource(props, 'backIssues')
const list = computed(() => (s.value.issues || []).map(bySlug).filter(Boolean))
</script>
