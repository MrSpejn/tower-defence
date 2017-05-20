import Minion from "./towerdefence/objects/Minion";
import Missile from "./towerdefence/objects/Missile";
import Turret from "./towerdefence/objects/Turret";
import Board from "./towerdefence/Board";
import Mountains from "./towerdefence/Mountains";

import Map from "./map";
import { $V } from "./math/sylvester";

export default class Game {
	constructor() {
		this._handlers = { createObject: [], removeObject: [] };
		const turret = new Turret({ x: 600, y: 800, attack_speed: 2 });
		const turret2 = new Turret({ x: 1200, y: 2100, attack_speed: 2 });
		const turret3 = new Turret({ x: 800, y: 1500, attack_speed: 2, range: 600 });
		const turret4 = new Turret({ x: 1400, y: 2050, attack_speed: 5, range: 300 });

		this.ticker = 0;
		this.minions = [ ];
		this.turrets = [ turret, turret2, turret3, turret4 ];
		this.missiles = [];
		this.board = new Board(Map);
		this.leftMountains = new Mountains(52, 30, 50);
		this.leftMountains.x = -5*50;
		this.leftMountains.y = 28*50;

		this.rightMountains = new Mountains(52, 30, 50);
		this.rightMountains.x = 75*50;
		this.rightMountains.y = 28*50;



	}
	on(event, handler) {
		if (this._handlers[event]) {
			this._handlers[event].push(handler);
		} else {
			throw "Invalid event name";
		}
	}
	collide(obj1, obj2) {
		if (obj1 instanceof Missile && obj2 instanceof Minion || obj2 instanceof Missile && obj1 instanceof Minion) {
			const missile = obj1 instanceof Missile ? obj1 : obj2;
			const minion = obj1 instanceof Minion ? obj1 : obj2;

			if (!this.missiles.includes(missile) || minion !== missile.target) return;
			this.missiles = this.missiles.filter(m => m != missile);
			this.removeObject(missile);
			minion.chp -= missile.damage;
			if (minion.chp <= 0) {
				this.minions = this.minions.filter(m => m != minion);
				this.removeObject(minion);
			}
		}
	}
	update(timeDelta) {
		this.minions.forEach(minion => {
			if ($V([minion.x, minion.y]).subtract(minion.dest).modulus() < 10) {
				minion.progress++;
			}
			followTrack(minion, Map.tracks);
		});
		this.turrets.forEach(turret => {
			if (turret.delay > 0) turret.delay -= timeDelta;
			if (turret.delay <= 0 && canTargetEnemy(turret, this.minions)) {
				shoot(turret, this.minions, this);
				turret.delay = 1000 / turret.attack_speed;
			}
		});
		this.missiles.forEach(missile => {
			if (!this.minions.includes(missile.target)) {
				this.missiles = this.missiles.filter(m => m != missile);
				this.removeObject(missile);
			} else followTarget(missile);
		});
		this.ticker += timeDelta;
		if (this.ticker > 300) {
			this.ticker -= 300;
			addMinion(this, Map);
		}
	}
	createObject(obj) {
		this._handlers.createObject.forEach(fn => fn.call(null, obj));
	}
	removeObject(obj) {
		this._handlers.removeObject.forEach(fn => fn.call(null, obj));
	}
	getBoard() { return this.board; }
	getObjects() { return [ this.board, ...this.turrets, ...this.missiles, ...this.minions ]; }
	getElements() { return [ this.leftMountains, this.rightMountains, ...this.getObjects() ]; }
}

function followTrack(object, tracks) {

	const cell = tracks[object.track - 1][object.progress];
	const pos = $V([object.x, object.y]);
	const dest = $V([ cell[1]*50, cell[0]*50 ]);
	object.dest = dest;

	const velocity2D = dest.subtract(pos).toUnitVector().x(object.speed);
	object.sx = velocity2D.elements[0];
	object.sy = velocity2D.elements[1];
	object.sz = 0;

	const currCell = getMinionCell(object);
	if (currCell[0] != object.currCell[0] || currCell[1] != object.currCell[1]) {
		object.prevCell = object.currCell;
		object.currCell = currCell;
	}
	const nextCell = getNextCell(object);

	const prevH = Map.heights[object.prevCell[1]][object.prevCell[0]]  * 25 + 25;
	const delta1 = ((Map.heights[nextCell[1]][nextCell[0]] * 25 + 25) - object.z);
	const delta2 = (Map.heights[nextCell[1]][nextCell[0]] - Map.heights[currCell[1]][currCell[0]]) * 25;

	const delta3 = (Map.heights[object.prevCell[1]][object.prevCell[0]] - Map.heights[currCell[1]][currCell[0]]) * 25;

	if (Math.abs(delta1) < 15) {
		object.z = Map.heights[nextCell[1]][nextCell[0]] * 25 + 25;
		return;
	}
	let velocity3D;
	if (delta1 > 0) {
		velocity3D = $V([object.sx, object.sy, delta2 / 50 * object.speed]).toUnitVector().x(object.speed);
	} else if (delta3 > 0) {
		velocity3D = $V([object.sx, object.sy, -delta3 / 50 * object.speed]).toUnitVector().x(object.speed);
	} else return;

	object.sx = velocity3D.elements[0];
	object.sy = velocity3D.elements[1];
	object.sz = velocity3D.elements[2];
}

function shoot(turret, minions, game) {
	const turretPosition = $V([turret.x, turret.y]);
	const targets = minions.filter(m => turretPosition.subtract($V([m.x, m.y])).modulus() < turret.range);
	const missile = new Missile({
		target: targets[0],
		x: turret.x,
		y: turret.y,
		z: turret.z + 125
	});
	game.missiles = [ ...game.missiles, missile ];
	game.createObject(missile);
}

function canTargetEnemy(turret, minions) {
	const turretPosition = $V([turret.x, turret.y]);
	return minions.some(m => turretPosition.subtract($V([m.x, m.y])).modulus() < turret.range);
}

function followTarget(missile) {
	const pos = $V([missile.x, missile.y, missile.z]);
	const target = $V([missile.target.x, missile.target.y, missile.target.z]);
	const track = target.subtract(pos).toUnitVector();
	const defaultRotation = $V([0, 0, 1]);

	const speed = track.x(missile.speed);
	missile.sx = speed.elements[0];
	missile.sy = speed.elements[1];
	missile.sz = speed.elements[2];
}

function getMinionCell(minion) {
	const x = Math.floor(minion.x / 50);
	const y = Math.floor(minion.y / 50);
	return [x, y];
}
function getNextCell(minion) {
	const velocity = $V([ minion.sx, minion.sy ]);
	const x = Math.floor(minion.x / 50);
	const y = Math.floor(minion.y / 50);

	const angle = velocity.angleFrom($V([2, 0])) + Math.PI / 8;

	switch (Math.floor(angle / (Math.PI / 4))) {
	case 0: return [x+1, y];
	case 1:	return [x+1, y+1];
	case 2: return [x, y+1];
	case 3: return [x-1, y+1];
	case 4: return [x-1, y];
	case 5: return [x-1, y-1];
	case 6: return [x, y-1];
	case 7: return [x+1, y-1];
	}

}
function addMinion(game, Map) {
	const minion = new Minion({ speed: 150 });
	minion.track = Math.floor(Math.random() * 2) + 2;
	const startCell = Map.tracks[minion.track - 1][0];
	minion.x = startCell[1]*50;
	minion.y = startCell[0]*50;
	minion.prevCell = [startCell[1], startCell[0]];
	minion.currCell = [startCell[1], startCell[0]];

	minion.progress = 1;
	followTrack(minion, Map.tracks);
	game.minions = [ ...game.minions, minion ];
	game.createObject(minion);
}
