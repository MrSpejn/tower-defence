precision highp float;
varying lowp vec4 fcolor;
varying lowp vec3 fnormal;

void main(void) {
	vec3 directionalVector = normalize(vec3(1, 0.5, 0.5));
	float directional = max(dot(normalize(fnormal), directionalVector), 0.0);

	vec3 vlight = vec3(0,0,0);
	vlight.r = min(0.5+1.0*directional/2.0, 1.0);
	vlight.g = min(0.5+1.0*directional/2.0, 1.0);
	vlight.b = min(0.5+1.0*directional/2.0, 1.0);
	gl_FragColor = vec4(fcolor.rgb * vlight, fcolor.a);
}
