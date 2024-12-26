<script lang="ts">
	import { latToDegree, longToDegree } from "$lib/utils/latlong";
	import {
		latitude,
		longitude,
		saveDefaultLocation,
		loadLocation,
		deleteDefaultLocation,
	} from "$lib/stores/location";
	import Dialog from "$lib/components/Dialog.svelte";
	import UseMyLocationButton from "./UseMyLocationButton.svelte";
	import ErrorPanel from "$lib/components/ErrorPanel.svelte";

	let { open = $bindable() }: { open: boolean } = $props();

	let storedValue = $state(loadLocation());
	let getMyLocationError = $state(undefined as unknown);
</script>

<Dialog bind:open>
	<h3>Current place</h3>
	<form
		name="placeform"
		onsubmit={(e) => {
			e.preventDefault();
			storedValue = saveDefaultLocation();
		}}
		onreset={(e) => {
			e.preventDefault();
			deleteDefaultLocation();
			storedValue = undefined;
		}}
	>
		<div class="form-group">
			<label>
				Latitude
				<input
					name="latitude"
					type="number"
					min={-90.0}
					max={90.0}
					bind:value={$latitude}
					step="any"
				/>
				<input name="latitude" type="range" min={-90} max={90} bind:value={$latitude} />
			</label>
		</div>
		<div class="form-group">
			<label>
				Longitude
				<input
					name="longitude"
					type="number"
					min={-180}
					max={180}
					bind:value={$longitude}
					step="any"
				/>
				<input name="longitude" type="range" min={-180} max={180} bind:value={$longitude} />
			</label>
		</div>
		<h4>Default location:</h4>
		<p>
			{#if storedValue}
				<span title="latitude" class="lat">
					{latToDegree(storedValue.latitude)}
				</span>,
				<span title="longitude" class="long">
					{longToDegree(storedValue.longitude)}
				</span>
			{:else}
				Not Specified
			{/if}
		</p>
		<p>It will be used when your current location can't be determined.</p>
		<div class="controls">
			<button>Save</button>
			<button type="reset" disabled={storedValue == null}>Clear</button>
			{#if "geolocation" in navigator}
				<UseMyLocationButton
					onLocationSaved={(v) => (storedValue = v)}
					onError={(e) => (getMyLocationError = e)}
				/>
			{/if}
		</div>
		<ErrorPanel error={getMyLocationError}>Error retrieving location:</ErrorPanel>
		<button type="button" onclick={() => (open = false)}>Close</button>
	</form>
</Dialog>

<style>
	.controls {
		display: flex;
		gap: 0.75em;
		margin: 0.5em 0 1em;
		align-items: center;
	}
</style>
