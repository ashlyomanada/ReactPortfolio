<template>
  <div v-if="project" class="py-24 sm:py-32">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 mb-8 text-xs font-mono">
        <NuxtLink to="/" class="text-amber-500 hover:underline">Home</NuxtLink>
        <span class="text-slate-600">/</span>
        <NuxtLink to="/projects" class="text-amber-500 hover:underline">Projects</NuxtLink>
        <span class="text-slate-600">/</span>
        <span class="text-slate-400 truncate">{{ project.title }}</span>
      </div>

      <!-- Hero Header -->
      <div class="space-y-4 mb-10">
        <div class="flex items-center gap-3">
          <span class="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold">
            {{ project.category }}
          </span>
          <span v-if="project.featured" class="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-mono text-xs font-bold">
            Flagship Platform
          </span>
        </div>

        <h1 class="text-3xl sm:text-5xl font-extrabold text-(--text-primary) tracking-tight leading-tight">
          {{ project.title }}
        </h1>

        <p class="text-lg sm:text-xl text-slate-300 leading-relaxed">
          {{ project.tagline }}
        </p>

        <!-- Project Links Bar -->
        <div class="flex flex-wrap items-center gap-4 pt-4">
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <span>Visit Live Platform</span>
            <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
          </a>

          <a
            v-if="project.repoUrl"
            :href="project.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium text-xs tracking-wider uppercase transition-colors flex items-center gap-2"
          >
            <Icon name="logos:github-icon" class="w-4 h-4" />
            <span>Source Code</span>
          </a>
        </div>
      </div>

      <!-- Big Cover Screenshot -->
      <div class="rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 mb-16 shadow-2xl">
        <img
          :src="project.coverImage"
          :alt="project.title"
          class="w-full h-auto object-cover"
        />
      </div>

      <!-- Case Study Content Grid -->
      <div class="space-y-12 text-slate-300">
        <!-- Overview & Role -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800">
          <div>
            <div class="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">My Role</div>
            <div class="font-bold text-slate-100 text-sm">{{ project.role }}</div>
          </div>
          <div>
            <div class="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">Category</div>
            <div class="font-bold text-slate-100 text-sm">{{ project.category }}</div>
          </div>
          <div>
            <div class="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">Stack Highlights</div>
            <div class="font-mono text-amber-400 text-xs">{{ project.technologies.join(' • ') }}</div>
          </div>
        </div>

        <!-- 1. The Challenge & Problem Statement -->
        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span class="text-amber-500 font-mono text-lg">01.</span>
            <span>The Challenge</span>
          </h2>
          <p class="text-base text-slate-300 leading-relaxed">
            {{ project.problem }}
          </p>
        </section>

        <!-- 2. Architectural Design & Engineering -->
        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span class="text-amber-500 font-mono text-lg">02.</span>
            <span>System Architecture</span>
          </h2>
          <p class="text-base text-slate-300 leading-relaxed">
            {{ project.architecture }}
          </p>
        </section>

        <!-- 3. Key Features & Implementation Highlights -->
        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span class="text-amber-500 font-mono text-lg">03.</span>
            <span>Key Feature Highlights</span>
          </h2>
          <ul class="space-y-3">
            <li
              v-for="(feat, idx) in project.keyFeatures"
              :key="idx"
              class="flex items-start gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-sm"
            >
              <Icon name="heroicons:check-circle" class="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{{ feat }}</span>
            </li>
          </ul>
        </section>

        <!-- 4. Measurable Outcomes & Impact -->
        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span class="text-amber-500 font-mono text-lg">04.</span>
            <span>Outcome & Operational Impact</span>
          </h2>
          <p class="text-base text-slate-300 leading-relaxed">
            {{ project.outcome }}
          </p>
        </section>

        <!-- Bottom Navigation CTA -->
        <div class="pt-12 border-t border-slate-800 flex items-center justify-between">
          <NuxtLink
            to="/projects"
            class="text-sm font-mono text-amber-500 hover:text-amber-400 flex items-center gap-2"
          >
            <Icon name="heroicons:arrow-left" class="w-4 h-4" />
            <span>Back to All Projects</span>
          </NuxtLink>

          <NuxtLink
            to="/#contact"
            class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono font-bold"
          >
            Discuss a similar project
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="py-32 text-center text-slate-400">
    <p>Project not found.</p>
    <NuxtLink to="/projects" class="text-amber-400 underline mt-4 inline-block">Return to Projects</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { profile } from '~/content/profile'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const project = computed(() => {
  return profile.projects.find(p => p.slug === slug.value)
})

useSeoMeta({
  title: computed(() => project.value ? `${project.value.title} — Case Study` : 'Project Case Study'),
  description: computed(() => project.value ? project.value.summary : 'Engineering case study by Ashly Omanada'),
})
</script>
