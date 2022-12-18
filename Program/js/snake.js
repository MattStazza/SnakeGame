//-----------GRABBING ELEMENTS ON THE HTML DOCUMENT----------
// Grabbing the HTML Canvas
const canvas = document.getElementById("snake");

// Returns a drawing context on the canvas, 2D in this case
const context = canvas.getContext("2d");
//-----------------------------------------------------------



//-----------------------LOADING ASSETS----------------------
// Load images
const ground = new Image();
ground.src = "img/snake/ground.png"

const foodImg = new Image();
foodImg.src = "img/snake/food.png"


// Load audio
const dead = new Audio();
dead.src = "audio/snake/dead.mp3"

const eat = new Audio();
eat.src = "audio/snake/eat.mp3"

const down = new Audio();
down.src = "audio/snake/down.mp3"

const left = new Audio();
left.src = "audio/snake/left.mp3"

const right = new Audio();
right.src = "audio/snake/right.mp3"

const up = new Audio();
up.src = "audio/snake/up.mp3"
//------------------------------------------------------------



//----------------------CREATING PRESETS----------------------
// Create the unit (Box 32x32)
const box = 32; 

// Create the Snake (Array)
let snake = [];
// Create and set the Snake's head (object) location
snake[0] = {
    x : 9* box,
    y : 10 * box
}

// Create the Food (Object) in a random location
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box,
}

// Create the Score (Int)
let score = 0;

// Create Title
let title = "Snake Game App!"
//------------------------------------------------------------



//---------------------CONTROLS-------------------------------
// Add event listener
document.addEventListener("keydown", direction)

// d (direction) variable
let d;

// Direction Function (gets which key was clicked and sets direction)
function direction(event){
    if(event.key == "a" && d != "RIGHT"){
        d = "LEFT";
        left.play();
    }else if(event.key == "w" && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(event.key == "d" && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(event.key == "s" && d != "UP"){
        d = "DOWN";
        down.play();
    }
    console.log(d);
}

// Add event listener
document.addEventListener("keyup",  reload)

// Reload document with 'R' Key
function reload(event){
    console.log(event);
    if(event.key == "r"){
        window.location.reload();
    }
}
//-------------------------------------------------------------



//---------------COLLISION CHECK FUNCTION----------------------
function collision(head, array){
    for(let i = 0; i < array.length; i++){
        // If Snake hits itself (tail)
        if(head.x == array[i].x && head.y == array[i].y){
            dead.play();
            return true;
        }
    }
    return false;
}

//-------------------------------------------------------------



//-----------------DRAW FUCNTION-------------------------------
// (Draws EVERYTHING to the Canvas. Basially the whole game every 100ms)
function draw(){
    // Draw (back)ground
    context.drawImage(ground,0,0);

    // For Loop to draw Snake
    for(let i = 0; i < snake.length; i++){
        //--Draw Rectangle--
        // If [0] then head so draw green. If not [0] then body so draw white.
        context.fillStyle = (i == 0)? "green" : "white";
        // Fill (rectangle) with above style at below location
        context.fillRect(snake[i].x, snake[i].y, box, box);

        //--Draw Stroke--
        // Set stroke style to Red
        context.strokeStyle = "red";
        // Draw stroke at location
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    // Draw Food (at random location)
    context.drawImage(foodImg, food.x, food.y)

    // Get old Snake Head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Get which direction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    // If the Snake eats the Food
    if(snakeX == food.x && snakeY == food.y){
        // Increase the score
        score++;
        eat.play();
        // Spawn next food
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box,
        }
    }else{
        // Remove the tail
        snake.pop();
    }

    // Add new Head (Based on direction)
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    //---GAME OVER---
    // If Snakes hits a wall.
    if(snakeX < box ||
        snakeX > 17 * box ||
        snakeY < 3*box ||
        snakeY > 17*box || 
        collision(newHead, snake)){
            dead.play();
            clearInterval(game);
        }

    snake.unshift(newHead);

    // Drawing Score
    context.fillStyle = "white";
    context.font = "45px Changa one";
    context.fillText(score, 2*box, 1.6*box);

    // Drawing Title
    context.fillText(title, 5*box, 1.6*box);
}
//--------------------------------------------------------------



//Call Draw Function (every 100 milliseconds)
let game = setInterval(draw,100);