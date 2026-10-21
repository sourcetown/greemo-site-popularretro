<template>
  <section>
    <div class="wrap split">
      <div>
        <Rich as="div" class="kicker" field="kicker" :value="d.kicker" :text-style="d.textStyle" />
        <Rich as="h2" style="margin:12px 0 26px" field="title" :value="d.title" :text-style="d.textStyle" />
        <ContentsList :items="s.pitchTopics || []" single />
        <div class="panel" style="background:var(--yellow)">
          <Rich as="div" class="kicker" style="color:var(--ink)" field="ruleKicker" :value="d.ruleKicker" :text-style="d.textStyle" />
          <Rich as="p" style="margin:10px 0 0;font-weight:600" field="rule" :value="d.rule" :text-style="d.textStyle" />
        </div>
        <Rich as="p" style="margin-top:30px;max-width:62ch" field="text" :value="d.text" :text-style="d.textStyle" />
      </div>
      <ContactSection />
    </div>
  </section>
</template>

<script setup>
import Rich from '../../components/Rich.vue'
import ContactSection from '../../components/ContactSection.vue'
import ContentsList from '../../components/ContentsList.vue'
import { useSectionSource } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
// Copy on the block; the topic list comes from sections.contact.pitchTopics.
const { d, s } = useSectionSource(props, 'contact')
</script>
