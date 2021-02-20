'use strict'
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function getComputerPlay() {
        let choice = getRandomInt(3);
        if (choice == 0) { return "Rock" }
        else if (choice == 1) {return "Paper"}
        else if (choice == 2) {return "Scissors"}
    }

    function getResult(result) {
        if (result == "draw") {
            return `${playerSelection} and ${computerSelection}. Draw!`;
        } else if (result == "win") {
            return `${playerSelection} and ${computerSelection}. You win!`;
        } else if (result == "lose") {
            return `${playerSelection} and ${computerSelection}. You lose!`;
        }
    }

    function updateScore(result) {
        if (result.search("Draw") > 0) { 
            drawTimes++;
            document.getElementById("Draws").textContent = `Draws: ` + `${drawTimes}`;
        }
        else if (result.search("win") > 0) { 
            playerWin++; 
            document.getElementById("Wins").textContent = `Wins: ` + `${playerWin}`;
        }
        else if (result.search("lose") > 0) { 
            computerWin++;
            document.getElementById("Losses").textContent = `Losses: ` + `${computerWin}`;
        }
        noRound++;
        if (noRound == 5) printResult(getFinal(playerWin, computerWin));
    }

    function getFinal(playerWin, computerWin) {
        if (playerWin == computerWin) { return "Draw!"}
        else if (playerWin > computerWin)  { return "You are the winner!"}
        else { return "The computer is the winner!"}
    }

    function playRound(e) {
        playerSelection = e.target.id;
        computerSelection = getComputerPlay();
        let result;

        if (playerSelection == computerSelection) {
            result = getResult("draw");
        }
        else if (playerSelection == "Rock") {               
            if (computerSelection == "Scissors") result = getResult("win");
            else result = getResult("lose");
        }
        else if (playerSelection == "Paper") {
            if (computerSelection =="Rock") result = getResult("win");
            else result = getResult("lose"); 
        }
        else if (playerSelection == "Scissors") {
            if (computerSelection =="Paper") result = getResult("win");
            else result = getResult("lose"); 
        }

        printResult(result);
        updateScore(result);
        
        if (noRound == 5) endGame();
    }

    function endGame() {
        document.querySelectorAll("button.playButton").forEach(playButton => {
            playButton.removeEventListener('click', playRound);
        });
    }

    function printResult(result) {
        const para = document.createElement("p");
        para.classList.add('singleLog');
        para.textContent = result;

        if (noRound == 5) {
            para.style.backgroundColor = "lightgreen";
            para.style.fontWeight = "bold";
        }

        const gamelog = document.getElementById("gamelog");
        gamelog.appendChild(para); 
        
    }

    function resetGame(e) {
        noRound = 0;
        playerWin = 0;
        computerWin = 0;
        drawTimes = 0;
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

    let playerSelection, computerSelection, result;
    let playerWin = 0;
    let computerWin = 0;
    let drawTimes = 0;
    let noRound = 0;

    const playButtons = document.querySelectorAll("button.playButton");
    playButtons.forEach(playButton => {
        playButton.addEventListener("click", playRound);
    });

    const resetButton = document.querySelector("button.resetButton");
    resetButton.addEventListener("click", resetGame);
