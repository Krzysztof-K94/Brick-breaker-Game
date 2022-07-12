export default class Player {
    constructor({gameWidth, gameHeight, keys}){
        this.width = 150;
        this.height = 20;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.position = {
            x: this.gameWidth / 2 - this.width / 2,
            y: this.gameHeight - this.height - 20,
        }
        this.speed = 10;
        this.image = new Image();
        this.image.src = './images/paddle-img2.png';
        this.keys = keys
    };

    draw(ctx){
            ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);      
    }

    update(deltaTime) {

        //move left or right
        if(this.keys.left.pressed && this.keys.currentKey === 'left' && this.position.x >= 0){
            this.position.x -= this.speed * (deltaTime / 30);
        }
        if(this.keys.right.pressed && this.keys.currentKey === 'right' && this.position.x + this.width <= this.gameWidth){
            this.position.x += this.speed * (deltaTime / 30);
        }
    }
}