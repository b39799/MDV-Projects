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
	gameType = "Team Slayer"
;

// Number Function

var getTeam = function(currentPlayers){
	var totalPlayers = 4;
		
	while (currentPlayers < totalPlayers) { //While Loop
		console.log(currentPlayers + " players found. Searching for more players.");
		currentPlayers++;
	}
	return totalPlayers;
};
var fullTeam = getTeam(3); //Number
console.log(fullTeam + " players found. Beginning game!");