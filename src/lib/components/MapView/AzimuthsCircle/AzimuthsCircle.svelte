<script lang="ts">
	import type { GetMoonPositionResult, GetSunPositionResult } from "suncalc";
	import { RADIUS, SVG_CENTER, SVG_SIZE } from "./svgconsts";
	import { getSectionColor, SourceNameEnum } from "../sectionsConfig";
	import AzimuthLine from "./AzimuthLine.svelte";
	import type { GeoAzimuths } from "../getGeoAzimuths";
	import CircleSection from "./CircleSection.svelte";

	interface Props {
		sunPos: GetSunPositionResult;
		moonPos: GetMoonPositionResult;
		geoPos: GeoAzimuths;
	}

	let { sunPos, moonPos, geoPos }: Props = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 {SVG_SIZE} {SVG_SIZE}">
	<circle
		cx={SVG_CENTER}
		cy={SVG_CENTER}
		r={RADIUS}
		style:stroke={getSectionColor(SourceNameEnum.Base)}
	/>

	<CircleSection
		color={getSectionColor(SourceNameEnum.CivilTwilight)}
		startAzimuth={geoPos.sunsetEnd}
		endAzimuth={geoPos.dusk}
	/>
	<CircleSection
		color={getSectionColor(SourceNameEnum.CivilTwilight)}
		startAzimuth={geoPos.dawn}
		endAzimuth={geoPos.sunriseStart}
	/>

	<CircleSection
		color={getSectionColor(SourceNameEnum.GoldenHour)}
		startAzimuth={geoPos.sunriseEnd}
		endAzimuth={geoPos.morningGoldenHour}
	/>
	<CircleSection
		color={getSectionColor(SourceNameEnum.GoldenHour)}
		startAzimuth={geoPos.eveningGoldenHour}
		endAzimuth={geoPos.sunsetStart}
	/>

	<CircleSection
		color={getSectionColor(SourceNameEnum.Sunrise)}
		startAzimuth={geoPos.sunriseStart}
		endAzimuth={geoPos.sunriseEnd}
	/>

	<CircleSection
		color={getSectionColor(SourceNameEnum.Sunset)}
		startAzimuth={geoPos.sunsetStart}
		endAzimuth={geoPos.sunsetEnd}
	/>

	<AzimuthLine
		stroke={getSectionColor(SourceNameEnum.SunMarker)}
		azimuth={sunPos.azimuth}
		dashed={sunPos.altitude < 0}
	/>
	<AzimuthLine
		stroke={getSectionColor(SourceNameEnum.MoonMarker)}
		azimuth={moonPos.azimuth}
		dashed={moonPos.altitude < 0}
	/>
	<AzimuthLine stroke={getSectionColor(SourceNameEnum.NoonMarker)} azimuth={geoPos.noon} />
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
