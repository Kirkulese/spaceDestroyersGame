/*This file should contain the main game function and timing elements*/
/* current thought is to have setup initalize all the variables and canvas
   the new game function will spawn everything and/or clear out the canvas
   to start a new game */
    
//Removed life ships for clarity, add back later 


let keys = [];
let canvas;
let ctx;
let canvasWidth = 1400;
let canvasHeight = 1000;
let ship;
let asteroids = [];
let score = 0;
let lives = 3;
let bombs = [];
let newgame = 1;
//once everything is loaded, run the setup function
//could add a title screen by implementing a fresh load variable in setup
//let firstLoad = 1;
//if (firstLoad > 0){put instructions and high scores also set firstLoad = 0}
document.addEventListener('DOMContentLoaded', Setup());





//This is how all input will be taken, using a keys array and tracking which
//keys are currently pushed by marking them true
document.body.addEventListener("keydown", function(e){
    keys[e.code] = true;
    //press n to start a new game keycode 78
    //can add a control variable so this cant happen in game
    if(e.code === "KeyN"){
        if(newgame>0){
            NewGame();
            newgame = o;
        }
    }
    
});

document.body.addEventListener("keyup", function(e){
    keys[e.code] = false;
});








// When using as a reset, need to find a way to clear all data
// the ships velocity and rotation get added from the past game
// actually i think the multiple calls to render are speeding up the game timer
// may need to add an actual global clock to run things off of
function NewGame(){
    
    asteroids = [];  
    ship = new Ship();
    bomb = new Bomb();


    for(let i = 0; i < 3; i++){
        asteroids.push(new Asteroid());
    }
    
    console.log('NewGame complete');
    Run();
}

function Setup(){  
    var backgroundImage = new Image();
    backgroundImage.src = 'space.jpg'
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    //not working to create background
    backgroundImage.onload = function(){
        var background = ctx.createPattern(backgroundImage,'no-repeat');
        ctx.fillStyle = background;
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
    }
    

    console.log('Setup Complete');
    
}
if(newgame > 0){
    ctx.font = '50px Arial';
    ctx.save;
    ctx.fillStyle = 'white';
    ctx.fillText('DESTROYERS', canvasWidth / 2 - 150, canvasHeight * .66);
    ctx.restore;
}


function CircleCollision(p1x, p1y, r1, p2x, p2y, r2){
    let radiusSum;
    let xDiff;
    let yDiff;
    radiusSum = r1 + r2;
    xDiff = p1x - p2x;
    yDiff = p1y - p2y;
    if(radiusSum > Math.sqrt((xDiff * xDiff)+(yDiff * yDiff))){
        return true;
    }    
    else{
        return false;
    }
}

//break up render function

/*document.body.addEventListener("keydown", function(e){
    keys[e] = true;
    if(e === 32){
        bomb.sticky = false;
        bomb.movingForward = true;
        bomb.canstick = false;
    }
});*/

function Controller(){
    ship.movingForward = (keys["KeyW"]);
    if(keys["KeyD"]){
        ship.Rotate(1);
    }
    if(keys["KeyA"]){
        ship.Rotate(-1);
    }
    if(keys["Space"]){
        bomb.sticky = false;
        bomb.movingForward = true;
        bomb.canstick = false;
    }
}

function HandleCollisions(){
    if(asteroids.length !== 0){
        for(let k = 0; k < asteroids.length; k++){
            if(CircleCollision(ship.x, ship.y, 12,asteroids[k].x, asteroids[k].y, 40)){
                ship.x = canvasWidth / 2;
                ship.y = canvasHeight / 2;
                ship.velX = 0;
                ship.velY = 0;
                lives -= 1;
                bomb.sticky = false;
                console.log('ship loses a life');
               
            }
        }
    }
}
// need to create a game time control method,
var accumulator = 0;
var step = 1/60;


function Run(){
    Controller();
    HandleCollisions();
    Render();
    requestAnimationFrame(Run);
}
//existing render function is too broad, separate out controller(user input handling),
//background data handling, and drawing things to screen

function Render(){
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    ctx.font = '21px Arial';
    ctx.fillText('SCORE: '+ score.toString(), 20,35);
    if(lives <= 0){
        ship.visible =false;
        ctx.font = '50px Arial';
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillText('GAME OVER', canvasWidth / 2 - 150, canvasHeight / 2);
        ctx.restore();
        cancelAnimationFrame(Run);
    }
    //DrawLifeShips();
  

    if(ship.visible){
        ship.RotateImage();
        ship.Update();
    }

    if(bomb.visible){
        bomb.Draw();
        bomb.BombTimer();
        if(bomb.canstick == true){
            if(CircleCollision(ship.x, ship.y, 12,bomb.x, bomb.y, 12)){
                bomb.sticky = true;
                
            }
        }
        if(bomb.sticky == true){
            bomb.x = ship.x - Math.cos(ship.angle / Math.PI * 180) * -30;
            bomb.y = ship.y - Math.sin(ship.angle / Math.PI * 180) * -25;
            bomb.speed = ship.speed;
            bomb.angle = ship.angle;
            bomb.velX = ship.velX;
            bomb.velY = ship.velY;
        }
        if(bomb.exploding == true){
            bomb.Explode();
        }
        bomb.Update();
    }

    if(asteroids.length !== 0){
        for(let j = 0; j <asteroids.length; j++){
            asteroids[j].Update();
            asteroids[j].Draw(j);
        }
    }
    if(bomb.visible = true & asteroids.length > 0){
        for(k = 0; k < asteroids.length; k++){
            if(CircleCollision(asteroids[k].x, asteroids[k].y,32,bomb.x,bomb.y,32)){
                bomb.t = 0;
                asteroids.splice(k,1);
            }
        }
    }
}