export default class GameObject {
	get3DRepresentation() {
		if (!this.model) {
			this.model = this.generateModel();
			this._moved = true;
		}
		return this.model;
	}
}
