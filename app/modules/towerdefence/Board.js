import LandCluster from "../webgl/actors/LandCluster";
import Cube from "../webgl/actors/Cube";

export default class Board {
	constructor(fields) {
		this.fields = fields;
	}
	get3DRepresentation() {
		const result = [];
		return new LandCluster(this.fields.heights, this.fields.field_types);
	}
}
