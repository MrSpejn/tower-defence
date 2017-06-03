import Cube from "../../webgl/actors/Cube";
import GameObject from "./Object";
import Cannon from "cannon";
import { $V } from "../../math/sylvester";

const defaults = {
	speed: 400,
	target: null,
	damage: 10,
	isActive: true,
	collisionIndex: 6,
};

export default class Missile extends GameObject {
	constructor(coordinates, options) {
		super(coordinates, { ...defaults, ...options });
	}

	generateModel() {
		const model = new Cube(null, 0xfc9f14ff);
		model.scaleXY(0.3, 0.3);
		model.quaternions = true;
		this.coordinates.rotation = [0,0,0,0];
		model.coordinates = this.coordinates;

		return model;
	}

	generateBody() {
		const body = new Cannon.Body({
			mass: 0.01,
			shape: new Cannon.Box(new Cannon.Vec3(20, 20, 20)),
			position: new Cannon.Vec3(this.coordinates.x, this.coordinates.y, this.coordinates.z),
			velocity: new Cannon.Vec3(this.coordinates.sx, this.coordinates.sy, this.coordinates.sz),
			linearDamping: 0,
			material: new Cannon.Material({ friction: 0, restitution: 0 }),
			collisionFilterGroup: 8,
			collisionFilterMask: 4
		});
		body.coordinates = this.coordinates;
		body.object = this;
		return body;
	}

	update(stage, tick) {
		if (this.target.chp <= 0) stage.removeObject(this);
		else followTarget(this);
	}
	collideWith(object, stage) {
		object.chp -= this.damage;
		if (object.chp <= 0) stage.removeObject(object);
		stage.removeObject(this);
	}
}

function followTarget(missile) {
	const target = missile.target;

	const vec3Position = $V([missile.coordinates.x, missile.coordinates.y, missile.coordinates.z]);
	const vec3TargetPosition = $V([target.coordinates.x, target.coordinates.y, target.coordinates.z + 25]);

	const direction = vec3TargetPosition.subtract(vec3Position).toUnitVector();
	const defaultRotation = $V([0, 0, 1]);
	const rotationVector = direction.cross(defaultRotation);
	const rotationAngle = direction.angleFrom(defaultRotation);

	missile.coordinates.rotation = [ rotationAngle, ...rotationVector.elements];


	const speed = direction.x(missile.speed);
	missile.coordinates.sx = speed.elements[0];
	missile.coordinates.sy = speed.elements[1];
	missile.coordinates.sz = speed.elements[2];
}
