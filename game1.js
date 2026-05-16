//Game 1

var userScore = 0;
var compScore = 0;
var userScore_span = document.getElementById("user-score");
var compScore_span = document.getElementById("comp-score");

var userHealth = 10;
var compHealth = 10;
var userHearts = document.querySelectorAll(".user-heart");
var compHearts = document.querySelectorAll(".comp-heart");

function loseHeart(hearts, health) {
  hearts[health].classList.add("lost");
}

var result_p = document.querySelector(".result p");

var rock_div = document.getElementById("rock");
var paper_div = document.getElementById("paper");
var scissors_div = document.getElementById("scissors");
var lizard_div = document.getElementById("lizard");
var spock_div = document.getElementById("spock");

function getCompChoice() {
  var choices = ["rock", "paper", "scissors", "lizard", "spock"];
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function game(userchoice) {
  if (userScore === 10 || compScore === 10) {
    return;
  }

  var computer = getCompChoice();

  if (userchoice === computer) {
    result_p.innerHTML = "It’s a draw! Both chose " + userchoice + ".";
    checkWinner();
    return;
  }

  if (
    (userchoice === "rock" &&
      (computer === "scissors" || computer === "lizard")) ||
    (userchoice === "paper" && (computer === "rock" || computer === "spock")) ||
    (userchoice === "scissors" &&
      (computer === "paper" || computer === "lizard")) ||
    (userchoice === "lizard" &&
      (computer === "spock" || computer === "paper")) ||
    (userchoice === "spock" && (computer === "scissors" || computer === "rock"))
  ) {
    win(userchoice, computer);
  } else {
    lose(userchoice, computer);
  }
}

function win(userchoice, computer) {
  userScore++;
  compHealth--;
  compScore_span.innerHTML = compScore;
  userScore_span.innerHTML = userScore;

  loseHeart(compHearts, compHealth);
  result_p.innerHTML = ruleText(userchoice, computer) + " You win!";
  checkWinner();
}

function lose(userchoice, computer) {
  compScore++;
  userHealth--;
  compScore_span.innerHTML = compScore;
  userScore_span.innerHTML = userScore;

  loseHeart(userHearts, userHealth);
  result_p.innerHTML = ruleText(computer, userchoice) + " Computer wins!";
  checkWinner();
}

function draw() {
  result_p.innerHTML = "This is a Draw! Play again!";
}

function ruleText(winner, loser) {
  if (winner === "scissors" && loser === "paper") return "Scissors cuts Paper.";
  if (winner === "paper" && loser === "rock") return "Paper covers Rock.";
  if (winner === "rock" && loser === "lizard") return "Rock crushes Lizard.";
  if (winner === "lizard" && loser === "spock") return "Lizard poisons Spock.";
  if (winner === "spock" && loser === "scissors")
    return "Spock smashes Scissors.";
  if (winner === "scissors" && loser === "lizard")
    return "Scissors decapitates Lizard.";
  if (winner === "lizard" && loser === "paper") return "Lizard eats Paper.";
  if (winner === "paper" && loser === "spock") return "Paper disproves Spock.";
  if (winner === "spock" && loser === "rock") return "Spock vaporizes Rock.";
  if (winner === "rock" && loser === "scissors")
    return "Rock crushes Scissors.";
  return winner + " beats " + loser + ".";
}

function checkWinner() {
  if (compHealth === 0) {
    result_p.innerHTML = "Computer is out of hearts. You win the game!";
    disableGame();
  } else if (userHealth === 0) {
    result_p.innerHTML = "You are out of hearts. Computer wins the game!";
    disableGame();
  }
}

function disableGame() {
  rock_div.replaceWith(rock_div.cloneNode(true));
  paper_div.replaceWith(paper_div.cloneNode(true));
  scissors_div.replaceWith(scissors_div.cloneNode(true));
  lizard_div.replaceWith(lizard_div.cloneNode(true));
  spock_div.replaceWith(spock_div.cloneNode(true));
}

rock_div.addEventListener("click", function () {
  game("rock");
});
paper_div.addEventListener("click", function () {
  game("paper");
});
scissors_div.addEventListener("click", function () {
  game("scissors");
});
lizard_div.addEventListener("click", function () {
  game("lizard");
});
spock_div.addEventListener("click", function () {
  game("spock");
});

//Testing to make sure the js file loads
console.log("Game script loaded!");
