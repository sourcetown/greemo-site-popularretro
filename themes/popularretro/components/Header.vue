<template>
  <header class="site-header">
    <div class="wrap">
      <router-link class="brand" to="/" @click="open = false">
        <img src="/media/images/logo-red.png" alt="Popular Retro: where old is always fashionable">
      </router-link>
      <nav class="nav">
        <router-link v-for="item in items" :key="item.to" :to="item.to" :class="{ active: isActive(item) }">{{ item.label }}</router-link>
        <router-link class="btn btn-red" :to="`/issues/${latest}`">Latest issue</router-link>
      </nav>
      <button class="burger" :aria-expanded="open" aria-label="Menu" @click="open = !open"><i></i></button>
    </div>
    <nav class="mobile-nav" :class="{ open }">
      <router-link v-for="item in items" :key="item.to" :to="item.to" @click="open = false">{{ item.label }}</router-link>
      <router-link :to="`/issues/${latest}`" @click="open = false">Latest issue</router-link>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import sections from '../data/sections.json'

const route = useRoute()
const open = ref(false)
const latest = sections.latest.slug
const items = [
  { to: '/', label: 'Home' },
  { to: '/issues', label: 'Issues' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Write for us' }
]
const isActive = item => item.to === '/issues' && route.path.startsWith('/issues/')
</script>
