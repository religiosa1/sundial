<script lang="ts">
	import { goto } from "$app/navigation";
	import { AppRouteEnum } from "$lib/enums/AppRouteEnum";
	import { APP_TITLE } from "$lib/constants";
	import { suncalc } from "$lib/stores/suncalc";
	import Time from "$lib/components/Time.svelte";

	$effect(() => {
		const ac = new AbortController();
		document.addEventListener("swipeLeft", () => goto(AppRouteEnum.yearlyView), {
			signal: ac.signal,
		});
		document.addEventListener("swipeRight", () => goto(AppRouteEnum.dialView), {
			signal: ac.signal,
		});
		return () => ac.abort();
	});
</script>

<svelte:head>
	<title>{APP_TITLE} - Table View</title>
</svelte:head>

<div class="table-responsive times-list">
	<table class="table">
		<tbody>
			<tr>
				<th>astronomical twilight</th>
				<td><Time value={$suncalc.nightEnd} /></td>
				<td><Time value={$suncalc.nauticalDawn} /></td>
			</tr>
			<tr>
				<th>nautical twilight</th>
				<td><Time value={$suncalc.nauticalDawn} /></td>
				<td><Time value={$suncalc.dawn} /></td>
			</tr>
			<tr>
				<th>civil twilight</th>
				<td><Time value={$suncalc.dawn} /></td>
				<td><Time value={$suncalc.sunrise} /></td>
			</tr>
			<tr>
				<th>sunrise</th>
				<td><Time value={$suncalc.sunrise} /></td>
				<td><Time value={$suncalc.sunriseEnd} /></td>
			</tr>
			<tr>
				<th>morning golden hour</th>
				<td><Time value={$suncalc.sunriseEnd} /></td>
				<td><Time value={$suncalc.goldenHourEnd} /></td>
			</tr>
			<tr>
				<th>day</th>
				<td><Time value={$suncalc.goldenHourEnd} /></td>
				<td><Time value={$suncalc.goldenHour} /></td>
			</tr>
			<tr>
				<th>noon</th>
				<td colspan="2"><Time value={$suncalc.solarNoon} /></td>
			</tr>
			<tr>
				<th>evening golden hour</th>
				<td><Time value={$suncalc.goldenHour} /></td>
				<td><Time value={$suncalc.sunsetStart} /></td>
			</tr>
			<tr>
				<th>sunset</th>
				<td><Time value={$suncalc.sunsetStart} /></td>
				<td><Time value={$suncalc.sunset} /></td>
			</tr>
			<tr>
				<th>civil twilight</th>
				<td><Time value={$suncalc.sunset} /></td>
				<td><Time value={$suncalc.dusk} /></td>
			</tr>
			<tr>
				<th>nautical twilight</th>
				<td><Time value={$suncalc.dusk} /></td>
				<td><Time value={$suncalc.nauticalDusk} /></td>
			</tr>
			<tr>
				<th>astronomical twilight</th>
				<td><Time value={$suncalc.nauticalDusk} /></td>
				<td><Time value={$suncalc.night} /></td>
			</tr>
			<tr>
				<th>night</th>
				<td><Time value={$suncalc.night} /></td>
				<td><Time value={$suncalc.nightEnd} /></td>
			</tr>
			<tr>
				<th>nadir</th>
				<td colspan="2"><Time value={$suncalc.nadir} /></td>
			</tr>
		</tbody>
	</table>
</div>

<style>
	.times-list {
		max-width: 600px;
		margin: 1rem auto;
	}
	.table {
		margin: auto;
	}

	@media (max-width: 700px) {
		.table {
			font-size: 1.4em;
		}
	}

	@media (max-width: 320px) {
		.table {
			font-size: 1.2em;
		}
	}
</style>
