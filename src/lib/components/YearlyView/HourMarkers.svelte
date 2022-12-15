<script lang="ts">
  import * as conf from "./config";
</script>

<g class="hours">
  {#each {length: 24} as _, hour}
  {@const y = conf.fieldHeight / 24 * hour + conf.yPad}
  <line
    class="hour-line"
    x1={conf.lineStartX}
    x2={conf.lineEndX}
    y1={y}
    y2={y}
  />
  <text
    x={conf.xPad}
    y={y}
    class="hour-label"
  >
    {`${hour}`.padStart(2,'0')}
  </text>
  {/each}
</g>
<style>
  .hour-line {
    stroke: var(--clr-txt);
    stroke-width: 1px;
    stroke-dasharray: 1px;
  }
  .hour-label {
    font-size: 9px;
    text-anchor: start;
    stroke: var(--clr-txt);
    stroke-width: 0.5px;
  }
</style>