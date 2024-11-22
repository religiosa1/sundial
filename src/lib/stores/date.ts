import { endOfDay, setDayOfYear } from "date-fns";
import { derived, readable, writable } from "svelte/store";

export const manualDayOfYear = writable<number | undefined>(undefined);

export const $today = readable<Date>(new Date(), (set) => {
	set(new Date());
	let to: ReturnType<typeof setTimeout> | undefined;

	armTimeout();

	return () => {
		if (to != null) {
			clearTimeout(to);
		}
	};

	function armTimeout() {
		const now = new Date();
		const tomorrow = endOfDay(now);
		const toValue = tomorrow.getTime() - now.getTime();

		to = setTimeout(() => {
			set(new Date());
			armTimeout();
		}, toValue);
	}
});

export const date = derived([manualDayOfYear, $today], ([$manualDayOfYear, $today]) => {
	const d = $manualDayOfYear;
	if (d != null) {
		return setDayOfYear($today, d);
	} else {
		return $today;
	}
});
