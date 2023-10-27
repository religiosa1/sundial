import { derived } from "svelte/store";
import { latitude, longitude } from "./location";
import { date } from "./date";
import sunCalc from "suncalc";

export const suncalc = derived(
	[date, latitude, longitude],
	([$date, $latitude, $longitude]) => ({
		...sunCalc.getTimes($date, $latitude, $longitude),
		...sunCalc.getPosition($date, $latitude, $longitude),
	})
);
