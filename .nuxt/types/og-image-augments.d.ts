/// <reference path="./og-image-virtual.d.ts" />
/// <reference path="./og-image-bindings.d.ts" />
import type { OgImageIconsData, OgImageOptions, OgImageRenderEventContext, OgImageRuntimeConfig, VNode } from '../../runtime/types'

declare module '@nuxt/schema' {
  interface AppRouteRulesExtensions {
    ogImage?: false | OgImageOptions & Record<string, any>
  }
}

declare module 'nitropack' {
  interface NitroRouteRules {
    ogImage?: false | OgImageOptions & Record<string, any>
  }
  interface NitroRouteConfig {
    ogImage?: false | OgImageOptions & Record<string, any>
  }
  interface NitroRuntimeHooks {
    'nuxt-og-image:context': (ctx: OgImageRenderEventContext) => void | Promise<void>
    'nuxt-og-image:satori:vnodes': (vnodes: VNode, ctx: OgImageRenderEventContext) => void | Promise<void>
  }
  interface NitroApp {
    _ogImageCacheBackendWarned?: boolean
    _ogImageIconsData?: OgImageIconsData
  }
  interface NitroRuntimeConfig {
    'nuxt-og-image': OgImageRuntimeConfig
  }
}

declare module 'nitropack/types' {
  interface NitroRouteRules {
    ogImage?: false | OgImageOptions & Record<string, any>
  }
  interface NitroRouteConfig {
    ogImage?: false | OgImageOptions & Record<string, any>
  }
  interface NitroRuntimeHooks {
    'nuxt-og-image:context': (ctx: OgImageRenderEventContext) => void | Promise<void>
    'nuxt-og-image:satori:vnodes': (vnodes: VNode, ctx: OgImageRenderEventContext) => void | Promise<void>
  }
  interface NitroApp {
    _ogImageCacheBackendWarned?: boolean
    _ogImageIconsData?: OgImageIconsData
  }
  interface NitroRuntimeConfig {
    'nuxt-og-image': OgImageRuntimeConfig
  }
}

declare module '@nuxt/schema' {
  interface RequestEventContext {
    _nitro?: {
      routeRules?: import('nitropack').NitroRouteRules
    }
    _ogImageSigningSecret?: string
    _ogImagePrerenderPaths?: Map<string, string>
  }
}

declare module 'h3' {
  interface H3EventContext {
    _nitro?: {
      routeRules?: import('nitropack').NitroRouteRules
    }
    _ogImageSigningSecret?: string
    _ogImagePrerenderPaths?: Map<string, string>
  }
}

export {}
