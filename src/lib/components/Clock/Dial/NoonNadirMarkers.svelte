<script lang="ts">
	import { DaySectionEnum, type DaySectionId } from "$lib/models/DaySection";
	import type { SuncalcData } from "$lib/models/SuncalcData";
	import { timeToDeg } from "$lib/utils/timeToDeg";
	import * as config from "./config";

	interface Props {
		suncalc: SuncalcData;
		selectedSectionId: DaySectionId | undefined;
		onSectionSelect: (dsId: DaySectionId | undefined) => void;
	}
	const { suncalc, selectedSectionId, onSectionSelect }: Props = $props();
</script>

{#snippet marker(section: Extract<DaySectionEnum, { end: undefined }>)}
	<line
		role="img"
		aria-label={section.name}
		class="time-mark"
		class:selected={selectedSectionId === section.id}
		x1="50%"
		x2="50%"
		y1={config.padding}
		y2={config.padding + config.width}
		transform="rotate({timeToDeg(suncalc[section.start])} {config.hsize} {config.hsize})"
		onfocus={() => onSectionSelect(section.id)}
		onmouseover={() => onSectionSelect(section.id)}
		onmouseleave={() => onSectionSelect(undefined)}
	/>
{/snippet}

<g class="markers">
	{@render marker(DaySectionEnum.noon)}
	{@render marker(DaySectionEnum.nadir)}
</g>

<style>
	.time-mark {
		fill: none;
		stroke-width: 1px;
		stroke: #ff7aff80;
		mix-blend-mode: difference;
		transition: stroke 0.2s ease;
	}
	.time-mark.selected {
		filter: drop-shadow(0 0 3px blue);
	}
</style>
