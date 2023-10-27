<script lang="ts">
  import { format, isValid } from "date-fns";
  import { suncalc } from "$lib/stores/suncalc";
  import { date } from "$lib/stores/date";
  export let time: Date;
  const NA = "—/—";
</script>

<div class="time-info">
  <time class="selectedDate" datetime={format($date, "yyyy-MM-dd")}>
    {format($date, "dd.MM.yyyy")}
  </time>
  <time class="currentTime" datetime={format(time, "HH:mm")}>
    {format(time, "H:mm")}
  </time>

  <dl class="sunset-sunrise">
    <div class="sunset-sunrise__entry" title="sunrise">
      <dt>↑</dt>
      <dd>
        {#if isValid($suncalc?.sunrise)}
          <time
            class="sunset-sunrise__value"
            datetime={$suncalc.sunrise.toISOString()}
          >
            {format($suncalc?.sunrise, "H:mm:ss")}
          </time>
        {:else}
          <time class="sunset-sunrise__value">
            {NA}
          </time>
        {/if}
      </dd>
    </div>
    <div class="sunset-sunrise__entry" title="sunset">
      <dt>↓</dt>
      <dd>
        {#if isValid($suncalc?.sunrise)}
          <time
            class="sunset-sunrise__value"
            datetime={$suncalc.sunset.toISOString()}
          >
            {format($suncalc?.sunset, "H:mm:ss")}
          </time>
        {:else}
          <time class="sunset-sunrise__value">
            {NA}
          </time>
        {/if}
      </dd>
    </div>
  </dl>
</div>

<style>
  .selectedDate,
  .currentTime {
    display: block;
  }
  .currentTime {
    font-size: 3em;
    line-height: 1;
  }
  .sunset-sunrise {
    margin: 0;
    padding: 0;
  }
  .sunset-sunrise dt,
  .sunset-sunrise dd {
    display: inline;
    margin: 0;
    padding: 0;
  }
  .sunset-sunrise__entry {
    display: inline-block;
    margin: 0 0.3em;
  }
</style>
