interface OnKbdFieldProps {
  preventDefault?: boolean,
  stopPropagation?: boolean,
}
export function onKbdField<K extends keyof KeyboardEvent>(
  cb: (e: KeyboardEvent) => void,
  fieldName: K,
  fieldValue: KeyboardEvent[K] | KeyboardEvent[K][],
  {
    preventDefault = false,
    stopPropagation = false,
  }: OnKbdFieldProps= {}
) {
  if (typeof cb !== "function") {
    throw new TypeError("Expecting to get a callback to decorate as the first arg!");
  }
  if (typeof fieldName !== "string" || !fieldName) {
    throw new TypeError("Expecting to get the name of the event field to check!");
  }
  return function(e) {
    if (!e || typeof e[fieldName] === "undefined") return;
    if (Array.isArray(fieldValue)) {
      if (fieldValue.some(i => i !== e[fieldName])) return;
    } else {
      if (fieldValue !== e[fieldName]) return;
    }
    if (preventDefault && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    if (stopPropagation && typeof e.stopPropagation === "function") {
      e.stopPropagation();
    }
    return cb.call(this, arguments);
  }
}

export const onKbdKey = (cb: (e: KeyboardEvent) => void, keys: string | string[] ) => onKbdField(cb, "key", keys);
export const onKbdKeycode = (cb: (e: KeyboardEvent) => void, keycodes: number | number[]) => onKbdField(cb, "keyCode", keycodes);
export const onKbdCode = (cb: (e: KeyboardEvent) => void, codes: string | string[]) => onKbdField(cb, "code", codes);