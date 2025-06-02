import type { Geometry } from "geojson";

// default radius for our circle is 300m
const defaultRadius = 0.3;

export function makeCircle(
	center: Readonly<LngLatTupe>,
	radiusInKm = defaultRadius,
	points = 360
): Geometry {
	const [lng, lat] = center;
	const distanceX = lngToKm(radiusInKm, lat);
	const distanceY = latToKm(radiusInKm);

	const coords = new Array(points + 1);
	for (let i = 0; i < points; i++) {
		const angle = (i * 360) / points;
		const angleRad = (angle * Math.PI) / 180;
		const x = lng + distanceX * Math.cos(angleRad);
		const y = lat + distanceY * Math.sin(angleRad);
		coords[i] = [x, y];
	}
	coords[points] = coords[0]; // Close the polygon

	return {
		type: "Polygon",
		coordinates: [coords],
	};
}

export function makeRadius(
	center: Readonly<LngLatTupe>,
	angleRad: number,
	radiusInKm = defaultRadius
): Geometry {
	const [lng, lat] = center;
	const distanceX = lngToKm(radiusInKm, lat);
	const distanceY = latToKm(radiusInKm);

	const endLng = lng + distanceX * Math.cos(angleRad);
	const endLat = lat + distanceY * Math.sin(angleRad);

	return {
		type: "LineString",
		coordinates: [
			[lng, lat],
			[endLng, endLat],
		],
	};
}

type LngLatTupe = [lng: number, lat: number];

function lngToKm(km: number, lat: number): number {
	/** Number of KM in one degree longitude at equator. */
	const KM_IN_DEG_LNG_EQUATOR = 111.32;
	return km / (KM_IN_DEG_LNG_EQUATOR * Math.cos((lat * Math.PI) / 180));
}

function latToKm(km: number): number {
	/** Number of KM in one degree latitude */
	const KM_IN_DEG_LAT = 110.574;
	return km / KM_IN_DEG_LAT;
}
