import Minion from "./towerdefence/objects/Minion";
import Turret from "./towerdefence/objects/Turret";
import Board from "./towerdefence/Board";
import Map from "./map";

export default class Game {
	constructor() {
		this._handlers = { createObject: [], removeObject: [] };
		const minion1 = new Minion({ x: 600, y: 500, sx: 200 });
		const minion2 = new Minion({x: 600, y: 100 , sy: 100 });
		const turret = new Turret({x: 600, y: 800 });
		const turret2 = new Turret({x: 1200, y: 300 });

		this.objects = [ minion1, minion2, turret, turret2 ];
		this.board = new Board(Map);
	}
	on(event, handler) {
		if (this._handlers[event]) {
			this._handlers[event].push(handler);
		} else {
			throw "Invalid event name";
		}
	}
	update(timeDelta) {

	}
	createObject() {
		this._handlers.createObject.forEach(fn => fn.call());
	}
	removeObject() {
		this._handlers.removeObject.forEach(fn => fn.call());
	}
	getBoard() { return this.board; }
	getObjects() { return this.objects; }
	getElements() { return [this.board, ...this.objects]; }
}
