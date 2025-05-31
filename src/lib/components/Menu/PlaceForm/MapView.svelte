<script lang="ts">
	import "maplibre-gl/dist/maplibre-gl.css";
	import maplibregl, { Marker } from "maplibre-gl";
	import { latitude, longitude } from "$lib/stores/location";
	import { get } from "svelte/store";
</script>

<div
	class="map-container"
	{@attach (element) => {
		const map = new maplibregl.Map({
			container: element,
			// style: "https://demotiles.maplibre.org/style.json",
			style: {
				version: 8,
				sources: {
					osm: {
						type: "raster",
						tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
						tileSize: 256,
						attribution: "&copy; OpenStreetMap Contributors",
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
			},
			center: [get(longitude), get(latitude)], // starting position [lng, lat]
			zoom: 1, // starting zoom
		});

		map.addControl(new maplibregl.GlobeControl(), "top-right");
		map.on("style.load", () => {
			map.setProjection({
				type: "globe", // Set projection to globe
			});
			// Because of transition MapGL determines size incorrectly? Needs a manual resize.
			map.resize();
		});

		map.on("click", (ko) => {
			$longitude = ko.lngLat.lng;
			$latitude = ko.lngLat.lat;
		});

		let marker: Marker | undefined;
		$effect(() => {
			if (!marker) {
				marker = new Marker().setLngLat([$longitude, $latitude]).addTo(map);
			} else {
				marker.setLngLat([$longitude, $latitude]);
			}
		});

		return () => {
			map?.remove();
			marker = undefined;
		};
	}}
></div>

<style>
	.map-container {
		width: 100%;
		aspect-ratio: 1;
		margin-bottom: 1em;
	}
</style>
