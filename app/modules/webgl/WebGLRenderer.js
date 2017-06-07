import { PerspectiveCamera } from "./camera/camera";
import Scene from "./scene/Scene";
import Renderer from "./renderer/Renderer";
import Publisher from "../utils/Publisher";
import { $V } from "../math/sylvester";

export default
@Publisher(["click", "hover"])
class WebGLRenderer {
	constructor(canvas) {
		this.scene = new Scene([]);
		this.camera = new PerspectiveCamera(canvas.width/canvas.height, -Math.PI /6, 100);
		this.renderer = new Renderer(canvas);
	}

	add(toAdd) {
		if (toAdd instanceof Array) this.scene.addAll(toAdd);
		else this.scene.add(toAdd);
	}

	remove(toRemove) {
		if (toRemove instanceof Array) this.scene.removeAll(toRemove);
		else this.scene.remove(toRemove);
	}

	render() {
		this.scene.actors.forEach(actor => {
			actor.translateXYZ(to3DCoordsX(actor.coordinates.x), to3DCoordsY(actor.coordinates.y), actor.coordinates.z/25);
			if (!actor.quaternions) {
				actor.rotateXYZ(actor.coordinates.rx, actor.coordinates.ry, actor.coordinates.rz);
			} else {
				actor.rotation = actor.coordinates.rotation;
				actor.rotation[2] = -1*actor.rotation[2];
			}

		});
		this.renderer.render(this.scene, this.camera);
	}
}

function to3DCoordsX(x) {
	return (x / 25) - 50;
}
function to3DCoordsY(y) {
	return 58 - (y / 25);
}
