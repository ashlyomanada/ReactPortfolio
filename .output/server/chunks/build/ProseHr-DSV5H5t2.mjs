import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-DjkACiAr.mjs';
import { useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';

// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<hr${ssrRenderAttrs(_attrs)}>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ProseHr_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "ProseHr" });

export { ProseHr_default as default };
//# sourceMappingURL=ProseHr-DSV5H5t2.mjs.map
