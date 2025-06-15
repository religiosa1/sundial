import type { LineString, Polygon } from "geojson";
import type { LngLatTuple } from "./models";
import { azimuthRadToUnitCircleRad } from "./azimuth";

// default radius for our circle is 300m
const defaultRadius = 0.3;

export function makeCircle(
	center: Readonly<LngLatTuple>,
	radiusInKm = defaultRadius,
	points = 360
): Polygon {
	const [lng, lat] = center;
	const kmInDegreeLng = lngToKm(radiusInKm, lat);
	const kmInDegreeLat = latToKm(radiusInKm);

	const coords = new Array<LngLatTuple>(points + 1);
	for (let i = 0; i < points; i++) {
		const angleRad = ((2 * Math.PI) / points) * i;
		const x = lng + kmInDegreeLng * Math.cos(angleRad);
		const y = lat + kmInDegreeLat * Math.sin(angleRad);
		coords[i] = [x, y];
	}
	coords[coords.length - 1] = coords[0]; // Close the polygon

	return {
		type: "Polygon",
		coordinates: [coords],
	};
}

export function makeAzimuth(
	center: Readonly<LngLatTuple>,
	azimuthRad: number,
	radiusInKm = defaultRadius
): LineString {
	const angleRad = azimuthRadToUnitCircleRad(azimuthRad);

	return {
		type: "LineString",
		coordinates: [
			[...center], //
			calcCircleCoord(center, angleRad, radiusInKm),
		],
	};
}

export function makeCircleSection(
	center: Readonly<LngLatTuple>,
	azimuthStart: number,
	azimuthEnd: number,
	radiusInKm = defaultRadius,
	pointsInCircle = 360 * 10 // Points for a full 2*PI circle
): Polygon | LineString {
	const startAngle = azimuthRadToUnitCircleRad(azimuthStart);
	const endAngle = azimuthRadToUnitCircleRad(azimuthEnd);

	const angleDifference = calculateAngleDifference(startAngle, endAngle);
	const absAngleValue = Math.abs(angleDifference);

	// Handle degenerate case: if start and end are the same (within a small epsilon)
	if (absAngleValue < 1e-9) {
		return {
			type: "LineString",
			coordinates: [
				[...center], //
				calcCircleCoord(center, azimuthStart, radiusInKm),
			],
		};
	}

	//  Calculate the number of points for the arc this is proportional to the arc's angle compared to a full circle.
	const rateOfFullCircle = absAngleValue / (2 * Math.PI);
	// We always have at least 3 points in an arc
	const numberOfArcPoints = Math.max(Math.ceil(rateOfFullCircle * pointsInCircle), 3);

	// Creating array with length = numberOfArcPoints + 1 start point + 1 end point
	const coords: Array<LngLatTuple> = new Array(numberOfArcPoints + 2);
	coords[0] = [...center];

	for (let i = 0; i < numberOfArcPoints; i++) {
		const currentAngleRad = startAngle + (angleDifference / numberOfArcPoints) * i;
		const circlePoint = calcCircleCoord(center, currentAngleRad, radiusInKm);
		coords[i + 1] = circlePoint;
	}
	coords[coords.length - 1] = [...center]; // Close the polygon

	return {
		type: "Polygon",
		coordinates: [coords],
	};
}

/**
 * Calculates coordinate of a point on a circle for a given azimuth
 * @param center coordinates of circle's center
 * @param unitCircleRad angle in unit circle radians
 * @param radiusInKm radius in km
 * @returns coordinates of azimuth's intersection with a circle
 */
function calcCircleCoord(
	center: Readonly<LngLatTuple>,
	unitCircleRad: number,
	radiusInKm = defaultRadius
): LngLatTuple {
	const [lng, lat] = center;

	const kmInLng = lngToKm(radiusInKm, lat);
	const kmInLat = latToKm(radiusInKm);

	const endLng = lng + kmInLng * Math.cos(unitCircleRad);
	const endLat = lat + kmInLat * Math.sin(unitCircleRad);
	return [endLng, endLat];
}

function calculateAngleDifference(startAngle: number, endAngle: number): number {
	// Calculate the difference, accounting for crossing the 0/2PI boundary
	let angleDifference = endAngle - startAngle;

	// Normalize angleDifference to be within -PI and PI for the shortest sweep direction
	// This ensures we always calculate the correct arc, either clockwise or counter-clockwise.
	if (angleDifference > Math.PI) {
		angleDifference -= 2 * Math.PI;
	} else if (angleDifference < -Math.PI) {
		angleDifference += 2 * Math.PI;
	}
	return angleDifference;
}

/** calculates amount of km in one degree longitude at given latitude */
function lngToKm(km: number, lat: number): number {
	/** Number of KM in one degree longitude at equator. */
	const KM_IN_DEG_LNG_EQUATOR = 111.32;
	return km / (KM_IN_DEG_LNG_EQUATOR * Math.cos((lat * Math.PI) / 180));
}

/** calculates amount of km in one degree latitude */
function latToKm(km: number): number {
	/** Number of KM in one degree latitude */
	const KM_IN_DEG_LAT = 110.574;
	return km / KM_IN_DEG_LAT;
}
