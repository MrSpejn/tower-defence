import { Matrix, $V } from "../../math/sylvester";

export default class Actor {
	constructor() {
		this._dirty = true;
		this._M = null;
		this.translation = [ 0, 0, 0 ];
		this.rotation = [ 0, 0, 0 ];
		this.quaternions = false;
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

			let rotation;
			if (!this.quaternions) {
				rotation = Matrix.Rotation(this.rotation[0], $V([1,0,0])).ensure4x4()
					.x(Matrix.Rotation(this.rotation[1], $V([0,1,0])).ensure4x4())
					.x(Matrix.Rotation(this.rotation[2], $V([0,0,1])).ensure4x4());
			} else {
				if (this.rotation.slice(1).some(coord => coord != 0)) {
					rotation = Matrix.Rotation(this.rotation[0], $V(this.rotation.slice(1))).ensure4x4();
				} else rotation = Matrix.I(4);
			}

			this._M = I.x(translation).x(rotation).x(scale);
			this._dirty = false;
		}
		return this._M;
	}
	translateXYZ(x, y, z) {
		if (x == this.translation.x && y == this.translation.y && z == this.translation.z) return;
		this.translation = [x, y, z];
		this._dirty = true;
	}
	translateX(x) {
		if (x == this.translation.x) return;
		this.translation = [x, ...this.translation.slice(1)];
		this._dirty = true;
	}
	translateY(y) {
		if (y == this.translation.y) return;
		this.translation = [this.translation[0], y, this.translation[1]];
		this._dirty = true;
	}
	translateZ(z) {
		if (z == this.translation.z) return;
		this.translation = [...this.translation.slice(0, 2), z];
		this._dirty = true;
	}
	translateXY(x, y) {
		if (x == this.translation.x && y == this.translation.y) return;
		this.translation = [x, y, this.translation[2]];
		this._dirty = true;
	}
	translateXZ(x, z) {
		if (x == this.translation.x&& z == this.translation.z) return;
		this.translation = [x, this.translation[1], z];
		this._dirty = true;
	}
	translateYZ(y, z) {
		if (y == this.translation.y && z == this.translation.z) return;
		this.translation = [this.translation[0], y, z];
		this._dirty = true;
	}
	rotateXYZ(x, y, z) {
		if (x == this.rotation.x && y == this.rotation.y && z == this.rotation.z) return;
		this.rotation = [x, y, z];
		this._dirty = true;
	}
	rotateX(x) {
		if (x == this.rotation.x) return;
		this.rotation = [x, ...this.rotation.slice(1)];
		this._dirty = true;
	}
	rotateY(y) {
		if (y == this.rotation.y) return;
		this.rotation = [this.rotation[0], y, this.rotation[1]];
		this._dirty = true;
	}
	rotateZ(z) {
		if (z == this.rotation.z) return;
		this.rotation = [...this.rotation.slice(0, 2), z];
		this._dirty = true;
	}
	rotateXY(x, y) {
		if (x == this.rotation.x && y == this.rotation.y) return;
		this.rotation = [x, y, this.rotation[2]];
		this._dirty = true;
	}
	rotateXZ(x, z) {
		if (x == this.rotation.x && z == this.rotation.z) return;
		this.rotation = [x, this.rotation[1], z];
		this._dirty = true;
	}
	rotateYZ(y, z) {
		if (y == this.rotation.y && z == this.rotation.z) return;
		this.rotation = [this.rotation[0], y, z];
		this._dirty = true;
	}
	scaleXYZ(x, y, z) {
		if (x == this.scale.x && y == this.scale.y && z == this.scale.z) return;
		this.scale = [x, y, z];
		this._dirty = true;
	}
	scaleX(x) {
		if (x == this.scale.x) return;
		this.scale = [x, ...this.scale.slice(1)];
		this._dirty = true;
	}
	scaleY(y) {
		if (y == this.scale.y) return;
		this.scale = [this.scale[0], y, this.scale[1]];
		this._dirty = true;
	}
	scaleZ(z) {
		if (z == this.scale.z) return;
		this.scale = [...this.scale.slice(0, 2), z];
		this._dirty = true;
	}
	scaleXY(x, y) {
		if (x == this.scale.x && y == this.scale.y) return;
		this.scale = [x, y, this.scale[2]];
		this._dirty = true;
	}
	scaleXZ(x, z) {
		if (x == this.scale.x && z == this.scale.z) return;
		this.scale = [x, this.scale[1], z];
		this._dirty = true;
	}
	scaleYZ(y, z) {
		if (y == this.scale.y && z == this.scale.z) return;
		this.scale = [this.scale[0], y, z];
		this._dirty = true;
	}
}
