<script lang="ts">
  import { latitude, longitude } from "$/stores/location";
  import { latToDegree, longToDegree } from "$/utils/latlong";
</script>

<div class="placetime-info">
  <span class="lat">{latToDegree($latitude)}</span>
  <span class="long">{longToDegree($longitude)}</span>
</div>