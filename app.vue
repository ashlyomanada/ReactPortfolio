<template>
  <div class="min-h-screen bg-(--bg-body) text-(--text-primary) transition-colors duration-300 relative selection:bg-amber-500/30 selection:text-white">
    <!-- Accessibility Skip Link -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-slate-950 focus:font-bold focus:rounded-xl focus:shadow-2xl"
    >
      Skip to content
    </a>

    <!-- Top Scroll Progress Line -->
    <LayoutScrollProgress />

    <!-- Sticky Glass Navigation Header -->
    <LayoutAppHeader
      @open-palette="openCommandPalette"
      @toggle-mobile-menu="mobileMenuOpen = true"
    />

    <!-- Main Content Area -->
    <main id="main-content" class="focus:outline-none">
      <NuxtPage @toast="showToast" />
    </main>

    <!-- Global Footer -->
    <LayoutAppFooter />

    <!-- Floating AI Assistant Widget ("Ask Ashly") -->
    <InteractiveAskAshlyChat />

    <!-- Command Palette Modal (Cmd+K) -->
    <InteractiveCommandPalette
      ref="commandPaletteRef"
      @toast="showToast"
    />

    <!-- Mobile Drawer Menu -->
    <LayoutMobileMenu
      :is-open="mobileMenuOpen"
      @close="mobileMenuOpen = false"
    />

    <!-- Toast Notification Overlay -->
    <UiToast ref="toastRef" />
  </div>
</template>

<script setup lang="ts">
const commandPaletteRef = ref<{ open: () => void; close: () => void } | null>(null)
const toastRef = ref<{ showToast: (msg: string) => void } | null>(null)
const mobileMenuOpen = ref(false)

const openCommandPalette = () => {
  commandPaletteRef.value?.open()
}

const showToast = (msg: string) => {
  toastRef.value?.showToast(msg)
}
</script>
