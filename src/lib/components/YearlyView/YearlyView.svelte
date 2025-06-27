<script lang="ts">
	import HourMarkers from "./HourMarkers.svelte";
	import DayLength from "./DayLength.svelte";
	import MonthMarkers from "./MonthMarkers.svelte";
	import CurrentDayTime from "./CurrentDayTime.svelte";
	import { conf } from "./yearlyViewBoxConfig";
	import HoverMarker from "$lib/components/YearlyView/HoverMarker.svelte";

	interface Props {
		currentTime: Date;
		latitude: number;
		longitude: number;
	}
	const { currentTime, latitude, longitude }: Props = $props();

	let mouseOverPosition: { x: number; y: number } | undefined = $state();
</script>

<svg
	role="img"
	class="year"
	viewBox="0 0 
	{conf.width} 
	{conf.height}"
	onmousemove={(e) => {
		mouseOverPosition = {
			x: (e.offsetX / e.currentTarget.clientWidth) * conf.width,
			y: (e.offsetY / e.currentTarget.clientHeight) * conf.height,
		};
	}}
	onmouseleave={() => {
		mouseOverPosition = undefined;
	}}
	xmlns="http://www.w3.org/2000/svg"
>
	<desc>Daytime duration in a year</desc>
	<HourMarkers />
	<MonthMarkers />
	<HoverMarker {mouseOverPosition} />
	<DayLength {latitude} {longitude} />
	<CurrentDayTime {currentTime} />
</svg>

<style>
	.year {
		display: block;
		margin: auto;

		/* mobile landscape */
		@media (width > 600px) {
			padding-right: 75px;
		}
		/* Just wide screens */
		@media (width > 1000px) {
			padding-right: 0;
			max-width: calc(100vw - 100px);
		}
		@media (width > 1200px) {
			max-width: calc(100vw - 200px);
		}
	}
</style>
