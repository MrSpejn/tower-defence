import Scene from "./webgl/scene/Scene";
import Renderer from "./webgl/renderer/Renderer";
import { PerspectiveCamera } from "./webgl/camera/camera";
import { StandardLight } from "./webgl/light/light";
import Cube from "./webgl/actors/Cube";
import Plain from "./webgl/actors/Plain";


export default function Game(canvas) {
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;

	const renderer = new Renderer(canvas);
	const scene = new Scene();
	const camera = new PerspectiveCamera(width/height);
	//const light = new StandardLight();
	const cube = new Cube();
	scene.add(cube);
	//scene.add(light);

	renderer.render(scene, camera);
}
