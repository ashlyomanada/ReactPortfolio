<template>
  <div>
    <!-- 01 Hero & Bento Matrix -->
    <SectionsHeroSection @toast="handleToast" />

    <!-- 02 Key Stats Strip -->
    <SectionsStatsStrip />

    <!-- 03 Experience Timeline -->
    <SectionsExperienceSection />

    <!-- 04 Education & Honors -->
    <SectionsEducationSection />

    <!-- 05 Featured Projects Showcase -->
    <SectionsFeaturedProjectsSection />

    <!-- 06 Tech Stack & Tooling -->
    <SectionsTechStackSection />

    <!-- 07 Certifications & Badges -->
    <SectionsCertificationsSection />

    <!-- 08 Engineering Blog -->
    <SectionsBlogSection />

    <!-- 09 GitHub Activity Heatmap -->
    <SectionsGithubSection />

    <!-- 10 Contact Form -->
    <SectionsContactSection @toast="handleToast" />
  </div>
</template>

<script setup lang="ts">
import { profile } from '~/content/profile'

// SEO Meta
useSeoMeta({
  title: `${profile.name} — ${profile.title}`,
  description: profile.bio.short,
  ogTitle: `${profile.name} — Full-Stack Developer Portfolio`,
  ogDescription: profile.bio.valueStatement,
  ogImage: profile.avatar,
  ogImageWidth: 1200,
  ogImageHeight: 630,
})

// Structured JSON-LD Schema
useSchemaOrg([
  definePerson({
    name: profile.name,
    jobTitle: profile.title,
    url: 'https://ashlyomanada.dev',
    sameAs: [profile.socials.github, profile.socials.linkedin],
    knowsAbout: ['Vue.js', 'Nuxt', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebRTC'],
  }),
  defineWebSite({
    name: `${profile.name} — Portfolio`,
    url: 'https://ashlyomanada.dev',
  }),
])

const emit = defineEmits<{
  (e: 'toast', msg: string): void
}>()

const handleToast = (msg: string) => {
  emit('toast', msg)
}
</script>
