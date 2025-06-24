<script lang="ts">
	import { useMyLocation } from "$lib/actions/useMyLocation";

	interface Props {
		onClick: (location: Promise<GeolocationCoordinates>) => void;
	}
	let { onClick }: Props = $props();

	let isPending = $state(false);

	function handleClick() {
		isPending = true;
		const locationPrms = useMyLocation().finally(() => (isPending = false));
		onClick(locationPrms);
	}
</script>

<button disabled={isPending} type="button" onclick={handleClick}> Use my location </button>
