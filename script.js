// Initialize scores for players X and O
let scoreX = 0;
let scoreO = 0;

// Get the score elements from the DOM
const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");

// Get all cell elements and the restart button
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restartButton");

// Set the initial current player
let currentPlayer = "X";

// Function to handle cell clicks
const handleCellClick = (e) => {
  const cell = e.target;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer === "X" ? "x" : "o"); // Add class based on the player
  cell.classList.add("taken");

  // Check for a win or draw, then switch players
  if (checkWin(currentPlayer)) {
    alert(`${currentPlayer} wins! 🤩`);
    updateScore();
    resetBoard();
  } else if (isDraw()) {
    alert("It's a draw! 🙄");
    resetBoard();
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
};

// Function to update the score
const updateScore = () => {
  if (currentPlayer === "X") {
    scoreX++;
    scoreXElement.textContent = scoreX;
  } else {
    scoreO++;
    scoreOElement.textContent = scoreO;
  }
};

// Function to check if the current player won
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
    return combination.every((index) => cells[index].textContent === player);
  });
};

// Function to check if the game is a draw
const isDraw = () => {
  return [...cells].every((cell) => cell.classList.contains("taken"));
};

// Function to reset the board
const resetBoard = () => {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  currentPlayer = "X";
};

// Add event listeners to each cell and the restart button
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
