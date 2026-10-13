<template>
  <section id="education" class="py-16 md:py-24 border-t border-slate-800/60 bg-slate-950/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <UiSectionHeader
        number="04"
        label="Academic Foundation"
        title="Education & Honors"
        description="Formal computer science and software development foundations, capstone distinctions, and specialized coursework."
      />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div
          v-for="edu in profile.education"
          :key="edu.id"
          class="lg:col-span-12 p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="font-mono text-xs text-amber-500 font-semibold">{{ edu.period }}</span>
                <span class="text-slate-600">•</span>
                <span class="text-xs text-slate-400 font-mono">{{ edu.location }}</span>
              </div>
              <h3 class="text-2xl font-bold text-slate-100">{{ edu.degree }}</h3>
              <div class="text-base font-semibold text-slate-400 mt-1">{{ edu.institution }}</div>
            </div>

            <div v-if="edu.honors" class="self-start sm:self-auto px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center gap-2 text-amber-300 text-xs font-mono font-bold">
              <Icon name="heroicons:trophy" class="w-4 h-4 text-amber-400" />
              <span>{{ edu.honors }}</span>
            </div>
          </div>

          <p class="mt-4 text-sm md:text-base text-slate-300 leading-relaxed">
            {{ edu.description }}
          </p>

          <div class="mt-6">
            <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Key Academic Highlights & Leadership</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                v-for="(item, i) in edu.highlights"
                :key="i"
                class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5"
              >
                <span class="text-amber-400 font-bold">›</span>
                <span>{{ item }}</span>
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
</script>
