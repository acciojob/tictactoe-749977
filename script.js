document.getElementById("submit").addEventListener("click", function() {
    let player1 = document.getElementById("player-1").value;
    let player2 = document.getElementById("player-2").value;
    if (player1 && player2) {
        document.getElementById("player-input").style.display = "none";
        document.getElementById("board").style.display = "block";
        document.getElementById("message").innerText = `${player1}, you're up`;
        startGame(player1, player2);
    }
});

function startGame(player1, player2) {
    let currentPlayer = player1;
    let currentSymbol = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let cells = document.querySelectorAll(".cell");
    let message = document.getElementById("message");

    cells.forEach((cell, index) => {
        cell.addEventListener("click", function() {
            if (board[index] === "") {
                board[index] = currentSymbol;
                cell.innerText = currentSymbol;
                if (checkWinner(board, currentSymbol)) {
                    message.innerText = `${currentPlayer}, congratulations you won!`;
                    disableBoard();
                    return;
                }
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                currentSymbol = currentSymbol === "X" ? "O" : "X";
                message.innerText = `${currentPlayer}, you're up`;
            }
        });
    });
}

function checkWinner(board, symbol) {
    return [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ].some(combination => {
        return combination.every(index => board[index] === symbol);
    });
}

function disableBoard() {
    document.querySelectorAll(".cell").forEach(cell => cell.style.pointerEvents = "none");
}
