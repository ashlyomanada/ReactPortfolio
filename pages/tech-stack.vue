<template>
  <div class="py-24 sm:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 mb-8 text-xs font-mono">
        <NuxtLink to="/" class="text-amber-500 hover:underline">Home</NuxtLink>
        <span class="text-slate-600">/</span>
        <span class="text-slate-400">Tech Stack Matrix</span>
      </div>

      <!-- Page Header -->
      <div class="mb-12">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-(--text-primary) tracking-tight">
          Engineering Stack & Tooling
        </h1>
        <p class="mt-3 text-base sm:text-lg text-(--text-secondary) max-w-3xl">
          A complete, categorized inventory of frameworks, databases, libraries, and dev tooling that power Ashly's production applications.
        </p>
      </div>

      <!-- Grouped Sections -->
      <div class="space-y-16">
        <section
          v-for="cat in categories"
          :key="cat"
          class="space-y-6"
        >
          <div class="flex items-center gap-3">
            <h2 class="text-2xl font-bold text-slate-100">{{ cat }}</h2>
            <div class="h-px flex-1 bg-slate-800" />
            <span class="text-xs font-mono text-amber-500">
              {{ getCount(cat) }} technologies
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="item in getCategoryItems(cat)"
              :key="item.name"
              class="p-5 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex items-start gap-4 group"
            >
              <div class="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-2.5 flex-shrink-0 group-hover:border-amber-500/50 transition-colors">
                <Icon :name="item.icon" class="w-7 h-7" />
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <div class="font-bold text-slate-200 group-hover:text-amber-400 transition-colors truncate">
                    {{ item.name }}
                  </div>
                  <span
                    class="text-[10px] font-mono px-2 py-0.5 rounded-full flex-shrink-0"
                    :class="item.proficiency === 'Expert' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' : 'bg-slate-950 text-slate-400 border border-slate-800'"
                  >
                    {{ item.proficiency }}
                  </span>
                </div>
                <div class="text-xs text-slate-400 mt-1">
                  Production verified • Active workflow
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { profile } from '~/content/profile'

useSeoMeta({
  title: 'Tech Stack Matrix — Ashly Omanada',
  description: 'Full-stack engineering capabilities, languages, frameworks, and architecture toolkits.',
})

const categories = ['Languages', 'Frontend', 'Backend', 'Database', 'DevOps/Cloud', 'Tools'] as const

const getCategoryItems = (category: string) => {
  return profile.techStack.filter(item => item.category === category)
}

const getCount = (category: string) => {
  return getCategoryItems(category).length
}
</script>
