declare module '#ai-ready-virtual/sitemap-config.mjs' {
  const config: { sitemaps?: Record<string, { sitemapName?: string, route?: string, _route?: string }> }
  export default config
}
declare module '#ai-ready-virtual/read-page-data.mjs' {
  export function readMarkdownLinkAvailabilityFromFilesystem(): Promise<{
    runtimeMarkdownAvailable: boolean
    paths: string[]
  }>
  export function readPageDataFromFilesystem(): Promise<{
    pages: Array<{
      route: string
      title: string
      description: string
      headings: string
      keywords: string[]
      updatedAt: string
      markdown: string
    }>
    errorRoutes: string[]
  }>
}

declare module '#ai-ready-virtual/page-data.mjs' {
  export const pages: never[]
}

declare module '#ai-ready-virtual/logger.mjs' {
  import type { ConsolaInstance } from 'consola'
  export const logger: ConsolaInstance
}

declare module '#ai-ready-virtual/i18n-runtime.mjs' {
  export {
    computeLocaleAlternates,
    localePath,
    resolveI18nDomain,
    resolveLocaleAlternates,
    resolveLocaleFromRoute,
  } from 'nuxtseo-shared/i18n-runtime'
}

declare module '#ai-ready-virtual/db-provider.mjs' {
  import type { AiReadyDatabaseEvent } from '#ai-ready/server/db/context'
  import type { DrizzleDatabase } from '#ai-ready/server/db/drizzle/client'
  export function createClient(event?: AiReadyDatabaseEvent): Promise<DrizzleDatabase>
}

declare module '#ai-ready-virtual/db-schema.mjs' {
  export * from '#ai-ready/server/db/schema/sqlite'
}

declare module '#ai-ready-virtual/database-runtime.mjs' {
  export * from '#ai-ready/server/db/drizzle'
}

declare module '#ai-ready-virtual/content-lookup.mjs' {
  import type { H3Event } from '#nuxtseo/h3'
  export function lookupContentPage(event: H3Event, path: string): Promise<{
    markdown: string
    title?: string
    description?: string
    updatedAt?: string
  } | null>
}

declare module '#ai-ready-virtual/agent-skills.mjs' {
  import type { AgentSkillsIndex } from 'nuxt-ai-ready'
  export const agentSkillsIndex: AgentSkillsIndex | null
  export const localAgentSkillArtifacts: Record<string, string>
}
