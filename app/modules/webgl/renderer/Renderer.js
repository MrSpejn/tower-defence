import { initializeShaders, attachToAttribute } from "../shaders/shaders";
import { Matrix, $V } from "../../math/sylvester";
export default class Renderer {
	constructor(canvas) {
		this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		if (!this.gl) throw "No WebGL support";

		this.gl.viewport(0, 0, canvas.width, canvas.height);
		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.shaders = initializeShaders(this.gl);
		this.shader = null;
		this.attributes = null;
		this.buffers = {};
		this.textures = {};
	}

	render(scene, camera) {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		scene.actors.forEach(actor => this.renderActor(actor, camera.getV(), camera.getP()));
	}

	renderActor(actor, V, P) {
		if (actor.hasTexture) {
			this.shader = this.shaders["texture"][0];
			this.attributes = this.shaders["texture"][1];
			this.gl.useProgram(this.shader);

			if (!this.textures[actor.texture]) {
				this.textures[actor.texture] = initializeTexture(this.gl, actor.texture);
			}

			this.gl.activeTexture(this.gl.TEXTURE0);
			this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[actor.texture]);
			this.gl.uniform1i(this.gl.getUniformLocation(this.shader, "uSampler"), 0);

			if (!this.buffers[actor.texCoordBuffer]) {
				this.buffers[actor.texCoordBuffer] = createBuffer(this.gl, actor.texCoordArray);
			}
			attachToAttribute(this.gl, this.buffers[actor.texCoordBuffer], this.attributes["texCoords"], 2);

		} else {
			this.shader = this.shaders["default"][0];
			this.attributes = this.shaders["default"][1];
			this.gl.useProgram(this.shader);

			if (!this.buffers[actor.colorBuffer]) {
				this.buffers[actor.colorBuffer] = createBuffer(this.gl, actor.colorArray);
			}

			attachToAttribute(this.gl, this.buffers[actor.colorBuffer], this.attributes["color"], 4);
		}

		const uP = this.gl.getUniformLocation(this.shader, "P");
		const uV = this.gl.getUniformLocation(this.shader, "V");

		this.gl.uniformMatrix4fv(uP, false, new Float32Array(P.ensure4x4().flatten()));
		this.gl.uniformMatrix4fv(uV, false, new Float32Array(V.ensure4x4().flatten()));

		if (!this.buffers[actor.positionBuffer]) {
			this.buffers[actor.positionBuffer] = createBuffer(this.gl, actor.positionArray);
		}

		attachToAttribute(this.gl, this.buffers[actor.positionBuffer], this.attributes["position"], 3);

		if (!this.buffers[actor.normalsBuffer]) {
			this.buffers[actor.normalsBuffer] = createBuffer(this.gl, actor.normalsArray);
		}

		attachToAttribute(this.gl, this.buffers[actor.normalsBuffer], this.attributes["normal"], 3);



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

function initializeTexture(gl, textureName) {
	const texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);
	const image = document.querySelector(`#${textureName.split(".")[0]}`);
	if (!(image instanceof Image) && !image.complete && image.naturalHeight === 0) {
		throw "Image not loaded";
	}
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);
	return texture;
}
