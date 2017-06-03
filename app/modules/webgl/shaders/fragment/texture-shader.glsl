precision highp float;
varying highp vec3 fnormal;
varying highp vec2 ftexCoords;
uniform sampler2D uSampler;

void main(void) {
	vec3 directionalVector = normalize(vec3(1, 0.5, 0.5));
	float directional = max(dot(normalize(fnormal), directionalVector), 0.0);

	vec3 vlight = vec3(0,0,0);
	vec4 color = texture2D(uSampler, vec2(ftexCoords.s, ftexCoords.t));

	vlight.r = min(0.6+1.0*directional/1.5, 1.0);
	vlight.g = min(0.6+1.0*directional/1.5, 1.0);
	vlight.b = min(0.6+1.0*directional/1.5, 1.0);

	gl_FragColor = vec4(color.rgb*vlight,color.a);
}
