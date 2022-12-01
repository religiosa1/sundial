<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { timeToDeg } from "$lib/utils/timeToDeg";
  import { suncalc } from "$lib/stores/suncalc";
  import * as config from "./config";

  const dispatch = createEventDispatcher();

  $: markers = [
    {
      name: "noon",
      time: $suncalc.solarNoon,
      offset: timeToDeg($suncalc.solarNoon),
      class: "time-mark-noon",
    },
    {
      name: "nadir",
      time: $suncalc.nadir,
      offset: timeToDeg($suncalc.nadir),
      class: "time-mark-nadir",
    },
  ];
</script>

<g class="markers">
  {#each markers as marker}
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <line
    class={"time-mark "  + marker.class}
    x1="50%"
    x2="50%"
    y1={config.padding}
    y2={config.padding + config.width}
    transform='rotate({marker.offset} {config.hsize} {config.hsize})'
    on:mouseover={()=>dispatch('sectionMouseOver', marker)}
    on:mouseleave={()=>dispatch('sectionMouseLeave')}
  />
  {/each}
</g>

<style>
  .time-mark {
    fill: none;
    stroke-width: 1px;
    stroke: #ff7aff80;
    mix-blend-mode: difference;
    transition: stroke 0.2s ease;
  }
</style>