const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;

document.getElementById("rock").addEventListener("click", () => playGame("rock"));
document.getElementById("paper").addEventListener("click", () => playGame("paper"));
document.getElementById("scissors").addEventListener("click", () => playGame("scissors"));

function playGame(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const result = determineWinner(playerChoice, computerChoice);
    updateScore(result);
    displayResult(playerChoice, computerChoice, result);
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "draw";
    }
    if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        return "win";
    }
    return "lose";
}

function updateScore(result) {
    if (result === "win") {
        playerScore++;
    } else if (result === "lose") {
        computerScore++;
    }
    document.getElementById("score").innerText = `Player: ${playerScore} | Computer: ${computerScore}`;
}

function displayResult(playerChoice, computerChoice, result) {
    document.getElementById("computer-choice").innerText = `Computer chose: ${computerChoice}`;

    let resultText = `You chose ${playerChoice}. Computer chose ${computerChoice}. `;

    if (result === "draw") {
        resultText += "It's a draw!";
    } else if (result === "win") {
        resultText += `You win! ${playerChoice} beats ${computerChoice}.`;

    } else {
        resultText += `You lose! ${computerChoice} beats ${playerChoice}.`;
    }

    document.getElementById("result").innerText = resultText;
}
