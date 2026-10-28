<template>
  <section id="projects" class="py-20 md:py-28 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header with View All Archive Link -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <UiSectionHeader
          number="05"
          label="Engineered Systems"
          title="Featured Projects"
          description="Selected production applications and systems built for operational utility, performance, and memorable user experiences."
        />
        <NuxtLink
          to="/projects"
          class="inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-400 group flex-shrink-0"
        >
          <span>View All Projects Archive</span>
          <Icon name="heroicons:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>

      <!-- 1. Flagship Showcase Hero Card (Large Featured Project) -->
      <div
        v-if="flagshipProject"
        class="mb-14 rounded-3xl glass-panel bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden shadow-xl group"
      >
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10">
          <!-- Flagship Image / Visual Preview (7 Cols) -->
          <div class="lg:col-span-7 relative overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 aspect-[16/10]">
            <img
              :src="flagshipProject.coverImage"
              :alt="flagshipProject.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div class="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 text-xs font-mono font-bold shadow-md">
              ★ Flagship System
            </div>
          </div>

          <!-- Flagship Details (5 Cols) -->
          <div class="lg:col-span-5 space-y-5">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono text-amber-500 font-semibold uppercase tracking-wider">
                {{ flagshipProject.category }}
              </span>
              <span class="text-slate-600">•</span>
              <span class="text-xs font-mono text-slate-400">Institutional Platform</span>
            </div>

            <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-100 group-hover:text-amber-400 transition-colors">
              {{ flagshipProject.title }}
            </h3>

            <p class="text-sm sm:text-base text-slate-300 leading-relaxed">
              {{ flagshipProject.summary }}
            </p>

            <!-- Tech Stack Pills -->
            <div class="flex flex-wrap gap-2 pt-1">
              <span
                v-for="tech in flagshipProject.technologies"
                :key="tech"
                class="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-950 text-slate-300 border border-slate-800"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center gap-3 pt-3">
              <NuxtLink
                :to="`/projects/${flagshipProject.slug}`"
                class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 shadow-md shadow-amber-500/20"
              >
                <span>Read Case Study</span>
                <Icon name="heroicons:arrow-right" class="w-4 h-4" />
              </NuxtLink>

              <a
                v-if="flagshipProject.liveUrl"
                :href="flagshipProject.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                title="Open Live Deployment"
              >
                <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
              </a>

              <a
                v-if="flagshipProject.repoUrl"
                :href="flagshipProject.repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                title="View Source Repository"
              >
                <Icon name="logos:github-icon" class="w-4 h-4 dark:brightness-0 dark:invert" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Project Grid for Remaining Items -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div
          v-for="project in otherProjects"
          :key="project.slug"
          class="rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1.5 shadow-sm"
        >
          <!-- Thumbnail Cover with Hover Scale -->
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
          </div>

          <!-- Card Content Body -->
          <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <h4 class="text-xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                {{ project.title }}
              </h4>
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
                <span>Case study</span>
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
                  <Icon name="logos:github-icon" class="w-4 h-4 dark:brightness-0 dark:invert" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { profile } from '~/content/profile'

const flagshipProject = computed(() => {
  return profile.projects.find(p => p.featured) || profile.projects[0]
})

const otherProjects = computed(() => {
  return profile.projects.filter(p => p.slug !== flagshipProject.value?.slug)
})
</script>
