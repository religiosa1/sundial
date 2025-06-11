import { colors } from "$lib/constants";

export const SourceNameEnum = {
	Base: "suncalc",
	GoldenHour: "goldenhour",
	CivilTwilight: "civil_twilight",
	Sunrise: "sunrise",
	Sunset: "sunset",
	NoonMarker: "noon_marker",
	SunMarker: "sun_marker",
	MoonMarker: "moon_marker",
} as const;

export type SourceNameEnum = (typeof SourceNameEnum)[keyof typeof SourceNameEnum];

const DEFAULT_COLOR = "#888";

// colors in values don't have any semantic meaning, just picking some ok looking colors
const sectionColorConfig: Record<SourceNameEnum, string> = {
	[SourceNameEnum.Base]: DEFAULT_COLOR,
	[SourceNameEnum.GoldenHour]: colors.goldenHourStop,
	[SourceNameEnum.CivilTwilight]: colors.dayStop,
	[SourceNameEnum.Sunrise]: colors.sunriseStop,
	[SourceNameEnum.Sunset]: colors.nauticalTwilightStart,
	[SourceNameEnum.NoonMarker]: DEFAULT_COLOR,
	[SourceNameEnum.SunMarker]: colors.sunriseStart,
	[SourceNameEnum.MoonMarker]: colors.nightStop,
};

export const FILL_OPACITY = 0.4;

export function getSectionColor(section: SourceNameEnum): string {
	return sectionColorConfig[section] ?? DEFAULT_COLOR;
}
