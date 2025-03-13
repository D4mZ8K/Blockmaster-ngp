// Login check function
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check credentials
    if (username === "admin_isa" && password === "4aPTaH110866D4mZ8K") {
        startGame();  // Start the game after successful login
        document.getElementById("loginScreen").style.display = "none"; // Hide the login screen
    } else {
        alert("Invalid credentials!");
    }
}

// Set up the canvas and game settings
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

// Ball settings
let ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    radius: 10,
    dx: 2,
    dy: -2
};

// Paddle settings
let paddle = {
    width: 100,
    height: 10,
    x: (canvas.width - 100) / 2,
    dx: 5
};

// Brick settings
let brickRowCount = 5;
let brickColumnCount = 8;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Key events for paddle movement
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
    if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
    if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
}

// Drawing the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

// Drawing the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

// Drawing the bricks
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "green";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Collision detection for the ball and bricks
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let brick = bricks[c][r];
            if (brick.status === 1) {
                if (
                    ball.x > brick.x &&
                    ball.x < brick.x + brickWidth &&
                    ball.y > brick.y &&
                    ball.y < brick.y + brickHeight
                ) {
                    ball.dy = -ball.dy;
                    brick.status = 0; // Brick is hit
                }
            }
        }
    }
}

// Updating game logic (moving ball and paddle)
function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    } else if (ball.y + ball.radius > canvas.height) {
        alert("Game Over!");
        document.location.reload(); // Restart the game
    }

    // Ball collision with paddle
    if (
        ball.y + ball.radius > canvas.height - paddle.height &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
    ) {
        ball.dy = -ball.dy;
    }

    // Paddle movement
    if (rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += paddle.dx;
    }
    if (leftPressed && paddle.x > 0) {
        paddle.x -= paddle.dx;
    }

    // Collision detection with bricks
    collisionDetection();
}

// Drawing all elements on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawBricks();
    drawBall();
    drawPaddle();
    update();
}

// Starting the game loop
function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game after login
function startGame() {
    gameLoop();
}
