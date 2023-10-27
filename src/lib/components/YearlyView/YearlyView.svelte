<script lang="ts">
	import HourMarkers from "./HourMarkers.svelte";
	import DayLength from "./DayLength.svelte";
	import MonthMarkers from "./MonthMarkers.svelte";
	import CurrentDayTime from "./CurrentDayTime.svelte";
	import * as conf from "./yearlyViewBoxConfig";
</script>

<svg
	class="year"
	viewBox="0 0 {conf.width} {conf.height}"
	xmlns="http://www.w3.org/2000/svg"
>
	<desc>Daytime duration in a year</desc>
	<HourMarkers />
	<MonthMarkers />
	<CurrentDayTime />
	<DayLength />
</svg>

<style>
	.year {
		display: block;
		max-width: calc(100vw - 20px);
		margin: auto;
	}
	@media (min-width: 1000px) {
		.year {
			max-width: calc(100vw - 100px);
		}
	}
	@media (min-width: 1200px) {
		.year {
			max-width: calc(100vw - 200px);
		}
	}
</style>
