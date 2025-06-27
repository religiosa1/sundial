/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";
import { calcDistanceBetween } from "../calcDistanceBetween";
import type { LatLngTuple } from "$lib/models/LngLatTuple";

describe("calcDistanceBetween", () => {
	it.each([Infinity, NaN, "foobar", undefined, null])(
		"returns NaN if any of the given coordinates is not a finite number: %p",
		(val) => {
			const baseA: LatLngTuple = [0, 0];
			const baseB: LatLngTuple = [1, 1];

			// pos1
			expect(calcDistanceBetween([val as any, baseA[1]], baseB)).toBe(NaN);
			// pos2
			expect(calcDistanceBetween([baseA[0], val as any], baseB)).toBe(NaN);
			//pos3
			expect(calcDistanceBetween(baseA, [val as any, baseB[1]])).toBe(NaN);
			//pos4
			expect(calcDistanceBetween(baseA, [baseB[0], val as any])).toBe(NaN);

			// more than one entry
			expect(calcDistanceBetween([val as any, baseA[1]], [val as any, baseB[1]])).toBe(NaN);
			expect(calcDistanceBetween([val as any, val as any], [val as any, baseB[1]])).toBe(NaN);

			// the whole tuple:
			expect(calcDistanceBetween(undefined as any, baseB)).toBe(NaN);
			expect(calcDistanceBetween(baseA, undefined as any)).toBe(NaN);
		}
	);

	// First coordinate is a bridge aboce Warszawa Zachodnia Railroad station (Warsaw) coordinate in google maps
	it.each([
		//
		[
			"Pomnik Bundowców i Cukunftowców w Warszawie",
			[52.21853508433899, 20.959853567388123],
			[52.247846042437416, 20.974523326209862],
			3.4,
		],
		[
			"Pałac Prezydencki w Warszawie",
			[52.21853508433899, 20.959853567388123],
			[52.243758979458995, 21.015833367588467],
			4.74,
		],
		// almost strictly horizontal
		[
			"middle of Vistula river to East",
			[52.21853508433899, 20.959853567388123],
			[52.220416, 21.058147],
			6.7,
		],
		// almost strictly vertical
		[
			"to a road connection between Władysława Bronieskiego and al. Armii Krajowej",
			[52.21853508433899, 20.959853567388123],
			[52.26783276541196, 20.959503999793217],
			5.48,
		],
	] as const)("calculates the expected distance between close coordinates: %s", (_, a, b, want) => {
		// Accuracy +- 100 meters
		expect(calcDistanceBetween(a, b)).toBeCloseTo(want, 1);
	});

	it.each([
		// New York to London
		[[40.7128, -74.006], [51.5074, -0.1278], 5570.27],
		// Tokyo to Sydney
		[[35.6762, 139.6503], [-33.8688, 151.2093], 7823.05],
		// North Pole to South Pole (maximum distance)
		[[90, 0], [-90, 0], 20015.09],
		// Antipodal points (opposite sides of Earth)
		[[0, 0], [0, 180], 20015.09],
		// Around quarter of Earth's circumference
		[[0, 0], [0, 90], 10007.54],
		// Cross international date line
		[[21.3099, -157.8581], [35.6762, 139.6503], 6196.01],
	] as const)("calculates the expected distance between large distances", (a, b, want) => {
		const got = calcDistanceBetween(a, b);
		// 99% accuracy is close enough
		expect(Math.abs(1 - got / want)).toBeLessThan(0.01);
	});
});
