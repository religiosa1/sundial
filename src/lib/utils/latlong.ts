export function isValidLatitude(val: number | undefined): boolean {
	return typeof val === "number" && Number.isFinite(val) && val <= 90 && val >= -90;
}

export function isValidLongitude(val: number | undefined): boolean {
	return typeof val === "number" && Number.isFinite(val) && val <= 180 && val >= -180;
}

export function formatLatAsDegree(val: number): string {
	return degreeToString(toDegree(Math.abs(val))) + treq(val, " S", " N");
}

export function formatLongAsDegree(val: number): string {
	return degreeToString(toDegree(Math.abs(val))) + treq(val, " W", " E");
}

type DegreeTuple = [degrees: number, minutes: number, seconds: number];

function toDegree(val: number): DegreeTuple {
	const remainder = val % 1;
	const minutes = remainder * 60;
	const seconds = (minutes % 1) * 60;
	return [Math.trunc(val), Math.trunc(minutes), seconds];
}

function degreeToString([degrees, minutes, seconds]: Readonly<DegreeTuple>) {
	return `${degrees}° ${minutes}′ ${Math.round(seconds)}″`;
}

function treq(val: number, minusValue: string, plusValue: string, zeroValue = ""): string {
	if (val < 0) {
		return minusValue;
	}
	if (val > 0) {
		return plusValue;
	}
	return zeroValue;
}
