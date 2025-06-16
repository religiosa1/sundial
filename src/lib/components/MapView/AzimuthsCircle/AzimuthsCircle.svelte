<script lang="ts">
	import type { GetMoonPositionResult, GetSunPositionResult } from "suncalc";
	import { RADIUS, SVG_CENTER, SVG_SIZE } from "./svgconsts";
	import { getSectionColor, SourceNameEnum } from "../sectionsConfig";
	import AzimuthLine from "./AzimuthLine.svelte";
	import type { AzimuthSection, GeoAzimuths } from "../getGeoAzimuths";
	import CircleSection from "./CircleSection.svelte";

	interface Props {
		sunPos: GetSunPositionResult;
		moonPos: GetMoonPositionResult;
		geoPos: GeoAzimuths;
	}

	let { sunPos, moonPos, geoPos }: Props = $props();
</script>

{#snippet circleSection(sectionName: SourceNameEnum, coords: AzimuthSection | undefined)}
	{#if coords}
		<CircleSection color={getSectionColor(sectionName)} {...coords} />
	{/if}
{/snippet}

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 {SVG_SIZE} {SVG_SIZE}">
	<circle
		cx={SVG_CENTER}
		cy={SVG_CENTER}
		r={RADIUS}
		style:stroke={getSectionColor(SourceNameEnum.Base)}
	/>

	{@render circleSection(SourceNameEnum.CivilTwilight, geoPos.morningCivilTwilightSection)}
	{@render circleSection(SourceNameEnum.CivilTwilight, geoPos.eveningCivilTwilightSection)}

	{@render circleSection(SourceNameEnum.GoldenHour, geoPos.morningGoldenHourSection)}
	{@render circleSection(SourceNameEnum.GoldenHour, geoPos.eveningGoldenHourSection)}

	{@render circleSection(SourceNameEnum.Sunrise, geoPos.sunriseSection)}
	{@render circleSection(SourceNameEnum.Sunset, geoPos.sunsetSection)}

	<AzimuthLine stroke={getSectionColor(SourceNameEnum.NoonMarker)} azimuth={geoPos.noon} />
	<AzimuthLine
		stroke={getSectionColor(SourceNameEnum.MoonMarker)}
		azimuth={moonPos.azimuth}
		dashed={moonPos.altitude < 0}
	/>
	<AzimuthLine
		stroke={getSectionColor(SourceNameEnum.SunMarker)}
		azimuth={sunPos.azimuth}
		dashed={sunPos.altitude < 0}
	/>
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
	}

	circle {
		stroke-width: 6px;
		fill: none;
	}
</style>
