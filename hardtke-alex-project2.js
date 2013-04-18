//alert("JavaScript works!");

// Alex Hardtke
// SDI 1304
// Project 2

// Global Variables

var lunchTime = "It's lunchtime!",
	numSandwiches = 2,
	bagTypes = ["paper bag", "plastic bag"]

// Procedure

var myMeal = function(wantSandwiches, sandwichesPacked){
	
	var totalSandwiches =  wantSandwiches - sandwichesPacked;
	if (totalSandwiches <= 1){
		console.log(lunchTime + " I had a big breakfast, so I'm not too hungry. Good thing I just packed " + totalSandwiches + " sandwich.");
	} else
	console.log(lunchTime + " I'm starving! Good thing I packed " + totalSandwiches + " sandwiches!");
	
};

myMeal(3,1);

// Boolean Function

var getPeanutButterJelly = function(hasPeanutButter, hasJelly){
	
	var ingredients = hasPeanutButter * hasJelly;
	if (ingredients >= 1){
		return true;
	} else {
		return false;
	}
	
};

var yesIngredients = getPeanutButterJelly(2,1);

if (yesIngredients === true){

	console.log("It is " + yesIngredients + " that I can make a peanut butter and jelly sandwich. That sounds good!");
} else {
	console.log("It is " + yesIngredients + " that I can make a peanut butter and jelly sandwich. I need to find something else to make!");
};


// Number Function

var getChips = function(chips){
	
	console.log("Now that I've got my sandwich made, it's time to pack some chips.");
	
	while (chips < 30){
		
		chips = chips + 10;
		
		if (chips < 30){
			console.log("I still need more chips... maybe I'll add ten more.");
		} else {
			console.log("Ok, thats enough.");
		}
	
	}
	return 30;
};

var fullChips = getChips(0);
console.log("I've got " + fullChips + " chips! That's all I need.");

//










