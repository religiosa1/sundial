<script lang="ts">
	import maplibregl, { GeoJSONSource } from "maplibre-gl";
	import { getMoonPosition, getPosition } from "suncalc";
	import { get } from "svelte/store";
	import { MAP_TILES_STYLE } from "$lib/constants";
	import { suncalc } from "$lib/stores/suncalc";
	import { latitude, longitude } from "$lib/stores/location";
	import { date } from "$lib/stores/date";
	import { formatAltitude, formatAzimuth, getGeoAzimuths } from "./azimuth";
	import * as geodrawing from "./geodrawing";
	import TimeRange from "./TimeRange.svelte";

	let time: Date = $state(new Date());

	const geoAzimuths = $derived(getGeoAzimuths($suncalc, $latitude, $longitude));
	const sunPos = $derived(getPosition(time, $latitude, $longitude));
	const moonPos = $derived(getMoonPosition(time, $latitude, $longitude));
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

						geodrawing.makeAzimuth(center, sunPos.azimuth),
						// geodrawing.makeAzimuth(center, moonPos.azimuth),
					],
				});
			});

			return () => {
				map?.remove();
			};
		}}
	></div>
	<div class="controls">
		<TimeRange bind:value={time} baseDate={$date} />
		<table class="azimuth-table">
			<thead>
				<tr>
					<th></th>
					<th>Azimuth</th>
					<th>Altitude</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">Sun</th>
					<td><span class="table-value azimuth">{formatAzimuth(sunPos.azimuth)}</span></td>
					<td><span class="table-value">{formatAltitude(sunPos.altitude)}</span></td>
				</tr>
				<tr>
					<th scope="row">Moon</th>
					<td><span class="table-value azimuth">{formatAzimuth(moonPos.azimuth)}</span></td>
					<td><span class="table-value">{formatAltitude(moonPos.altitude)}</span></td>
				</tr>
			</tbody>
		</table>
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

	.azimuth-table {
		margin: 0 auto;
	}
	.table-value {
		min-width: 6ch;
		display: inline-block;
		text-align: right;
	}
</style>
