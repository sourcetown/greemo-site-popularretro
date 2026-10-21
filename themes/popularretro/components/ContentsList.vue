<template>
  <ol class="toc" :class="{ single }">
    <li v-for="(item, i) in items" :key="item"><b>{{ String(i + 1).padStart(2, '0') }}</b>{{ item }}</li>
  </ol>
</template>

<script setup>
defineProps({ items: { type: Array, required: true }, single: Boolean })
</script>
