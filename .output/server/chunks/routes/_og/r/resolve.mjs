import { d as defineEventHandler, U as useOgImageRuntimeConfig, ab as getRequestHost, a1 as getSiteConfig, c as createError, K as parseURL, ad as isInternalRoute, Z as withQuery, S as fetchWithEvent, ac as sendRedirect } from '../../../nitro/nitro.mjs';
import { p as parseSameOriginPath, g as getEventQuery } from '../../../_/ssrf.mjs';
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

const RE_META_TAG = /<meta\b[^>]*>/gi;
const RE_META_KEY = /\b(?:property|name)\s*=\s*(?:"([^"]+)"|'([^']+)')/i;
const RE_META_CONTENT = /\bcontent\s*=\s*(?:"([^"]*)"|'([^']*)')/i;
const MAX_RESOLVE_PATH_LENGTH = 2048;
const RE_STRIP_PREFIX = /^.*?\/_og\/r/;
const RE_IMAGE_EXT = /\.(?:png|jpe?g|webp|svg)$/i;
function extractMeta(html, key) {
  for (const tagMatch of html.matchAll(RE_META_TAG)) {
    const tag = tagMatch[0];
    const keyMatch = tag.match(RE_META_KEY);
    const keyValue = keyMatch?.[1] ?? keyMatch?.[2];
    if (keyValue?.toLowerCase() !== key)
      continue;
    const contentMatch = tag.match(RE_META_CONTENT);
    const content = contentMatch?.[1] ?? contentMatch?.[2];
    if (content)
      return content;
  }
  return void 0;
}
function resolveTargetPath(event) {
  const pathname = parseURL(event.path).pathname;
  const stripped = pathname.replace(RE_STRIP_PREFIX, "") || "/";
  return stripped.replace(RE_IMAGE_EXT, "") || "/";
}
const resolve = defineEventHandler(async (event) => {
  const runtimeConfig = useOgImageRuntimeConfig(event);
  const security = runtimeConfig.security;
  if (security?.restrictRuntimeImagesToOrigin) {
    const requestHost = getRequestHost(event, { xForwardedHost: true });
    let requestHostname;
    if (requestHost) {
      try {
        requestHostname = new URL(`http://${requestHost}`).hostname;
      } catch {
        requestHostname = void 0;
      }
    }
    const isLoopback = !!security.secret && (requestHostname === "localhost" || requestHostname === "127.0.0.1" || requestHostname === "::1");
    if (!isLoopback) {
      const siteHost = new URL(getSiteConfig(event).url).host;
      const allowedHosts = [siteHost, ...security.restrictRuntimeImagesToOrigin.map((o) => {
        try {
          return new URL(o).host;
        } catch {
          return o;
        }
      })];
      if (!requestHost || !allowedHosts.includes(requestHost)) {
        throw createError({
          statusCode: 403,
          statusMessage: "[Nuxt OG Image] Host not allowed."
        });
      }
    }
  }
  if (security?.maxQueryParamSize && true) {
    const queryString = parseURL(event.path).search || "";
    if (queryString.length > security.maxQueryParamSize) {
      throw createError({
        statusCode: 400,
        statusMessage: `[Nuxt OG Image] Query string exceeds maximum allowed length of ${security.maxQueryParamSize} characters.`
      });
    }
  }
  const targetPath = resolveTargetPath(event);
  if (targetPath.length > MAX_RESOLVE_PATH_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage: `[Nuxt OG Image] Target path exceeds ${MAX_RESOLVE_PATH_LENGTH} characters.`
    });
  }
  const parsedPath = parseSameOriginPath(targetPath);
  if (targetPath.includes("://") || parsedPath._tag === "Err") {
    throw createError({
      statusCode: 400,
      statusMessage: "[Nuxt OG Image] Target path must be a same-origin path."
    });
  }
  const pagePath = parsedPath.value;
  if (isInternalRoute(pagePath)) {
    throw createError({
      statusCode: 400,
      statusMessage: "[Nuxt OG Image] Cannot resolve og:image for internal route."
    });
  }
  const query = getEventQuery(event);
  const ogKey = typeof query._og_key === "string" ? query._og_key.toLowerCase() : "";
  const metaKey = ogKey === "twitter" ? "twitter:image" : "og:image";
  const forwardQuery = {};
  for (const [k, v] of Object.entries(query)) {
    if (!k.startsWith("_og_"))
      forwardQuery[k] = v;
  }
  const fetchPath = withQuery(pagePath, forwardQuery);
  const html = await fetchWithEvent(event, fetchPath, {
    headers: { accept: "text/html" },
    responseType: "text"
  }).catch((err) => {
    throw createError({
      statusCode: err.statusCode === 404 ? 404 : 502,
      statusMessage: `[Nuxt OG Image] Failed to fetch ${fetchPath}: ${err.message || "unknown error"}`
    });
  });
  const resolved = extractMeta(String(html), metaKey);
  if (!resolved) {
    throw createError({
      statusCode: 404,
      statusMessage: `[Nuxt OG Image] No <meta property="${metaKey}"> found on ${fetchPath}.`
    });
  }
  return sendRedirect(event, resolved, 302);
});

export { resolve as default };
//# sourceMappingURL=resolve.mjs.map
