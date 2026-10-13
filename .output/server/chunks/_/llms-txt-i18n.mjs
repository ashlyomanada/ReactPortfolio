import { aE as unavailable, aF as resolveLocaleAlternateUrl } from '../nitro/nitro.mjs';
import { f as formatLlmsTxtPageLink } from './llms-txt-format.mjs';
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

function formatAvailableLanguagesSection(i18n, pageCounts, resolveHref = (pathname) => pathname, routeContext = {}) {
  const lines = ["## Available Languages on Website", ""];
  const rootAlternates = new Map(unavailable().map((alternate) => [alternate.code, alternate]));
  for (const locale of i18n.locales) {
    const isDefault = locale.code === i18n.defaultLocale;
    const alternate = rootAlternates.get(locale.code);
    const prefix = alternate?.path ?? unavailable("/", locale.code);
    const resolvedPath = resolveHref(prefix);
    const href = alternate ? resolveLocaleAlternateUrl({ ...alternate, path: resolvedPath }, (candidate) => candidate) : resolvedPath;
    const count = pageCounts.get(locale.code) ?? 0;
    const display = locale.nativeName ? `${locale.nativeName} (${locale.code})` : locale.name ? `${locale.name} (${locale.code})` : locale.code;
    const suffix = isDefault ? "content included below" : "visit this language for content";
    lines.push(formatLlmsTxtPageLink({
      pathname: href,
      title: display,
      href,
      description: `${count} pages; ${suffix}.`
    }));
  }
  return lines;
}

export { formatAvailableLanguagesSection, unavailable as resolveLocaleFromRoute };
//# sourceMappingURL=llms-txt-i18n.mjs.map
