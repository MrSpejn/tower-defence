import Publisher from "../utils/Publisher";
import BoardBuilder from "./BoardBuilder";
import PlayerManager from "./PlayerManager";
import ObjectMaintainer from "./ObjectMaintainer";
import { polylandFromModel } from "../physics/Polyland";
import { $V } from "../math/sylvester";

const objects = Symbol();
const minions = Symbol();
const turrets = Symbol();
const missiles = Symbol();

export default
@Publisher(["create", "remove"])
class Stage {
	constructor(mapData) {
		this.clock = 0;
		this.boardBuilder = new BoardBuilder();
		this.playerManager = new PlayerManager(mapData.player);
		this.objectMaintaner = new ObjectMaintainer();

		this.fields = {
			types: mapData.field_types,
			heights: mapData.heights
		};
		this.tracks = mapData.tracks;

		this.background = this.boardBuilder.getEnv(this.fields);
		this.board = this.boardBuilder.build(this.fields);

		this.polyland = polylandFromModel(this.board.getWebGLRepresentation(), {
			translateX(x) { return (x + 50) * 25; },
			translateY(y) { return (58 - y) * 25; },
			translateZ(z) { return z*25; }
		});


		const turret1 = this.objectMaintaner.createTurret(900, 800);
		const turret2 = this.objectMaintaner.createTurret(400, 1400);
		const turret3 = this.objectMaintaner.createTurret(400, 1700);
		const turret4 = this.objectMaintaner.createTurret(850, 1550);
		const turret5 = this.objectMaintaner.createTurret(1400, 2200);

		this[minions] = [ ];
		this[turrets] = [ turret1, turret2, turret3, turret4, turret5 ];
		this[missiles] = [  ];


	}

	createObject(blueprints) {
		const object = this.objectMaintaner.create(blueprints, this[minions], this[turrets], this[turrets]);
		this.dispatch("create", object);
	}
	removeObject(object) {
		this.objectMaintaner.remove(object, this[minions], this[turrets], this[turrets]);
		this.dispatch("remove", object);
	}
	checkWinConditions() {

	}
	update(tick) {
		this.clock += tick;
		if (this.clock > 300) {
			this.createObject({
				type: 'MINION',
				options: {
					track: this.tracks[Math.floor(Math.random()*6)]
				}
			});
			this.clock -= 300;
		}
	}
	getObjects() {
		return [this.background, this.board, ...this[turrets], ...this[minions], ...this[missiles]];
	}
	getMinions() {
		return [...this[minions]];
	}
	getTurrets() {
		return [...this[turrets]];
	}
	getMissiles() {
		return [...this[missiles]];
	}
};
