var database;
var back_img;
var gameState =0;
var playerCount = 0;
var allPlayers;
var score =0;
var player, form,game;
var player1,player2;
var players;
var fruits;
var fruitGroup;
var fruit1_img, fruit2_img, fruit3_img, fruit4_img, fruit5_img;
var player_img;
var player1score =0;
var player2score =0;
var stone,stoneI,stoneG,k;

function preload(){
  back_img = loadImage("images/jungle.jpg");
  player_img = loadImage("images/basket2.png");
  fruit1_img = loadImage("images/apple2.png");
  fruit2_img = loadImage("images/banana2.png");
  fruit3_img = loadImage("images/melon2.png");
  fruit4_img = loadImage("images/orange2.png");
  fruit5_img = loadImage("images/pineapple2.png");
  stoneI = loadImage("images/stone.png");
  stoneG = new Group();
  fruitGroup = new Group();
  
  

}
function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  k = createButton('CLICK HERE');
}

function draw() {
  background(back_img);

  // Add conditions for gameStates and playerCount
  if(playerCount===2){
    game.update(1);
  }
  if(gameState===1){
    clear();
    game.play();
  }
  k.position(width,50);
  k.style("width","150px");
  k.style("height","40px");
  k.style("background","aqua");
  k.mousePressed(()=>{
    open("https://sarang73.whjr.site/");
  })

}