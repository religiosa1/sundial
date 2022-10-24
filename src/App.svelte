<script lang="ts">
  import Clock from "./components/Clock";
  import TableView from "./components/TableView.svelte";
  import YearlyView from "./components/YearlyView";
  import Routes from "./components/Router/Routes.svelte";
  import Route from "./components/Router/Route.svelte";
  import Preloader from "./components/Preloader.svelte";
  import Menu from "./components/Menu";
  import { i18n } from "$/stores/i18n";
  import { AppRouteEnum } from "./routes";
</script>

<!-- <svelte:head>
	<title>{$i18n.t`title`}</title>
</svelte:head> -->

{#if $i18n.isInitialized}
<div class="content-wrap">
  <Routes>
    <Route url={AppRouteEnum.dialView} component={Clock} />
    <Route url={AppRouteEnum.tableView} component={TableView} />
    <Route url={AppRouteEnum.yearlyView} component={YearlyView} />
  </Routes>

</div>
<Menu />
{:else}
<Preloader />
{/if}

<style>
  .content-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh
  }
</style>