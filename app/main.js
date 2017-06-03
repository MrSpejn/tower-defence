import "./main.scss";
import map from "./maps/map";
import Game from "./modules/Game";

import Stage from "./modules/towerdefence/Stage";
import Physics from "./modules/physics/Physics";
import Controls from "./modules/Controls";
import Display from "./modules/Display";

const canvas = document.querySelector("#plain");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
const stage = new Stage(map);
const controls = new Controls();
const display = new Display("WebGL", canvas);
const physics = new Physics();

const game = new Game(stage, controls, physics, display);
game.start();
