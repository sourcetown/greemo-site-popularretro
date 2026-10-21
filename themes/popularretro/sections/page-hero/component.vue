<template>
  <section v-if="d.image" class="page-hero dark">
    <div class="wrap split" style="align-items:center">
      <div>
        <Rich as="div" class="kicker" field="kicker" :value="d.kicker" :text-style="d.textStyle" />
        <Rich as="h1" style="margin-top:18px" field="title" :value="d.title" :text-style="d.textStyle" />
        <div class="lede" style="margin-top:24px;color:#E6E0EE" v-html="blockMarkdown(d.lede)"></div>
      </div>
      <img :src="d.image" :alt="d.imageAlt || ''" style="border:2px solid #fff;box-shadow:12px 12px 0 var(--red)">
    </div>
  </section>
  <section v-else class="page-hero dark">
    <div class="wrap">
      <Rich as="div" class="kicker" field="kicker" :value="d.kicker" :text-style="d.textStyle" />
      <h1 style="margin-top:18px;max-width:14ch"><Rich as="span" field="title" :value="d.title" :text-style="d.textStyle" />{{ d.accent ? ' ' : '' }}<Rich as="span" v-if="d.accent" style="color:var(--red)" field="accent" :value="d.accent" :text-style="d.textStyle" /></h1>
      <Rich as="p" class="lede" style="margin-top:24px;color:#E6E0EE" field="lede" :value="d.lede" :text-style="d.textStyle" />
    </div>
  </section>
  <div v-if="d.stripe" class="stripe"></div>
</template>

<script setup>
import Rich from '../../components/Rich.vue'
import { blockMarkdown } from '../../utils/markdown'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
</script>
