import GameObject from "./Object";
import towerOBJ from "../../../models/tower.obj";
import ObjActor from "../../webgl/actors/ObjActor";
import { $V } from "../../math/sylvester";

const defaults = {
	damage: 12,
	attack_speed: 1,
	range: 500,
	height: 150,
	size: 1,
	missile_type: "default",
	delay: 0,
	isActive: true
};

export default class Turret extends GameObject {
	constructor(coordinates, options) {
		super(coordinates, { ...defaults, ...options });
	}
	generateModel() {
		return new ObjActor(towerOBJ, "tower", "tower-texture.png", 0x0000ffff);
	}
	generateBody() {
		return null;
	}
	update(stage, tick) {
		fireAtWill(tick, this, stage);
	}
}

function fireAtWill(delta, turret, stage) {
	const minions = stage.getMinions();

	if (turret.delay > 0) return turret.delay -= delta;

	const possibleTargets = findPossibleTargets(stage, turret, minions);
	if (possibleTargets.length > 0) {
		shoot(stage, turret, possibleTargets);
		turret.delay = 1000 / turret.attack_speed;
	}
}

function shoot(stage, turret, targets) {

	const target = targets[Math.floor(Math.random()*targets.length)];

	const missileBlueprint = {
		type: "MISSILE",
		coordinates: {
			x: turret.coordinates.x,
			y: turret.coordinates.y,
			z: turret.coordinates.z + turret.height - 30
		},
		options: {
			target: target,
		}
	};

	stage.createObject(missileBlueprint);
}

function findPossibleTargets(stage, turret, minions) {
	const vec2Position = $V([turret.coordinates.x, turret.coordinates.y]);
	const vec3Position = $V([turret.coordinates.x, turret.coordinates.y, turret.coordinates.z + turret.height ]);
	const vec3LauncherPosition = $V([ turret.coordinates.x, turret.coordinates.y, turret.coordinates.z + turret.height - 30 ]);

	return minions
	.filter(minion => {
		const vec2MinionPosition = $V([ minion.coordinates.x, minion.coordinates.y ]);
		const range = (turret.range + (turret.coordinates.z - minion.coordinates.z) / 4);
		return vec2Position.subtract(vec2MinionPosition).modulus() < range;
	})
	.filter(minion => {
		const vec3MinionPosition = $V([ minion.coordinates.x, minion.coordinates.y, minion.coordinates.z + 30 ]);
		return !stage.polyland.linePassesThrought(vec3LauncherPosition, vec3MinionPosition);
	});
}
