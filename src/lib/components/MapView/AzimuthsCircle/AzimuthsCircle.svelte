<script lang="ts">
	import type { GetMoonPositionResult, GetSunPositionResult } from "suncalc";
	import { RADIUS, SVG_CENTER, SVG_SIZE } from "./svgconsts";
	import AzimuthLine from "./AzimuthLine.svelte";
	import type { AzimuthSection, GeoAzimuths } from "../getGeoAzimuths";
	import CircleSection from "./CircleSection.svelte";
	import { SunAzimutIdEnum, getAzimuthSettingsById, DEFAULT_COLOR } from "../sectionsConfig";

	interface Props {
		sunPos: GetSunPositionResult;
		moonPos: GetMoonPositionResult;
		geoPos: GeoAzimuths;
		highlightedId: SunAzimutIdEnum[];
		onHighlightedId: (a: SunAzimutIdEnum | undefined) => void;
	}

	let { sunPos, moonPos, geoPos, highlightedId, onHighlightedId }: Props = $props();
</script>

{#snippet circleSection(id: SunAzimutIdEnum, coords: AzimuthSection | undefined)}
	{#if coords}
		<CircleSection
			{...getAzimuthSettingsById(id)}
			{...coords}
			highlighted={highlightedId.includes(id)}
			onmouseover={() => onHighlightedId(id)}
			onmouseleave={() => onHighlightedId(undefined)}
		/>
	{/if}
{/snippet}

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 {SVG_SIZE} {SVG_SIZE}">
	<circle cx={SVG_CENTER} cy={SVG_CENTER} r={RADIUS} style:stroke={DEFAULT_COLOR} />

	{@render circleSection(SunAzimutIdEnum.CivilTwilightMorning, geoPos.morningCivilTwilightSection)}
	{@render circleSection(SunAzimutIdEnum.CivilTwilightEvening, geoPos.eveningCivilTwilightSection)}

	{@render circleSection(SunAzimutIdEnum.GoldenHourMorning, geoPos.morningGoldenHourSection)}
	{@render circleSection(SunAzimutIdEnum.GoldenHourEvening, geoPos.eveningGoldenHourSection)}

	{@render circleSection(SunAzimutIdEnum.Sunrise, geoPos.sunriseSection)}
	{@render circleSection(SunAzimutIdEnum.Sunset, geoPos.sunsetSection)}

	<AzimuthLine
		{...getAzimuthSettingsById(SunAzimutIdEnum.NoonMarker)}
		azimuth={geoPos.noon}
		highlighted={highlightedId.includes(SunAzimutIdEnum.NoonMarker)}
		onmouseover={() => onHighlightedId(SunAzimutIdEnum.NoonMarker)}
		onmouseleave={() => onHighlightedId(undefined)}
	/>
	<AzimuthLine
		{...getAzimuthSettingsById(SunAzimutIdEnum.MoonMarker)}
		azimuth={moonPos.azimuth}
		dashed={moonPos.altitude < 0}
		highlighted={highlightedId.includes(SunAzimutIdEnum.MoonMarker)}
		onmouseover={() => onHighlightedId(SunAzimutIdEnum.MoonMarker)}
		onmouseleave={() => onHighlightedId(undefined)}
	/>
	<AzimuthLine
		{...getAzimuthSettingsById(SunAzimutIdEnum.SunMarker)}
		azimuth={sunPos.azimuth}
		dashed={sunPos.altitude < 0}
		highlighted={highlightedId.includes(SunAzimutIdEnum.SunMarker)}
		onmouseover={() => onHighlightedId(SunAzimutIdEnum.SunMarker)}
		onmouseleave={() => onHighlightedId(undefined)}
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
