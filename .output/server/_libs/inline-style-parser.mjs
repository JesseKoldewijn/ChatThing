import { n as __esmMin } from "../_rolldown.mjs";
function index(style, options) {
	if (typeof style !== "string") throw new TypeError("First argument must be a string");
	if (!style) return [];
	options = options || {};
	var lineno = 1;
	var column = 1;
	function updatePosition(str) {
		var lines = str.match(NEWLINE_REGEX);
		if (lines) lineno += lines.length;
		var i = str.lastIndexOf(NEWLINE);
		column = ~i ? str.length - i : column + str.length;
	}
	function position() {
		var start = {
			line: lineno,
			column
		};
		return function(node) {
			node.position = new Position(start);
			whitespace();
			return node;
		};
	}
	function Position(start) {
		this.start = start;
		this.end = {
			line: lineno,
			column
		};
		this.source = options.source;
	}
	Position.prototype.content = style;
	function error(msg) {
		var err = /* @__PURE__ */ new Error(options.source + ":" + lineno + ":" + column + ": " + msg);
		err.reason = msg;
		err.filename = options.source;
		err.line = lineno;
		err.column = column;
		err.source = style;
		if (options.silent);
		else throw err;
	}
	function match(re) {
		var m = re.exec(style);
		if (!m) return;
		var str = m[0];
		updatePosition(str);
		style = style.slice(str.length);
		return m;
	}
	function whitespace() {
		match(WHITESPACE_REGEX);
	}
	function comments(rules) {
		var c;
		rules = rules || [];
		while (c = comment()) if (c !== false) rules.push(c);
		return rules;
	}
	function comment() {
		var pos = position();
		if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1)) return;
		var i = 2;
		while (EMPTY_STRING != style.charAt(i) && (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))) ++i;
		i += 2;
		if (EMPTY_STRING === style.charAt(i - 1)) return error("End of comment missing");
		var str = style.slice(2, i - 2);
		column += 2;
		updatePosition(str);
		style = style.slice(i);
		column += 2;
		return pos({
			type: TYPE_COMMENT,
			comment: str
		});
	}
	function declaration() {
		var pos = position();
		var prop = match(PROPERTY_REGEX);
		if (!prop) return;
		comment();
		if (!match(COLON_REGEX)) return error("property missing ':'");
		var val = match(VALUE_REGEX);
		var ret = pos({
			type: TYPE_DECLARATION,
			property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
			value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
		});
		match(SEMICOLON_REGEX);
		return ret;
	}
	function declarations() {
		var decls = [];
		comments(decls);
		var decl;
		while (decl = declaration()) if (decl !== false) {
			decls.push(decl);
			comments(decls);
		}
		return decls;
	}
	whitespace();
	return declarations();
}
function trim(str) {
	return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
}
var COMMENT_REGEX, NEWLINE_REGEX, WHITESPACE_REGEX, PROPERTY_REGEX, COLON_REGEX, VALUE_REGEX, SEMICOLON_REGEX, TRIM_REGEX, NEWLINE, FORWARD_SLASH, ASTERISK, EMPTY_STRING, TYPE_COMMENT, TYPE_DECLARATION;
var init_esm = __esmMin((() => {
	COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
	NEWLINE_REGEX = /\n/g;
	WHITESPACE_REGEX = /^\s*/;
	PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
	COLON_REGEX = /^:\s*/;
	VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
	SEMICOLON_REGEX = /^[;\s]*/;
	TRIM_REGEX = /^\s+|\s+$/g;
	NEWLINE = "\n";
	FORWARD_SLASH = "/";
	ASTERISK = "*";
	EMPTY_STRING = "";
	TYPE_COMMENT = "comment";
	TYPE_DECLARATION = "declaration";
}));
export { init_esm as n, index as t };
