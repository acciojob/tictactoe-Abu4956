//your JS code here. If required.

const submit = document.getElementById("submit");
const setup = document.getElementById("setup");
const game = document.getElementById("game");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");
const restart = document.getElementById("restart");

let players = [];
let currentPlayer = 0;
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

submit.addEventListener("click", function () {
    const name1 = document.getElementById("player-1").value.trim();
    const name2 = document.getElementById("player-2").value.trim();

    if (name1 === "" || name2 === "") {
        alert("Please enter both player names.");
        return;
    }

    players = [
        { name: name1, symbol: "x" },
        { name: name2, symbol: "o" }
    ];

    setup.classList.add("hidden");
    game.classList.remove("hidden");

    startGame();
});

function startGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = 0;
    gameOver = false;

    cells.forEach(function (cell) {
        cell.textContent = "";
    });

    updateMessage();
}

function updateMessage() {
    message.textContent =
        players[currentPlayer].name + ", you're up";
}

cells.forEach(function (cell, index) {
    cell.addEventListener("click", function () {
        if (gameOver || board[index] !== "") {
            return;
        }

        const symbol = players[currentPlayer].symbol;

        board[index] = symbol;
        cell.textContent = symbol;

        const won = winningCombos.some(function (combo) {
            return combo.every(function (position) {
                return board[position] === symbol;
            });
        });

        if (won) {
            message.textContent =
                players[currentPlayer].name +
                " congratulations you won!";

            gameOver = true;
            return;
        }

        if (board.every(function (value) {
            return value !== "";
        })) {
            message.textContent = "It's a draw!";
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === 0 ? 1 : 0;
        updateMessage();
    });
});

restart.addEventListener("click", function () {
    startGame();
});
