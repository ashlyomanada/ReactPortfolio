import { aA as queryCollection, aB as manifest } from '../nitro/nitro.mjs';
import { stringify } from 'minimark/stringify';
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

const pageCollections = Object.entries(manifest)
  .filter(([, info]) => info.type === 'page')
  .map(([name]) => name);

async function lookupContentPage(event, path) {
  if (!pageCollections.length) return null
  const candidates = path === '/' ? ['/'] : [path, path.replace(/\/$/, '')];
  for (const collection of pageCollections) {
    for (const candidate of candidates) {
      const page = await queryCollection(event, collection).path(candidate).first().catch(() => null);
      if (!page) continue
      const markdown = stringify({ ...page.body, type: 'minimark' }, { format: 'markdown/html' });
      return {
        markdown,
        title: page.title,
        description: page.description,
        updatedAt: page.seo?.articleModifiedTime || page.updatedAt,
      }
    }
  }
  return null
}

async function tryGetContentMarkdown(event, path) {
  return lookupContentPage(event, path);
}

export { tryGetContentMarkdown };
//# sourceMappingURL=content.mjs.map
