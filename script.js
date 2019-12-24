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
var myMove = 10;
var computerMove = 10;
var winnersColor = 10;


$('.rock').click(playRock);
$('.paper').click(playPaper);
$('.scissors').click(playScissors);

function playRock() {
    $('#narration_overlay').animate({'opacity':1},100)
    myMove = 0;
    setTimeout(playGame,200);
}
function playPaper() {
    $('#narration_overlay').animate({'opacity':1},100)
    myMove = 1;
    setTimeout(playGame,200);
}
function playScissors() {
    $('#narration_overlay').animate({'opacity':1},100)
    myMove = 2;
    setTimeout(playGame,200);
}
function playGame () {
    computerMove = generateComputerMove();
    result = whoWon(myMove,computerMove);
    addScore(result);
    winnersColor = fightColor(winnersMove());
    updateResults();
    animateResults();
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
    function winnersMove() {
        if (result === -1) {
            return myMove;
        } else {
            return computerMove;
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
    /*
    function translateToRPS(input) {
        if (input === 0) {
            return "rock"
        } else if (input === 1) {
            return "paper"
        } else {
            return "scissors"
        }
    }
    */
    function updateResults() {
        var myPos = fightPosition(myMove);
        var compPos = fightPosition(computerMove);
        var myColor = fightColor(myMove);
        var compColor = fightColor(computerMove);
        var narrationColor = winnersColor;
        resultMessage = generateResultMessage(result);
        $('#narration span').html(resultMessage);
        $('#narration').css('background-color',narrationColor)
        $('#my_play > img').css('left',myPos + 'px');
        $('#comp_play > img').css('left',compPos + 'px');
        $('#my_play .label').css('background-color', myColor);
        $('#comp_play .label').css('background-color', compColor);
    }
        function fightPosition(move) {
            switch(move) {
                case 0:
                    return -4;
                case 1:
                    return -122;
                case 2:
                    return -244;
            };
        }
        function fightColor(move) {
            switch(move) {
                case 0:
                    return 'salmon';
                case 1:
                    return 'paleturquoise';
                case 2:
                    return 'wheat';
            };
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
        setTimeout(displayNarration,5000);


        //figure out how to update score after animation
        $('#my_score').html(myWins);
        $('#computer_score').html(compWins);
        setTimeout(resetGame,7000);
    }
        function displayMyMove() {
            $('#my_overlay').animate({'opacity':0},1000,
                function(){$('#my_play .label').animate({'opacity':0},500)}
            );

        }
        function displayCompMove() {
            $('#comp_overlay').animate({'opacity':0},1000,
                function(){$('#comp_play .label').animate({'opacity':0},500)}
            );
        }
            function animateMyWin() {}
            function animateTie() {
                $('#my_play').animate({'left':200 + 'px'},1000,
                    function(){$('#my_play').animate({'left':0 + 'px'},1000)}
                );
                $('#comp_play').animate({'left':-200 + 'px'},1000,
                    function(){$('#comp_play').animate({'left':0 + 'px'},1000)}
                );
            }
            function animateCompWin() {}
        function displayNarration() {
            $('#narration_overlay').animate({'opacity':0},1000)
        }
        function resetGame() {
            $('#my_overlay, #comp_overlay').animate({'opacity':1},1000,
                function(){$('.label').css('opacity', 1)}
            );
            displayTryAgainMessage();
        }
            function displayTryAgainMessage(){
                $('#narration span').html('Play again pls');
            }