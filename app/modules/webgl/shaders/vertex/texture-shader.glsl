attribute vec3 position;
attribute vec3 normal;
attribute vec2 texCoords;

uniform mat4 M;
uniform mat4 V;
uniform mat4 P;
uniform mat4 normalMatrix;

varying highp vec3 fnormal;
varying highp vec2 ftexCoords;



void main(void) {
	fnormal = normal;
	ftexCoords = texCoords;
	gl_Position = P * V * M * vec4(position, 1.0);
}
