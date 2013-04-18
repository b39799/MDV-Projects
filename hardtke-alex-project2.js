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
	console.log(lunchTime + " I'm starving! Good think I packed " + totalSandwiches + " sandwiches!");
	
};

myMeal(3,1);

// Boolean Function

