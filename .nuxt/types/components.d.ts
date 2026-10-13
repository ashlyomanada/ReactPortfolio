
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  InteractiveAskAshlyChat: typeof import("../../components/interactive/AskAshlyChat.vue")['default']
  InteractiveCommandPalette: typeof import("../../components/interactive/CommandPalette.vue")['default']
  LayoutAppFooter: typeof import("../../components/layout/AppFooter.vue")['default']
  LayoutAppHeader: typeof import("../../components/layout/AppHeader.vue")['default']
  LayoutMobileMenu: typeof import("../../components/layout/MobileMenu.vue")['default']
  LayoutScrollProgress: typeof import("../../components/layout/ScrollProgress.vue")['default']
  SectionsBlogSection: typeof import("../../components/sections/BlogSection.vue")['default']
  SectionsCertificationsSection: typeof import("../../components/sections/CertificationsSection.vue")['default']
  SectionsContactSection: typeof import("../../components/sections/ContactSection.vue")['default']
  SectionsEducationSection: typeof import("../../components/sections/EducationSection.vue")['default']
  SectionsExperienceSection: typeof import("../../components/sections/ExperienceSection.vue")['default']
  SectionsFeaturedProjectsSection: typeof import("../../components/sections/FeaturedProjectsSection.vue")['default']
  SectionsGithubSection: typeof import("../../components/sections/GithubSection.vue")['default']
  SectionsHeroSection: typeof import("../../components/sections/HeroSection.vue")['default']
  SectionsStatsStrip: typeof import("../../components/sections/StatsStrip.vue")['default']
  SectionsTechStackSection: typeof import("../../components/sections/TechStackSection.vue")['default']
  UiSectionHeader: typeof import("../../components/ui/SectionHeader.vue")['default']
  UiToast: typeof import("../../components/ui/Toast.vue")['default']
  ProseA: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue")['default']
  ProseBlockquote: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue")['default']
  ProseCode: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseCode.vue")['default']
  ProseEm: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue")['default']
  ProseH1: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH1.vue")['default']
  ProseH2: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH2.vue")['default']
  ProseH3: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH3.vue")['default']
  ProseH4: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH4.vue")['default']
  ProseH5: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue")['default']
  ProseH6: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue")['default']
  ProseHr: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue")['default']
  ProseImg: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue")['default']
  ProseLi: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue")['default']
  ProseOl: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue")['default']
  ProseP: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue")['default']
  ProsePre: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProsePre.vue")['default']
  ProseScript: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue")['default']
  ProseStrong: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue")['default']
  ProseTable: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue")['default']
  ProseTbody: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue")['default']
  ProseTd: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue")['default']
  ProseTh: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue")['default']
  ProseThead: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue")['default']
  ProseTr: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue")['default']
  ProseUl: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue")['default']
  /**
   * Displays the welcome screen used by new Nuxt projects.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
   */
  NuxtWelcome: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/welcome.vue")['default']
  /**
   * Renders the selected layout around pages or error content.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
   */
  NuxtLayout: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  /**
   * Catches client-side errors from its default slot and renders an error slot.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
   */
  NuxtErrorBoundary: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  /**
   * Renders its default slot only on the client, with an optional server fallback.
   *
   * @see https://nuxt.com/docs/4.x/api/components/client-only
   */
  ClientOnly: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/client-only")['default']
  /**
   * Renders its content only during development.
   *
   * @see https://nuxt.com/docs/4.x/api/components/dev-only
   */
  DevOnly: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/server-placeholder")['default']
  /**
   * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
   */
  NuxtLink: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-link")['default']
  /**
   * Displays a progress bar during page navigation.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
   */
  NuxtLoadingIndicator: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  /**
   * Formats dates and times consistently across server and client using the user's locale.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
   */
  NuxtTime: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  /**
   * Announces route changes to assistive technologies using the current page title.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
   */
  NuxtRouteAnnouncer: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  /**
   * Announces dynamic content changes to assistive technologies.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
   */
  NuxtAnnouncer: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
  NuxtImg: typeof import("../../node_modules/.pnpm/@nuxt+image@2.1.0_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magic_tbp73d5v3govyfz3i4hfpy665q/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
  NuxtPicture: typeof import("../../node_modules/.pnpm/@nuxt+image@2.1.0_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magic_tbp73d5v3govyfz3i4hfpy665q/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
  ColorScheme: typeof import("../../node_modules/.pnpm/@nuxtjs+color-mode@4.0.1_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7._h6vqfgcms47owztyaaec2yznoq/node_modules/@nuxtjs/color-mode/dist/runtime/component.vue")['default']
  Icon: typeof import("../../node_modules/.pnpm/@nuxt+icon@2.5.1_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magic-_hswihdylrjkfep5h5vodmfzxku/node_modules/@nuxt/icon/dist/runtime/components/index")['default']
  ContentRenderer: typeof import("../../node_modules/.pnpm/@nuxt+content@3.16.2_@nuxt+schema@4.6.1_@oxc-project+types@0.153.0_better-sqlite3@13.0.3_conf_jhcs4ej4ppnm7i2jitvb7p4oda/node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue")['default']
  /**
   * Renders the current page from the `pages/` directory.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
   */
  NuxtPage: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/pages/runtime/page")['default']
  NoScript: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/components")['Body']
  MDC: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue")['default']
  MDCCached: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/MDCCached.vue")['default']
  MDCRenderer: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue")['default']
  MDCSlot: typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/MDCSlot.vue")['default']
  SchemaOrgArticle: typeof import("@unhead/schema-org/vue")['SchemaOrgArticle']
  SchemaOrgBreadcrumb: typeof import("@unhead/schema-org/vue")['SchemaOrgBreadcrumb']
  SchemaOrgComment: typeof import("@unhead/schema-org/vue")['SchemaOrgComment']
  SchemaOrgDiscussionForumPosting: typeof import("@unhead/schema-org/vue")['SchemaOrgDiscussionForumPosting']
  SchemaOrgEmployerAggregateRating: typeof import("@unhead/schema-org/vue")['SchemaOrgEmployerAggregateRating']
  SchemaOrgEvent: typeof import("@unhead/schema-org/vue")['SchemaOrgEvent']
  SchemaOrgFoodEstablishment: typeof import("@unhead/schema-org/vue")['SchemaOrgFoodEstablishment']
  SchemaOrgHowTo: typeof import("@unhead/schema-org/vue")['SchemaOrgHowTo']
  SchemaOrgImage: typeof import("@unhead/schema-org/vue")['SchemaOrgImage']
  SchemaOrgJobPosting: typeof import("@unhead/schema-org/vue")['SchemaOrgJobPosting']
  SchemaOrgLocalBusiness: typeof import("@unhead/schema-org/vue")['SchemaOrgLocalBusiness']
  SchemaOrgMathSolver: typeof import("@unhead/schema-org/vue")['SchemaOrgMathSolver']
  SchemaOrgOrganization: typeof import("@unhead/schema-org/vue")['SchemaOrgOrganization']
  SchemaOrgPerson: typeof import("@unhead/schema-org/vue")['SchemaOrgPerson']
  SchemaOrgProduct: typeof import("@unhead/schema-org/vue")['SchemaOrgProduct']
  SchemaOrgQuestion: typeof import("@unhead/schema-org/vue")['SchemaOrgQuestion']
  SchemaOrgQuiz: typeof import("@unhead/schema-org/vue")['SchemaOrgQuiz']
  SchemaOrgRecipe: typeof import("@unhead/schema-org/vue")['SchemaOrgRecipe']
  SchemaOrgReview: typeof import("@unhead/schema-org/vue")['SchemaOrgReview']
  SchemaOrgVideo: typeof import("@unhead/schema-org/vue")['SchemaOrgVideo']
  SchemaOrgVacationRental: typeof import("@unhead/schema-org/vue")['SchemaOrgVacationRental']
  SchemaOrgWebPage: typeof import("@unhead/schema-org/vue")['SchemaOrgWebPage']
  SchemaOrgWebSite: typeof import("@unhead/schema-org/vue")['SchemaOrgWebSite']
  SchemaOrgMovie: typeof import("@unhead/schema-org/vue")['SchemaOrgMovie']
  SchemaOrgCourse: typeof import("@unhead/schema-org/vue")['SchemaOrgCourse']
  SchemaOrgItemList: typeof import("@unhead/schema-org/vue")['SchemaOrgItemList']
  SchemaOrgBook: typeof import("@unhead/schema-org/vue")['SchemaOrgBook']
  SchemaOrgSoftwareApp: typeof import("@unhead/schema-org/vue")['SchemaOrgSoftwareApp']
  SkewNotification: typeof import("../../node_modules/.pnpm/nuxt-skew-protection@2.0.2_jkuupfosvlh4z5lihnyqcpfvm4/node_modules/nuxt-skew-protection/dist/runtime/app/components/SkewNotification.vue")['default']
  /**
   * Renders a non-interactive server component without shipping client-side JavaScript.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
   */
  NuxtIsland: typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyInteractiveAskAshlyChat: LazyComponent<typeof import("../../components/interactive/AskAshlyChat.vue")['default']>
  LazyInteractiveCommandPalette: LazyComponent<typeof import("../../components/interactive/CommandPalette.vue")['default']>
  LazyLayoutAppFooter: LazyComponent<typeof import("../../components/layout/AppFooter.vue")['default']>
  LazyLayoutAppHeader: LazyComponent<typeof import("../../components/layout/AppHeader.vue")['default']>
  LazyLayoutMobileMenu: LazyComponent<typeof import("../../components/layout/MobileMenu.vue")['default']>
  LazyLayoutScrollProgress: LazyComponent<typeof import("../../components/layout/ScrollProgress.vue")['default']>
  LazySectionsBlogSection: LazyComponent<typeof import("../../components/sections/BlogSection.vue")['default']>
  LazySectionsCertificationsSection: LazyComponent<typeof import("../../components/sections/CertificationsSection.vue")['default']>
  LazySectionsContactSection: LazyComponent<typeof import("../../components/sections/ContactSection.vue")['default']>
  LazySectionsEducationSection: LazyComponent<typeof import("../../components/sections/EducationSection.vue")['default']>
  LazySectionsExperienceSection: LazyComponent<typeof import("../../components/sections/ExperienceSection.vue")['default']>
  LazySectionsFeaturedProjectsSection: LazyComponent<typeof import("../../components/sections/FeaturedProjectsSection.vue")['default']>
  LazySectionsGithubSection: LazyComponent<typeof import("../../components/sections/GithubSection.vue")['default']>
  LazySectionsHeroSection: LazyComponent<typeof import("../../components/sections/HeroSection.vue")['default']>
  LazySectionsStatsStrip: LazyComponent<typeof import("../../components/sections/StatsStrip.vue")['default']>
  LazySectionsTechStackSection: LazyComponent<typeof import("../../components/sections/TechStackSection.vue")['default']>
  LazyUiSectionHeader: LazyComponent<typeof import("../../components/ui/SectionHeader.vue")['default']>
  LazyUiToast: LazyComponent<typeof import("../../components/ui/Toast.vue")['default']>
  LazyProseA: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue")['default']>
  LazyProseBlockquote: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue")['default']>
  LazyProseCode: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseCode.vue")['default']>
  LazyProseEm: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue")['default']>
  LazyProseH1: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH1.vue")['default']>
  LazyProseH2: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH2.vue")['default']>
  LazyProseH3: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH3.vue")['default']>
  LazyProseH4: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH4.vue")['default']>
  LazyProseH5: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue")['default']>
  LazyProseH6: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue")['default']>
  LazyProseHr: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue")['default']>
  LazyProseImg: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue")['default']>
  LazyProseLi: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue")['default']>
  LazyProseOl: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue")['default']>
  LazyProseP: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue")['default']>
  LazyProsePre: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProsePre.vue")['default']>
  LazyProseScript: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue")['default']>
  LazyProseStrong: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue")['default']>
  LazyProseTable: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue")['default']>
  LazyProseTbody: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue")['default']>
  LazyProseTd: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue")['default']>
  LazyProseTh: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue")['default']>
  LazyProseThead: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue")['default']>
  LazyProseTr: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue")['default']>
  LazyProseUl: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue")['default']>
  /**
   * Lazy-loaded version of `<NuxtWelcome>`.
   *
   * Displays the welcome screen used by new Nuxt projects.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
   */
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  /**
   * Lazy-loaded version of `<NuxtLayout>`.
   *
   * Renders the selected layout around pages or error content.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
   */
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  /**
   * Lazy-loaded version of `<NuxtErrorBoundary>`.
   *
   * Catches client-side errors from its default slot and renders an error slot.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
   */
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  /**
   * Lazy-loaded version of `<ClientOnly>`.
   *
   * Renders its default slot only on the client, with an optional server fallback.
   *
   * @see https://nuxt.com/docs/4.x/api/components/client-only
   */
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/client-only")['default']>
  /**
   * Lazy-loaded version of `<DevOnly>`.
   *
   * Renders its content only during development.
   *
   * @see https://nuxt.com/docs/4.x/api/components/dev-only
   */
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  /**
   * Lazy-loaded version of `<NuxtLink>`.
   *
   * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
   */
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  /**
   * Lazy-loaded version of `<NuxtLoadingIndicator>`.
   *
   * Displays a progress bar during page navigation.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
   */
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  /**
   * Lazy-loaded version of `<NuxtTime>`.
   *
   * Formats dates and times consistently across server and client using the user's locale.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
   */
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  /**
   * Lazy-loaded version of `<NuxtRouteAnnouncer>`.
   *
   * Announces route changes to assistive technologies using the current page title.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
   */
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  /**
   * Lazy-loaded version of `<NuxtAnnouncer>`.
   *
   * Announces dynamic content changes to assistive technologies.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
   */
  LazyNuxtAnnouncer: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxt+image@2.1.0_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magic_tbp73d5v3govyfz3i4hfpy665q/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxt+image@2.1.0_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magic_tbp73d5v3govyfz3i4hfpy665q/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
  LazyColorScheme: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+color-mode@4.0.1_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7._h6vqfgcms47owztyaaec2yznoq/node_modules/@nuxtjs/color-mode/dist/runtime/component.vue")['default']>
  LazyIcon: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxt+icon@2.5.1_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magic-_hswihdylrjkfep5h5vodmfzxku/node_modules/@nuxt/icon/dist/runtime/components/index")['default']>
  LazyContentRenderer: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxt+content@3.16.2_@nuxt+schema@4.6.1_@oxc-project+types@0.153.0_better-sqlite3@13.0.3_conf_jhcs4ej4ppnm7i2jitvb7p4oda/node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue")['default']>
  /**
   * Lazy-loaded version of `<NuxtPage>`.
   *
   * Renders the current page from the `pages/` directory.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
   */
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/pages/runtime/page")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/components")['Body']>
  LazyMDC: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue")['default']>
  LazyMDCCached: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/MDCCached.vue")['default']>
  LazyMDCRenderer: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue")['default']>
  LazyMDCSlot: LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/MDCSlot.vue")['default']>
  LazySchemaOrgArticle: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgArticle']>
  LazySchemaOrgBreadcrumb: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgBreadcrumb']>
  LazySchemaOrgComment: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgComment']>
  LazySchemaOrgDiscussionForumPosting: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgDiscussionForumPosting']>
  LazySchemaOrgEmployerAggregateRating: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgEmployerAggregateRating']>
  LazySchemaOrgEvent: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgEvent']>
  LazySchemaOrgFoodEstablishment: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgFoodEstablishment']>
  LazySchemaOrgHowTo: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgHowTo']>
  LazySchemaOrgImage: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgImage']>
  LazySchemaOrgJobPosting: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgJobPosting']>
  LazySchemaOrgLocalBusiness: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgLocalBusiness']>
  LazySchemaOrgMathSolver: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgMathSolver']>
  LazySchemaOrgOrganization: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgOrganization']>
  LazySchemaOrgPerson: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgPerson']>
  LazySchemaOrgProduct: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgProduct']>
  LazySchemaOrgQuestion: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgQuestion']>
  LazySchemaOrgQuiz: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgQuiz']>
  LazySchemaOrgRecipe: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgRecipe']>
  LazySchemaOrgReview: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgReview']>
  LazySchemaOrgVideo: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgVideo']>
  LazySchemaOrgVacationRental: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgVacationRental']>
  LazySchemaOrgWebPage: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgWebPage']>
  LazySchemaOrgWebSite: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgWebSite']>
  LazySchemaOrgMovie: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgMovie']>
  LazySchemaOrgCourse: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgCourse']>
  LazySchemaOrgItemList: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgItemList']>
  LazySchemaOrgBook: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgBook']>
  LazySchemaOrgSoftwareApp: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgSoftwareApp']>
  LazySkewNotification: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt-skew-protection@2.0.2_jkuupfosvlh4z5lihnyqcpfvm4/node_modules/nuxt-skew-protection/dist/runtime/app/components/SkewNotification.vue")['default']>
  /**
   * Lazy-loaded version of `<NuxtIsland>`.
   *
   * Renders a non-interactive server component without shipping client-side JavaScript.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
   */
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

declare module '#app' {
  interface NuxtAppLiterals {
    componentName: "ProseA" | "LazyProseA" | "ProseBlockquote" | "LazyProseBlockquote" | "ProseCode" | "LazyProseCode" | "ProseEm" | "LazyProseEm" | "ProseH1" | "LazyProseH1" | "ProseH2" | "LazyProseH2" | "ProseH3" | "LazyProseH3" | "ProseH4" | "LazyProseH4" | "ProseH5" | "LazyProseH5" | "ProseH6" | "LazyProseH6" | "ProseHr" | "LazyProseHr" | "ProseImg" | "LazyProseImg" | "ProseLi" | "LazyProseLi" | "ProseOl" | "LazyProseOl" | "ProseP" | "LazyProseP" | "ProsePre" | "LazyProsePre" | "ProseScript" | "LazyProseScript" | "ProseStrong" | "LazyProseStrong" | "ProseTable" | "LazyProseTable" | "ProseTbody" | "LazyProseTbody" | "ProseTd" | "LazyProseTd" | "ProseTh" | "LazyProseTh" | "ProseThead" | "LazyProseThead" | "ProseTr" | "LazyProseTr" | "ProseUl" | "LazyProseUl" | "Icon" | "LazyIcon" | (string & {})
  }
}

export {}
