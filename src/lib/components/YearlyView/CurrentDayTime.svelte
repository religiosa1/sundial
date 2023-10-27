<script lang="ts">
  import { date } from "$lib/stores/date";
  import { dayToX, timeToY } from "./helpers";
  import {
    yPad,
    fieldHeight,
    lineStartX,
    lineEndX,
  } from "./yearlyViewBoxConfig";
  import { format } from "date-fns";

  $: x = dayToX($date);
  $: y = timeToY($date);
</script>

<g class="current-day-time">
  <text x={lineEndX - 3} y={yPad - 3} class="current-day-time__text">
    {format($date, "yyyy.MM.dd H:mm")}
  </text>
  <line
    class="current-day-time__line current-day-time__line_date"
    x1={x}
    x2={x}
    y1={yPad}
    y2={fieldHeight}
  />
  <line
    class="current-day-time__line current-day-time__line_time"
    x1={lineStartX}
    x2={lineEndX}
    y1={y}
    y2={y}
  />
</g>

<style>
  .current-day-time__line {
    stroke: var(--clr-highlight);
    stroke-width: 1px;
  }
  .current-day-time__text {
    font-size: 9px;
    text-anchor: end;
    stroke: var(--clr-highlight);
    stroke-width: 0.5px;
  }
</style>
