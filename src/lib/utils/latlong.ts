export function isValidLatitude(val: number | undefined): val is number {
	return typeof val === "number" && Number.isFinite(val) && val <= 90 && val >= -90;
}

export function isValidLongitude(val: number | undefined): val is number {
	return typeof val === "number" && Number.isFinite(val) && val <= 180 && val >= -180;
}

export function toDegree(val: number): readonly [degrees: number, minutes: number, seconds: number] {
	const remainder = val % 1;
	const minutes = remainder * 60;
	const seconds = minutes % 1 * 60;
	return [Math.trunc(val), Math.trunc(minutes), seconds];
}

export function degreeToString(deg: readonly [degrees: number, minutes: number, seconds: number]) {
	const [degrees, minutes, seconds] = deg;
	return `${degrees}° ${minutes}′ ${Math.round(seconds)}″`;
}

function treq(val: number, minus: string, plus: string, zero = "") {
	if (val < 0) {
		return minus;
	}
	if (val > 0) {
		return plus
	}
	return zero;
}

export function latToDegree(val: number): string {
	return `${degreeToString(toDegree(Math.abs(val)))}${treq(val, " S", " N")}`;
}

export function longToDegree(val: number): string {
	return `${degreeToString(toDegree(Math.abs(val)))}${treq(val, " W", " E")}`;
}