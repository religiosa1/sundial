<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { format, startOfDay, endOfDay } from "date-fns";
  import * as conf from "./config";
  import { calculatePath } from "./helpers";
  import type { ClockSection } from "$/models/ClockSection";
  import { colorizeSections } from "./helpers";
  import { suncalc } from "../clock.store";

  import Hours from "./Hours.svelte";

  export let sections: ClockSection[] = [];
  export let selectedSection: ClockSection;

  const dispatch = createEventDispatcher();

  let ringSections;
  $: if (sections && sections.length > 0) {
    ringSections = colorizeSections(sections);
  } else {
    // let cm = new Date($suncalc.nadir); // check
    let s = {
      id: $suncalc.isWinter? "night" : "day",
      start: startOfDay($suncalc.nadir),
      end: endOfDay($suncalc.nadir),
    };
    ringSections = colorizeSections([s]);
  }
</script>

<g class="ring-sections">
  {#each ringSections as section}
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <path
    id={section.id}
    d={calculatePath(section)}
    stroke={section.stroke}
    class={"ring-section ring-section-" + section.id}
    class:highlight={selectedSection === section}
    on:mouseover={()=>dispatch('sectionMouseOver', section)}
    on:mouseleave={()=>dispatch('sectionMouseLeave')}
  >
    <desc>
      {section.name}
      {#if section.time}
        { format(section.time, conf.FORMAT) }
      {:else}
        { format(section.start, conf.FORMAT) }&mdash;{ format(section.end, conf.FORMAT) }
      {/if}
    </desc>
  </path>
  {/each}
</g>
<Hours
  {selectedSection}
  {ringSections}
  on:sectionMouseOver
  on:sectionMouseLeave
/>

<style>
  .ring-section {
    stroke-width: 20px;
    fill: none;
  }
  .ring-section.highlight {
    filter: drop-shadow(0 0 2px blue);
  }
</style>