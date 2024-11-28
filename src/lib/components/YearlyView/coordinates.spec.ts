import { describe, it, expect } from "vitest";
import { timeToY, dayToX, coordinatesToDatetime } from "./coordinates";
import { isSameHour, isSameMinute, isSameSecond, setDayOfYear } from "date-fns";
import { getDayOfYear } from "date-fns/fp";
import { conf } from "$lib/components/YearlyView/yearlyViewBoxConfig";

describe("coordinates", () => {
	describe("coordinatesToDatetime", () => {
		function getTestDate(): Date {
			const date = setDayOfYear(new Date(), 100);

			date.setHours(14);
			date.setMinutes(25);
			date.setSeconds(30);
			date.setMilliseconds(0);
			return date;
		}

		it("returns a date value, if x and y is inside of expected values", () => {
			const date = getTestDate();
			const x = dayToX(date);
			const y = timeToY(date);
			expect(coordinatesToDatetime(x, y)).toBeInstanceOf(Date);
		});

		it("returns undefined if x is outside of the field", () => {
			const y = timeToY(getTestDate());
			expect(coordinatesToDatetime(conf.fieldLeftPad - 1, y)).toBeUndefined();
			expect(
				coordinatesToDatetime(conf.fieldLeftPad + conf.xPad + conf.fieldWidth + 1, y)
			).toBeUndefined();
		});

		it("returns undefined if y is outside of the field", () => {
			const x = timeToY(getTestDate());
			expect(coordinatesToDatetime(x, conf.yPad - 1)).toBeUndefined();
			expect(coordinatesToDatetime(x, conf.yPad + conf.fieldHeight + 1)).toBeUndefined();
		});

		it("returned value is reversed from dayToX and timeToY", () => {
			const date = getTestDate();

			date.setHours(14);
			date.setMinutes(25);
			date.setSeconds(30);
			date.setMilliseconds(0);

			const x = dayToX(date);
			const y = timeToY(date);
			const calculatedDate = coordinatesToDatetime(x, y);

			expect(getDayOfYear(calculatedDate!)).toBe(getDayOfYear(date));
			expect(isSameHour(calculatedDate!, date)).toBe(true);
			expect(isSameMinute(calculatedDate!, date)).toBe(true);
			expect(isSameSecond(calculatedDate!, date)).toBe(true);
		});
	});
});
