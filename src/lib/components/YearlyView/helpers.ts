import { getDayOfYear, hoursToMilliseconds, minutesToMilliseconds } from "date-fns";
import * as conf from "./yearlyViewBoxConfig";

const msInDay = 24 * 60 * 60 * 1000;

const sum = (...args: number[]) => args.reduce((acc, cur) => acc + cur, 0);

export function dayToX(date: Date): number {
	return conf.xPad + conf.fieldLeftPad + getDayOfYear(date) / 364 * conf.fieldWidth;
}

export function timeToY(time: Date): number {
	const ms = sum(
		hoursToMilliseconds(time.getHours()),
		minutesToMilliseconds(time.getMinutes()),
		time.getSeconds() * 1000,
		time.getMilliseconds()
	);
	return ms / msInDay * conf.fieldHeight + conf.yPad;
}