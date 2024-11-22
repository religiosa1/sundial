<script lang="ts">
	import type { SuncalcData } from "$lib/models/SuncalcData";
	import { format, isValid } from "date-fns";

	interface Props {
		suncalc: SuncalcData;
	}
	const { suncalc }: Props = $props();

	const NA = "—/—";
</script>

<dl class="sunset-sunrise">
	<div class="sunset-sunrise__entry" title="sunrise">
		<dt>↑</dt>
		<dd>
			{#if isValid(suncalc.sunrise)}
				<time class="sunset-sunrise__value" datetime={suncalc.sunrise.toISOString()}>
					{format(suncalc.sunrise, "H:mm:ss")}
				</time>
			{:else}
				<time class="sunset-sunrise__value">
					{NA}
				</time>
			{/if}
		</dd>
	</div>
	<div class="sunset-sunrise__entry" title="sunset">
		<dt>↓</dt>
		<dd>
			{#if isValid(suncalc?.sunrise)}
				<time class="sunset-sunrise__value" datetime={suncalc.sunset.toISOString()}>
					{format(suncalc.sunset, "H:mm:ss")}
				</time>
			{:else}
				<time class="sunset-sunrise__value">
					{NA}
				</time>
			{/if}
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
