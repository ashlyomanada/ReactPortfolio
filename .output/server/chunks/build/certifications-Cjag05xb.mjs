import { a as useHead, N as NuxtLink, p as profile, c as components_default } from '../virtual/entry.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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

//#region pages/certifications.vue?vue&type=script&setup=true&lang.ts
var certifications_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "certifications",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({
			title: "Certifications & Honors — Ashly Omanada",
			meta: [{
				name: "description",
				content: "Verified professional certifications, awards, and technical licenses."
			}]
		});
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
			_push(`<span class="text-slate-600">/</span><span class="text-slate-400">Certifications</span></div><div class="mb-12"><h1 class="text-4xl sm:text-5xl font-extrabold text-(--text-primary) tracking-tight"> Certifications &amp; Credentials </h1><p class="mt-3 text-base sm:text-lg text-(--text-secondary) max-w-2xl"> Verified industry, academic, and technical qualifications demonstrating proficiency across frontend systems and database engineering. </p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><!--[-->`);
			ssrRenderList(unref(profile).certifications, (cert) => {
				_push(`<div class="p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-sm"><div><div class="flex items-center justify-between mb-4"><div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">`);
				_push(ssrRenderComponent(_component_Icon, {
					name: cert.badgeIcon,
					class: "w-6 h-6"
				}, null, _parent));
				_push(`</div><span class="text-xs font-mono text-slate-400">${ssrInterpolate(cert.issueDate)}</span></div><h3 class="text-xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors">${ssrInterpolate(cert.title)}</h3><div class="mt-2 text-sm font-semibold text-slate-400">${ssrInterpolate(cert.issuer)}</div><div class="mt-6"><div class="text-xs font-mono uppercase text-slate-500 mb-2">Verified Competencies:</div><div class="flex flex-wrap gap-1.5"><!--[-->`);
				ssrRenderList(cert.skillsCovered, (skill) => {
					_push(`<span class="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-950 text-slate-300 border border-slate-800">${ssrInterpolate(skill)}</span>`);
				});
				_push(`<!--]--></div></div></div><div class="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between"><span class="text-xs font-mono text-emerald-400 flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Verified Credential </span>`);
				if (cert.credentialUrl) {
					_push(`<a${ssrRenderAttr("href", cert.credentialUrl)} target="_blank" rel="noopener noreferrer" class="text-xs font-bold font-mono text-amber-500 hover:underline flex items-center gap-1"><span>View Credential</span>`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "heroicons:arrow-top-right-on-square",
						class: "w-3.5 h-3.5"
					}, null, _parent));
					_push(`</a>`);
				} else _push(`<!---->`);
				_push(`</div></div>`);
			});
			_push(`<!--]--></div></div></div>`);
		};
	}
});
//#endregion
//#region pages/certifications.vue
var _sfc_setup = certifications_vue_vue_type_script_setup_true_lang_default.setup;
certifications_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/certifications.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var certifications_default = certifications_vue_vue_type_script_setup_true_lang_default;

export { certifications_default as default };
//# sourceMappingURL=certifications-Cjag05xb.mjs.map
