const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const resetGameButton =
    document.getElementById("resetGame");

const resetScoreButton =
    document.getElementById("resetScore");

const scoreXElement =
    document.getElementById("scoreX");

const scoreOElement =
    document.getElementById("scoreO");

const scoreDrawElement =
    document.getElementById("scoreDraw");


let board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];

let currentPlayer = "X";

let gameActive = true;

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;


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


cells.forEach(function (cell) {

    cell.addEventListener("click", function () {

        const index =
            Number(cell.dataset.index);

        if (
            !gameActive ||
            board[index] !== ""
        ) {
            return;
        }

        board[index] = currentPlayer;

        cell.textContent = currentPlayer;

        cell.classList.add(
            currentPlayer.toLowerCase()
        );

        checkGame();

    });

});


function checkGame() {

    let winningCombination = null;


    for (
        const combination
        of winningCombinations
    ) {

        const a = combination[0];
        const b = combination[1];
        const c = combination[2];


        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            winningCombination =
                combination;

            break;
        }

    }


    if (winningCombination !== null) {

        gameActive = false;

        const winner =
            board[winningCombination[0]];


        statusText.textContent =
            "🎉 Player " +
            winner +
            " wins!";


        winningCombination.forEach(
            function (index) {

                cells[index]
                    .classList
                    .add("winner");

            }
        );


        if (winner === "X") {

            scoreX++;

            scoreXElement.textContent =
                scoreX;

        } else {

            scoreO++;

            scoreOElement.textContent =
                scoreO;

        }

        return;
    }


    if (!board.includes("")) {

        gameActive = false;

        scoreDraw++;

        scoreDrawElement.textContent =
            scoreDraw;

        statusText.textContent =
            "🤝 It's a draw!";

        return;
    }


    currentPlayer =
        currentPlayer === "X"
            ? "O"
            : "X";


    statusText.textContent =
        "Player " +
        currentPlayer +
        "'s turn";
}


function resetGame() {

    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];

    currentPlayer = "X";

    gameActive = true;

    statusText.textContent =
        "Player X's turn";


    cells.forEach(function (cell) {

        cell.textContent = "";

        cell.classList.remove(
            "x",
            "o",
            "winner"
        );

    });

}


resetGameButton.addEventListener(
    "click",
    resetGame
);


resetScoreButton.addEventListener(
    "click",
    function () {

        scoreX = 0;

        scoreO = 0;

        scoreDraw = 0;


        scoreXElement.textContent = "0";

        scoreOElement.textContent = "0";

        scoreDrawElement.textContent = "0";


        resetGame();

    }
);
