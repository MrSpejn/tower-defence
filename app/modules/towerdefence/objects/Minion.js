import Cube from "../../webgl/actors/Cube";
import GameObject from "./Object";

const defaults = {
	hp: 16,
	x: 0,
	y: 0,
	rx: 0,
	ry: 0,
	rz: 0,
	sx: 0,
	sy: 0,
	sz: 0,
	size: 1,
	movable: true
};

export default class Minion extends GameObject {
	constructor(options) {
		super();
		options = { ...defaults, ...options };
		for (let key in options) {
			this[key] = options[key];
		}
		this.chp = this.hp;
		this.z = 25;
	}
	generateModel() {
		return new Cube(0xff0000ff);
	}
}
