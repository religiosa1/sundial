import * as conf from "./config";
import type { ClockSection } from "$lib/models/ClockSection";

/**
 * Рассчёт пути полигона секции
 * @param section рассчитываемая секция
 * @returns SVG-путь полигона секции
 */
export function calculatePath(section: ClockSection): string {
	let largeArcFlag;
	let diff = section.endDeg - section.startDeg;
	if (diff >= 180 || (diff < 0 && diff > -180)) {
		largeArcFlag = '1';
	} else {
		largeArcFlag = '0';
	}

	let start_x = conf.size / 2 + Math.cos(section.startDeg * Math.PI / 180 - Math.PI / 2) * conf.radius;
	let start_y = conf.size / 2 + Math.sin(section.startDeg * Math.PI / 180 - Math.PI / 2) * conf.radius;

	let end_x = conf.size / 2 + Math.cos(section.endDeg * Math.PI / 180 - Math.PI / 2) * conf.radius;
	let end_y = conf.size / 2 + Math.sin(section.endDeg * Math.PI / 180 - Math.PI / 2) * conf.radius;

	return `M${start_x} ${start_y} A${conf.radius} ${conf.radius} 0 ${largeArcFlag} 1 ${end_x} ${end_y}`;
}

export type Colorized<T extends object> = {
	[k in keyof T]: T[k];
} & {
	stroke?: string;
	name?: string;
}

export function colorizeSections<T extends { id: string }>(
	times: Array<T>,
	colors: Record<string, { stroke: string, name: string }>
): Array<Colorized<T>> {
	if (!Array.isArray(times)) return [];

	return times.map(i => ({
		...i,
		stroke: colors[i.id]?.stroke,
		name: colors[i.id]?.name,
	}));
}