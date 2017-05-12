import { Matrix, $V, perspective, lookAt } from "../../math/sylvester";

export function PerspectiveCamera(ratio) {
	this.P = perspective(45, ratio, 0.1, 100);
	this.V = lookAt(0, 0, 12, 0, 0, 0, 0, 1, 0);

}
PerspectiveCamera.prototype.getP = function () {
	return this.P;
};
PerspectiveCamera.prototype.getV = function () {
	return this.V;
};
