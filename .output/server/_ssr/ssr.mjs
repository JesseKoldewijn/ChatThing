import { s as __toESM } from "../_rolldown.mjs";
import { S as require_jsx_runtime, _ as isResolvedRedirect, a as RouterProvider, b as invariant, g as isRedirect, h as executeRewriteInput, t as renderRouterToStream, v as rootRouteId, y as isNotFound } from "../_libs/@tanstack/react-router.mjs";
import { n as createMemoryHistory } from "../_libs/@tanstack/history.mjs";
import { a as mergeHeaders, c as makeSerovalPlugin, d as ki, i as getOrigin, l as Xi, n as defineHandlerCallback, o as defaultSerovalPlugins, r as attachRouterServerSsrUtils, s as createSerializationAdapter, t as json, u as _i } from "../_libs/@tanstack/router-core.mjs";
import { n as toResponse, t as H3Event } from "../_libs/h3-v2.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function StartServer(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouterProvider, { router: props.router });
}
var defaultStreamHandler = defineHandlerCallback(({ request, router, responseHeaders }) => renderRouterToStream({
	request,
	router,
	responseHeaders,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartServer, { router })
}));
var TSS_FORMDATA_CONTEXT = "__TSS_CONTEXT";
var TSS_SERVER_FUNCTION = Symbol.for("TSS_SERVER_FUNCTION");
var X_TSS_SERIALIZED = "x-tss-serialized";
var X_TSS_RAW_RESPONSE = "x-tss-raw";
var startStorage = new AsyncLocalStorage();
async function runWithStartContext(context, fn) {
	return startStorage.run(context, fn);
}
function getStartContext(opts) {
	const context = startStorage.getStore();
	if (!context && opts?.throwIfNotFound !== false) throw new Error(`No Start context found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
	return context;
}
var getStartOptions = () => getStartContext().startOptions;
function flattenMiddlewares(middlewares) {
	const seen = /* @__PURE__ */ new Set();
	const flattened = [];
	const recurse = (middleware) => {
		middleware.forEach((m) => {
			if (m.options.middleware) recurse(m.options.middleware);
			if (!seen.has(m)) {
				seen.add(m);
				flattened.push(m);
			}
		});
	};
	recurse(middlewares);
	return flattened;
}
function getDefaultSerovalPlugins() {
	return [...(getStartOptions()?.serializationAdapters)?.map(makeSerovalPlugin) ?? [], ...defaultSerovalPlugins];
}
var eventStorage = new AsyncLocalStorage();
function requestHandler(handler) {
	return (request, requestOpts) => {
		const h3Event = new H3Event(request);
		return toResponse(eventStorage.run({ h3Event }, () => handler(request, requestOpts)), h3Event);
	};
}
function getH3Event() {
	const event = eventStorage.getStore();
	if (!event) throw new Error(`No StartEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
	return event.h3Event;
}
function getResponse() {
	return getH3Event()._res;
}
async function getStartManifest() {
	const { tsrStartManifest } = await import("./_tanstack-start-manifest_v-BOTNg857.mjs");
	const startManifest = tsrStartManifest();
	const rootRoute = startManifest.routes[rootRouteId] = startManifest.routes["__root__"] || {};
	rootRoute.assets = rootRoute.assets || [];
	let script = `import('${startManifest.clientEntry}')`;
	rootRoute.assets.push({
		tag: "script",
		attrs: {
			type: "module",
			async: true
		},
		children: script
	});
	return { routes: Object.fromEntries(Object.entries(startManifest.routes).flatMap(([k, v]) => {
		const result = {};
		let hasData = false;
		if (v.preloads && v.preloads.length > 0) {
			result["preloads"] = v.preloads;
			hasData = true;
		}
		if (v.assets && v.assets.length > 0) {
			result["assets"] = v.assets;
			hasData = true;
		}
		if (!hasData) return [];
		return [[k, result]];
	})) };
}
var manifest = {};
async function getServerFnById(id) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = await serverFnInfo.importer();
	if (!fnModule) {
		console.info("serverFnInfo", serverFnInfo);
		throw new Error("Server function module not resolved for " + id);
	}
	const action = fnModule[serverFnInfo.functionName];
	if (!action) {
		console.info("serverFnInfo", serverFnInfo);
		console.info("fnModule", fnModule);
		throw new Error(`Server function module export not resolved for serverFn ID: ${id}`);
	}
	return action;
}
var regex = void 0;
var handleServerAction = async ({ request, context }) => {
	const controller = new AbortController();
	const signal = controller.signal;
	const abort = () => controller.abort();
	request.signal.addEventListener("abort", abort);
	if (regex === void 0) regex = /* @__PURE__ */ new RegExp(`/_serverFn/([^/?#]+)`);
	const method = request.method;
	const url = new URL(request.url, "http://localhost:3000");
	const match = url.pathname.match(regex);
	const serverFnId = match ? match[1] : null;
	const search = Object.fromEntries(url.searchParams.entries());
	const isCreateServerFn = "createServerFn" in search;
	if (typeof serverFnId !== "string") throw new Error("Invalid server action param for serverFnId: " + serverFnId);
	const action = await getServerFnById(serverFnId);
	const formDataContentTypes = ["multipart/form-data", "application/x-www-form-urlencoded"];
	const contentType = request.headers.get("Content-Type");
	const serovalPlugins = getDefaultSerovalPlugins();
	function parsePayload(payload) {
		return Xi(payload, { plugins: serovalPlugins });
	}
	const response = await (async () => {
		try {
			let result = await (async () => {
				if (formDataContentTypes.some((type) => contentType && contentType.includes(type))) {
					invariant(method.toLowerCase() !== "get", "GET requests with FormData payloads are not supported");
					const formData = await request.formData();
					const serializedContext = formData.get(TSS_FORMDATA_CONTEXT);
					formData.delete(TSS_FORMDATA_CONTEXT);
					const params = {
						context,
						data: formData
					};
					if (typeof serializedContext === "string") try {
						const deserializedContext = Xi(JSON.parse(serializedContext), { plugins: serovalPlugins });
						if (typeof deserializedContext === "object" && deserializedContext) params.context = {
							...context,
							...deserializedContext
						};
					} catch {}
					return await action(params, signal);
				}
				if (method.toLowerCase() === "get") {
					invariant(isCreateServerFn, "expected GET request to originate from createServerFn");
					let payload = search.payload;
					payload = payload ? parsePayload(JSON.parse(payload)) : {};
					payload.context = {
						...context,
						...payload.context
					};
					return await action(payload, signal);
				}
				if (method.toLowerCase() !== "post") throw new Error("expected POST method");
				let jsonPayload;
				if (contentType?.includes("application/json")) jsonPayload = await request.json();
				if (isCreateServerFn) {
					const payload = jsonPayload ? parsePayload(jsonPayload) : {};
					payload.context = {
						...payload.context,
						...context
					};
					return await action(payload, signal);
				}
				return await action(...jsonPayload);
			})();
			if (result.result instanceof Response) {
				result.result.headers.set(X_TSS_RAW_RESPONSE, "true");
				return result.result;
			}
			if (!isCreateServerFn) {
				result = result.result;
				if (result instanceof Response) return result;
			}
			if (isNotFound(result)) return isNotFoundResponse(result);
			const response2 = getResponse();
			let nonStreamingBody = void 0;
			if (result !== void 0) {
				let done = false;
				const callbacks = {
					onParse: (value) => {
						nonStreamingBody = value;
					},
					onDone: () => {
						done = true;
					},
					onError: (error) => {
						throw error;
					}
				};
				_i(result, {
					refs: /* @__PURE__ */ new Map(),
					plugins: serovalPlugins,
					onParse(value) {
						callbacks.onParse(value);
					},
					onDone() {
						callbacks.onDone();
					},
					onError: (error) => {
						callbacks.onError(error);
					}
				});
				if (done) return new Response(nonStreamingBody ? JSON.stringify(nonStreamingBody) : void 0, {
					status: response2?.status,
					statusText: response2?.statusText,
					headers: {
						"Content-Type": "application/json",
						[X_TSS_SERIALIZED]: "true"
					}
				});
				const encoder = new TextEncoder();
				const stream = new ReadableStream({ start(controller2) {
					callbacks.onParse = (value) => controller2.enqueue(encoder.encode(JSON.stringify(value) + "\n"));
					callbacks.onDone = () => {
						try {
							controller2.close();
						} catch (error) {
							controller2.error(error);
						}
					};
					callbacks.onError = (error) => controller2.error(error);
					if (nonStreamingBody !== void 0) callbacks.onParse(nonStreamingBody);
				} });
				return new Response(stream, {
					status: response2?.status,
					statusText: response2?.statusText,
					headers: {
						"Content-Type": "application/x-ndjson",
						[X_TSS_SERIALIZED]: "true"
					}
				});
			}
			return new Response(void 0, {
				status: response2?.status,
				statusText: response2?.statusText
			});
		} catch (error) {
			if (error instanceof Response) return error;
			if (isNotFound(error)) return isNotFoundResponse(error);
			console.info();
			console.info("Server Fn Error!");
			console.info();
			console.error(error);
			console.info();
			const serializedError = JSON.stringify(await Promise.resolve(ki(error, {
				refs: /* @__PURE__ */ new Map(),
				plugins: serovalPlugins
			})));
			const response2 = getResponse();
			return new Response(serializedError, {
				status: response2?.status ?? 500,
				statusText: response2?.statusText,
				headers: {
					"Content-Type": "application/json",
					[X_TSS_SERIALIZED]: "true"
				}
			});
		}
	})();
	request.signal.removeEventListener("abort", abort);
	return response;
};
function isNotFoundResponse(error) {
	const { headers, ...rest } = error;
	return new Response(JSON.stringify(rest), {
		status: 404,
		headers: {
			"Content-Type": "application/json",
			...headers || {}
		}
	});
}
var HEADERS = { TSS_SHELL: "X-TSS_SHELL" };
var createServerRpc = (functionId, splitImportFn) => {
	return Object.assign(splitImportFn, {
		functionId,
		[TSS_SERVER_FUNCTION]: true
	});
};
var ServerFunctionSerializationAdapter = createSerializationAdapter({
	key: "$TSS/serverfn",
	test: (v) => {
		if (typeof v !== "function") return false;
		if (!(TSS_SERVER_FUNCTION in v)) return false;
		return !!v[TSS_SERVER_FUNCTION];
	},
	toSerializable: ({ functionId }) => ({ functionId }),
	fromSerializable: ({ functionId }) => {
		const fn = async (opts, signal) => {
			return (await (await getServerFnById(functionId))(opts ?? {}, signal)).result;
		};
		return createServerRpc(functionId, fn);
	}
});
function getStartResponseHeaders(opts) {
	return mergeHeaders({ "Content-Type": "text/html; charset=utf-8" }, ...opts.router.state.matches.map((match) => {
		return match.headers;
	}));
}
function createStartHandler(cb) {
	const ROUTER_BASEPATH = "/";
	let startRoutesManifest = null;
	let startEntry = null;
	let routerEntry = null;
	const getEntries = async () => {
		if (routerEntry === null) routerEntry = await import("./router-CAPXLh23.mjs");
		if (startEntry === null) startEntry = await import("./start-BK7H0vun.mjs");
		return {
			startEntry,
			routerEntry
		};
	};
	const startRequestResolver = async (request, requestOpts) => {
		let router = null;
		let cbWillCleanup = false;
		try {
			const origin = getOrigin(request);
			const url = new URL(request.url);
			const href = url.href.replace(url.origin, "");
			const startOptions = await (await getEntries()).startEntry.startInstance?.getOptions() || {};
			const serializationAdapters = [...startOptions.serializationAdapters || [], ServerFunctionSerializationAdapter];
			const requestStartOptions = {
				...startOptions,
				serializationAdapters
			};
			const getRouter = async () => {
				if (router) return router;
				router = await (await getEntries()).routerEntry.getRouter();
				const isPrerendering = process.env.TSS_PRERENDERING === "true";
				let isShell = process.env.TSS_SHELL === "true";
				if (isPrerendering && !isShell) isShell = request.headers.get(HEADERS.TSS_SHELL) === "true";
				const history = createMemoryHistory({ initialEntries: [href] });
				router.update({
					history,
					isShell,
					isPrerendering,
					origin: router.options.origin ?? origin,
					defaultSsr: requestStartOptions.defaultSsr,
					serializationAdapters: [...requestStartOptions.serializationAdapters, ...router.options.serializationAdapters || []],
					basepath: ROUTER_BASEPATH
				});
				return router;
			};
			const requestHandlerMiddleware = handlerToMiddleware(async ({ context }) => {
				return await runWithStartContext({
					getRouter,
					startOptions: requestStartOptions,
					contextAfterGlobalMiddlewares: context,
					request
				}, async () => {
					try {
						if (href.startsWith("/_serverFn/")) return await handleServerAction({
							request,
							context: requestOpts?.context
						});
						const executeRouter = async ({ serverContext }) => {
							const splitRequestAcceptHeader = (request.headers.get("Accept") || "*/*").split(",");
							if (!["*/*", "text/html"].some((mimeType) => splitRequestAcceptHeader.some((acceptedMimeType) => acceptedMimeType.trim().startsWith(mimeType)))) return json({ error: "Only HTML requests are supported here" }, { status: 500 });
							if (startRoutesManifest === null) startRoutesManifest = await getStartManifest();
							const router2 = await getRouter();
							attachRouterServerSsrUtils({
								router: router2,
								manifest: startRoutesManifest
							});
							router2.update({ additionalContext: { serverContext } });
							await router2.load();
							if (router2.state.redirect) return router2.state.redirect;
							await router2.serverSsr.dehydrate();
							const responseHeaders = getStartResponseHeaders({ router: router2 });
							cbWillCleanup = true;
							return await cb({
								request,
								router: router2,
								responseHeaders
							});
						};
						return await handleServerRoutes({
							getRouter,
							request,
							executeRouter,
							context
						});
					} catch (err) {
						if (err instanceof Response) return err;
						throw err;
					}
				});
			});
			const response = (await executeMiddleware([...(startOptions.requestMiddleware ? flattenMiddlewares(startOptions.requestMiddleware) : []).map((d) => d.options.server), requestHandlerMiddleware], {
				request,
				context: requestOpts?.context || {}
			})).response;
			if (isRedirect(response)) {
				if (isResolvedRedirect(response)) {
					if (request.headers.get("x-tsr-redirect") === "manual") return json({
						...response.options,
						isSerializedRedirect: true
					}, { headers: response.headers });
					return response;
				}
				if (response.options.to && typeof response.options.to === "string" && !response.options.to.startsWith("/")) throw new Error(`Server side redirects must use absolute paths via the 'href' or 'to' options. The redirect() method's "to" property accepts an internal path only. Use the "href" property to provide an external URL. Received: ${JSON.stringify(response.options)}`);
				if ([
					"params",
					"search",
					"hash"
				].some((d) => typeof response.options[d] === "function")) throw new Error(`Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(response.options).filter((d) => typeof response.options[d] === "function").map((d) => `"${d}"`).join(", ")}`);
				const redirect = (await getRouter()).resolveRedirect(response);
				if (request.headers.get("x-tsr-redirect") === "manual") return json({
					...response.options,
					isSerializedRedirect: true
				}, { headers: response.headers });
				return redirect;
			}
			return response;
		} finally {
			if (router && !cbWillCleanup) router.serverSsr?.cleanup();
			router = null;
		}
	};
	return requestHandler(startRequestResolver);
}
async function handleServerRoutes({ getRouter, request, executeRouter, context }) {
	const router = await getRouter();
	let url = new URL(request.url);
	url = executeRewriteInput(router.rewrite, url);
	const pathname = url.pathname;
	const { matchedRoutes, foundRoute, routeParams } = router.getMatchedRoutes(pathname);
	const isExactMatch = foundRoute && routeParams["**"] === void 0;
	const middlewares = flattenMiddlewares(matchedRoutes.flatMap((r) => r.options.server?.middleware).filter(Boolean)).map((d) => d.options.server);
	const server = foundRoute?.options.server;
	if (server && isExactMatch) {
		if (server.handlers) {
			const handlers = typeof server.handlers === "function" ? server.handlers({ createHandlers: (d) => d }) : server.handlers;
			const handler = handlers[request.method.toUpperCase()] ?? handlers["ANY"];
			if (handler) {
				const mayDefer = !!foundRoute.options.component;
				if (typeof handler === "function") middlewares.push(handlerToMiddleware(handler, mayDefer));
				else {
					const { middleware } = handler;
					if (middleware && middleware.length) middlewares.push(...flattenMiddlewares(middleware).map((d) => d.options.server));
					if (handler.handler) middlewares.push(handlerToMiddleware(handler.handler, mayDefer));
				}
			}
		}
	}
	middlewares.push(handlerToMiddleware((ctx2) => executeRouter({ serverContext: ctx2.context })));
	return (await executeMiddleware(middlewares, {
		request,
		context,
		params: routeParams,
		pathname
	})).response;
}
function throwRouteHandlerError() {
	throw new Error("Internal Server Error");
}
function throwIfMayNotDefer() {
	throw new Error("Internal Server Error");
}
function handlerToMiddleware(handler, mayDefer = false) {
	if (mayDefer) return handler;
	return async ({ next: _next, ...rest }) => {
		const response = await handler({
			...rest,
			next: throwIfMayNotDefer
		});
		if (!response) throwRouteHandlerError();
		return response;
	};
}
function executeMiddleware(middlewares, ctx) {
	let index = -1;
	const next = async (ctx2) => {
		index++;
		const middleware = middlewares[index];
		if (!middleware) return ctx2;
		let result;
		try {
			result = await middleware({
				...ctx2,
				next: async (nextCtx) => {
					const nextResult = await next({
						...ctx2,
						...nextCtx,
						context: {
							...ctx2.context,
							...nextCtx?.context || {}
						}
					});
					return Object.assign(ctx2, handleCtxResult(nextResult));
				}
			});
		} catch (err) {
			if (isSpecialResponse(err)) result = { response: err };
			else throw err;
		}
		return Object.assign(ctx2, handleCtxResult(result));
	};
	return handleCtxResult(next(ctx));
}
function handleCtxResult(result) {
	if (isSpecialResponse(result)) return { response: result };
	return result;
}
function isSpecialResponse(err) {
	return isResponse(err) || isRedirect(err);
}
function isResponse(response) {
	return response instanceof Response;
}
var fetch = createStartHandler(defaultStreamHandler);
function createServerEntry(entry) {
	return { async fetch(...args) {
		return await entry.fetch(...args);
	} };
}
var server_default = createServerEntry({ fetch });
export { createServerEntry, server_default as default };
