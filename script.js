// script.js
const cells = document.querySelectorAll(".cell");
const gameBoard = document.getElementById("gameBoard");
const restartButton = document.getElementById("restartButton");
let currentPlayer = "X";

const handleCellClick = (e) => {
  const cell = e.target;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWin(currentPlayer)) {
    alert(`${currentPlayer} wins!`);
    return;
  }

  if (isDraw()) {
    alert("It's a draw!");
    return;
  }

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

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick, { once: true });
});

restartButton.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
  currentPlayer = "X";
});
