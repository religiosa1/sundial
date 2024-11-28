<script lang="ts">
	import type { Snippet } from "svelte";
	import type { SuncalcData } from "$lib/models/SuncalcData";
	import type { DaySectionId } from "$lib/models/DaySection";
	import { timeToDeg } from "$lib/utils/timeToDeg";

	import Dial from "./Dial/Dial.svelte";
	import SectionInfo from "./SectionInfo.svelte";

	interface Props {
		currentTime: Date;
		suncalc: SuncalcData;
		children?: Snippet;
	}
	const { children, currentTime, suncalc }: Props = $props();

	let rotated = $state(true);
	const rotationStyles = $derived(
		rotated ? `transform: rotate(-${timeToDeg(currentTime).toFixed(3)}deg)` : ""
	);

	let selectedSectionId: DaySectionId | undefined = $state(undefined);
	function onSectionSelect(dsId: DaySectionId | undefined) {
		selectedSectionId = dsId;
	}
</script>

<div class="clock">
	<div class="top-marker" class:top-marker-visible={rotated}></div>
	<div class="dial-wrapper">
		<button
			class="dial-rotater"
			type="button"
			aria-label="Toggle Dial rotation"
			style={rotationStyles}
			onclick={() => (rotated = !rotated)}
		>
			<Dial {suncalc} {selectedSectionId} {onSectionSelect} />
		</button>
		<div class="dial-overlay">
			{@render children?.()}
		</div>
	</div>
	<SectionInfo {suncalc} sectionId={selectedSectionId} />
</div>

<style>
	.dial-wrapper,
	.dial-rotater {
		display: block;
		border: 0;
		margin: 0 auto;
		padding: 0;
		border-radius: 50%;
		width: 85vmin;
		max-height: 85vmin;
		background: transparent;
	}
	.dial-wrapper {
		position: relative;
		margin: auto;
		overflow: hidden;
	}
	.dial-rotater {
		transition: transform 0.4s ease;
	}
	.dial-overlay {
		position: absolute;
		inset: 20%;
		margin: auto;
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 3vmin;
	}
	@media (max-width: 700px) {
		.dial-overlay {
			font-size: 4.5vmin;
		}
	}
	.top-marker {
		width: 0.8vmin;
		height: 0.8vmin;
		border: 2px solid var(--clr-txt);
		border-top: 0;
		border-left: 0;
		margin: 0 auto 0.8vmin;
		transform: rotate(45deg);
		opacity: 0;
		transition: opacity 0.4s ease;
	}
	.top-marker-visible {
		opacity: 1;
	}
</style>
