let inputDir = { x: 0, y: 0 };
let speed = 10;
let lastpainttime = 0;
let snakeArr = [
    { x: 13, y: 15 },
]
food = { x: 6, y: 7 };
let score = 0;

//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastpainttime)/1000<1/speed) {
        return;
    }
    lastpainttime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //if you bump into yourself 

    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;

        }
    }

    // if you bump into wall

    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    //update snake array and food
    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        alert("Game Over");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;

    }

    // if you have eaten the food regenrate the food and increment the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscorebox.innerHTML = "Highscore:" + hiscoreval;

        }
        scorebox.innerHTML = "score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = array[i];
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);

    });

    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

let hiscore = localStorage.getItem("hiscore")
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscorebox.innerHTML = "Highscore:" + hiscore;
}

// window.requestAnimationFrame(main) method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            // inputDir.x = 0;
            // inputDir.y = 0;
            alert("invalid key")
            break;
    }
})


if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    score += 1;
    if (score > hiscoreval) {
        hiscoreval = score;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        hiscorebox.innerHTML = "Highscore:" + hiscoreval;

    }
    scorebox.innerHTML = "score: " + score;
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
    let a = 2;
    let b = 16;
    let newFood = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    while (snakeArr.some(snake => snake.x === newFood.x && snake.y === newFood.y)) {
        newFood = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    food = newFood
}