import "./main.scss";
import GameEngine from "./modules/GameEngine";

const canvas = document.querySelector("#plain");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
const ge = new GameEngine(canvas);
ge.start();
