export default class Scene {
	constructor(actors) {
		this.actors = actors ? [...actors] : [];
		this.light = null;

	}
	add(actor) {
		this.actors = [ ...this.actors, actor ];
	}
	addAll(actors) {
		this.actors = [ ...this.actors, ...actors ];
	}
	removeAll(actors) {
		this.actors = this.actors.filter(a => !actors.includes(a));
	}
}
