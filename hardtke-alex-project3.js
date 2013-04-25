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

// Number Function

var getTeam = function(currentPlayers){
	var totalPlayers = 4;
		
	while (currentPlayers < totalPlayers){  //While Loop
		console.log(currentPlayers + " players found. Searching for more players.");
		currentPlayers++;
	}
	return totalPlayers;  //Return Number
};

// Array Function

var getMaps = function(){
	
	for (var i = 0; i < maps.length; i++){ // For Loop
		if (i < maps.length){
			
			console.log("Let's play a game of " + gameType + " on " + maps[i] + ".");
			console.log("We won!");
			
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






// OUTPUTS
var fullTeam = getTeam(3); //Number Argument
console.log(fullTeam + " players found. Beginning game!");

var fullMaps = getMaps(maps); // Array Argument
console.log("Now that we've played " + fullMaps + " maps, we are ready for the tournament.");

var fullLevel = getLevels(teamLevel); // Boolean Argument
console.log("It is " + fullLevel + " that we've got a chance to win the tournament!");