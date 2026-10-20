<script lang="ts">
	import "#lib/utils/maplibreWorker.js";
	import { AttributionControl, Map as MapLibreMap } from "maplibre-gl";
	import { get } from "svelte/store";
	import { MAP_TILES_STYLE } from "#lib/constants.js";
	import { latitude, longitude } from "#lib/stores/location.js";
</script>

<div
	class="map-container"
	{@attach (element) => {
		const map = new MapLibreMap({
			container: element,
			style: MAP_TILES_STYLE,
			center: [get(longitude), get(latitude)], // starting position [lng, lat]
			zoom: 16, // starting zoom to accomodate our 300m radius -- empirical, check against docs
			attributionControl: false,
			interactive: false,
		});
		map.addControl(new AttributionControl(), "bottom-left");

		$effect(() => {
			map.panTo([$longitude, $latitude]);
		});

		map.on("style.load", () => {
			// Because of transition MapGL determines size incorrectly? Needs a manual resize.
			map.resize();
		});

		return () => {
			map?.remove();
		};
	}}
></div>

<style>
	.map-container {
		width: 100%;
		height: 100%;
	}
</style>
