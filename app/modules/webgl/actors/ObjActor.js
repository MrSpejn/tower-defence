import Actor from "./Actor";
import OBJ from "webgl-obj-loader";


const meshes = {};

export default class ObjActor extends Actor {
	constructor(filestring, id, texture, color = 0xffffffff) {
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
		this.normalsArray = mesh.vertexNormals;
		this.vertexCount = mesh.indices;
		this.indicesArray = mesh.indices;
		this.indicesBased = true;
		if (texture) {
			this.hasTexture = true;
			this.texCoordBuffer = `obj_texture_buffer${id}`;
			this.texture = texture;
			this.texCoordArray = mesh.textures;
		} else {
			this.colorArray = flatColorArray(mesh.vertices.length/3, color);
		}
	}
}

function flatColorArray(length, color) {
	const result = [];
	const c = [];
	for (let j = 0; j < 4; j++) {
		c[3-j] = ((color%0x100)/0xff);
		color = Math.floor(color/0x100);
	}
	for (let i = 0; i < length; i++) {
		for (let j = 0; j < 4; j++) {
			result.push(c[j]);
		}
	}
	return result;
}
