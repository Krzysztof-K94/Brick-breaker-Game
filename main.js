import {GAMESTATE, Game} from './game.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

let lastTime = 0;

const game = new Game(canvas);


const gameLoop = (timestemp) => {
    let deltaTime = timestemp - lastTime;
    lastTime = timestemp;

    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
    game.draw(ctx);
    game.update(deltaTime);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);