import { Matrix, $V } from "../../math/sylvester";

export default class Actor {
	constructor() {
		this._dirty = true;
		this._M = null;
		this.translation = [ 0, 0, 0 ];
		this.rotation = [ 0, 0, 0 ];
		this.scale = [ 1, 1, 1 ];
		this.positionArray = [];
		this.positionBuffer = "actor_position_buffer";
		this.colorArray = [];
		this.colorBuffer = "actor_color_buffer";
	}
	getM() {
		if (this._dirty) {
			const I = Matrix.I(4);
			const translation = Matrix.Translation($V(this.translation)).ensure4x4();
			const scale = Matrix.Scale($V(this.scale)).ensure4x4();
			let rotation = Matrix.I(4);
			if (this.rotation.some(coor => coor != 0)) {
				const rot = this.rotation.reduce((p, c) => p + c*c, 0);
				rotation = Matrix.Rotation(Math.sqrt(rot), $V(this.rotation)).ensure4x4();
			}
			this._M = I.x(translation).x(rotation).x(scale);
			this._dirty = false;
		}
		return this._M;
	}
	translate(x, y, z) {
		this.translation = [x, y, z];
		this._dirty = true;
	}
	translateX(x) {
		this.translation = [x, ...this.translation.slice(1)];
		this._dirty = true;
	}
	translateY(y) {
		this.translation = [this.translation[0], y, this.translation[1]];
		this._dirty = true;
	}
	translateZ(z) {
		this.translation = [...this.translation.slice(0, 2), z];
		this._dirty = true;
	}
	translateXY(x, y) {
		this.translation = [x, y, this.translation[2]];
		this._dirty = true;
	}
	translateXZ(x, z) {
		this.translation = [x, this.translation[1], z];
		this._dirty = true;
	}
	translateYZ(y, z) {
		this.translation = [this.translation[0], y, z];
		this._dirty = true;
	}
	rotate(x, y, z) {
		this.rotation = [x, y, z];
		this._dirty = true;
	}
	rotateX(x) {
		this.rotation = [x, ...this.rotation.slice(1)];
		this._dirty = true;
	}
	rotateY(y) {
		this.rotation = [this.rotation[0], y, this.rotation[1]];
		this._dirty = true;
	}
	rotateZ(z) {
		this.rotation = [...this.rotation.slice(0, 2), z];
		this._dirty = true;
	}
	rotateXY(x, y) {
		this.rotation = [x, y, this.rotation[2]];
		this._dirty = true;
	}
	rotateXZ(x, z) {
		this.rotation = [x, this.rotation[1], z];
		this._dirty = true;
	}
	rotateYZ(y, z) {
		this.rotation = [this.rotation[0], y, z];
		this._dirty = true;
	}
	scale(x, y, z) {
		this.scale = [x, y, z];
		this._dirty = true;
	}
	scaleX(x) {
		this.scale = [x, ...this.scale.slice(1)];
		this._dirty = true;
	}
	scaleY(y) {
		this.scale = [this.scale[0], y, this.scale[1]];
		this._dirty = true;
	}
	scaleZ(z) {
		this.scale = [...this.scale.slice(0, 2), z];
		this._dirty = true;
	}
	scaleXY(x, y) {
		this.scale = [x, y, this.scale[2]];
		this._dirty = true;
	}
	scaleXZ(x, z) {
		this.scale = [x, this.scale[1], z];
		this._dirty = true;
	}
	scaleYZ(y, z) {
		this.scale = [this.scale[0], y, z];
		this._dirty = true;
	}
}
