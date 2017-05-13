import Cube from "../../webgl/actors/Cube";
import GameObject from "./Object";

const defaults = {
	damage: 12,
	attack_speed: 0.5,
	range: 200,
	size: 1,
	x: 0,
	y: 0,
	missile_type: "default"
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
