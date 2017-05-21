attribute vec3 position;
attribute vec3 normal;
attribute vec4 color;

uniform mat4 M;
uniform mat4 V;
uniform mat4 P;
uniform mat4 normalMatrix;

varying lowp vec4 fcolor;
varying lowp vec3 fnormal;


void main(void) {

	gl_Position = P * V * M * vec4(position, 1.0);
	fnormal = (normalMatrix*vec4(normal, 1.0)).xyz;
	fcolor = color;
}
