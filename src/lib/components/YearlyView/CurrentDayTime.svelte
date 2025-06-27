<script lang="ts">
	import { format } from "date-fns";
	import { dayToX, timeToY } from "./coordinates";

	import { conf } from "./yearlyViewBoxConfig";

	interface Props {
		currentTime: Date;
	}
	const { currentTime }: Props = $props();

	const x = $derived(dayToX(currentTime));
	const y = $derived(timeToY(currentTime));
</script>

<g class="current-day-time">
	<text x={conf.lineEndX - 3} y={conf.yPad - 3} class="text">
		{format(currentTime, "yyyy.MM.dd H:mm")}
	</text>
	<line class="line" x1={x} x2={x} y1={conf.lineStartY} y2={conf.lineEndY} />
	<line class="line" x1={conf.lineStartX} x2={conf.lineEndX} y1={y} y2={y} />
</g>

<style>
	.line {
		stroke: var(--clr-highlight);
		stroke-width: 3px;

		@media (width > 1000px) {
			stroke-width: 1px;
		}
	}
	.text {
		font-size: 9px;
		text-anchor: end;
		stroke: var(--clr-highlight);
		stroke-width: 0.5px;
	}
</style>
