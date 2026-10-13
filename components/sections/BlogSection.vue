<template>
  <section id="blog" class="py-20 md:py-28 border-t border-slate-800/80 bg-slate-950/30 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header with View All Archive Link -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <UiSectionHeader
          number="08"
          label="Articles & Engineering Notes"
          title="Engineering Blog"
          description="Reflections on architecture, modern Vue 3 / Nuxt 4 patterns, zero-latency WebRTC streams, and performance ergonomics."
        />
        <div class="flex items-center gap-4 flex-shrink-0">
          <NuxtLink
            to="/blog"
            class="inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-400 group"
          >
            <span>All Articles</span>
            <Icon name="heroicons:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
      </div>

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <article
          v-for="post in posts"
          :key="post.slug"
          class="p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-sm"
        >
          <div>
            <!-- Tags & Reading time -->
            <div class="flex items-center justify-between gap-2 mb-4 text-xs font-mono">
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-800"
                >
                  #{{ tag }}
                </span>
              </div>
              <span class="text-slate-400 flex-shrink-0">{{ post.readingTime }}</span>
            </div>

            <!-- Title -->
            <h3 class="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors leading-snug">
              <NuxtLink :to="`/blog/${post.slug}`">
                {{ post.title }}
              </NuxtLink>
            </h3>

            <!-- Description -->
            <p class="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3">
              {{ post.description }}
            </p>
          </div>

          <!-- Footer Metadata -->
          <div class="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>{{ post.date }}</span>
            <NuxtLink
              :to="`/blog/${post.slug}`"
              class="text-amber-500 hover:text-amber-400 font-bold flex items-center gap-1 group/btn"
            >
              <span>Read article</span>
              <Icon name="heroicons:arrow-right" class="w-3.5 h-3.5 group-btn:translate-x-1 transition-transform" />
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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
