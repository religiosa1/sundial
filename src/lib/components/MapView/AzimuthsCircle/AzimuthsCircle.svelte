<script lang="ts">
	import type { GetMoonPositionResult, GetSunPositionResult } from "suncalc";
	import { RADIUS, SVG_CENTER, SVG_SIZE } from "./svgconsts";
	import type { AzimuthSection, GeoAzimuths } from "../getGeoAzimuths";
	import { SunAzimutIdEnum, getAzimuthSettingsById, DEFAULT_COLOR } from "../sectionsConfig";
	import AzimuthLine from "./AzimuthLine.svelte";
	import CircleSection from "./CircleSection.svelte";

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
			{id}
			{...getAzimuthSettingsById(id)}
			{...coords}
			highlighted={highlightedId.includes(id)}
			onmouseover={() => onHighlightedId(id)}
			onmouseleave={() => onHighlightedId(undefined)}
		/>
	{/if}
{/snippet}

{#snippet azimuthLine(id: SunAzimutIdEnum, azimuth: number, dashed?: boolean)}
	<AzimuthLine
		{id}
		{...getAzimuthSettingsById(id)}
		{azimuth}
		{dashed}
		highlighted={highlightedId.includes(id)}
		onmouseover={() => onHighlightedId(id)}
		onmouseleave={() => onHighlightedId(undefined)}
	/>
{/snippet}

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 {SVG_SIZE} {SVG_SIZE}">
	<circle cx={SVG_CENTER} cy={SVG_CENTER} r={RADIUS} style:stroke={DEFAULT_COLOR} />

	{@render circleSection(SunAzimutIdEnum.CivilTwilightMorning, geoPos.morningCivilTwilightSection)}
	{@render circleSection(SunAzimutIdEnum.CivilTwilightEvening, geoPos.eveningCivilTwilightSection)}

	{@render circleSection(SunAzimutIdEnum.GoldenHourMorning, geoPos.morningGoldenHourSection)}
	{@render circleSection(SunAzimutIdEnum.GoldenHourEvening, geoPos.eveningGoldenHourSection)}

	{@render circleSection(SunAzimutIdEnum.Sunrise, geoPos.sunriseSection)}
	{@render circleSection(SunAzimutIdEnum.Sunset, geoPos.sunsetSection)}

	{@render azimuthLine(SunAzimutIdEnum.NoonMarker, geoPos.noon)}
	{@render azimuthLine(SunAzimutIdEnum.MoonMarker, moonPos.azimuth, moonPos.altitude < 0)}
	{@render azimuthLine(SunAzimutIdEnum.SunMarker, sunPos.azimuth, sunPos.altitude < 0)}

	<!-- separate clone of highlihted element, to raise z-index
	https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/use -->
	{#each highlightedId as id}
		<use class="highlight" href="#{id}" />
	{/each}
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

	.highlight {
		pointer-events: none;
	}
</style>
