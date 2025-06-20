<script lang="ts">
	import { onNavigate, beforeNavigate } from "$app/navigation";
	import { swipe } from "$lib/actions/swipe.svelte";
	import { useMyLocation } from "$lib/actions/useMyLocation";
	import {
		hasDefaultLocation,
		latitude,
		longitude,
		saveDefaultLocation,
	} from "$lib/stores/location";
	import AboutPopup from "$lib/components/AboutPopup.svelte";
	import Menu from "$lib/components/Menu";
	import { routeList, type AppRouteEnum } from "$lib/enums/AppRouteEnum";
	import { version } from "../../package.json";
	import { calcDistanceBetween } from "$lib/utils/calcDistanceBetween";
	import "./layout.css";

	let { children } = $props();

	let showAboutHelp = $state(false);
	let reverseNavigation = $state(false);

	$effect(() => {
		// minimum distance in meters, that we conside as "user changed his position"
		const DISTANCE_THRESHOLD_M = 3000;

		// additional 20% margin above the reported accuracy of measurements,
		const ACCURACY_MARGIN = 1.2;

		useMyLocation()
			.then((coords) => {
				if (!hasDefaultLocation()) {
					$latitude = coords.latitude;
					$longitude = coords.longitude;
					saveDefaultLocation();
					return;
				}
				// non-reactive as read in promise
				const defaultCoord = [$latitude, $longitude] as const;

				const distanceM =
					calcDistanceBetween(defaultCoord, [coords.latitude, coords.longitude]) * 1000;

				if (!Number.isFinite(coords.accuracy)) {
					console.log(
						"location reading don't provide any infformation on readings accuracy.",
						"Not updating the current coordinates"
					);
					return;
				}
				// As location can be quite low in accuracy, we're not changing the current location to detemined position,
				// if it's within DISTANCE_THRESHOLD_KM from the default position.
				const accuracyWithSafetyMargin = coords.accuracy * ACCURACY_MARGIN;
				if (distanceM < accuracyWithSafetyMargin) {
					console.log(
						`Distance between default and current coords (${distanceM.toFixed(2)}m) is less or is close ` +
							`to accuracy of measurements: ${coords.accuracy.toFixed(2)}m ` +
							`(with safety margin is ${accuracyWithSafetyMargin.toFixed(2)}m).`,
						"Not updating the current coordinates"
					);
					return;
				}
				if (distanceM < DISTANCE_THRESHOLD_M) {
					console.log(
						`Distance between default and current coords (${distanceM.toFixed(2)}m) ` +
							`is less than allowed threshold: ${DISTANCE_THRESHOLD_M}m.`,
						"Not updating the current coordinates."
					);
					return;
				}

				console.log("Updating current location on initial load", coords);
				$latitude = coords.latitude;
				$longitude = coords.longitude;
			})
			.catch(console.warn);
	});

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
