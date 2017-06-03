import Actor from "../actors/Actor";

export default class Scene {
	constructor(actors) {
		this.actors = actors ? [...actors] : [];
		this.light = null;

	}
	add(actor) {
		if (!(actor instanceof Actor)) throw `Object ${actor} in not an instance of Actor`;
		this.actors = [ ...this.actors, actor ];
	}
	addAll(actors) {
		this.actors = [ ...this.actors, ...actors ];
	}
	removeAll(actors) {
		this.actors = this.actors.filter(a => !actors.includes(a));
	}
	remove(actor) {
		this.actors = this.actors.filter(a => a != actor);
	}
}
