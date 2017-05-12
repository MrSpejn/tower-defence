export default function Scene() {
	this.actors = [];
	this.light = null;
}

Scene.prototype.add = function (actor) {
	this.actors = [ ...this.actors, actor ];
};
