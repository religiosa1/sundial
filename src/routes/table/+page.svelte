<script lang="ts">
	import { APP_TITLE } from "#lib/constants.js";
	import { AppRouteEnum } from "#lib/enums/AppRouteEnum.js";
	import type { SunTimeKey } from "#lib/models/SuncalcData.js";
	import { suncalc } from "#lib/stores/suncalc.js";
	import { currentTime } from "#lib/stores/currentTime.js";
	import { latitude, longitude } from "#lib/stores/location.js";
	import { date } from "#lib/stores/date.js";

	import Time from "#lib/components/Time.svelte";
	import PlaceTimeInfo from "#lib/components/Clock/LocationInfo.svelte";
	import CurrentTime from "#lib/components/Clock/TimeDisplay.svelte";
	import { DaySectionEnum } from "#lib/models/DaySection.js";
	import { useSwipeNavigation } from "#lib/actions/swipe.svelte.js";

	useSwipeNavigation(AppRouteEnum.dialView, AppRouteEnum.yearlyView);

	function isBetweenDates(date: Date, start: Date | null, end: Date | null): boolean {
		// null would be coerced to 0 in comparisons
		if (!start || !end) return false;
		// Special case for night value
		if (start > end) {
			return date >= start || date < end;
		}
		return start <= date && date < end;
	}
</script>

<svelte:head>
	<title>{APP_TITLE} - Table View</title>
</svelte:head>

<CurrentTime compact time={$currentTime} date={$date} />
<PlaceTimeInfo latitude={$latitude} longitude={$longitude} />

<div class="table-responsive times-list">
	<table class="table" aria-label="Daylight phases for the date {$date}">
		<tbody>
			{#snippet rangeEntry(section: Extract<DaySectionEnum, { end: SunTimeKey }>)}
				{@const start = $suncalc[section.start]}
				{@const end = $suncalc[section.end]}
				{@const isCurrent = isBetweenDates($currentTime, start, end)}
				<tr class:current={isCurrent} aria-current={isCurrent || undefined}>
					<th scope="row">{section.name}</th>
					<td><Time value={start} /></td>
					<td><Time value={end} /></td>
				</tr>
			{/snippet}
			{#snippet pointEntry(section: Extract<DaySectionEnum, { end: undefined }>)}
				<tr>
					<th scope="row">{section.name}</th>
					<td colspan="2"><Time value={$suncalc[section.start]} /></td>
				</tr>
			{/snippet}
			{@render rangeEntry(DaySectionEnum.astronomicalTwilightMorning)}
			{@render rangeEntry(DaySectionEnum.nauticalDawn)}
			{@render rangeEntry(DaySectionEnum.dawn)}
			{@render rangeEntry(DaySectionEnum.sunrise)}
			{@render rangeEntry(DaySectionEnum.goldenHourMorning)}
			{@render rangeEntry(DaySectionEnum.day)}
			{@render pointEntry(DaySectionEnum.noon)}

			{@render rangeEntry(DaySectionEnum.goldenHourEvening)}
			{@render rangeEntry(DaySectionEnum.sunset)}
			{@render rangeEntry(DaySectionEnum.dusk)}
			{@render rangeEntry(DaySectionEnum.nauticalDusk)}
			{@render rangeEntry(DaySectionEnum.astronomicalTwilightEveing)}
			{@render rangeEntry(DaySectionEnum.night)}
			{@render pointEntry(DaySectionEnum.nadir)}
		</tbody>
	</table>
</div>

<style>
	.times-list {
		max-width: 600px;
		margin: 0 auto;
	}
	.table {
		margin: auto;
	}

	.table th {
		padding-left: 8px;
	}
	.current th {
		position: relative;
	}
	.current th::after {
		content: "";
		position: absolute;
		width: 4px;
		left: 0;
		top: 0;
		bottom: 0;
		background: var(--clr-highlight);
	}

	@media (max-width: 700px) {
		.table {
			font-size: 1.2em;
		}
	}
</style>
