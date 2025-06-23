<script lang="ts">
	import { FILL_OPACITY, getAzimuthSettings, SunAzimuthTypeEnum } from "./sectionsConfig";

	interface Props {
		highlightedAzimuthType: SunAzimuthTypeEnum | undefined;
		onHighlightedType: (id: SunAzimuthTypeEnum | undefined) => void;
	}

	let { highlightedAzimuthType, onHighlightedType }: Props = $props();
</script>

{#snippet legend_item(text: string, type: SunAzimuthTypeEnum, noFill?: boolean)}
	{@const { color } = getAzimuthSettings(type)}
	<div
		role="figure"
		class="legend__item"
		class:highlighted={highlightedAzimuthType === type}
		onfocus={() => onHighlightedType(type)}
		onmouseover={() => onHighlightedType(type)}
		onmouseleave={() => onHighlightedType(undefined)}
	>
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
CivilTwilight
<div class="legend">
	<dl class="legend__content">
		{@render legend_item("Sunrise", SunAzimuthTypeEnum.Sunrise)}
		{@render legend_item("Sunset", SunAzimuthTypeEnum.Sunset)}
		{@render legend_item("Golden Hour", SunAzimuthTypeEnum.GoldenHour)}
		{@render legend_item("Civil Twilight", SunAzimuthTypeEnum.CivilTwilight)}
		{@render legend_item("Sun Position", SunAzimuthTypeEnum.SunMarker, true)}
		{@render legend_item("Moon Position", SunAzimuthTypeEnum.MoonMarker, true)}
		{@render legend_item("Noon", SunAzimuthTypeEnum.NoonMarker, true)}
	</dl>
</div>

<style>
	.legend {
		padding: 1em;
		/* background-color: var(--clr-bg); */
		background-color: #e0dfdf;
		border: 1px solid black;
		color: var(--clr-txt-dark);
		font-size: smaller;
	}
	@media (width > 600px) {
		.legend {
			font-size: unset;
		}
	}

	.legend__content {
		margin: 0 auto;
		max-width: 1000px;
		columns: 2;
		column-fill: balance;
		column-gap: 1em;
	}
	@media (width < 1200px) and (aspect-ratio > 1.2),
		(orientation: landscape) and (aspect-ratio > 1.7) and (width > 600px) {
		.legend__content {
			columns: auto;
		}
	}

	/* Mobile landscape or ultrawide monitors -- taking the whole vertical space in 1 col */
	@media (orientation: landscape) and (aspect-ratio > 1.7) and (width > 600px) {
		.legend {
			height: 100%;
		}
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

	.legend__item.highlighted dt {
		filter: drop-shadow(0 0 2px blue);
	}
	.legend__item.highlighted dd {
		font-weight: bold;
	}
</style>
