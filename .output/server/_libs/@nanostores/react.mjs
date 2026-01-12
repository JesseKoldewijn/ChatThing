import { s as __toESM } from "../../_rolldown.mjs";
import { u as require_react } from "../@floating-ui/react-dom.mjs";
function listenKeys($store, keys, listener) {
	let keysSet = new Set(keys).add(void 0);
	return $store.listen((value, oldValue, changed) => {
		if (keysSet.has(changed)) listener(value, oldValue, changed);
	});
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var emit = (snapshotRef, onChange) => (value) => {
	if (snapshotRef.current === value) return;
	snapshotRef.current = value;
	onChange();
};
function useStore(store, { keys, deps = [store, keys] } = {}) {
	let snapshotRef = (0, import_react.useRef)();
	snapshotRef.current = store.get();
	let subscribe = (0, import_react.useCallback)((onChange) => {
		emit(snapshotRef, onChange)(store.value);
		return keys?.length > 0 ? listenKeys(store, keys, emit(snapshotRef, onChange)) : store.listen(emit(snapshotRef, onChange));
	}, deps);
	let get = () => snapshotRef.current;
	return (0, import_react.useSyncExternalStore)(subscribe, get, get);
}
export { useStore as t };
