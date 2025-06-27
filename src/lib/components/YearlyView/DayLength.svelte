<script lang="ts">
	import { setDayOfYear } from "date-fns";
	import suncalc from "suncalc";
	import { range } from "$lib/utils/range";
	import { dayToX, timeToY } from "./coordinates";
	import { conf } from "./yearlyViewBoxConfig";

	interface Props {
		latitude: number;
		longitude: number;
	}
	const { latitude, longitude }: Props = $props();

	const days = $derived(
		Array.from(range(364), (_, i) => {
			const d = setDayOfYear(new Date(new Date().getFullYear(), 0, 1), i + 1);
			const t = suncalc.getTimes(d, latitude, longitude);

			let startY = timeToY(t.sunrise);
			let endY = timeToY(t.sunset);
			if (!isDefinedLength(startY, endY)) {
				const sunpos = suncalc.getPosition(d, latitude, longitude);
				if (sunpos.altitude > 0) {
					startY = conf.yPad;
					endY = conf.fieldHeight;
				}
			}
			const data = {
				date: d,
				x: dayToX(d),
				startY,
				endY,
				noonY: timeToY(t.solarNoon),
			};

			return data;
		})
	);

	function isDefinedLength(startY: number, endY: number): boolean {
		return Number.isFinite(startY) && Number.isFinite(endY);
	}
</script>

<g class="days">
	{#each days as day (day.date)}
		{#if Number.isFinite(day.startY)}
			<line class="hour-line" x1={day.x} x2={day.x} y1={day.startY} y2={day.endY} />
			<circle class="marker marker_start" cx={day.x} cy={day.startY} r="1" />
			<circle class="marker marker_end" cx={day.x} cy={day.endY} r="1" />
		{/if}
		<circle class="marker marker_noon" cx={day.x} cy={day.noonY} r="1" />
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
