// Pace object enables access to each pace level's numerical and string values
// rate is the percentage of maximum distance per day that pace corresponds to. max distance depends on how many oxen you have, with a max of 40 mi/day
const PACE = {

    STEADY: {rate: 8, chance: 0, string: "steady", description: "You travel about 8 hours a day, taking frequent rests. You take care not to get too tired."},
    STRENUOUS: {rate: 12, chance: 0.2, string: "strenuous", description: "You travel about 12 hours a day, starting just after sunrise and stopping shortly before sunset. You stop to rest only when necessary. You finish each day feeling very tired."},
    GRUELING: {rate: 16, chance: 0.4, string: "grueling", description: "You travel about 16 hours a day, starting before sunrise and continuing until dark. You almost never stop to rest. You do not get enough sleep at night. You finish each day feeling absolutely exhausted, and your health suffers."}
}

const OCCUPATION = {
    FARMER: {string: "farmer", bonus: 3, cash: 800.00, ability: "oxen"},
    BANKER: {string: "banker", bonus: 1, cash: 1600.00, ability: ""},
    CARPENTER: {string: "carpenter", bonus: 2, cash: 400.00, ability: "wagon"}
}

const RATIONS = {
    FILLING: {pounds: 3, chance: 0, string: "filling", description: "meals are large and generous."},
    MEAGER: {pounds: 2, chance: 0.2, string: "meager", description: "meals are small, but adequate."},
    BAREBONES: {pounds: 1, chance: 0.4, string: "bare bones", description: "meals are very small; everyone stays hungry."}
}

// maximum amount of each item allowed to carry
const MAXIMUM = {
    OXEN: 20,
    WHEELS: 3,
    TONGUES: 3,
    AXLES: 3,
    FOOD: 2000,
    CLOTHING: 20,
    BAIT: 500
}

// Caravan constructor
// Takes in array of Person objects to set as the family
// creates a new Caravan object
function Caravan() {
    // members
    this.family = [];
    this.health = "good";
    this.pace = PACE.STEADY;
    this.occupation;
    this.rations = RATIONS.FILLING;

    this.food = 0;
    this.money = 0.00;
    this.tongues = 0;
    this.wheels = 0;
    this.axles = 0;
    this.oxen = 0;
    this.injured_oxen = 0;
    this.clothing = 0;
    this.bait = 0;
	this.leader = "";
	this.disabled = false;
	this.neededPart = "";
}

Caravan.prototype.updateFood = function() {
    var eaten = this.rations.pounds * this.family.length;
    if (this.food >= eaten) {
        this.food -= this.rations.pounds * this.family.length;
    } else {
        this.food = 0;
    }
    return this.food;
}

Caravan.prototype.generateRandomName = function() {

	// Pick a name from the list
	var randomIndex = Math.floor(Math.random() * this.randomNames.length);
	var chosenName = this.randomNames[randomIndex];

	// Remove the name from the array so there are no duplicates
	this.randomNames.splice(randomIndex, 1);

	return chosenName;
}

// set_family
// Takes in array of Person objects, in which first element is the leader
// sets this.family to that array
Caravan.prototype.set_family = function(new_family) {
    this.family = new_family;
}

// set_pace
// takes in one of the objects within const PACE
// sets Caracan's pace to given PACE
Caravan.prototype.set_pace = function(new_pace) {
    this.pace = new_pace;
}

// purchase
// takes in name of the item as a string, item's cost as a float, and how many of the item to purchase as an int
// If the purchase isn't too expensive or quantity too much, subtracts from the Caravan's money and adds to its supplies
Caravan.prototype.purchaseItems = function(purchases) {
    // costs more than we have
    var total = 0.00;
    for (var i = 0; i < purchases.length; i++) { // make sure they can make the purchase.quantity;
        total += purchases[i].quantity * purchases[i].cost;
        if (total > this.money) { return false; }
    }
    for (var j = 0; j < purchases.length; j++) { // make the purchases
        this[purchases[j].item] += purchases[j].quantity;
    }
    this.money -= total;
    return true;
}

// Return the average health
Caravan.prototype.getHealth = function() {
    var healths = ["dying", "very poor", "poor", "fair", "good"];
	var totalHealth = 0;

	for (var i = 0; i < this.family.length; i++) {
		totalHealth += this.family[i].health;
    }
    totalHealth /= this.family.length;
    return healths[map(totalHealth, 0, 100, 0, 4)];
}

// Remove a person from the caravan (because they died)
Caravan.prototype.removePerson = function(person) {
	if (typeof person == 'number')
		this.family.splice(person, 1);
	else if (typeof person == 'string') {
		var i = 0;
		while (this.family[i].name != person)
			i++;
		this.family.splice(i, 1);
	}
	else if (person instanceof Person) {
		var i = 0;
		while (this.family[i].name != person.name)
			i++
		this.family.splice(i, 1);
	}
}
Caravan.prototype.removeOx = function(oxenNum) {
	for(var i=0; i<oxenNum;i++){
		this.oxen= this.oxen-1;
	}
	if(this.oxen<0){
		this.oxen=0;
	}
}

// Add a person to the family
Caravan.prototype.addPerson = function(person) {

	this.family.push(person);
}

Caravan.prototype.getMph = function() {
    var mph;
    if (this.oxen > 0) {
        mph = (this.oxen - this.injured_oxen) * 0.625 + this.injured_oxen * 0.5;
    } else {
        mph = 3;
    }
    return (mph > 10) ?  10 : mph;
}

Caravan.prototype.sickenOxen = function() {
    if (this.oxen > 0 && this.injured_oxen < this.oxen) {
        this.injured_oxen++;
        return true;
    }
    return false;
}

Caravan.prototype.trade=function(take,takeamt,give,giveamt){
    if (giveamt+this[give]<=MAXIMUM[give.toUpperCase()]){
        this[give]+=giveamt;
    }else{
        var amt=MAXIMUM[give.toUpperCase()]-this[give];
        this[give]+=amt;
    }
    this[take]-=takeamt;
}

Caravan.prototype.fill = function() {
    this.axles = 3;
    this.wheels = 3;
    this.tongues = 3;
    this.food = 200;
    this.bait = 20;
    this.clothing = 4;
    this.oxen = 4;
    this.money = 200.00;
    this.occupation = OCCUPATION.CARPENTER;
    this.addPerson(new Person("Joe"));
    this.addPerson(new Person("Jack"));
    this.addPerson(new Person("Jill"));
    this.addPerson(new Person("Jane"));
    this.addPerson(new Person("John"));
}

Caravan.prototype.updateHealth = function() {
    // percentage that each person will sicken or heal
    var factor = this.pace.chance + (this.food > 0 ? this.rations.chance : 0.6);
    var died = [];
    for (var i = 0; i < this.family.length; i++) {
        // random amount to sicken/heal, modified by healing rate
        this.family[i].heal(randrange(10,30) * (1 - factor));
        var dead = this.family[i].sicken(randrange(10,30) * factor);
        // did this person die?
        if (dead == -1) {
            died.push(this.family[i].name);
            this.family.splice(i, 1);
            this.food+=100;
        }
    }
    return died;
}
