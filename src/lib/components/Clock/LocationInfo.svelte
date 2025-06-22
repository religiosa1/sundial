<script lang="ts">
	import { formatLatAsDegree, formatLongAsDegree } from "$lib/utils/latlong";

	interface Props {
		latitude: number;
		longitude: number;
	}
	const { latitude, longitude }: Props = $props();
</script>

<div class="location-info">
	<span title="latitude: {latitude}" class="lat">{formatLatAsDegree(latitude)}</span>,
	<span title="longitude: {longitude}" class="long">{formatLongAsDegree(longitude)}</span>
</div>

<style>
	.location-info {
		font-size: 0.8em;
		margin: 1em 0;
	}
	@media (width > 600px) {
		.location-info {
			font-size: 0.6em;
		}
	}
</style>
