let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let gameMode = ""; // "PvP" or "PvC"
let playerMarker = "X";
let computerMarker = "O";
let playerXScore = 0;
let playerOScore = 0;

const statusDisplay = document.getElementById("game-status");
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");
const modeSelect = document.getElementById("mode-select");
const chooseMarkerDiv = document.getElementById("choose-marker");
const playerXScoreDisplay = document.getElementById("player-x-score");
const playerOScoreDisplay = document.getElementById("player-o-score");

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(clickedCell, index) {
    if (board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        statusDisplay.textContent = `${currentPlayer} wins!`;
        updateScore(currentPlayer);
        gameActive = false;
        setTimeout(() => restartGame(), 2000); // Restart the game after 2 seconds
    } else if (board.every(cell => cell !== "")) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false;
        setTimeout(() => restartGame(), 2000); // Restart the game after 2 seconds
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.textContent = `${currentPlayer}'s turn`;

        if (gameMode === "PvC" && currentPlayer === computerMarker) {
            computerMove();
        }
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function updateScore(winner) {
    if (winner === "X") {
        playerXScore++;
        playerXScoreDisplay.textContent = playerXScore;
    } else if (winner === "O") {
        playerOScore++;
        playerOScoreDisplay.textContent = playerOScore;
    }
}

function computerMove() {
    let emptyIndices = board.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
    let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    setTimeout(() => handleCellClick(cells[randomIndex], randomIndex), 500);
}

function startGame() {
    gameActive = true;
    board.fill("");
    currentPlayer = "X";
    cells.forEach((cell, index) => {
        cell.textContent = "";
        cell.addEventListener("click", () => handleCellClick(cell, index), { once: true });
    });
    statusDisplay.textContent = "X's turn";
    restartButton.classList.remove("hidden");
}

function restartGame() {
    startGame();
    if (gameMode === "PvP") {
        // Keep existing score settings; do not reset scores unless specifically required
    } else if (gameMode === "PvC") {
        // If in PvC mode, you can handle any specific resets or actions here
    }
}

function resetScores() {
    playerXScore = 0;
    playerOScore = 0;
    playerXScoreDisplay.textContent = playerXScore;
    playerOScoreDisplay.textContent = playerOScore;
}

document.getElementById("player-vs-player").addEventListener("click", () => {
    gameMode = "PvP";
    modeSelect.classList.add("hidden");
    startGame();
});

document.getElementById("player-vs-computer").addEventListener("click", () => {
    gameMode = "PvC";
    modeSelect.classList.add("hidden");
    chooseMarkerDiv.classList.remove("hidden");
});

document.getElementById("choose-x").addEventListener("click", () => {
    playerMarker = "X";
    computerMarker = "O";
    chooseMarkerDiv.classList.add("hidden");
    startGame();
});

document.getElementById("choose-o").addEventListener("click", () => {
    playerMarker = "O";
    computerMarker = "X";
    chooseMarkerDiv.classList.add("hidden");
    startGame();
});

restartButton.addEventListener("click", () => {
    restartGame();
});
