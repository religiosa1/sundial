<script lang="ts">
  import { i18n } from "$/stores/i18n";
  import * as conf from "./config";
  import { range } from "$/utils/range";
  import { dayToX } from "./helpers";
  import { endOfMonth } from "date-fns";

  const fieldBottom = conf.fieldHeight;
  const textTop = fieldBottom + 10;

  $:months = Array.from(range(12), (i) => {
    const startDate = new Date(new Date().getFullYear(), i, 1);
    const endDate = endOfMonth(startDate);
    return {
      idx: i,
      start: dayToX(startDate),
      end: dayToX(endDate)
    }
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
        y2={fieldBottom}
      />
    {/if}
    <text
      x={(month.end + month.start) / 2}
      y={textTop}
      class="month-label"
    >
      {$i18n.t('month.' + month.idx)}
    </text>
  {/each}
</g>

<style>
  .month-line {
    stroke: var(--txt-color);
    stroke-width: 1px;
    stroke-dasharray: 1px;
  }
  .month-label {
    font-size: 9px;
    text-anchor: middle;
    stroke: var(--txt-color);
    stroke-width: 1;
  }
</style>