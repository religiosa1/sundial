import { describe, it, expect } from "vitest";
import { formatLatAsDegree, formatLongAsDegree } from "../latlong";

describe("latlong", () => {
	// 52° 13′ 48″ N, 21° 0′ 40″ E
	const latDcm = 52.23;
	const longDcm = 21.011111;

	it("correctly formates latitude", () => {
		expect(formatLatAsDegree(latDcm)).toEqual("52° 13′ 48″ N");
		expect(formatLatAsDegree(-latDcm)).toEqual("52° 13′ 48″ S");
		expect(formatLatAsDegree(0)).toEqual("0° 0′ 0″");
	});

	it("correctly formates longitude", () => {
		expect(formatLongAsDegree(longDcm)).toEqual("21° 0′ 40″ E");
		expect(formatLongAsDegree(-longDcm)).toEqual("21° 0′ 40″ W");
		expect(formatLongAsDegree(0)).toEqual("0° 0′ 0″");
	});
});
