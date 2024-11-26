<script lang="ts">
	import { latToDegree, longToDegree } from "$lib/utils/latlong";

	interface Props {
		latitude: number;
		longitude: number;
	}
	const { latitude, longitude }: Props = $props();
</script>

<div class="location-info">
	<span title="latitude: {latitude}" class="lat">{latToDegree(latitude)}</span>,
	<span title="longitude: {longitude}" class="long">{longToDegree(longitude)}</span>
</div>

<style>
	.location-info {
		font-size: 0.6em;
		margin: 1em 0;
	}
	@media (max-width: 700px) {
		.location-info {
			font-size: 0.8em;
		}
	}
</style>
