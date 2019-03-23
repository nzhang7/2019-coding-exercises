// Author: Nathan Zhang

// 0 = player's turn, 1 = computer's turn
var whoseTurn;
// just for reference, our mancala board will look like
//    | 12 | 11 | 10 |  9 |  8 |  7 |
// 13 |----|----|----|----|----|----| 6
//    |  0 |  1 |  2 |  3 |  4 |  5 |
// initialize the number of pebbles in each pit
var board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
// pebbles in hand
var currentPebbleCount;
// the pit the player or computer chose to empty out
var pitChosen;
// the pit we will place a pebble in
var pitToPlace;

// this will be used in a function that tells us which pit is opposite to it
var pitOpposite;

// randomly returns 0 or 1
function whoFirst(){
	whoseTurn = Math.round(Math.random());
}

// perform a move based on the pit that was chosen
function move(){
	// take the pebbles from the pit
	currentPebbleCount = board[pitChosen];
	board[pitChosen] = 0;
	// move counterclockwise by one pit
	pitToPlace = pitChosen + 1;
	// place a pebble and move counterclockwise by one pit until we are out of pebbles
	while (currentPebbleCount > 0){
		// you cannot place a pebble into your opponent's   big pit   i do not know what it's called, so we will skip it without changing any other values
		if ((pitToPlace == 6 && whoseTurn == 1) || (pitToPlace == 13 && whoseTurn == 0))
			pitToPlace++;
		else {
			// place a pebble
			board[pitToPlace]++;
			currentPebbleCount--;
			// move counterclockwise by one pit
			pitToPlace++;
		}
		// there is no pit 14, we "loop" back to 0
		if (pitToPlace > 13)
			pitToPlace = 0;
	}
	afterMove();
}

// check some things after the move has ended
function afterMove(){		
	// if either player's entire side of small pits is empty, the game comes to an end
	// the remaining pebbles on your side are captured by you
	if (board[0] + board[1] + board[2] + board[3] + board[4] + board[5] == 0 ||
		board[7] + board[8] + board[9] + board[10] + board[11] + board[12] == 0)
		gameEnds();
	// not including big pits
	if (!(pitToPlace == 0 || pitToPlace == 7){
		// if the last pit we placed a pebble in only has one pebble, that means we landed in a pit that Was empty
		// when this happens, we capture all of the pebbles from the pit opposite to it
		if (board[pitToPlace-1] == 1)){
			// but this only applies when you land in an empty pit on your side of the board
			if (whoseTurn == 0 && pitToPlace < 6){
				// add the pebbles from the opposite pit to your big pit and empty the opposite pit
				opposite(pitToPlace-1);
				board[6] += board[pitOpposite];
				board[pitOpposite] = 0;
			}
			else if (whoseTurn == 1 && pitToPlace > 6){
				opposite(pitToPlace-1);
				board[13] += board[pitOpposite];
				board[pitOpposite] = 0;
			}
		} // if we landed in a small pit that already has at least one pebble, our turn simply ends
		else{
			if (whoseTurn == 1)
				whoseTurn = 0;
			else if (whoseTurn == 0)
				whoseTurn = 1;
		}
	}
	// if we land in our big pit, we get another turn. we do not need code for this since the whoseTurn variable is already properly set
}

// takes the pit opposite to the one passed into the function and stores it in pitOpposite
function opposite(pit){
	if (pit == 0)
		pitOpposite = 12;
	else if (pit == 1)
		pitOpposite = 11;
	else if (pit == 2)
		pitOpposite = 10;
	else if (pit == 3)
		pitOpposite = 9;
	else if (pit == 4)
		pitOpposite = 8;
	else if (pit == 5)
		pitOpposite = 7;
	else if (pit == 7)
		pitOpposite = 5;
	else if (pit == 8)
		pitOpposite = 4;
	else if (pit == 9)
		pitOpposite = 3;
	else if (pit == 10)
		pitOpposite = 2;
	else if (pit == 11)
		pitOpposite = 1;
	else if (pit == 12)
		pitOpposite = 0;
}

function aiThinking(){
	
}

function gameEnds(){
	
}
