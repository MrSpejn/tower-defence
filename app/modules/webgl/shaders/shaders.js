import fragmentShader from "./fragment/initial-shader.glsl";
import vertexShader from "./vertex/initial-shader.glsl";

export function attachToAttribute(gl, buffer, attribute, size) {
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.vertexAttribPointer(attribute, size, gl.FLOAT, false, 0, 0);
}

export function initializeShader(gl) {
	const shader = gl.createProgram();
	gl.attachShader(shader, createShader(gl, vertexShader, gl.VERTEX_SHADER));
	gl.attachShader(shader, createShader(gl, fragmentShader, gl.FRAGMENT_SHADER));
	gl.linkProgram(shader);

	if (!gl.getProgramParameter(shader, gl.LINK_STATUS)) {
		console.log("Unable to initialize the shader program: " + gl.getProgramInfoLog(shader));
	}
	gl.useProgram(shader);
	const position = gl.getAttribLocation(shader, "position");
	gl.enableVertexAttribArray(position);

	return { shader, attributes: { position } };
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
