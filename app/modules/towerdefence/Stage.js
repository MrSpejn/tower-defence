import Publisher from "../utils/Publisher";
import BoardBuilder from "./BoardBuilder";
import PlayerManager from "./PlayerManager";
import ObjectMaintainer from "./ObjectMaintainer";
import LandPlaner from "./LandPlaner";
import CreateTurretOperation from "./CreateTurretOperation";
import Highlight from "../webgl/actors/Highlight";
import towerOBJ from "../../models/tower.obj";
import ObjActor from "../webgl/actors/ObjActor";

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
		this.fields = {
			types: mapData.field_types,
			heights: mapData.heights
		};
		this.boardBuilder = new BoardBuilder();
		this.background = this.boardBuilder.getEnv(this.fields);
		this.board = this.boardBuilder.build(this.fields);

		this.playerManager = new PlayerManager(mapData.player);
		this.objectMaintaner = new ObjectMaintainer();
		this.landPlaner = new LandPlaner(this.fields, this.board);

		this.tracks = mapData.tracks;
		this.ops = [];


		this.polyland = polylandFromModel(this.board.getWebGLRepresentation(), {
			translateX(x) { return (x + 50) * 25; },
			translateY(y) { return (58 - y) * 25; },
			translateZ(z) { return z*25; }
		});


		// const turret1 = this.objectMaintaner.createTurret(7 * 50 + 25, 28*50 + 25);
		// this.landPlaner.setTurretOn(28, 7, 2);
		// const turret2 = this.objectMaintaner.createTurret(36 * 50 + 25, 27*50 + 25);
		// this.landPlaner.setTurretOn(27 , 36, 2);
		// const turret3 = this.objectMaintaner.createTurret(18 * 50 + 25, 14*50 + 25);
		// this.landPlaner.setTurretOn(14 , 18, 2);
		// const turret4 = this.objectMaintaner.createTurret(15 * 50 + 25, 30*50 + 25);
		// this.landPlaner.setTurretOn(30 , 15, 2);
		// const turret5 = this.objectMaintaner.createTurret(28 * 50 + 25, 46*50 + 25);
		// this.landPlaner.setTurretOn(46 , 28, 2);
		// const turret6 = this.objectMaintaner.createTurret(37 * 50 + 25, 36*50 + 25, 12*25);
		// this.landPlaner.setTurretOn(36 , 37, 2);

		this[minions] = [ ];
		this[turrets] = [ ];
		this[missiles] = [  ];


	}

	createObject(blueprints) {
		const object = this.objectMaintaner.create(blueprints, this[minions], this[turrets], this[missiles]);
		this.dispatch("create", object);
		return object;
	}
	removeObject(object) {
		this.objectMaintaner.remove(object, this[minions], this[turrets], this[missiles]);
		this.dispatch("remove", object);
	}
	checkWinConditions() {

	}
	update(tick) {
		console.log(this[turrets]);
		this.clock += tick;
		if (this.clock > 400) {
			this.createObject({
				type: "MINION",
				options: {
					track: this.tracks[Math.floor(Math.random()*6)]
				}
			});
			this.clock -= 400;
		}
	}
	getObjects() {
		return [this.board, this.background, ...this[turrets], ...this[minions], ...this[missiles]];
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
	createTurret(i,j) {
		const fields = this.landPlaner.getBuildFields(i, j, 2);
		if (fields.every(({valid}) => valid)) {
			const op = new CreateTurretOperation(this, i, j, 2);
			op.perform();
			this.ops.push(op);
		}
	}
	promptForHoverObject({i, j}) {
		const boardModel = this.board.getWebGLRepresentation();
		const fields = this.landPlaner.getBuildFields(i, j, 2);
		const hover = fields.map(({i, j, valid}) => {
			const [vertices, normals] = boardModel.getVertices(i, j);
			return new Highlight(vertices, normals, null, valid ? 0x203301ff : 0xaa0000ff);
		});
		if (fields.every(({valid}) => valid)) {
			const turret = new ObjActor(towerOBJ, "tower", null, 0x203301ff);
			turret.translateXYZ((2*j+1)-50, 58-(i*2+1), boardModel.getHeights(i,j).maxZ);
			hover.push(turret);
		}
		return hover;
	}
	cancelLastOp() {
		if (this.ops.length > 0) {
			const op = this.ops.slice(-1)[0];
			this.ops = this.ops.slice(0, -1);
			op.revert();
		}
	}
};
