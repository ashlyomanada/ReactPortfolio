<template>
  <div class="py-24 sm:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-3">
          <NuxtLink to="/" class="font-mono text-xs text-amber-500 hover:underline flex items-center gap-1">
            <Icon name="heroicons:arrow-left" class="w-3.5 h-3.5" />
            <span>Home</span>
          </NuxtLink>
          <span class="text-slate-600">/</span>
          <span class="font-mono text-xs text-slate-400">Archive</span>
        </div>
        <h1 class="text-4xl sm:text-5xl font-extrabold text-(--text-primary) tracking-tight">
          All Projects & Systems
        </h1>
        <p class="mt-3 text-base sm:text-lg text-(--text-secondary) max-w-2xl">
          An exhaustive archive of production web applications, institutional platforms, client projects, and open-source software built by Ashly Omanada.
        </p>
      </div>

      <!-- Controls: Category Filter + Search -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
        <!-- Categories -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            class="px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer"
            :class="activeCategory === cat ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Search Input -->
        <div class="relative w-full sm:w-72">
          <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or tech..."
            class="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      <!-- Projects Grid -->
      <div v-if="filteredProjects.length === 0" class="py-16 text-center text-slate-500 font-mono text-sm">
        No projects found matching "{{ searchQuery }}".
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="project in filteredProjects"
          :key="project.slug"
          class="rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1.5 shadow-sm"
        >
          <!-- Thumbnail Cover -->
          <div class="relative overflow-hidden aspect-[16/10] bg-slate-950 border-b border-slate-800/80">
            <img
              :src="project.coverImage"
              :alt="project.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div class="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/90 text-amber-400 text-[11px] font-mono border border-slate-700">
              {{ project.category }}
            </div>
            <div v-if="project.featured" class="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-mono font-bold">
              ★ Featured
            </div>
          </div>

          <!-- Card Content Body -->
          <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <h3 class="text-xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                {{ project.title }}
              </h3>
              <p class="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                {{ project.summary }}
              </p>
            </div>

            <!-- Tech Pills -->
            <div class="flex flex-wrap gap-1.5 pt-2">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-950 text-slate-300 border border-slate-800/80"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Footer Actions -->
            <div class="pt-4 border-t border-slate-800/60 flex items-center justify-between">
              <NuxtLink
                :to="`/projects/${project.slug}`"
                class="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1.5 group/link"
              >
                <span>Read case study</span>
                <Icon name="heroicons:arrow-right" class="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </NuxtLink>

              <div class="flex items-center gap-2">
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Live Demo"
                >
                  <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
                </a>
                <a
                  v-if="project.repoUrl"
                  :href="project.repoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Source Code"
                >
                  <Icon name="logos:github-icon" class="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { profile } from '~/content/profile'

useSeoMeta({
  title: 'Projects Archive — Ashly Omanada',
  description: 'Production web platforms, real-time dashboards, and full-stack software built by Ashly Omanada.',
})

const categories = ['All', 'Full-Stack', 'Frontend']
const activeCategory = ref('All')
const searchQuery = ref('')

const filteredProjects = computed(() => {
  return profile.projects.filter(p => {
    const matchesCat = activeCategory.value === 'All' || p.category === activeCategory.value
    const matchesQuery =
      !searchQuery.value.trim() ||
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.technologies.some(t => t.toLowerCase().includes(searchQuery.value.toLowerCase()))
    return matchesCat && matchesQuery
  })
})
</script>
