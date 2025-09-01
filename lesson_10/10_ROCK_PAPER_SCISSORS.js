
      let score = JSON.parse(localStorage.getItem("score")) || {
        wins: 0,
        losses: 0,
        ties: 0,
      };

      console.log(score);

      updateScoreElement();

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
      <img src="lesson_10/${playerMove}-emoji.png" alt="" class="move-icon" >
      <img src="lesson_10/${computerMove}-emoji.png" alt="" class="move-icon">
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