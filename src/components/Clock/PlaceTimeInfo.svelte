<script lang="ts">
  import { latitude, longitude } from "$/stores/location";
  import { latToDegree, longToDegree } from "$/utils/latlong";
</script>

<div class="placetime-info">
  <span title="широта" class="lat">{latToDegree($latitude)}</span>,
  <span title="долгота" class="long">{longToDegree($longitude)}</span>
</div>

<style>
  .placetime-info {
    font-size: 0.6em;
    margin: 1em;
  }
</style>