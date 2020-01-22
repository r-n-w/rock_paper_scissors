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

Need to make the narration script change to "try again pls" gradual
Need to make an exciting well timed score update.
Set clear background to icons
make icons spin before they punch


*/


var myWins = 0;
var compWins = 0;
var result = 10;
var resultMessage = 0;
var myMove = 10;
var computerMove = 10;
var winnersColor = 10;
activateButtons();


function activateButtons() {
    $('.rock, .paper, .scissors').css('box-shadow','0 0 4px 0 #919191');

    $('.rock').hover(function() {
        $(this).css("box-shadow", "0 0 5px 2px #919191");
        $('.rock .overlay').css("opacity","1");
        }, function() {
        $(this).css("box-shadow", "0 0 4px 0 #919191");
        $('.rock .overlay').css("opacity","0");
        });
    $('.paper').hover(function() {
        $(this).css("box-shadow", "0 0 5px 2px #919191");
        $('.paper .overlay').css("opacity","1");
        }, function() {
        $(this).css("box-shadow", "0 0 4px 0 #919191");
        $('.paper .overlay').css("opacity","0");
        });
    $('.scissors').hover(function() {
        $(this).css("box-shadow", "0 0 5px 2px #919191");
        $('.scissors .overlay').css("opacity","1");
        }, function() {
        $(this).css("box-shadow", "0 0 4px 0 #919191");
        $('.scissors .overlay').css("opacity","0");
        });            
    $('.rock .overlay').mousedown(function() {
        $(this).css("background-color", "#fa9084");
    });
    $('.rock .overlay').mouseup(function() {
        $(this).css("background-color", "#fa8072");
    });

    $('.paper .overlay').mousedown(function() {
        $(this).css("background-color", "#c0eded");
    });
    $('.paper .overlay').mouseup(function() {
        $(this).css("background-color", "#afeeee");
    });

    $('.scissors .overlay').mousedown(function() {
        $(this).css("background-color", "#faeacd");
    });
    $('.scissors .overlay').mouseup(function() {
        $(this).css("background-color", "#f5deb3");
    });

    $('.rock').click(playRock);
    $('.paper').click(playPaper);
    $('.scissors').click(playScissors);
}
function deactivateButtons() {
    $('.rock, .paper, .scissors').off();
    $('.overlay').animate({'opacity':0},100);
    $('.rock, .paper, .scissors').css('box-shadow','0 0 0 0 #919191');
}
function playRock() {
    deactivateButtons();
    myMove = 0;
    setTimeout(playGame,100);
}
function playPaper() {
    deactivateButtons();
    myMove = 1;
    setTimeout(playGame,100);
}
function playScissors() {
    deactivateButtons();
    myMove = 2;
    setTimeout(playGame,100);
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
function updateResults() {
    var myPos = fightPosition(myMove);
    var compPos = fightPosition(computerMove);
    var myColor = fightColor(myMove);
    var compColor = fightColor(computerMove);
    var narrationColor = winnersColor;
    resultMessage = generateResultMessage(result);
    $('#narration').css('opacity',0)
    $('#narration span').html(resultMessage);
    $('#my_play > img').attr('src',myPos);
    $('#comp_play > img').attr('src',compPos);
    $('#my_play').css('background-color', myColor);
    $('#comp_play').css('background-color', compColor);
    $('#my_play .label').css('background-color', myColor);
    $('#comp_play .label').css('background-color', compColor);
}
function fightPosition(move) {
    switch(move) {
        case 0:
            return "rock.png";
        case 1:
            return "paper.png";
        case 2:
            return "scissors.png";
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
    var timeLine = 100;
    setTimeout(displayMyMove,timeLine);

    timeLine += 2500;
    setTimeout(displayCompMove,timeLine);
    timeLine += 3000;

    switch (result) {
        case -1:
            setTimeout(animateMyWin,timeLine);
            break;
        case 0:
            setTimeout(animateTie,timeLine);
            break;
        case 1:
            setTimeout(animateCompWin,timeLine);
            break;
    }

    timeLine += 2000;
    setTimeout(displayNarration,timeLine);
    setTimeout(function() {
        $('#my_score').html(myWins);
        $('#computer_score').html(compWins);
    },timeLine);

    timeLine += 3000;
    setTimeout(resetGame,timeLine);
}
function displayMyMove() {

    setTimeout(function(){$('#my_play .label').animate({'opacity':1},1000)},0);
    setTimeout(function(){$('#my_play img, #my_play').css('opacity', '1')},1000);
    setTimeout(function(){$('#my_play .label').animate({'opacity':0},1000)},2500);

}
function displayCompMove() {
    setTimeout(function(){$('#comp_play .label').animate({'opacity':1},1000)},0);
    setTimeout(function(){$('#comp_play img, #comp_play').css('opacity', '1')},1000);
    setTimeout(function(){$('#comp_play .label').animate({'opacity':0},1000)},2500);

}
function animateMyWin() {
    setTimeout(function(){$('#my_play').css('z-index', '100')},0);
    setTimeout(function(){$('#my_play').animate({'left':520 + 'px'},500)},500);
    setTimeout(function(){$('#comp_play img, #comp_play').css('opacity',0)},1000);
    setTimeout(function(){$('#my_play').animate({'left':0 + 'px'},1000)},1000);
    setTimeout(function(){$('#my_play').css('z-index', '10')},1500);
}
function animateTie() {
    $('#my_play').animate({'left':200 + 'px'},1000,
        function(){$('#my_play').animate({'left':0 + 'px'},1000)}
    );
    $('#comp_play').animate({'left':-200 + 'px'},1000,
        function(){$('#comp_play').animate({'left':0 + 'px'},1000)}
    );
}
function animateCompWin() {
    setTimeout(function(){$('#comp_play').css('z-index', '100')},0);
    setTimeout(function(){$('#comp_play').animate({'left':-520 + 'px'},500)},500);
    setTimeout(function(){$('#my_play img, #my_play').css('opacity',0)},1000);
    setTimeout(function(){$('#comp_play').animate({'left':0 + 'px'},1000)},1000);
    setTimeout(function(){$('#comp_play').css('z-index', '10')},1500);
}
function displayNarration() {
    $('#narration').animate({'opacity':1},1000)
}
function resetGame() {
    $('#my_play img, #comp_play img, #my_play, #comp_play').animate({'opacity':0},1000);
    displayTryAgainMessage();
    activateButtons();
}
function displayTryAgainMessage(){
    $('#narration span').html('Play again pls');
}