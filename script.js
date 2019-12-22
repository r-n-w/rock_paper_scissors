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
            return "me"
        } else {
            return "computer"
        }

}
function addScore(winner) {
    winner === "me" ? myWins++ : compWins++;
}
function playGame (myMove) {
    var computerMove = generateComputerMove();
    if (isWinner(myMove,computerMove)) {
        var winner = whoWon(myMove,computerMove);
        addScore(winner);
    } else {
        isTie();
    }


    console.log(`computer move is: ${computerMove}`)
    console.log(`my move is: ${myMove}`)
    console.log(`myWins: ${myWins}`);
    $('#my_score').html(myWins);
}