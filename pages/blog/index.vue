<template>
  <div class="py-24 sm:py-32">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-3">
          <NuxtLink to="/" class="font-mono text-xs text-amber-500 hover:underline flex items-center gap-1">
            <Icon name="heroicons:arrow-left" class="w-3.5 h-3.5" />
            <span>Home</span>
          </NuxtLink>
          <span class="text-slate-600">/</span>
          <span class="font-mono text-xs text-slate-400">Engineering Notes</span>
        </div>
        <h1 class="text-4xl sm:text-5xl font-extrabold text-(--text-primary) tracking-tight">
          Articles & Writing
        </h1>
        <p class="mt-3 text-base sm:text-lg text-(--text-secondary)">
          Reflections on distributed web engineering, frontend performance patterns, WebRTC pipelines, and developer tooling.
        </p>
      </div>

      <!-- Articles List -->
      <div class="space-y-8">
        <article
          v-for="post in posts"
          :key="post.slug"
          class="p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-sm"
        >
          <div class="flex items-center justify-between gap-2 mb-3 text-xs font-mono">
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-800"
              >
                #{{ tag }}
              </span>
            </div>
            <span class="text-slate-400">{{ post.readingTime }}</span>
          </div>

          <h2 class="text-2xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
            <NuxtLink :to="`/blog/${post.slug}`">
              {{ post.title }}
            </NuxtLink>
          </h2>

          <p class="mt-3 text-sm text-slate-300 leading-relaxed">
            {{ post.description }}
          </p>

          <div class="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>{{ post.date }}</span>
            <NuxtLink
              :to="`/blog/${post.slug}`"
              class="text-amber-500 hover:text-amber-400 font-bold flex items-center gap-1 group/btn"
            >
              <span>Read article</span>
              <Icon name="heroicons:arrow-right" class="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Blog & Engineering Notes — Ashly Omanada',
  description: 'Articles on Vue 3, Nuxt 4, WebRTC real-time systems, and zero-cost web performance.',
})

interface PostPreview {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readingTime: string
}

const posts: PostPreview[] = [
  {
    slug: 'architecting-resilient-realtime-systems',
    title: 'Architecting Resilient Real-Time Systems with Vue 3 & WebRTC',
    description: 'A deep dive into managing peer connections, low-latency signaling, and resilient state synchronization in distributed frontend applications.',
    date: 'Feb 18, 2025',
    tags: ['Vue.js', 'WebRTC', 'TypeScript'],
    readingTime: '5 min read',
  },
  {
    slug: 'zero-cost-optimizations-nuxt4-tailwind4',
    title: 'Zero-Cost Performance Optimizations with Nuxt 4 & Tailwind CSS v4',
    description: 'How Vite-native CSS processing, fluid typography clamps, and island hydration patterns drive 99+ mobile Lighthouse scores.',
    date: 'Jan 24, 2025',
    tags: ['Nuxt 4', 'Tailwind v4', 'Web Vitals'],
    readingTime: '4 min read',
  },
]
</script>
