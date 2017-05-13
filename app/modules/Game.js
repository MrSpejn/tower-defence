import Scene from "./webgl/scene/Scene";
import { PerspectiveCamera } from "./webgl/camera/camera";
import { StandardLight } from "./webgl/light/light";
import Minion from "./towerdefence/objects/Minion";
import Turret from "./towerdefence/objects/Turret";
import Cube from "./webgl/actors/Cube";

import Map from "./map";

export default class Game {
	constructor(width, height) {
		this.scene = new Scene();
		this.camera = new PerspectiveCamera(width/height, -Math.PI / 6, 105);
		createGameBoard(this.scene);

		const minion1 = new Minion({ x: 600, y: 0 });
		const minion2 = new Minion({x: 650, y: 50 });
		const turret = new Turret({x: 600, y: 800 });
		const turret2 = new Turret({x: 1200, y: 300 });

		this.objects = [ minion1, minion2, turret, turret2 ];
		this.objects.forEach(obj => {
			this.scene.add(obj.get3DRepresentation());
		});

	}

	update(timeDelta) {
		this.objects.forEach(translateObjectCoordsTo3D);
	}

	getScene() {
		return this.scene;
	}

	getCamera() {
		return this.camera;
	}
}


function createGameBoard(scene) {
	Map.field_types.forEach((row, i) => row.forEach((type, j) => {
		const r = type === 0 ? 0x32c15f : 0xfafdc4;
		const c = new Cube(r * 0x100 + 0xff);
		c.translate(2*j - 50,  50 - 2*i + 12, 0);
		scene.add(c);
	}));

	const bg = new Cube(0x937b6fff);
	bg.scaleXY(120, 80);
	bg.scaleZ(0.25);
	bg.translateYZ(12, -0.002);
	scene.add(bg);
}

function translateObjectCoordsTo3D(obj) {
	if (obj._moved) {
		const x = (obj.x / 25) - 50;
		const y = 50 - (obj.y / 25) + 12;
		const z = (obj.z / 25) + 1;
		obj.get3DRepresentation().translate(x, y, z);
	}
	obj._moved = false;
}
