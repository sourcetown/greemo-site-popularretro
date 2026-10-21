<template>
  <section class="hero dark">
    <div class="wrap">
      <div>
        <Rich as="div" class="kicker bar" :field="(d.source || 'hero') + '.kicker'" :value="s.kicker" :text-style="d.textStyle" />
        <h1 style="margin-top:26px"><Rich as="span" :field="(d.source || 'hero') + '.title'" :value="s.title" :text-style="d.textStyle" /> <Rich as="span" :field="(d.source || 'hero') + '.accent'" :value="s.accent" :text-style="d.textStyle" /></h1>
        <Rich as="p" class="lede" :field="(d.source || 'hero') + '.lede'" :value="s.lede" :text-style="d.textStyle" />
        <div class="ctas">
          <router-link v-if="d.primaryCta" class="btn btn-red arrow" :to="d.primaryCta.path || `/issues/${d.latest?.slug}`"><Rich as="span" field="primaryCta.label" :value="d.primaryCta.label" :text-style="d.textStyle" /> </router-link>
          <router-link v-if="d.secondaryCta" class="btn btn-ghost" :to="d.secondaryCta.path"><Rich as="span" field="secondaryCta.label" :value="d.secondaryCta.label" :text-style="d.textStyle" /></router-link>
        </div>
      </div>
      <div class="covers">
        <img v-if="back" class="c2" :src="back.cover" :alt="`${back.title} cover`">
        <img v-if="front" class="c1" :src="front.cover" :alt="`${front.title} cover`">
        <div class="sticker">Now in<br>print!</div>
      </div>
    </div>
  </section>
  <div class="stripe"></div>
</template>

<script setup>
import Rich from '../../components/Rich.vue'
import { computed } from 'vue'
import { bySlug } from '../../utils/issues.js'
import { useSectionSource } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d, s } = useSectionSource(props, 'hero')
// covers: [back cover, front cover] by issue slug
const back = computed(() => bySlug((s.value.covers || [])[0]))
const front = computed(() => bySlug((s.value.covers || [])[1]))
</script>
