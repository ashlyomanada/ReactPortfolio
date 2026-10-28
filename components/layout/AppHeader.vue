<template>
  <header
    class="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
    :class="isScrolled ? 'glass-nav shadow-lg' : 'bg-transparent py-2'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
      <!-- Brand Logo / Monogram -->
      <NuxtLink to="/" class="group flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-amber-400 group-hover:border-amber-400 transition-colors shadow-md">
          AO<span class="text-amber-500 text-xs animate-pulse">•</span>
        </div>
        <div class="flex flex-col">
          <span class="font-extrabold tracking-tight text-sm sm:text-base text-(--text-primary) group-hover:text-amber-400 transition-colors">
            Ashly Omañada
          </span>
          <span class="text-[11px] font-mono text-slate-400 hidden sm:inline">
            Full-Stack Developer
          </span>
        </div>
      </NuxtLink>

      <!-- Desktop Navigation Links -->
      <nav class="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 dark:bg-slate-900/80 border border-slate-800 text-xs font-medium backdrop-blur-md">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="px-3 py-1.5 rounded-full transition-colors text-slate-300 hover:text-white hover:bg-slate-800"
          :class="activeSection === item.id ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30' : ''"
        >
          <span class="font-mono text-[10px] text-amber-500 mr-1">{{ item.num }}</span>
          {{ item.name }}
        </a>
      </nav>

      <!-- Right Action Toolbar -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Quick Cmd+K Palette Button -->
        <button
          type="button"
          class="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all cursor-pointer"
          aria-label="Open Command Palette"
          @click="$emit('openPalette')"
        >
          <Icon name="heroicons:magnifying-glass" class="w-3.5 h-3.5 text-amber-400" />
          <span class="hidden md:inline">Commands</span>
          <kbd class="font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-slate-400">⌘K</kbd>
        </button>

        <!-- Theme Toggle -->
        <button
          type="button"
          class="p-2 text-slate-300 hover:text-amber-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all cursor-pointer"
          :aria-label="`Switch to ${colorMode.value === 'dark' ? 'light' : 'dark'} mode`"
          @click="toggleTheme"
        >
          <Icon
            :name="colorMode.value === 'dark' ? 'heroicons:sun' : 'heroicons:moon'"
            class="w-4 h-4 transition-transform duration-300 hover:rotate-45"
          />
        </button>

        <!-- Mobile Drawer Hamburger -->
        <button
          type="button"
          class="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all"
          aria-label="Toggle mobile menu"
          @click="$emit('toggleMobileMenu')"
        >
          <Icon name="heroicons:bars-3" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

defineEmits<{
  (e: 'openPalette'): void
  (e: 'toggleMobileMenu'): void
}>()

const isScrolled = ref(false)
const activeSection = ref('hero')

const navItems = [
  { num: '01', name: 'Profile', href: '/#hero', id: 'hero' },
  { num: '03', name: 'Projects', href: '/#projects', id: 'projects' },
  { num: '04', name: 'Experience', href: '/#experience', id: 'experience' },
  { num: '05', name: 'Stack', href: '/#tech-stack', id: 'tech-stack' },
  { num: '08', name: 'Activity', href: '/#github', id: 'github' },
  { num: '09', name: 'Writing', href: '/#blog', id: 'blog' },
  { num: '10', name: 'Contact', href: '/#contact', id: 'contact' },
]

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const onScroll = () => {
  if (typeof window === 'undefined') return
  isScrolled.value = window.scrollY > 30

  // Active section tracker
  const sectionIds = ['hero', 'projects', 'experience', 'tech-stack', 'github', 'blog', 'contact']
  const scrollPosition = window.scrollY + 200

  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeSection.value = id
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
