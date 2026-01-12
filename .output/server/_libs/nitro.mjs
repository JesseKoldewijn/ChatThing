import { a as toEventHandler, c as NodeRequest, i as defineLazyEventHandler, l as serve, n as HTTPError, o as toRequest, r as defineHandler, t as H3Core, u as NodeResponse } from "./h3.mjs";
import { t as nodeAdapter } from "./crossws.mjs";
import { t as HookableCore } from "./hookable.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod$1) => mod$1.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("../_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
var prod_default = errorHandler;
function defaultHandler(error, event, opts) {
	const isSensitive = error.unhandled;
	const status = error.status || 500;
	const url = event.url || new URL(event.req.url);
	if (status === 404) {
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			statusText: "Found",
			headers: { location: `${baseURL}${url.pathname.slice(1)}${url.search}` },
			body: `Redirecting...`
		};
	}
	if (isSensitive && !opts?.silent) {
		const tags = [error.unhandled && "[unhandled]"].filter(Boolean).join(" ");
		console.error(`[request error] ${tags} [${event.req.method}] ${url}\n`, error);
	}
	const headers$1 = {
		"content-type": "application/json",
		"x-content-type-options": "nosniff",
		"x-frame-options": "DENY",
		"referrer-policy": "no-referrer",
		"content-security-policy": "script-src 'none'; frame-ancestors 'none';"
	};
	if (status === 404 || !event.res.headers.has("cache-control")) headers$1["cache-control"] = "no-cache";
	const body = {
		error: true,
		url: url.href,
		status,
		statusText: error.statusText,
		message: isSensitive ? "Server Error" : error.message,
		data: isSensitive ? void 0 : error.data
	};
	return {
		status,
		statusText: error.statusText,
		headers: headers$1,
		body
	};
}
var errorHandlers = [prod_default];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error$1) {
		console.error(error$1);
	}
}
String.fromCharCode;
var ENC_SLASH_RE = /%2f/gi;
function decode(text = "") {
	try {
		return decodeURIComponent("" + text);
	} catch {
		return "" + text;
	}
}
function decodePath(text) {
	return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
var TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
var JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasTrailingSlash(input = "", respectQueryAndFragment) {
	if (!respectQueryAndFragment) return input.endsWith("/");
	return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
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
function withTrailingSlash(input = "", respectQueryAndFragment) {
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
function isNonEmptyURL(url) {
	return url && url !== "/";
}
function joinURL(base, ...input) {
	let url = base || "";
	for (const segment of input.filter((url2) => isNonEmptyURL(url2))) if (url) {
		const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
		url = withTrailingSlash(url) + _segment;
	} else url = segment;
	return url;
}
const headers = ((m) => function headersRouteRule(event) {
	for (const [key$1, value] of Object.entries(m.options || {})) event.res.headers.set(key$1, value);
});
var public_assets_data_default = {
	"/manifest.webmanifest": {
		"type": "application/manifest+json",
		"etag": "\"3a3-qupZ0QjHCVlX9Ig/Qkjj6/DZtHA\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 931,
		"path": "../public/manifest.webmanifest"
	},
	"/assets/bash-BGPkqQAW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1855-qtlWz0b13g8ASCWpHA5gk2R1zBo\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 6229,
		"path": "../public/assets/bash-BGPkqQAW.js"
	},
	"/assets/c-CVGr2Tcm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41-rV+IM2DxtbyJYwKU+42o99Lzm8E\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 65,
		"path": "../public/assets/c-CVGr2Tcm.js"
	},
	"/assets/c-M8ef0cMk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7aa-i/wwDSdZ07RiDSqK6ec8mGeUwEo\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 1962,
		"path": "../public/assets/c-M8ef0cMk.js"
	},
	"/assets/clike-CHmJd1N7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"300-BKFvkGXetwUCs8S6GZjb9Sm1EBQ\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 768,
		"path": "../public/assets/clike-CHmJd1N7.js"
	},
	"/assets/cpp-DpPs6N4Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa4-7EJZEFTRRsRq+FQW9qFpikNefqk\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 2724,
		"path": "../public/assets/cpp-DpPs6N4Z.js"
	},
	"/assets/csharp-DwkewnxN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1963-59xQWLvbrHuy2LltSBq3IxWABNw\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 6499,
		"path": "../public/assets/csharp-DwkewnxN.js"
	},
	"/assets/css-ZZLLFh_G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"51d-EyOdpsp2LkReFPW0jbsLS/j3VYc\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 1309,
		"path": "../public/assets/css-ZZLLFh_G.js"
	},
	"/assets/globals-DLrntbnw.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"15b99-pufY3YzIaTGBjlnG0Adg/i76a/0\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 88985,
		"path": "../public/assets/globals-DLrntbnw.css"
	},
	"/assets/go-CO49qUQh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"43b-jrkuz1t52UD/uCjs4p79fI5WBUQ\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 1083,
		"path": "../public/assets/go-CO49qUQh.js"
	},
	"/assets/index.dom-Cj25H9rn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"491f-fWZlEZD1ULDRY5h5AvX7BB3Th34\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 18719,
		"path": "../public/assets/index.dom-Cj25H9rn.js"
	},
	"/assets/java-CJyPQ1AW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b50-9/UXGJ9GLXZjmVlZjOH6e4yoEOs\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 2896,
		"path": "../public/assets/java-CJyPQ1AW.js"
	},
	"/assets/javascript-BBlW386G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1252-ffHPlTQh8Ykst1Uixfg//6FSadc\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 4690,
		"path": "../public/assets/javascript-BBlW386G.js"
	},
	"/assets/javascript-DWc9ulXX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a-6nkz2tOYz97/UPKyfjkGIOUdukk\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 74,
		"path": "../public/assets/javascript-DWc9ulXX.js"
	},
	"/assets/json-DEvi8Pda.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20f-+PDL4sktaJvUpjl6bK/ZLPMtwZI\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 527,
		"path": "../public/assets/json-DEvi8Pda.js"
	},
	"/assets/jsx-CVfZuVxJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"43-7J5c6Avh8lxt+byO6LqQE9ypTEo\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 67,
		"path": "../public/assets/jsx-CVfZuVxJ.js"
	},
	"/assets/jsx-DUP5TFHR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a12-dJxysuafXn1pKngGEENibG3cvDA\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 2578,
		"path": "../public/assets/jsx-DUP5TFHR.js"
	},
	"/assets/markdown-B9saDnkq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f9-GiEBWwDKg7B3Gdt0JYW9mOoYvEg\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 5113,
		"path": "../public/assets/markdown-B9saDnkq.js"
	},
	"/assets/markup-DQ1bfZmf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2a-31yZxv/IS9JA5B1qnhEpocI48iw\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 2858,
		"path": "../public/assets/markup-DQ1bfZmf.js"
	},
	"/assets/models-xQS_I0xo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c22-8Xjt/3P3ZnkBBipZ83BY1gInHSA\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 3106,
		"path": "../public/assets/models-xQS_I0xo.js"
	},
	"/assets/prism-light-BjYkyFLE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5e27-V3VJ48b+sl48juMxDNwv6fYgOLM\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 24103,
		"path": "../public/assets/prism-light-BjYkyFLE.js"
	},
	"/assets/python-Di4TBFnh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"880-YOKrzuOaeZQ9XMlMKiMT1fDOh/w\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 2176,
		"path": "../public/assets/python-Di4TBFnh.js"
	},
	"/assets/prism--TMwnHrX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2509f-bB83XHpdUoKBp/IRfAWGy20jZ+s\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 151711,
		"path": "../public/assets/prism--TMwnHrX.js"
	},
	"/assets/routes-SDABV1xw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"383e1-g9EHVfMvKWwarP8cPY6D1y+FY4o\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 230369,
		"path": "../public/assets/routes-SDABV1xw.js"
	},
	"/assets/main-CUcn2n7F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12048e-+xQRiqoKAADJqXUKyJLbCz69Tw4\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 1180814,
		"path": "../public/assets/main-CUcn2n7F.js"
	},
	"/assets/rust-CBkxKf1o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f6-l7exFmfzrDc5MFYASiyvMtZ72jI\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 2550,
		"path": "../public/assets/rust-CBkxKf1o.js"
	},
	"/assets/select-CR1IElhE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11720-InrYS1idTpLmU/zdzbLRiBrFDYU\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 71456,
		"path": "../public/assets/select-CR1IElhE.js"
	},
	"/assets/skeleton-DaA8thGq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"326-akyFPmFeKn+4TGxAX20di/Jn+yU\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 806,
		"path": "../public/assets/skeleton-DaA8thGq.js"
	},
	"/assets/sql-CAz9HED1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d05-w/Cu+MMcrWCswfmhQ/RT1I6atbM\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 3333,
		"path": "../public/assets/sql-CAz9HED1.js"
	},
	"/assets/tooltip-BZT7C-44.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26f9-u1ItC98HICOdzEW2KyeavBOhWk4\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 9977,
		"path": "../public/assets/tooltip-BZT7C-44.js"
	},
	"/assets/tsx-DmTF_LKB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e6-Rqm9F6ZsQAElNtWGBv6wzjc7vIg\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 486,
		"path": "../public/assets/tsx-DmTF_LKB.js"
	},
	"/assets/settings-uAxPleKE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4a5-327pmKxWL95bTeTvwOFxZ2Rxwso\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 50341,
		"path": "../public/assets/settings-uAxPleKE.js"
	},
	"/assets/typescript-BHarIJNI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"58a-edkSD2CgSWeNbT5k2m67w0NYaS8\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 1418,
		"path": "../public/assets/typescript-BHarIJNI.js"
	},
	"/assets/typescript-DGM20gpY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a-6YiPCdtLPySQCYq1pTS7tgQvm5M\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 74,
		"path": "../public/assets/typescript-DGM20gpY.js"
	},
	"/assets/yaml-C41up7L8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"809-3CdaQjm9AVtcmvowm6+7vzAbVJk\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 2057,
		"path": "../public/assets/yaml-C41up7L8.js"
	},
	"/icons/icon-128x128.svg": {
		"type": "image/svg+xml",
		"etag": "\"4b7-CJjuLmi2sIqsbYVc8fz6xhCjvyI\"",
		"mtime": "2026-01-12T01:51:59.778Z",
		"size": 1207,
		"path": "../public/icons/icon-128x128.svg"
	},
	"/assets/usage-CHkIbZSF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f711-HRpx+UGtwtlRHuIAs0FSHF0YqsI\"",
		"mtime": "2026-01-12T01:52:00.166Z",
		"size": 390929,
		"path": "../public/assets/usage-CHkIbZSF.js"
	},
	"/icons/icon-144x144.svg": {
		"type": "image/svg+xml",
		"etag": "\"4ba-w+y1jfFqLQx5A5XAPkg7X7dhQac\"",
		"mtime": "2026-01-12T01:51:59.778Z",
		"size": 1210,
		"path": "../public/icons/icon-144x144.svg"
	},
	"/icons/icon-152x152.svg": {
		"type": "image/svg+xml",
		"etag": "\"4db-RgylKe01L7mg/ScE5Pld+eyXK78\"",
		"mtime": "2026-01-12T01:51:59.778Z",
		"size": 1243,
		"path": "../public/icons/icon-152x152.svg"
	},
	"/icons/icon-192x192.svg": {
		"type": "image/svg+xml",
		"etag": "\"4d2-vKcikhyn5uGzQ33XQpBjlvI2OjU\"",
		"mtime": "2026-01-12T01:51:59.778Z",
		"size": 1234,
		"path": "../public/icons/icon-192x192.svg"
	},
	"/icons/icon-384x384.svg": {
		"type": "image/svg+xml",
		"etag": "\"4da-tshxduUz+25RTmZc8gRe7EJFfUk\"",
		"mtime": "2026-01-12T01:51:59.778Z",
		"size": 1242,
		"path": "../public/icons/icon-384x384.svg"
	},
	"/icons/icon-512x512.svg": {
		"type": "image/svg+xml",
		"etag": "\"4c3-ENZbReHrysZjANizhqQWjTEYfGY\"",
		"mtime": "2026-01-12T01:51:59.778Z",
		"size": 1219,
		"path": "../public/icons/icon-512x512.svg"
	},
	"/icons/icon-72x72.svg": {
		"type": "image/svg+xml",
		"etag": "\"4b0-FRjnMG1ZmEGKld7+5xnFDD2bSdY\"",
		"mtime": "2026-01-12T01:51:59.778Z",
		"size": 1200,
		"path": "../public/icons/icon-72x72.svg"
	},
	"/icons/icon-96x96.svg": {
		"type": "image/svg+xml",
		"etag": "\"4c7-/FcBgzcYSMTJFeC4luKOgfqUypY\"",
		"mtime": "2026-01-12T01:51:59.778Z",
		"size": 1223,
		"path": "../public/icons/icon-96x96.svg"
	},
	"/icons/icon-maskable-192x192.svg": {
		"type": "image/svg+xml",
		"etag": "\"4d0-W5hlCAg43NhmAyxqHgEz18nIi3E\"",
		"mtime": "2026-01-12T01:51:59.778Z",
		"size": 1232,
		"path": "../public/icons/icon-maskable-192x192.svg"
	},
	"/icons/icon-maskable-512x512.svg": {
		"type": "image/svg+xml",
		"etag": "\"4d0-MweRZ9uIgR3YNN2hNaCBlb/LG1o\"",
		"mtime": "2026-01-12T01:51:59.778Z",
		"size": 1232,
		"path": "../public/icons/icon-maskable-512x512.svg"
	}
};
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
var METHODS = new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r$1 = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		s.length - 1;
		if (s[1] === "assets") r$1.unshift({
			data: $0,
			params: { "_": s.slice(2).join("/") }
		});
		return r$1;
	};
})();
var _lazy_lCr4qL = defineLazyEventHandler(() => import("../_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_lCr4qL
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
const globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function createNitroApp() {
	const hooks = void 0;
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		{
			const routeRules = getRouteRules(method, pathname);
			event.context.routeRules = routeRules?.routeRules;
			if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		}
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	for (const rule of Object.values(routeRules)) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
var port = Number.parseInt(process.env.NITRO_PORT || process.env.PORT || "") || 3e3;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch
});
trapUnhandledErrors();
var node_server_default = {};
function fetchViteEnv(viteEnvName, input, init) {
	const viteEnv = (globalThis.__nitro_vite_envs__ || {})[viteEnvName];
	if (!viteEnv) throw HTTPError.status(404);
	return Promise.resolve(viteEnv.fetch(toRequest(input, init)));
}
function ssrRenderer({ req }) {
	return fetchViteEnv("ssr", req);
}
export { node_server_default as n, ssrRenderer as t };
