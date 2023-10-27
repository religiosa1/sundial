/** Generate a range of integers from 0 to end */
export function range(end: number): Generator<number>;
/** Generate a range of integers with given start, end and optional step. */
export function range(start: number, end: number, step?: number): Generator<number>;
export function* range(start: number, end?: number, step = 1) {
	if (!Number.isInteger(start)) throw new TypeError("Expect to recieve an integer as the first arg of range");
	if (typeof end === "undefined" || end === null) {
		end = start;
		start = 0;
	} else if (!Number.isInteger(end)) {
		throw new TypeError("Expect the 'end' argument of a range to be either an integer or a null");
	}
	if (!Number.isInteger(step) || step <= 0) {
		throw new Error("Negative, zero or non-integer step isn't supported");
	}
	for (let i = start; i < end; i += step) {
		yield i;
	}
};