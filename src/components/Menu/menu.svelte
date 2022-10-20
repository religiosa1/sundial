<script>
  import { ClockUiTypeEnum } from '$/models/ClockUiTypeEnum';
  import { tableView, state } from '$/stores/clockUi';
  import { i18n } from '$/stores/i18n';

  function toggleTableView() {
    tableView.update(n => !n);
  }

  function togglePlaceForm() {
    if ($state === ClockUiTypeEnum.placeform) {
      $state = ClockUiTypeEnum.default;
    } else {
      $state = ClockUiTypeEnum.placeform;
    }
  }

  function toggleDateForm() {
    if ($state === ClockUiTypeEnum.dateform) {
      $state = ClockUiTypeEnum.default;
    } else {
      $state = ClockUiTypeEnum.dateform;
    }
  }
</script>

<aside class="menu">
  <button
    type="button"
    class="menu__button display-type"
    class:display-type-dial={$tableView}
    title={$i18n.t($tableView ? "menu.dial" : "menu.table")}
    on:click={toggleTableView}
  />
  <!--
    Комментируем, пока не прикрутим нужные формы
  <button
    type="button"
    class="menu__button placeform"
    class:active={ $state === ClockUiTypeEnum.placeform }
    title={$i18n.t`menu.place`}
    on:click={togglePlaceForm}
  />
  <button
    type="button"
    class="menu__button dateform"
    class:active={ $state === ClockUiTypeEnum.dateform }
    title={$i18n.t`menu.date`}
    on:click={toggleDateForm}
  /> -->
</aside>

<style>
.menu {
  position: absolute;
  top: 10px;
  right: 30px;
  background: transparent;
  transition: background-color 0.4s, box-shadow 0.4s;
  display: flex;
  flex-flow: column nowrap;
  gap: 10px
}
  .menu__button {
    display: block;
    width:50px;
    height: 50px;
    border: 1px solid #888;
    border-radius: 50%;
    margin: 0;
    padding: 0;
    background: #eee;
    box-shadow: 0 0 20px #ccc inset;
    transition: background-color 0.4s ease-in-out, border-color 0.4s ease-in-out;
    outline: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .menu__button:last-of-type { margin-bottom: 0; }
  .menu__button:focus {
    border-color: #88f;
  }

  .menu__button::after {
    width: 100%;
    height: 100%;
    background: no-repeat center center / 65% auto;
    content: "";
  }

  .menu__button:active { transform: translate(1px, 1px); }
  /* .menu__button.active { background-color: #999; } */

  .display-type::after { background-image: url("/img/table.svg"); }
  .display-type-dial { background-image: url("/img/dial.svg"); }

  /* .placeform { background-image: url("/img/globe.svg"); }
  .dateform { background-image: url("/img/calendar.svg"); } */
@media (prefers-color-scheme: dark) {
  .menu__button {
    background-color: #0E0E0E;
    box-shadow: 0 0 20px #2E2E2E inset;
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
