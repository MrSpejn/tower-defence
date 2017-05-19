import LandCluster from "../webgl/actors/LandCluster";

export default class Mountains {
	constructor(rows, cols, size) {
		this.x = 0;
		this.y = 0;
		this.z = 0;
		const heights = generateHeightMatrix(rows, cols, 12, 16);
		this.model = new LandCluster(heights, generateTypeMatrix(heights), size, 0, 0);
		this._moved = true;
	}
	get3DRepresentation() {
		return this.model;
	}
}

function generateTypeMatrix(heights) {
	const result = [];

	for (let i = 0; i < heights.length; i++) {
		result.push([]);
		for (let j = 0; j < heights[0].length; j++) {
			if (heights[i][j] > 12) result[i][j] = 6;
			else result[i][j] = 5;
		}
	}
	return result;
}

function generateHeightMatrix(rows, cols, min, max) {
	const result = [];
	for (let i = 0; i < rows; i++) {
		result.push([]);
		for (let j = 0; j < cols; j++) {
			const dist = Math.min(j, cols - 1 - j);
			if (dist == 0) result[i][j] = 3;
			else result[i][j] = Math.floor(Math.random()*(max - min)) + min - (Math.ceil(cols / 4) - Math.ceil(dist / 2));
		}
	}
	return result;
}
