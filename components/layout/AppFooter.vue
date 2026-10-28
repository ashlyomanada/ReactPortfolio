<template>
  <footer class="mt-24 border-t border-slate-800/80 bg-slate-950/70 text-slate-400 text-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <!-- Brand / Identity Column -->
        <div class="md:col-span-2 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-slate-900 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-amber-400">
              AO
            </div>
            <span class="font-bold text-lg text-slate-100">Ashly Omanada</span>
          </div>
          <p class="text-slate-400 max-w-sm text-sm leading-relaxed">
            Full-stack developer building resilient web applications, modern distributed architectures, and intuitive digital interfaces.
          </p>
          <div class="flex items-center gap-2 text-xs font-mono text-slate-400">
            <ClientOnly>
              <span>Calapan City, PH (UTC+8) • {{ currentTime }}</span>
              <template #fallback>
                <span>Calapan City, PH (UTC+8)</span>
              </template>
            </ClientOnly>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-mono text-xs uppercase tracking-wider text-amber-500 font-semibold mb-3">Navigation</h4>
          <ul class="space-y-2 text-xs">
            <li><NuxtLink to="/#hero" class="hover:text-amber-400 transition-colors">01 — Profile</NuxtLink></li>
            <li><NuxtLink to="/#projects" class="hover:text-amber-400 transition-colors">03 — Projects</NuxtLink></li>
            <li><NuxtLink to="/#experience" class="hover:text-amber-400 transition-colors">04 — Experience</NuxtLink></li>
            <li><NuxtLink to="/#tech-stack" class="hover:text-amber-400 transition-colors">05 — Tech Stack</NuxtLink></li>
            <li><NuxtLink to="/#blog" class="hover:text-amber-400 transition-colors">09 — Blog</NuxtLink></li>
            <li><NuxtLink to="/#contact" class="hover:text-amber-400 transition-colors">10 — Contact</NuxtLink></li>
          </ul>
        </div>

        <!-- Inner Pages & Socials -->
        <div>
          <h4 class="font-mono text-xs uppercase tracking-wider text-amber-500 font-semibold mb-3">Deep Dives</h4>
          <ul class="space-y-2 text-xs mb-4">
            <li><NuxtLink to="/projects" class="hover:text-amber-400 transition-colors">All Projects</NuxtLink></li>
            <li><NuxtLink to="/tech-stack" class="hover:text-amber-400 transition-colors">Interactive Tech Stack</NuxtLink></li>
            <li><NuxtLink to="/certifications" class="hover:text-amber-400 transition-colors">Certifications & Honors</NuxtLink></li>
            <li><NuxtLink to="/gallery" class="hover:text-amber-400 transition-colors">Gallery & Workspace</NuxtLink></li>
            <li><NuxtLink to="/uses" class="hover:text-amber-400 transition-colors">Uses & Ergonomics</NuxtLink></li>
          </ul>
          <div class="flex items-center gap-3">
            <a :href="profile.socials.github" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-slate-900 hover:text-amber-400 transition-colors border border-slate-800" aria-label="GitHub">
              <Icon name="logos:github-icon" class="w-4 h-4 dark:brightness-0 dark:invert" />
            </a>
            <a :href="profile.socials.linkedin" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-slate-900 hover:text-amber-400 transition-colors border border-slate-800" aria-label="LinkedIn">
              <Icon name="logos:linkedin-icon" class="w-4 h-4" />
            </a>
            <a :href="`mailto:${profile.socials.email}`" class="p-2 rounded-lg bg-slate-900 hover:text-amber-400 transition-colors border border-slate-800 text-amber-400" aria-label="Email">
              <Icon name="heroicons:envelope" class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          © {{ new Date().getFullYear() }} Ashly Omanada. All rights reserved.
        </div>
        <div class="flex items-center gap-4">
          <span>Built with Nuxt 4 & Tailwind CSS v4</span>
          <button
            type="button"
            class="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
            aria-label="Scroll back to top"
            @click="scrollToTop"
          >
            <span>Back to top</span>
            <Icon name="heroicons:arrow-up" class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { profile } from '~/content/profile'

const currentTime = ref('')

const updateTime = () => {
  try {
    currentTime.value = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(new Date())
  } catch (e) {
    currentTime.value = new Date().toLocaleTimeString()
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  updateTime()
  const interval = setInterval(updateTime, 1000)
  onUnmounted(() => clearInterval(interval))
})
</script>
