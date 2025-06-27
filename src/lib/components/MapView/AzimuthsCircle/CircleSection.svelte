<script lang="ts">
	import { azimuthRadToUnitCircleRad } from "../azimuth";
	import { RADIUS, SVG_CENTER } from "./svgconsts";

	interface Props {
		/** Heighlighted pass id*/
		id: string;
		/** Section label*/
		name: string;
		/** Start azimuth in radians */
		start: number;
		/** End azimuth in radians */
		end: number;
		/** rgb color hexvalue, without alpha */
		color: string;
		highlighted?: boolean;

		onmouseover?: () => void | undefined;
		onmouseleave?: () => void | undefined;
	}
	let {
		id,
		name,
		start: startAzimuth,
		end: endAzimuth,
		color,
		highlighted,
		onmouseleave,
		onmouseover,
	}: Props = $props();

	const angleStart = $derived(azimuthRadToUnitCircleRad(startAzimuth));
	const angleEnd = $derived(azimuthRadToUnitCircleRad(endAzimuth));

	const [arcStartX, arcStartY] = $derived(angleToCoord(angleStart));
	const [arcEndX, arcEndY] = $derived(angleToCoord(angleEnd));

	const sweepFlag = $derived(angleStart > angleEnd ? 1 : 0);
	const largeArcFlag = $derived(Math.abs(angleStart - angleEnd) > Math.PI ? 1 : 0);

	function angleToCoord(angle: number) {
		const x2 = SVG_CENTER + RADIUS * Math.cos(angle);
		const y2 = SVG_CENTER + RADIUS * -Math.sin(angle);
		return [x2, y2];
	}

	const path = $derived(
		`M ${SVG_CENTER},${SVG_CENTER}
L ${arcStartX},${arcStartY}
A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} ${sweepFlag} ${arcEndX} ${arcEndY}
L ${SVG_CENTER} ${SVG_CENTER}`
	);
</script>

<path
	role="img"
	aria-label={name}
	class="section"
	d={path}
	stroke={color}
	fill={color}
	fill-opacity="0.5"
	onfocus={onmouseover}
	{onmouseleave}
	{onmouseover}
/>

{#if highlighted}
	<path {id} class="highlight" d={path} />
{/if}

<style>
	.section {
		stroke-width: 5px;
	}

	.section:focus {
		outline: 0;
	}

	.highlight {
		filter: drop-shadow(0 0 2px var(--clr-figure-highlight));
		pointer-events: none;
		stroke: var(--clr-figure-highlight);
		stroke-width: 5px;
		fill: none;
	}
</style>
