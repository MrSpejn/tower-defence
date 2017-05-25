import Actor from "./Actor";
import OBJ from "webgl-obj-loader";


const meshes = {};

export default class ObjActor extends Actor {
	constructor(filestring, id, color = 0xffffffff) {
		super();
		if (!meshes[id]) {
			meshes[id] = new OBJ.Mesh(filestring);
		}
		const mesh = meshes[id];
		this.positionBuffer = `obj_position_buffer${id}`;
		this.normalsBuffer = `obj_normals_buffer${id}`;
		this.colorBuffer = `obj_color_buffer${id}`;
		this.indicesBuffer = `obj_indices_buffer${id}`;
		this.positionArray = mesh.vertices;
		this.colorArray = flatColorArray(mesh.vertices.length/3, color);
		this.normalsArray = mesh.vertexNormals;
		this.vertexCount = mesh.indices;
		this.indicesArray = mesh.indices;
		this.indicesBased = true;
		console.log(this.colorArray.length/4, this.positionArray.length/3, this.normalsArray.length/3);
	}
}

function flatColorArray(length, color) {
	const result = [];
	const c = [];
	for (let j = 0; j < 4; j++) {
		c[3-j] = ((color%0x100)/0xff);
		color = Math.floor(color/0x100);
	}
	console.log(c);
	for (let i = 0; i < length; i++) {
		for (let j = 0; j < 4; j++) {
			result.push(c[j]);
		}
	}
	return result;
}
