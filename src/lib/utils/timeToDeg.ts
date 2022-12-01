// const secondsInDay = 86400; //  60 * 60 * 24;
// const secondsInHour = 3600; // 60 * 60;

/** Convert time as js Date object to degrees, for usage on a 24-hour circular clock.
00 hours is 0 degrees, 06 hours is 90 degrees, 18 hours is 270 degrees. */
export function timeToDeg(time: Date): number {
  if (!(time instanceof Date) || isNaN(time.getTime())) return NaN;
  let seconds  = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  return seconds / 86400 * 360;
}
