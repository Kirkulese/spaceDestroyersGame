class Ship{
    constructor(){
        this.visible = true;
        this.x = 700;
        this.y = 500;
        this.movingForward = false;
        this.speed = 0.1;
        this.velX = 0;
        this.velY = 0;
        this.rotateSpeed = 0.001;
        this.radius = 12;
        this.angle = 270;
        this.strokeColor = 'white';
        this.image = new Image();
        this.image.src = 'sprites.png';
        this.imgX = 16;
        this.imgY = 16;

    }
    Rotate(dir){
        this.angle += this.rotateSpeed * dir;
    }
    
    RotateImage(){
        ctx.save();
        
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle + 90) / Math.PI * 180);
        
        ctx.drawImage(this.image, this.imgX, this.imgY, 32, 32, -16, -16, 32, 32);
        
        ctx.restore();
    };

    Update(){
        let radians = this.angle / Math.PI *180;
        if(this.movingForward){
            this.velX += Math.cos(radians) * this.speed;
            this.velY += Math.sin(radians) * this.speed;
            this.imgX = 80;
            this.imgY = 16;
        }
        else{
            this.imgX = 16;
            this.imgY = 16;
        }
        if(this.x < this.radius){
            this.x = canvas.width;
        }
        if(this.x > canvas.width){
            this.x = this.radius;
        }
        if(this.y < this.radius){
            this.y = canvas.height;
        }
        if(this.y > canvas.height){
            this.y = this.radius;
        }
        if (this.velX > 7){
            this.velX = 7;
        }
        if (this.velY > 7){
            this.velY = 7;
        }
        if (this.velX < -7){
            this.velX = -7;
        }
        if (this.velY < -7){
            this.velY = -7;
        }

        this.x -= this.velX;
        this.y -= this.velY;
        
        
    }
    Draw(){
        
        ctx.drawImage(this.image, 0, 0, 64, 64, this.x, this.y, 64, 64);
        //hitbox
        /*ctx.beginPath();
        ctx.arc(ship.x, ship.y, 12,0,2*Math.PI);
        ctx.stroke();*/
    }
}

class Bomb{
    constructor(){
        this.visible = true;
        this.x = canvasWidth / 3;
        this.y = canvasHeight / 3;
        this.movingForward = false;
        this.speed = 0;
        this.velX = 0;
        this.velY = 0;
        this.radius = 15;
        this.angle = 0;
        this.strokeColor = '#ff4040';
        this.t = 360;
        this.image = new Image();
        this.image.src = 'sprites.png';
        this.sticky = false;
        this.canstick = true;
        this.exploding = false;
        this.srX = 0;
        this.srY = 64;
        this.exT = 0;
    }

    BombTimer(){
        if (this.t > 0){
            ctx.beginPath();
            let radius = this.radius * 1.4;
            let tAngle = 0;
            let endtAngle = Math.PI*.00555*this.t; 
            ctx.arc (this.x-16, this.y, radius, tAngle, endtAngle);
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'white';
            ctx.stroke();
            this.t--;
        }
        else{
            this.exploding = true;
        }
    }

    Explode(){
        if (this.exT == 10){
            this.srX +=64;
            this.exT = 0;    
        }
        ctx.drawImage(this.image, this.srX, this.srY, 64, 64, this.x-44, this.y-32, 64, 64);
        
        if (this.srX == 192){
            this.srX = 0;
            this.srY += 64;
        }
        this.exT++;
    }

    Draw(){
        if (this.exploding){
            
        }
        else{
            ctx.drawImage(this.image, 208, 0, 64, 64, this.x-32, this.y-32, 64, 64);
        }
        
    }

    //add a function for sticking that gets passed the ships position so it can 

    Update(){
        let radians = this.angle / Math.PI *180;
        if(this.movingForward){
            this.x -= this.velX;
            this.y -= this.velY;
            //this.velX += Math.cos(radians) * this.speed;
            //this.velY += Math.sin(radians) * this.speed;
        }
        if(this.x < this.radius){
            this.x = canvas.width;
        }
        if(this.x > canvas.width){
            this.x = this.radius;
        }
        if(this.y < this.radius){
            this.y = canvas.height;
        }
        if(this.y > canvas.height){
            this.y = this.radius;
        }
       
        this.x -= this.velX;
        this.y -= this.velY;
         

    }
}

class Asteroid{
    constructor(x,y,radius,level,collisionRadius){
        this.visible = true;
        this.x = x || Math.floor(Math.random() * canvasWidth);
        this.y = y || Math.floor(Math.random() * canvasHeight);
        this.speed = 0.5;
        this.radius = radius || 50;
        this.angle = Math.floor(Math.random() * 359);
        this.strokeColor = 'white';
        this.collisionRadius = collisionRadius || 46;
        this.level = level || 1;
        this.image = new Image();
        this.image.src = 'sprites.png';
    }
    Update(){
        var radians = this.angle / Math.PI * 180;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;
        if(this.x < this.radius){
            this.x = canvas.width;
        }
        if(this.x > canvas.width){
            this.x = this.radius;
        }
        if(this.y < this.radius){
            this.y = canvas.height;
        }
        if(this.y > canvas.height){
            this.y = this.radius;
        }
    }
    Draw(){
        ctx.drawImage(this.image, 128, 0, 64, 64, this.x-32, this.y-32, 64, 64);
       /* ctx.beginPath();
        let vertAngle = ((Math.PI * 2) / 6);
        var radians = this.angle / Math.PI * 180;
        for(let i = 0; i <6; i++){
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
        }
        ctx.closePath();
        ctx.stroke(); */

    }
}
