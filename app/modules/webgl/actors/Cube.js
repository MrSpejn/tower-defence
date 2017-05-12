import { Matrix, $V } from "../../math/sylvester";

export default function Cube() {
	this.hasPosition = true;
	this.positionBuffer = "cube_position_buffer";
	this.positionArray = getCubeVertexArray();
	this.vertexCount = 36;
}

Cube.prototype.getM = function() {
	return Matrix.I(4);

};

function getCubeVertexArray() {
	const position = [
		1,-1,-1,
		-1, 1,-1,
		-1,-1,-1,

		1,-1,-1,
		1, 1,-1,
		-1, 1,-1,

		-1,-1, 1,
		1, 1, 1,
		1,-1, 1,

		-1,-1, 1,
		-1, 1, 1,
		1, 1, 1,

		1,-1, 1,
		1, 1,-1,
		1,-1,-1,

		1,-1, 1,
		1, 1, 1,
		1, 1,-1,

		-1,-1,-1,
		-1, 1, 1,
		-1,-1, 1,

		-1,-1,-1,
		-1, 1,-1,
		-1, 1, 1,

		-1,-1,-1,
		1,-1, 1,
		1,-1,-1,

		-1,-1,-1,
		-1,-1, 1,
		1,-1, 1,

		-1, 1, 1,
		1, 1,-1,
		1, 1, 1,

		-1, 1, 1,
		-1, 1,-1,
		1, 1,-1,
	];
	return position;
}
