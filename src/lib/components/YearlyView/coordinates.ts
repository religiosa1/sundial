import { getDayOfYear, hoursToMilliseconds, isLeapYear, minutesToMilliseconds } from "date-fns";
import { conf } from "./yearlyViewBoxConfig";

const msInDay = 24 * 60 * 60 * 1000;

const sum = (...args: number[]) => args.reduce((acc, cur) => acc + cur, 0);

export function dayToX(date: Date, config = conf): number {
	const totalDays = isLeapYear(date) ? 364 : 365;
	return config.xPad + config.fieldLeftPad + (getDayOfYear(date) / totalDays) * config.fieldWidth;
}

export function timeToY(time: Date, config = conf): number {
	const ms = sum(
		hoursToMilliseconds(time.getHours()),
		minutesToMilliseconds(time.getMinutes()),
		time.getSeconds() * 1000,
		time.getMilliseconds()
	);
	return (ms / msInDay) * config.fieldHeight + config.yPad;
}

export function coordinatesToDatetime(
	x: number,
	y: number,
	baseYear = new Date(),
	config = conf
): Date | undefined {
	const resultDate = new Date(baseYear.getFullYear(), 0, 1);
	const totalDays = isLeapYear(baseYear) ? 364 : 365;

	const normalizedX = x - config.xPad - config.fieldLeftPad;
	if (normalizedX < 0 || normalizedX > config.fieldWidth) return undefined;
	const dayOfYear = (normalizedX / config.fieldWidth) * totalDays;
	resultDate.setDate(Math.round(dayOfYear));

	const normalizedY = y - config.yPad;
	if (normalizedY < 0 || normalizedY > config.fieldHeight) return undefined;
	const msInDay = hoursToMilliseconds(24);
	const ms = (normalizedY / config.fieldHeight) * msInDay;
	resultDate.setMilliseconds(ms);

	return resultDate;
}
