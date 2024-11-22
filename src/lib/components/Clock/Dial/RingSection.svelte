<script lang="ts">
	import type { Snippet } from "svelte";
	import type { ClockSection } from "./ClockSection";
	import { calculatePath } from "./helpers";
	import * as config from "./config";

	interface Props {
		section: ClockSection;
		selected: boolean;
		children: Snippet;
		onSectionSelect: (s: ClockSection | undefined) => void;
	}
	const { section, selected, children, onSectionSelect }: Props = $props();
</script>

{#if section.endDeg !== section.startDeg}
	<path
		role="img"
		aria-label={section.name}
		id={section.id}
		d={calculatePath(section)}
		stroke={section.color}
		class={"ring-section ring-section-" + section.id}
		class:highlight={selected}
		onfocus={() => onSectionSelect(section)}
		onmouseover={() => onSectionSelect(section)}
		onmouseleave={() => onSectionSelect(undefined)}
	>
		{@render children()}
	</path>
{:else}
	<circle
		role="img"
		aria-label={section.name}
		id={section.id}
		cx={config.hsize}
		cy={config.hsize}
		r={config.radius}
		stroke={section.color}
		class={"ring-section ring-section-" + section.id}
		class:highlight={selected}
		onfocus={() => onSectionSelect(section)}
		onmouseover={() => onSectionSelect(section)}
		onmouseleave={() => onSectionSelect(undefined)}
	>
		{@render children()}
	</circle>
{/if}

<style>
	.ring-section {
		stroke-width: 20px;
		fill: none;
	}
	.ring-section.highlight {
		filter: drop-shadow(0 0 2px blue);
	}
</style>
