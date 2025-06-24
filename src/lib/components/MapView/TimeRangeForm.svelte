<script lang="ts">
	import { untrack } from "svelte";
	import Time from "$lib/components/Time.svelte";
	import { currentTime } from "$lib/stores/currentTime";
	import * as dateUtils from "../../utils/date";

	interface Props {
		value?: Date;
		baseDate: Date;
	}

	let { value = $bindable(new Date()), baseDate }: Props = $props();

	let isUsingCurrentTime = $state(true);
	let manualTime = $state(value);

	// Synchronizing bound value, when baseDate changes
	$effect(() => {
		const timeMs = dateUtils.getTimeonlyMs(untrack(() => value));
		value = dateUtils.setTimeMs(baseDate, timeMs);
	});

	// If current time toggler is on, we're syncing value to current time
	$effect(() => {
		if (isUsingCurrentTime) {
			value = $currentTime;
		}
	});
</script>

<div class="time-range">
	<div class="current-time-toggle">
		<label>
			<input type="radio" name="timeType" value={true} bind:group={isUsingCurrentTime} />
			Current time
		</label>
		<label>
			<input
				type="radio"
				name="timeType"
				value={false}
				bind:group={isUsingCurrentTime}
				onchange={() => (value = manualTime)}
			/>
			Selected time
		</label>
	</div>
	<input
		class="time-range__input"
		class:inactive={isUsingCurrentTime}
		type="range"
		min={0}
		max={23.9999}
		step={0.0001}
		bind:value={
			() => {
				const time = isUsingCurrentTime ? $currentTime : manualTime;
				const ms = dateUtils.getTimeonlyMs(time);
				return ms / dateUtils.Time.Hours;
			},
			(v) => {
				const hours = v ?? 0;
				const ms = hours * dateUtils.Time.Hours;
				isUsingCurrentTime = false;
				const time = dateUtils.setTimeMs(baseDate, ms);
				manualTime = time;
				if (!isUsingCurrentTime) {
					value = time;
				}
			}
		}
	/>
	<div class="time-value">
		<Time {value} format="HH:mm" />
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
	.inactive {
		opacity: 0.65;
	}
	.time-value {
		font-size: 1.5em;
	}
	.current-time-toggle {
		display: block;
		font-size: 1.25em;
		margin: 0 0 1rem;
		cursor: pointer;
	}

	/* Mobile landscape */
	@media (orientation: landscape) and (aspect-ratio > 1.7) and (600px < width < 1200px) {
		label {
			display: block;
			margin-bottom: 1em;
		}
	}
</style>
