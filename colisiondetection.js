export const collisionDetection = (ball, gameObject) => {

    const topOfBall = ball.position.y;
    const bottomOfBall = ball.position.y + ball.size;
    const rightSideOfBall = ball.position.x + ball.size;
    const leftSideOfBall = ball.position.x;

    const topOfObject = gameObject.position.y;
    const bottomOfObject = gameObject.position.y + gameObject.height;
    const leftSideOfObject = gameObject.position.x;
    const rightSideOfObject = gameObject.position.x + gameObject.width;

    if(topOfBall <= bottomOfObject
        && bottomOfBall >= topOfObject
        && leftSideOfBall <= rightSideOfObject 
        && rightSideOfBall >= leftSideOfObject)
    {
       return true;
    } else return false;
}