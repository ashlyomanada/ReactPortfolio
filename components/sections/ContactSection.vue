<template>
  <section id="contact" class="py-20 md:py-28 border-t border-slate-800/80 bg-slate-950/40 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <UiSectionHeader
        number="10"
        label="Direct Inquiry"
        title="Get in Touch"
        description="Whether you have an upcoming project, engineering role, or technical challenge, my inbox is always open."
      />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <!-- Left Info & Copy Email Column (5 Cols) -->
        <div class="lg:col-span-5 space-y-6">
          <div class="p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 space-y-6">
            <h3 class="text-xl font-bold text-slate-100">
              Let's build something remarkable together.
            </h3>
            <p class="text-sm text-slate-400 leading-relaxed">
              Available for full-time frontend & full-stack roles, contract architecture, and high-impact advisory work.
            </p>

            <!-- Map-free "Based In" indicator -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div class="flex items-center gap-2 text-xs font-mono text-amber-500 font-semibold">
                <Icon name="heroicons:map-pin" class="w-4 h-4" />
                <span>Location & Timezone</span>
              </div>
              <div class="text-sm font-bold text-slate-200">
                {{ profile.location }}
              </div>
              <div class="text-xs text-slate-400 font-mono">
                {{ profile.timezone }} • Remote collaboration ready
              </div>
            </div>

            <!-- Copy Email Button -->
            <div class="space-y-2">
              <span class="text-xs font-mono uppercase tracking-wider text-slate-400">Primary Contact:</span>
              <button
                type="button"
                class="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 text-slate-200 transition-all cursor-pointer group"
                @click="copyEmail"
              >
                <div class="flex items-center gap-2.5">
                  <Icon name="heroicons:envelope" class="w-5 h-5 text-amber-400" />
                  <span class="text-xs sm:text-sm font-mono font-medium">{{ profile.socials.email }}</span>
                </div>
                <span class="text-xs font-mono text-amber-400 group-hover:underline flex items-center gap-1">
                  <span>Copy</span>
                  <Icon name="heroicons:clipboard-document" class="w-4 h-4" />
                </span>
              </button>
            </div>

            <!-- Social Links -->
            <div class="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
              <span>Find me online:</span>
              <div class="flex items-center gap-2">
                <a
                  :href="profile.socials.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2 rounded-lg bg-slate-950 hover:text-amber-400 border border-slate-800 transition-colors"
                >
                  <Icon name="logos:github-icon" class="w-4 h-4 dark:brightness-0 dark:invert" />
                </a>
                <a
                  :href="profile.socials.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2 rounded-lg bg-slate-950 hover:text-amber-400 border border-slate-800 transition-colors"
                >
                  <Icon name="logos:linkedin-icon" class="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Form Column (7 Cols) -->
        <div class="lg:col-span-7">
          <form
            class="p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 space-y-5"
            @submit.prevent="submitForm"
          >
            <!-- Honeypot anti-spam field (hidden) -->
            <div class="hidden" aria-hidden="true">
              <label for="honeypot">Leave blank</label>
              <input id="honeypot" v-model="form.honeypot" type="text" tabindex="-1" autocomplete="off" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <!-- Name Input -->
              <div>
                <label for="name" class="block text-xs font-mono text-slate-300 font-semibold mb-1.5">
                  Your Name <span class="text-amber-500">*</span>
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="Alex Rivera"
                  class="w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-colors"
                  :class="errors.name ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-amber-500/50'"
                  :disabled="isSubmitting"
                />
                <span v-if="errors.name" class="text-xs text-rose-400 mt-1 block font-mono">
                  {{ errors.name }}
                </span>
              </div>

              <!-- Email Input -->
              <div>
                <label for="email" class="block text-xs font-mono text-slate-300 font-semibold mb-1.5">
                  Email Address <span class="text-amber-500">*</span>
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="alex@company.com"
                  class="w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-colors"
                  :class="errors.email ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-amber-500/50'"
                  :disabled="isSubmitting"
                />
                <span v-if="errors.email" class="text-xs text-rose-400 mt-1 block font-mono">
                  {{ errors.email }}
                </span>
              </div>
            </div>

            <!-- Message Textarea -->
            <div>
              <label for="message" class="block text-xs font-mono text-slate-300 font-semibold mb-1.5">
                Message / Project Overview <span class="text-amber-500">*</span>
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                placeholder="Hi Ashly, I'd like to discuss an opportunity or project..."
                class="w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-colors resize-none"
                :class="errors.message ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-amber-500/50'"
                :disabled="isSubmitting"
              />
              <span v-if="errors.message" class="text-xs text-rose-400 mt-1 block font-mono">
                {{ errors.message }}
              </span>
            </div>

            <!-- Submit Button & SLA -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div class="text-xs text-slate-400 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Typically replies within 24 hours</span>
              </div>

              <button
                type="submit"
                class="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 cursor-pointer"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">Transmitting...</span>
                <span v-else>Send Message</span>
                <Icon name="heroicons:paper-airplane" class="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { z } from 'zod'
import confetti from 'canvas-confetti'
import { profile } from '~/content/profile'

const emit = defineEmits<{
  (e: 'toast', msg: string): void
}>()

const form = reactive({
  name: '',
  email: '',
  message: '',
  honeypot: '',
})

const errors = reactive({
  name: '',
  email: '',
  message: '',
})

const isSubmitting = ref(false)

const ContactClientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0).optional(),
})

const copyEmail = () => {
  navigator.clipboard.writeText(profile.socials.email)
  emit('toast', 'Email copied to clipboard!')
}

const submitForm = async () => {
  errors.name = ''
  errors.email = ''
  errors.message = ''

  const result = ContactClientSchema.safeParse(form)
  if (!result.success) {
    result.error.errors.forEach(err => {
      const field = err.path[0] as 'name' | 'email' | 'message'
      if (field) errors[field] = err.message
    })
    return
  }

  isSubmitting.value = true

  try {
    const res = await $fetch<{ success: boolean; message: string }>('/api/contact', {
      method: 'POST',
      body: form,
    })

    if (res?.success) {
      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#f59e0b', '#fbbf24', '#ffffff'],
        })
      } catch (e) {}

      emit('toast', res.message || 'Message sent! Ashly will reply shortly.')
      form.name = ''
      form.email = ''
      form.message = ''
    }
  } catch (err: any) {
    const errorMsg = err?.data?.statusMessage || 'Failed to submit form. Please try emailing directly.'
    emit('toast', errorMsg)
  } finally {
    isSubmitting.value = false
  }
}
</script>
