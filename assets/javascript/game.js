//* GLOBAL VARIABLES - USED ACROSS THE JAVASCRIPT FILE *//

//* Data - Variables and Arrays *//
var nameOptions = ["meredith", "grey", "derrick", "karev", "dreamy", "steamy"];
var clickedWord = "";
var lettersWord = [];
var numBlanks = 0;
var blanksAndSuccesses = []; //* _ _ a _ _*//
var wrongLetters = [];


//* Counters *//
var winCount = 0;
var lossCount = 0;
var guessesLeft = 10;


//* Functions *//

function beginGame () {
	clickedWord = nameOptions[Math.floor(Math.random() * nameOptions.length)];
	lettersWord = clickedWord.split("");
	numBlanks = lettersWord.length;

	//*Reset*//
	guessesLeft=10;
	wrongLetters=[];
	blanksAndSuccesses= [];

	//*Populate blanks with correct number of blanks *//
	for (var i=0; i<numBlanks; i++){
		blanksAndSuccesses.push("_");
	}

	//*Javascript for making changes to HTML based on new game*//
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("leftGuesses").innerHTML = guessesLeft;
	document.getElementById("winCounter").innerHTML = winCount;
	document.getElementById("lossCounter").innerHTML = lossCount;
	//*Test*//
	console.log(clickedWord);
	console.log(lettersWord);
	console.log(numBlanks);
}

function checkLetters(letter){
	// Does the letter clicked match in the word?
	var isLetterInWord=false;
	for (var i = 0; i < numBlanks; i++) {
		if(clickedWord[i] == letter) {
			isLetterInWord = true;
		}
	}


	//Check letter placement in the word, pupulate blanks from blanksAndSuccesses array
	if(isLetterInWord){
		for (var i=0; i<numBlanks; i++) {
			if(clickedWord[i] ==letter) {
			blanksAndSuccesses[i] = letter;
			}
		}
	}

	else {
		wrongLetters.push(letter);
		guessesLeft--
	}
	// Testing
	console.log(blanksAndSuccesses);

}

function roundComplete() {
	console.log("Wins Count: " + winCount + "| Loss Count: " + lossCount + " | Guesses Leftover: " + guessesLeft);

	//update HTML
	document.getElementById("leftGuesses").innerHTML = guessesLeft;
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

    if (lettersWord.toString() == blanksAndSuccesses.toString()) {
        winCount++;
        alert("Your patient is alive and you now own the Grey Sloan hospital!");

        document.getElementById("winCounter").innerHTML = winCount;

        beginGame();
    }

    // Check if user lost

    else if (guessesLeft == 0) {
        lossCount++;
        alert("Oh no! Your patient died");

        document.getElementById("lossCounter").innerHTML = lossCount;

        beginGame();
    }
}


//* Logic section
//
// Starts the game initially*//
beginGame();

// Clicks!

document.onkeyup = function(event) {
	var lettersWord = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(lettersWord);
	roundComplete();

	//Test
	console.log(lettersWord)
}





