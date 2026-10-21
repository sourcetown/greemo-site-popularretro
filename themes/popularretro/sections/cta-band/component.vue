<template>
  <section class="redbg">
    <div class="wrap" style="text-align:center">
      <Rich as="h2" field="title" :value="d.title" :text-style="d.textStyle" />
      <Rich as="p" class="lede" style="margin:20px auto 34px" field="lede" :value="d.lede" :text-style="d.textStyle" />
      <router-link v-if="d.cta" class="btn btn-yellow arrow" :to="d.cta.path"><Rich as="span" field="cta.label" :value="d.cta.label" :text-style="d.textStyle" /> </router-link>
    </div>
  </section>
</template>

<script setup>
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
</script>
