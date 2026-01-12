import { a as __toCommonJS$1, n as __esmMin, r as __export$1, t as __commonJSMin } from "../../_rolldown.mjs";
import { lt as init_dist, st as dist_exports } from "../@ai-sdk/gateway.mjs";
var text_bundle_exports = /* @__PURE__ */ __export$1({
	FilesetResolver: () => Li,
	LanguageDetector: () => qi,
	TaskRunner: () => Hi,
	TextClassifier: () => Ki,
	TextEmbedder: () => Xi
});
function e() {
	throw Error("Invalid UTF8");
}
function n(t$1, e$1) {
	return e$1 = String.fromCharCode.apply(null, e$1), null == t$1 ? e$1 : t$1 + e$1;
}
function u(t$1) {
	if (a) t$1 = (s ||= new TextEncoder()).encode(t$1);
	else {
		let n$1 = 0;
		const r$1 = new Uint8Array(3 * t$1.length);
		for (let i$1 = 0; i$1 < t$1.length; i$1++) {
			var e$1 = t$1.charCodeAt(i$1);
			if (e$1 < 128) r$1[n$1++] = e$1;
			else {
				if (e$1 < 2048) r$1[n$1++] = e$1 >> 6 | 192;
				else {
					if (e$1 >= 55296 && e$1 <= 57343) {
						if (e$1 <= 56319 && i$1 < t$1.length) {
							const o$1 = t$1.charCodeAt(++i$1);
							if (o$1 >= 56320 && o$1 <= 57343) {
								e$1 = 1024 * (e$1 - 55296) + o$1 - 56320 + 65536, r$1[n$1++] = e$1 >> 18 | 240, r$1[n$1++] = e$1 >> 12 & 63 | 128, r$1[n$1++] = e$1 >> 6 & 63 | 128, r$1[n$1++] = 63 & e$1 | 128;
								continue;
							}
							i$1--;
						}
						e$1 = 65533;
					}
					r$1[n$1++] = e$1 >> 12 | 224, r$1[n$1++] = e$1 >> 6 & 63 | 128;
				}
				r$1[n$1++] = 63 & e$1 | 128;
			}
		}
		t$1 = n$1 === r$1.length ? r$1 : r$1.subarray(0, n$1);
	}
	return t$1;
}
function y(t$1) {
	return !!c && !!g && g.brands.some((({ brand: e$1 }) => e$1 && -1 != e$1.indexOf(t$1)));
}
function b(e$1) {
	var n$1;
	return (n$1 = t.navigator) && (n$1 = n$1.userAgent) || (n$1 = ""), -1 != n$1.indexOf(e$1);
}
function v() {
	return !!c && !!g && g.brands.length > 0;
}
function w() {
	return v() ? y("Chromium") : (b("Chrome") || b("CriOS")) && !(!v() && b("Edge")) || b("Silk");
}
function _(t$1) {
	return _[" "](t$1), t$1;
}
function I(t$1) {
	const e$1 = t$1.length;
	let n$1 = 3 * e$1 / 4;
	n$1 % 3 ? n$1 = Math.floor(n$1) : -1 != "=.".indexOf(t$1[e$1 - 1]) && (n$1 = -1 != "=.".indexOf(t$1[e$1 - 2]) ? n$1 - 2 : n$1 - 1);
	const r$1 = new Uint8Array(n$1);
	let i$1 = 0;
	return function(t$2, e$2) {
		function n$2(e$3) {
			for (; r$2 < t$2.length;) {
				const e$4 = t$2.charAt(r$2++), n$3 = E[e$4];
				if (null != n$3) return n$3;
				if (!/^[\s\xa0]*$/.test(e$4)) throw Error("Unknown base64 encoding at char: " + e$4);
			}
			return e$3;
		}
		T();
		let r$2 = 0;
		for (;;) {
			const t$3 = n$2(-1), r$3 = n$2(0), i$2 = n$2(64), o$1 = n$2(64);
			if (64 === o$1 && -1 === t$3) break;
			e$2(t$3 << 2 | r$3 >> 4), 64 != i$2 && (e$2(r$3 << 4 & 240 | i$2 >> 2), 64 != o$1 && e$2(i$2 << 6 & 192 | o$1));
		}
	}(t$1, (function(t$2) {
		r$1[i$1++] = t$2;
	})), i$1 !== n$1 ? r$1.subarray(0, i$1) : r$1;
}
function T() {
	if (!E) {
		E = {};
		var t$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), e$1 = [
			"+/=",
			"+/",
			"-_=",
			"-_.",
			"-_"
		];
		for (let n$1 = 0; n$1 < 5; n$1++) {
			const r$1 = t$1.concat(e$1[n$1].split(""));
			A[n$1] = r$1;
			for (let t$2 = 0; t$2 < r$1.length; t$2++) {
				const e$2 = r$1[t$2];
				void 0 === E[e$2] && (E[e$2] = t$2);
			}
		}
	}
}
function P(t$1) {
	if (!U) {
		var e$1;
		void 0 === e$1 && (e$1 = 0), T(), e$1 = A[e$1];
		var n$1 = Array(Math.floor(t$1.length / 3)), r$1 = e$1[64] || "";
		let u$1 = 0, c$1 = 0;
		for (; u$1 < t$1.length - 2; u$1 += 3) {
			var i$1 = t$1[u$1], o$1 = t$1[u$1 + 1], s$1 = t$1[u$1 + 2], a$1 = e$1[i$1 >> 2];
			i$1 = e$1[(3 & i$1) << 4 | o$1 >> 4], o$1 = e$1[(15 & o$1) << 2 | s$1 >> 6], s$1 = e$1[63 & s$1], n$1[c$1++] = a$1 + i$1 + o$1 + s$1;
		}
		switch (a$1 = 0, s$1 = r$1, t$1.length - u$1) {
			case 2: s$1 = e$1[(15 & (a$1 = t$1[u$1 + 1])) << 2] || r$1;
			case 1: t$1 = t$1[u$1], n$1[c$1] = e$1[t$1 >> 2] + e$1[(3 & t$1) << 4 | a$1 >> 4] + s$1 + r$1;
		}
		return n$1.join("");
	}
	for (e$1 = "", n$1 = 0, r$1 = t$1.length - 10240; n$1 < r$1;) e$1 += String.fromCharCode.apply(null, t$1.subarray(n$1, n$1 += 10240));
	return e$1 += String.fromCharCode.apply(null, n$1 ? t$1.subarray(n$1) : t$1), btoa(e$1);
}
function O(t$1) {
	return L[t$1] || "";
}
function k(t$1) {
	if (!U) return I(t$1);
	B.test(t$1) && (t$1 = t$1.replace(B, O)), t$1 = atob(t$1);
	const e$1 = new Uint8Array(t$1.length);
	for (let n$1 = 0; n$1 < t$1.length; n$1++) e$1[n$1] = t$1.charCodeAt(n$1);
	return e$1;
}
function F(t$1) {
	return x && null != t$1 && t$1 instanceof Uint8Array;
}
function V() {
	return M ||= new C(null, N);
}
function j(t$1) {
	D(N);
	var e$1 = t$1.g;
	return null == (e$1 = null == e$1 || F(e$1) ? e$1 : "string" == typeof e$1 ? k(e$1) : null) ? e$1 : t$1.g = e$1;
}
function D(t$1) {
	if (t$1 !== N) throw Error("illegal external caller");
}
function $(t$1, e$1) {
	t$1.__closure__error__context__984382 || (t$1.__closure__error__context__984382 = {}), t$1.__closure__error__context__984382.severity = e$1;
}
function z() {
	const t$1 = Error("int32");
	return $(t$1, "warning"), t$1;
}
function R(e$1) {
	if (null != e$1) {
		var n$1 = G ??= {}, r$1 = n$1[e$1] || 0;
		r$1 >= 5 || (n$1[e$1] = r$1 + 1, $(e$1 = Error(), "incident"), function(e$2) {
			t.setTimeout((() => {
				throw e$2;
			}), 0);
		}(e$1));
	}
}
function H(t$1, e$1, n$1 = !1) {
	return "function" == typeof Symbol && "symbol" == typeof Symbol() ? n$1 && Symbol.for && t$1 ? Symbol.for(t$1) : null != t$1 ? Symbol(t$1) : Symbol() : e$1;
}
function et(t$1, e$1) {
	W || Q in t$1 || tt(t$1, Z), t$1[Q] |= e$1;
}
function nt(t$1, e$1) {
	W || Q in t$1 || tt(t$1, Z), t$1[Q] = e$1;
}
function rt(t$1, e$1) {
	nt(e$1, -15615 & (0 | t$1));
}
function it(t$1, e$1) {
	nt(e$1, -15581 & (34 | t$1));
}
function ot() {
	return "function" == typeof BigInt;
}
function st(t$1) {
	return Array.prototype.slice.call(t$1);
}
function ct(t$1) {
	return null !== t$1 && "object" == typeof t$1 && !Array.isArray(t$1) && t$1.constructor === Object;
}
function lt(t$1, e$1) {
	if (null != t$1) {
		if ("string" == typeof t$1) t$1 = t$1 ? new C(t$1, N) : V();
		else if (t$1.constructor !== C) if (F(t$1)) t$1 = t$1.length ? new C(new Uint8Array(t$1), N) : V();
		else {
			if (!e$1) throw Error();
			t$1 = void 0;
		}
	}
	return t$1;
}
function ft(t$1) {
	if (2 & t$1) throw Error();
}
function dt(t$1) {
	return X ? t$1[X] : void 0;
}
function _t(t$1, e$1) {
	if (t$1.length > e$1.length) return !1;
	if (t$1.length < e$1.length || t$1 === e$1) return !0;
	for (let n$1 = 0; n$1 < t$1.length; n$1++) {
		const r$1 = t$1[n$1], i$1 = e$1[n$1];
		if (r$1 > i$1) return !1;
		if (r$1 < i$1) return !0;
	}
}
function Tt(t$1) {
	const e$1 = t$1 >>> 0;
	Et = e$1, It = (t$1 - e$1) / 4294967296 >>> 0;
}
function xt(t$1) {
	if (t$1 < 0) {
		Tt(-t$1);
		const [e$1, n$1] = Ft(Et, It);
		Et = e$1 >>> 0, It = n$1 >>> 0;
	} else Tt(t$1);
}
function Ut(t$1) {
	const e$1 = At ||= /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(8));
	e$1.setFloat32(0, +t$1, !0), It = 0, Et = e$1.getUint32(0, !0);
}
function Pt(t$1, e$1) {
	const n$1 = 4294967296 * e$1 + (t$1 >>> 0);
	return Number.isSafeInteger(n$1) ? n$1 : Lt(t$1, e$1);
}
function Bt(t$1, e$1) {
	const n$1 = 2147483648 & e$1;
	return n$1 && (e$1 = ~e$1 >>> 0, 0 == (t$1 = 1 + ~t$1 >>> 0) && (e$1 = e$1 + 1 >>> 0)), "number" == typeof (t$1 = Pt(t$1, e$1)) ? n$1 ? -t$1 : t$1 : n$1 ? "-" + t$1 : t$1;
}
function Lt(t$1, e$1) {
	if (t$1 >>>= 0, (e$1 >>>= 0) <= 2097151) var n$1 = "" + (4294967296 * e$1 + t$1);
	else ot() ? n$1 = "" + (BigInt(e$1) << BigInt(32) | BigInt(t$1)) : (t$1 = (16777215 & t$1) + 6777216 * (n$1 = 16777215 & (t$1 >>> 24 | e$1 << 8)) + 6710656 * (e$1 = e$1 >> 16 & 65535), n$1 += 8147497 * e$1, e$1 *= 2, t$1 >= 1e7 && (n$1 += t$1 / 1e7 >>> 0, t$1 %= 1e7), n$1 >= 1e7 && (e$1 += n$1 / 1e7 >>> 0, n$1 %= 1e7), n$1 = e$1 + Ot(n$1) + Ot(t$1));
	return n$1;
}
function Ot(t$1) {
	return t$1 = String(t$1), "0000000".slice(t$1.length) + t$1;
}
function kt(t$1) {
	if (t$1.length < 16) xt(Number(t$1));
	else if (ot()) t$1 = BigInt(t$1), Et = Number(t$1 & BigInt(4294967295)) >>> 0, It = Number(t$1 >> BigInt(32) & BigInt(4294967295));
	else {
		const e$1 = +("-" === t$1[0]);
		It = Et = 0;
		const n$1 = t$1.length;
		for (let r$1 = e$1, i$1 = (n$1 - e$1) % 6 + e$1; i$1 <= n$1; r$1 = i$1, i$1 += 6) {
			const e$2 = Number(t$1.slice(r$1, i$1));
			It *= 1e6, Et = 1e6 * Et + e$2, Et >= 4294967296 && (It += Math.trunc(Et / 4294967296), It >>>= 0, Et >>>= 0);
		}
		if (e$1) {
			const [t$2, e$2] = Ft(Et, It);
			Et = t$2, It = e$2;
		}
	}
}
function Ft(t$1, e$1) {
	return e$1 = ~e$1, t$1 ? t$1 = 1 + ~t$1 : e$1 += 1, [t$1, e$1];
}
function Gt(t$1) {
	return null == t$1 || "number" == typeof t$1 ? t$1 : "NaN" === t$1 || "Infinity" === t$1 || "-Infinity" === t$1 ? Number(t$1) : void 0;
}
function Dt(t$1) {
	if (null != t$1 && "boolean" != typeof t$1) {
		var e$1 = typeof t$1;
		throw Error(`Expected boolean but got ${"object" != e$1 ? e$1 : t$1 ? Array.isArray(t$1) ? "array" : e$1 : "null"}: ${t$1}`);
	}
	return t$1;
}
function zt(t$1) {
	switch (typeof t$1) {
		case "bigint": return !0;
		case "number": return Ct(t$1);
		case "string": return $t.test(t$1);
		default: return !1;
	}
}
function Rt(t$1) {
	if (null == t$1) return t$1;
	if ("string" == typeof t$1 && t$1) t$1 = +t$1;
	else if ("number" != typeof t$1) return;
	return Ct(t$1) ? 0 | t$1 : void 0;
}
function Wt(t$1) {
	if ("-" === t$1[0]) return !1;
	const e$1 = t$1.length;
	return e$1 < 20 || 20 === e$1 && Number(t$1.substring(0, 6)) < 184467;
}
function Ht(t$1) {
	return t$1 = Mt(t$1), jt(t$1) || (xt(t$1), t$1 = Bt(Et, It)), t$1;
}
function qt(t$1) {
	var e$1 = Mt(Number(t$1));
	if (jt(e$1)) return String(e$1);
	if (-1 !== (e$1 = t$1.indexOf(".")) && (t$1 = t$1.substring(0, e$1)), e$1 = t$1.length, !("-" === t$1[0] ? e$1 < 20 || 20 === e$1 && Number(t$1.substring(0, 7)) > -922337 : e$1 < 19 || 19 === e$1 && Number(t$1.substring(0, 6)) < 922337)) if (kt(t$1), t$1 = Et, 2147483648 & (e$1 = It)) if (ot()) t$1 = "" + (BigInt(0 | e$1) << BigInt(32) | BigInt(t$1 >>> 0));
	else {
		const [n$1, r$1] = Ft(t$1, e$1);
		t$1 = "-" + Lt(n$1, r$1);
	}
	else t$1 = Lt(t$1, e$1);
	return t$1;
}
function Kt(t$1) {
	return null == t$1 ? t$1 : "bigint" == typeof t$1 ? (mt(t$1) ? t$1 = Number(t$1) : (t$1 = Nt(64, t$1), t$1 = mt(t$1) ? Number(t$1) : String(t$1)), t$1) : zt(t$1) ? "number" == typeof t$1 ? Ht(t$1) : qt(t$1) : void 0;
}
function Xt(t$1) {
	if (null == t$1) return t$1;
	var e$1 = typeof t$1;
	if ("bigint" === e$1) return String(Vt(64, t$1));
	if (zt(t$1)) {
		if ("string" === e$1) return e$1 = Mt(Number(t$1)), jt(e$1) && e$1 >= 0 ? t$1 = String(e$1) : (-1 !== (e$1 = t$1.indexOf(".")) && (t$1 = t$1.substring(0, e$1)), Wt(t$1) || (kt(t$1), t$1 = Lt(Et, It))), t$1;
		if ("number" === e$1) return (t$1 = Mt(t$1)) >= 0 && jt(t$1) ? t$1 : function(t$2) {
			if (t$2 < 0) {
				xt(t$2);
				var e$2 = Lt(Et, It);
				return t$2 = Number(e$2), jt(t$2) ? t$2 : e$2;
			}
			return Wt(e$2 = String(t$2)) ? e$2 : (xt(t$2), Pt(Et, It));
		}(t$1);
	}
}
function Jt(t$1) {
	if ("string" != typeof t$1) throw Error();
	return t$1;
}
function Yt(t$1) {
	if (null != t$1 && "string" != typeof t$1) throw Error();
	return t$1;
}
function Qt(t$1) {
	return null == t$1 || "string" == typeof t$1 ? t$1 : void 0;
}
function Zt(t$1, e$1, n$1) {
	if (null != t$1 && "object" == typeof t$1 && t$1.B === ut) return t$1;
	if (Array.isArray(t$1)) {
		var r$1 = 0 | t$1[Q], i$1 = r$1;
		return 0 === i$1 && (i$1 |= 32 & n$1), (i$1 |= 2 & n$1) !== r$1 && nt(t$1, i$1), new e$1(t$1);
	}
}
function te(t$1) {
	return t$1;
}
function ee(t$1, e$1, n$1, r$1, i$1) {
	if (null != t$1) {
		if (Array.isArray(t$1)) {
			const o$1 = 0 | t$1[Q];
			return 0 === t$1.length && 1 & o$1 ? void 0 : i$1 && 2 & o$1 ? t$1 : ne(t$1, e$1, n$1, void 0 !== r$1, i$1);
		}
		return e$1(t$1, r$1);
	}
}
function ne(t$1, e$1, n$1, r$1, i$1) {
	const o$1 = r$1 || n$1 ? 0 | t$1[Q] : 0, s$1 = r$1 ? !!(32 & o$1) : void 0;
	let a$1 = 0;
	const u$1 = (r$1 = st(t$1)).length;
	for (let t$2 = 0; t$2 < u$1; t$2++) {
		var c$1 = r$1[t$2];
		if (t$2 === u$1 - 1 && ct(c$1)) {
			var l$1 = e$1, h$1 = n$1, f$1 = s$1, d$1 = i$1;
			let t$3;
			for (let e$2 in c$1) {
				const n$2 = ee(c$1[e$2], l$1, h$1, f$1, d$1);
				null != n$2 && ((t$3 ??= {})[e$2] = n$2);
			}
			c$1 = t$3;
		} else c$1 = ee(r$1[t$2], e$1, n$1, s$1, i$1);
		r$1[t$2] = c$1, null != c$1 && (a$1 = t$2 + 1);
	}
	return a$1 < u$1 && (r$1.length = a$1), n$1 && ((t$1 = dt(t$1)) && (r$1[X] = st(t$1)), n$1(o$1, r$1)), r$1;
}
function re(t$1) {
	switch (typeof t$1) {
		case "number": return Number.isFinite(t$1) ? t$1 : "" + t$1;
		case "bigint": return mt(t$1) ? Number(t$1) : "" + t$1;
		case "boolean": return t$1 ? 1 : 0;
		case "object":
			if (F(t$1)) return F(t$1) && R(Y), P(t$1);
			if (t$1.B === ut) return ae(t$1);
			if (t$1 instanceof C) {
				const e$1 = t$1.g;
				return null == e$1 ? "" : "string" == typeof e$1 ? e$1 : t$1.g = P(e$1);
			}
			return;
	}
	return t$1;
}
function ae(t$1) {
	var e$1 = t$1.l;
	t$1 = ne(e$1, re, void 0, void 0, !1);
	var n$1 = 0 | e$1[Q];
	if ((e$1 = t$1.length) && !(512 & n$1)) {
		var r$1 = t$1[e$1 - 1], i$1 = !1;
		ct(r$1) ? (e$1--, i$1 = !0) : r$1 = void 0;
		var o$1 = e$1 - (n$1 = 512 & n$1 ? 0 : -1), s$1 = (ie ?? te)(o$1, n$1, t$1, r$1);
		if (r$1 && (t$1[e$1] = void 0), o$1 < s$1 && r$1) {
			for (var a$1 in o$1 = !0, r$1) {
				const u$1 = +a$1;
				u$1 <= s$1 ? (t$1[i$1 = u$1 + n$1] = r$1[a$1], e$1 = Math.max(i$1 + 1, e$1), i$1 = !1, delete r$1[a$1]) : o$1 = !1;
			}
			o$1 && (r$1 = void 0);
		}
		for (o$1 = e$1 - 1; e$1 > 0; o$1 = e$1 - 1) if (null == (a$1 = t$1[o$1])) e$1--, i$1 = !0;
		else {
			if (!((o$1 -= n$1) >= s$1)) break;
			(r$1 ??= {})[o$1] = a$1, e$1--, i$1 = !0;
		}
		i$1 && (t$1.length = e$1), r$1 && t$1.push(r$1);
	}
	return t$1;
}
function ue(t$1, e$1, n$1) {
	return t$1 = ce(t$1, e$1[0], e$1[1], n$1 ? 1 : 2), e$1 !== oe && n$1 && et(t$1, 8192), t$1;
}
function ce(t$1, e$1, n$1, r$1) {
	if (null == t$1) {
		var i$1 = 96;
		n$1 ? (t$1 = [n$1], i$1 |= 512) : t$1 = [], e$1 && (i$1 = -16760833 & i$1 | (1023 & e$1) << 14);
	} else {
		if (!Array.isArray(t$1)) throw Error("narr");
		if (8192 & (i$1 = 0 | t$1[Q]) || !(64 & i$1) || 2 & i$1 || R(J), 1024 & i$1) throw Error("farr");
		if (64 & i$1) return t$1;
		if (1 === r$1 || 2 === r$1 || (i$1 |= 64), n$1 && (i$1 |= 512, n$1 !== t$1[0])) throw Error("mid");
		t: {
			var o$1 = (n$1 = t$1).length;
			if (o$1) {
				var s$1 = o$1 - 1;
				if (ct(r$1 = n$1[s$1])) {
					if ((s$1 -= e$1 = 512 & (i$1 |= 256) ? 0 : -1) >= 1024) throw Error("pvtlmt");
					for (var a$1 in r$1) (o$1 = +a$1) < s$1 && (n$1[o$1 + e$1] = r$1[a$1], delete r$1[a$1]);
					i$1 = -16760833 & i$1 | (1023 & s$1) << 14;
					break t;
				}
			}
			if (e$1) {
				if ((a$1 = Math.max(e$1, o$1 - (512 & i$1 ? 0 : -1))) > 1024) throw Error("spvt");
				i$1 = -16760833 & i$1 | (1023 & a$1) << 14;
			}
		}
	}
	return nt(t$1, i$1), t$1;
}
function le(t$1, e$1, n$1 = it) {
	if (null != t$1) {
		if (x && t$1 instanceof Uint8Array) return e$1 ? t$1 : new Uint8Array(t$1);
		if (Array.isArray(t$1)) {
			var r$1 = 0 | t$1[Q];
			return 2 & r$1 ? t$1 : (e$1 &&= 0 === r$1 || !!(32 & r$1) && !(64 & r$1 || !(16 & r$1)), e$1 ? (nt(t$1, 34 | r$1), 4 & r$1 && Object.freeze(t$1), t$1) : ne(t$1, le, 4 & r$1 ? it : n$1, !0, !0));
		}
		return t$1.B === ut && (t$1 = 2 & (r$1 = 0 | (n$1 = t$1.l)[Q]) ? t$1 : new t$1.constructor(fe(n$1, r$1, !0))), t$1;
	}
}
function he(t$1) {
	const e$1 = t$1.l;
	return new t$1.constructor(fe(e$1, 0 | e$1[Q], !1));
}
function fe(t$1, e$1, n$1) {
	const r$1 = n$1 || 2 & e$1 ? it : rt, i$1 = !!(32 & e$1);
	return t$1 = function(t$2, e$2, n$2) {
		const r$2 = st(t$2);
		var i$2 = r$2.length;
		const o$1 = 256 & e$2 ? r$2[i$2 - 1] : void 0;
		for (i$2 += o$1 ? -1 : 0, e$2 = 512 & e$2 ? 1 : 0; e$2 < i$2; e$2++) r$2[e$2] = n$2(r$2[e$2]);
		if (o$1) {
			e$2 = r$2[e$2] = {};
			for (const t$3 in o$1) e$2[t$3] = n$2(o$1[t$3]);
		}
		return (t$2 = dt(t$2)) && (r$2[X] = st(t$2)), r$2;
	}(t$1, e$1, ((t$2) => le(t$2, i$1, r$1))), et(t$1, 32 | (n$1 ? 2 : 0)), t$1;
}
function de(t$1) {
	const e$1 = t$1.l, n$1 = 0 | e$1[Q];
	return 2 & n$1 ? new t$1.constructor(fe(e$1, n$1, !1)) : t$1;
}
function ge(t$1, e$1) {
	return pe(t$1 = t$1.l, 0 | t$1[Q], e$1);
}
function pe(t$1, e$1, n$1) {
	if (-1 === n$1) return null;
	const r$1 = n$1 + (512 & e$1 ? 0 : -1), i$1 = t$1.length - 1;
	return r$1 >= i$1 && 256 & e$1 ? t$1[i$1][n$1] : r$1 <= i$1 ? t$1[r$1] : void 0;
}
function me(t$1, e$1, n$1) {
	const r$1 = t$1.l;
	let i$1 = 0 | r$1[Q];
	return ft(i$1), ye(r$1, i$1, e$1, n$1), t$1;
}
function ye(t$1, e$1, n$1, r$1) {
	const i$1 = 512 & e$1 ? 0 : -1, o$1 = n$1 + i$1;
	var s$1 = t$1.length - 1;
	return o$1 >= s$1 && 256 & e$1 ? (t$1[s$1][n$1] = r$1, e$1) : o$1 <= s$1 ? (t$1[o$1] = r$1, e$1) : (void 0 !== r$1 && (n$1 >= (s$1 = e$1 >> 14 & 1023 || 536870912) ? null != r$1 && (t$1[s$1 + i$1] = { [n$1]: r$1 }, nt(t$1, e$1 |= 256)) : t$1[o$1] = r$1), e$1);
}
function be(t$1) {
	let e$1 = 0 | (t$1 = t$1.l)[Q];
	const n$1 = pe(t$1, e$1, 1), r$1 = lt(n$1, !0);
	return null != r$1 && r$1 !== n$1 && ye(t$1, e$1, 1, r$1), r$1;
}
function ve(t$1, e$1, n$1, r$1, i$1) {
	const o$1 = t$1.l, s$1 = 2 & (t$1 = 0 | o$1[Q]) ? 1 : r$1;
	i$1 = !!i$1;
	let a$1 = 0 | (r$1 = we(o$1, t$1, e$1))[Q];
	if (!(4 & a$1)) {
		4 & a$1 && (r$1 = st(r$1), a$1 = je(a$1, t$1), t$1 = ye(o$1, t$1, e$1, r$1));
		let i$2 = 0, s$2 = 0;
		for (; i$2 < r$1.length; i$2++) {
			const t$2 = n$1(r$1[i$2]);
			null != t$2 && (r$1[s$2++] = t$2);
		}
		s$2 < i$2 && (r$1.length = s$2), a$1 = _e(a$1, t$1), n$1 = -2049 & (20 | a$1), a$1 = n$1 &= -4097, nt(r$1, a$1), 2 & a$1 && Object.freeze(r$1);
	}
	return 1 === s$1 || 4 === s$1 && 32 & a$1 ? Se(a$1) || (i$1 = a$1, a$1 |= 2, a$1 !== i$1 && nt(r$1, a$1), Object.freeze(r$1)) : (2 === s$1 && Se(a$1) && (r$1 = st(r$1), a$1 = je(a$1, t$1), a$1 = Ce(a$1, t$1, i$1), nt(r$1, a$1), t$1 = ye(o$1, t$1, e$1, r$1)), Se(a$1) || (e$1 = a$1, a$1 = Ce(a$1, t$1, i$1), a$1 !== e$1 && nt(r$1, a$1))), r$1;
}
function we(t$1, e$1, n$1) {
	return t$1 = pe(t$1, e$1, n$1), Array.isArray(t$1) ? t$1 : at;
}
function _e(t$1, e$1) {
	return 0 === t$1 && (t$1 = je(t$1, e$1)), 1 | t$1;
}
function Se(t$1) {
	return !!(2 & t$1) && !!(4 & t$1) || !!(1024 & t$1);
}
function Ae(t$1, e$1, n$1) {
	let r$1 = 0 | (t$1 = t$1.l)[Q];
	if (ft(r$1), null == n$1) ye(t$1, r$1, e$1);
	else {
		var i$1 = 0 | n$1[Q], o$1 = i$1, s$1 = Se(i$1), a$1 = s$1 || Object.isFrozen(n$1);
		for (s$1 || (i$1 = 0), a$1 || (n$1 = st(n$1), o$1 = 0, i$1 = Ce(i$1 = je(i$1, r$1), r$1, !0), a$1 = !1), i$1 |= 21, s$1 = 0; s$1 < n$1.length; s$1++) {
			const t$2 = n$1[s$1], e$2 = Jt(t$2);
			Object.is(t$2, e$2) || (a$1 && (n$1 = st(n$1), o$1 = 0, i$1 = Ce(i$1 = je(i$1, r$1), r$1, !0), a$1 = !1), n$1[s$1] = e$2);
		}
		i$1 !== o$1 && (a$1 && (n$1 = st(n$1), i$1 = Ce(i$1 = je(i$1, r$1), r$1, !0)), nt(n$1, i$1)), ye(t$1, r$1, e$1, n$1);
	}
}
function Ee(t$1, e$1) {
	let n$1 = 0 | (t$1 = t$1.l)[Q];
	ft(n$1), ye(t$1, n$1, 2, "" === e$1 ? void 0 : e$1);
}
function Ie(t$1, e$1, n$1, r$1) {
	ft(e$1);
	let i$1 = we(t$1, e$1, n$1);
	const o$1 = i$1 !== at;
	if (64 & e$1 || !(8192 & e$1) || !o$1) {
		const s$1 = o$1 ? 0 | i$1[Q] : 0;
		let a$1 = s$1;
		(!o$1 || 2 & a$1 || Se(a$1) || 4 & a$1 && !(32 & a$1)) && (i$1 = st(i$1), a$1 = je(a$1, e$1), e$1 = ye(t$1, e$1, n$1, i$1)), a$1 = -13 & _e(a$1, e$1), a$1 = Ce(r$1 ? -17 & a$1 : 16 | a$1, e$1, !0), a$1 !== s$1 && nt(i$1, a$1);
	}
	return i$1;
}
function Te(t$1, e$1) {
	var n$1 = ci;
	return Pe(xe(t$1 = t$1.l), t$1, 0 | t$1[Q], n$1) === e$1 ? e$1 : -1;
}
function xe(t$1) {
	if (W) return t$1[K] ?? (t$1[K] = /* @__PURE__ */ new Map());
	if (K in t$1) return t$1[K];
	const e$1 = /* @__PURE__ */ new Map();
	return Object.defineProperty(t$1, K, { value: e$1 }), e$1;
}
function Ue(t$1, e$1, n$1, r$1) {
	const i$1 = xe(t$1), o$1 = Pe(i$1, t$1, e$1, n$1);
	return o$1 !== r$1 && (o$1 && (e$1 = ye(t$1, e$1, o$1)), i$1.set(n$1, r$1)), e$1;
}
function Pe(t$1, e$1, n$1, r$1) {
	let i$1 = t$1.get(r$1);
	if (null != i$1) return i$1;
	i$1 = 0;
	for (let t$2 = 0; t$2 < r$1.length; t$2++) {
		const o$1 = r$1[t$2];
		null != pe(e$1, n$1, o$1) && (0 !== i$1 && (n$1 = ye(e$1, n$1, i$1)), i$1 = o$1);
	}
	return t$1.set(r$1, i$1), i$1;
}
function Be(t$1, e$1, n$1) {
	let r$1 = 0 | t$1[Q];
	const i$1 = pe(t$1, r$1, n$1);
	let o$1;
	if (null != i$1 && i$1.B === ut) return (e$1 = de(i$1)) !== i$1 && ye(t$1, r$1, n$1, e$1), e$1.l;
	if (Array.isArray(i$1)) {
		const t$2 = 0 | i$1[Q];
		o$1 = 2 & t$2 ? ue(fe(i$1, t$2, !1), e$1, !0) : 64 & t$2 ? i$1 : ue(o$1, e$1, !0);
	} else o$1 = ue(void 0, e$1, !0);
	return o$1 !== i$1 && ye(t$1, r$1, n$1, o$1), o$1;
}
function Le(t$1, e$1, n$1) {
	let r$1 = 0 | (t$1 = t$1.l)[Q];
	const i$1 = pe(t$1, r$1, n$1);
	return (e$1 = Zt(i$1, e$1, r$1)) !== i$1 && null != e$1 && ye(t$1, r$1, n$1, e$1), e$1;
}
function Oe(t$1, e$1, n$1) {
	if (null == (e$1 = Le(t$1, e$1, n$1))) return e$1;
	let r$1 = 0 | (t$1 = t$1.l)[Q];
	if (!(2 & r$1)) {
		const i$1 = de(e$1);
		i$1 !== e$1 && ye(t$1, r$1, n$1, e$1 = i$1);
	}
	return e$1;
}
function ke(t$1, e$1, n$1, r$1, i$1, o$1) {
	t$1 = t$1.l;
	var s$1 = !!(2 & e$1);
	const a$1 = s$1 ? 1 : r$1;
	i$1 = !!i$1, o$1 &&= !s$1;
	var u$1 = 0 | (r$1 = we(t$1, e$1, 1))[Q];
	if (!(s$1 = !!(4 & u$1))) {
		var c$1 = r$1, l$1 = e$1;
		const t$2 = !!(2 & (u$1 = _e(u$1, e$1)));
		t$2 && (l$1 |= 2);
		let i$2 = !t$2, o$2 = !0, s$2 = 0, a$2 = 0;
		for (; s$2 < c$1.length; s$2++) {
			const e$2 = Zt(c$1[s$2], n$1, l$1);
			if (e$2 instanceof n$1) {
				if (!t$2) {
					const t$3 = !!(2 & (0 | e$2.l[Q]));
					i$2 &&= !t$3, o$2 &&= t$3;
				}
				c$1[a$2++] = e$2;
			}
		}
		a$2 < s$2 && (c$1.length = a$2), u$1 |= 4, u$1 = o$2 ? 16 | u$1 : -17 & u$1, nt(c$1, u$1 = i$2 ? 8 | u$1 : -9 & u$1), t$2 && Object.freeze(c$1);
	}
	if (o$1 && !(8 & u$1 || !r$1.length && (1 === a$1 || 4 === a$1 && 32 & u$1))) {
		for (Se(u$1) && (r$1 = st(r$1), u$1 = je(u$1, e$1), e$1 = ye(t$1, e$1, 1, r$1)), n$1 = r$1, o$1 = u$1, c$1 = 0; c$1 < n$1.length; c$1++) (u$1 = n$1[c$1]) !== (l$1 = de(u$1)) && (n$1[c$1] = l$1);
		o$1 |= 8, nt(n$1, o$1 = n$1.length ? -17 & o$1 : 16 | o$1), u$1 = o$1;
	}
	return 1 === a$1 || 4 === a$1 && 32 & u$1 ? Se(u$1) || (e$1 = u$1, (u$1 |= !r$1.length || 16 & u$1 && (!s$1 || 32 & u$1) ? 2 : 1024) !== e$1 && nt(r$1, u$1), Object.freeze(r$1)) : (2 === a$1 && Se(u$1) && (nt(r$1 = st(r$1), u$1 = Ce(u$1 = je(u$1, e$1), e$1, i$1)), e$1 = ye(t$1, e$1, 1, r$1)), Se(u$1) || (t$1 = u$1, (u$1 = Ce(u$1, e$1, i$1)) !== t$1 && nt(r$1, u$1))), r$1;
}
function Fe(t$1, e$1) {
	const n$1 = 0 | t$1.l[Q];
	return ke(t$1, n$1, e$1, void 0 === gt ? 2 : 4, !1, !(2 & n$1));
}
function Ne(t$1, e$1, n$1, r$1) {
	return r$1 ??= void 0, me(t$1, n$1, r$1);
}
function Ve(t$1, e$1, n$1) {
	var r$1 = pi;
	n$1 ??= void 0;
	t: {
		let i$1 = 0 | (t$1 = t$1.l)[Q];
		if (ft(i$1), null == n$1) {
			const n$2 = xe(t$1);
			if (Pe(n$2, t$1, i$1, r$1) !== e$1) break t;
			n$2.set(r$1, 0);
		} else i$1 = Ue(t$1, i$1, r$1, e$1);
		ye(t$1, i$1, e$1, n$1);
	}
}
function je(t$1, e$1) {
	return -1025 & (t$1 = 32 | (2 & e$1 ? 2 | t$1 : -3 & t$1));
}
function Ce(t$1, e$1, n$1) {
	return 32 & e$1 && n$1 || (t$1 &= -33), t$1;
}
function Me(t$1, e$1, n$1) {
	ft(0 | t$1.l[Q]), ve(t$1, e$1, Qt, 2, !0).push(Jt(n$1));
}
function Ge(t$1, e$1) {
	var n$1 = Xr;
	const r$1 = 0 | t$1.l[Q];
	ft(r$1), t$1 = ke(t$1, r$1, n$1, 2, !0), e$1 = null != e$1 ? e$1 : new n$1(), t$1.push(e$1), t$1[Q] = 2 & (0 | e$1.l[Q]) ? -9 & t$1[Q] : -17 & t$1[Q];
}
function De(t$1, e$1) {
	return Error(`Invalid wire type: ${t$1} (at position ${e$1})`);
}
function $e() {
	return Error("Failed to read varint, encoding is invalid.");
}
function ze(t$1, e$1) {
	return Error(`Tried to read past the end of the data ${e$1} > ${t$1}`);
}
function Re(t$1) {
	if ("string" == typeof t$1) return {
		buffer: k(t$1),
		v: !1
	};
	if (Array.isArray(t$1)) return {
		buffer: new Uint8Array(t$1),
		v: !1
	};
	if (t$1.constructor === Uint8Array) return {
		buffer: t$1,
		v: !1
	};
	if (t$1.constructor === ArrayBuffer) return {
		buffer: new Uint8Array(t$1),
		v: !1
	};
	if (t$1.constructor === C) return {
		buffer: j(t$1) || new Uint8Array(0),
		v: !0
	};
	if (t$1 instanceof Uint8Array) return {
		buffer: new Uint8Array(t$1.buffer, t$1.byteOffset, t$1.byteLength),
		v: !1
	};
	throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers");
}
function We(t$1, e$1) {
	let n$1, r$1 = 0, i$1 = 0, o$1 = 0;
	const s$1 = t$1.i;
	let a$1 = t$1.g;
	do
		n$1 = s$1[a$1++], r$1 |= (127 & n$1) << o$1, o$1 += 7;
	while (o$1 < 32 && 128 & n$1);
	for (o$1 > 32 && (i$1 |= (127 & n$1) >> 4), o$1 = 3; o$1 < 32 && 128 & n$1; o$1 += 7) n$1 = s$1[a$1++], i$1 |= (127 & n$1) << o$1;
	if (Ye(t$1, a$1), n$1 < 128) return e$1(r$1 >>> 0, i$1 >>> 0);
	throw $e();
}
function He(t$1) {
	let e$1 = 0, n$1 = t$1.g;
	const r$1 = n$1 + 10, i$1 = t$1.i;
	for (; n$1 < r$1;) {
		const r$2 = i$1[n$1++];
		if (e$1 |= r$2, 0 == (128 & r$2)) return Ye(t$1, n$1), !!(127 & e$1);
	}
	throw $e();
}
function qe(t$1) {
	const e$1 = t$1.i;
	let n$1 = t$1.g, r$1 = e$1[n$1++], i$1 = 127 & r$1;
	if (128 & r$1 && (r$1 = e$1[n$1++], i$1 |= (127 & r$1) << 7, 128 & r$1 && (r$1 = e$1[n$1++], i$1 |= (127 & r$1) << 14, 128 & r$1 && (r$1 = e$1[n$1++], i$1 |= (127 & r$1) << 21, 128 & r$1 && (r$1 = e$1[n$1++], i$1 |= r$1 << 28, 128 & r$1 && 128 & e$1[n$1++] && 128 & e$1[n$1++] && 128 & e$1[n$1++] && 128 & e$1[n$1++] && 128 & e$1[n$1++]))))) throw $e();
	return Ye(t$1, n$1), i$1;
}
function Ke(t$1) {
	var e$1 = t$1.i;
	const n$1 = t$1.g;
	var r$1 = e$1[n$1], i$1 = e$1[n$1 + 1];
	const o$1 = e$1[n$1 + 2];
	return e$1 = e$1[n$1 + 3], Ye(t$1, t$1.g + 4), t$1 = 2 * ((i$1 = (r$1 << 0 | i$1 << 8 | o$1 << 16 | e$1 << 24) >>> 0) >> 31) + 1, r$1 = i$1 >>> 23 & 255, i$1 &= 8388607, 255 == r$1 ? i$1 ? NaN : t$1 * Infinity : 0 == r$1 ? 1401298464324817e-60 * t$1 * i$1 : t$1 * Math.pow(2, r$1 - 150) * (i$1 + 8388608);
}
function Xe(t$1) {
	return qe(t$1);
}
function Je(t$1, e$1, { C: n$1 = !1 } = {}) {
	t$1.C = n$1, e$1 && (e$1 = Re(e$1), t$1.i = e$1.buffer, t$1.m = e$1.v, t$1.u = 0, t$1.j = t$1.i.length, t$1.g = t$1.u);
}
function Ye(t$1, e$1) {
	if (t$1.g = e$1, e$1 > t$1.j) throw ze(t$1.j, e$1);
}
function Qe(t$1, e$1) {
	if (e$1 < 0) throw Error(`Tried to read a negative byte length: ${e$1}`);
	const n$1 = t$1.g, r$1 = n$1 + e$1;
	if (r$1 > t$1.j) throw ze(e$1, t$1.j - n$1);
	return t$1.g = r$1, n$1;
}
function Ze(t$1, e$1) {
	if (0 == e$1) return V();
	var n$1 = Qe(t$1, e$1);
	return t$1.C && t$1.m ? n$1 = t$1.i.subarray(n$1, n$1 + e$1) : (t$1 = t$1.i, n$1 = n$1 === (e$1 = n$1 + e$1) ? new Uint8Array(0) : St ? t$1.slice(n$1, e$1) : new Uint8Array(t$1.subarray(n$1, e$1))), 0 == n$1.length ? V() : new C(n$1, N);
}
function en(t$1) {
	var e$1 = t$1.g;
	if (e$1.g == e$1.j) return !1;
	t$1.j = t$1.g.g;
	var n$1 = qe(t$1.g) >>> 0;
	if (e$1 = n$1 >>> 3, !((n$1 &= 7) >= 0 && n$1 <= 5)) throw De(n$1, t$1.j);
	if (e$1 < 1) throw Error(`Invalid field number: ${e$1} (at position ${t$1.j})`);
	return t$1.m = e$1, t$1.i = n$1, !0;
}
function nn(t$1) {
	switch (t$1.i) {
		case 0:
			0 != t$1.i ? nn(t$1) : He(t$1.g);
			break;
		case 1:
			Ye(t$1 = t$1.g, t$1.g + 8);
			break;
		case 2:
			if (2 != t$1.i) nn(t$1);
			else {
				var e$1 = qe(t$1.g) >>> 0;
				Ye(t$1 = t$1.g, t$1.g + e$1);
			}
			break;
		case 5:
			Ye(t$1 = t$1.g, t$1.g + 4);
			break;
		case 3:
			for (e$1 = t$1.m;;) {
				if (!en(t$1)) throw Error("Unmatched start-group tag: stream EOF");
				if (4 == t$1.i) {
					if (t$1.m != e$1) throw Error("Unmatched end-group tag");
					break;
				}
				nn(t$1);
			}
			break;
		default: throw De(t$1.i, t$1.j);
	}
}
function rn(t$1, e$1, n$1) {
	const r$1 = t$1.g.j, i$1 = qe(t$1.g) >>> 0, o$1 = t$1.g.g + i$1;
	let s$1 = o$1 - r$1;
	if (s$1 <= 0 && (t$1.g.j = o$1, n$1(e$1, t$1, void 0, void 0, void 0), s$1 = o$1 - t$1.g.g), s$1) throw Error(`Message parsing ended unexpectedly. Expected to read ${i$1} bytes, instead read ${i$1 - s$1} bytes, either the data ended unexpectedly or the message misreported its own length`);
	t$1.g.g = o$1, t$1.g.j = r$1;
}
function on(t$1) {
	var s$1 = qe(t$1.g) >>> 0, a$1 = Qe(t$1 = t$1.g, s$1);
	if (t$1 = t$1.i, o) {
		var u$1, c$1 = t$1;
		(u$1 = i) || (u$1 = i = new TextDecoder("utf-8", { fatal: !0 })), s$1 = a$1 + s$1, c$1 = 0 === a$1 && s$1 === c$1.length ? c$1 : c$1.subarray(a$1, s$1);
		try {
			var l$1 = u$1.decode(c$1);
		} catch (t$2) {
			if (void 0 === r) {
				try {
					u$1.decode(new Uint8Array([128]));
				} catch (t$3) {}
				try {
					u$1.decode(new Uint8Array([97])), r = !0;
				} catch (t$3) {
					r = !1;
				}
			}
			throw !r && (i = void 0), t$2;
		}
	} else {
		s$1 = (l$1 = a$1) + s$1, a$1 = [];
		let r$1, i$1 = null;
		for (; l$1 < s$1;) {
			var h$1 = t$1[l$1++];
			h$1 < 128 ? a$1.push(h$1) : h$1 < 224 ? l$1 >= s$1 ? e() : (r$1 = t$1[l$1++], h$1 < 194 || 128 != (192 & r$1) ? (l$1--, e()) : a$1.push((31 & h$1) << 6 | 63 & r$1)) : h$1 < 240 ? l$1 >= s$1 - 1 ? e() : (r$1 = t$1[l$1++], 128 != (192 & r$1) || 224 === h$1 && r$1 < 160 || 237 === h$1 && r$1 >= 160 || 128 != (192 & (u$1 = t$1[l$1++])) ? (l$1--, e()) : a$1.push((15 & h$1) << 12 | (63 & r$1) << 6 | 63 & u$1)) : h$1 <= 244 ? l$1 >= s$1 - 2 ? e() : (r$1 = t$1[l$1++], 128 != (192 & r$1) || r$1 - 144 + (h$1 << 28) >> 30 != 0 || 128 != (192 & (u$1 = t$1[l$1++])) || 128 != (192 & (c$1 = t$1[l$1++])) ? (l$1--, e()) : (h$1 = (7 & h$1) << 18 | (63 & r$1) << 12 | (63 & u$1) << 6 | 63 & c$1, h$1 -= 65536, a$1.push(55296 + (h$1 >> 10 & 1023), 56320 + (1023 & h$1)))) : e(), a$1.length >= 8192 && (i$1 = n(i$1, a$1), a$1.length = 0);
		}
		l$1 = n(i$1, a$1);
	}
	return l$1;
}
function sn(t$1) {
	const e$1 = qe(t$1.g) >>> 0;
	return Ze(t$1.g, e$1);
}
function an(t$1, e$1, n$1) {
	var r$1 = qe(t$1.g) >>> 0;
	for (r$1 = t$1.g.g + r$1; t$1.g.g < r$1;) n$1.push(e$1(t$1.g));
}
function cn(t$1, e$1, n$1) {
	e$1.g ? e$1.j(t$1, e$1.g, e$1.i, n$1) : e$1.j(t$1, e$1.i, n$1);
}
function hn(t$1) {
	return t$1 ? /^\d+$/.test(t$1) ? (kt(t$1), new fn(Et, It)) : null : dn ||= new fn(0, 0);
}
function gn(t$1) {
	return t$1 ? /^-?\d+$/.test(t$1) ? (kt(t$1), new pn(Et, It)) : null : mn ||= new pn(0, 0);
}
function yn(t$1, e$1, n$1) {
	for (; n$1 > 0 || e$1 > 127;) t$1.g.push(127 & e$1 | 128), e$1 = (e$1 >>> 7 | n$1 << 25) >>> 0, n$1 >>>= 7;
	t$1.g.push(e$1);
}
function bn(t$1, e$1) {
	for (; e$1 > 127;) t$1.g.push(127 & e$1 | 128), e$1 >>>= 7;
	t$1.g.push(e$1);
}
function vn(t$1, e$1) {
	if (e$1 >= 0) bn(t$1, e$1);
	else {
		for (let n$1 = 0; n$1 < 9; n$1++) t$1.g.push(127 & e$1 | 128), e$1 >>= 7;
		t$1.g.push(1);
	}
}
function wn(t$1) {
	var e$1 = Et;
	t$1.g.push(e$1 >>> 0 & 255), t$1.g.push(e$1 >>> 8 & 255), t$1.g.push(e$1 >>> 16 & 255), t$1.g.push(e$1 >>> 24 & 255);
}
function _n(t$1, e$1) {
	0 !== e$1.length && (t$1.j.push(e$1), t$1.i += e$1.length);
}
function Sn(t$1, e$1, n$1) {
	bn(t$1.g, 8 * e$1 + n$1);
}
function An(t$1, e$1) {
	return Sn(t$1, e$1, 2), e$1 = t$1.g.end(), _n(t$1, e$1), e$1.push(t$1.i), e$1;
}
function En(t$1, e$1) {
	var n$1 = e$1.pop();
	for (n$1 = t$1.i + t$1.g.length() - n$1; n$1 > 127;) e$1.push(127 & n$1 | 128), n$1 >>>= 7, t$1.i++;
	e$1.push(n$1), t$1.i++;
}
function In(t$1, e$1, n$1) {
	Sn(t$1, e$1, 2), bn(t$1.g, n$1.length), _n(t$1, t$1.g.end()), _n(t$1, n$1);
}
function Tn() {
	const t$1 = class {
		constructor() {
			throw Error();
		}
	};
	return Object.setPrototypeOf(t$1, t$1.prototype), t$1;
}
function Vn(t$1, e$1) {
	return new Nn(t$1, e$1, xn);
}
function jn(t$1, e$1, n$1, r$1, i$1) {
	null != (e$1 = Kn(e$1, r$1)) && (n$1 = An(t$1, n$1), i$1(e$1, t$1), En(t$1, n$1));
}
function Hn(t$1, e$1, n$1, r$1) {
	var i$1 = r$1[t$1];
	if (i$1) return i$1;
	(i$1 = {}).N = r$1, i$1.A = function(t$2) {
		switch (typeof t$2) {
			case "boolean": return oe ||= [
				0,
				void 0,
				!0
			];
			case "number": return t$2 > 0 ? void 0 : 0 === t$2 ? se ||= [0, void 0] : [-t$2, void 0];
			case "string": return [0, t$2];
			case "object": return t$2;
		}
	}(r$1[0]);
	var o$1 = r$1[1];
	let s$1 = 1;
	o$1 && o$1.constructor === Object && (i$1.F = o$1, "function" == typeof (o$1 = r$1[++s$1]) && (i$1.G = !0, Rn ??= o$1, Wn ??= r$1[s$1 + 1], o$1 = r$1[s$1 += 2]));
	const a$1 = {};
	for (; o$1 && Array.isArray(o$1) && o$1.length && "number" == typeof o$1[0] && o$1[0] > 0;) {
		for (var u$1 = 0; u$1 < o$1.length; u$1++) a$1[o$1[u$1]] = o$1;
		o$1 = r$1[++s$1];
	}
	for (u$1 = 1; void 0 !== o$1;) {
		let t$2;
		"number" == typeof o$1 && (u$1 += o$1, o$1 = r$1[++s$1]);
		var c$1 = void 0;
		if (o$1 instanceof Nn ? t$2 = o$1 : (t$2 = Cn, s$1--), t$2?.j) {
			o$1 = r$1[++s$1], c$1 = r$1;
			var l$1 = s$1;
			"function" == typeof o$1 && (o$1 = o$1(), c$1[l$1] = o$1), c$1 = o$1;
		}
		for (l$1 = u$1 + 1, "number" == typeof (o$1 = r$1[++s$1]) && o$1 < 0 && (l$1 -= o$1, o$1 = r$1[++s$1]); u$1 < l$1; u$1++) {
			const r$2 = a$1[u$1];
			c$1 ? n$1(i$1, u$1, t$2, c$1, r$2) : e$1(i$1, u$1, t$2, r$2);
		}
	}
	return r$1[t$1] = i$1;
}
function qn(t$1) {
	return Array.isArray(t$1) ? t$1[0] instanceof Nn ? t$1 : [Mn, t$1] : [t$1, void 0];
}
function Kn(t$1, e$1) {
	return t$1 instanceof ln ? t$1.l : Array.isArray(t$1) ? ue(t$1, e$1, !1) : void 0;
}
function Xn(t$1, e$1, n$1, r$1) {
	const i$1 = n$1.g;
	t$1[e$1] = r$1 ? (t$2, e$2, n$2) => i$1(t$2, e$2, n$2, r$1) : i$1;
}
function Jn(t$1, e$1, n$1, r$1, i$1) {
	const o$1 = n$1.g;
	let s$1, a$1;
	t$1[e$1] = (t$2, e$2, n$2) => o$1(t$2, e$2, n$2, a$1 ||= Hn(Dn, Xn, Jn, r$1).A, s$1 ||= Yn(r$1), i$1);
}
function Yn(t$1) {
	let e$1 = t$1[$n];
	if (null != e$1) return e$1;
	const n$1 = Hn(Dn, Xn, Jn, t$1);
	return e$1 = n$1.G ? (t$2, e$2) => Rn(t$2, e$2, n$1) : (t$2, e$2) => {
		const r$1 = 0 | t$2[Q];
		for (; en(e$2) && 4 != e$2.i;) {
			var i$1 = e$2.m, o$1 = n$1[i$1];
			if (null == o$1) {
				var s$1 = n$1.F;
				s$1 && (s$1 = s$1[i$1]) && null != (s$1 = Qn(s$1)) && (o$1 = n$1[i$1] = s$1);
			}
			null != o$1 && o$1(e$2, t$2, i$1) || (i$1 = (o$1 = e$2).j, nn(o$1), o$1.D ? o$1 = void 0 : (s$1 = o$1.g.g - i$1, o$1.g.g = i$1, o$1 = Ze(o$1.g, s$1)), i$1 = t$2, o$1 && ((s$1 = i$1[X]) ? s$1.push(o$1) : i$1[X] = [o$1]));
		}
		return 8192 & r$1 && et(t$2, 34), !0;
	}, t$1[$n] = e$1;
}
function Qn(t$1) {
	const e$1 = (t$1 = qn(t$1))[0].g;
	if (t$1 = t$1[1]) {
		const n$1 = Yn(t$1), r$1 = Hn(Dn, Xn, Jn, t$1).A;
		return (t$2, i$1, o$1) => e$1(t$2, i$1, o$1, r$1, n$1);
	}
	return e$1;
}
function Zn(t$1, e$1, n$1) {
	t$1[e$1] = n$1.i;
}
function tr(t$1, e$1, n$1, r$1) {
	let i$1, o$1;
	const s$1 = n$1.i;
	t$1[e$1] = (t$2, e$2, n$2) => s$1(t$2, e$2, n$2, o$1 ||= Hn(Gn, Zn, tr, r$1).A, i$1 ||= er(r$1));
}
function er(t$1) {
	let e$1 = t$1[zn];
	if (!e$1) {
		const n$1 = Hn(Gn, Zn, tr, t$1);
		e$1 = (t$2, e$2) => nr(t$2, e$2, n$1), t$1[zn] = e$1;
	}
	return e$1;
}
function nr(t$1, e$1, n$1) {
	(function(t$2, e$2, n$2) {
		const r$1 = 512 & e$2 ? 0 : -1, i$1 = t$2.length, o$1 = i$1 + ((e$2 = 64 & e$2 ? 256 & e$2 : !!i$1 && ct(t$2[i$1 - 1])) ? -1 : 0);
		for (let e$3 = 0; e$3 < o$1; e$3++) n$2(e$3 - r$1, t$2[e$3]);
		if (e$2) {
			t$2 = t$2[i$1 - 1];
			for (const e$3 in t$2) !isNaN(e$3) && n$2(+e$3, t$2[e$3]);
		}
	})(t$1, 0 | t$1[Q] | (n$1.A[1] ? 512 : 0), ((t$2, r$1) => {
		if (null != r$1) {
			var i$1 = function(t$3, e$2) {
				var n$2 = t$3[e$2];
				if (n$2) return n$2;
				if ((n$2 = t$3.F) && (n$2 = n$2[e$2])) {
					var r$2 = (n$2 = qn(n$2))[0].i;
					if (n$2 = n$2[1]) {
						const e$3 = er(n$2), i$2 = Hn(Gn, Zn, tr, n$2).A;
						n$2 = t$3.G ? Wn(i$2, e$3) : (t$4, n$3, o$1) => r$2(t$4, n$3, o$1, i$2, e$3);
					} else n$2 = r$2;
					return t$3[e$2] = n$2;
				}
			}(n$1, t$2);
			i$1 && i$1(e$1, r$1, t$2);
		}
	})), (t$1 = dt(t$1)) && function(t$2, e$2) {
		_n(t$2, t$2.g.end());
		for (let n$2 = 0; n$2 < e$2.length; n$2++) _n(t$2, j(e$2[n$2]) || new Uint8Array(0));
	}(e$1, t$1);
}
function rr(t$1, e$1) {
	if (Array.isArray(e$1)) {
		var n$1 = 0 | e$1[Q];
		if (4 & n$1) return e$1;
		for (var r$1 = 0, i$1 = 0; r$1 < e$1.length; r$1++) {
			const n$2 = t$1(e$1[r$1]);
			null != n$2 && (e$1[i$1++] = n$2);
		}
		return i$1 < r$1 && (e$1.length = i$1), nt(e$1, -6145 & (5 | n$1)), 2 & n$1 && Object.freeze(e$1), e$1;
	}
}
function ir(t$1, e$1, n$1) {
	return new Nn(t$1, e$1, n$1);
}
function or(t$1, e$1, n$1) {
	return new Nn(t$1, e$1, n$1);
}
function sr(t$1, e$1, n$1) {
	ye(t$1, 0 | t$1[Q], e$1, n$1);
}
function ar(t$1, e$1, n$1) {
	if (e$1 = function(t$2) {
		if (null == t$2) return t$2;
		const e$2 = typeof t$2;
		if ("bigint" === e$2) return String(Nt(64, t$2));
		if (zt(t$2)) {
			if ("string" === e$2) return qt(t$2);
			if ("number" === e$2) return Ht(t$2);
		}
	}(e$1), null != e$1) {
		if ("string" == typeof e$1) gn(e$1);
		if (null != e$1) switch (Sn(t$1, n$1, 0), typeof e$1) {
			case "number":
				t$1 = t$1.g, xt(e$1), yn(t$1, Et, It);
				break;
			case "bigint":
				n$1 = BigInt.asUintN(64, e$1), n$1 = new pn(Number(n$1 & BigInt(4294967295)), Number(n$1 >> BigInt(32))), yn(t$1.g, n$1.i, n$1.g);
				break;
			default: n$1 = gn(e$1), yn(t$1.g, n$1.i, n$1.g);
		}
	}
}
function ur(t$1, e$1, n$1) {
	null != (e$1 = Rt(e$1)) && null != e$1 && (Sn(t$1, n$1, 0), vn(t$1.g, e$1));
}
function cr(t$1, e$1, n$1) {
	null != (e$1 = null == e$1 || "boolean" == typeof e$1 ? e$1 : "number" == typeof e$1 ? !!e$1 : void 0) && (Sn(t$1, n$1, 0), t$1.g.g.push(e$1 ? 1 : 0));
}
function lr(t$1, e$1, n$1) {
	null != (e$1 = Qt(e$1)) && In(t$1, n$1, u(e$1));
}
function hr(t$1, e$1, n$1, r$1, i$1) {
	null != (e$1 = Kn(e$1, r$1)) && (n$1 = An(t$1, n$1), i$1(e$1, t$1), En(t$1, n$1));
}
function fr(t$1, e$1, n$1) {
	null == e$1 || "string" == typeof e$1 || e$1 instanceof C || (F(e$1) ? F(e$1) && R(Y) : e$1 = void 0), null != e$1 && In(t$1, n$1, Re(e$1).buffer);
}
function Or(t$1, e$1) {
	return (n$1, r$1) => {
		if (un.length) {
			const t$2 = un.pop();
			t$2.o(r$1), Je(t$2.g, n$1, r$1), n$1 = t$2;
		} else n$1 = new class {
			constructor(t$2, e$2) {
				if (tn.length) {
					const n$2 = tn.pop();
					Je(n$2, t$2, e$2), t$2 = n$2;
				} else t$2 = new class {
					constructor(t$3, e$3) {
						this.i = null, this.m = !1, this.g = this.j = this.u = 0, Je(this, t$3, e$3);
					}
					clear() {
						this.i = null, this.m = !1, this.g = this.j = this.u = 0, this.C = !1;
					}
				}(t$2, e$2);
				this.g = t$2, this.j = this.g.g, this.i = this.m = -1, this.o(e$2);
			}
			o({ D: t$2 = !1 } = {}) {
				this.D = t$2;
			}
		}(n$1, r$1);
		try {
			const r$2 = new t$1(), o$1 = r$2.l;
			Yn(e$1)(o$1, n$1);
			var i$1 = r$2;
		} finally {
			n$1.g.clear(), n$1.m = -1, n$1.i = -1, un.length < 100 && un.push(n$1);
		}
		return i$1;
	};
}
function Vr(t$1) {
	void 0 === Fr && (Fr = function() {
		let t$2 = null;
		if (!Nr) return t$2;
		try {
			const e$2 = (t$3) => t$3;
			t$2 = Nr.createPolicy("goog#html", {
				createHTML: e$2,
				createScript: e$2,
				createScriptURL: e$2
			});
		} catch (t$3) {}
		return t$2;
	}());
	var e$1 = Fr;
	return new class {
		constructor(t$2) {
			this.g = t$2;
		}
		toString() {
			return this.g + "";
		}
	}(e$1 ? e$1.createScriptURL(t$1) : t$1);
}
function jr(t$1, ...e$1) {
	if (0 === e$1.length) return Vr(t$1[0]);
	let n$1 = t$1[0];
	for (let r$1 = 0; r$1 < e$1.length; r$1++) n$1 += encodeURIComponent(e$1[r$1]) + t$1[r$1 + 1];
	return Vr(n$1);
}
function Kr(t$1) {
	Me(t$1, 3, "TEXT:text_in");
}
function Zr(t$1) {
	Me(t$1, 10, "text_in");
}
function Ai(t$1, e$1) {
	if (e$1 = e$1 ? he(e$1) : new hi(), void 0 !== t$1.displayNamesLocale ? me(e$1, 1, Yt(t$1.displayNamesLocale)) : void 0 === t$1.displayNamesLocale && me(e$1, 1), void 0 !== t$1.maxResults) {
		var n$1 = t$1.maxResults;
		if (null != n$1) {
			if ("number" != typeof n$1) throw z();
			if (!Ct(n$1)) throw z();
			n$1 |= 0;
		}
		me(e$1, 2, n$1);
	} else "maxResults" in t$1 && me(e$1, 2);
	if (void 0 !== t$1.scoreThreshold) {
		if (null != (n$1 = t$1.scoreThreshold) && "number" != typeof n$1) throw Error(`Value of float/double field must be a number, found ${typeof n$1}: ${n$1}`);
		me(e$1, 3, n$1);
	} else "scoreThreshold" in t$1 && me(e$1, 3);
	return void 0 !== t$1.categoryAllowlist ? Ae(e$1, 4, t$1.categoryAllowlist) : "categoryAllowlist" in t$1 && me(e$1, 4), void 0 !== t$1.categoryDenylist ? Ae(e$1, 5, t$1.categoryDenylist) : "categoryDenylist" in t$1 && me(e$1, 5), e$1;
}
function Ei(t$1) {
	const e$1 = { classifications: Fe(t$1, ii).map(((t$2) => function(t$3, e$2 = -1, n$1 = "") {
		return {
			categories: t$3.map(((t$4) => {
				var e$3 = Rt(ge(t$4, 1)) ?? 0 ?? -1;
				const n$2 = t$4.l;
				let r$1 = 0 | n$2[Q];
				const i$1 = pe(n$2, r$1, 2), o$1 = Gt(i$1);
				return null != o$1 && o$1 !== i$1 && ye(n$2, r$1, 2, o$1), {
					index: e$3,
					score: o$1 ?? 0 ?? 0,
					categoryName: Qt(ge(t$4, 3)) ?? "" ?? "",
					displayName: Qt(ge(t$4, 4)) ?? "" ?? ""
				};
			})),
			headIndex: e$2,
			headName: n$1
		};
	}(Oe(t$2, ri, 4)?.g() ?? [], Rt(ge(t$2, 2)) ?? 0, Qt(ge(t$2, 3)) ?? ""))) };
	return null != Kt(ge(t$1, 2)) && (e$1.timestampMs = Kt(ge(t$1, 2)) ?? 0), e$1;
}
function Ii(t$1) {
	return Array.from(t$1, ((t$2) => t$2 > 127 ? t$2 - 256 : t$2));
}
function Ti(t$1, e$1) {
	if (t$1.length !== e$1.length) throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${t$1.length} vs. ${e$1.length}).`);
	let n$1 = 0, r$1 = 0, i$1 = 0;
	for (let o$1 = 0; o$1 < t$1.length; o$1++) n$1 += t$1[o$1] * e$1[o$1], r$1 += t$1[o$1] * t$1[o$1], i$1 += e$1[o$1] * e$1[o$1];
	if (r$1 <= 0 || i$1 <= 0) throw Error("Cannot compute cosine similarity on embedding with 0 norm.");
	return n$1 / Math.sqrt(r$1 * i$1);
}
async function Pi() {
	if (void 0 === xi) try {
		await WebAssembly.instantiate(Ui), xi = !0;
	} catch {
		xi = !1;
	}
	return xi;
}
async function Bi(t$1, e$1 = jr``) {
	const n$1 = await Pi() ? "wasm_internal" : "wasm_nosimd_internal";
	return {
		wasmLoaderPath: `${e$1}/${t$1}_${n$1}.js`,
		wasmBinaryPath: `${e$1}/${t$1}_${n$1}.wasm`
	};
}
function Oi() {
	var t$1 = navigator;
	return "undefined" != typeof OffscreenCanvas && (!function(t$2 = navigator) {
		return (t$2 = t$2.userAgent).includes("Safari") && !t$2.includes("Chrome");
	}(t$1) || !!((t$1 = t$1.userAgent.match(/Version\/([\d]+).*Safari/)) && t$1.length >= 1 && Number(t$1[1]) >= 17));
}
async function ki(t$1) {
	if ("function" != typeof importScripts) {
		const e$1 = document.createElement("script");
		return e$1.src = t$1.toString(), e$1.crossOrigin = "anonymous", new Promise(((t$2, n$1) => {
			e$1.addEventListener("load", (() => {
				t$2();
			}), !1), e$1.addEventListener("error", ((t$3) => {
				n$1(t$3);
			}), !1), document.body.appendChild(e$1);
		}));
	}
	importScripts(t$1.toString());
}
function Fi(t$1, e$1, n$1) {
	t$1.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"), n$1(e$1 = t$1.h.stringToNewUTF8(e$1)), t$1.h._free(e$1);
}
function Ni(t$1, e$1, n$1) {
	t$1.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");
	const r$1 = new Uint32Array(e$1.length);
	for (let n$2 = 0; n$2 < e$1.length; n$2++) r$1[n$2] = t$1.h.stringToNewUTF8(e$1[n$2]);
	e$1 = t$1.h._malloc(4 * r$1.length), t$1.h.HEAPU32.set(r$1, e$1 >> 2), n$1(e$1);
	for (const e$2 of r$1) t$1.h._free(e$2);
	t$1.h._free(e$1);
}
function Vi(t$1, e$1, n$1) {
	t$1.h.simpleListeners = t$1.h.simpleListeners || {}, t$1.h.simpleListeners[e$1] = n$1;
}
function ji(t$1, e$1, n$1) {
	let r$1 = [];
	t$1.h.simpleListeners = t$1.h.simpleListeners || {}, t$1.h.simpleListeners[e$1] = (t$2, e$2, i$1) => {
		e$2 ? (n$1(r$1, i$1), r$1 = []) : r$1.push(t$2);
	};
}
async function Gi(t$1, e$1, n$1) {
	return t$1 = await (async (t$2, e$2, n$2, r$1) => {
		if (e$2 && await ki(e$2), !self.ModuleFactory) throw Error("ModuleFactory not set.");
		if (n$2 && (await ki(n$2), !self.ModuleFactory)) throw Error("ModuleFactory not set.");
		return self.Module && r$1 && ((e$2 = self.Module).locateFile = r$1.locateFile, r$1.mainScriptUrlOrBlob && (e$2.mainScriptUrlOrBlob = r$1.mainScriptUrlOrBlob)), r$1 = await self.ModuleFactory(self.Module || r$1), self.ModuleFactory = self.Module = void 0, new t$2(r$1, null);
	})(t$1, e$1.wasmLoaderPath, e$1.assetLoaderPath, { locateFile: (t$2) => t$2.endsWith(".wasm") ? e$1.wasmBinaryPath.toString() : e$1.assetBinaryPath && t$2.endsWith(".data") ? e$1.assetBinaryPath.toString() : t$2 }), await t$1.o(n$1), t$1;
}
async function Di(t$1, e$1, n$1) {
	return Gi(t$1, e$1, n$1);
}
function $i(t$1, e$1) {
	const n$1 = Oe(t$1.baseOptions, mi, 1) || new mi();
	"string" == typeof e$1 ? (me(n$1, 2, Yt(e$1)), me(n$1, 1)) : e$1 instanceof Uint8Array && (me(n$1, 1, lt(e$1, !1)), me(n$1, 2)), Ne(t$1.baseOptions, 0, 1, n$1);
}
function zi(t$1, e$1) {
	const n$1 = e$1.baseOptions || {};
	if (e$1.baseOptions?.modelAssetBuffer && e$1.baseOptions?.modelAssetPath) throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");
	if (!(Oe(t$1.baseOptions, mi, 1)?.g() || Oe(t$1.baseOptions, mi, 1)?.i() || e$1.baseOptions?.modelAssetBuffer || e$1.baseOptions?.modelAssetPath)) throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");
	if (function(t$2, e$2) {
		let n$2 = Oe(t$2.baseOptions, gi, 3);
		if (!n$2) {
			var r$1 = n$2 = new gi();
			Ve(r$1, 4, new $r());
		}
		"delegate" in e$2 && ("GPU" === e$2.delegate ? Ve(e$2 = n$2, 2, r$1 = new Mr()) : Ve(e$2 = n$2, 4, r$1 = new $r())), Ne(t$2.baseOptions, 0, 3, n$2);
	}(t$1, n$1), n$1.modelAssetPath) return fetch(n$1.modelAssetPath.toString()).then(((t$2) => {
		if (t$2.ok) return t$2.arrayBuffer();
		throw Error(`Failed to fetch model: ${n$1.modelAssetPath} (${t$2.status})`);
	})).then(((e$2) => {
		try {
			t$1.g.h.FS_unlink("/model.dat");
		} catch {}
		t$1.g.h.FS_createDataFile("/", "model.dat", new Uint8Array(e$2), !0, !1, !1), $i(t$1, "/model.dat"), t$1.u();
	}));
	if (n$1.modelAssetBuffer instanceof Uint8Array) $i(t$1, n$1.modelAssetBuffer);
	else if (n$1.modelAssetBuffer) return async function(t$2) {
		const e$2 = [];
		for (var n$2 = 0;;) {
			const { done: r$1, value: i$1 } = await t$2.read();
			if (r$1) break;
			e$2.push(i$1), n$2 += i$1.length;
		}
		if (0 === e$2.length) return new Uint8Array(0);
		if (1 === e$2.length) return e$2[0];
		t$2 = new Uint8Array(n$2), n$2 = 0;
		for (const r$1 of e$2) t$2.set(r$1, n$2), n$2 += r$1.length;
		return t$2;
	}(n$1.modelAssetBuffer).then(((e$2) => {
		$i(t$1, e$2), t$1.u();
	}));
	return t$1.u(), Promise.resolve();
}
function Ri(t$1) {
	try {
		const e$1 = t$1.m.length;
		if (1 === e$1) throw Error(t$1.m[0].message);
		if (e$1 > 1) throw Error("Encountered multiple errors: " + t$1.m.map(((t$2) => t$2.message)).join(", "));
	} finally {
		t$1.m = [];
	}
}
function Wi(t$1, e$1) {
	t$1.j = Math.max(t$1.j, e$1);
}
var t, r, i, o, s, a, c, l, h, f, d, g, p, m, S, A, E, x, U, B, L, N, C, M, G, W, q, K, X, J, Y, Q, Z, tt, at, ut, ht, gt, pt, mt, yt, bt, vt, wt, St, At, Et, It, Nt, Vt, jt, Ct, Mt, $t, ie, oe, se, tn, un, ln, fn, dn, pn, mn, xn, Un, Pn, Bn, Ln, On, kn, Fn, Nn, Cn, Mn, Gn, Dn, $n, zn, Rn, Wn, dr, gr, pr, mr, yr, br, vr, wr, _r, Sr, Ar, Er, Ir, Tr, xr, Ur, Pr, Br, Lr, kr, Fr, Nr, Cr, Mr, Gr, Dr, $r, zr, Rr, Wr, Hr, qr, Xr, Jr, Yr, Qr, ti, ei, ni, ri, ii, oi, si, ai, ui, ci, li, hi, fi, di, gi, pi, mi, yi, bi, vi, wi, _i, Si, xi, Ui, Li, Ci, Mi, Hi, qi, Ki, Xi;
var init_text_bundle = __esmMin((() => {
	t = "undefined" != typeof self ? self : {};
	o = "undefined" != typeof TextDecoder;
	a = "undefined" != typeof TextEncoder;
	t: {
		for (h = ["CLOSURE_FLAGS"], f = t, d = 0; d < h.length; d++) if (null == (f = f[h[d]])) {
			l = null;
			break t;
		}
		l = f;
	}
	p = l && l[610401301];
	c = null != p && p;
	m = t.navigator;
	g = m && m.userAgentData || null, _[" "] = function() {};
	S = !v() && (b("Trident") || b("MSIE"));
	!b("Android") || w(), w(), b("Safari") && (w() || !v() && b("Coast") || !v() && b("Opera") || !v() && b("Edge") || (v() ? y("Microsoft Edge") : b("Edg/")) || v() && y("Opera"));
	A = {}, E = null;
	x = "undefined" != typeof Uint8Array, U = !S && "function" == typeof btoa;
	B = /[-_.]/g, L = {
		"-": "+",
		_: "/",
		".": "="
	};
	N = {};
	C = class {
		i() {
			return new Uint8Array(j(this) || 0);
		}
		constructor(t$1, e$1) {
			if (D(e$1), this.g = t$1, null != t$1 && 0 === t$1.length) throw Error("ByteString should be constructed with non-empty values");
		}
	};
	W = "function" == typeof Symbol && "symbol" == typeof Symbol();
	q = H("jas", void 0, !0), K = H(void 0, "1oa"), X = H(void 0, Symbol()), J = H(void 0, "0actk"), Y = H(void 0, "8utk");
	Q = W ? q : "L", Z = { L: {
		value: 0,
		configurable: !0,
		writable: !0,
		enumerable: !1
	} }, tt = Object.defineProperties;
	ut = {};
	ht = [];
	nt(ht, 55), at = Object.freeze(ht);
	gt = Object.freeze({});
	pt = "function" == typeof t.BigInt && "bigint" == typeof t.BigInt(0), mt = (t$1) => pt ? t$1 >= bt && t$1 <= wt : "-" === t$1[0] ? _t(t$1, yt) : _t(t$1, vt);
	yt = Number.MIN_SAFE_INTEGER.toString(), bt = pt ? BigInt(Number.MIN_SAFE_INTEGER) : void 0, vt = Number.MAX_SAFE_INTEGER.toString(), wt = pt ? BigInt(Number.MAX_SAFE_INTEGER) : void 0;
	St = "function" == typeof Uint8Array.prototype.slice;
	Et = 0, It = 0;
	Nt = "function" == typeof BigInt ? BigInt.asIntN : void 0, Vt = "function" == typeof BigInt ? BigInt.asUintN : void 0, jt = Number.isSafeInteger, Ct = Number.isFinite, Mt = Math.trunc;
	$t = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
	tn = [];
	un = [];
	ln = class {
		constructor(t$1, e$1) {
			this.l = ce(t$1, e$1);
		}
		toJSON() {
			try {
				var t$1 = ae(this);
			} finally {
				ie = void 0;
			}
			return t$1;
		}
		v() {
			return !!(2 & (0 | this.l[Q]));
		}
	};
	ln.prototype.B = ut, ln.prototype.toString = function() {
		return this.l.toString();
	};
	fn = class {
		constructor(t$1, e$1) {
			this.i = t$1 >>> 0, this.g = e$1 >>> 0;
		}
	};
	pn = class {
		constructor(t$1, e$1) {
			this.i = t$1 >>> 0, this.g = e$1 >>> 0;
		}
	};
	xn = Tn(), Un = Tn(), Pn = Tn(), Bn = Tn(), Ln = Tn(), On = Tn(), kn = Tn(), Fn = Tn(), Nn = class {
		constructor(t$1, e$1, n$1) {
			this.g = t$1, this.i = e$1, t$1 = xn, this.j = !!t$1 && n$1 === t$1 || !1;
		}
	};
	Cn = Vn((function(t$1, e$1, n$1, r$1, i$1) {
		return 2 === t$1.i && (rn(t$1, Be(e$1, r$1, n$1), i$1), !0);
	}), jn), Mn = Vn((function(t$1, e$1, n$1, r$1, i$1) {
		return 2 === t$1.i && (rn(t$1, Be(e$1, r$1, n$1), i$1), !0);
	}), jn);
	Gn = Symbol(), Dn = Symbol(), $n = Symbol(), zn = Symbol();
	dr = ir((function(t$1, e$1, n$1) {
		return 5 === t$1.i && (sr(e$1, n$1, Ke(t$1.g)), !0);
	}), (function(t$1, e$1, n$1) {
		null != (e$1 = Gt(e$1)) && (Sn(t$1, n$1, 5), t$1 = t$1.g, Ut(e$1), wn(t$1));
	}), On), gr = or((function(t$1, e$1, n$1) {
		return (5 === t$1.i || 2 === t$1.i) && (e$1 = Ie(e$1, 0 | e$1[Q], n$1, !1), 2 == t$1.i ? an(t$1, Ke, e$1) : e$1.push(Ke(t$1.g)), !0);
	}), (function(t$1, e$1, n$1) {
		if (null != (e$1 = rr(Gt, e$1)) && e$1.length) {
			Sn(t$1, n$1, 2), bn(t$1.g, 4 * e$1.length);
			for (let r$1 = 0; r$1 < e$1.length; r$1++) n$1 = t$1.g, Ut(e$1[r$1]), wn(n$1);
		}
	}), On), pr = ir((function(t$1, e$1, n$1) {
		return 0 === t$1.i && (sr(e$1, n$1, We(t$1.g, Bt)), !0);
	}), ar, Ln), mr = ir((function(t$1, e$1, n$1) {
		return 0 === t$1.i && (sr(e$1, n$1, 0 === (t$1 = We(t$1.g, Bt)) ? void 0 : t$1), !0);
	}), ar, Ln), yr = ir((function(t$1, e$1, n$1) {
		return 0 === t$1.i && (sr(e$1, n$1, We(t$1.g, Pt)), !0);
	}), (function(t$1, e$1, n$1) {
		if (null != (e$1 = Xt(e$1))) {
			if ("string" == typeof e$1) hn(e$1);
			if (null != e$1) switch (Sn(t$1, n$1, 0), typeof e$1) {
				case "number":
					t$1 = t$1.g, xt(e$1), yn(t$1, Et, It);
					break;
				case "bigint":
					n$1 = BigInt.asUintN(64, e$1), n$1 = new fn(Number(n$1 & BigInt(4294967295)), Number(n$1 >> BigInt(32))), yn(t$1.g, n$1.i, n$1.g);
					break;
				default: n$1 = hn(e$1), yn(t$1.g, n$1.i, n$1.g);
			}
		}
	}), Tn()), br = ir((function(t$1, e$1, n$1) {
		return 0 === t$1.i && (sr(e$1, n$1, qe(t$1.g)), !0);
	}), ur, Bn), vr = or((function(t$1, e$1, n$1) {
		return (0 === t$1.i || 2 === t$1.i) && (e$1 = Ie(e$1, 0 | e$1[Q], n$1, !1), 2 == t$1.i ? an(t$1, qe, e$1) : e$1.push(qe(t$1.g)), !0);
	}), (function(t$1, e$1, n$1) {
		if (null != (e$1 = rr(Rt, e$1)) && e$1.length) {
			n$1 = An(t$1, n$1);
			for (let n$2 = 0; n$2 < e$1.length; n$2++) vn(t$1.g, e$1[n$2]);
			En(t$1, n$1);
		}
	}), Bn), wr = ir((function(t$1, e$1, n$1) {
		return 0 === t$1.i && (sr(e$1, n$1, 0 === (t$1 = qe(t$1.g)) ? void 0 : t$1), !0);
	}), ur, Bn), _r = ir((function(t$1, e$1, n$1) {
		return 0 === t$1.i && (sr(e$1, n$1, He(t$1.g)), !0);
	}), cr, Un), Sr = ir((function(t$1, e$1, n$1) {
		return 0 === t$1.i && (sr(e$1, n$1, !1 === (t$1 = He(t$1.g)) ? void 0 : t$1), !0);
	}), cr, Un), Ar = or((function(t$1, e$1, n$1) {
		return 2 === t$1.i && (t$1 = on(t$1), Ie(e$1, 0 | e$1[Q], n$1, !1).push(t$1), !0);
	}), (function(t$1, e$1, n$1) {
		if (null != (e$1 = rr(Qt, e$1))) for (let s$1 = 0; s$1 < e$1.length; s$1++) {
			var r$1 = t$1, i$1 = n$1, o$1 = e$1[s$1];
			null != o$1 && In(r$1, i$1, u(o$1));
		}
	}), Pn), Er = ir((function(t$1, e$1, n$1) {
		return 2 === t$1.i && (sr(e$1, n$1, "" === (t$1 = on(t$1)) ? void 0 : t$1), !0);
	}), lr, Pn), Ir = ir((function(t$1, e$1, n$1) {
		return 2 === t$1.i && (sr(e$1, n$1, on(t$1)), !0);
	}), lr, Pn), Tr = function(t$1, e$1, n$1 = xn) {
		return new Nn(t$1, e$1, n$1);
	}((function(t$1, e$1, n$1, r$1, i$1) {
		return 2 === t$1.i && (r$1 = ue(void 0, r$1, !0), Ie(e$1, 0 | e$1[Q], n$1, !0).push(r$1), rn(t$1, r$1, i$1), !0);
	}), (function(t$1, e$1, n$1, r$1, i$1) {
		if (Array.isArray(e$1)) for (let o$1 = 0; o$1 < e$1.length; o$1++) hr(t$1, e$1[o$1], n$1, r$1, i$1);
	})), xr = Vn((function(t$1, e$1, n$1, r$1, i$1, o$1) {
		return 2 === t$1.i && (Ue(e$1, 0 | e$1[Q], o$1, n$1), rn(t$1, e$1 = Be(e$1, r$1, n$1), i$1), !0);
	}), hr), Ur = ir((function(t$1, e$1, n$1) {
		return 2 === t$1.i && (sr(e$1, n$1, sn(t$1)), !0);
	}), fr, kn), Pr = ir((function(t$1, e$1, n$1) {
		return 0 === t$1.i && (sr(e$1, n$1, 0 === (t$1 = qe(t$1.g) >>> 0) ? void 0 : t$1), !0);
	}), (function(t$1, e$1, n$1) {
		e$1 = function(t$2) {
			if (null == t$2) return t$2;
			if ("string" == typeof t$2 && t$2) t$2 = +t$2;
			else if ("number" != typeof t$2) return;
			return Ct(t$2) ? t$2 >>> 0 : void 0;
		}(e$1), null != e$1 && null != e$1 && (Sn(t$1, n$1, 0), bn(t$1.g, e$1));
	}), Tn()), Br = ir((function(t$1, e$1, n$1) {
		return 0 === t$1.i && (sr(e$1, n$1, qe(t$1.g)), !0);
	}), (function(t$1, e$1, n$1) {
		null != (e$1 = Rt(e$1)) && (e$1 = parseInt(e$1, 10), Sn(t$1, n$1, 0), vn(t$1.g, e$1));
	}), Fn);
	Lr = class {
		constructor(t$1, e$1) {
			this.i = t$1, this.g = e$1, this.j = Ne, this.defaultValue = void 0;
		}
		register() {
			_(this);
		}
	};
	kr = [
		0,
		Er,
		ir((function(t$1, e$1, n$1) {
			return 2 === t$1.i && (sr(e$1, n$1, (t$1 = sn(t$1)) === V() ? void 0 : t$1), !0);
		}), (function(t$1, e$1, n$1) {
			if (null != e$1) {
				if (e$1 instanceof ln) {
					const r$1 = e$1.O;
					r$1 && (e$1 = r$1(e$1), null != e$1 && In(t$1, n$1, Re(e$1).buffer));
					return;
				}
				if (Array.isArray(e$1)) return;
			}
			fr(t$1, e$1, n$1);
		}), kn)
	];
	Nr = globalThis.trustedTypes;
	Cr = [
		0,
		br,
		Br,
		_r,
		-1,
		vr,
		Br,
		-1
	], Mr = class extends ln {
		constructor(t$1) {
			super(t$1);
		}
	}, Gr = [
		0,
		_r,
		Ir,
		_r,
		Br,
		-1,
		or((function(t$1, e$1, n$1) {
			return (0 === t$1.i || 2 === t$1.i) && (e$1 = Ie(e$1, 0 | e$1[Q], n$1, !1), 2 == t$1.i ? an(t$1, Xe, e$1) : e$1.push(qe(t$1.g)), !0);
		}), (function(t$1, e$1, n$1) {
			if (null != (e$1 = rr(Rt, e$1)) && e$1.length) {
				n$1 = An(t$1, n$1);
				for (let n$2 = 0; n$2 < e$1.length; n$2++) vn(t$1.g, e$1[n$2]);
				En(t$1, n$1);
			}
		}), Fn),
		Ir,
		-1,
		[
			0,
			_r,
			-1
		],
		Br,
		_r,
		-1
	], Dr = [
		0,
		Ir,
		-2
	], $r = class extends ln {
		constructor(t$1) {
			super(t$1);
		}
	}, zr = [0], Rr = [
		0,
		br,
		_r,
		1,
		_r,
		-3
	], Wr = class extends ln {
		constructor(t$1) {
			super(t$1, 2);
		}
	}, Hr = {};
	Hr[336783863] = [
		0,
		Ir,
		_r,
		-1,
		br,
		[
			0,
			[
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8,
				9
			],
			xr,
			zr,
			xr,
			Gr,
			xr,
			Dr,
			xr,
			Rr,
			xr,
			Cr,
			xr,
			[
				0,
				Ir,
				-2
			],
			xr,
			[
				0,
				Ir,
				Br
			],
			xr,
			[
				0,
				Br,
				Ir,
				-1
			],
			xr,
			[
				0,
				Br,
				-1
			]
		],
		[0, Ir],
		_r,
		[
			0,
			[1, 3],
			[2, 4],
			xr,
			[0, vr],
			-1,
			xr,
			[0, Ar],
			-1,
			Tr,
			[
				0,
				Ir,
				-1
			]
		],
		Ir
	];
	qr = [
		0,
		mr,
		-1,
		Sr,
		-3,
		mr,
		vr,
		Er,
		wr,
		mr,
		-1,
		Sr,
		wr,
		Sr,
		-2,
		Er
	];
	Xr = class extends ln {
		constructor(t$1) {
			super(t$1, 500);
		}
		o(t$1) {
			return Ne(this, 0, 7, t$1);
		}
	}, Jr = [-1, {}], Yr = [
		0,
		Ir,
		1,
		Jr
	], Qr = [
		0,
		Ir,
		Ar,
		Jr
	];
	ei = class extends ln {
		constructor(t$1) {
			super(t$1, 500);
		}
		o(t$1) {
			return Ne(this, 0, 1001, t$1);
		}
	};
	ei.prototype.g = (ti = [
		-500,
		Tr,
		[
			-500,
			Er,
			-1,
			Ar,
			-3,
			[
				-2,
				Hr,
				_r
			],
			Tr,
			kr,
			wr,
			-1,
			Yr,
			Qr,
			Tr,
			[
				0,
				Er,
				Sr
			],
			Er,
			qr,
			wr,
			Ar,
			987,
			Ar
		],
		4,
		Tr,
		[
			-500,
			Ir,
			-1,
			[-1, {}],
			998,
			Ir
		],
		Tr,
		[
			-500,
			Ir,
			Ar,
			-1,
			[
				-2,
				{},
				_r
			],
			997,
			Ar,
			-1
		],
		wr,
		Tr,
		[
			-500,
			Ir,
			Ar,
			Jr,
			998,
			Ar
		],
		Ar,
		wr,
		Yr,
		Qr,
		Tr,
		[
			0,
			Er,
			-1,
			Jr
		],
		Ar,
		-2,
		qr,
		Er,
		-1,
		Sr,
		[
			0,
			Sr,
			Pr
		],
		978,
		Jr,
		Tr,
		kr
	], function() {
		const t$1 = new class {
			constructor() {
				this.j = [], this.i = 0, this.g = new class {
					constructor() {
						this.g = [];
					}
					length() {
						return this.g.length;
					}
					end() {
						const t$2 = this.g;
						return this.g = [], t$2;
					}
				}();
			}
		}();
		nr(this.l, t$1, Hn(Gn, Zn, tr, ti)), _n(t$1, t$1.g.end());
		const e$1 = new Uint8Array(t$1.i), n$1 = t$1.j, r$1 = n$1.length;
		let i$1 = 0;
		for (let t$2 = 0; t$2 < r$1; t$2++) {
			const r$2 = n$1[t$2];
			e$1.set(r$2, i$1), i$1 += r$2.length;
		}
		return t$1.j = [e$1], e$1;
	});
	ni = class extends ln {
		constructor(t$1) {
			super(t$1);
		}
	}, ri = class extends ln {
		constructor(t$1) {
			super(t$1);
		}
		g() {
			return Fe(this, ni);
		}
	}, ii = class extends ln {
		constructor(t$1) {
			super(t$1);
		}
	}, oi = Or(class extends ln {
		constructor(t$1) {
			super(t$1);
		}
	}, [
		0,
		Tr,
		[
			0,
			1,
			br,
			Ir,
			[
				0,
				Tr,
				[
					0,
					br,
					dr,
					Ir,
					-1
				]
			]
		],
		pr
	]), si = class extends ln {
		constructor(t$1) {
			super(t$1);
		}
	}, ai = class extends ln {
		constructor(t$1) {
			super(t$1);
		}
		H() {
			const t$1 = be(this);
			return null == t$1 ? V() : t$1;
		}
	}, ui = class extends ln {
		constructor(t$1) {
			super(t$1);
		}
	}, ci = [1, 2], li = Or(class extends ln {
		constructor(t$1) {
			super(t$1);
		}
	}, [
		0,
		Tr,
		[
			0,
			ci,
			xr,
			[0, gr],
			xr,
			[0, Ur],
			br,
			Ir
		],
		pr
	]), hi = class extends ln {
		constructor(t$1) {
			super(t$1);
		}
	}, fi = class extends ln {
		constructor(t$1) {
			super(t$1);
		}
	}, di = [
		0,
		_r,
		-1
	], gi = class extends ln {
		constructor(t$1) {
			super(t$1);
		}
	}, pi = [
		1,
		2,
		3,
		4,
		5
	], mi = class extends ln {
		constructor(t$1) {
			super(t$1);
		}
		g() {
			return null != be(this);
		}
		i() {
			return null != Qt(ge(this, 2));
		}
	}, yi = class extends ln {
		constructor(t$1) {
			super(t$1);
		}
	}, bi = [
		0,
		[
			0,
			Ur,
			Ir,
			[
				0,
				br,
				pr,
				-1
			],
			[
				0,
				yr,
				pr
			]
		],
		_r,
		[
			0,
			pi,
			xr,
			Rr,
			xr,
			Gr,
			xr,
			Cr,
			xr,
			zr,
			xr,
			Dr
		],
		Br
	], vi = class extends ln {
		constructor(t$1) {
			super(t$1);
		}
	}, wi = new Lr(462704549, vi);
	Hr[462704549] = [
		0,
		bi,
		[
			0,
			Ir,
			br,
			dr,
			Ar,
			-1
		]
	];
	_i = class extends ln {
		constructor(t$1) {
			super(t$1);
		}
	}, Si = new Lr(477589892, _i);
	Hr[477589892] = [
		0,
		bi,
		di
	];
	Ui = new Uint8Array([
		0,
		97,
		115,
		109,
		1,
		0,
		0,
		0,
		1,
		5,
		1,
		96,
		0,
		1,
		123,
		3,
		2,
		1,
		0,
		10,
		10,
		1,
		8,
		0,
		65,
		0,
		253,
		15,
		253,
		98,
		11
	]);
	Li = class {};
	Li.forVisionTasks = function(t$1) {
		return Bi("vision", t$1);
	}, Li.forTextTasks = function(t$1) {
		return Bi("text", t$1);
	}, Li.forGenAiExperimentalTasks = function(t$1) {
		return Bi("genai_experimental", t$1);
	}, Li.forGenAiTasks = function(t$1) {
		return Bi("genai", t$1);
	}, Li.forAudioTasks = function(t$1) {
		return Bi("audio", t$1);
	}, Li.isSimdSupported = function() {
		return Pi();
	};
	Ci = function(t$1) {
		return class extends t$1 {
			M() {
				this.h._registerModelResourcesGraphService();
			}
		};
	}(class {
		constructor(t$1, e$1) {
			this.j = !0, this.h = t$1, this.g = null, this.i = 0, this.m = "function" == typeof this.h._addIntToInputStream, void 0 !== e$1 ? this.h.canvas = e$1 : Oi() ? this.h.canvas = new OffscreenCanvas(1, 1) : (console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."), this.h.canvas = document.createElement("canvas"));
		}
		async initializeGraph(t$1) {
			const e$1 = await (await fetch(t$1)).arrayBuffer();
			t$1 = !(t$1.endsWith(".pbtxt") || t$1.endsWith(".textproto")), this.setGraph(new Uint8Array(e$1), t$1);
		}
		setGraphFromString(t$1) {
			this.setGraph(new TextEncoder().encode(t$1), !1);
		}
		setGraph(t$1, e$1) {
			const n$1 = t$1.length, r$1 = this.h._malloc(n$1);
			this.h.HEAPU8.set(t$1, r$1), e$1 ? this.h._changeBinaryGraph(n$1, r$1) : this.h._changeTextGraph(n$1, r$1), this.h._free(r$1);
		}
		configureAudio(t$1, e$1, n$1, r$1, i$1) {
			this.h._configureAudio || console.warn("Attempting to use configureAudio without support for input audio. Is build dep \":gl_graph_runner_audio\" missing?"), Fi(this, r$1 || "input_audio", ((r$2) => {
				Fi(this, i$1 = i$1 || "audio_header", ((i$2) => {
					this.h._configureAudio(r$2, i$2, t$1, e$1 ?? 0, n$1);
				}));
			}));
		}
		setAutoResizeCanvas(t$1) {
			this.j = t$1;
		}
		setAutoRenderToScreen(t$1) {
			this.h._setAutoRenderToScreen(t$1);
		}
		setGpuBufferVerticalFlip(t$1) {
			this.h.gpuOriginForWebTexturesIsBottomLeft = t$1;
		}
		attachErrorListener(t$1) {
			this.h.errorListener = t$1;
		}
		attachEmptyPacketListener(t$1, e$1) {
			this.h.emptyPacketListeners = this.h.emptyPacketListeners || {}, this.h.emptyPacketListeners[t$1] = e$1;
		}
		addAudioToStream(t$1, e$1, n$1) {
			this.addAudioToStreamWithShape(t$1, 0, 0, e$1, n$1);
		}
		addAudioToStreamWithShape(t$1, e$1, n$1, r$1, i$1) {
			const o$1 = 4 * t$1.length;
			this.i !== o$1 && (this.g && this.h._free(this.g), this.g = this.h._malloc(o$1), this.i = o$1), this.h.HEAPF32.set(t$1, this.g / 4), Fi(this, r$1, ((t$2) => {
				this.h._addAudioToInputStream(this.g, e$1, n$1, t$2, i$1);
			}));
		}
		addGpuBufferToStream(t$1, e$1, n$1) {
			Fi(this, e$1, ((e$2) => {
				if (!this.h.canvas) throw Error("No OpenGL canvas configured.");
				e$2 ? this.h._bindTextureToStream(e$2) : this.h._bindTextureToCanvas();
				const r$1 = this.h.canvas.getContext("webgl2") || this.h.canvas.getContext("webgl");
				if (!r$1) throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");
				this.h.gpuOriginForWebTexturesIsBottomLeft && r$1.pixelStorei(r$1.UNPACK_FLIP_Y_WEBGL, !0), r$1.texImage2D(r$1.TEXTURE_2D, 0, r$1.RGBA, r$1.RGBA, r$1.UNSIGNED_BYTE, t$1), this.h.gpuOriginForWebTexturesIsBottomLeft && r$1.pixelStorei(r$1.UNPACK_FLIP_Y_WEBGL, !1);
				const [i$1, o$1] = void 0 !== t$1.videoWidth ? [t$1.videoWidth, t$1.videoHeight] : void 0 !== t$1.naturalWidth ? [t$1.naturalWidth, t$1.naturalHeight] : void 0 !== t$1.displayWidth ? [t$1.displayWidth, t$1.displayHeight] : [t$1.width, t$1.height];
				!this.j || i$1 === this.h.canvas.width && o$1 === this.h.canvas.height || (this.h.canvas.width = i$1, this.h.canvas.height = o$1);
				const [s$1, a$1] = [i$1, o$1];
				this.h._addBoundTextureToStream(e$2, s$1, a$1, n$1);
			}));
		}
		addBoolToStream(t$1, e$1, n$1) {
			Fi(this, e$1, ((e$2) => {
				this.h._addBoolToInputStream(t$1, e$2, n$1);
			}));
		}
		addDoubleToStream(t$1, e$1, n$1) {
			Fi(this, e$1, ((e$2) => {
				this.h._addDoubleToInputStream(t$1, e$2, n$1);
			}));
		}
		addFloatToStream(t$1, e$1, n$1) {
			Fi(this, e$1, ((e$2) => {
				this.h._addFloatToInputStream(t$1, e$2, n$1);
			}));
		}
		addIntToStream(t$1, e$1, n$1) {
			Fi(this, e$1, ((e$2) => {
				this.h._addIntToInputStream(t$1, e$2, n$1);
			}));
		}
		addUintToStream(t$1, e$1, n$1) {
			Fi(this, e$1, ((e$2) => {
				this.h._addUintToInputStream(t$1, e$2, n$1);
			}));
		}
		addStringToStream(t$1, e$1, n$1) {
			Fi(this, e$1, ((e$2) => {
				Fi(this, t$1, ((t$2) => {
					this.h._addStringToInputStream(t$2, e$2, n$1);
				}));
			}));
		}
		addStringRecordToStream(t$1, e$1, n$1) {
			Fi(this, e$1, ((e$2) => {
				Ni(this, Object.keys(t$1), ((r$1) => {
					Ni(this, Object.values(t$1), ((i$1) => {
						this.h._addFlatHashMapToInputStream(r$1, i$1, Object.keys(t$1).length, e$2, n$1);
					}));
				}));
			}));
		}
		addProtoToStream(t$1, e$1, n$1, r$1) {
			Fi(this, n$1, ((n$2) => {
				Fi(this, e$1, ((e$2) => {
					const i$1 = this.h._malloc(t$1.length);
					this.h.HEAPU8.set(t$1, i$1), this.h._addProtoToInputStream(i$1, t$1.length, e$2, n$2, r$1), this.h._free(i$1);
				}));
			}));
		}
		addEmptyPacketToStream(t$1, e$1) {
			Fi(this, t$1, ((t$2) => {
				this.h._addEmptyPacketToInputStream(t$2, e$1);
			}));
		}
		addBoolVectorToStream(t$1, e$1, n$1) {
			Fi(this, e$1, ((e$2) => {
				const r$1 = this.h._allocateBoolVector(t$1.length);
				if (!r$1) throw Error("Unable to allocate new bool vector on heap.");
				for (const e$3 of t$1) this.h._addBoolVectorEntry(r$1, e$3);
				this.h._addBoolVectorToInputStream(r$1, e$2, n$1);
			}));
		}
		addDoubleVectorToStream(t$1, e$1, n$1) {
			Fi(this, e$1, ((e$2) => {
				const r$1 = this.h._allocateDoubleVector(t$1.length);
				if (!r$1) throw Error("Unable to allocate new double vector on heap.");
				for (const e$3 of t$1) this.h._addDoubleVectorEntry(r$1, e$3);
				this.h._addDoubleVectorToInputStream(r$1, e$2, n$1);
			}));
		}
		addFloatVectorToStream(t$1, e$1, n$1) {
			Fi(this, e$1, ((e$2) => {
				const r$1 = this.h._allocateFloatVector(t$1.length);
				if (!r$1) throw Error("Unable to allocate new float vector on heap.");
				for (const e$3 of t$1) this.h._addFloatVectorEntry(r$1, e$3);
				this.h._addFloatVectorToInputStream(r$1, e$2, n$1);
			}));
		}
		addIntVectorToStream(t$1, e$1, n$1) {
			Fi(this, e$1, ((e$2) => {
				const r$1 = this.h._allocateIntVector(t$1.length);
				if (!r$1) throw Error("Unable to allocate new int vector on heap.");
				for (const e$3 of t$1) this.h._addIntVectorEntry(r$1, e$3);
				this.h._addIntVectorToInputStream(r$1, e$2, n$1);
			}));
		}
		addUintVectorToStream(t$1, e$1, n$1) {
			Fi(this, e$1, ((e$2) => {
				const r$1 = this.h._allocateUintVector(t$1.length);
				if (!r$1) throw Error("Unable to allocate new unsigned int vector on heap.");
				for (const e$3 of t$1) this.h._addUintVectorEntry(r$1, e$3);
				this.h._addUintVectorToInputStream(r$1, e$2, n$1);
			}));
		}
		addStringVectorToStream(t$1, e$1, n$1) {
			Fi(this, e$1, ((e$2) => {
				const r$1 = this.h._allocateStringVector(t$1.length);
				if (!r$1) throw Error("Unable to allocate new string vector on heap.");
				for (const e$3 of t$1) Fi(this, e$3, ((t$2) => {
					this.h._addStringVectorEntry(r$1, t$2);
				}));
				this.h._addStringVectorToInputStream(r$1, e$2, n$1);
			}));
		}
		addBoolToInputSidePacket(t$1, e$1) {
			Fi(this, e$1, ((e$2) => {
				this.h._addBoolToInputSidePacket(t$1, e$2);
			}));
		}
		addDoubleToInputSidePacket(t$1, e$1) {
			Fi(this, e$1, ((e$2) => {
				this.h._addDoubleToInputSidePacket(t$1, e$2);
			}));
		}
		addFloatToInputSidePacket(t$1, e$1) {
			Fi(this, e$1, ((e$2) => {
				this.h._addFloatToInputSidePacket(t$1, e$2);
			}));
		}
		addIntToInputSidePacket(t$1, e$1) {
			Fi(this, e$1, ((e$2) => {
				this.h._addIntToInputSidePacket(t$1, e$2);
			}));
		}
		addUintToInputSidePacket(t$1, e$1) {
			Fi(this, e$1, ((e$2) => {
				this.h._addUintToInputSidePacket(t$1, e$2);
			}));
		}
		addStringToInputSidePacket(t$1, e$1) {
			Fi(this, e$1, ((e$2) => {
				Fi(this, t$1, ((t$2) => {
					this.h._addStringToInputSidePacket(t$2, e$2);
				}));
			}));
		}
		addProtoToInputSidePacket(t$1, e$1, n$1) {
			Fi(this, n$1, ((n$2) => {
				Fi(this, e$1, ((e$2) => {
					const r$1 = this.h._malloc(t$1.length);
					this.h.HEAPU8.set(t$1, r$1), this.h._addProtoToInputSidePacket(r$1, t$1.length, e$2, n$2), this.h._free(r$1);
				}));
			}));
		}
		addBoolVectorToInputSidePacket(t$1, e$1) {
			Fi(this, e$1, ((e$2) => {
				const n$1 = this.h._allocateBoolVector(t$1.length);
				if (!n$1) throw Error("Unable to allocate new bool vector on heap.");
				for (const e$3 of t$1) this.h._addBoolVectorEntry(n$1, e$3);
				this.h._addBoolVectorToInputSidePacket(n$1, e$2);
			}));
		}
		addDoubleVectorToInputSidePacket(t$1, e$1) {
			Fi(this, e$1, ((e$2) => {
				const n$1 = this.h._allocateDoubleVector(t$1.length);
				if (!n$1) throw Error("Unable to allocate new double vector on heap.");
				for (const e$3 of t$1) this.h._addDoubleVectorEntry(n$1, e$3);
				this.h._addDoubleVectorToInputSidePacket(n$1, e$2);
			}));
		}
		addFloatVectorToInputSidePacket(t$1, e$1) {
			Fi(this, e$1, ((e$2) => {
				const n$1 = this.h._allocateFloatVector(t$1.length);
				if (!n$1) throw Error("Unable to allocate new float vector on heap.");
				for (const e$3 of t$1) this.h._addFloatVectorEntry(n$1, e$3);
				this.h._addFloatVectorToInputSidePacket(n$1, e$2);
			}));
		}
		addIntVectorToInputSidePacket(t$1, e$1) {
			Fi(this, e$1, ((e$2) => {
				const n$1 = this.h._allocateIntVector(t$1.length);
				if (!n$1) throw Error("Unable to allocate new int vector on heap.");
				for (const e$3 of t$1) this.h._addIntVectorEntry(n$1, e$3);
				this.h._addIntVectorToInputSidePacket(n$1, e$2);
			}));
		}
		addUintVectorToInputSidePacket(t$1, e$1) {
			Fi(this, e$1, ((e$2) => {
				const n$1 = this.h._allocateUintVector(t$1.length);
				if (!n$1) throw Error("Unable to allocate new unsigned int vector on heap.");
				for (const e$3 of t$1) this.h._addUintVectorEntry(n$1, e$3);
				this.h._addUintVectorToInputSidePacket(n$1, e$2);
			}));
		}
		addStringVectorToInputSidePacket(t$1, e$1) {
			Fi(this, e$1, ((e$2) => {
				const n$1 = this.h._allocateStringVector(t$1.length);
				if (!n$1) throw Error("Unable to allocate new string vector on heap.");
				for (const e$3 of t$1) Fi(this, e$3, ((t$2) => {
					this.h._addStringVectorEntry(n$1, t$2);
				}));
				this.h._addStringVectorToInputSidePacket(n$1, e$2);
			}));
		}
		attachBoolListener(t$1, e$1) {
			Vi(this, t$1, e$1), Fi(this, t$1, ((t$2) => {
				this.h._attachBoolListener(t$2);
			}));
		}
		attachBoolVectorListener(t$1, e$1) {
			ji(this, t$1, e$1), Fi(this, t$1, ((t$2) => {
				this.h._attachBoolVectorListener(t$2);
			}));
		}
		attachIntListener(t$1, e$1) {
			Vi(this, t$1, e$1), Fi(this, t$1, ((t$2) => {
				this.h._attachIntListener(t$2);
			}));
		}
		attachIntVectorListener(t$1, e$1) {
			ji(this, t$1, e$1), Fi(this, t$1, ((t$2) => {
				this.h._attachIntVectorListener(t$2);
			}));
		}
		attachUintListener(t$1, e$1) {
			Vi(this, t$1, e$1), Fi(this, t$1, ((t$2) => {
				this.h._attachUintListener(t$2);
			}));
		}
		attachUintVectorListener(t$1, e$1) {
			ji(this, t$1, e$1), Fi(this, t$1, ((t$2) => {
				this.h._attachUintVectorListener(t$2);
			}));
		}
		attachDoubleListener(t$1, e$1) {
			Vi(this, t$1, e$1), Fi(this, t$1, ((t$2) => {
				this.h._attachDoubleListener(t$2);
			}));
		}
		attachDoubleVectorListener(t$1, e$1) {
			ji(this, t$1, e$1), Fi(this, t$1, ((t$2) => {
				this.h._attachDoubleVectorListener(t$2);
			}));
		}
		attachFloatListener(t$1, e$1) {
			Vi(this, t$1, e$1), Fi(this, t$1, ((t$2) => {
				this.h._attachFloatListener(t$2);
			}));
		}
		attachFloatVectorListener(t$1, e$1) {
			ji(this, t$1, e$1), Fi(this, t$1, ((t$2) => {
				this.h._attachFloatVectorListener(t$2);
			}));
		}
		attachStringListener(t$1, e$1) {
			Vi(this, t$1, e$1), Fi(this, t$1, ((t$2) => {
				this.h._attachStringListener(t$2);
			}));
		}
		attachStringVectorListener(t$1, e$1) {
			ji(this, t$1, e$1), Fi(this, t$1, ((t$2) => {
				this.h._attachStringVectorListener(t$2);
			}));
		}
		attachProtoListener(t$1, e$1, n$1) {
			Vi(this, t$1, e$1), Fi(this, t$1, ((t$2) => {
				this.h._attachProtoListener(t$2, n$1 || !1);
			}));
		}
		attachProtoVectorListener(t$1, e$1, n$1) {
			ji(this, t$1, e$1), Fi(this, t$1, ((t$2) => {
				this.h._attachProtoVectorListener(t$2, n$1 || !1);
			}));
		}
		attachAudioListener(t$1, e$1, n$1) {
			this.h._attachAudioListener || console.warn("Attempting to use attachAudioListener without support for output audio. Is build dep \":gl_graph_runner_audio_out\" missing?"), Vi(this, t$1, ((t$2, n$2) => {
				t$2 = new Float32Array(t$2.buffer, t$2.byteOffset, t$2.length / 4), e$1(t$2, n$2);
			})), Fi(this, t$1, ((t$2) => {
				this.h._attachAudioListener(t$2, n$1 || !1);
			}));
		}
		finishProcessing() {
			this.h._waitUntilIdle();
		}
		closeGraph() {
			this.h._closeGraph(), this.h.simpleListeners = void 0, this.h.emptyPacketListeners = void 0;
		}
	});
	Mi = class extends Ci {};
	Hi = class {
		constructor(t$1) {
			this.g = t$1, this.m = [], this.j = 0, this.g.setAutoRenderToScreen(!1);
		}
		setGraph(t$1, e$1) {
			this.g.attachErrorListener(((t$2, e$2) => {
				this.m.push(Error(e$2));
			})), this.g.M(), this.g.setGraph(t$1, e$1), Ri(this);
		}
		finishProcessing() {
			this.g.finishProcessing(), Ri(this);
		}
		close() {
			this.g.closeGraph();
		}
	};
	Hi.prototype.close = Hi.prototype.close;
	qi = class extends Hi {
		constructor(t$1, e$1) {
			super(new Mi(t$1, e$1)), this.s = { languages: [] }, Ne(t$1 = this.i = new vi(), 0, 1, e$1 = new yi());
		}
		o(t$1) {
			return Ne(this.i, 0, 2, Ai(t$1, Oe(this.i, hi, 2))), zi(this, t$1);
		}
		get baseOptions() {
			return Oe(this.i, yi, 1);
		}
		set baseOptions(t$1) {
			Ne(this.i, 0, 1, t$1);
		}
		J(t$1) {
			return this.s = { languages: [] }, this.g.addStringToStream(t$1, "text_in", this.j + 1), this.finishProcessing(), this.s;
		}
		u() {
			var t$1 = new ei();
			Zr(t$1), Me(t$1, 15, "classifications_out");
			const e$1 = new Wr();
			cn(e$1, wi, this.i);
			const n$1 = new Xr();
			Ee(n$1, Yt("mediapipe.tasks.text.text_classifier.TextClassifierGraph")), Kr(n$1), Me(n$1, 4, "CLASSIFICATIONS:classifications_out"), n$1.o(e$1), Ge(t$1, n$1), this.g.attachProtoListener("classifications_out", ((t$2, e$2) => {
				if ({classifications: t$2} = Ei(oi(t$2)), 1 !== t$2.length) throw Error(`Expected 1 classification head, got ${t$2.length}`);
				this.s.languages = t$2[0].categories.map(((t$3) => ({
					languageCode: t$3.categoryName,
					probability: t$3.score
				}))), Wi(this, e$2);
			})), this.g.attachEmptyPacketListener("classifications_out", ((t$2) => {
				Wi(this, t$2);
			})), t$1 = t$1.g(), this.setGraph(new Uint8Array(t$1), !0);
		}
	};
	qi.prototype.detect = qi.prototype.J, qi.prototype.setOptions = qi.prototype.o, qi.createFromModelPath = function(t$1, e$1) {
		return Di(qi, t$1, { baseOptions: { modelAssetPath: e$1 } });
	}, qi.createFromModelBuffer = function(t$1, e$1) {
		return Di(qi, t$1, { baseOptions: { modelAssetBuffer: e$1 } });
	}, qi.createFromOptions = function(t$1, e$1) {
		return Di(qi, t$1, e$1);
	};
	Ki = class extends Hi {
		constructor(t$1, e$1) {
			super(new Mi(t$1, e$1)), this.s = { classifications: [] }, Ne(t$1 = this.i = new vi(), 0, 1, e$1 = new yi());
		}
		o(t$1) {
			return Ne(this.i, 0, 2, Ai(t$1, Oe(this.i, hi, 2))), zi(this, t$1);
		}
		get baseOptions() {
			return Oe(this.i, yi, 1);
		}
		set baseOptions(t$1) {
			Ne(this.i, 0, 1, t$1);
		}
		I(t$1) {
			return this.s = { classifications: [] }, this.g.addStringToStream(t$1, "text_in", this.j + 1), this.finishProcessing(), this.s;
		}
		u() {
			var t$1 = new ei();
			Zr(t$1), Me(t$1, 15, "classifications_out");
			const e$1 = new Wr();
			cn(e$1, wi, this.i);
			const n$1 = new Xr();
			Ee(n$1, Yt("mediapipe.tasks.text.text_classifier.TextClassifierGraph")), Kr(n$1), Me(n$1, 4, "CLASSIFICATIONS:classifications_out"), n$1.o(e$1), Ge(t$1, n$1), this.g.attachProtoListener("classifications_out", ((t$2, e$2) => {
				this.s = Ei(oi(t$2)), Wi(this, e$2);
			})), this.g.attachEmptyPacketListener("classifications_out", ((t$2) => {
				Wi(this, t$2);
			})), t$1 = t$1.g(), this.setGraph(new Uint8Array(t$1), !0);
		}
	};
	Ki.prototype.classify = Ki.prototype.I, Ki.prototype.setOptions = Ki.prototype.o, Ki.createFromModelPath = function(t$1, e$1) {
		return Di(Ki, t$1, { baseOptions: { modelAssetPath: e$1 } });
	}, Ki.createFromModelBuffer = function(t$1, e$1) {
		return Di(Ki, t$1, { baseOptions: { modelAssetBuffer: e$1 } });
	}, Ki.createFromOptions = function(t$1, e$1) {
		return Di(Ki, t$1, e$1);
	};
	Xi = class extends Hi {
		constructor(t$1, e$1) {
			super(new Mi(t$1, e$1)), this.s = { embeddings: [] }, Ne(t$1 = this.i = new _i(), 0, 1, e$1 = new yi());
		}
		o(t$1) {
			var e$1 = this.i, n$1 = Oe(this.i, fi, 2);
			return n$1 = n$1 ? he(n$1) : new fi(), void 0 !== t$1.l2Normalize ? me(n$1, 1, Dt(t$1.l2Normalize)) : "l2Normalize" in t$1 && me(n$1, 1), void 0 !== t$1.quantize ? me(n$1, 2, Dt(t$1.quantize)) : "quantize" in t$1 && me(n$1, 2), Ne(e$1, 0, 2, n$1), zi(this, t$1);
		}
		get baseOptions() {
			return Oe(this.i, yi, 1);
		}
		set baseOptions(t$1) {
			Ne(this.i, 0, 1, t$1);
		}
		K(t$1) {
			return this.g.addStringToStream(t$1, "text_in", this.j + 1), this.finishProcessing(), this.s;
		}
		u() {
			var t$1 = new ei();
			Zr(t$1), Me(t$1, 15, "embeddings_out");
			const e$1 = new Wr();
			cn(e$1, Si, this.i);
			const n$1 = new Xr();
			Ee(n$1, Yt("mediapipe.tasks.text.text_embedder.TextEmbedderGraph")), Kr(n$1), Me(n$1, 4, "EMBEDDINGS:embeddings_out"), n$1.o(e$1), Ge(t$1, n$1), this.g.attachProtoListener("embeddings_out", ((t$2, e$2) => {
				t$2 = li(t$2), this.s = function(t$3) {
					return {
						embeddings: Fe(t$3, ui).map(((t$4) => {
							const e$3 = {
								headIndex: Rt(ge(t$4, 3)) ?? 0 ?? -1,
								headName: Qt(ge(t$4, 4)) ?? "" ?? ""
							};
							if (void 0 !== Le(t$4, si, Te(t$4, 1))) e$3.floatEmbedding = ve(Oe(t$4, si, Te(t$4, 1)), 1, Gt, void 0 === gt ? 2 : 4).slice();
							else {
								const n$2 = new Uint8Array(0);
								e$3.quantizedEmbedding = Oe(t$4, ai, Te(t$4, 2))?.H()?.i() ?? n$2;
							}
							return e$3;
						})),
						timestampMs: Kt(ge(t$3, 2)) ?? 0
					};
				}(t$2), Wi(this, e$2);
			})), this.g.attachEmptyPacketListener("embeddings_out", ((t$2) => {
				Wi(this, t$2);
			})), t$1 = t$1.g(), this.setGraph(new Uint8Array(t$1), !0);
		}
	};
	Xi.cosineSimilarity = function(t$1, e$1) {
		if (t$1.floatEmbedding && e$1.floatEmbedding) t$1 = Ti(t$1.floatEmbedding, e$1.floatEmbedding);
		else {
			if (!t$1.quantizedEmbedding || !e$1.quantizedEmbedding) throw Error("Cannot compute cosine similarity between quantized and float embeddings.");
			t$1 = Ti(Ii(t$1.quantizedEmbedding), Ii(e$1.quantizedEmbedding));
		}
		return t$1;
	}, Xi.prototype.embed = Xi.prototype.K, Xi.prototype.setOptions = Xi.prototype.o, Xi.createFromModelPath = function(t$1, e$1) {
		return Di(Xi, t$1, { baseOptions: { modelAssetPath: e$1 } });
	}, Xi.createFromModelBuffer = function(t$1, e$1) {
		return Di(Xi, t$1, { baseOptions: { modelAssetBuffer: e$1 } });
	}, Xi.createFromOptions = function(t$1, e$1) {
		return Di(Xi, t$1, e$1);
	};
}));
var require_dist = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var index_exports = {};
	__export(index_exports, {
		BuiltInAIChatLanguageModel: () => BuiltInAIChatLanguageModel,
		BuiltInAIEmbeddingModel: () => BuiltInAIEmbeddingModel,
		builtInAI: () => builtInAI,
		createBuiltInAI: () => createBuiltInAI,
		doesBrowserSupportBuiltInAI: () => doesBrowserSupportBuiltInAI
	});
	module.exports = __toCommonJS(index_exports);
	var import_provider = (init_dist(), __toCommonJS$1(dist_exports));
	function buildResultPayload(result) {
		const payload = {
			name: result.toolName,
			result: result.result ?? null,
			error: Boolean(result.isError)
		};
		if (result.toolCallId) payload.id = result.toolCallId;
		return payload;
	}
	function formatToolResults(results) {
		if (!results || results.length === 0) return "";
		return `\`\`\`tool_result
${results.map((result) => JSON.stringify(buildResultPayload(result))).join("\n")}
\`\`\``;
	}
	function convertBase64ToUint8Array(base64) {
		try {
			const binaryString = atob(base64);
			const bytes = new Uint8Array(binaryString.length);
			for (let i$1 = 0; i$1 < binaryString.length; i$1++) bytes[i$1] = binaryString.charCodeAt(i$1);
			return bytes;
		} catch (error) {
			throw new Error(`Failed to convert base64 to Uint8Array: ${error}`);
		}
	}
	function convertFileData(data, mediaType) {
		if (data instanceof URL) return data.toString();
		if (data instanceof Uint8Array) return data;
		if (typeof data === "string") return convertBase64ToUint8Array(data);
		const exhaustiveCheck = data;
		throw new Error(`Unexpected data type for ${mediaType}: ${exhaustiveCheck}`);
	}
	function normalizeToolArguments(input) {
		if (input === void 0) return {};
		if (typeof input === "string") try {
			return JSON.parse(input);
		} catch {
			return input;
		}
		return input ?? {};
	}
	function formatToolCallsJson(parts) {
		if (!parts.length) return "";
		return `\`\`\`tool_call
${parts.map((call) => {
			const payload = {
				name: call.toolName,
				arguments: normalizeToolArguments(call.input)
			};
			if (call.toolCallId) payload.id = call.toolCallId;
			return JSON.stringify(payload);
		}).join("\n")}
\`\`\``;
	}
	function convertToolResultOutput(output) {
		switch (output.type) {
			case "text": return {
				value: output.value,
				isError: false
			};
			case "json": return {
				value: output.value,
				isError: false
			};
			case "error-text": return {
				value: output.value,
				isError: true
			};
			case "error-json": return {
				value: output.value,
				isError: true
			};
			case "content": return {
				value: output.value,
				isError: false
			};
			case "execution-denied": return {
				value: output.reason,
				isError: true
			};
			default: return {
				value: output,
				isError: false
			};
		}
	}
	function toToolResult(part) {
		const { value, isError } = convertToolResultOutput(part.output);
		return {
			toolCallId: part.toolCallId,
			toolName: part.toolName,
			result: value,
			isError
		};
	}
	function convertToBuiltInAIMessages(prompt) {
		const normalizedPrompt = prompt.slice();
		let systemMessage;
		const messages = [];
		for (const message of normalizedPrompt) switch (message.role) {
			case "system":
				systemMessage = message.content;
				break;
			case "user":
				messages.push({
					role: "user",
					content: message.content.map((part) => {
						switch (part.type) {
							case "text": return {
								type: "text",
								value: part.text
							};
							case "file": {
								const { mediaType, data } = part;
								if (mediaType?.startsWith("image/")) return {
									type: "image",
									value: convertFileData(data, mediaType)
								};
								else if (mediaType?.startsWith("audio/")) return {
									type: "audio",
									value: convertFileData(data, mediaType)
								};
								else throw new import_provider.UnsupportedFunctionalityError({ functionality: `file type: ${mediaType}` });
							}
							default: {
								const exhaustiveCheck = part;
								throw new import_provider.UnsupportedFunctionalityError({ functionality: `content type: ${exhaustiveCheck.type ?? "unknown"}` });
							}
						}
					})
				});
				break;
			case "assistant": {
				let text = "";
				const toolCallParts = [];
				for (const part of message.content) switch (part.type) {
					case "text":
						text += part.text;
						break;
					case "reasoning":
						text += part.text;
						break;
					case "tool-call":
						toolCallParts.push(part);
						break;
					case "file": throw new import_provider.UnsupportedFunctionalityError({ functionality: "assistant file attachments" });
					case "tool-result": throw new import_provider.UnsupportedFunctionalityError({ functionality: "tool-result parts in assistant messages (should be in tool messages)" });
					default: {
						const exhaustiveCheck = part;
						throw new import_provider.UnsupportedFunctionalityError({ functionality: `assistant part type: ${exhaustiveCheck.type ?? "unknown"}` });
					}
				}
				const toolCallJson = formatToolCallsJson(toolCallParts);
				const contentSegments = [];
				if (text.trim().length > 0) contentSegments.push(text);
				else if (text.length > 0) contentSegments.push(text);
				if (toolCallJson) contentSegments.push(toolCallJson);
				const content = contentSegments.length > 0 ? contentSegments.join("\n") : "";
				messages.push({
					role: "assistant",
					content
				});
				break;
			}
			case "tool": {
				const toolResultsJson = formatToolResults(message.content.map(toToolResult));
				messages.push({
					role: "user",
					content: toolResultsJson
				});
				break;
			}
			default: {
				const exhaustiveCheck = message;
				throw new Error(`Unsupported role: ${exhaustiveCheck.role ?? "unknown"}`);
			}
		}
		return {
			systemMessage,
			messages
		};
	}
	function buildJsonToolSystemPrompt(originalSystemPrompt, tools, options) {
		if (!tools || tools.length === 0) return originalSystemPrompt || "";
		const parallelInstruction = "Only request one tool call at a time. Wait for tool results before asking for another tool.";
		const toolSchemas = tools.map((tool) => {
			const schema = getParameters(tool);
			return {
				name: tool.name,
				description: tool.description ?? "No description provided.",
				parameters: schema || {
					type: "object",
					properties: {}
				}
			};
		});
		const instructionBody = `You are a helpful AI assistant with access to tools.

# Available Tools
${JSON.stringify(toolSchemas, null, 2)}

# Tool Calling Instructions
${parallelInstruction}

To call a tool, output JSON in this exact format inside a \`\`\`tool_call code fence:

\`\`\`tool_call
{"name": "tool_name", "arguments": {"param1": "value1", "param2": "value2"}}
\`\`\`

Tool responses will be provided in \`\`\`tool_result fences. Each line contains JSON like:
\`\`\`tool_result
{"id": "call_123", "name": "tool_name", "result": {...}, "error": false}
\`\`\`
Use the \`result\` payload (and treat \`error\` as a boolean flag) when continuing the conversation.

Important:
- Use exact tool and parameter names from the schema above
- Arguments must be a valid JSON object matching the tool's parameters
- You can include brief reasoning before or after the tool call
- If no tool is needed, respond directly without tool_call fences`;
		if (originalSystemPrompt?.trim()) return `${originalSystemPrompt.trim()}

${instructionBody}`;
		return instructionBody;
	}
	function getParameters(tool) {
		if ("parameters" in tool) return tool.parameters;
		return tool.inputSchema;
	}
	var JSON_TOOL_CALL_FENCE_REGEX = /```tool[_-]?call\s*([\s\S]*?)```/gi;
	function generateToolCallId() {
		return `call_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
	}
	function parseJsonFunctionCalls(response) {
		const matches = Array.from(response.matchAll(JSON_TOOL_CALL_FENCE_REGEX));
		JSON_TOOL_CALL_FENCE_REGEX.lastIndex = 0;
		if (matches.length === 0) return {
			toolCalls: [],
			textContent: response
		};
		const toolCalls = [];
		let textContent = response;
		for (const match of matches) {
			const [fullFence, innerContent] = match;
			textContent = textContent.replace(fullFence, "");
			try {
				const trimmed = innerContent.trim();
				try {
					const parsed = JSON.parse(trimmed);
					const callsArray = Array.isArray(parsed) ? parsed : [parsed];
					for (const call of callsArray) {
						if (!call.name) continue;
						toolCalls.push({
							type: "tool-call",
							toolCallId: call.id || generateToolCallId(),
							toolName: call.name,
							args: call.arguments || {}
						});
					}
				} catch {
					const lines = trimmed.split("\n").filter((line) => line.trim());
					for (const line of lines) try {
						const call = JSON.parse(line.trim());
						if (!call.name) continue;
						toolCalls.push({
							type: "tool-call",
							toolCallId: call.id || generateToolCallId(),
							toolName: call.name,
							args: call.arguments || {}
						});
					} catch {
						continue;
					}
				}
			} catch (error) {
				console.warn("Failed to parse JSON tool call:", error);
				continue;
			}
		}
		textContent = textContent.replace(/\n{2,}/g, "\n");
		return {
			toolCalls,
			textContent: textContent.trim()
		};
	}
	function createUnsupportedSettingWarning(feature, details) {
		return {
			type: "unsupported",
			feature,
			details
		};
	}
	function createUnsupportedToolWarning(tool, details) {
		return {
			type: "unsupported",
			feature: `tool:${tool.name}`,
			details
		};
	}
	function gatherUnsupportedSettingWarnings(options) {
		const warnings = [];
		if (options.maxOutputTokens != null) warnings.push(createUnsupportedSettingWarning("maxOutputTokens", "maxOutputTokens is not supported by Prompt API"));
		if (options.stopSequences != null) warnings.push(createUnsupportedSettingWarning("stopSequences", "stopSequences is not supported by Prompt API"));
		if (options.topP != null) warnings.push(createUnsupportedSettingWarning("topP", "topP is not supported by Prompt API"));
		if (options.presencePenalty != null) warnings.push(createUnsupportedSettingWarning("presencePenalty", "presencePenalty is not supported by Prompt API"));
		if (options.frequencyPenalty != null) warnings.push(createUnsupportedSettingWarning("frequencyPenalty", "frequencyPenalty is not supported by Prompt API"));
		if (options.seed != null) warnings.push(createUnsupportedSettingWarning("seed", "seed is not supported by Prompt API"));
		if (options.toolChoice != null) warnings.push(createUnsupportedSettingWarning("toolChoice", "toolChoice is not supported by Prompt API"));
		return warnings;
	}
	function hasMultimodalContent(prompt) {
		for (const message of prompt) if (message.role === "user") {
			for (const part of message.content) if (part.type === "file") return true;
		}
		return false;
	}
	function getExpectedInputs(prompt) {
		const inputs = /* @__PURE__ */ new Set();
		for (const message of prompt) if (message.role === "user") {
			for (const part of message.content) if (part.type === "file") {
				if (part.mediaType?.startsWith("image/")) inputs.add("image");
				else if (part.mediaType?.startsWith("audio/")) inputs.add("audio");
			}
		}
		return Array.from(inputs).map((type) => ({ type }));
	}
	function prependSystemPromptToMessages(messages, systemPrompt) {
		if (!systemPrompt.trim()) return messages;
		const prompts = messages.map((message) => ({ ...message }));
		const firstUserIndex = prompts.findIndex((message) => message.role === "user");
		if (firstUserIndex !== -1) {
			const firstUserMessage = prompts[firstUserIndex];
			if (Array.isArray(firstUserMessage.content)) {
				const content = firstUserMessage.content.slice();
				content.unshift({
					type: "text",
					value: `${systemPrompt}

`
				});
				prompts[firstUserIndex] = {
					...firstUserMessage,
					content
				};
			} else if (typeof firstUserMessage.content === "string") prompts[firstUserIndex] = {
				...firstUserMessage,
				content: `${systemPrompt}

${firstUserMessage.content}`
			};
		} else prompts.unshift({
			role: "user",
			content: systemPrompt
		});
		return prompts;
	}
	function isFunctionTool(tool) {
		return tool.type === "function";
	}
	var import_provider2 = (init_dist(), __toCommonJS$1(dist_exports));
	var SessionManager = class {
		constructor(baseOptions) {
			this.session = null;
			this.baseOptions = baseOptions;
		}
		async getSession(options) {
			if (typeof LanguageModel === "undefined") throw new import_provider2.LoadSettingError({ message: "Prompt API is not available. This library requires Chrome or Edge browser with built-in AI capabilities." });
			if (this.session) return this.session;
			if (await LanguageModel.availability() === "unavailable") throw new import_provider2.LoadSettingError({ message: "Built-in model not available in this browser" });
			const sessionOptions = this.prepareSessionOptions(options);
			this.session = await LanguageModel.create(sessionOptions);
			const onQuotaOverflow = options?.onQuotaOverflow || this.baseOptions.onQuotaOverflow;
			if (onQuotaOverflow) this.session.addEventListener("quotaoverflow", onQuotaOverflow);
			else this.session.addEventListener("quotaoverflow", () => {
				console.warn("Model quota exceeded. Consider handling 'quotaoverflow' event.");
			});
			return this.session;
		}
		async createSessionWithProgress(onDownloadProgress) {
			return this.getSession({ onDownloadProgress });
		}
		async checkAvailability() {
			if (typeof LanguageModel === "undefined") return "unavailable";
			return LanguageModel.availability();
		}
		getCurrentSession() {
			return this.session;
		}
		destroySession() {
			if (this.session && typeof this.session.destroy === "function") this.session.destroy();
			this.session = null;
		}
		prepareSessionOptions(options) {
			const mergedOptions = { ...this.baseOptions };
			if (options) {
				const { systemMessage, expectedInputs, onDownloadProgress, onQuotaOverflow, ...createOptions } = options;
				Object.assign(mergedOptions, createOptions);
				if (systemMessage) mergedOptions.initialPrompts = [{
					role: "system",
					content: systemMessage
				}];
				if (expectedInputs && expectedInputs.length > 0) mergedOptions.expectedInputs = expectedInputs;
				if (onDownloadProgress) mergedOptions.monitor = (m$1) => {
					m$1.addEventListener("downloadprogress", (e$1) => {
						onDownloadProgress(e$1.loaded);
					});
				};
			}
			this.sanitizeOptions(mergedOptions);
			return mergedOptions;
		}
		sanitizeOptions(options) {}
	};
	var ToolCallFenceDetector = class {
		constructor() {
			this.FENCE_STARTS = ["```tool_call"];
			this.FENCE_END = "```";
			this.buffer = "";
			this.inFence = false;
			this.fenceStartBuffer = "";
		}
		addChunk(chunk) {
			this.buffer += chunk;
		}
		getBuffer() {
			return this.buffer;
		}
		clearBuffer() {
			this.buffer = "";
		}
		detectFence() {
			const { index: startIdx, prefix: matchedPrefix } = this.findFenceStart(this.buffer);
			if (startIdx === -1) {
				const overlap = this.computeOverlapLength(this.buffer, this.FENCE_STARTS);
				const safeTextLength = this.buffer.length - overlap;
				const prefixText2 = safeTextLength > 0 ? this.buffer.slice(0, safeTextLength) : "";
				this.buffer = overlap > 0 ? this.buffer.slice(-overlap) : "";
				return {
					fence: null,
					prefixText: prefixText2,
					remainingText: "",
					overlapLength: overlap
				};
			}
			const prefixText = this.buffer.slice(0, startIdx);
			this.buffer = this.buffer.slice(startIdx);
			const prefixLength = matchedPrefix?.length ?? 0;
			const closingIdx = this.buffer.indexOf(this.FENCE_END, prefixLength);
			if (closingIdx === -1) return {
				fence: null,
				prefixText,
				remainingText: "",
				overlapLength: 0
			};
			const endPos = closingIdx + this.FENCE_END.length;
			const fence = this.buffer.slice(0, endPos);
			const remainingText = this.buffer.slice(endPos);
			this.buffer = "";
			return {
				fence,
				prefixText,
				remainingText,
				overlapLength: 0
			};
		}
		findFenceStart(text) {
			let bestIndex = -1;
			let matchedPrefix = null;
			for (const prefix of this.FENCE_STARTS) {
				const idx = text.indexOf(prefix);
				if (idx !== -1 && (bestIndex === -1 || idx < bestIndex)) {
					bestIndex = idx;
					matchedPrefix = prefix;
				}
			}
			return {
				index: bestIndex,
				prefix: matchedPrefix
			};
		}
		computeOverlapLength(text, prefixes) {
			let overlap = 0;
			for (const prefix of prefixes) {
				const maxLength = Math.min(text.length, prefix.length - 1);
				for (let size = maxLength; size > 0; size -= 1) if (prefix.startsWith(text.slice(-size))) {
					overlap = Math.max(overlap, size);
					break;
				}
			}
			return overlap;
		}
		hasContent() {
			return this.buffer.length > 0;
		}
		getBufferSize() {
			return this.buffer.length;
		}
		detectStreamingFence() {
			if (!this.inFence) {
				const { index: startIdx, prefix: matchedPrefix } = this.findFenceStart(this.buffer);
				if (startIdx === -1) {
					const overlap = this.computeOverlapLength(this.buffer, this.FENCE_STARTS);
					const safeTextLength = this.buffer.length - overlap;
					const safeContent = safeTextLength > 0 ? this.buffer.slice(0, safeTextLength) : "";
					this.buffer = this.buffer.slice(safeTextLength);
					return {
						inFence: false,
						safeContent,
						completeFence: null,
						textAfterFence: ""
					};
				}
				const prefixText = this.buffer.slice(0, startIdx);
				const fenceStartLength = matchedPrefix?.length ?? 0;
				this.buffer = this.buffer.slice(startIdx + fenceStartLength);
				if (this.buffer.startsWith("\n")) this.buffer = this.buffer.slice(1);
				this.inFence = true;
				this.fenceStartBuffer = "";
				return {
					inFence: true,
					safeContent: prefixText,
					completeFence: null,
					textAfterFence: ""
				};
			}
			const closingIdx = this.buffer.indexOf(this.FENCE_END);
			if (closingIdx === -1) {
				const overlap = this.computeOverlapLength(this.buffer, [this.FENCE_END]);
				const safeContentLength = this.buffer.length - overlap;
				if (safeContentLength > 0) {
					const safeContent = this.buffer.slice(0, safeContentLength);
					this.fenceStartBuffer += safeContent;
					this.buffer = this.buffer.slice(safeContentLength);
					return {
						inFence: true,
						safeContent,
						completeFence: null,
						textAfterFence: ""
					};
				}
				return {
					inFence: true,
					safeContent: "",
					completeFence: null,
					textAfterFence: ""
				};
			}
			const fenceContent = this.buffer.slice(0, closingIdx);
			this.fenceStartBuffer += fenceContent;
			const completeFence = `${this.FENCE_STARTS[0]}
${this.fenceStartBuffer}
${this.FENCE_END}`;
			const textAfterFence = this.buffer.slice(closingIdx + this.FENCE_END.length);
			this.inFence = false;
			this.fenceStartBuffer = "";
			this.buffer = textAfterFence;
			return {
				inFence: false,
				safeContent: fenceContent,
				completeFence,
				textAfterFence
			};
		}
		isInFence() {
			return this.inFence;
		}
		resetStreamingState() {
			this.inFence = false;
			this.fenceStartBuffer = "";
		}
	};
	function doesBrowserSupportBuiltInAI() {
		return typeof LanguageModel !== "undefined";
	}
	function extractToolName(content) {
		const jsonMatch = content.match(/\{\s*"name"\s*:\s*"([^"]+)"/);
		if (jsonMatch) return jsonMatch[1];
		return null;
	}
	function extractArgumentsContent(content) {
		const match = content.match(/"arguments"\s*:\s*/);
		if (!match || match.index === void 0) return "";
		const startIndex = match.index + match[0].length;
		let result = "";
		let depth = 0;
		let inString = false;
		let escaped = false;
		let started = false;
		for (let i$1 = startIndex; i$1 < content.length; i$1++) {
			const char = content[i$1];
			result += char;
			if (!started) {
				if (!/\s/.test(char)) {
					started = true;
					if (char === "{" || char === "[") depth = 1;
				}
				continue;
			}
			if (escaped) {
				escaped = false;
				continue;
			}
			if (char === "\\") {
				escaped = true;
				continue;
			}
			if (char === "\"") {
				inString = !inString;
				continue;
			}
			if (!inString) {
				if (char === "{" || char === "[") depth += 1;
				else if (char === "}" || char === "]") {
					if (depth > 0) {
						depth -= 1;
						if (depth === 0) break;
					}
				}
			}
		}
		return result;
	}
	var BuiltInAIChatLanguageModel = class {
		constructor(modelId, options = {}) {
			this.specificationVersion = "v3";
			this.provider = "browser-ai";
			this.supportedUrls = {
				"image/*": [/^https?:\/\/.+$/],
				"audio/*": [/^https?:\/\/.+$/]
			};
			this.modelId = modelId;
			this.config = {
				provider: this.provider,
				modelId,
				options
			};
			this.sessionManager = new SessionManager(options);
		}
		async getSession(options, expectedInputs, systemMessage, onDownloadProgress) {
			return this.sessionManager.getSession({
				...options,
				expectedInputs,
				systemMessage,
				onDownloadProgress
			});
		}
		getArgs(callOptions) {
			const { prompt, maxOutputTokens, temperature, topP, topK, frequencyPenalty, presencePenalty, stopSequences, responseFormat, seed, tools, toolChoice, providerOptions } = callOptions;
			const warnings = [];
			warnings.push(...gatherUnsupportedSettingWarnings({
				maxOutputTokens,
				stopSequences,
				topP,
				presencePenalty,
				frequencyPenalty,
				seed,
				toolChoice
			}));
			const functionTools = (tools ?? []).filter(isFunctionTool);
			const unsupportedTools = (tools ?? []).filter((tool) => !isFunctionTool(tool));
			for (const tool of unsupportedTools) warnings.push(createUnsupportedToolWarning(tool, "Only function tools are supported by the Prompt API polyfill"));
			const hasMultiModalInput = hasMultimodalContent(prompt);
			const { systemMessage, messages } = convertToBuiltInAIMessages(prompt);
			const promptOptions = {};
			if (responseFormat?.type === "json") promptOptions.responseConstraint = responseFormat.schema;
			if (temperature !== void 0) promptOptions.temperature = temperature;
			if (topK !== void 0) promptOptions.topK = topK;
			return {
				systemMessage,
				messages,
				warnings,
				promptOptions,
				hasMultiModalInput,
				expectedInputs: hasMultiModalInput ? getExpectedInputs(prompt) : void 0,
				functionTools
			};
		}
		async doGenerate(options) {
			const { systemMessage, messages, warnings, promptOptions, expectedInputs, functionTools } = this.getArgs(options);
			const session = await this.getSession(void 0, expectedInputs, void 0);
			const promptMessages = prependSystemPromptToMessages(messages, await buildJsonToolSystemPrompt(systemMessage, functionTools, { allowParallelToolCalls: false }));
			const rawResponse = await session.prompt(promptMessages, promptOptions);
			const { toolCalls, textContent } = parseJsonFunctionCalls(rawResponse);
			if (toolCalls.length > 0) {
				const toolCallsToEmit = toolCalls.slice(0, 1);
				const parts = [];
				if (textContent) parts.push({
					type: "text",
					text: textContent
				});
				for (const call of toolCallsToEmit) parts.push({
					type: "tool-call",
					toolCallId: call.toolCallId,
					toolName: call.toolName,
					input: JSON.stringify(call.args ?? {})
				});
				return {
					content: parts,
					finishReason: {
						unified: "tool-calls",
						raw: "tool-calls"
					},
					usage: {
						inputTokens: {
							total: void 0,
							noCache: void 0,
							cacheRead: void 0,
							cacheWrite: void 0
						},
						outputTokens: {
							total: void 0,
							text: void 0,
							reasoning: void 0
						}
					},
					request: { body: {
						messages: promptMessages,
						options: promptOptions
					} },
					warnings
				};
			}
			return {
				content: [{
					type: "text",
					text: textContent || rawResponse
				}],
				finishReason: {
					unified: "stop",
					raw: "stop"
				},
				usage: {
					inputTokens: {
						total: void 0,
						noCache: void 0,
						cacheRead: void 0,
						cacheWrite: void 0
					},
					outputTokens: {
						total: void 0,
						text: void 0,
						reasoning: void 0
					}
				},
				request: { body: {
					messages: promptMessages,
					options: promptOptions
				} },
				warnings
			};
		}
		async availability() {
			return this.sessionManager.checkAvailability();
		}
		async createSessionWithProgress(onDownloadProgress) {
			return this.sessionManager.createSessionWithProgress(onDownloadProgress);
		}
		async doStream(options) {
			const { systemMessage, messages, warnings, promptOptions, expectedInputs, functionTools } = this.getArgs(options);
			const session = await this.getSession(void 0, expectedInputs, void 0);
			const promptMessages = prependSystemPromptToMessages(messages, await buildJsonToolSystemPrompt(systemMessage, functionTools, { allowParallelToolCalls: false }));
			const streamOptions = {
				...promptOptions,
				signal: options.abortSignal
			};
			const conversationHistory = [...promptMessages];
			const textId = "text-0";
			return {
				stream: new ReadableStream({ start: async (controller) => {
					controller.enqueue({
						type: "stream-start",
						warnings
					});
					let textStarted = false;
					let finished = false;
					let aborted = false;
					let currentReader = null;
					const ensureTextStart = () => {
						if (!textStarted) {
							controller.enqueue({
								type: "text-start",
								id: textId
							});
							textStarted = true;
						}
					};
					const emitTextDelta = (delta) => {
						if (!delta) return;
						ensureTextStart();
						controller.enqueue({
							type: "text-delta",
							id: textId,
							delta
						});
					};
					const emitTextEndIfNeeded = () => {
						if (!textStarted) return;
						controller.enqueue({
							type: "text-end",
							id: textId
						});
						textStarted = false;
					};
					const finishStream = (finishReason) => {
						if (finished) return;
						finished = true;
						emitTextEndIfNeeded();
						controller.enqueue({
							type: "finish",
							finishReason,
							usage: {
								inputTokens: {
									total: session.inputUsage,
									noCache: void 0,
									cacheRead: void 0,
									cacheWrite: void 0
								},
								outputTokens: {
									total: void 0,
									text: void 0,
									reasoning: void 0
								}
							}
						});
						controller.close();
					};
					const abortHandler = () => {
						if (aborted) return;
						aborted = true;
						if (currentReader) currentReader.cancel().catch(() => void 0);
						finishStream({
							unified: "stop",
							raw: "aborted"
						});
					};
					if (options.abortSignal) options.abortSignal.addEventListener("abort", abortHandler);
					const maxIterations = 10;
					let iteration = 0;
					try {
						const fenceDetector = new ToolCallFenceDetector();
						while (iteration < maxIterations && !aborted && !finished) {
							iteration += 1;
							currentReader = session.promptStreaming(conversationHistory, streamOptions).getReader();
							let toolCalls = [];
							let toolBlockDetected = false;
							let trailingTextAfterBlock = "";
							let currentToolCallId = null;
							let toolInputStartEmitted = false;
							let accumulatedFenceContent = "";
							let streamedArgumentsLength = 0;
							let insideFence = false;
							while (!aborted) {
								const { done, value } = await currentReader.read();
								if (done) break;
								fenceDetector.addChunk(value);
								while (fenceDetector.hasContent()) {
									const wasInsideFence = insideFence;
									const result = fenceDetector.detectStreamingFence();
									insideFence = result.inFence;
									let madeProgress = false;
									if (!wasInsideFence && result.inFence) {
										if (result.safeContent) {
											emitTextDelta(result.safeContent);
											madeProgress = true;
										}
										currentToolCallId = `call_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
										toolInputStartEmitted = false;
										accumulatedFenceContent = "";
										streamedArgumentsLength = 0;
										insideFence = true;
										continue;
									}
									if (result.completeFence) {
										madeProgress = true;
										if (result.safeContent) accumulatedFenceContent += result.safeContent;
										if (toolInputStartEmitted && currentToolCallId) {
											const argsContent = extractArgumentsContent(accumulatedFenceContent);
											if (argsContent.length > streamedArgumentsLength) {
												const delta = argsContent.slice(streamedArgumentsLength);
												streamedArgumentsLength = argsContent.length;
												if (delta.length > 0) controller.enqueue({
													type: "tool-input-delta",
													id: currentToolCallId,
													delta
												});
											}
										}
										const selectedToolCalls = parseJsonFunctionCalls(result.completeFence).toolCalls.slice(0, 1);
										if (selectedToolCalls.length === 0) {
											toolCalls = [];
											toolBlockDetected = false;
											emitTextDelta(result.completeFence);
											if (result.textAfterFence) emitTextDelta(result.textAfterFence);
											currentToolCallId = null;
											toolInputStartEmitted = false;
											accumulatedFenceContent = "";
											streamedArgumentsLength = 0;
											insideFence = false;
											continue;
										}
										if (selectedToolCalls.length > 0 && currentToolCallId) selectedToolCalls[0].toolCallId = currentToolCallId;
										toolCalls = selectedToolCalls;
										toolBlockDetected = toolCalls.length > 0;
										for (const [index, call] of toolCalls.entries()) {
											const toolCallId = index === 0 && currentToolCallId ? currentToolCallId : call.toolCallId;
											const toolName = call.toolName;
											const argsJson = JSON.stringify(call.args ?? {});
											if (toolCallId === currentToolCallId) {
												if (!toolInputStartEmitted) {
													controller.enqueue({
														type: "tool-input-start",
														id: toolCallId,
														toolName
													});
													toolInputStartEmitted = true;
												}
												const argsContent = extractArgumentsContent(accumulatedFenceContent);
												if (argsContent.length > streamedArgumentsLength) {
													const delta = argsContent.slice(streamedArgumentsLength);
													streamedArgumentsLength = argsContent.length;
													if (delta.length > 0) controller.enqueue({
														type: "tool-input-delta",
														id: toolCallId,
														delta
													});
												}
											} else {
												controller.enqueue({
													type: "tool-input-start",
													id: toolCallId,
													toolName
												});
												if (argsJson.length > 0) controller.enqueue({
													type: "tool-input-delta",
													id: toolCallId,
													delta: argsJson
												});
											}
											controller.enqueue({
												type: "tool-input-end",
												id: toolCallId
											});
											controller.enqueue({
												type: "tool-call",
												toolCallId,
												toolName,
												input: argsJson,
												providerExecuted: false
											});
										}
										trailingTextAfterBlock += result.textAfterFence;
										madeProgress = true;
										if (toolBlockDetected && currentReader) {
											await currentReader.cancel().catch(() => void 0);
											break;
										}
										currentToolCallId = null;
										toolInputStartEmitted = false;
										accumulatedFenceContent = "";
										streamedArgumentsLength = 0;
										insideFence = false;
										continue;
									}
									if (insideFence) {
										if (result.safeContent) {
											accumulatedFenceContent += result.safeContent;
											madeProgress = true;
											const toolName = extractToolName(accumulatedFenceContent);
											if (toolName && !toolInputStartEmitted && currentToolCallId) {
												controller.enqueue({
													type: "tool-input-start",
													id: currentToolCallId,
													toolName
												});
												toolInputStartEmitted = true;
											}
											if (toolInputStartEmitted && currentToolCallId) {
												const argsContent = extractArgumentsContent(accumulatedFenceContent);
												if (argsContent.length > streamedArgumentsLength) {
													const delta = argsContent.slice(streamedArgumentsLength);
													streamedArgumentsLength = argsContent.length;
													if (delta.length > 0) controller.enqueue({
														type: "tool-input-delta",
														id: currentToolCallId,
														delta
													});
												}
											}
										}
										continue;
									}
									if (!insideFence && result.safeContent) {
										emitTextDelta(result.safeContent);
										madeProgress = true;
									}
									if (!madeProgress) break;
								}
								if (toolBlockDetected) break;
							}
							currentReader = null;
							if (aborted) return;
							if (!toolBlockDetected && fenceDetector.hasContent()) {
								emitTextDelta(fenceDetector.getBuffer());
								fenceDetector.clearBuffer();
							}
							if (!toolBlockDetected || toolCalls.length === 0) {
								finishStream({
									unified: "stop",
									raw: "stop"
								});
								return;
							}
							if (trailingTextAfterBlock) emitTextDelta(trailingTextAfterBlock);
							finishStream({
								unified: "tool-calls",
								raw: "tool-calls"
							});
							return;
						}
						if (!finished && !aborted) finishStream({
							unified: "other",
							raw: "other"
						});
					} catch (error) {
						controller.enqueue({
							type: "error",
							error
						});
						controller.close();
					} finally {
						if (options.abortSignal) options.abortSignal.removeEventListener("abort", abortHandler);
					}
				} }),
				request: { body: {
					messages: promptMessages,
					options: promptOptions
				} }
			};
		}
	};
	var import_tasks_text = (init_text_bundle(), __toCommonJS$1(text_bundle_exports));
	var BuiltInAIEmbeddingModel = class {
		constructor(settings = {}) {
			this.specificationVersion = "v3";
			this.provider = "google-mediapipe";
			this.modelId = "embedding";
			this.supportsParallelCalls = true;
			this.maxEmbeddingsPerCall = void 0;
			this.settings = {
				wasmLoaderPath: "https://pub-ddcfe353995744e89b8002f16bf98575.r2.dev/text_wasm_internal.js",
				wasmBinaryPath: "https://pub-ddcfe353995744e89b8002f16bf98575.r2.dev/text_wasm_internal.wasm",
				modelAssetPath: "https://pub-ddcfe353995744e89b8002f16bf98575.r2.dev/universal_sentence_encoder.tflite",
				l2Normalize: false,
				quantize: false
			};
			this.getTextEmbedder = async () => {
				return import_tasks_text.TextEmbedder.createFromOptions({
					wasmBinaryPath: this.settings.wasmBinaryPath,
					wasmLoaderPath: this.settings.wasmLoaderPath
				}, {
					baseOptions: {
						modelAssetBuffer: await this.modelAssetBuffer,
						delegate: this.settings.delegate
					},
					l2Normalize: this.settings.l2Normalize,
					quantize: this.settings.quantize
				});
			};
			this.doEmbed = async (options) => {
				if (options.abortSignal?.aborted) throw new Error("Operation was aborted");
				const embedder = await this.textEmbedder;
				return {
					embeddings: options.values.map((text) => {
						const [embedding] = embedder.embed(text).embeddings;
						return embedding?.floatEmbedding ?? [];
					}),
					providerMetadata: { mediapipe: {
						model: "universal_sentence_encoder",
						provider: "google-mediapipe",
						processed_texts: options.values.length
					} },
					warnings: []
				};
			};
			this.settings = {
				...this.settings,
				...settings
			};
			this.modelAssetBuffer = fetch(this.settings.modelAssetPath).then((response) => response.body.getReader());
			this.textEmbedder = this.getTextEmbedder();
		}
	};
	var import_provider3 = (init_dist(), __toCommonJS$1(dist_exports));
	function createBuiltInAI(options = {}) {
		const createChatModel = (modelId, settings) => {
			return new BuiltInAIChatLanguageModel(modelId, settings);
		};
		const createEmbeddingModel = (modelId, settings) => {
			return new BuiltInAIEmbeddingModel(settings);
		};
		const provider = function(modelId = "text", settings) {
			if (new.target) throw new Error("The BuiltInAI model function cannot be called with the new keyword.");
			return createChatModel(modelId, settings);
		};
		provider.specificationVersion = "v3";
		provider.languageModel = createChatModel;
		provider.chat = createChatModel;
		provider.embedding = createEmbeddingModel;
		provider.embeddingModel = createEmbeddingModel;
		provider.imageModel = (modelId) => {
			throw new import_provider3.NoSuchModelError({
				modelId,
				modelType: "imageModel"
			});
		};
		provider.speechModel = (modelId) => {
			throw new import_provider3.NoSuchModelError({
				modelId,
				modelType: "speechModel"
			});
		};
		provider.transcriptionModel = (modelId) => {
			throw new import_provider3.NoSuchModelError({
				modelId,
				modelType: "transcriptionModel"
			});
		};
		return provider;
	}
	var builtInAI = createBuiltInAI();
}));
export { require_dist as t };
