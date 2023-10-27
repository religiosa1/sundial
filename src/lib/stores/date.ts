import { writable, readable, derived } from 'svelte/store';
import { getDayOfYear, setDayOfYear } from "date-fns";
import { DateType } from "$lib/models/DateTypeEnum";

export const dateType = writable<DateType>(DateType.auto);
export const manualDayOfYear = writable(getDayOfYear(new Date()));

const today = readable(new Date(), set => {
	let day_to: ReturnType<typeof setTimeout>;
	let setDayTO = () => {
		let now = new Date();
		let tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
		tomorrow.setHours(0);
		tomorrow.setMinutes(0);
		tomorrow.setSeconds(0);
		tomorrow.setMilliseconds(0);
		return setTimeout(() => {
			set(new Date());
			setDayTO();
		}, tomorrow.getTime() - now.getTime());
	};

	day_to = setDayTO();

	return () => clearTimeout(day_to);
});

export const date = derived(
	[dateType, manualDayOfYear, today],
	([$dateType, $manualDayOfYear, $today]) => {
		if ($dateType === DateType.manual) {
			return setDayOfYear(new Date($today), $manualDayOfYear);
		} else {
			return $today;
		}
	}
);