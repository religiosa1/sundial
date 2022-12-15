<script lang="ts">
  import sunCalc from "suncalc";
  import { setDayOfYear } from "date-fns";
  import { latitude, longitude } from "$lib/stores/location";
  import { range } from "$lib/utils/range";
  import { dayToX, timeToY } from "./helpers";

  $: days = Array.from(range(364), (_, i) => {
    const d = setDayOfYear(new Date(new Date().getFullYear(), 0, 1), i+1);
    const t = sunCalc.getTimes(d, $latitude, $longitude);
    return {
      date: d,
      x: dayToX(d),
      start: {
        time: t.sunrise,
        y: timeToY(t.sunrise)
      },
      end: {
        time: t.sunset,
        y: timeToY(t.sunset)
      },
      noon: {
        time: t.solarNoon,
        y: timeToY(t.solarNoon)
      },
    }
  });
</script>

<g class="days">
{#each days as day }
  <line
    class="hour-line"
    x1={day.x}
    x2={day.x}
    y1={day.start.y}
    y2={day.end.y}
  />
  <circle class="marker marker_start" cx={day.x} cy={day.start.y} r="2" />
  <circle class="marker marker_noon" cx={day.x} cy={day.noon.y} r="1" />
  <circle class="marker marker_end" cx={day.x} cy={day.end.y} r="2" />
{/each}
</g>

<style>
  .hour-line {
    stroke: var(--clr-txt);
    stroke-width: 1px;
  }
  .marker {
    stroke: var(--clr-txt);
    fill: var(--clr-txt);
  }
</style>