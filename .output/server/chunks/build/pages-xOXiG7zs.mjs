import { b as useSeoMeta, p as profile, d as useSchemaOrg, e as definePerson, f as defineWebSite, c as components_default, _ as _virtual_public__2Fimages_2Fportrait_default, N as NuxtLink, g as useFetch } from '../virtual/entry.mjs';
import { defineComponent, ref, mergeProps, unref, computed, withCtx, createVNode, createTextVNode, toDisplayString, withAsyncContext, reactive, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { z } from 'zod';
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

//#region components/sections/HeroSection.vue?vue&type=script&setup=true&lang.ts
var HeroSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HeroSection",
	__ssrInlineRender: true,
	emits: ["toast"],
	setup(__props, { emit: __emit }) {
		const mouseX = ref(400);
		const mouseY = ref(200);
		const tiltX = ref(0);
		const tiltY = ref(0);
		profile.roles;
		ref(0);
		const displayedRole = ref("");
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Icon = components_default;
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "hero",
				ref: "heroRef",
				class: "relative pt-24 sm:pt-32 pb-16 md:pb-24 overflow-hidden"
			}, _attrs))}><div class="pointer-events-none absolute -inset-px opacity-35 dark:opacity-25 transition-opacity duration-300 hidden sm:block" style="${ssrRenderStyle({ background: `radial-gradient(650px circle at ${unref(mouseX)}px ${unref(mouseY)}px, rgba(245, 158, 11, 0.12), transparent 80%)` })}"></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"><div class="flex items-center gap-3 mb-6"><span class="font-mono text-xs font-semibold tracking-wider text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20"> 01 — Profile &amp; Overview </span><div class="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent max-w-xs"></div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"><div class="lg:col-span-7 space-y-6"><div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 shadow-sm backdrop-blur-md"><span class="relative flex h-2.5 w-2.5"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span></span><span class="font-medium text-slate-200">${ssrInterpolate(unref(profile).status.label)}</span><span class="text-slate-500 hidden sm:inline">•</span><span class="text-slate-400 text-[11px] hidden sm:inline">${ssrInterpolate(unref(profile).status.subtext)}</span></div><div><h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-(--text-primary) leading-[1.1]"> Hi, I&#39;m <span class="text-amber-500 inline-block drop-shadow-sm">${ssrInterpolate(unref(profile).name)}</span></h1><div class="h-10 sm:h-12 flex items-center mt-3 text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-300"><span class="text-slate-400 mr-2 font-mono text-sm sm:text-base">&gt;</span><span class="text-amber-400/95 font-mono">${ssrInterpolate(unref(displayedRole))}</span><span class="w-2.5 h-6 bg-amber-500 ml-1 inline-block animate-pulse"></span></div></div><p class="text-base sm:text-lg text-(--text-secondary) leading-relaxed max-w-2xl">${ssrInterpolate(unref(profile).bio.short)}</p><div class="flex flex-wrap items-center gap-3 pt-2"><a href="#projects" class="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all duration-200 flex items-center gap-2 cursor-pointer"><span>View Projects</span>`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "heroicons:arrow-down",
				class: "w-4 h-4"
			}, null, _parent));
			_push(`</a><a${ssrRenderAttr("href", unref(profile).resumeUrl)} target="_blank" class="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm border border-slate-700/80 transition-all flex items-center gap-2">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "heroicons:arrow-down-tray",
				class: "w-4 h-4 text-amber-400"
			}, null, _parent));
			_push(`<span>Download Résumé</span></a><a href="#contact" class="px-5 py-3 rounded-xl bg-transparent hover:bg-slate-900/60 text-slate-300 hover:text-amber-400 font-medium text-sm border border-slate-800 transition-all flex items-center gap-2"><span>Get in Touch</span>`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "heroicons:paper-airplane",
				class: "w-4 h-4"
			}, null, _parent));
			_push(`</a></div><div class="flex items-center gap-4 pt-4 text-slate-400"><span class="text-xs font-mono uppercase tracking-wider text-slate-500">Connect:</span><div class="flex items-center gap-3"><a${ssrRenderAttr("href", unref(profile).socials.github)} target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-slate-900/80 hover:text-amber-400 transition-colors border border-slate-800" aria-label="GitHub">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "logos:github-icon",
				class: "w-4 h-4"
			}, null, _parent));
			_push(`</a><a${ssrRenderAttr("href", unref(profile).socials.linkedin)} target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-slate-900/80 hover:text-amber-400 transition-colors border border-slate-800" aria-label="LinkedIn">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "logos:linkedin-icon",
				class: "w-4 h-4"
			}, null, _parent));
			_push(`</a><button type="button" class="p-2 rounded-lg bg-slate-900/80 hover:text-amber-400 transition-colors border border-slate-800 flex items-center gap-1.5 text-xs font-mono text-slate-300 cursor-pointer">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "heroicons:clipboard-document",
				class: "w-4 h-4 text-amber-400"
			}, null, _parent));
			_push(`<span>${ssrInterpolate(unref(profile).socials.email)}</span></button></div></div></div><div class="lg:col-span-5 flex flex-col items-center justify-center"><div class="relative group cursor-pointer perspective-1000"><div class="absolute -inset-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse-subtle"></div><div class="relative rounded-3xl p-2 bg-gradient-to-b from-slate-800/90 to-slate-950/90 border border-amber-500/30 shadow-2xl transition-transform duration-200 ease-out" style="${ssrRenderStyle({ transform: `rotateX(${unref(tiltX)}deg) rotateY(${unref(tiltY)}deg)` })}"><div class="overflow-hidden rounded-2xl w-64 sm:w-72 md:w-80 h-72 sm:h-80 md:h-96 relative bg-slate-900"><img${ssrRenderAttr("src", _virtual_public__2Fimages_2Fportrait_default)} alt="Ashly Omanada Portrait" class="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-500"><div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div><div class="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl glass-panel bg-slate-950/80 border border-slate-700/60 text-xs"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span><span class="font-mono text-slate-200">systems_online</span></div><span class="font-mono text-amber-400 font-semibold">lat: ~18ms</span></div></div></div></div></div></div><div class="mt-16 md:mt-24"><div class="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4"> // 01.1 — Context Matrix &amp; Personal Notes </div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><!--[-->`);
			ssrRenderList(unref(profile).bento, (card) => {
				_push(`<div class="p-5 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800/90 hover:border-amber-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-sm"><div class="flex items-center justify-between mb-3"><span class="text-xs font-mono text-amber-500 font-semibold">${ssrInterpolate(card.title)}</span>`);
				_push(ssrRenderComponent(_component_Icon, {
					name: card.icon || "heroicons:sparkles",
					class: "w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors"
				}, null, _parent));
				_push(`</div><div class="text-sm font-bold text-slate-100 group-hover:text-white transition-colors">${ssrInterpolate(card.content)}</div>`);
				if (card.detail) _push(`<p class="mt-2 text-xs text-slate-400 leading-relaxed">${ssrInterpolate(card.detail)}</p>`);
				else _push(`<!---->`);
				_push(`</div>`);
			});
			_push(`<!--]--></div></div></div></section>`);
		};
	}
});
//#endregion
//#region components/sections/HeroSection.vue
var _sfc_setup$11 = HeroSection_vue_vue_type_script_setup_true_lang_default.setup;
HeroSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/HeroSection.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
var HeroSection_default = Object.assign(HeroSection_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsHeroSection" });
//#endregion
//#region components/sections/StatsStrip.vue?vue&type=script&setup=true&lang.ts
var StatsStrip_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "StatsStrip",
	__ssrInlineRender: true,
	setup(__props) {
		const statsSectionRef = ref(null);
		const displayValues = ref(profile.stats.map(() => 0));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "stats",
				ref_key: "statsSectionRef",
				ref: statsSectionRef,
				class: "py-12 md:py-16 border-y border-slate-800/80 bg-slate-950/40 relative"
			}, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center gap-3 mb-8"><span class="font-mono text-xs font-semibold tracking-wider text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20"> 02 — Key Metrics </span><div class="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent max-w-xs"></div></div><div class="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"><!--[-->`);
			ssrRenderList(unref(profile).stats, (item, idx) => {
				_push(`<div class="relative p-6 rounded-2xl glass-panel bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-sm"><div class="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-amber-400 transition-colors"></div><div class="flex items-baseline gap-1 font-mono"><span class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-(--text-primary) tracking-tight group-hover:text-amber-400 transition-colors">${ssrInterpolate(unref(displayValues)[idx])}</span><span class="text-2xl md:text-3xl font-bold text-amber-500">${ssrInterpolate(item.suffix || "")}</span></div><div class="mt-3 text-sm md:text-base font-bold text-slate-200">${ssrInterpolate(item.label)}</div><div class="mt-1 text-xs text-slate-400 leading-relaxed">${ssrInterpolate(item.description)}</div></div>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region components/sections/StatsStrip.vue
var _sfc_setup$10 = StatsStrip_vue_vue_type_script_setup_true_lang_default.setup;
StatsStrip_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/StatsStrip.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var StatsStrip_default = Object.assign(StatsStrip_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsStatsStrip" });
//#endregion
//#region components/ui/SectionHeader.vue?vue&type=script&setup=true&lang.ts
var SectionHeader_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SectionHeader",
	__ssrInlineRender: true,
	props: {
		number: {},
		label: {},
		title: {},
		description: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-12 md:mb-16" }, _attrs))}><div class="flex items-center gap-3 mb-3"><span class="font-mono text-xs md:text-sm font-semibold tracking-wider text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">${ssrInterpolate(__props.number)} — ${ssrInterpolate(__props.label)}</span><div class="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent"></div></div><h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-(--text-primary)">${ssrInterpolate(__props.title)}</h2>`);
			if (__props.description) _push(`<p class="mt-3 text-base md:text-lg text-(--text-secondary) max-w-2xl leading-relaxed">${ssrInterpolate(__props.description)}</p>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region components/ui/SectionHeader.vue
var _sfc_setup$9 = SectionHeader_vue_vue_type_script_setup_true_lang_default.setup;
SectionHeader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/SectionHeader.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var SectionHeader_default = Object.assign(SectionHeader_vue_vue_type_script_setup_true_lang_default, { __name: "UiSectionHeader" });
//#endregion
//#region components/sections/ExperienceSection.vue?vue&type=script&setup=true&lang.ts
var ExperienceSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ExperienceSection",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UiSectionHeader = SectionHeader_default;
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "experience",
				class: "py-20 md:py-28 relative"
			}, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">`);
			_push(ssrRenderComponent(_component_UiSectionHeader, {
				number: "03",
				label: "Career History",
				title: "Experience & Leadership",
				description: "A timeline of institutional engineering projects, architectural leadership, and production-grade delivery."
			}, null, _parent));
			_push(`<div class="relative border-l-2 border-slate-800 ml-4 md:ml-32 pl-6 md:pl-10 space-y-12"><!--[-->`);
			ssrRenderList(unref(profile).experiences, (item) => {
				_push(`<div class="relative group"><div class="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-500 group-hover:scale-125 transition-transform duration-200">`);
				if (item.current) _push(`<span class="absolute -inset-1 rounded-full bg-amber-400 animate-ping opacity-60"></span>`);
				else _push(`<!---->`);
				_push(`</div><div class="md:absolute md:-left-40 md:top-1 text-xs font-mono font-bold text-amber-500 mb-2 md:mb-0">${ssrInterpolate(item.period)}</div><div class="p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 shadow-sm"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/80"><div><h3 class="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors">${ssrInterpolate(item.role)}</h3><div class="text-sm font-semibold text-slate-400 flex items-center gap-2 mt-1"><span>${ssrInterpolate(item.company)}</span><span>•</span><span class="text-xs font-mono text-slate-500">${ssrInterpolate(item.location)}</span></div></div>`);
				if (item.metrics) _push(`<div class="self-start sm:self-auto px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400"><span class="text-slate-400">${ssrInterpolate(item.metrics.label)}:</span><span class="font-bold ml-1 text-amber-300">${ssrInterpolate(item.metrics.value)}</span></div>`);
				else _push(`<!---->`);
				_push(`</div><p class="mt-4 text-sm md:text-base text-slate-300 leading-relaxed">${ssrInterpolate(item.description)}</p><ul class="mt-4 space-y-2 text-xs md:text-sm text-slate-400"><!--[-->`);
				ssrRenderList(item.impactBullets, (bullet, bIdx) => {
					_push(`<li class="flex items-start gap-2.5"><span class="text-amber-400 mt-1 flex-shrink-0 font-bold">›</span><span class="leading-relaxed">${ssrInterpolate(bullet)}</span></li>`);
				});
				_push(`<!--]--></ul><div class="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-800/60"><!--[-->`);
				ssrRenderList(item.technologies, (tech) => {
					_push(`<span class="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-950 text-slate-300 border border-slate-800">${ssrInterpolate(tech)}</span>`);
				});
				_push(`<!--]--></div></div></div>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region components/sections/ExperienceSection.vue
var _sfc_setup$8 = ExperienceSection_vue_vue_type_script_setup_true_lang_default.setup;
ExperienceSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/ExperienceSection.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var ExperienceSection_default = Object.assign(ExperienceSection_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsExperienceSection" });
//#endregion
//#region components/sections/EducationSection.vue?vue&type=script&setup=true&lang.ts
var EducationSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "EducationSection",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UiSectionHeader = SectionHeader_default;
			const _component_Icon = components_default;
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "education",
				class: "py-16 md:py-24 border-t border-slate-800/60 bg-slate-950/30"
			}, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">`);
			_push(ssrRenderComponent(_component_UiSectionHeader, {
				number: "04",
				label: "Academic Foundation",
				title: "Education & Honors",
				description: "Formal computer science and software development foundations, capstone distinctions, and specialized coursework."
			}, null, _parent));
			_push(`<div class="grid grid-cols-1 lg:grid-cols-12 gap-8"><!--[-->`);
			ssrRenderList(unref(profile).education, (edu) => {
				_push(`<div class="lg:col-span-12 p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800"><div><div class="flex items-center gap-2 mb-1"><span class="font-mono text-xs text-amber-500 font-semibold">${ssrInterpolate(edu.period)}</span><span class="text-slate-600">•</span><span class="text-xs text-slate-400 font-mono">${ssrInterpolate(edu.location)}</span></div><h3 class="text-2xl font-bold text-slate-100">${ssrInterpolate(edu.degree)}</h3><div class="text-base font-semibold text-slate-400 mt-1">${ssrInterpolate(edu.institution)}</div></div>`);
				if (edu.honors) {
					_push(`<div class="self-start sm:self-auto px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center gap-2 text-amber-300 text-xs font-mono font-bold">`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "heroicons:trophy",
						class: "w-4 h-4 text-amber-400"
					}, null, _parent));
					_push(`<span>${ssrInterpolate(edu.honors)}</span></div>`);
				} else _push(`<!---->`);
				_push(`</div><p class="mt-4 text-sm md:text-base text-slate-300 leading-relaxed">${ssrInterpolate(edu.description)}</p><div class="mt-6"><h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Key Academic Highlights &amp; Leadership</h4><div class="grid grid-cols-1 sm:grid-cols-3 gap-3"><!--[-->`);
				ssrRenderList(edu.highlights, (item, i) => {
					_push(`<div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5"><span class="text-amber-400 font-bold">›</span><span>${ssrInterpolate(item)}</span></div>`);
				});
				_push(`<!--]--></div></div></div>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region components/sections/EducationSection.vue
var _sfc_setup$7 = EducationSection_vue_vue_type_script_setup_true_lang_default.setup;
EducationSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/EducationSection.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var EducationSection_default = Object.assign(EducationSection_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsEducationSection" });
//#endregion
//#region components/sections/FeaturedProjectsSection.vue?vue&type=script&setup=true&lang.ts
var FeaturedProjectsSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "FeaturedProjectsSection",
	__ssrInlineRender: true,
	setup(__props) {
		const flagshipProject = computed(() => {
			return profile.projects.find((p) => p.featured) || profile.projects[0];
		});
		const otherProjects = computed(() => {
			return profile.projects.filter((p) => p.slug !== flagshipProject.value?.slug);
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UiSectionHeader = SectionHeader_default;
			const _component_NuxtLink = NuxtLink;
			const _component_Icon = components_default;
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "projects",
				class: "py-20 md:py-28 relative"
			}, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">`);
			_push(ssrRenderComponent(_component_UiSectionHeader, {
				number: "05",
				label: "Engineered Systems",
				title: "Featured Projects",
				description: "Selected production applications and systems built for operational utility, performance, and memorable user experiences."
			}, null, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/projects",
				class: "inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-400 group flex-shrink-0"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<span${_scopeId}>View All Projects Archive</span>`);
						_push(ssrRenderComponent(_component_Icon, {
							name: "heroicons:arrow-right",
							class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
						}, null, _parent, _scopeId));
					} else return [createVNode("span", null, "View All Projects Archive"), createVNode(_component_Icon, {
						name: "heroicons:arrow-right",
						class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
			if (unref(flagshipProject)) {
				_push(`<div class="mb-14 rounded-3xl glass-panel bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden shadow-xl group"><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10"><div class="lg:col-span-7 relative overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 aspect-[16/10]"><img${ssrRenderAttr("src", unref(flagshipProject).coverImage)}${ssrRenderAttr("alt", unref(flagshipProject).title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"><div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div><div class="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 text-xs font-mono font-bold shadow-md"> ★ Flagship System </div></div><div class="lg:col-span-5 space-y-5"><div class="flex items-center gap-2"><span class="text-xs font-mono text-amber-500 font-semibold uppercase tracking-wider">${ssrInterpolate(unref(flagshipProject).category)}</span><span class="text-slate-600">•</span><span class="text-xs font-mono text-slate-400">Institutional Platform</span></div><h3 class="text-2xl sm:text-3xl font-extrabold text-slate-100 group-hover:text-amber-400 transition-colors">${ssrInterpolate(unref(flagshipProject).title)}</h3><p class="text-sm sm:text-base text-slate-300 leading-relaxed">${ssrInterpolate(unref(flagshipProject).summary)}</p><div class="flex flex-wrap gap-2 pt-1"><!--[-->`);
				ssrRenderList(unref(flagshipProject).technologies, (tech) => {
					_push(`<span class="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-950 text-slate-300 border border-slate-800">${ssrInterpolate(tech)}</span>`);
				});
				_push(`<!--]--></div><div class="flex flex-wrap items-center gap-3 pt-3">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: `/projects/${unref(flagshipProject).slug}`,
					class: "px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 shadow-md shadow-amber-500/20"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<span${_scopeId}>Read Case Study</span>`);
							_push(ssrRenderComponent(_component_Icon, {
								name: "heroicons:arrow-right",
								class: "w-4 h-4"
							}, null, _parent, _scopeId));
						} else return [createVNode("span", null, "Read Case Study"), createVNode(_component_Icon, {
							name: "heroicons:arrow-right",
							class: "w-4 h-4"
						})];
					}),
					_: 1
				}, _parent));
				if (unref(flagshipProject).liveUrl) {
					_push(`<a${ssrRenderAttr("href", unref(flagshipProject).liveUrl)} target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors" title="Open Live Deployment">`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "heroicons:arrow-top-right-on-square",
						class: "w-4 h-4"
					}, null, _parent));
					_push(`</a>`);
				} else _push(`<!---->`);
				if (unref(flagshipProject).repoUrl) {
					_push(`<a${ssrRenderAttr("href", unref(flagshipProject).repoUrl)} target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors" title="View Source Repository">`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "logos:github-icon",
						class: "w-4 h-4"
					}, null, _parent));
					_push(`</a>`);
				} else _push(`<!---->`);
				_push(`</div></div></div></div>`);
			} else _push(`<!---->`);
			_push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"><!--[-->`);
			ssrRenderList(unref(otherProjects), (project) => {
				_push(`<div class="rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1.5 shadow-sm"><div class="relative overflow-hidden aspect-[16/10] bg-slate-950 border-b border-slate-800/80"><img${ssrRenderAttr("src", project.coverImage)}${ssrRenderAttr("alt", project.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"><div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div><div class="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/90 text-amber-400 text-[11px] font-mono border border-slate-700">${ssrInterpolate(project.category)}</div></div><div class="p-6 flex-1 flex flex-col justify-between space-y-4"><div><h4 class="text-xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors">${ssrInterpolate(project.title)}</h4><p class="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">${ssrInterpolate(project.summary)}</p></div><div class="flex flex-wrap gap-1.5 pt-2"><!--[-->`);
				ssrRenderList(project.technologies, (tech) => {
					_push(`<span class="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-950 text-slate-300 border border-slate-800/80">${ssrInterpolate(tech)}</span>`);
				});
				_push(`<!--]--></div><div class="pt-4 border-t border-slate-800/60 flex items-center justify-between">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: `/projects/${project.slug}`,
					class: "text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1.5 group/link"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<span${_scopeId}>Case study</span>`);
							_push(ssrRenderComponent(_component_Icon, {
								name: "heroicons:arrow-right",
								class: "w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform"
							}, null, _parent, _scopeId));
						} else return [createVNode("span", null, "Case study"), createVNode(_component_Icon, {
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
						class: "w-4 h-4"
					}, null, _parent));
					_push(`</a>`);
				} else _push(`<!---->`);
				_push(`</div></div></div></div>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region components/sections/FeaturedProjectsSection.vue
var _sfc_setup$6 = FeaturedProjectsSection_vue_vue_type_script_setup_true_lang_default.setup;
FeaturedProjectsSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/FeaturedProjectsSection.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var FeaturedProjectsSection_default = Object.assign(FeaturedProjectsSection_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsFeaturedProjectsSection" });
//#endregion
//#region components/sections/TechStackSection.vue?vue&type=script&setup=true&lang.ts
var TechStackSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TechStackSection",
	__ssrInlineRender: true,
	setup(__props) {
		const categories = [
			"All",
			"Languages",
			"Frontend",
			"Backend",
			"Database",
			"DevOps/Cloud",
			"Tools"
		];
		const selectedCategory = ref("All");
		const filteredStack = computed(() => {
			if (selectedCategory.value === "All") return profile.techStack;
			return profile.techStack.filter((item) => item.category === selectedCategory.value);
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UiSectionHeader = SectionHeader_default;
			const _component_NuxtLink = NuxtLink;
			const _component_Icon = components_default;
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "tech-stack",
				class: "py-20 md:py-28 border-t border-slate-800/80 bg-slate-950/40 relative"
			}, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">`);
			_push(ssrRenderComponent(_component_UiSectionHeader, {
				number: "06",
				label: "Core Competencies",
				title: "Tech Stack & Tooling",
				description: "Languages, frameworks, databases, and DevOps infrastructure powering end-to-end engineering."
			}, null, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/tech-stack",
				class: "inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-400 group flex-shrink-0"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<span${_scopeId}>Deep-Dive Matrix</span>`);
						_push(ssrRenderComponent(_component_Icon, {
							name: "heroicons:arrow-right",
							class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
						}, null, _parent, _scopeId));
					} else return [createVNode("span", null, "Deep-Dive Matrix"), createVNode(_component_Icon, {
						name: "heroicons:arrow-right",
						class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-800/80"><!--[-->`);
			ssrRenderList(categories, (cat) => {
				_push(`<button type="button" class="${ssrRenderClass([unref(selectedCategory) === cat ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20" : "bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800", "px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer"])}">${ssrInterpolate(cat)}</button>`);
			});
			_push(`<!--]--></div><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"><!--[-->`);
			ssrRenderList(unref(filteredStack), (tech) => {
				_push(`<div class="p-4 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1 shadow-sm"><div class="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-2 mb-3 group-hover:border-amber-500/50 transition-colors">`);
				_push(ssrRenderComponent(_component_Icon, {
					name: tech.icon,
					class: "w-7 h-7"
				}, null, _parent));
				_push(`</div><div class="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-amber-400 transition-colors line-clamp-1">${ssrInterpolate(tech.name)}</div><span class="mt-1 text-[10px] font-mono text-slate-400">${ssrInterpolate(tech.category)}</span><span class="${ssrRenderClass([tech.proficiency === "Expert" ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" : "bg-slate-950 text-slate-400 border border-slate-800", "mt-2 text-[10px] font-mono px-2 py-0.5 rounded-full"])}">${ssrInterpolate(tech.proficiency)}</span></div>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region components/sections/TechStackSection.vue
var _sfc_setup$5 = TechStackSection_vue_vue_type_script_setup_true_lang_default.setup;
TechStackSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/TechStackSection.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var TechStackSection_default = Object.assign(TechStackSection_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsTechStackSection" });
//#endregion
//#region components/sections/CertificationsSection.vue?vue&type=script&setup=true&lang.ts
var CertificationsSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CertificationsSection",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UiSectionHeader = SectionHeader_default;
			const _component_NuxtLink = NuxtLink;
			const _component_Icon = components_default;
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "certifications",
				class: "py-20 md:py-28 relative"
			}, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">`);
			_push(ssrRenderComponent(_component_UiSectionHeader, {
				number: "07",
				label: "Verified Credentials",
				title: "Certifications & Honors",
				description: "Recognized proficiencies in web engineering, systems architecture, and database performance."
			}, null, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/certifications",
				class: "inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-400 group flex-shrink-0"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<span${_scopeId}>All Credentials</span>`);
						_push(ssrRenderComponent(_component_Icon, {
							name: "heroicons:arrow-right",
							class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
						}, null, _parent, _scopeId));
					} else return [createVNode("span", null, "All Credentials"), createVNode(_component_Icon, {
						name: "heroicons:arrow-right",
						class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"><!--[-->`);
			ssrRenderList(unref(profile).certifications, (cert) => {
				_push(`<div class="p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-sm"><div><div class="flex items-center justify-between mb-4"><div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">`);
				_push(ssrRenderComponent(_component_Icon, {
					name: cert.badgeIcon,
					class: "w-5 h-5"
				}, null, _parent));
				_push(`</div><span class="text-xs font-mono text-slate-400">${ssrInterpolate(cert.issueDate)}</span></div><h3 class="text-lg md:text-xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors">${ssrInterpolate(cert.title)}</h3><div class="mt-1 text-xs font-semibold text-slate-400">${ssrInterpolate(cert.issuer)}</div><div class="mt-4 flex flex-wrap gap-1.5"><!--[-->`);
				ssrRenderList(cert.skillsCovered, (skill) => {
					_push(`<span class="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-950 text-slate-300 border border-slate-800">${ssrInterpolate(skill)}</span>`);
				});
				_push(`<!--]--></div></div><div class="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between"><span class="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Verified Status </span>`);
				if (cert.credentialUrl) {
					_push(`<a${ssrRenderAttr("href", cert.credentialUrl)} target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-slate-400 hover:text-amber-400 flex items-center gap-1"><span>Verify</span>`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "heroicons:arrow-top-right-on-square",
						class: "w-3.5 h-3.5"
					}, null, _parent));
					_push(`</a>`);
				} else _push(`<!---->`);
				_push(`</div></div>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region components/sections/CertificationsSection.vue
var _sfc_setup$4 = CertificationsSection_vue_vue_type_script_setup_true_lang_default.setup;
CertificationsSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/CertificationsSection.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var CertificationsSection_default = Object.assign(CertificationsSection_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsCertificationsSection" });
//#endregion
//#region components/sections/BlogSection.vue?vue&type=script&setup=true&lang.ts
var BlogSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BlogSection",
	__ssrInlineRender: true,
	setup(__props) {
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
			const _component_UiSectionHeader = SectionHeader_default;
			const _component_NuxtLink = NuxtLink;
			const _component_Icon = components_default;
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "blog",
				class: "py-20 md:py-28 border-t border-slate-800/80 bg-slate-950/30 relative"
			}, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">`);
			_push(ssrRenderComponent(_component_UiSectionHeader, {
				number: "08",
				label: "Articles & Engineering Notes",
				title: "Engineering Blog",
				description: "Reflections on architecture, modern Vue 3 / Nuxt 4 patterns, zero-latency WebRTC streams, and performance ergonomics."
			}, null, _parent));
			_push(`<div class="flex items-center gap-4 flex-shrink-0">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/blog",
				class: "inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-400 group"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<span${_scopeId}>All Articles</span>`);
						_push(ssrRenderComponent(_component_Icon, {
							name: "heroicons:arrow-right",
							class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
						}, null, _parent, _scopeId));
					} else return [createVNode("span", null, "All Articles"), createVNode(_component_Icon, {
						name: "heroicons:arrow-right",
						class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8"><!--[-->`);
			ssrRenderList(posts, (post) => {
				_push(`<article class="p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-sm"><div><div class="flex items-center justify-between gap-2 mb-4 text-xs font-mono"><div class="flex flex-wrap gap-1.5"><!--[-->`);
				ssrRenderList(post.tags, (tag) => {
					_push(`<span class="px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-800"> #${ssrInterpolate(tag)}</span>`);
				});
				_push(`<!--]--></div><span class="text-slate-400 flex-shrink-0">${ssrInterpolate(post.readingTime)}</span></div><h3 class="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors leading-snug">`);
				_push(ssrRenderComponent(_component_NuxtLink, { to: `/blog/${post.slug}` }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(post.title)}`);
						else return [createTextVNode(toDisplayString(post.title), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</h3><p class="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3">${ssrInterpolate(post.description)}</p></div><div class="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400"><span>${ssrInterpolate(post.date)}</span>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: `/blog/${post.slug}`,
					class: "text-amber-500 hover:text-amber-400 font-bold flex items-center gap-1 group/btn"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<span${_scopeId}>Read article</span>`);
							_push(ssrRenderComponent(_component_Icon, {
								name: "heroicons:arrow-right",
								class: "w-3.5 h-3.5 group-btn:translate-x-1 transition-transform"
							}, null, _parent, _scopeId));
						} else return [createVNode("span", null, "Read article"), createVNode(_component_Icon, {
							name: "heroicons:arrow-right",
							class: "w-3.5 h-3.5 group-btn:translate-x-1 transition-transform"
						})];
					}),
					_: 2
				}, _parent));
				_push(`</div></article>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region components/sections/BlogSection.vue
var _sfc_setup$3 = BlogSection_vue_vue_type_script_setup_true_lang_default.setup;
BlogSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/BlogSection.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var BlogSection_default = Object.assign(BlogSection_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsBlogSection" });
//#endregion
//#region components/sections/GithubSection.vue?vue&type=script&setup=true&lang.ts
var GithubSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "GithubSection",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { data: stats, pending } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/github-stats", {
			lazy: true,
			server: false
		}, "$lCm8eue0OY")), __temp = await __temp, __restore(), __temp);
		const getColorClass = (level) => {
			switch (level) {
				case 1: return "bg-amber-950/70 border border-amber-900/50";
				case 2: return "bg-amber-700/80";
				case 3: return "bg-amber-500";
				case 4: return "bg-amber-300 shadow-[0_0_6px_rgba(251,191,36,0.6)]";
				default: return "bg-slate-800/70";
			}
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UiSectionHeader = SectionHeader_default;
			const _component_Icon = components_default;
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "github",
				class: "py-20 md:py-28 relative"
			}, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">`);
			_push(ssrRenderComponent(_component_UiSectionHeader, {
				number: "09",
				label: "Open Source & Commits",
				title: "GitHub Activity & Contributions",
				description: "Public contribution frequency, active repositories, and open source development stream."
			}, null, _parent));
			_push(`<div class="p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 shadow-xl"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80"><div class="flex items-center gap-3"><div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-400">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "logos:github-icon",
				class: "w-6 h-6"
			}, null, _parent));
			_push(`</div><div><div class="flex items-center gap-2"><span class="font-bold text-slate-100 text-lg">@${ssrInterpolate(unref(stats)?.username || "ashlyomanada")}</span>`);
			if (unref(stats)?.fallback) _push(`<span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">cached</span>`);
			else _push(`<!---->`);
			_push(`</div><div class="text-xs text-slate-400">Public commit timeline &amp; repositories</div></div></div><div class="flex flex-wrap items-center gap-3"><div class="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono"><span class="text-slate-400">Contributions:</span><span class="text-amber-400 font-bold ml-1.5">${ssrInterpolate(unref(stats)?.totalContributions || 648)}</span></div><div class="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono"><span class="text-slate-400">Current Streak:</span><span class="text-emerald-400 font-bold ml-1.5">${ssrInterpolate(unref(stats)?.currentStreak || 18)}d</span></div><a${ssrRenderAttr("href", `https://github.com/${unref(stats)?.username || "ashlyomanada"}`)} target="_blank" rel="noopener noreferrer" class="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors"><span>Follow</span>`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "heroicons:arrow-top-right-on-square",
				class: "w-3.5 h-3.5"
			}, null, _parent));
			_push(`</a></div></div><div class="mt-6"><div class="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between"><span>Annual Activity Heatmap</span><div class="flex items-center gap-1.5 text-[11px]"><span>Less</span><span class="w-2.5 h-2.5 rounded-sm bg-slate-800"></span><span class="w-2.5 h-2.5 rounded-sm bg-amber-900/60"></span><span class="w-2.5 h-2.5 rounded-sm bg-amber-700/80"></span><span class="w-2.5 h-2.5 rounded-sm bg-amber-500"></span><span class="w-2.5 h-2.5 rounded-sm bg-amber-300"></span><span>More</span></div></div>`);
			if (unref(pending)) _push(`<div class="h-28 rounded-xl bg-slate-950 animate-pulse flex items-center justify-center text-xs text-slate-500 font-mono"> Loading GitHub telemetry... </div>`);
			else {
				_push(`<div class="overflow-x-auto pb-2"><div class="inline-flex gap-1 min-w-[700px]"><!--[-->`);
				ssrRenderList(unref(stats)?.weeks, (week, wIdx) => {
					_push(`<div class="flex flex-col gap-1"><!--[-->`);
					ssrRenderList(week.days, (day, dIdx) => {
						_push(`<div class="${ssrRenderClass([getColorClass(day.level), "w-2.5 h-2.5 rounded-xs transition-transform hover:scale-125"])}"${ssrRenderAttr("title", `${day.date}: ${day.count} contributions`)}></div>`);
					});
					_push(`<!--]--></div>`);
				});
				_push(`<!--]--></div></div>`);
			}
			_push(`</div><div class="mt-8 pt-6 border-t border-slate-800/80"><h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">Highlighted Repositories</h4><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><!--[-->`);
			ssrRenderList(unref(stats)?.topRepos, (repo) => {
				_push(`<div class="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-amber-500/40 transition-colors flex flex-col justify-between group"><div><div class="flex items-center justify-between mb-2"><a${ssrRenderAttr("href", repo.url)} target="_blank" rel="noopener noreferrer" class="font-mono text-sm font-bold text-slate-200 group-hover:text-amber-400 transition-colors flex items-center gap-1.5"><span>${ssrInterpolate(repo.name)}</span>`);
				_push(ssrRenderComponent(_component_Icon, {
					name: "heroicons:arrow-up-right",
					class: "w-3.5 h-3.5 opacity-60"
				}, null, _parent));
				_push(`</a></div><p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">${ssrInterpolate(repo.description)}</p></div><div class="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-400"><span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-amber-400"></span> ${ssrInterpolate(repo.language)}</span><span class="flex items-center gap-2"><span class="flex items-center gap-1">★ ${ssrInterpolate(repo.stars)}</span><span class="flex items-center gap-1">⑂ ${ssrInterpolate(repo.forks)}</span></span></div></div>`);
			});
			_push(`<!--]--></div></div></div></div></section>`);
		};
	}
});
//#endregion
//#region components/sections/GithubSection.vue
var _sfc_setup$2 = GithubSection_vue_vue_type_script_setup_true_lang_default.setup;
GithubSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/GithubSection.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var GithubSection_default = Object.assign(GithubSection_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsGithubSection" });
//#endregion
//#region components/sections/ContactSection.vue?vue&type=script&setup=true&lang.ts
var ContactSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ContactSection",
	__ssrInlineRender: true,
	emits: ["toast"],
	setup(__props, { emit: __emit }) {
		const form = reactive({
			name: "",
			email: "",
			message: "",
			honeypot: ""
		});
		const errors = reactive({
			name: "",
			email: "",
			message: ""
		});
		const isSubmitting = ref(false);
		z.object({
			name: z.string().min(2, "Name must be at least 2 characters"),
			email: z.string().email("Please enter a valid email address"),
			message: z.string().min(10, "Message must be at least 10 characters"),
			honeypot: z.string().max(0).optional()
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UiSectionHeader = SectionHeader_default;
			const _component_Icon = components_default;
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "contact",
				class: "py-20 md:py-28 border-t border-slate-800/80 bg-slate-950/40 relative"
			}, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">`);
			_push(ssrRenderComponent(_component_UiSectionHeader, {
				number: "10",
				label: "Direct Inquiry",
				title: "Get in Touch",
				description: "Whether you have an upcoming project, engineering role, or technical challenge, my inbox is always open."
			}, null, _parent));
			_push(`<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"><div class="lg:col-span-5 space-y-6"><div class="p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 space-y-6"><h3 class="text-xl font-bold text-slate-100"> Let&#39;s build something remarkable together. </h3><p class="text-sm text-slate-400 leading-relaxed"> Available for full-time frontend &amp; full-stack roles, contract architecture, and high-impact advisory work. </p><div class="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2"><div class="flex items-center gap-2 text-xs font-mono text-amber-500 font-semibold">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "heroicons:map-pin",
				class: "w-4 h-4"
			}, null, _parent));
			_push(`<span>Location &amp; Timezone</span></div><div class="text-sm font-bold text-slate-200">${ssrInterpolate(unref(profile).location)}</div><div class="text-xs text-slate-400 font-mono">${ssrInterpolate(unref(profile).timezone)} • Remote collaboration ready </div></div><div class="space-y-2"><span class="text-xs font-mono uppercase tracking-wider text-slate-400">Primary Contact:</span><button type="button" class="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 text-slate-200 transition-all cursor-pointer group"><div class="flex items-center gap-2.5">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "heroicons:envelope",
				class: "w-5 h-5 text-amber-400"
			}, null, _parent));
			_push(`<span class="text-xs sm:text-sm font-mono font-medium">${ssrInterpolate(unref(profile).socials.email)}</span></div><span class="text-xs font-mono text-amber-400 group-hover:underline flex items-center gap-1"><span>Copy</span>`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "heroicons:clipboard-document",
				class: "w-4 h-4"
			}, null, _parent));
			_push(`</span></button></div><div class="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400"><span>Find me online:</span><div class="flex items-center gap-2"><a${ssrRenderAttr("href", unref(profile).socials.github)} target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-slate-950 hover:text-amber-400 border border-slate-800 transition-colors">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "logos:github-icon",
				class: "w-4 h-4"
			}, null, _parent));
			_push(`</a><a${ssrRenderAttr("href", unref(profile).socials.linkedin)} target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-slate-950 hover:text-amber-400 border border-slate-800 transition-colors">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "logos:linkedin-icon",
				class: "w-4 h-4"
			}, null, _parent));
			_push(`</a></div></div></div></div><div class="lg:col-span-7"><form class="p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 space-y-5"><div class="hidden" aria-hidden="true"><label for="honeypot">Leave blank</label><input id="honeypot"${ssrRenderAttr("value", unref(form).honeypot)} type="text" tabindex="-1" autocomplete="off"></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-5"><div><label for="name" class="block text-xs font-mono text-slate-300 font-semibold mb-1.5"> Your Name <span class="text-amber-500">*</span></label><input id="name"${ssrRenderAttr("value", unref(form).name)} type="text" placeholder="Alex Rivera" class="${ssrRenderClass([unref(errors).name ? "border-rose-500 focus:border-rose-400" : "border-slate-800 focus:border-amber-500/50", "w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-colors"])}"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""}>`);
			if (unref(errors).name) _push(`<span class="text-xs text-rose-400 mt-1 block font-mono">${ssrInterpolate(unref(errors).name)}</span>`);
			else _push(`<!---->`);
			_push(`</div><div><label for="email" class="block text-xs font-mono text-slate-300 font-semibold mb-1.5"> Email Address <span class="text-amber-500">*</span></label><input id="email"${ssrRenderAttr("value", unref(form).email)} type="email" placeholder="alex@company.com" class="${ssrRenderClass([unref(errors).email ? "border-rose-500 focus:border-rose-400" : "border-slate-800 focus:border-amber-500/50", "w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-colors"])}"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""}>`);
			if (unref(errors).email) _push(`<span class="text-xs text-rose-400 mt-1 block font-mono">${ssrInterpolate(unref(errors).email)}</span>`);
			else _push(`<!---->`);
			_push(`</div></div><div><label for="message" class="block text-xs font-mono text-slate-300 font-semibold mb-1.5"> Message / Project Overview <span class="text-amber-500">*</span></label><textarea id="message" rows="5" placeholder="Hi Ashly, I&#39;d like to discuss an opportunity or project..." class="${ssrRenderClass([unref(errors).message ? "border-rose-500 focus:border-rose-400" : "border-slate-800 focus:border-amber-500/50", "w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-colors resize-none"])}"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""}>${ssrInterpolate(unref(form).message)}</textarea>`);
			if (unref(errors).message) _push(`<span class="text-xs text-rose-400 mt-1 block font-mono">${ssrInterpolate(unref(errors).message)}</span>`);
			else _push(`<!---->`);
			_push(`</div><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2"><div class="text-xs text-slate-400 flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-400"></span><span>Typically replies within 24 hours</span></div><button type="submit" class="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 cursor-pointer"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""}>`);
			if (unref(isSubmitting)) _push(`<span>Transmitting...</span>`);
			else _push(`<span>Send Message</span>`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "heroicons:paper-airplane",
				class: "w-4 h-4"
			}, null, _parent));
			_push(`</button></div></form></div></div></div></section>`);
		};
	}
});
//#endregion
//#region components/sections/ContactSection.vue
var _sfc_setup$1 = ContactSection_vue_vue_type_script_setup_true_lang_default.setup;
ContactSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/ContactSection.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ContactSection_default = Object.assign(ContactSection_vue_vue_type_script_setup_true_lang_default, { __name: "SectionsContactSection" });
//#endregion
//#region pages/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	emits: ["toast"],
	setup(__props, { emit: __emit }) {
		useSeoMeta({
			title: `${profile.name} — ${profile.title}`,
			description: profile.bio.short,
			ogTitle: `${profile.name} — Full-Stack Developer Portfolio`,
			ogDescription: profile.bio.valueStatement,
			ogImage: profile.avatar,
			twitterCard: "summary_large_image"
		});
		useSchemaOrg([definePerson({
			name: profile.name,
			jobTitle: profile.title,
			url: "https://ashlyomanada.dev",
			sameAs: [profile.socials.github, profile.socials.linkedin],
			knowsAbout: [
				"Vue.js",
				"Nuxt",
				"TypeScript",
				"Node.js",
				"PostgreSQL",
				"WebRTC"
			]
		}), defineWebSite({
			name: `${profile.name} — Portfolio`,
			url: "https://ashlyomanada.dev"
		})]);
		const emit = __emit;
		const handleToast = (msg) => {
			emit("toast", msg);
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_SectionsHeroSection = HeroSection_default;
			const _component_SectionsStatsStrip = StatsStrip_default;
			const _component_SectionsExperienceSection = ExperienceSection_default;
			const _component_SectionsEducationSection = EducationSection_default;
			const _component_SectionsFeaturedProjectsSection = FeaturedProjectsSection_default;
			const _component_SectionsTechStackSection = TechStackSection_default;
			const _component_SectionsCertificationsSection = CertificationsSection_default;
			const _component_SectionsBlogSection = BlogSection_default;
			const _component_SectionsGithubSection = GithubSection_default;
			const _component_SectionsContactSection = ContactSection_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_SectionsHeroSection, { onToast: handleToast }, null, _parent));
			_push(ssrRenderComponent(_component_SectionsStatsStrip, null, null, _parent));
			_push(ssrRenderComponent(_component_SectionsExperienceSection, null, null, _parent));
			_push(ssrRenderComponent(_component_SectionsEducationSection, null, null, _parent));
			_push(ssrRenderComponent(_component_SectionsFeaturedProjectsSection, null, null, _parent));
			_push(ssrRenderComponent(_component_SectionsTechStackSection, null, null, _parent));
			_push(ssrRenderComponent(_component_SectionsCertificationsSection, null, null, _parent));
			_push(ssrRenderComponent(_component_SectionsBlogSection, null, null, _parent));
			_push(ssrRenderComponent(_component_SectionsGithubSection, null, null, _parent));
			_push(ssrRenderComponent(_component_SectionsContactSection, { onToast: handleToast }, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = index_vue_vue_type_script_setup_true_lang_default;

export { pages_default as default };
//# sourceMappingURL=pages-xOXiG7zs.mjs.map
