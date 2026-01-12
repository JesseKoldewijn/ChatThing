import { t as characterEntities } from "./character-entities.mjs";
var own = {}.hasOwnProperty;
function decodeNamedCharacterReference(value) {
	return own.call(characterEntities, value) ? characterEntities[value] : false;
}
export { decodeNamedCharacterReference as t };
