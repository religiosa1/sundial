import type { DaySection } from "./DaySection";

export interface ClockSection extends DaySection {
  startDeg: number;
  endDeg: number;
  stroke?: string;
}