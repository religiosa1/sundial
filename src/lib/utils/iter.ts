/** @module iterator helpers */

/** Function generating minBy predicate for reduce.
 *
 * @example
 * const arr = [{ bar: 7 }, { bar: 5 }];
 * const result = arr.reduce(minBy((i) => i.bar));
 * console.log(result); // prints "{ bar: 5 }"
 */
export function minBy<T>(predicate: (item: T) => string | number): (acc: T, cur: T) => T {
	return (acc: T, cur: T) => {
		const accV = predicate(acc);
		const curV = predicate(cur);
		return curV < accV ? cur : acc;
	};
}

/** Function generating minBy predicate for reduce.
 *
 * @example
 * const arr = [{ bar: 7 }, { bar: 5 }];
 * const result = arr.reduce(maxBy((i) => i.bar));
 * console.log(result); // prints "{ bar: 7 }"
 */
export function maxBy<T>(predicate: (item: T) => string | number): (acc: T, cur: T) => T {
	return (acc: T, cur: T) => {
		const accV = predicate(acc);
		const curV = predicate(cur);
		return curV > accV ? cur : acc;
	};
}
