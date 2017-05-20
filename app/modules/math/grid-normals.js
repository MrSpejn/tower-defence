import { $V } from "./sylvester";

export function combineNormals(rows, cols, trianglesNormals) {
	const width = Math.floor(cols/2);
	const lastrow = rows - 1;
	const lastcol = cols - 1;
	const normalsMatrix = [];
	for (let i = 1; i < lastrow; i++) {
		normalsMatrix[i] = [];
		for (let j = 1; j < lastcol; j++) {
			let normals;
			if (i % 2 == 0) {
				if (j % 2 == 0) normals = getAroundDiagonal(i, j, trianglesNormals, width);
				else normals = getAroundVertical(i, j, trianglesNormals, width);
			} else {
				if (j % 2 == 0) normals = getAroundHorizontal(i, j, trianglesNormals, width);
				else normals = getAroundCenter(i, j, trianglesNormals, width);
			}
			normalsMatrix[i][j] = normals;
		}
	}
	for (let i = 1; i < lastrow; i++) {
		const j = 0;
		if (i%2 == 0) normalsMatrix[i][j] = getDiagonalTrimmed(i, j, trianglesNormals, width, [false, false, true, false]);
		else normalsMatrix[i][j] = getHorizontalTrimmed(i, j, trianglesNormals, width, false);
	}
	for (let i = 1; i < lastrow; i++) {
		const j = lastcol;
		if (i%2 == 0) normalsMatrix[i][j] = getDiagonalTrimmed(i, j, trianglesNormals, width, [false, false, false, true]);
		else normalsMatrix[i][j] = getHorizontalTrimmed(i, j, trianglesNormals, width, true);
	}
	normalsMatrix[0] = [];
	normalsMatrix[lastrow] = [];

	for (let j = 1; j < lastcol; j++) {
		const i = 0;
		if (j%2 == 0) normalsMatrix[i][j] = getDiagonalTrimmed(i, j, trianglesNormals, width, [true, false, false, false]);
		else normalsMatrix[i][j] = getVerticalTrimmed(i, j, trianglesNormals, width, false);
	}
	for (let j = 1; j < lastcol; j++) {
		const i = lastrow;
		if (j%2 == 0) normalsMatrix[i][j] = getDiagonalTrimmed(i, j, trianglesNormals, width, [false, true,  false, false]);
		else normalsMatrix[i][j] = getVerticalTrimmed(i, j, trianglesNormals, width, true);
	}

	normalsMatrix[0][0] = getDiagonalTrimmed(0, 0, trianglesNormals, width, [true, false, true, false]);
	normalsMatrix[0][lastcol] = getDiagonalTrimmed(0, lastcol, trianglesNormals, width, [true, false, false, true]);
	normalsMatrix[lastrow][0] = getDiagonalTrimmed(lastrow, 0, trianglesNormals, width, [false, true, true, false]);
	normalsMatrix[lastrow][lastcol] = getDiagonalTrimmed(lastrow, lastcol, trianglesNormals, width, [false, true, false, true]);

	return normalsMatrix.map(row => row.map(normals => {
		return normals.reduce((vec, normal) => vec.add(normal), $V([0,0,0])).toUnitVector().elements;
	}));
}



function getAroundCenter(i, j, trianglesNormals, width) {
	const row = Math.floor(i/2) * 8 * width;
	const col = Math.floor(j/2) * 8;
	return [
		trianglesNormals[row+col], trianglesNormals[row+col+1],
		trianglesNormals[row+col+2], trianglesNormals[row+col+3],
		trianglesNormals[row+col+4], trianglesNormals[row+col+5],
		trianglesNormals[row+col+6], trianglesNormals[row+col+7],
	];
}

function getAroundDiagonal(i, j, trianglesNormals, width) {
	const row = Math.floor(i/2) * 8 * width;
	const col = Math.floor(j/2) * 8;
	return [
		trianglesNormals[row+col], trianglesNormals[row+col+7],
		trianglesNormals[row+col-7], trianglesNormals[row+col-6],
		trianglesNormals[row+col-8*width+6], trianglesNormals[row+col-8*width+5],
		trianglesNormals[row+col-8*width-5], trianglesNormals[row+col-8*width-4],
	];
}

function getDiagonalTrimmed(i, j, trianglesNormals, width, [frow, lrow, fcol, lcol]) {
	const row = Math.floor(i/2) * 8 * width;
	const col = Math.floor(j/2) * 8;
	let normals = [];
	if (!lrow) {
		if (!lcol) normals = [...normals, trianglesNormals[row+col], trianglesNormals[row+col+7]];
		if (!fcol) normals = [...normals, trianglesNormals[row+col-7], trianglesNormals[row+col-6]];
	}
	if (!frow) {
		if (!lcol) normals = [...normals, trianglesNormals[row+col-8*width+6], trianglesNormals[row+col-8*width+5]];
		if (!fcol) normals = [...normals, trianglesNormals[row+col-8*width-5], trianglesNormals[row+col-8*width-4]];
	}
	return normals;
}

function getVerticalTrimmed(i, j, trianglesNormals, width, top) {
	const row = Math.floor(i/2) * 8 * width;
	const col = Math.floor(j/2) * 8;
	if (top) return [trianglesNormals[row+col-8*width+4], trianglesNormals[row+col-8*width+5]];
	else return [trianglesNormals[row+col], trianglesNormals[row+col+1]];

}

function getHorizontalTrimmed(i, j, trianglesNormals, width, left) {
	const row = Math.floor(i/2) * 8 * width;
	const col = Math.floor(j/2) * 8;
	if (left) return [trianglesNormals[row+col-6], trianglesNormals[row+col-5]];
	else return [trianglesNormals[row+col+6], trianglesNormals[row+col+7]];
}

function getAroundVertical(i, j, trianglesNormals, width) {
	const row = Math.floor(i/2) * 8 * width;
	const col = Math.floor(j/2) * 8;
	return [
		trianglesNormals[row+col], trianglesNormals[row+col+1],
		trianglesNormals[row+col-8*width+4], trianglesNormals[row+col-8*width+5]
	];
}

function getAroundHorizontal(i, j, trianglesNormals, width) {
	const row = Math.floor(i/2) * 8 * width;
	const col = Math.floor(j/2) * 8;
	return [
		trianglesNormals[row+col+6], trianglesNormals[row+col+7],
		trianglesNormals[row+col-6], trianglesNormals[row+col-5]
	];
}
