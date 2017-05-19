import Actor from "./Actor";
import Land from "./Land";
import { translateX, translateY } from "../../GameEngine";


let id = 0;
export default class LandCluster extends Actor {
	constructor(heights, ftypes, size, startX, startY) {
		super();
		id++;
		this.positionBuffer = `landmark${id}`;
		this.colorBuffer = `landmarkc${id}`;
		this.normalsBuffer = `landmarkn${id}`;
		this.positionArray = [];
		this.normalsArray = [];
		this.colorArray = [];
		this.vertexCount = 0;
		this.lands = [];

		heights.forEach((row, i) => row.forEach((_, j) => {
			const rgb = typeToColor(ftypes[i][j]);
			const c = new Land(getHeights(heights, i, j), rgb * 0x100 + 0xff, translateX(size*j + startX), translateY(size*i + startY));
			if (!this.lands[i]) this.lands[i] = [c];
			else this.lands[i].push(c);

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


const GRASS = 0;
const DIRT = 4;
const ROCK = 5;
const SNOW = 6;

function typeToColor(type) {
	switch (type) {
	case GRASS: return 0x32c15f;
	case ROCK: return 0x937b6f;
	case DIRT: return 0xfafdc4;
	case SNOW: return 0xC6C3C2;
	default: return 0x32c15f;
	}
}
