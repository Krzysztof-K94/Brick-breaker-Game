import { collisionDetection } from "./colisiondetection.js";
import {createImage, controlSpeedChange} from "./changeSpeed.js";
const scoreEl = document.getElementById('score');

export default class Brick {
    constructor(game, position, type){
        this.image = createImage(`./images/brick${type}.png`);
        this.width = 102.4;
        this.height = 40;
        this.position = position;
        this.game = game;
        this.markedForDeletion = false;
        this.type = type;
        this.live = 2;
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update(ctx){
        if(collisionDetection(this.game.ball, this)) {
                controlSpeedChange(this.game)
                this.live--;

                if(this.live === 1) this.image = createImage(`./images/brick${this.type}-break.png`);
                if(this.live === 0) {
                    this.markedForDeletion = true;
                    let brickScore;
                    switch(this.type) {
                        case 1: brickScore = 150;
                            break;
                        case 2: brickScore = 200;
                            break;
                        case 3: brickScore = 250;
                            break;
                        case 4: brickScore = 300;
                            break;
                    }
                    scoreEl.innerHTML = this.game.score += brickScore;
                }
        }
    }
}