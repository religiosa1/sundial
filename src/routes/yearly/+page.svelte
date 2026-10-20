<script lang="ts">
	import { AppRouteEnum } from "#lib/enums/AppRouteEnum.js";
	import { APP_TITLE } from "#lib/constants.js";
	import { webGLSupportStatus } from "#lib/utils/webGlSupportStatus.js";
	import { currentTime } from "#lib/stores/currentTime.js";
	import { latitude, longitude } from "#lib/stores/location.js";
	import YearlyView from "#lib/components/YearlyView/index.js";
	import { useSwipeNavigation } from "#lib/actions/swipe.svelte.js";

	useSwipeNavigation(
		AppRouteEnum.tableView,
		webGLSupportStatus === "supported" ? AppRouteEnum.mapView : undefined
	);
</script>

<svelte:head>
	<title>{APP_TITLE} - Yearly View</title>
</svelte:head>

<YearlyView currentTime={$currentTime} latitude={$latitude} longitude={$longitude} />
