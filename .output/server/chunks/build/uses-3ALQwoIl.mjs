import { a as useHead, N as NuxtLink, c as components_default } from '../virtual/entry.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
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

//#region pages/uses.vue?vue&type=script&setup=true&lang.ts
var uses_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "uses",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({
			title: "Uses & Tooling — Ashly Omanada",
			meta: [{
				name: "description",
				content: "Hardware, editor setup, software, and desk ergonomics used by Ashly Omanada."
			}]
		});
		const usesList = [
			{
				title: "Hardware & Desk Gear",
				icon: "heroicons:computer-desktop",
				items: [
					{
						name: "Primary Workstation",
						badge: "M-Series Silicon",
						description: "Apple Silicon machine powering rapid Docker virtualization, instantaneous Vite rebuilds, and all-day battery life."
					},
					{
						name: "Display Setup",
						badge: "4K IPS",
						description: "High-density color-accurate external monitor configured in portrait/landscape for side-by-side terminal & browser inspecting."
					},
					{
						name: "Mechanical Keyboard",
						badge: "Custom 75%",
						description: "Tactile switches lubed for ergonomic typing comfort during long engineering sessions."
					},
					{
						name: "Audio & Isolation",
						badge: "ANC",
						description: "Active noise cancelling headphones for deep-focus coding states."
					}
				]
			},
			{
				title: "Development Environment & Editor",
				icon: "heroicons:code-bracket",
				items: [
					{
						name: "Visual Studio Code",
						badge: "Editor",
						description: "Sleek dark theme, Vue - Official (Volar), Tailwind CSS IntelliSense, ESLint, and Prettier integration."
					},
					{
						name: "Typography: JetBrains Mono",
						badge: "Font",
						description: "Crisp monospace typeface with programming ligatures for crystal-clear symbol distinction."
					},
					{
						name: "Zsh & Oh My Zsh",
						badge: "Shell",
						description: "Clean zsh configuration with Git aliases, fast path autocompletion, and starship prompt."
					},
					{
						name: "Git & GitHub CLI",
						badge: "Version Control",
						description: "Command line driven PRs, branch management, and automated test runners."
					}
				]
			},
			{
				title: "Software & Productivity Tooling",
				icon: "heroicons:wrench-screwdriver",
				items: [
					{
						name: "Postman & Hoppscotch",
						badge: "API Client",
						description: "Designing, inspecting, and stress-testing REST endpoints and WebSocket payloads."
					},
					{
						name: "Docker Desktop",
						badge: "Containers",
						description: "Isolated local PostgreSQL, MySQL, and Redis services matching production architectures."
					},
					{
						name: "Figma",
						badge: "Design",
						description: "Wireframing layouts, extracting design tokens, and validating responsive spacing."
					},
					{
						name: "Raycast",
						badge: "Launcher",
						description: "Keyboard-centric workflow for clipboard management, window snapping, and rapid shortcuts."
					}
				]
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_Icon = components_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "py-24 sm:py-32" }, _attrs))}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center gap-2 mb-8 text-xs font-mono">`);
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
			_push(`<span class="text-slate-600">/</span><span class="text-slate-400">Uses &amp; Setup</span></div><div class="mb-12"><h1 class="text-4xl sm:text-5xl font-extrabold text-(--text-primary) tracking-tight"> Uses &amp; Developer Setup </h1><p class="mt-3 text-base sm:text-lg text-(--text-secondary)"> A living document of the hardware, software, editor configuration, and tools I rely on daily to stay productive and focused. </p></div><div class="space-y-12"><!--[-->`);
			ssrRenderList(usesList, (section) => {
				_push(`<section class="p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 space-y-6"><div class="flex items-center gap-3 pb-3 border-b border-slate-800">`);
				_push(ssrRenderComponent(_component_Icon, {
					name: section.icon,
					class: "w-6 h-6 text-amber-500"
				}, null, _parent));
				_push(`<h2 class="text-xl font-bold text-slate-100">${ssrInterpolate(section.title)}</h2></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><!--[-->`);
				ssrRenderList(section.items, (item) => {
					_push(`<div class="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1"><div class="font-bold text-sm text-slate-200 flex items-center justify-between"><span>${ssrInterpolate(item.name)}</span>`);
					if (item.badge) _push(`<span class="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">${ssrInterpolate(item.badge)}</span>`);
					else _push(`<!---->`);
					_push(`</div><p class="text-xs text-slate-400 leading-relaxed">${ssrInterpolate(item.description)}</p></div>`);
				});
				_push(`<!--]--></div></section>`);
			});
			_push(`<!--]--></div></div></div>`);
		};
	}
});
//#endregion
//#region pages/uses.vue
var _sfc_setup = uses_vue_vue_type_script_setup_true_lang_default.setup;
uses_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/uses.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var uses_default = uses_vue_vue_type_script_setup_true_lang_default;

export { uses_default as default };
//# sourceMappingURL=uses-3ALQwoIl.mjs.map
