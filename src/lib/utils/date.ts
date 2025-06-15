import { addMilliseconds, startOfDay } from "date-fns";

/** Amount of MS in various time durations */
export const Time = {
	Seconds: 1000,
	Minutes: 60_000,
	Hours: 3_600_000,
} as const;

/** Applies time-only in ms of one timeSource to date-only portion of dateSource
 * returning a new resulting date object that's combination of both sources.*/
export function setTimeMs(dateSource: Date, timeMs: number): Date {
	return addMilliseconds(startOfDay(dateSource), timeMs);
}

/** Get time-only portion of a date in MS */
export function getTimeonlyMs(value: Date): number {
	const d = startOfDay(value).getTime();
	return value?.getTime() - d;
}
