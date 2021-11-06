var doctor, crowd, bg, virus, syringe,inviLog,inviLog2;
var doctorImg, crowdImg, virusImg, syringeImg;
var canvas;
var virusG,syringeG;

function preload(){
doctorImg = loadImage("doctor1.png");
crowdImg = loadImage("crowd.png");
virusImg = loadImage("virus.png");
syringeImg = loadImage("syringe.png");
bg = loadImage("road.jpg");
}
function setup(){
canvas = createCanvas(windowWidth, windowHeight);

doctor = createSprite(windowWidth/3,windowHeight/2,10,10);
doctor.addImage(doctorImg);
doctor.scale = 0.25;

crowd = createSprite(150,windowHeight-100,10,10);
crowd.addImage(crowdImg);
crowd.scale = 0.3;

inviLog = createSprite(doctor.x,100,200,10);
inviLog.visible = false;

inviLog2 = createSprite(doctor.x,windowHeight-80,200,10);
inviLog2.visible = false;

syringeG = new Group();
virusG = new Group();
}
function draw(){
background(bg);

    if(doctor.isTouching(inviLog) || doctor.isTouching(inviLog2)){
    doctor.velocityY = 0;
    }

    locomotion();

    if(frameCount%120 === 0){
        virus = createSprite(windowWidth+70,random(170,windowHeight-220),100,20);
        virus.addImage(virusImg);
        virus.scale = 0.4;
        virus.velocityX -= 6;
        virus.setCollider("rectangle",0,0,virus.width-70,virus.height-70);
        virusG.add(virus);
    }

    if(keyWentDown("SPACE")){
        syringe = createSprite(doctor.x,doctor.y,30,30);
        syringe.velocityX += 3;
        syringe.addImage(syringeImg);
        syringe.scale = 0.1;
        syringe.lifetime = 200;
        syringe.setCollider("rectangle",0,0,syringe.width,syringe.height-500);
        syringeG.add(syringe);
    }
   
    if(keyWentUp("SPACE")){
     
        syringe.velocityX += 3;
    }
    if(syringeG.isTouching(virusG)){
        syringeG.destroyEach();
        virusG.destroyEach();
    }

drawSprites();
}
function locomotion(){
if(keyWentDown("UP_ARROW")){
    doctor.velocityY -= 3;
}
if(keyWentUp("UP_ARROW")){
    doctor.velocityY = 0;
}

if(keyWentDown("Down_ARROW")){
    doctor.velocityY += 3;
}
if(keyWentUp("Down_ARROW")){
    doctor.velocityY = 0;
}    
}