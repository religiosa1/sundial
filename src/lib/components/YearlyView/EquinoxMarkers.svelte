<script lang="ts">
	import { conf } from "./yearlyViewBoxConfig";
	import { dayToX } from "./coordinates";
	import { minBy, maxBy } from "$lib/utils/iter";
	import { colors } from "$lib/constants";
	import type { DayLengthInfo } from "./calculateYearValues";

	interface Props {
		days: DayLengthInfo[];
	}
	const { days }: Props = $props();

	const daysDuration = $derived(
		days.map((day) => ({
			date: day.date,
			/** length of day in Y size directly -- used for solstice */
			duration: day.startY - day.endY, // startY is at the bottom, so the value is positive
			/** rate of day to night length -- used for equinox */
			durationRate: Math.abs(0.5 - (day.startY - day.endY) / conf.fieldHeight),
		}))
	);

	const solsticeSummerX = $derived.by(() => {
		const solsticeDay = daysDuration.reduce(maxBy((x) => x.duration));
		return dayToX(solsticeDay.date);
	});
	const solsticeWinterX = $derived.by(() => {
		// TODO: for some reason, the shortes day id 22-d instead of 21-st. While
		// summer solstice is correctly determined to be 21-st. Figure out why.
		const solsticeDay = daysDuration.reduce(minBy((x) => x.duration));
		return dayToX(solsticeDay.date);
	});

	const halfAYearIndex = $derived(Math.floor(daysDuration.length / 2));

	// TODO: equinox calculation isn't particularly accurate, investigate

	// In equinox we're not going over the astronomical defition of "right over the horizon"
	// instead we're looking for day end night to be as much of equal length as possible
	const equinoxSpringX = $derived.by(() => {
		const equinoxDay = daysDuration.slice(0, halfAYearIndex).reduce(minBy((x) => x.durationRate));
		return dayToX(equinoxDay.date);
	});
	const equinoxAutumnX = $derived.by(() => {
		const equinoxDay = daysDuration.slice(halfAYearIndex).reduce(minBy((x) => x.durationRate));
		return dayToX(equinoxDay.date);
	});
</script>

{#snippet line(className: string, x: number, color: string)}
	<line class={className} stroke={color} x1={x} x2={x} y1={conf.lineStartY} y2={conf.lineEndY} />
{/snippet}

<g class="equinox-markers">
	{@render line("equinox-line equinox spring", equinoxSpringX, colors.dayStop)}
	{@render line("equinox-line solstice summer", solsticeSummerX, colors.sunriseStop)}
	{@render line("equinox-line equinox autumn", equinoxAutumnX, colors.dayStop)}
	{@render line("equinox-line solstice winter", solsticeWinterX, colors.nauticalTwilightStart)}
</g>

<style>
	.equinox-line {
		stroke-width: 2px;
		/* stroke-dasharray: 5px 3px 1px 3px; */
		opacity: 0.61;

		@media (width > 1000px) {
			stroke-width: 1px;
		}
	}
</style>
