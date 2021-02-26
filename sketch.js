var backImage,backgr,obstacleImage;
var player, player_running;
var ground,ground_img, bananaImage;
var GOimg
var END =0;
var PLAY =1;
var gameState = PLAY;
var score=0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImage=loadImage("banana.png");
obstacleImage=loadImage("stone.png");
GOimg=loadImage("gameOver.png");
}

function setup() {
  createCanvas(500,300);
  
  foodGroup=new Group();
obstaclesGroup=new Group();

  backgr=createSprite(0,0,500,300);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(80,215,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,290,900,20);
  ground.x=ground.width/2;
  ground.visible=false;
  }

function draw() { 
  background(0);

  if(gameState===PLAY){
  
    spawnFood();
    spawnObstacles();

  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(player.isTouching(foodGroup)){
      score=score+2;
      foodGroup.destroyEach();
      switch(score){
        case 10:player.scale=0.12;
        break;
        case 20:player.scale=0.14;
        break;
        case 30:player.scale=0.16;
        break;    
        case 40:player.scale=0.18;
        break;      
        default: break;
      }
    }
  
  if(obstaclesGroup.isTouching(player)){
    gameState=END;
  }
  } 
  else if(gameState===END){
    backgr.velocityX=0;
    player.visible=false;

    foodGroup.destroyEach();
    obstaclesGroup.destroyEach();

  var GO=createSprite(250,150,20,20);

 GO. addImage(GOimg);
  }
 
  drawSprites();
}

function spawnFood(){
  if(frameCount%80===0){
    var banana=createSprite(400,50,40,10);
    banana.y=random(120,200);
    banana.addImage(bananaImage);
    banana.scale=0.05;
    banana.velocityX=-6;

    banana.lifetime=200;
    player.depth=banana.depth+1;
    foodGroup.add(banana);
  }
}
function spawnObstacles(){
  if (frameCount % 200 === 0){
     var obstacle = createSprite(400,255,10,40);
     obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
     obstacle.scale=0.16;
      //assign scale and lifetime to the obstacle           
  
      obstacle.lifetime = 300;
     //adding obstacles to the group
     obstaclesGroup.add(obstacle);
  }
  }
  
