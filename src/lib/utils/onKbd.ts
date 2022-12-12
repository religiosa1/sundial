/* set of helpers, for handling keyboard events, reacting to specific keys pressed */

interface OnKbdFieldProps {
  preventDefault?: boolean,
  stopPropagation?: boolean,
  stopImmediatePropagation?: boolean,
  altKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
}
/** Generic helper-decorator, for checking any existing KeyboardEvent field */
export function onKbdField<TRet, K extends keyof KeyboardEvent>(
  cb: (this: Element, e: KeyboardEvent) => TRet,
  fieldName: K,
  fieldValue: KeyboardEvent[K] | KeyboardEvent[K][],
  {...opts}: OnKbdFieldProps= {}
) {
  if (typeof cb !== "function") {
    throw new TypeError("Expecting to get a callback to decorate as the first arg!");
  }
  if (typeof fieldName !== "string" || !fieldName) {
    throw new TypeError("Expecting to get the name of the event field to check!");
  }
  return function(this: Element, e: KeyboardEvent): TRet | undefined {
    if (!e || typeof e[fieldName] === "undefined") return;
    if (Array.isArray(fieldValue)) {
      if (fieldValue.some(i => i !== e[fieldName])) return;
    } else {
      if (fieldValue !== e[fieldName]) return;
    }

    for (const modifier of ["altKey", "ctrlKey", "shiftKey", "metaKey"] as const) {
      if (opts[modifier] && e[modifier]) {
        return;
      }
    }

    for (const action of [ "preventDefault", "stopPropagation", "stopImmediatePropagation"] as const) {
      if (opts[action] && e[action] instanceof Function) {
        e[action]();
      }
    }

    return cb.call(this, e);
  }
}

/** Function decorator for handling specific keys  */
export const onKbdCode = (
  cb: (e: KeyboardEvent) => void,
  codes: string | string[],
  opts?: OnKbdFieldProps,
) => onKbdField(cb, "code", codes, opts);
/**
 * Function decorator for handling specific keys
 */
export const onKbdKey = (
  cb: (e: KeyboardEvent) => void,
  keys: string | string[],
  opts?: OnKbdFieldProps,
) => onKbdField(cb, "key", keys, opts);
/**
 * @deprecated use onKbdCode instead
 * Function decorator for handling specific keyCodes */
export const onKbdKeycode = (
  cb: (e: KeyboardEvent) => void,
  keycodes: number | number[],
  opts?: OnKbdFieldProps,
) => onKbdField(cb, "keyCode", keycodes, opts);