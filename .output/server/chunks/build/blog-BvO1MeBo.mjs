import { a as useHead, N as NuxtLink, c as components_default } from '../virtual/entry.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import 'node:module';
import 'node:buffer';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import '../nitro/nitro.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'mdream';
import 'process';
import 'buffer';
import 'node:events';
import 'lru-cache';
import 'node:crypto';
import 'node:async_hooks';
import '@mdream/js/negotiate';
import 'consola';
import '@iconify/utils';
import 'fast-xml-parser';
import 'ipx';
import 'vue-router';

//#region pages/blog/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({
			title: "Blog & Engineering Notes — Ashly Omanada",
			meta: [{
				name: "description",
				content: "Articles on Vue 3, Nuxt 4, WebRTC real-time systems, and zero-cost web performance."
			}]
		});
		const posts = [{
			slug: "architecting-resilient-realtime-systems",
			title: "Architecting Resilient Real-Time Systems with Vue 3 & WebRTC",
			description: "A deep dive into managing peer connections, low-latency signaling, and resilient state synchronization in distributed frontend applications.",
			date: "Feb 18, 2025",
			tags: [
				"Vue.js",
				"WebRTC",
				"TypeScript"
			],
			readingTime: "5 min read"
		}, {
			slug: "zero-cost-optimizations-nuxt4-tailwind4",
			title: "Zero-Cost Performance Optimizations with Nuxt 4 & Tailwind CSS v4",
			description: "How Vite-native CSS processing, fluid typography clamps, and island hydration patterns drive 99+ mobile Lighthouse scores.",
			date: "Jan 24, 2025",
			tags: [
				"Nuxt 4",
				"Tailwind v4",
				"Web Vitals"
			],
			readingTime: "4 min read"
		}];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_Icon = components_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "py-24 sm:py-32" }, _attrs))}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><div class="mb-12"><div class="flex items-center gap-3 mb-3">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "font-mono text-xs text-amber-500 hover:underline flex items-center gap-1"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_Icon, {
							name: "heroicons:arrow-left",
							class: "w-3.5 h-3.5"
						}, null, _parent, _scopeId));
						_push(`<span${_scopeId}>Home</span>`);
					} else return [createVNode(_component_Icon, {
						name: "heroicons:arrow-left",
						class: "w-3.5 h-3.5"
					}), createVNode("span", null, "Home")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="text-slate-600">/</span><span class="font-mono text-xs text-slate-400">Engineering Notes</span></div><h1 class="text-4xl sm:text-5xl font-extrabold text-(--text-primary) tracking-tight"> Articles &amp; Writing </h1><p class="mt-3 text-base sm:text-lg text-(--text-secondary)"> Reflections on distributed web engineering, frontend performance patterns, WebRTC pipelines, and developer tooling. </p></div><div class="space-y-8"><!--[-->`);
			ssrRenderList(posts, (post) => {
				_push(`<article class="p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-sm"><div class="flex items-center justify-between gap-2 mb-3 text-xs font-mono"><div class="flex flex-wrap gap-1.5"><!--[-->`);
				ssrRenderList(post.tags, (tag) => {
					_push(`<span class="px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-800"> #${ssrInterpolate(tag)}</span>`);
				});
				_push(`<!--]--></div><span class="text-slate-400">${ssrInterpolate(post.readingTime)}</span></div><h2 class="text-2xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors">`);
				_push(ssrRenderComponent(_component_NuxtLink, { to: `/blog/${post.slug}` }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(post.title)}`);
						else return [createTextVNode(toDisplayString(post.title), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</h2><p class="mt-3 text-sm text-slate-300 leading-relaxed">${ssrInterpolate(post.description)}</p><div class="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400"><span>${ssrInterpolate(post.date)}</span>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: `/blog/${post.slug}`,
					class: "text-amber-500 hover:text-amber-400 font-bold flex items-center gap-1 group/btn"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<span${_scopeId}>Read article</span>`);
							_push(ssrRenderComponent(_component_Icon, {
								name: "heroicons:arrow-right",
								class: "w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform"
							}, null, _parent, _scopeId));
						} else return [createVNode("span", null, "Read article"), createVNode(_component_Icon, {
							name: "heroicons:arrow-right",
							class: "w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform"
						})];
					}),
					_: 2
				}, _parent));
				_push(`</div></article>`);
			});
			_push(`<!--]--></div></div></div>`);
		};
	}
});
//#endregion
//#region pages/blog/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var blog_default = index_vue_vue_type_script_setup_true_lang_default;

export { blog_default as default };
//# sourceMappingURL=blog-BvO1MeBo.mjs.map
