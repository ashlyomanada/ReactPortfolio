<template>
  <div class="min-h-screen bg-(--bg-body) text-(--text-primary) flex items-center justify-center p-6">
    <div class="max-w-md w-full p-8 rounded-3xl glass-panel bg-slate-900/80 border border-slate-800 text-center space-y-6 shadow-2xl">
      <div class="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-mono text-2xl font-black text-amber-400">
        {{ error?.statusCode || 404 }}
      </div>

      <div>
        <h1 class="text-2xl font-extrabold text-slate-100">
          {{ error?.statusCode === 404 ? 'Route Not Found' : 'An Error Occurred' }}
        </h1>
        <p class="text-sm text-slate-400 mt-2 leading-relaxed font-mono">
          {{ error?.statusMessage || 'The requested destination does not exist in the routing table.' }}
        </p>
      </div>

      <div class="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          class="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
          @click="handleError"
        >
          Return to Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const handleError = () => clearError({ redirect: '/' })
</script>
