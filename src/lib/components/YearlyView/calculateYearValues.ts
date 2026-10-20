import { setDayOfYear } from "date-fns";
import { getTimes } from "suncalc";
import { range } from "#lib/utils/range.js";

import { dayToX, timeToY } from "./coordinates";
import { conf } from "./yearlyViewBoxConfig";

/** Information about a day on a yearly view graph */
export interface DayLengthInfo {
	/** dau's date */
	date: Date;
	/** X coordinate on the graph */
	x: number;
	/** Y coordinate of a sunrise */
	startY: number;
	/** Y coordinate of a sunset */
	endY: number;
	/** Y coordinate of a solar noon */
	noonY: number;
}

export function calculateYearValues(latitude: number, longitude: number): DayLengthInfo[] {
	// TODO: account for leap years here and on the graph itself
	return Array.from(range(364), (_, i) => {
		const d = setDayOfYear(new Date(), i + 1);
		// per-day offset, to account for DST
		const t = getTimes(d, latitude, longitude, 0, -d.getTimezoneOffset());

		let startY = timeToY(t.sunrise);
		let endY = timeToY(t.sunset);
		if (!isDefinedLength(startY, endY) && t.alwaysUp) {
			startY = conf.yPad;
			endY = conf.fieldHeight;
		}
		const data = {
			date: d,
			x: dayToX(d),
			startY,
			endY,
			noonY: timeToY(t.solarNoon),
		};

		return data;
	});
}

function isDefinedLength(startY: number, endY: number): boolean {
	return Number.isFinite(startY) && Number.isFinite(endY);
}
