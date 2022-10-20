import SunCalc from "suncalc";
import { set, isBefore, isAfter } from "date-fns";

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

export function getTimes(time: Date, latitude: number, longitude: number) {
  return {
    isWinter: isWinter(time, latitude),
    ...SunCalc.getTimes(time, latitude, longitude)
  }
}
