import { getPosition, type GetTimesResult } from "suncalc";

/** Azimuths of sunrise-sunset, based on geo location */
interface GeoAzimuths {
	dawn: number;
	sunriseStart: number;
	sunriseEnd: number;
	morningGoldenHour: number;

	noon: number;

	eveningGoldenHour: number;
	sunsetStart: number;
	sunsetEnd: number;
	dusk: number;
}

export function getGeoAzimuths(
	times: GetTimesResult,
	latitude: number,
	longitude: number
): GeoAzimuths {
	const getAzimuth = (time: Date) => getPosition(time, latitude, longitude).azimuth;

	const positions: GeoAzimuths = {
		dawn: getAzimuth(times.dawn),
		sunriseStart: getAzimuth(times.sunrise),
		sunriseEnd: getAzimuth(times.sunriseEnd),
		morningGoldenHour: getAzimuth(times.goldenHourEnd),

		noon: getAzimuth(times.solarNoon),

		eveningGoldenHour: getAzimuth(times.goldenHour),
		sunsetStart: getAzimuth(times.sunsetStart),
		sunsetEnd: getAzimuth(times.sunset),
		dusk: getAzimuth(times.dusk),
	};
	return positions;
}

/** Formats suncalc azimut as compass degress.
 *
 * Azimuth in suncalc starts at south and goes clockwise.
 * Degress on compass start at north and goes clockwise, so we need to offset
 * it 180 degrees
 */
export function formatAzimuth(azimuthRad: number): string {
	const degrees = ((Math.PI + azimuthRad) / (Math.PI * 2)) * 360;
	return `${degrees.toFixed(2)}°`;
}

/** Formats altitude in suncalc to degrees.
 *
 * Altitude in suncalc is 0 at the horizon and PI/2 at the zenith (straight over your head).
 * We're just converting it to degrees -- 0 at horizon, 90 at the zenith.
 */
export function formatAltitude(altitudeRad: number): string {
	const degrees = (altitudeRad / Math.PI) * 180;
	return `${degrees.toFixed(2)}°`;
}
