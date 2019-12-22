

$('.rock').click(play_rock);
$('.paper').click(play_paper);
$('.scissors').click(play_scissor);

function play_rock() {
computer_move()
}

function play_paper() {

}

function play_scissor() {

}

function computer_move() {
    var move = Math.floor(Math.random() * 3);
    switch (move) {
        case 0:
            move = "rock";
            break;
        case 1:
            move = "paper";
            break;
        case 2:
            move = "scissors";
            break;
    }
    console.log(`computer move is: ${move}`)
    return move
}