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
				break;
		}
	}

	let { open = $bindable() }: { open: boolean } = $props();
</script>

<!-- TODO visuals -->
<Dialog noBackDrop bind:open>
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
	<div class="form-group checkbox-group">
		<label class="radio-group-label">
			<input
				type="radio"
				name="dateType"
				checked={!isAutoDate}
				value="manual"
				onchange={handleDateTypeChange}
			/>
			Selected date
		</label>
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
