const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let board = ["", "", "", "", "", "", "", "", ""];
let isGameOver = false;

const WIN_PATTERNS = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Player clicks
cells.forEach(cell => {
  cell.addEventListener('click', () => handleCellClick(cell));
});

resetBtn.addEventListener('click', resetGame);

function handleCellClick(cell) {
  const index = cell.dataset.index;

  if (board[index] !== "" || isGameOver) return;

  board[index] = "X";
  cell.textContent = "X";

  if (checkWin("X")) {
    statusText.textContent = "You win! 🎉";
    isGameOver = true;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    isGameOver = true;
    return;
  }

  statusText.textContent = "Computer's turn...";
  setTimeout(computerMove, 500);
}

function computerMove() {
  if (isGameOver) return;

  const emptyIndices = board
    .map((val, idx) => (val === "" ? idx : null))
    .filter(val => val !== null);

  if (emptyIndices.length === 0) return;

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  board[randomIndex] = "O";
  cells[randomIndex].textContent = "O";

  if (checkWin("O")) {
    statusText.textContent = "Computer wins! 😢";
    isGameOver = true;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    isGameOver = true;
    return;
  }

  statusText.textContent = "Your turn!";
}

function checkWin(player) {
  return WIN_PATTERNS.some(pattern => 
    pattern.every(index => board[index] === player)
  );
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameOver = false;
  cells.forEach(cell => cell.textContent = "");
  statusText.textContent = "Your turn!";
}
