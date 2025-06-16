<script lang="ts">
	import { APP_TITLE } from "$lib/constants";

	import { useSwipeNavigation } from "$lib/actions/swipe.svelte";
	import { AppRouteEnum } from "$lib/enums/AppRouteEnum";
	import MapView from "$lib/components/MapView/MapView.svelte";
	import ErrorPanel from "$lib/components/ErrorPanel.svelte";
	import { webGLSupportStatus } from "$lib/utils/webGlSupportStatus";
	import { page } from "$app/state";

	useSwipeNavigation(AppRouteEnum.yearlyView, undefined);
</script>

<svelte:head>
	<title>{APP_TITLE} - Sunrise/Sunset angles on a map</title>
</svelte:head>

{#if webGLSupportStatus === "supported"}
	<MapView />
{:else if webGLSupportStatus === "disabled"}
	<ErrorPanel error="WebGl is disabled, but required for this funcionality" />
{:else}
	<ErrorPanel error="WebGl is not supported, but required for this funcionality" />
{/if}
