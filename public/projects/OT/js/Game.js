/****Game.js
* instanciate a Game object that serves as the main driver of the game and update the HTML
***/

var Game = {

  // Variables initialized at the start of every attempt
  gameCaravan: new Caravan(),
  date: new Date(),
  weather: "warm",
  miles: 0,
  branch:[null,null],
  tombstones: [],
  bg: "",
  ground: "",
  gameDiv: document.getElementById("game"),

  // Function that starts the game running
  start: function(){
    Game.resetGame();
    Game.scenes.startScreen();
    Game.getTombstones();
  },

  // Function that clears variables so that a new game can be attempted
  resetGame: function(){
    Game.Caravan= new Caravan();
    Game.date= new Date(),
    Game.miles=0;
    Game.branch=[null,null];
  },

  // Helper function used for taking user input. Checks against a given validation function for each keypress
  // before adding the character to the input.
  waitForInput: function(enterKeys,validationFunc,callback=function(){}){
    enterKeys=enterKeys||[13];
    validationFunc=validationFunc||function(){return true};
    var input="";

    element=document.getElementById("input")||{};
    element.innerHTML = "_";
    document.onkeypress=function(event){
      var x = event.charCode || event.keyCode;   // Get the Unicode value
      if(x==13){//ignore enter
        return;
      }
      var y = String.fromCharCode(x);

      if(validationFunc(input+y)){
        input=input+y;
        element.innerHTML=input+"_";
      }
    }
    document.onkeydown=function(event){
      var x = event.charCode || event.keyCode;   // Get the Unicode value
      if(x==8)//backspace pressed
      {
        input=input.slice(0,-1);
        element.innerHTML=input;
      }
      else if((x == 13||enterKeys.includes(x)) && validationFunc(input) )//enter key pressed and input valid
      {
        document.onkeydown=null;
        document.onkeypress=null;
        element.innerHTML = element.innerHTML.substring(0, element.innerHTML.length - 1);
        callback(input);
      }else if(x==8)//backspace pressed
      {
        input=input.slice(0,-1);
        element.innerHTML=input+"_";

      }
    };
  },

  // Helper function used to pass time and consume rations without the caravan moving forward
  passDays: function(numDays) {

	Game.date.setDate(Game.date.getDate() + numDays);

	for (var i = 0; i < numDays; i++) {
	  Game.gameCaravan.updateFood();
    Game.gameCaravan.updateHealth();
	}
  },

  scenes: {

	// Screen that greets the player when they open the game, and allows them to start playing
    startScreen: function(){
      Game.gameDiv.innerHTML=
        '<div class=\"centered_content\">'+
          '<h1>The Oregon Trail</h1>'+
		  '<img class="text_decoration" src="./img/TextDecoration.png">\n'+
          '<div class="white_black">'+
          '<p>You may:</p>'+
          '<ol>'+
            '<li>Travel the trail</li>'+
            '<li>Learn about the trail</li>'+
            '<li>See the Oregon Top Ten</li>'+
          '</ol>'+
          '<p>What is your choice? <span id="input"></span></p>'+
        '</div>';
        var validationFunc=function(input){
          return input.length<2 && Number.isInteger(Number(input)) && Number(input)>0 &&Number(input)<4;
        }
      Game.waitForInput(null,validationFunc,function(input){
        if(input == 1){
          Game.scenes.chooseOccupation();
        }
        else if(input ==2){
          Game.gameDiv.innerHTML=
            `<div id="learnMore"class="centered_content white_black">\n
              <h1>The Oregon Trail</h1>\n
              <img class="text_decoration" src="./img/TextDecoration.png">\n
              <p>\n
                Try taking a journey by covered wagon across 2000 miles of plains, rivers, and mountains. Try! On the plains, will you slosh your oxen through mud and water-filled ruts or will you plod through dust six inches deep?
              </p>\n
              <img class="text_decoration" src="./img/TextDecoration.png">\n
            </div>\n
            <p class="prompt white_black">Press ENTER to continue</p>\n`;
            Game.waitForInput(null,null,function(){
              Game.gameDiv.innerHTML =
                `<div id="learnMore" class="centered_content white_black">\n
                  <h1>The Oregon Trail</h1>\n
                  <img class="text_decoration" src="./img/TextDecoration.png">\n
                  <p>\n
                    How will you cross the rivers? If you have money, you might take a ferry (if there is a ferry). Or, you can ford the river and hope you aren't swallowed alive!
                  </p>\n
                  <img class="text_decoration" src="./img/TextDecoration.png">\n
                </div>\n
                <p class="prompt white_black">Press ENTER to continue</p>\n`;
              Game.waitForInput(null, null, function() {
                Game.gameDiv.innerHTML =
                  `<div id="learnMore" class="centered_content white_black">\n
                    <h1>The Oregon Trail</h1>\n
                    <img class="text_decoration" src="./img/TextDecoration.png">\n
                    <p>\n
                      What about supplies? Well, if you're low on food you can fish. You might get a bass...you might. And there are carp in the mountains.
                    </p>\n
                    <img class="text_decoration" src="./img/TextDecoration.png">\n
                  </div>\n
                  <p class="prompt white_black">Press ENTER to continue</p>\n`;
                Game.waitForInput(null, null, function() {
                  Game.gameDiv.innerHTML =
                    `<div id="learnMore" class="centered_content white_black">\n
                      <h1>The Oregon Trail</h1>\n
                      <img class="text_decoration" src="./img/TextDecoration.png">\n
                      <p>\n
                        At the Dalles, you can try navigating the Columbia River, but if running the rapids with a makeshift raft makes you queasy, better take the Barlow Road.
                      </p>\n
                      <img class="text_decoration" src="./img/TextDecoration.png">\n
                    </div>\n
                    <p class="prompt white_black">Press ENTER to continue</p>\n`;
                  Game.waitForInput(null, null, function() {
                    Game.gameDiv.innerHTML =
                      `<div id="learnMore" class="centered_content white_black">\n
                        <h1>The Oregon Trail</h1>\n
                        <img class="text_decoration" src="./img/TextDecoration.png">\n
                        <p>\n
                          If for some reason you don't survive -- your wagon burns, or thieves steal your oxen, or you run out of provisions, or you die of cholera -- don't give up! Try again...and again...until your name is up with the others on The Oregon Top Ten.
                        </p>\n
                        <img class="text_decoration" src="./img/TextDecoration.png">\n
                      </div>\n
                      <p class="prompt white_black">Press ENTER to continue</p>\n`;
                    Game.waitForInput(null, null, function() {
                      Game.gameDiv.innerHTML =
                        `<div id="learnMore" class="centered_content white_black white_black">\n
                          <h1>The Oregon Trail</h1>\n
                          <img class="text_decoration" src="./img/TextDecoration.png">\n
                          <p>\n
                            The team responsible for the creation of this product includes:
                          </p>\n
                          <ul class="square_list">\n
                            <li>Rachel Backert</li>\n
                            <li>Braxton Dubin</li>\n
                            <li>Chen Kuo</li>\n
                            <li>Alec Wieland</li>\n
                          </ul>\n
                          <img class="text_decoration" src="./img/TextDecoration.png">\n
                        </div>\n
                        <p class="prompt white_black">Press ENTER to continue</p>\n`;
                      Game.waitForInput(null, null, Game.scenes.startScreen);
                    })
                  })
                })
              })
            })
         }
        else if(input == 3){
          Game.scenes.OregonTopTen();
        }
        else{
          Game.scenes.startScreen();
        }
      });
    },

	// Screen where the player selects their occupation, which determines score and certain bonuses
    chooseOccupation: function(){
      Game.gameDiv.innerHTML =
        `<div id="choose_occupation" class="white_black centered_content">\n
        <img class="text_decoration" src="./img/TextDecoration.png">\n
          <p>Many kinds of people made the trip to Oregon.</p>\n
          <p>You may:</p>\n
          <ol>\n
            <li>Be a banker from Boston</li>\n
            <li>Be a carpenter from Ohio</li>\n
            <li>Be a farmer from Illinois</li>\n
            <li>Find out the difference between the choices</li>\n
          </ol>\n
		  <p>What is your choice? <span id="input"></span></p>\n
		      <img class="text_decoration" src="./img/TextDecoration.png">\n
        </div>\n`;
      var validationFunc=function(input){
        return Number.isInteger(+input) && +input>0 && +input<5;
      }
      Game.waitForInput(null,validationFunc,function(choice){
        if(choice == 1){
          //Caravan.occupation="banker"; Game.gameCaravan.money = 1600
		  Game.gameCaravan.occupation = OCCUPATION.BANKER;
      Game.gameCaravan.money = OCCUPATION.BANKER.cash;
        }
        else if(choice ==2){
          //Caravan.occupation="carpenter"; Game.gameCaravan.money = 400;
          Game.gameCaravan.occupation = OCCUPATION.CARPENTER;
          Game.gameCaravan.money = OCCUPATION.CARPENTER.cash;
        }
        else if(choice == 3){
          //Caravan.occupation="farmer"; Game.gameCaravan.money = 400;
          Game.gameCaravan.occupation = OCCUPATION.FARMER;
          Game.gameCaravan.money = OCCUPATION.FARMER.cash;
        }
        else if(choice == 4){
          Game.gameDiv.innerHTML =
            `<div id="choose_occupation" class=\"centered_content white_black\">\n
              <p>Traveling to Oregon isn't easy! But if you're a banker, you'll have more money for supplies and services than a carpenter or a farmer.</p>\n
              <p>However, the harder you have to try, the more points you deserve! Therefore, the farmer earns the greatest number of points and the banker earns the least</p>\n
            </div>\n
            <p class="prompt white_black">Press ENTER to continue</p>\n`;
          Game.waitForInput(null,null,Game.scenes.chooseOccupation);
          return;
        }
        else{
          Game.scenes.chooseOccupation();
          return;
        }
        Game.scenes.enterNames();
      });
    },
    enterNames: function(){

      Game.gameDiv.innerHTML =
        `<div id="enterNames" class="white_black">\n
		      <img id="family" src="./img/family.png">\n
          <p>\n
            What is the first name of the wagon leader?
            <span id="input"></span>\n
          </p>\n
        </div>\n
`;

      Game.waitForInput(null,function(value) {return (value.length > 0)},function(leadername){

        // Add the leader to the caravan
        var leader = new Person(leadername);
        Game.gameCaravan.addPerson(leader);
		Game.gameCaravan.leader = leadername;

        document.getElementById("enterNames").innerHTML =
          ` <div class="white_black">\n
		      <img id="family" src="./img/family.png">\n
              <p>What are the first names of the four other members in your party?</p>\n
              <ol>\n`
                +'<li>'+leadername+'</li>\n'+
                `<li id="mem1"><span id="input"></span></li>\n
                <li id="mem2"></li>\n
                <li id="mem3"></li>\n
                <li id="mem4"></li>\n
            </div>\n`;
            var nameFunc=function(name){
              var inputEle=document.getElementById("input");
              var index=+inputEle.parentNode.id[3];

              if (name == "") { // if they're done entering names, autofill
                for (var i = index; i <= 4; i++) {
                  Game.gameCaravan.addPerson(new Person(randomName()));
                  document.getElementById('mem'+(i)).innerHTML=Game.gameCaravan.family[i].name;
                }
                Game.gameDiv.innerHTML += `<p class="prompt white_black">Press ENTER to continue</p>\n`;
                Game.waitForInput(null, null, function() {Game.scenes.chooseDepartureMonth()});
                return;
              }
              // Add a new peron to the caravan for each input name
              var newPerson = new Person(name);
              Game.gameCaravan.addPerson(newPerson);

              if(index==4){ // if they've entered all the names
                Game.scenes.chooseDepartureMonth();
                return;
              } else { // they're still entering names
                index++;
                document.getElementById('mem'+index).appendChild(document.getElementById('input'));
                document.getElementById('mem'+(index-1)).innerHTML=inputEle.innerHTML;
                inputEle.innerHTML="_";

                Game.waitForInput(null,null,nameFunc);
              }
            }
            Game.waitForInput(null,null,nameFunc);
      });
    },

	// Screen where the player chooses the departure month, which will set the date and be used to determine weather
    chooseDepartureMonth:function(){
      Game.gameDiv.innerHTML =
      `<div id="chooseMonth" class="white_black centered_content">\n
        <img class="text_decoration" src="./img/TextDecoration.png">\n
        <div>\n
          <p>It is 1848. Your jumping off place for Oregon is Independence, Missouri. You must decide which month to leave Independence.</p>\n
          <ol>\n
            <li>March</li>\n
            <li>April</li>\n
            <li>May</li>\n
            <li>June</li>\n
            <li>July</li>\n
            <li>Ask For advice</li>\n
          </ol>\n
          <p>What is your choice?
            <span id="input"><span>\n
          </p></div>\n
		    <img class="text_decoration" src="./img/TextDecoration.png">
      </div>\n
      `;
      var validationFunc=function(input){
        return Number.isInteger(+input) && +input>0 && +input<7;
      }
      Game.waitForInput(null,validationFunc,function(choice){
        if(choice==1){
          //set departure month to March
          Game.date = new Date("1848-03-01");
        }
        else if(choice==2){
          //set departure month to April
          Game.date = new Date("1848-04-01");
        }
        else if(choice ==3){
          //set departure moth to May
          Game.date = new Date("1848-05-01");
        }
        else if(choice ==4){
          //set departure month to June
          Game.date = new Date("1848-06-01");
        }
        else if(choice==5){
          //set departure month to July
          Game.date = new Date("1848-07-01");
        }
        else if(choice ==6){
          Game.scenes.adviceDepartureMonth();
          return;
        }
        else{
          Game.scenes.chooseDepartureMonth();
        }
        Game.scenes.MattStore();
      });
    },

	// Screen that informs the player of how their choice of departure month may effect the game
    adviceDepartureMonth:function(){
      Game.gameDiv.innerHTML =
        `<div class='white_black centered_content'>\n
		  <img class="text_decoration" src="./img/TextDecoration.png">
          <p>You attend a public meeting held for \"folks with the California - Oregon fever.\" You're told:<br><br>\n
          If you leave too early, there won't be any grass for your oxen to eat. If you leave too late, you may not get to Oregon before winter comes. If you leave at just the right time, there will be green grass and the weather will still be cool.</p>\n
          <img class="text_decoration" src="./img/TextDecoration.png">
		</div>\n
        <p class="prompt white_black">Press ENTER to continue</p>\n`;
      Game.waitForInput(null,null,Game.scenes.chooseDepartureMonth);
    },

	// Screen where the player is introduced to the general store, given advice on purchase of items, and is then allowed to buy items
    MattStore:function(){
      Game.gameDiv.innerHTML =
      `<div class='white_black centered_content'>\n`+
	      `<img class="text_decoration" src="./img/TextDecoration.png">`+
	      `<p>Before leaving Independence you should buy equipment and supplies.`+
	      `You have $` + Game.gameCaravan.occupation.cash + ` in cash, but you don't have to spend it all now.</p>`+
        `<img class="text_decoration" src="./img/TextDecoration.png">`+
      `</div>\n`+
      `<p class="prompt white_black">Press ENTER to continue</p>\n`;

      Game.waitForInput(null,null,function(){
        Game.gameDiv.innerHTML =
          `<div id="matt_intro">\n
            <div id="matt_img"></div>\n
              <div class="white_black">\n
                <p>Hello, I'm Matt. So you're going to Oregon! I can fix you up with what you need:</p>\n
                <ul class="square_list">\n<li>a team of oxen to pull your wagon</li>\n
                  <li>clothing for both summer and winter</li>\n
                  <li>plenty of food for the trip</li>\n
                  <li>bait to catch fish with</li>\n
                  <li>spare parts for your wagon</li>\n
                </ul>\n
              </div>\n
          </div>\n
          <p class="prompt" class="white_black">Press ENTER to continue</p>\n`;
        thestore = new Store(20, 10, 2, 10, 10, 10, 0.2);

        var storeFront = function(){ // start storeFront()
          Game.gameDiv.innerHTML =

          `<div id="mattstore" class="white_black">\n
              <div>\n
                <p>Matt's General Store<br>\n
                Independence, Missouri<br>\n` +
                MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear() + `</p>\n
              </div>\n
              <div>\n
                <div id="matt_img"></div>\n
                <div>\n
				          <hr id = "red_line">
                  <ol class="col2">\n
                    <li>Oxen<span id="oxen_bill">$`+thestore.item_bill(["oxen"]).toFixed(2)+`</span></li>\n
                    <li>Food<span id="food_bill">$`+thestore.item_bill(["food"]).toFixed(2)+`</span></li>\n
                    <li>Clothing<span id="clothing_bill">$`+thestore.item_bill(["clothing"]).toFixed(2)+`</span></li>\n
                    <li>Bait<span id="bait_bill">$`+thestore.item_bill(["bait"]).toFixed(2)+`</span></li>\n
                    <li>Spare Parts<span id="spare_bill">$`+thestore.item_bill(["axles", "tongues", "wheels"]).toFixed(2)+`</span></li>\n
                  </ol>\n
				          <hr id = "red_line">
                  <p>Total Bill: <span id="total_bill">$`+thestore.bill.toFixed(2)+`</span></p>\n
                  <p>Amount you have:<span id="money">$`+Game.gameCaravan.money.toFixed(2)+`</span></p>\n
                  <p>Which item would you like to buy? <span id="input"></span></p>\n
                </div>\n
            </div>\n
          </div>\n
          <p class="prompt white_black">Press SPACE to leave store</p>\n`;
          var validationFunc=function(input){
            return (input==""||(+input&&+input>0&&+input<6));
          }
          Game.waitForInput([13/*enter*/,32/*space*/],validationFunc,function(choice){
            var mattAdvice="";
			var storeImage="./img/";
            var mattFunc=null;
            var validationFunc=null;
            Game.waitForInput(null,validationFunc,mattFunc);
            if(choice == 1){
              mattAdvice=
                `There are 2 oxen in a yoke. I recommend at least 3 yoke, but you need as least one yoke. I charge $40 a yoke.<br><br>\n
                How many yoke do you want? `;
			  storeImage += "oxen.png";
              validationFunc=function(input){
                return Number.isInteger(+input)&&input<=10&&input>=1;
              }
              mattFunc=function(input){
                //add yokes to bill
                thestore.adjust_bill("oxen", input * 2)
                storeFront();
              }
            }
            else if(choice == 2){
              mattAdvice="I recommend 200 pounds of food for each person. How many pounds of food do you want? ";
			  storeImage += "food.png";
              validationFunc=function(input){
                return input.length<5&&Number.isInteger(+input);
              }
              mattFunc=function(input){
                //add food to bill
                thestore.adjust_bill("food", input);
                storeFront();
              }
            }
            else if(choice == 3){
              mattAdvice="I recommend 2 sets of clothing for each person. How many sets of clothes do you want? ";
			  storeImage += "clothing.png";
              validationFunc=function(input){
                return input.length<3&&Number.isInteger(+input);
              }
              mattFunc=function(input){
                //add clothes to bill
                thestore.adjust_bill("clothing", input);
                storeFront();
              }
            }
            else if(choice == 4){
              mattAdvice="Each box of bait holds 20 bait. How many boxes do you want? ";
			  storeImage += "fishing_rod.png";
              validationFunc=function(input){
                return input.length<3&&Number.isInteger(+input);
              }
              mattFunc=function(input){
                //add boxes to bill
                thestore.adjust_bill("bait", input);
                storeFront();
              }
            }
            else if(choice == 5){
              mattAdvice="You can carry 3 wagon wheels.<br>\nHow many wagon wheels? "
			  storeImage += "supplies.png";
              validationFunc=function(input){
                return input.length<2&&Number.isInteger(+input)&&input<=3;
              }
              mattFunc=function(input){
                //add wagon wheels to bill
                thestore.adjust_bill("wheels", input);

                mattAdvice="You can carry 3 wagon axles.<br>\nHow many wagon axles? ";
                document.getElementById("matt_advice").innerHTML=mattAdvice + '<span id="input"></span>';
                Game.waitForInput(null,validationFunc,function(input){
                  //add wagon axles to bill
                  thestore.adjust_bill("axles", input);

                  mattAdvice="You can carry 3 wagon tongues.<br>\nHow many wagon tongues? ";
                  document.getElementById("matt_advice").innerHTML=mattAdvice + '<span id="input"></span>';
                  Game.waitForInput(null,validationFunc,function(input){
                    //add wagon tongues to bill
                    thestore.adjust_bill("tongues", input);
                    storeFront();
                    return;
                  });
                });
              }
            }
            else{ // checkout
              if (thestore.oxen.quantity > 0) { // they must have purchased oxen to leave the store
                if (Game.gameCaravan.purchaseItems(thestore.generate_bill())) { // make sure they have enough money
                  Game.scenes.Landmark(landmarks.Independence);
                } else {
                  Game.alertBox("You don't have enough money to pay your bill.", storeFront); return;
                }
                return;
              } else {
                Game.alertBox("You must have at least one ox to pull your wagon.", storeFront); return;
              }
            }
            Game.gameDiv.innerHTML=
            `<div id="mattstore" class="white_black">\n
              <p>\n
                Matt's General Store<br>\n
                Independence, Missouri<br>\n
              </p>\n
              <p id="matt_advice">\n
              </p>\n
			  <img id = "store_image"></img>
              <p>\n

                Bill so far: $<span id="bill"></span>\n
              </p>\n
            </div>\n
`;
            document.getElementById("bill").innerHTML=thestore.bill.toFixed(2);
            document.getElementById("matt_advice").innerHTML=mattAdvice + '<span id="input"></span>';
			document.getElementById("store_image").src = storeImage;
            Game.waitForInput(null,validationFunc,mattFunc);
          }); // end waitForInput(choice)
        }; // end storeFront()
        Game.waitForInput(null,null,storeFront);
      });
    },

	// Screen that allows a player to purchase items while they are at a landmark
    BuySupply:function(landmark){
      var store=landmark.store;
      Game.gameDiv.innerHTML=`<div id="buy_supply" class="centered_content white_black">\n
       <div>
         `+landmark.name+`
       </div>
        <div id="date" >\n
`+ MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear() +`</div>\n
        <div class="centered_content white_black">\n
          You May Buy:
          <table id="options" class="white_black" style="font-size: 15px;">\n
          </table>\n
        </div>\n
        <p>You have $<span id="money"></span> to spend.</p>\n
        <p>Which number?<span id="input"></span></p>\n
        <p id="how_many"></p>
      </div>\n`;
      var table=document.getElementById("options");
      var items=["oxen", "clothing", "bait", "wheels", "axles", "tongues", "food"];
      var itemName=["Oxen", "Clothing", "Bait", "Wagon wheels", "Wagon axles", "Wagon tongues", "Food"];
      var itemUnit=["ox", "set", "box", "wheel", "axle", "tongue", "pound"];
      for(var i=0;i<items.length;i++){
        var row=table.insertRow(-1);
        row.insertCell(0).innerHTML=i+1+".";
        row.insertCell(1).innerHTML=itemName[i];
        row.insertCell(2).innerHTML=landmark.store[items[i]].cost.toFixed(2);
        row.insertCell(3).innerHTML="per "+itemUnit[i];
      }
      var row=table.insertRow(-1);
      row.insertCell(0).innerHTML=8+".";
      row.insertCell(1).innerHTML="Leave store";
      document.getElementById("money").innerHTML=Game.gameCaravan.money;


      var validationFunc=function(input){
        input=+input;
        return Number.isInteger(input)&&input>0&&input<=8;
      };

      Game.waitForInput(null,validationFunc,function(choice){
        if(choice==8){
          Game.scenes.LandmarkMenu(landmark);
          return;
        }
        else{
          document.getElementById("input").removeAttribute("id");
          if(choice==1){
            document.getElementById("how_many").innerHTML='How many oxen?<span id="input"></span>';
          }
          else if(choice==2){
            document.getElementById("how_many").innerHTML='How many sets?<span id="input"></span>';
          }
          else if(choice==3){
            document.getElementById("how_many").innerHTML='How many boxes?<span id="input"></span>';
          }
          else if(choice==4){
            document.getElementById("how_many").innerHTML='How many wheels?<span id="input"></span>';
          }
          else if(choice==5){
            document.getElementById("how_many").innerHTML='How many axles?<span id="input"></span>';
          }
          else if(choice==6){
            document.getElementById("how_many").innerHTML='How many tongues?<span id="input"></span>';
          }
          else if(choice==7){
            document.getElementById("how_many").innerHTML='How many pounds?<span id="input"></span>';
          }
          else{
            Game.scenes.BuySupply(landmark);
            return;
          }
          var validationFunc=function(input){
            input=+input;
            return Number.isInteger(input)&&input>=0;
          }
          Game.waitForInput(null,validationFunc,function(quantity){
            document.getElementById("input").removeAttribute("id");
            var name=items[choice-1];
            var cost=landmark.store[items[choice-1]].cost;
            if(Game.gameCaravan[name]+Number(quantity)>MAXIMUM[name.toUpperCase()]){
              document.getElementById("buy_supply").innerHTML+="<p>You may only take "+MAXIMUM[name.toUpperCase()]+" "+name+".</p>"
              Game.waitForInput(null,null,function(){Game.scenes.BuySupply(landmark)});
              return;
            }
            Game.gameCaravan.purchaseItems([{item:name,cost:cost,quantity:+quantity}]);
            Game.scenes.BuySupply(landmark);
          });
        }
      })
    },

	// Screen where the player arrives and the river and is told the width and depth of the river
	ArriveAtRiver: function(width, depth, landmark) {

	  var message = "You must cross the river in order to continue. The river at this point is currently " + width +
	  " feet wide and " + depth + " feet deep in the middle."

	  Game.gameDiv.innerHTML =
      `<div id="cross_river_message" class="centered_content white_black">\n
        <img class="text_decoration" src="./img/TextDecoration.png">\n
        <p>` + message + `</p>\n
        <img class="text_decoration" src="./img/TextDecoration.png">\n
      </div>\n
      <p class="prompt" class="white_black">Press ENTER to continue</p>\n`;

	  // The options for crossing the river will be different at Big Blue and Snake River Crossings.
	  if (landmark == "BigBlueRiverCrossing"||landmark.name == "Big Blue River Crossing") {
		Game.waitForInput(null, null, function() {Game.scenes.CrossBigBlue(width, depth) });
	  }
	  else if (landmark == "SnakeRiverCrossing"|| landmark.name == "Snake River Crossing") {
		Game.waitForInput(null, null, function() {Game.scenes.CrossSnakeRiver(width, depth) });
	  }
	  else {
	    Game.waitForInput(null, null, function() {Game.scenes.CrossRiver(width, depth) });
	  }
	},

	// Screen where the player selects from a list of options in order to cross the river, where the river crossing animation
	// is played, and where the result of the crossing attempt is announced (success, lost supplies, drowning)
	CrossRiver:function(width, depth) {
    Game.weather = getWeather(Game.date.getMonth());
		document.getElementById("game").innerHTML =
      `<div id="cross_river" class="centered_content white_black">\n
        <p>`+ landmarks[landmarks.getNextLandMark(Game.miles,Game.branch[0],Game.branch[1],false).landmark].name +`</p>\n
	      <img class="text_decoration" src="./img/TextDecoration.png">\n
        <div id="txt">
          <p>Weather: `+Game.weather+`</p>\n
          <p>River width: ` + width.toFixed(2) + `</p>\n
          <p>River depth: ` + depth.toFixed(2) + `</p>\n
          <p>You may:</p>\n
          <ol>\n
            <li>attempt to ford the river</li>\n
            <li>caulk the wagon and float it across</li>\n
            <li>take a ferry across</li>\n
            <li>wait to see if conditions improve</li>\n
            <li>get more information</li>\n
          </ol>\n
          <p>What is your choice? <span id="input"></span></p>\n
        </div>\n
        <img class="text_decoration" src="./img/TextDecoration.png">\n
      </div>\n`;

    var validationFunc=function(input){
      return Number.isInteger(+input) && +input>0 && +input<6;
    }

    Game.waitForInput(null,validationFunc,function(choice){

      // Ford the river
      if(choice == 1){

        // A depth of more than 1 foot is where risk starts
        if (depth >= 1) {
          // Every 10th of a foot adds a 5% chance of disaster
          var accidentChance = (depth - 1) * 50;

          if (randrange(1, 100) < accidentChance) {
			      eventResult = wagonTipOver(Game.gameCaravan); success = false;
		      } else {
		        eventResult = "You crossed the river safely."; success = true;
          }
		    }
        var time = Game.scenes.animateRiver("ford", success);
        setTimeout(function() {Game.alertBox(eventResult, function(){Game.scenes.Journey(true)})}, time + 500);
      }

      //Float across the river
      else if(choice ==2){
        var success = true;
        if (randrange(1, 100) < 30) {
		  var eventResult = wagonTipOver(Game.gameCaravan);
          success = false;
		}

		else {
		  eventResult = "You crossed the river safely."; success = true;
        }

        var time = Game.scenes.animateRiver("float", success);
        setTimeout(function() {Game.alertBox(eventResult, function(){Game.scenes.Journey(true)})}, time + 500);
      }

	  // Take the ferry
      else if(choice == 3){
        if (randrange(1, 5) <= 2) {
          Game.passDays(1);
          if (randrange(1, 10) > 5) {
          // Round to 2 decimal places
            var newDepth = depth - Math.round(Math.random()) / 100;
          } else {
            var newDepth = depth + Math.round(Math.random()) / 100;
          }

          if (randrange(1, 10) > 5) {
            var newWidth = width - Math.round(Math.random()) / 100;
          } else {
            var newWidth = width + Math.round(Math.random()) / 100;
          }
            Game.alertBox("No ferry comes around today. Lose one day waiting", function() {Game.scenes.CrossRiver(newWidth, newDepth)});
        }

        else {
          document.getElementById("txt").innerHTML = "The ferry operator says that he will charge you $5.00, and that you will have to wait 6 days. Are you willing to do this? <span id='input'>_</span>";
          Game.waitForInput(null, function(input) {return input.toUpperCase() == "Y" || input.toUpperCase() == "N"}, function(input) {
            if (input.toUpperCase() == "Y") {
              Game.gameCaravan.money -= 5;
              Game.passDays(6);
              var time = Game.scenes.animateRiver("ferry", true);
              setTimeout(function() {Game.alertBox("The ferry got you across safely.", function(){Game.scenes.Journey(true)})}, time + 500);
            } else {
              Game.scenes.CrossRiver(width, depth);
            }
          })
        }
      }

	  //let a day pass and change the width/depth slightly
      else if(choice == 4) {

        // See if it gets deeper or shallower
        if (randrange(1, 10) > 5) {
          // Round to 2 decimal places
          var newDepth = depth - Math.round(Math.random()) / 100;
        } else {
          var newDepth = depth + Math.round(Math.random()) / 100;
        }

        if (randrange(1, 10) > 5) {
          var newWidth = width - Math.round(Math.random()) / 100;
        } else {
          var newWidth = width + Math.round(Math.random()) / 100;
        }

        Game.passDays(1);
        Game.scenes.CrossRiver(newWidth, newDepth);
      }

      else if(choice == 5) {

	    Game.scenes.CrossingInfo(1, width, depth);
      }
    });
  },

  // This is a modified CrossRiver() function for the Big Blue River, which has no ferry
  CrossBigBlue(width, depth) {

		Game.gameDiv.innerHTML =
      `<div id="cross_river" class="centered_content white_black">\n
	      <img class="text_decoration" src="./img/TextDecoration.png">\n
        <p>Weather: `+Game.weather+`</p>\n
        <p>River width: ` + width.toFixed(2) + `</p>\n
        <p>River depth: ` + depth.toFixed(2) + `</p>\n
        <p>You may:</p>\n
        <ol>\n
          <li>attempt to ford the river</li>\n
          <li>caulk the wagon and float it across</li>\n
          <li>wait to see if conditions improve</li>\n
          <li>get more information</li>\n
        </ol>\n
        <img class="text_decoration" src="./img/TextDecoration.png">\n
        <p>What is your choice? <span id="input"></span></p>\n
      </div>\n`;

    var validationFunc=function(input){
      return Number.isInteger(+input) && +input>0 && +input<5;
    }

    Game.waitForInput(null,validationFunc,function(choice){

      // Ford the river
      if(choice == 1){

        // A depth of more than 1 foot is where risk starts
        if (depth >= 1) {
          // Every 10th of a foot adds a 5% chance of disaster
          var accidentChance = (depth - 1) * 50;

          if (randrange(1, 100) < accidentChance) {
			      eventResult = wagonTipOver(Game.gameCaravan); success = false;
		      } else {
		        eventResult = "You crossed the river safely."; success = true;
          }
		    }
        var time = Game.scenes.animateRiver("ford", success);
        setTimeout(function() {Game.alertBox(eventResult, function(){Game.scenes.Journey(true)})}, time + 500);
      }

      //Float across the river
      else if(choice ==2){
        var success = true;
        if (randrange(1, 100) < 30) {
		  var eventResult = wagonTipOver(Game.gameCaravan);
          success = false;
		}

		else {
		  eventResult = "You crossed the river safely."; success = true;
        }

        var time = Game.scenes.animateRiver("float", success);
        setTimeout(function() {Game.alertBox(eventResult, function(){Game.scenes.Journey(true)})}, time + 500);
      }

	  //let a day pass and change the width/depth slightly
      else if(choice == 3) {

        // See if it gets deeper or shallower
        if (randrange(1, 10) > 5) {
          // Round to 2 decimal places
          var newDepth = depth - Math.round(Math.random()) / 100;
        } else {
          var newDepth = depth + Math.round(Math.random()) / 100;
        }

        if (randrange(1, 10) > 5) {
          var newWidth = width - Math.round(Math.random()) / 100;
        } else {
          var newWidth = width + Math.round(Math.random()) / 100;
        }

        Game.passDays(1);
        Game.scenes.CrossRiver(newWidth, newDepth);
      }

      else if(choice == 4) {

	    Game.scenes.CrossingInfo(1, width, depth);
      }
    });
  },

  // This is a modified CrossRiver() function for the Snake River, which has the option to hire an Indian to guide you across
  CrossSnakeRiver(width, depth) {

		Game.gameDiv.innerHTML =
      `<div id="cross_river" class="centered_content white_black">\n
	      <img class="text_decoration" src="./img/TextDecoration.png">\n
        <p>Weather: `+Game.weather+`</p>\n
        <p>River width: ` + width.toFixed(2) + `</p>\n
        <p>River depth: ` + depth.toFixed(2) + `</p>\n
        <p>You may:</p>\n
        <ol>\n
          <li>attempt to ford the river</li>\n
          <li>caulk the wagon and float it across</li>\n
		  <li>hire an indian to help you cross the river</li>\n
          <li>wait to see if conditions improve</li>\n
          <li>get more information</li>\n
        </ol>\n
        <img class="text_decoration" src="./img/TextDecoration.png">\n
        <p>What is your choice? <span id="input"></span></p>\n
      </div>\n`;

    var validationFunc=function(input){
      return Number.isInteger(+input) && +input>0 && +input<6;
    }

    Game.waitForInput(null,validationFunc,function(choice){

      // Ford the river
      if(choice == 1){

        // A depth of more than 1 foot is where risk starts
        if (depth >= 1) {
          // Every 10th of a foot adds a 5% chance of disaster
          var accidentChance = (depth - 1) * 50;

          if (randrange(1, 100) < accidentChance) {
			      eventResult = wagonTipOver(Game.gameCaravan); success = false;
		      } else {
		        eventResult = "You crossed the river safely."; success = true;
          }
		    }
        var time = Game.scenes.animateRiver("ford", success);
        setTimeout(function() {Game.alertBox(eventResult, function(){Game.scenes.Journey(true)})}, time + 500);
      }

      //Float across the river
      else if(choice ==2){
        var success = true;
        if (randrange(1, 100) < 30) {
		  var eventResult = wagonTipOver(Game.gameCaravan);
          success = false;
		}

		else {
		  eventResult = "You crossed the river safely."; success = true;
        }

        var time = Game.scenes.animateRiver("float", success);
        setTimeout(function() {Game.alertBox(eventResult, function(){Game.scenes.Journey(true)})}, time + 500);
      }

	  else if(choice == 3) {

		if (Game.gameCaravan.clothing < 3) {

		  var message = "This Native American can take you accross the river safely in exchange for 3 sets of clothes."+
		  " You don't have enough clothes to give him.";
		  Game.dialogBox(message, function() {Game.scenes.CrossSnakeRiver(width, depth)});
		  document.getElementById("DialogBox").style.top = "-100%";
		}

		else {
		  var message = "This Native American can take you accross the river safely in exchange for 3 sets of clothes."
		  Game.dialogBox(message, function() {Game.scenes.CrossSnakeRiver(width, depth)});
		  Game.gameDiv.innerHTML =
		  `<div id="indian_cross_river" class="centered_content white_black">\n
	        <img class="text_decoration" src="./img/TextDecoration.png">\n
		    <p>` + message + `</p>
		    <br>
		    <p>Do you want him to help you cross?(Y/N) <span id="input"></span></p>\n
		  </div>`

		  var validationFunc=function(input){
              input=input.toUpperCase();
              return input=="Y"||input=="N";
          }
          Game.waitForInput(null,validationFunc,function(input){
		    if(input.toUpperCase()=="Y"){
              var time = Game.scenes.animateRiver("ferry", true);
              setTimeout(function() {Game.alertBox("The Indian got you accross safely.", function(){Game.scenes.Journey(true)})}, time + 500);
            }
			else {
			  Game.scenes.CrossSnakeRiver(width, depth);
			}
		  });
	    }
	  }

	  //let a day pass and change the width/depth slightly
      else if(choice == 4) {

        // See if it gets deeper or shallower
        if (randrange(1, 10) > 5) {
          // Round to 2 decimal places
          var newDepth = depth - Math.round(Math.random()) / 100;
        } else {
          var newDepth = depth + Math.round(Math.random()) / 100;
        }

        if (randrange(1, 10) > 5) {
          var newWidth = width - Math.round(Math.random()) / 100;
        } else {
          var newWidth = width + Math.round(Math.random()) / 100;
        }

        Game.passDays(1);
        Game.scenes.CrossRiver(newWidth, newDepth);
      }

      else if(choice == 5) {

	    Game.scenes.CrossingInfo(1, width, depth);
      }
    });
  },

  // Screen where inforamtion about the river crossing options is displayed
  CrossingInfo:function(counter, width, depth) {

	// Create a new dialog box explaining each option
	if (counter == 1) {

	  var message = "To ford a river means to pull your wagon across a shallow part of the river with your oxen still attached.";
	  Game.dialogBox(null, function() {Game.scenes.CrossingInfo(2, width, depth)});
	  document.getElementById("DialogBox").innerHTML = `<img class="text_decoration" src="./img/TextDecoration.png"><br>` + message;
	  document.getElementById("DialogBox").style.top = "-100%";
	  document.getElementById("DialogBox").innerHTML += `<img class="text_decoration" src="./img/TextDecoration.png">\n`;
	}

	if (counter == 2) {

	  var message = "To caulk the wagon means to seal it so that no water can get in. The wagon can then be floated accross like a boat.";
	  Game.dialogBox(message, function() {Game.scenes.CrossingInfo(3, width, depth)});
	  document.getElementById("DialogBox").style.top = "-100%";
	}

	if (counter == 3) {

	  var message = "To use a ferry means to put your wagon on top of a flat boat belonging to someone else." +
	  "The owner of the ferry will take your wagon across the river.";
	  Game.dialogBox(message, function() { Game.scenes.CrossRiver(width, depth); });
	  document.getElementById("DialogBox").style.top = "-100%";
	}
  },

    // Screen that the player looks at while they are traveling between landmarks. Performs several functions including:
	//   - Animates the caravan moving between landmarks
	//   - Updates information about the caravan and the weather
	//   - Checks if a gravestone has been passed and asks if the player wants to examine it
	//   - Determines if a random event occurs and displays the results if one does occur
	//   - Checks if all caravan members are dead
	//   - Allow the player to select a branching path when a fork occurs in the trail
    Journey:function(leavingLandmark){
      Game.gameDiv.innerHTML =

        `<div id="journey" class="centered_content white_black">\n
          <div id="animation">\n
            <img id="landmark"/>\n
            <div id="bg"></div>\n
            <img id="oxen" src="./img/oxen_standing.png">\n
          </div>\n
          <div id="ground"></div>\n
          <div id="status" class="black_white">\n
            <p class="white_black">press ENTER to size up the situation</p>\n
            <ul class="plain_list">\n
              <li>Date: <span id="date"></span></li>\n
              <li>Weather: <span id="weather"></span></li>\n
              <li>Health: <span id="health"></span></li>\n
              <li>Food: <span id="food"></span></li>\n
              <li>Next Landmark: <span id="next_landmark"></span></li>\n
              <li>Miles Traveled: <span id="miles"></span></li>\n
          </ul>\n

        </div>\n`;

        var nextLandmark=landmarks.getNextLandMark(Game.miles,Game.branch[0],Game.branch[1],leavingLandmark);
        document.getElementById("landmark").style.right = 33 + nextLandmark.milesToNext + "%";
        document.getElementById("date").innerHTML=  MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear() ;
        document.getElementById("weather").innerHTML = Game.weather = getWeather(Game.date.getMonth());
        document.getElementById("health").innerHTML=Game.gameCaravan.getHealth();
        document.getElementById("food").innerHTML=Game.gameCaravan.food;
        document.getElementById("next_landmark").innerHTML=nextLandmark.milesToNext;
        document.getElementById("miles").innerHTML=Game.miles;
        document.getElementById("bg").style.backgroundImage = landmarks[nextLandmark.landmark].bg ? Game.bg = "url(./img/" + landmarks[nextLandmark.landmark].bg + ")" : Game.bg;
        document.getElementById("ground").style.backgroundColor = landmarks[nextLandmark.landmark].ground ? Game.ground = landmarks[nextLandmark.landmark].ground : Game.ground;

        var checkLandmark = function(callback) {
          if(nextLandmark.milesToNext==0){
              Game.alertBox("You are now at "+landmarks[nextLandmark.landmark].name+'. Would you like to look around? ');
              document.getElementById("AlertBox").innerHTML+='<span id="input"></span>';
              document.getElementById("oxen").src = "./img/oxen_standing.png";
              var validationFunc=function(input){
                input=input.toUpperCase();
                return input=="Y"||input=="N";
              }
              Game.waitForInput(null,validationFunc,function(stopAtLandmark){
                Game.removeAlertBox();
                if(stopAtLandmark.toUpperCase()=="Y"){
                  Game.scenes.Landmark(landmarks[nextLandmark.landmark]);
                }
                else {
                  if(landmarks[nextLandmark.landmark].river){
                    // Determine a random width and depth
                    width = randrange(80, 300);
                    depth = randrange(1, 5);

                    Game.scenes.ArriveAtRiver(width, depth, nextLandmark.landmark);
                  }

                  else if(nextLandmark.landmark=="WillametteValley"){//game finished

                    Game.alertBox("Congratulations! You have made it to Oregon! Let's see how many points you have received.",Game.scenes.Results);
                  }
                  else{
                    Game.scenes.Journey(true);
                  }
                }
              });
              return;
            } else {
              callback();
            }
        };

        var updateDay = function() {
          /*update status and html*/
          document.getElementById("date").innerHTML=  MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear() ;
          document.getElementById("weather").innerHTML= Game.weather = getWeather(Game.date.getMonth());
          document.getElementById("health").innerHTML=Game.gameCaravan.getHealth();
          document.getElementById("food").innerHTML=Game.gameCaravan.updateFood();
          document.getElementById("miles").innerHTML =  Game.miles;// += Math.floor(Game.gameCaravan.getMph() * Game.gameCaravan.pace.rate);
          document.getElementById("next_landmark").innerHTML=nextLandmark.milesToNext;
        };

        var examineTombstone = function(tombstone, callback) {
          // did we pass a tombstone?
          if (tombstone != null) {
            Game.alertBox("You passed a tombstone. Would you like to examine it? ");
            document.getElementById("AlertBox").innerHTML+='<span id="input"></span>';
            var validationFunc=function(input){
              input=input.toUpperCase();
              return input=="Y"||input=="N";
            }
            Game.waitForInput(null,validationFunc,function(examine){
              Game.removeAlertBox();
              if(examine.toUpperCase()=="Y"){
                Game.scenes.Tombstone("Here lies "+tombstone.name+"<br><br>"+tombstone.epitaph);
              }
              else {
                callback();
              }
            });
          } else {
            callback();
          }
        };

        var checkDeath = function(callback) {
          // get deaths
          var deaths = Game.gameCaravan.updateHealth();

          if (Game.gameCaravan.family.length == 0) { // see if everyone's dead
            Game.alertBox("Everyone is dead.", Game.setTombstone);
          }
          else if (deaths.length > 0) { // see if anyone died
            for (var i in deaths) {
              Game.alertBox(deaths[i] + " has died.");
            }
            Game.removeAlertBox();
            Game.waitForInput(null, null, function(){
            	Game.removeAlertBox();
            	callback();
            });
          } else { // no one died
            callback();
          }
        };

        var checkEvent = function(callback) {
          // see if random event happened (50% chance)
          var eventChance = (Math.random() * 10);
          if (eventChance < 5) {
            var eventResult = randomEvent(Game.gameCaravan);
            if(Game.gameCaravan.food==0){
              eventResult = getDisease(Game.gameCaravan);
            }
            // Random event will return null if event was inapplicable
            if (eventResult != null) {
              Game.alertBox(eventResult, function() {
			
        // See if the wagon has been disabled
			    if ((eventResult == "A wagon wheel broke") && (Game.gameCaravan.wheels == 0)) {
				  Game.gameCaravan.disabled = true;
				  Game.gameCaravan.neededPart = "wagon wheel";
				  Game.scenes.WagonDisabled();
				}
				else if ((eventResult == "Your wagon tongue broke") && (Game.gameCaravan.wheels == 0)) {
				  Game.gameCaravan.disabled = true;
				  Game.gameCaravan.neededPart = "wagon tongue";
				  Game.scenes.WagonDisabled();
				}
				else if ((eventResult == "Your wagon axle broke") && (Game.gameCaravan.wheels == 0)) {
				  Game.gameCaravan.disabled = true;
				  Game.gameCaravan.neededPart = "wagon axle";
				  Game.scenes.WagonDisabled();
				}
				else {
                  callback();
                }
              });
            } else {
              callback();
            }
          } else {
            callback();
          }
        };
        // listen for going to trailmenu after day
        var travelFunc=function(){
          var checkStatus = false;
          document.onkeydown = function(key) {
            var x = key.charCode || key.keyCode;
            if (x == 13)
              checkStatus = true
          };
          // update day's info
          Game.date.setDate(Game.date.getDate()+1);
          nextLandmark=landmarks.getNextLandMark(Game.miles,Game.branch[0],Game.branch[1],leavingLandmark);
          var travelled = Math.min(Game.gameCaravan.getMph()*Game.gameCaravan.pace.rate,nextLandmark.milesToNext);
          Game.miles+= travelled;
          nextLandmark=landmarks.getNextLandMark(Game.miles,Game.branch[0],Game.branch[1]);

          document.getElementById("landmark").setAttribute("src", "./img/" + landmarks[nextLandmark.landmark].icon);

          // day's events
          setTimeout(function(){
            var timeTraveled=travelled/Game.gameCaravan.getMph();
            document.getElementById("landmark").style.right = 33 + nextLandmark.milesToNext + "%";
            document.getElementById("landmark").style.transitionDuration = 200*timeTraveled + "ms";
            document.getElementById("oxen").src="./img/oxen_walking.gif";
            setTimeout(function() {
              document.getElementById("oxen").src = "./img/oxen_standing.png";
              updateDay();
              checkEvent(function(){
                checkDeath(function(){
                  var tombstone = Game.tombstones.find(function(stone){
                    return stone.mile <= Game.miles && stone.mile > Game.miles - travelled;
                  });
                  examineTombstone(tombstone, function(){
                    checkLandmark(function() {
                      checkStatus ? Game.scenes.TrailMenu() : travelFunc();
                    })
                  });
                })
              });
            }, 200*timeTraveled);
          }, 1000);
        } // end travelFunc


        if(leavingLandmark){
          var currentLandmark=landmarks.getNextLandMark(Game.miles,Game.branch[0],Game.branch[1]);
          var alertNextLandmark=function(){
            Game.alertBox("From "+landmarks[currentLandmark.landmark].name+" it is "+nextLandmark.milesToNext+" miles to "+landmarks[nextLandmark.landmark].name+".");
            Game.waitForInput(null,null,function(){
              Game.removeAlertBox();
              travelFunc();
            });
          }
          if(currentLandmark.landmark=="TheDalles"&&leavingLandmark!="leaveTheDalles"){
            Game.scenes.TheDalles();
          }
          else if (Object.keys(landmarks[currentLandmark.landmark].routes).length>1){//if trail branches
            var list="";
            if(currentLandmark.landmark=="SouthPass")
              list= `
                <ol>
                  <li>head for Green River Crossing</li>
                  <li>head for Fort Bridger</li>
                  <li>see the map</li>
                </ol>`;
            else if(currentLandmark.landmark=="BlueMountains")
              list=`
              <ol>
                <li>head for FortWallaWalla</li>
                <li>head for TheDalles</li>
                <li>see the map</li>
              </ol>
            `;

            Game.alertBox('The trail divides here. You may:'+list+'What is your choice?<span id="input"></span>');
            var validationFunc=function(input){
              return input==1||input==2||input==3;
            }
            Game.waitForInput(null,validationFunc,function(choice){
              Game.removeAlertBox();
              if(choice==3){
                Game.scenes.ShowMap(function(){Game.scenes.Journey(true)});
                return;
              }
              if(currentLandmark.landmark=="SouthPass"){
                Game.branch[0]=+choice-1;
              }
              else if(currentLandmark.landmark=="BlueMountains"){
                Game.branch[1]=+choice-1;
              }

              nextLandmark=landmarks.getNextLandMark(Game.miles,Game.branch[0],Game.branch[1],true);
              alertNextLandmark();
            });//end wait for input for branch choice
          }// end if trail branches
          else{
            alertNextLandmark();
          }
        }//endif leaving landmark
        else{
          travelFunc();
        }

    },

	// Screen that appears a wagon component broke with no replacement parts availabled
	WagonDisabled: function() {

	  Game.alertBox("Your " + Game.gameCaravan.neededPart + " has broken. Would you like to try and repair it?");

	  document.getElementById("AlertBox").innerHTML+='<span id="input"></span>';

	  var validationFunc=function(input){
        input=input.toUpperCase();
        return input=="Y"||input=="N";
      };
	  Game.waitForInput(null,validationFunc,function(input){
	  Game.removeAlertBox();
        if(input.toUpperCase()=="Y") {
			
          if (attemptToFixWagon(Game.gameCaravan) == true) {
			
			Game.alertBox("You were able to repair the " + Game.gameCaravan.neededPart + ".", Game.scenes.Journey);
			Game.gameCaravan.neededPart = "";
		  	Game.gameCaravan.disabled = false;
		  }
		  else {
			Game.alertBox("You were not able to repair the " + Game.gameCaravan.neededPart + ".", function() {Game.scenes.WagonDisabledInfo(1)});
		  }
		}
        else {
          Game.scenes.WagonDisabledInfo(1);
		}
      });
	},

	// Screen that informs the player that a replacement part must be traded for in order to get the wagon moving again
	WagonDisabledInfo: function(counter) {

	  Game.removeAlertBox();

	  if (counter == 1) {

		var message = "Since your " + Game.gameCaravan.neededPart + " was not repaired, you will have to trade for a new one.";
	    Game.alertBox(message, function() {Game.scenes.WagonDisabledInfo(2)});
	  }

	  if (counter == 2) {
	    var message = "Until you get a new " + Game.gameCaravan.neededPart + ", you will be stuck in place.";
	    Game.alertBox(message, Game.scenes.TrailMenu);
	  }
	},

	// Screen where the player selects the final option before the end of the game, either taking the toll or floating
	// down the river
    TheDalles: function(){
      Game.gameDiv.innerHTML=
      `<div id="dalles" class="centered_content white_black">
        <img class="text_decoration" src="./img/TextDecoration.png">
        <div id="content">
          <p>The trail divides here.</p>
          <p>You may:</p>
          <ol>
            <li>Float down the Columbia River</li>
            <li>Take the Barlow Toll Road</li>
          </ol>
          <p>What is your choice?<span id="input"></span></p>
        </div>
        <img class="text_decoration" src="./img/TextDecoration.png">
      </div>`;
      var validationFunc=function(input){
        return input==1||input==2;
      };
      Game.waitForInput(null,validationFunc,function(choice){
        if(choice==1){
          Game.scenes.RiverCrossingGame();
        }
        else{
          document.getElementById("content").innerHTML=
          `<p>You must pay $14.00 to travel the Barlow road. Are you willing to do this?
            <span id="input"><span>
          </p>
          `;
          var validationFunc=function(input){
            input =input.toUpperCase();
            return input=="Y"||input=="N";
          }
          Game.waitForInput(null,validationFunc,function(input){
            input=input.toUpperCase();
            if(input=="Y"){
              Game.gameCaravan.money-=14;
              Game.scenes.Journey("leaveTheDalles");
            }
            else{
              Game.scenes.TheDalles();
            }
          })
        }
      });
    },

	// Screen that displays a tombstone when the player passes one and chooses to examine it
    Tombstone : function(message, callback) {
      Game.gameDiv.innerHTML=`
        <div id="tombstone" class="centered_content">\n
          <p id="msg">hello<br>is it me you're<br> looking for?</p>
        </div>\n
        <p class="prompt white_black">Press ENTER to continue</p>\n`;

  	  document.getElementById("msg").innerHTML = message;
      Game.waitForInput(null, null, function() {Game.scenes.Journey(false)});
    },

	// Screen the comes up when the player hits "Enter" while traveling between landmarks. Allows them to select
	// between several options or continue traveling
    TrailMenu: function(){
      Game.gameDiv.innerHTML=`
        <div id="trail_menu" class="centered_content white_black">\n
          <div id="date" >`+ MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear() +`</div>\n

          <div id="conditions">\n
            Weather: <span id = "conditions_weather">`+ Game.weather +`</span><br>\n
            Health: <span id = "conditions_health">`+ Game.gameCaravan.getHealth() +`</span><br>\n
            Pace: `+ Game.gameCaravan.pace.string +`<br>\n
            Rations: `+ Game.gameCaravan.rations.string +`<br>\n
          </div>\n
          <div id="options">\n
            You May:
            <ol>\n
              <li>Continue on trail</li>\n
              <li>Check supplies</li>\n
              <li>Look at map</li>\n
              <li>Change pace</li>\n
              <li>Change food rations</li>\n
              <li>Stop to rest</li>\n
              <li>Attempt to trade</li>\n
              <li>Fish for food</li>\n
            </ol>\n
          </div>\n
          <p>What is your choice? <span id="input"></span></p>\n
        </div>\n`;
      var validationFunc=function(input){
        return  +input>0 && +input<9;
      }
      Game.waitForInput(null,validationFunc,function(input){
        if(input==1) {
		  if (Game.gameCaravan.disabled == true) {
			Game.alertBox("You need to get a new " + Game.gameCaravan.neededPart + " before you can continue", Game.scenes.TrailMenu);
		  }
		  else {
           Game.scenes.Journey();
		  }
		}
        else if (input==2)
          Game.scenes.CheckSupply(Game.scenes.TrailMenu);
        else if(input==3)
          Game.scenes.ShowMap(Game.scenes.TrailMenu);
        else if(input==4)
          Game.scenes.ChangePace(Game.scenes.TrailMenu);
		else if(input == 5)
		  Game.scenes.ChangeRations(Game.scenes.TrailMenu);
		else if(input == 6)
		  Game.scenes.StopToRest(Game.scenes.TrailMenu);
		else if(input == 7)
	      Game.trading(Game.scenes.TrailMenu);
		else if(input == 8)
		  Game.fishingGame();
        else
          Game.scenes.TrailMenu();
      });
    },

	// Screen that the players see when the player selects the "Check Supplies" option in the menu
    CheckSupply: function(returnScene){
      Game.gameDiv.innerHTML =
      `<div id="check_supplies" class="centered_content white_black">\n
        <p>Your Supplies</p>\n
        <ul class="square_list">\n
          <li>oxen: <span>`+ Game.gameCaravan.oxen +`</span></li>\n
          <li>sets of clothing: <span>`+ Game.gameCaravan.clothing +`</span></li>\n
          <li>bait: <span>`+ Game.gameCaravan.bait +`</span></li>\n
          <li>wagon wheels: <span>`+ Game.gameCaravan.wheels +`</span></li>\n
          <li>wagon axles: <span>`+ Game.gameCaravan.axles +`</span></li>\n
          <li>wagon tongues: <span>`+ Game.gameCaravan.tongues +`</span></li>\n
          <li>pounds of food: <span>`+ Game.gameCaravan.food +`</span></li>\n
          <li>money left: <span>$`+ Game.gameCaravan.money.toFixed(2) +`</span></li>\n
        </ul>\n
      </div>\n
      <p class="prompt white_black">Press ENTER to continue</p>\n`;
      Game.waitForInput(null, null, returnScene);
    },

	// Screen that displays the map when the player selects the "Look at Map" option
    ShowMap: function(returnScene){
      Map.display(Game.miles);
      Game.waitForInput([13/*enter*/,32/*space*/],null,returnScene);
    },

	// Screen that displays option for the caravan's pace when the player selects the "Change Pace" option
	ChangePace: function(returnScene) {
    returnScene=returnScene||Game.scenes.TrailMenu;
	  Game.gameDiv.innerHTML =
	  `<div id="check_supplies" class="centered_content white_black">\n
	    <img class="text_decoration" src="./img/TextDecoration.png">\n
	    <p>Change Pace\n
		(currently "` + Game.gameCaravan.pace.string + `")</p>
		<p>The pace at which you travel can change. Your choices are:</p>
		<ol>\n
		  <li>A steady pace</li>
		  <li>A strenuous pace</li>
		  <li>A grueling pace</li>
		  <li>Find out what these different paces mean</li>
		</ol>
		<p>What is your choice? <span id="input"></span></p>\n
		<img class="text_decoration" src="./img/TextDecoration.png">\n
      </div>`;

	  var validationFunc=function(input){
        return Number.isInteger(+input) && +input>0 && +input<5;
      }

      Game.waitForInput(null,validationFunc,function(choice){

	    if (choice == 1) {

	      Game.gameCaravan.pace = PACE.STEADY;
		  returnScene();
	    }
	    else if (choice == 2) {

		  Game.gameCaravan.pace = PACE.STRENUOUS;
		  returnScene();
	    }
	    else if (choice == 3) {

		  Game.gameCaravan.pace = PACE.GRUELING;
		  returnScene();
	    }
		else if (choice == 4) {
		  Game.scenes.PaceInfo();
		}
	  });
	},

	// Screen that displays information about the caravan's pace options
	PaceInfo: function() {
	  Game.gameDiv.innerHTML =
	  `<div id="pace_info" class="centered_content white_black">\n
	    <p>Steady - You travel about 8 hours a day, taking frequent rests. You take care not to get too tired.</p><br>\n
		<hr id = "blue_line">
		<p>Strenuous - You travel about 12 hours a day, starting just after sunrise and stopping shortly before sunset.` +
		`You stop to rest only when necessary. You finish each day feeling very tired.</p><br>\n
		<hr id = "blue_line">
		<p>Grueling - You travel about 16 hours a day, starting before sunrise and continuing until dark.` +
		  `You almost never stop to rest. You do not get enough sleep at night. You finish each day feeling absolutely` + `
		  exhausted, and your health suffers.</p>
    </div>
    <p class = "prompt white_black">Press ENTER to continue</p>\n`;

	  Game.waitForInput(null, null, Game.scenes.ChangePace);;
	  return;
	},

	// Screen that allows the player to select the amount of rations used when they select the "Change Rations" option
	ChangeRations: function(returnScene) {
    returnScene=returnScene||Game.scenes.TrailMenu;
	  Game.gameDiv.innerHTML =
	  `<div id="check_supplies" class="centered_content white_black">\n
	    <img class="text_decoration" src="./img/TextDecoration.png">\n
	    <p>Change Food Rations\n
		(currently "` + Game.gameCaravan.rations.string + `")</p>
		<p>The amount of food the people in your party eat each day can change. Your choices are:</p>
		<ol>\n
		  <li>Filling - meals are large and generous.</li>
		  <br>
		  <li>Meager - meals are small, but adequate.</li>
		  <br>
		  <li>Bare bones - meals are very small; everyone stays hungry.</li>
		</ol>
		<p>What is your choice? <span id="input"></span></p>\n
		<img class="text_decoration" src="./img/TextDecoration.png">\n
      </div>`;

	  var validationFunc=function(input){
        return Number.isInteger(+input) && +input>0 && +input<4;
      }

	  Game.waitForInput(null,validationFunc,function(choice){

	    if (choice == 1) {

	      Game.gameCaravan.rations = RATIONS.FILLING;
		  returnScene();
	    }
	    else if (choice == 2) {

		  Game.gameCaravan.rations = RATIONS.MEAGER;
		  returnScene();
	    }
	    else if (choice == 3) {

		  Game.gameCaravan.rations = RATIONS.BAREBONES;
		  returnScene();
	    }
	  });
	},

	// Function that asks the player how many days they would like to rest, and passes the time. Consumes rations and heals caravan members
	StopToRest: function(returnScene) {
    returnScene=returnScene||Game.scenes.TrailMenu;
	  document.getElementById("input").remove();
	  Game.gameDiv.innerHTML += `<p id="AlertBox" class="white_black">How many days would you like to rest? <span id="input"></span></p>\n`;

	  var validationFunc=function(input){
      return Number.isInteger(+input) && +input>=0 && +input<20;
    }

	  Game.waitForInput(null,validationFunc,function(choice){
      var i = 1;
      function restADay () {
        setTimeout(function () {
          Game.date.setDate(Game.date.getDate()+1);
          document.getElementById("date").innerHTML = MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear()
          document.getElementById("conditions_weather").innerHTML = Game.weather = getWeather(Game.date.getMonth());
          document.getElementById("conditions_health").innerHTML = Game.gameCaravan.health.string;
          Game.gameCaravan.updateFood();

          var family = Game.gameCaravan.family;

          for (var j = 0; j < family.length; j++) {
            family[j].heal(10);
          }

          i++;
          if (i < choice) { restADay(); }
        }, 1000)
      }
      restADay();
      returnScene();
    })
  },

  // Screen that shows the picture of the landmark.
  Landmark: function(landmark){
    Game.gameDiv.innerHTML=`
      <div id="landmark" class="centered_content white_black">
        <img src="`+landmark.img+`" style="width:100%; height:70%;">
        <div style="background-color:white; color:black; width: 70%;text-align:center;">
          <p>`+landmark.name+`</p>
          <p>`+MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear() +`</p>
        </div>
      </div>
      <p class = "prompt white_black">Press ENTER to continue</p>`;

      if(landmark==landmarks.WillametteValley){
        //go to result scene
        Game.waitForInput(null,null,function(){
            Game.alertBox("Congratulations! You have made it to Oregon! Let's see how many points you have received.",Game.scenes.Results);
        });
        return;
      }

      Game.waitForInput(null,null,function(){Game.scenes.LandmarkMenu(landmark)});

  },

   // Screen that displays the options a player may select while they are currently at a landmark
   LandmarkMenu: function(landmark){
     Game.gameDiv.innerHTML=`
       <div id="landmark_menu" class="centered_content white_black">\n
        <div>
          `+landmark.name+`
        </div>
         <div id="date" >`+ MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear() +`</div>\n

         <div id="conditions">\n
           Weather: <span id = "conditions_weather">`+ Game.weather +`</span><br>\n
           Health: <span id = "conditions_health">`+Game.gameCaravan.getHealth() +`</span><br>\n
           Pace: `+ Game.gameCaravan.pace.string +`<br>\n
           Rations: `+ Game.gameCaravan.rations.string +`<br>\n
         </div>\n
		 <br>
         <div>\n
           You May:
           <ol id="options">\n
             <li>Continue on trail</li>\n
             <li>Check supplies</li>\n
             <li>Look at map</li>\n
             <li>Change pace</li>\n
             <li>Change food rations</li>\n
             <li>Stop to rest</li>\n
             <li>Attempt to trade</li>\n
             <li>Talk to People</li>\n
             <li id="buy_supply">Buy Supplies</li>\n
           </ol>\n
         </div>\n
         <p>What is your choice? <span id="input"></span></p>\n

       </div>\n`;
       if(!landmark.store){
         document.getElementById("buy_supply").style.display="none";
       }
       var validationFunc=function(input){
         if(!Number.isInteger(+input)||+input<0){
           return false;
         }
         if(landmark.store){
           return +input<=9 ;
         }else{
           return +input <9 ;
         }
       }
       Game.waitForInput(null,validationFunc,function(input){
         var returnScene=function(){Game.scenes.LandmarkMenu(landmark)};
         if(input==1){
           // Go to river crossing menu if the landmark is a river
           if (landmark.river) {
              // Determine a random width and depth
              width = randrange(30, 50);
              depth = randrange(1, 5);

              Game.scenes.ArriveAtRiver(width, depth, landmark);
           }
           else {
             Game.scenes.Journey(true);
           }
         }
         else if (input==2)
           Game.scenes.CheckSupply(returnScene);
         else if(input==3)
           Game.scenes.ShowMap(returnScene);
        else if(input==4)
          Game.scenes.ChangePace(returnScene);
        else if(input==5)
          Game.scenes.ChangeRations(returnScene);
        else if(input==6)
          Game.scenes.StopToRest(returnScene);
        else if(input==7)
          Game.trading(returnScene);
         else if(input==8)
           Game.scenes.LandmarkTalk(landmark);
        else if(input==9)
          Game.scenes.BuySupply(landmark);
         else{
            Game.scenes.LandmarkMenu(landmark);
         }
       });//waitForInput
    },

	// Screen that shows a player's final score upon successfully completing the game
    Results : function() {
      Game.gameDiv.innerHTML =
        `<div id="results" class="centered_content white_black">\n
          <p class="black_white">Points for arriving in Oregon</p>\n
          <table id="scores">
          </table>
        </div>\n
        <p class="prompt white_black">Press ENTER to continue</p>\n`;
      var bonus=Game.gameCaravan.occupation.bonus;
      var total = 0;
      var printrow = function(num, thing, scorePer) {
        document.getElementById("scores").innerHTML += `<tr><td>` + num + `</td><td>` + thing + `</td><td>` + Math.floor(num * scorePer) + `</td></tr>\n`;
        return Math.floor(num * scorePer);
      };
      var healths = {}; healthStrs=["very poor", "poor", "fair", "good"];
      for (var person in Game.gameCaravan.family) { // how many people in family per health level
        healths[map(Game.gameCaravan.family[person].health, 0, 100, 0, 3)] = healths[map(Game.gameCaravan.family[person].health, 0, 100, 0, 3)] + 1 || 1;
      }
      for (var healthInd in healths) { // how many different health levels, and their scores
        total += printrow(healths[healthInd], (healths[healthInd] > 1 ? `people` : `person`) + ` in ` + healthStrs[+healthInd] + ` health`, 100 * (+healthInd + 2)*bonus);
      }
      total += printrow(1, "wagon", 50*bonus);
      total += printrow(Game.gameCaravan.oxen, "oxen", 4*bonus);
      total += printrow((Game.gameCaravan.wheels + Game.gameCaravan.tongues + Game.gameCaravan.axles), "spare wagon parts",  2*bonus);
      total += printrow(Game.gameCaravan.clothing, "sets of clothing", 2*bonus);
      total += printrow(Game.gameCaravan.bait, "bait", bonus / 50);
      total += printrow(Game.gameCaravan.food, "pounds of food", bonus / 25);
      total += printrow(Game.gameCaravan.money, "cash", bonus / 5);

      document.getElementById("results").innerHTML += `<p class="white_black">Total: ` + total + `</p>\n`;

      if(bonus>1){
        var bonusMessage='<p>For going as a '+Game.gameCaravan.occupation.string+', your points are '+(bonus==2?"doubled":"tripled")+'.</p>';
        document.getElementById("results").innerHTML += bonusMessage;
      }

      Game.waitForInput(null, null, function() {
        Game.updateTopTen(Game.gameCaravan.family[0].name, total, function(rated) {
          if (rated == "true") {
            Game.alertBox("Congratulations! You ranked in the Oregon Top Ten!", Game.start);
          } else {
            Game.start();
          }
        });
      })
    },

	// Screen that shows the names/scores of the top ten scoring players
    OregonTopTen : function() {
      Game.getTopTen(function (results) {
        Game.gameDiv.innerHTML =
          `<div id="topTen" class="centered_content white_black">
            <p>The Oregon Top Ten</p>
            <table>
              <tr><th>Name</th><th>Points</th><th>Rating</th></tr>`
              + results +
            `</table>
          </div>
          <p class="prompt white_black">Press ENTER to continue</p>\n`;
        Game.waitForInput(null, null, Game.scenes.startScreen);
      });
    },

	// Screen that displays advice from other settlers when the player selects the "Talk to People" option at a landmark
    LandmarkTalk: function(landmark){
      var talk=landmark.talks[landmark.talkIndex];
      landmark.talkIndex=landmark.talkIndex==2?0:landmark.talkIndex+1;
      Game.gameDiv.innerHTML="";
      var message=talk.speaker+' tells you:</br></br>"'+talk.speech+'"';
      Game.dialogBox(message,function(){Game.scenes.LandmarkMenu(landmark)});
    },

	// Creates a canvas and uses it to animate the wagon crossing the river. Animation is different depending on what method
	// is used and wether the attempt is successful
    animateRiver: function(method, success) {
      // setup
      Game.gameDiv.innerHTML = `<div id="river_crossing" class="centered_content">\n<div class="ratio-wrapper ratio5-4">\n<canvas id="river_animation" class="ratio-content"></canvas>\n</div>\n</div>\n`;
      var fordImg = new Image(); fordImg.src = './img/wagon_ford.png';
      var floatImg = new Image(); floatImg.src = "./img/wagon_caulk.png";
      var ferryImg = new Image(); ferryImg.src = "./img/wagon_ferry.png";
      var canvas = document.getElementById("river_animation");
      var ctx = canvas.getContext("2d");
      var width = canvas.width = canvas.clientWidth; var height = canvas.height = canvas.clientHeight;
      var hypo = Math.sqrt(width * width + height * height);

      var grd;
      var bank1 = -40; var bank2 = 75; var end = (success ? 30 : 0);
      var BLUE = "#42B2FF"; var TAN = "#F6B68E";

            // drawing  the river at different stages in crossing
      var drawRiver = function(pct1, pct2, angle) {
        var rad = angle % 90 * Math.PI / 180;
        var hypo2 = hypo * Math.cos(Math.abs(rad - Math.atan(height / width)));
        if (angle > 90) {
          grd = ctx.createLinearGradient(width, 0, hypo2 * Math.sin(rad), hypo2 * Math.cos(rad));
        } else {
          grd = ctx.createLinearGradient(0, 0, hypo2 * Math.cos(rad), hypo2 * Math.sin(rad));
        }
        grd.addColorStop(0, TAN);
        grd.addColorStop(pct1 < 0? pct1 = 0 : pct1/=100, TAN); grd.addColorStop(pct1, BLUE);
        grd.addColorStop(pct2 > 100 ? pct2 = 1 : pct2/=100, BLUE); grd.addColorStop(pct2, TAN);
        grd.addColorStop(1, TAN);
        ctx.fillStyle = grd;
        ctx.fillRect(0,0,width, height);
      };

      // set and draw graphic for method of travel
      var imageObj;
      if (method == "ford") {
        imageObj = fordImg;
      } else if (method == "float") {
        imageObj = floatImg;
      } else if (method == "ferry") {
        imageObj = ferryImg;
      }

      //  draw the wagon going across the river
      imageObj.onload = function() {
        drawRiver(bank1, bank2, 60);
        ctx.drawImage(imageObj, width / 4, canvas.clientHeight / 4, width * 0.5, width * 0.3377 );
        setTimeout(function() { // wait a second before moving
          var progress = setInterval(function() { // go across the river
            if (bank1 == end) {
                  clearInterval(progress);
                if (!success ) { // if failed to cross, show sinking
                  bank1=0; bank2=60;
                  TAN = BLUE; BLUE = "rgba(0, 0, 0, 0)";
                  var progress2 = setInterval(function() {
                      if (bank2 == 40) {
                        clearInterval(progress2);
                      } else {
                        ctx.drawImage(imageObj, width / 4, canvas.clientHeight / 4, width * 0.5, width * 0.3377);
                        drawRiver(bank1, bank2, 120);
                        bank2--;
                      }
                  }, 60);
                }
            } else {
                drawRiver(bank1, bank2,60);
                ctx.drawImage(imageObj, width / 4, canvas.clientHeight / 4, width * 0.5, width * 0.3377);
                bank1++, bank2++;
            }
          }, 60);
        }, 1000);
      }
      return (end - bank1) * 60 + 1000;
    },

	// Screen where the player attempts to complete the challenge at the end of the game, where the wagon floats
	// down the Columbia River
    RiverCrossingGame: function(){
      Game.gameDiv.innerHTML=
      `<div id="river_game">
        <canvas id="canvas"></canvas>
      </div>`;
      Game.startRiverGame(function(){Game.scenes.Landmark(landmarks.WillametteValley)});
    }
  },//end Game.scenes

  // Function that uses AJAX to see if a player's completed score can be added to the top ten
  updateTopTen : function(name, score, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { // do once response, data are ready
        callback(this.responseText);
      }
    };
    xhttp.open("GET", "./php/updateTopTen.php?name="+ name +"&score=" + score, true);
    xhttp.send();
  },

  // Function that uses AJAX to retrieve the 10 highest scores on record for the game
  getTopTen : function(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { // do once response, data are ready
        callback(this.responseText);
      }
    };
    xhttp.open("GET", "./php/getTopTen.php", true);
    xhttp.send();
  },

  // Function that displays a message in a small box in the middle of the screen.
  alertBox : function(message, returnScene) {
  returnScene=returnScene||function(){};
	if (message == null) {
		message = "Oh my god everybody is dead! Even the oxen and the children are dead! This was a terrible idea! "+
		"I think I just broke my leg and caught Ebola!";
	}

    var alert = document.createElement("p"); alert.innerHTML=message;
    alert.setAttribute("class", "white_black AlertBox"); alert.setAttribute("id", "AlertBox");
	Game.gameDiv.appendChild(alert);

	Game.waitForInput(null,null,function() {Game.removeAlertBox(); returnScene();});
  },

  // Helper function that removes the alert box from the screen
  removeAlertBox : function() {

    var alerts = document.getElementsByClassName("AlertBox")
    for (var i = 0; i < alerts.length; i++) {
      alerts[i].remove();
    }
  },

  // Function that displays a large message in a large box that covers most of the screen
  dialogBox : function(dialog, returnScene) {
    Game.gameDiv.innerHTML += `<p id="DialogBox" class="white_black">` + dialog + `</p>\n`;
	Game.waitForInput(null,null,function() {Game.removeDialogBox(); returnScene() || null;});
  },

  // Helper function that removes the dialog box from the screen
  removeDialogBox : function() {
    document.getElementById("DialogBox").remove();
  },

  // Function used when the player selects the "Fish for Food" option while traveling the trail. Randomly determines
  // if the fishing attempt was successful and adds food to the caravan depending on what was caught.
  fishingGame:function(){
    if (Game.gameCaravan.bait == 0) {

	  Game.alertBox("You have no bait to fish with", Game.scenes.TrailMenu);
	  return;
	}

    var fish = ["sturgeon","salmon","steelhead","trout","catfish","bass","sunfish","barracuda","flounder"];
    var weights = [50,10,27,27,40,12,1,20,26];

    var chanceToCatch = Math.floor((Math.random()*10)+1);
	var fishNum = Math.floor((Math.random()*9));

	if (chanceToCatch < 6) {
	  Game.gameCaravan.bait--;
	  Game.gameCaravan.food += weights[fishNum];
	  Game.alertBox("You caught a " + fish[fishNum] + " weighing " + weights[fishNum] + " pounds", Game.scenes.TrailMenu);
	  document.getElementById("AlertBox").innerHTML += `<img class="fish" src="./img/fish.png">\n`
	  return;
	}

	else if (chanceToCatch < 8) {
	  Game.gameCaravan.bait--;
	  Game.alertBox("The fish took your bait and escaped", Game.scenes.TrailMenu);
	  return;
	}

	else {
	  Game.alertBox("No luck, the fish aren't biting around here", Game.scenes.TrailMenu);
	  return;
    }
  },

  // Function used when the player selects the "Attempt to Trade" option while traveling or at a landmark. Randomly determines
  // the items up for trade, and the amount offered/wanted
  trading:function(returnScene){
    returnScene=returnScene||Game.scenes.TrailMenu;
    Game.passDays(1);
    var div=Game.gameDiv.children[0];
    var itemNames=["tongues","wheels","axles","clothing","oxen","food","bait"];

	// Need this other array for when a wagon is disabled
	var longerNames=["wagon tongue", "wagon wheel", "wagon axle","clothing","oxen","food","bait"];
    var randomIndex1= Math.floor(Math.random() * itemNames.length);
    var randomIndex2= Math.floor(Math.random() * itemNames.length);

    while(randomIndex1==randomIndex2){
	     randomIndex2=Math.floor(Math.random() * itemNames.length);
    }

    var amtwanted=Math.ceil(((Math.random() * MAXIMUM[itemNames[randomIndex1].toUpperCase()])+1) / 3);
    var amttrade=Math.ceil(((Math.random() *  MAXIMUM[itemNames[randomIndex2].toUpperCase()])+1) / 3);

	if(amtwanted>Game.gameCaravan[itemNames[randomIndex1]]){

		var message = "You meet a trader who wants " + amtwanted + " " + itemNames[randomIndex1];
		Game.dialogBox(message, returnScene);
		document.getElementById("DialogBox").style.top = "-100%";
		document.getElementById("DialogBox").innerHTML += `<br><br>You don't have this`
    }

	else{

	  document.getElementById("input").remove();
      var message = "You meet a trader who wants " + amtwanted + " " + itemNames[randomIndex1] +
      ". He will trade you " + amttrade + " " + itemNames[randomIndex2] + ". ";
	  Game.dialogBox(message, returnScene);
	  document.getElementById("DialogBox").style.top = "-100%";
	  document.getElementById("DialogBox").innerHTML += `<br><br>Do you wish to trade(Y/N)<span id="input"></span></p>`

      var item1=itemNames[randomIndex1];
      var item2=itemNames[randomIndex2];
      var tradeFunc=function(input){
        if(input.toUpperCase()=="Y"){
          Game.gameCaravan.trade(item1,amtwanted,item2,amttrade);

		  // If the wagon was disabled, see if this is the part that needed replacing
		  if (longerNames[randomIndex2] == Game.gameCaravan.neededPart) {
			Game.gameCaravan.disabled = false;
		  }
        }
        returnScene();
      };
      var validationFunc=function(input){
        input=input.toUpperCase();
        return input=="N"||input=="Y";
      }
      Game.waitForInput(null,validationFunc,tradeFunc);
    }
  },

  // Function that uses AJAX to retrieve the name and epitaph of a tombstone so that it can be displayed
  getTombstones : function() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // do once response, data are ready
          Game.tombstones = JSON.parse(this.responseText);
        }
      };
      xhttp.open("GET", "./php/getTombstones.php", true);
      xhttp.send();
    },

  // Function used when all caravan members are dead. Asks the player for a message to place on their gravestons, and
  // then uses AJAX to update the database with their tombstone.
  setTombstone : function() {

	var name = Game.gameCaravan.leader;
	var date = Game.date.getFullYear() + "-" + Game.date.getMonth() + "-" + Game.date.getDate();

	var mile = Game.miles;

	// Need to redraw the DialogBox after being prompted to enter something
	if (document.getElementById("DialogBox") != null) {
	  document.getElementById("DialogBox").remove();
	}

	Game.dialogBox("You and the rest of your caravan are dead. What is your epitaph?");

	document.getElementById("DialogBox").style.top = "-100%";

	if (document.getElementById("input") != null) {

	  document.getElementById("input").remove();
    }

	var epitaphInput = document.createElement('div');

	document.getElementById("DialogBox").innerHTML += `<br>`;
	document.getElementById("DialogBox").innerHTML += `<br>`;
	document.getElementById("DialogBox").appendChild(epitaphInput);
	epitaphInput.setAttribute("id", "input");

	Game.waitForInput(null, null, function(choice) {

	  if (choice == "") {

	    Game.alertBox("Please enter something for your final words", Game.setTombstone);
		document.getElementById("AlertBox").style.top = "-175%";
	  }

	  else {

		var epitaph = choice;
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "./php/set_tombstone.php?name=" + name + "&date=" + date + "&mile=" + mile + "&epitaph=" + epitaph, true);
		xhttp.send();
		Game.scenes.startScreen();
      }
    })

  }
};

const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
