const GAME_WON = "GAME_WON";
const GAME_LOST = "GAME_LOST";
const BUILDING = "BUILDING";
const PAUSED = "PAUSED";
const DEFAULT = "DEFAULT";
const INITIALIZED = "INITIALIZED";

export default class Game {
	constructor(stage, controls, physics, display) {
		this.stage = stage;
		this.controls = controls;
		this.physics = physics;
		this.display = display;
		this.objects = stage.getObjects();
		this.physics.addObjects(translateToPhysicalRepresentation(this.objects));
		this.display.addObjects(translateToDisplayRepresentation(this.objects));

		this.physics.on("collision", (body1, body2) => {
			const object1 = translateBodyToObject(body1);
			const object2 = translateBodyToObject(body2);

			if (object1.collisionIndex > object2.collisionIndex) {
				object1.collideWith(object2, this.stage);
			}
		});

		stage.on("create", object => {
			this.physics.addObjects(translateToPhysicalRepresentation(object));
			this.display.addObjects(translateToDisplayRepresentation(object));
		});

		stage.on("remove", object => {
			this.physics.removeObjects(translateToPhysicalRepresentation(object));
			this.display.removeObjects(translateToDisplayRepresentation(object));
		});
		this.status = INITIALIZED;
	}

	start() {
		const start = new Date();
		requestAnimationFrame(this.tick.bind(this, start));
	}

	tick(lastTick) {
		const start = new Date();
		requestAnimationFrame(this.tick.bind(this, start));

		const timeDelta = start - lastTick;

		this.stage.update(timeDelta);
		this.stage.getObjects().forEach(object => {
			if (object.isActive) object.update(this.stage, timeDelta);
		});

		this.physics.update(timeDelta);
		this.display.update(timeDelta);

		if (this.stage.checkWinConditions()) {
			console.log("Win");
		}
		const end = new Date();
		//console.log("Frame time", end - start);
	}
}


function translateBodyToObject(body) {
	return body.object;
}
function translateToPhysicalRepresentation(objects) {
	if (!objects) return null;
	if (objects instanceof Array) {
		const result = [];
		objects.forEach((object) => {
			if (object.getPhysicsRepresentation) {
				const model = object.getPhysicsRepresentation();
				if (model instanceof Array) model.forEach(m => result.push(m));
				else result.push(model);
			}
		});
		return result.filter(object => object != null);
	}
	if (objects.getPhysicsRepresentation) return objects.getPhysicsRepresentation();
	return null;
}

function translateToDisplayRepresentation(objects) {
	if (objects instanceof Array) {
		const result = [];
		objects.forEach((object) => {
			if (object.getWebGLRepresentation) {
				const model = object.getWebGLRepresentation();
				if (model instanceof Array) model.forEach(m => result.push(m));
				else result.push(model);
			}
		});
		return result.filter(object => object != null);
	}
	if (objects.getWebGLRepresentation) return objects.getWebGLRepresentation();
	return null;
}
