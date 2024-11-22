<script lang="ts">
	import Dialog from "$lib/components/Dialog.svelte";
	import { latitude, longitude, saveLocation, loadLocation } from "$lib/stores/location";
	import { isValidLatitude, isValidLongitude, latToDegree, longToDegree } from "$lib/utils/latlong";

	let { open = $bindable() }: { open: boolean } = $props();

	let storedValue = $state(loadLocation());

	function useMyLocation() {
		navigator.geolocation.getCurrentPosition((position) => {
			console.log(position);
			const { latitude: lat, longitude: lng } = position.coords;
			if (isValidLatitude(lat) && isValidLongitude(lng)) {
				$latitude = lat;
				$longitude = lng;
			}
		});
	}
</script>

<Dialog bind:open>
	<h3>Current place</h3>
	<form
		name="placeform"
		onsubmit={(e) => {
			e.preventDefault();
			saveLocation();
			storedValue = loadLocation();
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
			<span title="latitude" class="lat">
				{storedValue && latToDegree(storedValue.latitude)}
			</span>,
			<span title="longitude" class="long">
				{storedValue && longToDegree(storedValue.longitude)}
			</span>
		</p>
		{#if "geolocation" in navigator}
			<p>
				<button onclick={useMyLocation}>Use my location</button>
			</p>
		{/if}

		<button>Save as the default position</button>
		<button type="button" onclick={close}>Close</button>
	</form>
</Dialog>
