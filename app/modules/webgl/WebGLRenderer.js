import { PerspectiveCamera } from "./camera/camera";
import Scene from "./scene/Scene";
import Renderer from "./renderer/Renderer";
import Publisher from "../utils/Publisher";
import { $V } from "../math/sylvester";

import _ from "lodash";

export default
@Publisher(["click", "hover", "unhover"])
class WebGLRenderer {
	constructor(canvas) {
		this.hover = null;
		this.scene = new Scene([]);
		this.camera = new PerspectiveCamera(canvas.width/canvas.height, -Math.PI/6, 100);
		this.renderer = new Renderer(canvas);

		document.addEventListener("mousemove", detectElementHover.bind(this));
		canvas.addEventListener("click", () => {
			if (this.hover) this.dispatch("click", this.hover);
		});
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
	setHoverObject(objects) {
		this.renderer.highlights = objects;
	}
	deleteHoverObject() {
		this.renderer.highlights = [];
	}
}

function detectElementHover(e) {
	const x = (e.clientX / window.innerWidth) * 2 - 1;
	const y = - (e.clientY / window.innerHeight) * 2 + 1;
	const V = this.camera.getV();
	const P = this.camera.getP();
	const _V = this.camera.getV().inverse();
	const _P = this.camera.getP().inverse();

	const center = $V([_V.elements[0][3], _V.elements[1][3], _V.elements[2][3]]);
	const unproject = _V.x(_P);
	const v4direction = unproject.x($V([x, y, 0.5, 1]));

	const v3direction = $V(v4direction.x(1/v4direction.elements[3]).elements.slice(0, 3))
	.subtract(center)
	.toUnitVector();


	const [a,b,c] = center.elements;
	const [dx,dy,dz] = v3direction.elements;

	const Y1 = -40.9;
	const k1 = (Y1-b)/dy;
	const start = [a+k1*dx, -40.9, c+k1*dz];

	const Y2 = 59;
	const k2 = (Y2-b)/dy;
	const endY = [a+k2*dx, 59, c+k2*dz];

	const X1 = -50.9;
	const k3 = (X1-a)/dx;
	const endX1 = [-50.9, b+k3*dy, c+k3*dz];

	const X2 = 49;
	const k4 = (X2-a)/dx;
	const endX2 = [49, b+k4*dy, c+k4*dz];
	const end = _.sortBy([endY, endX1, endX2], vec3 => -vec3[2]).filter(vec3 => vec3[2] < start[2])[0];

	const Board = this.scene.actors[0];

	const intersect = Board.intersect(start, end, v3direction.elements);
	if (intersect.length > 0) {
		this.hover = intersect[0];
		this.dispatch("unhover");
		this.dispatch("hover", intersect[0]);
	} else {
		this.dispatch("unhover");
	}
}

function to3DCoordsX(x) {
	return (x / 25) - 50;
}
function to3DCoordsY(y) {
	return 58 - (y / 25);
}
