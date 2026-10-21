<template>
  <section class="dark">
    <div class="wrap split" style="align-items:center">
      <div>
        <Rich as="div" class="kicker" style="color:var(--yellow)" field="kicker" :value="d.kicker" :text-style="d.textStyle" />
        <Rich as="h2" style="margin:12px 0 20px" field="title" :value="d.title" :text-style="d.textStyle" />
        <Rich as="p" style="color:#CFC8D8;max-width:46ch" field="text" :value="d.text" :text-style="d.textStyle" />
        <p style="margin-top:20px">Email <a v-if="s.email" :href="`mailto:${s.email}`"><Rich as="span" :field="(d.source || 'contact') + '.email'" :value="s.email" :text-style="d.textStyle" /></a><Ph v-else>general contact email</Ph></p>
      </div>
      <div>
        <Rich as="div" class="kicker" style="color:var(--yellow);margin-bottom:16px" field="followLabel" :value="d.followLabel" :text-style="d.textStyle" />
        <div class="socials"><a v-for="x in s.socials || []" :key="x.url" class="btn btn-ghost" :href="x.url" target="_blank" rel="noopener">{{ x.label }}</a></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Rich from '../../components/Rich.vue'
import Ph from '../../components/Ph.vue'
import { useSectionSource } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
// Copy on the block; email and socials come from sections.contact.
const { d, s } = useSectionSource(props, 'contact')
</script>
