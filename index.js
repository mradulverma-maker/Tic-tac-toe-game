
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", "", ""];

let scoreX = 0;
let scoreO = 0;
let draws = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {

        if (!gameActive || board[index] !== "") {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        cell.classList.add(currentPlayer.toLowerCase());
        cell.disabled = true;

        checkWinner();
    });
});

function checkWinner() {

    let winningLine = null;

    for (let combination of winningCombinations) {

        const [a, b, c] = combination;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            winningLine = combination;
            break;
        }
    }

    if (winningLine) {

        gameActive = false;

        winningLine.forEach(index => {
            cells[index].classList.add("winner");
        });

        statusText.textContent = `Player ${currentPlayer} wins!`;

        if (currentPlayer === "X") {
            scoreX++;
            document.getElementById("scoreX").textContent = scoreX;
        } else {
            scoreO++;
            document.getElementById("scoreO").textContent = scoreO;
        }

        return;
    }

    if (!board.includes("")) {

        gameActive = false;
        draws++;

        document.getElementById("draws").textContent = draws;
        statusText.textContent = "It's a draw!";

        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function newGame() {

    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => {

        cell.textContent = "";
        cell.disabled = false;

        cell.classList.remove("x", "o", "winner");
    });

    statusText.textContent = "Player X's turn";
}

resetButton.addEventListener("click", newGame);
