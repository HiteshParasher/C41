class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        var k;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            k += 50;
            
            players[index -1].x = x;
            players[index - 1].y = y;
            
            // Differentiate the main player by printing
            // the name of the player on the basket.
            if(index === player.index){
                fill("black");
                textSize(25);
                text(allPlayers[plr].name,x-25,y+25);
            } 
            textSize(15);
            fill("white");
            text(allPlayers.player1.name+"'s Score: "+ allPlayers.player1.score,50,50);
            text(allPlayers.player2.name+"'s Score: "+ allPlayers.player2.score,50,100);
            textSize(20);
            text("Be aware of the stones",300,30);
            textSize(20);
            text("If the game is already in play, press the reset button, reload the site and wait for one more player to join",20,height-20);

        }
        //text("score: "+player.score,10,100);


        // Give movements for the players using arrow keys
        if(player.index!=null){
        if(keyDown(37)){
           player.distance += 10;
           player.update();
        }
        if(keyDown(39)){
            player.distance -= 10;
            player.update();
        }
        }

        
        

        // Create and spawn fruits randomly
        if(frameCount%20===0){
            fruits = createSprite(random(100,1000),0,100,100);
            fruits.velocityY = 6;
            var rand = Math.round(random(1,5));
            switch(rand){
                case 1: fruits.addImage(fruit1_img);
                break;
                case 2: fruits.addImage(fruit2_img);
                break;
                case 3: fruits.addImage(fruit3_img);
                break;
                case 4: fruits.addImage(fruit4_img);
                break;
                case 5: fruits.addImage(fruit5_img);
                break;
            }
            fruitGroup.add(fruits);
        }
        if(frameCount%50===0){
            stone = createSprite(random(100,1000),0,100,100);
            stone.addImage(stoneI);
            stone.velocityY = 6;
            stone.scale = 0.1;
            stoneG.add(stone);
        }

        if(player.index!=null){
            for(var i=0;i < fruitGroup.length;i++){
                if(fruitGroup.get(i).isTouching(players[player.index-1])){
                    fruitGroup.get(i).destroy();
                    player.score += 1;
                    player.update();
                }
            }
    
            for(var i=0;i<stoneG.length;i++){
                if(stoneG.get(i).isTouching(players[player.index-1])){
                    stoneG.get(i).destroy();
                    if(player.score>0){
                    player.score -= 1;
                    player.update();
                    }
                   // players[player.index-1].rotation = 1;
                    players[player.index-1].rotationSpeed += 20;
                    players[player.index-1].rotation = 1;
                }
                if(players[player.index-1].rotation >= 360){
                    players[player.index-1].rotationSpeed = 0;
                }
            }
        }
        
        
        if(player.score>=50){
            this.end();
        }
    
        
    }

   
    end(){
       //console.log("Game Ended");
       game.update(2);
       clear();
       fruitGroup.setVelocityYEach(0);
       stoneG.setVelocityYEach(0);
       textSize(40);
       fill("blue");
       text("You Won!!",350,300);

    }
}