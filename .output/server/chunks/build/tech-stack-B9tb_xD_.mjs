import { a as useHead, N as NuxtLink, c as components_default, p as profile } from '../virtual/entry.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
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

//#region pages/tech-stack.vue?vue&type=script&setup=true&lang.ts
var tech_stack_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "tech-stack",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({
			title: "Tech Stack Matrix — Ashly Omanada",
			meta: [{
				name: "description",
				content: "Full-stack engineering capabilities, languages, frameworks, and architecture toolkits."
			}]
		});
		const categories = [
			"Languages",
			"Frontend",
			"Backend",
			"Database",
			"DevOps/Cloud",
			"Tools"
		];
		const getCategoryItems = (category) => {
			return profile.techStack.filter((item) => item.category === category);
		};
		const getCount = (category) => {
			return getCategoryItems(category).length;
		};
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
			_push(`<span class="text-slate-600">/</span><span class="text-slate-400">Tech Stack Matrix</span></div><div class="mb-12"><h1 class="text-4xl sm:text-5xl font-extrabold text-(--text-primary) tracking-tight"> Engineering Stack &amp; Tooling </h1><p class="mt-3 text-base sm:text-lg text-(--text-secondary) max-w-3xl"> A complete, categorized inventory of frameworks, databases, libraries, and dev tooling that power Ashly&#39;s production applications. </p></div><div class="space-y-16"><!--[-->`);
			ssrRenderList(categories, (cat) => {
				_push(`<section class="space-y-6"><div class="flex items-center gap-3"><h2 class="text-2xl font-bold text-slate-100">${ssrInterpolate(cat)}</h2><div class="h-px flex-1 bg-slate-800"></div><span class="text-xs font-mono text-amber-500">${ssrInterpolate(getCount(cat))} technologies </span></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
				ssrRenderList(getCategoryItems(cat), (item) => {
					_push(`<div class="p-5 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex items-start gap-4 group"><div class="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-2.5 flex-shrink-0 group-hover:border-amber-500/50 transition-colors">`);
					_push(ssrRenderComponent(_component_Icon, {
						name: item.icon,
						class: "w-7 h-7"
					}, null, _parent));
					_push(`</div><div class="flex-1 min-w-0"><div class="flex items-center justify-between gap-2"><div class="font-bold text-slate-200 group-hover:text-amber-400 transition-colors truncate">${ssrInterpolate(item.name)}</div><span class="${ssrRenderClass([item.proficiency === "Expert" ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" : "bg-slate-950 text-slate-400 border border-slate-800", "text-[10px] font-mono px-2 py-0.5 rounded-full flex-shrink-0"])}">${ssrInterpolate(item.proficiency)}</span></div><div class="text-xs text-slate-400 mt-1"> Production verified • Active workflow </div></div></div>`);
				});
				_push(`<!--]--></div></section>`);
			});
			_push(`<!--]--></div></div></div>`);
		};
	}
});
//#endregion
//#region pages/tech-stack.vue
var _sfc_setup = tech_stack_vue_vue_type_script_setup_true_lang_default.setup;
tech_stack_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tech-stack.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var tech_stack_default = tech_stack_vue_vue_type_script_setup_true_lang_default;

export { tech_stack_default as default };
//# sourceMappingURL=tech-stack-B9tb_xD_.mjs.map
