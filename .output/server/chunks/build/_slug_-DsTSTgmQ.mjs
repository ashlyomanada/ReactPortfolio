import { u as useRoute, a as useHead, N as NuxtLink, s as ssrRenderList$2, _ as _virtual_public__2Fimages_2Fportrait_default, c as components_default } from '../virtual/entry.mjs';
import { defineComponent, computed, mergeProps, withCtx, createTextVNode, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import 'nostics';
import 'nostics/formatters/ansi';
import '../nitro/nitro.mjs';
import 'unhead/server';
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
import 'unhead/utils';
import 'vue-router';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'fnv1a-64';
import 'object-identity';
import '@vue/shared';
import 'zod';

// pages/blog/[slug].vue?vue&type=script&setup=true&lang.ts
var _slug__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[slug]",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const slug = computed(() => route.params.slug);
		const articlesMap = {
			"architecting-resilient-realtime-systems": {
				title: "Architecting Resilient Real-Time Systems with Vue 3 & WebRTC",
				description: "A deep dive into managing peer connections, low-latency signaling, and resilient state synchronization in distributed frontend applications.",
				date: "Feb 18, 2025",
				readingTime: "5 min read",
				tags: [
					"Vue.js",
					"WebRTC",
					"TypeScript",
					"Real-Time"
				],
				contentHtml: `
      <p>Real-time collaboration and sub-second data streaming are fundamental expectations for modern mission-critical web applications. When designing systems that must tolerate flaky networks, intermittent peer drops, and variable latencies, naive WebSocket and WebRTC implementations rapidly encounter bottlenecks.</p>

      <h3 class="text-xl font-bold text-slate-100 mt-8 mb-4">1. Graceful Degradation Under Network Jitter</h3>
      <p>When building real-time applications, the user interface should never freeze or present an ambiguous loading spinner when network latency spikes. State reconciliation strategies like optimistic updates paired with sequence reconciliation ensure that the UI responds instantly while resolving conflicts cleanly in the background.</p>

      <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto text-amber-300"><code>// Initializing an observable peer connection lifecycle
export function usePeerConnection(config: RTCConfiguration) {
  const connectionState = ref&lt;RTCPeerConnectionState&gt;('new')
  const pc = new RTCPeerConnection(config)

  pc.onconnectionstatechange = () => {
    connectionState.value = pc.connectionState
    if (pc.connectionState === 'failed') {
      attemptReconnection(pc)
    }
  }

  return { pc, connectionState }
}</code></pre>

      <h3 class="text-xl font-bold text-slate-100 mt-8 mb-4">2. Managing Distributed State with Nuxt & Pinia</h3>
      <p>By isolating peer messaging from DOM presentation logic, Vue's Composition API allows us to encapsulate real-time streams into clean, testable composables that seamlessly synchronize across route changes.</p>
    `
			},
			"zero-cost-optimizations-nuxt4-tailwind4": {
				title: "Zero-Cost Performance Optimizations with Nuxt 4 & Tailwind CSS v4",
				description: "How Vite-native CSS processing, fluid typography clamps, and island hydration patterns drive 99+ mobile Lighthouse scores.",
				date: "Jan 24, 2025",
				readingTime: "4 min read",
				tags: [
					"Nuxt 4",
					"Tailwind v4",
					"Web Vitals"
				],
				contentHtml: `
      <p>Shipping fast web applications isn't merely about stripping out code—it's about orchestrating asset loading, avoiding layout shifts, and leveraging next-generation compilation pipelines.</p>

      <h3 class="text-xl font-bold text-slate-100 mt-8 mb-4">1. CSS-First Design Tokens</h3>
      <p>With Tailwind CSS v4, the build configuration lives directly in CSS via <code>@theme</code>. This removes the legacy JavaScript configuration overhead and allows Vite's lightning-fast Lightning CSS engine to process design tokens natively.</p>

      <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto text-amber-300"><code>/* Tailwind v4 CSS-first config */
@theme {
  --font-display: 'Plus Jakarta Sans', sans-serif;
  --color-accent: #f59e0b;
}

:root {
  --fluid-h1: clamp(2.25rem, 1.8rem + 2.25vw, 4.5rem);
}</code></pre>

      <h3 class="text-xl font-bold text-slate-100 mt-8 mb-4">2. Eliminating Hydration Overhead</h3>
      <p>With Nuxt 4's component hydration directives like <code>hydrate-on-visible</code>, below-the-fold interactive widgets—such as terminal emulators, complex interactive graphs, and modals—remain inert until they scroll into the viewport, freeing up the main thread for instant Time to Interactive (TTI).</p>
    `
			}
		};
		const postData = computed(() => {
			return articlesMap[slug.value] || {
				title: "Engineering Article",
				description: "Technical notes by Ashly Omanada",
				date: "2025",
				readingTime: "3 min read",
				tags: ["Tech"],
				contentHtml: "<p>Article content coming soon.</p>"
			};
		});
		useHead({
			title: computed(() => `${postData.value.title} — Ashly Omanada`),
			meta: [{
				name: "description",
				content: computed(() => postData.value.description)
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_Icon = components_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "py-24 sm:py-32" }, _attrs))}><div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center gap-2 mb-8 text-xs font-mono">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "text-amber-500 hover:underline"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Home`);
					else return [createTextVNode("Home")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="text-slate-600">/</span>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/blog",
				class: "text-amber-500 hover:underline"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Blog`);
					else return [createTextVNode("Blog")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="text-slate-600">/</span><span class="text-slate-400 truncate">${ssrInterpolate(unref(postData).title)}</span></div><header class="space-y-4 mb-12"><div class="flex items-center gap-3 text-xs font-mono"><span class="text-amber-500">${ssrInterpolate(unref(postData).date)}</span><span class="text-slate-600">•</span><span class="text-slate-400">${ssrInterpolate(unref(postData).readingTime)}</span></div><h1 class="text-3xl sm:text-5xl font-extrabold text-(--text-primary) tracking-tight leading-tight">${ssrInterpolate(unref(postData).title)}</h1><p class="text-lg text-slate-300 leading-relaxed">${ssrInterpolate(unref(postData).description)}</p><div class="flex flex-wrap gap-2 pt-2"><!--[-->`);
			ssrRenderList$2(unref(postData).tags, (tag) => {
				_push(`<span class="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-900 text-amber-400 border border-slate-800"> #${ssrInterpolate(tag)}</span>`);
			});
			_push(`<!--]--></div></header><article class="prose prose-invert prose-amber max-w-none space-y-6 text-slate-300 leading-relaxed"><div>${unref(postData).contentHtml ?? ""}</div></article><div class="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6"><div class="flex items-center gap-3"><img${ssrRenderAttr("src", _virtual_public__2Fimages_2Fportrait_default)} alt="Ashly Omanada" class="w-12 h-12 rounded-full object-cover border border-amber-500/40"><div><div class="text-sm font-bold text-slate-100">Ashly Omanada</div><div class="text-xs text-slate-400">Full-Stack Developer • Calapan City, PH</div></div></div>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/blog",
				class: "text-xs font-mono text-amber-500 hover:underline flex items-center gap-1.5 self-start sm:self-auto"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_Icon, {
							name: "heroicons:arrow-left",
							class: "w-4 h-4"
						}, null, _parent, _scopeId));
						_push(`<span${_scopeId}>Back to all articles</span>`);
					} else return [createVNode(_component_Icon, {
						name: "heroicons:arrow-left",
						class: "w-4 h-4"
					}), createVNode("span", null, "Back to all articles")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div>`);
		};
	}
});
// pages/blog/[slug].vue
var _sfc_setup = _slug__vue_vue_type_script_setup_true_lang_default.setup;
_slug__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[slug].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _slug__default = _slug__vue_vue_type_script_setup_true_lang_default;

export { _slug__default as default };
//# sourceMappingURL=_slug_-DsTSTgmQ.mjs.map
