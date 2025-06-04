<script lang="ts">
	import Dialog from "$lib/components/Dialog.svelte";
	import { manualDayOfYear } from "$lib/stores/date";
	import { getDayOfYear } from "date-fns";
	import DateSlider from "./DateSlider.svelte";

	const isAutoDate = $derived($manualDayOfYear == null);

	function handleDateTypeChange(e: Event & { currentTarget: HTMLInputElement }) {
		switch (e.currentTarget.value) {
			case "auto":
				$manualDayOfYear = undefined;
				break;
			case "manual":
				$manualDayOfYear = getDayOfYear(new Date());
				break;
		}
	}

	let { open = $bindable() }: { open: boolean } = $props();
</script>

<Dialog anchor="--dateform" noBackDrop bind:open>
	<div class="form-group">
		<label class="radio-group-label">
			<input
				type="radio"
				name="dateType"
				checked={isAutoDate}
				value="auto"
				onchange={handleDateTypeChange}
			/>
			Current date
		</label>
	</div>
	<div class="form-group">
		<label class="radio-group-label">
			<input
				type="radio"
				name="dateType"
				checked={!isAutoDate}
				value="manual"
				onchange={handleDateTypeChange}
			/>
			Selected date
			<DateSlider grayedOut={isAutoDate} />
		</label>
	</div>
	<p>
		<button type="button" onclick={() => (open = false)}>close</button>
	</p>
</Dialog>

<style>
	.radio-group-label {
		display: block;
		margin-bottom: 0.5em;
	}
</style>
