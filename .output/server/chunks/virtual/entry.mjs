import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { createRequire } from 'node:module';
import { Buffer as Buffer$1 } from 'node:buffer';
import Bt from 'node:http';
import zs from 'node:https';
import st from 'node:zlib';
import me, { PassThrough, pipeline } from 'node:stream';
import { promisify, deprecate, types } from 'node:util';
import { format as format$1 } from 'node:url';
import { isIP } from 'node:net';
import { promises, statSync, createReadStream } from 'node:fs';
import { basename } from 'node:path';
import { shallowReactive, reactive, effectScope, getCurrentScope, hasInjectionContext, getCurrentInstance, inject, toRef, defineComponent, computed, h, onServerPrefetch, ref, shallowRef, watch, isRef, toValue, nextTick, unref, queuePostFlushCb, createElementBlock, provide, cloneVNode, createApp, onErrorCaptured, createVNode, resolveDynamicComponent, mergeProps, withCtx, createTextVNode, toDisplayString, isVNode, createCommentVNode, resolveComponent, isReadonly, defineAsyncComponent, useSSRContext, Suspense, Fragment, isShallow, isReactive, toRaw } from 'vue';
import { aD as baseURL, p as publicAssetsURL } from '../nitro/nitro.mjs';
import { START_LOCATION, RouterView, createMemoryHistory, createRouter } from 'vue-router';
import { createHash } from 'node:crypto';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderTeleport } from 'vue/server-renderer';

//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	__defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __require = /* #__PURE__ */ (() => createRequire(globalThis._importMeta_.url))();
//#endregion
//#region node_modules/.pnpm/node-fetch-native@1.6.7/node_modules/node-fetch-native/dist/shared/node-fetch-native.DfbY2q-x.mjs
var t = Object.defineProperty;
var o$1 = (e, l) => t(e, "name", {
	value: l,
	configurable: true
});
var n$1 = typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : typeof self < "u" ? self : {};
function f(e) {
	return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
o$1(f, "getDefaultExportFromCjs");
//#endregion
//#region node_modules/.pnpm/node-fetch-native@1.6.7/node_modules/node-fetch-native/dist/node.mjs
var Os = Object.defineProperty;
var fi = (i) => {
	throw TypeError(i);
};
var n$2 = (i, o) => Os(i, "name", {
	value: o,
	configurable: true
});
var ci = (i, o, a) => o.has(i) || fi("Cannot " + a);
var O = (i, o, a) => (ci(i, o, "read from private field"), a ? a.call(i) : o.get(i));
var be = (i, o, a) => o.has(i) ? fi("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(i) : o.set(i, a);
var X = (i, o, a, f) => (ci(i, o, "write to private field"), o.set(i, a), a);
var ve;
var zt;
var bt;
var Cr;
var ze;
var It;
var Ft;
var mt;
var ee;
var yt;
var He;
var Ve;
var gt;
function Us(i) {
	if (!/^data:/i.test(i)) throw new TypeError("`uri` does not appear to be a Data URI (must begin with \"data:\")");
	i = i.replace(/\r?\n/g, "");
	const o = i.indexOf(",");
	if (o === -1 || o <= 4) throw new TypeError("malformed data: URI");
	const a = i.substring(5, o).split(";");
	let f = "", l = false;
	const p = a[0] || "text/plain";
	let h = p;
	for (let A = 1; A < a.length; A++) a[A] === "base64" ? l = true : a[A] && (h += `;${a[A]}`, a[A].indexOf("charset=") === 0 && (f = a[A].substring(8)));
	!a[0] && !f.length && (h += ";charset=US-ASCII", f = "US-ASCII");
	const S = l ? "base64" : "ascii", v = unescape(i.substring(o + 1)), w = Buffer.from(v, S);
	return w.type = p, w.typeFull = h, w.charset = f, w;
}
n$2(Us, "dataUriToBuffer");
var pi = {};
var kt = { exports: {} };
/**
* @license
* web-streams-polyfill v3.3.3
* Copyright 2024 Mattias Buelens, Diwank Singh Tomer and other contributors.
* This code is released under the MIT license.
* SPDX-License-Identifier: MIT
*/ var xs = kt.exports;
var bi;
function Ns() {
	return bi || (bi = 1, function(i, o) {
		(function(a, f) {
			f(o);
		})(xs, function(a) {
			function f() {}
			n$2(f, "noop");
			function l(e) {
				return typeof e == "object" && e !== null || typeof e == "function";
			}
			n$2(l, "typeIsObject");
			const p = f;
			function h(e, t) {
				try {
					Object.defineProperty(e, "name", {
						value: t,
						configurable: !0
					});
				} catch {}
			}
			n$2(h, "setFunctionName");
			const S = Promise, v = Promise.prototype.then, w = Promise.reject.bind(S);
			function A(e) {
				return new S(e);
			}
			n$2(A, "newPromise");
			function T(e) {
				return A((t) => t(e));
			}
			n$2(T, "promiseResolvedWith");
			function b(e) {
				return w(e);
			}
			n$2(b, "promiseRejectedWith");
			function q(e, t, r) {
				return v.call(e, t, r);
			}
			n$2(q, "PerformPromiseThen");
			function g(e, t, r) {
				q(q(e, t, r), void 0, p);
			}
			n$2(g, "uponPromise");
			function V(e, t) {
				g(e, t);
			}
			n$2(V, "uponFulfillment");
			function I(e, t) {
				g(e, void 0, t);
			}
			n$2(I, "uponRejection");
			function F(e, t, r) {
				return q(e, t, r);
			}
			n$2(F, "transformPromiseWith");
			function Q(e) {
				q(e, void 0, p);
			}
			n$2(Q, "setPromiseIsHandledToTrue");
			let ge = n$2((e) => {
				if (typeof queueMicrotask == "function") ge = queueMicrotask;
				else {
					const t = T(void 0);
					ge = n$2((r) => q(t, r), "_queueMicrotask");
				}
				return ge(e);
			}, "_queueMicrotask");
			function z(e, t, r) {
				if (typeof e != "function") throw new TypeError("Argument is not a function");
				return Function.prototype.apply.call(e, t, r);
			}
			n$2(z, "reflectCall");
			function j(e, t, r) {
				try {
					return T(z(e, t, r));
				} catch (s) {
					return b(s);
				}
			}
			n$2(j, "promiseCall");
			const U = 16384, bn = class bn {
				constructor() {
					this._cursor = 0, this._size = 0, this._front = {
						_elements: [],
						_next: void 0
					}, this._back = this._front, this._cursor = 0, this._size = 0;
				}
				get length() {
					return this._size;
				}
				push(t) {
					const r = this._back;
					let s = r;
					r._elements.length === 16383 && (s = {
						_elements: [],
						_next: void 0
					}), r._elements.push(t), s !== r && (this._back = s, r._next = s), ++this._size;
				}
				shift() {
					const t = this._front;
					let r = t;
					const s = this._cursor;
					let u = s + 1;
					const c = t._elements, d = c[s];
					return u === U && (r = t._next, u = 0), --this._size, this._cursor = u, t !== r && (this._front = r), c[s] = void 0, d;
				}
				forEach(t) {
					let r = this._cursor, s = this._front, u = s._elements;
					for (; (r !== u.length || s._next !== void 0) && !(r === u.length && (s = s._next, u = s._elements, r = 0, u.length === 0));) t(u[r]), ++r;
				}
				peek() {
					const t = this._front, r = this._cursor;
					return t._elements[r];
				}
			};
			n$2(bn, "SimpleQueue");
			let D = bn;
			const jt = Symbol("[[AbortSteps]]"), Qn = Symbol("[[ErrorSteps]]"), Ar = Symbol("[[CancelSteps]]"), Br = Symbol("[[PullSteps]]"), kr = Symbol("[[ReleaseSteps]]");
			function Yn(e, t) {
				e._ownerReadableStream = t, t._reader = e, t._state === "readable" ? qr(e) : t._state === "closed" ? xi(e) : Gn(e, t._storedError);
			}
			n$2(Yn, "ReadableStreamReaderGenericInitialize");
			function Wr(e, t) {
				const r = e._ownerReadableStream;
				return ie(r, t);
			}
			n$2(Wr, "ReadableStreamReaderGenericCancel");
			function _e(e) {
				const t = e._ownerReadableStream;
				t._state === "readable" ? Or(e, /* @__PURE__ */ new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")) : Ni(e, /* @__PURE__ */ new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")), t._readableStreamController[kr](), t._reader = void 0, e._ownerReadableStream = void 0;
			}
			n$2(_e, "ReadableStreamReaderGenericRelease");
			function Lt(e) {
				return /* @__PURE__ */ new TypeError("Cannot " + e + " a stream using a released reader");
			}
			n$2(Lt, "readerLockException");
			function qr(e) {
				e._closedPromise = A((t, r) => {
					e._closedPromise_resolve = t, e._closedPromise_reject = r;
				});
			}
			n$2(qr, "defaultReaderClosedPromiseInitialize");
			function Gn(e, t) {
				qr(e), Or(e, t);
			}
			n$2(Gn, "defaultReaderClosedPromiseInitializeAsRejected");
			function xi(e) {
				qr(e), Zn(e);
			}
			n$2(xi, "defaultReaderClosedPromiseInitializeAsResolved");
			function Or(e, t) {
				e._closedPromise_reject !== void 0 && (Q(e._closedPromise), e._closedPromise_reject(t), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0);
			}
			n$2(Or, "defaultReaderClosedPromiseReject");
			function Ni(e, t) {
				Gn(e, t);
			}
			n$2(Ni, "defaultReaderClosedPromiseResetToRejected");
			function Zn(e) {
				e._closedPromise_resolve !== void 0 && (e._closedPromise_resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0);
			}
			n$2(Zn, "defaultReaderClosedPromiseResolve");
			const Kn = Number.isFinite || function(e) {
				return typeof e == "number" && isFinite(e);
			}, Hi = Math.trunc || function(e) {
				return e < 0 ? Math.ceil(e) : Math.floor(e);
			};
			function Vi(e) {
				return typeof e == "object" || typeof e == "function";
			}
			n$2(Vi, "isDictionary");
			function ue(e, t) {
				if (e !== void 0 && !Vi(e)) throw new TypeError(`${t} is not an object.`);
			}
			n$2(ue, "assertDictionary");
			function Z(e, t) {
				if (typeof e != "function") throw new TypeError(`${t} is not a function.`);
			}
			n$2(Z, "assertFunction");
			function Qi(e) {
				return typeof e == "object" && e !== null || typeof e == "function";
			}
			n$2(Qi, "isObject");
			function Jn(e, t) {
				if (!Qi(e)) throw new TypeError(`${t} is not an object.`);
			}
			n$2(Jn, "assertObject");
			function Se(e, t, r) {
				if (e === void 0) throw new TypeError(`Parameter ${t} is required in '${r}'.`);
			}
			n$2(Se, "assertRequiredArgument");
			function zr(e, t, r) {
				if (e === void 0) throw new TypeError(`${t} is required in '${r}'.`);
			}
			n$2(zr, "assertRequiredField");
			function Ir(e) {
				return Number(e);
			}
			n$2(Ir, "convertUnrestrictedDouble");
			function Xn(e) {
				return e === 0 ? 0 : e;
			}
			n$2(Xn, "censorNegativeZero");
			function Yi(e) {
				return Xn(Hi(e));
			}
			n$2(Yi, "integerPart");
			function Fr(e, t) {
				const s = Number.MAX_SAFE_INTEGER;
				let u = Number(e);
				if (u = Xn(u), !Kn(u)) throw new TypeError(`${t} is not a finite number`);
				if (u = Yi(u), u < 0 || u > s) throw new TypeError(`${t} is outside the accepted range of 0 to ${s}, inclusive`);
				return !Kn(u) || u === 0 ? 0 : u;
			}
			n$2(Fr, "convertUnsignedLongLongWithEnforceRange");
			function jr(e, t) {
				if (!We(e)) throw new TypeError(`${t} is not a ReadableStream.`);
			}
			n$2(jr, "assertReadableStream");
			function Qe(e) {
				return new fe(e);
			}
			n$2(Qe, "AcquireReadableStreamDefaultReader");
			function eo(e, t) {
				e._reader._readRequests.push(t);
			}
			n$2(eo, "ReadableStreamAddReadRequest");
			function Lr(e, t, r) {
				const u = e._reader._readRequests.shift();
				r ? u._closeSteps() : u._chunkSteps(t);
			}
			n$2(Lr, "ReadableStreamFulfillReadRequest");
			function $t(e) {
				return e._reader._readRequests.length;
			}
			n$2($t, "ReadableStreamGetNumReadRequests");
			function to(e) {
				const t = e._reader;
				return !(t === void 0 || !Ee(t));
			}
			n$2(to, "ReadableStreamHasDefaultReader");
			const mn = class mn {
				constructor(t) {
					if (Se(t, 1, "ReadableStreamDefaultReader"), jr(t, "First parameter"), qe(t)) throw new TypeError("This stream has already been locked for exclusive reading by another reader");
					Yn(this, t), this._readRequests = new D();
				}
				get closed() {
					return Ee(this) ? this._closedPromise : b(Dt("closed"));
				}
				cancel(t = void 0) {
					return Ee(this) ? this._ownerReadableStream === void 0 ? b(Lt("cancel")) : Wr(this, t) : b(Dt("cancel"));
				}
				read() {
					if (!Ee(this)) return b(Dt("read"));
					if (this._ownerReadableStream === void 0) return b(Lt("read from"));
					let t, r;
					const s = A((c, d) => {
						t = c, r = d;
					});
					return _t(this, {
						_chunkSteps: n$2((c) => t({
							value: c,
							done: false
						}), "_chunkSteps"),
						_closeSteps: n$2(() => t({
							value: void 0,
							done: true
						}), "_closeSteps"),
						_errorSteps: n$2((c) => r(c), "_errorSteps")
					}), s;
				}
				releaseLock() {
					if (!Ee(this)) throw Dt("releaseLock");
					this._ownerReadableStream !== void 0 && Gi(this);
				}
			};
			n$2(mn, "ReadableStreamDefaultReader");
			let fe = mn;
			Object.defineProperties(fe.prototype, {
				cancel: { enumerable: true },
				read: { enumerable: true },
				releaseLock: { enumerable: true },
				closed: { enumerable: true }
			}), h(fe.prototype.cancel, "cancel"), h(fe.prototype.read, "read"), h(fe.prototype.releaseLock, "releaseLock"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(fe.prototype, Symbol.toStringTag, {
				value: "ReadableStreamDefaultReader",
				configurable: true
			});
			function Ee(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_readRequests") ? false : e instanceof fe;
			}
			n$2(Ee, "IsReadableStreamDefaultReader");
			function _t(e, t) {
				const r = e._ownerReadableStream;
				r._disturbed = true, r._state === "closed" ? t._closeSteps() : r._state === "errored" ? t._errorSteps(r._storedError) : r._readableStreamController[Br](t);
			}
			n$2(_t, "ReadableStreamDefaultReaderRead");
			function Gi(e) {
				_e(e);
				ro(e, /* @__PURE__ */ new TypeError("Reader was released"));
			}
			n$2(Gi, "ReadableStreamDefaultReaderRelease");
			function ro(e, t) {
				const r = e._readRequests;
				e._readRequests = new D(), r.forEach((s) => {
					s._errorSteps(t);
				});
			}
			n$2(ro, "ReadableStreamDefaultReaderErrorReadRequests");
			function Dt(e) {
				return /* @__PURE__ */ new TypeError(`ReadableStreamDefaultReader.prototype.${e} can only be used on a ReadableStreamDefaultReader`);
			}
			n$2(Dt, "defaultReaderBrandCheckException");
			const Zi = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {}).prototype), yn = class yn {
				constructor(t, r) {
					this._ongoingPromise = void 0, this._isFinished = false, this._reader = t, this._preventCancel = r;
				}
				next() {
					const t = n$2(() => this._nextSteps(), "nextSteps");
					return this._ongoingPromise = this._ongoingPromise ? F(this._ongoingPromise, t, t) : t(), this._ongoingPromise;
				}
				return(t) {
					const r = n$2(() => this._returnSteps(t), "returnSteps");
					return this._ongoingPromise ? F(this._ongoingPromise, r, r) : r();
				}
				_nextSteps() {
					if (this._isFinished) return Promise.resolve({
						value: void 0,
						done: true
					});
					const t = this._reader;
					let r, s;
					const u = A((d, m) => {
						r = d, s = m;
					});
					return _t(t, {
						_chunkSteps: n$2((d) => {
							this._ongoingPromise = void 0, ge(() => r({
								value: d,
								done: false
							}));
						}, "_chunkSteps"),
						_closeSteps: n$2(() => {
							this._ongoingPromise = void 0, this._isFinished = true, _e(t), r({
								value: void 0,
								done: true
							});
						}, "_closeSteps"),
						_errorSteps: n$2((d) => {
							this._ongoingPromise = void 0, this._isFinished = true, _e(t), s(d);
						}, "_errorSteps")
					}), u;
				}
				_returnSteps(t) {
					if (this._isFinished) return Promise.resolve({
						value: t,
						done: true
					});
					this._isFinished = true;
					const r = this._reader;
					if (!this._preventCancel) {
						const s = Wr(r, t);
						return _e(r), F(s, () => ({
							value: t,
							done: true
						}));
					}
					return _e(r), T({
						value: t,
						done: true
					});
				}
			};
			n$2(yn, "ReadableStreamAsyncIteratorImpl");
			let Mt = yn;
			const no = {
				next() {
					return oo(this) ? this._asyncIteratorImpl.next() : b(io("next"));
				},
				return(e) {
					return oo(this) ? this._asyncIteratorImpl.return(e) : b(io("return"));
				}
			};
			Object.setPrototypeOf(no, Zi);
			function Ki(e, t) {
				const r = Qe(e), s = new Mt(r, t), u = Object.create(no);
				return u._asyncIteratorImpl = s, u;
			}
			n$2(Ki, "AcquireReadableStreamAsyncIterator");
			function oo(e) {
				if (!l(e) || !Object.prototype.hasOwnProperty.call(e, "_asyncIteratorImpl")) return false;
				try {
					return e._asyncIteratorImpl instanceof Mt;
				} catch {
					return false;
				}
			}
			n$2(oo, "IsReadableStreamAsyncIterator");
			function io(e) {
				return /* @__PURE__ */ new TypeError(`ReadableStreamAsyncIterator.${e} can only be used on a ReadableSteamAsyncIterator`);
			}
			n$2(io, "streamAsyncIteratorBrandCheckException");
			const ao = Number.isNaN || function(e) {
				return e !== e;
			};
			var $r, Dr, Mr;
			function St(e) {
				return e.slice();
			}
			n$2(St, "CreateArrayFromList");
			function so(e, t, r, s, u) {
				new Uint8Array(e).set(new Uint8Array(r, s, u), t);
			}
			n$2(so, "CopyDataBlockBytes");
			let we = n$2((e) => (typeof e.transfer == "function" ? we = n$2((t) => t.transfer(), "TransferArrayBuffer") : typeof structuredClone == "function" ? we = n$2((t) => structuredClone(t, { transfer: [t] }), "TransferArrayBuffer") : we = n$2((t) => t, "TransferArrayBuffer"), we(e)), "TransferArrayBuffer"), Ae = n$2((e) => (typeof e.detached == "boolean" ? Ae = n$2((t) => t.detached, "IsDetachedBuffer") : Ae = n$2((t) => t.byteLength === 0, "IsDetachedBuffer"), Ae(e)), "IsDetachedBuffer");
			function lo(e, t, r) {
				if (e.slice) return e.slice(t, r);
				const s = r - t, u = new ArrayBuffer(s);
				return so(u, 0, e, t, s), u;
			}
			n$2(lo, "ArrayBufferSlice");
			function Ut(e, t) {
				const r = e[t];
				if (r != null) {
					if (typeof r != "function") throw new TypeError(`${String(t)} is not a function`);
					return r;
				}
			}
			n$2(Ut, "GetMethod");
			function Ji(e) {
				const t = { [Symbol.iterator]: () => e.iterator }, r = async function* () {
					return yield* t;
				}();
				return {
					iterator: r,
					nextMethod: r.next,
					done: false
				};
			}
			n$2(Ji, "CreateAsyncFromSyncIterator");
			const Ur = (Mr = ($r = Symbol.asyncIterator) !== null && $r !== void 0 ? $r : (Dr = Symbol.for) === null || Dr === void 0 ? void 0 : Dr.call(Symbol, "Symbol.asyncIterator")) !== null && Mr !== void 0 ? Mr : "@@asyncIterator";
			function uo(e, t = "sync", r) {
				if (r === void 0) if (t === "async") {
					if (r = Ut(e, Ur), r === void 0) return Ji(uo(e, "sync", Ut(e, Symbol.iterator)));
				} else r = Ut(e, Symbol.iterator);
				if (r === void 0) throw new TypeError("The object is not iterable");
				const s = z(r, e, []);
				if (!l(s)) throw new TypeError("The iterator method must return an object");
				return {
					iterator: s,
					nextMethod: s.next,
					done: false
				};
			}
			n$2(uo, "GetIterator");
			function Xi(e) {
				const t = z(e.nextMethod, e.iterator, []);
				if (!l(t)) throw new TypeError("The iterator.next() method must return an object");
				return t;
			}
			n$2(Xi, "IteratorNext");
			function ea(e) {
				return !!e.done;
			}
			n$2(ea, "IteratorComplete");
			function ta(e) {
				return e.value;
			}
			n$2(ta, "IteratorValue");
			function ra(e) {
				return !(typeof e != "number" || ao(e) || e < 0);
			}
			n$2(ra, "IsNonNegativeNumber");
			function fo(e) {
				const t = lo(e.buffer, e.byteOffset, e.byteOffset + e.byteLength);
				return new Uint8Array(t);
			}
			n$2(fo, "CloneAsUint8Array");
			function xr(e) {
				const t = e._queue.shift();
				return e._queueTotalSize -= t.size, e._queueTotalSize < 0 && (e._queueTotalSize = 0), t.value;
			}
			n$2(xr, "DequeueValue");
			function Nr(e, t, r) {
				if (!ra(r) || r === 1 / 0) throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
				e._queue.push({
					value: t,
					size: r
				}), e._queueTotalSize += r;
			}
			n$2(Nr, "EnqueueValueWithSize");
			function na(e) {
				return e._queue.peek().value;
			}
			n$2(na, "PeekQueueValue");
			function Be(e) {
				e._queue = new D(), e._queueTotalSize = 0;
			}
			n$2(Be, "ResetQueue");
			function co(e) {
				return e === DataView;
			}
			n$2(co, "isDataViewConstructor");
			function oa(e) {
				return co(e.constructor);
			}
			n$2(oa, "isDataView");
			function ia(e) {
				return co(e) ? 1 : e.BYTES_PER_ELEMENT;
			}
			n$2(ia, "arrayBufferViewElementSize");
			const gn = class gn {
				constructor() {
					throw new TypeError("Illegal constructor");
				}
				get view() {
					if (!Hr(this)) throw Zr("view");
					return this._view;
				}
				respond(t) {
					if (!Hr(this)) throw Zr("respond");
					if (Se(t, 1, "respond"), t = Fr(t, "First parameter"), this._associatedReadableByteStreamController === void 0) throw new TypeError("This BYOB request has been invalidated");
					if (Ae(this._view.buffer)) throw new TypeError("The BYOB request's buffer has been detached and so cannot be used as a response");
					Vt(this._associatedReadableByteStreamController, t);
				}
				respondWithNewView(t) {
					if (!Hr(this)) throw Zr("respondWithNewView");
					if (Se(t, 1, "respondWithNewView"), !ArrayBuffer.isView(t)) throw new TypeError("You can only respond with array buffer views");
					if (this._associatedReadableByteStreamController === void 0) throw new TypeError("This BYOB request has been invalidated");
					if (Ae(t.buffer)) throw new TypeError("The given view's buffer has been detached and so cannot be used as a response");
					Qt(this._associatedReadableByteStreamController, t);
				}
			};
			n$2(gn, "ReadableStreamBYOBRequest");
			let Re = gn;
			Object.defineProperties(Re.prototype, {
				respond: { enumerable: true },
				respondWithNewView: { enumerable: true },
				view: { enumerable: true }
			}), h(Re.prototype.respond, "respond"), h(Re.prototype.respondWithNewView, "respondWithNewView"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Re.prototype, Symbol.toStringTag, {
				value: "ReadableStreamBYOBRequest",
				configurable: true
			});
			const _n = class _n {
				constructor() {
					throw new TypeError("Illegal constructor");
				}
				get byobRequest() {
					if (!Ie(this)) throw Rt("byobRequest");
					return Gr(this);
				}
				get desiredSize() {
					if (!Ie(this)) throw Rt("desiredSize");
					return Ro(this);
				}
				close() {
					if (!Ie(this)) throw Rt("close");
					if (this._closeRequested) throw new TypeError("The stream has already been closed; do not close it again!");
					const t = this._controlledReadableByteStream._state;
					if (t !== "readable") throw new TypeError(`The stream (in ${t} state) is not in the readable state and cannot be closed`);
					wt(this);
				}
				enqueue(t) {
					if (!Ie(this)) throw Rt("enqueue");
					if (Se(t, 1, "enqueue"), !ArrayBuffer.isView(t)) throw new TypeError("chunk must be an array buffer view");
					if (t.byteLength === 0) throw new TypeError("chunk must have non-zero byteLength");
					if (t.buffer.byteLength === 0) throw new TypeError("chunk's buffer must have non-zero byteLength");
					if (this._closeRequested) throw new TypeError("stream is closed or draining");
					const r = this._controlledReadableByteStream._state;
					if (r !== "readable") throw new TypeError(`The stream (in ${r} state) is not in the readable state and cannot be enqueued to`);
					Ht(this, t);
				}
				error(t = void 0) {
					if (!Ie(this)) throw Rt("error");
					K(this, t);
				}
				[Ar](t) {
					ho(this), Be(this);
					const r = this._cancelAlgorithm(t);
					return Nt(this), r;
				}
				[Br](t) {
					const r = this._controlledReadableByteStream;
					if (this._queueTotalSize > 0) {
						wo(this, t);
						return;
					}
					const s = this._autoAllocateChunkSize;
					if (s !== void 0) {
						let u;
						try {
							u = new ArrayBuffer(s);
						} catch (d) {
							t._errorSteps(d);
							return;
						}
						const c = {
							buffer: u,
							bufferByteLength: s,
							byteOffset: 0,
							byteLength: s,
							bytesFilled: 0,
							minimumFill: 1,
							elementSize: 1,
							viewConstructor: Uint8Array,
							readerType: "default"
						};
						this._pendingPullIntos.push(c);
					}
					eo(r, t), Fe(this);
				}
				[kr]() {
					if (this._pendingPullIntos.length > 0) {
						const t = this._pendingPullIntos.peek();
						t.readerType = "none", this._pendingPullIntos = new D(), this._pendingPullIntos.push(t);
					}
				}
			};
			n$2(_n, "ReadableByteStreamController");
			let te = _n;
			Object.defineProperties(te.prototype, {
				close: { enumerable: true },
				enqueue: { enumerable: true },
				error: { enumerable: true },
				byobRequest: { enumerable: true },
				desiredSize: { enumerable: true }
			}), h(te.prototype.close, "close"), h(te.prototype.enqueue, "enqueue"), h(te.prototype.error, "error"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(te.prototype, Symbol.toStringTag, {
				value: "ReadableByteStreamController",
				configurable: true
			});
			function Ie(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledReadableByteStream") ? false : e instanceof te;
			}
			n$2(Ie, "IsReadableByteStreamController");
			function Hr(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_associatedReadableByteStreamController") ? false : e instanceof Re;
			}
			n$2(Hr, "IsReadableStreamBYOBRequest");
			function Fe(e) {
				if (!fa(e)) return;
				if (e._pulling) {
					e._pullAgain = true;
					return;
				}
				e._pulling = true;
				g(e._pullAlgorithm(), () => (e._pulling = false, e._pullAgain && (e._pullAgain = false, Fe(e)), null), (s) => (K(e, s), null));
			}
			n$2(Fe, "ReadableByteStreamControllerCallPullIfNeeded");
			function ho(e) {
				Qr(e), e._pendingPullIntos = new D();
			}
			n$2(ho, "ReadableByteStreamControllerClearPendingPullIntos");
			function Vr(e, t) {
				let r = false;
				e._state === "closed" && (r = true);
				const s = po(t);
				t.readerType === "default" ? Lr(e, s, r) : ma(e, s, r);
			}
			n$2(Vr, "ReadableByteStreamControllerCommitPullIntoDescriptor");
			function po(e) {
				const t = e.bytesFilled, r = e.elementSize;
				return new e.viewConstructor(e.buffer, e.byteOffset, t / r);
			}
			n$2(po, "ReadableByteStreamControllerConvertPullIntoDescriptor");
			function xt(e, t, r, s) {
				e._queue.push({
					buffer: t,
					byteOffset: r,
					byteLength: s
				}), e._queueTotalSize += s;
			}
			n$2(xt, "ReadableByteStreamControllerEnqueueChunkToQueue");
			function bo(e, t, r, s) {
				let u;
				try {
					u = lo(t, r, r + s);
				} catch (c) {
					throw K(e, c), c;
				}
				xt(e, u, 0, s);
			}
			n$2(bo, "ReadableByteStreamControllerEnqueueClonedChunkToQueue");
			function mo(e, t) {
				t.bytesFilled > 0 && bo(e, t.buffer, t.byteOffset, t.bytesFilled), Ye(e);
			}
			n$2(mo, "ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue");
			function yo(e, t) {
				const r = Math.min(e._queueTotalSize, t.byteLength - t.bytesFilled), s = t.bytesFilled + r;
				let u = r, c = false;
				const m = s - s % t.elementSize;
				m >= t.minimumFill && (u = m - t.bytesFilled, c = true);
				const R = e._queue;
				for (; u > 0;) {
					const y = R.peek(), C = Math.min(u, y.byteLength), P = t.byteOffset + t.bytesFilled;
					so(t.buffer, P, y.buffer, y.byteOffset, C), y.byteLength === C ? R.shift() : (y.byteOffset += C, y.byteLength -= C), e._queueTotalSize -= C, go(e, C, t), u -= C;
				}
				return c;
			}
			n$2(yo, "ReadableByteStreamControllerFillPullIntoDescriptorFromQueue");
			function go(e, t, r) {
				r.bytesFilled += t;
			}
			n$2(go, "ReadableByteStreamControllerFillHeadPullIntoDescriptor");
			function _o(e) {
				e._queueTotalSize === 0 && e._closeRequested ? (Nt(e), At(e._controlledReadableByteStream)) : Fe(e);
			}
			n$2(_o, "ReadableByteStreamControllerHandleQueueDrain");
			function Qr(e) {
				e._byobRequest !== null && (e._byobRequest._associatedReadableByteStreamController = void 0, e._byobRequest._view = null, e._byobRequest = null);
			}
			n$2(Qr, "ReadableByteStreamControllerInvalidateBYOBRequest");
			function Yr(e) {
				for (; e._pendingPullIntos.length > 0;) {
					if (e._queueTotalSize === 0) return;
					const t = e._pendingPullIntos.peek();
					yo(e, t) && (Ye(e), Vr(e._controlledReadableByteStream, t));
				}
			}
			n$2(Yr, "ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue");
			function aa(e) {
				const t = e._controlledReadableByteStream._reader;
				for (; t._readRequests.length > 0;) {
					if (e._queueTotalSize === 0) return;
					wo(e, t._readRequests.shift());
				}
			}
			n$2(aa, "ReadableByteStreamControllerProcessReadRequestsUsingQueue");
			function sa(e, t, r, s) {
				const u = e._controlledReadableByteStream, c = t.constructor, d = ia(c), { byteOffset: m, byteLength: R } = t, y = r * d;
				let C;
				try {
					C = we(t.buffer);
				} catch (B) {
					s._errorSteps(B);
					return;
				}
				const P = {
					buffer: C,
					bufferByteLength: C.byteLength,
					byteOffset: m,
					byteLength: R,
					bytesFilled: 0,
					minimumFill: y,
					elementSize: d,
					viewConstructor: c,
					readerType: "byob"
				};
				if (e._pendingPullIntos.length > 0) {
					e._pendingPullIntos.push(P), Po(u, s);
					return;
				}
				if (u._state === "closed") {
					const B = new c(P.buffer, P.byteOffset, 0);
					s._closeSteps(B);
					return;
				}
				if (e._queueTotalSize > 0) {
					if (yo(e, P)) {
						const B = po(P);
						_o(e), s._chunkSteps(B);
						return;
					}
					if (e._closeRequested) {
						const B = /* @__PURE__ */ new TypeError("Insufficient bytes to fill elements in the given buffer");
						K(e, B), s._errorSteps(B);
						return;
					}
				}
				e._pendingPullIntos.push(P), Po(u, s), Fe(e);
			}
			n$2(sa, "ReadableByteStreamControllerPullInto");
			function la(e, t) {
				t.readerType === "none" && Ye(e);
				const r = e._controlledReadableByteStream;
				if (Kr(r)) for (; vo(r) > 0;) Vr(r, Ye(e));
			}
			n$2(la, "ReadableByteStreamControllerRespondInClosedState");
			function ua(e, t, r) {
				if (go(e, t, r), r.readerType === "none") {
					mo(e, r), Yr(e);
					return;
				}
				if (r.bytesFilled < r.minimumFill) return;
				Ye(e);
				const s = r.bytesFilled % r.elementSize;
				if (s > 0) {
					const u = r.byteOffset + r.bytesFilled;
					bo(e, r.buffer, u - s, s);
				}
				r.bytesFilled -= s, Vr(e._controlledReadableByteStream, r), Yr(e);
			}
			n$2(ua, "ReadableByteStreamControllerRespondInReadableState");
			function So(e, t) {
				const r = e._pendingPullIntos.peek();
				Qr(e), e._controlledReadableByteStream._state === "closed" ? la(e, r) : ua(e, t, r), Fe(e);
			}
			n$2(So, "ReadableByteStreamControllerRespondInternal");
			function Ye(e) {
				return e._pendingPullIntos.shift();
			}
			n$2(Ye, "ReadableByteStreamControllerShiftPendingPullInto");
			function fa(e) {
				const t = e._controlledReadableByteStream;
				return t._state !== "readable" || e._closeRequested || !e._started ? false : !!(to(t) && $t(t) > 0 || Kr(t) && vo(t) > 0 || Ro(e) > 0);
			}
			n$2(fa, "ReadableByteStreamControllerShouldCallPull");
			function Nt(e) {
				e._pullAlgorithm = void 0, e._cancelAlgorithm = void 0;
			}
			n$2(Nt, "ReadableByteStreamControllerClearAlgorithms");
			function wt(e) {
				const t = e._controlledReadableByteStream;
				if (!(e._closeRequested || t._state !== "readable")) {
					if (e._queueTotalSize > 0) {
						e._closeRequested = true;
						return;
					}
					if (e._pendingPullIntos.length > 0) {
						const r = e._pendingPullIntos.peek();
						if (r.bytesFilled % r.elementSize !== 0) {
							const s = /* @__PURE__ */ new TypeError("Insufficient bytes to fill elements in the given buffer");
							throw K(e, s), s;
						}
					}
					Nt(e), At(t);
				}
			}
			n$2(wt, "ReadableByteStreamControllerClose");
			function Ht(e, t) {
				const r = e._controlledReadableByteStream;
				if (e._closeRequested || r._state !== "readable") return;
				const { buffer: s, byteOffset: u, byteLength: c } = t;
				if (Ae(s)) throw new TypeError("chunk's buffer is detached and so cannot be enqueued");
				const d = we(s);
				if (e._pendingPullIntos.length > 0) {
					const m = e._pendingPullIntos.peek();
					if (Ae(m.buffer)) throw new TypeError("The BYOB request's buffer has been detached and so cannot be filled with an enqueued chunk");
					Qr(e), m.buffer = we(m.buffer), m.readerType === "none" && mo(e, m);
				}
				if (to(r)) if (aa(e), $t(r) === 0) xt(e, d, u, c);
				else {
					e._pendingPullIntos.length > 0 && Ye(e);
					Lr(r, new Uint8Array(d, u, c), false);
				}
				else Kr(r) ? (xt(e, d, u, c), Yr(e)) : xt(e, d, u, c);
				Fe(e);
			}
			n$2(Ht, "ReadableByteStreamControllerEnqueue");
			function K(e, t) {
				const r = e._controlledReadableByteStream;
				r._state === "readable" && (ho(e), Be(e), Nt(e), Zo(r, t));
			}
			n$2(K, "ReadableByteStreamControllerError");
			function wo(e, t) {
				const r = e._queue.shift();
				e._queueTotalSize -= r.byteLength, _o(e);
				const s = new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
				t._chunkSteps(s);
			}
			n$2(wo, "ReadableByteStreamControllerFillReadRequestFromQueue");
			function Gr(e) {
				if (e._byobRequest === null && e._pendingPullIntos.length > 0) {
					const t = e._pendingPullIntos.peek(), r = new Uint8Array(t.buffer, t.byteOffset + t.bytesFilled, t.byteLength - t.bytesFilled), s = Object.create(Re.prototype);
					da(s, e, r), e._byobRequest = s;
				}
				return e._byobRequest;
			}
			n$2(Gr, "ReadableByteStreamControllerGetBYOBRequest");
			function Ro(e) {
				const t = e._controlledReadableByteStream._state;
				return t === "errored" ? null : t === "closed" ? 0 : e._strategyHWM - e._queueTotalSize;
			}
			n$2(Ro, "ReadableByteStreamControllerGetDesiredSize");
			function Vt(e, t) {
				const r = e._pendingPullIntos.peek();
				if (e._controlledReadableByteStream._state === "closed") {
					if (t !== 0) throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
				} else {
					if (t === 0) throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
					if (r.bytesFilled + t > r.byteLength) throw new RangeError("bytesWritten out of range");
				}
				r.buffer = we(r.buffer), So(e, t);
			}
			n$2(Vt, "ReadableByteStreamControllerRespond");
			function Qt(e, t) {
				const r = e._pendingPullIntos.peek();
				if (e._controlledReadableByteStream._state === "closed") {
					if (t.byteLength !== 0) throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
				} else if (t.byteLength === 0) throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
				if (r.byteOffset + r.bytesFilled !== t.byteOffset) throw new RangeError("The region specified by view does not match byobRequest");
				if (r.bufferByteLength !== t.buffer.byteLength) throw new RangeError("The buffer of view has different capacity than byobRequest");
				if (r.bytesFilled + t.byteLength > r.byteLength) throw new RangeError("The region specified by view is larger than byobRequest");
				const u = t.byteLength;
				r.buffer = we(t.buffer), So(e, u);
			}
			n$2(Qt, "ReadableByteStreamControllerRespondWithNewView");
			function To(e, t, r, s, u, c, d) {
				t._controlledReadableByteStream = e, t._pullAgain = false, t._pulling = false, t._byobRequest = null, t._queue = t._queueTotalSize = void 0, Be(t), t._closeRequested = false, t._started = false, t._strategyHWM = c, t._pullAlgorithm = s, t._cancelAlgorithm = u, t._autoAllocateChunkSize = d, t._pendingPullIntos = new D(), e._readableStreamController = t;
				g(T(r()), () => (t._started = true, Fe(t), null), (R) => (K(t, R), null));
			}
			n$2(To, "SetUpReadableByteStreamController");
			function ca(e, t, r) {
				const s = Object.create(te.prototype);
				let u, c, d;
				t.start !== void 0 ? u = n$2(() => t.start(s), "startAlgorithm") : u = n$2(() => {}, "startAlgorithm"), t.pull !== void 0 ? c = n$2(() => t.pull(s), "pullAlgorithm") : c = n$2(() => T(void 0), "pullAlgorithm"), t.cancel !== void 0 ? d = n$2((R) => t.cancel(R), "cancelAlgorithm") : d = n$2(() => T(void 0), "cancelAlgorithm");
				const m = t.autoAllocateChunkSize;
				if (m === 0) throw new TypeError("autoAllocateChunkSize must be greater than 0");
				To(e, s, u, c, d, r, m);
			}
			n$2(ca, "SetUpReadableByteStreamControllerFromUnderlyingSource");
			function da(e, t, r) {
				e._associatedReadableByteStreamController = t, e._view = r;
			}
			n$2(da, "SetUpReadableStreamBYOBRequest");
			function Zr(e) {
				return /* @__PURE__ */ new TypeError(`ReadableStreamBYOBRequest.prototype.${e} can only be used on a ReadableStreamBYOBRequest`);
			}
			n$2(Zr, "byobRequestBrandCheckException");
			function Rt(e) {
				return /* @__PURE__ */ new TypeError(`ReadableByteStreamController.prototype.${e} can only be used on a ReadableByteStreamController`);
			}
			n$2(Rt, "byteStreamControllerBrandCheckException");
			function ha(e, t) {
				ue(e, t);
				const r = e?.mode;
				return { mode: r === void 0 ? void 0 : pa(r, `${t} has member 'mode' that`) };
			}
			n$2(ha, "convertReaderOptions");
			function pa(e, t) {
				if (e = `${e}`, e !== "byob") throw new TypeError(`${t} '${e}' is not a valid enumeration value for ReadableStreamReaderMode`);
				return e;
			}
			n$2(pa, "convertReadableStreamReaderMode");
			function ba(e, t) {
				var r;
				ue(e, t);
				return { min: Fr((r = e?.min) !== null && r !== void 0 ? r : 1, `${t} has member 'min' that`) };
			}
			n$2(ba, "convertByobReadOptions");
			function Co(e) {
				return new ce(e);
			}
			n$2(Co, "AcquireReadableStreamBYOBReader");
			function Po(e, t) {
				e._reader._readIntoRequests.push(t);
			}
			n$2(Po, "ReadableStreamAddReadIntoRequest");
			function ma(e, t, r) {
				const u = e._reader._readIntoRequests.shift();
				r ? u._closeSteps(t) : u._chunkSteps(t);
			}
			n$2(ma, "ReadableStreamFulfillReadIntoRequest");
			function vo(e) {
				return e._reader._readIntoRequests.length;
			}
			n$2(vo, "ReadableStreamGetNumReadIntoRequests");
			function Kr(e) {
				const t = e._reader;
				return !(t === void 0 || !je(t));
			}
			n$2(Kr, "ReadableStreamHasBYOBReader");
			const Sn = class Sn {
				constructor(t) {
					if (Se(t, 1, "ReadableStreamBYOBReader"), jr(t, "First parameter"), qe(t)) throw new TypeError("This stream has already been locked for exclusive reading by another reader");
					if (!Ie(t._readableStreamController)) throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
					Yn(this, t), this._readIntoRequests = new D();
				}
				get closed() {
					return je(this) ? this._closedPromise : b(Yt("closed"));
				}
				cancel(t = void 0) {
					return je(this) ? this._ownerReadableStream === void 0 ? b(Lt("cancel")) : Wr(this, t) : b(Yt("cancel"));
				}
				read(t, r = {}) {
					if (!je(this)) return b(Yt("read"));
					if (!ArrayBuffer.isView(t)) return b(/* @__PURE__ */ new TypeError("view must be an array buffer view"));
					if (t.byteLength === 0) return b(/* @__PURE__ */ new TypeError("view must have non-zero byteLength"));
					if (t.buffer.byteLength === 0) return b(/* @__PURE__ */ new TypeError("view's buffer must have non-zero byteLength"));
					if (Ae(t.buffer)) return b(/* @__PURE__ */ new TypeError("view's buffer has been detached"));
					let s;
					try {
						s = ba(r, "options");
					} catch (y) {
						return b(y);
					}
					const u = s.min;
					if (u === 0) return b(/* @__PURE__ */ new TypeError("options.min must be greater than 0"));
					if (oa(t)) {
						if (u > t.byteLength) return b(/* @__PURE__ */ new RangeError("options.min must be less than or equal to view's byteLength"));
					} else if (u > t.length) return b(/* @__PURE__ */ new RangeError("options.min must be less than or equal to view's length"));
					if (this._ownerReadableStream === void 0) return b(Lt("read from"));
					let c, d;
					const m = A((y, C) => {
						c = y, d = C;
					});
					return Eo(this, t, u, {
						_chunkSteps: n$2((y) => c({
							value: y,
							done: false
						}), "_chunkSteps"),
						_closeSteps: n$2((y) => c({
							value: y,
							done: true
						}), "_closeSteps"),
						_errorSteps: n$2((y) => d(y), "_errorSteps")
					}), m;
				}
				releaseLock() {
					if (!je(this)) throw Yt("releaseLock");
					this._ownerReadableStream !== void 0 && ya(this);
				}
			};
			n$2(Sn, "ReadableStreamBYOBReader");
			let ce = Sn;
			Object.defineProperties(ce.prototype, {
				cancel: { enumerable: true },
				read: { enumerable: true },
				releaseLock: { enumerable: true },
				closed: { enumerable: true }
			}), h(ce.prototype.cancel, "cancel"), h(ce.prototype.read, "read"), h(ce.prototype.releaseLock, "releaseLock"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ce.prototype, Symbol.toStringTag, {
				value: "ReadableStreamBYOBReader",
				configurable: true
			});
			function je(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_readIntoRequests") ? false : e instanceof ce;
			}
			n$2(je, "IsReadableStreamBYOBReader");
			function Eo(e, t, r, s) {
				const u = e._ownerReadableStream;
				u._disturbed = true, u._state === "errored" ? s._errorSteps(u._storedError) : sa(u._readableStreamController, t, r, s);
			}
			n$2(Eo, "ReadableStreamBYOBReaderRead");
			function ya(e) {
				_e(e);
				Ao(e, /* @__PURE__ */ new TypeError("Reader was released"));
			}
			n$2(ya, "ReadableStreamBYOBReaderRelease");
			function Ao(e, t) {
				const r = e._readIntoRequests;
				e._readIntoRequests = new D(), r.forEach((s) => {
					s._errorSteps(t);
				});
			}
			n$2(Ao, "ReadableStreamBYOBReaderErrorReadIntoRequests");
			function Yt(e) {
				return /* @__PURE__ */ new TypeError(`ReadableStreamBYOBReader.prototype.${e} can only be used on a ReadableStreamBYOBReader`);
			}
			n$2(Yt, "byobReaderBrandCheckException");
			function Tt(e, t) {
				const { highWaterMark: r } = e;
				if (r === void 0) return t;
				if (ao(r) || r < 0) throw new RangeError("Invalid highWaterMark");
				return r;
			}
			n$2(Tt, "ExtractHighWaterMark");
			function Gt(e) {
				const { size: t } = e;
				return t || (() => 1);
			}
			n$2(Gt, "ExtractSizeAlgorithm");
			function Zt(e, t) {
				ue(e, t);
				const r = e?.highWaterMark, s = e?.size;
				return {
					highWaterMark: r === void 0 ? void 0 : Ir(r),
					size: s === void 0 ? void 0 : ga(s, `${t} has member 'size' that`)
				};
			}
			n$2(Zt, "convertQueuingStrategy");
			function ga(e, t) {
				return Z(e, t), (r) => Ir(e(r));
			}
			n$2(ga, "convertQueuingStrategySize");
			function _a(e, t) {
				ue(e, t);
				const r = e?.abort, s = e?.close, u = e?.start, c = e?.type, d = e?.write;
				return {
					abort: r === void 0 ? void 0 : Sa(r, e, `${t} has member 'abort' that`),
					close: s === void 0 ? void 0 : wa(s, e, `${t} has member 'close' that`),
					start: u === void 0 ? void 0 : Ra(u, e, `${t} has member 'start' that`),
					write: d === void 0 ? void 0 : Ta(d, e, `${t} has member 'write' that`),
					type: c
				};
			}
			n$2(_a, "convertUnderlyingSink");
			function Sa(e, t, r) {
				return Z(e, r), (s) => j(e, t, [s]);
			}
			n$2(Sa, "convertUnderlyingSinkAbortCallback");
			function wa(e, t, r) {
				return Z(e, r), () => j(e, t, []);
			}
			n$2(wa, "convertUnderlyingSinkCloseCallback");
			function Ra(e, t, r) {
				return Z(e, r), (s) => z(e, t, [s]);
			}
			n$2(Ra, "convertUnderlyingSinkStartCallback");
			function Ta(e, t, r) {
				return Z(e, r), (s, u) => j(e, t, [s, u]);
			}
			n$2(Ta, "convertUnderlyingSinkWriteCallback");
			function Bo(e, t) {
				if (!Ge(e)) throw new TypeError(`${t} is not a WritableStream.`);
			}
			n$2(Bo, "assertWritableStream");
			function Ca(e) {
				if (typeof e != "object" || e === null) return false;
				try {
					return typeof e.aborted == "boolean";
				} catch {
					return false;
				}
			}
			n$2(Ca, "isAbortSignal");
			const Pa = typeof AbortController == "function";
			function va() {
				if (Pa) return new AbortController();
			}
			n$2(va, "createAbortController");
			const wn = class wn {
				constructor(t = {}, r = {}) {
					t === void 0 ? t = null : Jn(t, "First parameter");
					const s = Zt(r, "Second parameter"), u = _a(t, "First parameter");
					if (Wo(this), u.type !== void 0) throw new RangeError("Invalid type is specified");
					const d = Gt(s), m = Tt(s, 1);
					Da(this, u, m, d);
				}
				get locked() {
					if (!Ge(this)) throw tr("locked");
					return Ze(this);
				}
				abort(t = void 0) {
					return Ge(this) ? Ze(this) ? b(/* @__PURE__ */ new TypeError("Cannot abort a stream that already has a writer")) : Kt(this, t) : b(tr("abort"));
				}
				close() {
					return Ge(this) ? Ze(this) ? b(/* @__PURE__ */ new TypeError("Cannot close a stream that already has a writer")) : he(this) ? b(/* @__PURE__ */ new TypeError("Cannot close an already-closing stream")) : qo(this) : b(tr("close"));
				}
				getWriter() {
					if (!Ge(this)) throw tr("getWriter");
					return ko(this);
				}
			};
			n$2(wn, "WritableStream");
			let de = wn;
			Object.defineProperties(de.prototype, {
				abort: { enumerable: true },
				close: { enumerable: true },
				getWriter: { enumerable: true },
				locked: { enumerable: true }
			}), h(de.prototype.abort, "abort"), h(de.prototype.close, "close"), h(de.prototype.getWriter, "getWriter"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(de.prototype, Symbol.toStringTag, {
				value: "WritableStream",
				configurable: true
			});
			function ko(e) {
				return new re(e);
			}
			n$2(ko, "AcquireWritableStreamDefaultWriter");
			function Ea(e, t, r, s, u = 1, c = () => 1) {
				const d = Object.create(de.prototype);
				Wo(d);
				return Lo(d, Object.create(ke.prototype), e, t, r, s, u, c), d;
			}
			n$2(Ea, "CreateWritableStream");
			function Wo(e) {
				e._state = "writable", e._storedError = void 0, e._writer = void 0, e._writableStreamController = void 0, e._writeRequests = new D(), e._inFlightWriteRequest = void 0, e._closeRequest = void 0, e._inFlightCloseRequest = void 0, e._pendingAbortRequest = void 0, e._backpressure = false;
			}
			n$2(Wo, "InitializeWritableStream");
			function Ge(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_writableStreamController") ? false : e instanceof de;
			}
			n$2(Ge, "IsWritableStream");
			function Ze(e) {
				return e._writer !== void 0;
			}
			n$2(Ze, "IsWritableStreamLocked");
			function Kt(e, t) {
				var r;
				if (e._state === "closed" || e._state === "errored") return T(void 0);
				e._writableStreamController._abortReason = t, (r = e._writableStreamController._abortController) === null || r === void 0 || r.abort(t);
				const s = e._state;
				if (s === "closed" || s === "errored") return T(void 0);
				if (e._pendingAbortRequest !== void 0) return e._pendingAbortRequest._promise;
				let u = false;
				s === "erroring" && (u = true, t = void 0);
				const c = A((d, m) => {
					e._pendingAbortRequest = {
						_promise: void 0,
						_resolve: d,
						_reject: m,
						_reason: t,
						_wasAlreadyErroring: u
					};
				});
				return e._pendingAbortRequest._promise = c, u || Xr(e, t), c;
			}
			n$2(Kt, "WritableStreamAbort");
			function qo(e) {
				const t = e._state;
				if (t === "closed" || t === "errored") return b(/* @__PURE__ */ new TypeError(`The stream (in ${t} state) is not in the writable state and cannot be closed`));
				const r = A((u, c) => {
					e._closeRequest = {
						_resolve: u,
						_reject: c
					};
				}), s = e._writer;
				return s !== void 0 && e._backpressure && t === "writable" && ln(s), Ma(e._writableStreamController), r;
			}
			n$2(qo, "WritableStreamClose");
			function Aa(e) {
				return A((r, s) => {
					const u = {
						_resolve: r,
						_reject: s
					};
					e._writeRequests.push(u);
				});
			}
			n$2(Aa, "WritableStreamAddWriteRequest");
			function Jr(e, t) {
				if (e._state === "writable") {
					Xr(e, t);
					return;
				}
				en(e);
			}
			n$2(Jr, "WritableStreamDealWithRejection");
			function Xr(e, t) {
				const r = e._writableStreamController;
				e._state = "erroring", e._storedError = t;
				const s = e._writer;
				s !== void 0 && zo(s, t), !Oa(e) && r._started && en(e);
			}
			n$2(Xr, "WritableStreamStartErroring");
			function en(e) {
				e._state = "errored", e._writableStreamController[Qn]();
				const t = e._storedError;
				if (e._writeRequests.forEach((u) => {
					u._reject(t);
				}), e._writeRequests = new D(), e._pendingAbortRequest === void 0) {
					Jt(e);
					return;
				}
				const r = e._pendingAbortRequest;
				if (e._pendingAbortRequest = void 0, r._wasAlreadyErroring) {
					r._reject(t), Jt(e);
					return;
				}
				g(e._writableStreamController[jt](r._reason), () => (r._resolve(), Jt(e), null), (u) => (r._reject(u), Jt(e), null));
			}
			n$2(en, "WritableStreamFinishErroring");
			function Ba(e) {
				e._inFlightWriteRequest._resolve(void 0), e._inFlightWriteRequest = void 0;
			}
			n$2(Ba, "WritableStreamFinishInFlightWrite");
			function ka(e, t) {
				e._inFlightWriteRequest._reject(t), e._inFlightWriteRequest = void 0, Jr(e, t);
			}
			n$2(ka, "WritableStreamFinishInFlightWriteWithError");
			function Wa(e) {
				e._inFlightCloseRequest._resolve(void 0), e._inFlightCloseRequest = void 0, e._state === "erroring" && (e._storedError = void 0, e._pendingAbortRequest !== void 0 && (e._pendingAbortRequest._resolve(), e._pendingAbortRequest = void 0)), e._state = "closed";
				const r = e._writer;
				r !== void 0 && Uo(r);
			}
			n$2(Wa, "WritableStreamFinishInFlightClose");
			function qa(e, t) {
				e._inFlightCloseRequest._reject(t), e._inFlightCloseRequest = void 0, e._pendingAbortRequest !== void 0 && (e._pendingAbortRequest._reject(t), e._pendingAbortRequest = void 0), Jr(e, t);
			}
			n$2(qa, "WritableStreamFinishInFlightCloseWithError");
			function he(e) {
				return !(e._closeRequest === void 0 && e._inFlightCloseRequest === void 0);
			}
			n$2(he, "WritableStreamCloseQueuedOrInFlight");
			function Oa(e) {
				return !(e._inFlightWriteRequest === void 0 && e._inFlightCloseRequest === void 0);
			}
			n$2(Oa, "WritableStreamHasOperationMarkedInFlight");
			function za(e) {
				e._inFlightCloseRequest = e._closeRequest, e._closeRequest = void 0;
			}
			n$2(za, "WritableStreamMarkCloseRequestInFlight");
			function Ia(e) {
				e._inFlightWriteRequest = e._writeRequests.shift();
			}
			n$2(Ia, "WritableStreamMarkFirstWriteRequestInFlight");
			function Jt(e) {
				e._closeRequest !== void 0 && (e._closeRequest._reject(e._storedError), e._closeRequest = void 0);
				const t = e._writer;
				t !== void 0 && an(t, e._storedError);
			}
			n$2(Jt, "WritableStreamRejectCloseAndClosedPromiseIfNeeded");
			function tn(e, t) {
				const r = e._writer;
				r !== void 0 && t !== e._backpressure && (t ? Ya(r) : ln(r)), e._backpressure = t;
			}
			n$2(tn, "WritableStreamUpdateBackpressure");
			const Rn = class Rn {
				constructor(t) {
					if (Se(t, 1, "WritableStreamDefaultWriter"), Bo(t, "First parameter"), Ze(t)) throw new TypeError("This stream has already been locked for exclusive writing by another writer");
					this._ownerWritableStream = t, t._writer = this;
					const r = t._state;
					if (r === "writable") !he(t) && t._backpressure ? nr(this) : xo(this), rr(this);
					else if (r === "erroring") sn(this, t._storedError), rr(this);
					else if (r === "closed") xo(this), Va(this);
					else {
						const s = t._storedError;
						sn(this, s), Mo(this, s);
					}
				}
				get closed() {
					return Le(this) ? this._closedPromise : b($e("closed"));
				}
				get desiredSize() {
					if (!Le(this)) throw $e("desiredSize");
					if (this._ownerWritableStream === void 0) throw Pt("desiredSize");
					return $a(this);
				}
				get ready() {
					return Le(this) ? this._readyPromise : b($e("ready"));
				}
				abort(t = void 0) {
					return Le(this) ? this._ownerWritableStream === void 0 ? b(Pt("abort")) : Fa(this, t) : b($e("abort"));
				}
				close() {
					if (!Le(this)) return b($e("close"));
					const t = this._ownerWritableStream;
					return t === void 0 ? b(Pt("close")) : he(t) ? b(/* @__PURE__ */ new TypeError("Cannot close an already-closing stream")) : Oo(this);
				}
				releaseLock() {
					if (!Le(this)) throw $e("releaseLock");
					this._ownerWritableStream !== void 0 && Io(this);
				}
				write(t = void 0) {
					return Le(this) ? this._ownerWritableStream === void 0 ? b(Pt("write to")) : Fo(this, t) : b($e("write"));
				}
			};
			n$2(Rn, "WritableStreamDefaultWriter");
			let re = Rn;
			Object.defineProperties(re.prototype, {
				abort: { enumerable: true },
				close: { enumerable: true },
				releaseLock: { enumerable: true },
				write: { enumerable: true },
				closed: { enumerable: true },
				desiredSize: { enumerable: true },
				ready: { enumerable: true }
			}), h(re.prototype.abort, "abort"), h(re.prototype.close, "close"), h(re.prototype.releaseLock, "releaseLock"), h(re.prototype.write, "write"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(re.prototype, Symbol.toStringTag, {
				value: "WritableStreamDefaultWriter",
				configurable: true
			});
			function Le(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_ownerWritableStream") ? false : e instanceof re;
			}
			n$2(Le, "IsWritableStreamDefaultWriter");
			function Fa(e, t) {
				const r = e._ownerWritableStream;
				return Kt(r, t);
			}
			n$2(Fa, "WritableStreamDefaultWriterAbort");
			function Oo(e) {
				const t = e._ownerWritableStream;
				return qo(t);
			}
			n$2(Oo, "WritableStreamDefaultWriterClose");
			function ja(e) {
				const t = e._ownerWritableStream, r = t._state;
				return he(t) || r === "closed" ? T(void 0) : r === "errored" ? b(t._storedError) : Oo(e);
			}
			n$2(ja, "WritableStreamDefaultWriterCloseWithErrorPropagation");
			function La(e, t) {
				e._closedPromiseState === "pending" ? an(e, t) : Qa(e, t);
			}
			n$2(La, "WritableStreamDefaultWriterEnsureClosedPromiseRejected");
			function zo(e, t) {
				e._readyPromiseState === "pending" ? No(e, t) : Ga(e, t);
			}
			n$2(zo, "WritableStreamDefaultWriterEnsureReadyPromiseRejected");
			function $a(e) {
				const t = e._ownerWritableStream, r = t._state;
				return r === "errored" || r === "erroring" ? null : r === "closed" ? 0 : $o(t._writableStreamController);
			}
			n$2($a, "WritableStreamDefaultWriterGetDesiredSize");
			function Io(e) {
				const t = e._ownerWritableStream, r = /* @__PURE__ */ new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");
				zo(e, r), La(e, r), t._writer = void 0, e._ownerWritableStream = void 0;
			}
			n$2(Io, "WritableStreamDefaultWriterRelease");
			function Fo(e, t) {
				const r = e._ownerWritableStream, s = r._writableStreamController, u = Ua(s, t);
				if (r !== e._ownerWritableStream) return b(Pt("write to"));
				const c = r._state;
				if (c === "errored") return b(r._storedError);
				if (he(r) || c === "closed") return b(/* @__PURE__ */ new TypeError("The stream is closing or closed and cannot be written to"));
				if (c === "erroring") return b(r._storedError);
				const d = Aa(r);
				return xa(s, t, u), d;
			}
			n$2(Fo, "WritableStreamDefaultWriterWrite");
			const jo = {}, Tn = class Tn {
				constructor() {
					throw new TypeError("Illegal constructor");
				}
				get abortReason() {
					if (!rn(this)) throw on("abortReason");
					return this._abortReason;
				}
				get signal() {
					if (!rn(this)) throw on("signal");
					if (this._abortController === void 0) throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
					return this._abortController.signal;
				}
				error(t = void 0) {
					if (!rn(this)) throw on("error");
					this._controlledWritableStream._state === "writable" && Do(this, t);
				}
				[jt](t) {
					const r = this._abortAlgorithm(t);
					return Xt(this), r;
				}
				[Qn]() {
					Be(this);
				}
			};
			n$2(Tn, "WritableStreamDefaultController");
			let ke = Tn;
			Object.defineProperties(ke.prototype, {
				abortReason: { enumerable: true },
				signal: { enumerable: true },
				error: { enumerable: true }
			}), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ke.prototype, Symbol.toStringTag, {
				value: "WritableStreamDefaultController",
				configurable: true
			});
			function rn(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledWritableStream") ? false : e instanceof ke;
			}
			n$2(rn, "IsWritableStreamDefaultController");
			function Lo(e, t, r, s, u, c, d, m) {
				t._controlledWritableStream = e, e._writableStreamController = t, t._queue = void 0, t._queueTotalSize = void 0, Be(t), t._abortReason = void 0, t._abortController = va(), t._started = false, t._strategySizeAlgorithm = m, t._strategyHWM = d, t._writeAlgorithm = s, t._closeAlgorithm = u, t._abortAlgorithm = c;
				tn(e, nn(t));
				g(T(r()), () => (t._started = true, er(t), null), (P) => (t._started = true, Jr(e, P), null));
			}
			n$2(Lo, "SetUpWritableStreamDefaultController");
			function Da(e, t, r, s) {
				const u = Object.create(ke.prototype);
				let c, d, m, R;
				t.start !== void 0 ? c = n$2(() => t.start(u), "startAlgorithm") : c = n$2(() => {}, "startAlgorithm"), t.write !== void 0 ? d = n$2((y) => t.write(y, u), "writeAlgorithm") : d = n$2(() => T(void 0), "writeAlgorithm"), t.close !== void 0 ? m = n$2(() => t.close(), "closeAlgorithm") : m = n$2(() => T(void 0), "closeAlgorithm"), t.abort !== void 0 ? R = n$2((y) => t.abort(y), "abortAlgorithm") : R = n$2(() => T(void 0), "abortAlgorithm"), Lo(e, u, c, d, m, R, r, s);
			}
			n$2(Da, "SetUpWritableStreamDefaultControllerFromUnderlyingSink");
			function Xt(e) {
				e._writeAlgorithm = void 0, e._closeAlgorithm = void 0, e._abortAlgorithm = void 0, e._strategySizeAlgorithm = void 0;
			}
			n$2(Xt, "WritableStreamDefaultControllerClearAlgorithms");
			function Ma(e) {
				Nr(e, jo, 0), er(e);
			}
			n$2(Ma, "WritableStreamDefaultControllerClose");
			function Ua(e, t) {
				try {
					return e._strategySizeAlgorithm(t);
				} catch (r) {
					return Ct(e, r), 1;
				}
			}
			n$2(Ua, "WritableStreamDefaultControllerGetChunkSize");
			function $o(e) {
				return e._strategyHWM - e._queueTotalSize;
			}
			n$2($o, "WritableStreamDefaultControllerGetDesiredSize");
			function xa(e, t, r) {
				try {
					Nr(e, t, r);
				} catch (u) {
					Ct(e, u);
					return;
				}
				const s = e._controlledWritableStream;
				if (!he(s) && s._state === "writable") tn(s, nn(e));
				er(e);
			}
			n$2(xa, "WritableStreamDefaultControllerWrite");
			function er(e) {
				const t = e._controlledWritableStream;
				if (!e._started || t._inFlightWriteRequest !== void 0) return;
				if (t._state === "erroring") {
					en(t);
					return;
				}
				if (e._queue.length === 0) return;
				const s = na(e);
				s === jo ? Na(e) : Ha(e, s);
			}
			n$2(er, "WritableStreamDefaultControllerAdvanceQueueIfNeeded");
			function Ct(e, t) {
				e._controlledWritableStream._state === "writable" && Do(e, t);
			}
			n$2(Ct, "WritableStreamDefaultControllerErrorIfNeeded");
			function Na(e) {
				const t = e._controlledWritableStream;
				za(t), xr(e);
				const r = e._closeAlgorithm();
				Xt(e), g(r, () => (Wa(t), null), (s) => (qa(t, s), null));
			}
			n$2(Na, "WritableStreamDefaultControllerProcessClose");
			function Ha(e, t) {
				const r = e._controlledWritableStream;
				Ia(r);
				g(e._writeAlgorithm(t), () => {
					Ba(r);
					const u = r._state;
					if (xr(e), !he(r) && u === "writable") {
						const c = nn(e);
						tn(r, c);
					}
					return er(e), null;
				}, (u) => (r._state === "writable" && Xt(e), ka(r, u), null));
			}
			n$2(Ha, "WritableStreamDefaultControllerProcessWrite");
			function nn(e) {
				return $o(e) <= 0;
			}
			n$2(nn, "WritableStreamDefaultControllerGetBackpressure");
			function Do(e, t) {
				const r = e._controlledWritableStream;
				Xt(e), Xr(r, t);
			}
			n$2(Do, "WritableStreamDefaultControllerError");
			function tr(e) {
				return /* @__PURE__ */ new TypeError(`WritableStream.prototype.${e} can only be used on a WritableStream`);
			}
			n$2(tr, "streamBrandCheckException$2");
			function on(e) {
				return /* @__PURE__ */ new TypeError(`WritableStreamDefaultController.prototype.${e} can only be used on a WritableStreamDefaultController`);
			}
			n$2(on, "defaultControllerBrandCheckException$2");
			function $e(e) {
				return /* @__PURE__ */ new TypeError(`WritableStreamDefaultWriter.prototype.${e} can only be used on a WritableStreamDefaultWriter`);
			}
			n$2($e, "defaultWriterBrandCheckException");
			function Pt(e) {
				return /* @__PURE__ */ new TypeError("Cannot " + e + " a stream using a released writer");
			}
			n$2(Pt, "defaultWriterLockException");
			function rr(e) {
				e._closedPromise = A((t, r) => {
					e._closedPromise_resolve = t, e._closedPromise_reject = r, e._closedPromiseState = "pending";
				});
			}
			n$2(rr, "defaultWriterClosedPromiseInitialize");
			function Mo(e, t) {
				rr(e), an(e, t);
			}
			n$2(Mo, "defaultWriterClosedPromiseInitializeAsRejected");
			function Va(e) {
				rr(e), Uo(e);
			}
			n$2(Va, "defaultWriterClosedPromiseInitializeAsResolved");
			function an(e, t) {
				e._closedPromise_reject !== void 0 && (Q(e._closedPromise), e._closedPromise_reject(t), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "rejected");
			}
			n$2(an, "defaultWriterClosedPromiseReject");
			function Qa(e, t) {
				Mo(e, t);
			}
			n$2(Qa, "defaultWriterClosedPromiseResetToRejected");
			function Uo(e) {
				e._closedPromise_resolve !== void 0 && (e._closedPromise_resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "resolved");
			}
			n$2(Uo, "defaultWriterClosedPromiseResolve");
			function nr(e) {
				e._readyPromise = A((t, r) => {
					e._readyPromise_resolve = t, e._readyPromise_reject = r;
				}), e._readyPromiseState = "pending";
			}
			n$2(nr, "defaultWriterReadyPromiseInitialize");
			function sn(e, t) {
				nr(e), No(e, t);
			}
			n$2(sn, "defaultWriterReadyPromiseInitializeAsRejected");
			function xo(e) {
				nr(e), ln(e);
			}
			n$2(xo, "defaultWriterReadyPromiseInitializeAsResolved");
			function No(e, t) {
				e._readyPromise_reject !== void 0 && (Q(e._readyPromise), e._readyPromise_reject(t), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "rejected");
			}
			n$2(No, "defaultWriterReadyPromiseReject");
			function Ya(e) {
				nr(e);
			}
			n$2(Ya, "defaultWriterReadyPromiseReset");
			function Ga(e, t) {
				sn(e, t);
			}
			n$2(Ga, "defaultWriterReadyPromiseResetToRejected");
			function ln(e) {
				e._readyPromise_resolve !== void 0 && (e._readyPromise_resolve(void 0), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "fulfilled");
			}
			n$2(ln, "defaultWriterReadyPromiseResolve");
			function Za() {
				if (typeof globalThis < "u") return globalThis;
				if (typeof self < "u") return self;
				if (typeof n$1 < "u") return n$1;
			}
			n$2(Za, "getGlobals");
			const un = Za();
			function Ka(e) {
				if (!(typeof e == "function" || typeof e == "object") || e.name !== "DOMException") return false;
				try {
					return new e(), !0;
				} catch {
					return false;
				}
			}
			n$2(Ka, "isDOMExceptionConstructor");
			function Ja() {
				const e = un?.DOMException;
				return Ka(e) ? e : void 0;
			}
			n$2(Ja, "getFromGlobal");
			function Xa() {
				const e = n$2(function(r, s) {
					this.message = r || "", this.name = s || "Error", Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
				}, "DOMException");
				return h(e, "DOMException"), e.prototype = Object.create(Error.prototype), Object.defineProperty(e.prototype, "constructor", {
					value: e,
					writable: true,
					configurable: true
				}), e;
			}
			n$2(Xa, "createPolyfill");
			const es = Ja() || Xa();
			function Ho(e, t, r, s, u, c) {
				const d = Qe(e), m = ko(t);
				e._disturbed = true;
				let R = false, y = T(void 0);
				return A((C, P) => {
					let B;
					if (c !== void 0) {
						if (B = n$2(() => {
							const _ = c.reason !== void 0 ? c.reason : new es("Aborted", "AbortError"), E = [];
							s || E.push(() => t._state === "writable" ? Kt(t, _) : T(void 0)), u || E.push(() => e._state === "readable" ? ie(e, _) : T(void 0)), N(() => Promise.all(E.map((k) => k())), true, _);
						}, "abortAlgorithm"), c.aborted) {
							B();
							return;
						}
						c.addEventListener("abort", B);
					}
					function ae() {
						return A((_, E) => {
							function k(Y) {
								Y ? _() : q(nt(), k, E);
							}
							n$2(k, "next"), k(false);
						});
					}
					n$2(ae, "pipeLoop");
					function nt() {
						return R ? T(true) : q(m._readyPromise, () => A((_, E) => {
							_t(d, {
								_chunkSteps: n$2((k) => {
									y = q(Fo(m, k), void 0, f), _(false);
								}, "_chunkSteps"),
								_closeSteps: n$2(() => _(true), "_closeSteps"),
								_errorSteps: E
							});
						}));
					}
					if (n$2(nt, "pipeStep"), Te(e, d._closedPromise, (_) => (s ? J(true, _) : N(() => Kt(t, _), true, _), null)), Te(t, m._closedPromise, (_) => (u ? J(true, _) : N(() => ie(e, _), true, _), null)), x(e, d._closedPromise, () => (r ? J() : N(() => ja(m)), null)), he(t) || t._state === "closed") {
						const _ = /* @__PURE__ */ new TypeError("the destination writable stream closed before all data could be piped to it");
						u ? J(true, _) : N(() => ie(e, _), true, _);
					}
					Q(ae());
					function Oe() {
						const _ = y;
						return q(y, () => _ !== y ? Oe() : void 0);
					}
					n$2(Oe, "waitForWritesToFinish");
					function Te(_, E, k) {
						_._state === "errored" ? k(_._storedError) : I(E, k);
					}
					n$2(Te, "isOrBecomesErrored");
					function x(_, E, k) {
						_._state === "closed" ? k() : V(E, k);
					}
					n$2(x, "isOrBecomesClosed");
					function N(_, E, k) {
						if (R) return;
						R = true, t._state === "writable" && !he(t) ? V(Oe(), Y) : Y();
						function Y() {
							return g(_(), () => Ce(E, k), (ot) => Ce(true, ot)), null;
						}
						n$2(Y, "doTheRest");
					}
					n$2(N, "shutdownWithAction");
					function J(_, E) {
						R || (R = true, t._state === "writable" && !he(t) ? V(Oe(), () => Ce(_, E)) : Ce(_, E));
					}
					n$2(J, "shutdown");
					function Ce(_, E) {
						return Io(m), _e(d), c !== void 0 && c.removeEventListener("abort", B), _ ? P(E) : C(void 0), null;
					}
					n$2(Ce, "finalize");
				});
			}
			n$2(Ho, "ReadableStreamPipeTo");
			const Cn = class Cn {
				constructor() {
					throw new TypeError("Illegal constructor");
				}
				get desiredSize() {
					if (!or(this)) throw ar("desiredSize");
					return fn(this);
				}
				close() {
					if (!or(this)) throw ar("close");
					if (!Je(this)) throw new TypeError("The stream is not in a state that permits close");
					De(this);
				}
				enqueue(t = void 0) {
					if (!or(this)) throw ar("enqueue");
					if (!Je(this)) throw new TypeError("The stream is not in a state that permits enqueue");
					return Ke(this, t);
				}
				error(t = void 0) {
					if (!or(this)) throw ar("error");
					oe(this, t);
				}
				[Ar](t) {
					Be(this);
					const r = this._cancelAlgorithm(t);
					return ir(this), r;
				}
				[Br](t) {
					const r = this._controlledReadableStream;
					if (this._queue.length > 0) {
						const s = xr(this);
						this._closeRequested && this._queue.length === 0 ? (ir(this), At(r)) : vt(this), t._chunkSteps(s);
					} else eo(r, t), vt(this);
				}
				[kr]() {}
			};
			n$2(Cn, "ReadableStreamDefaultController");
			let ne = Cn;
			Object.defineProperties(ne.prototype, {
				close: { enumerable: true },
				enqueue: { enumerable: true },
				error: { enumerable: true },
				desiredSize: { enumerable: true }
			}), h(ne.prototype.close, "close"), h(ne.prototype.enqueue, "enqueue"), h(ne.prototype.error, "error"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ne.prototype, Symbol.toStringTag, {
				value: "ReadableStreamDefaultController",
				configurable: true
			});
			function or(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledReadableStream") ? false : e instanceof ne;
			}
			n$2(or, "IsReadableStreamDefaultController");
			function vt(e) {
				if (!Vo(e)) return;
				if (e._pulling) {
					e._pullAgain = true;
					return;
				}
				e._pulling = true;
				g(e._pullAlgorithm(), () => (e._pulling = false, e._pullAgain && (e._pullAgain = false, vt(e)), null), (s) => (oe(e, s), null));
			}
			n$2(vt, "ReadableStreamDefaultControllerCallPullIfNeeded");
			function Vo(e) {
				const t = e._controlledReadableStream;
				return !Je(e) || !e._started ? false : !!(qe(t) && $t(t) > 0 || fn(e) > 0);
			}
			n$2(Vo, "ReadableStreamDefaultControllerShouldCallPull");
			function ir(e) {
				e._pullAlgorithm = void 0, e._cancelAlgorithm = void 0, e._strategySizeAlgorithm = void 0;
			}
			n$2(ir, "ReadableStreamDefaultControllerClearAlgorithms");
			function De(e) {
				if (!Je(e)) return;
				const t = e._controlledReadableStream;
				e._closeRequested = true, e._queue.length === 0 && (ir(e), At(t));
			}
			n$2(De, "ReadableStreamDefaultControllerClose");
			function Ke(e, t) {
				if (!Je(e)) return;
				const r = e._controlledReadableStream;
				if (qe(r) && $t(r) > 0) Lr(r, t, false);
				else {
					let s;
					try {
						s = e._strategySizeAlgorithm(t);
					} catch (u) {
						throw oe(e, u), u;
					}
					try {
						Nr(e, t, s);
					} catch (u) {
						throw oe(e, u), u;
					}
				}
				vt(e);
			}
			n$2(Ke, "ReadableStreamDefaultControllerEnqueue");
			function oe(e, t) {
				const r = e._controlledReadableStream;
				r._state === "readable" && (Be(e), ir(e), Zo(r, t));
			}
			n$2(oe, "ReadableStreamDefaultControllerError");
			function fn(e) {
				const t = e._controlledReadableStream._state;
				return t === "errored" ? null : t === "closed" ? 0 : e._strategyHWM - e._queueTotalSize;
			}
			n$2(fn, "ReadableStreamDefaultControllerGetDesiredSize");
			function ts(e) {
				return !Vo(e);
			}
			n$2(ts, "ReadableStreamDefaultControllerHasBackpressure");
			function Je(e) {
				const t = e._controlledReadableStream._state;
				return !e._closeRequested && t === "readable";
			}
			n$2(Je, "ReadableStreamDefaultControllerCanCloseOrEnqueue");
			function Qo(e, t, r, s, u, c, d) {
				t._controlledReadableStream = e, t._queue = void 0, t._queueTotalSize = void 0, Be(t), t._started = false, t._closeRequested = false, t._pullAgain = false, t._pulling = false, t._strategySizeAlgorithm = d, t._strategyHWM = c, t._pullAlgorithm = s, t._cancelAlgorithm = u, e._readableStreamController = t;
				g(T(r()), () => (t._started = true, vt(t), null), (R) => (oe(t, R), null));
			}
			n$2(Qo, "SetUpReadableStreamDefaultController");
			function rs(e, t, r, s) {
				const u = Object.create(ne.prototype);
				let c, d, m;
				t.start !== void 0 ? c = n$2(() => t.start(u), "startAlgorithm") : c = n$2(() => {}, "startAlgorithm"), t.pull !== void 0 ? d = n$2(() => t.pull(u), "pullAlgorithm") : d = n$2(() => T(void 0), "pullAlgorithm"), t.cancel !== void 0 ? m = n$2((R) => t.cancel(R), "cancelAlgorithm") : m = n$2(() => T(void 0), "cancelAlgorithm"), Qo(e, u, c, d, m, r, s);
			}
			n$2(rs, "SetUpReadableStreamDefaultControllerFromUnderlyingSource");
			function ar(e) {
				return /* @__PURE__ */ new TypeError(`ReadableStreamDefaultController.prototype.${e} can only be used on a ReadableStreamDefaultController`);
			}
			n$2(ar, "defaultControllerBrandCheckException$1");
			function ns(e, t) {
				return Ie(e._readableStreamController) ? is(e) : os(e);
			}
			n$2(ns, "ReadableStreamTee");
			function os(e, t) {
				const r = Qe(e);
				let s = false, u = false, c = false, d = false, m, R, y, C, P;
				const B = A((x) => {
					P = x;
				});
				function ae() {
					return s ? (u = true, T(void 0)) : (s = true, _t(r, {
						_chunkSteps: n$2((N) => {
							ge(() => {
								u = false;
								const J = N, Ce = N;
								c || Ke(y._readableStreamController, J), d || Ke(C._readableStreamController, Ce), s = false, u && ae();
							});
						}, "_chunkSteps"),
						_closeSteps: n$2(() => {
							s = false, c || De(y._readableStreamController), d || De(C._readableStreamController), (!c || !d) && P(void 0);
						}, "_closeSteps"),
						_errorSteps: n$2(() => {
							s = false;
						}, "_errorSteps")
					}), T(void 0));
				}
				n$2(ae, "pullAlgorithm");
				function nt(x) {
					if (c = true, m = x, d) {
						const J = ie(e, St([m, R]));
						P(J);
					}
					return B;
				}
				n$2(nt, "cancel1Algorithm");
				function Oe(x) {
					if (d = true, R = x, c) {
						const J = ie(e, St([m, R]));
						P(J);
					}
					return B;
				}
				n$2(Oe, "cancel2Algorithm");
				function Te() {}
				return n$2(Te, "startAlgorithm"), y = Et(Te, ae, nt), C = Et(Te, ae, Oe), I(r._closedPromise, (x) => (oe(y._readableStreamController, x), oe(C._readableStreamController, x), (!c || !d) && P(void 0), null)), [y, C];
			}
			n$2(os, "ReadableStreamDefaultTee");
			function is(e) {
				let t = Qe(e), r = false, s = false, u = false, c = false, d = false, m, R, y, C, P;
				const B = A((_) => {
					P = _;
				});
				function ae(_) {
					I(_._closedPromise, (E) => (_ !== t || (K(y._readableStreamController, E), K(C._readableStreamController, E), (!c || !d) && P(void 0)), null));
				}
				n$2(ae, "forwardReaderError");
				function nt() {
					je(t) && (_e(t), t = Qe(e), ae(t)), _t(t, {
						_chunkSteps: n$2((E) => {
							ge(() => {
								s = false, u = false;
								const k = E;
								let Y = E;
								if (!c && !d) try {
									Y = fo(E);
								} catch (ot) {
									K(y._readableStreamController, ot), K(C._readableStreamController, ot), P(ie(e, ot));
									return;
								}
								c || Ht(y._readableStreamController, k), d || Ht(C._readableStreamController, Y), r = false, s ? Te() : u && x();
							});
						}, "_chunkSteps"),
						_closeSteps: n$2(() => {
							r = false, c || wt(y._readableStreamController), d || wt(C._readableStreamController), y._readableStreamController._pendingPullIntos.length > 0 && Vt(y._readableStreamController, 0), C._readableStreamController._pendingPullIntos.length > 0 && Vt(C._readableStreamController, 0), (!c || !d) && P(void 0);
						}, "_closeSteps"),
						_errorSteps: n$2(() => {
							r = false;
						}, "_errorSteps")
					});
				}
				n$2(nt, "pullWithDefaultReader");
				function Oe(_, E) {
					Ee(t) && (_e(t), t = Co(e), ae(t));
					const k = E ? C : y, Y = E ? y : C;
					Eo(t, _, 1, {
						_chunkSteps: n$2((it) => {
							ge(() => {
								s = false, u = false;
								const at = E ? d : c;
								if (E ? c : d) at || Qt(k._readableStreamController, it);
								else {
									let ui;
									try {
										ui = fo(it);
									} catch (kn) {
										K(k._readableStreamController, kn), K(Y._readableStreamController, kn), P(ie(e, kn));
										return;
									}
									at || Qt(k._readableStreamController, it), Ht(Y._readableStreamController, ui);
								}
								r = false, s ? Te() : u && x();
							});
						}, "_chunkSteps"),
						_closeSteps: n$2((it) => {
							r = false;
							const at = E ? d : c, cr = E ? c : d;
							at || wt(k._readableStreamController), cr || wt(Y._readableStreamController), it !== void 0 && (at || Qt(k._readableStreamController, it), !cr && Y._readableStreamController._pendingPullIntos.length > 0 && Vt(Y._readableStreamController, 0)), (!at || !cr) && P(void 0);
						}, "_closeSteps"),
						_errorSteps: n$2(() => {
							r = false;
						}, "_errorSteps")
					});
				}
				n$2(Oe, "pullWithBYOBReader");
				function Te() {
					if (r) return s = true, T(void 0);
					r = true;
					const _ = Gr(y._readableStreamController);
					return _ === null ? nt() : Oe(_._view, false), T(void 0);
				}
				n$2(Te, "pull1Algorithm");
				function x() {
					if (r) return u = true, T(void 0);
					r = true;
					const _ = Gr(C._readableStreamController);
					return _ === null ? nt() : Oe(_._view, true), T(void 0);
				}
				n$2(x, "pull2Algorithm");
				function N(_) {
					if (c = true, m = _, d) {
						const k = ie(e, St([m, R]));
						P(k);
					}
					return B;
				}
				n$2(N, "cancel1Algorithm");
				function J(_) {
					if (d = true, R = _, c) {
						const k = ie(e, St([m, R]));
						P(k);
					}
					return B;
				}
				n$2(J, "cancel2Algorithm");
				function Ce() {}
				return n$2(Ce, "startAlgorithm"), y = Go(Ce, Te, N), C = Go(Ce, x, J), ae(t), [y, C];
			}
			n$2(is, "ReadableByteStreamTee");
			function as(e) {
				return l(e) && typeof e.getReader < "u";
			}
			n$2(as, "isReadableStreamLike");
			function ss(e) {
				return as(e) ? us(e.getReader()) : ls(e);
			}
			n$2(ss, "ReadableStreamFrom");
			function ls(e) {
				let t;
				const r = uo(e, "async"), s = f;
				function u() {
					let d;
					try {
						d = Xi(r);
					} catch (R) {
						return b(R);
					}
					return F(T(d), (R) => {
						if (!l(R)) throw new TypeError("The promise returned by the iterator.next() method must fulfill with an object");
						if (ea(R)) De(t._readableStreamController);
						else {
							const C = ta(R);
							Ke(t._readableStreamController, C);
						}
					});
				}
				n$2(u, "pullAlgorithm");
				function c(d) {
					const m = r.iterator;
					let R;
					try {
						R = Ut(m, "return");
					} catch (P) {
						return b(P);
					}
					if (R === void 0) return T(void 0);
					let y;
					try {
						y = z(R, m, [d]);
					} catch (P) {
						return b(P);
					}
					return F(T(y), (P) => {
						if (!l(P)) throw new TypeError("The promise returned by the iterator.return() method must fulfill with an object");
					});
				}
				return n$2(c, "cancelAlgorithm"), t = Et(s, u, c, 0), t;
			}
			n$2(ls, "ReadableStreamFromIterable");
			function us(e) {
				let t;
				const r = f;
				function s() {
					let c;
					try {
						c = e.read();
					} catch (d) {
						return b(d);
					}
					return F(c, (d) => {
						if (!l(d)) throw new TypeError("The promise returned by the reader.read() method must fulfill with an object");
						if (d.done) De(t._readableStreamController);
						else {
							const m = d.value;
							Ke(t._readableStreamController, m);
						}
					});
				}
				n$2(s, "pullAlgorithm");
				function u(c) {
					try {
						return T(e.cancel(c));
					} catch (d) {
						return b(d);
					}
				}
				return n$2(u, "cancelAlgorithm"), t = Et(r, s, u, 0), t;
			}
			n$2(us, "ReadableStreamFromDefaultReader");
			function fs(e, t) {
				ue(e, t);
				const r = e, s = r?.autoAllocateChunkSize, u = r?.cancel, c = r?.pull, d = r?.start, m = r?.type;
				return {
					autoAllocateChunkSize: s === void 0 ? void 0 : Fr(s, `${t} has member 'autoAllocateChunkSize' that`),
					cancel: u === void 0 ? void 0 : cs(u, r, `${t} has member 'cancel' that`),
					pull: c === void 0 ? void 0 : ds(c, r, `${t} has member 'pull' that`),
					start: d === void 0 ? void 0 : hs(d, r, `${t} has member 'start' that`),
					type: m === void 0 ? void 0 : ps(m, `${t} has member 'type' that`)
				};
			}
			n$2(fs, "convertUnderlyingDefaultOrByteSource");
			function cs(e, t, r) {
				return Z(e, r), (s) => j(e, t, [s]);
			}
			n$2(cs, "convertUnderlyingSourceCancelCallback");
			function ds(e, t, r) {
				return Z(e, r), (s) => j(e, t, [s]);
			}
			n$2(ds, "convertUnderlyingSourcePullCallback");
			function hs(e, t, r) {
				return Z(e, r), (s) => z(e, t, [s]);
			}
			n$2(hs, "convertUnderlyingSourceStartCallback");
			function ps(e, t) {
				if (e = `${e}`, e !== "bytes") throw new TypeError(`${t} '${e}' is not a valid enumeration value for ReadableStreamType`);
				return e;
			}
			n$2(ps, "convertReadableStreamType");
			function bs(e, t) {
				return ue(e, t), { preventCancel: !!e?.preventCancel };
			}
			n$2(bs, "convertIteratorOptions");
			function Yo(e, t) {
				ue(e, t);
				const r = e?.preventAbort, s = e?.preventCancel, u = e?.preventClose, c = e?.signal;
				return c !== void 0 && ms(c, `${t} has member 'signal' that`), {
					preventAbort: !!r,
					preventCancel: !!s,
					preventClose: !!u,
					signal: c
				};
			}
			n$2(Yo, "convertPipeOptions");
			function ms(e, t) {
				if (!Ca(e)) throw new TypeError(`${t} is not an AbortSignal.`);
			}
			n$2(ms, "assertAbortSignal");
			function ys(e, t) {
				ue(e, t);
				const r = e?.readable;
				zr(r, "readable", "ReadableWritablePair"), jr(r, `${t} has member 'readable' that`);
				const s = e?.writable;
				return zr(s, "writable", "ReadableWritablePair"), Bo(s, `${t} has member 'writable' that`), {
					readable: r,
					writable: s
				};
			}
			n$2(ys, "convertReadableWritablePair");
			const Pn = class Pn {
				constructor(t = {}, r = {}) {
					t === void 0 ? t = null : Jn(t, "First parameter");
					const s = Zt(r, "Second parameter"), u = fs(t, "First parameter");
					if (cn(this), u.type === "bytes") {
						if (s.size !== void 0) throw new RangeError("The strategy for a byte stream cannot have a size function");
						const c = Tt(s, 0);
						ca(this, u, c);
					} else {
						const c = Gt(s), d = Tt(s, 1);
						rs(this, u, d, c);
					}
				}
				get locked() {
					if (!We(this)) throw Me("locked");
					return qe(this);
				}
				cancel(t = void 0) {
					return We(this) ? qe(this) ? b(/* @__PURE__ */ new TypeError("Cannot cancel a stream that already has a reader")) : ie(this, t) : b(Me("cancel"));
				}
				getReader(t = void 0) {
					if (!We(this)) throw Me("getReader");
					return ha(t, "First parameter").mode === void 0 ? Qe(this) : Co(this);
				}
				pipeThrough(t, r = {}) {
					if (!We(this)) throw Me("pipeThrough");
					Se(t, 1, "pipeThrough");
					const s = ys(t, "First parameter"), u = Yo(r, "Second parameter");
					if (qe(this)) throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
					if (Ze(s.writable)) throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
					return Q(Ho(this, s.writable, u.preventClose, u.preventAbort, u.preventCancel, u.signal)), s.readable;
				}
				pipeTo(t, r = {}) {
					if (!We(this)) return b(Me("pipeTo"));
					if (t === void 0) return b("Parameter 1 is required in 'pipeTo'.");
					if (!Ge(t)) return b(/* @__PURE__ */ new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));
					let s;
					try {
						s = Yo(r, "Second parameter");
					} catch (u) {
						return b(u);
					}
					return qe(this) ? b(/* @__PURE__ */ new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream")) : Ze(t) ? b(/* @__PURE__ */ new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream")) : Ho(this, t, s.preventClose, s.preventAbort, s.preventCancel, s.signal);
				}
				tee() {
					if (!We(this)) throw Me("tee");
					return St(ns(this));
				}
				values(t = void 0) {
					if (!We(this)) throw Me("values");
					const r = bs(t, "First parameter");
					return Ki(this, r.preventCancel);
				}
				[Ur](t) {
					return this.values(t);
				}
				static from(t) {
					return ss(t);
				}
			};
			n$2(Pn, "ReadableStream");
			let L = Pn;
			Object.defineProperties(L, { from: { enumerable: true } }), Object.defineProperties(L.prototype, {
				cancel: { enumerable: true },
				getReader: { enumerable: true },
				pipeThrough: { enumerable: true },
				pipeTo: { enumerable: true },
				tee: { enumerable: true },
				values: { enumerable: true },
				locked: { enumerable: true }
			}), h(L.from, "from"), h(L.prototype.cancel, "cancel"), h(L.prototype.getReader, "getReader"), h(L.prototype.pipeThrough, "pipeThrough"), h(L.prototype.pipeTo, "pipeTo"), h(L.prototype.tee, "tee"), h(L.prototype.values, "values"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(L.prototype, Symbol.toStringTag, {
				value: "ReadableStream",
				configurable: true
			}), Object.defineProperty(L.prototype, Ur, {
				value: L.prototype.values,
				writable: true,
				configurable: true
			});
			function Et(e, t, r, s = 1, u = () => 1) {
				const c = Object.create(L.prototype);
				cn(c);
				return Qo(c, Object.create(ne.prototype), e, t, r, s, u), c;
			}
			n$2(Et, "CreateReadableStream");
			function Go(e, t, r) {
				const s = Object.create(L.prototype);
				cn(s);
				return To(s, Object.create(te.prototype), e, t, r, 0, void 0), s;
			}
			n$2(Go, "CreateReadableByteStream");
			function cn(e) {
				e._state = "readable", e._reader = void 0, e._storedError = void 0, e._disturbed = false;
			}
			n$2(cn, "InitializeReadableStream");
			function We(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_readableStreamController") ? false : e instanceof L;
			}
			n$2(We, "IsReadableStream");
			function qe(e) {
				return e._reader !== void 0;
			}
			n$2(qe, "IsReadableStreamLocked");
			function ie(e, t) {
				if (e._disturbed = true, e._state === "closed") return T(void 0);
				if (e._state === "errored") return b(e._storedError);
				At(e);
				const r = e._reader;
				if (r !== void 0 && je(r)) {
					const u = r._readIntoRequests;
					r._readIntoRequests = new D(), u.forEach((c) => {
						c._closeSteps(void 0);
					});
				}
				return F(e._readableStreamController[Ar](t), f);
			}
			n$2(ie, "ReadableStreamCancel");
			function At(e) {
				e._state = "closed";
				const t = e._reader;
				if (t !== void 0 && (Zn(t), Ee(t))) {
					const r = t._readRequests;
					t._readRequests = new D(), r.forEach((s) => {
						s._closeSteps();
					});
				}
			}
			n$2(At, "ReadableStreamClose");
			function Zo(e, t) {
				e._state = "errored", e._storedError = t;
				const r = e._reader;
				r !== void 0 && (Or(r, t), Ee(r) ? ro(r, t) : Ao(r, t));
			}
			n$2(Zo, "ReadableStreamError");
			function Me(e) {
				return /* @__PURE__ */ new TypeError(`ReadableStream.prototype.${e} can only be used on a ReadableStream`);
			}
			n$2(Me, "streamBrandCheckException$1");
			function Ko(e, t) {
				ue(e, t);
				const r = e?.highWaterMark;
				return zr(r, "highWaterMark", "QueuingStrategyInit"), { highWaterMark: Ir(r) };
			}
			n$2(Ko, "convertQueuingStrategyInit");
			const Jo = n$2((e) => e.byteLength, "byteLengthSizeFunction");
			h(Jo, "size");
			const vn = class vn {
				constructor(t) {
					Se(t, 1, "ByteLengthQueuingStrategy"), t = Ko(t, "First parameter"), this._byteLengthQueuingStrategyHighWaterMark = t.highWaterMark;
				}
				get highWaterMark() {
					if (!ei(this)) throw Xo("highWaterMark");
					return this._byteLengthQueuingStrategyHighWaterMark;
				}
				get size() {
					if (!ei(this)) throw Xo("size");
					return Jo;
				}
			};
			n$2(vn, "ByteLengthQueuingStrategy");
			let Xe = vn;
			Object.defineProperties(Xe.prototype, {
				highWaterMark: { enumerable: true },
				size: { enumerable: true }
			}), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Xe.prototype, Symbol.toStringTag, {
				value: "ByteLengthQueuingStrategy",
				configurable: true
			});
			function Xo(e) {
				return /* @__PURE__ */ new TypeError(`ByteLengthQueuingStrategy.prototype.${e} can only be used on a ByteLengthQueuingStrategy`);
			}
			n$2(Xo, "byteLengthBrandCheckException");
			function ei(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_byteLengthQueuingStrategyHighWaterMark") ? false : e instanceof Xe;
			}
			n$2(ei, "IsByteLengthQueuingStrategy");
			const ti = n$2(() => 1, "countSizeFunction");
			h(ti, "size");
			const En = class En {
				constructor(t) {
					Se(t, 1, "CountQueuingStrategy"), t = Ko(t, "First parameter"), this._countQueuingStrategyHighWaterMark = t.highWaterMark;
				}
				get highWaterMark() {
					if (!ni(this)) throw ri("highWaterMark");
					return this._countQueuingStrategyHighWaterMark;
				}
				get size() {
					if (!ni(this)) throw ri("size");
					return ti;
				}
			};
			n$2(En, "CountQueuingStrategy");
			let et = En;
			Object.defineProperties(et.prototype, {
				highWaterMark: { enumerable: true },
				size: { enumerable: true }
			}), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(et.prototype, Symbol.toStringTag, {
				value: "CountQueuingStrategy",
				configurable: true
			});
			function ri(e) {
				return /* @__PURE__ */ new TypeError(`CountQueuingStrategy.prototype.${e} can only be used on a CountQueuingStrategy`);
			}
			n$2(ri, "countBrandCheckException");
			function ni(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_countQueuingStrategyHighWaterMark") ? false : e instanceof et;
			}
			n$2(ni, "IsCountQueuingStrategy");
			function gs(e, t) {
				ue(e, t);
				const r = e?.cancel, s = e?.flush, u = e?.readableType, c = e?.start, d = e?.transform, m = e?.writableType;
				return {
					cancel: r === void 0 ? void 0 : Rs(r, e, `${t} has member 'cancel' that`),
					flush: s === void 0 ? void 0 : _s(s, e, `${t} has member 'flush' that`),
					readableType: u,
					start: c === void 0 ? void 0 : Ss(c, e, `${t} has member 'start' that`),
					transform: d === void 0 ? void 0 : ws(d, e, `${t} has member 'transform' that`),
					writableType: m
				};
			}
			n$2(gs, "convertTransformer");
			function _s(e, t, r) {
				return Z(e, r), (s) => j(e, t, [s]);
			}
			n$2(_s, "convertTransformerFlushCallback");
			function Ss(e, t, r) {
				return Z(e, r), (s) => z(e, t, [s]);
			}
			n$2(Ss, "convertTransformerStartCallback");
			function ws(e, t, r) {
				return Z(e, r), (s, u) => j(e, t, [s, u]);
			}
			n$2(ws, "convertTransformerTransformCallback");
			function Rs(e, t, r) {
				return Z(e, r), (s) => j(e, t, [s]);
			}
			n$2(Rs, "convertTransformerCancelCallback");
			const An = class An {
				constructor(t = {}, r = {}, s = {}) {
					t === void 0 && (t = null);
					const u = Zt(r, "Second parameter"), c = Zt(s, "Third parameter"), d = gs(t, "First parameter");
					if (d.readableType !== void 0) throw new RangeError("Invalid readableType specified");
					if (d.writableType !== void 0) throw new RangeError("Invalid writableType specified");
					const m = Tt(c, 0), R = Gt(c), y = Tt(u, 1), C = Gt(u);
					let P;
					const B = A((ae) => {
						P = ae;
					});
					Ts(this, B, y, C, m, R), Ps(this, d), d.start !== void 0 ? P(d.start(this._transformStreamController)) : P(void 0);
				}
				get readable() {
					if (!oi(this)) throw li("readable");
					return this._readable;
				}
				get writable() {
					if (!oi(this)) throw li("writable");
					return this._writable;
				}
			};
			n$2(An, "TransformStream");
			let tt = An;
			Object.defineProperties(tt.prototype, {
				readable: { enumerable: true },
				writable: { enumerable: true }
			}), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(tt.prototype, Symbol.toStringTag, {
				value: "TransformStream",
				configurable: true
			});
			function Ts(e, t, r, s, u, c) {
				function d() {
					return t;
				}
				n$2(d, "startAlgorithm");
				function m(B) {
					return As(e, B);
				}
				n$2(m, "writeAlgorithm");
				function R(B) {
					return Bs(e, B);
				}
				n$2(R, "abortAlgorithm");
				function y() {
					return ks(e);
				}
				n$2(y, "closeAlgorithm"), e._writable = Ea(d, m, y, R, r, s);
				function C() {
					return Ws(e);
				}
				n$2(C, "pullAlgorithm");
				function P(B) {
					return qs(e, B);
				}
				n$2(P, "cancelAlgorithm"), e._readable = Et(d, C, P, u, c), e._backpressure = void 0, e._backpressureChangePromise = void 0, e._backpressureChangePromise_resolve = void 0, sr(e, true), e._transformStreamController = void 0;
			}
			n$2(Ts, "InitializeTransformStream");
			function oi(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_transformStreamController") ? false : e instanceof tt;
			}
			n$2(oi, "IsTransformStream");
			function ii(e, t) {
				oe(e._readable._readableStreamController, t), dn(e, t);
			}
			n$2(ii, "TransformStreamError");
			function dn(e, t) {
				ur(e._transformStreamController), Ct(e._writable._writableStreamController, t), hn(e);
			}
			n$2(dn, "TransformStreamErrorWritableAndUnblockWrite");
			function hn(e) {
				e._backpressure && sr(e, false);
			}
			n$2(hn, "TransformStreamUnblockWrite");
			function sr(e, t) {
				e._backpressureChangePromise !== void 0 && e._backpressureChangePromise_resolve(), e._backpressureChangePromise = A((r) => {
					e._backpressureChangePromise_resolve = r;
				}), e._backpressure = t;
			}
			n$2(sr, "TransformStreamSetBackpressure");
			const Bn = class Bn {
				constructor() {
					throw new TypeError("Illegal constructor");
				}
				get desiredSize() {
					if (!lr(this)) throw fr("desiredSize");
					const t = this._controlledTransformStream._readable._readableStreamController;
					return fn(t);
				}
				enqueue(t = void 0) {
					if (!lr(this)) throw fr("enqueue");
					ai(this, t);
				}
				error(t = void 0) {
					if (!lr(this)) throw fr("error");
					vs(this, t);
				}
				terminate() {
					if (!lr(this)) throw fr("terminate");
					Es(this);
				}
			};
			n$2(Bn, "TransformStreamDefaultController");
			let pe = Bn;
			Object.defineProperties(pe.prototype, {
				enqueue: { enumerable: true },
				error: { enumerable: true },
				terminate: { enumerable: true },
				desiredSize: { enumerable: true }
			}), h(pe.prototype.enqueue, "enqueue"), h(pe.prototype.error, "error"), h(pe.prototype.terminate, "terminate"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(pe.prototype, Symbol.toStringTag, {
				value: "TransformStreamDefaultController",
				configurable: true
			});
			function lr(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledTransformStream") ? false : e instanceof pe;
			}
			n$2(lr, "IsTransformStreamDefaultController");
			function Cs(e, t, r, s, u) {
				t._controlledTransformStream = e, e._transformStreamController = t, t._transformAlgorithm = r, t._flushAlgorithm = s, t._cancelAlgorithm = u, t._finishPromise = void 0, t._finishPromise_resolve = void 0, t._finishPromise_reject = void 0;
			}
			n$2(Cs, "SetUpTransformStreamDefaultController");
			function Ps(e, t) {
				const r = Object.create(pe.prototype);
				let s, u, c;
				t.transform !== void 0 ? s = n$2((d) => t.transform(d, r), "transformAlgorithm") : s = n$2((d) => {
					try {
						return ai(r, d), T(void 0);
					} catch (m) {
						return b(m);
					}
				}, "transformAlgorithm"), t.flush !== void 0 ? u = n$2(() => t.flush(r), "flushAlgorithm") : u = n$2(() => T(void 0), "flushAlgorithm"), t.cancel !== void 0 ? c = n$2((d) => t.cancel(d), "cancelAlgorithm") : c = n$2(() => T(void 0), "cancelAlgorithm"), Cs(e, r, s, u, c);
			}
			n$2(Ps, "SetUpTransformStreamDefaultControllerFromTransformer");
			function ur(e) {
				e._transformAlgorithm = void 0, e._flushAlgorithm = void 0, e._cancelAlgorithm = void 0;
			}
			n$2(ur, "TransformStreamDefaultControllerClearAlgorithms");
			function ai(e, t) {
				const r = e._controlledTransformStream, s = r._readable._readableStreamController;
				if (!Je(s)) throw new TypeError("Readable side is not in a state that permits enqueue");
				try {
					Ke(s, t);
				} catch (c) {
					throw dn(r, c), r._readable._storedError;
				}
				ts(s) !== r._backpressure && sr(r, true);
			}
			n$2(ai, "TransformStreamDefaultControllerEnqueue");
			function vs(e, t) {
				ii(e._controlledTransformStream, t);
			}
			n$2(vs, "TransformStreamDefaultControllerError");
			function si(e, t) {
				return F(e._transformAlgorithm(t), void 0, (s) => {
					throw ii(e._controlledTransformStream, s), s;
				});
			}
			n$2(si, "TransformStreamDefaultControllerPerformTransform");
			function Es(e) {
				const t = e._controlledTransformStream, r = t._readable._readableStreamController;
				De(r);
				dn(t, /* @__PURE__ */ new TypeError("TransformStream terminated"));
			}
			n$2(Es, "TransformStreamDefaultControllerTerminate");
			function As(e, t) {
				const r = e._transformStreamController;
				if (e._backpressure) {
					const s = e._backpressureChangePromise;
					return F(s, () => {
						const u = e._writable;
						if (u._state === "erroring") throw u._storedError;
						return si(r, t);
					});
				}
				return si(r, t);
			}
			n$2(As, "TransformStreamDefaultSinkWriteAlgorithm");
			function Bs(e, t) {
				const r = e._transformStreamController;
				if (r._finishPromise !== void 0) return r._finishPromise;
				const s = e._readable;
				r._finishPromise = A((c, d) => {
					r._finishPromise_resolve = c, r._finishPromise_reject = d;
				});
				const u = r._cancelAlgorithm(t);
				return ur(r), g(u, () => (s._state === "errored" ? rt(r, s._storedError) : (oe(s._readableStreamController, t), pn(r)), null), (c) => (oe(s._readableStreamController, c), rt(r, c), null)), r._finishPromise;
			}
			n$2(Bs, "TransformStreamDefaultSinkAbortAlgorithm");
			function ks(e) {
				const t = e._transformStreamController;
				if (t._finishPromise !== void 0) return t._finishPromise;
				const r = e._readable;
				t._finishPromise = A((u, c) => {
					t._finishPromise_resolve = u, t._finishPromise_reject = c;
				});
				const s = t._flushAlgorithm();
				return ur(t), g(s, () => (r._state === "errored" ? rt(t, r._storedError) : (De(r._readableStreamController), pn(t)), null), (u) => (oe(r._readableStreamController, u), rt(t, u), null)), t._finishPromise;
			}
			n$2(ks, "TransformStreamDefaultSinkCloseAlgorithm");
			function Ws(e) {
				return sr(e, false), e._backpressureChangePromise;
			}
			n$2(Ws, "TransformStreamDefaultSourcePullAlgorithm");
			function qs(e, t) {
				const r = e._transformStreamController;
				if (r._finishPromise !== void 0) return r._finishPromise;
				const s = e._writable;
				r._finishPromise = A((c, d) => {
					r._finishPromise_resolve = c, r._finishPromise_reject = d;
				});
				const u = r._cancelAlgorithm(t);
				return ur(r), g(u, () => (s._state === "errored" ? rt(r, s._storedError) : (Ct(s._writableStreamController, t), hn(e), pn(r)), null), (c) => (Ct(s._writableStreamController, c), hn(e), rt(r, c), null)), r._finishPromise;
			}
			n$2(qs, "TransformStreamDefaultSourceCancelAlgorithm");
			function fr(e) {
				return /* @__PURE__ */ new TypeError(`TransformStreamDefaultController.prototype.${e} can only be used on a TransformStreamDefaultController`);
			}
			n$2(fr, "defaultControllerBrandCheckException");
			function pn(e) {
				e._finishPromise_resolve !== void 0 && (e._finishPromise_resolve(), e._finishPromise_resolve = void 0, e._finishPromise_reject = void 0);
			}
			n$2(pn, "defaultControllerFinishPromiseResolve");
			function rt(e, t) {
				e._finishPromise_reject !== void 0 && (Q(e._finishPromise), e._finishPromise_reject(t), e._finishPromise_resolve = void 0, e._finishPromise_reject = void 0);
			}
			n$2(rt, "defaultControllerFinishPromiseReject");
			function li(e) {
				return /* @__PURE__ */ new TypeError(`TransformStream.prototype.${e} can only be used on a TransformStream`);
			}
			n$2(li, "streamBrandCheckException"), a.ByteLengthQueuingStrategy = Xe, a.CountQueuingStrategy = et, a.ReadableByteStreamController = te, a.ReadableStream = L, a.ReadableStreamBYOBReader = ce, a.ReadableStreamBYOBRequest = Re, a.ReadableStreamDefaultController = ne, a.ReadableStreamDefaultReader = fe, a.TransformStream = tt, a.TransformStreamDefaultController = pe, a.WritableStream = de, a.WritableStreamDefaultController = ke, a.WritableStreamDefaultWriter = re;
		});
	}(kt, kt.exports)), kt.exports;
}
n$2(Ns, "requirePonyfill_es2018");
var mi;
function Hs() {
	if (mi) return pi;
	mi = 1;
	const i = 65536;
	if (!globalThis.ReadableStream) try {
		const o = __require("node:process"), { emitWarning: a } = o;
		try {
			o.emitWarning = () => {}, Object.assign(globalThis, __require("node:stream/web")), o.emitWarning = a;
		} catch (f) {
			throw o.emitWarning = a, f;
		}
	} catch {
		Object.assign(globalThis, Ns());
	}
	try {
		const { Blob: o } = __require("buffer");
		o && !o.prototype.stream && (o.prototype.stream = n$2(function(f) {
			let l = 0;
			const p = this;
			return new ReadableStream({
				type: "bytes",
				async pull(h) {
					const v = await p.slice(l, Math.min(p.size, l + i)).arrayBuffer();
					l += v.byteLength, h.enqueue(new Uint8Array(v)), l === p.size && h.close();
				}
			});
		}, "name"));
	} catch {}
	return pi;
}
n$2(Hs, "requireStreams"), Hs();
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */ var yi = 65536;
async function* Wn(i, o = true) {
	for (const a of i) if ("stream" in a) yield* a.stream();
	else if (ArrayBuffer.isView(a)) if (o) {
		let f = a.byteOffset;
		const l = a.byteOffset + a.byteLength;
		for (; f !== l;) {
			const p = Math.min(l - f, yi), h = a.buffer.slice(f, f + p);
			f += h.byteLength, yield new Uint8Array(h);
		}
	} else yield a;
	else {
		let f = 0, l = a;
		for (; f !== l.size;) {
			const h = await l.slice(f, Math.min(l.size, f + yi)).arrayBuffer();
			f += h.byteLength, yield new Uint8Array(h);
		}
	}
}
n$2(Wn, "toIterator");
var gi = (ze = class {
	constructor(o = [], a = {}) {
		be(this, ve, []);
		be(this, zt, "");
		be(this, bt, 0);
		be(this, Cr, "transparent");
		if (typeof o != "object" || o === null) throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
		if (typeof o[Symbol.iterator] != "function") throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
		if (typeof a != "object" && typeof a != "function") throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
		a === null && (a = {});
		const f = new TextEncoder();
		for (const p of o) {
			let h;
			ArrayBuffer.isView(p) ? h = new Uint8Array(p.buffer.slice(p.byteOffset, p.byteOffset + p.byteLength)) : p instanceof ArrayBuffer ? h = new Uint8Array(p.slice(0)) : p instanceof ze ? h = p : h = f.encode(`${p}`), X(this, bt, O(this, bt) + (ArrayBuffer.isView(h) ? h.byteLength : h.size)), O(this, ve).push(h);
		}
		X(this, Cr, `${a.endings === void 0 ? "transparent" : a.endings}`);
		const l = a.type === void 0 ? "" : String(a.type);
		X(this, zt, /^[\x20-\x7E]*$/.test(l) ? l : "");
	}
	get size() {
		return O(this, bt);
	}
	get type() {
		return O(this, zt);
	}
	async text() {
		const o = new TextDecoder();
		let a = "";
		for await (const f of Wn(O(this, ve), false)) a += o.decode(f, { stream: true });
		return a += o.decode(), a;
	}
	async arrayBuffer() {
		const o = new Uint8Array(this.size);
		let a = 0;
		for await (const f of Wn(O(this, ve), false)) o.set(f, a), a += f.length;
		return o.buffer;
	}
	stream() {
		const o = Wn(O(this, ve), true);
		return new globalThis.ReadableStream({
			type: "bytes",
			async pull(a) {
				const f = await o.next();
				f.done ? a.close() : a.enqueue(f.value);
			},
			async cancel() {
				await o.return();
			}
		});
	}
	slice(o = 0, a = this.size, f = "") {
		const { size: l } = this;
		let p = o < 0 ? Math.max(l + o, 0) : Math.min(o, l), h = a < 0 ? Math.max(l + a, 0) : Math.min(a, l);
		const S = Math.max(h - p, 0), v = O(this, ve), w = [];
		let A = 0;
		for (const b of v) {
			if (A >= S) break;
			const q = ArrayBuffer.isView(b) ? b.byteLength : b.size;
			if (p && q <= p) p -= q, h -= q;
			else {
				let g;
				ArrayBuffer.isView(b) ? (g = b.subarray(p, Math.min(q, h)), A += g.byteLength) : (g = b.slice(p, Math.min(q, h)), A += g.size), h -= q, w.push(g), p = 0;
			}
		}
		const T = new ze([], { type: String(f).toLowerCase() });
		return X(T, bt, S), X(T, ve, w), T;
	}
	get [Symbol.toStringTag]() {
		return "Blob";
	}
	static [Symbol.hasInstance](o) {
		return o && typeof o == "object" && typeof o.constructor == "function" && (typeof o.stream == "function" || typeof o.arrayBuffer == "function") && /^(Blob|File)$/.test(o[Symbol.toStringTag]);
	}
}, ve = /* @__PURE__ */ new WeakMap(), zt = /* @__PURE__ */ new WeakMap(), bt = /* @__PURE__ */ new WeakMap(), Cr = /* @__PURE__ */ new WeakMap(), n$2(ze, "Blob"), ze);
Object.defineProperties(gi.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});
var ut = gi;
var qn = (mt = class extends ut {
	constructor(a, f, l = {}) {
		if (arguments.length < 2) throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
		super(a, l);
		be(this, It, 0);
		be(this, Ft, "");
		l === null && (l = {});
		const p = l.lastModified === void 0 ? Date.now() : Number(l.lastModified);
		Number.isNaN(p) || X(this, It, p), X(this, Ft, String(f));
	}
	get name() {
		return O(this, Ft);
	}
	get lastModified() {
		return O(this, It);
	}
	get [Symbol.toStringTag]() {
		return "File";
	}
	static [Symbol.hasInstance](a) {
		return !!a && a instanceof ut && /^(File)$/.test(a[Symbol.toStringTag]);
	}
}, It = /* @__PURE__ */ new WeakMap(), Ft = /* @__PURE__ */ new WeakMap(), n$2(mt, "File"), mt);
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */ var { toStringTag: Wt, iterator: Qs, hasInstance: Ys } = Symbol, _i = Math.random, Gs = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(","), Si = n$2((i, o, a) => (i += "", /^(Blob|File)$/.test(o && o[Wt]) ? [(a = a !== void 0 ? a + "" : o[Wt] == "File" ? o.name : "blob", i), o.name !== a || o[Wt] == "blob" ? new qn([o], a, o) : o] : [i, o + ""]), "f"), On = n$2((i, o) => (o ? i : i.replace(/\r?\n|\r/g, `\r
`)).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22"), "e$1"), Ue = n$2((i, o, a) => {
	if (o.length < a) throw new TypeError(`Failed to execute '${i}' on 'FormData': ${a} arguments required, but only ${o.length} present.`);
}, "x");
var br = (yt = class {
	constructor(...o) {
		be(this, ee, []);
		if (o.length) throw new TypeError("Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.");
	}
	get [Wt]() {
		return "FormData";
	}
	[Qs]() {
		return this.entries();
	}
	static [Ys](o) {
		return o && typeof o == "object" && o[Wt] === "FormData" && !Gs.some((a) => typeof o[a] != "function");
	}
	append(...o) {
		Ue("append", arguments, 2), O(this, ee).push(Si(...o));
	}
	delete(o) {
		Ue("delete", arguments, 1), o += "", X(this, ee, O(this, ee).filter(([a]) => a !== o));
	}
	get(o) {
		Ue("get", arguments, 1), o += "";
		for (var a = O(this, ee), f = a.length, l = 0; l < f; l++) if (a[l][0] === o) return a[l][1];
		return null;
	}
	getAll(o, a) {
		return Ue("getAll", arguments, 1), a = [], o += "", O(this, ee).forEach((f) => f[0] === o && a.push(f[1])), a;
	}
	has(o) {
		return Ue("has", arguments, 1), o += "", O(this, ee).some((a) => a[0] === o);
	}
	forEach(o, a) {
		Ue("forEach", arguments, 1);
		for (var [f, l] of this) o.call(a, l, f, this);
	}
	set(...o) {
		Ue("set", arguments, 2);
		var a = [], f = true;
		o = Si(...o), O(this, ee).forEach((l) => {
			l[0] === o[0] ? f && (f = !a.push(o)) : a.push(l);
		}), f && a.push(o), X(this, ee, a);
	}
	*entries() {
		yield* O(this, ee);
	}
	*keys() {
		for (var [o] of this) yield o;
	}
	*values() {
		for (var [, o] of this) yield o;
	}
}, ee = /* @__PURE__ */ new WeakMap(), n$2(yt, "FormData"), yt);
function Zs(i, o = ut) {
	var a = `${_i()}${_i()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), f = [], l = `--${a}\r
Content-Disposition: form-data; name="`;
	return i.forEach((p, h) => typeof p == "string" ? f.push(l + On(h) + `"\r
\r
${p.replace(/\r(?!\n)|(?<!\r)\n/g, `\r
`)}\r
`) : f.push(l + On(h) + `"; filename="${On(p.name, 1)}"\r
Content-Type: ${p.type || "application/octet-stream"}\r
\r
`, p, `\r
`)), f.push(`--${a}--`), new o(f, { type: "multipart/form-data; boundary=" + a });
}
n$2(Zs, "formDataToBlob");
var Un = class Un extends Error {
	constructor(o, a) {
		super(o), Error.captureStackTrace(this, this.constructor), this.type = a;
	}
	get name() {
		return this.constructor.name;
	}
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
};
n$2(Un, "FetchBaseError");
var ft = Un;
var xn = class xn extends ft {
	constructor(o, a, f) {
		super(o, a), f && (this.code = this.errno = f.code, this.erroredSysCall = f.syscall);
	}
};
n$2(xn, "FetchError");
var G = xn;
var mr = Symbol.toStringTag;
var wi = n$2((i) => typeof i == "object" && typeof i.append == "function" && typeof i.delete == "function" && typeof i.get == "function" && typeof i.getAll == "function" && typeof i.has == "function" && typeof i.set == "function" && typeof i.sort == "function" && i[mr] === "URLSearchParams", "isURLSearchParameters");
var yr = n$2((i) => i && typeof i == "object" && typeof i.arrayBuffer == "function" && typeof i.type == "string" && typeof i.stream == "function" && typeof i.constructor == "function" && /^(Blob|File)$/.test(i[mr]), "isBlob");
var Ks = n$2((i) => typeof i == "object" && (i[mr] === "AbortSignal" || i[mr] === "EventTarget"), "isAbortSignal");
var Js = n$2((i, o) => {
	const a = new URL(o).hostname, f = new URL(i).hostname;
	return a === f || a.endsWith(`.${f}`);
}, "isDomainOrSubdomain");
var Xs = n$2((i, o) => {
	return new URL(o).protocol === new URL(i).protocol;
}, "isSameProtocol");
var el = promisify(me.pipeline);
var H = Symbol("Body internals");
var Nn = class Nn {
	constructor(o, { size: a = 0 } = {}) {
		let f = null;
		o === null ? o = null : wi(o) ? o = Buffer$1.from(o.toString()) : yr(o) || Buffer$1.isBuffer(o) || (types.isAnyArrayBuffer(o) ? o = Buffer$1.from(o) : ArrayBuffer.isView(o) ? o = Buffer$1.from(o.buffer, o.byteOffset, o.byteLength) : o instanceof me || (o instanceof br ? (o = Zs(o), f = o.type.split("=")[1]) : o = Buffer$1.from(String(o))));
		let l = o;
		Buffer$1.isBuffer(o) ? l = me.Readable.from(o) : yr(o) && (l = me.Readable.from(o.stream())), this[H] = {
			body: o,
			stream: l,
			boundary: f,
			disturbed: false,
			error: null
		}, this.size = a, o instanceof me && o.on("error", (p) => {
			const h = p instanceof ft ? p : new G(`Invalid response body while trying to fetch ${this.url}: ${p.message}`, "system", p);
			this[H].error = h;
		});
	}
	get body() {
		return this[H].stream;
	}
	get bodyUsed() {
		return this[H].disturbed;
	}
	async arrayBuffer() {
		const { buffer: o, byteOffset: a, byteLength: f } = await zn(this);
		return o.slice(a, a + f);
	}
	async formData() {
		const o = this.headers.get("content-type");
		if (o.startsWith("application/x-www-form-urlencoded")) {
			const f = new br(), l = new URLSearchParams(await this.text());
			for (const [p, h] of l) f.append(p, h);
			return f;
		}
		const { toFormData: a } = await import('../build/multipart-parser-Ch7pKQI9.mjs');
		return a(this.body, o);
	}
	async blob() {
		const o = this.headers && this.headers.get("content-type") || this[H].body && this[H].body.type || "";
		return new ut([await this.arrayBuffer()], { type: o });
	}
	async json() {
		const o = await this.text();
		return JSON.parse(o);
	}
	async text() {
		const o = await zn(this);
		return new TextDecoder().decode(o);
	}
	buffer() {
		return zn(this);
	}
};
n$2(Nn, "Body");
var xe = Nn;
xe.prototype.buffer = deprecate(xe.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer"), Object.defineProperties(xe.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true },
	data: { get: deprecate(() => {}, "data doesn't exist, use json(), text(), arrayBuffer(), or body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (response)") }
});
async function zn(i) {
	if (i[H].disturbed) throw new TypeError(`body used already for: ${i.url}`);
	if (i[H].disturbed = true, i[H].error) throw i[H].error;
	const { body: o } = i;
	if (o === null) return Buffer$1.alloc(0);
	if (!(o instanceof me)) return Buffer$1.alloc(0);
	const a = [];
	let f = 0;
	try {
		for await (const l of o) {
			if (i.size > 0 && f + l.length > i.size) {
				const p = new G(`content size at ${i.url} over limit: ${i.size}`, "max-size");
				throw o.destroy(p), p;
			}
			f += l.length, a.push(l);
		}
	} catch (l) {
		throw l instanceof ft ? l : new G(`Invalid response body while trying to fetch ${i.url}: ${l.message}`, "system", l);
	}
	if (o.readableEnded === true || o._readableState.ended === true) try {
		return a.every((l) => typeof l == "string") ? Buffer$1.from(a.join("")) : Buffer$1.concat(a, f);
	} catch (l) {
		throw new G(`Could not create Buffer from response body for ${i.url}: ${l.message}`, "system", l);
	}
	else throw new G(`Premature close of server response while trying to fetch ${i.url}`);
}
n$2(zn, "consumeBody");
var In = n$2((i, o) => {
	let a, f, { body: l } = i[H];
	if (i.bodyUsed) throw new Error("cannot clone body after it is used");
	return l instanceof me && typeof l.getBoundary != "function" && (a = new PassThrough({ highWaterMark: o }), f = new PassThrough({ highWaterMark: o }), l.pipe(a), l.pipe(f), i[H].stream = a, l = f), l;
}, "clone");
var tl = deprecate((i) => i.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
var Ri = n$2((i, o) => i === null ? null : typeof i == "string" ? "text/plain;charset=UTF-8" : wi(i) ? "application/x-www-form-urlencoded;charset=UTF-8" : yr(i) ? i.type || null : Buffer$1.isBuffer(i) || types.isAnyArrayBuffer(i) || ArrayBuffer.isView(i) ? null : i instanceof br ? `multipart/form-data; boundary=${o[H].boundary}` : i && typeof i.getBoundary == "function" ? `multipart/form-data;boundary=${tl(i)}` : i instanceof me ? null : "text/plain;charset=UTF-8", "extractContentType");
var rl = n$2((i) => {
	const { body: o } = i[H];
	return o === null ? 0 : yr(o) ? o.size : Buffer$1.isBuffer(o) ? o.length : o && typeof o.getLengthSync == "function" && o.hasKnownLength && o.hasKnownLength() ? o.getLengthSync() : null;
}, "getTotalBytes");
var nl = n$2(async (i, { body: o }) => {
	o === null ? i.end() : await el(o, i);
}, "writeToStream");
var gr = typeof Bt.validateHeaderName == "function" ? Bt.validateHeaderName : (i) => {
	if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(i)) {
		const o = /* @__PURE__ */ new TypeError(`Header name must be a valid HTTP token [${i}]`);
		throw Object.defineProperty(o, "code", { value: "ERR_INVALID_HTTP_TOKEN" }), o;
	}
};
var Fn = typeof Bt.validateHeaderValue == "function" ? Bt.validateHeaderValue : (i, o) => {
	if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(o)) {
		const a = /* @__PURE__ */ new TypeError(`Invalid character in header content ["${i}"]`);
		throw Object.defineProperty(a, "code", { value: "ERR_INVALID_CHAR" }), a;
	}
};
var Pr = class Pr extends URLSearchParams {
	constructor(o) {
		let a = [];
		if (o instanceof Pr) {
			const f = o.raw();
			for (const [l, p] of Object.entries(f)) a.push(...p.map((h) => [l, h]));
		} else if (o != null) if (typeof o == "object" && !types.isBoxedPrimitive(o)) {
			const f = o[Symbol.iterator];
			if (f == null) a.push(...Object.entries(o));
			else {
				if (typeof f != "function") throw new TypeError("Header pairs must be iterable");
				a = [...o].map((l) => {
					if (typeof l != "object" || types.isBoxedPrimitive(l)) throw new TypeError("Each header pair must be an iterable object");
					return [...l];
				}).map((l) => {
					if (l.length !== 2) throw new TypeError("Each header pair must be a name/value tuple");
					return [...l];
				});
			}
		} else throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
		return a = a.length > 0 ? a.map(([f, l]) => (gr(f), Fn(f, String(l)), [String(f).toLowerCase(), String(l)])) : void 0, super(a), new Proxy(this, { get(f, l, p) {
			switch (l) {
				case "append":
				case "set": return (h, S) => (gr(h), Fn(h, String(S)), URLSearchParams.prototype[l].call(f, String(h).toLowerCase(), String(S)));
				case "delete":
				case "has":
				case "getAll": return (h) => (gr(h), URLSearchParams.prototype[l].call(f, String(h).toLowerCase()));
				case "keys": return () => (f.sort(), new Set(URLSearchParams.prototype.keys.call(f)).keys());
				default: return Reflect.get(f, l, p);
			}
		} });
	}
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
	toString() {
		return Object.prototype.toString.call(this);
	}
	get(o) {
		const a = this.getAll(o);
		if (a.length === 0) return null;
		let f = a.join(", ");
		return /^content-encoding$/i.test(o) && (f = f.toLowerCase()), f;
	}
	forEach(o, a = void 0) {
		for (const f of this.keys()) Reflect.apply(o, a, [
			this.get(f),
			f,
			this
		]);
	}
	*values() {
		for (const o of this.keys()) yield this.get(o);
	}
	*entries() {
		for (const o of this.keys()) yield [o, this.get(o)];
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	raw() {
		return [...this.keys()].reduce((o, a) => (o[a] = this.getAll(a), o), {});
	}
	[Symbol.for("nodejs.util.inspect.custom")]() {
		return [...this.keys()].reduce((o, a) => {
			const f = this.getAll(a);
			return a === "host" ? o[a] = f[0] : o[a] = f.length > 1 ? f : f[0], o;
		}, {});
	}
};
n$2(Pr, "Headers");
var ye = Pr;
Object.defineProperties(ye.prototype, [
	"get",
	"entries",
	"forEach",
	"values"
].reduce((i, o) => (i[o] = { enumerable: true }, i), {}));
function ol(i = []) {
	return new ye(i.reduce((o, a, f, l) => (f % 2 === 0 && o.push(l.slice(f, f + 2)), o), []).filter(([o, a]) => {
		try {
			return gr(o), Fn(o, String(a)), !0;
		} catch {
			return false;
		}
	}));
}
n$2(ol, "fromRawHeaders");
var il = /* @__PURE__ */ new Set([
	301,
	302,
	303,
	307,
	308
]);
var jn = n$2((i) => il.has(i), "isRedirect");
var se = Symbol("Response internals");
var Ne = class Ne extends xe {
	constructor(o = null, a = {}) {
		super(o, a);
		const f = a.status != null ? a.status : 200, l = new ye(a.headers);
		if (o !== null && !l.has("Content-Type")) {
			const p = Ri(o, this);
			p && l.append("Content-Type", p);
		}
		this[se] = {
			type: "default",
			url: a.url,
			status: f,
			statusText: a.statusText || "",
			headers: l,
			counter: a.counter,
			highWaterMark: a.highWaterMark
		};
	}
	get type() {
		return this[se].type;
	}
	get url() {
		return this[se].url || "";
	}
	get status() {
		return this[se].status;
	}
	get ok() {
		return this[se].status >= 200 && this[se].status < 300;
	}
	get redirected() {
		return this[se].counter > 0;
	}
	get statusText() {
		return this[se].statusText;
	}
	get headers() {
		return this[se].headers;
	}
	get highWaterMark() {
		return this[se].highWaterMark;
	}
	clone() {
		return new Ne(In(this, this.highWaterMark), {
			type: this.type,
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected,
			size: this.size,
			highWaterMark: this.highWaterMark
		});
	}
	static redirect(o, a = 302) {
		if (!jn(a)) throw new RangeError("Failed to execute \"redirect\" on \"response\": Invalid status code");
		return new Ne(null, {
			headers: { location: new URL(o).toString() },
			status: a
		});
	}
	static error() {
		const o = new Ne(null, {
			status: 0,
			statusText: ""
		});
		return o[se].type = "error", o;
	}
	static json(o = void 0, a = {}) {
		const f = JSON.stringify(o);
		if (f === void 0) throw new TypeError("data is not JSON serializable");
		const l = new ye(a && a.headers);
		return l.has("content-type") || l.set("content-type", "application/json"), new Ne(f, {
			...a,
			headers: l
		});
	}
	get [Symbol.toStringTag]() {
		return "Response";
	}
};
n$2(Ne, "Response");
var le = Ne;
Object.defineProperties(le.prototype, {
	type: { enumerable: true },
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});
var al = n$2((i) => {
	if (i.search) return i.search;
	const o = i.href.length - 1, a = i.hash || (i.href[o] === "#" ? "#" : "");
	return i.href[o - a.length] === "?" ? "?" : "";
}, "getSearch");
function Ti(i, o = false) {
	return i == null || (i = new URL(i), /^(about|blob|data):$/.test(i.protocol)) ? "no-referrer" : (i.username = "", i.password = "", i.hash = "", o && (i.pathname = "", i.search = ""), i);
}
n$2(Ti, "stripURLForUseAsAReferrer");
var Ci = /* @__PURE__ */ new Set([
	"",
	"no-referrer",
	"no-referrer-when-downgrade",
	"same-origin",
	"origin",
	"strict-origin",
	"origin-when-cross-origin",
	"strict-origin-when-cross-origin",
	"unsafe-url"
]);
var sl = "strict-origin-when-cross-origin";
function ll(i) {
	if (!Ci.has(i)) throw new TypeError(`Invalid referrerPolicy: ${i}`);
	return i;
}
n$2(ll, "validateReferrerPolicy");
function ul(i) {
	if (/^(http|ws)s:$/.test(i.protocol)) return true;
	const o = i.host.replace(/(^\[)|(]$)/g, ""), a = isIP(o);
	return a === 4 && /^127\./.test(o) || a === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(o) ? true : i.host === "localhost" || i.host.endsWith(".localhost") ? false : i.protocol === "file:";
}
n$2(ul, "isOriginPotentiallyTrustworthy");
function ct(i) {
	return /^about:(blank|srcdoc)$/.test(i) || i.protocol === "data:" || /^(blob|filesystem):$/.test(i.protocol) ? true : ul(i);
}
n$2(ct, "isUrlPotentiallyTrustworthy");
function fl(i, { referrerURLCallback: o, referrerOriginCallback: a } = {}) {
	if (i.referrer === "no-referrer" || i.referrerPolicy === "") return null;
	const f = i.referrerPolicy;
	if (i.referrer === "about:client") return "no-referrer";
	const l = i.referrer;
	let p = Ti(l), h = Ti(l, true);
	p.toString().length > 4096 && (p = h), o && (p = o(p)), a && (h = a(h));
	const S = new URL(i.url);
	switch (f) {
		case "no-referrer": return "no-referrer";
		case "origin": return h;
		case "unsafe-url": return p;
		case "strict-origin": return ct(p) && !ct(S) ? "no-referrer" : h.toString();
		case "strict-origin-when-cross-origin": return p.origin === S.origin ? p : ct(p) && !ct(S) ? "no-referrer" : h;
		case "same-origin": return p.origin === S.origin ? p : "no-referrer";
		case "origin-when-cross-origin": return p.origin === S.origin ? p : h;
		case "no-referrer-when-downgrade": return ct(p) && !ct(S) ? "no-referrer" : p;
		default: throw new TypeError(`Invalid referrerPolicy: ${f}`);
	}
}
n$2(fl, "determineRequestsReferrer");
function cl(i) {
	const o = (i.get("referrer-policy") || "").split(/[,\s]+/);
	let a = "";
	for (const f of o) f && Ci.has(f) && (a = f);
	return a;
}
n$2(cl, "parseReferrerPolicyFromHeader");
var $ = Symbol("Request internals");
var qt = n$2((i) => typeof i == "object" && typeof i[$] == "object", "isRequest");
var dl = deprecate(() => {}, ".data is not a valid RequestInit property, use .body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (request)");
var vr = class vr extends xe {
	constructor(o, a = {}) {
		let f;
		if (qt(o) ? f = new URL(o.url) : (f = new URL(o), o = {}), f.username !== "" || f.password !== "") throw new TypeError(`${f} is an url with embedded credentials.`);
		let l = a.method || o.method || "GET";
		if (/^(delete|get|head|options|post|put)$/i.test(l) && (l = l.toUpperCase()), !qt(a) && "data" in a && dl(), (a.body != null || qt(o) && o.body !== null) && (l === "GET" || l === "HEAD")) throw new TypeError("Request with GET/HEAD method cannot have body");
		const p = a.body ? a.body : qt(o) && o.body !== null ? In(o) : null;
		super(p, { size: a.size || o.size || 0 });
		const h = new ye(a.headers || o.headers || {});
		if (p !== null && !h.has("Content-Type")) {
			const w = Ri(p, this);
			w && h.set("Content-Type", w);
		}
		let S = qt(o) ? o.signal : null;
		if ("signal" in a && (S = a.signal), S != null && !Ks(S)) throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
		let v = a.referrer == null ? o.referrer : a.referrer;
		if (v === "") v = "no-referrer";
		else if (v) {
			const w = new URL(v);
			v = /^about:(\/\/)?client$/.test(w) ? "client" : w;
		} else v = void 0;
		this[$] = {
			method: l,
			redirect: a.redirect || o.redirect || "follow",
			headers: h,
			parsedURL: f,
			signal: S,
			referrer: v
		}, this.follow = a.follow === void 0 ? o.follow === void 0 ? 20 : o.follow : a.follow, this.compress = a.compress === void 0 ? o.compress === void 0 ? true : o.compress : a.compress, this.counter = a.counter || o.counter || 0, this.agent = a.agent || o.agent, this.highWaterMark = a.highWaterMark || o.highWaterMark || 16384, this.insecureHTTPParser = a.insecureHTTPParser || o.insecureHTTPParser || false, this.referrerPolicy = a.referrerPolicy || o.referrerPolicy || "";
	}
	get method() {
		return this[$].method;
	}
	get url() {
		return format$1(this[$].parsedURL);
	}
	get headers() {
		return this[$].headers;
	}
	get redirect() {
		return this[$].redirect;
	}
	get signal() {
		return this[$].signal;
	}
	get referrer() {
		if (this[$].referrer === "no-referrer") return "";
		if (this[$].referrer === "client") return "about:client";
		if (this[$].referrer) return this[$].referrer.toString();
	}
	get referrerPolicy() {
		return this[$].referrerPolicy;
	}
	set referrerPolicy(o) {
		this[$].referrerPolicy = ll(o);
	}
	clone() {
		return new vr(this);
	}
	get [Symbol.toStringTag]() {
		return "Request";
	}
};
n$2(vr, "Request");
var dt = vr;
Object.defineProperties(dt.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true },
	referrer: { enumerable: true },
	referrerPolicy: { enumerable: true }
});
var hl = n$2((i) => {
	const { parsedURL: o } = i[$], a = new ye(i[$].headers);
	a.has("Accept") || a.set("Accept", "*/*");
	let f = null;
	if (i.body === null && /^(post|put)$/i.test(i.method) && (f = "0"), i.body !== null) {
		const S = rl(i);
		typeof S == "number" && !Number.isNaN(S) && (f = String(S));
	}
	f && a.set("Content-Length", f), i.referrerPolicy === "" && (i.referrerPolicy = sl), i.referrer && i.referrer !== "no-referrer" ? i[$].referrer = fl(i) : i[$].referrer = "no-referrer", i[$].referrer instanceof URL && a.set("Referer", i.referrer), a.has("User-Agent") || a.set("User-Agent", "node-fetch"), i.compress && !a.has("Accept-Encoding") && a.set("Accept-Encoding", "gzip, deflate, br");
	let { agent: l } = i;
	typeof l == "function" && (l = l(o));
	const p = al(o);
	return {
		parsedURL: o,
		options: {
			path: o.pathname + p,
			method: i.method,
			headers: a[Symbol.for("nodejs.util.inspect.custom")](),
			insecureHTTPParser: i.insecureHTTPParser,
			agent: l
		}
	};
}, "getNodeRequestOptions");
var Hn = class Hn extends ft {
	constructor(o, a = "aborted") {
		super(o, a);
	}
};
n$2(Hn, "AbortError");
var _r = Hn;
/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */ var Ln;
var Pi;
function pl() {
	if (Pi) return Ln;
	if (Pi = 1, !globalThis.DOMException) try {
		const { MessageChannel: i } = __require("worker_threads"), o = new i().port1, a = /* @__PURE__ */ new ArrayBuffer();
		o.postMessage(a, [a, a]);
	} catch (i) {
		i.constructor.name === "DOMException" && (globalThis.DOMException = i.constructor);
	}
	return Ln = globalThis.DOMException, Ln;
}
n$2(pl, "requireNodeDomexception");
var ml = f(pl()), { stat: $n } = promises;
n$2((i, o) => vi(statSync(i), i, o), "blobFromSync");
n$2((i, o) => $n(i).then((a) => vi(a, i, o)), "blobFrom");
n$2((i, o) => $n(i).then((a) => Ei(a, i, o)), "fileFrom");
n$2((i, o) => Ei(statSync(i), i, o), "fileFromSync");
var vi = n$2((i, o, a = "") => new ut([new Sr({
	path: o,
	size: i.size,
	lastModified: i.mtimeMs,
	start: 0
})], { type: a }), "fromBlob"), Ei = n$2((i, o, a = "") => new qn([new Sr({
	path: o,
	size: i.size,
	lastModified: i.mtimeMs,
	start: 0
})], basename(o), {
	type: a,
	lastModified: i.mtimeMs
}), "fromFile"), Er = class Er {
	constructor(o) {
		be(this, He);
		be(this, Ve);
		X(this, He, o.path), X(this, Ve, o.start), this.size = o.size, this.lastModified = o.lastModified;
	}
	slice(o, a) {
		return new Er({
			path: O(this, He),
			lastModified: this.lastModified,
			size: a - o,
			start: O(this, Ve) + o
		});
	}
	async *stream() {
		const { mtimeMs: o } = await $n(O(this, He));
		if (o > this.lastModified) throw new ml("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.", "NotReadableError");
		yield* createReadStream(O(this, He), {
			start: O(this, Ve),
			end: O(this, Ve) + this.size - 1
		});
	}
	get [Symbol.toStringTag]() {
		return "Blob";
	}
};
He = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap(), n$2(Er, "BlobDataItem");
var Sr = Er;
var wl = /* @__PURE__ */ new Set([
	"data:",
	"http:",
	"https:"
]);
async function Ai(i, o) {
	return new Promise((a, f) => {
		const l = new dt(i, o), { parsedURL: p, options: h } = hl(l);
		if (!wl.has(p.protocol)) throw new TypeError(`node-fetch cannot load ${i}. URL scheme "${p.protocol.replace(/:$/, "")}" is not supported.`);
		if (p.protocol === "data:") {
			const g = Us(l.url);
			a(new le(g, { headers: { "Content-Type": g.typeFull } }));
			return;
		}
		const S = (p.protocol === "https:" ? zs : Bt).request, { signal: v } = l;
		let w = null;
		const A = n$2(() => {
			const g = new _r("The operation was aborted.");
			f(g), l.body && l.body instanceof me.Readable && l.body.destroy(g), w && w.body && w.body.emit("error", g);
		}, "abort");
		if (v && v.aborted) {
			A();
			return;
		}
		const T = n$2(() => {
			A(), q();
		}, "abortAndFinalize"), b = S(p.toString(), h);
		v && v.addEventListener("abort", T);
		const q = n$2(() => {
			b.abort(), v && v.removeEventListener("abort", T);
		}, "finalize");
		b.on("error", (g) => {
			f(new G(`request to ${l.url} failed, reason: ${g.message}`, "system", g)), q();
		}), Rl(b, (g) => {
			w && w.body && w.body.destroy(g);
		}), process.version < "v14" && b.on("socket", (g) => {
			let V;
			g.prependListener("end", () => {
				V = g._eventsCount;
			}), g.prependListener("close", (I) => {
				if (w && V < g._eventsCount && !I) {
					const F = /* @__PURE__ */ new Error("Premature close");
					F.code = "ERR_STREAM_PREMATURE_CLOSE", w.body.emit("error", F);
				}
			});
		}), b.on("response", (g) => {
			b.setTimeout(0);
			const V = ol(g.rawHeaders);
			if (jn(g.statusCode)) {
				const z = V.get("Location");
				let j = null;
				try {
					j = z === null ? null : new URL(z, l.url);
				} catch {
					if (l.redirect !== "manual") {
						f(new G(`uri requested responds with an invalid redirect URL: ${z}`, "invalid-redirect")), q();
						return;
					}
				}
				switch (l.redirect) {
					case "error":
						f(new G(`uri requested responds with a redirect, redirect mode is set to error: ${l.url}`, "no-redirect")), q();
						return;
					case "manual": break;
					case "follow": {
						if (j === null) break;
						if (l.counter >= l.follow) {
							f(new G(`maximum redirect reached at: ${l.url}`, "max-redirect")), q();
							return;
						}
						const U = {
							headers: new ye(l.headers),
							follow: l.follow,
							counter: l.counter + 1,
							agent: l.agent,
							compress: l.compress,
							method: l.method,
							body: In(l),
							signal: l.signal,
							size: l.size,
							referrer: l.referrer,
							referrerPolicy: l.referrerPolicy
						};
						if (!Js(l.url, j) || !Xs(l.url, j)) for (const jt of [
							"authorization",
							"www-authenticate",
							"cookie",
							"cookie2"
						]) U.headers.delete(jt);
						if (g.statusCode !== 303 && l.body && o.body instanceof me.Readable) {
							f(new G("Cannot follow redirect with body being a readable stream", "unsupported-redirect")), q();
							return;
						}
						(g.statusCode === 303 || (g.statusCode === 301 || g.statusCode === 302) && l.method === "POST") && (U.method = "GET", U.body = void 0, U.headers.delete("content-length"));
						const D = cl(V);
						D && (U.referrerPolicy = D), a(Ai(new dt(j, U))), q();
						return;
					}
					default: return f(/* @__PURE__ */ new TypeError(`Redirect option '${l.redirect}' is not a valid value of RequestRedirect`));
				}
			}
			v && g.once("end", () => {
				v.removeEventListener("abort", T);
			});
			let I = pipeline(g, new PassThrough(), (z) => {
				z && f(z);
			});
			process.version < "v12.10" && g.on("aborted", T);
			const F = {
				url: l.url,
				status: g.statusCode,
				statusText: g.statusMessage,
				headers: V,
				size: l.size,
				counter: l.counter,
				highWaterMark: l.highWaterMark
			}, Q = V.get("Content-Encoding");
			if (!l.compress || l.method === "HEAD" || Q === null || g.statusCode === 204 || g.statusCode === 304) {
				w = new le(I, F), a(w);
				return;
			}
			const ge = {
				flush: st.Z_SYNC_FLUSH,
				finishFlush: st.Z_SYNC_FLUSH
			};
			if (Q === "gzip" || Q === "x-gzip") {
				I = pipeline(I, st.createGunzip(ge), (z) => {
					z && f(z);
				}), w = new le(I, F), a(w);
				return;
			}
			if (Q === "deflate" || Q === "x-deflate") {
				const z = pipeline(g, new PassThrough(), (j) => {
					j && f(j);
				});
				z.once("data", (j) => {
					(j[0] & 15) === 8 ? I = pipeline(I, st.createInflate(), (U) => {
						U && f(U);
					}) : I = pipeline(I, st.createInflateRaw(), (U) => {
						U && f(U);
					}), w = new le(I, F), a(w);
				}), z.once("end", () => {
					w || (w = new le(I, F), a(w));
				});
				return;
			}
			if (Q === "br") {
				I = pipeline(I, st.createBrotliDecompress(), (z) => {
					z && f(z);
				}), w = new le(I, F), a(w);
				return;
			}
			w = new le(I, F), a(w);
		}), nl(b, l).catch(f);
	});
}
n$2(Ai, "fetch$1");
function Rl(i, o) {
	const a = Buffer$1.from(`0\r
\r
`);
	let f = false, l = false, p;
	i.on("response", (h) => {
		const { headers: S } = h;
		f = S["transfer-encoding"] === "chunked" && !S["content-length"];
	}), i.on("socket", (h) => {
		const S = n$2(() => {
			if (f && !l) {
				const w = /* @__PURE__ */ new Error("Premature close");
				w.code = "ERR_STREAM_PREMATURE_CLOSE", o(w);
			}
		}, "onSocketClose"), v = n$2((w) => {
			l = Buffer$1.compare(w.slice(-5), a) === 0, !l && p && (l = Buffer$1.compare(p.slice(-3), a.slice(0, 3)) === 0 && Buffer$1.compare(w.slice(-2), a.slice(3)) === 0), p = w;
		}, "onData");
		h.prependListener("close", S), h.on("data", v), i.on("close", () => {
			h.removeListener("close", S), h.removeListener("data", v);
		});
	});
}
n$2(Rl, "fixResponseChunkedTransferBadEnding");
var Bi = /* @__PURE__ */ new WeakMap();
var Dn = /* @__PURE__ */ new WeakMap();
function W(i) {
	const o = Bi.get(i);
	return console.assert(o != null, "'this' is expected an Event object, but got", i), o;
}
n$2(W, "pd");
function ki(i) {
	if (i.passiveListener != null) {
		typeof console < "u" && typeof console.error == "function" && console.error("Unable to preventDefault inside passive event listener invocation.", i.passiveListener);
		return;
	}
	i.event.cancelable && (i.canceled = true, typeof i.event.preventDefault == "function" && i.event.preventDefault());
}
n$2(ki, "setCancelFlag");
function ht(i, o) {
	Bi.set(this, {
		eventTarget: i,
		event: o,
		eventPhase: 2,
		currentTarget: i,
		canceled: false,
		stopped: false,
		immediateStopped: false,
		passiveListener: null,
		timeStamp: o.timeStamp || Date.now()
	}), Object.defineProperty(this, "isTrusted", {
		value: false,
		enumerable: true
	});
	const a = Object.keys(o);
	for (let f = 0; f < a.length; ++f) {
		const l = a[f];
		l in this || Object.defineProperty(this, l, Wi(l));
	}
}
n$2(ht, "Event"), ht.prototype = {
	get type() {
		return W(this).event.type;
	},
	get target() {
		return W(this).eventTarget;
	},
	get currentTarget() {
		return W(this).currentTarget;
	},
	composedPath() {
		const i = W(this).currentTarget;
		return i == null ? [] : [i];
	},
	get NONE() {
		return 0;
	},
	get CAPTURING_PHASE() {
		return 1;
	},
	get AT_TARGET() {
		return 2;
	},
	get BUBBLING_PHASE() {
		return 3;
	},
	get eventPhase() {
		return W(this).eventPhase;
	},
	stopPropagation() {
		const i = W(this);
		i.stopped = true, typeof i.event.stopPropagation == "function" && i.event.stopPropagation();
	},
	stopImmediatePropagation() {
		const i = W(this);
		i.stopped = true, i.immediateStopped = true, typeof i.event.stopImmediatePropagation == "function" && i.event.stopImmediatePropagation();
	},
	get bubbles() {
		return !!W(this).event.bubbles;
	},
	get cancelable() {
		return !!W(this).event.cancelable;
	},
	preventDefault() {
		ki(W(this));
	},
	get defaultPrevented() {
		return W(this).canceled;
	},
	get composed() {
		return !!W(this).event.composed;
	},
	get timeStamp() {
		return W(this).timeStamp;
	},
	get srcElement() {
		return W(this).eventTarget;
	},
	get cancelBubble() {
		return W(this).stopped;
	},
	set cancelBubble(i) {
		if (!i) return;
		const o = W(this);
		o.stopped = true, typeof o.event.cancelBubble == "boolean" && (o.event.cancelBubble = true);
	},
	get returnValue() {
		return !W(this).canceled;
	},
	set returnValue(i) {
		i || ki(W(this));
	},
	initEvent() {}
}, Object.defineProperty(ht.prototype, "constructor", {
	value: ht,
	configurable: true,
	writable: true
});
function Wi(i) {
	return {
		get() {
			return W(this).event[i];
		},
		set(o) {
			W(this).event[i] = o;
		},
		configurable: true,
		enumerable: true
	};
}
n$2(Wi, "defineRedirectDescriptor");
function Tl(i) {
	return {
		value() {
			const o = W(this).event;
			return o[i].apply(o, arguments);
		},
		configurable: true,
		enumerable: true
	};
}
n$2(Tl, "defineCallDescriptor");
function Cl(i, o) {
	const a = Object.keys(o);
	if (a.length === 0) return i;
	function f(l, p) {
		i.call(this, l, p);
	}
	n$2(f, "CustomEvent"), f.prototype = Object.create(i.prototype, { constructor: {
		value: f,
		configurable: true,
		writable: true
	} });
	for (let l = 0; l < a.length; ++l) {
		const p = a[l];
		if (!(p in i.prototype)) {
			const S = typeof Object.getOwnPropertyDescriptor(o, p).value == "function";
			Object.defineProperty(f.prototype, p, S ? Tl(p) : Wi(p));
		}
	}
	return f;
}
n$2(Cl, "defineWrapper");
function qi(i) {
	if (i == null || i === Object.prototype) return ht;
	let o = Dn.get(i);
	return o ?? (o = Cl(qi(Object.getPrototypeOf(i)), i), Dn.set(i, o)), o;
}
n$2(qi, "getWrapper");
function Pl(i, o) {
	return new (qi(Object.getPrototypeOf(o)))(i, o);
}
n$2(Pl, "wrapEvent");
function vl(i) {
	return W(i).immediateStopped;
}
n$2(vl, "isStopped");
function El(i, o) {
	W(i).eventPhase = o;
}
n$2(El, "setEventPhase");
function Al(i, o) {
	W(i).currentTarget = o;
}
n$2(Al, "setCurrentTarget");
function Oi(i, o) {
	W(i).passiveListener = o;
}
n$2(Oi, "setPassiveListener");
var zi = /* @__PURE__ */ new WeakMap();
var Ii = 1;
var Fi = 2;
var wr = 3;
function Rr(i) {
	return i !== null && typeof i == "object";
}
n$2(Rr, "isObject");
function Ot(i) {
	const o = zi.get(i);
	if (o == null) throw new TypeError("'this' is expected an EventTarget object, but got another value.");
	return o;
}
n$2(Ot, "getListeners");
function Bl(i) {
	return {
		get() {
			let a = Ot(this).get(i);
			for (; a != null;) {
				if (a.listenerType === wr) return a.listener;
				a = a.next;
			}
			return null;
		},
		set(o) {
			typeof o != "function" && !Rr(o) && (o = null);
			const a = Ot(this);
			let f = null, l = a.get(i);
			for (; l != null;) l.listenerType === wr ? f !== null ? f.next = l.next : l.next !== null ? a.set(i, l.next) : a.delete(i) : f = l, l = l.next;
			if (o !== null) {
				const p = {
					listener: o,
					listenerType: wr,
					passive: false,
					once: false,
					next: null
				};
				f === null ? a.set(i, p) : f.next = p;
			}
		},
		configurable: true,
		enumerable: true
	};
}
n$2(Bl, "defineEventAttributeDescriptor");
function ji(i, o) {
	Object.defineProperty(i, `on${o}`, Bl(o));
}
n$2(ji, "defineEventAttribute");
function Li(i) {
	function o() {
		Pe.call(this);
	}
	n$2(o, "CustomEventTarget"), o.prototype = Object.create(Pe.prototype, { constructor: {
		value: o,
		configurable: true,
		writable: true
	} });
	for (let a = 0; a < i.length; ++a) ji(o.prototype, i[a]);
	return o;
}
n$2(Li, "defineCustomEventTarget");
function Pe() {
	if (this instanceof Pe) {
		zi.set(this, /* @__PURE__ */ new Map());
		return;
	}
	if (arguments.length === 1 && Array.isArray(arguments[0])) return Li(arguments[0]);
	if (arguments.length > 0) {
		const i = new Array(arguments.length);
		for (let o = 0; o < arguments.length; ++o) i[o] = arguments[o];
		return Li(i);
	}
	throw new TypeError("Cannot call a class as a function");
}
n$2(Pe, "EventTarget"), Pe.prototype = {
	addEventListener(i, o, a) {
		if (o == null) return;
		if (typeof o != "function" && !Rr(o)) throw new TypeError("'listener' should be a function or an object.");
		const f = Ot(this), l = Rr(a), h = (l ? !!a.capture : !!a) ? Ii : Fi, S = {
			listener: o,
			listenerType: h,
			passive: l && !!a.passive,
			once: l && !!a.once,
			next: null
		};
		let v = f.get(i);
		if (v === void 0) {
			f.set(i, S);
			return;
		}
		let w = null;
		for (; v != null;) {
			if (v.listener === o && v.listenerType === h) return;
			w = v, v = v.next;
		}
		w.next = S;
	},
	removeEventListener(i, o, a) {
		if (o == null) return;
		const f = Ot(this), p = (Rr(a) ? !!a.capture : !!a) ? Ii : Fi;
		let h = null, S = f.get(i);
		for (; S != null;) {
			if (S.listener === o && S.listenerType === p) {
				h !== null ? h.next = S.next : S.next !== null ? f.set(i, S.next) : f.delete(i);
				return;
			}
			h = S, S = S.next;
		}
	},
	dispatchEvent(i) {
		if (i == null || typeof i.type != "string") throw new TypeError("\"event.type\" should be a string.");
		const o = Ot(this), a = i.type;
		let f = o.get(a);
		if (f == null) return true;
		const l = Pl(this, i);
		let p = null;
		for (; f != null;) {
			if (f.once ? p !== null ? p.next = f.next : f.next !== null ? o.set(a, f.next) : o.delete(a) : p = f, Oi(l, f.passive ? f.listener : null), typeof f.listener == "function") try {
				f.listener.call(this, l);
			} catch (h) {
				typeof console < "u" && typeof console.error == "function" && console.error(h);
			}
			else f.listenerType !== wr && typeof f.listener.handleEvent == "function" && f.listener.handleEvent(l);
			if (vl(l)) break;
			f = f.next;
		}
		return Oi(l, null), El(l, 0), Al(l, null), !l.defaultPrevented;
	}
}, Object.defineProperty(Pe.prototype, "constructor", {
	value: Pe,
	configurable: true,
	writable: true
});
var Vn = class Vn extends Pe {
	constructor() {
		throw super(), /* @__PURE__ */ new TypeError("AbortSignal cannot be constructed directly");
	}
	get aborted() {
		const o = Tr.get(this);
		if (typeof o != "boolean") throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
		return o;
	}
};
n$2(Vn, "AbortSignal");
var pt = Vn;
ji(pt.prototype, "abort");
function kl() {
	const i = Object.create(pt.prototype);
	return Pe.call(i), Tr.set(i, false), i;
}
n$2(kl, "createAbortSignal");
function Wl(i) {
	Tr.get(i) === false && (Tr.set(i, true), i.dispatchEvent({ type: "abort" }));
}
n$2(Wl, "abortSignal");
var Tr = /* @__PURE__ */ new WeakMap();
Object.defineProperties(pt.prototype, { aborted: { enumerable: true } }), typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol" && Object.defineProperty(pt.prototype, Symbol.toStringTag, {
	configurable: true,
	value: "AbortSignal"
});
var Mn = (gt = class {
	constructor() {
		$i.set(this, kl());
	}
	get signal() {
		return Di(this);
	}
	abort() {
		Wl(Di(this));
	}
}, n$2(gt, "AbortController"), gt);
var $i = /* @__PURE__ */ new WeakMap();
function Di(i) {
	const o = $i.get(i);
	if (o == null) throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${i === null ? "null" : typeof i}`);
	return o;
}
n$2(Di, "getSignal"), Object.defineProperties(Mn.prototype, {
	signal: { enumerable: true },
	abort: { enumerable: true }
}), typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Mn.prototype, Symbol.toStringTag, {
	configurable: true,
	value: "AbortController"
});
var ql = Object.defineProperty;
var Ol = n$2((i, o) => ql(i, "name", {
	value: o,
	configurable: true
}), "e");
var Mi = Ai;
Ui();
function Ui() {
	!globalThis.process?.versions?.node && !globalThis.process?.env?.DISABLE_NODE_FETCH_NATIVE_WARN && console.warn("[node-fetch-native] Node.js compatible build of `node-fetch-native` is being used in a non-Node.js environment. Please make sure you are using proper export conditions or report this issue to https://github.com/unjs/node-fetch-native. You can set `process.env.DISABLE_NODE_FETCH_NATIVE_WARN` to disable this warning.");
}
n$2(Ui, "s"), Ol(Ui, "checkNodeEnvironment");

var captureStackTrace = Error.captureStackTrace;
var Diagnostic = class Diagnostic extends Error {
	name;
	/**
	* The diagnostic code, e.g. `MATH_E001`.
	* Also appears as the `name` property.
	*/
	code;
	/**
	* URL to extended documentation for this diagnostic code.
	* Auto-generated from {@link DefineDiagnosticsOptions.docsBase}.
	*/
	docs;
	/**
	* Optional actionable instructions on how to resolve the problem.
	*/
	fix;
	/**
	* Locations in user code that contributed to this diagnostic, in
	* `file:line:column` format. Relevant when the stack trace doesn't reflect
	* the user's source (e.g. compilers, bundlers), otherwise redundant with the
	* stack and should be omitted.
	*/
	sources;
	/**
	* Structured information associated with this diagnostic code.
	*/
	data;
	/**
	* Alias for {@link Error.message}: the reason this diagnostic was raised.
	*/
	get why() {
		return this.message;
	}
	/**
	* @param init        structured initializer; `why` is required
	* @param captureFrom V8 stack-cutoff frame. Defaults to {@link Diagnostic}
	* so the top of the trace is the `new Diagnostic(...)` call site.
	* `defineDiagnostics` passes its action method to strip its own frames too.
	* Ignored on engines without `Error.captureStackTrace`.
	*/
	constructor(init, captureFrom = Diagnostic) {
		super(init.why, { cause: init.cause });
		this.code = this.name = init.code;
		this.fix = init.fix;
		this.docs = init.docs;
		this.sources = init.sources;
		this.data = init.data;
		captureStackTrace?.(this, captureFrom);
	}
	/**
	* Converts the diagnostic into a serializable structured object.
	*/
	toJSON() {
		return {
			name: this.name,
			why: this.why,
			fix: this.fix,
			docs: this.docs,
			sources: this.sources,
			cause: this.cause,
			data: this.data,
			stack: this.stack
		};
	}
};
/**
* Resolves the docs URL for a code from a `docsBase` (string template or
* resolver function). Shared by {@link defineDiagnostics} and
* {@link defineProdDiagnostics}. Per-code `docs` overrides are handled by the
* caller; this only covers the `docsBase`-derived case.
*
* @internal
*/
function deriveDocs(docsBase, code) {
	return typeof docsBase === "string" ? `${docsBase}/${code.toLowerCase()}` : docsBase?.(code);
}
/**
* Production counterpart to {@link defineDiagnostics}. Returns a `Proxy` that
* builds a minimal {@link Diagnostic} for any accessed code: the code becomes
* the instance `name`, `docs` is derived from `docsBase`, and `why` points to
* the docs URL when one exists (empty otherwise, so the thrown header is just
* the code). It carries no catalog text or data, so it stays tiny in a bundle.
*
* The strip plugin (`@nostics/unplugin`) can rewrite a `defineDiagnostics()`
* call into a `"production" === 'production'` ternary that selects this
* factory in production, dropping every `why`/`fix` string from the bundle.
*
* @example
* ```ts
* const diagnostics = defineProdDiagnostics({ docsBase: 'https://docs.example.com' })
* throw diagnostics.NUXT_B2011() // NUXT_B2011: https://docs.example.com/nuxt_b2011
* ```
*/
/* @__NO_SIDE_EFFECTS__ */
function defineProdDiagnostics(options = {}) {
	const { docsBase, reporters = [] } = options;
	return new Proxy({}, { get(_target, code) {
		if (typeof code !== "string") return void 0;
		const handle = (params = {}, reporterOptions = {}) => {
			const docs = deriveDocs(docsBase, code);
			const diagnostic = new Diagnostic({
				code,
				why: docs ?? "",
				docs,
				cause: params.cause,
				sources: params.sources
			}, handle);
			for (const reporter of reporters) reporter(diagnostic, reporterOptions);
			return diagnostic;
		};
		return handle;
	} });
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/diagnostics/_shared.js
/**
* Shared configuration for the runtime (E<N>xxx) diagnostics catalogs.
*
* Catalogs are split by domain and imported directly where used (no barrel),
* so the browser bundle only pulls in the codes a module references. Pair the
* pure-call annotations on each `defineDiagnostics()` with dev-guarded,
* statement-level report calls so report-only diagnostics strip from production.
*
* Codes are stable, fully-qualified `NUXT_E<NNNN>` identifiers. Codes with a
* dedicated docs page resolve a `see:` URL via {@link docsBase}; the rest opt
* out with `docs: false`.
*/
function docsBase(code) {
	return `https://nuxt.com/docs/4.x/errors/${code.replace("NUXT_", "").toLowerCase()}`;
}
var prodReporter = (diagnostic) => {
	console.error(`[${diagnostic.name}]`);
};
var prodReporters = [prodReporter];
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/diagnostics/core.js
/**
* E1xxx
* Core / Nuxt-instance / lifecycle runtime diagnostics.
*/
var appDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region node_modules/.pnpm/unctx@3.0.1_magic-string@1.4.3_oxc-parser@0.153.0_rolldown@1.2.13_unplugin@3.4.0_esbuild@0.28_d725wjkrzg63mniku3kjnd3x7u/node_modules/unctx/dist/index.mjs
function _getAsyncLocalStorage() {
	return globalThis.AsyncLocalStorage || globalThis.process?.getBuiltinModule?.("node:async_hooks")?.AsyncLocalStorage;
}
var _WeakRef = globalThis.WeakRef || class StrongRef {
	#value;
	constructor(value) {
		this.#value = value;
	}
	deref() {
		return this.#value;
	}
};
function createContext(opts = {}) {
	let currentInstance;
	let isSingleton = false;
	const checkConflict = (instance) => {
		if (currentInstance && currentInstance !== instance) throw new Error("Context conflict");
	};
	let als;
	if (opts.asyncContext) {
		const _AsyncLocalStorage = opts.AsyncLocalStorage || _getAsyncLocalStorage();
		if (_AsyncLocalStorage) als = new _AsyncLocalStorage();
		else console.warn("[unctx] `AsyncLocalStorage` is not provided.");
	}
	const _wrapInstance = (instance) => als && instance !== null && typeof instance === "object" ? { __unctx_weak: new _WeakRef(instance) } : instance;
	const _unwrapInstance = (store) => store && store.__unctx_weak ? store.__unctx_weak.deref() : store;
	const _getCurrentInstance = () => {
		if (als) {
			const store = als.getStore();
			if (store !== void 0) return _unwrapInstance(store);
		}
		return currentInstance;
	};
	return {
		use: () => {
			const _instance = _getCurrentInstance();
			if (_instance === void 0) throw new Error("Context is not available");
			return _instance;
		},
		tryUse: () => {
			return _getCurrentInstance() ?? null;
		},
		set: (instance, replace) => {
			if (!replace) checkConflict(instance);
			currentInstance = instance;
			isSingleton = true;
		},
		unset: () => {
			currentInstance = void 0;
			isSingleton = false;
		},
		call: (instance, callback) => {
			checkConflict(instance);
			currentInstance = instance;
			try {
				return als ? als.run(_wrapInstance(instance), callback) : callback();
			} finally {
				if (!isSingleton) currentInstance = void 0;
			}
		},
		async callAsync(instance, callback) {
			currentInstance = instance;
			const onRestore = () => {
				currentInstance = instance;
			};
			const onLeave = () => currentInstance === instance ? onRestore : void 0;
			asyncHandlers.add(onLeave);
			try {
				const r = als ? als.run(_wrapInstance(instance), callback) : callback();
				if (!isSingleton) currentInstance = void 0;
				return await r;
			} finally {
				asyncHandlers.delete(onLeave);
			}
		}
	};
}
function createNamespace(defaultOpts = {}) {
	const contexts = {};
	return { get(key, opts = {}) {
		if (!contexts[key]) contexts[key] = createContext({
			...defaultOpts,
			...opts
		});
		return contexts[key];
	} };
}
var _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
var globalKey = "__unctx__";
var defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
var getContext$1 = (key, opts = {}) => defaultNamespace.get(key, opts);
var asyncHandlersKey = "__unctx_async_handlers__";
var asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
	const restores = [];
	for (const leaveHandler of asyncHandlers) {
		const restore = leaveHandler();
		if (restore) restores.push(restore);
	}
	const restore = () => {
		for (const restore of restores) restore();
	};
	let awaitable = function_();
	if (awaitable && typeof awaitable === "object" && "catch" in awaitable) awaitable = awaitable.catch((error) => {
		restore();
		throw error;
	});
	return [awaitable, restore];
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/internal/context.js
globalThis.__nuxt_app_ctx__ ||= {};
function getContext(key, opts) {
	return getContext$1(key, opts);
}
//#endregion
//#region node_modules/.pnpm/hookable@6.1.2/node_modules/hookable/dist/index.mjs
function flatHooks(configHooks, hooks = {}, parentName) {
	for (const key in configHooks) {
		const subHook = configHooks[key];
		const name = parentName ? `${parentName}:${key}` : key;
		if (typeof subHook === "object" && subHook !== null) flatHooks(subHook, hooks, name);
		else if (typeof subHook === "function") hooks[name] = subHook;
	}
	return hooks;
}
var createTask = /* @__PURE__ */ (() => {
	if (console.createTask) return console.createTask;
	const defaultTask = { run: (fn) => fn() };
	return () => defaultTask;
})();
function callHooks$1(hooks, args, startIndex, task) {
	for (let i = startIndex; i < hooks.length; i += 1) try {
		const result = task ? task.run(() => hooks[i](...args)) : hooks[i](...args);
		if (result && typeof result.then === "function") return Promise.resolve(result).then(() => callHooks$1(hooks, args, i + 1, task));
	} catch (error) {
		return Promise.reject(error);
	}
}
function serialTaskCaller(hooks, args, name) {
	if (hooks.length > 0) return callHooks$1(hooks, args, 0, createTask(name));
}
function parallelTaskCaller(hooks, args, name) {
	if (hooks.length > 0) {
		const task = createTask(name);
		return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
	}
}
function callEachWith(callbacks, arg0) {
	for (const callback of [...callbacks]) callback(arg0);
}
var Hookable = class {
	_hooks;
	_before;
	_after;
	_deprecatedHooks;
	_deprecatedMessages;
	constructor() {
		this._hooks = {};
		this._before = void 0;
		this._after = void 0;
		this._deprecatedMessages = void 0;
		this._deprecatedHooks = {};
		this.hook = this.hook.bind(this);
		this.callHook = this.callHook.bind(this);
		this.callHookWith = this.callHookWith.bind(this);
	}
	hook(name, function_, options = {}) {
		if (!name || typeof function_ !== "function") return () => {};
		const originalName = name;
		let dep;
		while (this._deprecatedHooks[name]) {
			dep = this._deprecatedHooks[name];
			name = dep.to;
		}
		if (dep && !options.allowDeprecated) {
			let message = dep.message;
			if (!message) message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
			if (!this._deprecatedMessages) this._deprecatedMessages = /* @__PURE__ */ new Set();
			if (!this._deprecatedMessages.has(message)) {
				console.warn(message);
				this._deprecatedMessages.add(message);
			}
		}
		if (!function_.name) try {
			Object.defineProperty(function_, "name", {
				get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
				configurable: true
			});
		} catch {}
		this._hooks[name] = this._hooks[name] || [];
		this._hooks[name].push(function_);
		return () => {
			if (function_) {
				this.removeHook(name, function_);
				function_ = void 0;
			}
		};
	}
	hookOnce(name, function_) {
		let _unreg;
		let _function = (...arguments_) => {
			if (typeof _unreg === "function") _unreg();
			_unreg = void 0;
			_function = void 0;
			return function_(...arguments_);
		};
		_unreg = this.hook(name, _function);
		return _unreg;
	}
	removeHook(name, function_) {
		const hooks = this._hooks[name];
		if (hooks) {
			const index = hooks.indexOf(function_);
			if (index !== -1) hooks.splice(index, 1);
			if (hooks.length === 0) this._hooks[name] = void 0;
		}
	}
	clearHook(name) {
		this._hooks[name] = void 0;
	}
	deprecateHook(name, deprecated) {
		this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
		const _hooks = this._hooks[name] || [];
		this._hooks[name] = void 0;
		for (const hook of _hooks) this.hook(name, hook);
	}
	deprecateHooks(deprecatedHooks) {
		for (const name in deprecatedHooks) this.deprecateHook(name, deprecatedHooks[name]);
	}
	addHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
		return () => {
			for (const unreg of removeFns) unreg();
			removeFns.length = 0;
		};
	}
	removeHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		for (const key in hooks) this.removeHook(key, hooks[key]);
	}
	removeAllHooks() {
		this._hooks = {};
	}
	callHook(name, ...args) {
		return this.callHookWith(serialTaskCaller, name, args);
	}
	callHookParallel(name, ...args) {
		return this.callHookWith(parallelTaskCaller, name, args);
	}
	callHookWith(caller, name, args) {
		const event = this._before || this._after ? {
			name,
			args,
			context: {}
		} : void 0;
		if (this._before) callEachWith(this._before, event);
		const result = caller(this._hooks[name] ? [...this._hooks[name]] : [], args, name);
		if (result instanceof Promise) return result.finally(() => {
			if (this._after && event) callEachWith(this._after, event);
		});
		if (this._after && event) callEachWith(this._after, event);
		return result;
	}
	beforeEach(function_) {
		this._before = this._before || [];
		this._before.push(function_);
		return () => {
			if (this._before !== void 0) {
				const index = this._before.indexOf(function_);
				if (index !== -1) this._before.splice(index, 1);
			}
		};
	}
	afterEach(function_) {
		this._after = this._after || [];
		this._after.push(function_);
		return () => {
			if (this._after !== void 0) {
				const index = this._after.indexOf(function_);
				if (index !== -1) this._after.splice(index, 1);
			}
		};
	}
};
function createHooks() {
	return new Hookable();
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fnuxt.config.mjs
var nuxtLinkDefaults = {
	"componentName": "NuxtLink"};
var asyncDataDefaults = { "deep": false };
var fetchDefaults = {};
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/nuxt.js
function getNuxtAppCtx(id = "nuxt-app") {
	return getContext(id, { asyncContext: false });
}
var NuxtPluginIndicator = "__nuxt_plugin";
/** @since 3.0.0 */
function createNuxtApp(options) {
	let hydratingCount = 0;
	const nuxtApp = {
		_id: options.id || "nuxt-app",
		_scope: effectScope(),
		provide: void 0,
		versions: {
			get nuxt() {
				return "4.6.1";
			},
			get vue() {
				return nuxtApp.vueApp.version;
			}
		},
		payload: shallowReactive({
			...options.ssrContext?.payload || {},
			data: shallowReactive({}),
			state: reactive({}),
			once: /* @__PURE__ */ new Set(),
			_errors: shallowReactive({})
		}),
		static: { data: {} },
		runWithContext(fn) {
			if (nuxtApp._scope.active && !getCurrentScope()) return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
			return callWithNuxt(nuxtApp, fn);
		},
		isHydrating: false,
		deferHydration() {
			if (!nuxtApp.isHydrating) return () => {};
			hydratingCount++;
			let called = false;
			return () => {
				if (called) return;
				called = true;
				hydratingCount--;
				if (hydratingCount === 0) {
					nuxtApp.isHydrating = false;
					return nuxtApp.callHook("app:suspense:resolve");
				}
			};
		},
		_asyncDataPromises: {},
		_asyncData: shallowReactive({}),
		_state: shallowReactive({}),
		_payloadRevivers: {},
		...options
	};
	nuxtApp.payload.serverRendered = true;
	if (nuxtApp.ssrContext) {
		nuxtApp.payload.path = nuxtApp.ssrContext.url;
		nuxtApp.ssrContext.nuxt = nuxtApp;
		nuxtApp.ssrContext.payload = nuxtApp.payload;
		nuxtApp.ssrContext.config = {
			public: nuxtApp.ssrContext.runtimeConfig.public,
			app: nuxtApp.ssrContext.runtimeConfig.app
		};
	}
	nuxtApp.hooks = createHooks();
	nuxtApp.hook = nuxtApp.hooks.hook;
	{
		const runHooks = async (hooks, args) => {
			for (const hook of hooks) await nuxtApp.runWithContext(() => hook(...args));
		};
		const contextCaller = runHooks;
		nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, args);
	}
	nuxtApp.callHook = nuxtApp.hooks.callHook;
	nuxtApp.provide = (name, value) => {
		const $name = "$" + name;
		defineGetter(nuxtApp, $name, value);
		defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
	};
	defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
	defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
	const runtimeConfig = options.ssrContext.runtimeConfig;
	nuxtApp.provide("config", runtimeConfig);
	return nuxtApp;
}
/** @since 3.0.0 */
async function applyPlugin(nuxtApp, plugin) {
	if (typeof plugin === "function") {
		const run = () => nuxtApp.runWithContext(() => plugin(nuxtApp));
		const { provide } = await run() || {};
		if (provide && typeof provide === "object") for (const key in provide) nuxtApp.provide(key, provide[key]);
	}
}
/** @since 3.0.0 */
async function applyPlugins(nuxtApp, plugins) {
	return applyPluginsWithDependencies(nuxtApp, plugins);
}
async function applyPluginsWithDependencies(nuxtApp, plugins) {
	const resolvedPlugins = /* @__PURE__ */ new Set();
	const unresolvedPlugins = [];
	const parallels = [];
	let error;
	let promiseDepth = 0;
	async function executePlugin(plugin) {
		const unresolvedPluginsForThisPlugin = plugin.dependsOn?.filter((name) => plugins.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
		if (unresolvedPluginsForThisPlugin.length > 0) unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin]);
		else {
			const promise = applyPlugin(nuxtApp, plugin).then(async () => {
				if (plugin._name) {
					resolvedPlugins.add(plugin._name);
					await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
						if (dependsOn.has(plugin._name)) {
							dependsOn.delete(plugin._name);
							if (dependsOn.size === 0) {
								promiseDepth++;
								await executePlugin(unexecutedPlugin);
							}
						}
					}));
				}
			}).catch((e) => {
				if (!plugin.parallel && !nuxtApp.payload.error) throw e;
				error ||= e;
			});
			if (plugin.parallel) parallels.push(promise);
			else await promise;
		}
	}
	for (const plugin of plugins) await executePlugin(plugin);
	await Promise.all(parallels);
	if (promiseDepth) for (let i = 0; i < promiseDepth; i++) await Promise.all(parallels);
	if (error) throw nuxtApp.payload.error || error;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtPlugin(plugin) {
	if (typeof plugin === "function") return plugin;
	const _name = plugin._name || plugin.name;
	delete plugin.name;
	return Object.assign(plugin.setup || (() => {}), plugin, {
		[NuxtPluginIndicator]: true,
		_name
	});
}
/**
* Ensures that the setup function passed in has access to the Nuxt instance via `useNuxtApp`.
* @param nuxt A Nuxt instance
* @param setup The function to call
* @since 3.0.0
*/
function callWithNuxt(nuxt, setup, args) {
	const fn = () => setup();
	const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
	return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
}
function tryUseNuxtApp(id) {
	let nuxtAppInstance;
	if (hasInjectionContext()) nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
	nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
	return nuxtAppInstance || null;
}
function useNuxtApp(id) {
	const nuxtAppInstance = tryUseNuxtApp(id);
	if (!nuxtAppInstance) throw appDiagnostics.NUXT_E1001();
	return nuxtAppInstance;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function useRuntimeConfig(_event) {
	return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
	Object.defineProperty(obj, key, { get: () => val });
}

var HASH_RE$2 = /#/g;
var AMPERSAND_RE = /&/g;
var SLASH_RE = /\//g;
var EQUAL_RE = /=/g;
var IM_RE = /\?/g;
var PLUS_RE = /\+/g;
var ENC_CARET_RE = /%5e/gi;
var ENC_BACKTICK_RE = /%60/gi;
var ENC_PIPE_RE$1 = /%7c/gi;
var ENC_SPACE_RE = /%20/gi;
var ENC_SLASH_RE = /%2f/gi;
var ENC_ENC_SLASH_RE$1 = /%252f/gi;
function encode(text) {
	return encodeURI("" + text).replace(ENC_PIPE_RE$1, "|");
}
function encodeQueryValue(input) {
	return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE$2, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
	return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
	return encode(text).replace(HASH_RE$2, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE$1, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function encodeParam(text) {
	return encodePath(text).replace(SLASH_RE, "%2F");
}
function decode$1(text = "") {
	try {
		return decodeURIComponent("" + text);
	} catch {
		return "" + text;
	}
}
function decodePath(text) {
	return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
	return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
	return decode$1(text.replace(PLUS_RE, " "));
}
function parseQuery(parametersString = "") {
	const object = /* @__PURE__ */ Object.create(null);
	if (parametersString[0] === "?") parametersString = parametersString.slice(1);
	for (const parameter of parametersString.split("&")) {
		const s = parameter.match(/([^=]+)=?(.*)/) || [];
		if (s.length < 2) continue;
		const key = decodeQueryKey(s[1]);
		if (key === "__proto__" || key === "constructor") continue;
		const value = decodeQueryValue(s[2] || "");
		if (object[key] === void 0) object[key] = value;
		else if (Array.isArray(object[key])) object[key].push(value);
		else object[key] = [object[key], value];
	}
	return object;
}
function encodeQueryItem(key, value) {
	if (typeof value === "number" || typeof value === "boolean") value = String(value);
	if (!value) return encodeQueryKey(key);
	if (Array.isArray(value)) return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
	return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
	return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}
var PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
var PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
var PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
var PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
var TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
var JOIN_LEADING_SLASH_RE$1 = /^\.?\//;
function hasProtocol$1(inputString, opts = {}) {
	if (typeof opts === "boolean") opts = { acceptRelative: opts };
	if (opts.strict) return PROTOCOL_STRICT_REGEX.test(inputString);
	return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
	return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
	if (!respectQueryAndFragment) return input.endsWith("/");
	return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash$1(input = "", respectQueryAndFragment) {
	if (!respectQueryAndFragment) return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
	if (!hasTrailingSlash(input, true)) return input || "/";
	let path = input;
	let fragment = "";
	const fragmentIndex = input.indexOf("#");
	if (fragmentIndex !== -1) {
		path = input.slice(0, fragmentIndex);
		fragment = input.slice(fragmentIndex);
	}
	const [s0, ...s] = path.split("?");
	return ((s0.endsWith("/") ? s0.slice(0, -1) : s0) || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash$1(input = "", respectQueryAndFragment) {
	if (!respectQueryAndFragment) return input.endsWith("/") ? input : input + "/";
	if (hasTrailingSlash(input, true)) return input || "/";
	let path = input;
	let fragment = "";
	const fragmentIndex = input.indexOf("#");
	if (fragmentIndex !== -1) {
		path = input.slice(0, fragmentIndex);
		fragment = input.slice(fragmentIndex);
		if (!path) return fragment;
	}
	const [s0, ...s] = path.split("?");
	return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
	return input.startsWith("/");
}
function withLeadingSlash(input = "") {
	return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase$1(input, base) {
	if (isEmptyURL(base) || hasProtocol$1(input)) return input;
	const _base = withoutTrailingSlash$1(base);
	if (input.startsWith(_base)) {
		const nextChar = input[_base.length];
		if (!nextChar || nextChar === "/" || nextChar === "?") return input;
	}
	return joinURL$1(_base, input);
}
function withoutBase(input, base) {
	if (isEmptyURL(base)) return input;
	const _base = withoutTrailingSlash$1(base);
	if (!input.startsWith(_base)) return input;
	const nextChar = input[_base.length];
	if (nextChar && nextChar !== "/" && nextChar !== "?") return input;
	return "/" + input.slice(_base.length).replace(/^\/+/, "");
}
function withQuery(input, query) {
	const parsed = parseURL(input);
	parsed.search = stringifyQuery({
		...parseQuery(parsed.search),
		...query
	});
	return stringifyParsedURL(parsed);
}
function isEmptyURL(url) {
	return !url || url === "/";
}
function isNonEmptyURL(url) {
	return url && url !== "/";
}
function joinURL$1(base, ...input) {
	let url = base || "";
	for (const segment of input.filter((url2) => isNonEmptyURL(url2))) if (url) {
		const _segment = segment.replace(JOIN_LEADING_SLASH_RE$1, "");
		url = withTrailingSlash$1(url) + _segment;
	} else url = segment;
	return url;
}
var protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
	const _specialProtoMatch = input.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
	if (_specialProtoMatch) {
		const [, _proto, _pathname = ""] = _specialProtoMatch;
		return {
			protocol: _proto.toLowerCase(),
			pathname: _pathname,
			href: _proto + _pathname,
			auth: "",
			host: "",
			search: "",
			hash: ""
		};
	}
	if (!hasProtocol$1(input, { acceptRelative: true })) return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
	const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
	let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
	if (protocol === "file:") path = path.replace(/\/(?=[A-Za-z]:)/, "");
	const { pathname, search, hash } = parsePath(path);
	return {
		protocol: protocol.toLowerCase(),
		auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
		host,
		pathname,
		search,
		hash,
		[protocolRelative]: !protocol
	};
}
function parsePath(input = "") {
	const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
	return {
		pathname,
		search,
		hash
	};
}
function stringifyParsedURL(parsed) {
	const pathname = parsed.pathname || "";
	const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
	const hash = parsed.hash || "";
	const auth = parsed.auth ? parsed.auth + "@" : "";
	const host = parsed.host || "";
	return (parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "") + auth + host + pathname + search + hash;
}
//#endregion
//#region node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs
function isPlainObject(value) {
	if (value === null || typeof value !== "object") return false;
	const prototype = Object.getPrototypeOf(value);
	if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) return false;
	if (Symbol.iterator in value) return false;
	if (Symbol.toStringTag in value) return Object.prototype.toString.call(value) === "[object Module]";
	return true;
}
function _defu(baseObject, defaults, namespace = ".", merger) {
	if (!isPlainObject(defaults)) return _defu(baseObject, {}, namespace);
	const object = { ...defaults };
	for (const key of Object.keys(baseObject)) {
		if (key === "__proto__" || key === "constructor") continue;
		const value = baseObject[key];
		if (value === null || value === void 0) continue;
		if (Array.isArray(value) && Array.isArray(object[key])) object[key] = [...value, ...object[key]];
		else if (isPlainObject(value) && isPlainObject(object[key])) object[key] = _defu(value, object[key], (namespace ? `${namespace}.` : "") + key.toString());
		else object[key] = value;
	}
	return object;
}
function createDefu(merger) {
	return (...arguments_) => arguments_.reduce((p, c) => _defu(p, c, ""), {});
}
var defu = createDefu();
//#endregion
//#region node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs
function hasProp(obj, prop) {
	try {
		return prop in obj;
	} catch {
		return false;
	}
}
var H3Error = class extends Error {
	static __h3_error__ = true;
	statusCode = 500;
	fatal = false;
	unhandled = false;
	statusMessage;
	data;
	cause;
	constructor(message, opts = {}) {
		super(message, opts);
		if (opts.cause && !this.cause) this.cause = opts.cause;
	}
	toJSON() {
		const obj = {
			message: this.message,
			statusCode: sanitizeStatusCode(this.statusCode, 500)
		};
		if (this.statusMessage) obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
		if (this.data !== void 0) obj.data = this.data;
		return obj;
	}
};
function createError$1(input) {
	if (typeof input === "string") return new H3Error(input);
	if (isError(input)) return input;
	const err = new H3Error(input.message ?? input.statusMessage ?? "", { cause: input.cause || input });
	if (hasProp(input, "stack")) try {
		Object.defineProperty(err, "stack", { get() {
			return input.stack;
		} });
	} catch {
		try {
			err.stack = input.stack;
		} catch {}
	}
	if (input.data) err.data = input.data;
	if (input.statusCode) err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
	else if (input.status) err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
	if (input.statusMessage) err.statusMessage = input.statusMessage;
	else if (input.statusText) err.statusMessage = input.statusText;
	if (err.statusMessage) {
		const originalMessage = err.statusMessage;
		if (sanitizeStatusMessage(err.statusMessage) !== originalMessage) console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.");
	}
	if (input.fatal !== void 0) err.fatal = input.fatal;
	if (input.unhandled !== void 0) err.unhandled = input.unhandled;
	return err;
}
function isError(input) {
	return input?.constructor?.__h3_error__ === true;
}
function getRequestHost(event, opts = {}) {
	if (opts.xForwardedHost) {
		const xForwardedHost = (event.node.req.headers["x-forwarded-host"] || "").split(",").shift()?.trim();
		if (xForwardedHost) return xForwardedHost;
	}
	return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
	if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") return "https";
	return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
	const host = getRequestHost(event, opts);
	const protocol = getRequestProtocol(event, opts);
	const path = (event.node.req.originalUrl || event.path).replace(/^[/\\]+/g, "/");
	return new URL(path, `${protocol}://${host}`);
}
var DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
	return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
	if (!statusCode) return defaultStatusCode;
	if (typeof statusCode === "string") statusCode = Number.parseInt(statusCode, 10);
	if (statusCode < 100 || statusCode > 999) return defaultStatusCode;
	return statusCode;
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/utils.js
var PROBE_BASE_A = "https://a.invalid/probe/";
var PROBE_BASE_B = "https://b.invalid/probe/";
function parseAnchorURL(value, base = PROBE_BASE_A) {
	try {
		return new URL(value, base);
	} catch {
		return null;
	}
}
/** Whether a URL string is a path rooted at the current origin, so carries no protocol. */
function isRootedPath(value) {
	return value[0] === "/" && value[1] !== "/" && value[1] !== "\\";
}
/** Whether a URL string carries its own protocol or authority. */
function isAbsoluteHref(value) {
	if (!value || isRootedPath(value)) return false;
	const resolved = parseAnchorURL(value);
	return !!resolved && resolved.href === parseAnchorURL(value, PROBE_BASE_B)?.href;
}
/** The script-capable protocol a URL string would navigate to, or `null` when it is safe. */
function getScriptProtocol(value) {
	if (!value || isRootedPath(value)) return null;
	let resolved = parseAnchorURL(value.replace(/[\u0000-\u001F\u007F\s]+/g, ""));
	while (resolved?.protocol === "view-source:") resolved = parseAnchorURL(resolved.pathname);
	if (!resolved) return "";
	return isScriptProtocol(resolved.protocol) ? resolved.protocol : null;
}
/** Returns the value unchanged when safe to use as an anchor `href`, or `null`. */
function sanitizeAnchorHref(value) {
	return getScriptProtocol(value) === null ? value : null;
}

//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/diagnostics/head.js
/**
* E6xxx
* Head / unhead runtime diagnostics.
*/
var unheadDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region node_modules/.pnpm/unhead@3.4.3_esbuild@0.28.2_rolldown@1.2.13_rollup@4.64.5_vite@8.3.4_esbuild@0.28.2_jiti@2.7.0_terser@5.51.2_yaml@2.9.1_/node_modules/unhead/dist/shared/unhead.CHEy9ana.mjs
function defineHeadPlugin(plugin, key) {
	if (key && typeof plugin === "function") plugin.key = key;
	return plugin;
}
//#endregion
//#region node_modules/.pnpm/unhead@3.4.3_esbuild@0.28.2_rolldown@1.2.13_rollup@4.64.5_vite@8.3.4_esbuild@0.28.2_jiti@2.7.0_terser@5.51.2_yaml@2.9.1_/node_modules/unhead/dist/shared/unhead.CGPOfp5O.mjs
var MetaTagsArrayable = /* @__PURE__ */ new Set([
	"theme-color",
	"google-site-verification",
	"author",
	"og:locale:alternate",
	"og:image",
	"og:video",
	"og:audio",
	"article:author",
	"article:tag",
	"book:author",
	"book:tag",
	"twitter:image"
]);
var hasContent = (value) => typeof value === "number" ? Number.isFinite(value) : value;
//#endregion
//#region node_modules/.pnpm/unhead@3.4.3_esbuild@0.28.2_rolldown@1.2.13_rollup@4.64.5_vite@8.3.4_esbuild@0.28.2_jiti@2.7.0_terser@5.51.2_yaml@2.9.1_/node_modules/unhead/dist/shared/unhead.o8j9utSy.mjs
var META_NAMESPACES = ["twitter", "fediverse"];
var PROPERTY_NAMESPACES = [
	"og",
	"book",
	"article",
	"profile",
	"fb",
	"payment"
];
var MEDIA_KEYS = [
	"ogImage",
	"ogVideo",
	"ogAudio",
	"twitterImage"
];
var HTTP_EQUIV_KEYS = [
	"contentType",
	"defaultStyle",
	"xUaCompatible"
];
var META_ALIASES = {
	articleExpirationTime: "article:expiration_time",
	articleModifiedTime: "article:modified_time",
	articlePublishedTime: "article:published_time",
	bookReleaseDate: "book:release_date",
	fbAppId: "fb:app_id",
	ogAudioSecureUrl: "og:audio:secure_url",
	ogAudioUrl: "og:audio",
	ogImageSecureUrl: "og:image:secure_url",
	ogImageUrl: "og:image",
	ogSiteName: "og:site_name",
	ogVideoSecureUrl: "og:video:secure_url",
	ogVideoUrl: "og:video",
	paymentExpiresAt: "payment:expires_at",
	paymentSuccessUrl: "payment:success_url",
	profileFirstName: "profile:first_name",
	profileLastName: "profile:last_name",
	profileUsername: "profile:username",
	msapplicationConfig: "msapplication-Config",
	msapplicationTileColor: "msapplication-TileColor",
	msapplicationTileImage: "msapplication-TileImage"
};
var CAPS_RE = /([A-Z])/g;
var OG_TWITTER_RE = /^(?:og|twitter)/;
var MetaPackingSchema = {
	appleItunesApp: { unpack: {
		entrySeparator: ", ",
		resolve: ({ key, value }) => `${fixKeyCase(key)}=${value}`
	} },
	refresh: {
		metaKey: "http-equiv",
		unpack: {
			entrySeparator: ";",
			resolve: ({ key, value }) => key === "seconds" ? `${value}` : void 0
		}
	},
	robots: { unpack: {
		entrySeparator: ", ",
		resolve: ({ key, value }) => typeof value === "boolean" ? fixKeyCase(key) : `${fixKeyCase(key)}:${value}`
	} },
	contentSecurityPolicy: {
		metaKey: "http-equiv",
		unpack: {
			entrySeparator: "; ",
			resolve: ({ key, value }) => `${fixKeyCase(key)} ${value}`
		}
	},
	charset: {}
};
function fixKeyCase(key) {
	const updated = key.replace(CAPS_RE, "-$1").toLowerCase();
	const prefixIndex = updated.indexOf("-");
	return prefixIndex === -1 ? updated : META_NAMESPACES.includes(updated.slice(0, prefixIndex)) || PROPERTY_NAMESPACES.includes(updated.slice(0, prefixIndex)) ? key.replace(CAPS_RE, ":$1").toLowerCase() : updated;
}
function sanitizeObject(input) {
	return Object.fromEntries(Object.entries(input).filter(([k, v]) => String(v) !== "false" && k));
}
function normalizeRobotsDirectives(input) {
	if (input.index !== false && input.follow !== false) return input;
	const value = { ...input };
	if (value.index === false) {
		delete value.index;
		if (value.noindex === void 0) value.noindex = true;
	}
	if (value.follow === false) {
		delete value.follow;
		if (value.nofollow === void 0) value.nofollow = true;
	}
	return value;
}
function transformObject(obj) {
	return Array.isArray(obj) ? obj.map(transformObject) : !obj || typeof obj !== "object" ? obj : Object.fromEntries(Object.entries(obj).map(([k, v]) => [fixKeyCase(k), transformObject(v)]));
}
function unpackToString(value, options = {}) {
	const { entrySeparator = "", keyValueSeparator = "", wrapValue, resolve } = options;
	return Object.entries(value).map(([key, val]) => {
		if (resolve) {
			const resolved = resolve({
				key,
				value: val
			});
			if (resolved !== void 0) return resolved;
		}
		const processedVal = typeof val === "object" ? unpackToString(val, options) : typeof val === "number" ? val.toString() : typeof val === "string" && wrapValue ? `${wrapValue}${val.replace(new RegExp(wrapValue, "g"), `\\${wrapValue}`)}${wrapValue}` : val;
		return `${key}${keyValueSeparator}${processedVal}`;
	}).join(entrySeparator);
}
function handleObjectEntry(key, value) {
	const sanitizedValue = sanitizeObject(value);
	const fixedKey = fixKeyCase(key);
	const attr = resolveMetaKeyType(fixedKey);
	if (!MetaTagsArrayable.has(fixedKey)) return [{
		[attr]: fixedKey,
		...sanitizedValue
	}];
	return unpackMeta(Object.fromEntries(Object.entries(sanitizedValue).map(([k, v]) => [`${key}${k === "url" ? "" : `${k[0].toUpperCase()}${k.slice(1)}`}`, v])) || {}).sort((a, b) => (a[attr]?.length || 0) - (b[attr]?.length || 0));
}
function resolveMetaKeyType(key) {
	if (MetaPackingSchema[key]?.metaKey === "http-equiv" || HTTP_EQUIV_KEYS.includes(key)) return "http-equiv";
	const fixed = fixKeyCase(key);
	const colonIndex = fixed.indexOf(":");
	return colonIndex === -1 ? "name" : PROPERTY_NAMESPACES.includes(fixed.slice(0, colonIndex)) ? "property" : "name";
}
function resolveMetaKeyValue(key) {
	return META_ALIASES[key] || fixKeyCase(key);
}
function resolvePackedMetaObjectValue(value, key) {
	if (key === "refresh") return `${value.seconds};url=${value.url}`;
	return unpackToString(transformObject(value), {
		keyValueSeparator: "=",
		entrySeparator: ", ",
		resolve: ({ value: value2, key: key2 }) => value2 === null ? "" : typeof value2 === "boolean" ? key2 : void 0,
		...MetaPackingSchema[key]?.unpack
	});
}
function unpackMeta(input) {
	const extras = [];
	const primitives = {};
	for (const [key, value] of Object.entries(input)) {
		if (Array.isArray(value)) {
			if (key === "themeColor") {
				value.forEach((v) => {
					if (typeof v === "object" && v !== null) extras.push({
						name: "theme-color",
						...v
					});
				});
				continue;
			}
			for (const v of value) if (typeof v === "object" && v !== null) {
				const urlProps = [];
				const otherProps = [];
				for (const [propKey, propValue] of Object.entries(v)) {
					const meta2 = unpackMeta({ [`${key}${propKey === "url" ? "" : `:${propKey}`}`]: propValue });
					(propKey === "url" ? urlProps : otherProps).push(...meta2);
				}
				extras.push(...urlProps, ...otherProps);
			} else extras.push(...typeof v === "string" ? unpackMeta({ [key]: v }) : handleObjectEntry(key, v));
			continue;
		}
		if (typeof value === "object" && value) {
			if (MEDIA_KEYS.includes(key)) {
				const prefix = key.startsWith("twitter") ? "twitter" : "og";
				const type = key.replace(OG_TWITTER_RE, "").toLowerCase();
				const metaKey = prefix === "twitter" ? "name" : "property";
				if (value.url) extras.push({
					[metaKey]: `${prefix}:${type}`,
					content: value.url
				});
				if (value.secureUrl) extras.push({
					[metaKey]: `${prefix}:${type}:secure_url`,
					content: value.secureUrl
				});
				for (const [propKey, propValue] of Object.entries(value)) if (propKey !== "url" && propKey !== "secureUrl") extras.push({
					[metaKey]: `${prefix}:${type}:${propKey}`,
					content: propValue
				});
			} else if (MetaTagsArrayable.has(fixKeyCase(key))) extras.push(...handleObjectEntry(key, value));
			else primitives[key] = sanitizeObject(key === "robots" ? normalizeRobotsDirectives(value) : value);
		} else primitives[key] = value;
	}
	const meta = Object.entries(primitives).map(([key, value]) => {
		if (key === "charset") return { charset: value === null ? "_null" : value };
		const metaKey = resolveMetaKeyType(key);
		const keyValue = resolveMetaKeyValue(key);
		const processedValue = value === null ? "_null" : typeof value === "object" ? resolvePackedMetaObjectValue(value, key) : typeof value === "number" ? value.toString() : value;
		return metaKey === "http-equiv" ? {
			"http-equiv": keyValue,
			"content": processedValue
		} : {
			[metaKey]: keyValue,
			content: processedValue
		};
	});
	return [...extras, ...meta].map((m) => !("content" in m) ? m : m.content === "_null" ? {
		...m,
		content: null
	} : m);
}
//#endregion
//#region node_modules/.pnpm/unhead@3.4.3_esbuild@0.28.2_rolldown@1.2.13_rollup@4.64.5_vite@8.3.4_esbuild@0.28.2_jiti@2.7.0_terser@5.51.2_yaml@2.9.1_/node_modules/unhead/dist/shared/unhead.DkxnqlHC.mjs
var FlatMetaPlugin = /* @__PURE__ */ defineHeadPlugin({
	key: "flatMeta",
	hooks: { "entries:normalize": (ctx) => {
		let hasFlatMeta = false;
		const tags = [];
		const tagsToAdd = [];
		for (const t of ctx.tags) {
			if (t.tag !== "_flatMeta") {
				tags.push(t);
				continue;
			}
			hasFlatMeta = true;
			for (const props of unpackMeta(t.props)) tagsToAdd.push({
				...t,
				tag: "meta",
				props
			});
		}
		if (!hasFlatMeta) return;
		for (const tag of tagsToAdd) tags.push(tag);
		ctx.tags = tags;
	} }
});
//#endregion
//#region node_modules/.pnpm/unhead@3.4.3_esbuild@0.28.2_rolldown@1.2.13_rollup@4.64.5_vite@8.3.4_esbuild@0.28.2_jiti@2.7.0_terser@5.51.2_yaml@2.9.1_/node_modules/unhead/dist/shared/unhead.Bf_fPVYA.mjs
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(object, key) {
	return hasOwnProperty.call(object, key);
}
//#endregion
//#region node_modules/.pnpm/@unhead+vue@3.4.3_@oxc-project+types@0.153.0_esbuild@0.28.2_lightningcss@1.33.0_oxc-parser@0._xtq6ekfguijr6sedolhezjv4n4/node_modules/@unhead/vue/dist/shared/vue.DKb5ZKVl.mjs
var headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function injectHead$1() {
	if (hasInjectionContext()) {
		const instance = inject(headSymbol);
		if (instance) return instance;
	}
	throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
}
//#endregion
//#region node_modules/.pnpm/@unhead+vue@3.4.3_@oxc-project+types@0.153.0_esbuild@0.28.2_lightningcss@1.33.0_oxc-parser@0._xtq6ekfguijr6sedolhezjv4n4/node_modules/@unhead/vue/dist/shared/vue.CXwiCT15.mjs
function useHead$1(input, options = {}) {
	return (options.head || /* @__PURE__ */ injectHead$1()).push(input || {}, options);
}
function normalizeSeoMetaInput(input) {
	if (input._flatMeta) return input;
	const meta = {};
	for (const key in input) {
		if (!hasOwn(input, key) || key === "title" || key === "titleTemplate") continue;
		meta[key] = input[key];
	}
	return {
		title: input.title,
		titleTemplate: input.titleTemplate,
		_flatMeta: meta
	};
}
function useSeoMeta$1(input = {}, options = {}) {
	(options.head || /* @__PURE__ */ injectHead$1()).use(FlatMetaPlugin);
	const entry = useHead$1(normalizeSeoMetaInput(input), options);
	const corePatch = entry.patch;
	if (!entry.__patched) {
		entry.patch = (input2) => corePatch(normalizeSeoMetaInput(input2));
		entry.__patched = true;
	}
	return entry;
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/composables.js
/**
* Injects the head client from the Nuxt context or Vue inject.
*/
function injectHead(nuxtApp) {
	const nuxt = nuxtApp || useNuxtApp();
	return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
		if (hasInjectionContext()) {
			const head = inject("usehead");
			if (!head) throw unheadDiagnostics.NUXT_E6001();
			return head;
		}
	});
}
function useHead(input, options = {}) {
	return useHead$1(input, {
		head: options.head || injectHead(options.nuxt),
		...options
	});
}
function useSeoMeta(input, options = {}) {
	return useSeoMeta$1(input, {
		head: options.head || injectHead(options.nuxt),
		...options
	});
}

//#region node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs
var suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
var JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
	if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
		warnKeyDropped(key);
		return;
	}
	return value;
}
function warnKeyDropped(key) {
	console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
	if (typeof value !== "string") return value;
	if (value[0] === "\"" && value[value.length - 1] === "\"" && value.indexOf("\\") === -1) return value.slice(1, -1);
	const _value = value.trim();
	if (_value.length <= 9) switch (_value.toLowerCase()) {
		case "true": return true;
		case "false": return false;
		case "undefined": return;
		case "null": return null;
		case "nan": return NaN;
		case "infinity": return Number.POSITIVE_INFINITY;
		case "-infinity": return Number.NEGATIVE_INFINITY;
	}
	if (!JsonSigRx.test(value)) {
		if (options.strict) throw new SyntaxError("[destr] Invalid JSON");
		return value;
	}
	try {
		if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
			if (options.strict) throw new Error("[destr] Possible prototype pollution");
			return JSON.parse(value, jsonParseTransform);
		}
		return JSON.parse(value);
	} catch (error) {
		if (options.strict) throw error;
		return value;
	}
}
//#endregion
//#region node_modules/.pnpm/node-fetch-native@1.6.7/node_modules/node-fetch-native/dist/index.mjs
var o = !!globalThis.process?.env?.FORCE_NODE_FETCH;
var r = !o && globalThis.fetch || Mi;
var n = !o && globalThis.Headers || ye;
var T = !o && globalThis.AbortController || Mn;
//#endregion
//#region node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/shared/ofetch.CWycOUEr.mjs
var FetchError = class extends Error {
	constructor(message, opts) {
		super(message, opts);
		this.name = "FetchError";
		if (opts?.cause && !this.cause) this.cause = opts.cause;
	}
};
function createFetchError(ctx) {
	const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
	const method = ctx.request?.method || ctx.options?.method || "GET";
	const url = ctx.request?.url || String(ctx.request) || "/";
	const fetchError = new FetchError(`${`[${method}] ${JSON.stringify(url)}`}: ${ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>"}${errorMessage ? ` ${errorMessage}` : ""}`, ctx.error ? { cause: ctx.error } : void 0);
	for (const key of [
		"request",
		"options",
		"response"
	]) Object.defineProperty(fetchError, key, { get() {
		return ctx[key];
	} });
	for (const [key, refKey] of [
		["data", "_data"],
		["status", "status"],
		["statusCode", "status"],
		["statusText", "statusText"],
		["statusMessage", "statusText"]
	]) Object.defineProperty(fetchError, key, { get() {
		return ctx.response && ctx.response[refKey];
	} });
	return fetchError;
}
var payloadMethods = new Set(Object.freeze([
	"PATCH",
	"POST",
	"PUT",
	"DELETE"
]));
function isPayloadMethod(method = "GET") {
	return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
	if (value === void 0) return false;
	const t = typeof value;
	if (t === "string" || t === "number" || t === "boolean" || t === null) return true;
	if (t !== "object") return false;
	if (Array.isArray(value)) return true;
	if (value.buffer) return false;
	if (value instanceof FormData || value instanceof URLSearchParams) return false;
	return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
var textTypes = /* @__PURE__ */ new Set([
	"image/svg",
	"application/xml",
	"application/xhtml",
	"application/html"
]);
var JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
	if (!_contentType) return "json";
	const contentType = _contentType.split(";").shift() || "";
	if (JSON_RE.test(contentType)) return "json";
	if (contentType === "text/event-stream") return "stream";
	if (textTypes.has(contentType) || contentType.startsWith("text/")) return "text";
	return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
	const headers = mergeHeaders(input?.headers ?? request?.headers, defaults?.headers, Headers);
	let query;
	if (defaults?.query || defaults?.params || input?.params || input?.query) query = {
		...defaults?.params,
		...defaults?.query,
		...input?.params,
		...input?.query
	};
	return {
		...defaults,
		...input,
		query,
		params: query,
		headers
	};
}
function mergeHeaders(input, defaults, Headers) {
	if (!defaults) return new Headers(input);
	const headers = new Headers(defaults);
	if (input) for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) headers.set(key, value);
	return headers;
}
async function callHooks(context, hooks) {
	if (hooks) {
		if (Array.isArray(hooks)) for (const hook of hooks) await hook(context);
		else await hooks(context);
	}
}
var retryStatusCodes = /* @__PURE__ */ new Set([
	408,
	409,
	425,
	429,
	500,
	502,
	503,
	504
]);
var nullBodyResponses = /* @__PURE__ */ new Set([
	101,
	204,
	205,
	304
]);
function createFetch(globalOptions = {}) {
	const { fetch = globalThis.fetch, Headers = globalThis.Headers, AbortController = globalThis.AbortController } = globalOptions;
	async function onError(context) {
		const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
		if (context.options.retry !== false && !isAbort) {
			let retries;
			if (typeof context.options.retry === "number") retries = context.options.retry;
			else retries = isPayloadMethod(context.options.method) ? 0 : 1;
			const responseCode = context.response && context.response.status || 500;
			if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
				const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
				if (retryDelay > 0) await new Promise((resolve) => setTimeout(resolve, retryDelay));
				return $fetchRaw(context.request, {
					...context.options,
					retry: retries - 1
				});
			}
		}
		const error = createFetchError(context);
		if (Error.captureStackTrace) Error.captureStackTrace(error, $fetchRaw);
		throw error;
	}
	const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
		const context = {
			request: _request,
			options: resolveFetchOptions(_request, _options, globalOptions.defaults, Headers),
			response: void 0,
			error: void 0
		};
		if (context.options.method) context.options.method = context.options.method.toUpperCase();
		if (context.options.onRequest) {
			await callHooks(context, context.options.onRequest);
			if (!(context.options.headers instanceof Headers)) context.options.headers = new Headers(context.options.headers || {});
		}
		if (typeof context.request === "string") {
			if (context.options.baseURL) context.request = withBase$1(context.request, context.options.baseURL);
			if (context.options.query) {
				context.request = withQuery(context.request, context.options.query);
				delete context.options.query;
			}
			if ("query" in context.options) delete context.options.query;
			if ("params" in context.options) delete context.options.params;
		}
		if (context.options.body && isPayloadMethod(context.options.method)) {
			if (isJSONSerializable(context.options.body)) {
				const contentType = context.options.headers.get("content-type");
				if (typeof context.options.body !== "string") context.options.body = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(context.options.body).toString() : JSON.stringify(context.options.body);
				if (!contentType) context.options.headers.set("content-type", "application/json");
				if (!context.options.headers.has("accept")) context.options.headers.set("accept", "application/json");
			} else if ("pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || typeof context.options.body.pipe === "function") {
				if (!("duplex" in context.options)) context.options.duplex = "half";
			}
		}
		let abortTimeout;
		if (!context.options.signal && context.options.timeout) {
			const controller = new AbortController();
			abortTimeout = setTimeout(() => {
				const error = /* @__PURE__ */ new Error("[TimeoutError]: The operation was aborted due to timeout");
				error.name = "TimeoutError";
				error.code = 23;
				controller.abort(error);
			}, context.options.timeout);
			context.options.signal = controller.signal;
		}
		try {
			context.response = await fetch(context.request, context.options);
		} catch (error) {
			context.error = error;
			if (context.options.onRequestError) await callHooks(context, context.options.onRequestError);
			return await onError(context);
		} finally {
			if (abortTimeout) clearTimeout(abortTimeout);
		}
		if ((context.response.body || context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD") {
			const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
			switch (responseType) {
				case "json": {
					const data = await context.response.text();
					const parseFunction = context.options.parseResponse || destr;
					context.response._data = parseFunction(data);
					break;
				}
				case "stream":
					context.response._data = context.response.body || context.response._bodyInit;
					break;
				default: context.response._data = await context.response[responseType]();
			}
		}
		if (context.options.onResponse) await callHooks(context, context.options.onResponse);
		if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
			if (context.options.onResponseError) await callHooks(context, context.options.onResponseError);
			return await onError(context);
		}
		return context.response;
	};
	const $fetch = async function $fetch2(request, options) {
		return (await $fetchRaw(request, options))._data;
	};
	$fetch.raw = $fetchRaw;
	$fetch.native = (...args) => fetch(...args);
	$fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
		...globalOptions,
		...customGlobalOptions,
		defaults: {
			...globalOptions.defaults,
			...customGlobalOptions.defaults,
			...defaultOptions
		}
	});
	return $fetch;
}
//#endregion
//#region node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs
function createNodeFetch() {
	if (!JSON.parse(process.env.FETCH_KEEP_ALIVE || "false")) return r;
	const agentOptions = { keepAlive: true };
	const httpAgent = new Bt.Agent(agentOptions);
	const httpsAgent = new zs.Agent(agentOptions);
	const nodeFetchOptions = { agent(parsedURL) {
		return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
	} };
	return function nodeFetchWithKeepAlive(input, init) {
		return r(input, {
			...nodeFetchOptions,
			...init
		});
	};
}
var $fetch$2 = createFetch({
	fetch: globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch(),
	Headers: globalThis.Headers || n,
	AbortController: globalThis.AbortController || T
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Ffetch.mjs
if (!globalThis.$fetch) globalThis.$fetch = $fetch$2.create({ baseURL: baseURL() });
var $fetch = globalThis.$fetch;
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/composables/ssr.js
var $fetch$1$1 = $fetch;
/** @since 3.0.0 */
function useRequestEvent(nuxtApp) {
	nuxtApp ||= useNuxtApp();
	return nuxtApp.ssrContext?.event;
}
/** @since 3.2.0 */
function useRequestFetch() {
	return useRequestEvent()?.$fetch || $fetch$1$1;
}

//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/error.js
var NUXT_ERROR_SIGNATURE = "__nuxt_error";
/** @since 3.0.0 */
var isNuxtError = (error) => !!error && typeof error === "object" && "__nuxt_error" in error;
/** @since 3.0.0 */
var createError = (error) => {
	if (isNuxtError(error)) return error;
	if (typeof error !== "string" && error?.statusText) error.message ??= error.statusText;
	const nuxtError = createError$1(error ?? {});
	Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
		value: true,
		configurable: false,
		writable: false
	});
	Object.defineProperty(nuxtError, "status", {
		get: () => nuxtError.statusCode,
		configurable: true
	});
	Object.defineProperty(nuxtError, "statusText", {
		get: () => nuxtError.statusMessage,
		configurable: true
	});
	return nuxtError;
};
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/injections.js
var LayoutMetaSymbol = Symbol("layout-meta");
var PageRouteSymbol = Symbol("route");
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/diagnostics/navigation.js
/**
* E2xxx
* Navigation / routing / middleware runtime diagnostics.
*/
var navigationDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/composables/router.js
/** @since 3.0.0 */
var useRouter = (() => {
	return useNuxtApp()?.$router;
});
/**
* Whether the current effect scope is (a descendant of) the component instance's scope.
* A detached scope (e.g. `createSharedComposable`) outlives the component, so the
* per-page route injected there would freeze after navigation (#18903).
*/
function getParentScope(scope) {
	const internal = scope;
	return internal.parent ?? internal.subs?.sub;
}
function isScopeWithinInstance(instance) {
	const instanceScope = instance.scope;
	let scope = getCurrentScope();
	while (scope) {
		if (scope === instanceScope) return true;
		scope = getParentScope(scope);
	}
	return false;
}
/** @since 3.0.0 */
var useRoute$1 = (() => {
	if (hasInjectionContext()) {
		const instance = getCurrentInstance();
		if (!instance || isScopeWithinInstance(instance)) return inject(PageRouteSymbol, useNuxtApp()._route);
	}
	return useNuxtApp()._route;
});
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtRouteMiddleware(middleware) {
	return middleware;
}
/** @since 3.0.0 */
var isProcessingMiddleware = () => {
	try {
		if (useNuxtApp()._processingMiddleware) return true;
	} catch {
		return false;
	}
	return false;
};
var HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
var HTML_ATTR_ENCODE_MAP = {
	"&": "&amp;",
	"\"": "&quot;",
	"'": "&#x27;",
	"<": "&lt;",
	">": "&gt;"
};
function encodeForHtmlAttr(value) {
	return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
/**
* A helper that aids in programmatic navigation within your Nuxt application.
*
* Can be called on the server and on the client, within pages, route middleware, plugins, and more.
* @param {RouteLocationRaw | undefined | null} [to] - The route to navigate to. Accepts a route object, string path, `undefined`, or `null`. Defaults to '/'.
* @param {NavigateToOptions} [options] - Optional customization for controlling the behavior of the navigation.
* @returns {Promise<void | NavigationFailure | false> | false | void | RouteLocationRaw} The navigation result, which varies depending on context and options.
* @see https://nuxt.com/docs/4.x/api/utils/navigate-to
* @since 3.0.0
*/
var navigateTo = (to, options) => {
	to ||= "/";
	const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
	const isExternalHost = isAbsoluteHref(toPath);
	const isExternal = options?.external || isExternalHost;
	if (isExternal) {
		if (!options?.external) throw navigationDiagnostics.NUXT_E2001({ toPath });
		const protocol = getScriptProtocol(toPath);
		if (protocol !== null) throw navigationDiagnostics.NUXT_E2002({
			toPath,
			protocol
		});
	}
	const inMiddleware = isProcessingMiddleware();
	const router = useRouter();
	const nuxtApp = useNuxtApp();
	if (nuxtApp.ssrContext) {
		const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
		const location = isExternal ? toPath : joinURL$1((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
		const redirect = async function(response) {
			await nuxtApp.callHook("app:redirected");
			const encodedHeader = encodeURL(location, isExternalHost);
			const encodedLoc = encodeForHtmlAttr(encodedHeader);
			nuxtApp.ssrContext["~renderResponse"] = {
				statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
				body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
				headers: { location: encodedHeader }
			};
			return response;
		};
		if (!isExternal && inMiddleware) {
			let expectedPath = fullPath;
			if (typeof to === "string" && toPath.includes("?")) {
				const target = router.resolve(to);
				expectedPath = router.resolve({
					path: target.path,
					query: target.query,
					hash: target.hash
				}).fullPath || "/";
			}
			router.afterEach((final) => final.fullPath === expectedPath ? redirect(false) : void 0);
			return to;
		}
		return redirect(!inMiddleware ? void 0 : false);
	}
	if (isExternal) {
		nuxtApp._scope.stop();
		if (options?.replace) (void 0).replace(toPath);
		else (void 0).href = toPath;
		if (inMiddleware) {
			if (!nuxtApp.isHydrating) return false;
			return new Promise(() => {});
		}
		return Promise.resolve();
	}
	const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
	return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
/**
* @internal
*/
function resolveRouteObject(to) {
	return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
/**
* @internal
*/
function encodeURL(location, isExternalHost = false) {
	const url = new URL(location, "http://localhost");
	if (!isExternalHost) return url.pathname.replace(/^\/{2,}/, "/") + url.search + url.hash;
	if (location.startsWith("//")) return url.toString().replace(url.protocol, "");
	return url.toString();
}
/**
* Encode the pathname of a route location string. Ensures decoded paths like
* `/café` are percent-encoded to match vue-router's encoded route records.
* Already-encoded paths are not double-encoded.
* @internal
*/
function encodeRoutePath(url) {
	const parsed = parseURL(url);
	return encodeVueRouterPath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
var ENC_PIPE_RE = /%7C/g;
var ENC_BRACKET_OPEN_RE = /%5B/g;
var ENC_BRACKET_CLOSE_RE = /%5D/g;
var ENC_ENC_SLASH_RE = /%252F/gi;
var HASH_RE$1 = /#/g;
var QUESTION_MARK_RE = /\?/g;
/**
* Apply vue-router's own path encoding, which leaves sub-delimiters like `&`
* and `+` literal. This must stay in sync with `encodeVueRouterPath` in
* `unrouting`, which encodes the route records we need to match against.
*/
function encodeVueRouterPath(value) {
	return encodeURI(value).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]").replace(HASH_RE$1, "%23").replace(QUESTION_MARK_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F");
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/composables/error.js
/** @since 3.0.0 */
var useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
/** @since 3.0.0 */
var showError = (error) => {
	const nuxtError = createError(error);
	try {
		const error = /* @__PURE__ */ useError();
		error.value ||= nuxtError;
	} catch {
		throw nuxtError;
	}
	return nuxtError;
};
/**
* Show the error page unless the current client is a crawler, in which case the
* bot receives the already server-rendered HTML instead (#32137, #35338).
*
* @internal
*/
var _showErrorUnlessCrawler = async (nuxtApp, error) => {
	await nuxtApp.runWithContext(() => showError(error));
};
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/utils.js
var ROUTE_KEY_PARENTHESES_RE$1 = /(:\w+)\([^)]+\)/g;
var ROUTE_KEY_SYMBOLS_RE$1 = /(:\w+)[?+*]/g;
var ROUTE_KEY_NORMAL_RE$1 = /:\w+/g;
function generateRouteKey$1(route) {
	const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE$1, "$1").replace(ROUTE_KEY_SYMBOLS_RE$1, "$1").replace(ROUTE_KEY_NORMAL_RE$1, (r) => route.params[r.slice(1)]?.toString() || "");
	return typeof source === "function" ? source(route) : source;
}
/**
* Utility used within router guards
* return true if the route has been changed with a page change during navigation
*/
function isChangingPage(to, from) {
	if (to === from || from === START_LOCATION) return false;
	if (generateRouteKey$1(to) !== generateRouteKey$1(from)) return true;
	if (to.matched.every((comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default)) return false;
	return true;
}
var VALID_TAG_RE = /^[a-z][a-z0-9-]*$/i;
/** Return `tag` if it is a safe HTML tag name, otherwise `fallback`. */
function sanitizeTag(tag, fallback) {
	return tag && VALID_TAG_RE.test(tag) ? tag : fallback;
}

//#region node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs
function klona(x) {
	if (typeof x !== "object") return x;
	var k, tmp, str = Object.prototype.toString.call(x);
	if (str === "[object Object]") {
		if (x.constructor !== Object && typeof x.constructor === "function") {
			tmp = new x.constructor();
			for (k in x) if (x.hasOwnProperty(k) && tmp[k] !== x[k]) tmp[k] = klona(x[k]);
		} else {
			tmp = {};
			for (k in x) if (k === "__proto__") Object.defineProperty(tmp, k, {
				value: klona(x[k]),
				configurable: true,
				enumerable: true,
				writable: true
			});
			else tmp[k] = klona(x[k]);
		}
		return tmp;
	}
	if (str === "[object Array]") {
		k = x.length;
		for (tmp = Array(k); k--;) tmp[k] = klona(x[k]);
		return tmp;
	}
	if (str === "[object Set]") {
		tmp = /* @__PURE__ */ new Set();
		x.forEach(function(val) {
			tmp.add(klona(val));
		});
		return tmp;
	}
	if (str === "[object Map]") {
		tmp = /* @__PURE__ */ new Map();
		x.forEach(function(val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}
	if (str === "[object Date]") return /* @__PURE__ */ new Date(+x);
	if (str === "[object RegExp]") {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}
	if (str === "[object DataView]") return new x.constructor(klona(x.buffer));
	if (str === "[object ArrayBuffer]") return x.slice(0);
	if (str.slice(-6) === "Array]") return new x.constructor(x);
	return x;
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fapp.config.mjs
var inlineConfig = {
	"nuxt": {},
	"icon": {
		"provider": "server",
		"class": "",
		"aliases": {},
		"iconifyApiEndpoint": "https://api.iconify.design",
		"localApiEndpoint": "/api/_nuxt_icon",
		"fallbackToApi": true,
		"cssSelectorPrefix": "i-",
		"cssWherePseudo": true,
		"mode": "css",
		"attrs": { "aria-hidden": true },
		"collections": [
			"academicons",
			"akar-icons",
			"ant-design",
			"arcticons",
			"basil",
			"bi",
			"bitcoin-icons",
			"bpmn",
			"brandico",
			"bx",
			"bxl",
			"bxs",
			"bytesize",
			"carbon",
			"catppuccin",
			"cbi",
			"charm",
			"ci",
			"cib",
			"cif",
			"cil",
			"circle-flags",
			"circum",
			"clarity",
			"codex",
			"codicon",
			"covid",
			"cryptocurrency",
			"cryptocurrency-color",
			"cuida",
			"dashicons",
			"devicon",
			"devicon-plain",
			"dinkie-icons",
			"duo-icons",
			"ei",
			"el",
			"emojione",
			"emojione-monotone",
			"emojione-v1",
			"entypo",
			"entypo-social",
			"eos-icons",
			"ep",
			"et",
			"eva",
			"f7",
			"fa",
			"fa-brands",
			"fa-regular",
			"fa-solid",
			"fa6-brands",
			"fa6-regular",
			"fa6-solid",
			"fa7-brands",
			"fa7-regular",
			"fa7-solid",
			"fad",
			"famicons",
			"fe",
			"feather",
			"file-icons",
			"flag",
			"flagpack",
			"flat-color-icons",
			"flat-ui",
			"flowbite",
			"fluent",
			"fluent-color",
			"fluent-emoji",
			"fluent-emoji-flat",
			"fluent-emoji-high-contrast",
			"fluent-mdl2",
			"fontelico",
			"fontisto",
			"formkit",
			"foundation",
			"fxemoji",
			"gala",
			"game-icons",
			"garden",
			"geo",
			"gg",
			"gis",
			"gravity-ui",
			"gridicons",
			"grommet-icons",
			"guidance",
			"healthicons",
			"heroicons",
			"heroicons-outline",
			"heroicons-solid",
			"hugeicons",
			"humbleicons",
			"ic",
			"icomoon-free",
			"icon-park",
			"icon-park-outline",
			"icon-park-solid",
			"icon-park-twotone",
			"iconamoon",
			"iconoir",
			"icons8",
			"il",
			"ion",
			"iwwa",
			"ix",
			"jam",
			"la",
			"lets-icons",
			"line-md",
			"lineicons",
			"logos",
			"ls",
			"lsicon",
			"lucide",
			"lucide-lab",
			"mage",
			"majesticons",
			"maki",
			"map",
			"marketeq",
			"material-icon-theme",
			"material-symbols",
			"material-symbols-light",
			"mdi",
			"mdi-light",
			"medical-icon",
			"memory",
			"meteocons",
			"meteor-icons",
			"mi",
			"mingcute",
			"mono-icons",
			"mynaui",
			"nimbus",
			"nonicons",
			"noto",
			"noto-v1",
			"nrk",
			"octicon",
			"oi",
			"ooui",
			"openmoji",
			"oui",
			"pajamas",
			"pepicons",
			"pepicons-pencil",
			"pepicons-pop",
			"pepicons-print",
			"ph",
			"picon",
			"pixel",
			"pixelarticons",
			"prime",
			"proicons",
			"ps",
			"qlementine-icons",
			"quill",
			"radix-icons",
			"raphael",
			"ri",
			"rivet-icons",
			"roentgen",
			"si",
			"si-glyph",
			"sidekickicons",
			"simple-icons",
			"simple-line-icons",
			"skill-icons",
			"solar",
			"stash",
			"streamline",
			"streamline-block",
			"streamline-color",
			"streamline-cyber",
			"streamline-cyber-color",
			"streamline-emojis",
			"streamline-flex",
			"streamline-flex-color",
			"streamline-freehand",
			"streamline-freehand-color",
			"streamline-kameleon-color",
			"streamline-logos",
			"streamline-pixel",
			"streamline-plump",
			"streamline-plump-color",
			"streamline-sharp",
			"streamline-sharp-color",
			"streamline-stickies-color",
			"streamline-ultimate",
			"streamline-ultimate-color",
			"subway",
			"svg-spinners",
			"system-uicons",
			"tabler",
			"tdesign",
			"teenyicons",
			"temaki",
			"token",
			"token-branded",
			"topcoat",
			"twemoji",
			"typcn",
			"uil",
			"uim",
			"uis",
			"uit",
			"uiw",
			"unjs",
			"vaadin",
			"vs",
			"vscode-icons",
			"websymbol",
			"weui",
			"whh",
			"wi",
			"wpf",
			"zmdi",
			"zondicons"
		],
		"fetchTimeout": 1500
	}
};
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/config.js
function useAppConfig() {
	const nuxtApp = useNuxtApp();
	nuxtApp._appConfig ||= klona(inlineConfig);
	return nuxtApp._appConfig;
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/utils/debounce-tick.js
/**
* Debounce an async function so that repeated calls within the same tick are
* collapsed into a single call (plus a trailing call if arguments arrived
* while the debounced call was still pending).
*
* Adapted from https://github.com/unjs/perfect-debounce with the timeout
* replaced by Vue's post-flush callback queue.
*/
function debounceTick(fn, options = {}) {
	let leadingValue;
	let active = false;
	let resolveList = [];
	let currentPromise;
	let trailingArgs;
	const applyFn = (_this, args) => {
		const promise = _applyPromised(fn, _this, args);
		currentPromise = promise;
		promise.finally(() => {
			currentPromise = void 0;
			if (trailingArgs && !active) {
				const args = trailingArgs;
				trailingArgs = void 0;
				applyFn(_this, args);
			}
		});
		return promise;
	};
	return function(...args) {
		trailingArgs = args;
		if (currentPromise) return currentPromise;
		return new Promise((resolve) => {
			const shouldCallNow = options.leading && !active;
			if (!active) {
				active = true;
				queuePostFlushCb(() => {
					active = false;
					const flushArgs = trailingArgs ?? args;
					trailingArgs = void 0;
					const promise = options.leading ? leadingValue : applyFn(this, flushArgs);
					for (const _resolve of resolveList) _resolve(promise);
					resolveList = [];
				});
			}
			if (shouldCallNow) {
				leadingValue = applyFn(this, args);
				resolve(leadingValue);
			} else resolveList.push(resolve);
		});
	};
}
async function _applyPromised(fn, _this, args) {
	return await fn.apply(_this, args);
}
defineComponent({
	name: "ServerPlaceholder",
	render() {
		return createElementBlock("div");
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/client-only.js
var clientOnlySymbol = Symbol.for("nuxt:client-only");
defineComponent({
	name: "ClientOnly",
	inheritAttrs: false,
	props: [
		"fallback",
		"placeholder",
		"placeholderTag",
		"fallbackTag"
	],
	setup(props, { slots, attrs }) {
		const mounted = shallowRef(false);
		const vm = getCurrentInstance();
		if (vm) vm._nuxtClientOnly = true;
		provide(clientOnlySymbol, true);
		return () => {
			if (mounted.value) {
				const vnodes = slots.default?.();
				if (vnodes && vnodes.length === 1 && true) return [cloneVNode(vnodes[0], attrs)];
				return vnodes;
			}
			const slot = slots.fallback || slots.placeholder;
			if (slot) return h(slot);
			const fallbackStr = props.fallback || props.placeholder || "";
			const fallbackTag = sanitizeTag(props.fallbackTag || props.placeholderTag, "span");
			return createElementBlock(fallbackTag, attrs, fallbackStr);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/diagnostics/data.js
/**
* E3xxx
* Data fetching (useFetch / useAsyncData) runtime diagnostics.
*/
var dataDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/composables/asyncData.js
/** @internal */
function _createUseAsyncData(options = {}) {
	{
		function useAsyncData(...args) {
			const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
			if (_isAutoKeyNeeded(args[0], args[1])) args.unshift(autoKey);
			let [_key, _handler, opts = {}] = args;
			const key = isRef(_key) || typeof _key === "function" ? computed(() => toValue(_key)) : { value: _key };
			if (!key.value || typeof key.value !== "string") throw dataDiagnostics.NUXT_E3008();
			if (typeof _handler !== "function") throw dataDiagnostics.NUXT_E3009();
			const shouldFactoryOptionsOverride = typeof options === "function";
			const nuxtApp = useNuxtApp();
			const factoryOptions = shouldFactoryOptionsOverride ? options(opts) : options;
			if (!shouldFactoryOptionsOverride) for (const key in factoryOptions) {
				if (factoryOptions[key] === void 0) continue;
				if (opts[key] !== void 0) continue;
				opts[key] = factoryOptions[key];
			}
			opts.server ??= true;
			opts.default ??= getDefault;
			opts.getCachedData ??= getDefaultCachedData;
			opts.lazy ??= false;
			opts.immediate ??= true;
			opts.deep ??= asyncDataDefaults.deep;
			opts.dedupe ??= "cancel";
			opts.enabled ??= true;
			if (shouldFactoryOptionsOverride) for (const key in factoryOptions) {
				if (factoryOptions[key] === void 0) continue;
				opts[key] = factoryOptions[key];
			}
			nuxtApp._asyncData[key.value];
			function createInitialFetch() {
				const initialFetchOptions = {
					cause: "initial",
					dedupe: opts.dedupe
				};
				const existing = nuxtApp._asyncData[key.value];
				if (!existing?._init) {
					initialFetchOptions.cachedData = opts.getCachedData(key.value, nuxtApp, { cause: "initial" });
					nuxtApp._asyncData[key.value] = buildAsyncData(nuxtApp, key.value, _handler, opts, initialFetchOptions.cachedData);
					nuxtApp._asyncData[key.value]._initialCachedData = initialFetchOptions.cachedData;
				} else if (nuxtApp._asyncDataPromises[key.value]) initialFetchOptions.cachedData = existing._initialCachedData;
				return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
			}
			const initialFetch = createInitialFetch();
			const asyncData = nuxtApp._asyncData[key.value];
			asyncData._deps++;
			const fetchOnServer = opts.server !== false && nuxtApp.payload.serverRendered;
			const isWithinVaporComponent = () => {
				return false;
			};
			if (fetchOnServer && opts.immediate) {
				const promise = initialFetch();
				if (getCurrentInstance() || isWithinVaporComponent()) onServerPrefetch(() => promise);
				else nuxtApp.hook("app:created", async () => {
					await promise;
				});
			}
			const asyncReturn = {
				data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data, !opts.deep),
				pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
				status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
				error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
				refresh: (...args) => {
					if (!nuxtApp._asyncData[key.value]?._init) return createInitialFetch()();
					return nuxtApp._asyncData[key.value].execute(...args);
				},
				execute: (...args) => asyncReturn.refresh(...args),
				clear: () => {
					const entry = nuxtApp._asyncData[key.value];
					if (entry?._abortController) try {
						entry._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
					} finally {
						entry._abortController = void 0;
					}
					clearNuxtDataByKey(nuxtApp, key.value);
				}
			};
			const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
			Object.assign(asyncDataPromise, asyncReturn);
			Object.defineProperties(asyncDataPromise, {
				then: {
					enumerable: true,
					value: asyncDataPromise.then.bind(asyncDataPromise)
				},
				catch: {
					enumerable: true,
					value: asyncDataPromise.catch.bind(asyncDataPromise)
				},
				finally: {
					enumerable: true,
					value: asyncDataPromise.finally.bind(asyncDataPromise)
				}
			});
			return asyncDataPromise;
		}
		return useAsyncData;
	}
}
var useAsyncData = _createUseAsyncData();
function writableComputedRef(getter, shallow = false) {
	const forwardedRef = computed({
		get() {
			return getter()?.value;
		},
		set(value) {
			const ref = getter();
			if (ref) ref.value = value;
		}
	});
	if (shallow) forwardedRef.__v_isShallow = true;
	return forwardedRef;
}
/** @internal */
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
	if (typeof keyOrFetcher === "string") return false;
	if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) return false;
	if (typeof keyOrFetcher === "function" && typeof fetcher === "function") return false;
	return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
	delete nuxtApp.payload.data[key];
	delete nuxtApp.payload._errors[key];
	if (nuxtApp._asyncData[key]) {
		nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
		nuxtApp._asyncData[key].error.value = void 0;
		nuxtApp._asyncData[key].status.value = "idle";
		nuxtApp._asyncData[key]._initialCachedData = void 0;
	}
	delete nuxtApp._asyncDataPromises[key];
}
function pick(obj, keys) {
	const newObj = {};
	for (const key of keys) newObj[key] = obj[key];
	return newObj;
}
function buildAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
	nuxtApp.payload._errors[key] ??= void 0;
	const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
	const handler = _handler ;
	const _ref = options.deep ? ref : shallowRef;
	const hasCachedData = initialCachedData !== void 0;
	const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
		if (!keys || keys.includes(key)) await asyncData.execute({ cause: "refresh:hook" });
	});
	const asyncData = {
		data: _ref(hasCachedData ? initialCachedData : options.default()),
		pending: computed(() => asyncData.status.value === "pending"),
		error: toRef(nuxtApp.payload._errors, key),
		status: shallowRef("idle"),
		execute: (...args) => {
			const [_opts, newValue = void 0] = args;
			const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
			if (nuxtApp._asyncDataPromises[key]) {
				if ((opts.dedupe ?? options.dedupe) === "defer") return nuxtApp._asyncDataPromises[key];
			}
			{
				const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
				if (cachedData !== void 0) {
					if (options.serialize !== false) nuxtApp.payload.data[key] = cachedData;
					asyncData.data.value = cachedData;
					asyncData.error.value = void 0;
					asyncData.status.value = "success";
					return Promise.resolve(cachedData);
				}
			}
			if (toValue(options.enabled) === false) return Promise.resolve(asyncData.data.value);
			if (asyncData._abortController) asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
			asyncData._abortController = new AbortController();
			asyncData.status.value = "pending";
			const cleanupController = new AbortController();
			const promise = new Promise((resolve, reject) => {
				try {
					const timeout = opts.timeout ?? options.timeout;
					const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
					if (mergedSignal.aborted) {
						const reason = mergedSignal.reason;
						reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
						return;
					}
					mergedSignal.addEventListener("abort", () => {
						const reason = mergedSignal.reason;
						reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
					}, {
						once: true,
						signal: cleanupController.signal
					});
					const ctx = { signal: mergedSignal };
					let run = () => Promise.resolve(handler(nuxtApp, ctx));
					if (options.middleware?.length) for (let i = options.middleware.length - 1; i >= 0; i--) {
						const middleware = options.middleware[i];
						const next = run;
						run = () => Promise.resolve(middleware(next, ctx));
					}
					return run().then(resolve, reject);
				} catch (err) {
					reject(err);
				}
			}).then(async (_result) => {
				if (nuxtApp._asyncDataPromises[key] !== promise) return;
				let result = _result;
				if (options.transform) result = await options.transform(_result);
				if (options.pick) result = pick(result, options.pick);
				if (options.serialize !== false) nuxtApp.payload.data[key] = result;
				asyncData.data.value = result;
				asyncData.error.value = void 0;
				asyncData.status.value = "success";
			}).catch((error) => {
				if (nuxtApp._asyncDataPromises[key] !== promise) return nuxtApp._asyncDataPromises[key];
				if (asyncData._abortController?.signal.aborted) return nuxtApp._asyncDataPromises[key];
				if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
					asyncData.status.value = "idle";
					return nuxtApp._asyncDataPromises[key];
				}
				asyncData.error.value = createError(error);
				asyncData.data.value = unref(options.default());
				asyncData.status.value = "error";
			}).finally(() => {
				cleanupController.abort();
				if (nuxtApp._asyncDataPromises[key] === promise) delete nuxtApp._asyncDataPromises[key];
			});
			nuxtApp._asyncDataPromises[key] = promise;
			return nuxtApp._asyncDataPromises[key];
		},
		_execute: debounceTick((...args) => asyncData.execute(...args)),
		_default: options.default,
		_deps: 0,
		_init: true,
		_hash: void 0,
		_off: () => {
			unsubRefreshAsyncData();
			if (nuxtApp._asyncData[key] !== asyncData) return;
			if (nuxtApp._asyncData[key]?._init) nuxtApp._asyncData[key]._init = false;
			if (nuxtApp._asyncDataPromises[key]) {
				asyncData._abortController?.abort(new DOMException("AsyncData request cancelled by unmount", "AbortError"));
				delete nuxtApp._asyncDataPromises[key];
				if (asyncData.status.value === "pending") asyncData.status.value = "idle";
			}
			if (!hasCustomGetCachedData) nextTick(() => {
				if (!nuxtApp._asyncData[key]?._init) {
					clearNuxtDataByKey(nuxtApp, key);
					asyncData.execute = () => Promise.resolve();
				}
			});
		}
	};
	return asyncData;
}
var getDefault = () => void 0;
var getDefaultCachedData = (key, nuxtApp, ctx) => {
	if (nuxtApp.isHydrating) return nuxtApp.payload.data[key];
	if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") return nuxtApp.static.data[key];
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
	const list = signals.filter((s) => !!s);
	if (typeof timeout === "number" && timeout >= 0) {
		const timeoutSignal = AbortSignal.timeout?.(timeout);
		if (timeoutSignal) list.push(timeoutSignal);
	}
	if (AbortSignal.any) return AbortSignal.any(list);
	const controller = new AbortController();
	for (const sig of list) if (sig.aborted) {
		const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
		try {
			controller.abort(reason);
		} catch {
			controller.abort();
		}
		return controller.signal;
	}
	const onAbort = () => {
		const reason = list.find((s) => s.aborted)?.reason ?? new DOMException("Aborted", "AbortError");
		try {
			controller.abort(reason);
		} catch {
			controller.abort();
		}
	};
	for (const sig of list) sig.addEventListener?.("abort", onAbort, {
		once: true,
		signal: cleanupSignal
	});
	return controller.signal;
}
//#endregion
//#region node_modules/.pnpm/ohash@2.0.12/node_modules/ohash/dist/_chunks/is-equal.mjs
function serialize(input) {
	if (typeof input === "string") return `'${input}'`;
	return new Serializer().serialize(input);
}
var asciiOrder = " _-,;:!?.'\"()[]{}@*/\\&#%`^+<=>|~$0123456789abcdefghijklmnopqrstuvwxyz";
var asciiWeights = /*@__PURE__*/ (function() {
	const weights = /* @__PURE__ */ new Uint8Array(128);
	for (let i = 0; i < 69; i++) weights[asciiOrder.charCodeAt(i)] = i + 1;
	for (let code = 65; code <= 90; code++) weights[code] = weights[code + 32];
	return weights;
})();
function compareStrings(a, b) {
	if (a === b) return 0;
	const length = Math.min(a.length, b.length);
	let tieBreaker = 0;
	for (let i = 0; i < length; i++) {
		const codeA = a.charCodeAt(i);
		const codeB = b.charCodeAt(i);
		if (codeA === codeB) continue;
		const weightA = codeA < 128 && asciiWeights[codeA] ? asciiWeights[codeA] : codeA + 128;
		const weightB = codeB < 128 && asciiWeights[codeB] ? asciiWeights[codeB] : codeB + 128;
		if (weightA !== weightB) return weightA < weightB ? -1 : 1;
		if (tieBreaker === 0) tieBreaker = codeA > codeB ? -1 : 1;
	}
	if (a.length !== b.length) return a.length < b.length ? -1 : 1;
	return tieBreaker;
}
var Serializer = /*@__PURE__*/ (function() {
	class Serializer {
		#context = /* @__PURE__ */ new Map();
		compare(a, b) {
			const typeA = typeof a;
			const typeB = typeof b;
			if (typeA === "string" && typeB === "string") return compareStrings(a, b);
			if (typeA === "number" && typeB === "number") return a - b;
			return compareStrings(this.serialize(a, true), this.serialize(b, true));
		}
		serialize(value, noQuotes) {
			if (value === null) return "null";
			switch (typeof value) {
				case "string": return noQuotes ? value : `'${value}'`;
				case "bigint": return `${value}n`;
				case "object": return this.$object(value);
				case "function": return this.$function(value);
			}
			return String(value);
		}
		serializeObject(object) {
			const objString = Object.prototype.toString.call(object);
			if (objString !== "[object Object]") return this.serializeBuiltInType(objString.length < 10 ? `unknown:${objString}` : objString.slice(8, -1), object);
			const constructor = object.constructor;
			const objName = constructor === Object || constructor === void 0 ? "" : constructor.name;
			if (objName !== "" && globalThis[objName] === constructor) return this.serializeBuiltInType(objName, object);
			if ("toJSON" in object && typeof object.toJSON === "function") {
				const json = object.toJSON();
				return objName + (json !== null && typeof json === "object" ? this.$object(json) : `(${this.serialize(json)})`);
			}
			const keys = Object.keys(object).sort(compareStrings);
			let content = `${objName}{`;
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				content += `${key}:${this.serialize(object[key])}`;
				if (i < keys.length - 1) content += ",";
			}
			return content + "}";
		}
		serializeBuiltInType(type, object) {
			const handler = this["$" + type];
			if (handler) return handler.call(this, object);
			if (typeof object.entries === "function") return this.serializeObjectEntries(type, object.entries());
			throw new Error(`Cannot serialize ${type}`);
		}
		serializeObjectEntries(type, entries) {
			const sortedEntries = Array.from(entries).sort((a, b) => this.compare(a[0], b[0]));
			let content = `${type}{`;
			for (let i = 0; i < sortedEntries.length; i++) {
				const [key, value] = sortedEntries[i];
				content += `${this.serialize(key, true)}:${this.serialize(value)}`;
				if (i < sortedEntries.length - 1) content += ",";
			}
			return content + "}";
		}
		$object(object) {
			let content = this.#context.get(object);
			if (content === void 0) {
				this.#context.set(object, `#${this.#context.size}`);
				content = this.serializeObject(object);
				this.#context.set(object, content);
			}
			return content;
		}
		$function(fn) {
			const fnStr = Function.prototype.toString.call(fn);
			if (fnStr.slice(-15) === "[native code] }") return `${fn.name || ""}()[native]`;
			return `${fn.name}(${fn.length})${fnStr.replace(/\s*\n\s*/g, "")}`;
		}
		$Array(arr) {
			let content = "[";
			for (let i = 0; i < arr.length; i++) {
				content += this.serialize(arr[i]);
				if (i < arr.length - 1) content += ",";
			}
			return content + "]";
		}
		$Date(date) {
			try {
				return `Date(${date.toISOString()})`;
			} catch {
				return `Date(null)`;
			}
		}
		$ArrayBuffer(arr) {
			return `ArrayBuffer[${new Uint8Array(arr).join(",")}]`;
		}
		$Set(set) {
			return `Set${this.$Array(Array.from(set).sort((a, b) => this.compare(a, b)))}`;
		}
		$Map(map) {
			return this.serializeObjectEntries("Map", map.entries());
		}
	}
	for (const type of [
		"Error",
		"RegExp",
		"URL"
	]) Serializer.prototype["$" + type] = function(val) {
		return `${type}(${val})`;
	};
	for (const type of [
		"Int8Array",
		"Uint8Array",
		"Uint8ClampedArray",
		"Int16Array",
		"Uint16Array",
		"Int32Array",
		"Uint32Array",
		"Float32Array",
		"Float64Array"
	]) Serializer.prototype["$" + type] = function(arr) {
		return `${type}[${arr.join(",")}]`;
	};
	for (const type of ["BigInt64Array", "BigUint64Array"]) Serializer.prototype["$" + type] = function(arr) {
		return `${type}[${arr.join("n,")}${arr.length > 0 ? "n" : ""}]`;
	};
	return Serializer;
})();
//#endregion
//#region node_modules/.pnpm/ohash@2.0.12/node_modules/ohash/dist/crypto/node/index.mjs
var fastHash = /*@__PURE__*/ (() => globalThis.process?.getBuiltinModule?.("crypto")?.hash)();
var algorithm = "sha256";
var encoding = "base64url";
function digest(data) {
	if (fastHash) return fastHash(algorithm, data, encoding);
	const h = createHash(algorithm).update(data);
	return globalThis.process?.versions?.webcontainer ? h.digest().toString(encoding) : h.digest(encoding);
}
//#endregion
//#region node_modules/.pnpm/ohash@2.0.12/node_modules/ohash/dist/index.mjs
function hash(input) {
	return digest(serialize(input));
}
//#endregion
//#region node_modules/.pnpm/@iconify+vue@5.0.3_vue@3.5.43_typescript@5.9.3_/node_modules/@iconify/vue/dist/iconify.mjs
/**
* Expression to test part of icon name.
*
* Used when loading icons from Iconify API due to project naming convension.
* Ignored when using custom icon sets - convension does not apply.
*/
var matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
/**
* Convert string icon name to IconifyIconName object.
*/
var stringToIcon = (value, validate, allowSimpleName, provider = "") => {
	const colonSeparated = value.split(":");
	if (value.slice(0, 1) === "@") {
		if (colonSeparated.length < 2 || colonSeparated.length > 3) return null;
		provider = colonSeparated.shift().slice(1);
	}
	if (colonSeparated.length > 3 || !colonSeparated.length) return null;
	if (colonSeparated.length > 1) {
		const name = colonSeparated.pop();
		const prefix = colonSeparated.pop();
		const result = {
			provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
			prefix,
			name
		};
		return validate && !validateIconName(result) ? null : result;
	}
	const name = colonSeparated[0];
	const dashSeparated = name.split("-");
	if (dashSeparated.length > 1) {
		const result = {
			provider,
			prefix: dashSeparated.shift(),
			name: dashSeparated.join("-")
		};
		return validate && !validateIconName(result) ? null : result;
	}
	if (allowSimpleName && provider === "") {
		const result = {
			provider,
			prefix: "",
			name
		};
		return validate && !validateIconName(result, allowSimpleName) ? null : result;
	}
	return null;
};
/**
* Check if icon is valid.
*
* This function is not part of stringToIcon because validation is not needed for most code.
*/
var validateIconName = (icon, allowSimpleName) => {
	if (!icon) return false;
	return !!((allowSimpleName && icon.prefix === "" || !!icon.prefix) && !!icon.name);
};
/**
* Resolve icon set icons
*
* Returns parent icon for each icon
*/
function getIconsTree(data, names) {
	const icons = data.icons;
	const aliases = data.aliases || Object.create(null);
	const resolved = Object.create(null);
	function resolve(name) {
		if (icons[name]) return resolved[name] = [];
		if (!(name in resolved)) {
			resolved[name] = null;
			const parent = aliases[name] && aliases[name].parent;
			const value = parent && resolve(parent);
			if (value) resolved[name] = [parent].concat(value);
		}
		return resolved[name];
	}
	Object.keys(icons).concat(Object.keys(aliases)).forEach(resolve);
	return resolved;
}
/** Default values for dimensions */
var defaultIconDimensions$1 = Object.freeze({
	left: 0,
	top: 0,
	width: 16,
	height: 16
});
/** Default values for transformations */
var defaultIconTransformations$1 = Object.freeze({
	rotate: 0,
	vFlip: false,
	hFlip: false
});
/** Default values for all optional IconifyIcon properties */
var defaultIconProps$1 = Object.freeze({
	...defaultIconDimensions$1,
	...defaultIconTransformations$1
});
/** Default values for all properties used in ExtendedIconifyIcon */
var defaultExtendedIconProps$1 = Object.freeze({
	...defaultIconProps$1,
	body: "",
	hidden: false
});
/**
* Merge transformations
*/
function mergeIconTransformations(obj1, obj2) {
	const result = {};
	if (!obj1.hFlip !== !obj2.hFlip) result.hFlip = true;
	if (!obj1.vFlip !== !obj2.vFlip) result.vFlip = true;
	const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
	if (rotate) result.rotate = rotate;
	return result;
}
/**
* Merge icon and alias
*
* Can also be used to merge default values and icon
*/
function mergeIconData(parent, child) {
	const result = mergeIconTransformations(parent, child);
	for (const key in defaultExtendedIconProps$1) if (key in defaultIconTransformations$1) {
		if (key in parent && !(key in result)) result[key] = defaultIconTransformations$1[key];
	} else if (key in child) result[key] = child[key];
	else if (key in parent) result[key] = parent[key];
	return result;
}
/**
* Get icon data, using prepared aliases tree
*/
function internalGetIconData(data, name, tree) {
	const icons = data.icons;
	const aliases = data.aliases || Object.create(null);
	let currentProps = {};
	function parse(name) {
		currentProps = mergeIconData(icons[name] || aliases[name], currentProps);
	}
	parse(name);
	tree.forEach(parse);
	return mergeIconData(data, currentProps);
}
/**
* Extract icons from an icon set
*
* Returns list of icons that were found in icon set
*/
function parseIconSet(data, callback) {
	const names = [];
	if (typeof data !== "object" || typeof data.icons !== "object") return names;
	if (data.not_found instanceof Array) data.not_found.forEach((name) => {
		callback(name, null);
		names.push(name);
	});
	const tree = getIconsTree(data);
	for (const name in tree) {
		const item = tree[name];
		if (item) {
			callback(name, internalGetIconData(data, name, item));
			names.push(name);
		}
	}
	return names;
}
/**
* Optional properties
*/
var optionalPropertyDefaults = {
	provider: "",
	aliases: {},
	not_found: {},
	...defaultIconDimensions$1
};
/**
* Check props
*/
function checkOptionalProps(item, defaults) {
	for (const prop in defaults) if (prop in item && typeof item[prop] !== typeof defaults[prop]) return false;
	return true;
}
/**
* Validate icon set, return it as IconifyJSON on success, null on failure
*
* Unlike validateIconSet(), this function is very basic.
* It does not throw exceptions, it does not check metadata, it does not fix stuff.
*/
function quicklyValidateIconSet(obj) {
	if (typeof obj !== "object" || obj === null) return null;
	const data = obj;
	if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") return null;
	if (!checkOptionalProps(obj, optionalPropertyDefaults)) return null;
	const icons = data.icons;
	for (const name in icons) {
		const icon = icons[name];
		if (!name || typeof icon.body !== "string" || !checkOptionalProps(icon, defaultExtendedIconProps$1)) return null;
	}
	const aliases = data.aliases || Object.create(null);
	for (const name in aliases) {
		const icon = aliases[name];
		const parent = icon.parent;
		if (!name || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(icon, defaultExtendedIconProps$1)) return null;
	}
	return data;
}
/**
* Storage by provider and prefix
*/
var dataStorage = Object.create(null);
/**
* Create new storage
*/
function newStorage(provider, prefix) {
	return {
		provider,
		prefix,
		icons: Object.create(null),
		missing: /* @__PURE__ */ new Set()
	};
}
/**
* Get storage for provider and prefix
*/
function getStorage(provider, prefix) {
	const providerStorage = dataStorage[provider] || (dataStorage[provider] = Object.create(null));
	return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
/**
* Add icon set to storage
*
* Returns array of added icons
*/
function addIconSet(storage, data) {
	if (!quicklyValidateIconSet(data)) return [];
	return parseIconSet(data, (name, icon) => {
		if (icon) storage.icons[name] = icon;
		else storage.missing.add(name);
	});
}
/**
* Allow storing icons without provider or prefix, making it possible to store icons like "home"
*/
var simpleNames = false;
function allowSimpleNames(allow) {
	if (typeof allow === "boolean") simpleNames = allow;
	return simpleNames;
}
/**
* Get icon data
*
* Returns:
* - IconifyIcon on success, object directly from storage so don't modify it
* - null if icon is marked as missing (returned in `not_found` property from API, so don't bother sending API requests)
* - undefined if icon is missing in storage
*/
function getIconData(name) {
	const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
	if (icon) {
		const storage = getStorage(icon.provider, icon.prefix);
		const iconName = icon.name;
		return storage.icons[iconName] || (storage.missing.has(iconName) ? null : void 0);
	}
}
/**
* Get full icon
*/
function getIcon(name) {
	const result = getIconData(name);
	return result ? {
		...defaultIconProps$1,
		...result
	} : result;
}
/**
* Default icon customisations values
*/
var defaultIconSizeCustomisations$1 = Object.freeze({
	width: null,
	height: null
});
var defaultIconCustomisations$1 = Object.freeze({
	...defaultIconSizeCustomisations$1,
	...defaultIconTransformations$1
});
/**
* Regular expressions for calculating dimensions
*/
var unitsSplit$1 = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
var unitsTest$1 = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize$1(size, ratio, precision) {
	if (ratio === 1) return size;
	precision = precision || 100;
	if (typeof size === "number") return Math.ceil(size * ratio * precision) / precision;
	if (typeof size !== "string") return size;
	const oldParts = size.split(unitsSplit$1);
	if (oldParts === null || !oldParts.length) return size;
	const newParts = [];
	let code = oldParts.shift();
	let isNumber = unitsTest$1.test(code);
	while (true) {
		if (isNumber) {
			const num = parseFloat(code);
			if (isNaN(num)) newParts.push(code);
			else newParts.push(Math.ceil(num * ratio * precision) / precision);
		} else newParts.push(code);
		code = oldParts.shift();
		if (code === void 0) return newParts.join("");
		isNumber = !isNumber;
	}
}
function splitSVGDefs$1(content, tag = "defs") {
	let defs = "";
	const index = content.indexOf("<" + tag);
	while (index >= 0) {
		const start = content.indexOf(">", index);
		const end = content.indexOf("</" + tag);
		if (start === -1 || end === -1) break;
		const endEnd = content.indexOf(">", end);
		if (endEnd === -1) break;
		defs += content.slice(start + 1, end).trim();
		content = content.slice(0, index).trim() + content.slice(endEnd + 1);
	}
	return {
		defs,
		content
	};
}
/**
* Merge defs and content
*/
function mergeDefsAndContent$1(defs, content) {
	return defs ? "<defs>" + defs + "</defs>" + content : content;
}
/**
* Wrap SVG content, without wrapping definitions
*/
function wrapSVGContent$1(body, start, end) {
	const split = splitSVGDefs$1(body);
	return mergeDefsAndContent$1(split.defs, start + split.content + end);
}
/**
* Check if value should be unset. Allows multiple keywords
*/
var isUnsetKeyword$1 = (value) => value === "unset" || value === "undefined" || value === "none";
/**
* Get SVG attributes and content from icon + customisations
*
* Does not generate style to make it compatible with frameworks that use objects for style, such as React.
* Instead, it generates 'inline' value. If true, rendering engine should add verticalAlign: -0.125em to icon.
*
* Customisations should be normalised by platform specific parser.
* Result should be converted to <svg> by platform specific parser.
* Use replaceIDs to generate unique IDs for body.
*/
function iconToSVG$1(icon, customisations) {
	const fullIcon = {
		...defaultIconProps$1,
		...icon
	};
	const fullCustomisations = {
		...defaultIconCustomisations$1,
		...customisations
	};
	const box = {
		left: fullIcon.left,
		top: fullIcon.top,
		width: fullIcon.width,
		height: fullIcon.height
	};
	let body = fullIcon.body;
	[fullIcon, fullCustomisations].forEach((props) => {
		const transformations = [];
		const hFlip = props.hFlip;
		const vFlip = props.vFlip;
		let rotation = props.rotate;
		if (hFlip) {
			if (vFlip) rotation += 2;
			else {
				transformations.push("translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")");
				transformations.push("scale(-1 1)");
				box.top = box.left = 0;
			}
		} else if (vFlip) {
			transformations.push("translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")");
			transformations.push("scale(1 -1)");
			box.top = box.left = 0;
		}
		let tempValue;
		if (rotation < 0) rotation -= Math.floor(rotation / 4) * 4;
		rotation = rotation % 4;
		switch (rotation) {
			case 1:
				tempValue = box.height / 2 + box.top;
				transformations.unshift("rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")");
				break;
			case 2:
				transformations.unshift("rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")");
				break;
			case 3:
				tempValue = box.width / 2 + box.left;
				transformations.unshift("rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")");
		}
		if (rotation % 2 === 1) {
			if (box.left !== box.top) {
				tempValue = box.left;
				box.left = box.top;
				box.top = tempValue;
			}
			if (box.width !== box.height) {
				tempValue = box.width;
				box.width = box.height;
				box.height = tempValue;
			}
		}
		if (transformations.length) body = wrapSVGContent$1(body, "<g transform=\"" + transformations.join(" ") + "\">", "</g>");
	});
	const customisationsWidth = fullCustomisations.width;
	const customisationsHeight = fullCustomisations.height;
	const boxWidth = box.width;
	const boxHeight = box.height;
	let width;
	let height;
	if (customisationsWidth === null) {
		height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
		width = calculateSize$1(height, boxWidth / boxHeight);
	} else {
		width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
		height = customisationsHeight === null ? calculateSize$1(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
	}
	const attributes = {};
	const setAttr = (prop, value) => {
		if (!isUnsetKeyword$1(value)) attributes[prop] = value.toString();
	};
	setAttr("width", width);
	setAttr("height", height);
	const viewBox = [
		box.left,
		box.top,
		boxWidth,
		boxHeight
	];
	attributes.viewBox = viewBox.join(" ");
	return {
		attributes,
		viewBox,
		body
	};
}
/**
* Regular expression for finding ids
*/
var regex = /\sid="(\S+)"/g;
/**
* Counters
*/
var counters = /* @__PURE__ */ new Map();
/**
* Get unique new ID
*/
function nextID(id) {
	id = id.replace(/[0-9]+$/, "") || "a";
	const count = counters.get(id) || 0;
	counters.set(id, count + 1);
	return count ? `${id}${count}` : id;
}
/**
* Replace IDs in SVG output with unique IDs
*/
function replaceIDs(body) {
	const ids = [];
	let match;
	while (match = regex.exec(body)) ids.push(match[1]);
	if (!ids.length) return body;
	const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
	ids.forEach((id) => {
		const newID = nextID(id);
		const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		body = body.replace(new RegExp("([#;\"])(" + escapedID + ")([\")]|\\.[a-z])", "g"), "$1" + newID + suffix + "$3");
	});
	body = body.replace(new RegExp(suffix, "g"), "");
	return body;
}
/**
* Local storate types and entries
*/
var storage = Object.create(null);
/**
* Set API module
*/
function setAPIModule(provider, item) {
	storage[provider] = item;
}
/**
* Get API module
*/
function getAPIModule(provider) {
	return storage[provider] || storage[""];
}
/**
* Create full API configuration from partial data
*/
function createAPIConfig(source) {
	let resources;
	if (typeof source.resources === "string") resources = [source.resources];
	else {
		resources = source.resources;
		if (!(resources instanceof Array) || !resources.length) return null;
	}
	return {
		resources,
		path: source.path || "/",
		maxURL: source.maxURL || 500,
		rotate: source.rotate || 750,
		timeout: source.timeout || 5e3,
		random: source.random === true,
		index: source.index || 0,
		dataAfterTimeout: source.dataAfterTimeout !== false
	};
}
/**
* Local storage
*/
var configStorage = Object.create(null);
/**
* Redundancy for API servers.
*
* API should have very high uptime because of implemented redundancy at server level, but
* sometimes bad things happen. On internet 100% uptime is not possible.
*
* There could be routing problems. Server might go down for whatever reason, but it takes
* few minutes to detect that downtime, so during those few minutes API might not be accessible.
*
* This script has some redundancy to mitigate possible network issues.
*
* If one host cannot be reached in 'rotate' (750 by default) ms, script will try to retrieve
* data from different host. Hosts have different configurations, pointing to different
* API servers hosted at different providers.
*/
var fallBackAPISources = ["https://api.simplesvg.com", "https://api.unisvg.com"];
var fallBackAPI = [];
while (fallBackAPISources.length > 0) if (fallBackAPISources.length === 1) fallBackAPI.push(fallBackAPISources.shift());
else if (Math.random() > .5) fallBackAPI.push(fallBackAPISources.shift());
else fallBackAPI.push(fallBackAPISources.pop());
configStorage[""] = createAPIConfig({ resources: ["https://api.iconify.design"].concat(fallBackAPI) });
/**
* Add custom config for provider
*/
function addAPIProvider(provider, customConfig) {
	const config = createAPIConfig(customConfig);
	if (config === null) return false;
	configStorage[provider] = config;
	return true;
}
/**
* Get API configuration
*/
function getAPIConfig(provider) {
	return configStorage[provider];
}
/**
* List API providers
*/
function listAPIProviders() {
	return Object.keys(configStorage);
}
var detectFetch = () => {
	let callback;
	try {
		callback = fetch;
		if (typeof callback === "function") return callback;
	} catch (err) {}
};
/**
* Fetch function
*/
var fetchModule = detectFetch();
/**
* Set custom fetch() function
*/
function setFetch(fetch) {
	fetchModule = fetch;
}
/**
* Get fetch() function. Used by Icon Finder Core
*/
function getFetch() {
	return fetchModule;
}
/**
* Calculate maximum icons list length for prefix
*/
function calculateMaxLength(provider, prefix) {
	const config = getAPIConfig(provider);
	if (!config) return 0;
	let result;
	if (!config.maxURL) result = 0;
	else {
		let maxHostLength = 0;
		config.resources.forEach((item) => {
			maxHostLength = Math.max(maxHostLength, item.length);
		});
		const url = prefix + ".json?icons=";
		result = config.maxURL - maxHostLength - config.path.length - url.length;
	}
	return result;
}
/**
* Should query be aborted, based on last HTTP status
*/
function shouldAbort(status) {
	return status === 404;
}
/**
* Prepare params
*/
var prepare = (provider, prefix, icons) => {
	const results = [];
	const maxLength = calculateMaxLength(provider, prefix);
	const type = "icons";
	let item = {
		type,
		provider,
		prefix,
		icons: []
	};
	let length = 0;
	icons.forEach((name, index) => {
		length += name.length + 1;
		if (length >= maxLength && index > 0) {
			results.push(item);
			item = {
				type,
				provider,
				prefix,
				icons: []
			};
			length = name.length;
		}
		item.icons.push(name);
	});
	results.push(item);
	return results;
};
/**
* Get path
*/
function getPath(provider) {
	if (typeof provider === "string") {
		const config = getAPIConfig(provider);
		if (config) return config.path;
	}
	return "/";
}
/**
* Load icons
*/
var send = (host, params, callback) => {
	if (!fetchModule) {
		callback("abort", 424);
		return;
	}
	let path = getPath(params.provider);
	switch (params.type) {
		case "icons": {
			const prefix = params.prefix;
			const iconsList = params.icons.join(",");
			const urlParams = new URLSearchParams({ icons: iconsList });
			path += prefix + ".json?" + urlParams.toString();
			break;
		}
		case "custom": {
			const uri = params.uri;
			path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
			break;
		}
		default:
			callback("abort", 400);
			return;
	}
	let defaultError = 503;
	fetchModule(host + path).then((response) => {
		const status = response.status;
		if (status !== 200) {
			setTimeout(() => {
				callback(shouldAbort(status) ? "abort" : "next", status);
			});
			return;
		}
		defaultError = 501;
		return response.json();
	}).then((data) => {
		if (typeof data !== "object" || data === null) {
			setTimeout(() => {
				if (data === 404) callback("abort", data);
				else callback("next", defaultError);
			});
			return;
		}
		setTimeout(() => {
			callback("success", data);
		});
	}).catch(() => {
		callback("next", defaultError);
	});
};
/**
* Export module
*/
var fetchAPIModule = {
	prepare,
	send
};
/**
* Remove callback
*/
function removeCallback(storages, id) {
	storages.forEach((storage) => {
		const items = storage.loaderCallbacks;
		if (items) storage.loaderCallbacks = items.filter((row) => row.id !== id);
	});
}
/**
* Update all callbacks for provider and prefix
*/
function updateCallbacks(storage) {
	if (!storage.pendingCallbacksFlag) {
		storage.pendingCallbacksFlag = true;
		setTimeout(() => {
			storage.pendingCallbacksFlag = false;
			const items = storage.loaderCallbacks ? storage.loaderCallbacks.slice(0) : [];
			if (!items.length) return;
			let hasPending = false;
			const provider = storage.provider;
			const prefix = storage.prefix;
			items.forEach((item) => {
				const icons = item.icons;
				const oldLength = icons.pending.length;
				icons.pending = icons.pending.filter((icon) => {
					if (icon.prefix !== prefix) return true;
					const name = icon.name;
					if (storage.icons[name]) icons.loaded.push({
						provider,
						prefix,
						name
					});
					else if (storage.missing.has(name)) icons.missing.push({
						provider,
						prefix,
						name
					});
					else {
						hasPending = true;
						return true;
					}
					return false;
				});
				if (icons.pending.length !== oldLength) {
					if (!hasPending) removeCallback([storage], item.id);
					item.callback(icons.loaded.slice(0), icons.missing.slice(0), icons.pending.slice(0), item.abort);
				}
			});
		});
	}
}
/**
* Unique id counter for callbacks
*/
var idCounter = 0;
/**
* Add callback
*/
function storeCallback(callback, icons, pendingSources) {
	const id = idCounter++;
	const abort = removeCallback.bind(null, pendingSources, id);
	if (!icons.pending.length) return abort;
	const item = {
		id,
		icons,
		callback,
		abort
	};
	pendingSources.forEach((storage) => {
		(storage.loaderCallbacks || (storage.loaderCallbacks = [])).push(item);
	});
	return abort;
}
/**
* Check if icons have been loaded
*/
function sortIcons(icons) {
	const result = {
		loaded: [],
		missing: [],
		pending: []
	};
	const storage = Object.create(null);
	icons.sort((a, b) => {
		if (a.provider !== b.provider) return a.provider.localeCompare(b.provider);
		if (a.prefix !== b.prefix) return a.prefix.localeCompare(b.prefix);
		return a.name.localeCompare(b.name);
	});
	let lastIcon = {
		provider: "",
		prefix: "",
		name: ""
	};
	icons.forEach((icon) => {
		if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) return;
		lastIcon = icon;
		const provider = icon.provider;
		const prefix = icon.prefix;
		const name = icon.name;
		const providerStorage = storage[provider] || (storage[provider] = Object.create(null));
		const localStorage = providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
		let list;
		if (name in localStorage.icons) list = result.loaded;
		else if (prefix === "" || localStorage.missing.has(name)) list = result.missing;
		else list = result.pending;
		const item = {
			provider,
			prefix,
			name
		};
		list.push(item);
	});
	return result;
}
/**
* Convert icons list from string/icon mix to icons and validate them
*/
function listToIcons(list, validate = true, simpleNames = false) {
	const result = [];
	list.forEach((item) => {
		const icon = typeof item === "string" ? stringToIcon(item, validate, simpleNames) : item;
		if (icon) result.push(icon);
	});
	return result;
}
/**
* Default RedundancyConfig for API calls
*/
var defaultConfig = {
	resources: [],
	index: 0,
	timeout: 2e3,
	rotate: 750,
	random: false,
	dataAfterTimeout: false
};
/**
* Send query
*/
function sendQuery(config, payload, query, done) {
	const resourcesCount = config.resources.length;
	const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
	let resources;
	if (config.random) {
		let list = config.resources.slice(0);
		resources = [];
		while (list.length > 1) {
			const nextIndex = Math.floor(Math.random() * list.length);
			resources.push(list[nextIndex]);
			list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
		}
		resources = resources.concat(list);
	} else resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
	const startTime = Date.now();
	let status = "pending";
	let queriesSent = 0;
	let lastError;
	let timer = null;
	let queue = [];
	let doneCallbacks = [];
	if (typeof done === "function") doneCallbacks.push(done);
	/**
	* Reset timer
	*/
	function resetTimer() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	}
	/**
	* Abort everything
	*/
	function abort() {
		if (status === "pending") status = "aborted";
		resetTimer();
		queue.forEach((item) => {
			if (item.status === "pending") item.status = "aborted";
		});
		queue = [];
	}
	/**
	* Add / replace callback to call when execution is complete.
	* This can be used to abort pending query implementations when query is complete or aborted.
	*/
	function subscribe(callback, overwrite) {
		if (overwrite) doneCallbacks = [];
		if (typeof callback === "function") doneCallbacks.push(callback);
	}
	/**
	* Get query status
	*/
	function getQueryStatus() {
		return {
			startTime,
			payload,
			status,
			queriesSent,
			queriesPending: queue.length,
			subscribe,
			abort
		};
	}
	/**
	* Fail query
	*/
	function failQuery() {
		status = "failed";
		doneCallbacks.forEach((callback) => {
			callback(void 0, lastError);
		});
	}
	/**
	* Clear queue
	*/
	function clearQueue() {
		queue.forEach((item) => {
			if (item.status === "pending") item.status = "aborted";
		});
		queue = [];
	}
	/**
	* Got response from module
	*/
	function moduleResponse(item, response, data) {
		const isError = response !== "success";
		queue = queue.filter((queued) => queued !== item);
		switch (status) {
			case "pending": break;
			case "failed":
				if (isError || !config.dataAfterTimeout) return;
				break;
			default: return;
		}
		if (response === "abort") {
			lastError = data;
			failQuery();
			return;
		}
		if (isError) {
			lastError = data;
			if (!queue.length) {
				if (!resources.length) failQuery();
				else execNext();
			}
			return;
		}
		resetTimer();
		clearQueue();
		if (!config.random) {
			const index = config.resources.indexOf(item.resource);
			if (index !== -1 && index !== config.index) config.index = index;
		}
		status = "completed";
		doneCallbacks.forEach((callback) => {
			callback(data);
		});
	}
	/**
	* Execute next query
	*/
	function execNext() {
		if (status !== "pending") return;
		resetTimer();
		const resource = resources.shift();
		if (resource === void 0) {
			if (queue.length) {
				timer = setTimeout(() => {
					resetTimer();
					if (status === "pending") {
						clearQueue();
						failQuery();
					}
				}, config.timeout);
				return;
			}
			failQuery();
			return;
		}
		const item = {
			status: "pending",
			resource,
			callback: (status, data) => {
				moduleResponse(item, status, data);
			}
		};
		queue.push(item);
		queriesSent++;
		timer = setTimeout(execNext, config.rotate);
		query(resource, payload, item.callback);
	}
	setTimeout(execNext);
	return getQueryStatus;
}
/**
* Redundancy instance
*/
function initRedundancy(cfg) {
	const config = {
		...defaultConfig,
		...cfg
	};
	let queries = [];
	/**
	* Remove aborted and completed queries
	*/
	function cleanup() {
		queries = queries.filter((item) => item().status === "pending");
	}
	/**
	* Send query
	*/
	function query(payload, queryCallback, doneCallback) {
		const query = sendQuery(config, payload, queryCallback, (data, error) => {
			cleanup();
			if (doneCallback) doneCallback(data, error);
		});
		queries.push(query);
		return query;
	}
	/**
	* Find instance
	*/
	function find(callback) {
		return queries.find((value) => {
			return callback(value);
		}) || null;
	}
	return {
		query,
		find,
		setIndex: (index) => {
			config.index = index;
		},
		getIndex: () => config.index,
		cleanup
	};
}
function emptyCallback$1() {}
var redundancyCache = Object.create(null);
/**
* Get Redundancy instance for provider
*/
function getRedundancyCache(provider) {
	if (!redundancyCache[provider]) {
		const config = getAPIConfig(provider);
		if (!config) return;
		redundancyCache[provider] = {
			config,
			redundancy: initRedundancy(config)
		};
	}
	return redundancyCache[provider];
}
/**
* Send API query
*/
function sendAPIQuery(target, query, callback) {
	let redundancy;
	let send;
	if (typeof target === "string") {
		const api = getAPIModule(target);
		if (!api) {
			callback(void 0, 424);
			return emptyCallback$1;
		}
		send = api.send;
		const cached = getRedundancyCache(target);
		if (cached) redundancy = cached.redundancy;
	} else {
		const config = createAPIConfig(target);
		if (config) {
			redundancy = initRedundancy(config);
			const api = getAPIModule(target.resources ? target.resources[0] : "");
			if (api) send = api.send;
		}
	}
	if (!redundancy || !send) {
		callback(void 0, 424);
		return emptyCallback$1;
	}
	return redundancy.query(query, send, callback)().abort;
}
function emptyCallback() {}
/**
* Function called when new icons have been loaded
*/
function loadedNewIcons(storage) {
	if (!storage.iconsLoaderFlag) {
		storage.iconsLoaderFlag = true;
		setTimeout(() => {
			storage.iconsLoaderFlag = false;
			updateCallbacks(storage);
		});
	}
}
/**
* Check icon names for API
*/
function checkIconNamesForAPI(icons) {
	const valid = [];
	const invalid = [];
	icons.forEach((name) => {
		(name.match(matchIconName) ? valid : invalid).push(name);
	});
	return {
		valid,
		invalid
	};
}
/**
* Parse loader response
*/
function parseLoaderResponse(storage, icons, data) {
	function checkMissing() {
		const pending = storage.pendingIcons;
		icons.forEach((name) => {
			if (pending) pending.delete(name);
			if (!storage.icons[name]) storage.missing.add(name);
		});
	}
	if (data && typeof data === "object") try {
		if (!addIconSet(storage, data).length) {
			checkMissing();
			return;
		}
	} catch (err) {
		console.error(err);
	}
	checkMissing();
	loadedNewIcons(storage);
}
/**
* Handle response that can be async
*/
function parsePossiblyAsyncResponse(response, callback) {
	if (response instanceof Promise) response.then((data) => {
		callback(data);
	}).catch(() => {
		callback(null);
	});
	else callback(response);
}
/**
* Load icons
*/
function loadNewIcons(storage, icons) {
	if (!storage.iconsToLoad) storage.iconsToLoad = icons;
	else storage.iconsToLoad = storage.iconsToLoad.concat(icons).sort();
	if (!storage.iconsQueueFlag) {
		storage.iconsQueueFlag = true;
		setTimeout(() => {
			storage.iconsQueueFlag = false;
			const { provider, prefix } = storage;
			const icons = storage.iconsToLoad;
			delete storage.iconsToLoad;
			if (!icons || !icons.length) return;
			const customIconLoader = storage.loadIcon;
			if (storage.loadIcons && (icons.length > 1 || !customIconLoader)) {
				parsePossiblyAsyncResponse(storage.loadIcons(icons, prefix, provider), (data) => {
					parseLoaderResponse(storage, icons, data);
				});
				return;
			}
			if (customIconLoader) {
				icons.forEach((name) => {
					parsePossiblyAsyncResponse(customIconLoader(name, prefix, provider), (data) => {
						parseLoaderResponse(storage, [name], data ? {
							prefix,
							icons: { [name]: data }
						} : null);
					});
				});
				return;
			}
			const { valid, invalid } = checkIconNamesForAPI(icons);
			if (invalid.length) parseLoaderResponse(storage, invalid, null);
			if (!valid.length) return;
			const api = prefix.match(matchIconName) ? getAPIModule(provider) : null;
			if (!api) {
				parseLoaderResponse(storage, valid, null);
				return;
			}
			api.prepare(provider, prefix, valid).forEach((item) => {
				sendAPIQuery(provider, item, (data) => {
					parseLoaderResponse(storage, item.icons, data);
				});
			});
		});
	}
}
/**
* Load icons
*/
var loadIcons = (icons, callback) => {
	const sortedIcons = sortIcons(listToIcons(icons, true, allowSimpleNames()));
	if (!sortedIcons.pending.length) {
		let callCallback = true;
		if (callback) setTimeout(() => {
			if (callCallback) callback(sortedIcons.loaded, sortedIcons.missing, sortedIcons.pending, emptyCallback);
		});
		return () => {
			callCallback = false;
		};
	}
	const newIcons = Object.create(null);
	const sources = [];
	let lastProvider, lastPrefix;
	sortedIcons.pending.forEach((icon) => {
		const { provider, prefix } = icon;
		if (prefix === lastPrefix && provider === lastProvider) return;
		lastProvider = provider;
		lastPrefix = prefix;
		sources.push(getStorage(provider, prefix));
		const providerNewIcons = newIcons[provider] || (newIcons[provider] = Object.create(null));
		if (!providerNewIcons[prefix]) providerNewIcons[prefix] = [];
	});
	sortedIcons.pending.forEach((icon) => {
		const { provider, prefix, name } = icon;
		const storage = getStorage(provider, prefix);
		const pendingQueue = storage.pendingIcons || (storage.pendingIcons = /* @__PURE__ */ new Set());
		if (!pendingQueue.has(name)) {
			pendingQueue.add(name);
			newIcons[provider][prefix].push(name);
		}
	});
	sources.forEach((storage) => {
		const list = newIcons[storage.provider][storage.prefix];
		if (list.length) loadNewIcons(storage, list);
	});
	return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
};
/**
* Load one icon using Promise
*/
var loadIcon$1 = (icon) => {
	return new Promise((fulfill, reject) => {
		const iconObj = typeof icon === "string" ? stringToIcon(icon, true) : icon;
		if (!iconObj) {
			reject(icon);
			return;
		}
		loadIcons([iconObj || icon], (loaded) => {
			if (loaded.length && iconObj) {
				const data = getIconData(iconObj);
				if (data) {
					fulfill({
						...defaultIconProps$1,
						...data
					});
					return;
				}
			}
			reject(icon);
		});
	});
};
/**
* Set custom loader for multiple icons
*/
function setCustomIconsLoader(loader, prefix, provider) {
	getStorage("", prefix).loadIcons = loader;
}
/**
* Convert IconifyIconCustomisations to FullIconCustomisations, checking value types
*/
function mergeCustomisations(defaults, item) {
	const result = { ...defaults };
	for (const key in item) {
		const value = item[key];
		const valueType = typeof value;
		if (key in defaultIconSizeCustomisations$1) {
			if (value === null || value && (valueType === "string" || valueType === "number")) result[key] = value;
		} else if (valueType === typeof result[key]) result[key] = key === "rotate" ? value % 4 : value;
	}
	return result;
}
var separator = /[\s,]+/;
/**
* Apply "flip" string to icon customisations
*/
function flipFromString(custom, flip) {
	flip.split(separator).forEach((str) => {
		switch (str.trim()) {
			case "horizontal":
				custom.hFlip = true;
				break;
			case "vertical": custom.vFlip = true;
		}
	});
}
/**
* Get rotation value
*/
function rotateFromString(value, defaultValue = 0) {
	const units = value.replace(/^-?[0-9.]*/, "");
	function cleanup(value) {
		while (value < 0) value += 4;
		return value % 4;
	}
	if (units === "") {
		const num = parseInt(value);
		return isNaN(num) ? 0 : cleanup(num);
	} else if (units !== value) {
		let split = 0;
		switch (units) {
			case "%":
				split = 25;
				break;
			case "deg": split = 90;
		}
		if (split) {
			let num = parseFloat(value.slice(0, value.length - units.length));
			if (isNaN(num)) return 0;
			num = num / split;
			return num % 1 === 0 ? cleanup(num) : 0;
		}
	}
	return defaultValue;
}
/**
* Generate <svg>
*/
function iconToHTML$1(body, attributes) {
	let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : " xmlns:xlink=\"http://www.w3.org/1999/xlink\"";
	for (const attr in attributes) renderAttribsHTML += " " + attr + "=\"" + attributes[attr] + "\"";
	return "<svg xmlns=\"http://www.w3.org/2000/svg\"" + renderAttribsHTML + ">" + body + "</svg>";
}
/**
* Encode SVG for use in url()
*
* Short alternative to encodeURIComponent() that encodes only stuff used in SVG, generating
* smaller code.
*/
function encodeSVGforURL$1(svg) {
	return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ").replace(/:/g, "%3A").replace(/\//g, "%2F");
}
/**
* Generate data: URL from SVG
*/
function svgToData$1(svg) {
	return "data:image/svg+xml," + encodeSVGforURL$1(svg);
}
/**
* Generate url() from SVG
*/
function svgToURL$1(svg) {
	return "url(\"" + svgToData$1(svg) + "\")";
}
var defaultExtendedIconCustomisations = {
	...defaultIconCustomisations$1,
	inline: false
};
/**
* Default SVG attributes
*/
var svgDefaults = {
	"xmlns": "http://www.w3.org/2000/svg",
	"xmlns:xlink": "http://www.w3.org/1999/xlink",
	"aria-hidden": true,
	"role": "img"
};
/**
* Style modes
*/
var commonProps = { display: "inline-block" };
var monotoneProps = { backgroundColor: "currentColor" };
var coloredProps = { backgroundColor: "transparent" };
var propsToAdd = {
	Image: "var(--svg)",
	Repeat: "no-repeat",
	Size: "100% 100%"
};
var propsToAddTo = {
	webkitMask: monotoneProps,
	mask: monotoneProps,
	background: coloredProps
};
for (const prefix in propsToAddTo) {
	const list = propsToAddTo[prefix];
	for (const prop in propsToAdd) list[prefix + prop] = propsToAdd[prop];
}
/**
* Aliases for customisations.
* In Vue 'v-' properties are reserved, so v-flip must be renamed
*/
var customisationAliases = {};
["horizontal", "vertical"].forEach((prefix) => {
	const attr = prefix.slice(0, 1) + "Flip";
	customisationAliases[prefix + "-flip"] = attr;
	customisationAliases[prefix.slice(0, 1) + "-flip"] = attr;
	customisationAliases[prefix + "Flip"] = attr;
});
/**
* Fix size: add 'px' to numbers
*/
function fixSize(value) {
	return value + (value.match(/^[-0-9.]+$/) ? "px" : "");
}
/**
* Render icon
*/
var render = (icon, props) => {
	const customisations = mergeCustomisations(defaultExtendedIconCustomisations, props);
	const componentProps = { ...svgDefaults };
	const mode = props.mode || "svg";
	const style = {};
	const propsStyle = props.style;
	const customStyle = typeof propsStyle === "object" && !(propsStyle instanceof Array) ? propsStyle : {};
	for (let key in props) {
		const value = props[key];
		if (value === void 0) continue;
		switch (key) {
			case "icon":
			case "style":
			case "onLoad":
			case "mode":
			case "ssr":
			case "customise": break;
			case "inline":
			case "hFlip":
			case "vFlip":
				customisations[key] = value === true || value === "true" || value === 1;
				break;
			case "flip": break;
			case "color":
				style.color = value;
				break;
			case "rotate":
				if (typeof value === "string") customisations[key] = rotateFromString(value);
				else if (typeof value === "number") customisations[key] = value;
				break;
			case "ariaHidden":
			case "aria-hidden":
				if (value !== true && value !== "true") delete componentProps["aria-hidden"];
				break;
			default: {
				const alias = customisationAliases[key];
				if (alias) {
					if (value === true || value === "true" || value === 1) customisations[alias] = true;
				} else if (defaultExtendedIconCustomisations[key] === void 0) componentProps[key] = value;
			}
		}
	}
	if (typeof props.flip === "string") flipFromString(customisations, props.flip);
	const item = iconToSVG$1(icon, customisations);
	const renderAttribs = item.attributes;
	if (customisations.inline) style.verticalAlign = "-0.125em";
	if (mode === "svg") {
		componentProps.style = {
			...style,
			...customStyle
		};
		Object.assign(componentProps, renderAttribs);
		componentProps["innerHTML"] = replaceIDs(item.body);
		return h("svg", componentProps);
	}
	const { body, width, height } = icon;
	const useMask = mode === "mask" || (mode === "bg" ? false : body.indexOf("currentColor") !== -1);
	const html = iconToHTML$1(body, {
		...renderAttribs,
		width: width + "",
		height: height + ""
	});
	componentProps.style = {
		...style,
		"--svg": svgToURL$1(html),
		"width": fixSize(renderAttribs.width),
		"height": fixSize(renderAttribs.height),
		...commonProps,
		...useMask ? monotoneProps : coloredProps,
		...customStyle
	};
	return h("span", componentProps);
};
/**
* Initialise stuff
*/
allowSimpleNames(true);
setAPIModule("", fetchAPIModule);
/**
* Empty icon data, rendered when icon is not available
*/
var emptyIcon = {
	...defaultIconProps$1,
	body: ""
};
/**
* Component
*/
var Icon = defineComponent((props, { emit }) => {
	const loader = ref(null);
	function abortLoading() {
		if (loader.value) {
			loader.value.abort?.();
			loader.value = null;
		}
	}
	const rendering = ref(!!props.ssr);
	const lastRenderedIconName = ref("");
	const iconData = shallowRef(null);
	function getIcon() {
		const icon = props.icon;
		if (typeof icon === "object" && icon !== null && typeof icon.body === "string") {
			lastRenderedIconName.value = "";
			return { data: icon };
		}
		let iconName;
		if (typeof icon !== "string" || (iconName = stringToIcon(icon, false, true)) === null) return null;
		let data = getIconData(iconName);
		if (!data) {
			const oldState = loader.value;
			if (!oldState || oldState.name !== icon) {
				if (data === null) loader.value = { name: icon };
				else loader.value = {
					name: icon,
					abort: loadIcons([iconName], updateIconData)
				};
			}
			return null;
		}
		abortLoading();
		if (lastRenderedIconName.value !== icon) {
			lastRenderedIconName.value = icon;
			nextTick(() => {
				emit("load", icon);
			});
		}
		const customise = props.customise;
		if (customise) {
			data = Object.assign({}, data);
			const customised = customise(data.body, iconName.name, iconName.prefix, iconName.provider);
			if (typeof customised === "string") data.body = customised;
		}
		const classes = ["iconify"];
		if (iconName.prefix !== "") classes.push("iconify--" + iconName.prefix);
		if (iconName.provider !== "") classes.push("iconify--" + iconName.provider);
		return {
			data,
			classes
		};
	}
	function updateIconData() {
		const icon = getIcon();
		if (!icon) iconData.value = null;
		else if (icon.data !== iconData.value?.data) iconData.value = icon;
	}
	if (rendering.value) updateIconData();
	watch(() => props.icon, updateIconData);
	return () => {
		const icon = iconData.value;
		if (!icon) return render(emptyIcon, props);
		let newProps = props;
		if (icon.classes) newProps = {
			...props,
			class: icon.classes.join(" ")
		};
		return render({
			...defaultIconProps$1,
			...icon.data
		}, newProps);
	};
}, {
	props: {
		icon: {
			type: [String, Object],
			required: true
		},
		mode: { type: String },
		ssr: { type: Boolean },
		width: { type: [String, Number] },
		height: { type: [String, Number] },
		style: { type: [String, Object] },
		color: { type: String },
		inline: { type: Boolean },
		rotate: { type: [Number, String] },
		hFlip: { type: Boolean },
		horizontalFlip: { type: Boolean },
		vFlip: { type: Boolean },
		verticalFlip: { type: Boolean },
		flip: { type: String },
		id: { type: String },
		ariaHidden: {
			type: [Boolean, String],
			default: void 0
		},
		customise: { type: Function },
		title: { type: String }
	},
	emits: ["load"]
});
/**
* Internal API
*/
var _api = {
	getAPIConfig,
	setAPIModule,
	sendAPIQuery,
	setFetch,
	getFetch,
	listAPIProviders
};
//#endregion
//#region node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/icon/defaults.js
/** Default values for dimensions */
var defaultIconDimensions = Object.freeze({
	left: 0,
	top: 0,
	width: 16,
	height: 16
});
/** Default values for transformations */
var defaultIconTransformations = Object.freeze({
	rotate: 0,
	vFlip: false,
	hFlip: false
});
/** Default values for all optional IconifyIcon properties */
var defaultIconProps = Object.freeze({
	...defaultIconDimensions,
	...defaultIconTransformations
});
Object.freeze({
	...defaultIconProps,
	body: "",
	hidden: false
});
//#endregion
//#region node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/icon/square.js
/**
* Make icon viewBox square
*/
function makeViewBoxSquare(viewBox) {
	const [left, top, width, height] = viewBox;
	if (width !== height) {
		const max = Math.max(width, height);
		return [
			left - (max - width) / 2,
			top - (max - height) / 2,
			max,
			max
		];
	}
	return viewBox;
}
//#endregion
//#region node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/svg/size.js
/**
* Regular expressions for calculating dimensions
*/
var unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
var unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
	if (ratio === 1) return size;
	precision = precision || 100;
	if (typeof size === "number") return Math.ceil(size * ratio * precision) / precision;
	if (typeof size !== "string") return size;
	const oldParts = size.split(unitsSplit);
	if (oldParts === null || !oldParts.length) return size;
	const newParts = [];
	let code = oldParts.shift();
	let isNumber = unitsTest.test(code);
	while (true) {
		if (isNumber) {
			const num = parseFloat(code);
			if (isNaN(num)) newParts.push(code);
			else newParts.push(Math.ceil(num * ratio * precision) / precision);
		} else newParts.push(code);
		code = oldParts.shift();
		if (code === void 0) return newParts.join("");
		isNumber = !isNumber;
	}
}
//#endregion
//#region node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/customisations/defaults.js
/**
* Default icon customisations values
*/
var defaultIconSizeCustomisations = Object.freeze({
	width: null,
	height: null
});
var defaultIconCustomisations = Object.freeze({
	...defaultIconSizeCustomisations,
	...defaultIconTransformations
});
//#endregion
//#region node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/svg/defs.js
function splitSVGDefs(content, tag = "defs") {
	let defs = "";
	const index = content.indexOf("<" + tag);
	while (index >= 0) {
		const start = content.indexOf(">", index);
		const end = content.indexOf("</" + tag);
		if (start === -1 || end === -1) break;
		const endEnd = content.indexOf(">", end);
		if (endEnd === -1) break;
		defs += content.slice(start + 1, end).trim();
		content = content.slice(0, index).trim() + content.slice(endEnd + 1);
	}
	return {
		defs,
		content
	};
}
/**
* Merge defs and content
*/
function mergeDefsAndContent(defs, content) {
	return defs ? "<defs>" + defs + "</defs>" + content : content;
}
/**
* Wrap SVG content, without wrapping definitions
*/
function wrapSVGContent(body, start, end) {
	const split = splitSVGDefs(body);
	return mergeDefsAndContent(split.defs, start + split.content + end);
}
//#endregion
//#region node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/svg/build.js
/**
* Check if value should be unset. Allows multiple keywords
*/
var isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
/**
* Get SVG attributes and content from icon + customisations
*
* Does not generate style to make it compatible with frameworks that use objects for style, such as React.
* Instead, it generates 'inline' value. If true, rendering engine should add verticalAlign: -0.125em to icon.
*
* Customisations should be normalised by platform specific parser.
* Result should be converted to <svg> by platform specific parser.
* Use replaceIDs to generate unique IDs for body.
*/
function iconToSVG(icon, customisations) {
	const fullIcon = {
		...defaultIconProps,
		...icon
	};
	const fullCustomisations = {
		...defaultIconCustomisations,
		...customisations
	};
	const box = {
		left: fullIcon.left,
		top: fullIcon.top,
		width: fullIcon.width,
		height: fullIcon.height
	};
	let body = fullIcon.body;
	[fullIcon, fullCustomisations].forEach((props) => {
		const transformations = [];
		const hFlip = props.hFlip;
		const vFlip = props.vFlip;
		let rotation = props.rotate;
		if (hFlip) {
			if (vFlip) rotation += 2;
			else {
				transformations.push("translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")");
				transformations.push("scale(-1 1)");
				box.top = box.left = 0;
			}
		} else if (vFlip) {
			transformations.push("translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")");
			transformations.push("scale(1 -1)");
			box.top = box.left = 0;
		}
		let tempValue;
		if (rotation < 0) rotation -= Math.floor(rotation / 4) * 4;
		rotation = rotation % 4;
		switch (rotation) {
			case 1:
				tempValue = box.height / 2 + box.top;
				transformations.unshift("rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")");
				break;
			case 2:
				transformations.unshift("rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")");
				break;
			case 3:
				tempValue = box.width / 2 + box.left;
				transformations.unshift("rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")");
		}
		if (rotation % 2 === 1) {
			if (box.left !== box.top) {
				tempValue = box.left;
				box.left = box.top;
				box.top = tempValue;
			}
			if (box.width !== box.height) {
				tempValue = box.width;
				box.width = box.height;
				box.height = tempValue;
			}
		}
		if (transformations.length) body = wrapSVGContent(body, "<g transform=\"" + transformations.join(" ") + "\">", "</g>");
	});
	const customisationsWidth = fullCustomisations.width;
	const customisationsHeight = fullCustomisations.height;
	const boxWidth = box.width;
	const boxHeight = box.height;
	let width;
	let height;
	if (customisationsWidth === null) {
		height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
		width = calculateSize(height, boxWidth / boxHeight);
	} else {
		width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
		height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
	}
	const attributes = {};
	const setAttr = (prop, value) => {
		if (!isUnsetKeyword(value)) attributes[prop] = value.toString();
	};
	setAttr("width", width);
	setAttr("height", height);
	const viewBox = [
		box.left,
		box.top,
		boxWidth,
		boxHeight
	];
	attributes.viewBox = viewBox.join(" ");
	return {
		attributes,
		viewBox,
		body
	};
}
//#endregion
//#region node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/svg/url.js
/**
* Encode SVG for use in url()
*
* Short alternative to encodeURIComponent() that encodes only stuff used in SVG, generating
* smaller code.
*/
function encodeSVGforURL(svg) {
	return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
/**
* Generate data: URL from SVG
*/
function svgToData(svg) {
	return "data:image/svg+xml," + encodeSVGforURL(svg);
}
/**
* Generate url() from SVG
*/
function svgToURL(svg) {
	return "url(\"" + svgToData(svg) + "\")";
}
//#endregion
//#region node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/svg/html.js
/**
* Generate <svg>
*/
function iconToHTML(body, attributes) {
	let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : " xmlns:xlink=\"http://www.w3.org/1999/xlink\"";
	for (const attr in attributes) renderAttribsHTML += " " + attr + "=\"" + attributes[attr] + "\"";
	return "<svg xmlns=\"http://www.w3.org/2000/svg\"" + renderAttribsHTML + ">" + body + "</svg>";
}
//#endregion
//#region node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/css/common.js
/**
* Generates common CSS rules for multiple icons, rendered as background/mask
*/
function getCommonCSSRules(options) {
	const result = Object.create(null);
	Object.assign(result, {
		display: "inline-block",
		width: "1em",
		height: "1em"
	});
	const varName = options.varName;
	if (options.pseudoSelector) result["content"] = "''";
	switch (options.mode) {
		case "background":
			if (varName) result["background-image"] = "var(--" + varName + ")";
			result["background-repeat"] = "no-repeat";
			result["background-size"] = "100% 100%";
			break;
		case "mask":
			result["background-color"] = "currentColor";
			if (varName) result["mask-image"] = result["-webkit-mask-image"] = "var(--" + varName + ")";
			result["mask-repeat"] = result["-webkit-mask-repeat"] = "no-repeat";
			result["mask-size"] = result["-webkit-mask-size"] = "100% 100%";
	}
	return result;
}
/**
* Generate CSS rules for one icon, rendered as background/mask
*
* This function excludes common rules
*/
function generateItemCSSRules(icon, options) {
	const result = Object.create(null);
	const varName = options.varName;
	const buildResult = iconToSVG(icon);
	let viewBox = buildResult.viewBox;
	if (viewBox[2] !== viewBox[3]) {
		if (options.forceSquare) viewBox = makeViewBoxSquare(viewBox);
		else result["width"] = calculateSize("1em", viewBox[2] / viewBox[3]);
	}
	const url = svgToURL(iconToHTML(buildResult.body.replace(/currentColor/g, options.color || "black"), {
		viewBox: `${viewBox[0]} ${viewBox[1]} ${viewBox[2]} ${viewBox[3]}`,
		width: `${viewBox[2]}`,
		height: `${viewBox[3]}`
	}));
	if (varName) result["--" + varName] = url;
	else switch (options.mode) {
		case "background":
			result["background-image"] = url;
			break;
		case "mask": result["mask-image"] = result["-webkit-mask-image"] = url;
	}
	return result;
}
//#endregion
//#region node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/css/format.js
var format = {
	selectorStart: {
		compressed: "{",
		compact: " {",
		expanded: " {"
	},
	selectorEnd: {
		compressed: "}",
		compact: "; }\n",
		expanded: ";\n}\n"
	},
	rule: {
		compressed: "{key}:",
		compact: " {key}: ",
		expanded: "\n  {key}: "
	}
};
/**
* Format data
*
* Key is selector, value is list of rules
*/
function formatCSS(data, mode = "expanded") {
	const results = [];
	for (let i = 0; i < data.length; i++) {
		const { selector, rules } = data[i];
		let entry = (selector instanceof Array ? selector.join(mode === "compressed" ? "," : ", ") : selector) + format.selectorStart[mode];
		let firstRule = true;
		for (const key in rules) {
			if (!firstRule) entry += ";";
			entry += format.rule[mode].replace("{key}", key) + rules[key];
			firstRule = false;
		}
		entry += format.selectorEnd[mode];
		results.push(entry);
	}
	return results.join(mode === "compressed" ? "" : "\n");
}
//#endregion
//#region node_modules/.pnpm/@iconify+utils@3.1.7/node_modules/@iconify/utils/lib/css/icon.js
/**
* Get CSS for icon, rendered as background or mask
*/
function getIconCSS(icon, options = {}) {
	const body = options.customise ? options.customise(icon.body) : icon.body;
	const mode = options.mode || (options.color || !body.includes("currentColor") ? "background" : "mask");
	let varName = options.varName;
	if (varName === void 0 && mode === "mask") varName = "svg";
	const newOptions = {
		...options,
		mode,
		varName
	};
	if (mode === "background") delete newOptions.varName;
	const rules = Object.create(null);
	Object.assign(rules, options.rules, getCommonCSSRules(newOptions), generateItemCSSRules({
		...defaultIconProps,
		...icon,
		body
	}, newOptions));
	return formatCSS([{
		selector: options.iconSelector || ".icon",
		rules
	}], newOptions.format);
}
//#endregion
//#region node_modules/.pnpm/@nuxt+icon@2.5.1_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magic-_hswihdylrjkfep5h5vodmfzxku/node_modules/@nuxt/icon/dist/runtime/components/shared.js
async function loadIcon(name, timeout) {
	if (!name) return null;
	const _icon = getIcon(name);
	if (_icon) return _icon;
	let timeoutWarn;
	const load = loadIcon$1(name).catch(() => {
		console.warn(`[Icon] failed to load icon \`${name}\``);
		return null;
	});
	if (timeout > 0) await Promise.race([load, new Promise((resolve) => {
		timeoutWarn = setTimeout(() => {
			console.warn(`[Icon] loading icon \`${name}\` timed out after ${timeout}ms`);
			resolve();
		}, timeout);
	})]).finally(() => clearTimeout(timeoutWarn));
	else await load;
	return getIcon(name);
}
function useResolvedName(getName) {
	const options = useAppConfig().icon;
	const collections = (options.collections || []).sort((a, b) => b.length - a.length);
	return computed(() => {
		const name = getName();
		const bare = name.startsWith(options.cssSelectorPrefix) ? name.slice(options.cssSelectorPrefix.length) : name;
		const resolved = options.aliases?.[bare] || bare;
		if (!resolved.includes(":")) {
			const collection = collections.find((c) => resolved.startsWith(c + "-"));
			return collection ? collection + ":" + resolved.slice(collection.length + 1) : resolved;
		}
		return resolved;
	});
}
function resolveCustomizeFn(customize, globalCustomize) {
	if (customize === false) return void 0;
	if (customize === true || customize === null) return globalCustomize;
	return customize;
}
//#endregion
//#region node_modules/.pnpm/@nuxt+icon@2.5.1_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magic-_hswihdylrjkfep5h5vodmfzxku/node_modules/@nuxt/icon/dist/runtime/components/css.js
var SYMBOL_SERVER_CSS = "NUXT_ICONS_SERVER_CSS";
function escapeCssSelector(selector) {
	return selector.replace(/([^\w-])/g, "\\$1");
}
var NuxtIconCss = /* @__PURE__ */ defineComponent({
	name: "NuxtIconCss",
	props: {
		name: {
			type: String,
			required: true
		},
		customize: {
			type: [
				Function,
				Boolean,
				null
			],
			default: null,
			required: false
		}
	},
	setup(props) {
		const nuxt = useNuxtApp();
		const options = useAppConfig().icon;
		const cssClass = computed(() => {
			if (!props.name) return "";
			const base = options.cssSelectorPrefix + props.name;
			if (typeof props.customize === "function") return base + "--customized-" + hash(props.customize.toString());
			return base;
		});
		const selector = computed(() => "." + escapeCssSelector(cssClass.value));
		function getCSS(icon, withLayer = true) {
			let iconSelector = selector.value;
			if (options.cssWherePseudo) iconSelector = `:where(${iconSelector})`;
			const css = getIconCSS(icon, {
				iconSelector,
				format: "compressed",
				customise: resolveCustomizeFn(props.customize, options.customize)
			});
			if (options.cssLayer && withLayer) return `@layer ${options.cssLayer} { ${css} }`;
			return css;
		}
		onServerPrefetch(async () => {
			if (!(useRuntimeConfig().icon || {})?.serverKnownCssClasses?.includes(cssClass.value)) {
				const icon = await loadIcon(props.name, options.fetchTimeout).catch(() => null);
				if (!icon) return null;
				let ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS];
				if (!ssrCSS) {
					ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS] = /* @__PURE__ */ new Map();
					nuxt.runWithContext(() => {
						useHead({ style: [() => {
							const sep = "";
							let css = Array.from(ssrCSS.values()).sort().join(sep);
							if (options.cssLayer) css = `@layer ${options.cssLayer} {${sep}${css}${sep}}`;
							return { innerHTML: css };
						}] }, { tagPriority: "low" });
					});
				}
				if (cssClass.value && !ssrCSS.has(cssClass.value)) {
					const css = getCSS(icon, false);
					ssrCSS.set(cssClass.value, css);
				}
				return null;
			}
		});
		return () => h("span", { class: ["iconify", cssClass.value] });
	}
});
//#endregion
//#region node_modules/.pnpm/@nuxt+icon@2.5.1_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magic-_hswihdylrjkfep5h5vodmfzxku/node_modules/@nuxt/icon/dist/runtime/components/svg.js
var NuxtIconSvg = /* @__PURE__ */ defineComponent({
	name: "NuxtIconSvg",
	props: {
		name: {
			type: String,
			required: true
		},
		customize: {
			type: [
				Function,
				Boolean,
				null
			],
			default: null,
			required: false
		}
	},
	setup(props, { slots }) {
		useNuxtApp();
		const options = useAppConfig().icon;
		const name = useResolvedName(() => props.name);
		const storeKey = "i-" + name.value;
		if (name.value) onServerPrefetch(async () => {
			await useAsyncData(storeKey, async () => await loadIcon(name.value, options.fetchTimeout), { deep: false });
		});
		return () => h(Icon, {
			icon: name.value,
			ssr: true,
			customise: resolveCustomizeFn(props.customize, options.customize)
		}, slots);
	}
});
//#endregion
//#region node_modules/.pnpm/@nuxt+icon@2.5.1_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magic-_hswihdylrjkfep5h5vodmfzxku/node_modules/@nuxt/icon/dist/runtime/components/index.js
var components_exports = /* @__PURE__ */ __exportAll({ default: () => components_default$1 });
var components_default$1 = defineComponent({
	name: "NuxtIcon",
	props: {
		name: {
			type: String,
			required: true
		},
		mode: {
			type: String,
			required: false,
			default: null
		},
		size: {
			type: [Number, String],
			required: false,
			default: null
		},
		customize: {
			type: [
				Function,
				Boolean,
				null
			],
			default: null,
			required: false
		}
	},
	setup(props, { slots }) {
		const nuxtApp = useNuxtApp();
		const runtimeOptions = useAppConfig().icon;
		const name = useResolvedName(() => props.name);
		const component = computed(() => nuxtApp.vueApp?.component(name.value) || ((props.mode || runtimeOptions.mode) === "svg" ? NuxtIconSvg : NuxtIconCss));
		const style = computed(() => {
			const size = props.size || runtimeOptions.size;
			return size ? { fontSize: Number.isNaN(+size) ? size : size + "px" } : null;
		});
		return () => h(component.value, {
			...runtimeOptions.attrs,
			name: name.value,
			class: runtimeOptions.class,
			style: style.value,
			customize: props.customize
		}, slots);
	}
});

const componentsBTbrzBc = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	a: setCustomIconsLoader,
	c: useAsyncData,
	d: klona,
	i: addAPIProvider,
	l: dataDiagnostics,
	n: components_exports,
	o: digest,
	r: _api,
	t: components_default$1,
	u: useAppConfig
}, Symbol.toStringTag, { value: 'Module' }));

//#region node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs
var NODE_TYPES = {
	NORMAL: 0,
	WILDCARD: 1,
	PLACEHOLDER: 2
};
function createRouter$1(options = {}) {
	const ctx = {
		options,
		rootNode: createRadixNode(),
		staticRoutesMap: {}
	};
	const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
	if (options.routes) for (const path in options.routes) insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
	return {
		ctx,
		lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
		insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
		remove: (path) => remove(ctx, normalizeTrailingSlash(path))
	};
}
function lookup(ctx, path) {
	const staticPathNode = ctx.staticRoutesMap[path];
	if (staticPathNode) return staticPathNode.data;
	const sections = path.split("/");
	const params = {};
	let paramsFound = false;
	let wildcardNode = null;
	let node = ctx.rootNode;
	let wildCardParam = null;
	for (let i = 0; i < sections.length; i++) {
		const section = sections[i];
		if (node.wildcardChildNode !== null) {
			wildcardNode = node.wildcardChildNode;
			wildCardParam = sections.slice(i).join("/");
		}
		const nextNode = node.children.get(section);
		if (nextNode === void 0) {
			if (node && node.placeholderChildren.length > 1) {
				const remaining = sections.length - i;
				node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
			} else node = node.placeholderChildren[0] || null;
			if (!node) break;
			if (node.paramName) params[node.paramName] = section;
			paramsFound = true;
		} else node = nextNode;
	}
	if ((node === null || node.data === null) && wildcardNode !== null) {
		node = wildcardNode;
		params[node.paramName || "_"] = wildCardParam;
		paramsFound = true;
	}
	if (!node) return null;
	if (paramsFound) return {
		...node.data,
		params: paramsFound ? params : void 0
	};
	return node.data;
}
function insert(ctx, path, data) {
	let isStaticRoute = true;
	const sections = path.split("/");
	let node = ctx.rootNode;
	let _unnamedPlaceholderCtr = 0;
	const matchedNodes = [node];
	for (const section of sections) {
		let childNode;
		if (childNode = node.children.get(section)) node = childNode;
		else {
			const type = getNodeType(section);
			childNode = createRadixNode({
				type,
				parent: node
			});
			node.children.set(section, childNode);
			if (type === NODE_TYPES.PLACEHOLDER) {
				childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
				node.placeholderChildren.push(childNode);
				isStaticRoute = false;
			} else if (type === NODE_TYPES.WILDCARD) {
				node.wildcardChildNode = childNode;
				childNode.paramName = section.slice(3) || "_";
				isStaticRoute = false;
			}
			matchedNodes.push(childNode);
			node = childNode;
		}
	}
	for (const [depth, node2] of matchedNodes.entries()) node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
	node.data = data;
	if (isStaticRoute === true) ctx.staticRoutesMap[path] = node;
	return node;
}
function remove(ctx, path) {
	let success = false;
	const sections = path.split("/");
	let node = ctx.rootNode;
	for (const section of sections) {
		node = node.children.get(section);
		if (!node) return success;
	}
	if (node.data) {
		const lastSection = sections.at(-1) || "";
		node.data = null;
		if (Object.keys(node.children).length === 0 && node.parent) {
			node.parent.children.delete(lastSection);
			node.parent.wildcardChildNode = null;
			node.parent.placeholderChildren = [];
		}
		success = true;
	}
	return success;
}
function createRadixNode(options = {}) {
	return {
		type: options.type || NODE_TYPES.NORMAL,
		maxDepth: 0,
		parent: options.parent || null,
		children: /* @__PURE__ */ new Map(),
		data: options.data || null,
		paramName: options.paramName || null,
		wildcardChildNode: null,
		placeholderChildren: []
	};
}
function getNodeType(str) {
	if (str.startsWith("**")) return NODE_TYPES.WILDCARD;
	if (str[0] === ":" || str === "*") return NODE_TYPES.PLACEHOLDER;
	return NODE_TYPES.NORMAL;
}
function toRouteMatcher(router) {
	return _createMatcher(_routerNodeToTable("", router.ctx.rootNode), router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
	return {
		ctx: { table },
		matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
	};
}
function _createRouteTable() {
	return {
		static: /* @__PURE__ */ new Map(),
		wildcard: /* @__PURE__ */ new Map(),
		dynamic: /* @__PURE__ */ new Map()
	};
}
function _matchRoutes(path, table, strictTrailingSlash) {
	if (strictTrailingSlash !== true && path.endsWith("/")) path = path.slice(0, -1) || "/";
	const matches = [];
	for (const [key, value] of _sortRoutesMap(table.wildcard)) if (path === key || path.startsWith(key + "/")) matches.push(value);
	for (const [key, value] of _sortRoutesMap(table.dynamic)) if (path.startsWith(key + "/")) {
		const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
		matches.push(..._matchRoutes(subPath, value));
	}
	const staticMatch = table.static.get(path);
	if (staticMatch) matches.push(staticMatch);
	return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
	return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
	const table = _createRouteTable();
	function _addNode(path, node) {
		if (path) {
			if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
				if (node.data) table.static.set(path, node.data);
			} else if (node.type === NODE_TYPES.WILDCARD) table.wildcard.set(path.replace("/**", ""), node.data);
			else if (node.type === NODE_TYPES.PLACEHOLDER) {
				const subTable = _routerNodeToTable("", node);
				if (node.data) subTable.static.set("/", node.data);
				table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
				return;
			}
		}
		for (const [childPath, child] of node.children.entries()) _addNode(`${path}/${childPath}`.replace("//", "/"), child);
	}
	_addNode(initialPath, initialNode);
	return table;
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fglobal-polyfills.mjs
if (!("global" in globalThis)) globalThis.global = globalThis;
//#endregion
//#region node_modules/.pnpm/fnv1a-64@0.1.2/node_modules/fnv1a-64/dist/index.mjs
/**
* Compute the 64-bit FNV-1a hash of a string as two 32-bit lanes.
*
* This is the fast core: no BigInt, no allocations, plain `Math.imul`-free
* 32-bit arithmetic. Prefer {@link fnv1a64Hex} or {@link fnv1a64Base36} for a
* usable key; use this directly only when you want to avoid string formatting.
*
* The hash is computed over UTF-16 code units (`str.charCodeAt(i)`), not UTF-8
* bytes. For ASCII input this matches a canonical FNV-1a-64; for non-ASCII it
* does not. See the README for details.
*
* @param str - The string to hash.
* @returns The `{ high, low }` 32-bit lanes of the 64-bit hash.
*/
function fnv1a64(str) {
	const len = str.length;
	let i = 0;
	let t0 = 0;
	let v0 = 8997;
	let t1 = 0;
	let v1 = 33826;
	let t2 = 0;
	let v2 = 40164;
	let t3 = 0;
	let v3 = 52210;
	while (i < len) {
		v0 ^= str.charCodeAt(i++);
		t0 = v0 * 435;
		t1 = v1 * 435;
		t2 = v2 * 435;
		t3 = v3 * 435;
		t2 += v0 << 8;
		t3 += v1 << 8;
		t1 += t0 >>> 16;
		v0 = t0 & 65535;
		t2 += t1 >>> 16;
		v1 = t1 & 65535;
		v3 = t3 + (t2 >>> 16) & 65535;
		v2 = t2 & 65535;
	}
	return {
		high: (v3 << 16 | v2) >>> 0,
		low: (v1 << 16 | v0) >>> 0
	};
}
/**
* Compute the 64-bit FNV-1a hash of a string as a `bigint`.
*
* Ergonomic and comparable, at the cost of composing the two lanes into a
* `bigint`. For a compact string key, prefer {@link fnv1a64Base36}.
*
* @param str - The string to hash.
* @returns The 64-bit hash as an unsigned `bigint`.
*/
function fnv1a64BigInt(str) {
	const { high, low } = fnv1a64(str);
	return BigInt(high) << 32n | BigInt(low);
}
var hexDigits = "0123456789abcdef";
Array.from({ length: 256 }, (_, i) => hexDigits.charAt(i >> 4) + hexDigits.charAt(i & 15));
/**
* Compute the 64-bit FNV-1a hash of a string as a base36 string.
*
* This is the shortest textual form (up to 13 characters) and is ideal for
* cache keys. The length varies with the value; it is not zero-padded. Equal
* inputs always produce identical strings.
*
* @param str - The string to hash.
* @returns A base36 string of the 64-bit hash.
*/
function fnv1a64Base36(str) {
	return fnv1a64BigInt(str).toString(36);
}
//#endregion
//#region node_modules/.pnpm/object-identity@0.2.3/node_modules/object-identity/index.js
function walk(input, seen) {
	if (input === null) return "L";
	let out, i = 0, keys = input, tmp = typeof input;
	if (tmp !== "object") {
		if (tmp === "number") return input - input === 0 ? "n" + input : "L";
		if (tmp === "string") return "s" + input;
		if (tmp === "bigint") return "n" + input;
		if (tmp === "boolean") return input ? "T" : "F";
		return;
	}
	let is_arr = Array.isArray(input);
	if (!is_arr) {
		if (input instanceof Date) return "d" + +input;
		if (input instanceof RegExp) return "r" + input.source + input.flags;
	}
	tmp = seen.indexOf(input);
	if (~tmp) return "~" + (tmp + 1);
	if (typeof input.toJSON === "function" && !ArrayBuffer.isView(input)) {
		input = input.toJSON();
		if (input === null || typeof input !== "object") return walk(input, seen);
		tmp = seen.indexOf(input);
		if (~tmp) return "~" + (tmp + 1);
		is_arr = Array.isArray(input);
	}
	seen.push(keys);
	if (is_arr) for (out = "a"; i < input.length; out += (tmp = walk(input[i++], seen)) === void 0 ? "L" : tmp);
	else if (input instanceof Set) {
		out = "e";
		for (let value of input) out += (tmp = walk(value, seen)) === void 0 ? "L" : tmp;
	} else if (input instanceof Map) {
		keys = [...input.keys()];
		if (keys.length > 1) keys.sort();
		for (out = "o"; i < keys.length; i++) if ((tmp = walk(input.get(keys[i]), seen)) !== void 0) out += keys[i] + tmp;
	} else if (input[Symbol.toStringTag] === void 0 || ArrayBuffer.isView(input)) {
		keys = Object.keys(input);
		if (keys.length > 1) keys.sort();
		for (out = "o"; i < keys.length; i++) if ((tmp = walk(input[keys[i]], seen)) !== void 0) out += keys[i] + tmp;
	} else throw new Error("Unsupported value");
	seen.pop();
	return out;
}
/**
* Canonicalize a value into a stable identity string. Two structurally-equal
* inputs return the same id, regardless of key order.
*
* @example
* ```ts
* identify({ a: 1, b: 2 }) === identify({ b: 2, a: 1 }); // true
* ```
*/
function identify(input) {
	return walk(input, []) ?? "U";
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/utils/hash.js
/**
* Hash an arbitrary value into a short, stable string key.
*
* Values are serialized to a canonical, locale-independent representation
* (equal structures hash equally regardless of key order or runtime locale),
* then digested with a fast non-cryptographic hash. This is what `useFetch` and
* `useAsyncData` use internally to derive their cache keys, so it is safe to use
* for the same purpose in your own code.
*
* The digest is non-cryptographic and must not be used for integrity checks.
*
* @since 4.5.0
*/
function hashKey(value) {
	return fnv1a64Base36(identify(value));
}
//#endregion
//#region node_modules/.pnpm/unhead@3.4.3_esbuild@0.28.2_rolldown@1.2.13_rollup@4.64.5_vite@8.3.4_esbuild@0.28.2_jiti@2.7.0_terser@5.51.2_yaml@2.9.1_/node_modules/unhead/dist/shared/unhead.DspMpm6y.mjs
var BACKSLASH_RE = /\\/g;
var LT_RE = /</g;
var DOUBLE_QUOTE_RE = /"/g;
var TOKEN_RE = /%\w+(?:\.\w+)?/g;
var SepSub = "%separator";
function sub(p, token, isJson = false) {
	let val;
	if (token === "s" || token === "pageTitle") val = p.pageTitle;
	else if (token.includes(".")) {
		const dotIndex = token.indexOf(".");
		val = p[token.substring(0, dotIndex)]?.[token.substring(dotIndex + 1)];
	} else val = p[token];
	if (val !== void 0) {
		const str = typeof val === "number" ? String(val) : String(val || "");
		return isJson ? str.replace(BACKSLASH_RE, "\\\\").replace(LT_RE, "\\u003C").replace(DOUBLE_QUOTE_RE, "\\\"") : str;
	}
}
function processTemplateParams(s, p, sep, isJson = false) {
	if (typeof s !== "string" || !s.includes("%")) return s;
	let decoded = s;
	try {
		decoded = decodeURI(s);
	} catch {}
	const tokens = decoded.match(TOKEN_RE);
	if (!tokens) return s;
	const hasSepSub = s.includes(SepSub);
	s = s.replace(TOKEN_RE, (token) => {
		if (token === SepSub || !tokens.includes(token)) return token;
		const re = sub(p, token.slice(1), isJson);
		return re !== void 0 ? re : token;
	}).trim();
	if (hasSepSub) s = s.split(SepSub).map((part) => part.trim()).filter((part) => part !== "").join(sep ? ` ${sep} ` : " ");
	return s;
}
//#endregion
//#region node_modules/.pnpm/unhead@3.4.3_esbuild@0.28.2_rolldown@1.2.13_rollup@4.64.5_vite@8.3.4_esbuild@0.28.2_jiti@2.7.0_terser@5.51.2_yaml@2.9.1_/node_modules/unhead/dist/shared/unhead.D9VfQWNo.mjs
var SupportedAttrs = {
	meta: "content",
	link: "href",
	htmlAttrs: "lang"
};
var contentAttrs = ["innerHTML", "textContent"];
function processIfNeeded(value, params, separator, isJson = false) {
	return typeof value === "string" && value.includes("%") ? processTemplateParams(value, params, separator, isJson) : value;
}
var TemplateParamsPlugin = /* @__PURE__ */ defineHeadPlugin((head) => {
	return {
		key: "template-params",
		hooks: {
			"tags:resolve": ({ tagMap, tags }) => {
				const params = tagMap.get("templateParams")?.props || {};
				const sep = params.separator || "|";
				delete params.separator;
				params.pageTitle = processIfNeeded(params.pageTitle || head._title || "", params, sep);
				for (const tag of tags) {
					if (tag.processTemplateParams === false) continue;
					const v = SupportedAttrs[tag.tag];
					if (v && typeof tag.props[v] === "string") tag.props[v] = processIfNeeded(tag.props[v], params, sep);
					else if (tag.processTemplateParams || tag.tag === "titleTemplate" || tag.tag === "title") {
						for (const p of contentAttrs) if (typeof tag[p] === "string") tag[p] = processIfNeeded(tag[p], params, sep, tag.tag === "script" && typeof tag.props.type === "string" && tag.props.type.endsWith("json"));
					}
				}
				head._templateParams = params;
				head._separator = sep;
			},
			"tags:afterResolve": ({ tagMap }) => {
				const title = tagMap.get("title");
				if (title?.textContent && title.processTemplateParams !== false) title.textContent = processIfNeeded(title.textContent, head._templateParams, head._separator);
			}
		}
	};
}, "template-params");
//#endregion
//#region node_modules/.pnpm/unhead@3.4.3_esbuild@0.28.2_rolldown@1.2.13_rollup@4.64.5_vite@8.3.4_esbuild@0.28.2_jiti@2.7.0_terser@5.51.2_yaml@2.9.1_/node_modules/unhead/dist/plugins.mjs
var IMAGE_META_KEYS = /* @__PURE__ */ new Set([
	"og:image",
	"og:image:url",
	"og:image:secure_url",
	"twitter:image",
	"twitter:image:src"
]);
function isImageMeta(tag) {
	if (tag.tag !== "meta") return false;
	const content = tag.props.content;
	return IMAGE_META_KEYS.has(tag.props.property || tag.props.name) && !!hasContent(content) && String(content).trim() !== "";
}
function InferSeoMetaPlugin(options = {}) {
	return defineHeadPlugin((head) => {
		if (options.twitterCard !== false) head.push({ meta: [options.twitterCard ? {
			name: "twitter:card",
			content: options.twitterCard,
			tagPriority: "low"
		} : {
			"name": "twitter:card",
			"tagPriority": "low",
			"data-infer": ""
		}] });
		head.push({ meta: [{
			"property": "og:title",
			"tagPriority": "low",
			"data-infer": ""
		}, {
			"property": "og:description",
			"tagPriority": "low",
			"data-infer": ""
		}] });
		return {
			key: "infer-seo-meta",
			hooks: {
				"tags:beforeResolve": ({ tagMap }) => {
					let title = head._titleTemplate || head._title;
					const ogTitle = tagMap.get("meta:og:title");
					if (typeof ogTitle?.props["data-infer"] !== "undefined") {
						if (typeof title === "function") title = title(head._title);
						title = hasContent(title) ? String(title) : void 0;
						ogTitle.props.content = options.ogTitle ? options.ogTitle(title) : title || "";
						ogTitle.processTemplateParams = true;
					}
					const descriptionValue = tagMap.get("meta:description")?.props?.content;
					const description = hasContent(descriptionValue) ? String(descriptionValue) : void 0;
					const ogDescription = tagMap.get("meta:og:description");
					if (typeof ogDescription?.props["data-infer"] !== "undefined") {
						ogDescription.props.content = options.ogDescription ? options.ogDescription(description) : description || "";
						ogDescription.processTemplateParams = true;
					}
				},
				"tags:afterResolve": (ctx) => {
					let cardIndex = -1;
					let hasImage = false;
					for (let i = 0; i < ctx.tags.length; i++) {
						const tag = ctx.tags[i];
						if (tag.tag === "meta" && tag.props.name === "twitter:card" && typeof tag.props["data-infer"] !== "undefined") cardIndex = i;
						else if (!hasImage && isImageMeta(tag)) hasImage = true;
					}
					if (cardIndex === -1) return;
					const card = ctx.tags[cardIndex];
					const props = {
						...card.props,
						content: hasImage ? "summary_large_image" : "summary"
					};
					delete props["data-infer"];
					ctx.tags[cardIndex] = {
						...card,
						props
					};
				}
			}
		};
	}, "infer-seo-meta");
}
//#endregion
//#region node_modules/.pnpm/@vue+shared@3.5.43/node_modules/@vue/shared/dist/shared.cjs.prod.js
/**
* @vue/shared v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
var require_shared_cjs_prod = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var objectToString = Object.prototype.toString;
	var toTypeString = (value) => objectToString.call(value);
	var isPlainObject = (val) => toTypeString(val) === "[object Object]";
	exports.isPlainObject = isPlainObject;
}));
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/diagnostics/state.js
/**
* E7xxx
* Payload / state / cookie runtime diagnostics.
*/
var stateDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/composables/state.js
var useStateKeyPrefix = "$s";
function useState(...args) {
	const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
	if (typeof args[0] !== "string") args.unshift(autoKey);
	const [_key, init] = args;
	if (!_key || typeof _key !== "string") throw stateDiagnostics.NUXT_E7009({ key: _key });
	if (init !== void 0 && typeof init !== "function") throw stateDiagnostics.NUXT_E7007({ type: typeof init });
	const key = useStateKeyPrefix + _key;
	const nuxtApp = useNuxtApp();
	const state = toRef(nuxtApp.payload.state, key);
	if (init) nuxtApp._state[key] ??= { _default: init };
	if (state.value === void 0 && init) {
		const initialValue = init();
		if (isRef(initialValue)) {
			nuxtApp.payload.state[key] = initialValue;
			return state;
		}
		state.value = initialValue;
	}
	return state;
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/composables/fetch.js
var import_shared_cjs_prod = require_shared_cjs_prod();
var $fetch$1 = $fetch;
var MAYBE_REF_OR_GETTER_OPTION_KEYS = [
	"method",
	"baseURL",
	"query",
	"params",
	"body",
	"headers"
];
function generateOptionSegments(opts) {
	const segments = [toValue(opts.method)?.toUpperCase() || "GET", toValue(opts.baseURL)];
	for (const _obj of [opts.query || opts.params]) {
		const obj = toValue(_obj);
		if (!obj) continue;
		const unwrapped = {};
		for (const [key, value] of Object.entries(obj)) unwrapped[toValue(key)] = toValue(value);
		segments.push(unwrapped);
	}
	if (opts.body) {
		const value = toValue(opts.body);
		if (!value) segments.push(hashKey(value));
		else if (value instanceof ArrayBuffer) segments.push(hashKey(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
		else if (value instanceof FormData) {
			const entries = [];
			for (const entry of value.entries()) {
				const [key, val] = entry;
				entries.push([key, val instanceof File ? `${val.name}:${val.size}:${val.lastModified}` : val]);
			}
			segments.push(hashKey(entries));
		} else if ((0, import_shared_cjs_prod.isPlainObject)(value)) segments.push(hashKey(reactive(value)));
		else try {
			segments.push(hashKey(value));
		} catch {
			dataDiagnostics.NUXT_E3002({ cause: value });
		}
	}
	return segments;
}
/** @internal */
function _createUseFetch(options = {}) {
	{
		function useFetch(request, arg1, arg2) {
			const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
			const factoryOptions = typeof options === "function" ? options(opts) : options;
			const { server, lazy, default: defaultFn, transform, pick, watch: watchSources, immediate, getCachedData, deep, dedupe, timeout, enabled, serialize, middleware, _keySegments: keySegments, ...fetchOptions } = {
				...typeof options === "function" ? {} : factoryOptions,
				...opts,
				...typeof options === "function" ? factoryOptions : {}
			};
			const _request = computed(() => toValue(request));
			const key = computed(() => toValue(fetchOptions.key) || "$f" + hashKey([
				autoKey,
				typeof _request.value === "string" ? _request.value : "",
				...generateOptionSegments(fetchOptions),
				...keySegments ? keySegments.map((segment) => toValue(segment)) : []
			]));
			if (!fetchOptions.baseURL && typeof _request.value === "string" && _request.value[0] === "/" && _request.value[1] === "/") throw dataDiagnostics.NUXT_E3001({ url: _request.value });
			const _fetchOptions = reactive({
				...fetchDefaults,
				...fetchOptions,
				cache: typeof fetchOptions.cache === "boolean" ? void 0 : fetchOptions.cache
			});
			const _asyncDataOptions = {
				server,
				lazy,
				default: defaultFn,
				transform,
				pick,
				immediate,
				getCachedData,
				deep,
				dedupe,
				timeout,
				enabled,
				serialize,
				middleware,
				watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
			};
			if (watchSources === false) _asyncDataOptions._keyTriggersExecute = false;
			return useAsyncData(key, (_, { signal }) => {
				let _$fetch = fetchOptions.$fetch || $fetch$1;
				if (!fetchOptions.$fetch) {
					if (typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(fetchOptions.baseURL) || toValue(fetchOptions.baseURL)[0] === "/")) _$fetch = useRequestFetch();
				}
				const resolvedOptions = {
					signal,
					..._fetchOptions
				};
				for (const key of MAYBE_REF_OR_GETTER_OPTION_KEYS) if (typeof resolvedOptions[key] === "function") resolvedOptions[key] = toValue(resolvedOptions[key]);
				return _$fetch(_request.value, resolvedOptions);
			}, _asyncDataOptions);
		}
		return useFetch;
	}
}
var useFetch = _createUseFetch();
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/diagnostics/manifest.js
/**
* E5xxx
* App manifest / route-rules runtime diagnostics.
*/
var manifestDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froute-rules.mjs
var foldedMatcher = /* @__PURE__ */ (() => {
	const $0 = { prerender: true }, $1 = {}, $2 = { payload: false };
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1);
		if (p === "/__nuxt_content/blog/sql_dump.txt") r.push({ data: $0 });
		else if (p === "/__nuxt_content/projects/sql_dump.txt") r.push({ data: $0 });
		else if (p === "/sitemap.xml") r.push({ data: $1 });
		else if (p === "/llms.txt") r.push({ data: $1 });
		else if (p === "/llms-full.txt") r.push({ data: $1 });
		else if (p === "/sitemap.md") r.push({ data: $1 });
		else if (p === "/_nuxt") r.push({ data: $1 });
		else if (p.charCodeAt(p.length - 1) === 47) {
			if (p === "/__nuxt_content/blog/sql_dump.txt/") r.push({ data: $0 });
			else if (p === "/__nuxt_content/projects/sql_dump.txt/") r.push({ data: $0 });
			else if (p === "/sitemap.xml/") r.push({ data: $1 });
			else if (p === "/llms.txt/") r.push({ data: $1 });
			else if (p === "/llms-full.txt/") r.push({ data: $1 });
			else if (p === "/sitemap.md/") r.push({ data: $1 });
			else if (p === "/_nuxt/") r.push({ data: $1 });
		}
		let s = p.split("/");
		if (s.length > 1 && s[s.length - 1] === "") {
			s.pop();
			p = p.slice(0, -1);
		}
		let l = s.length;
		if (l > 1) {
			if (s[1] === "__nuxt_content") r.push({
				data: $2,
				params: { "_": p.slice(16) }
			});
			else if (s[1] === "_og") {
				if (l > 2) {
					if (s[2] === "d") r.push({
						data: $1,
						params: { "_": p.slice(7) }
					});
					else if (s[2] === "r") r.push({
						data: $1,
						params: { "_": p.slice(7) }
					});
					else if (s[2] === "s") r.push({
						data: $1,
						params: { "_": p.slice(7) }
					});
				}
			}
		}
		return r.reverse();
	};
})();
var decodeRoutePath = function decodeRoutePath(path) {
	if (!path.includes("%")) return path;
	const queryIndex = path.indexOf("?");
	const pathname = queryIndex === -1 ? path : path.slice(0, queryIndex);
	try {
		return queryIndex === -1 ? decodeURI(pathname) : decodeURI(pathname) + path.slice(queryIndex);
	} catch {
		return path;
	}
};
var normalizePath = (path, fold) => {
	if (typeof path !== "string") return path;
	const decoded = decodeRoutePath(path);
	return fold ? decoded.toLowerCase() : decoded;
};
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default = (path) => defu({}, ...foldedMatcher("", normalizePath(path, true)).map((r) => r.data).reverse());
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/composables/manifest.js
function routeRulesMatcher$1(path) {
	return virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default(path);
}
function getRouteRules(arg) {
	const path = typeof arg === "string" ? arg : arg.path;
	try {
		return routeRulesMatcher$1(path);
	} catch (e) {
		manifestDiagnostics.NUXT_E5003({
			path,
			cause: e
		});
		return {};
	}
}
typeof process === "object" && process.versions?.node !== void 0;
Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength")?.get;
typeof SharedArrayBuffer === "undefined" || Object.getOwnPropertyDescriptor(SharedArrayBuffer.prototype, "byteLength")?.get;
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/composables/payload.js
/**
* This is an experimental function for configuring passing rich data from server -> client.
* @since 3.4.0
*/
function definePayloadReducer(name, reduce) {
	useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/composables/url.js
/** @since 3.5.0 */
function useRequestURL(opts) {
	return getRequestURL(useRequestEvent(), opts);
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/pages/runtime/router.options.js
var router_options_default = { scrollBehavior(to, from, savedPosition) {
	const nuxtApp = useNuxtApp();
	const router = useRouter();
	const hashScrollBehaviour = router.options?.scrollBehaviorType ?? "auto";
	if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
		if (from.hash && !to.hash) return savedPosition ?? {
			left: 0,
			top: 0
		};
		if (to.hash) return {
			el: to.hash,
			top: _getHashElementScrollMarginTop(to.hash),
			behavior: hashScrollBehaviour
		};
		return false;
	}
	if ((typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop) === false) return false;
	if (from === START_LOCATION) return _calculatePosition(to, from, savedPosition, hashScrollBehaviour);
	return new Promise((resolve) => {
		const doScroll = () => {
			requestAnimationFrame(() => {
				if (router.currentRoute.value.fullPath !== to.fullPath) {
					resolve(false);
					return;
				}
				resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
			});
		};
		nuxtApp.hooks.hookOnce("page:loading:end", () => {
			const transitionPromise = nuxtApp["~transitionPromise"];
			if (transitionPromise) transitionPromise.then(doScroll);
			else doScroll();
		});
	});
} };
function _getHashElementScrollMarginTop(selector) {
	try {
		const elem = (void 0).querySelector(selector);
		if (elem) return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
	} catch {}
	return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
	if (savedPosition) return savedPosition;
	if (to.hash) return {
		el: to.hash,
		top: _getHashElementScrollMarginTop(to.hash),
		behavior: isChangingPage(to, from) ? defaultHashScrollBehaviour : "instant"
	};
	return {
		left: 0,
		top: 0
	};
}
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default = {
	hashMode: false,
	scrollBehaviorType: "auto",
	sensitive: false,
	...router_options_default
};
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-link.js
var firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtLink(options) {
	const componentName = options.componentName || "NuxtLink";
	function isHashLinkWithoutHashMode(link) {
		return typeof link === "string" && link.startsWith("#");
	}
	function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
		const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
		if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") return to;
		if (typeof to === "string") return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
		const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
		return {
			...to,
			name: void 0,
			path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
		};
	}
	/**
	* The link state `<NuxtLink>` renders with. Kept separate from `useNuxtLink` so the component
	* does not resolve the `<RouterLink>` link state backing `route`/`isActive`/`isExactActive`,
	* which it never reads.
	*/
	function useLinkTarget(props) {
		const router = useRouter();
		const config = /* @__PURE__ */ useRuntimeConfig();
		const rootedHref = router.options?.history?.createHref ?? ((path) => joinURL$1(config.app.baseURL, path));
		const hasTarget = computed(() => !!unref(props.target) && unref(props.target) !== "_self");
		const isAbsoluteUrl = computed(() => {
			const path = unref(props.to) || unref(props.href) || "";
			return typeof path === "string" && isAbsoluteHref(path);
		});
		const isExternal = computed(() => {
			if (unref(props.external)) return true;
			const path = unref(props.to) || unref(props.href) || "";
			if (typeof path === "object") return false;
			return path === "" || isAbsoluteUrl.value;
		});
		const to = computed(() => {
			const path = unref(props.to) || unref(props.href) || "";
			if (isExternal.value) return path;
			return resolveTrailingSlashBehavior(path, router.resolve, unref(props.trailingSlash));
		});
		const href = computed(() => {
			const effectiveTrailingSlash = unref(props.trailingSlash) ?? options.trailingSlash;
			if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
				const raw = to.value;
				return typeof raw === "string" ? sanitizeAnchorHref(raw) : raw;
			}
			if (isExternal.value) {
				const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
				const href = typeof path === "object" ? router.resolve(path).href : path;
				const safe = typeof href === "string" ? sanitizeAnchorHref(href) : href;
				return safe === null ? null : applyTrailingSlashBehavior(safe, effectiveTrailingSlash);
			}
			if (typeof to.value === "object") return router.resolve(to.value)?.href ?? null;
			return applyTrailingSlashBehavior(isRootedPath(to.value) ? rootedHref(to.value) : router.resolve(to.value).href, effectiveTrailingSlash);
		});
		return {
			to,
			hasTarget,
			isAbsoluteUrl,
			isExternal,
			href,
			async navigate(_e) {
				if (href.value === null) return;
				await navigateTo(href.value, {
					replace: unref(props.replace),
					external: isExternal.value || hasTarget.value
				});
			}
		};
	}
	function useNuxtLink(props) {
		const router = useRouter();
		const target = useLinkTarget(props);
		const builtinRouterLink = resolveComponent("RouterLink");
		const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
		const link = target.isExternal.value ? void 0 : useBuiltinLink?.({
			...props,
			to: target.to,
			viewTransition: unref(props.viewTransition)
		});
		return {
			...target,
			isActive: link?.isActive ?? computed(() => target.to.value === router.currentRoute.value.path),
			isExactActive: link?.isExactActive ?? computed(() => target.to.value === router.currentRoute.value.path),
			route: link?.route ?? computed(() => router.resolve(target.to.value))
		};
	}
	/**
	* Render an internal link as a plain anchor, matching the markup `<RouterLink>` produces
	* for the same location.
	*/
	function renderStaticInternalLink(props, slots, router, rawTo) {
		const route = router.resolve(resolveTrailingSlashBehavior(rawTo, router.resolve, props.trailingSlash));
		const currentRoute = router.currentRoute.value;
		const index = activeRecordIndex(route, currentRoute);
		const isActive = index > -1 && includesParams(currentRoute.params, route.params);
		const isExactActive = index > -1 && index === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.params);
		let dataInternal;
		const routerOptions = router.options;
		const href = sanitizeAnchorHref(route.href);
		return h("a", {
			"aria-current": isExactActive ? props.ariaCurrentValue ?? "page" : null,
			href,
			"class": {
				[getLinkClass(props.activeClass || options.activeClass, routerOptions.linkActiveClass, "router-link-active")]: isActive,
				[getLinkClass(props.exactActiveClass || options.exactActiveClass, routerOptions.linkExactActiveClass, "router-link-exact-active")]: isExactActive
			},
			"rel": props.rel || void 0,
			"data-internal": dataInternal
		}, slots.default?.({
			route,
			href,
			isActive,
			isExactActive,
			navigate: () => navigateTo(route.href, { replace: props.replace })
		}));
	}
	return defineComponent({
		name: componentName,
		props: {
			to: {
				type: [String, Object],
				required: false
			},
			href: {
				type: [String, Object],
				required: false
			},
			target: {
				type: String,
				required: false
			},
			rel: {
				type: String,
				required: false
			},
			noRel: {
				type: Boolean,
				default: void 0,
				required: false
			},
			prefetch: {
				type: Boolean,
				default: void 0,
				required: false
			},
			prefetchOn: {
				type: [String, Object],
				required: false
			},
			noPrefetch: {
				type: Boolean,
				default: void 0,
				required: false
			},
			activeClass: {
				type: String,
				required: false
			},
			exactActiveClass: {
				type: String,
				required: false
			},
			prefetchedClass: {
				type: String,
				required: false
			},
			replace: {
				type: Boolean,
				default: void 0,
				required: false
			},
			ariaCurrentValue: {
				type: String,
				required: false
			},
			external: {
				type: Boolean,
				default: void 0,
				required: false
			},
			custom: {
				type: Boolean,
				default: void 0,
				required: false
			},
			trailingSlash: {
				type: String,
				required: false
			}
		},
		useLink: useNuxtLink,
		setup(props, { slots }) {
			const router = useRouter();
			if (!props.custom) {
				const rawTo = props.to || props.href || "";
				if (!(props.external || typeof rawTo === "string" && (rawTo === "" || isAbsoluteHref(rawTo))) && !isHashLinkWithoutHashMode(rawTo) && (!props.target || props.target === "_self")) return () => renderStaticInternalLink(props, slots, router, rawTo);
			}
			const routerLinkComponent = resolveComponent("RouterLink");
			const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useLinkTarget(props);
			const prefetched = shallowRef(false);
			const el = void 0;
			const elRef = void 0;
			function shouldPrefetch(mode) {
				return false;
			}
			async function prefetch(nuxtApp = useNuxtApp()) {}
			return () => {
				const target = props.target || null;
				const rel = firstNonUndefined(props.noRel ? "" : props.rel, options.externalRelAttribute, isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : "") || null;
				const getCustomSlotProps = (routerLinkSlotProps) => ({
					navigate,
					get route() {
						if (!href.value) return;
						const url = new URL(href.value, "http://localhost");
						return {
							path: url.pathname,
							fullPath: url.pathname,
							get query() {
								return parseQuery(url.search);
							},
							hash: url.hash,
							params: {},
							name: void 0,
							matched: [],
							redirectedFrom: void 0,
							meta: {},
							href: href.value
						};
					},
					rel,
					target,
					isExternal: isExternal.value || hasTarget.value,
					isActive: false,
					isExactActive: false,
					...routerLinkSlotProps,
					href: typeof routerLinkSlotProps?.href === "string" ? sanitizeAnchorHref(routerLinkSlotProps.href) : href.value,
					prefetch,
					prefetched: prefetched.value,
					shouldPrefetch
				});
				if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
					const routerLinkProps = {
						ref: elRef,
						to: to.value,
						activeClass: props.activeClass || options.activeClass,
						exactActiveClass: props.exactActiveClass || options.exactActiveClass,
						replace: props.replace,
						ariaCurrentValue: props.ariaCurrentValue,
						custom: props.custom
					};
					if (!props.custom) routerLinkProps.rel = props.rel || void 0;
					return h(routerLinkComponent, routerLinkProps, props.custom && slots.default ? { default: (slotProps) => slots.default(getCustomSlotProps(slotProps)) } : slots.default);
				}
				if (props.custom) {
					if (!slots.default) return null;
					return slots.default(getCustomSlotProps());
				}
				return h("a", {
					ref: el,
					href: href.value || null,
					rel,
					target,
					onClick: async (event) => {
						if (isExternal.value || hasTarget.value) return;
						event.preventDefault();
						try {
							const encodedHref = encodeRoutePath(href.value ?? "");
							return await (props.replace ? router.replace(encodedHref) : router.push(encodedHref));
						} finally {}
					}
				}, slots.default?.());
			};
		}
	});
}
var NuxtLink = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function isSameRouteRecord(a, b) {
	return (a.aliasOf || a) === (b.aliasOf || b);
}
function getOriginalPath(record) {
	return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
function isEquivalentArray(a, b) {
	return Array.isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function isSameParamValue(a, b) {
	return Array.isArray(a) ? isEquivalentArray(a, b) : Array.isArray(b) ? isEquivalentArray(b, a) : (a && a.valueOf()) === (b && b.valueOf());
}
function isSameRouteLocationParams(a, b) {
	if (Object.keys(a).length !== Object.keys(b).length) return false;
	for (const key in a) if (!isSameParamValue(a[key], b[key])) return false;
	return true;
}
function includesParams(outer, inner) {
	for (const key in inner) {
		const innerValue = inner[key];
		const outerValue = outer[key];
		if (typeof innerValue === "string") {
			if (innerValue !== outerValue) return false;
		} else if (!Array.isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value.valueOf() !== outerValue[i].valueOf())) return false;
	}
	return true;
}
function activeRecordIndex(route, currentRoute) {
	const { matched } = route;
	const { length } = matched;
	const routeMatched = matched[length - 1];
	const currentMatched = currentRoute.matched;
	if (!routeMatched || !currentMatched.length) return -1;
	const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
	if (index > -1) return index;
	const parentRecordPath = getOriginalPath(matched[length - 2]);
	return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
}
/** Resolve an active-link class, falling back from the per-link value to the router-wide one. */
function getLinkClass(propClass, globalClass, defaultClass) {
	return propClass ?? globalClass ?? defaultClass;
}
function applyTrailingSlashBehavior(to, trailingSlash) {
	if (trailingSlash !== "append" && trailingSlash !== "remove") return to;
	const normalizeFn = trailingSlash === "append" ? withTrailingSlash$1 : withoutTrailingSlash$1;
	if (hasProtocol$1(to) && !to.startsWith("http")) return to;
	return normalizeFn(to, true);
}
//#endregion
//#region node_modules/.pnpm/nuxt-site-config@5.0.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0__2pgigetnotta4www4jfdqe3lvy/node_modules/nuxt-site-config/dist/runtime/app/plugins/0.siteConfig.js
var _0_siteConfig_default = defineNuxtPlugin({
	name: "nuxt-site-config:init",
	enforce: "pre",
	async setup(nuxtApp) {
		const stack = useRequestEvent()?.context?.siteConfig;
		const state = useState("site-config");
		nuxtApp.hooks.hook("app:rendered", () => {
			state.value = stack?.get({
				debug: useRuntimeConfig()["nuxt-site-config"].debug,
				resolveRefs: true
			});
		});
		return { provide: { nuxtSiteConfig: stack } };
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/island-head.js
/**
* No-op `head.push` until the returned `unfreeze` runs. Plugin/transformer
* augmentations on the same head are unaffected.
*/
function freezeHead(head) {
	const realPush = head.push;
	head.push = () => ({
		dispose: () => {},
		patch: () => {},
		_i: 0
	});
	return () => {
		head.push = realPush;
	};
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/head/runtime/plugins/unhead.server.js
var plugin$3 = defineNuxtPlugin({
	name: "nuxt:head",
	enforce: "pre",
	setup(nuxtApp) {
		const head = nuxtApp.ssrContext.head;
		if (nuxtApp.ssrContext.islandContext) {
			const unfreeze = freezeHead(head);
			nuxtApp.hooks.hookOnce("app:created", unfreeze);
		}
		nuxtApp.vueApp.use(head);
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/pages/runtime/utils.js
var ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
var ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
var ROUTE_KEY_NORMAL_RE = /:\w+/g;
var interpolatePath = (route, match) => {
	return match.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
};
var generateRouteKey = (routeProps, override) => {
	const matchedRoute = routeProps.route.matched.find((m) => m.components?.default === routeProps.Component.type);
	const source = matchedRoute?.meta.key ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
	return typeof source === "function" ? source(routeProps.route) : source;
};
/** @since 3.9.0 */
function toArray(value) {
	return Array.isArray(value) ? value : [value];
}
Object.assign(Object.create(null), {});
var pageIslandRoutes = Object.assign(Object.create(null), {});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fmiddleware.mjs
var globalMiddleware = [defineNuxtRouteMiddleware(async (to) => {
	let __temp, __restore;
	if (!to.meta?.validate) return;
	const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
	if (result === true) return;
	return createError({
		fatal: false,
		status: result && (result.status || result.statusCode) || 404,
		statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
		data: { path: to.fullPath }
	});
}), /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {})];
var namedMiddleware = {};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froutes.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default = [
	{
		name: "blog-slug",
		path: "/blog/:slug()",
		component: () => import('../build/_slug_-BsXzEn1U.mjs')
	},
	{
		name: "projects-slug",
		path: "/projects/:slug()",
		component: () => import('../build/_slug_-VZ89i-Zd.mjs')
	},
	{
		name: "blog",
		path: "/blog",
		component: () => import('../build/blog-BvO1MeBo.mjs')
	},
	{
		name: "certifications",
		path: "/certifications",
		component: () => import('../build/certifications-Cjag05xb.mjs')
	},
	{
		name: "gallery",
		path: "/gallery",
		component: () => import('../build/gallery-DkDJ-Rut.mjs')
	},
	{
		name: "projects",
		path: "/projects",
		component: () => import('../build/projects-CXWn-3SW.mjs')
	},
	{
		name: "tech-stack",
		path: "/tech-stack",
		component: () => import('../build/tech-stack-B9tb_xD_.mjs')
	},
	{
		name: "uses",
		path: "/uses",
		component: () => import('../build/uses-3ALQwoIl.mjs')
	},
	{
		name: "index",
		path: "/",
		component: () => import('../build/pages-xOXiG7zs.mjs')
	}
];
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/pages/runtime/plugins/router.js
var plugin$2 = defineNuxtPlugin({
	name: "nuxt:router",
	enforce: "pre",
	async setup(nuxtApp) {
		let __temp, __restore;
		let routerBase = useRuntimeConfig().app.baseURL;
		const history = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.history?.(routerBase) ?? createMemoryHistory(routerBase);
		const routes = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.routes ? ([__temp, __restore] = executeAsync(() => virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.routes(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default)), __temp = await __temp, __restore(), __temp) ?? virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default : virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default;
		let startPosition;
		const router = createRouter({
			...virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default,
			scrollBehavior: (to, from, savedPosition) => {
				if (from === START_LOCATION) {
					startPosition = savedPosition;
					return;
				}
				if (virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior) {
					router.options.scrollBehavior = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior;
					if ("scrollRestoration" in (void 0).history) {
						const unsub = router.beforeEach(() => {
							unsub();
							(void 0).history.scrollRestoration = "manual";
						});
					}
					return virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
				}
			},
			history,
			routes
		});
		nuxtApp.vueApp.use(router);
		const previousRoute = shallowRef(router.currentRoute.value);
		router.afterEach((_to, from) => {
			previousRoute.value = from;
		});
		Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", { get: () => previousRoute.value });
		const initialURL = nuxtApp.ssrContext.url;
		const _route = shallowRef(router.currentRoute.value);
		const syncCurrentRoute = () => {
			_route.value = router.currentRoute.value;
		};
		router.afterEach((to, from) => {
			const lastTo = to.matched.at(-1)?.components?.default;
			const lastFrom = from.matched.at(-1)?.components?.default;
			if (lastTo === lastFrom) {
				if (generateRouteKey({
					route: to,
					Component: { type: lastTo }
				}) === generateRouteKey({
					route: from,
					Component: { type: lastFrom }
				})) syncCurrentRoute();
				return;
			}
			if (to.matched.length < from.matched.length && to.matched.every((m, i) => m.components?.default === from.matched[i]?.components?.default)) syncCurrentRoute();
		});
		const route = { sync: syncCurrentRoute };
		for (const key in _route.value) Object.defineProperty(route, key, {
			get: () => _route.value[key],
			enumerable: true
		});
		nuxtApp._route = shallowReactive(route);
		nuxtApp._middleware ||= {
			global: [],
			named: {}
		};
		const error = useError();
		const isServerPage = nuxtApp.ssrContext?.islandContext?.name?.startsWith("page_");
		if (!nuxtApp.ssrContext?.islandContext || isServerPage) router.afterEach(async (to, _from, failure) => {
			delete nuxtApp._processingMiddleware;
			delete nuxtApp._middlewareTo;
			if (failure) await nuxtApp.callHook("page:loading:end");
			if (failure?.type === 4) return;
			if (to.redirectedFrom && to.fullPath !== initialURL) await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
		});
		router.onError(async () => {
			delete nuxtApp._processingMiddleware;
			delete nuxtApp._middlewareTo;
			await nuxtApp.callHook("page:loading:end");
		});
		try {
			[__temp, __restore] = executeAsync(() => router.push(initialURL)), __temp = await __temp, __restore();
			[__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
		} catch (error) {
			[__temp, __restore] = executeAsync(() => _showErrorUnlessCrawler(nuxtApp, error)), await __temp, __restore();
		}
		const resolvedInitialRoute = router.currentRoute.value;
		syncCurrentRoute();
		if (nuxtApp.ssrContext?.islandContext && !isServerPage) return { provide: { router } };
		const initialLayout = nuxtApp.payload.state._layout;
		router.beforeEach(async (to, from) => {
			await nuxtApp.callHook("page:loading:start");
			to.meta = reactive(to.meta);
			if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) to.meta.layout = initialLayout;
			nuxtApp._processingMiddleware = true;
			nuxtApp._middlewareTo = to;
			if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
				const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
				for (const component of to.matched) {
					const componentMiddleware = component.meta.middleware;
					if (!componentMiddleware) continue;
					for (const entry of toArray(componentMiddleware)) middlewareEntries.add(entry);
				}
				const routeRules = getRouteRules({ path: to.path });
				if (routeRules.appMiddleware) for (const key in routeRules.appMiddleware) if (routeRules.appMiddleware[key]) middlewareEntries.add(key);
				else middlewareEntries.delete(key);
				for (const entry of middlewareEntries) {
					const middleware = typeof entry === "string" ? nuxtApp._middleware.named[entry] || await namedMiddleware[entry]?.().then((r) => r.default || r) : entry;
					if (!middleware) throw navigationDiagnostics.NUXT_E2004({
						entry: String(entry),
						validMiddleware: void 0
					});
					try {
						const run = () => nuxtApp.runWithContext(() => middleware(to, from));
						const result = await run();
						if (result === false || result instanceof Error) {
							const error = result || createError({
								status: 404,
								statusText: `Page Not Found: ${initialURL}`
							});
							await nuxtApp.runWithContext(() => showError(error));
							return false;
						}
						if (result === true) continue;
						if (result === false) return result;
						if (result) {
							if (isNuxtError(result) && result.fatal) await nuxtApp.runWithContext(() => showError(result));
							return result;
						}
					} catch (err) {
						const error = createError(err);
						if (error.fatal) await nuxtApp.runWithContext(() => showError(error));
						return error;
					}
				}
			}
		});
		if (isServerPage) router.beforeResolve((to) => {
			const expected = pageIslandRoutes[nuxtApp.ssrContext.islandContext.name];
			const actual = to.matched.find((m) => (m.components?.default)?.__nuxt_island)?.components?.default;
			if (!expected || expected !== actual?.__nuxt_island) {
				nuxtApp.ssrContext["~renderResponse"] = {
					statusCode: 400,
					statusMessage: "Invalid island request path"
				};
				return false;
			}
		});
		router.afterEach((to) => {
			if (to.matched.length === 0 && !error.value) return nuxtApp.runWithContext(() => showError(createError({
				status: 404,
				fatal: false,
				statusText: `Page not found: ${to.fullPath}`,
				data: { path: to.fullPath }
			})));
		});
		nuxtApp.hooks.hookOnce("app:created", async () => {
			try {
				if ("name" in resolvedInitialRoute) resolvedInitialRoute.name = void 0;
				await router.replace({
					...resolvedInitialRoute,
					force: true
				});
				router.options.scrollBehavior = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior;
			} catch (error) {
				await _showErrorUnlessCrawler(nuxtApp, error);
			}
		});
		return { provide: { router } };
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/plugins/revive-payload.server.js
var reducers = [
	["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
	["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
	["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
	["Ref", (data) => isRef(data) && data.value],
	["Reactive", (data) => isReactive(data) && toRaw(data)]
];
var plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:revive-payload:server",
	setup() {
		for (const [reducer, fn] of reducers) definePayloadReducer(reducer, fn);
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt-ai-ready@3.0.3_@nuxt+schema@4.6.1_@oxc-project+types@0.153.0_dotenv@17.4.2_giget@3.3.1_j_g4epte4mturaikmuizehd4qhtq/node_modules/nuxt-ai-ready/dist/runtime/markdown-path.js
var RE_TRAILING_SLASHES = /\/+$/;
var RE_FILE_EXTENSION = /\.[a-z][a-z\d]*$/i;
var RE_RESERVED_PATH = /^\/(?:api(?:\/|$)|_|@(?:id|fs|vite|react-refresh)(?:\/|$))/;
function isReservedPath(path) {
	return RE_RESERVED_PATH.test(path);
}
function normalizePagePath(path) {
	return path.replace(RE_TRAILING_SLASHES, "") || "/";
}
function toMarkdownPath(path) {
	const normalizedPath = normalizePagePath(path);
	if (normalizedPath === "/") return "/index.md";
	return `${normalizedPath}.md`;
}
function hasMarkdownTwin(path) {
	const lastSegment = normalizePagePath(path).split("/").pop() || "";
	return !isReservedPath(path) && !RE_FILE_EXTENSION.test(lastSegment);
}
function markdownAlternatePath(path) {
	return hasMarkdownTwin(path) ? toMarkdownPath(path) : null;
}
//#endregion
//#region node_modules/.pnpm/nuxt-ai-ready@3.0.3_@nuxt+schema@4.6.1_@oxc-project+types@0.153.0_dotenv@17.4.2_giget@3.3.1_j_g4epte4mturaikmuizehd4qhtq/node_modules/nuxt-ai-ready/dist/runtime/app/plugins/md-alternate.server.js
var md_alternate_server_default = defineNuxtPlugin({ setup() {
	const path = useRequestURL().pathname;
	const markdownPath = markdownAlternatePath(path);
	if (!markdownPath) return;
	const runtimeConfig = useRuntimeConfig();
	const describedby = runtimeConfig["nuxt-ai-ready"]?.describedby !== false;
	useHead({ link: [{
		rel: "alternate",
		type: "text/markdown",
		href: markdownPath
	}, ...describedby ? [{
		rel: "describedby",
		href: joinURL$1(runtimeConfig.app.baseURL, "llms.txt")
	}] : []] });
} });
//#endregion
//#region node_modules/.pnpm/nuxt-ai-ready@3.0.3_@nuxt+schema@4.6.1_@oxc-project+types@0.153.0_dotenv@17.4.2_giget@3.3.1_j_g4epte4mturaikmuizehd4qhtq/node_modules/nuxt-ai-ready/dist/runtime/app/plugins/md-hints.prerender.js
var md_hints_prerender_default = defineNuxtPlugin({ setup(nuxtApp) {
	return;
} });
//#endregion
//#region node_modules/.pnpm/nuxt-site-config@5.0.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0__2pgigetnotta4www4jfdqe3lvy/node_modules/nuxt-site-config/dist/runtime/app/composables/useSiteConfig.js
function useSiteConfig(options) {
	const stack = useRequestEvent()?.context.siteConfig?.get(defu({ resolveRefs: true }, options)) || reactive({});
	delete stack._priority;
	return stack;
}
//#endregion
//#region node_modules/.pnpm/nuxt-seo-utils@9.0.0_3346dbkippwa2xoym7wparulvq/node_modules/nuxt-seo-utils/dist/runtime/app/plugins/siteConfig.js
var siteConfig_default = defineNuxtPlugin(() => {
	const head = injectHead();
	if (!head) return;
	const { tagPriority, separator, titleSeparator } = useRuntimeConfig().public["seo-utils"];
	const siteConfig = useSiteConfig();
	const resolvedSeparator = siteConfig.separator || separator || siteConfig.titleSeparator || titleSeparator;
	const resolvedTitleSeparator = siteConfig.titleSeparator || titleSeparator || siteConfig.separator || separator;
	const input = {
		meta: [],
		templateParams: {
			site: siteConfig,
			siteUrl: siteConfig.url,
			siteName: siteConfig.name
		}
	};
	if (resolvedSeparator) input.templateParams.separator = resolvedSeparator;
	if (resolvedTitleSeparator) input.templateParams.titleSeparator = resolvedTitleSeparator;
	if (siteConfig.description) {
		input.templateParams.siteDescription = siteConfig.description;
		input.meta.push({
			name: "description",
			content: "%site.description",
			tagPriority
		});
	}
	head.push(input);
});
//#endregion
//#region node_modules/.pnpm/nuxt-seo-utils@9.0.0_3346dbkippwa2xoym7wparulvq/node_modules/nuxt-seo-utils/dist/runtime/app/plugins/inferSeoMetaPlugin.js
var inferSeoMetaPlugin_default = defineNuxtPlugin(() => {
	const head = injectHead();
	if (!head) return;
	const { automaticTwitterTags } = useRuntimeConfig().public["seo-utils"];
	head.use(TemplateParamsPlugin);
	if (automaticTwitterTags === false) head.use(InferSeoMetaPlugin({ twitterCard: false }));
	else head.use(InferSeoMetaPlugin());
});
//#endregion
//#region node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs
var NUMBER_CHAR_RE = /\d/;
var STR_SPLITTERS = [
	"-",
	"_",
	"/",
	"."
];
function isUppercase(char = "") {
	if (NUMBER_CHAR_RE.test(char)) return;
	return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
	const splitters = STR_SPLITTERS;
	const parts = [];
	if (!str || typeof str !== "string") return parts;
	let buff = "";
	let previousUpper;
	let previousSplitter;
	for (const char of str) {
		const isSplitter = splitters.includes(char);
		if (isSplitter === true) {
			parts.push(buff);
			buff = "";
			previousUpper = void 0;
			continue;
		}
		const isUpper = isUppercase(char);
		if (previousSplitter === false) {
			if (previousUpper === false && isUpper === true) {
				parts.push(buff);
				buff = char;
				previousUpper = isUpper;
				continue;
			}
			if (previousUpper === true && isUpper === false && buff.length > 1) {
				const lastChar = buff.at(-1);
				parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
				buff = lastChar + char;
				previousUpper = isUpper;
				continue;
			}
		}
		buff += char;
		previousUpper = isUpper;
		previousSplitter = isSplitter;
	}
	parts.push(buff);
	return parts;
}
function upperFirst(str) {
	return str ? str[0].toUpperCase() + str.slice(1) : "";
}
var titleCaseExceptions = /^(a|an|and|as|at|but|by|for|if|in|is|nor|of|on|or|the|to|with)$/i;
function titleCase(str, opts) {
	return (Array.isArray(str) ? str : splitByCase(str)).filter(Boolean).map((p) => titleCaseExceptions.test(p) ? p.toLowerCase() : upperFirst(p)).join(" ");
}
//#endregion
//#region node_modules/.pnpm/nuxt-seo-utils@9.0.0_3346dbkippwa2xoym7wparulvq/node_modules/nuxt-seo-utils/dist/runtime/app/composables/useFallbackTitle.js
function useFallbackTitle() {
	const route = useRoute$1();
	const err = useError();
	let i18n;
	try {
		i18n = useNuxtApp().$i18n;
	} catch {}
	return computed(() => {
		if (err.value?.statusCode && [404, 500].includes(err.value.statusCode)) return `${err.value.statusCode} - ${err.value.message}`;
		if (typeof route.meta?.title === "string") return route.meta?.title;
		const lastSegment = withoutTrailingSlash$1(route.path || "/").split("/").pop();
		let fallback = lastSegment ? titleCase(lastSegment) : null;
		const matched = route.matched?.at(-1);
		if (matched) {
			const routeName = String(matched.name).split("___")?.[0];
			if (routeName && i18n) fallback = i18n.t(`pages.${routeName}.title`, fallback || "", { missingWarn: false }) || fallback;
		}
		return fallback;
	});
}
//#endregion
//#region node_modules/.pnpm/nuxt-seo-utils@9.0.0_3346dbkippwa2xoym7wparulvq/node_modules/nuxt-seo-utils/dist/runtime/app/plugins/titles.js
var titles_default = defineNuxtPlugin({
	name: "nuxt-seo:fallback-titles",
	env: { islands: false },
	setup() {
		const title = useFallbackTitle();
		useHead({ title: () => title.value }, { tagPriority: 101 });
	}
});
var OG_URL_KEY = "nuxt-seo-utils:og-url";
//#endregion
//#region node_modules/.pnpm/nuxt-seo-utils@9.0.0_3346dbkippwa2xoym7wparulvq/node_modules/nuxt-seo-utils/dist/runtime/app/logic/syncDerivedTags.js
function entryOf(tag) {
	return tag._p === void 0 ? void 0 : tag._p >> 10;
}
function metaKey(tag) {
	const key = tag.props.property ?? tag.props.name;
	return typeof key === "string" ? key : void 0;
}
function isOgImage(tag) {
	return tag.tag === "meta" && metaKey(tag) === "og:image";
}
function ogImageEntryIds(entryTags) {
	const ids = /* @__PURE__ */ new Set();
	for (const tags of entryTags) {
		const tag = tags.find(isOgImage);
		const id = tag && entryOf(tag);
		if (id !== void 0) ids.add(id);
	}
	return ids;
}
function syncDerivedTags(tags, entriesWithOgImage) {
	const winningOgImageEntries = /* @__PURE__ */ new Set();
	let canonicalTag;
	for (const tag of tags) {
		if (isOgImage(tag)) winningOgImageEntries.add(entryOf(tag));
		if (!canonicalTag && tag.tag === "link" && tag.props.rel === "canonical") canonicalTag = tag;
	}
	const canonicalHref = canonicalTag?.props.href;
	const lostOgImage = (tag) => {
		const entry = entryOf(tag);
		return entry !== void 0 && entriesWithOgImage.has(entry) && !winningOgImageEntries.has(entry);
	};
	const result = [];
	for (const tag of tags) {
		if (tag.tag === "meta") {
			if (metaKey(tag)?.startsWith("og:image:") && lostOgImage(tag)) continue;
			if (tag.key?.startsWith("nuxt-seo-utils:twitter-image-fallback") && lostOgImage(tag)) continue;
			if (tag.key === "nuxt-seo-utils:og-url") {
				if (typeof canonicalHref !== "string" || !canonicalHref) continue;
				result.push({
					...tag,
					props: {
						...tag.props,
						content: canonicalHref
					}
				});
				continue;
			}
		}
		result.push(tag);
	}
	return result;
}
//#endregion
//#region node_modules/.pnpm/nuxt-seo-utils@9.0.0_3346dbkippwa2xoym7wparulvq/node_modules/nuxt-seo-utils/dist/runtime/app/plugins/derivedTags.js
var derivedTags_default = defineNuxtPlugin({
	name: "nuxt-seo:derived-tags",
	setup() {
		const head = injectHead();
		head.use({
			key: "nuxt-seo-utils:derived-tags",
			hooks: { "tags:beforeResolve": (ctx) => {
				const entryTags = [...head.entries.values()].map((entry) => entry._tags || entry._precomputedTags || []);
				ctx.tags = syncDerivedTags(ctx.tags, ogImageEntryIds(entryTags));
			} }
		});
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt-schema-org@7.0.1_nhdt7xh7knmsj3xcdubcwoybdy/node_modules/nuxt-schema-org/dist/vendor/schema-org-v3/shared/schema-org.B7dF02JN.mjs
// @__NO_SIDE_EFFECTS__
function defineSchemaOrgResolver(schema) {
	return schema;
}
var PROTOCOL_RE = /^[\s\w\0+.-]{2,}:(?:[/\\]{2})?/;
var JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(input) {
	return PROTOCOL_RE.test(input);
}
function withoutTrailingSlash(input = "") {
	return (input.endsWith("/") ? input.slice(0, -1) : input) || "/";
}
function withTrailingSlash(input = "") {
	return input.endsWith("/") ? input : `${input}/`;
}
function joinURL(base, input) {
	if (!input || input === "/") return base || "";
	return base ? withTrailingSlash(base) + input.replace(JOIN_LEADING_SLASH_RE, "") : input;
}
function withBase(input, base) {
	if (!base || base === "/" || hasProtocol(input)) return input;
	const normalizedBase = withoutTrailingSlash(base);
	if (input.startsWith(normalizedBase)) {
		const nextChar = input[normalizedBase.length];
		if (!nextChar || nextChar === "/" || nextChar === "?") return input;
	}
	return joinURL(normalizedBase, input);
}
function idReference(node) {
	return { "@id": typeof node !== "string" ? node["@id"] : node };
}
var IS_VALID_W3C_DATE = [
	/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
	/^\d{4}-[01]\d-[0-3]\d$/,
	/^\d{4}-[01]\d$/,
	/^\d{4}$/
];
function isValidW3CDate(d) {
	return IS_VALID_W3C_DATE.some((r) => r.test(d));
}
function resolvableDateToIso(val) {
	if (!val) return val;
	try {
		if (val instanceof Date) return val.toISOString();
		else if (isValidW3CDate(val)) return val;
		else return new Date(Date.parse(val)).toISOString();
	} catch {}
	return typeof val === "string" ? val : val.toString();
}
var IdentityId = "#identity";
function isHomePage(meta) {
	return meta.path === "/";
}
function setIfEmpty(node, field, value) {
	if (node?.[field] === void 0 && value != null) node[field] = value;
}
function asArray(input) {
	return Array.isArray(input) ? input : [input];
}
function prefixId(url, id) {
	if (hasProtocol(id)) return id;
	if (!id.includes("#")) id = `#${id}`;
	return `${url || ""}${id}`;
}
function resolveDefaultType(node, defaultType) {
	const val = node["@type"];
	if (val === defaultType) return;
	if (typeof val === "string" && typeof defaultType === "string") {
		if (val !== defaultType) node["@type"] = [defaultType, val];
		return;
	}
	const types = new Set(asArray(defaultType));
	for (const t of asArray(val)) if (t != null) types.add(t);
	const resolved = [...types];
	node["@type"] = resolved.length === 1 ? resolved[0] : resolved;
}
function resolveWithBase(base, urlOrPath) {
	if (!base || !urlOrPath || hasProtocol(urlOrPath) || urlOrPath[0] !== "/" && urlOrPath[0] !== "#") return urlOrPath;
	return withBase(urlOrPath, base);
}
function resolveAsGraphKey(key) {
	if (!key) return key;
	return key.substring(key.lastIndexOf("#"));
}
function stripEmptyProperties(obj) {
	for (const k in obj) {
		if (!hasOwn(obj, k)) continue;
		const v = obj[k];
		if (v === "" || v === void 0) delete obj[k];
		else if (typeof v === "object" && v !== null) {
			if (v.__v_isReadonly || v.__v_isRef) continue;
			stripEmptyProperties(v);
		}
	}
	return obj;
}
function stripNullProperties(obj) {
	if (Array.isArray(obj)) {
		let next = 0;
		for (let i = 0; i < obj.length; i++) {
			const v = obj[i];
			if (v === null) continue;
			if (typeof v === "object" && v !== null) stripNullProperties(v);
			obj[next++] = v;
		}
		obj.length = next;
		return obj;
	}
	for (const k in obj) {
		if (!hasOwn(obj, k)) continue;
		const v = obj[k];
		if (v === null) delete obj[k];
		else if (typeof v === "object") {
			if (v.__v_isReadonly || v.__v_isRef) continue;
			stripNullProperties(v);
		}
	}
	return obj;
}
var interactionCounterResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "InteractionCounter" } });
var propertyValueResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "PropertyValue" } });
var definedRegionResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "DefinedRegion" } });
var quantitativeValueResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	cast(node) {
		if (typeof node === "number") return { value: node };
		return node;
	},
	defaults: { "@type": "QuantitativeValue" },
	resolve(node, ctx) {
		node.valueReference = resolveRelation(node.valueReference, ctx, quantitativeValueResolver);
		return node;
	}
});
var monetaryAmountResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "MonetaryAmount" },
	resolve(node, ctx) {
		if (typeof node.value === "object") node.value = resolveRelation(node.value, ctx, quantitativeValueResolver);
		return node;
	}
});
var merchantReturnPolicyResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "MerchantReturnPolicy" },
	resolve(node, ctx) {
		if (node.returnPolicyCategory) node.returnPolicyCategory = withBase(node.returnPolicyCategory, "https://schema.org/");
		if (node.returnFees) node.returnFees = withBase(node.returnFees, "https://schema.org/");
		if (node.returnMethod) node.returnMethod = withBase(node.returnMethod, "https://schema.org/");
		node.returnShippingFeesAmount = resolveRelation(node.returnShippingFeesAmount, ctx, monetaryAmountResolver);
		return node;
	}
});
var unitPriceSpecificationResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "UnitPriceSpecification" },
	resolve(node, ctx) {
		if (node.price !== void 0) setIfEmpty(node, "priceCurrency", ctx.meta.currency);
		if (node.priceType) node.priceType = withBase(node.priceType, "https://schema.org/");
		node.referenceQuantity = resolveRelation(node.referenceQuantity, ctx, quantitativeValueResolver);
		node.validForMemberTier = resolveRelation(node.validForMemberTier, ctx, memberProgramTierResolver);
		node.validFrom = resolvableDateToIso(node.validFrom);
		node.validThrough = resolvableDateToIso(node.validThrough);
		return node;
	}
});
var addressResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "PostalAddress" } });
var listItemResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	cast(node) {
		if (typeof node === "string") node = { name: node };
		return node;
	},
	defaults: { "@type": "ListItem" },
	resolve(node, ctx) {
		if (typeof node.item === "string") node.item = resolveWithBase(ctx.meta.host, node.item);
		else if (typeof node.item === "object") node.item = resolveRelation(node.item, ctx);
		if (node.url) node.url = resolveWithBase(ctx.meta.host, node.url);
		return node;
	}
});
var PrimaryBreadcrumbId = "#breadcrumb";
var breadcrumbResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "BreadcrumbList" },
	idPrefix: ["url", PrimaryBreadcrumbId],
	resolve(breadcrumb, ctx) {
		if (breadcrumb.itemListElement) {
			let index = 1;
			breadcrumb.itemListElement = resolveRelation(breadcrumb.itemListElement, ctx, listItemResolver, {
				array: true,
				afterResolve(node) {
					setIfEmpty(node, "position", index++);
				}
			});
		}
		return breadcrumb;
	},
	resolveRootNode(node, { find }) {
		const webPage = find(PrimaryWebPageId);
		if (webPage) setIfEmpty(webPage, "breadcrumb", idReference(node));
	}
});
var clipResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "Clip" },
	resolve(node, ctx) {
		node.url = resolveWithBase(ctx.meta.host, node.url);
		return node;
	}
});
var broadcastEventResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "BroadcastEvent" },
	resolve(node) {
		node.startDate = resolvableDateToIso(node.startDate);
		node.endDate = resolvableDateToIso(node.endDate);
		return node;
	}
});
var seekToActionResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "SeekToAction" },
	resolve(node, ctx) {
		node.target = resolveWithBase(ctx.meta.host, node.target);
		return node;
	}
});
var videoResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	cast(input) {
		if (typeof input === "string") input = { url: input };
		return input;
	},
	alias: "video",
	defaults: { "@type": "VideoObject" },
	inheritMeta: [
		{
			meta: "title",
			key: "name"
		},
		"description",
		"image",
		"inLanguage",
		{
			meta: "datePublished",
			key: "uploadDate"
		}
	],
	idPrefix: "host",
	resolve(video, ctx) {
		if (video.uploadDate) video.uploadDate = resolvableDateToIso(video.uploadDate);
		video.expires = resolvableDateToIso(video.expires);
		if (video.url) video.url = resolveWithBase(ctx.meta.host, video.url);
		if (video.contentUrl) video.contentUrl = resolveWithBase(ctx.meta.host, video.contentUrl);
		if (video.embedUrl) video.embedUrl = resolveWithBase(ctx.meta.host, video.embedUrl);
		if (video.caption && !video.description) video.description = video.caption;
		if (!video.description) video.description = "No description";
		if (video.thumbnailUrl && (typeof video.thumbnailUrl === "string" || Array.isArray(video.thumbnailUrl))) {
			const images = asArray(video.thumbnailUrl).map((image) => resolveWithBase(ctx.meta.host, image));
			video.thumbnailUrl = images.length > 1 ? images : images[0];
		}
		if (video.thumbnail) video.thumbnail = resolveRelation(video.thumbnail, ctx, imageResolver);
		video.hasPart = resolveRelation(video.hasPart, ctx, clipResolver);
		video.interactionStatistic = resolveRelation(video.interactionStatistic, ctx, interactionCounterResolver);
		video.potentialAction = resolveRelation(video.potentialAction, ctx, seekToActionResolver);
		video.publication = resolveRelation(video.publication, ctx, broadcastEventResolver);
		return video;
	},
	resolveRootNode(video, { find, meta }) {
		if (video.image && !video.thumbnailUrl) {
			const firstImage = asArray(video.image)[0];
			if (typeof firstImage === "string") setIfEmpty(video, "thumbnailUrl", resolveWithBase(meta.host, firstImage));
			else if (firstImage?.["@id"]) setIfEmpty(video, "thumbnailUrl", find(firstImage["@id"], isImageObject)?.url);
		}
	}
});
var PrimaryArticleId = "#article";
var searchActionResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: {
		"@type": "SearchAction",
		"target": { "@type": "EntryPoint" },
		"query-input": {
			"@type": "PropertyValueSpecification",
			"valueRequired": true,
			"valueName": "search_term_string"
		}
	},
	resolve(node, ctx) {
		if (typeof node.target === "string") node.target = {
			"@type": "EntryPoint",
			"urlTemplate": resolveWithBase(ctx.meta.host, node.target)
		};
		return node;
	}
});
var PrimaryWebSiteId = "#website";
var webSiteResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "WebSite" },
	inheritMeta: ["inLanguage", {
		meta: "host",
		key: "url"
	}],
	idPrefix: ["host", PrimaryWebSiteId],
	resolve(node, ctx) {
		node.potentialAction = resolveRelation(node.potentialAction, ctx, searchActionResolver, { array: true });
		node.publisher = resolveRelation(node.publisher, ctx);
		node.dateModified = resolvableDateToIso(node.dateModified);
		node.datePublished = resolvableDateToIso(node.datePublished);
		return node;
	},
	resolveRootNode(node, { find }) {
		if (resolveAsGraphKey(node["@id"]) === "#website") {
			const identity = find(IdentityId);
			if (identity) setIfEmpty(node, "publisher", idReference(identity));
			const webPage = find(PrimaryWebPageId);
			if (webPage) setIfEmpty(webPage, "isPartOf", idReference(node));
		}
		return node;
	}
});
var personResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	cast(node) {
		if (typeof node === "string") return { name: node };
		return node;
	},
	defaults: { "@type": "Person" },
	idPrefix: ["host", IdentityId],
	resolve(node, ctx) {
		if (node.identifier) {
			const resolveIdentifier = (identifier) => typeof identifier === "string" ? identifier : resolveRelation(identifier, ctx, propertyValueResolver);
			node.identifier = Array.isArray(node.identifier) ? node.identifier.map(resolveIdentifier) : resolveIdentifier(node.identifier);
		}
		node.agentInteractionStatistic = resolveRelation(node.agentInteractionStatistic, ctx, interactionCounterResolver);
		node.interactionStatistic = resolveRelation(node.interactionStatistic, ctx, interactionCounterResolver);
		if (node.url) node.url = resolveWithBase(ctx.meta.host, node.url);
		return node;
	},
	resolveRootNode(node, { find, meta }) {
		if (resolveAsGraphKey(node["@id"]) === IdentityId) {
			setIfEmpty(node, "url", meta.host);
			const webPage = find(PrimaryWebPageId);
			if (webPage && isHomePage(meta)) setIfEmpty(webPage, "about", idReference(node));
			const webSite = find(PrimaryWebSiteId);
			if (webSite) setIfEmpty(webSite, "publisher", idReference(node));
		}
		const article = find(PrimaryArticleId);
		if (article) setIfEmpty(article, "author", idReference(node));
	}
});
var readActionResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "ReadAction" },
	resolve(node, ctx) {
		node.target ||= [];
		if (!node.target.includes(ctx.meta.url)) node.target.unshift(ctx.meta.url);
		return node;
	}
});
var speakableSpecificationResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "SpeakableSpecification" } });
var webPageElementResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "WebPageElement" } });
var PrimaryWebPageId = "#webpage";
var webPageResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults({ meta }) {
		const endPath = withoutTrailingSlash(meta.path.substring(meta.path.lastIndexOf("/") + 1));
		let type = "WebPage";
		switch (endPath) {
			case "about":
			case "about-us":
				type = "AboutPage";
				break;
			case "search":
				type = "SearchResultsPage";
				break;
			case "checkout":
				type = "CheckoutPage";
				break;
			case "contact":
			case "get-in-touch":
			case "contact-us":
				type = "ContactPage";
				break;
			case "faq": type = "FAQPage";
		}
		return { "@type": type };
	},
	idPrefix: ["url", PrimaryWebPageId],
	inheritMeta: [
		{
			meta: "title",
			key: "name"
		},
		"description",
		"datePublished",
		"dateModified",
		"url"
	],
	resolve(node, ctx) {
		node.dateCreated = resolvableDateToIso(node.dateCreated);
		node.dateModified = resolvableDateToIso(node.dateModified);
		node.datePublished = resolvableDateToIso(node.datePublished);
		resolveDefaultType(node, "WebPage");
		node.about = resolveRelation(node.about, ctx, organizationResolver);
		node.breadcrumb = resolveRelation(node.breadcrumb, ctx, breadcrumbResolver);
		node.author = resolveRelation(node.author, ctx, personResolver);
		if (node.hasPart) {
			const resolvePart = (part) => {
				return typeof part === "object" && part !== null && (part["@type"] === "WebPageElement" || "cssSelector" in part) ? resolveRelation(part, ctx, webPageElementResolver) : resolveRelation(part, ctx);
			};
			node.hasPart = Array.isArray(node.hasPart) ? node.hasPart.map(resolvePart) : resolvePart(node.hasPart);
		}
		if (node.primaryImageOfPage === false) node.primaryImageOfPage = null;
		node.primaryImageOfPage = resolveRelation(node.primaryImageOfPage, ctx, imageResolver);
		node.speakable = resolveRelation(node.speakable, ctx, speakableSpecificationResolver);
		node.video = resolveRelation(node.video, ctx, videoResolver);
		if (Array.isArray(node["@type"]) && node["@type"].includes("ProfilePage")) node.mainEntity = resolveIdentityRelation(node.mainEntity, ctx, {
			organization: organizationResolver,
			person: personResolver
		}, { root: true });
		if (node.potentialAction) {
			const resolveAction = (action) => {
				if (!action || typeof action !== "object") return action;
				const type = action["@type"];
				return type === "ReadAction" || Array.isArray(type) && type.includes("ReadAction") || "target" in action ? resolveRelation(action, ctx, readActionResolver) : resolveRelation(action, ctx);
			};
			node.potentialAction = Array.isArray(node.potentialAction) ? node.potentialAction.map(resolveAction) : resolveAction(node.potentialAction);
		}
		if (node["@type"] === "WebPage" && ctx.meta.url) setIfEmpty(node, "potentialAction", [{
			"@type": "ReadAction",
			"target": [ctx.meta.url]
		}]);
		return node;
	},
	resolveRootNode(webPage, { find, meta }) {
		const identity = find(IdentityId);
		const webSite = find(PrimaryWebSiteId);
		const logo = find("#logo");
		if (identity && isHomePage(meta)) setIfEmpty(webPage, "about", idReference(identity));
		if (logo) setIfEmpty(webPage, "primaryImageOfPage", idReference(logo));
		if (webSite) setIfEmpty(webPage, "isPartOf", idReference(webSite));
		const breadcrumb = find(PrimaryBreadcrumbId);
		if (breadcrumb) setIfEmpty(webPage, "breadcrumb", idReference(breadcrumb));
		return webPage;
	}
});
var contactPointResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "ContactPoint" } });
var creditCardResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "CreditCard" } });
var memberProgramTierResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "MemberProgramTier" },
	resolve(node, ctx) {
		node.hasTierBenefit = Array.isArray(node.hasTierBenefit) ? node.hasTierBenefit.map((benefit) => withBase(benefit, "https://schema.org/")) : withBase(node.hasTierBenefit, "https://schema.org/");
		if (node.hasTierRequirement) {
			const requirement = node.hasTierRequirement;
			if (typeof requirement === "object") {
				const types = asArray(requirement["@type"]);
				if (types.includes("CreditCard")) node.hasTierRequirement = resolveRelation(requirement, ctx, creditCardResolver);
				else if (types.includes("MonetaryAmount") || "currency" in requirement) node.hasTierRequirement = resolveRelation(requirement, ctx, monetaryAmountResolver);
				else node.hasTierRequirement = resolveRelation(requirement, ctx, unitPriceSpecificationResolver);
			}
		}
		node.isTierOf = resolveRelation(node.isTierOf, ctx, memberProgramResolver);
		node.membershipPointsEarned = resolveRelation(node.membershipPointsEarned, ctx, quantitativeValueResolver);
		if (node.url) node.url = resolveWithBase(ctx.meta.host, node.url);
		return node;
	}
});
var memberProgramResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "MemberProgram" },
	resolve(node, ctx) {
		node.hasTiers = resolveRelation(node.hasTiers, ctx, memberProgramTierResolver);
		if (node.url) node.url = resolveWithBase(ctx.meta.host, node.url);
		return node;
	}
});
var servicePeriodResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "ServicePeriod" },
	resolve(node, ctx) {
		node.duration = resolveRelation(node.duration, ctx, quantitativeValueResolver);
		return node;
	}
});
var shippingRateSettingsResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "ShippingRateSettings" } });
var shippingSeasonalOverrideResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "OpeningHoursSpecification" },
	resolve(node) {
		node.validFrom = resolvableDateToIso(node.validFrom);
		node.validThrough = resolvableDateToIso(node.validThrough);
		return node;
	}
});
var shippingConditionsResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "ShippingConditions" },
	resolve(node, ctx) {
		node.numItems = resolveRelation(node.numItems, ctx, quantitativeValueResolver);
		node.orderValue = resolveRelation(node.orderValue, ctx, monetaryAmountResolver);
		node.seasonalOverride = resolveRelation(node.seasonalOverride, ctx, shippingSeasonalOverrideResolver);
		node.shippingDestination = resolveRelation(node.shippingDestination, ctx, definedRegionResolver);
		node.shippingOrigin = resolveRelation(node.shippingOrigin, ctx, definedRegionResolver);
		if (node.shippingRate) node.shippingRate = typeof node.shippingRate === "object" && ("orderPercentage" in node.shippingRate || "weightPercentage" in node.shippingRate) ? resolveRelation(node.shippingRate, ctx, shippingRateSettingsResolver) : resolveRelation(node.shippingRate, ctx, monetaryAmountResolver);
		node.transitTime = resolveRelation(node.transitTime, ctx, servicePeriodResolver);
		node.weight = resolveRelation(node.weight, ctx, quantitativeValueResolver);
		return node;
	}
});
var shippingServiceResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "ShippingService" },
	resolve(node, ctx) {
		if (node.fulfillmentType) node.fulfillmentType = withBase(node.fulfillmentType, "https://schema.org/");
		node.handlingTime = resolveRelation(node.handlingTime, ctx, servicePeriodResolver);
		node.shippingConditions = resolveRelation(node.shippingConditions, ctx, shippingConditionsResolver);
		node.validForMemberTier = resolveRelation(node.validForMemberTier, ctx, memberProgramTierResolver);
		return node;
	}
});
var organizationResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	cast(node) {
		if (typeof node === "string") return { name: node };
		return node;
	},
	defaults: { "@type": "Organization" },
	idPrefix: ["host", IdentityId],
	inheritMeta: [{
		meta: "host",
		key: "url"
	}],
	resolve(node, ctx) {
		resolveDefaultType(node, "Organization");
		node.address = resolveRelation(node.address, ctx, addressResolver);
		node.agentInteractionStatistic = resolveRelation(node.agentInteractionStatistic, ctx, interactionCounterResolver);
		node.contactPoint = resolveRelation(node.contactPoint, ctx, contactPointResolver);
		node.hasMemberProgram = resolveRelation(node.hasMemberProgram, ctx, memberProgramResolver);
		node.hasMerchantReturnPolicy = resolveRelation(node.hasMerchantReturnPolicy, ctx, merchantReturnPolicyResolver);
		node.hasShippingService = resolveRelation(node.hasShippingService, ctx, shippingServiceResolver);
		if (node.identifier) {
			const resolveIdentifier = (identifier) => typeof identifier === "string" ? identifier : resolveRelation(identifier, ctx, propertyValueResolver);
			node.identifier = Array.isArray(node.identifier) ? node.identifier.map(resolveIdentifier) : resolveIdentifier(node.identifier);
		}
		node.interactionStatistic = resolveRelation(node.interactionStatistic, ctx, interactionCounterResolver);
		node.numberOfEmployees = resolveRelation(node.numberOfEmployees, ctx, quantitativeValueResolver);
		if (node.url) node.url = resolveWithBase(ctx.meta.host, node.url);
		return node;
	},
	resolveRootNode(node, ctx) {
		const isIdentity = resolveAsGraphKey(node["@id"]) === IdentityId;
		const webPage = ctx.find(PrimaryWebPageId);
		if (node.logo && isIdentity) {
			const logoNode = resolveRelation(Array.isArray(node.logo) ? node.logo[0] : node.logo, ctx, imageResolver, {
				root: true,
				afterResolve(logo) {
					logo["@id"] = prefixId(ctx.meta.host, "#logo");
					setIfEmpty(logo, "caption", node.name);
				}
			});
			if (webPage && logoNode) setIfEmpty(webPage, "primaryImageOfPage", idReference(logoNode));
			if (node["@type"] === "Organization") node.logo = logoNode;
			else if (!ctx.find("#organization")) {
				const resolvedLogo = logoNode && typeof logoNode === "object" && logoNode["@id"] ? ctx.find(logoNode["@id"], isImageObject) : null;
				ctx.nodes.push({
					"@type": "Organization",
					"name": node.name,
					"url": node.url,
					"sameAs": node.sameAs,
					"address": node.address,
					"logo": resolvedLogo?.url,
					"_priority": -1,
					"@id": prefixId(ctx.meta.host, "#organization")
				});
			}
			if (node["@type"] !== "Organization") delete node.logo;
		}
		if (isIdentity && webPage && isHomePage(ctx.meta)) setIfEmpty(webPage, "about", idReference(node));
		const webSite = ctx.find(PrimaryWebSiteId);
		if (webSite) setIfEmpty(webSite, "publisher", idReference(node));
	}
});
function isImageObject(node) {
	return typeof node.url === "string" || typeof node.contentUrl === "string";
}
var imageResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	alias: "image",
	cast(input) {
		if (typeof input === "string") input = { url: input };
		return input;
	},
	defaults: { "@type": "ImageObject" },
	inheritMeta: ["inLanguage"],
	idPrefix: "host",
	resolve(image, ctx) {
		const { meta } = ctx;
		if (image.url) image.url = resolveWithBase(meta.host, image.url);
		if (image.contentUrl) image.contentUrl = resolveWithBase(meta.host, image.contentUrl);
		setIfEmpty(image, "contentUrl", image.url);
		setIfEmpty(image, "url", image.contentUrl);
		image.creator = resolveIdentityRelation(image.creator, ctx, {
			organization: organizationResolver,
			person: personResolver
		}, { root: true });
		if (image.license) image.license = resolveWithBase(meta.host, image.license);
		if (image.acquireLicensePage) image.acquireLicensePage = resolveWithBase(meta.host, image.acquireLicensePage);
		if (image.height && !image.width) delete image.height;
		if (image.width && !image.height) delete image.width;
		return image;
	}
});
var ALIAS_RE = /([a-z])([A-Z])/g;
function nextNodeId(ctx, alias) {
	ctx.nodeIdCounters[alias] = (ctx.nodeIdCounters[alias] || 0) + 1;
	return ctx.nodeIdCounters[alias].toString();
}
var ABSOLUTE_URL_RE = /^https?:\/\//i;
var QUERY_RE = /[?#]/;
var HASH_RE = /#/;
var TRAILING_SLASHES_RE = /\/+$/;
function parseAbsoluteUrl(url) {
	if (!ABSOLUTE_URL_RE.test(url)) return void 0;
	try {
		return new URL(url);
	} catch {
		return;
	}
}
function parseMetaUrl(input, host) {
	const url = input.split(HASH_RE, 1)[0];
	if (url.startsWith("/") && !url.startsWith("//")) return {
		url: host ? joinURL(host, url) : url,
		path: url.split(QUERY_RE, 1)[0]
	};
	const parsed = parseAbsoluteUrl(url);
	if (!parsed) return void 0;
	const hostUrl = host ? parseAbsoluteUrl(host) : void 0;
	if (!hostUrl) return {
		url,
		path: parsed.pathname
	};
	const basePath = hostUrl.pathname.replace(TRAILING_SLASHES_RE, "");
	if (hostUrl.origin === parsed.origin && (parsed.pathname === basePath || parsed.pathname.startsWith(`${basePath}/`))) return {
		url,
		path: parsed.pathname.slice(basePath.length) || "/"
	};
	return { url };
}
function resolveMeta(meta) {
	const explicit = meta.url ? parseMetaUrl(meta.url, meta.host) : void 0;
	if (explicit?.path && !meta.host && ABSOLUTE_URL_RE.test(explicit.url)) meta.host = new URL(explicit.url).origin;
	if (explicit?.path) meta.path = explicit.path;
	if (!meta.path) meta.path = "/";
	if (!meta.host && false);
	if (meta.path !== "/") {
		if (meta.trailingSlash && !meta.path.endsWith("/")) meta.path = withTrailingSlash(meta.path);
		else if (!meta.trailingSlash && meta.path.endsWith("/")) meta.path = withoutTrailingSlash(meta.path);
	}
	const siteUrl = joinURL(meta.host || "", meta.path);
	const resolved = meta;
	resolved.url = explicit?.url || siteUrl;
	resolved.idUrl = explicit?.path ? explicit.url : siteUrl;
	return resolved;
}
function resolveNode(node, ctx, resolver) {
	if (resolver?.cast) node = resolver.cast(node, ctx);
	if (resolver?.defaults) {
		let defaults = resolver.defaults;
		if (typeof defaults === "function") defaults = defaults(ctx);
		node = {
			...defaults,
			...node
		};
	}
	const inheritMeta = resolver?.inheritMeta;
	if (inheritMeta) for (let i = 0; i < inheritMeta.length; i++) {
		const entry = inheritMeta[i];
		if (typeof entry === "string") setIfEmpty(node, entry, ctx.meta[entry]);
		else setIfEmpty(node, entry.key, ctx.meta[entry.meta]);
	}
	if (resolver?.resolve) node = resolver.resolve(node, ctx);
	for (const k in node) {
		const v = node[k];
		if (Array.isArray(v)) for (let i = 0; i < v.length; i++) {
			const item = v[i];
			if (typeof item === "object" && item?._resolver) node[k][i] = resolveRelation(item, ctx, item._resolver);
		}
		else if (typeof v === "object" && v?._resolver) node[k] = resolveRelation(v, ctx, v._resolver);
	}
	stripEmptyProperties(node);
	return node;
}
function idBase(ctx, prefix) {
	return prefix === "url" ? ctx.meta.idUrl : ctx.meta.host;
}
function resolveNodeId(node, ctx, resolver, resolveAsRoot = false) {
	if (node["@id"] && node["@id"].startsWith("http")) return node;
	const prefix = resolver ? (Array.isArray(resolver.idPrefix) ? resolver.idPrefix[0] : resolver.idPrefix) || "url" : "url";
	const rootId = node["@id"] || (resolver ? Array.isArray(resolver.idPrefix) ? resolver.idPrefix?.[1] : void 0 : "");
	if (!node["@id"] && resolveAsRoot && rootId) {
		node["@id"] = prefixId(idBase(ctx, prefix), rootId);
		return node;
	}
	if (node["@id"]?.startsWith("#/schema/") || node["@id"]?.startsWith("/")) {
		node["@id"] = prefixId(idBase(ctx, prefix), node["@id"]);
		return node;
	}
	let alias = resolver?.alias;
	if (!alias) alias = (asArray(node["@type"])?.[0] || "").replace(ALIAS_RE, "$1-$2").toLowerCase();
	node["@id"] = prefixId(idBase(ctx, prefix), `#/schema/${alias}/${node["@id"] || nextNodeId(ctx, alias)}`);
	return node;
}
function resolveRelation(input, ctx, fallbackResolver, options = {}) {
	if (!input) return input;
	const items = asArray(input);
	const ids = [];
	for (let i = 0; i < items.length; i++) {
		const a = items[i];
		if (!a) {
			ids.push(a);
			continue;
		}
		let keyCount = 0;
		for (const _ in a) keyCount++;
		if (keyCount === 1 && a["@id"] || keyCount === 2 && a["@id"] && a["@type"]) {
			ids.push(resolveNodeId({ "@id": ctx.find(a["@id"])?.["@id"] || a["@id"] }, ctx));
			continue;
		}
		let resolver = fallbackResolver;
		if (a._resolver && typeof a._resolver !== "string") {
			resolver = a._resolver;
			delete a._resolver;
		}
		if (!resolver) {
			ids.push(a);
			continue;
		}
		let node = resolveNode(a, ctx, resolver);
		if (options.afterResolve) options.afterResolve(node);
		if (options.generateId || options.root) node = resolveNodeId(node, ctx, resolver, false);
		if (options.root) {
			if (resolver.resolveRootNode) resolver.resolveRootNode(node, ctx);
			ctx.push(node);
			ids.push(idReference(node["@id"]));
			continue;
		}
		ids.push(node);
	}
	return !options.array && ids.length === 1 ? ids[0] : ids;
}
function merge(target, source) {
	if (!source) return target;
	for (const key in source) {
		if (!hasOwn(source, key) || key === "__proto__" || key === "constructor" || key === "prototype") continue;
		const value = source[key];
		if (value === void 0) continue;
		if (Array.isArray(target[key])) {
			if (Array.isArray(value)) {
				const merged = [...target[key], ...value];
				if (key === "@type") target[key] = [...new Set(merged)];
				else if (key === "itemListElement") {
					merged.sort((a, b) => (a.position || 0) - (b.position || 0));
					for (let i = 0; i < merged.length; i++) merged[i].position = i + 1;
					target[key] = merged;
				} else if (key === "potentialAction") {
					const byType = /* @__PURE__ */ Object.create(null);
					for (const action of merged) {
						const type = action["@type"];
						if (byType[type]) {
							if (action.target && byType[type].target) {
								const a = Array.isArray(byType[type].target) ? byType[type].target : [byType[type].target];
								const b = Array.isArray(action.target) ? action.target : [action.target];
								byType[type].target = [.../* @__PURE__ */ new Set([...a, ...b])];
							}
						} else byType[type] = { ...action };
					}
					target[key] = Object.values(byType);
				} else if (merged.length > 0 && merged.every((item) => item && typeof item === "object" && item["@type"])) {
					const byType = /* @__PURE__ */ Object.create(null);
					for (const item of merged) byType[item["@type"]] = item;
					target[key] = Object.values(byType);
				} else target[key] = merged;
			} else target[key] = merge(target[key], [value]);
		} else if (target[key] && typeof target[key] === "object" && typeof value === "object" && !Array.isArray(value)) target[key] = merge({ ...target[key] }, value);
		else target[key] = value;
	}
	return target;
}
var DOMAIN_RE = /(?:https?:)?\/\//;
function indexNode(index, node) {
	if (!node["@id"]) return;
	const nodeId = node["@id"];
	const fragmentKey = resolveAsGraphKey(nodeId);
	index.set(fragmentKey, node);
	index.set(nodeId, node);
	const domainKey = nodeId.replace(DOMAIN_RE, "").split("/")[0];
	index.set(domainKey, node);
}
function createSchemaOrgGraph() {
	let ctx;
	function find(id, guard) {
		const matchFragment = id[0] === "#";
		const matchDomain = id[0] === "/" && id[1] === "/";
		const key = matchFragment ? resolveAsGraphKey(id) : matchDomain ? id.replace(DOMAIN_RE, "").split("/")[0] : id;
		let node = ctx.nodeIndex.size > 0 ? ctx.nodeIndex.get(key) : void 0;
		if (!node) for (let i = 0; i < ctx.nodes.length; i++) {
			const candidate = ctx.nodes[i];
			const nodeId = candidate["@id"];
			if (!nodeId) continue;
			if ((matchFragment ? resolveAsGraphKey(nodeId) : matchDomain ? nodeId.replace(DOMAIN_RE, "").split("/")[0] : nodeId) === key) {
				node = candidate;
				break;
			}
		}
		if (!node || guard && !guard(node)) return null;
		return node;
	}
	ctx = {
		find,
		push(input) {
			if (Array.isArray(input)) for (let i = 0; i < input.length; i++) {
				const registeredNode = input[i];
				ctx.nodes.push(registeredNode);
				if (ctx.nodeIndex.size > 0) indexNode(ctx.nodeIndex, registeredNode);
			}
			else {
				const registeredNode = input;
				ctx.nodes.push(registeredNode);
				if (ctx.nodeIndex.size > 0) indexNode(ctx.nodeIndex, registeredNode);
			}
		},
		resolveGraph(meta) {
			for (const k in ctx.nodeIdCounters) delete ctx.nodeIdCounters[k];
			ctx.meta = resolveMeta({ ...meta });
			const len = ctx.nodes.length;
			for (let i = 0; i < len; i++) {
				let node = ctx.nodes[i];
				const resolver = node._resolver;
				node = resolveNode(node, ctx, resolver);
				node = resolveNodeId(node, ctx, resolver, true);
				ctx.nodes[i] = node;
			}
			const dedupedNodes = /* @__PURE__ */ Object.create(null);
			let hasDuplicates = false;
			ctx.nodeIndex.clear();
			for (let i = 0; i < ctx.nodes.length; i++) {
				const n = ctx.nodes[i];
				const nodeKey = resolveAsGraphKey(n["@id"]);
				if (dedupedNodes[nodeKey]) {
					hasDuplicates = true;
					if (n._dedupeStrategy !== "replace") dedupedNodes[nodeKey] = merge(dedupedNodes[nodeKey], n);
					else dedupedNodes[nodeKey] = n;
				} else dedupedNodes[nodeKey] = n;
			}
			if (hasDuplicates) ctx.nodes = Object.values(dedupedNodes);
			for (let i = 0; i < ctx.nodes.length; i++) indexNode(ctx.nodeIndex, ctx.nodes[i]);
			const countBeforeRelations = ctx.nodes.length;
			for (let i = 0; i < ctx.nodes.length; i++) {
				const node = ctx.nodes[i];
				if (node.image && typeof node.image === "string") node.image = resolveRelation(node.image, ctx, imageResolver, { root: true });
				node.translationOfWork = resolveRelation(node.translationOfWork, ctx);
				node.workTranslation = resolveRelation(node.workTranslation, ctx);
				const resolver = node._resolver;
				if (resolver?.resolveRootNode) resolver.resolveRootNode(node, ctx);
			}
			for (let i = 0; i < ctx.nodes.length; i++) delete ctx.nodes[i]._resolver;
			for (let i = 0; i < ctx.nodes.length; i++) stripNullProperties(ctx.nodes[i]);
			const needsDedupe = ctx.nodes.length > countBeforeRelations;
			const normalizedNodes = needsDedupe ? /* @__PURE__ */ Object.create(null) : null;
			const result = needsDedupe ? null : [];
			for (let i = 0; i < ctx.nodes.length; i++) {
				const n = ctx.nodes[i];
				const nodeKey = resolveAsGraphKey(n["@id"]);
				const keys = Object.keys(n);
				keys.sort();
				const newNode = {};
				let relationCount = 0;
				for (let j = 0; j < keys.length; j++) {
					const k = keys[j];
					if (k[0] === "_") continue;
					const v = n[k];
					if (v !== null && (Array.isArray(v) || typeof v === "object")) keys[relationCount++] = k;
					else newNode[k] = v;
				}
				for (let j = 0; j < relationCount; j++) {
					const k = keys[j];
					newNode[k] = n[k];
				}
				if (needsDedupe) normalizedNodes[nodeKey] = normalizedNodes[nodeKey] ? merge(normalizedNodes[nodeKey], newNode) : newNode;
				else result.push(newNode);
			}
			return needsDedupe ? Object.values(normalizedNodes) : result;
		},
		nodes: [],
		nodeIndex: /* @__PURE__ */ new Map(),
		nodeIdCounters: /* @__PURE__ */ Object.create(null),
		meta: resolveMeta({})
	};
	return ctx;
}
function resolveIdentityRelation(input, ctx, resolvers, options = {}) {
	if (!input) return input;
	const resolveIdentity = (identity) => {
		const types = typeof identity === "object" && identity ? asArray(identity["@type"]).filter((type) => typeof type === "string") : [];
		return resolveRelation(identity, ctx, types.length > 0 && !types.includes("Person") ? resolvers.organization : resolvers.person, options);
	};
	if (!Array.isArray(input)) return resolveIdentity(input);
	const resolved = input.map(resolveIdentity);
	return resolved.length === 1 ? resolved[0] : resolved;
}
var aggregateRatingResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "AggregateRating" },
	resolve(node, ctx) {
		node.itemReviewed = resolveRelation(node.itemReviewed, ctx);
		return node;
	}
});
var openingHoursResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: {
		"@type": "OpeningHoursSpecification",
		"opens": "00:00",
		"closes": "23:59"
	},
	resolve(node) {
		node.validFrom = resolvableDateToIso(node.validFrom);
		node.validThrough = resolvableDateToIso(node.validThrough);
		return node;
	}
});
var itemListResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "ItemList" },
	resolve(node, ctx) {
		if (node.itemListElement) {
			let index = 1;
			node.itemListElement = resolveRelation(node.itemListElement, ctx, listItemResolver, {
				array: true,
				afterResolve(node2) {
					setIfEmpty(node2, "position", index++);
				}
			});
		}
		return node;
	}
});
var ratingResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	cast(node) {
		if (typeof node === "number") return { ratingValue: node };
		return node;
	},
	defaults: {
		"@type": "Rating",
		"bestRating": 5,
		"worstRating": 1
	}
});
var reviewResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "Review" },
	inheritMeta: ["inLanguage"],
	resolve(review, ctx) {
		review.reviewRating = resolveRelation(review.reviewRating, ctx, ratingResolver);
		review.author = resolveIdentityRelation(review.author, ctx, {
			organization: organizationResolver,
			person: personResolver
		});
		review.itemReviewed = resolveRelation(review.itemReviewed, ctx);
		review.negativeNotes = resolveRelation(review.negativeNotes, ctx, itemListResolver);
		review.positiveNotes = resolveRelation(review.positiveNotes, ctx, itemListResolver);
		review.contentReferenceTime = resolvableDateToIso(review.contentReferenceTime);
		review.datePublished = resolvableDateToIso(review.datePublished);
		return review;
	}
});
var geoCoordinatesResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "GeoCoordinates" } });
var localBusinessResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": ["Organization", "LocalBusiness"] },
	inheritMeta: [{
		key: "url",
		meta: "host"
	}, {
		key: "currenciesAccepted",
		meta: "currency"
	}],
	idPrefix: ["host", IdentityId],
	resolve(node, ctx) {
		resolveDefaultType(node, ["Organization", "LocalBusiness"]);
		node.address = resolveRelation(node.address, ctx, addressResolver);
		node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
		node.department = resolveRelation(node.department, ctx, localBusinessResolver);
		node.geo = resolveRelation(node.geo, ctx, geoCoordinatesResolver);
		node.openingHoursSpecification = resolveRelation(node.openingHoursSpecification, ctx, openingHoursResolver);
		node.review = resolveRelation(node.review, ctx, reviewResolver);
		if (node.menu) node.menu = resolveWithBase(ctx.meta.host, node.menu);
		node = resolveNode({ ...node }, ctx, organizationResolver);
		return node;
	},
	resolveRootNode(node, ctx) {
		organizationResolver.resolveRootNode(node, ctx);
		return node;
	}
});
function mergeObjects(target, source) {
	const result = { ...target };
	for (const key in source) {
		if (!hasOwn(source, key) || source[key] === void 0 || key === "__proto__" || key === "constructor" || key === "prototype") continue;
		if (result[key] && typeof result[key] === "object" && typeof source[key] === "object" && !Array.isArray(result[key]) && !Array.isArray(source[key])) result[key] = mergeObjects(result[key], source[key]);
		else if (!result[key]) result[key] = source[key];
	}
	return result;
}
function isSchemaOrgTag(tag) {
	return tag.tag === "script" && tag.props.type === "application/ld+json" && tag.props.nodes || tag.key === "schema-org-graph";
}
function UnheadSchemaOrg(config = {}, meta = () => ({}), options) {
	let graph;
	let resolvedMeta = {};
	let canonical;
	return defineHeadPlugin((head) => {
		head.use(TemplateParamsPlugin);
		function collectMeta(props) {
			if (typeof props.content !== "string") return;
			if (props.name === "description") resolvedMeta.description = props.content;
			else if (props.property === "og:image") resolvedMeta.image = props.content;
		}
		function collectTag(tag) {
			if (tag.tag === "script" && tag.props.type === "application/ld+json" && (tag.props.nodes || tag.key === "schema-org-graph")) {
				const nodes = tag.props.nodes;
				if (nodes) for (const node of Array.isArray(nodes) ? nodes : [nodes]) {
					if (typeof node !== "object" || node === null) continue;
					const newNode = {
						...node,
						_dedupeStrategy: tag.tagDuplicateStrategy
					};
					graph.push(newNode);
				}
				tag.tagPosition = tag.tagPosition || (config.tagPosition === "head" ? "head" : "bodyClose");
			}
			if (tag.tag === "meta") collectMeta(tag.props);
			else if (tag.tag === "_flatMeta") for (const props of unpackMeta(tag.props)) collectMeta(props);
			else if (tag.tag === "htmlAttrs" && typeof tag.props.lang === "string") resolvedMeta.inLanguage = tag.props.lang;
			else if (tag.tag === "title" && tag.textContent != null && typeof tag.textContent !== "function") resolvedMeta.title = String(tag.textContent);
			else if (tag.tag === "link" && tag.props.rel === "canonical" && typeof tag.props.href === "string") canonical = tag.props.href;
			else if (tag.tag === "templateParams" && tag.props.schemaOrg) resolvedMeta = {
				...resolvedMeta,
				...tag.props.schemaOrg
			};
		}
		return {
			key: "schema-org",
			hooks: {
				"entries:resolve": (ctx) => {
					graph = graph || createSchemaOrgGraph();
					graph.nodes = [];
					graph.nodeIndex.clear();
					resolvedMeta = {};
					canonical = void 0;
					for (const entry of ctx.entries) if (entry._tags) {
						if (entry._tags.some(isSchemaOrgTag)) {
							delete entry._tags;
							continue;
						}
						for (const tag of entry._tags) collectTag(tag);
					}
				},
				"entries:normalize": ({ tags }) => {
					for (const tag of tags) collectTag(tag);
				},
				"tags:resolve": (ctx) => {
					for (const k in ctx.tags) {
						const tag = ctx.tags[k];
						if (tag.tag === "script" && tag.props.type === "application/ld+json" && (tag.props.nodes || tag.key === "schema-org-graph")) {
							delete tag.props.nodes;
							const graphMeta = {
								...meta?.() || {},
								...config,
								...resolvedMeta
							};
							if (canonical && !graphMeta.url) graphMeta.url = processTemplateParams(canonical, head._templateParams, head._separator);
							const resolvedGraph = graph.resolveGraph(graphMeta);
							if (!resolvedGraph.length) {
								tag.props = {};
								return;
							}
							options?.minify || true;
							tag.innerHTML = JSON.stringify({
								"@context": "https://schema.org",
								"@graph": resolvedGraph
							}, (_, value) => {
								if (typeof value === "string") return processTemplateParams(value, head._templateParams, head._separator);
								return value;
							}, 0 );
							return;
						}
					}
				},
				"tags:afterResolve": (ctx) => {
					let firstNodeIdx;
					let toRemove;
					for (let i = 0; i < ctx.tags.length; i++) {
						const tag = ctx.tags[i];
						if (!tag?.props) continue;
						if (isSchemaOrgTag(tag)) {
							delete tag.props.nodes;
							if (typeof firstNodeIdx === "undefined") {
								firstNodeIdx = i;
								continue;
							}
							ctx.tags[firstNodeIdx].props = mergeObjects(ctx.tags[firstNodeIdx].props, tag.props);
							delete ctx.tags[firstNodeIdx].props.nodes;
							(toRemove ||= /* @__PURE__ */ new Set()).add(i);
						}
					}
					if (toRemove) ctx.tags = ctx.tags.filter((_, i) => !toRemove.has(i));
				}
			}
		};
	}, "schema-org");
}
//#endregion
//#region node_modules/.pnpm/nuxt-schema-org@7.0.1_nhdt7xh7knmsj3xcdubcwoybdy/node_modules/nuxt-schema-org/dist/vendor/schema-org-v3/vue.mjs
function withResolver(input, resolver) {
	return {
		...input,
		_resolver: resolver
	};
}
function provideResolver(input, resolver) {
	const resolvedInput = input || {};
	if (isRef(resolvedInput)) return computed(() => {
		const value = resolvedInput.value;
		return value && typeof value === "object" ? withResolver(value, resolver) : value;
	});
	return withResolver(resolvedInput, resolver);
}
function defineLocalBusiness(input) {
	return provideResolver(input, localBusinessResolver);
}
function defineOrganization(input) {
	return provideResolver(input, organizationResolver);
}
function definePerson(input) {
	return provideResolver(input, personResolver);
}
function defineWebPage(input) {
	return provideResolver(input, webPageResolver);
}
function defineWebSite(input) {
	return provideResolver(input, webSiteResolver);
}
//#endregion
//#region node_modules/.pnpm/site-config-stack@5.0.2_vue@3.5.43_typescript@5.9.3_/node_modules/site-config-stack/dist/urls.mjs
var FILE_EXT_RE = /\.[0-9a-z]+$/i;
function resolveSitePath(pathOrUrl, options) {
	let path = pathOrUrl;
	if (hasProtocol$1(pathOrUrl, {
		strict: false,
		acceptRelative: true
	})) path = parseURL(pathOrUrl).pathname;
	const base = withLeadingSlash(options.base || "/");
	if (base !== "/" && path.startsWith(base)) path = path.slice(base.length);
	let origin = withoutTrailingSlash$1(options.absolute ? options.siteUrl : "");
	if (base !== "/" && origin.endsWith(base)) origin = origin.slice(0, origin.indexOf(base));
	const baseWithOrigin = options.withBase ? withBase$1(base, origin || "/") : origin;
	const resolvedUrl = withBase$1(path, baseWithOrigin);
	return path === "/" && !options.withBase ? withTrailingSlash$1(resolvedUrl) : fixSlashes(options.trailingSlash, resolvedUrl);
}
var fileExtensions = [
	"jpg",
	"jpeg",
	"png",
	"gif",
	"bmp",
	"webp",
	"svg",
	"ico",
	"pdf",
	"doc",
	"docx",
	"xls",
	"xlsx",
	"ppt",
	"pptx",
	"txt",
	"md",
	"markdown",
	"zip",
	"rar",
	"7z",
	"tar",
	"gz",
	"mp3",
	"wav",
	"flac",
	"ogg",
	"opus",
	"m4a",
	"aac",
	"midi",
	"mid",
	"mp4",
	"avi",
	"mkv",
	"mov",
	"wmv",
	"flv",
	"webm",
	"html",
	"css",
	"js",
	"json",
	"xml",
	"tsx",
	"jsx",
	"ts",
	"vue",
	"svelte",
	"xsl",
	"rss",
	"atom",
	"php",
	"py",
	"rb",
	"java",
	"c",
	"cpp",
	"h",
	"go",
	"csv",
	"tsv",
	"sql",
	"yaml",
	"yml",
	"woff",
	"woff2",
	"ttf",
	"otf",
	"eot",
	"exe",
	"msi",
	"apk",
	"ipa",
	"dmg",
	"iso",
	"bin",
	"bat",
	"cmd",
	"sh",
	"env",
	"htaccess",
	"conf",
	"toml",
	"ini",
	"deb",
	"rpm",
	"jar",
	"war",
	"epub",
	"mobi",
	"log",
	"tmp",
	"bak",
	"old",
	"sav"
];
function isPathFile(path) {
	const ext = (path.split("/").pop() || path).match(FILE_EXT_RE)?.[0];
	return !!(ext && fileExtensions.includes(ext.replace(".", "")));
}
function fixSlashes(trailingSlash, pathOrUrl) {
	const $url = parseURL(pathOrUrl);
	if (isPathFile($url.pathname)) return pathOrUrl;
	const fixedPath = trailingSlash ? withTrailingSlash$1($url.pathname) : withoutTrailingSlash$1($url.pathname);
	return `${$url.protocol ? `${$url.protocol}//` : ""}${$url.host || ""}${fixedPath}${$url.search || ""}${$url.hash || ""}`;
}
//#endregion
//#region node_modules/.pnpm/nuxt-site-config@5.0.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0__2pgigetnotta4www4jfdqe3lvy/node_modules/nuxt-site-config/dist/runtime/app/composables/getNitroOrigin.js
function getNitroOrigin(e) {
	e = e || useRequestEvent();
	return e?.context?.siteConfigNitroOrigin || "";
}
//#endregion
//#region node_modules/.pnpm/nuxt-site-config@5.0.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0__2pgigetnotta4www4jfdqe3lvy/node_modules/nuxt-site-config/dist/runtime/app/composables/utils.js
function createSitePathResolver(options = {}) {
	const siteConfig = useSiteConfig();
	const nitroOrigin = getNitroOrigin();
	const nuxtBase = useRuntimeConfig().app.baseURL || "/";
	return (path) => {
		return computed(() => resolveSitePath(unref(path), {
			absolute: unref(options.absolute),
			withBase: unref(options.withBase),
			siteUrl: unref(options.canonical) !== false || false ? siteConfig.url : nitroOrigin,
			trailingSlash: siteConfig.trailingSlash,
			base: nuxtBase
		}));
	};
}
function withSiteUrl(path, options = {}) {
	const siteConfig = useSiteConfig();
	const nitroOrigin = getNitroOrigin();
	const base = useRuntimeConfig().app.baseURL || "/";
	return computed(() => {
		return resolveSitePath(unref(path), {
			absolute: true,
			siteUrl: unref(options.canonical) !== false || false ? siteConfig.url : nitroOrigin,
			trailingSlash: siteConfig.trailingSlash,
			base,
			withBase: unref(options.withBase)
		});
	});
}
//#endregion
//#region node_modules/.pnpm/nuxt-schema-org@7.0.1_nhdt7xh7knmsj3xcdubcwoybdy/node_modules/nuxt-schema-org/dist/runtime/app/utils/config.js
function useSchemaOrgConfig() {
	const runtimeConfig = useRuntimeConfig();
	return defu(runtimeConfig["nuxt-schema-org"], { scriptAttributes: {} });
}
//#endregion
//#region node_modules/.pnpm/nuxt-schema-org@7.0.1_nhdt7xh7knmsj3xcdubcwoybdy/node_modules/nuxt-schema-org/dist/runtime/app/composables/useSchemaOrg.js
function useSchemaOrg(input) {
	const config = useSchemaOrgConfig();
	useNuxtApp();
	let nodes = input;
	if (isRef(input)) nodes = toValue(input);
	const script = {
		type: "application/ld+json",
		key: "schema-org-graph",
		nodes,
		tagPriority: "high",
		...config.scriptAttributes
	};
	return useHead({ script: [script] });
}
//#endregion
//#region node_modules/.pnpm/nuxt-schema-org@7.0.1_nhdt7xh7knmsj3xcdubcwoybdy/node_modules/nuxt-schema-org/dist/runtime/app/utils/shared.js
function resolvePathDirect(siteConfig, path, options) {
	const nuxtBase = useRuntimeConfig().app.baseURL || "/";
	return resolveSitePath(path, {
		absolute: options.absolute,
		withBase: options.withBase,
		siteUrl: toValue(siteConfig.url),
		trailingSlash: toValue(siteConfig.trailingSlash),
		base: nuxtBase
	});
}
function initPlugin(nuxtApp) {
	initSchemaOrgMeta(nuxtApp);
	initSchemaOrgHead(nuxtApp);
}
function resolveSiteConfigValue(value) {
	const resolved = toValue(value);
	if (Array.isArray(resolved)) return resolved.map(resolveSiteConfigValue);
	if (!resolved || typeof resolved !== "object") return resolved;
	const proto = Object.getPrototypeOf(resolved);
	if (proto !== Object.prototype && proto !== null) return resolved;
	const copy = {};
	for (const key in resolved) copy[key] = resolveSiteConfigValue(resolved[key]);
	return copy;
}
function withoutUrl(meta) {
	const { url: _url, ...rest } = meta;
	return rest;
}
function initSchemaOrgMeta(nuxtApp) {
	const head = injectHead(nuxtApp);
	const route = useRoute$1();
	const siteConfig = useSiteConfig();
	const resolveUrl = (path) => resolvePathDirect(siteConfig, path, {
		absolute: true,
		withBase: true
	});
	function resolveSchemaOrg() {
		const siteConfigResolved = {};
		for (const key in siteConfig) {
			if (key.startsWith("_")) continue;
			siteConfigResolved[key] = resolveSiteConfigValue(siteConfig[key]);
		}
		return {
			...route.meta?.schemaOrg || {},
			...siteConfigResolved,
			url: toValue(resolveUrl(route.path)),
			host: withTrailingSlash$1(toValue(resolveUrl("/"))),
			inLanguage: toValue(siteConfigResolved.currentLocale) || toValue(siteConfigResolved.defaultLocale),
			path: route.path
		};
	}
	async function resolveSchemaOrgWithHook() {
		const meta = resolveSchemaOrg();
		const url = meta.url;
		await nuxtApp.hooks.callHook("schema-org:meta", meta);
		if (meta.url === url) return withoutUrl(meta);
		if (URL.canParse(meta.url)) {
			const parsed = new URL(meta.url);
			meta.host = withTrailingSlash$1(parsed.origin);
			meta.path = parsed.pathname;
		}
		return meta;
	}
	const templateParamEntry = head.push({ templateParams: { schemaOrg: withoutUrl(resolveSchemaOrg()) } });
	nuxtApp.hooks.hookOnce("app:created", async () => {
		templateParamEntry.patch({ templateParams: { schemaOrg: await resolveSchemaOrgWithHook() } });
	});
}
function initSchemaOrgHead(nuxtApp) {
	const head = injectHead(nuxtApp);
	const config = useSchemaOrgConfig();
	const siteConfig = useSiteConfig();
	const schemaOrgPlugin = UnheadSchemaOrg;
	head.use(schemaOrgPlugin({}, void 0, {
		minify: config.minify,
		trailingSlash: siteConfig.trailingSlash
	}));
}
function maybeAddIdentitySchemaOrg() {
	const config = useSchemaOrgConfig();
	const siteConfig = useSiteConfig({ resolveRefs: true });
	if (config.identity || siteConfig.identity) {
		const identity = config.identity || siteConfig.identity;
		let identityPayload = {
			name: () => toValue(siteConfig.name),
			url: () => toValue(siteConfig.url)
		};
		let identityType;
		if (typeof identity !== "string") {
			identityPayload = {
				...identityPayload,
				...resolveSiteConfigValue(identity)
			};
			identityType = identity.type;
			delete identityPayload.type;
		} else identityType = identity;
		if (siteConfig.twitter) {
			const id = siteConfig.twitter.startsWith("@") ? siteConfig.twitter.slice(1) : siteConfig.twitter;
			identityPayload.sameAs = [`https://twitter.com/${id}`];
		}
		useSchemaOrg([({
			organization: defineOrganization,
			person: definePerson,
			localbusiness: defineLocalBusiness
		}[identityType?.toLowerCase()] || defineOrganization)(identityPayload)]);
	}
}
//#endregion
//#region node_modules/.pnpm/nuxt-schema-org@7.0.1_nhdt7xh7knmsj3xcdubcwoybdy/node_modules/nuxt-schema-org/dist/runtime/app/plugins/init.js
var init_default = defineNuxtPlugin({
	name: "nuxt-schema-org:init",
	setup(nuxtApp) {
		initPlugin(nuxtApp);
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt-schema-org@7.0.1_nhdt7xh7knmsj3xcdubcwoybdy/node_modules/nuxt-schema-org/dist/runtime/app/plugins/defaults.js
var defaults_default$1 = defineNuxtPlugin({
	name: "nuxt-schema-org:defaults",
	dependsOn: ["nuxt-schema-org:init"],
	setup() {
		if (useError().value?.error) return;
		const siteConfig = useSiteConfig();
		useSchemaOrg([defineWebSite({
			name: () => toValue(siteConfig.name) || "",
			inLanguage: () => toValue(siteConfig.currentLocale) || "",
			description: () => toValue(siteConfig.description) || ""
		}), defineWebPage()]);
		maybeAddIdentitySchemaOrg();
	}
});
//#endregion
//#region node_modules/.pnpm/nuxtseo-shared@6.0.2_ix7jyf4cnrat4v4s6fnb6knmky/node_modules/nuxtseo-shared/dist/server.mjs
function withoutQuery$1(path) {
	const queryIndex = path.indexOf("?");
	return queryIndex === -1 ? path : path.slice(0, queryIndex);
}
function createNitroRouteRuleMatcher(runtimeConfig) {
	const { nitro, app } = runtimeConfig;
	const baseURL = app?.baseURL || "/";
	const _routeRulesMatcher = toRouteMatcher(createRouter$1({ routes: Object.fromEntries(Object.entries(nitro?.routeRules || {}).map(([path, rules]) => [withoutTrailingSlash$1(path), rules])) }));
	return (pathOrUrl) => {
		const path = pathOrUrl[0] === "/" ? pathOrUrl : parseURL(pathOrUrl, baseURL).pathname;
		return defu({}, ..._routeRulesMatcher.matchAll(withoutBase(withoutTrailingSlash$1(withoutQuery$1(path)), baseURL)).reverse());
	};
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fnuxt-og-image%2Fcomponents.mjs
var componentNames = [
	{
		"hash": "",
		"pascalName": "BlogPostTakumi",
		"kebabName": "blog-post-takumi",
		"path": "/Users/ccci/Project/ReactPortfolio/node_modules/.pnpm/nuxt-og-image@7.0.3_5mwpruyw5zaobbmv4bpuwlo4d4/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "takumi",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "BrutalistSatori",
		"kebabName": "brutalist-satori",
		"path": "/Users/ccci/Project/ReactPortfolio/node_modules/.pnpm/nuxt-og-image@7.0.3_5mwpruyw5zaobbmv4bpuwlo4d4/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "satori",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "DocsTakumi",
		"kebabName": "docs-takumi",
		"path": "/Users/ccci/Project/ReactPortfolio/node_modules/.pnpm/nuxt-og-image@7.0.3_5mwpruyw5zaobbmv4bpuwlo4d4/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "takumi",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "FrameSatori",
		"kebabName": "frame-satori",
		"path": "/Users/ccci/Project/ReactPortfolio/node_modules/.pnpm/nuxt-og-image@7.0.3_5mwpruyw5zaobbmv4bpuwlo4d4/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "satori",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "NuxtSatori",
		"kebabName": "nuxt-satori",
		"path": "/Users/ccci/Project/ReactPortfolio/node_modules/.pnpm/nuxt-og-image@7.0.3_5mwpruyw5zaobbmv4bpuwlo4d4/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "satori",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "NuxtSeoSatori",
		"kebabName": "nuxt-seo-satori",
		"path": "/Users/ccci/Project/ReactPortfolio/node_modules/.pnpm/nuxt-og-image@7.0.3_5mwpruyw5zaobbmv4bpuwlo4d4/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "satori",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "NuxtSeoTakumi",
		"kebabName": "nuxt-seo-takumi",
		"path": "/Users/ccci/Project/ReactPortfolio/node_modules/.pnpm/nuxt-og-image@7.0.3_5mwpruyw5zaobbmv4bpuwlo4d4/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "takumi",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "PergelSatori",
		"kebabName": "pergel-satori",
		"path": "/Users/ccci/Project/ReactPortfolio/node_modules/.pnpm/nuxt-og-image@7.0.3_5mwpruyw5zaobbmv4bpuwlo4d4/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "satori",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "ProductCardTakumi",
		"kebabName": "product-card-takumi",
		"path": "/Users/ccci/Project/ReactPortfolio/node_modules/.pnpm/nuxt-og-image@7.0.3_5mwpruyw5zaobbmv4bpuwlo4d4/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "takumi",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "SaaSSatori",
		"kebabName": "saa-ssatori",
		"path": "/Users/ccci/Project/ReactPortfolio/node_modules/.pnpm/nuxt-og-image@7.0.3_5mwpruyw5zaobbmv4bpuwlo4d4/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "satori",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "SimpleBlogSatori",
		"kebabName": "simple-blog-satori",
		"path": "/Users/ccci/Project/ReactPortfolio/node_modules/.pnpm/nuxt-og-image@7.0.3_5mwpruyw5zaobbmv4bpuwlo4d4/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "satori",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "UnJsSatori",
		"kebabName": "un-js-satori",
		"path": "/Users/ccci/Project/ReactPortfolio/node_modules/.pnpm/nuxt-og-image@7.0.3_5mwpruyw5zaobbmv4bpuwlo4d4/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "satori",
		"propNames": []
	},
	{
		"hash": "",
		"pascalName": "WithEmojiSatori",
		"kebabName": "with-emoji-satori",
		"path": "/Users/ccci/Project/ReactPortfolio/node_modules/.pnpm/nuxt-og-image@7.0.3_5mwpruyw5zaobbmv4bpuwlo4d4/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community",
		"category": "community",
		"renderer": "satori",
		"propNames": []
	}
];
//#endregion
//#region node_modules/.pnpm/nuxt-og-image@7.0.3_5mwpruyw5zaobbmv4bpuwlo4d4/node_modules/nuxt-og-image/dist/runtime/shared/urlEncoding.js
var MAX_PATH_LENGTH = 200;
var RE_BASE64_PADDING = /=/g;
var RE_BASE64_PLUS = /\+/g;
var RE_BASE64_SLASH = /\//g;
var RE_UNDERSCORE = /_/g;
var RE_PERCENT20 = /%20/g;
var RE_PLUS = /\+/g;
var RE_NON_ASCII = /[^\u0000-\u007F]/;
var RE_WINDOWS_RESERVED_FILENAME_CHARACTERS = /[<>:"/\\|?*\u0000-\u001F]/;
var RE_NOT_UNRESERVED = /[^\w.~-]/;
var PARAM_TO_ALIAS = Object.fromEntries(Object.entries({
	w: "width",
	h: "height",
	c: "component",
	em: "emojis",
	k: "key",
	a: "alt",
	u: "url",
	cache: "cacheMaxAgeSeconds",
	p: "_path",
	q: "_query",
	ch: "_componentHash"
}).map(([alias, param]) => [param, alias]));
var COMPLEX_PARAMS = /* @__PURE__ */ new Set([
	"satori",
	"resvg",
	"sharp",
	"screenshot",
	"takumi",
	"fonts",
	"_query",
	"_path"
]);
function b64Encode(str) {
	let encoded;
	if (typeof btoa === "function") {
		const utf8 = new TextEncoder().encode(str);
		const binary = String.fromCharCode(...utf8);
		encoded = btoa(binary);
	} else encoded = Buffer.from(str, "utf8").toString("base64");
	return encoded.replace(RE_BASE64_PADDING, "").replace(RE_BASE64_PLUS, "-").replace(RE_BASE64_SLASH, "~");
}
function canonicalJson(value) {
	if (value === null || typeof value !== "object") return JSON.stringify(value) ?? "null";
	if (Array.isArray(value)) return `[${value.map((item) => canonicalJson(item)).join(",")}]`;
	const record = value;
	return `{${Object.keys(record).sort().filter((key) => record[key] !== void 0).map((key) => `${JSON.stringify(key)}:${canonicalJson(record[key])}`).join(",")}}`;
}
var B64URL_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
function base64UrlToHex(input) {
	let hex = "";
	let buffer = 0;
	let bits = 0;
	for (const char of input) {
		buffer = buffer << 6 | B64URL_ALPHABET.indexOf(char);
		bits += 6;
		if (bits >= 8) {
			bits -= 8;
			hex += (buffer >> bits & 255).toString(16).padStart(2, "0");
		}
	}
	return hex;
}
function digestCanonical(value) {
	return base64UrlToHex(digest(canonicalJson(value)));
}
function hashOgImageOptions(options, componentHash, version) {
	const { _path, _hash, ...rest } = options;
	const hashableOptions = rest.component === "PageScreenshot" ? {
		...rest,
		_path
	} : rest;
	return digestCanonical(hashableOptions).slice(0, 16);
}
function encodeOgImageParams(options, defaults) {
	const parts = [];
	const flattened = {};
	for (const [key, value] of Object.entries(options)) if (key === "props" && typeof value === "object") for (const [propKey, propValue] of Object.entries(value)) {
		if (propValue === void 0 || propValue === null) continue;
		if (typeof propValue === "string" || typeof propValue === "number" || typeof propValue === "boolean") flattened[propKey] = propValue;
		else {
			flattened.props = flattened.props || {};
			flattened.props[propKey] = propValue;
		}
	}
	else flattened[key] = value;
	for (const [key, value] of Object.entries(flattened)) {
		if (value === void 0 || value === null || value === "") continue;
		if (key === "extension" || key === "socialPreview") continue;
		if (key === "_path" && value === "/") continue;
		if (key === "_query" && typeof value === "object" && Object.keys(value).length === 0) continue;
		if (defaults && key in defaults && defaults[key] === value && key !== "component") continue;
		const alias = PARAM_TO_ALIAS[key] || key;
		if (COMPLEX_PARAMS.has(key)) {
			const json = JSON.stringify(value);
			if (json === "{}") continue;
			const b64 = b64Encode(json);
			parts.push(`${alias}_${b64}`);
		} else if (typeof value === "object") {
			const json = JSON.stringify(value);
			if (json === "{}") continue;
			const b64 = b64Encode(json);
			parts.push(`${alias}_${b64}`);
		} else {
			const str = String(value);
			if (RE_NON_ASCII.test(str)) parts.push(`${alias}_~${b64Encode(str)}`);
			else {
				const escaped = str.startsWith("~") ? `~${str}` : str;
				const encoded = encodeURIComponent(escaped.replace(RE_UNDERSCORE, "__")).replace(RE_PERCENT20, "+");
				if (encoded.includes("%") || RE_WINDOWS_RESERVED_FILENAME_CHARACTERS.test(str)) parts.push(`${alias}_~${b64Encode(str)}`);
				else parts.push(`${alias}_${encoded}`);
			}
		}
	}
	return parts.join(",");
}
function buildOgImageUrl(options, extension = "png", isStatic = false, defaults, secret) {
	const encoded = encodeOgImageParams(options, defaults);
	const prefix = isStatic ? "/_og/s" : "/_og/d";
	if (isStatic && (encoded.length > MAX_PATH_LENGTH || RE_NOT_UNRESERVED.test(encoded))) {
		const hash = hashOgImageOptions(options);
		return {
			url: `${prefix}/o_${hash}.${extension}`,
			hash
		};
	}
	const segment = encoded || "default";
	return { url: `${prefix}/${(secret && !isStatic ? `${segment},s_${signEncodedParams(segment, secret)}` : segment).replace(/,/g, "%2C").replace(RE_PLUS, "%2B")}.${extension}` };
}
function signEncodedParams(encoded, secret) {
	return digest(`${secret}:${encoded}`).slice(0, 16);
}
//#endregion
//#region node_modules/.pnpm/nuxt-og-image@7.0.3_5mwpruyw5zaobbmv4bpuwlo4d4/node_modules/nuxt-og-image/dist/runtime/shared.js
var RE_KEBAB_CASE = /-([a-z])/g;
function generateMeta(url, resolvedOptions, metaOptions = {}) {
	const key = resolvedOptions.key || "og";
	const isTwitterOnly = key === "twitter";
	const includeTwitter = (key === "og" || key === "twitter") && metaOptions.includeTwitter !== false;
	const meta = [];
	if (includeTwitter) {
		meta.push({
			name: "twitter:card",
			content: "summary_large_image",
			tagPriority: "low"
		});
		meta.push({
			name: "twitter:image",
			content: url
		});
	}
	if (!isTwitterOnly) {
		meta.push({
			property: "og:image",
			content: url
		});
		meta.push({
			property: "og:image:type",
			content: () => `image/${getExtension(toValue(url)) || resolvedOptions.extension}`
		});
	}
	if (resolvedOptions.width) {
		if (!isTwitterOnly) meta.push({
			property: "og:image:width",
			content: resolvedOptions.width
		});
	}
	if (resolvedOptions.height) {
		if (!isTwitterOnly) meta.push({
			property: "og:image:height",
			content: resolvedOptions.height
		});
	}
	if (resolvedOptions.alt) {
		if (!isTwitterOnly) meta.push({
			property: "og:image:alt",
			content: resolvedOptions.alt
		});
		if (includeTwitter) meta.push({
			name: "twitter:image:alt",
			content: resolvedOptions.alt
		});
	}
	for (const tag of meta) tag.tagPriority ??= "high";
	return meta;
}
function isInternalRoute(path) {
	return path.startsWith("/_") || path.startsWith("@");
}
function filterIsOgImageOption(key) {
	return [
		"url",
		"extension",
		"width",
		"height",
		"alt",
		"props",
		"renderer",
		"component",
		"emojis",
		"_query",
		"_hash",
		"fonts",
		"satori",
		"resvg",
		"sharp",
		"screenshot",
		"takumi",
		"cacheMaxAgeSeconds",
		"cacheKey",
		"key"
	].includes(key);
}
function separateProps(options, ignoreKeys = []) {
	options = options || {};
	const _props = defu(options.props, Object.fromEntries(Object.entries({ ...options }).filter(([k]) => !filterIsOgImageOption(k) && !ignoreKeys.includes(k))));
	const props = {};
	Object.entries(_props).forEach(([key, val]) => {
		props[key.replace(RE_KEBAB_CASE, (g) => String(g[1]).toUpperCase())] = val;
	});
	const result = Object.fromEntries(Object.entries({ ...options }).filter(([k]) => filterIsOgImageOption(k) || ignoreKeys.includes(k)));
	if (Object.keys(props).length > 0) result.props = props;
	return result;
}
function withoutQuery(path) {
	return path.split("?")[0];
}
function getExtension(path) {
	path = withoutQuery(path);
	const lastSegment = path.split("/").pop() || path;
	const extension = lastSegment.split(".").pop() || lastSegment;
	if (extension === "jpg") return "jpeg";
	return extension;
}
var RE_RENDERER_SUFFIX = /(Satori|Browser|Takumi)$/;
function createOgImageMeta(src, input, ssrContext, pagePath, head) {
	const ogImageConfig = useOgImageRuntimeConfig();
	const { defaults } = ogImageConfig;
	const resolvedOptions = separateProps(defu(input, defaults));
	resolvedOptions.key = resolvedOptions.key || "og";
	const payloads = ssrContext._ogImagePayloads || [];
	const currentPayloadIdx = payloads.findIndex(([k]) => k === resolvedOptions.key);
	const _input = separateProps(defu(input, currentPayloadIdx >= 0 ? payloads[currentPayloadIdx][1] : {}));
	if (!src && !input.url && !resolvedOptions.url) return;
	const basePath = "/";
	if (currentPayloadIdx === -1) payloads.push([
		resolvedOptions.key,
		_input,
		basePath
	]);
	else payloads[currentPayloadIdx] = [
		resolvedOptions.key,
		_input,
		basePath
	];
	const baseURL = useRuntimeConfig().app.baseURL;
	const resolveImageUrl = createSitePathResolver({
		absolute: true,
		withBase: true,
		canonical: true
	});
	ssrContext._ogImageInstance?.dispose();
	ssrContext._ogImageInstance = useHead({ meta() {
		const finalPayload = ssrContext._ogImagePayloads || [];
		return finalPayload.flatMap(([_, options, payloadBasePath]) => {
			const opts = {
				...options,
				props: { ...options.props }
			};
			const rawComponentName = opts.component || componentNames?.[0]?.pascalName;
			const resolvedComponentName = rawComponentName ? resolveComponentName(rawComponentName) : void 0;
			(resolvedComponentName ? componentNames?.find((c) => c.pascalName === resolvedComponentName || c.kebabName === resolvedComponentName) : void 0)?.propNames;
			const extension = opts.extension || defaults?.extension || "png";
			const isStatic = false;
			const urlOpts = {
				...opts,
				_path: payloadBasePath
			};
			const componentName = opts.component || componentNames?.[0]?.pascalName;
			const component = componentNames?.find((c) => c.pascalName === componentName || c.kebabName === componentName);
			if (component?.hash) urlOpts._componentHash = component.hash;
			const result = buildOgImageUrl(urlOpts, extension, isStatic, defaults, ogImageConfig.security?.secret || void 0);
			if (result.hash) {
				opts._hash = result.hash;
				options._hash = result.hash;
			}
			const resolvedUrl = joinURL$1("/", baseURL, result.url);
			const finalUrl = opts._query && Object.keys(opts._query).length ? withQuery(resolvedUrl, { _query: opts._query }) : resolvedUrl;
			return generateMeta(toValue(resolveImageUrl(finalUrl)), opts, { includeTwitter: ogImageConfig.includeTwitter });
		});
	} }, { processTemplateParams: true });
	ssrContext._ogImagePayloads = payloads;
}
function resolveComponentName(component) {
	component = component || componentNames?.[0]?.pascalName;
	if (component && componentNames) {
		const originalName = component;
		const normalizedName = originalName.split(".").map((s, i) => i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)).join("");
		const inputBase = normalizedName.replace(RE_RENDERER_SUFFIX, "");
		const requestedRenderer = normalizedName.match(RE_RENDERER_SUFFIX)?.[1]?.toLowerCase();
		for (const component2 of componentNames) {
			if (component2.pascalName === normalizedName) return component2.pascalName;
			if (requestedRenderer && component2.renderer !== requestedRenderer) continue;
			const basePascalName = component2.pascalName.replace(RE_RENDERER_SUFFIX, "");
			if (basePascalName === originalName || basePascalName === inputBase) return component2.pascalName;
			for (const { prefix, overlapWord } of [
				{
					prefix: "OgImageCommunity",
					overlapWord: "Community"
				},
				{
					prefix: "OgImageTemplate",
					overlapWord: "Template"
				},
				{
					prefix: "OgImage",
					overlapWord: "Image"
				}
			]) {
				if (!basePascalName.startsWith(prefix)) continue;
				const withoutPrefix = basePascalName.slice(prefix.length);
				if (withoutPrefix === originalName || withoutPrefix === inputBase) return component2.pascalName;
				if (withoutPrefix && withoutPrefix !== overlapWord) {
					const withOverlap = overlapWord + withoutPrefix;
					if (withOverlap === originalName || withOverlap === inputBase) return component2.pascalName;
				}
				break;
			}
		}
	}
	return component;
}
function getOgImagePath(_pagePath, _options) {
	const { app, defaults, security } = useOgImageRuntimeConfig();
	const baseURL = app.baseURL;
	const extension = _options?.extension || defaults?.extension || "png";
	const isStatic = false;
	const options = {
		..._options,
		_path: _pagePath
	};
	const componentName = _options?.component || componentNames?.[0]?.pascalName;
	const component = componentNames?.find((c) => c.pascalName === componentName || c.kebabName === componentName);
	if (component?.hash) options._componentHash = component.hash;
	const result = buildOgImageUrl(options, extension, isStatic, defaults, security?.secret || void 0);
	return {
		path: joinURL$1("/", baseURL, result.url),
		hash: result.hash
	};
}
function useOgImageRuntimeConfig() {
	const event = useRequestEvent();
	const c = event ? useRuntimeConfig() : useRuntimeConfig();
	const serverCfg = c["nuxt-og-image"] || {};
	const merged = {
		defaults: {},
		...c.public?.["nuxt-og-image"] || {},
		...serverCfg
	};
	const overrideSecret = event?.context._ogImageSigningSecret;
	if (overrideSecret) merged.security = {
		...merged.security || {},
		secret: overrideSecret
	};
	merged.app = { baseURL: c.app.baseURL };
	return merged;
}
var ogImageCanonicalUrls = defineNuxtPlugin((nuxtApp) => {
	nuxtApp.hooks.hook("app:rendered", async (ctx) => {
		const { ssrContext } = ctx;
		const e = useRequestEvent();
		const path = parseURL(e?.path || "").pathname;
		if (isInternalRoute(path)) return;
		ssrContext?.head.use(TemplateParamsPlugin);
		ssrContext?.head.use({
			key: "nuxt-og-image:overrides-and-canonical-urls",
			hooks: { "tags:afterResolve": (ctx2) => {
				let title = "";
				let description = "";
				for (const tag of ctx2.tags) {
					if (tag.tag === "title" && tag.textContent) title = tag.textContent;
					else if (tag.tag === "meta" && tag.props.name === "description") description = tag.props.content || "";
					if (title && description) break;
				}
				for (const tag of ctx2.tags) if (tag.tag === "meta" && (tag.props.property === "og:image" || tag.props.name === "twitter:image")) {
					if (!tag.props.content) {
						tag.props = {};
						continue;
					}
					tag.props.content = tag.props.content.replaceAll("%title", title).replaceAll("%description", description).replaceAll(" ", "+");
					if (!/^https?:\/\//.test(tag.props.content || "")) nuxtApp.runWithContext(() => {
						tag.props.content = toValue(withSiteUrl(tag.props.content || "", {
							withBase: true,
							canonical: true
						}));
					});
				}
			} }
		});
	});
});
var routeRuleOgImage = defineNuxtPlugin((nuxtApp) => {
	nuxtApp.hooks.hook("app:rendered", async (ctx) => {
		const { ssrContext } = ctx;
		const e = useRequestEvent();
		const path = parseURL(e?.path || "").pathname;
		if (isInternalRoute(path)) return;
		let routeRules = createNitroRouteRuleMatcher(ssrContext?.runtimeConfig || {})(path).ogImage;
		if (typeof routeRules === "undefined") return;
		if (routeRules === false) {
			nuxtApp.ssrContext._ogImageInstance?.dispose();
			nuxtApp.ssrContext._ogImageDevtoolsInstance?.dispose();
			nuxtApp.ssrContext._ogImageInstance = void 0;
			nuxtApp.ssrContext._ogImagePayloads = [];
			return;
		}
		routeRules = defu(nuxtApp.ssrContext?.event?.context._nitro?.routeRules?.ogImage, routeRules);
		const { path: src, hash } = getOgImagePath(ssrContext.url, routeRules);
		if (hash) routeRules._hash = hash;
		createOgImageMeta(src, routeRules, nuxtApp.ssrContext);
	});
});
//#endregion
//#region node_modules/.pnpm/nuxt-og-image@7.0.3_5mwpruyw5zaobbmv4bpuwlo4d4/node_modules/nuxt-og-image/dist/runtime/app/plugins/og-image-canonical-urls.server.js
var og_image_canonical_urls_server_default = defineNuxtPlugin((nuxtApp) => ogImageCanonicalUrls(nuxtApp));
//#endregion
//#region node_modules/.pnpm/nuxt-og-image@7.0.3_5mwpruyw5zaobbmv4bpuwlo4d4/node_modules/nuxt-og-image/dist/runtime/app/plugins/route-rule-og-image.server.js
var route_rule_og_image_server_default = defineNuxtPlugin((nuxtApp) => routeRuleOgImage(nuxtApp));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+robots@7.0.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_ma_ab2sask254kgy466ehzmwabjby/node_modules/@nuxtjs/robots/dist/runtime/app/plugins/robot-meta.server.js
var robot_meta_server_default = defineNuxtPlugin({ setup() {
	const event = useRequestEvent();
	const ctx = event?.context?.robots;
	event?.context?.robotsProduction;
	if (!ctx) return;
	useHead({ meta: [{
		"name": "robots",
		"content": () => ctx.rule || "",
		"data-hint": () => void 0,
		"data-production-content": () => void 0
	}] });
} });
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue?nuxt_component=async&nuxt_component_name=ProseA&nuxt_component_export=default
var ProseA_default = defineAsyncComponent(() => import('../build/ProseA-L3ZSZkUY.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue?nuxt_component=async&nuxt_component_name=ProseBlockquote&nuxt_component_export=default
var ProseBlockquote_default = defineAsyncComponent(() => import('../build/ProseBlockquote-DP5d9lfp.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseCode.vue?nuxt_component=async&nuxt_component_name=ProseCode&nuxt_component_export=default
var ProseCode_default = defineAsyncComponent(() => import('../build/ProseCode-DBh5JFHp.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue?nuxt_component=async&nuxt_component_name=ProseEm&nuxt_component_export=default
var ProseEm_default = defineAsyncComponent(() => import('../build/ProseEm-NSqEMRom.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH1.vue?nuxt_component=async&nuxt_component_name=ProseH1&nuxt_component_export=default
var ProseH1_default = defineAsyncComponent(() => import('../build/ProseH1-Bx2el9Ia.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH2.vue?nuxt_component=async&nuxt_component_name=ProseH2&nuxt_component_export=default
var ProseH2_default = defineAsyncComponent(() => import('../build/ProseH2-DXwwwI4L.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH3.vue?nuxt_component=async&nuxt_component_name=ProseH3&nuxt_component_export=default
var ProseH3_default = defineAsyncComponent(() => import('../build/ProseH3-DokrUZw8.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH4.vue?nuxt_component=async&nuxt_component_name=ProseH4&nuxt_component_export=default
var ProseH4_default = defineAsyncComponent(() => import('../build/ProseH4-BEfDMLi7.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue?nuxt_component=async&nuxt_component_name=ProseH5&nuxt_component_export=default
var ProseH5_default = defineAsyncComponent(() => import('../build/ProseH5-C5XiP6n5.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue?nuxt_component=async&nuxt_component_name=ProseH6&nuxt_component_export=default
var ProseH6_default = defineAsyncComponent(() => import('../build/ProseH6-BwfhE_Xu.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue?nuxt_component=async&nuxt_component_name=ProseHr&nuxt_component_export=default
var ProseHr_default = defineAsyncComponent(() => import('../build/ProseHr-Dl8QOksT.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue?nuxt_component=async&nuxt_component_name=ProseImg&nuxt_component_export=default
var ProseImg_default = defineAsyncComponent(() => import('../build/ProseImg-Ctbkp69_.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue?nuxt_component=async&nuxt_component_name=ProseLi&nuxt_component_export=default
var ProseLi_default = defineAsyncComponent(() => import('../build/ProseLi-C58M2q99.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue?nuxt_component=async&nuxt_component_name=ProseOl&nuxt_component_export=default
var ProseOl_default = defineAsyncComponent(() => import('../build/ProseOl-C3ur9PFa.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue?nuxt_component=async&nuxt_component_name=ProseP&nuxt_component_export=default
var ProseP_default = defineAsyncComponent(() => import('../build/ProseP-f5vkmKwB.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProsePre.vue?nuxt_component=async&nuxt_component_name=ProsePre&nuxt_component_export=default
var ProsePre_default = defineAsyncComponent(() => import('../build/ProsePre-hIdhQr-P.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue?nuxt_component=async&nuxt_component_name=ProseScript&nuxt_component_export=default
var ProseScript_default = defineAsyncComponent(() => import('../build/ProseScript-BNP4X_ez.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue?nuxt_component=async&nuxt_component_name=ProseStrong&nuxt_component_export=default
var ProseStrong_default = defineAsyncComponent(() => import('../build/ProseStrong-WpixmRrG.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue?nuxt_component=async&nuxt_component_name=ProseTable&nuxt_component_export=default
var ProseTable_default = defineAsyncComponent(() => import('../build/ProseTable-B2Y_2fPV.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue?nuxt_component=async&nuxt_component_name=ProseTbody&nuxt_component_export=default
var ProseTbody_default = defineAsyncComponent(() => import('../build/ProseTbody-Di_iE5w5.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue?nuxt_component=async&nuxt_component_name=ProseTd&nuxt_component_export=default
var ProseTd_default = defineAsyncComponent(() => import('../build/ProseTd-BBcjXQR_.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue?nuxt_component=async&nuxt_component_name=ProseTh&nuxt_component_export=default
var ProseTh_default = defineAsyncComponent(() => import('../build/ProseTh-C42QIxGd.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue?nuxt_component=async&nuxt_component_name=ProseThead&nuxt_component_export=default
var ProseThead_default = defineAsyncComponent(() => import('../build/ProseThead-1cMCLgJA.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue?nuxt_component=async&nuxt_component_name=ProseTr&nuxt_component_export=default
var ProseTr_default = defineAsyncComponent(() => import('../build/ProseTr-CfIVhFh_.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxtjs+mdc@0.23.2_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magi_xfmxmfohkdv4xmpgufhldqsq2y/node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue?nuxt_component=async&nuxt_component_name=ProseUl&nuxt_component_export=default
var ProseUl_default = defineAsyncComponent(() => import('../build/ProseUl-PlfTtSH2.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@nuxt+icon@2.5.1_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magic-_hswihdylrjkfep5h5vodmfzxku/node_modules/@nuxt/icon/dist/runtime/components/index.js?nuxt_component=async&nuxt_component_name=Icon&nuxt_component_export=default
var components_default = defineAsyncComponent(() => Promise.resolve().then(function () { return componentsBTbrzBc; }).then((n) => n.n).then((r) => r["default"] || r.default || r));
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fcomponents.plugin.mjs
var lazyGlobalComponents = [
	["ProseA", ProseA_default],
	["ProseBlockquote", ProseBlockquote_default],
	["ProseCode", ProseCode_default],
	["ProseEm", ProseEm_default],
	["ProseH1", ProseH1_default],
	["ProseH2", ProseH2_default],
	["ProseH3", ProseH3_default],
	["ProseH4", ProseH4_default],
	["ProseH5", ProseH5_default],
	["ProseH6", ProseH6_default],
	["ProseHr", ProseHr_default],
	["ProseImg", ProseImg_default],
	["ProseLi", ProseLi_default],
	["ProseOl", ProseOl_default],
	["ProseP", ProseP_default],
	["ProsePre", ProsePre_default],
	["ProseScript", ProseScript_default],
	["ProseStrong", ProseStrong_default],
	["ProseTable", ProseTable_default],
	["ProseTbody", ProseTbody_default],
	["ProseTd", ProseTd_default],
	["ProseTh", ProseTh_default],
	["ProseThead", ProseThead_default],
	["ProseTr", ProseTr_default],
	["ProseUl", ProseUl_default],
	["Icon", components_default]
];
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fcomponents_plugin_default = defineNuxtPlugin({
	name: "nuxt:global-components",
	setup(nuxtApp) {
		for (const [name, component] of lazyGlobalComponents) {
			nuxtApp.vueApp.component(name, component);
			nuxtApp.vueApp.component("Lazy" + name, component);
		}
	}
});
//#endregion
//#region node_modules/.pnpm/@nuxt+icon@2.5.1_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_magic-_hswihdylrjkfep5h5vodmfzxku/node_modules/@nuxt/icon/dist/runtime/plugin.js
var plugin_default = defineNuxtPlugin({
	name: "@nuxt/icon",
	setup() {
		const configs = useRuntimeConfig();
		const options = useAppConfig().icon;
		const requestFetch = useRequestFetch();
		const nativeFetch = requestFetch.native;
		_api.setFetch((input, init) => {
			const nitroFetch = globalThis.$fetch?.native;
			return (nativeFetch || nitroFetch || globalThis.fetch)(input, init);
		});
		const resources = [];
		if (options.provider === "server") {
			const baseURL = configs.app?.baseURL?.replace(/\/$/, "") ?? "";
			resources.push(baseURL + (options.localApiEndpoint || "/api/_nuxt_icon"));
			if (options.fallbackToApi === true || options.fallbackToApi === "client-only") resources.push(options.iconifyApiEndpoint);
		} else if (options.provider === "none") _api.setFetch(() => Promise.resolve(new Response()));
		else resources.push(options.iconifyApiEndpoint);
		async function customIconLoader(icons, prefix) {
			try {
				const data = await requestFetch(resources[0] + "/" + prefix + ".json", { query: { icons: icons.join(",") } });
				if (!data || data.prefix !== prefix || !data.icons) throw new Error("Invalid data" + JSON.stringify(data));
				return data;
			} catch (e) {
				console.error("Failed to load custom icons", e);
				return null;
			}
		}
		addAPIProvider("", { resources });
		for (const prefix of options.customCollections || []) if (prefix) setCustomIconsLoader(customIconLoader, prefix);
	}
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fcolor-mode-options.mjs
var preference = "dark";
//#endregion
//#region node_modules/.pnpm/@nuxtjs+color-mode@4.0.1_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7._h6vqfgcms47owztyaaec2yznoq/node_modules/@nuxtjs/color-mode/dist/runtime/plugin.server.js
var plugin_server_default = defineNuxtPlugin((nuxtApp) => {
	const colorMode = nuxtApp.ssrContext?.islandContext ? ref({}).value : useState("color-mode", () => reactive({
		preference,
		value: preference,
		unknown: true,
		forced: false
	})).value;
	const htmlAttrs = {};
	useHead({ htmlAttrs });
	useRouter().afterEach((to) => {
		const forcedColorMode = to.meta.colorMode;
		if (forcedColorMode && forcedColorMode !== "system") {
			htmlAttrs["data-color-mode-forced"] = forcedColorMode;
			colorMode.value = forcedColorMode;
			colorMode.forced = true;
		} else if (forcedColorMode === "system") console.warn("You cannot force the colorMode to system at the page level.");
	});
	nuxtApp.provide("colorMode", colorMode);
});
var plugin = defineNuxtPlugin(async () => {
	return;
});
//#endregion
//#region node_modules/.pnpm/nuxt-seo-utils@9.0.0_3346dbkippwa2xoym7wparulvq/node_modules/nuxt-seo-utils/dist/runtime/app/plugins/1.absoluteImageUrls.server.js
var _1_absoluteImageUrls_server_default = defineNuxtPlugin({
	enforce: "post",
	setup() {
		const head = injectHead();
		if (!head) return;
		const resolver = createSitePathResolver({
			withBase: true,
			absolute: true,
			canonical: true
		});
		head.use({
			key: "absoluteImageUrls",
			hooks: { "tags:resolve": ({ tags }) => {
				for (const tag of tags) {
					if (tag.tag !== "meta") continue;
					if (tag.props.property !== "og:image:url" && tag.props.property !== "og:image" && tag.props.name !== "twitter:image" && tag.props.name !== "twitter:image:src") continue;
					if (typeof tag.props.content !== "string" || !tag.props.content.trim() || tag.props.content.startsWith("http") || tag.props.content.startsWith("//")) continue;
					tag.props.content = unref(resolver(tag.props.content));
				}
			} }
		});
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt-seo-utils@9.0.0_3346dbkippwa2xoym7wparulvq/node_modules/nuxt-seo-utils/dist/runtime/app/plugins/0.routeRules.js
function parseRouteRuleState(context) {
	const rules = context._nitro?.routeRules;
	return {
		head: rules?.head,
		seoMeta: rules?.seoMeta
	};
}
var _0_routeRules_default = defineNuxtPlugin({
	enforce: "post",
	env: { islands: false },
	setup() {
		const routeRuleState = useState("nuxt-seo-utils:routeRules", () => null);
		routeRuleState.value = parseRouteRuleState(useRequestEvent()?.context);
		if (routeRuleState.value) {
			const { head: headInput, seoMeta } = routeRuleState.value;
			if (headInput) useHead(headInput);
			if (seoMeta) useSeoMeta(seoMeta);
		}
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt-seo-utils@9.0.0_3346dbkippwa2xoym7wparulvq/node_modules/nuxt-seo-utils/dist/runtime/shared/canonicalUrl.js
var LOCALE_UNDERSCORE_RE$1 = /_/g;
var DEFAULT_LOCALE = "en";
function normaliseCanonicalUrl(url, { lowercase, locale }) {
	if (!lowercase) return url;
	const parsed = parseURL(url);
	if (parsed.host) parsed.host = parsed.host.toLowerCase();
	parsed.pathname = lowercasePath(parsed.pathname, locale);
	return stringifyParsedURL(parsed);
}
function lowercasePath(path, locale) {
	try {
		return path.toLocaleLowerCase(locale ? locale.replace(LOCALE_UNDERSCORE_RE$1, "-") : DEFAULT_LOCALE);
	} catch {
		return path.toLowerCase();
	}
}
function resolveCanonicalUrl(url, query, options) {
	const normalised = normaliseCanonicalUrl(url, options);
	const filteredQuery = Object.fromEntries(Object.entries(query).filter(([key]) => options.queryWhitelist.includes(key)).sort(([a], [b]) => a.localeCompare(b)));
	return Object.keys(filteredQuery).length ? `${normalised}?${stringifyQuery(filteredQuery)}` : normalised;
}
//#endregion
//#region node_modules/.pnpm/nuxt-seo-utils@9.0.0_3346dbkippwa2xoym7wparulvq/node_modules/nuxt-seo-utils/dist/runtime/app/logic/applyDefaults.js
var LOCALE_UNDERSCORE_RE = /_/g;
function applyDefaults() {
	const siteConfig = useSiteConfig({ resolveRefs: false });
	const resolveCurrentLocale = () => {
		return (toValue(siteConfig.currentLocale) || toValue(siteConfig.defaultLocale) || "en").replace(LOCALE_UNDERSCORE_RE, "-");
	};
	injectHead().use(TemplateParamsPlugin);
	const { canonicalQueryWhitelist, canonicalLowercase, tagPriority, separator, titleSeparator } = useRuntimeConfig().public["seo-utils"];
	const route = useRoute$1();
	const resolveUrl = createSitePathResolver({
		withBase: true,
		absolute: true
	});
	const err = useError();
	const resolveSeparator = () => toValue(siteConfig.separator) || separator || toValue(siteConfig.titleSeparator) || titleSeparator;
	const resolveTitleSeparator = () => toValue(siteConfig.titleSeparator) || titleSeparator || toValue(siteConfig.separator) || separator;
	const canonicalUrl = computed(() => {
		if (err.value) return false;
		return {
			rel: "canonical",
			href: resolveCanonicalUrl(resolveUrl(route.path || "/").value || route.path, route.query, {
				lowercase: canonicalLowercase,
				locale: resolveCurrentLocale(),
				queryWhitelist: canonicalQueryWhitelist
			})
		};
	});
	const minimalPriority = { tagPriority: "low" };
	const seoMetaPriority = { tagPriority };
	useHead({
		htmlAttrs: { lang: resolveCurrentLocale },
		templateParams: {
			site: () => siteConfig,
			siteName: () => siteConfig.name,
			separator: resolveSeparator,
			titleSeparator: resolveTitleSeparator
		},
		titleTemplate: () => err.value ? "%s" : "%s %separator %siteName",
		link: [() => canonicalUrl.value]
	}, minimalPriority);
	useSeoMeta({ ogLocale: () => {
		const locale = resolveCurrentLocale();
		if (locale) {
			const l = locale.replace("-", "_");
			if (l.includes("_")) return l;
		}
		return false;
	} }, minimalPriority);
	const seoMeta = {
		ogType: "website",
		ogSiteName: siteConfig.name
	};
	if (siteConfig.description) useSeoMeta({ description: siteConfig.description }, minimalPriority);
	if (siteConfig.twitter) {
		const id = siteConfig.twitter.startsWith("@") ? siteConfig.twitter : `@${siteConfig.twitter}`;
		seoMeta.twitterCreator = id;
		seoMeta.twitterSite = id;
	}
	useSeoMeta(seoMeta, seoMetaPriority);
	useHead({ meta: [{
		property: "og:url",
		content: () => {
			const url = canonicalUrl.value;
			return url ? url.href : false;
		},
		key: OG_URL_KEY
	}] }, seoMetaPriority);
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fplugins.server.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default = [
	_0_siteConfig_default,
	plugin$3,
	plugin$2,
	plugin$1,
	md_alternate_server_default,
	md_hints_prerender_default,
	siteConfig_default,
	inferSeoMetaPlugin_default,
	titles_default,
	derivedTags_default,
	init_default,
	defaults_default$1,
	og_image_canonical_urls_server_default,
	route_rule_og_image_server_default,
	robot_meta_server_default,
	virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fcomponents_plugin_default,
	plugin_default,
	plugin_server_default,
	plugin,
	_1_absoluteImageUrls_server_default,
	_0_routeRules_default,
	defineNuxtPlugin({
		name: "nuxt-seo:defaults",
		order: 999,
		env: { islands: false },
		setup() {
			applyDefaults();
		}
	})
];
//#endregion
//#region components/layout/ScrollProgress.vue?vue&type=script&setup=true&lang.ts
var ScrollProgress_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ScrollProgress",
	__ssrInlineRender: true,
	setup(__props) {
		const progress = ref(0);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-transparent" }, _attrs))}><div class="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 transition-all duration-75 shadow-[0_0_12px_rgba(245,158,11,0.7)]" style="${ssrRenderStyle({ width: `${unref(progress)}%` })}"></div></div>`);
		};
	}
});
//#endregion
//#region components/layout/ScrollProgress.vue
var _sfc_setup$9 = ScrollProgress_vue_vue_type_script_setup_true_lang_default.setup;
ScrollProgress_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/ScrollProgress.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var ScrollProgress_default = Object.assign(ScrollProgress_vue_vue_type_script_setup_true_lang_default, { __name: "LayoutScrollProgress" });
//#endregion
//#region node_modules/.pnpm/@nuxtjs+color-mode@4.0.1_@nuxt+schema@4.6.1_confbox@0.3.1_dotenv@17.4.2_giget@3.3.1_jiti@2.7._h6vqfgcms47owztyaaec2yznoq/node_modules/@nuxtjs/color-mode/dist/runtime/composables.js
var useColorMode = () => {
	return useState("color-mode").value;
};
//#endregion
//#region components/layout/AppHeader.vue?vue&type=script&setup=true&lang.ts
var AppHeader_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppHeader",
	__ssrInlineRender: true,
	emits: ["openPalette", "toggleMobileMenu"],
	setup(__props) {
		const colorMode = useColorMode();
		const isScrolled = ref(false);
		const activeSection = ref("hero");
		const navItems = [
			{
				num: "01",
				name: "Profile",
				href: "/#hero",
				id: "hero"
			},
			{
				num: "03",
				name: "Experience",
				href: "/#experience",
				id: "experience"
			},
			{
				num: "05",
				name: "Projects",
				href: "/#projects",
				id: "projects"
			},
			{
				num: "06",
				name: "Stack",
				href: "/#tech-stack",
				id: "tech-stack"
			},
			{
				num: "08",
				name: "Writing",
				href: "/#blog",
				id: "blog"
			},
			{
				num: "09",
				name: "Activity",
				href: "/#github",
				id: "github"
			},
			{
				num: "10",
				name: "Contact",
				href: "/#contact",
				id: "contact"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_Icon = components_default$1;
			_push(`<header${ssrRenderAttrs(mergeProps({ class: ["fixed top-0 left-0 right-0 z-40 transition-all duration-300", unref(isScrolled) ? "glass-nav shadow-lg" : "bg-transparent py-2"] }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "group flex items-center gap-3"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<div class="w-10 h-10 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-amber-400 group-hover:border-amber-400 transition-colors shadow-md"${_scopeId}> AO<span class="text-amber-500 text-xs animate-pulse"${_scopeId}>•</span></div><div class="flex flex-col"${_scopeId}><span class="font-extrabold tracking-tight text-sm sm:text-base text-(--text-primary) group-hover:text-amber-400 transition-colors"${_scopeId}> Ashly Omanada </span><span class="text-[11px] font-mono text-slate-400 hidden sm:inline"${_scopeId}> Full-Stack Developer </span></div>`);
					else return [createVNode("div", { class: "w-10 h-10 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-amber-400 group-hover:border-amber-400 transition-colors shadow-md" }, [createTextVNode(" AO"), createVNode("span", { class: "text-amber-500 text-xs animate-pulse" }, "•")]), createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "font-extrabold tracking-tight text-sm sm:text-base text-(--text-primary) group-hover:text-amber-400 transition-colors" }, " Ashly Omanada "), createVNode("span", { class: "text-[11px] font-mono text-slate-400 hidden sm:inline" }, " Full-Stack Developer ")])];
				}),
				_: 1
			}, _parent));
			_push(`<nav class="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 dark:bg-slate-900/80 border border-slate-800 text-xs font-medium backdrop-blur-md"><!--[-->`);
			ssrRenderList(navItems, (item) => {
				_push(`<a${ssrRenderAttr("href", item.href)} class="${ssrRenderClass([unref(activeSection) === item.id ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30" : "", "px-3 py-1.5 rounded-full transition-colors text-slate-300 hover:text-white hover:bg-slate-800"])}"><span class="font-mono text-[10px] text-amber-500 mr-1">${ssrInterpolate(item.num)}</span> ${ssrInterpolate(item.name)}</a>`);
			});
			_push(`<!--]--></nav><div class="flex items-center gap-2 sm:gap-3"><button type="button" class="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all cursor-pointer" aria-label="Open Command Palette">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "heroicons:magnifying-glass",
				class: "w-3.5 h-3.5 text-amber-400"
			}, null, _parent));
			_push(`<span class="hidden md:inline">Commands</span><kbd class="font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-slate-400">⌘K</kbd></button><button type="button" class="p-2 text-slate-300 hover:text-amber-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all cursor-pointer"${ssrRenderAttr("aria-label", `Switch to ${unref(colorMode).value === "dark" ? "light" : "dark"} mode`)}>`);
			_push(ssrRenderComponent(_component_Icon, {
				name: unref(colorMode).value === "dark" ? "heroicons:sun" : "heroicons:moon",
				class: "w-4 h-4 transition-transform duration-300 hover:rotate-45"
			}, null, _parent));
			_push(`</button><button type="button" class="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all" aria-label="Toggle mobile menu">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "heroicons:bars-3",
				class: "w-5 h-5"
			}, null, _parent));
			_push(`</button></div></div></header>`);
		};
	}
});
//#endregion
//#region components/layout/AppHeader.vue
var _sfc_setup$8 = AppHeader_vue_vue_type_script_setup_true_lang_default.setup;
AppHeader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/AppHeader.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var AppHeader_default = Object.assign(AppHeader_vue_vue_type_script_setup_true_lang_default, { __name: "LayoutAppHeader" });
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/route-provider.js
var defineRouteProvider = (name = "RouteProvider") => defineComponent({
	name,
	props: {
		route: {
			type: Object,
			required: true
		},
		vnode: Object,
		vnodeRef: Object,
		renderKey: String,
		trackRootNodes: Boolean,
		routeRecord: Object
	},
	setup(props) {
		const previousKey = props.renderKey;
		const previousRoute = props.route;
		const route = {};
		for (const key in props.route) Object.defineProperty(route, key, {
			get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
			enumerable: true
		});
		provide(PageRouteSymbol, shallowReactive(route));
		return () => {
			if (!props.vnode) return props.vnode;
			return h(props.vnode, { ref: props.vnodeRef });
		};
	}
});
var RouteProvider = defineRouteProvider();
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/pages/runtime/page.js
var page_default = defineComponent({
	name: "NuxtPage",
	inheritAttrs: false,
	props: {
		name: { type: String },
		transition: {
			type: [Boolean, Object],
			default: void 0
		},
		keepalive: {
			type: [Boolean, Object],
			default: void 0
		},
		route: { type: Object },
		pageKey: {
			type: [Function, String],
			default: null
		}
	},
	setup(props, { attrs, slots, expose }) {
		const nuxtApp = useNuxtApp();
		const pageRef = ref();
		inject(PageRouteSymbol, null);
		expose({ pageRef });
		inject(LayoutMetaSymbol, null);
		nuxtApp.deferHydration();
		return () => {
			return h(RouterView, {
				name: props.name,
				route: props.route,
				...attrs
			}, { default: markStableSlot((routeProps) => {
				return h(Suspense, { suspensible: true }, { default() {
					return h(RouteProvider, {
						vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
						route: routeProps.route,
						vnodeRef: pageRef
					});
				} });
			}) });
		};
	}
});
function markStableSlot(fn) {
	const wrapped = ((routeProps) => {
		const result = fn(routeProps);
		if (Array.isArray(result)) return result;
		if (result == null || !isVNode(result)) return [createCommentVNode()];
		return [result];
	});
	wrapped._n = true;
	return wrapped;
}
function normalizeSlot(slot, data) {
	const slotContent = slot(data);
	return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
//#endregion
//#region content/profile.ts
var profile = {
	name: "Ashly Omanada",
	title: "Full-Stack Developer",
	location: "Calapan City, Philippines",
	timezone: "Asia/Manila (UTC+8)",
	status: {
		available: true,
		label: "Open to Opportunities",
		subtext: "Available for full-time engineering roles & high-impact contracts"
	},
	roles: [
		"Full-Stack Developer",
		"Vue & Nuxt Specialist",
		"TypeScript & Node.js Engineer",
		"Real-Time & WebRTC Explorer",
		"API & System Architect"
	],
	bio: {
		short: "Passionate full-stack developer dedicated to building high-performance, resilient web applications with modern architectures. I transform complex operational challenges into elegant, intuitive digital experiences.",
		full: ["With a solid engineering foundation across modern frontend frameworks and robust backend services, I specialize in crafting full-cycle web applications that balance speed, accessibility, and visual precision.", "From mission-critical institutional dashboards to consumer-facing mobile platforms, I bridge the gap between user-first visual polish and hardened server-side architecture."],
		valueStatement: "Building performant, scalable web applications with pixel perfection, resilient APIs, and thoughtful developer ergonomics."
	},
	avatar: "/images/portrait.png",
	aboutImage: "/images/about.jpg",
	resumeUrl: "/resume.pdf",
	socials: {
		github: "https://github.com/ashlyomanada",
		linkedin: "https://linkedin.com/in/ashly-omanada",
		email: "ashlyomanada.dev@gmail.com",
		twitter: "https://x.com/ashlyomanada",
		instagram: "https://instagram.com/ashlyomanada"
	},
	bento: [
		{
			id: "current-focus",
			type: "focus",
			title: "Current Focus",
			content: "Nuxt 4, Distributed Systems & Edge Functions",
			detail: "Architecting ultra-low latency real-time interfaces with WebRTC and PostgreSQL.",
			icon: "heroicons:sparkles"
		},
		{
			id: "location-time",
			type: "location",
			title: "Based In",
			content: "Calapan City, PH",
			detail: "UTC+8 timezone • Remote ready globally",
			icon: "heroicons:map-pin"
		},
		{
			id: "stack-highlight",
			type: "stack",
			title: "Core Philosophy",
			content: "Speed, Type-Safety & User Empathy",
			detail: "Zero compromise on web vitals, keyboard ergonomics, and design craft.",
			icon: "heroicons:code-bracket"
		},
		{
			id: "fun-fact",
			type: "funFact",
			title: "Beyond the Screen",
			content: "Espresso brewer & mechanical keyboard enthusiast",
			detail: "Believes great software is as much about taste as it is about clean tests.",
			icon: "heroicons:heart"
		}
	],
	stats: [
		{
			label: "Years Building",
			value: 3,
			suffix: "+",
			description: "Hands-on production & freelance engineering experience"
		},
		{
			label: "Projects Delivered",
			value: 12,
			suffix: "+",
			description: "From enterprise evaluation portals to interactive apps"
		},
		{
			label: "Technologies Mastered",
			value: 18,
			suffix: "+",
			description: "Full-stack languages, libraries, databases & cloud tools"
		},
		{
			label: "Code Quality Score",
			value: 99,
			suffix: "%",
			description: "Consistently high Lighthouse performance & accessibility marks"
		}
	],
	experiences: [{
		id: "exp-1",
		role: "Full-Stack Developer (Contract / Capstone Lead)",
		company: "PNP MIMAROPA — Regional Evaluation Unit",
		location: "Calapan City / Hybrid",
		period: "2024 — 2025",
		current: true,
		description: "Led the architectural design and full-stack development of the EUPER (Unit Performance Evaluation) system, supporting data-driven rank forecasting across provincial police divisions.",
		impactBullets: [
			"Designed dual admin & client evaluation portals servicing hundreds of officer rating submissions with sub-100ms response times.",
			"Engineered automated ranking calculations and predictive score models, reducing manual report compilation overhead by 70%.",
			"Implemented interactive visualization dashboards with Vue.js, dynamic charts, and audit-compliant report generation."
		],
		technologies: [
			"Vue.js",
			"CodeIgniter 4",
			"MySQL",
			"Bootstrap",
			"REST APIs"
		],
		metrics: {
			label: "Evaluation speedup",
			value: "70%"
		}
	}, {
		id: "exp-2",
		role: "Frontend & Full-Stack Freelance Engineer",
		company: "Independent Engineering",
		location: "Remote",
		period: "2023 — Present",
		current: false,
		description: "Delivered bespoke web solutions, responsive client storefronts, and web portals for small business clients and digital startups.",
		impactBullets: [
			"Developed tailored brand web applications (Kapares Resto, Bundat Burgers) featuring interactive menu navigators and streamlined order inquiry paths.",
			"Built MovieTuneApp, integrating third-party movie metadata APIs and dynamic watchlists with responsive mobile layouts.",
			"Maintained 100% mobile responsiveness and cross-browser stability across all delivered client web properties."
		],
		technologies: [
			"Vue.js",
			"React",
			"Tailwind CSS",
			"TypeScript",
			"Node.js"
		],
		metrics: {
			label: "Client satisfaction",
			value: "100%"
		}
	}],
	education: [{
		id: "edu-1",
		degree: "Bachelor of Science in Information Technology",
		institution: "Mindoro State University (MinSU)",
		period: "2021 — 2025",
		location: "Oriental Mindoro, Philippines",
		description: "Focused on Software Engineering, Database Systems, Web Architectures, and Human-Computer Interaction.",
		honors: "Capstone Project Distinction",
		highlights: [
			"Capstone Lead for the PNP MIMAROPA Regional Evaluation platform",
			"Top project recognition for operational utility and data visualization excellence",
			"Active mentor in collegiate programming circles and web workshops"
		]
	}],
	projects: [
		{
			slug: "euper-system",
			title: "EUPER Police Evaluation Platform",
			tagline: "Automated ranking, predictive performance scoring, and institutional intelligence for PNP MIMAROPA.",
			summary: "A mission-critical evaluation platform enabling senior commanding officers to assess police units across municipal and provincial levels with real-time analytics and predictive performance analytics.",
			coverImage: "/projects/capstone1.png",
			featured: true,
			category: "Full-Stack",
			technologies: [
				"Vue.js",
				"CodeIgniter 4",
				"MySQL",
				"Bootstrap 5",
				"REST APIs"
			],
			liveUrl: "https://euper.netlify.app/",
			repoUrl: "https://github.com/ashlyomanada",
			problem: "Regional police evaluation historically relied on fragmented paper scorecards and delayed spreadsheet submissions, causing significant review lag and human collation error.",
			role: "Full-Stack Architect & Lead Developer",
			architecture: "Modular Vue.js SPA frontend consuming normalized REST endpoints via a secure CodeIgniter 4 backend with role-based access control (RBAC) and indexed MySQL tables.",
			outcome: "Reduced report turnaround time from weeks to seconds, providing real-time ranking transparency and automated deadline enforcement across all participating units.",
			keyFeatures: [
				"Dual-portal architecture: Granular admin evaluation management + public unit rating viewer",
				"Real-time automated score weighting and predictive performance categorization",
				"One-click audit report export and compliance dashboard visualizations"
			]
		},
		{
			slug: "movietune-app",
			title: "MovieTune Streaming Discovery",
			tagline: "High-speed movie exploration, dynamic filtering, and curated watchlist management.",
			summary: "A sleek entertainment catalog web application that enables users to discover trending releases, preview trailers, inspect cast filmographies, and organize personalized watchlists.",
			coverImage: "/projects/movietune.png",
			featured: false,
			category: "Frontend",
			technologies: [
				"React 19",
				"Tailwind CSS",
				"TMDB API",
				"Vite"
			],
			liveUrl: "https://movietuneapp4u.netlify.app/",
			repoUrl: "https://github.com/ashlyomanada/movietuneapp",
			problem: "Modern streaming viewers struggle with discovery fatigue across fragmented movie catalogs without quick access to trailers and ratings.",
			role: "Frontend Engineer",
			architecture: "React client with asynchronous data fetching, client-side caching, fluid debounced search, and responsive grid layouts.",
			outcome: "Achieved sub-100ms search interactions and an intuitive, mobile-friendly browsing experience.",
			keyFeatures: [
				"Real-time debounced movie and actor querying",
				"Interactive trailer player modals and rating breakdowns",
				"Local storage persistence for offline watchlist tracking"
			]
		},
		{
			slug: "kapares-resto",
			title: "Kapares Comfort Dining",
			tagline: "Warm culinary showcase and digital storefront for authentic Filipino cuisine.",
			summary: "A warm, appetizing brand website designed for a specialty pares house, presenting signature items, combo promotions, and inquiry pathways.",
			coverImage: "/projects/kapares.png",
			featured: false,
			category: "Frontend",
			technologies: [
				"HTML5",
				"CSS3",
				"JavaScript",
				"Responsive UI"
			],
			liveUrl: "https://ashlyomanada.github.io/kapares-resto/",
			repoUrl: "https://github.com/ashlyomanada/kapares-resto",
			problem: "Local food businesses need immediate visual appeal and simple mobile menus without relying exclusively on third-party delivery apps.",
			role: "UI Designer & Web Developer",
			architecture: "Lightweight semantic HTML5 structure with hand-crafted CSS variables and smooth interactive navigation.",
			outcome: "Delivered a 100/100 Lighthouse performance rating with instant load times on low-bandwidth mobile connections.",
			keyFeatures: [
				"Mouthwatering visual menu showcases with pricing tiers",
				"Location and operating hour indicators with direct message links",
				"Mobile-first responsive layout optimized for smartphone browsing"
			]
		},
		{
			slug: "bundat-burger-shop",
			title: "Bundat Street Burgers",
			tagline: "Bold, street-style burger shop website with dynamic combo menus and punchy brand visuals.",
			summary: "An energetic showcase for an artisanal burger brand, combining punchy typography, combo cards, and direct order engagement.",
			coverImage: "/projects/bundat.png",
			featured: false,
			category: "Frontend",
			technologies: [
				"HTML5",
				"CSS3",
				"Modern Typography",
				"Mobile UI"
			],
			liveUrl: "https://ashlyomanada.github.io/bundat-burger-shop/",
			repoUrl: "https://github.com/ashlyomanada/bundat-burger-shop",
			problem: "Street-food brands require high-impact visual identity to stand out from generic food court options.",
			role: "Frontend Developer",
			architecture: "Minimalist, zero-framework architecture ensuring maximum reliability and zero maintenance overhead.",
			outcome: "Elevated the shop’s local brand presence and streamlined menu browsing for hungry patrons.",
			keyFeatures: [
				"High-contrast street-aesthetic layout with prominent calls to action",
				"Categorized signature burgers, sides, and beverage sections",
				"Instant mobile touch target optimization for quick navigation"
			]
		}
	],
	techStack: [
		{
			name: "TypeScript",
			category: "Languages",
			proficiency: "Advanced",
			icon: "logos:typescript-icon",
			highlight: true
		},
		{
			name: "JavaScript (ESNext)",
			category: "Languages",
			proficiency: "Expert",
			icon: "logos:javascript",
			highlight: true
		},
		{
			name: "PHP 8+",
			category: "Languages",
			proficiency: "Advanced",
			icon: "logos:php",
			highlight: true
		},
		{
			name: "SQL",
			category: "Languages",
			proficiency: "Advanced",
			icon: "carbon:sql",
			highlight: false
		},
		{
			name: "HTML5 & Semantic Web",
			category: "Languages",
			proficiency: "Expert",
			icon: "logos:html-5",
			highlight: false
		},
		{
			name: "CSS3 / Modern Layouts",
			category: "Languages",
			proficiency: "Expert",
			icon: "logos:css-3",
			highlight: false
		},
		{
			name: "Vue.js (Vue 3 / Composition)",
			category: "Frontend",
			proficiency: "Expert",
			icon: "logos:vue",
			highlight: true
		},
		{
			name: "Nuxt 4 / Nuxt 3",
			category: "Frontend",
			proficiency: "Advanced",
			icon: "logos:nuxt-icon",
			highlight: true
		},
		{
			name: "React 19",
			category: "Frontend",
			proficiency: "Advanced",
			icon: "logos:react",
			highlight: true
		},
		{
			name: "Tailwind CSS v4",
			category: "Frontend",
			proficiency: "Expert",
			icon: "logos:tailwindcss-icon",
			highlight: true
		},
		{
			name: "Vite",
			category: "Frontend",
			proficiency: "Advanced",
			icon: "logos:vitejs",
			highlight: false
		},
		{
			name: "Pinia / State Management",
			category: "Frontend",
			proficiency: "Advanced",
			icon: "logos:pinia",
			highlight: false
		},
		{
			name: "Node.js",
			category: "Backend",
			proficiency: "Advanced",
			icon: "logos:nodejs-icon",
			highlight: true
		},
		{
			name: "CodeIgniter 4",
			category: "Backend",
			proficiency: "Advanced",
			icon: "logos:codeigniter-icon",
			highlight: true
		},
		{
			name: "Laravel",
			category: "Backend",
			proficiency: "Intermediate",
			icon: "logos:laravel",
			highlight: true
		},
		{
			name: "RESTful API Architecture",
			category: "Backend",
			proficiency: "Advanced",
			icon: "carbon:api",
			highlight: true
		},
		{
			name: "Sequelize / ORMs",
			category: "Backend",
			proficiency: "Intermediate",
			icon: "logos:sequelize",
			highlight: false
		},
		{
			name: "PostgreSQL",
			category: "Database",
			proficiency: "Advanced",
			icon: "logos:postgresql",
			highlight: true
		},
		{
			name: "MySQL / MariaDB",
			category: "Database",
			proficiency: "Advanced",
			icon: "logos:mysql-icon",
			highlight: true
		},
		{
			name: "Redis (Caching)",
			category: "Database",
			proficiency: "Intermediate",
			icon: "logos:redis",
			highlight: false
		},
		{
			name: "Docker & Containers",
			category: "DevOps/Cloud",
			proficiency: "Intermediate",
			icon: "logos:docker-icon",
			highlight: true
		},
		{
			name: "WebRTC / Real-Time Audio-Video",
			category: "DevOps/Cloud",
			proficiency: "Intermediate",
			icon: "logos:webrtc",
			highlight: true
		},
		{
			name: "Capacitor (Mobile Apps)",
			category: "DevOps/Cloud",
			proficiency: "Intermediate",
			icon: "logos:capacitorjs-icon",
			highlight: true
		},
		{
			name: "Git & GitHub Actions",
			category: "DevOps/Cloud",
			proficiency: "Advanced",
			icon: "logos:git-icon",
			highlight: false
		},
		{
			name: "Netlify & Vercel Deployments",
			category: "DevOps/Cloud",
			proficiency: "Advanced",
			icon: "logos:netlify-icon",
			highlight: false
		},
		{
			name: "VS Code & Ergonomics",
			category: "Tools",
			proficiency: "Expert",
			icon: "logos:visual-studio-code",
			highlight: false
		},
		{
			name: "Postman & Hoppscotch",
			category: "Tools",
			proficiency: "Advanced",
			icon: "logos:postman-icon",
			highlight: false
		},
		{
			name: "Figma (UI Design & Specs)",
			category: "Tools",
			proficiency: "Intermediate",
			icon: "logos:figma",
			highlight: false
		},
		{
			name: "Zod & Schema Validation",
			category: "Tools",
			proficiency: "Advanced",
			icon: "carbon:data-structured",
			highlight: false
		}
	],
	certifications: [
		{
			id: "cert-1",
			title: "Full-Stack Web Development Specialization",
			issuer: "DICT / National ICT Competency Certification",
			issueDate: "2024",
			credentialUrl: "https://example.com/certificate/fullstack",
			badgeIcon: "heroicons:academic-cap",
			skillsCovered: [
				"Vue.js",
				"REST Architecture",
				"Database Normalization",
				"Application Security"
			]
		},
		{
			id: "cert-2",
			title: "Modern Frontend Engineering with Vue & TypeScript",
			issuer: "Vue Mastery / Frontend Academy",
			issueDate: "2024",
			credentialUrl: "https://example.com/certificate/vue-ts",
			badgeIcon: "heroicons:check-badge",
			skillsCovered: [
				"Composition API",
				"Nuxt SSR",
				"Pinia",
				"TypeScript Generics"
			]
		},
		{
			id: "cert-3",
			title: "Relational Database Design & Query Optimization",
			issuer: "Oracle Academy / University Certification",
			issueDate: "2023",
			credentialUrl: "https://example.com/certificate/databases",
			badgeIcon: "heroicons:server-stack",
			skillsCovered: [
				"PostgreSQL",
				"MySQL",
				"Indexing Strategies",
				"ACID Transactions"
			]
		}
	]
};
//#endregion
//#region components/layout/AppFooter.vue?vue&type=script&setup=true&lang.ts
var AppFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppFooter",
	__ssrInlineRender: true,
	setup(__props) {
		const currentTime = ref("");
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_Icon = components_default$1;
			_push(`<footer${ssrRenderAttrs(mergeProps({ class: "mt-24 border-t border-slate-800/80 bg-slate-950/70 text-slate-400 text-sm" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><div class="grid grid-cols-1 md:grid-cols-4 gap-10"><div class="md:col-span-2 space-y-4"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-xl bg-slate-900 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-amber-400"> AO </div><span class="font-bold text-lg text-slate-100">Ashly Omanada</span></div><p class="text-slate-400 max-w-sm text-sm leading-relaxed"> Full-stack developer building resilient web applications, modern distributed architectures, and intuitive digital interfaces. </p><div class="flex items-center gap-2 text-xs font-mono text-slate-400"><span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span><span>Calapan City, PH (UTC+8) • ${ssrInterpolate(unref(currentTime))}</span></div></div><div><h4 class="font-mono text-xs uppercase tracking-wider text-amber-500 font-semibold mb-3">Navigation</h4><ul class="space-y-2 text-xs"><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/#hero",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`01 — Profile`);
					else return [createTextVNode("01 — Profile")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/#experience",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`03 — Experience`);
					else return [createTextVNode("03 — Experience")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/#projects",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`05 — Projects`);
					else return [createTextVNode("05 — Projects")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/#tech-stack",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`06 — Tech Stack`);
					else return [createTextVNode("06 — Tech Stack")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/#blog",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`08 — Blog`);
					else return [createTextVNode("08 — Blog")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/#contact",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`10 — Contact`);
					else return [createTextVNode("10 — Contact")];
				}),
				_: 1
			}, _parent));
			_push(`</li></ul></div><div><h4 class="font-mono text-xs uppercase tracking-wider text-amber-500 font-semibold mb-3">Deep Dives</h4><ul class="space-y-2 text-xs mb-4"><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/projects",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`All Projects`);
					else return [createTextVNode("All Projects")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/tech-stack",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Interactive Tech Stack`);
					else return [createTextVNode("Interactive Tech Stack")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/certifications",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Certifications &amp; Honors`);
					else return [createTextVNode("Certifications & Honors")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/gallery",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Gallery &amp; Workspace`);
					else return [createTextVNode("Gallery & Workspace")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/uses",
				class: "hover:text-amber-400 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Uses &amp; Ergonomics`);
					else return [createTextVNode("Uses & Ergonomics")];
				}),
				_: 1
			}, _parent));
			_push(`</li></ul><div class="flex items-center gap-3"><a${ssrRenderAttr("href", unref(profile).socials.github)} target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-slate-900 hover:text-amber-400 transition-colors border border-slate-800" aria-label="GitHub">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "logos:github-icon",
				class: "w-4 h-4"
			}, null, _parent));
			_push(`</a><a${ssrRenderAttr("href", unref(profile).socials.linkedin)} target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-slate-900 hover:text-amber-400 transition-colors border border-slate-800" aria-label="LinkedIn">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "logos:linkedin-icon",
				class: "w-4 h-4"
			}, null, _parent));
			_push(`</a><a${ssrRenderAttr("href", `mailto:${unref(profile).socials.email}`)} class="p-2 rounded-lg bg-slate-900 hover:text-amber-400 transition-colors border border-slate-800 text-amber-400" aria-label="Email">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "heroicons:envelope",
				class: "w-4 h-4"
			}, null, _parent));
			_push(`</a></div></div></div><div class="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500"><div> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Ashly Omanada. All rights reserved. </div><div class="flex items-center gap-4"><span>Built with Nuxt 4 &amp; Tailwind CSS v4</span><button type="button" class="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer" aria-label="Scroll back to top"><span>Back to top</span>`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "heroicons:arrow-up",
				class: "w-3.5 h-3.5"
			}, null, _parent));
			_push(`</button></div></div></div></footer>`);
		};
	}
});
//#endregion
//#region components/layout/AppFooter.vue
var _sfc_setup$7 = AppFooter_vue_vue_type_script_setup_true_lang_default.setup;
AppFooter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/AppFooter.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var AppFooter_default = Object.assign(AppFooter_vue_vue_type_script_setup_true_lang_default, { __name: "LayoutAppFooter" });
//#endregion
//#region \0virtual:public?%2Fimages%2Fportrait.png
var _virtual_public__2Fimages_2Fportrait_default = publicAssetsURL("/images/portrait.png");
//#endregion
//#region components/interactive/AskAshlyChat.vue?vue&type=script&setup=true&lang.ts
var AskAshlyChat_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AskAshlyChat",
	__ssrInlineRender: true,
	setup(__props) {
		const isOpen = ref(false);
		const inputQuery = ref("");
		const isLoading = ref(false);
		ref(null);
		const messages = ref([]);
		const quickPrompts = [
			"What is Ashly’s flagship project?",
			"What is his primary tech stack?",
			"Is Ashly open for hire?",
			"Tell me about the EUPER system"
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Icon = components_default$1;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-6 right-6 z-40" }, _attrs))}>`);
			if (!unref(isOpen)) {
				_push(`<button type="button" class="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900 border border-amber-500/40 text-white shadow-2xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer" aria-label="Open Ask Ashly AI Assistant"><div class="relative flex items-center justify-center"><span class="absolute w-3 h-3 rounded-full bg-amber-400 animate-ping opacity-75"></span><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span></div>`);
				_push(ssrRenderComponent(_component_Icon, {
					name: "heroicons:chat-bubble-bottom-center-text",
					class: "w-5 h-5 text-amber-400"
				}, null, _parent));
				_push(`<span class="text-sm font-semibold tracking-wide">Ask Ashly <span class="text-xs text-amber-400 font-mono">AI</span></span></button>`);
			} else _push(`<!---->`);
			if (unref(isOpen)) {
				_push(`<div class="w-[360px] sm:w-[400px] h-[520px] max-h-[85vh] rounded-2xl glass-panel bg-slate-950/95 border border-amber-500/30 shadow-2xl flex flex-col overflow-hidden text-slate-100"><div class="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between"><div class="flex items-center gap-3"><div class="relative"><img${ssrRenderAttr("src", _virtual_public__2Fimages_2Fportrait_default)} alt="Ashly Avatar" class="w-8 h-8 rounded-full object-cover border border-amber-500/40"><span class="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900"></span></div><div><div class="text-sm font-semibold flex items-center gap-1.5"><span>Ask Ashly</span><span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">AI</span></div><div class="text-[11px] text-slate-400">Grounded in verified profile data</div></div></div><button type="button" class="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" aria-label="Close Chat">`);
				_push(ssrRenderComponent(_component_Icon, {
					name: "heroicons:x-mark",
					class: "w-5 h-5"
				}, null, _parent));
				_push(`</button></div><div class="flex-1 p-4 overflow-y-auto space-y-3 text-sm"><div class="flex items-start gap-2.5"><div class="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-amber-500/30"> A </div><div class="p-3 rounded-2xl rounded-tl-sm bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed text-xs sm:text-sm"> Hi! I&#39;m Ashly&#39;s AI assistant. Ask me anything about his flagship projects (like EUPER), full-stack architecture, or current availability! </div></div>`);
				if (unref(messages).length === 0) {
					_push(`<div class="pt-2 flex flex-wrap gap-1.5"><!--[-->`);
					ssrRenderList(quickPrompts, (chip) => {
						_push(`<button type="button" class="text-xs px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-amber-500/10 hover:text-amber-300 text-slate-300 border border-slate-800 hover:border-amber-500/40 transition-colors text-left">${ssrInterpolate(chip)}</button>`);
					});
					_push(`<!--]--></div>`);
				} else _push(`<!---->`);
				_push(`<!--[-->`);
				ssrRenderList(unref(messages), (msg, i) => {
					_push(`<div class="${ssrRenderClass([msg.role === "user" ? "flex-row-reverse" : "", "flex items-start gap-2.5"])}">`);
					if (msg.role === "assistant") _push(`<div class="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-amber-500/30"> A </div>`);
					else _push(`<!---->`);
					_push(`<div class="${ssrRenderClass([msg.role === "user" ? "rounded-tr-sm bg-amber-500 text-slate-950 font-medium" : "rounded-tl-sm bg-slate-900 border border-slate-800 text-slate-200", "p-3 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%]"])}">${ssrInterpolate(msg.content)}</div></div>`);
				});
				_push(`<!--]-->`);
				if (unref(isLoading)) _push(`<div class="flex items-center gap-2 text-slate-400 text-xs"><div class="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold border border-amber-500/30"> A </div><div class="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce"></span><span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]"></span><span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></span></div></div>`);
				else _push(`<!---->`);
				_push(`</div><div class="p-3 bg-slate-900/90 border-t border-slate-800"><form class="flex items-center gap-2"><input${ssrRenderAttr("value", unref(inputQuery))} type="text" placeholder="Ask about Ashly&#39;s work..." class="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""}><button type="submit" class="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-50 transition-colors flex-shrink-0"${ssrIncludeBooleanAttr(unref(isLoading) || !unref(inputQuery).trim()) ? " disabled" : ""} aria-label="Send message">`);
				_push(ssrRenderComponent(_component_Icon, {
					name: "heroicons:paper-airplane",
					class: "w-4 h-4"
				}, null, _parent));
				_push(`</button></form></div></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region components/interactive/AskAshlyChat.vue
var _sfc_setup$6 = AskAshlyChat_vue_vue_type_script_setup_true_lang_default.setup;
AskAshlyChat_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/interactive/AskAshlyChat.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var AskAshlyChat_default = Object.assign(AskAshlyChat_vue_vue_type_script_setup_true_lang_default, { __name: "InteractiveAskAshlyChat" });
//#endregion
//#region components/interactive/CommandPalette.vue?vue&type=script&setup=true&lang.ts
var CommandPalette_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CommandPalette",
	__ssrInlineRender: true,
	emits: ["toast"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const router = useRouter();
		const colorMode = useColorMode();
		const isOpen = ref(false);
		const query = ref("");
		const activeIndex = ref(0);
		const inputRef = ref(null);
		const emit = __emit;
		const commands = [
			{
				id: "sec-hero",
				title: "01 — Hero / Overview",
				category: "Section Jump",
				icon: "heroicons:home",
				action: () => jumpTo("#hero")
			},
			{
				id: "sec-stats",
				title: "02 — Stats & Experience Count",
				category: "Section Jump",
				icon: "heroicons:chart-bar",
				action: () => jumpTo("#stats")
			},
			{
				id: "sec-exp",
				title: "03 — Career & Experience Timeline",
				category: "Section Jump",
				icon: "heroicons:briefcase",
				action: () => jumpTo("#experience")
			},
			{
				id: "sec-edu",
				title: "04 — Education & Degree",
				category: "Section Jump",
				icon: "heroicons:academic-cap",
				action: () => jumpTo("#education")
			},
			{
				id: "sec-projects",
				title: "05 — Featured Projects Showcase",
				category: "Section Jump",
				icon: "heroicons:folder-open",
				action: () => jumpTo("#projects")
			},
			{
				id: "sec-tech",
				title: "06 — Tech Stack & Tooling Matrix",
				category: "Section Jump",
				icon: "heroicons:cpu-chip",
				action: () => jumpTo("#tech-stack")
			},
			{
				id: "sec-certs",
				title: "07 — Certifications & Achievements",
				category: "Section Jump",
				icon: "heroicons:shield-check",
				action: () => jumpTo("#certifications")
			},
			{
				id: "sec-blog",
				title: "08 — Engineering Blog & Articles",
				category: "Section Jump",
				icon: "heroicons:document-text",
				action: () => jumpTo("#blog")
			},
			{
				id: "sec-github",
				title: "09 — GitHub Activity & Commit Graph",
				category: "Section Jump",
				icon: "heroicons:code-bracket",
				action: () => jumpTo("#github")
			},
			{
				id: "sec-contact",
				title: "10 — Contact & Inquiry Form",
				category: "Section Jump",
				icon: "heroicons:envelope",
				action: () => jumpTo("#contact")
			},
			{
				id: "page-projects",
				title: "All Projects Archive (/projects)",
				category: "Page Navigation",
				icon: "heroicons:squares-2x2",
				action: () => router.push("/projects")
			},
			{
				id: "page-blog",
				title: "Blog Index (/blog)",
				category: "Page Navigation",
				icon: "heroicons:newspaper",
				action: () => router.push("/blog")
			},
			{
				id: "page-tech",
				title: "Interactive Tech Stack (/tech-stack)",
				category: "Page Navigation",
				icon: "heroicons:command-line",
				action: () => router.push("/tech-stack")
			},
			{
				id: "page-certs",
				title: "Certifications Catalog (/certifications)",
				category: "Page Navigation",
				icon: "heroicons:trophy",
				action: () => router.push("/certifications")
			},
			{
				id: "page-gallery",
				title: "Visual Gallery & Workshop (/gallery)",
				category: "Page Navigation",
				icon: "heroicons:photo",
				action: () => router.push("/gallery")
			},
			{
				id: "page-uses",
				title: "Uses & Developer Gear (/uses)",
				category: "Page Navigation",
				icon: "heroicons:wrench-screwdriver",
				action: () => router.push("/uses")
			},
			{
				id: "act-theme",
				title: "Toggle Dark / Light Theme",
				category: "Preferences",
				icon: "heroicons:sun",
				shortcut: "T",
				action: () => {
					colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
				}
			},
			{
				id: "act-copy-email",
				title: `Copy Email (${profile.socials.email})`,
				category: "Action",
				icon: "heroicons:clipboard-document",
				shortcut: "C",
				action: () => {
					(void 0).clipboard.writeText(profile.socials.email);
					emit("toast", "Email copied to clipboard!");
				}
			},
			{
				id: "act-github",
				title: "Open GitHub Profile",
				category: "External Link",
				icon: "logos:github-icon",
				action: () => (void 0).open(profile.socials.github, "_blank")
			},
			{
				id: "act-linkedin",
				title: "Open LinkedIn Profile",
				category: "External Link",
				icon: "logos:linkedin-icon",
				action: () => (void 0).open(profile.socials.linkedin, "_blank")
			},
			{
				id: "act-resume",
				title: "Download Résumé (PDF)",
				category: "Resource",
				icon: "heroicons:arrow-down-tray",
				action: () => (void 0).open(profile.resumeUrl, "_blank")
			}
		];
		const filteredCommands = computed(() => {
			if (!query.value.trim()) return commands;
			const q = query.value.toLowerCase();
			return commands.filter((cmd) => cmd.title.toLowerCase().includes(q) || cmd.category.toLowerCase().includes(q));
		});
		const jumpTo = (hash) => {
			if (router.currentRoute.value.path !== "/") router.push(`/${hash}`);
			else {
				const el = (void 0).querySelector(hash);
				if (el) el.scrollIntoView({ behavior: "smooth" });
			}
		};
		const open = () => {
			isOpen.value = true;
			query.value = "";
			activeIndex.value = 0;
			nextTick(() => {
				inputRef.value?.focus();
			});
		};
		const close = () => {
			isOpen.value = false;
		};
		__expose({
			open,
			close
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Icon = components_default$1;
			ssrRenderTeleport(_push, (_push) => {
				if (unref(isOpen)) {
					_push(`<div class="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/70 backdrop-blur-md"><div class="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden text-slate-100 transform transition-all"><div class="flex items-center px-4 py-3.5 border-b border-slate-800">`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "heroicons:magnifying-glass",
						class: "w-5 h-5 text-amber-400 mr-3 flex-shrink-0"
					}, null, _parent));
					_push(`<input${ssrRenderAttr("value", unref(query))} type="text" placeholder="Type a command or search sections... (e.g. projects, theme, copy email)" class="w-full bg-transparent text-sm md:text-base text-white placeholder-slate-400 focus:outline-none"><kbd class="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">ESC</kbd></div><div class="max-h-80 overflow-y-auto p-2 divide-y divide-slate-800/40">`);
					if (unref(filteredCommands).length === 0) _push(`<div class="py-10 text-center text-sm text-slate-400"> No matching commands or destinations found. </div>`);
					else _push(`<!---->`);
					_push(`<!--[-->`);
					ssrRenderList(unref(filteredCommands), (cmd, index) => {
						_push(`<div class="${ssrRenderClass([index === unref(activeIndex) ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" : "text-slate-200 hover:bg-slate-800/80", "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-sm transition-colors"])}"><div class="flex items-center gap-3"><div class="p-1.5 rounded-lg bg-slate-800 text-amber-400 border border-slate-700/50">`);
						_push(ssrRenderComponent(_component_Icon, {
							name: cmd.icon,
							class: "w-4 h-4"
						}, null, _parent));
						_push(`</div><div><div class="font-medium">${ssrInterpolate(cmd.title)}</div><div class="text-xs text-slate-400">${ssrInterpolate(cmd.category)}</div></div></div>`);
						if (cmd.shortcut) _push(`<span class="text-xs font-mono text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">${ssrInterpolate(cmd.shortcut)}</span>`);
						else _push(`<!---->`);
						_push(`</div>`);
					});
					_push(`<!--]--></div><div class="px-4 py-2.5 bg-slate-950/70 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between"><div class="flex items-center gap-2"><span class="inline-flex items-center gap-1"><kbd class="px-1.5 py-0.5 bg-slate-800 rounded text-[10px]">↑</kbd><kbd class="px-1.5 py-0.5 bg-slate-800 rounded text-[10px]">↓</kbd> navigate </span><span>•</span><span class="inline-flex items-center gap-1"><kbd class="px-1.5 py-0.5 bg-slate-800 rounded text-[10px]">↵</kbd> select </span></div><span class="text-amber-400 font-mono text-[11px]">Ashly Omanada</span></div></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region components/interactive/CommandPalette.vue
var _sfc_setup$5 = CommandPalette_vue_vue_type_script_setup_true_lang_default.setup;
CommandPalette_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/interactive/CommandPalette.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var CommandPalette_default = Object.assign(CommandPalette_vue_vue_type_script_setup_true_lang_default, { __name: "InteractiveCommandPalette" });
//#endregion
//#region components/layout/MobileMenu.vue?vue&type=script&setup=true&lang.ts
var MobileMenu_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "MobileMenu",
	__ssrInlineRender: true,
	props: { isOpen: { type: Boolean } },
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const close = () => {
			emit("close");
		};
		const navLinks = [
			{
				num: "01",
				name: "Profile Overview",
				href: "/#hero"
			},
			{
				num: "02",
				name: "Key Metrics & Stats",
				href: "/#stats"
			},
			{
				num: "03",
				name: "Experience Timeline",
				href: "/#experience"
			},
			{
				num: "04",
				name: "Education & Honors",
				href: "/#education"
			},
			{
				num: "05",
				name: "Featured Projects",
				href: "/#projects"
			},
			{
				num: "06",
				name: "Tech Stack Matrix",
				href: "/#tech-stack"
			},
			{
				num: "07",
				name: "Certifications",
				href: "/#certifications"
			},
			{
				num: "08",
				name: "Engineering Blog",
				href: "/#blog"
			},
			{
				num: "09",
				name: "GitHub Activity",
				href: "/#github"
			},
			{
				num: "10",
				name: "Get In Touch",
				href: "/#contact"
			}
		];
		const subPages = [
			{
				name: "Projects Archive",
				to: "/projects"
			},
			{
				name: "Blog Posts",
				to: "/blog"
			},
			{
				name: "Tech Stack Deep-Dive",
				to: "/tech-stack"
			},
			{
				name: "Certificates & Badges",
				to: "/certifications"
			},
			{
				name: "Gallery & Workspace",
				to: "/gallery"
			},
			{
				name: "Uses & Hardware",
				to: "/uses"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Icon = components_default$1;
			const _component_NuxtLink = NuxtLink;
			ssrRenderTeleport(_push, (_push) => {
				if (__props.isOpen) {
					_push(`<div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-between p-6"><div class="flex items-center justify-between border-b border-slate-800 pb-4"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-xl bg-slate-900 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-amber-400"> AO </div><span class="font-bold text-slate-100">Ashly Omanada</span></div><button type="button" class="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800" aria-label="Close menu">`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "heroicons:x-mark",
						class: "w-6 h-6"
					}, null, _parent));
					_push(`</button></div><div class="py-6 space-y-2 overflow-y-auto"><!--[-->`);
					ssrRenderList(navLinks, (item) => {
						_push(`<a${ssrRenderAttr("href", item.href)} class="flex items-center justify-between p-3.5 rounded-xl text-base font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-900/80 transition-colors"><span class="flex items-center gap-3"><span class="font-mono text-xs text-amber-500">${ssrInterpolate(item.num)}</span><span>${ssrInterpolate(item.name)}</span></span>`);
						_push(ssrRenderComponent(_component_Icon, {
							name: "heroicons:chevron-right",
							class: "w-4 h-4 text-slate-600"
						}, null, _parent));
						_push(`</a>`);
					});
					_push(`<!--]--><div class="pt-4 border-t border-slate-800/80 mt-4 space-y-2"><div class="text-xs font-mono uppercase tracking-wider text-slate-500 px-3">Inner Pages</div><!--[-->`);
					ssrRenderList(subPages, (sub) => {
						_push(ssrRenderComponent(_component_NuxtLink, {
							key: sub.to,
							to: sub.to,
							class: "flex items-center justify-between p-3 rounded-xl text-sm text-slate-300 hover:text-amber-300 hover:bg-slate-900/60",
							onClick: close
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<span${_scopeId}>${ssrInterpolate(sub.name)}</span>`);
									_push(ssrRenderComponent(_component_Icon, {
										name: "heroicons:arrow-up-right",
										class: "w-4 h-4 text-slate-600"
									}, null, _parent, _scopeId));
								} else return [createVNode("span", null, toDisplayString(sub.name), 1), createVNode(_component_Icon, {
									name: "heroicons:arrow-up-right",
									class: "w-4 h-4 text-slate-600"
								})];
							}),
							_: 2
						}, _parent));
					});
					_push(`<!--]--></div></div><div class="border-t border-slate-800 pt-4 flex items-center justify-between"><div class="flex items-center gap-3"><a${ssrRenderAttr("href", unref(profile).socials.github)} target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400" aria-label="GitHub">`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "logos:github-icon",
						class: "w-5 h-5"
					}, null, _parent));
					_push(`</a><a${ssrRenderAttr("href", unref(profile).socials.linkedin)} target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400" aria-label="LinkedIn">`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "logos:linkedin-icon",
						class: "w-5 h-5"
					}, null, _parent));
					_push(`</a><a${ssrRenderAttr("href", `mailto:${unref(profile).socials.email}`)} class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400" aria-label="Email">`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "heroicons:envelope",
						class: "w-5 h-5 text-amber-400"
					}, null, _parent));
					_push(`</a></div><span class="text-xs font-mono text-slate-500">v4.6 Nuxt</span></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region components/layout/MobileMenu.vue
var _sfc_setup$4 = MobileMenu_vue_vue_type_script_setup_true_lang_default.setup;
MobileMenu_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/MobileMenu.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var MobileMenu_default = Object.assign(MobileMenu_vue_vue_type_script_setup_true_lang_default, { __name: "LayoutMobileMenu" });
//#endregion
//#region components/ui/Toast.vue?vue&type=script&setup=true&lang.ts
var Toast_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Toast",
	__ssrInlineRender: true,
	setup(__props, { expose: __expose }) {
		const visible = ref(false);
		const message = ref("");
		let timer = null;
		const showToast = (msg, duration = 3e3) => {
			message.value = msg;
			visible.value = true;
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				visible.value = false;
			}, duration);
		};
		__expose({ showToast });
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(visible)) _push(`<div${ssrRenderAttrs(mergeProps({
				class: "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl glass-panel border border-amber-500/30 text-sm font-medium text-white bg-slate-900/90",
				role: "status",
				"aria-live": "polite"
			}, _attrs))}><div class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></div><span>${ssrInterpolate(unref(message))}</span></div>`);
			else _push(`<!---->`);
		};
	}
});
//#endregion
//#region components/ui/Toast.vue
var _sfc_setup$3 = Toast_vue_vue_type_script_setup_true_lang_default.setup;
Toast_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Toast.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var Toast_default = Object.assign(Toast_vue_vue_type_script_setup_true_lang_default, { __name: "UiToast" });
//#endregion
//#region app.vue?vue&type=script&setup=true&lang.ts
var app_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "app",
	__ssrInlineRender: true,
	setup(__props) {
		const commandPaletteRef = ref(null);
		const toastRef = ref(null);
		const mobileMenuOpen = ref(false);
		const openCommandPalette = () => {
			commandPaletteRef.value?.open();
		};
		const showToast = (msg) => {
			toastRef.value?.showToast(msg);
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_LayoutScrollProgress = ScrollProgress_default;
			const _component_LayoutAppHeader = AppHeader_default;
			const _component_NuxtPage = page_default;
			const _component_LayoutAppFooter = AppFooter_default;
			const _component_InteractiveAskAshlyChat = AskAshlyChat_default;
			const _component_InteractiveCommandPalette = CommandPalette_default;
			const _component_LayoutMobileMenu = MobileMenu_default;
			const _component_UiToast = Toast_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-(--bg-body) text-(--text-primary) transition-colors duration-300 relative selection:bg-amber-500/30 selection:text-white" }, _attrs))}><a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-slate-950 focus:font-bold focus:rounded-xl focus:shadow-2xl"> Skip to content </a>`);
			_push(ssrRenderComponent(_component_LayoutScrollProgress, null, null, _parent));
			_push(ssrRenderComponent(_component_LayoutAppHeader, {
				onOpenPalette: openCommandPalette,
				onToggleMobileMenu: ($event) => mobileMenuOpen.value = true
			}, null, _parent));
			_push(`<main id="main-content" class="focus:outline-none">`);
			_push(ssrRenderComponent(_component_NuxtPage, { onToast: showToast }, null, _parent));
			_push(`</main>`);
			_push(ssrRenderComponent(_component_LayoutAppFooter, null, null, _parent));
			_push(ssrRenderComponent(_component_InteractiveAskAshlyChat, null, null, _parent));
			_push(ssrRenderComponent(_component_InteractiveCommandPalette, {
				ref_key: "commandPaletteRef",
				ref: commandPaletteRef,
				onToast: showToast
			}, null, _parent));
			_push(ssrRenderComponent(_component_LayoutMobileMenu, {
				"is-open": unref(mobileMenuOpen),
				onClose: ($event) => mobileMenuOpen.value = false
			}, null, _parent));
			_push(ssrRenderComponent(_component_UiToast, {
				ref_key: "toastRef",
				ref: toastRef
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app.vue
var _sfc_setup$2 = app_vue_vue_type_script_setup_true_lang_default.setup;
app_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var app_default = app_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region error.vue?vue&type=script&setup=true&lang.ts
var error_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "error",
	__ssrInlineRender: true,
	props: { error: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-(--bg-body) text-(--text-primary) flex items-center justify-center p-6" }, _attrs))}><div class="max-w-md w-full p-8 rounded-3xl glass-panel bg-slate-900/80 border border-slate-800 text-center space-y-6 shadow-2xl"><div class="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-mono text-2xl font-black text-amber-400">${ssrInterpolate(__props.error?.statusCode || 404)}</div><div><h1 class="text-2xl font-extrabold text-slate-100">${ssrInterpolate(__props.error?.statusCode === 404 ? "Route Not Found" : "An Error Occurred")}</h1><p class="text-sm text-slate-400 mt-2 leading-relaxed font-mono">${ssrInterpolate(__props.error?.statusMessage || "The requested destination does not exist in the routing table.")}</p></div><div class="pt-2 flex flex-col sm:flex-row gap-3 justify-center"><button type="button" class="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"> Return to Home </button></div></div></div>`);
		};
	}
});
//#endregion
//#region error.vue
var _sfc_setup$1 = error_vue_vue_type_script_setup_true_lang_default.setup;
error_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var error_default = error_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fisland-renderer.mjs
var IslandRenderer = () => null;
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-root.vue
var _sfc_main = {
	__name: "nuxt-root",
	__ssrInlineRender: true,
	setup(__props) {
		const nuxtApp = useNuxtApp();
		nuxtApp.deferHydration();
		nuxtApp.ssrContext.url;
		const SingleRenderer = false;
		provide(PageRouteSymbol, useRoute$1());
		nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
		const error = useError();
		const abortRender = error.value && !nuxtApp.ssrContext.error;
		function invokeAppErrorHandler(err, target, info) {
			const errorHandler = nuxtApp.vueApp.config.errorHandler;
			if (errorHandler && !errorHandler.__nuxt_default) try {
				errorHandler(err, target, info);
			} catch (handlerError) {
				console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
			}
		}
		onErrorCaptured((err, target, info) => {
			nuxtApp.hooks.callHook("vue:error", err, target, info)?.catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
			{
				const p = nuxtApp.runWithContext(() => showError(err));
				onServerPrefetch(() => p);
				invokeAppErrorHandler(err, target, info);
				return false;
			}
		});
		const islandContext = nuxtApp.ssrContext.islandContext;
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderSuspense(_push, {
				default: () => {
					if (unref(abortRender)) _push(`<div></div>`);
					else if (unref(error)) _push(ssrRenderComponent(unref(error_default), { error: unref(error) }, null, _parent));
					else if (unref(islandContext)) _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
					else if (unref(SingleRenderer)) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
					else _push(ssrRenderComponent(unref(app_default), null, null, _parent));
				},
				_: 1
			});
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/components/nuxt-root.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
//#region node_modules/.pnpm/nuxt@4.6.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typescrip_4ma5zjl6zzp3av4h3ssulur66a/node_modules/nuxt/dist/app/entry.js
var entry$1 = async function createNuxtAppServer(ssrContext) {
	const vueApp = createApp(_sfc_main);
	const nuxt = createNuxtApp({
		vueApp,
		ssrContext
	});
	try {
		await applyPlugins(nuxt, virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default);
		await nuxt.hooks.callHook("app:created", vueApp);
	} catch (error) {
		await nuxt.hooks.callHook("app:error", error);
		nuxt.payload.error ||= createError(error);
	}
	if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) throw new Error("skipping render");
	return vueApp;
};
var entry_default = ((ssrContext) => entry$1(ssrContext));

const entry = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: entry_default
}, Symbol.toStringTag, { value: 'Module' }));

export { NuxtLink as N, _virtual_public__2Fimages_2Fportrait_default as _, useHead as a, useSeoMeta as b, components_default$1 as c, useSchemaOrg as d, definePerson as e, defineWebSite as f, useFetch as g, useRuntimeConfig as h, withTrailingSlash$1 as i, joinURL$1 as j, useNuxtApp as k, defu as l, hasProtocol$1 as m, parseURL as n, encodeParam as o, profile as p, encodePath as q, br as r, qn as s, entry as t, useRoute$1 as u, withLeadingSlash as w };
//# sourceMappingURL=entry.mjs.map
