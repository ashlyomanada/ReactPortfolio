import { az as escapeMarkdownHtml, C as joinURL, aA as parseDocument, aB as isMap, aC as isScalar, aD as stringify, aw as eventHandler, a as assertMethod, l as useRuntimeConfig, a1 as getSiteConfig, ar as withSiteUrl, ap as toDeployedRoute, aE as countPages, s as setHeader, H as setResponseHeader, aF as sendIterable, aG as streamPages, ax as publicCacheControl } from '../nitro/nitro.mjs';
import { n as normalizeLlmsTxtConfig } from '../_/llms-txt-format.mjs';
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

const RE_FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n*/;
const RE_INLINE_WHITESPACE = /\s+/g;
function imageMetadataFence(frontmatter) {
  const document = parseDocument(frontmatter);
  const meta = document.get("meta", true);
  if (document.errors.length || !isMap(meta))
    return;
  const images = {};
  for (const { key, value } of meta.items) {
    if (!isScalar(key) || typeof key.value !== "string" || !isScalar(value))
      continue;
    if (key.value !== "og:image" && !key.value.startsWith("og:image:") && key.value !== "twitter:image" && !key.value.startsWith("twitter:image:"))
      continue;
    if (typeof value.value === "string" || typeof value.value === "number" && Number.isFinite(value.value))
      images[key.value] = value.value;
  }
  if (!Object.keys(images).length)
    return;
  return `\`\`\`yaml
${stringify({ meta: images }, { lineWidth: 0 }).trimEnd()}
\`\`\``;
}
function formatPageForLlmsFullTxt(route, title, description, markdown, siteUrl) {
  const canonicalUrl = siteUrl ? joinURL(siteUrl, route) : route;
  const pageTitle = escapeMarkdownHtml((title && title !== route ? title : route).trim().replace(RE_INLINE_WHITESPACE, " "));
  const pageDescription = escapeMarkdownHtml(description.trim().replace(RE_INLINE_WHITESPACE, " "));
  const content = markdown.replace(RE_FRONTMATTER, "").trim();
  const parts = ["---", "", `- **Page:** ${pageTitle}`, `- **Source:** ${canonicalUrl}`];
  if (pageDescription)
    parts.push(`- **Description:** ${pageDescription}`);
  const frontmatter = markdown.match(RE_FRONTMATTER)?.[1];
  const images = frontmatter && imageMetadataFence(frontmatter);
  if (images)
    parts.push("", images);
  parts.push("");
  if (content) {
    parts.push(content);
    parts.push("");
  }
  return `${parts.join("\n")}
`;
}
function buildLlmsFullTxtHeader(siteInfo, llmsTxtConfig) {
  const parts = [`# ${escapeMarkdownHtml(siteInfo?.name || siteInfo?.url || "Site")}`];
  if (siteInfo?.description)
    parts.push("", `> ${escapeMarkdownHtml(siteInfo.description)}`);
  if (siteInfo?.url)
    parts.push("", `Canonical Origin: ${siteInfo.url}`);
  if (llmsTxtConfig) {
    const normalizedContent = normalizeLlmsTxtConfig(llmsTxtConfig);
    if (normalizedContent)
      parts.push("", normalizedContent);
  }
  return `${parts.join("\n")}

`;
}

const llmsFull_txt_get = eventHandler(async (event) => {
  assertMethod(event, "GET", true);
  const runtimeConfig = useRuntimeConfig(event);
  const config = runtimeConfig["nuxt-ai-ready"];
  const siteConfig = getSiteConfig(event);
  const baseURL = runtimeConfig.app.baseURL;
  const canonicalSiteUrl = siteConfig.url ? withSiteUrl(event, toDeployedRoute("/", baseURL), { withBase: true }) : void 0;
  const header = buildLlmsFullTxtHeader(
    {
      name: siteConfig.name,
      url: canonicalSiteUrl,
      description: siteConfig.description
    },
    config.llmsTxt
  );
  let total = 0;
  try {
    total = await countPages(event);
  } catch (err) {
    setHeader(event, "Content-Type", "text/plain; charset=utf-8");
    return `${header}Database error: ${err.message || String(err)}

Runtime indexing may not be configured correctly for this environment.`;
  }
  if (total === 0) {
    setHeader(event, "Content-Type", "text/plain; charset=utf-8");
    return `${header}No pages indexed. Run \`nuxi generate\` or enable runtime indexing.`;
  }
  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  setResponseHeader(event, "Cache-Control", publicCacheControl(3600, 86400));
  const siteUrl = siteConfig.url;
  async function* generateContent() {
    yield header;
    for await (const page of streamPages(event)) {
      yield formatPageForLlmsFullTxt(page.route, page.title, page.description, page.markdown, siteUrl);
    }
  }
  return sendIterable(event, generateContent());
});

export { llmsFull_txt_get as default };
//# sourceMappingURL=llms-full.txt.get.mjs.map
