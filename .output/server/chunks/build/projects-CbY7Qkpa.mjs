import { a as useHead, p as profile, N as NuxtLink, c as components_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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

// pages/projects/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({
			title: "Projects Archive — Ashly Omanada",
			meta: [{
				name: "description",
				content: "Production web platforms, real-time dashboards, and full-stack software built by Ashly Omanada."
			}]
		});
		const categories = [
			"All",
			"Full-Stack",
			"Frontend"
		];
		const activeCategory = ref("All");
		const searchQuery = ref("");
		const filteredProjects = computed(() => {
			return profile.projects.filter((p) => {
				const matchesCat = activeCategory.value === "All" || p.category === activeCategory.value;
				const matchesQuery = !searchQuery.value.trim() || p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || p.summary.toLowerCase().includes(searchQuery.value.toLowerCase()) || p.technologies.some((t) => t.toLowerCase().includes(searchQuery.value.toLowerCase()));
				return matchesCat && matchesQuery;
			});
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_Icon = components_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "py-24 sm:py-32" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="mb-12"><div class="flex items-center gap-3 mb-3">`);
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
			_push(`<span class="text-slate-600">/</span><span class="font-mono text-xs text-slate-400">Archive</span></div><h1 class="text-4xl sm:text-5xl font-extrabold text-(--text-primary) tracking-tight"> All Projects &amp; Systems </h1><p class="mt-3 text-base sm:text-lg text-(--text-secondary) max-w-2xl"> An exhaustive archive of production web applications, institutional platforms, client projects, and open-source software built by Ashly Omanada. </p></div><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800"><div class="flex flex-wrap gap-2"><!--[-->`);
			ssrRenderList$2(categories, (cat) => {
				_push(`<button type="button" class="${ssrRenderClass([unref(activeCategory) === cat ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800", "px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer"])}">${ssrInterpolate(cat)}</button>`);
			});
			_push(`<!--]--></div><div class="relative w-full sm:w-72">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "heroicons:magnifying-glass",
				class: "w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
			}, null, _parent));
			_push(`<input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Search by name or tech..." class="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"></div></div>`);
			if (unref(filteredProjects).length === 0) _push(`<div class="py-16 text-center text-slate-500 font-mono text-sm"> No projects found matching &quot;${ssrInterpolate(unref(searchQuery))}&quot;. </div>`);
			else {
				_push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
				ssrRenderList$2(unref(filteredProjects), (project) => {
					_push(`<div class="rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1.5 shadow-sm"><div class="relative overflow-hidden aspect-[16/10] bg-slate-950 border-b border-slate-800/80"><img${ssrRenderAttr("src", project.coverImage)}${ssrRenderAttr("alt", project.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"><div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div><div class="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/90 text-amber-400 text-[11px] font-mono border border-slate-700">${ssrInterpolate(project.category)}</div>`);
					if (project.featured) _push(`<div class="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-mono font-bold"> ★ Featured </div>`);
					else _push(`<!---->`);
					_push(`</div><div class="p-6 flex-1 flex flex-col justify-between space-y-4"><div><h3 class="text-xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors">${ssrInterpolate(project.title)}</h3><p class="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">${ssrInterpolate(project.summary)}</p></div><div class="flex flex-wrap gap-1.5 pt-2"><!--[-->`);
					ssrRenderList$2(project.technologies, (tech) => {
						_push(`<span class="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-950 text-slate-300 border border-slate-800/80">${ssrInterpolate(tech)}</span>`);
					});
					_push(`<!--]--></div><div class="pt-4 border-t border-slate-800/60 flex items-center justify-between">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/projects/${project.slug}`,
						class: "text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1.5 group/link"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<span${_scopeId}>Read case study</span>`);
								_push(ssrRenderComponent(_component_Icon, {
									name: "heroicons:arrow-right",
									class: "w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform"
								}, null, _parent, _scopeId));
							} else return [createVNode("span", null, "Read case study"), createVNode(_component_Icon, {
								name: "heroicons:arrow-right",
								class: "w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform"
							})];
						}),
						_: 2
					}, _parent));
					_push(`<div class="flex items-center gap-2">`);
					if (project.liveUrl) {
						_push(`<a${ssrRenderAttr("href", project.liveUrl)} target="_blank" rel="noopener noreferrer" class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" title="Live Demo">`);
						_push(ssrRenderComponent(_component_Icon, {
							name: "heroicons:arrow-top-right-on-square",
							class: "w-4 h-4"
						}, null, _parent));
						_push(`</a>`);
					} else _push(`<!---->`);
					if (project.repoUrl) {
						_push(`<a${ssrRenderAttr("href", project.repoUrl)} target="_blank" rel="noopener noreferrer" class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" title="Source Code">`);
						_push(ssrRenderComponent(_component_Icon, {
							name: "logos:github-icon",
							class: "w-4 h-4 dark:brightness-0 dark:invert"
						}, null, _parent));
						_push(`</a>`);
					} else _push(`<!---->`);
					_push(`</div></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div></div>`);
		};
	}
});
// pages/projects/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var projects_default = index_vue_vue_type_script_setup_true_lang_default;

export { projects_default as default };
//# sourceMappingURL=projects-CbY7Qkpa.mjs.map
