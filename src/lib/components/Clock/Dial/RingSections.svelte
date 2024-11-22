<script lang="ts">
	import { format } from "date-fns";
	import type { ClockSection } from "$lib/components/Clock/Dial/ClockSection";
	import Hours from "./Hours.svelte";
	import RingSection from "./RingSection.svelte";

	interface Props {
		sections: ClockSection[];
		selectedSection: ClockSection | undefined;
		onSectionSelect: (s: ClockSection | undefined) => void;
	}
	const { sections, selectedSection, onSectionSelect }: Props = $props();
</script>

<g class="ring-sections">
	{#each sections as section}
		<RingSection {section} selected={selectedSection?.id === section.id} {onSectionSelect}>
			<desc>
				{section.name}
				{format(section.start, "HH:mm")}&mdash;{format(section.end, "HH:mm")}
			</desc>
		</RingSection>
	{/each}
</g>

<Hours {selectedSection} {sections} {onSectionSelect} />
