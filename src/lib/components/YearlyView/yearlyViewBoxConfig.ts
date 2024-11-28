interface IYearlySvgConfig {
	width: number;
	height: number;
	yPad: number;
	xPad: number;
	fieldLeftPad: number;
}
export class YearlySvgConfig implements IYearlySvgConfig {
	width: number;
	height: number;
	yPad: number;
	xPad: number;
	fieldLeftPad: number;

	fieldHeight: number;
	fieldWidth: number;
	lineStartX: number;
	lineEndX: number;
	lineStartY: number;
	lineEndY: number;

	constructor(data: IYearlySvgConfig) {
		this.width = data.width;
		this.height = data.height;
		this.yPad = data.yPad;
		this.xPad = data.xPad;
		this.fieldLeftPad = data.fieldLeftPad;

		this.fieldHeight = this.height - this.yPad * 2;
		this.fieldWidth = this.width - this.xPad * 2 - this.fieldLeftPad;

		this.lineStartX = this.xPad + this.fieldLeftPad;
		this.lineEndX = this.width - this.xPad;
		this.lineStartY = this.yPad;
		this.lineEndY = this.yPad + this.fieldHeight;
	}
}

export const conf = new YearlySvgConfig({
	width: 1000,
	height: 400,
	yPad: 10,
	xPad: 10,
	fieldLeftPad: 16,
});

export const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
