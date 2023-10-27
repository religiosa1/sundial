export const SECTIONS = [
	{
		id: "astronomical-twilight-morning",
		start: "nightEnd",
		end: "nauticalDawn",
	},
	{
		id: "nautical-dawn",
		start: "nauticalDawn",
		end: "dawn",
	},
	{
		id: "dawn",
		start: "dawn",
		end: "sunrise",
	},
	{
		id: "sunrise",
		start: "sunrise",
		end: "sunriseEnd",
	},
	{
		id: "golden-hour-morning",
		start: "sunriseEnd",
		end: "goldenHourEnd",
	},
	{
		id: "day",
		start: "goldenHourEnd",
		end: "goldenHour",
	},
	{
		id: "golden-hour-evening",
		start: "goldenHour",
		end: "sunsetStart",
	},
	{
		id: "sunset",
		start: "sunsetStart",
		end: "sunset",
	},
	{
		id: "dusk",
		start: "sunset",
		end: "dusk",
	},
	{
		id: "nautical-dusk",
		start: "dusk",
		end: "nauticalDusk",
	},
	{
		id: "astronomical-twilight-eveing",
		start: "nauticalDusk",
		end: "night",
	},
	{
		id: "night",
		start: "night",
		end: "nightEnd",
	},
] as const;

export interface DaySection {
	id: (typeof SECTIONS)[number]['id'];
	// name: string;
	// time: Date;
	start: Date;
	end: Date;
	overspanned?: boolean;
}