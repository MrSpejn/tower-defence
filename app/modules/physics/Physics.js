import Publisher from "../utils/Publisher";
import Cannon from "cannon";

const bodies = Symbol();

export default
@Publisher(["collision"])
class Physics {
	constructor() {
		this[bodies] = [];
		this.world = new Cannon.World();
		this.world.gravity.set(0, 0, 0.0);
	}

	update(time) {
		if (time == 0) return;
		this.transferToCannon();
		this.world.step(1/time);
		this.transferFromCannon();
	}
	transferToCannon() {
		this[bodies].forEach(body => {
			body.position.x = body.coordinates.x;
			body.position.y = body.coordinates.y;
			body.position.z = body.coordinates.z;
			body.velocity.x = body.coordinates.sx;
			body.velocity.y = body.coordinates.sy;
			body.velocity.z = body.coordinates.sz;
		});
	}
	transferFromCannon() {
		this[bodies].forEach(body => {
			body.coordinates.x = body.position.x;
			body.coordinates.y = body.position.y;
			body.coordinates.z = body.position.z;
			body.coordinates.sx = body.velocity.x;
			body.coordinates.sy = body.velocity.y;
			body.coordinates.sz = body.velocity.z;
		});
	}
	register(body) {
		this.world.addBody(body);
		body.addEventListener("collide", e => {
			this.dispatch("collision", e.body, e.target);
		});
		this[bodies].push(body);
	}
	unregister(body) {
		this[bodies] = this[bodies].filter(b => b != body);
		this.world.removeBody(body);
	}
	addObjects(objects) {
		if (!objects) return;
		if (objects instanceof Array) objects.forEach(object => this.register(object));
		else this.register(objects);
	}
	removeObjects(objects) {
		if (!objects) return;
		if (objects instanceof Array) objects.forEach(object => this.unregister(object));
		else this.unregister(objects);
	}
};
