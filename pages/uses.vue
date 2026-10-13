<template>
  <div class="py-24 sm:py-32">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 mb-8 text-xs font-mono">
        <NuxtLink to="/" class="text-amber-500 hover:underline">Home</NuxtLink>
        <span class="text-slate-600">/</span>
        <span class="text-slate-400">Uses & Setup</span>
      </div>

      <!-- Page Header -->
      <div class="mb-12">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-(--text-primary) tracking-tight">
          Uses & Developer Setup
        </h1>
        <p class="mt-3 text-base sm:text-lg text-(--text-secondary)">
          A living document of the hardware, software, editor configuration, and tools I rely on daily to stay productive and focused.
        </p>
      </div>

      <!-- Categories -->
      <div class="space-y-12">
        <section
          v-for="section in usesList"
          :key="section.title"
          class="p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div class="flex items-center gap-3 pb-3 border-b border-slate-800">
            <Icon :name="section.icon" class="w-6 h-6 text-amber-500" />
            <h2 class="text-xl font-bold text-slate-100">{{ section.title }}</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="item in section.items"
              :key="item.name"
              class="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1"
            >
              <div class="font-bold text-sm text-slate-200 flex items-center justify-between">
                <span>{{ item.name }}</span>
                <span v-if="item.badge" class="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {{ item.badge }}
                </span>
              </div>
              <p class="text-xs text-slate-400 leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Uses & Tooling — Ashly Omanada',
  description: 'Hardware, editor setup, software, and desk ergonomics used by Ashly Omanada.',
})

const usesList = [
  {
    title: 'Hardware & Desk Gear',
    icon: 'heroicons:computer-desktop',
    items: [
      {
        name: 'Primary Workstation',
        badge: 'M-Series Silicon',
        description: 'Apple Silicon machine powering rapid Docker virtualization, instantaneous Vite rebuilds, and all-day battery life.',
      },
      {
        name: 'Display Setup',
        badge: '4K IPS',
        description: 'High-density color-accurate external monitor configured in portrait/landscape for side-by-side terminal & browser inspecting.',
      },
      {
        name: 'Mechanical Keyboard',
        badge: 'Custom 75%',
        description: 'Tactile switches lubed for ergonomic typing comfort during long engineering sessions.',
      },
      {
        name: 'Audio & Isolation',
        badge: 'ANC',
        description: 'Active noise cancelling headphones for deep-focus coding states.',
      },
    ],
  },
  {
    title: 'Development Environment & Editor',
    icon: 'heroicons:code-bracket',
    items: [
      {
        name: 'Visual Studio Code',
        badge: 'Editor',
        description: 'Sleek dark theme, Vue - Official (Volar), Tailwind CSS IntelliSense, ESLint, and Prettier integration.',
      },
      {
        name: 'Typography: JetBrains Mono',
        badge: 'Font',
        description: 'Crisp monospace typeface with programming ligatures for crystal-clear symbol distinction.',
      },
      {
        name: 'Zsh & Oh My Zsh',
        badge: 'Shell',
        description: 'Clean zsh configuration with Git aliases, fast path autocompletion, and starship prompt.',
      },
      {
        name: 'Git & GitHub CLI',
        badge: 'Version Control',
        description: 'Command line driven PRs, branch management, and automated test runners.',
      },
    ],
  },
  {
    title: 'Software & Productivity Tooling',
    icon: 'heroicons:wrench-screwdriver',
    items: [
      {
        name: 'Postman & Hoppscotch',
        badge: 'API Client',
        description: 'Designing, inspecting, and stress-testing REST endpoints and WebSocket payloads.',
      },
      {
        name: 'Docker Desktop',
        badge: 'Containers',
        description: 'Isolated local PostgreSQL, MySQL, and Redis services matching production architectures.',
      },
      {
        name: 'Figma',
        badge: 'Design',
        description: 'Wireframing layouts, extracting design tokens, and validating responsive spacing.',
      },
      {
        name: 'Raycast',
        badge: 'Launcher',
        description: 'Keyboard-centric workflow for clipboard management, window snapping, and rapid shortcuts.',
      },
    ],
  },
]
</script>
