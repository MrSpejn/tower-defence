import Actor from "./Actor";
import { Matrix, $V } from "../../math/sylvester";

export default class Land extends Actor {
	constructor(heights = [0,0,0,0,0,0,0,0,0], color = 0xffffffff, x, y) {
		super();
		color = convertHexToWebGL(color);
		this.positionBuffer = `land_position_buffer#${heights.join(",")}`;
		this.colorBuffer = `land_color_buffer#${color.join(",")}`;
		this.normalsBuffer = `land_normals_buffer#${heights.join(",")}`;
		this.vertices = [[1, 1],[0, 1],[1, 1],[1, 0],[0, 0],[1,0],[1, 1],[0, 1],[1, 1]].map((xy, i) => xy.push(heights[i]));
		this.x = x;
		this.y = y;

		const triangles = generatePositionArray(heights, x, y);
		this.positionArray = unnest(triangles);
		this.colorArray = getCubeColorArray(color, 24);
		this.normalsArray = generateNormalsArray(triangles);
		this.vertexCount = 24;
	}
}


function generatePositionArray(heights, x, y) {
	const xy = [[x-1, y+1],[x, y+1],[x+1, y+1],[x-1, y],[x, y],[x+1, y],[x-1, y-1],[x, y-1],[x+1, y-1]];
	const xyz = xy.map((c, i) => [...c, heights[i]]);
	const indices = [[0, 1, 4],[1, 2, 4], [2,5,4], [5,8,4], [8, 7, 4], [7, 6, 4], [6, 3, 4], [3, 0, 4]];
	return indices.map(triangle => triangle.map(idx => xyz[idx]));
}

function generateNormalsArray(triangles) {
	const normals = triangles.reduce((normals, triangle) => {
		const normal = getNormalForTriangle(triangle);
		if (normal.elements[2] < 0) {
			normal.elements = normal.elements.map(i => i === 0 || i === -0 ? 0 : -i);
		} else {
			normal.elements = normal.elements.map(i => i === -0 ? 0 : i);
		}
		return [...normals, normal.elements, normal.elements, normal.elements];
	}, []);
	const verticesIndices = [[0,22],[1,3],[4,6],[19,21],[2,5,8,11,14,17,20,23],[7,9],[16,18],[13,15],[10,12]];
	const vertexNormals = verticesIndices.map((indices) => {
		return indices.map(i => normals[i]).reduce((sum, vnormal) => sum.add(vnormal), $V([0,0,0])).toUnitVector().elements;
	});
	const indices = [[0, 1, 4],[1, 2, 4], [2,5,4], [5,8,4], [8, 7, 4], [7, 6, 4], [6, 3, 4], [3, 0, 4]];
	return unnest(indices.map(triangle => triangle.map(idx => vertexNormals[idx])));
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

function group(list, size) {
	return list.reduce((p, c, idx) => {
		if (idx % size === 0) return [...p, [c]];
		return [...p.slice(0, p.length - 1), [ ...p[p.length-1], c] ];
	}, []);
}

function unnest(list) {
	return list.reduce((prev, curr) => {
		return [ ...prev, ...curr.reduce((p,i) => [...p, ...i], [])];
	}, []);
}

function getNormalForTriangle(triangle) {
	const p1 = $V(triangle[0]), p2 = $V(triangle[1]), p3 = $V(triangle[2]);
	const v1 = p2.subtract(p1), v2 = p3.subtract(p1);
	return v1.cross(v2);
}
