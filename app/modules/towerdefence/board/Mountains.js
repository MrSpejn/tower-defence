import LandCluster from "../../webgl/actors/LandCluster";

export default class Mountains {
	constructor(rows, cols, size, { x = 0, y = 0, z = 0 } = { x:0, y:0, z:0 }) {
		this.coordinates = {x,y,z,rx:0,ry:0,rz:0};
		this.size = size;
		this.heights = generateHeightMatrix(rows, cols, 18, 26);

	}
	getWebGLRepresentation() {
		if (!this.model) {
			this.model = new LandCluster(this.heights, generateTypeMatrix(this.heights), this.size, 0, 0, "textures.jpg");
			this.model.coordinates = this.coordinates;
		}
		return this.model;
	}
}

function generateTypeMatrix(heights) {
	const result = [];

	for (let i = 0; i < heights.length; i++) {
		result.push([]);
		for (let j = 0; j < heights[0].length; j++) {
			if (heights[i][j] > 16) result[i][j] = 6;
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
			else result[i][j] = Math.floor(Math.random()*(max - min)) + min - (Math.ceil(cols / 2) - Math.ceil(dist));
		}
	}
	return result;
}
