<script lang="ts">
  import { DateType } from "$lib/models/DateTypeEnum";
  import { dateType, date, manualDayOfYear } from "$lib/stores/date";
  import Dialog from "$lib/components/Dialog.svelte";
  import { getDayOfYear, setDayOfYear, format } from "date-fns";
</script>

<!-- TODO visuals -->
<Dialog noBackDrop on:close>
  <p class="form-group">
    <label>
      <input type="radio" bind:group={$dateType} value={DateType.auto} />
      Current date
    </label>
  </p>
  <p class="form-group">
    <label>
      <input type="radio" bind:group={$dateType} value={DateType.manual} />
      Selected date
    </label>

    <input
      type="date"
      min="{$date.getFullYear()}-01-01"
      max="{$date.getFullYear()}-12-31"
      value={format(setDayOfYear($date, $manualDayOfYear), "yyyy-MM-dd")}
      on:change={(e) => {
        $manualDayOfYear = getDayOfYear(new Date(e.currentTarget.value));
      }}
    />
    <input type="range" min={1} max={365} bind:value={$manualDayOfYear} />
  </p>
</Dialog>
