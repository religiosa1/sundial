<script lang="ts">
	import type { DayLengthInfo } from "./calculateYearValues";

	interface Props {
		days: DayLengthInfo[];
	}
	const { days }: Props = $props();
</script>

<g class="days">
	{#each days as day (day.date)}
		{#if Number.isFinite(day.startY)}
			<line class="hour-line" x1={day.x} x2={day.x} y1={day.startY} y2={day.endY} />
			<circle class="marker marker_start" cx={day.x} cy={day.startY} r="1" />
			<circle class="marker marker_end" cx={day.x} cy={day.endY} r="1" />
		{/if}
		{#if Number.isFinite(day.noonY)}
			<circle class="marker marker_noon" cx={day.x} cy={day.noonY} r="1" />
		{/if}
	{/each}
</g>

<style>
	.hour-line {
		stroke: var(--clr-txt);
		stroke-width: 1px;
	}
	.marker {
		stroke: var(--clr-txt);
		fill: var(--clr-txt);
	}
</style>
