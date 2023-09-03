const cells = document.querySelectorAll("[data-cell]");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");
const playerXScore = document.getElementById("playerXScore");
const playerOScore = document.getElementById("playerOScore");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let playerXWins = 0;
let playerOWins = 0;
let winner = null; // Variável para armazenar o jogador vencedor

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            winner = gameBoard[a]; // Definir o jogador vencedor
            gameActive = false;
            message.innerText = `Jogador ${winner} venceu!`;
            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");
            updateScore(winner);
            return;
        }
    }

    if (!gameBoard.includes("") && gameActive) {
        gameActive = false;
        message.innerText = "Empate!";
    }
}

function updateScore(player) {
    if (player === "X") {
        playerXWins++;
        playerXScore.innerText = playerXWins;
    } else if (player === "O") {
        playerOWins++;
        playerOScore.innerText = playerOWins;
    }
}

function handleClick(e) {
    const cell = e.target;
    const index = [...cell.parentNode.children].indexOf(cell);

    if (gameBoard[index] === "" && gameActive) {
        gameBoard[index] = currentPlayer;
        cell.innerText = currentPlayer;
        cell.classList.add(currentPlayer);
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.innerText = `Vez do jogador ${currentPlayer}`;
        checkWinner();
    }
}

function restartGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    winner = null; // Reiniciar a variável de vencedor
    message.innerText = `Vez do jogador X`;
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("X", "O", "win");
    });
    currentPlayer = "X";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartButton.addEventListener("click", restartGame);
