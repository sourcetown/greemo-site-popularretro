<template>
  <section>
    <div class="wrap split">
      <div class="prose-pr">
        <Rich as="div" class="kicker" field="kicker" :value="d.kicker" :text-style="d.textStyle" />
        <Rich as="h2" style="margin:12px 0 28px" field="title" :value="d.title" :text-style="d.textStyle" />
        <div v-html="blockMarkdown(d.body)"></div>
        <Rich as="p" v-if="d.note" class="muted" style="font-size:15px" field="note" :value="d.note" :text-style="d.textStyle" />
      </div>
      <div class="panel">
        <Rich as="div" class="kicker" field="topicsTitle" :value="d.topicsTitle" :text-style="d.textStyle" />
        <ul class="topics" style="margin-bottom:0"><li v-for="t in d.topics || []" :key="t" style="background:var(--paper)">{{ t }}</li></ul>
        <Rich as="div" class="kicker" style="margin-top:34px" field="asideTitle" :value="d.asideTitle" :text-style="d.textStyle" />
        <div class="prose-pr" style="margin-top:10px" v-html="blockMarkdown(d.asideBody)"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Rich from '../../components/Rich.vue'
import { blockMarkdown } from '../../utils/markdown'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
</script>
