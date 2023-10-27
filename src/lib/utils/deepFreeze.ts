type DeepReadonly<T> = {
	readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
}

export function deepFreeze<T>(obj: T): DeepReadonly<T> {
	const propNames = Object.getOwnPropertyNames(obj);
	for (const name of propNames) {
		const value = obj[name as keyof T];

		if (value && typeof value === "object") {
			deepFreeze(value);
		}
	}

	return Object.freeze(obj);
}