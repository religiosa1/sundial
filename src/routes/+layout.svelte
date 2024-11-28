<script lang="ts">
	import { onNavigate, beforeNavigate } from "$app/navigation";
	import { swipe } from "$lib/actions/swipe.svelte";
	import AboutPopup from "$lib/components/AboutPopup.svelte";
	import Menu from "$lib/components/Menu";
	import { routeList, type AppRouteEnum } from "$lib/enums/AppRouteEnum";
	import { version } from "../../package.json";
	import "./layout.css";

	let { children } = $props();

	let showAboutHelp = $state(false);

	let reverseNavigation = $state(false);

	beforeNavigate((e) => {
		if (!e.from?.route.id || !e.to?.route.id) return;
		const startIdx = routeList.indexOf(e.from.route.id as AppRouteEnum);
		const endIdx = routeList.indexOf(e.to.route.id as AppRouteEnum);
		if (startIdx > endIdx) {
			reverseNavigation = true;
		} else {
			reverseNavigation = false;
		}
	});

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

<main class="page-container" class:reverseNavigation use:swipe>
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
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		padding: 1rem;
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

	/* View Transition animations */
	@supports (view-transition-name: main) {
		.page-container {
			view-transition-name: main;
		}
		.page-container.reverseNavigation {
			view-transition-name: main-reverse;
		}

		@media (width > 700px) {
			.page-container {
				view-transition-name: main-desktop;
			}
			.page-container.reverseNavigation {
				view-transition-name: main-reverse-desktop;
			}
		}

		/* Mobile */
		::view-transition-old(main) {
			animation:
				90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
				300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-out-forward;
		}

		::view-transition-new(main) {
			animation:
				210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
				300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-in-forward;
		}

		::view-transition-old(main-reverse) {
			animation:
				90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
				300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-out-reverse;
		}

		::view-transition-new(main-reverse) {
			animation:
				210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
				300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-in-reverse;
		}
		/* Desktop */
		::view-transition-old(main-desktop) {
			animation:
				90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
				300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-out-forward-vertical;
		}

		::view-transition-new(main-desktop) {
			animation:
				210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
				300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-in-forward-vertical;
		}

		::view-transition-old(main-reverse-desktop) {
			animation:
				90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
				300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-out-reverse-vertical;
		}

		::view-transition-new(main-reverse-desktop) {
			animation:
				210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
				300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-in-reverse-vertical;
		}

		@keyframes fade-in {
			from {
				opacity: 0;
			}
		}

		@keyframes fade-out {
			to {
				opacity: 0;
			}
		}

		@keyframes slide-in-forward {
			from {
				transform: translateX(100%);
			}
		}

		@keyframes slide-out-forward {
			to {
				transform: translateX(-100%);
			}
		}

		@keyframes slide-in-reverse {
			from {
				transform: translateX(-100%);
			}
		}

		@keyframes slide-out-reverse {
			to {
				transform: translateX(100%);
			}
		}

		@keyframes slide-in-forward-vertical {
			from {
				transform: translateY(100%);
			}
		}

		@keyframes slide-out-forward-vertical {
			to {
				transform: translateY(-100%);
			}
		}

		@keyframes slide-in-reverse-vertical {
			from {
				transform: translateY(-100%);
			}
		}

		@keyframes slide-out-reverse-vertical {
			to {
				transform: translateY(100%);
			}
		}
	}
</style>
