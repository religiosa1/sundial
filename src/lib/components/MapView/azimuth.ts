/**
 * Converts azimuth in degrees to unit circle in radians and normalizes angle to [0, 2π)
 *
 * Azimuth is:
 *  - Clockwise
 *  - Starts at North
 *
 * Unit circle is:
 *  - Counterclockwise
 *  - Starts at East
 */
export function azimuthDegToUnitCircleRad(azimuthDeg: number): number {
	// positive modulo, as arc sweep calculations rely on the normalized range
	const degrees = (((90 - azimuthDeg) % 360) + 360) % 360;
	return (degrees * Math.PI) / 180;
}

/** Formats suncalc azimuth as compass degrees.
 *
 * Azimuth in suncalc starts at north and goes clockwise, same as a compass.
 */
export function formatAzimuth(azimuthDeg: number, precision = 1): string {
	return `${azimuthDeg.toFixed(precision)}°`;
}

/** Formats suncalc altitude as degrees -- 0 at horizon, 90 at the zenith. */
export function formatAltitude(altitudeDeg: number, precision = 1): string {
	return `${altitudeDeg.toFixed(precision)}°`;
}
