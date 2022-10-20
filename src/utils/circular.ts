interface CircularProps {
  omitFirst?: boolean;
}
export function *circular<T>(array: ArrayLike<T>, index, { omitFirst = false } = {}) {
  if (array == null || !Number.isInteger(array.length)) {
    throw new TypeError("Expecting an array-like object as the first argument");
  }
  if (index < 0 || index >= array.length) {
    throw new RangeError("Provided index is out of range");
  }

  let i;
  if (omitFirst) {
    if (array.length <= 1) return;
    i = (index < array.length - 2)? index + 1 : 0;
  } else {
    i = index;
  }

  do {
    yield array[i];
    if (i < array.length - 1) {
      i++;
    } else {
      i = 0;
    }
  } while (i != index);
};
