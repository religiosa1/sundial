<script lang="ts">
	import { azimuthRadToUnitCircleRad } from "../azimuth";
	import { RADIUS, SVG_CENTER } from "./svgconsts";

	interface Props {
		stroke: string;
		azimuth: number;
		dashed?: boolean;
	}
	let { azimuth, stroke, dashed }: Props = $props();

	const [x2, y2] = $derived.by(() => {
		const angle = azimuthRadToUnitCircleRad(azimuth);

		const x2 = SVG_CENTER + RADIUS * Math.cos(angle);
		const y2 = SVG_CENTER + RADIUS * -Math.sin(angle);
		return [x2, y2];
	});
</script>

<line class:dashed x1={SVG_CENTER} y1={SVG_CENTER} {x2} {y2} {stroke} />

<style>
	line {
		stroke-linecap: round;
		stroke-width: 5px;
	}
	.dashed {
		stroke-dasharray: 8px 20px;
	}
</style>
