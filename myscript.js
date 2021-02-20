'use strict'
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function getComputerPlay() {
        let choice = getRandomInt(3);
        if (choice == 0) return "Rock";
        else if (choice == 1) return "Paper";
        else if (choice == 2) return "Scissors";
    }

    function playRound(e) {
        const PLAYER_PLAY  = e.target.id;
        const COMPUTER_PLAY = getComputerPlay();
        const ROUND_RESULT = getRoundResult(PLAYER_PLAY, COMPUTER_PLAY);
        const ROUND_RESULT_TEXT = getResultText(ROUND_RESULT, PLAYER_PLAY, COMPUTER_PLAY);

        printResult(ROUND_RESULT_TEXT);
        updateScoreDisplay(ROUND_RESULT);
        noRound++;        
        if (noRound == 5) endGame();
    }

    function getRoundResult(playerPlay,computerPlay) {
        if (playerPlay == computerPlay) {
            return "draw";
        }
        else if (playerPlay == "Rock") {               
            if (computerPlay == "Scissors") return "win";
            else return "lose";
        }
        else if (playerPlay == "Paper") {
            if (computerPlay =="Rock") return "win";
            else return "lose"; 
        }
        else if (playerPlay == "Scissors") {
            if (computerPlay =="Paper") return "win";
            else return "lose"; 
        }
    }

    function getResultText(result, playerPlay, computerPlay) {
        if (result == "draw") {
            return ` You chose ${playerPlay} and computer chose ${computerPlay}. Draw!`;
        } else if (result == "win") {
            return `You chose ${playerPlay} and computer chose ${computerPlay}. You win!`;
        } else if (result == "lose") {
            return `You chose ${playerPlay} and computer chose ${computerPlay}. You lose!`;
        }
    }

    function updateScoreDisplay(result) {
        if (result == "draw") { 
            playerDraws++;
            document.getElementById("Draws").textContent = `Draws: ` + `${playerDraws}`;
        }
        else if (result == "win") { 
            playerWins++; 
            document.getElementById("Wins").textContent = `Wins: ` + `${playerWins}`;
        }
        else if (result == "lose") { 
            playerLosses++;
            document.getElementById("Losses").textContent = `Losses: ` + `${playerLosses}`;
        }
        else if (result == "reset") {
            
        }
    }

    function endGame() {
        printResult(getGameOverText(playerWins,playerLosses));
        disablePlayButtons();
    }

    function getGameOverText(playerWins, playerLosses) {
        if (playerWins == playerLosses) { return "Game over! Draw!"}
        else if (playerWins > playerLosses)  { return "You are the winner!"}
        else { return "You lose, the computer is the winner!"}
    }

    function disablePlayButtons() {
        document.querySelectorAll("button.playButton").forEach(playButton => {
            playButton.removeEventListener('click', playRound);
        });
    }

    function printResult(resultText) {
        const para = document.createElement("p");
        const gamelog = document.getElementById("gamelog");

        if (noRound == 5) {
            para.style.backgroundColor = "lightgreen";
            para.style.fontWeight = "bold";
        } // highlight game over text
        
        para.classList.add('singleLog');
        para.textContent = resultText;
        gamelog.appendChild(para);
    }

    function resetGame(e) {
        noRound = 0;
        playerWins = 0;
        playerLosses = 0;
        playerDraws = 0;
        document.getElementById("Draws").textContent = "Draws: 0";
        document.getElementById("Wins").textContent = "Wins: 0";
        document.getElementById("Losses").textContent = "Losses: 0"
        
        const playButtons = document.querySelectorAll("button.playButton");
        playButtons.forEach(playButton => {
            playButton.addEventListener("click", playRound);
        });

        const oldGameLogs = document.querySelectorAll(".singleLog");
        oldGameLogs.forEach(singleLog => {
            singleLog.remove();
        });
    }

    let playerWins = 0;
    let playerLosses = 0;
    let playerDraws = 0;
    let noRound = 0;

    const playButtons = document.querySelectorAll("button.playButton");
    playButtons.forEach(playButton => {
        playButton.addEventListener("click", playRound);
    });

    const resetButton = document.querySelector("button.resetButton");
    resetButton.addEventListener("click", resetGame);
