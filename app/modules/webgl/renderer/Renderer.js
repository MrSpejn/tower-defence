import { initializeShader, attachToAttribute } from "../shaders/shaders";
import { Matrix, $V } from "../../math/sylvester";
export default class Renderer {
	constructor(canvas) {
		this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		if (!this.gl) throw "No WebGL support";

		this.gl.viewport(0, 0, canvas.width, canvas.height);
		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);

		const { shader, attributes } = initializeShader(this.gl);

		this.shader = shader;
		this.attributes = attributes;
		this.buffers = {};
	}

	render(scene, camera) {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		const uP = this.gl.getUniformLocation(this.shader, "P");
		const uV = this.gl.getUniformLocation(this.shader, "V");

		this.gl.uniformMatrix4fv(uP, false, new Float32Array(camera.getP().ensure4x4().flatten()));
		this.gl.uniformMatrix4fv(uV, false, new Float32Array(camera.getV().ensure4x4().flatten()));

		scene.actors.forEach(actor => this.renderActor(actor, camera.getV()));
	}

	renderActor(actor, V) {
		if (!this.buffers[actor.positionBuffer]) {
			this.buffers[actor.positionBuffer] = createBuffer(this.gl, actor.positionArray);
		}

		attachToAttribute(this.gl, this.buffers[actor.positionBuffer], this.attributes["position"], 3);

		if (!this.buffers[actor.normalsBuffer]) {
			this.buffers[actor.normalsBuffer] = createBuffer(this.gl, actor.normalsArray);
		}

		attachToAttribute(this.gl, this.buffers[actor.normalsBuffer], this.attributes["normal"], 3);

		if (!this.buffers[actor.colorBuffer]) {
			this.buffers[actor.colorBuffer] = createBuffer(this.gl, actor.colorArray);
		}

		attachToAttribute(this.gl, this.buffers[actor.colorBuffer], this.attributes["color"], 4);

		const uM = this.gl.getUniformLocation(this.shader, "M");
		this.gl.uniformMatrix4fv(uM, false, new Float32Array(actor.getM().ensure4x4().flatten()));

		const uNorm = this.gl.getUniformLocation(this.shader, "normalMatrix");
		const normal = V.x(actor.getM()).inverse().transpose();
		this.gl.uniformMatrix4fv(uNorm, false, new Float32Array(normal.flatten()));

		this.gl.drawArrays(this.gl.TRIANGLES, 0, actor.vertexCount);

	}
}


function createBuffer(gl, data) {
	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
	return buffer;
}
