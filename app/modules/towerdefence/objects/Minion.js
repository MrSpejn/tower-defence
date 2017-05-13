import Cube from "../../webgl/actors/Cube";
import GameObject from "./Object";

const defaults = {
	hp: 20,
	x: 0,
	y: 0,
	speed: 10,
	size: 1,
};

export default class Minion extends GameObject {
	constructor(options) {
		super();
		options = { ...defaults, ...options };
		for (let key in options) {
			this[key] = options[key];
		}
	}
	generateModel() {
		this.z = 25;
		return new Cube(0xff0000ff);
	}
}
