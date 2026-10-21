<template>
  <router-link class="mag" :to="`/issues/${issue.slug}`">
    <div v-if="issue.cover" class="cv"><img :src="issue.cover" :alt="`${issue.title} cover`" loading="lazy"></div>
    <div v-else class="cv ph-box">[cover image from Jan]</div>
    <div class="meta">
      <div class="kicker">{{ issue.kicker }}</div>
      <h3>{{ issue.title }}</h3>
      <p>{{ issue.summary }}</p>
    </div>
  </router-link>
</template>

<script setup>
defineProps({ issue: { type: Object, required: true } })
</script>
