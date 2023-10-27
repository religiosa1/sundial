<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import * as conf from "./config";
	import type { ClockSection } from "$lib/models/ClockSection";
	import { range } from "$lib/utils/range";

	export let selectedSection: ClockSection | null;
	export let ringSections: ClockSection[];

	const dispatch = createEventDispatcher();

	function findSectionByDegree(d: number, sections: ClockSection[]) {
		if (!Array.isArray(sections)) return null;
		return sections.find((i) => {
			if (i.startDeg <= i.endDeg) {
				return i.startDeg <= d && d < i.endDeg;
			} else {
				return i.startDeg <= d || d < i.endDeg;
			}
		});
	}

	$: hours = Array.from(range(24)).map((h) => {
		const degree = 15 * h;
		return {
			value: h,
			degree,
			section: findSectionByDegree(degree, ringSections),
		};
	});
</script>

<g class="hours">
	{#each hours as hour}
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<g
			class="hour"
			class:highlight={selectedSection && hour.section === selectedSection}
			on:mouseover={() => dispatch("sectionMouseOver", hour.section)}
			on:mouseleave={() => dispatch("sectionMouseLeave")}
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
