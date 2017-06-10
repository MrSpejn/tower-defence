import Actor from "./Actor";
let id = 0;
export default class Point extends Actor {
	constructor(p1, color = [1, 1, 1, 1]) {
		super();
		color = convertHexToWebGL(color);
		this.positionBuffer = `point_position_buffer${id++}`;
		this.normalsBuffer = "point_normals_buffer";
		this.colorBuffer = `point_color_buffer#${color.join(",")}`;
		this.positionArray = [...p1];
		this.colorArray = [...color];
		this.normalsArray = [1,1,1];
		this.vertexCount = 1;
	}
	render(gl) {
		gl.drawElements(gl.POINT, this.vertexCount, gl.UNSIGNED_SHORT, 0);
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
