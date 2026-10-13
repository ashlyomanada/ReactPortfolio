import { unref, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';

//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue
var _sfc_main = {
	__name: "ProseScript",
	__ssrInlineRender: true,
	props: { src: {
		type: String,
		default: ""
	} },
	setup(__props) {
		const isDev = false;
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(isDev)) _push(`<div${ssrRenderAttrs(_attrs)}> Rendering the <code>script</code> element is dangerous and is disabled by default. Consider implementing your own <code>ProseScript</code> element to have control over script rendering. </div>`);
			else _push(`<!---->`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProseScript-BNP4X_ez.mjs.map
