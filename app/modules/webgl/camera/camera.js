import { Matrix, $V, perspective, lookAt } from "../../math/sylvester";

export function PerspectiveCamera(ratio, alpha, dist) {
	this.P = perspective(45, ratio, 0.1, 300);
	const z = Math.cos(alpha) * dist;
	const y = Math.sin(alpha) * dist;
	this.V = lookAt(0, y, z, 0, 0, 0, 0, 1, 0);

}
PerspectiveCamera.prototype.getP = function () {
	return this.P;
};
PerspectiveCamera.prototype.getV = function () {
	return this.V;
};
