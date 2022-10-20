interface RangeOpts {
  inclusive?: boolean;
}
export function range(end: number): Generator<number>;
export function *range(start: number, end?: number, step = 1, { inclusive }: RangeOpts = {}) {
  if (!Number.isInteger(start)) throw new TypeError("Expect to recieve an integer as the first arg of range");
  if (typeof end === "undefined" || end === null) {
    end = start;
    start = 0;
  } else if (!Number.isInteger(end)) {
    throw new TypeError("Expect the 'end' argument of a range to be either an integer or a null");
  }
  if (!Number.isInteger(step) || step <= 0) {
    throw new Error("Negative or zero step isn't supported in ranges");
  }
  if (inclusive) {
    for (let i = start; i <= end; i += step) {
      yield i;
    }
  } else {
    for (let i = start; i < end; i += step) {
      yield i;
    }
  }
};

range.prototype.concat = function*() {
  for (let i of this) { yield i; }
  for (let arg of arguments) {
    if (arg && typeof arg[Symbol.iterator] === 'function') {
      for (let i of arg) { yield i; }
    } else {
      yield arg;
    }
  }
};
