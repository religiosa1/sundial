<script lang="ts">
	import { formatLatAsDegree, formatLongAsDegree } from "$lib/utils/latlong";
	import { webGLSupportStatus } from "$lib/utils/webGlSupportStatus";
	import {
		latitude,
		longitude,
		saveDefaultLocation,
		loadLocation,
		deleteDefaultLocation,
	} from "$lib/stores/location";
	import Dialog from "$lib/components/Dialog.svelte";
	import FlashMessage from "$lib/components/FlashMessage.svelte";
	import Spinner from "$lib/components/Spinner.svelte";
	import ErrorPanel from "$lib/components/ErrorPanel.svelte";
	import UseMyLocationButton from "./UseMyLocationButton.svelte";
	import MapInput from "./MapInput.svelte";

	let { open = $bindable() }: { open: boolean } = $props();

	let storedValue = $state(loadLocation());
	let getMyLocationError = $state(undefined as unknown);
	let useMyLocationResult = $state<Promise<void> | undefined>();

	let saved: FlashMessage;
</script>

<Dialog bind:open>
	<h3>Current place</h3>
	<form
		name="placeform"
		onsubmit={(e) => {
			e.preventDefault();
			storedValue = saveDefaultLocation();
			saved.show();
		}}
		onreset={(e) => {
			e.preventDefault();
			deleteDefaultLocation();
			storedValue = undefined;
		}}
	>
		{#if webGLSupportStatus === "supported"}
			<div class="form-group">
				<MapInput />
			</div>
		{/if}
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
					{formatLatAsDegree(storedValue.latitude)}
				</span>,
				<span title="longitude" class="long">
					{formatLongAsDegree(storedValue.longitude)}
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
					onClick={(prms) =>
						(useMyLocationResult = prms
							.then((location) => {
								getMyLocationError = undefined;
								$latitude = location.latitude;
								$longitude = location.longitude;
							})
							.catch((e) => (getMyLocationError = e)))}
				/>
			{/if}
			<FlashMessage bind:this={saved} noShowOnMount>Saved</FlashMessage>
			{#if useMyLocationResult != null}
				{#await useMyLocationResult}
					<FlashMessage reversed>
						<Spinner title="Retrieving position..." />
					</FlashMessage>
				{:then}
					<FlashMessage>Ok</FlashMessage>
				{/await}
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
	.controls button {
		flex-shrink: 0;
	}
</style>
