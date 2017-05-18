import Actor from "./Actor";
import Land from "./Land";

export default class LandCluster extends Actor {
	constructor(heights, ftypes) {
		super();
		this.positionBuffer = "landmark";
		this.colorBuffer = "landmarkc";
		this.normalsBuffer = "landmarkn";
		this.positionArray = [];
		this.normalsArray = [];
		this.colorArray = [];
		this.vertexCount = 0;
		ftypes.forEach((row, i) => row.forEach((type, j) => {
			const r = type === 0 ? 0x32c15f : 0xfafdc4;
			const c = new Land(getHeights(heights, i, j), r * 0x100 + 0xff, 2*j - 50,  50 - 2*i + 12);
			c.positionArray.forEach(e => {
				this.positionArray.push(e);
			});
			c.colorArray.forEach(e => {
				this.colorArray.push(e);
			});
			c.normalsArray.forEach(e => {
				this.normalsArray.push(e);
			});
			this.vertexCount += c.vertexCount;
		}));
	}
}


function getHeights(heights, i , j) {
	const h = heights[i][j];
	const top = safeGet(heights, i-1, j, h);
	const top_left = safeGet(heights, i-1, j-1, h);
	const left = safeGet(heights, i, j-1, h);
	const bottom_left = safeGet(heights, i+1, j-1, h);
	const bottom = safeGet(heights, i+1, j, h);
	const bottom_right = safeGet(heights, i+1, j+1, h);
	const right = safeGet(heights, i, j+1, h);
	const top_right = safeGet(heights, i-1, j+1, h);
	return [
		mean([h, left, top, top_left]),
		mean([h, top]),
		mean([h, right, top, top_right]),
		mean([h, left]),
		h,
		mean([h, right]),
		mean([h, left, bottom, bottom_left]),
		mean([h, bottom]),
		mean([h, right, bottom, bottom_right ])
	];
}
function mean(values) {
	return values.reduce((p, c) => p+c, 0) / values.length;
}
function safeGet(matrix, i, j, sub) {
	if (matrix[i] === undefined) return sub;
	return matrix[i][j] === undefined ? sub : matrix[i][j];
}
