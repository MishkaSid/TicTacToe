"use strict";

const user = document.getElementById('user');
const startButton = document.getElementById('start');

let gameOver = false;

// Represent board state as an array of nulls
let TicTacToe = Array(9).fill(null);

function slotClick(id) {
    if (gameOver || TicTacToe[id] !== null) return; // Stop clicks if game over or slot is filled

    if (user.innerHTML === 'X turn') {
        TicTacToe[id] = 1;
        document.getElementById(id).innerHTML = '<img src="images/x.png">';
        userTurn();
        render();
    } else if (user.innerHTML === 'O turn') {
        TicTacToe[id] = 0;
        document.getElementById(id).innerHTML = '<img src="images/o.png">';
        userTurn();
        render();
    }
}

function userTurn() {  
    if (user.style.backgroundColor === 'crimson' || !user.style.backgroundColor) {
        user.style.backgroundColor = 'cornflowerblue';
        user.innerHTML = 'O turn';
    } else {
        user.style.backgroundColor = 'crimson';
        user.innerHTML = 'X turn';
    }
}

function start() {
    TicTacToe = Array(9).fill(null); // Reset game board state
    gameOver = false; // Reset game over flag

    // Clear all slots in UI
    const slots = document.getElementsByClassName('slots');
    for (let i = 0; i < slots.length; i++) {
        slots[i].innerHTML = '';
    }

    user.style.backgroundColor = 'crimson';
    user.innerHTML = 'X turn';
    startButton.style.opacity = '0';
    startButton.disabled = true;
}

function render() {
    // Define winning combinations
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Check for winner
    for (const [a, b, c] of winningCombinations) {
        if (TicTacToe[a] !== null && TicTacToe[a] === TicTacToe[b] && TicTacToe[a] === TicTacToe[c]) {
            gameOver = true;
            if (TicTacToe[a] === 1) {
                user.innerHTML = 'X wins';
                user.style.backgroundColor = 'crimson';
            } else {
                user.innerHTML = 'O wins';
                user.style.backgroundColor = 'cornflowerblue';
            }
            startButton.style.opacity = '1';
            startButton.innerHTML = 'Restart';
            startButton.disabled = false;
            return; // Stop checking after a win
        }
    }

    // Check for draw (if no nulls left and no winner)
    if (!TicTacToe.includes(null) && !gameOver) {
        gameOver = true;
        user.innerHTML = 'It\'s a draw!';
        user.style.backgroundColor = 'gray';
        startButton.style.opacity = '1';
        startButton.innerHTML = 'Restart';
        startButton.disabled = false;
    }
}
