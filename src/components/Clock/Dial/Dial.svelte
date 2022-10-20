<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { suncalc } from "$/stores/suncalc";

  import { timeToDeg } from "$/utils/timeToDeg";
  import { timeRingSections } from "../timeRingSections";
  import type { ClockSection } from "$/models/ClockSection"

  import Markers from "./Markers.svelte";
  import RingSections from "./RingSections.svelte";

  import * as conf from "./config";
  import type { DaySection } from '$/models/DaySection';

  const dispatch = createEventDispatcher();

  let selectedSection = null;
  function sectionHover(ev: CustomEvent<DaySection | undefined>) {
    selectedSection = ev.detail;
    dispatch("sectionHover", ev.detail);
  }

  let trSection: ClockSection;
  $: trsections = timeRingSections($suncalc).map(i => ({
    ...i,
    startDeg: timeToDeg(i.start),
    endDeg: timeToDeg(i.end),
  }));
</script>

<svg class="dial" viewBox="0 0 {conf.size} {conf.size}" xmlns="http://www.w3.org/2000/svg">
  <desc>Отображение времени заката, рассвета и различных состояний сумерек</desc>
  <linearGradient id="grd-astro" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0%" stop-color="#0000aa"></stop>
    <stop offset="100%" stop-color="#000044"></stop>
  </linearGradient>
  <linearGradient id="grd-nautic" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0%" stop-color="#592fce"></stop>
    <stop offset="100%" stop-color="#112fbb"></stop>
  </linearGradient>
  <linearGradient id="grd-dusk" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0%" stop-color="#de8e4f"></stop>
    <stop offset="100%" stop-color="#894fde"></stop>
  </linearGradient>
  <linearGradient id="grd-golden" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0%" stop-color="#ccffdd"></stop>
    <stop offset="100%" stop-color="#ffd844"></stop>
  </linearGradient>
  <linearGradient id="grd-sun" x1="0.5" y1="0" x2="0.5" y2="1">
   <stop offset="0%" stop-color="#ffa800"></stop>
   <stop offset="100%" stop-color="#ff7000"></stop>
  </linearGradient>
  <linearGradient id="grd-day" x1="0.5" y1="0" x2="0.5" y2="1">
   <stop offset="0%" stop-color="#bcdcdd"></stop>
   <stop offset="100%" stop-color="#bbccff"></stop>
  </linearGradient>
  <linearGradient id="grd-night" x1="0.5" y1="0" x2="0.5" y2="1">
   <stop offset="0%" stop-color="#000011"></stop>
   <stop offset="100%" stop-color="#000033"></stop>
  </linearGradient>

  <RingSections
    {selectedSection}
    sections={trsections}
    on:sectionMouseOver={sectionHover}
    on:sectionMouseLeave={sectionHover}
  />

  <Markers
    on:sectionMouseOver={sectionHover}
    on:sectionMouseLeave={sectionHover}
  />
</svg>

<style>
  .dial {
    display: block;
    margin: auto;
  }
</style>
