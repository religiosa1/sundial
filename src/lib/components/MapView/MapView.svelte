<script lang="ts">
	import { getMoonPosition, getPosition } from "suncalc";
	import { suncalc } from "$lib/stores/suncalc";
	import { latitude, longitude } from "$lib/stores/location";
	import { date } from "$lib/stores/date";
	import AzimuthsCircle from "./AzimuthsCircle/AzimuthsCircle.svelte";
	import { formatAltitude, formatAzimuth } from "./azimuth";
	import MapViewMap from "./MapViewMap.svelte";
	import TimeRangeForm from "./TimeRangeForm.svelte";
	import Legend from "./Legend.svelte";
	import { getGeoAzimuths } from "./getGeoAzimuths";

	let time: Date = $state(new Date());

	const sunPos = $derived(getPosition(time, $latitude, $longitude));
	const moonPos = $derived(getMoonPosition(time, $latitude, $longitude));
	const geoPos = $derived(getGeoAzimuths($suncalc, $latitude, $longitude));
</script>

<div class="map-view">
	<article class="map-block">
		<div class="map-wrap">
			<MapViewMap />
			<div class="map-wrap__azimuths">
				<AzimuthsCircle {sunPos} {moonPos} {geoPos} />
			</div>
		</div>
		<div class="map-block__legend">
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
		padding-top: 45px;
		padding-bottom: 55px;
	}

	@media (width > 600px) {
		.map-view {
			padding: 0;
		}
	}
	.controls {
		padding: 0 1em;
	}

	.map-block {
		position: relative;
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.map-block__legend {
		flex-shrink: 0;
	}

	@media (aspect-ratio > 1.2) {
		.map-block {
			display: block;
			width: 100%;
			height: 100%;
		}
		.map-block__legend {
			position: absolute;
			top: 1em;
			left: 1em;
			z-index: 100;
		}
	}

	.map-wrap {
		position: relative;
		display: flex;
		width: 100%;
		height: 100%;
	}

	.map-wrap__azimuths {
		position: absolute;
		inset: 5%;
	}

	.azimuth-table {
		margin: 0 auto;
	}
	.table-value {
		min-width: 6ch;
		display: inline-block;
		text-align: right;
	}

	/* Phone in landscape view or ultrawide monitors -- displaying everything left to right*/
	@media (orientation: landscape) and (aspect-ratio > 1.7) and (width > 600px) {
		.map-view {
			flex-direction: row;
			/* Some space for menu */
			padding-right: 70px;
			/* And for about link in the bottom */
			padding-bottom: 10px;
		}

		.map-block {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: stretch;
		}

		.map-block__legend {
			order: -1;
			position: relative;
			inset: 0;
		}
	}
</style>
