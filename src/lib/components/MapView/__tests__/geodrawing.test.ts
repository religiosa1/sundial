import { describe, expect, it } from "vitest";
import { azimuthRadToUnitCircleRad, makeAzimuth, makeCircleSection } from "../geodrawing";
import type { Polygon, Position } from "geojson";

const PRECISION = 5;

describe("geodrawing", () => {
	describe("azimuthRadToUnitCircleRad", () => {
		it.each([
			[0, Math.PI * 1.5], // south
			[Math.PI * 0.75, Math.PI * 0.75], // north-west
			[-Math.PI * 0.5, 0], // east
			[-Math.PI * 0.75, Math.PI * 0.25], // north-east
		])("converts value to expected result %f -> %f", (azimuth, angle) => {
			expect(azimuthRadToUnitCircleRad(azimuth)).toBeCloseTo(angle, PRECISION);
		});
	});

	describe("makeCircleSection", () => {
		const mockCenter = [50, 25] as const;
		const mockStart = 0; // south;
		const mockEnd = Math.PI * 0.5; // west;

		it("creates a polygon", () => {
			const result = makeCircleSection(mockCenter, mockStart, mockEnd);
			expect(result).toEqual({
				type: "Polygon",
				coordinates: expect.any(Array),
			} satisfies Polygon);
		});

		it("uses center as starting and end points of the poligon", () => {
			const result = makeCircleSection(mockCenter, mockStart, mockEnd);
			expect(result.type).toBe("Polygon");
			expect(result.coordinates[0][0]).toEqual(mockCenter);
			expect(result.coordinates[0].at(-1)).toEqual(mockCenter);
		});

		it("second and second to last coordinates must match starting and ending azimuth coordinates", () => {
			const result = makeCircleSection(mockCenter, mockStart, mockEnd);

			const wantStart = makeAzimuth(mockCenter, mockStart).coordinates.at(-1)!;
			const wantEnd = makeAzimuth(mockCenter, mockEnd).coordinates.at(-1)!;

			const gotStart = result.coordinates[0][1] as Position;
			const gotEnd = result.coordinates[0].at(-2) as Position;

			expect(gotStart[0]).toBeCloseTo(wantStart[0], PRECISION);
			expect(gotStart[1]).toBeCloseTo(wantStart[1], PRECISION);
			expect(gotEnd[0]).toBeCloseTo(wantEnd[0], PRECISION);
			expect(gotEnd[1]).toBeCloseTo(wantEnd[1], PRECISION);
		});
	});
});
