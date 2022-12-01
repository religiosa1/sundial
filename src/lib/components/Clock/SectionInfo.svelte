<script lang="ts">
  import { format, isValid } from "date-fns";
  import type { DaySection } from "$lib/models/DaySection";
  export let section: DaySection | null = null;

  const invalidDate = new Date('');
  const FORMAT = "H:mm:ss"
  const NA = "--/--";

  $:start = isValid(section?.start) ? format(section?.start || invalidDate, FORMAT) : NA;
  $:end = isValid(section?.end) ? format(section?.end || invalidDate, FORMAT) : NA;
</script>

<div class="section-info">
  {#if section}
    <p class="section-name">
      {section.name}
    </p>
    <p class="section-time">
      {#if section.time}
        { format(section.time, FORMAT) }
      {:else}
        <time datetime={start}>{start}</time> &mdash;
        <time datetime={end}>{end}</time>
      {/if}
    </p>
  {/if}
</div>


<style>
  .section-info {
    padding: 1px 0;
    line-height: 1.2;
    text-align: center;
    height: 2.5em;
    margin: 1em 0;
    font-size: 2.5vmin;
  }
  .section-name {
    margin: 0 0 0.2em;
  }
  .section-time {
    margin: 0;
    font-size: 0.85em;
  }
  </style>