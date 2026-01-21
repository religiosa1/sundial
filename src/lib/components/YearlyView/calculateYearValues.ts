import { setDayOfYear } from "date-fns";
import suncalc from "suncalc";
import { range } from "$lib/utils/range";

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
    const t = suncalc.getTimes(d, latitude, longitude);

    let startY = timeToY(t.sunrise);
    let endY = timeToY(t.sunset);
    if (!isDefinedLength(startY, endY)) {
      const sunpos = suncalc.getPosition(d, latitude, longitude);
      if (sunpos.altitude > 0) {
        startY = conf.yPad;
        endY = conf.fieldHeight;
      }
    }
    const data = {
      date: d,
      x: dayToX(d),
      startY,
      endY,
      noonY: timeToY(t.solarNoon),
    };

    return data;
  })
}

function isDefinedLength(startY: number, endY: number): boolean {
  return Number.isFinite(startY) && Number.isFinite(endY);
}
