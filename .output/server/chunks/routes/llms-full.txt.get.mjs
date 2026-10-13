import { C as joinURL, at as eventHandler, l as useRuntimeConfig, a1 as getSiteConfig, an as withSiteUrl, ao as toDeployedRoute, aw as countPages, s as setHeader, H as setResponseHeader, ax as sendIterable, ay as streamPages, av as publicCacheControl } from '../nitro/nitro.mjs';
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

const RE_FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n*/;
const RE_INLINE_WHITESPACE = /\s+/g;
function formatPageForLlmsFullTxt(route, title, description, markdown, siteUrl) {
  const canonicalUrl = siteUrl ? joinURL(siteUrl, route) : route;
  const pageTitle = (title && title !== route ? title : route).trim().replace(RE_INLINE_WHITESPACE, " ");
  const pageDescription = description.trim().replace(RE_INLINE_WHITESPACE, " ");
  const content = markdown.replace(RE_FRONTMATTER, "").trim();
  const parts = ["---", "", `- **Page:** ${pageTitle}`, `- **Source:** ${canonicalUrl}`];
  if (pageDescription)
    parts.push(`- **Description:** ${pageDescription}`);
  parts.push("");
  if (content) {
    parts.push(content);
    parts.push("");
  }
  return `${parts.join("\n")}
`;
}
function buildLlmsFullTxtHeader(siteInfo, llmsTxtConfig) {
  const parts = [`# ${siteInfo?.name || siteInfo?.url || "Site"}`];
  if (siteInfo?.description)
    parts.push("", `> ${siteInfo.description}`);
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
