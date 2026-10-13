<template>
  <section id="experience" class="py-20 md:py-28 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <UiSectionHeader
        number="03"
        label="Career History"
        title="Experience & Leadership"
        description="A timeline of institutional engineering projects, architectural leadership, and production-grade delivery."
      />

      <!-- Vertical Timeline -->
      <div class="relative border-l-2 border-slate-800 ml-4 md:ml-32 pl-6 md:pl-10 space-y-12">
        <div
          v-for="item in profile.experiences"
          :key="item.id"
          class="relative group"
        >
          <!-- Timeline Marker Node -->
          <div class="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-500 group-hover:scale-125 transition-transform duration-200">
            <span v-if="item.current" class="absolute -inset-1 rounded-full bg-amber-400 animate-ping opacity-60" />
          </div>

          <!-- Period Tag (Floating to left on larger screens) -->
          <div class="md:absolute md:-left-40 md:top-1 text-xs font-mono font-bold text-amber-500 mb-2 md:mb-0">
            {{ item.period }}
          </div>

          <!-- Card Content -->
          <div class="p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 shadow-sm">
            <!-- Role and Company -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
              <div>
                <h3 class="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                  {{ item.role }}
                </h3>
                <div class="text-sm font-semibold text-slate-400 flex items-center gap-2 mt-1">
                  <span>{{ item.company }}</span>
                  <span>•</span>
                  <span class="text-xs font-mono text-slate-500">{{ item.location }}</span>
                </div>
              </div>

              <!-- Metric Badge if present -->
              <div v-if="item.metrics" class="self-start sm:self-auto px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400">
                <span class="text-slate-400">{{ item.metrics.label }}:</span>
                <span class="font-bold ml-1 text-amber-300">{{ item.metrics.value }}</span>
              </div>
            </div>

            <!-- Description -->
            <p class="mt-4 text-sm md:text-base text-slate-300 leading-relaxed">
              {{ item.description }}
            </p>

            <!-- Impact Bullets -->
            <ul class="mt-4 space-y-2 text-xs md:text-sm text-slate-400">
              <li
                v-for="(bullet, bIdx) in item.impactBullets"
                :key="bIdx"
                class="flex items-start gap-2.5"
              >
                <span class="text-amber-400 mt-1 flex-shrink-0 font-bold">›</span>
                <span class="leading-relaxed">{{ bullet }}</span>
              </li>
            </ul>

            <!-- Tech Pills -->
            <div class="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-800/60">
              <span
                v-for="tech in item.technologies"
                :key="tech"
                class="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-950 text-slate-300 border border-slate-800"
              >
                {{ tech }}
              </span>
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
