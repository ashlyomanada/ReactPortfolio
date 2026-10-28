import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { createHead as createHead$1 } from 'unhead/server';
import { isRef, toValue as toValue$1 } from 'vue';
import { DeprecationsPlugin } from 'unhead/legacy';
import { PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'unhead/plugins';
import { htmlToMarkdown } from 'mdream';
import * as process$1 from 'process';
import * as require$$0$1$1 from 'buffer';
import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promises, existsSync, mkdirSync } from 'node:fs';
import { resolve as resolve$2, dirname as dirname$1, join } from 'node:path';
import { LRUCache } from 'lru-cache';
import { createHash } from 'node:crypto';
import { AsyncLocalStorage } from 'node:async_hooks';
import { negotiateContent, parseAcceptHeader } from '@mdream/js/negotiate';
import { createConsola, consola } from 'consola';
import { fileURLToPath } from 'node:url';
import { getIcons } from '@iconify/utils';
import { XMLValidator, XMLParser } from 'fast-xml-parser';
import { ipxFSStorage, ipxHttpStorage, createIPX, createIPXNodeHandler, parseIPXURL } from 'ipx';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE$1 = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE$1 = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE$1 = /%252f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE$1, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE$1, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE$1, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE$1, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function encodeParam(text) {
  return encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE$1 = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE$1.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    const nextChar = input[_base.length];
    if (!nextChar || nextChar === "/" || nextChar === "?") {
      return input;
    }
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const nextChar = input[_base.length];
  if (nextChar && nextChar !== "/" && nextChar !== "?") {
    return input;
  }
  const trimmed = input.slice(_base.length).replace(/^\/+/, "");
  return "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$2(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}
function withHttps(input) {
  return withProtocol(input, "https://");
}
function withProtocol(input, protocol) {
  let match = input.match(PROTOCOL_REGEX);
  if (!match) {
    match = input.match(/^\/{2,}/);
  }
  if (!match) {
    return protocol + input;
  }
  return protocol + input.slice(match[0].length);
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = { ...defaults };
  for (const key of Object.keys(baseObject)) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function o(n){throw new Error(`${n} is not implemented yet!`)}let i$1 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o("Readable.asyncIterator")}iterator(e){throw o("Readable.iterator")}map(e,t){throw o("Readable.map")}filter(e,t){throw o("Readable.filter")}forEach(e,t){throw o("Readable.forEach")}reduce(e,t,r){throw o("Readable.reduce")}find(e,t){throw o("Readable.find")}findIndex(e,t){throw o("Readable.findIndex")}some(e,t){throw o("Readable.some")}toArray(e){throw o("Readable.toArray")}every(e,t){throw o("Readable.every")}flatMap(e,t){throw o("Readable.flatMap")}drop(e,t){throw o("Readable.drop")}take(e,t){throw o("Readable.take")}asIndexedPairs(e){throw o("Readable.asIndexedPairs")}};let l$1 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;writableAborted=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),s&&s(),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return Promise.resolve()}};const c=class{allowHalfOpen=true;_destroy;constructor(e=new i$1,t=new l$1){Object.assign(this,e),Object.assign(this,t),this._destroy=m(e._destroy,t._destroy);}};function _(){return Object.assign(c.prototype,i$1.prototype),Object.assign(c.prototype,l$1.prototype),c}function m(...n){return function(...e){for(const t of n)t(...e);}}const g=_();class A extends g{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}}class y extends i$1{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}}function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$1{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R(n={}){const e=new E,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function v(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const S=new Set([101,204,205,304]);async function b(n,e){const t=new y,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(S.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function C(n,e,t={}){try{const r=await b(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:v(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$2(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$2(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery$1(event) {
  return getQuery$2(event.path || "");
}
function getRouterParams(event, opts = {}) {
  let params = event.context.params || {};
  if (opts.decode) {
    params = { ...params };
    for (const key in params) {
      params[key] = decode(params[key]);
    }
  }
  return params;
}
function getRouterParam(event, name, opts = {}) {
  const params = getRouterParams(event, opts);
  return params[name];
}
function isMethod(event, expected, allowHead) {
  if (allowHead && event.method === "HEAD") {
    return true;
  }
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected, allowHead)) {
    throw createError$2({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
const getHeaders = getRequestHeaders;
function getRequestHeader$1(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
const getHeader = getRequestHeader$1;
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const _header = event.node.req.headers["x-forwarded-host"];
    const xForwardedHost = (_header || "").split(",").shift()?.trim();
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}
function getRequestIP(event, opts = {}) {
  if (event.context.clientAddress) {
    return event.context.clientAddress;
  }
  if (opts.xForwardedFor) {
    const xForwardedFor = getRequestHeader$1(event, "x-forwarded-for")?.split(",").shift()?.trim();
    if (xForwardedFor) {
      return xForwardedFor;
    }
  }
  if (event.node.req.socket.remoteAddress) {
    return event.node.req.socket.remoteAddress;
  }
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !/\bchunked\b/i.test(
    String(event.node.req.headers["transfer-encoding"] ?? "")
  )) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$2({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

function serializeIterableValue(value) {
  switch (typeof value) {
    case "string": {
      return value;
    }
    case "boolean":
    case "number":
    case "bigint":
    case "symbol": {
      return value.toString();
    }
    case "function":
    case "undefined": {
      return void 0;
    }
    case "object": {
      if (value instanceof Uint8Array) {
        return value;
      }
      return JSON.stringify(value);
    }
  }
}
function coerceIterable(iterable) {
  if (typeof iterable === "function") {
    iterable = iterable();
  }
  if (Symbol.iterator in iterable) {
    return iterable[Symbol.iterator]();
  }
  if (Symbol.asyncIterator in iterable) {
    return iterable[Symbol.asyncIterator]();
  }
  return iterable;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect$1(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeaders(event) {
  return event.node.res.getHeaders();
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
const setHeader = setResponseHeader;
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
const appendHeader = appendResponseHeader;
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
const noop = () => {
};
function writeEarlyHints(event, hints, cb = noop) {
  if (!event.node.res.socket) {
    cb();
    return;
  }
  if (typeof hints === "string" || Array.isArray(hints)) {
    hints = { link: hints };
  }
  if (hints.link) {
    hints.link = Array.isArray(hints.link) ? hints.link : hints.link.split(",");
  }
  const headers = Object.entries(hints).map(
    (e) => [e[0].toLowerCase(), e[1]]
  );
  if (headers.length === 0) {
    cb();
    return;
  }
  let hint = "HTTP/1.1 103 Early Hints";
  if (hints.link) {
    hint += `\r
Link: ${hints.link.join(", ")}`;
  }
  for (const [header, value] of headers) {
    if (header === "link") {
      continue;
    }
    hint += `\r
${header}: ${value}`;
  }
  if (event.node.res.socket) {
    event.node.res.socket.write(
      `${hint}\r
\r
`,
      "utf8",
      cb
    );
  } else {
    cb();
  }
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}
function sendIterable(event, iterable, options) {
  const serializer = serializeIterableValue;
  const iterator = coerceIterable(iterable);
  return sendStream(
    event,
    new ReadableStream({
      async pull(controller) {
        const { value, done } = await iterator.next();
        if (value !== void 0) {
          const chunk = serializer(value);
          if (chunk !== void 0) {
            controller.enqueue(chunk);
          }
        }
        if (done) {
          controller.close();
        }
      },
      cancel() {
        iterator.return?.();
      }
    })
  );
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$2({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent$2(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
    for (const [key, value] of entries) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler$1(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler$1;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _rawReqUrl = event.node.req.url || "/";
    const _reqPath = _decodePath(event._path || _rawReqUrl);
    event._path = _reqPath;
    const _needsRawUrl = _reqPath !== _rawReqUrl;
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _needsRawUrl ? layer.route.length > 1 ? _rawReqUrl.slice(layer.route.length) || "/" : _rawReqUrl : _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$2({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$2(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$2({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function _decodePath(url) {
  const qIndex = url.indexOf("?");
  const path = qIndex === -1 ? url : url.slice(0, qIndex);
  const query = qIndex === -1 ? "" : url.slice(qIndex);
  const decodedPath = path.includes("%25") ? decodePath(path.replace(/%25/g, "%2525")) : decodePath(path);
  return decodedPath + query;
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$2({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$2({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function fromNodeMiddleware(handler) {
  if (isEventHandler(handler)) {
    return handler;
  }
  if (typeof handler !== "function") {
    throw new TypeError(
      "Invalid handler. It should be a function:",
      handler
    );
  }
  return eventHandler((event) => {
    return callNodeListener(
      handler,
      event.node.req,
      event.node.res
    );
  });
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$2(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}
function callNodeListener(handler, req, res) {
  const isMiddleware = handler.length > 2;
  return new Promise((resolve, reject) => {
    const next = (err) => {
      if (isMiddleware) {
        res.off("close", next);
        res.off("error", next);
      }
      return err ? reject(createError$2(err)) : resolve(void 0);
    };
    try {
      const returned = handler(req, res, next);
      if (isMiddleware && returned === void 0) {
        res.once("close", next);
        res.once("error", next);
      } else {
        resolve(returned);
      }
    } catch (error) {
      next(error);
    }
  });
}

function flatHooks$1(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks$1(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask$1 = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller$1(hooks, args) {
  const name = args.shift();
  const task = createTask$1(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller$1(hooks, args) {
  const name = args.shift();
  const task = createTask$1(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith$1(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

let Hookable$1 = class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks$1(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks$1(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller$1, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller$1, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith$1(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith$1(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith$1(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
};
function createHooks$1() {
  return new Hookable$1();
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  if (value instanceof FormData || value instanceof URLSearchParams) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (contentType === "text/event-stream") {
    return "stream";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks$1(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks$1(context, context.options.onRequest);
      if (!(context.options.headers instanceof Headers)) {
        context.options.headers = new Headers(
          context.options.headers || {}
          /* compat */
        );
      }
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        const contentType = context.options.headers.get("content-type");
        if (typeof context.options.body !== "string") {
          context.options.body = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(
            context.options.body
          ).toString() : JSON.stringify(context.options.body);
        }
        if (!contentType) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks$1(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks$1(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks$1(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch$1 = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController$1 = globalThis.AbortController || i;
const ofetch = createFetch({ fetch: fetch$1, Headers: Headers$1, AbortController: AbortController$1 });
const $fetch$1 = ofetch;

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive$1(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify$9(value) {
  if (isPrimitive$1(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify$9(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
const nonItemKeyProperties = /* @__PURE__ */ new Set([
  "getKeys",
  "clear",
  "mount",
  "unmount"
]);
function prefixStorage(storage, base) {
  if (base?.includes("?")) {
    throw new Error(`[unstorage] Invalid base: ${JSON.stringify(base)}`);
  }
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const itemKey = (key) => {
    if (!normalizeKey$1(key)) {
      throw new Error(`[unstorage] Invalid key: ${JSON.stringify(key)}`);
    }
    return base + key;
  };
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = nonItemKeyProperties.has(property) ? (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    ) : async (key = "", ...args) => (
      // @ts-ignore
      storage[property](itemKey(key), ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  nsStorage.keys = nsStorage.getKeys;
  nsStorage.getItems = async (items, commonOptions) => {
    const prefixedItems = items.map(
      (item) => typeof item === "string" ? itemKey(item) : { ...item, key: itemKey(item.key) }
    );
    const results = await storage.getItems(prefixedItems, commonOptions);
    return results.map((entry) => ({
      key: entry.key.slice(base.length),
      value: entry.value
    }));
  };
  nsStorage.setItems = async (items, commonOptions) => {
    const prefixedItems = items.map((item) => ({
      key: itemKey(item.key),
      value: item.value,
      options: item.options
    }));
    return storage.setItems(prefixedItems, commonOptions);
  };
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function hasDotSegment(key) {
  return key.split(":").some((segment) => segment === "." || segment === "..");
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$2 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$2,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const normalizeItemKey = (key) => {
    const normalizedKey = normalizeKey$1(key);
    if (!normalizedKey || hasDotSegment(normalizedKey)) {
      throw new Error(`[unstorage] Invalid key: ${JSON.stringify(key)}`);
    }
    return normalizedKey;
  };
  const normalizeBase = (base) => {
    const normalizedBase = normalizeBaseKey(base);
    if (hasDotSegment(normalizedBase)) {
      throw new Error(`[unstorage] Invalid base: ${JSON.stringify(base)}`);
    }
    return normalizedBase;
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeItemKey(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    async hasItem(key, opts = {}) {
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    async getItem(key, opts = {}) {
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    async getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    async getItemRaw(key, opts = {}) {
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify$9(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify$9(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify$9(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    async setMeta(key, value, opts = {}) {
      return this.setItem(normalizeItemKey(key) + "$", value, opts);
    },
    async removeMeta(key, opts = {}) {
      return this.removeItem(normalizeItemKey(key) + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBase(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBase(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBase(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError$1(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError$1);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError$1(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError$1(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding ?? null).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$2(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$2(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME$1 = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME$1, "base");
  }
  opts.base = resolve$2(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError$1(
        DRIVER_NAME$1,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME$1,
    options: opts,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const DRIVER_NAME = "lru-cache";
const lruCacheDriver = defineDriver((opts = {}) => {
  const cache = new LRUCache({
    max: 1e3,
    sizeCalculation: opts.maxSize || opts.maxEntrySize ? (value, key) => {
      return key.length + byteLength(value);
    } : void 0,
    ...opts
  });
  return {
    name: DRIVER_NAME,
    options: opts,
    getInstance: () => cache,
    hasItem(key) {
      return cache.has(key);
    },
    getItem(key) {
      return cache.get(key) ?? null;
    },
    getItemRaw(key) {
      return cache.get(key) ?? null;
    },
    setItem(key, value) {
      cache.set(key, value);
    },
    setItemRaw(key, value) {
      cache.set(key, value);
    },
    removeItem(key) {
      cache.delete(key);
    },
    getKeys() {
      return [...cache.keys()];
    },
    clear() {
      cache.clear();
    },
    dispose() {
      cache.clear();
    }
  };
});
function byteLength(value) {
  if (typeof Buffer !== "undefined") {
    try {
      return Buffer.byteLength(value);
    } catch {
    }
  }
  try {
    return typeof value === "string" ? value.length : JSON.stringify(value).length;
  } catch {
  }
  return 0;
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('skew-protection', unstorage_47drivers_47fs_45lite({"driver":"fs-lite","base":"node_modules/.cache/nuxt-seo/skew-protection"}));
storage.mount('cache/nuxt-og-image', lruCacheDriver({"driver":"lru-cache","max":0,"maxSize":67108864}));
storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function serialize$1(input) {
	if (typeof input === "string") return `'${input}'`;
	return new Serializer().serialize(input);
}
const asciiOrder = " _-,;:!?.'\"()[]{}@*/\\&#%`^+<=>|~$0123456789abcdefghijklmnopqrstuvwxyz";
const asciiWeights = /*@__PURE__*/ (function() {
	const weights = /* @__PURE__ */ new Uint8Array(128);
	for (let i = 0; i < 69; i++) weights[asciiOrder.charCodeAt(i)] = i + 1;
	for (let code = 65; code <= 90; code++) weights[code] = weights[code + 32];
	return weights;
})();
function compareStrings(a, b) {
	if (a === b) return 0;
	const length = Math.min(a.length, b.length);
	let tieBreaker = 0;
	for (let i = 0; i < length; i++) {
		const codeA = a.charCodeAt(i);
		const codeB = b.charCodeAt(i);
		if (codeA === codeB) continue;
		const weightA = codeA < 128 && asciiWeights[codeA] ? asciiWeights[codeA] : codeA + 128;
		const weightB = codeB < 128 && asciiWeights[codeB] ? asciiWeights[codeB] : codeB + 128;
		if (weightA !== weightB) return weightA < weightB ? -1 : 1;
		if (tieBreaker === 0) tieBreaker = codeA > codeB ? -1 : 1;
	}
	if (a.length !== b.length) return a.length < b.length ? -1 : 1;
	return tieBreaker;
}
const Serializer = /*@__PURE__*/ (function() {
	class Serializer {
		#context = /* @__PURE__ */ new Map();
		compare(a, b) {
			const typeA = typeof a;
			const typeB = typeof b;
			if (typeA === "string" && typeB === "string") return compareStrings(a, b);
			if (typeA === "number" && typeB === "number") return a - b;
			return compareStrings(this.serialize(a, true), this.serialize(b, true));
		}
		serialize(value, noQuotes) {
			if (value === null) return "null";
			switch (typeof value) {
				case "string": return noQuotes ? value : `'${value}'`;
				case "bigint": return `${value}n`;
				case "object": return this.$object(value);
				case "function": return this.$function(value);
			}
			return String(value);
		}
		serializeObject(object) {
			const objString = Object.prototype.toString.call(object);
			if (objString !== "[object Object]") return this.serializeBuiltInType(objString.length < 10 ? `unknown:${objString}` : objString.slice(8, -1), object);
			const constructor = object.constructor;
			const objName = constructor === Object || constructor === void 0 ? "" : constructor.name;
			if (objName !== "" && globalThis[objName] === constructor) return this.serializeBuiltInType(objName, object);
			if ("toJSON" in object && typeof object.toJSON === "function") {
				const json = object.toJSON();
				return objName + (json !== null && typeof json === "object" ? this.$object(json) : `(${this.serialize(json)})`);
			}
			const keys = Object.keys(object).sort(compareStrings);
			let content = `${objName}{`;
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				content += `${key}:${this.serialize(object[key])}`;
				if (i < keys.length - 1) content += ",";
			}
			return content + "}";
		}
		serializeBuiltInType(type, object) {
			const handler = this["$" + type];
			if (handler) return handler.call(this, object);
			if (typeof object.entries === "function") return this.serializeObjectEntries(type, object.entries());
			throw new Error(`Cannot serialize ${type}`);
		}
		serializeObjectEntries(type, entries) {
			const sortedEntries = Array.from(entries).sort((a, b) => this.compare(a[0], b[0]));
			let content = `${type}{`;
			for (let i = 0; i < sortedEntries.length; i++) {
				const [key, value] = sortedEntries[i];
				content += `${this.serialize(key, true)}:${this.serialize(value)}`;
				if (i < sortedEntries.length - 1) content += ",";
			}
			return content + "}";
		}
		$object(object) {
			let content = this.#context.get(object);
			if (content === void 0) {
				this.#context.set(object, `#${this.#context.size}`);
				content = this.serializeObject(object);
				this.#context.set(object, content);
			}
			return content;
		}
		$function(fn) {
			const fnStr = Function.prototype.toString.call(fn);
			if (fnStr.slice(-15) === "[native code] }") return `${fn.name || ""}()[native]`;
			return `${fn.name}(${fn.length})${fnStr.replace(/\s*\n\s*/g, "")}`;
		}
		$Array(arr) {
			let content = "[";
			for (let i = 0; i < arr.length; i++) {
				content += this.serialize(arr[i]);
				if (i < arr.length - 1) content += ",";
			}
			return content + "]";
		}
		$Date(date) {
			try {
				return `Date(${date.toISOString()})`;
			} catch {
				return `Date(null)`;
			}
		}
		$ArrayBuffer(arr) {
			return `ArrayBuffer[${new Uint8Array(arr).join(",")}]`;
		}
		$Set(set) {
			return `Set${this.$Array(Array.from(set).sort((a, b) => this.compare(a, b)))}`;
		}
		$Map(map) {
			return this.serializeObjectEntries("Map", map.entries());
		}
	}
	for (const type of [
		"Error",
		"RegExp",
		"URL"
	]) Serializer.prototype["$" + type] = function(val) {
		return `${type}(${val})`;
	};
	for (const type of [
		"Int8Array",
		"Uint8Array",
		"Uint8ClampedArray",
		"Int16Array",
		"Uint16Array",
		"Int32Array",
		"Uint32Array",
		"Float32Array",
		"Float64Array"
	]) Serializer.prototype["$" + type] = function(arr) {
		return `${type}[${arr.join(",")}]`;
	};
	for (const type of ["BigInt64Array", "BigUint64Array"]) Serializer.prototype["$" + type] = function(arr) {
		return `${type}[${arr.join("n,")}${arr.length > 0 ? "n" : ""}]`;
	};
	return Serializer;
})();

const fastHash = /*@__PURE__*/ (() => globalThis.process?.getBuiltinModule?.("crypto")?.hash)();
const algorithm = "sha256";
const encoding = "base64url";
function digest(data) {
	if (fastHash) return fastHash(algorithm, data, encoding);
	const h = createHash(algorithm).update(data);
	return globalThis.process?.versions?.webcontainer ? h.digest().toString(encoding) : h.digest(encoding);
}

function hash$1(input) {
	return digest(serialize$1(input));
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event._path = incomingEvent._path;
      event.fetch = (url, fetchOptions) => fetchWithEvent$2(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent$2(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler$1(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function upperFirst(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}
const titleCaseExceptions = /^(a|an|and|as|at|but|by|for|if|in|is|nor|of|on|or|the|to|with)$/i;
function titleCase(str, opts) {
  return (Array.isArray(str) ? str : splitByCase(str)).filter(Boolean).map(
    (p) => titleCaseExceptions.test(p) ? p.toLowerCase() : upperFirst(p)
  ).join(" ");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "e12c4d35-318c-4128-8c84-fa964d1aee9f",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/__nuxt_content/**": {
        "robots": false,
        "cache": false,
        "headers": {
          "X-Robots-Tag": "noindex, nofollow"
        }
      },
      "/__nuxt_content/blog/sql_dump.txt": {
        "prerender": true
      },
      "/__nuxt_content/projects/sql_dump.txt": {
        "prerender": true
      },
      "/sitemap.xml": {
        "headers": {
          "Content-Type": "text/xml; charset=UTF-8",
          "Cache-Control": "public, max-age=600, must-revalidate",
          "X-Sitemap-Prerendered": "2026-10-28T07:16:10.043Z"
        }
      },
      "/_og/d/**": {
        "headers": {
          "cache-control": "public, max-age=259200, s-maxage=259200, immutable"
        }
      },
      "/_og/r/**": {
        "headers": {
          "cache-control": "public, max-age=259200, s-maxage=259200, immutable"
        }
      },
      "/_og/s/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/llms.txt": {
        "headers": {
          "Content-Type": "text/plain; charset=utf-8"
        }
      },
      "/llms/**": {
        "headers": {
          "Content-Type": "text/plain; charset=utf-8"
        }
      },
      "/llms-full.txt": {
        "headers": {
          "Content-Type": "text/plain; charset=utf-8"
        }
      },
      "/sitemap.md": {
        "headers": {
          "Content-Type": "text/markdown; charset=utf-8"
        }
      },
      "/_nuxt": {
        "robots": "noindex",
        "headers": {
          "X-Robots-Tag": "noindex"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable",
          "X-Robots-Tag": "noindex"
        },
        "robots": "noindex"
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/fonts/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_og-static-fonts/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "appSecret": "",
  "public": {
    "colorMode": {
      "cookieAttrs": ""
    },
    "mdc": {
      "components": {
        "prose": true,
        "map": {},
        "customElements": []
      },
      "headings": {
        "anchorLinks": {
          "h1": false,
          "h2": true,
          "h3": true,
          "h4": true,
          "h5": false,
          "h6": false
        }
      },
      "highlight": {
        "noApiRoute": true,
        "highlighter": "shiki",
        "theme": {
          "default": "github-light",
          "dark": "github-dark"
        },
        "shikiEngine": "oniguruma",
        "langs": [
          "js",
          "jsx",
          "json",
          "ts",
          "tsx",
          "vue",
          "css",
          "html",
          "bash",
          "md",
          "mdc",
          "yaml"
        ]
      }
    },
    "nuxt-seo-utils-version": "9.0.1",
    "seo-utils": {
      "canonicalQueryWhitelist": [
        "page",
        "sort",
        "filter",
        "search",
        "q",
        "category",
        "tag"
      ],
      "canonicalLowercase": true,
      "automaticTwitterTags": true,
      "tagPriority": "low",
      "separator": "—",
      "titleSeparator": ""
    },
    "skewProtection": {
      "basePath": "/__skew",
      "assetRecovery": {
        "_tag": "disabled"
      },
      "cookie": false,
      "debug": false,
      "connectionTracking": "",
      "routeTracking": "",
      "ipTracking": "",
      "reloadStrategy": "prompt",
      "multiTab": true,
      "version": "2.0.3"
    },
    "content": {
      "wsUrl": ""
    },
    "nuxt-robots": {
      "version": "7.0.2",
      "debug": false,
      "credits": true,
      "groups": [
        {
          "userAgent": [
            "*"
          ],
          "disallow": [
            ""
          ],
          "allow": [],
          "contentSignal": [
            "search=yes, ai-input=yes"
          ],
          "comment": [],
          "contentUsage": [],
          "_indexable": true,
          "_rules": [],
          "_normalized": true
        }
      ],
      "sitemap": [
        "/sitemap.xml"
      ],
      "header": true,
      "robotsEnabledValue": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      "robotsDisabledValue": "noindex, nofollow",
      "cacheControl": "max-age=14400, must-revalidate",
      "botDetection": true
    },
    "nuxt-og-image": {
      "defaults": {
        "emojis": "noto",
        "extension": "png",
        "width": 1200,
        "height": 600,
        "cacheMaxAgeSeconds": 259200
      },
      "includeTwitter": true,
      "browserEnabled": false,
      "hasServerRuntime": true
    }
  },
  "icon": {
    "serverKnownCssClasses": []
  },
  "sitemap": {
    "cacheMaxAgeSeconds": 600,
    "debug": false
  },
  "nuxt-schema-org": {
    "reactive": false,
    "minify": true,
    "scriptAttributes": {
      "data-nuxt-schema-org": true
    },
    "identity": "",
    "version": "7.0.1"
  },
  "htmlCacheCapabilities": [
    {
      "v": 1,
      "by": "nuxt-skew-protection",
      "documentTtlCeilingSeconds": 36000,
      "basis": "retention-days",
      "assetRecovery": true
    }
  ],
  "nuxt-ai-ready": {
    "version": "3.4.0",
    "debug": false,
    "debugCron": false,
    "contentNegotiation": "auto",
    "botNegotiation": false,
    "mdreamOptions": {
      "minimal": true,
      "clean": true
    },
    "sitemapMd": true,
    "describedby": true,
    "markdownCacheHeaders": {
      "maxAge": 3600,
      "swr": true
    },
    "llmsTxt": {
      "markdownLinks": true,
      "directive": {
        "markdown": true,
        "html": false
      },
      "sections": [
        {
          "title": "LLM Resources",
          "links": [
            {
              "title": "Full Content",
              "href": "https://ashlyomanada.dev/llms-full.txt",
              "description": "Complete page content in markdown format."
            }
          ]
        }
      ],
      "notes": ""
    },
    "llmsFullTxt": true,
    "llmsTxtCacheSeconds": 600,
    "prerenderCacheDir": "/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/.cache/nuxt-seo/ai-ready/routes",
    "database": {
      "_tag": "Disabled"
    },
    "runtimeSync": {
      "enabled": false,
      "ttl": 3600,
      "batchSize": 50,
      "pruneTtl": 0
    },
    "runtimeSyncSecret": "",
    "sitemapPrerendered": false,
    "i18n": "",
    "ftsTokenizer": "unicode61 remove_diacritics 2",
    "apiCatalog": ""
  },
  "content": {
    "databaseVersion": "v3.5.0",
    "version": "3.16.2",
    "database": {
      "type": "sqlite",
      "filename": "./contents.sqlite"
    },
    "localDatabase": {
      "type": "sqlite",
      "filename": "/Users/ccci/Desktop/Projects/ReactPortfolio/.data/content/contents.sqlite"
    },
    "integrityCheck": true
  },
  "nuxt-robots": {
    "version": "7.0.2",
    "debug": false,
    "credits": true,
    "groups": [
      {
        "userAgent": [
          "*"
        ],
        "disallow": [
          ""
        ],
        "allow": [],
        "contentSignal": [
          "search=yes, ai-input=yes"
        ],
        "comment": [],
        "contentUsage": [],
        "_indexable": true,
        "_rules": [],
        "_normalized": true
      }
    ],
    "sitemap": [
      "/sitemap.xml"
    ],
    "header": true,
    "robotsEnabledValue": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    "robotsDisabledValue": "noindex, nofollow",
    "cacheControl": "max-age=14400, must-revalidate",
    "botDetection": true
  },
  "nuxt-og-image": {
    "version": "7.0.7",
    "satoriOptions": {},
    "resvgOptions": {},
    "sharpOptions": {},
    "publicStoragePath": "root:public",
    "defaults": {
      "emojis": "noto",
      "extension": "png",
      "width": 1200,
      "height": 600,
      "cacheMaxAgeSeconds": 259200
    },
    "debug": false,
    "includeTwitter": true,
    "baseCacheKey": "/cache/nuxt-og-image/7.0.7",
    "buildCacheDir": "",
    "publish": "",
    "hasNuxtIcon": true,
    "colorPreference": "dark",
    "cssFramework": "tailwind",
    "browserEnabled": false,
    "browser": "",
    "security": {
      "strict": false,
      "maxDimension": 2048,
      "maxDpr": 2,
      "renderTimeout": 15000,
      "imageFetchTimeout": 3000,
      "maxQueryParamSize": "",
      "restrictRuntimeImagesToOrigin": false,
      "secret": ""
    }
  },
  "nuxt-site-config": {
    "stack": [
      {
        "_context": "system",
        "_priority": -15,
        "env": "production"
      },
      {
        "_priority": -3,
        "_context": "nuxt-site-config:config",
        "url": "https://ashlyomanada.dev",
        "name": "Ashly Omanada — Full-Stack Developer",
        "description": "High-impact full-stack developer portfolio showcasing production web applications, real-time systems, and distributed architectures.",
        "defaultLocale": "en"
      }
    ],
    "version": "5.0.3",
    "debug": false,
    "multiTenancy": []
  },
  "ipx": {
    "baseURL": "/_ipx",
    "alias": {},
    "fs": {
      "dir": "../public"
    },
    "http": {
      "domains": []
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig$1(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig$1();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());

const nitroAsyncContext = getContext("nitro-app", {
  asyncContext: true,
  AsyncLocalStorage: AsyncLocalStorage 
});
function useEvent() {
  try {
    return nitroAsyncContext.use().event;
  } catch {
    const hint = "Note: This is an experimental feature and might be broken on non-Node.js environments." ;
    throw createError$2({
      message: `Nitro request context is not available. ${hint}`
    });
  }
}

function isPathInScope(pathname, base) {
  let canonical;
  try {
    const pre = pathname.replace(/%2f/gi, "/").replace(/%5c/gi, "\\");
    canonical = new URL(pre, "http://_").pathname;
  } catch {
    return false;
  }
  return !base || canonical === base || canonical.startsWith(base + "/");
}

const config = useRuntimeConfig$1();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules$2(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError$2({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$2(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect$1(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError$2({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$2(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules$2(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig$1().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

// src/runtime/utils/event.ts
const ENC_PIPE_RE = /%7C/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_ENC_SLASH_RE = /%252F/gi;
const HASH_RE = /#/g;
const QUESTION_MARK_RE = /\?/g;
const DOT_SEGMENT_RE = /(?:^|\/)\.{1,2}(?:\/|$)/;
function encodeEventPath(path) {
	const queryIndex = path.indexOf("?");
	if (queryIndex === -1) return encodeVueRouterPath(path);
	return encodeVueRouterPath(path.slice(0, queryIndex)) + path.slice(queryIndex);
}
function encodeVueRouterPath(path) {
	return encodeURI(path).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]").replace(HASH_RE, "%23").replace(QUESTION_MARK_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F");
}
/**
* The response headers of an h3 v1 event, in the shape the renderer writes them in.
*
* Backed by the node response rather than a copy of it, so a header the app sets through
* h3 and a header the renderer sets are the same header, and both are sent.
*/
var NodeResponseHeaders = class {
	res;
	constructor(res) {
		this.res = res;
	}
	get(name) {
		const value = this.res.getHeader(name);
		if (value === void 0) return null;
		return Array.isArray(value) ? value.join(", ") : String(value);
	}
	has(name) {
		return this.res.hasHeader(name);
	}
	set(name, value) {
		this.res.setHeader(name, value);
	}
	append(name, value) {
		const existing = this.res.getHeader(name);
		if (existing === void 0) {
			this.res.setHeader(name, value);
			return;
		}
		this.res.setHeader(name, Array.isArray(existing) ? [...existing, value] : [String(existing), value]);
	}
	delete(name) {
		this.res.removeHeader(name);
	}
	getSetCookie() {
		const value = this.res.getHeader("set-cookie");
		if (value === void 0) return [];
		return Array.isArray(value) ? value.map(String) : [String(value)];
	}
	*entries() {
		const headers = this.res.getHeaders();
		for (const name of Object.keys(headers).sort()) {
			const value = headers[name];
			if (value === void 0) continue;
			if (name === "set-cookie" && Array.isArray(value)) for (const entry of value) yield [name, entry];
			else yield [name, Array.isArray(value) ? value.join(", ") : String(value)];
		}
	}
	*keys() {
		for (const [name] of this.entries()) yield name;
	}
	*values() {
		for (const [, value] of this.entries()) yield value;
	}
	forEach(callback, thisArg) {
		for (const [name, value] of this.entries()) callback.call(thisArg, value, name, this);
	}
	[Symbol.iterator]() {
		return this.entries();
	}
};
const WEB_PROPERTIES = /* @__PURE__ */ new Set([
	"req",
	"res",
	"url",
	"~app"
]);
const PAYLOAD_METHODS = /* @__PURE__ */ new Set([
	"PATCH",
	"POST",
	"PUT",
	"DELETE"
]);
const BODY_READ_METHODS = /* @__PURE__ */ new Set([
	"arrayBuffer",
	"blob",
	"bytes",
	"formData",
	"json",
	"text"
]);
/**
* The request in the web-standard shape, with every read of its body served from the bytes
* h3 v1 caches on the node request.
*
* A body read here and a `readBody(event)` elsewhere in the same request therefore resolve
* to the same bytes whichever happens first, and reading the request twice - directly, from
* a clone, or as a stream - resolves the same bytes each time rather than the second read
* finding a stream the first has drained.
*/
function toWebRequest$1(event) {
	const existing = event.web?.request;
	if (existing) return existing;
	const method = event.method;
	if (!PAYLOAD_METHODS.has(method)) return new Request(getRequestURL(event), {
		method,
		headers: event.headers,
		signal: toRequestSignal(event)
	});
	const request = new Request(getRequestURL(event), {
		method,
		headers: event.headers,
		body: toBufferedBodyStream(event),
		signal: toRequestSignal(event),
		duplex: "half"
	});
	const read = () => readRawBody(event, false).then((body) => body ? new Uint8Array(body) : /* @__PURE__ */ new Uint8Array());
	const copy = () => read().then((body) => new Response(body, { headers: request.headers }));
	const buffered = new Proxy(request, { get(target, property) {
		if (property === "bodyUsed") return false;
		if (property === "body") return toBufferedBodyStream(event);
		if (property === "clone") return () => buffered;
		if (typeof property === "string" && BODY_READ_METHODS.has(property)) return () => copy().then((response) => response[property]());
		const value = Reflect.get(target, property, target);
		return typeof value === "function" ? value.bind(target) : value;
	} });
	return buffered;
}
/**
* Aborts when the client disconnects before the response is finished, the same moment an h3 v1
* handler would catch with `event.node.req.on('close')`.
*/
function toRequestSignal(event) {
	const controller = new AbortController();
	const res = event.node?.res;
	if (typeof res?.once === "function") res.once("close", () => {
		if (!res.writableFinished) controller.abort();
	});
	return controller.signal;
}
function toBufferedBodyStream(event) {
	return new ReadableStream({ async pull(controller) {
		const body = await readRawBody(event, false);
		if (body) controller.enqueue(new Uint8Array(body));
		controller.close();
	} });
}
const portableEvents = /* @__PURE__ */ new WeakMap();
/**
* The event a `nuxt/server` handler is given, in the web-standard shape.
*
* Both shapes are served from one object: `req`, `res`, `url` and `~app` resolve to the web
* view, everything else to the h3 v1 event, so h3's own helpers work on it too (they read
* `event.node`, not its deprecated `req`/`res` aliases). Cached per event, with the web view
* built on first access. `resolveURL` replaces how `url` is derived from the event's path.
*/
function toPortableEvent(event, resolveURL) {
	const cached = portableEvents.get(event);
	if (cached) return cached;
	let web;
	const portable = new Proxy(event, {
		get(target, property) {
			if (property === "~portable") return true;
			return WEB_PROPERTIES.has(property) ? (web ??= toWebView(event, resolveURL))[property] : Reflect.get(target, property, target);
		},
		set(target, property, value) {
			if (property === "url") {
				(web ??= toWebView(event, resolveURL)).url = value;
				return true;
			}
			return Reflect.set(target, property, value, target);
		},
		has(target, property) {
			return WEB_PROPERTIES.has(property) || Reflect.has(target, property);
		}
	});
	portableEvents.set(event, portable);
	return portable;
}
/**
* The Nuxt context a request nitro made to itself was fetched with: `node-mock-http` carries
* it on the mock request rather than in the h3 event's own context. A request that arrives
* over the network has none, whoever sent it.
*/
function getFetchedRequestContext(event) {
	return event.node.req.__unenv__?.nuxt;
}
/**
* The event the SSR renderer reads, which reaches the h3 v1 event itself through `~app`.
* Of the Nuxt context a request nitro made to itself was fetched with, only the error render
* flag carries over.
*
* Paths with `.` or `..` segments 404, as `url` would resolve them to a page other than the
* one `event.path` names.
*/
function toRequestEvent(event) {
	const queryIndex = event.path.indexOf("?");
	if (DOT_SEGMENT_RE.test(queryIndex === -1 ? event.path : event.path.slice(0, queryIndex))) throw createError$2({
		statusCode: 404,
		statusMessage: "Page Not Found"
	});
	const requestEvent = toWebView(event);
	if (getFetchedRequestContext(event)?.["~rendering-error"]) event.context.nuxt = {
		"~rendering-error": true,
		...event.context.nuxt
	};
	return requestEvent;
}
/**
* Describe an h3 v1 event in the web-standard shape, rather than adapting it in place:
* `event.req` and `event.res` already name the node request and response, and that is the
* shape `useRequestEvent()` and the render hooks must keep seeing.
*
* Everything is resolved on access, and the response is backed by the node response rather
* than a copy of it, so a header the application sets through h3 and a header the renderer
* sets are the same header.
*/
function toWebView(event, resolveURL = () => new URL(encodeEventPath(event.path), `${getRequestProtocol(event)}://${getRequestHost(event)}`)) {
	const node = event.node;
	let request;
	let url;
	const res = {
		get status() {
			return node.res.statusCode;
		},
		set status(status) {
			node.res.statusCode = status;
		},
		get statusText() {
			return node.res.statusMessage;
		},
		set statusText(statusText) {
			node.res.statusMessage = statusText;
		},
		headers: new NodeResponseHeaders(node.res)
	};
	const requestEvent = {
		context: event.context,
		res,
		get req() {
			return request ??= toWebRequest$1(event);
		},
		get url() {
			return url ??= resolveURL();
		},
		set url(value) {
			url = value;
			event._path = node.req.url = value.pathname + value.search;
		}
	};
	requestEvent["~app"] = event;
	return requestEvent;
}

// src/runtime/utils/error.ts
/**
* Nitro internal functions extracted from https://github.com/nitrojs/nitro/blob/v2/src/runtime/internal/utils.ts
*/
function isJsonRequest(event) {
	if (hasReqHeader(event, "accept", "text/html")) return false;
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader$1(event, name);
	return !!(value && typeof value === "string" && value.toLowerCase().includes(includes));
}

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

const VueResolver = /* @__PURE__ */ Object.assign(
  (_, value) => isRef(value) ? toValue$1(value) : value,
  // identity for plain non-reactive values, so the SSR default init entry
  // keeps its precomputed fast path (see unhead/server createHead)
  { _static: true }
);

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const legacyPlugins = [DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin];

const unheadOptions = {
  disableDefaults: true,
  plugins: legacyPlugins,
};

const renderSSRHeadOptions = {"omitLineBreaks":true};

const NUXT_PRERENDER_NO_SSR_ROUTES = ["/index.html","/200.html","/404.html"];
const NUXT_NO_SCRIPTS_PATTERNS = [];
const NUXT_PAGE_PATTERNS = ["/blog/:slug","/projects/:slug","/blog","/certifications","/gallery","/projects","/tech-stack","/uses","/"];
const NUXT_SSR_STREAMING = false;
const appHead = {"link":[{"rel":"icon","type":"image/png","href":"/images/portrait.png"}],"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"},{"property":"og:type","content":"website"}],"style":[],"script":[],"noscript":[],"titleTemplate":"%s %separator Ashly Omanada","templateParams":{"separator":"—"},"htmlAttrs":{"lang":"en"}};
const appRootTag = "div";
const appRootAttrs = {"id":"__nuxt"};
const appTeleportTag = "div";
const appTeleportAttrs = {"id":"teleports"};
const appSpaLoaderTag = "div";
const appSpaLoaderAttrs = {"id":"__nuxt-loader"};
const appId = "nuxt-app";

// src/runtime/handlers/error.ts
var error_default = async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled) return;
	const isRenderingError = !!(event.context.nuxt?.["~rendering-error"] || getFetchedRequestContext(event)?.["~rendering-error"]);
	let errorCause;
	if (isJsonRequest(event)) {
		return;
	}
	const defaultRes = await defaultHandler(error, event, {
		json: true,
		silent: false
	});
	if ((error.status || error.statusCode || 500) === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		appendVary(event, "accept, sec-fetch-mode");
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	const errorObject = defaultRes.body;
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig$1(event).app.baseURL) + url.search + url.hash;
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	if (!error.unhandled) errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	appendVary(event, "accept, sec-fetch-mode");
	if (!isRenderingError) event.context.nuxt = {
		...event.context.nuxt,
		"~rendering-error": true
	};
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig$1(event).app.baseURL, "/__nuxt_error"), {
		...errorObject,
		...errorCause !== void 0
	}), {
		headers: event.headers,
		redirect: "manual",
		context: { nuxt: { "~rendering-error": true } }
	}).catch(() => null);
	if (event.handled) return;
	if (!res) {
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		const { template } = await import('../_/error-template.mjs');
		return send(event, template(errorObject));
	}
	let html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === ERROR_PAGE_HEADER) continue;
		if (header === "set-cookie" || header === "x-nitro-prerender") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	return send(event, html);
};
/** Set when the app's own error page could not render. */
const ERROR_PAGE_HEADER = "x-nuxt-error-page";
/**
* Add `value`'s tokens to the response `vary` header, keeping any already
* present. `*` absorbs everything else, since it means the response varies on
* all headers.
*/
function appendVary(event, value) {
	const incoming = parseVary(value);
	if (!incoming.length) return;
	const existing = parseVary(getResponseHeader(event, "vary"));
	if (existing.includes("*")) return;
	if (incoming.includes("*")) {
		setResponseHeader(event, "vary", "*");
		return;
	}
	const merged = existing.slice();
	for (const token of incoming) if (!merged.includes(token)) merged.push(token);
	setResponseHeader(event, "vary", merged.join(", "));
}
function parseVary(value) {
	return (Array.isArray(value) ? value : typeof value === "string" ? value.split(",") : []).map((token) => token.trim().toLowerCase()).filter(Boolean);
}

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [error_default, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

function localFetch(request, init, context) {
  return useNitroApp().localFetch(request, { ...init, context: context ? { _platform: context } : undefined })
}
function fetchWithEvent$1(event, request, options) {
  return event.$fetch(request, options)
}
function fetchRawWithEvent(event, request, init) {
  return event.fetch(request, init)
}

const _YDLUKTZXdOZR5euLMCN5AnSEG5YQcFhnoCD8gjkk160 = defineNitroPlugin((nitroApp) => {
  return;
});

const decodeRoutePath = function decodeRoutePath(path) {
	if (!path.includes("%")) return path;
	const queryIndex = path.indexOf("?");
	const pathname = queryIndex === -1 ? path : path.slice(0, queryIndex);
	try {
		return queryIndex === -1 ? decodeURI(pathname) : decodeURI(pathname) + path.slice(queryIndex);
	} catch {
		return path;
	}
};
const resolveRoutePathDotSegments = function resolveRoutePathDotSegments(path) {
	const queryIndex = path.indexOf("?");
	const pathname = queryIndex === -1 ? path : path.slice(0, queryIndex);
	if (!/(?:^|\/)(?:\.|%2e)/i.test(pathname)) return path;
	const input = pathname.split("/");
	const output = [];
	const root = pathname.startsWith("/") ? 1 : 0;
	for (const [i, segment] of input.entries()) {
		const dots = /^(?:\.|%2e)(\.|%2e)?$/i.exec(segment);
		if (!dots) {
			output.push(segment);
			continue;
		}
		if (dots[1] && output.length > root) output.pop();
		if (i === input.length - 1) output.push("");
	}
	const resolved = output.join("/");
	return queryIndex === -1 ? resolved : resolved + path.slice(queryIndex);
};
const foldRouteCase = function foldRouteCase(path) {
	return path.replace(/[A-Z]+|[^\0-\x7F]/g, (char) => {
		if (char.charCodeAt(0) < 128) return char.toLowerCase();
		const upper = char.toUpperCase();
		if (upper.length !== 1 || upper.charCodeAt(0) < 128) return char;
		const lower = upper.toLowerCase();
		return lower.length === 1 && lower.toUpperCase() === upper ? lower : upper;
	});
};
const normalizePath$1 = (path, fold) => {
  if (typeof path !== 'string') { return path }
  const decoded = decodeRoutePath(resolveRoutePathDotSegments(path));
  return fold ? foldRouteCase(decoded) : decoded
};
const normalizeRouteRulePath = path => normalizePath$1(path, true);

// src/runtime/utils/route-rules.ts
let matcher;
function getMatcher() {
	if (!matcher) {
		const routes = {};
		for (const [route, rules] of Object.entries(useRuntimeConfig$1().nitro?.routeRules || {})) routes[normalizeRouteRulePath(route)] = rules;
		matcher = toRouteMatcher(createRouter$1({ routes }));
	}
	return matcher;
}
/**
* Resolve the route rules for a path without the base URL. Keys and path are decoded,
* and case-folded unless routing is `sensitive`.
*/
function matchRouteRules(path) {
	return defu({}, ...getMatcher().matchAll(normalizeRouteRulePath(path)).reverse());
}
/** Resolve the route rules for a request, as {@link matchRouteRules} does for its path. */
function resolveRequestRouteRules(event) {
	return matchRouteRules(withoutBase(event.path.split("?")[0], useRuntimeConfig$1().app.baseURL));
}
/** The route rules for a request, reusing those already resolved for it. */
function getRouteRules$1(event) {
	const context = event.context._nitro ||= {};
	return context.routeRules ||= resolveRequestRouteRules(event);
}

// src/runtime/plugins/route-rules.ts
var route_rules_default = (nitroApp) => {
	nitroApp.hooks.hook("request", (event) => {
		event.context._nitro ||= {};
		event.context._nitro.routeRules = resolveRequestRouteRules(event);
	});
};

const PROTOCOL_RE = /^https?:\/\//;
const TRAILING_SLASH_RE = /\/$/;
function isLocalhostHost(host) {
  if (!host || host.startsWith("localhost") || host.startsWith("127.") || host.startsWith("0.0.0.0"))
    return true;
  const hostname = host.startsWith("[") ? host.slice(0, host.indexOf("]") + 1) : host;
  return hostname === "[::1]" || hostname === "::1" || hostname === "[::]" || hostname === "::";
}
function extractHostname(host) {
  if (host.startsWith("[")) {
    const close = host.indexOf("]");
    return close !== -1 ? host.slice(0, close + 1) : host;
  }
  const colonCount = host.split(":").length - 1;
  return colonCount === 1 ? host.slice(0, host.indexOf(":")) : host;
}
function splitHostPort(host) {
  if (host.startsWith("[")) {
    const close = host.indexOf("]");
    const hostname = close !== -1 ? host.slice(0, close + 1) : host;
    const port = close !== -1 && host[close + 1] === ":" ? host.slice(close + 2) : "";
    const normalized = hostname === "[::1]" || hostname === "[::]" ? "localhost" : hostname;
    return { host: normalized, port };
  }
  if (host === "0.0.0.0" || host.startsWith("0.0.0.0:")) {
    const i = host.indexOf(":");
    return { host: "localhost", port: i !== -1 ? host.slice(i + 1) : "" };
  }
  const colonCount = host.split(":").length - 1;
  if (colonCount === 1) {
    const i = host.indexOf(":");
    return { host: host.slice(0, i), port: host.slice(i + 1) };
  }
  if (colonCount > 1) {
    const normalized = host === "::1" || host === "::" ? "localhost" : `[${host}]`;
    return { host: normalized, port: "" };
  }
  return { host, port: "" };
}
function getNitroOrigin$1(ctx = {}) {
  const isDev = ctx.isDev ?? (process.env.MODE === "development");
  const isPrerender = ctx.isPrerender ?? false;
  let host = "";
  let port = "";
  let protocol = process.env.NITRO_SSL_CERT && process.env.NITRO_SSL_KEY ? "https" : "http";
  if (isDev || isPrerender) {
    const devEnv = process.env.__NUXT_DEV__ || process.env.NUXT_VITE_NODE_OPTIONS;
    if (devEnv) {
      const parsed = JSON.parse(devEnv);
      const origin = parsed.proxy?.url || parsed.baseURL?.replace("/__nuxt_vite_node__", "");
      host = origin.replace(PROTOCOL_RE, "").replace(TRAILING_SLASH_RE, "");
      protocol = origin.startsWith("https") ? "https" : "http";
    }
  }
  if (isDev && isLocalhostHost(host) && ctx.requestHost) {
    const reqHost = extractHostname(ctx.requestHost);
    if (reqHost && !isLocalhostHost(reqHost)) {
      host = ctx.requestHost;
      protocol = ctx.requestProtocol || protocol;
    }
  }
  if (!host && ctx.requestHost) {
    host = ctx.requestHost;
    protocol = ctx.requestProtocol || protocol;
  }
  if (!host) {
    host = process.env.NITRO_HOST || process.env.HOST || "";
    if (isDev)
      port = process.env.NITRO_PORT || process.env.PORT || "3000";
  }
  const split = splitHostPort(host);
  host = split.host;
  if (split.port)
    port = split.port;
  host = process.env.NUXT_SITE_HOST_OVERRIDE || host;
  port = process.env.NUXT_SITE_PORT_OVERRIDE || port;
  if (host.startsWith("http://") || host.startsWith("https://")) {
    protocol = host.startsWith("https://") ? "https" : "http";
    host = host.replace(PROTOCOL_RE, "");
  } else if (!isDev && (!host || !isLocalhostHost(host))) {
    protocol = "https";
  }
  return `${protocol}://${host}${port ? `:${port}` : ""}/`;
}

// ../nuxt/src/app/error.ts
const NUXT_ERROR_SIGNATURE = "__nuxt_error";

// src/runtime/utils/paths.ts
function baseURL() {
	return useRuntimeConfig$1().app.baseURL;
}
function buildAssetsDir() {
	return useRuntimeConfig$1().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	const app = useRuntimeConfig$1().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

// src/server/fetch.ts
const DEFAULT_FORWARDED_HEADERS = ["cookie", "authorization"];
/** @internal */
function resolveServerFetchInit(event, init = {}) {
	const { forwardHeaders = true, ...requestInit } = init;
	const headers = new Headers(requestInit.headers);
	const names = forwardHeaders === true ? DEFAULT_FORWARDED_HEADERS : forwardHeaders || [];
	for (const name of names) {
		const value = event.req.headers.get(name);
		if (value !== null && !headers.has(name)) headers.set(name, value);
	}
	return {
		...requestInit,
		headers
	};
}

function flatHooks(configHooks, hooks = {}, parentName) {
	for (const key in configHooks) {
		const subHook = configHooks[key];
		const name = parentName ? `${parentName}:${key}` : key;
		if (typeof subHook === "object" && subHook !== null) flatHooks(subHook, hooks, name);
		else if (typeof subHook === "function") hooks[name] = subHook;
	}
	return hooks;
}
const createTask = /* @__PURE__ */ (() => {
	if (console.createTask) return console.createTask;
	const defaultTask = { run: (fn) => fn() };
	return () => defaultTask;
})();
function callHooks(hooks, args, startIndex, task) {
	for (let i = startIndex; i < hooks.length; i += 1) try {
		const result = task ? task.run(() => hooks[i](...args)) : hooks[i](...args);
		if (result && typeof result.then === "function") return Promise.resolve(result).then(() => callHooks(hooks, args, i + 1, task));
	} catch (error) {
		return Promise.reject(error);
	}
}
function serialTaskCaller(hooks, args, name) {
	if (hooks.length > 0) return callHooks(hooks, args, 0, createTask(name));
}
function parallelTaskCaller(hooks, args, name) {
	if (hooks.length > 0) {
		const task = createTask(name);
		return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
	}
}
function callEachWith(callbacks, arg0) {
	for (const callback of [...callbacks]) callback(arg0);
}
var Hookable = class {
	_hooks;
	_before;
	_after;
	_deprecatedHooks;
	_deprecatedMessages;
	constructor() {
		this._hooks = {};
		this._before = void 0;
		this._after = void 0;
		this._deprecatedMessages = void 0;
		this._deprecatedHooks = {};
		this.hook = this.hook.bind(this);
		this.callHook = this.callHook.bind(this);
		this.callHookWith = this.callHookWith.bind(this);
	}
	hook(name, function_, options = {}) {
		if (!name || typeof function_ !== "function") return () => {};
		const originalName = name;
		let dep;
		while (this._deprecatedHooks[name]) {
			dep = this._deprecatedHooks[name];
			name = dep.to;
		}
		if (dep && !options.allowDeprecated) {
			let message = dep.message;
			if (!message) message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
			if (!this._deprecatedMessages) this._deprecatedMessages = /* @__PURE__ */ new Set();
			if (!this._deprecatedMessages.has(message)) {
				console.warn(message);
				this._deprecatedMessages.add(message);
			}
		}
		if (!function_.name) try {
			Object.defineProperty(function_, "name", {
				get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
				configurable: true
			});
		} catch {}
		this._hooks[name] = this._hooks[name] || [];
		this._hooks[name].push(function_);
		return () => {
			if (function_) {
				this.removeHook(name, function_);
				function_ = void 0;
			}
		};
	}
	hookOnce(name, function_) {
		let _unreg;
		let _function = (...arguments_) => {
			if (typeof _unreg === "function") _unreg();
			_unreg = void 0;
			_function = void 0;
			return function_(...arguments_);
		};
		_unreg = this.hook(name, _function);
		return _unreg;
	}
	removeHook(name, function_) {
		const hooks = this._hooks[name];
		if (hooks) {
			const index = hooks.indexOf(function_);
			if (index !== -1) hooks.splice(index, 1);
			if (hooks.length === 0) this._hooks[name] = void 0;
		}
	}
	clearHook(name) {
		this._hooks[name] = void 0;
	}
	deprecateHook(name, deprecated) {
		this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
		const _hooks = this._hooks[name] || [];
		this._hooks[name] = void 0;
		for (const hook of _hooks) this.hook(name, hook);
	}
	deprecateHooks(deprecatedHooks) {
		for (const name in deprecatedHooks) this.deprecateHook(name, deprecatedHooks[name]);
	}
	addHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
		return () => {
			for (const unreg of removeFns) unreg();
			removeFns.length = 0;
		};
	}
	removeHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		for (const key in hooks) this.removeHook(key, hooks[key]);
	}
	removeAllHooks() {
		this._hooks = {};
	}
	callHook(name, ...args) {
		return this.callHookWith(serialTaskCaller, name, args);
	}
	callHookParallel(name, ...args) {
		return this.callHookWith(parallelTaskCaller, name, args);
	}
	callHookWith(caller, name, args) {
		const event = this._before || this._after ? {
			name,
			args,
			context: {}
		} : void 0;
		if (this._before) callEachWith(this._before, event);
		const result = caller(this._hooks[name] ? [...this._hooks[name]] : [], args, name);
		if (result instanceof Promise) return result.finally(() => {
			if (this._after && event) callEachWith(this._after, event);
		});
		if (this._after && event) callEachWith(this._after, event);
		return result;
	}
	beforeEach(function_) {
		this._before = this._before || [];
		this._before.push(function_);
		return () => {
			if (this._before !== void 0) {
				const index = this._before.indexOf(function_);
				if (index !== -1) this._before.splice(index, 1);
			}
		};
	}
	afterEach(function_) {
		this._after = this._after || [];
		this._after.push(function_);
		return () => {
			if (this._after !== void 0) {
				const index = this._after.indexOf(function_);
				if (index !== -1) this._after.splice(index, 1);
			}
		};
	}
};
function createHooks() {
	return new Hookable();
}

/**
* @see {@link import('nuxt/server').defineEventHandler}
*
* The handler is given the event in the portable shape, so that it can read
* `event.req`/`event.url`/`event.res` as the surface promises.
*/
function defineEventHandler(handler) {
	return (event) => handler(toPortableEvent(event));
}
/**
* @see {@link import('nuxt/server').createError}
*
* h3 v1 recognises an error of its own by the marker its constructor carries, so the error
* has to be one it made; `status`/`statusText` are the names it knows as
* `statusCode`/`statusMessage`.
*/
function createError(input) {
	if (typeof input === "string") return withSignature(createError$2(input));
	const { status, statusText, ...rest } = input;
	return withSignature(createError$2({
		...rest,
		...status === void 0 ? {} : { statusCode: status },
		...statusText === void 0 ? {} : {
			statusMessage: statusText,
			message: input.message ?? statusText
		}
	}));
}
/** Mark an h3 error as Nuxt's, so `isNuxtError()` recognises it either side of the wire. */
function withSignature(error) {
	if (!("__nuxt_error" in error)) Object.defineProperty(error, NUXT_ERROR_SIGNATURE, {
		value: true,
		configurable: false,
		writable: false
	});
	return withPortableStatus(error);
}
/**
* Read the status of an h3 v1 error under the names the portable surface promises.
*
* h3 v1 carries it as `statusCode`/`statusMessage`, and `NuxtErrorLike` declares
* `status`/`statusText`, so without this a handler that branches on `error.status` reads
* `undefined` here and a number on a server runtime built against h3 v2.
*/
function withPortableStatus(error) {
	const target = error;
	if (target.status === void 0 && target.statusCode !== void 0) Object.defineProperty(target, "status", {
		get: () => target.statusCode,
		configurable: true
	});
	if (target.statusText === void 0 && target.statusMessage !== void 0) Object.defineProperty(target, "statusText", {
		get: () => target.statusMessage,
		configurable: true
	});
	return target;
}
/** @see {@link import('nuxt/server').getRequestHeader} */
function getRequestHeader(event, name) {
	return getRequestHeader$1(event, name) || void 0;
}
/** @see {@link import('nuxt/server').getQuery} */
function getQuery(event) {
	return getQuery$1(event);
}
/**
* @see {@link import('nuxt/server').sendRedirect}
*
* h3 v1's own `sendRedirect` writes the response and resolves to nothing, where the
* portable surface sets the response and returns the body to respond with. The body is
* built here rather than taken from h3, so a handler that returns it behaves the same on
* every server runtime.
*/
function sendRedirect(event, location, status = 302) {
	setResponseStatus(event, status);
	setResponseHeader(event, "location", location);
	setResponseHeader(event, "content-type", "text/html");
	return `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${location.replace(REDIRECT_UNSAFE_RE, (char) => REDIRECT_ESCAPES[char])}"></head></html>`;
}
const REDIRECT_ESCAPES = {
	"\"": "%22",
	"'": "%27",
	"<": "%3C",
	">": "%3E",
	"&": "%26"
};
const REDIRECT_UNSAFE_RE = /["'<>&]/g;
/** @see {@link import('nuxt/server').getRouteRules} */
function getRouteRules(event) {
	return getRouteRules$1(event);
}
/** @see {@link import('nuxt/server').serverFetch} */
function serverFetch(event, path, init) {
	return useNitroApp().localFetch(joinURL(baseURL(), path), resolveServerFetchInit({ req: { headers: event.headers } }, init));
}
/** @see {@link import('nuxt/server').useRuntimeConfig} */
function useRuntimeConfig(event) {
	return useRuntimeConfig$1(event);
}

const SiteConfigPriority = {
  nitro: -4,
  runtime: 0
};

function toValue(source) {
  if (typeof source === "function")
    return source();
  if (source && source.__v_isRef === true)
    return source.value;
  return source;
}
const NUXT_SITE_PREFIX = "NUXT_SITE_";
const NUXT_PUBLIC_SITE_PREFIX = "NUXT_PUBLIC_SITE_";
function envSiteConfig(env = {}) {
  const config = {};
  for (const key of Object.keys(env)) {
    const prefixLength = key.startsWith(NUXT_SITE_PREFIX) ? NUXT_SITE_PREFIX.length : key.startsWith(NUXT_PUBLIC_SITE_PREFIX) ? NUXT_PUBLIC_SITE_PREFIX.length : 0;
    if (!prefixLength)
      continue;
    const segments = key.slice(prefixLength).split("_");
    let configKey = segments[0].toLowerCase();
    for (let i = 1; i < segments.length; i++) {
      const segment = segments[i];
      configKey += segment[0]?.toUpperCase() + segment.slice(1).toLowerCase();
    }
    config[configKey] = env[key];
  }
  return config;
}

function copyPlainData(value) {
  if (Array.isArray(value))
    return value.map(copyPlainData);
  if (!value || typeof value !== "object" || value.__v_isRef || value.__v_isReactive)
    return value;
  const proto = Object.getPrototypeOf(value);
  if (proto !== Object.prototype && proto !== null)
    return value;
  const copy = {};
  for (const key in value)
    copy[key] = copyPlainData(value[key]);
  return copy;
}
function normalizeSiteConfig(config) {
  if (typeof config.indexable !== "undefined")
    config.indexable = String(config.indexable) !== "false";
  else if (typeof config.env !== "undefined")
    config.indexable = config.env === "production";
  if (typeof config.trailingSlash !== "undefined")
    config.trailingSlash = String(config.trailingSlash) !== "false";
  if (config.url && !hasProtocol(String(config.url), { acceptRelative: true, strict: false }))
    config.url = withHttps(String(config.url));
  const keys = Object.keys(config).sort((a, b) => a.localeCompare(b));
  const newConfig = {};
  for (const k of keys)
    newConfig[k] = config[k];
  return newConfig;
}
function createSiteConfigStack(options) {
  const debug = options?.debug || false;
  const stack = [];
  function push(input) {
    if (!input || typeof input !== "object" || Object.keys(input).length === 0) {
      return () => {
      };
    }
    const entry = {};
    for (const k in input) {
      const val = input[k];
      if (typeof val !== "undefined" && val !== "")
        entry[k] = copyPlainData(val);
    }
    if (!Object.keys(entry).some((k) => !k.startsWith("_"))) {
      return () => {
      };
    }
    if (!entry._context && debug) {
      let lastFunctionName = new Error("tmp").stack?.split("\n")[2]?.split(" ")[5];
      if (lastFunctionName?.includes("/"))
        lastFunctionName = "anonymous";
      entry._context = lastFunctionName;
    }
    stack.push(entry);
    return () => {
      const idx = stack.indexOf(entry);
      if (idx !== -1)
        stack.splice(idx, 1);
    };
  }
  function get(options2) {
    const siteConfig = {};
    if (options2?.debug)
      siteConfig._context = {};
    siteConfig._priority = {};
    for (const o in stack.sort((a, b) => (a._priority || 0) - (b._priority || 0))) {
      for (const k in stack[o]) {
        const key = k;
        const val = options2?.resolveRefs ? toValue(stack[o][k]) : stack[o][k];
        if (!k.startsWith("_") && typeof val !== "undefined" && val !== "") {
          siteConfig[k] = val;
          if (typeof stack[o]._priority !== "undefined" && stack[o]._priority !== -1) {
            siteConfig._priority[key] = stack[o]._priority;
          }
          if (options2?.debug)
            siteConfig._context[key] = stack[o]._context?.[key] || stack[o]._context || "anonymous";
        }
      }
    }
    return options2?.skipNormalize ? siteConfig : normalizeSiteConfig(siteConfig);
  }
  return {
    stack,
    push,
    get
  };
}

const PORT_SUFFIX_RE = /:\d+$/;
const serverEnvSiteConfig = envSiteConfig(globalThis._importMeta_.env || {});
async function initRequestSiteConfig(e, origin, routeRules) {
  if (e.context._initedSiteConfig)
    return;
  const runtimeConfig = useRuntimeConfig();
  const config = runtimeConfig["nuxt-site-config"];
  const nitroApp = useNitroApp();
  const siteConfig = e.context.siteConfig || createSiteConfigStack({
    debug: config.debug
  });
  const nitroOrigin = origin;
  e.context.siteConfigNitroOrigin = nitroOrigin;
  {
    siteConfig.push({
      _context: "nitro:init",
      _priority: SiteConfigPriority.nitro,
      url: nitroOrigin
    });
  }
  siteConfig.push({
    _context: "runtimeEnv",
    _priority: SiteConfigPriority.runtime,
    ...runtimeConfig.site || {},
    ...runtimeConfig.public.site || {},
    ...serverEnvSiteConfig
  });
  const buildStack = config.stack || [];
  buildStack.forEach((c) => siteConfig.push(c));
  if (routeRules.site) {
    siteConfig.push({
      _context: "route-rules",
      ...routeRules.site
    });
  }
  if (config.multiTenancy) {
    const host = parseURL(nitroOrigin).host?.replace(PORT_SUFFIX_RE, "") || "";
    const tenant = config.multiTenancy?.find((t) => t.hosts.includes(host));
    if (tenant) {
      siteConfig.push({
        _context: `multi-tenancy:${host}`,
        _priority: SiteConfigPriority.runtime,
        ...tenant.config
      });
    }
  }
  const ctx = { siteConfig, event: e };
  await nitroApp.hooks.callHook("site-config:init", ctx);
  e.context.siteConfig = ctx.siteConfig;
  e.context._initedSiteConfig = true;
}

const _BSvNXZPhi69sXr8pvONebGLi23tJoAVTSQ3oHeT380 = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    const path = withoutBase(event.path.split("?")[0] || "/", useRuntimeConfig().app.baseURL);
    return initRequestSiteConfig(event, getNitroOrigin$1({
      isDev: false,
      isPrerender: false,
      requestHost: getRequestHost(event, { xForwardedHost: true }),
      requestProtocol: getRequestProtocol(event, { xForwardedProto: true })
    }), matchRouteRules(path, event.method));
  });
});

const script = "\"use strict\";(()=>{const o=window,e=document.documentElement,c=[\"dark\",\"light\"],s=getStorageValue(\"localStorage\",\"ashly-theme\")||\"dark\";let r=s===\"system\"?f():s;const l=e.getAttribute(\"data-color-mode-forced\");l&&(r=l),i(r),o[\"__NUXT_COLOR_MODE__\"]={preference:s,value:r,getColorScheme:f,addColorScheme:i,removeColorScheme:d};function i(t){const a=\"\"+t+\"\",n=\"\";e.classList?e.classList.add(a):e.className+=\" \"+a,n&&e.setAttribute(\"data-\"+n,t)}function d(t){const a=\"\"+t+\"\",n=\"\";e.classList?e.classList.remove(a):e.className=e.className.replace(new RegExp(a,\"g\"),\"\"),n&&e.removeAttribute(\"data-\"+n)}function u(t){return o.matchMedia(\"(prefers-color-scheme\"+t+\")\")}function f(){if(o.matchMedia&&u(\"\").media!==\"not all\"){for(const t of c)if(u(\":\"+t).matches)return t}return\"dark\"}})();function getStorageValue(o,e){switch(o){case\"localStorage\":try{return window.localStorage.getItem(e)}catch{return null}case\"sessionStorage\":try{return window.sessionStorage.getItem(e)}catch{return null}case\"cookie\":try{return getCookie(e)}catch{return null}default:return null}}function getCookie(o){const c=(\"; \"+window.document.cookie).split(\"; \"+o+\"=\");if(c.length===2){const s=c.pop();return s?s.split(\";\").shift():null}}";

const _91qujzOfWJfyZkbD6zumMOS2zKQMJRq5PcFlMdXLtLc = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const css = "@font-face{font-family:Inter;src:local(Inter Regular Italic),local(Inter Italic),url(/_nuxt/fonts/DYJdeJPtCBIYWgA5cyxBmly7l27Wj1oQp4mFkXDxvIs-DPFPVSnB8cId8pOwgvRNA2TCO2OWamyoeCtk437Sapc.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:400;font-style:italic}@font-face{font-family:Inter Fallback\\: -apple-system;src:local(-apple-system),local(-apple-system Regular),local(-apple-system-Regular),local(System Font),local(\\.SFNS-Regular);size-adjust:114.654%;ascent-override:84.4932%;descent-override:21.0381%;line-gap-override:0%}@font-face{font-family:Inter Fallback\\: BlinkMacSystemFont;src:local(BlinkMacSystemFont),local(BlinkMacSystemFont Regular),local(BlinkMacSystemFont-Regular),local(System Font),local(\\.SFNS-Regular);size-adjust:114.654%;ascent-override:84.4932%;descent-override:21.0381%;line-gap-override:0%}@font-face{font-family:Inter Fallback\\: Segoe UI;src:local(Segoe UI),local(Segoe UI Regular),local(SegoeUI-Regular),local(SegoeUI);size-adjust:107.709%;ascent-override:89.9412%;descent-override:22.3946%;line-gap-override:0%}@font-face{font-family:Inter Fallback\\: Roboto;src:local(Roboto),local(Roboto Regular),local(Roboto-Regular);size-adjust:107.355%;ascent-override:90.2384%;descent-override:22.4686%;line-gap-override:0%}@font-face{font-family:Inter Fallback\\: Helvetica Neue;src:local(Helvetica Neue),local(Helvetica Neue Regular),local(HelveticaNeue-Regular),local(HelveticaNeue);size-adjust:106.12%;ascent-override:91.2883%;descent-override:22.7301%;line-gap-override:0%}@font-face{font-family:Inter Fallback\\: Arial;src:local(Arial),local(Arial Regular),local(Arial-Regular),local(ArialMT);size-adjust:107.119%;ascent-override:90.4365%;descent-override:22.518%;line-gap-override:0%}@font-face{font-family:Inter Fallback\\: Noto Sans;src:local(Noto Sans),local(Noto Sans Regular),local(NotoSans-Regular);size-adjust:100.747%;ascent-override:96.1571%;descent-override:23.9423%;line-gap-override:0%}@font-face{font-family:Inter Fallback\\: Liberation Sans;src:local(Liberation Sans),local(Liberation Sans Regular),local(LiberationSans-Regular);size-adjust:107.119%;ascent-override:90.4365%;descent-override:22.518%;line-gap-override:0%}@font-face{font-family:Inter;src:local(Inter Regular Italic),local(Inter Italic),url(/_nuxt/fonts/QpJYL2mwM_fWcwdT8T92e3Zj7wNrhqhFzZMwIpW9Yhk-XgOijeIybntTr80kfTNzJ_MAYXALsEz4LGK8FlCLUMQ.woff2)format(\"woff2\");font-display:swap;unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116;font-weight:400;font-style:italic}@font-face{font-family:Inter;src:local(Inter Regular Italic),local(Inter Italic),url(/_nuxt/fonts/nRO08svVDfHK2I6XQv8acbCwVYFPI-lNFmbTO_Ato-U-leG_hYlPLJBni6ljwuquGygDJ11Q9JovV7X4etSwPIs.woff2)format(\"woff2\");font-display:swap;unicode-range:U+1F??;font-weight:400;font-style:italic}@font-face{font-family:Inter;src:local(Inter Regular Italic),local(Inter Italic),url(/_nuxt/fonts/DyoSP_ZB-sZ6jdZm0DNNNAZlak-n8B55ylByyLLv58Y-LDxnRyFE6SL_0xO8Ook5rXOokOEsSmBy44omeJ02DT4.woff2)format(\"woff2\");font-display:swap;unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF;font-weight:400;font-style:italic}@font-face{font-family:Inter;src:local(Inter Regular Italic),local(Inter Italic),url(/_nuxt/fonts/xiWtFoOGVpxz2O8rJiJmkaO17BlbbGGm_obdnXH3FNs-8YIR4ZfCCs9oJJ4E1XpjqOJwDB0_yPAN4AMVgQAVTKs.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:400;font-style:italic}@font-face{font-family:Inter;src:local(Inter Regular Italic),local(Inter Italic),url(/_nuxt/fonts/okGTeHOzA93WHhiHQhh2kiQFJ8jP7Rs_J1FR3XblyKk-bIMLl2bdqTiV6xWjXZLjoJYX4UhZc8AFIlYM7Hc12TM.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:400;font-style:italic}@font-face{font-family:Inter;src:local(Inter Regular Italic),local(Inter Italic),url(/_nuxt/fonts/shQVi3meleYLIUqZP9-ZwNpu1UG0BrC8W1a0_vPu1vM-WIRtv4uldWqfFM5rfsEDcWL99nKboOnkZoW_g2Ev8Uk.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:400;font-style:italic}@font-face{font-family:Inter;src:local(Inter Medium Italic),url(/_nuxt/fonts/DYJdeJPtCBIYWgA5cyxBmly7l27Wj1oQp4mFkXDxvIs-DPFPVSnB8cId8pOwgvRNA2TCO2OWamyoeCtk437Sapc.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:500;font-style:italic}@font-face{font-family:Inter;src:local(Inter Medium Italic),url(/_nuxt/fonts/QpJYL2mwM_fWcwdT8T92e3Zj7wNrhqhFzZMwIpW9Yhk-XgOijeIybntTr80kfTNzJ_MAYXALsEz4LGK8FlCLUMQ.woff2)format(\"woff2\");font-display:swap;unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116;font-weight:500;font-style:italic}@font-face{font-family:Inter;src:local(Inter Medium Italic),url(/_nuxt/fonts/nRO08svVDfHK2I6XQv8acbCwVYFPI-lNFmbTO_Ato-U-leG_hYlPLJBni6ljwuquGygDJ11Q9JovV7X4etSwPIs.woff2)format(\"woff2\");font-display:swap;unicode-range:U+1F??;font-weight:500;font-style:italic}@font-face{font-family:Inter;src:local(Inter Medium Italic),url(/_nuxt/fonts/DyoSP_ZB-sZ6jdZm0DNNNAZlak-n8B55ylByyLLv58Y-LDxnRyFE6SL_0xO8Ook5rXOokOEsSmBy44omeJ02DT4.woff2)format(\"woff2\");font-display:swap;unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF;font-weight:500;font-style:italic}@font-face{font-family:Inter;src:local(Inter Medium Italic),url(/_nuxt/fonts/xiWtFoOGVpxz2O8rJiJmkaO17BlbbGGm_obdnXH3FNs-8YIR4ZfCCs9oJJ4E1XpjqOJwDB0_yPAN4AMVgQAVTKs.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:500;font-style:italic}@font-face{font-family:Inter;src:local(Inter Medium Italic),url(/_nuxt/fonts/okGTeHOzA93WHhiHQhh2kiQFJ8jP7Rs_J1FR3XblyKk-bIMLl2bdqTiV6xWjXZLjoJYX4UhZc8AFIlYM7Hc12TM.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:500;font-style:italic}@font-face{font-family:Inter;src:local(Inter Medium Italic),url(/_nuxt/fonts/shQVi3meleYLIUqZP9-ZwNpu1UG0BrC8W1a0_vPu1vM-WIRtv4uldWqfFM5rfsEDcWL99nKboOnkZoW_g2Ev8Uk.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:500;font-style:italic}@font-face{font-family:Inter;src:local(Inter SemiBold Italic),url(/_nuxt/fonts/DYJdeJPtCBIYWgA5cyxBmly7l27Wj1oQp4mFkXDxvIs-DPFPVSnB8cId8pOwgvRNA2TCO2OWamyoeCtk437Sapc.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:600;font-style:italic}@font-face{font-family:Inter;src:local(Inter SemiBold Italic),url(/_nuxt/fonts/QpJYL2mwM_fWcwdT8T92e3Zj7wNrhqhFzZMwIpW9Yhk-XgOijeIybntTr80kfTNzJ_MAYXALsEz4LGK8FlCLUMQ.woff2)format(\"woff2\");font-display:swap;unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116;font-weight:600;font-style:italic}@font-face{font-family:Inter;src:local(Inter SemiBold Italic),url(/_nuxt/fonts/nRO08svVDfHK2I6XQv8acbCwVYFPI-lNFmbTO_Ato-U-leG_hYlPLJBni6ljwuquGygDJ11Q9JovV7X4etSwPIs.woff2)format(\"woff2\");font-display:swap;unicode-range:U+1F??;font-weight:600;font-style:italic}@font-face{font-family:Inter;src:local(Inter SemiBold Italic),url(/_nuxt/fonts/DyoSP_ZB-sZ6jdZm0DNNNAZlak-n8B55ylByyLLv58Y-LDxnRyFE6SL_0xO8Ook5rXOokOEsSmBy44omeJ02DT4.woff2)format(\"woff2\");font-display:swap;unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF;font-weight:600;font-style:italic}@font-face{font-family:Inter;src:local(Inter SemiBold Italic),url(/_nuxt/fonts/xiWtFoOGVpxz2O8rJiJmkaO17BlbbGGm_obdnXH3FNs-8YIR4ZfCCs9oJJ4E1XpjqOJwDB0_yPAN4AMVgQAVTKs.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:600;font-style:italic}@font-face{font-family:Inter;src:local(Inter SemiBold Italic),url(/_nuxt/fonts/okGTeHOzA93WHhiHQhh2kiQFJ8jP7Rs_J1FR3XblyKk-bIMLl2bdqTiV6xWjXZLjoJYX4UhZc8AFIlYM7Hc12TM.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:600;font-style:italic}@font-face{font-family:Inter;src:local(Inter SemiBold Italic),url(/_nuxt/fonts/shQVi3meleYLIUqZP9-ZwNpu1UG0BrC8W1a0_vPu1vM-WIRtv4uldWqfFM5rfsEDcWL99nKboOnkZoW_g2Ev8Uk.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:600;font-style:italic}@font-face{font-family:Inter;src:local(Inter Regular),local(Inter),url(/_nuxt/fonts/95LF05ynkR2iited5vKC3ML7Mt4iflufgyYJQAK9nF4-NZaZZt6E_IGCSpI3DA35nDyNvesPNS4QNP7XC2pYBYE.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:400;font-style:normal}@font-face{font-family:Inter;src:local(Inter Regular),local(Inter),url(/_nuxt/fonts/rKlr2fNB2-iyJhDGh3GjbB7U7xF6BMr1eV-ngyy8udQ-JfckSRSkmknXCHp5oZLIYR_jNB6MzYb7ifA6hU4lk2o.woff2)format(\"woff2\");font-display:swap;unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116;font-weight:400;font-style:normal}@font-face{font-family:Inter;src:local(Inter Regular),local(Inter),url(/_nuxt/fonts/Nah9koTOFvXUREZWfV7DH4zgASpXCzPkz6Tn28ZWLF8-BPqOaS9b32mrF_JERGBi9aAWCHVMBVP2cgIrQCresgU.woff2)format(\"woff2\");font-display:swap;unicode-range:U+1F??;font-weight:400;font-style:normal}@font-face{font-family:Inter;src:local(Inter Regular),local(Inter),url(/_nuxt/fonts/6yQlgZNOH42hUtIIIHjZiNFc1WmiHD7IpV78HkewQzs-Qk_1yENQUazQQ0tP2ZD16gLhgnkqQqP7MhASnXvWtqQ.woff2)format(\"woff2\");font-display:swap;unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF;font-weight:400;font-style:normal}@font-face{font-family:Inter;src:local(Inter Regular),local(Inter),url(/_nuxt/fonts/k3YRPyaHq8R9a3gxNSuQ3W_8hdDfEx-SbAtGnVOYnHY-fVFZzzariE_Uq-dTHevDSbvLurnlJRTddHpakm9Ws1w.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:400;font-style:normal}@font-face{font-family:Inter;src:local(Inter Regular),local(Inter),url(/_nuxt/fonts/der4-T0bORlPDyrpWSOU_0VRetbtC4vnusni_kWmK7Q-GXB5hylV4plFt0WDHf1wY5BRE9_7uLFvbkkQKAdfTP0.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:400;font-style:normal}@font-face{font-family:Inter;src:local(Inter Regular),local(Inter),url(/_nuxt/fonts/23mtYSzxPVyLoxLNpoXveb5p0hEC2MbGLOudqhNuXQQ-sHyjhRga9hvdq4tAx7_wIeBFh1sLJ_E5PRwGnzrqxWs.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:400;font-style:normal}@font-face{font-family:Inter;src:local(Inter Medium),url(/_nuxt/fonts/95LF05ynkR2iited5vKC3ML7Mt4iflufgyYJQAK9nF4-NZaZZt6E_IGCSpI3DA35nDyNvesPNS4QNP7XC2pYBYE.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:500;font-style:normal}@font-face{font-family:Inter;src:local(Inter Medium),url(/_nuxt/fonts/rKlr2fNB2-iyJhDGh3GjbB7U7xF6BMr1eV-ngyy8udQ-JfckSRSkmknXCHp5oZLIYR_jNB6MzYb7ifA6hU4lk2o.woff2)format(\"woff2\");font-display:swap;unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116;font-weight:500;font-style:normal}@font-face{font-family:Inter;src:local(Inter Medium),url(/_nuxt/fonts/Nah9koTOFvXUREZWfV7DH4zgASpXCzPkz6Tn28ZWLF8-BPqOaS9b32mrF_JERGBi9aAWCHVMBVP2cgIrQCresgU.woff2)format(\"woff2\");font-display:swap;unicode-range:U+1F??;font-weight:500;font-style:normal}@font-face{font-family:Inter;src:local(Inter Medium),url(/_nuxt/fonts/6yQlgZNOH42hUtIIIHjZiNFc1WmiHD7IpV78HkewQzs-Qk_1yENQUazQQ0tP2ZD16gLhgnkqQqP7MhASnXvWtqQ.woff2)format(\"woff2\");font-display:swap;unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF;font-weight:500;font-style:normal}@font-face{font-family:Inter;src:local(Inter Medium),url(/_nuxt/fonts/k3YRPyaHq8R9a3gxNSuQ3W_8hdDfEx-SbAtGnVOYnHY-fVFZzzariE_Uq-dTHevDSbvLurnlJRTddHpakm9Ws1w.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:500;font-style:normal}@font-face{font-family:Inter;src:local(Inter Medium),url(/_nuxt/fonts/der4-T0bORlPDyrpWSOU_0VRetbtC4vnusni_kWmK7Q-GXB5hylV4plFt0WDHf1wY5BRE9_7uLFvbkkQKAdfTP0.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:500;font-style:normal}@font-face{font-family:Inter;src:local(Inter Medium),url(/_nuxt/fonts/23mtYSzxPVyLoxLNpoXveb5p0hEC2MbGLOudqhNuXQQ-sHyjhRga9hvdq4tAx7_wIeBFh1sLJ_E5PRwGnzrqxWs.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:500;font-style:normal}@font-face{font-family:Inter;src:local(Inter SemiBold),url(/_nuxt/fonts/95LF05ynkR2iited5vKC3ML7Mt4iflufgyYJQAK9nF4-NZaZZt6E_IGCSpI3DA35nDyNvesPNS4QNP7XC2pYBYE.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:600;font-style:normal}@font-face{font-family:Inter;src:local(Inter SemiBold),url(/_nuxt/fonts/rKlr2fNB2-iyJhDGh3GjbB7U7xF6BMr1eV-ngyy8udQ-JfckSRSkmknXCHp5oZLIYR_jNB6MzYb7ifA6hU4lk2o.woff2)format(\"woff2\");font-display:swap;unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116;font-weight:600;font-style:normal}@font-face{font-family:Inter;src:local(Inter SemiBold),url(/_nuxt/fonts/Nah9koTOFvXUREZWfV7DH4zgASpXCzPkz6Tn28ZWLF8-BPqOaS9b32mrF_JERGBi9aAWCHVMBVP2cgIrQCresgU.woff2)format(\"woff2\");font-display:swap;unicode-range:U+1F??;font-weight:600;font-style:normal}@font-face{font-family:Inter;src:local(Inter SemiBold),url(/_nuxt/fonts/6yQlgZNOH42hUtIIIHjZiNFc1WmiHD7IpV78HkewQzs-Qk_1yENQUazQQ0tP2ZD16gLhgnkqQqP7MhASnXvWtqQ.woff2)format(\"woff2\");font-display:swap;unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF;font-weight:600;font-style:normal}@font-face{font-family:Inter;src:local(Inter SemiBold),url(/_nuxt/fonts/k3YRPyaHq8R9a3gxNSuQ3W_8hdDfEx-SbAtGnVOYnHY-fVFZzzariE_Uq-dTHevDSbvLurnlJRTddHpakm9Ws1w.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:600;font-style:normal}@font-face{font-family:Inter;src:local(Inter SemiBold),url(/_nuxt/fonts/der4-T0bORlPDyrpWSOU_0VRetbtC4vnusni_kWmK7Q-GXB5hylV4plFt0WDHf1wY5BRE9_7uLFvbkkQKAdfTP0.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:600;font-style:normal}@font-face{font-family:Inter;src:local(Inter SemiBold),url(/_nuxt/fonts/23mtYSzxPVyLoxLNpoXveb5p0hEC2MbGLOudqhNuXQQ-sHyjhRga9hvdq4tAx7_wIeBFh1sLJ_E5PRwGnzrqxWs.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:600;font-style:normal}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Regular Italic),local(JetBrains Mono Italic),url(/_nuxt/fonts/BzBvP5B6n3wHNSK9KgmBNZ1PczdZ0kq6L6nu_kw03Ug-wV8zARWYtkWLbDq13Xl90XFZKXVs1nvvXB8zvlghsBY.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:400;font-style:italic}@font-face{font-family:JetBrains Mono Fallback\\: SFMono-Regular;src:local(SFMono-Regular),local(SFMono-Regular Regular),local(SFMono-Regular-Regular);size-adjust:100%;ascent-override:102%;descent-override:30%;line-gap-override:0%}@font-face{font-family:JetBrains Mono Fallback\\: Menlo;src:local(Menlo),local(Menlo Regular),local(Menlo-Regular);size-adjust:100%;ascent-override:102%;descent-override:30%;line-gap-override:0%}@font-face{font-family:JetBrains Mono Fallback\\: Monaco;src:local(Monaco),local(Monaco Regular),local(Monaco-Regular);size-adjust:100%;ascent-override:102%;descent-override:30%;line-gap-override:0%}@font-face{font-family:JetBrains Mono Fallback\\: Consolas;src:local(Consolas),local(Consolas Regular),local(Consolas-Regular);size-adjust:100%;ascent-override:102%;descent-override:30%;line-gap-override:0%}@font-face{font-family:JetBrains Mono Fallback\\: Courier New;src:local(Courier New),local(Courier New Regular),local(CourierNew-Regular),local(CourierNewPSMT);size-adjust:99.9837%;ascent-override:102.017%;descent-override:30.0049%;line-gap-override:0%}@font-face{font-family:JetBrains Mono Fallback\\: Roboto Mono;src:local(Roboto Mono),local(Roboto Mono Regular),local(RobotoMono-Regular);size-adjust:99.9837%;ascent-override:102.017%;descent-override:30.0049%;line-gap-override:0%}@font-face{font-family:JetBrains Mono Fallback\\: Noto Sans Mono;src:local(Noto Sans Mono),local(Noto Sans Mono Regular),local(NotoSansMono-Regular);size-adjust:100%;ascent-override:102%;descent-override:30%;line-gap-override:0%}@font-face{font-family:JetBrains Mono Fallback\\: Liberation Mono;src:local(Liberation Mono),local(Liberation Mono Regular),local(LiberationMono-Regular);size-adjust:99.9837%;ascent-override:102.017%;descent-override:30.0049%;line-gap-override:0%}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Regular Italic),local(JetBrains Mono Italic),url(/_nuxt/fonts/p8XC4b0v0m-EiJQAVrKLvU8spsJJrRwg_pQb6ne3LZ8-Xk9a7EzZySU6YDiCY67upfbFiJMXjFXMlVfxZu_bifY.woff2)format(\"woff2\");font-display:swap;unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116;font-weight:400;font-style:italic}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Regular Italic),local(JetBrains Mono Italic),url(/_nuxt/fonts/uNrZoOJFFhG06f8xJpyWup6Hx8TmDAR6g1B083Ihiak-YOKRRXgcGSy5ObA5GI_ApuS5tJ3aqNRMJ5ClC-DHYdA.woff2)format(\"woff2\");font-display:swap;unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF;font-weight:400;font-style:italic}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Regular Italic),local(JetBrains Mono Italic),url(/_nuxt/fonts/WvBWEpMh0GHIAGpqPUMY78bL9_LoEQDKSugTtbND-Gw-hEI3quQvUUMagnXpWFrZQqIerqrvJPyvttLONmLIyJ8.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:400;font-style:italic}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Regular Italic),local(JetBrains Mono Italic),url(/_nuxt/fonts/LtUPvBNCw2mRmTSCUrv_YeRqBX7xHSSUdk52U1zOKFY-3AVjdIdQvFhNIastDeFZR8qe9V_KKIxGcJA0VzJUi_E.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:400;font-style:italic}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Regular Italic),local(JetBrains Mono Italic),url(/_nuxt/fonts/kqHQLokKhbDhYAECQOy8tl9ltEsY5H0SHs5YVvjw1LY-DEH_xe_HpkDt9DTHbxyxHeV4Ct1N6mL81LzQokJdWc4.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:400;font-style:italic}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Medium Italic),url(/_nuxt/fonts/BzBvP5B6n3wHNSK9KgmBNZ1PczdZ0kq6L6nu_kw03Ug-wV8zARWYtkWLbDq13Xl90XFZKXVs1nvvXB8zvlghsBY.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:500;font-style:italic}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Medium Italic),url(/_nuxt/fonts/p8XC4b0v0m-EiJQAVrKLvU8spsJJrRwg_pQb6ne3LZ8-Xk9a7EzZySU6YDiCY67upfbFiJMXjFXMlVfxZu_bifY.woff2)format(\"woff2\");font-display:swap;unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116;font-weight:500;font-style:italic}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Medium Italic),url(/_nuxt/fonts/uNrZoOJFFhG06f8xJpyWup6Hx8TmDAR6g1B083Ihiak-YOKRRXgcGSy5ObA5GI_ApuS5tJ3aqNRMJ5ClC-DHYdA.woff2)format(\"woff2\");font-display:swap;unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF;font-weight:500;font-style:italic}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Medium Italic),url(/_nuxt/fonts/WvBWEpMh0GHIAGpqPUMY78bL9_LoEQDKSugTtbND-Gw-hEI3quQvUUMagnXpWFrZQqIerqrvJPyvttLONmLIyJ8.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:500;font-style:italic}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Medium Italic),url(/_nuxt/fonts/LtUPvBNCw2mRmTSCUrv_YeRqBX7xHSSUdk52U1zOKFY-3AVjdIdQvFhNIastDeFZR8qe9V_KKIxGcJA0VzJUi_E.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:500;font-style:italic}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Medium Italic),url(/_nuxt/fonts/kqHQLokKhbDhYAECQOy8tl9ltEsY5H0SHs5YVvjw1LY-DEH_xe_HpkDt9DTHbxyxHeV4Ct1N6mL81LzQokJdWc4.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:500;font-style:italic}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono SemiBold Italic),url(/_nuxt/fonts/BzBvP5B6n3wHNSK9KgmBNZ1PczdZ0kq6L6nu_kw03Ug-wV8zARWYtkWLbDq13Xl90XFZKXVs1nvvXB8zvlghsBY.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:600;font-style:italic}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono SemiBold Italic),url(/_nuxt/fonts/p8XC4b0v0m-EiJQAVrKLvU8spsJJrRwg_pQb6ne3LZ8-Xk9a7EzZySU6YDiCY67upfbFiJMXjFXMlVfxZu_bifY.woff2)format(\"woff2\");font-display:swap;unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116;font-weight:600;font-style:italic}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono SemiBold Italic),url(/_nuxt/fonts/uNrZoOJFFhG06f8xJpyWup6Hx8TmDAR6g1B083Ihiak-YOKRRXgcGSy5ObA5GI_ApuS5tJ3aqNRMJ5ClC-DHYdA.woff2)format(\"woff2\");font-display:swap;unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF;font-weight:600;font-style:italic}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono SemiBold Italic),url(/_nuxt/fonts/WvBWEpMh0GHIAGpqPUMY78bL9_LoEQDKSugTtbND-Gw-hEI3quQvUUMagnXpWFrZQqIerqrvJPyvttLONmLIyJ8.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:600;font-style:italic}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono SemiBold Italic),url(/_nuxt/fonts/LtUPvBNCw2mRmTSCUrv_YeRqBX7xHSSUdk52U1zOKFY-3AVjdIdQvFhNIastDeFZR8qe9V_KKIxGcJA0VzJUi_E.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:600;font-style:italic}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono SemiBold Italic),url(/_nuxt/fonts/kqHQLokKhbDhYAECQOy8tl9ltEsY5H0SHs5YVvjw1LY-DEH_xe_HpkDt9DTHbxyxHeV4Ct1N6mL81LzQokJdWc4.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:600;font-style:italic}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Regular),local(JetBrains Mono),url(/_nuxt/fonts/sr4-YXzOS5oe12y9YMYGBmhFhQd5GA1Qg2jPqXf_vgg-l_3Pof0nun2cQotURDGKdEXajlJTkQmaPWMyNbixwUs.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:400;font-style:normal}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Regular),local(JetBrains Mono),url(/_nuxt/fonts/ZDmckrAe5KkZg7oRmja8y8J386eiRioT_oX1sx-uQUI-RNad721svf_ClPMXNl65MSWr3Kjs4qWy3a_LEzQOL8w.woff2)format(\"woff2\");font-display:swap;unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116;font-weight:400;font-style:normal}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Regular),local(JetBrains Mono),url(/_nuxt/fonts/RQ9QFFjRgsXVyz0lHw8ez57FeiQzAb89Xyf5vU5maVg-pg72ynemUWU2h2KQWjiuhgXRXu_VM_YNUN5WfPOOT1M.woff2)format(\"woff2\");font-display:swap;unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF;font-weight:400;font-style:normal}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Regular),local(JetBrains Mono),url(/_nuxt/fonts/9KCRpkmcW_okkHNr8XnT2Or5GlVKmIYYxKd5FYoPWDg-YDD9qUZJ_xItNnR_0ovbhYwdmHMf5touelhWERQfK24.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:400;font-style:normal}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Regular),local(JetBrains Mono),url(/_nuxt/fonts/xHqlKZJFIS6402jbzL4BhtqDi2iwcDgPxe93WbcZ6SY-8WtAIQu51G7odKW44VNvFchd_g_5KgJyLFia_e_GHo0.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:400;font-style:normal}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Regular),local(JetBrains Mono),url(/_nuxt/fonts/PGxXZWn226tHnA2OqxZU7CTUvT6nLXK7MoQbZiEZNy8-erQjQvygkJkW0XY1KA9z_RwUelzNKQYK0ne5Xd6o7WM.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:400;font-style:normal}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Medium),url(/_nuxt/fonts/sr4-YXzOS5oe12y9YMYGBmhFhQd5GA1Qg2jPqXf_vgg-l_3Pof0nun2cQotURDGKdEXajlJTkQmaPWMyNbixwUs.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:500;font-style:normal}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Medium),url(/_nuxt/fonts/ZDmckrAe5KkZg7oRmja8y8J386eiRioT_oX1sx-uQUI-RNad721svf_ClPMXNl65MSWr3Kjs4qWy3a_LEzQOL8w.woff2)format(\"woff2\");font-display:swap;unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116;font-weight:500;font-style:normal}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Medium),url(/_nuxt/fonts/RQ9QFFjRgsXVyz0lHw8ez57FeiQzAb89Xyf5vU5maVg-pg72ynemUWU2h2KQWjiuhgXRXu_VM_YNUN5WfPOOT1M.woff2)format(\"woff2\");font-display:swap;unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF;font-weight:500;font-style:normal}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Medium),url(/_nuxt/fonts/9KCRpkmcW_okkHNr8XnT2Or5GlVKmIYYxKd5FYoPWDg-YDD9qUZJ_xItNnR_0ovbhYwdmHMf5touelhWERQfK24.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:500;font-style:normal}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Medium),url(/_nuxt/fonts/xHqlKZJFIS6402jbzL4BhtqDi2iwcDgPxe93WbcZ6SY-8WtAIQu51G7odKW44VNvFchd_g_5KgJyLFia_e_GHo0.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:500;font-style:normal}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono Medium),url(/_nuxt/fonts/PGxXZWn226tHnA2OqxZU7CTUvT6nLXK7MoQbZiEZNy8-erQjQvygkJkW0XY1KA9z_RwUelzNKQYK0ne5Xd6o7WM.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:500;font-style:normal}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono SemiBold),url(/_nuxt/fonts/sr4-YXzOS5oe12y9YMYGBmhFhQd5GA1Qg2jPqXf_vgg-l_3Pof0nun2cQotURDGKdEXajlJTkQmaPWMyNbixwUs.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:600;font-style:normal}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono SemiBold),url(/_nuxt/fonts/ZDmckrAe5KkZg7oRmja8y8J386eiRioT_oX1sx-uQUI-RNad721svf_ClPMXNl65MSWr3Kjs4qWy3a_LEzQOL8w.woff2)format(\"woff2\");font-display:swap;unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116;font-weight:600;font-style:normal}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono SemiBold),url(/_nuxt/fonts/RQ9QFFjRgsXVyz0lHw8ez57FeiQzAb89Xyf5vU5maVg-pg72ynemUWU2h2KQWjiuhgXRXu_VM_YNUN5WfPOOT1M.woff2)format(\"woff2\");font-display:swap;unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF;font-weight:600;font-style:normal}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono SemiBold),url(/_nuxt/fonts/9KCRpkmcW_okkHNr8XnT2Or5GlVKmIYYxKd5FYoPWDg-YDD9qUZJ_xItNnR_0ovbhYwdmHMf5touelhWERQfK24.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:600;font-style:normal}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono SemiBold),url(/_nuxt/fonts/xHqlKZJFIS6402jbzL4BhtqDi2iwcDgPxe93WbcZ6SY-8WtAIQu51G7odKW44VNvFchd_g_5KgJyLFia_e_GHo0.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:600;font-style:normal}@font-face{font-family:JetBrains Mono;src:local(JetBrains Mono SemiBold),url(/_nuxt/fonts/PGxXZWn226tHnA2OqxZU7CTUvT6nLXK7MoQbZiEZNy8-erQjQvygkJkW0XY1KA9z_RwUelzNKQYK0ne5Xd6o7WM.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:600;font-style:normal}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans Medium Italic),url(/_nuxt/fonts/h0AUkCfyfKyBKdwa_skvQ6DbDtFXLQ_Yy4xUirju9S4-jpeLu7eQ1_3PRT8dJ3oF3lAbnW0HnzvGEAmj9traCno.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:500;font-style:italic}@font-face{font-family:Plus Jakarta Sans Fallback\\: -apple-system;src:local(-apple-system),local(-apple-system Regular),local(-apple-system-Regular),local(System Font),local(\\.SFNS-Regular);size-adjust:112.364%;ascent-override:92.3784%;descent-override:19.7572%;line-gap-override:0%}@font-face{font-family:Plus Jakarta Sans Fallback\\: BlinkMacSystemFont;src:local(BlinkMacSystemFont),local(BlinkMacSystemFont Regular),local(BlinkMacSystemFont-Regular),local(System Font),local(\\.SFNS-Regular);size-adjust:112.364%;ascent-override:92.3784%;descent-override:19.7572%;line-gap-override:0%}@font-face{font-family:Plus Jakarta Sans Fallback\\: Segoe UI;src:local(Segoe UI),local(Segoe UI Regular),local(SegoeUI-Regular),local(SegoeUI);size-adjust:105.558%;ascent-override:98.3348%;descent-override:21.0311%;line-gap-override:0%}@font-face{font-family:Plus Jakarta Sans Fallback\\: Roboto;src:local(Roboto),local(Roboto Regular),local(Roboto-Regular);size-adjust:105.21%;ascent-override:98.6597%;descent-override:21.1006%;line-gap-override:0%}@font-face{font-family:Plus Jakarta Sans Fallback\\: Helvetica Neue;src:local(Helvetica Neue),local(Helvetica Neue Regular),local(HelveticaNeue-Regular),local(HelveticaNeue);size-adjust:104%;ascent-override:99.8077%;descent-override:21.3462%;line-gap-override:0%}@font-face{font-family:Plus Jakarta Sans Fallback\\: Arial;src:local(Arial),local(Arial Regular),local(Arial-Regular),local(ArialMT);size-adjust:104.98%;ascent-override:98.8763%;descent-override:21.147%;line-gap-override:0%}@font-face{font-family:Plus Jakarta Sans Fallback\\: Noto Sans;src:local(Noto Sans),local(Noto Sans Regular),local(NotoSans-Regular);size-adjust:98.7342%;ascent-override:105.131%;descent-override:22.4846%;line-gap-override:0%}@font-face{font-family:Plus Jakarta Sans Fallback\\: Liberation Sans;src:local(Liberation Sans),local(Liberation Sans Regular),local(LiberationSans-Regular);size-adjust:104.98%;ascent-override:98.8763%;descent-override:21.147%;line-gap-override:0%}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans Medium Italic),url(/_nuxt/fonts/EHhMPTZxs1DLFoSCpTpJi7S22G4OhYT8lewk_1xckC8-E9n0RhQShoqM5fLUT_RXtS4T2p_LAiIOBCwztLaRQuE.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:500;font-style:italic}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans Medium Italic),url(/_nuxt/fonts/MDwTfPBLLkOaYY6Syn3fT929XleGt5GMJv6uGhPZd0I-vv5nfMCKpC4Hg3_nmx6d4CQNZ3DqashpQcpoaoxsiuI.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:500;font-style:italic}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans Medium Italic),url(/_nuxt/fonts/vFd0fmDQQ6dUNFYjwFyhfNYWu-rKrxD3zqwr7yfeIbc-0u56STp_ypV_wck1PaUooNhuP_s4aEQjZEEXgQsB7o4.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:500;font-style:italic}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans SemiBold Italic),url(/_nuxt/fonts/h0AUkCfyfKyBKdwa_skvQ6DbDtFXLQ_Yy4xUirju9S4-jpeLu7eQ1_3PRT8dJ3oF3lAbnW0HnzvGEAmj9traCno.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:600;font-style:italic}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans SemiBold Italic),url(/_nuxt/fonts/EHhMPTZxs1DLFoSCpTpJi7S22G4OhYT8lewk_1xckC8-E9n0RhQShoqM5fLUT_RXtS4T2p_LAiIOBCwztLaRQuE.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:600;font-style:italic}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans SemiBold Italic),url(/_nuxt/fonts/MDwTfPBLLkOaYY6Syn3fT929XleGt5GMJv6uGhPZd0I-vv5nfMCKpC4Hg3_nmx6d4CQNZ3DqashpQcpoaoxsiuI.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:600;font-style:italic}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans SemiBold Italic),url(/_nuxt/fonts/vFd0fmDQQ6dUNFYjwFyhfNYWu-rKrxD3zqwr7yfeIbc-0u56STp_ypV_wck1PaUooNhuP_s4aEQjZEEXgQsB7o4.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:600;font-style:italic}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans Bold Italic),url(/_nuxt/fonts/h0AUkCfyfKyBKdwa_skvQ6DbDtFXLQ_Yy4xUirju9S4-jpeLu7eQ1_3PRT8dJ3oF3lAbnW0HnzvGEAmj9traCno.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:700;font-style:italic}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans Bold Italic),url(/_nuxt/fonts/EHhMPTZxs1DLFoSCpTpJi7S22G4OhYT8lewk_1xckC8-E9n0RhQShoqM5fLUT_RXtS4T2p_LAiIOBCwztLaRQuE.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:700;font-style:italic}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans Bold Italic),url(/_nuxt/fonts/MDwTfPBLLkOaYY6Syn3fT929XleGt5GMJv6uGhPZd0I-vv5nfMCKpC4Hg3_nmx6d4CQNZ3DqashpQcpoaoxsiuI.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:700;font-style:italic}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans Bold Italic),url(/_nuxt/fonts/vFd0fmDQQ6dUNFYjwFyhfNYWu-rKrxD3zqwr7yfeIbc-0u56STp_ypV_wck1PaUooNhuP_s4aEQjZEEXgQsB7o4.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:700;font-style:italic}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans ExtraBold Italic),url(/_nuxt/fonts/h0AUkCfyfKyBKdwa_skvQ6DbDtFXLQ_Yy4xUirju9S4-jpeLu7eQ1_3PRT8dJ3oF3lAbnW0HnzvGEAmj9traCno.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:800;font-style:italic}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans ExtraBold Italic),url(/_nuxt/fonts/EHhMPTZxs1DLFoSCpTpJi7S22G4OhYT8lewk_1xckC8-E9n0RhQShoqM5fLUT_RXtS4T2p_LAiIOBCwztLaRQuE.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:800;font-style:italic}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans ExtraBold Italic),url(/_nuxt/fonts/MDwTfPBLLkOaYY6Syn3fT929XleGt5GMJv6uGhPZd0I-vv5nfMCKpC4Hg3_nmx6d4CQNZ3DqashpQcpoaoxsiuI.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:800;font-style:italic}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans ExtraBold Italic),url(/_nuxt/fonts/vFd0fmDQQ6dUNFYjwFyhfNYWu-rKrxD3zqwr7yfeIbc-0u56STp_ypV_wck1PaUooNhuP_s4aEQjZEEXgQsB7o4.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:800;font-style:italic}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans Medium),url(/_nuxt/fonts/5IgvIzWAveoNXlQFVm-aWM8yNj5ha56cFNya7Z9Q_YE-FK1AhkTx9rn_wGOIv9D38I9BXDJWXSSVmaZRw4bsXHg.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:500;font-style:normal}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans Medium),url(/_nuxt/fonts/LlkRNqpUXT184ITHz2ImBS70pPRrIYbBYm5lnR5T2hQ-QqfHOS8AuhvxUBWI2_o7dfCfV6sgPgo8fKatOL_oXaU.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:500;font-style:normal}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans Medium),url(/_nuxt/fonts/Z1Hxuez7RsZqYWJcXrjljtVt8dWJe-fB47SF0b3XCbM-bY_e0N33vFDEeRepazCWL6rGkfqt27UyV0RXQUhhydE.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:500;font-style:normal}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans Medium),url(/_nuxt/fonts/N6a464ONG6G2QwvXkRQxmkb6Upu53F9VINRl-UICiPU-5A74LG92j2E8ztd62HTHyuecPyMCJzc74dIf2kdcJmE.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:500;font-style:normal}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans SemiBold),url(/_nuxt/fonts/5IgvIzWAveoNXlQFVm-aWM8yNj5ha56cFNya7Z9Q_YE-FK1AhkTx9rn_wGOIv9D38I9BXDJWXSSVmaZRw4bsXHg.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:600;font-style:normal}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans SemiBold),url(/_nuxt/fonts/LlkRNqpUXT184ITHz2ImBS70pPRrIYbBYm5lnR5T2hQ-QqfHOS8AuhvxUBWI2_o7dfCfV6sgPgo8fKatOL_oXaU.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:600;font-style:normal}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans SemiBold),url(/_nuxt/fonts/Z1Hxuez7RsZqYWJcXrjljtVt8dWJe-fB47SF0b3XCbM-bY_e0N33vFDEeRepazCWL6rGkfqt27UyV0RXQUhhydE.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:600;font-style:normal}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans SemiBold),url(/_nuxt/fonts/N6a464ONG6G2QwvXkRQxmkb6Upu53F9VINRl-UICiPU-5A74LG92j2E8ztd62HTHyuecPyMCJzc74dIf2kdcJmE.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:600;font-style:normal}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans Bold),url(/_nuxt/fonts/5IgvIzWAveoNXlQFVm-aWM8yNj5ha56cFNya7Z9Q_YE-FK1AhkTx9rn_wGOIv9D38I9BXDJWXSSVmaZRw4bsXHg.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:700;font-style:normal}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans Bold),url(/_nuxt/fonts/LlkRNqpUXT184ITHz2ImBS70pPRrIYbBYm5lnR5T2hQ-QqfHOS8AuhvxUBWI2_o7dfCfV6sgPgo8fKatOL_oXaU.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:700;font-style:normal}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans Bold),url(/_nuxt/fonts/Z1Hxuez7RsZqYWJcXrjljtVt8dWJe-fB47SF0b3XCbM-bY_e0N33vFDEeRepazCWL6rGkfqt27UyV0RXQUhhydE.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:700;font-style:normal}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans Bold),url(/_nuxt/fonts/N6a464ONG6G2QwvXkRQxmkb6Upu53F9VINRl-UICiPU-5A74LG92j2E8ztd62HTHyuecPyMCJzc74dIf2kdcJmE.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:700;font-style:normal}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans ExtraBold),url(/_nuxt/fonts/5IgvIzWAveoNXlQFVm-aWM8yNj5ha56cFNya7Z9Q_YE-FK1AhkTx9rn_wGOIv9D38I9BXDJWXSSVmaZRw4bsXHg.woff2)format(\"woff2\");font-display:swap;unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:800;font-style:normal}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans ExtraBold),url(/_nuxt/fonts/LlkRNqpUXT184ITHz2ImBS70pPRrIYbBYm5lnR5T2hQ-QqfHOS8AuhvxUBWI2_o7dfCfV6sgPgo8fKatOL_oXaU.woff2)format(\"woff2\");font-display:swap;unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB;font-weight:800;font-style:normal}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans ExtraBold),url(/_nuxt/fonts/Z1Hxuez7RsZqYWJcXrjljtVt8dWJe-fB47SF0b3XCbM-bY_e0N33vFDEeRepazCWL6rGkfqt27UyV0RXQUhhydE.woff2)format(\"woff2\");font-display:swap;unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:800;font-style:normal}@font-face{font-family:Plus Jakarta Sans;src:local(Plus Jakarta Sans ExtraBold),url(/_nuxt/fonts/N6a464ONG6G2QwvXkRQxmkb6Upu53F9VINRl-UICiPU-5A74LG92j2E8ztd62HTHyuecPyMCJzc74dIf2kdcJmE.woff2)format(\"woff2\");font-display:swap;unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:800;font-style:normal}";

const STYLE_RE = /<style[^>]*>([\s\S]*?)<\/style>/g;
const FONT_FACE_RE = /@font-face\s*\{[^}]*\}/g;
function isTopLevel(style, index) {
  let depth = 0;
  for (let i = 0; i < index; i++) {
    if (style[i] === "{") {
      depth++;
    } else if (style[i] === "}") {
      depth--;
    }
  }
  return depth === 0;
}
const _GegqTlU9ToUY3v__ethN1Xq3_9K2u1uaW3kOiCfNsc = (nitro) => {
  nitro.hooks.hook("render:html", (html) => {
    {
      html.head.push(`<style>${css}</style>`);
    }
    const seen = /* @__PURE__ */ new Set();
    for (let i = 0; i < html.head.length; i++) {
      html.head[i] = html.head[i].replace(STYLE_RE, (style) => style.replace(FONT_FACE_RE, (rule, index) => {
        if (!isTopLevel(style, index)) {
          return rule;
        }
        if (seen.has(rule)) {
          return "";
        }
        seen.add(rule);
        return rule;
      }));
    }
  });
};

const KNOWN_SEARCH_BOTS = [
  {
    pattern: "googlebot",
    name: "googlebot",
    secondaryPatterns: ["google.com/bot.html"]
  },
  {
    pattern: "bingbot",
    name: "bingbot",
    secondaryPatterns: ["msnbot"]
  },
  {
    pattern: "yandexbot",
    name: "yandexbot"
  },
  {
    pattern: "baiduspider",
    name: "baiduspider",
    secondaryPatterns: ["baidu.com"]
  },
  {
    pattern: "duckduckbot",
    name: "duckduckbot",
    secondaryPatterns: ["duckduckgo.com"]
  },
  {
    pattern: "slurp",
    name: "yahoo"
  },
  {
    pattern: "applebot",
    name: "applebot",
    secondaryPatterns: ["apple.com/go/applebot"]
  }
];
const SOCIAL_BOTS = [
  {
    pattern: "twitterbot",
    name: "twitter",
    secondaryPatterns: ["twitter"]
  },
  {
    pattern: "facebookexternalhit",
    name: "facebook",
    secondaryPatterns: ["facebook.com"]
  },
  {
    pattern: "linkedinbot",
    name: "linkedin",
    secondaryPatterns: ["linkedin"]
  },
  {
    pattern: "pinterestbot",
    name: "pinterest",
    secondaryPatterns: ["pinterest"]
  },
  {
    pattern: "discordbot",
    name: "discord",
    secondaryPatterns: ["discordapp"]
  }
];
const SEO_BOTS = [
  {
    pattern: "mj12bot",
    name: "majestic12",
    secondaryPatterns: ["majestic12.co.uk/bot"]
  },
  {
    pattern: "ahrefsbot",
    name: "ahrefs",
    secondaryPatterns: ["ahrefs.com"]
  },
  {
    pattern: "semrushbot",
    name: "semrush",
    secondaryPatterns: ["semrush.com/bot"]
  },
  {
    pattern: "screaming frog",
    name: "screaming-frog",
    secondaryPatterns: ["screamingfrog.co.uk"]
  },
  {
    pattern: "rogerbot",
    name: "moz"
  }
];
const AI_BOTS = [
  {
    pattern: "anthropic",
    name: "anthropic"
  },
  {
    pattern: "claude",
    name: "claude"
  },
  {
    pattern: "gptbot",
    name: "gpt",
    secondaryPatterns: ["openai.com"]
  },
  {
    pattern: "google-extended",
    name: "google-extended"
  },
  {
    pattern: "applebot-extended",
    name: "applebot-extended"
  },
  {
    pattern: "bytespider",
    name: "bytespider"
  },
  {
    pattern: "diffbot",
    name: "diffbot"
  },
  {
    pattern: "googlebot-news",
    name: "google-news"
  },
  {
    pattern: "cohere",
    name: "cohere",
    secondaryPatterns: ["cohere.com"]
  },
  {
    pattern: "ccbot",
    name: "commoncrawl",
    secondaryPatterns: ["commoncrawl.org"]
  },
  {
    pattern: "perplexitybot",
    name: "perplexity",
    secondaryPatterns: ["perplexity.ai"]
  }
];
const HTTP_TOOL_BOTS = [
  {
    pattern: "python-requests",
    name: "requests",
    secondaryPatterns: ["python"]
  },
  {
    pattern: "wget",
    name: "wget"
  },
  {
    pattern: "curl",
    name: "curl",
    secondaryPatterns: ["curl"]
  }
];
const SECURITY_SCANNING_BOTS = [
  {
    pattern: "zgrab",
    name: "zgrab"
  },
  {
    pattern: "masscan",
    name: "masscan"
  },
  {
    pattern: "nmap",
    name: "nmap",
    secondaryPatterns: ["insecure.org"]
  },
  {
    pattern: "nikto",
    name: "nikto"
  },
  {
    pattern: "wpscan",
    name: "wpscan"
  }
];
const SCRAPING_BOTS = [
  {
    pattern: "scrapy",
    name: "scrapy",
    secondaryPatterns: ["scrapy.org"]
  }
];
const AUTOMATION_BOTS = [
  {
    pattern: "phantomjs",
    name: "phantomjs"
  },
  {
    pattern: "headless",
    name: "headless-browser"
  },
  {
    pattern: "playwright",
    name: "playwright"
  },
  {
    pattern: "selenium",
    name: "selenium",
    secondaryPatterns: ["webdriver"]
  },
  {
    pattern: "puppeteer",
    name: "puppeteer",
    secondaryPatterns: ["headless"]
  }
];
const GENERIC_BOTS = [
  {
    pattern: "bot",
    name: "generic-bot"
  },
  {
    pattern: "spider",
    name: "generic-spider"
  },
  {
    pattern: "crawler",
    name: "generic-crawler"
  },
  {
    pattern: "scraper",
    name: "generic-scraper"
  }
];
const BOT_MAP = [
  {
    type: "search-engine",
    bots: KNOWN_SEARCH_BOTS,
    trusted: true
  },
  {
    type: "social",
    bots: SOCIAL_BOTS,
    trusted: true
  },
  {
    type: "seo",
    bots: SEO_BOTS,
    trusted: true
  },
  {
    type: "ai",
    bots: AI_BOTS,
    trusted: true
  },
  {
    type: "generic",
    bots: GENERIC_BOTS,
    trusted: false
  },
  {
    type: "automation",
    bots: AUTOMATION_BOTS,
    trusted: false
  },
  {
    type: "http-tool",
    bots: HTTP_TOOL_BOTS,
    trusted: false
  },
  {
    type: "security-scanner",
    bots: SECURITY_SCANNING_BOTS,
    trusted: false
  },
  {
    type: "scraping",
    bots: SCRAPING_BOTS,
    trusted: false
  }
];

const defaultBotPattern = /(?=(googlebot)|(google\.com\/bot\.html)|(bingbot)|(msnbot)|(yandexbot)|(baiduspider)|(baidu\.com)|(duckduckbot)|(duckduckgo\.com)|(slurp)|(applebot)|(twitterbot)|(twitter)|(facebookexternalhit)|(facebook\.com)|(linkedinbot)|(linkedin)|(pinterestbot)|(pinterest)|(discordbot)|(discordapp)|(mj12bot)|(majestic12\.co\.uk\/bot)|(ahrefsbot)|(ahrefs\.com)|(semrushbot)|(semrush\.com\/bot)|(screaming frog)|(screamingfrog\.co\.uk)|(rogerbot)|(anthropic)|(claude)|(gptbot)|(openai\.com)|(google-extended)|(bytespider)|(diffbot)|(cohere)|(ccbot)|(commoncrawl\.org)|(perplexitybot)|(perplexity\.ai)|(bot)|(spider)|(crawler)|(scraper)|(phantomjs)|(headless)|(playwright)|(selenium)|(webdriver)|(puppeteer)|(python-requests)|(python)|(wget)|(curl)|(zgrab)|(masscan)|(nmap)|(insecure\.org)|(nikto)|(wpscan)|(scrapy))/g;
const botTargets = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 6, 256, 256, 257, 257, 258, 258, 259, 259, 260, 260, 512, 512, 513, 513, 514, 514, 515, 515, 516, 768, 769, 770, 770, 771, 773, 774, 776, 777, 777, 778, 778, 1024, 1025, 1026, 1027, 1280, 1284, 1282, 1283, 1283, 1284, 1536, 1536, 1537, 1538, 1792, 1793, 1794, 1794, 1795, 1796, 2048];
function matchDefaultBotTarget(value) {
  let bestPriority = -1;
  defaultBotPattern.lastIndex = 0;
  let match = defaultBotPattern.exec(value);
  while (match) {
    let priority = 0;
    while (typeof match[priority + 1] === "undefined")
      priority++;
    if (bestPriority === -1 || priority < bestPriority)
      bestPriority = priority;
    if (bestPriority === 0)
      break;
    defaultBotPattern.lastIndex = match.index + 1;
    match = defaultBotPattern.exec(value);
  }
  return bestPriority === -1 ? void 0 : botTargets[bestPriority];
}

const ROBOT_DIRECTIVE_VALUES = {
  // Standard directives
  enabled: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  disabled: "noindex, nofollow",
  index: "index",
  noindex: "noindex",
  follow: "follow",
  nofollow: "nofollow",
  none: "none",
  all: "all",
  // Non-standard directives (not part of official robots spec)
  noai: "noai",
  noimageai: "noimageai"
};
function formatMaxImagePreview(value) {
  return `max-image-preview:${value}`;
}
function formatMaxSnippet(value) {
  return `max-snippet:${value}`;
}
function formatMaxVideoPreview(value) {
  return `max-video-preview:${value}`;
}
function matches(pattern, path) {
  const pathLength = path.length;
  const patternLength = pattern.length;
  const matchingLengths = Array.from({ length: pathLength + 1 }).fill(0);
  let numMatchingLengths = 1;
  let p = 0;
  while (p < patternLength) {
    if (pattern[p] === "$" && p + 1 === patternLength) {
      return matchingLengths[numMatchingLengths - 1] === pathLength;
    }
    if (pattern[p] === "*") {
      numMatchingLengths = pathLength - matchingLengths[0] + 1;
      for (let i = 1; i < numMatchingLengths; i++) {
        matchingLengths[i] = matchingLengths[i - 1] + 1;
      }
    } else {
      let numMatches = 0;
      for (let i = 0; i < numMatchingLengths; i++) {
        const matchLength = matchingLengths[i];
        if (matchLength < pathLength && path[matchLength] === pattern[p]) {
          matchingLengths[numMatches++] = matchLength + 1;
        }
      }
      if (numMatches === 0) {
        return false;
      }
      numMatchingLengths = numMatches;
    }
    p++;
  }
  return true;
}
function matchPathToRule(path, _rules) {
  let matchedRule = null;
  const rules = _rules.filter(Boolean);
  const rulesLength = rules.length;
  let i = 0;
  while (i < rulesLength) {
    const rule = rules[i];
    if (!rule || !matches(rule.pattern, path)) {
      i++;
      continue;
    }
    if (!matchedRule || rule.pattern.length > matchedRule.pattern.length) {
      matchedRule = rule;
    } else if (rule.pattern.length === matchedRule.pattern.length && rule.allow && !matchedRule.allow) {
      matchedRule = rule;
    }
    i++;
  }
  return matchedRule;
}
function asArray(v) {
  return typeof v === "undefined" ? [] : Array.isArray(v) ? v : [v];
}
function contentUsageToString(prefs) {
  return Object.entries(prefs).filter(([_, value]) => value !== void 0).map(([key, value]) => `${key}=${value}`).join(", ");
}
function normalizeContentPreferences(value) {
  if (!value)
    return [];
  if (Array.isArray(value))
    return value.filter((rule) => Boolean(rule));
  if (typeof value === "object" && !Array.isArray(value)) {
    const str = contentUsageToString(value);
    return str ? [str] : [];
  }
  if (typeof value === "string")
    return value ? [value] : [];
  return [];
}
function normalizeGroup(group) {
  if (group._normalized) {
    const resolvedGroup = group;
    const disallow2 = asArray(resolvedGroup.disallow);
    resolvedGroup._indexable = !disallow2.includes("/");
    resolvedGroup._rules = [
      ...resolvedGroup.disallow.filter(Boolean).map((r) => ({ pattern: r, allow: false })),
      ...resolvedGroup.allow.map((r) => ({ pattern: r, allow: true }))
    ];
    return resolvedGroup;
  }
  const disallow = asArray(group.disallow);
  const allow = asArray(group.allow).filter((rule) => Boolean(rule));
  const contentUsage = normalizeContentPreferences(group.contentUsage);
  const contentSignal = normalizeContentPreferences(group.contentSignal);
  return {
    ...group,
    comment: asArray(group.comment),
    userAgent: group.userAgent ? asArray(group.userAgent) : ["*"],
    disallow,
    allow,
    contentUsage,
    contentSignal,
    _indexable: !disallow.includes("/"),
    _rules: [
      ...disallow.filter(Boolean).map((r) => ({ pattern: r, allow: false })),
      ...allow.map((r) => ({ pattern: r, allow: true }))
    ],
    _normalized: true
  };
}
function generateRobotsTxt({ groups, sitemaps }) {
  const lines = [];
  for (const group of groups) {
    for (const comment of group.comment || [])
      lines.push(`# ${comment}`);
    for (const userAgent of group.userAgent || ["*"])
      lines.push(`User-agent: ${userAgent}`);
    for (const allow of group.allow || [])
      lines.push(`Allow: ${allow}`);
    for (const disallow of group.disallow || [])
      lines.push(`Disallow: ${disallow}`);
    for (const cleanParam of group.cleanParam || [])
      lines.push(`Clean-param: ${cleanParam}`);
    for (const contentUsage of group.contentUsage || [])
      lines.push(`Content-Usage: ${contentUsage}`);
    for (const contentSignal of group.contentSignal || [])
      lines.push(`Content-Signal: ${contentSignal}`);
    lines.push("");
  }
  for (const sitemap of sitemaps)
    lines.push(`Sitemap: ${sitemap}`);
  return lines.join("\n");
}
function createPatternMap() {
  const patternMap = /* @__PURE__ */ new Map();
  for (const def of BOT_MAP) {
    for (const bot of def.bots) {
      const patterns = [bot.pattern, ...bot.secondaryPatterns || []];
      for (const pattern of patterns) {
        patternMap.set(pattern.toLowerCase(), {
          botName: bot.name,
          botCategory: def.type,
          trusted: def.trusted
        });
      }
    }
  }
  return patternMap;
}
function readUserAgent(headers) {
  if (headers instanceof Headers)
    return headers.get("user-agent") || void 0;
  const value = headers["user-agent"] ?? headers[Object.keys(headers).find((key) => key.toLowerCase() === "user-agent") || ""];
  return Array.isArray(value) ? value[0] : value;
}
function isBotFromHeaders(headers, patternMap) {
  const userAgent = readUserAgent(headers);
  if (!userAgent) {
    return { isBot: false };
  }
  const userAgentLower = userAgent.toLowerCase();
  const defaultBotTarget = matchDefaultBotTarget(userAgentLower);
  if (typeof defaultBotTarget !== "undefined") {
    const definition = BOT_MAP[defaultBotTarget >> 8];
    const bot = definition.bots[defaultBotTarget & 255];
    return {
      isBot: true,
      data: {
        botName: bot.name,
        botCategory: definition.type,
        trusted: definition.trusted
      }
    };
  }
  return { isBot: false };
}
function getBotDetection(headers, patternMap) {
  const userAgent = readUserAgent(headers);
  const detection = isBotFromHeaders(headers);
  if (detection.isBot && detection.data) {
    return {
      isBot: true,
      userAgent,
      detectionMethod: "headers",
      botName: detection.data.botName,
      botCategory: detection.data.botCategory,
      trusted: detection.data.trusted
    };
  }
  return {
    isBot: false,
    userAgent
  };
}
function getBotInfo(headers, patternMap) {
  const detection = getBotDetection(headers);
  if (!detection.isBot) {
    return null;
  }
  return {
    name: detection.botName,
    category: detection.botCategory,
    trusted: detection.trusted,
    method: detection.detectionMethod
  };
}
function robotsDirectivesFromObject(obj) {
  const directives = [];
  for (const [key, value] of Object.entries(obj)) {
    if (value === false || value === null || value === void 0)
      continue;
    if (key in ROBOT_DIRECTIVE_VALUES && typeof value === "boolean" && value) {
      directives.push(ROBOT_DIRECTIVE_VALUES[key]);
    } else if (key === "max-image-preview" && typeof value === "string") {
      directives.push(formatMaxImagePreview(value));
    } else if (key === "max-snippet" && typeof value === "number") {
      directives.push(formatMaxSnippet(value));
    } else if (key === "max-video-preview" && typeof value === "number") {
      directives.push(formatMaxVideoPreview(value));
    }
  }
  return directives;
}
function isNoIndexRule(rule) {
  return rule.split(",").some((part) => ["noindex", "none"].includes(part.trim()));
}
function normaliseRobotsRouteRule(config) {
  if (!config)
    return void 0;
  let allow;
  if (typeof config.robots === "boolean")
    allow = config.robots;
  else if (typeof config.robots === "object" && config.robots !== null && "indexable" in config.robots && typeof config.robots.indexable !== "undefined")
    allow = config.robots.indexable;
  let rule;
  if (typeof config.robots === "object" && config.robots !== null) {
    if ("rule" in config.robots && typeof config.robots.rule !== "undefined") {
      rule = config.robots.rule;
    } else if (!("indexable" in config.robots)) {
      const directives = robotsDirectivesFromObject(config.robots);
      if (directives.length > 0) {
        rule = directives.join(", ");
      }
    }
  } else if (typeof config.robots === "string") {
    rule = config.robots;
  }
  if (rule && typeof allow === "undefined") {
    const disallowIndicators = ["none", "noindex"];
    allow = !disallowIndicators.some(
      (indicator) => rule === indicator || rule.split(",").some((part) => part.trim() === indicator)
    );
  }
  if (typeof allow === "undefined" && typeof rule === "undefined")
    return;
  return {
    allow,
    rule
  };
}

function useRuntimeConfigNuxtRobots(_event) {
  return useRuntimeConfig()["nuxt-robots"];
}

async function resolveRobotsTxtContext(e, nitro = useNitroApp()) {
  const { groups, sitemap: sitemaps } = useRuntimeConfigNuxtRobots();
  const generateRobotsTxtCtx = {
    event: e,
    context: e ? "robots.txt" : "init",
    errors: [],
    warnings: [],
    ...JSON.parse(JSON.stringify({ groups, sitemaps }))
  };
  await nitro.hooks.callHook("robots:config", generateRobotsTxtCtx);
  generateRobotsTxtCtx.groups = generateRobotsTxtCtx.groups.map(normalizeGroup);
  if (!e)
    nitro._robots.ctx = generateRobotsTxtCtx;
  return generateRobotsTxtCtx;
}

const _P3zm45gMTeq1U1MDjatqw6sNUh8aHq3HIrCVu2ZE8k = defineNitroPlugin(async (nitroApp) => {
  const { robotsDisabledValue, botDetection } = useRuntimeConfigNuxtRobots();
  if (botDetection !== false) {
    nitroApp._robotsPatternMap = createPatternMap();
  }
  nitroApp._robots = {};
  await resolveRobotsTxtContext(void 0, nitroApp);
});

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
const unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
const reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
const escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
const objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  const counts = /* @__PURE__ */ new Map();
  let logNum = 0;
  function log(message) {
    if (logNum < 100) {
      console.warn(message);
      logNum += 1;
    }
  }
  function walk(thing) {
    if (typeof thing === "function") {
      log(`Cannot stringify a function ${thing.name}`);
      return;
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      const type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          const proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            if (typeof thing.toJSON !== "function") {
              log(`Cannot stringify arbitrary non-POJOs ${thing.constructor.name}`);
            }
          } else if (Object.getOwnPropertySymbols(thing).length > 0) {
            log(`Cannot stringify POJOs with symbolic keys ${Object.getOwnPropertySymbols(thing).map((symbol) => symbol.toString())}`);
          } else {
            Object.keys(thing).forEach((key) => walk(thing[key]));
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    const type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify(thing.valueOf())})`;
      case "RegExp":
        return thing.toString();
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = thing.map((v, i) => i in thing ? stringify(v) : "");
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify).join(",")}])`;
      default:
        if (thing.toJSON) {
          let json = thing.toJSON();
          if (getType(json) === "String") {
            try {
              json = JSON.parse(json);
            } catch (e) {
            }
          }
          return stringify(json);
        }
        if (Object.getPrototypeOf(thing) === null) {
          if (Object.keys(thing).length === 0) {
            return "Object.create(null)";
          }
          return `Object.create(null,{${Object.keys(thing).map((key) => `${safeKey(key)}:{writable:true,enumerable:true,value:${stringify(thing[key])}}`).join(",")}})`;
        }
        return `{${Object.keys(thing).map((key) => `${safeKey(key)}:${stringify(thing[key])}`).join(",")}}`;
    }
  }
  const str = stringify(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (isPrimitive(thing)) {
        values.push(stringifyPrimitive(thing));
        return;
      }
      const type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify(v)}`);
          });
          break;
        case "Set":
          values.push("new Set");
          statements.push(`${name}.${Array.from(thing).map((v) => `add(${stringify(v)})`).join(".")}`);
          break;
        case "Map":
          values.push("new Map");
          statements.push(`${name}.${Array.from(thing).map(([k, v]) => `set(${stringify(k)}, ${stringify(v)})`).join(".")}`);
          break;
        default:
          values.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach((key) => {
            statements.push(`${name}${safeProp(key)}=${stringify(thing[key])}`);
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(";")}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function getName(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string") {
    return stringifyString$6(thing);
  }
  if (thing === void 0) {
    return "void 0";
  }
  if (thing === 0 && 1 / thing < 0) {
    return "-0";
  }
  const str = String(thing);
  if (typeof thing === "number") {
    return str.replace(/^(-)?0\./, "$1.");
  }
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? `.${key}` : `[${escapeUnsafeChars(JSON.stringify(key))}]`;
}
function stringifyString$6(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}

const NUXT_SITE_CONFIG_SSR_DEFAULT = true;

function getSiteRouteRules(event) {
  const routeRules = getRouteRules(event);
  return { site: routeRules.site, ssr: routeRules.ssr ?? NUXT_SITE_CONFIG_SSR_DEFAULT };
}

function getSiteConfig(e, _options) {
  e.context.siteConfig = e.context.siteConfig || createSiteConfigStack();
  const options = defu(_options, useRuntimeConfig()["nuxt-site-config"], { debug: false });
  return e.context.siteConfig.get(options);
}

const _HjximyGtxaKzmG6qKpPKryiwZpReNVn9DUQv2_r4t0U = defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook("render:html", async (ctx, { event }) => {
    const routeOptions = getSiteRouteRules(event);
    const isIsland = process.env.NUXT_COMPONENT_ISLANDS && event.path.startsWith("/__nuxt_island");
    event.path;
    const noSSR = !!process.env.NUXT_NO_SSR || event.context.nuxt?.noSSR || routeOptions.ssr === false && !isIsland || (false);
    if (noSSR) {
      const siteConfig = Object.fromEntries(
        Object.entries(getSiteConfig(event)).map(([k, v]) => [k, toValue(v)])
      );
      ctx.body.push(`<script>window.__NUXT_SITE_CONFIG__=${devalue(siteConfig)}<\/script>`);
    }
  });
});

function getRuntimeConfigSkewProtection(_event) {
  const config = useRuntimeConfig();
  return config.public.skewProtection;
}

function getSkewProtectionCookieName(event) {
  const { cookie } = getRuntimeConfigSkewProtection();
  return cookie === false ? void 0 : cookie.name;
}

function isDocumentRequest(request) {
  if (request.secFetchDest)
    return request.secFetchDest === "document";
  return request.accept?.includes("text/html") === true;
}
function directive(value, name) {
  const match = value.match(new RegExp(`(?:^|[,\\s])${name}=(\\d+)`, "i"));
  return match ? Number(match[1]) : void 0;
}
function sharedCacheSeconds(cacheControl) {
  const raw = Array.isArray(cacheControl) ? cacheControl.join(", ") : cacheControl;
  if (typeof raw !== "string" || !raw)
    return null;
  const value = raw.toLowerCase();
  if (value.includes("no-store") || value.includes("private"))
    return null;
  const shared = directive(value, "s-maxage") ?? directive(value, "max-age");
  if (shared === void 0 || shared <= 0)
    return null;
  return shared + (directive(value, "stale-while-revalidate") ?? 0);
}
function resolveHtmlCachePolicy(request, response) {
  if (request.method !== "GET" && request.method !== "HEAD")
    return { _tag: "skipped", reason: "not-cacheable-method" };
  if (!isDocumentRequest(request))
    return { _tag: "skipped", reason: "not-document" };
  if (request.cookie)
    return { _tag: "skipped", reason: "request-has-cookie" };
  if (request.authorization)
    return { _tag: "skipped", reason: "request-is-authenticated" };
  if (response.status !== 200)
    return { _tag: "skipped", reason: "not-ok-status" };
  const seconds = sharedCacheSeconds(response.cacheControl);
  if (seconds === null)
    return { _tag: "skipped", reason: "no-shared-cache-directive" };
  return { _tag: "shared-cacheable", seconds };
}
function withoutCookie(setCookie, name) {
  if (!setCookie)
    return [];
  const all = Array.isArray(setCookie) ? setCookie : [setCookie];
  return all.filter((entry) => !entry.trimStart().toLowerCase().startsWith(`${name.toLowerCase()}=`));
}
const SHARED_CACHE_CONTROL_HEADERS = [
  "cloudflare-cdn-cache-control",
  "cdn-cache-control",
  "cache-control"
];
function sharedCacheControlHeader(getHeader) {
  for (const name of SHARED_CACHE_CONTROL_HEADERS) {
    const value = getHeader(name);
    if (value !== void 0)
      return { name, value };
  }
  return null;
}
function htmlCacheRequestFromEvent(event, getHeader) {
  return {
    method: event.method ?? event.node?.req?.method ?? "GET",
    secFetchDest: getHeader(event, "sec-fetch-dest"),
    accept: getHeader(event, "accept"),
    cookie: getHeader(event, "cookie"),
    authorization: getHeader(event, "authorization") ?? getHeader(event, "proxy-authorization")
  };
}
function readSetCookies(event, fallback) {
  const headers = event.res?.headers;
  if (headers && typeof headers.getSetCookie === "function")
    return headers.getSetCookie();
  if (Array.isArray(fallback))
    return fallback;
  return fallback === void 0 || fallback === "" ? [] : [String(fallback)];
}

const _rTHIzEztihvQQ5LFVqwkVt8qSp55bozwKxsOXmw = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("beforeResponse", (event, response) => {
    const nativeResponse = response?.body instanceof Response ? response.body : void 0;
    const cacheControl = sharedCacheControlHeader((name2) => nativeResponse?.headers.get(name2) ?? getResponseHeader(event, name2));
    const decision = resolveHtmlCachePolicy(
      htmlCacheRequestFromEvent(event, getHeader),
      {
        status: nativeResponse?.status ?? getResponseStatus(event),
        cacheControl: cacheControl?.value
      }
    );
    if (decision._tag !== "shared-cacheable")
      return;
    const name = getSkewProtectionCookieName();
    if (!name)
      return;
    if (nativeResponse) {
      const nativeCookies = nativeResponse.headers.getSetCookie();
      const remainingNativeCookies = withoutCookie(nativeCookies, name);
      if (remainingNativeCookies.length !== nativeCookies.length) {
        nativeResponse.headers.delete("set-cookie");
        for (const cookie of remainingNativeCookies)
          nativeResponse.headers.append("set-cookie", cookie);
      }
    }
    const cookies = readSetCookies(
      event,
      getResponseHeader(event, "set-cookie")
    );
    const remaining = withoutCookie(cookies, name);
    if (remaining.length === cookies.length)
      return;
    removeResponseHeader(event, "set-cookie");
    for (const cookie of remaining)
      appendResponseHeader(event, "set-cookie", cookie);
  });
});

const STATUS_AWARE_LINK_HEADER = "nuxt-ai-ready:status-aware-link-header";
const ERROR_LINK_HEADER = "x-nuxt-ai-ready-error-link";
function setStatusAwareLinkHeader(event, safeHeader, successHeader) {
  event.context[STATUS_AWARE_LINK_HEADER] = {
    error: safeHeader,
    success: successHeader ?? safeHeader
  };
  setHeader(event, "link", safeHeader);
}
const _M4cJJb6bKazSTnV8NDV7__xmtafAyJYeWzc9AR6UU28 = defineNitroPlugin((nitro) => {
  nitro.hooks.hook("error", (_error, { event }) => {
    if (!event)
      return;
    const header = event.context[STATUS_AWARE_LINK_HEADER];
    if (header)
      event.node.req.headers[ERROR_LINK_HEADER] = header.error;
  });
  nitro.hooks.hook("beforeResponse", (event) => {
    if (event.node.res.headersSent)
      return;
    const header = event.context[STATUS_AWARE_LINK_HEADER];
    if (!header)
      return;
    setHeader(event, "link", getResponseStatus(event) >= 400 ? header.error : header.success);
  });
  nitro.hooks.hook("render:html", (_html, { event }) => {
    const header = event.context[STATUS_AWARE_LINK_HEADER];
    const errorHeader = event.path.startsWith("/__nuxt_error") ? getHeader(event, ERROR_LINK_HEADER) : void 0;
    if (errorHeader) {
      setHeader(event, "link", errorHeader);
      return;
    }
    if (header)
      setHeader(event, "link", getResponseStatus(event) >= 400 ? header.error : header.success);
  });
});

function parseSerializedRegExp(value) {
  const lastSlash = value.lastIndexOf("/");
  return new RegExp(value.slice(1, lastSlash), value.slice(lastSlash + 1));
}
function deserializeFilters(filters) {
  return filters.map((filter) => {
    if (filter instanceof RegExp || typeof filter === "string")
      return filter;
    if (typeof filter.regex === "string")
      return parseSerializedRegExp(filter.regex);
    if (typeof filter.source === "string")
      return new RegExp(filter.source, filter.flags || "");
    return filter;
  });
}
function createFilter(options = {}) {
  const include = deserializeFilters(options.include || []);
  const exclude = deserializeFilters(options.exclude || []);
  if (include.length === 0 && exclude.length === 0)
    return () => true;
  const excludeRegex = exclude.filter((r) => r instanceof RegExp);
  const includeRegex = include.filter((r) => r instanceof RegExp);
  const excludeStrings = exclude.filter((r) => typeof r === "string");
  const includeStrings = include.filter((r) => typeof r === "string");
  const excludeMatcher = excludeStrings.length > 0 ? toRouteMatcher(createRouter$1({
    routes: Object.fromEntries(excludeStrings.map((r) => [r, true])),
    strictTrailingSlash: false
  })) : null;
  const includeMatcher = includeStrings.length > 0 ? toRouteMatcher(createRouter$1({
    routes: Object.fromEntries(includeStrings.map((r) => [r, true])),
    strictTrailingSlash: false
  })) : null;
  const excludeExact = new Set(excludeStrings);
  const includeExact = new Set(includeStrings);
  return function(path) {
    if (excludeRegex.some((r) => r.test(path)))
      return false;
    if (excludeExact.has(path))
      return false;
    if (excludeMatcher && excludeMatcher.matchAll(path).length > 0)
      return false;
    if (includeRegex.some((r) => r.test(path)))
      return true;
    if (includeExact.has(path))
      return true;
    if (includeMatcher && includeMatcher.matchAll(path).length > 0)
      return true;
    return include.length === 0;
  };
}
function createModuleLogger(tag, debug) {
  return createConsola({ level: debug ? 4 : 3, defaults: { tag } });
}

const logger$1 = createModuleLogger('nuxt-ai-ready', false);

function publicCacheControl(maxAgeSeconds, staleSeconds) {
  return staleSeconds > 0 ? `public, max-age=${maxAgeSeconds}, stale-while-revalidate=${staleSeconds}` : `public, max-age=${maxAgeSeconds}`;
}
function mergeVaryHeader(current, added) {
  const tokens = [...(current || "").split(","), ...added.split(",")].map((token) => token.trim()).filter(Boolean);
  if (tokens.includes("*"))
    return "*";
  const unique = /* @__PURE__ */ new Map();
  for (const token of tokens) {
    if (!unique.has(token.toLowerCase()))
      unique.set(token.toLowerCase(), token);
  }
  return [...unique.values()].join(", ");
}

async function serveCloudflarePrerenderedPage(event) {
  if (event.method !== "GET" && event.method !== "HEAD")
    return;
  const config = useRuntimeConfig$1(event)["nuxt-ai-ready"];
  const url = getRequestURL(event);
  if (!config.cloudflarePrerenderedPages?.includes(url.pathname))
    return;
  const assets = event.context.cloudflare?.env?.ASSETS;
  if (!assets)
    return;
  const response = await assets.fetch(new Request(url, { method: event.method, headers: getRequestHeaders(event) }));
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(getResponseHeaders(event))) {
    if (value === void 0)
      continue;
    const header = Array.isArray(value) ? value.join(", ") : String(value);
    headers.set(name, name.toLowerCase() === "vary" ? mergeVaryHeader(headers.get(name) ?? void 0, header) : header);
  }
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function withoutQuery$2(path) {
  const queryIndex = path.indexOf("?");
  return queryIndex === -1 ? path : path.slice(0, queryIndex);
}
function createNitroRouteRuleMatcher(runtimeConfig) {
  const { nitro, app } = runtimeConfig;
  const baseURL = app?.baseURL || "/";
  const _routeRulesMatcher = toRouteMatcher(
    createRouter$1({
      routes: Object.fromEntries(
        Object.entries(nitro?.routeRules || {}).map(([path, rules]) => [withoutTrailingSlash(path), rules])
      )
    })
  );
  return (pathOrUrl) => {
    const path = pathOrUrl[0] === "/" ? pathOrUrl : parseURL(pathOrUrl, baseURL).pathname;
    return defu({}, ..._routeRulesMatcher.matchAll(
      withoutBase(withoutTrailingSlash(withoutQuery$2(path)), baseURL)
    ).reverse());
  };
}

const localAgentSkillArtifacts = {};

const FILE_EXT_RE = /\.[0-9a-z]+$/i;
function resolveSitePath(pathOrUrl, options) {
  let path = pathOrUrl;
  if (hasProtocol(pathOrUrl, { strict: false, acceptRelative: true })) {
    const parsed = parseURL(pathOrUrl);
    path = parsed.pathname;
  }
  const base = withLeadingSlash(options.base || "/");
  if (base !== "/" && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  let origin = withoutTrailingSlash(options.absolute ? options.siteUrl : "");
  if (base !== "/" && origin.endsWith(base)) {
    origin = origin.slice(0, origin.indexOf(base));
  }
  const baseWithOrigin = options.withBase ? withBase(base, origin || "/") : origin;
  const resolvedUrl = withBase(path, baseWithOrigin);
  return path === "/" && !options.withBase ? withTrailingSlash(resolvedUrl) : fixSlashes(options.trailingSlash, resolvedUrl);
}
const fileExtensions = [
  // Images
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "webp",
  "svg",
  "ico",
  // Documents
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "txt",
  "md",
  "markdown",
  // Archives
  "zip",
  "rar",
  "7z",
  "tar",
  "gz",
  // Audio
  "mp3",
  "wav",
  "flac",
  "ogg",
  "opus",
  "m4a",
  "aac",
  "midi",
  "mid",
  // Video
  "mp4",
  "avi",
  "mkv",
  "mov",
  "wmv",
  "flv",
  "webm",
  // Web
  "html",
  "css",
  "js",
  "json",
  "xml",
  "tsx",
  "jsx",
  "ts",
  "vue",
  "svelte",
  "xsl",
  "rss",
  "atom",
  // Programming
  "php",
  "py",
  "rb",
  "java",
  "c",
  "cpp",
  "h",
  "go",
  // Data formats
  "csv",
  "tsv",
  "sql",
  "yaml",
  "yml",
  // Fonts
  "woff",
  "woff2",
  "ttf",
  "otf",
  "eot",
  // Executables/Binaries
  "exe",
  "msi",
  "apk",
  "ipa",
  "dmg",
  "iso",
  "bin",
  // Scripts/Config
  "bat",
  "cmd",
  "sh",
  "env",
  "htaccess",
  "conf",
  "toml",
  "ini",
  // Package formats
  "deb",
  "rpm",
  "jar",
  "war",
  // E-books
  "epub",
  "mobi",
  // Common temporary/backup files
  "log",
  "tmp",
  "bak",
  "old",
  "sav"
];
function isPathFile(path) {
  const lastSegment = path.split("/").pop();
  const ext = (lastSegment || path).match(FILE_EXT_RE)?.[0];
  return !!(ext && fileExtensions.includes(ext.replace(".", "")));
}
function fixSlashes(trailingSlash, pathOrUrl) {
  const $url = parseURL(pathOrUrl);
  if (isPathFile($url.pathname))
    return pathOrUrl;
  const fixedPath = trailingSlash ? withTrailingSlash($url.pathname) : withoutTrailingSlash($url.pathname);
  return `${$url.protocol ? `${$url.protocol}//` : ""}${$url.host || ""}${fixedPath}${$url.search || ""}${$url.hash || ""}`;
}

function getNitroOrigin(event) {
  if (event?.context.siteConfigNitroOrigin)
    return event.context.siteConfigNitroOrigin;
  const headers = event?.req?.headers;
  const forwardedHost = headers?.get("x-forwarded-host")?.split(",")[0]?.trim();
  const forwardedProtocol = headers?.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const requestProtocol = event?.req ? new URL(event.req.url).protocol.slice(0, -1) : void 0;
  return getNitroOrigin$1({
    isDev: false,
    isPrerender: false,
    requestHost: forwardedHost || headers?.get("host") || void 0,
    requestProtocol: forwardedProtocol === "https" || forwardedProtocol === "http" ? forwardedProtocol : requestProtocol
  });
}

function createSitePathResolver(e, options = {}) {
  const siteConfig = getSiteConfig(e);
  const nitroOrigin = getNitroOrigin(e);
  const nuxtBase = useRuntimeConfig().app.baseURL || "/";
  return (path) => {
    return resolveSitePath(path, {
      ...options,
      siteUrl: options.canonical !== false || false ? siteConfig.url || nitroOrigin : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      base: nuxtBase
    });
  };
}
function withSiteTrailingSlash(e, path) {
  const siteConfig = getSiteConfig(e);
  return fixSlashes(siteConfig.trailingSlash, path);
}
function withSiteUrl(e, path, options = {}) {
  const siteConfig = getSiteConfig(e);
  let siteUrl = getNitroOrigin(e);
  if ((options.canonical !== false || false) && siteConfig.url)
    siteUrl = siteConfig.url;
  return resolveSitePath(path, {
    absolute: true,
    siteUrl,
    trailingSlash: siteConfig.trailingSlash,
    base: useRuntimeConfig().app.baseURL || "/",
    withBase: options.withBase
  });
}

const RE_TRAILING_SLASHES = /\/+$/;
const RE_FILE_EXTENSION = /\.[a-z][a-z\d]*$/i;
const RE_RESERVED_PATH = /^\/(?:api(?:\/|$)|_|@(?:id|fs|vite|react-refresh)(?:\/|$))/;
function isReservedPath(path) {
  return RE_RESERVED_PATH.test(path);
}
function normalizePagePath(path) {
  return path.replace(RE_TRAILING_SLASHES, "") || "/";
}
function toMarkdownPath(path) {
  const normalizedPath = normalizePagePath(path);
  if (normalizedPath === "/")
    return "/index.md";
  return `${normalizedPath}.md`;
}
function hasMarkdownTwin(path) {
  const lastSegment = normalizePagePath(path).split("/").pop() || "";
  return !isReservedPath(path) && !RE_FILE_EXTENSION.test(lastSegment);
}
function markdownAlternatePath(path) {
  return hasMarkdownTwin(path) ? toMarkdownPath(path) : null;
}

function toLogicalRoute(pathOrUrl, baseURL) {
  const pathname = withLeadingSlash(parseURL(pathOrUrl).pathname);
  return normalizePagePath(withoutBase(pathname, baseURL));
}
function toDeployedRoute(route, baseURL) {
  return joinURL(baseURL, withLeadingSlash(route));
}
function normalizePersistedRoute(route, sitemapRoutes, baseURL) {
  const normalizedRoute = normalizePagePath(withLeadingSlash(parseURL(route).pathname));
  if (sitemapRoutes.has(normalizedRoute))
    return normalizedRoute;
  const logicalRoute = toLogicalRoute(normalizedRoute, baseURL);
  return sitemapRoutes.has(logicalRoute) ? logicalRoute : normalizedRoute;
}

function resolveLocaleAlternateUrl(alternate, resolveUrl) {
  const resolved = resolveUrl(alternate.path);
  if (!alternate.domain)
    return resolved;
  const origin = /^[a-z][a-z\d+.-]*:\/\//i.test(alternate.domain) ? alternate.domain : `https://${alternate.domain}`;
  const deployed = new URL(resolved, "http://nuxtseo.local");
  return new URL(`${deployed.pathname}${deployed.search}${deployed.hash}`, origin).href;
}

const unavailable$1 = () => {
  throw new Error('[nuxt-ai-ready] i18n runtime called without i18n configuration.')
};

function encodePathForHeader(path) {
  return encodeURI(path);
}
const LLMS_TXT_PATH = "/llms.txt";
function resolveHeaderUrl(path, resolveUrl) {
  if (!resolveUrl)
    return path;
  try {
    return resolveUrl(path);
  } catch {
    return path;
  }
}
function buildBaseParts(path, variant, config, resolveUrl) {
  const parts = [];
  if (variant === "html") {
    const href = resolveHeaderUrl(toMarkdownPath(path), resolveUrl);
    parts.push(`<${encodePathForHeader(href)}>; rel="alternate"; type="text/markdown"`);
  } else {
    const href = resolveHeaderUrl(path, resolveUrl);
    parts.push(`<${encodePathForHeader(href)}>; rel="alternate"; type="text/html"`);
    parts.push(`<${encodePathForHeader(href)}>; rel="canonical"`);
  }
  if (config.describedby !== false) {
    const href = resolveHeaderUrl(LLMS_TXT_PATH, resolveUrl);
    parts.push(`<${encodePathForHeader(href)}>; rel="describedby"`);
  }
  return parts;
}
function appendLocaleParts(parts, path, variant, config, resolveUrl, routeContext) {
  if (config.i18n) {
    const alternates = unavailable$1(path, config.i18n);
    for (const alt of alternates) {
      const alternatePath = variant === "markdown" ? toMarkdownPath(alt.path) : alt.path;
      const href = resolveLocaleAlternateUrl(
        { ...alt, path: alternatePath },
        (candidate) => resolveHeaderUrl(candidate, resolveUrl)
      );
      parts.push(`<${encodePathForHeader(href)}>; rel="alternate"; hreflang="${alt.hreflang}"`);
    }
  }
}
function appendCatalogPart(parts, config) {
  if (config.apiCatalog) {
    const catalog = `<${encodePathForHeader(config.apiCatalog.href)}>; rel="api-catalog"`;
    parts.push(catalog);
    return catalog;
  }
}
function buildLinkHeader(path, variant, config, resolveUrl, routeContext = {}) {
  const parts = buildBaseParts(path, variant, config, resolveUrl);
  appendLocaleParts(parts, path, variant, config, resolveUrl);
  appendCatalogPart(parts, config);
  return parts.join(", ");
}
function buildStatusAwareLinkHeaders(path, variant, config, resolveUrl, routeContext = {}) {
  const parts = buildBaseParts(path, variant, config, resolveUrl);
  const safeParts = parts.slice();
  const catalog = appendCatalogPart(safeParts, config);
  const error = safeParts.join(", ");
  if (!config.i18n)
    return { error, success: error };
  appendLocaleParts(parts, path, variant, config, resolveUrl);
  if (catalog)
    parts.push(catalog);
  return { error, success: parts.join(", ") };
}

const RE_MD_EXT = /\.md$/;
function toMarkdownRequest(event, isPrerender = false) {
  return { path: event.path, headers: getHeaders(event), isPrerender };
}
function negotiateRequestRepresentation(request, botNegotiation = false) {
  if (request.isPrerender || request.headers["x-nitro-prerender"])
    return "html";
  const accept = request.headers.accept;
  const preference = negotiateContent(accept);
  if (!botNegotiation || preference !== "html" || request.headers["sec-fetch-dest"] === "document")
    return preference;
  const entries = parseAcceptHeader(accept?.toLowerCase() || "");
  const matching = ["text/markdown", "text/*", "*/*"].map((type) => entries.filter((entry) => entry.type === type)).find((group) => group.length > 0);
  if (matching && matching.every((entry) => entry.q === 0))
    return preference;
  const botInfo = getBotInfo(request.headers);
  if (botInfo?.category === "ai")
    return "markdown";
  return preference;
}
function getRequestRenderInfo(request, mode = { _tag: "runtime", contentNegotiation: true }) {
  const queryIndex = request.path.indexOf("?");
  const originalPath = queryIndex === -1 ? request.path : request.path.slice(0, queryIndex);
  const isPrerender = mode._tag === "prerender";
  if (isReservedPath(originalPath.replace(RE_MD_EXT, "")))
    return null;
  const accept = request.headers.accept || "";
  if (!originalPath.endsWith(".md") && accept && /\b(?:application\/json|text\/event-stream)\b/i.test(accept) && !/text\/(?:html|markdown|plain)\b|\*\/\*/i.test(accept)) {
    return null;
  }
  const isExplicit = originalPath.endsWith(".md");
  if (isPrerender && !isExplicit)
    return null;
  if (!isExplicit && !hasMarkdownTwin(originalPath))
    return null;
  const negotiation = isPrerender ? "markdown" : mode.contentNegotiation ? negotiateRequestRepresentation(request, mode.botNegotiation) : "html";
  if (isExplicit) {
    const path = normalizePath(originalPath.slice(0, -3));
    return { path, isExplicit: true, negotiation: "markdown" };
  }
  if (negotiation === "not-acceptable")
    return { notAcceptable: true };
  return { path: normalizePath(originalPath), isExplicit: false, negotiation };
}
function normalizePath(path) {
  if (path.endsWith("/index"))
    return path.slice(0, -5) || "/";
  return path;
}

function getContentNegotiationVary(botNegotiation = false) {
  return botNegotiation ? "Accept, Sec-Fetch-Dest, User-Agent" : "Accept";
}
function cachesWithoutNegotiationVariation(cache, botNegotiation) {
  if (!cache)
    return false;
  if (typeof cache !== "object")
    return true;
  if (cache.headersOnly)
    return false;
  const varies = new Set(cache.varies?.map((header) => header.toLowerCase()));
  return getContentNegotiationVary(botNegotiation).split(",").some((header) => !varies.has(header.trim().toLowerCase()));
}
function resolveContentNegotiation(input) {
  if (input.policy === "enabled")
    return { _tag: "enabled", source: "explicit", vary: getContentNegotiationVary(input.botNegotiation) };
  if (input.policy === "disabled")
    return { _tag: "disabled", source: "explicit" };
  if (input.routeRule.isr)
    return { _tag: "disabled", source: "isr" };
  if (cachesWithoutNegotiationVariation(input.routeRule.cache, input.botNegotiation === true))
    return { _tag: "disabled", source: "route-cache" };
  return { _tag: "enabled", source: "default", vary: getContentNegotiationVary(input.botNegotiation) };
}

const INTERNAL_HEADER = "x-ai-ready-internal";
function resolveNegotiationDecision(input) {
  const { request, stage } = input;
  const path = withoutQuery$1(request.path);
  if (path.startsWith("/.well-known/"))
    return { _tag: "skip", reason: "well-known" };
  if (input.artifactPaths?.has(path))
    return { _tag: "skip", reason: "artifact" };
  if (request.headers[INTERNAL_HEADER])
    return { _tag: "skip", reason: "internal" };
  const negotiation = resolveContentNegotiation({ policy: input.policy, routeRule: input.routeRule, botNegotiation: input.botNegotiation });
  const renderInfo = getRequestRenderInfo(request, {
    _tag: "runtime",
    contentNegotiation: negotiation._tag === "enabled",
    botNegotiation: input.botNegotiation
  });
  if (!renderInfo)
    return { _tag: "skip", reason: "not-a-page" };
  if ("notAcceptable" in renderInfo)
    return { _tag: "not-acceptable", vary: getContentNegotiationVary(input.botNegotiation) };
  if (renderInfo.isExplicit) {
    return stage === "early" ? { _tag: "skip", reason: "deferred" } : { _tag: "render", path: renderInfo.path };
  }
  if (renderInfo.negotiation === "markdown")
    return { _tag: "redirect", path: renderInfo.path, vary: getContentNegotiationVary(input.botNegotiation) };
  return { _tag: "html", path: renderInfo.path, negotiation };
}
function withoutQuery$1(path) {
  const queryIndex = path.indexOf("?");
  return queryIndex === -1 ? path : path.slice(0, queryIndex);
}

const APPLIED_KEY = "nuxt-ai-ready:negotiation-applied";
let artifactPaths;
function agentSkillArtifactPaths() {
  artifactPaths ??= new Set(Object.keys(localAgentSkillArtifacts));
  return artifactPaths;
}
function createHeaderUrlResolver(event, ctx) {
  if (!createSitePathResolver)
    return ctx.resolveUrl;
  let resolveUrl;
  return (path) => {
    resolveUrl ??= createSitePathResolver(event, { absolute: true, withBase: true });
    return resolveUrl(ctx.resolvePath(path));
  };
}
function setLinkHeader(event, ctx, variant) {
  setHeader(event, "link", buildLinkHeader(ctx.path, variant, ctx.config, createHeaderUrlResolver(event, ctx), ctx.routeContext));
}
function setStatusAwareHeader(event, ctx, variant) {
  if (!ctx.config.i18n) {
    setLinkHeader(event, ctx, variant);
    return;
  }
  const headers = buildStatusAwareLinkHeaders(ctx.path, variant, ctx.config, createHeaderUrlResolver(event, ctx), ctx.routeContext);
  setStatusAwareLinkHeader(event, headers.error, headers.success);
}
function setUncacheableHeaders(event) {
  setHeader(event, "cache-control", "private, no-store");
  setHeader(event, "cdn-cache-control", "no-store");
  for (const header of [
    "cloudflare-cdn-cache-control",
    "netlify-cdn-cache-control",
    "vercel-cdn-cache-control",
    "surrogate-control"
  ]) {
    if (getResponseHeader(event, header) !== void 0)
      setHeader(event, header, "no-store");
  }
}
function setMarkdownHeaders(event, ctx, sourceHeaders) {
  setHeader(event, "content-type", "text/markdown; charset=utf-8");
  const sourcePolicy = sourceHeaders?.get("content-signal");
  if (sourcePolicy !== null && sourcePolicy !== void 0 && getResponseHeader(event, "content-signal") === void 0)
    setHeader(event, "content-signal", sourcePolicy);
  const vary = [getResponseHeader(event, "vary"), sourceHeaders?.get("vary")].filter(Boolean).join(", ");
  setHeader(event, "vary", mergeVaryHeader(vary, "Accept"));
  setLinkHeader(event, ctx, "markdown");
  const privateResponse = [
    "cache-control",
    "cdn-cache-control",
    "cloudflare-cdn-cache-control",
    "netlify-cdn-cache-control",
    "vercel-cdn-cache-control",
    "surrogate-control"
  ].some((header) => {
    const value = `${getResponseHeader(event, header) || ""},${sourceHeaders?.get(header) || ""}`;
    return /(?:^|,)\s*(?:private|no-store|no-cache)\s*(?:,|=|$)/i.test(value);
  });
  if (getHeader(event, "cookie") || getHeader(event, "authorization") || getResponseHeader(event, "set-cookie") || sourceHeaders?.has("set-cookie") || privateResponse) {
    setUncacheableHeaders(event);
    return;
  }
  const cacheHeaders = ctx.config.markdownCacheHeaders;
  if (cacheHeaders) {
    const { maxAge, swr } = cacheHeaders;
    setHeader(event, "cache-control", swr ? `public, max-age=${maxAge}, stale-while-revalidate=${maxAge}` : `public, max-age=${maxAge}`);
  }
}
async function ensureSiteConfig(event) {
  if (!event.context._initedSiteConfig)
    await initRequestSiteConfig(event, getRequestURL(event, { xForwardedHost: true, xForwardedProto: true }).origin, createNitroRouteRuleMatcher(useRuntimeConfig$1(event))(event.path));
}
function buildNegotiationContext(event, path) {
  const runtimeConfig = useRuntimeConfig$1(event);
  const baseURL = runtimeConfig.app.baseURL;
  const resolvePath = (target) => toDeployedRoute(target, baseURL);
  return {
    config: runtimeConfig["nuxt-ai-ready"],
    path,
    resolvePath,
    resolveUrl: (target) => withSiteUrl(event, resolvePath(target), { withBase: true }),
    routeContext: { host: getRequestHost(event, { xForwardedHost: true }) }
  };
}
const REQUEST_DECISION = Symbol("nuxt-ai-ready:negotiation");
let matcherCache;
function getRouteRuleMatcher(runtimeConfig) {
  if (matcherCache?.config !== runtimeConfig)
    matcherCache = { config: runtimeConfig, match: createNitroRouteRuleMatcher(runtimeConfig) };
  return matcherCache.match;
}
function decideNegotiation(event, stage) {
  const runtimeConfig = useRuntimeConfig$1(event);
  const config = runtimeConfig["nuxt-ai-ready"];
  const context = event.context;
  const owner = event.node?.req ?? event.req ?? event;
  let cached = context[REQUEST_DECISION];
  if (!cached || cached.owner !== owner || cached.path !== event.path || cached.policy !== config.contentNegotiation || cached.botNegotiation !== config.botNegotiation) {
    cached = {
      owner,
      path: event.path,
      policy: config.contentNegotiation,
      botNegotiation: config.botNegotiation,
      decision: resolveNegotiationDecision({
        stage: "middleware",
        request: toMarkdownRequest(event),
        routeRule: getRouteRuleMatcher(runtimeConfig)(event.path),
        policy: config.contentNegotiation,
        botNegotiation: config.botNegotiation,
        artifactPaths: agentSkillArtifactPaths()
      })
    };
    context[REQUEST_DECISION] = cached;
  }
  return stage === "early" && cached.decision._tag === "render" ? { _tag: "skip", reason: "deferred" } : cached.decision;
}
async function applyNegotiation(event, decision) {
  if (decision._tag === "skip" || decision._tag === "render")
    return;
  const context = event.context;
  if (context[APPLIED_KEY])
    return;
  context[APPLIED_KEY] = true;
  if (decision._tag === "not-acceptable") {
    appendHeader(event, "vary", decision.vary);
    setUncacheableHeaders(event);
    throw createError$2({
      statusCode: 406,
      statusMessage: "Not Acceptable",
      message: "Supported types: text/html, text/markdown, text/plain"
    });
  }
  await ensureSiteConfig(event);
  const ctx = buildNegotiationContext(event, decision.path);
  if (decision._tag === "html") {
    if (decision.negotiation._tag === "enabled")
      appendHeader(event, "vary", decision.negotiation.vary);
    setStatusAwareHeader(event, ctx, "html");
    return;
  }
  appendHeader(event, "vary", decision.vary);
  setLinkHeader(event, ctx, "html");
  setUncacheableHeaders(event);
  return sendRedirect$1(event, ctx.resolvePath(toMarkdownPath(decision.path)), 307);
}

function isH3App(candidate) {
  if (!candidate || typeof candidate !== "object")
    return false;
  const app = candidate;
  return Array.isArray(app.stack) && typeof app.use === "function";
}
function isH3Core(candidate) {
  return !!candidate && typeof candidate === "object" && Array.isArray(candidate["~middleware"]);
}
function resolveH3Runtime(candidate) {
  if (!candidate || typeof candidate !== "object")
    return { _tag: "unsupported" };
  const nitro = candidate;
  if (isH3App(nitro.h3App))
    return { _tag: "h3-v1", app: nitro.h3App };
  if (isH3Core(nitro.h3))
    return { _tag: "h3-v2", app: nitro.h3 };
  return { _tag: "unsupported" };
}
const negotiationHandler = defineEventHandler$1(async (event) => {
  const decision = decideNegotiation(event, "early");
  const response = await applyNegotiation(event, decision);
  if (response !== void 0 || decision._tag !== "html")
    return response;
  return serveCloudflarePrerenderedPage(event);
});
const _mt5acty3WRNiBEmclqIy__fo_sNxrHZbnZo21i9BoVI = defineNitroPlugin((nitro) => {
  const runtime = resolveH3Runtime(nitro);
  if (runtime._tag === "unsupported") {
    logger$1.debug("[markdown] No h3 stack found. Accept negotiation stays in the middleware.");
    return;
  }
  if (runtime._tag === "h3-v2") {
    runtime.app["~middleware"].unshift(negotiationHandler);
    return;
  }
  const app = runtime.app;
  const baseURL = useRuntimeConfig$1().app?.baseURL || "/";
  app.use(`${baseURL}/`.replace(/\/+/g, "/"), negotiationHandler);
  const layer = app.stack.at(-1);
  if (layer?.handler !== negotiationHandler) {
    logger$1.debug("[markdown] Unexpected h3 stack shape. Accept negotiation runs after static assets.");
    return;
  }
  app.stack.pop();
  app.stack.splice(1, 0, layer);
});

const plugins = [
  _YDLUKTZXdOZR5euLMCN5AnSEG5YQcFhnoCD8gjkk160,
route_rules_default,
_BSvNXZPhi69sXr8pvONebGLi23tJoAVTSQ3oHeT380,
_91qujzOfWJfyZkbD6zumMOS2zKQMJRq5PcFlMdXLtLc,
_GegqTlU9ToUY3v__ethN1Xq3_9K2u1uaW3kOiCfNsc,
_P3zm45gMTeq1U1MDjatqw6sNUh8aHq3HIrCVu2ZE8k,
_HjximyGtxaKzmG6qKpPKryiwZpReNVn9DUQv2_r4t0U,
_rTHIzEztihvQQ5LFVqwkVt8qSp55bozwKxsOXmw,
_M4cJJb6bKazSTnV8NDV7__xmtafAyJYeWzc9AR6UU28,
_mt5acty3WRNiBEmclqIy__fo_sNxrHZbnZo21i9BoVI
];

const assets = {
  "/_nuxt-skew-sw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"697-C/22UetJW43gzS4ZRfWUTGejgNo\"",
    "mtime": "2026-10-28T07:16:45.249Z",
    "size": 1687,
    "path": "../public/_nuxt-skew-sw.js"
  },
  "/logo.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-hpSeRSWd1wp/iqnBFwwNeAqZUOg\"",
    "mtime": "2026-10-28T07:16:45.546Z",
    "size": 4286,
    "path": "../public/logo.ico"
  },
  "/logo.png": {
    "type": "image/png",
    "etag": "\"3a0d9-JmXtJHmFTBCAVXNw9LyML2kJwoQ\"",
    "mtime": "2026-10-28T07:16:45.546Z",
    "size": 237785,
    "path": "../public/logo.png"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a2-MWT0ZdKOlHfsZ05vPmi7w8batxc\"",
    "mtime": "2026-10-28T07:16:43.548Z",
    "size": 162,
    "path": "../public/robots.txt"
  },
  "/__sitemap__/style.xsl": {
    "type": "application/xslt+xml",
    "etag": "\"324b-p6hlenYt5E+1yfmI7eoxoOjydyU\"",
    "mtime": "2026-10-28T07:16:43.548Z",
    "size": 12875,
    "path": "../public/__sitemap__/style.xsl"
  },
  "/sitemap.xml": {
    "type": "application/xml",
    "etag": "\"503-tAHudNzt08CcanvPw6QnUGJSA4k\"",
    "mtime": "2026-10-28T07:16:44.541Z",
    "size": 1283,
    "path": "../public/sitemap.xml"
  },
  "/_nuxt/-Coa48hm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19a3-k7PE1orIpVD51ePOUZobVb9JQ4c\"",
    "mtime": "2026-10-28T07:16:45.494Z",
    "size": 6563,
    "path": "../public/_nuxt/-Coa48hm.js"
  },
  "/_nuxt/B4OPdcKj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15c6-y7LjJcPX9xn0j0IEBJRydR1MvjM\"",
    "mtime": "2026-10-28T07:16:45.465Z",
    "size": 5574,
    "path": "../public/_nuxt/B4OPdcKj.js"
  },
  "/_nuxt/B6YzumGC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"162-lZZ+RV59rRKnlCjOWEXpH1c/1Js\"",
    "mtime": "2026-10-28T07:16:45.464Z",
    "size": 354,
    "path": "../public/_nuxt/B6YzumGC.js"
  },
  "/_nuxt/BBEwTFqt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"248fe-HayVUy4H30iAeEcSeKSAhncn1PA\"",
    "mtime": "2026-10-28T07:16:45.901Z",
    "size": 149758,
    "path": "../public/_nuxt/BBEwTFqt.js"
  },
  "/_nuxt/BDNMzG2s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"54-MasMfSk/A98C3Gn9uIOxtFxkWNw\"",
    "mtime": "2026-10-28T07:16:45.464Z",
    "size": 84,
    "path": "../public/_nuxt/BDNMzG2s.js"
  },
  "/_nuxt/BL5W339n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ec-n6D4w+rusuNu0/7spqt0RAEExrI\"",
    "mtime": "2026-10-28T07:16:45.464Z",
    "size": 236,
    "path": "../public/_nuxt/BL5W339n.js"
  },
  "/_nuxt/BN85rSOM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"174f-o9/VcaHK4rEih3D3YhWe8XBbKBY\"",
    "mtime": "2026-10-28T07:16:45.465Z",
    "size": 5967,
    "path": "../public/_nuxt/BN85rSOM.js"
  },
  "/_nuxt/BPyyWHBq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f2-77SjvIHLwo40NOylImYOLj59B4c\"",
    "mtime": "2026-10-28T07:16:45.465Z",
    "size": 242,
    "path": "../public/_nuxt/BPyyWHBq.js"
  },
  "/_nuxt/BU1pUzA4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ec-K6MRsX6kq1QUiye9ZqnD1f8jZis\"",
    "mtime": "2026-10-28T07:16:45.465Z",
    "size": 236,
    "path": "../public/_nuxt/BU1pUzA4.js"
  },
  "/_nuxt/BXReH8rC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f2-MWezS+hs5+K/qbsnmToohHJI2yo\"",
    "mtime": "2026-10-28T07:16:45.465Z",
    "size": 242,
    "path": "../public/_nuxt/BXReH8rC.js"
  },
  "/_nuxt/BXorSwNX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4dc4-qgfvGYE6ZcUUmtM6zK4kBeJkQnM\"",
    "mtime": "2026-10-28T07:16:45.481Z",
    "size": 19908,
    "path": "../public/_nuxt/BXorSwNX.js"
  },
  "/_nuxt/BZn1bc5f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ec-kejk7p3YVAeqlBgEtIRVMpCNGWc\"",
    "mtime": "2026-10-28T07:16:45.467Z",
    "size": 236,
    "path": "../public/_nuxt/BZn1bc5f.js"
  },
  "/_nuxt/BdKTSsf2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ea-tZazyeAHK4/JXHFPRYQJEJYSnJs\"",
    "mtime": "2026-10-28T07:16:45.467Z",
    "size": 234,
    "path": "../public/_nuxt/BdKTSsf2.js"
  },
  "/_nuxt/BoObtNcK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1af9-vtgkMyyr797Arwq9Ya/lsUNxNSk\"",
    "mtime": "2026-10-28T07:16:45.467Z",
    "size": 6905,
    "path": "../public/_nuxt/BoObtNcK.js"
  },
  "/_nuxt/BqDrJLDm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1050-6+YWXRgy/pe54NRT2KrM0I3+JEQ\"",
    "mtime": "2026-10-28T07:16:45.466Z",
    "size": 4176,
    "path": "../public/_nuxt/BqDrJLDm.js"
  },
  "/_nuxt/C6RThDW8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c1f-bHTcExcA55gtRvEndjMVUyNBKL0\"",
    "mtime": "2026-10-28T07:16:45.468Z",
    "size": 3103,
    "path": "../public/_nuxt/C6RThDW8.js"
  },
  "/_nuxt/CDANwsDc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fc-jB1fJAoHwEasAg4FF01Hy/iWMrw\"",
    "mtime": "2026-10-28T07:16:45.467Z",
    "size": 252,
    "path": "../public/_nuxt/CDANwsDc.js"
  },
  "/_nuxt/CMT4GqJ7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"139ed-ORH1gjlpqmTWC3arPG2+hHGzkJQ\"",
    "mtime": "2026-10-28T07:16:45.477Z",
    "size": 80365,
    "path": "../public/_nuxt/CMT4GqJ7.js"
  },
  "/_nuxt/CSrRnlhf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"248fe-HayVUy4H30iAeEcSeKSAhncn1PA\"",
    "mtime": "2026-10-28T07:16:45.478Z",
    "size": 149758,
    "path": "../public/_nuxt/CSrRnlhf.js"
  },
  "/_nuxt/CT7KhQ8n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"212-Lpya5TyUU51fbS6rGj8us+jWOKo\"",
    "mtime": "2026-10-28T07:16:45.477Z",
    "size": 530,
    "path": "../public/_nuxt/CT7KhQ8n.js"
  },
  "/_nuxt/Ch5UaaLU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d19-t3kSiFIVoETvSXbG04KCpSXskQw\"",
    "mtime": "2026-10-28T07:16:45.478Z",
    "size": 3353,
    "path": "../public/_nuxt/Ch5UaaLU.js"
  },
  "/_nuxt/Chfd0I8I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"212-3rVQQxZBX6yzm/4mu+wP92/DYZE\"",
    "mtime": "2026-10-28T07:16:45.478Z",
    "size": 530,
    "path": "../public/_nuxt/Chfd0I8I.js"
  },
  "/_nuxt/CnjwPJA6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c8-wzKTLrK7tVAC/ZdgS9oTsJx4+Vw\"",
    "mtime": "2026-10-28T07:16:45.478Z",
    "size": 200,
    "path": "../public/_nuxt/CnjwPJA6.js"
  },
  "/_nuxt/D-7k_1ou.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"197-dulM232/5EMJS4dIVMfIeiap9Mc\"",
    "mtime": "2026-10-28T07:16:45.478Z",
    "size": 407,
    "path": "../public/_nuxt/D-7k_1ou.js"
  },
  "/_nuxt/D7pXnGyy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f0-sGdnUUb71VHsWaNP04hPa27Ybqk\"",
    "mtime": "2026-10-28T07:16:45.479Z",
    "size": 240,
    "path": "../public/_nuxt/D7pXnGyy.js"
  },
  "/_nuxt/D97XYBJh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"212-tmR+M6R2YtxfsQOv4c7wYdIMIlw\"",
    "mtime": "2026-10-28T07:16:45.479Z",
    "size": 530,
    "path": "../public/_nuxt/D97XYBJh.js"
  },
  "/_nuxt/DBq-XC1r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ec-SDL9g8s92bE9eWJ1bVMn/YBgSeM\"",
    "mtime": "2026-10-28T07:16:45.480Z",
    "size": 236,
    "path": "../public/_nuxt/DBq-XC1r.js"
  },
  "/_nuxt/DDl9NqD1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ec-DhpsqhlaHNJzm+ljFrFaxVV4Sxg\"",
    "mtime": "2026-10-28T07:16:45.479Z",
    "size": 236,
    "path": "../public/_nuxt/DDl9NqD1.js"
  },
  "/_nuxt/DR62lvOb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"20c-hfPJj+8rDPF+6Ciy50gcFOrL+KI\"",
    "mtime": "2026-10-28T07:16:45.480Z",
    "size": 524,
    "path": "../public/_nuxt/DR62lvOb.js"
  },
  "/_nuxt/DHZ6ee6g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"aef1-v9zNYEsJVp/JJGgvTiPfrHhuN1E\"",
    "mtime": "2026-10-28T07:16:45.481Z",
    "size": 44785,
    "path": "../public/_nuxt/DHZ6ee6g.js"
  },
  "/_nuxt/DUkbp3p1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f4-xGTO+nvrk4hedgf3dJuub1bmn3g\"",
    "mtime": "2026-10-28T07:16:45.480Z",
    "size": 244,
    "path": "../public/_nuxt/DUkbp3p1.js"
  },
  "/_nuxt/DboiR6x_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10fc-6uk/0KNmi9/rP8XVkcQtbQK8svY\"",
    "mtime": "2026-10-28T07:16:45.480Z",
    "size": 4348,
    "path": "../public/_nuxt/DboiR6x_.js"
  },
  "/_nuxt/DnYYhGjJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f2-Moid7i3IFmdNLymfeuvF8Nj5kcM\"",
    "mtime": "2026-10-28T07:16:45.482Z",
    "size": 242,
    "path": "../public/_nuxt/DnYYhGjJ.js"
  },
  "/_nuxt/Do0JoPfj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b18-l3MzjvcitmpcyJbLP84+qj5EWe4\"",
    "mtime": "2026-10-28T07:16:45.482Z",
    "size": 2840,
    "path": "../public/_nuxt/Do0JoPfj.js"
  },
  "/_nuxt/Dyax-AlB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d2-uygbzLYrzwgRCYoEVMfOWq4MXKY\"",
    "mtime": "2026-10-28T07:16:45.482Z",
    "size": 466,
    "path": "../public/_nuxt/Dyax-AlB.js"
  },
  "/_nuxt/Jfm-WwbB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"21f6-hw0xxlZe7D1QQEBJz3b+ghfhUKw\"",
    "mtime": "2026-10-28T07:16:45.482Z",
    "size": 8694,
    "path": "../public/_nuxt/Jfm-WwbB.js"
  },
  "/_nuxt/OKS8ZNqD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ec-/2cekYLXfEFR5S4cd1qm7nsGPB8\"",
    "mtime": "2026-10-28T07:16:45.482Z",
    "size": 236,
    "path": "../public/_nuxt/OKS8ZNqD.js"
  },
  "/_nuxt/PcHk9wvG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"212-TMdg/W4tvxI89+gigKVdGcFRpDY\"",
    "mtime": "2026-10-28T07:16:45.483Z",
    "size": 530,
    "path": "../public/_nuxt/PcHk9wvG.js"
  },
  "/_nuxt/ProsePre.D5orA6B_.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e-jczvRAVUXbzGL6yotozKFbyMO4s\"",
    "mtime": "2026-10-28T07:16:45.484Z",
    "size": 30,
    "path": "../public/_nuxt/ProsePre.D5orA6B_.css"
  },
  "/_nuxt/TI0pEWMU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3a25-6NLPBa7autbE7NbRYvBrhRznAsA\"",
    "mtime": "2026-10-28T07:16:45.493Z",
    "size": 14885,
    "path": "../public/_nuxt/TI0pEWMU.js"
  },
  "/_nuxt/entry.CGVVIkmh.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"fb43-z8FuraRxaGRotYLOHTd7UVucAbY\"",
    "mtime": "2026-10-28T07:16:45.491Z",
    "size": 64323,
    "path": "../public/_nuxt/entry.CGVVIkmh.css"
  },
  "/_nuxt/coEOcvM4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c3cf-fpgV5YiHOWfnXx+tEqVFVEefQng\"",
    "mtime": "2026-10-28T07:16:45.491Z",
    "size": 115663,
    "path": "../public/_nuxt/coEOcvM4.js"
  },
  "/_nuxt/entry.ZoTxzY-O.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ff97-IboXPDz/JTyYwo5PbRZ+M8sfVD8\"",
    "mtime": "2026-10-28T07:16:45.901Z",
    "size": 65431,
    "path": "../public/_nuxt/entry.ZoTxzY-O.css"
  },
  "/_nuxt/erO4IFet.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"212-Zlwi3Pf2Xf0CH3dEWaTWiYPT7cc\"",
    "mtime": "2026-10-28T07:16:45.484Z",
    "size": 530,
    "path": "../public/_nuxt/erO4IFet.js"
  },
  "/_nuxt/gseHJPoG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ec-KpfWldU35AXHQgMHt4SdZ1w8NTo\"",
    "mtime": "2026-10-28T07:16:45.492Z",
    "size": 236,
    "path": "../public/_nuxt/gseHJPoG.js"
  },
  "/_nuxt/m_k5UtL1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d90-yQr0TBeDOBgXtVZ+ZW3Cs6ZS5u0\"",
    "mtime": "2026-10-28T07:16:45.492Z",
    "size": 7568,
    "path": "../public/_nuxt/m_k5UtL1.js"
  },
  "/_nuxt/nQewa4MH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"16d-Z0XphI1JOUAmKG4R5h8SaaVfDXM\"",
    "mtime": "2026-10-28T07:16:45.493Z",
    "size": 365,
    "path": "../public/_nuxt/nQewa4MH.js"
  },
  "/_nuxt/rfhDd3EJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"28c9-CPc2aqPn7IYgo6GquNfa68g+Am0\"",
    "mtime": "2026-10-28T07:16:45.494Z",
    "size": 10441,
    "path": "../public/_nuxt/rfhDd3EJ.js"
  },
  "/_og-static-fonts/inter-400-latin.ttf": {
    "type": "font/ttf",
    "etag": "\"105c8-MW0DM/3E4egS9aHQ0YHlh/qx7ks\"",
    "mtime": "2026-10-28T07:16:45.581Z",
    "size": 67016,
    "path": "../public/_og-static-fonts/inter-400-latin.ttf"
  },
  "/_og-static-fonts/inter-700-latin.ttf": {
    "type": "font/ttf",
    "etag": "\"10690-UVkukwUfo0FVnDkxnK3r8r+NndM\"",
    "mtime": "2026-10-28T07:16:45.582Z",
    "size": 67216,
    "path": "../public/_og-static-fonts/inter-700-latin.ttf"
  },
  "/images/portrait.png": {
    "type": "image/png",
    "etag": "\"2207f-pJmuFYI/o77xHJPiTWCW99PV33Q\"",
    "mtime": "2026-10-28T07:16:45.517Z",
    "size": 139391,
    "path": "../public/images/portrait.png"
  },
  "/projects/capstone1.png": {
    "type": "image/png",
    "etag": "\"22aa3-n0XLb6voj9aolyNA+KhLQxL0h/U\"",
    "mtime": "2026-10-28T07:16:45.531Z",
    "size": 141987,
    "path": "../public/projects/capstone1.png"
  },
  "/projects/bundat.png": {
    "type": "image/png",
    "etag": "\"2afa3-HAqjri1yYRK0HXgqxU1/UJNmLCk\"",
    "mtime": "2026-10-28T07:16:45.529Z",
    "size": 176035,
    "path": "../public/projects/bundat.png"
  },
  "/projects/capstone2.png": {
    "type": "image/png",
    "etag": "\"1c27f-GkI49Ckf0TuKO3DR0PnA8AD65Ps\"",
    "mtime": "2026-10-28T07:16:45.532Z",
    "size": 115327,
    "path": "../public/projects/capstone2.png"
  },
  "/technologies/bootstrap.png": {
    "type": "image/png",
    "etag": "\"42f1-Proj0H8hplVoQMHdXKNiFdOeFXw\"",
    "mtime": "2026-10-28T07:16:45.517Z",
    "size": 17137,
    "path": "../public/technologies/bootstrap.png"
  },
  "/technologies/ci4.webp": {
    "type": "image/webp",
    "etag": "\"29e6-gXmAAzObB3LzpRLtGjQ17qdymbk\"",
    "mtime": "2026-10-28T07:16:45.530Z",
    "size": 10726,
    "path": "../public/technologies/ci4.webp"
  },
  "/technologies/csharp.png": {
    "type": "image/png",
    "etag": "\"59a0-zfCejnEBn3jYOjhAthDl/PDOgxA\"",
    "mtime": "2026-10-28T07:16:45.532Z",
    "size": 22944,
    "path": "../public/technologies/csharp.png"
  },
  "/technologies/css.png": {
    "type": "image/png",
    "etag": "\"5b33-c+NQ/C4rqEijOwIRHSDtSDuLZSU\"",
    "mtime": "2026-10-28T07:16:45.532Z",
    "size": 23347,
    "path": "../public/technologies/css.png"
  },
  "/technologies/github.png": {
    "type": "image/png",
    "etag": "\"3299-QrzWdhAV1dHJXaM1ZDCeWOd1LKs\"",
    "mtime": "2026-10-28T07:16:45.533Z",
    "size": 12953,
    "path": "../public/technologies/github.png"
  },
  "/technologies/java.png": {
    "type": "image/png",
    "etag": "\"511a-NwdYBSV9sIxNe9CIvSei4aCmllE\"",
    "mtime": "2026-10-28T07:16:45.533Z",
    "size": 20762,
    "path": "../public/technologies/java.png"
  },
  "/technologies/html.png": {
    "type": "image/png",
    "etag": "\"85ab-OOC1F5g3NT2s+h7zcFAkSg8WB54\"",
    "mtime": "2026-10-28T07:16:45.533Z",
    "size": 34219,
    "path": "../public/technologies/html.png"
  },
  "/technologies/javascript.png": {
    "type": "image/png",
    "etag": "\"7c59-AmfscKkf5AEJuKtmXCgsr8hacRI\"",
    "mtime": "2026-10-28T07:16:45.534Z",
    "size": 31833,
    "path": "../public/technologies/javascript.png"
  },
  "/technologies/laragon.png": {
    "type": "image/png",
    "etag": "\"83f8-7pK3EKJJYtKGrqVA+PVYwUcFfFQ\"",
    "mtime": "2026-10-28T07:16:45.534Z",
    "size": 33784,
    "path": "../public/technologies/laragon.png"
  },
  "/technologies/mysql.png": {
    "type": "image/png",
    "etag": "\"12784-tF+YvZPQix++5bPViBu7NunfQ/E\"",
    "mtime": "2026-10-28T07:16:45.534Z",
    "size": 75652,
    "path": "../public/technologies/mysql.png"
  },
  "/technologies/laravel.png": {
    "type": "image/png",
    "etag": "\"2411d-CJzG8h56nfJYIO8Mhg7086l1fKI\"",
    "mtime": "2026-10-28T07:16:45.537Z",
    "size": 147741,
    "path": "../public/technologies/laravel.png"
  },
  "/images/about.jpg": {
    "type": "image/jpeg",
    "etag": "\"a34c6-f/v7K9j+cgZSUG/3VTjRuftvHS4\"",
    "mtime": "2026-10-28T07:16:45.527Z",
    "size": 668870,
    "path": "../public/images/about.jpg"
  },
  "/projects/kapares.png": {
    "type": "image/png",
    "etag": "\"9ca46-TFsJV7HBrcX5ZkBa2ioExWwyaMs\"",
    "mtime": "2026-10-28T07:16:45.529Z",
    "size": 641606,
    "path": "../public/projects/kapares.png"
  },
  "/projects/Screenshot 2025-07-03 124717.png": {
    "type": "image/png",
    "etag": "\"e9860-ucLuH2PdJYxzIMKwJEvb040I3Jo\"",
    "mtime": "2026-10-28T07:16:45.527Z",
    "size": 956512,
    "path": "../public/projects/Screenshot 2025-07-03 124717.png"
  },
  "/projects/movietune.png": {
    "type": "image/png",
    "etag": "\"12bed4-fLQqJ7GOJhcm4r4514pIzyV+t5Y\"",
    "mtime": "2026-10-28T07:16:45.535Z",
    "size": 1228500,
    "path": "../public/projects/movietune.png"
  },
  "/technologies/npm.png": {
    "type": "image/png",
    "etag": "\"59bc-imCTtwWZLLVWLpamUWx6WsYR61g\"",
    "mtime": "2026-10-28T07:16:45.540Z",
    "size": 22972,
    "path": "../public/technologies/npm.png"
  },
  "/technologies/react.png": {
    "type": "image/png",
    "etag": "\"aa01-aW5ueNo+IHQ/rkkZ3FKpbIBcV4c\"",
    "mtime": "2026-10-28T07:16:45.542Z",
    "size": 43521,
    "path": "../public/technologies/react.png"
  },
  "/technologies/php.png": {
    "type": "image/png",
    "etag": "\"2b36d-dV/42UP9hpW+fOl7v9CysfdDyYs\"",
    "mtime": "2026-10-28T07:16:45.541Z",
    "size": 177005,
    "path": "../public/technologies/php.png"
  },
  "/technologies/tailwind.png": {
    "type": "image/png",
    "etag": "\"80a3-FT0uYHqMv/1YHhY56AOvCV9SgF0\"",
    "mtime": "2026-10-28T07:16:45.541Z",
    "size": 32931,
    "path": "../public/technologies/tailwind.png"
  },
  "/technologies/vscode.png": {
    "type": "image/png",
    "etag": "\"7456-gM+Z2nsREsVA67uMmfBhCaNbXe0\"",
    "mtime": "2026-10-28T07:16:45.542Z",
    "size": 29782,
    "path": "../public/technologies/vscode.png"
  },
  "/technologies/vscodep.png": {
    "type": "image/png",
    "etag": "\"7dc0-hzdWRrcCGkpVi6zcFWijk8LKNZo\"",
    "mtime": "2026-10-28T07:16:45.543Z",
    "size": 32192,
    "path": "../public/technologies/vscodep.png"
  },
  "/technologies/vue.png": {
    "type": "image/png",
    "etag": "\"534a-qHQjQG9GBicYt5/k1TrCmoSwa/E\"",
    "mtime": "2026-10-28T07:16:45.543Z",
    "size": 21322,
    "path": "../public/technologies/vue.png"
  },
  "/technologies/wamp.png": {
    "type": "image/png",
    "etag": "\"89e5-hDwT0RgJJcRns7PzKXcrpVCK28o\"",
    "mtime": "2026-10-28T07:16:45.544Z",
    "size": 35301,
    "path": "../public/technologies/wamp.png"
  },
  "/__nuxt_content/blog/sql_dump.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"118c-tj22ku259+dDSPo5fwwB+CwTu0c\"",
    "mtime": "2026-10-28T07:16:43.562Z",
    "size": 4492,
    "path": "../public/__nuxt_content/blog/sql_dump.txt"
  },
  "/__nuxt_content/projects/sql_dump.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a4c-mFPHuKMAP6wt/Wfzg3SCzEeyiEE\"",
    "mtime": "2026-10-28T07:16:43.561Z",
    "size": 2636,
    "path": "../public/__nuxt_content/projects/sql_dump.txt"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"107-SuS4dVec8InoX6N9wiVhe+xcLsE\"",
    "mtime": "2026-10-28T07:16:45.908Z",
    "size": 263,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/fonts/23mtYSzxPVyLoxLNpoXveb5p0hEC2MbGLOudqhNuXQQ-sHyjhRga9hvdq4tAx7_wIeBFh1sLJ_E5PRwGnzrqxWs.woff2": {
    "type": "font/woff2",
    "etag": "\"bd30-HcBE9IJP1a9r/tZ/7ki+cPoGnz8\"",
    "mtime": "2026-10-28T07:16:45.100Z",
    "size": 48432,
    "path": "../public/_nuxt/fonts/23mtYSzxPVyLoxLNpoXveb5p0hEC2MbGLOudqhNuXQQ-sHyjhRga9hvdq4tAx7_wIeBFh1sLJ_E5PRwGnzrqxWs.woff2"
  },
  "/_nuxt/fonts/5IgvIzWAveoNXlQFVm-aWM8yNj5ha56cFNya7Z9Q_YE-FK1AhkTx9rn_wGOIv9D38I9BXDJWXSSVmaZRw4bsXHg.woff2": {
    "type": "font/woff2",
    "etag": "\"6b4-prTo9pBi9mPrTPpk7K1hLVQqLkw\"",
    "mtime": "2026-10-28T07:16:45.115Z",
    "size": 1716,
    "path": "../public/_nuxt/fonts/5IgvIzWAveoNXlQFVm-aWM8yNj5ha56cFNya7Z9Q_YE-FK1AhkTx9rn_wGOIv9D38I9BXDJWXSSVmaZRw4bsXHg.woff2"
  },
  "/_nuxt/fonts/6yQlgZNOH42hUtIIIHjZiNFc1WmiHD7IpV78HkewQzs-Qk_1yENQUazQQ0tP2ZD16gLhgnkqQqP7MhASnXvWtqQ.woff2": {
    "type": "font/woff2",
    "etag": "\"4a64-m06OCqyGws0mpyGBBfmbbVtFPSU\"",
    "mtime": "2026-10-28T07:16:45.116Z",
    "size": 19044,
    "path": "../public/_nuxt/fonts/6yQlgZNOH42hUtIIIHjZiNFc1WmiHD7IpV78HkewQzs-Qk_1yENQUazQQ0tP2ZD16gLhgnkqQqP7MhASnXvWtqQ.woff2"
  },
  "/_nuxt/fonts/95LF05ynkR2iited5vKC3ML7Mt4iflufgyYJQAK9nF4-NZaZZt6E_IGCSpI3DA35nDyNvesPNS4QNP7XC2pYBYE.woff2": {
    "type": "font/woff2",
    "etag": "\"64f4-tK7ixsAzSz1n1+rZ0d41uh7QBHY\"",
    "mtime": "2026-10-28T07:16:45.117Z",
    "size": 25844,
    "path": "../public/_nuxt/fonts/95LF05ynkR2iited5vKC3ML7Mt4iflufgyYJQAK9nF4-NZaZZt6E_IGCSpI3DA35nDyNvesPNS4QNP7XC2pYBYE.woff2"
  },
  "/_nuxt/fonts/9KCRpkmcW_okkHNr8XnT2Or5GlVKmIYYxKd5FYoPWDg-YDD9qUZJ_xItNnR_0ovbhYwdmHMf5touelhWERQfK24.woff2": {
    "type": "font/woff2",
    "etag": "\"16f0-PS93/1kyCeu7IT5b4K4jaWHEBbQ\"",
    "mtime": "2026-10-28T07:16:45.116Z",
    "size": 5872,
    "path": "../public/_nuxt/fonts/9KCRpkmcW_okkHNr8XnT2Or5GlVKmIYYxKd5FYoPWDg-YDD9qUZJ_xItNnR_0ovbhYwdmHMf5touelhWERQfK24.woff2"
  },
  "/_nuxt/fonts/BzBvP5B6n3wHNSK9KgmBNZ1PczdZ0kq6L6nu_kw03Ug-wV8zARWYtkWLbDq13Xl90XFZKXVs1nvvXB8zvlghsBY.woff2": {
    "type": "font/woff2",
    "etag": "\"6b0-ZTiJyWk2hq/Kot3zMLKodM70hek\"",
    "mtime": "2026-10-28T07:16:45.117Z",
    "size": 1712,
    "path": "../public/_nuxt/fonts/BzBvP5B6n3wHNSK9KgmBNZ1PczdZ0kq6L6nu_kw03Ug-wV8zARWYtkWLbDq13Xl90XFZKXVs1nvvXB8zvlghsBY.woff2"
  },
  "/_nuxt/fonts/DYJdeJPtCBIYWgA5cyxBmly7l27Wj1oQp4mFkXDxvIs-DPFPVSnB8cId8pOwgvRNA2TCO2OWamyoeCtk437Sapc.woff2": {
    "type": "font/woff2",
    "etag": "\"6afc-065UyE/loH4v/KPT2cqQjWbu2Yc\"",
    "mtime": "2026-10-28T07:16:45.121Z",
    "size": 27388,
    "path": "../public/_nuxt/fonts/DYJdeJPtCBIYWgA5cyxBmly7l27Wj1oQp4mFkXDxvIs-DPFPVSnB8cId8pOwgvRNA2TCO2OWamyoeCtk437Sapc.woff2"
  },
  "/_nuxt/fonts/DyoSP_ZB-sZ6jdZm0DNNNAZlak-n8B55ylByyLLv58Y-LDxnRyFE6SL_0xO8Ook5rXOokOEsSmBy44omeJ02DT4.woff2": {
    "type": "font/woff2",
    "etag": "\"5084-wzEMqHmSXhs0bT3Vh/Szi16YDd8\"",
    "mtime": "2026-10-28T07:16:45.121Z",
    "size": 20612,
    "path": "../public/_nuxt/fonts/DyoSP_ZB-sZ6jdZm0DNNNAZlak-n8B55ylByyLLv58Y-LDxnRyFE6SL_0xO8Ook5rXOokOEsSmBy44omeJ02DT4.woff2"
  },
  "/_nuxt/fonts/EHhMPTZxs1DLFoSCpTpJi7S22G4OhYT8lewk_1xckC8-E9n0RhQShoqM5fLUT_RXtS4T2p_LAiIOBCwztLaRQuE.woff2": {
    "type": "font/woff2",
    "etag": "\"2344-DAUO+kyWOqc8oxO6xq0DLfz3Vuo\"",
    "mtime": "2026-10-28T07:16:45.118Z",
    "size": 9028,
    "path": "../public/_nuxt/fonts/EHhMPTZxs1DLFoSCpTpJi7S22G4OhYT8lewk_1xckC8-E9n0RhQShoqM5fLUT_RXtS4T2p_LAiIOBCwztLaRQuE.woff2"
  },
  "/_nuxt/fonts/LlkRNqpUXT184ITHz2ImBS70pPRrIYbBYm5lnR5T2hQ-QqfHOS8AuhvxUBWI2_o7dfCfV6sgPgo8fKatOL_oXaU.woff2": {
    "type": "font/woff2",
    "etag": "\"2064-XBxD4BZ8na3DznT01MAcODAQE/Y\"",
    "mtime": "2026-10-28T07:16:45.125Z",
    "size": 8292,
    "path": "../public/_nuxt/fonts/LlkRNqpUXT184ITHz2ImBS70pPRrIYbBYm5lnR5T2hQ-QqfHOS8AuhvxUBWI2_o7dfCfV6sgPgo8fKatOL_oXaU.woff2"
  },
  "/_nuxt/fonts/LtUPvBNCw2mRmTSCUrv_YeRqBX7xHSSUdk52U1zOKFY-3AVjdIdQvFhNIastDeFZR8qe9V_KKIxGcJA0VzJUi_E.woff2": {
    "type": "font/woff2",
    "etag": "\"30b4-KS4yXTv5ZVD+RSqrmz1QfQepWOk\"",
    "mtime": "2026-10-28T07:16:45.122Z",
    "size": 12468,
    "path": "../public/_nuxt/fonts/LtUPvBNCw2mRmTSCUrv_YeRqBX7xHSSUdk52U1zOKFY-3AVjdIdQvFhNIastDeFZR8qe9V_KKIxGcJA0VzJUi_E.woff2"
  },
  "/_nuxt/fonts/MDwTfPBLLkOaYY6Syn3fT929XleGt5GMJv6uGhPZd0I-vv5nfMCKpC4Hg3_nmx6d4CQNZ3DqashpQcpoaoxsiuI.woff2": {
    "type": "font/woff2",
    "etag": "\"5a64-ZhxUEDkap1TiaZhbn5XkTV+0CpY\"",
    "mtime": "2026-10-28T07:16:45.126Z",
    "size": 23140,
    "path": "../public/_nuxt/fonts/MDwTfPBLLkOaYY6Syn3fT929XleGt5GMJv6uGhPZd0I-vv5nfMCKpC4Hg3_nmx6d4CQNZ3DqashpQcpoaoxsiuI.woff2"
  },
  "/_nuxt/fonts/N6a464ONG6G2QwvXkRQxmkb6Upu53F9VINRl-UICiPU-5A74LG92j2E8ztd62HTHyuecPyMCJzc74dIf2kdcJmE.woff2": {
    "type": "font/woff2",
    "etag": "\"6a88-BpvjB8Hs9qtl1VBT5R9XSTsCBBI\"",
    "mtime": "2026-10-28T07:16:45.125Z",
    "size": 27272,
    "path": "../public/_nuxt/fonts/N6a464ONG6G2QwvXkRQxmkb6Upu53F9VINRl-UICiPU-5A74LG92j2E8ztd62HTHyuecPyMCJzc74dIf2kdcJmE.woff2"
  },
  "/_nuxt/fonts/Nah9koTOFvXUREZWfV7DH4zgASpXCzPkz6Tn28ZWLF8-BPqOaS9b32mrF_JERGBi9aAWCHVMBVP2cgIrQCresgU.woff2": {
    "type": "font/woff2",
    "etag": "\"2c08-0jmpRV2Mkkir4F2SgNetftT+X2g\"",
    "mtime": "2026-10-28T07:16:45.126Z",
    "size": 11272,
    "path": "../public/_nuxt/fonts/Nah9koTOFvXUREZWfV7DH4zgASpXCzPkz6Tn28ZWLF8-BPqOaS9b32mrF_JERGBi9aAWCHVMBVP2cgIrQCresgU.woff2"
  },
  "/_nuxt/fonts/PGxXZWn226tHnA2OqxZU7CTUvT6nLXK7MoQbZiEZNy8-erQjQvygkJkW0XY1KA9z_RwUelzNKQYK0ne5Xd6o7WM.woff2": {
    "type": "font/woff2",
    "etag": "\"7a6c-NA5papVQRrAC8RHI3W4wMgtFYYQ\"",
    "mtime": "2026-10-28T07:16:45.127Z",
    "size": 31340,
    "path": "../public/_nuxt/fonts/PGxXZWn226tHnA2OqxZU7CTUvT6nLXK7MoQbZiEZNy8-erQjQvygkJkW0XY1KA9z_RwUelzNKQYK0ne5Xd6o7WM.woff2"
  },
  "/_nuxt/fonts/QpJYL2mwM_fWcwdT8T92e3Zj7wNrhqhFzZMwIpW9Yhk-XgOijeIybntTr80kfTNzJ_MAYXALsEz4LGK8FlCLUMQ.woff2": {
    "type": "font/woff2",
    "etag": "\"4e30-CJVl1taa8AaNO619z7s06dRAxFQ\"",
    "mtime": "2026-10-28T07:16:45.127Z",
    "size": 20016,
    "path": "../public/_nuxt/fonts/QpJYL2mwM_fWcwdT8T92e3Zj7wNrhqhFzZMwIpW9Yhk-XgOijeIybntTr80kfTNzJ_MAYXALsEz4LGK8FlCLUMQ.woff2"
  },
  "/_nuxt/fonts/WvBWEpMh0GHIAGpqPUMY78bL9_LoEQDKSugTtbND-Gw-hEI3quQvUUMagnXpWFrZQqIerqrvJPyvttLONmLIyJ8.woff2": {
    "type": "font/woff2",
    "etag": "\"1890-aytKPDH2k4tOt01FONbobtBXOjM\"",
    "mtime": "2026-10-28T07:16:45.127Z",
    "size": 6288,
    "path": "../public/_nuxt/fonts/WvBWEpMh0GHIAGpqPUMY78bL9_LoEQDKSugTtbND-Gw-hEI3quQvUUMagnXpWFrZQqIerqrvJPyvttLONmLIyJ8.woff2"
  },
  "/_nuxt/fonts/RQ9QFFjRgsXVyz0lHw8ez57FeiQzAb89Xyf5vU5maVg-pg72ynemUWU2h2KQWjiuhgXRXu_VM_YNUN5WfPOOT1M.woff2": {
    "type": "font/woff2",
    "etag": "\"1a90-SizOLrQ3v2WnpUbpVfMW/w2GCiE\"",
    "mtime": "2026-10-28T07:16:45.127Z",
    "size": 6800,
    "path": "../public/_nuxt/fonts/RQ9QFFjRgsXVyz0lHw8ez57FeiQzAb89Xyf5vU5maVg-pg72ynemUWU2h2KQWjiuhgXRXu_VM_YNUN5WfPOOT1M.woff2"
  },
  "/_nuxt/fonts/Z1Hxuez7RsZqYWJcXrjljtVt8dWJe-fB47SF0b3XCbM-bY_e0N33vFDEeRepazCWL6rGkfqt27UyV0RXQUhhydE.woff2": {
    "type": "font/woff2",
    "etag": "\"54b8-5Z0Ta+EnIXV3mFb5QiUsGiBQKd4\"",
    "mtime": "2026-10-28T07:16:45.128Z",
    "size": 21688,
    "path": "../public/_nuxt/fonts/Z1Hxuez7RsZqYWJcXrjljtVt8dWJe-fB47SF0b3XCbM-bY_e0N33vFDEeRepazCWL6rGkfqt27UyV0RXQUhhydE.woff2"
  },
  "/_nuxt/fonts/ZDmckrAe5KkZg7oRmja8y8J386eiRioT_oX1sx-uQUI-RNad721svf_ClPMXNl65MSWr3Kjs4qWy3a_LEzQOL8w.woff2": {
    "type": "font/woff2",
    "etag": "\"22bc-Z2rEPYVGdg32Cp+fxceBLQ+Ap7k\"",
    "mtime": "2026-10-28T07:16:45.128Z",
    "size": 8892,
    "path": "../public/_nuxt/fonts/ZDmckrAe5KkZg7oRmja8y8J386eiRioT_oX1sx-uQUI-RNad721svf_ClPMXNl65MSWr3Kjs4qWy3a_LEzQOL8w.woff2"
  },
  "/_nuxt/fonts/der4-T0bORlPDyrpWSOU_0VRetbtC4vnusni_kWmK7Q-GXB5hylV4plFt0WDHf1wY5BRE9_7uLFvbkkQKAdfTP0.woff2": {
    "type": "font/woff2",
    "etag": "\"14d18-Uh4k0XQeDHQ4ioQoYVD4qScmVZc\"",
    "mtime": "2026-10-28T07:16:45.130Z",
    "size": 85272,
    "path": "../public/_nuxt/fonts/der4-T0bORlPDyrpWSOU_0VRetbtC4vnusni_kWmK7Q-GXB5hylV4plFt0WDHf1wY5BRE9_7uLFvbkkQKAdfTP0.woff2"
  },
  "/_nuxt/fonts/h0AUkCfyfKyBKdwa_skvQ6DbDtFXLQ_Yy4xUirju9S4-jpeLu7eQ1_3PRT8dJ3oF3lAbnW0HnzvGEAmj9traCno.woff2": {
    "type": "font/woff2",
    "etag": "\"6d4-QGwkB5aVFMZXGwZJbl9BMRC7Uxs\"",
    "mtime": "2026-10-28T07:16:45.128Z",
    "size": 1748,
    "path": "../public/_nuxt/fonts/h0AUkCfyfKyBKdwa_skvQ6DbDtFXLQ_Yy4xUirju9S4-jpeLu7eQ1_3PRT8dJ3oF3lAbnW0HnzvGEAmj9traCno.woff2"
  },
  "/_nuxt/fonts/k3YRPyaHq8R9a3gxNSuQ3W_8hdDfEx-SbAtGnVOYnHY-fVFZzzariE_Uq-dTHevDSbvLurnlJRTddHpakm9Ws1w.woff2": {
    "type": "font/woff2",
    "etag": "\"2828-F3GDdFn8yIqL/ZsbzNDCHlQrmMo\"",
    "mtime": "2026-10-28T07:16:45.129Z",
    "size": 10280,
    "path": "../public/_nuxt/fonts/k3YRPyaHq8R9a3gxNSuQ3W_8hdDfEx-SbAtGnVOYnHY-fVFZzzariE_Uq-dTHevDSbvLurnlJRTddHpakm9Ws1w.woff2"
  },
  "/_nuxt/fonts/kqHQLokKhbDhYAECQOy8tl9ltEsY5H0SHs5YVvjw1LY-DEH_xe_HpkDt9DTHbxyxHeV4Ct1N6mL81LzQokJdWc4.woff2": {
    "type": "font/woff2",
    "etag": "\"8148-HSG+k8dmL2Li0VAMuIm0B1KST9s\"",
    "mtime": "2026-10-28T07:16:45.130Z",
    "size": 33096,
    "path": "../public/_nuxt/fonts/kqHQLokKhbDhYAECQOy8tl9ltEsY5H0SHs5YVvjw1LY-DEH_xe_HpkDt9DTHbxyxHeV4Ct1N6mL81LzQokJdWc4.woff2"
  },
  "/_nuxt/fonts/nRO08svVDfHK2I6XQv8acbCwVYFPI-lNFmbTO_Ato-U-leG_hYlPLJBni6ljwuquGygDJ11Q9JovV7X4etSwPIs.woff2": {
    "type": "font/woff2",
    "etag": "\"2f04-ntsyPpeWIrXM3hz1Nt0hG95RmwU\"",
    "mtime": "2026-10-28T07:16:45.130Z",
    "size": 12036,
    "path": "../public/_nuxt/fonts/nRO08svVDfHK2I6XQv8acbCwVYFPI-lNFmbTO_Ato-U-leG_hYlPLJBni6ljwuquGygDJ11Q9JovV7X4etSwPIs.woff2"
  },
  "/_nuxt/fonts/okGTeHOzA93WHhiHQhh2kiQFJ8jP7Rs_J1FR3XblyKk-bIMLl2bdqTiV6xWjXZLjoJYX4UhZc8AFIlYM7Hc12TM.woff2": {
    "type": "font/woff2",
    "etag": "\"166bc-r/t3z77mQ+DDMQr+Pkm5yR2/0FE\"",
    "mtime": "2026-10-28T07:16:45.131Z",
    "size": 91836,
    "path": "../public/_nuxt/fonts/okGTeHOzA93WHhiHQhh2kiQFJ8jP7Rs_J1FR3XblyKk-bIMLl2bdqTiV6xWjXZLjoJYX4UhZc8AFIlYM7Hc12TM.woff2"
  },
  "/_nuxt/fonts/p8XC4b0v0m-EiJQAVrKLvU8spsJJrRwg_pQb6ne3LZ8-Xk9a7EzZySU6YDiCY67upfbFiJMXjFXMlVfxZu_bifY.woff2": {
    "type": "font/woff2",
    "etag": "\"2674-1YmcrW5HgRW4aWYn0J/0G9sq/iU\"",
    "mtime": "2026-10-28T07:16:45.131Z",
    "size": 9844,
    "path": "../public/_nuxt/fonts/p8XC4b0v0m-EiJQAVrKLvU8spsJJrRwg_pQb6ne3LZ8-Xk9a7EzZySU6YDiCY67upfbFiJMXjFXMlVfxZu_bifY.woff2"
  },
  "/_nuxt/fonts/rKlr2fNB2-iyJhDGh3GjbB7U7xF6BMr1eV-ngyy8udQ-JfckSRSkmknXCHp5oZLIYR_jNB6MzYb7ifA6hU4lk2o.woff2": {
    "type": "font/woff2",
    "etag": "\"4938-N3S2eKZrRgCJpY2MefXWBufCQaA\"",
    "mtime": "2026-10-28T07:16:45.131Z",
    "size": 18744,
    "path": "../public/_nuxt/fonts/rKlr2fNB2-iyJhDGh3GjbB7U7xF6BMr1eV-ngyy8udQ-JfckSRSkmknXCHp5oZLIYR_jNB6MzYb7ifA6hU4lk2o.woff2"
  },
  "/_nuxt/fonts/shQVi3meleYLIUqZP9-ZwNpu1UG0BrC8W1a0_vPu1vM-WIRtv4uldWqfFM5rfsEDcWL99nKboOnkZoW_g2Ev8Uk.woff2": {
    "type": "font/woff2",
    "etag": "\"c9b4-M34QudaP9GdXqIjZ6Tla/ROWz5M\"",
    "mtime": "2026-10-28T07:16:45.132Z",
    "size": 51636,
    "path": "../public/_nuxt/fonts/shQVi3meleYLIUqZP9-ZwNpu1UG0BrC8W1a0_vPu1vM-WIRtv4uldWqfFM5rfsEDcWL99nKboOnkZoW_g2Ev8Uk.woff2"
  },
  "/_nuxt/fonts/sr4-YXzOS5oe12y9YMYGBmhFhQd5GA1Qg2jPqXf_vgg-l_3Pof0nun2cQotURDGKdEXajlJTkQmaPWMyNbixwUs.woff2": {
    "type": "font/woff2",
    "etag": "\"680-VWLpaDsPRIda6G1y7XsvdNRkvYg\"",
    "mtime": "2026-10-28T07:16:45.132Z",
    "size": 1664,
    "path": "../public/_nuxt/fonts/sr4-YXzOS5oe12y9YMYGBmhFhQd5GA1Qg2jPqXf_vgg-l_3Pof0nun2cQotURDGKdEXajlJTkQmaPWMyNbixwUs.woff2"
  },
  "/_nuxt/fonts/uNrZoOJFFhG06f8xJpyWup6Hx8TmDAR6g1B083Ihiak-YOKRRXgcGSy5ObA5GI_ApuS5tJ3aqNRMJ5ClC-DHYdA.woff2": {
    "type": "font/woff2",
    "etag": "\"1c04-5WvTmLciYjNEKbLAMFwcYU7Yy+M\"",
    "mtime": "2026-10-28T07:16:45.132Z",
    "size": 7172,
    "path": "../public/_nuxt/fonts/uNrZoOJFFhG06f8xJpyWup6Hx8TmDAR6g1B083Ihiak-YOKRRXgcGSy5ObA5GI_ApuS5tJ3aqNRMJ5ClC-DHYdA.woff2"
  },
  "/_nuxt/fonts/vFd0fmDQQ6dUNFYjwFyhfNYWu-rKrxD3zqwr7yfeIbc-0u56STp_ypV_wck1PaUooNhuP_s4aEQjZEEXgQsB7o4.woff2": {
    "type": "font/woff2",
    "etag": "\"7354-3sxZDbLsiNoVB/08ExYGqca1+XE\"",
    "mtime": "2026-10-28T07:16:45.134Z",
    "size": 29524,
    "path": "../public/_nuxt/fonts/vFd0fmDQQ6dUNFYjwFyhfNYWu-rKrxD3zqwr7yfeIbc-0u56STp_ypV_wck1PaUooNhuP_s4aEQjZEEXgQsB7o4.woff2"
  },
  "/_nuxt/fonts/xHqlKZJFIS6402jbzL4BhtqDi2iwcDgPxe93WbcZ6SY-8WtAIQu51G7odKW44VNvFchd_g_5KgJyLFia_e_GHo0.woff2": {
    "type": "font/woff2",
    "etag": "\"2d4c-fu0YPkGe9fMm+9OwyfoMtgRM/Uo\"",
    "mtime": "2026-10-28T07:16:45.134Z",
    "size": 11596,
    "path": "../public/_nuxt/fonts/xHqlKZJFIS6402jbzL4BhtqDi2iwcDgPxe93WbcZ6SY-8WtAIQu51G7odKW44VNvFchd_g_5KgJyLFia_e_GHo0.woff2"
  },
  "/_nuxt/fonts/xiWtFoOGVpxz2O8rJiJmkaO17BlbbGGm_obdnXH3FNs-8YIR4ZfCCs9oJJ4E1XpjqOJwDB0_yPAN4AMVgQAVTKs.woff2": {
    "type": "font/woff2",
    "etag": "\"2998-n4Ng0qtMjpor9BjKimp6sLXh5BI\"",
    "mtime": "2026-10-28T07:16:45.145Z",
    "size": 10648,
    "path": "../public/_nuxt/fonts/xiWtFoOGVpxz2O8rJiJmkaO17BlbbGGm_obdnXH3FNs-8YIR4ZfCCs9oJJ4E1XpjqOJwDB0_yPAN4AMVgQAVTKs.woff2"
  },
  "/_nuxt/builds/meta/48320cc4-82df-4057-b761-e89305267823.json": {
    "type": "application/json",
    "etag": "\"58-T2hR+OTrKcGS8XQWqmfYtrUcmB4\"",
    "mtime": "2026-10-28T07:16:45.901Z",
    "size": 88,
    "path": "../public/_nuxt/builds/meta/48320cc4-82df-4057-b761-e89305267823.json"
  },
  "/_nuxt/builds/meta/e12c4d35-318c-4128-8c84-fa964d1aee9f.json": {
    "type": "application/json",
    "etag": "\"92-cHl6KPJbOH1HBv4SJKHt89YXlo4\"",
    "mtime": "2026-10-28T07:16:45.909Z",
    "size": 146,
    "path": "../public/_nuxt/builds/meta/e12c4d35-318c-4128-8c84-fa964d1aee9f.json"
  },
  "/_nuxt/builds/skew/e12c4d35-318c-4128-8c84-fa964d1aee9f.json": {
    "type": "application/json",
    "etag": "\"50-9cbdQCgy2sxeRuxVKSZrxm8y2/g\"",
    "mtime": "2026-10-28T07:16:45.909Z",
    "size": 80,
    "path": "../public/_nuxt/builds/skew/e12c4d35-318c-4128-8c84-fa964d1aee9f.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
const _ROOT_FOLDER_RE = /^\/([A-Za-z]:)?$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve$1 = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const relative = function(from, to) {
  const _from = resolve$1(from).replace(_ROOT_FOLDER_RE, "$1").split("/");
  const _to = resolve$1(to).replace(_ROOT_FOLDER_RE, "$1").split("/");
  if (_to[0][1] === ":" && _from[0][1] === ":" && _from[0] !== _to[0]) {
    return _to.join("/");
  }
  const _fromCopy = [..._from];
  for (const segment of _fromCopy) {
    if (_to[0] !== segment) {
      break;
    }
    _from.shift();
    _to.shift();
  }
  return [..._from.map(() => ".."), ..._to].join("/");
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  // Public dirs might be pruned after the build (uploaded to a CDN, sourcemaps
  // stripped), so a manifest entry with no file behind it reads as absent, not broken.
  return promises.readFile(resolve$1(serverDir, assets[id].path)).catch((error) => {
    if (error?.code !== 'ENOENT') { throw error }
  })
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/fonts/":{"maxAge":31536000},"/_og-static-fonts/":{"maxAge":31536000},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _rjytQs = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader$1(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$2({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader$1(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader$1(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  const data = readAsset(id);
  return typeof data?.then === "function" ? data.then(
    (resolved) => assertAssetData(event, resolved)
  ) : assertAssetData(event, data);
});
function assertAssetData(event, data) {
  if (data === null || data === void 0) {
    removeResponseHeader(event, "Cache-Control");
    throw createError$2({ statusCode: 404 });
  }
  return data;
}

const options = {"iconifyApiEndpoint":"https://api.iconify.design"};

const collections = {
};

const _BLMzya = defineCachedEventHandler(async (event) => {
  const collectionName = event.context.params?.collection?.replace(/\.json$/, "");
  const collection = collectionName && Object.hasOwn(collections, collectionName) ? await collections[collectionName]?.() : null;
  const apiEndPoint = options.iconifyApiEndpoint;
  const icons = String(parseQuery(parsePath(event.path).search).icons || "").split(",");
  if (!collectionName) return createError$2({ status: 400, message: "No collection specified" });
  if (!icons.length) return createError$2({ status: 400, message: "No icons specified" });
  if (collection) {
    const data = getIcons(
      collection,
      icons
    );
    consola.debug(`[Icon] serving ${icons.map((i) => "`" + collectionName + ":" + i + "`").join(",")} from bundled collection`);
    return data;
  }
  {
    const apiUrl = new URL(`./${collectionName}.json?icons=${icons.join(",")}`, apiEndPoint);
    consola.debug(`[Icon] fetching ${icons.map((i) => "`" + collectionName + ":" + i + "`").join(",")} from iconify api`);
    if (apiUrl.host !== new URL(apiEndPoint).host) {
      return createError$2({ status: 400, message: "Invalid icon request" });
    }
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        return response.status === 404 ? createError$2({ status: 404 }) : createError$2({ status: 500, message: "Failed to fetch fallback icon" });
      }
      return response.json();
    } catch (e) {
      consola.error(e);
      return createError$2({ status: 500, message: "Failed to fetch fallback icon" });
    }
  }
  return createError$2({ status: 404 });
}, {
  group: "nuxt",
  name: "icon",
  // @ts-expect-error Nitro 3 API
  allowQuery: ["icons"],
  getKey(event) {
    const collection = event.context.params?.collection?.replace(/\.json$/, "") || "unknown";
    const icons = String(parseQuery(parsePath(event.path).search).icons || "").split(",");
    return `${collection}_${icons[0]}_${icons.length}_${hash$1(icons.join(","))}`;
  },
  swr: true,
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});

function getSiteIndexable(e) {
  const { env, indexable } = getSiteConfig(e);
  if (typeof indexable !== "undefined")
    return String(indexable) === "true";
  return env === "production";
}

function getSiteRobotConfig(e) {
  const query = getQuery(e);
  const hints = [];
  const { groups, debug } = useRuntimeConfigNuxtRobots();
  let indexable = getSiteIndexable(e);
  const queryIndexableEnabled = String(query.mockProductionEnv) === "true" || query.mockProductionEnv === "";
  if (debug || false) {
    const { _context } = getSiteConfig(e, { debug: debug || false });
    if (queryIndexableEnabled) {
      indexable = true;
      hints.push("You are mocking a production enviroment with ?mockProductionEnv query.");
    } else if (!indexable && _context.indexable === "nuxt-robots:config") {
      hints.push("You are blocking indexing with your Nuxt Robots config.");
    } else if (!indexable && !queryIndexableEnabled) {
      hints.push(`Indexing is blocked by site config set by ${_context.indexable}.`);
    } else if (indexable && !queryIndexableEnabled) {
      hints.push(`Indexing is enabled from ${_context.indexable}.`);
    }
  }
  if (groups.some((g) => g.userAgent.includes("*") && g.disallow.includes("/"))) {
    indexable = false;
    hints.push("You are blocking all user agents with a wildcard `Disallow /`.");
  } else if (groups.some((g) => g.disallow.includes("/"))) {
    hints.push("You are blocking specific user agents with `Disallow /`.");
  }
  return { indexable, hints };
}

const _3TejmD = defineEventHandler(async (e) => {
  const nitroApp = useNitroApp();
  const { indexable} = getSiteRobotConfig(e);
  const { credits, cacheControl, robotsDisabledValue } = useRuntimeConfigNuxtRobots();
  let robotsTxtCtx = {
    sitemaps: [],
    groups: [
      {
        allow: [],
        comment: [],
        userAgent: ["*"],
        disallow: ["/"]
      }
    ]
  };
  if (indexable) {
    robotsTxtCtx = await resolveRobotsTxtContext(e);
    robotsTxtCtx.sitemaps = [...new Set(
      asArray(robotsTxtCtx.sitemaps).map((s) => !s.startsWith("http") ? withSiteUrl(e, s, { withBase: true}) : s)
    )];
  }
  let robotsTxt = generateRobotsTxt(robotsTxtCtx);
  if (credits) {
    const routeRules = useRuntimeConfig().nitro?.routeRules || {};
    const catchAllRule = normaliseRobotsRouteRule(routeRules["/**"]);
    const hasAllowRule = Object.values(routeRules).some((rules) => normaliseRobotsRouteRule(rules)?.allow === true);
    const siteIndexable = indexable && !robotsTxtCtx.groups.some((group) => group.userAgent.includes("*") && group.disallow.includes("/")) && !(catchAllRule?.allow === false && isNoIndexRule(catchAllRule.rule || robotsDisabledValue) && !hasAllowRule);
    robotsTxt = [
      `# START nuxt-robots (${siteIndexable ? "indexable" : "indexing disabled"})`,
      robotsTxt,
      "# END nuxt-robots"
    ].filter(Boolean).join("\n");
  }
  e.res.headers.set("Content-Type", "text/plain; charset=utf-8");
  e.res.headers.set("Cache-Control", !cacheControl ? "no-store" : cacheControl);
  const hookCtx = { robotsTxt, e };
  await nitroApp.hooks.callHook("robots:robots-txt", hookCtx);
  return hookCtx.robotsTxt;
});

const withoutLocalePrefix = path => path;

const pageMetaMatchers = [];

function getPathRobotConfig(e, options) {
  const runtimeConfig = useRuntimeConfig();
  const { robotsDisabledValue, robotsEnabledValue } = useRuntimeConfigNuxtRobots();
  if (!options?.skipSiteIndexable) {
    if (!getSiteRobotConfig(e).indexable) {
      return {
        rule: robotsDisabledValue,
        indexable: false,
        debug: {
          source: "Site Config"
        }
      };
    }
  }
  const path = options?.path || `${e.url.pathname}${e.url.search}`;
  let userAgent = options?.userAgent;
  if (!userAgent) {
    userAgent = getRequestHeader(e, "User-Agent");
  }
  const nitroApp = useNitroApp();
  const groups = [
    // run explicit user agent matching first
    ...nitroApp._robots.ctx.groups.filter((g) => {
      if (userAgent) {
        return g.userAgent.some((ua) => !!ua && userAgent.toLowerCase().includes(ua.toLowerCase()));
      }
      return false;
    }),
    // run wildcard matches second
    ...nitroApp._robots.ctx.groups.filter((g) => g.userAgent.includes("*"))
  ];
  for (const group of groups) {
    if (!options?.skipSiteIndexable && group._indexable === false) {
      return {
        indexable: false,
        rule: robotsDisabledValue,
        debug: {
          source: "/robots.txt",
          line: JSON.stringify(group)
        }
      };
    }
    const rules = options?.skipSiteIndexable ? (group._rules || []).filter((r) => r.pattern !== "/") : group._rules || [];
    const robotsTxtRule = matchPathToRule(path, rules);
    if (robotsTxtRule) {
      if (!robotsTxtRule.allow) {
        return {
          indexable: false,
          rule: robotsDisabledValue,
          debug: {
            source: "/robots.txt",
            line: `Disallow: ${robotsTxtRule.pattern}`
          }
        };
      }
      break;
    }
  }
  const baseURL = runtimeConfig.app.baseURL;
  const matchRules = (pathOrUrl) => matchRouteRules(withoutBase(withoutTrailingSlash((pathOrUrl.startsWith("/") ? pathOrUrl : parseURL(pathOrUrl, baseURL).pathname).split("?")[0]), baseURL));
  let robotRouteRules = matchRules(path);
  let routeRulesPath = path;
  if (typeof robotRouteRules.robots === "undefined") {
    const basePath = withoutLocalePrefix(routeRulesPath, runtimeConfig.public);
    if (basePath !== routeRulesPath) {
      routeRulesPath = basePath;
      robotRouteRules = matchRules(routeRulesPath);
    }
  }
  const routeRules = normaliseRobotsRouteRule(robotRouteRules);
  if (routeRules && (typeof routeRules.allow !== "undefined" || typeof routeRules.rule !== "undefined")) {
    return {
      indexable: routeRules.allow ?? false,
      rule: routeRules.rule || (routeRules.allow ? robotsEnabledValue : robotsDisabledValue),
      debug: {
        source: "Route Rules"
      }
    };
  }
  const pagePath = withoutBase(parseURL(path).pathname || "/", runtimeConfig.app.baseURL);
  const pageMetaRule = pageMetaMatchers.find((page) => page.re.test(pagePath))?.robots;
  if (typeof pageMetaRule !== "undefined") {
    const normalised = normaliseRobotsRouteRule({ robots: pageMetaRule });
    if (normalised && (typeof normalised.allow !== "undefined" || typeof normalised.rule !== "undefined")) {
      return {
        indexable: normalised.allow ?? false,
        rule: normalised.rule || (normalised.allow ? robotsEnabledValue : robotsDisabledValue),
        debug: {
          source: "Page Meta"
        }
      };
    }
  }
  return {
    indexable: true,
    rule: robotsEnabledValue
  };
}

const _vnz8S8 = defineEventHandler(async (e) => {
  if (e.url.pathname === "/robots.txt" || e.url.pathname.startsWith("/__") || e.url.pathname.startsWith("/api") || e.url.pathname.startsWith("/_nuxt")) {
    const { header, robotsDisabledValue } = useRuntimeConfigNuxtRobots();
    if (header && !getSiteRobotConfig(e).indexable)
      e.res.headers.set("X-Robots-Tag", robotsDisabledValue);
    return;
  }
  const nuxtRobotsConfig = useRuntimeConfigNuxtRobots();
  if (nuxtRobotsConfig) {
    const { header } = nuxtRobotsConfig;
    const robotConfig = getPathRobotConfig(e, { skipSiteIndexable: Boolean(getQuery(e)?.mockProductionEnv) });
    if (header) {
      e.res.headers.set("X-Robots-Tag", robotConfig.rule);
    }
    e.context.robots = robotConfig;
  }
});

const checksums = {
  "blog": "v3.5.0--TQfXXViq2rY1vlWCSZjcOgg-3okhcx8l_ah6Q1-vdFw",
  "projects": "v3.5.0--ZYZPCkyYvsKOqjh4D9LBZ45O54nNIyZ0694xv9lzJKU"
};
const checksumsStructure = {
  "blog": "EPRryq9CjLC3OQDPWRwqDG9z8rJ9cqmdetykcBuuZqI",
  "projects": "7Nh5oKx8xfRHlGdC3PsTCI6-fLfOI4Y9gQ02H-IfHZ8"
};

const tables = {
  "blog": "_content_blog",
  "projects": "_content_projects",
  "info": "_content_info"
};

const manifest = {
  "blog": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "body": "json",
      "coverImage": "string",
      "date": "string",
      "description": "string",
      "extension": "string",
      "meta": "json",
      "navigation": "json",
      "path": "string",
      "readingTime": "string",
      "seo": "json",
      "stem": "string",
      "tags": "json"
    }
  },
  "projects": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "body": "json",
      "category": "string",
      "coverImage": "string",
      "description": "string",
      "extension": "string",
      "featured": "boolean",
      "liveUrl": "string",
      "meta": "json",
      "navigation": "json",
      "path": "string",
      "repoUrl": "string",
      "seo": "json",
      "stem": "string",
      "summary": "string",
      "tagline": "string",
      "technologies": "json"
    }
  },
  "info": {
    "type": "data",
    "fields": {}
  }
};

const buildGroup = (group, type) => {
  const conditions = group._conditions;
  return conditions.length > 0 ? `(${conditions.join(` ${type} `)})` : "";
};
const collectionQueryGroup = (collection) => {
  const conditions = [];
  const query = {
    // @ts-expect-error -- internal
    _conditions: conditions,
    where(field, operator, value) {
      let condition;
      switch (operator.toUpperCase()) {
        case "IN":
        case "NOT IN":
          if (Array.isArray(value)) {
            const values = value.map((val) => singleQuote(val)).join(", ");
            condition = `"${String(field)}" ${operator.toUpperCase()} (${values})`;
          } else {
            throw new TypeError(`Value for ${operator} must be an array`);
          }
          break;
        case "BETWEEN":
        case "NOT BETWEEN":
          if (Array.isArray(value) && value.length === 2) {
            condition = `"${String(field)}" ${operator.toUpperCase()} ${singleQuote(value[0])} AND ${singleQuote(value[1])}`;
          } else {
            throw new Error(`Value for ${operator} must be an array with two elements`);
          }
          break;
        case "IS NULL":
        case "IS NOT NULL":
          condition = `"${String(field)}" ${operator.toUpperCase()}`;
          break;
        case "LIKE":
        case "NOT LIKE":
          condition = `"${String(field)}" ${operator.toUpperCase()} ${singleQuote(value)}`;
          break;
        default:
          condition = `"${String(field)}" ${operator} ${singleQuote(typeof value === "boolean" ? Number(value) : value)}`;
      }
      conditions.push(`${condition}`);
      return query;
    },
    andWhere(groupFactory) {
      const group = groupFactory(collectionQueryGroup());
      conditions.push(buildGroup(group, "AND"));
      return query;
    },
    orWhere(groupFactory) {
      const group = groupFactory(collectionQueryGroup());
      conditions.push(buildGroup(group, "OR"));
      return query;
    }
  };
  return query;
};
const collectionQueryBuilder = (collection, fetch) => {
  const params = {
    conditions: [],
    selectedFields: [],
    offset: 0,
    limit: 0,
    orderBy: [],
    // Count query
    count: {
      field: "",
      distinct: false
    }
  };
  const query = {
    // @ts-expect-error -- internal
    __params: params,
    andWhere(groupFactory) {
      const group = groupFactory(collectionQueryGroup());
      params.conditions.push(buildGroup(group, "AND"));
      return query;
    },
    orWhere(groupFactory) {
      const group = groupFactory(collectionQueryGroup());
      params.conditions.push(buildGroup(group, "OR"));
      return query;
    },
    path(path) {
      return query.where("path", "=", withoutTrailingSlash(path));
    },
    skip(skip) {
      params.offset = skip;
      return query;
    },
    where(field, operator, value) {
      query.andWhere((group) => group.where(String(field), operator, value));
      return query;
    },
    limit(limit) {
      params.limit = limit;
      return query;
    },
    select(...fields) {
      if (fields.length) {
        params.selectedFields.push(...fields);
      }
      return query;
    },
    order(field, direction) {
      params.orderBy.push(`"${String(field)}" ${direction}`);
      return query;
    },
    async all() {
      return fetch(collection, buildQuery()).then((res) => res || []);
    },
    async first() {
      return fetch(collection, buildQuery({ limit: 1 })).then((res) => res[0] || null);
    },
    async count(field = "*", distinct = false) {
      return fetch(collection, buildQuery({
        count: { field: String(field), distinct }
      })).then((m) => m[0].count);
    }
  };
  function buildQuery(opts = {}) {
    let query2 = "SELECT ";
    if (opts?.count) {
      query2 += `COUNT(${opts.count.distinct ? "DISTINCT " : ""}${opts.count.field}) as count`;
    } else {
      const fields = Array.from(new Set(params.selectedFields));
      query2 += fields.length > 0 ? fields.map((f) => `"${String(f)}"`).join(", ") : "*";
    }
    query2 += ` FROM ${tables[String(collection)]}`;
    if (params.conditions.length > 0) {
      query2 += ` WHERE ${params.conditions.join(" AND ")}`;
    }
    if (params.orderBy.length > 0) {
      query2 += ` ORDER BY ${params.orderBy.join(", ")}`;
    } else {
      query2 += ` ORDER BY stem ASC`;
    }
    const limit = opts?.limit || params.limit;
    if (limit > 0) {
      if (params.offset > 0) {
        query2 += ` LIMIT ${limit} OFFSET ${params.offset}`;
      } else {
        query2 += ` LIMIT ${limit}`;
      }
    }
    return query2;
  }
  return query;
};
function singleQuote(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

async function fetchContent(event, collection, path, options) {
  const headers = event ? getRequestHeaders(event) : {};
  headers["accept-encoding"] = void 0;
  for (const name of ["content-length", "transfer-encoding", "content-encoding", "expect"]) {
    headers[name] = void 0;
  }
  const url = `/__nuxt_content/${collection}/${path}`;
  const fetchOptions = {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    },
    query: { v: checksums[String(collection)], t: void 0 }
  };
  return event ? await event.$fetch(url, fetchOptions) : await $fetch(url, fetchOptions);
}
async function fetchDatabase(event, collection) {
  return fetchContent(event, collection, "sql_dump.txt", {
    responseType: "text",
    headers: {
      "content-type": "text/plain"
    }
  });
}
async function fetchQuery(event, collection, sql) {
  return fetchContent(event, collection, "query", {
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    body: {
      sql
    }
  });
}

const queryCollection = (event, collection) => {
  return collectionQueryBuilder(collection, (collection2, sql) => fetchQuery(event, collection2, sql));
};

const provider$1 = "nuxt-content-v3";
async function listPageCollections$1(_event) {
  return Object.entries(manifest).map(([name, entry]) => ({
    name,
    hasField: (field) => !!entry.fields && field in entry.fields,
    // @nuxt/content has no collection level sitemap opt out. The schema field is
    // the opt in, which `hasField` answers.
    inSitemap: true
  }));
}
function queryPages$2(event, collection) {
  return queryCollection(event, collection);
}

const contentRuntime = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  listPageCollections: listPageCollections$1,
  provider: provider$1,
  queryPages: queryPages$2
}, Symbol.toStringTag, { value: 'Module' }));

const filters = new Map();

const onUrlFns = new Map();

const { listPageCollections, provider, queryPages: queryPages$1 } = contentRuntime;
const _BrFx_q = defineEventHandler(async (e) => {
  const collections = (await listPageCollections(e)).filter((collection) => collection.inSitemap && collection.hasField("sitemap")).map((collection) => collection.name);
  const results = await Promise.all(collections.map(async (collection) => {
    const needsAllFields = filters?.has(collection) || onUrlFns?.has(collection);
    const query = queryPages$1(e, collection).where("path", "IS NOT NULL").where("sitemap", "IS NOT NULL");
    if (!needsAllFields)
      query.select("path", "sitemap");
    let entries;
    try {
      entries = await query.all();
    } catch (err) {
      const hint = provider === "nuxt-content-v3" ? " On serverless the content DB is restored from a prerendered sql_dump.txt that isn't readable inside the function (nuxt/content#3805). Fix: prerender the sitemap so content URLs resolve at build, or configure a runtime database (D1/Turso/Postgres)." : "";
      console.error(`[@nuxtjs/sitemap] Couldn't query content collection "${collection}" for the sitemap, so its URLs will be missing.${hint}`, err);
      return { collection, entries: [] };
    }
    const filter = filters?.get(collection);
    if (!filter)
      return { collection, entries };
    try {
      return { collection, entries: entries.filter(filter) };
    } catch (err) {
      console.error(`[@nuxtjs/sitemap] The \`filter\` callback of collection "${collection}" threw, so its URLs will be missing.`, err);
      return { collection, entries: [] };
    }
  }));
  return results.flatMap(({ collection, entries }) => {
    const onUrl = onUrlFns?.get(collection);
    return entries.filter((entry) => entry.sitemap !== false && entry.path && !entry.path.endsWith(".navigation")).map((entry) => {
      const url = {
        loc: entry.path,
        ...typeof entry.sitemap === "object" && entry.sitemap ? entry.sitemap : {}
      };
      if (onUrl) {
        try {
          onUrl(url, entry, collection);
        } catch (err) {
          throw new Error(`[@nuxtjs/sitemap] The \`onUrl\` callback of collection "${collection}" threw for "${entry.path}".`, { cause: err });
        }
      }
      return url;
    });
  });
});

const staticSitemapConfig = {"isI18nMapped":false,"sitemapName":"sitemap.xml","isMultiSitemap":false,"excludeAppSources":[],"cacheMaxAgeSeconds":600,"experimentalStreaming":false,"routeRuleHeaders":{"/sitemap.xml":{"headers":{"Content-Type":"text/xml; charset=UTF-8","Cache-Control":"public, max-age=600, must-revalidate","X-Sitemap-Prerendered":"2026-10-28T07:16:10.043Z"}},"/_og/d/**":{"headers":{"cache-control":"public, max-age=259200, s-maxage=259200, immutable"}},"/_og/r/**":{"headers":{"cache-control":"public, max-age=259200, s-maxage=259200, immutable"}},"/_og/s/**":{"headers":{"cache-control":"public, max-age=31536000, immutable"}},"/llms.txt":{"headers":{"Content-Type":"text/plain; charset=utf-8"}},"/llms/**":{"headers":{"Content-Type":"text/plain; charset=utf-8"}},"/llms-full.txt":{"headers":{"Content-Type":"text/plain; charset=utf-8"}},"/sitemap.md":{"headers":{"Content-Type":"text/markdown; charset=utf-8"}}},"autoLastmod":false,"defaultSitemapsChunkSize":1000,"minify":false,"sortEntries":true,"discoverImages":true,"discoverVideos":true,"sitemapsPathPrefix":"/__sitemap__/","xsl":"/__sitemap__/style.xsl","xslTips":true,"xslColumns":[{"label":"URL","width":"50%"},{"label":"Images","width":"25%","select":"count(image:image)"},{"label":"Last Updated","width":"25%","select":"concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"}],"credits":true,"version":"9.1.0","sitemaps":{"sitemap.xml":{"sitemapName":"sitemap.xml","route":"sitemap.xml","defaults":{},"include":[],"exclude":["/_**","/_nuxt/**","/__nuxt_content/**"],"includeAppSources":true}}};

function isUnlocalizedLocalePage(page) {
  return page._tag === "unlocalized" && typeof page.path === "string";
}
function matchesUnlocalizedLocalePage(page, path) {
  if (matchPagePattern(page.path, path))
    return true;
  if (!page.subtree)
    return false;
  const subtreePattern = `${page.path === "/" ? "" : page.path.replace(/\/$/, "")}/[...__nuxtSeoSubtree]`;
  return !!matchPagePattern(subtreePattern, path);
}
function normalizeHost(value) {
  const input = value.trim();
  return parseURL(input.startsWith("//") ? `https:${input}` : input.includes("://") ? input : `https://${input}`).host?.toLowerCase() || "";
}
function localeDomains(locale) {
  return [...locale.domains || [], ...locale.domain ? [locale.domain] : []];
}
function resolveI18nDomain(host, i18n) {
  const normalizedHost = host ? normalizeHost(host) : "";
  const domains = i18n.locales.map((locale) => ({
    locale,
    hosts: localeDomains(locale).map(normalizeHost),
    defaults: locale.defaultForDomains?.map(normalizeHost) || []
  }));
  const matches = normalizedHost ? domains.filter((entry) => entry.hosts.includes(normalizedHost) || entry.defaults.includes(normalizedHost)) : [];
  if (!matches.length)
    return { _tag: "unknown", defaultLocale: i18n.defaultLocale, locales: i18n.locales };
  const defaultLocale = matches.find((entry) => entry.defaults.includes(normalizedHost))?.locale || (matches.length === 1 ? matches[0].locale : void 0);
  return {
    _tag: "known",
    defaultLocale: defaultLocale?.code || i18n.defaultLocale,
    locales: domains.filter((entry) => !entry.hosts.length || entry.hosts.includes(normalizedHost)).map((entry) => entry.locale)
  };
}
function firstLocaleDomain(locale) {
  return locale?.defaultForDomains?.[0] || locale?.domain || locale?.domains?.[0];
}
function resolveCanonicalLocaleDomain(locale, defaultLocale) {
  return firstLocaleDomain(locale) || firstLocaleDomain(defaultLocale);
}
function splitRouteSuffix(route) {
  const suffixIndex = route.search(/[?#]/);
  const rawPathname = suffixIndex === -1 ? route : route.slice(0, suffixIndex);
  return {
    pathname: rawPathname ? rawPathname.startsWith("/") ? rawPathname : `/${rawPathname}` : "/",
    suffix: suffixIndex === -1 ? "" : route.slice(suffixIndex)
  };
}
function resolveLocaleFromRoute(route, i18n, context = {}) {
  const { pathname, suffix } = splitRouteSuffix(route);
  if (i18n.strategy !== "no_prefix") {
    const segments = pathname.split("/").filter(Boolean);
    const first = segments[0];
    const matched = first ? i18n.locales.find((l) => l.code === first) : void 0;
    if (matched) {
      const rest = segments.slice(1).join("/");
      const trailingSlash = rest && pathname.endsWith("/") ? "/" : "";
      return { locale: matched.code, basePath: `${rest ? `/${rest}${trailingSlash}` : "/"}${suffix}` };
    }
  }
  const contextLocale = context.locale ? i18n.locales.find((locale) => locale.code === context.locale) : void 0;
  const domain = resolveI18nDomain(context.host, i18n);
  const hostLocales = domain._tag === "known" ? domain.locales.filter((locale) => [...localeDomains(locale), ...locale.defaultForDomains || []].some((host) => normalizeHost(host) === normalizeHost(context.host))) : [];
  const hostLocale = hostLocales.find((locale) => locale.code === domain.defaultLocale) || hostLocales[0];
  return { locale: contextLocale?.code || hostLocale?.code || domain.defaultLocale, basePath: `${pathname}${suffix}` };
}
function localePath(basePath, locale, i18n, context = {}) {
  const { pathname, suffix } = splitRouteSuffix(basePath);
  if (i18n.strategy === "no_prefix")
    return `${pathname}${suffix}`;
  const domain = resolveI18nDomain(context.host, i18n);
  const isDefault = locale === domain.defaultLocale;
  const isDomainDefault = i18n.differentDomains || domain._tag === "known" && isDefault;
  if (i18n.strategy === "prefix_except_default" && (isDefault || i18n.differentDomains))
    return `${pathname}${suffix}`;
  if (i18n.strategy === "prefix_and_default" && isDomainDefault)
    return `${pathname}${suffix}`;
  if (pathname === "/")
    return `/${locale}${suffix}`;
  return `/${locale}${pathname}${suffix}`;
}
function toSegments(path) {
  return path.split("/").filter(Boolean);
}
const PAGE_PARAM_PATTERN = /\[\[(\.\.\.)?([^[\]]+)\]\]|\[(\.\.\.)?([^[\]]+)\]|:(\w+)(?:\((\.\*)?\))?([?*+]?)/g;
function parsePageSegment(segment) {
  const tokens = [];
  let offset = 0;
  for (const match of segment.matchAll(PAGE_PARAM_PATTERN)) {
    const index = match.index;
    if (index > offset)
      tokens.push({ _tag: "static", value: segment.slice(offset, index) });
    if (match[2]) {
      tokens.push({ _tag: "param", param: { name: match[2], catchAll: !!match[1], optional: true } });
    } else if (match[4]) {
      tokens.push({ _tag: "param", param: { name: match[4], catchAll: !!match[3], optional: false } });
    } else {
      const modifier = match[7];
      const routePattern = match[6];
      tokens.push({
        _tag: "param",
        param: {
          name: match[5],
          catchAll: !!routePattern?.includes(".*") || modifier === "*" || modifier === "+",
          optional: modifier === "?" || modifier === "*"
        }
      });
    }
    offset = index + match[0].length;
  }
  if (offset < segment.length)
    tokens.push({ _tag: "static", value: segment.slice(offset) });
  return tokens.length ? tokens : [{ _tag: "static", value: segment }];
}
function wholeSegmentParam(tokens) {
  return tokens.length === 1 && tokens[0]?._tag === "param" ? tokens[0].param : null;
}
function segmentRanks(pattern) {
  return toSegments(pattern).map((segment) => {
    const tokens = parsePageSegment(segment);
    const params = tokens.filter((token) => token._tag === "param");
    if (!params.length)
      return 6;
    const hasStatic = tokens.some((token) => token._tag === "static");
    if (hasStatic)
      return params.some((token) => token.param.optional) ? 3 : 4;
    const param = params[0].param;
    if (param.catchAll)
      return param.optional ? -1 : 0;
    return param.optional ? 1 : 2;
  });
}
function compareSpecificity(a, b) {
  const length = Math.min(a.length, b.length);
  for (let i = 0; i < length; i++) {
    const diff = b[i] - a[i];
    if (diff !== 0)
      return diff;
  }
  return a.length - b.length;
}
function matchSegmentTokens(tokens, path) {
  const failedStates = /* @__PURE__ */ new Set();
  function visit(index, offset, params) {
    const state = index * (path.length + 1) + offset;
    if (failedStates.has(state))
      return null;
    if (index === tokens.length) {
      if (offset === path.length)
        return params;
      failedStates.add(state);
      return null;
    }
    const token = tokens[index];
    if (token._tag === "static") {
      const matched = path.startsWith(token.value, offset) ? visit(index + 1, offset + token.value.length, params) : null;
      if (!matched)
        failedStates.add(state);
      return matched;
    }
    const minimumEnd = token.param.optional ? offset : offset + 1;
    for (let end = minimumEnd; end <= path.length; end++) {
      const value = path.slice(offset, end);
      const nextParams = value ? { ...params, [token.param.name]: value } : params;
      const matched = visit(index + 1, end, nextParams);
      if (matched)
        return matched;
    }
    failedStates.add(state);
    return null;
  }
  return visit(0, 0, {});
}
function matchPagePattern(pattern, path) {
  const patternSegments = toSegments(pattern);
  const pathSegments = toSegments(path);
  const failedStates = /* @__PURE__ */ new Set();
  function visit(patternIndex, pathIndex, params) {
    const state = patternIndex * (pathSegments.length + 1) + pathIndex;
    if (failedStates.has(state))
      return null;
    if (patternIndex === patternSegments.length) {
      if (pathIndex === pathSegments.length)
        return params;
      failedStates.add(state);
      return null;
    }
    const tokens = parsePageSegment(patternSegments[patternIndex]);
    const param = wholeSegmentParam(tokens);
    if (param?.catchAll) {
      const minimumEnd = param.optional ? pathIndex : pathIndex + 1;
      for (let end = pathSegments.length; end >= minimumEnd; end--) {
        const value = pathSegments.slice(pathIndex, end).join("/");
        const nextParams = value ? { ...params, [param.name]: value } : params;
        const matched2 = visit(patternIndex + 1, end, nextParams);
        if (matched2)
          return matched2;
      }
      failedStates.add(state);
      return null;
    }
    const segment = pathSegments[pathIndex];
    if (segment !== void 0) {
      const segmentParams = matchSegmentTokens(tokens, segment);
      if (segmentParams) {
        const matched2 = visit(patternIndex + 1, pathIndex + 1, { ...params, ...segmentParams });
        if (matched2)
          return matched2;
      }
    }
    const matched = param?.optional ? visit(patternIndex + 1, pathIndex, params) : null;
    if (!matched)
      failedStates.add(state);
    return matched;
  }
  return visit(0, 0, {});
}
function fillPagePattern(pattern, params) {
  const filled = [];
  for (const segment of toSegments(pattern)) {
    const tokens = parsePageSegment(segment);
    let value = "";
    for (const token of tokens) {
      if (token._tag === "static") {
        value += token.value;
        continue;
      }
      const paramValue = params[token.param.name];
      if (paramValue === void 0) {
        if (token.param.optional)
          continue;
        return null;
      }
      value += paramValue;
    }
    if (value)
      filled.push(value);
  }
  if (!filled.length)
    return "/";
  return `/${filled.join("/")}${pattern.endsWith("/") ? "/" : ""}`;
}
function alternatesForEntry(localePaths, params, i18n, context) {
  const untranslated = localePaths[i18n.defaultLocale];
  const alternates = [];
  const defaultLocale = i18n.locales.find((locale) => locale.code === i18n.defaultLocale);
  const locales = context.domainMode === "request" ? resolveI18nDomain(context.host, i18n).locales : i18n.locales;
  for (const l of locales) {
    const pattern = localePaths[l.code] ?? untranslated;
    if (localePaths[l.code] === false)
      continue;
    if (typeof pattern !== "string")
      continue;
    const path = fillPagePattern(pattern, params);
    if (path === null)
      continue;
    const domain = context.domainMode === "request" ? void 0 : resolveCanonicalLocaleDomain(l, defaultLocale);
    alternates.push({
      code: l.code,
      hreflang: l.hreflang || l.code,
      path: localePath(path, l.code, i18n, { host: domain || context.host }),
      ...domain ? { domain } : {}
    });
  }
  return alternates;
}
function alternatesFromPages(basePath, routePath, locale, i18n, context) {
  const pages = i18n.pages;
  const hasDomainLocales = i18n.differentDomains || i18n.multiDomainLocales;
  const hasContextLocale = !!context.locale && i18n.locales.some((locale2) => locale2.code === context.locale);
  if (!pages)
    return null;
  const allowLocalized = i18n.strategy !== "no_prefix" || hasDomainLocales || hasContextLocale;
  const matches = [];
  for (const page of Object.values(pages)) {
    if (!page)
      continue;
    if (isUnlocalizedLocalePage(page)) {
      if (matchesUnlocalizedLocalePage(page, routePath))
        matches.push({ _tag: "unlocalized", ranks: segmentRanks(page.path) });
      continue;
    }
    if (!allowLocalized)
      continue;
    const pattern = page[locale];
    if (!pattern)
      continue;
    const params = matchPagePattern(pattern, basePath);
    if (params)
      matches.push({ _tag: "localized", ranks: segmentRanks(pattern), localePaths: page, params });
  }
  matches.sort((a, b) => compareSpecificity(a.ranks, b.ranks));
  for (const match of matches) {
    if (match._tag === "unlocalized") {
      const defaultCode = context.domainMode === "request" ? resolveI18nDomain(context.host, i18n).defaultLocale : i18n.defaultLocale;
      const defaultLocale = i18n.locales.find((locale2) => locale2.code === defaultCode);
      if (defaultLocale) {
        const domain = context.domainMode === "request" ? void 0 : resolveCanonicalLocaleDomain(defaultLocale);
        return [{
          code: defaultLocale.code,
          hreflang: defaultLocale.hreflang || defaultLocale.code,
          path: routePath,
          ...domain ? { domain } : {}
        }];
      }
      continue;
    }
    return alternatesForEntry(match.localePaths, match.params, i18n, context);
  }
  return null;
}
function resolveLocaleAlternates(route, i18n, context = {}) {
  const { locale, basePath } = resolveLocaleFromRoute(route, i18n, context);
  const { pathname, suffix } = splitRouteSuffix(basePath);
  const { pathname: routePathname } = splitRouteSuffix(route);
  const translated = alternatesFromPages(pathname, routePathname, locale, i18n, context);
  if (translated) {
    return {
      _tag: "pages",
      alternates: translated.map((alternate) => ({ ...alternate, path: `${alternate.path}${suffix}` }))
    };
  }
  const defaultLocale = i18n.locales.find((locale2) => locale2.code === i18n.defaultLocale);
  return {
    _tag: "strategy",
    alternates: (context.domainMode === "request" ? resolveI18nDomain(context.host, i18n).locales : i18n.locales).map((l) => {
      const domain = context.domainMode === "request" ? void 0 : resolveCanonicalLocaleDomain(l, defaultLocale);
      return {
        code: l.code,
        hreflang: l.hreflang || l.code,
        path: localePath(basePath, l.code, i18n, { host: domain || context.host }),
        ...domain ? { domain } : {}
      };
    })
  };
}
function computeLocaleAlternates(route, i18n, context = {}) {
  return resolveLocaleAlternates(route, i18n, context).alternates;
}

const logger = createModuleLogger("@nuxt/sitemap");
const XML_ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;"
};
const XML_SPECIAL_CHARS_RE = /[&<>"']/g;
const HAS_XML_SPECIAL_CHARS_RE = /[&<>"']/;
function xmlEscape(value) {
  const input = String(value);
  return HAS_XML_SPECIAL_CHARS_RE.test(input) ? input.replace(XML_SPECIAL_CHARS_RE, (char) => XML_ENTITIES[char]) : input;
}
const merger = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value))
    obj[key] = Array.from(/* @__PURE__ */ new Set([...obj[key], ...value]));
  return obj[key];
});
function mergeOnKey(arr, key, onMerge) {
  if (arr.length < 2)
    return arr;
  const seen = /* @__PURE__ */ new Map();
  let resultLength = 0;
  for (const item of arr) {
    const k = item[key];
    if (seen.has(k)) {
      const existingIndex = seen.get(k);
      onMerge?.(item[key]);
      arr[existingIndex] = merger(item, arr[existingIndex]);
    } else {
      seen.set(k, resultLength);
      arr[resultLength++] = item;
    }
  }
  arr.length = resultLength;
  return arr;
}
function splitForLocales(path, locales) {
  const start = path.charCodeAt(0) === 47 ? 1 : 0;
  const end = path.indexOf("/", start);
  const prefix = path.slice(start, end === -1 ? path.length : end);
  const hasLocale = locales instanceof Set ? locales.has(prefix) : locales.includes(prefix);
  if (prefix && hasLocale) {
    const prefixEnd = start + prefix.length;
    return [prefix, start === 1 ? path.slice(prefixEnd) : path];
  }
  return [null, path];
}
function toRuntimeI18nConfig(i18n) {
  return {
    ...i18n,
    // Sitemap transforms keep the unprefixed default URL alongside Nuxt's prefixed route.
    strategy: i18n.strategy === "prefix_and_default" ? "prefix_except_default" : i18n.strategy,
    pages: i18n.pages && Object.fromEntries(
      Object.entries(i18n.pages).map(([pageName, pageLocales]) => [
        pageName,
        Object.fromEntries(i18n.locales.map((locale) => {
          const configuredPath = pageLocales[locale.code];
          return [locale.code, configuredPath === void 0 ? withLeadingSlash(pageName) : configuredPath];
        }))
      ])
    ),
    locales: i18n.locales.map((locale) => ({
      ...locale,
      hreflang: locale._hreflang
    }))
  };
}
function localeAlternateHref(alternate) {
  return alternate.domain ? joinURL(withHttps(alternate.domain), alternate.path) : alternate.path;
}
function resolveI18nRouteEntries(route, i18n, includeHref = () => true, context = {}) {
  const runtimeConfig = toRuntimeI18nConfig(i18n);
  const currentLocale = resolveLocaleFromRoute(route, runtimeConfig, context).locale;
  const alternates = computeLocaleAlternates(route, runtimeConfig, { ...context, locale: currentLocale });
  const localizedAlternates = alternates.map((alternate) => ({
    alternate,
    href: localeAlternateHref(alternate)
  }));
  const defaultHref = localizedAlternates.find(({ alternate }) => alternate.code === i18n.defaultLocale)?.href;
  const sitemapAlternatives = [
    ...defaultHref && includeHref(defaultHref) ? [{ hreflang: "x-default", href: defaultHref }] : [],
    ...localizedAlternates.filter(({ href }) => includeHref(href)).map(({ alternate, href }) => ({ hreflang: alternate.hreflang, href }))
  ];
  return localizedAlternates.flatMap(({ alternate, href }) => {
    const locale = i18n.locales.find((locale2) => locale2.code === alternate.code);
    return locale ? [{ locale, loc: href, alternatives: sitemapAlternatives }] : [];
  });
}
function resolveI18nSitemapLocaleKey(sitemapName, localeSitemapKeys) {
  let best = null;
  for (const key of localeSitemapKeys) {
    if (sitemapName === key || sitemapName.startsWith(`${key}-`)) {
      if (best === null || key.length > best.length)
        best = key;
    }
  }
  return best;
}
const StringifiedRegExpPattern = /\/(.*?)\/([gimsuy]*)$/;
function normalizeRuntimeFilters(input) {
  return (input || []).map((rule) => {
    if (rule instanceof RegExp || typeof rule === "string")
      return rule;
    const match = rule.regex.match(StringifiedRegExpPattern);
    if (match)
      return new RegExp(match[1], match[2]);
    return false;
  }).filter(Boolean);
}
function createPathFilter(options = {}, baseURL) {
  const urlFilter = createFilter({
    include: normalizeRuntimeFilters(options.include),
    exclude: normalizeRuntimeFilters(options.exclude)
  });
  const hasBase = baseURL !== "/";
  return (loc, pathname) => {
    let path = pathname;
    if (typeof path !== "string") {
      try {
        path = parseURL(loc).pathname;
      } catch {
        return false;
      }
    }
    if (hasBase)
      path = withoutBase(path, baseURL);
    return urlFilter(withLeadingSlash(path));
  };
}
const ROBOTS_BLOCKING_DIRECTIVES = /* @__PURE__ */ new Set(["noindex", "none"]);
function robotsBlocksIndexing(robots) {
  if (robots === false)
    return true;
  if (typeof robots !== "string")
    return false;
  return robots.split(",").some((directive) => ROBOTS_BLOCKING_DIRECTIVES.has(directive.trim().toLowerCase()));
}

const LABEL_RE = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
const PORT_RE = /^[1-9]\d{0,4}$/;
const UPPER_ASCII_RE = /[A-Z]/g;
const INVALID_HOST = { _tag: "InvalidHost" };
function parseHost(raw) {
  const value = (raw || "").replace(UPPER_ASCII_RE, (c) => c.toLowerCase());
  const [hostname = "", port, ...rest] = value.split(":");
  if (rest.length > 0 || hostname.length > 253)
    return INVALID_HOST;
  if (!hostname.split(".").every((label) => LABEL_RE.test(label)))
    return INVALID_HOST;
  if (port === void 0)
    return { _tag: "Host", host: hostname };
  if (!PORT_RE.test(port) || Number(port) > 65535)
    return INVALID_HOST;
  return { _tag: "Host", host: `${hostname}:${port}` };
}
function parseProtocol(raw) {
  return raw === "http" || raw === "https" ? raw : void 0;
}
function resolveCacheOrigin(input) {
  const protocol = parseProtocol(input.protocol) ?? "https";
  const request = parseHost(input.host);
  if (request._tag === "Host")
    return { _tag: "Request", protocol, host: request.host };
  const siteUrl = input.siteUrl();
  if (siteUrl) {
    const url = parseURL(siteUrl);
    const site = parseHost(url.host);
    if (site._tag === "Host")
      return { _tag: "SiteConfig", protocol: parseProtocol(url.protocol?.slice(0, -1)) ?? "https", host: site.host };
  }
  return { _tag: "Unrecognised", protocol, rawHost: input.host || "" };
}
function createCacheKey(origin, parts) {
  const scope = origin._tag === "Unrecognised" ? { protocol: origin.protocol, rawHost: origin.rawHost } : { protocol: origin.protocol, host: origin.host };
  return `sitemap-${hash$1([scope, parts])}`;
}

function firstHeaderValue(value) {
  return value?.split(",")[0]?.trim() || void 0;
}
function requestUrl(e) {
  const { url } = e;
  if (url)
    return url;
  const href = e.req?.url;
  return typeof href === "string" && URL.canParse(href) ? new URL(href) : void 0;
}
function getForwardedHost(e) {
  return firstHeaderValue(getRequestHeader(e, "x-forwarded-host")) || getRequestHeader(e, "host") || "";
}
function getForwardedProtocol(e) {
  const forwarded = firstHeaderValue(getRequestHeader(e, "x-forwarded-proto"));
  if (forwarded === "http" || forwarded === "https")
    return forwarded;
  return requestUrl(e)?.protocol.slice(0, -1);
}

const SERVER_CACHE_MAX_AGE = staticSitemapConfig.cacheMaxAgeSeconds;
const REQUEST_SITE_URL_CONTEXT = "nitro:init";
function getCacheOrigin(e) {
  return resolveCacheOrigin({
    host: getForwardedHost(e),
    protocol: getForwardedProtocol(e),
    siteUrl: () => {
      const siteConfig = getSiteConfig(e, { debug: true });
      return siteConfig._context?.url === REQUEST_SITE_URL_CONTEXT ? void 0 : siteConfig.url;
    }
  });
}
function defineSitemapCachedFunction(fn, opts) {
  return defineCachedFunction(fn, {
    name: opts.name,
    group: "sitemap",
    base: "sitemap",
    maxAge: SERVER_CACHE_MAX_AGE,
    swr: true,
    getKey: (...args) => createCacheKey(getCacheOrigin(args[0]), opts.keyParts?.(...args) ?? []),
    ...opts.validate ? { validate: opts.validate } : {}
  });
}

function dynamicRuntimeConfig(_e) {
  return useRuntimeConfig().sitemap;
}
function copyStaticSitemaps() {
  return Object.fromEntries(
    Object.entries(staticSitemapConfig.sitemaps).map(([name, sitemap]) => [name, {
      ...sitemap,
      include: normalizeRuntimeFilters("include" in sitemap ? sitemap.include : void 0),
      exclude: normalizeRuntimeFilters("exclude" in sitemap ? sitemap.exclude : void 0)
    }])
  );
}
function useSitemapRuntimeConfig(e) {
  return Object.freeze({
    ...staticSitemapConfig,
    sitemaps: copyStaticSitemaps(),
    ...dynamicRuntimeConfig()
  });
}
function serializeFilters(filters) {
  if (!filters?.length)
    return void 0;
  return filters.map((f) => {
    if (f instanceof RegExp)
      return { regex: `/${f.source}/${f.flags}` };
    return f;
  });
}
async function resolveSitemapSitemaps(e, nitro) {
  const ctx = { sitemaps: copyStaticSitemaps(), event: e };
  await nitro.hooks.callHook("sitemap:sitemaps-resolved", ctx);
  const sitemaps = { ...ctx.sitemaps };
  for (const name of Object.keys(sitemaps)) {
    const sitemap = { ...sitemaps[name] };
    if (typeof sitemap.urls === "function")
      sitemap.urls = await sitemap.urls();
    sitemap.include = serializeFilters(sitemap.include);
    sitemap.exclude = serializeFilters(sitemap.exclude);
    sitemaps[name] = sitemap;
  }
  return sitemaps;
}
const resolveSitemapSitemapsCached = defineSitemapCachedFunction(resolveSitemapSitemaps, { name: "sitemap:runtime-sitemaps" });
async function useResolvedSitemapRuntimeConfig(e) {
  const maxAge = dynamicRuntimeConfig()?.cacheMaxAgeSeconds ?? staticSitemapConfig.cacheMaxAgeSeconds;
  const shouldCache = typeof maxAge === "number" && maxAge > 0;
  const sitemaps = shouldCache ? await resolveSitemapSitemapsCached(e, useNitroApp()) : await resolveSitemapSitemaps(e, useNitroApp());
  return Object.freeze({
    ...staticSitemapConfig,
    sitemaps,
    ...dynamicRuntimeConfig()
  });
}

const _Erkv8L = defineEventHandler(async (e) => {
  const fixPath = createSitePathResolver(e, { absolute: false, withBase: true });
  const { sitemapName: fallbackSitemapName, cacheMaxAgeSeconds, version, xslColumns, xslTips } = useSitemapRuntimeConfig();
  e.res.headers.set("Content-Type", "application/xslt+xml");
  if (cacheMaxAgeSeconds)
    e.res.headers.set("Cache-Control", `public, max-age=${cacheMaxAgeSeconds}, must-revalidate`);
  else
    e.res.headers.set("Cache-Control", `no-cache, no-store`);
  const { name: siteName, url: siteUrl } = getSiteConfig(e);
  const referrer = getRequestHeader(e, "Referer") || "/";
  const referrerPath = parseURL(referrer).pathname;
  const isNotIndexButHasIndex = referrerPath !== "/sitemap.xml" && referrerPath !== "/sitemap_index.xml" && referrerPath.endsWith(".xml");
  const sitemapName = parseURL(referrer).pathname.split("/").pop()?.split("-sitemap")[0] || fallbackSitemapName;
  const title = `${siteName}${sitemapName !== "sitemap.xml" ? ` - ${sitemapName === "sitemap_index.xml" ? "index" : sitemapName}` : ""}`.replace(/&/g, "&amp;");
  getQuery$2(referrer).canonical;
  const debugUrl = xmlEscape(withQuery("/__sitemap__/debug.json", { sitemap: sitemapName }));
  xmlEscape(referrerPath);
  xmlEscape(withQuery(referrerPath, { canonical: "" }));
  const fetchErrors = [];
  const xslQuery = getQuery(e);
  if (xslQuery.error_messages) {
    const errorMessages = xslQuery.error_messages;
    const errorUrls = xslQuery.error_urls;
    if (errorMessages) {
      const messages = Array.isArray(errorMessages) ? errorMessages : [errorMessages];
      const urls = Array.isArray(errorUrls) ? errorUrls : errorUrls ? [errorUrls] : [];
      messages.forEach((msg, i) => {
        const errorParts = [xmlEscape(msg)];
        if (urls[i])
          errorParts.push(xmlEscape(urls[i]));
        fetchErrors.push(`<span class="error-item">${errorParts.join(" \u2014 ")}</span>`);
      });
    }
  }
  const hasRuntimeErrors = fetchErrors.length > 0;
  let columns = [...xslColumns];
  if (!columns.length) {
    columns = [
      { label: "URL", width: "50%" },
      { label: "Images", width: "25%", select: "count(image:image)" },
      { label: "Last Updated", width: "25%", select: "concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))" }
    ];
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <style type="text/css">
          :root {
            --accent: #00dc82;
            --accent-hover: #00b86b;
            --bg: #0a0a0a;
            --bg-elevated: #141414;
            --bg-subtle: #1a1a1a;
            --border: #262626;
            --border-subtle: #1f1f1f;
            --text: #e5e5e5;
            --text-muted: #737373;
            --text-faint: #525252;
            --error: #ef4444;
            --error-bg: rgba(239,68,68,0.1);
            --warning: #f59e0b;
          }
          * { box-sizing: border-box; }
          body {
            font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
            font-size: 13px;
            color: var(--text);
            background: var(--bg);
            margin: 0;
            padding: 0;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
          }
          a { color: inherit; transition: color 0.15s; }
          a:hover { color: var(--accent); }

          /* Debug bar (dev only) */
          .debug-bar {
            position: fixed;
            bottom: 0.75rem;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            background: var(--bg-elevated);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 0 1rem;
            height: 2.5rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 100;
            font-size: 11px;
          }
          .debug-bar-brand {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-muted);
            text-decoration: none;
          }
          .debug-bar-brand:hover { color: var(--text); }
          .debug-bar-brand svg { flex-shrink: 0; }
          .debug-bar-hint {
            color: var(--text-faint);
            margin-right: auto;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .debug-bar-hint code {
            background: var(--bg-subtle);
            padding: 0.1rem 0.3rem;
            border-radius: 3px;
            font-size: 10px;
          }
          .mode-badge {
            font-size: 9px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
          }
          .mode-dev { background: rgba(245,158,11,0.15); color: var(--warning); }
          .mode-prod { background: rgba(0,220,130,0.12); color: var(--accent); }
          .mode-toggle {
            display: inline-flex;
            border-radius: 4px;
            overflow: hidden;
            background: var(--bg-subtle);
            padding: 2px;
            gap: 1px;
          }
          .mode-toggle a {
            padding: 0.2rem 0.4rem;
            font-size: 9px;
            font-weight: 500;
            text-decoration: none;
            color: var(--text-muted);
            border-radius: 2px;
            transition: all 0.15s;
          }
          .mode-toggle a:hover { color: var(--text); }
          .mode-toggle a.active {
            background: var(--accent);
            color: #0a0a0a;
          }
          .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            text-decoration: none;
            font-size: 10px;
            font-weight: 500;
            transition: all 0.15s;
          }
          .btn-primary {
            background: var(--accent);
            color: #0a0a0a;
          }
          .btn-primary:hover { background: var(--accent-hover); color: #0a0a0a; }
          .btn svg { width: 12px; height: 12px; }

          /* Error banner */
          .error-banner {
            background: var(--error-bg);
            border-bottom: 1px solid rgba(239,68,68,0.2);
            padding: 0.75rem 1.5rem;
            color: #fca5a5;
            font-size: 12px;
          }
          .error-banner strong { color: var(--error); }
          .error-item { display: block; margin-top: 0.375rem; color: #fca5a5; }
          .error-debug-link {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            margin-top: 0.625rem;
            padding: 0.25rem 0.5rem;
            background: var(--error);
            color: #fff;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
            text-decoration: none;
            transition: background 0.15s;
          }
          .error-debug-link:hover { background: #dc2626; color: #fff; }

          /* Main content */
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.5rem;
          }
          .header {
            margin-bottom: 1.25rem;
          }
          .header h1 {
            font-size: 1rem;
            font-weight: 600;
            margin: 0 0 0.25rem 0;
            color: var(--text);
          }
          .header-meta {
            color: var(--text-muted);
            font-size: 12px;
          }
          .header-meta a {
            color: var(--text-muted);
            text-decoration: underline;
            text-decoration-color: var(--border);
            text-underline-offset: 2px;
          }
          .header-meta a:hover { color: var(--accent); text-decoration-color: var(--accent); }

          /* Table */
          .table-wrap {
            border: 1px solid var(--border);
            border-radius: 8px;
            overflow: hidden;
            background: var(--bg-elevated);
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th {
            text-align: left;
            padding: 0.625rem 1rem;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-muted);
            background: var(--bg-subtle);
            border-bottom: 1px solid var(--border);
          }
          td {
            padding: 0.5rem 1rem;
            border-bottom: 1px solid var(--border-subtle);
            font-size: 12px;
            color: var(--text);
          }
          tr:last-child td { border-bottom: none; }
          tr:hover td { background: rgba(255,255,255,0.02); }
          td a {
            text-decoration: none;
            word-break: break-all;
            color: var(--text);
          }
          td a:hover { color: var(--accent); }
          .inline-warning {
            font-size: 11px;
            color: var(--warning);
            margin-top: 0.25rem;
            line-height: 1.4;
          }
          .inline-warning::before {
            content: "\u26A0 ";
          }
          .count {
            display: inline-block;
            min-width: 1.25rem;
            padding: 0.125rem 0.375rem;
            background: var(--bg-subtle);
            border-radius: 4px;
            text-align: center;
            font-size: 11px;
            color: var(--text-muted);
            font-variant-numeric: tabular-nums;
          }
          .count:empty::before { content: "0"; }

          /* Light mode */
          @media (prefers-color-scheme: light) {
            :root {
              --accent: #00a963;
              --accent-hover: #008f54;
              --bg: #ffffff;
              --bg-elevated: #f5f5f5;
              --bg-subtle: #ebebeb;
              --border: #d4d4d4;
              --border-subtle: #e5e5e5;
              --text: #171717;
              --text-muted: #525252;
              --text-faint: #737373;
              --error: #dc2626;
              --error-bg: rgba(220,38,38,0.08);
              --warning: #b45309;
            }
            tr:hover td { background: rgba(0,0,0,0.02); }
            .btn-primary { color: #fff; }
            .btn-primary:hover { color: #fff; }
            .mode-toggle a.active { color: #fff; }
            .error-banner { color: #991b1b; }
            .error-item { color: #b91c1c; }
            .error-debug-link { color: #fff; }
            .error-debug-link:hover { color: #fff; }
          }

          .debug-bar-version {
            color: var(--text-faint);
            font-size: 10px;
          }

          /* Responsive */
          @media (max-width: 640px) {
            .debug-bar { padding: 0 0.75rem; gap: 0.5rem; width: 95%; }
            .debug-bar-brand span { display: none; }
            .debug-bar-hint { display: none; }
            .debug-bar-version { display: none; }
            .mode-badge { display: none; }
            .container { padding: 1rem; }
            th, td { padding: 0.5rem 0.75rem; }
          }
          ${""}
        </style>
      </head>
      <body>
        ${hasRuntimeErrors ? `<div class="error-banner">
            <strong>Sitemap Generation Errors</strong>
            ${fetchErrors.join("")}
            <a href="${debugUrl}" target="_blank" class="error-debug-link">View Debug Info \u2192</a>
          </div>` : ""}
        <div class="container">
          <div class="header">
            <h1>${xmlEscape(title)}</h1>
            <div class="header-meta">
              ${isNotIndexButHasIndex ? `Part of <a href="${xmlEscape(fixPath("/sitemap_index.xml"))}">${xmlEscape(fixPath("/sitemap_index.xml"))}</a> \xB7 ` : ""}
              <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
                <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> sitemaps
              </xsl:if>
              <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &lt; 1">
                <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs
              </xsl:if>
            </div>
          </div>
          <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th style="width:70%">Sitemap</th>
                    <th style="width:30%">Last Modified</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                    <xsl:variable name="sitemapURL">
                      <xsl:value-of select="sitemap:loc"/>
                    </xsl:variable>
                    <tr>
                      <td>
                        <a href="{$sitemapURL}">
                          <xsl:value-of select="sitemap:loc"/>
                        </a>
                      </td>
                      <td>
                        <xsl:value-of
                          select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </xsl:if>
          <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &lt; 1">
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    ${columns.map((c) => `<th style="width:${c.width}">${c.label}</th>`).join("\n")}
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <tr>
                      <td>
                        <xsl:variable name="itemURL">
                          <xsl:value-of select="sitemap:loc"/>
                        </xsl:variable>
                        <a href="{$itemURL}">
                          <xsl:value-of select="sitemap:loc"/>
                        </a>
                        ${""}
                      </td>
                      ${columns.filter((c) => c.label !== "URL").map((c) => `<td><span class="count"><xsl:value-of select="${c.select}"/></span></td>`).join("\n")}
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </xsl:if>
        </div>
        ${""}
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
`;
});

function escapeValueForXml(value) {
  if (value === true || value === false)
    return value ? "yes" : "no";
  return xmlEscape(String(value));
}
function yesNo(v) {
  return v === "yes" || v === true ? "yes" : "no";
}
const URLSET_OPENING_TAG = '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
function buildUrlXml(url, NL, I1, I2, I3, I4) {
  let xml = `${I1}<url>${NL}`;
  if (url.loc)
    xml += `${I2}<loc>${xmlEscape(url.loc)}</loc>${NL}`;
  if (url.lastmod)
    xml += `${I2}<lastmod>${xmlEscape(url.lastmod)}</lastmod>${NL}`;
  if (url.changefreq)
    xml += `${I2}<changefreq>${xmlEscape(url.changefreq)}</changefreq>${NL}`;
  if (url.priority !== void 0) {
    const p = typeof url.priority === "number" ? url.priority : Number.parseFloat(url.priority);
    xml += `${I2}<priority>${p.toFixed(1)}</priority>${NL}`;
  }
  if (url.alternatives) {
    for (const alt of url.alternatives) {
      let attrs = "";
      for (const k in alt) {
        if ((k === "href" || k === "hreflang") && Object.hasOwn(alt, k))
          attrs += ` ${k}="${xmlEscape(String(alt[k]))}"`;
      }
      xml += `${I2}<xhtml:link rel="alternate"${attrs} />${NL}`;
    }
  }
  if (url.images) {
    for (const img of url.images) {
      xml += `${I2}<image:image>${NL}${I3}<image:loc>${xmlEscape(img.loc)}</image:loc>${NL}`;
      if (img.title)
        xml += `${I3}<image:title>${xmlEscape(img.title)}</image:title>${NL}`;
      if (img.caption)
        xml += `${I3}<image:caption>${xmlEscape(img.caption)}</image:caption>${NL}`;
      if (img.geo_location)
        xml += `${I3}<image:geo_location>${xmlEscape(img.geo_location)}</image:geo_location>${NL}`;
      if (img.license)
        xml += `${I3}<image:license>${xmlEscape(img.license)}</image:license>${NL}`;
      xml += `${I2}</image:image>${NL}`;
    }
  }
  if (url.videos) {
    for (const video of url.videos) {
      xml += `${I2}<video:video>${NL}${I3}<video:title>${xmlEscape(video.title)}</video:title>${NL}`;
      if (video.thumbnail_loc)
        xml += `${I3}<video:thumbnail_loc>${xmlEscape(video.thumbnail_loc)}</video:thumbnail_loc>${NL}`;
      xml += `${I3}<video:description>${xmlEscape(video.description)}</video:description>${NL}`;
      if (video.content_loc)
        xml += `${I3}<video:content_loc>${xmlEscape(video.content_loc)}</video:content_loc>${NL}`;
      if (video.player_loc)
        xml += `${I3}<video:player_loc>${xmlEscape(video.player_loc)}</video:player_loc>${NL}`;
      if (video.duration !== void 0)
        xml += `${I3}<video:duration>${escapeValueForXml(video.duration)}</video:duration>${NL}`;
      if (video.expiration_date)
        xml += `${I3}<video:expiration_date>${xmlEscape(video.expiration_date)}</video:expiration_date>${NL}`;
      if (video.rating !== void 0)
        xml += `${I3}<video:rating>${escapeValueForXml(video.rating)}</video:rating>${NL}`;
      if (video.view_count !== void 0)
        xml += `${I3}<video:view_count>${escapeValueForXml(video.view_count)}</video:view_count>${NL}`;
      if (video.publication_date)
        xml += `${I3}<video:publication_date>${xmlEscape(video.publication_date)}</video:publication_date>${NL}`;
      if (video.family_friendly !== void 0)
        xml += `${I3}<video:family_friendly>${yesNo(video.family_friendly)}</video:family_friendly>${NL}`;
      if (video.restriction)
        xml += `${I3}<video:restriction relationship="${xmlEscape(video.restriction.relationship || "allow")}">${xmlEscape(video.restriction.restriction)}</video:restriction>${NL}`;
      if (video.platform)
        xml += `${I3}<video:platform relationship="${xmlEscape(video.platform.relationship || "allow")}">${xmlEscape(video.platform.platform)}</video:platform>${NL}`;
      if (video.requires_subscription !== void 0)
        xml += `${I3}<video:requires_subscription>${yesNo(video.requires_subscription)}</video:requires_subscription>${NL}`;
      if (video.price) {
        for (const price of video.price) {
          const c = price.currency ? ` currency="${xmlEscape(price.currency)}"` : "";
          const t = price.type ? ` type="${xmlEscape(price.type)}"` : "";
          xml += `${I3}<video:price${c}${t}>${xmlEscape(String(price.price ?? ""))}</video:price>${NL}`;
        }
      }
      if (video.uploader) {
        const info = video.uploader.info ? ` info="${xmlEscape(video.uploader.info)}"` : "";
        xml += `${I3}<video:uploader${info}>${xmlEscape(video.uploader.uploader)}</video:uploader>${NL}`;
      }
      if (video.live !== void 0)
        xml += `${I3}<video:live>${yesNo(video.live)}</video:live>${NL}`;
      if (video.tag) {
        const tags = Array.isArray(video.tag) ? video.tag : [video.tag];
        for (const t of tags) xml += `${I3}<video:tag>${xmlEscape(t)}</video:tag>${NL}`;
      }
      if (video.category)
        xml += `${I3}<video:category>${xmlEscape(video.category)}</video:category>${NL}`;
      if (video.gallery_loc)
        xml += `${I3}<video:gallery_loc>${xmlEscape(video.gallery_loc)}</video:gallery_loc>${NL}`;
      xml += `${I2}</video:video>${NL}`;
    }
  }
  if (url.news) {
    xml += `${I2}<news:news>${NL}${I3}<news:publication>${NL}`;
    xml += `${I4}<news:name>${xmlEscape(url.news.publication.name)}</news:name>${NL}`;
    xml += `${I4}<news:language>${xmlEscape(url.news.publication.language)}</news:language>${NL}`;
    xml += `${I3}</news:publication>${NL}`;
    if (url.news.title)
      xml += `${I3}<news:title>${xmlEscape(url.news.title)}</news:title>${NL}`;
    if (url.news.publication_date)
      xml += `${I3}<news:publication_date>${xmlEscape(url.news.publication_date)}</news:publication_date>${NL}`;
    xml += `${I2}</news:news>${NL}`;
  }
  xml += `${I1}</url>`;
  return xml;
}
function resolveXmlRenderContext(resolvers, { xsl, minify }, errorInfo) {
  let xslHref = xsl ? resolvers.relativeBaseUrlResolver(xsl) : false;
  if (xslHref && errorInfo?.messages.length) {
    xslHref = withQuery(xslHref, {
      errors: "true",
      error_messages: errorInfo.messages,
      error_urls: errorInfo.urls
    });
  }
  const NL = minify ? "" : "\n";
  return {
    xslHref,
    NL,
    I1: minify ? "" : "    ",
    I2: minify ? "" : "        ",
    I3: minify ? "" : "            ",
    I4: minify ? "" : "                "
  };
}
function urlsToXml(urls, resolvers, config, errorInfo) {
  const { version, credits } = config;
  const { xslHref, NL, I1, I2, I3, I4 } = resolveXmlRenderContext(resolvers, config, errorInfo);
  let xml = xslHref ? `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${escapeValueForXml(xslHref)}"?>${NL}` : `<?xml version="1.0" encoding="UTF-8"?>${NL}`;
  xml += URLSET_OPENING_TAG + NL;
  for (const url of urls)
    xml += buildUrlXml(url, NL, I1, I2, I3, I4) + NL;
  xml += "</urlset>";
  if (credits)
    xml += `${NL}<!-- XML Sitemap generated by @nuxtjs/sitemap v${version} at ${(/* @__PURE__ */ new Date()).toISOString()} -->`;
  return xml;
}

function resolve(s, resolvers) {
  if (typeof s === "undefined")
    return void 0;
  const str = typeof s === "string" ? s : s.toString();
  if (!resolvers)
    return str;
  if (hasProtocol(str, { acceptRelative: true, strict: false }))
    return resolvers.fixSlashes(str);
  return resolvers.canonicalUrlResolver(str);
}
function removeTrailingSlash(s) {
  let pathEnd = s.length;
  const queryIndex = s.indexOf("?");
  if (queryIndex !== -1)
    pathEnd = queryIndex;
  const hashIndex = s.indexOf("#");
  if (hashIndex !== -1 && hashIndex < pathEnd)
    pathEnd = hashIndex;
  return pathEnd > 0 && s.charCodeAt(pathEnd - 1) === 47 ? s.slice(0, pathEnd - 1) + s.slice(pathEnd) : s;
}
function preNormalizeEntry(_e, resolvers) {
  const input = typeof _e === "string" ? { loc: _e } : { ..._e };
  if (input.url && !input.loc) {
    input.loc = input.url;
  }
  delete input.url;
  if (typeof input.loc !== "string") {
    input.loc = "";
  }
  const skipEncoding = input._encoded === true;
  const e = input;
  e.loc = removeTrailingSlash(e.loc);
  e._abs = hasProtocol(e.loc, { acceptRelative: false, strict: false });
  try {
    e._path = e._abs ? parseURL(e.loc) : parsePath(e.loc);
  } catch {
    e._path = null;
  }
  if (e._path) {
    const search = e._path.search;
    const qs = search && search.length > 1 ? stringifyQuery(parseQuery(search)) : "";
    const pathname = skipEncoding ? e._path.pathname : encodePath(e._path.pathname);
    e._relativeLoc = `${pathname}${qs.length ? `?${qs}` : ""}`;
    if (e._path.host) {
      e.loc = stringifyParsedURL(e._path);
    } else {
      e.loc = e._relativeLoc;
    }
  } else if (!skipEncoding && !isEncoded(e.loc)) {
    e.loc = encodeURI(e.loc);
  }
  if (e.loc === "")
    e.loc = `/`;
  e.loc = resolve(e.loc, resolvers);
  e._key = `${e._sitemap || ""}${withoutTrailingSlash(e.loc)}`;
  return e;
}
function isEncoded(url) {
  try {
    return url !== decodeURIComponent(url);
  } catch {
    return false;
  }
}
function normaliseEntry(_e, defaults, resolvers, cache) {
  const e = defaults ? defu(_e, defaults) : { ..._e };
  if (e.lastmod) {
    const date = cache?.lastmodInput === e.lastmod ? cache.lastmodOutput : normaliseDate(e.lastmod);
    if (cache && cache.lastmodInput !== e.lastmod) {
      cache.lastmodInput = e.lastmod;
      cache.lastmodOutput = date;
    }
    if (date)
      e.lastmod = date;
    else
      delete e.lastmod;
  }
  if (!e.lastmod)
    delete e.lastmod;
  e.loc = resolve(e.loc, resolvers);
  if (e.alternatives) {
    const alternatives = e.alternatives.map(({ _i18nGenerated: _, ...alternative }) => alternative);
    for (const alt of alternatives) {
      if (typeof alt.href === "string") {
        alt.href = resolve(alt.href, resolvers);
      } else if (typeof alt.href === "object" && alt.href) {
        alt.href = resolve(alt.href.href, resolvers);
      }
    }
    e.alternatives = mergeOnKey(alternatives, "hreflang");
  }
  if (e.images) {
    const images = e.images.map((i) => ({ ...i }));
    for (const img of images) {
      img.loc = resolve(img.loc, resolvers);
    }
    e.images = mergeOnKey(images, "loc");
  }
  if (e.videos) {
    const videos = e.videos.map((v) => ({ ...v }));
    for (const video of videos) {
      if (video.content_loc) {
        video.content_loc = resolve(video.content_loc, resolvers);
      }
    }
    e.videos = mergeOnKey(videos, "content_loc");
  }
  return e;
}
const IS_VALID_W3C_DATE = [
  /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)$/,
  /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)$/,
  /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)$/,
  /^\d{4}-[01]\d-[0-3]\d$/,
  /^\d{4}-[01]\d$/,
  /^\d{4}$/
];
function isValidW3CDate(d) {
  if (!IS_VALID_W3C_DATE.some((r) => r.test(d)))
    return false;
  const [year, month, day] = d.slice(0, 10).split("-").map(Number);
  if (month !== void 0 && (month < 1 || month > 12))
    return false;
  if (day !== void 0 && (day < 1 || day > new Date(year, month, 0).getDate()))
    return false;
  return true;
}
function normaliseDate(d) {
  if (typeof d === "string") {
    const tIdx = d.indexOf("T");
    if (tIdx !== -1) {
      const t = d.slice(tIdx + 1);
      if (!t.includes("+") && !t.includes("-") && !t.includes("Z")) {
        d += "Z";
      }
    }
    if (!isValidW3CDate(d))
      return false;
    d = new Date(d);
    d.setMilliseconds(0);
    if (Number.isNaN(d.getTime()))
      return false;
  }
  const z = (n) => `0${n}`.slice(-2);
  const date = `${d.getUTCFullYear()}-${z(d.getUTCMonth() + 1)}-${z(d.getUTCDate())}`;
  if (d.getUTCHours() > 0 || d.getUTCMinutes() > 0 || d.getUTCSeconds() > 0) {
    return `${date}T${z(d.getUTCHours())}:${z(d.getUTCMinutes())}:${z(d.getUTCSeconds())}Z`;
  }
  return date;
}

function parseChunkInfo(sitemapName, sitemaps, defaultChunkSize) {
  defaultChunkSize = defaultChunkSize || 1e3;
  if (typeof sitemaps.chunks !== "undefined" && !Number.isNaN(Number(sitemapName))) {
    return {
      isChunked: true,
      baseSitemapName: "sitemap",
      chunkIndex: Number(sitemapName),
      chunkSize: defaultChunkSize
    };
  }
  if (sitemapName.includes("-")) {
    const parts = sitemapName.split("-");
    const lastPart = parts.pop();
    if (!Number.isNaN(Number(lastPart))) {
      const baseSitemapName = parts.join("-");
      const baseSitemap = sitemaps[baseSitemapName];
      if (baseSitemap && (baseSitemap.chunks || baseSitemap._isChunking)) {
        const chunkSize = typeof baseSitemap.chunks === "number" ? baseSitemap.chunks : baseSitemap.chunkSize || defaultChunkSize;
        return {
          isChunked: true,
          baseSitemapName,
          chunkIndex: Number(lastPart),
          chunkSize
        };
      }
    }
  }
  return {
    isChunked: false,
    baseSitemapName: sitemapName,
    chunkIndex: void 0,
    chunkSize: defaultChunkSize
  };
}
function sliceUrlsForChunk(urls, sitemapName, sitemaps, defaultChunkSize = 1e3) {
  const chunkInfo = parseChunkInfo(sitemapName, sitemaps, defaultChunkSize);
  if (chunkInfo.isChunked && chunkInfo.chunkIndex !== void 0) {
    const startIndex = chunkInfo.chunkIndex * chunkInfo.chunkSize;
    const endIndex = (chunkInfo.chunkIndex + 1) * chunkInfo.chunkSize;
    return urls.slice(startIndex, endIndex);
  }
  return urls;
}

const naturalCompare = new Intl.Collator(void 0, { numeric: true }).compare;
function countPathSegments(loc) {
  let segments = 1;
  for (let i = 0; i < loc.length; i++) {
    if (loc.charCodeAt(i) === 47)
      segments++;
  }
  return segments;
}
function sortInPlace(urls) {
  urls.sort((a, b) => {
    const aLoc = typeof a === "string" ? a : a.loc;
    const bLoc = typeof b === "string" ? b : b.loc;
    const aSegments = countPathSegments(aLoc);
    const bSegments = countPathSegments(bLoc);
    if (aSegments !== bSegments) {
      return aSegments - bSegments;
    }
    return naturalCompare(aLoc, bLoc);
  });
  return urls;
}

function fetchWithEvent(event, request, options) {
  const client = createFetch({
    fetch: (input, init) => {
      if (typeof input === "string" && input.startsWith("//"))
        return globalThis.fetch(new URL(input, event.req.url).href, init);
      return typeof input === "string" && input.startsWith("/") ? serverFetch(event, input, init) : globalThis.fetch(input, init);
    }
  });
  return client(request, options);
}

function inputFailure(reason, message) {
  return Object.assign(new Error(message), {
    _tag: "sitemap_input_failure",
    reason
  });
}
function isSitemapInputFailure(error) {
  return Boolean(
    error && typeof error === "object" && "_tag" in error && error._tag === "sitemap_input_failure"
  );
}
function isReadableStream(input) {
  return typeof input === "object" && input !== null && "getReader" in input && typeof input.getReader === "function";
}
function isAsyncIterable(input) {
  return typeof input === "object" && input !== null && Symbol.asyncIterator in input;
}
function isIterable(input) {
  return typeof input === "object" && input !== null && Symbol.iterator in input;
}
async function* streamChunks(stream) {
  const reader = stream.getReader();
  let done = false;
  try {
    while (!done) {
      const next = await reader.read();
      done = next.done;
      if (next.value !== void 0)
        yield next.value;
    }
  } finally {
    if (!done)
      await reader.cancel("sitemap input stopped before completion");
    reader.releaseLock();
  }
}
async function* chunks(input) {
  if (typeof input === "string" || input instanceof Uint8Array) {
    yield input;
    return;
  }
  if (isReadableStream(input)) {
    yield* streamChunks(input);
    return;
  }
  if (isAsyncIterable(input)) {
    yield* input;
    return;
  }
  if (isIterable(input))
    yield* input;
}
async function* byteChunks(input) {
  const encoder = new TextEncoder();
  for await (const chunk of chunks(input))
    yield typeof chunk === "string" ? encoder.encode(chunk) : chunk;
}
async function* replayBytes(initial, iterator) {
  let done = false;
  try {
    yield* initial;
    while (!done) {
      const next = await iterator.next();
      done = Boolean(next.done);
      if (next.value)
        yield next.value;
    }
  } finally {
    if (!done)
      await iterator.return?.();
  }
}
function iteratorStream(iterator) {
  return new ReadableStream({
    async pull(controller) {
      const next = await iterator.next();
      if (next.done) {
        controller.close();
        return;
      }
      if (next.value)
        controller.enqueue(next.value);
    },
    async cancel() {
      await iterator.return?.();
    }
  });
}
function gzipPrefix(chunks2) {
  const first = chunks2.flatMap((chunk) => [...chunk.subarray(0, 2)]);
  return first.length >= 2 && first[0] === 31 && first[1] === 139;
}
function utf8ByteLength(input) {
  let bytes = 0;
  for (let index = 0; index < input.length; index++) {
    const code = input.charCodeAt(index);
    if (code <= 127) {
      bytes++;
    } else if (code <= 2047) {
      bytes += 2;
    } else if (code >= 55296 && code <= 56319) {
      const next = input.charCodeAt(index + 1);
      if (next < 56320 || next > 57343)
        return void 0;
      bytes += 4;
      index++;
    } else if (code >= 56320 && code <= 57343) {
      return void 0;
    } else {
      bytes += 3;
    }
  }
  return bytes;
}
async function* decodedTextChunks(input, maxDecodedBytes, stats) {
  if (typeof input === "string") {
    const bytes = utf8ByteLength(input);
    if (bytes !== void 0) {
      stats.bytesRead = bytes;
      if (bytes > maxDecodedBytes) {
        throw inputFailure(
          "decoded_limit",
          `Sitemap exceeds ${maxDecodedBytes} decoded bytes`
        );
      }
      if (input)
        yield input;
      return;
    }
  }
  const iterator = byteChunks(input)[Symbol.asyncIterator]();
  const initial = [];
  let prefixBytes = 0;
  while (prefixBytes < 2) {
    const next = await iterator.next();
    if (next.done)
      break;
    if (next.value) {
      initial.push(next.value);
      prefixBytes += next.value.byteLength;
    }
  }
  stats.compressed = gzipPrefix(initial);
  const replay = replayBytes(initial, iterator);
  const decodedBytes = stats.compressed ? streamChunks(
    iteratorStream(replay[Symbol.asyncIterator]()).pipeThrough(
      new DecompressionStream("gzip")
    )
  ) : replay;
  const decoder = new TextDecoder("utf-8", { fatal: true });
  try {
    for await (const bytes of decodedBytes) {
      stats.bytesRead += bytes.byteLength;
      if (stats.bytesRead > maxDecodedBytes) {
        throw inputFailure(
          "decoded_limit",
          `Sitemap exceeds ${maxDecodedBytes} decoded bytes`
        );
      }
      let text;
      try {
        text = decoder.decode(bytes, { stream: true });
      } catch {
        throw inputFailure("invalid_utf8", "Sitemap contains invalid UTF-8");
      }
      if (text)
        yield text;
    }
    const tail = decoder.decode();
    if (tail)
      yield tail;
  } catch (error) {
    if (isSitemapInputFailure(error) || !stats.compressed)
      throw error;
    throw inputFailure(
      "malformed",
      error instanceof Error ? error.message : "Invalid gzip sitemap body"
    );
  }
}

const ARRAY_TAGS = /* @__PURE__ */ new Set([
  "url",
  "sitemap",
  "item",
  "entry",
  "image:image",
  "video:video",
  "xhtml:link",
  "link",
  "media:content",
  "media:thumbnail"
]);
const LOC_OPEN = "<loc>";
const LOC_CLOSE = "</loc>";
const LASTMOD_OPEN = "<lastmod>";
const LASTMOD_CLOSE = "</lastmod>";
const CHANGEFREQ_OPEN = "<changefreq>";
const CHANGEFREQ_CLOSE = "</changefreq>";
const PRIORITY_OPEN = "<priority>";
const PRIORITY_CLOSE = "</priority>";
const parser$2 = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  parseAttributeValue: false,
  parseTagValue: false,
  trimValues: true,
  isArray: (name) => ARRAY_TAGS.has(name)
});
function localName(name) {
  return name.includes(":") ? name.slice(name.lastIndexOf(":") + 1) : name;
}
function child(node, name) {
  if (!node || typeof node !== "object")
    return void 0;
  const record = node;
  if (name in record)
    return record[name];
  for (const key in record) {
    if (localName(key) === name)
      return record[key];
  }
  return void 0;
}
function many(node, name) {
  const value = child(node, name);
  if (value === void 0)
    return [];
  return Array.isArray(value) ? value : [value];
}
function text(value) {
  if (Array.isArray(value))
    return value.length === 1 ? text(value[0]) : void 0;
  if (typeof value === "string" && value.length > 0)
    return value;
  if (typeof value === "number")
    return String(value);
  if (value && typeof value === "object") {
    const raw = value["#text"];
    if (typeof raw === "string" && raw.length > 0)
      return raw;
  }
  return void 0;
}
function attribute(node, name) {
  if (!node || typeof node !== "object")
    return void 0;
  const value = node[name];
  if (Array.isArray(value))
    return value.length === 1 ? text(value[0]) : void 0;
  return typeof value === "string" && value.length > 0 ? value : void 0;
}
function issueForLoc(loc, entryIndex) {
  if (!loc) {
    return {
      code: "missing_loc",
      severity: "warning",
      message: "Sitemap entry is missing its required location",
      entryIndex,
      field: "loc"
    };
  }
  let valid = false;
  try {
    const url = new URL(loc);
    valid = url.protocol === "http:" || url.protocol === "https:";
  } catch {
    valid = false;
  }
  if (!valid) {
    return {
      code: "invalid_loc",
      severity: "warning",
      message: "Sitemap entry location is not an absolute URL",
      entryIndex,
      field: "loc",
      value: loc
    };
  }
  return void 0;
}
function simpleText(value) {
  const trimmed = value?.trim();
  return trimmed || void 0;
}
function hasInvalidXmlText(value) {
  if (value.includes("]]>"))
    return true;
  for (let index = 0; index < value.length; index++) {
    const code = value.charCodeAt(index);
    if (code <= 8 || code === 11 || code === 12 || code >= 14 && code <= 31 || code >= 65534)
      return true;
  }
  return false;
}
function skipXmlWhitespace(input, start) {
  let cursor = start;
  while (cursor < input.length) {
    const code = input.charCodeAt(cursor);
    if (code !== 32 && code !== 9 && code !== 10 && code !== 13)
      break;
    cursor++;
  }
  return cursor;
}
function simpleFieldEnd(input, start, open, close) {
  if (!input.startsWith(open, start))
    return -1;
  const valueStart = start + open.length;
  const end = input.indexOf(close, valueStart);
  if (end === -1)
    return -1;
  const value = input.slice(valueStart, end);
  return value.includes("<") || value.includes("&") || value.includes("\r") || hasInvalidXmlText(value) ? -1 : end;
}
function parseSimpleRecord(xml, recordTag) {
  if (recordTag !== "url" && recordTag !== "sitemap")
    return void 0;
  const recordOpen = recordTag === "url" ? "<url>" : "<sitemap>";
  const recordClose = recordTag === "url" ? "</url>" : "</sitemap>";
  if (!xml.startsWith(recordOpen))
    return void 0;
  let cursor = skipXmlWhitespace(xml, recordOpen.length);
  const locEnd = simpleFieldEnd(xml, cursor, LOC_OPEN, LOC_CLOSE);
  if (locEnd === -1)
    return void 0;
  const loc = simpleText(xml.slice(cursor + LOC_OPEN.length, locEnd));
  cursor = skipXmlWhitespace(xml, locEnd + LOC_CLOSE.length);
  let lastmod;
  if (xml.startsWith(LASTMOD_OPEN, cursor)) {
    const lastmodEnd = simpleFieldEnd(xml, cursor, LASTMOD_OPEN, LASTMOD_CLOSE);
    if (lastmodEnd === -1)
      return void 0;
    lastmod = simpleText(xml.slice(cursor + LASTMOD_OPEN.length, lastmodEnd));
    cursor = skipXmlWhitespace(xml, lastmodEnd + LASTMOD_CLOSE.length);
  }
  let changefreq;
  if (recordTag === "url" && xml.startsWith(CHANGEFREQ_OPEN, cursor)) {
    const changefreqEnd = simpleFieldEnd(xml, cursor, CHANGEFREQ_OPEN, CHANGEFREQ_CLOSE);
    if (changefreqEnd === -1)
      return void 0;
    changefreq = simpleText(xml.slice(cursor + CHANGEFREQ_OPEN.length, changefreqEnd));
    cursor = skipXmlWhitespace(xml, changefreqEnd + CHANGEFREQ_CLOSE.length);
  }
  let priority;
  if (recordTag === "url" && xml.startsWith(PRIORITY_OPEN, cursor)) {
    const priorityEnd = simpleFieldEnd(xml, cursor, PRIORITY_OPEN, PRIORITY_CLOSE);
    if (priorityEnd === -1)
      return void 0;
    priority = simpleText(xml.slice(cursor + PRIORITY_OPEN.length, priorityEnd));
    cursor = skipXmlWhitespace(xml, priorityEnd + PRIORITY_CLOSE.length);
  }
  if (!xml.startsWith(recordClose, cursor) || cursor + recordClose.length !== xml.length)
    return void 0;
  const locIssue = issueForLoc(loc, 0);
  const issues = locIssue ? [locIssue] : [];
  if (recordTag === "sitemap") {
    return {
      _tag: "index",
      format: "xml",
      entries: loc ? [{ loc, ...lastmod ? { lastmod } : {} }] : [],
      issues
    };
  }
  return {
    _tag: "urlset",
    format: "xml",
    entries: loc ? [{
      loc,
      ...lastmod ? { lastmod } : {},
      ...changefreq ? { changefreq } : {},
      ...priority ? { priority } : {}
    }] : [],
    issues
  };
}
function imageEntries(node) {
  return many(node, "image").flatMap((image) => {
    const loc = text(child(image, "loc"));
    if (!loc)
      return [];
    const caption = text(child(image, "caption"));
    const geoLocation = text(child(image, "geo_location"));
    const title = text(child(image, "title"));
    const license = text(child(image, "license"));
    return [{
      loc,
      ...caption ? { caption } : {},
      ...geoLocation ? { geoLocation } : {},
      ...title ? { title } : {},
      ...license ? { license } : {}
    }];
  });
}
function alternatives(node) {
  return many(node, "link").flatMap((link) => {
    const href = attribute(link, "href");
    const hreflang = attribute(link, "hreflang");
    if (!href || !hreflang)
      return [];
    const rel = attribute(link, "rel");
    return [{ href, hreflang, ...rel ? { rel } : {} }];
  });
}
function media(node) {
  const contents = many(node, "content").flatMap((content) => {
    const url = attribute(content, "url");
    if (!url)
      return [];
    const type = attribute(content, "type");
    const medium = attribute(content, "medium");
    return [{ url, ...type ? { type } : {}, ...medium ? { medium } : {} }];
  });
  const thumbnails = many(node, "thumbnail").flatMap((thumbnail) => {
    const url = attribute(thumbnail, "url");
    if (!url)
      return [];
    const width = attribute(thumbnail, "width");
    const height = attribute(thumbnail, "height");
    return [{ url, ...width ? { width } : {}, ...height ? { height } : {} }];
  });
  if (contents.length === 0 && thumbnails.length === 0)
    return void 0;
  return {
    ...contents.length > 0 ? { contents } : {},
    ...thumbnails.length > 0 ? { thumbnails } : {}
  };
}
function localizeRecord(value) {
  if (Array.isArray(value))
    return value.map(localizeRecord);
  if (!value || typeof value !== "object")
    return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, childValue]) => [
      localName(key),
      localizeRecord(childValue)
    ])
  );
}
function extensions(node) {
  if (!node || typeof node !== "object")
    return void 0;
  let hasExtension = false;
  for (const key in node) {
    const name = localName(key);
    if (name === "image" || name === "link" || name === "content" || name === "thumbnail" || name === "video" || name === "news") {
      hasExtension = true;
      break;
    }
  }
  if (!hasExtension)
    return void 0;
  const images = imageEntries(node);
  const alternateEntries = alternatives(node);
  const mediaEntries = media(node);
  const videos = many(node, "video").filter((value) => value && typeof value === "object").map((value) => localizeRecord(value));
  const news = child(node, "news");
  if (images.length === 0 && alternateEntries.length === 0 && !mediaEntries && videos.length === 0 && !news)
    return void 0;
  return {
    ...images.length > 0 ? { images } : {},
    ...alternateEntries.length > 0 ? { alternatives: alternateEntries } : {},
    ...videos.length > 0 ? { videos } : {},
    ...news && typeof news === "object" ? { news: localizeRecord(news) } : {},
    ...mediaEntries ? { media: mediaEntries } : {}
  };
}
function urlRecord(node, loc) {
  const lastmod = text(child(node, "lastmod"));
  const changefreq = text(child(node, "changefreq"));
  const priority = text(child(node, "priority"));
  const parsedExtensions = extensions(node);
  return {
    loc,
    ...lastmod ? { lastmod } : {},
    ...changefreq ? { changefreq } : {},
    ...priority ? { priority } : {},
    ...parsedExtensions ? { extensions: parsedExtensions } : {}
  };
}
function parseUrlset(root) {
  const issues = [];
  const entries = [];
  for (const [index, node] of many(root, "url").entries()) {
    const loc = text(child(node, "loc"));
    const locIssue = issueForLoc(loc, index);
    if (locIssue)
      issues.push(locIssue);
    if (loc)
      entries.push(urlRecord(node, loc));
  }
  return { _tag: "urlset", format: "xml", entries, issues };
}
function parseIndex(root) {
  const issues = [];
  const entries = [];
  for (const [index, node] of many(root, "sitemap").entries()) {
    const loc = text(child(node, "loc"));
    const locIssue = issueForLoc(loc, index);
    if (locIssue)
      issues.push(locIssue);
    if (!loc)
      continue;
    const lastmod = text(child(node, "lastmod"));
    entries.push({ loc, ...lastmod ? { lastmod } : {} });
  }
  return { _tag: "index", format: "xml", entries, issues };
}
function parseRss(root) {
  const issues = [];
  const entries = [];
  const channel = child(root, "channel");
  for (const [index, item] of many(channel, "item").entries()) {
    const loc = text(child(item, "link"));
    const locIssue = issueForLoc(loc, index);
    if (locIssue)
      issues.push(locIssue);
    if (!loc)
      continue;
    const lastmod = text(child(item, "pubDate"));
    const parsedMedia = media(item);
    entries.push({
      loc,
      ...lastmod ? { lastmod } : {},
      ...parsedMedia ? { extensions: { media: parsedMedia } } : {}
    });
  }
  return { _tag: "urlset", format: "rss2", entries, issues };
}
function parseAtom(root) {
  const issues = [];
  const entries = [];
  for (const [index, entry] of many(root, "entry").entries()) {
    const links = many(entry, "link");
    const alternate = links.find((link) => !attribute(link, "rel") || attribute(link, "rel") === "alternate");
    const loc = alternate ? attribute(alternate, "href") : void 0;
    const locIssue = issueForLoc(loc, index);
    if (locIssue)
      issues.push(locIssue);
    if (!loc)
      continue;
    const lastmod = text(child(entry, "updated")) ?? text(child(entry, "published"));
    const parsedMedia = media(entry);
    entries.push({
      loc,
      ...lastmod ? { lastmod } : {},
      ...parsedMedia ? { extensions: { media: parsedMedia } } : {}
    });
  }
  return { _tag: "urlset", format: "atom1", entries, issues };
}
function parseDocument$2(xml) {
  const validation = XMLValidator.validate(xml);
  if (validation !== true)
    return { _tag: "malformed", detail: validation.err.msg };
  try {
    return { _tag: "document", document: parser$2.parse(xml) };
  } catch (error) {
    return {
      _tag: "malformed",
      detail: error instanceof Error ? error.message : String(error)
    };
  }
}
function parseXmlRecord(xml, recordTag) {
  const simple = parseSimpleRecord(xml, recordTag);
  if (simple)
    return simple;
  const parsed = parseDocument$2(xml);
  if (parsed._tag === "malformed")
    return parsed;
  const rootEntry = Object.entries(parsed.document).find(([name]) => !name.startsWith("?"));
  if (!rootEntry || localName(rootEntry[0]).toLowerCase() !== recordTag) {
    return recordTag === "sitemap" ? { _tag: "index", format: "xml", entries: [], issues: [] } : {
      _tag: "urlset",
      format: recordTag === "item" ? "rss2" : recordTag === "entry" ? "atom1" : "xml",
      entries: [],
      issues: []
    };
  }
  const root = rootEntry[1];
  switch (recordTag) {
    case "url":
      return parseUrlset({ url: root });
    case "sitemap":
      return parseIndex({ sitemap: root });
    case "item":
      return parseRss({ channel: { item: root } });
    case "entry":
      return parseAtom({ entry: root });
  }
}

const DEFAULT_MAX_DECODED_BYTES = 50 * 1024 * 1024;
const DEFAULT_MAX_ENTRIES = 5e4;
const DEFAULT_MAX_ENTRY_BYTES = 1024 * 1024;
const RECORD_OPEN_PATTERNS = {
  url: /^<((?:[\w.-]+:)?url)\b/i,
  sitemap: /^<((?:[\w.-]+:)?sitemap)\b/i,
  item: /^<((?:[\w.-]+:)?item)\b/i,
  entry: /^<((?:[\w.-]+:)?entry)\b/i
};
function parseLimit(value, fallback, name) {
  if (value === void 0)
    return fallback;
  if (!Number.isFinite(value) || value < 0 || !Number.isInteger(value))
    throw new RangeError(`${name} must be a non-negative finite integer`);
  return value;
}
function issue(code, message, severity = "error") {
  return { code, severity, message };
}
function summary(stats, entriesRead) {
  return {
    bytesRead: stats.bytesRead,
    entriesRead,
    compressed: stats.compressed
  };
}
function findMarkupEnd(input, start) {
  let quote = "";
  for (let index = start + 1; index < input.length; index++) {
    const character = input[index];
    if (quote) {
      if (character === quote)
        quote = "";
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === ">")
      return index;
  }
  return -1;
}
function isXmlWhitespace(character) {
  return character === " " || character === "	" || character === "\n" || character === "\r";
}
function isSelfClosingMarkup(markup) {
  let cursor = markup.length - 2;
  while (cursor >= 0 && isXmlWhitespace(markup[cursor]))
    cursor--;
  return markup[cursor] === "/";
}
function trimMarkupPrefix(input) {
  let output = input.trimStart();
  while (true) {
    if (output.startsWith("<?")) {
      const end = output.indexOf("?>");
      if (end === -1)
        return output;
      output = output.slice(end + 2).trimStart();
      continue;
    }
    if (output.startsWith("<!--")) {
      const end = output.indexOf("-->");
      if (end === -1)
        return output;
      output = output.slice(end + 3).trimStart();
      continue;
    }
    return output;
  }
}
function detectRoot(input) {
  const source = trimMarkupPrefix(input);
  if (source.startsWith("<!--") || source.startsWith("<?"))
    return void 0;
  if (!source.startsWith("<"))
    return void 0;
  if (/^<!doctype\b/i.test(source) || /^<html\b/i.test(source)) {
    return {
      _tag: "malformed",
      detail: /^<html\b|^<!DOCTYPE\s+html\b/i.test(source) ? "html" : "Document type declarations are not supported"
    };
  }
  const end = findMarkupEnd(source, 0);
  if (end === -1)
    return void 0;
  const openTag = source.slice(0, end + 1);
  const match = /^<([A-Z_][\w.:-]*)\b/i.exec(openTag);
  const qualifiedName = match?.[1];
  const name = qualifiedName?.split(":").at(-1)?.toLowerCase();
  if (name === "urlset") {
    return {
      name,
      qualifiedName,
      format: "xml",
      kind: "urlset",
      openTag,
      recordTag: "url",
      containerReady: true
    };
  }
  if (name === "sitemapindex") {
    return {
      name,
      qualifiedName,
      format: "xml",
      kind: "index",
      openTag,
      recordTag: "sitemap",
      containerReady: true
    };
  }
  if (name === "rss") {
    return {
      name,
      qualifiedName,
      format: "rss2",
      kind: "urlset",
      openTag,
      recordTag: "item",
      containerReady: false
    };
  }
  if (name === "feed") {
    return {
      name,
      qualifiedName,
      format: "atom1",
      kind: "urlset",
      openTag,
      recordTag: "entry",
      containerReady: true
    };
  }
  return { _tag: "malformed", detail: "unsupported" };
}
function afterRootOpen(input, root) {
  const source = trimMarkupPrefix(input);
  return source.slice(root.openTag.length);
}
function prepareRssContainer(input) {
  const source = trimMarkupPrefix(input);
  if (!source.startsWith("<"))
    return void 0;
  const end = findMarkupEnd(source, 0);
  if (end === -1)
    return void 0;
  if (!/^<channel\b/i.test(source.slice(0, end + 1)))
    return { _tag: "malformed", detail: "RSS document is missing its channel element" };
  return { ready: true, rest: source.slice(end + 1) };
}
function extractFeedMetadata(source, maxEntryBytes) {
  if (!source.startsWith("<"))
    return { _tag: "malformed", detail: "Unexpected text inside feed" };
  const openingEnd = findMarkupEnd(source, 0);
  if (openingEnd === -1)
    return void 0;
  const opening = /^<([A-Z_][\w.:-]*)\b/i.exec(source);
  if (!opening)
    return { _tag: "malformed", detail: "Unexpected markup inside feed" };
  if (/\/\s*>$/.test(source.slice(0, openingEnd + 1)))
    return { _tag: "skip", rest: source.slice(openingEnd + 1) };
  const stack = [opening[1].toLowerCase()];
  let cursor = openingEnd + 1;
  while (cursor < source.length) {
    const markupStart = source.indexOf("<", cursor);
    if (markupStart === -1)
      break;
    if (source.startsWith("<!--", markupStart)) {
      const end = source.indexOf("-->", markupStart + 4);
      if (end === -1)
        return void 0;
      cursor = end + 3;
      continue;
    }
    if (source.startsWith("<![CDATA[", markupStart)) {
      const end = source.indexOf("]]>", markupStart + 9);
      if (end === -1)
        return void 0;
      cursor = end + 3;
      continue;
    }
    if (source.startsWith("<?", markupStart)) {
      const end = source.indexOf("?>", markupStart + 2);
      if (end === -1)
        return void 0;
      cursor = end + 2;
      continue;
    }
    const markupEnd = findMarkupEnd(source, markupStart);
    if (markupEnd === -1)
      return void 0;
    const markup = source.slice(markupStart, markupEnd + 1);
    const tag = /^<(\/?)[ \t\r\n]*([A-Z_][\w.:-]*)\b/i.exec(markup);
    if (!tag)
      return { _tag: "malformed", detail: "Unexpected markup inside feed metadata" };
    const name = tag[2].toLowerCase();
    if (tag[1]) {
      const expected = stack.pop();
      if (expected !== name)
        return { _tag: "malformed", detail: `Mismatched closing element in feed metadata: ${tag[2]}` };
      if (stack.length === 0)
        return { _tag: "skip", rest: source.slice(markupEnd + 1) };
    } else if (!/\/\s*>$/.test(markup)) {
      stack.push(name);
    }
    cursor = markupEnd + 1;
  }
  if (new TextEncoder().encode(source).byteLength > maxEntryBytes)
    return { _tag: "malformed", detail: `Sitemap metadata element exceeds ${maxEntryBytes} bytes` };
  return void 0;
}
function startsWithCI(input, prefix) {
  return input.length >= prefix.length && input.slice(0, prefix.length).toLowerCase() === prefix.toLowerCase();
}
function extractRecord(input, root, maxEntryBytes) {
  const source = trimMarkupPrefix(input);
  if (source.startsWith("<!--") || source.startsWith("<?"))
    return void 0;
  const rootClose = `</${root.qualifiedName}>`;
  if (startsWithCI(source, rootClose))
    return { _tag: "close", rest: source.slice(rootClose.length) };
  if (root.name === "rss" && startsWithCI(source, "</channel>")) {
    const rest = trimMarkupPrefix(source.slice("</channel>".length));
    const rssClose = `</${root.qualifiedName}>`;
    if (startsWithCI(rest, rssClose))
      return { _tag: "close", rest: rest.slice(rssClose.length) };
    if (rest.length > 0 && findMarkupEnd(rest, 0) !== -1)
      return { _tag: "malformed", detail: "RSS channel is not followed by its closing root" };
    return void 0;
  }
  const directOpen = `<${root.recordTag}`;
  const directBoundary = source[directOpen.length];
  const directName = source.startsWith(directOpen) && (directBoundary === ">" || directBoundary === "/" || isXmlWhitespace(directBoundary)) ? root.recordTag : void 0;
  const qualifiedName = directName ?? RECORD_OPEN_PATTERNS[root.recordTag].exec(source)?.[1];
  if (!qualifiedName) {
    if (source.length === 0)
      return void 0;
    if (root.name === "rss" || root.name === "feed")
      return extractFeedMetadata(source, maxEntryBytes);
    if (findMarkupEnd(source, 0) !== -1)
      return { _tag: "malformed", detail: `Unexpected element inside ${root.name}` };
    return void 0;
  }
  const openingEnd = findMarkupEnd(source, 0);
  if (openingEnd === -1)
    return void 0;
  if (isSelfClosingMarkup(source.slice(0, openingEnd + 1))) {
    return {
      _tag: "record",
      record: source.slice(0, openingEnd + 1),
      rest: source.slice(openingEnd + 1)
    };
  }
  const close = `</${qualifiedName}>`;
  const closeIndex = findRecordClose(source, close, openingEnd + 1);
  if (closeIndex === -1) {
    if (new TextEncoder().encode(source).byteLength > maxEntryBytes) {
      return {
        _tag: "malformed",
        detail: `Sitemap entry exceeds ${maxEntryBytes} bytes`
      };
    }
    return void 0;
  }
  const end = closeIndex + close.length;
  return {
    _tag: "record",
    record: source.slice(0, end),
    rest: source.slice(end)
  };
}
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function findRecordClose(input, close, start) {
  let closePattern;
  let cursor = start;
  while (true) {
    let closeIndex = input.indexOf(close, cursor);
    if (closeIndex === -1) {
      closePattern ||= new RegExp(escapeRegExp(close), "gi");
      closePattern.lastIndex = cursor;
      const match = closePattern.exec(input);
      if (!match)
        return -1;
      closeIndex = match.index;
    }
    const window = input.slice(cursor, closeIndex);
    const commentIndexRel = window.indexOf("<!--");
    const cdataIndexRel = window.indexOf("<![CDATA[");
    const hiddenIndexRel = commentIndexRel === -1 ? cdataIndexRel : cdataIndexRel === -1 ? commentIndexRel : Math.min(commentIndexRel, cdataIndexRel);
    if (hiddenIndexRel === -1)
      return closeIndex;
    const marker = hiddenIndexRel === commentIndexRel ? "-->" : "]]>";
    const hiddenEnd = input.indexOf(marker, cursor + hiddenIndexRel);
    if (hiddenEnd === -1)
      return -1;
    cursor = hiddenEnd + marker.length;
  }
}
function parseRecord(root, record) {
  const parsed = parseXmlRecord(record, root.recordTag);
  if (parsed._tag === "malformed")
    return { issues: [], malformed: parsed.detail };
  if (parsed._tag === "unsupported")
    return { issues: [], malformed: "Unsupported sitemap entry" };
  const entry = parsed.entries[0];
  return {
    ...entry ? { entry } : {},
    issues: parsed.issues
  };
}
function textEntry(line, index) {
  const loc = line.trim();
  if (!loc)
    return {};
  let valid = false;
  try {
    const url = new URL(loc);
    valid = url.protocol === "http:" || url.protocol === "https:";
  } catch {
    valid = false;
  }
  return {
    entry: { loc },
    ...!valid ? {
      issue: {
        code: "invalid_loc",
        severity: "warning",
        message: "Text sitemap entry is not an absolute HTTP(S) URL",
        entryIndex: index,
        field: "loc",
        value: loc
      }
    } : {}
  };
}
async function* parseSitemap(input, options = {}) {
  const maxDecodedBytes = parseLimit(
    options.maxDecodedBytes,
    DEFAULT_MAX_DECODED_BYTES,
    "maxDecodedBytes"
  );
  const maxEntries = parseLimit(options.maxEntries, DEFAULT_MAX_ENTRIES, "maxEntries");
  const maxEntryBytes = parseLimit(
    options.maxEntryBytes,
    DEFAULT_MAX_ENTRY_BYTES,
    "maxEntryBytes"
  );
  const stats = { bytesRead: 0, compressed: false };
  const chunks = decodedTextChunks(input, maxDecodedBytes, stats);
  let entriesRead = 0;
  let buffer = "";
  let root;
  let closed = false;
  let sawText = false;
  try {
    for await (const chunk of chunks) {
      buffer += chunk;
      sawText ||= chunk.trim().length > 0;
      if (options.formatHint === "text") {
        while (true) {
          const newline = buffer.indexOf("\n");
          if (newline === -1)
            break;
          const line = buffer.slice(0, newline).replace(/\r$/, "");
          buffer = buffer.slice(newline + 1);
          const parsed = textEntry(line, entriesRead);
          if (!parsed.entry)
            continue;
          if (entriesRead >= maxEntries) {
            const completeness = { _tag: "partial", reason: "entry_limit" };
            yield { _tag: "issue", issue: issue("entry_limit", `Sitemap exceeds ${maxEntries} entries`) };
            yield { _tag: "end", completeness, summary: summary(stats, entriesRead) };
            return;
          }
          if (entriesRead === 0)
            yield { _tag: "document", format: "text", kind: "urlset" };
          yield { _tag: "url", entry: parsed.entry };
          if (parsed.issue)
            yield { _tag: "issue", issue: parsed.issue };
          entriesRead++;
        }
        continue;
      }
      if (!root) {
        const detected = detectRoot(buffer);
        if (!detected)
          continue;
        if ("_tag" in detected) {
          const reason = detected.detail === "html" ? "html" : detected.detail === "unsupported" ? "unsupported" : "malformed";
          yield { _tag: "issue", issue: issue(reason, detected.detail) };
          yield {
            _tag: "end",
            completeness: { _tag: "failed", reason },
            summary: summary(stats, entriesRead)
          };
          return;
        }
        root = detected;
        buffer = afterRootOpen(buffer, root);
        yield { _tag: "document", format: root.format, kind: root.kind };
        if (isSelfClosingMarkup(root.openTag)) {
          closed = true;
          continue;
        }
      }
      if (closed)
        continue;
      if (!root.containerReady) {
        const container = prepareRssContainer(buffer);
        if (!container)
          continue;
        if ("_tag" in container) {
          yield { _tag: "issue", issue: issue("malformed", container.detail) };
          yield {
            _tag: "end",
            completeness: { _tag: "failed", reason: "malformed" },
            summary: summary(stats, entriesRead)
          };
          return;
        }
        root.containerReady = true;
        buffer = container.rest;
      }
      while (true) {
        const extracted = extractRecord(buffer, root, maxEntryBytes);
        if (!extracted)
          break;
        if (extracted._tag === "malformed") {
          yield { _tag: "issue", issue: issue("malformed", extracted.detail) };
          yield {
            _tag: "end",
            completeness: { _tag: "failed", reason: "malformed" },
            summary: summary(stats, entriesRead)
          };
          return;
        }
        if (extracted._tag === "close") {
          buffer = extracted.rest;
          closed = true;
          break;
        }
        if (extracted._tag === "skip") {
          buffer = extracted.rest;
          continue;
        }
        if (entriesRead >= maxEntries) {
          const completeness = { _tag: "partial", reason: "entry_limit" };
          yield { _tag: "issue", issue: issue("entry_limit", `Sitemap exceeds ${maxEntries} entries`) };
          yield { _tag: "end", completeness, summary: summary(stats, entriesRead) };
          return;
        }
        const parsed = parseRecord(root, extracted.record);
        if (parsed.malformed) {
          yield { _tag: "issue", issue: issue("malformed", parsed.malformed) };
          yield {
            _tag: "end",
            completeness: { _tag: "failed", reason: "malformed" },
            summary: summary(stats, entriesRead)
          };
          return;
        }
        for (const parsedIssue of parsed.issues)
          yield { _tag: "issue", issue: parsedIssue };
        if (parsed.entry) {
          if (root.kind === "urlset")
            yield { _tag: "url", entry: parsed.entry };
          else
            yield { _tag: "sitemap", entry: parsed.entry };
          entriesRead++;
        }
        buffer = extracted.rest;
      }
    }
    if (options.formatHint === "text") {
      const parsed = textEntry(buffer.replace(/\r$/, ""), entriesRead);
      if (parsed.entry) {
        if (entriesRead >= maxEntries) {
          yield { _tag: "issue", issue: issue("entry_limit", `Sitemap exceeds ${maxEntries} entries`) };
          yield {
            _tag: "end",
            completeness: { _tag: "partial", reason: "entry_limit" },
            summary: summary(stats, entriesRead)
          };
          return;
        }
        if (entriesRead === 0)
          yield { _tag: "document", format: "text", kind: "urlset" };
        yield { _tag: "url", entry: parsed.entry };
        if (parsed.issue)
          yield { _tag: "issue", issue: parsed.issue };
        entriesRead++;
      }
      if (entriesRead === 0 && !sawText) {
        yield { _tag: "issue", issue: issue("empty", "Sitemap body is empty") };
        yield {
          _tag: "end",
          completeness: { _tag: "failed", reason: "empty" },
          summary: summary(stats, entriesRead)
        };
        return;
      }
      yield {
        _tag: "end",
        completeness: { _tag: "complete" },
        summary: summary(stats, entriesRead)
      };
      return;
    }
    if (!root) {
      const reason = sawText ? "unsupported" : "empty";
      yield {
        _tag: "issue",
        issue: issue(reason, reason === "empty" ? "Sitemap body is empty" : "Document is not a supported sitemap format")
      };
      yield {
        _tag: "end",
        completeness: { _tag: "failed", reason },
        summary: summary(stats, entriesRead)
      };
      return;
    }
    if (!closed || trimMarkupPrefix(buffer).length > 0) {
      yield { _tag: "issue", issue: issue("malformed", `Unclosed or trailing content in ${root.name}`) };
      yield {
        _tag: "end",
        completeness: { _tag: "failed", reason: "malformed" },
        summary: summary(stats, entriesRead)
      };
      return;
    }
    yield {
      _tag: "end",
      completeness: { _tag: "complete" },
      summary: summary(stats, entriesRead)
    };
  } catch (error) {
    if (!isSitemapInputFailure(error))
      throw error;
    yield { _tag: "issue", issue: issue(error.reason, error.message) };
    const completeness = error.reason === "decoded_limit" ? { _tag: "partial", reason: "decoded_limit" } : { _tag: "failed", reason: error.reason };
    yield { _tag: "end", completeness, summary: summary(stats, entriesRead) };
  }
}
async function collectSitemap(input, options = {}) {
  let document;
  const issues = [];
  let end;
  for await (const event of parseSitemap(input, options)) {
    if (event._tag === "document") {
      document = event.kind === "urlset" ? { _tag: "urlset", format: event.format, entries: [] } : { _tag: "index", format: "xml", entries: [] };
    } else if (event._tag === "url" && document?._tag === "urlset") {
      document.entries.push(event.entry);
    } else if (event._tag === "sitemap" && document?._tag === "index") {
      document.entries.push(event.entry);
    } else if (event._tag === "issue") {
      issues.push(event.issue);
    } else if (event._tag === "end") {
      end = event;
    }
  }
  if (!end)
    throw new Error("Sitemap parser ended without a terminal event");
  if (end.completeness._tag === "failed") {
    return {
      _tag: "failure",
      issues,
      completeness: end.completeness,
      summary: end.summary
    };
  }
  if (!document) {
    return {
      _tag: "partial",
      issues,
      completeness: end.completeness,
      summary: end.summary
    };
  }
  return {
    _tag: "document",
    document,
    issues,
    completeness: end.completeness,
    summary: end.summary
  };
}

const changeFrequencies = /* @__PURE__ */ new Set([
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never"
]);
function readerEntryToSitemapInput(entry) {
  const priority = entry.priority === void 0 ? void 0 : Number.parseFloat(entry.priority);
  const changefreq = entry.changefreq && changeFrequencies.has(entry.changefreq) ? entry.changefreq : void 0;
  return {
    loc: entry.loc,
    ...entry.lastmod ? { lastmod: entry.lastmod } : {},
    ...changefreq ? { changefreq } : {},
    ...priority !== void 0 && Number.isFinite(priority) ? { priority } : {},
    ...entry.extensions?.alternatives ? { alternatives: entry.extensions.alternatives.map(({ hreflang, href }) => ({ hreflang, href })) } : {},
    ...entry.extensions?.images ? {
      images: entry.extensions.images.map((image) => ({
        loc: image.loc,
        ...image.caption ? { caption: image.caption } : {},
        ...image.geoLocation ? { geo_location: image.geoLocation } : {},
        ...image.title ? { title: image.title } : {},
        ...image.license ? { license: image.license } : {}
      }))
    } : {},
    ...entry.extensions?.videos ? { videos: entry.extensions.videos } : {},
    ...entry.extensions?.news ? { news: entry.extensions.news } : {}
  };
}
function normalizeSourceInput(source) {
  if (typeof source === "string") {
    return { context: { name: "hook" }, fetch: source };
  }
  if (Array.isArray(source)) {
    return { context: { name: "hook" }, fetch: source };
  }
  return source;
}
async function tryFetchWithFallback(url, options, event) {
  const isExternalUrl = !url.startsWith("/");
  if (isExternalUrl) {
    const strategies = [
      // Strategy 1: Use globalThis.$fetch (original approach)
      () => globalThis.$fetch(url, options),
      // Strategy 2: If event is available, try using event context even for external URLs
      event ? () => fetchWithEvent(event, url, options) : null,
      // Strategy 3: Use native fetch as last resort
      () => $fetch$1(url, options)
    ].filter(Boolean);
    let lastError = null;
    for (const strategy of strategies) {
      try {
        return await strategy();
      } catch (error) {
        lastError = error;
        continue;
      }
    }
    throw lastError;
  }
  return event ? await fetchWithEvent(event, url, options) : await globalThis.$fetch(url, options);
}
const SOURCE_FETCH_MEMO_KEY = "_sitemapSourceFetches";
function useSourceFetchMemo(event) {
  const context = event?.context;
  if (!context)
    return void 0;
  const existing = context[SOURCE_FETCH_MEMO_KEY];
  if (existing)
    return existing;
  const memo = /* @__PURE__ */ new Map();
  context[SOURCE_FETCH_MEMO_KEY] = memo;
  return memo;
}
const fetchSourceUrlsCached = defineSitemapCachedFunction(
  (event, _key, url, options) => fetchSourceUrls(url, options, event),
  {
    name: "sitemap:source-urls",
    keyParts: (_event, key) => [key],
    // A failed fetch must never be served again, otherwise one outage empties the sitemap for a
    // whole cache window.
    validate: (entry) => entry.value !== void 0 && !entry.value._isFailure
  }
);
function isSourceCacheEnabled() {
  const cacheMaxAgeSeconds = staticSitemapConfig.cacheMaxAgeSeconds;
  return cacheMaxAgeSeconds > 0;
}
async function fetchDataSource(input, event) {
  const context = typeof input.context === "string" ? { name: input.context } : input.context || { name: "fetch" };
  const url = typeof input.fetch === "string" ? input.fetch : input.fetch[0];
  const options = typeof input.fetch === "string" ? {} : input.fetch[1];
  const memo = useSourceFetchMemo(event);
  const key = `${url}::${JSON.stringify(options || {})}`;
  let request = memo?.get(key);
  if (!request) {
    request = event && isSourceCacheEnabled() ? fetchSourceUrlsCached(event, key, url, options) : fetchSourceUrls(url, options, event);
    memo?.set(key, request);
  }
  const result = await request;
  if (result._isFailure)
    memo?.delete(key);
  return { ...input, context, ...result };
}
async function fetchSourceUrls(url, options, event) {
  const start = Date.now();
  const isExternalUrl = !url.startsWith("/");
  const timeout = isExternalUrl ? 1e4 : options.timeout || 5e3;
  const timeoutController = new AbortController();
  const abortRequestTimeout = setTimeout(() => timeoutController.abort(), timeout);
  try {
    let isMaybeErrorResponse = false;
    const pathname = parseURL(url).pathname.toLowerCase();
    const isGzUrl = pathname.endsWith(".gz");
    const isXmlRequest = pathname.endsWith(".xml") || isGzUrl;
    const mergedHeaders = defu(
      options?.headers,
      {
        Accept: isXmlRequest ? "text/xml" : "application/json"
      },
      event && !isExternalUrl ? { host: getForwardedHost(event) } : {}
    );
    const fetchOptions = {
      ...options,
      // Fetch XML sources as raw bytes so we can detect and decompress a gzip body
      // (either a `.gz` URL, or a server that serves gzip without Content-Encoding)
      // before it's mangled by a UTF-8 text decode.
      responseType: isXmlRequest ? "arrayBuffer" : "json",
      signal: timeoutController.signal,
      headers: mergedHeaders,
      // Use ofetch's built-in retry for external sources
      ...isExternalUrl && {
        retry: 2,
        retryDelay: 200
      },
      // @ts-expect-error untyped
      onResponse({ response }) {
        if (typeof response._data === "string" && response._data.startsWith("<!DOCTYPE html>"))
          isMaybeErrorResponse = true;
      }
    };
    const res = await tryFetchWithFallback(url, fetchOptions, event);
    const timeTakenMs = Date.now() - start;
    if (isMaybeErrorResponse) {
      return {
        urls: [],
        timeTakenMs,
        error: "Received HTML response instead of JSON",
        // An HTML page is usually an outage or an auth wall, both transient. Treat it like a
        // failed fetch so the empty result is never cached.
        _isFailure: true
      };
    }
    let urls = [];
    if (isXmlRequest) {
      const bytes = res instanceof Uint8Array ? res : new Uint8Array(res);
      const result = await collectSitemap(bytes);
      if (result._tag !== "document")
        throw new Error(result.issues.map((issue) => issue.message).join("; ") || "Invalid sitemap document");
      if (result.document._tag !== "urlset")
        throw new Error("Sitemap URL source must be a URL set, not a sitemap index");
      urls = result.document.entries.map(readerEntryToSitemapInput);
    } else if (typeof res === "object") {
      urls = res.urls || res;
    }
    return {
      timeTakenMs,
      urls
    };
  } catch (_err) {
    const error = _err;
    if (isExternalUrl) {
      const errorInfo = {
        url,
        timeout,
        error: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        method: options?.method || "GET"
      };
      logger.error("Failed to fetch external source.", errorInfo);
    } else {
      logger.error("Failed to fetch source.", { url, error: error.message });
    }
    return {
      urls: [],
      error: error.message,
      _isFailure: true
      // Mark as failure to prevent caching
    };
  } finally {
    if (abortRequestTimeout) {
      clearTimeout(abortRequestTimeout);
    }
  }
}
async function globalSitemapSources() {
  const m = await import('../virtual/global-sources.mjs');
  return [...m.sources];
}
async function childSitemapSources(definition) {
  if (definition?.sources?.length)
    return [...definition.sources];
  if (definition?.urls) {
    const urls = typeof definition.urls === "function" ? await definition.urls() : definition.urls;
    return [{
      context: { name: `sitemaps:${definition.sitemapName}:urls`, description: "Set with the sitemap definition `urls`." },
      urls
    }];
  }
  if (!definition?._hasSourceChunk)
    return [];
  const m = await import('../virtual/child-sources.mjs');
  return [...m.sources[definition.sitemapName] || []];
}
async function resolveSitemapSources(sources, event) {
  return await Promise.all(
    sources.map((source) => {
      const normalized = normalizeSourceInput(source);
      if ("urls" in normalized) {
        return {
          timeTakenMs: 0,
          ...normalized,
          urls: normalized.urls
        };
      }
      if (normalized.fetch)
        return fetchDataSource(normalized, event);
      return {
        ...normalized,
        error: "Invalid source"
      };
    })
  );
}

function isGeneratedAlternative(alternative) {
  return alternative._i18nGenerated !== void 0 && alternative._i18nGenerated === JSON.stringify([alternative.hreflang, alternative.href.toString()]);
}
function resolveSitemapEntries(sitemap, urls, runtimeConfig, resolvers, baseURL) {
  const {
    autoI18n: configuredI18n,
    isI18nMapped
  } = runtimeConfig;
  const requestHost = configuredI18n?.multiDomainLocales && resolvers ? parseURL(resolvers.canonicalUrlResolver("/")).host : void 0;
  const domain = configuredI18n?.multiDomainLocales ? resolveI18nDomain(requestHost, configuredI18n) : void 0;
  const autoI18n = configuredI18n && domain ? { ...configuredI18n, defaultLocale: domain.defaultLocale } : configuredI18n;
  const availableLocales = domain?.locales || autoI18n?.locales;
  const hasFilters = !!sitemap.include?.length || !!sitemap.exclude?.length;
  const filterPath = hasFilters ? createPathFilter({
    include: sitemap.include,
    exclude: sitemap.exclude
  }, baseURL || "/") : void 0;
  const domainLocaleCodes = autoI18n?.multiDomainLocales && autoI18n.strategy !== "no_prefix" ? new Set(autoI18n.locales.map((l) => l.code)) : void 0;
  const domainLocaleKeys = autoI18n?.multiDomainLocales ? autoI18n.locales.map((l) => l._sitemap) : [];
  const _urls = [];
  const unavailableEntries = /* @__PURE__ */ new Set();
  for (const _e of urls) {
    const e = preNormalizeEntry(_e, resolvers);
    if (autoI18n && domainLocaleCodes && !e._abs && !e._i18nTransform && !e._i18nUnlocalized) {
      const prefix = splitForLocales(e._path?.pathname || "/", domainLocaleCodes)[0];
      const localeCode = prefix || autoI18n.defaultLocale;
      const sitemapLocale = isI18nMapped && typeof e._sitemap === "string" ? resolveI18nSitemapLocaleKey(e._sitemap, domainLocaleKeys) : null;
      const locale = autoI18n.locales.find((l) => l.code === localeCode);
      if (locale && availableLocales && !availableLocales.includes(locale))
        continue;
      if (autoI18n.strategy === "prefix_except_default" && prefix === autoI18n.defaultLocale)
        continue;
      if (sitemapLocale && sitemapLocale !== locale?._sitemap)
        continue;
      if (e.alternatives?.some(isGeneratedAlternative)) {
        const alternatives = e.alternatives.filter((alternative) => {
          if (!isGeneratedAlternative(alternative))
            return true;
          if (alternative.hreflang === "x-default")
            return false;
          const alternateLocale = autoI18n.locales.find((l) => l._hreflang === alternative.hreflang);
          if (!alternateLocale)
            return true;
          if (availableLocales && !availableLocales.includes(alternateLocale))
            return false;
          const alternatePrefix = splitForLocales(parseURL(alternative.href.toString()).pathname || "/", domainLocaleCodes)[0];
          if (["prefix_except_default", "prefix_and_default"].includes(autoI18n.strategy) && alternatePrefix === autoI18n.defaultLocale)
            return false;
          return (alternatePrefix || autoI18n.defaultLocale) === alternateLocale.code;
        });
        const defaultHreflang = autoI18n.locales.find((l) => l.code === autoI18n.defaultLocale)?._hreflang;
        const defaultAlternative = alternatives.find((a) => a.hreflang === defaultHreflang);
        e.alternatives = defaultAlternative && !alternatives.some((alternative) => alternative.hreflang === "x-default") ? [...alternatives, { ...defaultAlternative, hreflang: "x-default" }] : alternatives;
      }
    }
    const needsExpansion = e._i18nTransform && autoI18n && autoI18n.strategy !== "no_prefix";
    if (e.loc && (needsExpansion || !filterPath || filterPath(e.loc, e._path?.pathname)))
      _urls.push(e);
  }
  const withoutPrefixPaths = {};
  if (autoI18n && autoI18n.strategy !== "no_prefix") {
    const localeCodes = new Set(autoI18n.locales.map((l) => l.code));
    const localeByCode = new Map(autoI18n.locales.map((l) => [l.code, l]));
    const defaultLocale = autoI18n.defaultLocale;
    const hasDifferentDomains = !!autoI18n.differentDomains;
    const validI18nUrlsForTransform = [];
    for (let i = 0; i < _urls.length; i++) {
      const _e = _urls[i];
      if (_e._abs && !_e._i18nTransform)
        continue;
      const split = _e._i18nUnlocalized ? [null, _e._relativeLoc] : splitForLocales(_e._relativeLoc, localeCodes);
      let localeCode = split[0];
      const pathWithoutPrefix = split[1];
      if (!localeCode)
        localeCode = defaultLocale;
      const e = _e;
      e._pathWithoutPrefix = pathWithoutPrefix;
      const locale = localeByCode.get(localeCode);
      if (!locale)
        continue;
      e._locale = locale;
      e._index = i;
      e._key = `${e._sitemap || ""}${e._path?.pathname || "/"}${e._path?.search || ""}`;
      withoutPrefixPaths[pathWithoutPrefix] = withoutPrefixPaths[pathWithoutPrefix] || [];
      if (!e._i18nTransform && !e._i18nUnlocalized && !withoutPrefixPaths[pathWithoutPrefix].some((e2) => e2._locale.code === locale.code))
        withoutPrefixPaths[pathWithoutPrefix].push(e);
      validI18nUrlsForTransform.push(e);
    }
    for (const e of validI18nUrlsForTransform) {
      if (!e._i18nTransform && !e.alternatives?.length) {
        const alternatives = [];
        for (const u of e._i18nUnlocalized ? [e] : withoutPrefixPaths[e._pathWithoutPrefix] || []) {
          if (autoI18n.multiDomainLocales && availableLocales && !availableLocales.includes(u._locale))
            continue;
          if (u._locale.code === defaultLocale) {
            alternatives.push({
              href: u.loc,
              hreflang: "x-default"
            });
          }
          alternatives.push({
            href: u.loc,
            hreflang: u._locale._hreflang || defaultLocale
          });
        }
        if (alternatives.length)
          e.alternatives = alternatives;
      } else if (e._i18nTransform) {
        delete e._i18nTransform;
        const routeEntries = resolveI18nRouteEntries(e._relativeLoc, autoI18n, (href) => !filterPath || filterPath(href), autoI18n.multiDomainLocales ? { host: requestHost || "", domainMode: "request" } : {});
        if (autoI18n.multiDomainLocales) {
          if (!routeEntries.length) {
            unavailableEntries.add(e);
            continue;
          }
          if (autoI18n.strategy === "prefix_and_default") {
            const defaultEntry = routeEntries.find((entry) => entry.locale.code === defaultLocale);
            if (defaultEntry) {
              routeEntries.push({ ...defaultEntry, loc: `/${defaultLocale}${defaultEntry.loc === "/" ? "" : defaultEntry.loc}` });
            }
          }
        }
        if (hasDifferentDomains) {
          e.alternatives = routeEntries[0]?.alternatives;
        } else {
          const sourceLocaleAvailable = routeEntries.some((entry) => entry.locale.code === e._locale.code);
          for (const { alternatives, locale: l, loc } of routeEntries) {
            const _sitemap = isI18nMapped ? l._sitemap : void 0;
            const { _index: _, ...rest } = e;
            const newEntry = preNormalizeEntry({
              _sitemap,
              ...rest,
              _key: `${_sitemap || ""}${loc || "/"}`,
              _locale: l,
              loc,
              alternatives
            }, resolvers);
            if (e._index !== void 0 && (e._locale.code === newEntry._locale.code || !sourceLocaleAvailable)) {
              _urls[e._index] = newEntry;
              e._index = void 0;
            } else {
              _urls.push(newEntry);
            }
          }
        }
      }
      if (isI18nMapped) {
        e._sitemap = e._sitemap || e._locale._sitemap;
        e._key = `${e._sitemap || ""}${e.loc || "/"}${e._path?.search || ""}`;
      }
      if (e._index)
        _urls[e._index] = e;
    }
  }
  return _urls.filter((entry) => !unavailableEntries.has(entry) && (!filterPath || filterPath(entry.loc, entry._path?.pathname)));
}

async function buildResolvedSitemapUrls(effectiveSitemap, matchName, isChunked, resolvers, runtimeConfig, nitro) {
  const { sitemaps, autoI18n, isI18nMapped, isMultiSitemap, sortEntries } = runtimeConfig;
  let sourcesInput = effectiveSitemap.includeAppSources ? [...await globalSitemapSources(), ...await childSitemapSources(effectiveSitemap)] : await childSitemapSources(effectiveSitemap);
  if (nitro && resolvers.event) {
    const ctx = {
      event: resolvers.event,
      sitemapName: matchName,
      sources: sourcesInput
    };
    await nitro.hooks.callHook("sitemap:sources", ctx);
    sourcesInput = ctx.sources;
  }
  const sources = await resolveSitemapSources(sourcesInput, resolvers.event);
  const failedSources = sources.filter((source) => source.error && source._isFailure).map((source) => ({
    url: typeof source.fetch === "string" ? source.fetch : source.fetch?.[0] || "unknown",
    error: source.error || "Unknown error"
  }));
  const resolvedCtx = {
    urls: sources.flatMap((s) => s.urls),
    sitemapName: matchName,
    event: resolvers.event
  };
  await nitro?.hooks.callHook("sitemap:input", resolvedCtx);
  const enhancedUrls = resolveSitemapEntries(effectiveSitemap, resolvedCtx.urls, { autoI18n, isI18nMapped }, resolvers, useRuntimeConfig().app.baseURL);
  const localeSitemapKeys = isI18nMapped && autoI18n ? autoI18n.locales.map((l) => l._sitemap) : [];
  if (isMultiSitemap) {
    const sitemapNames = Object.keys(sitemaps).filter((k) => k !== "index");
    const validSitemapNames = new Set(sitemapNames);
    if (isI18nMapped) {
      for (const name of sitemapNames) {
        const localeKey = resolveI18nSitemapLocaleKey(name, localeSitemapKeys);
        if (localeKey)
          validSitemapNames.add(localeKey);
      }
    }
    const warnedSitemaps = nitro?._sitemapWarnedSitemaps || /* @__PURE__ */ new Set();
    for (const e of enhancedUrls) {
      const hasMatchingSitemap = typeof e._sitemap === "string" && validSitemapNames.has(e._sitemap);
      if (typeof e._sitemap === "string" && !hasMatchingSitemap) {
        if (!warnedSitemaps.has(e._sitemap)) {
          warnedSitemaps.add(e._sitemap);
          logger.error(`Sitemap \`${e._sitemap}\` not found in sitemap config. Available sitemaps: ${sitemapNames.join(", ")}. Either add it to the sitemap config or register it with the sitemap:sitemaps-resolved hook. Entry \`${e.loc}\` will be omitted.`);
        }
      }
    }
    if (nitro) {
      nitro._sitemapWarnedSitemaps = warnedSitemaps;
    }
  }
  const matchedLocaleSitemap = isI18nMapped ? resolveI18nSitemapLocaleKey(matchName, localeSitemapKeys) : null;
  const filteredUrls = enhancedUrls.filter((e) => {
    if (e._sitemap === false)
      return false;
    if (isMultiSitemap && e._sitemap && matchName) {
      if (isChunked)
        return e._sitemap === matchName;
      if (e._sitemap === matchName)
        return true;
      if (isI18nMapped)
        return e._sitemap === matchedLocaleSitemap;
      return false;
    }
    return true;
  });
  const urls = sortEntries ? sortInPlace(filteredUrls) : filteredUrls;
  return { urls, failedSources };
}
const buildResolvedSitemapUrlsCached = defineSitemapCachedFunction(
  async (_event, effectiveSitemap, matchName, isChunked, resolvers, runtimeConfig, nitro) => buildResolvedSitemapUrls(effectiveSitemap, matchName, isChunked, resolvers, runtimeConfig, nitro),
  {
    name: "sitemap:resolved-urls",
    keyParts: (_event, _effectiveSitemap, matchName, isChunked) => [matchName, isChunked],
    // A build with failed sources is never cached: one outage must not pin an empty sitemap
    // for a whole cache window. The next request retries the sources instead.
    validate: (entry) => entry.value !== void 0 && !entry.value.failedSources?.length
  }
);
async function getResolvedSitemapUrls(effectiveSitemap, matchName, isChunked, resolvers, runtimeConfig, nitro) {
  const event = resolvers.event;
  const shouldCache = typeof runtimeConfig.cacheMaxAgeSeconds === "number" && runtimeConfig.cacheMaxAgeSeconds > 0;
  if (shouldCache && event) {
    return buildResolvedSitemapUrlsCached(event, effectiveSitemap, matchName, isChunked, resolvers, runtimeConfig, nitro);
  }
  return buildResolvedSitemapUrls(effectiveSitemap, matchName, isChunked, resolvers, runtimeConfig, nitro);
}
async function buildSitemapUrls(sitemap, resolvers, runtimeConfig, nitro) {
  const { sitemaps, autoI18n, defaultSitemapsChunkSize } = runtimeConfig;
  const chunkSize = defaultSitemapsChunkSize || void 0;
  const chunkInfo = parseChunkInfo(sitemap.sitemapName, sitemaps, chunkSize);
  if (autoI18n?.differentDomains) {
    const domain = autoI18n.locales.find((e) => e.language === sitemap.sitemapName || e.code === sitemap.sitemapName)?.domain;
    if (domain) {
      const _tester = resolvers.canonicalUrlResolver;
      resolvers.canonicalUrlResolver = (path) => resolveSitePath(path, {
        absolute: true,
        withBase: false,
        siteUrl: withHttps(domain),
        trailingSlash: _tester("/test/").endsWith("/"),
        base: "/"
      });
    }
  }
  let effectiveSitemap = sitemap;
  const baseSitemapName = chunkInfo.baseSitemapName;
  if (chunkInfo.isChunked && baseSitemapName !== sitemap.sitemapName && sitemaps[baseSitemapName]) {
    effectiveSitemap = sitemaps[baseSitemapName];
  }
  const matchName = chunkInfo.isChunked ? baseSitemapName : sitemap.sitemapName;
  const resolved = await getResolvedSitemapUrls(effectiveSitemap, matchName, chunkInfo.isChunked, resolvers, runtimeConfig, nitro);
  const urls = sliceUrlsForChunk(resolved.urls, sitemap.sitemapName, sitemaps, chunkSize);
  return { urls, failedSources: resolved.failedSources };
}

function useNitroUrlResolvers(e) {
  const canonicalQuery = getQuery(e).canonical;
  const isShowingCanonical = typeof canonicalQuery !== "undefined" && canonicalQuery !== "false";
  const siteConfig = getSiteConfig(e);
  return {
    event: e,
    fixSlashes: (path) => fixSlashes(siteConfig.trailingSlash, path),
    // we need these as they depend on the nitro event
    canonicalUrlResolver: createSitePathResolver(e, {
      canonical: isShowingCanonical || true,
      absolute: true,
      withBase: true
    }),
    relativeBaseUrlResolver: createSitePathResolver(e, { absolute: false, withBase: true })
  };
}
async function buildSitemapRenderPlan(event, definition, resolvers, runtimeConfig) {
  const { sitemapName } = definition;
  const nitro = useNitroApp();
  const { urls: resolvedSitemapUrls, failedSources } = await buildSitemapUrls(definition, resolvers, runtimeConfig, nitro);
  const sitemapUrls = resolvedSitemapUrls.slice();
  const routeRuleMatcher = createNitroRouteRuleMatcher(useRuntimeConfig());
  const headerRuleMatcher = createNitroRouteRuleMatcher({
    app: useRuntimeConfig().app,
    nitro: { routeRules: runtimeConfig.routeRuleHeaders || {} }
  });
  const { autoI18n } = runtimeConfig;
  const localeCodes = autoI18n?.locales && autoI18n.strategy !== "no_prefix" ? new Set(autoI18n.locales.map((l) => l.code)) : void 0;
  sitemapUrls.length;
  let validCount = 0;
  for (let i = 0; i < sitemapUrls.length; i++) {
    const u = sitemapUrls[i];
    const path = u._path?.pathname || u.loc;
    if (!getPathRobotConfig(event, { path, skipSiteIndexable: true }).indexable)
      continue;
    let routeRules = routeRuleMatcher(path);
    let headerRules = headerRuleMatcher(path);
    if (localeCodes) {
      const match = splitForLocales(path, localeCodes);
      const pathWithoutPrefix = match[1];
      if (pathWithoutPrefix && pathWithoutPrefix !== path)
        routeRules = defu(routeRules, routeRuleMatcher(pathWithoutPrefix));
      if (pathWithoutPrefix && pathWithoutPrefix !== path)
        headerRules = defu(headerRules, headerRuleMatcher(pathWithoutPrefix));
    }
    if (routeRules.sitemap === false)
      continue;
    if (robotsBlocksIndexing(routeRules.robots))
      continue;
    let hasRobotsDisabled = false;
    const headers = headerRules.headers;
    if (headers) {
      for (const name in headers) {
        if (name.toLowerCase() === "x-robots-tag" && headers[name].toLowerCase().includes("noindex")) {
          hasRobotsDisabled = true;
          break;
        }
      }
    }
    if (routeRules.redirect || hasRobotsDisabled)
      continue;
    sitemapUrls[validCount++] = routeRules.sitemap ? defu(u, routeRules.sitemap) : u;
  }
  sitemapUrls.length = validCount;
  const locSize = sitemapUrls.length;
  const resolvedCtx = {
    urls: sitemapUrls,
    sitemapName,
    event
  };
  await nitro.hooks.callHook("sitemap:resolved", resolvedCtx);
  if (resolvedCtx.urls.length !== locSize) {
    for (let i = 0; i < resolvedCtx.urls.length; i++)
      resolvedCtx.urls[i] = preNormalizeEntry(resolvedCtx.urls[i], resolvers);
  }
  const maybeSort = (urls2) => runtimeConfig.sortEntries ? sortInPlace(urls2) : urls2;
  const defaults = definition.defaults;
  const normalizedPreDedupe = resolvedCtx.urls;
  const firstLastmod = normalizedPreDedupe[0]?.lastmod ?? defaults?.lastmod;
  let cacheLastmod = normalizedPreDedupe.length > 1 && !!firstLastmod;
  for (let i = 1; cacheLastmod && i < Math.min(normalizedPreDedupe.length, 8); i++)
    cacheLastmod = (normalizedPreDedupe[i].lastmod ?? defaults?.lastmod) === firstLastmod;
  const normaliseCache = cacheLastmod ? {} : void 0;
  for (let i = 0; i < normalizedPreDedupe.length; i++)
    normalizedPreDedupe[i] = normaliseEntry(normalizedPreDedupe[i], defaults, resolvers, normaliseCache);
  const duplicateKeys = /* @__PURE__ */ new Set();
  const urls = mergeOnKey(normalizedPreDedupe, "_key", (key) => duplicateKeys.add(key));
  if (duplicateKeys.size) {
    for (let i = 0; i < urls.length; i++) {
      if (duplicateKeys.has(urls[i]._key))
        urls[i] = normaliseEntry(urls[i], defaults, resolvers, normaliseCache);
    }
  }
  maybeSort(urls);
  if (definition._isChunking && definition.sitemapName.includes("-")) {
    const parts = definition.sitemapName.split("-");
    const lastPart = parts.pop();
    if (!Number.isNaN(Number(lastPart))) {
      const chunkIndex = Number(lastPart);
      const baseSitemapName = parts.join("-");
      if (urls.length === 0 && chunkIndex > 0) {
        throw createError({
          status: 404,
          message: `Sitemap chunk ${chunkIndex} for "${baseSitemapName}" does not exist.`
        });
      }
    }
  }
  const errorInfo = failedSources.length > 0 ? {
    messages: failedSources.map((f) => f.error),
    urls: failedSources.map((f) => f.url)
  } : void 0;
  return { errorInfo, sitemapName, urls };
}
async function buildSitemapXml(event, definition, resolvers, runtimeConfig) {
  const { errorInfo, sitemapName, urls } = await buildSitemapRenderPlan(event, definition, resolvers, runtimeConfig);
  const sitemap = urlsToXml(urls, resolvers, runtimeConfig, errorInfo);
  const ctx = { sitemap, sitemapName, event };
  await useNitroApp().hooks.callHook("sitemap:output", ctx);
  return ctx.sitemap;
}
function sitemapKeyParts(_event, definition) {
  return [definition.sitemapName || "default"];
}
const buildSitemapXmlCached = defineSitemapCachedFunction(buildSitemapXml, { name: "sitemap:xml", keyParts: sitemapKeyParts });
function setSitemapResponseHeaders(event, runtimeConfig) {
  event.res.headers.set("Content-Type", "text/xml; charset=UTF-8");
  if (runtimeConfig.cacheMaxAgeSeconds) {
    event.res.headers.set("Cache-Control", `public, max-age=${runtimeConfig.cacheMaxAgeSeconds}, s-maxage=${runtimeConfig.cacheMaxAgeSeconds}, stale-while-revalidate=3600`);
    const now = /* @__PURE__ */ new Date();
    event.res.headers.set("X-Sitemap-Generated", now.toISOString());
    event.res.headers.set("X-Sitemap-Cache-Duration", `${runtimeConfig.cacheMaxAgeSeconds}s`);
    const expiryTime = new Date(now.getTime() + runtimeConfig.cacheMaxAgeSeconds * 1e3);
    event.res.headers.set("X-Sitemap-Cache-Expires", expiryTime.toISOString());
    const remainingSeconds = Math.floor((expiryTime.getTime() - now.getTime()) / 1e3);
    event.res.headers.set("X-Sitemap-Cache-Remaining", `${remainingSeconds}s`);
  } else {
    event.res.headers.set("Cache-Control", `no-cache, no-store`);
  }
  event.context._isSitemap = true;
}
async function createSitemap(event, definition, runtimeConfig) {
  const resolvers = useNitroUrlResolvers(event);
  const shouldCache = typeof runtimeConfig.cacheMaxAgeSeconds === "number" && runtimeConfig.cacheMaxAgeSeconds > 0;
  let xml;
  {
    xml = shouldCache ? await buildSitemapXmlCached(event, definition, resolvers, runtimeConfig) : await buildSitemapXml(event, definition, resolvers, runtimeConfig);
  }
  setSitemapResponseHeaders(event, runtimeConfig);
  return xml;
}

async function sitemapXmlEventHandler(e) {
  const runtimeConfig = await useResolvedSitemapRuntimeConfig(e);
  const { sitemaps } = runtimeConfig;
  if ("index" in sitemaps)
    return sendRedirect(e, withBase("/sitemap_index.xml", useRuntimeConfig().app.baseURL), 301);
  return createSitemap(e, Object.values(sitemaps)[0], runtimeConfig);
}

const _rNJqzO = defineEventHandler(sitemapXmlEventHandler);

const _Tie3pO = defineEventHandler$1(async (event) => {
  return;
});

const _f7y4Wf = defineEventHandler((e) => initRequestSiteConfig(e, getNitroOrigin(e), getRouteRules(e)));

const _tEI4nH = defineEventHandler(() => {
  const config = useRuntimeConfig();
  return {
    ok: true,
    version: config.app.buildId,
    uptime: Math.floor(process.uptime())
  };
});

const RE_FRONTMATTER = /^\uFEFF?---[\t ]*\r?\n(?:[\s\S]*?\r?\n)?---[\t ]*(?:\r?\n|$)/;
function llmsTxtDirective(llmsTxtUrl) {
  return `> Index of every page on this site: [llms.txt](${llmsTxtUrl})`;
}
function insertLlmsTxtDirective(markdown, llmsTxtUrl) {
  const directive = llmsTxtDirective(llmsTxtUrl);
  const frontmatter = markdown.match(RE_FRONTMATTER)?.[0] ?? "";
  const body = markdown.slice(frontmatter.length).replace(/^(?:\r?\n)+/, "");
  if (body === directive || body.startsWith(`${directive}
`) || body.startsWith(`${directive}\r
`))
    return markdown;
  return `${frontmatter}${frontmatter ? "\n" : ""}${directive}

${body}`;
}
const RE_DIRECTIVE_HTML = /<a [^>]*data-llms-txt-directive[^>]*>[^<]*<\/a>/g;
function stripLlmsTxtDirectiveHtml(html) {
  return html.replace(RE_DIRECTIVE_HTML, "");
}

const RE_FENCE = /^ {0,3}(`{3,}|~{3,})/;
const RE_INLINE_ROOT_LINK = /\]\((<?)\/(?!\/)/g;
const RE_REFERENCE_ROOT_LINK = /^( {0,3}\[[^\]]+\]:[\t ]*<?)\/(?!\/)/;
function closesFence(line, fence) {
  const trimmed = line.trim();
  return trimmed.length >= fence.length && trimmed[0] === fence[0] && [...trimmed].every((char) => char === fence[0]);
}
function backtickRun(line, start) {
  let end = start;
  while (line[end] === "`")
    end++;
  return end - start;
}
function rewriteOutsideCodeSpans(line, rewrite) {
  let output = "";
  let last = 0;
  let index = line.indexOf("`");
  while (index !== -1) {
    const length = backtickRun(line, index);
    let close = line.indexOf("`", index + length);
    while (close !== -1 && backtickRun(line, close) !== length)
      close = line.indexOf("`", close + backtickRun(line, close));
    if (close === -1) {
      index = line.indexOf("`", index + length);
      continue;
    }
    output += rewrite(line.slice(last, index)) + line.slice(index, close + length);
    last = close + length;
    index = line.indexOf("`", last);
  }
  return output + rewrite(line.slice(last));
}
function absoluteMarkdownLinks(markdown, siteUrl) {
  const origin = new URL(siteUrl).origin;
  let fence;
  return markdown.split(/(?<=\n)/).map((line) => {
    if (fence) {
      if (closesFence(line, fence))
        fence = void 0;
      return line;
    }
    const opening = line.match(RE_FENCE);
    if (opening) {
      fence = opening[1];
      return line;
    }
    return rewriteOutsideCodeSpans(line, (text) => text.replace(RE_REFERENCE_ROOT_LINK, `$1${origin}/`).replace(RE_INLINE_ROOT_LINK, `]($1${origin}/`));
  }).join("");
}
function absoluteSiteUrl(path, siteUrl) {
  return siteUrl ? new URL(path, new URL(siteUrl).origin).href : path;
}

const RE_ABSOLUTE_URL = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i;
function resolveMarkdownRedirect(location, { pageUrl, origins = [] }) {
  const page = new URL(pageUrl);
  const target = URL.canParse(location, page) ? new URL(location, page) : null;
  if (!target || target.origin !== page.origin && !origins.includes(target.origin))
    return { _tag: "redirect", location };
  const markdownPath = markdownAlternatePath(target.pathname);
  if (!markdownPath)
    return { _tag: "redirect", location };
  if (markdownPath === toMarkdownPath(page.pathname))
    return { _tag: "follow", path: `${target.pathname}${target.search}` };
  const markdownLocation = `${markdownPath}${target.search}${target.hash}`;
  return {
    _tag: "redirect",
    location: RE_ABSOLUTE_URL.test(location) ? `${target.origin}${markdownLocation}` : markdownLocation
  };
}

function escapeMarkdownHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

const SITEMAP_MD_ROUTE = "/sitemap.md";
function topSegment(route) {
  return route.split("/").filter(Boolean)[0] || "";
}
function escapeTitle(title) {
  return escapeMarkdownHtml(title).replaceAll("[", "\\[").replaceAll("]", "\\]");
}
function formatEntry(entry, resolveHref) {
  const title = escapeTitle(entry.title?.trim() || entry.route);
  const href = resolveHref(entry.route);
  if (entry.updatedAt) {
    const parsed = new Date(entry.updatedAt);
    if (!Number.isNaN(parsed.getTime()))
      return `- [${title}](${href} "${parsed.toISOString()}")`;
  }
  return `- [${title}](${href})`;
}
function buildSitemapMd(entries, options = {}) {
  const resolveHref = options.resolveHref || toMarkdownPath;
  const groups = /* @__PURE__ */ new Map();
  for (const entry of [...entries].sort((a, b) => a.route.localeCompare(b.route))) {
    const key = topSegment(entry.route);
    const group = groups.get(key);
    if (group)
      group.push(entry);
    else
      groups.set(key, [entry]);
  }
  const keys = [...groups.keys()].sort((a, b) => {
    if (a === "")
      return -1;
    if (b === "")
      return 1;
    return a.localeCompare(b);
  });
  const parts = [`# ${escapeMarkdownHtml(options.siteName || "Site")} Sitemap`, "", "All pages in Markdown format."];
  for (const key of keys) {
    parts.push("", `## ${key || "Root"}`);
    for (const entry of groups.get(key))
      parts.push(formatEntry(entry, resolveHref));
  }
  return `${parts.join("\n")}
`;
}
function appendSitemapSection(markdown, sitemapHref = SITEMAP_MD_ROUTE) {
  const section = `## Sitemap

See the full [sitemap](${sitemapHref}) for all pages.`;
  const trimmed = markdown.trimEnd();
  if (trimmed.endsWith(section))
    return `${trimmed}
`;
  return `${trimmed}

${section}
`;
}
function isSitemapMdRequest(path, baseURL, enabled) {
  if (!enabled)
    return false;
  const withoutQuery = path.split("?")[0] || path;
  return withoutQuery === SITEMAP_MD_ROUTE || withoutQuery === toDeployedRoute(SITEMAP_MD_ROUTE, baseURL);
}

function notFoundMarkdown(ctx, canonicalUrl, build) {
  const { path, config, resolveUrl, routeContext } = ctx;
  const body = [
    `# Page not found`,
    ``,
    `No content is available at \`${path}\`.`,
    ``,
    `Try one of these resources:`,
    ``,
    `- [Sitemap](${resolveUrl("/sitemap.xml")})`,
    `- [llms.txt](${resolveUrl("/llms.txt")})`,
    ...config.llmsFullTxt === false ? [] : [`- [llms-full.txt](${resolveUrl("/llms-full.txt")})`],
    ``
  ].join("\n");
  const i18n = config.i18n;
  const locale = i18n ? unavailable$1().locale : void 0;
  const alternates = i18n ? unavailable$1().map((a) => ({
    hreflang: a.hreflang,
    href: resolveLocaleAlternateUrl(a, resolveUrl)
  })) : void 0;
  const frontmatter = build({
    title: "Page not found",
    description: `No content is available at ${path}.`,
    canonical_url: canonicalUrl,
    locale,
    alternates
  });
  return `${frontmatter}
${body}`;
}
const _WkWZEk = defineEventHandler$1(async (event) => {
  const runtimeConfig = useRuntimeConfig$1(event);
  if (isSitemapMdRequest(event.path, runtimeConfig.app.baseURL, runtimeConfig["nuxt-ai-ready"]?.sitemapMd !== false))
    return;
  const decision = decideNegotiation(event, "middleware");
  const negotiationResponse = await applyNegotiation(event, decision);
  if (decision._tag !== "render")
    return negotiationResponse;
  await ensureSiteConfig(event);
  const ctx = buildNegotiationContext(event, decision.path);
  const { path, config, resolvePath, resolveUrl, routeContext } = ctx;
  const canonicalUrl = resolveUrl(path);
  const finalizeMarkdown = (markdown) => {
    const withSitemap = config.sitemapMd === false ? markdown : appendSitemapSection(markdown, resolvePath(SITEMAP_MD_ROUTE));
    const llmsTxt = config.llmsTxt;
    const withDirective = llmsTxt?.directive?.markdown === false ? withSitemap : insertLlmsTxtDirective(withSitemap, resolveUrl("/llms.txt"));
    return absoluteMarkdownLinks(withDirective, canonicalUrl);
  };
  const [
    { tryGetContentMarkdown },
    { fetchRawWithEvent },
    { buildFrontmatter, layerFrontmatter }
  ] = await Promise.all([
    import('../_/content.mjs'),
    import('../_/fetch.mjs'),
    Promise.resolve().then(function () { return frontmatter; })
  ]);
  const sourceContext = { route: path, event, source: null };
  await useNitroApp().hooks.callHook("ai-ready:markdown:source", sourceContext);
  if (sourceContext.source) {
    const { markdown, title, description, updatedAt } = sourceContext.source;
    const responseMarkdown = layerFrontmatter({
      title: title ?? path,
      description,
      canonical_url: canonicalUrl,
      last_updated: updatedAt
    }, markdown);
    setMarkdownHeaders(event, ctx);
    return finalizeMarkdown(responseMarkdown);
  }
  const contentPage = await tryGetContentMarkdown(event, path).catch((e) => {
    logger$1.debug(`[markdown] Content lookup failed for ${path}`, e);
    return null;
  });
  if (contentPage) {
    logger$1.debug(`[markdown] Serving content source for ${path} (${contentPage.markdown.length} bytes)`);
    const frontmatter = buildFrontmatter({
      title: contentPage.title,
      description: contentPage.description,
      canonical_url: canonicalUrl,
      last_updated: contentPage.updatedAt
    });
    setMarkdownHeaders(event, ctx);
    return finalizeMarkdown(`${frontmatter}
${contentPage.markdown}`);
  }
  const origin = getRequestURL(event).origin;
  const siteUrl = resolveUrl("/");
  const redirectOptions = {
    pageUrl: `${origin}${resolvePath(path)}`,
    origins: URL.canParse(siteUrl) ? [new URL(siteUrl).origin] : []
  };
  let htmlPath = resolvePath(path);
  let response = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    logger$1.debug(`[markdown] Fetching HTML for ${htmlPath}`);
    response = await fetchRawWithEvent(event, htmlPath, {
      headers: { [INTERNAL_HEADER]: "1" },
      redirect: "manual"
    }).catch((e) => {
      logger$1.error(`Failed to fetch HTML for ${htmlPath}`, e);
      return null;
    });
    const location = response && response.status >= 300 && response.status < 400 ? response.headers.get("location") : null;
    if (!response || !location)
      break;
    const redirect = resolveMarkdownRedirect(location, redirectOptions);
    if (redirect._tag === "follow" && attempt === 0) {
      htmlPath = redirect.path;
      continue;
    }
    setHeader(event, "location", redirect._tag === "redirect" ? redirect.location : location);
    return createError$2({
      statusCode: response.status,
      statusMessage: response.statusText
    });
  }
  if (!response) {
    throw createError$2({
      statusCode: 502,
      statusMessage: "Bad Gateway"
    });
  }
  if (!response.ok && response.status !== 404)
    return response;
  if (response.status === 404) {
    setMarkdownHeaders(event, ctx, response.headers);
    setResponseStatus(event, 404);
    return notFoundMarkdown(ctx, canonicalUrl, buildFrontmatter);
  }
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    setMarkdownHeaders(event, ctx, response.headers);
    setResponseStatus(event, 404);
    return notFoundMarkdown(ctx, canonicalUrl, buildFrontmatter);
  }
  const html = await response.text();
  logger$1.debug(`[markdown] Fetched HTML for ${path} (${html.length} bytes)`);
  const [
    { queryPages },
    { convertHtmlToMarkdown, extractLastUpdated }
  ] = await Promise.all([
    Promise.resolve().then(function () { return queries; }),
    Promise.resolve().then(function () { return utils; })
  ]);
  const dbPage = await queryPages(event, { route: path }).catch((err) => {
    logger$1.debug(`[markdown] DB lookup failed for ${path}:`, err);
    return void 0;
  });
  const lastUpdated = dbPage?.updatedAt || extractLastUpdated(html);
  const additionalFrontmatter = {
    canonical_url: canonicalUrl
  };
  if (lastUpdated)
    additionalFrontmatter.last_updated = lastUpdated;
  if (config.i18n) {
    additionalFrontmatter.locale = unavailable$1(path, config.i18n).locale;
  }
  const result = await convertHtmlToMarkdown(
    html,
    canonicalUrl,
    config.mdreamOptions,
    {
      hooks: { route: path, event, isPrerender: false },
      additionalFrontmatter
    }
  );
  setMarkdownHeaders(event, ctx, response.headers);
  return finalizeMarkdown(result.markdown);
});

const _Jp3GX8 = eventHandler(async (event) => {
  const collection = getRouterParam(event, "collection") || event.path?.split("/")?.[2] || "";
  setHeader(event, "Content-Type", "text/plain");
  const data = await useStorage().getItem(`build:content:database.compressed.mjs`) || "";
  if (data) {
    const lineStart = `export const ${collection} = "`;
    const content = String(data).split("\n").find((line) => line.startsWith(lineStart));
    if (content) {
      return content.substring(lineStart.length, content.length - 1);
    }
  }
  return await import('../build/database.compressed.mjs').then((m) => m[collection]);
});

const _SxA8c9 = defineEventHandler$1(() => {});

async function decompressSQLDump(base64Str, compressionType = "gzip") {
  let binaryData;
  if (typeof Buffer !== "undefined") {
    const buffer = Buffer.from(base64Str, "base64");
    binaryData = Uint8Array.from(buffer);
  } else if (typeof atob !== "undefined") {
    binaryData = Uint8Array.from(atob(base64Str), (c) => c.charCodeAt(0));
  } else {
    throw new TypeError("No base64 decoding method available");
  }
  const response = new Response(new Blob([binaryData]));
  const decompressedStream = response.body?.pipeThrough(new DecompressionStream(compressionType));
  const text = await new Response(decompressedStream).text();
  return JSON.parse(text);
}

function refineContentFields(sql, doc) {
  const fields = findCollectionFields(sql);
  const item = { ...doc };
  for (const key in item) {
    if (fields[key] === "json" && item[key] && item[key] !== "undefined") {
      item[key] = JSON.parse(item[key]);
    }
    if (fields[key] === "boolean" && item[key] !== "undefined") {
      item[key] = Boolean(item[key]);
    }
  }
  for (const key in item) {
    if (item[key] === "NULL") {
      item[key] = void 0;
    }
  }
  return item;
}
function findCollectionFields(sql) {
  const table = sql.match(/FROM\s+(\w+)/);
  if (!table) {
    return {};
  }
  const info = manifest[getCollectionName(table[1])];
  return info?.fields || {};
}
function getCollectionName(table) {
  return table.replace(/^_content_/, "");
}

var BoundableStatement = class {
	_statement;
	constructor(rawStmt) {
		this._statement = rawStmt;
	}
	bind(...params) {
		return new BoundStatement(this, params);
	}
};
var BoundStatement = class BoundStatement {
	#statement;
	#params;
	constructor(statement, params) {
		this.#statement = statement;
		this.#params = params;
	}
	bind(...params) {
		return new BoundStatement(this.#statement, params);
	}
	all() {
		return this.#statement.all(...this.#params);
	}
	run() {
		return this.#statement.run(...this.#params);
	}
	get() {
		return this.#statement.get(...this.#params);
	}
};

async function importLib(connector, name, lib, load) {
	if (lib) return typeof lib === "function" ? await lib() : lib;
	try {
		return await load();
	} catch (cause) {
		throw new Error(`[db0] [${connector}] Cannot import \`${name}\`. Make sure it is installed or provide it via the \`lib\` option.`, { cause });
	}
}
function interopDefault(mod) {
	return mod?.default ?? mod;
}
function lazyInstance(factory) {
	const get = (() => get.current ??= factory().catch((error) => {
		get.current = void 0;
		throw error;
	}));
	get.current = void 0;
	get.reset = () => {
		get.current = void 0;
	};
	return get;
}

const CONNECTOR_DEPENDENCIES = { lib: {
	name: "better-sqlite3",
	version: "^11 || ^12 || ^13"
} };
const CONNECTOR_NAME = "better-sqlite3";
function sqliteConnector(opts) {
	const getDB = lazyInstance(async () => {
		const Database = interopDefault(await importLib(CONNECTOR_NAME, "better-sqlite3", opts.lib, () => import('better-sqlite3')));
		if (opts.name === ":memory:") return new Database(":memory:");
		const filePath = resolve$2(opts.cwd || ".", opts.path || `.data/${opts.name || "db"}.sqlite3`);
		mkdirSync(dirname$1(filePath), { recursive: true });
		return new Database(filePath);
	});
	return {
		name: "sqlite",
		dialect: "sqlite",
		getInstance: () => getDB(),
		exec: async (sql) => (await getDB()).exec(sql),
		prepare: (sql) => new StatementWrapper(async () => (await getDB()).prepare(sql)),
		dispose: async () => {
			const db = await getDB.current;
			getDB.reset();
			db?.close?.();
		}
	};
}
var StatementWrapper = class extends BoundableStatement {
	async all(...params) {
		return (await this._statement()).all(...params);
	}
	async run(...params) {
		const res = (await this._statement()).run(...params);
		return {
			success: res.changes > 0,
			...res
		};
	}
	async get(...params) {
		return (await this._statement()).get(...params);
	}
};

const betterSqlite3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  CONNECTOR_DEPENDENCIES: CONNECTOR_DEPENDENCIES,
  default: sqliteConnector
}, Symbol.toStringTag, { value: 'Module' }));

let db;
let _adapterPromise;
let _databasePromise;
function getAdapter() {
  if (!_adapterPromise) {
    _adapterPromise = Promise.resolve().then(function () { return betterSqlite3; }).then((m) => m.default || m);
  }
  return _adapterPromise;
}
async function getDatabase(config) {
  if (db) {
    return db;
  }
  if (!_databasePromise) {
    _databasePromise = (async () => {
      const { database, localDatabase } = config;
      if (["nitro-prerender", "nitro-dev"].includes("node-server")) {
        return sqliteConnector(refineDatabaseConfig(localDatabase));
      }
      const adapter = await getAdapter();
      return adapter(refineDatabaseConfig(database));
    })().catch((error) => {
      _databasePromise = void 0;
      throw error;
    });
  }
  db = await _databasePromise;
  return db;
}
async function loadDatabaseAdapter(config) {
  await getDatabase(config);
  return {
    all: async (sql, params = []) => {
      return db.prepare(sql).all(...params).then((result) => (result || []).map((item) => refineContentFields(sql, item)));
    },
    first: async (sql, params = []) => {
      return db.prepare(sql).get(...params).then((item) => item ? refineContentFields(sql, item) : item);
    },
    exec: async (sql, params = []) => {
      return db.prepare(sql).run(...params);
    }
  };
}
const checkDatabaseIntegrity = /* @__PURE__ */ new Map();
const integrityCheckPromise = /* @__PURE__ */ new Map();
async function checkAndImportDatabaseIntegrity(event, collection, config) {
  if (checkDatabaseIntegrity.get(collection) !== false) {
    checkDatabaseIntegrity.set(collection, false);
    if (!integrityCheckPromise.has(collection)) {
      const _integrityCheck = _checkAndImportDatabaseIntegrity(event, collection, checksums[collection], checksumsStructure[collection], config).then((isValid) => {
        checkDatabaseIntegrity.set(collection, !isValid);
      }).catch((error) => {
        console.error("Database integrity check failed", error);
        checkDatabaseIntegrity.set(collection, true);
        integrityCheckPromise.delete(collection);
      });
      integrityCheckPromise.set(collection, _integrityCheck);
    }
  }
  if (integrityCheckPromise.has(collection)) {
    await integrityCheckPromise.get(collection);
  }
}
async function _checkAndImportDatabaseIntegrity(event, collection, integrityVersion, structureIntegrityVersion, config) {
  const db2 = await loadDatabaseAdapter(config);
  const before = await db2.first(`SELECT * FROM ${tables.info} WHERE id = ?`, [`checksum_${collection}`]).catch(() => null);
  if (before?.version && !String(before.version)?.startsWith(`${config.databaseVersion}--`)) {
    await db2.exec(`DROP TABLE IF EXISTS ${tables.info}`);
    before.version = "";
  }
  const unchangedStructure = before?.structureVersion === structureIntegrityVersion;
  if (before?.version) {
    if (before.version === integrityVersion) {
      if (before.ready) {
        return true;
      }
      await waitUntilDatabaseIsReady(db2, collection);
      return true;
    }
    await db2.exec(`DELETE FROM ${tables.info} WHERE id = ?`, [`checksum_${collection}`]);
    if (!unchangedStructure) {
      await db2.exec(`DROP TABLE IF EXISTS ${tables[collection]}`);
    }
  }
  const dump = await loadDatabaseDump(event, collection).then(decompressSQLDump);
  const dumpLinesHash = dump.map((row) => row.split(" -- ").pop());
  let hashesInDb = /* @__PURE__ */ new Set();
  if (unchangedStructure) {
    const hashListFromTheDump = new Set(dumpLinesHash);
    const hashesInDbRecords = await db2.all(`SELECT __hash__ FROM ${tables[collection]}`).catch(() => []);
    hashesInDb = new Set(hashesInDbRecords.map((r) => r.__hash__));
    const hashesToDelete = hashesInDb.difference(hashListFromTheDump);
    if (hashesToDelete.size) {
      await db2.exec(`DELETE FROM ${tables[collection]} WHERE __hash__ IN (${Array(hashesToDelete.size).fill("?").join(",")})`, Array.from(hashesToDelete));
    }
  }
  await dump.reduce(async (prev, sql, index) => {
    await prev;
    const hash = dumpLinesHash[index];
    const statement = sql.substring(0, sql.length - hash.length - 4);
    if (unchangedStructure) {
      if (hash === "structure") {
        return Promise.resolve();
      }
      if (hashesInDb.has(hash)) {
        return Promise.resolve();
      }
    }
    await db2.exec(statement).catch((err) => {
      const message = err.message || "Unknown error";
      console.error(`Failed to execute SQL ${sql}: ${message}`);
    });
  }, Promise.resolve());
  const after = await db2.first(`SELECT version FROM ${tables.info} WHERE id = ?`, [`checksum_${collection}`]).catch(() => ({ version: "" }));
  return after?.version === integrityVersion;
}
const REQUEST_TIMEOUT = 90;
async function waitUntilDatabaseIsReady(db2, collection) {
  let iterationCount = 0;
  let interval;
  await new Promise((resolve, reject) => {
    interval = setInterval(async () => {
      const row = await db2.first(`SELECT ready FROM ${tables.info} WHERE id = ?`, [`checksum_${collection}`]).catch(() => ({ ready: true }));
      if (row?.ready) {
        clearInterval(interval);
        resolve(0);
      }
      if (iterationCount++ > REQUEST_TIMEOUT) {
        clearInterval(interval);
        reject(new Error("Waiting for another database initialization timed out"));
      }
    }, 1e3);
  }).catch((e) => {
    throw e;
  }).finally(() => {
    if (interval) {
      clearInterval(interval);
    }
  });
}
async function loadDatabaseDump(event, collection) {
  return await fetchDatabase(event, collection).catch((e) => {
    console.error("Failed to fetch compressed dump", e);
    return "";
  });
}
function refineDatabaseConfig(config) {
  if (config.type === "d1") {
    return { ...config, bindingName: config.bindingName || config.binding };
  }
  if (config.type === "sqlite") {
    const _config = { ...config };
    if (config.filename === ":memory:") {
      return { name: ":memory:" };
    }
    if ("filename" in config) {
      const filename = isAbsolute(config?.filename || "") || config?.filename === ":memory:" ? config?.filename : new URL(config.filename, globalThis._importMeta_.url).pathname;
      _config.path = process.platform === "win32" && filename.startsWith("/") ? filename.slice(1) : filename;
    }
    return _config;
  }
  if (config.type === "pglite") {
    return {
      dataDir: config.dataDir,
      // Pass through any other PGlite-specific options
      ...config
    };
  }
  return config;
}

const SQL_COUNT_REGEX = /^COUNT\((DISTINCT )?([a-z_]\w+|\*)\) as count$/i;
const MAX_SQL_QUERY_LENGTH = 1e5;
function isWordChar(code) {
  return code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95;
}
function parseSelectQuery(sql) {
  if (!sql.startsWith("SELECT ")) {
    return null;
  }
  let rest = sql;
  let offset;
  let limit;
  let order;
  {
    const m = / OFFSET \d+$/.exec(rest);
    if (m) {
      offset = m[0];
      rest = rest.slice(0, -offset.length);
    }
  }
  {
    const m = / LIMIT \d+$/.exec(rest);
    if (m) {
      limit = m[0];
      rest = rest.slice(0, -limit.length);
    }
  }
  if (rest.endsWith(" ASC")) {
    order = "ASC";
    rest = rest.slice(0, -4);
  } else if (rest.endsWith(" DESC")) {
    order = "DESC";
    rest = rest.slice(0, -5);
  } else {
    return null;
  }
  const orderByMarker = " ORDER BY ";
  const orderByIdx = rest.lastIndexOf(orderByMarker);
  if (orderByIdx === -1) {
    return null;
  }
  const orderBy = rest.slice(orderByIdx + orderByMarker.length);
  if (!orderBy.length) {
    return null;
  }
  rest = rest.slice(0, orderByIdx);
  const afterSelect = rest.slice("SELECT ".length);
  const fromMarker = " FROM ";
  const fromIdx = afterSelect.indexOf(fromMarker);
  if (fromIdx === -1) {
    return null;
  }
  const select = afterSelect.slice(0, fromIdx);
  const afterFrom = afterSelect.slice(fromIdx + fromMarker.length);
  let tableEnd = 0;
  while (tableEnd < afterFrom.length && isWordChar(afterFrom.charCodeAt(tableEnd))) {
    tableEnd += 1;
  }
  if (tableEnd === 0) {
    return null;
  }
  const from = afterFrom.slice(0, tableEnd);
  const afterTable = afterFrom.slice(tableEnd);
  let where;
  if (afterTable.length) {
    if (!afterTable.startsWith(" WHERE ")) {
      return null;
    }
    where = afterTable;
  }
  return { select, from, where, orderBy, order, limit, offset };
}
function assertSafeQuery(sql, collection) {
  if (!sql) {
    throw new Error("Invalid query: Query cannot be empty");
  }
  if (sql.length > MAX_SQL_QUERY_LENGTH) {
    throw new Error("Invalid query: Query exceeds maximum allowed length");
  }
  const cleanedupQuery = cleanupQuery(sql);
  if (cleanedupQuery !== sql) {
    throw new Error("Invalid query: SQL comments are not allowed");
  }
  const parsed = parseSelectQuery(sql);
  if (!parsed) {
    throw new Error("Invalid query: Query must be a valid SELECT statement with proper syntax");
  }
  const { select, from, where, orderBy, order, limit, offset } = parsed;
  const columns = select?.trim().split(", ") || [];
  if (columns.length === 1) {
    if (columns[0] !== "*" && !columns[0]?.match(SQL_COUNT_REGEX) && !columns[0]?.match(/^"[a-z_]\w+"$/i)) {
      throw new Error(`Invalid query: Column '${columns[0]}' has invalid format. Expected *, COUNT(), or a quoted column name`);
    }
  } else if (!columns.every((column) => column.match(/^"[a-z_]\w+"$/i))) {
    throw new Error("Invalid query: Multiple columns must be properly quoted and alphanumeric");
  }
  if (from !== `_content_${collection}`) {
    const collection2 = String(from || "").replace(/^_content_/, "");
    throw new Error(`Invalid query: Collection '${collection2}' does not exist`);
  }
  if (where && !isBuilderWhere(where)) {
    throw new Error("Invalid query: WHERE clause must match the query builder syntax");
  }
  const _order = (orderBy + " " + order).split(", ");
  if (!_order.every((column) => column.match(/^("[a-zA-Z_]+"|[a-zA-Z_]+) (ASC|DESC)$/))) {
    throw new Error("Invalid query: ORDER BY clause must contain valid column names followed by ASC or DESC");
  }
  if (limit !== void 0 && !limit.match(/^ LIMIT \d+$/)) {
    throw new Error("Invalid query: LIMIT clause must be a positive number");
  }
  if (offset !== void 0 && !offset.match(/^ OFFSET \d+$/)) {
    throw new Error("Invalid query: OFFSET clause must be a positive number");
  }
  return true;
}
function isBuilderWhere(where) {
  if (!where.startsWith(" WHERE ")) {
    return false;
  }
  const end = parseWhereBody(where, " WHERE ".length);
  return end === where.length;
}
function parseWhereBody(sql, i) {
  let next = parseGroup(sql, i);
  if (next < 0) {
    return -1;
  }
  while (sql.startsWith(" AND ", next)) {
    next = parseGroup(sql, next + " AND ".length);
    if (next < 0) {
      return -1;
    }
  }
  return next;
}
function parseGroup(sql, i) {
  if (sql[i] !== "(") {
    return -1;
  }
  const end = parseExpr(sql, i + 1);
  if (end < 0 || sql[end] !== ")") {
    return -1;
  }
  return end + 1;
}
function parseExpr(sql, i) {
  let next = parseItem(sql, i);
  if (next < 0) {
    return -1;
  }
  let joiner = "";
  while (sql.startsWith(" AND ", next) || sql.startsWith(" OR ", next)) {
    const found = sql.startsWith(" AND ", next) ? " AND " : " OR ";
    if (joiner && joiner !== found) {
      return -1;
    }
    joiner = found;
    next = parseItem(sql, next + found.length);
    if (next < 0) {
      return -1;
    }
  }
  return next;
}
function parseItem(sql, i) {
  if (sql[i] === "(") {
    return parseGroup(sql, i);
  }
  return parseLeaf(sql, i);
}
const WHERE_OPS = [
  { op: "IS NOT NULL", kind: "none" },
  { op: "IS NULL", kind: "none" },
  { op: "NOT BETWEEN", kind: "between" },
  { op: "BETWEEN", kind: "between" },
  { op: "NOT LIKE", kind: "value" },
  { op: "NOT IN", kind: "list" },
  { op: "LIKE", kind: "value" },
  { op: "IN", kind: "list" },
  { op: "<>", kind: "value" },
  { op: ">=", kind: "value" },
  { op: "<=", kind: "value" },
  { op: ">", kind: "value" },
  { op: "<", kind: "value" },
  { op: "=", kind: "value" }
];
function parseLeaf(sql, i) {
  const identEnd = parseQuotedIdent(sql, i);
  if (identEnd < 0 || sql[identEnd] !== " ") {
    return -1;
  }
  const matched = WHERE_OPS.find((candidate) => sql.startsWith(candidate.op, identEnd + 1));
  if (!matched) {
    return -1;
  }
  let j = identEnd + 1 + matched.op.length;
  if (matched.kind === "none") {
    return j;
  }
  if (sql[j] !== " ") {
    return -1;
  }
  j += 1;
  if (matched.kind === "list") {
    return parseValueList(sql, j);
  }
  if (matched.kind === "between") {
    const left = parseBuilderString(sql, j);
    if (left < 0 || !sql.startsWith(" AND ", left)) {
      return -1;
    }
    return parseBuilderString(sql, left + " AND ".length);
  }
  return parseBuilderString(sql, j);
}
function parseQuotedIdent(sql, i) {
  if (sql[i] !== '"') {
    return -1;
  }
  let j = i + 1;
  if (j >= sql.length || sql[j] === '"') {
    return -1;
  }
  while (j < sql.length && sql[j] !== '"') {
    j += 1;
  }
  return sql[j] === '"' ? j + 1 : -1;
}
function parseBuilderString(sql, i) {
  if (sql[i] !== "'") {
    return -1;
  }
  let j = i + 1;
  while (j < sql.length) {
    if (sql[j] === "'") {
      if (sql[j + 1] === "'") {
        j += 2;
        continue;
      }
      return j + 1;
    }
    j += 1;
  }
  return -1;
}
function parseValueList(sql, i) {
  if (sql[i] !== "(") {
    return -1;
  }
  let j = i + 1;
  if (sql[j] === ")") {
    return j + 1;
  }
  while (j < sql.length) {
    const end = parseBuilderString(sql, j);
    if (end < 0) {
      return -1;
    }
    if (sql.startsWith(", ", end)) {
      j = end + 2;
      continue;
    }
    return sql[end] === ")" ? end + 1 : -1;
  }
  return -1;
}
function cleanupQuery(query, options = {}) {
  let fence = null;
  let result = "";
  const stripAll = Boolean(options.removeString);
  const stripSingle = Boolean(options.removeSingleQuoted) && !stripAll;
  const strippingFence = (active) => {
    if (stripAll) {
      return true;
    }
    return stripSingle && active === "'";
  };
  for (let i = 0; i < query.length; i++) {
    const char = query[i];
    const nextChar = query[i + 1];
    if (fence) {
      if (fence === "[") {
        if (char === "]") {
          if (!strippingFence(fence)) {
            result += char;
          }
          fence = null;
        } else if (!strippingFence(fence)) {
          result += char;
        }
        continue;
      }
      if (char === fence) {
        if (nextChar === fence) {
          if (!strippingFence(fence)) {
            result += char + nextChar;
          }
          i += 1;
          continue;
        }
        if (!strippingFence(fence)) {
          result += char;
        }
        fence = null;
        continue;
      }
      if (!strippingFence(fence)) {
        result += char;
      }
      continue;
    }
    if (char === "'" || char === '"' || !options.standardQuotesOnly && (char === "`" || char === "[")) {
      fence = char;
      if (!strippingFence(fence)) {
        result += char;
      }
      continue;
    }
    if (char === "-" && nextChar === "-") {
      return result;
    }
    if (char === "/" && nextChar === "*") {
      i += 2;
      while (i < query.length && !(query[i] === "*" && query[i + 1] === "/")) {
        i += 1;
      }
      i += 2;
      continue;
    }
    result += char;
  }
  return result;
}

function defineNitroPlugin(def) {
  return def;
}

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig$1();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const componentNames = [{"hash":"","pascalName":"BlogPostTakumi","kebabName":"blog-post-takumi","path":"/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community","category":"community","renderer":"takumi","propNames":[]},{"hash":"","pascalName":"BrutalistSatori","kebabName":"brutalist-satori","path":"/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community","category":"community","renderer":"satori","propNames":[]},{"hash":"","pascalName":"DocsTakumi","kebabName":"docs-takumi","path":"/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community","category":"community","renderer":"takumi","propNames":[]},{"hash":"","pascalName":"FrameSatori","kebabName":"frame-satori","path":"/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community","category":"community","renderer":"satori","propNames":[]},{"hash":"","pascalName":"NuxtSatori","kebabName":"nuxt-satori","path":"/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community","category":"community","renderer":"satori","propNames":[]},{"hash":"","pascalName":"NuxtSeoSatori","kebabName":"nuxt-seo-satori","path":"/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community","category":"community","renderer":"satori","propNames":[]},{"hash":"","pascalName":"NuxtSeoTakumi","kebabName":"nuxt-seo-takumi","path":"/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community","category":"community","renderer":"takumi","propNames":[]},{"hash":"","pascalName":"PergelSatori","kebabName":"pergel-satori","path":"/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community","category":"community","renderer":"satori","propNames":[]},{"hash":"","pascalName":"ProductCardTakumi","kebabName":"product-card-takumi","path":"/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community","category":"community","renderer":"takumi","propNames":[]},{"hash":"","pascalName":"SaaSSatori","kebabName":"saa-ssatori","path":"/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community","category":"community","renderer":"satori","propNames":[]},{"hash":"","pascalName":"SimpleBlogSatori","kebabName":"simple-blog-satori","path":"/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community","category":"community","renderer":"satori","propNames":[]},{"hash":"","pascalName":"UnJsSatori","kebabName":"un-js-satori","path":"/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community","category":"community","renderer":"satori","propNames":[]},{"hash":"","pascalName":"WithEmojiSatori","kebabName":"with-emoji-satori","path":"/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community","category":"community","renderer":"satori","propNames":[]}];

const RE_SOCIAL_META_TAG = /<meta[^>]+(property|name)="(twitter|og):([^"]+)"[^>]*>/g;
const RE_SOCIAL_META_KEY = /(property|name)="(twitter|og):([^"]+)"/;
const RE_META_CONTENT$1 = /content="([^"]+)"/;
const RE_OG_KEY_PARAM = /[,/]k_([^,./]+)/;
function extractSocialPreviewTags(html) {
  const data = [];
  const rootData = {};
  const socialMetaTags = html.match(RE_SOCIAL_META_TAG) || [];
  let currentArrayIdx = -1;
  socialMetaTags.forEach((tag) => {
    const [, , type, key] = tag.match(RE_SOCIAL_META_KEY);
    const value = tag.match(RE_META_CONTENT$1)?.[1];
    if (!value) {
      return;
    }
    if (key === "title" || key === "description") {
      rootData[`${type}:${key}`] = value;
      return;
    }
    if (type === "og" && key === "image") {
      currentArrayIdx++;
    }
    if (!data[currentArrayIdx])
      data[currentArrayIdx] = {};
    if (!data[currentArrayIdx][type])
      data[currentArrayIdx][type] = {};
    data[currentArrayIdx][type][key] = value;
  });
  data.forEach((preview) => {
    if (preview.og?.image && preview.og?.image.includes("/_og/")) {
      const url = withoutQuery(preview.og.image);
      const keyMatch = url.match(RE_OG_KEY_PARAM);
      preview.key = keyMatch?.[1] || "og";
    }
  });
  return [rootData, data];
}
function withoutQuery(path) {
  return path.split("?")[0];
}

const RE_BASE64_URL_DASH = /-/g;
const RE_BASE64_URL_TILDE = /~/g;
const RE_DOUBLE_UNDERSCORE = /__/g;
const RE_PLUS = /\+/g;
const RE_ENCODED_COMMA = /%2c/gi;
const RE_ENCODED_PLUS = /%2b/gi;
const RE_SINGLE_UNDERSCORE = /(?<!_)_(?!_)/;
const RE_OG_ROUTE_PREFIX = /\/_og\/[ds]\//;
const RE_COMMA_PARAM_SEPARATOR = /,(?=\w+_)/;
const PARAM_ALIASES = {
  w: "width",
  h: "height",
  c: "component",
  em: "emojis",
  k: "key",
  a: "alt",
  u: "url",
  cache: "cacheMaxAgeSeconds",
  p: "_path",
  // page path - needs alias since _path starts with underscore
  q: "_query",
  // query params - needs alias since _query starts with underscore
  ch: "_componentHash"
  // component template hash for cache busting prerendered URLs
};
Object.fromEntries(
  Object.entries(PARAM_ALIASES).map(([alias, param]) => [param, alias])
);
const KNOWN_PARAMS = /* @__PURE__ */ new Set([
  "width",
  "height",
  "component",
  "renderer",
  "emojis",
  "key",
  "alt",
  "url",
  "cacheMaxAgeSeconds",
  "cacheKey",
  "extension",
  "satori",
  "resvg",
  "sharp",
  "screenshot",
  "takumi",
  "fonts",
  "_query",
  "_hash",
  "_componentHash",
  "socialPreview",
  "props",
  "_path"
]);
const COMPLEX_PARAMS = /* @__PURE__ */ new Set(["satori", "resvg", "sharp", "screenshot", "takumi", "fonts", "_query", "_path"]);
function b64Decode(str) {
  const standard = str.replace(RE_BASE64_URL_DASH, "+").replace(RE_BASE64_URL_TILDE, "/");
  const padded = standard + "=".repeat((4 - standard.length % 4) % 4);
  if (typeof atob === "function") {
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }
  return Buffer.from(padded, "base64").toString("utf8");
}
function canonicalJson(value) {
  if (value === null || typeof value !== "object")
    return JSON.stringify(value) ?? "null";
  if (Array.isArray(value))
    return `[${value.map((item) => canonicalJson(item)).join(",")}]`;
  const record = value;
  const entries = Object.keys(record).sort().filter((key) => record[key] !== void 0).map((key) => `${JSON.stringify(key)}:${canonicalJson(record[key])}`);
  return `{${entries.join(",")}}`;
}
const B64URL_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
function base64UrlToHex(input) {
  let hex = "";
  let buffer = 0;
  let bits = 0;
  for (const char of input) {
    buffer = buffer << 6 | B64URL_ALPHABET.indexOf(char);
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      hex += (buffer >> bits & 255).toString(16).padStart(2, "0");
    }
  }
  return hex;
}
function digestCanonical(value) {
  return base64UrlToHex(digest(canonicalJson(value)));
}
const RE_NUMERIC = /^-?(?:0|[1-9]\d*)(?:\.\d+)?$/;
function tryParseNumber(value) {
  if (RE_NUMERIC.test(value)) {
    const num = Number(value);
    if (!Number.isNaN(num))
      return num;
  }
  return value;
}
function decodeSimpleValue(raw) {
  if (raw.startsWith("~~")) {
    return decodeURIComponent(raw.slice(1).replace(RE_PLUS, "%20")).replace(RE_DOUBLE_UNDERSCORE, "_");
  }
  if (raw.startsWith("~")) {
    try {
      return b64Decode(raw.slice(1));
    } catch {
      return decodeURIComponent(raw.replace(RE_PLUS, "%20")).replace(RE_DOUBLE_UNDERSCORE, "_");
    }
  }
  return decodeURIComponent(raw.replace(RE_PLUS, "%20")).replace(RE_DOUBLE_UNDERSCORE, "_");
}
function decodeOgImageParams(encoded) {
  if (!encoded || encoded === "default")
    return {};
  const options = {};
  const parts = encoded.split(RE_COMMA_PARAM_SEPARATOR);
  for (const part of parts) {
    const idx = part.search(RE_SINGLE_UNDERSCORE);
    if (idx === -1)
      continue;
    const alias = part.slice(0, idx);
    let value = part.slice(idx + 1);
    const paramName = PARAM_ALIASES[alias] || alias;
    if (COMPLEX_PARAMS.has(paramName)) {
      try {
        const json = b64Decode(value);
        options[paramName] = JSON.parse(json);
      } catch {
        options[paramName] = value;
      }
    } else if (paramName === "props") {
      try {
        const json = b64Decode(value);
        options.props = { ...options.props, ...JSON.parse(json) };
      } catch {
      }
    } else if (KNOWN_PARAMS.has(paramName)) {
      value = decodeSimpleValue(value);
      if (value === "true") {
        options[paramName] = true;
      } else if (value === "false") {
        options[paramName] = false;
      } else if (value !== "") {
        options[paramName] = tryParseNumber(value);
      }
    } else {
      value = decodeSimpleValue(value);
      options.props = options.props || {};
      if (value === "true") {
        options.props[paramName] = true;
      } else if (value === "false") {
        options.props[paramName] = false;
      } else if (value !== "") {
        options.props[paramName] = tryParseNumber(value);
      }
    }
  }
  return options;
}
function normalizeUrlSegment(segment) {
  return segment.replace(RE_ENCODED_COMMA, ",").replace(RE_ENCODED_PLUS, "+");
}
function signEncodedParams(encoded, secret) {
  return digest(`${secret}:${encoded}`).slice(0, 16);
}
function verifyOgImageSignature(encoded, signature, secret) {
  const expected = signEncodedParams(encoded, secret);
  if (expected.length !== signature.length)
    return false;
  let result = 0;
  for (let i = 0; i < expected.length; i++)
    result |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  return result === 0;
}
function extractEncodedSegment(path, extension) {
  const match = path.match(RE_OG_ROUTE_PREFIX);
  if (match?.index != null) {
    return normalizeUrlSegment(path.slice(match.index + match[0].length).replace(new RegExp(`\\.${extension}$`), ""));
  }
  return normalizeUrlSegment(path.split("/").pop().replace(new RegExp(`\\.${extension}$`), ""));
}

const RE_KEBAB_CASE = /-([a-z])/g;
function isInternalRoute(path) {
  return path.startsWith("/_") || path.startsWith("@");
}
function filterIsOgImageOption(key) {
  const keys = [
    "url",
    "extension",
    "width",
    "height",
    "alt",
    "props",
    "renderer",
    "component",
    "emojis",
    "_query",
    "_hash",
    "fonts",
    "satori",
    "resvg",
    "sharp",
    "screenshot",
    "takumi",
    "cacheMaxAgeSeconds",
    "cacheKey",
    "key"
  ];
  return keys.includes(key);
}
function separateProps(options, ignoreKeys = []) {
  options = options || {};
  const _props = defu(options.props, Object.fromEntries(
    Object.entries({ ...options }).filter(([k]) => !filterIsOgImageOption(k) && !ignoreKeys.includes(k))
  ));
  const props = {};
  Object.entries(_props).forEach(([key, val]) => {
    props[key.replace(RE_KEBAB_CASE, (g) => String(g[1]).toUpperCase())] = val;
  });
  const result = Object.fromEntries(
    Object.entries({ ...options }).filter(([k]) => filterIsOgImageOption(k) || ignoreKeys.includes(k))
  );
  if (Object.keys(props).length > 0)
    result.props = props;
  return result;
}
const DANGEROUS_ATTRS = /* @__PURE__ */ new Set(["autofocus", "contenteditable", "tabindex", "accesskey"]);
function sanitizeProps(props) {
  const clean = {};
  for (const key of Object.keys(props)) {
    if (key.startsWith("on") || DANGEROUS_ATTRS.has(key.toLowerCase()))
      continue;
    clean[key] = props[key];
  }
  return clean;
}

function useOgImageRuntimeConfig(e) {
  const c = useRuntimeConfig();
  const moduleCfg = c["nuxt-og-image"];
  const secret = e?.context._ogImageSigningSecret;
  const security = secret ? { ...moduleCfg.security, secret } : moduleCfg.security;
  return {
    ...moduleCfg,
    security,
    app: {
      baseURL: c.app.baseURL
    }
  };
}

async function unavailable() {
  throw new Error('[nuxt-ai-ready] The database is disabled. Set `aiReady.database` to store pages at runtime.')
}

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  completeCronRun: unavailable,
  countPages: unavailable,
  deleteInfoValue: unavailable,
  getAllPages: unavailable,
  getContentHashes: unavailable,
  getInfoValue: unavailable,
  getNextSitemapToCrawl: unavailable,
  getPageByRoute: unavailable,
  getPageLastmods: unavailable,
  getPendingPages: unavailable,
  getRecentCronRuns: unavailable,
  getSitemapStatus: unavailable,
  initSchema: unavailable,
  markPageIndexed: unavailable,
  markRoutesPending: unavailable,
  markSitemapCrawlPartial: unavailable,
  markSitemapCrawled: unavailable,
  markSitemapError: unavailable,
  markSitemapSeeded: unavailable,
  resetSitemapErrors: unavailable,
  searchPages: unavailable,
  seedRoutes: unavailable,
  setInfoValue: unavailable,
  startCronRun: unavailable,
  syncSitemaps: unavailable,
  upsertPage: unavailable,
  useDrizzle: unavailable,
  useRawDb: unavailable
}, Symbol.toStringTag, { value: 'Module' }));

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

var composer$1 = {};

const require$$0$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(process$1);

var directives$2 = {};

var identity$x = {};

const ALIAS = Symbol.for('yaml.alias');
const DOC = Symbol.for('yaml.document');
const MAP = Symbol.for('yaml.map');
const PAIR = Symbol.for('yaml.pair');
const SCALAR$1 = Symbol.for('yaml.scalar');
const SEQ = Symbol.for('yaml.seq');
const NODE_TYPE = Symbol.for('yaml.node.type');
const isAlias = (node) => !!node && typeof node === 'object' && node[NODE_TYPE] === ALIAS;
const isDocument = (node) => !!node && typeof node === 'object' && node[NODE_TYPE] === DOC;
const isMap$1 = (node) => !!node && typeof node === 'object' && node[NODE_TYPE] === MAP;
const isPair = (node) => !!node && typeof node === 'object' && node[NODE_TYPE] === PAIR;
const isScalar$2 = (node) => !!node && typeof node === 'object' && node[NODE_TYPE] === SCALAR$1;
const isSeq = (node) => !!node && typeof node === 'object' && node[NODE_TYPE] === SEQ;
function isCollection$1(node) {
    if (node && typeof node === 'object')
        switch (node[NODE_TYPE]) {
            case MAP:
            case SEQ:
                return true;
        }
    return false;
}
function isNode(node) {
    if (node && typeof node === 'object')
        switch (node[NODE_TYPE]) {
            case ALIAS:
            case MAP:
            case SCALAR$1:
            case SEQ:
                return true;
        }
    return false;
}
const hasAnchor = (node) => (isScalar$2(node) || isCollection$1(node)) && !!node.anchor;

identity$x.ALIAS = ALIAS;
identity$x.DOC = DOC;
identity$x.MAP = MAP;
identity$x.NODE_TYPE = NODE_TYPE;
identity$x.PAIR = PAIR;
identity$x.SCALAR = SCALAR$1;
identity$x.SEQ = SEQ;
identity$x.hasAnchor = hasAnchor;
identity$x.isAlias = isAlias;
identity$x.isCollection = isCollection$1;
identity$x.isDocument = isDocument;
identity$x.isMap = isMap$1;
identity$x.isNode = isNode;
identity$x.isPair = isPair;
identity$x.isScalar = isScalar$2;
identity$x.isSeq = isSeq;

var visit$6 = {};

var identity$w = identity$x;

const BREAK$1 = Symbol('break visit');
const SKIP$1 = Symbol('skip children');
const REMOVE$1 = Symbol('remove node');
/**
 * Apply a visitor to an AST node or document.
 *
 * Walks through the tree (depth-first) starting from `node`, calling a
 * `visitor` function with three arguments:
 *   - `key`: For sequence values and map `Pair`, the node's index in the
 *     collection. Within a `Pair`, `'key'` or `'value'`, correspondingly.
 *     `null` for the root node.
 *   - `node`: The current node.
 *   - `path`: The ancestry of the current node.
 *
 * The return value of the visitor may be used to control the traversal:
 *   - `undefined` (default): Do nothing and continue
 *   - `visit.SKIP`: Do not visit the children of this node, continue with next
 *     sibling
 *   - `visit.BREAK`: Terminate traversal completely
 *   - `visit.REMOVE`: Remove the current node, then continue with the next one
 *   - `Node`: Replace the current node, then continue by visiting it
 *   - `number`: While iterating the items of a sequence or map, set the index
 *     of the next step. This is useful especially if the index of the current
 *     node has changed.
 *
 * If `visitor` is a single function, it will be called with all values
 * encountered in the tree, including e.g. `null` values. Alternatively,
 * separate visitor functions may be defined for each `Map`, `Pair`, `Seq`,
 * `Alias` and `Scalar` node. To define the same visitor function for more than
 * one node type, use the `Collection` (map and seq), `Value` (map, seq & scalar)
 * and `Node` (alias, map, seq & scalar) targets. Of all these, only the most
 * specific defined one will be used for each node.
 */
function visit$5(node, visitor) {
    const visitor_ = initVisitor(visitor);
    if (identity$w.isDocument(node)) {
        const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE$1)
            node.contents = null;
    }
    else
        visit_(null, node, visitor_, Object.freeze([]));
}
// Without the `as symbol` casts, TS declares these in the `visit`
// namespace using `var`, but then complains about that because
// `unique symbol` must be `const`.
/** Terminate visit traversal completely */
visit$5.BREAK = BREAK$1;
/** Do not visit the children of the current node */
visit$5.SKIP = SKIP$1;
/** Remove the current node */
visit$5.REMOVE = REMOVE$1;
function visit_(key, node, visitor, path) {
    const ctrl = callVisitor(key, node, visitor, path);
    if (identity$w.isNode(ctrl) || identity$w.isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visit_(key, ctrl, visitor, path);
    }
    if (typeof ctrl !== 'symbol') {
        if (identity$w.isCollection(node)) {
            path = Object.freeze(path.concat(node));
            for (let i = 0; i < node.items.length; ++i) {
                const ci = visit_(i, node.items[i], visitor, path);
                if (typeof ci === 'number')
                    i = ci - 1;
                else if (ci === BREAK$1)
                    return BREAK$1;
                else if (ci === REMOVE$1) {
                    node.items.splice(i, 1);
                    i -= 1;
                }
            }
        }
        else if (identity$w.isPair(node)) {
            path = Object.freeze(path.concat(node));
            const ck = visit_('key', node.key, visitor, path);
            if (ck === BREAK$1)
                return BREAK$1;
            else if (ck === REMOVE$1)
                node.key = null;
            const cv = visit_('value', node.value, visitor, path);
            if (cv === BREAK$1)
                return BREAK$1;
            else if (cv === REMOVE$1)
                node.value = null;
        }
    }
    return ctrl;
}
/**
 * Apply an async visitor to an AST node or document.
 *
 * Walks through the tree (depth-first) starting from `node`, calling a
 * `visitor` function with three arguments:
 *   - `key`: For sequence values and map `Pair`, the node's index in the
 *     collection. Within a `Pair`, `'key'` or `'value'`, correspondingly.
 *     `null` for the root node.
 *   - `node`: The current node.
 *   - `path`: The ancestry of the current node.
 *
 * The return value of the visitor may be used to control the traversal:
 *   - `Promise`: Must resolve to one of the following values
 *   - `undefined` (default): Do nothing and continue
 *   - `visit.SKIP`: Do not visit the children of this node, continue with next
 *     sibling
 *   - `visit.BREAK`: Terminate traversal completely
 *   - `visit.REMOVE`: Remove the current node, then continue with the next one
 *   - `Node`: Replace the current node, then continue by visiting it
 *   - `number`: While iterating the items of a sequence or map, set the index
 *     of the next step. This is useful especially if the index of the current
 *     node has changed.
 *
 * If `visitor` is a single function, it will be called with all values
 * encountered in the tree, including e.g. `null` values. Alternatively,
 * separate visitor functions may be defined for each `Map`, `Pair`, `Seq`,
 * `Alias` and `Scalar` node. To define the same visitor function for more than
 * one node type, use the `Collection` (map and seq), `Value` (map, seq & scalar)
 * and `Node` (alias, map, seq & scalar) targets. Of all these, only the most
 * specific defined one will be used for each node.
 */
async function visitAsync(node, visitor) {
    const visitor_ = initVisitor(visitor);
    if (identity$w.isDocument(node)) {
        const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE$1)
            node.contents = null;
    }
    else
        await visitAsync_(null, node, visitor_, Object.freeze([]));
}
// Without the `as symbol` casts, TS declares these in the `visit`
// namespace using `var`, but then complains about that because
// `unique symbol` must be `const`.
/** Terminate visit traversal completely */
visitAsync.BREAK = BREAK$1;
/** Do not visit the children of the current node */
visitAsync.SKIP = SKIP$1;
/** Remove the current node */
visitAsync.REMOVE = REMOVE$1;
async function visitAsync_(key, node, visitor, path) {
    const ctrl = await callVisitor(key, node, visitor, path);
    if (identity$w.isNode(ctrl) || identity$w.isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visitAsync_(key, ctrl, visitor, path);
    }
    if (typeof ctrl !== 'symbol') {
        if (identity$w.isCollection(node)) {
            path = Object.freeze(path.concat(node));
            for (let i = 0; i < node.items.length; ++i) {
                const ci = await visitAsync_(i, node.items[i], visitor, path);
                if (typeof ci === 'number')
                    i = ci - 1;
                else if (ci === BREAK$1)
                    return BREAK$1;
                else if (ci === REMOVE$1) {
                    node.items.splice(i, 1);
                    i -= 1;
                }
            }
        }
        else if (identity$w.isPair(node)) {
            path = Object.freeze(path.concat(node));
            const ck = await visitAsync_('key', node.key, visitor, path);
            if (ck === BREAK$1)
                return BREAK$1;
            else if (ck === REMOVE$1)
                node.key = null;
            const cv = await visitAsync_('value', node.value, visitor, path);
            if (cv === BREAK$1)
                return BREAK$1;
            else if (cv === REMOVE$1)
                node.value = null;
        }
    }
    return ctrl;
}
function initVisitor(visitor) {
    if (typeof visitor === 'object' &&
        (visitor.Collection || visitor.Node || visitor.Value)) {
        return Object.assign({
            Alias: visitor.Node,
            Map: visitor.Node,
            Scalar: visitor.Node,
            Seq: visitor.Node
        }, visitor.Value && {
            Map: visitor.Value,
            Scalar: visitor.Value,
            Seq: visitor.Value
        }, visitor.Collection && {
            Map: visitor.Collection,
            Seq: visitor.Collection
        }, visitor);
    }
    return visitor;
}
function callVisitor(key, node, visitor, path) {
    if (typeof visitor === 'function')
        return visitor(key, node, path);
    if (identity$w.isMap(node))
        return visitor.Map?.(key, node, path);
    if (identity$w.isSeq(node))
        return visitor.Seq?.(key, node, path);
    if (identity$w.isPair(node))
        return visitor.Pair?.(key, node, path);
    if (identity$w.isScalar(node))
        return visitor.Scalar?.(key, node, path);
    if (identity$w.isAlias(node))
        return visitor.Alias?.(key, node, path);
    return undefined;
}
function replaceNode(key, path, node) {
    const parent = path[path.length - 1];
    if (identity$w.isCollection(parent)) {
        parent.items[key] = node;
    }
    else if (identity$w.isPair(parent)) {
        if (key === 'key')
            parent.key = node;
        else
            parent.value = node;
    }
    else if (identity$w.isDocument(parent)) {
        parent.contents = node;
    }
    else {
        const pt = identity$w.isAlias(parent) ? 'alias' : 'scalar';
        throw new Error(`Cannot replace node with ${pt} parent`);
    }
}

visit$6.visit = visit$5;
visit$6.visitAsync = visitAsync;

var identity$v = identity$x;
var visit$4 = visit$6;

const escapeChars = {
    '!': '%21',
    ',': '%2C',
    '[': '%5B',
    ']': '%5D',
    '{': '%7B',
    '}': '%7D'
};
const escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, ch => escapeChars[ch]);
class Directives {
    constructor(yaml, tags) {
        /**
         * The directives-end/doc-start marker `---`. If `null`, a marker may still be
         * included in the document's stringified representation.
         */
        this.docStart = null;
        /** The doc-end marker `...`.  */
        this.docEnd = false;
        this.yaml = Object.assign({}, Directives.defaultYaml, yaml);
        this.tags = Object.assign({}, Directives.defaultTags, tags);
    }
    clone() {
        const copy = new Directives(this.yaml, this.tags);
        copy.docStart = this.docStart;
        return copy;
    }
    /**
     * During parsing, get a Directives instance for the current document and
     * update the stream state according to the current version's spec.
     */
    atDocument() {
        const res = new Directives(this.yaml, this.tags);
        switch (this.yaml.version) {
            case '1.1':
                this.atNextDocument = true;
                break;
            case '1.2':
                this.atNextDocument = false;
                this.yaml = {
                    explicit: Directives.defaultYaml.explicit,
                    version: '1.2'
                };
                this.tags = Object.assign({}, Directives.defaultTags);
                break;
        }
        return res;
    }
    /**
     * @param onError - May be called even if the action was successful
     * @returns `true` on success
     */
    add(line, onError) {
        if (this.atNextDocument) {
            this.yaml = { explicit: Directives.defaultYaml.explicit, version: '1.1' };
            this.tags = Object.assign({}, Directives.defaultTags);
            this.atNextDocument = false;
        }
        const parts = line.trim().split(/[ \t]+/);
        const name = parts.shift();
        switch (name) {
            case '%TAG': {
                if (parts.length !== 2) {
                    onError(0, '%TAG directive should contain exactly two parts');
                    if (parts.length < 2)
                        return false;
                }
                const [handle, prefix] = parts;
                this.tags[handle] = prefix;
                return true;
            }
            case '%YAML': {
                this.yaml.explicit = true;
                if (parts.length !== 1) {
                    onError(0, '%YAML directive should contain exactly one part');
                    return false;
                }
                const [version] = parts;
                if (version === '1.1' || version === '1.2') {
                    this.yaml.version = version;
                    return true;
                }
                else {
                    const isValid = /^\d+\.\d+$/.test(version);
                    onError(6, `Unsupported YAML version ${version}`, isValid);
                    return false;
                }
            }
            default:
                onError(0, `Unknown directive ${name}`, true);
                return false;
        }
    }
    /**
     * Resolves a tag, matching handles to those defined in %TAG directives.
     *
     * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
     *   `'!local'` tag, or `null` if unresolvable.
     */
    tagName(source, onError) {
        if (source === '!')
            return '!'; // non-specific tag
        if (source[0] !== '!') {
            onError(`Not a valid tag: ${source}`);
            return null;
        }
        if (source[1] === '<') {
            const verbatim = source.slice(2, -1);
            if (verbatim === '!' || verbatim === '!!') {
                onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
                return null;
            }
            if (source[source.length - 1] !== '>')
                onError('Verbatim tags must end with a >');
            return verbatim;
        }
        const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s);
        if (!suffix)
            onError(`The ${source} tag has no suffix`);
        const prefix = this.tags[handle];
        if (prefix) {
            try {
                return prefix + decodeURIComponent(suffix);
            }
            catch (error) {
                onError(String(error));
                return null;
            }
        }
        if (handle === '!')
            return source; // local tag
        onError(`Could not resolve tag: ${source}`);
        return null;
    }
    /**
     * Given a fully resolved tag, returns its printable string form,
     * taking into account current tag prefixes and defaults.
     */
    tagString(tag) {
        for (const [handle, prefix] of Object.entries(this.tags)) {
            if (tag.startsWith(prefix))
                return handle + escapeTagName(tag.substring(prefix.length));
        }
        return tag[0] === '!' ? tag : `!<${tag}>`;
    }
    toString(doc) {
        const lines = this.yaml.explicit
            ? [`%YAML ${this.yaml.version || '1.2'}`]
            : [];
        const tagEntries = Object.entries(this.tags);
        let tagNames;
        if (doc && tagEntries.length > 0 && identity$v.isNode(doc.contents)) {
            const tags = {};
            visit$4.visit(doc.contents, (_key, node) => {
                if (identity$v.isNode(node) && node.tag)
                    tags[node.tag] = true;
            });
            tagNames = Object.keys(tags);
        }
        else
            tagNames = [];
        for (const [handle, prefix] of tagEntries) {
            if (handle === '!!' && prefix === 'tag:yaml.org,2002:')
                continue;
            if (!doc || tagNames.some(tn => tn.startsWith(prefix)))
                lines.push(`%TAG ${handle} ${prefix}`);
        }
        return lines.join('\n');
    }
}
Directives.defaultYaml = { explicit: false, version: '1.2' };
Directives.defaultTags = { '!!': 'tag:yaml.org,2002:' };

directives$2.Directives = Directives;

var Document$4 = {};

var Alias$4 = {};

var anchors$3 = {};

var identity$u = identity$x;
var visit$3 = visit$6;

/**
 * Verify that the input string is a valid anchor.
 *
 * Will throw on errors.
 */
function anchorIsValid(anchor) {
    if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
        const sa = JSON.stringify(anchor);
        const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
        throw new Error(msg);
    }
    return true;
}
function anchorNames(root) {
    const anchors = new Set();
    visit$3.visit(root, {
        Value(_key, node) {
            if (node.anchor)
                anchors.add(node.anchor);
        }
    });
    return anchors;
}
/** Find a new anchor name with the given `prefix` and a one-indexed suffix. */
function findNewAnchor(prefix, exclude) {
    for (let i = 1; true; ++i) {
        const name = `${prefix}${i}`;
        if (!exclude.has(name))
            return name;
    }
}
function createNodeAnchors(doc, prefix) {
    const aliasObjects = [];
    const sourceObjects = new Map();
    let prevAnchors = null;
    return {
        onAnchor: (source) => {
            aliasObjects.push(source);
            prevAnchors ?? (prevAnchors = anchorNames(doc));
            const anchor = findNewAnchor(prefix, prevAnchors);
            prevAnchors.add(anchor);
            return anchor;
        },
        /**
         * With circular references, the source node is only resolved after all
         * of its child nodes are. This is why anchors are set only after all of
         * the nodes have been created.
         */
        setAnchors: () => {
            for (const source of aliasObjects) {
                const ref = sourceObjects.get(source);
                if (typeof ref === 'object' &&
                    ref.anchor &&
                    (identity$u.isScalar(ref.node) || identity$u.isCollection(ref.node))) {
                    ref.node.anchor = ref.anchor;
                }
                else {
                    const error = new Error('Failed to resolve repeated object (this should not happen)');
                    error.source = source;
                    throw error;
                }
            }
        },
        sourceObjects
    };
}

anchors$3.anchorIsValid = anchorIsValid;
anchors$3.anchorNames = anchorNames;
anchors$3.createNodeAnchors = createNodeAnchors;
anchors$3.findNewAnchor = findNewAnchor;

var Node$3 = {};

var applyReviver$3 = {};

/**
 * Applies the JSON.parse reviver algorithm as defined in the ECMA-262 spec,
 * in section 24.5.1.1 "Runtime Semantics: InternalizeJSONProperty" of the
 * 2021 edition: https://tc39.es/ecma262/#sec-json.parse
 *
 * Includes extensions for handling Map and Set objects.
 */
function applyReviver$2(reviver, obj, key, val) {
    if (val && typeof val === 'object') {
        if (Array.isArray(val)) {
            for (let i = 0, len = val.length; i < len; ++i) {
                const v0 = val[i];
                const v1 = applyReviver$2(reviver, val, String(i), v0);
                // eslint-disable-next-line @typescript-eslint/no-array-delete
                if (v1 === undefined)
                    delete val[i];
                else if (v1 !== v0)
                    val[i] = v1;
            }
        }
        else if (val instanceof Map) {
            for (const k of Array.from(val.keys())) {
                const v0 = val.get(k);
                const v1 = applyReviver$2(reviver, val, k, v0);
                if (v1 === undefined)
                    val.delete(k);
                else if (v1 !== v0)
                    val.set(k, v1);
            }
        }
        else if (val instanceof Set) {
            for (const v0 of Array.from(val)) {
                const v1 = applyReviver$2(reviver, val, v0, v0);
                if (v1 === undefined)
                    val.delete(v0);
                else if (v1 !== v0) {
                    val.delete(v0);
                    val.add(v1);
                }
            }
        }
        else {
            for (const [k, v0] of Object.entries(val)) {
                const v1 = applyReviver$2(reviver, val, k, v0);
                if (v1 === undefined)
                    delete val[k];
                else if (v1 !== v0)
                    val[k] = v1;
            }
        }
    }
    return reviver.call(obj, key, val);
}

applyReviver$3.applyReviver = applyReviver$2;

var toJS$8 = {};

var identity$t = identity$x;

/**
 * Recursively convert any node or its contents to native JavaScript
 *
 * @param value - The input value
 * @param arg - If `value` defines a `toJSON()` method, use this
 *   as its first argument
 * @param ctx - Conversion context, originally set in Document#toJS(). If
 *   `{ keep: true }` is not set, output should be suitable for JSON
 *   stringification.
 */
function toJS$7(value, arg, ctx) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (Array.isArray(value))
        return value.map((v, i) => toJS$7(v, String(i), ctx));
    if (value && typeof value.toJSON === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (!ctx || !identity$t.hasAnchor(value))
            return value.toJSON(arg, ctx);
        const data = { aliasCount: 0, count: 1, res: undefined };
        ctx.anchors.set(value, data);
        ctx.onCreate = res => {
            data.res = res;
            delete ctx.onCreate;
        };
        const res = value.toJSON(arg, ctx);
        if (ctx.onCreate)
            ctx.onCreate(res);
        return res;
    }
    if (typeof value === 'bigint' && !ctx?.keep)
        return Number(value);
    return value;
}

toJS$8.toJS = toJS$7;

var applyReviver$1 = applyReviver$3;
var identity$s = identity$x;
var toJS$6 = toJS$8;

class NodeBase {
    constructor(type) {
        Object.defineProperty(this, identity$s.NODE_TYPE, { value: type });
    }
    /** Create a copy of this node.  */
    clone() {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (this.range)
            copy.range = this.range.slice();
        return copy;
    }
    /** A plain JavaScript representation of this node. */
    toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        if (!identity$s.isDocument(doc))
            throw new TypeError('A document argument is required');
        const ctx = {
            anchors: new Map(),
            doc,
            keep: true,
            mapAsMap: mapAsMap === true,
            mapKeyWarned: false,
            maxAliasCount: typeof maxAliasCount === 'number' ? maxAliasCount : 100
        };
        const res = toJS$6.toJS(this, '', ctx);
        if (typeof onAnchor === 'function')
            for (const { count, res } of ctx.anchors.values())
                onAnchor(res, count);
        return typeof reviver === 'function'
            ? applyReviver$1.applyReviver(reviver, { '': res }, '', res)
            : res;
    }
}

Node$3.NodeBase = NodeBase;

var anchors$2 = anchors$3;
var visit$2 = visit$6;
var identity$r = identity$x;
var Node$2 = Node$3;
var toJS$5 = toJS$8;

let Alias$3 = class Alias extends Node$2.NodeBase {
    constructor(source) {
        super(identity$r.ALIAS);
        this.source = source;
        Object.defineProperty(this, 'tag', {
            set() {
                throw new Error('Alias nodes cannot have tags');
            }
        });
    }
    /**
     * Resolve the value of this alias within `doc`, finding the last
     * instance of the `source` anchor before this node.
     */
    resolve(doc, ctx) {
        if (ctx?.maxAliasCount === 0)
            throw new ReferenceError('Alias resolution is disabled');
        let nodes;
        if (ctx?.aliasResolveCache) {
            nodes = ctx.aliasResolveCache;
        }
        else {
            nodes = [];
            visit$2.visit(doc, {
                Node: (_key, node) => {
                    if (identity$r.isAlias(node) || identity$r.hasAnchor(node))
                        nodes.push(node);
                }
            });
            if (ctx)
                ctx.aliasResolveCache = nodes;
        }
        let found = undefined;
        for (const node of nodes) {
            if (node === this)
                break;
            if (node.anchor === this.source)
                found = node;
        }
        if (found && ctx) {
            const { anchors, doc, maxAliasCount } = ctx;
            let data = anchors.get(found);
            if (!data) {
                // Resolve anchors for Node.prototype.toJS()
                toJS$5.toJS(found, null, ctx);
                data = anchors.get(found);
            }
            /* istanbul ignore if */
            if (data?.res === undefined) {
                const msg = 'This should not happen: Alias anchor was not resolved?';
                throw new ReferenceError(msg);
            }
            if (maxAliasCount >= 0) {
                data.count += 1;
                if (data.aliasCount === 0)
                    data.aliasCount = getAliasCount(doc, found, anchors);
                if (data.count * data.aliasCount > maxAliasCount) {
                    const msg = 'Excessive alias count indicates a resource exhaustion attack';
                    throw new ReferenceError(msg);
                }
            }
        }
        return found;
    }
    toJSON(_arg, ctx) {
        if (!ctx)
            return { source: this.source };
        const source = this.resolve(ctx.doc, ctx);
        if (!source) {
            const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
            throw new ReferenceError(msg);
        }
        return ctx.anchors.get(source).res;
    }
    toString(ctx, _onComment, _onChompKeep) {
        const src = `*${this.source}`;
        if (ctx) {
            anchors$2.anchorIsValid(this.source);
            if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
                const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
                throw new Error(msg);
            }
            if (ctx.implicitKey)
                return `${src} `;
        }
        return src;
    }
};
function getAliasCount(doc, node, anchors) {
    if (identity$r.isAlias(node)) {
        const source = node.resolve(doc);
        const anchor = anchors && source && anchors.get(source);
        return anchor ? anchor.count * anchor.aliasCount : 0;
    }
    else if (identity$r.isCollection(node)) {
        let count = 0;
        for (const item of node.items) {
            const c = getAliasCount(doc, item, anchors);
            if (c > count)
                count = c;
        }
        return count;
    }
    else if (identity$r.isPair(node)) {
        const kc = getAliasCount(doc, node.key, anchors);
        const vc = getAliasCount(doc, node.value, anchors);
        return Math.max(kc, vc);
    }
    return 1;
}

Alias$4.Alias = Alias$3;

var Collection$4 = {};

var createNode$5 = {};

var Scalar$k = {};

var identity$q = identity$x;
var Node$1 = Node$3;
var toJS$4 = toJS$8;

const isScalarValue = (value) => !value || (typeof value !== 'function' && typeof value !== 'object');
let Scalar$j = class Scalar extends Node$1.NodeBase {
    constructor(value) {
        super(identity$q.SCALAR);
        this.value = value;
    }
    toJSON(arg, ctx) {
        return ctx?.keep ? this.value : toJS$4.toJS(this.value, arg, ctx);
    }
    toString() {
        return String(this.value);
    }
};
Scalar$j.BLOCK_FOLDED = 'BLOCK_FOLDED';
Scalar$j.BLOCK_LITERAL = 'BLOCK_LITERAL';
Scalar$j.PLAIN = 'PLAIN';
Scalar$j.QUOTE_DOUBLE = 'QUOTE_DOUBLE';
Scalar$j.QUOTE_SINGLE = 'QUOTE_SINGLE';

Scalar$k.Scalar = Scalar$j;
Scalar$k.isScalarValue = isScalarValue;

var Alias$2 = Alias$4;
var identity$p = identity$x;
var Scalar$i = Scalar$k;

const defaultTagPrefix = 'tag:yaml.org,2002:';
function findTagObject(value, tagName, tags) {
    if (tagName) {
        const match = tags.filter(t => t.tag === tagName);
        const tagObj = match.find(t => !t.format) ?? match[0];
        if (!tagObj)
            throw new Error(`Tag ${tagName} not found`);
        return tagObj;
    }
    return tags.find(t => t.identify?.(value) && !t.format);
}
function createNode$4(value, tagName, ctx) {
    if (identity$p.isDocument(value))
        value = value.contents;
    if (identity$p.isNode(value))
        return value;
    if (identity$p.isPair(value)) {
        const map = ctx.schema[identity$p.MAP].createNode?.(ctx.schema, null, ctx);
        map.items.push(value);
        return map;
    }
    if (value instanceof String ||
        value instanceof Number ||
        value instanceof Boolean ||
        (typeof BigInt !== 'undefined' && value instanceof BigInt) // not supported everywhere
    ) {
        // https://tc39.es/ecma262/#sec-serializejsonproperty
        value = value.valueOf();
    }
    const { aliasDuplicateObjects, onAnchor, onTagObj, schema, sourceObjects } = ctx;
    // Detect duplicate references to the same object & use Alias nodes for all
    // after first. The `ref` wrapper allows for circular references to resolve.
    let ref = undefined;
    if (aliasDuplicateObjects && value && typeof value === 'object') {
        ref = sourceObjects.get(value);
        if (ref) {
            ref.anchor ?? (ref.anchor = onAnchor(value));
            return new Alias$2.Alias(ref.anchor);
        }
        else {
            ref = { anchor: null, node: null };
            sourceObjects.set(value, ref);
        }
    }
    if (tagName?.startsWith('!!'))
        tagName = defaultTagPrefix + tagName.slice(2);
    let tagObj = findTagObject(value, tagName, schema.tags);
    if (!tagObj) {
        if (value && typeof value.toJSON === 'function') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            value = value.toJSON();
        }
        if (!value || typeof value !== 'object') {
            const node = new Scalar$i.Scalar(value);
            if (ref)
                ref.node = node;
            return node;
        }
        tagObj =
            value instanceof Map
                ? schema[identity$p.MAP]
                : Symbol.iterator in Object(value)
                    ? schema[identity$p.SEQ]
                    : schema[identity$p.MAP];
    }
    if (onTagObj) {
        onTagObj(tagObj);
        delete ctx.onTagObj;
    }
    const node = tagObj?.createNode
        ? tagObj.createNode(ctx.schema, value, ctx)
        : typeof tagObj?.nodeClass?.from === 'function'
            ? tagObj.nodeClass.from(ctx.schema, value, ctx)
            : new Scalar$i.Scalar(value);
    if (tagName)
        node.tag = tagName;
    else if (!tagObj.default)
        node.tag = tagObj.tag;
    if (ref)
        ref.node = node;
    return node;
}

createNode$5.createNode = createNode$4;

var createNode$3 = createNode$5;
var identity$o = identity$x;
var Node = Node$3;

function collectionFromPath(schema, path, value) {
    let v = value;
    for (let i = path.length - 1; i >= 0; --i) {
        const k = path[i];
        if (typeof k === 'number' && Number.isInteger(k) && k >= 0) {
            const a = [];
            a[k] = v;
            v = a;
        }
        else {
            v = new Map([[k, v]]);
        }
    }
    return createNode$3.createNode(v, undefined, {
        aliasDuplicateObjects: false,
        keepUndefined: false,
        onAnchor: () => {
            throw new Error('This should not happen, please report a bug.');
        },
        schema,
        sourceObjects: new Map()
    });
}
// Type guard is intentionally a little wrong so as to be more useful,
// as it does not cover untypable empty non-string iterables (e.g. []).
const isEmptyPath = (path) => path == null ||
    (typeof path === 'object' && !!path[Symbol.iterator]().next().done);
let Collection$3 = class Collection extends Node.NodeBase {
    constructor(type, schema) {
        super(type);
        Object.defineProperty(this, 'schema', {
            value: schema,
            configurable: true,
            enumerable: false,
            writable: true
        });
    }
    /**
     * Create a copy of this collection.
     *
     * @param schema - If defined, overwrites the original's schema
     */
    clone(schema) {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (schema)
            copy.schema = schema;
        copy.items = copy.items.map(it => identity$o.isNode(it) || identity$o.isPair(it) ? it.clone(schema) : it);
        if (this.range)
            copy.range = this.range.slice();
        return copy;
    }
    /**
     * Adds a value to the collection. For `!!map` and `!!omap` the value must
     * be a Pair instance or a `{ key, value }` object, which may not have a key
     * that already exists in the map.
     */
    addIn(path, value) {
        if (isEmptyPath(path))
            this.add(value);
        else {
            const [key, ...rest] = path;
            const node = this.get(key, true);
            if (identity$o.isCollection(node))
                node.addIn(rest, value);
            else if (node === undefined && this.schema)
                this.set(key, collectionFromPath(this.schema, rest, value));
            else
                throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
    }
    /**
     * Removes a value from the collection.
     * @returns `true` if the item was found and removed.
     */
    deleteIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
            return this.delete(key);
        const node = this.get(key, true);
        if (identity$o.isCollection(node))
            return node.deleteIn(rest);
        else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
    }
    /**
     * Returns item at `key`, or `undefined` if not found. By default unwraps
     * scalar values from their surrounding node; to disable set `keepScalar` to
     * `true` (collections are always returned intact).
     */
    getIn(path, keepScalar) {
        const [key, ...rest] = path;
        const node = this.get(key, true);
        if (rest.length === 0)
            return !keepScalar && identity$o.isScalar(node) ? node.value : node;
        else
            return identity$o.isCollection(node) ? node.getIn(rest, keepScalar) : undefined;
    }
    hasAllNullValues(allowScalar) {
        return this.items.every(node => {
            if (!identity$o.isPair(node))
                return false;
            const n = node.value;
            return (n == null ||
                (allowScalar &&
                    identity$o.isScalar(n) &&
                    n.value == null &&
                    !n.commentBefore &&
                    !n.comment &&
                    !n.tag));
        });
    }
    /**
     * Checks if the collection includes a value with the key `key`.
     */
    hasIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
            return this.has(key);
        const node = this.get(key, true);
        return identity$o.isCollection(node) ? node.hasIn(rest) : false;
    }
    /**
     * Sets a value in this collection. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     */
    setIn(path, value) {
        const [key, ...rest] = path;
        if (rest.length === 0) {
            this.set(key, value);
        }
        else {
            const node = this.get(key, true);
            if (identity$o.isCollection(node))
                node.setIn(rest, value);
            else if (node === undefined && this.schema)
                this.set(key, collectionFromPath(this.schema, rest, value));
            else
                throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
    }
};

Collection$4.Collection = Collection$3;
Collection$4.collectionFromPath = collectionFromPath;
Collection$4.isEmptyPath = isEmptyPath;

var Pair$8 = {};

var stringifyPair$2 = {};

var stringify$8 = {};

var stringifyComment$5 = {};

/**
 * Stringifies a comment.
 *
 * Empty comment lines are left empty,
 * lines consisting of a single space are replaced by `#`,
 * and all other lines are prefixed with a `#`.
 */
const stringifyComment$4 = (str) => str.replace(/^(?!$)(?: $)?/gm, '#');
function indentComment(comment, indent) {
    if (/^\n+$/.test(comment))
        return comment.substring(1);
    return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
}
const lineComment = (str, indent, comment) => str.endsWith('\n')
    ? indentComment(comment, indent)
    : comment.includes('\n')
        ? '\n' + indentComment(comment, indent)
        : (str.endsWith(' ') ? '' : ' ') + comment;

stringifyComment$5.indentComment = indentComment;
stringifyComment$5.lineComment = lineComment;
stringifyComment$5.stringifyComment = stringifyComment$4;

var stringifyString$5 = {};

var foldFlowLines$2 = {};

const FOLD_FLOW = 'flow';
const FOLD_BLOCK = 'block';
const FOLD_QUOTED = 'quoted';
/**
 * Tries to keep input at up to `lineWidth` characters, splitting only on spaces
 * not followed by newlines or spaces unless `mode` is `'quoted'`. Lines are
 * terminated with `\n` and started with `indent`.
 */
function foldFlowLines$1(text, indent, mode = 'flow', { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
    if (!lineWidth || lineWidth < 0)
        return text;
    if (lineWidth < minContentWidth)
        minContentWidth = 0;
    const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
    if (text.length <= endStep)
        return text;
    const folds = [];
    const escapedFolds = {};
    let end = lineWidth - indent.length;
    if (typeof indentAtStart === 'number') {
        if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
            folds.push(0);
        else
            end = lineWidth - indentAtStart;
    }
    let split = undefined;
    let prev = undefined;
    let overflow = false;
    let i = -1;
    let escStart = -1;
    let escEnd = -1;
    if (mode === FOLD_BLOCK) {
        i = consumeMoreIndentedLines(text, i, indent.length);
        if (i !== -1)
            end = i + endStep;
    }
    for (let ch; (ch = text[(i += 1)]);) {
        if (mode === FOLD_QUOTED && ch === '\\') {
            escStart = i;
            switch (text[i + 1]) {
                case 'x':
                    i += 3;
                    break;
                case 'u':
                    i += 5;
                    break;
                case 'U':
                    i += 9;
                    break;
                default:
                    i += 1;
            }
            escEnd = i;
        }
        if (ch === '\n') {
            if (mode === FOLD_BLOCK)
                i = consumeMoreIndentedLines(text, i, indent.length);
            end = i + indent.length + endStep;
            split = undefined;
        }
        else {
            if (ch === ' ' &&
                prev &&
                prev !== ' ' &&
                prev !== '\n' &&
                prev !== '\t') {
                // space surrounded by non-space can be replaced with newline + indent
                const next = text[i + 1];
                if (next && next !== ' ' && next !== '\n' && next !== '\t')
                    split = i;
            }
            if (i >= end) {
                if (split) {
                    folds.push(split);
                    end = split + endStep;
                    split = undefined;
                }
                else if (mode === FOLD_QUOTED) {
                    // white-space collected at end may stretch past lineWidth
                    while (prev === ' ' || prev === '\t') {
                        prev = ch;
                        ch = text[(i += 1)];
                        overflow = true;
                    }
                    // Account for newline escape, but don't break preceding escape
                    const j = i > escEnd + 1 ? i - 2 : escStart - 1;
                    // Bail out if lineWidth & minContentWidth are shorter than an escape string
                    if (escapedFolds[j])
                        return text;
                    folds.push(j);
                    escapedFolds[j] = true;
                    end = j + endStep;
                    split = undefined;
                }
                else {
                    overflow = true;
                }
            }
        }
        prev = ch;
    }
    if (overflow && onOverflow)
        onOverflow();
    if (folds.length === 0)
        return text;
    if (onFold)
        onFold();
    let res = text.slice(0, folds[0]);
    for (let i = 0; i < folds.length; ++i) {
        const fold = folds[i];
        const end = folds[i + 1] || text.length;
        if (fold === 0)
            res = `\n${indent}${text.slice(0, end)}`;
        else {
            if (mode === FOLD_QUOTED && escapedFolds[fold])
                res += `${text[fold]}\\`;
            res += `\n${indent}${text.slice(fold + 1, end)}`;
        }
    }
    return res;
}
/**
 * Presumes `i + 1` is at the start of a line
 * @returns index of last newline in more-indented block
 */
function consumeMoreIndentedLines(text, i, indent) {
    let end = i;
    let start = i + 1;
    let ch = text[start];
    while (ch === ' ' || ch === '\t') {
        if (i < start + indent) {
            ch = text[++i];
        }
        else {
            do {
                ch = text[++i];
            } while (ch && ch !== '\n');
            end = i;
            start = i + 1;
            ch = text[start];
        }
    }
    return end;
}

foldFlowLines$2.FOLD_BLOCK = FOLD_BLOCK;
foldFlowLines$2.FOLD_FLOW = FOLD_FLOW;
foldFlowLines$2.FOLD_QUOTED = FOLD_QUOTED;
foldFlowLines$2.foldFlowLines = foldFlowLines$1;

var Scalar$h = Scalar$k;
var foldFlowLines = foldFlowLines$2;

const getFoldOptions = (ctx, isBlock) => ({
    indentAtStart: isBlock ? ctx.indent.length : ctx.indentAtStart,
    lineWidth: ctx.options.lineWidth,
    minContentWidth: ctx.options.minContentWidth
});
// Also checks for lines starting with %, as parsing the output as YAML 1.1 will
// presume that's starting a new document.
const containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
function lineLengthOverLimit(str, lineWidth, indentLength) {
    if (!lineWidth || lineWidth < 0)
        return false;
    const limit = lineWidth - indentLength;
    const strLen = str.length;
    if (strLen <= limit)
        return false;
    for (let i = 0, start = 0; i < strLen; ++i) {
        if (str[i] === '\n') {
            if (i - start > limit)
                return true;
            start = i + 1;
            if (strLen - start <= limit)
                return false;
        }
    }
    return true;
}
function doubleQuotedString(value, ctx) {
    const json = JSON.stringify(value);
    if (ctx.options.doubleQuotedAsJSON)
        return json;
    const { implicitKey } = ctx;
    const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
    const indent = ctx.indent || (containsDocumentMarker(value) ? '  ' : '');
    let str = '';
    let start = 0;
    for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
        if (ch === ' ' && json[i + 1] === '\\' && json[i + 2] === 'n') {
            // space before newline needs to be escaped to not be folded
            str += json.slice(start, i) + '\\ ';
            i += 1;
            start = i;
            ch = '\\';
        }
        if (ch === '\\')
            switch (json[i + 1]) {
                case 'u':
                    {
                        str += json.slice(start, i);
                        const code = json.substr(i + 2, 4);
                        switch (code) {
                            case '0000':
                                str += '\\0';
                                break;
                            case '0007':
                                str += '\\a';
                                break;
                            case '000b':
                                str += '\\v';
                                break;
                            case '001b':
                                str += '\\e';
                                break;
                            case '0085':
                                str += '\\N';
                                break;
                            case '00a0':
                                str += '\\_';
                                break;
                            case '2028':
                                str += '\\L';
                                break;
                            case '2029':
                                str += '\\P';
                                break;
                            default:
                                if (code.substr(0, 2) === '00')
                                    str += '\\x' + code.substr(2);
                                else
                                    str += json.substr(i, 6);
                        }
                        i += 5;
                        start = i + 1;
                    }
                    break;
                case 'n':
                    if (implicitKey ||
                        json[i + 2] === '"' ||
                        json.length < minMultiLineLength) {
                        i += 1;
                    }
                    else {
                        // folding will eat first newline
                        str += json.slice(start, i) + '\n\n';
                        while (json[i + 2] === '\\' &&
                            json[i + 3] === 'n' &&
                            json[i + 4] !== '"') {
                            str += '\n';
                            i += 2;
                        }
                        str += indent;
                        // space after newline needs to be escaped to not be folded
                        if (json[i + 2] === ' ')
                            str += '\\';
                        i += 1;
                        start = i + 1;
                    }
                    break;
                default:
                    i += 1;
            }
    }
    str = start ? str + json.slice(start) : json;
    return implicitKey
        ? str
        : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_QUOTED, getFoldOptions(ctx, false));
}
function singleQuotedString(value, ctx) {
    if (ctx.options.singleQuote === false ||
        (ctx.implicitKey && value.includes('\n')) ||
        /[ \t]\n|\n[ \t]/.test(value) // single quoted string can't have leading or trailing whitespace around newline
    )
        return doubleQuotedString(value, ctx);
    const indent = ctx.indent || (containsDocumentMarker(value) ? '  ' : '');
    const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&\n${indent}`) + "'";
    return ctx.implicitKey
        ? res
        : foldFlowLines.foldFlowLines(res, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
}
function quotedString(value, ctx) {
    const { singleQuote } = ctx.options;
    let qs;
    if (singleQuote === false)
        qs = doubleQuotedString;
    else {
        const hasDouble = value.includes('"');
        const hasSingle = value.includes("'");
        if (hasDouble && !hasSingle)
            qs = singleQuotedString;
        else if (hasSingle && !hasDouble)
            qs = doubleQuotedString;
        else
            qs = singleQuote ? singleQuotedString : doubleQuotedString;
    }
    return qs(value, ctx);
}
// The negative lookbehind avoids a polynomial search,
// but isn't supported yet on Safari: https://caniuse.com/js-regexp-lookbehind
let blockEndNewlines;
try {
    blockEndNewlines = new RegExp('(^|(?<!\n))\n+(?!\n|$)', 'g');
}
catch {
    blockEndNewlines = /\n+(?!\n|$)/g;
}
function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
    const { blockQuote, commentString, lineWidth } = ctx.options;
    // 1. Block can't end in whitespace unless the last line is non-empty.
    // 2. Strings consisting of only whitespace are best rendered explicitly.
    if (!blockQuote || /\n[\t ]+$/.test(value)) {
        return quotedString(value, ctx);
    }
    const indent = ctx.indent ||
        (ctx.forceBlockIndent || containsDocumentMarker(value) ? '  ' : '');
    const literal = blockQuote === 'literal'
        ? true
        : blockQuote === 'folded' || type === Scalar$h.Scalar.BLOCK_FOLDED
            ? false
            : type === Scalar$h.Scalar.BLOCK_LITERAL
                ? true
                : !lineLengthOverLimit(value, lineWidth, indent.length);
    if (!value)
        return literal ? '|\n' : '>\n';
    // determine chomping from whitespace at value end
    let chomp;
    let endStart;
    for (endStart = value.length; endStart > 0; --endStart) {
        const ch = value[endStart - 1];
        if (ch !== '\n' && ch !== '\t' && ch !== ' ')
            break;
    }
    let end = value.substring(endStart);
    const endNlPos = end.indexOf('\n');
    if (endNlPos === -1) {
        chomp = '-'; // strip
    }
    else if (value === end || endNlPos !== end.length - 1) {
        chomp = '+'; // keep
        if (onChompKeep)
            onChompKeep();
    }
    else {
        chomp = ''; // clip
    }
    if (end) {
        value = value.slice(0, -end.length);
        if (end[end.length - 1] === '\n')
            end = end.slice(0, -1);
        end = end.replace(blockEndNewlines, `$&${indent}`);
    }
    // determine indent indicator from whitespace at value start
    let startWithSpace = false;
    let startEnd;
    let startNlPos = -1;
    for (startEnd = 0; startEnd < value.length; ++startEnd) {
        const ch = value[startEnd];
        if (ch === ' ')
            startWithSpace = true;
        else if (ch === '\n')
            startNlPos = startEnd;
        else
            break;
    }
    let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
    if (start) {
        value = value.substring(start.length);
        start = start.replace(/\n+/g, `$&${indent}`);
    }
    const indentSize = indent ? '2' : '1'; // root is at -1
    // Leading | or > is added later
    let header = (startWithSpace ? indentSize : '') + chomp;
    if (comment) {
        header += ' ' + commentString(comment.replace(/ ?[\r\n]+/g, ' '));
        if (onComment)
            onComment();
    }
    if (!literal) {
        const foldedValue = value
            .replace(/\n+/g, '\n$&')
            .replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, '$1$2') // more-indented lines aren't folded
            //                ^ more-ind. ^ empty     ^ capture next empty lines only at end of indent
            .replace(/\n+/g, `$&${indent}`);
        let literalFallback = false;
        const foldOptions = getFoldOptions(ctx, true);
        if (blockQuote !== 'folded' && type !== Scalar$h.Scalar.BLOCK_FOLDED) {
            foldOptions.onOverflow = () => {
                literalFallback = true;
            };
        }
        const body = foldFlowLines.foldFlowLines(`${start}${foldedValue}${end}`, indent, foldFlowLines.FOLD_BLOCK, foldOptions);
        if (!literalFallback)
            return `>${header}\n${indent}${body}`;
    }
    value = value.replace(/\n+/g, `$&${indent}`);
    return `|${header}\n${indent}${start}${value}${end}`;
}
function plainString(item, ctx, onComment, onChompKeep) {
    const { type, value } = item;
    const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
    if ((implicitKey && value.includes('\n')) ||
        (inFlow && /[[\]{},]/.test(value))) {
        return quotedString(value, ctx);
    }
    if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
        // not allowed:
        // - '-' or '?'
        // - start with an indicator character (except [?:-]) or /[?-] /
        // - '\n ', ': ' or ' \n' anywhere
        // - '#' not preceded by a non-space char
        // - end with ' ' or ':'
        return implicitKey || inFlow || !value.includes('\n')
            ? quotedString(value, ctx)
            : blockString(item, ctx, onComment, onChompKeep);
    }
    if (!implicitKey &&
        !inFlow &&
        type !== Scalar$h.Scalar.PLAIN &&
        value.includes('\n')) {
        // Where allowed & type not set explicitly, prefer block style for multiline strings
        return blockString(item, ctx, onComment, onChompKeep);
    }
    if (containsDocumentMarker(value)) {
        if (indent === '') {
            ctx.forceBlockIndent = true;
            return blockString(item, ctx, onComment, onChompKeep);
        }
        else if (implicitKey && indent === indentStep) {
            return quotedString(value, ctx);
        }
    }
    const str = value.replace(/\n+/g, `$&\n${indent}`);
    // Verify that output will be parsed as a string, as e.g. plain numbers and
    // booleans get parsed with those types in v1.2 (e.g. '42', 'true' & '0.9e-3'),
    // and others in v1.1.
    if (actualString) {
        const test = (tag) => tag.default && tag.tag !== 'tag:yaml.org,2002:str' && tag.test?.test(str);
        const { compat, tags } = ctx.doc.schema;
        if (tags.some(test) || compat?.some(test))
            return quotedString(value, ctx);
    }
    return implicitKey
        ? str
        : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
}
function stringifyString$4(item, ctx, onComment, onChompKeep) {
    const { implicitKey, inFlow } = ctx;
    const ss = typeof item.value === 'string'
        ? item
        : Object.assign({}, item, { value: String(item.value) });
    let { type } = item;
    if (type !== Scalar$h.Scalar.QUOTE_DOUBLE) {
        // force double quotes on control characters & unpaired surrogates
        if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
            type = Scalar$h.Scalar.QUOTE_DOUBLE;
    }
    const _stringify = (_type) => {
        switch (_type) {
            case Scalar$h.Scalar.BLOCK_FOLDED:
            case Scalar$h.Scalar.BLOCK_LITERAL:
                return implicitKey || inFlow
                    ? quotedString(ss.value, ctx) // blocks are not valid inside flow containers
                    : blockString(ss, ctx, onComment, onChompKeep);
            case Scalar$h.Scalar.QUOTE_DOUBLE:
                return doubleQuotedString(ss.value, ctx);
            case Scalar$h.Scalar.QUOTE_SINGLE:
                return singleQuotedString(ss.value, ctx);
            case Scalar$h.Scalar.PLAIN:
                return plainString(ss, ctx, onComment, onChompKeep);
            default:
                return null;
        }
    };
    let res = _stringify(type);
    if (res === null) {
        const { defaultKeyType, defaultStringType } = ctx.options;
        const t = (implicitKey && defaultKeyType) || defaultStringType;
        res = _stringify(t);
        if (res === null)
            throw new Error(`Unsupported default string type ${t}`);
    }
    return res;
}

stringifyString$5.stringifyString = stringifyString$4;

var anchors$1 = anchors$3;
var identity$n = identity$x;
var stringifyComment$3 = stringifyComment$5;
var stringifyString$3 = stringifyString$5;

function createStringifyContext(doc, options) {
    const opt = Object.assign({
        blockQuote: true,
        commentString: stringifyComment$3.stringifyComment,
        defaultKeyType: null,
        defaultStringType: 'PLAIN',
        directives: null,
        doubleQuotedAsJSON: false,
        doubleQuotedMinMultiLineLength: 40,
        falseStr: 'false',
        flowCollectionPadding: true,
        indentSeq: true,
        lineWidth: 80,
        minContentWidth: 20,
        nullStr: 'null',
        simpleKeys: false,
        singleQuote: null,
        trailingComma: false,
        trueStr: 'true',
        verifyAliasOrder: true
    }, doc.schema.toStringOptions, options);
    let inFlow;
    switch (opt.collectionStyle) {
        case 'block':
            inFlow = false;
            break;
        case 'flow':
            inFlow = true;
            break;
        default:
            inFlow = null;
    }
    return {
        anchors: new Set(),
        doc,
        flowCollectionPadding: opt.flowCollectionPadding ? ' ' : '',
        indent: '',
        indentStep: typeof opt.indent === 'number' ? ' '.repeat(opt.indent) : '  ',
        inFlow,
        options: opt
    };
}
function getTagObject(tags, item) {
    if (item.tag) {
        const match = tags.filter(t => t.tag === item.tag);
        if (match.length > 0)
            return match.find(t => t.format === item.format) ?? match[0];
    }
    let tagObj = undefined;
    let obj;
    if (identity$n.isScalar(item)) {
        obj = item.value;
        let match = tags.filter(t => t.identify?.(obj));
        if (match.length > 1) {
            const testMatch = match.filter(t => t.test);
            if (testMatch.length > 0)
                match = testMatch;
        }
        tagObj =
            match.find(t => t.format === item.format) ?? match.find(t => !t.format);
    }
    else {
        obj = item;
        tagObj = tags.find(t => t.nodeClass && obj instanceof t.nodeClass);
    }
    if (!tagObj) {
        const name = obj?.constructor?.name ?? (obj === null ? 'null' : typeof obj);
        throw new Error(`Tag not resolved for ${name} value`);
    }
    return tagObj;
}
// needs to be called before value stringifier to allow for circular anchor refs
function stringifyProps(node, tagObj, { anchors: anchors$1$1, doc }) {
    if (!doc.directives)
        return '';
    const props = [];
    const anchor = (identity$n.isScalar(node) || identity$n.isCollection(node)) && node.anchor;
    if (anchor && anchors$1.anchorIsValid(anchor)) {
        anchors$1$1.add(anchor);
        props.push(`&${anchor}`);
    }
    const tag = node.tag ?? (tagObj.default ? null : tagObj.tag);
    if (tag)
        props.push(doc.directives.tagString(tag));
    return props.join(' ');
}
function stringify$7(item, ctx, onComment, onChompKeep) {
    if (identity$n.isPair(item))
        return item.toString(ctx, onComment, onChompKeep);
    if (identity$n.isAlias(item)) {
        if (ctx.doc.directives)
            return item.toString(ctx);
        if (ctx.resolvedAliases?.has(item)) {
            throw new TypeError(`Cannot stringify circular structure without alias nodes`);
        }
        else {
            if (ctx.resolvedAliases)
                ctx.resolvedAliases.add(item);
            else
                ctx.resolvedAliases = new Set([item]);
            item = item.resolve(ctx.doc);
        }
    }
    let tagObj = undefined;
    const node = identity$n.isNode(item)
        ? item
        : ctx.doc.createNode(item, { onTagObj: o => (tagObj = o) });
    tagObj ?? (tagObj = getTagObject(ctx.doc.schema.tags, node));
    const props = stringifyProps(node, tagObj, ctx);
    if (props.length > 0)
        ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
    const str = typeof tagObj.stringify === 'function'
        ? tagObj.stringify(node, ctx, onComment, onChompKeep)
        : identity$n.isScalar(node)
            ? stringifyString$3.stringifyString(node, ctx, onComment, onChompKeep)
            : node.toString(ctx, onComment, onChompKeep);
    if (!props)
        return str;
    return identity$n.isScalar(node) || str[0] === '{' || str[0] === '['
        ? `${props} ${str}`
        : `${props}\n${ctx.indent}${str}`;
}

stringify$8.createStringifyContext = createStringifyContext;
stringify$8.stringify = stringify$7;

var identity$m = identity$x;
var Scalar$g = Scalar$k;
var stringify$6 = stringify$8;
var stringifyComment$2 = stringifyComment$5;

function stringifyPair$1({ key, value }, ctx, onComment, onChompKeep) {
    const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
    let keyComment = (identity$m.isNode(key) && key.comment) || null;
    if (simpleKeys) {
        if (keyComment) {
            throw new Error('With simple keys, key nodes cannot have comments');
        }
        if (identity$m.isCollection(key) || (!identity$m.isNode(key) && typeof key === 'object')) {
            const msg = 'With simple keys, collection cannot be used as a key value';
            throw new Error(msg);
        }
    }
    let explicitKey = !simpleKeys &&
        (!key ||
            (keyComment && value == null && !ctx.inFlow) ||
            identity$m.isCollection(key) ||
            (identity$m.isScalar(key)
                ? key.type === Scalar$g.Scalar.BLOCK_FOLDED || key.type === Scalar$g.Scalar.BLOCK_LITERAL
                : typeof key === 'object'));
    ctx = Object.assign({}, ctx, {
        allNullValues: false,
        implicitKey: !explicitKey && (simpleKeys || !allNullValues),
        indent: indent + indentStep
    });
    let keyCommentDone = false;
    let chompKeep = false;
    let str = stringify$6.stringify(key, ctx, () => (keyCommentDone = true), () => (chompKeep = true));
    if (!explicitKey && !ctx.inFlow && str.length > 1024) {
        if (simpleKeys)
            throw new Error('With simple keys, single line scalar must not span more than 1024 characters');
        explicitKey = true;
    }
    if (ctx.inFlow) {
        if (allNullValues || value == null) {
            if (keyCommentDone && onComment)
                onComment();
            return str === '' ? '?' : explicitKey ? `? ${str}` : str;
        }
    }
    else if ((allNullValues && !simpleKeys) || (value == null && explicitKey)) {
        str = `? ${str}`;
        if (keyComment && !keyCommentDone) {
            str += stringifyComment$2.lineComment(str, ctx.indent, commentString(keyComment));
        }
        else if (chompKeep && onChompKeep)
            onChompKeep();
        return str;
    }
    if (keyCommentDone)
        keyComment = null;
    if (explicitKey) {
        if (keyComment)
            str += stringifyComment$2.lineComment(str, ctx.indent, commentString(keyComment));
        str = `? ${str}\n${indent}:`;
    }
    else {
        str = `${str}:`;
        if (keyComment)
            str += stringifyComment$2.lineComment(str, ctx.indent, commentString(keyComment));
    }
    let vsb, vcb, valueComment;
    if (identity$m.isNode(value)) {
        vsb = !!value.spaceBefore;
        vcb = value.commentBefore;
        valueComment = value.comment;
    }
    else {
        vsb = false;
        vcb = null;
        valueComment = null;
        if (value && typeof value === 'object')
            value = doc.createNode(value);
    }
    ctx.implicitKey = false;
    if (!explicitKey && !keyComment && identity$m.isScalar(value))
        ctx.indentAtStart = str.length + 1;
    chompKeep = false;
    if (!indentSeq &&
        indentStep.length >= 2 &&
        !ctx.inFlow &&
        !explicitKey &&
        identity$m.isSeq(value) &&
        !value.flow &&
        !value.tag &&
        !value.anchor) {
        // If indentSeq === false, consider '- ' as part of indentation where possible
        ctx.indent = ctx.indent.substring(2);
    }
    let valueCommentDone = false;
    const valueStr = stringify$6.stringify(value, ctx, () => (valueCommentDone = true), () => (chompKeep = true));
    let ws = ' ';
    if (keyComment || vsb || vcb) {
        ws = vsb ? '\n' : '';
        if (vcb) {
            const cs = commentString(vcb);
            ws += `\n${stringifyComment$2.indentComment(cs, ctx.indent)}`;
        }
        if (valueStr === '' && !ctx.inFlow) {
            if (ws === '\n' && valueComment)
                ws = '\n\n';
        }
        else {
            ws += `\n${ctx.indent}`;
        }
    }
    else if (!explicitKey && identity$m.isCollection(value)) {
        const vs0 = valueStr[0];
        const nl0 = valueStr.indexOf('\n');
        const hasNewline = nl0 !== -1;
        const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
        if (hasNewline || !flow) {
            let hasPropsLine = false;
            if (hasNewline && (vs0 === '&' || vs0 === '!')) {
                let sp0 = valueStr.indexOf(' ');
                if (vs0 === '&' &&
                    sp0 !== -1 &&
                    sp0 < nl0 &&
                    valueStr[sp0 + 1] === '!') {
                    sp0 = valueStr.indexOf(' ', sp0 + 1);
                }
                if (sp0 === -1 || nl0 < sp0)
                    hasPropsLine = true;
            }
            if (!hasPropsLine)
                ws = `\n${ctx.indent}`;
        }
    }
    else if (valueStr === '' || valueStr[0] === '\n') {
        ws = '';
    }
    str += ws + valueStr;
    if (ctx.inFlow) {
        if (valueCommentDone && onComment)
            onComment();
    }
    else if (valueComment && !valueCommentDone) {
        str += stringifyComment$2.lineComment(str, ctx.indent, commentString(valueComment));
    }
    else if (chompKeep && onChompKeep) {
        onChompKeep();
    }
    return str;
}

stringifyPair$2.stringifyPair = stringifyPair$1;

var addPairToJSMap$3 = {};

var log$2 = {};

var node_process$2 = require$$0$1;

function debug$1(logLevel, ...messages) {
    if (logLevel === 'debug')
        console.log(...messages);
}
function warn(logLevel, warning) {
    if (logLevel === 'debug' || logLevel === 'warn') {
        if (typeof node_process$2.emitWarning === 'function')
            node_process$2.emitWarning(warning);
        else
            console.warn(warning);
    }
}

log$2.debug = debug$1;
log$2.warn = warn;

var merge$4 = {};

var identity$l = identity$x;
var Scalar$f = Scalar$k;

// If the value associated with a merge key is a single mapping node, each of
// its key/value pairs is inserted into the current mapping, unless the key
// already exists in it. If the value associated with the merge key is a
// sequence, then this sequence is expected to contain mapping nodes and each
// of these nodes is merged in turn according to its order in the sequence.
// Keys in mapping nodes earlier in the sequence override keys specified in
// later mapping nodes. -- http://yaml.org/type/merge.html
const MERGE_KEY = '<<';
const merge$3 = {
    identify: value => value === MERGE_KEY ||
        (typeof value === 'symbol' && value.description === MERGE_KEY),
    default: 'key',
    tag: 'tag:yaml.org,2002:merge',
    test: /^<<$/,
    resolve: () => Object.assign(new Scalar$f.Scalar(Symbol(MERGE_KEY)), {
        addToJSMap: addMergeToJSMap
    }),
    stringify: () => MERGE_KEY
};
const isMergeKey = (ctx, key) => (merge$3.identify(key) ||
    (identity$l.isScalar(key) &&
        (!key.type || key.type === Scalar$f.Scalar.PLAIN) &&
        merge$3.identify(key.value))) &&
    ctx?.doc.schema.tags.some(tag => tag.tag === merge$3.tag && tag.default);
function addMergeToJSMap(ctx, map, value) {
    const source = resolveAliasValue(ctx, value);
    if (identity$l.isSeq(source))
        for (const it of source.items)
            mergeValue(ctx, map, it);
    else if (Array.isArray(source))
        for (const it of source)
            mergeValue(ctx, map, it);
    else
        mergeValue(ctx, map, source);
}
function mergeValue(ctx, map, value) {
    const source = resolveAliasValue(ctx, value);
    if (!identity$l.isMap(source))
        throw new Error('Merge sources must be maps or map aliases');
    const srcMap = source.toJSON(null, ctx, Map);
    for (const [key, value] of srcMap) {
        if (map instanceof Map) {
            if (!map.has(key))
                map.set(key, value);
        }
        else if (map instanceof Set) {
            map.add(key);
        }
        else if (!Object.prototype.hasOwnProperty.call(map, key)) {
            Object.defineProperty(map, key, {
                value,
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
    }
    return map;
}
function resolveAliasValue(ctx, value) {
    return ctx && identity$l.isAlias(value) ? value.resolve(ctx.doc, ctx) : value;
}

merge$4.addMergeToJSMap = addMergeToJSMap;
merge$4.isMergeKey = isMergeKey;
merge$4.merge = merge$3;

var log$1 = log$2;
var merge$2 = merge$4;
var stringify$5 = stringify$8;
var identity$k = identity$x;
var toJS$3 = toJS$8;

function addPairToJSMap$2(ctx, map, { key, value }) {
    if (identity$k.isNode(key) && key.addToJSMap)
        key.addToJSMap(ctx, map, value);
    // TODO: Should drop this special case for bare << handling
    else if (merge$2.isMergeKey(ctx, key))
        merge$2.addMergeToJSMap(ctx, map, value);
    else {
        const jsKey = toJS$3.toJS(key, '', ctx);
        if (map instanceof Map) {
            map.set(jsKey, toJS$3.toJS(value, jsKey, ctx));
        }
        else if (map instanceof Set) {
            map.add(jsKey);
        }
        else {
            const stringKey = stringifyKey(key, jsKey, ctx);
            const jsValue = toJS$3.toJS(value, stringKey, ctx);
            if (stringKey in map)
                Object.defineProperty(map, stringKey, {
                    value: jsValue,
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            else
                map[stringKey] = jsValue;
        }
    }
    return map;
}
function stringifyKey(key, jsKey, ctx) {
    if (jsKey === null)
        return '';
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    if (typeof jsKey !== 'object')
        return String(jsKey);
    if (identity$k.isNode(key) && ctx?.doc) {
        const strCtx = stringify$5.createStringifyContext(ctx.doc, {});
        strCtx.anchors = new Set();
        for (const node of ctx.anchors.keys())
            strCtx.anchors.add(node.anchor);
        strCtx.inFlow = true;
        strCtx.inStringifyKey = true;
        const strKey = key.toString(strCtx);
        if (!ctx.mapKeyWarned) {
            let jsonStr = JSON.stringify(strKey);
            if (jsonStr.length > 40)
                jsonStr = jsonStr.substring(0, 36) + '..."';
            log$1.warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
            ctx.mapKeyWarned = true;
        }
        return strKey;
    }
    return JSON.stringify(jsKey);
}

addPairToJSMap$3.addPairToJSMap = addPairToJSMap$2;

var createNode$2 = createNode$5;
var stringifyPair = stringifyPair$2;
var addPairToJSMap$1 = addPairToJSMap$3;
var identity$j = identity$x;

function createPair(key, value, ctx) {
    const k = createNode$2.createNode(key, undefined, ctx);
    const v = createNode$2.createNode(value, undefined, ctx);
    return new Pair$7(k, v);
}
let Pair$7 = class Pair {
    constructor(key, value = null) {
        Object.defineProperty(this, identity$j.NODE_TYPE, { value: identity$j.PAIR });
        this.key = key;
        this.value = value;
    }
    clone(schema) {
        let { key, value } = this;
        if (identity$j.isNode(key))
            key = key.clone(schema);
        if (identity$j.isNode(value))
            value = value.clone(schema);
        return new Pair(key, value);
    }
    toJSON(_, ctx) {
        const pair = ctx?.mapAsMap ? new Map() : {};
        return addPairToJSMap$1.addPairToJSMap(ctx, pair, this);
    }
    toString(ctx, onComment, onChompKeep) {
        return ctx?.doc
            ? stringifyPair.stringifyPair(this, ctx, onComment, onChompKeep)
            : JSON.stringify(this);
    }
};

Pair$8.Pair = Pair$7;
Pair$8.createPair = createPair;

var Schema$2 = {};

var map$6 = {};

var YAMLMap$8 = {};

var stringifyCollection$3 = {};

var identity$i = identity$x;
var stringify$4 = stringify$8;
var stringifyComment$1 = stringifyComment$5;

function stringifyCollection$2(collection, ctx, options) {
    const flow = ctx.inFlow ?? collection.flow;
    const stringify = flow ? stringifyFlowCollection : stringifyBlockCollection;
    return stringify(collection, ctx, options);
}
function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
    const { indent, options: { commentString } } = ctx;
    const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
    let chompKeep = false; // flag for the preceding node's status
    const lines = [];
    for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment = null;
        if (identity$i.isNode(item)) {
            if (!chompKeep && item.spaceBefore)
                lines.push('');
            addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
            if (item.comment)
                comment = item.comment;
        }
        else if (identity$i.isPair(item)) {
            const ik = identity$i.isNode(item.key) ? item.key : null;
            if (ik) {
                if (!chompKeep && ik.spaceBefore)
                    lines.push('');
                addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
            }
        }
        chompKeep = false;
        let str = stringify$4.stringify(item, itemCtx, () => (comment = null), () => (chompKeep = true));
        if (comment)
            str += stringifyComment$1.lineComment(str, itemIndent, commentString(comment));
        if (chompKeep && comment)
            chompKeep = false;
        lines.push(blockItemPrefix + str);
    }
    let str;
    if (lines.length === 0) {
        str = flowChars.start + flowChars.end;
    }
    else {
        str = lines[0];
        for (let i = 1; i < lines.length; ++i) {
            const line = lines[i];
            str += line ? `\n${indent}${line}` : '\n';
        }
    }
    if (comment) {
        str += '\n' + stringifyComment$1.indentComment(commentString(comment), indent);
        if (onComment)
            onComment();
    }
    else if (chompKeep && onChompKeep)
        onChompKeep();
    return str;
}
function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
    const { indent, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
    itemIndent += indentStep;
    const itemCtx = Object.assign({}, ctx, {
        indent: itemIndent,
        inFlow: true,
        type: null
    });
    let reqNewline = false;
    let linesAtValue = 0;
    const lines = [];
    for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment = null;
        if (identity$i.isNode(item)) {
            if (item.spaceBefore)
                lines.push('');
            addCommentBefore(ctx, lines, item.commentBefore, false);
            if (item.comment)
                comment = item.comment;
        }
        else if (identity$i.isPair(item)) {
            const ik = identity$i.isNode(item.key) ? item.key : null;
            if (ik) {
                if (ik.spaceBefore)
                    lines.push('');
                addCommentBefore(ctx, lines, ik.commentBefore, false);
                if (ik.comment)
                    reqNewline = true;
            }
            const iv = identity$i.isNode(item.value) ? item.value : null;
            if (iv) {
                if (iv.comment)
                    comment = iv.comment;
                if (iv.commentBefore)
                    reqNewline = true;
            }
            else if (item.value == null && ik?.comment) {
                comment = ik.comment;
            }
        }
        if (comment)
            reqNewline = true;
        let str = stringify$4.stringify(item, itemCtx, () => (comment = null));
        reqNewline || (reqNewline = lines.length > linesAtValue || str.includes('\n'));
        if (i < items.length - 1) {
            str += ',';
        }
        else if (ctx.options.trailingComma) {
            if (ctx.options.lineWidth > 0) {
                reqNewline || (reqNewline = lines.reduce((sum, line) => sum + line.length + 2, 2) +
                    (str.length + 2) >
                    ctx.options.lineWidth);
            }
            if (reqNewline) {
                str += ',';
            }
        }
        if (comment)
            str += stringifyComment$1.lineComment(str, itemIndent, commentString(comment));
        lines.push(str);
        linesAtValue = lines.length;
    }
    const { start, end } = flowChars;
    if (lines.length === 0) {
        return start + end;
    }
    else {
        if (!reqNewline) {
            const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
            reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
        }
        if (reqNewline) {
            let str = start;
            for (const line of lines)
                str += line ? `\n${indentStep}${indent}${line}` : '\n';
            return `${str}\n${indent}${end}`;
        }
        else {
            return `${start}${fcPadding}${lines.join(' ')}${fcPadding}${end}`;
        }
    }
}
function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
    if (comment && chompKeep)
        comment = comment.replace(/^\n+/, '');
    if (comment) {
        const ic = stringifyComment$1.indentComment(commentString(comment), indent);
        lines.push(ic.trimStart()); // Avoid double indent on first line
    }
}

stringifyCollection$3.stringifyCollection = stringifyCollection$2;

var stringifyCollection$1 = stringifyCollection$3;
var addPairToJSMap = addPairToJSMap$3;
var Collection$2 = Collection$4;
var identity$h = identity$x;
var Pair$6 = Pair$8;
var Scalar$e = Scalar$k;

function findPair(items, key) {
    const k = identity$h.isScalar(key) ? key.value : key;
    for (const it of items) {
        if (identity$h.isPair(it)) {
            if (it.key === key || it.key === k)
                return it;
            if (identity$h.isScalar(it.key) && it.key.value === k)
                return it;
        }
    }
    return undefined;
}
let YAMLMap$7 = class YAMLMap extends Collection$2.Collection {
    static get tagName() {
        return 'tag:yaml.org,2002:map';
    }
    constructor(schema) {
        super(identity$h.MAP, schema);
        this.items = [];
    }
    /**
     * A generic collection parsing method that can be extended
     * to other node classes that inherit from YAMLMap
     */
    static from(schema, obj, ctx) {
        const { keepUndefined, replacer } = ctx;
        const map = new this(schema);
        const add = (key, value) => {
            if (typeof replacer === 'function')
                value = replacer.call(obj, key, value);
            else if (Array.isArray(replacer) && !replacer.includes(key))
                return;
            if (value !== undefined || keepUndefined)
                map.items.push(Pair$6.createPair(key, value, ctx));
        };
        if (obj instanceof Map) {
            for (const [key, value] of obj)
                add(key, value);
        }
        else if (obj && typeof obj === 'object') {
            for (const key of Object.keys(obj))
                add(key, obj[key]);
        }
        if (typeof schema.sortMapEntries === 'function') {
            map.items.sort(schema.sortMapEntries);
        }
        return map;
    }
    /**
     * Adds a value to the collection.
     *
     * @param overwrite - If not set `true`, using a key that is already in the
     *   collection will throw. Otherwise, overwrites the previous value.
     */
    add(pair, overwrite) {
        let _pair;
        if (identity$h.isPair(pair))
            _pair = pair;
        else if (!pair || typeof pair !== 'object' || !('key' in pair)) {
            // In TypeScript, this never happens.
            _pair = new Pair$6.Pair(pair, pair?.value);
        }
        else
            _pair = new Pair$6.Pair(pair.key, pair.value);
        const prev = findPair(this.items, _pair.key);
        const sortEntries = this.schema?.sortMapEntries;
        if (prev) {
            if (!overwrite)
                throw new Error(`Key ${_pair.key} already set`);
            // For scalars, keep the old node & its comments and anchors
            if (identity$h.isScalar(prev.value) && Scalar$e.isScalarValue(_pair.value))
                prev.value.value = _pair.value;
            else
                prev.value = _pair.value;
        }
        else if (sortEntries) {
            const i = this.items.findIndex(item => sortEntries(_pair, item) < 0);
            if (i === -1)
                this.items.push(_pair);
            else
                this.items.splice(i, 0, _pair);
        }
        else {
            this.items.push(_pair);
        }
    }
    delete(key) {
        const it = findPair(this.items, key);
        if (!it)
            return false;
        const del = this.items.splice(this.items.indexOf(it), 1);
        return del.length > 0;
    }
    get(key, keepScalar) {
        const it = findPair(this.items, key);
        const node = it?.value;
        return (!keepScalar && identity$h.isScalar(node) ? node.value : node) ?? undefined;
    }
    has(key) {
        return !!findPair(this.items, key);
    }
    set(key, value) {
        this.add(new Pair$6.Pair(key, value), true);
    }
    /**
     * @param ctx - Conversion context, originally set in Document#toJS()
     * @param {Class} Type - If set, forces the returned collection type
     * @returns Instance of Type, Map, or Object
     */
    toJSON(_, ctx, Type) {
        const map = Type ? new Type() : ctx?.mapAsMap ? new Map() : {};
        if (ctx?.onCreate)
            ctx.onCreate(map);
        for (const item of this.items)
            addPairToJSMap.addPairToJSMap(ctx, map, item);
        return map;
    }
    toString(ctx, onComment, onChompKeep) {
        if (!ctx)
            return JSON.stringify(this);
        for (const item of this.items) {
            if (!identity$h.isPair(item))
                throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
        }
        if (!ctx.allNullValues && this.hasAllNullValues(false))
            ctx = Object.assign({}, ctx, { allNullValues: true });
        return stringifyCollection$1.stringifyCollection(this, ctx, {
            blockItemPrefix: '',
            flowChars: { start: '{', end: '}' },
            itemIndent: ctx.indent || '',
            onChompKeep,
            onComment
        });
    }
};

YAMLMap$8.YAMLMap = YAMLMap$7;
YAMLMap$8.findPair = findPair;

var identity$g = identity$x;
var YAMLMap$6 = YAMLMap$8;

const map$5 = {
    collection: 'map',
    default: true,
    nodeClass: YAMLMap$6.YAMLMap,
    tag: 'tag:yaml.org,2002:map',
    resolve(map, onError) {
        if (!identity$g.isMap(map))
            onError('Expected a mapping for this tag');
        return map;
    },
    createNode: (schema, obj, ctx) => YAMLMap$6.YAMLMap.from(schema, obj, ctx)
};

map$6.map = map$5;

var seq$6 = {};

var YAMLSeq$7 = {};

var createNode$1 = createNode$5;
var stringifyCollection = stringifyCollection$3;
var Collection$1 = Collection$4;
var identity$f = identity$x;
var Scalar$d = Scalar$k;
var toJS$2 = toJS$8;

let YAMLSeq$6 = class YAMLSeq extends Collection$1.Collection {
    static get tagName() {
        return 'tag:yaml.org,2002:seq';
    }
    constructor(schema) {
        super(identity$f.SEQ, schema);
        this.items = [];
    }
    add(value) {
        this.items.push(value);
    }
    /**
     * Removes a value from the collection.
     *
     * `key` must contain a representation of an integer for this to succeed.
     * It may be wrapped in a `Scalar`.
     *
     * @returns `true` if the item was found and removed.
     */
    delete(key) {
        const idx = asItemIndex(key);
        if (typeof idx !== 'number')
            return false;
        const del = this.items.splice(idx, 1);
        return del.length > 0;
    }
    get(key, keepScalar) {
        const idx = asItemIndex(key);
        if (typeof idx !== 'number')
            return undefined;
        const it = this.items[idx];
        return !keepScalar && identity$f.isScalar(it) ? it.value : it;
    }
    /**
     * Checks if the collection includes a value with the key `key`.
     *
     * `key` must contain a representation of an integer for this to succeed.
     * It may be wrapped in a `Scalar`.
     */
    has(key) {
        const idx = asItemIndex(key);
        return typeof idx === 'number' && idx < this.items.length;
    }
    /**
     * Sets a value in this collection. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     *
     * If `key` does not contain a representation of an integer, this will throw.
     * It may be wrapped in a `Scalar`.
     */
    set(key, value) {
        const idx = asItemIndex(key);
        if (typeof idx !== 'number')
            throw new Error(`Expected a valid index, not ${key}.`);
        const prev = this.items[idx];
        if (identity$f.isScalar(prev) && Scalar$d.isScalarValue(value))
            prev.value = value;
        else
            this.items[idx] = value;
    }
    toJSON(_, ctx) {
        const seq = [];
        if (ctx?.onCreate)
            ctx.onCreate(seq);
        let i = 0;
        for (const item of this.items)
            seq.push(toJS$2.toJS(item, String(i++), ctx));
        return seq;
    }
    toString(ctx, onComment, onChompKeep) {
        if (!ctx)
            return JSON.stringify(this);
        return stringifyCollection.stringifyCollection(this, ctx, {
            blockItemPrefix: '- ',
            flowChars: { start: '[', end: ']' },
            itemIndent: (ctx.indent || '') + '  ',
            onChompKeep,
            onComment
        });
    }
    static from(schema, obj, ctx) {
        const { replacer } = ctx;
        const seq = new this(schema);
        if (obj && Symbol.iterator in Object(obj)) {
            let i = 0;
            for (let it of obj) {
                if (typeof replacer === 'function') {
                    const key = obj instanceof Set ? it : String(i++);
                    it = replacer.call(obj, key, it);
                }
                seq.items.push(createNode$1.createNode(it, undefined, ctx));
            }
        }
        return seq;
    }
};
function asItemIndex(key) {
    let idx = identity$f.isScalar(key) ? key.value : key;
    if (idx && typeof idx === 'string')
        idx = Number(idx);
    return typeof idx === 'number' && Number.isInteger(idx) && idx >= 0
        ? idx
        : null;
}

YAMLSeq$7.YAMLSeq = YAMLSeq$6;

var identity$e = identity$x;
var YAMLSeq$5 = YAMLSeq$7;

const seq$5 = {
    collection: 'seq',
    default: true,
    nodeClass: YAMLSeq$5.YAMLSeq,
    tag: 'tag:yaml.org,2002:seq',
    resolve(seq, onError) {
        if (!identity$e.isSeq(seq))
            onError('Expected a sequence for this tag');
        return seq;
    },
    createNode: (schema, obj, ctx) => YAMLSeq$5.YAMLSeq.from(schema, obj, ctx)
};

seq$6.seq = seq$5;

var string$5 = {};

var stringifyString$2 = stringifyString$5;

const string$4 = {
    identify: value => typeof value === 'string',
    default: true,
    tag: 'tag:yaml.org,2002:str',
    resolve: str => str,
    stringify(item, ctx, onComment, onChompKeep) {
        ctx = Object.assign({ actualString: true }, ctx);
        return stringifyString$2.stringifyString(item, ctx, onComment, onChompKeep);
    }
};

string$5.string = string$4;

var tags$1 = {};

var _null$3 = {};

var Scalar$c = Scalar$k;

const nullTag = {
    identify: value => value == null,
    createNode: () => new Scalar$c.Scalar(null),
    default: true,
    tag: 'tag:yaml.org,2002:null',
    test: /^(?:~|[Nn]ull|NULL)?$/,
    resolve: () => new Scalar$c.Scalar(null),
    stringify: ({ source }, ctx) => typeof source === 'string' && nullTag.test.test(source)
        ? source
        : ctx.options.nullStr
};

_null$3.nullTag = nullTag;

var bool$4 = {};

var Scalar$b = Scalar$k;

const boolTag = {
    identify: value => typeof value === 'boolean',
    default: true,
    tag: 'tag:yaml.org,2002:bool',
    test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
    resolve: str => new Scalar$b.Scalar(str[0] === 't' || str[0] === 'T'),
    stringify({ source, value }, ctx) {
        if (source && boolTag.test.test(source)) {
            const sv = source[0] === 't' || source[0] === 'T';
            if (value === sv)
                return source;
        }
        return value ? ctx.options.trueStr : ctx.options.falseStr;
    }
};

bool$4.boolTag = boolTag;

var float$6 = {};

var stringifyNumber$6 = {};

function stringifyNumber$5({ format, minFractionDigits, tag, value }) {
    if (typeof value === 'bigint')
        return String(value);
    const num = typeof value === 'number' ? value : Number(value);
    if (!isFinite(num))
        return isNaN(num) ? '.nan' : num < 0 ? '-.inf' : '.inf';
    let n = Object.is(value, -0) ? '-0' : JSON.stringify(value);
    if (!format &&
        minFractionDigits &&
        (!tag || tag === 'tag:yaml.org,2002:float') &&
        /^-?\d/.test(n) &&
        !n.includes('e')) {
        let i = n.indexOf('.');
        if (i < 0) {
            i = n.length;
            n += '.';
        }
        let d = minFractionDigits - (n.length - i - 1);
        while (d-- > 0)
            n += '0';
    }
    return n;
}

stringifyNumber$6.stringifyNumber = stringifyNumber$5;

var Scalar$a = Scalar$k;
var stringifyNumber$4 = stringifyNumber$6;

const floatNaN$1 = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
    resolve: str => str.slice(-3).toLowerCase() === 'nan'
        ? NaN
        : str[0] === '-'
            ? Number.NEGATIVE_INFINITY
            : Number.POSITIVE_INFINITY,
    stringify: stringifyNumber$4.stringifyNumber
};
const floatExp$1 = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    format: 'EXP',
    test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
    resolve: str => parseFloat(str),
    stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber$4.stringifyNumber(node);
    }
};
const float$5 = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
    resolve(str) {
        const node = new Scalar$a.Scalar(parseFloat(str));
        const dot = str.indexOf('.');
        if (dot !== -1 && str[str.length - 1] === '0')
            node.minFractionDigits = str.length - dot - 1;
        return node;
    },
    stringify: stringifyNumber$4.stringifyNumber
};

float$6.float = float$5;
float$6.floatExp = floatExp$1;
float$6.floatNaN = floatNaN$1;

var int$6 = {};

var stringifyNumber$3 = stringifyNumber$6;

const intIdentify$2 = (value) => typeof value === 'bigint' || Number.isInteger(value);
const intResolve$1 = (str, offset, radix, { intAsBigInt }) => (intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix));
function intStringify$1(node, radix, prefix) {
    const { value } = node;
    if (intIdentify$2(value) && value >= 0)
        return prefix + value.toString(radix);
    return stringifyNumber$3.stringifyNumber(node);
}
const intOct$1 = {
    identify: value => intIdentify$2(value) && value >= 0,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    format: 'OCT',
    test: /^0o[0-7]+$/,
    resolve: (str, _onError, opt) => intResolve$1(str, 2, 8, opt),
    stringify: node => intStringify$1(node, 8, '0o')
};
const int$5 = {
    identify: intIdentify$2,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    test: /^[-+]?[0-9]+$/,
    resolve: (str, _onError, opt) => intResolve$1(str, 0, 10, opt),
    stringify: stringifyNumber$3.stringifyNumber
};
const intHex$1 = {
    identify: value => intIdentify$2(value) && value >= 0,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    format: 'HEX',
    test: /^0x[0-9a-fA-F]+$/,
    resolve: (str, _onError, opt) => intResolve$1(str, 2, 16, opt),
    stringify: node => intStringify$1(node, 16, '0x')
};

int$6.int = int$5;
int$6.intHex = intHex$1;
int$6.intOct = intOct$1;

var schema$8 = {};

var map$4 = map$6;
var _null$2 = _null$3;
var seq$4 = seq$6;
var string$3 = string$5;
var bool$3 = bool$4;
var float$4 = float$6;
var int$4 = int$6;

const schema$7 = [
    map$4.map,
    seq$4.seq,
    string$3.string,
    _null$2.nullTag,
    bool$3.boolTag,
    int$4.intOct,
    int$4.int,
    int$4.intHex,
    float$4.floatNaN,
    float$4.floatExp,
    float$4.float
];

schema$8.schema = schema$7;

var schema$6 = {};

var Scalar$9 = Scalar$k;
var map$3 = map$6;
var seq$3 = seq$6;

function intIdentify$1(value) {
    return typeof value === 'bigint' || Number.isInteger(value);
}
const stringifyJSON = ({ value }) => JSON.stringify(value);
const jsonScalars = [
    {
        identify: value => typeof value === 'string',
        default: true,
        tag: 'tag:yaml.org,2002:str',
        resolve: str => str,
        stringify: stringifyJSON
    },
    {
        identify: value => value == null,
        createNode: () => new Scalar$9.Scalar(null),
        default: true,
        tag: 'tag:yaml.org,2002:null',
        test: /^null$/,
        resolve: () => null,
        stringify: stringifyJSON
    },
    {
        identify: value => typeof value === 'boolean',
        default: true,
        tag: 'tag:yaml.org,2002:bool',
        test: /^true$|^false$/,
        resolve: str => str === 'true',
        stringify: stringifyJSON
    },
    {
        identify: intIdentify$1,
        default: true,
        tag: 'tag:yaml.org,2002:int',
        test: /^-?(?:0|[1-9][0-9]*)$/,
        resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
        stringify: ({ value }) => intIdentify$1(value) ? value.toString() : JSON.stringify(value)
    },
    {
        identify: value => typeof value === 'number',
        default: true,
        tag: 'tag:yaml.org,2002:float',
        test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
        resolve: str => parseFloat(str),
        stringify: stringifyJSON
    }
];
const jsonError = {
    default: true,
    tag: '',
    test: /^/,
    resolve(str, onError) {
        onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
        return str;
    }
};
const schema$5 = [map$3.map, seq$3.seq].concat(jsonScalars, jsonError);

schema$6.schema = schema$5;

var binary$3 = {};

const require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(require$$0$1$1);

var node_buffer = require$$0;
var Scalar$8 = Scalar$k;
var stringifyString$1 = stringifyString$5;

const binary$2 = {
    identify: value => value instanceof Uint8Array, // Buffer inherits from Uint8Array
    default: false,
    tag: 'tag:yaml.org,2002:binary',
    /**
     * Returns a Buffer in node and an Uint8Array in browsers
     *
     * To use the resulting buffer as an image, you'll want to do something like:
     *
     *   const blob = new Blob([buffer], { type: 'image/jpeg' })
     *   document.querySelector('#photo').src = URL.createObjectURL(blob)
     */
    resolve(src, onError) {
        if (typeof node_buffer.Buffer === 'function') {
            return node_buffer.Buffer.from(src, 'base64');
        }
        else if (typeof atob === 'function') {
            // On IE 11, atob() can't handle newlines
            const str = atob(src.replace(/[\n\r]/g, ''));
            const buffer = new Uint8Array(str.length);
            for (let i = 0; i < str.length; ++i)
                buffer[i] = str.charCodeAt(i);
            return buffer;
        }
        else {
            onError('This environment does not support reading binary tags; either Buffer or atob is required');
            return src;
        }
    },
    stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
        if (!value)
            return '';
        const buf = value; // checked earlier by binary.identify()
        let str;
        if (typeof node_buffer.Buffer === 'function') {
            str =
                buf instanceof node_buffer.Buffer
                    ? buf.toString('base64')
                    : node_buffer.Buffer.from(buf.buffer).toString('base64');
        }
        else if (typeof btoa === 'function') {
            let s = '';
            for (let i = 0; i < buf.length; ++i)
                s += String.fromCharCode(buf[i]);
            str = btoa(s);
        }
        else {
            throw new Error('This environment does not support writing binary tags; either Buffer or btoa is required');
        }
        type ?? (type = Scalar$8.Scalar.BLOCK_LITERAL);
        if (type !== Scalar$8.Scalar.QUOTE_DOUBLE) {
            const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
            const n = Math.ceil(str.length / lineWidth);
            const lines = new Array(n);
            for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
                lines[i] = str.substr(o, lineWidth);
            }
            str = lines.join(type === Scalar$8.Scalar.BLOCK_LITERAL ? '\n' : ' ');
        }
        return stringifyString$1.stringifyString({ comment, type, value: str }, ctx, onComment, onChompKeep);
    }
};

binary$3.binary = binary$2;

var omap$3 = {};

var pairs$4 = {};

var identity$d = identity$x;
var Pair$5 = Pair$8;
var Scalar$7 = Scalar$k;
var YAMLSeq$4 = YAMLSeq$7;

function resolvePairs(seq, onError) {
    if (identity$d.isSeq(seq)) {
        for (let i = 0; i < seq.items.length; ++i) {
            let item = seq.items[i];
            if (identity$d.isPair(item))
                continue;
            else if (identity$d.isMap(item)) {
                if (item.items.length > 1)
                    onError('Each pair must have its own sequence indicator');
                const pair = item.items[0] || new Pair$5.Pair(new Scalar$7.Scalar(null));
                if (item.commentBefore)
                    pair.key.commentBefore = pair.key.commentBefore
                        ? `${item.commentBefore}\n${pair.key.commentBefore}`
                        : item.commentBefore;
                if (item.comment) {
                    const cn = pair.value ?? pair.key;
                    cn.comment = cn.comment
                        ? `${item.comment}\n${cn.comment}`
                        : item.comment;
                }
                item = pair;
            }
            seq.items[i] = identity$d.isPair(item) ? item : new Pair$5.Pair(item);
        }
    }
    else
        onError('Expected a sequence for this tag');
    return seq;
}
function createPairs(schema, iterable, ctx) {
    const { replacer } = ctx;
    const pairs = new YAMLSeq$4.YAMLSeq(schema);
    pairs.tag = 'tag:yaml.org,2002:pairs';
    let i = 0;
    if (iterable && Symbol.iterator in Object(iterable))
        for (let it of iterable) {
            if (typeof replacer === 'function')
                it = replacer.call(iterable, String(i++), it);
            let key, value;
            if (Array.isArray(it)) {
                if (it.length === 2) {
                    key = it[0];
                    value = it[1];
                }
                else
                    throw new TypeError(`Expected [key, value] tuple: ${it}`);
            }
            else if (it && it instanceof Object) {
                const keys = Object.keys(it);
                if (keys.length === 1) {
                    key = keys[0];
                    value = it[key];
                }
                else {
                    throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
                }
            }
            else {
                key = it;
            }
            pairs.items.push(Pair$5.createPair(key, value, ctx));
        }
    return pairs;
}
const pairs$3 = {
    collection: 'seq',
    default: false,
    tag: 'tag:yaml.org,2002:pairs',
    resolve: resolvePairs,
    createNode: createPairs
};

pairs$4.createPairs = createPairs;
pairs$4.pairs = pairs$3;
pairs$4.resolvePairs = resolvePairs;

var identity$c = identity$x;
var toJS$1 = toJS$8;
var YAMLMap$5 = YAMLMap$8;
var YAMLSeq$3 = YAMLSeq$7;
var pairs$2 = pairs$4;

class YAMLOMap extends YAMLSeq$3.YAMLSeq {
    constructor() {
        super();
        this.add = YAMLMap$5.YAMLMap.prototype.add.bind(this);
        this.delete = YAMLMap$5.YAMLMap.prototype.delete.bind(this);
        this.get = YAMLMap$5.YAMLMap.prototype.get.bind(this);
        this.has = YAMLMap$5.YAMLMap.prototype.has.bind(this);
        this.set = YAMLMap$5.YAMLMap.prototype.set.bind(this);
        this.tag = YAMLOMap.tag;
    }
    /**
     * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
     * but TypeScript won't allow widening the signature of a child method.
     */
    toJSON(_, ctx) {
        if (!ctx)
            return super.toJSON(_);
        const map = new Map();
        if (ctx?.onCreate)
            ctx.onCreate(map);
        for (const pair of this.items) {
            let key, value;
            if (identity$c.isPair(pair)) {
                key = toJS$1.toJS(pair.key, '', ctx);
                value = toJS$1.toJS(pair.value, key, ctx);
            }
            else {
                key = toJS$1.toJS(pair, '', ctx);
            }
            if (map.has(key))
                throw new Error('Ordered maps must not include duplicate keys');
            map.set(key, value);
        }
        return map;
    }
    static from(schema, iterable, ctx) {
        const pairs$1 = pairs$2.createPairs(schema, iterable, ctx);
        const omap = new this();
        omap.items = pairs$1.items;
        return omap;
    }
}
YAMLOMap.tag = 'tag:yaml.org,2002:omap';
const omap$2 = {
    collection: 'seq',
    identify: value => value instanceof Map,
    nodeClass: YAMLOMap,
    default: false,
    tag: 'tag:yaml.org,2002:omap',
    resolve(seq, onError) {
        const pairs$1 = pairs$2.resolvePairs(seq, onError);
        const seenKeys = [];
        for (const { key } of pairs$1.items) {
            if (identity$c.isScalar(key)) {
                if (seenKeys.includes(key.value)) {
                    onError(`Ordered maps must not include duplicate keys: ${key.value}`);
                }
                else {
                    seenKeys.push(key.value);
                }
            }
        }
        return Object.assign(new YAMLOMap(), pairs$1);
    },
    createNode: (schema, iterable, ctx) => YAMLOMap.from(schema, iterable, ctx)
};

omap$3.YAMLOMap = YAMLOMap;
omap$3.omap = omap$2;

var schema$4 = {};

var bool$2 = {};

var Scalar$6 = Scalar$k;

function boolStringify({ value, source }, ctx) {
    const boolObj = value ? trueTag : falseTag;
    if (source && boolObj.test.test(source))
        return source;
    return value ? ctx.options.trueStr : ctx.options.falseStr;
}
const trueTag = {
    identify: value => value === true,
    default: true,
    tag: 'tag:yaml.org,2002:bool',
    test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
    resolve: () => new Scalar$6.Scalar(true),
    stringify: boolStringify
};
const falseTag = {
    identify: value => value === false,
    default: true,
    tag: 'tag:yaml.org,2002:bool',
    test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
    resolve: () => new Scalar$6.Scalar(false),
    stringify: boolStringify
};

bool$2.falseTag = falseTag;
bool$2.trueTag = trueTag;

var float$3 = {};

var Scalar$5 = Scalar$k;
var stringifyNumber$2 = stringifyNumber$6;

const floatNaN = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
    resolve: (str) => str.slice(-3).toLowerCase() === 'nan'
        ? NaN
        : str[0] === '-'
            ? Number.NEGATIVE_INFINITY
            : Number.POSITIVE_INFINITY,
    stringify: stringifyNumber$2.stringifyNumber
};
const floatExp = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    format: 'EXP',
    test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
    resolve: (str) => parseFloat(str.replace(/_/g, '')),
    stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber$2.stringifyNumber(node);
    }
};
const float$2 = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
    resolve(str) {
        const node = new Scalar$5.Scalar(parseFloat(str.replace(/_/g, '')));
        const dot = str.indexOf('.');
        if (dot !== -1) {
            const f = str.substring(dot + 1).replace(/_/g, '');
            if (f[f.length - 1] === '0')
                node.minFractionDigits = f.length;
        }
        return node;
    },
    stringify: stringifyNumber$2.stringifyNumber
};

float$3.float = float$2;
float$3.floatExp = floatExp;
float$3.floatNaN = floatNaN;

var int$3 = {};

var stringifyNumber$1 = stringifyNumber$6;

const intIdentify = (value) => typeof value === 'bigint' || Number.isInteger(value);
function intResolve(str, offset, radix, { intAsBigInt }) {
    const sign = str[0];
    if (sign === '-' || sign === '+')
        offset += 1;
    str = str.substring(offset).replace(/_/g, '');
    if (intAsBigInt) {
        switch (radix) {
            case 2:
                str = `0b${str}`;
                break;
            case 8:
                str = `0o${str}`;
                break;
            case 16:
                str = `0x${str}`;
                break;
        }
        const n = BigInt(str);
        return sign === '-' ? BigInt(-1) * n : n;
    }
    const n = parseInt(str, radix);
    return sign === '-' ? -1 * n : n;
}
function intStringify(node, radix, prefix) {
    const { value } = node;
    if (intIdentify(value)) {
        const str = value.toString(radix);
        return value < 0 ? '-' + prefix + str.substr(1) : prefix + str;
    }
    return stringifyNumber$1.stringifyNumber(node);
}
const intBin = {
    identify: intIdentify,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    format: 'BIN',
    test: /^[-+]?0b[0-1_]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 2, 2, opt),
    stringify: node => intStringify(node, 2, '0b')
};
const intOct = {
    identify: intIdentify,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    format: 'OCT',
    test: /^[-+]?0[0-7_]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 1, 8, opt),
    stringify: node => intStringify(node, 8, '0')
};
const int$2 = {
    identify: intIdentify,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    test: /^[-+]?[0-9][0-9_]*$/,
    resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
    stringify: stringifyNumber$1.stringifyNumber
};
const intHex = {
    identify: intIdentify,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    format: 'HEX',
    test: /^[-+]?0x[0-9a-fA-F_]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
    stringify: node => intStringify(node, 16, '0x')
};

int$3.int = int$2;
int$3.intBin = intBin;
int$3.intHex = intHex;
int$3.intOct = intOct;

var set$3 = {};

var identity$b = identity$x;
var Pair$4 = Pair$8;
var YAMLMap$4 = YAMLMap$8;

class YAMLSet extends YAMLMap$4.YAMLMap {
    constructor(schema) {
        super(schema);
        this.tag = YAMLSet.tag;
    }
    add(key) {
        let pair;
        if (identity$b.isPair(key))
            pair = key;
        else if (key &&
            typeof key === 'object' &&
            'key' in key &&
            'value' in key &&
            key.value === null)
            pair = new Pair$4.Pair(key.key, null);
        else
            pair = new Pair$4.Pair(key, null);
        const prev = YAMLMap$4.findPair(this.items, pair.key);
        if (!prev)
            this.items.push(pair);
    }
    /**
     * If `keepPair` is `true`, returns the Pair matching `key`.
     * Otherwise, returns the value of that Pair's key.
     */
    get(key, keepPair) {
        const pair = YAMLMap$4.findPair(this.items, key);
        return !keepPair && identity$b.isPair(pair)
            ? identity$b.isScalar(pair.key)
                ? pair.key.value
                : pair.key
            : pair;
    }
    set(key, value) {
        if (typeof value !== 'boolean')
            throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
        const prev = YAMLMap$4.findPair(this.items, key);
        if (prev && !value) {
            this.items.splice(this.items.indexOf(prev), 1);
        }
        else if (!prev && value) {
            this.items.push(new Pair$4.Pair(key));
        }
    }
    toJSON(_, ctx) {
        return super.toJSON(_, ctx, Set);
    }
    toString(ctx, onComment, onChompKeep) {
        if (!ctx)
            return JSON.stringify(this);
        if (this.hasAllNullValues(true))
            return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
        else
            throw new Error('Set items must all have null values');
    }
    static from(schema, iterable, ctx) {
        const { replacer } = ctx;
        const set = new this(schema);
        if (iterable && Symbol.iterator in Object(iterable))
            for (let value of iterable) {
                if (typeof replacer === 'function')
                    value = replacer.call(iterable, value, value);
                set.items.push(Pair$4.createPair(value, null, ctx));
            }
        return set;
    }
}
YAMLSet.tag = 'tag:yaml.org,2002:set';
const set$2 = {
    collection: 'map',
    identify: value => value instanceof Set,
    nodeClass: YAMLSet,
    default: false,
    tag: 'tag:yaml.org,2002:set',
    createNode: (schema, iterable, ctx) => YAMLSet.from(schema, iterable, ctx),
    resolve(map, onError) {
        if (identity$b.isMap(map)) {
            if (map.hasAllNullValues(true))
                return Object.assign(new YAMLSet(), map);
            else
                onError('Set items must all have null values');
        }
        else
            onError('Expected a mapping for this tag');
        return map;
    }
};

set$3.YAMLSet = YAMLSet;
set$3.set = set$2;

var timestamp$3 = {};

var stringifyNumber = stringifyNumber$6;

/** Internal types handle bigint as number, because TS can't figure it out. */
function parseSexagesimal(str, asBigInt) {
    const sign = str[0];
    const parts = sign === '-' || sign === '+' ? str.substring(1) : str;
    const num = (n) => asBigInt ? BigInt(n) : Number(n);
    const res = parts
        .replace(/_/g, '')
        .split(':')
        .reduce((res, p) => res * num(60) + num(p), num(0));
    return (sign === '-' ? num(-1) * res : res);
}
/**
 * hhhh:mm:ss.sss
 *
 * Internal types handle bigint as number, because TS can't figure it out.
 */
function stringifySexagesimal(node) {
    let { value } = node;
    let num = (n) => n;
    if (typeof value === 'bigint')
        num = n => BigInt(n);
    else if (isNaN(value) || !isFinite(value))
        return stringifyNumber.stringifyNumber(node);
    let sign = '';
    if (value < 0) {
        sign = '-';
        value *= num(-1);
    }
    const _60 = num(60);
    const parts = [value % _60]; // seconds, including ms
    if (value < 60) {
        parts.unshift(0); // at least one : is required
    }
    else {
        value = (value - parts[0]) / _60;
        parts.unshift(value % _60); // minutes
        if (value >= 60) {
            value = (value - parts[0]) / _60;
            parts.unshift(value); // hours
        }
    }
    return (sign +
        parts
            .map(n => String(n).padStart(2, '0'))
            .join(':')
            .replace(/000000\d*$/, '') // % 60 may introduce error
    );
}
const intTime = {
    identify: value => typeof value === 'bigint' || Number.isInteger(value),
    default: true,
    tag: 'tag:yaml.org,2002:int',
    format: 'TIME',
    test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
    resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
    stringify: stringifySexagesimal
};
const floatTime = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    format: 'TIME',
    test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
    resolve: str => parseSexagesimal(str, false),
    stringify: stringifySexagesimal
};
const timestamp$2 = {
    identify: value => value instanceof Date,
    default: true,
    tag: 'tag:yaml.org,2002:timestamp',
    // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
    // may be omitted altogether, resulting in a date format. In such a case, the time part is
    // assumed to be 00:00:00Z (start of day, UTC).
    test: RegExp('^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})' + // YYYY-Mm-Dd
        '(?:' + // time is optional
        '(?:t|T|[ \\t]+)' + // t | T | whitespace
        '([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)' + // Hh:Mm:Ss(.ss)?
        '(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?' + // Z | +5 | -03:30
        ')?$'),
    resolve(str) {
        const match = str.match(timestamp$2.test);
        if (!match)
            throw new Error('!!timestamp expects a date, starting with yyyy-mm-dd');
        const [, year, month, day, hour, minute, second] = match.map(Number);
        const millisec = match[7] ? Number((match[7] + '00').substr(1, 3)) : 0;
        let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
        const tz = match[8];
        if (tz && tz !== 'Z') {
            let d = parseSexagesimal(tz, false);
            if (Math.abs(d) < 30)
                d *= 60;
            date -= 60000 * d;
        }
        return new Date(date);
    },
    stringify: ({ value }) => value?.toISOString().replace(/(T00:00:00)?\.000Z$/, '') ?? ''
};

timestamp$3.floatTime = floatTime;
timestamp$3.intTime = intTime;
timestamp$3.timestamp = timestamp$2;

var map$2 = map$6;
var _null$1 = _null$3;
var seq$2 = seq$6;
var string$2 = string$5;
var binary$1 = binary$3;
var bool$1 = bool$2;
var float$1 = float$3;
var int$1 = int$3;
var merge$1 = merge$4;
var omap$1 = omap$3;
var pairs$1 = pairs$4;
var set$1 = set$3;
var timestamp$1 = timestamp$3;

const schema$3 = [
    map$2.map,
    seq$2.seq,
    string$2.string,
    _null$1.nullTag,
    bool$1.trueTag,
    bool$1.falseTag,
    int$1.intBin,
    int$1.intOct,
    int$1.int,
    int$1.intHex,
    float$1.floatNaN,
    float$1.floatExp,
    float$1.float,
    binary$1.binary,
    merge$1.merge,
    omap$1.omap,
    pairs$1.pairs,
    set$1.set,
    timestamp$1.intTime,
    timestamp$1.floatTime,
    timestamp$1.timestamp
];

schema$4.schema = schema$3;

var map$1 = map$6;
var _null = _null$3;
var seq$1 = seq$6;
var string$1 = string$5;
var bool = bool$4;
var float = float$6;
var int = int$6;
var schema = schema$8;
var schema$1 = schema$6;
var binary = binary$3;
var merge = merge$4;
var omap = omap$3;
var pairs = pairs$4;
var schema$2 = schema$4;
var set = set$3;
var timestamp = timestamp$3;

const schemas = new Map([
    ['core', schema.schema],
    ['failsafe', [map$1.map, seq$1.seq, string$1.string]],
    ['json', schema$1.schema],
    ['yaml11', schema$2.schema],
    ['yaml-1.1', schema$2.schema]
]);
const tagsByName = {
    binary: binary.binary,
    bool: bool.boolTag,
    float: float.float,
    floatExp: float.floatExp,
    floatNaN: float.floatNaN,
    floatTime: timestamp.floatTime,
    int: int.int,
    intHex: int.intHex,
    intOct: int.intOct,
    intTime: timestamp.intTime,
    map: map$1.map,
    merge: merge.merge,
    null: _null.nullTag,
    omap: omap.omap,
    pairs: pairs.pairs,
    seq: seq$1.seq,
    set: set.set,
    timestamp: timestamp.timestamp
};
const coreKnownTags = {
    'tag:yaml.org,2002:binary': binary.binary,
    'tag:yaml.org,2002:merge': merge.merge,
    'tag:yaml.org,2002:omap': omap.omap,
    'tag:yaml.org,2002:pairs': pairs.pairs,
    'tag:yaml.org,2002:set': set.set,
    'tag:yaml.org,2002:timestamp': timestamp.timestamp
};
function getTags(customTags, schemaName, addMergeTag) {
    const schemaTags = schemas.get(schemaName);
    if (schemaTags && !customTags) {
        return addMergeTag && !schemaTags.includes(merge.merge)
            ? schemaTags.concat(merge.merge)
            : schemaTags.slice();
    }
    let tags = schemaTags;
    if (!tags) {
        if (Array.isArray(customTags))
            tags = [];
        else {
            const keys = Array.from(schemas.keys())
                .filter(key => key !== 'yaml11')
                .map(key => JSON.stringify(key))
                .join(', ');
            throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
        }
    }
    if (Array.isArray(customTags)) {
        for (const tag of customTags)
            tags = tags.concat(tag);
    }
    else if (typeof customTags === 'function') {
        tags = customTags(tags.slice());
    }
    if (addMergeTag)
        tags = tags.concat(merge.merge);
    return tags.reduce((tags, tag) => {
        const tagObj = typeof tag === 'string' ? tagsByName[tag] : tag;
        if (!tagObj) {
            const tagName = JSON.stringify(tag);
            const keys = Object.keys(tagsByName)
                .map(key => JSON.stringify(key))
                .join(', ');
            throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`);
        }
        if (!tags.includes(tagObj))
            tags.push(tagObj);
        return tags;
    }, []);
}

tags$1.coreKnownTags = coreKnownTags;
tags$1.getTags = getTags;

var identity$a = identity$x;
var map = map$6;
var seq = seq$6;
var string = string$5;
var tags = tags$1;

const sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
let Schema$1 = class Schema {
    constructor({ compat, customTags, merge, resolveKnownTags, schema, sortMapEntries, toStringDefaults }) {
        this.compat = Array.isArray(compat)
            ? tags.getTags(compat, 'compat')
            : compat
                ? tags.getTags(null, compat)
                : null;
        this.name = (typeof schema === 'string' && schema) || 'core';
        this.knownTags = resolveKnownTags ? tags.coreKnownTags : {};
        this.tags = tags.getTags(customTags, this.name, merge);
        this.toStringOptions = toStringDefaults ?? null;
        Object.defineProperty(this, identity$a.MAP, { value: map.map });
        Object.defineProperty(this, identity$a.SCALAR, { value: string.string });
        Object.defineProperty(this, identity$a.SEQ, { value: seq.seq });
        // Used by createMap()
        this.sortMapEntries =
            typeof sortMapEntries === 'function'
                ? sortMapEntries
                : sortMapEntries === true
                    ? sortMapEntriesByKey
                    : null;
    }
    clone() {
        const copy = Object.create(Schema.prototype, Object.getOwnPropertyDescriptors(this));
        copy.tags = this.tags.slice();
        return copy;
    }
};

Schema$2.Schema = Schema$1;

var stringifyDocument$2 = {};

var identity$9 = identity$x;
var stringify$3 = stringify$8;
var stringifyComment = stringifyComment$5;

function stringifyDocument$1(doc, options) {
    const lines = [];
    let hasDirectives = options.directives === true;
    if (options.directives !== false && doc.directives) {
        const dir = doc.directives.toString(doc);
        if (dir) {
            lines.push(dir);
            hasDirectives = true;
        }
        else if (doc.directives.docStart)
            hasDirectives = true;
    }
    if (hasDirectives)
        lines.push('---');
    const ctx = stringify$3.createStringifyContext(doc, options);
    const { commentString } = ctx.options;
    if (doc.commentBefore) {
        if (lines.length !== 1)
            lines.unshift('');
        const cs = commentString(doc.commentBefore);
        lines.unshift(stringifyComment.indentComment(cs, ''));
    }
    let chompKeep = false;
    let contentComment = null;
    if (doc.contents) {
        if (identity$9.isNode(doc.contents)) {
            if (doc.contents.spaceBefore && hasDirectives)
                lines.push('');
            if (doc.contents.commentBefore) {
                const cs = commentString(doc.contents.commentBefore);
                lines.push(stringifyComment.indentComment(cs, ''));
            }
            // top-level block scalars need to be indented if followed by a comment
            ctx.forceBlockIndent = !!doc.comment;
            contentComment = doc.contents.comment;
        }
        const onChompKeep = contentComment ? undefined : () => (chompKeep = true);
        let body = stringify$3.stringify(doc.contents, ctx, () => (contentComment = null), onChompKeep);
        if (contentComment)
            body += stringifyComment.lineComment(body, '', commentString(contentComment));
        if ((body[0] === '|' || body[0] === '>') &&
            lines[lines.length - 1] === '---') {
            // Top-level block scalars with a preceding doc marker ought to use the
            // same line for their header.
            lines[lines.length - 1] = `--- ${body}`;
        }
        else
            lines.push(body);
    }
    else {
        lines.push(stringify$3.stringify(doc.contents, ctx));
    }
    if (doc.directives?.docEnd) {
        if (doc.comment) {
            const cs = commentString(doc.comment);
            if (cs.includes('\n')) {
                lines.push('...');
                lines.push(stringifyComment.indentComment(cs, ''));
            }
            else {
                lines.push(`... ${cs}`);
            }
        }
        else {
            lines.push('...');
        }
    }
    else {
        let dc = doc.comment;
        if (dc && chompKeep)
            dc = dc.replace(/^\n+/, '');
        if (dc) {
            if ((!chompKeep || contentComment) && lines[lines.length - 1] !== '')
                lines.push('');
            lines.push(stringifyComment.indentComment(commentString(dc), ''));
        }
    }
    return lines.join('\n') + '\n';
}

stringifyDocument$2.stringifyDocument = stringifyDocument$1;

var Alias$1 = Alias$4;
var Collection = Collection$4;
var identity$8 = identity$x;
var Pair$3 = Pair$8;
var toJS = toJS$8;
var Schema = Schema$2;
var stringifyDocument = stringifyDocument$2;
var anchors = anchors$3;
var applyReviver = applyReviver$3;
var createNode = createNode$5;
var directives$1 = directives$2;

let Document$3 = class Document {
    constructor(value, replacer, options) {
        /** A comment before this Document */
        this.commentBefore = null;
        /** A comment immediately after this Document */
        this.comment = null;
        /** Errors encountered during parsing. */
        this.errors = [];
        /** Warnings encountered during parsing. */
        this.warnings = [];
        Object.defineProperty(this, identity$8.NODE_TYPE, { value: identity$8.DOC });
        let _replacer = null;
        if (typeof replacer === 'function' || Array.isArray(replacer)) {
            _replacer = replacer;
        }
        else if (options === undefined && replacer) {
            options = replacer;
            replacer = undefined;
        }
        const opt = Object.assign({
            intAsBigInt: false,
            keepSourceTokens: false,
            logLevel: 'warn',
            prettyErrors: true,
            strict: true,
            stringKeys: false,
            uniqueKeys: true,
            version: '1.2'
        }, options);
        this.options = opt;
        let { version } = opt;
        if (options?._directives) {
            this.directives = options._directives.atDocument();
            if (this.directives.yaml.explicit)
                version = this.directives.yaml.version;
        }
        else
            this.directives = new directives$1.Directives({ version });
        this.setSchema(version, options);
        // @ts-expect-error We can't really know that this matches Contents.
        this.contents =
            value === undefined ? null : this.createNode(value, _replacer, options);
    }
    /**
     * Create a deep copy of this Document and its contents.
     *
     * Custom Node values that inherit from `Object` still refer to their original instances.
     */
    clone() {
        const copy = Object.create(Document.prototype, {
            [identity$8.NODE_TYPE]: { value: identity$8.DOC }
        });
        copy.commentBefore = this.commentBefore;
        copy.comment = this.comment;
        copy.errors = this.errors.slice();
        copy.warnings = this.warnings.slice();
        copy.options = Object.assign({}, this.options);
        if (this.directives)
            copy.directives = this.directives.clone();
        copy.schema = this.schema.clone();
        // @ts-expect-error We can't really know that this matches Contents.
        copy.contents = identity$8.isNode(this.contents)
            ? this.contents.clone(copy.schema)
            : this.contents;
        if (this.range)
            copy.range = this.range.slice();
        return copy;
    }
    /** Adds a value to the document. */
    add(value) {
        if (assertCollection(this.contents))
            this.contents.add(value);
    }
    /** Adds a value to the document. */
    addIn(path, value) {
        if (assertCollection(this.contents))
            this.contents.addIn(path, value);
    }
    /**
     * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
     *
     * If `node` already has an anchor, `name` is ignored.
     * Otherwise, the `node.anchor` value will be set to `name`,
     * or if an anchor with that name is already present in the document,
     * `name` will be used as a prefix for a new unique anchor.
     * If `name` is undefined, the generated anchor will use 'a' as a prefix.
     */
    createAlias(node, name) {
        if (!node.anchor) {
            const prev = anchors.anchorNames(this);
            node.anchor =
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                !name || prev.has(name) ? anchors.findNewAnchor(name || 'a', prev) : name;
        }
        return new Alias$1.Alias(node.anchor);
    }
    createNode(value, replacer, options) {
        let _replacer = undefined;
        if (typeof replacer === 'function') {
            value = replacer.call({ '': value }, '', value);
            _replacer = replacer;
        }
        else if (Array.isArray(replacer)) {
            const keyToStr = (v) => typeof v === 'number' || v instanceof String || v instanceof Number;
            const asStr = replacer.filter(keyToStr).map(String);
            if (asStr.length > 0)
                replacer = replacer.concat(asStr);
            _replacer = replacer;
        }
        else if (options === undefined && replacer) {
            options = replacer;
            replacer = undefined;
        }
        const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options ?? {};
        const { onAnchor, setAnchors, sourceObjects } = anchors.createNodeAnchors(this, 
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        anchorPrefix || 'a');
        const ctx = {
            aliasDuplicateObjects: aliasDuplicateObjects ?? true,
            keepUndefined: keepUndefined ?? false,
            onAnchor,
            onTagObj,
            replacer: _replacer,
            schema: this.schema,
            sourceObjects
        };
        const node = createNode.createNode(value, tag, ctx);
        if (flow && identity$8.isCollection(node))
            node.flow = true;
        setAnchors();
        return node;
    }
    /**
     * Convert a key and a value into a `Pair` using the current schema,
     * recursively wrapping all values as `Scalar` or `Collection` nodes.
     */
    createPair(key, value, options = {}) {
        const k = this.createNode(key, null, options);
        const v = this.createNode(value, null, options);
        return new Pair$3.Pair(k, v);
    }
    /**
     * Removes a value from the document.
     * @returns `true` if the item was found and removed.
     */
    delete(key) {
        return assertCollection(this.contents) ? this.contents.delete(key) : false;
    }
    /**
     * Removes a value from the document.
     * @returns `true` if the item was found and removed.
     */
    deleteIn(path) {
        if (Collection.isEmptyPath(path)) {
            if (this.contents == null)
                return false;
            // @ts-expect-error Presumed impossible if Strict extends false
            this.contents = null;
            return true;
        }
        return assertCollection(this.contents)
            ? this.contents.deleteIn(path)
            : false;
    }
    /**
     * Returns item at `key`, or `undefined` if not found. By default unwraps
     * scalar values from their surrounding node; to disable set `keepScalar` to
     * `true` (collections are always returned intact).
     */
    get(key, keepScalar) {
        return identity$8.isCollection(this.contents)
            ? this.contents.get(key, keepScalar)
            : undefined;
    }
    /**
     * Returns item at `path`, or `undefined` if not found. By default unwraps
     * scalar values from their surrounding node; to disable set `keepScalar` to
     * `true` (collections are always returned intact).
     */
    getIn(path, keepScalar) {
        if (Collection.isEmptyPath(path))
            return !keepScalar && identity$8.isScalar(this.contents)
                ? this.contents.value
                : this.contents;
        return identity$8.isCollection(this.contents)
            ? this.contents.getIn(path, keepScalar)
            : undefined;
    }
    /**
     * Checks if the document includes a value with the key `key`.
     */
    has(key) {
        return identity$8.isCollection(this.contents) ? this.contents.has(key) : false;
    }
    /**
     * Checks if the document includes a value at `path`.
     */
    hasIn(path) {
        if (Collection.isEmptyPath(path))
            return this.contents !== undefined;
        return identity$8.isCollection(this.contents) ? this.contents.hasIn(path) : false;
    }
    /**
     * Sets a value in this document. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     */
    set(key, value) {
        if (this.contents == null) {
            // @ts-expect-error We can't really know that this matches Contents.
            this.contents = Collection.collectionFromPath(this.schema, [key], value);
        }
        else if (assertCollection(this.contents)) {
            this.contents.set(key, value);
        }
    }
    /**
     * Sets a value in this document. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     */
    setIn(path, value) {
        if (Collection.isEmptyPath(path)) {
            // @ts-expect-error We can't really know that this matches Contents.
            this.contents = value;
        }
        else if (this.contents == null) {
            // @ts-expect-error We can't really know that this matches Contents.
            this.contents = Collection.collectionFromPath(this.schema, Array.from(path), value);
        }
        else if (assertCollection(this.contents)) {
            this.contents.setIn(path, value);
        }
    }
    /**
     * Change the YAML version and schema used by the document.
     * A `null` version disables support for directives, explicit tags, anchors, and aliases.
     * It also requires the `schema` option to be given as a `Schema` instance value.
     *
     * Overrides all previously set schema options.
     */
    setSchema(version, options = {}) {
        if (typeof version === 'number')
            version = String(version);
        let opt;
        switch (version) {
            case '1.1':
                if (this.directives)
                    this.directives.yaml.version = '1.1';
                else
                    this.directives = new directives$1.Directives({ version: '1.1' });
                opt = { resolveKnownTags: false, schema: 'yaml-1.1' };
                break;
            case '1.2':
            case 'next':
                if (this.directives)
                    this.directives.yaml.version = version;
                else
                    this.directives = new directives$1.Directives({ version });
                opt = { resolveKnownTags: true, schema: 'core' };
                break;
            case null:
                if (this.directives)
                    delete this.directives;
                opt = null;
                break;
            default: {
                const sv = JSON.stringify(version);
                throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
            }
        }
        // Not using `instanceof Schema` to allow for duck typing
        if (options.schema instanceof Object)
            this.schema = options.schema;
        else if (opt)
            this.schema = new Schema.Schema(Object.assign(opt, options));
        else
            throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
    }
    // json & jsonArg are only used from toJSON()
    toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        const ctx = {
            anchors: new Map(),
            doc: this,
            keep: !json,
            mapAsMap: mapAsMap === true,
            mapKeyWarned: false,
            maxAliasCount: typeof maxAliasCount === 'number' ? maxAliasCount : 100
        };
        const res = toJS.toJS(this.contents, jsonArg ?? '', ctx);
        if (typeof onAnchor === 'function')
            for (const { count, res } of ctx.anchors.values())
                onAnchor(res, count);
        return typeof reviver === 'function'
            ? applyReviver.applyReviver(reviver, { '': res }, '', res)
            : res;
    }
    /**
     * A JSON representation of the document `contents`.
     *
     * @param jsonArg Used by `JSON.stringify` to indicate the array index or
     *   property name.
     */
    toJSON(jsonArg, onAnchor) {
        return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
    }
    /** A YAML representation of the document. */
    toString(options = {}) {
        if (this.errors.length > 0)
            throw new Error('Document with errors cannot be stringified');
        if ('indent' in options &&
            (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
            const s = JSON.stringify(options.indent);
            throw new Error(`"indent" option must be a positive integer, not ${s}`);
        }
        return stringifyDocument.stringifyDocument(this, options);
    }
};
function assertCollection(contents) {
    if (identity$8.isCollection(contents))
        return true;
    throw new Error('Expected a YAML collection as document contents');
}

Document$4.Document = Document$3;

var errors$4 = {};

class YAMLError extends Error {
    constructor(name, pos, code, message) {
        super();
        this.name = name;
        this.code = code;
        this.message = message;
        this.pos = pos;
    }
}
class YAMLParseError extends YAMLError {
    constructor(pos, code, message) {
        super('YAMLParseError', pos, code, message);
    }
}
class YAMLWarning extends YAMLError {
    constructor(pos, code, message) {
        super('YAMLWarning', pos, code, message);
    }
}
const prettifyError = (src, lc) => (error) => {
    if (error.pos[0] === -1)
        return;
    error.linePos = error.pos.map(pos => lc.linePos(pos));
    const { line, col } = error.linePos[0];
    error.message += ` at line ${line}, column ${col}`;
    let ci = col - 1;
    let lineStr = src
        .substring(lc.lineStarts[line - 1], lc.lineStarts[line])
        .replace(/[\n\r]+$/, '');
    // Trim to max 80 chars, keeping col position near the middle
    if (ci >= 60 && lineStr.length > 80) {
        const trimStart = Math.min(ci - 39, lineStr.length - 79);
        lineStr = '…' + lineStr.substring(trimStart);
        ci -= trimStart - 1;
    }
    if (lineStr.length > 80)
        lineStr = lineStr.substring(0, 79) + '…';
    // Include previous line in context if pointing at line start
    if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
        // Regexp won't match if start is trimmed
        let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
        if (prev.length > 80)
            prev = prev.substring(0, 79) + '…\n';
        lineStr = prev + lineStr;
    }
    if (/[^ ]/.test(lineStr)) {
        let count = 1;
        const end = error.linePos[1];
        if (end?.line === line && end.col > col) {
            count = Math.max(1, Math.min(end.col - col, 80 - ci));
        }
        const pointer = ' '.repeat(ci) + '^'.repeat(count);
        error.message += `:\n\n${lineStr}\n${pointer}\n`;
    }
};

errors$4.YAMLError = YAMLError;
errors$4.YAMLParseError = YAMLParseError;
errors$4.YAMLWarning = YAMLWarning;
errors$4.prettifyError = prettifyError;

var composeDoc$2 = {};

var composeNode$2 = {};

var composeCollection$2 = {};

var resolveBlockMap$2 = {};

var resolveProps$5 = {};

function resolveProps$4(tokens, { flow, indicator, next, offset, onError, parentIndent, startOnNewline }) {
    let spaceBefore = false;
    let atNewline = startOnNewline;
    let hasSpace = startOnNewline;
    let comment = '';
    let commentSep = '';
    let hasNewline = false;
    let reqSpace = false;
    let tab = null;
    let anchor = null;
    let tag = null;
    let newlineAfterProp = null;
    let comma = null;
    let found = null;
    let start = null;
    for (const token of tokens) {
        if (reqSpace) {
            if (token.type !== 'space' &&
                token.type !== 'newline' &&
                token.type !== 'comma')
                onError(token.offset, 'MISSING_CHAR', 'Tags and anchors must be separated from the next token by white space');
            reqSpace = false;
        }
        if (tab) {
            if (atNewline && token.type !== 'comment' && token.type !== 'newline') {
                onError(tab, 'TAB_AS_INDENT', 'Tabs are not allowed as indentation');
            }
            tab = null;
        }
        switch (token.type) {
            case 'space':
                // At the doc level, tabs at line start may be parsed
                // as leading white space rather than indentation.
                // In a flow collection, only the parser handles indent.
                if (!flow &&
                    (indicator !== 'doc-start' || next?.type !== 'flow-collection') &&
                    token.source.includes('\t')) {
                    tab = token;
                }
                hasSpace = true;
                break;
            case 'comment': {
                if (!hasSpace)
                    onError(token, 'MISSING_CHAR', 'Comments must be separated from other tokens by white space characters');
                const cb = token.source.substring(1) || ' ';
                if (!comment)
                    comment = cb;
                else
                    comment += commentSep + cb;
                commentSep = '';
                atNewline = false;
                break;
            }
            case 'newline':
                if (atNewline) {
                    if (comment)
                        comment += token.source;
                    else if (!found || indicator !== 'seq-item-ind')
                        spaceBefore = true;
                }
                else
                    commentSep += token.source;
                atNewline = true;
                hasNewline = true;
                if (anchor || tag)
                    newlineAfterProp = token;
                hasSpace = true;
                break;
            case 'anchor':
                if (anchor)
                    onError(token, 'MULTIPLE_ANCHORS', 'A node can have at most one anchor');
                if (token.source.endsWith(':'))
                    onError(token.offset + token.source.length - 1, 'BAD_ALIAS', 'Anchor ending in : is ambiguous', true);
                anchor = token;
                start ?? (start = token.offset);
                atNewline = false;
                hasSpace = false;
                reqSpace = true;
                break;
            case 'tag': {
                if (tag)
                    onError(token, 'MULTIPLE_TAGS', 'A node can have at most one tag');
                tag = token;
                start ?? (start = token.offset);
                atNewline = false;
                hasSpace = false;
                reqSpace = true;
                break;
            }
            case indicator:
                // Could here handle preceding comments differently
                if (anchor || tag)
                    onError(token, 'BAD_PROP_ORDER', `Anchors and tags must be after the ${token.source} indicator`);
                if (found)
                    onError(token, 'UNEXPECTED_TOKEN', `Unexpected ${token.source} in ${flow ?? 'collection'}`);
                found = token;
                atNewline =
                    indicator === 'seq-item-ind' || indicator === 'explicit-key-ind';
                hasSpace = false;
                break;
            case 'comma':
                if (flow) {
                    if (comma)
                        onError(token, 'UNEXPECTED_TOKEN', `Unexpected , in ${flow}`);
                    comma = token;
                    atNewline = false;
                    hasSpace = false;
                    break;
                }
            // else fallthrough
            default:
                onError(token, 'UNEXPECTED_TOKEN', `Unexpected ${token.type} token`);
                atNewline = false;
                hasSpace = false;
        }
    }
    const last = tokens[tokens.length - 1];
    const end = last ? last.offset + last.source.length : offset;
    if (reqSpace &&
        next &&
        next.type !== 'space' &&
        next.type !== 'newline' &&
        next.type !== 'comma' &&
        (next.type !== 'scalar' || next.source !== '')) {
        onError(next.offset, 'MISSING_CHAR', 'Tags and anchors must be separated from the next token by white space');
    }
    if (tab &&
        ((atNewline && tab.indent <= parentIndent) ||
            next?.type === 'block-map' ||
            next?.type === 'block-seq'))
        onError(tab, 'TAB_AS_INDENT', 'Tabs are not allowed as indentation');
    return {
        comma,
        found,
        spaceBefore,
        comment,
        hasNewline,
        anchor,
        tag,
        newlineAfterProp,
        end,
        start: start ?? end
    };
}

resolveProps$5.resolveProps = resolveProps$4;

var utilContainsNewline$3 = {};

function containsNewline(key) {
    if (!key)
        return null;
    switch (key.type) {
        case 'alias':
        case 'scalar':
        case 'double-quoted-scalar':
        case 'single-quoted-scalar':
            if (key.source.includes('\n'))
                return true;
            if (key.end)
                for (const st of key.end)
                    if (st.type === 'newline')
                        return true;
            return false;
        case 'flow-collection':
            for (const it of key.items) {
                for (const st of it.start)
                    if (st.type === 'newline')
                        return true;
                if (it.sep)
                    for (const st of it.sep)
                        if (st.type === 'newline')
                            return true;
                if (containsNewline(it.key) || containsNewline(it.value))
                    return true;
            }
            return false;
        default:
            return true;
    }
}

utilContainsNewline$3.containsNewline = containsNewline;

var utilFlowIndentCheck$2 = {};

var utilContainsNewline$2 = utilContainsNewline$3;

function flowIndentCheck(indent, fc, onError) {
    if (fc?.type === 'flow-collection') {
        const end = fc.end[0];
        if (end.indent === indent &&
            (end.source === ']' || end.source === '}') &&
            utilContainsNewline$2.containsNewline(fc)) {
            const msg = 'Flow end indicator should be more indented than parent';
            onError(end, 'BAD_INDENT', msg, true);
        }
    }
}

utilFlowIndentCheck$2.flowIndentCheck = flowIndentCheck;

var utilMapIncludes$2 = {};

var identity$7 = identity$x;

function mapIncludes(ctx, items, search) {
    const { uniqueKeys } = ctx.options;
    if (uniqueKeys === false)
        return false;
    const isEqual = typeof uniqueKeys === 'function'
        ? uniqueKeys
        : (a, b) => a === b || (identity$7.isScalar(a) && identity$7.isScalar(b) && a.value === b.value);
    return items.some(pair => isEqual(pair.key, search));
}

utilMapIncludes$2.mapIncludes = mapIncludes;

var Pair$2 = Pair$8;
var YAMLMap$3 = YAMLMap$8;
var resolveProps$3 = resolveProps$5;
var utilContainsNewline$1 = utilContainsNewline$3;
var utilFlowIndentCheck$1 = utilFlowIndentCheck$2;
var utilMapIncludes$1 = utilMapIncludes$2;

const startColMsg = 'All mapping items must start at the same column';
function resolveBlockMap$1({ composeNode, composeEmptyNode }, ctx, bm, onError, tag) {
    const NodeClass = tag?.nodeClass ?? YAMLMap$3.YAMLMap;
    const map = new NodeClass(ctx.schema);
    if (ctx.atRoot)
        ctx.atRoot = false;
    let offset = bm.offset;
    let commentEnd = null;
    for (const collItem of bm.items) {
        const { start, key, sep, value } = collItem;
        // key properties
        const keyProps = resolveProps$3.resolveProps(start, {
            indicator: 'explicit-key-ind',
            next: key ?? sep?.[0],
            offset,
            onError,
            parentIndent: bm.indent,
            startOnNewline: true
        });
        const implicitKey = !keyProps.found;
        if (implicitKey) {
            if (key) {
                if (key.type === 'block-seq')
                    onError(offset, 'BLOCK_AS_IMPLICIT_KEY', 'A block sequence may not be used as an implicit map key');
                else if ('indent' in key && key.indent !== bm.indent)
                    onError(offset, 'BAD_INDENT', startColMsg);
            }
            if (!keyProps.anchor && !keyProps.tag && !sep) {
                commentEnd = keyProps.end;
                if (keyProps.comment) {
                    if (map.comment)
                        map.comment += '\n' + keyProps.comment;
                    else
                        map.comment = keyProps.comment;
                }
                continue;
            }
            if (keyProps.newlineAfterProp || utilContainsNewline$1.containsNewline(key)) {
                onError(key ?? start[start.length - 1], 'MULTILINE_IMPLICIT_KEY', 'Implicit keys need to be on a single line');
            }
        }
        else if (keyProps.found?.indent !== bm.indent) {
            onError(offset, 'BAD_INDENT', startColMsg);
        }
        // key value
        ctx.atKey = true;
        const keyStart = keyProps.end;
        const keyNode = key
            ? composeNode(ctx, key, keyProps, onError)
            : composeEmptyNode(ctx, keyStart, start, null, keyProps, onError);
        if (ctx.schema.compat)
            utilFlowIndentCheck$1.flowIndentCheck(bm.indent, key, onError);
        ctx.atKey = false;
        if (utilMapIncludes$1.mapIncludes(ctx, map.items, keyNode))
            onError(keyStart, 'DUPLICATE_KEY', 'Map keys must be unique');
        // value properties
        const valueProps = resolveProps$3.resolveProps(sep ?? [], {
            indicator: 'map-value-ind',
            next: value,
            offset: keyNode.range[2],
            onError,
            parentIndent: bm.indent,
            startOnNewline: !key || key.type === 'block-scalar'
        });
        offset = valueProps.end;
        if (valueProps.found) {
            if (implicitKey) {
                if (value?.type === 'block-map' && !valueProps.hasNewline)
                    onError(offset, 'BLOCK_AS_IMPLICIT_KEY', 'Nested mappings are not allowed in compact mappings');
                if (ctx.options.strict &&
                    keyProps.start < valueProps.found.offset - 1024)
                    onError(keyNode.range, 'KEY_OVER_1024_CHARS', 'The : indicator must be at most 1024 chars after the start of an implicit block mapping key');
            }
            // value value
            const valueNode = value
                ? composeNode(ctx, value, valueProps, onError)
                : composeEmptyNode(ctx, offset, sep, null, valueProps, onError);
            if (ctx.schema.compat)
                utilFlowIndentCheck$1.flowIndentCheck(bm.indent, value, onError);
            offset = valueNode.range[2];
            const pair = new Pair$2.Pair(keyNode, valueNode);
            if (ctx.options.keepSourceTokens)
                pair.srcToken = collItem;
            map.items.push(pair);
        }
        else {
            // key with no value
            if (implicitKey)
                onError(keyNode.range, 'MISSING_CHAR', 'Implicit map keys need to be followed by map values');
            if (valueProps.comment) {
                if (keyNode.comment)
                    keyNode.comment += '\n' + valueProps.comment;
                else
                    keyNode.comment = valueProps.comment;
            }
            const pair = new Pair$2.Pair(keyNode);
            if (ctx.options.keepSourceTokens)
                pair.srcToken = collItem;
            map.items.push(pair);
        }
    }
    if (commentEnd && commentEnd < offset)
        onError(commentEnd, 'IMPOSSIBLE', 'Map comment with trailing content');
    map.range = [bm.offset, offset, commentEnd ?? offset];
    return map;
}

resolveBlockMap$2.resolveBlockMap = resolveBlockMap$1;

var resolveBlockSeq$2 = {};

var YAMLSeq$2 = YAMLSeq$7;
var resolveProps$2 = resolveProps$5;
var utilFlowIndentCheck = utilFlowIndentCheck$2;

function resolveBlockSeq$1({ composeNode, composeEmptyNode }, ctx, bs, onError, tag) {
    const NodeClass = tag?.nodeClass ?? YAMLSeq$2.YAMLSeq;
    const seq = new NodeClass(ctx.schema);
    if (ctx.atRoot)
        ctx.atRoot = false;
    if (ctx.atKey)
        ctx.atKey = false;
    let offset = bs.offset;
    let commentEnd = null;
    for (const { start, value } of bs.items) {
        const props = resolveProps$2.resolveProps(start, {
            indicator: 'seq-item-ind',
            next: value,
            offset,
            onError,
            parentIndent: bs.indent,
            startOnNewline: true
        });
        if (!props.found) {
            if (props.anchor || props.tag || value) {
                if (value?.type === 'block-seq')
                    onError(props.end, 'BAD_INDENT', 'All sequence items must start at the same column');
                else
                    onError(offset, 'MISSING_CHAR', 'Sequence item without - indicator');
            }
            else {
                commentEnd = props.end;
                if (props.comment)
                    seq.comment = props.comment;
                continue;
            }
        }
        const node = value
            ? composeNode(ctx, value, props, onError)
            : composeEmptyNode(ctx, props.end, start, null, props, onError);
        if (ctx.schema.compat)
            utilFlowIndentCheck.flowIndentCheck(bs.indent, value, onError);
        offset = node.range[2];
        seq.items.push(node);
    }
    seq.range = [bs.offset, offset, commentEnd ?? offset];
    return seq;
}

resolveBlockSeq$2.resolveBlockSeq = resolveBlockSeq$1;

var resolveFlowCollection$2 = {};

var resolveEnd$6 = {};

function resolveEnd$5(end, offset, reqSpace, onError) {
    let comment = '';
    if (end) {
        let hasSpace = false;
        let sep = '';
        for (const token of end) {
            const { source, type } = token;
            switch (type) {
                case 'space':
                    hasSpace = true;
                    break;
                case 'comment': {
                    if (reqSpace && !hasSpace)
                        onError(token, 'MISSING_CHAR', 'Comments must be separated from other tokens by white space characters');
                    const cb = source.substring(1) || ' ';
                    if (!comment)
                        comment = cb;
                    else
                        comment += sep + cb;
                    sep = '';
                    break;
                }
                case 'newline':
                    if (comment)
                        sep += source;
                    hasSpace = true;
                    break;
                default:
                    onError(token, 'UNEXPECTED_TOKEN', `Unexpected ${type} at node end`);
            }
            offset += source.length;
        }
    }
    return { comment, offset };
}

resolveEnd$6.resolveEnd = resolveEnd$5;

var identity$6 = identity$x;
var Pair$1 = Pair$8;
var YAMLMap$2 = YAMLMap$8;
var YAMLSeq$1 = YAMLSeq$7;
var resolveEnd$4 = resolveEnd$6;
var resolveProps$1 = resolveProps$5;
var utilContainsNewline = utilContainsNewline$3;
var utilMapIncludes = utilMapIncludes$2;

const blockMsg = 'Block collections are not allowed within flow collections';
const isBlock = (token) => token && (token.type === 'block-map' || token.type === 'block-seq');
function resolveFlowCollection$1({ composeNode, composeEmptyNode }, ctx, fc, onError, tag) {
    const isMap = fc.start.source === '{';
    const fcName = isMap ? 'flow map' : 'flow sequence';
    const NodeClass = (tag?.nodeClass ?? (isMap ? YAMLMap$2.YAMLMap : YAMLSeq$1.YAMLSeq));
    const coll = new NodeClass(ctx.schema);
    coll.flow = true;
    const atRoot = ctx.atRoot;
    if (atRoot)
        ctx.atRoot = false;
    if (ctx.atKey)
        ctx.atKey = false;
    let offset = fc.offset + fc.start.source.length;
    for (let i = 0; i < fc.items.length; ++i) {
        const collItem = fc.items[i];
        const { start, key, sep, value } = collItem;
        const props = resolveProps$1.resolveProps(start, {
            flow: fcName,
            indicator: 'explicit-key-ind',
            next: key ?? sep?.[0],
            offset,
            onError,
            parentIndent: fc.indent,
            startOnNewline: false
        });
        if (!props.found) {
            if (!props.anchor && !props.tag && !sep && !value) {
                if (i === 0 && props.comma)
                    onError(props.comma, 'UNEXPECTED_TOKEN', `Unexpected , in ${fcName}`);
                else if (i < fc.items.length - 1)
                    onError(props.start, 'UNEXPECTED_TOKEN', `Unexpected empty item in ${fcName}`);
                if (props.comment) {
                    if (coll.comment)
                        coll.comment += '\n' + props.comment;
                    else
                        coll.comment = props.comment;
                }
                offset = props.end;
                continue;
            }
            if (!isMap && ctx.options.strict && utilContainsNewline.containsNewline(key))
                onError(key, // checked by containsNewline()
                'MULTILINE_IMPLICIT_KEY', 'Implicit keys of flow sequence pairs need to be on a single line');
        }
        if (i === 0) {
            if (props.comma)
                onError(props.comma, 'UNEXPECTED_TOKEN', `Unexpected , in ${fcName}`);
        }
        else {
            if (!props.comma)
                onError(props.start, 'MISSING_CHAR', `Missing , between ${fcName} items`);
            if (props.comment) {
                let prevItemComment = '';
                loop: for (const st of start) {
                    switch (st.type) {
                        case 'comma':
                        case 'space':
                            break;
                        case 'comment':
                            prevItemComment = st.source.substring(1);
                            break loop;
                        default:
                            break loop;
                    }
                }
                if (prevItemComment) {
                    let prev = coll.items[coll.items.length - 1];
                    if (identity$6.isPair(prev))
                        prev = prev.value ?? prev.key;
                    if (prev.comment)
                        prev.comment += '\n' + prevItemComment;
                    else
                        prev.comment = prevItemComment;
                    props.comment = props.comment.substring(prevItemComment.length + 1);
                }
            }
        }
        if (!isMap && !sep && !props.found) {
            // item is a value in a seq
            // → key & sep are empty, start does not include ? or :
            const valueNode = value
                ? composeNode(ctx, value, props, onError)
                : composeEmptyNode(ctx, props.end, sep, null, props, onError);
            coll.items.push(valueNode);
            offset = valueNode.range[2];
            if (isBlock(value))
                onError(valueNode.range, 'BLOCK_IN_FLOW', blockMsg);
        }
        else {
            // item is a key+value pair
            // key value
            ctx.atKey = true;
            const keyStart = props.end;
            const keyNode = key
                ? composeNode(ctx, key, props, onError)
                : composeEmptyNode(ctx, keyStart, start, null, props, onError);
            if (isBlock(key))
                onError(keyNode.range, 'BLOCK_IN_FLOW', blockMsg);
            ctx.atKey = false;
            // value properties
            const valueProps = resolveProps$1.resolveProps(sep ?? [], {
                flow: fcName,
                indicator: 'map-value-ind',
                next: value,
                offset: keyNode.range[2],
                onError,
                parentIndent: fc.indent,
                startOnNewline: false
            });
            if (valueProps.found) {
                if (!isMap && !props.found && ctx.options.strict) {
                    if (sep)
                        for (const st of sep) {
                            if (st === valueProps.found)
                                break;
                            if (st.type === 'newline') {
                                onError(st, 'MULTILINE_IMPLICIT_KEY', 'Implicit keys of flow sequence pairs need to be on a single line');
                                break;
                            }
                        }
                    if (props.start < valueProps.found.offset - 1024)
                        onError(valueProps.found, 'KEY_OVER_1024_CHARS', 'The : indicator must be at most 1024 chars after the start of an implicit flow sequence key');
                }
            }
            else if (value) {
                if ('source' in value && value.source?.[0] === ':')
                    onError(value, 'MISSING_CHAR', `Missing space after : in ${fcName}`);
                else
                    onError(valueProps.start, 'MISSING_CHAR', `Missing , or : between ${fcName} items`);
            }
            // value value
            const valueNode = value
                ? composeNode(ctx, value, valueProps, onError)
                : valueProps.found
                    ? composeEmptyNode(ctx, valueProps.end, sep, null, valueProps, onError)
                    : null;
            if (valueNode) {
                if (isBlock(value))
                    onError(valueNode.range, 'BLOCK_IN_FLOW', blockMsg);
            }
            else if (valueProps.comment) {
                if (keyNode.comment)
                    keyNode.comment += '\n' + valueProps.comment;
                else
                    keyNode.comment = valueProps.comment;
            }
            const pair = new Pair$1.Pair(keyNode, valueNode);
            if (ctx.options.keepSourceTokens)
                pair.srcToken = collItem;
            if (isMap) {
                const map = coll;
                if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
                    onError(keyStart, 'DUPLICATE_KEY', 'Map keys must be unique');
                map.items.push(pair);
            }
            else {
                const map = new YAMLMap$2.YAMLMap(ctx.schema);
                map.flow = true;
                map.items.push(pair);
                const endRange = (valueNode ?? keyNode).range;
                map.range = [keyNode.range[0], endRange[1], endRange[2]];
                coll.items.push(map);
            }
            offset = valueNode ? valueNode.range[2] : valueProps.end;
        }
    }
    const expectedEnd = isMap ? '}' : ']';
    const [ce, ...ee] = fc.end;
    let cePos = offset;
    if (ce?.source === expectedEnd)
        cePos = ce.offset + ce.source.length;
    else {
        const name = fcName[0].toUpperCase() + fcName.substring(1);
        const msg = atRoot
            ? `${name} must end with a ${expectedEnd}`
            : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
        onError(offset, atRoot ? 'MISSING_CHAR' : 'BAD_INDENT', msg);
        if (ce && ce.source.length !== 1)
            ee.unshift(ce);
    }
    if (ee.length > 0) {
        const end = resolveEnd$4.resolveEnd(ee, cePos, ctx.options.strict, onError);
        if (end.comment) {
            if (coll.comment)
                coll.comment += '\n' + end.comment;
            else
                coll.comment = end.comment;
        }
        coll.range = [fc.offset, cePos, end.offset];
    }
    else {
        coll.range = [fc.offset, cePos, cePos];
    }
    return coll;
}

resolveFlowCollection$2.resolveFlowCollection = resolveFlowCollection$1;

var identity$5 = identity$x;
var Scalar$4 = Scalar$k;
var YAMLMap$1 = YAMLMap$8;
var YAMLSeq = YAMLSeq$7;
var resolveBlockMap = resolveBlockMap$2;
var resolveBlockSeq = resolveBlockSeq$2;
var resolveFlowCollection = resolveFlowCollection$2;

function resolveCollection(CN, ctx, token, onError, tagName, tag) {
    const coll = token.type === 'block-map'
        ? resolveBlockMap.resolveBlockMap(CN, ctx, token, onError, tag)
        : token.type === 'block-seq'
            ? resolveBlockSeq.resolveBlockSeq(CN, ctx, token, onError, tag)
            : resolveFlowCollection.resolveFlowCollection(CN, ctx, token, onError, tag);
    const Coll = coll.constructor;
    // If we got a tagName matching the class, or the tag name is '!',
    // then use the tagName from the node class used to create it.
    if (tagName === '!' || tagName === Coll.tagName) {
        coll.tag = Coll.tagName;
        return coll;
    }
    if (tagName)
        coll.tag = tagName;
    return coll;
}
function composeCollection$1(CN, ctx, token, props, onError) {
    const tagToken = props.tag;
    const tagName = !tagToken
        ? null
        : ctx.directives.tagName(tagToken.source, msg => onError(tagToken, 'TAG_RESOLVE_FAILED', msg));
    if (token.type === 'block-seq') {
        const { anchor, newlineAfterProp: nl } = props;
        const lastProp = anchor && tagToken
            ? anchor.offset > tagToken.offset
                ? anchor
                : tagToken
            : (anchor ?? tagToken);
        if (lastProp && (!nl || nl.offset < lastProp.offset)) {
            const message = 'Missing newline after block sequence props';
            onError(lastProp, 'MISSING_CHAR', message);
        }
    }
    const expType = token.type === 'block-map'
        ? 'map'
        : token.type === 'block-seq'
            ? 'seq'
            : token.start.source === '{'
                ? 'map'
                : 'seq';
    // shortcut: check if it's a generic YAMLMap or YAMLSeq
    // before jumping into the custom tag logic.
    if (!tagToken ||
        !tagName ||
        tagName === '!' ||
        (tagName === YAMLMap$1.YAMLMap.tagName && expType === 'map') ||
        (tagName === YAMLSeq.YAMLSeq.tagName && expType === 'seq')) {
        return resolveCollection(CN, ctx, token, onError, tagName);
    }
    let tag = ctx.schema.tags.find(t => t.tag === tagName && t.collection === expType);
    if (!tag) {
        const kt = ctx.schema.knownTags[tagName];
        if (kt?.collection === expType) {
            ctx.schema.tags.push(Object.assign({}, kt, { default: false }));
            tag = kt;
        }
        else {
            if (kt) {
                onError(tagToken, 'BAD_COLLECTION_TYPE', `${kt.tag} used for ${expType} collection, but expects ${kt.collection ?? 'scalar'}`, true);
            }
            else {
                onError(tagToken, 'TAG_RESOLVE_FAILED', `Unresolved tag: ${tagName}`, true);
            }
            return resolveCollection(CN, ctx, token, onError, tagName);
        }
    }
    const coll = resolveCollection(CN, ctx, token, onError, tagName, tag);
    const res = tag.resolve?.(coll, msg => onError(tagToken, 'TAG_RESOLVE_FAILED', msg), ctx.options) ?? coll;
    const node = identity$5.isNode(res)
        ? res
        : new Scalar$4.Scalar(res);
    node.range = coll.range;
    node.tag = tagName;
    if (tag?.format)
        node.format = tag.format;
    return node;
}

composeCollection$2.composeCollection = composeCollection$1;

var composeScalar$2 = {};

var resolveBlockScalar$3 = {};

var Scalar$3 = Scalar$k;

function resolveBlockScalar$2(ctx, scalar, onError) {
    const start = scalar.offset;
    const header = parseBlockScalarHeader(scalar, ctx.options.strict, onError);
    if (!header)
        return { value: '', type: null, comment: '', range: [start, start, start] };
    const type = header.mode === '>' ? Scalar$3.Scalar.BLOCK_FOLDED : Scalar$3.Scalar.BLOCK_LITERAL;
    const lines = scalar.source ? splitLines(scalar.source) : [];
    // determine the end of content & start of chomping
    let chompStart = lines.length;
    for (let i = lines.length - 1; i >= 0; --i) {
        const content = lines[i][1];
        if (content === '' || content === '\r')
            chompStart = i;
        else
            break;
    }
    // shortcut for empty contents
    if (chompStart === 0) {
        const value = header.chomp === '+' && lines.length > 0
            ? '\n'.repeat(Math.max(1, lines.length - 1))
            : '';
        let end = start + header.length;
        if (scalar.source)
            end += scalar.source.length;
        return { value, type, comment: header.comment, range: [start, end, end] };
    }
    // find the indentation level to trim from start
    let trimIndent = scalar.indent + header.indent;
    let offset = scalar.offset + header.length;
    let contentStart = 0;
    for (let i = 0; i < chompStart; ++i) {
        const [indent, content] = lines[i];
        if (content === '' || content === '\r') {
            if (header.indent === 0 && indent.length > trimIndent)
                trimIndent = indent.length;
        }
        else {
            if (indent.length < trimIndent) {
                const message = 'Block scalars with more-indented leading empty lines must use an explicit indentation indicator';
                onError(offset + indent.length, 'MISSING_CHAR', message);
            }
            if (header.indent === 0)
                trimIndent = indent.length;
            contentStart = i;
            if (trimIndent === 0 && !ctx.atRoot) {
                const message = 'Block scalar values in collections must be indented';
                onError(offset, 'BAD_INDENT', message);
            }
            break;
        }
        offset += indent.length + content.length + 1;
    }
    // include trailing more-indented empty lines in content
    for (let i = lines.length - 1; i >= chompStart; --i) {
        if (lines[i][0].length > trimIndent)
            chompStart = i + 1;
    }
    let value = '';
    let sep = '';
    let prevMoreIndented = false;
    // leading whitespace is kept intact
    for (let i = 0; i < contentStart; ++i)
        value += lines[i][0].slice(trimIndent) + '\n';
    for (let i = contentStart; i < chompStart; ++i) {
        let [indent, content] = lines[i];
        offset += indent.length + content.length + 1;
        const crlf = content[content.length - 1] === '\r';
        if (crlf)
            content = content.slice(0, -1);
        /* istanbul ignore if already caught in lexer */
        if (content && indent.length < trimIndent) {
            const src = header.indent
                ? 'explicit indentation indicator'
                : 'first line';
            const message = `Block scalar lines must not be less indented than their ${src}`;
            onError(offset - content.length - (crlf ? 2 : 1), 'BAD_INDENT', message);
            indent = '';
        }
        if (type === Scalar$3.Scalar.BLOCK_LITERAL) {
            value += sep + indent.slice(trimIndent) + content;
            sep = '\n';
        }
        else if (indent.length > trimIndent || content[0] === '\t') {
            // more-indented content within a folded block
            if (sep === ' ')
                sep = '\n';
            else if (!prevMoreIndented && sep === '\n')
                sep = '\n\n';
            value += sep + indent.slice(trimIndent) + content;
            sep = '\n';
            prevMoreIndented = true;
        }
        else if (content === '') {
            // empty line
            if (sep === '\n')
                value += '\n';
            else
                sep = '\n';
        }
        else {
            value += sep + content;
            sep = ' ';
            prevMoreIndented = false;
        }
    }
    switch (header.chomp) {
        case '-':
            break;
        case '+':
            for (let i = chompStart; i < lines.length; ++i)
                value += '\n' + lines[i][0].slice(trimIndent);
            if (value[value.length - 1] !== '\n')
                value += '\n';
            break;
        default:
            value += '\n';
    }
    const end = start + header.length + scalar.source.length;
    return { value, type, comment: header.comment, range: [start, end, end] };
}
function parseBlockScalarHeader({ offset, props }, strict, onError) {
    /* istanbul ignore if should not happen */
    if (props[0].type !== 'block-scalar-header') {
        onError(props[0], 'IMPOSSIBLE', 'Block scalar header not found');
        return null;
    }
    const { source } = props[0];
    const mode = source[0];
    let indent = 0;
    let chomp = '';
    let error = -1;
    for (let i = 1; i < source.length; ++i) {
        const ch = source[i];
        if (!chomp && (ch === '-' || ch === '+'))
            chomp = ch;
        else {
            const n = Number(ch);
            if (!indent && n)
                indent = n;
            else if (error === -1)
                error = offset + i;
        }
    }
    if (error !== -1)
        onError(error, 'UNEXPECTED_TOKEN', `Block scalar header includes extra characters: ${source}`);
    let hasSpace = false;
    let comment = '';
    let length = source.length;
    for (let i = 1; i < props.length; ++i) {
        const token = props[i];
        switch (token.type) {
            case 'space':
                hasSpace = true;
            // fallthrough
            case 'newline':
                length += token.source.length;
                break;
            case 'comment':
                if (strict && !hasSpace) {
                    const message = 'Comments must be separated from other tokens by white space characters';
                    onError(token, 'MISSING_CHAR', message);
                }
                length += token.source.length;
                comment = token.source.substring(1);
                break;
            case 'error':
                onError(token, 'UNEXPECTED_TOKEN', token.message);
                length += token.source.length;
                break;
            /* istanbul ignore next should not happen */
            default: {
                const message = `Unexpected token in block scalar header: ${token.type}`;
                onError(token, 'UNEXPECTED_TOKEN', message);
                const ts = token.source;
                if (ts && typeof ts === 'string')
                    length += ts.length;
            }
        }
    }
    return { mode, indent, chomp, comment, length };
}
/** @returns Array of lines split up as `[indent, content]` */
function splitLines(source) {
    const split = source.split(/\n( *)/);
    const first = split[0];
    const m = first.match(/^( *)/);
    const line0 = m?.[1]
        ? [m[1], first.slice(m[1].length)]
        : ['', first];
    const lines = [line0];
    for (let i = 1; i < split.length; i += 2)
        lines.push([split[i], split[i + 1]]);
    return lines;
}

resolveBlockScalar$3.resolveBlockScalar = resolveBlockScalar$2;

var resolveFlowScalar$3 = {};

var Scalar$2 = Scalar$k;
var resolveEnd$3 = resolveEnd$6;

function resolveFlowScalar$2(scalar, strict, onError) {
    const { offset, type, source, end } = scalar;
    let _type;
    let value;
    const _onError = (rel, code, msg) => onError(offset + rel, code, msg);
    switch (type) {
        case 'scalar':
            _type = Scalar$2.Scalar.PLAIN;
            value = plainValue(source, _onError);
            break;
        case 'single-quoted-scalar':
            _type = Scalar$2.Scalar.QUOTE_SINGLE;
            value = singleQuotedValue(source, _onError);
            break;
        case 'double-quoted-scalar':
            _type = Scalar$2.Scalar.QUOTE_DOUBLE;
            value = doubleQuotedValue(source, _onError);
            break;
        /* istanbul ignore next should not happen */
        default:
            onError(scalar, 'UNEXPECTED_TOKEN', `Expected a flow scalar value, but found: ${type}`);
            return {
                value: '',
                type: null,
                comment: '',
                range: [offset, offset + source.length, offset + source.length]
            };
    }
    const valueEnd = offset + source.length;
    const re = resolveEnd$3.resolveEnd(end, valueEnd, strict, onError);
    return {
        value,
        type: _type,
        comment: re.comment,
        range: [offset, valueEnd, re.offset]
    };
}
function plainValue(source, onError) {
    let badChar = '';
    switch (source[0]) {
        /* istanbul ignore next should not happen */
        case '\t':
            badChar = 'a tab character';
            break;
        case ',':
            badChar = 'flow indicator character ,';
            break;
        case '%':
            badChar = 'directive indicator character %';
            break;
        case '|':
        case '>': {
            badChar = `block scalar indicator ${source[0]}`;
            break;
        }
        case '@':
        case '`': {
            badChar = `reserved character ${source[0]}`;
            break;
        }
    }
    if (badChar)
        onError(0, 'BAD_SCALAR_START', `Plain value cannot start with ${badChar}`);
    return unfoldLines(source);
}
function singleQuotedValue(source, onError) {
    if (source[source.length - 1] !== "'" || source.length === 1)
        onError(source.length, 'MISSING_CHAR', "Missing closing 'quote");
    return unfoldLines(source.slice(1, -1)).replace(/''/g, "'");
}
function unfoldLines(source) {
    const line = /(.*?)\r?\n/sy;
    let match = line.exec(source);
    if (!match)
        return source;
    /**
     * The negative lookbehinds in these RegExps are to
     * prevent causing a polynomial search time in certain cases.
     *
     * The try-catch is for Safari < 16.4 and other old browsers:
     * https://caniuse.com/js-regexp-lookbehind
     */
    let trimEnd, trimBoth;
    try {
        trimEnd = new RegExp('(?<![ \t])[ \t]+$');
        trimBoth = new RegExp('^[ \t]+|(?<![ \t])[ \t]+$', 'g');
    }
    catch {
        trimEnd = /[ \t]+$/;
        trimBoth = /^[ \t]+|[ \t]+$/g;
    }
    let res = match[1].replace(trimEnd, '');
    let sep = ' ';
    let pos = line.lastIndex;
    while ((match = line.exec(source))) {
        const lm = match[1].replace(trimBoth, '');
        if (lm === '') {
            if (sep === '\n')
                res += sep;
            else
                sep = '\n';
        }
        else {
            res += sep + lm;
            sep = ' ';
        }
        pos = line.lastIndex;
    }
    const last = /[ \t]*(.*)/sy;
    last.lastIndex = pos;
    match = last.exec(source);
    return res + sep + (match?.[1] ?? '');
}
function doubleQuotedValue(source, onError) {
    let res = '';
    for (let i = 1; i < source.length - 1; ++i) {
        const ch = source[i];
        if (ch === '\r' && source[i + 1] === '\n')
            continue;
        if (ch === '\n') {
            const { fold, offset } = foldNewline(source, i);
            res += fold;
            i = offset;
        }
        else if (ch === '\\') {
            let next = source[++i];
            const cc = escapeCodes[next];
            if (cc)
                res += cc;
            else if (next === '\n') {
                // skip escaped newlines, but still trim the following line
                next = source[i + 1];
                while (next === ' ' || next === '\t')
                    next = source[++i + 1];
            }
            else if (next === '\r' && source[i + 1] === '\n') {
                // skip escaped CRLF newlines, but still trim the following line
                next = source[++i + 1];
                while (next === ' ' || next === '\t')
                    next = source[++i + 1];
            }
            else if (next === 'x' || next === 'u' || next === 'U') {
                const length = next === 'x' ? 2 : next === 'u' ? 4 : 8;
                res += parseCharCode(source, i + 1, length, onError);
                i += length;
            }
            else {
                const raw = source.substr(i - 1, 2);
                onError(i - 1, 'BAD_DQ_ESCAPE', `Invalid escape sequence ${raw}`);
                res += raw;
            }
        }
        else if (ch === ' ' || ch === '\t') {
            // trim trailing whitespace
            const wsStart = i;
            let next = source[i + 1];
            while (next === ' ' || next === '\t')
                next = source[++i + 1];
            if (next !== '\n' && !(next === '\r' && source[i + 2] === '\n'))
                res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
        }
        else {
            res += ch;
        }
    }
    if (source[source.length - 1] !== '"' || source.length === 1)
        onError(source.length, 'MISSING_CHAR', 'Missing closing "quote');
    return res;
}
/**
 * Fold a single newline into a space, multiple newlines to N - 1 newlines.
 * Presumes `source[offset] === '\n'`
 */
function foldNewline(source, offset) {
    let fold = '';
    let ch = source[offset + 1];
    while (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') {
        if (ch === '\r' && source[offset + 2] !== '\n')
            break;
        if (ch === '\n')
            fold += '\n';
        offset += 1;
        ch = source[offset + 1];
    }
    if (!fold)
        fold = ' ';
    return { fold, offset };
}
const escapeCodes = {
    '0': '\0', // null character
    a: '\x07', // bell character
    b: '\b', // backspace
    e: '\x1b', // escape character
    f: '\f', // form feed
    n: '\n', // line feed
    r: '\r', // carriage return
    t: '\t', // horizontal tab
    v: '\v', // vertical tab
    N: '\u0085', // Unicode next line
    _: '\u00a0', // Unicode non-breaking space
    L: '\u2028', // Unicode line separator
    P: '\u2029', // Unicode paragraph separator
    ' ': ' ',
    '"': '"',
    '/': '/',
    '\\': '\\',
    '\t': '\t'
};
function parseCharCode(source, offset, length, onError) {
    const cc = source.substr(offset, length);
    const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
    const code = ok ? parseInt(cc, 16) : NaN;
    try {
        return String.fromCodePoint(code);
    }
    catch {
        const raw = source.substr(offset - 2, length + 2);
        onError(offset - 2, 'BAD_DQ_ESCAPE', `Invalid escape sequence ${raw}`);
        return raw;
    }
}

resolveFlowScalar$3.resolveFlowScalar = resolveFlowScalar$2;

var identity$4 = identity$x;
var Scalar$1 = Scalar$k;
var resolveBlockScalar$1 = resolveBlockScalar$3;
var resolveFlowScalar$1 = resolveFlowScalar$3;

function composeScalar$1(ctx, token, tagToken, onError) {
    const { value, type, comment, range } = token.type === 'block-scalar'
        ? resolveBlockScalar$1.resolveBlockScalar(ctx, token, onError)
        : resolveFlowScalar$1.resolveFlowScalar(token, ctx.options.strict, onError);
    const tagName = tagToken
        ? ctx.directives.tagName(tagToken.source, msg => onError(tagToken, 'TAG_RESOLVE_FAILED', msg))
        : null;
    let tag;
    if (ctx.options.stringKeys && ctx.atKey) {
        tag = ctx.schema[identity$4.SCALAR];
    }
    else if (tagName)
        tag = findScalarTagByName(ctx.schema, value, tagName, tagToken, onError);
    else if (token.type === 'scalar')
        tag = findScalarTagByTest(ctx, value, token, onError);
    else
        tag = ctx.schema[identity$4.SCALAR];
    let scalar;
    try {
        const res = tag.resolve(value, msg => onError(tagToken ?? token, 'TAG_RESOLVE_FAILED', msg), ctx.options);
        scalar = identity$4.isScalar(res) ? res : new Scalar$1.Scalar(res);
    }
    catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        onError(tagToken ?? token, 'TAG_RESOLVE_FAILED', msg);
        scalar = new Scalar$1.Scalar(value);
    }
    scalar.range = range;
    scalar.source = value;
    if (type)
        scalar.type = type;
    if (tagName)
        scalar.tag = tagName;
    if (tag.format)
        scalar.format = tag.format;
    if (comment)
        scalar.comment = comment;
    return scalar;
}
function findScalarTagByName(schema, value, tagName, tagToken, onError) {
    if (tagName === '!')
        return schema[identity$4.SCALAR]; // non-specific tag
    const matchWithTest = [];
    for (const tag of schema.tags) {
        if (!tag.collection && tag.tag === tagName) {
            if (tag.default && tag.test)
                matchWithTest.push(tag);
            else
                return tag;
        }
    }
    for (const tag of matchWithTest)
        if (tag.test?.test(value))
            return tag;
    const kt = schema.knownTags[tagName];
    if (kt && !kt.collection) {
        // Ensure that the known tag is available for stringifying,
        // but does not get used by default.
        schema.tags.push(Object.assign({}, kt, { default: false, test: undefined }));
        return kt;
    }
    onError(tagToken, 'TAG_RESOLVE_FAILED', `Unresolved tag: ${tagName}`, tagName !== 'tag:yaml.org,2002:str');
    return schema[identity$4.SCALAR];
}
function findScalarTagByTest({ atKey, directives, schema }, value, token, onError) {
    const tag = schema.tags.find(tag => (tag.default === true || (atKey && tag.default === 'key')) &&
        tag.test?.test(value)) || schema[identity$4.SCALAR];
    if (schema.compat) {
        const compat = schema.compat.find(tag => tag.default && tag.test?.test(value)) ??
            schema[identity$4.SCALAR];
        if (tag.tag !== compat.tag) {
            const ts = directives.tagString(tag.tag);
            const cs = directives.tagString(compat.tag);
            const msg = `Value may be parsed as either ${ts} or ${cs}`;
            onError(token, 'TAG_RESOLVE_FAILED', msg, true);
        }
    }
    return tag;
}

composeScalar$2.composeScalar = composeScalar$1;

var utilEmptyScalarPosition$1 = {};

function emptyScalarPosition(offset, before, pos) {
    if (before) {
        pos ?? (pos = before.length);
        for (let i = pos - 1; i >= 0; --i) {
            let st = before[i];
            switch (st.type) {
                case 'space':
                case 'comment':
                case 'newline':
                    offset -= st.source.length;
                    continue;
            }
            // Technically, an empty scalar is immediately after the last non-empty
            // node, but it's more useful to place it after any whitespace.
            st = before[++i];
            while (st?.type === 'space') {
                offset += st.source.length;
                st = before[++i];
            }
            break;
        }
    }
    return offset;
}

utilEmptyScalarPosition$1.emptyScalarPosition = emptyScalarPosition;

var Alias = Alias$4;
var identity$3 = identity$x;
var composeCollection = composeCollection$2;
var composeScalar = composeScalar$2;
var resolveEnd$2 = resolveEnd$6;
var utilEmptyScalarPosition = utilEmptyScalarPosition$1;

const CN = { composeNode: composeNode$1, composeEmptyNode };
function composeNode$1(ctx, token, props, onError) {
    const atKey = ctx.atKey;
    const { spaceBefore, comment, anchor, tag } = props;
    let node;
    let isSrcToken = true;
    switch (token.type) {
        case 'alias':
            node = composeAlias(ctx, token, onError);
            if (anchor || tag)
                onError(token, 'ALIAS_PROPS', 'An alias node must not specify any properties');
            break;
        case 'scalar':
        case 'single-quoted-scalar':
        case 'double-quoted-scalar':
        case 'block-scalar':
            node = composeScalar.composeScalar(ctx, token, tag, onError);
            if (anchor)
                node.anchor = anchor.source.substring(1);
            break;
        case 'block-map':
        case 'block-seq':
        case 'flow-collection':
            try {
                node = composeCollection.composeCollection(CN, ctx, token, props, onError);
                if (anchor)
                    node.anchor = anchor.source.substring(1);
            }
            catch (error) {
                // Almost certainly here due to a stack overflow
                const message = error instanceof Error ? error.message : String(error);
                onError(token, 'RESOURCE_EXHAUSTION', message);
            }
            break;
        default: {
            const message = token.type === 'error'
                ? token.message
                : `Unsupported token (type: ${token.type})`;
            onError(token, 'UNEXPECTED_TOKEN', message);
            isSrcToken = false;
        }
    }
    node ?? (node = composeEmptyNode(ctx, token.offset, undefined, null, props, onError));
    if (anchor && node.anchor === '')
        onError(anchor, 'BAD_ALIAS', 'Anchor cannot be an empty string');
    if (atKey &&
        ctx.options.stringKeys &&
        (!identity$3.isScalar(node) ||
            typeof node.value !== 'string' ||
            (node.tag && node.tag !== 'tag:yaml.org,2002:str'))) {
        const msg = 'With stringKeys, all keys must be strings';
        onError(tag ?? token, 'NON_STRING_KEY', msg);
    }
    if (spaceBefore)
        node.spaceBefore = true;
    if (comment) {
        if (token.type === 'scalar' && token.source === '')
            node.comment = comment;
        else
            node.commentBefore = comment;
    }
    // @ts-expect-error Type checking misses meaning of isSrcToken
    if (ctx.options.keepSourceTokens && isSrcToken)
        node.srcToken = token;
    return node;
}
function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag, end }, onError) {
    const token = {
        type: 'scalar',
        offset: utilEmptyScalarPosition.emptyScalarPosition(offset, before, pos),
        indent: -1,
        source: ''
    };
    const node = composeScalar.composeScalar(ctx, token, tag, onError);
    if (anchor) {
        node.anchor = anchor.source.substring(1);
        if (node.anchor === '')
            onError(anchor, 'BAD_ALIAS', 'Anchor cannot be an empty string');
    }
    if (spaceBefore)
        node.spaceBefore = true;
    if (comment) {
        node.comment = comment;
        node.range[2] = end;
    }
    return node;
}
function composeAlias({ options }, { offset, source, end }, onError) {
    const alias = new Alias.Alias(source.substring(1));
    if (alias.source === '')
        onError(offset, 'BAD_ALIAS', 'Alias cannot be an empty string');
    if (alias.source.endsWith(':'))
        onError(offset + source.length - 1, 'BAD_ALIAS', 'Alias ending in : is ambiguous', true);
    const valueEnd = offset + source.length;
    const re = resolveEnd$2.resolveEnd(end, valueEnd, options.strict, onError);
    alias.range = [offset, valueEnd, re.offset];
    if (re.comment)
        alias.comment = re.comment;
    return alias;
}

composeNode$2.composeEmptyNode = composeEmptyNode;
composeNode$2.composeNode = composeNode$1;

var Document$2 = Document$4;
var composeNode = composeNode$2;
var resolveEnd$1 = resolveEnd$6;
var resolveProps = resolveProps$5;

function composeDoc$1(options, directives, { offset, start, value, end }, onError) {
    const opts = Object.assign({ _directives: directives }, options);
    const doc = new Document$2.Document(undefined, opts);
    const ctx = {
        atKey: false,
        atRoot: true,
        directives: doc.directives,
        options: doc.options,
        schema: doc.schema
    };
    const props = resolveProps.resolveProps(start, {
        indicator: 'doc-start',
        next: value ?? end?.[0],
        offset,
        onError,
        parentIndent: 0,
        startOnNewline: true
    });
    if (props.found) {
        doc.directives.docStart = true;
        if (value &&
            (value.type === 'block-map' || value.type === 'block-seq') &&
            !props.hasNewline)
            onError(props.end, 'MISSING_CHAR', 'Block collection cannot start on same line with directives-end marker');
    }
    // @ts-expect-error If Contents is set, let's trust the user
    doc.contents = value
        ? composeNode.composeNode(ctx, value, props, onError)
        : composeNode.composeEmptyNode(ctx, props.end, start, null, props, onError);
    const contentEnd = doc.contents.range[2];
    const re = resolveEnd$1.resolveEnd(end, contentEnd, false, onError);
    if (re.comment)
        doc.comment = re.comment;
    doc.range = [offset, contentEnd, re.offset];
    return doc;
}

composeDoc$2.composeDoc = composeDoc$1;

var node_process$1 = require$$0$1;
var directives = directives$2;
var Document$1 = Document$4;
var errors$3 = errors$4;
var identity$2 = identity$x;
var composeDoc = composeDoc$2;
var resolveEnd = resolveEnd$6;

function getErrorPos(src) {
    if (typeof src === 'number')
        return [src, src + 1];
    if (Array.isArray(src))
        return src.length === 2 ? src : [src[0], src[1]];
    const { offset, source } = src;
    return [offset, offset + (typeof source === 'string' ? source.length : 1)];
}
function parsePrelude(prelude) {
    let comment = '';
    let atComment = false;
    let afterEmptyLine = false;
    for (let i = 0; i < prelude.length; ++i) {
        const source = prelude[i];
        switch (source[0]) {
            case '#':
                comment +=
                    (comment === '' ? '' : afterEmptyLine ? '\n\n' : '\n') +
                        (source.substring(1) || ' ');
                atComment = true;
                afterEmptyLine = false;
                break;
            case '%':
                if (prelude[i + 1]?.[0] !== '#')
                    i += 1;
                atComment = false;
                break;
            default:
                // This may be wrong after doc-end, but in that case it doesn't matter
                if (!atComment)
                    afterEmptyLine = true;
                atComment = false;
        }
    }
    return { comment, afterEmptyLine };
}
/**
 * Compose a stream of CST nodes into a stream of YAML Documents.
 *
 * ```ts
 * import { Composer, Parser } from 'yaml'
 *
 * const src: string = ...
 * const tokens = new Parser().parse(src)
 * const docs = new Composer().compose(tokens)
 * ```
 */
class Composer {
    constructor(options = {}) {
        this.doc = null;
        this.atDirectives = false;
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
        this.onError = (source, code, message, warning) => {
            const pos = getErrorPos(source);
            if (warning)
                this.warnings.push(new errors$3.YAMLWarning(pos, code, message));
            else
                this.errors.push(new errors$3.YAMLParseError(pos, code, message));
        };
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        this.directives = new directives.Directives({ version: options.version || '1.2' });
        this.options = options;
    }
    decorate(doc, afterDoc) {
        const { comment, afterEmptyLine } = parsePrelude(this.prelude);
        //console.log({ dc: doc.comment, prelude, comment })
        if (comment) {
            const dc = doc.contents;
            if (afterDoc) {
                doc.comment = doc.comment ? `${doc.comment}\n${comment}` : comment;
            }
            else if (afterEmptyLine || doc.directives.docStart || !dc) {
                doc.commentBefore = comment;
            }
            else if (identity$2.isCollection(dc) && !dc.flow && dc.items.length > 0) {
                let it = dc.items[0];
                if (identity$2.isPair(it))
                    it = it.key;
                const cb = it.commentBefore;
                it.commentBefore = cb ? `${comment}\n${cb}` : comment;
            }
            else {
                const cb = dc.commentBefore;
                dc.commentBefore = cb ? `${comment}\n${cb}` : comment;
            }
        }
        if (afterDoc) {
            for (let i = 0; i < this.errors.length; ++i)
                doc.errors.push(this.errors[i]);
            for (let i = 0; i < this.warnings.length; ++i)
                doc.warnings.push(this.warnings[i]);
        }
        else {
            doc.errors = this.errors;
            doc.warnings = this.warnings;
        }
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
    }
    /**
     * Current stream status information.
     *
     * Mostly useful at the end of input for an empty stream.
     */
    streamInfo() {
        return {
            comment: parsePrelude(this.prelude).comment,
            directives: this.directives,
            errors: this.errors,
            warnings: this.warnings
        };
    }
    /**
     * Compose tokens into documents.
     *
     * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
     * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
     */
    *compose(tokens, forceDoc = false, endOffset = -1) {
        for (const token of tokens)
            yield* this.next(token);
        yield* this.end(forceDoc, endOffset);
    }
    /** Advance the composer by one CST token. */
    *next(token) {
        if (node_process$1.env.LOG_STREAM)
            console.dir(token, { depth: null });
        switch (token.type) {
            case 'directive':
                this.directives.add(token.source, (offset, message, warning) => {
                    const pos = getErrorPos(token);
                    pos[0] += offset;
                    this.onError(pos, 'BAD_DIRECTIVE', message, warning);
                });
                this.prelude.push(token.source);
                this.atDirectives = true;
                break;
            case 'document': {
                const doc = composeDoc.composeDoc(this.options, this.directives, token, this.onError);
                if (this.atDirectives && !doc.directives.docStart)
                    this.onError(token, 'MISSING_CHAR', 'Missing directives-end/doc-start indicator line');
                this.decorate(doc, false);
                if (this.doc)
                    yield this.doc;
                this.doc = doc;
                this.atDirectives = false;
                break;
            }
            case 'byte-order-mark':
            case 'space':
                break;
            case 'comment':
            case 'newline':
                this.prelude.push(token.source);
                break;
            case 'error': {
                const msg = token.source
                    ? `${token.message}: ${JSON.stringify(token.source)}`
                    : token.message;
                const error = new errors$3.YAMLParseError(getErrorPos(token), 'UNEXPECTED_TOKEN', msg);
                if (this.atDirectives || !this.doc)
                    this.errors.push(error);
                else
                    this.doc.errors.push(error);
                break;
            }
            case 'doc-end': {
                if (!this.doc) {
                    const msg = 'Unexpected doc-end without preceding document';
                    this.errors.push(new errors$3.YAMLParseError(getErrorPos(token), 'UNEXPECTED_TOKEN', msg));
                    break;
                }
                this.doc.directives.docEnd = true;
                const end = resolveEnd.resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
                this.decorate(this.doc, true);
                if (end.comment) {
                    const dc = this.doc.comment;
                    this.doc.comment = dc ? `${dc}\n${end.comment}` : end.comment;
                }
                this.doc.range[2] = end.offset;
                break;
            }
            default:
                this.errors.push(new errors$3.YAMLParseError(getErrorPos(token), 'UNEXPECTED_TOKEN', `Unsupported token ${token.type}`));
        }
    }
    /**
     * Call at end of input to yield any remaining document.
     *
     * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
     * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
     */
    *end(forceDoc = false, endOffset = -1) {
        if (this.doc) {
            this.decorate(this.doc, true);
            yield this.doc;
            this.doc = null;
        }
        else if (forceDoc) {
            const opts = Object.assign({ _directives: this.directives }, this.options);
            const doc = new Document$1.Document(undefined, opts);
            if (this.atDirectives)
                this.onError(endOffset, 'MISSING_CHAR', 'Missing directives-end indicator line');
            doc.range = [0, endOffset, endOffset];
            this.decorate(doc, false);
            yield doc;
        }
    }
}

composer$1.Composer = Composer;

var cst$2 = {};

var cstScalar$1 = {};

var resolveBlockScalar = resolveBlockScalar$3;
var resolveFlowScalar = resolveFlowScalar$3;
var errors$2 = errors$4;
var stringifyString = stringifyString$5;

function resolveAsScalar(token, strict = true, onError) {
    if (token) {
        const _onError = (pos, code, message) => {
            const offset = typeof pos === 'number' ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
            if (onError)
                onError(offset, code, message);
            else
                throw new errors$2.YAMLParseError([offset, offset + 1], code, message);
        };
        switch (token.type) {
            case 'scalar':
            case 'single-quoted-scalar':
            case 'double-quoted-scalar':
                return resolveFlowScalar.resolveFlowScalar(token, strict, _onError);
            case 'block-scalar':
                return resolveBlockScalar.resolveBlockScalar({ options: { strict } }, token, _onError);
        }
    }
    return null;
}
/**
 * Create a new scalar token with `value`
 *
 * Values that represent an actual string but may be parsed as a different type should use a `type` other than `'PLAIN'`,
 * as this function does not support any schema operations and won't check for such conflicts.
 *
 * @param value The string representation of the value, which will have its content properly indented.
 * @param context.end Comments and whitespace after the end of the value, or after the block scalar header. If undefined, a newline will be added.
 * @param context.implicitKey Being within an implicit key may affect the resolved type of the token's value.
 * @param context.indent The indent level of the token.
 * @param context.inFlow Is this scalar within a flow collection? This may affect the resolved type of the token's value.
 * @param context.offset The offset position of the token.
 * @param context.type The preferred type of the scalar token. If undefined, the previous type of the `token` will be used, defaulting to `'PLAIN'`.
 */
function createScalarToken(value, context) {
    const { implicitKey = false, indent, inFlow = false, offset = -1, type = 'PLAIN' } = context;
    const source = stringifyString.stringifyString({ type, value }, {
        implicitKey,
        indent: indent > 0 ? ' '.repeat(indent) : '',
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
    });
    const end = context.end ?? [
        { type: 'newline', offset: -1, indent, source: '\n' }
    ];
    switch (source[0]) {
        case '|':
        case '>': {
            const he = source.indexOf('\n');
            const head = source.substring(0, he);
            const body = source.substring(he + 1) + '\n';
            const props = [
                { type: 'block-scalar-header', offset, indent, source: head }
            ];
            if (!addEndtoBlockProps(props, end))
                props.push({ type: 'newline', offset: -1, indent, source: '\n' });
            return { type: 'block-scalar', offset, indent, props, source: body };
        }
        case '"':
            return { type: 'double-quoted-scalar', offset, indent, source, end };
        case "'":
            return { type: 'single-quoted-scalar', offset, indent, source, end };
        default:
            return { type: 'scalar', offset, indent, source, end };
    }
}
/**
 * Set the value of `token` to the given string `value`, overwriting any previous contents and type that it may have.
 *
 * Best efforts are made to retain any comments previously associated with the `token`,
 * though all contents within a collection's `items` will be overwritten.
 *
 * Values that represent an actual string but may be parsed as a different type should use a `type` other than `'PLAIN'`,
 * as this function does not support any schema operations and won't check for such conflicts.
 *
 * @param token Any token. If it does not include an `indent` value, the value will be stringified as if it were an implicit key.
 * @param value The string representation of the value, which will have its content properly indented.
 * @param context.afterKey In most cases, values after a key should have an additional level of indentation.
 * @param context.implicitKey Being within an implicit key may affect the resolved type of the token's value.
 * @param context.inFlow Being within a flow collection may affect the resolved type of the token's value.
 * @param context.type The preferred type of the scalar token. If undefined, the previous type of the `token` will be used, defaulting to `'PLAIN'`.
 */
function setScalarValue(token, value, context = {}) {
    let { afterKey = false, implicitKey = false, inFlow = false, type } = context;
    let indent = 'indent' in token ? token.indent : null;
    if (afterKey && typeof indent === 'number')
        indent += 2;
    if (!type)
        switch (token.type) {
            case 'single-quoted-scalar':
                type = 'QUOTE_SINGLE';
                break;
            case 'double-quoted-scalar':
                type = 'QUOTE_DOUBLE';
                break;
            case 'block-scalar': {
                const header = token.props[0];
                if (header.type !== 'block-scalar-header')
                    throw new Error('Invalid block scalar header');
                type = header.source[0] === '>' ? 'BLOCK_FOLDED' : 'BLOCK_LITERAL';
                break;
            }
            default:
                type = 'PLAIN';
        }
    const source = stringifyString.stringifyString({ type, value }, {
        implicitKey: implicitKey || indent === null,
        indent: indent !== null && indent > 0 ? ' '.repeat(indent) : '',
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
    });
    switch (source[0]) {
        case '|':
        case '>':
            setBlockScalarValue(token, source);
            break;
        case '"':
            setFlowScalarValue(token, source, 'double-quoted-scalar');
            break;
        case "'":
            setFlowScalarValue(token, source, 'single-quoted-scalar');
            break;
        default:
            setFlowScalarValue(token, source, 'scalar');
    }
}
function setBlockScalarValue(token, source) {
    const he = source.indexOf('\n');
    const head = source.substring(0, he);
    const body = source.substring(he + 1) + '\n';
    if (token.type === 'block-scalar') {
        const header = token.props[0];
        if (header.type !== 'block-scalar-header')
            throw new Error('Invalid block scalar header');
        header.source = head;
        token.source = body;
    }
    else {
        const { offset } = token;
        const indent = 'indent' in token ? token.indent : -1;
        const props = [
            { type: 'block-scalar-header', offset, indent, source: head }
        ];
        if (!addEndtoBlockProps(props, 'end' in token ? token.end : undefined))
            props.push({ type: 'newline', offset: -1, indent, source: '\n' });
        for (const key of Object.keys(token))
            if (key !== 'type' && key !== 'offset')
                delete token[key];
        Object.assign(token, { type: 'block-scalar', indent, props, source: body });
    }
}
/** @returns `true` if last token is a newline */
function addEndtoBlockProps(props, end) {
    if (end)
        for (const st of end)
            switch (st.type) {
                case 'space':
                case 'comment':
                    props.push(st);
                    break;
                case 'newline':
                    props.push(st);
                    return true;
            }
    return false;
}
function setFlowScalarValue(token, source, type) {
    switch (token.type) {
        case 'scalar':
        case 'double-quoted-scalar':
        case 'single-quoted-scalar':
            token.type = type;
            token.source = source;
            break;
        case 'block-scalar': {
            const end = token.props.slice(1);
            let oa = source.length;
            if (token.props[0].type === 'block-scalar-header')
                oa -= token.props[0].source.length;
            for (const tok of end)
                tok.offset += oa;
            delete token.props;
            Object.assign(token, { type, source, end });
            break;
        }
        case 'block-map':
        case 'block-seq': {
            const offset = token.offset + source.length;
            const nl = { type: 'newline', offset, indent: token.indent, source: '\n' };
            delete token.items;
            Object.assign(token, { type, source, end: [nl] });
            break;
        }
        default: {
            const indent = 'indent' in token ? token.indent : -1;
            const end = 'end' in token && Array.isArray(token.end)
                ? token.end.filter(st => st.type === 'space' ||
                    st.type === 'comment' ||
                    st.type === 'newline')
                : [];
            for (const key of Object.keys(token))
                if (key !== 'type' && key !== 'offset')
                    delete token[key];
            Object.assign(token, { type, indent, source, end });
        }
    }
}

cstScalar$1.createScalarToken = createScalarToken;
cstScalar$1.resolveAsScalar = resolveAsScalar;
cstScalar$1.setScalarValue = setScalarValue;

var cstStringify$1 = {};

/**
 * Stringify a CST document, token, or collection item
 *
 * Fair warning: This applies no validation whatsoever, and
 * simply concatenates the sources in their logical order.
 */
const stringify$2 = (cst) => 'type' in cst ? stringifyToken(cst) : stringifyItem(cst);
function stringifyToken(token) {
    switch (token.type) {
        case 'block-scalar': {
            let res = '';
            for (const tok of token.props)
                res += stringifyToken(tok);
            return res + token.source;
        }
        case 'block-map':
        case 'block-seq': {
            let res = '';
            for (const item of token.items)
                res += stringifyItem(item);
            return res;
        }
        case 'flow-collection': {
            let res = token.start.source;
            for (const item of token.items)
                res += stringifyItem(item);
            for (const st of token.end)
                res += st.source;
            return res;
        }
        case 'document': {
            let res = stringifyItem(token);
            if (token.end)
                for (const st of token.end)
                    res += st.source;
            return res;
        }
        default: {
            let res = token.source;
            if ('end' in token && token.end)
                for (const st of token.end)
                    res += st.source;
            return res;
        }
    }
}
function stringifyItem({ start, key, sep, value }) {
    let res = '';
    for (const st of start)
        res += st.source;
    if (key)
        res += stringifyToken(key);
    if (sep)
        for (const st of sep)
            res += st.source;
    if (value)
        res += stringifyToken(value);
    return res;
}

cstStringify$1.stringify = stringify$2;

var cstVisit$1 = {};

const BREAK = Symbol('break visit');
const SKIP = Symbol('skip children');
const REMOVE = Symbol('remove item');
/**
 * Apply a visitor to a CST document or item.
 *
 * Walks through the tree (depth-first) starting from the root, calling a
 * `visitor` function with two arguments when entering each item:
 *   - `item`: The current item, which included the following members:
 *     - `start: SourceToken[]` – Source tokens before the key or value,
 *       possibly including its anchor or tag.
 *     - `key?: Token | null` – Set for pair values. May then be `null`, if
 *       the key before the `:` separator is empty.
 *     - `sep?: SourceToken[]` – Source tokens between the key and the value,
 *       which should include the `:` map value indicator if `value` is set.
 *     - `value?: Token` – The value of a sequence item, or of a map pair.
 *   - `path`: The steps from the root to the current node, as an array of
 *     `['key' | 'value', number]` tuples.
 *
 * The return value of the visitor may be used to control the traversal:
 *   - `undefined` (default): Do nothing and continue
 *   - `visit.SKIP`: Do not visit the children of this token, continue with
 *      next sibling
 *   - `visit.BREAK`: Terminate traversal completely
 *   - `visit.REMOVE`: Remove the current item, then continue with the next one
 *   - `number`: Set the index of the next step. This is useful especially if
 *     the index of the current token has changed.
 *   - `function`: Define the next visitor for this item. After the original
 *     visitor is called on item entry, next visitors are called after handling
 *     a non-empty `key` and when exiting the item.
 */
function visit$1(cst, visitor) {
    if ('type' in cst && cst.type === 'document')
        cst = { start: cst.start, value: cst.value };
    _visit(Object.freeze([]), cst, visitor);
}
// Without the `as symbol` casts, TS declares these in the `visit`
// namespace using `var`, but then complains about that because
// `unique symbol` must be `const`.
/** Terminate visit traversal completely */
visit$1.BREAK = BREAK;
/** Do not visit the children of the current item */
visit$1.SKIP = SKIP;
/** Remove the current item */
visit$1.REMOVE = REMOVE;
/** Find the item at `path` from `cst` as the root */
visit$1.itemAtPath = (cst, path) => {
    let item = cst;
    for (const [field, index] of path) {
        const tok = item?.[field];
        if (tok && 'items' in tok) {
            item = tok.items[index];
        }
        else
            return undefined;
    }
    return item;
};
/**
 * Get the immediate parent collection of the item at `path` from `cst` as the root.
 *
 * Throws an error if the collection is not found, which should never happen if the item itself exists.
 */
visit$1.parentCollection = (cst, path) => {
    const parent = visit$1.itemAtPath(cst, path.slice(0, -1));
    const field = path[path.length - 1][0];
    const coll = parent?.[field];
    if (coll && 'items' in coll)
        return coll;
    throw new Error('Parent collection not found');
};
function _visit(path, item, visitor) {
    let ctrl = visitor(item, path);
    if (typeof ctrl === 'symbol')
        return ctrl;
    for (const field of ['key', 'value']) {
        const token = item[field];
        if (token && 'items' in token) {
            for (let i = 0; i < token.items.length; ++i) {
                const ci = _visit(Object.freeze(path.concat([[field, i]])), token.items[i], visitor);
                if (typeof ci === 'number')
                    i = ci - 1;
                else if (ci === BREAK)
                    return BREAK;
                else if (ci === REMOVE) {
                    token.items.splice(i, 1);
                    i -= 1;
                }
            }
            if (typeof ctrl === 'function' && field === 'key')
                ctrl = ctrl(item, path);
        }
    }
    return typeof ctrl === 'function' ? ctrl(item, path) : ctrl;
}

cstVisit$1.visit = visit$1;

var cstScalar = cstScalar$1;
var cstStringify = cstStringify$1;
var cstVisit = cstVisit$1;

/** The byte order mark */
const BOM = '\u{FEFF}';
/** Start of doc-mode */
const DOCUMENT = '\x02'; // C0: Start of Text
/** Unexpected end of flow-mode */
const FLOW_END = '\x18'; // C0: Cancel
/** Next token is a scalar value */
const SCALAR = '\x1f'; // C0: Unit Separator
/** @returns `true` if `token` is a flow or block collection */
const isCollection = (token) => !!token && 'items' in token;
/** @returns `true` if `token` is a flow or block scalar; not an alias */
const isScalar$1 = (token) => !!token &&
    (token.type === 'scalar' ||
        token.type === 'single-quoted-scalar' ||
        token.type === 'double-quoted-scalar' ||
        token.type === 'block-scalar');
/* istanbul ignore next */
/** Get a printable representation of a lexer token */
function prettyToken(token) {
    switch (token) {
        case BOM:
            return '<BOM>';
        case DOCUMENT:
            return '<DOC>';
        case FLOW_END:
            return '<FLOW_END>';
        case SCALAR:
            return '<SCALAR>';
        default:
            return JSON.stringify(token);
    }
}
/** Identify the type of a lexer token. May return `null` for unknown tokens. */
function tokenType(source) {
    switch (source) {
        case BOM:
            return 'byte-order-mark';
        case DOCUMENT:
            return 'doc-mode';
        case FLOW_END:
            return 'flow-error-end';
        case SCALAR:
            return 'scalar';
        case '---':
            return 'doc-start';
        case '...':
            return 'doc-end';
        case '':
        case '\n':
        case '\r\n':
            return 'newline';
        case '-':
            return 'seq-item-ind';
        case '?':
            return 'explicit-key-ind';
        case ':':
            return 'map-value-ind';
        case '{':
            return 'flow-map-start';
        case '}':
            return 'flow-map-end';
        case '[':
            return 'flow-seq-start';
        case ']':
            return 'flow-seq-end';
        case ',':
            return 'comma';
    }
    switch (source[0]) {
        case ' ':
        case '\t':
            return 'space';
        case '#':
            return 'comment';
        case '%':
            return 'directive-line';
        case '*':
            return 'alias';
        case '&':
            return 'anchor';
        case '!':
            return 'tag';
        case "'":
            return 'single-quoted-scalar';
        case '"':
            return 'double-quoted-scalar';
        case '|':
        case '>':
            return 'block-scalar-header';
    }
    return null;
}

cst$2.createScalarToken = cstScalar.createScalarToken;
cst$2.resolveAsScalar = cstScalar.resolveAsScalar;
cst$2.setScalarValue = cstScalar.setScalarValue;
cst$2.stringify = cstStringify.stringify;
cst$2.visit = cstVisit.visit;
cst$2.BOM = BOM;
cst$2.DOCUMENT = DOCUMENT;
cst$2.FLOW_END = FLOW_END;
cst$2.SCALAR = SCALAR;
cst$2.isCollection = isCollection;
cst$2.isScalar = isScalar$1;
cst$2.prettyToken = prettyToken;
cst$2.tokenType = tokenType;

var lexer$1 = {};

var cst$1 = cst$2;

/*
START -> stream

stream
  directive -> line-end -> stream
  indent + line-end -> stream
  [else] -> line-start

line-end
  comment -> line-end
  newline -> .
  input-end -> END

line-start
  doc-start -> doc
  doc-end -> stream
  [else] -> indent -> block-start

block-start
  seq-item-start -> block-start
  explicit-key-start -> block-start
  map-value-start -> block-start
  [else] -> doc

doc
  line-end -> line-start
  spaces -> doc
  anchor -> doc
  tag -> doc
  flow-start -> flow -> doc
  flow-end -> error -> doc
  seq-item-start -> error -> doc
  explicit-key-start -> error -> doc
  map-value-start -> doc
  alias -> doc
  quote-start -> quoted-scalar -> doc
  block-scalar-header -> line-end -> block-scalar(min) -> line-start
  [else] -> plain-scalar(false, min) -> doc

flow
  line-end -> flow
  spaces -> flow
  anchor -> flow
  tag -> flow
  flow-start -> flow -> flow
  flow-end -> .
  seq-item-start -> error -> flow
  explicit-key-start -> flow
  map-value-start -> flow
  alias -> flow
  quote-start -> quoted-scalar -> flow
  comma -> flow
  [else] -> plain-scalar(true, 0) -> flow

quoted-scalar
  quote-end -> .
  [else] -> quoted-scalar

block-scalar(min)
  newline + peek(indent < min) -> .
  [else] -> block-scalar(min)

plain-scalar(is-flow, min)
  scalar-end(is-flow) -> .
  peek(newline + (indent < min)) -> .
  [else] -> plain-scalar(min)
*/
function isEmpty(ch) {
    switch (ch) {
        case undefined:
        case ' ':
        case '\n':
        case '\r':
        case '\t':
            return true;
        default:
            return false;
    }
}
const hexDigits = new Set('0123456789ABCDEFabcdef');
const tagChars = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()");
const flowIndicatorChars = new Set(',[]{}');
const invalidAnchorChars = new Set(' ,[]{}\n\r\t');
const isNotAnchorChar = (ch) => !ch || invalidAnchorChars.has(ch);
/**
 * Splits an input string into lexical tokens, i.e. smaller strings that are
 * easily identifiable by `tokens.tokenType()`.
 *
 * Lexing starts always in a "stream" context. Incomplete input may be buffered
 * until a complete token can be emitted.
 *
 * In addition to slices of the original input, the following control characters
 * may also be emitted:
 *
 * - `\x02` (Start of Text): A document starts with the next token
 * - `\x18` (Cancel): Unexpected end of flow-mode (indicates an error)
 * - `\x1f` (Unit Separator): Next token is a scalar value
 * - `\u{FEFF}` (Byte order mark): Emitted separately outside documents
 */
class Lexer {
    constructor() {
        /**
         * Flag indicating whether the end of the current buffer marks the end of
         * all input
         */
        this.atEnd = false;
        /**
         * Explicit indent set in block scalar header, as an offset from the current
         * minimum indent, so e.g. set to 1 from a header `|2+`. Set to -1 if not
         * explicitly set.
         */
        this.blockScalarIndent = -1;
        /**
         * Block scalars that include a + (keep) chomping indicator in their header
         * include trailing empty lines, which are otherwise excluded from the
         * scalar's contents.
         */
        this.blockScalarKeep = false;
        /** Current input */
        this.buffer = '';
        /**
         * Flag noting whether the map value indicator : can immediately follow this
         * node within a flow context.
         */
        this.flowKey = false;
        /** Count of surrounding flow collection levels. */
        this.flowLevel = 0;
        /**
         * Minimum level of indentation required for next lines to be parsed as a
         * part of the current scalar value.
         */
        this.indentNext = 0;
        /** Indentation level of the current line. */
        this.indentValue = 0;
        /** Position of the next \n character. */
        this.lineEndPos = null;
        /** Stores the state of the lexer if reaching the end of incpomplete input */
        this.next = null;
        /** A pointer to `buffer`; the current position of the lexer. */
        this.pos = 0;
    }
    /**
     * Generate YAML tokens from the `source` string. If `incomplete`,
     * a part of the last line may be left as a buffer for the next call.
     *
     * @returns A generator of lexical tokens
     */
    *lex(source, incomplete = false) {
        if (source) {
            if (typeof source !== 'string')
                throw TypeError('source is not a string');
            this.buffer = this.buffer ? this.buffer + source : source;
            this.lineEndPos = null;
        }
        this.atEnd = !incomplete;
        let next = this.next ?? 'stream';
        while (next && (incomplete || this.hasChars(1)))
            next = yield* this.parseNext(next);
    }
    atLineEnd() {
        let i = this.pos;
        let ch = this.buffer[i];
        while (ch === ' ' || ch === '\t')
            ch = this.buffer[++i];
        if (!ch || ch === '#' || ch === '\n')
            return true;
        if (ch === '\r')
            return this.buffer[i + 1] === '\n';
        return false;
    }
    charAt(n) {
        return this.buffer[this.pos + n];
    }
    continueScalar(offset) {
        let ch = this.buffer[offset];
        if (this.indentNext > 0) {
            let indent = 0;
            while (ch === ' ')
                ch = this.buffer[++indent + offset];
            if (ch === '\r') {
                const next = this.buffer[indent + offset + 1];
                if (next === '\n' || (!next && !this.atEnd))
                    return offset + indent + 1;
            }
            return ch === '\n' || indent >= this.indentNext || (!ch && !this.atEnd)
                ? offset + indent
                : -1;
        }
        if (ch === '-' || ch === '.') {
            const dt = this.buffer.substr(offset, 3);
            if ((dt === '---' || dt === '...') && isEmpty(this.buffer[offset + 3]))
                return -1;
        }
        return offset;
    }
    getLine() {
        let end = this.lineEndPos;
        if (typeof end !== 'number' || (end !== -1 && end < this.pos)) {
            end = this.buffer.indexOf('\n', this.pos);
            this.lineEndPos = end;
        }
        if (end === -1)
            return this.atEnd ? this.buffer.substring(this.pos) : null;
        if (this.buffer[end - 1] === '\r')
            end -= 1;
        return this.buffer.substring(this.pos, end);
    }
    hasChars(n) {
        return this.pos + n <= this.buffer.length;
    }
    setNext(state) {
        this.buffer = this.buffer.substring(this.pos);
        this.pos = 0;
        this.lineEndPos = null;
        this.next = state;
        return null;
    }
    peek(n) {
        return this.buffer.substr(this.pos, n);
    }
    *parseNext(next) {
        switch (next) {
            case 'stream':
                return yield* this.parseStream();
            case 'line-start':
                return yield* this.parseLineStart();
            case 'block-start':
                return yield* this.parseBlockStart();
            case 'doc':
                return yield* this.parseDocument();
            case 'flow':
                return yield* this.parseFlowCollection();
            case 'quoted-scalar':
                return yield* this.parseQuotedScalar();
            case 'block-scalar':
                return yield* this.parseBlockScalar();
            case 'plain-scalar':
                return yield* this.parsePlainScalar();
        }
    }
    *parseStream() {
        let line = this.getLine();
        if (line === null)
            return this.setNext('stream');
        if (line[0] === cst$1.BOM) {
            yield* this.pushCount(1);
            line = line.substring(1);
        }
        if (line[0] === '%') {
            let dirEnd = line.length;
            let cs = line.indexOf('#');
            while (cs !== -1) {
                const ch = line[cs - 1];
                if (ch === ' ' || ch === '\t') {
                    dirEnd = cs - 1;
                    break;
                }
                else {
                    cs = line.indexOf('#', cs + 1);
                }
            }
            while (true) {
                const ch = line[dirEnd - 1];
                if (ch === ' ' || ch === '\t')
                    dirEnd -= 1;
                else
                    break;
            }
            const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
            yield* this.pushCount(line.length - n); // possible comment
            this.pushNewline();
            return 'stream';
        }
        if (this.atLineEnd()) {
            const sp = yield* this.pushSpaces(true);
            yield* this.pushCount(line.length - sp);
            yield* this.pushNewline();
            return 'stream';
        }
        yield cst$1.DOCUMENT;
        return yield* this.parseLineStart();
    }
    *parseLineStart() {
        const ch = this.charAt(0);
        if (!ch && !this.atEnd)
            return this.setNext('line-start');
        if (ch === '-' || ch === '.') {
            if (!this.atEnd && !this.hasChars(4))
                return this.setNext('line-start');
            const s = this.peek(3);
            if ((s === '---' || s === '...') && isEmpty(this.charAt(3))) {
                yield* this.pushCount(3);
                this.indentValue = 0;
                this.indentNext = 0;
                return s === '---' ? 'doc' : 'stream';
            }
        }
        this.indentValue = yield* this.pushSpaces(false);
        if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
            this.indentNext = this.indentValue;
        return yield* this.parseBlockStart();
    }
    *parseBlockStart() {
        const [ch0, ch1] = this.peek(2);
        if (!ch1 && !this.atEnd)
            return this.setNext('block-start');
        if ((ch0 === '-' || ch0 === '?' || ch0 === ':') && isEmpty(ch1)) {
            const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
            this.indentNext = this.indentValue + 1;
            this.indentValue += n;
            return 'block-start';
        }
        return 'doc';
    }
    *parseDocument() {
        yield* this.pushSpaces(true);
        const line = this.getLine();
        if (line === null)
            return this.setNext('doc');
        let n = yield* this.pushIndicators();
        switch (line[n]) {
            case '#':
                yield* this.pushCount(line.length - n);
            // fallthrough
            case undefined:
                yield* this.pushNewline();
                return yield* this.parseLineStart();
            case '{':
            case '[':
                yield* this.pushCount(1);
                this.flowKey = false;
                this.flowLevel = 1;
                return 'flow';
            case '}':
            case ']':
                // this is an error
                yield* this.pushCount(1);
                return 'doc';
            case '*':
                yield* this.pushUntil(isNotAnchorChar);
                return 'doc';
            case '"':
            case "'":
                return yield* this.parseQuotedScalar();
            case '|':
            case '>':
                n += yield* this.parseBlockScalarHeader();
                n += yield* this.pushSpaces(true);
                yield* this.pushCount(line.length - n);
                yield* this.pushNewline();
                return yield* this.parseBlockScalar();
            default:
                return yield* this.parsePlainScalar();
        }
    }
    *parseFlowCollection() {
        let nl, sp;
        let indent = -1;
        do {
            nl = yield* this.pushNewline();
            if (nl > 0) {
                sp = yield* this.pushSpaces(false);
                this.indentValue = indent = sp;
            }
            else {
                sp = 0;
            }
            sp += yield* this.pushSpaces(true);
        } while (nl + sp > 0);
        const line = this.getLine();
        if (line === null)
            return this.setNext('flow');
        if ((indent !== -1 && indent < this.indentNext && line[0] !== '#') ||
            (indent === 0 &&
                (line.startsWith('---') || line.startsWith('...')) &&
                isEmpty(line[3]))) {
            // Allowing for the terminal ] or } at the same (rather than greater)
            // indent level as the initial [ or { is technically invalid, but
            // failing here would be surprising to users.
            const atFlowEndMarker = indent === this.indentNext - 1 &&
                this.flowLevel === 1 &&
                (line[0] === ']' || line[0] === '}');
            if (!atFlowEndMarker) {
                // this is an error
                this.flowLevel = 0;
                yield cst$1.FLOW_END;
                return yield* this.parseLineStart();
            }
        }
        let n = 0;
        while (line[n] === ',') {
            n += yield* this.pushCount(1);
            n += yield* this.pushSpaces(true);
            this.flowKey = false;
        }
        n += yield* this.pushIndicators();
        switch (line[n]) {
            case undefined:
                return 'flow';
            case '#':
                yield* this.pushCount(line.length - n);
                return 'flow';
            case '{':
            case '[':
                yield* this.pushCount(1);
                this.flowKey = false;
                this.flowLevel += 1;
                return 'flow';
            case '}':
            case ']':
                yield* this.pushCount(1);
                this.flowKey = true;
                this.flowLevel -= 1;
                return this.flowLevel ? 'flow' : 'doc';
            case '*':
                yield* this.pushUntil(isNotAnchorChar);
                return 'flow';
            case '"':
            case "'":
                this.flowKey = true;
                return yield* this.parseQuotedScalar();
            case ':': {
                const next = this.charAt(1);
                if (this.flowKey || isEmpty(next) || next === ',') {
                    this.flowKey = false;
                    yield* this.pushCount(1);
                    yield* this.pushSpaces(true);
                    return 'flow';
                }
            }
            // fallthrough
            default:
                this.flowKey = false;
                return yield* this.parsePlainScalar();
        }
    }
    *parseQuotedScalar() {
        const quote = this.charAt(0);
        let end = this.buffer.indexOf(quote, this.pos + 1);
        if (quote === "'") {
            while (end !== -1 && this.buffer[end + 1] === "'")
                end = this.buffer.indexOf("'", end + 2);
        }
        else {
            // double-quote
            while (end !== -1) {
                let n = 0;
                while (this.buffer[end - 1 - n] === '\\')
                    n += 1;
                if (n % 2 === 0)
                    break;
                end = this.buffer.indexOf('"', end + 1);
            }
        }
        // Only looking for newlines within the quotes
        const qb = this.buffer.substring(0, end);
        let nl = qb.indexOf('\n', this.pos);
        if (nl !== -1) {
            while (nl !== -1) {
                const cs = this.continueScalar(nl + 1);
                if (cs === -1)
                    break;
                nl = qb.indexOf('\n', cs);
            }
            if (nl !== -1) {
                // this is an error caused by an unexpected unindent
                end = nl - (qb[nl - 1] === '\r' ? 2 : 1);
            }
        }
        if (end === -1) {
            if (!this.atEnd)
                return this.setNext('quoted-scalar');
            end = this.buffer.length;
        }
        yield* this.pushToIndex(end + 1, false);
        return this.flowLevel ? 'flow' : 'doc';
    }
    *parseBlockScalarHeader() {
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        let i = this.pos;
        while (true) {
            const ch = this.buffer[++i];
            if (ch === '+')
                this.blockScalarKeep = true;
            else if (ch > '0' && ch <= '9')
                this.blockScalarIndent = Number(ch) - 1;
            else if (ch !== '-')
                break;
        }
        return yield* this.pushUntil(ch => isEmpty(ch) || ch === '#');
    }
    *parseBlockScalar() {
        let nl = this.pos - 1; // may be -1 if this.pos === 0
        let indent = 0;
        let ch;
        loop: for (let i = this.pos; (ch = this.buffer[i]); ++i) {
            switch (ch) {
                case ' ':
                    indent += 1;
                    break;
                case '\n':
                    nl = i;
                    indent = 0;
                    break;
                case '\r': {
                    const next = this.buffer[i + 1];
                    if (!next && !this.atEnd)
                        return this.setNext('block-scalar');
                    if (next === '\n')
                        break;
                } // fallthrough
                default:
                    break loop;
            }
        }
        if (!ch && !this.atEnd)
            return this.setNext('block-scalar');
        if (indent >= this.indentNext) {
            if (this.blockScalarIndent === -1)
                this.indentNext = indent;
            else {
                this.indentNext =
                    this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
            }
            do {
                const cs = this.continueScalar(nl + 1);
                if (cs === -1)
                    break;
                nl = this.buffer.indexOf('\n', cs);
            } while (nl !== -1);
            if (nl === -1) {
                if (!this.atEnd)
                    return this.setNext('block-scalar');
                nl = this.buffer.length;
            }
        }
        // Trailing insufficiently indented tabs are invalid.
        // To catch that during parsing, we include them in the block scalar value.
        let i = nl + 1;
        ch = this.buffer[i];
        while (ch === ' ')
            ch = this.buffer[++i];
        if (ch === '\t') {
            while (ch === '\t' || ch === ' ' || ch === '\r' || ch === '\n')
                ch = this.buffer[++i];
            nl = i - 1;
        }
        else if (!this.blockScalarKeep) {
            do {
                let i = nl - 1;
                let ch = this.buffer[i];
                if (ch === '\r')
                    ch = this.buffer[--i];
                const lastChar = i; // Drop the line if last char not more indented
                while (ch === ' ')
                    ch = this.buffer[--i];
                if (ch === '\n' && i >= this.pos && i + 1 + indent > lastChar)
                    nl = i;
                else
                    break;
            } while (true);
        }
        yield cst$1.SCALAR;
        yield* this.pushToIndex(nl + 1, true);
        return yield* this.parseLineStart();
    }
    *parsePlainScalar() {
        const inFlow = this.flowLevel > 0;
        let end = this.pos - 1;
        let i = this.pos - 1;
        let ch;
        while ((ch = this.buffer[++i])) {
            if (ch === ':') {
                const next = this.buffer[i + 1];
                if (isEmpty(next) || (inFlow && flowIndicatorChars.has(next)))
                    break;
                end = i;
            }
            else if (isEmpty(ch)) {
                let next = this.buffer[i + 1];
                if (ch === '\r') {
                    if (next === '\n') {
                        i += 1;
                        ch = '\n';
                        next = this.buffer[i + 1];
                    }
                    else
                        end = i;
                }
                if (next === '#' || (inFlow && flowIndicatorChars.has(next)))
                    break;
                if (ch === '\n') {
                    const cs = this.continueScalar(i + 1);
                    if (cs === -1)
                        break;
                    i = Math.max(i, cs - 2); // to advance, but still account for ' #'
                }
            }
            else {
                if (inFlow && flowIndicatorChars.has(ch))
                    break;
                end = i;
            }
        }
        if (!ch && !this.atEnd)
            return this.setNext('plain-scalar');
        yield cst$1.SCALAR;
        yield* this.pushToIndex(end + 1, true);
        return inFlow ? 'flow' : 'doc';
    }
    *pushCount(n) {
        if (n > 0) {
            yield this.buffer.substr(this.pos, n);
            this.pos += n;
            return n;
        }
        return 0;
    }
    *pushToIndex(i, allowEmpty) {
        const s = this.buffer.slice(this.pos, i);
        if (s) {
            yield s;
            this.pos += s.length;
            return s.length;
        }
        else if (allowEmpty)
            yield '';
        return 0;
    }
    *pushIndicators() {
        let n = 0;
        loop: while (true) {
            switch (this.charAt(0)) {
                case '!':
                    n += yield* this.pushTag();
                    n += yield* this.pushSpaces(true);
                    continue loop;
                case '&':
                    n += yield* this.pushUntil(isNotAnchorChar);
                    n += yield* this.pushSpaces(true);
                    continue loop;
                case '-': // this is an error
                case '?': // this is an error outside flow collections
                case ':': {
                    const inFlow = this.flowLevel > 0;
                    const ch1 = this.charAt(1);
                    if (isEmpty(ch1) || (inFlow && flowIndicatorChars.has(ch1))) {
                        if (!inFlow)
                            this.indentNext = this.indentValue + 1;
                        else if (this.flowKey)
                            this.flowKey = false;
                        n += yield* this.pushCount(1);
                        n += yield* this.pushSpaces(true);
                        continue loop;
                    }
                }
            }
            break loop;
        }
        return n;
    }
    *pushTag() {
        if (this.charAt(1) === '<') {
            let i = this.pos + 2;
            let ch = this.buffer[i];
            while (!isEmpty(ch) && ch !== '>')
                ch = this.buffer[++i];
            return yield* this.pushToIndex(ch === '>' ? i + 1 : i, false);
        }
        else {
            let i = this.pos + 1;
            let ch = this.buffer[i];
            while (ch) {
                if (tagChars.has(ch))
                    ch = this.buffer[++i];
                else if (ch === '%' &&
                    hexDigits.has(this.buffer[i + 1]) &&
                    hexDigits.has(this.buffer[i + 2])) {
                    ch = this.buffer[(i += 3)];
                }
                else
                    break;
            }
            return yield* this.pushToIndex(i, false);
        }
    }
    *pushNewline() {
        const ch = this.buffer[this.pos];
        if (ch === '\n')
            return yield* this.pushCount(1);
        else if (ch === '\r' && this.charAt(1) === '\n')
            return yield* this.pushCount(2);
        else
            return 0;
    }
    *pushSpaces(allowTabs) {
        let i = this.pos - 1;
        let ch;
        do {
            ch = this.buffer[++i];
        } while (ch === ' ' || (allowTabs && ch === '\t'));
        const n = i - this.pos;
        if (n > 0) {
            yield this.buffer.substr(this.pos, n);
            this.pos = i;
        }
        return n;
    }
    *pushUntil(test) {
        let i = this.pos;
        let ch = this.buffer[i];
        while (!test(ch))
            ch = this.buffer[++i];
        return yield* this.pushToIndex(i, false);
    }
}

lexer$1.Lexer = Lexer;

var lineCounter$1 = {};

/**
 * Tracks newlines during parsing in order to provide an efficient API for
 * determining the one-indexed `{ line, col }` position for any offset
 * within the input.
 */
class LineCounter {
    constructor() {
        this.lineStarts = [];
        /**
         * Should be called in ascending order. Otherwise, call
         * `lineCounter.lineStarts.sort()` before calling `linePos()`.
         */
        this.addNewLine = (offset) => this.lineStarts.push(offset);
        /**
         * Performs a binary search and returns the 1-indexed { line, col }
         * position of `offset`. If `line === 0`, `addNewLine` has never been
         * called or `offset` is before the first known newline.
         */
        this.linePos = (offset) => {
            let low = 0;
            let high = this.lineStarts.length;
            while (low < high) {
                const mid = (low + high) >> 1; // Math.floor((low + high) / 2)
                if (this.lineStarts[mid] < offset)
                    low = mid + 1;
                else
                    high = mid;
            }
            if (this.lineStarts[low] === offset)
                return { line: low + 1, col: 1 };
            if (low === 0)
                return { line: 0, col: offset };
            const start = this.lineStarts[low - 1];
            return { line: low, col: offset - start + 1 };
        };
    }
}

lineCounter$1.LineCounter = LineCounter;

var parser$1 = {};

var node_process = require$$0$1;
var cst = cst$2;
var lexer = lexer$1;

function includesToken(list, type) {
    for (let i = 0; i < list.length; ++i)
        if (list[i].type === type)
            return true;
    return false;
}
function findNonEmptyIndex(list) {
    for (let i = 0; i < list.length; ++i) {
        switch (list[i].type) {
            case 'space':
            case 'comment':
            case 'newline':
                break;
            default:
                return i;
        }
    }
    return -1;
}
function isFlowToken(token) {
    switch (token?.type) {
        case 'alias':
        case 'scalar':
        case 'single-quoted-scalar':
        case 'double-quoted-scalar':
        case 'flow-collection':
            return true;
        default:
            return false;
    }
}
function getPrevProps(parent) {
    switch (parent.type) {
        case 'document':
            return parent.start;
        case 'block-map': {
            const it = parent.items[parent.items.length - 1];
            return it.sep ?? it.start;
        }
        case 'block-seq':
            return parent.items[parent.items.length - 1].start;
        /* istanbul ignore next should not happen */
        default:
            return [];
    }
}
/** Note: May modify input array */
function getFirstKeyStartProps(prev) {
    if (prev.length === 0)
        return [];
    let i = prev.length;
    loop: while (--i >= 0) {
        switch (prev[i].type) {
            case 'doc-start':
            case 'explicit-key-ind':
            case 'map-value-ind':
            case 'seq-item-ind':
            case 'newline':
                break loop;
        }
    }
    while (prev[++i]?.type === 'space') {
        /* loop */
    }
    return prev.splice(i, prev.length);
}
function arrayPushArray(target, source) {
    // May exhaust call stack with large `source` array
    if (source.length < 1e5)
        Array.prototype.push.apply(target, source);
    else
        for (let i = 0; i < source.length; ++i)
            target.push(source[i]);
}
function fixFlowSeqItems(fc) {
    if (fc.start.type === 'flow-seq-start') {
        for (const it of fc.items) {
            if (it.sep &&
                !it.value &&
                !includesToken(it.start, 'explicit-key-ind') &&
                !includesToken(it.sep, 'map-value-ind')) {
                if (it.key)
                    it.value = it.key;
                delete it.key;
                if (isFlowToken(it.value)) {
                    if (it.value.end)
                        arrayPushArray(it.value.end, it.sep);
                    else
                        it.value.end = it.sep;
                }
                else
                    arrayPushArray(it.start, it.sep);
                delete it.sep;
            }
        }
    }
}
/**
 * A YAML concrete syntax tree (CST) parser
 *
 * ```ts
 * const src: string = ...
 * for (const token of new Parser().parse(src)) {
 *   // token: Token
 * }
 * ```
 *
 * To use the parser with a user-provided lexer:
 *
 * ```ts
 * function* parse(source: string, lexer: Lexer) {
 *   const parser = new Parser()
 *   for (const lexeme of lexer.lex(source))
 *     yield* parser.next(lexeme)
 *   yield* parser.end()
 * }
 *
 * const src: string = ...
 * const lexer = new Lexer()
 * for (const token of parse(src, lexer)) {
 *   // token: Token
 * }
 * ```
 */
class Parser {
    /**
     * @param onNewLine - If defined, called separately with the start position of
     *   each new line (in `parse()`, including the start of input).
     */
    constructor(onNewLine) {
        /** If true, space and sequence indicators count as indentation */
        this.atNewLine = true;
        /** If true, next token is a scalar value */
        this.atScalar = false;
        /** Current indentation level */
        this.indent = 0;
        /** Current offset since the start of parsing */
        this.offset = 0;
        /** On the same line with a block map key */
        this.onKeyLine = false;
        /** Top indicates the node that's currently being built */
        this.stack = [];
        /** The source of the current token, set in parse() */
        this.source = '';
        /** The type of the current token, set in parse() */
        this.type = '';
        // Must be defined after `next()`
        this.lexer = new lexer.Lexer();
        this.onNewLine = onNewLine;
    }
    /**
     * Parse `source` as a YAML stream.
     * If `incomplete`, a part of the last line may be left as a buffer for the next call.
     *
     * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
     *
     * @returns A generator of tokens representing each directive, document, and other structure.
     */
    *parse(source, incomplete = false) {
        if (this.onNewLine && this.offset === 0)
            this.onNewLine(0);
        for (const lexeme of this.lexer.lex(source, incomplete))
            yield* this.next(lexeme);
        if (!incomplete)
            yield* this.end();
    }
    /**
     * Advance the parser by the `source` of one lexical token.
     */
    *next(source) {
        this.source = source;
        if (node_process.env.LOG_TOKENS)
            console.log('|', cst.prettyToken(source));
        if (this.atScalar) {
            this.atScalar = false;
            yield* this.step();
            this.offset += source.length;
            return;
        }
        const type = cst.tokenType(source);
        if (!type) {
            const message = `Not a YAML token: ${source}`;
            yield* this.pop({ type: 'error', offset: this.offset, message, source });
            this.offset += source.length;
        }
        else if (type === 'scalar') {
            this.atNewLine = false;
            this.atScalar = true;
            this.type = 'scalar';
        }
        else {
            this.type = type;
            yield* this.step();
            switch (type) {
                case 'newline':
                    this.atNewLine = true;
                    this.indent = 0;
                    if (this.onNewLine)
                        this.onNewLine(this.offset + source.length);
                    break;
                case 'space':
                    if (this.atNewLine && source[0] === ' ')
                        this.indent += source.length;
                    break;
                case 'explicit-key-ind':
                case 'map-value-ind':
                case 'seq-item-ind':
                    if (this.atNewLine)
                        this.indent += source.length;
                    break;
                case 'doc-mode':
                case 'flow-error-end':
                    return;
                default:
                    this.atNewLine = false;
            }
            this.offset += source.length;
        }
    }
    /** Call at end of input to push out any remaining constructions */
    *end() {
        while (this.stack.length > 0)
            yield* this.pop();
    }
    get sourceToken() {
        const st = {
            type: this.type,
            offset: this.offset,
            indent: this.indent,
            source: this.source
        };
        return st;
    }
    *step() {
        const top = this.peek(1);
        if (this.type === 'doc-end' && top?.type !== 'doc-end') {
            while (this.stack.length > 0)
                yield* this.pop();
            this.stack.push({
                type: 'doc-end',
                offset: this.offset,
                source: this.source
            });
            return;
        }
        if (!top)
            return yield* this.stream();
        switch (top.type) {
            case 'document':
                return yield* this.document(top);
            case 'alias':
            case 'scalar':
            case 'single-quoted-scalar':
            case 'double-quoted-scalar':
                return yield* this.scalar(top);
            case 'block-scalar':
                return yield* this.blockScalar(top);
            case 'block-map':
                return yield* this.blockMap(top);
            case 'block-seq':
                return yield* this.blockSequence(top);
            case 'flow-collection':
                return yield* this.flowCollection(top);
            case 'doc-end':
                return yield* this.documentEnd(top);
        }
        /* istanbul ignore next should not happen */
        yield* this.pop();
    }
    peek(n) {
        return this.stack[this.stack.length - n];
    }
    *pop(error) {
        const token = error ?? this.stack.pop();
        /* istanbul ignore if should not happen */
        if (!token) {
            const message = 'Tried to pop an empty stack';
            yield { type: 'error', offset: this.offset, source: '', message };
        }
        else if (this.stack.length === 0) {
            yield token;
        }
        else {
            const top = this.peek(1);
            if (token.type === 'block-scalar') {
                // Block scalars use their parent rather than header indent
                token.indent = 'indent' in top ? top.indent : 0;
            }
            else if (token.type === 'flow-collection' && top.type === 'document') {
                // Ignore all indent for top-level flow collections
                token.indent = 0;
            }
            if (token.type === 'flow-collection')
                fixFlowSeqItems(token);
            switch (top.type) {
                case 'document':
                    top.value = token;
                    break;
                case 'block-scalar':
                    top.props.push(token); // error
                    break;
                case 'block-map': {
                    const it = top.items[top.items.length - 1];
                    if (it.value) {
                        top.items.push({ start: [], key: token, sep: [] });
                        this.onKeyLine = true;
                        return;
                    }
                    else if (it.sep) {
                        it.value = token;
                    }
                    else {
                        Object.assign(it, { key: token, sep: [] });
                        this.onKeyLine = !it.explicitKey;
                        return;
                    }
                    break;
                }
                case 'block-seq': {
                    const it = top.items[top.items.length - 1];
                    if (it.value)
                        top.items.push({ start: [], value: token });
                    else
                        it.value = token;
                    break;
                }
                case 'flow-collection': {
                    const it = top.items[top.items.length - 1];
                    if (!it || it.value)
                        top.items.push({ start: [], key: token, sep: [] });
                    else if (it.sep)
                        it.value = token;
                    else
                        Object.assign(it, { key: token, sep: [] });
                    return;
                }
                /* istanbul ignore next should not happen */
                default:
                    yield* this.pop();
                    yield* this.pop(token);
            }
            if ((top.type === 'document' ||
                top.type === 'block-map' ||
                top.type === 'block-seq') &&
                (token.type === 'block-map' || token.type === 'block-seq')) {
                const last = token.items[token.items.length - 1];
                if (last &&
                    !last.sep &&
                    !last.value &&
                    last.start.length > 0 &&
                    findNonEmptyIndex(last.start) === -1 &&
                    (token.indent === 0 ||
                        last.start.every(st => st.type !== 'comment' || st.indent < token.indent))) {
                    if (top.type === 'document')
                        top.end = last.start;
                    else
                        top.items.push({ start: last.start });
                    token.items.splice(-1, 1);
                }
            }
        }
    }
    *stream() {
        switch (this.type) {
            case 'directive-line':
                yield { type: 'directive', offset: this.offset, source: this.source };
                return;
            case 'byte-order-mark':
            case 'space':
            case 'comment':
            case 'newline':
                yield this.sourceToken;
                return;
            case 'doc-mode':
            case 'doc-start': {
                const doc = {
                    type: 'document',
                    offset: this.offset,
                    start: []
                };
                if (this.type === 'doc-start')
                    doc.start.push(this.sourceToken);
                this.stack.push(doc);
                return;
            }
        }
        yield {
            type: 'error',
            offset: this.offset,
            message: `Unexpected ${this.type} token in YAML stream`,
            source: this.source
        };
    }
    *document(doc) {
        if (doc.value)
            return yield* this.lineEnd(doc);
        switch (this.type) {
            case 'doc-start': {
                if (findNonEmptyIndex(doc.start) !== -1) {
                    yield* this.pop();
                    yield* this.step();
                }
                else
                    doc.start.push(this.sourceToken);
                return;
            }
            case 'anchor':
            case 'tag':
            case 'space':
            case 'comment':
            case 'newline':
                doc.start.push(this.sourceToken);
                return;
        }
        const bv = this.startBlockValue(doc);
        if (bv)
            this.stack.push(bv);
        else {
            yield {
                type: 'error',
                offset: this.offset,
                message: `Unexpected ${this.type} token in YAML document`,
                source: this.source
            };
        }
    }
    *scalar(scalar) {
        if (this.type === 'map-value-ind') {
            const prev = getPrevProps(this.peek(2));
            const start = getFirstKeyStartProps(prev);
            let sep;
            if (scalar.end) {
                sep = scalar.end;
                sep.push(this.sourceToken);
                delete scalar.end;
            }
            else
                sep = [this.sourceToken];
            const map = {
                type: 'block-map',
                offset: scalar.offset,
                indent: scalar.indent,
                items: [{ start, key: scalar, sep }]
            };
            this.onKeyLine = true;
            this.stack[this.stack.length - 1] = map;
        }
        else
            yield* this.lineEnd(scalar);
    }
    *blockScalar(scalar) {
        switch (this.type) {
            case 'space':
            case 'comment':
            case 'newline':
                scalar.props.push(this.sourceToken);
                return;
            case 'scalar':
                scalar.source = this.source;
                // block-scalar source includes trailing newline
                this.atNewLine = true;
                this.indent = 0;
                if (this.onNewLine) {
                    let nl = this.source.indexOf('\n') + 1;
                    while (nl !== 0) {
                        this.onNewLine(this.offset + nl);
                        nl = this.source.indexOf('\n', nl) + 1;
                    }
                }
                yield* this.pop();
                break;
            /* istanbul ignore next should not happen */
            default:
                yield* this.pop();
                yield* this.step();
        }
    }
    *blockMap(map) {
        const it = map.items[map.items.length - 1];
        // it.sep is true-ish if pair already has key or : separator
        switch (this.type) {
            case 'newline':
                this.onKeyLine = false;
                if (it.value) {
                    const end = 'end' in it.value ? it.value.end : undefined;
                    const last = Array.isArray(end) ? end[end.length - 1] : undefined;
                    if (last?.type === 'comment')
                        end?.push(this.sourceToken);
                    else
                        map.items.push({ start: [this.sourceToken] });
                }
                else if (it.sep) {
                    it.sep.push(this.sourceToken);
                }
                else {
                    it.start.push(this.sourceToken);
                }
                return;
            case 'space':
            case 'comment':
                if (it.value) {
                    map.items.push({ start: [this.sourceToken] });
                }
                else if (it.sep) {
                    it.sep.push(this.sourceToken);
                }
                else {
                    if (this.atIndentedComment(it.start, map.indent)) {
                        const prev = map.items[map.items.length - 2];
                        const end = prev?.value?.end;
                        if (Array.isArray(end)) {
                            arrayPushArray(end, it.start);
                            end.push(this.sourceToken);
                            map.items.pop();
                            return;
                        }
                    }
                    it.start.push(this.sourceToken);
                }
                return;
        }
        if (this.indent >= map.indent) {
            const atMapIndent = !this.onKeyLine && this.indent === map.indent;
            const atNextItem = atMapIndent &&
                (it.sep || it.explicitKey) &&
                this.type !== 'seq-item-ind';
            // For empty nodes, assign newline-separated not indented empty tokens to following node
            let start = [];
            if (atNextItem && it.sep && !it.value) {
                const nl = [];
                for (let i = 0; i < it.sep.length; ++i) {
                    const st = it.sep[i];
                    switch (st.type) {
                        case 'newline':
                            nl.push(i);
                            break;
                        case 'space':
                            break;
                        case 'comment':
                            if (st.indent > map.indent)
                                nl.length = 0;
                            break;
                        default:
                            nl.length = 0;
                    }
                }
                if (nl.length >= 2)
                    start = it.sep.splice(nl[1]);
            }
            switch (this.type) {
                case 'anchor':
                case 'tag':
                    if (atNextItem || it.value) {
                        start.push(this.sourceToken);
                        map.items.push({ start });
                        this.onKeyLine = true;
                    }
                    else if (it.sep) {
                        it.sep.push(this.sourceToken);
                    }
                    else {
                        it.start.push(this.sourceToken);
                    }
                    return;
                case 'explicit-key-ind':
                    if (!it.sep && !it.explicitKey) {
                        it.start.push(this.sourceToken);
                        it.explicitKey = true;
                    }
                    else if (atNextItem || it.value) {
                        start.push(this.sourceToken);
                        map.items.push({ start, explicitKey: true });
                    }
                    else {
                        this.stack.push({
                            type: 'block-map',
                            offset: this.offset,
                            indent: this.indent,
                            items: [{ start: [this.sourceToken], explicitKey: true }]
                        });
                    }
                    this.onKeyLine = true;
                    return;
                case 'map-value-ind':
                    if (it.explicitKey) {
                        if (!it.sep) {
                            if (includesToken(it.start, 'newline')) {
                                Object.assign(it, { key: null, sep: [this.sourceToken] });
                            }
                            else {
                                const start = getFirstKeyStartProps(it.start);
                                this.stack.push({
                                    type: 'block-map',
                                    offset: this.offset,
                                    indent: this.indent,
                                    items: [{ start, key: null, sep: [this.sourceToken] }]
                                });
                            }
                        }
                        else if (it.value) {
                            map.items.push({ start: [], key: null, sep: [this.sourceToken] });
                        }
                        else if (includesToken(it.sep, 'map-value-ind')) {
                            this.stack.push({
                                type: 'block-map',
                                offset: this.offset,
                                indent: this.indent,
                                items: [{ start, key: null, sep: [this.sourceToken] }]
                            });
                        }
                        else if (isFlowToken(it.key) &&
                            !includesToken(it.sep, 'newline')) {
                            const start = getFirstKeyStartProps(it.start);
                            const key = it.key;
                            const sep = it.sep;
                            sep.push(this.sourceToken);
                            // @ts-expect-error type guard is wrong here
                            delete it.key;
                            // @ts-expect-error type guard is wrong here
                            delete it.sep;
                            this.stack.push({
                                type: 'block-map',
                                offset: this.offset,
                                indent: this.indent,
                                items: [{ start, key, sep }]
                            });
                        }
                        else if (start.length > 0) {
                            // Not actually at next item
                            it.sep = it.sep.concat(start, this.sourceToken);
                        }
                        else {
                            it.sep.push(this.sourceToken);
                        }
                    }
                    else {
                        if (!it.sep) {
                            Object.assign(it, { key: null, sep: [this.sourceToken] });
                        }
                        else if (it.value || atNextItem) {
                            map.items.push({ start, key: null, sep: [this.sourceToken] });
                        }
                        else if (includesToken(it.sep, 'map-value-ind')) {
                            this.stack.push({
                                type: 'block-map',
                                offset: this.offset,
                                indent: this.indent,
                                items: [{ start: [], key: null, sep: [this.sourceToken] }]
                            });
                        }
                        else {
                            it.sep.push(this.sourceToken);
                        }
                    }
                    this.onKeyLine = true;
                    return;
                case 'alias':
                case 'scalar':
                case 'single-quoted-scalar':
                case 'double-quoted-scalar': {
                    const fs = this.flowScalar(this.type);
                    if (atNextItem || it.value) {
                        map.items.push({ start, key: fs, sep: [] });
                        this.onKeyLine = true;
                    }
                    else if (it.sep) {
                        this.stack.push(fs);
                    }
                    else {
                        Object.assign(it, { key: fs, sep: [] });
                        this.onKeyLine = true;
                    }
                    return;
                }
                default: {
                    const bv = this.startBlockValue(map);
                    if (bv) {
                        if (bv.type === 'block-seq') {
                            if (!it.explicitKey &&
                                it.sep &&
                                !includesToken(it.sep, 'newline')) {
                                yield* this.pop({
                                    type: 'error',
                                    offset: this.offset,
                                    message: 'Unexpected block-seq-ind on same line with key',
                                    source: this.source
                                });
                                return;
                            }
                        }
                        else if (atMapIndent) {
                            map.items.push({ start });
                        }
                        this.stack.push(bv);
                        return;
                    }
                }
            }
        }
        yield* this.pop();
        yield* this.step();
    }
    *blockSequence(seq) {
        const it = seq.items[seq.items.length - 1];
        switch (this.type) {
            case 'newline':
                if (it.value) {
                    const end = 'end' in it.value ? it.value.end : undefined;
                    const last = Array.isArray(end) ? end[end.length - 1] : undefined;
                    if (last?.type === 'comment')
                        end?.push(this.sourceToken);
                    else
                        seq.items.push({ start: [this.sourceToken] });
                }
                else
                    it.start.push(this.sourceToken);
                return;
            case 'space':
            case 'comment':
                if (it.value)
                    seq.items.push({ start: [this.sourceToken] });
                else {
                    if (this.atIndentedComment(it.start, seq.indent)) {
                        const prev = seq.items[seq.items.length - 2];
                        const end = prev?.value?.end;
                        if (Array.isArray(end)) {
                            arrayPushArray(end, it.start);
                            end.push(this.sourceToken);
                            seq.items.pop();
                            return;
                        }
                    }
                    it.start.push(this.sourceToken);
                }
                return;
            case 'anchor':
            case 'tag':
                if (it.value || this.indent <= seq.indent)
                    break;
                it.start.push(this.sourceToken);
                return;
            case 'seq-item-ind':
                if (this.indent !== seq.indent)
                    break;
                if (it.value || includesToken(it.start, 'seq-item-ind'))
                    seq.items.push({ start: [this.sourceToken] });
                else
                    it.start.push(this.sourceToken);
                return;
        }
        if (this.indent > seq.indent) {
            const bv = this.startBlockValue(seq);
            if (bv) {
                this.stack.push(bv);
                return;
            }
        }
        yield* this.pop();
        yield* this.step();
    }
    *flowCollection(fc) {
        const it = fc.items[fc.items.length - 1];
        if (this.type === 'flow-error-end') {
            let top;
            do {
                yield* this.pop();
                top = this.peek(1);
            } while (top?.type === 'flow-collection');
        }
        else if (fc.end.length === 0) {
            switch (this.type) {
                case 'comma':
                case 'explicit-key-ind':
                    if (!it || it.sep)
                        fc.items.push({ start: [this.sourceToken] });
                    else
                        it.start.push(this.sourceToken);
                    return;
                case 'map-value-ind':
                    if (!it || it.value)
                        fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
                    else if (it.sep)
                        it.sep.push(this.sourceToken);
                    else
                        Object.assign(it, { key: null, sep: [this.sourceToken] });
                    return;
                case 'space':
                case 'comment':
                case 'newline':
                case 'anchor':
                case 'tag':
                    if (!it || it.value)
                        fc.items.push({ start: [this.sourceToken] });
                    else if (it.sep)
                        it.sep.push(this.sourceToken);
                    else
                        it.start.push(this.sourceToken);
                    return;
                case 'alias':
                case 'scalar':
                case 'single-quoted-scalar':
                case 'double-quoted-scalar': {
                    const fs = this.flowScalar(this.type);
                    if (!it || it.value)
                        fc.items.push({ start: [], key: fs, sep: [] });
                    else if (it.sep)
                        this.stack.push(fs);
                    else
                        Object.assign(it, { key: fs, sep: [] });
                    return;
                }
                case 'flow-map-end':
                case 'flow-seq-end':
                    fc.end.push(this.sourceToken);
                    return;
            }
            const bv = this.startBlockValue(fc);
            /* istanbul ignore else should not happen */
            if (bv)
                this.stack.push(bv);
            else {
                yield* this.pop();
                yield* this.step();
            }
        }
        else {
            const parent = this.peek(2);
            if (parent.type === 'block-map' &&
                ((this.type === 'map-value-ind' && parent.indent === fc.indent) ||
                    (this.type === 'newline' &&
                        !parent.items[parent.items.length - 1].sep))) {
                yield* this.pop();
                yield* this.step();
            }
            else if (this.type === 'map-value-ind' &&
                parent.type !== 'flow-collection') {
                const prev = getPrevProps(parent);
                const start = getFirstKeyStartProps(prev);
                fixFlowSeqItems(fc);
                const sep = fc.end.splice(1, fc.end.length);
                sep.push(this.sourceToken);
                const map = {
                    type: 'block-map',
                    offset: fc.offset,
                    indent: fc.indent,
                    items: [{ start, key: fc, sep }]
                };
                this.onKeyLine = true;
                this.stack[this.stack.length - 1] = map;
            }
            else {
                yield* this.lineEnd(fc);
            }
        }
    }
    flowScalar(type) {
        if (this.onNewLine) {
            let nl = this.source.indexOf('\n') + 1;
            while (nl !== 0) {
                this.onNewLine(this.offset + nl);
                nl = this.source.indexOf('\n', nl) + 1;
            }
        }
        return {
            type,
            offset: this.offset,
            indent: this.indent,
            source: this.source
        };
    }
    startBlockValue(parent) {
        switch (this.type) {
            case 'alias':
            case 'scalar':
            case 'single-quoted-scalar':
            case 'double-quoted-scalar':
                return this.flowScalar(this.type);
            case 'block-scalar-header':
                return {
                    type: 'block-scalar',
                    offset: this.offset,
                    indent: this.indent,
                    props: [this.sourceToken],
                    source: ''
                };
            case 'flow-map-start':
            case 'flow-seq-start':
                return {
                    type: 'flow-collection',
                    offset: this.offset,
                    indent: this.indent,
                    start: this.sourceToken,
                    items: [],
                    end: []
                };
            case 'seq-item-ind':
                return {
                    type: 'block-seq',
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: [this.sourceToken] }]
                };
            case 'explicit-key-ind': {
                this.onKeyLine = true;
                const prev = getPrevProps(parent);
                const start = getFirstKeyStartProps(prev);
                start.push(this.sourceToken);
                return {
                    type: 'block-map',
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start, explicitKey: true }]
                };
            }
            case 'map-value-ind': {
                this.onKeyLine = true;
                const prev = getPrevProps(parent);
                const start = getFirstKeyStartProps(prev);
                return {
                    type: 'block-map',
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start, key: null, sep: [this.sourceToken] }]
                };
            }
        }
        return null;
    }
    atIndentedComment(start, indent) {
        if (this.type !== 'comment')
            return false;
        if (this.indent <= indent)
            return false;
        return start.every(st => st.type === 'newline' || st.type === 'space');
    }
    *documentEnd(docEnd) {
        if (this.type !== 'doc-mode') {
            if (docEnd.end)
                docEnd.end.push(this.sourceToken);
            else
                docEnd.end = [this.sourceToken];
            if (this.type === 'newline')
                yield* this.pop();
        }
    }
    *lineEnd(token) {
        switch (this.type) {
            case 'comma':
            case 'doc-start':
            case 'doc-end':
            case 'flow-seq-end':
            case 'flow-map-end':
            case 'map-value-ind':
                yield* this.pop();
                yield* this.step();
                break;
            case 'newline':
                this.onKeyLine = false;
            // fallthrough
            case 'space':
            case 'comment':
            default:
                // all other values are errors
                if (token.end)
                    token.end.push(this.sourceToken);
                else
                    token.end = [this.sourceToken];
                if (this.type === 'newline')
                    yield* this.pop();
        }
    }
}

parser$1.Parser = Parser;

var publicApi$1 = {};

var composer = composer$1;
var Document = Document$4;
var errors$1 = errors$4;
var log = log$2;
var identity$1 = identity$x;
var lineCounter = lineCounter$1;
var parser = parser$1;

function parseOptions(options) {
    const prettyErrors = options.prettyErrors !== false;
    const lineCounter$1 = options.lineCounter || (prettyErrors && new lineCounter.LineCounter()) || null;
    return { lineCounter: lineCounter$1, prettyErrors };
}
/**
 * Parse the input as a stream of YAML documents.
 *
 * Documents should be separated from each other by `...` or `---` marker lines.
 *
 * @returns If an empty `docs` array is returned, it will be of type
 *   EmptyStream and contain additional stream information. In
 *   TypeScript, you should use `'empty' in docs` as a type guard for it.
 */
function parseAllDocuments(source, options = {}) {
    const { lineCounter, prettyErrors } = parseOptions(options);
    const parser$1 = new parser.Parser(lineCounter?.addNewLine);
    const composer$1 = new composer.Composer(options);
    const docs = Array.from(composer$1.compose(parser$1.parse(source)));
    if (prettyErrors && lineCounter)
        for (const doc of docs) {
            doc.errors.forEach(errors$1.prettifyError(source, lineCounter));
            doc.warnings.forEach(errors$1.prettifyError(source, lineCounter));
        }
    if (docs.length > 0)
        return docs;
    return Object.assign([], { empty: true }, composer$1.streamInfo());
}
/** Parse an input string into a single YAML.Document */
function parseDocument$1(source, options = {}) {
    const { lineCounter, prettyErrors } = parseOptions(options);
    const parser$1 = new parser.Parser(lineCounter?.addNewLine);
    const composer$1 = new composer.Composer(options);
    // `doc` is always set by compose.end(true) at the very latest
    let doc = null;
    for (const _doc of composer$1.compose(parser$1.parse(source), true, source.length)) {
        if (!doc)
            doc = _doc;
        else if (doc.options.logLevel !== 'silent') {
            doc.errors.push(new errors$1.YAMLParseError(_doc.range.slice(0, 2), 'MULTIPLE_DOCS', 'Source contains multiple documents; please use YAML.parseAllDocuments()'));
            break;
        }
    }
    if (prettyErrors && lineCounter) {
        doc.errors.forEach(errors$1.prettifyError(source, lineCounter));
        doc.warnings.forEach(errors$1.prettifyError(source, lineCounter));
    }
    return doc;
}
function parse(src, reviver, options) {
    let _reviver = undefined;
    if (typeof reviver === 'function') {
        _reviver = reviver;
    }
    else if (options === undefined && reviver && typeof reviver === 'object') {
        options = reviver;
    }
    const doc = parseDocument$1(src, options);
    if (!doc)
        return null;
    doc.warnings.forEach(warning => log.warn(doc.options.logLevel, warning));
    if (doc.errors.length > 0) {
        if (doc.options.logLevel !== 'silent')
            throw doc.errors[0];
        else
            doc.errors = [];
    }
    return doc.toJS(Object.assign({ reviver: _reviver }, options));
}
function stringify$1(value, replacer, options) {
    let _replacer = null;
    if (typeof replacer === 'function' || Array.isArray(replacer)) {
        _replacer = replacer;
    }
    else if (options === undefined && replacer) {
        options = replacer;
    }
    if (typeof options === 'string')
        options = options.length;
    if (typeof options === 'number') {
        const indent = Math.round(options);
        options = indent < 1 ? undefined : indent > 8 ? { indent: 8 } : { indent };
    }
    if (value === undefined) {
        const { keepUndefined } = options ?? replacer ?? {};
        if (!keepUndefined)
            return undefined;
    }
    if (identity$1.isDocument(value) && !_replacer)
        return value.toString(options);
    return new Document.Document(value, _replacer, options).toString(options);
}

publicApi$1.parse = parse;
publicApi$1.parseAllDocuments = parseAllDocuments;
publicApi$1.parseDocument = parseDocument$1;
publicApi$1.stringify = stringify$1;

var errors = errors$4;
var identity = identity$x;
var Pair = Pair$8;
var Scalar = Scalar$k;
var YAMLMap = YAMLMap$8;
var publicApi = publicApi$1;
var visit = visit$6;
errors.YAMLError;
errors.YAMLParseError;
errors.YAMLWarning;
identity.isAlias;
identity.isCollection;
identity.isDocument;
var isMap = identity.isMap;
identity.isNode;
identity.isPair;
var isScalar = identity.isScalar;
identity.isSeq;
Pair.Pair;
Scalar.Scalar;
YAMLMap.YAMLMap;
var parseDocument = publicApi.parseDocument;
var stringify = publicApi.stringify;
visit.visit;
visit.visitAsync;

const RE_LEADING_SLASH = /^\//;
const RE_SLASH = /\//g;
function normalizeRoute(route) {
  if (!route || route === "/")
    return "/";
  return route.startsWith("/") ? route : `/${route}`;
}
const RE_LIKE_META = /[\\%_]/g;
function escapeLikeTerm(term) {
  return term.replace(RE_LIKE_META, (ch) => `\\${ch}`);
}
function likeSubstring(term) {
  return `%${escapeLikeTerm(term)}%`;
}
const LIKE_ESCAPE = "\\";
const RE_FTS_TERM_SPLIT = /\s+/;
const RE_FTS_TOKEN_CHAR = /[\p{L}\p{N}]/u;
const RE_DOUBLE_QUOTE = /"/g;
function toFtsMatchQuery(query) {
  const terms = query.split(RE_FTS_TERM_SPLIT).filter((term) => RE_FTS_TOKEN_CHAR.test(term)).map((term) => `"${term.replace(RE_DOUBLE_QUOTE, '""')}"*`);
  return terms.length ? terms.join(" ") : null;
}
const MAX_BIND_PARAMS_PER_STATEMENT = 100;
function maxRowsPerInsert(paramsPerRow) {
  return Math.max(1, Math.floor(MAX_BIND_PARAMS_PER_STATEMENT / paramsPerRow));
}
function normalizeRouteKey(route) {
  return normalizeRoute(route).replace(RE_LEADING_SLASH, "").replace(RE_SLASH, ":") || "index";
}
async function decompressFromBase64(base64) {
  const buffer = Buffer.from(base64, "base64");
  const stream = new Blob([buffer]).stream();
  const decompressed = stream.pipeThrough(new DecompressionStream("gzip"));
  const text = await new Response(decompressed).text();
  return JSON.parse(text);
}
const IMPORT_ROWS_PER_STATEMENT = 7;
async function importDbDump(db, rows) {
  if (rows.length === 0)
    return;
  const byRoute = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const route = normalizeRoute(row.route);
    byRoute.set(route, { ...row, route, route_key: normalizeRouteKey(route) });
  }
  const canonical = [...byRoute.values()];
  const stmts = [];
  for (let i = 0; i < canonical.length; i += IMPORT_ROWS_PER_STATEMENT) {
    const batch = canonical.slice(i, i + IMPORT_ROWS_PER_STATEMENT);
    const valuesSql = batch.map(() => `(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)`).join(", ");
    const params = batch.flatMap((row) => {
      const source = row.source || "prerender";
      return [
        row.route,
        row.route_key,
        row.title,
        row.description,
        row.markdown,
        row.headings,
        row.keywords,
        row.content_hash || null,
        row.updated_at,
        row.indexed_at,
        row.is_error,
        source,
        row.indexed_at,
        row.locale || ""
      ];
    });
    stmts.push({
      sql: `
        INSERT INTO ai_ready_pages (route, route_key, title, description, markdown, headings, keywords, content_hash, updated_at, indexed_at, is_error, indexed, source, last_seen_at, locale)
        VALUES ${valuesSql}
        ON CONFLICT(route) DO UPDATE SET
          route_key = excluded.route_key,
          title = excluded.title,
          description = excluded.description,
          markdown = excluded.markdown,
          headings = excluded.headings,
          keywords = excluded.keywords,
          content_hash = excluded.content_hash,
          updated_at = excluded.updated_at,
          indexed_at = excluded.indexed_at,
          is_error = excluded.is_error,
          indexed = excluded.indexed,
          source = excluded.source,
          last_seen_at = excluded.last_seen_at,
          locale = excluded.locale
      `,
      params
    });
  }
  if (db.batch) {
    await db.batch(stmts);
  } else {
    for (const stmt of stmts)
      await db.exec(stmt.sql, stmt.params);
  }
}

const DB_CONTEXT_KEY = "_aiReadyDrizzle";
const DB_PROMISE_CONTEXT_KEY = "_aiReadyDrizzlePromise";
const DB_WORK_CONTEXT_KEY = "_aiReadyDrizzleWork";

const FETCH_TIMEOUT = 5e3;
const RETRY_STATUSES = /* @__PURE__ */ new Set([408, 409, 425, 429, 500, 502, 503, 504]);
function unavailablePublicAsset(_error) {
  return null;
}
function getCfEnv(event) {
  const cloudflare = event?.context.cloudflare;
  return cloudflare?.env ?? globalThis.__env__;
}
function hasAssets(event) {
  return !!getCfEnv(event)?.ASSETS?.fetch;
}
async function fetchPublicAsset(event, path, options) {
  const responseType = options?.responseType ?? "json";
  const cfEnv = getCfEnv(event);
  if (cfEnv?.ASSETS?.fetch) {
    const response = await cfEnv.ASSETS.fetch(
      new Request(`https://assets.local${path}`)
    ).catch(unavailablePublicAsset);
    if (response?.ok) {
      if (responseType === "json")
        return response.json().catch(unavailablePublicAsset);
      if (responseType === "text")
        return response.text().catch(unavailablePublicAsset);
      if (responseType === "arrayBuffer")
        return response.arrayBuffer().catch(unavailablePublicAsset);
      if (responseType === "stream")
        return response.body;
    }
    return null;
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  const assetContext = event && Object.fromEntries(
    Object.entries(event.context).filter(([key]) => ![DB_CONTEXT_KEY, DB_PROMISE_CONTEXT_KEY, DB_WORK_CONTEXT_KEY].includes(key))
  );
  return (async () => {
    for (let attempt = 0; attempt < 2; attempt++) {
      const response = await localFetch(withBase(path, useRuntimeConfig$1().app.baseURL), {
        signal: controller.signal
      }, assetContext).catch(unavailablePublicAsset);
      if (attempt === 0 && !controller.signal.aborted && (!response || RETRY_STATUSES.has(response.status))) {
        await response?.body?.cancel().catch(unavailablePublicAsset);
        continue;
      }
      if (!response?.ok) {
        await response?.body?.cancel().catch(unavailablePublicAsset);
        return null;
      }
      if (responseType === "stream")
        return response.body;
      if (responseType === "text")
        return response.text().catch(unavailablePublicAsset);
      if (responseType === "arrayBuffer")
        return response.arrayBuffer().catch(unavailablePublicAsset);
      return response.json().catch(unavailablePublicAsset);
    }
    return null;
  })().finally(() => clearTimeout(timeout));
}

function parseBuildMeta(value) {
  if (!value || typeof value !== "object")
    return null;
  const { buildId, pageCount, createdAt } = value;
  if (typeof buildId !== "string" || !buildId || typeof pageCount !== "number")
    return null;
  return { buildId, pageCount, createdAt: typeof createdAt === "string" ? createdAt : "" };
}
async function fetchBuildMeta(event) {
  logger$1.debug("[stale-check] Fetching meta...");
  return parseBuildMeta(await fetchPublicAsset(event, "/__ai-ready/pages.meta.json"));
}
async function fetchDump(event) {
  logger$1.debug("[stale-check] Fetching dump...");
  const dumpData = await fetchPublicAsset(event, "/__ai-ready/pages.dump", { responseType: "text" });
  if (!dumpData) {
    logger$1.debug("[stale-check] Failed to fetch dump");
    return null;
  }
  logger$1.debug(`[stale-check] Decompressing dump (${(dumpData.length / 1024).toFixed(1)}kb)...`);
  return decompressFromBase64(dumpData).catch((error) => {
    logger$1.warn("[stale-check] Build dump is unreadable, skipping restore:", error);
    return null;
  });
}
async function getStoredBuildId(event) {
  return unavailable();
}
async function setStoredBuildId(event, buildId) {
  await unavailable();
}
async function getLastStaleCheck(event) {
  const value = await unavailable();
  return value ? Number.parseInt(value, 10) : null;
}
async function setLastStaleCheck(event) {
  await unavailable(event, "last_stale_check", Date.now().toString());
}
async function insertFromDump(event, rows) {
  if (rows.length === 0)
    return;
  const { useRawDb } = await Promise.resolve().then(function () { return index; });
  const db = await useRawDb(event);
  await importDbDump(db, rows);
}
const STALE_CHECK_INTERVAL_MS = 5 * 60 * 1e3;
async function checkAndHandleStale(event) {
  const config = useRuntimeConfig$1()["nuxt-ai-ready"];
  const debug = config.debug;
  const dbCount = await unavailable();
  const storedBuildId = await getStoredBuildId();
  if (dbCount > 0 && storedBuildId) {
    const lastCheck = await getLastStaleCheck();
    if (lastCheck && Date.now() - lastCheck < STALE_CHECK_INTERVAL_MS) {
      if (debug)
        logger$1.info(`[stale-check] Skipping - checked ${Math.round((Date.now() - lastCheck) / 1e3)}s ago`);
      return { action: "none", dbCount, buildId: storedBuildId, reason: "recently_checked" };
    }
  }
  const meta = await fetchBuildMeta(event);
  if (debug) {
    logger$1.info(`[stale-check] DB count: ${dbCount}, stored buildId: ${storedBuildId || "none"}, dump buildId: ${meta?.buildId || "none"}`);
  }
  if (!meta) {
    if (debug)
      logger$1.info("[stale-check] No build metadata found, skipping stale check");
    return { action: "none", dbCount, reason: "no_dump_metadata" };
  }
  if (dbCount === 0 && storedBuildId !== meta.buildId) {
    if (debug)
      logger$1.info("[stale-check] DB empty, restoring from dump...");
    const rows = await fetchDump(event);
    if (!rows) {
      logger$1.warn("[stale-check] Failed to fetch dump for restore");
      return { action: "none", dbCount: 0, dumpCount: meta.pageCount, reason: "dump_fetch_failed" };
    }
    const { useRawDb } = await Promise.resolve().then(function () { return index; });
    const db = await useRawDb(event);
    await importDbDump(db, rows);
    await setStoredBuildId(event, meta.buildId);
    await setLastStaleCheck(event);
    logger$1.info(`[stale-check] Restored ${rows.length} pages from dump (buildId: ${meta.buildId})`);
    return {
      action: "restored",
      buildId: meta.buildId,
      dbCount: rows.length,
      dumpCount: meta.pageCount
    };
  }
  if (storedBuildId !== meta.buildId) {
    if (debug)
      logger$1.info(`[stale-check] Build ID changed (${storedBuildId} \u2192 ${meta.buildId}), comparing hashes...`);
    const sitemapsReset = await unavailable();
    if (sitemapsReset > 0 && debug)
      logger$1.info(`[stale-check] Reset ${sitemapsReset} sitemap error(s)`);
    const dumpRows = await fetchDump(event);
    if (!dumpRows) {
      logger$1.warn("[stale-check] Failed to fetch dump for hash comparison");
      return { action: "none", dbCount, dumpCount: meta.pageCount, reason: "dump_fetch_failed" };
    }
    const dbHashes = await unavailable();
    const changedRoutes = [];
    const newRows = [];
    for (const row of dumpRows) {
      const dbHash = dbHashes.get(row.route);
      if (dbHash === void 0) {
        newRows.push(row);
      } else if (dbHash !== row.content_hash) {
        changedRoutes.push(row.route);
      }
    }
    if (newRows.length > 0) {
      await insertFromDump(event, newRows);
      if (debug)
        logger$1.info(`[stale-check] Added ${newRows.length} new pages from dump`);
    }
    if (changedRoutes.length > 0) {
      await unavailable();
      if (debug)
        logger$1.info(`[stale-check] Marked ${changedRoutes.length} pages pending (hash changed)`);
    }
    await setStoredBuildId(event, meta.buildId);
    await setLastStaleCheck(event);
    const unchangedCount = dumpRows.length - newRows.length - changedRoutes.length;
    logger$1.info(`[stale-check] Build ID changed: ${changedRoutes.length} changed, ${newRows.length} new, ${unchangedCount} unchanged (buildId: ${meta.buildId})`);
    return {
      action: changedRoutes.length > 0 || newRows.length > 0 ? "marked_pending" : "none",
      buildId: meta.buildId,
      dbCount: dbCount + newRows.length,
      dumpCount: meta.pageCount,
      changedCount: changedRoutes.length,
      addedCount: newRows.length,
      sitemapsReset
    };
  }
  await setLastStaleCheck(event);
  if (debug)
    logger$1.info("[stale-check] Build ID unchanged, no action needed");
  return {
    action: "none",
    buildId: meta.buildId,
    dbCount,
    dumpCount: meta.pageCount
  };
}

function isNonNegativeInteger(value) {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}
function isWalkEntry(value) {
  if (!value || typeof value !== "object")
    return false;
  const entry = value;
  if (typeof entry.url !== "string" || entry.url.length === 0 || !isNonNegativeInteger(entry.depth))
    return false;
  if (entry.source === "root")
    return entry.depth === 0 && entry.parentUrl === void 0;
  return entry.source === "index_child" && entry.depth > 0 && typeof entry.parentUrl === "string" && entry.parentUrl.length > 0;
}
function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string" && item.length > 0);
}
function parseState(value) {
  if (!value || typeof value !== "object")
    return { _tag: "error", error: "Sitemap crawl state must be an object" };
  const state = value;
  if (state._tag !== "continuation")
    return { _tag: "error", error: "Sitemap crawl state has an invalid tag" };
  if (!Array.isArray(state.frontier) || state.frontier.length === 0 || !state.frontier.every(isWalkEntry))
    return { _tag: "error", error: "Sitemap crawl state has an invalid frontier" };
  if (!isStringArray(state.seenDocuments))
    return { _tag: "error", error: "Sitemap crawl state has invalid seen documents" };
  if (!isNonNegativeInteger(state.documentsAttempted))
    return { _tag: "error", error: "Sitemap crawl state has an invalid document count" };
  if (!isNonNegativeInteger(state.urlsObserved))
    return { _tag: "error", error: "Sitemap crawl state has an invalid URL count" };
  if (!isNonNegativeInteger(state.rounds) || state.rounds === 0)
    return { _tag: "error", error: "Sitemap crawl state has an invalid round count" };
  if (!isNonNegativeInteger(state.startedAt))
    return { _tag: "error", error: "Sitemap crawl state has an invalid start timestamp" };
  return { _tag: "ok", state };
}
function parseSitemapCrawlState(value) {
  if (value === null)
    return { _tag: "ok", state: null };
  try {
    return parseState(JSON.parse(value));
  } catch (error) {
    return {
      _tag: "error",
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
function serializeSitemapCrawlState(state) {
  return JSON.stringify(state);
}

function createUniversalContext(event) {
  const runtimeConfig = useRuntimeConfig$1();
  let siteUrl = runtimeConfig.site?.url || runtimeConfig.public?.site?.url;
  if (!siteUrl) {
    const siteConfigRuntime = runtimeConfig["nuxt-site-config"];
    if (siteConfigRuntime?.stack) {
      const stack = createSiteConfigStack();
      siteConfigRuntime.stack.forEach((c) => stack.push(c));
      siteUrl = stack.get().url;
    }
  }
  return {
    siteUrl,
    hasEvent: !!event
  };
}

function hostFromUrl(url) {
  if (!url)
    return void 0;
  try {
    return new URL(url).host || void 0;
  } catch {
    return void 0;
  }
}
function deriveLocale(event, route, explicit, pageUrl) {
  if (explicit !== void 0)
    return explicit;
  const cfg = useRuntimeConfig$1();
  const i18n = cfg["nuxt-ai-ready"]?.i18n;
  if (!i18n)
    return "";
  const entryHost = hostFromUrl(pageUrl);
  if (entryHost)
    return unavailable$1().locale;
  let requestHost;
  if (event) {
    try {
      const headers = event.req?.headers || event.node?.req.headers;
      const host2 = headers instanceof Headers ? headers.get("x-forwarded-host") || headers.get("host") : headers?.["x-forwarded-host"] || headers?.host;
      requestHost = (Array.isArray(host2) ? host2[0] : host2)?.split(",")[0]?.trim();
    } catch {
      requestHost = void 0;
    }
  }
  requestHost && unavailable$1()._tag === "known" ? requestHost : hostFromUrl(createUniversalContext(event).siteUrl);
  return unavailable$1().locale;
}
const SEED_REFRESH_WINDOW_MS = 24 * 60 * 60 * 1e3;
function resolveSeedRefreshWindowMs(pruneTtlSeconds) {
  if (!(pruneTtlSeconds > 0))
    return SEED_REFRESH_WINDOW_MS;
  return Math.min(SEED_REFRESH_WINDOW_MS, Math.floor(pruneTtlSeconds * 1e3 / 2));
}
function parseSourceLastmod(input) {
  if (input === void 0)
    return null;
  if (typeof input === "string" && (input.length > 64 || !/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2}))?$/.test(input)))
    return null;
  const date = new Date(input);
  if (!Number.isFinite(date.getTime()))
    return null;
  if (typeof input === "string") {
    const calendarDate = input.slice(0, 10);
    const parsedCalendarDate = new Date(calendarDate);
    if (!Number.isFinite(parsedCalendarDate.getTime()) || parsedCalendarDate.toISOString().slice(0, 10) !== calendarDate)
      return null;
  }
  return date.toISOString();
}

function getEventFromContext(providedEvent) {
  if (providedEvent)
    return providedEvent;
  try {
    return useEvent();
  } catch {
    return void 0;
  }
}
let schemaInitializationState = { _tag: "Uninitialized" };
let dumpSyncState = { _tag: "Pending" };
function syncBuildDump(event) {
  if (dumpSyncState._tag === "Synced")
    return Promise.resolve();
  if (dumpSyncState._tag === "Syncing")
    return dumpSyncState.promise;
  const promise = checkAndHandleStale(event).then(
    () => {
      dumpSyncState = { _tag: "Synced" };
    },
    (error) => {
      dumpSyncState = { _tag: "Pending" };
      throw error;
    }
  );
  dumpSyncState = { _tag: "Syncing", promise };
  return promise;
}
const RE_FTS_CHARS = /[*:^"()]/g;
async function getDb(event) {
  const resolvedEvent = getEventFromContext(event);
  const cfg = useRuntimeConfig$1();
  const database = cfg["nuxt-ai-ready"]?.database?._tag;
  if (database === "Disabled")
    return null;
  const db = await unavailable();
  if (schemaInitializationState._tag === "Uninitialized") {
    const promise = unavailable().then(() => {
      schemaInitializationState = { _tag: "Initialized" };
    }).catch((error) => {
      schemaInitializationState = { _tag: "Uninitialized" };
      throw error;
    });
    schemaInitializationState = { _tag: "Initializing", promise };
  }
  if (schemaInitializationState._tag === "Initializing")
    await schemaInitializationState.promise;
  if (database === "Enabled")
    await syncBuildDump(resolvedEvent);
  return db;
}
async function queryPageMetadata(event, routes) {
  if (!routes.length)
    return [];
  const db = await getDb(event);
  if (!db)
    return [];
  const unique = [...new Set(routes)];
  const pages = [];
  for (let i = 0; i < unique.length; i += 100) {
    const batch = unique.slice(i, i + 100);
    const rows = await db.all(
      `SELECT route, title, description, is_error, locale FROM ai_ready_pages WHERE route IN (${batch.map(() => "?").join(", ")})`,
      batch
    );
    pages.push(...rows.map((row) => ({ route: row.route, title: row.title, description: row.description, isError: row.is_error === 1, locale: row.locale || "" })));
  }
  return pages;
}
function buildWhereClause(where) {
  const conditions = [];
  const params = [];
  if (where?.pending !== void 0) {
    conditions.push("indexed = ?");
    params.push(where.pending ? 0 : 1);
  }
  if (where?.hasError !== void 0) {
    conditions.push("is_error = ?");
    params.push(where.hasError ? 1 : 0);
  }
  if (where?.source) {
    conditions.push("source = ?");
    params.push(where.source);
  }
  if (where?.hasError === void 0) {
    conditions.push("is_error = 0");
  }
  return {
    sql: conditions.length ? `WHERE ${conditions.join(" AND ")}` : "",
    params
  };
}
function safeJsonParse(json, fallback) {
  if (!json)
    return fallback;
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}
function toNumber(value, fallback = 0) {
  return value === null || value === void 0 ? fallback : Number(value);
}
function toNullableNumber(value) {
  return value === null || value === void 0 ? null : Number(value);
}
function rowToEntry(row) {
  return {
    route: row.route,
    title: row.title,
    description: row.description,
    headings: safeJsonParse(row.headings, []),
    keywords: safeJsonParse(row.keywords, []),
    updatedAt: row.updated_at,
    isError: row.is_error === 1,
    locale: row.locale || ""
  };
}
function rowToData(row) {
  return {
    ...rowToEntry(row),
    markdown: row.markdown
  };
}
async function getPageLastmods(event) {
  const db = await getDb(event);
  if (!db)
    return /* @__PURE__ */ new Map();
  const rows = await db.all(
    "SELECT route, updated_at FROM ai_ready_pages WHERE indexed = 1 AND is_error = 0"
  );
  const map = /* @__PURE__ */ new Map();
  for (const row of rows) {
    if (row.route && row.updated_at) {
      map.set(row.route, row.updated_at);
    }
  }
  return map;
}
async function queryPages(event, options = {}) {
  const { route, includeMarkdown, where, limit, offset } = options;
  const db = await getDb(event);
  if (!db)
    return route ? void 0 : [];
  const cols = includeMarkdown ? "*" : "route, title, description, headings, keywords, updated_at, is_error, locale";
  if (route) {
    const row = await db.first(`SELECT ${cols} FROM ai_ready_pages WHERE route = ?`, [route]);
    if (!row)
      return void 0;
    return includeMarkdown ? rowToData(row) : rowToEntry(row);
  }
  const { sql: whereClause, params } = buildWhereClause(where);
  let sql = `SELECT ${cols} FROM ai_ready_pages ${whereClause} ORDER BY route`;
  if (limit) {
    sql += ` LIMIT ?`;
    params.push(limit);
    if (offset) {
      sql += ` OFFSET ?`;
      params.push(offset);
    }
  }
  const rows = await db.all(sql, params);
  return includeMarkdown ? rows.map(rowToData) : rows.map(rowToEntry);
}
async function* streamPages(event, options = {}) {
  const db = await getDb(event);
  if (!db)
    return;
  const batchSize = options.batchSize || 50;
  let lastRoute;
  while (true) {
    const where = `WHERE is_error = 0${lastRoute ? " AND route > ?" : ""}`;
    const rows = await db.all(
      `SELECT * FROM ai_ready_pages ${where} ORDER BY route LIMIT ?`,
      lastRoute ? [lastRoute, batchSize] : [batchSize]
    );
    if (rows.length === 0)
      break;
    for (const row of rows) {
      yield rowToData(row);
    }
    if (rows.length < batchSize)
      break;
    lastRoute = rows[rows.length - 1].route;
  }
}
async function countPages(event, options = {}) {
  const db = await getDb(event);
  if (!db)
    return 0;
  const { sql: whereClause, params } = buildWhereClause(options.where);
  const row = await db.first(
    `SELECT COUNT(*) as count FROM ai_ready_pages ${whereClause}`,
    params
  );
  return toNumber(row?.count);
}
async function searchPages(event, query, options = {}) {
  const db = await getDb(event);
  if (!db)
    return [];
  const { limit = 10 } = options;
  const sanitized = query.replace(RE_FTS_CHARS, " ").trim();
  if (!sanitized)
    return [];
  if (db.dialect === "postgres") {
    const searchTerm = likeSubstring(sanitized);
    return db.all(`
      SELECT route, title, description, 0 AS score
      FROM ai_ready_pages
      WHERE is_error = 0
        AND (title ILIKE ? ESCAPE ? OR description ILIKE ? ESCAPE ? OR markdown ILIKE ? ESCAPE ? OR headings ILIKE ? ESCAPE ?)
      ORDER BY route
      LIMIT ?
    `, [searchTerm, LIKE_ESCAPE, searchTerm, LIKE_ESCAPE, searchTerm, LIKE_ESCAPE, searchTerm, LIKE_ESCAPE, limit]);
  }
  const ftsQuery = toFtsMatchQuery(query);
  if (!ftsQuery)
    return [];
  return db.all(`
    SELECT p.route, p.title, p.description, bm25(ai_ready_pages_fts, 5.0, 3.0, 1.0, 0.5, 2.0, 2.0) as score
    FROM ai_ready_pages_fts
    JOIN ai_ready_pages p ON ai_ready_pages_fts.rowid = p.id
    WHERE ai_ready_pages_fts MATCH ?
    ORDER BY score
    LIMIT ?
  `, [ftsQuery, limit]);
}
async function upsertPage(event, page) {
  const db = await getDb(event);
  if (!db)
    return;
  const route = normalizeRoute(page.route);
  const routeKey = normalizeRouteKey(route);
  const keywordsJson = JSON.stringify(page.keywords);
  const indexedAt = Date.now();
  const source = page.source || "runtime";
  const lastSeenAt = source === "runtime" ? indexedAt : null;
  const locale = deriveLocale(event, route, page.locale);
  const localeTrusted = page.locale !== void 0;
  await db.exec(`
    INSERT INTO ai_ready_pages (route, route_key, title, description, markdown, headings, keywords, content_hash, updated_at, indexed_at, is_error, indexed, source, last_seen_at, locale)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(route) DO UPDATE SET
      title = excluded.title,
      description = excluded.description,
      markdown = excluded.markdown,
      headings = excluded.headings,
      keywords = excluded.keywords,
      content_hash = excluded.content_hash,
      updated_at = excluded.updated_at,
      indexed_at = excluded.indexed_at,
      is_error = excluded.is_error,
      indexed = excluded.indexed,
      source = excluded.source,
      last_seen_at = excluded.last_seen_at${localeTrusted ? `,
      locale = excluded.locale` : ""}
  `, [route, routeKey, page.title, page.description, page.markdown, page.headings, keywordsJson, page.contentHash || null, page.updatedAt, indexedAt, page.isError ? 1 : 0, page.isError ? 0 : 1, source, lastSeenAt, locale]);
}
async function isPageFresh(event, route, ttlSeconds) {
  if (ttlSeconds <= 0)
    return false;
  const db = await getDb(event);
  if (!db)
    return false;
  const row = await db.first("SELECT indexed_at FROM ai_ready_pages WHERE route = ?", [route]);
  if (!row)
    return false;
  const age = (Date.now() - toNumber(row.indexed_at)) / 1e3;
  return age < ttlSeconds;
}
async function getPageIndexState(event, route) {
  const db = await getDb(event);
  if (!db)
    return void 0;
  const row = await db.first(
    "SELECT indexed_at, content_hash, updated_at, source FROM ai_ready_pages WHERE route = ?",
    [route]
  );
  return row ? {
    indexedAt: toNumber(row.indexed_at),
    contentHash: row.content_hash,
    updatedAt: row.updated_at || "",
    source: row.source === "runtime" ? "runtime" : "prerender"
  } : void 0;
}
async function getPageHash(event, route) {
  const db = await getDb(event);
  if (!db)
    return null;
  const row = await db.first("SELECT content_hash FROM ai_ready_pages WHERE route = ?", [route]);
  return row?.content_hash || null;
}
function chunk(items, size) {
  const result = [];
  for (let i = 0; i < items.length; i += size)
    result.push(items.slice(i, i + size));
  return result;
}
async function seedRoutes(event, routes, options = {}) {
  const db = await getDb(event);
  if (!db || routes.length === 0)
    return 0;
  const refreshWindowMs = Math.max(0, Math.trunc(Number.isFinite(options.refreshWindowMs) ? options.refreshWindowMs : SEED_REFRESH_WINDOW_MS));
  const nowMs = Date.now();
  const byRoute = /* @__PURE__ */ new Map();
  for (const entry of routes) {
    const route = normalizeRoute(typeof entry === "string" ? entry : entry.route);
    const explicitLocale = typeof entry === "string" ? void 0 : entry.locale;
    const entryUrl = typeof entry === "string" ? void 0 : entry.url;
    byRoute.set(route, {
      route,
      routeKey: normalizeRouteKey(route),
      locale: deriveLocale(event, route, explicitLocale, entryUrl),
      sourceLastmod: parseSourceLastmod(typeof entry === "string" ? void 0 : entry.lastmod)
    });
  }
  const rowsPerInsert = maxRowsPerInsert(5);
  const stmts = [];
  for (const batch of chunk([...byRoute.values()], rowsPerInsert)) {
    const valuesSql = batch.map(() => `(?, ?, '', '', '', '[]', '[]', '', ?, 0, 0, 0, 'runtime', ?, ?)`).join(", ");
    const params = batch.flatMap((r) => [r.route, r.routeKey, r.sourceLastmod, nowMs, r.locale]);
    stmts.push({
      sql: `
        INSERT INTO ai_ready_pages (route, route_key, title, description, markdown, headings, keywords, updated_at, source_lastmod, indexed_at, is_error, indexed, source, last_seen_at, locale)
        VALUES ${valuesSql}
        ON CONFLICT(route) DO UPDATE SET
          last_seen_at = excluded.last_seen_at,
          locale = excluded.locale,
          source_lastmod = COALESCE(excluded.source_lastmod, ai_ready_pages.source_lastmod),
          is_error = 0,
          indexed = CASE WHEN ai_ready_pages.is_error = 1
            OR (excluded.source_lastmod IS NOT NULL AND ai_ready_pages.source_lastmod IS DISTINCT FROM excluded.source_lastmod)
            THEN 0 ELSE ai_ready_pages.indexed END
        WHERE ai_ready_pages.last_seen_at IS NULL
          OR ai_ready_pages.last_seen_at < excluded.last_seen_at - ${refreshWindowMs}
          OR ai_ready_pages.locale IS DISTINCT FROM excluded.locale
          OR (excluded.source_lastmod IS NOT NULL AND ai_ready_pages.source_lastmod IS DISTINCT FROM excluded.source_lastmod)
      `,
      params
    });
  }
  await db.batch(stmts);
  return byRoute.size;
}
async function prunePage(event, route) {
  const db = await getDb(event);
  if (!db)
    return;
  await db.exec("DELETE FROM ai_ready_pages WHERE route = ?", [normalizeRoute(route)]);
}
async function pruneStaleRoutes(event, staleThresholdSeconds, protectedSince, refreshWindowMs = SEED_REFRESH_WINDOW_MS) {
  const db = await getDb(event);
  if (!db)
    return 0;
  const staleThreshold = Date.now() - staleThresholdSeconds * 1e3;
  const threshold = (protectedSince === void 0 ? staleThreshold : Math.min(staleThreshold, protectedSince)) - refreshWindowMs;
  const countRow = await db.first(
    "SELECT COUNT(*) as count FROM ai_ready_pages WHERE source = ? AND last_seen_at < ?",
    ["runtime", threshold]
  );
  const count = toNumber(countRow?.count);
  if (count > 0) {
    await db.exec("DELETE FROM ai_ready_pages WHERE source = ? AND last_seen_at < ?", ["runtime", threshold]);
  }
  return count;
}
async function getStaleRoutes(event, staleThresholdSeconds, refreshWindowMs = SEED_REFRESH_WINDOW_MS) {
  const db = await getDb(event);
  if (!db)
    return [];
  const threshold = Date.now() - staleThresholdSeconds * 1e3 - refreshWindowMs;
  const rows = await db.all(
    "SELECT route FROM ai_ready_pages WHERE source = ? AND last_seen_at < ?",
    ["runtime", threshold]
  );
  return rows.map((r) => r.route);
}
function rowToCronRun(row) {
  return {
    id: row.id,
    startedAt: toNumber(row.started_at),
    finishedAt: toNullableNumber(row.finished_at),
    durationMs: toNullableNumber(row.duration_ms),
    pagesIndexed: toNumber(row.pages_indexed),
    pagesRemaining: toNumber(row.pages_remaining),
    errors: safeJsonParse(row.errors, []),
    status: row.status
  };
}
async function startCronRun(event) {
  const db = await getDb(event);
  if (!db)
    return null;
  const now = Date.now();
  const row = await db.first(
    "INSERT INTO ai_ready_cron_runs (started_at, status) VALUES (?, ?) RETURNING id",
    [now, "running"]
  );
  return row ? toNumber(row.id) : null;
}
async function completeCronRun(event, runId, result) {
  const db = await getDb(event);
  if (!db)
    return;
  const now = Date.now();
  const row = await db.first("SELECT started_at FROM ai_ready_cron_runs WHERE id = ?", [runId]);
  const durationMs = row ? now - toNumber(row.started_at) : null;
  const status = result.errors.length > 0 ? result.pagesIndexed > 0 ? "partial" : "error" : "success";
  await db.exec(`
    UPDATE ai_ready_cron_runs SET
      finished_at = ?,
      duration_ms = ?,
      pages_indexed = ?,
      pages_remaining = ?,
      errors = ?,
      status = ?
    WHERE id = ?
  `, [now, durationMs, result.pagesIndexed, result.pagesRemaining, JSON.stringify(result.errors), status, runId]);
}
async function getRecentCronRuns(event, limit = 10) {
  const db = await getDb(event);
  if (!db)
    return [];
  const rows = await db.all(
    "SELECT * FROM ai_ready_cron_runs ORDER BY started_at DESC LIMIT ?",
    [limit]
  );
  return rows.map(rowToCronRun);
}
async function pruneCronRunsByAge(event, maxAgeMs = 24 * 60 * 60 * 1e3) {
  const db = await getDb(event);
  if (!db)
    return 0;
  const threshold = Date.now() - maxAgeMs;
  const countRow = await db.first(
    "SELECT COUNT(*) as count FROM ai_ready_cron_runs WHERE started_at < ?",
    [threshold]
  );
  const count = toNumber(countRow?.count);
  if (count > 0) {
    await db.exec("DELETE FROM ai_ready_cron_runs WHERE started_at < ?", [threshold]);
  }
  return count;
}
async function getCronFastPathStatus(event, sitemapIntervalMinutes = 5) {
  const db = await getDb(event);
  if (!db)
    return null;
  const sitemapThreshold = Date.now() - sitemapIntervalMinutes * 60 * 1e3;
  const row = await db.first(`
    SELECT
      (SELECT COUNT(*) FROM ai_ready_pages) as total_pages,
      (SELECT COUNT(*) FROM ai_ready_pages WHERE indexed = 0 AND is_error = 0) as pending_pages,
      (SELECT value FROM _ai_ready_info WHERE id = 'last_stale_check') as last_stale_check,
      (SELECT value FROM _ai_ready_info WHERE id = 'build_id') as build_id,
      (SELECT COUNT(*) FROM ai_ready_sitemaps WHERE (crawl_state IS NOT NULL OR last_crawled_at IS NULL OR last_crawled_at < ?) AND error_count < 10) as sitemaps_need_crawl
  `, [sitemapThreshold]);
  if (!row)
    return null;
  return {
    totalPages: toNumber(row.total_pages),
    pendingPages: toNumber(row.pending_pages),
    lastStaleCheck: row.last_stale_check ? Number.parseInt(row.last_stale_check, 10) : null,
    buildId: row.build_id,
    sitemapsNeedCrawl: toNumber(row.sitemaps_need_crawl)
  };
}
const CRON_LOCK_TTL_MS = 3e5;
function cronLockField(db, column, key) {
  if (db.dialect !== "postgres")
    return `json_extract(${column}, '$.${key}')`;
  const jsonb = `${column}::jsonb`;
  return `CASE WHEN jsonb_typeof(${jsonb}) = 'object' THEN (${jsonb} ->> '${key}') END`;
}
async function tryAcquireCronLock(event) {
  const token = crypto.randomUUID();
  const db = await getDb(event);
  if (!db)
    return { _tag: "acquired", token };
  const now = Date.now();
  const value = JSON.stringify({ t: token, a: now, e: now + CRON_LOCK_TTL_MS });
  try {
    await db.exec(`
      INSERT INTO _ai_ready_info (id, value) VALUES ('cron_lock', ?)
      ON CONFLICT(id) DO UPDATE SET value = excluded.value
      WHERE CAST(coalesce(${cronLockField(db, "_ai_ready_info.value", "e")}, '0') AS BIGINT) < ?
    `, [value, now]);
    const row = await db.first(
      `SELECT value FROM _ai_ready_info WHERE id = 'cron_lock' AND ${cronLockField(db, "value", "t")} = ?`,
      [token]
    );
    return row ? { _tag: "acquired", token } : { _tag: "held" };
  } catch (error) {
    await releaseCronLock(event, token).catch(() => {
    });
    throw error;
  }
}
async function releaseCronLock(event, token) {
  const db = await getDb(event);
  if (!db)
    return;
  await db.exec(`DELETE FROM _ai_ready_info WHERE id = 'cron_lock' AND ${cronLockField(db, "value", "t")} = ?`, [token]);
}
const RE_CRON_LOCK_NUMERIC = /^\d+$/;
function parseCronLockValue(value) {
  if (RE_CRON_LOCK_NUMERIC.test(value))
    return { acquiredAt: Number(value), expiresAt: Number(value) + CRON_LOCK_TTL_MS };
  const parsed = safeJsonParse(value, null);
  if (parsed && typeof parsed === "object" && typeof parsed.a === "number" && typeof parsed.e === "number")
    return { acquiredAt: parsed.a, expiresAt: parsed.e };
  return null;
}
async function getCronLockStatus(event) {
  const db = await getDb(event);
  if (!db)
    return { held: false, since: null, elapsedMs: null, stale: false };
  const row = await db.first(
    "SELECT value FROM _ai_ready_info WHERE id = ?",
    ["cron_lock"]
  );
  if (!row)
    return { held: false, since: null, elapsedMs: null, stale: false };
  const record = parseCronLockValue(row.value);
  if (!record)
    return { held: false, since: null, elapsedMs: null, stale: false };
  const now = Date.now();
  const stale = now >= record.expiresAt;
  return {
    held: !stale,
    since: record.acquiredAt,
    elapsedMs: now - record.acquiredAt,
    stale
  };
}
function rowToSitemapEntry(row) {
  const parsedState = parseSitemapCrawlState(row.crawl_state);
  if (parsedState._tag === "error")
    throw new Error(`Invalid crawl state for sitemap ${row.name}: ${parsedState.error}`);
  return {
    name: row.name,
    route: row.route,
    lastCrawledAt: toNullableNumber(row.last_crawled_at),
    urlCount: toNumber(row.url_count),
    errorCount: toNumber(row.error_count),
    lastError: row.last_error,
    crawlState: parsedState.state
  };
}
async function syncSitemaps(event, sitemaps) {
  const db = await getDb(event);
  if (!db)
    return { added: 0, removed: 0 };
  const existingRows = await db.all("SELECT name, route FROM ai_ready_sitemaps");
  const existingNames = new Set(existingRows.map((r) => r.name));
  const existingRoutes = new Map(existingRows.map((row) => [row.name, row.route]));
  const configNames = new Set(sitemaps.map((s) => s.name));
  let added = 0;
  let removed = 0;
  const stmts = [];
  for (const sitemap of sitemaps) {
    if (!existingNames.has(sitemap.name)) {
      stmts.push({
        sql: "INSERT INTO ai_ready_sitemaps (name, route) VALUES (?, ?)",
        params: [sitemap.name, sitemap.route]
      });
      added++;
    } else if (existingRoutes.get(sitemap.name) !== sitemap.route) {
      await db.exec(`
        UPDATE ai_ready_sitemaps SET
          route = ?,
          last_crawled_at = NULL,
          url_count = 0,
          error_count = 0,
          last_error = NULL,
          crawl_state = NULL
        WHERE name = ?
      `, [sitemap.route, sitemap.name]);
    }
  }
  for (const name of existingNames) {
    if (!configNames.has(name)) {
      stmts.push({
        sql: "DELETE FROM ai_ready_sitemaps WHERE name = ?",
        params: [name]
      });
      removed++;
    }
  }
  await db.batch(stmts);
  return { added, removed };
}
async function getNextSitemapToCrawl(event, minIntervalMinutes = 5) {
  const db = await getDb(event);
  if (!db)
    return null;
  const threshold = Date.now() - minIntervalMinutes * 60 * 1e3;
  const continuationRow = await db.first(`
    SELECT * FROM ai_ready_sitemaps
    WHERE crawl_state IS NOT NULL AND error_count = 0
    ORDER BY last_crawled_at ASC NULLS FIRST
    LIMIT 1
  `);
  if (continuationRow)
    return rowToSitemapEntry(continuationRow);
  const errorRow = await db.first(`
    SELECT * FROM ai_ready_sitemaps
    WHERE error_count > 0 AND error_count < 10
      AND (last_crawled_at IS NULL OR last_crawled_at < ?)
    ORDER BY last_crawled_at ASC NULLS FIRST
    LIMIT 1
  `, [threshold]);
  if (errorRow)
    return rowToSitemapEntry(errorRow);
  const row = await db.first(`
    SELECT * FROM ai_ready_sitemaps
    WHERE error_count = 0
      AND (last_crawled_at IS NULL OR last_crawled_at < ?)
    ORDER BY last_crawled_at ASC NULLS FIRST
    LIMIT 1
  `, [threshold]);
  return row ? rowToSitemapEntry(row) : null;
}
async function getSitemapLastCrawledAt(event, name) {
  const db = await getDb(event);
  if (!db)
    return null;
  const row = await db.first(
    "SELECT last_crawled_at FROM ai_ready_sitemaps WHERE name = ?",
    [name]
  );
  return toNullableNumber(row?.last_crawled_at);
}
async function markSitemapCrawled(event, name, urlCount) {
  const db = await getDb(event);
  if (!db)
    return;
  await db.exec(`
    UPDATE ai_ready_sitemaps SET
      last_crawled_at = ?,
      url_count = ?,
      error_count = 0,
      last_error = NULL,
      crawl_state = NULL
    WHERE name = ?
  `, [Date.now(), urlCount, name]);
}
async function markSitemapSeeded(event, name, urlCount, expectedLastCrawledAt) {
  const db = await getDb(event);
  if (!db)
    return;
  const expectedClause = expectedLastCrawledAt === null ? "last_crawled_at IS NULL" : "last_crawled_at = ?";
  const expectedParams = expectedLastCrawledAt === null ? [] : [expectedLastCrawledAt];
  await db.exec(`
    UPDATE ai_ready_sitemaps SET
      last_crawled_at = ?,
      url_count = ?,
      error_count = 0,
      last_error = NULL
    WHERE name = ?
      AND crawl_state IS NULL
      AND error_count = 0
      AND ${expectedClause}
  `, [Date.now(), urlCount, name, ...expectedParams]);
}
async function markSitemapCrawlPartial(event, name, state) {
  const db = await getDb(event);
  if (!db)
    return;
  await db.exec(`
    UPDATE ai_ready_sitemaps SET
      last_crawled_at = ?,
      url_count = ?,
      error_count = 0,
      last_error = NULL,
      crawl_state = ?
    WHERE name = ?
  `, [Date.now(), state.urlsObserved, serializeSitemapCrawlState(state), name]);
}
async function markSitemapError(event, name, error) {
  const db = await getDb(event);
  if (!db)
    return;
  await db.exec(`
    UPDATE ai_ready_sitemaps SET
      last_crawled_at = ?,
      error_count = error_count + 1,
      last_error = ?,
      crawl_state = NULL
    WHERE name = ?
  `, [Date.now(), error, name]);
}
async function resetSitemapErrors(event) {
  const db = await getDb(event);
  if (!db)
    return 0;
  const countRow = await db.first(
    "SELECT COUNT(*) as count FROM ai_ready_sitemaps WHERE error_count > 0 OR crawl_state IS NOT NULL"
  );
  const count = toNumber(countRow?.count);
  if (count > 0) {
    await db.exec("UPDATE ai_ready_sitemaps SET error_count = 0, last_error = NULL, last_crawled_at = NULL, crawl_state = NULL");
  }
  return count;
}
async function getSitemapStatus(event) {
  const db = await getDb(event);
  if (!db)
    return [];
  const rows = await db.all("SELECT * FROM ai_ready_sitemaps ORDER BY name");
  return rows.map((row) => {
    const { crawlState, ...entry } = rowToSitemapEntry(row);
    return { ...entry, continuing: crawlState !== null };
  });
}
async function getRecentlyIndexedPages(event, limit = 10) {
  const db = await getDb(event);
  if (!db)
    return [];
  const rows = await db.all(
    "SELECT route, title, indexed_at FROM ai_ready_pages WHERE indexed = 1 AND is_error = 0 ORDER BY indexed_at DESC LIMIT ?",
    [limit]
  );
  return rows.map((r) => ({ route: r.route, title: r.title, indexedAt: toNumber(r.indexed_at) }));
}
async function countRecentlyIndexed(event, sinceMs) {
  const db = await getDb(event);
  if (!db)
    return 0;
  const threshold = Date.now() - sinceMs;
  const row = await db.first(
    "SELECT COUNT(*) as count FROM ai_ready_pages WHERE indexed = 1 AND indexed_at > ?",
    [threshold]
  );
  return toNumber(row?.count);
}

const queries = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  SEED_REFRESH_WINDOW_MS: SEED_REFRESH_WINDOW_MS,
  completeCronRun: completeCronRun,
  countPages: countPages,
  countRecentlyIndexed: countRecentlyIndexed,
  getCronFastPathStatus: getCronFastPathStatus,
  getCronLockStatus: getCronLockStatus,
  getNextSitemapToCrawl: getNextSitemapToCrawl,
  getPageHash: getPageHash,
  getPageIndexState: getPageIndexState,
  getPageLastmods: getPageLastmods,
  getRecentCronRuns: getRecentCronRuns,
  getRecentlyIndexedPages: getRecentlyIndexedPages,
  getSitemapLastCrawledAt: getSitemapLastCrawledAt,
  getSitemapStatus: getSitemapStatus,
  getStaleRoutes: getStaleRoutes,
  isPageFresh: isPageFresh,
  markSitemapCrawlPartial: markSitemapCrawlPartial,
  markSitemapCrawled: markSitemapCrawled,
  markSitemapError: markSitemapError,
  markSitemapSeeded: markSitemapSeeded,
  pruneCronRunsByAge: pruneCronRunsByAge,
  prunePage: prunePage,
  pruneStaleRoutes: pruneStaleRoutes,
  queryPageMetadata: queryPageMetadata,
  queryPages: queryPages,
  releaseCronLock: releaseCronLock,
  resetSitemapErrors: resetSitemapErrors,
  resolveSeedRefreshWindowMs: resolveSeedRefreshWindowMs,
  searchPages: searchPages,
  seedRoutes: seedRoutes,
  startCronRun: startCronRun,
  streamPages: streamPages,
  syncSitemaps: syncSitemaps,
  tryAcquireCronLock: tryAcquireCronLock,
  upsertPage: upsertPage
}, Symbol.toStringTag, { value: 'Module' }));

function escapeYamlString(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
function buildFrontmatter(fields) {
  const lines = ["---"];
  if (fields.title)
    lines.push(`title: "${escapeYamlString(fields.title)}"`);
  if (fields.description)
    lines.push(`description: "${escapeYamlString(fields.description)}"`);
  if (fields.canonical_url)
    lines.push(`canonical_url: "${escapeYamlString(fields.canonical_url)}"`);
  if (fields.last_updated)
    lines.push(`last_updated: "${escapeYamlString(fields.last_updated)}"`);
  if (fields.locale)
    lines.push(`locale: "${escapeYamlString(fields.locale)}"`);
  if (fields.alternates?.length) {
    lines.push("alternates:");
    for (const alt of fields.alternates)
      lines.push(`  - { hreflang: "${escapeYamlString(alt.hreflang)}", href: "${escapeYamlString(alt.href)}" }`);
  }
  lines.push("---", "");
  return lines.join("\n");
}
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;
function layerFrontmatter(fields, markdown) {
  const match = markdown.match(FRONTMATTER_RE);
  if (!match)
    return `${buildFrontmatter(fields)}
${markdown}`;
  const document = parseDocument(match[1]);
  if (document.errors.length || !isMap(document.contents))
    return `${buildFrontmatter(fields)}
${markdown}`;
  for (const [key, value] of Object.entries(fields)) {
    if (value !== void 0 && value !== "")
      document.set(key, value);
  }
  const body = markdown.slice(match[0].length).replace(/^\r?\n/, "");
  return `---
${document.toString({ lineWidth: 0 }).trimEnd()}
---

${body}`;
}
function hoistMetaDescription(markdown) {
  const match = markdown.match(FRONTMATTER_RE);
  if (!match)
    return markdown;
  const document = parseDocument(match[1]);
  const root = document.contents;
  const meta = document.get("meta");
  if (document.errors.length || !isMap(root) || !isMap(meta) || !meta.has("description"))
    return markdown;
  const description = meta.get("description", true);
  meta.delete("description");
  if (!meta.items.length)
    document.delete("meta");
  if (!document.has("description")) {
    const titleIndex = root.items.findIndex((pair) => isScalar(pair.key) && pair.key.value === "title");
    root.items.splice(titleIndex + 1, 0, document.createPair("description", description));
  }
  return `---
${document.toString({ lineWidth: 0 }).trimEnd()}
---
${markdown.slice(match[0].length)}`;
}

const frontmatter = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  buildFrontmatter: buildFrontmatter,
  hoistMetaDescription: hoistMetaDescription,
  layerFrontmatter: layerFrontmatter
}, Symbol.toStringTag, { value: 'Module' }));

const RE_NBSP = /\u00A0/g;
const JSON_LD_MAX_BYTES = 65536;
const JSON_LD_MAX_BLOCKS = 16;
const IMAGE_META_FIELDS = [
  "og:image",
  "og:image:url",
  "og:image:secure_url",
  "og:image:type",
  "og:image:width",
  "og:image:height",
  "og:image:alt",
  "twitter:image",
  "twitter:image:src",
  "twitter:image:alt"
];
function parseJsonLdBlock(text, remainingBytes) {
  if (text.length > remainingBytes)
    return { _tag: "Skipped" };
  const content = text.trim();
  if (!content)
    return { _tag: "Skipped" };
  let value;
  try {
    value = JSON.parse(text);
  } catch {
    return { _tag: "Skipped" };
  }
  const isObject = (item) => typeof item === "object" && item !== null && !Array.isArray(item);
  if (!isObject(value) && !(Array.isArray(value) && value.every(isObject)))
    return { _tag: "Skipped" };
  const markdown = `\`\`\`json
${content.replace(RE_NBSP, "\\u00a0")}
\`\`\``;
  const bytes = new TextEncoder().encode(markdown).byteLength + 2;
  if (bytes > remainingBytes)
    return { _tag: "Skipped" };
  return { _tag: "Preserved", markdown, bytes };
}
function normalizeWhitespace(text) {
  return text.replace(RE_NBSP, " ");
}
function buildMdreamOptions(url, mdreamOptions, meta, extractUpdatedAt, additionalFields) {
  const extraction = {
    "script[type]": (el) => {
      if (el.attributes.type?.trim().toLowerCase() !== "application/ld+json" || meta.jsonLd.blocks.length >= JSON_LD_MAX_BLOCKS)
        return;
      const block = parseJsonLdBlock(el.textContent, JSON_LD_MAX_BYTES - meta.jsonLd.bytes);
      if (block._tag === "Preserved") {
        meta.jsonLd.blocks.push(block.markdown);
        meta.jsonLd.bytes += block.bytes;
      }
    },
    'meta[name="keywords"]': (el) => {
      meta.metaKeywords = el.attributes.content || "";
    },
    "h1, h2, h3, h4, h5, h6": (el) => {
      const text = el.textContent?.trim();
      if (text)
        meta.headings.push({ [el.tagName.toLowerCase()]: text });
    },
    "p, li, td, th, blockquote, figcaption": (el) => {
      const text = el.textContent?.trim();
      if (text)
        meta.textContent.push(text);
    },
    ...extractUpdatedAt && {
      'meta[property="article:modified_time"], meta[name="last-modified"], meta[name="updated"], meta[property="og:updated_time"], meta[name="lastmod"]': (el) => {
        if (!meta.updatedAt && el.attributes.content)
          meta.updatedAt = el.attributes.content;
      }
    }
  };
  const frontmatter = {
    additionalFields,
    metaFields: [...IMAGE_META_FIELDS],
    onExtract: (fm) => {
      if (fm.title)
        meta.title = fm.title;
      if (fm.description)
        meta.description = fm.description;
    }
  };
  const origin = new URL(url).origin;
  return {
    origin,
    ...mdreamOptions,
    frontmatter,
    extraction: { ...extraction, ...mdreamOptions?.extraction }
  };
}
const RE_META_TAG = /<meta\b[^>]*>/gi;
const RE_META_KEY = /(?:property|name)=["']([^"']+)["']/i;
const RE_META_CONTENT = /content=["']([^"']*)["']/i;
const UPDATED_META_KEYS = /* @__PURE__ */ new Set([
  "article:modified_time",
  "og:updated_time",
  "last-modified",
  "lastmod",
  "updated"
]);
function extractLastUpdated(html) {
  RE_META_TAG.lastIndex = 0;
  let m;
  while ((m = RE_META_TAG.exec(html)) !== null) {
    const tag = m[0];
    const key = RE_META_KEY.exec(tag)?.[1];
    if (!key || !UPDATED_META_KEYS.has(key))
      continue;
    const content = RE_META_CONTENT.exec(tag)?.[1];
    if (content)
      return content;
  }
  return void 0;
}
async function convertHtmlToMarkdown(html, url, mdreamOptions, opts) {
  const meta = { title: "", description: "", metaKeywords: "", headings: [], textContent: [], jsonLd: { blocks: [], bytes: 0 } };
  const options = buildMdreamOptions(url, mdreamOptions, meta, opts.extractUpdatedAt ?? false, opts.additionalFrontmatter ?? {});
  const nitroApp = useNitroApp();
  await nitroApp.hooks.callHook("ai-ready:mdreamConfig", options);
  const convertedMarkdown = hoistMetaDescription(htmlToMarkdown(stripLlmsTxtDirectiveHtml(html), options));
  const context = {
    html,
    markdown: [convertedMarkdown, ...meta.jsonLd.blocks].join("\n\n"),
    route: opts.hooks.route,
    title: meta.title,
    description: meta.description,
    isPrerender: opts.hooks.isPrerender,
    event: opts.hooks.event
  };
  await nitroApp.hooks.callHook("ai-ready:page:markdown", context);
  const markdown = context.markdown;
  return {
    markdown: normalizeWhitespace(markdown),
    title: normalizeWhitespace(meta.title),
    description: normalizeWhitespace(meta.description),
    headings: meta.headings,
    metaKeywords: meta.metaKeywords,
    textContent: meta.textContent.join(" "),
    ...meta.updatedAt && { updatedAt: meta.updatedAt }
  };
}

const utils = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  convertHtmlToMarkdown: convertHtmlToMarkdown,
  extractLastUpdated: extractLastUpdated
}, Symbol.toStringTag, { value: 'Module' }));

const JSON_WRAPPER_OVERHEAD = 16;
const MAX_BODY_BYTES = MAX_SQL_QUERY_LENGTH * 6 + JSON_WRAPPER_OVERHEAD;
const _dQFLz9 = eventHandler(async (event) => {
  const contentLength = Number(getHeader(event, "content-length") || 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    throw createError$2({
      statusCode: 413,
      statusMessage: "Request body too large"
    });
  }
  const { sql } = await readBody(event);
  const collection = getRouterParam(event, "collection") || event.path?.split("/")?.[2] || "";
  assertSafeQuery(sql, collection);
  const conf = useRuntimeConfig$1().content;
  if (conf.integrityCheck) {
    await checkAndImportDatabaseIntegrity(event, collection, conf);
  }
  return (await loadDatabaseAdapter(conf)).all(sql);
});

const _4UaRKW = lazyEventHandler(() => {
  const opts = useRuntimeConfig$1().ipx || {};
  const fsDir = opts?.fs?.dir ? (Array.isArray(opts.fs.dir) ? opts.fs.dir : [opts.fs.dir]).map((dir) => isAbsolute(dir) ? dir : fileURLToPath(new URL(dir, globalThis._importMeta_.url))) : void 0;
  const fsStorage = opts.fs?.dir ? ipxFSStorage({ ...opts.fs, dir: fsDir }) : void 0;
  const httpStorage = opts.http?.domains ? ipxHttpStorage({ ...opts.http }) : void 0;
  if (!fsStorage && !httpStorage) {
    throw new Error("IPX storage is not configured!");
  }
  const ipxOptions = {
    ...opts,
    storage: fsStorage || httpStorage,
    httpStorage
  };
  const baseURL = (opts.baseURL || "/_ipx").replace(/\/+$/, "");
  const ipx = createIPX(ipxOptions);
  const nodeHandler = createIPXNodeHandler(ipx, {
    parseURL(url) {
      const parsedURL = new URL(url);
      let pathname = parsedURL.pathname;
      if (baseURL && (pathname === baseURL || pathname.startsWith(`${baseURL}/`))) {
        pathname = pathname.slice(baseURL.length) || "/";
      }
      return parseIPXURL(parsedURL.origin + pathname + parsedURL.search);
    }
  });
  return fromNodeMiddleware(nodeHandler);
});

const _lazy_R098Yb = () => import('../routes/api/chat.mjs');
const _lazy_WgT8Le = () => import('../routes/api/contact.mjs');
const _lazy_j6mNQj = () => import('../routes/api/github-stats.mjs');
const _lazy_j5LhRV = () => import('../routes/api/gitlab-stats.mjs');
const _lazy_ZA1syH = () => import('../routes/renderer.mjs');
const _lazy_Bi27dw = () => import('../routes/_og/d/image.mjs');
const _lazy_Kg32Qh = () => import('../routes/_og/r/resolve.mjs');
const _lazy_X5iLYK = () => import('../_/llms.txt.get.mjs');
const _lazy_qG0s0E = () => import('../routes/llms-full.txt.get.mjs');
const _lazy_h1TJUT = () => import('../routes/sitemap.md.get.mjs');

const handlers = [
  { route: '', handler: _rjytQs, lazy: false, middleware: true, method: undefined },
  { route: '/api/chat', handler: _lazy_R098Yb, lazy: true, middleware: false, method: undefined },
  { route: '/api/contact', handler: _lazy_WgT8Le, lazy: true, middleware: false, method: undefined },
  { route: '/api/github-stats', handler: _lazy_j6mNQj, lazy: true, middleware: false, method: undefined },
  { route: '/api/gitlab-stats', handler: _lazy_j5LhRV, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_ZA1syH, lazy: true, middleware: false, method: undefined },
  { route: '/api/_nuxt_icon/:collection', handler: _BLMzya, lazy: false, middleware: false, method: undefined },
  { route: '/robots.txt', handler: _3TejmD, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _vnz8S8, lazy: false, middleware: true, method: undefined },
  { route: '/__sitemap__/nuxt-content-urls.json', handler: _BrFx_q, lazy: false, middleware: false, method: undefined },
  { route: '/__sitemap__/style.xsl', handler: _Erkv8L, lazy: false, middleware: false, method: undefined },
  { route: '/sitemap.xml', handler: _rNJqzO, lazy: false, middleware: false, method: undefined },
  { route: '/_og/d/**', handler: _lazy_Bi27dw, lazy: true, middleware: false, method: undefined },
  { route: '/_og/d', handler: _lazy_Bi27dw, lazy: true, middleware: false, method: undefined },
  { route: '/_og/s/**', handler: _lazy_Bi27dw, lazy: true, middleware: false, method: undefined },
  { route: '/_og/s', handler: _lazy_Bi27dw, lazy: true, middleware: false, method: undefined },
  { route: '/_og/r/**', handler: _lazy_Kg32Qh, lazy: true, middleware: false, method: undefined },
  { route: '/_og/r', handler: _lazy_Kg32Qh, lazy: true, middleware: false, method: undefined },
  { route: '', handler: _Tie3pO, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _f7y4Wf, lazy: false, middleware: true, method: undefined },
  { route: '/__skew/health', handler: _tEI4nH, lazy: false, middleware: false, method: "get" },
  { route: '', handler: _WkWZEk, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _lazy_X5iLYK, lazy: true, middleware: true, method: undefined },
  { route: '/llms-full.txt', handler: _lazy_qG0s0E, lazy: true, middleware: false, method: undefined },
  { route: '/sitemap.md', handler: _lazy_h1TJUT, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_content/blog/sql_dump.txt', handler: _Jp3GX8, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/projects/sql_dump.txt', handler: _Jp3GX8, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/info/sql_dump.txt', handler: _Jp3GX8, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/blog/query', handler: _dQFLz9, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/projects/query', handler: _dQFLz9, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/info/query', handler: _dQFLz9, lazy: false, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _4UaRKW, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_ZA1syH, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig$1();
  const hooks = createHooks$1();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent$2(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent$2(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return C(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  {
    const _handler = h3App.handler;
    h3App.handler = (event) => {
      const ctx = { event };
      return nitroAsyncContext.callAsync(ctx, () => _handler(event));
    };
  }
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const _port = destr(process.env.NITRO_PORT || process.env.PORT);
const port = _port === 0 ? 0 : _port || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig$1().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { defu as $, NUXT_NO_SCRIPTS_PATTERNS as A, relative as B, joinURL as C, appTeleportTag as D, NUXT_PAGE_PATTERNS as E, defineRenderHandler as F, toRequestEvent as G, setResponseHeader as H, createModuleLogger as I, normalizeKey$1 as J, parseURL as K, extractEncodedSegment as L, digestCanonical as M, NUXT_PRERENDER_NO_SSR_ROUTES as N, createStorage as O, lruCacheDriver as P, hash$1 as Q, createNitroRouteRuleMatcher as R, fetchWithEvent$1 as S, componentNames as T, useOgImageRuntimeConfig as U, createSitePathResolver as V, verifyOgImageSignature as W, decodeOgImageParams as X, withoutTrailingSlash as Y, withQuery as Z, separateProps as _, assertMethod as a, digest as a$, sanitizeProps as a0, getSiteConfig as a1, extractSocialPreviewTags as a2, $fetch$1 as a3, prefixStorage as a4, withTrailingSlash as a5, useStorage as a6, handleCacheHeaders as a7, setHeaders as a8, H3Error as a9, parseDocument as aA, isMap as aB, isScalar as aC, stringify as aD, countPages as aE, sendIterable as aF, streamPages as aG, buildSitemapMd as aH, absoluteSiteUrl as aI, queryCollection as aJ, manifest as aK, fetchRawWithEvent as aL, createHooks as aM, isScriptProtocol as aN, sanitizeStatusCode as aO, baseURL as aP, klona as aQ, parseQuery as aR, hasProtocol as aS, titleCase as aT, toRouteMatcher as aU, createRouter$1 as aV, withoutBase as aW, withLeadingSlash as aX, withBase as aY, stringifyQuery as aZ, stringifyParsedURL as a_, appendResponseHeader as aa, getRequestHost as ab, sendRedirect$1 as ac, isInternalRoute as ad, collectSitemap as ae, staticSitemapConfig as af, logger$1 as ag, hasAssets as ah, createUniversalContext as ai, parseSitemap as aj, getCfEnv as ak, toLogicalRoute as al, getRequestURL as am, queryPages as an, queryPageMetadata as ao, toDeployedRoute as ap, normalizePersistedRoute as aq, withSiteUrl as ar, toMarkdownPath as as, decodePath as at, hasMarkdownTwin as au, withSiteTrailingSlash as av, eventHandler as aw, publicCacheControl as ax, defineCachedFunction as ay, escapeMarkdownHtml as az, getRequestIP as b, unavailable$1 as b0, resolveLocaleAlternateUrl as b1, encodeParam as b2, encodePath as b3, nodeServer as b4, createError$2 as c, defineEventHandler$1 as d, appRootTag as e, appRootAttrs as f, getRequestHeader$1 as g, appSpaLoaderTag as h, appSpaLoaderAttrs as i, buildAssetsURL as j, getRouteRules$1 as k, useRuntimeConfig$1 as l, createHead as m, unheadOptions as n, appId as o, publicAssetsURL as p, getQuery$2 as q, readBody as r, setHeader as s, appHead as t, useNitroApp as u, destr as v, writeEarlyHints as w, NUXT_SSR_STREAMING as x, renderSSRHeadOptions as y, appTeleportAttrs as z };
//# sourceMappingURL=nitro.mjs.map
