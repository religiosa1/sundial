import { on } from "svelte/events";
import { goto } from "$app/navigation";
import type { Attachment } from "svelte/attachments";
import { MediaQuery } from "svelte/reactivity";
import type { AppRouteEnum } from "$lib/enums/AppRouteEnum";

export function useSwipeNavigation(
	prev: AppRouteEnum | undefined,
	next?: AppRouteEnum | undefined
) {
	$effect(() => {
		const ac = new AbortController();
		if (prev) {
			on(document, SWIPE_PREV_EVENT, () => goto(prev), {
				signal: ac.signal,
			});
		}
		if (next) {
			on(document, SWIPE_NEXT_EVENT, () => goto(next), {
				signal: ac.signal,
			});
		}
		return () => ac.abort();
	});
}

export const swipe: Attachment<HTMLElement> = (el) => {
	// the same media query as in menu
	const isLandscape = new MediaQuery("width > 600px");

	$effect(() => {
		const ac = new AbortController();
		let lastStart: Touch | undefined;

		on(
			el,
			"touchstart",
			(e) => {
				lastStart = undefined;
				const touch = e.changedTouches.item(0);
				const target = e.target as Element;

				if (!touch || isInteractiveElement(target)) {
					return;
				}

				// Check if touch target is within scrollable content along the swipe axis
				// In landscape mode, we swipe vertically, so we need to avoid vertical scrolling
				if (hasScrollableAncestor(target, !isLandscape.current)) {
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

				const [travesedActiveAxis, traversedPassiveAxis] = isLandscape.current
					? [yTraversed, xTraversed]
					: [xTraversed, yTraversed];

				// swipe in passive axis
				if (Math.abs(traversedPassiveAxis) > Math.abs(travesedActiveAxis)) {
					return;
				}

				const windowSizeAlongActiveAxis = isLandscape.current
					? window.innerHeight
					: window.innerWidth;
				const swipeRatio = Math.abs(travesedActiveAxis) / windowSizeAlongActiveAxis;

				const SWIPE_RATIO_THRESHOLD = 0.2;
				if (swipeRatio > SWIPE_RATIO_THRESHOLD) {
					document.dispatchEvent(
						new CustomEvent(travesedActiveAxis > 0 ? SWIPE_PREV_EVENT : SWIPE_NEXT_EVENT)
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
};

function findEvent(events: TouchList, id: number | undefined): Touch | undefined {
	if (id == null) return;
	for (const event of events) {
		if (event.identifier === id) return event;
	}
}

const SWIPE_NEXT_EVENT = "swipenext";
const SWIPE_PREV_EVENT = "swipeprev";

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

function hasScrollableAncestor(element: Element, horizontalScroll: boolean): boolean {
	let current: Element | null = element;

	while (current && current !== document.body) {
		if (isScrollableAlongAxis(current, horizontalScroll)) {
			return true;
		}
		current = current.parentElement;
	}

	return false;
}

function isScrollableAlongAxis(element: Element, horizontalScroll: boolean): boolean {
	const computedStyle = window.getComputedStyle(element);
	const overflowProperty = horizontalScroll ? "overflowX" : "overflowY";
	const overflow = computedStyle[overflowProperty];

	// Check if overflow allows scrolling
	if (!["auto", "scroll"].includes(overflow)) {
		return false;
	}

	// Check if element actually has scrollable content
	if (horizontalScroll) {
		return element.scrollWidth > element.clientWidth;
	} else {
		return element.scrollHeight > element.clientHeight;
	}
}
