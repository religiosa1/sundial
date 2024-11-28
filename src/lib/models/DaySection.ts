import type { GetTimesResult } from "suncalc";

/** sections in between GetTimesResult keys */
export const DaySectionEnum = createDaySectionDictionary({
	astronomicalTwilightMorning: {
		name: "astronomical twilight",
		start: "nightEnd",
		end: "nauticalDawn",
	},
	nauticalDawn: {
		stroke: "url(#grd-nautic)",
		name: "nautical twilight",
		start: "nauticalDawn",
		end: "dawn",
	},
	dawn: {
		name: "civil twilight",
		start: "dawn",
		end: "sunrise",
	},
	sunrise: {
		name: "sunrise",
		start: "sunrise",
		end: "sunriseEnd",
	},
	goldenHourMorning: {
		name: "morning golden hour",
		start: "sunriseEnd",
		end: "goldenHourEnd",
	},
	day: {
		name: "day",
		start: "goldenHourEnd",
		end: "goldenHour",
	},
	goldenHourEvening: {
		name: "evening golden hour",
		start: "goldenHour",
		end: "sunsetStart",
	},
	sunset: {
		name: "sunset",
		start: "sunsetStart",
		end: "sunset",
	},
	dusk: {
		name: "civil twilight",
		start: "sunset",
		end: "dusk",
	},
	nauticalDusk: {
		name: "nautical twilight",
		start: "dusk",
		end: "nauticalDusk",
	},
	astronomicalTwilightEveing: {
		name: "astronomical twilight",
		start: "nauticalDusk",
		end: "night",
	},
	night: {
		name: "night",
		start: "night",
		end: "nightEnd",
	},
});
export type DaySectionEnum = (typeof DaySectionEnum)[keyof typeof DaySectionEnum];
export type DaySectionId = keyof typeof DaySectionEnum;
export type DaySection = Prettify<DaySectionData & { id: DaySectionId }>;

interface DaySectionData {
	name: string;
	start: keyof GetTimesResult;
	end: keyof GetTimesResult;
}
function createDaySectionDictionary<const T extends Record<string, DaySectionData>>(
	payload: T
): { [K in keyof T]: T[K] & { readonly id: K } } {
	const retValue = structuredClone(payload) as { [k in keyof T]: T[k] & { readonly id: k } };
	for (const [key, value] of Object.entries(retValue)) {
		value.id = key;
	}
	return retValue;
}

type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
