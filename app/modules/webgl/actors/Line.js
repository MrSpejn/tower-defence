import Actor from "./Actor";
let id = 0;
export default class Line extends Actor {
	constructor(p1, p2, texture, color = [1, 1, 1, 1]) {
		super();
		color = convertHexToWebGL(color);
		this.positionBuffer = `line_position_buffer${id++}`;
		this.normalsBuffer = "line_normals_buffer";
		this.colorBuffer = `line_color_buffer#${color.join(",")}`;
		this.positionArray = [...p1, ...p2];
		this.colorArray = [...color, ...color];
		this.normalsArray = [1,1,1,1,1,1];
		this.vertexCount = 2;
	}
	render(gl) {
		gl.drawElements(gl.LINE_STRIP, this.vertexCount, gl.UNSIGNED_SHORT, 0);
	}

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
