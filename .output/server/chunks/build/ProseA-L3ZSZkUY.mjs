import { N as NuxtLink } from '../virtual/entry.mjs';
import { mergeProps, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
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

//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue
var _sfc_main = {
	__name: "ProseA",
	__ssrInlineRender: true,
	props: {
		href: {
			type: String,
			default: ""
		},
		target: {
			type: String,
			default: void 0,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(NuxtLink, mergeProps({
				href: props.href,
				target: props.target
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProseA-L3ZSZkUY.mjs.map
