import { b as invariant, n as TSR_SCRIPT_BARRIER_ID, x as createControlledPromise } from "./react-router.mjs";
var K$1 = ((s$1) => (s$1[s$1.AggregateError = 1] = "AggregateError", s$1[s$1.ArrowFunction = 2] = "ArrowFunction", s$1[s$1.ErrorPrototypeStack = 4] = "ErrorPrototypeStack", s$1[s$1.ObjectAssign = 8] = "ObjectAssign", s$1[s$1.BigIntTypedArray = 16] = "BigIntTypedArray", s$1))(K$1 || {});
var b = Symbol.asyncIterator, lr = Symbol.hasInstance, P$1 = Symbol.isConcatSpreadable, A$1 = Symbol.iterator, ur = Symbol.match, cr = Symbol.matchAll, fr = Symbol.replace, Sr = Symbol.search, pr = Symbol.species, dr = Symbol.split, mr = Symbol.toPrimitive, x$1 = Symbol.toStringTag, gr = Symbol.unscopables;
var Zr = {
	0: "Symbol.asyncIterator",
	1: "Symbol.hasInstance",
	2: "Symbol.isConcatSpreadable",
	3: "Symbol.iterator",
	4: "Symbol.match",
	5: "Symbol.matchAll",
	6: "Symbol.replace",
	7: "Symbol.search",
	8: "Symbol.species",
	9: "Symbol.split",
	10: "Symbol.toPrimitive",
	11: "Symbol.toStringTag",
	12: "Symbol.unscopables"
}, ge = {
	[b]: 0,
	[lr]: 1,
	[P$1]: 2,
	[A$1]: 3,
	[ur]: 4,
	[cr]: 5,
	[fr]: 6,
	[Sr]: 7,
	[pr]: 8,
	[dr]: 9,
	[mr]: 10,
	[x$1]: 11,
	[gr]: 12
}, Jr = {
	0: b,
	1: lr,
	2: P$1,
	3: A$1,
	4: ur,
	5: cr,
	6: fr,
	7: Sr,
	8: pr,
	9: dr,
	10: mr,
	11: x$1,
	12: gr
}, Hr = {
	2: "!0",
	3: "!1",
	1: "void 0",
	0: "null",
	4: "-0",
	5: "1/0",
	6: "-1/0",
	7: "0/0"
}, $r = {
	2: !0,
	3: !1,
	1: void 0,
	0: null,
	4: -0,
	5: Number.POSITIVE_INFINITY,
	6: Number.NEGATIVE_INFINITY,
	7: NaN
};
var ye = {
	0: "Error",
	1: "EvalError",
	2: "RangeError",
	3: "ReferenceError",
	4: "SyntaxError",
	5: "TypeError",
	6: "URIError"
}, qr = {
	0: Error,
	1: EvalError,
	2: RangeError,
	3: ReferenceError,
	4: SyntaxError,
	5: TypeError,
	6: URIError
}, o$1 = void 0;
function c$1(e, r, t, n, a, s$1, i$1, l$1, u$1, g$1, S$1, d) {
	return {
		t: e,
		i: r,
		s: t,
		l: n,
		c: a,
		m: s$1,
		p: i$1,
		e: l$1,
		a: u$1,
		f: g$1,
		b: S$1,
		o: d
	};
}
function _$1(e) {
	return c$1(2, o$1, e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
var Z = _$1(2), J = _$1(3), Ne = _$1(1), Ce = _$1(0), Xr = _$1(4), Qr = _$1(5), et = _$1(6), rt = _$1(7);
function Qt(e) {
	switch (e) {
		case "\"": return "\\\"";
		case "\\": return "\\\\";
		case `
`: return "\\n";
		case "\r": return "\\r";
		case "\b": return "\\b";
		case "	": return "\\t";
		case "\f": return "\\f";
		case "<": return "\\x3C";
		case "\u2028": return "\\u2028";
		case "\u2029": return "\\u2029";
		default: return;
	}
}
function y$1(e) {
	let r = "", t = 0, n;
	for (let a = 0, s$1 = e.length; a < s$1; a++) n = Qt(e[a]), n && (r += e.slice(t, a) + n, t = a + 1);
	return t === 0 ? r = e : r += e.slice(t), r;
}
function en(e) {
	switch (e) {
		case "\\\\": return "\\";
		case "\\\"": return "\"";
		case "\\n": return `
`;
		case "\\r": return "\r";
		case "\\b": return "\b";
		case "\\t": return "	";
		case "\\f": return "\f";
		case "\\x3C": return "<";
		case "\\u2028": return "\u2028";
		case "\\u2029": return "\u2029";
		default: return e;
	}
}
function z(e) {
	return e.replace(/(\\\\|\\"|\\n|\\r|\\b|\\t|\\f|\\u2028|\\u2029|\\x3C)/g, en);
}
var B$1 = "__SEROVAL_REFS__", ie$1 = "$R", ve = `self.${ie$1}`;
function rn(e) {
	return e == null ? `${ve}=${ve}||[]` : `(${ve}=${ve}||{})["${y$1(e)}"]=[]`;
}
var yr = /* @__PURE__ */ new Map(), V$1 = /* @__PURE__ */ new Map();
function Nr(e) {
	return yr.has(e);
}
function nn(e) {
	return V$1.has(e);
}
function tt(e) {
	if (Nr(e)) return yr.get(e);
	throw new be(e);
}
function nt(e) {
	if (nn(e)) return V$1.get(e);
	throw new Ae(e);
}
typeof globalThis != "undefined" ? Object.defineProperty(globalThis, B$1, {
	value: V$1,
	configurable: !0,
	writable: !1,
	enumerable: !1
}) : typeof window != "undefined" ? Object.defineProperty(window, B$1, {
	value: V$1,
	configurable: !0,
	writable: !1,
	enumerable: !1
}) : typeof self != "undefined" ? Object.defineProperty(self, B$1, {
	value: V$1,
	configurable: !0,
	writable: !1,
	enumerable: !1
}) : typeof global != "undefined" && Object.defineProperty(global, B$1, {
	value: V$1,
	configurable: !0,
	writable: !1,
	enumerable: !1
});
function Re(e) {
	return e instanceof EvalError ? 1 : e instanceof RangeError ? 2 : e instanceof ReferenceError ? 3 : e instanceof SyntaxError ? 4 : e instanceof TypeError ? 5 : e instanceof URIError ? 6 : 0;
}
function on(e) {
	let r = ye[Re(e)];
	return e.name !== r ? { name: e.name } : e.constructor.name !== r ? { name: e.constructor.name } : {};
}
function H(e, r) {
	let t = on(e), n = Object.getOwnPropertyNames(e);
	for (let a = 0, s$1 = n.length, i$1; a < s$1; a++) i$1 = n[a], i$1 !== "name" && i$1 !== "message" && (i$1 === "stack" ? r & 4 && (t = t || {}, t[i$1] = e[i$1]) : (t = t || {}, t[i$1] = e[i$1]));
	return t;
}
function Ie(e) {
	return Object.isFrozen(e) ? 3 : Object.isSealed(e) ? 2 : Object.isExtensible(e) ? 0 : 1;
}
function Ee(e) {
	switch (e) {
		case Number.POSITIVE_INFINITY: return Qr;
		case Number.NEGATIVE_INFINITY: return et;
	}
	return e !== e ? rt : Object.is(e, -0) ? Xr : c$1(0, o$1, e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function $(e) {
	return c$1(1, o$1, y$1(e), o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function Pe(e) {
	return c$1(3, o$1, "" + e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function at(e) {
	return c$1(4, e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function xe(e, r) {
	let t = r.valueOf();
	return c$1(5, e, t !== t ? "" : r.toISOString(), o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function Te(e, r) {
	return c$1(6, e, o$1, o$1, y$1(r.source), r.flags, o$1, o$1, o$1, o$1, o$1, o$1);
}
function st(e, r) {
	return c$1(17, e, ge[r], o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function it(e, r) {
	return c$1(18, e, y$1(tt(r)), o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function le(e, r, t) {
	return c$1(25, e, t, o$1, y$1(r), o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function Oe(e, r, t) {
	return c$1(9, e, o$1, r.length, o$1, o$1, o$1, o$1, t, o$1, o$1, Ie(r));
}
function he(e, r) {
	return c$1(21, e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1);
}
function we(e, r, t) {
	return c$1(15, e, o$1, r.length, r.constructor.name, o$1, o$1, o$1, o$1, t, r.byteOffset, o$1);
}
function ze(e, r, t) {
	return c$1(16, e, o$1, r.length, r.constructor.name, o$1, o$1, o$1, o$1, t, r.byteOffset, o$1);
}
function ke(e, r, t) {
	return c$1(20, e, o$1, r.byteLength, o$1, o$1, o$1, o$1, o$1, t, r.byteOffset, o$1);
}
function _e(e, r, t) {
	return c$1(13, e, Re(r), o$1, o$1, y$1(r.message), t, o$1, o$1, o$1, o$1, o$1);
}
function De(e, r, t) {
	return c$1(14, e, Re(r), o$1, o$1, y$1(r.message), t, o$1, o$1, o$1, o$1, o$1);
}
function Fe(e, r, t) {
	return c$1(7, e, o$1, r, o$1, o$1, o$1, o$1, t, o$1, o$1, o$1);
}
function Be(e, r) {
	return c$1(28, o$1, o$1, o$1, o$1, o$1, o$1, o$1, [e, r], o$1, o$1, o$1);
}
function Ve(e, r) {
	return c$1(30, o$1, o$1, o$1, o$1, o$1, o$1, o$1, [e, r], o$1, o$1, o$1);
}
function Me(e, r, t) {
	return c$1(31, e, o$1, o$1, o$1, o$1, o$1, o$1, t, r, o$1, o$1);
}
function je(e, r) {
	return c$1(32, e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1);
}
function Ue(e, r) {
	return c$1(33, e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1);
}
function Le(e, r) {
	return c$1(34, e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1);
}
var { toString: Ja } = Object.prototype;
var an = {
	parsing: 1,
	serialization: 2,
	deserialization: 3
};
function sn(e) {
	return `Seroval Error (step: ${an[e]})`;
}
var ln = (e, r) => sn(e), ue$1 = class extends Error {
	constructor(t, n) {
		super(ln(t, n));
		this.cause = n;
	}
}, h$1 = class extends ue$1 {
	constructor(r) {
		super("parsing", r);
	}
}, Ye = class extends ue$1 {
	constructor(r) {
		super("deserialization", r);
	}
};
function M$1(e) {
	return `Seroval Error (specific: ${e})`;
}
var E$1 = class extends Error {
	constructor(t) {
		super(M$1(1));
		this.value = t;
	}
}, k = class extends Error {
	constructor(r) {
		super(M$1(2));
	}
}, q = class extends Error {
	constructor(r) {
		super(M$1(3));
	}
}, D$1 = class extends Error {
	constructor(r) {
		super(M$1(4));
	}
}, be = class extends Error {
	constructor(t) {
		super(M$1(5));
		this.value = t;
	}
}, Ae = class extends Error {
	constructor(r) {
		super(M$1(6));
	}
}, We = class extends Error {
	constructor(r) {
		super(M$1(7));
	}
};
var j = class {
	constructor(r, t) {
		this.value = r;
		this.replacement = t;
	}
};
var X = () => {
	let e = {
		p: 0,
		s: 0,
		f: 0
	};
	return e.p = new Promise((r, t) => {
		e.s = r, e.f = t;
	}), e;
}, un = (e, r) => {
	e.s(r), e.p.s = 1, e.p.v = r;
}, cn = (e, r) => {
	e.f(r), e.p.s = 2, e.p.v = r;
}, lt = X.toString(), ut = un.toString(), ct = cn.toString(), vr = () => {
	let e = [], r = [], t = !0, n = !1, a = 0, s$1 = (u$1, g$1, S$1) => {
		for (S$1 = 0; S$1 < a; S$1++) r[S$1] && r[S$1][g$1](u$1);
	}, i$1 = (u$1, g$1, S$1, d) => {
		for (g$1 = 0, S$1 = e.length; g$1 < S$1; g$1++) d = e[g$1], !t && g$1 === S$1 - 1 ? u$1[n ? "return" : "throw"](d) : u$1.next(d);
	}, l$1 = (u$1, g$1) => (t && (g$1 = a++, r[g$1] = u$1), i$1(u$1), () => {
		t && (r[g$1] = r[a], r[a--] = void 0);
	});
	return {
		__SEROVAL_STREAM__: !0,
		on: (u$1) => l$1(u$1),
		next: (u$1) => {
			t && (e.push(u$1), s$1(u$1, "next"));
		},
		throw: (u$1) => {
			t && (e.push(u$1), s$1(u$1, "throw"), t = !1, n = !1, r.length = 0);
		},
		return: (u$1) => {
			t && (e.push(u$1), s$1(u$1, "return"), t = !1, n = !0, r.length = 0);
		}
	};
}, ft = vr.toString(), br = (e) => (r) => () => {
	let t = 0, n = {
		[e]: () => n,
		next: () => {
			if (t > r.d) return {
				done: !0,
				value: void 0
			};
			let a = t++, s$1 = r.v[a];
			if (a === r.t) throw s$1;
			return {
				done: a === r.d,
				value: s$1
			};
		}
	};
	return n;
}, St = br.toString(), Ar = (e, r) => (t) => () => {
	let n = 0, a = -1, s$1 = !1, i$1 = [], l$1 = [], u$1 = (S$1 = 0, d = l$1.length) => {
		for (; S$1 < d; S$1++) l$1[S$1].s({
			done: !0,
			value: void 0
		});
	};
	t.on({
		next: (S$1) => {
			let d = l$1.shift();
			d && d.s({
				done: !1,
				value: S$1
			}), i$1.push(S$1);
		},
		throw: (S$1) => {
			let d = l$1.shift();
			d && d.f(S$1), u$1(), a = i$1.length, s$1 = !0, i$1.push(S$1);
		},
		return: (S$1) => {
			let d = l$1.shift();
			d && d.s({
				done: !0,
				value: S$1
			}), u$1(), a = i$1.length, i$1.push(S$1);
		}
	});
	let g$1 = {
		[e]: () => g$1,
		next: () => {
			if (a === -1) {
				let W = n++;
				if (W >= i$1.length) {
					let Gr = r();
					return l$1.push(Gr), Gr.p;
				}
				return {
					done: !1,
					value: i$1[W]
				};
			}
			if (n > a) return {
				done: !0,
				value: void 0
			};
			let S$1 = n++, d = i$1[S$1];
			if (S$1 !== a) return {
				done: !1,
				value: d
			};
			if (s$1) throw d;
			return {
				done: !0,
				value: d
			};
		}
	};
	return g$1;
}, pt = Ar.toString(), Rr = (e, r) => {
	let t = atob(r), n = new Uint8Array(e);
	for (let a = 0; a < e; a++) n[a] = t.charCodeAt(a);
	return n.buffer;
}, dt = Rr.toString();
var mt = {}, gt = {};
var yt = {
	0: {},
	1: {},
	2: {},
	3: {},
	4: {},
	5: {}
}, Nt = {
	0: "[]",
	1: lt,
	2: ut,
	3: ct,
	4: ft,
	5: dt
};
function Ke(e) {
	return "__SEROVAL_STREAM__" in e;
}
function Q() {
	return vr();
}
function Ge(e) {
	let r = Q(), t = e[b]();
	async function n() {
		try {
			let a = await t.next();
			a.done ? r.return(a.value) : (r.next(a.value), await n());
		} catch (a) {
			r.throw(a);
		}
	}
	return n().catch(() => {}), r;
}
var fn = Ar(b, X);
function Ct(e) {
	return fn(e);
}
function Ze(e) {
	let r = [], t = -1, n = -1, a = e[A$1]();
	for (;;) try {
		let s$1 = a.next();
		if (r.push(s$1.value), s$1.done) {
			n = r.length - 1;
			break;
		}
	} catch (s$1) {
		t = r.length, r.push(s$1);
	}
	return {
		v: r,
		t,
		d: n
	};
}
var Sn = br(A$1);
function vt(e) {
	return Sn(e);
}
async function Ir(e) {
	try {
		return [1, await e];
	} catch (r) {
		return [0, r];
	}
}
function ce(e, r) {
	return {
		plugins: r.plugins,
		mode: e,
		marked: /* @__PURE__ */ new Set(),
		features: 31 ^ (r.disabledFeatures || 0),
		refs: r.refs || /* @__PURE__ */ new Map()
	};
}
function fe(e, r) {
	e.marked.add(r);
}
function Er(e, r) {
	let t = e.refs.size;
	return e.refs.set(r, t), t;
}
function Je(e, r) {
	let t = e.refs.get(r);
	return t != null ? (fe(e, t), {
		type: 1,
		value: at(t)
	}) : {
		type: 0,
		value: Er(e, r)
	};
}
function U(e, r) {
	let t = Je(e, r);
	return t.type === 1 ? t : Nr(r) ? {
		type: 2,
		value: it(t.value, r)
	} : t;
}
function I$1(e, r) {
	let t = U(e, r);
	if (t.type !== 0) return t.value;
	if (r in ge) return st(t.value, r);
	throw new E$1(r);
}
function w$1(e, r) {
	let t = Je(e, yt[r]);
	return t.type === 1 ? t.value : c$1(26, t.value, r, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function He(e) {
	let r = Je(e, mt);
	return r.type === 1 ? r.value : c$1(27, r.value, o$1, o$1, o$1, o$1, o$1, o$1, o$1, I$1(e, A$1), o$1, o$1);
}
function $e(e) {
	let r = Je(e, gt);
	return r.type === 1 ? r.value : c$1(29, r.value, o$1, o$1, o$1, o$1, o$1, o$1, [w$1(e, 1), I$1(e, b)], o$1, o$1, o$1);
}
function qe(e, r, t, n) {
	return c$1(t ? 11 : 10, e, o$1, o$1, o$1, o$1, n, o$1, o$1, o$1, o$1, Ie(r));
}
function Xe(e, r, t, n, a) {
	return c$1(8, r, o$1, o$1, o$1, o$1, o$1, {
		k: t,
		v: n,
		s: a
	}, o$1, w$1(e, 0), o$1, o$1);
}
function At(e, r, t) {
	return c$1(22, r, t, o$1, o$1, o$1, o$1, o$1, o$1, w$1(e, 1), o$1, o$1);
}
function Qe(e, r, t) {
	let n = new Uint8Array(t), a = n.length, s$1 = "";
	for (let i$1 = 0; i$1 < a; i$1++) s$1 += String.fromCharCode(n[i$1]);
	return c$1(19, r, y$1(btoa(s$1)), a, o$1, o$1, o$1, o$1, o$1, w$1(e, 5), o$1, o$1);
}
function ee$1(e, r) {
	return {
		base: ce(e, r),
		child: void 0
	};
}
var xr = class {
	constructor(r) {
		this._p = r;
	}
	parse(r) {
		return N$1(this._p, r);
	}
};
async function mn(e, r) {
	let t = [];
	for (let n = 0, a = r.length; n < a; n++) n in r && (t[n] = await N$1(e, r[n]));
	return t;
}
async function gn(e, r, t) {
	return Oe(r, t, await mn(e, t));
}
async function Tr(e, r) {
	let t = Object.entries(r), n = [], a = [];
	for (let s$1 = 0, i$1 = t.length; s$1 < i$1; s$1++) n.push(y$1(t[s$1][0])), a.push(await N$1(e, t[s$1][1]));
	return A$1 in r && (n.push(I$1(e.base, A$1)), a.push(Be(He(e.base), await N$1(e, Ze(r))))), b in r && (n.push(I$1(e.base, b)), a.push(Ve($e(e.base), await N$1(e, Ge(r))))), x$1 in r && (n.push(I$1(e.base, x$1)), a.push($(r[x$1]))), P$1 in r && (n.push(I$1(e.base, P$1)), a.push(r[P$1] ? Z : J)), {
		k: n,
		v: a,
		s: n.length
	};
}
async function Pr(e, r, t, n) {
	return qe(r, t, n, await Tr(e, t));
}
async function yn(e, r, t) {
	return he(r, await N$1(e, t.valueOf()));
}
async function Nn(e, r, t) {
	return we(r, t, await N$1(e, t.buffer));
}
async function Cn(e, r, t) {
	return ze(r, t, await N$1(e, t.buffer));
}
async function vn(e, r, t) {
	return ke(r, t, await N$1(e, t.buffer));
}
async function Rt(e, r, t) {
	let n = H(t, e.base.features);
	return _e(r, t, n ? await Tr(e, n) : o$1);
}
async function bn(e, r, t) {
	let n = H(t, e.base.features);
	return De(r, t, n ? await Tr(e, n) : o$1);
}
async function An(e, r, t) {
	let n = [], a = [];
	for (let [s$1, i$1] of t.entries()) n.push(await N$1(e, s$1)), a.push(await N$1(e, i$1));
	return Xe(e.base, r, n, a, t.size);
}
async function Rn(e, r, t) {
	let n = [];
	for (let a of t.keys()) n.push(await N$1(e, a));
	return Fe(r, t.size, n);
}
async function It(e, r, t) {
	let n = e.base.plugins;
	if (n) for (let a = 0, s$1 = n.length; a < s$1; a++) {
		let i$1 = n[a];
		if (i$1.parse.async && i$1.test(t)) return e.child ??= new xr(e), le(r, i$1.tag, await i$1.parse.async(t, e.child, { id: r }));
	}
	return o$1;
}
async function In(e, r, t) {
	let [n, a] = await Ir(t);
	return c$1(12, r, n, o$1, o$1, o$1, o$1, o$1, o$1, await N$1(e, a), o$1, o$1);
}
function En(e, r, t, n) {
	let a = [], s$1 = r.on({
		next: (i$1) => {
			fe(this.base, e), N$1(this, i$1).then((l$1) => {
				a.push(je(e, l$1));
			}, (l$1) => {
				n(l$1), s$1();
			});
		},
		throw: (i$1) => {
			fe(this.base, e), N$1(this, i$1).then((l$1) => {
				a.push(Ue(e, l$1)), t(a), s$1();
			}, (l$1) => {
				n(l$1), s$1();
			});
		},
		return: (i$1) => {
			fe(this.base, e), N$1(this, i$1).then((l$1) => {
				a.push(Le(e, l$1)), t(a), s$1();
			}, (l$1) => {
				n(l$1), s$1();
			});
		}
	});
}
async function Pn(e, r, t) {
	return Me(r, w$1(e.base, 4), await new Promise(En.bind(e, r, t)));
}
async function xn(e, r, t) {
	if (Array.isArray(t)) return gn(e, r, t);
	if (Ke(t)) return Pn(e, r, t);
	let n = t.constructor;
	if (n === j) return N$1(e, t.replacement);
	let a = await It(e, r, t);
	if (a) return a;
	switch (n) {
		case Object: return Pr(e, r, t, !1);
		case o$1: return Pr(e, r, t, !0);
		case Date: return xe(r, t);
		case RegExp: return Te(r, t);
		case Error:
		case EvalError:
		case RangeError:
		case ReferenceError:
		case SyntaxError:
		case TypeError:
		case URIError: return Rt(e, r, t);
		case Number:
		case Boolean:
		case String:
		case BigInt: return yn(e, r, t);
		case ArrayBuffer: return Qe(e.base, r, t);
		case Int8Array:
		case Int16Array:
		case Int32Array:
		case Uint8Array:
		case Uint16Array:
		case Uint32Array:
		case Uint8ClampedArray:
		case Float32Array:
		case Float64Array: return Nn(e, r, t);
		case DataView: return vn(e, r, t);
		case Map: return An(e, r, t);
		case Set: return Rn(e, r, t);
		default: break;
	}
	if (n === Promise || t instanceof Promise) return In(e, r, t);
	let s$1 = e.base.features;
	if (s$1 & 16) switch (n) {
		case BigInt64Array:
		case BigUint64Array: return Cn(e, r, t);
		default: break;
	}
	if (s$1 & 1 && typeof AggregateError != "undefined" && (n === AggregateError || t instanceof AggregateError)) return bn(e, r, t);
	if (t instanceof Error) return Rt(e, r, t);
	if (A$1 in t || b in t) return Pr(e, r, t, !!n);
	throw new E$1(t);
}
async function Tn(e, r) {
	let t = U(e.base, r);
	if (t.type !== 0) return t.value;
	let n = await It(e, t.value, r);
	if (n) return n;
	throw new E$1(r);
}
async function N$1(e, r) {
	switch (typeof r) {
		case "boolean": return r ? Z : J;
		case "undefined": return Ne;
		case "string": return $(r);
		case "number": return Ee(r);
		case "bigint": return Pe(r);
		case "object":
			if (r) {
				let t = U(e.base, r);
				return t.type === 0 ? await xn(e, t.value, r) : t.value;
			}
			return Ce;
		case "symbol": return I$1(e.base, r);
		case "function": return Tn(e, r);
		default: throw new E$1(r);
	}
}
async function re(e, r) {
	try {
		return await N$1(e, r);
	} catch (t) {
		throw t instanceof h$1 ? t : new h$1(t);
	}
}
var te = ((t) => (t[t.Vanilla = 1] = "Vanilla", t[t.Cross = 2] = "Cross", t))(te || {});
function _s(e) {
	return e;
}
function Et(e, r) {
	for (let t = 0, n = r.length; t < n; t++) {
		let a = r[t];
		e.has(a) || (e.add(a), a.extends && Et(e, a.extends));
	}
}
function v(e) {
	if (e) {
		let r = /* @__PURE__ */ new Set();
		return Et(r, e), [...r];
	}
}
function Pt(e) {
	switch (e) {
		case "Int8Array": return Int8Array;
		case "Int16Array": return Int16Array;
		case "Int32Array": return Int32Array;
		case "Uint8Array": return Uint8Array;
		case "Uint16Array": return Uint16Array;
		case "Uint32Array": return Uint32Array;
		case "Uint8ClampedArray": return Uint8ClampedArray;
		case "Float32Array": return Float32Array;
		case "Float64Array": return Float64Array;
		case "BigInt64Array": return BigInt64Array;
		case "BigUint64Array": return BigUint64Array;
		default: throw new We(e);
	}
}
function xt(e, r) {
	switch (r) {
		case 3: return Object.freeze(e);
		case 1: return Object.preventExtensions(e);
		case 2: return Object.seal(e);
		default: return e;
	}
}
function Tt(e, r) {
	return {
		mode: e,
		plugins: r.plugins,
		refs: r.refs || /* @__PURE__ */ new Map()
	};
}
function Ot(e) {
	return {
		mode: 1,
		base: Tt(1, e),
		child: void 0,
		state: { marked: new Set(e.markedRefs) }
	};
}
var Or = class {
	constructor(r) {
		this._p = r;
	}
	deserialize(r) {
		return m$1(this._p, r);
	}
};
function On(e, r, t) {
	return e.state.marked.has(r) && e.base.refs.set(r, t), t;
}
function hn(e, r, t) {
	return e.base.refs.has(r) || e.base.refs.set(r, t), t;
}
function C(e, r, t) {
	return e.mode === 1 ? On(e, r, t) : hn(e, r, t);
}
function wn(e, r) {
	return C(e, r.i, nt(z(r.s)));
}
function zn(e, r) {
	let t = r.l, n = C(e, r.i, new Array(t)), a;
	for (let s$1 = 0; s$1 < t; s$1++) a = r.a[s$1], a && (n[s$1] = m$1(e, a));
	return xt(n, r.o), n;
}
function wt(e, r, t) {
	let n = r.s;
	if (n) {
		let a = r.k, s$1 = r.v;
		for (let i$1 = 0, l$1; i$1 < n; i$1++) l$1 = a[i$1], typeof l$1 == "string" ? t[z(l$1)] = m$1(e, s$1[i$1]) : t[m$1(e, l$1)] = m$1(e, s$1[i$1]);
	}
	return t;
}
function kn(e, r) {
	let t = C(e, r.i, r.t === 10 ? {} : Object.create(null));
	return wt(e, r.p, t), xt(t, r.o), t;
}
function _n(e, r) {
	return C(e, r.i, new Date(r.s));
}
function Dn(e, r) {
	return C(e, r.i, new RegExp(z(r.c), r.m));
}
function Fn(e, r) {
	let t = C(e, r.i, /* @__PURE__ */ new Set()), n = r.a;
	for (let a = 0, s$1 = r.l; a < s$1; a++) t.add(m$1(e, n[a]));
	return t;
}
function Bn(e, r) {
	let t = C(e, r.i, /* @__PURE__ */ new Map()), n = r.e.k, a = r.e.v;
	for (let s$1 = 0, i$1 = r.e.s; s$1 < i$1; s$1++) t.set(m$1(e, n[s$1]), m$1(e, a[s$1]));
	return t;
}
function Vn(e, r) {
	return C(e, r.i, Rr(r.l, z(r.s)));
}
function Mn(e, r) {
	let t = Pt(r.c), n = m$1(e, r.f);
	return C(e, r.i, new t(n, r.b, r.l));
}
function jn(e, r) {
	let t = m$1(e, r.f);
	return C(e, r.i, new DataView(t, r.b, r.l));
}
function zt(e, r, t) {
	if (r.p) {
		let n = wt(e, r.p, {});
		Object.assign(t, n);
	}
	return t;
}
function Un(e, r) {
	return zt(e, r, C(e, r.i, new AggregateError([], z(r.m))));
}
function Ln(e, r) {
	let t = qr[r.s];
	return zt(e, r, C(e, r.i, new t(z(r.m))));
}
function Yn(e, r) {
	let t = X(), n = C(e, r.i, t.p), a = m$1(e, r.f);
	return r.s ? t.s(a) : t.f(a), n;
}
function Wn(e, r) {
	return C(e, r.i, Object(m$1(e, r.f)));
}
function Kn(e, r) {
	let t = e.base.plugins;
	if (t) {
		let n = z(r.c);
		for (let a = 0, s$1 = t.length; a < s$1; a++) {
			let i$1 = t[a];
			if (i$1.tag === n) return e.child ??= new Or(e), C(e, r.i, i$1.deserialize(r.s, e.child, { id: r.i }));
		}
	}
	throw new q(r.c);
}
function Gn(e, r) {
	return C(e, r.i, C(e, r.s, X()).p);
}
function Zn(e, r) {
	let t = e.base.refs.get(r.i);
	if (t) {
		t.s(m$1(e, r.a[1]));
		return;
	}
	throw new D$1("Promise");
}
function Jn(e, r) {
	let t = e.base.refs.get(r.i);
	if (t) {
		t.f(m$1(e, r.a[1]));
		return;
	}
	throw new D$1("Promise");
}
function Hn(e, r) {
	m$1(e, r.a[0]);
	return vt(m$1(e, r.a[1]));
}
function $n(e, r) {
	m$1(e, r.a[0]);
	return Ct(m$1(e, r.a[1]));
}
function qn(e, r) {
	let t = C(e, r.i, Q()), n = r.a.length;
	if (n) for (let a = 0; a < n; a++) m$1(e, r.a[a]);
	return t;
}
function Xn(e, r) {
	let t = e.base.refs.get(r.i);
	if (t) {
		t.next(m$1(e, r.f));
		return;
	}
	throw new D$1("Stream");
}
function Qn(e, r) {
	let t = e.base.refs.get(r.i);
	if (t) {
		t.throw(m$1(e, r.f));
		return;
	}
	throw new D$1("Stream");
}
function eo(e, r) {
	let t = e.base.refs.get(r.i);
	if (t) {
		t.return(m$1(e, r.f));
		return;
	}
	throw new D$1("Stream");
}
function ro(e, r) {
	m$1(e, r.f);
}
function to(e, r) {
	m$1(e, r.a[1]);
}
function m$1(e, r) {
	switch (r.t) {
		case 2: return $r[r.s];
		case 0: return r.s;
		case 1: return z(r.s);
		case 3: return BigInt(r.s);
		case 4: return e.base.refs.get(r.i);
		case 18: return wn(e, r);
		case 9: return zn(e, r);
		case 10:
		case 11: return kn(e, r);
		case 5: return _n(e, r);
		case 6: return Dn(e, r);
		case 7: return Fn(e, r);
		case 8: return Bn(e, r);
		case 19: return Vn(e, r);
		case 16:
		case 15: return Mn(e, r);
		case 20: return jn(e, r);
		case 14: return Un(e, r);
		case 13: return Ln(e, r);
		case 12: return Yn(e, r);
		case 17: return Jr[r.s];
		case 21: return Wn(e, r);
		case 25: return Kn(e, r);
		case 22: return Gn(e, r);
		case 23: return Zn(e, r);
		case 24: return Jn(e, r);
		case 28: return Hn(e, r);
		case 30: return $n(e, r);
		case 31: return qn(e, r);
		case 32: return Xn(e, r);
		case 33: return Qn(e, r);
		case 34: return eo(e, r);
		case 27: return ro(e, r);
		case 29: return to(e, r);
		default: throw new k(r);
	}
}
function er(e, r) {
	try {
		return m$1(e, r);
	} catch (t) {
		throw new Ye(t);
	}
}
var no = () => T, oo = no.toString(), kt = /=>/.test(oo);
function rr(e, r) {
	return kt ? (e.length === 1 ? e[0] : "(" + e.join(",") + ")") + "=>" + (r.startsWith("{") ? "(" + r + ")" : r) : "function(" + e.join(",") + "){return " + r + "}";
}
function _t(e, r) {
	return kt ? (e.length === 1 ? e[0] : "(" + e.join(",") + ")") + "=>{" + r + "}" : "function(" + e.join(",") + "){" + r + "}";
}
var Bt = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_", Dt = Bt.length, Vt = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_", Ft = Vt.length;
function hr(e) {
	let r = e % Dt, t = Bt[r];
	for (e = (e - r) / Dt; e > 0;) r = e % Ft, t += Vt[r], e = (e - r) / Ft;
	return t;
}
var ao = /^[$A-Z_][0-9A-Z_$]*$/i;
function wr(e) {
	let r = e[0];
	return (r === "$" || r === "_" || r >= "A" && r <= "Z" || r >= "a" && r <= "z") && ao.test(e);
}
function pe(e) {
	switch (e.t) {
		case 0: return e.s + "=" + e.v;
		case 2: return e.s + ".set(" + e.k + "," + e.v + ")";
		case 1: return e.s + ".add(" + e.v + ")";
		case 3: return e.s + ".delete(" + e.k + ")";
	}
}
function so(e) {
	let r = [], t = e[0];
	for (let n = 1, a = e.length, s$1, i$1 = t; n < a; n++) s$1 = e[n], s$1.t === 0 && s$1.v === i$1.v ? t = {
		t: 0,
		s: s$1.s,
		k: o$1,
		v: pe(t)
	} : s$1.t === 2 && s$1.s === i$1.s ? t = {
		t: 2,
		s: pe(t),
		k: s$1.k,
		v: s$1.v
	} : s$1.t === 1 && s$1.s === i$1.s ? t = {
		t: 1,
		s: pe(t),
		k: o$1,
		v: s$1.v
	} : s$1.t === 3 && s$1.s === i$1.s ? t = {
		t: 3,
		s: pe(t),
		k: s$1.k,
		v: o$1
	} : (r.push(t), t = s$1), i$1 = s$1;
	return r.push(t), r;
}
function Wt(e) {
	if (e.length) {
		let r = "", t = so(e);
		for (let n = 0, a = t.length; n < a; n++) r += pe(t[n]) + ",";
		return r;
	}
	return o$1;
}
var io = "Object.create(null)", lo = "new Set", uo = "new Map", co = "Promise.resolve", fo = "Promise.reject", So = {
	3: "Object.freeze",
	2: "Object.seal",
	1: "Object.preventExtensions",
	0: o$1
};
function Kt(e, r) {
	return {
		mode: e,
		plugins: r.plugins,
		features: r.features,
		marked: new Set(r.markedRefs),
		stack: [],
		flags: [],
		assignments: []
	};
}
function nr(e) {
	return {
		mode: 2,
		base: Kt(2, e),
		state: e,
		child: void 0
	};
}
var zr = class {
	constructor(r) {
		this._p = r;
	}
	serialize(r) {
		return f$1(this._p, r);
	}
};
function mo(e, r) {
	let t = e.valid.get(r);
	t ?? (t = e.valid.size, e.valid.set(r, t));
	let n = e.vars[t];
	return n ?? (n = hr(t), e.vars[t] = n), n;
}
function go(e) {
	return ie$1 + "[" + e + "]";
}
function p$1(e, r) {
	return e.mode === 1 ? mo(e.state, r) : go(r);
}
function O(e, r) {
	e.marked.add(r);
}
function kr(e, r) {
	return e.marked.has(r);
}
function Dr(e, r, t) {
	r !== 0 && (O(e.base, t), e.base.flags.push({
		type: r,
		value: p$1(e, t)
	}));
}
function yo(e) {
	let r = "";
	for (let t = 0, n = e.flags, a = n.length; t < a; t++) {
		let s$1 = n[t];
		r += So[s$1.type] + "(" + s$1.value + "),";
	}
	return r;
}
function Gt(e) {
	let r = Wt(e.assignments), t = yo(e);
	return r ? t ? r + t : r : t;
}
function Zt(e, r, t) {
	e.assignments.push({
		t: 0,
		s: r,
		k: o$1,
		v: t
	});
}
function No(e, r, t) {
	e.base.assignments.push({
		t: 1,
		s: p$1(e, r),
		k: o$1,
		v: t
	});
}
function Se(e, r, t, n) {
	e.base.assignments.push({
		t: 2,
		s: p$1(e, r),
		k: t,
		v: n
	});
}
function Mt(e, r, t) {
	e.base.assignments.push({
		t: 3,
		s: p$1(e, r),
		k: t,
		v: o$1
	});
}
function de(e, r, t, n) {
	Zt(e.base, p$1(e, r) + "[" + t + "]", n);
}
function _r(e, r, t, n) {
	Zt(e.base, p$1(e, r) + "." + t, n);
}
function F(e, r) {
	return r.t === 4 && e.stack.includes(r.i);
}
function ne$1(e, r, t) {
	return e.mode === 1 && !kr(e.base, r) ? t : p$1(e, r) + "=" + t;
}
function Co(e) {
	return B$1 + ".get(\"" + e.s + "\")";
}
function jt(e, r, t, n) {
	return t ? F(e.base, t) ? (O(e.base, r), de(e, r, n, p$1(e, t.i)), "") : f$1(e, t) : "";
}
function vo(e, r) {
	let t = r.i;
	if (r.l) {
		e.base.stack.push(t);
		let n = r.a, a = jt(e, t, n[0], 0), s$1 = a === "";
		for (let i$1 = 1, l$1 = r.l, u$1; i$1 < l$1; i$1++) u$1 = jt(e, t, n[i$1], i$1), a += "," + u$1, s$1 = u$1 === "";
		return e.base.stack.pop(), Dr(e, r.o, r.i), "[" + a + (s$1 ? ",]" : "]");
	}
	return "[]";
}
function Ut(e, r, t, n) {
	if (typeof t == "string") {
		let a = Number(t), s$1 = a >= 0 && a.toString() === t || wr(t);
		if (F(e.base, n)) {
			let i$1 = p$1(e, n.i);
			return O(e.base, r.i), s$1 && a !== a ? _r(e, r.i, t, i$1) : de(e, r.i, s$1 ? t : "\"" + t + "\"", i$1), "";
		}
		return (s$1 ? t : "\"" + t + "\"") + ":" + f$1(e, n);
	}
	return "[" + f$1(e, t) + "]:" + f$1(e, n);
}
function Jt(e, r, t) {
	let n = t.s;
	if (n) {
		let a = t.k, s$1 = t.v;
		e.base.stack.push(r.i);
		let i$1 = Ut(e, r, a[0], s$1[0]);
		for (let l$1 = 1, u$1 = i$1; l$1 < n; l$1++) u$1 = Ut(e, r, a[l$1], s$1[l$1]), i$1 += (u$1 && i$1 && ",") + u$1;
		return e.base.stack.pop(), "{" + i$1 + "}";
	}
	return "{}";
}
function bo(e, r) {
	return Dr(e, r.o, r.i), Jt(e, r, r.p);
}
function Ao(e, r, t, n) {
	let a = Jt(e, r, t);
	return a !== "{}" ? "Object.assign(" + n + "," + a + ")" : n;
}
function Ro(e, r, t, n, a) {
	let s$1 = e.base, i$1 = f$1(e, a), l$1 = Number(n), u$1 = l$1 >= 0 && l$1.toString() === n || wr(n);
	if (F(s$1, a)) u$1 && l$1 !== l$1 ? _r(e, r.i, n, i$1) : de(e, r.i, u$1 ? n : "\"" + n + "\"", i$1);
	else {
		let g$1 = s$1.assignments;
		s$1.assignments = t, u$1 && l$1 !== l$1 ? _r(e, r.i, n, i$1) : de(e, r.i, u$1 ? n : "\"" + n + "\"", i$1), s$1.assignments = g$1;
	}
}
function Io(e, r, t, n, a) {
	if (typeof n == "string") Ro(e, r, t, n, a);
	else {
		let s$1 = e.base, i$1 = s$1.stack;
		s$1.stack = [];
		let l$1 = f$1(e, a);
		s$1.stack = i$1;
		let u$1 = s$1.assignments;
		s$1.assignments = t, de(e, r.i, f$1(e, n), l$1), s$1.assignments = u$1;
	}
}
function Eo(e, r, t) {
	let n = t.s;
	if (n) {
		let a = [], s$1 = t.k, i$1 = t.v;
		e.base.stack.push(r.i);
		for (let l$1 = 0; l$1 < n; l$1++) Io(e, r, a, s$1[l$1], i$1[l$1]);
		return e.base.stack.pop(), Wt(a);
	}
	return o$1;
}
function Fr(e, r, t) {
	if (r.p) {
		let n = e.base;
		if (n.features & 8) t = Ao(e, r, r.p, t);
		else {
			O(n, r.i);
			let a = Eo(e, r, r.p);
			if (a) return "(" + ne$1(e, r.i, t) + "," + a + p$1(e, r.i) + ")";
		}
	}
	return t;
}
function Po(e, r) {
	return Dr(e, r.o, r.i), Fr(e, r, io);
}
function xo(e) {
	return "new Date(\"" + e.s + "\")";
}
function To(e) {
	return "/" + e.c + "/" + e.m;
}
function Lt(e, r, t) {
	let n = e.base;
	return F(n, t) ? (O(n, r), No(e, r, p$1(e, t.i)), "") : f$1(e, t);
}
function Oo(e, r) {
	let t = lo, n = r.l, a = r.i;
	if (n) {
		let s$1 = r.a;
		e.base.stack.push(a);
		let i$1 = Lt(e, a, s$1[0]);
		for (let l$1 = 1, u$1 = i$1; l$1 < n; l$1++) u$1 = Lt(e, a, s$1[l$1]), i$1 += (u$1 && i$1 && ",") + u$1;
		e.base.stack.pop(), i$1 && (t += "([" + i$1 + "])");
	}
	return t;
}
function Yt(e, r, t, n, a) {
	let s$1 = e.base;
	if (F(s$1, t)) {
		let i$1 = p$1(e, t.i);
		if (O(s$1, r), F(s$1, n)) return Se(e, r, i$1, p$1(e, n.i)), "";
		if (n.t !== 4 && n.i != null && kr(s$1, n.i)) {
			let u$1 = "(" + f$1(e, n) + ",[" + a + "," + a + "])";
			return Se(e, r, i$1, p$1(e, n.i)), Mt(e, r, a), u$1;
		}
		let l$1 = s$1.stack;
		return s$1.stack = [], Se(e, r, i$1, f$1(e, n)), s$1.stack = l$1, "";
	}
	if (F(s$1, n)) {
		let i$1 = p$1(e, n.i);
		if (O(s$1, r), t.t !== 4 && t.i != null && kr(s$1, t.i)) {
			let u$1 = "(" + f$1(e, t) + ",[" + a + "," + a + "])";
			return Se(e, r, p$1(e, t.i), i$1), Mt(e, r, a), u$1;
		}
		let l$1 = s$1.stack;
		return s$1.stack = [], Se(e, r, f$1(e, t), i$1), s$1.stack = l$1, "";
	}
	return "[" + f$1(e, t) + "," + f$1(e, n) + "]";
}
function ho(e, r) {
	let t = uo, n = r.e.s, a = r.i, s$1 = r.f, i$1 = p$1(e, s$1.i), l$1 = e.base;
	if (n) {
		let u$1 = r.e.k, g$1 = r.e.v;
		l$1.stack.push(a);
		let S$1 = Yt(e, a, u$1[0], g$1[0], i$1);
		for (let d = 1, W = S$1; d < n; d++) W = Yt(e, a, u$1[d], g$1[d], i$1), S$1 += (W && S$1 && ",") + W;
		l$1.stack.pop(), S$1 && (t += "([" + S$1 + "])");
	}
	return s$1.t === 26 && (O(l$1, s$1.i), t = "(" + f$1(e, s$1) + "," + t + ")"), t;
}
function wo(e, r) {
	return L(e, r.f) + "(" + r.l + ",\"" + r.s + "\")";
}
function zo(e, r) {
	return "new " + r.c + "(" + f$1(e, r.f) + "," + r.b + "," + r.l + ")";
}
function ko(e, r) {
	return "new DataView(" + f$1(e, r.f) + "," + r.b + "," + r.l + ")";
}
function _o(e, r) {
	let t = r.i;
	e.base.stack.push(t);
	let n = Fr(e, r, "new AggregateError([],\"" + r.m + "\")");
	return e.base.stack.pop(), n;
}
function Do(e, r) {
	return Fr(e, r, "new " + ye[r.s] + "(\"" + r.m + "\")");
}
function Fo(e, r) {
	let t, n = r.f, a = r.i, s$1 = r.s ? co : fo, i$1 = e.base;
	if (F(i$1, n)) {
		let l$1 = p$1(e, n.i);
		t = s$1 + (r.s ? "().then(" + rr([], l$1) + ")" : "().catch(" + _t([], "throw " + l$1) + ")");
	} else {
		i$1.stack.push(a);
		let l$1 = f$1(e, n);
		i$1.stack.pop(), t = s$1 + "(" + l$1 + ")";
	}
	return t;
}
function Bo(e, r) {
	return "Object(" + f$1(e, r.f) + ")";
}
function L(e, r) {
	let t = f$1(e, r);
	return r.t === 4 ? t : "(" + t + ")";
}
function Vo(e, r) {
	if (e.mode === 1) throw new k(r);
	return "(" + ne$1(e, r.s, L(e, r.f) + "()") + ").p";
}
function Mo(e, r) {
	if (e.mode === 1) throw new k(r);
	return L(e, r.a[0]) + "(" + p$1(e, r.i) + "," + f$1(e, r.a[1]) + ")";
}
function jo(e, r) {
	if (e.mode === 1) throw new k(r);
	return L(e, r.a[0]) + "(" + p$1(e, r.i) + "," + f$1(e, r.a[1]) + ")";
}
function Uo(e, r) {
	let t = e.base.plugins;
	if (t) for (let n = 0, a = t.length; n < a; n++) {
		let s$1 = t[n];
		if (s$1.tag === r.c) return e.child ??= new zr(e), s$1.serialize(r.s, e.child, { id: r.i });
	}
	throw new q(r.c);
}
function Lo(e, r) {
	let t = "", n = !1;
	return r.f.t !== 4 && (O(e.base, r.f.i), t = "(" + f$1(e, r.f) + ",", n = !0), t += ne$1(e, r.i, "(" + St + ")(" + p$1(e, r.f.i) + ")"), n && (t += ")"), t;
}
function Yo(e, r) {
	return L(e, r.a[0]) + "(" + f$1(e, r.a[1]) + ")";
}
function Wo(e, r) {
	let t = r.a[0], n = r.a[1], a = e.base, s$1 = "";
	t.t !== 4 && (O(a, t.i), s$1 += "(" + f$1(e, t)), n.t !== 4 && (O(a, n.i), s$1 += (s$1 ? "," : "(") + f$1(e, n)), s$1 && (s$1 += ",");
	let i$1 = ne$1(e, r.i, "(" + pt + ")(" + p$1(e, n.i) + "," + p$1(e, t.i) + ")");
	return s$1 ? s$1 + i$1 + ")" : i$1;
}
function Ko(e, r) {
	return L(e, r.a[0]) + "(" + f$1(e, r.a[1]) + ")";
}
function Go(e, r) {
	let t = ne$1(e, r.i, L(e, r.f) + "()"), n = r.a.length;
	if (n) {
		let a = f$1(e, r.a[0]);
		for (let s$1 = 1; s$1 < n; s$1++) a += "," + f$1(e, r.a[s$1]);
		return "(" + t + "," + a + "," + p$1(e, r.i) + ")";
	}
	return t;
}
function Zo(e, r) {
	return p$1(e, r.i) + ".next(" + f$1(e, r.f) + ")";
}
function Jo(e, r) {
	return p$1(e, r.i) + ".throw(" + f$1(e, r.f) + ")";
}
function Ho(e, r) {
	return p$1(e, r.i) + ".return(" + f$1(e, r.f) + ")";
}
function $o(e, r) {
	switch (r.t) {
		case 17: return Zr[r.s];
		case 18: return Co(r);
		case 9: return vo(e, r);
		case 10: return bo(e, r);
		case 11: return Po(e, r);
		case 5: return xo(r);
		case 6: return To(r);
		case 7: return Oo(e, r);
		case 8: return ho(e, r);
		case 19: return wo(e, r);
		case 16:
		case 15: return zo(e, r);
		case 20: return ko(e, r);
		case 14: return _o(e, r);
		case 13: return Do(e, r);
		case 12: return Fo(e, r);
		case 21: return Bo(e, r);
		case 22: return Vo(e, r);
		case 25: return Uo(e, r);
		case 26: return Nt[r.s];
		default: throw new k(r);
	}
}
function f$1(e, r) {
	switch (r.t) {
		case 2: return Hr[r.s];
		case 0: return "" + r.s;
		case 1: return "\"" + r.s + "\"";
		case 3: return r.s + "n";
		case 4: return p$1(e, r.i);
		case 23: return Mo(e, r);
		case 24: return jo(e, r);
		case 27: return Lo(e, r);
		case 28: return Yo(e, r);
		case 29: return Wo(e, r);
		case 30: return Ko(e, r);
		case 31: return Go(e, r);
		case 32: return Zo(e, r);
		case 33: return Jo(e, r);
		case 34: return Ho(e, r);
		default: return ne$1(e, r.i, $o(e, r));
	}
}
function ar(e, r) {
	let t = f$1(e, r), n = r.i;
	if (n == null) return t;
	let a = Gt(e.base), s$1 = p$1(e, n), i$1 = e.state.scopeId, l$1 = i$1 == null ? "" : ie$1, u$1 = a ? "(" + t + "," + a + s$1 + ")" : t;
	if (l$1 === "") return r.t === 10 && !a ? "(" + u$1 + ")" : u$1;
	let g$1 = i$1 == null ? "()" : "(" + ie$1 + "[\"" + y$1(i$1) + "\"])";
	return "(" + rr([l$1], u$1) + ")" + g$1;
}
var Vr = class {
	constructor(r) {
		this._p = r;
	}
	parse(r) {
		return R$1(this._p, r);
	}
}, Mr = class {
	constructor(r) {
		this._p = r;
	}
	parse(r) {
		return R$1(this._p, r);
	}
	parseWithError(r) {
		return Y(this._p, r);
	}
	isAlive() {
		return this._p.state.alive;
	}
	pushPendingState() {
		Wr(this._p);
	}
	popPendingState() {
		me$1(this._p);
	}
	onParse(r) {
		oe(this._p, r);
	}
	onError(r) {
		Lr(this._p, r);
	}
};
function qo(e) {
	return {
		alive: !0,
		pending: 0,
		initial: !0,
		buffer: [],
		onParse: e.onParse,
		onError: e.onError,
		onDone: e.onDone
	};
}
function jr(e) {
	return {
		type: 2,
		base: ce(2, e),
		child: void 0,
		state: qo(e)
	};
}
function Xo(e, r) {
	let t = [];
	for (let n = 0, a = r.length; n < a; n++) n in r && (t[n] = R$1(e, r[n]));
	return t;
}
function Qo(e, r, t) {
	return Oe(r, t, Xo(e, t));
}
function Ur(e, r) {
	let t = Object.entries(r), n = [], a = [];
	for (let s$1 = 0, i$1 = t.length; s$1 < i$1; s$1++) n.push(y$1(t[s$1][0])), a.push(R$1(e, t[s$1][1]));
	return A$1 in r && (n.push(I$1(e.base, A$1)), a.push(Be(He(e.base), R$1(e, Ze(r))))), b in r && (n.push(I$1(e.base, b)), a.push(Ve($e(e.base), R$1(e, e.type === 1 ? Q() : Ge(r))))), x$1 in r && (n.push(I$1(e.base, x$1)), a.push($(r[x$1]))), P$1 in r && (n.push(I$1(e.base, P$1)), a.push(r[P$1] ? Z : J)), {
		k: n,
		v: a,
		s: n.length
	};
}
function Br(e, r, t, n) {
	return qe(r, t, n, Ur(e, t));
}
function ea(e, r, t) {
	return he(r, R$1(e, t.valueOf()));
}
function ra(e, r, t) {
	return we(r, t, R$1(e, t.buffer));
}
function ta(e, r, t) {
	return ze(r, t, R$1(e, t.buffer));
}
function na(e, r, t) {
	return ke(r, t, R$1(e, t.buffer));
}
function Ht(e, r, t) {
	let n = H(t, e.base.features);
	return _e(r, t, n ? Ur(e, n) : o$1);
}
function oa(e, r, t) {
	let n = H(t, e.base.features);
	return De(r, t, n ? Ur(e, n) : o$1);
}
function aa(e, r, t) {
	let n = [], a = [];
	for (let [s$1, i$1] of t.entries()) n.push(R$1(e, s$1)), a.push(R$1(e, i$1));
	return Xe(e.base, r, n, a, t.size);
}
function sa(e, r, t) {
	let n = [];
	for (let a of t.keys()) n.push(R$1(e, a));
	return Fe(r, t.size, n);
}
function ia(e, r, t) {
	let n = Me(r, w$1(e.base, 4), []);
	return e.type === 1 || (Wr(e), t.on({
		next: (a) => {
			if (e.state.alive) {
				let s$1 = Y(e, a);
				s$1 && oe(e, je(r, s$1));
			}
		},
		throw: (a) => {
			if (e.state.alive) {
				let s$1 = Y(e, a);
				s$1 && oe(e, Ue(r, s$1));
			}
			me$1(e);
		},
		return: (a) => {
			if (e.state.alive) {
				let s$1 = Y(e, a);
				s$1 && oe(e, Le(r, s$1));
			}
			me$1(e);
		}
	})), n;
}
function la(e, r) {
	if (this.state.alive) {
		let t = Y(this, r);
		t && oe(this, c$1(23, e, o$1, o$1, o$1, o$1, o$1, o$1, [w$1(this.base, 2), t], o$1, o$1, o$1)), me$1(this);
	}
}
function ua(e, r) {
	if (this.state.alive) {
		let t = Y(this, r);
		t && oe(this, c$1(24, e, o$1, o$1, o$1, o$1, o$1, o$1, [w$1(this.base, 3), t], o$1, o$1, o$1));
	}
	me$1(this);
}
function ca(e, r, t) {
	let n = Er(e.base, {});
	return e.type === 2 && (Wr(e), t.then(la.bind(e, n), ua.bind(e, n))), At(e.base, r, n);
}
function fa(e, r, t, n) {
	for (let a = 0, s$1 = n.length; a < s$1; a++) {
		let i$1 = n[a];
		if (i$1.parse.sync && i$1.test(t)) return e.child ??= new Vr(e), le(r, i$1.tag, i$1.parse.sync(t, e.child, { id: r }));
	}
}
function Sa(e, r, t, n) {
	for (let a = 0, s$1 = n.length; a < s$1; a++) {
		let i$1 = n[a];
		if (i$1.parse.stream && i$1.test(t)) return e.child ??= new Mr(e), le(r, i$1.tag, i$1.parse.stream(t, e.child, { id: r }));
	}
}
function $t(e, r, t) {
	let n = e.base.plugins;
	if (n) return e.type === 1 ? fa(e, r, t, n) : Sa(e, r, t, n);
}
function pa(e, r, t, n) {
	switch (n) {
		case Object: return Br(e, r, t, !1);
		case void 0: return Br(e, r, t, !0);
		case Date: return xe(r, t);
		case RegExp: return Te(r, t);
		case Error:
		case EvalError:
		case RangeError:
		case ReferenceError:
		case SyntaxError:
		case TypeError:
		case URIError: return Ht(e, r, t);
		case Number:
		case Boolean:
		case String:
		case BigInt: return ea(e, r, t);
		case ArrayBuffer: return Qe(e.base, r, t);
		case Int8Array:
		case Int16Array:
		case Int32Array:
		case Uint8Array:
		case Uint16Array:
		case Uint32Array:
		case Uint8ClampedArray:
		case Float32Array:
		case Float64Array: return ra(e, r, t);
		case DataView: return na(e, r, t);
		case Map: return aa(e, r, t);
		case Set: return sa(e, r, t);
		default: break;
	}
	if (n === Promise || t instanceof Promise) return ca(e, r, t);
	let a = e.base.features;
	if (a & 16) switch (n) {
		case BigInt64Array:
		case BigUint64Array: return ta(e, r, t);
		default: break;
	}
	if (a & 1 && typeof AggregateError != "undefined" && (n === AggregateError || t instanceof AggregateError)) return oa(e, r, t);
	if (t instanceof Error) return Ht(e, r, t);
	if (A$1 in t || b in t) return Br(e, r, t, !!n);
	throw new E$1(t);
}
function da(e, r, t) {
	if (Array.isArray(t)) return Qo(e, r, t);
	if (Ke(t)) return ia(e, r, t);
	let n = t.constructor;
	if (n === j) return R$1(e, t.replacement);
	return $t(e, r, t) || pa(e, r, t, n);
}
function ma(e, r) {
	let t = U(e.base, r);
	if (t.type !== 0) return t.value;
	let n = $t(e, t.value, r);
	if (n) return n;
	throw new E$1(r);
}
function R$1(e, r) {
	switch (typeof r) {
		case "boolean": return r ? Z : J;
		case "undefined": return Ne;
		case "string": return $(r);
		case "number": return Ee(r);
		case "bigint": return Pe(r);
		case "object":
			if (r) {
				let t = U(e.base, r);
				return t.type === 0 ? da(e, t.value, r) : t.value;
			}
			return Ce;
		case "symbol": return I$1(e.base, r);
		case "function": return ma(e, r);
		default: throw new E$1(r);
	}
}
function oe(e, r) {
	e.state.initial ? e.state.buffer.push(r) : Yr(e, r, !1);
}
function Lr(e, r) {
	if (e.state.onError) e.state.onError(r);
	else throw r instanceof h$1 ? r : new h$1(r);
}
function qt(e) {
	e.state.onDone && e.state.onDone();
}
function Yr(e, r, t) {
	try {
		e.state.onParse(r, t);
	} catch (n) {
		Lr(e, n);
	}
}
function Wr(e) {
	e.state.pending++;
}
function me$1(e) {
	--e.state.pending <= 0 && qt(e);
}
function Y(e, r) {
	try {
		return R$1(e, r);
	} catch (t) {
		return Lr(e, t), o$1;
	}
}
function Kr(e, r) {
	let t = Y(e, r);
	t && (Yr(e, t, !0), e.state.initial = !1, ga(e, e.state), e.state.pending <= 0 && sr(e));
}
function ga(e, r) {
	for (let t = 0, n = r.buffer.length; t < n; t++) Yr(e, r.buffer[t], !1);
}
function sr(e) {
	e.state.alive && (qt(e), e.state.alive = !1);
}
async function ki(e, r = {}) {
	return await re(ee$1(2, {
		plugins: v(r.plugins),
		disabledFeatures: r.disabledFeatures,
		refs: r.refs
	}), e);
}
function Xt(e, r) {
	let t = v(r.plugins), n = jr({
		plugins: t,
		refs: r.refs,
		disabledFeatures: r.disabledFeatures,
		onParse(a, s$1) {
			let i$1 = nr({
				plugins: t,
				features: n.base.features,
				scopeId: r.scopeId,
				markedRefs: n.base.marked
			}), l$1;
			try {
				l$1 = ar(i$1, a);
			} catch (u$1) {
				r.onError && r.onError(u$1);
				return;
			}
			r.onSerialize(l$1, s$1);
		},
		onError: r.onError,
		onDone: r.onDone
	});
	return Kr(n, e), sr.bind(null, n);
}
function _i(e, r) {
	let n = jr({
		plugins: v(r.plugins),
		refs: r.refs,
		disabledFeatures: r.disabledFeatures,
		onParse: r.onParse,
		onError: r.onError,
		onDone: r.onDone
	});
	return Kr(n, e), sr.bind(null, n);
}
function Xi(e, r = {}) {
	return er(Ot({
		plugins: v(r.plugins),
		markedRefs: e.m
	}), e.t);
}
var GLOBAL_TSR = "$_TSR";
function createSerializationAdapter(opts) {
	return opts;
}
function makeSsrSerovalPlugin(serializationAdapter, options) {
	return _s({
		tag: "$TSR/t/" + serializationAdapter.key,
		test: serializationAdapter.test,
		parse: { stream(value, ctx) {
			return ctx.parse(serializationAdapter.toSerializable(value));
		} },
		serialize(node, ctx) {
			options.didRun = true;
			return GLOBAL_TSR + ".t.get(\"" + serializationAdapter.key + "\")(" + ctx.serialize(node) + ")";
		},
		deserialize: void 0
	});
}
function makeSerovalPlugin(serializationAdapter) {
	return _s({
		tag: "$TSR/t/" + serializationAdapter.key,
		test: serializationAdapter.test,
		parse: {
			sync(value, ctx) {
				return ctx.parse(serializationAdapter.toSerializable(value));
			},
			async async(value, ctx) {
				return await ctx.parse(serializationAdapter.toSerializable(value));
			},
			stream(value, ctx) {
				return ctx.parse(serializationAdapter.toSerializable(value));
			}
		},
		serialize: void 0,
		deserialize(node, ctx) {
			return serializationAdapter.fromSerializable(ctx.deserialize(node));
		}
	});
}
function A(e) {
	e(this.reason);
}
function h(e) {
	this.addEventListener("abort", A.bind(this, e), { once: !0 });
}
function E(e) {
	return new Promise(h.bind(e));
}
var o = class {
	constructor() {
		this.controller = new AbortController();
	}
}, D = _s({
	tag: "seroval-plugins/web/AbortSignalController",
	test(e) {
		return e instanceof o;
	},
	parse: { stream() {} },
	serialize(e) {
		return "new AbortController";
	},
	deserialize(e) {
		return new o();
	}
}), s = class {
	constructor(r, a) {
		this.controller = r;
		this.reason = a;
	}
};
_s({
	tag: "seroval-plugins/web/AbortSignal",
	extends: [_s({
		extends: [D],
		tag: "seroval-plugins/web/AbortSignalAbort",
		test(e) {
			return e instanceof s;
		},
		parse: { stream(e, r) {
			return {
				controller: r.parse(e.controller),
				reason: r.parse(e.reason)
			};
		} },
		serialize(e, r) {
			return r.serialize(e.controller) + ".abort(" + r.serialize(e.reason) + ")";
		},
		deserialize(e, r) {
			let a = r.deserialize(e.controller), t = r.deserialize(e.reason);
			return a.controller.abort(t), new s(a, t);
		}
	})],
	test(e) {
		return typeof AbortSignal == "undefined" ? !1 : e instanceof AbortSignal;
	},
	parse: {
		sync(e, r) {
			return e.aborted ? {
				type: 1,
				reason: r.parse(e.reason)
			} : { type: 0 };
		},
		async async(e, r) {
			if (e.aborted) return {
				type: 1,
				reason: await r.parse(e.reason)
			};
			let a = await E(e);
			return {
				type: 1,
				reason: await r.parse(a)
			};
		},
		stream(e, r) {
			if (e.aborted) return {
				type: 1,
				reason: r.parse(e.reason)
			};
			let a = new o();
			return r.pushPendingState(), e.addEventListener("abort", () => {
				let t = r.parseWithError(new s(a, e.reason));
				t && r.onParse(t), r.popPendingState();
			}, { once: !0 }), {
				type: 2,
				controller: r.parse(a)
			};
		}
	},
	serialize(e, r) {
		return e.type === 0 ? "(new AbortController).signal" : e.type === 1 ? "AbortSignal.abort(" + r.serialize(e.reason) + ")" : "(" + r.serialize(e.controller) + ").signal";
	},
	deserialize(e, r) {
		return e.type === 0 ? new AbortController().signal : e.type === 1 ? AbortSignal.abort(r.deserialize(e.reason)) : r.deserialize(e.controller).controller.signal;
	}
});
_s({
	tag: "seroval-plugins/web/Blob",
	test(e) {
		return typeof Blob == "undefined" ? !1 : e instanceof Blob;
	},
	parse: { async async(e, r) {
		return {
			type: await r.parse(e.type),
			buffer: await r.parse(await e.arrayBuffer())
		};
	} },
	serialize(e, r) {
		return "new Blob([" + r.serialize(e.buffer) + "],{type:" + r.serialize(e.type) + "})";
	},
	deserialize(e, r) {
		return new Blob([r.deserialize(e.buffer)], { type: r.deserialize(e.type) });
	}
});
function f(e) {
	return {
		detail: e.detail,
		bubbles: e.bubbles,
		cancelable: e.cancelable,
		composed: e.composed
	};
}
_s({
	tag: "seroval-plugins/web/CustomEvent",
	test(e) {
		return typeof CustomEvent == "undefined" ? !1 : e instanceof CustomEvent;
	},
	parse: {
		sync(e, r) {
			return {
				type: r.parse(e.type),
				options: r.parse(f(e))
			};
		},
		async async(e, r) {
			return {
				type: await r.parse(e.type),
				options: await r.parse(f(e))
			};
		},
		stream(e, r) {
			return {
				type: r.parse(e.type),
				options: r.parse(f(e))
			};
		}
	},
	serialize(e, r) {
		return "new CustomEvent(" + r.serialize(e.type) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new CustomEvent(r.deserialize(e.type), r.deserialize(e.options));
	}
});
_s({
	tag: "seroval-plugins/web/DOMException",
	test(e) {
		return typeof DOMException == "undefined" ? !1 : e instanceof DOMException;
	},
	parse: {
		sync(e, r) {
			return {
				name: r.parse(e.name),
				message: r.parse(e.message)
			};
		},
		async async(e, r) {
			return {
				name: await r.parse(e.name),
				message: await r.parse(e.message)
			};
		},
		stream(e, r) {
			return {
				name: r.parse(e.name),
				message: r.parse(e.message)
			};
		}
	},
	serialize(e, r) {
		return "new DOMException(" + r.serialize(e.message) + "," + r.serialize(e.name) + ")";
	},
	deserialize(e, r) {
		return new DOMException(r.deserialize(e.message), r.deserialize(e.name));
	}
});
function m(e) {
	return {
		bubbles: e.bubbles,
		cancelable: e.cancelable,
		composed: e.composed
	};
}
_s({
	tag: "seroval-plugins/web/Event",
	test(e) {
		return typeof Event == "undefined" ? !1 : e instanceof Event;
	},
	parse: {
		sync(e, r) {
			return {
				type: r.parse(e.type),
				options: r.parse(m(e))
			};
		},
		async async(e, r) {
			return {
				type: await r.parse(e.type),
				options: await r.parse(m(e))
			};
		},
		stream(e, r) {
			return {
				type: r.parse(e.type),
				options: r.parse(m(e))
			};
		}
	},
	serialize(e, r) {
		return "new Event(" + r.serialize(e.type) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new Event(r.deserialize(e.type), r.deserialize(e.options));
	}
});
var g = _s({
	tag: "seroval-plugins/web/File",
	test(e) {
		return typeof File == "undefined" ? !1 : e instanceof File;
	},
	parse: { async async(e, r) {
		return {
			name: await r.parse(e.name),
			options: await r.parse({
				type: e.type,
				lastModified: e.lastModified
			}),
			buffer: await r.parse(await e.arrayBuffer())
		};
	} },
	serialize(e, r) {
		return "new File([" + r.serialize(e.buffer) + "]," + r.serialize(e.name) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new File([r.deserialize(e.buffer)], r.deserialize(e.name), r.deserialize(e.options));
	}
});
function y(e) {
	let r = [];
	return e.forEach((a, t) => {
		r.push([t, a]);
	}), r;
}
var i = {}, S = (e, r = new FormData(), a = 0, t = e.length, n) => {
	for (; a < t; a++) n = e[a], r.append(n[0], n[1]);
	return r;
};
_s({
	tag: "seroval-plugins/web/FormData",
	extends: [g, _s({
		tag: "seroval-plugins/web/FormDataFactory",
		test(e) {
			return e === i;
		},
		parse: {
			sync() {},
			async async() {
				return await Promise.resolve(void 0);
			},
			stream() {}
		},
		serialize() {
			return S.toString();
		},
		deserialize() {
			return i;
		}
	})],
	test(e) {
		return typeof FormData == "undefined" ? !1 : e instanceof FormData;
	},
	parse: {
		sync(e, r) {
			return {
				factory: r.parse(i),
				entries: r.parse(y(e))
			};
		},
		async async(e, r) {
			return {
				factory: await r.parse(i),
				entries: await r.parse(y(e))
			};
		},
		stream(e, r) {
			return {
				factory: r.parse(i),
				entries: r.parse(y(e))
			};
		}
	},
	serialize(e, r) {
		return "(" + r.serialize(e.factory) + ")(" + r.serialize(e.entries) + ")";
	},
	deserialize(e, r) {
		return S(r.deserialize(e.entries));
	}
});
function c(e) {
	let r = [];
	return e.forEach((a, t) => {
		r.push([t, a]);
	}), r;
}
var l = _s({
	tag: "seroval-plugins/web/Headers",
	test(e) {
		return typeof Headers == "undefined" ? !1 : e instanceof Headers;
	},
	parse: {
		sync(e, r) {
			return r.parse(c(e));
		},
		async async(e, r) {
			return await r.parse(c(e));
		},
		stream(e, r) {
			return r.parse(c(e));
		}
	},
	serialize(e, r) {
		return "new Headers(" + r.serialize(e) + ")";
	},
	deserialize(e, r) {
		return new Headers(r.deserialize(e));
	}
});
_s({
	tag: "seroval-plugins/web/ImageData",
	test(e) {
		return typeof ImageData == "undefined" ? !1 : e instanceof ImageData;
	},
	parse: {
		sync(e, r) {
			return {
				data: r.parse(e.data),
				width: r.parse(e.width),
				height: r.parse(e.height),
				options: r.parse({ colorSpace: e.colorSpace })
			};
		},
		async async(e, r) {
			return {
				data: await r.parse(e.data),
				width: await r.parse(e.width),
				height: await r.parse(e.height),
				options: await r.parse({ colorSpace: e.colorSpace })
			};
		},
		stream(e, r) {
			return {
				data: r.parse(e.data),
				width: r.parse(e.width),
				height: r.parse(e.height),
				options: r.parse({ colorSpace: e.colorSpace })
			};
		}
	},
	serialize(e, r) {
		return "new ImageData(" + r.serialize(e.data) + "," + r.serialize(e.width) + "," + r.serialize(e.height) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new ImageData(r.deserialize(e.data), r.deserialize(e.width), r.deserialize(e.height), r.deserialize(e.options));
	}
});
var p = {}, P = (e) => new ReadableStream({ start: (r) => {
	e.on({
		next: (a) => {
			try {
				r.enqueue(a);
			} catch (t) {}
		},
		throw: (a) => {
			r.error(a);
		},
		return: () => {
			try {
				r.close();
			} catch (a) {}
		}
	});
} }), ee = _s({
	tag: "seroval-plugins/web/ReadableStreamFactory",
	test(e) {
		return e === p;
	},
	parse: {
		sync() {},
		async async() {
			return await Promise.resolve(void 0);
		},
		stream() {}
	},
	serialize() {
		return P.toString();
	},
	deserialize() {
		return p;
	}
});
function w(e) {
	let r = Q(), a = e.getReader();
	async function t() {
		try {
			let n = await a.read();
			n.done ? r.return(n.value) : (r.next(n.value), await t());
		} catch (n) {
			r.throw(n);
		}
	}
	return t().catch(() => {}), r;
}
var u = _s({
	tag: "seroval/plugins/web/ReadableStream",
	extends: [ee],
	test(e) {
		return typeof ReadableStream == "undefined" ? !1 : e instanceof ReadableStream;
	},
	parse: {
		sync(e, r) {
			return {
				factory: r.parse(p),
				stream: r.parse(Q())
			};
		},
		async async(e, r) {
			return {
				factory: await r.parse(p),
				stream: await r.parse(w(e))
			};
		},
		stream(e, r) {
			return {
				factory: r.parse(p),
				stream: r.parse(w(e))
			};
		}
	},
	serialize(e, r) {
		return "(" + r.serialize(e.factory) + ")(" + r.serialize(e.stream) + ")";
	},
	deserialize(e, r) {
		return P(r.deserialize(e.stream));
	}
});
function R(e, r) {
	return {
		body: r,
		cache: e.cache,
		credentials: e.credentials,
		headers: e.headers,
		integrity: e.integrity,
		keepalive: e.keepalive,
		method: e.method,
		mode: e.mode,
		redirect: e.redirect,
		referrer: e.referrer,
		referrerPolicy: e.referrerPolicy
	};
}
_s({
	tag: "seroval-plugins/web/Request",
	extends: [u, l],
	test(e) {
		return typeof Request == "undefined" ? !1 : e instanceof Request;
	},
	parse: {
		async async(e, r) {
			return {
				url: await r.parse(e.url),
				options: await r.parse(R(e, e.body && !e.bodyUsed ? await e.clone().arrayBuffer() : null))
			};
		},
		stream(e, r) {
			return {
				url: r.parse(e.url),
				options: r.parse(R(e, e.body && !e.bodyUsed ? e.clone().body : null))
			};
		}
	},
	serialize(e, r) {
		return "new Request(" + r.serialize(e.url) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new Request(r.deserialize(e.url), r.deserialize(e.options));
	}
});
function N(e) {
	return {
		headers: e.headers,
		status: e.status,
		statusText: e.statusText
	};
}
_s({
	tag: "seroval-plugins/web/Response",
	extends: [u, l],
	test(e) {
		return typeof Response == "undefined" ? !1 : e instanceof Response;
	},
	parse: {
		async async(e, r) {
			return {
				body: await r.parse(e.body && !e.bodyUsed ? await e.clone().arrayBuffer() : null),
				options: await r.parse(N(e))
			};
		},
		stream(e, r) {
			return {
				body: r.parse(e.body && !e.bodyUsed ? e.clone().body : null),
				options: r.parse(N(e))
			};
		}
	},
	serialize(e, r) {
		return "new Response(" + r.serialize(e.body) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new Response(r.deserialize(e.body), r.deserialize(e.options));
	}
});
_s({
	tag: "seroval-plugins/web/URL",
	test(e) {
		return typeof URL == "undefined" ? !1 : e instanceof URL;
	},
	parse: {
		sync(e, r) {
			return r.parse(e.href);
		},
		async async(e, r) {
			return await r.parse(e.href);
		},
		stream(e, r) {
			return r.parse(e.href);
		}
	},
	serialize(e, r) {
		return "new URL(" + r.serialize(e) + ")";
	},
	deserialize(e, r) {
		return new URL(r.deserialize(e));
	}
});
_s({
	tag: "seroval-plugins/web/URLSearchParams",
	test(e) {
		return typeof URLSearchParams == "undefined" ? !1 : e instanceof URLSearchParams;
	},
	parse: {
		sync(e, r) {
			return r.parse(e.toString());
		},
		async async(e, r) {
			return await r.parse(e.toString());
		},
		stream(e, r) {
			return r.parse(e.toString());
		}
	},
	serialize(e, r) {
		return "new URLSearchParams(" + r.serialize(e) + ")";
	},
	deserialize(e, r) {
		return new URLSearchParams(r.deserialize(e));
	}
});
var defaultSerovalPlugins = [/* @__PURE__ */ _s({
	tag: "$TSR/Error",
	test(value) {
		return value instanceof Error;
	},
	parse: {
		sync(value, ctx) {
			return { message: ctx.parse(value.message) };
		},
		async async(value, ctx) {
			return { message: await ctx.parse(value.message) };
		},
		stream(value, ctx) {
			return { message: ctx.parse(value.message) };
		}
	},
	serialize(node, ctx) {
		return "new Error(" + ctx.serialize(node.message) + ")";
	},
	deserialize(node, ctx) {
		return new Error(ctx.deserialize(node.message));
	}
}), u];
function splitSetCookieString(cookiesString) {
	if (Array.isArray(cookiesString)) return cookiesString.flatMap((c$2) => splitSetCookieString(c$2));
	if (typeof cookiesString !== "string") return [];
	const cookiesStrings = [];
	let pos = 0;
	let start;
	let ch;
	let lastComma;
	let nextStart;
	let cookiesSeparatorFound;
	const skipWhitespace = () => {
		while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) pos += 1;
		return pos < cookiesString.length;
	};
	const notSpecialChar = () => {
		ch = cookiesString.charAt(pos);
		return ch !== "=" && ch !== ";" && ch !== ",";
	};
	while (pos < cookiesString.length) {
		start = pos;
		cookiesSeparatorFound = false;
		while (skipWhitespace()) {
			ch = cookiesString.charAt(pos);
			if (ch === ",") {
				lastComma = pos;
				pos += 1;
				skipWhitespace();
				nextStart = pos;
				while (pos < cookiesString.length && notSpecialChar()) pos += 1;
				if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
					cookiesSeparatorFound = true;
					pos = nextStart;
					cookiesStrings.push(cookiesString.slice(start, lastComma));
					start = pos;
				} else pos = lastComma + 1;
			} else pos += 1;
		}
		if (!cookiesSeparatorFound || pos >= cookiesString.length) cookiesStrings.push(cookiesString.slice(start));
	}
	return cookiesStrings;
}
function toHeadersInstance(init) {
	if (init instanceof Headers) return new Headers(init);
	else if (Array.isArray(init)) return new Headers(init);
	else if (typeof init === "object") return new Headers(init);
	else return new Headers();
}
function mergeHeaders(...headers) {
	return headers.reduce((acc, header) => {
		const headersInstance = toHeadersInstance(header);
		for (const [key, value] of headersInstance.entries()) if (key === "set-cookie") splitSetCookieString(value).forEach((cookie) => acc.append("set-cookie", cookie));
		else acc.set(key, value);
		return acc;
	}, new Headers());
}
var minifiedTsrBootStrapScript = "self.$_TSR={h(){this.hydrated=!0,this.c()},e(){this.streamEnded=!0,this.c()},c(){this.hydrated&&this.streamEnded&&(delete self.$_TSR,delete self.$R.tsr)},p(e){this.initialized?e():this.buffer.push(e)},buffer:[]};\n";
var SCOPE_ID = "tsr";
function dehydrateMatch(match) {
	const dehydratedMatch = {
		i: match.id,
		u: match.updatedAt,
		s: match.status
	};
	for (const [key, shorthand] of [
		["__beforeLoadContext", "b"],
		["loaderData", "l"],
		["error", "e"],
		["ssr", "ssr"]
	]) if (match[key] !== void 0) dehydratedMatch[shorthand] = match[key];
	return dehydratedMatch;
}
var INITIAL_SCRIPTS = [rn(SCOPE_ID), minifiedTsrBootStrapScript];
var ScriptBuffer = class {
	constructor(router) {
		this._queue = [...INITIAL_SCRIPTS];
		this._scriptBarrierLifted = false;
		this._cleanedUp = false;
		this.router = router;
	}
	enqueue(script) {
		if (this._cleanedUp) return;
		if (this._scriptBarrierLifted && this._queue.length === 0) queueMicrotask(() => {
			this.injectBufferedScripts();
		});
		this._queue.push(script);
	}
	liftBarrier() {
		if (this._scriptBarrierLifted || this._cleanedUp) return;
		this._scriptBarrierLifted = true;
		if (this._queue.length > 0) queueMicrotask(() => {
			this.injectBufferedScripts();
		});
	}
	takeAll() {
		const bufferedScripts = this._queue;
		this._queue = [];
		if (bufferedScripts.length === 0) return;
		bufferedScripts.push(`document.currentScript.remove()`);
		return bufferedScripts.join(";");
	}
	injectBufferedScripts() {
		if (this._cleanedUp) return;
		const scriptsToInject = this.takeAll();
		if (scriptsToInject && this.router?.serverSsr) this.router.serverSsr.injectScript(() => scriptsToInject);
	}
	cleanup() {
		this._cleanedUp = true;
		this._queue = [];
		this.router = void 0;
	}
};
function attachRouterServerSsrUtils({ router, manifest }) {
	router.ssr = { manifest };
	let _dehydrated = false;
	const listeners = [];
	const scriptBuffer = new ScriptBuffer(router);
	router.serverSsr = {
		injectedHtml: [],
		injectHtml: (getHtml) => {
			const promise = Promise.resolve().then(getHtml);
			router.serverSsr.injectedHtml.push(promise);
			router.emit({
				type: "onInjectedHtml",
				promise
			});
			return promise.then(() => {});
		},
		injectScript: (getScript) => {
			return router.serverSsr.injectHtml(async () => {
				const script = await getScript();
				if (!script) return "";
				return `<script${router.options.ssr?.nonce ? ` nonce='${router.options.ssr.nonce}'` : ""}>${script}<\/script>`;
			});
		},
		dehydrate: async () => {
			invariant(!_dehydrated, "router is already dehydrated!");
			let matchesToDehydrate = router.state.matches;
			if (router.isShell()) matchesToDehydrate = matchesToDehydrate.slice(0, 1);
			const matches = matchesToDehydrate.map(dehydrateMatch);
			let manifestToDehydrate = void 0;
			if (manifest) {
				const currentRouteIds = new Set(router.state.matches.map((k$1) => k$1.routeId));
				manifestToDehydrate = { routes: Object.fromEntries(Object.entries(manifest.routes).flatMap(([routeId, routeManifest]) => {
					if (currentRouteIds.has(routeId)) return [[routeId, routeManifest]];
					else if (routeManifest.assets && routeManifest.assets.length > 0) return [[routeId, { assets: routeManifest.assets }]];
					return [];
				})) };
			}
			const dehydratedRouter = {
				manifest: manifestToDehydrate,
				matches
			};
			const lastMatchId = matchesToDehydrate[matchesToDehydrate.length - 1]?.id;
			if (lastMatchId) dehydratedRouter.lastMatchId = lastMatchId;
			const dehydratedData = await router.options.dehydrate?.();
			if (dehydratedData) dehydratedRouter.dehydratedData = dehydratedData;
			_dehydrated = true;
			const p$2 = createControlledPromise();
			const trackPlugins = { didRun: false };
			const plugins = router.options.serializationAdapters?.map((t) => makeSsrSerovalPlugin(t, trackPlugins)) ?? [];
			Xt(dehydratedRouter, {
				refs: /* @__PURE__ */ new Map(),
				plugins: [...plugins, ...defaultSerovalPlugins],
				onSerialize: (data, initial) => {
					let serialized = initial ? GLOBAL_TSR + ".router=" + data : data;
					if (trackPlugins.didRun) serialized = GLOBAL_TSR + ".p(()=>" + serialized + ")";
					scriptBuffer.enqueue(serialized);
				},
				scopeId: SCOPE_ID,
				onDone: () => {
					scriptBuffer.enqueue(GLOBAL_TSR + ".e()");
					p$2.resolve("");
				},
				onError: (err) => p$2.reject(err)
			});
			router.serverSsr.injectHtml(() => p$2);
		},
		isDehydrated() {
			return _dehydrated;
		},
		onRenderFinished: (listener) => listeners.push(listener),
		setRenderFinished: () => {
			listeners.forEach((l$1) => l$1());
			listeners.length = 0;
			scriptBuffer.liftBarrier();
		},
		takeBufferedScripts() {
			const scripts = scriptBuffer.takeAll();
			return {
				tag: "script",
				attrs: {
					nonce: router.options.ssr?.nonce,
					className: "$tsr",
					id: TSR_SCRIPT_BARRIER_ID
				},
				children: scripts
			};
		},
		liftScriptBarrier() {
			scriptBuffer.liftBarrier();
		},
		cleanup() {
			if (!router.serverSsr) return;
			listeners.length = 0;
			scriptBuffer.cleanup();
			router.serverSsr.injectedHtml = [];
			router.serverSsr = void 0;
		}
	};
}
function getOrigin(request) {
	const originHeader = request.headers.get("Origin");
	if (originHeader) try {
		new URL(originHeader);
		return originHeader;
	} catch {}
	try {
		return new URL(request.url).origin;
	} catch {}
	return "http://localhost";
}
function defineHandlerCallback(handler) {
	return handler;
}
function json(payload, init) {
	return new Response(JSON.stringify(payload), {
		...init,
		headers: mergeHeaders({ "content-type": "application/json" }, init?.headers)
	});
}
export { mergeHeaders as a, makeSerovalPlugin as c, ki as d, getOrigin as i, Xi as l, defineHandlerCallback as n, defaultSerovalPlugins as o, attachRouterServerSsrUtils as r, createSerializationAdapter as s, json as t, _i as u };
