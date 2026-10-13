import { ae as collectSitemap, af as logger, l as useRuntimeConfig, ag as hasAssets, ah as createUniversalContext, ai as parseSitemap, aj as getCfEnv, a1 as getSiteConfig, ab as getRequestHost, ak as queryPages, al as toLogicalRoute, am as normalizePersistedRoute, an as withSiteUrl, ao as toDeployedRoute, ap as withSiteTrailingSlash, aq as toMarkdownPath, ar as decodePath, as as hasMarkdownTwin, at as eventHandler, s as setHeader, au as defineCachedFunction, av as publicCacheControl } from '../nitro/nitro.mjs';
import { n as normalizeLlmsTxtConfig, f as formatLlmsTxtPageLink } from '../_/llms-txt-format.mjs';
import { fetchRawWithEvent } from '../_/fetch.mjs';
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

const DEFAULT_MAX_REDIRECTS = 5;
const DEFAULT_MAX_WIRE_BYTES = 50 * 1024 * 1024;
const DEFAULT_MAX_DEPTH = 3;
const DEFAULT_MAX_DOCUMENTS = 100;
const DEFAULT_MAX_URLS = 5e4;
function observeBody(input) {
  let failure = { _tag: "none" };
  const recordFailure = (error) => {
    failure = { _tag: "failed", error };
    throw error;
  };
  async function* chunks() {
    if (typeof input === "string" || input instanceof Uint8Array) {
      yield input;
      return;
    }
    if ("getReader" in input) {
      const reader = input.getReader();
      let settled = false;
      try {
        while (!settled) {
          const next = await reader.read().catch((error) => {
            settled = true;
            return recordFailure(error);
          });
          settled = next.done;
          if (next.value !== void 0)
            yield next.value;
        }
      } finally {
        try {
          if (!settled)
            await reader.cancel("sitemap input stopped before completion");
        } finally {
          reader.releaseLock();
        }
      }
      return;
    }
    const iterator = Symbol.asyncIterator in input ? input[Symbol.asyncIterator]() : input[Symbol.iterator]();
    let done = false;
    try {
      while (!done) {
        let next;
        try {
          next = await iterator.next();
        } catch (error) {
          done = true;
          return recordFailure(error);
        }
        done = Boolean(next.done);
        if (!next.done)
          yield next.value;
      }
    } finally {
      if (!done)
        await iterator.return?.();
    }
  }
  return {
    input: typeof input === "string" || input instanceof Uint8Array ? input : chunks(),
    failure: () => failure
  };
}
function bodyFailureCode(error) {
  if (error && typeof error === "object") {
    if ("code" in error && (error.code === "wire_limit" || error.code === "timeout" || error.code === "cancelled" || error.code === "network" || error.code === "content_type"))
      return error.code;
    if ("name" in error && error.name === "AbortError")
      return "cancelled";
    if ("name" in error && error.name === "TimeoutError")
      return "timeout";
  }
  return "network";
}
function parseLimit(value, fallback, name) {
  if (value === void 0)
    return fallback;
  if (!Number.isFinite(value) || value < 0 || !Number.isInteger(value))
    throw new RangeError(`${name} must be a non-negative finite integer`);
  return value;
}
function parseConcurrency(value) {
  if (value === void 0)
    return 1;
  if (!Number.isSafeInteger(value) || value < 1)
    throw new RangeError("concurrency must be a positive safe integer");
  return value;
}
function unique(values) {
  return [...new Set(values)];
}
function parseWalkInput(input) {
  if (typeof input === "string") {
    return [{ url: input, depth: 0, source: "root" }];
  }
  if (input.every((entry) => typeof entry === "string")) {
    return input.map((url) => ({ url, depth: 0, source: "root" }));
  }
  return input.map((entry) => {
    if (entry.source === "root") {
      if (entry.depth !== 0 || entry.parentUrl !== void 0)
        throw new TypeError("A root walk entry must have depth 0 and no parentUrl");
      return { url: entry.url, depth: 0, source: "root" };
    }
    if (!Number.isSafeInteger(entry.depth) || entry.depth < 1)
      throw new RangeError("An index child walk entry must have a positive safe depth");
    if (!entry.parentUrl)
      throw new TypeError("An index child walk entry requires parentUrl");
    return { ...entry };
  });
}
function createSitemapReader(options) {
  const read = async (initialUrl, readOptions = {}) => {
    const maxRedirects = parseLimit(
      readOptions.maxRedirects ?? options.limits?.maxRedirects,
      DEFAULT_MAX_REDIRECTS,
      "maxRedirects"
    );
    const maxWireBytes = parseLimit(
      readOptions.maxWireBytes ?? options.limits?.maxWireBytes,
      DEFAULT_MAX_WIRE_BYTES,
      "maxWireBytes"
    );
    let url = initialUrl;
    let source = readOptions.source ?? "root";
    let parentUrl = readOptions.parentUrl;
    const depth = readOptions.depth ?? 0;
    for (let redirects = 0; redirects <= maxRedirects; redirects++) {
      const request = {
        url,
        resource: "sitemap",
        source,
        depth,
        maxWireBytes,
        ...parentUrl ? { parentUrl } : {},
        ...readOptions.signal ? { signal: readOptions.signal } : {}
      };
      const authorization = await options.authorizeTarget(request);
      if (authorization._tag === "deny") {
        return {
          _tag: "failure",
          url,
          reason: "unauthorized",
          detail: authorization.reason
        };
      }
      const loaded = await options.loadDocument(request);
      if (loaded._tag === "redirect") {
        if (redirects === maxRedirects) {
          return {
            _tag: "failure",
            url,
            reason: "redirect_limit",
            detail: `Sitemap exceeds ${maxRedirects} redirects`
          };
        }
        let redirected;
        try {
          redirected = new URL(loaded.location, url).toString();
        } catch {
          return {
            _tag: "failure",
            url,
            reason: "invalid_redirect",
            detail: `Invalid redirect location: ${loaded.location}`
          };
        }
        parentUrl = url;
        url = redirected;
        source = "redirect";
        continue;
      }
      if (loaded._tag === "not_found")
        return loaded;
      if (loaded._tag === "http_error") {
        return {
          _tag: "failure",
          url,
          reason: "http",
          detail: `HTTP ${loaded.status}: ${loaded.statusText}`,
          status: loaded.status
        };
      }
      if (loaded._tag === "load_error") {
        return {
          _tag: "failure",
          url,
          reason: "load",
          code: loaded.code,
          detail: loaded.detail
        };
      }
      const maxDecodedBytes = readOptions.maxDecodedBytes ?? options.limits?.maxDecodedBytes;
      const maxEntries = readOptions.maxEntries ?? options.limits?.maxEntries;
      const body = observeBody(loaded.body);
      const parsed = await collectSitemap(body.input, {
        ...readOptions.formatHint ? { formatHint: readOptions.formatHint } : {},
        ...maxDecodedBytes !== void 0 ? { maxDecodedBytes } : {},
        ...maxEntries !== void 0 ? { maxEntries } : {}
      }).catch((error) => {
        const failure2 = body.failure();
        if (failure2._tag === "failed" && failure2.error === error)
          return void 0;
        throw error;
      });
      const failure = body.failure();
      if (failure._tag === "failed") {
        return {
          _tag: "failure",
          url,
          reason: "load",
          code: bodyFailureCode(failure.error),
          detail: failure.error instanceof Error ? failure.error.message : String(failure.error)
        };
      }
      if (!parsed)
        throw new Error("Sitemap parser ended without a result");
      if (parsed._tag !== "document") {
        return {
          _tag: "failure",
          url,
          reason: "document",
          detail: parsed.issues.map((issue) => issue.message).join("; ") || parsed.completeness._tag
        };
      }
      return { _tag: "ok", url: loaded.url, document: parsed.document, parse: parsed };
    }
    throw new Error("Unreachable redirect loop state");
  };
  async function walk(input, walkOptions = {}) {
    const maxDepth = parseLimit(
      walkOptions.maxDepth ?? options.limits?.maxDepth,
      DEFAULT_MAX_DEPTH,
      "maxDepth"
    );
    const maxDocuments = parseLimit(
      walkOptions.maxDocuments ?? options.limits?.maxDocuments,
      DEFAULT_MAX_DOCUMENTS,
      "maxDocuments"
    );
    const maxUrls = parseLimit(
      walkOptions.maxUrls ?? options.limits?.maxUrls,
      DEFAULT_MAX_URLS,
      "maxUrls"
    );
    const concurrency = parseConcurrency(walkOptions.concurrency);
    const retainEntries = walkOptions.retention !== "none";
    const queue = parseWalkInput(input);
    const seenDocuments = new Set(walkOptions.seenDocuments ?? []);
    const seenUrls = retainEntries ? /* @__PURE__ */ new Set() : null;
    const entries = [];
    const references = [];
    const failures = [];
    const reasons = [];
    const active = /* @__PURE__ */ new Map();
    const settled = /* @__PURE__ */ new Map();
    const scheduled = /* @__PURE__ */ new Map();
    const interrupted = [];
    const controller = new AbortController();
    const callerSignal = walkOptions.signal;
    const abortFromCaller = () => {
      if (!controller.signal.aborted) {
        controller.abort(
          callerSignal?.reason ?? new DOMException("Sitemap traversal was cancelled", "AbortError")
        );
      }
    };
    if (callerSignal?.aborted)
      abortFromCaller();
    else
      callerSignal?.addEventListener("abort", abortFromCaller, { once: true });
    let urlsObserved = 0;
    let referencesObserved = 0;
    let documentsAttempted = 0;
    let documentsRead = 0;
    let nextSequence = 0;
    let nextCommit = 0;
    let schedulingStopped = false;
    const hasQueuedDocument = () => queue.some((item) => !seenDocuments.has(item.url));
    const stopAndDrain = async (reason, preserveFrontier = false) => {
      schedulingStopped = true;
      if (!controller.signal.aborted)
        controller.abort(reason);
      if (preserveFrontier) {
        interrupted.push(
          ...[...scheduled.entries()].sort(([left], [right]) => left - right).map(([, item]) => item)
        );
      }
      const pending = [...active.values()];
      active.clear();
      settled.clear();
      scheduled.clear();
      await Promise.all(pending);
    };
    const fill = () => {
      while (!schedulingStopped && !controller.signal.aborted && active.size + settled.size < concurrency) {
        let next;
        while (queue.length > 0) {
          const candidate = queue.shift();
          if (seenDocuments.has(candidate.url))
            continue;
          next = candidate;
          break;
        }
        if (!next)
          return;
        if (documentsAttempted >= maxDocuments) {
          queue.unshift(next);
          reasons.push("document_limit");
          schedulingStopped = true;
          return;
        }
        seenDocuments.add(next.url);
        documentsAttempted++;
        const sequence = nextSequence++;
        const promise = read(next.url, {
          ...walkOptions,
          signal: controller.signal,
          source: next.source,
          depth: next.depth,
          ...next.parentUrl ? { parentUrl: next.parentUrl } : {}
        }).then(
          (result) => ({
            _tag: "result",
            sequence,
            item: next,
            result
          }),
          (error) => ({
            _tag: "thrown",
            sequence,
            item: next,
            error
          })
        );
        active.set(sequence, promise);
        scheduled.set(sequence, next);
      }
    };
    const visit = async (item, result) => {
      if (!walkOptions.onDocument)
        return;
      const document = {
        requestedUrl: item.url,
        resolvedUrl: result.url,
        source: item.source,
        depth: item.depth,
        ...item.parentUrl ? { parentUrl: item.parentUrl } : {},
        document: result.document,
        parse: result.parse
      };
      const visitation = await Promise.resolve().then(() => walkOptions.onDocument(document)).then(
        () => ({ _tag: "ok" }),
        (error) => ({ _tag: "failure", error })
      );
      if (visitation._tag === "failure") {
        await stopAndDrain(visitation.error);
        throw visitation.error;
      }
    };
    try {
      while (true) {
        if (callerSignal?.aborted) {
          reasons.push("cancelled");
          await stopAndDrain(
            callerSignal.reason ?? new DOMException("Sitemap traversal was cancelled", "AbortError"),
            true
          );
          break;
        }
        fill();
        const next = settled.get(nextCommit);
        if (!next) {
          if (active.size === 0)
            break;
          const completed = await Promise.race(active.values());
          active.delete(completed.sequence);
          settled.set(completed.sequence, completed);
          continue;
        }
        settled.delete(nextCommit);
        scheduled.delete(nextCommit);
        nextCommit++;
        if (next._tag === "thrown") {
          await stopAndDrain(next.error);
          throw next.error;
        }
        const { item, result } = next;
        if (result._tag !== "ok") {
          failures.push({ ...item, result });
          reasons.push("read_failure");
          continue;
        }
        documentsRead++;
        if (result.parse.completeness._tag === "partial")
          reasons.push("document_partial");
        if (result.document._tag === "index") {
          const childUrls = result.document.entries.map((entry) => entry.loc);
          referencesObserved += childUrls.length;
          if (retainEntries)
            references.push(...result.document.entries);
          await visit(item, result);
          if (item.depth >= maxDepth && childUrls.length > 0) {
            reasons.push("depth_limit");
            continue;
          }
          for (const url of childUrls) {
            queue.push({
              url,
              depth: item.depth + 1,
              source: "index_child",
              parentUrl: result.url
            });
          }
          continue;
        }
        const documentUrlCount = result.document.entries.length;
        if (urlsObserved + documentUrlCount > maxUrls) {
          urlsObserved += documentUrlCount;
          reasons.push("url_limit");
          await stopAndDrain(
            new DOMException("Sitemap traversal reached its URL limit", "AbortError"),
            true
          );
          break;
        }
        urlsObserved += documentUrlCount;
        if (retainEntries) {
          for (const entry of result.document.entries) {
            if (seenUrls.has(entry.loc))
              continue;
            seenUrls.add(entry.loc);
            entries.push(entry);
          }
        }
        await visit(item, result);
        if (urlsObserved >= maxUrls && (active.size > 0 || settled.size > 0 || hasQueuedDocument())) {
          reasons.push("url_limit");
          await stopAndDrain(
            new DOMException("Sitemap traversal reached its URL limit", "AbortError"),
            true
          );
          break;
        }
      }
    } finally {
      callerSignal?.removeEventListener("abort", abortFromCaller);
    }
    const retention = retainEntries ? {
      entriesRetained: true,
      entries,
      references
    } : {
      entriesRetained: false,
      entries: [],
      references: []
    };
    const data = {
      ...retention,
      urlsObserved,
      referencesObserved,
      documentsAttempted,
      documentsRead,
      failures,
      frontier: (() => {
        const urls = /* @__PURE__ */ new Set();
        const result = [];
        for (const entry of interrupted) {
          if (urls.has(entry.url))
            continue;
          urls.add(entry.url);
          result.push(entry);
        }
        for (const entry of queue) {
          if (seenDocuments.has(entry.url) || urls.has(entry.url))
            continue;
          urls.add(entry.url);
          result.push(entry);
        }
        return result;
      })()
    };
    const partialReasons = unique(reasons);
    return partialReasons.length > 0 ? { _tag: "partial", reasons: partialReasons, ...data } : { _tag: "complete", ...data };
  }
  return { read, walk };
}

const FETCH_TIMEOUT = 15e3;
const SITEMAP_FALLBACK_ORIGIN = "http://localhost";
const SITEMAP_READER_LIMITS = {
  maxRedirects: 5,
  maxDocuments: 100,
  maxDepth: 3,
  maxUrls: 5e4,
  maxEntries: 5e4,
  maxWireBytes: 50 * 1024 * 1024,
  maxDecodedBytes: 50 * 1024 * 1024
};
const MAX_SITEMAP_CRAWL_ROUNDS = 10;
function getSitemapsFromConfig(event) {
  const runtimeConfig = useRuntimeConfig(event);
  const sitemapConfig = runtimeConfig.sitemap;
  if (!sitemapConfig?.sitemaps)
    return [];
  const sitemaps = [];
  for (const [key, sitemap] of Object.entries(sitemapConfig.sitemaps)) {
    if (key === "index")
      continue;
    if (sitemap._route) {
      sitemaps.push({
        name: sitemap.sitemapName || key,
        route: sitemap._route
      });
    }
  }
  return sitemaps;
}
function normalizeUrl(entry) {
  return {
    loc: entry.loc,
    lastmod: entry.lastmod
  };
}
function parseAbsoluteUrl(input, base) {
  try {
    return { _tag: "ok", value: new URL(input, base) };
  } catch {
    return { _tag: "error", input };
  }
}
function responseBody(response) {
  const data = response._data;
  if (data && typeof data.getReader === "function")
    return data;
  return response.body;
}
async function cancelBody(body, reason) {
  if (!body)
    return;
  await body.cancel(reason).catch((error) => {
    logger.debug(`[sitemap] Failed to cancel response body: ${String(error)}`);
  });
}
async function readBoundedBody(body, maxWireBytes) {
  if (!body)
    return { _tag: "ok", body: new Uint8Array() };
  const reader = body.getReader();
  const chunks = [];
  let bytesRead = 0;
  let reachedEnd = false;
  let exceeded = false;
  try {
    while (!reachedEnd) {
      const next = await reader.read();
      reachedEnd = next.done;
      if (!next.value)
        continue;
      bytesRead += next.value.byteLength;
      if (bytesRead > maxWireBytes) {
        exceeded = true;
        break;
      }
      chunks.push(next.value);
    }
  } finally {
    if (!reachedEnd) {
      await reader.cancel("sitemap wire limit reached").catch((error) => {
        logger.debug(`[sitemap] Failed to cancel bounded response body: ${String(error)}`);
      });
    }
    reader.releaseLock();
  }
  if (exceeded)
    return { _tag: "limit", bytesRead };
  const output = new Uint8Array(bytesRead);
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return { _tag: "ok", body: output };
}
async function fetchLocalRoute(event, route, usePublicAsset, request) {
  const controller = new AbortController();
  let timedOut = false;
  const abortFromRequest = () => controller.abort(request.signal?.reason);
  if (request.signal?.aborted)
    abortFromRequest();
  else
    request.signal?.addEventListener("abort", abortFromRequest, { once: true });
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort(new DOMException("Sitemap fetch timed out", "TimeoutError"));
  }, FETCH_TIMEOUT);
  const fetchPromise = usePublicAsset ? getCfEnv(event).ASSETS.fetch(
    new Request(new URL(route, "https://assets.local"), {
      redirect: "manual",
      signal: controller.signal
    })
  ) : event ? fetchRawWithEvent(event, route, {
    redirect: "manual",
    signal: controller.signal
  }) : globalThis.$fetch.raw(route, {
    responseType: "stream",
    redirect: "manual",
    retry: false,
    ignoreResponseError: true,
    signal: controller.signal
  });
  return fetchPromise.then((response) => ({
    _tag: "ok",
    response
  })).catch((error) => ({
    _tag: "error",
    error,
    timedOut,
    cancelled: Boolean(request.signal?.aborted)
  })).finally(() => {
    clearTimeout(timeout);
    request.signal?.removeEventListener("abort", abortFromRequest);
  });
}
function createLocalSitemapLoader(event, usePublicAsset, loadedBodies) {
  return async (request) => {
    const parsed = parseAbsoluteUrl(request.url);
    if (parsed._tag === "error") {
      return {
        _tag: "load_error",
        url: request.url,
        code: "network",
        detail: `Invalid sitemap URL: ${request.url}`
      };
    }
    const route = `${parsed.value.pathname}${parsed.value.search}`;
    logger.debug(`[sitemap] Fetching ${route} via ${usePublicAsset ? "ASSETS.fetch" : event ? "event.fetch" : "globalThis.$fetch"}`);
    const fetched = await fetchLocalRoute(event, route, usePublicAsset, request);
    if (fetched._tag === "error") {
      return {
        _tag: "load_error",
        url: request.url,
        code: fetched.timedOut ? "timeout" : fetched.cancelled ? "cancelled" : "network",
        detail: fetched.error instanceof Error ? fetched.error.message : String(fetched.error)
      };
    }
    const { response } = fetched;
    const body = responseBody(response);
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      await cancelBody(body, "redirect response handled by sitemap reader");
      if (!location) {
        return {
          _tag: "http_error",
          url: request.url,
          status: response.status,
          statusText: "Redirect response is missing Location"
        };
      }
      return {
        _tag: "redirect",
        url: request.url,
        location,
        status: response.status
      };
    }
    if (response.status === 404 || response.status === 410) {
      await cancelBody(body, "not found response body is unused");
      return { _tag: "not_found", url: request.url, status: response.status };
    }
    if (!response.ok) {
      await cancelBody(body, "error response body is unused");
      return {
        _tag: "http_error",
        url: request.url,
        status: response.status,
        statusText: response.statusText
      };
    }
    const maxWireBytes = request.maxWireBytes ?? SITEMAP_READER_LIMITS.maxWireBytes;
    const read = await readBoundedBody(body, maxWireBytes).then((result) => ({ _tag: "ok", result })).catch((error) => ({ _tag: "error", error }));
    if (read._tag === "error") {
      return {
        _tag: "load_error",
        url: request.url,
        code: "network",
        detail: read.error instanceof Error ? read.error.message : String(read.error)
      };
    }
    if (read.result._tag === "limit") {
      return {
        _tag: "load_error",
        url: request.url,
        code: "wire_limit",
        detail: `Sitemap response exceeds ${maxWireBytes} wire bytes`,
        bytesRead: read.result.bytesRead
      };
    }
    loadedBodies.set(request.url, read.result.body);
    return {
      _tag: "body",
      url: request.url,
      body: read.result.body
    };
  };
}
async function recoverFailedUrlset(body) {
  const entries = [];
  let kind;
  let failureReason;
  for await (const event of parseSitemap(body, {
    maxDecodedBytes: SITEMAP_READER_LIMITS.maxDecodedBytes,
    maxEntries: SITEMAP_READER_LIMITS.maxEntries
  })) {
    if (event._tag === "document")
      kind = event.kind;
    else if (event._tag === "url")
      entries.push(event.entry);
    else if (event._tag === "end" && event.completeness._tag === "failed")
      failureReason = event.completeness.reason;
  }
  if (kind !== "urlset" || !failureReason)
    return { _tag: "none" };
  return { _tag: "failed", entries, reason: failureReason };
}
function formatWalkFailure(failure) {
  if (failure.result._tag === "not_found")
    return `${failure.url}: HTTP ${failure.result.status}`;
  return `${failure.url}: ${failure.result.reason}: ${failure.result.detail}`;
}
function toWalkEntry(failure) {
  if (failure.source === "root") {
    return {
      url: failure.url,
      depth: 0,
      source: "root"
    };
  }
  return {
    url: failure.url,
    depth: failure.depth,
    source: "index_child",
    parentUrl: failure.parentUrl
  };
}
function isRetryableWalkFailure(failure) {
  if (failure.result._tag === "not_found")
    return true;
  if (failure.result.reason === "http")
    return true;
  return failure.result.reason === "load" && (failure.result.code === "network" || failure.result.code === "timeout" || failure.result.code === "cancelled");
}
function createNextFrontier(failures, frontier, seenDocuments) {
  const seenEntries = /* @__PURE__ */ new Set();
  const entries = [
    ...failures.filter(isRetryableWalkFailure).map(toWalkEntry),
    ...frontier
  ];
  return entries.filter((entry) => {
    if (seenDocuments.has(entry.url) || seenEntries.has(entry.url))
      return false;
    seenEntries.add(entry.url);
    return true;
  });
}
function isTerminalPartialReason(reason) {
  return reason === "depth_limit" || reason === "url_limit" || reason === "document_partial";
}
function formatWalkError(result, parseFailures) {
  if (result.failures.length === 1 && parseFailures.length === 1 && result.reasons.length === 1 && result.reasons[0] === "read_failure")
    return `Sitemap parse failed: ${parseFailures[0]}`;
  const failures = result.failures.map(formatWalkFailure);
  const details = failures.length > 0 ? `; ${failures.join("; ")}` : "";
  return `sitemap walk partial (${result.reasons.join(", ")}${details})`;
}
async function crawlSitemapByRoute(event, input) {
  const { route, state = null } = input;
  const previousDocumentsAttempted = state?.documentsAttempted ?? 0;
  const previousUrlsObserved = state?.urlsObserved ?? 0;
  const previousRounds = state?.rounds ?? 0;
  const startedAt = state?.startedAt ?? Date.now();
  const config = useRuntimeConfig(event)["nuxt-ai-ready"];
  const usePublicAsset = config.sitemapPrerendered && hasAssets(event);
  const configuredSiteUrl = createUniversalContext(event).siteUrl ?? SITEMAP_FALLBACK_ORIGIN;
  const siteUrl = parseAbsoluteUrl(configuredSiteUrl);
  if (siteUrl._tag === "error") {
    return {
      _tag: "failed",
      urls: [],
      documentsAttempted: previousDocumentsAttempted,
      urlsObserved: previousUrlsObserved,
      startedAt,
      error: `Invalid site URL: ${configuredSiteUrl}`
    };
  }
  const rootUrl = parseAbsoluteUrl(route, `${siteUrl.value.origin}/`);
  if (rootUrl._tag === "error") {
    return {
      _tag: "failed",
      urls: [],
      documentsAttempted: previousDocumentsAttempted,
      urlsObserved: previousUrlsObserved,
      startedAt,
      error: `Invalid sitemap route: ${route}`
    };
  }
  const remainingUrls = SITEMAP_READER_LIMITS.maxUrls - previousUrlsObserved;
  if (remainingUrls <= 0) {
    return {
      _tag: "failed",
      urls: [],
      documentsAttempted: previousDocumentsAttempted,
      urlsObserved: previousUrlsObserved,
      startedAt,
      error: `sitemap walk partial (url_limit)`
    };
  }
  const loadedBodies = /* @__PURE__ */ new Map();
  const seenDocuments = new Set(state?.seenDocuments ?? []);
  const reader = createSitemapReader({
    limits: SITEMAP_READER_LIMITS,
    loadDocument: createLocalSitemapLoader(event, usePublicAsset, loadedBodies),
    authorizeTarget: (request) => {
      const target = parseAbsoluteUrl(request.url);
      if (target._tag === "error")
        return { _tag: "deny", reason: `Invalid sitemap target: ${request.url}` };
      if (target.value.origin !== siteUrl.value.origin) {
        return {
          _tag: "deny",
          reason: `Sitemap target origin ${target.value.origin} differs from ${siteUrl.value.origin}`
        };
      }
      return { _tag: "allow" };
    }
  });
  const result = await reader.walk(state?.frontier ?? rootUrl.value.toString(), {
    ...SITEMAP_READER_LIMITS,
    maxUrls: remainingUrls,
    seenDocuments: state?.seenDocuments,
    onDocument: (document) => {
      seenDocuments.add(document.requestedUrl);
    }
  });
  const documentsAttempted = previousDocumentsAttempted + result.documentsAttempted;
  const urlsObserved = previousUrlsObserved + result.urlsObserved;
  const entries = [...result.entries];
  const parseFailures = [];
  for (const failure of result.failures) {
    if (failure.result._tag !== "failure" || failure.result.reason !== "document")
      continue;
    const body = loadedBodies.get(failure.result.url);
    if (!body)
      continue;
    const recovered = await recoverFailedUrlset(body);
    if (recovered._tag === "none")
      continue;
    entries.push(...recovered.entries);
    parseFailures.push(recovered.reason);
  }
  const seenUrls = /* @__PURE__ */ new Set();
  const urls = entries.filter((entry) => {
    if (seenUrls.has(entry.loc))
      return false;
    seenUrls.add(entry.loc);
    return true;
  }).slice(0, remainingUrls).map(normalizeUrl);
  logger.debug(`[sitemap] Found ${urls.length} URLs from ${rootUrl.value.pathname}${rootUrl.value.search}`);
  if (result._tag === "complete") {
    return {
      _tag: "complete",
      urls,
      documentsAttempted,
      urlsObserved,
      startedAt
    };
  }
  const error = formatWalkError(result, parseFailures);
  const frontier = createNextFrontier(result.failures, result.frontier, seenDocuments);
  const rounds = previousRounds + 1;
  const canContinue = frontier.length > 0 && rounds < MAX_SITEMAP_CRAWL_ROUNDS && !result.reasons.some(isTerminalPartialReason);
  logger.warn(`[sitemap] ${error}`);
  if (!canContinue) {
    return {
      _tag: "failed",
      urls,
      documentsAttempted,
      urlsObserved,
      startedAt,
      error
    };
  }
  return {
    _tag: "partial",
    urls,
    documentsAttempted,
    urlsObserved,
    startedAt,
    error,
    state: {
      _tag: "continuation",
      frontier,
      seenDocuments: [...seenDocuments],
      documentsAttempted,
      urlsObserved,
      rounds,
      startedAt
    }
  };
}
async function fetchSitemapByRoute(event, route) {
  const result = await crawlSitemapByRoute(event, { route });
  return result._tag === "complete" ? { urls: result.urls } : { urls: result.urls, error: result.error };
}
async function fetchSitemapUrls(event) {
  const sitemaps = getSitemapsFromConfig(event);
  if (sitemaps.length > 0) {
    logger.debug(`[sitemap] Multi-sitemap mode: ${sitemaps.length} sitemaps`);
    const allUrls = [];
    for (const sitemap of sitemaps) {
      const { urls: urls2 } = await fetchSitemapByRoute(event, sitemap.route);
      allUrls.push(...urls2);
    }
    return allUrls;
  }
  logger.debug(`[sitemap] Single sitemap mode: /sitemap.xml`);
  const { urls, error } = await fetchSitemapByRoute(event, "/sitemap.xml");
  if (error) {
    logger.warn("Sitemap not found at /sitemap.xml - ensure @nuxtjs/sitemap is installed and configured");
  } else if (urls.length === 0) {
    logger.warn("Sitemap is empty - add routes to sitemap or configure sitemap.sources in nuxt.config");
  }
  return urls;
}

async function findMarkdownLinkAvailability() {
  {
    return {
      runtimeMarkdownAvailable: true,
      paths: /* @__PURE__ */ new Set()
    };
  }
}
function getGroupPrefix(url, depth) {
  const segments = url.split("/").filter(Boolean);
  if (segments.length === 0)
    return "/";
  if (segments.length === 1)
    return `/${segments[0]}`;
  return `/${segments[0]}/${segments[1]}`;
}
function getPathSegments(pathname) {
  return pathname.split("/").filter((s) => Boolean(s));
}
function analyzePageGroups(pages) {
  const twoSegmentCount = /* @__PURE__ */ new Map();
  const segmentHasNested = /* @__PURE__ */ new Map();
  for (const page of pages) {
    const prefix = getGroupPrefix(page.pathname);
    twoSegmentCount.set(prefix, (twoSegmentCount.get(prefix) || 0) + 1);
    const segments = getPathSegments(page.pathname);
    const firstSegment = segments[0] || "";
    if (!segmentHasNested.has(firstSegment))
      segmentHasNested.set(firstSegment, false);
    if (segments.length > 1)
      segmentHasNested.set(firstSegment, true);
  }
  return { twoSegmentCount, segmentHasNested };
}
function getPageGroupKey(pathname, { twoSegmentCount, segmentHasNested }) {
  const segments = getPathSegments(pathname);
  const firstSegment = segments[0] || "";
  const twoSegPrefix = getGroupPrefix(pathname);
  const twoSegCount = twoSegmentCount.get(twoSegPrefix) || 0;
  let groupKey = twoSegCount > 1 ? twoSegPrefix : `/${firstSegment}`;
  if (segments.length <= 1 && !segmentHasNested.get(firstSegment))
    groupKey = "";
  return groupKey;
}
function sortPagesByPath(pages) {
  const analysis = analyzePageGroups(pages);
  return pages.sort((a, b) => {
    const segmentsA = getPathSegments(a.pathname);
    const segmentsB = getPathSegments(b.pathname);
    const groupKeyA = getPageGroupKey(a.pathname, analysis);
    const groupKeyB = getPageGroupKey(b.pathname, analysis);
    if (groupKeyA === "" && groupKeyB !== "")
      return -1;
    if (groupKeyA !== "" && groupKeyB === "")
      return 1;
    if (groupKeyA !== groupKeyB)
      return groupKeyA.localeCompare(groupKeyB);
    if (segmentsA.length === 0)
      return -1;
    if (segmentsB.length === 0)
      return 1;
    const minLen = Math.min(segmentsA.length, segmentsB.length);
    for (let i = 0; i < minLen; i++) {
      const cmp = segmentsA[i].localeCompare(segmentsB[i]);
      if (cmp !== 0)
        return cmp;
    }
    return segmentsA.length - segmentsB.length;
  });
}
function formatPagesWithGroups(pages) {
  if (pages.length === 0)
    return [];
  const analysis = analyzePageGroups(pages);
  const lines = [];
  let currentGroup = "";
  let segmentGroupIndex = 0;
  let urlsInCurrentGroup = 0;
  for (const page of pages) {
    const groupKey = getPageGroupKey(page.pathname, analysis);
    if (groupKey !== currentGroup) {
      if (urlsInCurrentGroup > 0) {
        const shouldAddBlankLine = segmentGroupIndex === 0 || segmentGroupIndex >= 1 && segmentGroupIndex <= 2 && urlsInCurrentGroup > 1;
        if (shouldAddBlankLine)
          lines.push("");
      }
      currentGroup = groupKey;
      segmentGroupIndex++;
      urlsInCurrentGroup = 0;
    }
    urlsInCurrentGroup++;
    lines.push(formatLlmsTxtPageLink(page));
  }
  return lines;
}
async function buildLlmsTxt(event) {
  const runtimeConfig = useRuntimeConfig(event);
  const aiReadyConfig = runtimeConfig["nuxt-ai-ready"];
  const sitemapConfig = runtimeConfig.sitemap;
  const siteConfig = getSiteConfig(event);
  const llmsTxtConfig = aiReadyConfig.llmsTxt;
  const i18n = aiReadyConfig.i18n;
  const i18nRuntime = i18n ? { _tag: "enabled", config: i18n, ...await import('../_/llms-txt-i18n.mjs') } : { _tag: "disabled" };
  const i18nContext = { host: getRequestHost(event, { xForwardedHost: true }) };
  const baseURL = runtimeConfig.app.baseURL;
  const resolvePath = (path) => withSiteTrailingSlash(event, toDeployedRoute(path, baseURL));
  const resolveUrl = (path) => withSiteUrl(event, toDeployedRoute(path, baseURL), { withBase: true });
  const canonicalSiteUrl = siteConfig.url ? resolveUrl("/") : void 0;
  const parts = [];
  parts.push(`# ${siteConfig.name || canonicalSiteUrl}`);
  if (siteConfig.description) {
    parts.push(`
> ${siteConfig.description}`);
  }
  if (canonicalSiteUrl) {
    parts.push(`
Canonical Origin: ${canonicalSiteUrl}`);
  }
  parts.push("");
  const sections = llmsTxtConfig.sections?.map((section) => ({
    ...section,
    links: section.links ? [...section.links] : void 0
  })) ?? [];
  if (sections[0]?.links) {
    const sitemapRoutes = sitemapConfig?.sitemaps ? Object.values(sitemapConfig.sitemaps).map((s) => s.sitemapName) : ["sitemap.xml"];
    for (const name of sitemapRoutes) {
      sections[0].links.push({
        title: name,
        href: resolveUrl(`/${name}`),
        description: "XML sitemap for search engines and crawlers."
      });
    }
    sections[0].links.push({
      title: "robots.txt",
      href: resolveUrl("/robots.txt"),
      description: "Crawler rules and permissions."
    });
  }
  const normalizedContent = normalizeLlmsTxtConfig({ ...llmsTxtConfig, sections });
  if (normalizedContent) {
    parts.push(normalizedContent);
    parts.push("");
  }
  const urlsPromise = fetchSitemapUrls(event);
  let pages = [];
  let errorPages = [];
  try {
    ;
    [pages, errorPages] = await Promise.all([
      queryPages(event),
      queryPages(event, { where: { hasError: true } })
    ]);
  } catch (err) {
    logger.warn(
      `[ai-ready] Database unavailable for llms.txt, falling back to sitemap-only pages: ${err instanceof Error ? err.message : String(err)}`
    );
  }
  const urls = await urlsPromise;
  const sitemapPaths = urls.map((url) => toLogicalRoute(url.loc, baseURL));
  const sitemapPathSet = new Set(sitemapPaths);
  const seenPaths = /* @__PURE__ */ new Set();
  const errorSet = new Set(errorPages.map((p) => normalizePersistedRoute(p.route, sitemapPathSet, baseURL)));
  const prerendered = [];
  for (const page of pages) {
    const pathname = normalizePersistedRoute(page.route, sitemapPathSet, baseURL);
    if (seenPaths.has(pathname))
      continue;
    seenPaths.add(pathname);
    prerendered.push({ pathname, title: page.title, description: page.description, locale: page.locale });
  }
  const devModeHint = "";
  const other = [];
  for (const pathname of sitemapPaths) {
    if (!seenPaths.has(pathname) && !errorSet.has(pathname)) {
      const locale = i18nRuntime._tag === "enabled" ? i18nRuntime.resolveLocaleFromRoute(pathname, i18nRuntime.config, i18nContext).locale : void 0;
      other.push({ pathname, locale });
      seenPaths.add(pathname);
    }
  }
  let resolvePageHref = resolvePath;
  if (llmsTxtConfig.markdownLinks) {
    const markdownLinkAvailability = await findMarkdownLinkAvailability();
    resolvePageHref = (pathname) => {
      const deployedPathname = resolvePath(pathname);
      const markdownPath = resolvePath(toMarkdownPath(pathname));
      if (markdownLinkAvailability.paths.has(decodePath(markdownPath)) || markdownLinkAvailability.runtimeMarkdownAvailable && hasMarkdownTwin(pathname)) {
        return markdownPath;
      }
      return deployedPathname;
    };
  }
  for (const page of [...prerendered, ...other])
    page.href = resolvePageHref(page.pathname);
  if (i18nRuntime._tag === "enabled") {
    const pageCounts = /* @__PURE__ */ new Map();
    for (const locale of i18nRuntime.config.locales) pageCounts.set(locale.code, 0);
    for (const p of [...prerendered, ...other]) {
      const code = p.locale || i18nRuntime.resolveLocaleFromRoute(p.pathname, i18nRuntime.config, i18nContext).locale;
      pageCounts.set(code, (pageCounts.get(code) ?? 0) + 1);
    }
    parts.push(...i18nRuntime.formatAvailableLanguagesSection(i18nRuntime.config, pageCounts, resolvePageHref, i18nContext));
    parts.push("");
  }
  const isDefaultLocale = (item) => {
    if (i18nRuntime._tag === "disabled")
      return true;
    const code = item.locale || i18nRuntime.resolveLocaleFromRoute(item.pathname, i18nRuntime.config, i18nContext).locale;
    return code === i18nRuntime.config.defaultLocale;
  };
  const filteredPrerendered = i18nRuntime._tag === "enabled" ? prerendered.filter(isDefaultLocale) : prerendered;
  const filteredOther = i18nRuntime._tag === "enabled" ? other.filter(isDefaultLocale) : other;
  const sortedPrerendered = sortPagesByPath(filteredPrerendered);
  const sortedOther = sortPagesByPath(filteredOther);
  if (sortedPrerendered.length > 0 && sortedOther.length > 0) {
    parts.push(`## Prerendered Pages${devModeHint}
`);
    parts.push(...formatPagesWithGroups(sortedPrerendered));
    parts.push("");
    parts.push("## Other Pages\n");
    parts.push(...formatPagesWithGroups(sortedOther));
    parts.push("");
  } else if (sortedPrerendered.length > 0) {
    parts.push(`## Pages${devModeHint}
`);
    parts.push(...formatPagesWithGroups(sortedPrerendered));
    parts.push("");
  } else if (sortedOther.length > 0) {
    parts.push(`## Pages${devModeHint}
`);
    parts.push(...formatPagesWithGroups(sortedOther));
    parts.push("");
  }
  return parts.join("\n");
}

const cachedBuilders = /* @__PURE__ */ new Map();
function getBuildLlmsTxtCached(maxAge) {
  let cached = cachedBuilders.get(maxAge);
  if (!cached) {
    cached = defineCachedFunction(buildLlmsTxt, {
      name: "llms-txt",
      group: "ai-ready",
      maxAge,
      swr: true
    });
    cachedBuilders.set(maxAge, cached);
  }
  return cached;
}
const llms_txt_get = eventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event)["nuxt-ai-ready"];
  const cacheSeconds = runtimeConfig.llmsTxtCacheSeconds;
  const cacheEnabled = cacheSeconds > 0;
  const content = cacheEnabled ? await getBuildLlmsTxtCached(cacheSeconds)(event) : await buildLlmsTxt(event);
  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  if (cacheEnabled) {
    setHeader(event, "Cache-Control", publicCacheControl(cacheSeconds, 3600));
  }
  return content;
});

export { llms_txt_get as default };
//# sourceMappingURL=llms.txt.get.mjs.map
