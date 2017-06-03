const defaults = {
	x: 0,
	y: 0,
	z: 0,
	rx: 0,
	ry: 0,
	rz: 0,
	sx: 0,
	sy: 0,
	sz: 0,
};


export default class GameObject {
	constructor(coordinates, props) {
		this.coordinates = { ...defaults, ...coordinates };
		for (let key in props) {
			this[key] = props[key];
		}
	}
	getWebGLRepresentation() {
		if (!this.model) {
			this.model = this.generateModel();
			this.model.translateXYZ(translateX(this.coordinates.x), translateY(this.coordinates.y), this.coordinates.z / 25);
			this.model.rotateXYZ(this.coordinates.rx, this.coordinates.ry, this.coordinates.rz);
			this.model.coordinates = this.coordinates;
		}
		return this.model;
	}

	getPhysicsRepresentation() {
		if (!this.body) {
			this.body = this.generateBody();
		}
		return this.body;
	}
}

function translateX(x) {
	return (x / 25) - 50;
}

function translateY(y) {
	return 58 - (y / 25);
}
