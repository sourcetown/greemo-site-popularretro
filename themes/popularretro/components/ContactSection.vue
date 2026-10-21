<template>
  <div class="panel">
    <div class="kicker">Send your pitch</div>
    <h3 style="margin:10px 0 8px">Pitches only, please</h3>
    <p class="muted" style="margin-bottom:22px">Send your article pitch (please don't send full articles) and links to any previously published work.</p>
    <form class="form" @submit.prevent="submitForm">
      <div class="row">
        <div><label for="name">Name</label><input id="name" v-model="form.name" type="text" required></div>
        <div><label for="email">Email address</label><input id="email" v-model="form.email" type="email" required></div>
      </div>
      <div><label for="pitch">Tell us about yourself and your article pitch</label><textarea id="pitch" v-model="form.message" required></textarea></div>
      <div><button class="btn btn-red arrow" type="submit" :disabled="isSubmitting">{{ isSubmitting ? 'Sending...' : 'Get in touch' }} </button></div>
    </form>
    <p v-if="message" class="form-msg" :class="messageType === 'success' ? 'ok' : 'err'">{{ message }}</p>
    <p class="src" style="margin-top:18px"><Ph>Where do pitches go? Editorial email from Jan</Ph></p>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Ph from './Ph.vue'

const isSubmitting = ref(false)
const message = ref('')
const messageType = ref('')
const form = reactive({ name: '', email: '', message: '' })

const submitForm = async () => {
  isSubmitting.value = true
  message.value = ''
  try {
    // TODO: /api/contact does not exist yet. Wire it up once Jan confirms where pitches should go.
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, topic: 'Article pitch' })
    })
    if (!response.ok) throw new Error('Failed to send pitch')
    message.value = "Thank you! We'll do our best to respond in a timely fashion."
    messageType.value = 'success'
    Object.assign(form, { name: '', email: '', message: '' })
  } catch (error) {
    console.error('Error:', error)
    message.value = 'Sorry, there was an error sending your pitch. Please try again.'
    messageType.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>
