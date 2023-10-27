<script lang="ts">
  import { DateType } from "$lib/models/DateTypeEnum";
  import { dateType, date, manualDayOfYear } from "$lib/stores/date";
  import Dialog from "$lib/components/Dialog.svelte";
  import { getDayOfYear, setDayOfYear, format } from "date-fns";
</script>

<!-- TODO visuals -->
<Dialog noBackDrop on:close let:close>
  <div class="form-group checkbox-group">
    <div class="checkbox-group__checkbox">
      <input
        id="current-date"
        type="radio"
        bind:group={$dateType}
        value={DateType.auto}
      />
    </div>
    <div class="checkbox-group__content">
      <label class="checkbox-group__label" for="current-date">
        Current date
      </label>
    </div>
  </div>
  <div class="form-group checkbox-group">
    <div class="checkbox-group__checkbox">
      <input
        id="selected-date"
        type="radio"
        bind:group={$dateType}
        value={DateType.manual}
      />
    </div>
    <div class="checkbox-group__content">
      <label class="checkbox-group__label" for="selected-date">
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
      <br />
      <input type="range" min={1} max={365} bind:value={$manualDayOfYear} />
    </div>
  </div>
  <p>
    <button type="button" on:click={close}>close</button>
  </p>
</Dialog>

<style>
  .checkbox-group {
    display: grid;
    grid-template-columns: min-content auto;
  }
  .checkbox-group__label {
    display: block;
    margin-bottom: 0.5rem;
  }
</style>
