import Minion from "./towerdefence/objects/Minion";
import Missile from "./towerdefence/objects/Missile";
import Turret from "./towerdefence/objects/Turret";
import Board from "./towerdefence/Board";
import Map from "./map";
import { $V } from "./math/sylvester";

export default class Game {
	constructor() {
		this._handlers = { createObject: [], removeObject: [] };
		const turret = new Turret({ x: 600, y: 800, attack_speed: 2 });
		const turret2 = new Turret({ x: 1200, y: 300, attack_speed: 2 });
		const turret3 = new Turret({ x: 800, y: 1500, attack_speed: 2, range: 600 });

		this.ticker = 0;
		this.minions = [ ];
		this.turrets = [ turret, turret2, turret3 ];
		this.missiles = [];
		this.board = new Board(Map);
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
			if ($V([minion.x, minion.y]).subtract(minion.dest).modulus() < 5) {
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
			} else followTarget(missile)
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
	getObjects() { return [ ...this.turrets, ...this.missiles, ...this.minions ]; }
	getElements() { return [this.board, ...this.getObjects() ]; }
}


function followTrack(object, tracks) {
	if (!object.progress) object.progress = 0;
	const cell = tracks[object.track - 1][object.progress];
	const pos = $V([object.x, object.y]);
	const dest = $V([ cell[1]*50, cell[0]*50 ]);
	object.dest = dest;
	const velo = dest.subtract(pos).toUnitVector().x(object.speed);
	object.sx = velo.elements[0];
	object.sy = velo.elements[1];
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

function addMinion(game, Map) {
	const minion = new Minion({ speed: 100 });
	minion.track = Math.floor(Math.random() * 3) + 1;
	const startCell = Map.tracks[minion.track - 1][0];
	minion.x = startCell[1]*50;
	minion.y = startCell[0]*50;
	minion.progress = 1;
	followTrack(minion, Map.tracks);
	game.minions = [ ...game.minions, minion ];
	game.createObject(minion);
}
