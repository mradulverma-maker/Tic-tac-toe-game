const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");
const drawsText = document.getElementById("draws");

let currentPlayer = "X";
let gameActive = true;
let board = Array(9).fill("");
let scoreX = 0;
let scoreO = 0;
let draws = 0;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function setStatus(message) {
    if (statusText) statusText.textContent = message;
}

function updateScoreboard() {
    if (scoreXText) scoreXText.textContent = String(scoreX);
    if (scoreOText) scoreOText.textContent = String(scoreO);
    if (drawsText) drawsText.textContent = String(draws);
}

function finishGame(winningLine = null) {
    gameActive = false;

    cells.forEach(cell => {
        cell.disabled = true;
    });

    if (winningLine) {
        winningLine.forEach(index => {
            if (cells[index]) cells[index].classList.add("winner");
        });

        setStatus(`Player ${currentPlayer} wins!`);
        if (currentPlayer === "X") scoreX++;
        else scoreO++;
    } else {
        draws++;
        setStatus("It's a draw!");
    }

    updateScoreboard();
}

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            finishGame(combination);
            return;
        }
    }

    if (board.every(cell => cell !== "")) {
        finishGame();
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    setStatus(`Player ${currentPlayer}'s turn`);
}

function newGame(resetScores = false) {
    board = Array(9).fill("");
    currentPlayer = "X";
    gameActive = true;

    if (resetScores) {
        scoreX = 0;
        scoreO = 0;
        draws = 0;
    }

    cells.forEach(cell => {
        cell.textContent = "";
        cell.disabled = false;
        cell.classList.remove("x", "o", "winner");
    });

    updateScoreboard();
    setStatus("Player X's turn");
}

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (!gameActive || board[index] !== "") return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        cell.disabled = true;

        checkWinner();
    });
});

if (resetButton) {
    resetButton.addEventListener("click", () => newGame(true));
}

newGame(false);
