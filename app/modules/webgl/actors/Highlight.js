import Actor from "./Actor";
let id = 0;
export default class Highlight extends Actor {
	constructor(position, normals, texture, color = [1, 1, 1, 1]) {
		super();
		color = convertHexToWebGL(color);
		this.positionBuffer = `highlight_position_buffer${id++}`;
		this.normalsBuffer = "highlight_normals_buffer";
		this.colorBuffer = `highlight_color_buffer#${color.join(",")}`;
		this.positionArray = position;

		this.colorArray = replicate(24, color);
		this.normalsArray = normals;
		this.vertexCount = 24;
		this.coordinates = {
			x: 0,
			y: 0,
			z: 0,
			rx: 0,
			ry: 0,
			rz: 0
		};
	}

}
function replicate(n, [r,g,b,a]) {
	const result = [];
	for (let i = 0; i < n; i++) {
		result.push(r);
		result.push(g);
		result.push(b);
		result.push(a);
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
