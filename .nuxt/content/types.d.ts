import type { PageCollectionItemBase, DataCollectionItemBase } from '@nuxt/content'

declare module '@nuxt/content' {
   interface BlogCollectionItem extends PageCollectionItemBase {
    title: string
    description: string
    date: string
    tags: string[]
    readingTime?: string
    coverImage?: string
  }
  
   interface ProjectsCollectionItem extends PageCollectionItemBase {
    title: string
    tagline: string
    summary: string
    coverImage: string
    category: string
    technologies: string[]
    liveUrl?: string
    repoUrl?: string
    featured?: boolean
  }
  

  interface PageCollections {
    blog: BlogCollectionItem
    projects: ProjectsCollectionItem
  }

  interface Collections {
    blog: BlogCollectionItem
    projects: ProjectsCollectionItem
  }
}
