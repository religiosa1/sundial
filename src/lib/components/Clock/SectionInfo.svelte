<script lang="ts">
	import type { ClockSection } from "$lib/components/Clock/Dial/ClockSection";
	import Time from "$lib/components/Time.svelte";

	interface Props {
		section: ClockSection | undefined;
	}
	const { section }: Props = $props();
</script>

<div class="section-info">
	{#if section}
		<p class="section-name">
			{section.name}
		</p>
		<p class="section-time">
			<Time value={section.start} />
			{#if section?.start !== section?.end}
				&mdash; <Time value={section.end} />
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
