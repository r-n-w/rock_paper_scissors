/*
When player Clicks .rock .paper or .scissors the game begins
'play_rock' begins a game with rock as your move
'play_paper' begins a game with paper as your move
'play_scissors' begins a game with paper as your move

variables:
myMove
computerMove

moves correspond:
0: rock
1: paper
2: scissors

play _____
generates 'myMove'
calls 'playGame(myMove)' which handles the rest of the game:

calls 'generateComputerMove()'
if 'isWinner()' = false call 'who_won?()'
adds tally to computer or yourself (global variables?)



*/
var myWins = 0;
var compWins = 0;
var result = 10;
var resultMessage = 0;


$('.rock').click(play_rock);
$('.paper').click(play_paper);
$('.scissors').click(play_scissors);

function play_rock() {
    var myMove = 0;
    playGame(myMove);
}

function play_paper() {
    var myMove = 1;
    playGame(myMove);
}

function play_scissors() {
    var myMove = 2;
    playGame(myMove);
}
function generateComputerMove() {
    var move = Math.floor(Math.random() * 3);
    return move
}
function whoWon(myMove,computerMove) {
    //User Win = -1
    //Tie      = 0
    //Comp Win = 1
    console.log("there's a winner!");
    if (
        (myMove === 0 && computerMove === 2) ||
        (myMove === 1 && computerMove === 0) ||
        (myMove === 2 && computerMove === 1)) {
            return -1;
        } else if (myMove === computerMove){
            return 0;
        } else {
            return 1;
        }
}
function translateToRPS(input) {
    if (input === 0) {
        return "rock"
    } else if (input === 1) {
        return "paper"
    } else {
        return "scissors"
    }
}
function addScore(result) {
    switch (result) {
        case -1:
            myWins++;
            break;
        case 0:
            break;
        case 1:
            compWins++;
            break;
    }
}
function generateResultMessage(result) {
    switch (result) {
        case -1:
            return "You Win"
            break;
        case 0:
            return "Tie"
            break;
        case 1:
            return "You Lost"
            break;
    }
}

function fightPosition(move) {
    if (move === 0) {
        return -4
    } else if (move === 1) {
        return -122
    } else {
        return -248
    }
}
function updateResults(myWins,compWins,myMove,computerMove) {
    var myPos = fightPosition(myMove);
    var compPos = fightPosition(computerMove);

    $('#my_play > img').css('left',myPos + 'px');
    $('#comp_play > img').css('left',compPos + 'px');
}
function animateResults() {
    setTimeout(displayMyMove,100);
    setTimeout(displayCompMove,1500);
    setTimeout(animateTie,3000);
    /*
    switch (result) {
        case -1:
            animateMyWin();
            break;
        case 0:
            animateTie();
            break;
        case 1:
            animateCompWin();
            break;
    }
    */
       //figure out how to update score after animation
       $('#my_score').html(myWins);
       $('#computer_score').html(compWins);
    setTimeout(resetGame,6000);
}
function animateMyWin() {};
function animateTie() {
    $('#my_play').animate({'left':200 + 'px'},1000,
        function(){$('#my_play').animate({'left':0 + 'px'},1000)}
    );
    $('#comp_play').animate({'left':-200 + 'px'},1000,
        function(){$('#comp_play').animate({'left':0 + 'px'},1000)}
    );
    setTimeout(displayResultMessage,2000);
}
function animateCompWin() {};
function displayResultMessage() {
    $('#narration > span').html(resultMessage);
    $('#narration').css('background-color','turquoise')
}
function displayTryAgainMessage(){
    $('#narration > span').html('Play again pls');
}
function displayMyMove() {
    $('#my_overlay').animate({'opacity':0},1000);
}
function displayCompMove() {
    $('#comp_overlay').animate({'opacity':0},1000);
}
function resetGame() {
    $('#my_overlay, #comp_overlay').animate({'opacity':1},1000);
    displayTryAgainMessage();
}

function playGame (myMove) {
    var computerMove = generateComputerMove();
    result = whoWon(myMove,computerMove);
    resultMessage = generateResultMessage(result);
    
    console.log(`result is ${result}`);
    addScore(result);
    var computerMoveRPS = translateToRPS(computerMove);
    var myMoveRPS = translateToRPS(myMove);

    console.log(`computer move is: ${computerMoveRPS}`);
    console.log(`my move is: ${myMoveRPS}`);
    console.log(`myWins: ${myWins}`);
    console.log(`compWins: ${compWins}`);
    updateResults(myWins,compWins,myMove,computerMove);
    animateResults();
}