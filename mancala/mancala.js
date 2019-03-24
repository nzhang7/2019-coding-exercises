// Author: Nathan Zhang

// 0 = player's turn, 1 = computer's turn
var whoseTurn;
// just for reference, our mancala board will look like
//    | 12 | 11 | 10 |  9 |  8 |  7 |
// 13 |----|----|----|----|----|----| 6
//    |  0 |  1 |  2 |  3 |  4 |  5 |
// initialize the number of pebbles in each pit
var realBoard = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
// pebbles in hand
var currentPebbleCount;
// the pit the player or computer chose to empty out
var pitChosen;
// the pit we will place a pebble in
var pitToPlace;

// this will be used in a function that tells us which pit is opposite to it
var pitOpposite;

var pitElements = [];
for (let i = 0; i < 14; i++){
	pitElements[i] = document.getElementById("pit" + i);
	if (i != 6 && i != 13)
		pitElements[i].innerHTML = 4;
	else
		pitElements[i].innerHTML = 0;
}
// randomly returns 0 or 1
function whoFirst(){
	whoseTurn = Math.round(Math.random());
}

// perform a move based on the pit that was chosen
// this function now takes a board and bool as its parameters, so it can also be used for the computer's thought process
function move(board, realMove){
	// take the pebbles from the pit
	currentPebbleCount = board[pitChosen];
	board[pitChosen] = 0;
	if (realMove)
		pitElements[pitChosen].innerHTML = 0;
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
			if (realMove)
				pitElements[pitToPlace].innerHTML = board[pitToPlace];
			currentPebbleCount--;
			// move counterclockwise by one pit
			pitToPlace++;
		}
		// there is no pit 14, we "loop" back to 0
		if (pitToPlace > 13)
			pitToPlace = 0;
	}
	afterMove(board, realMove);
}

// check some things after a move has ended
// feed the parameters given to the move function to this function
function afterMove(board, realMove){
	// not including big pits,
	if (!(pitToPlace == 0 || pitToPlace == 7)){
		// if the last pit we placed a pebble into only has one pebble, that means we landed in a pit that Was empty
		// when this happens, we capture our one pebble and all of the pebbles from the pit opposite to it 
		if (board[pitToPlace-1] == 1){
			// but this only applies when you land in an empty pit on your side of the board
			if (whoseTurn == 0 && pitToPlace - 1 < 6){
				// add the pebbles from the pit you landed in and the one opposite to it to your big pit and
				opposite(pitToPlace-1);
				board[6] += board[pitToPlace-1] + board[pitOpposite];
				board[pitToPlace-1] = 0;
				board[pitOpposite] = 0;
				if (realMove){
					pitElements[6].innerHTML = board[6];
					pitElements[pitToPlace-1].innerHTML = 0;
					pitElements[pitOpposite].innerHTML = 0;
				}
			}
			else if (whoseTurn == 1 && pitToPlace > 6){
				opposite(pitToPlace-1);
				board[13] += board[pitToPlace-1] + board[pitOpposite];
				board[pitToPlace-1] = 0;
				board[pitOpposite] = 0;
				if (realMove){
					pitElements[13].innerHTML = board[13];
					pitElements[pitToPlace-1].innerHTML = 0;
					pitElements[pitOpposite].innerHTML = 0;
				}
			}
		} 
	}
	// if either player's entire side of small pits is empty, the game comes to an end
	// the remaining pebbles on your side are captured by you
	if (board[0] + board[1] + board[2] + board[3] + board[4] + board[5] == 0 ||
		board[7] + board[8] + board[9] + board[10] + board[11] + board[12] == 0)
		gameEnds(board, realMove);
	
	if(realMove){
	console.log(board[12] + " " + board[11] + " " + board[10] + " " + board[9] + " " + board[8] + " " + board[7] + "\n" + 
	board[13] + "         " + board[6] + "\n" +
	board[0] + " " + board[1] + " " + board[2] + " " + board[3] + " " + board[4] + " " + board[5]);
	console.log(whoseTurn);}
	
	// if we landed in a small pit and the game is not over, our turn is over
	if (!(pitToPlace == 0 || pitToPlace == 7)){
		// only end the computer's turn if it was a real move
		if (whoseTurn == 1 && realMove)
			whoseTurn = 0;
		// if our turn ended, set the turn to the computer's and tell it to start thinking
		else if (whoseTurn == 0){
			whoseTurn = 1;
			greedyAiThinking(realBoard);
		}
	}
	
	// if this was a thinking move, report how many pebbles are in the computer's big pit
	if (!realMove)
		pebblesIn13AfterThinking = board[13];
	
	// if we land in our big pit, we get another turn. we do not need code for this on the player side since the whoseTurn variable is already properly set
	// however, we will set a flag here for the computer if it was a move it thought about
	if (pitToPlace == 0){
		if (!realMove)
			landedInBig = true;
	// if it was a real move, tell it to think about its next one
		else
			greedyAiThinking(realBoard);
	}
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

var pebblesIn13AfterThinking;
// flag for landing in a big pit
var landedInBig;
// the computer will choose based on which moves give it the most pebbles with its turn (or set of turns if it gets extra turns)
function greedyAiThinking(board){
	var pebblesAlreadyOwned = board[13];
	// this array will hold the number of pebbles earned for each of the possible moves
	var pebblesEarned = [0, 0, 0, 0, 0, 0];
	var thinkBoard;
	// for each of the computer's possible moves
	for (let i = 7; i < 13; i++){
		// make a copy of the actual board
		thinkBoard = board.slice();
		// set flag to false at the start of each move check
		landedInBig = false;
		// only think about a move if it's valid
		if (thinkBoard[i] != 0){
			// make the move on the temporary thinking board with our position in this loop dictating which pit has been chosen
			pitChosen = i;
			move(thinkBoard, false);
			// store the number of pebbles this move earned us
			pebblesEarned[i-7] += pebblesIn13AfterThinking - pebblesAlreadyOwned;
			// if this move landed the computer in the big pit, it should be worth a bit more
			if (landedInBig)
				pebblesEarned[i-7] += 1.5;
		}
	}
	
	// find the most pebbles we were able to earn with a move
	var mostEarned = 0;
	for (let i = 0; i < 6; i++)
		if (pebblesEarned[i] > mostEarned)
			mostEarned = pebblesEarned[i];
	// now let's store the moves that gave us the most pebbles in an array
	var bestMoves = [];
	for (let i = 0; i < 6; i++)
		if (pebblesEarned[i] == mostEarned)
			bestMoves.push(i);
	// if there was only one best move, then choose it
	if (bestMoves.length == 1){
		pitChosen = bestMoves[0] + 7;
	}
	// if there was more than one, we will just randomly choose one
	else{
		pitChosen = bestMoves[Math.round(Math.random() * (bestMoves.length - 1))] + 7;
	}
	// finally the computer can make its move
	move(realBoard, true);	
}

// what happens when an end condition has been reached
function gameEnds(board, realMove){
	// empty any pebbles remaining into the respective big pit
	for (let i = 0; i < 6; i++)
	{
		board[6] += board[i];
		board[i] = 0;
		if (realMove)
			pitElements[i].innerHTML = 0;
	}
	if (realMove)
		pitElements[6].innerHTML = board[6];
	for (let i = 7; i < 13; i++){
		board[13] += board[i];
		board[i] = 0;
		if (realMove)
			pitElements[i].innerHTML = 0;
	}
	if (realMove)
		pitElements[13].innerHTML = board[13];
	// if this was a thinking move, report the number of pebbles in big pit
	if (!realMove)
		pebblesIn13AfterThinking = board[13];
	
	if (realMove){
	console.log(board[12] + " " + board[11] + " " + board[10] + " " + board[9] + " " + board[8] + " " + board[7] + "\n" + 
	board[13] + "         " + board[6] + "\n" +
	board[0] + " " + board[1] + " " + board[2] + " " + board[3] + " " + board[4] + " " + board[5]);
	console.log(whoseTurn);	
	if (board[6] > board[13])
		console.log("player wins");
	else if (board[6] < board[13])
		console.log("computer wins");
	else
		console.log("this match ended in a tie");
	}
}

function playerChoice(pitChoice){
	pitChosen = pitChoice;
	move(realBoard, true);
}
