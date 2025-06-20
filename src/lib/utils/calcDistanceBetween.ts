import type { LatLngTuple as LatLngTuple } from "$lib/models/LngLatTuple";

// Globally average radius
// https://en.wikipedia.org/wiki/Earth_radius
const EARTH_RADIUS_KM = 6371;

/** Calculates distance between a pair of LngLat coordinates in kilometers,
 * using the haversine formula.
 *
 * ```
 * a = sin²(Δφ/2) + cos(φ1) * cos(φ2) * sin²(Δλ/2)
 * c = 2 * atan2(√a, √(1−a))
 * distance = R * c
 * ```
 *
 * @see https://en.wikipedia.org/wiki/Haversine_formula
 *
 * @param a First coordinate as [longitude, latitude]
 * @param b Secons coordinate as [longitude, latitude]
 * @returns Distance in KM between two coordinates.
 */
export function calcDistanceBetween(
	coordA: Readonly<LatLngTuple>,
	coordB: Readonly<LatLngTuple>
): number {
	if (!Array.isArray(coordA) || !Array.isArray(coordB)) {
		return NaN;
	}
	const [lat1, lng1] = coordA;
	const [lat2, lng2] = coordB;
	if ([lng1, lat1, lng2, lat2].some((coord) => !Number.isFinite(coord))) {
		return NaN;
	}

	const dLat = toRadians(lat2 - lat1);
	const dLng = toRadians(lng2 - lng1);
	const a =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) ** 2;

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return EARTH_RADIUS_KM * c;
}

function toRadians(degrees: number): number {
	return degrees * (Math.PI / 180);
}
