import type { GetTimesResult } from "suncalc";

export interface SuncalcData extends GetTimesResult {
  isWinter: boolean;
}