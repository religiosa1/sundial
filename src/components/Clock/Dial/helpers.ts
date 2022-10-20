import type { ClockSection } from "$/models/ClockSection";
import * as conf from "./config";

/**
 * Рассчёт пути полигона секции
 * @param section рассчитываемая секция
 * @returns SVG-путь полигона секции
 */
export function calculatePath(section): string {
  let largeArcFlag;
  let diff = section.endDeg - section.startDeg;
  if (diff >= 180 || (diff < 0 && diff > -180)) {
    largeArcFlag = '1';
  } else {
    largeArcFlag = '0';
  }

  let start_x = conf.size/2 + Math.cos(section.startDeg * Math.PI / 180 - Math.PI/2) * conf.radius;
  let start_y = conf.size/2 + Math.sin(section.startDeg * Math.PI / 180 - Math.PI/2) * conf.radius;

  let end_x = conf.size/2 +  Math.cos(section.endDeg * Math.PI / 180 - Math.PI/2) * conf.radius;
  let end_y = conf.size/2 +  Math.sin(section.endDeg * Math.PI / 180 - Math.PI/2) * conf.radius;

  return `M${start_x} ${start_y} A${conf.radius} ${conf.radius} 0 ${largeArcFlag} 1 ${end_x} ${end_y}`;
}

export function colorizeSections<T extends { id: string }>(times: Array<T>): Array<T & { stroke: string, name: string }> {
  if (!Array.isArray(times)) return [];

  return times.map(i => ({
    ...i,
    stroke: conf.colors[i.id]?.stroke,
    name: conf.colors[i.id]?.name,
  }));
}