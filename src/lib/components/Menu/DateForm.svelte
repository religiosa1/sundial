<script lang="ts">
	import Dialog from "$lib/components/Dialog.svelte";
	import { date, manualDayOfYear } from "$lib/stores/date";
	import { getDayOfYear, setDayOfYear, format } from "date-fns";

	const isAutoDate = $derived($manualDayOfYear == null);

	function handleDateTypeChange(e: Event & { currentTarget: HTMLInputElement }) {
		switch (e.currentTarget.value) {
			case "auto":
				$manualDayOfYear = undefined;
				break;
			case "manual":
				$manualDayOfYear = getDayOfYear(new Date());
		}
	}

	let { open = $bindable() }: { open: boolean } = $props();
</script>

<!-- TODO visuals -->
<Dialog noBackDrop bind:open>
	<div class="form-group checkbox-group">
		<div class="checkbox-group__checkbox">
			<input
				type="radio"
				name="dateType"
				checked={isAutoDate}
				value="auto"
				onchange={handleDateTypeChange}
			/>
		</div>
		<div class="checkbox-group__content">
			<label class="checkbox-group__label" for="current-date"> Current date </label>
		</div>
	</div>
	<div class="form-group checkbox-group">
		<div class="checkbox-group__checkbox">
			<input
				type="radio"
				name="dateType"
				checked={!isAutoDate}
				value="manual"
				onchange={handleDateTypeChange}
			/>
		</div>
		<div class="checkbox-group__content">
			<label class="checkbox-group__label" for="selected-date"> Selected date </label>
			<input
				disabled={isAutoDate}
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
			<br />
			<input
				disabled={isAutoDate}
				type="range"
				min={1}
				max={365}
				value={$manualDayOfYear}
				onchange={(e) => {
					$manualDayOfYear = +e.currentTarget.value;
				}}
			/>
		</div>
	</div>
	<p>
		<button type="button" onclick={() => (open = false)}>close</button>
	</p>
</Dialog>

<style>
	.checkbox-group {
		display: grid;
		grid-template-columns: min-content auto;
	}
	.checkbox-group__label {
		display: block;
		margin-bottom: 0.5rem;
	}
</style>
