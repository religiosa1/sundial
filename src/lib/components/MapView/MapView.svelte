<script lang="ts">
	import { getMoonPosition, getPosition } from "suncalc";
	import { latitude, longitude } from "$lib/stores/location";
	import { date } from "$lib/stores/date";
	import { formatAltitude, formatAzimuth } from "./azimuth";
	import MapViewMap from "./MapViewMap.svelte";
	import TimeRangeForm from "./TimeRangeForm.svelte";
	import Legend from "./Legend.svelte";
	import AzimuthsCircle from "./AzimuthsCircle/AzimuthsCircle.svelte";
	import { suncalc } from "$lib/stores/suncalc";
	import { getGeoAzimuths } from "./getGeoAzimuths";

	interface Props {
		useGeoJsonRender?: boolean;
	}

	let { useGeoJsonRender }: Props = $props();

	let time: Date = $state(new Date());

	const sunPos = $derived(getPosition(time, $latitude, $longitude));
	const moonPos = $derived(getMoonPosition(time, $latitude, $longitude));
	const geoPos = $derived(getGeoAzimuths($suncalc, $latitude, $longitude));
</script>

<div class="map-view">
	<article class="map-wrap">
		<MapViewMap {sunPos} {moonPos} {useGeoJsonRender} {geoPos} />
		{#if !useGeoJsonRender}
			<div class="map-wrap__azimuths">
				<AzimuthsCircle {sunPos} {moonPos} {geoPos} />
			</div>
		{/if}
		<div class="map-wrap__legend">
			<Legend />
		</div>
	</article>
	<div class="controls">
		<TimeRangeForm bind:value={time} baseDate={$date} />
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

	.map-wrap {
		position: relative;
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.map-wrap__legend {
		flex-shrink: 0;
	}

	.map-wrap__azimuths {
		position: absolute;
		inset: 5%;
	}

	@media (aspect-ratio > 1.2) {
		.map-wrap {
			display: block;
			width: 100%;
			height: 100%;
		}
		.map-wrap__legend {
			position: absolute;
			top: 1em;
			left: 1em;
		}
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
