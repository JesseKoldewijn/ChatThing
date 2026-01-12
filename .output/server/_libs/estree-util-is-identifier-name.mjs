var nameRe = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u;
var nameReJsx = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u;
var emptyOptions = {};
function name(name$1, options) {
	return ((options || emptyOptions).jsx ? nameReJsx : nameRe).test(name$1);
}
export { name as t };
