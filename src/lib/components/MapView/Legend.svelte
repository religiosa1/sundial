<script lang="ts">
	import { FILL_OPACITY, getSectionColor, SourceNameEnum } from "./sectionsConfig";
</script>

{#snippet legend_item(text: string, type: SourceNameEnum, noFill?: boolean)}
	{@const color = getSectionColor(type)}
	<div class="legend__item">
		<dt
			role="img"
			aria-label="{text} legend"
			class:noFill
			style:border-color={color}
			style:background-color={color + (255 * FILL_OPACITY).toString(16)}
		></dt>
		<dd>{text}</dd>
	</div>
{/snippet}

<div class="legend">
	<dl class="legend__content">
		{@render legend_item("Sunrise", SourceNameEnum.Sunrise)}
		{@render legend_item("Sunset", SourceNameEnum.Sunset)}
		{@render legend_item("Golden Hour", SourceNameEnum.GoldenHour)}
		{@render legend_item("Civil Twilight", SourceNameEnum.CivilTwilight)}
		{@render legend_item("Sun Position", SourceNameEnum.SunMarker, true)}
		{@render legend_item("Moon Position", SourceNameEnum.MoonMarker, true)}
		{@render legend_item("Noon", SourceNameEnum.NoonMarker, true)}
	</dl>
</div>

<style>
	.legend {
		padding: 1em;
		/* background-color: var(--clr-bg); */
		background-color: #e0dfdf;
		border: 1px solid black;
		color: var(--clr-txt-dark);
	}
	.legend__content {
		margin: 0 auto;
		max-width: 1000px;
		columns: 2;
		column-fill: balance;
		column-gap: 1em;
	}
	.legend__item {
		break-inside: avoid;
		display: flex;
		align-items: center;
		justify-content: start;
		gap: 0.6em;
		margin: 0 0 0.7em;
		min-height: 1.2em;
	}
	.legend__item:last-of-type {
		margin-bottom: 0;
	}

	.legend dt {
		padding: 0;
		margin: 0;
		float: none;
		display: inline-block;
		width: 2em;
		height: 1.2em;
		border: 3px solid;
	}
	.legend dt.noFill {
		height: 0;
		border-width: 2px;
	}
	.legend dd {
		padding: 0;
		margin: 0;
		float: none;
	}
</style>
