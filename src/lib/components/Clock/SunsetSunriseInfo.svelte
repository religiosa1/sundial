<script lang="ts">
	import Time from "$lib/components/Time.svelte";
	import type { SuncalcData } from "$lib/models/SuncalcData";
	interface Props {
		suncalc: SuncalcData;
	}
	const { suncalc }: Props = $props();
</script>

<dl class="sunset-sunrise">
	<div class="sunset-sunrise__entry" title="sunrise">
		<dt aria-label="sunrise">↑</dt>
		<dd>
			<Time value={suncalc.sunrise} />
		</dd>
	</div>
	<div class="sunset-sunrise__entry" title="sunset">
		<dt aria-label="sunset">↓</dt>
		<dd>
			<Time value={suncalc.sunset} />
		</dd>
	</div>
</dl>

<style>
	.sunset-sunrise {
		margin: 0;
		padding: 0;
	}
	.sunset-sunrise dt,
	.sunset-sunrise dd {
		display: inline;
		margin: 0;
		padding: 0;
	}
	.sunset-sunrise__entry {
		display: inline-block;
		margin: 0 0.3em;
	}
</style>
