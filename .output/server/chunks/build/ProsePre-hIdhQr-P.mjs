import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';

//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProsePre.vue
var _sfc_main = {
	__name: "ProsePre",
	__ssrInlineRender: true,
	props: {
		code: {
			type: String,
			default: ""
		},
		language: {
			type: String,
			default: null
		},
		filename: {
			type: String,
			default: null
		},
		highlights: {
			type: Array,
			default: () => []
		},
		meta: {
			type: String,
			default: null
		},
		class: {
			type: String,
			default: null
		}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<pre${ssrRenderAttrs(mergeProps({ class: _ctx.$props.class }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</pre>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProsePre.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProsePre-hIdhQr-P.mjs.map
