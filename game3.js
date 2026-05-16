//Game 3

let timer = 0;
let timerInterval = null;
let timerStarted = false;
const timerDisplay = document.getElementById("timer");

const rows = 16;
const cols = 16;
const mineCount = 40;

let board = [];
let minePositions = [];
let revealedCount = 0;
let minesLeft = mineCount;
let firstClick = true;

const boardElement = document.getElementById("minesweeper-board");
const minesLeftDisplay = document.getElementById("mines-left");

function startTimer() {
  if (!timerStarted) {
    timerStarted = true;
    timerInterval = setInterval(() => {
      timer++;
      timerDisplay.textContent = timer;
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timerInterval);
}

function restartGame() {
  stopTimer();
  timer = 0;
  timerStarted = false;
  timerDisplay.textContent = timer;

  board = [];
  minePositions = [];
  revealedCount = 0;
  minesLeft = mineCount;
  firstClick = true;
  boardElement.innerHTML = "";
  createBoard();
}

function createBoard() {
  minesLeftDisplay.textContent = minesLeft;
  boardElement.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
  boardElement.style.gridTemplateRows = `repeat(${rows}, 30px)`;

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;

      cell.addEventListener("click", () => handleCellClick(r, c));
      cell.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        toggleFlag(cell);
      });

      boardElement.appendChild(cell);
      row.push({ cell, revealed: false, flagged: false });
    }
    board.push(row);
  }
}

function placeMines(safeR, safeC) {
  //Exclude first click cell + neighbors
  const safeZone = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      let nr = safeR + dr,
        nc = safeC + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        safeZone.push(nr * cols + nc);
      }
    }
  }

  while (minePositions.length < mineCount) {
    let pos = Math.floor(Math.random() * rows * cols);
    if (!minePositions.includes(pos) && !safeZone.includes(pos)) {
      minePositions.push(pos);
    }
  }
}

function handleCellClick(r, c) {
  if (firstClick) {
    placeMines(r, c); //Place mines only after first click
    firstClick = false;
    startTimer();
  }
  revealCell(r, c);
}

function toggleFlag(cell) {
  const r = cell.dataset.row;
  const c = cell.dataset.col;
  const square = board[r][c];

  if (square.revealed) return;

  if (!square.flagged) {
    square.flagged = true;
    cell.textContent = "🚩";
    minesLeft--;
  } else {
    square.flagged = false;
    cell.textContent = "";
    minesLeft++;
  }
  minesLeftDisplay.textContent = minesLeft;
}

function revealCell(r, c) {
  const square = board[r][c];
  if (square.revealed || square.flagged) return;

  square.revealed = true;
  const cellIndex = r * cols + c;
  const cell = square.cell;

  if (minePositions.includes(cellIndex)) {
    cell.textContent = "💣";
    cell.classList.add("mine");
    gameOver(false);
    return;
  }

  revealedCount++;
  const count = getNeighborMineCount(r, c);
  if (count > 0) {
    cell.textContent = count;
  } else {
    //Reveal surrounding if empty
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr,
          nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          revealCell(nr, nc);
        }
      }
    }
  }
  cell.classList.add("revealed");

  if (revealedCount === rows * cols - mineCount) {
    gameOver(true);
  }
}

function getNeighborMineCount(r, c) {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr,
        nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        if (minePositions.includes(nr * cols + nc)) count++;
      }
    }
  }
  return count;
}

function gameOver(win) {
  stopTimer();
  board.forEach((row, r) =>
    row.forEach((square, c) => {
      if (minePositions.includes(r * cols + c)) {
        square.cell.textContent = "💣";
      }
      square.cell.classList.add("revealed");
    })
  );

  setTimeout(() => {
    alert(win ? "🎉 You win!" : "💥 Game over!");
  }, 100);
}

restartGame();

//Testing to make sure the js file loads
console.log("Game script loaded!");
