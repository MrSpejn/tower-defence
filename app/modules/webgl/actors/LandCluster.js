import Actor from "./Actor";
import { Matrix, $V } from "../../math/sylvester";
import { combineNormals } from "../../math/grid-normals";

let id = 0;
export default class LandCluster extends Actor {
	constructor(heights, ftypes, size, startX, startY, texture = null) {
		super();
		id++;
		this.positionBuffer = `landmark${id}`;
		this.colorBuffer = `landmarkc${id}`;
		this.normalsBuffer = `landmarkn${id}`;
		this.vertexCount = 0;

		const [ coordinatesMatrix, coordinatesList, coordinatesFlat ] = calculateCoordinates(heights, size, startX, startY);
		const rowSize = coordinatesMatrix[0].length;
		this.rows = heights.length;
		this.cols = heights[0].length;

		const [ indices, triangles, trianglesCoordsFlat ] = calculateTriangles(coordinatesMatrix, coordinatesList);
		this.triangles = triangles;
		const trianglesNormals = calculateNormals(triangles);
		const normalsMatrix = combineNormals(coordinatesMatrix.length, rowSize, trianglesNormals);
		const normals = [];
		indices.forEach(idx => {
			const n = normalsMatrix[Math.floor(idx / rowSize)][idx % rowSize];
			normals.push(n[0]);
			normals.push(n[1]);
			normals.push(n[2]);
		});
		this.indices = indices;
		this.vertices = coordinatesFlat;
		this.normalsArray = normals;
		this.positionArray = trianglesCoordsFlat;
		this.colorArray = calculateColors(ftypes);
		this.vertexCount = heights.length * heights[0].length * 24;

		if (texture) {
			this.hasTexture = true;
			this.texture = texture;
			this.texCoordBuffer = `landmarkt${id}`;
			this.texCoordArray = calculateTexCoords(ftypes, this.vertexCount);
		}
	}
}

function calculateTexCoords(types, size) {
	const texCoord = [];
	types.forEach((row, i) => row.forEach((type, j) => {
		getTexCoordsForType(type, i, j).forEach(coord => {
			texCoord.push(coord);
		});
	}));
	return texCoord;
}

function calculateColors(types) {
	const colors = [];

	types.forEach(row => row.forEach(type => {
		const rgba = convertHexToWebGL(typeToColor(type)*0x100+0xff);

		for (let i = 0; i < 24; i++) {
			colors.push(rgba[0]);
			colors.push(rgba[1]);
			colors.push(rgba[2]);
			colors.push(rgba[3]);

		}
	}));
	return colors;
}
function calculateNormals(triangles) {
	return triangles.map(calculateNormal);
}
function calculateNormal(triangle) {
	const p1 = $V(triangle[0]), p2 = $V(triangle[1]), p3 = $V(triangle[2]);
	const v1 = p2.subtract(p1), v2 = p3.subtract(p1);
	const normal = v1.cross(v2);
	if (normal.elements[2] < 0) {
		normal.elements = normal.elements.map(i => i === 0 || i === -0 ? 0 : -i);
	} else {
		normal.elements = normal.elements.map(i => i === -0 ? 0 : i);
	}
	return normal;
}

function calculateTriangles(coordinatesMatrix, coordinatesList) {
	const indices = [];
	const triangles = [];
	const trianglesFlat = [];
	for (let i = 1; i < coordinatesMatrix.length; i += 2) {
		for (let j = 1; j < coordinatesMatrix[0].length; j+=2) {
			const segIndices = getIndices(i, j, coordinatesMatrix[0].length);
			segIndices.forEach(idx => {
				indices.push(idx[0]);
				indices.push(idx[1]);
				indices.push(idx[2]);
				const triangle = [coordinatesList[idx[0]], coordinatesList[idx[1]], coordinatesList[idx[2]]];
				triangles.push(triangle);

				trianglesFlat.push(triangle[0][0]);
				trianglesFlat.push(triangle[0][1]);
				trianglesFlat.push(triangle[0][2]);
				trianglesFlat.push(triangle[1][0]);
				trianglesFlat.push(triangle[1][1]);
				trianglesFlat.push(triangle[1][2]);
				trianglesFlat.push(triangle[2][0]);
				trianglesFlat.push(triangle[2][1]);
				trianglesFlat.push(triangle[2][2]);
			});
		}
	}
	return [ indices, triangles, trianglesFlat ];
}

function getIndices(i, j, width) {
	const rows = (i*width);
	return [
		[rows-width-1+j, rows-width+j, rows+j],
		[rows-width+j, rows-width+1+j, rows+j],
		[rows-width+1+j, rows+j+1, rows+j],
		[rows+j+1, rows+width+1+j, rows+j],
		[rows+width+1+j, rows+width+j, rows+j],
		[rows+width+j, rows+width+j-1, rows+j],
		[rows+width+j-1, rows+j-1, rows+j],
		[rows+j-1, rows-width+j-1, rows+j]
	];
}
function calculateCoordinates(heights, size, startX, startY) {
	const coordinatesMatrix = [];
	const coordinatesList = [];
	const coordinatesFlat = [];

	for (let i = 0; i <= heights.length*2; i++) {
		coordinatesMatrix.push([]);
		for (let j = 0; j <= heights[0].length*2; j++) {
			let h;
			if (i % 2 == 0)
				if (j % 2 == 0) h = meanFour(heights, Math.floor(i/2), Math.floor(j/2));
				else h = meanVerticalTwo(heights, Math.floor(i/2), Math.floor(j/2));
			else {
				if (j % 2 == 0) h = meanHorizontalTwo(heights, Math.floor(i/2), Math.floor(j/2));
				else h = heights[Math.floor(i/2)][Math.floor(j/2)];
			}
			const x = translateX(size/2*(j-1)+startX);
			const y = translateY(size/2*(i-1)+startY);
			coordinatesMatrix[i][j] = [x, y, h];
			coordinatesList.push([x, y, h]);
			coordinatesFlat.push(x);
			coordinatesFlat.push(y);
			coordinatesFlat.push(h);
		}
	}
	return [coordinatesMatrix, coordinatesList, coordinatesFlat];
}


function meanFour(heights, i, j) {
	const h = safeGet(heights, i, j, null);
	const top = safeGet(heights, i-1, j, null);
	const top_left = safeGet(heights, i-1, j-1, null);
	const left = safeGet(heights, i, j-1, null);
	return mean([h, top, top_left, left]);
}

function meanHorizontalTwo(heights, i, j) {
	const h = safeGet(heights, i, j, null);
	const left = safeGet(heights, i, j-1, null);
	return mean([h, left]);

}

function meanVerticalTwo(heights, i, j) {
	const h = safeGet(heights, i, j, null);
	const top = safeGet(heights, i-1, j, null);
	return mean([h, top]);

}

function mean(values) {
	values = values.filter(v => v != null);
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

function getTexCoordsForType(type, i, j) {
	const s = 0.05;
	const size = 0.40;
	const x = s+(j%8)*size/8;
	const y = s+(i%8)*size/8;
	switch (type) {
	case DIRT: return mapSquareToTriangles(x,y, size/8);
	case GRASS: return mapSquareToTriangles(x+0.5, y+0.5, size/8);
	case ROCK: return mapSquareToTriangles(x+0.5, y, size/8);
	case SNOW: return mapSquareToTriangles(x, y+0.5, size/8);
	}
}

function mapSquareToTriangles(x, y, scale) {
	const coords = [0,0, .5,0, .5,.5, .5,0, 1,0, .5,.5, 1,0, 1,.5, .5,.5, 1,.5, 1,1, .5,.5, 1,1, .5,1, .5,.5, .5,1, 0,1, .5,.5, 0,1, 0,.5, .5,.5, 0,.5, 0,0, .5,.5];
	return coords.map((value, i) => i % 2 == 0 ? value*scale + x : value*scale + y);
}

function typeToColor(type) {
	switch (type) {
	case GRASS: return 0x32c15f;
	case ROCK: return 0x937b6f;
	case DIRT: return 0xfafdc4;
	case SNOW: return 0xC6C3C2;
	default: return 0x32c15f;
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

function translateX(x) {
	return (x / 25) - 50;
}

function translateY(y) {
	return 58 - (y / 25);
}
