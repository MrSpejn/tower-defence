import minionOBJ from "../../../models/minion.obj";
import ObjActor from "../../webgl/actors/ObjActor";
import Cannon from "cannon";
import GameObject from "./Object";
import { $V } from "../../math/sylvester";

const defaults = {
	hp: 10,
	size: 1,
	speed: 150,
	isActive: true,
	collisionIndex: 5,
	progress: 0
};

export default class Minion extends GameObject {
	constructor(coordinates, options) {
		super(coordinates, {...defaults, ...options });
		this.chp = this.hp;

		this.coordinates.x = this.track[this.progress][1]*50;
		this.coordinates.y = this.track[this.progress][0]*50;
		this.destination = $V([this.track[this.progress+1][1]*50, this.track[this.progress+1][0]*50]);
		this.prevCell = [this.track[this.progress][1], this.track[this.progress][0]];
		this.currCell = [this.track[this.progress][1], this.track[this.progress][0]];
		this.progress++;
	}

	generateModel() {
		const model = new ObjActor(minionOBJ, "minion", "minion.png", 0x0000ffff);
		model.coordinates = this.coordinates;
		return model;
	}

	generateBody() {
		const body = new Cannon.Body({
			mass: 500,
			shape: new Cannon.Sphere(25),
			position: new Cannon.Vec3(this.coordinates.x, this.coordinates.y, this.coordinates.z),
			velocity: new Cannon.Vec3(this.coordinates.sx, this.coordinates.sy, this.coordinates.sz),
			linearDamping: 0,
			collisionFilterGroup: 4,
			collisionFilterMask: 12,
			material: new Cannon.Material({ friction: 0, restitution: 0 })
		});
		body.coordinates = this.coordinates;
		body.object = this;
		body.collisionResponse = false;
		return body;
	}

	update(stage, tick) {
		updateTrack(this, stage);
	}
}

function updateTrack(minion, stage) {
	const vecPosition = $V([ minion.coordinates.x, minion.coordinates.y ]);

	if (didReachCheckPoint(vecPosition, minion.destination)) {
		minion.progress++;
		const directionCell = minion.track[minion.progress];

		if (!directionCell) return minionReachedEnd(stage, minion);
		else {
			const vecDest = $V([ directionCell[1]*50, directionCell[0]*50 ]);
			minion.destination = vecDest;
		}
	}

	followTrack(minion, minion.track);
	calculateSpeedCorrectionFor3DTerrain(minion, stage.fields.heights);
}

function didReachCheckPoint(vecPosition, vecDest) {
	return vecPosition.subtract(vecDest).modulus() < 10;
}

function followTrack(minion) {
	const vecPosition = $V([minion.coordinates.x, minion.coordinates.y]);
	const vecDestination = minion.destination;

	const {sx, sy} = calculateSpeed2D(vecPosition, vecDestination, minion.speed);
	minion.coordinates.sx = sx;
	minion.coordinates.sy = sy;
	minion.coordinates.sz = 0;

	minion.coordinates.rz = calculateRotation(sx, sy);
}

function calculateSpeed2D(vecPosition, vecDest, speed) {
	const velocity2D = vecDest.subtract(vecPosition).toUnitVector().x(speed);
	return { sx: velocity2D.elements[0], sy: velocity2D.elements[1] };
}

function calculateRotation(speedX, speedY) {
	const angle = $V([speedX, speedY]).angleFrom($V([0, 1]));
	if (speedX < 0)  return 2*Math.PI - angle;
	else return angle;
}

function minionReachedEnd(stage, minion) {
	minion.passed = true;
	stage.removeObject(minion);
}


function calculateSpeedCorrectionFor3DTerrain(minion, heights) {
	const currCell = getMinionCell(minion);
	if (currCell[0] != minion.currCell[0] || currCell[1] != minion.currCell[1]) {
		minion.prevCell = minion.currCell;
		minion.currCell = currCell;
	}
	const nextCell = getNextCell(minion);

	const prevH = heights[minion.prevCell[1]][minion.prevCell[0]]  * 25 + 25;
	const delta1 = ((heights[nextCell[1]][nextCell[0]] * 25 + 25) - minion.coordinates.z);
	const delta2 = (heights[nextCell[1]][nextCell[0]] - heights[currCell[1]][currCell[0]]) * 25;

	const delta3 = (heights[minion.prevCell[1]][minion.prevCell[0]] - heights[currCell[1]][currCell[0]]) * 25;

	if (delta2 <= 0 && Math.abs(delta1) < 17) {
		minion.coordinates.z = heights[nextCell[1]][nextCell[0]] * 25 + 25;
		return;
	}
	let velocity3D;
	if (delta1 > 0) {
		velocity3D = $V([minion.coordinates.sx, minion.coordinates.sy, delta2 / 50 * minion.speed]).toUnitVector().x(minion.speed*0.7);
	} else if (delta3 > 0) {
		velocity3D = $V([minion.coordinates.sx, minion.coordinates.sy, -delta3 / 50 * minion.speed]).toUnitVector().x(minion.speed*1.2);
	} else return;

	minion.coordinates.sx = velocity3D.elements[0];
	minion.coordinates.sy = velocity3D.elements[1];
	minion.coordinates.sz = velocity3D.elements[2];
}

function getNextCell(minion) {
	const velocity = $V([ minion.coordinates.sx, minion.coordinates.sy ]);
	const x = Math.floor(minion.coordinates.x / 50);
	const y = Math.floor(minion.coordinates.y / 50);

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

function getMinionCell(minion) {
	const x = Math.floor(minion.coordinates.x / 50);
	const y = Math.floor(minion.coordinates.y / 50);
	return [x, y];
}
