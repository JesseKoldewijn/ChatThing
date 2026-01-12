import { s as __toESM } from "../_rolldown.mjs";
import { s as refractor } from "../_libs/refractor.mjs";
import { i as require_objectWithoutProperties, n as require_defineProperty, r as require_toConsumableArray, t as require_extends } from "../_libs/@babel/runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom.mjs";
var import_objectWithoutProperties = /* @__PURE__ */ __toESM(require_objectWithoutProperties());
var import_toConsumableArray = /* @__PURE__ */ __toESM(require_toConsumableArray());
var import_defineProperty = /* @__PURE__ */ __toESM(require_defineProperty());
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_extends = /* @__PURE__ */ __toESM(require_extends());
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
			(0, import_defineProperty.default)(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function powerSetPermutations(arr) {
	var arrLength = arr.length;
	if (arrLength === 0 || arrLength === 1) return arr;
	if (arrLength === 2) return [
		arr[0],
		arr[1],
		"".concat(arr[0], ".").concat(arr[1]),
		"".concat(arr[1], ".").concat(arr[0])
	];
	if (arrLength === 3) return [
		arr[0],
		arr[1],
		arr[2],
		"".concat(arr[0], ".").concat(arr[1]),
		"".concat(arr[0], ".").concat(arr[2]),
		"".concat(arr[1], ".").concat(arr[0]),
		"".concat(arr[1], ".").concat(arr[2]),
		"".concat(arr[2], ".").concat(arr[0]),
		"".concat(arr[2], ".").concat(arr[1]),
		"".concat(arr[0], ".").concat(arr[1], ".").concat(arr[2]),
		"".concat(arr[0], ".").concat(arr[2], ".").concat(arr[1]),
		"".concat(arr[1], ".").concat(arr[0], ".").concat(arr[2]),
		"".concat(arr[1], ".").concat(arr[2], ".").concat(arr[0]),
		"".concat(arr[2], ".").concat(arr[0], ".").concat(arr[1]),
		"".concat(arr[2], ".").concat(arr[1], ".").concat(arr[0])
	];
	if (arrLength >= 4) return [
		arr[0],
		arr[1],
		arr[2],
		arr[3],
		"".concat(arr[0], ".").concat(arr[1]),
		"".concat(arr[0], ".").concat(arr[2]),
		"".concat(arr[0], ".").concat(arr[3]),
		"".concat(arr[1], ".").concat(arr[0]),
		"".concat(arr[1], ".").concat(arr[2]),
		"".concat(arr[1], ".").concat(arr[3]),
		"".concat(arr[2], ".").concat(arr[0]),
		"".concat(arr[2], ".").concat(arr[1]),
		"".concat(arr[2], ".").concat(arr[3]),
		"".concat(arr[3], ".").concat(arr[0]),
		"".concat(arr[3], ".").concat(arr[1]),
		"".concat(arr[3], ".").concat(arr[2]),
		"".concat(arr[0], ".").concat(arr[1], ".").concat(arr[2]),
		"".concat(arr[0], ".").concat(arr[1], ".").concat(arr[3]),
		"".concat(arr[0], ".").concat(arr[2], ".").concat(arr[1]),
		"".concat(arr[0], ".").concat(arr[2], ".").concat(arr[3]),
		"".concat(arr[0], ".").concat(arr[3], ".").concat(arr[1]),
		"".concat(arr[0], ".").concat(arr[3], ".").concat(arr[2]),
		"".concat(arr[1], ".").concat(arr[0], ".").concat(arr[2]),
		"".concat(arr[1], ".").concat(arr[0], ".").concat(arr[3]),
		"".concat(arr[1], ".").concat(arr[2], ".").concat(arr[0]),
		"".concat(arr[1], ".").concat(arr[2], ".").concat(arr[3]),
		"".concat(arr[1], ".").concat(arr[3], ".").concat(arr[0]),
		"".concat(arr[1], ".").concat(arr[3], ".").concat(arr[2]),
		"".concat(arr[2], ".").concat(arr[0], ".").concat(arr[1]),
		"".concat(arr[2], ".").concat(arr[0], ".").concat(arr[3]),
		"".concat(arr[2], ".").concat(arr[1], ".").concat(arr[0]),
		"".concat(arr[2], ".").concat(arr[1], ".").concat(arr[3]),
		"".concat(arr[2], ".").concat(arr[3], ".").concat(arr[0]),
		"".concat(arr[2], ".").concat(arr[3], ".").concat(arr[1]),
		"".concat(arr[3], ".").concat(arr[0], ".").concat(arr[1]),
		"".concat(arr[3], ".").concat(arr[0], ".").concat(arr[2]),
		"".concat(arr[3], ".").concat(arr[1], ".").concat(arr[0]),
		"".concat(arr[3], ".").concat(arr[1], ".").concat(arr[2]),
		"".concat(arr[3], ".").concat(arr[2], ".").concat(arr[0]),
		"".concat(arr[3], ".").concat(arr[2], ".").concat(arr[1]),
		"".concat(arr[0], ".").concat(arr[1], ".").concat(arr[2], ".").concat(arr[3]),
		"".concat(arr[0], ".").concat(arr[1], ".").concat(arr[3], ".").concat(arr[2]),
		"".concat(arr[0], ".").concat(arr[2], ".").concat(arr[1], ".").concat(arr[3]),
		"".concat(arr[0], ".").concat(arr[2], ".").concat(arr[3], ".").concat(arr[1]),
		"".concat(arr[0], ".").concat(arr[3], ".").concat(arr[1], ".").concat(arr[2]),
		"".concat(arr[0], ".").concat(arr[3], ".").concat(arr[2], ".").concat(arr[1]),
		"".concat(arr[1], ".").concat(arr[0], ".").concat(arr[2], ".").concat(arr[3]),
		"".concat(arr[1], ".").concat(arr[0], ".").concat(arr[3], ".").concat(arr[2]),
		"".concat(arr[1], ".").concat(arr[2], ".").concat(arr[0], ".").concat(arr[3]),
		"".concat(arr[1], ".").concat(arr[2], ".").concat(arr[3], ".").concat(arr[0]),
		"".concat(arr[1], ".").concat(arr[3], ".").concat(arr[0], ".").concat(arr[2]),
		"".concat(arr[1], ".").concat(arr[3], ".").concat(arr[2], ".").concat(arr[0]),
		"".concat(arr[2], ".").concat(arr[0], ".").concat(arr[1], ".").concat(arr[3]),
		"".concat(arr[2], ".").concat(arr[0], ".").concat(arr[3], ".").concat(arr[1]),
		"".concat(arr[2], ".").concat(arr[1], ".").concat(arr[0], ".").concat(arr[3]),
		"".concat(arr[2], ".").concat(arr[1], ".").concat(arr[3], ".").concat(arr[0]),
		"".concat(arr[2], ".").concat(arr[3], ".").concat(arr[0], ".").concat(arr[1]),
		"".concat(arr[2], ".").concat(arr[3], ".").concat(arr[1], ".").concat(arr[0]),
		"".concat(arr[3], ".").concat(arr[0], ".").concat(arr[1], ".").concat(arr[2]),
		"".concat(arr[3], ".").concat(arr[0], ".").concat(arr[2], ".").concat(arr[1]),
		"".concat(arr[3], ".").concat(arr[1], ".").concat(arr[0], ".").concat(arr[2]),
		"".concat(arr[3], ".").concat(arr[1], ".").concat(arr[2], ".").concat(arr[0]),
		"".concat(arr[3], ".").concat(arr[2], ".").concat(arr[0], ".").concat(arr[1]),
		"".concat(arr[3], ".").concat(arr[2], ".").concat(arr[1], ".").concat(arr[0])
	];
}
var classNameCombinations = {};
function getClassNameCombinations(classNames) {
	if (classNames.length === 0 || classNames.length === 1) return classNames;
	var key = classNames.join(".");
	if (!classNameCombinations[key]) classNameCombinations[key] = powerSetPermutations(classNames);
	return classNameCombinations[key];
}
function createStyleObject(classNames) {
	var elementStyle = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	var stylesheet = arguments.length > 2 ? arguments[2] : void 0;
	return getClassNameCombinations(classNames.filter(function(className) {
		return className !== "token";
	})).reduce(function(styleObject, className) {
		return _objectSpread$1(_objectSpread$1({}, styleObject), stylesheet[className]);
	}, elementStyle);
}
function createClassNameString(classNames) {
	return classNames.join(" ");
}
function createChildren(stylesheet, useInlineStyles) {
	var childrenCount = 0;
	return function(children) {
		childrenCount += 1;
		return children.map(function(child, i) {
			return createElement$1({
				node: child,
				stylesheet,
				useInlineStyles,
				key: "code-segment-".concat(childrenCount, "-").concat(i)
			});
		});
	};
}
function createElement$1(_ref) {
	var node = _ref.node, stylesheet = _ref.stylesheet, _ref$style = _ref.style, style = _ref$style === void 0 ? {} : _ref$style, useInlineStyles = _ref.useInlineStyles, key = _ref.key;
	var properties = node.properties, type = node.type, TagName = node.tagName, value = node.value;
	if (type === "text") return value;
	else if (TagName) {
		var childrenCreator = createChildren(stylesheet, useInlineStyles);
		var props;
		if (!useInlineStyles) props = _objectSpread$1(_objectSpread$1({}, properties), {}, { className: createClassNameString(properties.className) });
		else {
			var allStylesheetSelectors = Object.keys(stylesheet).reduce(function(classes, selector) {
				selector.split(".").forEach(function(className$1) {
					if (!classes.includes(className$1)) classes.push(className$1);
				});
				return classes;
			}, []);
			var startingClassName = properties.className && properties.className.includes("token") ? ["token"] : [];
			var className = properties.className && startingClassName.concat(properties.className.filter(function(className$1) {
				return !allStylesheetSelectors.includes(className$1);
			}));
			props = _objectSpread$1(_objectSpread$1({}, properties), {}, {
				className: createClassNameString(className) || void 0,
				style: createStyleObject(properties.className, Object.assign({}, properties.style, style), stylesheet)
			});
		}
		var children = childrenCreator(node.children);
		return /* @__PURE__ */ import_react.createElement(TagName, (0, import_extends.default)({ key }, props), children);
	}
}
var checkForListedLanguage_default = (function(astGenerator, language) {
	return astGenerator.listLanguages().indexOf(language) !== -1;
});
var _excluded = [
	"language",
	"children",
	"style",
	"customStyle",
	"codeTagProps",
	"useInlineStyles",
	"showLineNumbers",
	"showInlineLineNumbers",
	"startingLineNumber",
	"lineNumberContainerStyle",
	"lineNumberStyle",
	"wrapLines",
	"wrapLongLines",
	"lineProps",
	"renderer",
	"PreTag",
	"CodeTag",
	"code",
	"astGenerator"
];
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
			(0, import_defineProperty.default)(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
var newLineRegex = /\n/g;
function getNewLines(str) {
	return str.match(newLineRegex);
}
function getAllLineNumbers(_ref) {
	var lines = _ref.lines, startingLineNumber = _ref.startingLineNumber, style = _ref.style;
	return lines.map(function(_, i) {
		var number = i + startingLineNumber;
		return /* @__PURE__ */ import_react.createElement("span", {
			key: "line-".concat(i),
			className: "react-syntax-highlighter-line-number",
			style: typeof style === "function" ? style(number) : style
		}, "".concat(number, "\n"));
	});
}
function AllLineNumbers(_ref2) {
	var codeString = _ref2.codeString, codeStyle = _ref2.codeStyle, _ref2$containerStyle = _ref2.containerStyle, containerStyle = _ref2$containerStyle === void 0 ? {
		"float": "left",
		paddingRight: "10px"
	} : _ref2$containerStyle, _ref2$numberStyle = _ref2.numberStyle, numberStyle = _ref2$numberStyle === void 0 ? {} : _ref2$numberStyle, startingLineNumber = _ref2.startingLineNumber;
	return /* @__PURE__ */ import_react.createElement("code", { style: Object.assign({}, codeStyle, containerStyle) }, getAllLineNumbers({
		lines: codeString.replace(/\n$/, "").split("\n"),
		style: numberStyle,
		startingLineNumber
	}));
}
function getEmWidthOfNumber(num) {
	return "".concat(num.toString().length, ".25em");
}
function getInlineLineNumber(lineNumber, inlineLineNumberStyle) {
	return {
		type: "element",
		tagName: "span",
		properties: {
			key: "line-number--".concat(lineNumber),
			className: [
				"comment",
				"linenumber",
				"react-syntax-highlighter-line-number"
			],
			style: inlineLineNumberStyle
		},
		children: [{
			type: "text",
			value: lineNumber
		}]
	};
}
function assembleLineNumberStyles(lineNumberStyle, lineNumber, largestLineNumber) {
	var defaultLineNumberStyle = {
		display: "inline-block",
		minWidth: getEmWidthOfNumber(largestLineNumber),
		paddingRight: "1em",
		textAlign: "right",
		userSelect: "none"
	};
	var customLineNumberStyle = typeof lineNumberStyle === "function" ? lineNumberStyle(lineNumber) : lineNumberStyle;
	return _objectSpread(_objectSpread({}, defaultLineNumberStyle), customLineNumberStyle);
}
function createLineElement(_ref3) {
	var children = _ref3.children, lineNumber = _ref3.lineNumber, lineNumberStyle = _ref3.lineNumberStyle, largestLineNumber = _ref3.largestLineNumber, showInlineLineNumbers = _ref3.showInlineLineNumbers, _ref3$lineProps = _ref3.lineProps, lineProps = _ref3$lineProps === void 0 ? {} : _ref3$lineProps, _ref3$className = _ref3.className, className = _ref3$className === void 0 ? [] : _ref3$className, showLineNumbers = _ref3.showLineNumbers, wrapLongLines = _ref3.wrapLongLines, _ref3$wrapLines = _ref3.wrapLines;
	var properties = (_ref3$wrapLines === void 0 ? false : _ref3$wrapLines) ? _objectSpread({}, typeof lineProps === "function" ? lineProps(lineNumber) : lineProps) : {};
	properties["className"] = properties["className"] ? [].concat((0, import_toConsumableArray.default)(properties["className"].trim().split(/\s+/)), (0, import_toConsumableArray.default)(className)) : className;
	if (lineNumber && showInlineLineNumbers) {
		var inlineLineNumberStyle = assembleLineNumberStyles(lineNumberStyle, lineNumber, largestLineNumber);
		children.unshift(getInlineLineNumber(lineNumber, inlineLineNumberStyle));
	}
	if (wrapLongLines & showLineNumbers) properties.style = _objectSpread({ display: "flex" }, properties.style);
	return {
		type: "element",
		tagName: "span",
		properties,
		children
	};
}
function flattenCodeTree(tree) {
	var className = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
	var newTree = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
	if (tree.length === void 0) tree = [tree];
	for (var i = 0; i < tree.length; i++) {
		var node = tree[i];
		if (node.type === "text") newTree.push(createLineElement({
			children: [node],
			className: (0, import_toConsumableArray.default)(new Set(className))
		}));
		else if (node.children) {
			var _node$properties;
			var classNames = className.concat(((_node$properties = node.properties) === null || _node$properties === void 0 ? void 0 : _node$properties.className) || []);
			flattenCodeTree(node.children, classNames).forEach(function(i$1) {
				return newTree.push(i$1);
			});
		}
	}
	return newTree;
}
function processLines(codeTree, wrapLines, lineProps, showLineNumbers, showInlineLineNumbers, startingLineNumber, largestLineNumber, lineNumberStyle, wrapLongLines) {
	var _ref4;
	var tree = flattenCodeTree(codeTree.value);
	var newTree = [];
	var lastLineBreakIndex = -1;
	var index = 0;
	function createWrappedLine(children$1, lineNumber) {
		return createLineElement({
			children: children$1,
			lineNumber,
			lineNumberStyle,
			largestLineNumber,
			showInlineLineNumbers,
			lineProps,
			className: arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [],
			showLineNumbers,
			wrapLongLines,
			wrapLines
		});
	}
	function createUnwrappedLine(children$1, lineNumber) {
		if (showLineNumbers && lineNumber && showInlineLineNumbers) {
			var inlineLineNumberStyle = assembleLineNumberStyles(lineNumberStyle, lineNumber, largestLineNumber);
			children$1.unshift(getInlineLineNumber(lineNumber, inlineLineNumberStyle));
		}
		return children$1;
	}
	function createLine(children$1, lineNumber) {
		var className = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
		return wrapLines || className.length > 0 ? createWrappedLine(children$1, lineNumber, className) : createUnwrappedLine(children$1, lineNumber);
	}
	var _loop = function _loop$1() {
		var node = tree[index];
		var value = node.children[0].value;
		if (getNewLines(value)) {
			var splitValue = value.split("\n");
			splitValue.forEach(function(text, i) {
				var lineNumber = showLineNumbers && newTree.length + startingLineNumber;
				var newChild = {
					type: "text",
					value: "".concat(text, "\n")
				};
				if (i === 0) {
					var _line = createLine(tree.slice(lastLineBreakIndex + 1, index).concat(createLineElement({
						children: [newChild],
						className: node.properties.className
					})), lineNumber);
					newTree.push(_line);
				} else if (i === splitValue.length - 1) {
					var stringChild = tree[index + 1] && tree[index + 1].children && tree[index + 1].children[0];
					var lastLineInPreviousSpan = {
						type: "text",
						value: "".concat(text)
					};
					if (stringChild) {
						var newElem = createLineElement({
							children: [lastLineInPreviousSpan],
							className: node.properties.className
						});
						tree.splice(index + 1, 0, newElem);
					} else {
						var _line2 = createLine([lastLineInPreviousSpan], lineNumber, node.properties.className);
						newTree.push(_line2);
					}
				} else {
					var _line3 = createLine([newChild], lineNumber, node.properties.className);
					newTree.push(_line3);
				}
			});
			lastLineBreakIndex = index;
		}
		index++;
	};
	while (index < tree.length) _loop();
	if (lastLineBreakIndex !== tree.length - 1) {
		var children = tree.slice(lastLineBreakIndex + 1, tree.length);
		if (children && children.length) {
			var line = createLine(children, showLineNumbers && newTree.length + startingLineNumber);
			newTree.push(line);
		}
	}
	return wrapLines ? newTree : (_ref4 = []).concat.apply(_ref4, newTree);
}
function defaultRenderer(_ref5) {
	var rows = _ref5.rows, stylesheet = _ref5.stylesheet, useInlineStyles = _ref5.useInlineStyles;
	return rows.map(function(node, i) {
		return createElement$1({
			node,
			stylesheet,
			useInlineStyles,
			key: "code-segment-".concat(i)
		});
	});
}
function isHighlightJs(astGenerator) {
	return astGenerator && typeof astGenerator.highlightAuto !== "undefined";
}
function getCodeTree(_ref6) {
	var astGenerator = _ref6.astGenerator, language = _ref6.language, code = _ref6.code, defaultCodeValue = _ref6.defaultCodeValue;
	if (isHighlightJs(astGenerator)) {
		var hasLanguage = checkForListedLanguage_default(astGenerator, language);
		if (language === "text") return {
			value: defaultCodeValue,
			language: "text"
		};
		else if (hasLanguage) return astGenerator.highlight(language, code);
		else return astGenerator.highlightAuto(code);
	}
	try {
		return language && language !== "text" ? { value: astGenerator.highlight(code, language) } : { value: defaultCodeValue };
	} catch (e) {
		return { value: defaultCodeValue };
	}
}
function highlight_default(defaultAstGenerator, defaultStyle) {
	return function SyntaxHighlighter$1(_ref7) {
		var _code$match$length, _code$match;
		var language = _ref7.language, children = _ref7.children, _ref7$style = _ref7.style, style = _ref7$style === void 0 ? defaultStyle : _ref7$style, _ref7$customStyle = _ref7.customStyle, customStyle = _ref7$customStyle === void 0 ? {} : _ref7$customStyle, _ref7$codeTagProps = _ref7.codeTagProps, codeTagProps = _ref7$codeTagProps === void 0 ? {
			className: language ? "language-".concat(language) : void 0,
			style: _objectSpread(_objectSpread({}, style["code[class*=\"language-\"]"]), style["code[class*=\"language-".concat(language, "\"]")])
		} : _ref7$codeTagProps, _ref7$useInlineStyles = _ref7.useInlineStyles, useInlineStyles = _ref7$useInlineStyles === void 0 ? true : _ref7$useInlineStyles, _ref7$showLineNumbers = _ref7.showLineNumbers, showLineNumbers = _ref7$showLineNumbers === void 0 ? false : _ref7$showLineNumbers, _ref7$showInlineLineN = _ref7.showInlineLineNumbers, showInlineLineNumbers = _ref7$showInlineLineN === void 0 ? true : _ref7$showInlineLineN, _ref7$startingLineNum = _ref7.startingLineNumber, startingLineNumber = _ref7$startingLineNum === void 0 ? 1 : _ref7$startingLineNum, lineNumberContainerStyle = _ref7.lineNumberContainerStyle, _ref7$lineNumberStyle = _ref7.lineNumberStyle, lineNumberStyle = _ref7$lineNumberStyle === void 0 ? {} : _ref7$lineNumberStyle, wrapLines = _ref7.wrapLines, _ref7$wrapLongLines = _ref7.wrapLongLines, wrapLongLines = _ref7$wrapLongLines === void 0 ? false : _ref7$wrapLongLines, _ref7$lineProps = _ref7.lineProps, lineProps = _ref7$lineProps === void 0 ? {} : _ref7$lineProps, renderer = _ref7.renderer, _ref7$PreTag = _ref7.PreTag, PreTag = _ref7$PreTag === void 0 ? "pre" : _ref7$PreTag, _ref7$CodeTag = _ref7.CodeTag, CodeTag = _ref7$CodeTag === void 0 ? "code" : _ref7$CodeTag, _ref7$code = _ref7.code, code = _ref7$code === void 0 ? (Array.isArray(children) ? children[0] : children) || "" : _ref7$code, astGenerator = _ref7.astGenerator, rest = (0, import_objectWithoutProperties.default)(_ref7, _excluded);
		astGenerator = astGenerator || defaultAstGenerator;
		var allLineNumbers = showLineNumbers ? /* @__PURE__ */ import_react.createElement(AllLineNumbers, {
			containerStyle: lineNumberContainerStyle,
			codeStyle: codeTagProps.style || {},
			numberStyle: lineNumberStyle,
			startingLineNumber,
			codeString: code
		}) : null;
		var defaultPreStyle = style.hljs || style["pre[class*=\"language-\"]"] || { backgroundColor: "#fff" };
		var generatorClassName = isHighlightJs(astGenerator) ? "hljs" : "prismjs";
		var preProps = useInlineStyles ? Object.assign({}, rest, { style: Object.assign({}, defaultPreStyle, customStyle) }) : Object.assign({}, rest, {
			className: rest.className ? "".concat(generatorClassName, " ").concat(rest.className) : generatorClassName,
			style: Object.assign({}, customStyle)
		});
		if (wrapLongLines) codeTagProps.style = _objectSpread({ whiteSpace: "pre-wrap" }, codeTagProps.style);
		else codeTagProps.style = _objectSpread({ whiteSpace: "pre" }, codeTagProps.style);
		if (!astGenerator) return /* @__PURE__ */ import_react.createElement(PreTag, preProps, allLineNumbers, /* @__PURE__ */ import_react.createElement(CodeTag, codeTagProps, code));
		if (wrapLines === void 0 && renderer || wrapLongLines) wrapLines = true;
		renderer = renderer || defaultRenderer;
		var defaultCodeValue = [{
			type: "text",
			value: code
		}];
		var codeTree = getCodeTree({
			astGenerator,
			language,
			code,
			defaultCodeValue
		});
		if (codeTree.language === null) codeTree.value = defaultCodeValue;
		var largestLineNumber = startingLineNumber + ((_code$match$length = (_code$match = code.match(/\n/g)) === null || _code$match === void 0 ? void 0 : _code$match.length) !== null && _code$match$length !== void 0 ? _code$match$length : 0);
		var rows = processLines(codeTree, wrapLines, lineProps, showLineNumbers, showInlineLineNumbers, startingLineNumber, largestLineNumber, lineNumberStyle, wrapLongLines);
		return /* @__PURE__ */ import_react.createElement(PreTag, preProps, /* @__PURE__ */ import_react.createElement(CodeTag, codeTagProps, !showInlineLineNumbers && allLineNumbers, renderer({
			rows,
			stylesheet: style,
			useInlineStyles
		})));
	};
}
var SyntaxHighlighter = highlight_default(refractor, {});
SyntaxHighlighter.registerLanguage = function(_, language) {
	return refractor.register(language);
};
SyntaxHighlighter.alias = function(name, aliases) {
	return refractor.alias(name, aliases);
};
var prism_light_default = SyntaxHighlighter;
export { prism_light_default as default };
