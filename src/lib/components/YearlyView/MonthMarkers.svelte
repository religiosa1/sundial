<script lang="ts">
	import { endOfMonth } from "date-fns";
	import { range } from "$lib/utils/range";
	import { dayToX } from "./coordinates";
	import { conf, monthNames } from "./yearlyViewBoxConfig";

	const months = $derived(
		Array.from(range(12), (i) => {
			const startDate = new Date(new Date().getFullYear(), i, 1);
			const endDate = endOfMonth(startDate);
			return {
				idx: i,
				start: dayToX(startDate),
				end: dayToX(endDate),
			};
		})
	);
</script>

<g class="months">
	{#each months as month, index}
		{#if index < months.length - 1}
			<line class="month-line" x1={month.end} x2={month.end} y1={conf.yPad} y2={conf.lineEndY} />
		{/if}
		<text x={(month.end + month.start) / 2} y={conf.lineEndY + conf.yPad * 0.8} class="month-label">
			{monthNames[month.idx]}
		</text>
	{/each}
</g>

<style>
	.month-line {
		stroke: var(--clr-txt);
		stroke-width: 1px;
		stroke-dasharray: 1px;
	}
	.month-label {
		font-size: 9px;
		text-anchor: middle;
		stroke: var(--clr-txt);
		stroke-width: 1;
	}
</style>
