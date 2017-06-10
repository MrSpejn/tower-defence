import Turret from "./objects/Turret";
import Minion from "./objects/Minion";
import Missile from "./objects/Missile";

export default class ObjectMaintainer {
	createTurret(x, y, z = 75) {
		return new Turret({ x, y, z });
	}
	createMinion(track, progress) {
		return new Minion({ z: 0 }, { track, progress });
	}
	createMissile(x, y, z, target) {
		return new Missile({ x, y, z }, { target });
	}
	create(blueprint, minions, turrets, missiles) {
		let object = null;
		switch (blueprint.type) {
		case "MISSILE":
			object = new Missile(blueprint.coordinates || {}, blueprint.options || {});
			missiles.push(object);
			return object;
		case "MINION":
			object = new Minion(blueprint.coordinates || {}, blueprint.options || {});
			minions.push(object);
			return object;
		case "TURRET":
			object = new Turret(blueprint.coordinates || {}, blueprint.options || {});
			turrets.push(object);
			return object;
		default: throw `Invalid object type ${blueprint.type}`;
		}
	}
	remove(object, minions, turrets, missiles) {
		if (object instanceof Turret) {
			const idx = turrets.indexOf(object);

			if (idx != -1) turrets.splice(turrets.indexOf(object), 1);
			else console.error("Object already removed", object);
		} else if (object instanceof Missile) {
			const idx = missiles.indexOf(object);

			if (idx != -1) missiles.splice(missiles.indexOf(object), 1);
			else console.error("Object already removed", object);

		} else if (object instanceof Minion) {
			const idx = minions.indexOf(object);

			if (idx != -1) minions.splice(minions.indexOf(object), 1);
			else console.error("Object already removed", object);
		} else {
			console.error("Cannon remove object");
		}
	}
}
