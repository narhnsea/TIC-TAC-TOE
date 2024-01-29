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

// Switch to the other playercurrentPlayer = currentPlayer === "X" ? "O" : "X";

// Check if a player has won the game
const checkWin = (player) => {
  // Define the win conditions for the game
  const winConditions = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6],
  ];

  // Check if any of the win conditions are satisfied
  return winConditions.some((combination) => {
    // Check if all the cells in the combination match the player
    return combination.every((index) => {
      return cells[index].textContent === player;
    });
  });
};

// Check if the game is a draw
const isDraw = () => {
  // Check if all the cells are taken
  return [...cells].every((cell) => {
    return cell.classList.contains("taken");
  });
};

const resetBoard = () => {
  // Loop through each cell in the `cells` array
  cells.forEach((cell) => {
    // Set the text content of the cell to an empty string
    cell.textContent = "";
    // Remove the "taken" class from the cell
    cell.classList.remove("taken");
    // Remove the click event listener from the cell
    cell.removeEventListener("click", handleCellClick);
    // Add the click event listener to the cell, with the `{ once: true }` option
    cell.addEventListener("click", handleCellClick, { once: true });
  });

  // Loop through each cell in the `cells` array
  cells.forEach(() => {
    // Set the text content of the cell to an empty string
    cell.textContent = "";
    // Remove the "taken" class from the cell
    cell.classList.remove("taken");
    // Remove the event listener for the "click" event from the cell
    cell.removeEventListener("click", handleCellClick);
    // Add a new event listener for the "click" event to the cell, which will only trigger once
    cell.addEventListener("click", handleCellClick, { once: true });
  });

  // Set the `currentPlayer` variable to "X"
  currentPlayer = "X";

  // Loop through each cell in the `cells` array and add a "click" event listener to each one
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick, { once: true });
  });

  // Add a "click" event listener to the "restartButton" element
  restartButton.addEventListener("click", () => {
    // Call the `resetBoard` function
    resetBoard();
    // Set the `scoreX` variable to 0
    scoreX = 0;
    // Set the `scoreO` variable to 0
    scoreO = 0;
    // Set the text content of the `scoreXElement` element to the value of `scoreX`
    scoreXElement.textContent = scoreX;
    // Set the text content of the `scoreOElement` element to the value of `scoreO`
    scoreOElement.textContent = scoreO;
  });
};
