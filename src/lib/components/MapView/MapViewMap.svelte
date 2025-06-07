<script lang="ts">
	import maplibregl, { type GeoJSONSource, type LayerSpecification } from "maplibre-gl";
	import type { Geometry } from "geojson";
	import type { GetMoonPositionResult, GetSunPositionResult } from "suncalc";
	import { get } from "svelte/store";
	import { MAP_TILES_STYLE } from "$lib/constants";
	import { suncalc } from "$lib/stores/suncalc";
	import { latitude, longitude } from "$lib/stores/location";
	import * as geodrawing from "./geodrawing";
	import { getGeoAzimuths } from "./azimuth";

	interface Props {
		sunPos: GetSunPositionResult;
		moonPos: GetMoonPositionResult;
	}

	let { sunPos, moonPos }: Props = $props();

	const SourceNameEnum = {
		Base: "suncalc",
		GoldenHour: "goldenhour",
		CivilTwilight: "civil_twilight",
		SunriseSunset: "sunrise_sunset",
		NoonMarker: "noon_marker",
		SunMarker: "sun_marker",
		MoonMarker: "moon_marker",
	} as const;
	type SourceNameEnum = (typeof SourceNameEnum)[keyof typeof SourceNameEnum];

	const geoPos = $derived(getGeoAzimuths($suncalc, $latitude, $longitude));
	const sunVisible = $derived(sunPos.altitude > 0);
	const moonVisible = $derived(moonPos.altitude > 0);

	const center = $derived([$longitude, $latitude] satisfies [number, number]);
</script>

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

		$effect(() => {
			map.panTo([$longitude, $latitude]);
		});

		map.on("style.load", () => {
			// Because of transition MapGL determines size incorrectly? Needs a manual resize.
			map.resize();
		});

		let loaded = $state(false);

		map.on("load", () => {
			addSource(SourceNameEnum.Base);
			addSource(SourceNameEnum.GoldenHour, {
				"line-color": "#ffd844",
			});
			addSource(SourceNameEnum.CivilTwilight, {
				"line-color": "#bbccff",
			});
			addSource(SourceNameEnum.SunriseSunset, {
				"line-color": "#ffa800",
			});
			addSource(SourceNameEnum.NoonMarker, {
				"line-color": "#888",
			});
			addSource(SourceNameEnum.SunMarker, {
				"line-color": "#ff7000",
				...(sunVisible ? null : { "line-dasharray": [1, 3] }),
			});
			addSource(SourceNameEnum.MoonMarker, {
				"line-color": "#000033",
				...(moonVisible ? null : { "line-dasharray": [1, 3] }),
			});
			loaded = true;
		});

		$effect(() => {
			if (!loaded) return;

			$effect(() => {
				setGeometry(SourceNameEnum.Base, geodrawing.makeCircle(center));
				setGeometry(SourceNameEnum.NoonMarker, geodrawing.makeAzimuth(center, geoPos.noon));

				setGeometry(
					SourceNameEnum.GoldenHour,
					geodrawing.makeCircleSection(center, geoPos.sunriseEnd, geoPos.morningGoldenHour),
					geodrawing.makeCircleSection(center, geoPos.eveningGoldenHour, geoPos.sunsetStart)
				);

				setGeometry(
					SourceNameEnum.CivilTwilight,
					geodrawing.makeCircleSection(center, geoPos.dawn, geoPos.sunriseStart),
					geodrawing.makeCircleSection(center, geoPos.sunsetEnd, geoPos.dusk)
				);

				setGeometry(
					SourceNameEnum.SunriseSunset,
					geodrawing.makeCircleSection(center, geoPos.sunriseStart, geoPos.sunriseEnd),
					geodrawing.makeCircleSection(center, geoPos.sunsetStart, geoPos.sunsetEnd)
				);
			});

			$effect(() => {
				setGeometry(SourceNameEnum.SunMarker, geodrawing.makeAzimuth(center, sunPos.azimuth));
			});

			$effect(() => {
				setGeometry(SourceNameEnum.MoonMarker, geodrawing.makeAzimuth(center, moonPos.azimuth));
			});

			$effect(() => {
				map.setPaintProperty(
					SourceNameEnum.SunMarker,
					"line-dasharray",
					sunVisible ? undefined : [1, 3],
					{ validate: false }
				);
			});
			$effect(() => {
				map.setPaintProperty(
					SourceNameEnum.MoonMarker,
					"line-dasharray",
					moonVisible ? undefined : [1, 3],
					{ validate: false }
				);
			});
		});

		function addSource(sourceName: SourceNameEnum, paint?: LayerSpecification["paint"]) {
			map.addSource(sourceName, {
				type: "geojson",
				data: {
					type: "GeometryCollection",
					geometries: [],
				},
			});
			map.addLayer({
				id: sourceName,
				type: "line",
				source: sourceName,
				layout: {
					"line-join": "round",
					"line-cap": "round",
				},
				paint: {
					"line-color": "#888",
					"line-width": 5,
					...paint,
				},
			});
		}

		function setGeometry(sourceId: SourceNameEnum, ...geometries: Geometry[]) {
			const source = map.getSource(sourceId) as GeoJSONSource;
			source.setData({
				type: "GeometryCollection",
				geometries,
			});
		}

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
