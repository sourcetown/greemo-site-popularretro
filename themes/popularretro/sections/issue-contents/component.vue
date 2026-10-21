<template>
  <section v-if="issue">
    <div class="wrap split">
      <div>
        <Rich as="div" class="kicker" field="kicker" :value="d.kicker || 'In this issue'" :text-style="d.textStyle" />
        <Rich as="h2" style="margin:12px 0 0" field="title" :value="d.title || 'Contents'" :text-style="d.textStyle" />
        <ContentsList v-if="issue.contents" :items="issue.contents" />
        <div v-else class="ph-box" style="margin-top:30px;min-height:220px">[contents list for {{ issue.title }} from Jan]</div>
      </div>
      <div class="prose-pr" style="padding-top:8px">
        <template v-if="issue.editorNote">
          <div class="kicker">From the editor</div>
          <p style="margin-top:14px" class="lede">"{{ issue.editorNote.quote }}"</p>
          <p v-for="p in issue.editorNote.body" :key="p">{{ p }}</p>
        </template>
        <template v-else>
          <div class="kicker">About this {{ kind }}</div>
          <p v-for="p in [issue.summary, ...(issue.body || [])]" :key="p" style="margin-top:14px">{{ p }}</p>
        </template>
        <div class="panel" style="margin-top:34px">
          <div class="kicker">Contributors for this {{ kind }}</div>
          <p style="margin:12px 0 0"><template v-if="issue.contributors">{{ issue.contributors }}</template><Ph v-else>contributors from Jan</Ph></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Rich from '../../components/Rich.vue'
import { computed } from 'vue'
import ContentsList from '../../components/ContentsList.vue'
import Ph from '../../components/Ph.vue'
import { bySlug } from '../../utils/issues.js'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
// The issue for this detail page (/issues/:slug).
const issue = computed(() => props.page?.record || bySlug(props.page?.objectKey) || null)
const kind = computed(() => (issue.value?.group === 'specials' ? 'edition' : 'issue'))
</script>
