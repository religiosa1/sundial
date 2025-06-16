import { isValid } from "date-fns";
import { getPosition, type GetTimesResult } from "suncalc";

export interface AzimuthSection {
	start: number;
	end: number;
}

/** Azimuths of sunrise-sunset, based on geo location.
 *
 * Any of the sections could be missing in extreme north/south positions,
 * so this has to be accounted for.
 */
export interface GeoAzimuths {
	morningCivilTwilightSection?: AzimuthSection;
	sunriseSection?: AzimuthSection;
	morningGoldenHourSection?: AzimuthSection;

	eveningGoldenHourSection?: AzimuthSection;
	sunsetSection?: AzimuthSection;
	eveningCivilTwilightSection?: AzimuthSection;

	noon: number;
}

export function getGeoAzimuths(
	times: GetTimesResult,
	latitude: number,
	longitude: number
): GeoAzimuths {
	const getAzimuth = (time: Date) => getPosition(time, latitude, longitude).azimuth;

	/**
	 * Calculate circle section for time interval, if it's valid
	 * @param timeStart start of the interval
	 * @param timeEnd normal end of the interval
	 * @param timeOverSpawn fallback for overspawn interval (far north, or far south)
	 * @returns calculated azimuth section, or undefined if it's too far north or south to display the interval
	 */
	const getSection = (
		timeStart: Date,
		timeEnd: Date,
		timeOverSpawn: Date
	): AzimuthSection | undefined => {
		if (!isValid(timeStart)) return undefined;
		const end = isValid(timeEnd) ? timeEnd : timeOverSpawn;
		if (!isValid(end)) return undefined;
		return {
			start: getAzimuth(timeStart),
			end: getAzimuth(end),
		};
	};

	const positions: GeoAzimuths = {
		morningCivilTwilightSection: getSection(times.dawn, times.sunrise, times.dusk),
		sunriseSection: getSection(times.sunrise, times.sunriseEnd, times.sunset),
		morningGoldenHourSection: getSection(times.sunriseEnd, times.goldenHourEnd, times.sunsetStart),

		eveningGoldenHourSection: getSection(times.goldenHour, times.sunsetStart, times.goldenHourEnd),
		sunsetSection: getSection(times.sunsetStart, times.sunset, times.sunriseEnd),
		eveningCivilTwilightSection: getSection(times.sunset, times.dusk, times.sunrise),

		noon: getAzimuth(times.solarNoon),
	};

	return positions;
}
