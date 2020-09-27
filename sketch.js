var PLAY=1;
var END=0;
var gameState=1;
var monkey , monkey_running
var bananaImage, obstacle
var FoodGroup, obstaclesGroup
var score
var banana,obstacle;
var restart;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
createCanvas(450, 400);
  
monkey = createSprite(80,315,20,20);  
monkey.addAnimation("running",monkey_running);
monkey.scale=0.1; 
  
ground = createSprite(400,375,900,60);
ground.shapeColor="rgb(200,400,100)";  
ground.velocityX=-4;  
ground.x=ground.width/2;  

restart = createSprite(225,200,20,20);  
restart.addImage(obstacleImage);
restart.scale=0.2;   
restart.visible=false;
  
obstaclesGroup = createGroup();
FoodGroup = createGroup();  
  
}


function draw() {
background("rgb(200,250,400)");
  
if(gameState === PLAY){
  
var survivalTime = 0;
stroke("white");  
text(30);  
fill("black"); 
survivalTime=Math.ceil(frameCount/5);  
text("SurvivalTime :"+survivalTime,150,50);    
 
  
stroke("white");  
text(30);  
fill("black"); 
survivalTime=Math.ceil(frameCount/5);  
text("SurvivalTime :"+survivalTime,150,50);  
  
if(keyDown("space")&& monkey.y >= 200) {
  monkey.velocityY = -12;
}
  
if (ground.x < 0){
  ground.x = ground.width/2;
 }  


  
  
monkey.velocityY = monkey.velocityY + 0.8
monkey.collide(ground);  
  
if(obstaclesGroup.isTouching(monkey)){
gameState=END;  
} 
  
spawnObstacles();
spawnFood();    
}else if (gameState === END) {
background("rgb(400,300,200)") 
  
restart.visible=true;
monkey.visible=false;
ground.visible=false;
  
obstaclesGroup.destroyEach();
FoodGroup.destroyEach(); 
  
text("Press Rock to Restart",175,150)
 
if(mousePressedOver(restart)) {
reset();
}
  
}

drawSprites();  
}


function reset(){
gameState=PLAY;  
spawnObstacles();
spawnFood();
restart.visible=false;
monkey.visible=true;
ground.visible=true;
score=0  
}

function spawnFood() {
  if (frameCount % 120 === 0) {
  banana = createSprite(450,250,40,10);
  banana.y = random(120,250);    
  banana.velocityX = -5;
  banana.lifetime = 300;
  monkey.depth = banana.depth + 1;
  banana.addImage(bananaImage);
  banana.scale=0.1;
  FoodGroup.add(banana);
  console.log(" HELLO MA'AM!!")  
  }
}

function spawnObstacles() {
  if(frameCount % 200== 0) {
    obstacle = createSprite(450,320,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15    ;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}