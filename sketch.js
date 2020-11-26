var PLAY = 1;
var END = 0;
var gameState = 1;

var monkey , monkey_running,monkey_stop;
var banana ,bananaImage
var obstacle, obstacleImage
var ground,groundImage;
var invisibleground,invisiblegroundImage;
var gameover2,gameover2Image;

var FoodGroup, obstacleGroup
var score;

var forest,forestImage;
var resetbutton5,resetbutton5Image;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_stop=loadAnimation("sprite_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground2.png");
  invisibleground = loadImage("ground2.png");
  gameover2Image = loadImage("gameover.png");
  forestImage = loadImage("forest image2.jpg");
  resetbutton5Image = loadImage("reset button5.png");
  }


function setup() 
  {
    createCanvas(800,450);
    
    ground = createSprite(800,145,3,3);
    ground.addImage(forestImage);
    ground.scale = 1.5;
    ground.velocityX = -8;
    
    invisibleground = createSprite(750,390,3,3);
    invisibleground.addImage(groundImage);
    invisibleground.visible = false;
    
    
    monkey = createSprite(60,300,20,20);
    monkey.addAnimation("moving",monkey_running);
    monkey.addAnimation("stop",monkey_stop);
    monkey.scale = 0.2;
    gameState = PLAY;
    
    gameover2 = createSprite(420,150);
    gameover2.addImage("gameover2",gameover2Image);
    gameover2.scale = 0.3;
    
    resetbutton5 = createSprite(420,300);
    resetbutton5.addImage("resetbutton5",resetbutton5Image);
    resetbutton5.scale = 0.2;
                         
    
    
    obstacleGroup=new Group();
    bananaGroup = new Group();
    
    score = 0;
    
  }


function draw() 
  {
  background(250);
    
    if(gameState===PLAY)
    {
      gameover2.visible = false;
      resetbutton5.visible = false;
      
      if(ground.x<0)
      {
         ground.x = ground.width/2;
      }
    
    if(keyDown("space") && monkey.y>=200)
      {
        monkey.velocityY = -15;
      }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    monkey.collide(invisibleground);
      
       Obstacle();
    Banana();
    
    if(monkey.isTouching(bananaGroup))
        {
          score = score+1;
          bananaGroup.destroyEach();
        }
    
    if(monkey.isTouching(obstacleGroup))
      {
        gameover2.visible = true;
        monkey.changeAnimation("stop",monkey_stop);  
        gameState = END;
      }
      
    }
    
    if(gameState===END)
      {
        gameover2.visible = true;
        resetbutton5.visible = true;
        bananaGroup.setLifetimeEach(-1);
        obstacleGroup.setLifetimeEach(-1);
        bananaGroup.setVelocityXEach(0);
        obstacleGroup.setVelocityXEach(0);
        monkey.velocityY = 0; 
        ground.velocityX = 0;
        bananaGroup.destroyEach();
        
      }
    
    
    obstacleGroup.setLifetimeEach(300);
    
    if(mousePressedOver(resetbutton5))
      {
        reset();
      }
    
  drawSprites();
    
    fill(0);
    textSize(24);
    text("Score : "+score,680,40);
  
  }

function Obstacle()
{
  if(frameCount%150===0)
    {
      obstacle = createSprite(900,350,20,20);
      obstacle.addImage(obstacleImage);
      obstacle.velocityX = -(8+score/5);
      obstacle.scale = 0.3;
      obstacleGroup.add(obstacle);
      obstacle.setCollider("circle",5,20,200);
    }
}

function Banana()
{
  if(frameCount%90===0)
    {
      banana = createSprite(1000,150,20,20);
      banana.addImage(bananaImage);
      banana.velocityX = -(8+score/5);
      banana.scale = 0.2;
      bananaGroup.add(banana);
      
    }
}

function reset()
{
  gameState = PLAY;
  gameover2.visible = false;
  resetbutton5.visible = false;
  obstacleGroup.setLifetimeEach(0);
  bananaGroup.setLifetimeEach(0);
  score = 0;
  ground.velocityX = -8;
  monkey.changeAnimation("moving",monkey_running);

}




