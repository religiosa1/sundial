<script lang="ts">
	import maplibregl, { type GeoJSONSource } from "maplibre-gl";
	import type { Geometry } from "geojson";
	import type { GetMoonPositionResult, GetSunPositionResult } from "suncalc";
	import { get } from "svelte/store";
	import { MAP_TILES_STYLE } from "$lib/constants";
	import { suncalc } from "$lib/stores/suncalc";
	import { latitude, longitude } from "$lib/stores/location";
	import * as geodrawing from "./geodrawing";
	import { getGeoAzimuths } from "./azimuth";
	import { FILL_OPACITY, getSectionColor, SourceNameEnum } from "./sectionsConfig";

	interface Props {
		sunPos: GetSunPositionResult;
		moonPos: GetMoonPositionResult;
	}

	let { sunPos, moonPos }: Props = $props();

	const DASHARRAY = [1, 3];

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
			addSource(SourceNameEnum.Base, { omitFill: true });
			addSource(SourceNameEnum.GoldenHour);
			addSource(SourceNameEnum.CivilTwilight);
			addSource(SourceNameEnum.Sunrise);
			addSource(SourceNameEnum.Sunset);
			addSource(SourceNameEnum.NoonMarker, { omitFill: true });
			addSource(SourceNameEnum.SunMarker, {
				dashed: !sunVisible,
				omitFill: true,
			});
			addSource(SourceNameEnum.MoonMarker, {
				dashed: !moonVisible,
				omitFill: true,
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
					SourceNameEnum.Sunrise,
					geodrawing.makeCircleSection(center, geoPos.sunriseStart, geoPos.sunriseEnd)
				);
				setGeometry(
					SourceNameEnum.Sunset,
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
					moonVisible ? undefined : DASHARRAY,
					{ validate: false }
				);
			});
		});

		function addSource(
			sourceName: SourceNameEnum,
			{ dashed, omitFill }: { dashed?: boolean; omitFill?: boolean } = {}
		) {
			map.addSource(sourceName, {
				type: "geojson",
				data: {
					type: "GeometryCollection",
					geometries: [],
				},
			});
			const color = getSectionColor(sourceName);
			map.addLayer({
				id: sourceName,
				type: "line",
				source: sourceName,
				layout: {
					"line-join": "round",
					"line-cap": "round",
				},
				paint: {
					...(dashed ? { "line-dasharray": DASHARRAY } : null),
					"line-color": color,
					"line-width": 5,
				},
			});
			if (!omitFill) {
				map.addLayer({
					id: sourceName + "_fill",
					type: "fill",
					source: sourceName,
					paint: {
						"fill-color": color,
						"fill-opacity": FILL_OPACITY,
					},
				});
			}
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
