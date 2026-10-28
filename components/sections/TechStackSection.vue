<template>
  <section id="tech-stack" class="py-20 md:py-28 border-t border-slate-800/80 bg-slate-950/40 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <UiSectionHeader
          number="05"
          label="Core Competencies"
          title="Tech Stack & Tooling"
          description="Languages, frameworks, databases, and DevOps infrastructure powering end-to-end engineering."
        />
        <NuxtLink
          to="/tech-stack"
          class="inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-400 group flex-shrink-0"
        >
          <span>Deep-Dive Matrix</span>
          <Icon name="heroicons:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-800/80">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          class="px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer"
          :class="selectedCategory === cat ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20' : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Tech Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div
          v-for="tech in filteredStack"
          :key="tech.name"
          class="p-4 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1 shadow-sm"
        >
          <!-- Icon Container -->
          <div class="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-2 mb-3 group-hover:border-amber-500/50 transition-colors">
            <Icon :name="tech.icon" class="w-7 h-7" />
          </div>

          <!-- Name -->
          <div class="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-amber-400 transition-colors line-clamp-1">
            {{ tech.name }}
          </div>

          <!-- Category pill -->
          <span class="mt-1 text-[10px] font-mono text-slate-400">
            {{ tech.category }}
          </span>

          <!-- Proficiency -->
          <span
            class="mt-2 text-[10px] font-mono px-2 py-0.5 rounded-full"
            :class="tech.proficiency === 'Expert' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' : 'bg-slate-950 text-slate-400 border border-slate-800'"
          >
            {{ tech.proficiency }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { profile } from '~/content/profile'

const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Database', 'DevOps/Cloud', 'Tools']
const selectedCategory = ref('All')

const filteredStack = computed(() => {
  if (selectedCategory.value === 'All') {
    return profile.techStack
  }
  return profile.techStack.filter(item => item.category === selectedCategory.value)
})
</script>
