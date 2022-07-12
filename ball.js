import { collisionDetection } from './colisiondetection.js';
const livesEl = document.getElementById('lives');

export default class Ball {
    constructor(game){
        this.position = {
            x: 30,
            y: 250,
        }
        this.speed = {
            x: 9,
            y: 9
        }

        this.image = new Image();
        this.image.src = './images/ball-1.png';
        this.size = 20;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.reset();
    }

    reset() {
        this.position = {
            x: 30,
            y: 250,
        }
    }

    draw(ctx) {
            ctx.drawImage(this.image,this.position.x,this.position.y,this.size,this.size)
    }

    update(deltaTime) {
        this.position.x += (this.speed.x  * (deltaTime / 30));
        this.position.y += (this.speed.y  * (deltaTime / 30));

        //collision with player
        if(collisionDetection(this, this.game.player)){
            this.speed.y = -this.speed.y;
            this.position.y = this.game.player.position.y - this.size
        } 

        //Wall collision
        if(this.position.x + this.size >= this.gameWidth || this.position.x <= 0){
            this.speed.x = -this.speed.x;
        } 
        if(this.position.y <= 0) this.speed.y = -this.speed.y;
        if(this.position.y + this.size >= this.gameHeight) {
            this.game.lives--;
            livesEl.innerHTML = this.game.lives;
            this.reset();
        }
    }
}