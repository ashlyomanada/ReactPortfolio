import { az as escapeMarkdownHtml } from '../nitro/nitro.mjs';

const RE_INLINE_WHITESPACE = /\s+/g;
const RE_LINK_TITLE_BRACKET = /[[\]]/g;
const RE_LINK_HREF_UNSAFE = /[\s()]/g;
const RE_PREAMBLE_ATX_HEADING = /^( {0,3})(#{1,6})(?=\s)/gm;
function normalizeInlineText(value) {
  return value.trim().replace(RE_INLINE_WHITESPACE, " ");
}
function normalizeLinkTitle(value) {
  return escapeMarkdownHtml(normalizeInlineText(value)).replace(RE_LINK_TITLE_BRACKET, (bracket) => bracket === "[" ? "&#91;" : "&#93;");
}
function normalizeLinkHref(value) {
  return value.trim().replace(RE_LINK_HREF_UNSAFE, (character) => {
    if (character === "(")
      return "%28";
    if (character === ")")
      return "%29";
    return encodeURIComponent(character);
  });
}
function normalizeDescriptions(value) {
  return (Array.isArray(value) ? value : value ? [value] : []).filter((description) => description.trim()).map(normalizeInlineText);
}
function normalizePreambleBlocks(value) {
  return (Array.isArray(value) ? value : value ? [value] : []).filter((block) => block.trim()).map((block) => block.trim().replace(RE_PREAMBLE_ATX_HEADING, "$1\\$2"));
}
function normalizeLink(link, descriptionPrefixes = []) {
  const descriptions = [...descriptionPrefixes, link.description].filter((value) => Boolean(value?.trim())).map(normalizeInlineText);
  const description = descriptions.join("; ");
  return `- [${normalizeLinkTitle(link.title)}](${normalizeLinkHref(link.href)})${description ? `: ${description}` : ""}`;
}
function normalizeSection(section) {
  const parts = [`## ${escapeMarkdownHtml(normalizeInlineText(section.title))}`];
  if (section.links?.length)
    parts.push("", ...section.links.map((link) => normalizeLink(link)));
  return parts.join("\n");
}
function normalizePreamble(config) {
  const parts = [];
  if (config.notes) {
    const notes = normalizePreambleBlocks(config.notes);
    if (notes.length)
      parts.push(["**Notes:**", ...notes].join("\n\n"));
  }
  for (const section of config.sections?.filter((section2) => !section2.optional) ?? []) {
    if (!section.description)
      continue;
    const descriptions = normalizePreambleBlocks(section.description);
    if (descriptions.length)
      parts.push([`**${escapeMarkdownHtml(normalizeInlineText(section.title))}:**`, ...descriptions].join("\n\n"));
  }
  return parts;
}
function normalizeOptionalSections(sections) {
  const links = sections.flatMap(
    (section) => section.links?.map((link) => normalizeLink(link, [section.title, ...normalizeDescriptions(section.description)])) ?? []
  );
  if (!links.length)
    return void 0;
  return ["## Optional", "", ...links].join("\n");
}
function normalizeRequiredSections(sections) {
  return sections.filter((section) => section.links?.length).map(normalizeSection);
}
function formatLlmsTxtPageLink(page) {
  const description = page.description?.trim().replace(RE_INLINE_WHITESPACE, " ");
  const normalizedTitle = page.title ? normalizeInlineText(page.title) : "";
  const title = normalizedTitle && normalizedTitle !== page.pathname ? normalizedTitle : page.pathname;
  const href = (page.href || page.pathname).trim();
  const truncatedDescription = description ? `${description.substring(0, 160)}${description.length > 160 ? "..." : ""}` : void 0;
  return normalizeLink({ title, href, description: truncatedDescription ? escapeMarkdownHtml(truncatedDescription) : void 0 });
}
function normalizeLlmsTxtConfig(config) {
  const required = config.sections?.filter((section) => !section.optional) ?? [];
  const optional = config.sections?.filter((section) => section.optional) ?? [];
  const parts = [
    ...normalizePreamble(config),
    ...normalizeRequiredSections(required)
  ];
  const optionalSection = normalizeOptionalSections(optional);
  if (optionalSection)
    parts.push(optionalSection);
  return parts.join("\n\n");
}

export { formatLlmsTxtPageLink as f, normalizeLlmsTxtConfig as n };
//# sourceMappingURL=llms-txt-format.mjs.map
