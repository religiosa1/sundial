<script lang="ts">
	import { APP_TITLE } from "$lib/constants";
	import { AppRouteEnum } from "$lib/enums/AppRouteEnum";
	import { currentTime } from "$lib/stores/currentTime";
	import { date } from "$lib/stores/date";
	import { latitude, longitude } from "$lib/stores/location";
	import { suncalc } from "$lib/stores/suncalc";
	import Clock from "$lib/components/Clock";
	import PlaceTimeInfo from "$lib/components/Clock/LocationInfo.svelte";
	import SunsetSunriseInfo from "$lib/components/Clock/SunsetSunriseInfo.svelte";
	import CurrentTime from "$lib/components/Clock/TimeDisplay.svelte";
	import { useSwipeNavigation } from "$lib/actions/swipe.svelte";

	useSwipeNavigation(undefined, AppRouteEnum.tableView);
</script>

<svelte:head>
	<title>{APP_TITLE}</title>
</svelte:head>

<Clock currentTime={$currentTime} suncalc={$suncalc}>
	<div class="time-info">
		<CurrentTime time={$currentTime} date={$date} />
		<SunsetSunriseInfo suncalc={$suncalc} />
		<PlaceTimeInfo latitude={$latitude} longitude={$longitude} />
	</div>
</Clock>
