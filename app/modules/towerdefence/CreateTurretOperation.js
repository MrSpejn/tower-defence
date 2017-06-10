export default class CreateTurretOperation {
	constructor(stage, row, col, size) {
		this.stage = stage;
		this.row = row;
		this.col = col;
		this.size = size;
	}
	perform() {
		console.log("Performing creation at:", this.row, this.col);
		this.obj = this.stage.createObject({
			type: "TURRET",
			coordinates: {
				x: (this.col+0.5)*50,
				y: (this.row+0.5)*50,
				z: this.stage.landPlaner.getHeightAt(this.row, this.col).maxZ * 25
			}
		});
		this.stage.landPlaner.setOn(this.row,this.col,this.size);
	}
	revert() {
		console.log("Reverting creation at:", this.row, this.col);
		this.stage.landPlaner.unsetOn(this.row,this.col,this.size);
		this.stage.removeObject(this.obj);
	}
}
