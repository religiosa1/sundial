<script lang="ts">
	import { azimuthRadToUnitCircleRad } from "../azimuth";
	import { RADIUS, SVG_CENTER } from "./svgconsts";

	interface Props {
		startAzimuth: number;
		endAzimuth: number;
		/** rgb color hexvalue, without alpha */
		color: string;
	}
	let { startAzimuth, endAzimuth, color }: Props = $props();

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
</script>

<path
	d="M {SVG_CENTER},{SVG_CENTER}
  L {arcStartX},{arcStartY}
  A {RADIUS} {RADIUS} 0 {largeArcFlag} {sweepFlag} {arcEndX} {arcEndY}
  L {SVG_CENTER} {SVG_CENTER}"
	stroke={color}
	fill={color}
	fill-opacity="0.5"
/>

<style>
	path {
		stroke-width: 5px;
	}
</style>
