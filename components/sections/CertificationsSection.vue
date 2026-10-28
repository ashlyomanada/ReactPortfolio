<template>
  <section id="certifications" class="py-20 md:py-28 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <UiSectionHeader
        number="06"
          label="Verified Credentials"
          title="Certifications & Honors"
          description="Recognized proficiencies in web engineering, systems architecture, and database performance."
        />
        <NuxtLink
          to="/certifications"
          class="inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-400 group flex-shrink-0"
        >
          <span>All Credentials</span>
          <Icon name="heroicons:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <div
          v-for="cert in profile.certifications"
          :key="cert.id"
          class="p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-sm"
        >
          <div>
            <div class="flex items-center justify-between mb-4">
              <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <Icon :name="cert.badgeIcon" class="w-5 h-5" />
              </div>
              <span class="text-xs font-mono text-slate-400">{{ cert.issueDate }}</span>
            </div>

            <h3 class="text-lg md:text-xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
              {{ cert.title }}
            </h3>

            <div class="mt-1 text-xs font-semibold text-slate-400">
              {{ cert.issuer }}
            </div>

            <!-- Skills Covered -->
            <div class="mt-4 flex flex-wrap gap-1.5">
              <span
                v-for="skill in cert.skillsCovered"
                :key="skill"
                class="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-950 text-slate-300 border border-slate-800"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span class="text-[11px] font-mono text-amber-500 dark:text-emerald-400 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500 hover:bg-amber-400 dark:bg-emerald-400 dark:hover:bg-emerald-300" />
              Verified Status
            </span>
            <a
              v-if="cert.credentialUrl"
              :href="cert.credentialUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs font-bold text-slate-400 hover:text-amber-400 flex items-center gap-1"
            >
              <span>Verify</span>
              <Icon name="heroicons:arrow-top-right-on-square" class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { profile } from '~/content/profile'
</script>
