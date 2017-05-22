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

		const { shader1, attributes1 } = initializeShader(this.gl, "color-shader");
		const { shader2, attributes2 } = initializeShader(this.gl, "texture-shader");

		this.shaders = {
			"color-shader": [shader1, attributes1],
			"texture-shader": [shader2, attributes2]
		};
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
			this.shader = this.shaders["texture-shader"][0];
			this.attributes = this.shaders["texture-shader"][1];
			gl.useProgram(this.shader);

			if (!this.texture[actor.texture]) {
				this.texture[actor.texture] = initializeTexture(this.gl, actor.texture);
			}

			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, this.texture[actor.texture]);
			gl.uniform1i(gl.getUniformLocation(this.shader, 'uSampler'), 0);

			if (!this.texture[this.texCoordBuffer]) {
				this.texture[this.texCoordBuffer] = createBuffer(this.gl, actor.texCoordArray);
			}
			attachToAttribute(this.gl, this.buffers[actor.positionBuffer], this.attributes["texCoords"], 2);

		} else {
			this.shader = this.shaders["color-shader"][0];
			this.attributes = this.shaders["color-shader"][1];
			gl.useProgram(this.shader);

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

function initializeTexture(gl, textureName) {
	const texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.querySelector(`#${textureName.split('.')[0]}`));
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);
	return texture;
}
