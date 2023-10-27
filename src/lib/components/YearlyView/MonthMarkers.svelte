<script lang="ts">
  import { endOfMonth } from "date-fns";
  import { range } from "$lib/utils/range";
  import * as conf from "./yearlyViewBoxConfig";
  import { dayToX } from "./helpers";

  const textTop = conf.fieldHeight + 10;

  $: months = Array.from(range(12), (i) => {
    const startDate = new Date(new Date().getFullYear(), i, 1);
    const endDate = endOfMonth(startDate);
    return {
      idx: i,
      start: dayToX(startDate),
      end: dayToX(endDate),
    };
  });
</script>

<g class="months">
  {#each months as month, index}
    {#if index < months.length - 1}
      <line
        class="month-line"
        x1={month.end}
        x2={month.end}
        y1={conf.yPad}
        y2={conf.fieldHeight}
      />
    {/if}
    <text x={(month.end + month.start) / 2} y={textTop} class="month-label">
      {conf.monthNames[month.idx]}
    </text>
  {/each}
</g>

<style>
  .month-line {
    stroke: var(--clr-txt);
    stroke-width: 1px;
    stroke-dasharray: 1px;
  }
  .month-label {
    font-size: 9px;
    text-anchor: middle;
    stroke: var(--clr-txt);
    stroke-width: 1;
  }
</style>
