import { a as useHead, N as NuxtLink, s as ssrRenderList$2, c as components_default } from '../virtual/entry.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderTeleport } from 'vue/server-renderer';
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

// pages/gallery.vue?vue&type=script&setup=true&lang.ts
var gallery_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "gallery",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({
			title: "Visual Gallery — Ashly Omanada",
			meta: [{
				name: "description",
				content: "Snapshots from development environments, systems design, and developer workstations."
			}]
		});
		const selectedImage = ref(null);
		const galleryItems = [
			{
				title: "EUPER Admin Dashboard",
				category: "System UI",
				src: "/projects/capstone1.png",
				description: "Police evaluation platform interface showcasing real-time officer evaluation tables and performance forecasts."
			},
			{
				title: "EUPER Client Unit Ratings",
				category: "Analytics View",
				src: "/projects/capstone2.png",
				description: "Public rating portal allowing real-time inspection of municipal unit evaluation standings."
			},
			{
				title: "MovieTune Streaming Platform",
				category: "Frontend App",
				src: "/projects/movietune.png",
				description: "Media discovery interface with debounced TMDB querying and custom responsive watchlists."
			},
			{
				title: "Kapares Resto Digital Storefront",
				category: "Brand UI",
				src: "/projects/kapares.png",
				description: "High-contrast food menu and ordering platform built for authentic Filipino comfort cuisine."
			},
			{
				title: "Bundat Burgers Shop",
				category: "E-Commerce / Food UI",
				src: "/projects/bundat.png",
				description: "Street-aesthetic burger storefront optimized for smartphone ordering and touch navigation."
			},
			{
				title: "Profile & Dev Portrait",
				category: "Personal",
				src: "/images/portrait.png",
				description: "Ashly Omanada developer portrait and engineering workstation avatar."
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_Icon = components_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "py-24 sm:py-32" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center gap-2 mb-8 text-xs font-mono">`);
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
			_push(`<span class="text-slate-600">/</span><span class="text-slate-400">Visual Gallery</span></div><div class="mb-12"><h1 class="text-4xl sm:text-5xl font-extrabold text-(--text-primary) tracking-tight"> Visual Gallery &amp; Workspace </h1><p class="mt-3 text-base sm:text-lg text-(--text-secondary) max-w-2xl"> A visual collection of engineering work, workspace setups, design systems, and snapshots from the developer desk. </p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
			ssrRenderList$2(galleryItems, (item, index) => {
				_push(`<div class="group relative overflow-hidden rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 cursor-pointer shadow-md"><div class="aspect-[4/3] overflow-hidden bg-slate-950"><img${ssrRenderAttr("src", item.src)}${ssrRenderAttr("alt", item.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"></div><div class="p-4 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between"><div><div class="text-sm font-bold text-slate-200 group-hover:text-amber-400 transition-colors">${ssrInterpolate(item.title)}</div><div class="text-xs text-slate-400">${ssrInterpolate(item.category)}</div></div>`);
				_push(ssrRenderComponent(_component_Icon, {
					name: "heroicons:arrows-pointing-out",
					class: "w-4 h-4 text-slate-500 group-hover:text-amber-400"
				}, null, _parent));
				_push(`</div></div>`);
			});
			_push(`<!--]--></div>`);
			ssrRenderTeleport(_push, (_push) => {
				if (unref(selectedImage)) {
					_push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"><div class="max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"><div class="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-slate-200 text-sm"><span class="font-bold font-mono">${ssrInterpolate(unref(selectedImage).title)}</span><button type="button" class="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "heroicons:x-mark",
						class: "w-5 h-5"
					}, null, _parent));
					_push(`</button></div><img${ssrRenderAttr("src", unref(selectedImage).src)}${ssrRenderAttr("alt", unref(selectedImage).title)} class="max-h-[75vh] w-auto object-contain mx-auto"><div class="p-4 bg-slate-950 border-t border-slate-800 text-xs text-slate-400">${ssrInterpolate(unref(selectedImage).description)}</div></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
			_push(`</div></div>`);
		};
	}
});
// pages/gallery.vue
var _sfc_setup = gallery_vue_vue_type_script_setup_true_lang_default.setup;
gallery_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/gallery.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var gallery_default = gallery_vue_vue_type_script_setup_true_lang_default;

export { gallery_default as default };
//# sourceMappingURL=gallery-C2VyZkRk.mjs.map
