import { t as isAlphabetical } from "./is-alphabetical.mjs";
function isDecimal(character) {
	const code = typeof character === "string" ? character.charCodeAt(0) : character;
	return code >= 48 && code <= 57;
}
function isAlphanumerical(character) {
	return isAlphabetical(character) || isDecimal(character);
}
export { isDecimal as n, isAlphanumerical as t };
