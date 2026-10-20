<script lang="ts">
	import "maplibre-gl/dist/maplibre-gl.css";
	import "#lib/utils/maplibreWorker.js";
	import { GlobeControl, Map as MapLibreMap, Marker } from "maplibre-gl";
	import { latitude, longitude } from "#lib/stores/location.js";
	import { get } from "svelte/store";
	import { MAP_TILES_STYLE } from "#lib/constants.js";
</script>

<div
	class="map-container"
	{@attach (element) => {
		const map = new MapLibreMap({
			container: element,
			// style: "https://demotiles.maplibre.org/style.json",
			style: MAP_TILES_STYLE,
			center: [get(longitude), get(latitude)], // starting position [lng, lat]
			zoom: 1, // starting zoom
		});

		map.addControl(new GlobeControl(), "top-right");
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
