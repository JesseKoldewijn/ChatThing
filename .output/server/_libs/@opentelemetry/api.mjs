var _globalThis = typeof globalThis === "object" ? globalThis : global;
var VERSION = "1.9.0";
var re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
function _makeCompatibilityCheck(ownVersion) {
	var acceptedVersions = new Set([ownVersion]);
	var rejectedVersions = /* @__PURE__ */ new Set();
	var myVersionMatch = ownVersion.match(re);
	if (!myVersionMatch) return function() {
		return false;
	};
	var ownVersionParsed = {
		major: +myVersionMatch[1],
		minor: +myVersionMatch[2],
		patch: +myVersionMatch[3],
		prerelease: myVersionMatch[4]
	};
	if (ownVersionParsed.prerelease != null) return function isExactmatch(globalVersion) {
		return globalVersion === ownVersion;
	};
	function _reject(v) {
		rejectedVersions.add(v);
		return false;
	}
	function _accept(v) {
		acceptedVersions.add(v);
		return true;
	}
	return function isCompatible$1(globalVersion) {
		if (acceptedVersions.has(globalVersion)) return true;
		if (rejectedVersions.has(globalVersion)) return false;
		var globalVersionMatch = globalVersion.match(re);
		if (!globalVersionMatch) return _reject(globalVersion);
		var globalVersionParsed = {
			major: +globalVersionMatch[1],
			minor: +globalVersionMatch[2],
			patch: +globalVersionMatch[3],
			prerelease: globalVersionMatch[4]
		};
		if (globalVersionParsed.prerelease != null) return _reject(globalVersion);
		if (ownVersionParsed.major !== globalVersionParsed.major) return _reject(globalVersion);
		if (ownVersionParsed.major === 0) {
			if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) return _accept(globalVersion);
			return _reject(globalVersion);
		}
		if (ownVersionParsed.minor <= globalVersionParsed.minor) return _accept(globalVersion);
		return _reject(globalVersion);
	};
}
var isCompatible = _makeCompatibilityCheck(VERSION);
var major = VERSION.split(".")[0];
var GLOBAL_OPENTELEMETRY_API_KEY = Symbol.for("opentelemetry.js.api." + major);
var _global = _globalThis;
function registerGlobal(type, instance, diag, allowOverride) {
	var _a;
	if (allowOverride === void 0) allowOverride = false;
	var api = _global[GLOBAL_OPENTELEMETRY_API_KEY] = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a !== void 0 ? _a : { version: VERSION };
	if (!allowOverride && api[type]) {
		var err = /* @__PURE__ */ new Error("@opentelemetry/api: Attempted duplicate registration of API: " + type);
		diag.error(err.stack || err.message);
		return false;
	}
	if (api.version !== "1.9.0") {
		var err = /* @__PURE__ */ new Error("@opentelemetry/api: Registration of version v" + api.version + " for " + type + " does not match previously registered API v" + VERSION);
		diag.error(err.stack || err.message);
		return false;
	}
	api[type] = instance;
	diag.debug("@opentelemetry/api: Registered a global for " + type + " v" + VERSION + ".");
	return true;
}
function getGlobal(type) {
	var _a, _b;
	var globalVersion = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a === void 0 ? void 0 : _a.version;
	if (!globalVersion || !isCompatible(globalVersion)) return;
	return (_b = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b === void 0 ? void 0 : _b[type];
}
function unregisterGlobal(type, diag) {
	diag.debug("@opentelemetry/api: Unregistering a global for " + type + " v" + VERSION + ".");
	var api = _global[GLOBAL_OPENTELEMETRY_API_KEY];
	if (api) delete api[type];
}
var __read$3 = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
var __spreadArray$3 = function(to, from, pack) {
	if (pack || arguments.length === 2) {
		for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
			if (!ar) ar = Array.prototype.slice.call(from, 0, i);
			ar[i] = from[i];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from));
};
var DiagComponentLogger = function() {
	function DiagComponentLogger$1(props) {
		this._namespace = props.namespace || "DiagComponentLogger";
	}
	DiagComponentLogger$1.prototype.debug = function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		return logProxy("debug", this._namespace, args);
	};
	DiagComponentLogger$1.prototype.error = function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		return logProxy("error", this._namespace, args);
	};
	DiagComponentLogger$1.prototype.info = function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		return logProxy("info", this._namespace, args);
	};
	DiagComponentLogger$1.prototype.warn = function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		return logProxy("warn", this._namespace, args);
	};
	DiagComponentLogger$1.prototype.verbose = function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		return logProxy("verbose", this._namespace, args);
	};
	return DiagComponentLogger$1;
}();
function logProxy(funcName, namespace, args) {
	var logger = getGlobal("diag");
	if (!logger) return;
	args.unshift(namespace);
	return logger[funcName].apply(logger, __spreadArray$3([], __read$3(args), false));
}
var DiagLogLevel;
(function(DiagLogLevel$1) {
	DiagLogLevel$1[DiagLogLevel$1["NONE"] = 0] = "NONE";
	DiagLogLevel$1[DiagLogLevel$1["ERROR"] = 30] = "ERROR";
	DiagLogLevel$1[DiagLogLevel$1["WARN"] = 50] = "WARN";
	DiagLogLevel$1[DiagLogLevel$1["INFO"] = 60] = "INFO";
	DiagLogLevel$1[DiagLogLevel$1["DEBUG"] = 70] = "DEBUG";
	DiagLogLevel$1[DiagLogLevel$1["VERBOSE"] = 80] = "VERBOSE";
	DiagLogLevel$1[DiagLogLevel$1["ALL"] = 9999] = "ALL";
})(DiagLogLevel || (DiagLogLevel = {}));
function createLogLevelDiagLogger(maxLevel, logger) {
	if (maxLevel < DiagLogLevel.NONE) maxLevel = DiagLogLevel.NONE;
	else if (maxLevel > DiagLogLevel.ALL) maxLevel = DiagLogLevel.ALL;
	logger = logger || {};
	function _filterFunc(funcName, theLevel) {
		var theFunc = logger[funcName];
		if (typeof theFunc === "function" && maxLevel >= theLevel) return theFunc.bind(logger);
		return function() {};
	}
	return {
		error: _filterFunc("error", DiagLogLevel.ERROR),
		warn: _filterFunc("warn", DiagLogLevel.WARN),
		info: _filterFunc("info", DiagLogLevel.INFO),
		debug: _filterFunc("debug", DiagLogLevel.DEBUG),
		verbose: _filterFunc("verbose", DiagLogLevel.VERBOSE)
	};
}
var __read$2 = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
var __spreadArray$2 = function(to, from, pack) {
	if (pack || arguments.length === 2) {
		for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
			if (!ar) ar = Array.prototype.slice.call(from, 0, i);
			ar[i] = from[i];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from));
};
var API_NAME$2 = "diag";
var DiagAPI = function() {
	function DiagAPI$1() {
		function _logProxy(funcName) {
			return function() {
				var args = [];
				for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
				var logger = getGlobal("diag");
				if (!logger) return;
				return logger[funcName].apply(logger, __spreadArray$2([], __read$2(args), false));
			};
		}
		var self = this;
		var setLogger = function(logger, optionsOrLogLevel) {
			var _a, _b, _c;
			if (optionsOrLogLevel === void 0) optionsOrLogLevel = { logLevel: DiagLogLevel.INFO };
			if (logger === self) {
				var err = /* @__PURE__ */ new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
				self.error((_a = err.stack) !== null && _a !== void 0 ? _a : err.message);
				return false;
			}
			if (typeof optionsOrLogLevel === "number") optionsOrLogLevel = { logLevel: optionsOrLogLevel };
			var oldLogger = getGlobal("diag");
			var newLogger = createLogLevelDiagLogger((_b = optionsOrLogLevel.logLevel) !== null && _b !== void 0 ? _b : DiagLogLevel.INFO, logger);
			if (oldLogger && !optionsOrLogLevel.suppressOverrideMessage) {
				var stack = (_c = (/* @__PURE__ */ new Error()).stack) !== null && _c !== void 0 ? _c : "<failed to generate stacktrace>";
				oldLogger.warn("Current logger will be overwritten from " + stack);
				newLogger.warn("Current logger will overwrite one already registered from " + stack);
			}
			return registerGlobal("diag", newLogger, self, true);
		};
		self.setLogger = setLogger;
		self.disable = function() {
			unregisterGlobal(API_NAME$2, self);
		};
		self.createComponentLogger = function(options) {
			return new DiagComponentLogger(options);
		};
		self.verbose = _logProxy("verbose");
		self.debug = _logProxy("debug");
		self.info = _logProxy("info");
		self.warn = _logProxy("warn");
		self.error = _logProxy("error");
	}
	DiagAPI$1.instance = function() {
		if (!this._instance) this._instance = new DiagAPI$1();
		return this._instance;
	};
	return DiagAPI$1;
}();
function createContextKey(description) {
	return Symbol.for(description);
}
var ROOT_CONTEXT = new (function() {
	function BaseContext$1(parentContext) {
		var self = this;
		self._currentContext = parentContext ? new Map(parentContext) : /* @__PURE__ */ new Map();
		self.getValue = function(key) {
			return self._currentContext.get(key);
		};
		self.setValue = function(key, value) {
			var context = new BaseContext$1(self._currentContext);
			context._currentContext.set(key, value);
			return context;
		};
		self.deleteValue = function(key) {
			var context = new BaseContext$1(self._currentContext);
			context._currentContext.delete(key);
			return context;
		};
	}
	return BaseContext$1;
}())();
var __read$1 = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
var __spreadArray$1 = function(to, from, pack) {
	if (pack || arguments.length === 2) {
		for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
			if (!ar) ar = Array.prototype.slice.call(from, 0, i);
			ar[i] = from[i];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from));
};
var NoopContextManager = function() {
	function NoopContextManager$1() {}
	NoopContextManager$1.prototype.active = function() {
		return ROOT_CONTEXT;
	};
	NoopContextManager$1.prototype.with = function(_context, fn, thisArg) {
		var args = [];
		for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
		return fn.call.apply(fn, __spreadArray$1([thisArg], __read$1(args), false));
	};
	NoopContextManager$1.prototype.bind = function(_context, target) {
		return target;
	};
	NoopContextManager$1.prototype.enable = function() {
		return this;
	};
	NoopContextManager$1.prototype.disable = function() {
		return this;
	};
	return NoopContextManager$1;
}();
var __read = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
var __spreadArray = function(to, from, pack) {
	if (pack || arguments.length === 2) {
		for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
			if (!ar) ar = Array.prototype.slice.call(from, 0, i);
			ar[i] = from[i];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from));
};
var API_NAME$1 = "context";
var NOOP_CONTEXT_MANAGER = new NoopContextManager();
var ContextAPI = function() {
	function ContextAPI$1() {}
	ContextAPI$1.getInstance = function() {
		if (!this._instance) this._instance = new ContextAPI$1();
		return this._instance;
	};
	ContextAPI$1.prototype.setGlobalContextManager = function(contextManager) {
		return registerGlobal(API_NAME$1, contextManager, DiagAPI.instance());
	};
	ContextAPI$1.prototype.active = function() {
		return this._getContextManager().active();
	};
	ContextAPI$1.prototype.with = function(context, fn, thisArg) {
		var _a;
		var args = [];
		for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
		return (_a = this._getContextManager()).with.apply(_a, __spreadArray([
			context,
			fn,
			thisArg
		], __read(args), false));
	};
	ContextAPI$1.prototype.bind = function(context, target) {
		return this._getContextManager().bind(context, target);
	};
	ContextAPI$1.prototype._getContextManager = function() {
		return getGlobal(API_NAME$1) || NOOP_CONTEXT_MANAGER;
	};
	ContextAPI$1.prototype.disable = function() {
		this._getContextManager().disable();
		unregisterGlobal(API_NAME$1, DiagAPI.instance());
	};
	return ContextAPI$1;
}();
var TraceFlags;
(function(TraceFlags$1) {
	TraceFlags$1[TraceFlags$1["NONE"] = 0] = "NONE";
	TraceFlags$1[TraceFlags$1["SAMPLED"] = 1] = "SAMPLED";
})(TraceFlags || (TraceFlags = {}));
var INVALID_SPAN_CONTEXT = {
	traceId: "00000000000000000000000000000000",
	spanId: "0000000000000000",
	traceFlags: TraceFlags.NONE
};
var NonRecordingSpan = function() {
	function NonRecordingSpan$1(_spanContext) {
		if (_spanContext === void 0) _spanContext = INVALID_SPAN_CONTEXT;
		this._spanContext = _spanContext;
	}
	NonRecordingSpan$1.prototype.spanContext = function() {
		return this._spanContext;
	};
	NonRecordingSpan$1.prototype.setAttribute = function(_key, _value) {
		return this;
	};
	NonRecordingSpan$1.prototype.setAttributes = function(_attributes) {
		return this;
	};
	NonRecordingSpan$1.prototype.addEvent = function(_name, _attributes) {
		return this;
	};
	NonRecordingSpan$1.prototype.addLink = function(_link) {
		return this;
	};
	NonRecordingSpan$1.prototype.addLinks = function(_links) {
		return this;
	};
	NonRecordingSpan$1.prototype.setStatus = function(_status) {
		return this;
	};
	NonRecordingSpan$1.prototype.updateName = function(_name) {
		return this;
	};
	NonRecordingSpan$1.prototype.end = function(_endTime) {};
	NonRecordingSpan$1.prototype.isRecording = function() {
		return false;
	};
	NonRecordingSpan$1.prototype.recordException = function(_exception, _time) {};
	return NonRecordingSpan$1;
}();
var SPAN_KEY = createContextKey("OpenTelemetry Context Key SPAN");
function getSpan(context) {
	return context.getValue(SPAN_KEY) || void 0;
}
function getActiveSpan() {
	return getSpan(ContextAPI.getInstance().active());
}
function setSpan(context, span) {
	return context.setValue(SPAN_KEY, span);
}
function deleteSpan(context) {
	return context.deleteValue(SPAN_KEY);
}
function setSpanContext(context, spanContext) {
	return setSpan(context, new NonRecordingSpan(spanContext));
}
function getSpanContext(context) {
	var _a;
	return (_a = getSpan(context)) === null || _a === void 0 ? void 0 : _a.spanContext();
}
var VALID_TRACEID_REGEX = /^([0-9a-f]{32})$/i;
var VALID_SPANID_REGEX = /^[0-9a-f]{16}$/i;
function isValidTraceId(traceId) {
	return VALID_TRACEID_REGEX.test(traceId) && traceId !== "00000000000000000000000000000000";
}
function isValidSpanId(spanId) {
	return VALID_SPANID_REGEX.test(spanId) && spanId !== "0000000000000000";
}
function isSpanContextValid(spanContext) {
	return isValidTraceId(spanContext.traceId) && isValidSpanId(spanContext.spanId);
}
function wrapSpanContext(spanContext) {
	return new NonRecordingSpan(spanContext);
}
var contextApi = ContextAPI.getInstance();
var NoopTracer = function() {
	function NoopTracer$1() {}
	NoopTracer$1.prototype.startSpan = function(name, options, context) {
		if (context === void 0) context = contextApi.active();
		if (Boolean(options === null || options === void 0 ? void 0 : options.root)) return new NonRecordingSpan();
		var parentFromContext = context && getSpanContext(context);
		if (isSpanContext(parentFromContext) && isSpanContextValid(parentFromContext)) return new NonRecordingSpan(parentFromContext);
		else return new NonRecordingSpan();
	};
	NoopTracer$1.prototype.startActiveSpan = function(name, arg2, arg3, arg4) {
		var opts;
		var ctx;
		var fn;
		if (arguments.length < 2) return;
		else if (arguments.length === 2) fn = arg2;
		else if (arguments.length === 3) {
			opts = arg2;
			fn = arg3;
		} else {
			opts = arg2;
			ctx = arg3;
			fn = arg4;
		}
		var parentContext = ctx !== null && ctx !== void 0 ? ctx : contextApi.active();
		var span = this.startSpan(name, opts, parentContext);
		var contextWithSpanSet = setSpan(parentContext, span);
		return contextApi.with(contextWithSpanSet, fn, void 0, span);
	};
	return NoopTracer$1;
}();
function isSpanContext(spanContext) {
	return typeof spanContext === "object" && typeof spanContext["spanId"] === "string" && typeof spanContext["traceId"] === "string" && typeof spanContext["traceFlags"] === "number";
}
var NOOP_TRACER = new NoopTracer();
var ProxyTracer = function() {
	function ProxyTracer$1(_provider, name, version, options) {
		this._provider = _provider;
		this.name = name;
		this.version = version;
		this.options = options;
	}
	ProxyTracer$1.prototype.startSpan = function(name, options, context) {
		return this._getTracer().startSpan(name, options, context);
	};
	ProxyTracer$1.prototype.startActiveSpan = function(_name, _options, _context, _fn) {
		var tracer = this._getTracer();
		return Reflect.apply(tracer.startActiveSpan, tracer, arguments);
	};
	ProxyTracer$1.prototype._getTracer = function() {
		if (this._delegate) return this._delegate;
		var tracer = this._provider.getDelegateTracer(this.name, this.version, this.options);
		if (!tracer) return NOOP_TRACER;
		this._delegate = tracer;
		return this._delegate;
	};
	return ProxyTracer$1;
}();
var NOOP_TRACER_PROVIDER = new (function() {
	function NoopTracerProvider$1() {}
	NoopTracerProvider$1.prototype.getTracer = function(_name, _version, _options) {
		return new NoopTracer();
	};
	return NoopTracerProvider$1;
}())();
var ProxyTracerProvider = function() {
	function ProxyTracerProvider$1() {}
	ProxyTracerProvider$1.prototype.getTracer = function(name, version, options) {
		var _a;
		return (_a = this.getDelegateTracer(name, version, options)) !== null && _a !== void 0 ? _a : new ProxyTracer(this, name, version, options);
	};
	ProxyTracerProvider$1.prototype.getDelegate = function() {
		var _a;
		return (_a = this._delegate) !== null && _a !== void 0 ? _a : NOOP_TRACER_PROVIDER;
	};
	ProxyTracerProvider$1.prototype.setDelegate = function(delegate) {
		this._delegate = delegate;
	};
	ProxyTracerProvider$1.prototype.getDelegateTracer = function(name, version, options) {
		var _a;
		return (_a = this._delegate) === null || _a === void 0 ? void 0 : _a.getTracer(name, version, options);
	};
	return ProxyTracerProvider$1;
}();
var SpanStatusCode;
(function(SpanStatusCode$1) {
	SpanStatusCode$1[SpanStatusCode$1["UNSET"] = 0] = "UNSET";
	SpanStatusCode$1[SpanStatusCode$1["OK"] = 1] = "OK";
	SpanStatusCode$1[SpanStatusCode$1["ERROR"] = 2] = "ERROR";
})(SpanStatusCode || (SpanStatusCode = {}));
var API_NAME = "trace";
var trace = function() {
	function TraceAPI$1() {
		this._proxyTracerProvider = new ProxyTracerProvider();
		this.wrapSpanContext = wrapSpanContext;
		this.isSpanContextValid = isSpanContextValid;
		this.deleteSpan = deleteSpan;
		this.getSpan = getSpan;
		this.getActiveSpan = getActiveSpan;
		this.getSpanContext = getSpanContext;
		this.setSpan = setSpan;
		this.setSpanContext = setSpanContext;
	}
	TraceAPI$1.getInstance = function() {
		if (!this._instance) this._instance = new TraceAPI$1();
		return this._instance;
	};
	TraceAPI$1.prototype.setGlobalTracerProvider = function(provider) {
		var success = registerGlobal(API_NAME, this._proxyTracerProvider, DiagAPI.instance());
		if (success) this._proxyTracerProvider.setDelegate(provider);
		return success;
	};
	TraceAPI$1.prototype.getTracerProvider = function() {
		return getGlobal(API_NAME) || this._proxyTracerProvider;
	};
	TraceAPI$1.prototype.getTracer = function(name, version) {
		return this.getTracerProvider().getTracer(name, version);
	};
	TraceAPI$1.prototype.disable = function() {
		unregisterGlobal(API_NAME, DiagAPI.instance());
		this._proxyTracerProvider = new ProxyTracerProvider();
	};
	return TraceAPI$1;
}().getInstance();
export { SpanStatusCode as n, trace as t };
