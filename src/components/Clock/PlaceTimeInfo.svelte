<script lang="ts">
  import { latitude, longitude } from "$/stores/location";
  import { latToDegree, longToDegree } from "$/utils/latlong";
  import { i18n } from '$/stores/i18n';
</script>

<div class="placetime-info">
  <span title={$i18n.t`clock.latitude`} class="lat">{latToDegree($latitude)}</span>,
  <span title={$i18n.t`clock.longitude`} class="long">{longToDegree($longitude)}</span>
</div>

<style>
  .placetime-info {
    font-size: 0.6em;
    margin: 1em;
  }
  @media (max-width: 700px) {
    .placetime-info {
      font-size: 0.8em;
    }
  }
</style>