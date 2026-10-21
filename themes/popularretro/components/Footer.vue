<template>
  <div class="stripe thin"></div>
  <footer class="site-footer">
    <div class="wrap">
      <div class="foot-grid">
        <div class="foot-brand">
          <img src="/media/images/logo-white.png" alt="Popular Retro">
          <p style="max-width:36ch">A magazine for retro enthusiasts, written by retro enthusiasts. Where old is always fashionable.</p>
        </div>
        <div>
          <h4>MAGAZINE</h4>
          <router-link :to="`/issues/${sections.latest.slug}`">Latest issue</router-link>
          <router-link to="/issues">All issues</router-link>
          <router-link to="/issues#specials">Special editions</router-link>
        </div>
        <div>
          <h4>POPULAR RETRO</h4>
          <router-link to="/about">About</router-link>
          <router-link to="/contact">Write for us</router-link>
          <router-link to="/#news">Newsletter</router-link>
        </div>
        <div>
          <h4>FOLLOW</h4>
          <a v-for="s in sections.contact.socials" :key="s.url" :href="s.url" target="_blank" rel="noopener">{{ s.label }}<template v-if="s.handle"> {{ s.handle }}</template></a>
        </div>
      </div>
      <div class="foot-base">
        <span>© <Ph>year</Ph> Popular Retro / AUK Limited</span>
        <span><Ph>company details and privacy link from Jan</Ph></span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import sections from '../data/sections.json'
import Ph from './Ph.vue'
</script>
