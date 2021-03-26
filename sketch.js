var trex, trexRunning, ground, groundImage, invisibleGround,    cloudImage, cloudsGroup,Obt1, Obt2, Obt3,Obt4,Obt5,Obt6,  ObstaclesGroup, gameScore, PLAY, END, gameState, trexCollider,  gameOver, restart, gameOverImage, restartImage

function preload() {
 trexRunning=loadAnimation("trex1.png","trex3.png","trex4.png")
 groundImage=loadImage("ground2.png")
 cloudImage=loadImage("cloud.png")
 Obt1=loadImage("obstacle1.png") 
 Obt2=loadImage("obstacle2.png")
 Obt3=loadImage("obstacle3.png")
 Obt4=loadImage("obstacle4.png")
 Obt5=loadImage("obstacle5.png")
 Obt6=loadImage("obstacle6.png")
 trexCollider=loadAnimation("trex_collided.png")
 gameOverImage=loadImage("gameOver.png")
 restartImage=loadImage("restart.png")
}
function setup() {
  createCanvas(800, 400);
  trex=createSprite(200,360,20,50)
  trex.addAnimation("running", trexRunning)
  trex.scale=0.8;
  trex.setCollider("rectangle",0,0,60,70);
  trex.debug=false;
  
  ground=createSprite(200,380,20,50);
  ground.addImage("moving ground",groundImage)
  ground.velocityX=-3;
  ground.x=ground.width/2;
  
  invisibleGround=createSprite(200,385,400,10)
  invisibleGround.visible=false;
  
  cloudsGroup=createGroup()
  ObstaclesGroup=createGroup()
  
  trex.addAnimation("collided image",trexCollider)
  
  PLAY=1;
  END=0;
  gameState= PLAY;
  gameScore=0;
  gameOver = createSprite(400,240);
  gameOver.visible=false;
  restart = createSprite(400,280);
  restart.visible=false;
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.scale = 0.5;
  restart.addImage("restart",restartImage);
  restart.scale = 0.5;

}


function draw() {
  background("white");
  trex.collide(invisibleGround) 

  textSize(20)
  text("Score:"+gameScore,550,15)
   
  if (gameState===PLAY) {
      ground.velocityX=-6
        if (ground.x<0) {
           ground.x=ground.width/2;  
        }
       if(keyDown("space")&&trex.y>330){
         trex.velocityY = -13 ;
       }
      trex.velocityY = trex.velocityY + 0.6;
      gameScore=gameScore+Math.round(frameRate()/10);
      spawnClouds();
      spawnObstacles();
    if (trex.isTouching(ObstaclesGroup)) {
      gameState=END;
    }
  }
 else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided image",trexCollider);
   
     if(mousePressedOver(restart)) {
    reset();
  } 
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    
  }
  drawSprites();

}
  function spawnClouds () {
    // setting the behaviour for clouds.
     if (frameCount%60===0) {
       var cloud = createSprite(800,random(100,300),30,30);
       cloud.velocityX = -3;
       cloud.addImage("cloud",cloudImage);  
       trex.depth=cloud.depth+1;  
       cloud.lifetime = 267;
       cloudsGroup.add(cloud);
      //restart.depth=cloud.depth+1;
       //gameOver.depth=cloud.depth+1;
    }
  
  }
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(800,365,10,40);
    obstacle.velocityX = -6; 
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
  switch(rand) {
    case 1:obstacle.addImage("obstacle1", Obt1); break
    case 2:obstacle.addImage("obstacle2", Obt2); break
    case 3:obstacle.addImage("obstacle3", Obt3); break    
    case 4:obstacle.addImage("obstacle4", Obt4); break     
    case 5:obstacle.addImage("obstacle5", Obt5); break 
    case 6:obstacle.addImage("obstacle6", Obt6); 
         }    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 134;
    ObstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trexRunning);
  gameScore= 0;
  
}