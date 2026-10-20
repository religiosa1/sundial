import { describe, expect, it } from "vitest";
import { azimuthDegToUnitCircleRad, formatAltitude, formatAzimuth } from "../azimuth";

describe("azimuth", () => {
	describe("formatAltitude", () => {
		it("formats 0 altitude as 0 degrees", () => {
			const got = formatAltitude(0);
			expect(got).toBe("0.0°");
		});

		it("formats 90 (zenith) as 90 degrees", () => {
			const got = formatAltitude(90);
			expect(got).toBe("90.0°");
		});

		it("formats negative altitude", () => {
			const got = formatAltitude(-45);
			expect(got).toBe("-45.0°");
		});

		it("allows to specify the desired precision", () => {
			const got = formatAltitude(0, 2);
			expect(got).toBe("0.00°");
		});
	});

	describe("formatAzimuth", () => {
		it("formats 180 azimuth (south) in suncalc as 180 degrees", () => {
			const got = formatAzimuth(180);
			expect(got).toBe("180.0°");
		});

		it("formats 315 azimuth (northwest) as 315 degrees", () => {
			const got = formatAzimuth(315);
			expect(got).toBe("315.0°");
		});

		it("allows to specify the desired precision", () => {
			const got = formatAzimuth(180, 2);
			expect(got).toBe("180.00°");
		});
	});

	describe("azimuthDegToUnitCircleRad", () => {
		it.each([
			[0, Math.PI / 2], // north
			[90, 0], // east
			[180, (3 * Math.PI) / 2], // south
			[270, Math.PI], // west
			[135, (7 * Math.PI) / 4], // southeast
			[315, (3 * Math.PI) / 4], // northwest
		])("converts %d° azimuth to unit circle", (azimuth, expected) => {
			expect(azimuthDegToUnitCircleRad(azimuth)).toBeCloseTo(expected);
		});

		it("keeps the result within [0, 2π)", () => {
			for (let azimuth = 0; azimuth < 360; azimuth += 7.5) {
				const got = azimuthDegToUnitCircleRad(azimuth);
				expect(got).toBeGreaterThanOrEqual(0);
				expect(got).toBeLessThan(2 * Math.PI);
			}
		});
	});
});
