/***RiverCrossingGame.js
*implements the mini river game at the end of the game
*must be included after Game.js
*/
var myGamePiece;
var myObstacles=[];
var infopage;
 var topborder;
 var botborder;
 var dock;
 var riverGameReturnScene;
Game.startRiverGame=function(returnScene){
    riverGameReturnScene=returnScene;
    myGameArea.canvas=document.getElementById("canvas");
    topborder = new component(480, 20, "#F6B68E", 0, 0,"block");
    botborder=new component(480, 20, "#F6B68E", 0, 130,"block");
    myGameArea.start();
    myGamePiece=new component(30,25,"./img/wagonOnRiver.png",20,70,"image");
    botborder.update();
    topborder.update();
    myGamePiece.update();
};
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}
var myGameArea = {
    canvas : undefined,
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
        },
    resume: function(){
    	myObstacles=[];
    	myGameArea.key = false;
    	this.interval = setInterval(updateGameArea, 20);


    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myGameArea.canvas.getContext("2d");
	if (this.type == "text") {
		ctx.font = this.width + " " + this.height;
      	ctx.fillStyle = color;
		ctx.fillText(this.text, this.x, this.y);
	}
   else if (type == "image") {

      ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
  this.crashWith = function(otherobj) {
        var myleft = this.x+1;
        var myright = this.x + (this.width);
        var mytop = this.y+1;
        var mybottom = this.y + (this.height)-1;
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
    }
}
function updateGameArea() {

    //myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    myGameArea.frameNo+=1;

    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; }
    var x, y,minHeight, maxHeight;

    var crashedFunc=function(){
      myGamePiece.speedX=0;
      myGamePiece.speedY=0;
      myGameArea.key = false;
      myGameArea.stop();

     Game.alertBox("You have lost "+ (destroyRandomSupplies(Game.gameCaravan)||"nothing."),function(){
       //infopage.update();
       myGamePiece.x=20;
       myGamePiece.y=70;
       myGameArea.clear();
       myGameArea.resume();

     });
   };
   if (myGamePiece.crashWith(topborder) ||myGamePiece.crashWith(botborder)){
     crashedFunc();
   }else{
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
 			      crashedFunc();
        }
    }
  }
    myGameArea.clear();


    if (myGameArea.frameNo == 1 || everyinterval(150)||everyinterval(100)) {

        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 130;

        //y = canvas.height - 100
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        myObstacles.push(new component(20, 10, "./img/rock.png", x, height,"image"));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    botborder.update();
    topborder.update();
    if (myGameArea.frameNo == 1000 ){
    	//x = canvas.width;
    	dock=new component(50, 75, "./img/dock.png", 300, 100,"image");}
    if(myGameArea.frameNo>1000){
    	dock.x+=-1;
    	dock.update();
    	if (myGamePiece.crashWith(dock)){
        myGameArea.stop();
        myGamePiece.update();
    	Game.alertBox("You have arrived at Oregon.",riverGameReturnScene);
      return;
    	}
    }
    if(myGameArea.frameNo==1500){
        	myGameArea.stop();
          myGamePiece.update();
          Game.alertBox("You missed the dock, lost "+(destroyRandomSupplies(Game.gameCaravan)||"nothing.", riverGameReturnScene));
    }



   	myGamePiece.newPos();

    myGamePiece.update();

}
