import Actor from "./Actor";

export default class Land extends Actor {
	constructor(heights = [0,0,0,0,0,0,0,0,0], color = 0xffffffff, x, y) {
		super();
		color = convertHexToWebGL(color);
		this.positionBuffer = `cube_position_buffer#${heights.join(",")}`;
		this.colorBuffer = `cube_color_buffer#${color.join(",")}`;
		this.positionArray = generatePositionArray(heights, x, y);
		this.colorArray = getCubeColorArray(color, 24);
		this.vertexCount = 24;
	}
}


function generatePositionArray(heights, x, y) {
	const xy = [[x-1, y+1],[x, y+1],[x+1, y+1],[x-1, y],[x, y],[x+1, y],[x-1, y-1],[x, y-1],[x+1, y-1]];
	const xyz = xy.map((c, i) => [...c, heights[i]]);
	const indices = [[0, 1, 4],[1, 2, 4], [2,5,4], [5,8,4], [8, 7, 4], [7, 6, 4], [6, 3, 4], [3, 0, 4]];
	return indices.reduce((prev, curr) => {
		return [ ...prev, ...curr.reduce((p,i) => [...p, ...xyz[i]], [])];
	}, []);
}

function getCubeColorArray(color, n) {
	let result = [];
	for (let i = 0; i < n; i++) {
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
