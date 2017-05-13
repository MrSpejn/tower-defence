import Renderer from "./webgl/renderer/Renderer";
import Game from "./Game";

export default class GameEngine {
	constructor(canvas) {
		this.renderer = new Renderer(canvas);
		this.game = new Game(canvas.width, canvas.height);
	}
	start() {
		const loop = timeSince => {
			const n = Date.now();
			requestAnimationFrame(loop.bind(null, n));
			this.renderGame(n - timeSince);
		};
		loop(Date.now());

	}
	renderGame(timeDelta) {
		this.game.update(timeDelta);
		const scene = this.game.getScene();
		const camera = this.game.getCamera();

		this.renderer.render(scene, camera);
	}
}
