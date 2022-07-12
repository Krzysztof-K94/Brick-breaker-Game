
const debounce = function(func, timeout) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), timeout);
    }
}

export const createImage = (img) => {
    const image = new Image();
    image.src = img;
    return image;
}

export const controlSpeedChange = debounce((game) =>  game.ball.speed.y = -game.ball.speed.y , 10)