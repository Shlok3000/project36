var dog, happyDog, database, foodS, FoodStock; 
var feedDog, feed, AddF, fedTime, lastFed, foodObj;

function preload()
{
  dog = loadImage("images/doglmg.png");
  happyDog = loadImage("images/doglmg.png");
}

function setup() {
	createCanvas(500, 500);
  
  dog = createSprite(250,250,50,50);

  FoodStock=database.ref('Food');
    FoodStock.on("value",readStock);
}


function draw() {  

  fill(255,255,255);
  textSize(15);
  if(lastFed>=12) {
    text("Last Feed  :"+ lastFed%12 + " PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + " AM", 350,30);
  }

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  drawSprites();
  
  textSize(35)
  fill("white")
  text("fooStock", 450,450);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  database.ref('/').update({
    Food: x
  })

  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  AddF=createButton("Add Food");
  AddF.position(800,95);
  AddF.mousePressed(AddF);

  Food.display();
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  data.ref('/').update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()
  }) 
}

function addF(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}