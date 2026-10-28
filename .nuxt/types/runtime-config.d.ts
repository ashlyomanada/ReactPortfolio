import { RuntimeConfig as UserRuntimeConfig } from 'nuxt/schema'
  interface SharedRuntimeConfig {
   appSecret: string,

   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   icon: {
      serverKnownCssClasses: Array<any>,
   },

   sitemap: {
      cacheMaxAgeSeconds: number,

      debug: boolean,
   },

   "nuxt-schema-org": {
      reactive: boolean,

      minify: boolean,

      scriptAttributes: {
         "data-nuxt-schema-org": boolean,
      },

      identity: any,

      version: string,
   },

   "seo-utils-head": {
      link: Array<{

      }>,

      meta: Array<any>,
   },

   htmlCacheCapabilities: Array<{

   }>,

   "nuxt-ai-ready": {
      version: string,

      debug: boolean,

      debugCron: boolean,

      contentNegotiation: string,

      botNegotiation: boolean,

      mdreamOptions: {
         minimal: boolean,

         clean: boolean,
      },

      sitemapMd: boolean,

      describedby: boolean,

      markdownCacheHeaders: {
         maxAge: number,

         swr: boolean,
      },

      llmsTxt: {
         markdownLinks: boolean,

         directive: {
            markdown: boolean,

            html: boolean,
         },

         sections: Array<{

         }>,

         notes: any,
      },

      llmsFullTxt: boolean,

      llmsTxtCacheSeconds: number,

      prerenderCacheDir: string,

      database: {
         _tag: string,
      },

      runtimeSync: {
         enabled: boolean,

         ttl: number,

         batchSize: number,

         pruneTtl: number,
      },

      runtimeSyncSecret: any,

      sitemapPrerendered: boolean,

      i18n: any,

      ftsTokenizer: string,

      apiCatalog: any,
   },

   content: {
      databaseVersion: string,

      version: string,

      database: {
         type: string,

         filename: string,
      },

      localDatabase: {
         type: string,

         filename: string,
      },

      integrityCheck: boolean,
   },

   "nuxt-robots": {
      version: string,

      debug: boolean,

      credits: boolean,

      groups: Array<{

      }>,

      sitemap: Array<string>,

      header: boolean,

      robotsEnabledValue: string,

      robotsDisabledValue: string,

      cacheControl: string,

      botDetection: boolean,
   },

   "nuxt-og-image": {
      version: string,

      satoriOptions: any,

      resvgOptions: any,

      sharpOptions: any,

      publicStoragePath: string,

      defaults: {
         emojis: string,

         extension: string,

         width: number,

         height: number,

         cacheMaxAgeSeconds: number,
      },

      debug: boolean,

      includeTwitter: boolean,

      baseCacheKey: string,

      buildCacheDir: any,

      publish: any,

      hasNuxtIcon: boolean,

      colorPreference: string,

      cssFramework: string,

      browserEnabled: boolean,

      browser: any,

      security: {
         strict: boolean,

         maxDimension: number,

         maxDpr: number,

         renderTimeout: number,

         imageFetchTimeout: number,

         maxQueryParamSize: any,

         restrictRuntimeImagesToOrigin: boolean,

         secret: string,
      },

      componentDirs: Array<string>,

      srcDir: string,

      rootDir: string,

      communityTemplatesDir: string,
   },

   "nuxt-site-config": {
      stack: Array<{

      }>,

      version: string,

      debug: boolean,

      multiTenancy: Array<any>,
   },
  }
  interface SharedPublicRuntimeConfig {
   colorMode: {
      cookieAttrs: any,
   },

   mdc: {
      components: {
         prose: boolean,

         map: any,

         customElements: Array<any>,
      },

      headings: {
         anchorLinks: {
            h1: boolean,

            h2: boolean,

            h3: boolean,

            h4: boolean,

            h5: boolean,

            h6: boolean,
         },
      },

      highlight: {
         noApiRoute: boolean,

         highlighter: string,

         theme: {
            default: string,

            dark: string,
         },

         shikiEngine: string,

         langs: Array<string>,
      },
   },

   "nuxt-link-checker": {
      version: string,

      hasSitemapModule: boolean,

      rootDir: string,

      publicDir: string,

      excludeLinks: Array<{

      }>,

      excludePages: Array<any>,

      skipInspections: Array<any>,

      fetchTimeout: number,

      showLiveInspections: boolean,

      fetchRemoteUrls: boolean,
   },

   "nuxt-schema-org": {
      reactive: boolean,

      minify: boolean,

      scriptAttributes: {
         "data-nuxt-schema-org": boolean,
      },

      identity: any,

      version: string,
   },

   "nuxt-seo-utils-version": string,

   "seo-utils": {
      canonicalQueryWhitelist: Array<string>,

      canonicalLowercase: boolean,

      automaticTwitterTags: boolean,

      tagPriority: string,

      separator: string,

      titleSeparator: any,
   },

   skewProtection: {
      basePath: string,

      assetRecovery: {
         _tag: string,
      },

      cookie: boolean,

      debug: boolean,

      connectionTracking: any,

      routeTracking: any,

      ipTracking: any,

      reloadStrategy: string,

      multiTab: boolean,

      version: string,
   },

   content: {
      wsUrl: string,
   },

   "nuxt-robots": {
      version: string,

      debug: boolean,

      credits: boolean,

      groups: Array<{

      }>,

      sitemap: Array<string>,

      header: boolean,

      robotsEnabledValue: string,

      robotsDisabledValue: string,

      cacheControl: string,

      botDetection: boolean,
   },

   "nuxt-og-image": {
      defaults: {
         emojis: string,

         extension: string,

         width: number,

         height: number,

         cacheMaxAgeSeconds: number,
      },

      includeTwitter: boolean,

      browserEnabled: boolean,

      hasServerRuntime: boolean,
   },
  }
declare module 'nuxt/schema' {
  interface RuntimeConfig extends SharedRuntimeConfig {}
  interface PublicRuntimeConfig extends SharedPublicRuntimeConfig {}
}
declare module '@nuxt/schema' {
  interface RuntimeConfig extends SharedRuntimeConfig {}
  interface PublicRuntimeConfig extends SharedPublicRuntimeConfig {}
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: UserRuntimeConfig
        }
      }