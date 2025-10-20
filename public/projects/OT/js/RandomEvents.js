var supplyList = ["Wheel", "Tongue", "Axle", "Bait", "Clothing", "Food"];

function getWeather(month) {

	var weather = ["snowy", "cold", "cool", "rainy", "warm", "hot"];
	switch (month) {
		// Dec - Feb are 20 snowy, 50 cold, 30 cool
		case 11: case 0: case 1:
			return weather[weightedRand({1: 0.5, 2: 0.3, 0: 0.2})];
			break;
		// Mar - May are 20 rainy, 50 cool, 30 warm
		case 2: case 3: case 4:
			return weather[weightedRand({2: 0.5, 4: 0.3, 3: 0.2})];
			break;
		// Jun - Aug are 30 hot, 70 warm
		case 5: case 6: case 7:
			return weather[weightedRand({4: 0.6, 5: 0.4})];
			break;
		// Sep - Nov are 30 cold, 70 cool
		case 8: case 9: case 10:
			return weather[weightedRand({2: 0.7, 1: 0.3})];
			break;
	}
}

function death() {

}

function randomEvent(caravan) {

	// There are 12 events, so generate a random number between 1 and 12
	var eventNum = Math.floor((Math.random() * 15) + 1);

	switch(eventNum) {
		case 1:
			return wrongTrail();
		case 2:
			return wagonWheelBreak(caravan);
		case 3:
			return wagonTongueBreak(caravan);
		case 4:
			return wagonAxleBreak(caravan);
		case 5:
			return foundSupplies(caravan);
		case 6:
			return foundWildBerries(caravan);
		case 7:
			return badWater(caravan);
		case 8:
			return foodSpoiled(caravan);
		case 9:
			return oxenWanderedOff(caravan);
		case 10:
			return oxenSick(caravan);
		case 11:
			return suppliesStolen(caravan);
		case 12:
			return wagonFire(caravan);
		case 13:
			return snakeBite(caravan);
		case 14:
			return getDisease(caravan);
	}
}

function wrongTrail() {

	//Delay the caravan for 3 days
	Game.passDays(3);
	return "Took the wrong trail, lose 3 days";
}

function wagonWheelBreak(caravan) {

	if (caravan.wheels != 0) {
		caravan.wheels -= 1;
	}

	return "A wagon wheel broke";
}

function wagonTongueBreak(caravan) {

	if (caravan.tongues != 0) {
		caravan.tongues -= 1;
	}

	return "Your wagon tongue broke";
}

function wagonAxleBreak(caravan) {

	if (caravan.axles != 0) {
		caravan.axles -= 1;
	}
	
	  return "Your wagon axle broke";
}

function foundSupplies(caravan) {

	// Randomly determine which kind of supplies were found
	var supplyFound = Math.floor((Math.random() * 5) + 1);

	switch(supplyFound) {

		case 1:
			caravan.wheels += 1;
			return "Found a wagon wheel";

		case 2:
			caravan.tongues += 1;
			return "Found a wagon tongue";

		case 3:
			caravan.axles += 1;
			return "Found a wagon axle";

		case 4:
			caravan.bait += 5;
			return "Found 5 pieces of fishing bait";

		case 5:
			caravan.clothes += 3;
			return "Found 3 sets of clothing";

	}
}

function foundWildBerries(caravan) {
	document.getElementById("animation").innerHTML += `<img id="berries" src="./img/wild_fruit.png" style="position: absolute; height: 30%; bottom: 0; right: 33%" >`;
	function remove(event) {
		var x = event.charCode || event.keyCode;
      	if(x == 13){
			document.removeEventListener("keypress", remove);
			document.getElementById("berries") ? document.getElementById("berries").remove() : null;
		}
	};
	document.addEventListener("keypress", remove);
	caravan.food += 20;
	return "Found wild berries";
}

function badWater(caravan) {

	var family = caravan.family;
	var familySize = caravan.family.length;

	for (var i = 0; i < familySize; i++) {

		family[i].sicken(5);
	}

	return "Drank bad water";
}

function foodSpoiled(caravan) {

	if (caravan.food == 0) {
		return null;
	}

	if (caravan.food < 20) {
		caravan.food = 0;
		return "The last of your food has spoiled";
	}

	caravan.food -= 20;
	return "Lost 20 pounds of food due to spoilage";
}

function oxenWanderedOff(caravan) {

	if (caravan.oxen == 0) {
		return null;
	}

	caravan.oxen -= 1;
	return "One of your oxen wandered off and was lost";
}

function oxenSick(caravan) {


	if ((caravan.oxen > 0) && (caravan.injured_oxen != caravan.oxen)) {

		caravan.injured_oxen++;
		return "One of your oxen has gotten sick";
	}
	return null;
}

function suppliesStolen(caravan) {
	document.getElementById("animation").innerHTML += `<img id="thief" src="./img/thief.png" style="position: absolute; height: 45%; bottom: 0; right: 0">`;
	function remove(event) {
		var x = event.charCode || event.keyCode;
      	if(x == 13){
			document.removeEventListener("keypress", remove);
			document.getElementById("thief") ? document.getElementById("thief").remove() : null;
		}
	};
	document.addEventListener("keypress", remove);
	var messageStart = "A thief has stolen ";
	var messageEnd = destroyRandomSupplies(caravan);

	if (messageEnd == null) {
		return null;
	}

	return messageStart + messageEnd;
}

function wagonFire(caravan) {

	var messageStart = "A fire in the wagon has destroyed ";
	var messageEnd = destroyRandomSupplies(caravan);

	if (messageEnd == null) {
		return null;
	}

	return messageStart + messageEnd;
}

function snakeBite(caravan) {

	var family = caravan.family;
	var familySize = caravan.family.length;

	// Pick a random bite victim
	var victimIndex = Math.floor(Math.random() * familySize);
	var victim = family[victimIndex];

	// Reduce their health by 10
	victim.sicken(10);

	return victim.name + " has been bitten by a snake";
}

function getDisease(caravan) {

	// Chance of a disease occuring depends on pace and rations of the caravan
	var diseaseChance = 0;

	switch (caravan.pace) {
		case "PACE.STEADY":
			diseaseChance += 10;
			break;

		case "PACE.STRENUOUS":
			diseaseChance += 25;
			break;

		case "PACE.GRUELING":
			diseaseChance += 45;
			break;
	}

	switch (caravan.rations) {
		case "RATIONS.FILLING":
			diseaseChance += 10;
			break;

		case "RATIONS.MEAGER":
			diseaseChance += 25;
			break;

		case "RATIONS.BAREBONES":
			diseaseChance += 45;
			break;
	}
	if (caravan.food==0){
		diseaseChance+=60;
	}
	// Randomly generate a number between 1 and 100
	var caughtDisease = Math.floor((Math.random() * 100) + 1);

	// If the random number is less than or equal to the disease chance, someone just got sick
	if (caughtDisease <= diseaseChance) {

		var family = caravan.family;
		var familySize = caravan.family.length;


		var diseaseNames = ["cholera", "dysentery", "typhoid fever"];
		var chosenDisease = diseaseNames[randrange(0,2)];


		var victim = family[randrange(0,familySize-1)];
		victim.sicken(40);

		if (victim.disease == chosenDisease) {
			return victim.name + " has taken a turn for the worse.";
		} else {
			victim.disease = chosenDisease;
			return victim.name + " is sick with " + chosenDisease;
		}

	}
}

// This function is used whenever the caravan tips over when crossing a river
function wagonTipOver(caravan) {

	var disasterChance = Math.floor((Math.random() * 10) + 1);

	// 10% chance of someone drowning
	if (disasterChance == 1) {

		var family = caravan.family;
		var familySize = caravan.family.length;

		// Pick a random drowning victim
		var victimIndex = Math.floor(Math.random() * familySize);
		var victimName = family[victimIndex].name;

		// Remove that person from the caravan
		caravan.removePerson(victimIndex);

		return "The wagon tipped over and " + victimName + " has drowned";
	}

	// 10% chance of losing oxen
	else if (disasterChance == 2) {

		var oxenLost = randrange(1,2);

		if (oxenLost > caravan.oxen) {
			oxenLost = caravan.oxen;
		}

		caravan.oxen -= oxenLost;
		return "The current was strong and " + oxenLost + " oxen were swept away and lost";
	}

	// 80% chance of losing supplies
	else {

		var messageEnd = destroyRandomSupplies(caravan);

		if (messageEnd == null) {

			return "The wagon tipped over, but you didn't lose any supplies";
		}

		return "The wagon tipped over and you lost " + messageEnd;
	}
}

function randomName() {
	var names = ["Shawn","Grace","Alan","Ada","River","Zoe","Kaylee","Jayne","Simon", "Chang", "Marron", "Hrabowski", "Kalpakis", "Steve", "Tom"];
	return names[randrange(0, names.length - 1)];
}

// Randomly remove supplies from the caravan, and return a message saying what was removed
// Message should be appended to description of what destroyed the supplies
function destroyRandomSupplies(caravan) {

	// Between 2 and 6 supply types are reduced
	var numLost = randrange(2,6);
	var supplyList = ["Wheel", "Tongue", "Axle", "Bait", "Clothing", "Food"];
	var lostSupplies = [];
	var messageList = []
	var message = "";

	for (var i = 0; i < numLost; i++) {

		// Pick a random supply from the supply list and add it to the list of lost supplies
		var randomIndex = Math.floor(Math.random() * supplyList.length);
		var chosenSupplies = supplyList[randomIndex];
		lostSupplies.push(chosenSupplies);

		// Remove the supply from the array so the same supply type isn't picked twice
		supplyList.splice(randomIndex, 1);
	}

	// Go through the list of lost supplies and remove individual amounts
	for (var j = 0; j < numLost; j++) {

		var removed;
		var messageFragment = "";

		switch(lostSupplies[j]) {

			case "Wheel":

				// Nothing to remove if the supply is at 0
				if (caravan.wheels == 0) {
					break;
				}

				removed = randrange(1, 3);

				// Don't go below 0
				if (removed > caravan.wheels) {
					removed = caravan.wheels;
				}
				caravan.wheels -= removed;
				messageFragment += removed + " wagon wheel";

				// Add an 's' to the message if more than one was removed
				if (removed > 1) {
					messageFragment += "s";
				}

				// Add the fragment to the list, which will be used to format the final message
				messageList.push(messageFragment);
				break;

			case "Tongue":

				if (caravan.tongues == 0) {
					break;
				}

				removed = randrange(1, 2);

				if (removed > caravan.tongues) {
					removed = caravan.tongues;
				}
				caravan.tongues -= removed;
				messageFragment += removed + " wagon tongue";

				if (removed > 1) {
					messageFragment += "s";
				}
				messageList.push(messageFragment);
				break;

			case "Axle":

				if (caravan.axles == 0) {
					break;
				}

				removed = randrange(1, 2);

				if (removed > caravan.axles) {
					removed = caravan.axles;
				}
				caravan.axles -= removed;
				messageFragment += removed + " wagon axle";

				if (removed > 1) {
					messageFragment += "s";
				}
				messageList.push(messageFragment);
				break;

			case "Bait":

				if (caravan.bait == 0) {
					break;
				}

				removed = randrange(1, 5);

				if (removed > caravan.bait) {
					removed = caravan.bait;
				}
				caravan.bait -= removed;
				messageFragment += removed + " box";

				// Say 'boxes' when more than 1 is lost
				if (removed > 1) {
					messageFragment += "es";
				}
				messageFragment += " of bait";
				messageList.push(messageFragment);
				break;

			case "Clothing":

				if (caravan.clothing == 0) {
					break;
				}

				removed = randrange(1, 5);

				if (removed > caravan.clothing) {
					removed = caravan.clothing;
				}
				caravan.clothing -= removed;
				messageFragment += removed + " set"

				if (removed > 1) {
					messageFragment += "s";
				}
				messageFragment += " of clothing";
				messageList.push(messageFragment);
				break;

			case "Food":

				if (caravan.food == 0) {
					break;
				}

				removed = randrange(20, 300);

				if (removed > caravan.food) {
					removed = caravan.food;
				}
				caravan.food -= removed;
				messageFragment += removed + " pound";
				if (removed > 1) {
					messageFragment += "s";
				}
				messageFragment += " of food";
				messageList.push(messageFragment);
				break;
		}
	}

	// If nothing was successfully removed (because all randomly selected supplies were at 0), return null
	if (messageList.length == 0) {
		return null;
	}

	// Format the message with commas and an 'and' depending on length
	for (var k = 0; k < messageList.length; k++) {

		message += messageList[k];
		if (k == messageList.length - 2) {

			message += " and ";
		}
		else if (k < messageList.length - 2) {
			message += ", ";
		}
	}

	return message;
}

function randrange(min, max) {
    // add current time as fake random seed
    return Math.floor((Math.random() + new Date().getTime() % 1) * (max - min + 1) + min);
}

// takes object where keys are possible variables, and values are probabilities
function weightedRand(specs) {
	var i; var num = Math.random(); var sum = 0;
	for (i in specs) {
		sum += specs[i];
		if (num <= sum) { return i; }
	}
}


 function map(num, min1, max1, min2, max2)
 {
   return Math.floor((num - min1) * (max2 - min2) / (max1 - min1) + min2);
 }
 function attemptToFixWagon(caravan){
 	var chance=Math.floor((Math.random() * 10) + 1);
 	if (caravan.occupation.string=="carpenter"){
 		chance=Math.floor((Math.random() * 7) + 4);
 	}
 	if (chance >5){
 		return true;
 	}
 	return false;
 }
