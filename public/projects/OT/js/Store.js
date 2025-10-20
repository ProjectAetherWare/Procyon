/***Store.js
* implements a Store class that keeps the price of items in the store
* and provides functions for transactions in the store
*/
function Store(ox, clothes, bait, axle, wheel, tongue, food) {
    this.bill = 0.00;

    this.oxen = {item: "oxen", cost: ox || 20.00, quantity: 0};
    this.clothing = {item: "clothing", cost: clothes || 10.00, quantity: 0};
    this.bait = {item: "bait", cost: bait || 2.00, quantity: 0};
    this.wheels = {item: "wheels", cost: wheel || 10.00, quantity: 0};
    this.axles = {item: "axles", cost: axle || 10.00, quantity: 0};
    this.tongues = {item: "tongues", cost: tongue || 10.00, quantity: 0};
    this.food = {item: "food", cost: food || 0.20, quantity: 0};
}

Store.prototype.buyItem = function(itemName,caravan,quantity){
	caravan.itemName+=quantity;
	caravan.money-=this.itemName*quantity;
}

Store.prototype.adjust_bill = function(item, new_quantity) {
    this.bill -= this[item].cost * this[item].quantity;
    this[item].quantity = +new_quantity;
    this.bill += this[item].cost * this[item].quantity;
}

Store.prototype.item_bill = function(items) {
    var bill = 0.00;
    for (var i = 0; i < items.length; i++) {
        bill += this[items[i]].cost * this[items[i]].quantity;
    }
    return bill;
}

Store.prototype.generate_bill = function() {
    var tobuy; var bought = [];
    for (tobuy in this) { // if we're purchasing some of the item add it
        if (this[tobuy].quantity > 0) { bought.push(this[tobuy]); }
    }
    return bought;
}
