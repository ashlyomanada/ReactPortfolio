<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/70 backdrop-blur-md"
        @click.self="close"
        @keydown.esc="close"
      >
        <div
          class="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden text-slate-100 transform transition-all"
          @click.stop
        >
          <!-- Search Input Bar -->
          <div class="flex items-center px-4 py-3.5 border-b border-slate-800">
            <Icon name="heroicons:magnifying-glass" class="w-5 h-5 text-amber-400 mr-3 flex-shrink-0" />
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              placeholder="Type a command or search sections... (e.g. projects, theme, copy email)"
              class="w-full bg-transparent text-sm md:text-base text-white placeholder-slate-400 focus:outline-none"
              @keydown.down.prevent="navigateResults(1)"
              @keydown.up.prevent="navigateResults(-1)"
              @keydown.enter.prevent="executeActive"
            />
            <kbd class="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">ESC</kbd>
          </div>

          <!-- Command List -->
          <div class="max-h-80 overflow-y-auto p-2 divide-y divide-slate-800/40">
            <div v-if="filteredCommands.length === 0" class="py-10 text-center text-sm text-slate-400">
              No matching commands or destinations found.
            </div>

            <div
              v-for="(cmd, index) in filteredCommands"
              :key="cmd.id"
              class="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-sm transition-colors"
              :class="index === activeIndex ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' : 'text-slate-200 hover:bg-slate-800/80'"
              @mouseenter="activeIndex = index"
              @click="executeCommand(cmd)"
            >
              <div class="flex items-center gap-3">
                <div class="p-1.5 rounded-lg bg-slate-800 text-amber-400 border border-slate-700/50">
                  <Icon :name="cmd.icon" class="w-4 h-4" />
                </div>
                <div>
                  <div class="font-medium">{{ cmd.title }}</div>
                  <div class="text-xs text-slate-400">{{ cmd.category }}</div>
                </div>
              </div>
              <span v-if="cmd.shortcut" class="text-xs font-mono text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                {{ cmd.shortcut }}
              </span>
            </div>
          </div>

          <!-- Footer status strip -->
          <div class="px-4 py-2.5 bg-slate-950/70 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 bg-slate-800 rounded text-[10px]">↑</kbd>
                <kbd class="px-1.5 py-0.5 bg-slate-800 rounded text-[10px]">↓</kbd>
                navigate
              </span>
              <span>•</span>
              <span class="inline-flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 bg-slate-800 rounded text-[10px]">↵</kbd>
                select
              </span>
            </div>
            <span class="text-amber-400 font-mono text-[11px]">Ashly Omanada</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { profile } from '~/content/profile'

const router = useRouter()
const colorMode = useColorMode()

const isOpen = ref(false)
const query = ref('')
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

interface CommandItem {
  id: string
  title: string
  category: string
  icon: string
  shortcut?: string
  action: () => void
}

const emit = defineEmits<{
  (e: 'toast', msg: string): void
}>()

const commands: CommandItem[] = [
  // Navigation sections
  { id: 'sec-hero', title: '01 — Hero / Overview', category: 'Section Jump', icon: 'heroicons:home', action: () => jumpTo('#hero') },
  { id: 'sec-stats', title: '02 — Stats & Experience Count', category: 'Section Jump', icon: 'heroicons:chart-bar', action: () => jumpTo('#stats') },
  { id: 'sec-exp', title: '03 — Career & Experience Timeline', category: 'Section Jump', icon: 'heroicons:briefcase', action: () => jumpTo('#experience') },
  { id: 'sec-edu', title: '04 — Education & Degree', category: 'Section Jump', icon: 'heroicons:academic-cap', action: () => jumpTo('#education') },
  { id: 'sec-projects', title: '05 — Featured Projects Showcase', category: 'Section Jump', icon: 'heroicons:folder-open', action: () => jumpTo('#projects') },
  { id: 'sec-tech', title: '06 — Tech Stack & Tooling Matrix', category: 'Section Jump', icon: 'heroicons:cpu-chip', action: () => jumpTo('#tech-stack') },
  { id: 'sec-certs', title: '07 — Certifications & Achievements', category: 'Section Jump', icon: 'heroicons:shield-check', action: () => jumpTo('#certifications') },
  { id: 'sec-blog', title: '08 — Engineering Blog & Articles', category: 'Section Jump', icon: 'heroicons:document-text', action: () => jumpTo('#blog') },
  { id: 'sec-github', title: '09 — GitHub Activity & Commit Graph', category: 'Section Jump', icon: 'heroicons:code-bracket', action: () => jumpTo('#github') },
  { id: 'sec-contact', title: '10 — Contact & Inquiry Form', category: 'Section Jump', icon: 'heroicons:envelope', action: () => jumpTo('#contact') },

  // Pages
  { id: 'page-projects', title: 'All Projects Archive (/projects)', category: 'Page Navigation', icon: 'heroicons:squares-2x2', action: () => router.push('/projects') },
  { id: 'page-blog', title: 'Blog Index (/blog)', category: 'Page Navigation', icon: 'heroicons:newspaper', action: () => router.push('/blog') },
  { id: 'page-tech', title: 'Interactive Tech Stack (/tech-stack)', category: 'Page Navigation', icon: 'heroicons:command-line', action: () => router.push('/tech-stack') },
  { id: 'page-certs', title: 'Certifications Catalog (/certifications)', category: 'Page Navigation', icon: 'heroicons:trophy', action: () => router.push('/certifications') },
  { id: 'page-gallery', title: 'Visual Gallery & Workshop (/gallery)', category: 'Page Navigation', icon: 'heroicons:photo', action: () => router.push('/gallery') },
  { id: 'page-uses', title: 'Uses & Developer Gear (/uses)', category: 'Page Navigation', icon: 'heroicons:wrench-screwdriver', action: () => router.push('/uses') },

  // Actions
  {
    id: 'act-theme',
    title: 'Toggle Dark / Light Theme',
    category: 'Preferences',
    icon: 'heroicons:sun',
    shortcut: 'T',
    action: () => {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    },
  },
  {
    id: 'act-copy-email',
    title: `Copy Email (${profile.socials.email})`,
    category: 'Action',
    icon: 'heroicons:clipboard-document',
    shortcut: 'C',
    action: () => {
      navigator.clipboard.writeText(profile.socials.email)
      emit('toast', 'Email copied to clipboard!')
    },
  },
  {
    id: 'act-github',
    title: 'Open GitHub Profile',
    category: 'External Link',
    icon: 'logos:github-icon',
    action: () => window.open(profile.socials.github, '_blank'),
  },
  {
    id: 'act-linkedin',
    title: 'Open LinkedIn Profile',
    category: 'External Link',
    icon: 'logos:linkedin-icon',
    action: () => window.open(profile.socials.linkedin, '_blank'),
  },
  {
    id: 'act-resume',
    title: 'Download Résumé (PDF)',
    category: 'Resource',
    icon: 'heroicons:arrow-down-tray',
    action: () => window.open(profile.resumeUrl, '_blank'),
  },
]

const filteredCommands = computed(() => {
  if (!query.value.trim()) return commands
  const q = query.value.toLowerCase()
  return commands.filter(
    cmd => cmd.title.toLowerCase().includes(q) || cmd.category.toLowerCase().includes(q)
  )
})

const jumpTo = (hash: string) => {
  if (router.currentRoute.value.path !== '/') {
    router.push(`/${hash}`)
  } else {
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}

const navigateResults = (direction: number) => {
  const total = filteredCommands.value.length
  if (total === 0) return
  activeIndex.value = (activeIndex.value + direction + total) % total
}

const executeActive = () => {
  const cmd = filteredCommands.value[activeIndex.value]
  if (cmd) executeCommand(cmd)
}

const executeCommand = (cmd: CommandItem) => {
  close()
  cmd.action()
}

const open = () => {
  isOpen.value = true
  query.value = ''
  activeIndex.value = 0
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const close = () => {
  isOpen.value = false
}

// Global keyboard listener for Cmd/Ctrl+K
const onKeyDown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    if (isOpen.value) close()
    else open()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})

defineExpose({
  open,
  close,
})
</script>
