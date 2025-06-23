<script lang="ts">
	import { azimuthRadToUnitCircleRad } from "../azimuth";
	import { RADIUS, SVG_CENTER } from "./svgconsts";

	interface Props {
		/** Azimuth label*/
		name: string;
		color: string;
		azimuth: number;
		dashed?: boolean;

		highlighted?: boolean;

		onmouseover?: () => void | undefined;
		onmouseleave?: () => void | undefined;
	}
	let { name, highlighted, azimuth, color, dashed, onmouseleave, onmouseover }: Props = $props();

	const [x2, y2] = $derived.by(() => {
		const angle = azimuthRadToUnitCircleRad(azimuth);

		const x2 = SVG_CENTER + RADIUS * Math.cos(angle);
		const y2 = SVG_CENTER + RADIUS * -Math.sin(angle);
		return [x2, y2];
	});
</script>

<line
	role="img"
	aria-label={name}
	class:highlighted
	class:dashed
	x1={SVG_CENTER}
	y1={SVG_CENTER}
	{x2}
	{y2}
	stroke={color}
	onfocus={onmouseover}
	{onmouseleave}
	{onmouseover}
/>

<style>
	line {
		stroke-linecap: round;
		stroke-width: 5px;
	}
	.dashed {
		stroke-dasharray: 8px 20px;
	}
	line:focus {
		outline: 0;
	}
	.highlighted {
		filter: drop-shadow(0 0 2px blue);
	}
</style>
