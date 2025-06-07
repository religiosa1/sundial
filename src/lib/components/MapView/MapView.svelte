<script lang="ts">
	import { getMoonPosition, getPosition } from "suncalc";
	import { latitude, longitude } from "$lib/stores/location";
	import { date } from "$lib/stores/date";
	import { formatAltitude, formatAzimuth } from "./azimuth";
	import MapViewMap from "./MapViewMap.svelte";
	import TimeRange from "./TimeRange.svelte";

	let time: Date = $state(new Date());

	const sunPos = $derived(getPosition(time, $latitude, $longitude));
	const moonPos = $derived(getMoonPosition(time, $latitude, $longitude));
</script>

<div class="map-view">
	<MapViewMap {sunPos} {moonPos} />
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
	.azimuth-table {
		margin: 0 auto;
	}
	.table-value {
		min-width: 6ch;
		display: inline-block;
		text-align: right;
	}
</style>
