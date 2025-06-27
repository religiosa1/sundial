<script lang="ts">
	import type { DaySectionId } from "$lib/models/DaySection";
	import { range } from "$lib/utils/range";

	import type { ClockSection } from "./ClockSection";

	import * as conf from "./config";

	interface Props {
		sections: ClockSection[];
		selectedSectionId: DaySectionId | undefined;
		onSectionSelect: (dsId: DaySectionId | undefined) => void;
	}
	const { sections, selectedSectionId, onSectionSelect }: Props = $props();

	function findSectionByDegree(d: number, sections: ClockSection[]): ClockSection | undefined {
		if (!Array.isArray(sections)) return undefined;
		return sections.find((i) => {
			if (i.startDeg <= i.endDeg) {
				return i.startDeg <= d && d < i.endDeg;
			} else {
				return i.startDeg <= d || d < i.endDeg;
			}
		});
	}

	const hours = $derived(
		Array.from(range(24)).map((h) => {
			const degree = 15 * h;
			return {
				value: h,
				degree,
				section: findSectionByDegree(degree, sections),
			};
		})
	);
</script>

<g class="hours">
	{#each hours as hour (hour.value)}
		<g
			role="img"
			aria-label="{hour.value} hour mark"
			class="hour"
			class:highlight={selectedSectionId && hour.section?.id === selectedSectionId}
			onfocus={() => onSectionSelect(hour.section?.id)}
			onmouseover={() => onSectionSelect(hour.section?.id)}
			onmouseleave={() => onSectionSelect(undefined)}
		>
			<line
				class="hour-line"
				x1="50%"
				x2="50%"
				y1={conf.padding}
				y2={conf.padding + 3}
				transform="rotate({hour.degree} {conf.hsize} {conf.hsize})"
			/>
			<text
				x="50%"
				y={conf.padding + 14}
				transform="rotate({hour.degree} {conf.hsize} {conf.hsize})"
				class="hour-label"
			>
				{hour.value}
			</text>
		</g>
	{/each}
</g>

<style>
	.hour-line {
		fill: none;
		stroke-width: 1px;
		stroke: #ff7aff80;
		mix-blend-mode: difference;
		transition: stroke 0.2s ease;
	}

	.hour-label {
		font-size: 9px;
		text-anchor: middle;
		mix-blend-mode: difference;
		fill: #aff;
		stroke: none;
		stroke-width: 0;
		transition: fill 0.2s ease;
	}
	.hour.highlight .hour-label {
		fill: #fff;
	}
	.hour.highlight .hour-line {
		stroke: #ff7affff;
	}
</style>
