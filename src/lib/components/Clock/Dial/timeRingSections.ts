import { circular } from "$lib/utils/circular";
import type { DaySection } from "$lib/models/DaySection";
import type { SuncalcData } from "$lib/models/SuncalcData";
import { isValid } from "date-fns";

const SECTIONS = [
	{
		id: "astronomical-twilight-morning",
		start: "nightEnd",
		end: "nauticalDawn",
	},
	{
		id: "nautical-dawn",
		start: "nauticalDawn",
		end: "dawn",
	},
	{
		id: "dawn",
		start: "dawn",
		end: "sunrise",
	},
	{
		id: "sunrise",
		start: "sunrise",
		end: "sunriseEnd",
	},
	{
		id: "golden-hour-morning",
		start: "sunriseEnd",
		end: "goldenHourEnd",
	},
	{
		id: "day",
		start: "goldenHourEnd",
		end: "goldenHour",
	},
	{
		id: "golden-hour-evening",
		start: "goldenHour",
		end: "sunsetStart",
	},
	{
		id: "sunset",
		start: "sunsetStart",
		end: "sunset",
	},
	{
		id: "dusk",
		start: "sunset",
		end: "dusk",
	},
	{
		id: "nautical-dusk",
		start: "dusk",
		end: "nauticalDusk",
	},
	{
		id: "astronomical-twilight-eveing",
		start: "nauticalDusk",
		end: "night",
	},
	{
		id: "night",
		start: "night",
		end: "nightEnd",
	},
] as const;

export function timeRingSections(times: SuncalcData) {
	const retval: DaySection[] = [];
	for (let i = 0; i < SECTIONS.length; i++) {
		const s = SECTIONS[i];

		if (!s || isValid(times[s.start])) {
			continue;
		}

		const r = {
			id: s.id,
			start: times[s.start],
		} as DaySection;

		if (isValid(times[s.end])) {
			r.end = times[s.end];
		} else {
			for (let nr of circular(SECTIONS, i, { omitFirst: true })) {
				if (nr && isValid(times[nr.end])) {
					r.end = times[nr.end];
					r.overspanned = true;
					break;
				}
			}
		}
		if (!r.end) continue;
		retval.push(r);
	}
	return retval;
}
