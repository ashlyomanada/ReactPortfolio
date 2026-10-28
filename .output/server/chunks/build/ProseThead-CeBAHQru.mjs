import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-DjkACiAr.mjs';
import { useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';

// node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<thead${ssrRenderAttrs(_attrs)}>`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</thead>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ProseThead_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "ProseThead" });

export { ProseThead_default as default };
//# sourceMappingURL=ProseThead-CeBAHQru.mjs.map
