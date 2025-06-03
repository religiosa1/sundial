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
