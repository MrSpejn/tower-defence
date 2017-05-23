import colorFragmentShader from "./fragment/directlight-shader.glsl";
import colorVertexShader from "./vertex/directlight-shader.glsl";

import texFragmentShader from "./fragment/texture-shader.glsl";
import texVertexShader from "./vertex/texture-shader.glsl";

export function attachToAttribute(gl, buffer, attribute, size) {
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.vertexAttribPointer(attribute, size, gl.FLOAT, false, 0, 0);
}


export function initializeShaders(gl) {
	return {
		"texture": initializeShader(gl, texVertexShader, texFragmentShader, true),
		"default": initializeShader(gl, colorVertexShader, colorFragmentShader, false)
	};
}

export function initializeShader(gl, vertexShader, fragmentShader, hasTexture) {
	const shader = gl.createProgram();
	gl.attachShader(shader, createShader(gl, vertexShader, gl.VERTEX_SHADER));
	gl.attachShader(shader, createShader(gl, fragmentShader, gl.FRAGMENT_SHADER));
	gl.linkProgram(shader);

	if (!gl.getProgramParameter(shader, gl.LINK_STATUS)) {
		console.log("Unable to initialize the shader program: " + gl.getProgramInfoLog(shader));
	}

	const position = gl.getAttribLocation(shader, "position");
	gl.enableVertexAttribArray(position);

	const normal = gl.getAttribLocation(shader, "normal");
	gl.enableVertexAttribArray(normal);

	if (hasTexture) {
		const texCoords = gl.getAttribLocation(shader, "texCoords");
		gl.enableVertexAttribArray(texCoords);
		return [ shader, { position, normal, texCoords }];
	} else {
		const color = gl.getAttribLocation(shader, "color");
		gl.enableVertexAttribArray(color);

		return [ shader, { position, color, normal }];

	}
}

function createShader(gl, source, type) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.log("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
		throw "Unable to create shader";
	}
	return shader;
}
