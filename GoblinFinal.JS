/**
 * ****************************************************************************
 * Name: Samer El-Murr*********************************************************
 * Date: 20/12/2020************************************************************
 * Course: Computer Graphics***************************************************
 * Intructor: Dr Danni Nini****************************************************
 * Project: Goblin Slayer******************************************************
 * ****************************************************************************
 * This project is to make Goblin**********************************************
 * ****************************************************************************
 */

let score = 40; // default score = 0 
let level = 0; // level of game up to three
const keys = []; // the keys for event listener 
let gameOver = false; //game over 
let dragonReady = false; // dragon for level 2
let PUReady = false;// powerUp level 2
let bossReady = false; // boss level 3
let bossBulletReady = false; // boss bullet level 3
let win = false; // win 
let ost = new Audio("Assets/GoblinSlayer-OST.mp3"); //in game audio song
let op = new Audio("Assets/GoblinSlayer-OP.mp3"); // intro title audio


//event listeners for the keystrokes 
addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
    hero.moving = true;
});

addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
    hero.moving = false;
});

 /**
 * *****************************************************************
 * Game class that contains and calls all the objects to update and 
 * draw. It has a no-arg constructor that constructs the canvas and 
 * initiates the onbject array, the update method calls all objects
 * update methods to update the game, and Draw which calls all obj-
 * ects draw methods.
 * ****************************************************************
 */
class Game{

    //default constructor 
    constructor(){
        this.width = 600; //width of the canvas
        this.height = 600; // height of the canvas
        this.canvas = document.getElementById("Game"); //calling the canvas
        this.ctx = this.canvas.getContext("2d"); //calling the context
        this.objects = []; //object array
        this.canvas.width = this.width; //assigning canvas width 
        this.canvas.height = this.height; //assigning canvas height 
    }

    //Update method calls all object's updates
    update(delta){

        if(level == 1 || level == 2 || level == 3 && !gameOver && !win){ //conditions for the levels
            ost.play(); //play the song only in game
            //for loop to loop through the array of objects 
            for(let i = 0; i < this.objects.length; ++i){

                //Calling the general update function incase no specific object has been called
                this.objects[i].update(delta, goblin, dragon, powerUp, boss, bossBullet);

            }
        }
        
        
    }

    //drawing all objects on the screen 
    draw(){    
         
        if(level == 0){ // level 0

            op.play(); //title play

            // Intro screen
            game.ctx.fillStyle = "Blue";
            game.ctx.font = "30px Helvetica";
            game.ctx.textAlign = "Center";
            game.ctx.textBaseline = "top";
            game.ctx.fillText("Welcome to GoblinSlayer", 190, 50); 

            game.ctx.fillStyle = "Blue";
            game.ctx.font = "16px Helvetica";
            game.ctx.textAlign = "Center";
            game.ctx.textBaseline = "top";
            game.ctx.fillText("You are the Goblin Slayer kill all goblins and avoid dangers to win", 50, 90);
            
            game.ctx.fillStyle = "Blue";
            game.ctx.font = "16px Helvetica";
            game.ctx.textAlign = "Center";
            game.ctx.textBaseline = "top";
            game.ctx.fillText("The controls of the game are: W (up), S (down), A (Left), D (Right)", 50, 120);

            game.ctx.fillStyle = "Red";
            game.ctx.font = "24px Helvetica";
            game.ctx.textAlign = "Center";
            game.ctx.textBaseline = "top";
            game.ctx.fillText("Press enter to start", 210, 150); 

            if(keys[13]){ //enter
                level++;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        } else if(gameOver) {

            //game over screen
            game.ctx.fillStyle = "Red";
            game.ctx.font = "30px Helvetica";
            game.ctx.textAlign = "Center";
            game.ctx.textBaseline = "top";
            game.ctx.fillText("Game Over!!", 220, 120);

            game.ctx.fillStyle = "Red";
            game.ctx.font = "20px Helvetica";
            game.ctx.textAlign = "Center";
            game.ctx.textBaseline = "top";
            game.ctx.fillText("Press enter to try again", 210, 150);

            if(keys[13]){ //enter
                location.reload();
            }
        } else if(win) {

            //winner screan
            game.ctx.fillStyle = "Blue";
            game.ctx.font = "30px Helvetica";
            game.ctx.textAlign = "Center";
            game.ctx.textBaseline = "top";
            game.ctx.fillText("You Win!!!!", 220, 120);

            game.ctx.fillStyle = "Blue";
            game.ctx.font = "20px Helvetica";
            game.ctx.textAlign = "Center";
            game.ctx.textBaseline = "top";
            game.ctx.fillText("Press enter to play again", 210, 150);

            if(keys[13]){ //enter
                location.reload();
            }
        } else {

            //print all objects
            for(let i = 0; i < this.objects.length; ++i){
                //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.objects[i].draw(this.ctx); 
            }
        }

    }

    //Adding objects to object array
    addObject(obj){
        this.objects.push(obj);
    }
}

/**
 * Object class which is a parent class for all objects in the game
 */
class Object{
    constructor(){

    }

    update(){

    }

    draw(){

    }
}

/**
 * ********************************
 * Class for drawing the background
 * ******************************** 
 */
class background extends Object{

    //default constructor 
    constructor(canvas){

        super(); //calling supper of object

        //getting the bg image
        this.bgReady = false;
        this.bgImage = new Image();
        this.bgImage.onload = () => {
            this.bgReady = true;
        };
        this.bgImage.src = "Assets/background.png"; //bg for level 1
            
        

        //giving the image the size 
        this.sizeWidth = canvas.width;
        this.sizeHeight = canvas.height;

    }

    update(){

    }

    //drawing the image 
    draw(ctx){
        if (this.bgReady) {
            ctx.beginPath();
            ctx.drawImage(this.bgImage, 0, 0, this.sizeWidth, this.sizeHeight);
        }
    }
}

/**
 * Hero class to make Hero object
 */
class Hero extends Object {

    constructor(canvas){
        super();

        // hero image
        this.heroImage = new Image();
        this.heroReady = false;
        this.heroImage.onload = () =>{
            this.heroReady = true;
        };
        this.heroImage.src = "Assets/TheDarkKnight.png";

        this.canvas = canvas;
        this.x = canvas.width/2;//default position of x on the canvas
        this.y = canvas.height/2;//default position of y on the canvas
        this.width = 32;//width of sprite
        this.height = 48;//height of sprite
        this.frameX = 0;//frameX is the X position in the sprite image
        this.frameY = 0;//frameX is the y position in the sprite image
        this.speed = 100;// movement in pixels per second with respect to the player
        this.moving = false;//character movement 
    }

    //update of movement of hero 
    update(delta, goblin, dragon, powerUp, boss, bossBullet){

        if(level == 2){ //bg for level 2
            bg.bgImage.src = "Assets/background2.png";    
        } else if(level == 3){ //bg for level 3
            bg.bgImage.src = "Assets/background3.png";
        }
        //player movment
		if (keys[87] && this.y > 0) { // this holding up
			this.y -= this.speed * delta;
			this.frameY = 3;
			this.moving = true;
		}
		if (keys[83] && this.y < this.canvas.height - this.height) { // this holding down
			this.y += this.speed * delta;
			this.frameY = 0;
			this.moving = true;
		}
		if (keys[65] && this.x > 0) { // this holding left
			this.x -= this.speed * delta;
            this.frameY = 1;
            this.moving = true;
		}
		if (keys[68] && this.x < this.canvas.width - this.width) { // this holding right
			this.x += this.speed * delta;
			this.frameY = 2;
			this.moving = true;
        }

        if(dragonReady){ // if the dragon is activated
            dragon.dragonCatchPlayer(delta, this); //method for cathcing player

            //collision with dragon 
            if (
                this.x <= (dragon.x + 20)
                && dragon.x <= (this.x + 20)
                && this.y <= (dragon.y + 20)
                && dragon.y <= (this.y + 20)
            ) {
                gameOver = true; //if dragon catches player player dies
            }
        }
        
        if(PUReady){ // if powerup is activated 
            //collision with dragon 
            if (
                this.x <= (powerUp.x + 20)
                && powerUp.x <= (this.x + 20)
                && this.y <= (powerUp.y + 20)
                && powerUp.y <= (this.y + 20)
            ) {
                powerUp.speedBoost(delta, this); //power up for speed boost
            }
        }

        if(bossBulletReady){ //if bullets is activated

            boss.moveBoss(delta); //move the boss
            bossBullet.shoot(deta, boss); //boss shoots

            //collision with dragon 
            if (
                this.x <= (bossBullet.x + 20)
                && bossBullet.x <= (this.x + 20)
                && this.y <= (bossBullet.y + 20)
                && bossBullet.y <= (this.y + 20)
            ) {
                gameOver = true; //if bullet hits player game over
            }
        }
        
                       
        //collision with goblin 
        if (
            this.x <= (goblin.x + 20)
            && goblin.x <= (this.x + 20)
            && this.y <= (goblin.y + 20)
            && goblin.y <= (this.y + 20)
        ) {
            goblin.reset(this.canvas);
            score += 10;

            if(score == 50){ //level 2
                level++;
            } else if (score == 100){ //level 3
                level++;
            } else if (score == 150){ //level 4 win
                level++;
                win = true;
            }
        }
        
    }

    //frame handeler for player
    handleheroFrame() {
		if (this.frameX < 3 && this.moving) this.frameX++;
		else this.frameX = 0;
	}

    draw(ctx){
        //draws the hero sprite image 
        if (this.heroReady) {
            ctx.drawImage(this.heroImage, this.width * this.frameX, 
                this.height * this.frameY, this.width, this.height,
                this.x, this.y, this.width, this.height);
        }

        this.handleheroFrame();
    }
}

/**
 * Goblin class to spawn goblins
 */
class Goblin extends Object {

    constructor(canvas){
        super();

        //  x and y for goblin
        this.x = Math.floor(Math.random() * (canvas.width - 50)); 
        this.y = Math.floor(Math.random() * (canvas.height - 50));

        // goblin image
        this.goblinImage = new Image();
        this.goblinReady = false;
        this.goblinImage.onload = () =>{
            this.goblinReady = true;
        };
        this.goblinImage.src = "Assets/goblin.png";
    }

    update(){
        
        
    }

    //reset funtion to reset goblin
    reset(canvas){
        this.x = Math.floor(Math.random() * (canvas.width - 50));
        this.y = Math.floor(Math.random() * (canvas.height - 50));
    }

    draw(ctx){
        if (this.goblinReady) {
            ctx.drawImage(this.goblinImage, this.x, this.y);
        }
    }
}

/**
 * Dragon Class to make dragon
 */
class Dragon extends Object {

    constructor(canvas){
        super();


        // dragon image
        this.dragonImage = new Image();
        this.dragonReady = false;
        this.dragonImage.onload = () =>{
            this.dragonReady = true;
        };
        this.dragonImage.src = "Assets/Dragon.png";

        this.canvas = canvas;
        this.x = Math.floor(Math.random() * canvas.width);//default position of x on the canvas
        this.y = Math.floor(Math.random() * canvas.height);//default position of y on the canvas
        this.width = 96;//width of sprite
        this.height = 96;//height of sprite
        this.frameX = 0;//frameX is the X position in the sprite image
        this.frameY = 0;//frameX is the y position in the sprite image
        this.speed = 50;// movement in pixels per second with respect to the player
        this.moving = false;//character movement 
    }

    update(){

    }

    //methos to catch player
    dragonCatchPlayer(delta, hero){
        // subtract (= difference vector)
		let dx = hero.x - this.x;
		let dy = hero.y - this.y;
	
		// normalize (= direction vector)
		// (a direction vector has a length of 1)
		let length = Math.sqrt(dx * dx + dy * dy);
		if (length) {
		dx /= length;
		dy /= length;
		}
		
		let dX1 = this.x;
		let dY1 = this.y;
	
		// move
		// delta is the elapsed time in seconds
		// SPEED is the speed in units per second (UPS)
		this.x += dx * delta * this.speed;
		this.y += dy * delta * this.speed;
	
		//Dragon movment 
		if (dY1 > this.y) { // this holding up
			this.frameY = 3;
			this.moving = true;
		}
		if (dY1 < this.y) { // this holding down
			this.frameY = 0;
			this.moving = true;
		}
		if (dX1 > this.x) { // this holding left
            this.frameY = 1;
			this.moving = true;
		}
		if (dX1 < this.X) { // this holding right
			this.frameY = 2;
			this.moving = true;
		}

    }

    //frame handler for dragon
    handleDragonFrame() {
		if (this.frameX < 3 && this.moving) this.frameX++;
		else this.frameX = 0;
	}

    draw(ctx){
        //draws the dragon sprite image 
        if (this.dragonReady) {
            ctx.drawImage(this.dragonImage, this.width * this.frameX, 
                this.height * this.frameY, this.width, this.height,
                this.x, this.y, this.width, this.height);
        }

        this.handleDragonFrame();
    }
}

/**
 * powerup class tp make speed powerup
 */
class PowerUp extends Object {
    constructor(canvas){
        super();

        this.heroPickup = false; //if hero pickes it up despawn

        this.x = Math.floor(Math.random() * canvas.width);//default position of x on the canvas
        this.y = Math.floor(Math.random() * canvas.height);//default position of y on the canvas

        //getting the powerUp image
        this.powerUpReady = false;
        this.powerUpImage = new Image();
        this.powerUpImage.onload = () => {
            this.powerUpReady = true;
        };
        this.powerUpImage.src = "Assets/speedUpPU.png";       
        
        //giving the image the size 
        this.size = 20;
    }

    update(){

    }

    //the speed boost ability
    speedBoost(delta, hero){
        hero.speed += 100 * delta;
        this.heroPickup = true;
    }

    draw(ctx){
        //draw powerup if the hero didnt pick it up
        if (this.powerUpReady && this.heroPickup == false) {
            ctx.beginPath();
            ctx.drawImage(this.powerUpImage, this.x, this.y, this.size, this.size);
        }
    }
}

/**
 * Boss class to create boss
 */
class Boss extends Object{

    constructor(canvas){
        super();

        this.canvas = canvas;

        //Importing the enemy boss image.
        this.bossImage = new Image();
        this.bossReady = false;
        this.bossImage.onload = () =>{
            this.bossReady = true;
        }
        this.bossImage.src = "Assets/boss.png";

        //x and y for boss
        this.x =  canvas.width/2; 
        this.y = 10;

        this.size = 100; //size
        this.speed = 50; //speed

        this.xDirection = -1; // default direction of movment on x axis
    }

    update(){

    }

    /**
     * move the boss 
     */
    moveBoss(delta){
 
        //Increments value of x axis based on the x direction
        this.x += this.xDirection * this.speed * delta;
        
        //if boss stopped movong to the left move to the right
        if(this.x > this.canvas.width - 100){ 
            this.x = this.x - 2;
            this.xDirection = -1 * this.speed * delta;
        } else if(this.x < 20){
            this.x = this.x + 2;
            this.xDirection = 1 * this.speed * delta;
        
        }
    }

    draw(ctx){

        //draw boss
        if(this.bossReady){  
            ctx.beginPath();
            ctx.drawImage(this.bossImage,this.x,this.y,this.size,this.size);
        }
    }
}

/**
 * Boss bullet class to create bullets of boss
 */
class BossBullet extends Object{ 

    constructor(x, y, canvas){
        super();

        this.canvas = canvas;

        //boss bullet image
        this.bossBulletImage = new Image();
        this.bossBulletReady = false;
        this.bossBulletImage.onload = () => {
            this.bossBulletReady = true;
        }
        this.bossBulletImage.src = "Assets/BossBullet.png";

        //x and y of bullet
        this.x = x;
        this.y = y;

        this.size = 20; //size
        this.speed = 200; //speed
    }

    update(){

    }

    //resets bullet to boss
    reset(boss){

        this.x = boss.x + 20;
        this.y = boss.y + 20;
        this.speed = 200;
    }

    //shoots when called
    shoot(delta, boss){


        //shoots the bullet
         this.y += this.speed * delta;

            //remove bullet if gone out of bounds
            if(this.y >= this.canvas.height){
                this.reset(boss);
            }    
    }

    draw(ctx){
        //draw image
        if(this.bossBulletReady){
            ctx.beginPath();
            ctx.drawImage(this.bossBulletImage,this.x,this.y,this.size,this.size);
        }
    }
}

//creates all game objects
let game = new Game();
let bg = new background(game.canvas);
let hero = new Hero(game.canvas);
let dragon = new Dragon(game.canvas);
let goblin = new Goblin(game.canvas);
let powerUp = new PowerUp(game.canvas);
let boss = new Boss(game.canvas);
let bossBullet = new BossBullet(boss.x, boss.y, game.canvas);

//adding all objects
game.addObject(bg);
game.addObject(hero);
game.addObject(goblin);


//the game loop
let animate = function (){

    //setting up the time for the engine 
    let now = Date.now();
    let delta = now - then;

    game.update(delta/1000);
    game.draw();

    then = now;

    //calls objects on game if called
    if(level == 2){
        dragonReady = true;
        PUReady = true;
        game.addObject(dragon);
        game.addObject(powerUp);
    } else if (level == 3){
        bossReady = true;
        bossBullet = true;
        game.addObject(boss);
        game.addObject(bossBullet);
    }


    // Score for the player
    game.ctx.fillStyle = "White";
    game.ctx.font = "24px Helvetica";
    game.ctx.textAlign = "left";
    game.ctx.textBaseline = "top";
    game.ctx.fillText("Score: " + score, 0, 0);

    // Score for the Level
    game.ctx.fillStyle = "White";
    game.ctx.font = "24px Helvetica";
    game.ctx.textAlign = "left";
    game.ctx.textBaseline = "top";
    game.ctx.fillText("Level: " + level, 0, 30);

    requestAnimationFrame(animate);
        
}

//making sure everything is compatable 
let w = window; 
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame 
|| w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

let then = Date.now();

animate(); //calling animate function
