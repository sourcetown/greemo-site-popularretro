<template>
  <section style="background:#EDE6D8">
    <div class="wrap">
      <div class="sec-head">
        <div><Rich as="div" class="kicker" field="kicker" :value="d.kicker" :text-style="d.textStyle" /><Rich as="h2" style="margin-top:12px" field="title" :value="d.title" :text-style="d.textStyle" /></div>
        <p><Rich as="span" field="text" :value="d.text" :text-style="d.textStyle" /><template v-if="d.gap">{{ ' ' }}<Ph><Rich as="span" field="gap" :value="d.gap" :text-style="d.textStyle" /></Ph></template></p>
      </div>
      <div class="team">
        <div v-for="p in d.people || []" :key="p.name" class="person">
          <div class="ph-box">[photo]</div>
          <div class="kicker">{{ p.role }}</div>
          <h3>{{ p.name }}</h3>
          <p class="muted"><template v-if="p.bio">{{ p.bio }}</template><Ph v-else>bio</Ph></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Rich from '../../components/Rich.vue'
import Ph from '../../components/Ph.vue'
import { useSectionBlock } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { d } = useSectionBlock(props)
</script>
