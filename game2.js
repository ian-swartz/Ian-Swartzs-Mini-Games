//Game 2

const imagePaths = [
  "images/img1.jpg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img4.jpg",
  "images/img5.jpg",
  "images/img6.jpg",
  "images/img7.jpg",
  "images/img8.jpg",
  "images/img9.jpg",
  "images/img10.jpg",
  "images/img11.jpg",
  "images/img12.jpg",
];

const cards = shuffle([...imagePaths, ...imagePaths]);
const board = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");

let first = null;
let second = null;
let lock = false;
let moves = 0;

let timer = 0;
let timerInterval = null;
let timerStarted = false;
const timerDisplay = document.getElementById("timer");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard(imageSrc, index) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.image = imageSrc;

  card.dataset.index = index;

  const img = document.createElement("img");
  img.src = "images/back.jpg";
  card.appendChild(img);

  card.addEventListener("click", () => flipCard(card));
  board.appendChild(card);
}

cards.forEach((src, i) => createCard(src, i));

function flipCard(card) {
  startTimer();

  if (
    lock ||
    card.classList.contains("matched") ||
    card.classList.contains("revealed")
  )
    return;

  const img = card.querySelector("img");
  img.src = card.dataset.image;
  card.classList.add("revealed");

  if (!first) {
    first = card;
    return;
  }

  second = card;
  lock = true;
  moves++;
  movesDisplay.textContent = moves;

  if (first.dataset.image === second.dataset.image) {
    first.classList.add("matched");
    second.classList.add("matched");
    resetTurn();
    checkForGameEnd();
  } else {
    setTimeout(() => {
      first.querySelector("img").src = "images/back.jpg";
      second.querySelector("img").src = "images/back.jpg";
      first.classList.remove("revealed");
      second.classList.remove("revealed");
      resetTurn();
    }, 1500);
  }
}

function resetTurn() {
  [first, second] = [null, null];
  lock = false;
}

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

function checkForGameEnd() {
  const allCards = document.querySelectorAll(".card");
  const matchedCards = document.querySelectorAll(".card.matched");

  if (allCards.length === matchedCards.length) {
    stopTimer();
    result_p.innerHTML = `Game Over! You finished in ${moves} moves and ${timer} seconds.`;
  }
}

function restartGame() {
  stopTimer();
  timer = 0;
  timerStarted = false;
  timerDisplay.textContent = timer;

  board.innerHTML = "";

  first = null;
  second = null;
  lock = false;
  moves = 0;
  movesDisplay.textContent = moves;

  const newCards = shuffle([...imagePaths, ...imagePaths]);
  newCards.forEach((src, i) => createCard(src, i));
}

//Testing to make sure the js file loads
console.log("Game script loaded!");
