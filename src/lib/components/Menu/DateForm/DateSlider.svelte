<script lang="ts">
	import { date, manualDayOfYear } from "$lib/stores/date";
	import { format, getDayOfYear, setDayOfYear } from "date-fns";

	interface Props {
		grayedOut?: boolean;
	}

	let { grayedOut }: Props = $props();
</script>

<div class="date-slider" class:grayedOut>
	<input
		type="date"
		min="{$date.getFullYear()}-01-01"
		max="{$date.getFullYear()}-12-31"
		value={$manualDayOfYear != null
			? format(setDayOfYear(new Date(), $manualDayOfYear), "yyyy-MM-dd")
			: ""}
		onchange={(e) => {
			$manualDayOfYear = getDayOfYear(new Date(e.currentTarget.value));
		}}
	/>
	<input
		type="range"
		min={1}
		max={365}
		value={$manualDayOfYear}
		oninput={(e) => {
			$manualDayOfYear = e.currentTarget.valueAsNumber;
		}}
	/>
</div>

<style>
	input {
		width: 100%;
		display: block;
		margin: 0.5rem 0;
		transition: opacity 0.3s ease;
	}
	.grayedOut:not(:focus-within) {
		opacity: 0.65;
	}
</style>
