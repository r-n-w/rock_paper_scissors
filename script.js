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
function isWinner (yourMove,computerMove) {
    return (yourMove === computerMove) ? false : true;
}
function isTie() {
    console.log("you tied, try again");
}
function whoWon(myMove,computerMove) {
    console.log("there's a winner!");
    if (
        (myMove === 0 && computerMove === 2) ||
        (myMove === 1 && computerMove === 0) ||
        (myMove === 2 && computerMove === 1)) {
            return "You won!"
        } else {
            return "Womp.. try again."
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
function addScore(winner) {
    winner === "You won!" ? myWins++ : compWins++;
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
function animateResults(myWins,compWins,winner,myMove,computerMove) {
    var myPos = fightPosition(myMove);
    var compPos = fightPosition(computerMove);


    $('#my_play > img').animate({'left':myPos + 'px'},0)
    $('#comp_play > img').animate({'left':compPos + 'px'},0)
    $('#narration > span').html(winner)
    $('#my_score').html(myWins);
    $('#computer_score').html(compWins);
}
function playGame (myMove) {
    var computerMove = generateComputerMove();
    if (isWinner(myMove,computerMove)) {
        var winner = whoWon(myMove,computerMove);
        addScore(winner);
    } else {
        var winner = "It's a tie"
        isTie();
    }
    var computerMoveRPS = translateToRPS(computerMove);
    var myMoveRPS = translateToRPS(myMove);

    console.log(`computer move is: ${computerMoveRPS}`);
    console.log(`my move is: ${myMoveRPS}`);
    console.log(`myWins: ${myWins}`);
    console.log(`compWins: ${compWins}`);
    animateResults(myWins,compWins,winner,myMove,computerMove)
}