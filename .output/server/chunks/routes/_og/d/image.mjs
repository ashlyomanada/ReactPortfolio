import { I as createModuleLogger, J as normalizeKey, K as parseURL, L as extractEncodedSegment, M as digestCanonical, O as createStorage, P as lruCacheDriver, Q as hash, R as createNitroRouteRuleMatcher$1, l as useRuntimeConfig, S as fetchWithEvent, T as componentNames, c as createError, U as useOgImageRuntimeConfig, V as createSitePathResolver, W as verifyOgImageSignature, X as decodeOgImageParams, Y as withoutTrailingSlash, Z as withQuery, _ as separateProps, $ as defu, a0 as sanitizeProps, a1 as getSiteConfig, u as useNitroApp, a2 as extractSocialPreviewTags, a3 as $fetch, m as createHead, a4 as prefixStorage, a5 as withTrailingSlash, a6 as useStorage, a7 as handleCacheHeaders, a8 as setHeaders, s as setHeader, a9 as H3Error, aa as appendResponseHeader, ab as getRequestHost, ac as sendRedirect, d as defineEventHandler } from '../../../nitro/nitro.mjs';
import { LRUCache } from 'lru-cache';
import { p as parseSameOriginPath, g as getEventQuery } from '../../../_/ssrf.mjs';
import { parse } from 'devalue';
import { renderSSRHead } from 'unhead/server';
import { fnv1a64Base36 } from 'fnv1a-64';
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
import 'node:crypto';
import 'node:async_hooks';
import '@mdream/js/negotiate';
import 'consola';
import 'node:url';
import '@iconify/utils';
import 'fast-xml-parser';
import 'ipx';

const logger$1 = createModuleLogger("@nuxtjs/og-image");

function parsePublishConfig(input) {
  if (!input || typeof input !== "object")
    return { _tag: "Err", reason: "Set publish.storage and publish.baseURL." };
  const config = input;
  if (typeof config.storage !== "string" || !config.storage.trim() || !normalizeKey(config.storage))
    return { _tag: "Err", reason: "Set publish.storage to a Nitro storage mount name." };
  if (typeof config.baseURL !== "string" || !URL.canParse(config.baseURL))
    return { _tag: "Err", reason: "Set publish.baseURL to the public HTTP URL for uploaded images." };
  const url = new URL(config.baseURL);
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password || url.href.includes("?") || url.href.includes("#"))
    return { _tag: "Err", reason: "Set publish.baseURL to an HTTP URL without credentials, query, or fragment." };
  return { _tag: "Ok", value: { storage: normalizeKey(config.storage), baseURL: url.href.replace(/\/+$/, "") } };
}

function withTimeout(promise, ms, label) {
  let timer;
  return Promise.race([
    Promise.resolve(promise),
    new Promise((_, reject) => {
      timer = setTimeout(
        () => reject(new Error(`${label} timed out after ${ms}ms`)),
        ms
      );
    })
  ]).finally(() => clearTimeout(timer));
}

function getPublishKey(url, defaults, cacheVersion) {
  const { pathname: path, host, protocol } = parseURL(url);
  const extension = path.split(".").pop();
  const segment = decodeURIComponent(extractEncodedSegment(path, extension)).replace(/,s_[^,]+$/, "");
  return digestCanonical([{ segment, defaults, host, protocol }, cacheVersion]);
}
async function getPublishedImage(input) {
  return withTimeout((async () => {
    const target = resolveTarget(input);
    return target._tag === "Unavailable" ? target : lookupPublishedImage(input, target);
  })(), input.timeoutMs ?? 15e3, "OG image publish lookup").catch((reason) => ({ _tag: "Unavailable", reason }));
}
async function publishImage(input) {
  return withTimeout((async () => {
    const target = resolveTarget(input);
    if (target._tag === "Unavailable")
      return target;
    if (!input.force) {
      const cached = await lookupPublishedImage(input, target);
      if (cached._tag === "Published")
        return cached;
    }
    const { storage } = target;
    const bytes = await input.render();
    const digest = await crypto.subtle.digest("SHA-256", new Uint8Array(bytes));
    const hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
    const objectKey = `${hash}.${input.extension}`;
    if (!await storage.hasItem(objectKey)) {
      await storage.setItemRaw(objectKey, bytes, {
        httpMetadata: {
          contentType: `image/${input.extension === "jpg" ? "jpeg" : input.extension}`,
          cacheControl: "public, max-age=31536000, immutable"
        }
      });
      if (!await storage.hasItem(objectKey))
        return { _tag: "Unavailable", reason: "Publish storage did not retain the image." };
    }
    const expiresAt = input.expiresAt ?? input.now() + (Number.isFinite(input.maxAgeSeconds) ? Math.max(0, input.maxAgeSeconds) : 0) * 1e3;
    await storage.setItem(manifestKey(input), {
      objectKey,
      expiresAt
    }, { ttl: Math.max(60, Number.isFinite(input.maxAgeSeconds) ? Math.ceil(input.maxAgeSeconds) : 60) });
    return published(target, objectKey, expiresAt);
  })(), input.timeoutMs ?? 15e3, "OG image publication").catch((reason) => ({ _tag: "Unavailable", reason }));
}
function resolveTarget(input) {
  const parsed = parsePublishConfig({ storage: input.mount, baseURL: input.baseURL });
  if (parsed._tag === "Err")
    return { _tag: "Unavailable", reason: parsed.reason };
  const { storage: mount, baseURL } = parsed.value;
  const mounted = input.storage.getMount(`${mount}:`);
  if (!mount || mounted.base !== `${mount}:` || !mounted.driver.setItemRaw)
    return { _tag: "Unavailable", reason: "Publish storage needs a mounted driver with raw writes." };
  const prefix = `${mount}:`;
  const storage = {
    hasItem: (key) => input.storage.hasItem(prefix + key),
    getItem: (key) => input.storage.getItem(prefix + key),
    setItem: (key, value, options) => input.storage.setItem(prefix + key, value, options),
    setItemRaw: (key, value, options) => input.storage.setItemRaw(prefix + key, value, options)
  };
  return { _tag: "Target", storage, baseURL };
}
async function lookupPublishedImage(input, target) {
  if (!(input.maxAgeSeconds > 0))
    return { _tag: "Miss" };
  const raw = await target.storage.getItem(manifestKey(input));
  const manifest = parseManifest(raw, input.extension);
  if (manifest && manifest.expiresAt > input.now() && await target.storage.hasItem(manifest.objectKey))
    return published(target, manifest.objectKey, manifest.expiresAt);
  return { _tag: "Miss" };
}
function manifestKey(input) {
  return `manifest:${input.key}.${input.extension}.json`;
}
function published(target, objectKey, expiresAt) {
  return { _tag: "Published", objectKey, url: `${target.baseURL}/${objectKey}`, expiresAt };
}
function parseManifest(value, extension) {
  if (!value || typeof value !== "object")
    return;
  const record = value;
  if (typeof record.objectKey !== "string" || !new RegExp(`^[a-f0-9]{64}\\.${extension}$`).test(record.objectKey))
    return;
  if (typeof record.expiresAt !== "number" || !Number.isFinite(record.expiresAt))
    return;
  return { objectKey: record.objectKey, expiresAt: record.expiresAt };
}

function createPublishedImageCache(max = 1e3) {
  const entries = new LRUCache({ max });
  function read(key, now) {
    const entry = entries.get(key);
    if (entry && entry.validUntil <= now) {
      entries.delete(key);
      return;
    }
    return entry;
  }
  function remember(key, image, now) {
    if (image.expiresAt > now)
      entries.set(key, { _tag: "Published", image, validUntil: Math.min(image.expiresAt, now + 6e4) });
  }
  return {
    get(key, now) {
      const entry = read(key, now);
      return entry?._tag === "Published" ? entry.image : void 0;
    },
    isPublishing: (key, now) => read(key, now)?._tag === "Publishing",
    remember,
    forget: (key) => {
      entries.delete(key);
    },
    begin(key, now, timeoutMs) {
      if (read(key, now)?._tag === "Publishing")
        return;
      const token = Symbol(key);
      entries.set(key, { _tag: "Publishing", token, validUntil: now + timeoutMs });
      return token;
    },
    complete(key, token, result, now) {
      const entry = entries.peek(key);
      if (entry?._tag !== "Publishing" || entry.token !== token)
        return;
      entries.delete(key);
      if (result._tag === "Published")
        remember(key, result, now);
    }
  };
}
function getPublishedImageCache(app) {
  const state = app;
  return state._ogImagePublishedImages ??= createPublishedImageCache();
}
function getPublishedImageCacheKey(publish, key, extension) {
  return JSON.stringify([publish.storage, publish.baseURL, key, extension]);
}

const htmlPayloadCache = createStorage({
  // short cache time so we don't need many entries at runtime
  driver: lruCacheDriver({ max: 50 })
});
const emojiCache = createStorage({
  driver: lruCacheDriver({ max: 1e3 })
});

/**
* Compute the `hashId` segment embedded in an island URL (`/__nuxt_island/<Name>_<hashId>.json`).
*
* The hash binds the response to the requested `(name, props, context, source)` tuple, so the
* server can reject requests whose URL hash does not match the supplied query/body. Use this
* from island clients if you need to ensure a hash stays in step with Nuxt's implementation.
*
* `props` may be passed either as the raw props object or as the JSON string that will be sent
* over the wire; the two produce the same hash when the round-trip is identity.
*
* @since 4.5.0
*/
function getIslandHash(input) {
	const props = typeof input.props === "string" ? parseSerializedProps(input.props) : input.props ?? {};
	return hash([
		input.name,
		props,
		input.context ?? {},
		input.source
	]).replace(/[-_]/g, "");
}
function parseSerializedProps(serializedProps) {
	try {
		return JSON.parse(serializedProps);
	} catch {
		return serializedProps;
	}
}

function fetchIsland(e, component, props, timeout) {
  const hashId = getIslandHash({ name: component, props });
  const signal = timeout ? AbortSignal.timeout(timeout) : void 0;
  return fetchWithEvent(e, `/__nuxt_island/${component}_${hashId}.json`, {
    params: {
      props: JSON.stringify(props)
    },
    timeout,
    signal
  });
}
function createNitroRouteRuleMatcher() {
  return createNitroRouteRuleMatcher$1(useRuntimeConfig());
}

const RENDERER_SUFFIXES = ["satori", "browser", "takumi"];
const RE_RENDERER_SUFFIX_DOT = /\.?(satori|browser|takumi)$/i;
const RE_RENDERER_SUFFIX_PASCAL = /(Satori|Browser|Takumi)$/;
const RE_OG_IMAGE_PREFIX = /^OgImage/;
function parseInputName(name) {
  for (const suffix of RENDERER_SUFFIXES) {
    if (name.endsWith(`.${suffix}`))
      return { baseName: name.slice(0, -(suffix.length + 1)), renderer: suffix };
  }
  for (const suffix of RENDERER_SUFFIXES) {
    const pascal = suffix.charAt(0).toUpperCase() + suffix.slice(1);
    if (name.endsWith(pascal))
      return { baseName: name.slice(0, -pascal.length), renderer: suffix };
  }
  return { baseName: name, renderer: null };
}
function stripRenderer(name) {
  return name.replace(RE_RENDERER_SUFFIX_DOT, "").replace(RE_RENDERER_SUFFIX_PASCAL, "");
}
const OGIMAGE_PREFIXES = [
  { prefix: "OgImageCommunity", overlapWord: "Community" },
  { prefix: "OgImageTemplate", overlapWord: "Template" },
  { prefix: "OgImage", overlapWord: "Image" }
];
function getComponentBaseNames(component) {
  const names = [];
  const stripped = stripRenderer(component.pascalName);
  for (const { prefix, overlapWord } of OGIMAGE_PREFIXES) {
    if (!stripped.startsWith(prefix))
      continue;
    const withoutPrefix = stripped.slice(prefix.length);
    if (withoutPrefix) {
      names.push(withoutPrefix);
      if (withoutPrefix !== overlapWord)
        names.push(overlapWord + withoutPrefix);
    } else {
      names.push(overlapWord);
    }
    break;
  }
  if (names.length === 0)
    names.push(stripped);
  return names;
}
function resolveComponent(name) {
  const exactMatch = componentNames.find((c) => c.pascalName === name);
  if (exactMatch)
    return { component: exactMatch, renderer: exactMatch.renderer };
  const { baseName, renderer } = parseInputName(name);
  const strippedBaseName = baseName.replace(RE_OG_IMAGE_PREFIX, "");
  const matches = componentNames.filter((c) => {
    const baseNames = getComponentBaseNames(c);
    return baseNames.some(
      (cBase) => cBase === baseName || cBase === strippedBaseName || cBase === `OgImage${baseName}` || cBase === `OgImage${strippedBaseName}`
    );
  });
  const filtered = renderer ? matches.filter((c) => c.renderer === renderer) : matches;
  if (filtered.length === 0) {
    if (renderer && matches.length > 0) {
      const available = matches.map((c) => `${getComponentBaseNames(c)[0]}.${c.renderer}`).join(", ");
      throw createError({
        statusCode: 500,
        message: `[Nuxt OG Image] Component "${name}" not found. Available variants: ${available}`
      });
    }
    throw createError({
      statusCode: 500,
      message: `[Nuxt OG Image] Component "${name}" not found. Create a component in components/OgImage/ with a renderer suffix (e.g., ${baseName}.satori.vue)`
    });
  }
  const appComponents = filtered.filter((c) => c.category !== "community");
  if (appComponents.length > 0) {
    const resolved2 = appComponents[0];
    return { component: resolved2, renderer: resolved2.renderer };
  }
  const resolved = filtered[0];
  return { component: resolved, renderer: resolved.renderer };
}
function normaliseOptions(_options) {
  const options = { ..._options };
  if (options.component === "PageScreenshot") {
    return {
      options,
      renderer: options.renderer || "browser",
      component: void 0
    };
  }
  if (!componentNames?.length) {
    throw createError({
      statusCode: 500,
      message: `[Nuxt OG Image] No OG Image components found. Create a component in components/OgImage/ with a renderer suffix (e.g., Default.satori.vue)`
    });
  }
  let resolved;
  let renderer;
  if (options.component) {
    const result = resolveComponent(options.component);
    resolved = result.component;
    renderer = result.renderer;
  } else {
    resolved = componentNames.find((c) => c.category !== "community") || componentNames[0];
    renderer = resolved.renderer;
  }
  options.component = resolved.pascalName;
  if (resolved.category === "community" && true) {
    throw createError({
      statusCode: 500,
      message: `[Nuxt OG Image] Community template "${resolved.pascalName}" is not ejected, and production builds do not include community templates. Run: npx nuxt-og-image eject ${stripRenderer(resolved.pascalName)}.${resolved.renderer}`
    });
  }
  return {
    options,
    renderer,
    component: resolved
  };
}

function toStorageKey(namespace, identity) {
  return `${namespace}:${digestCanonical(identity)}`;
}

const RE_TOKEN = /[^\w-]/g;
function sanitizeName(name) {
  return name.replace(RE_TOKEN, "_");
}
function createTimings() {
  const totals = /* @__PURE__ */ new Map();
  const spans = /* @__PURE__ */ new Map();
  const record = (name, ms) => {
    const key = sanitizeName(name);
    const existing = totals.get(key);
    if (existing) {
      existing.dur += ms;
      existing.count += 1;
    } else {
      totals.set(key, { dur: ms, count: 1 });
    }
  };
  const start = (name) => {
    const key = sanitizeName(name);
    const t0 = performance.now();
    const span = spans.get(key) ?? { open: 0, windowStart: 0, wall: 0 };
    if (span.open === 0)
      span.windowStart = t0;
    span.open += 1;
    spans.set(key, span);
    let ended = false;
    return () => {
      if (ended)
        return 0;
      ended = true;
      const t1 = performance.now();
      const ms = t1 - t0;
      span.open -= 1;
      if (span.open === 0) {
        span.wall += t1 - span.windowStart;
        const existing = totals.get(key);
        if (existing) {
          existing.dur = span.wall;
          existing.count += 1;
        } else {
          totals.set(key, { dur: span.wall, count: 1 });
        }
      } else {
        const existing = totals.get(key);
        if (existing)
          existing.count += 1;
        else
          totals.set(key, { dur: 0, count: 1 });
      }
      return ms;
    };
  };
  const measure = async (name, fn) => {
    const end = start(name);
    try {
      return await fn();
    } finally {
      end();
    }
  };
  const entries = () => Array.from(totals.entries()).map(([name, v]) => ({
    name,
    dur: Math.round(v.dur * 1e3) / 1e3,
    count: v.count > 1 ? v.count : void 0
  }));
  const header = () => entries().map(({ name, dur, count }) => {
    const desc = count ? `;desc="n=${count}"` : "";
    return `${name}${desc};dur=${dur}`;
  }).join(", ");
  return { start, record, measure, entries, header };
}
const TIMING_CTX_KEY = "_ogImageTimings";

const satoriRendererInstance = { instance: void 0 };
const browserRendererInstance = { instance: void 0 };
const takumiRendererInstance = { instance: void 0 };
async function getSatoriRenderer() {
  satoriRendererInstance.instance = satoriRendererInstance.instance || await import('../../../_/empty.mjs').then((m) => m.default);
  return satoriRendererInstance.instance;
}
async function getBrowserRenderer() {
  browserRendererInstance.instance = browserRendererInstance.instance || await import('../../../_/empty.mjs').then((m) => m.default);
  return browserRendererInstance.instance;
}
async function getTakumiRenderer() {
  takumiRendererInstance.instance = takumiRendererInstance.instance || await import('../../../_/empty.mjs').then((m) => m.default);
  return takumiRendererInstance.instance;
}

const RE_HASH_MODE = /^o_([a-z0-9]+)$/i;
const RE_SIGNATURE_SUFFIX = /,s_([^,]+)$/;
async function resolveContext(e) {
  const runtimeConfig = useOgImageRuntimeConfig(e);
  const resolvePathWithBase = createSitePathResolver(e, {
    absolute: false,
    withBase: true
  });
  const path = resolvePathWithBase(parseURL(e.path).pathname);
  let extension = path.split(".").pop();
  if (!extension || !path.includes(".") || extension.includes("/") || !["png", "jpeg", "jpg", "webp", "svg", "html", "json"].includes(extension)) {
    extension = "png";
  }
  const encodedSegment = extractEncodedSegment(path, extension);
  const secret = runtimeConfig.security?.secret;
  let paramsSegment = encodedSegment;
  if (secret && true && true) {
    const sigMatch = encodedSegment.match(RE_SIGNATURE_SUFFIX);
    if (!sigMatch) {
      return createError({
        statusCode: 403,
        statusMessage: "[Nuxt OG Image] Missing URL signature. Set NUXT_APP_SECRET to sign URLs."
      });
    }
    const signature = sigMatch[1];
    paramsSegment = encodedSegment.slice(0, sigMatch.index);
    if (!verifyOgImageSignature(paramsSegment, signature, secret)) {
      return createError({
        statusCode: 403,
        statusMessage: "[Nuxt OG Image] Invalid URL signature."
      });
    }
  } else if (secret && RE_SIGNATURE_SUFFIX.test(encodedSegment)) {
    paramsSegment = encodedSegment.replace(RE_SIGNATURE_SUFFIX, "");
  }
  const hashMatch = paramsSegment.match(RE_HASH_MODE);
  let urlOptions = {};
  if (hashMatch) {
    const optionsHash = hashMatch[1];
    {
      return createError({
        statusCode: 400,
        statusMessage: `[Nuxt OG Image] Hash-based URLs (o_${optionsHash}) are only supported during prerendering. Use encoded params or query params for runtime.`
      });
    }
  } else {
    urlOptions = decodeOgImageParams(paramsSegment);
  }
  const maxQueryParamSize = runtimeConfig.security?.maxQueryParamSize;
  if (maxQueryParamSize && true) {
    const queryString = parseURL(e.path).search || "";
    if (queryString.length > maxQueryParamSize) {
      return createError({
        statusCode: 400,
        statusMessage: `[Nuxt OG Image] Query string exceeds maximum allowed length of ${maxQueryParamSize} characters.`
      });
    }
  }
  let queryParams = {};
  const rawPath = urlOptions._path ?? "/";
  const parsedPath = parseSameOriginPath(typeof rawPath === "string" ? withoutTrailingSlash(rawPath) : rawPath);
  if (parsedPath._tag === "Err") {
    return createError({
      statusCode: 400,
      statusMessage: `[Nuxt OG Image] The _path option must be a same-origin path. ${parsedPath.reason}`
    });
  }
  const basePath = parsedPath.value;
  const componentHash = urlOptions._componentHash || "";
  delete urlOptions._path;
  delete urlOptions._hash;
  delete urlOptions._componentHash;
  if (runtimeConfig.security?.strict) {
    delete urlOptions.html;
  }
  const basePathWithQuery = queryParams._query && typeof queryParams._query === "object" ? withQuery(basePath, queryParams._query) : basePath;
  const isDebugJsonPayload = extension === "json" && (runtimeConfig.debug);
  const routeRuleMatcher = createNitroRouteRuleMatcher();
  const routeRules = routeRuleMatcher(basePath);
  const ogImageRouteRules = separateProps(routeRules.ogImage);
  const options = defu(queryParams, urlOptions, ogImageRouteRules, runtimeConfig.defaults);
  const maxDim = runtimeConfig.security?.maxDimension || 2048;
  if (options.width != null) {
    const w = Number(options.width);
    options.width = Number.isFinite(w) ? Math.min(Math.max(1, w), maxDim) : void 0;
  }
  if (options.height != null) {
    const h = Number(options.height);
    options.height = Number.isFinite(h) ? Math.min(Math.max(1, h), maxDim) : void 0;
  }
  if (options.props && typeof options.props === "object")
    options.props = sanitizeProps(options.props);
  if (!options) {
    return createError({
      statusCode: 404,
      statusMessage: "[Nuxt OG Image] OG Image not found."
    });
  }
  const normalised = normaliseOptions(options);
  if (normalised.component && normalised.options.props && typeof normalised.options.props === "object") {
    const builtinProps = /* @__PURE__ */ new Set(["colorMode", "timestamp"]);
    const allowedProps = normalised.component.propNames || [];
    const allowedSet = new Set(allowedProps);
    const raw = normalised.options.props;
    const filtered = {};
    for (const key2 of Object.keys(raw)) {
      if (allowedSet.has(key2) || builtinProps.has(key2))
        filtered[key2] = raw[key2];
    }
    normalised.options.props = filtered;
  }
  const rendererType = normalised.renderer;
  const identity = normalised.options.cacheKey ? ["cacheKey", String(normalised.options.cacheKey)] : hashMatch ? ["hash", hashMatch[1]] : ["page", basePathWithQuery, getSiteConfig(e, { resolveRefs: true }).url, normalised.options];
  const key = digestCanonical([...identity, componentHash]);
  let renderer;
  switch (rendererType) {
    case "satori":
      renderer = await getSatoriRenderer();
      break;
    case "browser":
      renderer = await getBrowserRenderer();
      break;
    case "takumi":
      renderer = await getTakumiRenderer();
      break;
  }
  if (!renderer || renderer.__mock__) {
    throw createError({
      statusCode: 400,
      statusMessage: `[Nuxt OG Image] Renderer "${rendererType}" is not available. Component "${normalised.component?.pascalName}" requires the ${rendererType} renderer but it's not bundled for this preset.`
    });
  }
  const timings = e.context[TIMING_CTX_KEY] || createTimings();
  e.context[TIMING_CTX_KEY] = timings;
  const ctx = {
    e,
    key,
    renderer,
    isDevToolsContextRequest: isDebugJsonPayload,
    runtimeConfig,
    publicStoragePath: runtimeConfig.publicStoragePath,
    extension,
    basePath,
    options: normalised.options,
    timings,
    _nitro: useNitroApp()
  };
  const hookTimeout = runtimeConfig.security?.renderTimeout ?? 15e3;
  await withTimeout(
    ctx._nitro.hooks.callHook("nuxt-og-image:context", ctx),
    hookTimeout,
    "nuxt-og-image:context hook"
  );
  return ctx;
}

const logger = createModuleLogger("Nuxt OG Image");

const PAYLOAD_REGEX = /<script.+id="nuxt-og-image-options"[^>]*>(.+?)<\/script>/;
function extractOptionsFromHtml(html) {
  const match = String(html).match(PAYLOAD_REGEX);
  if (!match?.[1])
    return [];
  return parse(match[1]);
}
async function doFetchWithErrorHandling(fetch, path) {
  const res = await fetch(path, {
    redirect: "follow",
    headers: {
      accept: "text/html"
    }
  }).catch((err) => {
    return err;
  });
  let errorDescription;
  if (res.status >= 300 && res.status < 400) {
    if (res.headers.has("location")) {
      return await doFetchWithErrorHandling(fetch, res.headers.get("location") || "");
    }
    errorDescription = `${res.status} redirected to ${res.headers.get("location") || "unknown"}`;
  } else if (res.status >= 400) {
    errorDescription = `${res.status} error: ${res.statusText}`;
  }
  if (errorDescription) {
    return [null, createError({
      statusCode: 500,
      statusMessage: `[Nuxt OG Image] Failed to parse \`${path}\` for og-image extraction. ${errorDescription}`
    })];
  }
  return [res._data || await res.text(), null];
}
async function fetchPathHtmlAndExtractOptions(e, path, key) {
  const cacheKey = toStorageKey("devtools", key);
  const cachedHtmlPayload = await htmlPayloadCache.getItem(cacheKey);
  if (cachedHtmlPayload && cachedHtmlPayload.expiresAt > Date.now())
    return cachedHtmlPayload.value;
  let [html, err] = await doFetchWithErrorHandling(e.fetch, path);
  if (err) {
    logger.warn(err);
  }
  if (!html) {
    const [fallbackHtml, err2] = await doFetchWithErrorHandling(globalThis.$fetch.raw, path);
    if (err2) {
      return err2;
    }
    html = fallbackHtml;
  }
  if (!html) {
    return createError({
      statusCode: 500,
      statusMessage: `[Nuxt OG Image] Failed to read the path ${path} for og-image extraction, returning no HTML.`
    });
  }
  const [root, images] = extractSocialPreviewTags(html);
  const options = extractOptionsFromHtml(html);
  const payload = {
    options,
    socialPreview: { root, images }
  };
  if (payload) {
    await htmlPayloadCache.setItem(cacheKey, {
      // 60 minutes for prerender, 10 seconds for runtime
      expiresAt: Date.now() + 1e3 * (10),
      value: payload
    });
  }
  return payload;
}

const resolvedFonts = [{"family":"JetBrains Mono","src":"/_nuxt/fonts/BzBvP5B6n3wHNSK9KgmBNZ1PczdZ0kq6L6nu_kw03Ug-wV8zARWYtkWLbDq13Xl90XFZKXVs1nvvXB8zvlghsBY.woff2","weight":400,"style":"italic","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/p8XC4b0v0m-EiJQAVrKLvU8spsJJrRwg_pQb6ne3LZ8-Xk9a7EzZySU6YDiCY67upfbFiJMXjFXMlVfxZu_bifY.woff2","weight":400,"style":"italic","unicodeRange":"U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116","subset":"cyrillic"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/uNrZoOJFFhG06f8xJpyWup6Hx8TmDAR6g1B083Ihiak-YOKRRXgcGSy5ObA5GI_ApuS5tJ3aqNRMJ5ClC-DHYdA.woff2","weight":400,"style":"italic","unicodeRange":"U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF","subset":"greek"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/WvBWEpMh0GHIAGpqPUMY78bL9_LoEQDKSugTtbND-Gw-hEI3quQvUUMagnXpWFrZQqIerqrvJPyvttLONmLIyJ8.woff2","weight":400,"style":"italic","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/LtUPvBNCw2mRmTSCUrv_YeRqBX7xHSSUdk52U1zOKFY-3AVjdIdQvFhNIastDeFZR8qe9V_KKIxGcJA0VzJUi_E.woff2","weight":400,"style":"italic","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/kqHQLokKhbDhYAECQOy8tl9ltEsY5H0SHs5YVvjw1LY-DEH_xe_HpkDt9DTHbxyxHeV4Ct1N6mL81LzQokJdWc4.woff2","weight":400,"style":"italic","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/BzBvP5B6n3wHNSK9KgmBNZ1PczdZ0kq6L6nu_kw03Ug-wV8zARWYtkWLbDq13Xl90XFZKXVs1nvvXB8zvlghsBY.woff2","weight":500,"style":"italic","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/p8XC4b0v0m-EiJQAVrKLvU8spsJJrRwg_pQb6ne3LZ8-Xk9a7EzZySU6YDiCY67upfbFiJMXjFXMlVfxZu_bifY.woff2","weight":500,"style":"italic","unicodeRange":"U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116","subset":"cyrillic"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/uNrZoOJFFhG06f8xJpyWup6Hx8TmDAR6g1B083Ihiak-YOKRRXgcGSy5ObA5GI_ApuS5tJ3aqNRMJ5ClC-DHYdA.woff2","weight":500,"style":"italic","unicodeRange":"U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF","subset":"greek"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/WvBWEpMh0GHIAGpqPUMY78bL9_LoEQDKSugTtbND-Gw-hEI3quQvUUMagnXpWFrZQqIerqrvJPyvttLONmLIyJ8.woff2","weight":500,"style":"italic","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/LtUPvBNCw2mRmTSCUrv_YeRqBX7xHSSUdk52U1zOKFY-3AVjdIdQvFhNIastDeFZR8qe9V_KKIxGcJA0VzJUi_E.woff2","weight":500,"style":"italic","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/kqHQLokKhbDhYAECQOy8tl9ltEsY5H0SHs5YVvjw1LY-DEH_xe_HpkDt9DTHbxyxHeV4Ct1N6mL81LzQokJdWc4.woff2","weight":500,"style":"italic","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/BzBvP5B6n3wHNSK9KgmBNZ1PczdZ0kq6L6nu_kw03Ug-wV8zARWYtkWLbDq13Xl90XFZKXVs1nvvXB8zvlghsBY.woff2","weight":600,"style":"italic","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/p8XC4b0v0m-EiJQAVrKLvU8spsJJrRwg_pQb6ne3LZ8-Xk9a7EzZySU6YDiCY67upfbFiJMXjFXMlVfxZu_bifY.woff2","weight":600,"style":"italic","unicodeRange":"U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116","subset":"cyrillic"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/uNrZoOJFFhG06f8xJpyWup6Hx8TmDAR6g1B083Ihiak-YOKRRXgcGSy5ObA5GI_ApuS5tJ3aqNRMJ5ClC-DHYdA.woff2","weight":600,"style":"italic","unicodeRange":"U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF","subset":"greek"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/WvBWEpMh0GHIAGpqPUMY78bL9_LoEQDKSugTtbND-Gw-hEI3quQvUUMagnXpWFrZQqIerqrvJPyvttLONmLIyJ8.woff2","weight":600,"style":"italic","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/LtUPvBNCw2mRmTSCUrv_YeRqBX7xHSSUdk52U1zOKFY-3AVjdIdQvFhNIastDeFZR8qe9V_KKIxGcJA0VzJUi_E.woff2","weight":600,"style":"italic","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/kqHQLokKhbDhYAECQOy8tl9ltEsY5H0SHs5YVvjw1LY-DEH_xe_HpkDt9DTHbxyxHeV4Ct1N6mL81LzQokJdWc4.woff2","weight":600,"style":"italic","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/sr4-YXzOS5oe12y9YMYGBmhFhQd5GA1Qg2jPqXf_vgg-l_3Pof0nun2cQotURDGKdEXajlJTkQmaPWMyNbixwUs.woff2","weight":400,"style":"normal","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/ZDmckrAe5KkZg7oRmja8y8J386eiRioT_oX1sx-uQUI-RNad721svf_ClPMXNl65MSWr3Kjs4qWy3a_LEzQOL8w.woff2","weight":400,"style":"normal","unicodeRange":"U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116","subset":"cyrillic"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/RQ9QFFjRgsXVyz0lHw8ez57FeiQzAb89Xyf5vU5maVg-pg72ynemUWU2h2KQWjiuhgXRXu_VM_YNUN5WfPOOT1M.woff2","weight":400,"style":"normal","unicodeRange":"U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF","subset":"greek"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/9KCRpkmcW_okkHNr8XnT2Or5GlVKmIYYxKd5FYoPWDg-YDD9qUZJ_xItNnR_0ovbhYwdmHMf5touelhWERQfK24.woff2","weight":400,"style":"normal","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/xHqlKZJFIS6402jbzL4BhtqDi2iwcDgPxe93WbcZ6SY-8WtAIQu51G7odKW44VNvFchd_g_5KgJyLFia_e_GHo0.woff2","weight":400,"style":"normal","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/PGxXZWn226tHnA2OqxZU7CTUvT6nLXK7MoQbZiEZNy8-erQjQvygkJkW0XY1KA9z_RwUelzNKQYK0ne5Xd6o7WM.woff2","weight":400,"style":"normal","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/sr4-YXzOS5oe12y9YMYGBmhFhQd5GA1Qg2jPqXf_vgg-l_3Pof0nun2cQotURDGKdEXajlJTkQmaPWMyNbixwUs.woff2","weight":500,"style":"normal","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/ZDmckrAe5KkZg7oRmja8y8J386eiRioT_oX1sx-uQUI-RNad721svf_ClPMXNl65MSWr3Kjs4qWy3a_LEzQOL8w.woff2","weight":500,"style":"normal","unicodeRange":"U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116","subset":"cyrillic"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/RQ9QFFjRgsXVyz0lHw8ez57FeiQzAb89Xyf5vU5maVg-pg72ynemUWU2h2KQWjiuhgXRXu_VM_YNUN5WfPOOT1M.woff2","weight":500,"style":"normal","unicodeRange":"U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF","subset":"greek"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/9KCRpkmcW_okkHNr8XnT2Or5GlVKmIYYxKd5FYoPWDg-YDD9qUZJ_xItNnR_0ovbhYwdmHMf5touelhWERQfK24.woff2","weight":500,"style":"normal","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/xHqlKZJFIS6402jbzL4BhtqDi2iwcDgPxe93WbcZ6SY-8WtAIQu51G7odKW44VNvFchd_g_5KgJyLFia_e_GHo0.woff2","weight":500,"style":"normal","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/PGxXZWn226tHnA2OqxZU7CTUvT6nLXK7MoQbZiEZNy8-erQjQvygkJkW0XY1KA9z_RwUelzNKQYK0ne5Xd6o7WM.woff2","weight":500,"style":"normal","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/sr4-YXzOS5oe12y9YMYGBmhFhQd5GA1Qg2jPqXf_vgg-l_3Pof0nun2cQotURDGKdEXajlJTkQmaPWMyNbixwUs.woff2","weight":600,"style":"normal","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/ZDmckrAe5KkZg7oRmja8y8J386eiRioT_oX1sx-uQUI-RNad721svf_ClPMXNl65MSWr3Kjs4qWy3a_LEzQOL8w.woff2","weight":600,"style":"normal","unicodeRange":"U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116","subset":"cyrillic"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/RQ9QFFjRgsXVyz0lHw8ez57FeiQzAb89Xyf5vU5maVg-pg72ynemUWU2h2KQWjiuhgXRXu_VM_YNUN5WfPOOT1M.woff2","weight":600,"style":"normal","unicodeRange":"U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF","subset":"greek"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/9KCRpkmcW_okkHNr8XnT2Or5GlVKmIYYxKd5FYoPWDg-YDD9qUZJ_xItNnR_0ovbhYwdmHMf5touelhWERQfK24.woff2","weight":600,"style":"normal","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/xHqlKZJFIS6402jbzL4BhtqDi2iwcDgPxe93WbcZ6SY-8WtAIQu51G7odKW44VNvFchd_g_5KgJyLFia_e_GHo0.woff2","weight":600,"style":"normal","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"JetBrains Mono","src":"/_nuxt/fonts/PGxXZWn226tHnA2OqxZU7CTUvT6nLXK7MoQbZiEZNy8-erQjQvygkJkW0XY1KA9z_RwUelzNKQYK0ne5Xd6o7WM.woff2","weight":600,"style":"normal","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"Inter","src":"/_nuxt/fonts/DYJdeJPtCBIYWgA5cyxBmly7l27Wj1oQp4mFkXDxvIs-DPFPVSnB8cId8pOwgvRNA2TCO2OWamyoeCtk437Sapc.woff2","weight":400,"style":"italic","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"Inter","src":"/_nuxt/fonts/QpJYL2mwM_fWcwdT8T92e3Zj7wNrhqhFzZMwIpW9Yhk-XgOijeIybntTr80kfTNzJ_MAYXALsEz4LGK8FlCLUMQ.woff2","weight":400,"style":"italic","unicodeRange":"U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116","subset":"cyrillic"},{"family":"Inter","src":"/_nuxt/fonts/nRO08svVDfHK2I6XQv8acbCwVYFPI-lNFmbTO_Ato-U-leG_hYlPLJBni6ljwuquGygDJ11Q9JovV7X4etSwPIs.woff2","weight":400,"style":"italic","unicodeRange":"U+1F00-1FFF","subset":"greek-ext"},{"family":"Inter","src":"/_nuxt/fonts/DyoSP_ZB-sZ6jdZm0DNNNAZlak-n8B55ylByyLLv58Y-LDxnRyFE6SL_0xO8Ook5rXOokOEsSmBy44omeJ02DT4.woff2","weight":400,"style":"italic","unicodeRange":"U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF","subset":"greek"},{"family":"Inter","src":"/_nuxt/fonts/xiWtFoOGVpxz2O8rJiJmkaO17BlbbGGm_obdnXH3FNs-8YIR4ZfCCs9oJJ4E1XpjqOJwDB0_yPAN4AMVgQAVTKs.woff2","weight":400,"style":"italic","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"Inter","src":"/_nuxt/fonts/okGTeHOzA93WHhiHQhh2kiQFJ8jP7Rs_J1FR3XblyKk-bIMLl2bdqTiV6xWjXZLjoJYX4UhZc8AFIlYM7Hc12TM.woff2","weight":400,"style":"italic","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"Inter","src":"/_nuxt/fonts/shQVi3meleYLIUqZP9-ZwNpu1UG0BrC8W1a0_vPu1vM-WIRtv4uldWqfFM5rfsEDcWL99nKboOnkZoW_g2Ev8Uk.woff2","weight":400,"style":"italic","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"Inter","src":"/_nuxt/fonts/DYJdeJPtCBIYWgA5cyxBmly7l27Wj1oQp4mFkXDxvIs-DPFPVSnB8cId8pOwgvRNA2TCO2OWamyoeCtk437Sapc.woff2","weight":500,"style":"italic","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"Inter","src":"/_nuxt/fonts/QpJYL2mwM_fWcwdT8T92e3Zj7wNrhqhFzZMwIpW9Yhk-XgOijeIybntTr80kfTNzJ_MAYXALsEz4LGK8FlCLUMQ.woff2","weight":500,"style":"italic","unicodeRange":"U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116","subset":"cyrillic"},{"family":"Inter","src":"/_nuxt/fonts/nRO08svVDfHK2I6XQv8acbCwVYFPI-lNFmbTO_Ato-U-leG_hYlPLJBni6ljwuquGygDJ11Q9JovV7X4etSwPIs.woff2","weight":500,"style":"italic","unicodeRange":"U+1F00-1FFF","subset":"greek-ext"},{"family":"Inter","src":"/_nuxt/fonts/DyoSP_ZB-sZ6jdZm0DNNNAZlak-n8B55ylByyLLv58Y-LDxnRyFE6SL_0xO8Ook5rXOokOEsSmBy44omeJ02DT4.woff2","weight":500,"style":"italic","unicodeRange":"U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF","subset":"greek"},{"family":"Inter","src":"/_nuxt/fonts/xiWtFoOGVpxz2O8rJiJmkaO17BlbbGGm_obdnXH3FNs-8YIR4ZfCCs9oJJ4E1XpjqOJwDB0_yPAN4AMVgQAVTKs.woff2","weight":500,"style":"italic","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"Inter","src":"/_nuxt/fonts/okGTeHOzA93WHhiHQhh2kiQFJ8jP7Rs_J1FR3XblyKk-bIMLl2bdqTiV6xWjXZLjoJYX4UhZc8AFIlYM7Hc12TM.woff2","weight":500,"style":"italic","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"Inter","src":"/_nuxt/fonts/shQVi3meleYLIUqZP9-ZwNpu1UG0BrC8W1a0_vPu1vM-WIRtv4uldWqfFM5rfsEDcWL99nKboOnkZoW_g2Ev8Uk.woff2","weight":500,"style":"italic","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"Inter","src":"/_nuxt/fonts/DYJdeJPtCBIYWgA5cyxBmly7l27Wj1oQp4mFkXDxvIs-DPFPVSnB8cId8pOwgvRNA2TCO2OWamyoeCtk437Sapc.woff2","weight":600,"style":"italic","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"Inter","src":"/_nuxt/fonts/QpJYL2mwM_fWcwdT8T92e3Zj7wNrhqhFzZMwIpW9Yhk-XgOijeIybntTr80kfTNzJ_MAYXALsEz4LGK8FlCLUMQ.woff2","weight":600,"style":"italic","unicodeRange":"U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116","subset":"cyrillic"},{"family":"Inter","src":"/_nuxt/fonts/nRO08svVDfHK2I6XQv8acbCwVYFPI-lNFmbTO_Ato-U-leG_hYlPLJBni6ljwuquGygDJ11Q9JovV7X4etSwPIs.woff2","weight":600,"style":"italic","unicodeRange":"U+1F00-1FFF","subset":"greek-ext"},{"family":"Inter","src":"/_nuxt/fonts/DyoSP_ZB-sZ6jdZm0DNNNAZlak-n8B55ylByyLLv58Y-LDxnRyFE6SL_0xO8Ook5rXOokOEsSmBy44omeJ02DT4.woff2","weight":600,"style":"italic","unicodeRange":"U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF","subset":"greek"},{"family":"Inter","src":"/_nuxt/fonts/xiWtFoOGVpxz2O8rJiJmkaO17BlbbGGm_obdnXH3FNs-8YIR4ZfCCs9oJJ4E1XpjqOJwDB0_yPAN4AMVgQAVTKs.woff2","weight":600,"style":"italic","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"Inter","src":"/_nuxt/fonts/okGTeHOzA93WHhiHQhh2kiQFJ8jP7Rs_J1FR3XblyKk-bIMLl2bdqTiV6xWjXZLjoJYX4UhZc8AFIlYM7Hc12TM.woff2","weight":600,"style":"italic","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"Inter","src":"/_nuxt/fonts/shQVi3meleYLIUqZP9-ZwNpu1UG0BrC8W1a0_vPu1vM-WIRtv4uldWqfFM5rfsEDcWL99nKboOnkZoW_g2Ev8Uk.woff2","weight":600,"style":"italic","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"Inter","src":"/_nuxt/fonts/95LF05ynkR2iited5vKC3ML7Mt4iflufgyYJQAK9nF4-NZaZZt6E_IGCSpI3DA35nDyNvesPNS4QNP7XC2pYBYE.woff2","weight":400,"style":"normal","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"Inter","src":"/_nuxt/fonts/rKlr2fNB2-iyJhDGh3GjbB7U7xF6BMr1eV-ngyy8udQ-JfckSRSkmknXCHp5oZLIYR_jNB6MzYb7ifA6hU4lk2o.woff2","weight":400,"style":"normal","unicodeRange":"U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116","subset":"cyrillic"},{"family":"Inter","src":"/_nuxt/fonts/Nah9koTOFvXUREZWfV7DH4zgASpXCzPkz6Tn28ZWLF8-BPqOaS9b32mrF_JERGBi9aAWCHVMBVP2cgIrQCresgU.woff2","weight":400,"style":"normal","unicodeRange":"U+1F00-1FFF","subset":"greek-ext"},{"family":"Inter","src":"/_nuxt/fonts/6yQlgZNOH42hUtIIIHjZiNFc1WmiHD7IpV78HkewQzs-Qk_1yENQUazQQ0tP2ZD16gLhgnkqQqP7MhASnXvWtqQ.woff2","weight":400,"style":"normal","unicodeRange":"U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF","subset":"greek"},{"family":"Inter","src":"/_nuxt/fonts/k3YRPyaHq8R9a3gxNSuQ3W_8hdDfEx-SbAtGnVOYnHY-fVFZzzariE_Uq-dTHevDSbvLurnlJRTddHpakm9Ws1w.woff2","weight":400,"style":"normal","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"Inter","src":"/_nuxt/fonts/der4-T0bORlPDyrpWSOU_0VRetbtC4vnusni_kWmK7Q-GXB5hylV4plFt0WDHf1wY5BRE9_7uLFvbkkQKAdfTP0.woff2","weight":400,"style":"normal","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"Inter","src":"/_nuxt/fonts/23mtYSzxPVyLoxLNpoXveb5p0hEC2MbGLOudqhNuXQQ-sHyjhRga9hvdq4tAx7_wIeBFh1sLJ_E5PRwGnzrqxWs.woff2","weight":400,"style":"normal","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"Inter","src":"/_nuxt/fonts/95LF05ynkR2iited5vKC3ML7Mt4iflufgyYJQAK9nF4-NZaZZt6E_IGCSpI3DA35nDyNvesPNS4QNP7XC2pYBYE.woff2","weight":500,"style":"normal","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"Inter","src":"/_nuxt/fonts/rKlr2fNB2-iyJhDGh3GjbB7U7xF6BMr1eV-ngyy8udQ-JfckSRSkmknXCHp5oZLIYR_jNB6MzYb7ifA6hU4lk2o.woff2","weight":500,"style":"normal","unicodeRange":"U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116","subset":"cyrillic"},{"family":"Inter","src":"/_nuxt/fonts/Nah9koTOFvXUREZWfV7DH4zgASpXCzPkz6Tn28ZWLF8-BPqOaS9b32mrF_JERGBi9aAWCHVMBVP2cgIrQCresgU.woff2","weight":500,"style":"normal","unicodeRange":"U+1F00-1FFF","subset":"greek-ext"},{"family":"Inter","src":"/_nuxt/fonts/6yQlgZNOH42hUtIIIHjZiNFc1WmiHD7IpV78HkewQzs-Qk_1yENQUazQQ0tP2ZD16gLhgnkqQqP7MhASnXvWtqQ.woff2","weight":500,"style":"normal","unicodeRange":"U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF","subset":"greek"},{"family":"Inter","src":"/_nuxt/fonts/k3YRPyaHq8R9a3gxNSuQ3W_8hdDfEx-SbAtGnVOYnHY-fVFZzzariE_Uq-dTHevDSbvLurnlJRTddHpakm9Ws1w.woff2","weight":500,"style":"normal","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"Inter","src":"/_nuxt/fonts/der4-T0bORlPDyrpWSOU_0VRetbtC4vnusni_kWmK7Q-GXB5hylV4plFt0WDHf1wY5BRE9_7uLFvbkkQKAdfTP0.woff2","weight":500,"style":"normal","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"Inter","src":"/_nuxt/fonts/23mtYSzxPVyLoxLNpoXveb5p0hEC2MbGLOudqhNuXQQ-sHyjhRga9hvdq4tAx7_wIeBFh1sLJ_E5PRwGnzrqxWs.woff2","weight":500,"style":"normal","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"Inter","src":"/_nuxt/fonts/95LF05ynkR2iited5vKC3ML7Mt4iflufgyYJQAK9nF4-NZaZZt6E_IGCSpI3DA35nDyNvesPNS4QNP7XC2pYBYE.woff2","weight":600,"style":"normal","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"Inter","src":"/_nuxt/fonts/rKlr2fNB2-iyJhDGh3GjbB7U7xF6BMr1eV-ngyy8udQ-JfckSRSkmknXCHp5oZLIYR_jNB6MzYb7ifA6hU4lk2o.woff2","weight":600,"style":"normal","unicodeRange":"U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116","subset":"cyrillic"},{"family":"Inter","src":"/_nuxt/fonts/Nah9koTOFvXUREZWfV7DH4zgASpXCzPkz6Tn28ZWLF8-BPqOaS9b32mrF_JERGBi9aAWCHVMBVP2cgIrQCresgU.woff2","weight":600,"style":"normal","unicodeRange":"U+1F00-1FFF","subset":"greek-ext"},{"family":"Inter","src":"/_nuxt/fonts/6yQlgZNOH42hUtIIIHjZiNFc1WmiHD7IpV78HkewQzs-Qk_1yENQUazQQ0tP2ZD16gLhgnkqQqP7MhASnXvWtqQ.woff2","weight":600,"style":"normal","unicodeRange":"U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF","subset":"greek"},{"family":"Inter","src":"/_nuxt/fonts/k3YRPyaHq8R9a3gxNSuQ3W_8hdDfEx-SbAtGnVOYnHY-fVFZzzariE_Uq-dTHevDSbvLurnlJRTddHpakm9Ws1w.woff2","weight":600,"style":"normal","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"Inter","src":"/_nuxt/fonts/der4-T0bORlPDyrpWSOU_0VRetbtC4vnusni_kWmK7Q-GXB5hylV4plFt0WDHf1wY5BRE9_7uLFvbkkQKAdfTP0.woff2","weight":600,"style":"normal","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"Inter","src":"/_nuxt/fonts/23mtYSzxPVyLoxLNpoXveb5p0hEC2MbGLOudqhNuXQQ-sHyjhRga9hvdq4tAx7_wIeBFh1sLJ_E5PRwGnzrqxWs.woff2","weight":600,"style":"normal","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/h0AUkCfyfKyBKdwa_skvQ6DbDtFXLQ_Yy4xUirju9S4-jpeLu7eQ1_3PRT8dJ3oF3lAbnW0HnzvGEAmj9traCno.woff2","weight":500,"style":"italic","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/EHhMPTZxs1DLFoSCpTpJi7S22G4OhYT8lewk_1xckC8-E9n0RhQShoqM5fLUT_RXtS4T2p_LAiIOBCwztLaRQuE.woff2","weight":500,"style":"italic","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/MDwTfPBLLkOaYY6Syn3fT929XleGt5GMJv6uGhPZd0I-vv5nfMCKpC4Hg3_nmx6d4CQNZ3DqashpQcpoaoxsiuI.woff2","weight":500,"style":"italic","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/vFd0fmDQQ6dUNFYjwFyhfNYWu-rKrxD3zqwr7yfeIbc-0u56STp_ypV_wck1PaUooNhuP_s4aEQjZEEXgQsB7o4.woff2","weight":500,"style":"italic","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/h0AUkCfyfKyBKdwa_skvQ6DbDtFXLQ_Yy4xUirju9S4-jpeLu7eQ1_3PRT8dJ3oF3lAbnW0HnzvGEAmj9traCno.woff2","weight":600,"style":"italic","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/EHhMPTZxs1DLFoSCpTpJi7S22G4OhYT8lewk_1xckC8-E9n0RhQShoqM5fLUT_RXtS4T2p_LAiIOBCwztLaRQuE.woff2","weight":600,"style":"italic","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/MDwTfPBLLkOaYY6Syn3fT929XleGt5GMJv6uGhPZd0I-vv5nfMCKpC4Hg3_nmx6d4CQNZ3DqashpQcpoaoxsiuI.woff2","weight":600,"style":"italic","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/vFd0fmDQQ6dUNFYjwFyhfNYWu-rKrxD3zqwr7yfeIbc-0u56STp_ypV_wck1PaUooNhuP_s4aEQjZEEXgQsB7o4.woff2","weight":600,"style":"italic","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/h0AUkCfyfKyBKdwa_skvQ6DbDtFXLQ_Yy4xUirju9S4-jpeLu7eQ1_3PRT8dJ3oF3lAbnW0HnzvGEAmj9traCno.woff2","weight":700,"style":"italic","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/EHhMPTZxs1DLFoSCpTpJi7S22G4OhYT8lewk_1xckC8-E9n0RhQShoqM5fLUT_RXtS4T2p_LAiIOBCwztLaRQuE.woff2","weight":700,"style":"italic","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/MDwTfPBLLkOaYY6Syn3fT929XleGt5GMJv6uGhPZd0I-vv5nfMCKpC4Hg3_nmx6d4CQNZ3DqashpQcpoaoxsiuI.woff2","weight":700,"style":"italic","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/vFd0fmDQQ6dUNFYjwFyhfNYWu-rKrxD3zqwr7yfeIbc-0u56STp_ypV_wck1PaUooNhuP_s4aEQjZEEXgQsB7o4.woff2","weight":700,"style":"italic","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/h0AUkCfyfKyBKdwa_skvQ6DbDtFXLQ_Yy4xUirju9S4-jpeLu7eQ1_3PRT8dJ3oF3lAbnW0HnzvGEAmj9traCno.woff2","weight":800,"style":"italic","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/EHhMPTZxs1DLFoSCpTpJi7S22G4OhYT8lewk_1xckC8-E9n0RhQShoqM5fLUT_RXtS4T2p_LAiIOBCwztLaRQuE.woff2","weight":800,"style":"italic","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/MDwTfPBLLkOaYY6Syn3fT929XleGt5GMJv6uGhPZd0I-vv5nfMCKpC4Hg3_nmx6d4CQNZ3DqashpQcpoaoxsiuI.woff2","weight":800,"style":"italic","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/vFd0fmDQQ6dUNFYjwFyhfNYWu-rKrxD3zqwr7yfeIbc-0u56STp_ypV_wck1PaUooNhuP_s4aEQjZEEXgQsB7o4.woff2","weight":800,"style":"italic","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/5IgvIzWAveoNXlQFVm-aWM8yNj5ha56cFNya7Z9Q_YE-FK1AhkTx9rn_wGOIv9D38I9BXDJWXSSVmaZRw4bsXHg.woff2","weight":500,"style":"normal","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/LlkRNqpUXT184ITHz2ImBS70pPRrIYbBYm5lnR5T2hQ-QqfHOS8AuhvxUBWI2_o7dfCfV6sgPgo8fKatOL_oXaU.woff2","weight":500,"style":"normal","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/Z1Hxuez7RsZqYWJcXrjljtVt8dWJe-fB47SF0b3XCbM-bY_e0N33vFDEeRepazCWL6rGkfqt27UyV0RXQUhhydE.woff2","weight":500,"style":"normal","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/N6a464ONG6G2QwvXkRQxmkb6Upu53F9VINRl-UICiPU-5A74LG92j2E8ztd62HTHyuecPyMCJzc74dIf2kdcJmE.woff2","weight":500,"style":"normal","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/5IgvIzWAveoNXlQFVm-aWM8yNj5ha56cFNya7Z9Q_YE-FK1AhkTx9rn_wGOIv9D38I9BXDJWXSSVmaZRw4bsXHg.woff2","weight":600,"style":"normal","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/LlkRNqpUXT184ITHz2ImBS70pPRrIYbBYm5lnR5T2hQ-QqfHOS8AuhvxUBWI2_o7dfCfV6sgPgo8fKatOL_oXaU.woff2","weight":600,"style":"normal","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/Z1Hxuez7RsZqYWJcXrjljtVt8dWJe-fB47SF0b3XCbM-bY_e0N33vFDEeRepazCWL6rGkfqt27UyV0RXQUhhydE.woff2","weight":600,"style":"normal","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/N6a464ONG6G2QwvXkRQxmkb6Upu53F9VINRl-UICiPU-5A74LG92j2E8ztd62HTHyuecPyMCJzc74dIf2kdcJmE.woff2","weight":600,"style":"normal","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/5IgvIzWAveoNXlQFVm-aWM8yNj5ha56cFNya7Z9Q_YE-FK1AhkTx9rn_wGOIv9D38I9BXDJWXSSVmaZRw4bsXHg.woff2","weight":700,"style":"normal","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/LlkRNqpUXT184ITHz2ImBS70pPRrIYbBYm5lnR5T2hQ-QqfHOS8AuhvxUBWI2_o7dfCfV6sgPgo8fKatOL_oXaU.woff2","weight":700,"style":"normal","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/Z1Hxuez7RsZqYWJcXrjljtVt8dWJe-fB47SF0b3XCbM-bY_e0N33vFDEeRepazCWL6rGkfqt27UyV0RXQUhhydE.woff2","weight":700,"style":"normal","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/N6a464ONG6G2QwvXkRQxmkb6Upu53F9VINRl-UICiPU-5A74LG92j2E8ztd62HTHyuecPyMCJzc74dIf2kdcJmE.woff2","weight":700,"style":"normal","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/5IgvIzWAveoNXlQFVm-aWM8yNj5ha56cFNya7Z9Q_YE-FK1AhkTx9rn_wGOIv9D38I9BXDJWXSSVmaZRw4bsXHg.woff2","weight":800,"style":"normal","unicodeRange":"U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F","subset":"cyrillic-ext"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/LlkRNqpUXT184ITHz2ImBS70pPRrIYbBYm5lnR5T2hQ-QqfHOS8AuhvxUBWI2_o7dfCfV6sgPgo8fKatOL_oXaU.woff2","weight":800,"style":"normal","unicodeRange":"U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB","subset":"vietnamese"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/Z1Hxuez7RsZqYWJcXrjljtVt8dWJe-fB47SF0b3XCbM-bY_e0N33vFDEeRepazCWL6rGkfqt27UyV0RXQUhhydE.woff2","weight":800,"style":"normal","unicodeRange":"U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF","subset":"latin-ext"},{"family":"Plus Jakarta Sans","src":"/_nuxt/fonts/N6a464ONG6G2QwvXkRQxmkb6Upu53F9VINRl-UICiPU-5A74LG92j2E8ztd62HTHyuecPyMCJzc74dIf2kdcJmE.woff2","weight":800,"style":"normal","unicodeRange":"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD","subset":"latin"}];

const MIN_TIMEOUT_MS = 100;
function getFetchTimeout(runtimeConfig) {
  const value = runtimeConfig.security?.imageFetchTimeout ?? 3e3;
  if (!Number.isFinite(value) || value < MIN_TIMEOUT_MS)
    return MIN_TIMEOUT_MS;
  return value;
}

const EMOJI_CODEPOINT_TO_NAME = {
  // Faces - most popular
  "1f600": "grinning-face",
  "1f603": "grinning-face-with-big-eyes",
  "1f604": "grinning-face-with-smiling-eyes",
  "1f601": "beaming-face-with-smiling-eyes",
  "1f606": "grinning-squinting-face",
  "1f605": "grinning-face-with-sweat",
  "1f602": "face-with-tears-of-joy",
  "1f923": "rolling-on-the-floor-laughing",
  "1f60a": "smiling-face-with-smiling-eyes",
  "1f607": "smiling-face-with-halo",
  "1f970": "smiling-face-with-hearts",
  "1f60d": "smiling-face-with-heart-eyes",
  "1f929": "star-struck",
  "1f618": "face-blowing-a-kiss",
  "1f617": "kissing-face",
  "1f619": "kissing-face-with-smiling-eyes",
  "1f61a": "kissing-face-with-closed-eyes",
  "1f60b": "face-savoring-food",
  "1f61b": "face-with-tongue",
  "1f61c": "winking-face-with-tongue",
  "1f92a": "zany-face",
  "1f61d": "squinting-face-with-tongue",
  "1f911": "money-mouth-face",
  "1f917": "smiling-face-with-open-hands",
  "1f92d": "face-with-hand-over-mouth",
  "1f92b": "shushing-face",
  "1f914": "thinking-face",
  "1f910": "zipper-mouth-face",
  "1f928": "face-with-raised-eyebrow",
  "1f610": "neutral-face",
  "1f611": "expressionless-face",
  "1f636": "face-without-mouth",
  "1f60f": "smirking-face",
  "1f612": "unamused-face",
  "1f644": "face-with-rolling-eyes",
  "1f62c": "grimacing-face",
  "1f925": "lying-face",
  "1f60c": "relieved-face",
  "1f614": "pensive-face",
  "1f62a": "sleepy-face",
  "1f924": "drooling-face",
  "1f634": "sleeping-face",
  "1f637": "face-with-medical-mask",
  "1f912": "face-with-thermometer",
  "1f915": "face-with-head-bandage",
  "1f922": "nauseated-face",
  "1f92e": "face-vomiting",
  "1f927": "sneezing-face",
  "1f975": "hot-face",
  "1f976": "cold-face",
  "1f974": "woozy-face",
  "1f635": "knocked-out-face",
  "1f92f": "exploding-head",
  "1f920": "cowboy-hat-face",
  "1f973": "partying-face",
  "1f60e": "smiling-face-with-sunglasses",
  "1f913": "nerd-face",
  "1f9d0": "face-with-monocle",
  // Gestures
  "1f44b": "waving-hand",
  "1f44d": "thumbs-up",
  "1f44e": "thumbs-down",
  "1f44f": "clapping-hands",
  "1f64c": "raising-hands",
  "1f64f": "folded-hands",
  "1f4aa": "flexed-biceps",
  "270c": "victory-hand",
  "1f91e": "crossed-fingers",
  "1f918": "sign-of-the-horns",
  "1f919": "call-me-hand",
  "1f448": "backhand-index-pointing-left",
  "1f449": "backhand-index-pointing-right",
  "1f446": "backhand-index-pointing-up",
  "1f447": "backhand-index-pointing-down",
  "261d": "index-pointing-up",
  "270b": "raised-hand",
  "1f91a": "raised-back-of-hand",
  "1f590": "hand-with-fingers-splayed",
  "1f596": "vulcan-salute",
  "1f44c": "ok-hand",
  // Hearts & Symbols
  "2764": "red-heart",
  "1f9e1": "orange-heart",
  "1f49b": "yellow-heart",
  "1f49a": "green-heart",
  "1f499": "blue-heart",
  "1f49c": "purple-heart",
  "1f5a4": "black-heart",
  "1f90d": "white-heart",
  "1f90e": "brown-heart",
  "1f494": "broken-heart",
  "1f495": "two-hearts",
  "1f496": "sparkling-heart",
  "1f497": "growing-heart",
  "1f498": "heart-with-arrow",
  "1f49d": "heart-with-ribbon",
  "1f49e": "revolving-hearts",
  "1f49f": "heart-decoration",
  // Popular Objects & Symbols
  "1f680": "rocket",
  "26a1": "high-voltage",
  "1f525": "fire",
  "2728": "sparkles",
  "1f31f": "glowing-star",
  "2b50": "star",
  "1f4a5": "collision",
  "1f4a1": "light-bulb",
  "1f389": "party-popper",
  "1f38a": "confetti-ball",
  "1f381": "wrapped-gift",
  "1f3c6": "trophy",
  "1f3c5": "1st-place-medal",
  "1f947": "1st-place-medal",
  "1f4af": "hundred-points",
  "2705": "check-mark-button",
  "274c": "cross-mark",
  "2714": "check-mark",
  "2795": "plus",
  "2796": "minus",
  "2716": "multiply",
  "27a1": "right-arrow",
  "2b05": "left-arrow",
  "2b06": "up-arrow",
  "2b07": "down-arrow",
  // Tech & Work
  "1f4bb": "laptop",
  "1f4f1": "mobile-phone",
  "2699": "gear",
  "1f527": "wrench",
  "1f528": "hammer",
  "1f529": "nut-and-bolt",
  "1f6e0": "hammer-and-wrench",
  "1f4e6": "package",
  "1f4dd": "memo",
  "1f4c8": "chart-increasing",
  "1f4c9": "chart-decreasing",
  "1f4ca": "bar-chart",
  "1f4cb": "clipboard",
  "1f4cc": "pushpin",
  "1f4cd": "round-pushpin",
  "1f4ce": "paperclip",
  "1f4cf": "straight-ruler",
  "1f4d0": "triangular-ruler",
  "1f50d": "magnifying-glass-tilted-left",
  "1f50e": "magnifying-glass-tilted-right",
  "1f512": "locked",
  "1f513": "unlocked",
  // Nature & Weather
  "2600": "sun",
  "1f31e": "sun-with-face",
  "1f319": "crescent-moon",
  "1f308": "rainbow",
  "2601": "cloud",
  "26c5": "sun-behind-cloud",
  "1f327": "cloud-with-rain",
  "26c8": "cloud-with-lightning-and-rain",
  "1f329": "cloud-with-lightning",
  "2744": "snowflake",
  "1f4a7": "droplet",
  "1f30a": "water-wave",
  // Animals
  "1f436": "dog-face",
  "1f431": "cat-face",
  "1f42d": "mouse-face",
  "1f430": "rabbit-face",
  "1f43b": "bear",
  "1f43c": "panda",
  "1f428": "koala",
  "1f42f": "tiger-face",
  "1f981": "lion",
  "1f984": "unicorn",
  "1f98b": "butterfly",
  "1f41d": "honeybee",
  "1f577": "spider",
  "1f427": "penguin",
  "1f426": "bird",
  "1f985": "eagle",
  "1f419": "octopus",
  "1f422": "turtle",
  "1f40d": "snake",
  "1f409": "dragon",
  "1f432": "dragon-face",
  // Food
  "1f34e": "red-apple",
  "1f34a": "tangerine",
  "1f34b": "lemon",
  "1f34c": "banana",
  "1f34d": "pineapple",
  "1f347": "grapes",
  "1f353": "strawberry",
  "1f352": "cherries",
  "1f351": "peach",
  "1f349": "watermelon",
  "1f96d": "mango",
  "1f951": "avocado",
  "1f955": "carrot",
  "1f33d": "ear-of-corn",
  "1f336": "hot-pepper",
  "1f355": "pizza",
  "1f354": "hamburger",
  "1f35f": "french-fries",
  "1f32d": "hot-dog",
  "1f32e": "taco",
  "1f32f": "burrito",
  "1f37f": "popcorn",
  "1f36a": "cookie",
  "1f382": "birthday-cake",
  "1f370": "shortcake",
  "1f36b": "chocolate-bar",
  "1f36c": "candy",
  "1f36d": "lollipop",
  "1f369": "doughnut",
  "1f366": "soft-ice-cream",
  "1f36f": "honey-pot",
  "2615": "hot-beverage",
  "1f375": "teacup-without-handle",
  "1f37a": "beer-mug",
  "1f37b": "clinking-beer-mugs",
  "1f377": "wine-glass",
  "1f378": "cocktail-glass"
};

const RE_VARIATION_SELECTOR = /-fe0f$/i;
const RE_MATCH_EMOJIS = /(?:\p{Extended_Pictographic}|[\d#*]\uFE0F\u20E3|\p{Regional_Indicator}{2})(?:\p{Emoji_Modifier}|\uFE0F|\u200D[\p{Extended_Pictographic}\p{Emoji}])*/gu;
function getEmojiIconNames(codePoint, _emojiSet) {
  const baseCodePoint = codePoint.replace(RE_VARIATION_SELECTOR, "");
  const knownName = EMOJI_CODEPOINT_TO_NAME[codePoint] || EMOJI_CODEPOINT_TO_NAME[baseCodePoint];
  if (knownName) {
    return [knownName];
  }
  return [codePoint, baseCodePoint, `u${baseCodePoint}`].filter((v, i, a) => a.indexOf(v) === i);
}
function getEmojiCodePoint(emoji) {
  return Array.from(emoji, (char) => char.codePointAt(0).toString(16)).join("-");
}

async function getEmojiSvg(ctx, emojiChar) {
  const emojiSet = ctx.options.emojis;
  const codePoint = getEmojiCodePoint(emojiChar);
  const possibleNames = getEmojiIconNames(codePoint);
  let svg = null;
  for (const iconName of possibleNames) {
    const key = toStorageKey("emoji", [emojiSet, iconName]);
    if (await emojiCache.hasItem(key)) {
      svg = await emojiCache.getItem(key);
      if (svg)
        break;
    }
  }
  if (!svg) {
    const timeout = getFetchTimeout(ctx.runtimeConfig);
    const deadline = AbortSignal.timeout(timeout);
    const endTiming = ctx.timings.start("emoji-fetch");
    try {
      for (const iconName of possibleNames) {
        if (deadline.aborted)
          break;
        try {
          svg = await $fetch(`https://api.iconify.design/${encodeURIComponent(emojiSet)}/${encodeURIComponent(iconName)}.svg`, {
            responseType: "text",
            retry: 0,
            signal: deadline,
            timeout
          });
          if (svg && svg !== "404") {
            await emojiCache.setItem(toStorageKey("emoji", [emojiSet, iconName]), svg);
            break;
          }
        } catch {
          svg = null;
        }
      }
    } finally {
      endTiming();
    }
  }
  if (svg) {
    return svg.replace("<svg ", '<svg data-emoji style="margin: 0 .05em 0 .15em; vertical-align: -0.1em;" ');
  }
  return null;
}

const RE_SVG_ID_ATTR = /\bid="([^"]+)"/g;
const RE_HTML_TEXT_CONTENT = />([^<]*)</g;
const RE_REGEX_SPECIAL_CHARS = /[.*+?^${}()|[\]\\]/g;
let emojiCounter = 0;
function wrapDefsElements(svg) {
  const defsElements = ["linearGradient", "radialGradient", "filter", "clipPath", "mask", "pattern"];
  const defsRegex = new RegExp(`<(${defsElements.join("|")})[\\s\\S]*?<\\/\\1>`, "g");
  if (svg.includes("<defs>") || svg.includes("<defs ")) {
    return svg;
  }
  const foundDefs = [];
  let result = svg.replace(defsRegex, (match) => {
    foundDefs.push(match);
    return "";
  });
  if (foundDefs.length > 0) {
    const svgTagEnd = result.indexOf(">") + 1;
    result = `${result.slice(0, svgTagEnd)}<defs>${foundDefs.join("")}</defs>${result.slice(svgTagEnd)}`;
  }
  return result;
}
function makeIdsUnique(svg) {
  const prefix = `e${emojiCounter++}_`;
  const ids = /* @__PURE__ */ new Set();
  svg.replace(RE_SVG_ID_ATTR, (_, id) => {
    ids.add(id);
    return "";
  });
  let result = svg;
  for (const id of ids) {
    result = result.replace(new RegExp(`id="${id}"`, "g"), `id="${prefix}${id}"`).replace(new RegExp(`url\\(#${id}\\)`, "g"), `url(#${prefix}${id})`).replace(new RegExp(`href="#${id}"`, "g"), `href="#${prefix}${id}"`);
  }
  return result;
}
async function applyEmojis(ctx, island) {
  if (!island.html || !ctx.options.emojis)
    return;
  const matches = [...island.html.matchAll(RE_MATCH_EMOJIS)];
  if (!matches.length)
    return;
  const emojiToSvg = /* @__PURE__ */ new Map();
  const uniqueEmojis = [...new Set(matches.map((m) => m[0]))];
  await Promise.all(uniqueEmojis.map(async (emoji) => {
    let svg = await getEmojiSvg(ctx, emoji);
    if (svg) {
      svg = makeIdsUnique(svg);
      svg = wrapDefsElements(svg);
    }
    emojiToSvg.set(emoji, svg ?? null);
  }));
  let html = island.html;
  html = html.replace(RE_HTML_TEXT_CONTENT, (fullMatch, textContent) => {
    if (!textContent)
      return fullMatch;
    let newTextContent = textContent;
    for (const [emoji, svg] of emojiToSvg) {
      if (svg) {
        const escaped = emoji.replace(RE_REGEX_SPECIAL_CHARS, "\\$&");
        newTextContent = newTextContent.replace(new RegExp(escaped, "g"), svg);
      }
    }
    return `>${newTextContent}<`;
  });
  island.html = html;
}

const RE_SCRIPT_TAG = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
async function html(ctx) {
  const { options } = ctx;
  const fonts = resolvedFonts;
  if (!options.component) {
    throw createError({
      statusCode: 500,
      statusMessage: `[Nuxt OG Image] Rendering an invalid component. Received options: ${JSON.stringify(options)}.`
    });
  }
  const islandTimeout = ctx.runtimeConfig.security?.renderTimeout ?? 15e3;
  const island = await fetchIsland(ctx.e, ctx.options.component, typeof ctx.options.props !== "undefined" ? ctx.options.props : ctx.options, islandTimeout);
  const head = createHead();
  head.push(island.head);
  let defaultFontFamily = "sans-serif";
  const firstFont = fonts[0];
  if (firstFont)
    defaultFontFamily = firstFont.family.replaceAll("+", " ");
  await applyEmojis(ctx, island);
  let html2 = island.html;
  const scale = options.props?.scale || 1;
  const scaledWidth = Math.round(Number(options.width) * scale);
  const scaledHeight = Math.round(Number(options.height) * scale);
  const fontFaces = fonts.map((font) => {
    const ext = font.src.split(".").pop()?.toLowerCase();
    const format = ext === "woff2" ? "woff2" : ext === "woff" ? "woff" : "truetype";
    return `@font-face {
  font-family: '${font.family.replaceAll("+", " ")}';
  font-style: ${font.style};
  font-weight: ${font.weight};
  src: url('${font.src}') format('${format}');
}`;
  }).join("\n");
  const bgColor = options.props?.colorMode === "dark" ? "#1b1b1b" : "#fff";
  head.push({
    style: [
      {
        innerHTML: `/* reset */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
img, svg { display: block; max-width: 100%; }

/* viewport */
html, body {
  width: ${scaledWidth}px;
  height: ${scaledHeight}px;
  overflow: hidden;
  font-family: '${defaultFontFamily}', sans-serif;
  background-color: ${bgColor};
}

/* scale wrapper */
.og-scale-wrapper {
  transform: scale(${scale});
  transform-origin: top left;
  width: ${options.width}px;
  height: ${options.height}px;
}
.og-scale-wrapper > :first-child {
  width: 100%;
  height: 100%;
}

/* match satori flex defaults for divs */
div { display: flex; }
div:has(div, p, ul, ol, li, blockquote, pre, hr, table, dl) {
  flex-direction: column;
}
div:not(:has(div, p, ul, ol, li, blockquote, pre, hr, table, dl)) {
  flex-wrap: wrap;
  gap: 12px;
}

svg[data-emoji] { display: inline-block; }

/* fonts */
${fontFaces}`
      }
    ],
    meta: [
      { charset: "utf-8" }
    ]
  });
  RE_SCRIPT_TAG.lastIndex = 0;
  html2 = html2.replaceAll(RE_SCRIPT_TAG, "");
  const headChunk = await renderSSRHead(head);
  return `<!DOCTYPE html>
<html ${headChunk.htmlAttrs}>
<head>${headChunk.headTags}</head>
<body ${headChunk.bodyAttrs}>${headChunk.bodyTagsOpen}<div class="og-scale-wrapper" data-v-inspector-ignore="true">${html2}</div>${headChunk.bodyTags}</body>
</html>`;
}

function warnCacheBackendUnreachable(ctx, baseCacheKey, e) {
  if (ctx._nitro._ogImageCacheBackendWarned)
    return;
  ctx._nitro._ogImageCacheBackendWarned = true;
  logger$1.warn(`[Nuxt OG Image] Cache backend "${baseCacheKey}" unreachable, continuing without cache: ${e?.message || e}`);
}
async function useOgImageBufferCache(ctx, options) {
  const maxAge = Number(options.cacheMaxAgeSeconds);
  const intentionallyEnabled = options.baseCacheKey !== false && true && true && maxAge > 0;
  let enabled = intentionallyEnabled;
  const cache = options.baseCacheKey === false ? void 0 : prefixStorage(useStorage(), withTrailingSlash(options.baseCacheKey));
  const key = toStorageKey("image", ctx.key);
  let cachedItem = false;
  let cacheExpiresAt = 0;
  if (enabled && cache) {
    const hasItem = await cache.hasItem(key).catch((e) => {
      enabled = false;
      warnCacheBackendUnreachable(ctx, options.baseCacheKey, e);
      return false;
    });
    const entry = hasItem ? await cache.getItem(key).catch((e) => {
      enabled = false;
      warnCacheBackendUnreachable(ctx, options.baseCacheKey, e);
      return null;
    }) : null;
    if (entry) {
      const { value, expiresAt, headers } = entry;
      if (options.purge) {
        await cache.removeItem(key).catch((err) => {
        });
      } else if (expiresAt > Date.now()) {
        cacheExpiresAt = expiresAt;
        cachedItem = Buffer.from(value, "base64");
        if (handleCacheHeaders(ctx.e, {
          modifiedTime: new Date(headers["last-modified"]),
          etag: headers.etag,
          maxAge
        })) {
          return;
        }
        setHeaders(ctx.e, headers);
        setHeader(ctx.e, "X-OG-Cache", "HIT");
      } else {
        await cache.removeItem(key).catch((err) => {
        });
      }
    }
  }
  if (!enabled && true) {
    setHeader(ctx.e, "Cache-Control", "no-cache, no-store, must-revalidate");
    setHeader(ctx.e, "Pragma", "no-cache");
    setHeader(ctx.e, "Expires", "0");
  }
  return {
    enabled,
    cachedItem,
    get expiresAt() {
      return cacheExpiresAt;
    },
    async update(item) {
      setHeader(ctx.e, "X-OG-Cache", enabled ? "MISS" : "DISABLED");
      if (!enabled || !cache)
        return;
      const value = Buffer.from(item).toString("base64");
      cacheExpiresAt = Date.now() + maxAge * 1e3;
      const headers = {
        // avoid multi-tenancy cache issues
        "Vary": "accept-encoding, host",
        "etag": `W/"${fnv1a64Base36(value)}"`,
        "last-modified": (/* @__PURE__ */ new Date()).toUTCString(),
        "cache-control": `public, max-age=${maxAge}, s-maxage=${maxAge}, immutable`
      };
      setHeaders(ctx.e, headers);
      await cache.setItem(key, {
        value,
        headers,
        expiresAt: cacheExpiresAt
      }, { ttl: Math.max(maxAge, 60) }).catch((err) => logger$1.warn(`[Nuxt OG Image] Failed to write cache for key "${key}": ${err?.message || err}`));
    }
  };
}

function warnPublishUnavailable(app, reason, logger) {
  if (app._ogImagePublishWarned)
    return;
  app._ogImagePublishWarned = true;
  logger.warn("[Nuxt OG Image] Publish storage is unavailable. Keeping app image URLs. Check the storage driver and credentials.", reason);
}

function safeCompare(a, b) {
  if (a.length !== b.length)
    return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++)
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}
function parsePurgeRequest(value, secret) {
  if (value === void 0)
    return { _tag: "None" };
  if (typeof secret !== "string" || !secret || typeof value !== "string")
    return { _tag: "Denied" };
  return safeCompare(value, secret) ? { _tag: "Authorized" } : { _tag: "Denied" };
}

async function imageEventHandler(e) {
  const reqStart = performance.now();
  const ctx = await resolveContext(e).catch((err) => {
    logger$1.error(`resolveContext error for ${e.path}:`, err?.message || err);
    throw err;
  });
  if (ctx instanceof H3Error)
    return ctx;
  const timings = ctx.timings;
  timings.record("resolve-context", performance.now() - reqStart);
  try {
    return await renderOgImage(e, ctx);
  } finally {
    timings.record("total", performance.now() - reqStart);
    const header = timings.header();
    if (header && !e.node?.res?.headersSent)
      appendResponseHeader(e, "Server-Timing", header);
  }
}
async function renderOgImage(e, ctx) {
  const timings = ctx.timings;
  const { isDevToolsContextRequest, extension, renderer } = ctx;
  const config = useOgImageRuntimeConfig(e);
  const { debug, baseCacheKey, security, publish } = config;
  if (security?.restrictRuntimeImagesToOrigin) {
    const requestHost = getRequestHost(e, { xForwardedHost: true });
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
      const siteHost = new URL(getSiteConfig(e).url).host;
      const allowedHosts = [siteHost, ...security.restrictRuntimeImagesToOrigin.map((o) => {
        try {
          return new URL(o).host;
        } catch {
          return o;
        }
      })];
      if (!requestHost || !allowedHosts.includes(requestHost)) {
        return createError({
          statusCode: 403,
          statusMessage: "[Nuxt OG Image] Host not allowed."
        });
      }
    }
  }
  const purgeRequest = parsePurgeRequest(getEventQuery(e).purge, security?.secret);
  if (purgeRequest._tag === "Denied") {
    return createError({
      statusCode: 403,
      statusMessage: "[Nuxt OG Image] Invalid purge token. Provide the signing secret as ?purge=<secret>."
    });
  }
  const purge = purgeRequest._tag === "Authorized";
  if ((debug) && isDevToolsContextRequest) {
    setHeader(e, "Content-Type", "application/json");
    const [extract, rendererDebug] = await Promise.all([
      fetchPathHtmlAndExtractOptions(e, ctx.basePath, ctx.key),
      renderer.debug ? renderer.debug(ctx).catch((err) => {
        logger$1.debug(`renderer.debug failed for ${ctx.options.component}: ${err?.message || err}`);
        return {};
      }) : {}
    ]);
    return {
      extract,
      siteUrl: getSiteConfig(e).url,
      ...rendererDebug
    };
  }
  switch (extension) {
    case "html":
      setHeader(e, "Content-Type", `text/html`);
      return html(ctx);
    case "svg": {
      if (!debug && true) {
        return createError({
          statusCode: 404
        });
      }
      if (ctx.renderer.name !== "satori") {
        return createError({
          statusCode: 400,
          statusMessage: `[Nuxt OG Image] Generating ${extension}'s with ${renderer.name} is not supported.`
        });
      }
      setHeader(e, "Content-Type", `image/svg+xml`);
      const debugResult = await ctx.renderer.debug(ctx);
      return debugResult.svg;
    }
    case "png":
    case "jpeg":
    case "jpg":
    case "webp":
      if (!renderer.supportedFormats.includes(extension)) {
        return createError({
          statusCode: 400,
          statusMessage: `[Nuxt OG Image] Generating ${extension}'s with ${renderer.name} is not supported.`
        });
      }
      setHeader(e, "Content-Type", `image/${extension === "jpg" ? "jpeg" : extension}`);
      break;
    default:
      return createError({
        statusCode: 400,
        statusMessage: `[Nuxt OG Image] Invalid request for og.${extension}.`
      });
  }
  let publication = publish && true && true ? (() => {
    const key = getPublishKey(new URL(e.path, getSiteConfig(e).url).href, config.defaults, publish.cacheVersion);
    return {
      cache: getPublishedImageCache(ctx._nitro),
      cacheKey: getPublishedImageCacheKey(publish, key, extension),
      input: {
        storage: useStorage(),
        mount: publish.storage,
        baseURL: publish.baseURL,
        key,
        extension,
        maxAgeSeconds: Number(ctx.options.cacheMaxAgeSeconds),
        timeoutMs: security.renderTimeout,
        now: Date.now
      }
    };
  })() : void 0;
  if (publication && !purge && !publication.cache.isPublishing(publication.cacheKey, Date.now())) {
    const result = await getPublishedImage(publication.input);
    if (result._tag === "Published" && result.expiresAt > Date.now()) {
      publication.cache.remember(publication.cacheKey, result, Date.now());
      const remainingAge = Math.max(0, Math.floor((result.expiresAt - Date.now()) / 1e3));
      setHeader(e, "Cache-Control", `public, max-age=${remainingAge}, s-maxage=${remainingAge}`);
      return sendRedirect(e, result.url, 302);
    }
    publication.cache.forget(publication.cacheKey);
    if (result._tag === "Unavailable") {
      warnPublishUnavailable(ctx._nitro, result.reason, logger$1);
      publication = void 0;
    }
  }
  const endCacheLookup = timings.start("cache-lookup");
  const cacheApi = await useOgImageBufferCache(ctx, {
    cacheMaxAgeSeconds: ctx.options.cacheMaxAgeSeconds,
    baseCacheKey,
    purge
  }).finally(endCacheLookup);
  if (typeof cacheApi === "undefined") {
    return;
  }
  if (publication && purge)
    publication.cache.forget(publication.cacheKey);
  let image = cacheApi.cachedItem;
  if (image) {
    timings.record("cache-hit", 0);
  }
  if (!image) {
    const timeout = security?.renderTimeout ?? 15e3;
    let timer;
    const endRender = timings.start("render-total");
    image = await Promise.race([
      renderer.createImage(ctx),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(`OG image render timed out after ${timeout}ms`)), timeout);
      })
    ]).catch((err) => {
      if (err?.message?.includes("timed out")) {
        logger$1.error(`renderer.createImage timeout for ${e.path}`);
        return createError({ statusCode: 408, statusMessage: `[Nuxt OG Image] Request timed out while waiting for OG image render.` });
      }
      logger$1.error(`renderer.createImage error for ${e.path}:`, err?.stack || err?.message || err);
      throw err;
    }).finally(() => {
      clearTimeout(timer);
      endRender();
    });
    if (image instanceof H3Error) {
      return image;
    }
    if (!image) {
      return createError({
        statusCode: 500,
        statusMessage: `Failed to generate og.${extension}.`
      });
    }
    await cacheApi.update(image);
  }
  if (publication) {
    const maxAge = Number(ctx.options.cacheMaxAgeSeconds);
    const expiresAt = cacheApi.expiresAt || Date.now() + (Number.isFinite(maxAge) ? Math.max(0, maxAge) : 0) * 1e3;
    const remainingAge = Math.max(0, (expiresAt - Date.now()) / 1e3);
    const { cache, cacheKey, input } = publication;
    const token = cache.begin(cacheKey, Date.now(), input.timeoutMs);
    if (token) {
      const bytes = new Uint8Array(image);
      const app = ctx._nitro;
      const task = publishImage({
        ...input,
        maxAgeSeconds: remainingAge,
        expiresAt,
        force: true,
        render: async () => bytes
      }).then((result) => {
        cache.complete(cacheKey, token, result, Date.now());
        if (result._tag === "Unavailable")
          warnPublishUnavailable(app, result.reason, logger$1);
      }).catch((reason) => {
        cache.complete(cacheKey, token, { _tag: "Unavailable" }, Date.now());
        warnPublishUnavailable(app, reason, logger$1);
      });
      e.waitUntil(task);
    }
  }
  return image;
}

const image = defineEventHandler(imageEventHandler);

export { image as default };
//# sourceMappingURL=image.mjs.map
