import { b as useSeoMeta, p as profile, d as useSchemaOrg, e as definePerson, f as defineWebSite, s as ssrRenderList$2, g as sections } from '../virtual/entry.mjs';
import { defineComponent, createVNode, resolveDynamicComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderVNode } from 'vue/server-renderer';
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

// pages/index.vue?vue&type=script&setup=true&lang.ts
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
			ogImageWidth: 1200,
			ogImageHeight: 630
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
			_push(`<div${ssrRenderAttrs(_attrs)}><!--[-->`);
			ssrRenderList$2(unref(sections), (section, index) => {
				ssrRenderVNode(_push, createVNode(resolveDynamicComponent(section.component), {
					key: section.id,
					"section-id": section.id,
					"section-number": section.number(index),
					"section-label": section.label,
					onToast: handleToast
				}, null), _parent);
			});
			_push(`<!--]--></div>`);
		};
	}
});
// pages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = index_vue_vue_type_script_setup_true_lang_default;

export { pages_default as default };
//# sourceMappingURL=pages-Bv1bvTsy.mjs.map
