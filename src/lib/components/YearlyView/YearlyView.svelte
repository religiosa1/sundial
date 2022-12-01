<script lang="ts">
  import HourMarkers from "./HourMarkers.svelte";
  import DayLength from "./DayLength.svelte";
  import MonthMarkers from "./MonthMarkers.svelte";
  import * as conf from "./config";
</script>

<svg class="year" viewBox="0 0 {conf.width} {conf.height}" xmlns="http://www.w3.org/2000/svg">
  <desc>Daytime duration in a year</desc>
  <HourMarkers />
  <MonthMarkers />
  <DayLength />
</svg>

<style>
  .year {
    display: block;
    max-width: calc(100vw - 200px);
    margin: auto;
  }
</style>