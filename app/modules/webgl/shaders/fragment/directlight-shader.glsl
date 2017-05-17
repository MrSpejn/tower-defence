varying lowp vec4 vcolor;
varying lowp vec3 vlight;

void main(void) {
	gl_FragColor = vec4(vcolor.rgb * vlight, vcolor.a);
}
