<template>
  <Transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
    enter-to-class="translate-y-0 opacity-100 sm:scale-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="visible"
      class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl glass-panel border border-amber-500/30 text-sm font-medium text-white bg-slate-900/90"
      role="status"
      aria-live="polite"
    >
      <div class="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
      <span>{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const visible = ref(false)
const message = ref('')
let timer: ReturnType<typeof setTimeout> | null = null

const showToast = (msg: string, duration = 3000) => {
  message.value = msg
  visible.value = true
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    visible.value = false
  }, duration)
}

defineExpose({
  showToast,
})
</script>
