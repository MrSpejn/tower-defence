import Cube from "../../webgl/actors/Cube";
import GameObject from "./Object";

const defaults = {
	speed: 400,
	target: null,
	rx: 0,
	ry: 0,
	rz: 0,
	x: 0,
	y: 0,
	z: 0,
	sx: 0,
	sy: 0,
	sz: 0,
	damage: 10,
	movable: true
};

export default class Missile extends GameObject {
	constructor(options) {
		super();
		options = { ...defaults, ...options };
		for (let key in options) {
			this[key] = options[key];
		}
	}
	generateModel() {
		const c = new Cube(0xfc9f14ff);
		c.scaleXY(0.3, 0.3);
		return c;
	}
}
