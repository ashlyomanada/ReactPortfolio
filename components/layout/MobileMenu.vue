<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity ease-linear duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-between p-6"
        @click.self="close"
      >
        <!-- Top bar with brand & close -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-slate-900 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-amber-400">
              AO
            </div>
            <span class="font-bold text-slate-100">Ashly Omanada</span>
          </div>
          <button
            type="button"
            class="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
            aria-label="Close menu"
            @click="close"
          >
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <!-- Links List -->
        <div class="py-6 space-y-2 overflow-y-auto">
          <a
            v-for="item in navLinks"
            :key="item.href"
            :href="item.href"
            class="flex items-center justify-between p-3.5 rounded-xl text-base font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-900/80 transition-colors"
            @click="close"
          >
            <span class="flex items-center gap-3">
              <span class="font-mono text-xs text-amber-500">{{ item.num }}</span>
              <span>{{ item.name }}</span>
            </span>
            <Icon name="heroicons:chevron-right" class="w-4 h-4 text-slate-600" />
          </a>

          <div class="pt-4 border-t border-slate-800/80 mt-4 space-y-2">
            <div class="text-xs font-mono uppercase tracking-wider text-slate-500 px-3">Inner Pages</div>
            <NuxtLink
              v-for="sub in subPages"
              :key="sub.to"
              :to="sub.to"
              class="flex items-center justify-between p-3 rounded-xl text-sm text-slate-300 hover:text-amber-300 hover:bg-slate-900/60"
              @click="close"
            >
              <span>{{ sub.name }}</span>
              <Icon name="heroicons:arrow-up-right" class="w-4 h-4 text-slate-600" />
            </NuxtLink>
          </div>
        </div>

        <!-- Footer actions & socials -->
        <div class="border-t border-slate-800 pt-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <a
              :href="profile.socials.github"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400"
              aria-label="GitHub"
            >
              <Icon name="logos:github-icon" class="w-5 h-5 dark:brightness-0 dark:invert" />
            </a>
            <a
              :href="profile.socials.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400"
              aria-label="LinkedIn"
            >
              <Icon name="logos:linkedin-icon" class="w-5 h-5" />
            </a>
            <a
              :href="`mailto:${profile.socials.email}`"
              class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400"
              aria-label="Email"
            >
              <Icon name="heroicons:envelope" class="w-5 h-5 text-amber-400" />
            </a>
          </div>
          <span class="text-xs font-mono text-slate-500">v4.6 Nuxt</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { profile } from '~/content/profile'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => {
  emit('close')
}

const navLinks = [
  { num: '01', name: 'Profile Overview', href: '/#hero' },
  { num: '02', name: 'Key Metrics & Stats', href: '/#stats' },
  { num: '03', name: 'Experience Timeline', href: '/#experience' },
  { num: '04', name: 'Education & Honors', href: '/#education' },
  { num: '05', name: 'Featured Projects', href: '/#projects' },
  { num: '06', name: 'Tech Stack Matrix', href: '/#tech-stack' },
  { num: '07', name: 'Certifications', href: '/#certifications' },
  { num: '08', name: 'Engineering Blog', href: '/#blog' },
  { num: '09', name: 'GitHub Activity', href: '/#github' },
  { num: '10', name: 'Get In Touch', href: '/#contact' },
]

const subPages = [
  { name: 'Projects Archive', to: '/projects' },
  { name: 'Blog Posts', to: '/blog' },
  { name: 'Tech Stack Deep-Dive', to: '/tech-stack' },
  { name: 'Certificates & Badges', to: '/certifications' },
  { name: 'Gallery & Workspace', to: '/gallery' },
  { name: 'Uses & Hardware', to: '/uses' },
]
</script>
