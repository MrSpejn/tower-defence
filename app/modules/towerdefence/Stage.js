import Publisher from "../utils/Publisher";
import BoardBuilder from "./BoardBuilder";
import PlayerManager from "./PlayerManager";
import ObjectMaintainer from "./ObjectMaintainer";


const objects = Symbol();
const minions = Symbol();
const turrets = Symbol();
const missiles = Symbol();

export default
@Publisher(["create", "remove"])
class Stage {
	constructor(mapData) {
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
		const turret1 = this.objectMaintaner.createTurret(900, 800);
		const turret2 = this.objectMaintaner.createTurret(400, 1400);
		const turret3 = this.objectMaintaner.createTurret(400, 1700);
		const turret4 = this.objectMaintaner.createTurret(850, 1550);

		const minion1 = this.objectMaintaner.createMinion(this.tracks[0], 0);

		this[minions] = [  minion1 ];
		this[turrets] = [ turret1, turret2, turret3, turret4 ];
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
	update() {

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
