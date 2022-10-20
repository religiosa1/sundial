<script>
  import { format as dateFormat, isValid } from "date-fns";

  import { suncalc } from "$/stores/suncalc";
  import { i18n } from '$/stores/i18n';

  const NA = "—/—"

  function format(time) {
    return isValid(time)? dateFormat(time, "H:mm:ss") : NA;
  }
</script>

<div class="table-responsive times-list">
  <table class="table">
    <tbody>
      <tr>
        <th>{$i18n.t`clock.astronomicalTwilight`}</th>
        <td>{ format($suncalc.nightEnd) }</td>
        <td>{ format($suncalc.nauticalDawn) }</td>
      </tr>
      <tr>
        <th>{$i18n.t`clock.nauticalTwilight`}</th>
        <td>{ format($suncalc.nauticalDawn) }</td>
        <td>{ format($suncalc.dawn) }</td>
      </tr>
      <tr>
        <th>{$i18n.t`clock.civilTwilight`}</th>
        <td>{ format($suncalc.dawn) }</td>
        <td>{ format($suncalc.sunrise) }</td>
      </tr>
      <tr>
        <th>{$i18n.t`clock.sunrise`}</th>
        <td>{ format($suncalc.sunrise) }</td>
        <td>{ format($suncalc.sunriseEnd) }</td>
      </tr>
      <tr>
        <th>{$i18n.t`clock.morningGoldenHour`}</th>
        <td>{ format($suncalc.sunriseEnd) }</td>
        <td>{ format($suncalc.goldenHourEnd) }</td>
      </tr>
      <tr>
        <th>{$i18n.t`clock.day`}</th>
        <td>{ format($suncalc.goldenHourEnd) }</td>
        <td>{ format($suncalc.goldenHour) }</td>
      </tr>
      <tr>
        <th>{$i18n.t`clock.noon`}</th>
        <td colspan="2">{ format($suncalc.solarNoon) }</td>
      </tr>
      <tr>
        <th>{$i18n.t`clock.eveningGoldenHour`}</th>
        <td>{ format($suncalc.goldenHour) }</td>
        <td>{ format($suncalc.sunsetStart) }</td>
      </tr>
      <tr>
        <th>{$i18n.t`clock.sunfall`}</th>
        <td>{ format($suncalc.sunsetStart) }</td>
        <td>{ format($suncalc.sunset) }</td>
      </tr>
      <tr>
        <th>{$i18n.t`clock.civilTwilight`}</th>
        <td>{ format($suncalc.sunset) }</td>
        <td>{ format($suncalc.dusk) }</td>
      </tr>
      <tr>
        <th>{$i18n.t`clock.nauticalTwilight`}</th>
        <td>{ format($suncalc.dusk) }</td>
        <td>{ format($suncalc.nauticalDusk) }</td>
      </tr>
      <tr>
        <th>{$i18n.t`clock.astronomicalTwilight`}</th>
        <td>{ format($suncalc.nauticalDusk) }</td>
        <td>{ format($suncalc.night) }</td>
      </tr>
      <tr>
        <th>{$i18n.t`clock.night`}</th>
        <td>{ format($suncalc.night) }</td>
        <td>{ NA }</td>
      </tr>
      <tr>
        <th>{$i18n.t`clock.nadir`}</th>
        <td colspan="2">{ format($suncalc.nadir) }</td>
      </tr>
    </tbody>
  </table>
</div>

<style>
.times-list {
  max-width: 600px;
  margin: auto;
}
.table { margin: auto; }
</style>
