<script lang="ts">
	import Time from "$lib/components/Time.svelte";
	import { DaySectionEnum, type DaySectionId } from "$lib/models/DaySection";
	import type { SuncalcData } from "$lib/models/SuncalcData";

	interface Props {
		sectionId: DaySectionId | undefined;
		suncalc: SuncalcData;
	}
	const { sectionId, suncalc }: Props = $props();

	const section = $derived(sectionId && DaySectionEnum[sectionId]);
</script>

<div class="section-info">
	{#if section}
		<p class="section-name">
			{section.name}
		</p>
		<p class="section-time">
			<Time value={suncalc[section.start]} />
			{#if section?.end}
				&mdash; <Time value={suncalc[section.end]} />
			{/if}
		</p>
	{/if}
</div>

<style>
	.section-info {
		padding: 1px 0;
		line-height: 1.2;
		text-align: center;
		height: 2.5em;
		margin: 1em 0;
		font-size: 2.5vmin;
	}
	.section-name {
		margin: 0 0 0.2em;
	}
	.section-time {
		margin: 0;
		font-size: 0.85em;
	}
</style>
