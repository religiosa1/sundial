<script lang="ts">
	import { timeToY } from "$lib/components/YearlyView/coordinates";
	import { conf } from "./yearlyViewBoxConfig";

	const baseDate = new Date();
	const baseYear = baseDate.getFullYear();
	const baseMonth = baseDate.getMonth();
	const baseDay = baseDate.getDay();
</script>

<g class="hours">
	{#each { length: 24 } as _, hour}
		{@const y = timeToY(new Date(baseYear, baseMonth, baseDay, hour))}
		<line class="hour-line" x1={conf.lineStartX} x2={conf.lineEndX} y1={y} y2={y} />
		<text x={conf.xPad} {y} class="hour-label">
			{hour.toString().padStart(2, "0")}
		</text>
	{/each}
</g>

<style>
	.hour-line {
		stroke: var(--clr-txt);
		stroke-width: 1px;
		stroke-dasharray: 1px;
	}
	.hour-label {
		font-size: 9px;
		text-anchor: start;
		stroke: var(--clr-txt);
		stroke-width: 0.5px;
	}
</style>
