import type { StyleSpecification } from "maplibre-gl";

export const APP_TITLE = "Sunlight Phases";

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
