import { u as useRoute$1, p as profile, a as useHead, N as NuxtLink, c as components_default } from '../virtual/entry.mjs';
import { defineComponent, computed, unref, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
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

//#region pages/projects/[slug].vue?vue&type=script&setup=true&lang.ts
var _slug__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[slug]",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute$1();
		const slug = computed(() => route.params.slug);
		const project = computed(() => {
			return profile.projects.find((p) => p.slug === slug.value);
		});
		useHead({
			title: computed(() => project.value ? `${project.value.title} — Case Study` : "Project Case Study"),
			meta: [{
				name: "description",
				content: computed(() => project.value ? project.value.summary : "Engineering case study by Ashly Omanada")
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_Icon = components_default;
			if (unref(project)) {
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
				_push(`<span class="text-slate-600">/</span>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/projects",
					class: "text-amber-500 hover:underline"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Projects`);
						else return [createTextVNode("Projects")];
					}),
					_: 1
				}, _parent));
				_push(`<span class="text-slate-600">/</span><span class="text-slate-400 truncate">${ssrInterpolate(unref(project).title)}</span></div><div class="space-y-4 mb-10"><div class="flex items-center gap-3"><span class="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold">${ssrInterpolate(unref(project).category)}</span>`);
				if (unref(project).featured) _push(`<span class="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-mono text-xs font-bold"> Flagship Platform </span>`);
				else _push(`<!---->`);
				_push(`</div><h1 class="text-3xl sm:text-5xl font-extrabold text-(--text-primary) tracking-tight leading-tight">${ssrInterpolate(unref(project).title)}</h1><p class="text-lg sm:text-xl text-slate-300 leading-relaxed">${ssrInterpolate(unref(project).tagline)}</p><div class="flex flex-wrap items-center gap-4 pt-4">`);
				if (unref(project).liveUrl) {
					_push(`<a${ssrRenderAttr("href", unref(project).liveUrl)} target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20"><span>Visit Live Platform</span>`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "heroicons:arrow-top-right-on-square",
						class: "w-4 h-4"
					}, null, _parent));
					_push(`</a>`);
				} else _push(`<!---->`);
				if (unref(project).repoUrl) {
					_push(`<a${ssrRenderAttr("href", unref(project).repoUrl)} target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium text-xs tracking-wider uppercase transition-colors flex items-center gap-2">`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "logos:github-icon",
						class: "w-4 h-4"
					}, null, _parent));
					_push(`<span>Source Code</span></a>`);
				} else _push(`<!---->`);
				_push(`</div></div><div class="rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 mb-16 shadow-2xl"><img${ssrRenderAttr("src", unref(project).coverImage)}${ssrRenderAttr("alt", unref(project).title)} class="w-full h-auto object-cover"></div><div class="space-y-12 text-slate-300"><div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800"><div><div class="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">My Role</div><div class="font-bold text-slate-100 text-sm">${ssrInterpolate(unref(project).role)}</div></div><div><div class="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">Category</div><div class="font-bold text-slate-100 text-sm">${ssrInterpolate(unref(project).category)}</div></div><div><div class="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">Stack Highlights</div><div class="font-mono text-amber-400 text-xs">${ssrInterpolate(unref(project).technologies.join(" • "))}</div></div></div><section class="space-y-4"><h2 class="text-2xl font-bold text-slate-100 flex items-center gap-2"><span class="text-amber-500 font-mono text-lg">01.</span><span>The Challenge</span></h2><p class="text-base text-slate-300 leading-relaxed">${ssrInterpolate(unref(project).problem)}</p></section><section class="space-y-4"><h2 class="text-2xl font-bold text-slate-100 flex items-center gap-2"><span class="text-amber-500 font-mono text-lg">02.</span><span>System Architecture</span></h2><p class="text-base text-slate-300 leading-relaxed">${ssrInterpolate(unref(project).architecture)}</p></section><section class="space-y-4"><h2 class="text-2xl font-bold text-slate-100 flex items-center gap-2"><span class="text-amber-500 font-mono text-lg">03.</span><span>Key Feature Highlights</span></h2><ul class="space-y-3"><!--[-->`);
				ssrRenderList(unref(project).keyFeatures, (feat, idx) => {
					_push(`<li class="flex items-start gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-sm">`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "heroicons:check-circle",
						class: "w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
					}, null, _parent));
					_push(`<span>${ssrInterpolate(feat)}</span></li>`);
				});
				_push(`<!--]--></ul></section><section class="space-y-4"><h2 class="text-2xl font-bold text-slate-100 flex items-center gap-2"><span class="text-amber-500 font-mono text-lg">04.</span><span>Outcome &amp; Operational Impact</span></h2><p class="text-base text-slate-300 leading-relaxed">${ssrInterpolate(unref(project).outcome)}</p></section><div class="pt-12 border-t border-slate-800 flex items-center justify-between">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/projects",
					class: "text-sm font-mono text-amber-500 hover:text-amber-400 flex items-center gap-2"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_Icon, {
								name: "heroicons:arrow-left",
								class: "w-4 h-4"
							}, null, _parent, _scopeId));
							_push(`<span${_scopeId}>Back to All Projects</span>`);
						} else return [createVNode(_component_Icon, {
							name: "heroicons:arrow-left",
							class: "w-4 h-4"
						}), createVNode("span", null, "Back to All Projects")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/#contact",
					class: "px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono font-bold"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Discuss a similar project `);
						else return [createTextVNode(" Discuss a similar project ")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div></div></div>`);
			} else {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "py-32 text-center text-slate-400" }, _attrs))}><p>Project not found.</p>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/projects",
					class: "text-amber-400 underline mt-4 inline-block"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Return to Projects`);
						else return [createTextVNode("Return to Projects")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			}
		};
	}
});
//#endregion
//#region pages/projects/[slug].vue
var _sfc_setup = _slug__vue_vue_type_script_setup_true_lang_default.setup;
_slug__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects/[slug].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _slug__default = _slug__vue_vue_type_script_setup_true_lang_default;

export { _slug__default as default };
//# sourceMappingURL=_slug_-VZ89i-Zd.mjs.map
