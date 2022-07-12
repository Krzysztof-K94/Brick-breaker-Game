export default class InputHandler {
    constructor(game){
        addEventListener('keydown' ,({code}) => {
            console.log(code)
            switch (code) {
                case 'KeyA': game.keys.left.pressed = true;
                             game.keys.currentKey = 'left';
                    break;
                case 'KeyD': game.keys.right.pressed = true;
                             game.keys.currentKey = 'right';
                    break;
                case 'Escape': game.togglePause();
                    break;
                case 'Space': game.start();
            }
        });
        addEventListener('keyup', ({code}) => {
            switch (code) {
                case 'KeyA': game.keys.left.pressed = false;  
                    break;
                case 'KeyD': game.keys.right.pressed = false;
                    break;
            }
        });
    }
};