<script lang="ts">
	import { goto } from "$app/navigation";
	import { AppRouteEnum } from "$lib/enums/AppRouteEnum";
	import { APP_TITLE } from "$lib/constants";
	import { currentTime } from "$lib/stores/currentTime";
	import { latitude, longitude } from "$lib/stores/location";
	import YearlyView from "$lib/components/YearlyView";

	$effect(() => {
		const ac = new AbortController();
		document.addEventListener("swipeRight", () => goto(AppRouteEnum.tableView), {
			signal: ac.signal,
		});
		return () => ac.abort();
	});
</script>

<svelte:head>
	<title>{APP_TITLE} - Yearly View</title>
</svelte:head>

<YearlyView currentTime={$currentTime} latitude={$latitude} longitude={$longitude} />
