import { on } from "svelte/events";
import { goto } from "$app/navigation";
import type { AppRouteEnum } from "$lib/enums/AppRouteEnum";

const SWIPE_LEFT_EVENT = "swipeLeft";
const SWIPE_RIGHT_EVENT = "swipeRight";

const INTERACTIVE_ELEMENTS = [
	"INPUT", //
	"TEXTAREA",
];

function isInteractiveElement(element: Element): boolean {
	return (
		INTERACTIVE_ELEMENTS.includes(element.tagName) ||
		element.hasAttribute("contenteditable") ||
		element.closest("[contenteditable]") !== null
	);
}

export function useSwipeNavigation(
	prev: AppRouteEnum | undefined,
	next?: AppRouteEnum | undefined
) {
	$effect(() => {
		const ac = new AbortController();
		if (prev) {
			on(document, SWIPE_RIGHT_EVENT, () => goto(prev), {
				signal: ac.signal,
			});
		}
		if (next) {
			on(document, SWIPE_LEFT_EVENT, () => goto(next), {
				signal: ac.signal,
			});
		}
		return () => ac.abort();
	});
}

interface SwipeOptions {
	threshold?: number;
}

export function swipe(el: HTMLElement, { threshold = 0.2 }: SwipeOptions = {}) {
	$effect(() => {
		const ac = new AbortController();
		let lastStart: Touch | undefined;

		on(
			el,
			"touchstart",
			(e) => {
				const touch = e.changedTouches.item(0);
				if (!touch || isInteractiveElement(e.target as Element)) {
					lastStart = undefined;
					return;
				}
				lastStart = touch;
			},
			{
				signal: ac.signal,
				passive: true,
			}
		);

		on(
			el,
			"touchcancel",
			() => {
				lastStart = undefined;
			},
			{
				signal: ac.signal,
				passive: true,
			}
		);

		on(
			el,
			"touchend",
			(e) => {
				const start = lastStart;
				lastStart = undefined;

				const end = findEvent(e.changedTouches, start?.identifier);
				if (!start || !end) {
					return;
				}

				const xTraversed = end.clientX - start.clientX;
				const yTraversed = end.clientY - start.clientY;
				const rate = Math.abs(xTraversed) / window.innerWidth;
				if (Math.abs(xTraversed) < Math.abs(yTraversed)) {
					return;
				}

				if (rate > threshold) {
					document.dispatchEvent(
						new CustomEvent(xTraversed > 0 ? SWIPE_RIGHT_EVENT : SWIPE_LEFT_EVENT)
					);
					return;
				}
			},
			{
				signal: ac.signal,
				passive: true,
			}
		);

		return () => ac.abort();
	});
}

function findEvent(events: TouchList, id: number | undefined): Touch | undefined {
	if (id == null) return;
	for (const event of events) {
		if (event.identifier === id) return event;
	}
}
