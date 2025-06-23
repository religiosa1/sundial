import { colors } from "$lib/constants";

/** Sun azimuth types */
export const SunAzimuthTypeEnum = {
	GoldenHour: "goldenhour",
	CivilTwilight: "civil_twilight",
	Sunrise: "sunrise",
	Sunset: "sunset",
	NoonMarker: "noon_marker",
	SunMarker: "sun_marker",
	MoonMarker: "moon_marker",
} as const;
export type SunAzimuthTypeEnum = (typeof SunAzimuthTypeEnum)[keyof typeof SunAzimuthTypeEnum];

/** Specific drawn azimuth identifier  */
export const SunAzimutIdEnum = {
	GoldenHourMorning: "goldenhour_morning",
	GoldenHourEvening: "goldenhour_evening",

	CivilTwilightMorning: "civil_twilight",
	CivilTwilightEvening: "civil_evening",

	Sunrise: "sunrise",
	Sunset: "sunset",
	NoonMarker: "noon_marker",
	SunMarker: "sun_marker",
	MoonMarker: "moon_marker",
} as const;
export type SunAzimutIdEnum = (typeof SunAzimutIdEnum)[keyof typeof SunAzimutIdEnum];

const sunAzimuthIdToTypeMap: Record<SunAzimutIdEnum, SunAzimuthTypeEnum> = {
	[SunAzimutIdEnum.GoldenHourMorning]: SunAzimuthTypeEnum.GoldenHour,
	[SunAzimutIdEnum.GoldenHourEvening]: SunAzimuthTypeEnum.GoldenHour,
	[SunAzimutIdEnum.CivilTwilightMorning]: SunAzimuthTypeEnum.CivilTwilight,
	[SunAzimutIdEnum.CivilTwilightEvening]: SunAzimuthTypeEnum.CivilTwilight,
	[SunAzimutIdEnum.Sunrise]: SunAzimuthTypeEnum.Sunrise,
	[SunAzimutIdEnum.Sunset]: SunAzimuthTypeEnum.Sunset,
	[SunAzimutIdEnum.NoonMarker]: SunAzimuthTypeEnum.NoonMarker,
	[SunAzimutIdEnum.SunMarker]: SunAzimuthTypeEnum.SunMarker,
	[SunAzimutIdEnum.MoonMarker]: SunAzimuthTypeEnum.MoonMarker,
} as const;
export function getSunAzimuthTypeById(id: SunAzimutIdEnum): SunAzimuthTypeEnum {
	return sunAzimuthIdToTypeMap[id];
}
export function getSunAzimuthIdsByType(type: SunAzimuthTypeEnum): SunAzimutIdEnum[] {
	const set = new Set<SunAzimutIdEnum>();
	for (const [key, value] of Object.entries(sunAzimuthIdToTypeMap)) {
		if (value === type) {
			set.add(key as SunAzimutIdEnum);
		}
	}
	return Array.from(set);
}

export const DEFAULT_COLOR = "#888";
export const FILL_OPACITY = 0.4;

export interface AzimuthSettings {
	name: string;
	color: string;
}

// colors in values don't have any semantic meaning, just picking some ok looking colors
const sunAzimuthColorConfig: Record<SunAzimuthTypeEnum, AzimuthSettings> = {
	[SunAzimuthTypeEnum.GoldenHour]: {
		color: colors.goldenHourStop,
		name: "Golden Hour",
	},
	[SunAzimuthTypeEnum.CivilTwilight]: {
		color: colors.dayStop,
		name: "Civil Twilight",
	},
	[SunAzimuthTypeEnum.Sunrise]: {
		color: colors.sunriseStop,
		name: "Sunrise",
	},
	[SunAzimuthTypeEnum.Sunset]: {
		color: colors.nauticalTwilightStart,
		name: "Sunset",
	},
	[SunAzimuthTypeEnum.NoonMarker]: {
		color: DEFAULT_COLOR,
		name: "Noon",
	},
	[SunAzimuthTypeEnum.SunMarker]: {
		color: colors.sunriseStart,
		name: "Sun position at the time",
	},
	[SunAzimuthTypeEnum.MoonMarker]: {
		color: colors.nightStop,
		name: "Moon position at the time",
	},
};
export function getAzimuthSettings(type: SunAzimuthTypeEnum): AzimuthSettings {
	return sunAzimuthColorConfig[type] ?? DEFAULT_COLOR;
}

export function getAzimuthSettingsById(id: SunAzimutIdEnum): AzimuthSettings {
	const type = getSunAzimuthTypeById(id);
	return getAzimuthSettings(type);
}
