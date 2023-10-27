import { describe, it, expect } from "vitest";
import { toDegree, degreeToString, latToDegree, longToDegree } from "../latlong";

describe("latlong", () => {
	// 52° 13′ 48″ N, 21° 0′ 40″ E
	const latDcm = 52.23;
	const latDeg = [52, 13, 48.334343] as const;
	const longDcm = 21.011111;
	// const longDeg = [21, 0, 40] as const;
	// ,
	it("converts decimal to degree", () => {
		const [deg, min, sec] = toDegree(52.23);

		expect(deg).toEqual(52)
		expect(min).toEqual(13)
		expect(sec).toBeCloseTo(48);
	});

	it("formats degrees tuple", () => {
		expect(degreeToString(latDeg)).toEqual("52° 13′ 48″");
	});

	it("correctly formates latitude", () => {
		expect(latToDegree(latDcm)).toEqual("52° 13′ 48″ N");
		expect(latToDegree(-latDcm)).toEqual("52° 13′ 48″ S");
		expect(latToDegree(0)).toEqual("0° 0′ 0″");
	});

	it("correctly formates longitude", () => {
		expect(longToDegree(longDcm)).toEqual("21° 0′ 40″ E");
		expect(longToDegree(-longDcm)).toEqual("21° 0′ 40″ W");
		expect(longToDegree(0)).toEqual("0° 0′ 0″");
	});
});