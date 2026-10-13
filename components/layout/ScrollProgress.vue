<template>
  <div class="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-transparent">
    <div
      class="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 transition-all duration-75 shadow-[0_0_12px_rgba(245,158,11,0.7)]"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>

<script setup lang="ts">
const progress = ref(0)

const updateProgress = () => {
  if (typeof window === 'undefined') return
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>
