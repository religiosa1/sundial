import { derived } from "svelte/store";
import { set, isBefore, isAfter } from "date-fns";
import { latitude, longitude } from "./location";
import { date } from "./date";
import sunCalc from "suncalc";

const isWinter = function(date: Date, latitude: number): boolean {
  // TODO правильный просчёт равноденствия ?
  let equinoxVernal = set(new Date(date.getTime()), {"month": 2, "date": 20 });
  let equinoxAutumnal =  set(new Date(date.getTime()), {"month": 8, "date": 22 });

  if (latitude >= 0) {
    return ( isBefore(date, equinoxVernal) || isAfter(date, equinoxAutumnal) );
  } else {
    return ( isAfter(date, equinoxVernal) && isBefore(date, equinoxAutumnal) );
  }
}

export const suncalc = derived(
  [date, latitude, longitude],
  ([ $date, $latitude, $longitude ]) => ({
    isWinter: isWinter($date, $latitude),
    ...sunCalc.getTimes($date, $latitude, $longitude)
  })
);
