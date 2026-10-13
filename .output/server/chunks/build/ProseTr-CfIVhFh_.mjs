import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';

//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<tr${ssrRenderAttrs(_attrs)}>`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</tr>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ProseTr_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "ProseTr" });

export { ProseTr_default as default };
//# sourceMappingURL=ProseTr-CfIVhFh_.mjs.map
