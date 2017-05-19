import Renderer from "./webgl/renderer/Renderer";
import Game from "./Game";
import PhysicsEngine from "./PhysicsEngine";
import Scene from "./webgl/scene/Scene";
import { PerspectiveCamera } from "./webgl/camera/camera";
import Mountains from "./towerdefence/Mountains";

export default class GameEngine {
	constructor(canvas) {
		this.camera = new PerspectiveCamera(canvas.width/canvas.height, -Math.PI /6, 100);
		this.renderer = new Renderer(canvas);
		this.game = new Game();
		this.scene = new Scene(to3DActors(this.game.getElements()));
		this.physics = new PhysicsEngine(this.game.getObjects());

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
	}
	renderGame(timeDelta) {
		const start = Date.now();
		this.game.update(timeDelta);
		const s1 = Date.now();
		this.physics.update(timeDelta);
		const s2 = Date.now();
		updateActorsPosition(this.game.getElements());
		const s3 = Date.now();
		this.renderer.render(this.scene, this.camera);
		const s4 = Date.now();
		console.log(s1 - start, s2 - s1, s3 - s2, s4 - s3);
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
		const x = translateX(obj.x);
		const y = translateY(obj.y);
		if (obj instanceof Mountains) console.log(x, y);
		const z = (obj.z / 25);
		const model = obj.get3DRepresentation();
		model.translate(x, y, z);
		if (obj.rx) model.rotate(obj.rx, obj.ry, obj.rz);
	}
	obj._moved = false;
}

export function translateX(x) {
	return (x / 25) - 50;
}

export function translateY(y) {
	return 58 - (y / 25);
}
