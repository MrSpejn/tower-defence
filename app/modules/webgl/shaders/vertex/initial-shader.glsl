attribute vec3 position;
attribute vec4 color;

uniform mat4 M;
uniform mat4 V;
uniform mat4 P;

varying lowp vec4 vcolor;

void main(void) {
	gl_Position = P * V * M * vec4(position, 1.0);
	vcolor = color;
}
