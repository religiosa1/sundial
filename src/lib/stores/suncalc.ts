import { getTimes } from "suncalc";
import { derived } from "svelte/store";

import type { SuncalcData } from "#lib/models/SuncalcData.js";
import { latitude, longitude } from "./location";
import { date } from "./date";

export const suncalc = derived(
	[date, latitude, longitude],
	([$date, $latitude, $longitude]): SuncalcData =>
		// utcOffset pins the result to the browser's calendar day, as times are displayed in local time
		getTimes($date, $latitude, $longitude, 0, -$date.getTimezoneOffset())
);
