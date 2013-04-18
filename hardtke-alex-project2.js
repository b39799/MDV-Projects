//alert("JavaScript works!");

// Alex Hardtke
// SDI 1304
// Project 2

// Global Variables

var lunchTime = "It's lunchtime!",
	numSandwiches = 2,
	breakOptions = ["play video games", " watch TV"];

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

	console.log("It is " + yesIngredients + " that I made a peanut butter and jelly sandwich. That sounds good!");
} else {
	console.log("It is " + yesIngredients + " that I made a peanut butter and jelly sandwich. Oh well, ham and cheese sounds good too!");
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

// String Function

var getFruit = function(fruit1, fruit2){
	
	console.log("Let's see what kind of fruit I packed.");
	
	var fruit1 = 1,
		fruit2 = 1;
	
	console.log("Ooh! Looks like I packed " + fruit1 + " apple and " + fruit2 + " banana. Tasty!");
	
	return "That hit the spot!"
};

var eatFruit = getFruit("apple", "banana");
console.log(eatFruit);

// Array Function

var breakCount = breakOptions.length;

breakOptions.push(" read a book");

var myBreakOptions = function(breakOptions, timeLeft){
	
	for (var i = 20; i <= timeLeft; i = i + 10) 
	
	if (i < timeLeft){
		
		console.log("I'm going to " + breakOptions + " for " + i + " minutes, until my break is over.");
		
		console.log("Sweet, I've still got some time left. I'm going to continue for another ten minutes!");
		
	} else {
		console.log("Ok, break's over... time to get back to work!");
	}
	return breakOptions;
};

var myActivity = myBreakOptions(breakOptions[1], 30);
console.log("Man, I would much rather" + myActivity + " or " + breakOptions.shift(1) + ", rather than be at work!");





