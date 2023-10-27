<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { format } from "date-fns";
	import * as conf from "./config";
	import { colors } from "./config";
	import { calculatePath } from "./helpers";
	import type { ClockSection } from "$lib/models/ClockSection";
	import { colorizeSections } from "./helpers";

	import Hours from "./Hours.svelte";

	export let sections: ClockSection[] = [];
	export let selectedSection: ClockSection | null;

	const dispatch = createEventDispatcher();

	let ringSections: ClockSection[];
	$: ringSections = sections?.length ? colorizeSections(sections, $colors) : [];
</script>

<g class="ring-sections">
	{#each ringSections as section}
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<path
			id={section.id}
			d={calculatePath(section)}
			stroke={section.stroke}
			class={"ring-section ring-section-" + section.id}
			class:highlight={selectedSection === section}
			on:mouseover={() => dispatch("sectionMouseOver", section)}
			on:mouseleave={() => dispatch("sectionMouseLeave")}
		>
			<desc>
				{section.name}
				{#if section.time}
					{format(section.time, conf.FORMAT)}
				{:else}
					{format(section.start, conf.FORMAT)}&mdash;{format(
						section.end,
						conf.FORMAT
					)}
				{/if}
			</desc>
		</path>
	{/each}
</g>
<Hours
	{selectedSection}
	{ringSections}
	on:sectionMouseOver
	on:sectionMouseLeave
/>

<style>
	.ring-section {
		stroke-width: 20px;
		fill: none;
	}
	.ring-section.highlight {
		filter: drop-shadow(0 0 2px blue);
	}
</style>
