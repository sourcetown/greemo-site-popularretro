<template>
  <!-- Special edition band -->
  <section class="dark">
    <div class="wrap special">
      <div>
        <Rich as="div" class="kicker" :field="(d.source || 'special') + '.kicker'" :value="s.kicker" :text-style="d.textStyle" />
        <Rich as="h2" style="margin:14px 0 24px" :field="(d.source || 'special') + '.title'" :value="s.title" :text-style="d.textStyle" />
        <Rich as="p" class="lede" style="color:#E6E0EE" :field="(d.source || 'special') + '.lede'" :value="s.lede" :text-style="d.textStyle" />
        <Rich as="p" style="margin:18px 0 32px;color:#CFC8D8;max-width:50ch" :field="(d.source || 'special') + '.text'" :value="s.text" :text-style="d.textStyle" />
        <div class="ctas">
          <router-link class="btn btn-yellow arrow" :to="`/issues/${s.slug}`">{{ (d.buttonLabel || 'Special editions') + ' ' }}</router-link>
        </div>
        <p class="src" style="margin-top:18px;color:#9C94A6">Availability: <Ph><Rich as="span" :field="(d.source || 'special') + '.gap'" :value="s.gap" :text-style="d.textStyle" /></Ph></p>
      </div>
      <div style="max-width:420px;justify-self:center"><img v-if="issue" :src="issue.cover" :alt="`${issue.title} cover`"></div>
    </div>
  </section>
</template>

<script setup>
import Rich from '../../components/Rich.vue'

import { computed } from 'vue'
import Ph from '../../components/Ph.vue'
import { bySlug } from '../../utils/issues.js'
import { useSectionSource } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d, s } = useSectionSource(props, 'special')
const issue = computed(() => bySlug(s.value.slug))
</script>
