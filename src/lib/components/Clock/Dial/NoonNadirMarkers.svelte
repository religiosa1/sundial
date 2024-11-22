<script lang="ts">
	import type { SuncalcData } from "$lib/models/SuncalcData";
	import { timeToDeg } from "$lib/utils/timeToDeg";
	import type { ClockSection } from "./ClockSection";
	import * as config from "./config";

	interface Props {
		suncalc: SuncalcData;
		onSectionSelect: (s: ClockSection | undefined) => void;
	}
	const { suncalc, onSectionSelect }: Props = $props();
</script>

{#snippet marker(name: string, time: Date, className: string)}
	{@const section: ClockSection = {
		id: "dawn",
		name,
		start: time,
		end: time,
		startDeg: timeToDeg(time),
		endDeg: timeToDeg(time),
		color: "",
		overspanned: false,
	}}
	<line
		role="img"
		aria-label={name}
		class={"time-mark " + className}
		x1="50%"
		x2="50%"
		y1={config.padding}
		y2={config.padding + config.width}
		transform="rotate({timeToDeg(time)} {config.hsize} {config.hsize})"
		onfocus={() => onSectionSelect(section)}
		onmouseover={() => onSectionSelect(section)}
		onmouseleave={() => onSectionSelect(undefined)}
	/>
{/snippet}

<g class="markers">
	{@render marker("noon", suncalc.solarNoon, "time-mark-noon")}
	{@render marker("nadir", suncalc.nadir, "time-mark-nadir")}
</g>

<style>
	.time-mark {
		fill: none;
		stroke-width: 1px;
		stroke: #ff7aff80;
		mix-blend-mode: difference;
		transition: stroke 0.2s ease;
	}
</style>
