export default class Scene {
	constructor() {
		this.actors = [];
		this.light = null;
	}
	add(actor) {
		this.actors = [ ...this.actors, actor ];
	}
}
