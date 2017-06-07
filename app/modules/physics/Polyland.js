import { $V } from "../math/sylvester";

class Polyland {
	constructor(rows, cols, triangles) {
		this.tiles = [];
		for (let i = 0; i < rows; i++) {
			this.tiles[i] = [];
			for (let j = 0; j < cols; j++) {
				const tile = {
					triangles: [],
					maxZ: triangles[(i*cols+j)*8].maxZ,
					minZ: triangles[(i*cols+j)*8].minZ,
				};
				let sum = 0;
				const used = (i*cols+j)*8;
				for (let k = 0; k < 8; k++) {
					const idx = used + k;
					tile.triangles.push(triangles[idx]);

					sum += triangles[idx].avgZ;
					if (triangles[idx].maxZ > tile.maxZ) {
						tile.maxZ = triangles[idx].maxZ;
					} else if (triangles[idx].minZ < tile.minZ) {
						tile.minZ = triangles[idx].minZ;
					}
				}
				tile.avgZ = sum / 8;
				this.tiles[i][j] = tile;
			}
		}
	}
	linePassesThrought(start, end, direction) {
		const s2D = $V([ start.elements.slice(0,2) ]);
		const e2D = $V([ end.elements.slice(0, 2) ]);
		const sx = Math.floor(start.elements[0]/50+0.5);
		const sy = Math.floor(start.elements[1]/50+0.5);
		const ex = Math.floor(end.elements[0]/50+0.5);
		const ey = Math.floor(end.elements[1]/50+0.5);

		const width = Math.abs(ex - sx);
		const height = Math.abs(ey - sy);

		const rwidth = start.elements[0] - end.elements[0];
		const rheight = start.elements[1] - end.elements[1];

		const a = rheight / rwidth;
		const b = start.elements[1] - start.elements[0]*a;

		const miny = sy > ey ? ey : sy;
		const minx = sx > ex ? ex : sx;

		const line = x => a*x + b;

		const tilesOfInterest = [];

		if (width == 0) {
			for (let i = miny; i <= miny + height; i++) {
				tilesOfInterest.push({ tile: this.tiles[i][sx], i:i, j:sx });
			}
		} else {
			for (let i = miny; i <= miny + height; i++) {
				for (let j = minx; j <= minx + width; j++) {
					const y1 = (i*50-25);
					const x1 = (j*50-25);
					const y2 = (i*50+25);
					const x2 = (j*50+25);

					const lx1 = line(x1);
					const lx2 = line(x2);

					if ((lx2 <= y2 && lx2 >= y1) || (lx1 <= y2 && lx1 >= y1) || (lx2 >= y2 && lx1 <= y1) || (lx1 >= y2 && lx2 <= y1)) {
						tilesOfInterest.push({ tile: this.tiles[i][j], i, j });
					}
				}
			}
		}
		const az = (start.elements[2] - end.elements[2]) / rwidth;
		const bz = start.elements[2] - az*start.elements[0];


		const intersected = tilesOfInterest.filter(({ tile, j, i }) => {
			const x1 = (j*50-25);
			const x2 = (j*50+25);
			const z1 = x1*az+bz;
			const z2 = x2*az+bz;

			return (z2 <= tile.maxZ && z2 >= tile.minZ) ||
			(z1 <= tile.maxZ && z1 >= tile.minZ) ||
			(z2 >= tile.maxZ && z1 <= tile.minZ) ||
			(z1 >= tile.maxZ && z2 <= tile.minZ);
		});

		return intersected.length > 0;
	}
}

class Triangle {
	constructor(p1, p2, p3) {
		this.p1 = $V(p1);
		this.p2 = $V(p2);
		this.p3 = $V(p3);

		this.minZ = p1[2];
		this.maxZ = p1[2];
		this.avgZ = (p1[2]+p2[2]+p3[2])/3;
		[p2,p3].forEach(p => {
			if (p[2] > this.maxZ) this.maxZ = p[2];
			else if (p[2] < this.minZ) this.minZ = p[2];
		});
	}
	linePassesThrought(point, direction) {
		const edge1 = this.p2.subtract(this.p1);
		const edge2 = this.p3.subtract(this.p1);

		const p_vec = direction.cross(edge2);
		const determinant = edge1.dot(p_vec);
		if (determinant < -0.01 || determinant > 0.01) return false;
		const inverse = 1 / determinant;

		const t_vec = point.subtract(this.p1);

		const u = t_vec.dot(p_vec) * inverse;
		if (u < 0 || u > 1) return false;

		const q_vec = t_vec.cross(edge1);
		const v = direction.dot(q_vec);
		if (v < 0 || v + u > 1) return false;
		return true;
	}
}



export function polylandFromModel(model, { translateX, translateY, translateZ }) {
	const triangles = model.triangles.map(([p1, p2, p3]) => {
		const point1 = [translateX(p1[0]),translateY(p1[1]),translateZ(p1[2])];
		const point2 = [translateX(p2[0]),translateY(p2[1]),translateZ(p2[2])];
		const point3 = [translateX(p3[0]),translateY(p3[1]),translateZ(p3[2])];
		return new Triangle(point1, point2, point3);
	});
	return new Polyland(model.rows, model.cols, triangles);
}
