<script lang="ts">
	import maplibregl, { GeoJSONSource } from "maplibre-gl";
	import { get } from "svelte/store";
	import { MAP_TILES_STYLE } from "$lib/constants";
	import { suncalc } from "$lib/stores/suncalc";
	import { latitude, longitude } from "$lib/stores/location";
	import { currentTime } from "$lib/stores/currentTime";
	import { getGeoAzimuths } from "./getGeoAzimuths";
	import * as geodrawing from "./geodrawing";
	import { getPosition } from "suncalc";
	import { date } from "$lib/stores/date";

	let hours = $state(12);
	const time = $derived.by(() => {
		const d = new Date($date);
		const minutes = 60 * (hours - Math.floor(hours));
		const seconds = 60 * (minutes - Math.floor(minutes));
		const ms = 1000 * (seconds - Math.floor(seconds));
		d.setHours(Math.floor(hours), Math.floor(minutes), Math.floor(seconds), Math.floor(ms));
		return d;
	});

	const geoAzimuths = $derived(getGeoAzimuths($suncalc, $latitude, $longitude));
	const currentTimePos = $derived(getPosition($currentTime, $latitude, $longitude));
	const selectedTimePos = $derived(getPosition(time, $latitude, $longitude));
</script>

<div class="map-view">
	<div
		class="map-container"
		{@attach (element) => {
			const map = new maplibregl.Map({
				container: element,
				style: MAP_TILES_STYLE,
				center: [get(longitude), get(latitude)], // starting position [lng, lat]
				zoom: 16, // starting zoom to accomodate our 300m radius -- empirical, check against docs
				attributionControl: false,
				interactive: false,
			});
			map.addControl(new maplibregl.AttributionControl(), "bottom-left");

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
					geometries: [
						geodrawing.makeCircle(center),

						geodrawing.makeAzimuth(center, geoAzimuths.dawn),
						geodrawing.makeAzimuth(center, geoAzimuths.sunriseStart),
						geodrawing.makeAzimuth(center, geoAzimuths.sunriseEnd),
						geodrawing.makeAzimuth(center, geoAzimuths.morningGoldenHour),

						geodrawing.makeAzimuth(center, geoAzimuths.noon),

						geodrawing.makeAzimuth(center, geoAzimuths.eveningGoldenHour),
						geodrawing.makeAzimuth(center, geoAzimuths.sunsetStart),
						geodrawing.makeAzimuth(center, geoAzimuths.sunsetEnd),
						geodrawing.makeAzimuth(center, geoAzimuths.dusk),

						geodrawing.makeAzimuth(center, currentTimePos.azimuth),
						geodrawing.makeAzimuth(center, selectedTimePos.azimuth),
					],
				});
			});

			return () => {
				map?.remove();
			};
		}}
	></div>
	<div class="controls">
		<input type="range" min={0} max={24} bind:value={hours} step={0.0001} />
		{time.toLocaleString()}
		{$currentTime.toLocaleString()}
	</div>
</div>

<style>
	.map-view {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	.map-container {
		width: 100%;
		height: 100%;
	}
</style>
