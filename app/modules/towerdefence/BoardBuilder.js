import Board from "./board/Board";
import SideLine from "./board/SideLine";
import Mountains from "./board/Mountains";


class Background {
	constructor(elements) {
		this.elements = elements;
	}
	getWebGLRepresentation() {
		return this.elements.map(element => element.getWebGLRepresentation());
	}
}

export default class BoardBuilder {
	getEnv(fields) {
		return new Background([
			new SideLine(fields),
			new Mountains(52, 30, 50, { x: -5*50, y: 28*50 }),
			new Mountains(52, 30, 50, { x: 75*50, y: 28*50 })
		]);
	}

	build(fields) {
		return new Board(fields);
	}
}
