import type { StyleSpecification } from "maplibre-gl";

export const APP_TITLE = "Sunlight Phases";

export const colors = {
	astronomicalTwilightStart: "#0000aa",
	astronomicalTwilightStop: "#000044",

	nauticalTwilightStart: "#592fce",
	nauticalTwilightStop: "#112fbb",

	duskStart: "#de8e4f",
	duskStop: "#894fde",

	goldenHourStart: "#ccffdd",
	goldenHourStop: "#ffd844",

	sunriseStart: "#ffa800",
	sunriseStop: "#ff7000",

	dayStart: "#bcdcdd",
	dayStop: "#bbccff",

	nightStart: "#000011",
	nightStop: "#000033",
} as const;

export const MAP_TILES_STYLE: StyleSpecification = {
	version: 8,
	sources: {
		osm: {
			type: "raster",
			tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
			tileSize: 256,
			attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			maxzoom: 19,
		},
	},
	layers: [
		{
			id: "osm",
			type: "raster",
			source: "osm",
		},
	],
};
