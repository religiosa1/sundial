import { describe, expect, it } from "vitest";
import { formatAltitude, formatAzimuth } from "../azimuth";

describe("azimuth", () => {
	describe("formatAltitude", () => {
		it("formats 0 rad altitude as 0 degrees", () => {
			const got = formatAltitude(0);
			expect(got).toBe("0.00°");
		});

		it("formats PI/2 (zentith) as 90 degrees", () => {
			const got = formatAltitude(Math.PI / 2);
			expect(got).toBe("90.00°");
		});

		it("formats -PI/4 as -45 degrees", () => {
			const got = formatAltitude(Math.PI / -4);
			expect(got).toBe("-45.00°");
		});
	});

	describe("formatAzimuth", () => {
		it("formats 0 azimuth (south) in suncalc as 180 degrees", () => {
			const got = formatAzimuth(0);
			expect(got).toBe("180.00°");
		});

		it("formats PI*0.75 (northwest) as 315 degrees", () => {
			const got = formatAzimuth(Math.PI * 0.75);
			expect(got).toBe("315.00°");
		});

		it("formats -PI*0.75 (northeast) as 45 degrees", () => {
			const got = formatAzimuth(Math.PI * -0.75);
			expect(got).toBe("45.00°");
		});
	});
});
