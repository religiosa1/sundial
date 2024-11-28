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
	constructor(data: IYearlySvgConfig) {
		this.width = data.width;
		this.height = data.height;
		this.yPad = data.yPad;
		this.xPad = data.xPad;
		this.fieldLeftPad = data.fieldLeftPad;
	}

	get lineStartX() {
		return this.xPad + 14;
	}

	get lineEndX() {
		return this.width - this.xPad;
	}

	get fieldHeight() {
		return this.height - this.yPad * 2;
	}
	get fieldWidth() {
		return this.width - this.xPad * 2 - this.fieldLeftPad;
	}
}

export const conf = new YearlySvgConfig({
	width: 1000,
	height: 400,
	yPad: 10,
	xPad: 10,
	fieldLeftPad: 18,
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
