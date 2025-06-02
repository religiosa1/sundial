<script lang="ts">
	import { AppRouteEnum } from "$lib/enums/AppRouteEnum";
	import { APP_TITLE } from "$lib/constants";
	import { webGLSupportStatus } from "$lib/utils/webGlSupportStatus";
	import { currentTime } from "$lib/stores/currentTime";
	import { latitude, longitude } from "$lib/stores/location";
	import YearlyView from "$lib/components/YearlyView";
	import { useSwipeNavigation } from "$lib/actions/swipe.svelte";

	useSwipeNavigation(
		AppRouteEnum.tableView,
		webGLSupportStatus === "supported" ? AppRouteEnum.mapView : undefined
	);
</script>

<svelte:head>
	<title>{APP_TITLE} - Yearly View</title>
</svelte:head>

<YearlyView currentTime={$currentTime} latitude={$latitude} longitude={$longitude} />
