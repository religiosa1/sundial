import type { SunTimeName, SunTimes } from "suncalc";

/** Keys of SunTimes holding event times */
export type SunTimeKey = SunTimeName | "solarNoon" | "nadir";

// Picking explicit keys, as SunTimes has an index signature for custom times, that
// otherwise widens every key to string.
export type SuncalcData = Pick<SunTimes, SunTimeKey | "alwaysUp" | "alwaysDown">;
