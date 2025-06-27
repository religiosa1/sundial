/**
 * Converts azimuth in radians to unit circle in radians and normalizes angle
 *
 * Azimuth is:
 *  - Clockwise
 *  - Starts at South
 *
 * Unit circle is:
 *  - Counterclockwise
 *  - Starts at East
 */
export function azimuthRadToUnitCircleRad(azimuthRad: number): number {
	return ((3 * Math.PI) / 2 - azimuthRad) % (2 * Math.PI);
}

/** Formats suncalc azimut as compass degress.
 *
 * Azimuth in suncalc starts at south and goes clockwise.
 * Degress on compass start at north and goes clockwise, so we need to offset
 * it 180 degrees
 */
export function formatAzimuth(azimuthRad: number, precision = 1): string {
	const degrees = ((Math.PI + azimuthRad) / (Math.PI * 2)) * 360;
	return `${degrees.toFixed(precision)}°`;
}

/** Formats altitude in suncalc to degrees.
 *
 * Altitude in suncalc is 0 at the horizon and PI/2 at the zenith (straight over your head).
 * We're just converting it to degrees -- 0 at horizon, 90 at the zenith.
 */
export function formatAltitude(altitudeRad: number, precision = 1): string {
	const degrees = (altitudeRad / Math.PI) * 180;
	return `${degrees.toFixed(precision)}°`;
}
