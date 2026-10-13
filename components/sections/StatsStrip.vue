<template>
  <section id="stats" ref="statsSectionRef" class="py-12 md:py-16 border-y border-slate-800/80 bg-slate-950/40 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Number Header -->
      <div class="flex items-center gap-3 mb-8">
        <span class="font-mono text-xs font-semibold tracking-wider text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          02 — Key Metrics
        </span>
        <div class="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent max-w-xs" />
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <div
          v-for="(item, idx) in profile.stats"
          :key="item.label"
          class="relative p-6 rounded-2xl glass-panel bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-sm"
        >
          <!-- Accent corner dot -->
          <div class="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-amber-400 transition-colors" />

          <!-- Value with animated count-up -->
          <div class="flex items-baseline gap-1 font-mono">
            <span class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-(--text-primary) tracking-tight group-hover:text-amber-400 transition-colors">
              {{ displayValues[idx] }}
            </span>
            <span class="text-2xl md:text-3xl font-bold text-amber-500">
              {{ item.suffix || '' }}
            </span>
          </div>

          <!-- Label -->
          <div class="mt-3 text-sm md:text-base font-bold text-slate-200">
            {{ item.label }}
          </div>

          <!-- Description -->
          <div class="mt-1 text-xs text-slate-400 leading-relaxed">
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { profile } from '~/content/profile'

const statsSectionRef = ref<HTMLElement | null>(null)
const displayValues = ref<number[]>(profile.stats.map(() => 0))
let hasAnimated = false

const startCountUp = () => {
  if (hasAnimated) return
  hasAnimated = true

  profile.stats.forEach((stat, index) => {
    const target = stat.value
    const duration = 1200 // ms
    const startTime = performance.now()

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      displayValues.value[index] = Math.floor(eased * target)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        displayValues.value[index] = target
      }
    }

    requestAnimationFrame(step)
  })
}

onMounted(() => {
  if (typeof IntersectionObserver !== 'undefined' && statsSectionRef.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCountUp()
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(statsSectionRef.value)
  } else {
    startCountUp()
  }
})
</script>
