<script lang="ts">
	import { untrack } from "svelte";
	import Time from "$lib/components/Time.svelte";
	import * as dateUtils from "./date";

	interface Props {
		value?: Date;
		baseDate: Date;
	}

	let { value = $bindable(new Date()), baseDate }: Props = $props();

	// Synchronizing bound value, when baseDate changes
	$effect(() => {
		const timeMs = dateUtils.getTimeonlyMs(untrack(() => value));
		value = dateUtils.setTimeMs(baseDate, timeMs);
	});
</script>

<div class="time-range">
	<input
		class="time-range__input"
		type="range"
		min={0}
		max={23.9999}
		step={0.0001}
		bind:value={
			() => {
				const ms = dateUtils.getTimeonlyMs(value);
				return ms / dateUtils.Time.Hours;
			},
			(v) => {
				const hours = v ?? 0;
				const ms = hours * dateUtils.Time.Hours;
				value = dateUtils.setTimeMs(baseDate, ms);
			}
		}
	/>
	<div class="time-value">
		<Time {value} />
	</div>
</div>

<style>
	.time-range {
		max-width: 600px;
		margin: 1rem auto;
		text-align: center;
	}
	.time-range__input {
		display: block;
		margin: 0 0 0.5rem;
		width: 100%;
	}
	.time-value {
		font-size: 1.5em;
	}
</style>
