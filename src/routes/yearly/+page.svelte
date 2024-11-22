<script lang="ts">
	import YearlyView from "$lib/components/YearlyView";
	import { currentTime } from "$lib/stores/currentTime";
	import { latitude, longitude } from "$lib/stores/location";
	import { APP_TITLE } from "$lib/constants";
</script>

<svelte:head>
	<title>{APP_TITLE} - Yearly View</title>
</svelte:head>

<YearlyView currentTime={$currentTime} latitude={$latitude} longitude={$longitude} />
