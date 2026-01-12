import { r as __export, s as __toESM } from "../_rolldown.mjs";
import { l as require_react_dom, u as require_react } from "./@floating-ui/react-dom.mjs";
import { m as require_with_selector } from "./@tanstack/react-router.mjs";
import { t as clsx } from "./clsx.mjs";
import { _ as bumpX, a as none_default$1, b as line_default, c as stepBefore, d as monotoneX, f as monotoneY, g as basis_default, h as basisClosed_default, i as stack_default, l as step_default, m as basisOpen_default, n as silhouette_default, o as none_default, p as linearClosed_default, r as expand_default, s as stepAfter, t as wiggle_default, u as natural_default, v as bumpY, x as linear_default, y as area_default } from "./d3-shape.mjs";
import { a as require_uniqBy, i as require_sortBy, n as require_range, o as require_get, r as require_throttle, t as require_last } from "./es-toolkit.mjs";
import { a as createSlice, c as combineReducers, i as createListenerMiddleware, l as createSelector, n as configureStore, o as prepareAutoBatched, r as createAction, s as current, t as autoBatchEnhancer } from "./@reduxjs/toolkit.mjs";
import { t as castDraft } from "./immer.mjs";
import { C as linear, D as implicit, E as point, O as ordinal, S as identity$1, T as band, _ as radial, a as divergingSymlog, b as symlog, c as sequentialLog, d as sequentialSymlog, f as utcTime, g as quantile, h as quantize, i as divergingSqrt, l as sequentialPow, m as threshold, n as divergingLog, o as sequentialQuantile, p as time, r as divergingPow, s as sequential, t as diverging, u as sequentialSqrt, v as pow, w as tickFormat, x as log, y as sqrt } from "./d3-scale.mjs";
import { t as decimal_default } from "./decimal.js-light.mjs";
import { t as eventemitter3_default } from "./eventemitter3.mjs";
import { n as shallowEqual, t as Provider_default } from "./react-redux.mjs";
var EventKeys = [
	"dangerouslySetInnerHTML",
	"onCopy",
	"onCopyCapture",
	"onCut",
	"onCutCapture",
	"onPaste",
	"onPasteCapture",
	"onCompositionEnd",
	"onCompositionEndCapture",
	"onCompositionStart",
	"onCompositionStartCapture",
	"onCompositionUpdate",
	"onCompositionUpdateCapture",
	"onFocus",
	"onFocusCapture",
	"onBlur",
	"onBlurCapture",
	"onChange",
	"onChangeCapture",
	"onBeforeInput",
	"onBeforeInputCapture",
	"onInput",
	"onInputCapture",
	"onReset",
	"onResetCapture",
	"onSubmit",
	"onSubmitCapture",
	"onInvalid",
	"onInvalidCapture",
	"onLoad",
	"onLoadCapture",
	"onError",
	"onErrorCapture",
	"onKeyDown",
	"onKeyDownCapture",
	"onKeyPress",
	"onKeyPressCapture",
	"onKeyUp",
	"onKeyUpCapture",
	"onAbort",
	"onAbortCapture",
	"onCanPlay",
	"onCanPlayCapture",
	"onCanPlayThrough",
	"onCanPlayThroughCapture",
	"onDurationChange",
	"onDurationChangeCapture",
	"onEmptied",
	"onEmptiedCapture",
	"onEncrypted",
	"onEncryptedCapture",
	"onEnded",
	"onEndedCapture",
	"onLoadedData",
	"onLoadedDataCapture",
	"onLoadedMetadata",
	"onLoadedMetadataCapture",
	"onLoadStart",
	"onLoadStartCapture",
	"onPause",
	"onPauseCapture",
	"onPlay",
	"onPlayCapture",
	"onPlaying",
	"onPlayingCapture",
	"onProgress",
	"onProgressCapture",
	"onRateChange",
	"onRateChangeCapture",
	"onSeeked",
	"onSeekedCapture",
	"onSeeking",
	"onSeekingCapture",
	"onStalled",
	"onStalledCapture",
	"onSuspend",
	"onSuspendCapture",
	"onTimeUpdate",
	"onTimeUpdateCapture",
	"onVolumeChange",
	"onVolumeChangeCapture",
	"onWaiting",
	"onWaitingCapture",
	"onAuxClick",
	"onAuxClickCapture",
	"onClick",
	"onClickCapture",
	"onContextMenu",
	"onContextMenuCapture",
	"onDoubleClick",
	"onDoubleClickCapture",
	"onDrag",
	"onDragCapture",
	"onDragEnd",
	"onDragEndCapture",
	"onDragEnter",
	"onDragEnterCapture",
	"onDragExit",
	"onDragExitCapture",
	"onDragLeave",
	"onDragLeaveCapture",
	"onDragOver",
	"onDragOverCapture",
	"onDragStart",
	"onDragStartCapture",
	"onDrop",
	"onDropCapture",
	"onMouseDown",
	"onMouseDownCapture",
	"onMouseEnter",
	"onMouseLeave",
	"onMouseMove",
	"onMouseMoveCapture",
	"onMouseOut",
	"onMouseOutCapture",
	"onMouseOver",
	"onMouseOverCapture",
	"onMouseUp",
	"onMouseUpCapture",
	"onSelect",
	"onSelectCapture",
	"onTouchCancel",
	"onTouchCancelCapture",
	"onTouchEnd",
	"onTouchEndCapture",
	"onTouchMove",
	"onTouchMoveCapture",
	"onTouchStart",
	"onTouchStartCapture",
	"onPointerDown",
	"onPointerDownCapture",
	"onPointerMove",
	"onPointerMoveCapture",
	"onPointerUp",
	"onPointerUpCapture",
	"onPointerCancel",
	"onPointerCancelCapture",
	"onPointerEnter",
	"onPointerEnterCapture",
	"onPointerLeave",
	"onPointerLeaveCapture",
	"onPointerOver",
	"onPointerOverCapture",
	"onPointerOut",
	"onPointerOutCapture",
	"onGotPointerCapture",
	"onGotPointerCaptureCapture",
	"onLostPointerCapture",
	"onLostPointerCaptureCapture",
	"onScroll",
	"onScrollCapture",
	"onWheel",
	"onWheelCapture",
	"onAnimationStart",
	"onAnimationStartCapture",
	"onAnimationEnd",
	"onAnimationEndCapture",
	"onAnimationIteration",
	"onAnimationIterationCapture",
	"onTransitionEnd",
	"onTransitionEndCapture"
];
function isEventKey(key) {
	if (typeof key !== "string") return false;
	return EventKeys.includes(key);
}
var import_react = /* @__PURE__ */ __toESM(require_react());
var SVGElementPropKeySet = new Set([
	"aria-activedescendant",
	"aria-atomic",
	"aria-autocomplete",
	"aria-busy",
	"aria-checked",
	"aria-colcount",
	"aria-colindex",
	"aria-colspan",
	"aria-controls",
	"aria-current",
	"aria-describedby",
	"aria-details",
	"aria-disabled",
	"aria-errormessage",
	"aria-expanded",
	"aria-flowto",
	"aria-haspopup",
	"aria-hidden",
	"aria-invalid",
	"aria-keyshortcuts",
	"aria-label",
	"aria-labelledby",
	"aria-level",
	"aria-live",
	"aria-modal",
	"aria-multiline",
	"aria-multiselectable",
	"aria-orientation",
	"aria-owns",
	"aria-placeholder",
	"aria-posinset",
	"aria-pressed",
	"aria-readonly",
	"aria-relevant",
	"aria-required",
	"aria-roledescription",
	"aria-rowcount",
	"aria-rowindex",
	"aria-rowspan",
	"aria-selected",
	"aria-setsize",
	"aria-sort",
	"aria-valuemax",
	"aria-valuemin",
	"aria-valuenow",
	"aria-valuetext",
	"className",
	"color",
	"height",
	"id",
	"lang",
	"max",
	"media",
	"method",
	"min",
	"name",
	"style",
	"target",
	"width",
	"role",
	"tabIndex",
	"accentHeight",
	"accumulate",
	"additive",
	"alignmentBaseline",
	"allowReorder",
	"alphabetic",
	"amplitude",
	"arabicForm",
	"ascent",
	"attributeName",
	"attributeType",
	"autoReverse",
	"azimuth",
	"baseFrequency",
	"baselineShift",
	"baseProfile",
	"bbox",
	"begin",
	"bias",
	"by",
	"calcMode",
	"capHeight",
	"clip",
	"clipPath",
	"clipPathUnits",
	"clipRule",
	"colorInterpolation",
	"colorInterpolationFilters",
	"colorProfile",
	"colorRendering",
	"contentScriptType",
	"contentStyleType",
	"cursor",
	"cx",
	"cy",
	"d",
	"decelerate",
	"descent",
	"diffuseConstant",
	"direction",
	"display",
	"divisor",
	"dominantBaseline",
	"dur",
	"dx",
	"dy",
	"edgeMode",
	"elevation",
	"enableBackground",
	"end",
	"exponent",
	"externalResourcesRequired",
	"fill",
	"fillOpacity",
	"fillRule",
	"filter",
	"filterRes",
	"filterUnits",
	"floodColor",
	"floodOpacity",
	"focusable",
	"fontFamily",
	"fontSize",
	"fontSizeAdjust",
	"fontStretch",
	"fontStyle",
	"fontVariant",
	"fontWeight",
	"format",
	"from",
	"fx",
	"fy",
	"g1",
	"g2",
	"glyphName",
	"glyphOrientationHorizontal",
	"glyphOrientationVertical",
	"glyphRef",
	"gradientTransform",
	"gradientUnits",
	"hanging",
	"horizAdvX",
	"horizOriginX",
	"href",
	"ideographic",
	"imageRendering",
	"in2",
	"in",
	"intercept",
	"k1",
	"k2",
	"k3",
	"k4",
	"k",
	"kernelMatrix",
	"kernelUnitLength",
	"kerning",
	"keyPoints",
	"keySplines",
	"keyTimes",
	"lengthAdjust",
	"letterSpacing",
	"lightingColor",
	"limitingConeAngle",
	"local",
	"markerEnd",
	"markerHeight",
	"markerMid",
	"markerStart",
	"markerUnits",
	"markerWidth",
	"mask",
	"maskContentUnits",
	"maskUnits",
	"mathematical",
	"mode",
	"numOctaves",
	"offset",
	"opacity",
	"operator",
	"order",
	"orient",
	"orientation",
	"origin",
	"overflow",
	"overlinePosition",
	"overlineThickness",
	"paintOrder",
	"panose1",
	"pathLength",
	"patternContentUnits",
	"patternTransform",
	"patternUnits",
	"pointerEvents",
	"pointsAtX",
	"pointsAtY",
	"pointsAtZ",
	"preserveAlpha",
	"preserveAspectRatio",
	"primitiveUnits",
	"r",
	"radius",
	"refX",
	"refY",
	"renderingIntent",
	"repeatCount",
	"repeatDur",
	"requiredExtensions",
	"requiredFeatures",
	"restart",
	"result",
	"rotate",
	"rx",
	"ry",
	"seed",
	"shapeRendering",
	"slope",
	"spacing",
	"specularConstant",
	"specularExponent",
	"speed",
	"spreadMethod",
	"startOffset",
	"stdDeviation",
	"stemh",
	"stemv",
	"stitchTiles",
	"stopColor",
	"stopOpacity",
	"strikethroughPosition",
	"strikethroughThickness",
	"string",
	"stroke",
	"strokeDasharray",
	"strokeDashoffset",
	"strokeLinecap",
	"strokeLinejoin",
	"strokeMiterlimit",
	"strokeOpacity",
	"strokeWidth",
	"surfaceScale",
	"systemLanguage",
	"tableValues",
	"targetX",
	"targetY",
	"textAnchor",
	"textDecoration",
	"textLength",
	"textRendering",
	"to",
	"transform",
	"u1",
	"u2",
	"underlinePosition",
	"underlineThickness",
	"unicode",
	"unicodeBidi",
	"unicodeRange",
	"unitsPerEm",
	"vAlphabetic",
	"values",
	"vectorEffect",
	"version",
	"vertAdvY",
	"vertOriginX",
	"vertOriginY",
	"vHanging",
	"vIdeographic",
	"viewTarget",
	"visibility",
	"vMathematical",
	"widths",
	"wordSpacing",
	"writingMode",
	"x1",
	"x2",
	"x",
	"xChannelSelector",
	"xHeight",
	"xlinkActuate",
	"xlinkArcrole",
	"xlinkHref",
	"xlinkRole",
	"xlinkShow",
	"xlinkTitle",
	"xlinkType",
	"xmlBase",
	"xmlLang",
	"xmlns",
	"xmlnsXlink",
	"xmlSpace",
	"y1",
	"y2",
	"y",
	"yChannelSelector",
	"z",
	"zoomAndPan",
	"ref",
	"key",
	"angle"
]);
function isSvgElementPropKey(key) {
	if (typeof key !== "string") return false;
	return SVGElementPropKeySet.has(key);
}
function isDataAttribute(key) {
	return typeof key === "string" && key.startsWith("data-");
}
function svgPropertiesNoEvents(obj) {
	if (typeof obj !== "object" || obj === null) return {};
	var result = {};
	for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
		if (isSvgElementPropKey(key) || isDataAttribute(key)) result[key] = obj[key];
	}
	return result;
}
function svgPropertiesNoEventsFromUnknown(input) {
	if (input == null) return null;
	if (/* @__PURE__ */ (0, import_react.isValidElement)(input) && typeof input.props === "object" && input.props !== null) {
		var p = input.props;
		return svgPropertiesNoEvents(p);
	}
	if (typeof input === "object" && !Array.isArray(input)) return svgPropertiesNoEvents(input);
	return null;
}
function svgPropertiesAndEvents(obj) {
	var result = {};
	for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
		if (isSvgElementPropKey(key) || isDataAttribute(key) || isEventKey(key)) result[key] = obj[key];
	}
	return result;
}
function svgPropertiesAndEventsFromUnknown(input) {
	if (input == null) return null;
	if (/* @__PURE__ */ (0, import_react.isValidElement)(input)) return svgPropertiesAndEvents(input.props);
	if (typeof input === "object" && !Array.isArray(input)) return svgPropertiesAndEvents(input);
	return null;
}
var _excluded$16 = [
	"children",
	"width",
	"height",
	"viewBox",
	"className",
	"style",
	"title",
	"desc"
];
function _extends$21() {
	return _extends$21 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$21.apply(null, arguments);
}
function _objectWithoutProperties$16(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$16(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$16(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var Surface = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	var { children, width, height, viewBox, className, style, title, desc } = props, others = _objectWithoutProperties$16(props, _excluded$16);
	var svgView = viewBox || {
		width,
		height,
		x: 0,
		y: 0
	};
	var layerClass = clsx("recharts-surface", className);
	return /* @__PURE__ */ import_react.createElement("svg", _extends$21({}, svgPropertiesAndEvents(others), {
		className: layerClass,
		width,
		height,
		style,
		viewBox: "".concat(svgView.x, " ").concat(svgView.y, " ").concat(svgView.width, " ").concat(svgView.height),
		ref
	}), /* @__PURE__ */ import_react.createElement("title", null, title), /* @__PURE__ */ import_react.createElement("desc", null, desc), children);
});
var _excluded$15 = ["children", "className"];
function _extends$20() {
	return _extends$20 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$20.apply(null, arguments);
}
function _objectWithoutProperties$15(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$15(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$15(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var Layer = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	var { children, className } = props, others = _objectWithoutProperties$15(props, _excluded$15);
	var layerClass = clsx("recharts-layer", className);
	return /* @__PURE__ */ import_react.createElement("g", _extends$20({ className: layerClass }, svgPropertiesAndEvents(others), { ref }), children);
});
var LegendPortalContext = /* @__PURE__ */ (0, import_react.createContext)(null);
var import_get$2 = /* @__PURE__ */ __toESM(require_get());
var mathSign = (value) => {
	if (value === 0) return 0;
	if (value > 0) return 1;
	return -1;
};
var isNan = (value) => {
	return typeof value == "number" && value != +value;
};
var isPercent = (value) => typeof value === "string" && value.indexOf("%") === value.length - 1;
var isNumber = (value) => (typeof value === "number" || value instanceof Number) && !isNan(value);
var isNumOrStr = (value) => isNumber(value) || typeof value === "string";
var idCounter = 0;
var uniqueId = (prefix) => {
	var id = ++idCounter;
	return "".concat(prefix || "").concat(id);
};
var getPercentValue = function getPercentValue$1(percent, totalValue) {
	var defaultValue = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
	var validate = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
	if (!isNumber(percent) && typeof percent !== "string") return defaultValue;
	var value;
	if (isPercent(percent)) {
		if (totalValue == null) return defaultValue;
		var index = percent.indexOf("%");
		value = totalValue * parseFloat(percent.slice(0, index)) / 100;
	} else value = +percent;
	if (isNan(value)) value = defaultValue;
	if (validate && totalValue != null && value > totalValue) value = totalValue;
	return value;
};
var hasDuplicate = (ary) => {
	if (!Array.isArray(ary)) return false;
	var len = ary.length;
	var cache = {};
	for (var i = 0; i < len; i++) if (!cache[ary[i]]) cache[ary[i]] = true;
	else return true;
	return false;
};
function interpolate(start, end, t) {
	if (isNumber(start) && isNumber(end)) return start + t * (end - start);
	return end;
}
function findEntryInArray(ary, specifiedKey, specifiedValue) {
	if (!ary || !ary.length) return;
	return ary.find((entry) => entry && (typeof specifiedKey === "function" ? specifiedKey(entry) : (0, import_get$2.default)(entry, specifiedKey)) === specifiedValue);
}
var isNullish = (value) => {
	return value === null || typeof value === "undefined";
};
var upperFirst = (value) => {
	if (isNullish(value)) return value;
	return "".concat(value.charAt(0).toUpperCase()).concat(value.slice(1));
};
function isNotNil(value) {
	return value != null;
}
function noop() {}
var isPolarCoordinate = (c) => {
	return "radius" in c && "startAngle" in c && "endAngle" in c;
};
var adaptEventHandlers = (props, newHandler) => {
	if (!props || typeof props === "function" || typeof props === "boolean") return null;
	var inputProps = props;
	if (/* @__PURE__ */ (0, import_react.isValidElement)(props)) inputProps = props.props;
	if (typeof inputProps !== "object" && typeof inputProps !== "function") return null;
	var out = {};
	Object.keys(inputProps).forEach((key) => {
		if (isEventKey(key)) out[key] = newHandler || ((e) => inputProps[key](inputProps, e));
	});
	return out;
};
var getEventHandlerOfChild = (originalHandler, data, index) => (e) => {
	originalHandler(data, index, e);
	return null;
};
var adaptEventsOfChild = (props, data, index) => {
	if (props === null || typeof props !== "object" && typeof props !== "function") return null;
	var out = null;
	Object.keys(props).forEach((key) => {
		var item = props[key];
		if (isEventKey(key) && typeof item === "function") {
			if (!out) out = {};
			out[key] = getEventHandlerOfChild(item, data, index);
		}
	});
	return out;
};
function ownKeys$30(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$30(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$30(Object(t), !0).forEach(function(r$1) {
			_defineProperty$32(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$30(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$32(e, r, t) {
	return (r = _toPropertyKey$32(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$32(t) {
	var i = _toPrimitive$32(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$32(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function resolveDefaultProps(realProps, defaultProps) {
	var resolvedProps = _objectSpread$30({}, realProps);
	var dp = defaultProps;
	return Object.keys(defaultProps).reduce((acc, key) => {
		if (acc[key] === void 0 && dp[key] !== void 0) acc[key] = dp[key];
		return acc;
	}, resolvedProps);
}
var import_uniqBy = /* @__PURE__ */ __toESM(require_uniqBy());
function getUniqPayload(payload, option, defaultUniqBy$1) {
	if (option === true) return (0, import_uniqBy.default)(payload, defaultUniqBy$1);
	if (typeof option === "function") return (0, import_uniqBy.default)(payload, option);
	return payload;
}
var RechartsReduxContext = /* @__PURE__ */ (0, import_react.createContext)(null);
var import_with_selector = require_with_selector();
var noopDispatch = (a) => a;
var useAppDispatch = () => {
	var context = (0, import_react.useContext)(RechartsReduxContext);
	if (context) return context.store.dispatch;
	return noopDispatch;
};
var noop$1 = () => {};
var addNestedSubNoop = () => noop$1;
var refEquality = (a, b) => a === b;
function useAppSelector(selector) {
	var context = (0, import_react.useContext)(RechartsReduxContext);
	return (0, import_with_selector.useSyncExternalStoreWithSelector)(context ? context.subscription.addNestedSub : addNestedSubNoop, context ? context.store.getState : noop$1, context ? context.store.getState : noop$1, context ? selector : noop$1, refEquality);
}
var import_sortBy$3 = /* @__PURE__ */ __toESM(require_sortBy());
var selectLegendSettings = (state) => state.legend.settings;
var selectLegendSize = (state) => state.legend.size;
var selectAllLegendPayload2DArray = (state) => state.legend.payload;
createSelector([selectAllLegendPayload2DArray, selectLegendSettings], (payloads, _ref$1) => {
	var { itemSorter } = _ref$1;
	var flat = payloads.flat(1);
	return itemSorter ? (0, import_sortBy$3.default)(flat, itemSorter) : flat;
});
var EPS$1 = 1;
function useElementOffset() {
	var extraDependencies = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
	var [lastBoundingBox, setLastBoundingBox] = (0, import_react.useState)({
		height: 0,
		left: 0,
		top: 0,
		width: 0
	});
	return [lastBoundingBox, (0, import_react.useCallback)((node) => {
		if (node != null) {
			var rect = node.getBoundingClientRect();
			var box = {
				height: rect.height,
				left: rect.left,
				top: rect.top,
				width: rect.width
			};
			if (Math.abs(box.height - lastBoundingBox.height) > EPS$1 || Math.abs(box.left - lastBoundingBox.left) > EPS$1 || Math.abs(box.top - lastBoundingBox.top) > EPS$1 || Math.abs(box.width - lastBoundingBox.width) > EPS$1) setLastBoundingBox({
				height: box.height,
				left: box.left,
				top: box.top,
				width: box.width
			});
		}
	}, [
		lastBoundingBox.width,
		lastBoundingBox.height,
		lastBoundingBox.top,
		lastBoundingBox.left,
		...extraDependencies
	])];
}
var chartLayoutSlice = createSlice({
	name: "chartLayout",
	initialState: {
		layoutType: "horizontal",
		width: 0,
		height: 0,
		margin: {
			top: 5,
			right: 5,
			bottom: 5,
			left: 5
		},
		scale: 1
	},
	reducers: {
		setLayout(state, action) {
			state.layoutType = action.payload;
		},
		setChartSize(state, action) {
			state.width = action.payload.width;
			state.height = action.payload.height;
		},
		setMargin(state, action) {
			var _action$payload$top, _action$payload$right, _action$payload$botto, _action$payload$left;
			state.margin.top = (_action$payload$top = action.payload.top) !== null && _action$payload$top !== void 0 ? _action$payload$top : 0;
			state.margin.right = (_action$payload$right = action.payload.right) !== null && _action$payload$right !== void 0 ? _action$payload$right : 0;
			state.margin.bottom = (_action$payload$botto = action.payload.bottom) !== null && _action$payload$botto !== void 0 ? _action$payload$botto : 0;
			state.margin.left = (_action$payload$left = action.payload.left) !== null && _action$payload$left !== void 0 ? _action$payload$left : 0;
		},
		setScale(state, action) {
			state.scale = action.payload;
		}
	}
});
var { setMargin, setLayout, setChartSize, setScale } = chartLayoutSlice.actions;
var chartLayoutReducer = chartLayoutSlice.reducer;
function getSliced(arr, startIndex, endIndex) {
	if (!Array.isArray(arr)) return arr;
	if (arr && startIndex + endIndex !== 0) return arr.slice(startIndex, endIndex + 1);
	return arr;
}
var import_sortBy$2 = /* @__PURE__ */ __toESM(require_sortBy());
var import_get$1 = /* @__PURE__ */ __toESM(require_get());
function ownKeys$29(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$29(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$29(Object(t), !0).forEach(function(r$1) {
			_defineProperty$31(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$29(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$31(e, r, t) {
	return (r = _toPropertyKey$31(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$31(t) {
	var i = _toPrimitive$31(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$31(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function getValueByDataKey(obj, dataKey, defaultValue) {
	if (isNullish(obj) || isNullish(dataKey)) return defaultValue;
	if (isNumOrStr(dataKey)) return (0, import_get$1.default)(obj, dataKey, defaultValue);
	if (typeof dataKey === "function") return dataKey(obj);
	return defaultValue;
}
var appendOffsetOfLegend = (offset, legendSettings, legendSize) => {
	if (legendSettings && legendSize) {
		var { width: boxWidth, height: boxHeight } = legendSize;
		var { align, verticalAlign, layout } = legendSettings;
		if ((layout === "vertical" || layout === "horizontal" && verticalAlign === "middle") && align !== "center" && isNumber(offset[align])) return _objectSpread$29(_objectSpread$29({}, offset), {}, { [align]: offset[align] + (boxWidth || 0) });
		if ((layout === "horizontal" || layout === "vertical" && align === "center") && verticalAlign !== "middle" && isNumber(offset[verticalAlign])) return _objectSpread$29(_objectSpread$29({}, offset), {}, { [verticalAlign]: offset[verticalAlign] + (boxHeight || 0) });
	}
	return offset;
};
var isCategoricalAxis = (layout, axisType) => layout === "horizontal" && axisType === "xAxis" || layout === "vertical" && axisType === "yAxis" || layout === "centric" && axisType === "angleAxis" || layout === "radial" && axisType === "radiusAxis";
var getCoordinatesOfGrid = (ticks, minValue, maxValue, syncWithTicks) => {
	if (syncWithTicks) return ticks.map((entry) => entry.coordinate);
	var hasMin, hasMax;
	var values = ticks.map((entry) => {
		if (entry.coordinate === minValue) hasMin = true;
		if (entry.coordinate === maxValue) hasMax = true;
		return entry.coordinate;
	});
	if (!hasMin) values.push(minValue);
	if (!hasMax) values.push(maxValue);
	return values;
};
var getTicksOfAxis = (axis, isGrid, isAll) => {
	if (!axis) return null;
	var { duplicateDomain, type, range: range$2, scale, realScaleType, isCategorical, categoricalDomain, tickCount, ticks, niceTicks, axisType } = axis;
	if (!scale) return null;
	var offsetForBand = realScaleType === "scaleBand" && scale.bandwidth ? scale.bandwidth() / 2 : 2;
	var offset = (isGrid || isAll) && type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
	offset = axisType === "angleAxis" && range$2 && range$2.length >= 2 ? mathSign(range$2[0] - range$2[1]) * 2 * offset : offset;
	if (isGrid && (ticks || niceTicks)) return (ticks || niceTicks || []).map((entry, index) => {
		return {
			coordinate: scale(duplicateDomain ? duplicateDomain.indexOf(entry) : entry) + offset,
			value: entry,
			offset,
			index
		};
	}).filter((row) => !isNan(row.coordinate));
	if (isCategorical && categoricalDomain) return categoricalDomain.map((entry, index) => ({
		coordinate: scale(entry) + offset,
		value: entry,
		index,
		offset
	}));
	if (scale.ticks && !isAll && tickCount != null) return scale.ticks(tickCount).map((entry, index) => ({
		coordinate: scale(entry) + offset,
		value: entry,
		offset,
		index
	}));
	return scale.domain().map((entry, index) => ({
		coordinate: scale(entry) + offset,
		value: duplicateDomain ? duplicateDomain[entry] : entry,
		index,
		offset
	}));
};
var EPS = 1e-4;
var checkDomainOfScale = (scale) => {
	var domain = scale.domain();
	if (!domain || domain.length <= 2) return;
	var len = domain.length;
	var range$2 = scale.range();
	var minValue = Math.min(range$2[0], range$2[1]) - EPS;
	var maxValue = Math.max(range$2[0], range$2[1]) + EPS;
	var first = scale(domain[0]);
	var last$1 = scale(domain[len - 1]);
	if (first < minValue || first > maxValue || last$1 < minValue || last$1 > maxValue) scale.domain([domain[0], domain[len - 1]]);
};
var offsetSign = (series) => {
	var n = series.length;
	if (n <= 0) return;
	for (var j = 0, m = series[0].length; j < m; ++j) {
		var positive = 0;
		var negative = 0;
		for (var i = 0; i < n; ++i) {
			var value = isNan(series[i][j][1]) ? series[i][j][0] : series[i][j][1];
			if (value >= 0) {
				series[i][j][0] = positive;
				series[i][j][1] = positive + value;
				positive = series[i][j][1];
			} else {
				series[i][j][0] = negative;
				series[i][j][1] = negative + value;
				negative = series[i][j][1];
			}
		}
	}
};
var offsetPositive = (series) => {
	var n = series.length;
	if (n <= 0) return;
	for (var j = 0, m = series[0].length; j < m; ++j) {
		var positive = 0;
		for (var i = 0; i < n; ++i) {
			var value = isNan(series[i][j][1]) ? series[i][j][0] : series[i][j][1];
			if (value >= 0) {
				series[i][j][0] = positive;
				series[i][j][1] = positive + value;
				positive = series[i][j][1];
			} else {
				series[i][j][0] = 0;
				series[i][j][1] = 0;
			}
		}
	}
};
var STACK_OFFSET_MAP = {
	sign: offsetSign,
	expand: expand_default,
	none: none_default,
	silhouette: silhouette_default,
	wiggle: wiggle_default,
	positive: offsetPositive
};
var getStackedData = (data, dataKeys, offsetType) => {
	var offsetAccessor = STACK_OFFSET_MAP[offsetType];
	return stack_default().keys(dataKeys).value((d, key) => Number(getValueByDataKey(d, key, 0))).order(none_default$1).offset(offsetAccessor)(data);
};
function getNormalizedStackId(publicStackId) {
	return publicStackId == null ? void 0 : String(publicStackId);
}
function getCateCoordinateOfLine(_ref$1) {
	var { axis, ticks, bandSize, entry, index, dataKey } = _ref$1;
	if (axis.type === "category") {
		if (!axis.allowDuplicatedCategory && axis.dataKey && !isNullish(entry[axis.dataKey])) {
			var matchedTick = findEntryInArray(ticks, "value", entry[axis.dataKey]);
			if (matchedTick) return matchedTick.coordinate + bandSize / 2;
		}
		return ticks[index] ? ticks[index].coordinate + bandSize / 2 : null;
	}
	var value = getValueByDataKey(entry, !isNullish(dataKey) ? dataKey : axis.dataKey);
	return !isNullish(value) ? axis.scale(value) : null;
}
var getDomainOfSingle = (data) => {
	var flat = data.flat(2).filter(isNumber);
	return [Math.min(...flat), Math.max(...flat)];
};
var makeDomainFinite = (domain) => {
	return [domain[0] === Infinity ? 0 : domain[0], domain[1] === -Infinity ? 0 : domain[1]];
};
var getDomainOfStackGroups = (stackGroups, startIndex, endIndex) => {
	if (stackGroups == null) return;
	return makeDomainFinite(Object.keys(stackGroups).reduce((result, stackId) => {
		var { stackedData } = stackGroups[stackId];
		var domain = stackedData.reduce((res, entry) => {
			var s = getDomainOfSingle(getSliced(entry, startIndex, endIndex));
			return [Math.min(res[0], s[0]), Math.max(res[1], s[1])];
		}, [Infinity, -Infinity]);
		return [Math.min(domain[0], result[0]), Math.max(domain[1], result[1])];
	}, [Infinity, -Infinity]));
};
var MIN_VALUE_REG = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
var MAX_VALUE_REG = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
var getBandSizeOfAxis = (axis, ticks, isBar) => {
	if (axis && axis.scale && axis.scale.bandwidth) {
		var bandWidth = axis.scale.bandwidth();
		if (!isBar || bandWidth > 0) return bandWidth;
	}
	if (axis && ticks && ticks.length >= 2) {
		var orderedTicks = (0, import_sortBy$2.default)(ticks, (o) => o.coordinate);
		var bandSize = Infinity;
		for (var i = 1, len = orderedTicks.length; i < len; i++) {
			var cur = orderedTicks[i];
			var prev = orderedTicks[i - 1];
			bandSize = Math.min((cur.coordinate || 0) - (prev.coordinate || 0), bandSize);
		}
		return bandSize === Infinity ? 0 : bandSize;
	}
	return isBar ? void 0 : 0;
};
function getTooltipEntry(_ref4) {
	var { tooltipEntrySettings, dataKey, payload, value, name } = _ref4;
	return _objectSpread$29(_objectSpread$29({}, tooltipEntrySettings), {}, {
		dataKey,
		payload,
		value,
		name
	});
}
function getTooltipNameProp(nameFromItem, dataKey) {
	if (nameFromItem) return String(nameFromItem);
	if (typeof dataKey === "string") return dataKey;
}
var calculateCartesianTooltipPos = (coordinate, layout) => {
	if (layout === "horizontal") return coordinate.chartX;
	if (layout === "vertical") return coordinate.chartY;
};
var calculatePolarTooltipPos = (rangeObj, layout) => {
	if (layout === "centric") return rangeObj.angle;
	return rangeObj.radius;
};
var selectChartWidth = (state) => state.layout.width;
var selectChartHeight = (state) => state.layout.height;
var selectContainerScale = (state) => state.layout.scale;
var selectMargin = (state) => state.layout.margin;
var selectAllXAxes = createSelector((state) => state.cartesianAxis.xAxis, (xAxisMap) => {
	return Object.values(xAxisMap);
});
var selectAllYAxes = createSelector((state) => state.cartesianAxis.yAxis, (yAxisMap) => {
	return Object.values(yAxisMap);
});
var DATA_ITEM_INDEX_ATTRIBUTE_NAME = "data-recharts-item-index";
function ownKeys$28(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$28(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$28(Object(t), !0).forEach(function(r$1) {
			_defineProperty$30(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$28(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$30(e, r, t) {
	return (r = _toPropertyKey$30(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$30(t) {
	var i = _toPrimitive$30(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$30(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var selectBrushHeight = (state) => state.brush.height;
function selectLeftAxesOffset(state) {
	return selectAllYAxes(state).reduce((result, entry) => {
		if (entry.orientation === "left" && !entry.mirror && !entry.hide) return result + (typeof entry.width === "number" ? entry.width : 60);
		return result;
	}, 0);
}
function selectRightAxesOffset(state) {
	return selectAllYAxes(state).reduce((result, entry) => {
		if (entry.orientation === "right" && !entry.mirror && !entry.hide) return result + (typeof entry.width === "number" ? entry.width : 60);
		return result;
	}, 0);
}
function selectTopAxesOffset(state) {
	return selectAllXAxes(state).reduce((result, entry) => {
		if (entry.orientation === "top" && !entry.mirror && !entry.hide) return result + entry.height;
		return result;
	}, 0);
}
function selectBottomAxesOffset(state) {
	return selectAllXAxes(state).reduce((result, entry) => {
		if (entry.orientation === "bottom" && !entry.mirror && !entry.hide) return result + entry.height;
		return result;
	}, 0);
}
var selectChartOffsetInternal = createSelector([
	selectChartWidth,
	selectChartHeight,
	selectMargin,
	selectBrushHeight,
	selectLeftAxesOffset,
	selectRightAxesOffset,
	selectTopAxesOffset,
	selectBottomAxesOffset,
	selectLegendSettings,
	selectLegendSize
], (chartWidth, chartHeight, margin, brushHeight, leftAxesOffset, rightAxesOffset, topAxesOffset, bottomAxesOffset, legendSettings, legendSize) => {
	var offsetH = {
		left: (margin.left || 0) + leftAxesOffset,
		right: (margin.right || 0) + rightAxesOffset
	};
	var offset = _objectSpread$28(_objectSpread$28({}, {
		top: (margin.top || 0) + topAxesOffset,
		bottom: (margin.bottom || 0) + bottomAxesOffset
	}), offsetH);
	var brushBottom = offset.bottom;
	offset.bottom += brushHeight;
	offset = appendOffsetOfLegend(offset, legendSettings, legendSize);
	var offsetWidth = chartWidth - offset.left - offset.right;
	var offsetHeight = chartHeight - offset.top - offset.bottom;
	return _objectSpread$28(_objectSpread$28({ brushBottom }, offset), {}, {
		width: Math.max(offsetWidth, 0),
		height: Math.max(offsetHeight, 0)
	});
});
var selectChartViewBox = createSelector(selectChartOffsetInternal, (offset) => ({
	x: offset.left,
	y: offset.top,
	width: offset.width,
	height: offset.height
}));
var selectAxisViewBox = createSelector(selectChartWidth, selectChartHeight, (width, height) => ({
	x: 0,
	y: 0,
	width,
	height
}));
var PanoramaContext = /* @__PURE__ */ (0, import_react.createContext)(null);
var useIsPanorama = () => (0, import_react.useContext)(PanoramaContext) != null;
var selectBrushSettings = (state) => state.brush;
var selectBrushDimensions = createSelector([
	selectBrushSettings,
	selectChartOffsetInternal,
	selectMargin
], (brushSettings, offset, margin) => ({
	height: brushSettings.height,
	x: isNumber(brushSettings.x) ? brushSettings.x : offset.left,
	y: isNumber(brushSettings.y) ? brushSettings.y : offset.top + offset.height + offset.brushBottom - ((margin === null || margin === void 0 ? void 0 : margin.bottom) || 0),
	width: isNumber(brushSettings.width) ? brushSettings.width : offset.width
}));
var isDev = true;
var warn = function warn$1(condition, format) {
	for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
	if (isDev && typeof console !== "undefined" && console.warn) {
		if (format === void 0) console.warn("LogUtils requires an error message argument");
		if (!condition) if (format === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
		else {
			var argIndex = 0;
			console.warn(format.replace(/%s/g, () => args[argIndex++]));
		}
	}
};
var calculateChartDimensions = (containerWidth, containerHeight, props) => {
	var { width = "100%", height = "100%", aspect, maxHeight } = props;
	var calculatedWidth = isPercent(width) ? containerWidth : Number(width);
	var calculatedHeight = isPercent(height) ? containerHeight : Number(height);
	if (aspect && aspect > 0) {
		if (calculatedWidth) calculatedHeight = calculatedWidth / aspect;
		else if (calculatedHeight) calculatedWidth = calculatedHeight * aspect;
		if (maxHeight && calculatedHeight != null && calculatedHeight > maxHeight) calculatedHeight = maxHeight;
	}
	return {
		calculatedWidth,
		calculatedHeight
	};
};
var bothOverflow = {
	width: 0,
	height: 0,
	overflow: "visible"
};
var overflowX = {
	width: 0,
	overflowX: "visible"
};
var overflowY = {
	height: 0,
	overflowY: "visible"
};
var noStyle = {};
var getInnerDivStyle = (props) => {
	var { width, height } = props;
	var isWidthPercent = isPercent(width);
	var isHeightPercent = isPercent(height);
	if (isWidthPercent && isHeightPercent) return bothOverflow;
	if (isWidthPercent) return overflowX;
	if (isHeightPercent) return overflowY;
	return noStyle;
};
function getDefaultWidthAndHeight(_ref$1) {
	var { width, height, aspect } = _ref$1;
	var calculatedWidth = width;
	var calculatedHeight = height;
	if (calculatedWidth === void 0 && calculatedHeight === void 0) {
		calculatedWidth = "100%";
		calculatedHeight = "100%";
	} else if (calculatedWidth === void 0) calculatedWidth = aspect && aspect > 0 ? void 0 : "100%";
	else if (calculatedHeight === void 0) calculatedHeight = aspect && aspect > 0 ? void 0 : "100%";
	return {
		width: calculatedWidth,
		height: calculatedHeight
	};
}
function isWellBehavedNumber(n) {
	return Number.isFinite(n);
}
function isPositiveNumber(n) {
	return typeof n === "number" && n > 0 && Number.isFinite(n);
}
var import_throttle = /* @__PURE__ */ __toESM(require_throttle());
function _extends$19() {
	return _extends$19 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$19.apply(null, arguments);
}
function ownKeys$27(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$27(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$27(Object(t), !0).forEach(function(r$1) {
			_defineProperty$29(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$27(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$29(e, r, t) {
	return (r = _toPropertyKey$29(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$29(t) {
	var i = _toPrimitive$29(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$29(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var ResponsiveContainerContext = /* @__PURE__ */ (0, import_react.createContext)({
	width: -1,
	height: -1
});
function isAcceptableSize(size) {
	return isPositiveNumber(size.width) && isPositiveNumber(size.height);
}
function ResponsiveContainerContextProvider(_ref$1) {
	var { children, width, height } = _ref$1;
	var size = (0, import_react.useMemo)(() => ({
		width,
		height
	}), [width, height]);
	if (!isAcceptableSize(size)) return null;
	return /* @__PURE__ */ import_react.createElement(ResponsiveContainerContext.Provider, { value: size }, children);
}
var useResponsiveContainerContext = () => (0, import_react.useContext)(ResponsiveContainerContext);
var SizeDetectorContainer = /* @__PURE__ */ (0, import_react.forwardRef)((_ref2, ref) => {
	var { aspect, initialDimension = {
		width: -1,
		height: -1
	}, width, height, minWidth = 0, minHeight, maxHeight, children, debounce = 0, id, className, onResize, style = {} } = _ref2;
	var containerRef = (0, import_react.useRef)(null);
	var onResizeRef = (0, import_react.useRef)();
	onResizeRef.current = onResize;
	(0, import_react.useImperativeHandle)(ref, () => containerRef.current);
	var [sizes, setSizes] = (0, import_react.useState)({
		containerWidth: initialDimension.width,
		containerHeight: initialDimension.height
	});
	var setContainerSize = (0, import_react.useCallback)((newWidth, newHeight) => {
		setSizes((prevState) => {
			var roundedWidth = Math.round(newWidth);
			var roundedHeight = Math.round(newHeight);
			if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) return prevState;
			return {
				containerWidth: roundedWidth,
				containerHeight: roundedHeight
			};
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (containerRef.current == null || typeof ResizeObserver === "undefined") return noop;
		var callback = (entries) => {
			var _onResizeRef$current;
			var { width: containerWidth$2, height: containerHeight$2 } = entries[0].contentRect;
			setContainerSize(containerWidth$2, containerHeight$2);
			(_onResizeRef$current = onResizeRef.current) === null || _onResizeRef$current === void 0 || _onResizeRef$current.call(onResizeRef, containerWidth$2, containerHeight$2);
		};
		if (debounce > 0) callback = (0, import_throttle.default)(callback, debounce, {
			trailing: true,
			leading: false
		});
		var observer = new ResizeObserver(callback);
		var { width: containerWidth$1, height: containerHeight$1 } = containerRef.current.getBoundingClientRect();
		setContainerSize(containerWidth$1, containerHeight$1);
		observer.observe(containerRef.current);
		return () => {
			observer.disconnect();
		};
	}, [setContainerSize, debounce]);
	var { containerWidth, containerHeight } = sizes;
	warn(!aspect || aspect > 0, "The aspect(%s) must be greater than zero.", aspect);
	var { calculatedWidth, calculatedHeight } = calculateChartDimensions(containerWidth, containerHeight, {
		width,
		height,
		aspect,
		maxHeight
	});
	warn(calculatedWidth != null && calculatedWidth > 0 || calculatedHeight != null && calculatedHeight > 0, "The width(%s) and height(%s) of chart should be greater than 0,\n       please check the style of container, or the props width(%s) and height(%s),\n       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the\n       height and width.", calculatedWidth, calculatedHeight, width, height, minWidth, minHeight, aspect);
	return /* @__PURE__ */ import_react.createElement("div", {
		id: id ? "".concat(id) : void 0,
		className: clsx("recharts-responsive-container", className),
		style: _objectSpread$27(_objectSpread$27({}, style), {}, {
			width,
			height,
			minWidth,
			minHeight,
			maxHeight
		}),
		ref: containerRef
	}, /* @__PURE__ */ import_react.createElement("div", { style: getInnerDivStyle({
		width,
		height
	}) }, /* @__PURE__ */ import_react.createElement(ResponsiveContainerContextProvider, {
		width: calculatedWidth,
		height: calculatedHeight
	}, children)));
});
var ResponsiveContainer = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	var responsiveContainerContext = useResponsiveContainerContext();
	if (isPositiveNumber(responsiveContainerContext.width) && isPositiveNumber(responsiveContainerContext.height)) return props.children;
	var { width, height } = getDefaultWidthAndHeight({
		width: props.width,
		height: props.height,
		aspect: props.aspect
	});
	var { calculatedWidth, calculatedHeight } = calculateChartDimensions(void 0, void 0, {
		width,
		height,
		aspect: props.aspect,
		maxHeight: props.maxHeight
	});
	if (isNumber(calculatedWidth) && isNumber(calculatedHeight)) return /* @__PURE__ */ import_react.createElement(ResponsiveContainerContextProvider, {
		width: calculatedWidth,
		height: calculatedHeight
	}, props.children);
	return /* @__PURE__ */ import_react.createElement(SizeDetectorContainer, _extends$19({}, props, {
		width,
		height,
		ref
	}));
});
function cartesianViewBoxToTrapezoid(box) {
	if (!box) return;
	return {
		x: box.x,
		y: box.y,
		upperWidth: "upperWidth" in box ? box.upperWidth : box.width,
		lowerWidth: "lowerWidth" in box ? box.lowerWidth : box.width,
		width: box.width,
		height: box.height
	};
}
var useViewBox = () => {
	var _useAppSelector;
	var panorama = useIsPanorama();
	var rootViewBox = useAppSelector(selectChartViewBox);
	var brushDimensions = useAppSelector(selectBrushDimensions);
	var brushPadding = (_useAppSelector = useAppSelector(selectBrushSettings)) === null || _useAppSelector === void 0 ? void 0 : _useAppSelector.padding;
	if (!panorama || !brushDimensions || !brushPadding) return rootViewBox;
	return {
		width: brushDimensions.width - brushPadding.left - brushPadding.right,
		height: brushDimensions.height - brushPadding.top - brushPadding.bottom,
		x: brushPadding.left,
		y: brushPadding.top
	};
};
var manyComponentsThrowErrorsIfOffsetIsUndefined = {
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	width: 0,
	height: 0,
	brushBottom: 0
};
var useOffsetInternal = () => {
	var _useAppSelector2;
	return (_useAppSelector2 = useAppSelector(selectChartOffsetInternal)) !== null && _useAppSelector2 !== void 0 ? _useAppSelector2 : manyComponentsThrowErrorsIfOffsetIsUndefined;
};
var useChartWidth = () => {
	return useAppSelector(selectChartWidth);
};
var useChartHeight = () => {
	return useAppSelector(selectChartHeight);
};
var selectChartLayout = (state) => state.layout.layoutType;
var useChartLayout = () => useAppSelector(selectChartLayout);
var useCartesianChartLayout = () => {
	var layout = useChartLayout();
	if (layout === "horizontal" || layout === "vertical") return layout;
};
var useIsInChartContext = () => {
	return useChartLayout() !== void 0;
};
var ReportChartSize = (props) => {
	var dispatch = useAppDispatch();
	var isPanorama = useIsPanorama();
	var { width: widthFromProps, height: heightFromProps } = props;
	var responsiveContainerCalculations = useResponsiveContainerContext();
	var width = widthFromProps;
	var height = heightFromProps;
	if (responsiveContainerCalculations) {
		width = responsiveContainerCalculations.width > 0 ? responsiveContainerCalculations.width : widthFromProps;
		height = responsiveContainerCalculations.height > 0 ? responsiveContainerCalculations.height : heightFromProps;
	}
	(0, import_react.useEffect)(() => {
		if (!isPanorama && isPositiveNumber(width) && isPositiveNumber(height)) dispatch(setChartSize({
			width,
			height
		}));
	}, [
		dispatch,
		isPanorama,
		width,
		height
	]);
	return null;
};
var legendSlice = createSlice({
	name: "legend",
	initialState: {
		settings: {
			layout: "horizontal",
			align: "center",
			verticalAlign: "middle",
			itemSorter: "value"
		},
		size: {
			width: 0,
			height: 0
		},
		payload: []
	},
	reducers: {
		setLegendSize(state, action) {
			state.size.width = action.payload.width;
			state.size.height = action.payload.height;
		},
		setLegendSettings(state, action) {
			state.settings.align = action.payload.align;
			state.settings.layout = action.payload.layout;
			state.settings.verticalAlign = action.payload.verticalAlign;
			state.settings.itemSorter = action.payload.itemSorter;
		},
		addLegendPayload: {
			reducer(state, action) {
				state.payload.push(castDraft(action.payload));
			},
			prepare: prepareAutoBatched()
		},
		replaceLegendPayload: {
			reducer(state, action) {
				var { prev, next } = action.payload;
				var index = current(state).payload.indexOf(castDraft(prev));
				if (index > -1) state.payload[index] = castDraft(next);
			},
			prepare: prepareAutoBatched()
		},
		removeLegendPayload: {
			reducer(state, action) {
				var index = current(state).payload.indexOf(castDraft(action.payload));
				if (index > -1) state.payload.splice(index, 1);
			},
			prepare: prepareAutoBatched()
		}
	}
});
var { setLegendSize, setLegendSettings, addLegendPayload, replaceLegendPayload, removeLegendPayload } = legendSlice.actions;
var legendReducer = legendSlice.reducer;
var import_sortBy$1 = /* @__PURE__ */ __toESM(require_sortBy());
function _extends$18() {
	return _extends$18 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$18.apply(null, arguments);
}
function ownKeys$26(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$26(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$26(Object(t), !0).forEach(function(r$1) {
			_defineProperty$28(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$26(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$28(e, r, t) {
	return (r = _toPropertyKey$28(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$28(t) {
	var i = _toPrimitive$28(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$28(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function defaultFormatter(value) {
	return Array.isArray(value) && isNumOrStr(value[0]) && isNumOrStr(value[1]) ? value.join(" ~ ") : value;
}
var DefaultTooltipContent = (props) => {
	var { separator = " : ", contentStyle = {}, itemStyle = {}, labelStyle = {}, payload, formatter, itemSorter, wrapperClassName, labelClassName, label, labelFormatter, accessibilityLayer = false } = props;
	var renderContent$1 = () => {
		if (payload && payload.length) {
			var listStyle = {
				padding: 0,
				margin: 0
			};
			var items = (itemSorter ? (0, import_sortBy$1.default)(payload, itemSorter) : payload).map((entry, i) => {
				if (entry.type === "none") return null;
				var finalFormatter = entry.formatter || formatter || defaultFormatter;
				var { value, name } = entry;
				var finalValue = value;
				var finalName = name;
				if (finalFormatter) {
					var formatted = finalFormatter(value, name, entry, i, payload);
					if (Array.isArray(formatted)) [finalValue, finalName] = formatted;
					else if (formatted != null) finalValue = formatted;
					else return null;
				}
				var finalItemStyle = _objectSpread$26({
					display: "block",
					paddingTop: 4,
					paddingBottom: 4,
					color: entry.color || "#000"
				}, itemStyle);
				return /* @__PURE__ */ import_react.createElement("li", {
					className: "recharts-tooltip-item",
					key: "tooltip-item-".concat(i),
					style: finalItemStyle
				}, isNumOrStr(finalName) ? /* @__PURE__ */ import_react.createElement("span", { className: "recharts-tooltip-item-name" }, finalName) : null, isNumOrStr(finalName) ? /* @__PURE__ */ import_react.createElement("span", { className: "recharts-tooltip-item-separator" }, separator) : null, /* @__PURE__ */ import_react.createElement("span", { className: "recharts-tooltip-item-value" }, finalValue), /* @__PURE__ */ import_react.createElement("span", { className: "recharts-tooltip-item-unit" }, entry.unit || ""));
			});
			return /* @__PURE__ */ import_react.createElement("ul", {
				className: "recharts-tooltip-item-list",
				style: listStyle
			}, items);
		}
		return null;
	};
	var finalStyle = _objectSpread$26({
		margin: 0,
		padding: 10,
		backgroundColor: "#fff",
		border: "1px solid #ccc",
		whiteSpace: "nowrap"
	}, contentStyle);
	var finalLabelStyle = _objectSpread$26({ margin: 0 }, labelStyle);
	var hasLabel = !isNullish(label);
	var finalLabel = hasLabel ? label : "";
	var wrapperCN = clsx("recharts-default-tooltip", wrapperClassName);
	var labelCN = clsx("recharts-tooltip-label", labelClassName);
	if (hasLabel && labelFormatter && payload !== void 0 && payload !== null) finalLabel = labelFormatter(label, payload);
	var accessibilityAttributes = accessibilityLayer ? {
		role: "status",
		"aria-live": "assertive"
	} : {};
	return /* @__PURE__ */ import_react.createElement("div", _extends$18({
		className: wrapperCN,
		style: finalStyle
	}, accessibilityAttributes), /* @__PURE__ */ import_react.createElement("p", {
		className: labelCN,
		style: finalLabelStyle
	}, /* @__PURE__ */ import_react.isValidElement(finalLabel) ? finalLabel : "".concat(finalLabel)), renderContent$1());
};
var CSS_CLASS_PREFIX = "recharts-tooltip-wrapper";
var TOOLTIP_HIDDEN = { visibility: "hidden" };
function getTooltipCSSClassName(_ref$1) {
	var { coordinate, translateX, translateY } = _ref$1;
	return clsx(CSS_CLASS_PREFIX, {
		["".concat(CSS_CLASS_PREFIX, "-right")]: isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX >= coordinate.x,
		["".concat(CSS_CLASS_PREFIX, "-left")]: isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX < coordinate.x,
		["".concat(CSS_CLASS_PREFIX, "-bottom")]: isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY >= coordinate.y,
		["".concat(CSS_CLASS_PREFIX, "-top")]: isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY < coordinate.y
	});
}
function getTooltipTranslateXY(_ref2) {
	var { allowEscapeViewBox, coordinate, key, offsetTopLeft, position, reverseDirection, tooltipDimension, viewBox, viewBoxDimension } = _ref2;
	if (position && isNumber(position[key])) return position[key];
	var negative = coordinate[key] - tooltipDimension - (offsetTopLeft > 0 ? offsetTopLeft : 0);
	var positive = coordinate[key] + offsetTopLeft;
	if (allowEscapeViewBox[key]) return reverseDirection[key] ? negative : positive;
	var viewBoxKey = viewBox[key];
	if (viewBoxKey == null) return 0;
	if (reverseDirection[key]) {
		if (negative < viewBoxKey) return Math.max(positive, viewBoxKey);
		return Math.max(negative, viewBoxKey);
	}
	if (viewBoxDimension == null) return 0;
	if (positive + tooltipDimension > viewBoxKey + viewBoxDimension) return Math.max(negative, viewBoxKey);
	return Math.max(positive, viewBoxKey);
}
function getTransformStyle(_ref3) {
	var { translateX, translateY, useTranslate3d } = _ref3;
	return { transform: useTranslate3d ? "translate3d(".concat(translateX, "px, ").concat(translateY, "px, 0)") : "translate(".concat(translateX, "px, ").concat(translateY, "px)") };
}
function getTooltipTranslate(_ref4) {
	var { allowEscapeViewBox, coordinate, offsetTopLeft, position, reverseDirection, tooltipBox, useTranslate3d, viewBox } = _ref4;
	var cssProperties, translateX, translateY;
	if (tooltipBox.height > 0 && tooltipBox.width > 0 && coordinate) {
		translateX = getTooltipTranslateXY({
			allowEscapeViewBox,
			coordinate,
			key: "x",
			offsetTopLeft,
			position,
			reverseDirection,
			tooltipDimension: tooltipBox.width,
			viewBox,
			viewBoxDimension: viewBox.width
		});
		translateY = getTooltipTranslateXY({
			allowEscapeViewBox,
			coordinate,
			key: "y",
			offsetTopLeft,
			position,
			reverseDirection,
			tooltipDimension: tooltipBox.height,
			viewBox,
			viewBoxDimension: viewBox.height
		});
		cssProperties = getTransformStyle({
			translateX,
			translateY,
			useTranslate3d
		});
	} else cssProperties = TOOLTIP_HIDDEN;
	return {
		cssProperties,
		cssClasses: getTooltipCSSClassName({
			translateX,
			translateY,
			coordinate
		})
	};
}
function ownKeys$25(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$25(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$25(Object(t), !0).forEach(function(r$1) {
			_defineProperty$27(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$25(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$27(e, r, t) {
	return (r = _toPropertyKey$27(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$27(t) {
	var i = _toPrimitive$27(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$27(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var TooltipBoundingBox = class extends import_react.PureComponent {
	constructor() {
		super(...arguments);
		_defineProperty$27(this, "state", {
			dismissed: false,
			dismissedAtCoordinate: {
				x: 0,
				y: 0
			}
		});
		_defineProperty$27(this, "handleKeyDown", (event) => {
			if (event.key === "Escape") {
				var _this$props$coordinat, _this$props$coordinat2, _this$props$coordinat3, _this$props$coordinat4;
				this.setState({
					dismissed: true,
					dismissedAtCoordinate: {
						x: (_this$props$coordinat = (_this$props$coordinat2 = this.props.coordinate) === null || _this$props$coordinat2 === void 0 ? void 0 : _this$props$coordinat2.x) !== null && _this$props$coordinat !== void 0 ? _this$props$coordinat : 0,
						y: (_this$props$coordinat3 = (_this$props$coordinat4 = this.props.coordinate) === null || _this$props$coordinat4 === void 0 ? void 0 : _this$props$coordinat4.y) !== null && _this$props$coordinat3 !== void 0 ? _this$props$coordinat3 : 0
					}
				});
			}
		});
	}
	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyDown);
	}
	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyDown);
	}
	componentDidUpdate() {
		var _this$props$coordinat5, _this$props$coordinat6;
		if (!this.state.dismissed) return;
		if (((_this$props$coordinat5 = this.props.coordinate) === null || _this$props$coordinat5 === void 0 ? void 0 : _this$props$coordinat5.x) !== this.state.dismissedAtCoordinate.x || ((_this$props$coordinat6 = this.props.coordinate) === null || _this$props$coordinat6 === void 0 ? void 0 : _this$props$coordinat6.y) !== this.state.dismissedAtCoordinate.y) this.state.dismissed = false;
	}
	render() {
		var { active, allowEscapeViewBox, animationDuration, animationEasing, children, coordinate, hasPayload, isAnimationActive, offset, position, reverseDirection, useTranslate3d, viewBox, wrapperStyle, lastBoundingBox, innerRef, hasPortalFromProps } = this.props;
		var { cssClasses, cssProperties } = getTooltipTranslate({
			allowEscapeViewBox,
			coordinate,
			offsetTopLeft: offset,
			position,
			reverseDirection,
			tooltipBox: {
				height: lastBoundingBox.height,
				width: lastBoundingBox.width
			},
			useTranslate3d,
			viewBox
		});
		var outerStyle = _objectSpread$25(_objectSpread$25({}, hasPortalFromProps ? {} : _objectSpread$25(_objectSpread$25({ transition: isAnimationActive && active ? "transform ".concat(animationDuration, "ms ").concat(animationEasing) : void 0 }, cssProperties), {}, {
			pointerEvents: "none",
			visibility: !this.state.dismissed && active && hasPayload ? "visible" : "hidden",
			position: "absolute",
			top: 0,
			left: 0
		})), {}, { visibility: !this.state.dismissed && active && hasPayload ? "visible" : "hidden" }, wrapperStyle);
		return /* @__PURE__ */ import_react.createElement("div", {
			xmlns: "http://www.w3.org/1999/xhtml",
			tabIndex: -1,
			className: cssClasses,
			style: outerStyle,
			ref: innerRef
		}, children);
	}
};
var useAccessibilityLayer = () => {
	var _useAppSelector;
	return (_useAppSelector = useAppSelector((state) => state.rootProps.accessibilityLayer)) !== null && _useAppSelector !== void 0 ? _useAppSelector : true;
};
function _extends$17() {
	return _extends$17 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$17.apply(null, arguments);
}
function ownKeys$24(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$24(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$24(Object(t), !0).forEach(function(r$1) {
			_defineProperty$26(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$24(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$26(e, r, t) {
	return (r = _toPropertyKey$26(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$26(t) {
	var i = _toPrimitive$26(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$26(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var CURVE_FACTORIES = {
	curveBasisClosed: basisClosed_default,
	curveBasisOpen: basisOpen_default,
	curveBasis: basis_default,
	curveBumpX: bumpX,
	curveBumpY: bumpY,
	curveLinearClosed: linearClosed_default,
	curveLinear: linear_default,
	curveMonotoneX: monotoneX,
	curveMonotoneY: monotoneY,
	curveNatural: natural_default,
	curveStep: step_default,
	curveStepAfter: stepAfter,
	curveStepBefore: stepBefore
};
var defined = (p) => isWellBehavedNumber(p.x) && isWellBehavedNumber(p.y);
var areaDefined = (d) => d.base != null && defined(d.base) && defined(d);
var getX = (p) => p.x;
var getY = (p) => p.y;
var getCurveFactory = (type, layout) => {
	if (typeof type === "function") return type;
	var name = "curve".concat(upperFirst(type));
	if ((name === "curveMonotone" || name === "curveBump") && layout) return CURVE_FACTORIES["".concat(name).concat(layout === "vertical" ? "Y" : "X")];
	return CURVE_FACTORIES[name] || linear_default;
};
var getPath$1 = (_ref$1) => {
	var { type = "linear", points = [], baseLine, layout, connectNulls = false } = _ref$1;
	var curveFactory = getCurveFactory(type, layout);
	var formatPoints = connectNulls ? points.filter(defined) : points;
	var lineFunction;
	if (Array.isArray(baseLine)) {
		var areaPoints = points.map((entry, index) => _objectSpread$24(_objectSpread$24({}, entry), {}, { base: baseLine[index] }));
		if (layout === "vertical") lineFunction = area_default().y(getY).x1(getX).x0((d) => d.base.x);
		else lineFunction = area_default().x(getX).y1(getY).y0((d) => d.base.y);
		return lineFunction.defined(areaDefined).curve(curveFactory)(connectNulls ? areaPoints.filter(areaDefined) : areaPoints);
	}
	if (layout === "vertical" && isNumber(baseLine)) lineFunction = area_default().y(getY).x1(getX).x0(baseLine);
	else if (isNumber(baseLine)) lineFunction = area_default().x(getX).y1(getY).y0(baseLine);
	else lineFunction = line_default().x(getX).y(getY);
	return lineFunction.defined(defined).curve(curveFactory)(formatPoints);
};
var Curve = (props) => {
	var { className, points, path, pathRef } = props;
	if ((!points || !points.length) && !path) return null;
	var realPath = points && points.length ? getPath$1(props) : path;
	return /* @__PURE__ */ import_react.createElement("path", _extends$17({}, svgPropertiesNoEvents(props), adaptEventHandlers(props), {
		className: clsx("recharts-curve", className),
		d: realPath === null ? void 0 : realPath,
		ref: pathRef
	}));
};
var _excluded$14 = [
	"x",
	"y",
	"top",
	"left",
	"width",
	"height",
	"className"
];
function _extends$16() {
	return _extends$16 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$16.apply(null, arguments);
}
function ownKeys$23(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$23(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$23(Object(t), !0).forEach(function(r$1) {
			_defineProperty$25(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$23(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$25(e, r, t) {
	return (r = _toPropertyKey$25(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$25(t) {
	var i = _toPrimitive$25(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$25(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$14(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$14(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$14(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var getPath = (x, y, width, height, top, left) => {
	return "M".concat(x, ",").concat(top, "v").concat(height, "M").concat(left, ",").concat(y, "h").concat(width);
};
var Cross = (_ref$1) => {
	var { x = 0, y = 0, top = 0, left = 0, width = 0, height = 0, className } = _ref$1, rest = _objectWithoutProperties$14(_ref$1, _excluded$14);
	var props = _objectSpread$23({
		x,
		y,
		top,
		left,
		width,
		height
	}, rest);
	if (!isNumber(x) || !isNumber(y) || !isNumber(width) || !isNumber(height) || !isNumber(top) || !isNumber(left)) return null;
	return /* @__PURE__ */ import_react.createElement("path", _extends$16({}, svgPropertiesAndEvents(props), {
		className: clsx("recharts-cross", className),
		d: getPath(x, y, width, height, top, left)
	}));
};
function getCursorRectangle(layout, activeCoordinate, offset, tooltipAxisBandSize) {
	var halfSize = tooltipAxisBandSize / 2;
	return {
		stroke: "none",
		fill: "#ccc",
		x: layout === "horizontal" ? activeCoordinate.x - halfSize : offset.left + .5,
		y: layout === "horizontal" ? offset.top + .5 : activeCoordinate.y - halfSize,
		width: layout === "horizontal" ? tooltipAxisBandSize : offset.width - 1,
		height: layout === "horizontal" ? offset.height - 1 : tooltipAxisBandSize
	};
}
function ownKeys$22(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$22(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$22(Object(t), !0).forEach(function(r$1) {
			_defineProperty$24(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$22(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$24(e, r, t) {
	return (r = _toPropertyKey$24(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$24(t) {
	var i = _toPrimitive$24(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$24(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var getDashCase = (name) => name.replace(/([A-Z])/g, (v) => "-".concat(v.toLowerCase()));
var getTransitionVal = (props, duration, easing) => props.map((prop) => "".concat(getDashCase(prop), " ").concat(duration, "ms ").concat(easing)).join(",");
var getIntersectionKeys = (preObj, nextObj) => [Object.keys(preObj), Object.keys(nextObj)].reduce((a, b) => a.filter((c) => b.includes(c)));
var mapObject = (fn, obj) => Object.keys(obj).reduce((res, key) => _objectSpread$22(_objectSpread$22({}, res), {}, { [key]: fn(key, obj[key]) }), {});
function ownKeys$21(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$21(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$21(Object(t), !0).forEach(function(r$1) {
			_defineProperty$23(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$21(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$23(e, r, t) {
	return (r = _toPropertyKey$23(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$23(t) {
	var i = _toPrimitive$23(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$23(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var alpha = (begin, end, k) => begin + (end - begin) * k;
var needContinue = (_ref$1) => {
	var { from: from$1, to: to$1 } = _ref$1;
	return from$1 !== to$1;
};
var calStepperVals = (easing, preVals, steps) => {
	var nextStepVals = mapObject((key, val) => {
		if (needContinue(val)) {
			var [newX, newV] = easing(val.from, val.to, val.velocity);
			return _objectSpread$21(_objectSpread$21({}, val), {}, {
				from: newX,
				velocity: newV
			});
		}
		return val;
	}, preVals);
	if (steps < 1) return mapObject((key, val) => {
		if (needContinue(val)) return _objectSpread$21(_objectSpread$21({}, val), {}, {
			velocity: alpha(val.velocity, nextStepVals[key].velocity, steps),
			from: alpha(val.from, nextStepVals[key].from, steps)
		});
		return val;
	}, preVals);
	return calStepperVals(easing, nextStepVals, steps - 1);
};
function createStepperUpdate(from$1, to$1, easing, interKeys, render, timeoutController) {
	var preTime;
	var stepperStyle = interKeys.reduce((res, key) => _objectSpread$21(_objectSpread$21({}, res), {}, { [key]: {
		from: from$1[key],
		velocity: 0,
		to: to$1[key]
	} }), {});
	var getCurrStyle = () => mapObject((key, val) => val.from, stepperStyle);
	var shouldStopAnimation = () => !Object.values(stepperStyle).filter(needContinue).length;
	var stopAnimation = null;
	var stepperUpdate = (now) => {
		if (!preTime) preTime = now;
		var steps = (now - preTime) / easing.dt;
		stepperStyle = calStepperVals(easing, stepperStyle, steps);
		render(_objectSpread$21(_objectSpread$21(_objectSpread$21({}, from$1), to$1), getCurrStyle()));
		preTime = now;
		if (!shouldStopAnimation()) stopAnimation = timeoutController.setTimeout(stepperUpdate);
	};
	return () => {
		stopAnimation = timeoutController.setTimeout(stepperUpdate);
		return () => {
			var _stopAnimation;
			(_stopAnimation = stopAnimation) === null || _stopAnimation === void 0 || _stopAnimation();
		};
	};
}
function createTimingUpdate(from$1, to$1, easing, duration, interKeys, render, timeoutController) {
	var stopAnimation = null;
	var timingStyle = interKeys.reduce((res, key) => _objectSpread$21(_objectSpread$21({}, res), {}, { [key]: [from$1[key], to$1[key]] }), {});
	var beginTime;
	var timingUpdate = (now) => {
		if (!beginTime) beginTime = now;
		var t = (now - beginTime) / duration;
		var currStyle = mapObject((key, val) => alpha(...val, easing(t)), timingStyle);
		render(_objectSpread$21(_objectSpread$21(_objectSpread$21({}, from$1), to$1), currStyle));
		if (t < 1) stopAnimation = timeoutController.setTimeout(timingUpdate);
		else {
			var finalStyle = mapObject((key, val) => alpha(...val, easing(1)), timingStyle);
			render(_objectSpread$21(_objectSpread$21(_objectSpread$21({}, from$1), to$1), finalStyle));
		}
	};
	return () => {
		stopAnimation = timeoutController.setTimeout(timingUpdate);
		return () => {
			var _stopAnimation2;
			(_stopAnimation2 = stopAnimation) === null || _stopAnimation2 === void 0 || _stopAnimation2();
		};
	};
}
var configUpdate_default = (from$1, to$1, easing, duration, render, timeoutController) => {
	var interKeys = getIntersectionKeys(from$1, to$1);
	if (easing == null) return () => {
		render(_objectSpread$21(_objectSpread$21({}, from$1), to$1));
		return () => {};
	};
	return easing.isStepper === true ? createStepperUpdate(from$1, to$1, easing, interKeys, render, timeoutController) : createTimingUpdate(from$1, to$1, easing, duration, interKeys, render, timeoutController);
};
var cubicBezierFactor = (c1, c2) => [
	0,
	3 * c1,
	3 * c2 - 6 * c1,
	3 * c1 - 3 * c2 + 1
];
var evaluatePolynomial = (params, t) => params.map((param, i) => param * t ** i).reduce((pre, curr) => pre + curr);
var cubicBezier = (c1, c2) => (t) => {
	return evaluatePolynomial(cubicBezierFactor(c1, c2), t);
};
var derivativeCubicBezier = (c1, c2) => (t) => {
	return evaluatePolynomial([...cubicBezierFactor(c1, c2).map((param, i) => param * i).slice(1), 0], t);
};
var getBezierCoordinates = function getBezierCoordinates$1() {
	for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	if (args.length === 1) switch (args[0]) {
		case "linear": return [
			0,
			0,
			1,
			1
		];
		case "ease": return [
			.25,
			.1,
			.25,
			1
		];
		case "ease-in": return [
			.42,
			0,
			1,
			1
		];
		case "ease-out": return [
			.42,
			0,
			.58,
			1
		];
		case "ease-in-out": return [
			0,
			0,
			.58,
			1
		];
		default:
			var _easing$;
			var easing = args[0].split("(");
			if (easing[0] === "cubic-bezier" && ((_easing$ = easing[1]) === null || _easing$ === void 0 ? void 0 : _easing$.split(")")[0].split(",").length) === 4) {
				var coords = easing[1].split(")")[0].split(",").map((x) => parseFloat(x));
				return [
					coords[0],
					coords[1],
					coords[2],
					coords[3]
				];
			}
	}
	if (args.length === 4) return args;
	return [
		0,
		0,
		1,
		1
	];
};
var createBezierEasing = (x1, y1, x2, y2) => {
	var curveX = cubicBezier(x1, x2);
	var curveY = cubicBezier(y1, y2);
	var derCurveX = derivativeCubicBezier(x1, x2);
	var rangeValue = (value) => {
		if (value > 1) return 1;
		if (value < 0) return 0;
		return value;
	};
	var bezier = (_t) => {
		var t = _t > 1 ? 1 : _t;
		var x = t;
		for (var i = 0; i < 8; ++i) {
			var evalT = curveX(x) - t;
			var derVal = derCurveX(x);
			if (Math.abs(evalT - t) < 1e-4 || derVal < 1e-4) return curveY(x);
			x = rangeValue(x - evalT / derVal);
		}
		return curveY(x);
	};
	bezier.isStepper = false;
	return bezier;
};
var configBezier = function configBezier$1() {
	return createBezierEasing(...getBezierCoordinates(...arguments));
};
var configSpring = function configSpring$1() {
	var { stiff = 100, damping = 8, dt = 17 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
	var stepper = (currX, destX, currV) => {
		var newV = currV + (-(currX - destX) * stiff - currV * damping) * dt / 1e3;
		var newX = currV * dt / 1e3 + currX;
		if (Math.abs(newX - destX) < 1e-4 && Math.abs(newV) < 1e-4) return [destX, 0];
		return [newX, newV];
	};
	stepper.isStepper = true;
	stepper.dt = dt;
	return stepper;
};
var configEasing = (easing) => {
	if (typeof easing === "string") switch (easing) {
		case "ease":
		case "ease-in-out":
		case "ease-out":
		case "ease-in":
		case "linear": return configBezier(easing);
		case "spring": return configSpring();
		default: if (easing.split("(")[0] === "cubic-bezier") return configBezier(easing);
	}
	if (typeof easing === "function") return easing;
	return null;
};
function createAnimateManager(timeoutController) {
	var currStyle;
	var handleChange = () => null;
	var shouldStop = false;
	var cancelTimeout = null;
	var setStyle = (_style) => {
		if (shouldStop) return;
		if (Array.isArray(_style)) {
			if (!_style.length) return;
			var [curr, ...restStyles] = _style;
			if (typeof curr === "number") {
				cancelTimeout = timeoutController.setTimeout(setStyle.bind(null, restStyles), curr);
				return;
			}
			setStyle(curr);
			cancelTimeout = timeoutController.setTimeout(setStyle.bind(null, restStyles));
			return;
		}
		if (typeof _style === "string") {
			currStyle = _style;
			handleChange(currStyle);
		}
		if (typeof _style === "object") {
			currStyle = _style;
			handleChange(currStyle);
		}
		if (typeof _style === "function") _style();
	};
	return {
		stop: () => {
			shouldStop = true;
		},
		start: (style) => {
			shouldStop = false;
			if (cancelTimeout) {
				cancelTimeout();
				cancelTimeout = null;
			}
			setStyle(style);
		},
		subscribe: (_handleChange) => {
			handleChange = _handleChange;
			return () => {
				handleChange = () => null;
			};
		},
		getTimeoutController: () => timeoutController
	};
}
var RequestAnimationFrameTimeoutController = class {
	setTimeout(callback) {
		var delay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
		var startTime = performance.now();
		var requestId = null;
		var executeCallback = (now) => {
			if (now - startTime >= delay) callback(now);
			else if (typeof requestAnimationFrame === "function") requestId = requestAnimationFrame(executeCallback);
		};
		requestId = requestAnimationFrame(executeCallback);
		return () => {
			if (requestId != null) cancelAnimationFrame(requestId);
		};
	}
};
function createDefaultAnimationManager() {
	return createAnimateManager(new RequestAnimationFrameTimeoutController());
}
var AnimationManagerContext = /* @__PURE__ */ (0, import_react.createContext)(createDefaultAnimationManager);
function useAnimationManager(animationId, animationManagerFromProps) {
	var contextAnimationManager = (0, import_react.useContext)(AnimationManagerContext);
	return (0, import_react.useMemo)(() => animationManagerFromProps !== null && animationManagerFromProps !== void 0 ? animationManagerFromProps : contextAnimationManager(animationId), [
		animationId,
		animationManagerFromProps,
		contextAnimationManager
	]);
}
var parseIsSsrByDefault = () => !(typeof window !== "undefined" && window.document && Boolean(window.document.createElement) && window.setTimeout);
var Global = {
	devToolsEnabled: false,
	isSsr: parseIsSsrByDefault()
};
var defaultJavascriptAnimateProps = {
	begin: 0,
	duration: 1e3,
	easing: "ease",
	isActive: true,
	canBegin: true,
	onAnimationEnd: () => {},
	onAnimationStart: () => {}
};
var from = { t: 0 };
var to = { t: 1 };
function JavascriptAnimate(outsideProps) {
	var props = resolveDefaultProps(outsideProps, defaultJavascriptAnimateProps);
	var { isActive: isActiveProp, canBegin, duration, easing, begin, onAnimationEnd, onAnimationStart, children } = props;
	var isActive = isActiveProp === "auto" ? !Global.isSsr : isActiveProp;
	var animationManager = useAnimationManager(props.animationId, props.animationManager);
	var [style, setStyle] = (0, import_react.useState)(isActive ? from : to);
	var stopJSAnimation = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!isActive) setStyle(to);
	}, [isActive]);
	(0, import_react.useEffect)(() => {
		if (!isActive || !canBegin) return noop;
		var startAnimation = configUpdate_default(from, to, configEasing(easing), duration, setStyle, animationManager.getTimeoutController());
		var onAnimationActive = () => {
			stopJSAnimation.current = startAnimation();
		};
		animationManager.start([
			onAnimationStart,
			begin,
			onAnimationActive,
			duration,
			onAnimationEnd
		]);
		return () => {
			animationManager.stop();
			if (stopJSAnimation.current) stopJSAnimation.current();
			onAnimationEnd();
		};
	}, [
		isActive,
		canBegin,
		duration,
		easing,
		begin,
		onAnimationStart,
		onAnimationEnd,
		animationManager
	]);
	return children(style.t);
}
function useAnimationId(input) {
	var prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-";
	var animationId = (0, import_react.useRef)(uniqueId(prefix));
	var prevProps = (0, import_react.useRef)(input);
	if (prevProps.current !== input) {
		animationId.current = uniqueId(prefix);
		prevProps.current = input;
	}
	return animationId.current;
}
var _excluded$13 = ["radius"], _excluded2$7 = ["radius"];
function ownKeys$20(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$20(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$20(Object(t), !0).forEach(function(r$1) {
			_defineProperty$22(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$20(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$22(e, r, t) {
	return (r = _toPropertyKey$22(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$22(t) {
	var i = _toPrimitive$22(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$22(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$15() {
	return _extends$15 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$15.apply(null, arguments);
}
function _objectWithoutProperties$13(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$13(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$13(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var getRectanglePath = (x, y, width, height, radius) => {
	var maxRadius = Math.min(Math.abs(width) / 2, Math.abs(height) / 2);
	var ySign = height >= 0 ? 1 : -1;
	var xSign = width >= 0 ? 1 : -1;
	var clockWise = height >= 0 && width >= 0 || height < 0 && width < 0 ? 1 : 0;
	var path;
	if (maxRadius > 0 && radius instanceof Array) {
		var newRadius = [
			0,
			0,
			0,
			0
		];
		for (var i = 0, len = 4; i < len; i++) newRadius[i] = radius[i] > maxRadius ? maxRadius : radius[i];
		path = "M".concat(x, ",").concat(y + ySign * newRadius[0]);
		if (newRadius[0] > 0) path += "A ".concat(newRadius[0], ",").concat(newRadius[0], ",0,0,").concat(clockWise, ",").concat(x + xSign * newRadius[0], ",").concat(y);
		path += "L ".concat(x + width - xSign * newRadius[1], ",").concat(y);
		if (newRadius[1] > 0) path += "A ".concat(newRadius[1], ",").concat(newRadius[1], ",0,0,").concat(clockWise, ",\n        ").concat(x + width, ",").concat(y + ySign * newRadius[1]);
		path += "L ".concat(x + width, ",").concat(y + height - ySign * newRadius[2]);
		if (newRadius[2] > 0) path += "A ".concat(newRadius[2], ",").concat(newRadius[2], ",0,0,").concat(clockWise, ",\n        ").concat(x + width - xSign * newRadius[2], ",").concat(y + height);
		path += "L ".concat(x + xSign * newRadius[3], ",").concat(y + height);
		if (newRadius[3] > 0) path += "A ".concat(newRadius[3], ",").concat(newRadius[3], ",0,0,").concat(clockWise, ",\n        ").concat(x, ",").concat(y + height - ySign * newRadius[3]);
		path += "Z";
	} else if (maxRadius > 0 && radius === +radius && radius > 0) {
		var _newRadius = Math.min(maxRadius, radius);
		path = "M ".concat(x, ",").concat(y + ySign * _newRadius, "\n            A ").concat(_newRadius, ",").concat(_newRadius, ",0,0,").concat(clockWise, ",").concat(x + xSign * _newRadius, ",").concat(y, "\n            L ").concat(x + width - xSign * _newRadius, ",").concat(y, "\n            A ").concat(_newRadius, ",").concat(_newRadius, ",0,0,").concat(clockWise, ",").concat(x + width, ",").concat(y + ySign * _newRadius, "\n            L ").concat(x + width, ",").concat(y + height - ySign * _newRadius, "\n            A ").concat(_newRadius, ",").concat(_newRadius, ",0,0,").concat(clockWise, ",").concat(x + width - xSign * _newRadius, ",").concat(y + height, "\n            L ").concat(x + xSign * _newRadius, ",").concat(y + height, "\n            A ").concat(_newRadius, ",").concat(_newRadius, ",0,0,").concat(clockWise, ",").concat(x, ",").concat(y + height - ySign * _newRadius, " Z");
	} else path = "M ".concat(x, ",").concat(y, " h ").concat(width, " v ").concat(height, " h ").concat(-width, " Z");
	return path;
};
var defaultRectangleProps = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	radius: 0,
	isAnimationActive: false,
	isUpdateAnimationActive: false,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease"
};
var Rectangle = (rectangleProps) => {
	var props = resolveDefaultProps(rectangleProps, defaultRectangleProps);
	var pathRef = (0, import_react.useRef)(null);
	var [totalLength, setTotalLength] = (0, import_react.useState)(-1);
	(0, import_react.useEffect)(() => {
		if (pathRef.current && pathRef.current.getTotalLength) try {
			var pathTotalLength = pathRef.current.getTotalLength();
			if (pathTotalLength) setTotalLength(pathTotalLength);
		} catch (_unused) {}
	}, []);
	var { x, y, width, height, radius, className } = props;
	var { animationEasing, animationDuration, animationBegin, isAnimationActive, isUpdateAnimationActive } = props;
	var prevWidthRef = (0, import_react.useRef)(width);
	var prevHeightRef = (0, import_react.useRef)(height);
	var prevXRef = (0, import_react.useRef)(x);
	var prevYRef = (0, import_react.useRef)(y);
	var animationId = useAnimationId((0, import_react.useMemo)(() => ({
		x,
		y,
		width,
		height,
		radius
	}), [
		x,
		y,
		width,
		height,
		radius
	]), "rectangle-");
	if (x !== +x || y !== +y || width !== +width || height !== +height || width === 0 || height === 0) return null;
	var layerClass = clsx("recharts-rectangle", className);
	if (!isUpdateAnimationActive) {
		var _svgPropertiesAndEven = svgPropertiesAndEvents(props), { radius: _ } = _svgPropertiesAndEven, otherPathProps = _objectWithoutProperties$13(_svgPropertiesAndEven, _excluded$13);
		return /* @__PURE__ */ import_react.createElement("path", _extends$15({}, otherPathProps, {
			radius: typeof radius === "number" ? radius : void 0,
			className: layerClass,
			d: getRectanglePath(x, y, width, height, radius)
		}));
	}
	var prevWidth = prevWidthRef.current;
	var prevHeight = prevHeightRef.current;
	var prevX = prevXRef.current;
	var prevY = prevYRef.current;
	var from$1 = "0px ".concat(totalLength === -1 ? 1 : totalLength, "px");
	var to$1 = "".concat(totalLength, "px 0px");
	var transition = getTransitionVal(["strokeDasharray"], animationDuration, typeof animationEasing === "string" ? animationEasing : defaultRectangleProps.animationEasing);
	return /* @__PURE__ */ import_react.createElement(JavascriptAnimate, {
		animationId,
		key: animationId,
		canBegin: totalLength > 0,
		duration: animationDuration,
		easing: animationEasing,
		isActive: isUpdateAnimationActive,
		begin: animationBegin
	}, (t) => {
		var currWidth = interpolate(prevWidth, width, t);
		var currHeight = interpolate(prevHeight, height, t);
		var currX = interpolate(prevX, x, t);
		var currY = interpolate(prevY, y, t);
		if (pathRef.current) {
			prevWidthRef.current = currWidth;
			prevHeightRef.current = currHeight;
			prevXRef.current = currX;
			prevYRef.current = currY;
		}
		var animationStyle;
		if (!isAnimationActive) animationStyle = { strokeDasharray: to$1 };
		else if (t > 0) animationStyle = {
			transition,
			strokeDasharray: to$1
		};
		else animationStyle = { strokeDasharray: from$1 };
		var _svgPropertiesAndEven2 = svgPropertiesAndEvents(props), { radius: _$1 } = _svgPropertiesAndEven2, otherPathProps$1 = _objectWithoutProperties$13(_svgPropertiesAndEven2, _excluded2$7);
		return /* @__PURE__ */ import_react.createElement("path", _extends$15({}, otherPathProps$1, {
			radius: typeof radius === "number" ? radius : void 0,
			className: layerClass,
			d: getRectanglePath(currX, currY, currWidth, currHeight, radius),
			ref: pathRef,
			style: _objectSpread$20(_objectSpread$20({}, animationStyle), props.style)
		}));
	});
};
function ownKeys$19(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$19(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$19(Object(t), !0).forEach(function(r$1) {
			_defineProperty$21(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$19(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$21(e, r, t) {
	return (r = _toPropertyKey$21(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$21(t) {
	var i = _toPrimitive$21(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$21(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var RADIAN = Math.PI / 180;
var radianToDegree = (angleInRadian) => angleInRadian * 180 / Math.PI;
var polarToCartesian = (cx, cy, radius, angle) => ({
	x: cx + Math.cos(-RADIAN * angle) * radius,
	y: cy + Math.sin(-RADIAN * angle) * radius
});
var getMaxRadius = function getMaxRadius$1(width, height) {
	var offset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: 0,
		height: 0,
		brushBottom: 0
	};
	return Math.min(Math.abs(width - (offset.left || 0) - (offset.right || 0)), Math.abs(height - (offset.top || 0) - (offset.bottom || 0))) / 2;
};
var distanceBetweenPoints = (point$1, anotherPoint) => {
	var { x: x1, y: y1 } = point$1;
	var { x: x2, y: y2 } = anotherPoint;
	return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};
var getAngleOfPoint = (_ref$1, _ref2) => {
	var { x, y } = _ref$1;
	var { cx, cy } = _ref2;
	var radius = distanceBetweenPoints({
		x,
		y
	}, {
		x: cx,
		y: cy
	});
	if (radius <= 0) return {
		radius,
		angle: 0
	};
	var cos = (x - cx) / radius;
	var angleInRadian = Math.acos(cos);
	if (y > cy) angleInRadian = 2 * Math.PI - angleInRadian;
	return {
		radius,
		angle: radianToDegree(angleInRadian),
		angleInRadian
	};
};
var formatAngleOfSector = (_ref3) => {
	var { startAngle, endAngle } = _ref3;
	var startCnt = Math.floor(startAngle / 360);
	var endCnt = Math.floor(endAngle / 360);
	var min = Math.min(startCnt, endCnt);
	return {
		startAngle: startAngle - min * 360,
		endAngle: endAngle - min * 360
	};
};
var reverseFormatAngleOfSector = (angle, _ref4) => {
	var { startAngle, endAngle } = _ref4;
	var startCnt = Math.floor(startAngle / 360);
	var endCnt = Math.floor(endAngle / 360);
	return angle + Math.min(startCnt, endCnt) * 360;
};
var inRangeOfSector = (_ref5, viewBox) => {
	var { chartX: x, chartY: y } = _ref5;
	var { radius, angle } = getAngleOfPoint({
		x,
		y
	}, viewBox);
	var { innerRadius, outerRadius } = viewBox;
	if (radius < innerRadius || radius > outerRadius) return null;
	if (radius === 0) return null;
	var { startAngle, endAngle } = formatAngleOfSector(viewBox);
	var formatAngle = angle;
	var inRange;
	if (startAngle <= endAngle) {
		while (formatAngle > endAngle) formatAngle -= 360;
		while (formatAngle < startAngle) formatAngle += 360;
		inRange = formatAngle >= startAngle && formatAngle <= endAngle;
	} else {
		while (formatAngle > startAngle) formatAngle -= 360;
		while (formatAngle < endAngle) formatAngle += 360;
		inRange = formatAngle >= endAngle && formatAngle <= startAngle;
	}
	if (inRange) return _objectSpread$19(_objectSpread$19({}, viewBox), {}, {
		radius,
		angle: reverseFormatAngleOfSector(formatAngle, viewBox)
	});
	return null;
};
function getRadialCursorPoints(activeCoordinate) {
	var { cx, cy, radius, startAngle, endAngle } = activeCoordinate;
	return {
		points: [polarToCartesian(cx, cy, radius, startAngle), polarToCartesian(cx, cy, radius, endAngle)],
		cx,
		cy,
		radius,
		startAngle,
		endAngle
	};
}
function _extends$14() {
	return _extends$14 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$14.apply(null, arguments);
}
var getDeltaAngle$1 = (startAngle, endAngle) => {
	return mathSign(endAngle - startAngle) * Math.min(Math.abs(endAngle - startAngle), 359.999);
};
var getTangentCircle = (_ref$1) => {
	var { cx, cy, radius, angle, sign, isExternal, cornerRadius, cornerIsExternal } = _ref$1;
	var centerRadius = cornerRadius * (isExternal ? 1 : -1) + radius;
	var theta = Math.asin(cornerRadius / centerRadius) / RADIAN;
	var centerAngle = cornerIsExternal ? angle : angle + sign * theta;
	var center = polarToCartesian(cx, cy, centerRadius, centerAngle);
	var circleTangency = polarToCartesian(cx, cy, radius, centerAngle);
	var lineTangencyAngle = cornerIsExternal ? angle - sign * theta : angle;
	return {
		center,
		circleTangency,
		lineTangency: polarToCartesian(cx, cy, centerRadius * Math.cos(theta * RADIAN), lineTangencyAngle),
		theta
	};
};
var getSectorPath = (_ref2) => {
	var { cx, cy, innerRadius, outerRadius, startAngle, endAngle } = _ref2;
	var angle = getDeltaAngle$1(startAngle, endAngle);
	var tempEndAngle = startAngle + angle;
	var outerStartPoint = polarToCartesian(cx, cy, outerRadius, startAngle);
	var outerEndPoint = polarToCartesian(cx, cy, outerRadius, tempEndAngle);
	var path = "M ".concat(outerStartPoint.x, ",").concat(outerStartPoint.y, "\n    A ").concat(outerRadius, ",").concat(outerRadius, ",0,\n    ").concat(+(Math.abs(angle) > 180), ",").concat(+(startAngle > tempEndAngle), ",\n    ").concat(outerEndPoint.x, ",").concat(outerEndPoint.y, "\n  ");
	if (innerRadius > 0) {
		var innerStartPoint = polarToCartesian(cx, cy, innerRadius, startAngle);
		var innerEndPoint = polarToCartesian(cx, cy, innerRadius, tempEndAngle);
		path += "L ".concat(innerEndPoint.x, ",").concat(innerEndPoint.y, "\n            A ").concat(innerRadius, ",").concat(innerRadius, ",0,\n            ").concat(+(Math.abs(angle) > 180), ",").concat(+(startAngle <= tempEndAngle), ",\n            ").concat(innerStartPoint.x, ",").concat(innerStartPoint.y, " Z");
	} else path += "L ".concat(cx, ",").concat(cy, " Z");
	return path;
};
var getSectorWithCorner = (_ref3) => {
	var { cx, cy, innerRadius, outerRadius, cornerRadius, forceCornerRadius, cornerIsExternal, startAngle, endAngle } = _ref3;
	var sign = mathSign(endAngle - startAngle);
	var { circleTangency: soct, lineTangency: solt, theta: sot } = getTangentCircle({
		cx,
		cy,
		radius: outerRadius,
		angle: startAngle,
		sign,
		cornerRadius,
		cornerIsExternal
	});
	var { circleTangency: eoct, lineTangency: eolt, theta: eot } = getTangentCircle({
		cx,
		cy,
		radius: outerRadius,
		angle: endAngle,
		sign: -sign,
		cornerRadius,
		cornerIsExternal
	});
	var outerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sot - eot;
	if (outerArcAngle < 0) {
		if (forceCornerRadius) return "M ".concat(solt.x, ",").concat(solt.y, "\n        a").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,1,").concat(cornerRadius * 2, ",0\n        a").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,1,").concat(-cornerRadius * 2, ",0\n      ");
		return getSectorPath({
			cx,
			cy,
			innerRadius,
			outerRadius,
			startAngle,
			endAngle
		});
	}
	var path = "M ".concat(solt.x, ",").concat(solt.y, "\n    A").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,").concat(+(sign < 0), ",").concat(soct.x, ",").concat(soct.y, "\n    A").concat(outerRadius, ",").concat(outerRadius, ",0,").concat(+(outerArcAngle > 180), ",").concat(+(sign < 0), ",").concat(eoct.x, ",").concat(eoct.y, "\n    A").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,").concat(+(sign < 0), ",").concat(eolt.x, ",").concat(eolt.y, "\n  ");
	if (innerRadius > 0) {
		var { circleTangency: sict, lineTangency: silt, theta: sit } = getTangentCircle({
			cx,
			cy,
			radius: innerRadius,
			angle: startAngle,
			sign,
			isExternal: true,
			cornerRadius,
			cornerIsExternal
		});
		var { circleTangency: eict, lineTangency: eilt, theta: eit } = getTangentCircle({
			cx,
			cy,
			radius: innerRadius,
			angle: endAngle,
			sign: -sign,
			isExternal: true,
			cornerRadius,
			cornerIsExternal
		});
		var innerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sit - eit;
		if (innerArcAngle < 0 && cornerRadius === 0) return "".concat(path, "L").concat(cx, ",").concat(cy, "Z");
		path += "L".concat(eilt.x, ",").concat(eilt.y, "\n      A").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,").concat(+(sign < 0), ",").concat(eict.x, ",").concat(eict.y, "\n      A").concat(innerRadius, ",").concat(innerRadius, ",0,").concat(+(innerArcAngle > 180), ",").concat(+(sign > 0), ",").concat(sict.x, ",").concat(sict.y, "\n      A").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,").concat(+(sign < 0), ",").concat(silt.x, ",").concat(silt.y, "Z");
	} else path += "L".concat(cx, ",").concat(cy, "Z");
	return path;
};
var defaultSectorProps = {
	cx: 0,
	cy: 0,
	innerRadius: 0,
	outerRadius: 0,
	startAngle: 0,
	endAngle: 0,
	cornerRadius: 0,
	forceCornerRadius: false,
	cornerIsExternal: false
};
var Sector = (sectorProps) => {
	var props = resolveDefaultProps(sectorProps, defaultSectorProps);
	var { cx, cy, innerRadius, outerRadius, cornerRadius, forceCornerRadius, cornerIsExternal, startAngle, endAngle, className } = props;
	if (outerRadius < innerRadius || startAngle === endAngle) return null;
	var layerClass = clsx("recharts-sector", className);
	var deltaRadius = outerRadius - innerRadius;
	var cr = getPercentValue(cornerRadius, deltaRadius, 0, true);
	var path;
	if (cr > 0 && Math.abs(startAngle - endAngle) < 360) path = getSectorWithCorner({
		cx,
		cy,
		innerRadius,
		outerRadius,
		cornerRadius: Math.min(cr, deltaRadius / 2),
		forceCornerRadius,
		cornerIsExternal,
		startAngle,
		endAngle
	});
	else path = getSectorPath({
		cx,
		cy,
		innerRadius,
		outerRadius,
		startAngle,
		endAngle
	});
	return /* @__PURE__ */ import_react.createElement("path", _extends$14({}, svgPropertiesAndEvents(props), {
		className: layerClass,
		d: path
	}));
};
function getCursorPoints(layout, activeCoordinate, offset) {
	if (layout === "horizontal") return [{
		x: activeCoordinate.x,
		y: offset.top
	}, {
		x: activeCoordinate.x,
		y: offset.top + offset.height
	}];
	if (layout === "vertical") return [{
		x: offset.left,
		y: activeCoordinate.y
	}, {
		x: offset.left + offset.width,
		y: activeCoordinate.y
	}];
	if (isPolarCoordinate(activeCoordinate)) {
		if (layout === "centric") {
			var { cx, cy, innerRadius, outerRadius, angle } = activeCoordinate;
			var innerPoint = polarToCartesian(cx, cy, innerRadius, angle);
			var outerPoint = polarToCartesian(cx, cy, outerRadius, angle);
			return [{
				x: innerPoint.x,
				y: innerPoint.y
			}, {
				x: outerPoint.x,
				y: outerPoint.y
			}];
		}
		return getRadialCursorPoints(activeCoordinate);
	}
}
var d3_scale_exports = /* @__PURE__ */ __export({
	scaleBand: () => band,
	scaleDiverging: () => diverging,
	scaleDivergingLog: () => divergingLog,
	scaleDivergingPow: () => divergingPow,
	scaleDivergingSqrt: () => divergingSqrt,
	scaleDivergingSymlog: () => divergingSymlog,
	scaleIdentity: () => identity$1,
	scaleImplicit: () => implicit,
	scaleLinear: () => linear,
	scaleLog: () => log,
	scaleOrdinal: () => ordinal,
	scalePoint: () => point,
	scalePow: () => pow,
	scaleQuantile: () => quantile,
	scaleQuantize: () => quantize,
	scaleRadial: () => radial,
	scaleSequential: () => sequential,
	scaleSequentialLog: () => sequentialLog,
	scaleSequentialPow: () => sequentialPow,
	scaleSequentialQuantile: () => sequentialQuantile,
	scaleSequentialSqrt: () => sequentialSqrt,
	scaleSequentialSymlog: () => sequentialSymlog,
	scaleSqrt: () => sqrt,
	scaleSymlog: () => symlog,
	scaleThreshold: () => threshold,
	scaleTime: () => time,
	scaleUtc: () => utcTime,
	tickFormat: () => tickFormat
});
var selectChartDataWithIndexes = (state) => state.chartData;
var selectChartDataAndAlwaysIgnoreIndexes = createSelector([selectChartDataWithIndexes], (dataState) => {
	var dataEndIndex = dataState.chartData != null ? dataState.chartData.length - 1 : 0;
	return {
		chartData: dataState.chartData,
		computedData: dataState.computedData,
		dataEndIndex,
		dataStartIndex: 0
	};
});
var selectChartDataWithIndexesIfNotInPanorama = (state, _unused1, _unused2, isPanorama) => {
	if (isPanorama) return selectChartDataAndAlwaysIgnoreIndexes(state);
	return selectChartDataWithIndexes(state);
};
function isWellFormedNumberDomain(v) {
	if (Array.isArray(v) && v.length === 2) {
		var [min, max] = v;
		if (isWellBehavedNumber(min) && isWellBehavedNumber(max)) return true;
	}
	return false;
}
function extendDomain(providedDomain, boundaryDomain, allowDataOverflow) {
	if (allowDataOverflow) return providedDomain;
	return [Math.min(providedDomain[0], boundaryDomain[0]), Math.max(providedDomain[1], boundaryDomain[1])];
}
function numericalDomainSpecifiedWithoutRequiringData(userDomain, allowDataOverflow) {
	if (!allowDataOverflow) return;
	if (typeof userDomain === "function") return;
	if (Array.isArray(userDomain) && userDomain.length === 2) {
		var [providedMin, providedMax] = userDomain;
		var finalMin, finalMax;
		if (isWellBehavedNumber(providedMin)) finalMin = providedMin;
		else if (typeof providedMin === "function") return;
		if (isWellBehavedNumber(providedMax)) finalMax = providedMax;
		else if (typeof providedMax === "function") return;
		var candidate = [finalMin, finalMax];
		if (isWellFormedNumberDomain(candidate)) return candidate;
	}
}
function parseNumericalUserDomain(userDomain, dataDomain, allowDataOverflow) {
	if (!allowDataOverflow && dataDomain == null) return;
	if (typeof userDomain === "function" && dataDomain != null) try {
		var result = userDomain(dataDomain, allowDataOverflow);
		if (isWellFormedNumberDomain(result)) return extendDomain(result, dataDomain, allowDataOverflow);
	} catch (_unused) {}
	if (Array.isArray(userDomain) && userDomain.length === 2) {
		var [providedMin, providedMax] = userDomain;
		var finalMin, finalMax;
		if (providedMin === "auto") {
			if (dataDomain != null) finalMin = Math.min(...dataDomain);
		} else if (isNumber(providedMin)) finalMin = providedMin;
		else if (typeof providedMin === "function") try {
			if (dataDomain != null) finalMin = providedMin(dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[0]);
		} catch (_unused2) {}
		else if (typeof providedMin === "string" && MIN_VALUE_REG.test(providedMin)) {
			var match = MIN_VALUE_REG.exec(providedMin);
			if (match == null || dataDomain == null) finalMin = void 0;
			else {
				var value = +match[1];
				finalMin = dataDomain[0] - value;
			}
		} else finalMin = dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[0];
		if (providedMax === "auto") {
			if (dataDomain != null) finalMax = Math.max(...dataDomain);
		} else if (isNumber(providedMax)) finalMax = providedMax;
		else if (typeof providedMax === "function") try {
			if (dataDomain != null) finalMax = providedMax(dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[1]);
		} catch (_unused3) {}
		else if (typeof providedMax === "string" && MAX_VALUE_REG.test(providedMax)) {
			var _match = MAX_VALUE_REG.exec(providedMax);
			if (_match == null || dataDomain == null) finalMax = void 0;
			else {
				var _value = +_match[1];
				finalMax = dataDomain[1] + _value;
			}
		} else finalMax = dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[1];
		var candidate = [finalMin, finalMax];
		if (isWellFormedNumberDomain(candidate)) {
			if (dataDomain == null) return candidate;
			return extendDomain(candidate, dataDomain, allowDataOverflow);
		}
	}
}
var identity = (i) => i;
var PLACE_HOLDER = { "@@functional/placeholder": true };
var isPlaceHolder = (val) => val === PLACE_HOLDER;
var curry0 = (fn) => function _curried() {
	if (arguments.length === 0 || arguments.length === 1 && isPlaceHolder(arguments.length <= 0 ? void 0 : arguments[0])) return _curried;
	return fn(...arguments);
};
var curryN = (n, fn) => {
	if (n === 1) return fn;
	return curry0(function() {
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		var argsLength = args.filter((arg) => arg !== PLACE_HOLDER).length;
		if (argsLength >= n) return fn(...args);
		return curryN(n - argsLength, curry0(function() {
			for (var _len2 = arguments.length, restArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) restArgs[_key2] = arguments[_key2];
			return fn(...args.map((arg) => isPlaceHolder(arg) ? restArgs.shift() : arg), ...restArgs);
		}));
	});
};
var curry = (fn) => curryN(fn.length, fn);
var range$1 = (begin, end) => {
	var arr = [];
	for (var i = begin; i < end; ++i) arr[i - begin] = i;
	return arr;
};
var map = curry((fn, arr) => {
	if (Array.isArray(arr)) return arr.map(fn);
	return Object.keys(arr).map((key) => arr[key]).map(fn);
});
var compose = function compose$1() {
	for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
	if (!args.length) return identity;
	var fns = args.reverse();
	var firstFn = fns[0];
	var tailsFn = fns.slice(1);
	return function() {
		return tailsFn.reduce((res, fn) => fn(res), firstFn(...arguments));
	};
};
var reverse = (arr) => {
	if (Array.isArray(arr)) return arr.reverse();
	return arr.split("").reverse().join("");
};
function getDigitCount(value) {
	var result;
	if (value === 0) result = 1;
	else result = Math.floor(new decimal_default(value).abs().log(10).toNumber()) + 1;
	return result;
}
function rangeStep(start, end, step) {
	var num = new decimal_default(start);
	var i = 0;
	var result = [];
	while (num.lt(end) && i < 1e5) {
		result.push(num.toNumber());
		num = num.add(step);
		i++;
	}
	return result;
}
var getValidInterval = (_ref$1) => {
	var [min, max] = _ref$1;
	var [validMin, validMax] = [min, max];
	if (min > max) [validMin, validMax] = [max, min];
	return [validMin, validMax];
};
var getFormatStep = (roughStep, allowDecimals, correctionFactor) => {
	if (roughStep.lte(0)) return new decimal_default(0);
	var digitCount = getDigitCount(roughStep.toNumber());
	var digitCountValue = new decimal_default(10).pow(digitCount);
	var stepRatio = roughStep.div(digitCountValue);
	var stepRatioScale = digitCount !== 1 ? .05 : .1;
	var formatStep = new decimal_default(Math.ceil(stepRatio.div(stepRatioScale).toNumber())).add(correctionFactor).mul(stepRatioScale).mul(digitCountValue);
	return allowDecimals ? new decimal_default(formatStep.toNumber()) : new decimal_default(Math.ceil(formatStep.toNumber()));
};
var getTickOfSingleValue = (value, tickCount, allowDecimals) => {
	var step = new decimal_default(1);
	var middle = new decimal_default(value);
	if (!middle.isint() && allowDecimals) {
		var absVal = Math.abs(value);
		if (absVal < 1) {
			step = new decimal_default(10).pow(getDigitCount(value) - 1);
			middle = new decimal_default(Math.floor(middle.div(step).toNumber())).mul(step);
		} else if (absVal > 1) middle = new decimal_default(Math.floor(value));
	} else if (value === 0) middle = new decimal_default(Math.floor((tickCount - 1) / 2));
	else if (!allowDecimals) middle = new decimal_default(Math.floor(value));
	var middleIndex = Math.floor((tickCount - 1) / 2);
	return compose(map((n) => middle.add(new decimal_default(n - middleIndex).mul(step)).toNumber()), range$1)(0, tickCount);
};
var _calculateStep = function calculateStep(min, max, tickCount, allowDecimals) {
	var correctionFactor = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
	if (!Number.isFinite((max - min) / (tickCount - 1))) return {
		step: new decimal_default(0),
		tickMin: new decimal_default(0),
		tickMax: new decimal_default(0)
	};
	var step = getFormatStep(new decimal_default(max).sub(min).div(tickCount - 1), allowDecimals, correctionFactor);
	var middle;
	if (min <= 0 && max >= 0) middle = new decimal_default(0);
	else {
		middle = new decimal_default(min).add(max).div(2);
		middle = middle.sub(new decimal_default(middle).mod(step));
	}
	var belowCount = Math.ceil(middle.sub(min).div(step).toNumber());
	var upCount = Math.ceil(new decimal_default(max).sub(middle).div(step).toNumber());
	var scaleCount = belowCount + upCount + 1;
	if (scaleCount > tickCount) return _calculateStep(min, max, tickCount, allowDecimals, correctionFactor + 1);
	if (scaleCount < tickCount) {
		upCount = max > 0 ? upCount + (tickCount - scaleCount) : upCount;
		belowCount = max > 0 ? belowCount : belowCount + (tickCount - scaleCount);
	}
	return {
		step,
		tickMin: middle.sub(new decimal_default(belowCount).mul(step)),
		tickMax: middle.add(new decimal_default(upCount).mul(step))
	};
};
var getNiceTickValues = function getNiceTickValues$1(_ref2) {
	var [min, max] = _ref2;
	var tickCount = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6;
	var allowDecimals = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
	var count = Math.max(tickCount, 2);
	var [cormin, cormax] = getValidInterval([min, max]);
	if (cormin === -Infinity || cormax === Infinity) {
		var _values = cormax === Infinity ? [cormin, ...range$1(0, tickCount - 1).map(() => Infinity)] : [...range$1(0, tickCount - 1).map(() => -Infinity), cormax];
		return min > max ? reverse(_values) : _values;
	}
	if (cormin === cormax) return getTickOfSingleValue(cormin, tickCount, allowDecimals);
	var { step, tickMin, tickMax } = _calculateStep(cormin, cormax, count, allowDecimals, 0);
	var values = rangeStep(tickMin, tickMax.add(new decimal_default(.1).mul(step)), step);
	return min > max ? reverse(values) : values;
};
var getTickValuesFixedDomain = function getTickValuesFixedDomain$1(_ref3, tickCount) {
	var [min, max] = _ref3;
	var allowDecimals = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
	var [cormin, cormax] = getValidInterval([min, max]);
	if (cormin === -Infinity || cormax === Infinity) return [min, max];
	if (cormin === cormax) return [cormin];
	var count = Math.max(tickCount, 2);
	var step = getFormatStep(new decimal_default(cormax).sub(cormin).div(count - 1), allowDecimals, 0);
	var values = [...rangeStep(new decimal_default(cormin), new decimal_default(cormax), step), cormax];
	if (allowDecimals === false) values = values.map((value) => Math.round(value));
	return min > max ? reverse(values) : values;
};
var selectBarCategoryGap = (state) => state.rootProps.barCategoryGap;
var selectStackOffsetType = (state) => state.rootProps.stackOffset;
var selectReverseStackOrder = (state) => state.rootProps.reverseStackOrder;
var selectChartName = (state) => state.options.chartName;
var selectSyncId = (state) => state.rootProps.syncId;
var selectSyncMethod = (state) => state.rootProps.syncMethod;
var selectEventEmitter = (state) => state.options.eventEmitter;
var selectChartBaseValue = (state) => state.rootProps.baseValue;
var DefaultZIndexes = {
	grid: -100,
	barBackground: -50,
	area: 100,
	cursorRectangle: 200,
	bar: 300,
	line: 400,
	axis: 500,
	scatter: 600,
	activeBar: 1e3,
	cursorLine: 1100,
	activeDot: 1200,
	label: 2e3
};
var defaultPolarAngleAxisProps = {
	allowDecimals: false,
	allowDuplicatedCategory: true,
	angleAxisId: 0,
	axisLine: true,
	axisLineType: "polygon",
	cx: 0,
	cy: 0,
	orientation: "outer",
	reversed: false,
	scale: "auto",
	tick: true,
	tickLine: true,
	tickSize: 8,
	type: "category",
	zIndex: DefaultZIndexes.axis
};
var defaultPolarRadiusAxisProps = {
	allowDataOverflow: false,
	allowDecimals: false,
	allowDuplicatedCategory: true,
	angle: 0,
	axisLine: true,
	includeHidden: false,
	label: false,
	orientation: "right",
	radiusAxisId: 0,
	reversed: false,
	scale: "auto",
	stroke: "#ccc",
	tick: true,
	tickCount: 5,
	type: "number",
	zIndex: DefaultZIndexes.axis
};
var combineAxisRangeWithReverse = (axisSettings, axisRange) => {
	if (!axisSettings || !axisRange) return;
	if (axisSettings !== null && axisSettings !== void 0 && axisSettings.reversed) return [axisRange[1], axisRange[0]];
	return axisRange;
};
var implicitAngleAxis = {
	allowDataOverflow: false,
	allowDecimals: false,
	allowDuplicatedCategory: false,
	dataKey: void 0,
	domain: void 0,
	id: defaultPolarAngleAxisProps.angleAxisId,
	includeHidden: false,
	name: void 0,
	reversed: defaultPolarAngleAxisProps.reversed,
	scale: defaultPolarAngleAxisProps.scale,
	tick: defaultPolarAngleAxisProps.tick,
	tickCount: void 0,
	ticks: void 0,
	type: defaultPolarAngleAxisProps.type,
	unit: void 0
};
var implicitRadiusAxis = {
	allowDataOverflow: defaultPolarRadiusAxisProps.allowDataOverflow,
	allowDecimals: false,
	allowDuplicatedCategory: defaultPolarRadiusAxisProps.allowDuplicatedCategory,
	dataKey: void 0,
	domain: void 0,
	id: defaultPolarRadiusAxisProps.radiusAxisId,
	includeHidden: false,
	name: void 0,
	reversed: false,
	scale: defaultPolarRadiusAxisProps.scale,
	tick: defaultPolarRadiusAxisProps.tick,
	tickCount: defaultPolarRadiusAxisProps.tickCount,
	ticks: void 0,
	type: defaultPolarRadiusAxisProps.type,
	unit: void 0
};
var implicitRadialBarAngleAxis = {
	allowDataOverflow: false,
	allowDecimals: false,
	allowDuplicatedCategory: defaultPolarAngleAxisProps.allowDuplicatedCategory,
	dataKey: void 0,
	domain: void 0,
	id: defaultPolarAngleAxisProps.angleAxisId,
	includeHidden: false,
	name: void 0,
	reversed: false,
	scale: defaultPolarAngleAxisProps.scale,
	tick: defaultPolarAngleAxisProps.tick,
	tickCount: void 0,
	ticks: void 0,
	type: "number",
	unit: void 0
};
var implicitRadialBarRadiusAxis = {
	allowDataOverflow: defaultPolarRadiusAxisProps.allowDataOverflow,
	allowDecimals: false,
	allowDuplicatedCategory: defaultPolarRadiusAxisProps.allowDuplicatedCategory,
	dataKey: void 0,
	domain: void 0,
	id: defaultPolarRadiusAxisProps.radiusAxisId,
	includeHidden: false,
	name: void 0,
	reversed: false,
	scale: defaultPolarRadiusAxisProps.scale,
	tick: defaultPolarRadiusAxisProps.tick,
	tickCount: defaultPolarRadiusAxisProps.tickCount,
	ticks: void 0,
	type: "category",
	unit: void 0
};
var selectAngleAxis = (state, angleAxisId) => {
	if (state.polarAxis.angleAxis[angleAxisId] != null) return state.polarAxis.angleAxis[angleAxisId];
	if (state.layout.layoutType === "radial") return implicitRadialBarAngleAxis;
	return implicitAngleAxis;
};
var selectRadiusAxis = (state, radiusAxisId) => {
	if (state.polarAxis.radiusAxis[radiusAxisId] != null) return state.polarAxis.radiusAxis[radiusAxisId];
	if (state.layout.layoutType === "radial") return implicitRadialBarRadiusAxis;
	return implicitRadiusAxis;
};
var selectPolarOptions = (state) => state.polarOptions;
var selectMaxRadius = createSelector([
	selectChartWidth,
	selectChartHeight,
	selectChartOffsetInternal
], getMaxRadius);
var selectInnerRadius = createSelector([selectPolarOptions, selectMaxRadius], (polarChartOptions, maxRadius) => {
	if (polarChartOptions == null) return;
	return getPercentValue(polarChartOptions.innerRadius, maxRadius, 0);
});
var selectOuterRadius = createSelector([selectPolarOptions, selectMaxRadius], (polarChartOptions, maxRadius) => {
	if (polarChartOptions == null) return;
	return getPercentValue(polarChartOptions.outerRadius, maxRadius, maxRadius * .8);
});
var combineAngleAxisRange = (polarOptions) => {
	if (polarOptions == null) return [0, 0];
	var { startAngle, endAngle } = polarOptions;
	return [startAngle, endAngle];
};
var selectAngleAxisRange = createSelector([selectPolarOptions], combineAngleAxisRange);
createSelector([selectAngleAxis, selectAngleAxisRange], combineAxisRangeWithReverse);
var selectRadiusAxisRange = createSelector([
	selectMaxRadius,
	selectInnerRadius,
	selectOuterRadius
], (maxRadius, innerRadius, outerRadius) => {
	if (maxRadius == null || innerRadius == null || outerRadius == null) return;
	return [innerRadius, outerRadius];
});
createSelector([selectRadiusAxis, selectRadiusAxisRange], combineAxisRangeWithReverse);
var selectPolarViewBox = createSelector([
	selectChartLayout,
	selectPolarOptions,
	selectInnerRadius,
	selectOuterRadius,
	selectChartWidth,
	selectChartHeight
], (layout, polarOptions, innerRadius, outerRadius, width, height) => {
	if (layout !== "centric" && layout !== "radial" || polarOptions == null || innerRadius == null || outerRadius == null) return;
	var { cx, cy, startAngle, endAngle } = polarOptions;
	return {
		cx: getPercentValue(cx, width, width / 2),
		cy: getPercentValue(cy, height, height / 2),
		innerRadius,
		outerRadius,
		startAngle,
		endAngle,
		clockWise: false
	};
});
var pickAxisType = (_state, axisType) => axisType;
var pickAxisId = (_state, _axisType, axisId) => axisId;
function getStackSeriesIdentifier(graphicalItem) {
	return graphicalItem === null || graphicalItem === void 0 ? void 0 : graphicalItem.id;
}
function combineDisplayedStackedData(stackedGraphicalItems, _ref$1, tooltipAxisSettings) {
	var { chartData = [] } = _ref$1;
	var { allowDuplicatedCategory, dataKey: tooltipDataKey } = tooltipAxisSettings;
	var knownItemsByDataKey = /* @__PURE__ */ new Map();
	stackedGraphicalItems.forEach((item) => {
		var _item$data;
		var resolvedData = (_item$data = item.data) !== null && _item$data !== void 0 ? _item$data : chartData;
		if (resolvedData == null || resolvedData.length === 0) return;
		var stackIdentifier = getStackSeriesIdentifier(item);
		resolvedData.forEach((entry, index) => {
			var tooltipValue = tooltipDataKey == null || allowDuplicatedCategory ? index : String(getValueByDataKey(entry, tooltipDataKey, null));
			var numericValue = getValueByDataKey(entry, item.dataKey, 0);
			var curr;
			if (knownItemsByDataKey.has(tooltipValue)) curr = knownItemsByDataKey.get(tooltipValue);
			else curr = {};
			Object.assign(curr, { [stackIdentifier]: numericValue });
			knownItemsByDataKey.set(tooltipValue, curr);
		});
	});
	return Array.from(knownItemsByDataKey.values());
}
function isStacked(graphicalItem) {
	return graphicalItem.stackId != null && graphicalItem.dataKey != null;
}
var numberDomainEqualityCheck = (a, b) => {
	if (a === b) return true;
	if (a == null || b == null) return false;
	return a[0] === b[0] && a[1] === b[1];
};
function emptyArraysAreEqualCheck(a, b) {
	if (Array.isArray(a) && Array.isArray(b) && a.length === 0 && b.length === 0) return true;
	return a === b;
}
function arrayContentsAreEqualCheck(a, b) {
	if (a.length === b.length) {
		for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
		return true;
	}
	return false;
}
var selectTooltipAxisType = (state) => {
	var layout = selectChartLayout(state);
	if (layout === "horizontal") return "xAxis";
	if (layout === "vertical") return "yAxis";
	if (layout === "centric") return "angleAxis";
	return "radiusAxis";
};
var selectTooltipAxisId = (state) => state.tooltip.settings.axisId;
var import_range = /* @__PURE__ */ __toESM(require_range());
function ownKeys$18(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$18(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$18(Object(t), !0).forEach(function(r$1) {
			_defineProperty$20(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$18(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$20(e, r, t) {
	return (r = _toPropertyKey$20(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$20(t) {
	var i = _toPrimitive$20(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$20(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var defaultNumericDomain = [0, "auto"];
var implicitXAxis = {
	allowDataOverflow: false,
	allowDecimals: true,
	allowDuplicatedCategory: true,
	angle: 0,
	dataKey: void 0,
	domain: void 0,
	height: 30,
	hide: true,
	id: 0,
	includeHidden: false,
	interval: "preserveEnd",
	minTickGap: 5,
	mirror: false,
	name: void 0,
	orientation: "bottom",
	padding: {
		left: 0,
		right: 0
	},
	reversed: false,
	scale: "auto",
	tick: true,
	tickCount: 5,
	tickFormatter: void 0,
	ticks: void 0,
	type: "category",
	unit: void 0
};
var selectXAxisSettingsNoDefaults = (state, axisId) => {
	return state.cartesianAxis.xAxis[axisId];
};
var selectXAxisSettings = (state, axisId) => {
	var axis = selectXAxisSettingsNoDefaults(state, axisId);
	if (axis == null) return implicitXAxis;
	return axis;
};
var implicitYAxis = {
	allowDataOverflow: false,
	allowDecimals: true,
	allowDuplicatedCategory: true,
	angle: 0,
	dataKey: void 0,
	domain: defaultNumericDomain,
	hide: true,
	id: 0,
	includeHidden: false,
	interval: "preserveEnd",
	minTickGap: 5,
	mirror: false,
	name: void 0,
	orientation: "left",
	padding: {
		top: 0,
		bottom: 0
	},
	reversed: false,
	scale: "auto",
	tick: true,
	tickCount: 5,
	tickFormatter: void 0,
	ticks: void 0,
	type: "number",
	unit: void 0,
	width: 60
};
var selectYAxisSettingsNoDefaults = (state, axisId) => {
	return state.cartesianAxis.yAxis[axisId];
};
var selectYAxisSettings = (state, axisId) => {
	var axis = selectYAxisSettingsNoDefaults(state, axisId);
	if (axis == null) return implicitYAxis;
	return axis;
};
var implicitZAxis = {
	domain: [0, "auto"],
	includeHidden: false,
	reversed: false,
	allowDataOverflow: false,
	allowDuplicatedCategory: false,
	dataKey: void 0,
	id: 0,
	name: "",
	range: [64, 64],
	scale: "auto",
	type: "number",
	unit: ""
};
var selectZAxisSettings = (state, axisId) => {
	var axis = state.cartesianAxis.zAxis[axisId];
	if (axis == null) return implicitZAxis;
	return axis;
};
var selectBaseAxis = (state, axisType, axisId) => {
	switch (axisType) {
		case "xAxis": return selectXAxisSettings(state, axisId);
		case "yAxis": return selectYAxisSettings(state, axisId);
		case "zAxis": return selectZAxisSettings(state, axisId);
		case "angleAxis": return selectAngleAxis(state, axisId);
		case "radiusAxis": return selectRadiusAxis(state, axisId);
		default: throw new Error("Unexpected axis type: ".concat(axisType));
	}
};
var selectCartesianAxisSettings = (state, axisType, axisId) => {
	switch (axisType) {
		case "xAxis": return selectXAxisSettings(state, axisId);
		case "yAxis": return selectYAxisSettings(state, axisId);
		default: throw new Error("Unexpected axis type: ".concat(axisType));
	}
};
var selectAxisSettings = (state, axisType, axisId) => {
	switch (axisType) {
		case "xAxis": return selectXAxisSettings(state, axisId);
		case "yAxis": return selectYAxisSettings(state, axisId);
		case "angleAxis": return selectAngleAxis(state, axisId);
		case "radiusAxis": return selectRadiusAxis(state, axisId);
		default: throw new Error("Unexpected axis type: ".concat(axisType));
	}
};
var selectHasBar = (state) => state.graphicalItems.cartesianItems.some((item) => item.type === "bar") || state.graphicalItems.polarItems.some((item) => item.type === "radialBar");
function itemAxisPredicate(axisType, axisId) {
	return (item) => {
		switch (axisType) {
			case "xAxis": return "xAxisId" in item && item.xAxisId === axisId;
			case "yAxis": return "yAxisId" in item && item.yAxisId === axisId;
			case "zAxis": return "zAxisId" in item && item.zAxisId === axisId;
			case "angleAxis": return "angleAxisId" in item && item.angleAxisId === axisId;
			case "radiusAxis": return "radiusAxisId" in item && item.radiusAxisId === axisId;
			default: return false;
		}
	};
}
var selectUnfilteredCartesianItems = (state) => state.graphicalItems.cartesianItems;
var selectAxisPredicate = createSelector([pickAxisType, pickAxisId], itemAxisPredicate);
var combineGraphicalItemsSettings = (graphicalItems, axisSettings, axisPredicate) => graphicalItems.filter(axisPredicate).filter((item) => {
	if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.includeHidden) === true) return true;
	return !item.hide;
});
var selectCartesianItemsSettings = createSelector([
	selectUnfilteredCartesianItems,
	selectBaseAxis,
	selectAxisPredicate
], combineGraphicalItemsSettings, { memoizeOptions: { resultEqualityCheck: emptyArraysAreEqualCheck } });
var selectStackedCartesianItemsSettings = createSelector([selectCartesianItemsSettings], (cartesianItems) => {
	return cartesianItems.filter((item) => item.type === "area" || item.type === "bar").filter(isStacked);
});
var filterGraphicalNotStackedItems = (cartesianItems) => cartesianItems.filter((item) => !("stackId" in item) || item.stackId === void 0);
var selectCartesianItemsSettingsExceptStacked = createSelector([selectCartesianItemsSettings], filterGraphicalNotStackedItems);
var combineGraphicalItemsData = (cartesianItems) => cartesianItems.map((item) => item.data).filter(Boolean).flat(1);
var selectCartesianGraphicalItemsData = createSelector([selectCartesianItemsSettings], combineGraphicalItemsData, { memoizeOptions: { resultEqualityCheck: emptyArraysAreEqualCheck } });
var combineDisplayedData = (graphicalItemsData, _ref$1) => {
	var { chartData = [], dataStartIndex, dataEndIndex } = _ref$1;
	if (graphicalItemsData.length > 0) return graphicalItemsData;
	return chartData.slice(dataStartIndex, dataEndIndex + 1);
};
var selectDisplayedData = createSelector([selectCartesianGraphicalItemsData, selectChartDataWithIndexesIfNotInPanorama], combineDisplayedData);
var combineAppliedValues = (data, axisSettings, items) => {
	if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null) return data.map((item) => ({ value: getValueByDataKey(item, axisSettings.dataKey) }));
	if (items.length > 0) return items.map((item) => item.dataKey).flatMap((dataKey) => data.map((entry) => ({ value: getValueByDataKey(entry, dataKey) })));
	return data.map((entry) => ({ value: entry }));
};
var selectAllAppliedValues = createSelector([
	selectDisplayedData,
	selectBaseAxis,
	selectCartesianItemsSettings
], combineAppliedValues);
function isErrorBarRelevantForAxisType(axisType, errorBar) {
	switch (axisType) {
		case "xAxis": return errorBar.direction === "x";
		case "yAxis": return errorBar.direction === "y";
		default: return false;
	}
}
function makeNumber(val) {
	if (isNumOrStr(val) || val instanceof Date) {
		var n = Number(val);
		if (isWellBehavedNumber(n)) return n;
	}
}
function makeDomain(val) {
	if (Array.isArray(val)) {
		var attempt = [makeNumber(val[0]), makeNumber(val[1])];
		if (isWellFormedNumberDomain(attempt)) return attempt;
		return;
	}
	var n = makeNumber(val);
	if (n == null) return;
	return [n, n];
}
function onlyAllowNumbers(data) {
	return data.map(makeNumber).filter(isNotNil);
}
function getErrorDomainByDataKey(entry, appliedValue, relevantErrorBars) {
	if (!relevantErrorBars || typeof appliedValue !== "number" || isNan(appliedValue)) return [];
	if (!relevantErrorBars.length) return [];
	return onlyAllowNumbers(relevantErrorBars.flatMap((eb) => {
		var errorValue = getValueByDataKey(entry, eb.dataKey);
		var lowBound, highBound;
		if (Array.isArray(errorValue)) [lowBound, highBound] = errorValue;
		else lowBound = highBound = errorValue;
		if (!isWellBehavedNumber(lowBound) || !isWellBehavedNumber(highBound)) return;
		return [appliedValue - lowBound, appliedValue + highBound];
	}));
}
var selectTooltipAxis = (state) => {
	return selectAxisSettings(state, selectTooltipAxisType(state), selectTooltipAxisId(state));
};
var selectTooltipAxisDataKey = createSelector([selectTooltipAxis], (axis) => axis === null || axis === void 0 ? void 0 : axis.dataKey);
var selectDisplayedStackedData = createSelector([
	selectStackedCartesianItemsSettings,
	selectChartDataWithIndexesIfNotInPanorama,
	selectTooltipAxis
], combineDisplayedStackedData);
var combineStackGroups = (displayedData, items, stackOffsetType, reverseStackOrder) => {
	var itemsGroup = items.reduce((acc, item) => {
		if (item.stackId == null) return acc;
		if (acc[item.stackId] == null) acc[item.stackId] = [];
		acc[item.stackId].push(item);
		return acc;
	}, {});
	return Object.fromEntries(Object.entries(itemsGroup).map((_ref2) => {
		var [stackId, graphicalItems] = _ref2;
		var orderedGraphicalItems = reverseStackOrder ? [...graphicalItems].reverse() : graphicalItems;
		return [stackId, {
			stackedData: getStackedData(displayedData, orderedGraphicalItems.map(getStackSeriesIdentifier), stackOffsetType),
			graphicalItems: orderedGraphicalItems
		}];
	}));
};
var selectStackGroups = createSelector([
	selectDisplayedStackedData,
	selectStackedCartesianItemsSettings,
	selectStackOffsetType,
	selectReverseStackOrder
], combineStackGroups);
var combineDomainOfStackGroups = (stackGroups, _ref3, axisType, domainFromUserPreference) => {
	var { dataStartIndex, dataEndIndex } = _ref3;
	if (domainFromUserPreference != null) return;
	if (axisType === "zAxis") return;
	var domainOfStackGroups = getDomainOfStackGroups(stackGroups, dataStartIndex, dataEndIndex);
	if (domainOfStackGroups != null && domainOfStackGroups[0] === 0 && domainOfStackGroups[1] === 0) return;
	return domainOfStackGroups;
};
var selectAllowsDataOverflow = createSelector([selectBaseAxis], (axisSettings) => axisSettings.allowDataOverflow);
var getDomainDefinition = (axisSettings) => {
	var _axisSettings$domain;
	if (axisSettings == null || !("domain" in axisSettings)) return defaultNumericDomain;
	if (axisSettings.domain != null) return axisSettings.domain;
	if (axisSettings.ticks != null) {
		if (axisSettings.type === "number") {
			var allValues = onlyAllowNumbers(axisSettings.ticks);
			return [Math.min(...allValues), Math.max(...allValues)];
		}
		if (axisSettings.type === "category") return axisSettings.ticks.map(String);
	}
	return (_axisSettings$domain = axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.domain) !== null && _axisSettings$domain !== void 0 ? _axisSettings$domain : defaultNumericDomain;
};
var selectDomainDefinition = createSelector([selectBaseAxis], getDomainDefinition);
var selectDomainFromUserPreference = createSelector([selectDomainDefinition, selectAllowsDataOverflow], numericalDomainSpecifiedWithoutRequiringData);
var selectDomainOfStackGroups = createSelector([
	selectStackGroups,
	selectChartDataWithIndexes,
	pickAxisType,
	selectDomainFromUserPreference
], combineDomainOfStackGroups, { memoizeOptions: { resultEqualityCheck: numberDomainEqualityCheck } });
var selectAllErrorBarSettings = (state) => state.errorBars;
var combineRelevantErrorBarSettings = (cartesianItemsSettings, allErrorBarSettings, axisType) => {
	return cartesianItemsSettings.flatMap((item) => {
		return allErrorBarSettings[item.id];
	}).filter(Boolean).filter((e) => {
		return isErrorBarRelevantForAxisType(axisType, e);
	});
};
var mergeDomains = function mergeDomains$1() {
	for (var _len = arguments.length, domains = new Array(_len), _key = 0; _key < _len; _key++) domains[_key] = arguments[_key];
	var allDomains = domains.filter(Boolean);
	if (allDomains.length === 0) return;
	var allValues = allDomains.flat();
	return [Math.min(...allValues), Math.max(...allValues)];
};
var combineDomainOfAllAppliedNumericalValuesIncludingErrorValues = (data, axisSettings, items, errorBars, axisType) => {
	var lowerEnd, upperEnd;
	if (items.length > 0) data.forEach((entry) => {
		items.forEach((item) => {
			var _errorBars$item$id, _axisSettings$dataKey;
			var relevantErrorBars = (_errorBars$item$id = errorBars[item.id]) === null || _errorBars$item$id === void 0 ? void 0 : _errorBars$item$id.filter((errorBar) => isErrorBarRelevantForAxisType(axisType, errorBar));
			var valueByDataKey = getValueByDataKey(entry, (_axisSettings$dataKey = axisSettings.dataKey) !== null && _axisSettings$dataKey !== void 0 ? _axisSettings$dataKey : item.dataKey);
			var errorDomain = getErrorDomainByDataKey(entry, valueByDataKey, relevantErrorBars);
			if (errorDomain.length >= 2) {
				var localLower = Math.min(...errorDomain);
				var localUpper = Math.max(...errorDomain);
				if (lowerEnd == null || localLower < lowerEnd) lowerEnd = localLower;
				if (upperEnd == null || localUpper > upperEnd) upperEnd = localUpper;
			}
			var dataValueDomain = makeDomain(valueByDataKey);
			if (dataValueDomain != null) {
				lowerEnd = lowerEnd == null ? dataValueDomain[0] : Math.min(lowerEnd, dataValueDomain[0]);
				upperEnd = upperEnd == null ? dataValueDomain[1] : Math.max(upperEnd, dataValueDomain[1]);
			}
		});
	});
	if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null) data.forEach((item) => {
		var dataValueDomain = makeDomain(getValueByDataKey(item, axisSettings.dataKey));
		if (dataValueDomain != null) {
			lowerEnd = lowerEnd == null ? dataValueDomain[0] : Math.min(lowerEnd, dataValueDomain[0]);
			upperEnd = upperEnd == null ? dataValueDomain[1] : Math.max(upperEnd, dataValueDomain[1]);
		}
	});
	if (isWellBehavedNumber(lowerEnd) && isWellBehavedNumber(upperEnd)) return [lowerEnd, upperEnd];
};
var selectDomainOfAllAppliedNumericalValuesIncludingErrorValues$1 = createSelector([
	selectDisplayedData,
	selectBaseAxis,
	selectCartesianItemsSettingsExceptStacked,
	selectAllErrorBarSettings,
	pickAxisType
], combineDomainOfAllAppliedNumericalValuesIncludingErrorValues, { memoizeOptions: { resultEqualityCheck: numberDomainEqualityCheck } });
function onlyAllowNumbersAndStringsAndDates(item) {
	var { value } = item;
	if (isNumOrStr(value) || value instanceof Date) return value;
}
var computeDomainOfTypeCategory = (allDataSquished, axisSettings, isCategorical) => {
	var categoricalDomain = allDataSquished.map(onlyAllowNumbersAndStringsAndDates).filter((v) => v != null);
	if (isCategorical && (axisSettings.dataKey == null || axisSettings.allowDuplicatedCategory && hasDuplicate(categoricalDomain))) return (0, import_range.default)(0, allDataSquished.length);
	if (axisSettings.allowDuplicatedCategory) return categoricalDomain;
	return Array.from(new Set(categoricalDomain));
};
var selectReferenceDots = (state) => state.referenceElements.dots;
var filterReferenceElements = (elements, axisType, axisId) => {
	return elements.filter((el) => el.ifOverflow === "extendDomain").filter((el) => {
		if (axisType === "xAxis") return el.xAxisId === axisId;
		return el.yAxisId === axisId;
	});
};
var selectReferenceDotsByAxis = createSelector([
	selectReferenceDots,
	pickAxisType,
	pickAxisId
], filterReferenceElements);
var selectReferenceAreas = (state) => state.referenceElements.areas;
var selectReferenceAreasByAxis = createSelector([
	selectReferenceAreas,
	pickAxisType,
	pickAxisId
], filterReferenceElements);
var selectReferenceLines = (state) => state.referenceElements.lines;
var selectReferenceLinesByAxis = createSelector([
	selectReferenceLines,
	pickAxisType,
	pickAxisId
], filterReferenceElements);
var combineDotsDomain = (dots, axisType) => {
	var allCoords = onlyAllowNumbers(dots.map((dot) => axisType === "xAxis" ? dot.x : dot.y));
	if (allCoords.length === 0) return;
	return [Math.min(...allCoords), Math.max(...allCoords)];
};
var selectReferenceDotsDomain = createSelector(selectReferenceDotsByAxis, pickAxisType, combineDotsDomain);
var combineAreasDomain = (areas, axisType) => {
	var allCoords = onlyAllowNumbers(areas.flatMap((area) => [axisType === "xAxis" ? area.x1 : area.y1, axisType === "xAxis" ? area.x2 : area.y2]));
	if (allCoords.length === 0) return;
	return [Math.min(...allCoords), Math.max(...allCoords)];
};
var selectReferenceAreasDomain = createSelector([selectReferenceAreasByAxis, pickAxisType], combineAreasDomain);
function extractXCoordinates(line) {
	var _line$segment;
	if (line.x != null) return onlyAllowNumbers([line.x]);
	var segmentCoordinates = (_line$segment = line.segment) === null || _line$segment === void 0 ? void 0 : _line$segment.map((s) => s.x);
	if (segmentCoordinates == null || segmentCoordinates.length === 0) return [];
	return onlyAllowNumbers(segmentCoordinates);
}
function extractYCoordinates(line) {
	var _line$segment2;
	if (line.y != null) return onlyAllowNumbers([line.y]);
	var segmentCoordinates = (_line$segment2 = line.segment) === null || _line$segment2 === void 0 ? void 0 : _line$segment2.map((s) => s.y);
	if (segmentCoordinates == null || segmentCoordinates.length === 0) return [];
	return onlyAllowNumbers(segmentCoordinates);
}
var combineLinesDomain = (lines, axisType) => {
	var allCoords = lines.flatMap((line) => axisType === "xAxis" ? extractXCoordinates(line) : extractYCoordinates(line));
	if (allCoords.length === 0) return;
	return [Math.min(...allCoords), Math.max(...allCoords)];
};
var selectReferenceElementsDomain = createSelector(selectReferenceDotsDomain, createSelector([selectReferenceLinesByAxis, pickAxisType], combineLinesDomain), selectReferenceAreasDomain, (dotsDomain, linesDomain, areasDomain) => {
	return mergeDomains(dotsDomain, areasDomain, linesDomain);
});
var combineNumericalDomain = (axisSettings, domainDefinition, domainFromUserPreference, domainOfStackGroups, dataAndErrorBarsDomain, referenceElementsDomain, layout, axisType) => {
	if (domainFromUserPreference != null) return domainFromUserPreference;
	return parseNumericalUserDomain(domainDefinition, layout === "vertical" && axisType === "xAxis" || layout === "horizontal" && axisType === "yAxis" ? mergeDomains(domainOfStackGroups, referenceElementsDomain, dataAndErrorBarsDomain) : mergeDomains(referenceElementsDomain, dataAndErrorBarsDomain), axisSettings.allowDataOverflow);
};
var selectNumericalDomain = createSelector([
	selectBaseAxis,
	selectDomainDefinition,
	selectDomainFromUserPreference,
	selectDomainOfStackGroups,
	selectDomainOfAllAppliedNumericalValuesIncludingErrorValues$1,
	selectReferenceElementsDomain,
	selectChartLayout,
	pickAxisType
], combineNumericalDomain, { memoizeOptions: { resultEqualityCheck: numberDomainEqualityCheck } });
var expandDomain = [0, 1];
var combineAxisDomain = (axisSettings, layout, displayedData, allAppliedValues, stackOffsetType, axisType, numericalDomain) => {
	if ((axisSettings == null || displayedData == null || displayedData.length === 0) && numericalDomain === void 0) return;
	var { dataKey, type } = axisSettings;
	var isCategorical = isCategoricalAxis(layout, axisType);
	if (isCategorical && dataKey == null) {
		var _displayedData$length;
		return (0, import_range.default)(0, (_displayedData$length = displayedData === null || displayedData === void 0 ? void 0 : displayedData.length) !== null && _displayedData$length !== void 0 ? _displayedData$length : 0);
	}
	if (type === "category") return computeDomainOfTypeCategory(allAppliedValues, axisSettings, isCategorical);
	if (stackOffsetType === "expand") return expandDomain;
	return numericalDomain;
};
var selectAxisDomain = createSelector([
	selectBaseAxis,
	selectChartLayout,
	selectDisplayedData,
	selectAllAppliedValues,
	selectStackOffsetType,
	pickAxisType,
	selectNumericalDomain
], combineAxisDomain);
var combineRealScaleType = (axisConfig, layout, hasBar, chartType, axisType) => {
	if (axisConfig == null) return;
	var { scale, type } = axisConfig;
	if (scale === "auto") {
		if (layout === "radial" && axisType === "radiusAxis") return "band";
		if (layout === "radial" && axisType === "angleAxis") return "linear";
		if (type === "category" && chartType && (chartType.indexOf("LineChart") >= 0 || chartType.indexOf("AreaChart") >= 0 || chartType.indexOf("ComposedChart") >= 0 && !hasBar)) return "point";
		if (type === "category") return "band";
		return "linear";
	}
	if (typeof scale === "string") {
		var name = "scale".concat(upperFirst(scale));
		return name in d3_scale_exports ? name : "point";
	}
};
var selectRealScaleType = createSelector([
	selectBaseAxis,
	selectChartLayout,
	selectHasBar,
	selectChartName,
	pickAxisType
], combineRealScaleType);
function getD3ScaleFromType(realScaleType) {
	if (realScaleType == null) return;
	if (realScaleType in d3_scale_exports) return d3_scale_exports[realScaleType]();
	var name = "scale".concat(upperFirst(realScaleType));
	if (name in d3_scale_exports) return d3_scale_exports[name]();
}
function combineScaleFunction(axis, realScaleType, axisDomain, axisRange) {
	if (axisDomain == null || axisRange == null) return;
	if (typeof axis.scale === "function") return axis.scale.copy().domain(axisDomain).range(axisRange);
	var d3ScaleFunction = getD3ScaleFromType(realScaleType);
	if (d3ScaleFunction == null) return;
	var scale = d3ScaleFunction.domain(axisDomain).range(axisRange);
	checkDomainOfScale(scale);
	return scale;
}
var combineNiceTicks = (axisDomain, axisSettings, realScaleType) => {
	var domainDefinition = getDomainDefinition(axisSettings);
	if (realScaleType !== "auto" && realScaleType !== "linear") return;
	if (axisSettings != null && axisSettings.tickCount && Array.isArray(domainDefinition) && (domainDefinition[0] === "auto" || domainDefinition[1] === "auto") && isWellFormedNumberDomain(axisDomain)) return getNiceTickValues(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals);
	if (axisSettings != null && axisSettings.tickCount && axisSettings.type === "number" && isWellFormedNumberDomain(axisDomain)) return getTickValuesFixedDomain(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals);
};
var selectNiceTicks = createSelector([
	selectAxisDomain,
	selectAxisSettings,
	selectRealScaleType
], combineNiceTicks);
var combineAxisDomainWithNiceTicks = (axisSettings, domain, niceTicks, axisType) => {
	if (axisType !== "angleAxis" && (axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.type) === "number" && isWellFormedNumberDomain(domain) && Array.isArray(niceTicks) && niceTicks.length > 0) {
		var minFromDomain = domain[0];
		var minFromTicks = niceTicks[0];
		var maxFromDomain = domain[1];
		var maxFromTicks = niceTicks[niceTicks.length - 1];
		return [Math.min(minFromDomain, minFromTicks), Math.max(maxFromDomain, maxFromTicks)];
	}
	return domain;
};
var selectAxisDomainIncludingNiceTicks = createSelector([
	selectBaseAxis,
	selectAxisDomain,
	selectNiceTicks,
	pickAxisType
], combineAxisDomainWithNiceTicks);
var selectCalculatedPadding = createSelector(createSelector(selectAllAppliedValues, selectBaseAxis, (allDataSquished, axisSettings) => {
	if (!axisSettings || axisSettings.type !== "number") return;
	var smallestDistanceBetweenValues = Infinity;
	var sortedValues = Array.from(onlyAllowNumbers(allDataSquished.map((d) => d.value))).sort((a, b) => a - b);
	if (sortedValues.length < 2) return Infinity;
	var diff = sortedValues[sortedValues.length - 1] - sortedValues[0];
	if (diff === 0) return Infinity;
	for (var i = 0; i < sortedValues.length - 1; i++) {
		var distance = sortedValues[i + 1] - sortedValues[i];
		smallestDistanceBetweenValues = Math.min(smallestDistanceBetweenValues, distance);
	}
	return smallestDistanceBetweenValues / diff;
}), selectChartLayout, selectBarCategoryGap, selectChartOffsetInternal, (_1, _2, _3, padding) => padding, (smallestDistanceInPercent, layout, barCategoryGap, offset, padding) => {
	if (!isWellBehavedNumber(smallestDistanceInPercent)) return 0;
	var rangeWidth = layout === "vertical" ? offset.height : offset.width;
	if (padding === "gap") return smallestDistanceInPercent * rangeWidth / 2;
	if (padding === "no-gap") {
		var gap = getPercentValue(barCategoryGap, smallestDistanceInPercent * rangeWidth);
		var halfBand = smallestDistanceInPercent * rangeWidth / 2;
		return halfBand - gap - (halfBand - gap) / rangeWidth * gap;
	}
	return 0;
});
var selectCalculatedXAxisPadding = (state, axisId) => {
	var xAxisSettings = selectXAxisSettings(state, axisId);
	if (xAxisSettings == null || typeof xAxisSettings.padding !== "string") return 0;
	return selectCalculatedPadding(state, "xAxis", axisId, xAxisSettings.padding);
};
var selectCalculatedYAxisPadding = (state, axisId) => {
	var yAxisSettings = selectYAxisSettings(state, axisId);
	if (yAxisSettings == null || typeof yAxisSettings.padding !== "string") return 0;
	return selectCalculatedPadding(state, "yAxis", axisId, yAxisSettings.padding);
};
var selectXAxisPadding = createSelector(selectXAxisSettings, selectCalculatedXAxisPadding, (xAxisSettings, calculated) => {
	var _padding$left, _padding$right;
	if (xAxisSettings == null) return {
		left: 0,
		right: 0
	};
	var { padding } = xAxisSettings;
	if (typeof padding === "string") return {
		left: calculated,
		right: calculated
	};
	return {
		left: ((_padding$left = padding.left) !== null && _padding$left !== void 0 ? _padding$left : 0) + calculated,
		right: ((_padding$right = padding.right) !== null && _padding$right !== void 0 ? _padding$right : 0) + calculated
	};
});
var selectYAxisPadding = createSelector(selectYAxisSettings, selectCalculatedYAxisPadding, (yAxisSettings, calculated) => {
	var _padding$top, _padding$bottom;
	if (yAxisSettings == null) return {
		top: 0,
		bottom: 0
	};
	var { padding } = yAxisSettings;
	if (typeof padding === "string") return {
		top: calculated,
		bottom: calculated
	};
	return {
		top: ((_padding$top = padding.top) !== null && _padding$top !== void 0 ? _padding$top : 0) + calculated,
		bottom: ((_padding$bottom = padding.bottom) !== null && _padding$bottom !== void 0 ? _padding$bottom : 0) + calculated
	};
});
var combineXAxisRange = createSelector([
	selectChartOffsetInternal,
	selectXAxisPadding,
	selectBrushDimensions,
	selectBrushSettings,
	(_state, _axisId, isPanorama) => isPanorama
], (offset, padding, brushDimensions, _ref4, isPanorama) => {
	var { padding: brushPadding } = _ref4;
	if (isPanorama) return [brushPadding.left, brushDimensions.width - brushPadding.right];
	return [offset.left + padding.left, offset.left + offset.width - padding.right];
});
var combineYAxisRange = createSelector([
	selectChartOffsetInternal,
	selectChartLayout,
	selectYAxisPadding,
	selectBrushDimensions,
	selectBrushSettings,
	(_state, _axisId, isPanorama) => isPanorama
], (offset, layout, padding, brushDimensions, _ref5, isPanorama) => {
	var { padding: brushPadding } = _ref5;
	if (isPanorama) return [brushDimensions.height - brushPadding.bottom, brushPadding.top];
	if (layout === "horizontal") return [offset.top + offset.height - padding.bottom, offset.top + padding.top];
	return [offset.top + padding.top, offset.top + offset.height - padding.bottom];
});
var selectAxisRange = (state, axisType, axisId, isPanorama) => {
	var _selectZAxisSettings;
	switch (axisType) {
		case "xAxis": return combineXAxisRange(state, axisId, isPanorama);
		case "yAxis": return combineYAxisRange(state, axisId, isPanorama);
		case "zAxis": return (_selectZAxisSettings = selectZAxisSettings(state, axisId)) === null || _selectZAxisSettings === void 0 ? void 0 : _selectZAxisSettings.range;
		case "angleAxis": return selectAngleAxisRange(state);
		case "radiusAxis": return selectRadiusAxisRange(state, axisId);
		default: return;
	}
};
var selectAxisRangeWithReverse = createSelector([selectBaseAxis, selectAxisRange], combineAxisRangeWithReverse);
var selectAxisScale = createSelector([
	selectBaseAxis,
	selectRealScaleType,
	selectAxisDomainIncludingNiceTicks,
	selectAxisRangeWithReverse
], combineScaleFunction);
createSelector([
	selectCartesianItemsSettings,
	selectAllErrorBarSettings,
	pickAxisType
], combineRelevantErrorBarSettings);
function compareIds(a, b) {
	if (a.id < b.id) return -1;
	if (a.id > b.id) return 1;
	return 0;
}
var pickAxisOrientation = (_state, orientation) => orientation;
var pickMirror = (_state, _orientation, mirror) => mirror;
var selectAllXAxesWithOffsetType = createSelector(selectAllXAxes, pickAxisOrientation, pickMirror, (allAxes, orientation, mirror) => allAxes.filter((axis) => axis.orientation === orientation).filter((axis) => axis.mirror === mirror).sort(compareIds));
var selectAllYAxesWithOffsetType = createSelector(selectAllYAxes, pickAxisOrientation, pickMirror, (allAxes, orientation, mirror) => allAxes.filter((axis) => axis.orientation === orientation).filter((axis) => axis.mirror === mirror).sort(compareIds));
var getXAxisSize = (offset, axisSettings) => {
	return {
		width: offset.width,
		height: axisSettings.height
	};
};
var getYAxisSize = (offset, axisSettings) => {
	return {
		width: typeof axisSettings.width === "number" ? axisSettings.width : 60,
		height: offset.height
	};
};
var selectXAxisSize = createSelector(selectChartOffsetInternal, selectXAxisSettings, getXAxisSize);
var combineXAxisPositionStartingPoint = (offset, orientation, chartHeight) => {
	switch (orientation) {
		case "top": return offset.top;
		case "bottom": return chartHeight - offset.bottom;
		default: return 0;
	}
};
var combineYAxisPositionStartingPoint = (offset, orientation, chartWidth) => {
	switch (orientation) {
		case "left": return offset.left;
		case "right": return chartWidth - offset.right;
		default: return 0;
	}
};
var selectAllXAxesOffsetSteps = createSelector(selectChartHeight, selectChartOffsetInternal, selectAllXAxesWithOffsetType, pickAxisOrientation, pickMirror, (chartHeight, offset, allAxesWithSameOffsetType, orientation, mirror) => {
	var steps = {};
	var position;
	allAxesWithSameOffsetType.forEach((axis) => {
		var axisSize = getXAxisSize(offset, axis);
		if (position == null) position = combineXAxisPositionStartingPoint(offset, orientation, chartHeight);
		var needSpace = orientation === "top" && !mirror || orientation === "bottom" && mirror;
		steps[axis.id] = position - Number(needSpace) * axisSize.height;
		position += (needSpace ? -1 : 1) * axisSize.height;
	});
	return steps;
});
var selectAllYAxesOffsetSteps = createSelector(selectChartWidth, selectChartOffsetInternal, selectAllYAxesWithOffsetType, pickAxisOrientation, pickMirror, (chartWidth, offset, allAxesWithSameOffsetType, orientation, mirror) => {
	var steps = {};
	var position;
	allAxesWithSameOffsetType.forEach((axis) => {
		var axisSize = getYAxisSize(offset, axis);
		if (position == null) position = combineYAxisPositionStartingPoint(offset, orientation, chartWidth);
		var needSpace = orientation === "left" && !mirror || orientation === "right" && mirror;
		steps[axis.id] = position - Number(needSpace) * axisSize.width;
		position += (needSpace ? -1 : 1) * axisSize.width;
	});
	return steps;
});
var selectXAxisOffsetSteps = (state, axisId) => {
	var axisSettings = selectXAxisSettings(state, axisId);
	if (axisSettings == null) return;
	return selectAllXAxesOffsetSteps(state, axisSettings.orientation, axisSettings.mirror);
};
var selectXAxisPosition = createSelector([
	selectChartOffsetInternal,
	selectXAxisSettings,
	selectXAxisOffsetSteps,
	(_, axisId) => axisId
], (offset, axisSettings, allSteps, axisId) => {
	if (axisSettings == null) return;
	var stepOfThisAxis = allSteps === null || allSteps === void 0 ? void 0 : allSteps[axisId];
	if (stepOfThisAxis == null) return {
		x: offset.left,
		y: 0
	};
	return {
		x: offset.left,
		y: stepOfThisAxis
	};
});
var selectYAxisOffsetSteps = (state, axisId) => {
	var axisSettings = selectYAxisSettings(state, axisId);
	if (axisSettings == null) return;
	return selectAllYAxesOffsetSteps(state, axisSettings.orientation, axisSettings.mirror);
};
var selectYAxisPosition = createSelector([
	selectChartOffsetInternal,
	selectYAxisSettings,
	selectYAxisOffsetSteps,
	(_, axisId) => axisId
], (offset, axisSettings, allSteps, axisId) => {
	if (axisSettings == null) return;
	var stepOfThisAxis = allSteps === null || allSteps === void 0 ? void 0 : allSteps[axisId];
	if (stepOfThisAxis == null) return {
		x: 0,
		y: offset.top
	};
	return {
		x: stepOfThisAxis,
		y: offset.top
	};
});
var selectYAxisSize = createSelector(selectChartOffsetInternal, selectYAxisSettings, (offset, axisSettings) => {
	return {
		width: typeof axisSettings.width === "number" ? axisSettings.width : 60,
		height: offset.height
	};
});
var combineDuplicateDomain = (chartLayout, appliedValues, axis, axisType) => {
	if (axis == null) return;
	var { allowDuplicatedCategory, type, dataKey } = axis;
	var isCategorical = isCategoricalAxis(chartLayout, axisType);
	var allData = appliedValues.map((av) => av.value);
	if (dataKey && isCategorical && type === "category" && allowDuplicatedCategory && hasDuplicate(allData)) return allData;
};
var selectDuplicateDomain = createSelector([
	selectChartLayout,
	selectAllAppliedValues,
	selectBaseAxis,
	pickAxisType
], combineDuplicateDomain);
var combineCategoricalDomain = (layout, appliedValues, axis, axisType) => {
	if (axis == null || axis.dataKey == null) return;
	var { type, scale } = axis;
	if (isCategoricalAxis(layout, axisType) && (type === "number" || scale !== "auto")) return appliedValues.map((d) => d.value);
};
var selectCategoricalDomain = createSelector([
	selectChartLayout,
	selectAllAppliedValues,
	selectAxisSettings,
	pickAxisType
], combineCategoricalDomain);
var selectAxisPropsNeededForCartesianGridTicksGenerator = createSelector([
	selectChartLayout,
	selectCartesianAxisSettings,
	selectRealScaleType,
	selectAxisScale,
	selectDuplicateDomain,
	selectCategoricalDomain,
	selectAxisRange,
	selectNiceTicks,
	pickAxisType
], (layout, axis, realScaleType, scale, duplicateDomain, categoricalDomain, axisRange, niceTicks, axisType) => {
	if (axis == null) return;
	var isCategorical = isCategoricalAxis(layout, axisType);
	return {
		angle: axis.angle,
		interval: axis.interval,
		minTickGap: axis.minTickGap,
		orientation: axis.orientation,
		tick: axis.tick,
		tickCount: axis.tickCount,
		tickFormatter: axis.tickFormatter,
		ticks: axis.ticks,
		type: axis.type,
		unit: axis.unit,
		axisType,
		categoricalDomain,
		duplicateDomain,
		isCategorical,
		niceTicks,
		range: axisRange,
		realScaleType,
		scale
	};
});
var combineAxisTicks = (layout, axis, realScaleType, scale, niceTicks, axisRange, duplicateDomain, categoricalDomain, axisType) => {
	if (axis == null || scale == null) return;
	var isCategorical = isCategoricalAxis(layout, axisType);
	var { type, ticks, tickCount } = axis;
	var offsetForBand = realScaleType === "scaleBand" && typeof scale.bandwidth === "function" ? scale.bandwidth() / 2 : 2;
	var offset = type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
	offset = axisType === "angleAxis" && axisRange != null && axisRange.length >= 2 ? mathSign(axisRange[0] - axisRange[1]) * 2 * offset : offset;
	var ticksOrNiceTicks = ticks || niceTicks;
	if (ticksOrNiceTicks) return ticksOrNiceTicks.map((entry, index) => {
		return {
			index,
			coordinate: scale(duplicateDomain ? duplicateDomain.indexOf(entry) : entry) + offset,
			value: entry,
			offset
		};
	}).filter((row) => isWellBehavedNumber(row.coordinate));
	if (isCategorical && categoricalDomain) return categoricalDomain.map((entry, index) => ({
		coordinate: scale(entry) + offset,
		value: entry,
		index,
		offset
	})).filter((row) => isWellBehavedNumber(row.coordinate));
	if (scale.ticks) return scale.ticks(tickCount).map((entry) => ({
		coordinate: scale(entry) + offset,
		value: entry,
		offset
	}));
	return scale.domain().map((entry, index) => ({
		coordinate: scale(entry) + offset,
		value: duplicateDomain ? duplicateDomain[entry] : entry,
		index,
		offset
	}));
};
var selectTicksOfAxis = createSelector([
	selectChartLayout,
	selectAxisSettings,
	selectRealScaleType,
	selectAxisScale,
	selectNiceTicks,
	selectAxisRange,
	selectDuplicateDomain,
	selectCategoricalDomain,
	pickAxisType
], combineAxisTicks);
var combineGraphicalItemTicks = (layout, axis, scale, axisRange, duplicateDomain, categoricalDomain, axisType) => {
	if (axis == null || scale == null || axisRange == null || axisRange[0] === axisRange[1]) return;
	var isCategorical = isCategoricalAxis(layout, axisType);
	var { tickCount } = axis;
	var offset = 0;
	offset = axisType === "angleAxis" && (axisRange === null || axisRange === void 0 ? void 0 : axisRange.length) >= 2 ? mathSign(axisRange[0] - axisRange[1]) * 2 * offset : offset;
	if (isCategorical && categoricalDomain) return categoricalDomain.map((entry, index) => ({
		coordinate: scale(entry) + offset,
		value: entry,
		index,
		offset
	}));
	if (scale.ticks) return scale.ticks(tickCount).map((entry) => ({
		coordinate: scale(entry) + offset,
		value: entry,
		offset
	}));
	return scale.domain().map((entry, index) => ({
		coordinate: scale(entry) + offset,
		value: duplicateDomain ? duplicateDomain[entry] : entry,
		index,
		offset
	}));
};
var selectTicksOfGraphicalItem = createSelector([
	selectChartLayout,
	selectAxisSettings,
	selectAxisScale,
	selectAxisRange,
	selectDuplicateDomain,
	selectCategoricalDomain,
	pickAxisType
], combineGraphicalItemTicks);
var selectAxisWithScale = createSelector(selectBaseAxis, selectAxisScale, (axis, scale) => {
	if (axis == null || scale == null) return;
	return _objectSpread$18(_objectSpread$18({}, axis), {}, { scale });
});
createSelector((state, _axisType, axisId) => selectZAxisSettings(state, axisId), createSelector([
	selectBaseAxis,
	selectRealScaleType,
	selectAxisDomain,
	selectAxisRangeWithReverse
], combineScaleFunction), (axis, scale) => {
	if (axis == null || scale == null) return;
	return _objectSpread$18(_objectSpread$18({}, axis), {}, { scale });
});
var selectChartDirection = createSelector([
	selectChartLayout,
	selectAllXAxes,
	selectAllYAxes
], (layout, allXAxes, allYAxes) => {
	switch (layout) {
		case "horizontal": return allXAxes.some((axis) => axis.reversed) ? "right-to-left" : "left-to-right";
		case "vertical": return allYAxes.some((axis) => axis.reversed) ? "bottom-to-top" : "top-to-bottom";
		case "centric":
		case "radial": return "left-to-right";
		default: return;
	}
});
var selectDefaultTooltipEventType = (state) => state.options.defaultTooltipEventType;
var selectValidateTooltipEventTypes = (state) => state.options.validateTooltipEventTypes;
function combineTooltipEventType(shared, defaultTooltipEventType, validateTooltipEventTypes) {
	if (shared == null) return defaultTooltipEventType;
	var eventType = shared ? "axis" : "item";
	if (validateTooltipEventTypes == null) return defaultTooltipEventType;
	return validateTooltipEventTypes.includes(eventType) ? eventType : defaultTooltipEventType;
}
function selectTooltipEventType(state, shared) {
	return combineTooltipEventType(shared, selectDefaultTooltipEventType(state), selectValidateTooltipEventTypes(state));
}
function useTooltipEventType(shared) {
	return useAppSelector((state) => selectTooltipEventType(state, shared));
}
var combineActiveLabel = (tooltipTicks, activeIndex) => {
	var _tooltipTicks$n;
	var n = Number(activeIndex);
	if (isNan(n) || activeIndex == null) return;
	return n >= 0 ? tooltipTicks === null || tooltipTicks === void 0 || (_tooltipTicks$n = tooltipTicks[n]) === null || _tooltipTicks$n === void 0 ? void 0 : _tooltipTicks$n.value : void 0;
};
var selectTooltipSettings = (state) => state.tooltip.settings;
var noInteraction = {
	active: false,
	index: null,
	dataKey: void 0,
	graphicalItemId: void 0,
	coordinate: void 0
};
var tooltipSlice = createSlice({
	name: "tooltip",
	initialState: {
		itemInteraction: {
			click: noInteraction,
			hover: noInteraction
		},
		axisInteraction: {
			click: noInteraction,
			hover: noInteraction
		},
		keyboardInteraction: noInteraction,
		syncInteraction: {
			active: false,
			index: null,
			dataKey: void 0,
			label: void 0,
			coordinate: void 0,
			sourceViewBox: void 0,
			graphicalItemId: void 0
		},
		tooltipItemPayloads: [],
		settings: {
			shared: void 0,
			trigger: "hover",
			axisId: 0,
			active: false,
			defaultIndex: void 0
		}
	},
	reducers: {
		addTooltipEntrySettings: {
			reducer(state, action) {
				state.tooltipItemPayloads.push(castDraft(action.payload));
			},
			prepare: prepareAutoBatched()
		},
		replaceTooltipEntrySettings: {
			reducer(state, action) {
				var { prev, next } = action.payload;
				var index = current(state).tooltipItemPayloads.indexOf(castDraft(prev));
				if (index > -1) state.tooltipItemPayloads[index] = castDraft(next);
			},
			prepare: prepareAutoBatched()
		},
		removeTooltipEntrySettings: {
			reducer(state, action) {
				var index = current(state).tooltipItemPayloads.indexOf(castDraft(action.payload));
				if (index > -1) state.tooltipItemPayloads.splice(index, 1);
			},
			prepare: prepareAutoBatched()
		},
		setTooltipSettingsState(state, action) {
			state.settings = action.payload;
		},
		setActiveMouseOverItemIndex(state, action) {
			state.syncInteraction.active = false;
			state.keyboardInteraction.active = false;
			state.itemInteraction.hover.active = true;
			state.itemInteraction.hover.index = action.payload.activeIndex;
			state.itemInteraction.hover.dataKey = action.payload.activeDataKey;
			state.itemInteraction.hover.graphicalItemId = action.payload.activeGraphicalItemId;
			state.itemInteraction.hover.coordinate = action.payload.activeCoordinate;
		},
		mouseLeaveChart(state) {
			state.itemInteraction.hover.active = false;
			state.axisInteraction.hover.active = false;
		},
		mouseLeaveItem(state) {
			state.itemInteraction.hover.active = false;
		},
		setActiveClickItemIndex(state, action) {
			state.syncInteraction.active = false;
			state.itemInteraction.click.active = true;
			state.keyboardInteraction.active = false;
			state.itemInteraction.click.index = action.payload.activeIndex;
			state.itemInteraction.click.dataKey = action.payload.activeDataKey;
			state.itemInteraction.click.graphicalItemId = action.payload.activeGraphicalItemId;
			state.itemInteraction.click.coordinate = action.payload.activeCoordinate;
		},
		setMouseOverAxisIndex(state, action) {
			state.syncInteraction.active = false;
			state.axisInteraction.hover.active = true;
			state.keyboardInteraction.active = false;
			state.axisInteraction.hover.index = action.payload.activeIndex;
			state.axisInteraction.hover.dataKey = action.payload.activeDataKey;
			state.axisInteraction.hover.coordinate = action.payload.activeCoordinate;
		},
		setMouseClickAxisIndex(state, action) {
			state.syncInteraction.active = false;
			state.keyboardInteraction.active = false;
			state.axisInteraction.click.active = true;
			state.axisInteraction.click.index = action.payload.activeIndex;
			state.axisInteraction.click.dataKey = action.payload.activeDataKey;
			state.axisInteraction.click.coordinate = action.payload.activeCoordinate;
		},
		setSyncInteraction(state, action) {
			state.syncInteraction = action.payload;
		},
		setKeyboardInteraction(state, action) {
			state.keyboardInteraction.active = action.payload.active;
			state.keyboardInteraction.index = action.payload.activeIndex;
			state.keyboardInteraction.coordinate = action.payload.activeCoordinate;
			state.keyboardInteraction.dataKey = action.payload.activeDataKey;
		}
	}
});
var { addTooltipEntrySettings, replaceTooltipEntrySettings, removeTooltipEntrySettings, setTooltipSettingsState, setActiveMouseOverItemIndex, mouseLeaveItem, mouseLeaveChart, setActiveClickItemIndex, setMouseOverAxisIndex, setMouseClickAxisIndex, setSyncInteraction, setKeyboardInteraction } = tooltipSlice.actions;
var tooltipReducer = tooltipSlice.reducer;
function ownKeys$17(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$17(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$17(Object(t), !0).forEach(function(r$1) {
			_defineProperty$19(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$17(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$19(e, r, t) {
	return (r = _toPropertyKey$19(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$19(t) {
	var i = _toPrimitive$19(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$19(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function chooseAppropriateMouseInteraction(tooltipState, tooltipEventType, trigger) {
	if (tooltipEventType === "axis") {
		if (trigger === "click") return tooltipState.axisInteraction.click;
		return tooltipState.axisInteraction.hover;
	}
	if (trigger === "click") return tooltipState.itemInteraction.click;
	return tooltipState.itemInteraction.hover;
}
function hasBeenActivePreviously(tooltipInteractionState) {
	return tooltipInteractionState.index != null;
}
var combineTooltipInteractionState = (tooltipState, tooltipEventType, trigger, defaultIndex) => {
	if (tooltipEventType == null) return noInteraction;
	var appropriateMouseInteraction = chooseAppropriateMouseInteraction(tooltipState, tooltipEventType, trigger);
	if (appropriateMouseInteraction == null) return noInteraction;
	if (appropriateMouseInteraction.active) return appropriateMouseInteraction;
	if (tooltipState.keyboardInteraction.active) return tooltipState.keyboardInteraction;
	if (tooltipState.syncInteraction.active && tooltipState.syncInteraction.index != null) return tooltipState.syncInteraction;
	var activeFromProps = tooltipState.settings.active === true;
	if (hasBeenActivePreviously(appropriateMouseInteraction)) {
		if (activeFromProps) return _objectSpread$17(_objectSpread$17({}, appropriateMouseInteraction), {}, { active: true });
	} else if (defaultIndex != null) return {
		active: true,
		coordinate: void 0,
		dataKey: void 0,
		index: defaultIndex,
		graphicalItemId: void 0
	};
	return _objectSpread$17(_objectSpread$17({}, noInteraction), {}, { coordinate: appropriateMouseInteraction.coordinate });
};
function toFiniteNumber(value) {
	if (typeof value === "number") return Number.isFinite(value) ? value : void 0;
	if (value instanceof Date) {
		var numericValue = value.valueOf();
		return Number.isFinite(numericValue) ? numericValue : void 0;
	}
	var parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : void 0;
}
function isValueWithinNumberDomain(value, domain) {
	var numericValue = toFiniteNumber(value);
	var lowerBound = domain[0];
	var upperBound = domain[1];
	if (numericValue === void 0) return false;
	return numericValue >= Math.min(lowerBound, upperBound) && numericValue <= Math.max(lowerBound, upperBound);
}
function isValueWithinDomain(entry, axisDataKey, domain) {
	if (domain == null || axisDataKey == null) return true;
	var value = getValueByDataKey(entry, axisDataKey);
	if (value == null) return true;
	if (!isWellFormedNumberDomain(domain)) return true;
	return isValueWithinNumberDomain(value, domain);
}
var combineActiveTooltipIndex = (tooltipInteraction, chartData, axisDataKey, domain) => {
	var desiredIndex = tooltipInteraction === null || tooltipInteraction === void 0 ? void 0 : tooltipInteraction.index;
	if (desiredIndex == null) return null;
	var indexAsNumber = Number(desiredIndex);
	if (!isWellBehavedNumber(indexAsNumber)) return desiredIndex;
	var lowerLimit = 0;
	var upperLimit = Infinity;
	if (chartData.length > 0) upperLimit = chartData.length - 1;
	var clampedIndex = Math.max(lowerLimit, Math.min(indexAsNumber, upperLimit));
	var entry = chartData[clampedIndex];
	if (entry == null) return String(clampedIndex);
	if (!isValueWithinDomain(entry, axisDataKey, domain)) return null;
	return String(clampedIndex);
};
var combineCoordinateForDefaultIndex = (width, height, layout, offset, tooltipTicks, defaultIndex, tooltipConfigurations, tooltipPayloadSearcher) => {
	if (defaultIndex == null || tooltipPayloadSearcher == null) return;
	var firstConfiguration = tooltipConfigurations[0];
	var maybePosition = firstConfiguration == null ? void 0 : tooltipPayloadSearcher(firstConfiguration.positions, defaultIndex);
	if (maybePosition != null) return maybePosition;
	var tick = tooltipTicks === null || tooltipTicks === void 0 ? void 0 : tooltipTicks[Number(defaultIndex)];
	if (!tick) return;
	switch (layout) {
		case "horizontal": return {
			x: tick.coordinate,
			y: (offset.top + height) / 2
		};
		default: return {
			x: (offset.left + width) / 2,
			y: tick.coordinate
		};
	}
};
var combineTooltipPayloadConfigurations = (tooltipState, tooltipEventType, trigger, defaultIndex) => {
	if (tooltipEventType === "axis") return tooltipState.tooltipItemPayloads;
	if (tooltipState.tooltipItemPayloads.length === 0) return [];
	var filterByDataKey;
	if (trigger === "hover") filterByDataKey = tooltipState.itemInteraction.hover.dataKey;
	else filterByDataKey = tooltipState.itemInteraction.click.dataKey;
	if (filterByDataKey == null && defaultIndex != null) return [tooltipState.tooltipItemPayloads[0]];
	return tooltipState.tooltipItemPayloads.filter((tpc) => {
		var _tpc$settings;
		return ((_tpc$settings = tpc.settings) === null || _tpc$settings === void 0 ? void 0 : _tpc$settings.dataKey) === filterByDataKey;
	});
};
var selectTooltipPayloadSearcher = (state) => state.options.tooltipPayloadSearcher;
var selectTooltipState = (state) => state.tooltip;
function ownKeys$16(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$16(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$16(Object(t), !0).forEach(function(r$1) {
			_defineProperty$18(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$16(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$18(e, r, t) {
	return (r = _toPropertyKey$18(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$18(t) {
	var i = _toPrimitive$18(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$18(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function selectFinalData(dataDefinedOnItem, dataDefinedOnChart) {
	if (dataDefinedOnItem != null) return dataDefinedOnItem;
	return dataDefinedOnChart;
}
var combineTooltipPayload = (tooltipPayloadConfigurations, activeIndex, chartDataState, tooltipAxisDataKey, activeLabel, tooltipPayloadSearcher, tooltipEventType) => {
	if (activeIndex == null || tooltipPayloadSearcher == null) return;
	var { chartData, computedData, dataStartIndex, dataEndIndex } = chartDataState;
	return tooltipPayloadConfigurations.reduce((agg, _ref$1) => {
		var _settings$dataKey;
		var { dataDefinedOnItem, settings } = _ref$1;
		var finalData = selectFinalData(dataDefinedOnItem, chartData);
		var sliced = Array.isArray(finalData) ? getSliced(finalData, dataStartIndex, dataEndIndex) : finalData;
		var finalDataKey = (_settings$dataKey = settings === null || settings === void 0 ? void 0 : settings.dataKey) !== null && _settings$dataKey !== void 0 ? _settings$dataKey : tooltipAxisDataKey;
		var finalNameKey = settings === null || settings === void 0 ? void 0 : settings.nameKey;
		var tooltipPayload;
		if (tooltipAxisDataKey && Array.isArray(sliced) && !Array.isArray(sliced[0]) && tooltipEventType === "axis") tooltipPayload = findEntryInArray(sliced, tooltipAxisDataKey, activeLabel);
		else tooltipPayload = tooltipPayloadSearcher(sliced, activeIndex, computedData, finalNameKey);
		if (Array.isArray(tooltipPayload)) tooltipPayload.forEach((item) => {
			var newSettings = _objectSpread$16(_objectSpread$16({}, settings), {}, {
				name: item.name,
				unit: item.unit,
				color: void 0,
				fill: void 0
			});
			agg.push(getTooltipEntry({
				tooltipEntrySettings: newSettings,
				dataKey: item.dataKey,
				payload: item.payload,
				value: getValueByDataKey(item.payload, item.dataKey),
				name: item.name
			}));
		});
		else {
			var _getValueByDataKey;
			agg.push(getTooltipEntry({
				tooltipEntrySettings: settings,
				dataKey: finalDataKey,
				payload: tooltipPayload,
				value: getValueByDataKey(tooltipPayload, finalDataKey),
				name: (_getValueByDataKey = getValueByDataKey(tooltipPayload, finalNameKey)) !== null && _getValueByDataKey !== void 0 ? _getValueByDataKey : settings === null || settings === void 0 ? void 0 : settings.name
			}));
		}
		return agg;
	}, []);
};
var selectTooltipAxisRealScaleType = createSelector([
	selectTooltipAxis,
	selectChartLayout,
	selectHasBar,
	selectChartName,
	selectTooltipAxisType
], combineRealScaleType);
var selectAllGraphicalItemsSettings = createSelector([
	createSelector([(state) => state.graphicalItems.cartesianItems, (state) => state.graphicalItems.polarItems], (cartesianItems, polarItems) => [...cartesianItems, ...polarItems]),
	selectTooltipAxis,
	createSelector([selectTooltipAxisType, selectTooltipAxisId], itemAxisPredicate)
], combineGraphicalItemsSettings, { memoizeOptions: { resultEqualityCheck: emptyArraysAreEqualCheck } });
var selectAllStackedGraphicalItemsSettings = createSelector([selectAllGraphicalItemsSettings], (graphicalItems) => graphicalItems.filter(isStacked));
var selectTooltipDisplayedData = createSelector([createSelector([selectAllGraphicalItemsSettings], combineGraphicalItemsData, { memoizeOptions: { resultEqualityCheck: emptyArraysAreEqualCheck } }), selectChartDataWithIndexes], combineDisplayedData);
var selectTooltipStackedData = createSelector([
	selectAllStackedGraphicalItemsSettings,
	selectChartDataWithIndexes,
	selectTooltipAxis
], combineDisplayedStackedData);
var selectAllTooltipAppliedValues = createSelector([
	selectTooltipDisplayedData,
	selectTooltipAxis,
	selectAllGraphicalItemsSettings
], combineAppliedValues);
var selectTooltipAxisDomainDefinition = createSelector([selectTooltipAxis], getDomainDefinition);
var selectTooltipDomainFromUserPreferences = createSelector([selectTooltipAxisDomainDefinition, createSelector([selectTooltipAxis], (axisSettings) => axisSettings.allowDataOverflow)], numericalDomainSpecifiedWithoutRequiringData);
var selectTooltipDomainOfStackGroups = createSelector([
	createSelector([
		selectTooltipStackedData,
		createSelector([selectAllGraphicalItemsSettings], (graphicalItems) => graphicalItems.filter(isStacked)),
		selectStackOffsetType,
		selectReverseStackOrder
	], combineStackGroups),
	selectChartDataWithIndexes,
	selectTooltipAxisType,
	selectTooltipDomainFromUserPreferences
], combineDomainOfStackGroups);
var selectDomainOfAllAppliedNumericalValuesIncludingErrorValues = createSelector([
	selectTooltipDisplayedData,
	selectTooltipAxis,
	createSelector([selectAllGraphicalItemsSettings], filterGraphicalNotStackedItems),
	selectAllErrorBarSettings,
	selectTooltipAxisType
], combineDomainOfAllAppliedNumericalValuesIncludingErrorValues, { memoizeOptions: { resultEqualityCheck: numberDomainEqualityCheck } });
var selectTooltipReferenceDotsDomain = createSelector([createSelector([
	selectReferenceDots,
	selectTooltipAxisType,
	selectTooltipAxisId
], filterReferenceElements), selectTooltipAxisType], combineDotsDomain);
var selectTooltipReferenceAreasDomain = createSelector([createSelector([
	selectReferenceAreas,
	selectTooltipAxisType,
	selectTooltipAxisId
], filterReferenceElements), selectTooltipAxisType], combineAreasDomain);
var selectTooltipAxisDomain = createSelector([
	selectTooltipAxis,
	selectChartLayout,
	selectTooltipDisplayedData,
	selectAllTooltipAppliedValues,
	selectStackOffsetType,
	selectTooltipAxisType,
	createSelector([
		selectTooltipAxis,
		selectTooltipAxisDomainDefinition,
		selectTooltipDomainFromUserPreferences,
		selectTooltipDomainOfStackGroups,
		selectDomainOfAllAppliedNumericalValuesIncludingErrorValues,
		createSelector([
			selectTooltipReferenceDotsDomain,
			createSelector([createSelector([
				selectReferenceLines,
				selectTooltipAxisType,
				selectTooltipAxisId
			], filterReferenceElements), selectTooltipAxisType], combineLinesDomain),
			selectTooltipReferenceAreasDomain
		], mergeDomains),
		selectChartLayout,
		selectTooltipAxisType
	], combineNumericalDomain)
], combineAxisDomain);
var selectTooltipAxisDomainIncludingNiceTicks = createSelector([
	selectTooltipAxis,
	selectTooltipAxisDomain,
	createSelector([
		selectTooltipAxisDomain,
		selectTooltipAxis,
		selectTooltipAxisRealScaleType
	], combineNiceTicks),
	selectTooltipAxisType
], combineAxisDomainWithNiceTicks);
var selectTooltipAxisRange = (state) => {
	return selectAxisRange(state, selectTooltipAxisType(state), selectTooltipAxisId(state), false);
};
var selectTooltipAxisRangeWithReverse = createSelector([selectTooltipAxis, selectTooltipAxisRange], combineAxisRangeWithReverse);
var selectTooltipAxisScale = createSelector([
	selectTooltipAxis,
	selectTooltipAxisRealScaleType,
	selectTooltipAxisDomainIncludingNiceTicks,
	selectTooltipAxisRangeWithReverse
], combineScaleFunction);
var selectTooltipDuplicateDomain = createSelector([
	selectChartLayout,
	selectAllTooltipAppliedValues,
	selectTooltipAxis,
	selectTooltipAxisType
], combineDuplicateDomain);
var selectTooltipCategoricalDomain = createSelector([
	selectChartLayout,
	selectAllTooltipAppliedValues,
	selectTooltipAxis,
	selectTooltipAxisType
], combineCategoricalDomain);
var combineTicksOfTooltipAxis = (layout, axis, realScaleType, scale, range$2, duplicateDomain, categoricalDomain, axisType) => {
	if (!axis) return;
	var { type } = axis;
	var isCategorical = isCategoricalAxis(layout, axisType);
	if (!scale) return;
	var offsetForBand = realScaleType === "scaleBand" && scale.bandwidth ? scale.bandwidth() / 2 : 2;
	var offset = type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
	offset = axisType === "angleAxis" && range$2 != null && (range$2 === null || range$2 === void 0 ? void 0 : range$2.length) >= 2 ? mathSign(range$2[0] - range$2[1]) * 2 * offset : offset;
	if (isCategorical && categoricalDomain) return categoricalDomain.map((entry, index) => ({
		coordinate: scale(entry) + offset,
		value: entry,
		index,
		offset
	}));
	return scale.domain().map((entry, index) => ({
		coordinate: scale(entry) + offset,
		value: duplicateDomain ? duplicateDomain[entry] : entry,
		index,
		offset
	}));
};
var selectTooltipAxisTicks = createSelector([
	selectChartLayout,
	selectTooltipAxis,
	selectTooltipAxisRealScaleType,
	selectTooltipAxisScale,
	selectTooltipAxisRange,
	selectTooltipDuplicateDomain,
	selectTooltipCategoricalDomain,
	selectTooltipAxisType
], combineTicksOfTooltipAxis);
var selectTooltipEventType$1 = createSelector([
	selectDefaultTooltipEventType,
	selectValidateTooltipEventTypes,
	selectTooltipSettings
], (defaultTooltipEventType, validateTooltipEventType, settings) => combineTooltipEventType(settings.shared, defaultTooltipEventType, validateTooltipEventType));
var selectTooltipTrigger = (state) => state.tooltip.settings.trigger;
var selectDefaultIndex = (state) => state.tooltip.settings.defaultIndex;
var selectTooltipInteractionState$1 = createSelector([
	selectTooltipState,
	selectTooltipEventType$1,
	selectTooltipTrigger,
	selectDefaultIndex
], combineTooltipInteractionState);
var selectActiveTooltipIndex = createSelector([
	selectTooltipInteractionState$1,
	selectTooltipDisplayedData,
	selectTooltipAxisDataKey,
	selectTooltipAxisDomain
], combineActiveTooltipIndex);
var selectActiveLabel = createSelector([selectTooltipAxisTicks, selectActiveTooltipIndex], combineActiveLabel);
var selectActiveTooltipDataKey = createSelector([selectTooltipInteractionState$1], (tooltipInteraction) => {
	if (!tooltipInteraction) return;
	return tooltipInteraction.dataKey;
});
createSelector([selectTooltipInteractionState$1], (tooltipInteraction) => {
	if (!tooltipInteraction) return;
	return tooltipInteraction.graphicalItemId;
});
var selectTooltipPayloadConfigurations$1 = createSelector([
	selectTooltipState,
	selectTooltipEventType$1,
	selectTooltipTrigger,
	selectDefaultIndex
], combineTooltipPayloadConfigurations);
var selectActiveTooltipCoordinate = createSelector([selectTooltipInteractionState$1, createSelector([
	selectChartWidth,
	selectChartHeight,
	selectChartLayout,
	selectChartOffsetInternal,
	selectTooltipAxisTicks,
	selectDefaultIndex,
	selectTooltipPayloadConfigurations$1,
	selectTooltipPayloadSearcher
], combineCoordinateForDefaultIndex)], (tooltipInteractionState, defaultIndexCoordinate) => {
	if (tooltipInteractionState !== null && tooltipInteractionState !== void 0 && tooltipInteractionState.coordinate) return tooltipInteractionState.coordinate;
	return defaultIndexCoordinate;
});
var selectIsTooltipActive = createSelector([selectTooltipInteractionState$1], (tooltipInteractionState) => tooltipInteractionState.active);
var selectActiveTooltipDataPoints = createSelector([createSelector([
	selectTooltipPayloadConfigurations$1,
	selectActiveTooltipIndex,
	selectChartDataWithIndexes,
	selectTooltipAxisDataKey,
	selectActiveLabel,
	selectTooltipPayloadSearcher,
	selectTooltipEventType$1
], combineTooltipPayload)], (payload) => {
	if (payload == null) return;
	var dataPoints = payload.map((p) => p.payload).filter((p) => p != null);
	return Array.from(new Set(dataPoints));
});
function ownKeys$15(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$15(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$15(Object(t), !0).forEach(function(r$1) {
			_defineProperty$17(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$15(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$17(e, r, t) {
	return (r = _toPropertyKey$17(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$17(t) {
	var i = _toPrimitive$17(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$17(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var useTooltipAxis = () => useAppSelector(selectTooltipAxis);
var useTooltipAxisBandSize = () => {
	var tooltipAxis = useTooltipAxis();
	var tooltipTicks = useAppSelector(selectTooltipAxisTicks);
	var tooltipAxisScale = useAppSelector(selectTooltipAxisScale);
	if (!tooltipAxis || !tooltipAxisScale) return getBandSizeOfAxis(void 0, tooltipTicks);
	return getBandSizeOfAxis(_objectSpread$15(_objectSpread$15({}, tooltipAxis), {}, { scale: tooltipAxisScale }), tooltipTicks);
};
function ownKeys$14(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$14(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$14(Object(t), !0).forEach(function(r$1) {
			_defineProperty$16(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$14(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$16(e, r, t) {
	return (r = _toPropertyKey$16(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$16(t) {
	var i = _toPrimitive$16(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$16(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var getActiveCartesianCoordinate = (layout, tooltipTicks, activeIndex, pointer) => {
	var entry = tooltipTicks.find((tick) => tick && tick.index === activeIndex);
	if (entry) {
		if (layout === "horizontal") return {
			x: entry.coordinate,
			y: pointer.chartY
		};
		if (layout === "vertical") return {
			x: pointer.chartX,
			y: entry.coordinate
		};
	}
	return {
		x: 0,
		y: 0
	};
};
var getActivePolarCoordinate = (layout, tooltipTicks, activeIndex, rangeObj) => {
	var entry = tooltipTicks.find((tick) => tick && tick.index === activeIndex);
	if (entry) {
		if (layout === "centric") {
			var _angle = entry.coordinate;
			var { radius: _radius } = rangeObj;
			return _objectSpread$14(_objectSpread$14(_objectSpread$14({}, rangeObj), polarToCartesian(rangeObj.cx, rangeObj.cy, _radius, _angle)), {}, {
				angle: _angle,
				radius: _radius
			});
		}
		var radius = entry.coordinate;
		var { angle } = rangeObj;
		return _objectSpread$14(_objectSpread$14(_objectSpread$14({}, rangeObj), polarToCartesian(rangeObj.cx, rangeObj.cy, radius, angle)), {}, {
			angle,
			radius
		});
	}
	return {
		angle: 0,
		clockWise: false,
		cx: 0,
		cy: 0,
		endAngle: 0,
		innerRadius: 0,
		outerRadius: 0,
		radius: 0,
		startAngle: 0,
		x: 0,
		y: 0
	};
};
function isInCartesianRange(pointer, offset) {
	var { chartX: x, chartY: y } = pointer;
	return x >= offset.left && x <= offset.left + offset.width && y >= offset.top && y <= offset.top + offset.height;
}
var calculateActiveTickIndex = (coordinate, ticks, unsortedTicks, axisType, range$2) => {
	var _ticks$length;
	var index = -1;
	var len = (_ticks$length = ticks === null || ticks === void 0 ? void 0 : ticks.length) !== null && _ticks$length !== void 0 ? _ticks$length : 0;
	if (len <= 1 || coordinate == null) return 0;
	if (axisType === "angleAxis" && range$2 != null && Math.abs(Math.abs(range$2[1] - range$2[0]) - 360) <= 1e-6) for (var i = 0; i < len; i++) {
		var before = i > 0 ? unsortedTicks[i - 1].coordinate : unsortedTicks[len - 1].coordinate;
		var cur = unsortedTicks[i].coordinate;
		var after = i >= len - 1 ? unsortedTicks[0].coordinate : unsortedTicks[i + 1].coordinate;
		var sameDirectionCoord = void 0;
		if (mathSign(cur - before) !== mathSign(after - cur)) {
			var diffInterval = [];
			if (mathSign(after - cur) === mathSign(range$2[1] - range$2[0])) {
				sameDirectionCoord = after;
				var curInRange = cur + range$2[1] - range$2[0];
				diffInterval[0] = Math.min(curInRange, (curInRange + before) / 2);
				diffInterval[1] = Math.max(curInRange, (curInRange + before) / 2);
			} else {
				sameDirectionCoord = before;
				var afterInRange = after + range$2[1] - range$2[0];
				diffInterval[0] = Math.min(cur, (afterInRange + cur) / 2);
				diffInterval[1] = Math.max(cur, (afterInRange + cur) / 2);
			}
			var sameInterval = [Math.min(cur, (sameDirectionCoord + cur) / 2), Math.max(cur, (sameDirectionCoord + cur) / 2)];
			if (coordinate > sameInterval[0] && coordinate <= sameInterval[1] || coordinate >= diffInterval[0] && coordinate <= diffInterval[1]) {
				({index} = unsortedTicks[i]);
				break;
			}
		} else {
			var minValue = Math.min(before, after);
			var maxValue = Math.max(before, after);
			if (coordinate > (minValue + cur) / 2 && coordinate <= (maxValue + cur) / 2) {
				({index} = unsortedTicks[i]);
				break;
			}
		}
	}
	else if (ticks) {
		for (var _i = 0; _i < len; _i++) if (_i === 0 && coordinate <= (ticks[_i].coordinate + ticks[_i + 1].coordinate) / 2 || _i > 0 && _i < len - 1 && coordinate > (ticks[_i].coordinate + ticks[_i - 1].coordinate) / 2 && coordinate <= (ticks[_i].coordinate + ticks[_i + 1].coordinate) / 2 || _i === len - 1 && coordinate > (ticks[_i].coordinate + ticks[_i - 1].coordinate) / 2) {
			({index} = ticks[_i]);
			break;
		}
	}
	return index;
};
var import_sortBy = /* @__PURE__ */ __toESM(require_sortBy());
var useChartName = () => {
	return useAppSelector(selectChartName);
};
var pickTooltipEventType = (_state, tooltipEventType) => tooltipEventType;
var pickTrigger = (_state, _tooltipEventType, trigger) => trigger;
var pickDefaultIndex = (_state, _tooltipEventType, _trigger, defaultIndex) => defaultIndex;
var selectOrderedTooltipTicks = createSelector(selectTooltipAxisTicks, (ticks) => (0, import_sortBy.default)(ticks, (o) => o.coordinate));
var selectTooltipInteractionState = createSelector([
	selectTooltipState,
	pickTooltipEventType,
	pickTrigger,
	pickDefaultIndex
], combineTooltipInteractionState);
var selectActiveIndex = createSelector([
	selectTooltipInteractionState,
	selectTooltipDisplayedData,
	selectTooltipAxisDataKey,
	selectTooltipAxisDomain
], combineActiveTooltipIndex);
var selectTooltipDataKey = (state, tooltipEventType, trigger) => {
	if (tooltipEventType == null) return;
	var tooltipState = selectTooltipState(state);
	if (tooltipEventType === "axis") {
		if (trigger === "hover") return tooltipState.axisInteraction.hover.dataKey;
		return tooltipState.axisInteraction.click.dataKey;
	}
	if (trigger === "hover") return tooltipState.itemInteraction.hover.dataKey;
	return tooltipState.itemInteraction.click.dataKey;
};
var selectTooltipPayloadConfigurations = createSelector([
	selectTooltipState,
	pickTooltipEventType,
	pickTrigger,
	pickDefaultIndex
], combineTooltipPayloadConfigurations);
var selectCoordinateForDefaultIndex = createSelector([
	selectChartWidth,
	selectChartHeight,
	selectChartLayout,
	selectChartOffsetInternal,
	selectTooltipAxisTicks,
	pickDefaultIndex,
	selectTooltipPayloadConfigurations,
	selectTooltipPayloadSearcher
], combineCoordinateForDefaultIndex);
var selectActiveCoordinate = createSelector([selectTooltipInteractionState, selectCoordinateForDefaultIndex], (tooltipInteractionState, defaultIndexCoordinate) => {
	var _tooltipInteractionSt;
	return (_tooltipInteractionSt = tooltipInteractionState.coordinate) !== null && _tooltipInteractionSt !== void 0 ? _tooltipInteractionSt : defaultIndexCoordinate;
});
var selectActiveLabel$1 = createSelector([selectTooltipAxisTicks, selectActiveIndex], combineActiveLabel);
var selectTooltipPayload = createSelector([
	selectTooltipPayloadConfigurations,
	selectActiveIndex,
	selectChartDataWithIndexes,
	selectTooltipAxisDataKey,
	selectActiveLabel$1,
	selectTooltipPayloadSearcher,
	pickTooltipEventType
], combineTooltipPayload);
var selectIsTooltipActive$1 = createSelector([selectTooltipInteractionState, selectActiveIndex], (tooltipInteractionState, activeIndex) => {
	return {
		isActive: tooltipInteractionState.active && activeIndex != null,
		activeIndex
	};
});
var combineActiveCartesianProps = (chartEvent, layout, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks, offset) => {
	if (!chartEvent || !tooltipAxisType || !tooltipAxisRange || !tooltipTicks) return;
	if (!isInCartesianRange(chartEvent, offset)) return;
	var activeIndex = calculateActiveTickIndex(calculateCartesianTooltipPos(chartEvent, layout), orderedTooltipTicks, tooltipTicks, tooltipAxisType, tooltipAxisRange);
	var activeCoordinate = getActiveCartesianCoordinate(layout, tooltipTicks, activeIndex, chartEvent);
	return {
		activeIndex: String(activeIndex),
		activeCoordinate
	};
};
var combineActivePolarProps = (chartEvent, layout, polarViewBox, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks) => {
	if (!chartEvent || !tooltipAxisType || !tooltipAxisRange || !tooltipTicks || !polarViewBox) return;
	var rangeObj = inRangeOfSector(chartEvent, polarViewBox);
	if (!rangeObj) return;
	var activeIndex = calculateActiveTickIndex(calculatePolarTooltipPos(rangeObj, layout), orderedTooltipTicks, tooltipTicks, tooltipAxisType, tooltipAxisRange);
	var activeCoordinate = getActivePolarCoordinate(layout, tooltipTicks, activeIndex, rangeObj);
	return {
		activeIndex: String(activeIndex),
		activeCoordinate
	};
};
var combineActiveProps = (chartEvent, layout, polarViewBox, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks, offset) => {
	if (!chartEvent || !layout || !tooltipAxisType || !tooltipAxisRange || !tooltipTicks) return;
	if (layout === "horizontal" || layout === "vertical") return combineActiveCartesianProps(chartEvent, layout, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks, offset);
	return combineActivePolarProps(chartEvent, layout, polarViewBox, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks);
};
var selectZIndexPortalId = createSelector((state) => state.zIndex.zIndexMap, (_, zIndex) => zIndex, (_, _zIndex, isPanorama) => isPanorama, (zIndexMap, zIndex, isPanorama) => {
	if (zIndex == null) return;
	var entry = zIndexMap[zIndex];
	if (entry == null) return;
	if (isPanorama) return entry.panoramaElementId;
	return entry.elementId;
});
var selectAllRegisteredZIndexes = createSelector((state) => state.zIndex.zIndexMap, (zIndexMap) => {
	var allNumbers = Object.keys(zIndexMap).map((zIndexStr) => parseInt(zIndexStr, 10)).concat(Object.values(DefaultZIndexes));
	return Array.from(new Set(allNumbers)).sort((a, b) => a - b);
}, { memoizeOptions: { resultEqualityCheck: arrayContentsAreEqualCheck } });
function ownKeys$13(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$13(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$13(Object(t), !0).forEach(function(r$1) {
			_defineProperty$15(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$13(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$15(e, r, t) {
	return (r = _toPropertyKey$15(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$15(t) {
	var i = _toPrimitive$15(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$15(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var initialState$3 = { zIndexMap: Object.values(DefaultZIndexes).reduce((acc, current$1) => _objectSpread$13(_objectSpread$13({}, acc), {}, { [current$1]: {
	elementId: void 0,
	panoramaElementId: void 0,
	consumers: 0
} }), {}) };
var defaultZIndexSet = new Set(Object.values(DefaultZIndexes));
function isDefaultZIndex(zIndex) {
	return defaultZIndexSet.has(zIndex);
}
var zIndexSlice = createSlice({
	name: "zIndex",
	initialState: initialState$3,
	reducers: {
		registerZIndexPortal: {
			reducer: (state, action) => {
				var { zIndex } = action.payload;
				if (state.zIndexMap[zIndex]) state.zIndexMap[zIndex].consumers += 1;
				else state.zIndexMap[zIndex] = {
					consumers: 1,
					elementId: void 0,
					panoramaElementId: void 0
				};
			},
			prepare: prepareAutoBatched()
		},
		unregisterZIndexPortal: {
			reducer: (state, action) => {
				var { zIndex } = action.payload;
				if (state.zIndexMap[zIndex]) {
					state.zIndexMap[zIndex].consumers -= 1;
					if (state.zIndexMap[zIndex].consumers <= 0 && !isDefaultZIndex(zIndex)) delete state.zIndexMap[zIndex];
				}
			},
			prepare: prepareAutoBatched()
		},
		registerZIndexPortalId: {
			reducer: (state, action) => {
				var { zIndex, elementId, isPanorama } = action.payload;
				if (state.zIndexMap[zIndex]) if (isPanorama) state.zIndexMap[zIndex].panoramaElementId = elementId;
				else state.zIndexMap[zIndex].elementId = elementId;
				else state.zIndexMap[zIndex] = {
					consumers: 0,
					elementId: isPanorama ? void 0 : elementId,
					panoramaElementId: isPanorama ? elementId : void 0
				};
			},
			prepare: prepareAutoBatched()
		},
		unregisterZIndexPortalId: {
			reducer: (state, action) => {
				var { zIndex } = action.payload;
				if (state.zIndexMap[zIndex]) if (action.payload.isPanorama) state.zIndexMap[zIndex].panoramaElementId = void 0;
				else state.zIndexMap[zIndex].elementId = void 0;
			},
			prepare: prepareAutoBatched()
		}
	}
});
var { registerZIndexPortal, unregisterZIndexPortal, registerZIndexPortalId, unregisterZIndexPortalId } = zIndexSlice.actions;
var zIndexReducer = zIndexSlice.reducer;
var import_react_dom$1 = require_react_dom();
function ZIndexLayer(_ref$1) {
	var { zIndex, children } = _ref$1;
	var shouldRenderInPortal = useIsInChartContext() && zIndex !== void 0 && zIndex !== 0;
	var isPanorama = useIsPanorama();
	var dispatch = useAppDispatch();
	(0, import_react.useLayoutEffect)(() => {
		if (!shouldRenderInPortal) return noop;
		dispatch(registerZIndexPortal({ zIndex }));
		return () => {
			dispatch(unregisterZIndexPortal({ zIndex }));
		};
	}, [
		dispatch,
		zIndex,
		shouldRenderInPortal
	]);
	var portalId = useAppSelector((state) => selectZIndexPortalId(state, zIndex, isPanorama));
	if (!shouldRenderInPortal) return children;
	if (!portalId) return null;
	var zIndexPortal = document.getElementById(portalId);
	if (zIndexPortal) return /* @__PURE__ */ (0, import_react_dom$1.createPortal)(children, zIndexPortal);
	return null;
}
function _extends$13() {
	return _extends$13 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$13.apply(null, arguments);
}
function ownKeys$12(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$12(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$12(Object(t), !0).forEach(function(r$1) {
			_defineProperty$14(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$12(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$14(e, r, t) {
	return (r = _toPropertyKey$14(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$14(t) {
	var i = _toPrimitive$14(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$14(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function RenderCursor(_ref$1) {
	var { cursor, cursorComp, cursorProps } = _ref$1;
	if (/* @__PURE__ */ (0, import_react.isValidElement)(cursor)) return /* @__PURE__ */ (0, import_react.cloneElement)(cursor, cursorProps);
	return /* @__PURE__ */ (0, import_react.createElement)(cursorComp, cursorProps);
}
function CursorInternal(props) {
	var _props$zIndex;
	var { coordinate, payload, index, offset, tooltipAxisBandSize, layout, cursor, tooltipEventType, chartName } = props;
	var activeCoordinate = coordinate;
	var activePayload = payload;
	var activeTooltipIndex = index;
	if (!cursor || !activeCoordinate || chartName !== "ScatterChart" && tooltipEventType !== "axis") return null;
	var restProps, cursorComp, preferredZIndex;
	if (chartName === "ScatterChart") {
		restProps = activeCoordinate;
		cursorComp = Cross;
		preferredZIndex = DefaultZIndexes.cursorLine;
	} else if (chartName === "BarChart") {
		restProps = getCursorRectangle(layout, activeCoordinate, offset, tooltipAxisBandSize);
		cursorComp = Rectangle;
		preferredZIndex = DefaultZIndexes.cursorRectangle;
	} else if (layout === "radial" && isPolarCoordinate(activeCoordinate)) {
		var { cx, cy, radius, startAngle, endAngle } = getRadialCursorPoints(activeCoordinate);
		restProps = {
			cx,
			cy,
			startAngle,
			endAngle,
			innerRadius: radius,
			outerRadius: radius
		};
		cursorComp = Sector;
		preferredZIndex = DefaultZIndexes.cursorLine;
	} else {
		restProps = { points: getCursorPoints(layout, activeCoordinate, offset) };
		cursorComp = Curve;
		preferredZIndex = DefaultZIndexes.cursorLine;
	}
	var extraClassName = typeof cursor === "object" && "className" in cursor ? cursor.className : void 0;
	var cursorProps = _objectSpread$12(_objectSpread$12(_objectSpread$12(_objectSpread$12({
		stroke: "#ccc",
		pointerEvents: "none"
	}, offset), restProps), svgPropertiesNoEventsFromUnknown(cursor)), {}, {
		payload: activePayload,
		payloadIndex: activeTooltipIndex,
		className: clsx("recharts-tooltip-cursor", extraClassName)
	});
	return /* @__PURE__ */ import_react.createElement(ZIndexLayer, { zIndex: (_props$zIndex = props.zIndex) !== null && _props$zIndex !== void 0 ? _props$zIndex : preferredZIndex }, /* @__PURE__ */ import_react.createElement(RenderCursor, {
		cursor,
		cursorComp,
		cursorProps
	}));
}
function Cursor(props) {
	var tooltipAxisBandSize = useTooltipAxisBandSize();
	var offset = useOffsetInternal();
	var layout = useChartLayout();
	var chartName = useChartName();
	if (tooltipAxisBandSize == null || offset == null || layout == null || chartName == null) return null;
	return /* @__PURE__ */ import_react.createElement(CursorInternal, _extends$13({}, props, {
		offset,
		layout,
		tooltipAxisBandSize,
		chartName
	}));
}
var TooltipPortalContext = /* @__PURE__ */ (0, import_react.createContext)(null);
var useTooltipPortal = () => (0, import_react.useContext)(TooltipPortalContext);
var eventCenter = new eventemitter3_default();
var TOOLTIP_SYNC_EVENT = "recharts.syncEvent.tooltip";
var BRUSH_SYNC_EVENT = "recharts.syncEvent.brush";
function arrayTooltipSearcher(data, strIndex) {
	if (!strIndex) return void 0;
	var numIndex = Number.parseInt(strIndex, 10);
	if (isNan(numIndex)) return;
	return data === null || data === void 0 ? void 0 : data[numIndex];
}
var optionsSlice = createSlice({
	name: "options",
	initialState: {
		chartName: "",
		tooltipPayloadSearcher: void 0,
		eventEmitter: void 0,
		defaultTooltipEventType: "axis"
	},
	reducers: { createEventEmitter: (state) => {
		if (state.eventEmitter == null) state.eventEmitter = Symbol("rechartsEventEmitter");
	} }
});
var optionsReducer = optionsSlice.reducer;
var { createEventEmitter } = optionsSlice.actions;
function selectSynchronisedTooltipState(state) {
	return state.tooltip.syncInteraction;
}
var chartDataSlice = createSlice({
	name: "chartData",
	initialState: {
		chartData: void 0,
		computedData: void 0,
		dataStartIndex: 0,
		dataEndIndex: 0
	},
	reducers: {
		setChartData(state, action) {
			state.chartData = action.payload;
			if (action.payload == null) {
				state.dataStartIndex = 0;
				state.dataEndIndex = 0;
				return;
			}
			if (action.payload.length > 0 && state.dataEndIndex !== action.payload.length - 1) state.dataEndIndex = action.payload.length - 1;
		},
		setComputedData(state, action) {
			state.computedData = action.payload;
		},
		setDataStartEndIndexes(state, action) {
			var { startIndex, endIndex } = action.payload;
			if (startIndex != null) state.dataStartIndex = startIndex;
			if (endIndex != null) state.dataEndIndex = endIndex;
		}
	}
});
var { setChartData, setDataStartEndIndexes, setComputedData } = chartDataSlice.actions;
var chartDataReducer = chartDataSlice.reducer;
var _excluded$12 = ["x", "y"];
function ownKeys$11(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$11(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$11(Object(t), !0).forEach(function(r$1) {
			_defineProperty$13(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$11(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$13(e, r, t) {
	return (r = _toPropertyKey$13(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$13(t) {
	var i = _toPrimitive$13(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$13(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$12(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$12(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$12(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function useTooltipSyncEventsListener() {
	var mySyncId = useAppSelector(selectSyncId);
	var myEventEmitter = useAppSelector(selectEventEmitter);
	var dispatch = useAppDispatch();
	var syncMethod = useAppSelector(selectSyncMethod);
	var tooltipTicks = useAppSelector(selectTooltipAxisTicks);
	var layout = useChartLayout();
	var viewBox = useViewBox();
	(0, import_react.useEffect)(() => {
		if (mySyncId == null) return noop;
		var listener = (incomingSyncId, action, emitter) => {
			if (myEventEmitter === emitter) return;
			if (mySyncId !== incomingSyncId) return;
			if (syncMethod === "index") {
				var _action$payload;
				if (viewBox && action !== null && action !== void 0 && (_action$payload = action.payload) !== null && _action$payload !== void 0 && _action$payload.coordinate && action.payload.sourceViewBox) {
					var _action$payload$coord = action.payload.coordinate, { x: _x, y: _y } = _action$payload$coord, otherCoordinateProps = _objectWithoutProperties$12(_action$payload$coord, _excluded$12);
					var { x: sourceX, y: sourceY, width: sourceWidth, height: sourceHeight } = action.payload.sourceViewBox;
					var scaledCoordinate = _objectSpread$11(_objectSpread$11({}, otherCoordinateProps), {}, {
						x: viewBox.x + (sourceWidth ? (_x - sourceX) / sourceWidth : 0) * viewBox.width,
						y: viewBox.y + (sourceHeight ? (_y - sourceY) / sourceHeight : 0) * viewBox.height
					});
					dispatch(_objectSpread$11(_objectSpread$11({}, action), {}, { payload: _objectSpread$11(_objectSpread$11({}, action.payload), {}, { coordinate: scaledCoordinate }) }));
				} else dispatch(action);
				return;
			}
			if (tooltipTicks == null) return;
			var activeTick;
			if (typeof syncMethod === "function") activeTick = tooltipTicks[syncMethod(tooltipTicks, {
				activeTooltipIndex: action.payload.index == null ? void 0 : Number(action.payload.index),
				isTooltipActive: action.payload.active,
				activeIndex: action.payload.index == null ? void 0 : Number(action.payload.index),
				activeLabel: action.payload.label,
				activeDataKey: action.payload.dataKey,
				activeCoordinate: action.payload.coordinate
			})];
			else if (syncMethod === "value") activeTick = tooltipTicks.find((tick) => String(tick.value) === action.payload.label);
			var { coordinate } = action.payload;
			if (activeTick == null || action.payload.active === false || coordinate == null || viewBox == null) {
				dispatch(setSyncInteraction({
					active: false,
					coordinate: void 0,
					dataKey: void 0,
					index: null,
					label: void 0,
					sourceViewBox: void 0,
					graphicalItemId: void 0
				}));
				return;
			}
			var { x, y } = coordinate;
			var validateChartX = Math.min(x, viewBox.x + viewBox.width);
			var validateChartY = Math.min(y, viewBox.y + viewBox.height);
			var activeCoordinate = {
				x: layout === "horizontal" ? activeTick.coordinate : validateChartX,
				y: layout === "horizontal" ? validateChartY : activeTick.coordinate
			};
			dispatch(setSyncInteraction({
				active: action.payload.active,
				coordinate: activeCoordinate,
				dataKey: action.payload.dataKey,
				index: String(activeTick.index),
				label: action.payload.label,
				sourceViewBox: action.payload.sourceViewBox,
				graphicalItemId: action.payload.graphicalItemId
			}));
		};
		eventCenter.on(TOOLTIP_SYNC_EVENT, listener);
		return () => {
			eventCenter.off(TOOLTIP_SYNC_EVENT, listener);
		};
	}, [
		useAppSelector((state) => state.rootProps.className),
		dispatch,
		myEventEmitter,
		mySyncId,
		syncMethod,
		tooltipTicks,
		layout,
		viewBox
	]);
}
function useBrushSyncEventsListener() {
	var mySyncId = useAppSelector(selectSyncId);
	var myEventEmitter = useAppSelector(selectEventEmitter);
	var dispatch = useAppDispatch();
	(0, import_react.useEffect)(() => {
		if (mySyncId == null) return noop;
		var listener = (incomingSyncId, action, emitter) => {
			if (myEventEmitter === emitter) return;
			if (mySyncId === incomingSyncId) dispatch(setDataStartEndIndexes(action));
		};
		eventCenter.on(BRUSH_SYNC_EVENT, listener);
		return () => {
			eventCenter.off(BRUSH_SYNC_EVENT, listener);
		};
	}, [
		dispatch,
		myEventEmitter,
		mySyncId
	]);
}
function useSynchronisedEventsFromOtherCharts() {
	var dispatch = useAppDispatch();
	(0, import_react.useEffect)(() => {
		dispatch(createEventEmitter());
	}, [dispatch]);
	useTooltipSyncEventsListener();
	useBrushSyncEventsListener();
}
function useTooltipChartSynchronisation(tooltipEventType, trigger, activeCoordinate, activeLabel, activeIndex, isTooltipActive) {
	var activeDataKey = useAppSelector((state) => selectTooltipDataKey(state, tooltipEventType, trigger));
	var eventEmitterSymbol = useAppSelector(selectEventEmitter);
	var syncId = useAppSelector(selectSyncId);
	var syncMethod = useAppSelector(selectSyncMethod);
	var tooltipState = useAppSelector(selectSynchronisedTooltipState);
	var isReceivingSynchronisation = tooltipState === null || tooltipState === void 0 ? void 0 : tooltipState.active;
	var viewBox = useViewBox();
	(0, import_react.useEffect)(() => {
		if (isReceivingSynchronisation) return;
		if (syncId == null) return;
		if (eventEmitterSymbol == null) return;
		var syncAction = setSyncInteraction({
			active: isTooltipActive,
			coordinate: activeCoordinate,
			dataKey: activeDataKey,
			index: activeIndex,
			label: typeof activeLabel === "number" ? String(activeLabel) : activeLabel,
			sourceViewBox: viewBox,
			graphicalItemId: void 0
		});
		eventCenter.emit(TOOLTIP_SYNC_EVENT, syncId, syncAction, eventEmitterSymbol);
	}, [
		isReceivingSynchronisation,
		activeCoordinate,
		activeDataKey,
		activeIndex,
		activeLabel,
		eventEmitterSymbol,
		syncId,
		syncMethod,
		isTooltipActive,
		viewBox
	]);
}
var import_react_dom = require_react_dom();
function ownKeys$10(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$10(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$10(Object(t), !0).forEach(function(r$1) {
			_defineProperty$12(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$10(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$12(e, r, t) {
	return (r = _toPropertyKey$12(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$12(t) {
	var i = _toPrimitive$12(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$12(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function defaultUniqBy(entry) {
	return entry.dataKey;
}
function renderContent(content, props) {
	if (/* @__PURE__ */ import_react.isValidElement(content)) return /* @__PURE__ */ import_react.cloneElement(content, props);
	if (typeof content === "function") return /* @__PURE__ */ import_react.createElement(content, props);
	return /* @__PURE__ */ import_react.createElement(DefaultTooltipContent, props);
}
var emptyPayload = [];
var defaultTooltipProps = {
	allowEscapeViewBox: {
		x: false,
		y: false
	},
	animationDuration: 400,
	animationEasing: "ease",
	axisId: 0,
	contentStyle: {},
	cursor: true,
	filterNull: true,
	isAnimationActive: "auto",
	itemSorter: "name",
	itemStyle: {},
	labelStyle: {},
	offset: 10,
	reverseDirection: {
		x: false,
		y: false
	},
	separator: " : ",
	trigger: "hover",
	useTranslate3d: false,
	wrapperStyle: {}
};
function Tooltip(outsideProps) {
	var _useAppSelector, _ref$1;
	var props = resolveDefaultProps(outsideProps, defaultTooltipProps);
	var { active: activeFromProps, allowEscapeViewBox, animationDuration, animationEasing, content, filterNull, isAnimationActive, offset, payloadUniqBy, position, reverseDirection, useTranslate3d, wrapperStyle, cursor, shared, trigger, defaultIndex, portal: portalFromProps, axisId } = props;
	var dispatch = useAppDispatch();
	var defaultIndexAsString = typeof defaultIndex === "number" ? String(defaultIndex) : defaultIndex;
	(0, import_react.useEffect)(() => {
		dispatch(setTooltipSettingsState({
			shared,
			trigger,
			axisId,
			active: activeFromProps,
			defaultIndex: defaultIndexAsString
		}));
	}, [
		dispatch,
		shared,
		trigger,
		axisId,
		activeFromProps,
		defaultIndexAsString
	]);
	var viewBox = useViewBox();
	var accessibilityLayer = useAccessibilityLayer();
	var tooltipEventType = useTooltipEventType(shared);
	var { activeIndex, isActive } = (_useAppSelector = useAppSelector((state) => selectIsTooltipActive$1(state, tooltipEventType, trigger, defaultIndexAsString))) !== null && _useAppSelector !== void 0 ? _useAppSelector : {};
	var payloadFromRedux = useAppSelector((state) => selectTooltipPayload(state, tooltipEventType, trigger, defaultIndexAsString));
	var labelFromRedux = useAppSelector((state) => selectActiveLabel$1(state, tooltipEventType, trigger, defaultIndexAsString));
	var coordinate = useAppSelector((state) => selectActiveCoordinate(state, tooltipEventType, trigger, defaultIndexAsString));
	var payload = payloadFromRedux;
	var tooltipPortalFromContext = useTooltipPortal();
	var finalIsActive = (_ref$1 = activeFromProps !== null && activeFromProps !== void 0 ? activeFromProps : isActive) !== null && _ref$1 !== void 0 ? _ref$1 : false;
	var [lastBoundingBox, updateBoundingBox] = useElementOffset([payload, finalIsActive]);
	var finalLabel = tooltipEventType === "axis" ? labelFromRedux : void 0;
	useTooltipChartSynchronisation(tooltipEventType, trigger, coordinate, finalLabel, activeIndex, finalIsActive);
	var tooltipPortal = portalFromProps !== null && portalFromProps !== void 0 ? portalFromProps : tooltipPortalFromContext;
	if (tooltipPortal == null || viewBox == null || tooltipEventType == null) return null;
	var finalPayload = payload !== null && payload !== void 0 ? payload : emptyPayload;
	if (!finalIsActive) finalPayload = emptyPayload;
	if (filterNull && finalPayload.length) finalPayload = getUniqPayload(finalPayload.filter((entry) => entry.value != null && (entry.hide !== true || props.includeHidden)), payloadUniqBy, defaultUniqBy);
	var hasPayload = finalPayload.length > 0;
	var tooltipElement = /* @__PURE__ */ import_react.createElement(TooltipBoundingBox, {
		allowEscapeViewBox,
		animationDuration,
		animationEasing,
		isAnimationActive,
		active: finalIsActive,
		coordinate,
		hasPayload,
		offset,
		position,
		reverseDirection,
		useTranslate3d,
		viewBox,
		wrapperStyle,
		lastBoundingBox,
		innerRef: updateBoundingBox,
		hasPortalFromProps: Boolean(portalFromProps)
	}, renderContent(content, _objectSpread$10(_objectSpread$10({}, props), {}, {
		payload: finalPayload,
		label: finalLabel,
		active: finalIsActive,
		activeIndex,
		coordinate,
		accessibilityLayer
	})));
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ (0, import_react_dom.createPortal)(tooltipElement, tooltipPortal), finalIsActive && /* @__PURE__ */ import_react.createElement(Cursor, {
		cursor,
		tooltipEventType,
		coordinate,
		payload: finalPayload,
		index: activeIndex
	}));
}
function _defineProperty$11(e, r, t) {
	return (r = _toPropertyKey$11(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$11(t) {
	var i = _toPrimitive$11(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$11(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var LRUCache = class {
	constructor(maxSize) {
		_defineProperty$11(this, "cache", /* @__PURE__ */ new Map());
		this.maxSize = maxSize;
	}
	get(key) {
		var value = this.cache.get(key);
		if (value !== void 0) {
			this.cache.delete(key);
			this.cache.set(key, value);
		}
		return value;
	}
	set(key, value) {
		if (this.cache.has(key)) this.cache.delete(key);
		else if (this.cache.size >= this.maxSize) {
			var firstKey = this.cache.keys().next().value;
			if (firstKey != null) this.cache.delete(firstKey);
		}
		this.cache.set(key, value);
	}
	clear() {
		this.cache.clear();
	}
	size() {
		return this.cache.size;
	}
};
function ownKeys$9(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$9(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$9(Object(t), !0).forEach(function(r$1) {
			_defineProperty$10(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$10(e, r, t) {
	return (r = _toPropertyKey$10(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$10(t) {
	var i = _toPrimitive$10(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$10(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var currentConfig = _objectSpread$9({}, {
	cacheSize: 2e3,
	enableCache: true
});
var stringCache = new LRUCache(currentConfig.cacheSize);
var SPAN_STYLE = {
	position: "absolute",
	top: "-20000px",
	left: 0,
	padding: 0,
	margin: 0,
	border: "none",
	whiteSpace: "pre"
};
var MEASUREMENT_SPAN_ID = "recharts_measurement_span";
function createCacheKey(text, style) {
	var fontSize = style.fontSize || "";
	var fontFamily = style.fontFamily || "";
	var fontWeight = style.fontWeight || "";
	var fontStyle = style.fontStyle || "";
	var letterSpacing = style.letterSpacing || "";
	var textTransform = style.textTransform || "";
	return "".concat(text, "|").concat(fontSize, "|").concat(fontFamily, "|").concat(fontWeight, "|").concat(fontStyle, "|").concat(letterSpacing, "|").concat(textTransform);
}
var measureTextWithDOM = (text, style) => {
	try {
		var measurementSpan = document.getElementById(MEASUREMENT_SPAN_ID);
		if (!measurementSpan) {
			measurementSpan = document.createElement("span");
			measurementSpan.setAttribute("id", MEASUREMENT_SPAN_ID);
			measurementSpan.setAttribute("aria-hidden", "true");
			document.body.appendChild(measurementSpan);
		}
		Object.assign(measurementSpan.style, SPAN_STYLE, style);
		measurementSpan.textContent = "".concat(text);
		var rect = measurementSpan.getBoundingClientRect();
		return {
			width: rect.width,
			height: rect.height
		};
	} catch (_unused) {
		return {
			width: 0,
			height: 0
		};
	}
};
var getStringSize = function getStringSize$1(text) {
	var style = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	if (text === void 0 || text === null || Global.isSsr) return {
		width: 0,
		height: 0
	};
	if (!currentConfig.enableCache) return measureTextWithDOM(text, style);
	var cacheKey = createCacheKey(text, style);
	var cachedResult = stringCache.get(cacheKey);
	if (cachedResult) return cachedResult;
	var result = measureTextWithDOM(text, style);
	stringCache.set(cacheKey, result);
	return result;
};
var MULTIPLY_OR_DIVIDE_REGEX = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/;
var ADD_OR_SUBTRACT_REGEX = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/;
var CSS_LENGTH_UNIT_REGEX = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/;
var NUM_SPLIT_REGEX = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/;
var CONVERSION_RATES = {
	cm: 96 / 2.54,
	mm: 96 / 25.4,
	pt: 96 / 72,
	pc: 96 / 6,
	in: 96,
	Q: 96 / (2.54 * 40),
	px: 1
};
var FIXED_CSS_LENGTH_UNITS = Object.keys(CONVERSION_RATES);
var STR_NAN = "NaN";
function convertToPx(value, unit) {
	return value * CONVERSION_RATES[unit];
}
var DecimalCSS = class DecimalCSS {
	static parse(str) {
		var _NUM_SPLIT_REGEX$exec;
		var [, numStr, unit] = (_NUM_SPLIT_REGEX$exec = NUM_SPLIT_REGEX.exec(str)) !== null && _NUM_SPLIT_REGEX$exec !== void 0 ? _NUM_SPLIT_REGEX$exec : [];
		return new DecimalCSS(parseFloat(numStr), unit !== null && unit !== void 0 ? unit : "");
	}
	constructor(num, unit) {
		this.num = num;
		this.unit = unit;
		this.num = num;
		this.unit = unit;
		if (isNan(num)) this.unit = "";
		if (unit !== "" && !CSS_LENGTH_UNIT_REGEX.test(unit)) {
			this.num = NaN;
			this.unit = "";
		}
		if (FIXED_CSS_LENGTH_UNITS.includes(unit)) {
			this.num = convertToPx(num, unit);
			this.unit = "px";
		}
	}
	add(other) {
		if (this.unit !== other.unit) return new DecimalCSS(NaN, "");
		return new DecimalCSS(this.num + other.num, this.unit);
	}
	subtract(other) {
		if (this.unit !== other.unit) return new DecimalCSS(NaN, "");
		return new DecimalCSS(this.num - other.num, this.unit);
	}
	multiply(other) {
		if (this.unit !== "" && other.unit !== "" && this.unit !== other.unit) return new DecimalCSS(NaN, "");
		return new DecimalCSS(this.num * other.num, this.unit || other.unit);
	}
	divide(other) {
		if (this.unit !== "" && other.unit !== "" && this.unit !== other.unit) return new DecimalCSS(NaN, "");
		return new DecimalCSS(this.num / other.num, this.unit || other.unit);
	}
	toString() {
		return "".concat(this.num).concat(this.unit);
	}
	isNaN() {
		return isNan(this.num);
	}
};
function calculateArithmetic(expr) {
	if (expr.includes(STR_NAN)) return STR_NAN;
	var newExpr = expr;
	while (newExpr.includes("*") || newExpr.includes("/")) {
		var _MULTIPLY_OR_DIVIDE_R;
		var [, leftOperand, operator, rightOperand] = (_MULTIPLY_OR_DIVIDE_R = MULTIPLY_OR_DIVIDE_REGEX.exec(newExpr)) !== null && _MULTIPLY_OR_DIVIDE_R !== void 0 ? _MULTIPLY_OR_DIVIDE_R : [];
		var lTs = DecimalCSS.parse(leftOperand !== null && leftOperand !== void 0 ? leftOperand : "");
		var rTs = DecimalCSS.parse(rightOperand !== null && rightOperand !== void 0 ? rightOperand : "");
		var result = operator === "*" ? lTs.multiply(rTs) : lTs.divide(rTs);
		if (result.isNaN()) return STR_NAN;
		newExpr = newExpr.replace(MULTIPLY_OR_DIVIDE_REGEX, result.toString());
	}
	while (newExpr.includes("+") || /.-\d+(?:\.\d+)?/.test(newExpr)) {
		var _ADD_OR_SUBTRACT_REGE;
		var [, _leftOperand, _operator, _rightOperand] = (_ADD_OR_SUBTRACT_REGE = ADD_OR_SUBTRACT_REGEX.exec(newExpr)) !== null && _ADD_OR_SUBTRACT_REGE !== void 0 ? _ADD_OR_SUBTRACT_REGE : [];
		var _lTs = DecimalCSS.parse(_leftOperand !== null && _leftOperand !== void 0 ? _leftOperand : "");
		var _rTs = DecimalCSS.parse(_rightOperand !== null && _rightOperand !== void 0 ? _rightOperand : "");
		var _result = _operator === "+" ? _lTs.add(_rTs) : _lTs.subtract(_rTs);
		if (_result.isNaN()) return STR_NAN;
		newExpr = newExpr.replace(ADD_OR_SUBTRACT_REGEX, _result.toString());
	}
	return newExpr;
}
var PARENTHESES_REGEX = /\(([^()]*)\)/;
function calculateParentheses(expr) {
	var newExpr = expr;
	var match;
	while ((match = PARENTHESES_REGEX.exec(newExpr)) != null) {
		var [, parentheticalExpression] = match;
		newExpr = newExpr.replace(PARENTHESES_REGEX, calculateArithmetic(parentheticalExpression));
	}
	return newExpr;
}
function evaluateExpression(expression) {
	var newExpr = expression.replace(/\s+/g, "");
	newExpr = calculateParentheses(newExpr);
	newExpr = calculateArithmetic(newExpr);
	return newExpr;
}
function safeEvaluateExpression(expression) {
	try {
		return evaluateExpression(expression);
	} catch (_unused) {
		return STR_NAN;
	}
}
function reduceCSSCalc(expression) {
	var result = safeEvaluateExpression(expression.slice(5, -1));
	if (result === STR_NAN) return "";
	return result;
}
var _excluded$11 = [
	"x",
	"y",
	"lineHeight",
	"capHeight",
	"fill",
	"scaleToFit",
	"textAnchor",
	"verticalAnchor"
], _excluded2$6 = [
	"dx",
	"dy",
	"angle",
	"className",
	"breakAll"
];
function _extends$12() {
	return _extends$12 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$12.apply(null, arguments);
}
function _objectWithoutProperties$11(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$11(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$11(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var BREAKING_SPACES = /[ \f\n\r\t\v\u2028\u2029]+/;
var calculateWordWidths = (_ref$1) => {
	var { children, breakAll, style } = _ref$1;
	try {
		var words = [];
		if (!isNullish(children)) if (breakAll) words = children.toString().split("");
		else words = children.toString().split(BREAKING_SPACES);
		return {
			wordsWithComputedWidth: words.map((word) => ({
				word,
				width: getStringSize(word, style).width
			})),
			spaceWidth: breakAll ? 0 : getStringSize("\xA0", style).width
		};
	} catch (_unused) {
		return null;
	}
};
function isValidTextAnchor(value) {
	return value === "start" || value === "middle" || value === "end" || value === "inherit";
}
var calculate = (words, lineWidth, spaceWidth, scaleToFit) => words.reduce((result, _ref2) => {
	var { word, width } = _ref2;
	var currentLine = result[result.length - 1];
	if (currentLine && width != null && (lineWidth == null || scaleToFit || currentLine.width + width + spaceWidth < Number(lineWidth))) {
		currentLine.words.push(word);
		currentLine.width += width + spaceWidth;
	} else {
		var newLine = {
			words: [word],
			width
		};
		result.push(newLine);
	}
	return result;
}, []);
var findLongestLine = (words) => words.reduce((a, b) => a.width > b.width ? a : b);
var suffix = "…";
var checkOverflow = (text, index, breakAll, style, maxLines, lineWidth, spaceWidth, scaleToFit) => {
	var words = calculateWordWidths({
		breakAll,
		style,
		children: text.slice(0, index) + suffix
	});
	if (!words) return [false, []];
	var result = calculate(words.wordsWithComputedWidth, lineWidth, spaceWidth, scaleToFit);
	return [result.length > maxLines || findLongestLine(result).width > Number(lineWidth), result];
};
var calculateWordsByLines = (_ref3, initialWordsWithComputedWith, spaceWidth, lineWidth, scaleToFit) => {
	var { maxLines, children, style, breakAll } = _ref3;
	var shouldLimitLines = isNumber(maxLines);
	var text = String(children);
	var originalResult = calculate(initialWordsWithComputedWith, lineWidth, spaceWidth, scaleToFit);
	if (!shouldLimitLines || scaleToFit) return originalResult;
	if (!(originalResult.length > maxLines || findLongestLine(originalResult).width > Number(lineWidth))) return originalResult;
	var start = 0;
	var end = text.length - 1;
	var iterations = 0;
	var trimmedResult;
	while (start <= end && iterations <= text.length - 1) {
		var middle = Math.floor((start + end) / 2);
		var [doesPrevOverflow, result] = checkOverflow(text, middle - 1, breakAll, style, maxLines, lineWidth, spaceWidth, scaleToFit);
		var [doesMiddleOverflow] = checkOverflow(text, middle, breakAll, style, maxLines, lineWidth, spaceWidth, scaleToFit);
		if (!doesPrevOverflow && !doesMiddleOverflow) start = middle + 1;
		if (doesPrevOverflow && doesMiddleOverflow) end = middle - 1;
		if (!doesPrevOverflow && doesMiddleOverflow) {
			trimmedResult = result;
			break;
		}
		iterations++;
	}
	return trimmedResult || originalResult;
};
var getWordsWithoutCalculate = (children) => {
	return [{
		words: !isNullish(children) ? children.toString().split(BREAKING_SPACES) : [],
		width: void 0
	}];
};
var getWordsByLines = (_ref4) => {
	var { width, scaleToFit, children, style, breakAll, maxLines } = _ref4;
	if ((width || scaleToFit) && !Global.isSsr) {
		var wordsWithComputedWidth, spaceWidth;
		var wordWidths = calculateWordWidths({
			breakAll,
			children,
			style
		});
		if (wordWidths) {
			var { wordsWithComputedWidth: wcw, spaceWidth: sw } = wordWidths;
			wordsWithComputedWidth = wcw;
			spaceWidth = sw;
		} else return getWordsWithoutCalculate(children);
		return calculateWordsByLines({
			breakAll,
			children,
			maxLines,
			style
		}, wordsWithComputedWidth, spaceWidth, width, Boolean(scaleToFit));
	}
	return getWordsWithoutCalculate(children);
};
var DEFAULT_FILL = "#808080";
var textDefaultProps = {
	angle: 0,
	breakAll: false,
	capHeight: "0.71em",
	fill: DEFAULT_FILL,
	lineHeight: "1em",
	scaleToFit: false,
	textAnchor: "start",
	verticalAnchor: "end",
	x: 0,
	y: 0
};
var Text = /* @__PURE__ */ (0, import_react.forwardRef)((outsideProps, ref) => {
	var _resolveDefaultProps = resolveDefaultProps(outsideProps, textDefaultProps), { x: propsX, y: propsY, lineHeight, capHeight, fill, scaleToFit, textAnchor, verticalAnchor } = _resolveDefaultProps, props = _objectWithoutProperties$11(_resolveDefaultProps, _excluded$11);
	var wordsByLines = (0, import_react.useMemo)(() => {
		return getWordsByLines({
			breakAll: props.breakAll,
			children: props.children,
			maxLines: props.maxLines,
			scaleToFit,
			style: props.style,
			width: props.width
		});
	}, [
		props.breakAll,
		props.children,
		props.maxLines,
		scaleToFit,
		props.style,
		props.width
	]);
	var { dx, dy, angle, className, breakAll } = props, textProps = _objectWithoutProperties$11(props, _excluded2$6);
	if (!isNumOrStr(propsX) || !isNumOrStr(propsY) || wordsByLines.length === 0) return null;
	var x = Number(propsX) + (isNumber(dx) ? dx : 0);
	var y = Number(propsY) + (isNumber(dy) ? dy : 0);
	if (!isWellBehavedNumber(x) || !isWellBehavedNumber(y)) return null;
	var startDy;
	switch (verticalAnchor) {
		case "start":
			startDy = reduceCSSCalc("calc(".concat(capHeight, ")"));
			break;
		case "middle":
			startDy = reduceCSSCalc("calc(".concat((wordsByLines.length - 1) / 2, " * -").concat(lineHeight, " + (").concat(capHeight, " / 2))"));
			break;
		default:
			startDy = reduceCSSCalc("calc(".concat(wordsByLines.length - 1, " * -").concat(lineHeight, ")"));
			break;
	}
	var transforms = [];
	if (scaleToFit) {
		var lineWidth = wordsByLines[0].width;
		var { width } = props;
		transforms.push("scale(".concat(isNumber(width) && isNumber(lineWidth) ? width / lineWidth : 1, ")"));
	}
	if (angle) transforms.push("rotate(".concat(angle, ", ").concat(x, ", ").concat(y, ")"));
	if (transforms.length) textProps.transform = transforms.join(" ");
	return /* @__PURE__ */ import_react.createElement("text", _extends$12({}, svgPropertiesAndEvents(textProps), {
		ref,
		x,
		y,
		className: clsx("recharts-text", className),
		textAnchor,
		fill: fill.includes("url") ? DEFAULT_FILL : fill
	}), wordsByLines.map((line, index) => {
		var words = line.words.join(breakAll ? "" : " ");
		return /* @__PURE__ */ import_react.createElement("tspan", {
			x,
			dy: index === 0 ? startDy : lineHeight,
			key: "".concat(words, "-").concat(index)
		}, words);
	}));
});
Text.displayName = "Text";
var _excluded$10 = ["labelRef"];
function _objectWithoutProperties$10(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$10(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$10(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function ownKeys$8(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$8(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$8(Object(t), !0).forEach(function(r$1) {
			_defineProperty$9(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$9(e, r, t) {
	return (r = _toPropertyKey$9(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$9(t) {
	var i = _toPrimitive$9(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$9(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$11() {
	return _extends$11 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$11.apply(null, arguments);
}
var CartesianLabelContext = /* @__PURE__ */ (0, import_react.createContext)(null);
var CartesianLabelContextProvider = (_ref$1) => {
	var { x, y, upperWidth, lowerWidth, width, height, children } = _ref$1;
	var viewBox = (0, import_react.useMemo)(() => ({
		x,
		y,
		upperWidth,
		lowerWidth,
		width,
		height
	}), [
		x,
		y,
		upperWidth,
		lowerWidth,
		width,
		height
	]);
	return /* @__PURE__ */ import_react.createElement(CartesianLabelContext.Provider, { value: viewBox }, children);
};
var useCartesianLabelContext = () => {
	var labelChildContext = (0, import_react.useContext)(CartesianLabelContext);
	var chartContext = useViewBox();
	return labelChildContext || cartesianViewBoxToTrapezoid(chartContext);
};
var PolarLabelContext = /* @__PURE__ */ (0, import_react.createContext)(null);
var usePolarLabelContext = () => {
	var labelChildContext = (0, import_react.useContext)(PolarLabelContext);
	var chartContext = useAppSelector(selectPolarViewBox);
	return labelChildContext || chartContext;
};
var getLabel = (props) => {
	var { value, formatter } = props;
	var label = isNullish(props.children) ? value : props.children;
	if (typeof formatter === "function") return formatter(label);
	return label;
};
var isLabelContentAFunction = (content) => {
	return content != null && typeof content === "function";
};
var getDeltaAngle = (startAngle, endAngle) => {
	return mathSign(endAngle - startAngle) * Math.min(Math.abs(endAngle - startAngle), 360);
};
var renderRadialLabel = (labelProps, position, label, attrs, viewBox) => {
	var { offset, className } = labelProps;
	var { cx, cy, innerRadius, outerRadius, startAngle, endAngle, clockWise } = viewBox;
	var radius = (innerRadius + outerRadius) / 2;
	var deltaAngle = getDeltaAngle(startAngle, endAngle);
	var sign = deltaAngle >= 0 ? 1 : -1;
	var labelAngle, direction;
	switch (position) {
		case "insideStart":
			labelAngle = startAngle + sign * offset;
			direction = clockWise;
			break;
		case "insideEnd":
			labelAngle = endAngle - sign * offset;
			direction = !clockWise;
			break;
		case "end":
			labelAngle = endAngle + sign * offset;
			direction = clockWise;
			break;
		default: throw new Error("Unsupported position ".concat(position));
	}
	direction = deltaAngle <= 0 ? direction : !direction;
	var startPoint = polarToCartesian(cx, cy, radius, labelAngle);
	var endPoint = polarToCartesian(cx, cy, radius, labelAngle + (direction ? 1 : -1) * 359);
	var path = "M".concat(startPoint.x, ",").concat(startPoint.y, "\n    A").concat(radius, ",").concat(radius, ",0,1,").concat(direction ? 0 : 1, ",\n    ").concat(endPoint.x, ",").concat(endPoint.y);
	var id = isNullish(labelProps.id) ? uniqueId("recharts-radial-line-") : labelProps.id;
	return /* @__PURE__ */ import_react.createElement("text", _extends$11({}, attrs, {
		dominantBaseline: "central",
		className: clsx("recharts-radial-bar-label", className)
	}), /* @__PURE__ */ import_react.createElement("defs", null, /* @__PURE__ */ import_react.createElement("path", {
		id,
		d: path
	})), /* @__PURE__ */ import_react.createElement("textPath", { xlinkHref: "#".concat(id) }, label));
};
var getAttrsOfPolarLabel = (viewBox, offset, position) => {
	var { cx, cy, innerRadius, outerRadius, startAngle, endAngle } = viewBox;
	var midAngle = (startAngle + endAngle) / 2;
	if (position === "outside") {
		var { x: _x, y: _y } = polarToCartesian(cx, cy, outerRadius + offset, midAngle);
		return {
			x: _x,
			y: _y,
			textAnchor: _x >= cx ? "start" : "end",
			verticalAnchor: "middle"
		};
	}
	if (position === "center") return {
		x: cx,
		y: cy,
		textAnchor: "middle",
		verticalAnchor: "middle"
	};
	if (position === "centerTop") return {
		x: cx,
		y: cy,
		textAnchor: "middle",
		verticalAnchor: "start"
	};
	if (position === "centerBottom") return {
		x: cx,
		y: cy,
		textAnchor: "middle",
		verticalAnchor: "end"
	};
	var { x, y } = polarToCartesian(cx, cy, (innerRadius + outerRadius) / 2, midAngle);
	return {
		x,
		y,
		textAnchor: "middle",
		verticalAnchor: "middle"
	};
};
var isPolar = (viewBox) => "cx" in viewBox && isNumber(viewBox.cx);
var getAttrsOfCartesianLabel = (props, viewBox) => {
	var { parentViewBox: parentViewBoxFromProps, offset, position } = props;
	var parentViewBox;
	if (parentViewBoxFromProps != null && !isPolar(parentViewBoxFromProps)) parentViewBox = parentViewBoxFromProps;
	var { x, y, upperWidth, lowerWidth, height } = viewBox;
	var upperX = x;
	var lowerX = x + (upperWidth - lowerWidth) / 2;
	var middleX = (upperX + lowerX) / 2;
	var midHeightWidth = (upperWidth + lowerWidth) / 2;
	var centerX = upperX + upperWidth / 2;
	var verticalSign = height >= 0 ? 1 : -1;
	var verticalOffset = verticalSign * offset;
	var verticalEnd = verticalSign > 0 ? "end" : "start";
	var verticalStart = verticalSign > 0 ? "start" : "end";
	var horizontalSign = upperWidth >= 0 ? 1 : -1;
	var horizontalOffset = horizontalSign * offset;
	var horizontalEnd = horizontalSign > 0 ? "end" : "start";
	var horizontalStart = horizontalSign > 0 ? "start" : "end";
	if (position === "top") return _objectSpread$8(_objectSpread$8({}, {
		x: upperX + upperWidth / 2,
		y: y - verticalOffset,
		textAnchor: "middle",
		verticalAnchor: verticalEnd
	}), parentViewBox ? {
		height: Math.max(y - parentViewBox.y, 0),
		width: upperWidth
	} : {});
	if (position === "bottom") return _objectSpread$8(_objectSpread$8({}, {
		x: lowerX + lowerWidth / 2,
		y: y + height + verticalOffset,
		textAnchor: "middle",
		verticalAnchor: verticalStart
	}), parentViewBox ? {
		height: Math.max(parentViewBox.y + parentViewBox.height - (y + height), 0),
		width: lowerWidth
	} : {});
	if (position === "left") {
		var _attrs2 = {
			x: middleX - horizontalOffset,
			y: y + height / 2,
			textAnchor: horizontalEnd,
			verticalAnchor: "middle"
		};
		return _objectSpread$8(_objectSpread$8({}, _attrs2), parentViewBox ? {
			width: Math.max(_attrs2.x - parentViewBox.x, 0),
			height
		} : {});
	}
	if (position === "right") {
		var _attrs3 = {
			x: middleX + midHeightWidth + horizontalOffset,
			y: y + height / 2,
			textAnchor: horizontalStart,
			verticalAnchor: "middle"
		};
		return _objectSpread$8(_objectSpread$8({}, _attrs3), parentViewBox ? {
			width: Math.max(parentViewBox.x + parentViewBox.width - _attrs3.x, 0),
			height
		} : {});
	}
	var sizeAttrs = parentViewBox ? {
		width: midHeightWidth,
		height
	} : {};
	if (position === "insideLeft") return _objectSpread$8({
		x: middleX + horizontalOffset,
		y: y + height / 2,
		textAnchor: horizontalStart,
		verticalAnchor: "middle"
	}, sizeAttrs);
	if (position === "insideRight") return _objectSpread$8({
		x: middleX + midHeightWidth - horizontalOffset,
		y: y + height / 2,
		textAnchor: horizontalEnd,
		verticalAnchor: "middle"
	}, sizeAttrs);
	if (position === "insideTop") return _objectSpread$8({
		x: upperX + upperWidth / 2,
		y: y + verticalOffset,
		textAnchor: "middle",
		verticalAnchor: verticalStart
	}, sizeAttrs);
	if (position === "insideBottom") return _objectSpread$8({
		x: lowerX + lowerWidth / 2,
		y: y + height - verticalOffset,
		textAnchor: "middle",
		verticalAnchor: verticalEnd
	}, sizeAttrs);
	if (position === "insideTopLeft") return _objectSpread$8({
		x: upperX + horizontalOffset,
		y: y + verticalOffset,
		textAnchor: horizontalStart,
		verticalAnchor: verticalStart
	}, sizeAttrs);
	if (position === "insideTopRight") return _objectSpread$8({
		x: upperX + upperWidth - horizontalOffset,
		y: y + verticalOffset,
		textAnchor: horizontalEnd,
		verticalAnchor: verticalStart
	}, sizeAttrs);
	if (position === "insideBottomLeft") return _objectSpread$8({
		x: lowerX + horizontalOffset,
		y: y + height - verticalOffset,
		textAnchor: horizontalStart,
		verticalAnchor: verticalEnd
	}, sizeAttrs);
	if (position === "insideBottomRight") return _objectSpread$8({
		x: lowerX + lowerWidth - horizontalOffset,
		y: y + height - verticalOffset,
		textAnchor: horizontalEnd,
		verticalAnchor: verticalEnd
	}, sizeAttrs);
	if (!!position && typeof position === "object" && (isNumber(position.x) || isPercent(position.x)) && (isNumber(position.y) || isPercent(position.y))) return _objectSpread$8({
		x: x + getPercentValue(position.x, midHeightWidth),
		y: y + getPercentValue(position.y, height),
		textAnchor: "end",
		verticalAnchor: "end"
	}, sizeAttrs);
	return _objectSpread$8({
		x: centerX,
		y: y + height / 2,
		textAnchor: "middle",
		verticalAnchor: "middle"
	}, sizeAttrs);
};
var defaultLabelProps = {
	angle: 0,
	offset: 5,
	zIndex: DefaultZIndexes.label,
	position: "middle",
	textBreakAll: false
};
function Label(outerProps) {
	var props = resolveDefaultProps(outerProps, defaultLabelProps);
	var { viewBox: viewBoxFromProps, position, value, children, content, className = "", textBreakAll, labelRef } = props;
	var polarViewBox = usePolarLabelContext();
	var cartesianViewBox = useCartesianLabelContext();
	var resolvedViewBox = position === "center" ? cartesianViewBox : polarViewBox !== null && polarViewBox !== void 0 ? polarViewBox : cartesianViewBox;
	var viewBox, label, positionAttrs;
	if (viewBoxFromProps == null) viewBox = resolvedViewBox;
	else if (isPolar(viewBoxFromProps)) viewBox = viewBoxFromProps;
	else viewBox = cartesianViewBoxToTrapezoid(viewBoxFromProps);
	if (!viewBox || isNullish(value) && isNullish(children) && !/* @__PURE__ */ (0, import_react.isValidElement)(content) && typeof content !== "function") return null;
	var propsWithViewBox = _objectSpread$8(_objectSpread$8({}, props), {}, { viewBox });
	if (/* @__PURE__ */ (0, import_react.isValidElement)(content)) {
		var { labelRef: _ } = propsWithViewBox;
		return /* @__PURE__ */ (0, import_react.cloneElement)(content, _objectWithoutProperties$10(propsWithViewBox, _excluded$10));
	}
	if (typeof content === "function") {
		label = /* @__PURE__ */ (0, import_react.createElement)(content, propsWithViewBox);
		if (/* @__PURE__ */ (0, import_react.isValidElement)(label)) return label;
	} else label = getLabel(props);
	var attrs = svgPropertiesAndEvents(props);
	if (isPolar(viewBox)) {
		if (position === "insideStart" || position === "insideEnd" || position === "end") return renderRadialLabel(props, position, label, attrs, viewBox);
		positionAttrs = getAttrsOfPolarLabel(viewBox, props.offset, props.position);
	} else positionAttrs = getAttrsOfCartesianLabel(props, viewBox);
	return /* @__PURE__ */ import_react.createElement(ZIndexLayer, { zIndex: props.zIndex }, /* @__PURE__ */ import_react.createElement(Text, _extends$11({
		ref: labelRef,
		className: clsx("recharts-label", className)
	}, attrs, positionAttrs, {
		textAnchor: isValidTextAnchor(attrs.textAnchor) ? attrs.textAnchor : positionAttrs.textAnchor,
		breakAll: textBreakAll
	}), label));
}
Label.displayName = "Label";
var parseLabel = (label, viewBox, labelRef) => {
	if (!label) return null;
	var commonProps = {
		viewBox,
		labelRef
	};
	if (label === true) return /* @__PURE__ */ import_react.createElement(Label, _extends$11({ key: "label-implicit" }, commonProps));
	if (isNumOrStr(label)) return /* @__PURE__ */ import_react.createElement(Label, _extends$11({
		key: "label-implicit",
		value: label
	}, commonProps));
	if (/* @__PURE__ */ (0, import_react.isValidElement)(label)) {
		if (label.type === Label) return /* @__PURE__ */ (0, import_react.cloneElement)(label, _objectSpread$8({ key: "label-implicit" }, commonProps));
		return /* @__PURE__ */ import_react.createElement(Label, _extends$11({
			key: "label-implicit",
			content: label
		}, commonProps));
	}
	if (isLabelContentAFunction(label)) return /* @__PURE__ */ import_react.createElement(Label, _extends$11({
		key: "label-implicit",
		content: label
	}, commonProps));
	if (label && typeof label === "object") return /* @__PURE__ */ import_react.createElement(Label, _extends$11({}, label, { key: "label-implicit" }, commonProps));
	return null;
};
function CartesianLabelFromLabelProp(_ref3) {
	var { label, labelRef } = _ref3;
	return parseLabel(label, useCartesianLabelContext(), labelRef) || null;
}
var import_last = /* @__PURE__ */ __toESM(require_last());
var _excluded$9 = ["valueAccessor"], _excluded2$5 = [
	"dataKey",
	"clockWise",
	"id",
	"textBreakAll",
	"zIndex"
];
function _extends$10() {
	return _extends$10 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$10.apply(null, arguments);
}
function _objectWithoutProperties$9(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$9(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$9(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var defaultAccessor = (entry) => Array.isArray(entry.value) ? (0, import_last.default)(entry.value) : entry.value;
var CartesianLabelListContext = /* @__PURE__ */ (0, import_react.createContext)(void 0);
var CartesianLabelListContextProvider = CartesianLabelListContext.Provider;
var PolarLabelListContext = /* @__PURE__ */ (0, import_react.createContext)(void 0);
PolarLabelListContext.Provider;
function useCartesianLabelListContext() {
	return (0, import_react.useContext)(CartesianLabelListContext);
}
function usePolarLabelListContext() {
	return (0, import_react.useContext)(PolarLabelListContext);
}
function LabelList(_ref$1) {
	var { valueAccessor = defaultAccessor } = _ref$1, restProps = _objectWithoutProperties$9(_ref$1, _excluded$9);
	var { dataKey, clockWise, id, textBreakAll, zIndex } = restProps, others = _objectWithoutProperties$9(restProps, _excluded2$5);
	var cartesianData = useCartesianLabelListContext();
	var polarData = usePolarLabelListContext();
	var data = cartesianData || polarData;
	if (!data || !data.length) return null;
	return /* @__PURE__ */ import_react.createElement(ZIndexLayer, { zIndex: zIndex !== null && zIndex !== void 0 ? zIndex : DefaultZIndexes.label }, /* @__PURE__ */ import_react.createElement(Layer, { className: "recharts-label-list" }, data.map((entry, index) => {
		var _restProps$fill;
		var value = isNullish(dataKey) ? valueAccessor(entry, index) : getValueByDataKey(entry && entry.payload, dataKey);
		var idProps = isNullish(id) ? {} : { id: "".concat(id, "-").concat(index) };
		return /* @__PURE__ */ import_react.createElement(Label, _extends$10({ key: "label-".concat(index) }, svgPropertiesAndEvents(entry), others, idProps, {
			fill: (_restProps$fill = restProps.fill) !== null && _restProps$fill !== void 0 ? _restProps$fill : entry.fill,
			parentViewBox: entry.parentViewBox,
			value,
			textBreakAll,
			viewBox: entry.viewBox,
			index,
			zIndex: 0
		}));
	})));
}
LabelList.displayName = "LabelList";
function LabelListFromLabelProp(_ref2) {
	var { label } = _ref2;
	if (!label) return null;
	if (label === true) return /* @__PURE__ */ import_react.createElement(LabelList, { key: "labelList-implicit" });
	if (/* @__PURE__ */ import_react.isValidElement(label) || isLabelContentAFunction(label)) return /* @__PURE__ */ import_react.createElement(LabelList, {
		key: "labelList-implicit",
		content: label
	});
	if (typeof label === "object") return /* @__PURE__ */ import_react.createElement(LabelList, _extends$10({ key: "labelList-implicit" }, label, { type: String(label.type) }));
	return null;
}
function _extends$9() {
	return _extends$9 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$9.apply(null, arguments);
}
var Dot = (props) => {
	var { cx, cy, r, className } = props;
	var layerClass = clsx("recharts-dot", className);
	if (isNumber(cx) && isNumber(cy) && isNumber(r)) return /* @__PURE__ */ import_react.createElement("circle", _extends$9({}, svgPropertiesNoEvents(props), adaptEventHandlers(props), {
		className: layerClass,
		cx,
		cy,
		r
	}));
	return null;
};
var polarAxisSlice = createSlice({
	name: "polarAxis",
	initialState: {
		radiusAxis: {},
		angleAxis: {}
	},
	reducers: {
		addRadiusAxis(state, action) {
			state.radiusAxis[action.payload.id] = castDraft(action.payload);
		},
		removeRadiusAxis(state, action) {
			delete state.radiusAxis[action.payload.id];
		},
		addAngleAxis(state, action) {
			state.angleAxis[action.payload.id] = castDraft(action.payload);
		},
		removeAngleAxis(state, action) {
			delete state.angleAxis[action.payload.id];
		}
	}
});
var { addRadiusAxis, removeRadiusAxis, addAngleAxis, removeAngleAxis } = polarAxisSlice.actions;
var polarAxisReducer = polarAxisSlice.reducer;
var isClipDot = (dot) => {
	if (dot && typeof dot === "object" && "clipDot" in dot) return Boolean(dot.clipDot);
	return true;
};
function SetTooltipEntrySettings(_ref$1) {
	var { tooltipEntrySettings } = _ref$1;
	var dispatch = useAppDispatch();
	var isPanorama = useIsPanorama();
	var prevSettingsRef = (0, import_react.useRef)(null);
	(0, import_react.useLayoutEffect)(() => {
		if (isPanorama) return;
		if (prevSettingsRef.current === null) dispatch(addTooltipEntrySettings(tooltipEntrySettings));
		else if (prevSettingsRef.current !== tooltipEntrySettings) dispatch(replaceTooltipEntrySettings({
			prev: prevSettingsRef.current,
			next: tooltipEntrySettings
		}));
		prevSettingsRef.current = tooltipEntrySettings;
	}, [
		tooltipEntrySettings,
		dispatch,
		isPanorama
	]);
	(0, import_react.useLayoutEffect)(() => {
		return () => {
			if (prevSettingsRef.current) {
				dispatch(removeTooltipEntrySettings(prevSettingsRef.current));
				prevSettingsRef.current = null;
			}
		};
	}, [dispatch]);
	return null;
}
function SetLegendPayload(_ref$1) {
	var { legendPayload } = _ref$1;
	var dispatch = useAppDispatch();
	var isPanorama = useIsPanorama();
	var prevPayloadRef = (0, import_react.useRef)(null);
	(0, import_react.useLayoutEffect)(() => {
		if (isPanorama) return;
		if (prevPayloadRef.current === null) dispatch(addLegendPayload(legendPayload));
		else if (prevPayloadRef.current !== legendPayload) dispatch(replaceLegendPayload({
			prev: prevPayloadRef.current,
			next: legendPayload
		}));
		prevPayloadRef.current = legendPayload;
	}, [
		dispatch,
		isPanorama,
		legendPayload
	]);
	(0, import_react.useLayoutEffect)(() => {
		return () => {
			if (prevPayloadRef.current) {
				dispatch(removeLegendPayload(prevPayloadRef.current));
				prevPayloadRef.current = null;
			}
		};
	}, [dispatch]);
	return null;
}
var _ref;
var useIdFallback = () => {
	var [id] = import_react.useState(() => uniqueId("uid-"));
	return id;
};
var useId = (_ref = import_react["useId".toString()]) !== null && _ref !== void 0 ? _ref : useIdFallback;
function useUniqueId(prefix, customId) {
	var generatedId = useId();
	if (customId) return customId;
	return prefix ? "".concat(prefix, "-").concat(generatedId) : generatedId;
}
var GraphicalItemIdContext = /* @__PURE__ */ (0, import_react.createContext)(void 0);
var RegisterGraphicalItemId = (_ref$1) => {
	var { id, type, children } = _ref$1;
	var resolvedId = useUniqueId("recharts-".concat(type), id);
	return /* @__PURE__ */ import_react.createElement(GraphicalItemIdContext.Provider, { value: resolvedId }, children(resolvedId));
};
var graphicalItemsSlice = createSlice({
	name: "graphicalItems",
	initialState: {
		cartesianItems: [],
		polarItems: []
	},
	reducers: {
		addCartesianGraphicalItem: {
			reducer(state, action) {
				state.cartesianItems.push(castDraft(action.payload));
			},
			prepare: prepareAutoBatched()
		},
		replaceCartesianGraphicalItem: {
			reducer(state, action) {
				var { prev, next } = action.payload;
				var index = current(state).cartesianItems.indexOf(castDraft(prev));
				if (index > -1) state.cartesianItems[index] = castDraft(next);
			},
			prepare: prepareAutoBatched()
		},
		removeCartesianGraphicalItem: {
			reducer(state, action) {
				var index = current(state).cartesianItems.indexOf(castDraft(action.payload));
				if (index > -1) state.cartesianItems.splice(index, 1);
			},
			prepare: prepareAutoBatched()
		},
		addPolarGraphicalItem: {
			reducer(state, action) {
				state.polarItems.push(castDraft(action.payload));
			},
			prepare: prepareAutoBatched()
		},
		removePolarGraphicalItem: {
			reducer(state, action) {
				var index = current(state).polarItems.indexOf(castDraft(action.payload));
				if (index > -1) state.polarItems.splice(index, 1);
			},
			prepare: prepareAutoBatched()
		}
	}
});
var { addCartesianGraphicalItem, replaceCartesianGraphicalItem, removeCartesianGraphicalItem, addPolarGraphicalItem, removePolarGraphicalItem } = graphicalItemsSlice.actions;
var graphicalItemsReducer = graphicalItemsSlice.reducer;
var SetCartesianGraphicalItemImpl = (props) => {
	var dispatch = useAppDispatch();
	var prevPropsRef = (0, import_react.useRef)(null);
	(0, import_react.useLayoutEffect)(() => {
		if (prevPropsRef.current === null) dispatch(addCartesianGraphicalItem(props));
		else if (prevPropsRef.current !== props) dispatch(replaceCartesianGraphicalItem({
			prev: prevPropsRef.current,
			next: props
		}));
		prevPropsRef.current = props;
	}, [dispatch, props]);
	(0, import_react.useLayoutEffect)(() => {
		return () => {
			if (prevPropsRef.current) {
				dispatch(removeCartesianGraphicalItem(prevPropsRef.current));
				prevPropsRef.current = null;
			}
		};
	}, [dispatch]);
	return null;
};
var SetCartesianGraphicalItem = /* @__PURE__ */ (0, import_react.memo)(SetCartesianGraphicalItemImpl);
var _excluded$8 = ["points"];
function ownKeys$7(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$7(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$7(Object(t), !0).forEach(function(r$1) {
			_defineProperty$8(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$8(e, r, t) {
	return (r = _toPropertyKey$8(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$8(t) {
	var i = _toPrimitive$8(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$8(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$8() {
	return _extends$8 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$8.apply(null, arguments);
}
function _objectWithoutProperties$8(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$8(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$8(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function DotItem(_ref$1) {
	var { option, dotProps, className } = _ref$1;
	if (/* @__PURE__ */ (0, import_react.isValidElement)(option)) return /* @__PURE__ */ (0, import_react.cloneElement)(option, dotProps);
	if (typeof option === "function") return option(dotProps);
	var finalClassName = clsx(className, typeof option !== "boolean" ? option.className : "");
	var _ref2 = dotProps !== null && dotProps !== void 0 ? dotProps : {}, { points } = _ref2, props = _objectWithoutProperties$8(_ref2, _excluded$8);
	return /* @__PURE__ */ import_react.createElement(Dot, _extends$8({}, props, { className: finalClassName }));
}
function shouldRenderDots(points, dot) {
	if (points == null) return false;
	if (dot) return true;
	return points.length === 1;
}
function Dots(_ref3) {
	var { points, dot, className, dotClassName, dataKey, baseProps, needClip, clipPathId, zIndex = DefaultZIndexes.scatter } = _ref3;
	if (!shouldRenderDots(points, dot)) return null;
	var clipDot = isClipDot(dot);
	var customDotProps = svgPropertiesAndEventsFromUnknown(dot);
	var dots = points.map((entry, i) => {
		var _entry$x, _entry$y;
		var dotProps = _objectSpread$7(_objectSpread$7(_objectSpread$7({ r: 3 }, baseProps), customDotProps), {}, {
			index: i,
			cx: (_entry$x = entry.x) !== null && _entry$x !== void 0 ? _entry$x : void 0,
			cy: (_entry$y = entry.y) !== null && _entry$y !== void 0 ? _entry$y : void 0,
			dataKey,
			value: entry.value,
			payload: entry.payload,
			points
		});
		return /* @__PURE__ */ import_react.createElement(DotItem, {
			key: "dot-".concat(i),
			option: dot,
			dotProps,
			className: dotClassName
		});
	});
	var layerProps = {};
	if (needClip && clipPathId != null) layerProps.clipPath = "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")");
	return /* @__PURE__ */ import_react.createElement(ZIndexLayer, { zIndex }, /* @__PURE__ */ import_react.createElement(Layer, _extends$8({ className }, layerProps), dots));
}
function ownKeys$6(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$6(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$6(Object(t), !0).forEach(function(r$1) {
			_defineProperty$7(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$7(e, r, t) {
	return (r = _toPropertyKey$7(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$7(t) {
	var i = _toPrimitive$7(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$7(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var cartesianAxisSlice = createSlice({
	name: "cartesianAxis",
	initialState: {
		xAxis: {},
		yAxis: {},
		zAxis: {}
	},
	reducers: {
		addXAxis: {
			reducer(state, action) {
				state.xAxis[action.payload.id] = castDraft(action.payload);
			},
			prepare: prepareAutoBatched()
		},
		replaceXAxis: {
			reducer(state, action) {
				var { prev, next } = action.payload;
				if (state.xAxis[prev.id] !== void 0) {
					if (prev.id !== next.id) delete state.xAxis[prev.id];
					state.xAxis[next.id] = castDraft(next);
				}
			},
			prepare: prepareAutoBatched()
		},
		removeXAxis: {
			reducer(state, action) {
				delete state.xAxis[action.payload.id];
			},
			prepare: prepareAutoBatched()
		},
		addYAxis: {
			reducer(state, action) {
				state.yAxis[action.payload.id] = castDraft(action.payload);
			},
			prepare: prepareAutoBatched()
		},
		replaceYAxis: {
			reducer(state, action) {
				var { prev, next } = action.payload;
				if (state.yAxis[prev.id] !== void 0) {
					if (prev.id !== next.id) delete state.yAxis[prev.id];
					state.yAxis[next.id] = castDraft(next);
				}
			},
			prepare: prepareAutoBatched()
		},
		removeYAxis: {
			reducer(state, action) {
				delete state.yAxis[action.payload.id];
			},
			prepare: prepareAutoBatched()
		},
		addZAxis: {
			reducer(state, action) {
				state.zAxis[action.payload.id] = castDraft(action.payload);
			},
			prepare: prepareAutoBatched()
		},
		replaceZAxis: {
			reducer(state, action) {
				var { prev, next } = action.payload;
				if (state.zAxis[prev.id] !== void 0) {
					if (prev.id !== next.id) delete state.zAxis[prev.id];
					state.zAxis[next.id] = castDraft(next);
				}
			},
			prepare: prepareAutoBatched()
		},
		removeZAxis: {
			reducer(state, action) {
				delete state.zAxis[action.payload.id];
			},
			prepare: prepareAutoBatched()
		},
		updateYAxisWidth(state, action) {
			var { id, width } = action.payload;
			var axis = state.yAxis[id];
			if (axis) {
				var history = axis.widthHistory || [];
				if (history.length === 3 && history[0] === history[2] && width === history[1] && width !== axis.width && Math.abs(width - history[0]) <= 1) return;
				var newHistory = [...history, width].slice(-3);
				state.yAxis[id] = _objectSpread$6(_objectSpread$6({}, state.yAxis[id]), {}, {
					width,
					widthHistory: newHistory
				});
			}
		}
	}
});
var { addXAxis, replaceXAxis, removeXAxis, addYAxis, replaceYAxis, removeYAxis, addZAxis, replaceZAxis, removeZAxis, updateYAxisWidth } = cartesianAxisSlice.actions;
var cartesianAxisReducer = cartesianAxisSlice.reducer;
var selectPlotArea = createSelector([
	createSelector([selectChartOffsetInternal], (offsetInternal) => {
		return {
			top: offsetInternal.top,
			bottom: offsetInternal.bottom,
			left: offsetInternal.left,
			right: offsetInternal.right
		};
	}),
	selectChartWidth,
	selectChartHeight
], (offset, chartWidth, chartHeight) => {
	if (!offset || chartWidth == null || chartHeight == null) return;
	return {
		x: offset.left,
		y: offset.top,
		width: Math.max(0, chartWidth - offset.left - offset.right),
		height: Math.max(0, chartHeight - offset.top - offset.bottom)
	};
});
var usePlotArea = () => {
	return useAppSelector(selectPlotArea);
};
var useActiveTooltipDataPoints = () => {
	return useAppSelector(selectActiveTooltipDataPoints);
};
function ownKeys$5(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$5(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$5(Object(t), !0).forEach(function(r$1) {
			_defineProperty$6(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$6(e, r, t) {
	return (r = _toPropertyKey$6(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$6(t) {
	var i = _toPrimitive$6(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$6(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var ActivePoint = (_ref$1) => {
	var { point: point$1, childIndex, mainColor, activeDot, dataKey, clipPath } = _ref$1;
	if (activeDot === false || point$1.x == null || point$1.y == null) return null;
	var dotProps = _objectSpread$5(_objectSpread$5(_objectSpread$5({}, {
		index: childIndex,
		dataKey,
		cx: point$1.x,
		cy: point$1.y,
		r: 4,
		fill: mainColor !== null && mainColor !== void 0 ? mainColor : "none",
		strokeWidth: 2,
		stroke: "#fff",
		payload: point$1.payload,
		value: point$1.value
	}), svgPropertiesNoEventsFromUnknown(activeDot)), adaptEventHandlers(activeDot));
	var dot;
	if (/* @__PURE__ */ (0, import_react.isValidElement)(activeDot)) dot = /* @__PURE__ */ (0, import_react.cloneElement)(activeDot, dotProps);
	else if (typeof activeDot === "function") dot = activeDot(dotProps);
	else dot = /* @__PURE__ */ import_react.createElement(Dot, dotProps);
	return /* @__PURE__ */ import_react.createElement(Layer, {
		className: "recharts-active-dot",
		clipPath
	}, dot);
};
function ActivePoints(_ref2) {
	var { points, mainColor, activeDot, itemDataKey, clipPath, zIndex = DefaultZIndexes.activeDot } = _ref2;
	var activeTooltipIndex = useAppSelector(selectActiveTooltipIndex);
	var activeDataPoints = useActiveTooltipDataPoints();
	if (points == null || activeDataPoints == null) return null;
	var activePoint = points.find((p) => activeDataPoints.includes(p.payload));
	if (isNullish(activePoint)) return null;
	return /* @__PURE__ */ import_react.createElement(ZIndexLayer, { zIndex }, /* @__PURE__ */ import_react.createElement(ActivePoint, {
		point: activePoint,
		childIndex: Number(activeTooltipIndex),
		mainColor,
		dataKey: itemDataKey,
		activeDot,
		clipPath
	}));
}
var errorBarSlice = createSlice({
	name: "errorBars",
	initialState: {},
	reducers: {
		addErrorBar: (state, action) => {
			var { itemId, errorBar } = action.payload;
			if (!state[itemId]) state[itemId] = [];
			state[itemId].push(errorBar);
		},
		replaceErrorBar: (state, action) => {
			var { itemId, prev, next } = action.payload;
			if (state[itemId]) state[itemId] = state[itemId].map((e) => e.dataKey === prev.dataKey && e.direction === prev.direction ? next : e);
		},
		removeErrorBar: (state, action) => {
			var { itemId, errorBar } = action.payload;
			if (state[itemId]) state[itemId] = state[itemId].filter((e) => e.dataKey !== errorBar.dataKey || e.direction !== errorBar.direction);
		}
	}
});
var { addErrorBar, replaceErrorBar, removeErrorBar } = errorBarSlice.actions;
var errorBarReducer = errorBarSlice.reducer;
function useNeedsClip(xAxisId, yAxisId) {
	var _xAxis$allowDataOverf, _yAxis$allowDataOverf;
	var xAxis = useAppSelector((state) => selectXAxisSettings(state, xAxisId));
	var yAxis = useAppSelector((state) => selectYAxisSettings(state, yAxisId));
	var needClipX = (_xAxis$allowDataOverf = xAxis === null || xAxis === void 0 ? void 0 : xAxis.allowDataOverflow) !== null && _xAxis$allowDataOverf !== void 0 ? _xAxis$allowDataOverf : implicitXAxis.allowDataOverflow;
	var needClipY = (_yAxis$allowDataOverf = yAxis === null || yAxis === void 0 ? void 0 : yAxis.allowDataOverflow) !== null && _yAxis$allowDataOverf !== void 0 ? _yAxis$allowDataOverf : implicitYAxis.allowDataOverflow;
	return {
		needClip: needClipX || needClipY,
		needClipX,
		needClipY
	};
}
function GraphicalItemClipPath(_ref$1) {
	var { xAxisId, yAxisId, clipPathId } = _ref$1;
	var plotArea = usePlotArea();
	var { needClipX, needClipY, needClip } = useNeedsClip(xAxisId, yAxisId);
	if (!needClip || !plotArea) return null;
	var { x, y, width, height } = plotArea;
	return /* @__PURE__ */ import_react.createElement("clipPath", { id: "clipPath-".concat(clipPathId) }, /* @__PURE__ */ import_react.createElement("rect", {
		x: needClipX ? x : x - width / 2,
		y: needClipY ? y : y - height / 2,
		width: needClipX ? width : width * 2,
		height: needClipY ? height : height * 2
	}));
}
var propsToShallowCompare = new Set([
	"axisLine",
	"tickLine",
	"activeBar",
	"activeDot",
	"activeLabel",
	"activeShape",
	"allowEscapeViewBox",
	"background",
	"cursor",
	"dot",
	"label",
	"line",
	"margin",
	"padding",
	"position",
	"shape",
	"style",
	"tick",
	"wrapperStyle"
]);
function sameValueZero(x, y) {
	if (x == null && y == null) return true;
	if (typeof x === "number" && typeof y === "number") return x === y || x !== x && y !== y;
	return x === y;
}
function propsAreEqual(prevProps, nextProps) {
	for (var key of new Set([...Object.keys(prevProps), ...Object.keys(nextProps)])) if (propsToShallowCompare.has(key)) {
		if (prevProps[key] == null && nextProps[key] == null) continue;
		if (!shallowEqual(prevProps[key], nextProps[key])) return false;
	} else if (!sameValueZero(prevProps[key], nextProps[key])) return false;
	return true;
}
var ChartDataContextProvider = (props) => {
	var { chartData } = props;
	var dispatch = useAppDispatch();
	var isPanorama = useIsPanorama();
	(0, import_react.useEffect)(() => {
		if (isPanorama) return () => {};
		dispatch(setChartData(chartData));
		return () => {
			dispatch(setChartData(void 0));
		};
	}, [
		chartData,
		dispatch,
		isPanorama
	]);
	return null;
};
var initialState$2 = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	padding: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}
};
var brushSlice = createSlice({
	name: "brush",
	initialState: initialState$2,
	reducers: { setBrushSettings(_state, action) {
		if (action.payload == null) return initialState$2;
		return action.payload;
	} }
});
var { setBrushSettings } = brushSlice.actions;
var brushReducer = brushSlice.reducer;
function _defineProperty$5(e, r, t) {
	return (r = _toPropertyKey$5(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$5(t) {
	var i = _toPrimitive$5(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$5(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
_defineProperty$5(class ScaleHelper {
	static create(obj) {
		return new ScaleHelper(obj);
	}
	constructor(scale) {
		this.scale = scale;
	}
	get domain() {
		return this.scale.domain;
	}
	get range() {
		return this.scale.range;
	}
	get rangeMin() {
		return this.range()[0];
	}
	get rangeMax() {
		return this.range()[1];
	}
	get bandwidth() {
		return this.scale.bandwidth;
	}
	apply(value) {
		var { bandAware, position } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		if (value === void 0) return;
		if (position) switch (position) {
			case "start": return this.scale(value);
			case "middle":
				var offset = this.bandwidth ? this.bandwidth() / 2 : 0;
				return this.scale(value) + offset;
			case "end":
				var _offset = this.bandwidth ? this.bandwidth() : 0;
				return this.scale(value) + _offset;
			default: return this.scale(value);
		}
		if (bandAware) {
			var _offset2 = this.bandwidth ? this.bandwidth() / 2 : 0;
			return this.scale(value) + _offset2;
		}
		return this.scale(value);
	}
	isInRange(value) {
		var range$2 = this.range();
		var first = range$2[0];
		var last$1 = range$2[range$2.length - 1];
		return first <= last$1 ? value >= first && value <= last$1 : value >= last$1 && value <= first;
	}
}, "EPS", 1e-4);
function normalizeAngle(angle) {
	return (angle % 180 + 180) % 180;
}
var getAngledRectangleWidth = function getAngledRectangleWidth$1(_ref5) {
	var { width, height } = _ref5;
	var angleRadians = normalizeAngle(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0) * Math.PI / 180;
	var angleThreshold = Math.atan(height / width);
	var angledWidth = angleRadians > angleThreshold && angleRadians < Math.PI - angleThreshold ? height / Math.sin(angleRadians) : width / Math.cos(angleRadians);
	return Math.abs(angledWidth);
};
var referenceElementsSlice = createSlice({
	name: "referenceElements",
	initialState: {
		dots: [],
		areas: [],
		lines: []
	},
	reducers: {
		addDot: (state, action) => {
			state.dots.push(action.payload);
		},
		removeDot: (state, action) => {
			var index = current(state).dots.findIndex((dot) => dot === action.payload);
			if (index !== -1) state.dots.splice(index, 1);
		},
		addArea: (state, action) => {
			state.areas.push(action.payload);
		},
		removeArea: (state, action) => {
			var index = current(state).areas.findIndex((area) => area === action.payload);
			if (index !== -1) state.areas.splice(index, 1);
		},
		addLine: (state, action) => {
			state.lines.push(castDraft(action.payload));
		},
		removeLine: (state, action) => {
			var index = current(state).lines.findIndex((line) => line === action.payload);
			if (index !== -1) state.lines.splice(index, 1);
		}
	}
});
var { addDot, removeDot, addArea, removeArea, addLine, removeLine } = referenceElementsSlice.actions;
var referenceElementsReducer = referenceElementsSlice.reducer;
var ClipPathIdContext = /* @__PURE__ */ (0, import_react.createContext)(void 0);
var ClipPathProvider = (_ref$1) => {
	var { children } = _ref$1;
	var [clipPathId] = (0, import_react.useState)("".concat(uniqueId("recharts"), "-clip"));
	var plotArea = usePlotArea();
	if (plotArea == null) return null;
	var { x, y, width, height } = plotArea;
	return /* @__PURE__ */ import_react.createElement(ClipPathIdContext.Provider, { value: clipPathId }, /* @__PURE__ */ import_react.createElement("defs", null, /* @__PURE__ */ import_react.createElement("clipPath", { id: clipPathId }, /* @__PURE__ */ import_react.createElement("rect", {
		x,
		y,
		height,
		width
	}))), children);
};
function getEveryNthWithCondition(array, n) {
	if (n < 1) return [];
	if (n === 1) return array;
	var result = [];
	for (var i = 0; i < array.length; i += n) result.push(array[i]);
	return result;
}
function getAngledTickWidth(contentSize, unitSize, angle) {
	return getAngledRectangleWidth({
		width: contentSize.width + unitSize.width,
		height: contentSize.height + unitSize.height
	}, angle);
}
function getTickBoundaries(viewBox, sign, sizeKey) {
	var isWidth = sizeKey === "width";
	var { x, y, width, height } = viewBox;
	if (sign === 1) return {
		start: isWidth ? x : y,
		end: isWidth ? x + width : y + height
	};
	return {
		start: isWidth ? x + width : y + height,
		end: isWidth ? x : y
	};
}
function isVisible(sign, tickPosition, getSize, start, end) {
	if (sign * tickPosition < sign * start || sign * tickPosition > sign * end) return false;
	var size = getSize();
	return sign * (tickPosition - sign * size / 2 - start) >= 0 && sign * (tickPosition + sign * size / 2 - end) <= 0;
}
function getNumberIntervalTicks(ticks, interval) {
	return getEveryNthWithCondition(ticks, interval + 1);
}
function getEquidistantTicks(sign, boundaries, getTickSize, ticks, minTickGap) {
	var result = (ticks || []).slice();
	var { start: initialStart, end } = boundaries;
	var index = 0;
	var stepsize = 1;
	var start = initialStart;
	var _loop = function _loop$1() {
		var entry = ticks === null || ticks === void 0 ? void 0 : ticks[index];
		if (entry === void 0) return { v: getEveryNthWithCondition(ticks, stepsize) };
		var i = index;
		var size;
		var getSize = () => {
			if (size === void 0) size = getTickSize(entry, i);
			return size;
		};
		var tickCoord = entry.coordinate;
		var isShow = index === 0 || isVisible(sign, tickCoord, getSize, start, end);
		if (!isShow) {
			index = 0;
			start = initialStart;
			stepsize += 1;
		}
		if (isShow) {
			start = tickCoord + sign * (getSize() / 2 + minTickGap);
			index += stepsize;
		}
	}, _ret;
	while (stepsize <= result.length) {
		_ret = _loop();
		if (_ret) return _ret.v;
	}
	return [];
}
function ownKeys$4(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$4(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$4(Object(t), !0).forEach(function(r$1) {
			_defineProperty$4(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$4(e, r, t) {
	return (r = _toPropertyKey$4(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$4(t) {
	var i = _toPrimitive$4(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$4(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function getTicksEnd(sign, boundaries, getTickSize, ticks, minTickGap) {
	var result = (ticks || []).slice();
	var len = result.length;
	var { start } = boundaries;
	var { end } = boundaries;
	var _loop = function _loop$1(i$1) {
		var entry = result[i$1];
		var size;
		var getSize = () => {
			if (size === void 0) size = getTickSize(entry, i$1);
			return size;
		};
		if (i$1 === len - 1) {
			var gap = sign * (entry.coordinate + sign * getSize() / 2 - end);
			result[i$1] = entry = _objectSpread$4(_objectSpread$4({}, entry), {}, { tickCoord: gap > 0 ? entry.coordinate - gap * sign : entry.coordinate });
		} else result[i$1] = entry = _objectSpread$4(_objectSpread$4({}, entry), {}, { tickCoord: entry.coordinate });
		if (entry.tickCoord != null) {
			if (isVisible(sign, entry.tickCoord, getSize, start, end)) {
				end = entry.tickCoord - sign * (getSize() / 2 + minTickGap);
				result[i$1] = _objectSpread$4(_objectSpread$4({}, entry), {}, { isShow: true });
			}
		}
	};
	for (var i = len - 1; i >= 0; i--) _loop(i);
	return result;
}
function getTicksStart(sign, boundaries, getTickSize, ticks, minTickGap, preserveEnd) {
	var result = (ticks || []).slice();
	var len = result.length;
	var { start, end } = boundaries;
	if (preserveEnd) {
		var tail = ticks[len - 1];
		var tailSize = getTickSize(tail, len - 1);
		var tailGap = sign * (tail.coordinate + sign * tailSize / 2 - end);
		result[len - 1] = tail = _objectSpread$4(_objectSpread$4({}, tail), {}, { tickCoord: tailGap > 0 ? tail.coordinate - tailGap * sign : tail.coordinate });
		if (tail.tickCoord != null) {
			if (isVisible(sign, tail.tickCoord, () => tailSize, start, end)) {
				end = tail.tickCoord - sign * (tailSize / 2 + minTickGap);
				result[len - 1] = _objectSpread$4(_objectSpread$4({}, tail), {}, { isShow: true });
			}
		}
	}
	var count = preserveEnd ? len - 1 : len;
	var _loop2 = function _loop2$1(i$1) {
		var entry = result[i$1];
		var size;
		var getSize = () => {
			if (size === void 0) size = getTickSize(entry, i$1);
			return size;
		};
		if (i$1 === 0) {
			var gap = sign * (entry.coordinate - sign * getSize() / 2 - start);
			result[i$1] = entry = _objectSpread$4(_objectSpread$4({}, entry), {}, { tickCoord: gap < 0 ? entry.coordinate - gap * sign : entry.coordinate });
		} else result[i$1] = entry = _objectSpread$4(_objectSpread$4({}, entry), {}, { tickCoord: entry.coordinate });
		if (entry.tickCoord != null) {
			if (isVisible(sign, entry.tickCoord, getSize, start, end)) {
				start = entry.tickCoord + sign * (getSize() / 2 + minTickGap);
				result[i$1] = _objectSpread$4(_objectSpread$4({}, entry), {}, { isShow: true });
			}
		}
	};
	for (var i = 0; i < count; i++) _loop2(i);
	return result;
}
function getTicks(props, fontSize, letterSpacing) {
	var { tick, ticks, viewBox, minTickGap, orientation, interval, tickFormatter, unit, angle } = props;
	if (!ticks || !ticks.length || !tick) return [];
	if (isNumber(interval) || Global.isSsr) {
		var _getNumberIntervalTic;
		return (_getNumberIntervalTic = getNumberIntervalTicks(ticks, isNumber(interval) ? interval : 0)) !== null && _getNumberIntervalTic !== void 0 ? _getNumberIntervalTic : [];
	}
	var candidates = [];
	var sizeKey = orientation === "top" || orientation === "bottom" ? "width" : "height";
	var unitSize = unit && sizeKey === "width" ? getStringSize(unit, {
		fontSize,
		letterSpacing
	}) : {
		width: 0,
		height: 0
	};
	var getTickSize = (content, index) => {
		var value = typeof tickFormatter === "function" ? tickFormatter(content.value, index) : content.value;
		return sizeKey === "width" ? getAngledTickWidth(getStringSize(value, {
			fontSize,
			letterSpacing
		}), unitSize, angle) : getStringSize(value, {
			fontSize,
			letterSpacing
		})[sizeKey];
	};
	var sign = ticks.length >= 2 ? mathSign(ticks[1].coordinate - ticks[0].coordinate) : 1;
	var boundaries = getTickBoundaries(viewBox, sign, sizeKey);
	if (interval === "equidistantPreserveStart") return getEquidistantTicks(sign, boundaries, getTickSize, ticks, minTickGap);
	if (interval === "preserveStart" || interval === "preserveStartEnd") candidates = getTicksStart(sign, boundaries, getTickSize, ticks, minTickGap, interval === "preserveStartEnd");
	else candidates = getTicksEnd(sign, boundaries, getTickSize, ticks, minTickGap);
	return candidates.filter((entry) => entry.isShow);
}
var getCalculatedYAxisWidth = (_ref$1) => {
	var { ticks, label, labelGapWithTick = 5, tickSize = 0, tickMargin = 0 } = _ref$1;
	var maxTickWidth = 0;
	if (ticks) {
		Array.from(ticks).forEach((tickNode) => {
			if (tickNode) {
				var bbox = tickNode.getBoundingClientRect();
				if (bbox.width > maxTickWidth) maxTickWidth = bbox.width;
			}
		});
		var labelWidth = label ? label.getBoundingClientRect().width : 0;
		var tickWidth = tickSize + tickMargin;
		var updatedYAxisWidth = maxTickWidth + tickWidth + labelWidth + (label ? labelGapWithTick : 0);
		return Math.round(updatedYAxisWidth);
	}
	return 0;
};
var import_get = /* @__PURE__ */ __toESM(require_get());
var _excluded$7 = [
	"axisLine",
	"width",
	"height",
	"className",
	"hide",
	"ticks",
	"axisType"
];
function _objectWithoutProperties$7(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$7(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$7(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function _extends$7() {
	return _extends$7 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$7.apply(null, arguments);
}
function ownKeys$3(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$3(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$3(Object(t), !0).forEach(function(r$1) {
			_defineProperty$3(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$3(e, r, t) {
	return (r = _toPropertyKey$3(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$3(t) {
	var i = _toPrimitive$3(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$3(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var defaultCartesianAxisProps = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	viewBox: {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	},
	orientation: "bottom",
	ticks: [],
	stroke: "#666",
	tickLine: true,
	axisLine: true,
	tick: true,
	mirror: false,
	minTickGap: 5,
	tickSize: 6,
	tickMargin: 2,
	interval: "preserveEnd",
	zIndex: DefaultZIndexes.axis
};
function AxisLine(axisLineProps) {
	var { x, y, width, height, orientation, mirror, axisLine, otherSvgProps } = axisLineProps;
	if (!axisLine) return null;
	var props = _objectSpread$3(_objectSpread$3(_objectSpread$3({}, otherSvgProps), svgPropertiesNoEvents(axisLine)), {}, { fill: "none" });
	if (orientation === "top" || orientation === "bottom") {
		var needHeight = +(orientation === "top" && !mirror || orientation === "bottom" && mirror);
		props = _objectSpread$3(_objectSpread$3({}, props), {}, {
			x1: x,
			y1: y + needHeight * height,
			x2: x + width,
			y2: y + needHeight * height
		});
	} else {
		var needWidth = +(orientation === "left" && !mirror || orientation === "right" && mirror);
		props = _objectSpread$3(_objectSpread$3({}, props), {}, {
			x1: x + needWidth * width,
			y1: y,
			x2: x + needWidth * width,
			y2: y + height
		});
	}
	return /* @__PURE__ */ import_react.createElement("line", _extends$7({}, props, { className: clsx("recharts-cartesian-axis-line", (0, import_get.default)(axisLine, "className")) }));
}
function getTickLineCoord(data, x, y, width, height, orientation, tickSize, mirror, tickMargin) {
	var x1, x2, y1, y2, tx, ty;
	var sign = mirror ? -1 : 1;
	var finalTickSize = data.tickSize || tickSize;
	var tickCoord = isNumber(data.tickCoord) ? data.tickCoord : data.coordinate;
	switch (orientation) {
		case "top":
			x1 = x2 = data.coordinate;
			y2 = y + +!mirror * height;
			y1 = y2 - sign * finalTickSize;
			ty = y1 - sign * tickMargin;
			tx = tickCoord;
			break;
		case "left":
			y1 = y2 = data.coordinate;
			x2 = x + +!mirror * width;
			x1 = x2 - sign * finalTickSize;
			tx = x1 - sign * tickMargin;
			ty = tickCoord;
			break;
		case "right":
			y1 = y2 = data.coordinate;
			x2 = x + +mirror * width;
			x1 = x2 + sign * finalTickSize;
			tx = x1 + sign * tickMargin;
			ty = tickCoord;
			break;
		default:
			x1 = x2 = data.coordinate;
			y2 = y + +mirror * height;
			y1 = y2 + sign * finalTickSize;
			ty = y1 + sign * tickMargin;
			tx = tickCoord;
			break;
	}
	return {
		line: {
			x1,
			y1,
			x2,
			y2
		},
		tick: {
			x: tx,
			y: ty
		}
	};
}
function getTickTextAnchor(orientation, mirror) {
	switch (orientation) {
		case "left": return mirror ? "start" : "end";
		case "right": return mirror ? "end" : "start";
		default: return "middle";
	}
}
function getTickVerticalAnchor(orientation, mirror) {
	switch (orientation) {
		case "left":
		case "right": return "middle";
		case "top": return mirror ? "start" : "end";
		default: return mirror ? "end" : "start";
	}
}
function TickItem(props) {
	var { option, tickProps, value } = props;
	var tickItem;
	var combinedClassName = clsx(tickProps.className, "recharts-cartesian-axis-tick-value");
	if (/* @__PURE__ */ import_react.isValidElement(option)) tickItem = /* @__PURE__ */ import_react.cloneElement(option, _objectSpread$3(_objectSpread$3({}, tickProps), {}, { className: combinedClassName }));
	else if (typeof option === "function") tickItem = option(_objectSpread$3(_objectSpread$3({}, tickProps), {}, { className: combinedClassName }));
	else {
		var className = "recharts-cartesian-axis-tick-value";
		if (typeof option !== "boolean") className = clsx(className, option === null || option === void 0 ? void 0 : option.className);
		tickItem = /* @__PURE__ */ import_react.createElement(Text, _extends$7({}, tickProps, { className }), value);
	}
	return tickItem;
}
var Ticks = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	var { ticks = [], tick, tickLine, stroke, tickFormatter, unit, padding, tickTextProps, orientation, mirror, x, y, width, height, tickSize, tickMargin, fontSize, letterSpacing, getTicksConfig, events, axisType } = props;
	var finalTicks = getTicks(_objectSpread$3(_objectSpread$3({}, getTicksConfig), {}, { ticks }), fontSize, letterSpacing);
	var textAnchor = getTickTextAnchor(orientation, mirror);
	var verticalAnchor = getTickVerticalAnchor(orientation, mirror);
	var axisProps = svgPropertiesNoEvents(getTicksConfig);
	var customTickProps = svgPropertiesNoEventsFromUnknown(tick);
	var tickLinePropsObject = {};
	if (typeof tickLine === "object") tickLinePropsObject = tickLine;
	var tickLineProps = _objectSpread$3(_objectSpread$3({}, axisProps), {}, { fill: "none" }, tickLinePropsObject);
	var tickLineCoords = finalTicks.map((entry) => _objectSpread$3({ entry }, getTickLineCoord(entry, x, y, width, height, orientation, tickSize, mirror, tickMargin)));
	var tickLines = tickLineCoords.map((_ref$1) => {
		var { entry, line: lineCoord } = _ref$1;
		return /* @__PURE__ */ import_react.createElement(Layer, {
			className: "recharts-cartesian-axis-tick",
			key: "tick-".concat(entry.value, "-").concat(entry.coordinate, "-").concat(entry.tickCoord)
		}, tickLine && /* @__PURE__ */ import_react.createElement("line", _extends$7({}, tickLineProps, lineCoord, { className: clsx("recharts-cartesian-axis-tick-line", (0, import_get.default)(tickLine, "className")) })));
	});
	var tickLabels = tickLineCoords.map((_ref2, i) => {
		var { entry, tick: tickCoord } = _ref2;
		var tickProps = _objectSpread$3(_objectSpread$3(_objectSpread$3(_objectSpread$3({
			textAnchor,
			verticalAnchor
		}, axisProps), {}, {
			stroke: "none",
			fill: stroke
		}, customTickProps), tickCoord), {}, {
			index: i,
			payload: entry,
			visibleTicksCount: finalTicks.length,
			tickFormatter,
			padding
		}, tickTextProps);
		return /* @__PURE__ */ import_react.createElement(Layer, _extends$7({
			className: "recharts-cartesian-axis-tick-label",
			key: "tick-label-".concat(entry.value, "-").concat(entry.coordinate, "-").concat(entry.tickCoord)
		}, adaptEventsOfChild(events, entry, i)), tick && /* @__PURE__ */ import_react.createElement(TickItem, {
			option: tick,
			tickProps,
			value: "".concat(typeof tickFormatter === "function" ? tickFormatter(entry.value, i) : entry.value).concat(unit || "")
		}));
	});
	return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-cartesian-axis-ticks recharts-".concat(axisType, "-ticks") }, tickLabels.length > 0 && /* @__PURE__ */ import_react.createElement(ZIndexLayer, { zIndex: DefaultZIndexes.label }, /* @__PURE__ */ import_react.createElement("g", {
		className: "recharts-cartesian-axis-tick-labels recharts-".concat(axisType, "-tick-labels"),
		ref
	}, tickLabels)), tickLines.length > 0 && /* @__PURE__ */ import_react.createElement("g", { className: "recharts-cartesian-axis-tick-lines recharts-".concat(axisType, "-tick-lines") }, tickLines));
});
var CartesianAxisComponent = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	var { axisLine, width, height, className, hide, ticks, axisType } = props, rest = _objectWithoutProperties$7(props, _excluded$7);
	var [fontSize, setFontSize] = (0, import_react.useState)("");
	var [letterSpacing, setLetterSpacing] = (0, import_react.useState)("");
	var tickRefs = (0, import_react.useRef)(null);
	(0, import_react.useImperativeHandle)(ref, () => ({ getCalculatedWidth: () => {
		var _props$labelRef;
		return getCalculatedYAxisWidth({
			ticks: tickRefs.current,
			label: (_props$labelRef = props.labelRef) === null || _props$labelRef === void 0 ? void 0 : _props$labelRef.current,
			labelGapWithTick: 5,
			tickSize: props.tickSize,
			tickMargin: props.tickMargin
		});
	} }));
	var layerRef = (0, import_react.useCallback)((el) => {
		if (el) {
			var tickNodes = el.getElementsByClassName("recharts-cartesian-axis-tick-value");
			tickRefs.current = tickNodes;
			var tick = tickNodes[0];
			if (tick) {
				var computedStyle = window.getComputedStyle(tick);
				var calculatedFontSize = computedStyle.fontSize;
				var calculatedLetterSpacing = computedStyle.letterSpacing;
				if (calculatedFontSize !== fontSize || calculatedLetterSpacing !== letterSpacing) {
					setFontSize(calculatedFontSize);
					setLetterSpacing(calculatedLetterSpacing);
				}
			}
		}
	}, [fontSize, letterSpacing]);
	if (hide) return null;
	if (width != null && width <= 0 || height != null && height <= 0) return null;
	return /* @__PURE__ */ import_react.createElement(ZIndexLayer, { zIndex: props.zIndex }, /* @__PURE__ */ import_react.createElement(Layer, { className: clsx("recharts-cartesian-axis", className) }, /* @__PURE__ */ import_react.createElement(AxisLine, {
		x: props.x,
		y: props.y,
		width,
		height,
		orientation: props.orientation,
		mirror: props.mirror,
		axisLine,
		otherSvgProps: svgPropertiesNoEvents(props)
	}), /* @__PURE__ */ import_react.createElement(Ticks, {
		ref: layerRef,
		axisType,
		events: rest,
		fontSize,
		getTicksConfig: props,
		height: props.height,
		letterSpacing,
		mirror: props.mirror,
		orientation: props.orientation,
		padding: props.padding,
		stroke: props.stroke,
		tick: props.tick,
		tickFormatter: props.tickFormatter,
		tickLine: props.tickLine,
		tickMargin: props.tickMargin,
		tickSize: props.tickSize,
		tickTextProps: props.tickTextProps,
		ticks,
		unit: props.unit,
		width: props.width,
		x: props.x,
		y: props.y
	}), /* @__PURE__ */ import_react.createElement(CartesianLabelContextProvider, {
		x: props.x,
		y: props.y,
		width: props.width,
		height: props.height,
		lowerWidth: props.width,
		upperWidth: props.width
	}, /* @__PURE__ */ import_react.createElement(CartesianLabelFromLabelProp, {
		label: props.label,
		labelRef: props.labelRef
	}), props.children)));
});
var CartesianAxis = /* @__PURE__ */ import_react.forwardRef((outsideProps, ref) => {
	var props = resolveDefaultProps(outsideProps, defaultCartesianAxisProps);
	return /* @__PURE__ */ import_react.createElement(CartesianAxisComponent, _extends$7({}, props, { ref }));
});
CartesianAxis.displayName = "CartesianAxis";
var _excluded$6 = [
	"x1",
	"y1",
	"x2",
	"y2",
	"key"
], _excluded2$4 = ["offset"], _excluded3 = ["xAxisId", "yAxisId"], _excluded4 = ["xAxisId", "yAxisId"];
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r$1) {
			_defineProperty$2(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$2(e, r, t) {
	return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$2(t) {
	var i = _toPrimitive$2(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$2(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$6() {
	return _extends$6 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$6.apply(null, arguments);
}
function _objectWithoutProperties$6(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$6(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$6(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var Background = (props) => {
	var { fill } = props;
	if (!fill || fill === "none") return null;
	var { fillOpacity, x, y, width, height, ry } = props;
	return /* @__PURE__ */ import_react.createElement("rect", {
		x,
		y,
		ry,
		width,
		height,
		stroke: "none",
		fill,
		fillOpacity,
		className: "recharts-cartesian-grid-bg"
	});
};
function LineItem(_ref$1) {
	var { option, lineItemProps } = _ref$1;
	var lineItem;
	if (/* @__PURE__ */ import_react.isValidElement(option)) lineItem = /* @__PURE__ */ import_react.cloneElement(option, lineItemProps);
	else if (typeof option === "function") lineItem = option(lineItemProps);
	else {
		var _svgPropertiesNoEvent;
		var { x1, y1, x2, y2, key } = lineItemProps;
		var _ref2 = (_svgPropertiesNoEvent = svgPropertiesNoEvents(_objectWithoutProperties$6(lineItemProps, _excluded$6))) !== null && _svgPropertiesNoEvent !== void 0 ? _svgPropertiesNoEvent : {}, { offset: __ } = _ref2, restOfFilteredProps = _objectWithoutProperties$6(_ref2, _excluded2$4);
		lineItem = /* @__PURE__ */ import_react.createElement("line", _extends$6({}, restOfFilteredProps, {
			x1,
			y1,
			x2,
			y2,
			fill: "none",
			key
		}));
	}
	return lineItem;
}
function HorizontalGridLines(props) {
	var { x, width, horizontal = true, horizontalPoints } = props;
	if (!horizontal || !horizontalPoints || !horizontalPoints.length) return null;
	var { xAxisId, yAxisId } = props, otherLineItemProps = _objectWithoutProperties$6(props, _excluded3);
	var items = horizontalPoints.map((entry, i) => {
		var lineItemProps = _objectSpread$2(_objectSpread$2({}, otherLineItemProps), {}, {
			x1: x,
			y1: entry,
			x2: x + width,
			y2: entry,
			key: "line-".concat(i),
			index: i
		});
		return /* @__PURE__ */ import_react.createElement(LineItem, {
			key: "line-".concat(i),
			option: horizontal,
			lineItemProps
		});
	});
	return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-cartesian-grid-horizontal" }, items);
}
function VerticalGridLines(props) {
	var { y, height, vertical = true, verticalPoints } = props;
	if (!vertical || !verticalPoints || !verticalPoints.length) return null;
	var { xAxisId, yAxisId } = props, otherLineItemProps = _objectWithoutProperties$6(props, _excluded4);
	var items = verticalPoints.map((entry, i) => {
		var lineItemProps = _objectSpread$2(_objectSpread$2({}, otherLineItemProps), {}, {
			x1: entry,
			y1: y,
			x2: entry,
			y2: y + height,
			key: "line-".concat(i),
			index: i
		});
		return /* @__PURE__ */ import_react.createElement(LineItem, {
			option: vertical,
			lineItemProps,
			key: "line-".concat(i)
		});
	});
	return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-cartesian-grid-vertical" }, items);
}
function HorizontalStripes(props) {
	var { horizontalFill, fillOpacity, x, y, width, height, horizontalPoints, horizontal = true } = props;
	if (!horizontal || !horizontalFill || !horizontalFill.length || horizontalPoints == null) return null;
	var roundedSortedHorizontalPoints = horizontalPoints.map((e) => Math.round(e + y - y)).sort((a, b) => a - b);
	if (y !== roundedSortedHorizontalPoints[0]) roundedSortedHorizontalPoints.unshift(0);
	var items = roundedSortedHorizontalPoints.map((entry, i) => {
		var lineHeight = !roundedSortedHorizontalPoints[i + 1] ? y + height - entry : roundedSortedHorizontalPoints[i + 1] - entry;
		if (lineHeight <= 0) return null;
		var colorIndex = i % horizontalFill.length;
		return /* @__PURE__ */ import_react.createElement("rect", {
			key: "react-".concat(i),
			y: entry,
			x,
			height: lineHeight,
			width,
			stroke: "none",
			fill: horizontalFill[colorIndex],
			fillOpacity,
			className: "recharts-cartesian-grid-bg"
		});
	});
	return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-cartesian-gridstripes-horizontal" }, items);
}
function VerticalStripes(props) {
	var { vertical = true, verticalFill, fillOpacity, x, y, width, height, verticalPoints } = props;
	if (!vertical || !verticalFill || !verticalFill.length) return null;
	var roundedSortedVerticalPoints = verticalPoints.map((e) => Math.round(e + x - x)).sort((a, b) => a - b);
	if (x !== roundedSortedVerticalPoints[0]) roundedSortedVerticalPoints.unshift(0);
	var items = roundedSortedVerticalPoints.map((entry, i) => {
		var lineWidth = !roundedSortedVerticalPoints[i + 1] ? x + width - entry : roundedSortedVerticalPoints[i + 1] - entry;
		if (lineWidth <= 0) return null;
		var colorIndex = i % verticalFill.length;
		return /* @__PURE__ */ import_react.createElement("rect", {
			key: "react-".concat(i),
			x: entry,
			y,
			width: lineWidth,
			height,
			stroke: "none",
			fill: verticalFill[colorIndex],
			fillOpacity,
			className: "recharts-cartesian-grid-bg"
		});
	});
	return /* @__PURE__ */ import_react.createElement("g", { className: "recharts-cartesian-gridstripes-vertical" }, items);
}
var defaultVerticalCoordinatesGenerator = (_ref3, syncWithTicks) => {
	var { xAxis, width, height, offset } = _ref3;
	return getCoordinatesOfGrid(getTicks(_objectSpread$2(_objectSpread$2(_objectSpread$2({}, defaultCartesianAxisProps), xAxis), {}, {
		ticks: getTicksOfAxis(xAxis, true),
		viewBox: {
			x: 0,
			y: 0,
			width,
			height
		}
	})), offset.left, offset.left + offset.width, syncWithTicks);
};
var defaultHorizontalCoordinatesGenerator = (_ref4, syncWithTicks) => {
	var { yAxis, width, height, offset } = _ref4;
	return getCoordinatesOfGrid(getTicks(_objectSpread$2(_objectSpread$2(_objectSpread$2({}, defaultCartesianAxisProps), yAxis), {}, {
		ticks: getTicksOfAxis(yAxis, true),
		viewBox: {
			x: 0,
			y: 0,
			width,
			height
		}
	})), offset.top, offset.top + offset.height, syncWithTicks);
};
var defaultCartesianGridProps = {
	horizontal: true,
	vertical: true,
	horizontalPoints: [],
	verticalPoints: [],
	stroke: "#ccc",
	fill: "none",
	verticalFill: [],
	horizontalFill: [],
	xAxisId: 0,
	yAxisId: 0,
	syncWithTicks: false,
	zIndex: DefaultZIndexes.grid
};
function CartesianGrid(props) {
	var chartWidth = useChartWidth();
	var chartHeight = useChartHeight();
	var offset = useOffsetInternal();
	var propsIncludingDefaults = _objectSpread$2(_objectSpread$2({}, resolveDefaultProps(props, defaultCartesianGridProps)), {}, {
		x: isNumber(props.x) ? props.x : offset.left,
		y: isNumber(props.y) ? props.y : offset.top,
		width: isNumber(props.width) ? props.width : offset.width,
		height: isNumber(props.height) ? props.height : offset.height
	});
	var { xAxisId, yAxisId, x, y, width, height, syncWithTicks, horizontalValues, verticalValues } = propsIncludingDefaults;
	var isPanorama = useIsPanorama();
	var xAxis = useAppSelector((state) => selectAxisPropsNeededForCartesianGridTicksGenerator(state, "xAxis", xAxisId, isPanorama));
	var yAxis = useAppSelector((state) => selectAxisPropsNeededForCartesianGridTicksGenerator(state, "yAxis", yAxisId, isPanorama));
	if (!isPositiveNumber(width) || !isPositiveNumber(height) || !isNumber(x) || !isNumber(y)) return null;
	var verticalCoordinatesGenerator = propsIncludingDefaults.verticalCoordinatesGenerator || defaultVerticalCoordinatesGenerator;
	var horizontalCoordinatesGenerator = propsIncludingDefaults.horizontalCoordinatesGenerator || defaultHorizontalCoordinatesGenerator;
	var { horizontalPoints, verticalPoints } = propsIncludingDefaults;
	if ((!horizontalPoints || !horizontalPoints.length) && typeof horizontalCoordinatesGenerator === "function") {
		var isHorizontalValues = horizontalValues && horizontalValues.length;
		var generatorResult = horizontalCoordinatesGenerator({
			yAxis: yAxis ? _objectSpread$2(_objectSpread$2({}, yAxis), {}, { ticks: isHorizontalValues ? horizontalValues : yAxis.ticks }) : void 0,
			width: chartWidth !== null && chartWidth !== void 0 ? chartWidth : width,
			height: chartHeight !== null && chartHeight !== void 0 ? chartHeight : height,
			offset
		}, isHorizontalValues ? true : syncWithTicks);
		warn(Array.isArray(generatorResult), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(typeof generatorResult, "]"));
		if (Array.isArray(generatorResult)) horizontalPoints = generatorResult;
	}
	if ((!verticalPoints || !verticalPoints.length) && typeof verticalCoordinatesGenerator === "function") {
		var isVerticalValues = verticalValues && verticalValues.length;
		var _generatorResult = verticalCoordinatesGenerator({
			xAxis: xAxis ? _objectSpread$2(_objectSpread$2({}, xAxis), {}, { ticks: isVerticalValues ? verticalValues : xAxis.ticks }) : void 0,
			width: chartWidth !== null && chartWidth !== void 0 ? chartWidth : width,
			height: chartHeight !== null && chartHeight !== void 0 ? chartHeight : height,
			offset
		}, isVerticalValues ? true : syncWithTicks);
		warn(Array.isArray(_generatorResult), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(typeof _generatorResult, "]"));
		if (Array.isArray(_generatorResult)) verticalPoints = _generatorResult;
	}
	return /* @__PURE__ */ import_react.createElement(ZIndexLayer, { zIndex: propsIncludingDefaults.zIndex }, /* @__PURE__ */ import_react.createElement("g", { className: "recharts-cartesian-grid" }, /* @__PURE__ */ import_react.createElement(Background, {
		fill: propsIncludingDefaults.fill,
		fillOpacity: propsIncludingDefaults.fillOpacity,
		x: propsIncludingDefaults.x,
		y: propsIncludingDefaults.y,
		width: propsIncludingDefaults.width,
		height: propsIncludingDefaults.height,
		ry: propsIncludingDefaults.ry
	}), /* @__PURE__ */ import_react.createElement(HorizontalStripes, _extends$6({}, propsIncludingDefaults, { horizontalPoints })), /* @__PURE__ */ import_react.createElement(VerticalStripes, _extends$6({}, propsIncludingDefaults, { verticalPoints })), /* @__PURE__ */ import_react.createElement(HorizontalGridLines, _extends$6({}, propsIncludingDefaults, {
		offset,
		horizontalPoints,
		xAxis,
		yAxis
	})), /* @__PURE__ */ import_react.createElement(VerticalGridLines, _extends$6({}, propsIncludingDefaults, {
		offset,
		verticalPoints,
		xAxis,
		yAxis
	}))));
}
CartesianGrid.displayName = "CartesianGrid";
function getRadiusAndStrokeWidthFromDot(dot) {
	var props = svgPropertiesNoEventsFromUnknown(dot);
	var defaultR = 3;
	var defaultStrokeWidth = 2;
	if (props != null) {
		var { r, strokeWidth } = props;
		var realR = Number(r);
		var realStrokeWidth = Number(strokeWidth);
		if (Number.isNaN(realR) || realR < 0) realR = defaultR;
		if (Number.isNaN(realStrokeWidth) || realStrokeWidth < 0) realStrokeWidth = defaultStrokeWidth;
		return {
			r: realR,
			strokeWidth: realStrokeWidth
		};
	}
	return {
		r: defaultR,
		strokeWidth: defaultStrokeWidth
	};
}
var selectXAxisWithScale = (state, xAxisId, _yAxisId, isPanorama) => selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
var selectXAxisTicks = (state, xAxisId, _yAxisId, isPanorama) => selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
var selectYAxisWithScale = (state, _xAxisId, yAxisId, isPanorama) => selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
var selectYAxisTicks = (state, _xAxisId, yAxisId, isPanorama) => selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
var selectBandSize = createSelector([
	selectChartLayout,
	selectXAxisWithScale,
	selectYAxisWithScale,
	selectXAxisTicks,
	selectYAxisTicks
], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks) => {
	if (isCategoricalAxis(layout, "xAxis")) return getBandSizeOfAxis(xAxis, xAxisTicks, false);
	return getBandSizeOfAxis(yAxis, yAxisTicks, false);
});
var pickAreaId = (_state, _xAxisId, _yAxisId, _isPanorama, id) => id;
var selectSynchronisedAreaSettings = createSelector([selectUnfilteredCartesianItems, pickAreaId], (graphicalItems, id) => graphicalItems.filter((item) => item.type === "area").find((item) => item.id === id));
var selectGraphicalItemStackedData = (state, xAxisId, yAxisId, isPanorama, id) => {
	var _stackGroups$stackId;
	var areaSettings = selectSynchronisedAreaSettings(state, xAxisId, yAxisId, isPanorama, id);
	if (areaSettings == null) return;
	var isXAxisCategorical = isCategoricalAxis(selectChartLayout(state), "xAxis");
	var stackGroups;
	if (isXAxisCategorical) stackGroups = selectStackGroups(state, "yAxis", yAxisId, isPanorama);
	else stackGroups = selectStackGroups(state, "xAxis", xAxisId, isPanorama);
	if (stackGroups == null) return;
	var { stackId } = areaSettings;
	var stackSeriesIdentifier = getStackSeriesIdentifier(areaSettings);
	if (stackId == null || stackSeriesIdentifier == null) return;
	var groups = (_stackGroups$stackId = stackGroups[stackId]) === null || _stackGroups$stackId === void 0 ? void 0 : _stackGroups$stackId.stackedData;
	return groups === null || groups === void 0 ? void 0 : groups.find((v) => v.key === stackSeriesIdentifier);
};
var selectArea = createSelector([
	selectChartLayout,
	selectXAxisWithScale,
	selectYAxisWithScale,
	selectXAxisTicks,
	selectYAxisTicks,
	selectGraphicalItemStackedData,
	selectChartDataWithIndexesIfNotInPanorama,
	selectBandSize,
	selectSynchronisedAreaSettings,
	selectChartBaseValue
], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks, stackedData, _ref$1, bandSize, areaSettings, chartBaseValue) => {
	var { chartData, dataStartIndex, dataEndIndex } = _ref$1;
	if (areaSettings == null || layout !== "horizontal" && layout !== "vertical" || xAxis == null || yAxis == null || xAxisTicks == null || yAxisTicks == null || xAxisTicks.length === 0 || yAxisTicks.length === 0 || bandSize == null) return;
	var { data } = areaSettings;
	var displayedData;
	if (data && data.length > 0) displayedData = data;
	else displayedData = chartData === null || chartData === void 0 ? void 0 : chartData.slice(dataStartIndex, dataEndIndex + 1);
	if (displayedData == null) return;
	return computeArea({
		layout,
		xAxis,
		yAxis,
		xAxisTicks,
		yAxisTicks,
		dataStartIndex,
		areaSettings,
		stackedData,
		displayedData,
		chartBaseValue,
		bandSize
	});
});
var _excluded$5 = ["id"], _excluded2$3 = [
	"activeDot",
	"animationBegin",
	"animationDuration",
	"animationEasing",
	"connectNulls",
	"dot",
	"fill",
	"fillOpacity",
	"hide",
	"isAnimationActive",
	"legendType",
	"stroke",
	"xAxisId",
	"yAxisId"
];
function _extends$5() {
	return _extends$5 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$5.apply(null, arguments);
}
function _objectWithoutProperties$5(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$5(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$5(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r$1) {
			_defineProperty$1(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty$1(e, r, t) {
	return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$1(t) {
	var i = _toPrimitive$1(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$1(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function getLegendItemColor(stroke, fill) {
	return stroke && stroke !== "none" ? stroke : fill;
}
var computeLegendPayloadFromAreaData = (props) => {
	var { dataKey, name, stroke, fill, legendType, hide } = props;
	return [{
		inactive: hide,
		dataKey,
		type: legendType,
		color: getLegendItemColor(stroke, fill),
		value: getTooltipNameProp(name, dataKey),
		payload: props
	}];
};
var SetAreaTooltipEntrySettings = /* @__PURE__ */ import_react.memo((_ref$1) => {
	var { dataKey, data, stroke, strokeWidth, fill, name, hide, unit, tooltipType } = _ref$1;
	var tooltipEntrySettings = {
		dataDefinedOnItem: data,
		positions: void 0,
		settings: {
			stroke,
			strokeWidth,
			fill,
			dataKey,
			nameKey: void 0,
			name: getTooltipNameProp(name, dataKey),
			hide,
			type: tooltipType,
			color: getLegendItemColor(stroke, fill),
			unit
		}
	};
	return /* @__PURE__ */ import_react.createElement(SetTooltipEntrySettings, { tooltipEntrySettings });
});
function AreaDotsWrapper(_ref2) {
	var { clipPathId, points, props } = _ref2;
	var { needClip, dot, dataKey } = props;
	var areaProps = svgPropertiesNoEvents(props);
	return /* @__PURE__ */ import_react.createElement(Dots, {
		points,
		dot,
		className: "recharts-area-dots",
		dotClassName: "recharts-area-dot",
		dataKey,
		baseProps: areaProps,
		needClip,
		clipPathId
	});
}
function AreaLabelListProvider(_ref3) {
	var { showLabels, children, points } = _ref3;
	var labelListEntries = points.map((point$1) => {
		var _point$x, _point$y;
		var viewBox = {
			x: (_point$x = point$1.x) !== null && _point$x !== void 0 ? _point$x : 0,
			y: (_point$y = point$1.y) !== null && _point$y !== void 0 ? _point$y : 0,
			width: 0,
			lowerWidth: 0,
			upperWidth: 0,
			height: 0
		};
		return _objectSpread$1(_objectSpread$1({}, viewBox), {}, {
			value: point$1.value,
			payload: point$1.payload,
			parentViewBox: void 0,
			viewBox,
			fill: void 0
		});
	});
	return /* @__PURE__ */ import_react.createElement(CartesianLabelListContextProvider, { value: showLabels ? labelListEntries : void 0 }, children);
}
function StaticArea(_ref4) {
	var { points, baseLine, needClip, clipPathId, props } = _ref4;
	var { layout, type, stroke, connectNulls, isRange } = props;
	var { id } = props, propsWithoutId = _objectWithoutProperties$5(props, _excluded$5);
	var allOtherProps = svgPropertiesNoEvents(propsWithoutId);
	var propsWithEvents = svgPropertiesAndEvents(propsWithoutId);
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, (points === null || points === void 0 ? void 0 : points.length) > 1 && /* @__PURE__ */ import_react.createElement(Layer, { clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : void 0 }, /* @__PURE__ */ import_react.createElement(Curve, _extends$5({}, propsWithEvents, {
		id,
		points,
		connectNulls,
		type,
		baseLine,
		layout,
		stroke: "none",
		className: "recharts-area-area"
	})), stroke !== "none" && /* @__PURE__ */ import_react.createElement(Curve, _extends$5({}, allOtherProps, {
		className: "recharts-area-curve",
		layout,
		type,
		connectNulls,
		fill: "none",
		points
	})), stroke !== "none" && isRange && /* @__PURE__ */ import_react.createElement(Curve, _extends$5({}, allOtherProps, {
		className: "recharts-area-curve",
		layout,
		type,
		connectNulls,
		fill: "none",
		points: baseLine
	}))), /* @__PURE__ */ import_react.createElement(AreaDotsWrapper, {
		points,
		props: propsWithoutId,
		clipPathId
	}));
}
function VerticalRect(_ref5) {
	var { alpha: alpha$1, baseLine, points, strokeWidth } = _ref5;
	var startY = points[0].y;
	var endY = points[points.length - 1].y;
	if (!isWellBehavedNumber(startY) || !isWellBehavedNumber(endY)) return null;
	var height = alpha$1 * Math.abs(startY - endY);
	var maxX = Math.max(...points.map((entry) => entry.x || 0));
	if (isNumber(baseLine)) maxX = Math.max(baseLine, maxX);
	else if (baseLine && Array.isArray(baseLine) && baseLine.length) maxX = Math.max(...baseLine.map((entry) => entry.x || 0), maxX);
	if (isNumber(maxX)) return /* @__PURE__ */ import_react.createElement("rect", {
		x: 0,
		y: startY < endY ? startY : startY - height,
		width: maxX + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1),
		height: Math.floor(height)
	});
	return null;
}
function HorizontalRect(_ref6) {
	var { alpha: alpha$1, baseLine, points, strokeWidth } = _ref6;
	var startX = points[0].x;
	var endX = points[points.length - 1].x;
	if (!isWellBehavedNumber(startX) || !isWellBehavedNumber(endX)) return null;
	var width = alpha$1 * Math.abs(startX - endX);
	var maxY = Math.max(...points.map((entry) => entry.y || 0));
	if (isNumber(baseLine)) maxY = Math.max(baseLine, maxY);
	else if (baseLine && Array.isArray(baseLine) && baseLine.length) maxY = Math.max(...baseLine.map((entry) => entry.y || 0), maxY);
	if (isNumber(maxY)) return /* @__PURE__ */ import_react.createElement("rect", {
		x: startX < endX ? startX : startX - width,
		y: 0,
		width,
		height: Math.floor(maxY + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1))
	});
	return null;
}
function ClipRect(_ref7) {
	var { alpha: alpha$1, layout, points, baseLine, strokeWidth } = _ref7;
	if (layout === "vertical") return /* @__PURE__ */ import_react.createElement(VerticalRect, {
		alpha: alpha$1,
		points,
		baseLine,
		strokeWidth
	});
	return /* @__PURE__ */ import_react.createElement(HorizontalRect, {
		alpha: alpha$1,
		points,
		baseLine,
		strokeWidth
	});
}
function AreaWithAnimation(_ref8) {
	var { needClip, clipPathId, props, previousPointsRef, previousBaselineRef } = _ref8;
	var { points, baseLine, isAnimationActive, animationBegin, animationDuration, animationEasing, onAnimationStart, onAnimationEnd } = props;
	var animationId = useAnimationId((0, import_react.useMemo)(() => ({
		points,
		baseLine
	}), [points, baseLine]), "recharts-area-");
	var layout = useCartesianChartLayout();
	var [isAnimating, setIsAnimating] = (0, import_react.useState)(false);
	var showLabels = !isAnimating;
	var handleAnimationEnd = (0, import_react.useCallback)(() => {
		if (typeof onAnimationEnd === "function") onAnimationEnd();
		setIsAnimating(false);
	}, [onAnimationEnd]);
	var handleAnimationStart = (0, import_react.useCallback)(() => {
		if (typeof onAnimationStart === "function") onAnimationStart();
		setIsAnimating(true);
	}, [onAnimationStart]);
	if (layout == null) return null;
	var prevPoints = previousPointsRef.current;
	var prevBaseLine = previousBaselineRef.current;
	return /* @__PURE__ */ import_react.createElement(AreaLabelListProvider, {
		showLabels,
		points
	}, props.children, /* @__PURE__ */ import_react.createElement(JavascriptAnimate, {
		animationId,
		begin: animationBegin,
		duration: animationDuration,
		isActive: isAnimationActive,
		easing: animationEasing,
		onAnimationEnd: handleAnimationEnd,
		onAnimationStart: handleAnimationStart,
		key: animationId
	}, (t) => {
		if (prevPoints) {
			var prevPointsDiffFactor = prevPoints.length / points.length;
			var stepPoints = t === 1 ? points : points.map((entry, index) => {
				var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
				if (prevPoints[prevPointIndex]) {
					var prev = prevPoints[prevPointIndex];
					return _objectSpread$1(_objectSpread$1({}, entry), {}, {
						x: interpolate(prev.x, entry.x, t),
						y: interpolate(prev.y, entry.y, t)
					});
				}
				return entry;
			});
			var stepBaseLine;
			if (isNumber(baseLine)) stepBaseLine = interpolate(prevBaseLine, baseLine, t);
			else if (isNullish(baseLine) || isNan(baseLine)) stepBaseLine = interpolate(prevBaseLine, 0, t);
			else stepBaseLine = baseLine.map((entry, index) => {
				var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
				if (Array.isArray(prevBaseLine) && prevBaseLine[prevPointIndex]) {
					var prev = prevBaseLine[prevPointIndex];
					return _objectSpread$1(_objectSpread$1({}, entry), {}, {
						x: interpolate(prev.x, entry.x, t),
						y: interpolate(prev.y, entry.y, t)
					});
				}
				return entry;
			});
			if (t > 0) {
				previousPointsRef.current = stepPoints;
				previousBaselineRef.current = stepBaseLine;
			}
			return /* @__PURE__ */ import_react.createElement(StaticArea, {
				points: stepPoints,
				baseLine: stepBaseLine,
				needClip,
				clipPathId,
				props
			});
		}
		if (t > 0) {
			previousPointsRef.current = points;
			previousBaselineRef.current = baseLine;
		}
		return /* @__PURE__ */ import_react.createElement(Layer, null, isAnimationActive && /* @__PURE__ */ import_react.createElement("defs", null, /* @__PURE__ */ import_react.createElement("clipPath", { id: "animationClipPath-".concat(clipPathId) }, /* @__PURE__ */ import_react.createElement(ClipRect, {
			alpha: t,
			points,
			baseLine,
			layout,
			strokeWidth: props.strokeWidth
		}))), /* @__PURE__ */ import_react.createElement(Layer, { clipPath: "url(#animationClipPath-".concat(clipPathId, ")") }, /* @__PURE__ */ import_react.createElement(StaticArea, {
			points,
			baseLine,
			needClip,
			clipPathId,
			props
		})));
	}), /* @__PURE__ */ import_react.createElement(LabelListFromLabelProp, { label: props.label }));
}
function RenderArea(_ref9) {
	var { needClip, clipPathId, props } = _ref9;
	var previousPointsRef = (0, import_react.useRef)(null);
	var previousBaselineRef = (0, import_react.useRef)();
	return /* @__PURE__ */ import_react.createElement(AreaWithAnimation, {
		needClip,
		clipPathId,
		props,
		previousPointsRef,
		previousBaselineRef
	});
}
var AreaWithState = class extends import_react.PureComponent {
	render() {
		var { hide, dot, points, className, top, left, needClip, xAxisId, yAxisId, width, height, id, baseLine, zIndex } = this.props;
		if (hide) return null;
		var layerClass = clsx("recharts-area", className);
		var clipPathId = id;
		var { r, strokeWidth } = getRadiusAndStrokeWidthFromDot(dot);
		var clipDot = isClipDot(dot);
		var dotSize = r * 2 + strokeWidth;
		var activePointsClipPath = needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : void 0;
		return /* @__PURE__ */ import_react.createElement(ZIndexLayer, { zIndex }, /* @__PURE__ */ import_react.createElement(Layer, { className: layerClass }, needClip && /* @__PURE__ */ import_react.createElement("defs", null, /* @__PURE__ */ import_react.createElement(GraphicalItemClipPath, {
			clipPathId,
			xAxisId,
			yAxisId
		}), !clipDot && /* @__PURE__ */ import_react.createElement("clipPath", { id: "clipPath-dots-".concat(clipPathId) }, /* @__PURE__ */ import_react.createElement("rect", {
			x: left - dotSize / 2,
			y: top - dotSize / 2,
			width: width + dotSize,
			height: height + dotSize
		}))), /* @__PURE__ */ import_react.createElement(RenderArea, {
			needClip,
			clipPathId,
			props: this.props
		})), /* @__PURE__ */ import_react.createElement(ActivePoints, {
			points,
			mainColor: getLegendItemColor(this.props.stroke, this.props.fill),
			itemDataKey: this.props.dataKey,
			activeDot: this.props.activeDot,
			clipPath: activePointsClipPath
		}), this.props.isRange && Array.isArray(baseLine) && /* @__PURE__ */ import_react.createElement(ActivePoints, {
			points: baseLine,
			mainColor: getLegendItemColor(this.props.stroke, this.props.fill),
			itemDataKey: this.props.dataKey,
			activeDot: this.props.activeDot,
			clipPath: activePointsClipPath
		}));
	}
};
var defaultAreaProps = {
	activeDot: true,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	connectNulls: false,
	dot: false,
	fill: "#3182bd",
	fillOpacity: .6,
	hide: false,
	isAnimationActive: "auto",
	legendType: "line",
	stroke: "#3182bd",
	strokeWidth: 1,
	type: "linear",
	label: false,
	xAxisId: 0,
	yAxisId: 0,
	zIndex: DefaultZIndexes.area
};
function AreaImpl(props) {
	var _useAppSelector;
	var _resolveDefaultProps = resolveDefaultProps(props, defaultAreaProps), { activeDot, animationBegin, animationDuration, animationEasing, connectNulls, dot, fill, fillOpacity, hide, isAnimationActive, legendType, stroke, xAxisId, yAxisId } = _resolveDefaultProps, everythingElse = _objectWithoutProperties$5(_resolveDefaultProps, _excluded2$3);
	var layout = useChartLayout();
	var chartName = useChartName();
	var { needClip } = useNeedsClip(xAxisId, yAxisId);
	var isPanorama = useIsPanorama();
	var { points, isRange, baseLine } = (_useAppSelector = useAppSelector((state) => selectArea(state, xAxisId, yAxisId, isPanorama, props.id))) !== null && _useAppSelector !== void 0 ? _useAppSelector : {};
	var plotArea = usePlotArea();
	if (layout !== "horizontal" && layout !== "vertical" || plotArea == null) return null;
	if (chartName !== "AreaChart" && chartName !== "ComposedChart") return null;
	var { height, width, x: left, y: top } = plotArea;
	if (!points || !points.length) return null;
	return /* @__PURE__ */ import_react.createElement(AreaWithState, _extends$5({}, everythingElse, {
		activeDot,
		animationBegin,
		animationDuration,
		animationEasing,
		baseLine,
		connectNulls,
		dot,
		fill,
		fillOpacity,
		height,
		hide,
		layout,
		isAnimationActive: isAnimationActive === "auto" ? !Global.isSsr : isAnimationActive,
		isRange,
		legendType,
		needClip,
		points,
		stroke,
		width,
		left,
		top,
		xAxisId,
		yAxisId
	}));
}
var getBaseValue = (layout, chartBaseValue, itemBaseValue, xAxis, yAxis) => {
	var baseValue = itemBaseValue !== null && itemBaseValue !== void 0 ? itemBaseValue : chartBaseValue;
	if (isNumber(baseValue)) return baseValue;
	var numericAxis = layout === "horizontal" ? yAxis : xAxis;
	var domain = numericAxis.scale.domain();
	if (numericAxis.type === "number") {
		var domainMax = Math.max(domain[0], domain[1]);
		var domainMin = Math.min(domain[0], domain[1]);
		if (baseValue === "dataMin") return domainMin;
		if (baseValue === "dataMax") return domainMax;
		return domainMax < 0 ? domainMax : Math.max(Math.min(domain[0], domain[1]), 0);
	}
	if (baseValue === "dataMin") return domain[0];
	if (baseValue === "dataMax") return domain[1];
	return domain[0];
};
function computeArea(_ref0) {
	var { areaSettings: { connectNulls, baseValue: itemBaseValue, dataKey }, stackedData, layout, chartBaseValue, xAxis, yAxis, displayedData, dataStartIndex, xAxisTicks, yAxisTicks, bandSize } = _ref0;
	var hasStack = stackedData && stackedData.length;
	var baseValue = getBaseValue(layout, chartBaseValue, itemBaseValue, xAxis, yAxis);
	var isHorizontalLayout = layout === "horizontal";
	var isRange = false;
	var points = displayedData.map((entry, index) => {
		var value;
		if (hasStack) value = stackedData[dataStartIndex + index];
		else {
			value = getValueByDataKey(entry, dataKey);
			if (!Array.isArray(value)) value = [baseValue, value];
			else isRange = true;
		}
		var isBreakPoint = value[1] == null || hasStack && !connectNulls && getValueByDataKey(entry, dataKey) == null;
		if (isHorizontalLayout) return {
			x: getCateCoordinateOfLine({
				axis: xAxis,
				ticks: xAxisTicks,
				bandSize,
				entry,
				index
			}),
			y: isBreakPoint ? null : yAxis.scale(value[1]),
			value,
			payload: entry
		};
		return {
			x: isBreakPoint ? null : xAxis.scale(value[1]),
			y: getCateCoordinateOfLine({
				axis: yAxis,
				ticks: yAxisTicks,
				bandSize,
				entry,
				index
			}),
			value,
			payload: entry
		};
	});
	var baseLine;
	if (hasStack || isRange) baseLine = points.map((entry) => {
		var x = Array.isArray(entry.value) ? entry.value[0] : null;
		if (isHorizontalLayout) return {
			x: entry.x,
			y: x != null && entry.y != null ? yAxis.scale(x) : null,
			payload: entry.payload
		};
		return {
			x: x != null ? xAxis.scale(x) : null,
			y: entry.y,
			payload: entry.payload
		};
	});
	else baseLine = isHorizontalLayout ? yAxis.scale(baseValue) : xAxis.scale(baseValue);
	return {
		points,
		baseLine,
		isRange
	};
}
function AreaFn(outsideProps) {
	var props = resolveDefaultProps(outsideProps, defaultAreaProps);
	var isPanorama = useIsPanorama();
	return /* @__PURE__ */ import_react.createElement(RegisterGraphicalItemId, {
		id: props.id,
		type: "area"
	}, (id) => /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(SetLegendPayload, { legendPayload: computeLegendPayloadFromAreaData(props) }), /* @__PURE__ */ import_react.createElement(SetAreaTooltipEntrySettings, {
		dataKey: props.dataKey,
		data: props.data,
		stroke: props.stroke,
		strokeWidth: props.strokeWidth,
		fill: props.fill,
		name: props.name,
		hide: props.hide,
		unit: props.unit,
		tooltipType: props.tooltipType
	}), /* @__PURE__ */ import_react.createElement(SetCartesianGraphicalItem, {
		type: "area",
		id,
		data: props.data,
		dataKey: props.dataKey,
		xAxisId: props.xAxisId,
		yAxisId: props.yAxisId,
		zAxisId: 0,
		stackId: getNormalizedStackId(props.stackId),
		hide: props.hide,
		barSize: void 0,
		baseValue: props.baseValue,
		isPanorama,
		connectNulls: props.connectNulls
	}), /* @__PURE__ */ import_react.createElement(AreaImpl, _extends$5({}, props, { id }))));
}
var Area = /* @__PURE__ */ import_react.memo(AreaFn, propsAreEqual);
Area.displayName = "Area";
var _excluded$4 = ["domain", "range"], _excluded2$2 = ["domain", "range"];
function _objectWithoutProperties$4(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$4(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$4(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function shortArraysAreEqual(arr1, arr2) {
	if (arr1 === arr2) return true;
	if (Array.isArray(arr1) && arr1.length === 2 && Array.isArray(arr2) && arr2.length === 2) return arr1[0] === arr2[0] && arr1[1] === arr2[1];
	return false;
}
function axisPropsAreEqual(prevProps, nextProps) {
	if (prevProps === nextProps) return true;
	var { domain: prevDomain, range: prevRange } = prevProps, prevRest = _objectWithoutProperties$4(prevProps, _excluded$4);
	var { domain: nextDomain, range: nextRange } = nextProps, nextRest = _objectWithoutProperties$4(nextProps, _excluded2$2);
	if (!shortArraysAreEqual(prevDomain, nextDomain)) return false;
	if (!shortArraysAreEqual(prevRange, nextRange)) return false;
	return propsAreEqual(prevRest, nextRest);
}
var _excluded$3 = ["dangerouslySetInnerHTML", "ticks"], _excluded2$1 = ["id"];
function _extends$4() {
	return _extends$4 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$4.apply(null, arguments);
}
function _objectWithoutProperties$3(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$3(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$3(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function SetXAxisSettings(settings) {
	var dispatch = useAppDispatch();
	var prevSettingsRef = (0, import_react.useRef)(null);
	(0, import_react.useLayoutEffect)(() => {
		if (prevSettingsRef.current === null) dispatch(addXAxis(settings));
		else if (prevSettingsRef.current !== settings) dispatch(replaceXAxis({
			prev: prevSettingsRef.current,
			next: settings
		}));
		prevSettingsRef.current = settings;
	}, [settings, dispatch]);
	(0, import_react.useLayoutEffect)(() => {
		return () => {
			if (prevSettingsRef.current) {
				dispatch(removeXAxis(prevSettingsRef.current));
				prevSettingsRef.current = null;
			}
		};
	}, [dispatch]);
	return null;
}
var XAxisImpl = (props) => {
	var { xAxisId, className } = props;
	var viewBox = useAppSelector(selectAxisViewBox);
	var isPanorama = useIsPanorama();
	var axisType = "xAxis";
	var scale = useAppSelector((state) => selectAxisScale(state, axisType, xAxisId, isPanorama));
	var cartesianTickItems = useAppSelector((state) => selectTicksOfAxis(state, axisType, xAxisId, isPanorama));
	var axisSize = useAppSelector((state) => selectXAxisSize(state, xAxisId));
	var position = useAppSelector((state) => selectXAxisPosition(state, xAxisId));
	var synchronizedSettings = useAppSelector((state) => selectXAxisSettingsNoDefaults(state, xAxisId));
	if (axisSize == null || position == null || synchronizedSettings == null) return null;
	var { dangerouslySetInnerHTML, ticks } = props, allOtherProps = _objectWithoutProperties$3(props, _excluded$3);
	var { id } = synchronizedSettings, restSynchronizedSettings = _objectWithoutProperties$3(synchronizedSettings, _excluded2$1);
	return /* @__PURE__ */ import_react.createElement(CartesianAxis, _extends$4({}, allOtherProps, restSynchronizedSettings, {
		scale,
		x: position.x,
		y: position.y,
		width: axisSize.width,
		height: axisSize.height,
		className: clsx("recharts-".concat(axisType, " ").concat(axisType), className),
		viewBox,
		ticks: cartesianTickItems,
		axisType
	}));
};
var xAxisDefaultProps = {
	allowDataOverflow: implicitXAxis.allowDataOverflow,
	allowDecimals: implicitXAxis.allowDecimals,
	allowDuplicatedCategory: implicitXAxis.allowDuplicatedCategory,
	angle: implicitXAxis.angle,
	axisLine: defaultCartesianAxisProps.axisLine,
	height: implicitXAxis.height,
	hide: false,
	includeHidden: implicitXAxis.includeHidden,
	interval: implicitXAxis.interval,
	minTickGap: implicitXAxis.minTickGap,
	mirror: implicitXAxis.mirror,
	orientation: implicitXAxis.orientation,
	padding: implicitXAxis.padding,
	reversed: implicitXAxis.reversed,
	scale: implicitXAxis.scale,
	tick: implicitXAxis.tick,
	tickCount: implicitXAxis.tickCount,
	tickLine: defaultCartesianAxisProps.tickLine,
	tickSize: defaultCartesianAxisProps.tickSize,
	type: implicitXAxis.type,
	xAxisId: 0
};
var XAxisSettingsDispatcher = (outsideProps) => {
	var props = resolveDefaultProps(outsideProps, xAxisDefaultProps);
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(SetXAxisSettings, {
		allowDataOverflow: props.allowDataOverflow,
		allowDecimals: props.allowDecimals,
		allowDuplicatedCategory: props.allowDuplicatedCategory,
		angle: props.angle,
		dataKey: props.dataKey,
		domain: props.domain,
		height: props.height,
		hide: props.hide,
		id: props.xAxisId,
		includeHidden: props.includeHidden,
		interval: props.interval,
		minTickGap: props.minTickGap,
		mirror: props.mirror,
		name: props.name,
		orientation: props.orientation,
		padding: props.padding,
		reversed: props.reversed,
		scale: props.scale,
		tick: props.tick,
		tickCount: props.tickCount,
		tickFormatter: props.tickFormatter,
		ticks: props.ticks,
		type: props.type,
		unit: props.unit
	}), /* @__PURE__ */ import_react.createElement(XAxisImpl, props));
};
var XAxis = /* @__PURE__ */ import_react.memo(XAxisSettingsDispatcher, axisPropsAreEqual);
XAxis.displayName = "XAxis";
var _excluded$2 = ["dangerouslySetInnerHTML", "ticks"], _excluded2 = ["id"];
function _extends$3() {
	return _extends$3 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$3.apply(null, arguments);
}
function _objectWithoutProperties$2(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$2(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$2(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function SetYAxisSettings(settings) {
	var dispatch = useAppDispatch();
	var prevSettingsRef = (0, import_react.useRef)(null);
	(0, import_react.useLayoutEffect)(() => {
		if (prevSettingsRef.current === null) dispatch(addYAxis(settings));
		else if (prevSettingsRef.current !== settings) dispatch(replaceYAxis({
			prev: prevSettingsRef.current,
			next: settings
		}));
		prevSettingsRef.current = settings;
	}, [settings, dispatch]);
	(0, import_react.useLayoutEffect)(() => {
		return () => {
			if (prevSettingsRef.current) {
				dispatch(removeYAxis(prevSettingsRef.current));
				prevSettingsRef.current = null;
			}
		};
	}, [dispatch]);
	return null;
}
var YAxisImpl = (props) => {
	var { yAxisId, className, width, label } = props;
	var cartesianAxisRef = (0, import_react.useRef)(null);
	var labelRef = (0, import_react.useRef)(null);
	var viewBox = useAppSelector(selectAxisViewBox);
	var isPanorama = useIsPanorama();
	var dispatch = useAppDispatch();
	var axisType = "yAxis";
	var scale = useAppSelector((state) => selectAxisScale(state, axisType, yAxisId, isPanorama));
	var axisSize = useAppSelector((state) => selectYAxisSize(state, yAxisId));
	var position = useAppSelector((state) => selectYAxisPosition(state, yAxisId));
	var cartesianTickItems = useAppSelector((state) => selectTicksOfAxis(state, axisType, yAxisId, isPanorama));
	var synchronizedSettings = useAppSelector((state) => selectYAxisSettingsNoDefaults(state, yAxisId));
	(0, import_react.useLayoutEffect)(() => {
		if (width !== "auto" || !axisSize || isLabelContentAFunction(label) || /* @__PURE__ */ (0, import_react.isValidElement)(label) || synchronizedSettings == null) return;
		var axisComponent = cartesianAxisRef.current;
		if (!axisComponent) return;
		var updatedYAxisWidth = axisComponent.getCalculatedWidth();
		if (Math.round(axisSize.width) !== Math.round(updatedYAxisWidth)) dispatch(updateYAxisWidth({
			id: yAxisId,
			width: updatedYAxisWidth
		}));
	}, [
		cartesianTickItems,
		axisSize,
		dispatch,
		label,
		yAxisId,
		width,
		synchronizedSettings
	]);
	if (axisSize == null || position == null || synchronizedSettings == null) return null;
	var { dangerouslySetInnerHTML, ticks } = props, allOtherProps = _objectWithoutProperties$2(props, _excluded$2);
	var { id } = synchronizedSettings, restSynchronizedSettings = _objectWithoutProperties$2(synchronizedSettings, _excluded2);
	return /* @__PURE__ */ import_react.createElement(CartesianAxis, _extends$3({}, allOtherProps, restSynchronizedSettings, {
		ref: cartesianAxisRef,
		labelRef,
		scale,
		x: position.x,
		y: position.y,
		tickTextProps: width === "auto" ? { width: void 0 } : { width },
		width: axisSize.width,
		height: axisSize.height,
		className: clsx("recharts-".concat(axisType, " ").concat(axisType), className),
		viewBox,
		ticks: cartesianTickItems,
		axisType
	}));
};
var yAxisDefaultProps = {
	allowDataOverflow: implicitYAxis.allowDataOverflow,
	allowDecimals: implicitYAxis.allowDecimals,
	allowDuplicatedCategory: implicitYAxis.allowDuplicatedCategory,
	angle: implicitYAxis.angle,
	axisLine: defaultCartesianAxisProps.axisLine,
	hide: false,
	includeHidden: implicitYAxis.includeHidden,
	interval: implicitYAxis.interval,
	minTickGap: implicitYAxis.minTickGap,
	mirror: implicitYAxis.mirror,
	orientation: implicitYAxis.orientation,
	padding: implicitYAxis.padding,
	reversed: implicitYAxis.reversed,
	scale: implicitYAxis.scale,
	tick: implicitYAxis.tick,
	tickCount: implicitYAxis.tickCount,
	tickLine: defaultCartesianAxisProps.tickLine,
	tickSize: defaultCartesianAxisProps.tickSize,
	type: implicitYAxis.type,
	width: implicitYAxis.width,
	yAxisId: 0
};
var YAxisSettingsDispatcher = (outsideProps) => {
	var props = resolveDefaultProps(outsideProps, yAxisDefaultProps);
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(SetYAxisSettings, {
		interval: props.interval,
		id: props.yAxisId,
		scale: props.scale,
		type: props.type,
		domain: props.domain,
		allowDataOverflow: props.allowDataOverflow,
		dataKey: props.dataKey,
		allowDuplicatedCategory: props.allowDuplicatedCategory,
		allowDecimals: props.allowDecimals,
		tickCount: props.tickCount,
		padding: props.padding,
		includeHidden: props.includeHidden,
		reversed: props.reversed,
		ticks: props.ticks,
		width: props.width,
		orientation: props.orientation,
		mirror: props.mirror,
		hide: props.hide,
		unit: props.unit,
		name: props.name,
		angle: props.angle,
		minTickGap: props.minTickGap,
		tick: props.tick,
		tickFormatter: props.tickFormatter
	}), /* @__PURE__ */ import_react.createElement(YAxisImpl, props));
};
var YAxis = /* @__PURE__ */ import_react.memo(YAxisSettingsDispatcher, axisPropsAreEqual);
YAxis.displayName = "YAxis";
var pickChartPointer = (_state, chartPointer) => chartPointer;
var selectActivePropsFromChartPointer = createSelector([
	pickChartPointer,
	selectChartLayout,
	selectPolarViewBox,
	selectTooltipAxisType,
	selectTooltipAxisRangeWithReverse,
	selectTooltipAxisTicks,
	selectOrderedTooltipTicks,
	selectChartOffsetInternal
], combineActiveProps);
var getChartPointer = (event) => {
	var rect = event.currentTarget.getBoundingClientRect();
	var scaleX = rect.width / event.currentTarget.offsetWidth;
	var scaleY = rect.height / event.currentTarget.offsetHeight;
	return {
		chartX: Math.round((event.clientX - rect.left) / scaleX),
		chartY: Math.round((event.clientY - rect.top) / scaleY)
	};
};
var mouseClickAction = createAction("mouseClick");
var mouseClickMiddleware = createListenerMiddleware();
mouseClickMiddleware.startListening({
	actionCreator: mouseClickAction,
	effect: (action, listenerApi) => {
		var mousePointer = action.payload;
		var activeProps = selectActivePropsFromChartPointer(listenerApi.getState(), getChartPointer(mousePointer));
		if ((activeProps === null || activeProps === void 0 ? void 0 : activeProps.activeIndex) != null) listenerApi.dispatch(setMouseClickAxisIndex({
			activeIndex: activeProps.activeIndex,
			activeDataKey: void 0,
			activeCoordinate: activeProps.activeCoordinate
		}));
	}
});
var mouseMoveAction = createAction("mouseMove");
var mouseMoveMiddleware = createListenerMiddleware();
var rafId = null;
mouseMoveMiddleware.startListening({
	actionCreator: mouseMoveAction,
	effect: (action, listenerApi) => {
		var mousePointer = action.payload;
		if (rafId !== null) cancelAnimationFrame(rafId);
		var chartPointer = getChartPointer(mousePointer);
		rafId = requestAnimationFrame(() => {
			var state = listenerApi.getState();
			if (selectTooltipEventType(state, state.tooltip.settings.shared) === "axis") {
				var activeProps = selectActivePropsFromChartPointer(state, chartPointer);
				if ((activeProps === null || activeProps === void 0 ? void 0 : activeProps.activeIndex) != null) listenerApi.dispatch(setMouseOverAxisIndex({
					activeIndex: activeProps.activeIndex,
					activeDataKey: void 0,
					activeCoordinate: activeProps.activeCoordinate
				}));
				else listenerApi.dispatch(mouseLeaveChart());
			}
			rafId = null;
		});
	}
});
function reduxDevtoolsJsonStringifyReplacer(key, value) {
	if (value instanceof HTMLElement) return "HTMLElement <".concat(value.tagName, " class=\"").concat(value.className, "\">");
	if (value === window) return "global.window";
	if (key === "children" && typeof value === "object" && value !== null) return "<<CHILDREN>>";
	return value;
}
var initialState = {
	accessibilityLayer: true,
	barCategoryGap: "10%",
	barGap: 4,
	barSize: void 0,
	className: void 0,
	maxBarSize: void 0,
	stackOffset: "none",
	syncId: void 0,
	syncMethod: "index",
	baseValue: void 0,
	reverseStackOrder: false
};
var rootPropsSlice = createSlice({
	name: "rootProps",
	initialState,
	reducers: { updateOptions: (state, action) => {
		var _action$payload$barGa;
		state.accessibilityLayer = action.payload.accessibilityLayer;
		state.barCategoryGap = action.payload.barCategoryGap;
		state.barGap = (_action$payload$barGa = action.payload.barGap) !== null && _action$payload$barGa !== void 0 ? _action$payload$barGa : initialState.barGap;
		state.barSize = action.payload.barSize;
		state.maxBarSize = action.payload.maxBarSize;
		state.stackOffset = action.payload.stackOffset;
		state.syncId = action.payload.syncId;
		state.syncMethod = action.payload.syncMethod;
		state.className = action.payload.className;
		state.baseValue = action.payload.baseValue;
		state.reverseStackOrder = action.payload.reverseStackOrder;
	} }
});
var rootPropsReducer = rootPropsSlice.reducer;
var { updateOptions } = rootPropsSlice.actions;
var polarOptionsSlice = createSlice({
	name: "polarOptions",
	initialState: null,
	reducers: { updatePolarOptions: (_state, action) => {
		return action.payload;
	} }
});
var { updatePolarOptions } = polarOptionsSlice.actions;
var polarOptionsReducer = polarOptionsSlice.reducer;
var keyDownAction = createAction("keyDown");
var focusAction = createAction("focus");
var keyboardEventsMiddleware = createListenerMiddleware();
keyboardEventsMiddleware.startListening({
	actionCreator: keyDownAction,
	effect: (action, listenerApi) => {
		var state = listenerApi.getState();
		if (!(state.rootProps.accessibilityLayer !== false)) return;
		var { keyboardInteraction } = state.tooltip;
		var key = action.payload;
		if (key !== "ArrowRight" && key !== "ArrowLeft" && key !== "Enter") return;
		var resolvedIndex = combineActiveTooltipIndex(keyboardInteraction, selectTooltipDisplayedData(state), selectTooltipAxisDataKey(state), selectTooltipAxisDomain(state));
		var currentIndex = resolvedIndex == null ? -1 : Number(resolvedIndex);
		if (!Number.isFinite(currentIndex) || currentIndex < 0) return;
		var tooltipTicks = selectTooltipAxisTicks(state);
		if (key === "Enter") {
			var _coordinate = selectCoordinateForDefaultIndex(state, "axis", "hover", String(keyboardInteraction.index));
			listenerApi.dispatch(setKeyboardInteraction({
				active: !keyboardInteraction.active,
				activeIndex: keyboardInteraction.index,
				activeDataKey: keyboardInteraction.dataKey,
				activeCoordinate: _coordinate
			}));
			return;
		}
		var directionMultiplier = selectChartDirection(state) === "left-to-right" ? 1 : -1;
		var nextIndex = currentIndex + (key === "ArrowRight" ? 1 : -1) * directionMultiplier;
		if (tooltipTicks == null || nextIndex >= tooltipTicks.length || nextIndex < 0) return;
		var coordinate = selectCoordinateForDefaultIndex(state, "axis", "hover", String(nextIndex));
		listenerApi.dispatch(setKeyboardInteraction({
			active: true,
			activeIndex: nextIndex.toString(),
			activeDataKey: void 0,
			activeCoordinate: coordinate
		}));
	}
});
keyboardEventsMiddleware.startListening({
	actionCreator: focusAction,
	effect: (_action, listenerApi) => {
		var state = listenerApi.getState();
		if (!(state.rootProps.accessibilityLayer !== false)) return;
		var { keyboardInteraction } = state.tooltip;
		if (keyboardInteraction.active) return;
		if (keyboardInteraction.index == null) {
			var nextIndex = "0";
			var coordinate = selectCoordinateForDefaultIndex(state, "axis", "hover", String(nextIndex));
			listenerApi.dispatch(setKeyboardInteraction({
				activeDataKey: void 0,
				active: true,
				activeIndex: nextIndex,
				activeCoordinate: coordinate
			}));
		}
	}
});
var externalEventAction = createAction("externalEvent");
var externalEventsMiddleware = createListenerMiddleware();
var rafIdMap = /* @__PURE__ */ new Map();
externalEventsMiddleware.startListening({
	actionCreator: externalEventAction,
	effect: (action, listenerApi) => {
		var { handler, reactEvent } = action.payload;
		if (handler == null) return;
		reactEvent.persist();
		var eventType = reactEvent.type;
		var existingRafId = rafIdMap.get(eventType);
		if (existingRafId !== void 0) cancelAnimationFrame(existingRafId);
		var rafId$1 = requestAnimationFrame(() => {
			try {
				var state = listenerApi.getState();
				handler({
					activeCoordinate: selectActiveTooltipCoordinate(state),
					activeDataKey: selectActiveTooltipDataKey(state),
					activeIndex: selectActiveTooltipIndex(state),
					activeLabel: selectActiveLabel(state),
					activeTooltipIndex: selectActiveTooltipIndex(state),
					isTooltipActive: selectIsTooltipActive(state)
				}, reactEvent);
			} finally {
				rafIdMap.delete(eventType);
			}
		});
		rafIdMap.set(eventType, rafId$1);
	}
});
var selectTooltipCoordinate = createSelector([
	createSelector([selectTooltipState], (tooltipState) => tooltipState.tooltipItemPayloads),
	selectTooltipPayloadSearcher,
	(_state, tooltipIndex, _dataKey) => tooltipIndex,
	(_state, _tooltipIndex, dataKey) => dataKey
], (allTooltipConfigurations, tooltipPayloadSearcher, tooltipIndex, dataKey) => {
	var mostRelevantTooltipConfiguration = allTooltipConfigurations.find((tooltipConfiguration) => {
		return tooltipConfiguration.settings.dataKey === dataKey;
	});
	if (mostRelevantTooltipConfiguration == null) return;
	var { positions } = mostRelevantTooltipConfiguration;
	if (positions == null) return;
	return tooltipPayloadSearcher(positions, tooltipIndex);
});
var touchEventAction = createAction("touchMove");
var touchEventMiddleware = createListenerMiddleware();
touchEventMiddleware.startListening({
	actionCreator: touchEventAction,
	effect: (action, listenerApi) => {
		var touchEvent = action.payload;
		if (touchEvent.touches == null || touchEvent.touches.length === 0) return;
		var state = listenerApi.getState();
		var tooltipEventType = selectTooltipEventType(state, state.tooltip.settings.shared);
		if (tooltipEventType === "axis") {
			var activeProps = selectActivePropsFromChartPointer(state, getChartPointer({
				clientX: touchEvent.touches[0].clientX,
				clientY: touchEvent.touches[0].clientY,
				currentTarget: touchEvent.currentTarget
			}));
			if ((activeProps === null || activeProps === void 0 ? void 0 : activeProps.activeIndex) != null) listenerApi.dispatch(setMouseOverAxisIndex({
				activeIndex: activeProps.activeIndex,
				activeDataKey: void 0,
				activeCoordinate: activeProps.activeCoordinate
			}));
		} else if (tooltipEventType === "item") {
			var _target$getAttribute;
			var touch = touchEvent.touches[0];
			if (document.elementFromPoint == null) return;
			var target = document.elementFromPoint(touch.clientX, touch.clientY);
			if (!target || !target.getAttribute) return;
			var itemIndex = target.getAttribute(DATA_ITEM_INDEX_ATTRIBUTE_NAME);
			var dataKey = (_target$getAttribute = target.getAttribute("data-recharts-item-data-key")) !== null && _target$getAttribute !== void 0 ? _target$getAttribute : void 0;
			var coordinate = selectTooltipCoordinate(listenerApi.getState(), itemIndex, dataKey);
			listenerApi.dispatch(setActiveMouseOverItemIndex({
				activeDataKey: dataKey,
				activeIndex: itemIndex,
				activeCoordinate: coordinate
			}));
		}
	}
});
var rootReducer = combineReducers({
	brush: brushReducer,
	cartesianAxis: cartesianAxisReducer,
	chartData: chartDataReducer,
	errorBars: errorBarReducer,
	graphicalItems: graphicalItemsReducer,
	layout: chartLayoutReducer,
	legend: legendReducer,
	options: optionsReducer,
	polarAxis: polarAxisReducer,
	polarOptions: polarOptionsReducer,
	referenceElements: referenceElementsReducer,
	rootProps: rootPropsReducer,
	tooltip: tooltipReducer,
	zIndex: zIndexReducer
});
var createRechartsStore = function createRechartsStore$1(preloadedState) {
	var chartName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Chart";
	return configureStore({
		reducer: rootReducer,
		preloadedState,
		middleware: (getDefaultMiddleware) => {
			var _process$env$NODE_ENV;
			return getDefaultMiddleware({
				serializableCheck: false,
				immutableCheck: ![
					"commonjs",
					"es6",
					"production"
				].includes((_process$env$NODE_ENV = "es6") !== null && _process$env$NODE_ENV !== void 0 ? _process$env$NODE_ENV : "")
			}).concat([
				mouseClickMiddleware.middleware,
				mouseMoveMiddleware.middleware,
				keyboardEventsMiddleware.middleware,
				externalEventsMiddleware.middleware,
				touchEventMiddleware.middleware
			]);
		},
		enhancers: (getDefaultEnhancers) => {
			var enhancers = getDefaultEnhancers;
			if (typeof getDefaultEnhancers === "function") enhancers = getDefaultEnhancers();
			return enhancers.concat(autoBatchEnhancer({ type: "raf" }));
		},
		devTools: Global.devToolsEnabled && {
			serialize: { replacer: reduxDevtoolsJsonStringifyReplacer },
			name: "recharts-".concat(chartName)
		}
	});
};
function RechartsStoreProvider(_ref$1) {
	var { preloadedState, children, reduxStoreName } = _ref$1;
	var isPanorama = useIsPanorama();
	var storeRef = (0, import_react.useRef)(null);
	if (isPanorama) return children;
	if (storeRef.current == null) storeRef.current = createRechartsStore(preloadedState, reduxStoreName);
	var nonNullContext = RechartsReduxContext;
	return /* @__PURE__ */ import_react.createElement(Provider_default, {
		context: nonNullContext,
		store: storeRef.current
	}, children);
}
function ReportMainChartPropsImpl(_ref$1) {
	var { layout, margin } = _ref$1;
	var dispatch = useAppDispatch();
	var isPanorama = useIsPanorama();
	(0, import_react.useEffect)(() => {
		if (!isPanorama) {
			dispatch(setLayout(layout));
			dispatch(setMargin(margin));
		}
	}, [
		dispatch,
		isPanorama,
		layout,
		margin
	]);
	return null;
}
var ReportMainChartProps = /* @__PURE__ */ (0, import_react.memo)(ReportMainChartPropsImpl, propsAreEqual);
function ReportChartProps(props) {
	var dispatch = useAppDispatch();
	(0, import_react.useEffect)(() => {
		dispatch(updateOptions(props));
	}, [dispatch, props]);
	return null;
}
function ZIndexSvgPortal(_ref$1) {
	var { zIndex, isPanorama } = _ref$1;
	var prefix = isPanorama ? "recharts-zindex-panorama-" : "recharts-zindex-";
	var portalId = useUniqueId("".concat(prefix).concat(zIndex));
	var dispatch = useAppDispatch();
	(0, import_react.useLayoutEffect)(() => {
		dispatch(registerZIndexPortalId({
			zIndex,
			elementId: portalId,
			isPanorama
		}));
		return () => {
			dispatch(unregisterZIndexPortalId({
				zIndex,
				isPanorama
			}));
		};
	}, [
		dispatch,
		zIndex,
		portalId,
		isPanorama
	]);
	return /* @__PURE__ */ import_react.createElement("g", {
		tabIndex: -1,
		id: portalId
	});
}
function AllZIndexPortals(_ref2) {
	var { children, isPanorama } = _ref2;
	var allRegisteredZIndexes = useAppSelector(selectAllRegisteredZIndexes);
	if (!allRegisteredZIndexes || allRegisteredZIndexes.length === 0) return children;
	var allNegativeZIndexes = allRegisteredZIndexes.filter((zIndex) => zIndex < 0);
	var allPositiveZIndexes = allRegisteredZIndexes.filter((zIndex) => zIndex > 0);
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, allNegativeZIndexes.map((zIndex) => /* @__PURE__ */ import_react.createElement(ZIndexSvgPortal, {
		key: zIndex,
		zIndex,
		isPanorama
	})), children, allPositiveZIndexes.map((zIndex) => /* @__PURE__ */ import_react.createElement(ZIndexSvgPortal, {
		key: zIndex,
		zIndex,
		isPanorama
	})));
}
var _excluded$1 = ["children"];
function _objectWithoutProperties$1(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$1(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$1(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function _extends$2() {
	return _extends$2 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$2.apply(null, arguments);
}
var FULL_WIDTH_AND_HEIGHT = {
	width: "100%",
	height: "100%",
	display: "block"
};
var MainChartSurface = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	var width = useChartWidth();
	var height = useChartHeight();
	var hasAccessibilityLayer = useAccessibilityLayer();
	if (!isPositiveNumber(width) || !isPositiveNumber(height)) return null;
	var { children, otherAttributes, title, desc } = props;
	var tabIndex, role;
	if (otherAttributes != null) {
		if (typeof otherAttributes.tabIndex === "number") tabIndex = otherAttributes.tabIndex;
		else tabIndex = hasAccessibilityLayer ? 0 : void 0;
		if (typeof otherAttributes.role === "string") role = otherAttributes.role;
		else role = hasAccessibilityLayer ? "application" : void 0;
	}
	return /* @__PURE__ */ import_react.createElement(Surface, _extends$2({}, otherAttributes, {
		title,
		desc,
		role,
		tabIndex,
		width,
		height,
		style: FULL_WIDTH_AND_HEIGHT,
		ref
	}), children);
});
var BrushPanoramaSurface = (_ref$1) => {
	var { children } = _ref$1;
	var brushDimensions = useAppSelector(selectBrushDimensions);
	if (!brushDimensions) return null;
	var { width, height, y, x } = brushDimensions;
	return /* @__PURE__ */ import_react.createElement(Surface, {
		width,
		height,
		x,
		y
	}, children);
};
var RootSurface = /* @__PURE__ */ (0, import_react.forwardRef)((_ref2, ref) => {
	var { children } = _ref2, rest = _objectWithoutProperties$1(_ref2, _excluded$1);
	if (useIsPanorama()) return /* @__PURE__ */ import_react.createElement(BrushPanoramaSurface, null, /* @__PURE__ */ import_react.createElement(AllZIndexPortals, { isPanorama: true }, children));
	return /* @__PURE__ */ import_react.createElement(MainChartSurface, _extends$2({ ref }, rest), /* @__PURE__ */ import_react.createElement(AllZIndexPortals, { isPanorama: false }, children));
});
function useReportScale() {
	var dispatch = useAppDispatch();
	var [ref, setRef] = (0, import_react.useState)(null);
	var scale = useAppSelector(selectContainerScale);
	(0, import_react.useEffect)(() => {
		if (ref == null) return;
		var newScale = ref.getBoundingClientRect().width / ref.offsetWidth;
		if (isWellBehavedNumber(newScale) && newScale !== scale) dispatch(setScale(newScale));
	}, [
		ref,
		dispatch,
		scale
	]);
	return setRef;
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
			_defineProperty(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _defineProperty(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$1() {
	return _extends$1 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$1.apply(null, arguments);
}
var EventSynchronizer = () => {
	useSynchronisedEventsFromOtherCharts();
	return null;
};
function getNumberOrZero(value) {
	if (typeof value === "number") return value;
	if (typeof value === "string") {
		var parsed = parseFloat(value);
		if (!Number.isNaN(parsed)) return parsed;
	}
	return 0;
}
var ResponsiveDiv = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	var _props$style, _props$style2;
	var observerRef = (0, import_react.useRef)(null);
	var [sizes, setSizes] = (0, import_react.useState)({
		containerWidth: getNumberOrZero((_props$style = props.style) === null || _props$style === void 0 ? void 0 : _props$style.width),
		containerHeight: getNumberOrZero((_props$style2 = props.style) === null || _props$style2 === void 0 ? void 0 : _props$style2.height)
	});
	var setContainerSize = (0, import_react.useCallback)((newWidth, newHeight) => {
		setSizes((prevState) => {
			var roundedWidth = Math.round(newWidth);
			var roundedHeight = Math.round(newHeight);
			if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) return prevState;
			return {
				containerWidth: roundedWidth,
				containerHeight: roundedHeight
			};
		});
	}, []);
	var innerRef = (0, import_react.useCallback)((node) => {
		if (typeof ref === "function") ref(node);
		if (node != null && typeof ResizeObserver !== "undefined") {
			var { width: containerWidth, height: containerHeight } = node.getBoundingClientRect();
			setContainerSize(containerWidth, containerHeight);
			var callback = (entries) => {
				var { width, height } = entries[0].contentRect;
				setContainerSize(width, height);
			};
			var observer = new ResizeObserver(callback);
			observer.observe(node);
			observerRef.current = observer;
		}
	}, [ref, setContainerSize]);
	(0, import_react.useEffect)(() => {
		return () => {
			var observer = observerRef.current;
			if (observer != null) observer.disconnect();
		};
	}, [setContainerSize]);
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(ReportChartSize, {
		width: sizes.containerWidth,
		height: sizes.containerHeight
	}), /* @__PURE__ */ import_react.createElement("div", _extends$1({ ref: innerRef }, props)));
});
var ReadSizeOnceDiv = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	var { width, height } = props;
	var [sizes, setSizes] = (0, import_react.useState)({
		containerWidth: getNumberOrZero(width),
		containerHeight: getNumberOrZero(height)
	});
	var setContainerSize = (0, import_react.useCallback)((newWidth, newHeight) => {
		setSizes((prevState) => {
			var roundedWidth = Math.round(newWidth);
			var roundedHeight = Math.round(newHeight);
			if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) return prevState;
			return {
				containerWidth: roundedWidth,
				containerHeight: roundedHeight
			};
		});
	}, []);
	var innerRef = (0, import_react.useCallback)((node) => {
		if (typeof ref === "function") ref(node);
		if (node != null) {
			var { width: containerWidth, height: containerHeight } = node.getBoundingClientRect();
			setContainerSize(containerWidth, containerHeight);
		}
	}, [ref, setContainerSize]);
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(ReportChartSize, {
		width: sizes.containerWidth,
		height: sizes.containerHeight
	}), /* @__PURE__ */ import_react.createElement("div", _extends$1({ ref: innerRef }, props)));
});
var StaticDiv = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	var { width, height } = props;
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(ReportChartSize, {
		width,
		height
	}), /* @__PURE__ */ import_react.createElement("div", _extends$1({ ref }, props)));
});
var NonResponsiveDiv = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	var { width, height } = props;
	if (isPercent(width) || isPercent(height)) return /* @__PURE__ */ import_react.createElement(ReadSizeOnceDiv, _extends$1({}, props, { ref }));
	return /* @__PURE__ */ import_react.createElement(StaticDiv, _extends$1({}, props, { ref }));
});
function getWrapperDivComponent(responsive) {
	return responsive === true ? ResponsiveDiv : NonResponsiveDiv;
}
var RechartsWrapper = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	var { children, className, height: heightFromProps, onClick, onContextMenu, onDoubleClick, onMouseDown, onMouseEnter, onMouseLeave, onMouseMove, onMouseUp, onTouchEnd, onTouchMove, onTouchStart, style, width: widthFromProps, responsive, dispatchTouchEvents = true } = props;
	var containerRef = (0, import_react.useRef)(null);
	var dispatch = useAppDispatch();
	var [tooltipPortal, setTooltipPortal] = (0, import_react.useState)(null);
	var [legendPortal, setLegendPortal] = (0, import_react.useState)(null);
	var setScaleRef = useReportScale();
	var responsiveContainerCalculations = useResponsiveContainerContext();
	var width = (responsiveContainerCalculations === null || responsiveContainerCalculations === void 0 ? void 0 : responsiveContainerCalculations.width) > 0 ? responsiveContainerCalculations.width : widthFromProps;
	var height = (responsiveContainerCalculations === null || responsiveContainerCalculations === void 0 ? void 0 : responsiveContainerCalculations.height) > 0 ? responsiveContainerCalculations.height : heightFromProps;
	var innerRef = (0, import_react.useCallback)((node) => {
		setScaleRef(node);
		if (typeof ref === "function") ref(node);
		setTooltipPortal(node);
		setLegendPortal(node);
		if (node != null) containerRef.current = node;
	}, [
		setScaleRef,
		ref,
		setTooltipPortal,
		setLegendPortal
	]);
	var myOnClick = (0, import_react.useCallback)((e) => {
		dispatch(mouseClickAction(e));
		dispatch(externalEventAction({
			handler: onClick,
			reactEvent: e
		}));
	}, [dispatch, onClick]);
	var myOnMouseEnter = (0, import_react.useCallback)((e) => {
		dispatch(mouseMoveAction(e));
		dispatch(externalEventAction({
			handler: onMouseEnter,
			reactEvent: e
		}));
	}, [dispatch, onMouseEnter]);
	var myOnMouseLeave = (0, import_react.useCallback)((e) => {
		dispatch(mouseLeaveChart());
		dispatch(externalEventAction({
			handler: onMouseLeave,
			reactEvent: e
		}));
	}, [dispatch, onMouseLeave]);
	var myOnMouseMove = (0, import_react.useCallback)((e) => {
		dispatch(mouseMoveAction(e));
		dispatch(externalEventAction({
			handler: onMouseMove,
			reactEvent: e
		}));
	}, [dispatch, onMouseMove]);
	var onFocus = (0, import_react.useCallback)(() => {
		dispatch(focusAction());
	}, [dispatch]);
	var onKeyDown = (0, import_react.useCallback)((e) => {
		dispatch(keyDownAction(e.key));
	}, [dispatch]);
	var myOnContextMenu = (0, import_react.useCallback)((e) => {
		dispatch(externalEventAction({
			handler: onContextMenu,
			reactEvent: e
		}));
	}, [dispatch, onContextMenu]);
	var myOnDoubleClick = (0, import_react.useCallback)((e) => {
		dispatch(externalEventAction({
			handler: onDoubleClick,
			reactEvent: e
		}));
	}, [dispatch, onDoubleClick]);
	var myOnMouseDown = (0, import_react.useCallback)((e) => {
		dispatch(externalEventAction({
			handler: onMouseDown,
			reactEvent: e
		}));
	}, [dispatch, onMouseDown]);
	var myOnMouseUp = (0, import_react.useCallback)((e) => {
		dispatch(externalEventAction({
			handler: onMouseUp,
			reactEvent: e
		}));
	}, [dispatch, onMouseUp]);
	var myOnTouchStart = (0, import_react.useCallback)((e) => {
		dispatch(externalEventAction({
			handler: onTouchStart,
			reactEvent: e
		}));
	}, [dispatch, onTouchStart]);
	var myOnTouchMove = (0, import_react.useCallback)((e) => {
		if (dispatchTouchEvents) dispatch(touchEventAction(e));
		dispatch(externalEventAction({
			handler: onTouchMove,
			reactEvent: e
		}));
	}, [
		dispatch,
		dispatchTouchEvents,
		onTouchMove
	]);
	var myOnTouchEnd = (0, import_react.useCallback)((e) => {
		dispatch(externalEventAction({
			handler: onTouchEnd,
			reactEvent: e
		}));
	}, [dispatch, onTouchEnd]);
	var WrapperDiv = getWrapperDivComponent(responsive);
	return /* @__PURE__ */ import_react.createElement(TooltipPortalContext.Provider, { value: tooltipPortal }, /* @__PURE__ */ import_react.createElement(LegendPortalContext.Provider, { value: legendPortal }, /* @__PURE__ */ import_react.createElement(WrapperDiv, {
		width: width !== null && width !== void 0 ? width : style === null || style === void 0 ? void 0 : style.width,
		height: height !== null && height !== void 0 ? height : style === null || style === void 0 ? void 0 : style.height,
		className: clsx("recharts-wrapper", className),
		style: _objectSpread({
			position: "relative",
			cursor: "default",
			width,
			height
		}, style),
		onClick: myOnClick,
		onContextMenu: myOnContextMenu,
		onDoubleClick: myOnDoubleClick,
		onFocus,
		onKeyDown,
		onMouseDown: myOnMouseDown,
		onMouseEnter: myOnMouseEnter,
		onMouseLeave: myOnMouseLeave,
		onMouseMove: myOnMouseMove,
		onMouseUp: myOnMouseUp,
		onTouchEnd: myOnTouchEnd,
		onTouchMove: myOnTouchMove,
		onTouchStart: myOnTouchStart,
		ref: innerRef
	}, /* @__PURE__ */ import_react.createElement(EventSynchronizer, null), children)));
});
var _excluded = [
	"width",
	"height",
	"responsive",
	"children",
	"className",
	"style",
	"compact",
	"title",
	"desc"
];
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var CategoricalChart = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	var { width, height, responsive, children, className, style, compact, title, desc } = props;
	var attrs = svgPropertiesNoEvents(_objectWithoutProperties(props, _excluded));
	if (compact) return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(ReportChartSize, {
		width,
		height
	}), /* @__PURE__ */ import_react.createElement(RootSurface, {
		otherAttributes: attrs,
		title,
		desc
	}, children));
	return /* @__PURE__ */ import_react.createElement(RechartsWrapper, {
		className,
		style,
		width,
		height,
		responsive: responsive !== null && responsive !== void 0 ? responsive : false,
		onClick: props.onClick,
		onMouseLeave: props.onMouseLeave,
		onMouseEnter: props.onMouseEnter,
		onMouseMove: props.onMouseMove,
		onMouseDown: props.onMouseDown,
		onMouseUp: props.onMouseUp,
		onContextMenu: props.onContextMenu,
		onDoubleClick: props.onDoubleClick,
		onTouchStart: props.onTouchStart,
		onTouchMove: props.onTouchMove,
		onTouchEnd: props.onTouchEnd
	}, /* @__PURE__ */ import_react.createElement(RootSurface, {
		otherAttributes: attrs,
		title,
		desc,
		ref
	}, /* @__PURE__ */ import_react.createElement(ClipPathProvider, null, children)));
});
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
var defaultCartesianChartProps = {
	accessibilityLayer: true,
	barCategoryGap: "10%",
	barGap: 4,
	layout: "horizontal",
	margin: {
		top: 5,
		right: 5,
		bottom: 5,
		left: 5
	},
	responsive: false,
	reverseStackOrder: false,
	stackOffset: "none",
	syncMethod: "index"
};
var CartesianChart = /* @__PURE__ */ (0, import_react.forwardRef)(function CartesianChart$1(props, ref) {
	var _categoricalChartProp;
	var rootChartProps = resolveDefaultProps(props.categoricalChartProps, defaultCartesianChartProps);
	var { chartName, defaultTooltipEventType, validateTooltipEventTypes, tooltipPayloadSearcher, categoricalChartProps } = props;
	var options = {
		chartName,
		defaultTooltipEventType,
		validateTooltipEventTypes,
		tooltipPayloadSearcher,
		eventEmitter: void 0
	};
	return /* @__PURE__ */ import_react.createElement(RechartsStoreProvider, {
		preloadedState: { options },
		reduxStoreName: (_categoricalChartProp = categoricalChartProps.id) !== null && _categoricalChartProp !== void 0 ? _categoricalChartProp : chartName
	}, /* @__PURE__ */ import_react.createElement(ChartDataContextProvider, { chartData: categoricalChartProps.data }), /* @__PURE__ */ import_react.createElement(ReportMainChartProps, {
		layout: rootChartProps.layout,
		margin: rootChartProps.margin
	}), /* @__PURE__ */ import_react.createElement(ReportChartProps, {
		baseValue: rootChartProps.baseValue,
		accessibilityLayer: rootChartProps.accessibilityLayer,
		barCategoryGap: rootChartProps.barCategoryGap,
		maxBarSize: rootChartProps.maxBarSize,
		stackOffset: rootChartProps.stackOffset,
		barGap: rootChartProps.barGap,
		barSize: rootChartProps.barSize,
		syncId: rootChartProps.syncId,
		syncMethod: rootChartProps.syncMethod,
		className: rootChartProps.className,
		reverseStackOrder: rootChartProps.reverseStackOrder
	}), /* @__PURE__ */ import_react.createElement(CategoricalChart, _extends({}, rootChartProps, { ref })));
});
var allowedTooltipTypes = ["axis"];
var AreaChart = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	return /* @__PURE__ */ import_react.createElement(CartesianChart, {
		chartName: "AreaChart",
		defaultTooltipEventType: "axis",
		validateTooltipEventTypes: allowedTooltipTypes,
		tooltipPayloadSearcher: arrayTooltipSearcher,
		categoricalChartProps: props,
		ref
	});
});
export { CartesianGrid as a, Area as i, YAxis as n, Tooltip as o, XAxis as r, ResponsiveContainer as s, AreaChart as t };
