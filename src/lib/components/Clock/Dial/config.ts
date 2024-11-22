import type { DaySectionId } from "$lib/models/DaySection";

export const size = 306;
export const padding = 3;
export const hsize = size / 2;
export const width = 20;
export const radius = hsize - width / 2 - padding;

export const colors: Record<DaySectionId, string> = {
	astronomicalTwilightMorning: "url(#grd-astro)",
	nauticalDawn: "url(#grd-nautic)",
	dawn: "url(#grd-dusk)",
	sunrise: "url(#grd-sun)",
	goldenHourMorning: "url(#grd-golden)",
	day: "url(#grd-day)",
	goldenHourEvening: "url(#grd-golden)",
	sunset: "url(#grd-sun)",
	dusk: "url(#grd-dusk)",
	nauticalDusk: "url(#grd-nautic)",
	astronomicalTwilightEveing: "url(#grd-astro)",
	night: "url(#grd-night)",
};
