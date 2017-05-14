import Cube from "../webgl/actors/Cube";

export default class Board {
	constructor(fields) {
		this.fields = fields;
	}
	get3DRepresentation() {
		const result = [];
		this.fields.field_types.forEach((row, i) => row.forEach((type, j) => {
			const r = type === 0 ? 0x32c15f : 0xfafdc4;
			const c = new Cube(r * 0x100 + 0xff);
			c.translate(2*j - 50,  50 - 2*i + 12, 0);
			result.push(c);
		}));

		const bg = new Cube(0x937b6fff);
		bg.scaleXY(120, 80);
		bg.scaleZ(0.25);
		bg.translateYZ(12, -0.002);
		result.push(bg);
		return result;
	}
}
