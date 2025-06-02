<script lang="ts">
	import maplibregl, { GeoJSONSource } from "maplibre-gl";
	import { get } from "svelte/store";
	import { MAP_TILES_STYLE } from "$lib/constants";
	import { latitude, longitude } from "$lib/stores/location";
	import * as geodrawing from "./geodrawing";
</script>

<div
	class="map-container"
	{@attach (element) => {
		const map = new maplibregl.Map({
			container: element,
			style: MAP_TILES_STYLE,
			center: [get(longitude), get(latitude)], // starting position [lng, lat]
			zoom: 16, // starting zoom to accomodate our 300m radius -- empirical, check against docs
		});

		map.on("style.load", () => {
			// Because of transition MapGL determines size incorrectly? Needs a manual resize.
			map.resize();
		});

		let loaded = $state(false);
		map.on("load", () => {
			map.addSource("suncalc", {
				type: "geojson",
				data: {
					type: "GeometryCollection",
					geometries: [],
				},
			});
			map.addLayer({
				id: "route",
				type: "line",
				source: "suncalc",
				layout: {
					"line-join": "round",
					"line-cap": "round",
				},
				paint: {
					"line-color": "#888",
					"line-width": 5,
				},
			});
			loaded = true;
		});

		$effect(() => {
			if (!map || !loaded) return;
			const center = [$longitude, $latitude] satisfies [number, number];
			const source = map.getSource("suncalc") as GeoJSONSource;

			source.setData({
				type: "GeometryCollection",
				// TODO actual angles for sun position
				// https://github.com/mourner/suncalc?tab=readme-ov-file#sun-position
				geometries: [
					geodrawing.makeCircle(center),
					geodrawing.makeRadius(center, 1),
					geodrawing.makeRadius(center, 2),
				],
			});
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
