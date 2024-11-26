interface SwipeOptions {
	swipeLeftEvent?: string;
	swipeRightEvent?: string;
	threshold?: number;
}

export function swipe(
	el: HTMLElement,
	{
		swipeLeftEvent = "swipeLeft",
		swipeRightEvent = "swipeRight",
		threshold = 0.2,
	}: SwipeOptions = {}
) {
	$effect(() => {
		const ac = new AbortController();
		let lastStart: Touch | undefined;

		el.addEventListener(
			"touchstart",
			(e) => {
				lastStart = e.changedTouches.item(0) ?? undefined;
			},
			{ signal: ac.signal }
		);

		el.addEventListener(
			"touchcancel",
			() => {
				lastStart = undefined;
			},
			{ signal: ac.signal }
		);

		el.addEventListener(
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
						new CustomEvent(xTraversed > 0 ? swipeRightEvent : swipeLeftEvent)
					);
					return;
				}
			},
			{ signal: ac.signal }
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
