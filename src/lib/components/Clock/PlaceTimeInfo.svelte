<script lang="ts">
	import { latitude, longitude } from "$lib/stores/location";
	import { latToDegree, longToDegree } from "$lib/utils/latlong";
</script>

<div class="placetime-info">
	<span title="latitude" class="lat">{latToDegree($latitude)}</span>,
	<span title="longitude" class="long">{longToDegree($longitude)}</span>
</div>

<style>
	.placetime-info {
		font-size: 0.6em;
		margin: 1em;
	}
	@media (max-width: 700px) {
		.placetime-info {
			font-size: 0.8em;
		}
	}
</style>
