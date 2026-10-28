import { ae as collectSitemap, l as useRuntimeConfig, af as staticSitemapConfig, ag as logger, ah as hasAssets, ai as createUniversalContext, aj as parseSitemap, ak as getCfEnv, a1 as getSiteConfig, ab as getRequestHost, al as toLogicalRoute, am as getRequestURL, an as queryPages, ao as queryPageMetadata, ap as toDeployedRoute, aq as normalizePersistedRoute, ar as withSiteUrl, as as toMarkdownPath, at as decodePath, au as hasMarkdownTwin, av as withSiteTrailingSlash, aw as eventHandler, a as assertMethod, c as createError, s as setHeader, ax as publicCacheControl, ay as defineCachedFunction } from '../nitro/nitro.mjs';
import { f as formatLlmsTxtPageLink, n as normalizeLlmsTxtConfig } from './llms-txt-format.mjs';
import { fetchRawWithEvent } from './fetch.mjs';
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

function llmsTxtSectionPath(section) {
  const name = Array.isArray(section.sitemap) ? section.sitemap[0] : section.sitemap;
  return section.path || `/llms/${name}.txt`;
}
function createLlmsTxtFiles(input) {
  const files = /* @__PURE__ */ new Map();
  const maxLength = input.config.maxLength ?? 8e4;
  const link = (title, path, description) => formatLlmsTxtPageLink({ pathname: path, href: input.resolveUrl(path), title, description });
  const render = (header, title, lines) => `${header.trim()}

## ${title.replace(/\s+/g, " ").trim()}

${lines.join("\n")}
`;
  function tree(path, prefix, header, title, lines, level = 0) {
    const body = render(header, title, lines);
    if (body.length <= maxLength) {
      files.set(path, body);
      return;
    }
    const overhead = render(header, title, []).length;
    const chunks = [];
    let chunk = [];
    let length = overhead;
    for (const line of lines) {
      if (overhead + line.length + 1 > maxLength)
        throw new Error("An llms.txt entry exceeds llmsTxt.maxLength. Shorten the entry or increase the limit.");
      if (length + line.length + 1 > maxLength) {
        chunks.push(chunk);
        chunk = [];
        length = overhead;
      }
      chunk.push(line);
      length += line.length + 1;
    }
    if (chunk.length)
      chunks.push(chunk);
    const links = chunks.map((entries, index) => {
      const child = `/llms/_${prefix}-${level}-${index + 1}.txt`;
      files.set(child, render(header, title, entries));
      return link(`${title} ${index + 1}`, child);
    });
    if (chunks.length >= lines.length && render(header, title, links).length >= body.length)
      throw new Error("llmsTxt.maxLength cannot fit an index. Increase the limit.");
    tree(path, prefix, header, title, links, level + 1);
  }
  const sections = [];
  const assigned = /* @__PURE__ */ new Set();
  for (const [index, section] of input.sections.entries()) {
    if (!section.sitemap) {
      sections.push(section);
      continue;
    }
    const names = Array.isArray(section.sitemap) ? section.sitemap : [section.sitemap];
    const pages2 = /* @__PURE__ */ new Map();
    for (const name of names) {
      for (const page of input.sitemapPages.get(name) || []) {
        if (!assigned.has(page.pathname))
          pages2.set(page.pathname, page);
      }
    }
    const entries = [...(section.links || []).map((entry) => formatLlmsTxtPageLink({ pathname: entry.href, ...entry })), ...[...pages2.values()].map(formatLlmsTxtPageLink)];
    if (!entries.length)
      continue;
    for (const pathname of pages2.keys())
      assigned.add(pathname);
    const path = llmsTxtSectionPath(section);
    const description = Array.isArray(section.description) ? section.description.join(" ") : section.description;
    const preamble = normalizeLlmsTxtConfig({ notes: description });
    tree(path, `section-${index + 1}`, `${input.header.trim()}

${preamble}

${link("llms.txt", "/llms.txt")}`, section.title, entries);
    sections.push({ ...section, sitemap: void 0, path: void 0, links: [{ title: section.title, href: input.resolveUrl(path), description }] });
  }
  const rootPreamble = `${input.header.trim()}

${normalizeLlmsTxtConfig({ notes: input.config.notes })}${input.rootContent ? `

${input.rootContent}` : ""}`;
  const pageIndexSpace = input.pages.some((page) => !assigned.has(page.pathname)) ? render("", "Pages", [link("Pages", "/llms/_pages.txt")]).length : 1;
  let rootHeader = `${input.header.trim()}

${normalizeLlmsTxtConfig({ ...input.config, sections })}${input.rootContent ? `

${input.rootContent}` : ""}`;
  if (rootHeader.length + pageIndexSpace > maxLength) {
    const references = sections.flatMap((section, index) => {
      const path = `/llms/_configured-${index + 1}.txt`;
      if (!section.links?.length) {
        const context = normalizeLlmsTxtConfig({ sections: [section] });
        if (!context)
          return [];
        const body = `${input.header.trim()}

${context}

${link("llms.txt", "/llms.txt")}
`;
        if (body.length > maxLength)
          throw new Error("An llms.txt entry exceeds llmsTxt.maxLength. Shorten the entry or increase the limit.");
        files.set(path, body);
        return [{ title: section.title, links: [{ title: section.title, href: input.resolveUrl(path) }] }];
      }
      const text = normalizeLlmsTxtConfig({ sections: [{ ...section, description: section.optional ? section.description : void 0 }] });
      const lines = text.split("\n").slice(2);
      const description = Array.isArray(section.description) ? section.description.join(" ") : section.description;
      const preamble = section.optional ? "" : normalizeLlmsTxtConfig({ notes: description });
      tree(path, `configured-${index + 1}`, `${input.header.trim()}

${preamble}

${link("llms.txt", "/llms.txt")}`, section.optional ? "Optional" : section.title, lines);
      return [{ title: section.title, optional: section.optional, links: [{ title: section.title, href: input.resolveUrl(path), description }] }];
    });
    rootHeader = `${rootPreamble}

${normalizeLlmsTxtConfig({ sections: references })}`;
    if (rootHeader.length + pageIndexSpace > maxLength) {
      const indexes = [];
      for (const optional of [false, true]) {
        const selected = references.filter((section) => Boolean(section.optional) === optional);
        if (!selected.length)
          continue;
        const title = optional ? "Optional" : "Sections";
        const path = optional ? "/llms/_optional.txt" : "/llms/_sections.txt";
        const text = normalizeLlmsTxtConfig({ sections: selected.map((section) => ({ ...section, optional: true })) });
        tree(path, optional ? "optional" : "sections", input.header, title, text.split("\n").slice(2));
        indexes.push({ title, optional, links: [{ title, href: input.resolveUrl(path) }] });
      }
      rootHeader = `${rootPreamble}

${normalizeLlmsTxtConfig({ sections: indexes })}`;
    }
  }
  const pages = input.pages.filter((page) => !assigned.has(page.pathname)).map(formatLlmsTxtPageLink);
  if (!pages.length && rootHeader.length + 1 <= maxLength) {
    files.set("/llms.txt", `${rootHeader.trim()}
`);
  } else {
    const inline = render(rootHeader, "Pages", pages);
    if (inline.length <= maxLength) {
      files.set("/llms.txt", inline);
    } else {
      tree("/llms/_pages.txt", "pages", input.header, "Pages", pages);
      const root = `${rootHeader.trim()}

## Pages

${link("Pages", "/llms/_pages.txt")}
`;
      if (root.length > maxLength)
        throw new Error("llms.txt sections exceed llmsTxt.maxLength. Shorten the sections or increase the limit.");
      files.set("/llms.txt", root);
    }
  }
  return files;
}

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

const INDEXED_LASTMOD_MARKER = "<!-- nuxt-ai-ready:indexed-lastmod -->";
function stripIndexedSitemapLastmods(body) {
  let xml;
  try {
    xml = new TextDecoder("utf-8", { fatal: true }).decode(body);
  } catch {
    return body;
  }
  if (!xml.includes(INDEXED_LASTMOD_MARKER))
    return body;
  return new TextEncoder().encode(xml.replace(/<!-- nuxt-ai-ready:indexed-lastmod -->\s*<lastmod>[^<]*<\/lastmod>/g, ""));
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
  const sitemapConfig = { ...staticSitemapConfig, ...runtimeConfig.sitemap };
  if (!sitemapConfig?.sitemaps)
    return [];
  const sitemaps = [];
  for (const [key, sitemap] of Object.entries(sitemapConfig.sitemaps)) {
    if (key === "index")
      continue;
    const route = sitemap._route || sitemap.route || (key === "chunks" ? sitemapConfig.sitemaps.index?._route || sitemapConfig.sitemaps.index?.route : void 0);
    if (route) {
      sitemaps.push({
        name: (sitemap.sitemapName || key).replace(/\.xml$/, ""),
        route: route.startsWith("/") ? route : `/${route}`
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
    const sourceBody = stripIndexedSitemapLastmods(read.result.body);
    loadedBodies.set(request.url, sourceBody);
    return {
      _tag: "body",
      url: request.url,
      body: sourceBody
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
  const requestOrigin = void 0;
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
      if (target.value.origin !== siteUrl.value.origin && target.value.origin !== requestOrigin) {
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
async function fetchSitemapUrlGroups(event, names) {
  const sitemaps = getSitemapsFromConfig(event);
  const groups = /* @__PURE__ */ new Map();
  if (sitemaps.length > 0) {
    logger.debug(`[sitemap] Multi-sitemap mode: ${sitemaps.length} sitemaps`);
    for (const sitemap of sitemaps) {
      if (names !== void 0 && !names.includes(sitemap.name))
        continue;
      const { urls: urls2 } = await fetchSitemapByRoute(event, sitemap.route);
      groups.set(sitemap.name, [...groups.get(sitemap.name) || [], ...urls2]);
    }
    return groups;
  }
  if (names !== void 0 && !names.includes("sitemap"))
    return groups;
  logger.debug(`[sitemap] Single sitemap mode: /sitemap.xml`);
  const { urls, error } = await fetchSitemapByRoute(event, "/sitemap.xml");
  if (error) {
    logger.warn("Sitemap not found at /sitemap.xml - ensure @nuxtjs/sitemap is installed and configured");
  } else if (urls.length === 0) {
    logger.warn("Sitemap is empty - add routes to sitemap or configure sitemap.sources in nuxt.config");
  }
  groups.set("sitemap", urls);
  return groups;
}

async function findMarkdownLinkAvailability() {
  return { runtimeMarkdownAvailable: true, paths: /* @__PURE__ */ new Set() };
}
async function buildLlmsTxtFiles(event) {
  const runtimeConfig = useRuntimeConfig(event);
  const aiReadyConfig = runtimeConfig["nuxt-ai-ready"];
  const siteConfig = getSiteConfig(event);
  const config = aiReadyConfig.llmsTxt;
  const baseURL = runtimeConfig.app.baseURL;
  const resolveUrl = (path) => withSiteUrl(event, toDeployedRoute(path, baseURL), { withBase: true });
  const resolvePageUrl = (path) => resolveUrl(withSiteTrailingSlash(event, path));
  const canonicalSiteUrl = siteConfig.url ? resolveUrl("/") : void 0;
  const i18n = aiReadyConfig.i18n;
  const i18nRuntime = i18n ? { _tag: "enabled", config: i18n, ...await import('./llms-txt-i18n.mjs') } : { _tag: "disabled" };
  const i18nContext = { host: getRequestHost(event, { xForwardedHost: true }) };
  const parts = [`# ${(siteConfig.name || canonicalSiteUrl || "Site").replace(/\s+/g, " ").trim()}`];
  if (siteConfig.description)
    parts.push("", `> ${siteConfig.description.replace(/\s+/g, " ").trim()}`);
  if (canonicalSiteUrl)
    parts.push("", `Canonical Origin: ${canonicalSiteUrl}`);
  const sections = config.sections?.map((section) => ({ ...section, links: section.links ? [...section.links] : void 0 })) ?? [];
  const resources = sections.find((section) => section.title === "LLM Resources" && !section.sitemap);
  if (resources) {
    resources.links ||= [];
    for (const sitemap of getSitemapsFromConfig(event).filter((sitemap2) => config.sitemaps === void 0 || config.sitemaps.includes(sitemap2.name))) {
      resources.links.push({ title: sitemap.route.split("/").pop() || `${sitemap.name}.xml`, href: resolveUrl(toLogicalRoute(sitemap.route, baseURL)), description: "XML sitemap for search engines and crawlers." });
    }
    if (!getSitemapsFromConfig(event).length && (config.sitemaps === void 0 || config.sitemaps.includes("sitemap")))
      resources.links.push({ title: "sitemap.xml", href: resolveUrl("/sitemap.xml"), description: "XML sitemap for search engines and crawlers." });
    resources.links.push({ title: "robots.txt", href: resolveUrl("/robots.txt"), description: "Crawler rules and permissions." });
  }
  if (config.pages === false && !sections.some((section) => section.sitemap))
    return Object.fromEntries(createLlmsTxtFiles({ header: parts.join("\n"), config, sections, pages: [], sitemapPages: /* @__PURE__ */ new Map(), resolveUrl }));
  const groups = await fetchSitemapUrlGroups(event, config.sitemaps);
  const allowedOrigin = canonicalSiteUrl ? new URL(canonicalSiteUrl).origin : void 0;
  const requestOrigin = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true }).origin;
  const sitemapPaths = /* @__PURE__ */ new Map();
  for (const [name, urls] of groups) {
    const paths = /* @__PURE__ */ new Set();
    for (const entry of urls) {
      const url = URL.canParse(entry.loc, canonicalSiteUrl || "http://localhost") ? new URL(entry.loc, canonicalSiteUrl || "http://localhost") : void 0;
      if (!url || url.search || url.hash || allowedOrigin && url.origin !== allowedOrigin && url.origin !== requestOrigin)
        continue;
      const path = toLogicalRoute(url.pathname, baseURL);
      paths.add(path);
    }
    sitemapPaths.set(name, paths);
  }
  const admitted = new Set([...sitemapPaths.values()].flatMap((paths) => [...paths]));
  let stored = [];
  if (aiReadyConfig.database?._tag !== "Disabled") {
    const read = config.pages === "all" ? Promise.all([queryPages(event), queryPages(event, { where: { hasError: true } })]).then((results) => results.flat()) : queryPageMetadata(event, [...admitted].flatMap((path) => [path, toDeployedRoute(path, baseURL)]));
    stored = await read.catch((error) => {
      logger.warn(`[ai-ready] Database unavailable for llms.txt. Using sitemap metadata: ${error instanceof Error ? error.message : String(error)}`);
      return [];
    });
  }
  const errorPaths = new Set(stored.filter((page) => page.isError).map((page) => normalizePersistedRoute(page.route, admitted, baseURL)));
  const metadata = new Map(stored.map((page) => [normalizePersistedRoute(page.route, admitted, baseURL), page]));
  const availability = config.markdownLinks ? await findMarkdownLinkAvailability() : void 0;
  const href = (path) => {
    const markdownPath = toMarkdownPath(path);
    if (availability && (availability.paths.has(decodePath(toDeployedRoute(markdownPath, baseURL))) || availability.runtimeMarkdownAvailable && hasMarkdownTwin(path)))
      return resolveUrl(markdownPath);
    return resolvePageUrl(path);
  };
  const pageMap = /* @__PURE__ */ new Map();
  const candidates = config.pages === "all" ? /* @__PURE__ */ new Set([...admitted, ...metadata.keys()]) : admitted;
  for (const pathname of [...candidates].sort()) {
    if (errorPaths.has(pathname))
      continue;
    const page = metadata.get(pathname);
    const locale = page?.locale || (i18nRuntime._tag === "enabled" ? i18nRuntime.resolveLocaleFromRoute(pathname, i18nRuntime.config, i18nContext).locale : void 0);
    pageMap.set(pathname, { pathname, href: href(pathname), title: page?.title, description: page?.description, locale });
  }
  let rootContent;
  if (i18nRuntime._tag === "enabled") {
    const counts = /* @__PURE__ */ new Map();
    for (const page of pageMap.values())
      counts.set(page.locale, (counts.get(page.locale) || 0) + 1);
    rootContent = i18nRuntime.formatAvailableLanguagesSection(i18nRuntime.config, counts, href, i18nContext).join("\n");
    for (const [path, page] of pageMap) {
      if (page.locale !== i18nRuntime.config.defaultLocale)
        pageMap.delete(path);
    }
  }
  const sitemapPages = new Map([...sitemapPaths].map(([name, paths]) => [name, [...paths].flatMap((path) => pageMap.has(path) ? [pageMap.get(path)] : [])]));
  return Object.fromEntries(createLlmsTxtFiles({ header: parts.join("\n"), config, sections, rootContent, pages: config.pages === false ? [] : [...pageMap.values()], sitemapPages, resolveUrl }));
}

const cachedBuilders = /* @__PURE__ */ new Map();
function getBuildLlmsTxtCached(maxAge) {
  let cached = cachedBuilders.get(maxAge);
  if (!cached) {
    cached = defineCachedFunction(buildLlmsTxtFiles, {
      name: "llms-txt-files",
      group: "ai-ready",
      maxAge,
      swr: true,
      // Share one discovery snapshot between root and child files, separated by origin.
      getKey: (event) => getRequestURL(event, { xForwardedHost: true, xForwardedProto: true }).origin
    });
    cachedBuilders.set(maxAge, cached);
  }
  return cached;
}
const llms_txt_get = eventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const path = toLogicalRoute(event.path.split("?")[0], runtimeConfig.app.baseURL);
  if (path !== "/llms.txt" && !/^\/llms\/[^/]+\.txt$/i.test(path))
    return;
  assertMethod(event, "GET", true);
  const config = runtimeConfig["nuxt-ai-ready"];
  const cacheSeconds = config.llmsTxtCacheSeconds;
  const cacheEnabled = cacheSeconds > 0;
  const files = cacheEnabled ? await getBuildLlmsTxtCached(cacheSeconds)(event) : await buildLlmsTxtFiles(event);
  const content = files[path];
  if (content === void 0)
    throw createError({ statusCode: 404, statusMessage: "llms.txt file not found" });
  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  if (cacheEnabled)
    setHeader(event, "Cache-Control", publicCacheControl(cacheSeconds, 3600));
  return content;
});

export { llms_txt_get as default };
//# sourceMappingURL=llms.txt.get.mjs.map
