import Publisher from "./utils/Publisher";
import WebGLRenderer from "./webgl/WebGLRenderer";


export default
@Publisher(["click", "hover", "unhover"])
class Display {
	constructor(type, ...args) {
		switch (type) {
		case "WebGL": this.renderer = new WebGLRenderer(args[0]); break;
		default: throw `Type ${type} is not supported by display`;
		}
		this.renderer.on("hover", el => this.dispatch("hover", el));
		this.renderer.on("unhover", el => this.dispatch("unhover", el));
		this.renderer.on("click", el => this.dispatch("click", el));

	}
	setHoverObject(objects) {
		this.renderer.setHoverObject(objects);
	}
	deleteHoverObject() {
		this.renderer.deleteHoverObject();
	}
	update(timeDelta) {
		this.renderer.render(timeDelta);
	}
	addObjects(objects) {
		if (!objects) return;
		this.renderer.add(objects);
	}
	removeObjects(objects) {
		if (!objects) return;
		this.renderer.remove(objects);
	}
};
