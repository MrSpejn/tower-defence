import Scene from "./webgl/scene/Scene";
import Renderer from "./webgl/renderer/Renderer";
import { PerspectiveCamera } from "./webgl/camera/camera";
import { StandardLight } from "./webgl/light/light";
import Cube from "./webgl/actors/Cube";
import Plain from "./webgl/actors/Plain";
import Map from "./map";

export default function Game(canvas) {
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;

	const renderer = new Renderer(canvas);
	const scene = new Scene();
	const camera = new PerspectiveCamera(width/height, -Math.PI / 6, 105);

	const turret = new Cube(0x0000ffff);
	turret.scaleZ(5);
	turret.translate(-12, 24, 4);
	scene.add(turret);

	const turret2 = new Cube(0x0000ffff);
	turret2.scaleZ(5);
	turret2.translate(2, 36, 4);
	scene.add(turret2);

	const minion = new Cube(0xff0000ff);
	minion.translate(-28, 60, 2);
	scene.add(minion);

	const minion2 = new Cube(0xff0000ff);
	minion2.translate(-26, 54, 2);
	scene.add(minion2);

	const bg = new Cube(0x937b6fff);
	bg.scaleY(80);
	bg.scaleX(120);
	bg.scaleZ(0.25);
	bg.translateY(12);
	bg.translateZ(-0.001);
	scene.add(bg);

	Map.field_types.forEach((row, i) => row.forEach((type, j) => {
		const r = type === 0 ? 0x32c15f : 0xfafdc4;
		const c = new Cube(r * 0x100 + 0xff);
		c.translate(2*j - 50,  50 - 2*i + 12, 0);
		scene.add(c);
	}));

	renderer.render(scene, camera);
}
