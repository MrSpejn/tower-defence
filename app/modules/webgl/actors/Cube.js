import Actor from "./Actor";

export default class Cube extends Actor {
	constructor(color = [1, 1, 1, 1]) {
		super();
		color = convertHexToWebGL(color);
		this.positionBuffer = "cube_position_buffer";
		this.colorBuffer = `cube_color_buffer#${color.join(",")}`;
		this.positionArray = getCubeVertexArray();
		this.colorArray = getCubeColorArray(color);
		this.vertexCount = 36;
	}
}

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

function getCubeColorArray(color) {
	let result = [];
	for (let i = 0; i < 36; i++) {
		result = [...result, ...color];
	}
	return result;
}

function convertHexToWebGL(color) {
	const alpha = (color % 0x100) / 0xff;
	color = Math.floor(color / 0x100);

	const blue = (color % 0x100) / 0xff;
	color = Math.floor(color / 0x100);

	const green = (color % 0x100) / 0xff;
	color = Math.floor(color / 0x100);

	const red = (color % 0x100) / 0xff;

	return [ red, green, blue, alpha ];
}
