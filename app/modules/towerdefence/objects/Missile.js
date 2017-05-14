import GameObject from "./Object";

const defaults = {
	speed: 40,
};

export default class Missile extends GameObject {
	constructor(options) {
		super();
		const options = { ...defaults, ...options };
		for (let key in options) {
			this[key] = options[key];
		}
	}

}
