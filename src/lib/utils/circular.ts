interface CircularProps {
  omitFirst?: boolean;
}
/**
 * Generator function, for completely traversing an array-like object from the
 * provided index in circular fashion.
 * @param array array-like to traverse
 * @param index starting index
 * @param opts.omitFirst excluding the first item from traversal
 * @returns array items in the order, they presented from the starting index
 */
export function *circular<T>(array: ArrayLike<T>, index: number, { omitFirst = false }: CircularProps = {}) {
  if (!Number.isInteger(array?.length)) {
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
