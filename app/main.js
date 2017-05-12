import "./main.scss";
import Game from "./modules/game";

const canvas = document.querySelector("#plain");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
Game(canvas);
