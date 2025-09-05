
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

console.log(score);

updateScoreElement();

let isAutoPlaying = false;//we create this variable to check whether or not we're playing the game 

let interValid; //we put the variable outside so that we can only one ID
//if we put the variable inside the function it will return a new id for every time the function calls

//const autoPlay = () => {};

/*
for personal perference we can  use the regular 
1 => Easier to Read
2 => Hosting => we can call the function above the initialization 
*/

function autoPlay() {
  if (!isAutoPlaying) {     // to stop interval 
    interValid = setInterval(() => { // the setinterval will return a number 
      const playerMove = pickComputerMove(); // the number is like an ID 
      playGame(playerMove);
    }, 1000); // we can use this ID to stop the interval
    isAutoPlaying = true;
  } else {
    clearInterval(interValid); // by using the ID inside the clearInterval we can stop the interval
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
})
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
})
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
})
document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  if(!isAutoPlaying){
    autoPlay();
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
  } else {
    autoPlay();
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  }
})
document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  const paraButton = document.querySelector('.js-para-button');
  paraButton.innerHTML = 
  `<div class="js-button-div">Are you sure want to reset the score ? 
  <button class="js-yes-button">Yes</button>
  <button class="js-no-button">No</button></div>`


  document.querySelector('.js-yes-button').addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement(); 
    paraButton.innerHTML = '';   
  })

  document.querySelector('.js-no-button').addEventListener('click',() => {
    paraButton.innerHTML = '';
  })

});

document.body.addEventListener('keydown',(event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors')
  } else if(event.key === 'a'){
    autoPlay();
  } else if (event.key === 'Backspace') {
    autoPlay();
  } 
})

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "you lose";
    } else if (computerMove === "paper") {
      result = "You win";
    } else if (computerMove === playerMove) {
      result = "you tie";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "you win";
    } else if (computerMove === playerMove) {
      result = "You tie";
    } else if (computerMove === "scissors") {
      result = "you lose";
    }
  } else if (playerMove === "rock") {
    if (computerMove === playerMove) {
      result = "you tie";
    } else if (computerMove === "paper") {
      result = "You lose";
    } else if (computerMove === "scissors") {
      result = "you win";
    }
  }

  if (result === "you win") {
    score.wins += 1;
  } else if (result === "you lose") {
    score.losses += 1;
  } else if (result === "you tie") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-moves").innerHTML = `you
      <img src="/LESSON_10/${playerMove}-emoji.png" alt="" class="move-icon" >
      <img src="/LESSON_10/${computerMove}-emoji.png" alt="" class="move-icon">
      computer`;

  document.querySelector(".js-result").innerHTML = `${result}`;

  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector(
    ".js-button"
  ).innerHTML = `Wins:${score.wins},Losses:${score.losses},Ties${score.ties}`;
}

function pickComputerMove() {
  let computerMove = "";
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}