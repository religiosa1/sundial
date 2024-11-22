<script lang="ts">
	import { format, isValid } from "date-fns";
	import type { ClockSection } from "$lib/components/Clock/Dial/ClockSection";

	interface Props {
		section: ClockSection | undefined;
	}
	const { section }: Props = $props();

	const FORMAT = "H:mm:ss";
	const NA = "--/--";
</script>

<div class="section-info">
	{#if section}
		<p class="section-name">
			{section.name}
		</p>
		<p class="section-time">
			{@render time(section?.start)}
			{#if section?.start !== section?.end}
				&mdash; {@render time(section?.end)}
			{/if}
		</p>
	{/if}
</div>

{#snippet time(time: Date)}
	<time datetime={time.toISOString()}>{isValid(time) ? format(time, FORMAT) : NA}</time>
{/snippet}

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
