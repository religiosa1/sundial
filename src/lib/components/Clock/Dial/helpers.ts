import type { ClockSection } from "./ClockSection";
import * as conf from "./config";

/**
 * Рассчёт пути арки секции
 * @param section рассчитываемая секция
 * @returns SVG-путь арки секции
 */
export function calculatePath(section: ClockSection): string {
	let largeArcFlag;
	const diff = section.endDeg - section.startDeg;
	if (diff >= 180 || (diff < 0 && diff > -180)) {
		largeArcFlag = "1";
	} else {
		largeArcFlag = "0";
	}

	const start_x =
		conf.size / 2 + Math.cos((section.startDeg * Math.PI) / 180 - Math.PI / 2) * conf.radius;
	const start_y =
		conf.size / 2 + Math.sin((section.startDeg * Math.PI) / 180 - Math.PI / 2) * conf.radius;

	const end_x =
		conf.size / 2 + Math.cos((section.endDeg * Math.PI) / 180 - Math.PI / 2) * conf.radius;
	const end_y =
		conf.size / 2 + Math.sin((section.endDeg * Math.PI) / 180 - Math.PI / 2) * conf.radius;

	return `M${start_x} ${start_y} A${conf.radius} ${conf.radius} 0 ${largeArcFlag} 1 ${end_x} ${end_y}`;
}
