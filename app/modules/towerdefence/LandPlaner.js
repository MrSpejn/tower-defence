const GRASS = 0;
const DIRT = 4;
const ROCK = 5;
const SNOW = 6;

export default class LandPlaner {
	constructor(fields, board) {
		this.fields = fields;
		this.board = board;
		this.turrets = this.fields.heights.map(row => row.map(cell => {
			return false;
		}));
	}
	getHeightAt(i,j) {
		return this.board.getWebGLRepresentation().getHeights(i,j);
	}
	setOn(i,j,size) {
		const top = i - Math.floor((size-1)/2);
		const bot = i + Math.ceil((size-1)/2);
		const left = j - Math.floor((size-1)/2);
		const right = j + Math.ceil((size-1)/2);

		for (let row = top; row <= bot; row++) {
			for (let col = left; col <= right; col++) {
				this.turrets[row][col] = true;
			}
		}
	}
	unsetOn(i,j,size) {
		const top = i - Math.floor((size-1)/2);
		const bot = i + Math.ceil((size-1)/2);
		const left = j - Math.floor((size-1)/2);
		const right = j + Math.ceil((size-1)/2);

		for (let row = top; row <= bot; row++) {
			for (let col = left; col <= right; col++) {
				this.turrets[row][col] = false;
			}
		}
	}
	getBuildFields(i,j,size) {
		const top = i - Math.floor((size-1)/2);
		const bot = i + Math.ceil((size-1)/2);
		const left = j - Math.floor((size-1)/2);
		const right = j + Math.ceil((size-1)/2);
		const boardModel = this.board.getWebGLRepresentation();


		const topn = top < 0 ? 0 : top;
		const botn = bot > 49 ? 49 : bot;
		const leftn = left < 0 ? 0 : left;
		const rightn = right > 49 ? 49 : right;

		const fields = [];
		for (let row = top; row <= bot; row++) {
			for (let col = left; col <= right; col++) {
				const heights = boardModel.getHeights(row, col);
				const type = this.fields.types[row][col];
				fields.push({
					i:row,
					j:col,
					valid: heights.maxZ === heights.minZ && type === GRASS && !this.turrets[row][col]
				});
			}
		}
		return fields;
	}
}
