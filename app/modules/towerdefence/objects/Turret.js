import GameObject from "./Object";
import towerOBJ from "../../../models/tower.obj";
import ObjActor from "../../webgl/actors/ObjActor";
import Cube from "../../webgl/actors/Cube";
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
		this.z = 150;
		const turret2 = new ObjActor(towerOBJ, "tower", 0x0000ffff);
		turret2.rotateX(Math.PI / 2);
		return turret2;
	}
}
