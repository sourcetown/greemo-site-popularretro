<template>
  <div id="news" class="news">
    <div class="wrap">
      <div class="box">
        <Rich as="div" class="kicker" :field="(d.source || 'newsletter') + '.kicker'" :value="s.kicker" :text-style="d.textStyle" />
        <Rich as="h2" style="margin:12px 0 18px" :field="(d.source || 'newsletter') + '.title'" :value="s.title" :text-style="d.textStyle" />
        <Rich as="p" class="muted" :field="(d.source || 'newsletter') + '.text'" :value="s.text" :text-style="d.textStyle" />
        <form class="signup" :action="s.action || undefined" method="post" @submit="onSubmit">
          <input type="email" name="EMAIL" required placeholder="Email address" aria-label="Email address">
          <button class="btn btn-red" type="submit" :disabled="!s.action">{{ d.signMeUp || 'Sign me up' }}</button>
        </form>
        <p v-if="!s.action" class="src" style="margin-top:16px"><Ph><Rich as="span" :field="(d.source || 'newsletter') + '.gap'" :value="s.gap" :text-style="d.textStyle" /></Ph></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Rich from '../../components/Rich.vue'

import Ph from '../../components/Ph.vue'
import { useSectionSource } from '../../utils/sectionBlock'
defineOptions({ inheritAttrs: false })
const props = defineProps({ data: Object, page: Object })
const { s } = useSectionSource(props, 'newsletter')
// No sign-up endpoint is recorded yet, so the form stays disabled until Jan supplies one.
const onSubmit = e => { if (!s.value.action) e.preventDefault() }
</script>
