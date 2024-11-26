<script lang="ts">
	import { onNavigate } from "$app/navigation";
	import { swipe } from "$lib/actions/swipe.svelte";
	import AboutPopup from "$lib/components/AboutPopup.svelte";
	import Menu from "$lib/components/Menu";
	import { version } from "../../package.json";
	import "./layout.css";

	let { children } = $props();

	let showAboutHelp = $state(false);

	onNavigate((navigation) => {
		if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		return new Promise<void>((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<main class="page-container" use:swipe>
	{@render children()}
</main>
<Menu />

<footer>
	<button class="about-btn" type="button" onclick={() => (showAboutHelp = true)}> About </button>
	v{version}
</footer>

<AboutPopup bind:open={showAboutHelp} />

<style>
	.page-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
	}
	footer {
		position: fixed;
		bottom: 10px;
		left: 10px;
		font-size: 0.7em;
		opacity: 0.6;
	}

	.about-btn {
		all: unset;
		display: inline;
		text-decoration: underline dotted;
		cursor: pointer;
		&:active {
			translate: 1px 1px;
		}
	}
</style>
