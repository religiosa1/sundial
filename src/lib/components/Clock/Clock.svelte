<script lang="ts">
	import { onMount } from "svelte";

	import Dial from "./Dial/Dial.svelte";
	import SectionInfo from "./SectionInfo.svelte";
	import PlaceTimeInfo from "./PlaceTimeInfo.svelte";
	import TimeInfo from "./TimeInfo.svelte";
	import type { DaySection } from "$lib/models/DaySection";

	import { timeToDeg } from "$lib/utils/timeToDeg";
	import { onKbdCode } from "$lib/utils/onKbd";

	export let time: Date = new Date();

	let rotated = true;
	$: rotationStyles = rotated
		? `transform: rotate(-${timeToDeg(time)}deg)`
		: "";

	function toggleRotation() {
		rotated = !rotated;
	}

	let section: DaySection | null;
	$: section = null;
	function updateSectionInfo(e: CustomEvent<DaySection>) {
		section = e?.detail || null;
	}

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="clock">
	<div class="top-marker" class:top-marker-visible={rotated} />
	<button
		class="dial-wrapper"
		type="button"
		on:click={toggleRotation}
		on:keydown={onKbdCode(toggleRotation, ["Space", "Enter", "NumpadEnter"])}
	>
		<div class="dial-rotater" style={rotationStyles}>
			<Dial on:sectionHover={updateSectionInfo} />
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="dial-overlay"
			role="button"
			tabindex="0"
			on:click|stopPropagation
		>
			<slot>
				<TimeInfo {time} />
				<PlaceTimeInfo />
			</slot>
		</div>
	</button>
	<SectionInfo {section} />
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
		top: 20%;
		bottom: 20%;
		left: 20%;
		right: 20%;
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
