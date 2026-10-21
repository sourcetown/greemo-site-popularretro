<template>
  <section class="redbg" :class="{ 'page-hero': d.pageHero }">
    <div class="wrap writers">
      <img :src="d.image || '/media/images/needs-you.jpg'" :alt="d.imageAlt || 'Popular Retro needs YOU poster'">
      <div v-if="d.pageHero">
        <Rich as="div" class="kicker bar" style="background:#fff;color:var(--red)" :field="d.source ? d.source + '.kicker' : 'kicker'" :value="s.kicker" :text-style="d.textStyle" />
        <Rich as="h1" style="margin:22px 0 24px;font-size:clamp(40px,5.4vw,80px)" :field="d.source ? d.source + '.title' : 'title'" :value="s.title" :text-style="d.textStyle" />
        <Rich as="p" class="lede" :field="d.source ? d.source + '.lede' : 'lede'" :value="s.lede" :text-style="d.textStyle" />
      </div>
      <div v-else>
        <Rich as="div" class="kicker bar" style="background:#fff;color:var(--red)" :field="d.source ? d.source + '.kicker' : 'kicker'" :value="s.kicker" :text-style="d.textStyle" />
        <Rich as="h2" style="margin:20px 0 22px" :field="d.source ? d.source + '.title' : 'title'" :value="s.title" :text-style="d.textStyle" />
        <Rich as="p" class="lede" :field="d.source ? d.source + '.lede' : 'lede'" :value="s.lede" :text-style="d.textStyle" />
        <ul class="topics"><li v-for="t in s.topics || []" :key="t">{{ t }}</li></ul>
        <router-link v-if="d.cta" class="btn btn-yellow arrow" :to="d.cta.path"><Rich as="span" field="cta.label" :value="d.cta.label" :text-style="d.textStyle" /> </router-link>
      </div>
    </div>
  </section>
  <div v-if="d.stripe" class="stripe"></div>
</template>

<script setup>
import Rich from '../../components/Rich.vue'
import { useSectionSource } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
// Linked to sections.writers on Home; on the Write for us page the copy is set on the block (pageHero: true).
const { d, s } = useSectionSource(props)
</script>
