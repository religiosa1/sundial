<script lang="ts">
	import type { SuncalcData } from "$lib/models/SuncalcData";
	import type { DaySectionId } from "$lib/models/DaySection";

	import { timeToDeg } from "$lib/utils/timeToDeg";

	import { makeClockSectionsArray } from "./ClockSection";
	import NoonNadirMarkers from "./NoonNadirMarkers.svelte";
	import RingSections from "./RingSections.svelte";

	import * as conf from "./config";

	interface Props {
		suncalc: SuncalcData;
		selectedSectionId: DaySectionId | undefined;
		onSectionSelect: (dsId: DaySectionId | undefined) => void;
	}
	const { suncalc, selectedSectionId, onSectionSelect }: Props = $props();

	const clockSections = $derived(
		makeClockSectionsArray(suncalc).map((i) => ({
			...i,
			startDeg: timeToDeg(i.start),
			endDeg: timeToDeg(i.end),
		}))
	);
</script>

<svg class="dial" viewBox="0 0 {conf.size} {conf.size}" xmlns="http://www.w3.org/2000/svg">
	<desc>Sunset, sunrise and different twilight times</desc>
	<linearGradient id="grd-astro" x1="0" y1="1" x2="0" y2="0">
		<stop offset="0%" stop-color="#0000aa" />
		<stop offset="100%" stop-color="#000044" />
	</linearGradient>
	<linearGradient id="grd-nautic" x1="0" y1="1" x2="0" y2="0">
		<stop offset="0%" stop-color="#592fce" />
		<stop offset="100%" stop-color="#112fbb" />
	</linearGradient>
	<linearGradient id="grd-dusk" x1="0" y1="1" x2="0" y2="0">
		<stop offset="0%" stop-color="#de8e4f" />
		<stop offset="100%" stop-color="#894fde" />
	</linearGradient>
	<linearGradient id="grd-golden" x1="0" y1="1" x2="0" y2="0">
		<stop offset="0%" stop-color="#ccffdd" />
		<stop offset="100%" stop-color="#ffd844" />
	</linearGradient>
	<linearGradient id="grd-sun" x1="0.5" y1="0" x2="0.5" y2="1">
		<stop offset="0%" stop-color="#ffa800" />
		<stop offset="100%" stop-color="#ff7000" />
	</linearGradient>
	<linearGradient id="grd-day" x1="0.5" y1="0" x2="0.5" y2="1">
		<stop offset="0%" stop-color="#bcdcdd" />
		<stop offset="100%" stop-color="#bbccff" />
	</linearGradient>
	<linearGradient id="grd-night" x1="0.5" y1="0" x2="0.5" y2="1">
		<stop offset="0%" stop-color="#000011" />
		<stop offset="100%" stop-color="#000033" />
	</linearGradient>

	<RingSections {selectedSectionId} sections={clockSections} {onSectionSelect} />

	<NoonNadirMarkers {suncalc} {selectedSectionId} {onSectionSelect} />
</svg>

<style>
	.dial {
		display: block;
		margin: auto;
	}
</style>
