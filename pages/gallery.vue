<template>
  <div class="py-24 sm:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 mb-8 text-xs font-mono">
        <NuxtLink to="/" class="text-amber-500 hover:underline">Home</NuxtLink>
        <span class="text-slate-600">/</span>
        <span class="text-slate-400">Visual Gallery</span>
      </div>

      <!-- Page Header -->
      <div class="mb-12">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-(--text-primary) tracking-tight">
          Visual Gallery & Workspace
        </h1>
        <p class="mt-3 text-base sm:text-lg text-(--text-secondary) max-w-2xl">
          A visual collection of engineering work, workspace setups, design systems, and snapshots from the developer desk.
        </p>
      </div>

      <!-- Masonry-style Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in galleryItems"
          :key="index"
          class="group relative overflow-hidden rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 cursor-pointer shadow-md"
          @click="selectedImage = item"
        >
          <div class="aspect-[4/3] overflow-hidden bg-slate-950">
            <img
              :src="item.src"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-4 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between">
            <div>
              <div class="text-sm font-bold text-slate-200 group-hover:text-amber-400 transition-colors">
                {{ item.title }}
              </div>
              <div class="text-xs text-slate-400">{{ item.category }}</div>
            </div>
            <Icon name="heroicons:arrows-pointing-out" class="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
          </div>
        </div>
      </div>

      <!-- Lightbox Modal -->
      <Teleport to="body">
        <div
          v-if="selectedImage"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          @click="selectedImage = null"
        >
          <div class="max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl" @click.stop>
            <div class="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-slate-200 text-sm">
              <span class="font-bold font-mono">{{ selectedImage.title }}</span>
              <button
                type="button"
                class="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                @click="selectedImage = null"
              >
                <Icon name="heroicons:x-mark" class="w-5 h-5" />
              </button>
            </div>
            <img :src="selectedImage.src" :alt="selectedImage.title" class="max-h-[75vh] w-auto object-contain mx-auto" />
            <div class="p-4 bg-slate-950 border-t border-slate-800 text-xs text-slate-400">
              {{ selectedImage.description }}
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Visual Gallery — Ashly Omanada',
  description: 'Snapshots from development environments, systems design, and developer workstations.',
})

interface GalleryItem {
  title: string
  category: string
  src: string
  description: string
}

const selectedImage = ref<GalleryItem | null>(null)

const galleryItems: GalleryItem[] = [
  {
    title: 'EUPER Admin Dashboard',
    category: 'System UI',
    src: '/projects/capstone1.png',
    description: 'Police evaluation platform interface showcasing real-time officer evaluation tables and performance forecasts.',
  },
  {
    title: 'EUPER Client Unit Ratings',
    category: 'Analytics View',
    src: '/projects/capstone2.png',
    description: 'Public rating portal allowing real-time inspection of municipal unit evaluation standings.',
  },
  {
    title: 'MovieTune Streaming Platform',
    category: 'Frontend App',
    src: '/projects/movietune.png',
    description: 'Media discovery interface with debounced TMDB querying and custom responsive watchlists.',
  },
  {
    title: 'Kapares Resto Digital Storefront',
    category: 'Brand UI',
    src: '/projects/kapares.png',
    description: 'High-contrast food menu and ordering platform built for authentic Filipino comfort cuisine.',
  },
  {
    title: 'Bundat Burgers Shop',
    category: 'E-Commerce / Food UI',
    src: '/projects/bundat.png',
    description: 'Street-aesthetic burger storefront optimized for smartphone ordering and touch navigation.',
  },
  {
    title: 'Profile & Dev Portrait',
    category: 'Personal',
    src: '/images/portrait.png',
    description: 'Ashly Omanada developer portrait and engineering workstation avatar.',
  },
]
</script>
