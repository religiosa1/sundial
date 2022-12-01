<script lang="ts">
  import * as conf from "./config";
</script>

<g class="hours">
  {#each {length: 24} as _, hour}
  {@const y = conf.fieldHeight / 24 * hour + conf.yPad}
  <line
    class="hour-line"
    x1={conf.xPad + 14}
    x2={conf.width-conf.xPad}
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
    stroke: var(--txt-color);
    stroke-width: 1px;
    stroke-dasharray: 1px;
  }
  .hour-label {
    font-size: 9px;
    text-anchor: left;
    stroke: var(--txt-color);
    stroke-width: 1;
  }
</style>