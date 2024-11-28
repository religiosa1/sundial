import { isValid } from "date-fns";

import type { SuncalcData } from "$lib/models/SuncalcData";
import { DaySectionEnum, type DaySectionId } from "$lib/models/DaySection";

import { circular } from "$lib/utils/circular";
import { timeToDeg } from "$lib/utils/timeToDeg";

import { colors } from "./config";

/** DaySection with concrete data for the clock -- start/end time and degrees */
export interface ClockSection {
	id: DaySectionId;
	name: string;
	start: Date;
	end: Date;
	startDeg: number;
	endDeg: number;
	color: string;
	overspanned: boolean;
}

export function makeClockSectionsArray(times: SuncalcData): ClockSection[] {
	const retval: ClockSection[] = [];
	const sections = Object.values(DaySectionEnum).filter((s) => !!s.end);

	for (let i = 0; i < sections.length; i++) {
		const s = sections[i];
		if (!s || !isValid(times[s.start])) {
			continue;
		}

		const r: ClockSection = {
			id: s.id,
			name: s.name,
			color: colors[s.id],
			start: times[s.start],
			startDeg: NaN,
			endDeg: NaN,
			end: new Date("INVALID"),
			overspanned: false,
		};

		if (s && isValid(times[s.end])) {
			r.end = times[s.end];
		} else {
			for (const nr of circular(sections, i, { omitFirst: true })) {
				if (nr && isValid(times[nr.end])) {
					r.end = times[nr.end];
					r.overspanned = true;
					break;
				}
			}
		}
		if (!isValid(r.end)) continue;
		r.startDeg = timeToDeg(r.start);
		r.endDeg = timeToDeg(r.end);
		retval.push(r);
	}

	// Special cases in far north/south -- when all we have is just night or day.
	if (!retval.length) {
		const isNight = times.altitude < 0;
		const item: ClockSection = isNight
			? {
					id: "night",
					name: "night",
					color: colors.night,
					start: times.nadir,
					end: times.nadir,
					startDeg: timeToDeg(times.nadir),
					endDeg: timeToDeg(times.nadir),
					overspanned: true,
				}
			: {
					id: "day",
					name: "night",
					color: colors.day,
					start: times.solarNoon,
					end: times.solarNoon,
					startDeg: timeToDeg(times.solarNoon),
					endDeg: timeToDeg(times.solarNoon),
					overspanned: true,
				};
		retval.push(item);
	}

	return retval;
}
