/* Requirements:
- display empty board when page is initially displayed
- player can click on nine squares to make a move
- every click will alternate btwn x and o
- win logic
- win message
- logic and msg for tie
- reset game button
*/

/*-------------------------------- Constants --------------------------------*/
//5) Define the required constants.

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/
//1) Define the required variables used to track the state of the game.

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let winner = false;
let tie = false;

const turnMessage = () => `It's ${currentPlayer}'s turn!`;
const winMessage = () => `${currentPlayer} has won!`;
const tieMessage = () => "It's a tie!";

/*------------------------ Cached Element References ------------------------*/
//2) Store cached element references.

let squareEls = document.querySelectorAll(".sqr");
let messageEl = document.querySelector("#message");
let resetBtn = document.querySelector("button");

/*-------------------------------- Functions --------------------------------*/
//3) Upon loading, the game state should be initialized, and a function should
//   be called to render this game state.

const init = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  winner = false;
  tie = false;
  squareEls.forEach((sqr) => (sqr.textContent = ""));
  messageEl.textContent = "Let's play! " + turnMessage();
};


const updateBoard = () => {
  board.forEach((sqr, idx) => {
    squareEls[idx].textContent = sqr;
  });
};

const placePiece = (i) => {
  board[i] = currentPlayer;
  updateBoard();
};

//7) Create Reset functionality.
// used init() since it was literally the same

const checkForTie = () => {
  if (!board.includes("") && !winner) {
    tie = true;
    messageEl.textContent = tieMessage();
  }
};

const checkForGameEnd = () => {
  winningCombos.forEach((combo) => {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
      messageEl.textContent = winMessage();
    }
  });
};

const switchPlayerTurn = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (!winner && !tie) {
    messageEl.innerText = turnMessage();
  }
};


/*----------------------------- Event Listeners -----------------------------*/

//6) Handle a player clicking a square with a `handleClick` function.

const handleSqrClick = (event) => {
  const clickedSqrIdx = parseInt(event.target.id);

  if (winner || board[clickedSqrIdx] !== "") return;

  placePiece(clickedSqrIdx);
  checkForGameEnd();
  checkForTie();

  if (!winner && !tie) switchPlayerTurn();
};

squareEls.forEach((squareEl) => {
  squareEl.addEventListener("click", handleSqrClick);
});

resetBtn.addEventListener("click", init);

init();
