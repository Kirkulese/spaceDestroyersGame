/*let canvas;
let ctx;
let canvasWidth = 1400;
let canvasHeight = 1000;
let keys = [];
let ship;
let bullets = [];
let asteroids = [];
let score = 0;
let lives = 3;
let shipExplosion = [];
let bomb;


document.addEventListener('DOMContentLoaded', setupCanvas);

function setupCanvas(){
    
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillstyle = 'black';
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    ship = new Ship();
    bomb = new Bomb();

    for(let i = 0; i < 8; i++){
        asteroids.push(new Asteroid());
    }

    document.body.addEventListener("keydown", function(e){
        keys[e.keyCode] = true;
        if(e.keyCode === 32){
            bomb.sticky = false;
            bomb.movingForward = true;
            bomb.canstick = false;
        }
    });

    document.body.addEventListener("keyup", function(e){
        keys[e.keyCode] = false;
    });

    Render();
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

function DrawLifeShips(){
    let startX = 1350;
    let startY = 10;
    let points = [[9,9], [-9,9]];
    ctx.strokeStyle = 'white';
    for(let i = 0; i < lives; i++){
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        for(let j = 0; j < points.length; j++){
            ctx.lineTo(startX + points[j][0], startY + points[j][1])
        }
        ctx.closePath();
        ctx.stroke();
        startX -=30;
    }

}*/

function Render(){
    ship.movingForward = (keys[87]);
    if(keys[68]){
        ship.Rotate(1);
    }
    if(keys[65]){
        ship.Rotate(-1);
    }
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    ctx.fillStyle = 'white';
    ctx.font = '21px Arial';
    ctx.fillText('SCORE: '+ score.toString(), 20,35);
    if(lives <= 0){
        ship.visible =false;
        ctx.fillStyle = 'white';
        ctx.font = '50px Arial';
        ctx.fillText('GAME OVER', canvasWidth / 2 - 150, canvasHeight / 2);
    }
    DrawLifeShips();
    if(asteroids.length !== 0){
        for(let k = 0; k < asteroids.length; k++){
            if(CircleCollision(ship.x, ship.y, 12,asteroids[k].x, asteroids[k].y, 40)){
                ship.x = canvasWidth / 2;
                ship.y = canvasHeight / 2;
                ship.velX = 0;
                ship.velY = 0;
                lives -= 1;
                bomb.sticky = false;
               
            }
        }
    }

    if(ship.visible){
        ship.RotateImage();
        ship.Update();
        console.log(ship.speed);
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

    if(bullets.length !== 0){
        for(let i = 0; i <bullets.length; i++){
            bullets[i].Update();
            bullets[i].Draw();
        }
    }
    if(asteroids.length !== 0){
        for(let j = 0; j <asteroids.length; j++){
            asteroids[j].Update();
            asteroids[j].Draw(j);
        }
    }
    
    requestAnimationFrame(Render);
}
