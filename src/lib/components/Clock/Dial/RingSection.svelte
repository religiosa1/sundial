<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { calculatePath, type Colorized } from "./helpers";
	import type { ClockSection } from "$lib/models/ClockSection";

	export let section: Colorized<ClockSection>;
	export let selected: boolean;

	const dispatch = createEventDispatcher<{
		sectionMouseOver: Colorized<ClockSection>;
		sectionMouseLeave: undefined;
	}>();
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<path
	id={section.id}
	d={calculatePath(section)}
	stroke={section.stroke}
	class={"ring-section ring-section-" + section.id}
	class:highlight={selected}
	on:mouseover={() => dispatch("sectionMouseOver", section)}
	on:mouseleave={() => dispatch("sectionMouseLeave")}
>
	<slot />
</path>

<style>
	.ring-section {
		stroke-width: 20px;
		fill: none;
	}
	.ring-section.highlight {
		filter: drop-shadow(0 0 2px blue);
	}
</style>
