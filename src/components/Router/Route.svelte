<script lang="ts">
  import { getContext } from 'svelte';
  import type { ComponentType } from "svelte";
  import type { RouterContext } from "$/models/RouterContext";
  export let component: ComponentType;
  export let url: string;
  const { currentRoute } = getContext<RouterContext>("router");
</script>

{#if $currentRoute === url}
  <svelte:component this={component} />
  <slot />
{/if}