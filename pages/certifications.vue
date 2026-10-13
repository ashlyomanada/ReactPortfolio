<template>
  <div class="py-24 sm:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 mb-8 text-xs font-mono">
        <NuxtLink to="/" class="text-amber-500 hover:underline">Home</NuxtLink>
        <span class="text-slate-600">/</span>
        <span class="text-slate-400">Certifications</span>
      </div>

      <!-- Page Header -->
      <div class="mb-12">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-(--text-primary) tracking-tight">
          Certifications & Credentials
        </h1>
        <p class="mt-3 text-base sm:text-lg text-(--text-secondary) max-w-2xl">
          Verified industry, academic, and technical qualifications demonstrating proficiency across frontend systems and database engineering.
        </p>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="cert in profile.certifications"
          :key="cert.id"
          class="p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-sm"
        >
          <div>
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <Icon :name="cert.badgeIcon" class="w-6 h-6" />
              </div>
              <span class="text-xs font-mono text-slate-400">{{ cert.issueDate }}</span>
            </div>

            <h3 class="text-xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
              {{ cert.title }}
            </h3>

            <div class="mt-2 text-sm font-semibold text-slate-400">
              {{ cert.issuer }}
            </div>

            <!-- Skills Covered -->
            <div class="mt-6">
              <div class="text-xs font-mono uppercase text-slate-500 mb-2">Verified Competencies:</div>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="skill in cert.skillsCovered"
                  :key="skill"
                  class="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-950 text-slate-300 border border-slate-800"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span class="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Verified Credential
            </span>

            <a
              v-if="cert.credentialUrl"
              :href="cert.credentialUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs font-bold font-mono text-amber-500 hover:underline flex items-center gap-1"
            >
              <span>View Credential</span>
              <Icon name="heroicons:arrow-top-right-on-square" class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { profile } from '~/content/profile'

useSeoMeta({
  title: 'Certifications & Honors — Ashly Omanada',
  description: 'Verified professional certifications, awards, and technical licenses.',
})
</script>
