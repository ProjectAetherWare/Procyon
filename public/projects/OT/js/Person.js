// Class constructor
function Person(name) {
	this.name = name;
	this.health = 100;
	this.disease = "";
}
	
// Reduce a person's health, return -1 if this kills the person
Person.prototype.sicken = function(healthChange) {
	
	this.health= this.health - healthChange;

	//Check to see if person must die
	if (this.health <= 0) {
		return -1;
	}
		
	return 0;
}
	
// Increase a person's health
Person.prototype.heal = function(healthChange) {

	this.health += healthChange;
	// Don't increase health above maximum
	if (this.health > 100) {
		this.health = 100;
	}
}
