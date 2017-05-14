import Board from "./towerdefence/Board";
import Turret from "./towerdefence/objects/Turret";
import Cannon from "cannon";

export default class PhysicsEngine {
	constructor(elements) {
		this.world = new Cannon.World();
		this.world.gravity.set(0, 0, -9.82);
		this.phys = elements.map(el => ({ _el: el, body: mapElementToBody(el) }));
		this.phys.forEach(({body}) => {
			this.world.addBody(body);
		});
	}
	update(time) {
		if (time == 0) return;
		this.world.step(1/time);
		this.phys.forEach(g => {
			const { _el: el, body } = g;
			if (el.x != body.position.x || el.y != body.position.y || el.y != body.position.z) {
				el._moved = true;
				el.x = body.position.x;
				el.y = body.position.y;
				el.z = body.position.z;
			}
		});
	}
}

const m = new Cannon.Material({ friction: 0 });

function mapElementToBody(el) {

	if (el instanceof Board ) {
		return new Cannon.Body({
			mass: 0,
			shape: new Cannon.Plane(),
			position: new Cannon.Vec3(el.x, el.y, el.z),
			material: m
		});
	}
	else if (el instanceof Turret) {
		return new Cannon.Body({
			mass: 0,
			shape: new Cannon.Box(new Cannon.Vec3(25, 25, 125)),
			position: new Cannon.Vec3(el.x, el.y, el.z)
		});
	} else {
		return new Cannon.Body({
			mass: 50,
			shape: new Cannon.Box(new Cannon.Vec3(25, 25, 25)),
			position: new Cannon.Vec3(el.x, el.y, el.z),
			velocity: new Cannon.Vec3(el.sx, el.sy, el.sz),
			linearDamping: 0,
			material: m
		});
	}
}
