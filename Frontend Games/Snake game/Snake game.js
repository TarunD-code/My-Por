const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const scoreDisplay = document.getElementById("score");

const box = 20;
let snake, direction, food, score, gameRunning, gamePaused, game;

function init() {
    snake = [
        { x: 10 * box, y: 10 * box },
        { x: 9 * box, y: 10 * box },
        { x: 8 * box, y: 10 * box }
    ];
    direction = "RIGHT";
    food = generateFood();
    score = 0;
    gameRunning = false;
    gamePaused = false;
    scoreDisplay.textContent = "Score: " + score;
    clearInterval(game);
    draw();
}

function generateFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box,
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.keyCode;
    if ((key === 37 || key === 65) && direction !== "RIGHT") direction = "LEFT";
    else if ((key === 38 || key === 87) && direction !== "DOWN") direction = "UP";
    else if ((key === 39 || key === 68) && direction !== "LEFT") direction = "RIGHT";
    else if ((key === 40 || key === 83) && direction !== "UP") direction = "DOWN";
}

function draw() {
    if (gamePaused) return;
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "lime";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        scoreDisplay.textContent = "Score: " + score;
        food = generateFood();
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (collision(newHead, snake) || isOutOfBounds(newHead)) {
        gameRunning = false;
        clearInterval(game);
        alert("Game Over! Score: " + score);
        init(); // Reset game immediately
        return;
    }

    snake.unshift(newHead);
}

function collision(head, snake) {
    return snake.some((segment, index) => index !== 0 && head.x === segment.x && head.y === segment.y);
}

function isOutOfBounds(position) {
    return position.x < 0 || position.x >= canvas.width || position.y < 0 || position.y >= canvas.height;
}

startBtn.addEventListener("click", () => {
    if (!gameRunning) {
        gameRunning = true;
        game = setInterval(draw, 100);
    }
});

resetBtn.addEventListener("click", () => {
    init();
});

pauseBtn.addEventListener("click", () => {
    gamePaused = true;
});

resumeBtn.addEventListener("click", () => {
    if (gamePaused) {
        gamePaused = false;
        game = setInterval(draw, 100);
    }
});

// Initialize game
init();