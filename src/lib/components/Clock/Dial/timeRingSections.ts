import { circular } from "$lib/utils/circular";
import { SECTIONS, type DaySection } from "$lib/models/DaySection";
import type { SuncalcData } from "$lib/models/SuncalcData";
import { isValid } from "date-fns";

export function timeRingSections(times: SuncalcData) {
	const retval: DaySection[] = [];
	for (let i = 0; i < SECTIONS.length; i++) {
		const s = SECTIONS[i];

		if (!s || !isValid(times[s.start])) {
			continue;
		}

		const r: DaySection = {
			id: s.id,
			start: times[s.start],
			end: new Date("INVALID"),
		};

		if (s && isValid(times[s.end])) {
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
		if (!isValid(r.end)) continue;
		retval.push(r);
	}
	if (!retval.length) {
		const isNight = times.altitude < 0;
		const item: DaySection = isNight ? {
			id: "night",
			start: times.nadir,
			end: times.nadir,
			overspanned: true,
		} : {
			id: "day",
			start: times.nadir,
			end: times.nadir,
			overspanned: true,
		};
		retval.push(item);
	}
	return retval;
}
