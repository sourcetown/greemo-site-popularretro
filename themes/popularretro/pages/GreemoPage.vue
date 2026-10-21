<template>
  <NotFound v-if="!page || missingRecord" />
  <template v-else>
    <!-- The page's section blocks, in order, as flat siblings (same as Andrews UK). -->
    <template v-for="(block, i) in page.blocks" :key="i">
      <component
        v-if="block.type === 'template' && sections[block.name]"
        :is="sections[block.name]"
        v-bind="sectionBind(resolveSectionData(block.config, context))"
        :page="context"
      />
      <section v-else-if="block.type === 'markdown'" class="prose-section"><div class="wrap" v-html="marked.parse(block.content)"></div></section>
    </template>
  </template>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import NotFound from './NotFound.vue'
import { sections } from '../sections'
import { pages } from '../utils/pages'
import { findRecord, resolveSectionData } from '../utils/greemo'
import { sectionBind } from '../utils/sectionBlock'

const SITE_NAME = 'Popular Retro'
const props = defineProps({ pageName: String })
const route = useRoute()
const page = computed(() => pages.find(p => p.name === props.pageName))
// Detail pages (kind: detail) read their record from the collection named in frontmatter, keyed by the :slug in the path.
const context = computed(() => {
  const meta = page.value?.meta || {}
  const objectKey = meta.kind === 'detail' ? (route.params.slug || route.params.key) : undefined
  const record = objectKey ? findRecord(meta.collection, objectKey) : undefined
  return { collection: meta.kind === 'detail' ? meta.collection : undefined, objectKey, record, meta }
})
const missingRecord = computed(() => page.value?.meta.kind === 'detail' && !context.value.record)

watchEffect(() => {
  const meta = page.value?.meta || {}
  if (!page.value || missingRecord.value) { document.title = `Page not found | ${SITE_NAME}`; return }
  const title = meta.seoTitle || context.value.record?.title || meta.title || SITE_NAME
  document.title = meta.kind === 'home' || meta.seoTitle ? title : `${title} | ${SITE_NAME}`
})
</script>
