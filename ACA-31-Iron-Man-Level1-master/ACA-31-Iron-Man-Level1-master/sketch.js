var IronMan,ironImg;
var bg, backgroundImg;
var stoneGroup, stoneImage, stone,stoneSound;
var diamondsGroup, diamondImage,diamondSound;
var diamondsScore=0;

function preload() {
  backgroundImg = loadImage("images/space.png");

  ironImg= loadImage("images/iron.png");
  stoneImage=loadImage("images/stone.png");
  diamondImage=loadImage("images/diamond.png");
  diamondsScore=0;
  diamondSound=loadSound("sound/preview.mp3");
  stoneSound=loadSound("sound/zapsplat_foley_stones_pebbles_handle_004.mp3");
  spikesImage= loadImage("images/spikes.png");
  spikesSound=loadSound("sound/metalsound.wav");
}

function setup() {
  //creating canvas sprites
  createCanvas(1400, 600);
//creating background sprites
  bg = createSprite(680,300);
  bg.addImage(backgroundImg);
  //scaling the background
  bg.scale=2;
//creating ironman sprite
  IronMan=createSprite(200,505,20,50);
  IronMan.addImage(ironImg)
  //scaling ironman
  IronMan.scale=0.2;
  IronMan.debug=false;
  IronMan.setCollider("rectangle",100,0,200,400);
  //creating groups
  stoneGroup = new Group();
  diamondsGroup = new Group();
  obstaclesGroup= new Group();

 
}

function draw() {
 
  if (bg.y < 70){
    bg.y=bg.width/4;
  }
  //to make sure ironman does not move out with the bricks
  if(IronMan.x<200){
    IronMan.x=200;
  }
//to keep ironman in the gamebox
  if(IronMan.y<50){
    IronMan.y=50;
  }
  //to move ironman with keys
    if(keyDown("w")){
      IronMan.velocityY=-10;
    }
    if(keyDown("a")){
      IronMan.x=IronMan.x-5;
    }if(keyDown("d")){
      IronMan.x=IronMan.x+5;
    }
    //gravity
  IronMan.velocityY=IronMan.velocityY+0.5;

//call function to generate stones
  generateStones();
  //to make ironman collide with the stones
  for(var i =0 ; i <(stoneGroup).length; i++){
    var temp = (stoneGroup).get(i);
    if(temp.isTouching(IronMan)){
      IronMan.collide(temp);
      //playing the sound when ironman touches the stone
      stoneSound.play();
    }
  }
  //call function to generate diamonds 
  generateDiamonds();
  //to collect diamonds
  for(var i=0;i<(diamondsGroup).length;i++){
    var temp=(diamondsGroup).get(i);
    
    if(temp.isTouching(IronMan)){
      diamondSound.play();
      //to increase the score when ironman collects the diamonds
      diamondsScore++;
      temp.destroy();
      temp=null;
    
    }
  }
  //call function to generate obstacles
  generateObstacles();
  //to touch the obstacles
  for(var i =0; i < (obstaclesGroup).length;i++){
    var temp=(obstaclesGroup).get(i);
    if (temp.isTouching(IronMan)){
      //to reduce te score when ironman touches the obstacles
      diamondsScore--;
      spikesSound.play();
      temp.destroy();
      temp=null;
     
    }
  }
  //draw sprites on the screen
    drawSprites();
    textSize(20);
    //display score
    text("Diamonds Collected:"+ diamondsScore,450,40);
    fill("white");
    

    function generateStones(){
      if(frameCount%70===0){
        var stone = createSprite(400,100);
        stone.y=random(50,450,200,30);
        stone.x=random(60,800,15,30);
        stone.addImage(stoneImage);
        stone.scale=1;
        stone.velocityY=6;
        stone.lifetime=250;
        stoneGroup.add(stone);
      }
    }

    
  function generateDiamonds(){
    if(frameCount%50===0){
      var diamond=createSprite(50,450,20,15);
      diamond.y=random(50,450,200,30);
      diamond.y = Math.round(random(400,100));
      diamond.x=random(60,800,15,30);
      diamond.addImage(diamondImage);
      diamond.scale=0.4;
      diamond.lifetime=250;
      diamondsGroup.add(diamond);
    }
  }
}
  
function generateObstacles(){
  if(frameCount%50===0){
    var obstacle=createSprite(50,500,10,10);
    obstacle.y=random(5000,450,100,50);
    obstacle.y = Math.round(random(400,100));
    obstacle.x=random(60,800,10,60);
    obstacle.addImage(spikesImage);
    obstacle.scale=0.7;
    obstacle.lifetime=250;
    obstaclesGroup.add(obstacle);
    
  }
}
