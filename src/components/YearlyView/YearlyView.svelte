<script lang="ts">
  import { i18n } from "$/stores/i18n";
  import * as conf from "./config";
  import HourMarkers from "./HourMarkers.svelte";
  import DayLength from "./DayLength.svelte";
  import MonthMarkers from "./MonthMarkers.svelte";
</script>

<svg class="year" viewBox="0 0 {conf.width} {conf.height}" xmlns="http://www.w3.org/2000/svg">
  <desc>{$i18n.t`yearlydesc`}</desc>
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