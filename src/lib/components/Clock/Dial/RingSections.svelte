<script lang="ts">
	import { format } from "date-fns";
	import * as conf from "./config";
	import { colors } from "./config";
	import type { Colorized } from "./helpers";
	import type { ClockSection } from "$lib/models/ClockSection";
	import { colorizeSections } from "./helpers";

	import Hours from "./Hours.svelte";
	import RingSection from "./RingSection.svelte";

	export let sections: ClockSection[] = [];
	export let selectedSection: ClockSection | null;

	let ringSections: Colorized<ClockSection>[];
	$: ringSections = sections?.length ? colorizeSections(sections, $colors) : [];
</script>

<g class="ring-sections">
	{#each ringSections as section}
		<RingSection
			on:sectionMouseOver
			on:sectionMouseLeave
			{section}
			selected={selectedSection === section}
		>
			<desc>
				{section.name}
				{format(section.start, conf.FORMAT)}&mdash;{format(
					section.end,
					conf.FORMAT
				)}
			</desc>
		</RingSection>
	{/each}
</g>
<Hours
	{selectedSection}
	{ringSections}
	on:sectionMouseOver
	on:sectionMouseLeave
/>
