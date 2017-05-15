import Board from "./towerdefence/Board";
import Turret from "./towerdefence/objects/Turret";
import Minion from "./towerdefence/objects/Minion";

import Cannon from "cannon";

export default class PhysicsEngine {
	constructor(elements) {
		this._handlers = {
			collision: [],
		};
		this.world = new Cannon.World();
		this.world.gravity.set(0, 0, -9.82);
		this.phys = elements.map(el => {
			const body = mapElementToBody(el);
			body._el = el;
			return body;
		});
		this.phys.forEach(body => {
			body.addEventListener("collide", e => {
				this.dispatchEvent("collision", e.body._el, e.target._el);
			});
			this.world.addBody(body);
		});

	}

	on(event, handler) {
		this._handlers[event] = [...this._handlers[event], handler];
	}
	dispatchEvent(event, param1, param2) {
		this._handlers[event].forEach(handler => handler.call(null, param1, param2));
	}
	update(time) {
		if (time == 0) return;
		this.phys.forEach(body => {
			const el = body._el;
			body.velocity = new Cannon.Vec3(el.sx, el.sy, el.sz);
		});

		this.world.step(1/time);

		this.phys.forEach(body => {
			const el = body._el;
			if (el.x != body.position.x || el.y != body.position.y || el.y != body.position.z) {
				el._moved = true;
				el.x = body.position.x;
				el.y = body.position.y;
				el.z = body.position.z;
			}
		});
	}
	addObject(el) {
		const phys =  mapElementToBody(el);
		phys._el = el;
		if (el instanceof Minion) {
			phys.addEventListener("collide", e => {
				this.dispatchEvent("collision", e.body._el, e.target._el);
			});
		}
		this.phys.push(phys);
		this.world.add(phys);
	}
	removeObject(el) {
		const body = this.phys.filter(b => b._el === el)[0];
		this.phys = this.phys.filter(b => b._el !== el);
		this.world.removeBody(body);
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
	} else if (el instanceof Minion) {
		return new Cannon.Body({
			mass: 50,
			shape: new Cannon.Box(new Cannon.Vec3(25, 25, 25)),
			position: new Cannon.Vec3(el.x, el.y, el.z),
			velocity: new Cannon.Vec3(el.sx, el.sy, el.sz),
			linearDamping: 0,
			material: m
		});
	} else {
		return new Cannon.Body({
			mass: 2,
			shape: new Cannon.Box(new Cannon.Vec3(25, 25, 25)),
			position: new Cannon.Vec3(el.x, el.y, el.z),
			velocity: new Cannon.Vec3(el.sx, el.sy, el.sz),
			linearDamping: 0,
			material: m
		});
	}
}
