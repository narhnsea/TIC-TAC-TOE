// script.js
let scoreX = 0;
let scoreO = 0;
const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restartButton");
let currentPlayer = "X";

const handleCellClick = (e) => {
  const cell = e.target;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  // Check if current player won
  if (checkWin(currentPlayer)) {
    alert(`${currentPlayer} wins!`);
    // Update the score
    if (currentPlayer === "X") {
      scoreX++;
      scoreXElement.textContent = scoreX;
    } else {
      scoreO++;
      scoreOElement.textContent = scoreO;
    }
    resetBoard();
    return;
  }

  // Check if the game is a draw
  if (isDraw()) {
    alert("It's a draw!");
    resetBoard();
    return;
  }

  // Switch to the other player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
};

const checkWin = (player) => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  return winConditions.some((combination) => {
    return combination.every((index) => {
      return cells[index].textContent === player;
    });
  });
};

const isDraw = () => {
  return [...cells].every((cell) => {
    return cell.classList.contains("taken");
  });
};

const resetBoard = () => {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  currentPlayer = "X";
};

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick, { once: true });
});

restartButton.addEventListener("click", () => {
  resetBoard();
  scoreX = 0;
  scoreO = 0;
  scoreXElement.textContent = scoreX;
  scoreOElement.textContent = scoreO;
});
