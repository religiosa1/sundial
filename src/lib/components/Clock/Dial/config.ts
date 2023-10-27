import { readable } from "svelte/store";
import { deepFreeze } from "$lib/utils/deepFreeze";
export const size = 306;
export const padding = 3;
export const hsize = size / 2;
export const width = 20;
export const radius = hsize - width / 2 - padding;

export const FORMAT = "H:mm:ss";


// initially localization derived, currently i18n is removed.
// We're still keeping it as a store, to have the same interface as before.
export const colors = readable(deepFreeze({
	"astronomical-twilight-morning": {
		stroke: "url(#grd-astro)",
		name: "astronomical twilight",
	},
	"nautical-dawn": {
		stroke: "url(#grd-nautic)",
		name: "nautical twilight",
	},
	"dawn": {
		stroke: "url(#grd-dusk)",
		name: "civil twilight",
	},
	"sunrise": {
		stroke: "url(#grd-sun)",
		name: "sunrise",
	},
	"golden-hour-morning": {
		stroke: "url(#grd-golden)",
		name: "golden hour",
	},
	"day": {
		stroke: "url(#grd-day)",
		name: "day",
	},
	"golden-hour-evening": {
		stroke: "url(#grd-golden)",
		name: "golden hour",
	},
	"sunset": {
		stroke: "url(#grd-sun)",
		name: "sunset",
	},
	"dusk": {
		stroke: "url(#grd-dusk)",
		name: "civil twilight"
	},
	"nautical-dusk": {
		stroke: "url(#grd-nautic)",
		name: "nautical twilight"
	},
	"astronomical-twilight-eveing": {
		stroke: "url(#grd-astro)",
		name: "astronomical twilight",
	},
	"night": {
		stroke: "url(#grd-night)",
		name: "night",
	},
}));