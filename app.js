const inputBoxes = document.querySelectorAll('.input-box');
const playerTurnText = document.querySelector('.info-screen h1');
const crossOutLine = document.querySelector('.cross-out');
const resetGameButton = document.querySelector('.reset-game');
const player1Score = document.querySelector('.player-count-x');
const player2Score = document.querySelector('.player-count-y');
const resetScoreButton = document.querySelector('.reset-score');


console.log(player1Score);
let gameBoardArr = [
    '', '', '',
    '', '', '',
    '', '', '',
];

const player1 = 'X';
const player2 = 'O';
let player1Turn = true; //player 1 starts (X)

//EVENT LISTENERS
inputBoxes.forEach(box => {
    box.addEventListener('click', checkBox);
});

resetGameButton.addEventListener('click', resetGameFunc);
resetScoreButton.addEventListener('click', resetScoreFunc);
document.addEventListener('DOMContentLoaded', loadStorage);


//FUNCTIONS
function resetGameFunc() {
    location.reload();
}

function checkBox() {
    player = player1Turn? player1: player2; //determines the player
    
    boxNumPressed = this.dataset.boxnum; 
    if (gameBoardArr[boxNumPressed - 1] !== ''){
        console.warn('already marked by a player');
        return;
    }
    gameBoardArr[boxNumPressed - 1] = player;
    this.innerHTML = `<p class="playerMark">${player}</p>`;
    
    console.log(player);
    
     //switch to other player's turn
    console.log(gameBoardArr);
    
    player1Turn = !player1Turn;

    playerTurnText.innerHTML = `Player ${player1Turn? player1: player2}'s turn`;
    checkWins(player);
}

function checkWins(playerChar /*char*/){
    let playerHasWon = false;
    //Checking rows
    for(i = 0; i < 3; i++) {
        j = i * 3;
        if(gameBoardArr[0 + j] === playerChar && gameBoardArr[1 + j]  === playerChar && gameBoardArr[2 + j] === playerChar){
            playerTurnText.innerHTML = `Player ${playerChar} Wins!!`;
            playerHasWon = true;

            if(i == 0) {crossOutLine.classList.add('top-row')};
            if(i == 1) {crossOutLine.classList.add('mid-row')};
            if(i == 2) {crossOutLine.classList.add('bottom-row')};
        }
    }

    //checking columns
    for(i = 0; i < 3; i++) {
        if(gameBoardArr[0 + i] === playerChar && gameBoardArr[3 + i] === playerChar && gameBoardArr[6 + i] === playerChar) {
            playerTurnText.innerHTML = `Player ${playerChar} Wins!!`;
            playerHasWon = true;

            if(i == 0) {crossOutLine.classList.add('left-col')};
            if(i == 1) {crossOutLine.classList.add('mid-col')};
            if(i == 2) {crossOutLine.classList.add('right-col')};

        }
    }

    //checking diagonals
    for (i = 0; i <= 2; i = i + 2){
        if(gameBoardArr[0 + i] === playerChar && gameBoardArr[4] === playerChar && gameBoardArr[8 - i] === playerChar) {
            playerTurnText.innerHTML = `Player ${playerChar} Wins!!`;
            playerHasWon = true;
            
            if(i == 0) {crossOutLine.classList.add('forward-slash')};
            if(i == 1) {crossOutLine.classList.add('backward-slash')};
        }
    }

    let gameFinished = true;

    for (i = 0; i < gameBoardArr.length; i++){
        if( gameBoardArr[i] === ''){
            gameFinished = false;
            continue;
        }
    }

    if (gameFinished && !playerHasWon) {
        playerTurnText.innerHTML = `It's a Tie!!`;
    }

    if(playerHasWon) {//if a player has won (record the win)
        if (playerChar === 'X') addToStorage(1, 0);
        if (playerChar === 'O') addToStorage(0, 1);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
        });
    }

    if (playerHasWon || gameFinished) {
        inputBoxes.forEach(input => input.removeEventListener('click', checkBox));
    }
}

function loadStorage() {
    player1Wins = localStorage.getItem(player1);
    player2Wins = localStorage.getItem(player2);
    console.log(localStorage)
    if(player1Wins === null){
        localStorage.setItem(player1, 0);
    }
    if(player2Wins === null){
        localStorage.setItem(player2, 0);
    }

    displayScore();
}

function addToStorage(player1Add = 0, player2Add = 0) {
    player1Wins = parseInt(localStorage.getItem(player1));
    player2Wins = parseInt(localStorage.getItem(player2));
    localStorage.setItem(player1, player1Wins + player1Add);
    localStorage.setItem(player2, player2Wins + player2Add);

    displayScore();
}

function resetScoreFunc() {
    localStorage.clear();
    loadStorage();
}

function displayScore() {
    player1Wins = localStorage.getItem(player1);
    player2Wins = localStorage.getItem(player2);
    player1Score.innerHTML = player1Wins;
    player2Score.innerHTML = player2Wins;
}
