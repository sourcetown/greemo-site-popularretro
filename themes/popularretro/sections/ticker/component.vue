<template>
  <div class="ticker" aria-hidden="true">
    <template v-for="n in 2" :key="n"><template v-for="w in words" :key="w + n"><span>{{ w }}</span><b>✦</b></template></template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSectionSource } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d, s } = useSectionSource(props, 'ticker')
const words = computed(() => (Array.isArray(s.value) ? s.value : Array.isArray(d.value.words) ? d.value.words : []))
</script>
