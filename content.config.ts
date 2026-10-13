import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        tags: z.array(z.string()),
        readingTime: z.string().optional(),
        coverImage: z.string().optional(),
      }),
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        title: z.string(),
        tagline: z.string(),
        summary: z.string(),
        coverImage: z.string(),
        category: z.string(),
        technologies: z.array(z.string()),
        liveUrl: z.string().optional(),
        repoUrl: z.string().optional(),
        featured: z.boolean().default(false),
      }),
    }),
  },
})
