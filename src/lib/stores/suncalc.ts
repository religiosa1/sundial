import sunCalc from "suncalc";
import { derived } from "svelte/store";

import { latitude, longitude } from "./location";
import { date } from "./date";

export const suncalc = derived([date, latitude, longitude], ([$date, $latitude, $longitude]) => ({
	...sunCalc.getTimes($date, $latitude, $longitude),
	...sunCalc.getPosition($date, $latitude, $longitude),
}));
