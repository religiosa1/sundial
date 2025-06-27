<script lang="ts">
	import { format } from "date-fns";
	import type { DaySectionId } from "$lib/models/DaySection";
	import type { ClockSection } from "$lib/components/Clock/Dial/ClockSection";
	import Hours from "./Hours.svelte";
	import RingSection from "./RingSection.svelte";

	interface Props {
		sections: ClockSection[];
		selectedSectionId: DaySectionId | undefined;
		onSectionSelect: (dsId: DaySectionId | undefined) => void;
	}
	const { sections, selectedSectionId, onSectionSelect }: Props = $props();
</script>

<g class="ring-sections">
	{#each sections as section (section.id)}
		<RingSection {section} selected={selectedSectionId === section.id} {onSectionSelect}>
			<desc>
				{section.name}
				{format(section.start, "HH:mm")}&mdash;{format(section.end, "HH:mm")}
			</desc>
		</RingSection>
	{/each}
</g>

<Hours {sections} {selectedSectionId} {onSectionSelect} />
