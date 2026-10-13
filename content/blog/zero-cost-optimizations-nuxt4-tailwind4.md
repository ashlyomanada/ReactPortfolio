---
title: "Zero-Cost Performance Optimizations with Nuxt 4 & Tailwind CSS v4"
description: "How Vite-native CSS processing, fluid typography clamps, and island hydration patterns drive 99+ mobile Lighthouse scores."
date: "2025-01-24"
tags: ["Nuxt 4", "Tailwind CSS v4", "Performance", "Web Vitals"]
readingTime: "4 min read"
coverImage: "/projects/movietune.png"
---

# Zero-Cost Performance Optimizations with Nuxt 4 & Tailwind CSS v4

Shipping fast web applications isn't merely about stripping out code—it's about orchestrating asset loading, avoiding layout shifts, and leveraging next-generation compilation pipelines.

```css
/* CSS-first design tokens with fluid clamping */
@theme {
  --font-display: 'Plus Jakarta Sans', sans-serif;
  --color-accent: #f59e0b;
}

:root {
  --fluid-h1: clamp(2.25rem, 1.8rem + 2.25vw, 4.5rem);
}
```

## Eliminating Hydration Overhead

With Nuxt 4's component hydration directives like `hydrate-on-visible`, below-the-fold interactive widgets—such as terminal emulators, complex interactive graphs, and modals—remain inert until they scroll into the viewport, freeing up the main thread for instant Time to Interactive (TTI).
