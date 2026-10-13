<template>
  <div class="mb-12 md:mb-16">
    <div class="flex items-center gap-3 mb-3">
      <span class="font-mono text-xs md:text-sm font-semibold tracking-wider text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
        {{ number }} — {{ label }}
      </span>
      <div class="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent" />
    </div>
    <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-(--text-primary)">
      {{ title }}
    </h2>
    <p v-if="description" class="mt-3 text-base md:text-lg text-(--text-secondary) max-w-2xl leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  number: string
  label: string
  title: string
  description?: string
}>()
</script>
