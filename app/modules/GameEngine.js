import Renderer from "./webgl/renderer/Renderer";
import Game from "./Game";
import PhysicsEngine from "./PhysicsEngine";
import Scene from "./webgl/scene/Scene";
import { PerspectiveCamera } from "./webgl/camera/camera";

export default class GameEngine {
	constructor(canvas) {
		this.camera = new PerspectiveCamera(canvas.width/canvas.height, -Math.PI / 6, 105);
		this.renderer = new Renderer(canvas);
		this.game = new Game();
		this.scene = new Scene(to3DActors(this.game.getElements()));
		this.physics = new PhysicsEngine(this.game.getElements());

		this.game.on("createObject", obj => {
			this.scene.addAll(to3DActor(obj));
			this.physics.addObject(obj);
		});

		this.game.on("removeObject", obj => {
			this.scene.removeAll(to3DActor(obj));
			this.physics.removeObject(obj);
		});

		this.physics.on("collision", (obj1, obj2) => {
			this.game.collide(obj1, obj2);
		});
	}
	start() {
		let f;
		const loop = timeSince => {
			const n = Date.now();
			f = requestAnimationFrame(loop.bind(null, n));
			this.renderGame(n - timeSince);
		};
		loop(Date.now());
		// setTimeout(() => cancelAnimationFrame(f), 10000);

	}
	renderGame(timeDelta) {
		this.game.update(timeDelta);
		this.physics.update(timeDelta);
		updateActorsPosition(this.game.getObjects());
		this.renderer.render(this.scene, this.camera);
	}
}

function to3DActors(elements) {
	let actors = [];
	elements.forEach(el => {
		actors = [...actors, ...to3DActor(el)];
	});
	return actors;
}

function to3DActor(el) {
	const d3 = el.get3DRepresentation();
	if (d3 instanceof Array) return [...d3];
	else {
		return [d3];
	}
}
function updateActorsPosition(objects) {
	objects.forEach(translateObjectCoordsTo3D);
}

function translateObjectCoordsTo3D(obj) {
	if (obj._moved) {
		const x = (obj.x / 25) - 50;
		const y = 50 - (obj.y / 25) + 12;
		const z = (obj.z / 25) + 1;
		const model = obj.get3DRepresentation();
		model.translate(x, y, z);
		model.rotate(obj.rx, obj.ry, obj.rz);
	}
	obj._moved = false;
}
