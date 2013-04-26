//alert("JavaScript works!");

// Alex Hardtke
// 4-24-13
// SDI 1304
// Project 3
// Objects!

// Start

// JSON

var playerInfo = {

	"players": [
		{
			"gamerTag": "Miller",
			"rank":     "General",
			"level":     50
		},
		{
			"gamerTag": "Hudson",
			"rank":     "Captain",
			"level":     35
		},
		{
			"gamerTag": "Smith",
			"rank":     "Brigadier",
			"level":     45
		}
	]
};

// Global Variables

var gameTitle = "Halo 3",
	numOfPlayers = 3,
	roundLength= 10,
	gameType = "Team Slayer",
	maps = ["Valhalla", " Last Resort", " Standoff"],
	teamLevel = true,
	teamRank = 130
;

// Objects

var weapon1 = {
	
	"name": "Sniper Rifle",
	"color": "black",
	"weight": 30,
	"length": 54,
	"range": function(){ // Method: Function
		var totalRange = (this.weight * this.length) / 500;
		return totalRange;
	}
};

var weapon2 = {
	"name": "Rocket Launcher",
	"color": "gray",
	"weight": 50,
	"length": 20,
	"range": function(){ // Method: Procedure
		var totalRange = (this.weight * this.length) / 1000;
	} // Back
}

var map1 = {
	"name": "The Pit",
	"scenery": "warehouse",
	"length": 1000,
	"width": 2000,
	"surfaceArea": function(){
		var totalArea = (this.length * this.width);
		return totalArea;
	},
	"setLength": function(newLength){ // Method: Mutator
		this.length = newLength;
	}
};

var map2 = {
	"name": "Snowbound",
	"scenery": "wilderness",
	"length": 700,
	"width": 800,
	"surfaceArea": function(){ //Method: Accessor
		var totalArea = (this.length * this.width);
		return totalArea;
	}	
	
	
};


// Number Function

var getTeam = function(currentPlayers){
	var totalPlayers = 4;
		
	while (currentPlayers < totalPlayers){  //While Loop
		console.log(currentPlayers + " players found.");
		console.log("Searching for more players.");
		currentPlayers++;
	}
	return totalPlayers;  //Return Number
};

// Array Function

var getMaps = function(){
	
	for (var i = 0; i < maps.length; i++){ // For Loop
		if (i < maps.length){
			while ( i < maps.length ){
				console.log("Let's play a warmup game of " + gameType + " on " + maps[i] + " to get ready for the tournament.");
				console.log("We won!");
				i++;
			}
			
		}else{
			console.log("We need more practice!");
		}
	}
	return maps;
};

// Boolean Function

var getLevels = function(rank){
	if(rank === true){
		if(teamRank > 120){
			console.log("Our team's total ranking qualifies us for the 2nd seed!");
		} else {
			console.log("Our team's total ranking qualifies us for the 4th seed...");	
	}
	return true;
	}
};

// String Function

var getArmor = function(armor1, armor2){
	
	console.log("Before we start, I'm going to change my armor.");
	console.log("I'm going to change my " + armor1 + " and my " + armor2 + ".");
	return "There we go. Much better."
		
};


//Object Function

var getScore = {

	"weapon": weapon1.name,
	"points": 40,
	"place": "First Place"
	
};

// OUTPUTS
var fullTeam = getTeam(3); //Number Argument
console.log(fullTeam + " players found. Beginning game!");

var fullMaps = getMaps(maps); // Array Argument
console.log("Now that we've played " + fullMaps + " maps, we are ready for the tournament.");

var fullLevel = getLevels(teamLevel); // Boolean Argument
console.log("It is " + fullLevel + " that we've got a chance to win the tournament!");

var fullArmor = getArmor("helmet", "shield"); // String Argument
console.log(fullArmor);

console.log("I will be using the " + weapon1.name + " for this round."); // Object 1
console.log("The range of this weapon is " + weapon1.range() + " miles.");

console.log("My next weapon will be the " + weapon2.name + "."); // Object 2
console.log("It weighs " + weapon2.weight + "lbs, so it's heavy but it's a good short range weapon.");

console.log("The first round begins with " + map1.name + " so it looks like I picked the perfect weapons for this map."); // Object 3
map1.setLength(1100);
console.log("It's huge! It is a whopping " + map1.surfaceArea() + " sq. ft.! And hey! We won!!");

console.log("Our semifinal game on " + map2.name + " went very well! I think we're ready for the championship!");

var fullScore = getScore.weapon;
console.log("In the championship game, I ended up with " + getScore.points + " points using the " + fullScore + " and our team won the championship!");