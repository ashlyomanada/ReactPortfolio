import { defineProdDiagnostics } from 'nostics';
import { ansiFormatter } from 'nostics/formatters/ansi';
import { shallowReactive, reactive, effectScope, getCurrentScope, hasInjectionContext, getCurrentInstance, inject, toRef, defineComponent, computed, h, shallowRef, provide, cloneVNode, createElementBlock, onServerPrefetch, toRaw, isRef, toValue, ref, nextTick, unref, queuePostFlushCb, createApp, onErrorCaptured, createVNode, resolveDynamicComponent, mergeProps, withCtx, createTextVNode, isVNode, createCommentVNode, resolveComponent, isReadonly, defineAsyncComponent, useSSRContext, Suspense, Fragment, toDisplayString, isShallow, isReactive } from 'vue';
import { aM as createHooks, c as createError, K as parseURL, at as decodePath, Z as withQuery, C as joinURL, aN as isScriptProtocol, aO as sanitizeStatusCode, a3 as $fetch, aP as baseURL, aQ as klona, Q as hash, p as publicAssetsURL, aR as parseQuery, aS as hasProtocol, a5 as withTrailingSlash, Y as withoutTrailingSlash, am as getRequestURL, $ as defu, aT as titleCase, aU as toRouteMatcher, aV as createRouter$1, aW as withoutBase, aX as withLeadingSlash, aY as withBase, aZ as stringifyQuery, a_ as stringifyParsedURL, a$ as digest } from '../nitro/nitro.mjs';
import * as import__Users_ccci_Desktop_Projects_ReactPortfolio_node_modules_unhead_dist_plugins_mjs from 'unhead/plugins';
import { FlatMetaPlugin, defineHeadPlugin, TemplateParamsPlugin } from 'unhead/plugins';
import { hasOwn, processTemplateParams, unpackMeta } from 'unhead/utils';
import { START_LOCATION, RouterView, createMemoryHistory, createRouter, isNavigationFailure, NavigationFailureType } from 'vue-router';
import { Icon, getIcon, loadIcon, _api, addAPIProvider, setCustomIconsLoader } from '@iconify/vue';
import { getIconCSS } from '@iconify/utils/lib/css/icon';
import { fnv1a64Base36 } from 'fnv1a-64';
import { identify } from 'object-identity';
import { isPlainObject } from '@vue/shared';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderTeleport, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';

// \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	__defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget);

function _getAsyncLocalStorage() {
	return globalThis.AsyncLocalStorage || globalThis.process?.getBuiltinModule?.("node:async_hooks")?.AsyncLocalStorage;
}
const _WeakRef = globalThis.WeakRef || class StrongRef {
	#value;
	constructor(value) {
		this.#value = value;
	}
	deref() {
		return this.#value;
	}
};
function createContext(opts = {}) {
	let currentInstance;
	let isSingleton = false;
	const checkConflict = (instance) => {
		if (currentInstance && currentInstance !== instance) throw new Error("Context conflict");
	};
	let als;
	if (opts.asyncContext) {
		const _AsyncLocalStorage = opts.AsyncLocalStorage || _getAsyncLocalStorage();
		if (_AsyncLocalStorage) als = new _AsyncLocalStorage();
		else console.warn("[unctx] `AsyncLocalStorage` is not provided.");
	}
	const _wrapInstance = (instance) => als && instance !== null && typeof instance === "object" ? { __unctx_weak: new _WeakRef(instance) } : instance;
	const _unwrapInstance = (store) => store && store.__unctx_weak ? store.__unctx_weak.deref() : store;
	const _getCurrentInstance = () => {
		if (als) {
			const store = als.getStore();
			if (store !== void 0) return _unwrapInstance(store);
		}
		return currentInstance;
	};
	return {
		use: () => {
			const _instance = _getCurrentInstance();
			if (_instance === void 0) throw new Error("Context is not available");
			return _instance;
		},
		tryUse: () => {
			return _getCurrentInstance() ?? null;
		},
		set: (instance, replace) => {
			if (!replace) checkConflict(instance);
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
				return als ? als.run(_wrapInstance(instance), callback) : callback();
			} finally {
				if (!isSingleton) currentInstance = void 0;
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
				const r = als ? als.run(_wrapInstance(instance), callback) : callback();
				if (!isSingleton) currentInstance = void 0;
				return await r;
			} finally {
				asyncHandlers.delete(onLeave);
			}
		}
	};
}
function createNamespace(defaultOpts = {}) {
	const contexts = {};
	return { get(key, opts = {}) {
		if (!contexts[key]) contexts[key] = createContext({
			...defaultOpts,
			...opts
		});
		return contexts[key];
	} };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
	const restores = [];
	for (const leaveHandler of asyncHandlers) {
		const restore = leaveHandler();
		if (restore) restores.push(restore);
	}
	const restore = () => {
		for (const restore of restores) restore();
	};
	let awaitable = function_();
	if (awaitable && typeof awaitable === "object" && "catch" in awaitable) awaitable = awaitable.catch((error) => {
		restore();
		throw error;
	});
	return [awaitable, restore];
}

// node_modules/nuxt/dist/app/diagnostics/_shared.js
/**
* Shared configuration for the runtime (E<N>xxx) diagnostics catalogs.
*
* Catalogs are split by domain and imported directly where used (no barrel),
* so the browser bundle only pulls in the codes a module references. Pair the
* pure-call annotations on each `defineDiagnostics()` with dev-guarded,
* statement-level report calls so report-only diagnostics strip from production.
*
* Codes are stable, fully-qualified `NUXT_E<NNNN>` identifiers. Codes with a
* dedicated docs page resolve a `see:` URL via {@link docsBase}; the rest opt
* out with `docs: false`.
*/
function docsBase(code) {
	return `https://nuxt.com/docs/4.x/errors/${code.replace("NUXT_", "").toLowerCase()}`;
}
var ansi = (open, close) => (s) => `\x1B[${open}m${s}\x1B[${close}m`;
var colors = {
	red: ansi(31, 39),
	yellow: ansi(33, 39),
	cyan: ansi(36, 39),
	gray: ansi(90, 39),
	bold: ansi(1, 22),
	dim: ansi(2, 22)
};
ansiFormatter(colors);
var prodReporter = (diagnostic) => {
	console.error(`[${diagnostic.name}]`);
};
var prodReporters = [prodReporter];
// node_modules/nuxt/dist/app/diagnostics/core.js
/**
* E1xxx
* Core / Nuxt-instance / lifecycle runtime diagnostics.
*/
var appDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/nuxt/dist/app/internal/context.js
globalThis.__nuxt_app_ctx__ ||= {};
function getContext$2(key, opts) {
	return getContext(key, opts);
}
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fnuxt.config.mjs
var nuxtLinkDefaults = {
	"componentName": "NuxtLink"};
var asyncDataDefaults = { "deep": false };
var fetchDefaults = {};
// node_modules/nuxt/dist/app/nuxt.js
function getNuxtAppCtx(id = "nuxt-app") {
	return getContext$2(id, { asyncContext: false });
}
var NuxtPluginIndicator = "__nuxt_plugin";
/** @since 3.0.0 */
function createNuxtApp(options) {
	let hydratingCount = 0;
	const nuxtApp = {
		_id: options.id || "nuxt-app",
		_scope: effectScope(),
		provide: void 0,
		versions: {
			get nuxt() {
				return "4.6.3";
			},
			get vue() {
				return nuxtApp.vueApp.version;
			}
		},
		payload: shallowReactive({
			...options.ssrContext?.payload || {},
			data: shallowReactive({}),
			state: reactive({}),
			once: /* @__PURE__ */ new Set(),
			_errors: shallowReactive({})
		}),
		static: { data: {} },
		runWithContext(fn) {
			if (nuxtApp._scope.active && !getCurrentScope()) return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
			return callWithNuxt(nuxtApp, fn);
		},
		isHydrating: false,
		deferHydration() {
			if (!nuxtApp.isHydrating) return () => {};
			hydratingCount++;
			let called = false;
			return () => {
				if (called) return;
				called = true;
				hydratingCount--;
				if (hydratingCount === 0) {
					nuxtApp.isHydrating = false;
					return nuxtApp.callHook("app:suspense:resolve");
				}
			};
		},
		_asyncDataPromises: {},
		_asyncData: shallowReactive({}),
		_state: shallowReactive({}),
		_payloadRevivers: {},
		...options
	};
	nuxtApp.payload.serverRendered = true;
	if (nuxtApp.ssrContext) {
		nuxtApp.payload.path = nuxtApp.ssrContext.url;
		nuxtApp.ssrContext.nuxt = nuxtApp;
		nuxtApp.ssrContext.payload = nuxtApp.payload;
		nuxtApp.ssrContext.config = {
			public: nuxtApp.ssrContext.runtimeConfig.public,
			app: nuxtApp.ssrContext.runtimeConfig.app
		};
	}
	nuxtApp.hooks = createHooks();
	nuxtApp.hook = nuxtApp.hooks.hook;
	{
		const runHooks = async (hooks, args) => {
			for (const hook of hooks) await nuxtApp.runWithContext(() => hook(...args));
		};
		const contextCaller = runHooks;
		nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, args);
	}
	nuxtApp.callHook = nuxtApp.hooks.callHook;
	nuxtApp.provide = (name, value) => {
		const $name = "$" + name;
		defineGetter(nuxtApp, $name, value);
		defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
	};
	defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
	defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
	const runtimeConfig = options.ssrContext.runtimeConfig;
	nuxtApp.provide("config", runtimeConfig);
	return nuxtApp;
}
/** @since 3.0.0 */
async function applyPlugin(nuxtApp, plugin) {
	if (typeof plugin === "function") {
		const run = () => nuxtApp.runWithContext(() => plugin(nuxtApp));
		const { provide } = await run() || {};
		if (provide && typeof provide === "object") for (const key in provide) nuxtApp.provide(key, provide[key]);
	}
}
/** @since 3.0.0 */
async function applyPlugins(nuxtApp, plugins) {
	return applyPluginsWithDependencies(nuxtApp, plugins);
}
async function applyPluginsWithDependencies(nuxtApp, plugins) {
	const resolvedPlugins = /* @__PURE__ */ new Set();
	const unresolvedPlugins = [];
	const parallels = [];
	let error;
	let promiseDepth = 0;
	async function executePlugin(plugin) {
		const unresolvedPluginsForThisPlugin = plugin.dependsOn?.filter((name) => plugins.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
		if (unresolvedPluginsForThisPlugin.length > 0) unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin]);
		else {
			const promise = applyPlugin(nuxtApp, plugin).then(async () => {
				if (plugin._name) {
					resolvedPlugins.add(plugin._name);
					await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
						if (dependsOn.has(plugin._name)) {
							dependsOn.delete(plugin._name);
							if (dependsOn.size === 0) {
								promiseDepth++;
								await executePlugin(unexecutedPlugin);
							}
						}
					}));
				}
			}).catch((e) => {
				if (!plugin.parallel && !nuxtApp.payload.error) throw e;
				error ||= e;
			});
			if (plugin.parallel) parallels.push(promise);
			else await promise;
		}
	}
	for (const plugin of plugins) await executePlugin(plugin);
	await Promise.all(parallels);
	if (promiseDepth) for (let i = 0; i < promiseDepth; i++) await Promise.all(parallels);
	if (error) throw nuxtApp.payload.error || error;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtPlugin(plugin) {
	if (typeof plugin === "function") return plugin;
	const _name = plugin._name || plugin.name;
	delete plugin.name;
	return Object.assign(plugin.setup || (() => {}), plugin, {
		[NuxtPluginIndicator]: true,
		_name
	});
}
/**
* Ensures that the setup function passed in has access to the Nuxt instance via `useNuxtApp`.
* @param nuxt A Nuxt instance
* @param setup The function to call
* @since 3.0.0
*/
function callWithNuxt(nuxt, setup, args) {
	const fn = () => setup();
	const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
	return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
}
function tryUseNuxtApp(id) {
	let nuxtAppInstance;
	if (hasInjectionContext()) nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
	nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
	return nuxtAppInstance || null;
}
function useNuxtApp(id) {
	const nuxtAppInstance = tryUseNuxtApp(id);
	if (!nuxtAppInstance) throw appDiagnostics.NUXT_E1001();
	return nuxtAppInstance;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function useRuntimeConfig(_event) {
	return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
	Object.defineProperty(obj, key, { get: () => val });
}

// node_modules/nuxt/dist/app/error.js
var NUXT_ERROR_SIGNATURE = "__nuxt_error";
/** @since 3.0.0 */
var isNuxtError = (error) => !!error && typeof error === "object" && "__nuxt_error" in error;
/** @since 3.0.0 */
var createError$2 = (error) => {
	if (isNuxtError(error)) return error;
	if (typeof error !== "string" && error?.statusText) error.message ??= error.statusText;
	const nuxtError = createError(error ?? {});
	Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
		value: true,
		configurable: false,
		writable: false
	});
	Object.defineProperty(nuxtError, "status", {
		get: () => nuxtError.statusCode,
		configurable: true
	});
	Object.defineProperty(nuxtError, "statusText", {
		get: () => nuxtError.statusMessage,
		configurable: true
	});
	return nuxtError;
};
// node_modules/nuxt/dist/app/utils.js
var PROBE_BASE_A = "https://a.invalid/probe/";
var PROBE_BASE_B = "https://b.invalid/probe/";
function parseAnchorURL(value, base = PROBE_BASE_A) {
	try {
		return new URL(value, base);
	} catch {
		return null;
	}
}
function resolvesWithoutBase(value) {
	const resolved = parseAnchorURL(value);
	return !!resolved && resolved.href === parseAnchorURL(value, PROBE_BASE_B)?.href;
}
/** Whether a URL string is a path rooted at the current origin, so carries no protocol. */
function isRootedPath(value) {
	if (value[0] !== "/" || value[1] === "/" || value[1] === "\\") return false;
	return value[1] !== "	" && value[1] !== "\n" && value[1] !== "\r" || !resolvesWithoutBase(value);
}
/** Whether a URL string carries its own protocol or authority. */
function isAbsoluteHref(value) {
	return !!value && !isRootedPath(value) && resolvesWithoutBase(value);
}
/** The script-capable protocol a URL string would navigate to, or `null` when it is safe. */
function getScriptProtocol(value) {
	if (!value || isRootedPath(value)) return null;
	let resolved = parseAnchorURL(value.replace(/[\u0000-\u001F\u007F\s]+/g, ""));
	while (resolved?.protocol === "view-source:") resolved = parseAnchorURL(resolved.pathname);
	if (!resolved) return "";
	return isScriptProtocol(resolved.protocol) ? resolved.protocol : null;
}
/** Returns the value unchanged when safe to use as an anchor `href`, or `null`. */
function sanitizeAnchorHref(value) {
	return getScriptProtocol(value) === null ? value : null;
}
// node_modules/nuxt/dist/app/components/injections.js
var LayoutMetaSymbol = Symbol("layout-meta");
var PageRouteSymbol = Symbol("route");
// node_modules/nuxt/dist/app/diagnostics/navigation.js
/**
* E2xxx
* Navigation / routing / middleware runtime diagnostics.
*/
var navigationDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/nuxt/dist/app/composables/router.js
/** @since 3.0.0 */
var useRouter = (() => {
	return useNuxtApp()?.$router;
});
/**
* Whether the current effect scope is (a descendant of) the component instance's scope.
* A detached scope (e.g. `createSharedComposable`) outlives the component, so the
* per-page route injected there would freeze after navigation (#18903).
*/
function getParentScope(scope) {
	const internal = scope;
	return internal.parent ?? internal.subs?.sub;
}
function isScopeWithinInstance(instance) {
	const instanceScope = instance.scope;
	let scope = getCurrentScope();
	while (scope) {
		if (scope === instanceScope) return true;
		scope = getParentScope(scope);
	}
	return false;
}
/** @since 3.0.0 */
var useRoute = (() => {
	if (hasInjectionContext()) {
		const instance = getCurrentInstance();
		if (!instance || isScopeWithinInstance(instance)) return inject(PageRouteSymbol, useNuxtApp()._route);
	}
	return useNuxtApp()._route;
});
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtRouteMiddleware(middleware) {
	return middleware;
}
/** @since 3.0.0 */
var isProcessingMiddleware = () => {
	try {
		if (useNuxtApp()._processingMiddleware) return true;
	} catch {
		return false;
	}
	return false;
};
var HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
var HTML_ATTR_ENCODE_MAP = {
	"&": "&amp;",
	"\"": "&quot;",
	"'": "&#x27;",
	"<": "&lt;",
	">": "&gt;"
};
function encodeForHtmlAttr(value) {
	return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
function navigateTo(to, options) {
	to ||= "/";
	const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
	const isExternalHost = isAbsoluteHref(toPath);
	const isExternal = options?.external || isExternalHost;
	if (isExternal) {
		if (!options?.external) throw navigationDiagnostics.NUXT_E2001({ toPath });
		const protocol = getScriptProtocol(toPath);
		if (protocol !== null) throw navigationDiagnostics.NUXT_E2002({
			toPath,
			protocol
		});
	}
	const inMiddleware = isProcessingMiddleware();
	const router = useRouter();
	const nuxtApp = useNuxtApp();
	if (nuxtApp.ssrContext) {
		const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
		const location = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
		const redirect = async function(response) {
			await nuxtApp.callHook("app:redirected");
			const encodedHeader = encodeURL(location, isExternalHost);
			const encodedLoc = encodeForHtmlAttr(encodedHeader);
			nuxtApp.ssrContext["~renderResponse"] = {
				statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
				body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
				headers: { location: encodedHeader }
			};
			return response;
		};
		if (!isExternal && inMiddleware) {
			let expectedPath = fullPath;
			if (typeof to === "string" && toPath.includes("?")) {
				const target = router.resolve(to);
				expectedPath = router.resolve({
					path: target.path,
					query: target.query,
					hash: target.hash
				}).fullPath || "/";
			}
			router.afterEach((final) => final.fullPath === expectedPath ? redirect(false) : void 0);
			return to;
		}
		return redirect(!inMiddleware ? void 0 : false);
	}
	if (isExternal) {
		nuxtApp._cookieWriters?.forEach((write) => write());
		(void 0).addEventListener("pagehide", (event) => {
			if (!event.persisted) nuxtApp._scope.stop();
		}, { once: true });
		if (options?.replace) (void 0).replace(toPath);
		else (void 0).href = toPath;
		if (inMiddleware) {
			if (!nuxtApp.isHydrating) return false;
			return new Promise(() => {});
		}
		return Promise.resolve();
	}
	const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
	return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
}
/**
* @internal
*/
function resolveRouteObject(to) {
	return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
/**
* @internal
*/
function encodeURL(location, isExternalHost = false) {
	const url = new URL(location, "http://localhost");
	if (!isExternalHost) return url.pathname.replace(/^\/{2,}/, "/") + url.search + url.hash;
	if (location.startsWith("//")) return url.toString().replace(url.protocol, "");
	return url.toString();
}
/**
* Encode the pathname of a route location string. Ensures decoded paths like
* `/café` are percent-encoded to match vue-router's encoded route records.
* Already-encoded paths are not double-encoded.
* @internal
*/
function encodeRoutePath(url) {
	const parsed = parseURL(url);
	return encodeVueRouterPath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
var ENC_PIPE_RE = /%7C/g;
var ENC_BRACKET_OPEN_RE = /%5B/g;
var ENC_BRACKET_CLOSE_RE = /%5D/g;
var ENC_ENC_SLASH_RE = /%252F/gi;
var HASH_RE$1 = /#/g;
var QUESTION_MARK_RE = /\?/g;
/**
* Apply vue-router's own path encoding, which leaves sub-delimiters like `&`
* and `+` literal. This must stay in sync with `encodeVueRouterPath` in
* `unrouting`, which encodes the route records we need to match against.
*/
function encodeVueRouterPath(value) {
	return encodeURI(value).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]").replace(HASH_RE$1, "%23").replace(QUESTION_MARK_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F");
}
// node_modules/nuxt/dist/app/composables/error.js
/** @since 3.0.0 */
var useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
/** @since 3.0.0 */
var showError = (error) => {
	const nuxtError = createError$2(error);
	try {
		const error = /* @__PURE__ */ useError();
		error.value ||= nuxtError;
	} catch {
		throw nuxtError;
	}
	return nuxtError;
};
/**
* Show the error page unless the current client is a crawler, in which case the
* bot receives the already server-rendered HTML instead (#32137, #35338).
*
* @internal
*/
var _showErrorUnlessCrawler = async (nuxtApp, error) => {
	await nuxtApp.runWithContext(() => showError(error));
};

// node_modules/nuxt/dist/app/diagnostics/head.js
/**
* E6xxx
* Head / unhead runtime diagnostics.
*/
var unheadDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/@unhead/vue/dist/shared/vue.DKb5ZKVl.mjs
var headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function injectHead$1() {
	if (hasInjectionContext()) {
		const instance = inject(headSymbol);
		if (instance) return instance;
	}
	throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
}
// node_modules/@unhead/vue/dist/shared/vue.CXwiCT15.mjs
function useHead$1(input, options = {}) {
	return (options.head || /* @__PURE__ */ injectHead$1()).push(input || {}, options);
}
function normalizeSeoMetaInput(input) {
	if (input._flatMeta) return input;
	const meta = {};
	for (const key in input) {
		if (!hasOwn(input, key) || key === "title" || key === "titleTemplate") continue;
		meta[key] = input[key];
	}
	return {
		title: input.title,
		titleTemplate: input.titleTemplate,
		_flatMeta: meta
	};
}
function useSeoMeta$1(input = {}, options = {}) {
	(options.head || /* @__PURE__ */ injectHead$1()).use(FlatMetaPlugin);
	const entry = useHead$1(normalizeSeoMetaInput(input), options);
	const corePatch = entry.patch;
	if (!entry.__patched) {
		entry.patch = (input2) => corePatch(normalizeSeoMetaInput(input2));
		entry.__patched = true;
	}
	return entry;
}
// node_modules/nuxt/dist/head/runtime/composables.js
/**
* Injects the head client from the Nuxt context or Vue inject.
*/
function injectHead(nuxtApp) {
	const nuxt = nuxtApp || useNuxtApp();
	return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
		if (hasInjectionContext()) {
			const head = inject("usehead");
			if (!head) throw unheadDiagnostics.NUXT_E6001();
			return head;
		}
	});
}
function useHead(input, options = {}) {
	return useHead$1(input, {
		head: options.head || injectHead(options.nuxt),
		...options
	});
}
function useSeoMeta(input, options = {}) {
	return useSeoMeta$1(input, {
		head: options.head || injectHead(options.nuxt),
		...options
	});
}

// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Ffetch.mjs
if (!globalThis.$fetch) globalThis.$fetch = $fetch.create({ baseURL: baseURL() });
var $fetch$2 = globalThis.$fetch;
// node_modules/nuxt/dist/app/composables/ssr.js
var $fetch$1$1 = $fetch$2;
/** @since 3.0.0 */
function useRequestEvent(nuxtApp) {
	nuxtApp ||= useNuxtApp();
	return nuxtApp.ssrContext?.event;
}
/** @since 3.2.0 */
function useRequestFetch() {
	return useRequestEvent()?.$fetch || $fetch$1$1;
}

// node_modules/nuxt/dist/app/components/vfor.js
/**
* Upper bound on `v-for` iterations expanded server-side in a server component or island.
* Island props are attacker-controllable, so a large numeric `v-for` source is a
* memory-amplification vector; this caps it.
*
* @internal
*/
var MAX_VFOR_LENGTH = 1e4;
/**
* Clamp a numeric `v-for` source before iteration. Only numbers are bounded (the
* amplification vector); other sources are returned unchanged.
*
* @internal
*/
function vforBound(source) {
	if (typeof source !== "number" || source <= 1e4) return source;
	return MAX_VFOR_LENGTH;
}
// node_modules/nuxt/dist/app/components/utils.js
var ROUTE_KEY_PARENTHESES_RE$1 = /(:\w+)\([^)]+\)/g;
var ROUTE_KEY_SYMBOLS_RE$1 = /(:\w+)[?+*]/g;
var ROUTE_KEY_NORMAL_RE$1 = /:\w+/g;
function generateRouteKey$1(route) {
	const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE$1, "$1").replace(ROUTE_KEY_SYMBOLS_RE$1, "$1").replace(ROUTE_KEY_NORMAL_RE$1, (r) => route.params[r.slice(1)]?.toString() || "");
	return typeof source === "function" ? source(route) : source;
}
/**
* Utility used within router guards
* return true if the route has been changed with a page change during navigation
*/
function isChangingPage(to, from) {
	if (to === from || from === START_LOCATION) return false;
	if (generateRouteKey$1(to) !== generateRouteKey$1(from)) return true;
	if (to.matched.every((comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default)) return false;
	return true;
}
var VALID_TAG_RE = /^[a-z][a-z0-9-]*$/i;
/** Return `tag` if it is a safe HTML tag name, otherwise `fallback`. */
function sanitizeTag(tag, fallback) {
	return tag && VALID_TAG_RE.test(tag) ? tag : fallback;
}

// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fapp.config.mjs
var inlineConfig = {
	"nuxt": {},
	"icon": {
		"provider": "server",
		"class": "",
		"aliases": {},
		"iconifyApiEndpoint": "https://api.iconify.design",
		"localApiEndpoint": "/api/_nuxt_icon",
		"fallbackToApi": true,
		"cssSelectorPrefix": "i-",
		"cssWherePseudo": true,
		"mode": "css",
		"attrs": { "aria-hidden": true },
		"collections": [
			"academicons",
			"akar-icons",
			"ant-design",
			"arcticons",
			"basil",
			"bi",
			"bitcoin-icons",
			"bpmn",
			"brandico",
			"bx",
			"bxl",
			"bxs",
			"bytesize",
			"carbon",
			"catppuccin",
			"cbi",
			"charm",
			"ci",
			"cib",
			"cif",
			"cil",
			"circle-flags",
			"circum",
			"clarity",
			"codex",
			"codicon",
			"covid",
			"cryptocurrency",
			"cryptocurrency-color",
			"cuida",
			"dashicons",
			"devicon",
			"devicon-plain",
			"dinkie-icons",
			"duo-icons",
			"ei",
			"el",
			"emojione",
			"emojione-monotone",
			"emojione-v1",
			"entypo",
			"entypo-social",
			"eos-icons",
			"ep",
			"et",
			"eva",
			"f7",
			"fa",
			"fa-brands",
			"fa-regular",
			"fa-solid",
			"fa6-brands",
			"fa6-regular",
			"fa6-solid",
			"fa7-brands",
			"fa7-regular",
			"fa7-solid",
			"fad",
			"famicons",
			"fe",
			"feather",
			"file-icons",
			"flag",
			"flagpack",
			"flat-color-icons",
			"flat-ui",
			"flowbite",
			"fluent",
			"fluent-color",
			"fluent-emoji",
			"fluent-emoji-flat",
			"fluent-emoji-high-contrast",
			"fluent-mdl2",
			"fontelico",
			"fontisto",
			"formkit",
			"foundation",
			"fxemoji",
			"gala",
			"game-icons",
			"garden",
			"geo",
			"gg",
			"gis",
			"gravity-ui",
			"gridicons",
			"grommet-icons",
			"guidance",
			"healthicons",
			"heroicons",
			"heroicons-outline",
			"heroicons-solid",
			"hugeicons",
			"humbleicons",
			"ic",
			"icomoon-free",
			"icon-park",
			"icon-park-outline",
			"icon-park-solid",
			"icon-park-twotone",
			"iconamoon",
			"iconoir",
			"icons8",
			"il",
			"ion",
			"iwwa",
			"ix",
			"jam",
			"la",
			"lets-icons",
			"line-md",
			"lineicons",
			"logos",
			"ls",
			"lsicon",
			"lucide",
			"lucide-lab",
			"mage",
			"majesticons",
			"maki",
			"map",
			"marketeq",
			"material-icon-theme",
			"material-symbols",
			"material-symbols-light",
			"mdi",
			"mdi-light",
			"medical-icon",
			"memory",
			"meteocons",
			"meteor-icons",
			"mi",
			"mingcute",
			"mono-icons",
			"mynaui",
			"nimbus",
			"nonicons",
			"noto",
			"noto-v1",
			"nrk",
			"octicon",
			"oi",
			"ooui",
			"openmoji",
			"oui",
			"pajamas",
			"pepicons",
			"pepicons-pencil",
			"pepicons-pop",
			"pepicons-print",
			"ph",
			"picon",
			"pixel",
			"pixelarticons",
			"prime",
			"proicons",
			"ps",
			"qlementine-icons",
			"quill",
			"radix-icons",
			"raphael",
			"ri",
			"rivet-icons",
			"roentgen",
			"si",
			"si-glyph",
			"sidekickicons",
			"simple-icons",
			"simple-line-icons",
			"skill-icons",
			"solar",
			"stash",
			"streamline",
			"streamline-block",
			"streamline-color",
			"streamline-cyber",
			"streamline-cyber-color",
			"streamline-emojis",
			"streamline-flex",
			"streamline-flex-color",
			"streamline-freehand",
			"streamline-freehand-color",
			"streamline-kameleon-color",
			"streamline-logos",
			"streamline-pixel",
			"streamline-plump",
			"streamline-plump-color",
			"streamline-sharp",
			"streamline-sharp-color",
			"streamline-stickies-color",
			"streamline-ultimate",
			"streamline-ultimate-color",
			"subway",
			"svg-spinners",
			"system-uicons",
			"tabler",
			"tdesign",
			"teenyicons",
			"temaki",
			"token",
			"token-branded",
			"topcoat",
			"twemoji",
			"typcn",
			"uil",
			"uim",
			"uis",
			"uit",
			"uiw",
			"unjs",
			"vaadin",
			"vs",
			"vscode-icons",
			"websymbol",
			"weui",
			"whh",
			"wi",
			"wpf",
			"zmdi",
			"zondicons"
		],
		"fetchTimeout": 1500
	}
};
// node_modules/nuxt/dist/app/config.js
function useAppConfig() {
	const nuxtApp = useNuxtApp();
	nuxtApp._appConfig ||= klona(inlineConfig);
	return nuxtApp._appConfig;
}
// node_modules/nuxt/dist/app/utils/debounce-tick.js
/**
* Debounce an async function so that repeated calls within the same tick are
* collapsed into a single call (plus a trailing call if arguments arrived
* while the debounced call was still pending).
*
* Adapted from https://github.com/unjs/perfect-debounce with the timeout
* replaced by Vue's post-flush callback queue.
*/
function debounceTick(fn, options = {}) {
	let leadingValue;
	let active = false;
	let resolveList = [];
	let currentPromise;
	let trailingArgs;
	const applyFn = (_this, args) => {
		const promise = _applyPromised(fn, _this, args);
		currentPromise = promise;
		promise.finally(() => {
			currentPromise = void 0;
			if (trailingArgs && !active) {
				const args = trailingArgs;
				trailingArgs = void 0;
				applyFn(_this, args);
			}
		});
		return promise;
	};
	return function(...args) {
		trailingArgs = args;
		if (currentPromise) return currentPromise;
		return new Promise((resolve) => {
			const shouldCallNow = options.leading && !active;
			if (!active) {
				active = true;
				queuePostFlushCb(() => {
					active = false;
					const flushArgs = trailingArgs ?? args;
					trailingArgs = void 0;
					const promise = options.leading ? leadingValue : applyFn(this, flushArgs);
					for (const _resolve of resolveList) _resolve(promise);
					resolveList = [];
				});
			}
			if (shouldCallNow) {
				leadingValue = applyFn(this, args);
				resolve(leadingValue);
			} else resolveList.push(resolve);
		});
	};
}
async function _applyPromised(fn, _this, args) {
	return await fn.apply(_this, args);
}
defineComponent({
	name: "ServerPlaceholder",
	render() {
		return createElementBlock("div");
	}
});
// node_modules/nuxt/dist/app/components/client-only.js
var clientOnlySymbol = Symbol.for("nuxt:client-only");
var ClientOnly = defineComponent({
	name: "ClientOnly",
	inheritAttrs: false,
	props: [
		"fallback",
		"placeholder",
		"placeholderTag",
		"fallbackTag"
	],
	setup(props, { slots, attrs }) {
		const mounted = shallowRef(false);
		const vm = getCurrentInstance();
		if (vm) vm._nuxtClientOnly = true;
		provide(clientOnlySymbol, true);
		return () => {
			if (mounted.value) {
				const vnodes = slots.default?.();
				if (vnodes && vnodes.length === 1 && true) return [cloneVNode(vnodes[0], attrs)];
				return vnodes;
			}
			const slot = slots.fallback || slots.placeholder;
			if (slot) return h(slot);
			const fallbackStr = props.fallback || props.placeholder || "";
			const fallbackTag = sanitizeTag(props.fallbackTag || props.placeholderTag, "span");
			return createElementBlock(fallbackTag, attrs, fallbackStr);
		};
	}
});
// node_modules/nuxt/dist/app/diagnostics/data.js
/**
* E3xxx
* Data fetching (useFetch / useAsyncData) runtime diagnostics.
*/
var dataDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/nuxt/dist/app/composables/asyncData.js
/** @internal */
function _createUseAsyncData(options = {}) {
	{
		function useAsyncData(...args) {
			const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
			if (_isAutoKeyNeeded(args[0], args[1])) args.unshift(autoKey);
			let [_key, _handler, opts = {}] = args;
			const key = isRef(_key) || typeof _key === "function" ? computed(() => toValue(_key)) : { value: _key };
			if (!key.value || typeof key.value !== "string") throw dataDiagnostics.NUXT_E3008();
			if (typeof _handler !== "function") throw dataDiagnostics.NUXT_E3009();
			const shouldFactoryOptionsOverride = typeof options === "function";
			const nuxtApp = useNuxtApp();
			const factoryOptions = shouldFactoryOptionsOverride ? options(opts) : options;
			if (!shouldFactoryOptionsOverride) for (const key in factoryOptions) {
				if (factoryOptions[key] === void 0) continue;
				if (opts[key] !== void 0) continue;
				opts[key] = factoryOptions[key];
			}
			opts.server ??= true;
			opts.default ??= getDefault;
			opts.getCachedData ??= getDefaultCachedData;
			opts.lazy ??= false;
			opts.immediate ??= true;
			opts.deep ??= asyncDataDefaults.deep;
			opts.dedupe ??= "cancel";
			opts.enabled ??= true;
			if (shouldFactoryOptionsOverride) for (const key in factoryOptions) {
				if (factoryOptions[key] === void 0) continue;
				opts[key] = factoryOptions[key];
			}
			nuxtApp._asyncData[key.value];
			let lastEntry;
			const getEntry = () => nuxtApp._asyncData[key.value] ?? lastEntry;
			function createInitialFetch() {
				const initialFetchOptions = {
					cause: "initial",
					dedupe: opts.dedupe
				};
				const existing = nuxtApp._asyncData[key.value];
				if (!existing?._init) {
					initialFetchOptions.cachedData = opts.getCachedData(key.value, nuxtApp, { cause: "initial" });
					nuxtApp._asyncData[key.value] = buildAsyncData(nuxtApp, key.value, _handler, opts, initialFetchOptions.cachedData);
					nuxtApp._asyncData[key.value]._initialCachedData = initialFetchOptions.cachedData;
				} else if (nuxtApp._asyncDataPromises[key.value]) initialFetchOptions.cachedData = existing._initialCachedData;
				lastEntry = nuxtApp._asyncData[key.value];
				return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
			}
			const initialFetch = createInitialFetch();
			const asyncData = nuxtApp._asyncData[key.value];
			asyncData._deps++;
			const fetchOnServer = opts.server !== false && nuxtApp.payload.serverRendered;
			const isWithinVaporComponent = () => {
				return false;
			};
			if (fetchOnServer && opts.immediate) {
				const promise = initialFetch();
				if (getCurrentInstance() || isWithinVaporComponent()) onServerPrefetch(() => promise);
				else nuxtApp.hook("app:created", async () => {
					await promise;
				});
			}
			const asyncReturn = {
				data: writableComputedRef(() => getEntry()?.data, !opts.deep),
				pending: writableComputedRef(() => getEntry()?.pending),
				status: writableComputedRef(() => getEntry()?.status),
				error: writableComputedRef(() => getEntry()?.error),
				refresh: (...args) => {
					if (!nuxtApp._asyncData[key.value]?._init) return createInitialFetch()();
					return nuxtApp._asyncData[key.value].execute(...args);
				},
				execute: (...args) => asyncReturn.refresh(...args),
				clear: () => {
					const entry = nuxtApp._asyncData[key.value];
					if (entry?._abortController) try {
						entry._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
					} finally {
						entry._abortController = void 0;
					}
					clearNuxtDataByKey(nuxtApp, key.value);
				}
			};
			const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
			Object.assign(asyncDataPromise, asyncReturn);
			Object.defineProperties(asyncDataPromise, {
				then: {
					enumerable: true,
					value: asyncDataPromise.then.bind(asyncDataPromise)
				},
				catch: {
					enumerable: true,
					value: asyncDataPromise.catch.bind(asyncDataPromise)
				},
				finally: {
					enumerable: true,
					value: asyncDataPromise.finally.bind(asyncDataPromise)
				}
			});
			return asyncDataPromise;
		}
		return useAsyncData;
	}
}
var useAsyncData = _createUseAsyncData();
function writableComputedRef(getter, shallow = false) {
	const forwardedRef = computed({
		get() {
			return getter()?.value;
		},
		set(value) {
			const ref = getter();
			if (ref) ref.value = value;
		}
	});
	if (shallow) forwardedRef.__v_isShallow = true;
	return forwardedRef;
}
/** @internal */
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
	if (typeof keyOrFetcher === "string") return false;
	if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) return false;
	if (typeof keyOrFetcher === "function" && typeof fetcher === "function") return false;
	return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
	delete nuxtApp.payload.data[key];
	delete nuxtApp.payload._errors[key];
	if (nuxtApp._asyncData[key]) {
		nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
		nuxtApp._asyncData[key].error.value = void 0;
		nuxtApp._asyncData[key].status.value = "idle";
		nuxtApp._asyncData[key]._initialCachedData = void 0;
	}
	delete nuxtApp._asyncDataPromises[key];
}
function pick(obj, keys) {
	const newObj = {};
	for (const key of keys) newObj[key] = obj[key];
	return newObj;
}
function buildAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
	nuxtApp.payload._errors[key] ??= void 0;
	const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
	const handler = _handler ;
	const _ref = options.deep ? ref : shallowRef;
	const hasCachedData = initialCachedData !== void 0;
	const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
		if (!keys || keys.includes(key)) await asyncData.execute({ cause: "refresh:hook" });
	});
	const asyncData = {
		data: _ref(hasCachedData ? initialCachedData : options.default()),
		pending: computed(() => asyncData.status.value === "pending"),
		error: toRef(nuxtApp.payload._errors, key),
		status: shallowRef("idle"),
		execute: (...args) => {
			const [_opts, newValue = void 0] = args;
			const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
			if (nuxtApp._asyncDataPromises[key]) {
				if ((opts.dedupe ?? options.dedupe) === "defer") return nuxtApp._asyncDataPromises[key];
			}
			{
				const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
				if (cachedData !== void 0) {
					if (options.serialize !== false) nuxtApp.payload.data[key] = cachedData;
					asyncData.data.value = cachedData;
					asyncData.error.value = void 0;
					asyncData.status.value = "success";
					return Promise.resolve(cachedData);
				}
			}
			if (toValue(options.enabled) === false) return Promise.resolve(asyncData.data.value);
			if (asyncData._abortController) asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
			asyncData._abortController = new AbortController();
			asyncData.status.value = "pending";
			const cleanupController = new AbortController();
			const promise = new Promise((resolve, reject) => {
				try {
					const timeout = opts.timeout ?? options.timeout;
					const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
					if (mergedSignal.aborted) {
						const reason = mergedSignal.reason;
						reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
						return;
					}
					mergedSignal.addEventListener("abort", () => {
						const reason = mergedSignal.reason;
						reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
					}, {
						once: true,
						signal: cleanupController.signal
					});
					const ctx = { signal: mergedSignal };
					let run = () => Promise.resolve(handler(nuxtApp, ctx));
					if (options.middleware?.length) for (let i = options.middleware.length - 1; i >= 0; i--) {
						const middleware = options.middleware[i];
						const next = run;
						run = () => Promise.resolve(middleware(next, ctx));
					}
					return run().then(resolve, reject);
				} catch (err) {
					reject(err);
				}
			}).then(async (_result) => {
				if (nuxtApp._asyncDataPromises[key] !== promise) return;
				let result = _result;
				if (options.transform) result = await options.transform(_result);
				if (options.pick) result = pick(result, options.pick);
				if (options.serialize !== false) nuxtApp.payload.data[key] = result;
				asyncData.data.value = result;
				asyncData.error.value = void 0;
				asyncData.status.value = "success";
			}).catch((error) => {
				if (nuxtApp._asyncDataPromises[key] !== promise) return nuxtApp._asyncDataPromises[key];
				if (asyncData._abortController?.signal.aborted) return nuxtApp._asyncDataPromises[key];
				if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
					asyncData.status.value = "idle";
					return nuxtApp._asyncDataPromises[key];
				}
				asyncData.error.value = createError$2(error);
				asyncData.data.value = unref(options.default());
				asyncData.status.value = "error";
			}).finally(() => {
				cleanupController.abort();
				if (nuxtApp._asyncDataPromises[key] === promise) delete nuxtApp._asyncDataPromises[key];
			});
			nuxtApp._asyncDataPromises[key] = promise;
			return nuxtApp._asyncDataPromises[key];
		},
		_execute: debounceTick((...args) => asyncData.execute(...args)),
		_default: options.default,
		_deps: 0,
		_init: true,
		_hash: void 0,
		_off: () => {
			unsubRefreshAsyncData();
			if (nuxtApp._asyncData[key] !== asyncData) return;
			if (nuxtApp._asyncData[key]?._init) nuxtApp._asyncData[key]._init = false;
			if (nuxtApp._asyncDataPromises[key]) {
				asyncData._abortController?.abort(new DOMException("AsyncData request cancelled by unmount", "AbortError"));
				delete nuxtApp._asyncDataPromises[key];
				if (asyncData.status.value === "pending") asyncData.status.value = "idle";
			}
			if (!hasCustomGetCachedData) nextTick(() => {
				if (asyncData._deps > 0) return;
				asyncData.execute = () => Promise.resolve();
				if (nuxtApp._asyncData[key] === asyncData) {
					clearNuxtDataByKey(nuxtApp, key);
					delete nuxtApp._asyncData[key];
				}
			});
		}
	};
	return asyncData;
}
var getDefault = () => void 0;
var getDefaultCachedData = (key, nuxtApp, ctx) => {
	if (nuxtApp.isHydrating) return nuxtApp.payload.data[key];
	if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") return nuxtApp.static.data[key];
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
	const list = signals.filter((s) => !!s);
	if (typeof timeout === "number" && timeout >= 0) {
		const timeoutSignal = AbortSignal.timeout?.(timeout);
		if (timeoutSignal) list.push(timeoutSignal);
	}
	if (AbortSignal.any) return AbortSignal.any(list);
	const controller = new AbortController();
	for (const sig of list) if (sig.aborted) {
		const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
		try {
			controller.abort(reason);
		} catch {
			controller.abort();
		}
		return controller.signal;
	}
	const onAbort = () => {
		const reason = list.find((s) => s.aborted)?.reason ?? new DOMException("Aborted", "AbortError");
		try {
			controller.abort(reason);
		} catch {
			controller.abort();
		}
	};
	for (const sig of list) sig.addEventListener?.("abort", onAbort, {
		once: true,
		signal: cleanupSignal
	});
	return controller.signal;
}
// node_modules/@nuxt/icon/dist/runtime/components/css-cache.js
var MAX_SIZE = 1e3;
var cache = /* @__PURE__ */ new Map();
function isSameIcon(a, b) {
	const keys = Object.keys(a);
	return keys.length === Object.keys(b).length && keys.every((key) => Object.hasOwn(b, key) && a[key] === b[key]);
}
function getCachedIconCSS(icon, iconSelector, customise) {
	if (customise) return getIconCSS(icon, {
		iconSelector,
		format: "compressed",
		customise
	});
	const cached = cache.get(iconSelector);
	if (cached && isSameIcon(cached.icon, icon)) return cached.css;
	const css = getIconCSS(icon, {
		iconSelector,
		format: "compressed"
	});
	if (!cached && cache.size >= MAX_SIZE) cache.clear();
	cache.set(iconSelector, {
		icon: { ...icon },
		css
	});
	return css;
}
// node_modules/@nuxt/icon/dist/runtime/components/resolve-name.js
var HYPHEN = 45;
var sortedCollectionsCache = /* @__PURE__ */ new WeakMap();
function getSortedCollections(collections) {
	if (!collections) return [];
	const key = toRaw(collections);
	let sorted = sortedCollectionsCache.get(key);
	if (!sorted) {
		const sort = (source) => [...source].sort((a, b) => b.length - a.length);
		sorted = { value: sort(key) };
		sortedCollectionsCache.set(key, sorted);
	}
	return sorted.value;
}
function resolveName(name, options) {
	const bare = name.startsWith(options.cssSelectorPrefix) ? name.slice(options.cssSelectorPrefix.length) : name;
	const resolved = options.aliases?.[bare] || bare;
	if (!resolved.includes(":")) {
		const collection = getSortedCollections(options.collections).find((c) => resolved.charCodeAt(c.length) === HYPHEN && resolved.startsWith(c));
		return collection ? collection + ":" + resolved.slice(collection.length + 1) : resolved;
	}
	return resolved;
}
// node_modules/@nuxt/icon/dist/runtime/components/shared.js
async function loadIcon$1(name, timeout) {
	if (!name) return null;
	const _icon = getIcon(name);
	if (_icon) return _icon;
	let timeoutWarn;
	const load = loadIcon(name).catch(() => {
		console.warn(`[Icon] failed to load icon \`${name}\``);
		return null;
	});
	if (timeout > 0) await Promise.race([load, new Promise((resolve) => {
		timeoutWarn = setTimeout(() => {
			console.warn(`[Icon] loading icon \`${name}\` timed out after ${timeout}ms`);
			resolve();
		}, timeout);
	})]).finally(() => clearTimeout(timeoutWarn));
	else await load;
	return getIcon(name);
}
function useResolvedName(getName) {
	const options = useAppConfig().icon;
	return computed(() => resolveName(getName(), options));
}
function resolveCustomizeFn(customize, globalCustomize) {
	if (customize === false) return void 0;
	if (customize === true || customize === null) return globalCustomize;
	return customize;
}
// node_modules/@nuxt/icon/dist/runtime/components/css.js
var SYMBOL_SERVER_CSS = "NUXT_ICONS_SERVER_CSS";
function escapeCssSelector(selector) {
	return selector.replace(/([^\w-])/g, "\\$1");
}
var NuxtIconCss = /* @__PURE__ */ defineComponent({
	name: "NuxtIconCss",
	props: {
		name: {
			type: String,
			required: true
		},
		customize: {
			type: [
				Function,
				Boolean,
				null
			],
			default: null,
			required: false
		}
	},
	setup(props) {
		const nuxt = useNuxtApp();
		const options = useAppConfig().icon;
		const cssClass = computed(() => {
			if (!props.name) return "";
			const base = options.cssSelectorPrefix + props.name;
			if (typeof props.customize === "function") return base + "--customized-" + hash(props.customize.toString());
			return base;
		});
		const selector = computed(() => "." + escapeCssSelector(cssClass.value));
		function getCSS(icon, withLayer = true, iconSelector = selector.value) {
			if (options.cssWherePseudo) iconSelector = `:where(${iconSelector})`;
			const css = getCachedIconCSS(icon, iconSelector, resolveCustomizeFn(props.customize, options.customize));
			if (options.cssLayer && withLayer) return `@layer ${options.cssLayer} { ${css} }`;
			return css;
		}
		onServerPrefetch(async () => {
			if (!(useRuntimeConfig().icon || {})?.serverKnownCssClasses?.includes(cssClass.value)) {
				const icon = await loadIcon$1(props.name, options.fetchTimeout).catch(() => null);
				if (!icon) return null;
				let ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS];
				if (!ssrCSS) {
					ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS] = /* @__PURE__ */ new Map();
					nuxt.runWithContext(() => {
						useHead({ style: [() => {
							const sep = "";
							let css = Array.from(ssrCSS.values()).sort().join(sep);
							if (options.cssLayer) css = `@layer ${options.cssLayer} {${sep}${css}${sep}}`;
							return { innerHTML: css };
						}] }, { tagPriority: "low" });
					});
				}
				if (cssClass.value && !ssrCSS.has(cssClass.value)) {
					const css = getCSS(icon, false);
					ssrCSS.set(cssClass.value, css);
				}
				return null;
			}
		});
		return () => h("span", { class: ["iconify", cssClass.value] });
	}
});
// node_modules/@nuxt/icon/dist/runtime/components/svg.js
var NuxtIconSvg = /* @__PURE__ */ defineComponent({
	name: "NuxtIconSvg",
	props: {
		name: {
			type: String,
			required: true
		},
		customize: {
			type: [
				Function,
				Boolean,
				null
			],
			default: null,
			required: false
		}
	},
	setup(props, { slots }) {
		useNuxtApp();
		const options = useAppConfig().icon;
		const name = useResolvedName(() => props.name);
		const storeKey = "i-" + name.value;
		if (name.value) onServerPrefetch(async () => {
			await useAsyncData(storeKey, async () => await loadIcon$1(name.value, options.fetchTimeout), { deep: false });
		});
		return () => h(Icon, {
			icon: name.value,
			ssr: true,
			customise: resolveCustomizeFn(props.customize, options.customize)
		}, slots);
	}
});
// node_modules/@nuxt/icon/dist/runtime/components/index.js
var components_exports = /* @__PURE__ */ __exportAll({ default: () => components_default$1 });
var components_default$1 = defineComponent({
	name: "NuxtIcon",
	props: {
		name: {
			type: String,
			required: true
		},
		mode: {
			type: String,
			required: false,
			default: null
		},
		size: {
			type: [Number, String],
			required: false,
			default: null
		},
		customize: {
			type: [
				Function,
				Boolean,
				null
			],
			default: null,
			required: false
		}
	},
	setup(props, { slots }) {
		const nuxtApp = useNuxtApp();
		const runtimeOptions = useAppConfig().icon;
		const name = useResolvedName(() => props.name);
		const component = computed(() => nuxtApp.vueApp?.component(name.value) || ((props.mode || runtimeOptions.mode) === "svg" ? NuxtIconSvg : NuxtIconCss));
		const style = computed(() => {
			const size = props.size || runtimeOptions.size;
			return size ? { fontSize: Number.isNaN(+size) ? size : size + "px" } : null;
		});
		return () => h(component.value, {
			...runtimeOptions.attrs,
			name: name.value,
			class: runtimeOptions.class,
			style: style.value,
			customize: props.customize
		}, slots);
	}
});

const componentsCJ6cuR0l = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	a: ClientOnly,
	i: dataDiagnostics,
	n: components_exports,
	o: useAppConfig,
	r: useAsyncData,
	t: components_default$1
}, Symbol.toStringTag, { value: 'Module' }));

// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fglobal-polyfills.mjs
if (!("global" in globalThis)) globalThis.global = globalThis;
// node_modules/nuxt/dist/app/utils/hash.js
/**
* Hash an arbitrary value into a short, stable string key.
*
* Values are serialized to a canonical, locale-independent representation
* (equal structures hash equally regardless of key order or runtime locale),
* then digested with a fast non-cryptographic hash. This is what `useFetch` and
* `useAsyncData` use internally to derive their cache keys, so it is safe to use
* for the same purpose in your own code.
*
* The digest is non-cryptographic and must not be used for integrity checks.
*
* @since 4.5.0
*/
function hashKey(value) {
	return fnv1a64Base36(identify(value));
}
// node_modules/nuxt/dist/app/diagnostics/state.js
/**
* E7xxx
* Payload / state / cookie runtime diagnostics.
*/
var stateDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/nuxt/dist/app/composables/state.js
var useStateKeyPrefix = "$s";
function useState(...args) {
	const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
	if (typeof args[0] !== "string") args.unshift(autoKey);
	const [_key, init] = args;
	if (!_key || typeof _key !== "string") throw stateDiagnostics.NUXT_E7009({ key: _key });
	if (init !== void 0 && typeof init !== "function") throw stateDiagnostics.NUXT_E7007({ type: typeof init });
	const key = useStateKeyPrefix + _key;
	const nuxtApp = useNuxtApp();
	const state = toRef(nuxtApp.payload.state, key);
	if (init) nuxtApp._state[key] ??= { _default: init };
	if (state.value === void 0 && init) {
		const initialValue = init();
		if (isRef(initialValue)) {
			nuxtApp.payload.state[key] = initialValue;
			return state;
		}
		state.value = initialValue;
	}
	return state;
}
// node_modules/nuxt/dist/app/composables/fetch.js
var $fetch$1 = $fetch$2;
var MAYBE_REF_OR_GETTER_OPTION_KEYS = [
	"method",
	"baseURL",
	"query",
	"params",
	"body",
	"headers"
];
function generateOptionSegments(opts) {
	const segments = [toValue(opts.method)?.toUpperCase() || "GET", toValue(opts.baseURL)];
	for (const _obj of [opts.query || opts.params]) {
		const obj = toValue(_obj);
		if (!obj) continue;
		const unwrapped = {};
		for (const [key, value] of Object.entries(obj)) unwrapped[toValue(key)] = toValue(value);
		segments.push(unwrapped);
	}
	if (opts.body) {
		const value = toValue(opts.body);
		if (!value) segments.push(hashKey(value));
		else if (value instanceof ArrayBuffer) segments.push(hashKey(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
		else if (value instanceof FormData) {
			const entries = [];
			for (const entry of value.entries()) {
				const [key, val] = entry;
				entries.push([key, val instanceof File ? `${val.name}:${val.size}:${val.lastModified}` : val]);
			}
			segments.push(hashKey(entries));
		} else if (isPlainObject(value)) segments.push(hashKey(reactive(value)));
		else try {
			segments.push(hashKey(value));
		} catch {
			dataDiagnostics.NUXT_E3002({ cause: value });
		}
	}
	return segments;
}
/** @internal */
function _createUseFetch(options = {}) {
	{
		function useFetch(request, arg1, arg2) {
			const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
			const factoryOptions = typeof options === "function" ? options(opts) : options;
			const { server, lazy, default: defaultFn, transform, pick, watch: watchSources, immediate, getCachedData, deep, dedupe, timeout, enabled, serialize, middleware, _keySegments: keySegments, ...fetchOptions } = {
				...typeof options === "function" ? {} : factoryOptions,
				...opts,
				...typeof options === "function" ? factoryOptions : {}
			};
			const _request = computed(() => toValue(request));
			const key = computed(() => toValue(fetchOptions.key) || "$f" + hashKey([
				autoKey,
				typeof _request.value === "string" ? _request.value : "",
				...generateOptionSegments(fetchOptions),
				...keySegments ? keySegments.map((segment) => toValue(segment)) : []
			]));
			if (!fetchOptions.baseURL && typeof _request.value === "string" && _request.value[0] === "/" && _request.value[1] === "/") throw dataDiagnostics.NUXT_E3001({ url: _request.value });
			const _fetchOptions = reactive({
				...fetchDefaults,
				...fetchOptions,
				cache: typeof fetchOptions.cache === "boolean" ? void 0 : fetchOptions.cache
			});
			const _asyncDataOptions = {
				server,
				lazy,
				default: defaultFn,
				transform,
				pick,
				immediate,
				getCachedData,
				deep,
				dedupe,
				timeout,
				enabled,
				serialize,
				middleware,
				watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
			};
			if (watchSources === false) _asyncDataOptions._keyTriggersExecute = false;
			return useAsyncData(key, (_, { signal }) => {
				let _$fetch = fetchOptions.$fetch || $fetch$1;
				if (!fetchOptions.$fetch) {
					if (typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(fetchOptions.baseURL) || toValue(fetchOptions.baseURL)[0] === "/")) _$fetch = useRequestFetch();
				}
				const resolvedOptions = {
					signal,
					..._fetchOptions
				};
				for (const key of MAYBE_REF_OR_GETTER_OPTION_KEYS) if (typeof resolvedOptions[key] === "function") resolvedOptions[key] = toValue(resolvedOptions[key]);
				return _$fetch(_request.value, resolvedOptions);
			}, _asyncDataOptions);
		}
		return useFetch;
	}
}
var useFetch = _createUseFetch();
// node_modules/nuxt/dist/app/diagnostics/manifest.js
/**
* E5xxx
* App manifest / route-rules runtime diagnostics.
*/
var manifestDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froute-rules.mjs
var foldedMatcher = /* @__PURE__ */ (() => {
	const $0 = { prerender: true }, $1 = { payload: false };
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1);
		if (p === "/__nuxt_content/blog/sql_dump.txt") r.push({ data: $0 });
		else if (p === "/__nuxt_content/projects/sql_dump.txt") r.push({ data: $0 });
		else if (p.charCodeAt(p.length - 1) === 47) {
			if (p === "/__nuxt_content/blog/sql_dump.txt/") r.push({ data: $0 });
			else if (p === "/__nuxt_content/projects/sql_dump.txt/") r.push({ data: $0 });
		}
		let s = p.split("/");
		if (s.length > 1 && s[s.length - 1] === "") {
			s.pop();
			p = p.slice(0, -1);
		}
		if (s.length > 1) {
			if (s[1] === "__nuxt_content") r.push({
				data: $1,
				params: { "_": p.slice(16) }
			});
		}
		return r.reverse();
	};
})();
var decodeRoutePath = function decodeRoutePath(path) {
	if (!path.includes("%")) return path;
	const queryIndex = path.indexOf("?");
	const pathname = queryIndex === -1 ? path : path.slice(0, queryIndex);
	try {
		return queryIndex === -1 ? decodeURI(pathname) : decodeURI(pathname) + path.slice(queryIndex);
	} catch {
		return path;
	}
};
var resolveRoutePathDotSegments = function resolveRoutePathDotSegments(path) {
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
var foldRouteCase = function foldRouteCase(path) {
	return path.replace(/[A-Z]+|[^\0-\x7F]/g, (char) => {
		if (char.charCodeAt(0) < 128) return char.toLowerCase();
		const upper = char.toUpperCase();
		if (upper.length !== 1 || upper.charCodeAt(0) < 128) return char;
		const lower = upper.toLowerCase();
		return lower.length === 1 && lower.toUpperCase() === upper ? lower : upper;
	});
};
var normalizePath = (path, fold) => {
	if (typeof path !== "string") return path;
	const decoded = decodeRoutePath(resolveRoutePathDotSegments(path));
	return fold ? foldRouteCase(decoded) : decoded;
};
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default = (path) => defu({}, ...foldedMatcher("", normalizePath(path, true)).map((r) => r.data).reverse());
// node_modules/nuxt/dist/app/composables/manifest.js
function routeRulesMatcher$1(path) {
	return virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default(path);
}
function getRouteRules(arg) {
	const path = typeof arg === "string" ? arg : arg.path;
	try {
		return routeRulesMatcher$1(path);
	} catch (e) {
		manifestDiagnostics.NUXT_E5003({
			path,
			cause: e
		});
		return {};
	}
}
// node_modules/nuxt/dist/app/composables/payload.js
/**
* This is an experimental function for configuring passing rich data from server -> client.
* @since 3.4.0
*/
function definePayloadReducer(name, reduce) {
	useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
}
// node_modules/nuxt/dist/app/composables/url.js
/** @since 3.5.0 */
function useRequestURL(opts) {
	return getRequestURL(useRequestEvent(), opts);
}
// node_modules/nuxt/dist/pages/runtime/router.options.js
var router_options_default = { scrollBehavior(to, from, savedPosition) {
	const nuxtApp = useNuxtApp();
	const router = useRouter();
	const hashScrollBehaviour = router.options?.scrollBehaviorType ?? "auto";
	if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
		if (from.hash && !to.hash) return savedPosition ?? {
			left: 0,
			top: 0
		};
		if (to.hash) return {
			el: to.hash,
			top: _getHashElementScrollMarginTop(to.hash),
			behavior: hashScrollBehaviour
		};
		return false;
	}
	if ((typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop) === false) return false;
	if (from === START_LOCATION) return _calculatePosition(to, from, savedPosition, hashScrollBehaviour);
	return new Promise((resolve) => {
		const doScroll = () => {
			requestAnimationFrame(() => {
				if (router.currentRoute.value.fullPath !== to.fullPath) {
					resolve(false);
					return;
				}
				resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
			});
		};
		nuxtApp.hooks.hookOnce("page:loading:end", () => {
			const transitionPromise = nuxtApp["~transitionPromise"];
			if (transitionPromise) transitionPromise.then(doScroll);
			else doScroll();
		});
	});
} };
function _getHashElementScrollMarginTop(hash) {
	const elem = (void 0).getElementById(hash.slice(1));
	if (!elem) return 0;
	return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
	if (savedPosition) return savedPosition;
	if (to.hash) return {
		el: to.hash,
		top: _getHashElementScrollMarginTop(to.hash),
		behavior: isChangingPage(to, from) ? defaultHashScrollBehaviour : "instant"
	};
	return {
		left: 0,
		top: 0
	};
}
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default = {
	hashMode: false,
	scrollBehaviorType: "auto",
	sensitive: false,
	...router_options_default
};
// node_modules/nuxt/dist/app/components/nuxt-link.js
var firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtLink(options) {
	const componentName = options.componentName || "NuxtLink";
	function isHashLinkWithoutHashMode(link) {
		return typeof link === "string" && link.startsWith("#");
	}
	function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
		const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
		if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") return to;
		if (typeof to === "string") return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
		const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
		return {
			...to,
			name: void 0,
			path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
		};
	}
	/**
	* The link state `<NuxtLink>` renders with. Kept separate from `useNuxtLink` so the component
	* does not resolve the `<RouterLink>` link state backing `route`/`isActive`/`isExactActive`,
	* which it never reads.
	*/
	function useLinkTarget(props) {
		const router = useRouter();
		const config = /* @__PURE__ */ useRuntimeConfig();
		const rootedHref = router.options?.history?.createHref ?? ((path) => joinURL(config.app.baseURL, path));
		const hasTarget = computed(() => !!unref(props.target) && unref(props.target) !== "_self");
		const isAbsoluteUrl = computed(() => {
			const path = unref(props.to) || unref(props.href) || "";
			return typeof path === "string" && isAbsoluteHref(path);
		});
		const isExternal = computed(() => {
			if (unref(props.external)) return true;
			const path = unref(props.to) || unref(props.href) || "";
			if (typeof path === "object") return false;
			return path === "" || isAbsoluteUrl.value;
		});
		const to = computed(() => {
			const path = unref(props.to) || unref(props.href) || "";
			if (isExternal.value) return path;
			return resolveTrailingSlashBehavior(path, router.resolve, unref(props.trailingSlash));
		});
		const href = computed(() => {
			const effectiveTrailingSlash = unref(props.trailingSlash) ?? options.trailingSlash;
			if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
				const raw = to.value;
				return typeof raw === "string" ? sanitizeAnchorHref(raw) : raw;
			}
			if (isExternal.value) {
				const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
				const href = typeof path === "object" ? router.resolve(path).href : path;
				const safe = typeof href === "string" ? sanitizeAnchorHref(href) : href;
				return safe === null ? null : applyTrailingSlashBehavior(safe, effectiveTrailingSlash);
			}
			if (typeof to.value === "object") return router.resolve(to.value)?.href ?? null;
			return applyTrailingSlashBehavior(isRootedPath(to.value) ? rootedHref(to.value) : router.resolve(to.value).href, effectiveTrailingSlash);
		});
		return {
			to,
			hasTarget,
			isAbsoluteUrl,
			isExternal,
			href,
			async navigate(_e) {
				if (href.value === null) return;
				await navigateTo(href.value, {
					replace: unref(props.replace),
					external: isExternal.value || hasTarget.value
				});
			}
		};
	}
	function useNuxtLink(props) {
		const router = useRouter();
		const target = useLinkTarget(props);
		const builtinRouterLink = resolveComponent("RouterLink");
		const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
		const link = target.isExternal.value ? void 0 : useBuiltinLink?.({
			...props,
			to: target.to,
			viewTransition: unref(props.viewTransition)
		});
		return {
			...target,
			isActive: link?.isActive ?? computed(() => target.to.value === router.currentRoute.value.path),
			isExactActive: link?.isExactActive ?? computed(() => target.to.value === router.currentRoute.value.path),
			route: link?.route ?? computed(() => router.resolve(target.to.value))
		};
	}
	/**
	* Resolve the link state `<RouterLink>` exposes for an internal location.
	*/
	function resolveStaticLink(props, router, rawTo) {
		const route = router.resolve(resolveTrailingSlashBehavior(rawTo, router.resolve, props.trailingSlash));
		const currentRoute = router.currentRoute.value;
		const index = activeRecordIndex(route, currentRoute);
		return {
			route,
			href: sanitizeAnchorHref(route.href),
			isActive: index > -1 && includesParams(currentRoute.params, route.params),
			isExactActive: index > -1 && index === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.params),
			navigate: async () => {
				await navigateTo(route.href, { replace: props.replace });
			}
		};
	}
	/**
	* Render an internal link as a plain anchor, matching the markup `<RouterLink>` produces
	* for the same location.
	*/
	function renderStaticInternalLink(props, slots, router, rawTo) {
		const link = resolveStaticLink(props, router, rawTo);
		let dataInternal;
		const routerOptions = router.options;
		return h("a", {
			"aria-current": link.isExactActive ? props.ariaCurrentValue ?? "page" : null,
			"href": link.href,
			"class": {
				[getLinkClass(props.activeClass || options.activeClass, routerOptions.linkActiveClass, "router-link-active")]: link.isActive,
				[getLinkClass(props.exactActiveClass || options.exactActiveClass, routerOptions.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
			},
			"rel": props.rel || void 0,
			"data-internal": dataInternal
		}, slots.default?.(link));
	}
	/**
	* Render the slot of an internal `custom` link with the props `<RouterLink custom>` passes to it.
	*/
	function renderStaticCustomLink(props, slots, router, rawTo) {
		const link = resolveStaticLink(props, router, rawTo);
		const vnodes = slots.default?.({
			...link,
			rel: firstNonUndefined(props.noRel ? "" : props.rel, options.externalRelAttribute, "") || null,
			target: props.target || null,
			isExternal: false,
			prefetch: async () => {},
			prefetched: false,
			shouldPrefetch: () => false
		});
		return vnodes?.length === 1 ? vnodes[0] : vnodes;
	}
	return defineComponent({
		name: componentName,
		props: {
			to: {
				type: [String, Object],
				required: false
			},
			href: {
				type: [String, Object],
				required: false
			},
			target: {
				type: String,
				required: false
			},
			rel: {
				type: String,
				required: false
			},
			noRel: {
				type: Boolean,
				default: void 0,
				required: false
			},
			prefetch: {
				type: Boolean,
				default: void 0,
				required: false
			},
			prefetchOn: {
				type: [String, Object],
				required: false
			},
			noPrefetch: {
				type: Boolean,
				default: void 0,
				required: false
			},
			activeClass: {
				type: String,
				required: false
			},
			exactActiveClass: {
				type: String,
				required: false
			},
			prefetchedClass: {
				type: String,
				required: false
			},
			replace: {
				type: Boolean,
				default: void 0,
				required: false
			},
			ariaCurrentValue: {
				type: String,
				required: false
			},
			external: {
				type: Boolean,
				default: void 0,
				required: false
			},
			custom: {
				type: Boolean,
				default: void 0,
				required: false
			},
			trailingSlash: {
				type: String,
				required: false
			}
		},
		useLink: useNuxtLink,
		setup(props, { slots }) {
			const router = useRouter();
			{
				const rawTo = props.to || props.href || "";
				if (!(props.external || typeof rawTo === "string" && (rawTo === "" || isAbsoluteHref(rawTo))) && !isHashLinkWithoutHashMode(rawTo) && (!props.target || props.target === "_self")) {
					if (props.custom) return () => renderStaticCustomLink(props, slots, router, rawTo);
					return () => renderStaticInternalLink(props, slots, router, rawTo);
				}
			}
			const routerLinkComponent = resolveComponent("RouterLink");
			const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useLinkTarget(props);
			const prefetched = shallowRef(false);
			const el = void 0;
			const elRef = void 0;
			function shouldPrefetch(mode) {
				return false;
			}
			async function prefetch(nuxtApp = useNuxtApp()) {}
			return () => {
				const target = props.target || null;
				const rel = firstNonUndefined(props.noRel ? "" : props.rel, options.externalRelAttribute, isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : "") || null;
				const getCustomSlotProps = (routerLinkSlotProps) => ({
					navigate,
					get route() {
						if (!href.value) return;
						const url = new URL(href.value, "http://localhost");
						return {
							path: url.pathname,
							fullPath: url.pathname,
							get query() {
								return parseQuery(url.search);
							},
							hash: url.hash,
							params: {},
							name: void 0,
							matched: [],
							redirectedFrom: void 0,
							meta: {},
							href: href.value
						};
					},
					rel,
					target,
					isExternal: isExternal.value || hasTarget.value,
					isActive: false,
					isExactActive: false,
					...routerLinkSlotProps,
					href: typeof routerLinkSlotProps?.href === "string" ? sanitizeAnchorHref(routerLinkSlotProps.href) : href.value,
					prefetch,
					prefetched: prefetched.value,
					shouldPrefetch
				});
				if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
					const routerLinkProps = {
						ref: elRef,
						to: to.value,
						activeClass: props.activeClass || options.activeClass,
						exactActiveClass: props.exactActiveClass || options.exactActiveClass,
						replace: props.replace,
						ariaCurrentValue: props.ariaCurrentValue,
						custom: props.custom
					};
					if (!props.custom) routerLinkProps.rel = props.rel || void 0;
					return h(routerLinkComponent, routerLinkProps, props.custom && slots.default ? { default: (slotProps) => slots.default(getCustomSlotProps(slotProps)) } : slots.default);
				}
				if (props.custom) {
					if (!slots.default) return null;
					return slots.default(getCustomSlotProps());
				}
				return h("a", {
					ref: el,
					href: href.value || null,
					rel,
					target,
					onClick: async (event) => {
						if (isExternal.value || hasTarget.value) return;
						event.preventDefault();
						try {
							const encodedHref = encodeRoutePath(href.value ?? "");
							return await (props.replace ? router.replace(encodedHref) : router.push(encodedHref));
						} finally {}
					}
				}, slots.default?.());
			};
		}
	});
}
var NuxtLink = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function isSameRouteRecord(a, b) {
	return (a.aliasOf || a) === (b.aliasOf || b);
}
function getOriginalPath(record) {
	return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
function isEquivalentArray(a, b) {
	return Array.isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function isSameParamValue(a, b) {
	return Array.isArray(a) ? isEquivalentArray(a, b) : Array.isArray(b) ? isEquivalentArray(b, a) : (a && a.valueOf()) === (b && b.valueOf());
}
function isSameRouteLocationParams(a, b) {
	if (Object.keys(a).length !== Object.keys(b).length) return false;
	for (const key in a) if (!isSameParamValue(a[key], b[key])) return false;
	return true;
}
function includesParams(outer, inner) {
	for (const key in inner) {
		const innerValue = inner[key];
		const outerValue = outer[key];
		if (typeof innerValue === "string") {
			if (innerValue !== outerValue) return false;
		} else if (!Array.isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value.valueOf() !== outerValue[i].valueOf())) return false;
	}
	return true;
}
function activeRecordIndex(route, currentRoute) {
	const { matched } = route;
	const { length } = matched;
	const routeMatched = matched[length - 1];
	const currentMatched = currentRoute.matched;
	if (!routeMatched || !currentMatched.length) return -1;
	const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
	if (index > -1) return index;
	const parentRecordPath = getOriginalPath(matched[length - 2]);
	return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
}
/** Resolve an active-link class, falling back from the per-link value to the router-wide one. */
function getLinkClass(propClass, globalClass, defaultClass) {
	return propClass ?? globalClass ?? defaultClass;
}
function applyTrailingSlashBehavior(to, trailingSlash) {
	if (trailingSlash !== "append" && trailingSlash !== "remove") return to;
	const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
	if (hasProtocol(to) && !to.startsWith("http")) return to;
	return normalizeFn(to, true);
}
// node_modules/nuxt-site-config/dist/runtime/app/plugins/0.siteConfig.js
var _0_siteConfig_default = defineNuxtPlugin({
	name: "nuxt-site-config:init",
	enforce: "pre",
	async setup(nuxtApp) {
		const stack = useRequestEvent()?.context?.siteConfig;
		const state = useState("site-config");
		nuxtApp.hooks.hook("app:rendered", () => {
			state.value = stack?.get({
				debug: useRuntimeConfig()["nuxt-site-config"].debug,
				resolveRefs: true
			});
		});
		return { provide: { nuxtSiteConfig: stack } };
	}
});
// node_modules/nuxt/dist/head/runtime/island-head.js
/**
* No-op `head.push` until the returned `unfreeze` runs. Plugin/transformer
* augmentations on the same head are unaffected.
*/
function freezeHead(head) {
	const realPush = head.push;
	head.push = () => ({
		dispose: () => {},
		patch: () => {},
		_i: 0
	});
	return () => {
		head.push = realPush;
	};
}
// node_modules/nuxt/dist/head/runtime/plugins/unhead.server.js
var plugin$3 = defineNuxtPlugin({
	name: "nuxt:head",
	enforce: "pre",
	setup(nuxtApp) {
		const head = nuxtApp.ssrContext.head;
		if (nuxtApp.ssrContext.islandContext) {
			const unfreeze = freezeHead(head);
			nuxtApp.hooks.hookOnce("app:created", unfreeze);
		}
		nuxtApp.vueApp.use(head);
	}
});
// node_modules/nuxt/dist/pages/runtime/utils.js
var ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
var ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
var ROUTE_KEY_NORMAL_RE = /:\w+/g;
var interpolatePath = (route, match) => {
	return match.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
};
var generateRouteKey = (routeProps, override) => {
	const matchedRoute = routeProps.route.matched.find((m) => m.components?.default === routeProps.Component.type);
	const source = matchedRoute?.meta.key ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
	return typeof source === "function" ? source(routeProps.route) : source;
};
/** @since 3.9.0 */
function toArray(value) {
	return Array.isArray(value) ? value : [value];
}
Object.assign(Object.create(null), {});
var pageIslandRoutes = Object.assign(Object.create(null), {});
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fmiddleware.mjs
var globalMiddleware = [defineNuxtRouteMiddleware(async (to) => {
	let __temp, __restore;
	if (!to.meta?.validate) return;
	const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
	if (result === true) return;
	return createError$2({
		fatal: false,
		status: result && (result.status || result.statusCode) || 404,
		statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
		data: { path: to.fullPath }
	});
}), /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
	if (!useNuxtApp().ssrContext?.islandContext) return;
	const rules = getRouteRules({ path: to.path });
	if (rules.redirect) {
		const path = rules.redirect.includes("#") ? rules.redirect : rules.redirect + to.hash;
		return navigateTo(path, { external: isAbsoluteHref(path) });
	}
})];
var namedMiddleware = {};
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froutes.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default = [
	{
		name: "blog-slug",
		path: "/blog/:slug()",
		component: () => import('../build/_slug_-TQWmpEwP.mjs')
	},
	{
		name: "projects-slug",
		path: "/projects/:slug()",
		component: () => import('../build/_slug_-DZVLaf1b.mjs')
	},
	{
		name: "blog",
		path: "/blog",
		component: () => import('../build/blog-fovds9KV.mjs')
	},
	{
		name: "certifications",
		path: "/certifications",
		component: () => import('../build/certifications-LoQSuN4I.mjs')
	},
	{
		name: "gallery",
		path: "/gallery",
		component: () => import('../build/gallery-Rq7eutq4.mjs')
	},
	{
		name: "projects",
		path: "/projects",
		component: () => import('../build/projects-CbY7Qkpa.mjs')
	},
	{
		name: "tech-stack",
		path: "/tech-stack",
		component: () => import('../build/tech-stack-BwL8g-Kp.mjs')
	},
	{
		name: "uses",
		path: "/uses",
		component: () => import('../build/uses-DrsiMEPw.mjs')
	},
	{
		name: "index",
		path: "/",
		component: () => import('../build/pages-DGv8uXne.mjs')
	}
];
// node_modules/nuxt/dist/pages/runtime/plugins/router.js
var plugin$2 = defineNuxtPlugin({
	name: "nuxt:router",
	enforce: "pre",
	async setup(nuxtApp) {
		let __temp, __restore;
		let routerBase = useRuntimeConfig().app.baseURL;
		const history = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.history?.(routerBase) ?? createMemoryHistory(routerBase);
		const routes = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.routes ? ([__temp, __restore] = executeAsync(() => virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.routes(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default)), __temp = await __temp, __restore(), __temp) ?? virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default : virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default;
		let startPosition;
		const router = createRouter({
			...virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default,
			scrollBehavior: (to, from, savedPosition) => {
				if (from === START_LOCATION) {
					startPosition = savedPosition;
					return;
				}
				if (virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior) {
					router.options.scrollBehavior = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior;
					if ("scrollRestoration" in (void 0).history) {
						const unsub = router.beforeEach(() => {
							unsub();
							(void 0).history.scrollRestoration = "manual";
						});
					}
					return virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
				}
			},
			history,
			routes
		});
		nuxtApp.vueApp.use(router);
		const previousRoute = shallowRef(router.currentRoute.value);
		router.afterEach((_to, from) => {
			previousRoute.value = from;
		});
		Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", { get: () => previousRoute.value });
		const initialURL = nuxtApp.ssrContext.url;
		const _route = shallowRef(router.currentRoute.value);
		const syncCurrentRoute = () => {
			_route.value = router.currentRoute.value;
		};
		router.afterEach((to, from) => {
			const lastTo = to.matched.at(-1)?.components?.default;
			const lastFrom = from.matched.at(-1)?.components?.default;
			if (lastTo === lastFrom) {
				if (generateRouteKey({
					route: to,
					Component: { type: lastTo }
				}) === generateRouteKey({
					route: from,
					Component: { type: lastFrom }
				})) syncCurrentRoute();
				return;
			}
			if (to.matched.length < from.matched.length && to.matched.every((m, i) => m.components?.default === from.matched[i]?.components?.default)) syncCurrentRoute();
		});
		const route = { sync: syncCurrentRoute };
		for (const key in _route.value) Object.defineProperty(route, key, {
			get: () => _route.value[key],
			enumerable: true
		});
		nuxtApp._route = shallowReactive(route);
		nuxtApp._middleware ||= {
			global: [],
			named: {}
		};
		const error = useError();
		const isServerPage = nuxtApp.ssrContext?.islandContext?.name?.startsWith("page_");
		function endNavigation(to) {
			delete nuxtApp._processingMiddleware;
			delete nuxtApp._middlewareTo;
		}
		if (!nuxtApp.ssrContext?.islandContext || isServerPage) router.afterEach(async (to, _from, failure) => {
			endNavigation();
			if (failure) await nuxtApp.callHook("page:loading:end");
			if (failure?.type === 4) return;
			if (to.redirectedFrom && to.fullPath !== initialURL) await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
		});
		router.onError(async (_error, to) => {
			endNavigation();
			await nuxtApp.callHook("page:loading:end");
		});
		try {
			[__temp, __restore] = executeAsync(() => router.push(initialURL)), __temp = await __temp, __restore();
			[__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
		} catch (error) {
			[__temp, __restore] = executeAsync(() => _showErrorUnlessCrawler(nuxtApp, error)), await __temp, __restore();
		}
		const resolvedInitialRoute = router.currentRoute.value;
		syncCurrentRoute();
		if (nuxtApp.ssrContext?.islandContext && !isServerPage) return { provide: { router } };
		const initialLayout = nuxtApp.payload.state._layout;
		router.beforeEach(async (to, from) => {
			return runMiddleware(to, from);
		});
		async function runMiddleware(to, from) {
			await nuxtApp.callHook("page:loading:start");
			to.meta = reactive(to.meta);
			if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) to.meta.layout = initialLayout;
			nuxtApp._processingMiddleware = true;
			nuxtApp._middlewareTo = to;
			if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
				const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
				for (const component of to.matched) {
					const componentMiddleware = component.meta.middleware;
					if (!componentMiddleware) continue;
					for (const entry of toArray(componentMiddleware)) middlewareEntries.add(entry);
				}
				const routeRules = getRouteRules({ path: to.path });
				if (routeRules.appMiddleware) for (const key in routeRules.appMiddleware) if (routeRules.appMiddleware[key]) middlewareEntries.add(key);
				else middlewareEntries.delete(key);
				for (const entry of middlewareEntries) {
					const middleware = typeof entry === "string" ? nuxtApp._middleware.named[entry] || await namedMiddleware[entry]?.().then((r) => r.default || r) : entry;
					if (!middleware) throw navigationDiagnostics.NUXT_E2004({
						entry: String(entry),
						validMiddleware: void 0
					});
					try {
						const run = () => nuxtApp.runWithContext(() => middleware(to, from));
						const result = await run();
						if (result === false || result instanceof Error) {
							const error = result || createError$2({
								status: 404,
								statusText: `Page Not Found: ${initialURL}`
							});
							await nuxtApp.runWithContext(() => showError(error));
							return false;
						}
						if (result === true) continue;
						if (result === false) return result;
						if (result) {
							if (isNuxtError(result) && result.fatal) await nuxtApp.runWithContext(() => showError(result));
							return result;
						}
					} catch (err) {
						const error = createError$2(err);
						if (error.fatal) await nuxtApp.runWithContext(() => showError(error));
						return error;
					}
				}
			}
		}
		if (isServerPage) router.beforeResolve((to) => {
			const expected = pageIslandRoutes[nuxtApp.ssrContext.islandContext.name];
			const actual = to.matched.find((m) => (m.components?.default)?.__nuxt_island)?.components?.default;
			if (!expected || expected !== actual?.__nuxt_island) {
				nuxtApp.ssrContext["~renderResponse"] = {
					statusCode: 400,
					statusMessage: "Invalid island request path"
				};
				return false;
			}
		});
		router.afterEach((to, _from, failure) => {
			if (to.matched.length === 0 && !error.value && !isNavigationFailure(failure, NavigationFailureType.aborted | NavigationFailureType.cancelled)) return nuxtApp.runWithContext(() => showError(createError$2({
				status: 404,
				fatal: false,
				statusText: `Page not found: ${to.fullPath}`,
				data: { path: to.fullPath }
			})));
		});
		nuxtApp.hooks.hookOnce("app:created", async () => {
			try {
				if ("name" in resolvedInitialRoute) resolvedInitialRoute.name = void 0;
				await router.replace({
					...resolvedInitialRoute,
					force: true
				});
				router.options.scrollBehavior = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior;
			} catch (error) {
				await _showErrorUnlessCrawler(nuxtApp, error);
			}
		});
		return { provide: { router } };
	}
});
// node_modules/nuxt/dist/app/plugins/revive-payload.server.js
var reducers = [
	["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
	["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
	["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
	["Ref", (data) => isRef(data) && data.value],
	["Reactive", (data) => isReactive(data) && toRaw(data)]
];
var plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:revive-payload:server",
	setup() {
		for (const [reducer, fn] of reducers) definePayloadReducer(reducer, fn);
	}
});
// node_modules/nuxt-ai-ready/dist/runtime/markdown-path.js
var RE_TRAILING_SLASHES = /\/+$/;
var RE_FILE_EXTENSION = /\.[a-z][a-z\d]*$/i;
var RE_RESERVED_PATH = /^\/(?:api(?:\/|$)|_|@(?:id|fs|vite|react-refresh)(?:\/|$))/;
function isReservedPath(path) {
	return RE_RESERVED_PATH.test(path);
}
function normalizePagePath(path) {
	return path.replace(RE_TRAILING_SLASHES, "") || "/";
}
function toMarkdownPath(path) {
	const normalizedPath = normalizePagePath(path);
	if (normalizedPath === "/") return "/index.md";
	return `${normalizedPath}.md`;
}
function hasMarkdownTwin(path) {
	const lastSegment = normalizePagePath(path).split("/").pop() || "";
	return !isReservedPath(path) && !RE_FILE_EXTENSION.test(lastSegment);
}
function markdownAlternatePath(path) {
	return hasMarkdownTwin(path) ? toMarkdownPath(path) : null;
}
// node_modules/nuxt-ai-ready/dist/runtime/app/plugins/md-alternate.server.js
var md_alternate_server_default = defineNuxtPlugin({ setup() {
	const path = useRequestURL().pathname;
	const markdownPath = markdownAlternatePath(path);
	if (!markdownPath) return;
	const runtimeConfig = useRuntimeConfig();
	const describedby = runtimeConfig["nuxt-ai-ready"]?.describedby !== false;
	useHead({ link: [{
		rel: "alternate",
		type: "text/markdown",
		href: markdownPath
	}, ...describedby ? [{
		rel: "describedby",
		href: joinURL(runtimeConfig.app.baseURL, "llms.txt")
	}] : []] });
} });
// node_modules/nuxt-ai-ready/dist/runtime/app/plugins/md-hints.prerender.js
var md_hints_prerender_default = defineNuxtPlugin({ setup(nuxtApp) {
	return;
} });
// node_modules/nuxt-site-config/dist/runtime/app/composables/useSiteConfig.js
function useSiteConfig(options) {
	const stack = useRequestEvent()?.context.siteConfig?.get(defu({ resolveRefs: true }, options)) || reactive({});
	delete stack._priority;
	return stack;
}
// node_modules/nuxt-seo-utils/dist/runtime/app/plugins/siteConfig.js
var siteConfig_default = defineNuxtPlugin(() => {
	const head = injectHead();
	if (!head) return;
	const { tagPriority, separator, titleSeparator } = useRuntimeConfig().public["seo-utils"];
	const siteConfig = useSiteConfig();
	const resolvedSeparator = siteConfig.separator || separator || siteConfig.titleSeparator || titleSeparator;
	const resolvedTitleSeparator = siteConfig.titleSeparator || titleSeparator || siteConfig.separator || separator;
	const input = {
		meta: [],
		templateParams: {
			site: siteConfig,
			siteUrl: siteConfig.url,
			siteName: siteConfig.name
		}
	};
	if (resolvedSeparator) input.templateParams.separator = resolvedSeparator;
	if (resolvedTitleSeparator) input.templateParams.titleSeparator = resolvedTitleSeparator;
	if (siteConfig.description) {
		input.templateParams.siteDescription = siteConfig.description;
		input.meta.push({
			name: "description",
			content: "%site.description",
			tagPriority
		});
	}
	head.push(input);
});
// node_modules/@unhead/vue/dist/plugins.mjs
var plugins_exports = /* @__PURE__ */ __exportAll({});
__reExport(plugins_exports, import__Users_ccci_Desktop_Projects_ReactPortfolio_node_modules_unhead_dist_plugins_mjs);
// node_modules/nuxt-seo-utils/dist/runtime/app/plugins/inferSeoMetaPlugin.js
var inferSeoMetaPlugin_default = defineNuxtPlugin(() => {
	const head = injectHead();
	if (!head) return;
	const { automaticTwitterTags } = useRuntimeConfig().public["seo-utils"];
	head.use(plugins_exports.TemplateParamsPlugin);
	if (automaticTwitterTags === false) head.use((0, plugins_exports.InferSeoMetaPlugin)({ twitterCard: false }));
	else head.use((0, plugins_exports.InferSeoMetaPlugin)());
});
// node_modules/nuxt-seo-utils/dist/runtime/app/composables/useFallbackTitle.js
function useFallbackTitle() {
	const route = useRoute();
	const err = useError();
	let i18n;
	try {
		i18n = useNuxtApp().$i18n;
	} catch {}
	return computed(() => {
		if (err.value?.statusCode && [404, 500].includes(err.value.statusCode)) return `${err.value.statusCode} - ${err.value.message}`;
		if (typeof route.meta?.title === "string") return route.meta?.title;
		const lastSegment = withoutTrailingSlash(route.path || "/").split("/").pop();
		let fallback = lastSegment ? titleCase(lastSegment) : null;
		const matched = route.matched?.at(-1);
		if (matched) {
			const routeName = String(matched.name).split("___")?.[0];
			if (routeName && i18n) fallback = i18n.t(`pages.${routeName}.title`, fallback || "", { missingWarn: false }) || fallback;
		}
		return fallback;
	});
}
// node_modules/nuxt-seo-utils/dist/runtime/app/plugins/titles.js
var titles_default = defineNuxtPlugin({
	name: "nuxt-seo:fallback-titles",
	env: { islands: false },
	setup() {
		const title = useFallbackTitle();
		useHead({ title: () => title.value }, { tagPriority: 101 });
	}
});
var OG_URL_KEY = "nuxt-seo-utils:og-url";
// node_modules/nuxt-seo-utils/dist/runtime/app/logic/syncDerivedTags.js
function entryOf(tag) {
	return tag._p === void 0 ? void 0 : tag._p >> 10;
}
function metaKey(tag) {
	const key = tag.props.property ?? tag.props.name;
	return typeof key === "string" ? key : void 0;
}
function isOgImage(tag) {
	return tag.tag === "meta" && metaKey(tag) === "og:image";
}
function ogImageEntryIds(entryTags) {
	const ids = /* @__PURE__ */ new Set();
	for (const tags of entryTags) {
		const tag = tags.find(isOgImage);
		const id = tag && entryOf(tag);
		if (id !== void 0) ids.add(id);
	}
	return ids;
}
function syncDerivedTags(tags, entriesWithOgImage) {
	const winningOgImageEntries = /* @__PURE__ */ new Set();
	let canonicalTag;
	for (const tag of tags) {
		if (isOgImage(tag)) winningOgImageEntries.add(entryOf(tag));
		if (!canonicalTag && tag.tag === "link" && tag.props.rel === "canonical") canonicalTag = tag;
	}
	const canonicalHref = canonicalTag?.props.href;
	const lostOgImage = (tag) => {
		const entry = entryOf(tag);
		return entry !== void 0 && entriesWithOgImage.has(entry) && !winningOgImageEntries.has(entry);
	};
	const result = [];
	for (const tag of tags) {
		if (tag.tag === "meta") {
			if (metaKey(tag)?.startsWith("og:image:") && lostOgImage(tag)) continue;
			if (tag.key?.startsWith("nuxt-seo-utils:twitter-image-fallback") && lostOgImage(tag)) continue;
			if (tag.key === "nuxt-seo-utils:og-url") {
				if (typeof canonicalHref !== "string" || !canonicalHref) continue;
				result.push({
					...tag,
					props: {
						...tag.props,
						content: canonicalHref
					}
				});
				continue;
			}
		}
		result.push(tag);
	}
	return result;
}
// node_modules/nuxt-seo-utils/dist/runtime/app/plugins/derivedTags.js
var derivedTags_default = defineNuxtPlugin({
	name: "nuxt-seo:derived-tags",
	setup() {
		const head = injectHead();
		head.use({
			key: "nuxt-seo-utils:derived-tags",
			hooks: { "tags:beforeResolve": (ctx) => {
				const entryTags = [...head.entries.values()].map((entry) => entry._tags || entry._precomputedTags || []);
				ctx.tags = syncDerivedTags(ctx.tags, ogImageEntryIds(entryTags));
			} }
		});
	}
});
// node_modules/nuxt-schema-org/dist/vendor/schema-org-v3/shared/schema-org.B7dF02JN.mjs
// @__NO_SIDE_EFFECTS__
function defineSchemaOrgResolver(schema) {
	return schema;
}
var PROTOCOL_RE = /^[\s\w\0+.-]{2,}:(?:[/\\]{2})?/;
var JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol$1(input) {
	return PROTOCOL_RE.test(input);
}
function withoutTrailingSlash$1(input = "") {
	return (input.endsWith("/") ? input.slice(0, -1) : input) || "/";
}
function withTrailingSlash$1(input = "") {
	return input.endsWith("/") ? input : `${input}/`;
}
function joinURL$1(base, input) {
	if (!input || input === "/") return base || "";
	return base ? withTrailingSlash$1(base) + input.replace(JOIN_LEADING_SLASH_RE, "") : input;
}
function withBase$1(input, base) {
	if (!base || base === "/" || hasProtocol$1(input)) return input;
	const normalizedBase = withoutTrailingSlash$1(base);
	if (input.startsWith(normalizedBase)) {
		const nextChar = input[normalizedBase.length];
		if (!nextChar || nextChar === "/" || nextChar === "?") return input;
	}
	return joinURL$1(normalizedBase, input);
}
function idReference(node) {
	return { "@id": typeof node !== "string" ? node["@id"] : node };
}
var IS_VALID_W3C_DATE = [
	/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
	/^\d{4}-[01]\d-[0-3]\d$/,
	/^\d{4}-[01]\d$/,
	/^\d{4}$/
];
function isValidW3CDate(d) {
	return IS_VALID_W3C_DATE.some((r) => r.test(d));
}
function resolvableDateToIso(val) {
	if (!val) return val;
	try {
		if (val instanceof Date) return val.toISOString();
		else if (isValidW3CDate(val)) return val;
		else return new Date(Date.parse(val)).toISOString();
	} catch {}
	return typeof val === "string" ? val : val.toString();
}
var IdentityId = "#identity";
function isHomePage(meta) {
	return meta.path === "/";
}
function setIfEmpty(node, field, value) {
	if (node?.[field] === void 0 && value != null) node[field] = value;
}
function asArray(input) {
	return Array.isArray(input) ? input : [input];
}
function prefixId(url, id) {
	if (hasProtocol$1(id)) return id;
	if (!id.includes("#")) id = `#${id}`;
	return `${url || ""}${id}`;
}
function resolveDefaultType(node, defaultType) {
	const val = node["@type"];
	if (val === defaultType) return;
	if (typeof val === "string" && typeof defaultType === "string") {
		if (val !== defaultType) node["@type"] = [defaultType, val];
		return;
	}
	const types = new Set(asArray(defaultType));
	for (const t of asArray(val)) if (t != null) types.add(t);
	const resolved = [...types];
	node["@type"] = resolved.length === 1 ? resolved[0] : resolved;
}
function resolveWithBase(base, urlOrPath) {
	if (!base || !urlOrPath || hasProtocol$1(urlOrPath) || urlOrPath[0] !== "/" && urlOrPath[0] !== "#") return urlOrPath;
	return withBase$1(urlOrPath, base);
}
function resolveAsGraphKey(key) {
	if (!key) return key;
	return key.substring(key.lastIndexOf("#"));
}
function stripEmptyProperties(obj) {
	for (const k in obj) {
		if (!hasOwn(obj, k)) continue;
		const v = obj[k];
		if (v === "" || v === void 0) delete obj[k];
		else if (typeof v === "object" && v !== null) {
			if (v.__v_isReadonly || v.__v_isRef) continue;
			stripEmptyProperties(v);
		}
	}
	return obj;
}
function stripNullProperties(obj) {
	if (Array.isArray(obj)) {
		let next = 0;
		for (let i = 0; i < obj.length; i++) {
			const v = obj[i];
			if (v === null) continue;
			if (typeof v === "object" && v !== null) stripNullProperties(v);
			obj[next++] = v;
		}
		obj.length = next;
		return obj;
	}
	for (const k in obj) {
		if (!hasOwn(obj, k)) continue;
		const v = obj[k];
		if (v === null) delete obj[k];
		else if (typeof v === "object") {
			if (v.__v_isReadonly || v.__v_isRef) continue;
			stripNullProperties(v);
		}
	}
	return obj;
}
var interactionCounterResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "InteractionCounter" } });
var propertyValueResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "PropertyValue" } });
var definedRegionResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "DefinedRegion" } });
var quantitativeValueResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	cast(node) {
		if (typeof node === "number") return { value: node };
		return node;
	},
	defaults: { "@type": "QuantitativeValue" },
	resolve(node, ctx) {
		node.valueReference = resolveRelation(node.valueReference, ctx, quantitativeValueResolver);
		return node;
	}
});
var monetaryAmountResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "MonetaryAmount" },
	resolve(node, ctx) {
		if (typeof node.value === "object") node.value = resolveRelation(node.value, ctx, quantitativeValueResolver);
		return node;
	}
});
var merchantReturnPolicyResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "MerchantReturnPolicy" },
	resolve(node, ctx) {
		if (node.returnPolicyCategory) node.returnPolicyCategory = withBase$1(node.returnPolicyCategory, "https://schema.org/");
		if (node.returnFees) node.returnFees = withBase$1(node.returnFees, "https://schema.org/");
		if (node.returnMethod) node.returnMethod = withBase$1(node.returnMethod, "https://schema.org/");
		node.returnShippingFeesAmount = resolveRelation(node.returnShippingFeesAmount, ctx, monetaryAmountResolver);
		return node;
	}
});
var unitPriceSpecificationResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "UnitPriceSpecification" },
	resolve(node, ctx) {
		if (node.price !== void 0) setIfEmpty(node, "priceCurrency", ctx.meta.currency);
		if (node.priceType) node.priceType = withBase$1(node.priceType, "https://schema.org/");
		node.referenceQuantity = resolveRelation(node.referenceQuantity, ctx, quantitativeValueResolver);
		node.validForMemberTier = resolveRelation(node.validForMemberTier, ctx, memberProgramTierResolver);
		node.validFrom = resolvableDateToIso(node.validFrom);
		node.validThrough = resolvableDateToIso(node.validThrough);
		return node;
	}
});
var addressResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "PostalAddress" } });
var listItemResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	cast(node) {
		if (typeof node === "string") node = { name: node };
		return node;
	},
	defaults: { "@type": "ListItem" },
	resolve(node, ctx) {
		if (typeof node.item === "string") node.item = resolveWithBase(ctx.meta.host, node.item);
		else if (typeof node.item === "object") node.item = resolveRelation(node.item, ctx);
		if (node.url) node.url = resolveWithBase(ctx.meta.host, node.url);
		return node;
	}
});
var PrimaryBreadcrumbId = "#breadcrumb";
var breadcrumbResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "BreadcrumbList" },
	idPrefix: ["url", PrimaryBreadcrumbId],
	resolve(breadcrumb, ctx) {
		if (breadcrumb.itemListElement) {
			let index = 1;
			breadcrumb.itemListElement = resolveRelation(breadcrumb.itemListElement, ctx, listItemResolver, {
				array: true,
				afterResolve(node) {
					setIfEmpty(node, "position", index++);
				}
			});
		}
		return breadcrumb;
	},
	resolveRootNode(node, { find }) {
		const webPage = find(PrimaryWebPageId);
		if (webPage) setIfEmpty(webPage, "breadcrumb", idReference(node));
	}
});
var clipResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "Clip" },
	resolve(node, ctx) {
		node.url = resolveWithBase(ctx.meta.host, node.url);
		return node;
	}
});
var broadcastEventResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "BroadcastEvent" },
	resolve(node) {
		node.startDate = resolvableDateToIso(node.startDate);
		node.endDate = resolvableDateToIso(node.endDate);
		return node;
	}
});
var seekToActionResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "SeekToAction" },
	resolve(node, ctx) {
		node.target = resolveWithBase(ctx.meta.host, node.target);
		return node;
	}
});
var videoResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	cast(input) {
		if (typeof input === "string") input = { url: input };
		return input;
	},
	alias: "video",
	defaults: { "@type": "VideoObject" },
	inheritMeta: [
		{
			meta: "title",
			key: "name"
		},
		"description",
		"image",
		"inLanguage",
		{
			meta: "datePublished",
			key: "uploadDate"
		}
	],
	idPrefix: "host",
	resolve(video, ctx) {
		if (video.uploadDate) video.uploadDate = resolvableDateToIso(video.uploadDate);
		video.expires = resolvableDateToIso(video.expires);
		if (video.url) video.url = resolveWithBase(ctx.meta.host, video.url);
		if (video.contentUrl) video.contentUrl = resolveWithBase(ctx.meta.host, video.contentUrl);
		if (video.embedUrl) video.embedUrl = resolveWithBase(ctx.meta.host, video.embedUrl);
		if (video.caption && !video.description) video.description = video.caption;
		if (!video.description) video.description = "No description";
		if (video.thumbnailUrl && (typeof video.thumbnailUrl === "string" || Array.isArray(video.thumbnailUrl))) {
			const images = asArray(video.thumbnailUrl).map((image) => resolveWithBase(ctx.meta.host, image));
			video.thumbnailUrl = images.length > 1 ? images : images[0];
		}
		if (video.thumbnail) video.thumbnail = resolveRelation(video.thumbnail, ctx, imageResolver);
		video.hasPart = resolveRelation(video.hasPart, ctx, clipResolver);
		video.interactionStatistic = resolveRelation(video.interactionStatistic, ctx, interactionCounterResolver);
		video.potentialAction = resolveRelation(video.potentialAction, ctx, seekToActionResolver);
		video.publication = resolveRelation(video.publication, ctx, broadcastEventResolver);
		return video;
	},
	resolveRootNode(video, { find, meta }) {
		if (video.image && !video.thumbnailUrl) {
			const firstImage = asArray(video.image)[0];
			if (typeof firstImage === "string") setIfEmpty(video, "thumbnailUrl", resolveWithBase(meta.host, firstImage));
			else if (firstImage?.["@id"]) setIfEmpty(video, "thumbnailUrl", find(firstImage["@id"], isImageObject)?.url);
		}
	}
});
var PrimaryArticleId = "#article";
var searchActionResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: {
		"@type": "SearchAction",
		"target": { "@type": "EntryPoint" },
		"query-input": {
			"@type": "PropertyValueSpecification",
			"valueRequired": true,
			"valueName": "search_term_string"
		}
	},
	resolve(node, ctx) {
		if (typeof node.target === "string") node.target = {
			"@type": "EntryPoint",
			"urlTemplate": resolveWithBase(ctx.meta.host, node.target)
		};
		return node;
	}
});
var PrimaryWebSiteId = "#website";
var webSiteResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "WebSite" },
	inheritMeta: ["inLanguage", {
		meta: "host",
		key: "url"
	}],
	idPrefix: ["host", PrimaryWebSiteId],
	resolve(node, ctx) {
		node.potentialAction = resolveRelation(node.potentialAction, ctx, searchActionResolver, { array: true });
		node.publisher = resolveRelation(node.publisher, ctx);
		node.dateModified = resolvableDateToIso(node.dateModified);
		node.datePublished = resolvableDateToIso(node.datePublished);
		return node;
	},
	resolveRootNode(node, { find }) {
		if (resolveAsGraphKey(node["@id"]) === "#website") {
			const identity = find(IdentityId);
			if (identity) setIfEmpty(node, "publisher", idReference(identity));
			const webPage = find(PrimaryWebPageId);
			if (webPage) setIfEmpty(webPage, "isPartOf", idReference(node));
		}
		return node;
	}
});
var personResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	cast(node) {
		if (typeof node === "string") return { name: node };
		return node;
	},
	defaults: { "@type": "Person" },
	idPrefix: ["host", IdentityId],
	resolve(node, ctx) {
		if (node.identifier) {
			const resolveIdentifier = (identifier) => typeof identifier === "string" ? identifier : resolveRelation(identifier, ctx, propertyValueResolver);
			node.identifier = Array.isArray(node.identifier) ? node.identifier.map(resolveIdentifier) : resolveIdentifier(node.identifier);
		}
		node.agentInteractionStatistic = resolveRelation(node.agentInteractionStatistic, ctx, interactionCounterResolver);
		node.interactionStatistic = resolveRelation(node.interactionStatistic, ctx, interactionCounterResolver);
		if (node.url) node.url = resolveWithBase(ctx.meta.host, node.url);
		return node;
	},
	resolveRootNode(node, { find, meta }) {
		if (resolveAsGraphKey(node["@id"]) === IdentityId) {
			setIfEmpty(node, "url", meta.host);
			const webPage = find(PrimaryWebPageId);
			if (webPage && isHomePage(meta)) setIfEmpty(webPage, "about", idReference(node));
			const webSite = find(PrimaryWebSiteId);
			if (webSite) setIfEmpty(webSite, "publisher", idReference(node));
		}
		const article = find(PrimaryArticleId);
		if (article) setIfEmpty(article, "author", idReference(node));
	}
});
var readActionResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "ReadAction" },
	resolve(node, ctx) {
		node.target ||= [];
		if (!node.target.includes(ctx.meta.url)) node.target.unshift(ctx.meta.url);
		return node;
	}
});
var speakableSpecificationResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "SpeakableSpecification" } });
var webPageElementResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "WebPageElement" } });
var PrimaryWebPageId = "#webpage";
var webPageResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults({ meta }) {
		const endPath = withoutTrailingSlash$1(meta.path.substring(meta.path.lastIndexOf("/") + 1));
		let type = "WebPage";
		switch (endPath) {
			case "about":
			case "about-us":
				type = "AboutPage";
				break;
			case "search":
				type = "SearchResultsPage";
				break;
			case "checkout":
				type = "CheckoutPage";
				break;
			case "contact":
			case "get-in-touch":
			case "contact-us":
				type = "ContactPage";
				break;
			case "faq": type = "FAQPage";
		}
		return { "@type": type };
	},
	idPrefix: ["url", PrimaryWebPageId],
	inheritMeta: [
		{
			meta: "title",
			key: "name"
		},
		"description",
		"datePublished",
		"dateModified",
		"url"
	],
	resolve(node, ctx) {
		node.dateCreated = resolvableDateToIso(node.dateCreated);
		node.dateModified = resolvableDateToIso(node.dateModified);
		node.datePublished = resolvableDateToIso(node.datePublished);
		resolveDefaultType(node, "WebPage");
		node.about = resolveRelation(node.about, ctx, organizationResolver);
		node.breadcrumb = resolveRelation(node.breadcrumb, ctx, breadcrumbResolver);
		node.author = resolveRelation(node.author, ctx, personResolver);
		if (node.hasPart) {
			const resolvePart = (part) => {
				return typeof part === "object" && part !== null && (part["@type"] === "WebPageElement" || "cssSelector" in part) ? resolveRelation(part, ctx, webPageElementResolver) : resolveRelation(part, ctx);
			};
			node.hasPart = Array.isArray(node.hasPart) ? node.hasPart.map(resolvePart) : resolvePart(node.hasPart);
		}
		if (node.primaryImageOfPage === false) node.primaryImageOfPage = null;
		node.primaryImageOfPage = resolveRelation(node.primaryImageOfPage, ctx, imageResolver);
		node.speakable = resolveRelation(node.speakable, ctx, speakableSpecificationResolver);
		node.video = resolveRelation(node.video, ctx, videoResolver);
		if (Array.isArray(node["@type"]) && node["@type"].includes("ProfilePage")) node.mainEntity = resolveIdentityRelation(node.mainEntity, ctx, {
			organization: organizationResolver,
			person: personResolver
		}, { root: true });
		if (node.potentialAction) {
			const resolveAction = (action) => {
				if (!action || typeof action !== "object") return action;
				const type = action["@type"];
				return type === "ReadAction" || Array.isArray(type) && type.includes("ReadAction") || "target" in action ? resolveRelation(action, ctx, readActionResolver) : resolveRelation(action, ctx);
			};
			node.potentialAction = Array.isArray(node.potentialAction) ? node.potentialAction.map(resolveAction) : resolveAction(node.potentialAction);
		}
		if (node["@type"] === "WebPage" && ctx.meta.url) setIfEmpty(node, "potentialAction", [{
			"@type": "ReadAction",
			"target": [ctx.meta.url]
		}]);
		return node;
	},
	resolveRootNode(webPage, { find, meta }) {
		const identity = find(IdentityId);
		const webSite = find(PrimaryWebSiteId);
		const logo = find("#logo");
		if (identity && isHomePage(meta)) setIfEmpty(webPage, "about", idReference(identity));
		if (logo) setIfEmpty(webPage, "primaryImageOfPage", idReference(logo));
		if (webSite) setIfEmpty(webPage, "isPartOf", idReference(webSite));
		const breadcrumb = find(PrimaryBreadcrumbId);
		if (breadcrumb) setIfEmpty(webPage, "breadcrumb", idReference(breadcrumb));
		return webPage;
	}
});
var contactPointResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "ContactPoint" } });
var creditCardResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "CreditCard" } });
var memberProgramTierResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "MemberProgramTier" },
	resolve(node, ctx) {
		node.hasTierBenefit = Array.isArray(node.hasTierBenefit) ? node.hasTierBenefit.map((benefit) => withBase$1(benefit, "https://schema.org/")) : withBase$1(node.hasTierBenefit, "https://schema.org/");
		if (node.hasTierRequirement) {
			const requirement = node.hasTierRequirement;
			if (typeof requirement === "object") {
				const types = asArray(requirement["@type"]);
				if (types.includes("CreditCard")) node.hasTierRequirement = resolveRelation(requirement, ctx, creditCardResolver);
				else if (types.includes("MonetaryAmount") || "currency" in requirement) node.hasTierRequirement = resolveRelation(requirement, ctx, monetaryAmountResolver);
				else node.hasTierRequirement = resolveRelation(requirement, ctx, unitPriceSpecificationResolver);
			}
		}
		node.isTierOf = resolveRelation(node.isTierOf, ctx, memberProgramResolver);
		node.membershipPointsEarned = resolveRelation(node.membershipPointsEarned, ctx, quantitativeValueResolver);
		if (node.url) node.url = resolveWithBase(ctx.meta.host, node.url);
		return node;
	}
});
var memberProgramResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "MemberProgram" },
	resolve(node, ctx) {
		node.hasTiers = resolveRelation(node.hasTiers, ctx, memberProgramTierResolver);
		if (node.url) node.url = resolveWithBase(ctx.meta.host, node.url);
		return node;
	}
});
var servicePeriodResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "ServicePeriod" },
	resolve(node, ctx) {
		node.duration = resolveRelation(node.duration, ctx, quantitativeValueResolver);
		return node;
	}
});
var shippingRateSettingsResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "ShippingRateSettings" } });
var shippingSeasonalOverrideResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "OpeningHoursSpecification" },
	resolve(node) {
		node.validFrom = resolvableDateToIso(node.validFrom);
		node.validThrough = resolvableDateToIso(node.validThrough);
		return node;
	}
});
var shippingConditionsResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "ShippingConditions" },
	resolve(node, ctx) {
		node.numItems = resolveRelation(node.numItems, ctx, quantitativeValueResolver);
		node.orderValue = resolveRelation(node.orderValue, ctx, monetaryAmountResolver);
		node.seasonalOverride = resolveRelation(node.seasonalOverride, ctx, shippingSeasonalOverrideResolver);
		node.shippingDestination = resolveRelation(node.shippingDestination, ctx, definedRegionResolver);
		node.shippingOrigin = resolveRelation(node.shippingOrigin, ctx, definedRegionResolver);
		if (node.shippingRate) node.shippingRate = typeof node.shippingRate === "object" && ("orderPercentage" in node.shippingRate || "weightPercentage" in node.shippingRate) ? resolveRelation(node.shippingRate, ctx, shippingRateSettingsResolver) : resolveRelation(node.shippingRate, ctx, monetaryAmountResolver);
		node.transitTime = resolveRelation(node.transitTime, ctx, servicePeriodResolver);
		node.weight = resolveRelation(node.weight, ctx, quantitativeValueResolver);
		return node;
	}
});
var shippingServiceResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "ShippingService" },
	resolve(node, ctx) {
		if (node.fulfillmentType) node.fulfillmentType = withBase$1(node.fulfillmentType, "https://schema.org/");
		node.handlingTime = resolveRelation(node.handlingTime, ctx, servicePeriodResolver);
		node.shippingConditions = resolveRelation(node.shippingConditions, ctx, shippingConditionsResolver);
		node.validForMemberTier = resolveRelation(node.validForMemberTier, ctx, memberProgramTierResolver);
		return node;
	}
});
var organizationResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	cast(node) {
		if (typeof node === "string") return { name: node };
		return node;
	},
	defaults: { "@type": "Organization" },
	idPrefix: ["host", IdentityId],
	inheritMeta: [{
		meta: "host",
		key: "url"
	}],
	resolve(node, ctx) {
		resolveDefaultType(node, "Organization");
		node.address = resolveRelation(node.address, ctx, addressResolver);
		node.agentInteractionStatistic = resolveRelation(node.agentInteractionStatistic, ctx, interactionCounterResolver);
		node.contactPoint = resolveRelation(node.contactPoint, ctx, contactPointResolver);
		node.hasMemberProgram = resolveRelation(node.hasMemberProgram, ctx, memberProgramResolver);
		node.hasMerchantReturnPolicy = resolveRelation(node.hasMerchantReturnPolicy, ctx, merchantReturnPolicyResolver);
		node.hasShippingService = resolveRelation(node.hasShippingService, ctx, shippingServiceResolver);
		if (node.identifier) {
			const resolveIdentifier = (identifier) => typeof identifier === "string" ? identifier : resolveRelation(identifier, ctx, propertyValueResolver);
			node.identifier = Array.isArray(node.identifier) ? node.identifier.map(resolveIdentifier) : resolveIdentifier(node.identifier);
		}
		node.interactionStatistic = resolveRelation(node.interactionStatistic, ctx, interactionCounterResolver);
		node.numberOfEmployees = resolveRelation(node.numberOfEmployees, ctx, quantitativeValueResolver);
		if (node.url) node.url = resolveWithBase(ctx.meta.host, node.url);
		return node;
	},
	resolveRootNode(node, ctx) {
		const isIdentity = resolveAsGraphKey(node["@id"]) === IdentityId;
		const webPage = ctx.find(PrimaryWebPageId);
		if (node.logo && isIdentity) {
			const logoNode = resolveRelation(Array.isArray(node.logo) ? node.logo[0] : node.logo, ctx, imageResolver, {
				root: true,
				afterResolve(logo) {
					logo["@id"] = prefixId(ctx.meta.host, "#logo");
					setIfEmpty(logo, "caption", node.name);
				}
			});
			if (webPage && logoNode) setIfEmpty(webPage, "primaryImageOfPage", idReference(logoNode));
			if (node["@type"] === "Organization") node.logo = logoNode;
			else if (!ctx.find("#organization")) {
				const resolvedLogo = logoNode && typeof logoNode === "object" && logoNode["@id"] ? ctx.find(logoNode["@id"], isImageObject) : null;
				ctx.nodes.push({
					"@type": "Organization",
					"name": node.name,
					"url": node.url,
					"sameAs": node.sameAs,
					"address": node.address,
					"logo": resolvedLogo?.url,
					"_priority": -1,
					"@id": prefixId(ctx.meta.host, "#organization")
				});
			}
			if (node["@type"] !== "Organization") delete node.logo;
		}
		if (isIdentity && webPage && isHomePage(ctx.meta)) setIfEmpty(webPage, "about", idReference(node));
		const webSite = ctx.find(PrimaryWebSiteId);
		if (webSite) setIfEmpty(webSite, "publisher", idReference(node));
	}
});
function isImageObject(node) {
	return typeof node.url === "string" || typeof node.contentUrl === "string";
}
var imageResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	alias: "image",
	cast(input) {
		if (typeof input === "string") input = { url: input };
		return input;
	},
	defaults: { "@type": "ImageObject" },
	inheritMeta: ["inLanguage"],
	idPrefix: "host",
	resolve(image, ctx) {
		const { meta } = ctx;
		if (image.url) image.url = resolveWithBase(meta.host, image.url);
		if (image.contentUrl) image.contentUrl = resolveWithBase(meta.host, image.contentUrl);
		setIfEmpty(image, "contentUrl", image.url);
		setIfEmpty(image, "url", image.contentUrl);
		image.creator = resolveIdentityRelation(image.creator, ctx, {
			organization: organizationResolver,
			person: personResolver
		}, { root: true });
		if (image.license) image.license = resolveWithBase(meta.host, image.license);
		if (image.acquireLicensePage) image.acquireLicensePage = resolveWithBase(meta.host, image.acquireLicensePage);
		if (image.height && !image.width) delete image.height;
		if (image.width && !image.height) delete image.width;
		return image;
	}
});
var ALIAS_RE = /([a-z])([A-Z])/g;
function nextNodeId(ctx, alias) {
	ctx.nodeIdCounters[alias] = (ctx.nodeIdCounters[alias] || 0) + 1;
	return ctx.nodeIdCounters[alias].toString();
}
var ABSOLUTE_URL_RE = /^https?:\/\//i;
var QUERY_RE = /[?#]/;
var HASH_RE = /#/;
var TRAILING_SLASHES_RE = /\/+$/;
function parseAbsoluteUrl(url) {
	if (!ABSOLUTE_URL_RE.test(url)) return void 0;
	try {
		return new URL(url);
	} catch {
		return;
	}
}
function parseMetaUrl(input, host) {
	const url = input.split(HASH_RE, 1)[0];
	if (url.startsWith("/") && !url.startsWith("//")) return {
		url: host ? joinURL$1(host, url) : url,
		path: url.split(QUERY_RE, 1)[0]
	};
	const parsed = parseAbsoluteUrl(url);
	if (!parsed) return void 0;
	const hostUrl = host ? parseAbsoluteUrl(host) : void 0;
	if (!hostUrl) return {
		url,
		path: parsed.pathname
	};
	const basePath = hostUrl.pathname.replace(TRAILING_SLASHES_RE, "");
	if (hostUrl.origin === parsed.origin && (parsed.pathname === basePath || parsed.pathname.startsWith(`${basePath}/`))) return {
		url,
		path: parsed.pathname.slice(basePath.length) || "/"
	};
	return { url };
}
function resolveMeta(meta) {
	const explicit = meta.url ? parseMetaUrl(meta.url, meta.host) : void 0;
	if (explicit?.path && !meta.host && ABSOLUTE_URL_RE.test(explicit.url)) meta.host = new URL(explicit.url).origin;
	if (explicit?.path) meta.path = explicit.path;
	if (!meta.path) meta.path = "/";
	if (!meta.host && false);
	if (meta.path !== "/") {
		if (meta.trailingSlash && !meta.path.endsWith("/")) meta.path = withTrailingSlash$1(meta.path);
		else if (!meta.trailingSlash && meta.path.endsWith("/")) meta.path = withoutTrailingSlash$1(meta.path);
	}
	const siteUrl = joinURL$1(meta.host || "", meta.path);
	const resolved = meta;
	resolved.url = explicit?.url || siteUrl;
	resolved.idUrl = explicit?.path ? explicit.url : siteUrl;
	return resolved;
}
function resolveNode(node, ctx, resolver) {
	if (resolver?.cast) node = resolver.cast(node, ctx);
	if (resolver?.defaults) {
		let defaults = resolver.defaults;
		if (typeof defaults === "function") defaults = defaults(ctx);
		node = {
			...defaults,
			...node
		};
	}
	const inheritMeta = resolver?.inheritMeta;
	if (inheritMeta) for (let i = 0; i < inheritMeta.length; i++) {
		const entry = inheritMeta[i];
		if (typeof entry === "string") setIfEmpty(node, entry, ctx.meta[entry]);
		else setIfEmpty(node, entry.key, ctx.meta[entry.meta]);
	}
	if (resolver?.resolve) node = resolver.resolve(node, ctx);
	for (const k in node) {
		const v = node[k];
		if (Array.isArray(v)) for (let i = 0; i < v.length; i++) {
			const item = v[i];
			if (typeof item === "object" && item?._resolver) node[k][i] = resolveRelation(item, ctx, item._resolver);
		}
		else if (typeof v === "object" && v?._resolver) node[k] = resolveRelation(v, ctx, v._resolver);
	}
	stripEmptyProperties(node);
	return node;
}
function idBase(ctx, prefix) {
	return prefix === "url" ? ctx.meta.idUrl : ctx.meta.host;
}
function resolveNodeId(node, ctx, resolver, resolveAsRoot = false) {
	if (node["@id"] && node["@id"].startsWith("http")) return node;
	const prefix = resolver ? (Array.isArray(resolver.idPrefix) ? resolver.idPrefix[0] : resolver.idPrefix) || "url" : "url";
	const rootId = node["@id"] || (resolver ? Array.isArray(resolver.idPrefix) ? resolver.idPrefix?.[1] : void 0 : "");
	if (!node["@id"] && resolveAsRoot && rootId) {
		node["@id"] = prefixId(idBase(ctx, prefix), rootId);
		return node;
	}
	if (node["@id"]?.startsWith("#/schema/") || node["@id"]?.startsWith("/")) {
		node["@id"] = prefixId(idBase(ctx, prefix), node["@id"]);
		return node;
	}
	let alias = resolver?.alias;
	if (!alias) alias = (asArray(node["@type"])?.[0] || "").replace(ALIAS_RE, "$1-$2").toLowerCase();
	node["@id"] = prefixId(idBase(ctx, prefix), `#/schema/${alias}/${node["@id"] || nextNodeId(ctx, alias)}`);
	return node;
}
function resolveRelation(input, ctx, fallbackResolver, options = {}) {
	if (!input) return input;
	const items = asArray(input);
	const ids = [];
	for (let i = 0; i < items.length; i++) {
		const a = items[i];
		if (!a) {
			ids.push(a);
			continue;
		}
		let keyCount = 0;
		for (const _ in a) keyCount++;
		if (keyCount === 1 && a["@id"] || keyCount === 2 && a["@id"] && a["@type"]) {
			ids.push(resolveNodeId({ "@id": ctx.find(a["@id"])?.["@id"] || a["@id"] }, ctx));
			continue;
		}
		let resolver = fallbackResolver;
		if (a._resolver && typeof a._resolver !== "string") {
			resolver = a._resolver;
			delete a._resolver;
		}
		if (!resolver) {
			ids.push(a);
			continue;
		}
		let node = resolveNode(a, ctx, resolver);
		if (options.afterResolve) options.afterResolve(node);
		if (options.generateId || options.root) node = resolveNodeId(node, ctx, resolver, false);
		if (options.root) {
			if (resolver.resolveRootNode) resolver.resolveRootNode(node, ctx);
			ctx.push(node);
			ids.push(idReference(node["@id"]));
			continue;
		}
		ids.push(node);
	}
	return !options.array && ids.length === 1 ? ids[0] : ids;
}
function merge(target, source) {
	if (!source) return target;
	for (const key in source) {
		if (!hasOwn(source, key) || key === "__proto__" || key === "constructor" || key === "prototype") continue;
		const value = source[key];
		if (value === void 0) continue;
		if (Array.isArray(target[key])) {
			if (Array.isArray(value)) {
				const merged = [...target[key], ...value];
				if (key === "@type") target[key] = [...new Set(merged)];
				else if (key === "itemListElement") {
					merged.sort((a, b) => (a.position || 0) - (b.position || 0));
					for (let i = 0; i < merged.length; i++) merged[i].position = i + 1;
					target[key] = merged;
				} else if (key === "potentialAction") {
					const byType = /* @__PURE__ */ Object.create(null);
					for (const action of merged) {
						const type = action["@type"];
						if (byType[type]) {
							if (action.target && byType[type].target) {
								const a = Array.isArray(byType[type].target) ? byType[type].target : [byType[type].target];
								const b = Array.isArray(action.target) ? action.target : [action.target];
								byType[type].target = [.../* @__PURE__ */ new Set([...a, ...b])];
							}
						} else byType[type] = { ...action };
					}
					target[key] = Object.values(byType);
				} else if (merged.length > 0 && merged.every((item) => item && typeof item === "object" && item["@type"])) {
					const byType = /* @__PURE__ */ Object.create(null);
					for (const item of merged) byType[item["@type"]] = item;
					target[key] = Object.values(byType);
				} else target[key] = merged;
			} else target[key] = merge(target[key], [value]);
		} else if (target[key] && typeof target[key] === "object" && typeof value === "object" && !Array.isArray(value)) target[key] = merge({ ...target[key] }, value);
		else target[key] = value;
	}
	return target;
}
var DOMAIN_RE = /(?:https?:)?\/\//;
function indexNode(index, node) {
	if (!node["@id"]) return;
	const nodeId = node["@id"];
	const fragmentKey = resolveAsGraphKey(nodeId);
	index.set(fragmentKey, node);
	index.set(nodeId, node);
	const domainKey = nodeId.replace(DOMAIN_RE, "").split("/")[0];
	index.set(domainKey, node);
}
function createSchemaOrgGraph() {
	let ctx;
	function find(id, guard) {
		const matchFragment = id[0] === "#";
		const matchDomain = id[0] === "/" && id[1] === "/";
		const key = matchFragment ? resolveAsGraphKey(id) : matchDomain ? id.replace(DOMAIN_RE, "").split("/")[0] : id;
		let node = ctx.nodeIndex.size > 0 ? ctx.nodeIndex.get(key) : void 0;
		if (!node) for (let i = 0; i < ctx.nodes.length; i++) {
			const candidate = ctx.nodes[i];
			const nodeId = candidate["@id"];
			if (!nodeId) continue;
			if ((matchFragment ? resolveAsGraphKey(nodeId) : matchDomain ? nodeId.replace(DOMAIN_RE, "").split("/")[0] : nodeId) === key) {
				node = candidate;
				break;
			}
		}
		if (!node || guard && !guard(node)) return null;
		return node;
	}
	ctx = {
		find,
		push(input) {
			if (Array.isArray(input)) for (let i = 0; i < input.length; i++) {
				const registeredNode = input[i];
				ctx.nodes.push(registeredNode);
				if (ctx.nodeIndex.size > 0) indexNode(ctx.nodeIndex, registeredNode);
			}
			else {
				const registeredNode = input;
				ctx.nodes.push(registeredNode);
				if (ctx.nodeIndex.size > 0) indexNode(ctx.nodeIndex, registeredNode);
			}
		},
		resolveGraph(meta) {
			for (const k in ctx.nodeIdCounters) delete ctx.nodeIdCounters[k];
			ctx.meta = resolveMeta({ ...meta });
			const len = ctx.nodes.length;
			for (let i = 0; i < len; i++) {
				let node = ctx.nodes[i];
				const resolver = node._resolver;
				node = resolveNode(node, ctx, resolver);
				node = resolveNodeId(node, ctx, resolver, true);
				ctx.nodes[i] = node;
			}
			const dedupedNodes = /* @__PURE__ */ Object.create(null);
			let hasDuplicates = false;
			ctx.nodeIndex.clear();
			for (let i = 0; i < ctx.nodes.length; i++) {
				const n = ctx.nodes[i];
				const nodeKey = resolveAsGraphKey(n["@id"]);
				if (dedupedNodes[nodeKey]) {
					hasDuplicates = true;
					if (n._dedupeStrategy !== "replace") dedupedNodes[nodeKey] = merge(dedupedNodes[nodeKey], n);
					else dedupedNodes[nodeKey] = n;
				} else dedupedNodes[nodeKey] = n;
			}
			if (hasDuplicates) ctx.nodes = Object.values(dedupedNodes);
			for (let i = 0; i < ctx.nodes.length; i++) indexNode(ctx.nodeIndex, ctx.nodes[i]);
			const countBeforeRelations = ctx.nodes.length;
			for (let i = 0; i < ctx.nodes.length; i++) {
				const node = ctx.nodes[i];
				if (node.image && typeof node.image === "string") node.image = resolveRelation(node.image, ctx, imageResolver, { root: true });
				node.translationOfWork = resolveRelation(node.translationOfWork, ctx);
				node.workTranslation = resolveRelation(node.workTranslation, ctx);
				const resolver = node._resolver;
				if (resolver?.resolveRootNode) resolver.resolveRootNode(node, ctx);
			}
			for (let i = 0; i < ctx.nodes.length; i++) delete ctx.nodes[i]._resolver;
			for (let i = 0; i < ctx.nodes.length; i++) stripNullProperties(ctx.nodes[i]);
			const needsDedupe = ctx.nodes.length > countBeforeRelations;
			const normalizedNodes = needsDedupe ? /* @__PURE__ */ Object.create(null) : null;
			const result = needsDedupe ? null : [];
			for (let i = 0; i < ctx.nodes.length; i++) {
				const n = ctx.nodes[i];
				const nodeKey = resolveAsGraphKey(n["@id"]);
				const keys = Object.keys(n);
				keys.sort();
				const newNode = {};
				let relationCount = 0;
				for (let j = 0; j < keys.length; j++) {
					const k = keys[j];
					if (k[0] === "_") continue;
					const v = n[k];
					if (v !== null && (Array.isArray(v) || typeof v === "object")) keys[relationCount++] = k;
					else newNode[k] = v;
				}
				for (let j = 0; j < relationCount; j++) {
					const k = keys[j];
					newNode[k] = n[k];
				}
				if (needsDedupe) normalizedNodes[nodeKey] = normalizedNodes[nodeKey] ? merge(normalizedNodes[nodeKey], newNode) : newNode;
				else result.push(newNode);
			}
			return needsDedupe ? Object.values(normalizedNodes) : result;
		},
		nodes: [],
		nodeIndex: /* @__PURE__ */ new Map(),
		nodeIdCounters: /* @__PURE__ */ Object.create(null),
		meta: resolveMeta({})
	};
	return ctx;
}
function resolveIdentityRelation(input, ctx, resolvers, options = {}) {
	if (!input) return input;
	const resolveIdentity = (identity) => {
		const types = typeof identity === "object" && identity ? asArray(identity["@type"]).filter((type) => typeof type === "string") : [];
		return resolveRelation(identity, ctx, types.length > 0 && !types.includes("Person") ? resolvers.organization : resolvers.person, options);
	};
	if (!Array.isArray(input)) return resolveIdentity(input);
	const resolved = input.map(resolveIdentity);
	return resolved.length === 1 ? resolved[0] : resolved;
}
var aggregateRatingResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "AggregateRating" },
	resolve(node, ctx) {
		node.itemReviewed = resolveRelation(node.itemReviewed, ctx);
		return node;
	}
});
var openingHoursResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: {
		"@type": "OpeningHoursSpecification",
		"opens": "00:00",
		"closes": "23:59"
	},
	resolve(node) {
		node.validFrom = resolvableDateToIso(node.validFrom);
		node.validThrough = resolvableDateToIso(node.validThrough);
		return node;
	}
});
var itemListResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "ItemList" },
	resolve(node, ctx) {
		if (node.itemListElement) {
			let index = 1;
			node.itemListElement = resolveRelation(node.itemListElement, ctx, listItemResolver, {
				array: true,
				afterResolve(node2) {
					setIfEmpty(node2, "position", index++);
				}
			});
		}
		return node;
	}
});
var ratingResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	cast(node) {
		if (typeof node === "number") return { ratingValue: node };
		return node;
	},
	defaults: {
		"@type": "Rating",
		"bestRating": 5,
		"worstRating": 1
	}
});
var reviewResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "Review" },
	inheritMeta: ["inLanguage"],
	resolve(review, ctx) {
		review.reviewRating = resolveRelation(review.reviewRating, ctx, ratingResolver);
		review.author = resolveIdentityRelation(review.author, ctx, {
			organization: organizationResolver,
			person: personResolver
		});
		review.itemReviewed = resolveRelation(review.itemReviewed, ctx);
		review.negativeNotes = resolveRelation(review.negativeNotes, ctx, itemListResolver);
		review.positiveNotes = resolveRelation(review.positiveNotes, ctx, itemListResolver);
		review.contentReferenceTime = resolvableDateToIso(review.contentReferenceTime);
		review.datePublished = resolvableDateToIso(review.datePublished);
		return review;
	}
});
var geoCoordinatesResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "GeoCoordinates" } });
var localBusinessResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": ["Organization", "LocalBusiness"] },
	inheritMeta: [{
		key: "url",
		meta: "host"
	}, {
		key: "currenciesAccepted",
		meta: "currency"
	}],
	idPrefix: ["host", IdentityId],
	resolve(node, ctx) {
		resolveDefaultType(node, ["Organization", "LocalBusiness"]);
		node.address = resolveRelation(node.address, ctx, addressResolver);
		node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
		node.department = resolveRelation(node.department, ctx, localBusinessResolver);
		node.geo = resolveRelation(node.geo, ctx, geoCoordinatesResolver);
		node.openingHoursSpecification = resolveRelation(node.openingHoursSpecification, ctx, openingHoursResolver);
		node.review = resolveRelation(node.review, ctx, reviewResolver);
		if (node.menu) node.menu = resolveWithBase(ctx.meta.host, node.menu);
		node = resolveNode({ ...node }, ctx, organizationResolver);
		return node;
	},
	resolveRootNode(node, ctx) {
		organizationResolver.resolveRootNode(node, ctx);
		return node;
	}
});
function mergeObjects(target, source) {
	const result = { ...target };
	for (const key in source) {
		if (!hasOwn(source, key) || source[key] === void 0 || key === "__proto__" || key === "constructor" || key === "prototype") continue;
		if (result[key] && typeof result[key] === "object" && typeof source[key] === "object" && !Array.isArray(result[key]) && !Array.isArray(source[key])) result[key] = mergeObjects(result[key], source[key]);
		else if (!result[key]) result[key] = source[key];
	}
	return result;
}
function isSchemaOrgTag(tag) {
	return tag.tag === "script" && tag.props.type === "application/ld+json" && tag.props.nodes || tag.key === "schema-org-graph";
}
function UnheadSchemaOrg(config = {}, meta = () => ({}), options) {
	let graph;
	let resolvedMeta = {};
	let canonical;
	return defineHeadPlugin((head) => {
		head.use(TemplateParamsPlugin);
		function collectMeta(props) {
			if (typeof props.content !== "string") return;
			if (props.name === "description") resolvedMeta.description = props.content;
			else if (props.property === "og:image") resolvedMeta.image = props.content;
		}
		function collectTag(tag) {
			if (tag.tag === "script" && tag.props.type === "application/ld+json" && (tag.props.nodes || tag.key === "schema-org-graph")) {
				const nodes = tag.props.nodes;
				if (nodes) for (const node of Array.isArray(nodes) ? nodes : [nodes]) {
					if (typeof node !== "object" || node === null) continue;
					const newNode = {
						...node,
						_dedupeStrategy: tag.tagDuplicateStrategy
					};
					graph.push(newNode);
				}
				tag.tagPosition = tag.tagPosition || (config.tagPosition === "head" ? "head" : "bodyClose");
			}
			if (tag.tag === "meta") collectMeta(tag.props);
			else if (tag.tag === "_flatMeta") for (const props of unpackMeta(tag.props)) collectMeta(props);
			else if (tag.tag === "htmlAttrs" && typeof tag.props.lang === "string") resolvedMeta.inLanguage = tag.props.lang;
			else if (tag.tag === "title" && tag.textContent != null && typeof tag.textContent !== "function") resolvedMeta.title = String(tag.textContent);
			else if (tag.tag === "link" && tag.props.rel === "canonical" && typeof tag.props.href === "string") canonical = tag.props.href;
			else if (tag.tag === "templateParams" && tag.props.schemaOrg) resolvedMeta = {
				...resolvedMeta,
				...tag.props.schemaOrg
			};
		}
		return {
			key: "schema-org",
			hooks: {
				"entries:resolve": (ctx) => {
					graph = graph || createSchemaOrgGraph();
					graph.nodes = [];
					graph.nodeIndex.clear();
					resolvedMeta = {};
					canonical = void 0;
					for (const entry of ctx.entries) if (entry._tags) {
						if (entry._tags.some(isSchemaOrgTag)) {
							delete entry._tags;
							continue;
						}
						for (const tag of entry._tags) collectTag(tag);
					}
				},
				"entries:normalize": ({ tags }) => {
					for (const tag of tags) collectTag(tag);
				},
				"tags:resolve": (ctx) => {
					for (const k in ctx.tags) {
						const tag = ctx.tags[k];
						if (tag.tag === "script" && tag.props.type === "application/ld+json" && (tag.props.nodes || tag.key === "schema-org-graph")) {
							delete tag.props.nodes;
							const graphMeta = {
								...meta?.() || {},
								...config,
								...resolvedMeta
							};
							if (canonical && !graphMeta.url) graphMeta.url = processTemplateParams(canonical, head._templateParams, head._separator);
							const resolvedGraph = graph.resolveGraph(graphMeta);
							if (!resolvedGraph.length) {
								tag.props = {};
								return;
							}
							options?.minify || true;
							tag.innerHTML = JSON.stringify({
								"@context": "https://schema.org",
								"@graph": resolvedGraph
							}, (_, value) => {
								if (typeof value === "string") return processTemplateParams(value, head._templateParams, head._separator);
								return value;
							}, 0 );
							return;
						}
					}
				},
				"tags:afterResolve": (ctx) => {
					let firstNodeIdx;
					let toRemove;
					for (let i = 0; i < ctx.tags.length; i++) {
						const tag = ctx.tags[i];
						if (!tag?.props) continue;
						if (isSchemaOrgTag(tag)) {
							delete tag.props.nodes;
							if (typeof firstNodeIdx === "undefined") {
								firstNodeIdx = i;
								continue;
							}
							ctx.tags[firstNodeIdx].props = mergeObjects(ctx.tags[firstNodeIdx].props, tag.props);
							delete ctx.tags[firstNodeIdx].props.nodes;
							(toRemove ||= /* @__PURE__ */ new Set()).add(i);
						}
					}
					if (toRemove) ctx.tags = ctx.tags.filter((_, i) => !toRemove.has(i));
				}
			}
		};
	}, "schema-org");
}
// node_modules/nuxt-schema-org/dist/vendor/schema-org-v3/vue.mjs
function withResolver(input, resolver) {
	return {
		...input,
		_resolver: resolver
	};
}
function provideResolver(input, resolver) {
	const resolvedInput = input || {};
	if (isRef(resolvedInput)) return computed(() => {
		const value = resolvedInput.value;
		return value && typeof value === "object" ? withResolver(value, resolver) : value;
	});
	return withResolver(resolvedInput, resolver);
}
function defineLocalBusiness(input) {
	return provideResolver(input, localBusinessResolver);
}
function defineOrganization(input) {
	return provideResolver(input, organizationResolver);
}
function definePerson(input) {
	return provideResolver(input, personResolver);
}
function defineWebPage(input) {
	return provideResolver(input, webPageResolver);
}
function defineWebSite(input) {
	return provideResolver(input, webSiteResolver);
}
// node_modules/site-config-stack/dist/urls.mjs
var FILE_EXT_RE = /\.[0-9a-z]+$/i;
function resolveSitePath(pathOrUrl, options) {
	let path = pathOrUrl;
	if (hasProtocol(pathOrUrl, {
		strict: false,
		acceptRelative: true
	})) path = parseURL(pathOrUrl).pathname;
	const base = withLeadingSlash(options.base || "/");
	if (base !== "/" && path.startsWith(base)) path = path.slice(base.length);
	let origin = withoutTrailingSlash(options.absolute ? options.siteUrl : "");
	if (base !== "/" && origin.endsWith(base)) origin = origin.slice(0, origin.indexOf(base));
	const baseWithOrigin = options.withBase ? withBase(base, origin || "/") : origin;
	const resolvedUrl = withBase(path, baseWithOrigin);
	return path === "/" && !options.withBase ? withTrailingSlash(resolvedUrl) : fixSlashes(options.trailingSlash, resolvedUrl);
}
var fileExtensions = [
	"jpg",
	"jpeg",
	"png",
	"gif",
	"bmp",
	"webp",
	"svg",
	"ico",
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
	"zip",
	"rar",
	"7z",
	"tar",
	"gz",
	"mp3",
	"wav",
	"flac",
	"ogg",
	"opus",
	"m4a",
	"aac",
	"midi",
	"mid",
	"mp4",
	"avi",
	"mkv",
	"mov",
	"wmv",
	"flv",
	"webm",
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
	"php",
	"py",
	"rb",
	"java",
	"c",
	"cpp",
	"h",
	"go",
	"csv",
	"tsv",
	"sql",
	"yaml",
	"yml",
	"woff",
	"woff2",
	"ttf",
	"otf",
	"eot",
	"exe",
	"msi",
	"apk",
	"ipa",
	"dmg",
	"iso",
	"bin",
	"bat",
	"cmd",
	"sh",
	"env",
	"htaccess",
	"conf",
	"toml",
	"ini",
	"deb",
	"rpm",
	"jar",
	"war",
	"epub",
	"mobi",
	"log",
	"tmp",
	"bak",
	"old",
	"sav"
];
function isPathFile(path) {
	const ext = (path.split("/").pop() || path).match(FILE_EXT_RE)?.[0];
	return !!(ext && fileExtensions.includes(ext.replace(".", "")));
}
function fixSlashes(trailingSlash, pathOrUrl) {
	const $url = parseURL(pathOrUrl);
	if (isPathFile($url.pathname)) return pathOrUrl;
	const fixedPath = trailingSlash ? withTrailingSlash($url.pathname) : withoutTrailingSlash($url.pathname);
	return `${$url.protocol ? `${$url.protocol}//` : ""}${$url.host || ""}${fixedPath}${$url.search || ""}${$url.hash || ""}`;
}
// node_modules/nuxt-site-config/dist/runtime/app/composables/getNitroOrigin.js
function getNitroOrigin(e) {
	e = e || useRequestEvent();
	return e?.context?.siteConfigNitroOrigin || "";
}
// node_modules/nuxt-site-config/dist/runtime/app/composables/utils.js
function createSitePathResolver(options = {}) {
	const siteConfig = useSiteConfig();
	const nitroOrigin = getNitroOrigin();
	const nuxtBase = useRuntimeConfig().app.baseURL || "/";
	return (path) => {
		return computed(() => resolveSitePath(unref(path), {
			absolute: unref(options.absolute),
			withBase: unref(options.withBase),
			siteUrl: unref(options.canonical) !== false || false ? siteConfig.url : nitroOrigin,
			trailingSlash: siteConfig.trailingSlash,
			base: nuxtBase
		}));
	};
}
function withSiteUrl(path, options = {}) {
	const siteConfig = useSiteConfig();
	const nitroOrigin = getNitroOrigin();
	const base = useRuntimeConfig().app.baseURL || "/";
	return computed(() => {
		return resolveSitePath(unref(path), {
			absolute: true,
			siteUrl: unref(options.canonical) !== false || false ? siteConfig.url : nitroOrigin,
			trailingSlash: siteConfig.trailingSlash,
			base,
			withBase: unref(options.withBase)
		});
	});
}
// node_modules/nuxt-schema-org/dist/runtime/app/utils/config.js
function useSchemaOrgConfig() {
	const runtimeConfig = useRuntimeConfig();
	return defu(runtimeConfig["nuxt-schema-org"], { scriptAttributes: {} });
}
// node_modules/nuxt-schema-org/dist/runtime/app/composables/useSchemaOrg.js
function useSchemaOrg(input) {
	const config = useSchemaOrgConfig();
	useNuxtApp();
	let nodes = input;
	if (isRef(input)) nodes = toValue(input);
	const script = {
		type: "application/ld+json",
		key: "schema-org-graph",
		nodes,
		tagPriority: "high",
		...config.scriptAttributes
	};
	return useHead({ script: [script] });
}
// node_modules/nuxt-schema-org/dist/runtime/app/utils/shared.js
function resolvePathDirect(siteConfig, path, options) {
	const nuxtBase = useRuntimeConfig().app.baseURL || "/";
	return resolveSitePath(path, {
		absolute: options.absolute,
		withBase: options.withBase,
		siteUrl: toValue(siteConfig.url),
		trailingSlash: toValue(siteConfig.trailingSlash),
		base: nuxtBase
	});
}
function initPlugin(nuxtApp) {
	initSchemaOrgMeta(nuxtApp);
	initSchemaOrgHead(nuxtApp);
}
function resolveSiteConfigValue(value) {
	const resolved = toValue(value);
	if (Array.isArray(resolved)) return resolved.map(resolveSiteConfigValue);
	if (!resolved || typeof resolved !== "object") return resolved;
	const proto = Object.getPrototypeOf(resolved);
	if (proto !== Object.prototype && proto !== null) return resolved;
	const copy = {};
	for (const key in resolved) copy[key] = resolveSiteConfigValue(resolved[key]);
	return copy;
}
function withoutUrl(meta) {
	const { url: _url, ...rest } = meta;
	return rest;
}
function initSchemaOrgMeta(nuxtApp) {
	const head = injectHead(nuxtApp);
	const route = useRoute();
	const siteConfig = useSiteConfig();
	const resolveUrl = (path) => resolvePathDirect(siteConfig, path, {
		absolute: true,
		withBase: true
	});
	function resolveSchemaOrg() {
		const siteConfigResolved = {};
		for (const key in siteConfig) {
			if (key.startsWith("_")) continue;
			siteConfigResolved[key] = resolveSiteConfigValue(siteConfig[key]);
		}
		return {
			...route.meta?.schemaOrg || {},
			...siteConfigResolved,
			url: toValue(resolveUrl(route.path)),
			host: withTrailingSlash(toValue(resolveUrl("/"))),
			inLanguage: toValue(siteConfigResolved.currentLocale) || toValue(siteConfigResolved.defaultLocale),
			path: route.path
		};
	}
	async function resolveSchemaOrgWithHook() {
		const meta = resolveSchemaOrg();
		const url = meta.url;
		await nuxtApp.hooks.callHook("schema-org:meta", meta);
		if (meta.url === url) return withoutUrl(meta);
		if (URL.canParse(meta.url)) {
			const parsed = new URL(meta.url);
			meta.host = withTrailingSlash(parsed.origin);
			meta.path = parsed.pathname;
		}
		return meta;
	}
	const templateParamEntry = head.push({ templateParams: { schemaOrg: withoutUrl(resolveSchemaOrg()) } });
	nuxtApp.hooks.hookOnce("app:created", async () => {
		templateParamEntry.patch({ templateParams: { schemaOrg: await resolveSchemaOrgWithHook() } });
	});
}
function initSchemaOrgHead(nuxtApp) {
	const head = injectHead(nuxtApp);
	const config = useSchemaOrgConfig();
	const siteConfig = useSiteConfig();
	const schemaOrgPlugin = UnheadSchemaOrg;
	head.use(schemaOrgPlugin({}, void 0, {
		minify: config.minify,
		trailingSlash: siteConfig.trailingSlash
	}));
}
function maybeAddIdentitySchemaOrg() {
	const config = useSchemaOrgConfig();
	const siteConfig = useSiteConfig({ resolveRefs: true });
	if (config.identity || siteConfig.identity) {
		const identity = config.identity || siteConfig.identity;
		let identityPayload = {
			name: () => toValue(siteConfig.name),
			url: () => toValue(siteConfig.url)
		};
		let identityType;
		if (typeof identity !== "string") {
			identityPayload = {
				...identityPayload,
				...resolveSiteConfigValue(identity)
			};
			identityType = identity.type;
			delete identityPayload.type;
		} else identityType = identity;
		if (siteConfig.twitter) {
			const id = siteConfig.twitter.startsWith("@") ? siteConfig.twitter.slice(1) : siteConfig.twitter;
			identityPayload.sameAs = [`https://twitter.com/${id}`];
		}
		useSchemaOrg([({
			organization: defineOrganization,
			person: definePerson,
			localbusiness: defineLocalBusiness
		}[identityType?.toLowerCase()] || defineOrganization)(identityPayload)]);
	}
}
// node_modules/nuxt-schema-org/dist/runtime/app/plugins/init.js
var init_default = defineNuxtPlugin({
	name: "nuxt-schema-org:init",
	setup(nuxtApp) {
		initPlugin(nuxtApp);
	}
});
// node_modules/nuxt-schema-org/dist/runtime/app/plugins/defaults.js
var defaults_default$1 = defineNuxtPlugin({
	name: "nuxt-schema-org:defaults",
	dependsOn: ["nuxt-schema-org:init"],
	setup() {
		if (useError().value?.error) return;
		const siteConfig = useSiteConfig();
		useSchemaOrg([defineWebSite({
			name: () => toValue(siteConfig.name) || "",
			inLanguage: () => toValue(siteConfig.currentLocale) || "",
			description: () => toValue(siteConfig.description) || ""
		}), defineWebPage()]);
		maybeAddIdentitySchemaOrg();
	}
});
// node_modules/nuxtseo-shared/dist/server.mjs
function withoutQuery$1(path) {
	const queryIndex = path.indexOf("?");
	return queryIndex === -1 ? path : path.slice(0, queryIndex);
}
function createNitroRouteRuleMatcher(runtimeConfig) {
	const { nitro, app } = runtimeConfig;
	const baseURL = app?.baseURL || "/";
	const _routeRulesMatcher = toRouteMatcher(createRouter$1({ routes: Object.fromEntries(Object.entries(nitro?.routeRules || {}).map(([path, rules]) => [withoutTrailingSlash(path), rules])) }));
	return (pathOrUrl) => {
		const path = pathOrUrl[0] === "/" ? pathOrUrl : parseURL(pathOrUrl, baseURL).pathname;
		return defu({}, ..._routeRulesMatcher.matchAll(withoutBase(withoutTrailingSlash(withoutQuery$1(path)), baseURL)).reverse());
	};
}
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fnuxt-og-image%2Fcomponents.mjs
var componentNames = [
	{
		"hash": "",
		"pascalName": "BlogPostTakumi",
		"kebabName": "blog-post-takumi",
		"path": "/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "takumi",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "BrutalistSatori",
		"kebabName": "brutalist-satori",
		"path": "/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "satori",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "DocsTakumi",
		"kebabName": "docs-takumi",
		"path": "/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "takumi",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "FrameSatori",
		"kebabName": "frame-satori",
		"path": "/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "satori",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "NuxtSatori",
		"kebabName": "nuxt-satori",
		"path": "/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "satori",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "NuxtSeoSatori",
		"kebabName": "nuxt-seo-satori",
		"path": "/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "satori",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "NuxtSeoTakumi",
		"kebabName": "nuxt-seo-takumi",
		"path": "/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "takumi",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "PergelSatori",
		"kebabName": "pergel-satori",
		"path": "/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "satori",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "ProductCardTakumi",
		"kebabName": "product-card-takumi",
		"path": "/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "takumi",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "SaaSSatori",
		"kebabName": "saa-ssatori",
		"path": "/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "satori",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "SimpleBlogSatori",
		"kebabName": "simple-blog-satori",
		"path": "/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "satori",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "UnJsSatori",
		"kebabName": "un-js-satori",
		"path": "/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "satori",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "WithEmojiSatori",
		"kebabName": "with-emoji-satori",
		"path": "/Users/ccci/Desktop/Projects/ReactPortfolio/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "satori",
		"propNames": []
	}
];
// node_modules/nuxt-og-image/dist/runtime/shared/urlEncoding.js
var MAX_PATH_LENGTH = 200;
var RE_BASE64_PADDING = /=/g;
var RE_BASE64_PLUS = /\+/g;
var RE_BASE64_SLASH = /\//g;
var RE_UNDERSCORE = /_/g;
var RE_PERCENT20 = /%20/g;
var RE_PLUS = /\+/g;
var RE_NON_ASCII = /[^\u0000-\u007F]/;
var RE_WINDOWS_RESERVED_FILENAME_CHARACTERS = /[<>:"/\\|?*\u0000-\u001F]/;
var RE_NOT_UNRESERVED = /[^\w.~-]/;
var PARAM_TO_ALIAS = Object.fromEntries(Object.entries({
	w: "width",
	h: "height",
	c: "component",
	em: "emojis",
	k: "key",
	a: "alt",
	u: "url",
	cache: "cacheMaxAgeSeconds",
	p: "_path",
	q: "_query",
	ch: "_componentHash"
}).map(([alias, param]) => [param, alias]));
var COMPLEX_PARAMS = /* @__PURE__ */ new Set([
	"satori",
	"resvg",
	"sharp",
	"screenshot",
	"takumi",
	"fonts",
	"_query",
	"_path"
]);
function b64Encode(str) {
	let encoded;
	if (typeof btoa === "function") {
		const utf8 = new TextEncoder().encode(str);
		const binary = String.fromCharCode(...utf8);
		encoded = btoa(binary);
	} else encoded = Buffer.from(str, "utf8").toString("base64");
	return encoded.replace(RE_BASE64_PADDING, "").replace(RE_BASE64_PLUS, "-").replace(RE_BASE64_SLASH, "~");
}
function canonicalJson(value) {
	if (value === null || typeof value !== "object") return JSON.stringify(value) ?? "null";
	if (Array.isArray(value)) return `[${value.map((item) => canonicalJson(item)).join(",")}]`;
	const record = value;
	return `{${Object.keys(record).sort().filter((key) => record[key] !== void 0).map((key) => `${JSON.stringify(key)}:${canonicalJson(record[key])}`).join(",")}}`;
}
var B64URL_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
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
function hashOgImageOptions(options, componentHash, version) {
	const { _path, _hash, ...rest } = options;
	const hashableOptions = rest.component === "PageScreenshot" ? {
		...rest,
		_path
	} : rest;
	return digestCanonical(hashableOptions).slice(0, 16);
}
function encodeOgImageParams(options, defaults) {
	const parts = [];
	const flattened = {};
	for (const [key, value] of Object.entries(options)) if (key === "props" && typeof value === "object") for (const [propKey, propValue] of Object.entries(value)) {
		if (propValue === void 0 || propValue === null) continue;
		if (typeof propValue === "string" || typeof propValue === "number" || typeof propValue === "boolean") flattened[propKey] = propValue;
		else {
			flattened.props = flattened.props || {};
			flattened.props[propKey] = propValue;
		}
	}
	else flattened[key] = value;
	for (const [key, value] of Object.entries(flattened)) {
		if (value === void 0 || value === null || value === "") continue;
		if (key === "extension" || key === "socialPreview") continue;
		if (key === "_path" && value === "/") continue;
		if (key === "_query" && typeof value === "object" && Object.keys(value).length === 0) continue;
		if (defaults && key in defaults && defaults[key] === value && key !== "component") continue;
		const alias = PARAM_TO_ALIAS[key] || key;
		if (COMPLEX_PARAMS.has(key)) {
			const json = JSON.stringify(value);
			if (json === "{}") continue;
			const b64 = b64Encode(json);
			parts.push(`${alias}_${b64}`);
		} else if (typeof value === "object") {
			const json = JSON.stringify(value);
			if (json === "{}") continue;
			const b64 = b64Encode(json);
			parts.push(`${alias}_${b64}`);
		} else {
			const str = String(value);
			if (RE_NON_ASCII.test(str)) parts.push(`${alias}_~${b64Encode(str)}`);
			else {
				const escaped = str.startsWith("~") ? `~${str}` : str;
				const encoded = encodeURIComponent(escaped.replace(RE_UNDERSCORE, "__")).replace(RE_PERCENT20, "+");
				if (encoded.includes("%") || RE_WINDOWS_RESERVED_FILENAME_CHARACTERS.test(str)) parts.push(`${alias}_~${b64Encode(str)}`);
				else parts.push(`${alias}_${encoded}`);
			}
		}
	}
	return parts.join(",");
}
function buildOgImageUrl(options, extension = "png", isStatic = false, defaults, secret) {
	const encoded = encodeOgImageParams(options, defaults);
	const prefix = isStatic ? "/_og/s" : "/_og/d";
	if (isStatic && (encoded.length > MAX_PATH_LENGTH || RE_NOT_UNRESERVED.test(encoded))) {
		const hash = hashOgImageOptions(options);
		return {
			url: `${prefix}/o_${hash}.${extension}`,
			hash
		};
	}
	const segment = encoded || "default";
	return { url: `${prefix}/${(secret && !isStatic ? `${segment},s_${signEncodedParams(segment, secret)}` : segment).replace(/,/g, "%2C").replace(RE_PLUS, "%2B")}.${extension}` };
}
function signEncodedParams(encoded, secret) {
	return digest(`${secret}:${encoded}`).slice(0, 16);
}
// node_modules/nuxt-og-image/dist/runtime/shared.js
var RE_KEBAB_CASE = /-([a-z])/g;
function generateMeta(url, resolvedOptions, metaOptions = {}) {
	const key = resolvedOptions.key || "og";
	const isTwitterOnly = key === "twitter";
	const includeTwitter = (key === "og" || key === "twitter") && metaOptions.includeTwitter !== false;
	const meta = [];
	if (includeTwitter) {
		meta.push({
			name: "twitter:card",
			content: "summary_large_image",
			tagPriority: "low"
		});
		meta.push({
			name: "twitter:image",
			content: url
		});
	}
	if (!isTwitterOnly) {
		meta.push({
			property: "og:image",
			content: url
		});
		meta.push({
			property: "og:image:type",
			content: () => `image/${getExtension(toValue(url)) || resolvedOptions.extension}`
		});
	}
	if (resolvedOptions.width) {
		if (!isTwitterOnly) meta.push({
			property: "og:image:width",
			content: resolvedOptions.width
		});
	}
	if (resolvedOptions.height) {
		if (!isTwitterOnly) meta.push({
			property: "og:image:height",
			content: resolvedOptions.height
		});
	}
	if (resolvedOptions.alt) {
		if (!isTwitterOnly) meta.push({
			property: "og:image:alt",
			content: resolvedOptions.alt
		});
		if (includeTwitter) meta.push({
			name: "twitter:image:alt",
			content: resolvedOptions.alt
		});
	}
	for (const tag of meta) tag.tagPriority ??= "high";
	return meta;
}
function isInternalRoute(path) {
	return path.startsWith("/_") || path.startsWith("@");
}
function filterIsOgImageOption(key) {
	return [
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
	].includes(key);
}
function separateProps(options, ignoreKeys = []) {
	options = options || {};
	const _props = defu(options.props, Object.fromEntries(Object.entries({ ...options }).filter(([k]) => !filterIsOgImageOption(k) && !ignoreKeys.includes(k))));
	const props = {};
	Object.entries(_props).forEach(([key, val]) => {
		props[key.replace(RE_KEBAB_CASE, (g) => String(g[1]).toUpperCase())] = val;
	});
	const result = Object.fromEntries(Object.entries({ ...options }).filter(([k]) => filterIsOgImageOption(k) || ignoreKeys.includes(k)));
	if (Object.keys(props).length > 0) result.props = props;
	return result;
}
function withoutQuery(path) {
	return path.split("?")[0];
}
function getExtension(path) {
	path = withoutQuery(path);
	const lastSegment = path.split("/").pop() || path;
	const extension = lastSegment.split(".").pop() || lastSegment;
	if (extension === "jpg") return "jpeg";
	return extension;
}
var RE_RENDERER_SUFFIX = /(Satori|Browser|Takumi)$/;
function createOgImageMeta(src, input, ssrContext, pagePath, head) {
	const ogImageConfig = useOgImageRuntimeConfig();
	const { defaults } = ogImageConfig;
	const resolvedOptions = separateProps(defu(input, defaults));
	resolvedOptions.key = resolvedOptions.key || "og";
	const payloads = ssrContext._ogImagePayloads || [];
	const currentPayloadIdx = payloads.findIndex(([k]) => k === resolvedOptions.key);
	const _input = separateProps(defu(input, currentPayloadIdx >= 0 ? payloads[currentPayloadIdx][1] : {}));
	if (!src && !input.url && !resolvedOptions.url) return;
	const basePath = "/";
	if (currentPayloadIdx === -1) payloads.push([
		resolvedOptions.key,
		_input,
		basePath
	]);
	else payloads[currentPayloadIdx] = [
		resolvedOptions.key,
		_input,
		basePath
	];
	const baseURL = useRuntimeConfig().app.baseURL;
	const resolveImageUrl = createSitePathResolver({
		absolute: true,
		withBase: true,
		canonical: true
	});
	ssrContext._ogImageInstance?.dispose();
	ssrContext._ogImageInstance = useHead({ meta() {
		const finalPayload = ssrContext._ogImagePayloads || [];
		return finalPayload.flatMap(([_, options, payloadBasePath]) => {
			const opts = {
				...options,
				props: { ...options.props }
			};
			const rawComponentName = opts.component || componentNames?.[0]?.pascalName;
			const resolvedComponentName = rawComponentName ? resolveComponentName(rawComponentName) : void 0;
			(resolvedComponentName ? componentNames?.find((c) => c.pascalName === resolvedComponentName || c.kebabName === resolvedComponentName) : void 0)?.propNames;
			const extension = opts.extension || defaults?.extension || "png";
			const isStatic = false;
			const urlOpts = {
				...opts,
				_path: payloadBasePath
			};
			const componentName = opts.component || componentNames?.[0]?.pascalName;
			const component = componentNames?.find((c) => c.pascalName === componentName || c.kebabName === componentName);
			if (component?.hash) urlOpts._componentHash = component.hash;
			const result = buildOgImageUrl(urlOpts, extension, isStatic, defaults, ogImageConfig.security?.secret || void 0);
			if (result.hash) {
				opts._hash = result.hash;
				options._hash = result.hash;
			}
			const resolvedUrl = joinURL("/", baseURL, result.url);
			const finalUrl = opts._query && Object.keys(opts._query).length ? withQuery(resolvedUrl, { _query: opts._query }) : resolvedUrl;
			return generateMeta(toValue(resolveImageUrl(finalUrl)), opts, { includeTwitter: ogImageConfig.includeTwitter });
		});
	} }, { processTemplateParams: true });
	ssrContext._ogImagePayloads = payloads;
}
function resolveComponentName(component) {
	component = component || componentNames?.[0]?.pascalName;
	if (component && componentNames) {
		const originalName = component;
		const normalizedName = originalName.split(".").map((s, i) => i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)).join("");
		const inputBase = normalizedName.replace(RE_RENDERER_SUFFIX, "");
		const requestedRenderer = normalizedName.match(RE_RENDERER_SUFFIX)?.[1]?.toLowerCase();
		for (const component2 of componentNames) {
			if (component2.pascalName === normalizedName) return component2.pascalName;
			if (requestedRenderer && component2.renderer !== requestedRenderer) continue;
			const basePascalName = component2.pascalName.replace(RE_RENDERER_SUFFIX, "");
			if (basePascalName === originalName || basePascalName === inputBase) return component2.pascalName;
			for (const { prefix, overlapWord } of [
				{
					prefix: "OgImageCommunity",
					overlapWord: "Community"
				},
				{
					prefix: "OgImageTemplate",
					overlapWord: "Template"
				},
				{
					prefix: "OgImage",
					overlapWord: "Image"
				}
			]) {
				if (!basePascalName.startsWith(prefix)) continue;
				const withoutPrefix = basePascalName.slice(prefix.length);
				if (withoutPrefix === originalName || withoutPrefix === inputBase) return component2.pascalName;
				if (withoutPrefix && withoutPrefix !== overlapWord) {
					const withOverlap = overlapWord + withoutPrefix;
					if (withOverlap === originalName || withOverlap === inputBase) return component2.pascalName;
				}
				break;
			}
		}
	}
	return component;
}
function getOgImagePath(_pagePath, _options) {
	const { app, defaults, security } = useOgImageRuntimeConfig();
	const baseURL = app.baseURL;
	const extension = _options?.extension || defaults?.extension || "png";
	const isStatic = false;
	const options = {
		..._options,
		_path: _pagePath
	};
	const componentName = _options?.component || componentNames?.[0]?.pascalName;
	const component = componentNames?.find((c) => c.pascalName === componentName || c.kebabName === componentName);
	if (component?.hash) options._componentHash = component.hash;
	const result = buildOgImageUrl(options, extension, isStatic, defaults, security?.secret || void 0);
	return {
		path: joinURL("/", baseURL, result.url),
		hash: result.hash
	};
}
function useOgImageRuntimeConfig() {
	const event = useRequestEvent();
	const c = event ? useRuntimeConfig() : useRuntimeConfig();
	const serverCfg = c["nuxt-og-image"] || {};
	const merged = {
		defaults: {},
		...c.public?.["nuxt-og-image"] || {},
		...serverCfg
	};
	const overrideSecret = event?.context._ogImageSigningSecret;
	if (overrideSecret) merged.security = {
		...merged.security || {},
		secret: overrideSecret
	};
	merged.app = { baseURL: c.app.baseURL };
	return merged;
}
var ogImageCanonicalUrls = defineNuxtPlugin((nuxtApp) => {
	nuxtApp.hooks.hook("app:rendered", async (ctx) => {
		const { ssrContext } = ctx;
		const e = useRequestEvent();
		const path = parseURL(e?.path || "").pathname;
		if (isInternalRoute(path)) return;
		ssrContext?.head.use(plugins_exports.TemplateParamsPlugin);
		ssrContext?.head.use({
			key: "nuxt-og-image:overrides-and-canonical-urls",
			hooks: { "tags:afterResolve": (ctx2) => {
				let title = "";
				let description = "";
				for (const tag of ctx2.tags) {
					if (tag.tag === "title" && tag.textContent) title = tag.textContent;
					else if (tag.tag === "meta" && tag.props.name === "description") description = tag.props.content || "";
					if (title && description) break;
				}
				for (const tag of ctx2.tags) if (tag.tag === "meta" && (tag.props.property === "og:image" || tag.props.name === "twitter:image")) {
					if (!tag.props.content) {
						tag.props = {};
						continue;
					}
					tag.props.content = tag.props.content.replaceAll("%title", title).replaceAll("%description", description).replaceAll(" ", "+");
					if (!/^https?:\/\//.test(tag.props.content || "")) nuxtApp.runWithContext(() => {
						tag.props.content = toValue(withSiteUrl(tag.props.content || "", {
							withBase: true,
							canonical: true
						}));
					});
				}
			} }
		});
	});
});
var routeRuleOgImage = defineNuxtPlugin((nuxtApp) => {
	nuxtApp.hooks.hook("app:rendered", async (ctx) => {
		const { ssrContext } = ctx;
		const e = useRequestEvent();
		const path = parseURL(e?.path || "").pathname;
		if (isInternalRoute(path)) return;
		let routeRules = createNitroRouteRuleMatcher(ssrContext?.runtimeConfig || {})(path).ogImage;
		if (typeof routeRules === "undefined") return;
		if (routeRules === false) {
			nuxtApp.ssrContext._ogImageInstance?.dispose();
			nuxtApp.ssrContext._ogImageDevtoolsInstance?.dispose();
			nuxtApp.ssrContext._ogImageInstance = void 0;
			nuxtApp.ssrContext._ogImagePayloads = [];
			return;
		}
		routeRules = defu(nuxtApp.ssrContext?.event?.context._nitro?.routeRules?.ogImage, routeRules);
		const { path: src, hash } = getOgImagePath(ssrContext.url, routeRules);
		if (hash) routeRules._hash = hash;
		createOgImageMeta(src, routeRules, nuxtApp.ssrContext);
	});
});
// node_modules/nuxt-og-image/dist/runtime/app/plugins/og-image-canonical-urls.server.js
var og_image_canonical_urls_server_default = defineNuxtPlugin((nuxtApp) => ogImageCanonicalUrls(nuxtApp));
// node_modules/nuxt-og-image/dist/runtime/app/plugins/route-rule-og-image.server.js
var route_rule_og_image_server_default = defineNuxtPlugin((nuxtApp) => routeRuleOgImage(nuxtApp));
// node_modules/@nuxtjs/robots/dist/runtime/app/plugins/robot-meta.server.js
var robot_meta_server_default = defineNuxtPlugin({ setup() {
	const event = useRequestEvent();
	const ctx = event?.context?.robots;
	event?.context?.robotsProduction;
	if (!ctx) return;
	useHead({ meta: [{
		"name": "robots",
		"content": () => ctx.rule || "",
		"data-hint": () => void 0,
		"data-production-content": () => void 0
	}] });
} });
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue?nuxt_component=async&nuxt_component_name=ProseA&nuxt_component_export=default
var ProseA_default = defineAsyncComponent(() => import('../build/ProseA-tDBbR5Gk.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue?nuxt_component=async&nuxt_component_name=ProseBlockquote&nuxt_component_export=default
var ProseBlockquote_default = defineAsyncComponent(() => import('../build/ProseBlockquote-FH8zh-4G.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseCode.vue?nuxt_component=async&nuxt_component_name=ProseCode&nuxt_component_export=default
var ProseCode_default = defineAsyncComponent(() => import('../build/ProseCode-CmIN3zTM.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue?nuxt_component=async&nuxt_component_name=ProseEm&nuxt_component_export=default
var ProseEm_default = defineAsyncComponent(() => import('../build/ProseEm-D_9fExB8.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH1.vue?nuxt_component=async&nuxt_component_name=ProseH1&nuxt_component_export=default
var ProseH1_default = defineAsyncComponent(() => import('../build/ProseH1-Epto38J7.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH2.vue?nuxt_component=async&nuxt_component_name=ProseH2&nuxt_component_export=default
var ProseH2_default = defineAsyncComponent(() => import('../build/ProseH2-cXI1Zwg5.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH3.vue?nuxt_component=async&nuxt_component_name=ProseH3&nuxt_component_export=default
var ProseH3_default = defineAsyncComponent(() => import('../build/ProseH3-Bj9Bd2Qs.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH4.vue?nuxt_component=async&nuxt_component_name=ProseH4&nuxt_component_export=default
var ProseH4_default = defineAsyncComponent(() => import('../build/ProseH4-BZuW_7k7.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue?nuxt_component=async&nuxt_component_name=ProseH5&nuxt_component_export=default
var ProseH5_default = defineAsyncComponent(() => import('../build/ProseH5-D2odQaEn.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue?nuxt_component=async&nuxt_component_name=ProseH6&nuxt_component_export=default
var ProseH6_default = defineAsyncComponent(() => import('../build/ProseH6-GLATTcrM.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue?nuxt_component=async&nuxt_component_name=ProseHr&nuxt_component_export=default
var ProseHr_default = defineAsyncComponent(() => import('../build/ProseHr-DSV5H5t2.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue?nuxt_component=async&nuxt_component_name=ProseImg&nuxt_component_export=default
var ProseImg_default = defineAsyncComponent(() => import('../build/ProseImg-Ck-z3JhC.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue?nuxt_component=async&nuxt_component_name=ProseLi&nuxt_component_export=default
var ProseLi_default = defineAsyncComponent(() => import('../build/ProseLi-8jPhQ0vM.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue?nuxt_component=async&nuxt_component_name=ProseOl&nuxt_component_export=default
var ProseOl_default = defineAsyncComponent(() => import('../build/ProseOl-Ax4jGVLQ.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue?nuxt_component=async&nuxt_component_name=ProseP&nuxt_component_export=default
var ProseP_default = defineAsyncComponent(() => import('../build/ProseP-C6Xc39HY.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProsePre.vue?nuxt_component=async&nuxt_component_name=ProsePre&nuxt_component_export=default
var ProsePre_default = defineAsyncComponent(() => import('../build/ProsePre-BipeejzQ.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue?nuxt_component=async&nuxt_component_name=ProseScript&nuxt_component_export=default
var ProseScript_default = defineAsyncComponent(() => import('../build/ProseScript-COtPfEd0.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue?nuxt_component=async&nuxt_component_name=ProseStrong&nuxt_component_export=default
var ProseStrong_default = defineAsyncComponent(() => import('../build/ProseStrong-COtPOU81.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue?nuxt_component=async&nuxt_component_name=ProseTable&nuxt_component_export=default
var ProseTable_default = defineAsyncComponent(() => import('../build/ProseTable-DhDFHICn.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue?nuxt_component=async&nuxt_component_name=ProseTbody&nuxt_component_export=default
var ProseTbody_default = defineAsyncComponent(() => import('../build/ProseTbody-DidR-CKa.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue?nuxt_component=async&nuxt_component_name=ProseTd&nuxt_component_export=default
var ProseTd_default = defineAsyncComponent(() => import('../build/ProseTd-Dcb1I44a.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue?nuxt_component=async&nuxt_component_name=ProseTh&nuxt_component_export=default
var ProseTh_default = defineAsyncComponent(() => import('../build/ProseTh-DLpHrKOH.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue?nuxt_component=async&nuxt_component_name=ProseThead&nuxt_component_export=default
var ProseThead_default = defineAsyncComponent(() => import('../build/ProseThead-CeBAHQru.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue?nuxt_component=async&nuxt_component_name=ProseTr&nuxt_component_export=default
var ProseTr_default = defineAsyncComponent(() => import('../build/ProseTr-BoHYltX_.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue?nuxt_component=async&nuxt_component_name=ProseUl&nuxt_component_export=default
var ProseUl_default = defineAsyncComponent(() => import('../build/ProseUl-DuKcpEg4.mjs').then((r) => r["default"] || r.default || r));
// node_modules/@nuxt/icon/dist/runtime/components/index.js?nuxt_component=async&nuxt_component_name=Icon&nuxt_component_export=default
var components_default = defineAsyncComponent(() => Promise.resolve().then(function () { return componentsCJ6cuR0l; }).then((n) => n.n).then((r) => r["default"] || r.default || r));
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fcomponents.plugin.mjs
var lazyGlobalComponents = [
	["ProseA", ProseA_default],
	["ProseBlockquote", ProseBlockquote_default],
	["ProseCode", ProseCode_default],
	["ProseEm", ProseEm_default],
	["ProseH1", ProseH1_default],
	["ProseH2", ProseH2_default],
	["ProseH3", ProseH3_default],
	["ProseH4", ProseH4_default],
	["ProseH5", ProseH5_default],
	["ProseH6", ProseH6_default],
	["ProseHr", ProseHr_default],
	["ProseImg", ProseImg_default],
	["ProseLi", ProseLi_default],
	["ProseOl", ProseOl_default],
	["ProseP", ProseP_default],
	["ProsePre", ProsePre_default],
	["ProseScript", ProseScript_default],
	["ProseStrong", ProseStrong_default],
	["ProseTable", ProseTable_default],
	["ProseTbody", ProseTbody_default],
	["ProseTd", ProseTd_default],
	["ProseTh", ProseTh_default],
	["ProseThead", ProseThead_default],
	["ProseTr", ProseTr_default],
	["ProseUl", ProseUl_default],
	["Icon", components_default]
];
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fcomponents_plugin_default = defineNuxtPlugin({
	name: "nuxt:global-components",
	setup(nuxtApp) {
		for (const [name, component] of lazyGlobalComponents) {
			nuxtApp.vueApp.component(name, component);
			nuxtApp.vueApp.component("Lazy" + name, component);
		}
	}
});
// node_modules/@nuxt/icon/dist/runtime/provider.js
function getSideProvider(provider, side) {
	return typeof provider === "object" ? provider?.[side] : provider;
}
// node_modules/@nuxt/icon/dist/runtime/plugin.js
var plugin_default = defineNuxtPlugin({
	name: "@nuxt/icon",
	setup() {
		const configs = useRuntimeConfig();
		const options = useAppConfig().icon;
		const requestFetch = useRequestFetch();
		const nativeFetch = requestFetch.native;
		_api.setFetch((input, init) => {
			const nitroFetch = globalThis.$fetch?.native;
			return (nativeFetch || nitroFetch || globalThis.fetch)(input, init);
		});
		const provider = getSideProvider(options.provider, "server");
		const resources = [];
		if (provider === "server") {
			const baseURL = configs.app?.baseURL?.replace(/\/$/, "") ?? "";
			resources.push(baseURL + (options.localApiEndpoint || "/api/_nuxt_icon"));
			if (options.fallbackToApi === true || options.fallbackToApi === "client-only") resources.push(options.iconifyApiEndpoint);
		} else if (provider === "none") _api.setFetch(() => Promise.resolve(new Response()));
		else resources.push(options.iconifyApiEndpoint);
		async function loadCustomIconsChunk(icons, prefix) {
			try {
				const data = await requestFetch(resources[0] + "/" + prefix + ".json", { query: { icons: icons.join(",") } });
				if (!data || data.prefix !== prefix || !data.icons) throw new Error("Invalid data" + JSON.stringify(data));
				return data;
			} catch (e) {
				console.error("Failed to load custom icons", e);
				return null;
			}
		}
		async function customIconLoader(icons, prefix) {
			const chunks = [[]];
			let length = 0;
			for (const name of icons) {
				const nameLength = encodeURIComponent(name).length;
				if (length + nameLength > 2e3 && chunks.at(-1).length) {
					chunks.push([]);
					length = 0;
				}
				chunks.at(-1).push(name);
				length += nameLength + 1;
			}
			const results = (await Promise.all(chunks.map((chunk) => loadCustomIconsChunk(chunk, prefix)))).filter((data) => !!data);
			if (!results.length) return null;
			return results.reduce((acc, data) => ({
				...acc,
				...data,
				icons: {
					...acc.icons,
					...data.icons
				},
				aliases: {
					...acc.aliases,
					...data.aliases
				}
			}));
		}
		addAPIProvider("", { resources });
		for (const prefix of options.customCollections || []) if (prefix) setCustomIconsLoader(customIconLoader, prefix);
	}
});
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fcolor-mode-options.mjs
var preference = "dark";
// node_modules/@nuxtjs/color-mode/dist/runtime/plugin.server.js
var plugin_server_default = defineNuxtPlugin((nuxtApp) => {
	const colorMode = nuxtApp.ssrContext?.islandContext ? ref({}).value : useState("color-mode", () => reactive({
		preference,
		value: preference,
		unknown: true,
		forced: false
	})).value;
	const htmlAttrs = {};
	useHead({ htmlAttrs });
	useRouter().afterEach((to) => {
		const forcedColorMode = to.meta.colorMode;
		if (forcedColorMode && forcedColorMode !== "system") {
			htmlAttrs["data-color-mode-forced"] = forcedColorMode;
			colorMode.value = forcedColorMode;
			colorMode.forced = true;
		} else if (forcedColorMode === "system") console.warn("You cannot force the colorMode to system at the page level.");
	});
	nuxtApp.provide("colorMode", colorMode);
});
var plugin = defineNuxtPlugin(async () => {
	return;
});
// node_modules/nuxt-seo-utils/dist/runtime/app/plugins/1.absoluteImageUrls.server.js
var _1_absoluteImageUrls_server_default = defineNuxtPlugin({
	enforce: "post",
	setup() {
		const head = injectHead();
		if (!head) return;
		const resolver = createSitePathResolver({
			withBase: true,
			absolute: true,
			canonical: true
		});
		head.use({
			key: "absoluteImageUrls",
			hooks: { "tags:resolve": ({ tags }) => {
				for (const tag of tags) {
					if (tag.tag !== "meta") continue;
					if (tag.props.property !== "og:image:url" && tag.props.property !== "og:image" && tag.props.name !== "twitter:image" && tag.props.name !== "twitter:image:src") continue;
					if (typeof tag.props.content !== "string" || !tag.props.content.trim() || tag.props.content.startsWith("http") || tag.props.content.startsWith("//")) continue;
					tag.props.content = unref(resolver(tag.props.content));
				}
			} }
		});
	}
});
// node_modules/nuxt-seo-utils/dist/runtime/app/plugins/0.routeRules.js
function parseRouteRuleState(context) {
	const rules = context._nitro?.routeRules;
	return {
		head: rules?.head,
		seoMeta: rules?.seoMeta
	};
}
var _0_routeRules_default = defineNuxtPlugin({
	enforce: "post",
	env: { islands: false },
	setup() {
		const routeRuleState = useState("nuxt-seo-utils:routeRules", () => null);
		routeRuleState.value = parseRouteRuleState(useRequestEvent()?.context);
		if (routeRuleState.value) {
			const { head: headInput, seoMeta } = routeRuleState.value;
			if (headInput) useHead(headInput);
			if (seoMeta) useSeoMeta(seoMeta);
		}
	}
});
// node_modules/nuxt-seo-utils/dist/runtime/shared/canonicalUrl.js
var LOCALE_UNDERSCORE_RE$1 = /_/g;
var DEFAULT_LOCALE = "en";
function normaliseCanonicalUrl(url, { lowercase, locale }) {
	if (!lowercase) return url;
	const parsed = parseURL(url);
	if (parsed.host) parsed.host = parsed.host.toLowerCase();
	parsed.pathname = lowercasePath(parsed.pathname, locale);
	return stringifyParsedURL(parsed);
}
function lowercasePath(path, locale) {
	try {
		return path.toLocaleLowerCase(locale ? locale.replace(LOCALE_UNDERSCORE_RE$1, "-") : DEFAULT_LOCALE);
	} catch {
		return path.toLowerCase();
	}
}
function resolveCanonicalUrl(url, query, options) {
	const normalised = normaliseCanonicalUrl(url, options);
	const filteredQuery = Object.fromEntries(Object.entries(query).filter(([key]) => options.queryWhitelist.includes(key)).sort(([a], [b]) => a.localeCompare(b)));
	return Object.keys(filteredQuery).length ? `${normalised}?${stringifyQuery(filteredQuery)}` : normalised;
}
// node_modules/nuxt-seo-utils/dist/runtime/app/logic/applyDefaults.js
var LOCALE_UNDERSCORE_RE = /_/g;
function applyDefaults() {
	const siteConfig = useSiteConfig({ resolveRefs: false });
	const resolveCurrentLocale = () => {
		return (toValue(siteConfig.currentLocale) || toValue(siteConfig.defaultLocale) || "en").replace(LOCALE_UNDERSCORE_RE, "-");
	};
	injectHead().use(plugins_exports.TemplateParamsPlugin);
	const { canonicalQueryWhitelist, canonicalLowercase, tagPriority, separator, titleSeparator } = useRuntimeConfig().public["seo-utils"];
	const route = useRoute();
	const resolveUrl = createSitePathResolver({
		withBase: true,
		absolute: true
	});
	const err = useError();
	const resolveSeparator = () => toValue(siteConfig.separator) || separator || toValue(siteConfig.titleSeparator) || titleSeparator;
	const resolveTitleSeparator = () => toValue(siteConfig.titleSeparator) || titleSeparator || toValue(siteConfig.separator) || separator;
	const canonicalUrl = computed(() => {
		if (err.value) return false;
		return {
			rel: "canonical",
			href: resolveCanonicalUrl(resolveUrl(route.path || "/").value || route.path, route.query, {
				lowercase: canonicalLowercase,
				locale: resolveCurrentLocale(),
				queryWhitelist: canonicalQueryWhitelist
			})
		};
	});
	const minimalPriority = { tagPriority: "low" };
	const seoMetaPriority = { tagPriority };
	useHead({
		htmlAttrs: { lang: resolveCurrentLocale },
		templateParams: {
			site: () => siteConfig,
			siteName: () => siteConfig.name,
			separator: resolveSeparator,
			titleSeparator: resolveTitleSeparator
		},
		titleTemplate: () => err.value ? "%s" : "%s %separator %siteName",
		link: [() => canonicalUrl.value]
	}, minimalPriority);
	useSeoMeta({ ogLocale: () => {
		const locale = resolveCurrentLocale();
		if (locale) {
			const l = locale.replace("-", "_");
			if (l.includes("_")) return l;
		}
		return false;
	} }, minimalPriority);
	const seoMeta = {
		ogType: "website",
		ogSiteName: siteConfig.name
	};
	if (siteConfig.description) useSeoMeta({ description: siteConfig.description }, minimalPriority);
	if (siteConfig.twitter) {
		const id = siteConfig.twitter.startsWith("@") ? siteConfig.twitter : `@${siteConfig.twitter}`;
		seoMeta.twitterCreator = id;
		seoMeta.twitterSite = id;
	}
	useSeoMeta(seoMeta, seoMetaPriority);
	useHead({ meta: [{
		property: "og:url",
		content: () => {
			const url = canonicalUrl.value;
			return url ? url.href : false;
		},
		key: OG_URL_KEY
	}] }, seoMetaPriority);
}
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fplugins.server.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default = [
	_0_siteConfig_default,
	plugin$3,
	plugin$2,
	plugin$1,
	md_alternate_server_default,
	md_hints_prerender_default,
	siteConfig_default,
	inferSeoMetaPlugin_default,
	titles_default,
	derivedTags_default,
	init_default,
	defaults_default$1,
	og_image_canonical_urls_server_default,
	route_rule_og_image_server_default,
	robot_meta_server_default,
	virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fcomponents_plugin_default,
	plugin_default,
	plugin_server_default,
	plugin,
	_1_absoluteImageUrls_server_default,
	_0_routeRules_default,
	defineNuxtPlugin({
		name: "nuxt-seo:defaults",
		order: 999,
		env: { islands: false },
		setup() {
			applyDefaults();
		}
	})
];
// components/layout/ScrollProgress.vue?vue&type=script&setup=true&lang.ts
var ScrollProgress_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ScrollProgress",
	__ssrInlineRender: true,
	setup(__props) {
		const progress = ref(0);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-transparent" }, _attrs))}><div class="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 transition-all duration-75 shadow-[0_0_12px_rgba(245,158,11,0.7)]" style="${ssrRenderStyle({ width: `${unref(progress)}%` })}"></div></div>`);
		};
	}
});
// components/layout/ScrollProgress.vue
var _sfc_setup$9 = ScrollProgress_vue_vue_type_script_setup_true_lang_default.setup;
ScrollProgress_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/ScrollProgress.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var ScrollProgress_default = Object.assign(ScrollProgress_vue_vue_type_script_setup_true_lang_default, { __name: "LayoutScrollProgress" });
// node_modules/@nuxtjs/color-mode/dist/runtime/composables.js
var useColorMode = () => {
	return useState("color-mode").value;
};
// node_modules/nuxt/dist/app/components/render-list.js
function bound(source) {
	if (typeof source === "number" && source > 1e4 && tryUseNuxtApp()?.ssrContext?.islandContext) return vforBound(source);
	return source;
}
/**
* `ssrRenderList` from `vue/server-renderer`, with numeric sources clamped to
* `MAX_VFOR_LENGTH` while rendering a server component or island.
*
* @internal
*/
function ssrRenderList$2(source, renderItem) {
	ssrRenderList(bound(source), renderItem);
}
// components/layout/AppHeader.vue?vue&type=script&setup=true&lang.ts
var AppHeader_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppHeader",
	__ssrInlineRender: true,
	emits: ["openPalette", "toggleMobileMenu"],
	setup(__props) {
		const colorMode = useColorMode();
		const isScrolled = ref(false);
		const activeSection = ref("hero");
		const navItems = [
			{
				num: "01",
				name: "Profile",
				href: "/#hero",
				id: "hero"
			},
			{
				num: "03",
				name: "Experience",
				href: "/#experience",
				id: "experience"
			},
			{
				num: "05",
				name: "Projects",
				href: "/#projects",
				id: "projects"
			},
			{
				num: "06",
				name: "Stack",
				href: "/#tech-stack",
				id: "tech-stack"
			},
			{
				num: "08",
				name: "Writing",
				href: "/#blog",
				id: "blog"
			},
			{
				num: "09",
				name: "Activity",
				href: "/#github",
				id: "github"
			},
			{
				num: "10",
				name: "Contact",
				href: "/#contact",
				id: "contact"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_Icon = components_default$1;
			_push(`<header${ssrRenderAttrs(mergeProps({ class: ["fixed top-0 left-0 right-0 z-40 transition-all duration-300", unref(isScrolled) ? "glass-nav shadow-lg" : "bg-transparent py-2"] }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "group flex items-center gap-3"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<div class="w-10 h-10 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-amber-400 group-hover:border-amber-400 transition-colors shadow-md"${_scopeId}> AO<span class="text-amber-500 text-xs animate-pulse"${_scopeId}>•</span></div><div class="flex flex-col"${_scopeId}><span class="font-extrabold tracking-tight text-sm sm:text-base text-(--text-primary) group-hover:text-amber-400 transition-colors"${_scopeId}> Ashly Omanada </span><span class="text-[11px] font-mono text-slate-400 hidden sm:inline"${_scopeId}> Full-Stack Developer </span></div>`);
					else return [createVNode("div", { class: "w-10 h-10 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-amber-400 group-hover:border-amber-400 transition-colors shadow-md" }, [createTextVNode(" AO"), createVNode("span", { class: "text-amber-500 text-xs animate-pulse" }, "•")]), createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "font-extrabold tracking-tight text-sm sm:text-base text-(--text-primary) group-hover:text-amber-400 transition-colors" }, " Ashly Omanada "), createVNode("span", { class: "text-[11px] font-mono text-slate-400 hidden sm:inline" }, " Full-Stack Developer ")])];
				}),
				_: 1
			}, _parent));
			_push(`<nav class="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 dark:bg-slate-900/80 border border-slate-800 text-xs font-medium backdrop-blur-md"><!--[-->`);
			ssrRenderList$2(navItems, (item) => {
				_push(`<a${ssrRenderAttr("href", item.href)} class="${ssrRenderClass([unref(activeSection) === item.id ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30" : "", "px-3 py-1.5 rounded-full transition-colors text-slate-300 hover:text-white hover:bg-slate-800"])}"><span class="font-mono text-[10px] text-amber-500 mr-1">${ssrInterpolate(item.num)}</span> ${ssrInterpolate(item.name)}</a>`);
			});
			_push(`<!--]--></nav><div class="flex items-center gap-2 sm:gap-3"><button type="button" class="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all cursor-pointer" aria-label="Open Command Palette">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "heroicons:magnifying-glass",
				class: "w-3.5 h-3.5 text-amber-400"
			}, null, _parent));
			_push(`<span class="hidden md:inline">Commands</span><kbd class="font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-slate-400">⌘K</kbd></button><button type="button" class="p-2 text-slate-300 hover:text-amber-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all cursor-pointer"${ssrRenderAttr("aria-label", `Switch to ${unref(colorMode).value === "dark" ? "light" : "dark"} mode`)}>`);
			_push(ssrRenderComponent(_component_Icon, {
				name: unref(colorMode).value === "dark" ? "heroicons:sun" : "heroicons:moon",
				class: "w-4 h-4 transition-transform duration-300 hover:rotate-45"
			}, null, _parent));
			_push(`</button><button type="button" class="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all" aria-label="Toggle mobile menu">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "heroicons:bars-3",
				class: "w-5 h-5"
			}, null, _parent));
			_push(`</button></div></div></header>`);
		};
	}
});
// components/layout/AppHeader.vue
var _sfc_setup$8 = AppHeader_vue_vue_type_script_setup_true_lang_default.setup;
AppHeader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/AppHeader.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var AppHeader_default = Object.assign(AppHeader_vue_vue_type_script_setup_true_lang_default, { __name: "LayoutAppHeader" });
// node_modules/nuxt/dist/app/components/route-provider.js
var defineRouteProvider = (name = "RouteProvider") => defineComponent({
	name,
	props: {
		route: {
			type: Object,
			required: true
		},
		vnode: Object,
		vnodeRef: Object,
		renderKey: String,
		trackRootNodes: Boolean,
		routeRecord: Object
	},
	setup(props) {
		const previousKey = props.renderKey;
		const previousRoute = props.route;
		const route = {};
		for (const key in props.route) Object.defineProperty(route, key, {
			get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
			enumerable: true
		});
		provide(PageRouteSymbol, shallowReactive(route));
		return () => {
			if (!props.vnode) return props.vnode;
			return h(props.vnode, { ref: props.vnodeRef });
		};
	}
});
var RouteProvider = defineRouteProvider();
// node_modules/nuxt/dist/pages/runtime/page.js
var page_default = defineComponent({
	name: "NuxtPage",
	inheritAttrs: false,
	props: {
		name: { type: String },
		transition: {
			type: [Boolean, Object],
			default: void 0
		},
		keepalive: {
			type: [Boolean, Object],
			default: void 0
		},
		route: { type: Object },
		pageKey: {
			type: [Function, String],
			default: null
		}
	},
	setup(props, { attrs, slots, expose }) {
		const nuxtApp = useNuxtApp();
		const pageRef = ref();
		inject(PageRouteSymbol, null);
		expose({ pageRef });
		inject(LayoutMetaSymbol, null);
		nuxtApp.deferHydration();
		return () => {
			return h(RouterView, {
				name: props.name,
				route: props.route,
				...attrs
			}, { default: markStableSlot((routeProps) => {
				return h(Suspense, { suspensible: true }, { default() {
					return h(RouteProvider, {
						vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
						route: routeProps.route,
						vnodeRef: pageRef
					});
				} });
			}) });
		};
	}
});
function markStableSlot(fn) {
	const wrapped = ((routeProps) => {
		const result = fn(routeProps);
		if (Array.isArray(result)) return result;
		if (result == null || !isVNode(result)) return [createCommentVNode()];
		return [result];
	});
	wrapped._n = true;
	return wrapped;
}
function normalizeSlot(slot, data) {
	const slotContent = slot(data);
	return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
// content/profile.ts
var profile = {
	name: "Ashly Omanada",
	title: "Full-Stack Developer",
	location: "Calapan City, Philippines",
	timezone: "Asia/Manila (UTC+8)",
	status: {
		available: true,
		label: "Open to Opportunities",
		subtext: "Available for full-time engineering roles & high-impact contracts"
	},
	roles: [
		"Full-Stack Developer",
		"Vue & Nuxt Specialist",
		"TypeScript & Node.js Engineer",
		"Real-Time & WebRTC Explorer",
		"API & System Architect"
	],
	bio: {
		short: "Passionate full-stack developer dedicated to building high-performance, resilient web applications with modern architectures. I transform complex operational challenges into elegant, intuitive digital experiences.",
		full: ["With a solid engineering foundation across modern frontend frameworks and robust backend services, I specialize in crafting full-cycle web applications that balance speed, accessibility, and visual precision.", "From mission-critical institutional dashboards to consumer-facing mobile platforms, I bridge the gap between user-first visual polish and hardened server-side architecture."],
		valueStatement: "Building performant, scalable web applications with pixel perfection, resilient APIs, and thoughtful developer ergonomics."
	},
	avatar: "/images/portrait.png",
	aboutImage: "/images/about.jpg",
	resumeUrl: "/resume.pdf",
	socials: {
		github: "https://github.com/ashlyomanada",
		linkedin: "https://linkedin.com/in/ashly-omanada",
		email: "ashlyomanada.dev@gmail.com",
		twitter: "https://x.com/ashlyomanada",
		instagram: "https://instagram.com/ashlyomanada"
	},
	bento: [
		{
			id: "current-focus",
			type: "focus",
			title: "Current Focus",
			content: "Nuxt 4, Distributed Systems & Edge Functions",
			detail: "Architecting ultra-low latency real-time interfaces with WebRTC and PostgreSQL.",
			icon: "heroicons:sparkles"
		},
		{
			id: "location-time",
			type: "location",
			title: "Based In",
			content: "Calapan City, PH",
			detail: "UTC+8 timezone • Remote ready globally",
			icon: "heroicons:map-pin"
		},
		{
			id: "stack-highlight",
			type: "stack",
			title: "Core Philosophy",
			content: "Speed, Type-Safety & User Empathy",
			detail: "Zero compromise on web vitals, keyboard ergonomics, and design craft.",
			icon: "heroicons:code-bracket"
		},
		{
			id: "fun-fact",
			type: "funFact",
			title: "Beyond the Screen",
			content: "Espresso brewer & mechanical keyboard enthusiast",
			detail: "Believes great software is as much about taste as it is about clean tests.",
			icon: "heroicons:heart"
		}
	],
	stats: [
		{
			label: "Years Building",
			value: 3,
			suffix: "+",
			description: "Hands-on production & freelance engineering experience"
		},
		{
			label: "Projects Delivered",
			value: 12,
			suffix: "+",
			description: "From enterprise evaluation portals to interactive apps"
		},
		{
			label: "Technologies Mastered",
			value: 18,
			suffix: "+",
			description: "Full-stack languages, libraries, databases & cloud tools"
		},
		{
			label: "Code Quality Score",
			value: 99,
			suffix: "%",
			description: "Consistently high Lighthouse performance & accessibility marks"
		}
	],
	experiences: [{
		id: "exp-1",
		role: "Full-Stack Developer (Contract / Capstone Lead)",
		company: "PNP MIMAROPA — Regional Evaluation Unit",
		location: "Calapan City / Hybrid",
		period: "2024 — 2025",
		current: true,
		description: "Led the architectural design and full-stack development of the EUPER (Unit Performance Evaluation) system, supporting data-driven rank forecasting across provincial police divisions.",
		impactBullets: [
			"Designed dual admin & client evaluation portals servicing hundreds of officer rating submissions with sub-100ms response times.",
			"Engineered automated ranking calculations and predictive score models, reducing manual report compilation overhead by 70%.",
			"Implemented interactive visualization dashboards with Vue.js, dynamic charts, and audit-compliant report generation."
		],
		technologies: [
			"Vue.js",
			"CodeIgniter 4",
			"MySQL",
			"Bootstrap",
			"REST APIs"
		],
		metrics: {
			label: "Evaluation speedup",
			value: "70%"
		}
	}, {
		id: "exp-2",
		role: "Frontend & Full-Stack Freelance Engineer",
		company: "Independent Engineering",
		location: "Remote",
		period: "2023 — Present",
		current: false,
		description: "Delivered bespoke web solutions, responsive client storefronts, and web portals for small business clients and digital startups.",
		impactBullets: [
			"Developed tailored brand web applications (Kapares Resto, Bundat Burgers) featuring interactive menu navigators and streamlined order inquiry paths.",
			"Built MovieTuneApp, integrating third-party movie metadata APIs and dynamic watchlists with responsive mobile layouts.",
			"Maintained 100% mobile responsiveness and cross-browser stability across all delivered client web properties."
		],
		technologies: [
			"Vue.js",
			"React",
			"Tailwind CSS",
			"TypeScript",
			"Node.js"
		],
		metrics: {
			label: "Client satisfaction",
			value: "100%"
		}
	}],
	education: [{
		id: "edu-1",
		degree: "Bachelor of Science in Information Technology",
		institution: "Mindoro State University (MinSU)",
		period: "2021 — 2025",
		location: "Oriental Mindoro, Philippines",
		description: "Focused on Software Engineering, Database Systems, Web Architectures, and Human-Computer Interaction.",
		honors: "Capstone Project Distinction",
		highlights: [
			"Capstone Lead for the PNP MIMAROPA Regional Evaluation platform",
			"Top project recognition for operational utility and data visualization excellence",
			"Active mentor in collegiate programming circles and web workshops"
		]
	}],
	projects: [
		{
			slug: "euper-system",
			title: "EUPER Police Evaluation Platform",
			tagline: "Automated ranking, predictive performance scoring, and institutional intelligence for PNP MIMAROPA.",
			summary: "A mission-critical evaluation platform enabling senior commanding officers to assess police units across municipal and provincial levels with real-time analytics and predictive performance analytics.",
			coverImage: "/projects/capstone1.png",
			featured: true,
			category: "Full-Stack",
			technologies: [
				"Vue.js",
				"CodeIgniter 4",
				"MySQL",
				"Bootstrap 5",
				"REST APIs"
			],
			liveUrl: "https://euper.netlify.app/",
			repoUrl: "https://github.com/ashlyomanada",
			problem: "Regional police evaluation historically relied on fragmented paper scorecards and delayed spreadsheet submissions, causing significant review lag and human collation error.",
			role: "Full-Stack Architect & Lead Developer",
			architecture: "Modular Vue.js SPA frontend consuming normalized REST endpoints via a secure CodeIgniter 4 backend with role-based access control (RBAC) and indexed MySQL tables.",
			outcome: "Reduced report turnaround time from weeks to seconds, providing real-time ranking transparency and automated deadline enforcement across all participating units.",
			keyFeatures: [
				"Dual-portal architecture: Granular admin evaluation management + public unit rating viewer",
				"Real-time automated score weighting and predictive performance categorization",
				"One-click audit report export and compliance dashboard visualizations"
			]
		},
		{
			slug: "movietune-app",
			title: "MovieTune Streaming Discovery",
			tagline: "High-speed movie exploration, dynamic filtering, and curated watchlist management.",
			summary: "A sleek entertainment catalog web application that enables users to discover trending releases, preview trailers, inspect cast filmographies, and organize personalized watchlists.",
			coverImage: "/projects/movietune.png",
			featured: false,
			category: "Frontend",
			technologies: [
				"React 19",
				"Tailwind CSS",
				"TMDB API",
				"Vite"
			],
			liveUrl: "https://movietuneapp4u.netlify.app/",
			repoUrl: "https://github.com/ashlyomanada/movietuneapp",
			problem: "Modern streaming viewers struggle with discovery fatigue across fragmented movie catalogs without quick access to trailers and ratings.",
			role: "Frontend Engineer",
			architecture: "React client with asynchronous data fetching, client-side caching, fluid debounced search, and responsive grid layouts.",
			outcome: "Achieved sub-100ms search interactions and an intuitive, mobile-friendly browsing experience.",
			keyFeatures: [
				"Real-time debounced movie and actor querying",
				"Interactive trailer player modals and rating breakdowns",
				"Local storage persistence for offline watchlist tracking"
			]
		},
		{
			slug: "kapares-resto",
			title: "Kapares Comfort Dining",
			tagline: "Warm culinary showcase and digital storefront for authentic Filipino cuisine.",
			summary: "A warm, appetizing brand website designed for a specialty pares house, presenting signature items, combo promotions, and inquiry pathways.",
			coverImage: "/projects/kapares.png",
			featured: false,
			category: "Frontend",
			technologies: [
				"HTML5",
				"CSS3",
				"JavaScript",
				"Responsive UI"
			],
			liveUrl: "https://ashlyomanada.github.io/kapares-resto/",
			repoUrl: "https://github.com/ashlyomanada/kapares-resto",
			problem: "Local food businesses need immediate visual appeal and simple mobile menus without relying exclusively on third-party delivery apps.",
			role: "UI Designer & Web Developer",
			architecture: "Lightweight semantic HTML5 structure with hand-crafted CSS variables and smooth interactive navigation.",
			outcome: "Delivered a 100/100 Lighthouse performance rating with instant load times on low-bandwidth mobile connections.",
			keyFeatures: [
				"Mouthwatering visual menu showcases with pricing tiers",
				"Location and operating hour indicators with direct message links",
				"Mobile-first responsive layout optimized for smartphone browsing"
			]
		},
		{
			slug: "bundat-burger-shop",
			title: "Bundat Street Burgers",
			tagline: "Bold, street-style burger shop website with dynamic combo menus and punchy brand visuals.",
			summary: "An energetic showcase for an artisanal burger brand, combining punchy typography, combo cards, and direct order engagement.",
			coverImage: "/projects/bundat.png",
			featured: false,
			category: "Frontend",
			technologies: [
				"HTML5",
				"CSS3",
				"Modern Typography",
				"Mobile UI"
			],
			liveUrl: "https://ashlyomanada.github.io/bundat-burger-shop/",
			repoUrl: "https://github.com/ashlyomanada/bundat-burger-shop",
			problem: "Street-food brands require high-impact visual identity to stand out from generic food court options.",
			role: "Frontend Developer",
			architecture: "Minimalist, zero-framework architecture ensuring maximum reliability and zero maintenance overhead.",
			outcome: "Elevated the shop’s local brand presence and streamlined menu browsing for hungry patrons.",
			keyFeatures: [
				"High-contrast street-aesthetic layout with prominent calls to action",
				"Categorized signature burgers, sides, and beverage sections",
				"Instant mobile touch target optimization for quick navigation"
			]
		}
	],
	techStack: [
		{
			name: "TypeScript",
			category: "Languages",
			proficiency: "Advanced",
			icon: "logos:typescript-icon",
			highlight: true
		},
		{
			name: "JavaScript (ESNext)",
			category: "Languages",
			proficiency: "Expert",
			icon: "logos:javascript",
			highlight: true
		},
		{
			name: "PHP 8+",
			category: "Languages",
			proficiency: "Advanced",
			icon: "logos:php",
			highlight: true
		},
		{
			name: "SQL",
			category: "Languages",
			proficiency: "Advanced",
			icon: "carbon:sql",
			highlight: false
		},
		{
			name: "HTML5 & Semantic Web",
			category: "Languages",
			proficiency: "Expert",
			icon: "logos:html-5",
			highlight: false
		},
		{
			name: "CSS3 / Modern Layouts",
			category: "Languages",
			proficiency: "Expert",
			icon: "logos:css-3",
			highlight: false
		},
		{
			name: "Vue.js (Vue 3 / Composition)",
			category: "Frontend",
			proficiency: "Expert",
			icon: "logos:vue",
			highlight: true
		},
		{
			name: "Nuxt 4 / Nuxt 3",
			category: "Frontend",
			proficiency: "Advanced",
			icon: "logos:nuxt-icon",
			highlight: true
		},
		{
			name: "React 19",
			category: "Frontend",
			proficiency: "Advanced",
			icon: "logos:react",
			highlight: true
		},
		{
			name: "Tailwind CSS v4",
			category: "Frontend",
			proficiency: "Expert",
			icon: "logos:tailwindcss-icon",
			highlight: true
		},
		{
			name: "Vite",
			category: "Frontend",
			proficiency: "Advanced",
			icon: "logos:vitejs",
			highlight: false
		},
		{
			name: "Pinia / State Management",
			category: "Frontend",
			proficiency: "Advanced",
			icon: "logos:pinia",
			highlight: false
		},
		{
			name: "Node.js",
			category: "Backend",
			proficiency: "Advanced",
			icon: "logos:nodejs-icon",
			highlight: true
		},
		{
			name: "CodeIgniter 4",
			category: "Backend",
			proficiency: "Advanced",
			icon: "logos:codeigniter-icon",
			highlight: true
		},
		{
			name: "Laravel",
			category: "Backend",
			proficiency: "Intermediate",
			icon: "logos:laravel",
			highlight: true
		},
		{
			name: "RESTful API Architecture",
			category: "Backend",
			proficiency: "Advanced",
			icon: "carbon:api",
			highlight: true
		},
		{
			name: "Sequelize / ORMs",
			category: "Backend",
			proficiency: "Intermediate",
			icon: "logos:sequelize",
			highlight: false
		},
		{
			name: "PostgreSQL",
			category: "Database",
			proficiency: "Advanced",
			icon: "logos:postgresql",
			highlight: true
		},
		{
			name: "MySQL / MariaDB",
			category: "Database",
			proficiency: "Advanced",
			icon: "logos:mysql-icon",
			highlight: true
		},
		{
			name: "Redis (Caching)",
			category: "Database",
			proficiency: "Intermediate",
			icon: "logos:redis",
			highlight: false
		},
		{
			name: "Docker & Containers",
			category: "DevOps/Cloud",
			proficiency: "Intermediate",
			icon: "logos:docker-icon",
			highlight: true
		},
		{
			name: "WebRTC / Real-Time Audio-Video",
			category: "DevOps/Cloud",
			proficiency: "Intermediate",
			icon: "logos:webrtc",
			highlight: true
		},
		{
			name: "Capacitor (Mobile Apps)",
			category: "DevOps/Cloud",
			proficiency: "Intermediate",
			icon: "logos:capacitorjs-icon",
			highlight: true
		},
		{
			name: "Git & GitHub Actions",
			category: "DevOps/Cloud",
			proficiency: "Advanced",
			icon: "logos:git-icon",
			highlight: false
		},
		{
			name: "Netlify & Vercel Deployments",
			category: "DevOps/Cloud",
			proficiency: "Advanced",
			icon: "logos:netlify-icon",
			highlight: false
		},
		{
			name: "VS Code & Ergonomics",
			category: "Tools",
			proficiency: "Expert",
			icon: "logos:visual-studio-code",
			highlight: false
		},
		{
			name: "Postman & Hoppscotch",
			category: "Tools",
			proficiency: "Advanced",
			icon: "logos:postman-icon",
			highlight: false
		},
		{
			name: "Figma (UI Design & Specs)",
			category: "Tools",
			proficiency: "Intermediate",
			icon: "logos:figma",
			highlight: false
		},
		{
			name: "Zod & Schema Validation",
			category: "Tools",
			proficiency: "Advanced",
			icon: "carbon:data-structured",
			highlight: false
		}
	],
	certifications: [
		{
			id: "cert-1",
			title: "Full-Stack Web Development Specialization",
			issuer: "DICT / National ICT Competency Certification",
			issueDate: "2024",
			credentialUrl: "https://example.com/certificate/fullstack",
			badgeIcon: "heroicons:academic-cap",
			skillsCovered: [
				"Vue.js",
				"REST Architecture",
				"Database Normalization",
				"Application Security"
			]
		},
		{
			id: "cert-2",
			title: "Modern Frontend Engineering with Vue & TypeScript",
			issuer: "Vue Mastery / Frontend Academy",
			issueDate: "2024",
			credentialUrl: "https://example.com/certificate/vue-ts",
			badgeIcon: "heroicons:check-badge",
			skillsCovered: [
				"Composition API",
				"Nuxt SSR",
				"Pinia",
				"TypeScript Generics"
			]
		},
		{
			id: "cert-3",
			title: "Relational Database Design & Query Optimization",
			issuer: "Oracle Academy / University Certification",
			issueDate: "2023",
			credentialUrl: "https://example.com/certificate/databases",
			badgeIcon: "heroicons:server-stack",
			skillsCovered: [
				"PostgreSQL",
				"MySQL",
				"Indexing Strategies",
				"ACID Transactions"
			]
		}
	]
};
// components/layout/AppFooter.vue?vue&type=script&setup=true&lang.ts
var AppFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppFooter",
	__ssrInlineRender: true,
	setup(__props) {
		ref("");
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ClientOnly = ClientOnly;
			const _component_NuxtLink = NuxtLink;
			const _component_Icon = components_default$1;
			_push(`<footer${ssrRenderAttrs(mergeProps({ class: "mt-24 border-t border-slate-800/80 bg-slate-950/70 text-slate-400 text-sm" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><div class="grid grid-cols-1 md:grid-cols-4 gap-10"><div class="md:col-span-2 space-y-4"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-xl bg-slate-900 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-amber-400"> AO </div><span class="font-bold text-lg text-slate-100">Ashly Omanada</span></div><p class="text-slate-400 max-w-sm text-sm leading-relaxed"> Full-stack developer building resilient web applications, modern distributed architectures, and intuitive digital interfaces. </p><div class="flex items-center gap-2 text-xs font-mono text-slate-400">`);
			_push(ssrRenderComponent(_component_ClientOnly, null, { fallback: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(`<span${_scopeId}>Calapan City, PH (UTC+8)</span>`);
				else return [createVNode("span", null, "Calapan City, PH (UTC+8)")];
			}) }, _parent));
			_push(`</div></div><div><h4 class="font-mono text-xs uppercase tracking-wider text-amber-500 font-semibold mb-3">Navigation</h4><ul class="space-y-2 text-xs"><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/#hero",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`01 — Profile`);
					else return [createTextVNode("01 — Profile")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/#experience",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`03 — Experience`);
					else return [createTextVNode("03 — Experience")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/#projects",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`05 — Projects`);
					else return [createTextVNode("05 — Projects")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/#tech-stack",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`06 — Tech Stack`);
					else return [createTextVNode("06 — Tech Stack")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/#blog",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`08 — Blog`);
					else return [createTextVNode("08 — Blog")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/#contact",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`10 — Contact`);
					else return [createTextVNode("10 — Contact")];
				}),
				_: 1
			}, _parent));
			_push(`</li></ul></div><div><h4 class="font-mono text-xs uppercase tracking-wider text-amber-500 font-semibold mb-3">Deep Dives</h4><ul class="space-y-2 text-xs mb-4"><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/projects",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`All Projects`);
					else return [createTextVNode("All Projects")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/tech-stack",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Interactive Tech Stack`);
					else return [createTextVNode("Interactive Tech Stack")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/certifications",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Certifications &amp; Honors`);
					else return [createTextVNode("Certifications & Honors")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/gallery",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Gallery &amp; Workspace`);
					else return [createTextVNode("Gallery & Workspace")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/uses",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Uses &amp; Ergonomics`);
					else return [createTextVNode("Uses & Ergonomics")];
				}),
				_: 1
			}, _parent));
			_push(`</li></ul><div class="flex items-center gap-3"><a${ssrRenderAttr("href", unref(profile).socials.github)} target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-slate-900 hover:text-amber-400 transition-colors border border-slate-800" aria-label="GitHub">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "logos:github-icon",
				class: "w-4 h-4 dark:brightness-0 dark:invert"
			}, null, _parent));
			_push(`</a><a${ssrRenderAttr("href", unref(profile).socials.linkedin)} target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-slate-900 hover:text-amber-400 transition-colors border border-slate-800" aria-label="LinkedIn">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "logos:linkedin-icon",
				class: "w-4 h-4"
			}, null, _parent));
			_push(`</a><a${ssrRenderAttr("href", `mailto:${unref(profile).socials.email}`)} class="p-2 rounded-lg bg-slate-900 hover:text-amber-400 transition-colors border border-slate-800 text-amber-400" aria-label="Email">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "heroicons:envelope",
				class: "w-4 h-4"
			}, null, _parent));
			_push(`</a></div></div></div><div class="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500"><div> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Ashly Omanada. All rights reserved. </div><div class="flex items-center gap-4"><span>Built with Nuxt 4 &amp; Tailwind CSS v4</span><button type="button" class="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer" aria-label="Scroll back to top"><span>Back to top</span>`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "heroicons:arrow-up",
				class: "w-3.5 h-3.5"
			}, null, _parent));
			_push(`</button></div></div></div></footer>`);
		};
	}
});
// components/layout/AppFooter.vue
var _sfc_setup$7 = AppFooter_vue_vue_type_script_setup_true_lang_default.setup;
AppFooter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/AppFooter.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var AppFooter_default = Object.assign(AppFooter_vue_vue_type_script_setup_true_lang_default, { __name: "LayoutAppFooter" });
// \0virtual:public?%2Fimages%2Fportrait.png
var _virtual_public__2Fimages_2Fportrait_default = publicAssetsURL("/images/portrait.png");
// components/interactive/AskAshlyChat.vue?vue&type=script&setup=true&lang.ts
var AskAshlyChat_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AskAshlyChat",
	__ssrInlineRender: true,
	setup(__props) {
		const isOpen = ref(false);
		const inputQuery = ref("");
		const isLoading = ref(false);
		ref(null);
		const messages = ref([]);
		const quickPrompts = [
			"What is Ashly’s flagship project?",
			"What is his primary tech stack?",
			"Is Ashly open for hire?",
			"Tell me about the EUPER system"
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Icon = components_default$1;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-6 right-6 z-40" }, _attrs))}>`);
			if (!unref(isOpen)) {
				_push(`<button type="button" class="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900 border border-amber-500/40 text-white shadow-2xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer" aria-label="Open Ask Ashly AI Assistant"><div class="relative flex items-center justify-center"><span class="absolute w-3 h-3 rounded-full bg-amber-400 animate-ping opacity-75"></span><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span></div>`);
				_push(ssrRenderComponent(_component_Icon, {
					name: "heroicons:chat-bubble-bottom-center-text",
					class: "w-5 h-5 text-amber-400"
				}, null, _parent));
				_push(`<span class="text-sm font-semibold tracking-wide">Ask Ashly <span class="text-xs text-amber-400 font-mono">AI</span></span></button>`);
			} else _push(`<!---->`);
			if (unref(isOpen)) {
				_push(`<div class="w-[360px] sm:w-[400px] h-[520px] max-h-[85vh] rounded-2xl glass-panel bg-slate-950/95 border border-amber-500/30 shadow-2xl flex flex-col overflow-hidden text-slate-100"><div class="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between"><div class="flex items-center gap-3"><div class="relative"><img${ssrRenderAttr("src", _virtual_public__2Fimages_2Fportrait_default)} alt="Ashly Avatar" class="w-8 h-8 rounded-full object-cover border border-amber-500/40"><span class="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900"></span></div><div><div class="text-sm font-semibold flex items-center gap-1.5"><span>Ask Ashly</span><span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">AI</span></div><div class="text-[11px] text-slate-400">Grounded in verified profile data</div></div></div><button type="button" class="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" aria-label="Close Chat">`);
				_push(ssrRenderComponent(_component_Icon, {
					name: "heroicons:x-mark",
					class: "w-5 h-5"
				}, null, _parent));
				_push(`</button></div><div class="flex-1 p-4 overflow-y-auto space-y-3 text-sm"><div class="flex items-start gap-2.5"><div class="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-amber-500/30"> A </div><div class="p-3 rounded-2xl rounded-tl-sm bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed text-xs sm:text-sm"> Hi! I&#39;m Ashly&#39;s AI assistant. Ask me anything about his flagship projects (like EUPER), full-stack architecture, or current availability! </div></div>`);
				if (unref(messages).length === 0) {
					_push(`<div class="pt-2 flex flex-wrap gap-1.5"><!--[-->`);
					ssrRenderList$2(quickPrompts, (chip) => {
						_push(`<button type="button" class="text-xs px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-amber-500/10 hover:text-amber-300 text-slate-300 border border-slate-800 hover:border-amber-500/40 transition-colors text-left">${ssrInterpolate(chip)}</button>`);
					});
					_push(`<!--]--></div>`);
				} else _push(`<!---->`);
				_push(`<!--[-->`);
				ssrRenderList$2(unref(messages), (msg, i) => {
					_push(`<div class="${ssrRenderClass([msg.role === "user" ? "flex-row-reverse" : "", "flex items-start gap-2.5"])}">`);
					if (msg.role === "assistant") _push(`<div class="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-amber-500/30"> A </div>`);
					else _push(`<!---->`);
					_push(`<div class="${ssrRenderClass([msg.role === "user" ? "rounded-tr-sm bg-amber-500 text-slate-950 font-medium" : "rounded-tl-sm bg-slate-900 border border-slate-800 text-slate-200", "p-3 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%]"])}">${ssrInterpolate(msg.content)}</div></div>`);
				});
				_push(`<!--]-->`);
				if (unref(isLoading)) _push(`<div class="flex items-center gap-2 text-slate-400 text-xs"><div class="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold border border-amber-500/30"> A </div><div class="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce"></span><span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]"></span><span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></span></div></div>`);
				else _push(`<!---->`);
				_push(`</div><div class="p-3 bg-slate-900/90 border-t border-slate-800"><form class="flex items-center gap-2"><input${ssrRenderAttr("value", unref(inputQuery))} type="text" placeholder="Ask about Ashly&#39;s work..." class="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""}><button type="submit" class="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-50 transition-colors flex-shrink-0"${ssrIncludeBooleanAttr(unref(isLoading) || !unref(inputQuery).trim()) ? " disabled" : ""} aria-label="Send message">`);
				_push(ssrRenderComponent(_component_Icon, {
					name: "heroicons:paper-airplane",
					class: "w-4 h-4"
				}, null, _parent));
				_push(`</button></form></div></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// components/interactive/AskAshlyChat.vue
var _sfc_setup$6 = AskAshlyChat_vue_vue_type_script_setup_true_lang_default.setup;
AskAshlyChat_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/interactive/AskAshlyChat.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var AskAshlyChat_default = Object.assign(AskAshlyChat_vue_vue_type_script_setup_true_lang_default, { __name: "InteractiveAskAshlyChat" });
// components/interactive/CommandPalette.vue?vue&type=script&setup=true&lang.ts
var CommandPalette_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CommandPalette",
	__ssrInlineRender: true,
	emits: ["toast"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const router = useRouter();
		const colorMode = useColorMode();
		const isOpen = ref(false);
		const query = ref("");
		const activeIndex = ref(0);
		const inputRef = ref(null);
		const emit = __emit;
		const commands = [
			{
				id: "sec-hero",
				title: "01 — Hero / Overview",
				category: "Section Jump",
				icon: "heroicons:home",
				action: () => jumpTo("#hero")
			},
			{
				id: "sec-stats",
				title: "02 — Stats & Experience Count",
				category: "Section Jump",
				icon: "heroicons:chart-bar",
				action: () => jumpTo("#stats")
			},
			{
				id: "sec-exp",
				title: "03 — Career & Experience Timeline",
				category: "Section Jump",
				icon: "heroicons:briefcase",
				action: () => jumpTo("#experience")
			},
			{
				id: "sec-edu",
				title: "04 — Education & Degree",
				category: "Section Jump",
				icon: "heroicons:academic-cap",
				action: () => jumpTo("#education")
			},
			{
				id: "sec-projects",
				title: "05 — Featured Projects Showcase",
				category: "Section Jump",
				icon: "heroicons:folder-open",
				action: () => jumpTo("#projects")
			},
			{
				id: "sec-tech",
				title: "06 — Tech Stack & Tooling Matrix",
				category: "Section Jump",
				icon: "heroicons:cpu-chip",
				action: () => jumpTo("#tech-stack")
			},
			{
				id: "sec-certs",
				title: "07 — Certifications & Achievements",
				category: "Section Jump",
				icon: "heroicons:shield-check",
				action: () => jumpTo("#certifications")
			},
			{
				id: "sec-blog",
				title: "08 — Engineering Blog & Articles",
				category: "Section Jump",
				icon: "heroicons:document-text",
				action: () => jumpTo("#blog")
			},
			{
				id: "sec-github",
				title: "09 — GitHub Activity & Commit Graph",
				category: "Section Jump",
				icon: "heroicons:code-bracket",
				action: () => jumpTo("#github")
			},
			{
				id: "sec-contact",
				title: "10 — Contact & Inquiry Form",
				category: "Section Jump",
				icon: "heroicons:envelope",
				action: () => jumpTo("#contact")
			},
			{
				id: "page-projects",
				title: "All Projects Archive (/projects)",
				category: "Page Navigation",
				icon: "heroicons:squares-2x2",
				action: () => router.push("/projects")
			},
			{
				id: "page-blog",
				title: "Blog Index (/blog)",
				category: "Page Navigation",
				icon: "heroicons:newspaper",
				action: () => router.push("/blog")
			},
			{
				id: "page-tech",
				title: "Interactive Tech Stack (/tech-stack)",
				category: "Page Navigation",
				icon: "heroicons:command-line",
				action: () => router.push("/tech-stack")
			},
			{
				id: "page-certs",
				title: "Certifications Catalog (/certifications)",
				category: "Page Navigation",
				icon: "heroicons:trophy",
				action: () => router.push("/certifications")
			},
			{
				id: "page-gallery",
				title: "Visual Gallery & Workshop (/gallery)",
				category: "Page Navigation",
				icon: "heroicons:photo",
				action: () => router.push("/gallery")
			},
			{
				id: "page-uses",
				title: "Uses & Developer Gear (/uses)",
				category: "Page Navigation",
				icon: "heroicons:wrench-screwdriver",
				action: () => router.push("/uses")
			},
			{
				id: "act-theme",
				title: "Toggle Dark / Light Theme",
				category: "Preferences",
				icon: "heroicons:sun",
				shortcut: "T",
				action: () => {
					colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
				}
			},
			{
				id: "act-copy-email",
				title: `Copy Email (${profile.socials.email})`,
				category: "Action",
				icon: "heroicons:clipboard-document",
				shortcut: "C",
				action: () => {
					(void 0).clipboard.writeText(profile.socials.email);
					emit("toast", "Email copied to clipboard!");
				}
			},
			{
				id: "act-github",
				title: "Open GitHub Profile",
				category: "External Link",
				icon: "logos:github-icon",
				action: () => (void 0).open(profile.socials.github, "_blank")
			},
			{
				id: "act-linkedin",
				title: "Open LinkedIn Profile",
				category: "External Link",
				icon: "logos:linkedin-icon",
				action: () => (void 0).open(profile.socials.linkedin, "_blank")
			},
			{
				id: "act-resume",
				title: "Download Résumé (PDF)",
				category: "Resource",
				icon: "heroicons:arrow-down-tray",
				action: () => (void 0).open(profile.resumeUrl, "_blank")
			}
		];
		const filteredCommands = computed(() => {
			if (!query.value.trim()) return commands;
			const q = query.value.toLowerCase();
			return commands.filter((cmd) => cmd.title.toLowerCase().includes(q) || cmd.category.toLowerCase().includes(q));
		});
		const jumpTo = (hash) => {
			if (router.currentRoute.value.path !== "/") router.push(`/${hash}`);
			else {
				const el = (void 0).querySelector(hash);
				if (el) el.scrollIntoView({ behavior: "smooth" });
			}
		};
		const open = () => {
			isOpen.value = true;
			query.value = "";
			activeIndex.value = 0;
			nextTick(() => {
				inputRef.value?.focus();
			});
		};
		const close = () => {
			isOpen.value = false;
		};
		__expose({
			open,
			close
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Icon = components_default$1;
			ssrRenderTeleport(_push, (_push) => {
				if (unref(isOpen)) {
					_push(`<div class="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/70 backdrop-blur-md"><div class="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden text-slate-100 transform transition-all"><div class="flex items-center px-4 py-3.5 border-b border-slate-800">`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "heroicons:magnifying-glass",
						class: "w-5 h-5 text-amber-400 mr-3 flex-shrink-0"
					}, null, _parent));
					_push(`<input${ssrRenderAttr("value", unref(query))} type="text" placeholder="Type a command or search sections... (e.g. projects, theme, copy email)" class="w-full bg-transparent text-sm md:text-base text-white placeholder-slate-400 focus:outline-none"><kbd class="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">ESC</kbd></div><div class="max-h-80 overflow-y-auto p-2 divide-y divide-slate-800/40">`);
					if (unref(filteredCommands).length === 0) _push(`<div class="py-10 text-center text-sm text-slate-400"> No matching commands or destinations found. </div>`);
					else _push(`<!---->`);
					_push(`<!--[-->`);
					ssrRenderList$2(unref(filteredCommands), (cmd, index) => {
						_push(`<div class="${ssrRenderClass([index === unref(activeIndex) ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" : "text-slate-200 hover:bg-slate-800/80", "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-sm transition-colors"])}"><div class="flex items-center gap-3"><div class="p-1.5 rounded-lg bg-slate-800 text-amber-400 border border-slate-700/50">`);
						_push(ssrRenderComponent(_component_Icon, {
							name: cmd.icon,
							class: ["w-4 h-4", cmd.icon === "logos:github-icon" && "dark:brightness-0 dark:invert"]
						}, null, _parent));
						_push(`</div><div><div class="font-medium">${ssrInterpolate(cmd.title)}</div><div class="text-xs text-slate-400">${ssrInterpolate(cmd.category)}</div></div></div>`);
						if (cmd.shortcut) _push(`<span class="text-xs font-mono text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">${ssrInterpolate(cmd.shortcut)}</span>`);
						else _push(`<!---->`);
						_push(`</div>`);
					});
					_push(`<!--]--></div><div class="px-4 py-2.5 bg-slate-950/70 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between"><div class="flex items-center gap-2"><span class="inline-flex items-center gap-1"><kbd class="px-1.5 py-0.5 bg-slate-800 rounded text-[10px]">↑</kbd><kbd class="px-1.5 py-0.5 bg-slate-800 rounded text-[10px]">↓</kbd> navigate </span><span>•</span><span class="inline-flex items-center gap-1"><kbd class="px-1.5 py-0.5 bg-slate-800 rounded text-[10px]">↵</kbd> select </span></div><span class="text-amber-400 font-mono text-[11px]">Ashly Omanada</span></div></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
// components/interactive/CommandPalette.vue
var _sfc_setup$5 = CommandPalette_vue_vue_type_script_setup_true_lang_default.setup;
CommandPalette_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/interactive/CommandPalette.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var CommandPalette_default = Object.assign(CommandPalette_vue_vue_type_script_setup_true_lang_default, { __name: "InteractiveCommandPalette" });
// components/layout/MobileMenu.vue?vue&type=script&setup=true&lang.ts
var MobileMenu_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "MobileMenu",
	__ssrInlineRender: true,
	props: { isOpen: { type: Boolean } },
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const close = () => {
			emit("close");
		};
		const navLinks = [
			{
				num: "01",
				name: "Profile Overview",
				href: "/#hero"
			},
			{
				num: "02",
				name: "Key Metrics & Stats",
				href: "/#stats"
			},
			{
				num: "03",
				name: "Experience Timeline",
				href: "/#experience"
			},
			{
				num: "04",
				name: "Education & Honors",
				href: "/#education"
			},
			{
				num: "05",
				name: "Featured Projects",
				href: "/#projects"
			},
			{
				num: "06",
				name: "Tech Stack Matrix",
				href: "/#tech-stack"
			},
			{
				num: "07",
				name: "Certifications",
				href: "/#certifications"
			},
			{
				num: "08",
				name: "Engineering Blog",
				href: "/#blog"
			},
			{
				num: "09",
				name: "GitHub Activity",
				href: "/#github"
			},
			{
				num: "10",
				name: "Get In Touch",
				href: "/#contact"
			}
		];
		const subPages = [
			{
				name: "Projects Archive",
				to: "/projects"
			},
			{
				name: "Blog Posts",
				to: "/blog"
			},
			{
				name: "Tech Stack Deep-Dive",
				to: "/tech-stack"
			},
			{
				name: "Certificates & Badges",
				to: "/certifications"
			},
			{
				name: "Gallery & Workspace",
				to: "/gallery"
			},
			{
				name: "Uses & Hardware",
				to: "/uses"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Icon = components_default$1;
			const _component_NuxtLink = NuxtLink;
			ssrRenderTeleport(_push, (_push) => {
				if (__props.isOpen) {
					_push(`<div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-between p-6"><div class="flex items-center justify-between border-b border-slate-800 pb-4"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-xl bg-slate-900 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-amber-400"> AO </div><span class="font-bold text-slate-100">Ashly Omanada</span></div><button type="button" class="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800" aria-label="Close menu">`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "heroicons:x-mark",
						class: "w-6 h-6"
					}, null, _parent));
					_push(`</button></div><div class="py-6 space-y-2 overflow-y-auto"><!--[-->`);
					ssrRenderList$2(navLinks, (item) => {
						_push(`<a${ssrRenderAttr("href", item.href)} class="flex items-center justify-between p-3.5 rounded-xl text-base font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-900/80 transition-colors"><span class="flex items-center gap-3"><span class="font-mono text-xs text-amber-500">${ssrInterpolate(item.num)}</span><span>${ssrInterpolate(item.name)}</span></span>`);
						_push(ssrRenderComponent(_component_Icon, {
							name: "heroicons:chevron-right",
							class: "w-4 h-4 text-slate-600"
						}, null, _parent));
						_push(`</a>`);
					});
					_push(`<!--]--><div class="pt-4 border-t border-slate-800/80 mt-4 space-y-2"><div class="text-xs font-mono uppercase tracking-wider text-slate-500 px-3">Inner Pages</div><!--[-->`);
					ssrRenderList$2(subPages, (sub) => {
						_push(ssrRenderComponent(_component_NuxtLink, {
							key: sub.to,
							to: sub.to,
							class: "flex items-center justify-between p-3 rounded-xl text-sm text-slate-300 hover:text-amber-300 hover:bg-slate-900/60",
							onClick: close
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<span${_scopeId}>${ssrInterpolate(sub.name)}</span>`);
									_push(ssrRenderComponent(_component_Icon, {
										name: "heroicons:arrow-up-right",
										class: "w-4 h-4 text-slate-600"
									}, null, _parent, _scopeId));
								} else return [createVNode("span", null, toDisplayString(sub.name), 1), createVNode(_component_Icon, {
									name: "heroicons:arrow-up-right",
									class: "w-4 h-4 text-slate-600"
								})];
							}),
							_: 2
						}, _parent));
					});
					_push(`<!--]--></div></div><div class="border-t border-slate-800 pt-4 flex items-center justify-between"><div class="flex items-center gap-3"><a${ssrRenderAttr("href", unref(profile).socials.github)} target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400" aria-label="GitHub">`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "logos:github-icon",
						class: "w-5 h-5 dark:brightness-0 dark:invert"
					}, null, _parent));
					_push(`</a><a${ssrRenderAttr("href", unref(profile).socials.linkedin)} target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400" aria-label="LinkedIn">`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "logos:linkedin-icon",
						class: "w-5 h-5"
					}, null, _parent));
					_push(`</a><a${ssrRenderAttr("href", `mailto:${unref(profile).socials.email}`)} class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400" aria-label="Email">`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "heroicons:envelope",
						class: "w-5 h-5 text-amber-400"
					}, null, _parent));
					_push(`</a></div><span class="text-xs font-mono text-slate-500">v4.6 Nuxt</span></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
// components/layout/MobileMenu.vue
var _sfc_setup$4 = MobileMenu_vue_vue_type_script_setup_true_lang_default.setup;
MobileMenu_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/MobileMenu.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var MobileMenu_default = Object.assign(MobileMenu_vue_vue_type_script_setup_true_lang_default, { __name: "LayoutMobileMenu" });
// components/ui/Toast.vue?vue&type=script&setup=true&lang.ts
var Toast_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Toast",
	__ssrInlineRender: true,
	setup(__props, { expose: __expose }) {
		const visible = ref(false);
		const message = ref("");
		let timer = null;
		const showToast = (msg, duration = 3e3) => {
			message.value = msg;
			visible.value = true;
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				visible.value = false;
			}, duration);
		};
		__expose({ showToast });
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(visible)) _push(`<div${ssrRenderAttrs(mergeProps({
				class: "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl glass-panel border border-amber-500/30 text-sm font-medium text-white bg-slate-900/90",
				role: "status",
				"aria-live": "polite"
			}, _attrs))}><div class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></div><span>${ssrInterpolate(unref(message))}</span></div>`);
			else _push(`<!---->`);
		};
	}
});
// components/ui/Toast.vue
var _sfc_setup$3 = Toast_vue_vue_type_script_setup_true_lang_default.setup;
Toast_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Toast.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var Toast_default = Object.assign(Toast_vue_vue_type_script_setup_true_lang_default, { __name: "UiToast" });
// app.vue?vue&type=script&setup=true&lang.ts
var app_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "app",
	__ssrInlineRender: true,
	setup(__props) {
		const commandPaletteRef = ref(null);
		const toastRef = ref(null);
		const mobileMenuOpen = ref(false);
		const openCommandPalette = () => {
			commandPaletteRef.value?.open();
		};
		const showToast = (msg) => {
			toastRef.value?.showToast(msg);
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_LayoutScrollProgress = ScrollProgress_default;
			const _component_LayoutAppHeader = AppHeader_default;
			const _component_NuxtPage = page_default;
			const _component_LayoutAppFooter = AppFooter_default;
			const _component_InteractiveAskAshlyChat = AskAshlyChat_default;
			const _component_InteractiveCommandPalette = CommandPalette_default;
			const _component_LayoutMobileMenu = MobileMenu_default;
			const _component_UiToast = Toast_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-(--bg-body) text-(--text-primary) transition-colors duration-300 relative selection:bg-amber-500/30 selection:text-white" }, _attrs))}><a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-slate-950 focus:font-bold focus:rounded-xl focus:shadow-2xl"> Skip to content </a>`);
			_push(ssrRenderComponent(_component_LayoutScrollProgress, null, null, _parent));
			_push(ssrRenderComponent(_component_LayoutAppHeader, {
				onOpenPalette: openCommandPalette,
				onToggleMobileMenu: ($event) => mobileMenuOpen.value = true
			}, null, _parent));
			_push(`<main id="main-content" class="focus:outline-none">`);
			_push(ssrRenderComponent(_component_NuxtPage, { onToast: showToast }, null, _parent));
			_push(`</main>`);
			_push(ssrRenderComponent(_component_LayoutAppFooter, null, null, _parent));
			_push(ssrRenderComponent(_component_InteractiveAskAshlyChat, null, null, _parent));
			_push(ssrRenderComponent(_component_InteractiveCommandPalette, {
				ref_key: "commandPaletteRef",
				ref: commandPaletteRef,
				onToast: showToast
			}, null, _parent));
			_push(ssrRenderComponent(_component_LayoutMobileMenu, {
				"is-open": unref(mobileMenuOpen),
				onClose: ($event) => mobileMenuOpen.value = false
			}, null, _parent));
			_push(ssrRenderComponent(_component_UiToast, {
				ref_key: "toastRef",
				ref: toastRef
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
// app.vue
var _sfc_setup$2 = app_vue_vue_type_script_setup_true_lang_default.setup;
app_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var app_default = app_vue_vue_type_script_setup_true_lang_default;
// error.vue?vue&type=script&setup=true&lang.ts
var error_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "error",
	__ssrInlineRender: true,
	props: { error: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-(--bg-body) text-(--text-primary) flex items-center justify-center p-6" }, _attrs))}><div class="max-w-md w-full p-8 rounded-3xl glass-panel bg-slate-900/80 border border-slate-800 text-center space-y-6 shadow-2xl"><div class="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-mono text-2xl font-black text-amber-400">${ssrInterpolate(__props.error?.statusCode || 404)}</div><div><h1 class="text-2xl font-extrabold text-slate-100">${ssrInterpolate(__props.error?.statusCode === 404 ? "Route Not Found" : "An Error Occurred")}</h1><p class="text-sm text-slate-400 mt-2 leading-relaxed font-mono">${ssrInterpolate(__props.error?.statusMessage || "The requested destination does not exist in the routing table.")}</p></div><div class="pt-2 flex flex-col sm:flex-row gap-3 justify-center"><button type="button" class="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"> Return to Home </button></div></div></div>`);
		};
	}
});
// error.vue
var _sfc_setup$1 = error_vue_vue_type_script_setup_true_lang_default.setup;
error_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var error_default = error_vue_vue_type_script_setup_true_lang_default;
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fisland-renderer.mjs
var IslandRenderer = () => null;
// node_modules/nuxt/dist/app/components/nuxt-root.vue
var _sfc_main = {
	__name: "nuxt-root",
	__ssrInlineRender: true,
	setup(__props) {
		const nuxtApp = useNuxtApp();
		nuxtApp.deferHydration();
		nuxtApp.ssrContext.url;
		const SingleRenderer = false;
		provide(PageRouteSymbol, useRoute());
		nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
		const error = useError();
		const abortRender = error.value && !nuxtApp.ssrContext.error;
		function invokeAppErrorHandler(err, target, info) {
			const errorHandler = nuxtApp.vueApp.config.errorHandler;
			if (errorHandler && !errorHandler.__nuxt_default) try {
				errorHandler(err, target, info);
			} catch (handlerError) {
				console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
			}
		}
		onErrorCaptured((err, target, info) => {
			nuxtApp.hooks.callHook("vue:error", err, target, info)?.catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
			{
				const p = nuxtApp.runWithContext(() => showError(err));
				onServerPrefetch(() => p);
				invokeAppErrorHandler(err, target, info);
				return false;
			}
		});
		const islandContext = nuxtApp.ssrContext.islandContext;
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderSuspense(_push, {
				default: () => {
					if (unref(abortRender)) _push(`<div></div>`);
					else if (unref(error)) _push(ssrRenderComponent(unref(error_default), { error: unref(error) }, null, _parent));
					else if (unref(islandContext)) _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
					else if (unref(SingleRenderer)) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
					else _push(ssrRenderComponent(unref(app_default), null, null, _parent));
				},
				_: 1
			});
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
// node_modules/nuxt/dist/app/entry.js
var entry$1 = async function createNuxtAppServer(ssrContext) {
	const vueApp = createApp(_sfc_main);
	const nuxt = createNuxtApp({
		vueApp,
		ssrContext
	});
	try {
		await applyPlugins(nuxt, virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default);
		await nuxt.hooks.callHook("app:created", vueApp);
	} catch (error) {
		await nuxt.hooks.callHook("app:error", error);
		nuxt.payload.error ||= createError$2(error);
	}
	if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) throw new Error("skipping render");
	return vueApp;
};
var entry_default = ((ssrContext) => entry$1(ssrContext));

const entry = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: entry_default
}, Symbol.toStringTag, { value: 'Module' }));

export { NuxtLink as N, _virtual_public__2Fimages_2Fportrait_default as _, useHead as a, useSeoMeta as b, components_default$1 as c, useSchemaOrg as d, definePerson as e, defineWebSite as f, useFetch as g, useRuntimeConfig as h, useNuxtApp as i, createError$2 as j, entry as k, profile as p, ssrRenderList$2 as s, useRoute as u };
//# sourceMappingURL=entry.mjs.map
