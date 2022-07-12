import Player from './player.js';
import InputHandler from './inputHandler.js';
import Ball from './ball.js';;
import {level1, level2, buildLevel} from './levels.js';

const livesEl = document.getElementById('lives');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');

export const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEXTLEVEL: 4,
}

export class Game {
    constructor(canvas){
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;
        this.gameState = GAMESTATE.MENU;
        this.gameBackground = new Image();
        this.gameBackground.src = './images/bgc.jpg';

        this.keys = {
            left: {
                pressed: false,
            },
            right: {
                pressed: false,
            },
            currentKey : 'right',
        };

        this.gameObjects = [];
        this.bricks = [];
        this.ball = new Ball(this);
        this.player = new Player(this);

        this.lives = 3;
        this.score = 0;

        this.levels = [level1, level2];
        this.currentLvl = 0;

        this.music = new Audio();
        this.music.src = './music/music.mp3';
        this.music.loop = true;

        let inputHandler = new InputHandler(this);
    }

    start(){
        console.log(this.ball.image)
        if(this.player.image && this.ball.image) {
            if(this.gameState !== GAMESTATE.MENU && this.gameState !== GAMESTATE.NEXTLEVEL && this.gameState !== GAMESTATE.GAMEOVER) return;
            this.music.play();
            //set default value and render on screen 
            if(this.gameState === GAMESTATE.GAMEOVER || this.gameState === GAMESTATE.MENU) {
                this.lives = 3;
                this.score = 0;
                this.currentLvl = 0;
                livesEl.innerHTML = this.lives;
            }
    
            levelEl.innerHTML = this.currentLvl + 1;
            
            this.bricks = buildLevel(this, this.levels[this.currentLvl]);
    
            this.gameObjects = [this.player, this.ball];
            this.ball.reset();
    
            this.gameState = GAMESTATE.RUNNING;
        }

    }

    update(deltaTime) {
        if(this.gameState === GAMESTATE.PAUSED ||
           this.gameState === GAMESTATE.MENU ||
           this.gameState === GAMESTATE.GAMEOVER) return;

        if(this.lives === 0) this.gameState = GAMESTATE.GAMEOVER;

        //change level
        if(this.bricks.length === 0) {
            this.gameState = GAMESTATE.NEXTLEVEL;
            this.currentLvl++;
            this.start();
        }

        [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));

        //delete brick with hit
        this.bricks = this.bricks.filter(object => !object.markedForDeletion)
    }

    draw(ctx) {
        //background
        ctx.drawImage(this.gameBackground, 0, 0, this.gameWidth, this.gameHeight);

        //render all objects
        [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));

        if(this.gameState === GAMESTATE.PAUSED) {
            //Shade
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
            ctx.fillRect(0,0,this.gameWidth, this.gameHeight);
            //Menu
            ctx.font = "80px Arial"
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('Paused', this.gameWidth/2, this.gameHeight/2)
        }
        
        if(this.gameState === GAMESTATE.MENU) {
            //Shade
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
            ctx.fillRect(0,0,this.gameWidth, this.gameHeight);
            //Menu
            ctx.font = "80px Arial"
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('Click space to start', this.gameWidth/2, this.gameHeight/2);
        }
        if(this.gameState === GAMESTATE.GAMEOVER) {
            //Shade
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
            ctx.fillRect(0,0,this.gameWidth, this.gameHeight);
            //Menu
            ctx.font = "80px Arial"
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('GAMEOVER', this.gameWidth/2, this.gameHeight/2);
        }
    }

    togglePause() {
        if(this.gameState === GAMESTATE.PAUSED) {
            this.gameState = GAMESTATE.RUNNING;
            return;
        }
        if(this.gameState === GAMESTATE.RUNNING){
            this.gameState = GAMESTATE.PAUSED;
            return;
        }
     
    }
}