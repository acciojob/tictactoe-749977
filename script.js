document.getElementById("submit").addEventListener("click", function() {
    let player1 = document.getElementById("player-1").value.trim();
    let player2 = document.getElementById("player-2").value.trim();
    if (player1 && player2) {
        document.querySelector(".input-section").style.display = "none";
        document.querySelector(".game-section").style.display = "block";
        document.querySelector(".message").textContent = `${player1}, you're up`;
    }
});

let cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let players = [];
let gameActive = true;

cells.forEach(cell => {
    cell.addEventListener("click", function() {
        if (!players.length) {
            players = [document.getElementById("player-1").value, document.getElementById("player-2").value];
        }
        if (cell.textContent === "" && gameActive) {
            cell.textContent = currentPlayer;
            if (checkWin()) {
                document.querySelector(".message").textContent = `${players[currentPlayer === "X" ? 0 : 1]} congratulations you won!`;
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                document.querySelector(".message").textContent = `${players[currentPlayer === "X" ? 0 : 1]}, you're up`;
            }
        }
    });
});

function checkWin() {
    let winPatterns = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];
    return winPatterns.some(pattern => {
        return pattern.every(id => document.getElementById(id).textContent === currentPlayer);
    });
}

