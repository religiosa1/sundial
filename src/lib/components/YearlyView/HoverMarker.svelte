<script lang="ts">
	import { format } from "date-fns";
	import { conf } from "./yearlyViewBoxConfig";
	import { coordinatesToDatetime } from "$lib/components/YearlyView/coordinates";

	interface Props {
		mouseOverPosition: { x: number; y: number } | undefined;
	}
	const { mouseOverPosition }: Props = $props();

	const position = $derived.by(() =>
		mouseOverPosition ? { x: mouseOverPosition.x, y: mouseOverPosition.y } : undefined
	);
	const hoveredTime = $derived(
		position ? coordinatesToDatetime(position.x, position.y) : undefined
	);

	const insideField = $derived(
		position && conf.yPad <= position.y && position.y < conf.fieldHeight
	);
</script>

{#if position && insideField}
	<g class="hovered-time-marker">
		{#if hoveredTime}
			<text x={conf.lineStartX + 3} y={conf.yPad - 3} class="text">
				{format(hoveredTime, "yyyy.MM.dd H:mm")}
			</text>
		{/if}
		<line class="line" x1={position.x} x2={position.x} y1={conf.yPad} y2={conf.fieldHeight} />
		<line class="line" x1={conf.lineStartX} x2={conf.lineEndX} y1={position.y} y2={position.y} />
	</g>
{/if}

<style>
	.line {
		stroke: #ff00ff;
		stroke-width: 1px;
	}
	.text {
		font-size: 9px;
		text-anchor: start;
		stroke: #ff00ff;
		stroke-width: 0.5px;
	}
</style>
