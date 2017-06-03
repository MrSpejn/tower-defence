import LandCluster from "../../webgl/actors/LandCluster";

export default class SideLine {
	constructor(fields) {
		this.fields = fields;
		this.coordinates = { x:25*50, y:58*25, z:0, rx:0,ry:0,rz:0 };
	}
	getWebGLRepresentation() {
		if (!this.model) {
			this.model = new LandCluster(
				replicate(this.fields.heights[0], 4),
				replicate(this.fields.types[0], 4), 50, 0, -150, "textures.jpg");
			this.model.coordinates = this.coordinates;
		}

		return this.model;
	}

}

function replicate(row, n) {
	const result = [];
	result.push(row);
	for (let i = 1; i < n; i++) {
		result.push([...row]);
	}
	return result;
}
