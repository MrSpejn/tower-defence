import Cube from "../../webgl/actors/Cube";
import GameObject from "./Object";

const defaults = {
	damage: 12,
	attack_speed: 10,
	range: 400,
	size: 1,
	x: 0,
	y: 0,
	rx: 0,
	ry: 0,
	rz: 0,
	missile_type: "default",
	delay: 0,
};


export default class Turret extends GameObject {
	constructor(options) {
		super();
		options = { ...defaults, ...options };
		for (let key in options) {
			this[key] = options[key];
		}
	}
	generateModel() {
		const turret = new Cube(0x0000ffff);
		turret.scaleZ(5);
		this.z = 125;
		return turret;
	}
}
