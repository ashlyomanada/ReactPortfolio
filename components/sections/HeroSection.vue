<template>
  <section
    id="hero"
    ref="heroRef"
    class="relative pt-24 sm:pt-32 pb-16 md:pb-24 overflow-hidden"
    @mousemove="handleMouseMove"
  >
    <!-- Background Ambient Spotlight following mouse cursor -->
    <div
      class="pointer-events-none absolute -inset-px opacity-35 dark:opacity-25 transition-opacity duration-300 hidden sm:block"
      :style="{
        background: `radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(245, 158, 11, 0.12), transparent 80%)`,
      }"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Tag Header -->
      <div class="flex items-center gap-3 mb-6">
        <span class="font-mono text-xs font-semibold tracking-wider text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          01 — Profile & Overview
        </span>
        <div class="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent max-w-xs" />
      </div>

      <!-- Main Hero Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <!-- Left Content (7 Cols) -->
        <div class="lg:col-span-7 space-y-6">
          <!-- Live Status Chip -->
          <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#111c1f] border border-slate-200 dark:border-teal-950 text-xs text-slate-600 dark:text-slate-300 shadow-sm backdrop-blur-md">
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span class="font-medium text-slate-700 dark:text-slate-200">{{ profile.status.label }}</span>
            <span class="text-slate-400 dark:text-slate-500 hidden sm:inline">•</span>
            <span class="text-slate-500 dark:text-slate-400 text-[11px] hidden sm:inline">{{ profile.status.subtext }}</span>
          </div>

          <!-- Headline & Name -->
          <div>
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-(--text-primary) leading-[1.1]">
              Hi, I'm <span class="text-amber-500 dark:text-teal-300 inline-block drop-shadow-sm">{{ profile.name }}</span>
            </h1>
            <!-- Rotating Typewriter Role Line -->
            <div class="h-10 sm:h-12 flex items-center mt-3 text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-700 dark:text-slate-300">
              <span class="text-slate-500 dark:text-slate-400 mr-2 font-mono text-sm sm:text-base">></span>
              <span class="text-amber-600 dark:text-teal-300 font-mono">{{ displayedRole }}</span>
              <span class="w-2.5 h-6 bg-amber-500 dark:bg-teal-300 ml-1 inline-block animate-pulse" />
            </div>
          </div>

          <!-- Value Statement -->
          <p class="text-base sm:text-lg text-(--text-secondary) leading-relaxed max-w-2xl">
            {{ profile.bio.short }}
          </p>

          <!-- CTAs & Action Buttons -->
          <div class="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              class="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 dark:bg-teal-300 dark:hover:bg-teal-200 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 dark:shadow-teal-500/15 hover:shadow-amber-500/35 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <span>View Projects</span>
              <Icon name="heroicons:arrow-down" class="w-4 h-4" />
            </a>

            <a
              :href="profile.resumeUrl"
              target="_blank"
              class="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 dark:bg-[#111c1f] dark:hover:bg-[#192629] text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white font-medium text-sm border border-slate-200 dark:border-teal-950 shadow-sm transition-all flex items-center gap-2"
            >
              <Icon name="heroicons:arrow-down-tray" class="w-4 h-4 text-amber-500 dark:text-teal-300" />
              <span>Download Résumé</span>
            </a>

            <a
              href="#contact"
              class="px-5 py-3 rounded-xl bg-transparent hover:bg-white dark:hover:bg-[#142326] text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-teal-200 font-medium text-sm border border-slate-300 dark:border-teal-900/70 transition-all flex items-center gap-2"
            >
              <span>Get in Touch</span>
              <Icon name="heroicons:paper-airplane" class="w-4 h-4" />
            </a>
          </div>

          <!-- Social Links Bar -->
          <div class="flex items-center gap-4 pt-4 text-slate-600 dark:text-slate-400">
            <span class="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-500">Connect:</span>
            <div class="flex items-center gap-3">
              <a
                :href="profile.socials.github"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 rounded-lg bg-white dark:bg-[#111c1f] hover:text-amber-600 dark:hover:text-teal-200 transition-colors border border-slate-200 dark:border-teal-900/70 shadow-sm"
                aria-label="GitHub"
              >
                <Icon name="logos:github-icon" class="w-4 h-4 dark:brightness-0 dark:invert" />
              </a>
              <a
                :href="profile.socials.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 rounded-lg bg-white dark:bg-[#111c1f] hover:text-amber-600 dark:hover:text-teal-200 transition-colors border border-slate-200 dark:border-teal-900/70 shadow-sm"
                aria-label="LinkedIn"
              >
                <Icon name="logos:linkedin-icon" class="w-4 h-4" />
              </a>
              <button
                type="button"
                class="p-2 rounded-lg bg-white dark:bg-[#111c1f] hover:text-amber-600 dark:hover:text-teal-200 transition-colors border border-slate-200 dark:border-teal-900/70 shadow-sm flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-slate-300 cursor-pointer"
                @click="copyEmail"
              >
                <Icon name="heroicons:clipboard-document" class="w-4 h-4 text-amber-500 dark:text-teal-300" />
                <span>{{ profile.socials.email }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Right Visual (5 Cols): Signature 3D Tilt Portrait & Micro Terminal Card -->
        <div class="lg:col-span-5 flex flex-col items-center justify-center">
          <div
            class="relative group cursor-pointer perspective-1000"
            @mousemove="handlePortraitTilt"
            @mouseleave="resetPortraitTilt"
          >
            <!-- Radiant Background Glow Ring -->
            <div class="absolute -inset-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 dark:from-teal-700 dark:via-cyan-500 dark:to-emerald-700 rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse-subtle" />

            <!-- Frame Container with 3D Tilt -->
            <div
              class="relative rounded-3xl p-2 bg-gradient-to-b from-white/95 to-slate-100/95 dark:from-[#172629] dark:to-[#0b1214] border border-amber-500/30 dark:border-teal-800/70 shadow-2xl transition-transform duration-200 ease-out"
              :style="{
                transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
              }"
            >
              <!-- Portrait Image -->
              <div class="overflow-hidden rounded-2xl w-64 sm:w-72 md:w-80 h-72 sm:h-80 md:h-96 relative bg-slate-200 dark:bg-[#111c1f]">
                <img
                  src="/images/portrait.png"
                  alt="Ashly Omanada Portrait"
                  class="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <!-- Floating Monogram Badge -->
                <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl glass-panel bg-slate-950/80 border border-slate-700/60 text-xs">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span class="font-mono text-slate-200">systems_online</span>
                  </div>
                  <span class="font-mono text-amber-400 font-semibold">lat: ~18ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bento-Grid Layout: "About Me / What I'm Into" -->
      <div class="mt-16 md:mt-24">
        <div class="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-500 mb-4">
          // 01.1 — Context Matrix & Personal Notes
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="card in profile.bento"
            :key="card.id"
            class="p-5 rounded-2xl glass-panel bg-white/80 dark:bg-[#111c1f]/80 border border-slate-200 dark:border-teal-950 hover:border-amber-500/40 dark:hover:border-teal-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-sm"
          >
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-mono text-amber-500 font-semibold">{{ card.title }}</span>
              <Icon :name="card.icon || 'heroicons:sparkles'" class="w-4 h-4 text-slate-500 dark:text-slate-500 group-hover:text-amber-600 dark:group-hover:text-teal-300 transition-colors" />
            </div>
            <div class="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
              {{ card.content }}
            </div>
            <p v-if="card.detail" class="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {{ card.detail }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { profile } from '~/content/profile'

const emit = defineEmits<{
  (e: 'toast', msg: string): void
}>()

// Mouse Spotlight Tracker
const mouseX = ref(400)
const mouseY = ref(200)

const handleMouseMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

// 3D Portrait Tilt
const tiltX = ref(0)
const tiltY = ref(0)

const handlePortraitTilt = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  tiltX.value = -(y / rect.height) * 12
  tiltY.value = (x / rect.width) * 12
}

const resetPortraitTilt = () => {
  tiltX.value = 0
  tiltY.value = 0
}

// Typewriter Role Animator
const roles = profile.roles
const currentRoleIndex = ref(0)
const displayedRole = ref('')
let charIndex = 0
let isDeleting = false

const typeRole = () => {
  const currentText = roles[currentRoleIndex.value] || roles[0]

  if (!isDeleting) {
    displayedRole.value = currentText.slice(0, charIndex + 1)
    charIndex++
    if (charIndex === currentText.length) {
      isDeleting = true
      setTimeout(typeRole, 2000)
      return
    }
  } else {
    displayedRole.value = currentText.slice(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      isDeleting = false
      currentRoleIndex.value = (currentRoleIndex.value + 1) % roles.length
    }
  }
  const speed = isDeleting ? 40 : 80
  setTimeout(typeRole, speed)
}

const copyEmail = () => {
  navigator.clipboard.writeText(profile.socials.email)
  emit('toast', 'Email address copied to clipboard!')
}

onMounted(() => {
  typeRole()
})
</script>
