attribute vec3 position;
attribute vec3 normal;
attribute vec4 color;

uniform mat4 M;
uniform mat4 V;
uniform mat4 P;
uniform mat4 normalMatrix;

varying lowp vec4 vcolor;
varying lowp vec3 vlight;


void main(void) {
	vec3 directionalVector = normalize(vec3(1, 0.5, 0.5));

	gl_Position = P * V * M * vec4(position, 1.0);
	vec4 transformedNormal = normalMatrix*vec4(normal, 1.0);
	float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);

	vlight.r = min(0.5+1.0*directional/2.0, 1.0);
	vlight.g = min(0.5+1.0*directional/2.0, 1.0);
	vlight.b = min(0.5+1.0*directional/2.0, 1.0);

	vcolor = color;
}
