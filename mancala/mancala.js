// Author: Nathan Zhang

// 0 = player's turn, 1 = computer's turn
var whoseTurn;

// just for reference, our mancala board will look like
//   | 13 | 12 | 11 | 10 |  9 |  8 |
// 0 |----|----|----|----|----|----| 7
//   |  1 |  2 |  3 |  4 |  5 |  6 |
// initialize the number of pebbles in each pit
var board[0, 4, 4, 4 ,4 ,4, 4, 0, 4, 4, 4, 4, 4, 4];

// pebbles in hand
var currentPebbleCount;

// the pit the player or computer chose to empty out
var pitChosen;

// randomly returns 0 or 1;
function whoFirst(){
	return Math.round(Math.random());
}

function move(){
	// take the pebbles from the pit
	currentPebbleCount = board[pitChosen];
	
}

function aiThinking(){
	
}