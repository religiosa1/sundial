<script lang="ts">
  import Clock from "./components/Clock";
  import TimesList from "./components/TimeTable.svelte";
  import Menu from "./components/Menu";
  import { tableView } from "$/stores/clockUi";
  import { i18n } from "$/stores/i18n";
</script>

<svelte:head>
	<title>{$i18n.t`title`}</title>
</svelte:head>

<div class="content-wrap">
{#if $tableView}
  <TimesList />
{:else}
    <Clock />
{/if}
</div>

<Menu />


<style>
  .content-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh
  }
</style>