import Publisher from "./utils/Publisher";
import WebGLRenderer from "./webgl/WebGLRenderer";


export default
@Publisher(["click", "hover"])
class Display {
	constructor(type, ...args) {
		switch (type) {
		case "WebGL": this.renderer = new WebGLRenderer(args[0]); break;
		default: throw `Type ${type} is not supported by display`;
		}

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
