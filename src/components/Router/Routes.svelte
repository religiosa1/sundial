<script lang="ts">
  import { setContext } from 'svelte';
  import type { RouterContext } from "$/models/RouterContext";
  import { currentRoute } from "$/stores/clockUi";
  setContext<RouterContext>('router', { currentRoute });
</script>

<slot />