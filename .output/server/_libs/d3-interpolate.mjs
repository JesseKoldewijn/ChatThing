import { n as rgb, t as color } from "./d3-color.mjs";
function basis(t1, v0, v1, v2, v3) {
	var t2 = t1 * t1, t3 = t2 * t1;
	return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function basis_default(values) {
	var n = values.length - 1;
	return function(t) {
		var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
		return basis((t - i / n) * n, v0, v1, v2, v3);
	};
}
function basisClosed_default(values) {
	var n = values.length;
	return function(t) {
		var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
		return basis((t - i / n) * n, v0, v1, v2, v3);
	};
}
var constant_default = (x) => () => x;
function linear(a, d) {
	return function(t) {
		return a + t * d;
	};
}
function exponential(a, b, y) {
	return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
		return Math.pow(a + t * b, y);
	};
}
function gamma(y) {
	return (y = +y) === 1 ? nogamma : function(a, b) {
		return b - a ? exponential(a, b, y) : constant_default(isNaN(a) ? b : a);
	};
}
function nogamma(a, b) {
	var d = b - a;
	return d ? linear(a, d) : constant_default(isNaN(a) ? b : a);
}
var rgb_default = (function rgbGamma(y) {
	var color$1 = gamma(y);
	function rgb$1(start, end) {
		var r = color$1((start = rgb(start)).r, (end = rgb(end)).r), g = color$1(start.g, end.g), b = color$1(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
		return function(t) {
			start.r = r(t);
			start.g = g(t);
			start.b = b(t);
			start.opacity = opacity(t);
			return start + "";
		};
	}
	rgb$1.gamma = rgbGamma;
	return rgb$1;
})(1);
function rgbSpline(spline) {
	return function(colors) {
		var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color$1;
		for (i = 0; i < n; ++i) {
			color$1 = rgb(colors[i]);
			r[i] = color$1.r || 0;
			g[i] = color$1.g || 0;
			b[i] = color$1.b || 0;
		}
		r = spline(r);
		g = spline(g);
		b = spline(b);
		color$1.opacity = 1;
		return function(t) {
			color$1.r = r(t);
			color$1.g = g(t);
			color$1.b = b(t);
			return color$1 + "";
		};
	};
}
rgbSpline(basis_default);
rgbSpline(basisClosed_default);
function numberArray_default(a, b) {
	if (!b) b = [];
	var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
	return function(t) {
		for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
		return c;
	};
}
function isNumberArray(x) {
	return ArrayBuffer.isView(x) && !(x instanceof DataView);
}
function genericArray(a, b) {
	var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
	for (i = 0; i < na; ++i) x[i] = value_default(a[i], b[i]);
	for (; i < nb; ++i) c[i] = b[i];
	return function(t) {
		for (i = 0; i < na; ++i) c[i] = x[i](t);
		return c;
	};
}
function date_default(a, b) {
	var d = /* @__PURE__ */ new Date();
	return a = +a, b = +b, function(t) {
		return d.setTime(a * (1 - t) + b * t), d;
	};
}
function number_default(a, b) {
	return a = +a, b = +b, function(t) {
		return a * (1 - t) + b * t;
	};
}
function object_default(a, b) {
	var i = {}, c = {}, k;
	if (a === null || typeof a !== "object") a = {};
	if (b === null || typeof b !== "object") b = {};
	for (k in b) if (k in a) i[k] = value_default(a[k], b[k]);
	else c[k] = b[k];
	return function(t) {
		for (k in i) c[k] = i[k](t);
		return c;
	};
}
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
function zero(b) {
	return function() {
		return b;
	};
}
function one(b) {
	return function(t) {
		return b(t) + "";
	};
}
function string_default(a, b) {
	var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
	a = a + "", b = b + "";
	while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
		if ((bs = bm.index) > bi) {
			bs = b.slice(bi, bs);
			if (s[i]) s[i] += bs;
			else s[++i] = bs;
		}
		if ((am = am[0]) === (bm = bm[0])) if (s[i]) s[i] += bm;
		else s[++i] = bm;
		else {
			s[++i] = null;
			q.push({
				i,
				x: number_default(am, bm)
			});
		}
		bi = reB.lastIndex;
	}
	if (bi < b.length) {
		bs = b.slice(bi);
		if (s[i]) s[i] += bs;
		else s[++i] = bs;
	}
	return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
		for (var i$1 = 0, o; i$1 < b; ++i$1) s[(o = q[i$1]).i] = o.x(t);
		return s.join("");
	});
}
function value_default(a, b) {
	var t = typeof b, c;
	return b == null || t === "boolean" ? constant_default(b) : (t === "number" ? number_default : t === "string" ? (c = color(b)) ? (b = c, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default)(a, b);
}
function round_default(a, b) {
	return a = +a, b = +b, function(t) {
		return Math.round(a * (1 - t) + b * t);
	};
}
function piecewise(interpolate, values) {
	if (values === void 0) values = interpolate, interpolate = value_default;
	var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
	while (i < n) I[i] = interpolate(v, v = values[++i]);
	return function(t) {
		var i$1 = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
		return I[i$1](t - i$1);
	};
}
export { number_default as i, round_default as n, value_default as r, piecewise as t };
