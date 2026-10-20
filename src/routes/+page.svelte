<script lang="ts">
	import { APP_TITLE } from "#lib/constants.js";
	import { AppRouteEnum } from "#lib/enums/AppRouteEnum.js";
	import { currentTime } from "#lib/stores/currentTime.js";
	import { date } from "#lib/stores/date.js";
	import { latitude, longitude } from "#lib/stores/location.js";
	import { suncalc } from "#lib/stores/suncalc.js";
	import Clock from "#lib/components/Clock/index.js";
	import PlaceTimeInfo from "#lib/components/Clock/LocationInfo.svelte";
	import SunsetSunriseInfo from "#lib/components/Clock/SunsetSunriseInfo.svelte";
	import CurrentTime from "#lib/components/Clock/TimeDisplay.svelte";
	import { useSwipeNavigation } from "#lib/actions/swipe.svelte.js";

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
