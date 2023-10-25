<script lang="ts">
  import { SubMenuEnum } from "$lib/models/SubMenuEnum";
  import { AppRouteEnum } from "$lib/models/routes";

  import DateForm from "./DateForm.svelte";

  let submenu = SubMenuEnum.none;

  function toggleSubmenu(type: SubMenuEnum) {
    return () => {
      if (submenu !== type) {
        submenu = type;
      } else {
        submenu = SubMenuEnum.none;
      }
    };
  }
</script>

<aside class="menu">
  <nav class="menu__nav">
    <a
      href={AppRouteEnum.dialView}
      class="menu__button display-type display-type_dial"
      title="dial view"
    >
      dial view
    </a>

    <a
      href={AppRouteEnum.tableView}
      class="menu__button display-type display-type_table"
      title="table view"
    >
      table view
    </a>

    <a
      href={AppRouteEnum.yearlyView}
      class="menu__button display-type display-type_yearly"
      title="yearly view"
    >
      yearly view
    </a>
  </nav>
  <slot />
  <div class="controls">
    <!--
      Комментируем, пока не прикрутим нужные формы
    <button
      type="button"
      class="menu__button placeform"
      class:active={ $state === ClockUiTypeEnum.placeform }
      title="place"
      on:click={togglePlaceForm}
    />
    -->
    <!-- <button
      type="button"
      class="menu__button dateform"
      class:active={ submenu === SubMenuEnum.dateform }
      title="date"
      on:click={toggleSubmenu(SubMenuEnum.dateform)}
    /> -->
  </div>
</aside>

{#if submenu === SubMenuEnum.dateform}
  <DateForm on:close={() => (submenu = SubMenuEnum.none)} />
{/if}

<style>
  .menu {
    position: absolute;
    top: 10px;
    right: 30px;
    background: transparent;
  }
  .menu__nav,
  .controls {
    display: flex;
    flex-flow: column nowrap;
    gap: 10px;
    margin: 0 0 10px;
  }
  .menu__button {
    display: block;
    width: 50px;
    height: 50px;
    margin: 0;
    padding: 0;
    border: 1px solid #888;
    border-radius: 50%;
    font-size: 0;
    background: #eee;
    box-shadow: 0 0 20px #ccc inset;
    transition: background-color 0.4s ease-in-out, border-color 0.4s ease-in-out;
    outline: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .menu__button:focus {
    border-color: #88f;
  }

  .menu__button::after {
    width: 100%;
    height: 100%;
    background: no-repeat center center / 65% auto;
    content: "";
  }

  .menu__button:active {
    transform: translate(1px, 1px);
  }
  .menu__button.active {
    background-color: #999;
  }

  .display-type_table::after {
    background-image: url("/img/table.svg");
  }
  .display-type_dial::after {
    background-image: url("/img/dial.svg");
  }
  /* FIXME отдельная картинка для этого раздела  */
  .display-type_yearly::after {
    background-image: url("/img/calendar.svg");
  }

  /* .placeform { background-image: url("/img/globe.svg"); } */
  .dateform::after {
    background-image: url("/img/calendar.svg");
  }
  @media (prefers-color-scheme: dark) {
    .menu__button {
      background-color: #0e0e0e;
      box-shadow: 0 0 20px #2e2e2e inset;
    }
    .menu__button::after {
      filter: invert(1) brightness(0.9);
    }
  }
  @media (max-width: 700px) {
    .menu {
      top: auto;
      bottom: 10px;
      right: 10px;
      left: 10px;
    }
    .menu__nav {
      flex-direction: row;
      gap: 25px;
      justify-content: space-around;
      justify-content: space-evenly;
    }
    .menu__button {
      width: 40px;
      height: 40px;
    }
  }
</style>
