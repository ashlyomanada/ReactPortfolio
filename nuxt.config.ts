import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  srcDir: '.',

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxtjs/seo',
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'ashly-theme',
  },

  fonts: {
    families: [
      { name: 'Plus Jakarta Sans', weights: [500, 600, 700, 800] },
      { name: 'Inter', weights: [400, 500, 600] },
      { name: 'JetBrains Mono', weights: [400, 500, 600] },
    ],
  },

  app: {
    head: {
      titleTemplate: '%s %separator Ashly Omanada',
      templateParams: {
        separator: '—',
      },
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/portrait.png' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  site: {
    url: 'https://ashlyomanada.dev',
    name: 'Ashly Omanada — Full-Stack Developer',
    description: 'High-impact full-stack developer portfolio showcasing production web applications, real-time systems, and distributed architectures.',
    defaultLocale: 'en',
  },

  seo: {
    validateAppHead: false,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt'],
    },
  },
})
