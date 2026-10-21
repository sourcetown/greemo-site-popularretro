<template>
  <section v-if="g" :id="g.key" :class="{ dark: g.dark }">
    <div class="wrap">
      <div class="sec-head">
        <div><div class="kicker" :style="g.dark ? 'color:var(--yellow)' : ''">{{ g.kicker }}</div><h2 style="margin-top:12px">{{ g.title }}</h2></div>
        <p :style="g.dark ? 'color:#CFC8D8' : ''">{{ g.note }} <Ph v-if="g.gap">{{ g.gap }}</Ph></p>
      </div>
      <div class="grid" :class="g.key === 'digital' ? 'grid5' : 'grid4'">
        <IssueCard v-for="i in inGroup(g.key)" :key="i.slug" :issue="i" />
        <div v-if="g.key === 'print'" class="mag">
          <div class="cv ph-box">[Any issue after Volume 2, Issue 1? From Jan]</div>
          <div class="meta"><div class="kicker"><Ph>date</Ph></div><h3><Ph>next issue</Ph></h3></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import IssueCard from '../../components/IssueCard.vue'
import Ph from '../../components/Ph.vue'
import { groups, inGroup } from '../../utils/issues.js'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
// One archive group from utils/issues.js (print, specials or digital).
const { d } = useSectionBlock(props)
const g = computed(() => groups.find(x => x.key === d.value.group))
</script>
