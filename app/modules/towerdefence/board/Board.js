import LandCluster from "../../webgl/actors/LandCluster";

export default class Board {
	constructor(fields) {
		this.fields = fields;
		this.coordinates = { x:25*50, y:58*25, z:0, rx:0,ry:0,rz:0 };
	}
	getWebGLRepresentation() {
		if (!this.model) {
			this.model = new LandCluster(this.fields.heights, this.fields.types, 50, 0, 0, "textures.jpg");
			this.model.coordinates = this.coordinates;
		}

		return this.model;
	}
}


// this.body = new Cannon.Body({
// 	mass: 0,
// 	shape: new Cannon.Trimesh(this.boardModel.vertices.map((v, i) => {
// 		switch (i % 3) {
// 		case 0: return revertX(v);
// 		case 1:	return revertY(v);
// 		case 2: return v * 25;
// 		}
// 	}), this.boardModel.indices),
// 	position: new Cannon.Vec3(0,0,-2),
// 	material: new Cannon.Material({ friction: 0, restitution: 0 }),
// 	collisionFilterGroup: 2,
// 	collisionFilterMask: 0
// });

// function landToTriMesh(vertices) {
// 	const indices = [[0, 1, 4],[1, 2, 4], [2,5,4], [5,8,4], [8, 7, 4], [7, 6, 4], [6, 3, 4], [3, 0, 4]];
// 	const coords = unnest1(vertices.map(xyz => [xyz[0]*50,xyz[1]*50,xyz[2]*25]));
// 	return new Cannon.Trimesh(coords, unnest1(indices));
// }
//
// function unnest1(nested) {
// 	return nested.reduce((list, sublist) => [...list, ...sublist], []);
// }
