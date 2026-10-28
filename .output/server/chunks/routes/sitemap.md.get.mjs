import { aw as eventHandler, a as assertMethod, l as useRuntimeConfig, s as setHeader, ax as publicCacheControl, ay as defineCachedFunction, an as queryPages, ag as logger, a1 as getSiteConfig, aH as buildSitemapMd, aI as absoluteSiteUrl, ap as toDeployedRoute, as as toMarkdownPath } from '../nitro/nitro.mjs';
import 'unhead/server';
import 'vue';
import 'unhead/legacy';
import 'unhead/plugins';
import 'mdream';
import 'process';
import 'buffer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'lru-cache';
import 'node:crypto';
import 'node:async_hooks';
import '@mdream/js/negotiate';
import 'consola';
import 'node:url';
import '@iconify/utils';
import 'fast-xml-parser';
import 'ipx';

async function buildSitemapMarkdown(event) {
  let pages = [];
  try {
    pages = await queryPages(event);
  } catch (err) {
    logger.warn(
      `[ai-ready] Database unavailable for sitemap.md, serving an empty sitemap: ${err instanceof Error ? err.message : String(err)}`
    );
  }
  const baseURL = useRuntimeConfig(event).app.baseURL;
  const siteConfig = getSiteConfig(event);
  return buildSitemapMd(
    pages.map((page) => ({ route: page.route, title: page.title, updatedAt: page.updatedAt })),
    {
      siteName: siteConfig.name,
      resolveHref: (route) => absoluteSiteUrl(toDeployedRoute(toMarkdownPath(route), baseURL), siteConfig.url)
    }
  );
}
const cachedBuilders = /* @__PURE__ */ new Map();
function getBuildSitemapMdCached(maxAge) {
  let cached = cachedBuilders.get(maxAge);
  if (!cached) {
    cached = defineCachedFunction(buildSitemapMarkdown, {
      name: "sitemap-md",
      group: "ai-ready",
      maxAge,
      swr: true
    });
    cachedBuilders.set(maxAge, cached);
  }
  return cached;
}
const sitemap_md_get = eventHandler(async (event) => {
  assertMethod(event, "GET", true);
  const fullRuntimeConfig = useRuntimeConfig(event);
  const runtimeConfig = fullRuntimeConfig["nuxt-ai-ready"];
  const cacheSeconds = runtimeConfig.llmsTxtCacheSeconds ?? 600;
  const cacheEnabled = cacheSeconds > 0;
  setHeader(event, "Content-Type", "text/markdown; charset=utf-8");
  if (cacheEnabled) {
    setHeader(event, "Cache-Control", publicCacheControl(cacheSeconds, 3600));
  }
  return cacheEnabled ? await getBuildSitemapMdCached(cacheSeconds)(event) : await buildSitemapMarkdown(event);
});

export { sitemap_md_get as default };
//# sourceMappingURL=sitemap.md.get.mjs.map
