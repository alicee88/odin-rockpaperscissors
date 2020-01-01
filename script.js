const rockButton = document.querySelector('.button-player-rock');
const paperButton = document.querySelector('.button-player-paper');
const scissorsButton = document.querySelector('.button-player-scissors');

const aiRockButton = document.querySelector('.ai-rock');
const aiPaperButton = document.querySelector('.ai-paper');
const aiScissorsButton = document.querySelector('.ai-scissors');


function computerPlay()
{
    let randomInt = Math.floor(Math.random() * 3);

    switch(randomInt)
    {
        case 0:
            aiRockButton.classList.add('selected');
            return 'rock';
        case 1:
            aiPaperButton.classList.add('selected');
            return 'paper';
        case 2: 
            aiScissorsButton.classList.add('selected');
            return 'scissors';
        default:
            return 'Undefined move';
    }
}

function playRound(playerMove, computerMove, score)
{
    let playerMoveLC = playerMove.toLowerCase();
    switch(playerMoveLC) 
    {
        case 'rock':
            switch (computerMove)
            {
                case 'rock':
                    return "It's a draw - Rock against Rock.";
                case 'paper':
                    score.computerScore++;
                    rockButton.classList.add('selected-lose');
                    aiPaperButton.classList.add('selected-win');
                    return 'You lose! Paper beats Rock.';
                case 'scissors':
                    rockButton.classList.add('selected-win');
                    aiScissorsButton.classList.add('selected-lose');
                    score.playerScore++;
                    return 'You win! Scissors beats Rock.';
                default:
                    return 'Undefined computer move';
            }

        case 'paper':
            switch (computerMove) 
            {
                case 'rock':
                    score.playerScore++;
                    paperButton.classList.add('selected-win');
                    aiRockButton.classList.add('selected-lose');
                    return 'You win! Paper beats Rock.';
                case 'paper':
                    return "It's a draw - Paper against Paper.";
                case 'scissors':
                    score.computerScore++;
                    paperButton.classList.add('selected-lose');
                    aiScissorsButton.classList.add('selected-win');
                    return 'You lose! Scissors beats Paper';
                default:
                    return 'Undefined computer move';
            }

        case 'scissors':
            switch (computerMove)
            {
                case 'rock':
                    score.computerScore++;
                    scissorsButton.classList.add('selected-lose');
                    aiRockButton.classList.add('selected-win');
                    return 'You lose! Rock beats Scissors.';
                case 'paper':
                    score.playerScore++;
                    scissorsButton.classList.add('selected-win');
                    aiPaperButton.classList.add('selected-lose');
                    return 'You win! Scissors beats Paper.';
                case 'scissors':
                    return "It's a draw - Scissors against Scissors";
                default:
                    return 'Undefined computer move';
            }

        default:
            return 'Undefined player move';
        
    }
}

function resetButtons() 
{
    aiRockButton.classList.remove('selected');
    aiRockButton.classList.remove('selected-lose');
    aiRockButton.classList.remove('selected-win');

    aiPaperButton.classList.remove('selected');
    aiPaperButton.classList.remove('selected-win');
    aiPaperButton.classList.remove('selected-lose');

    aiScissorsButton.classList.remove('selected');
    aiScissorsButton.classList.remove('selected-win');
    aiScissorsButton.classList.remove('selected-lose');

    rockButton.classList.remove('selected');
    rockButton.classList.remove('selected-win');
    rockButton.classList.remove('selected-lose');

    paperButton.classList.remove('selected');
    paperButton.classList.remove('selected-win');
    paperButton.classList.remove('selected-lose');

    scissorsButton.classList.remove('selected');
    scissorsButton.classList.remove('selected-win');
    scissorsButton.classList.remove('selected-lose');
}

function game()
{
    let playerMove; 

    let score = 
    {   playerScore: 0,
        computerScore: 0
    };

    rockButton.addEventListener('click', event => {
        playerMove = 'rock';
        resetButtons();
        rockButton.classList.add('selected');
        handleMove(playerMove, score);
    });

    rockButton.addEventListener('mouseleave', event => {
        resetButtons();
        
    });

    paperButton.addEventListener('click', event => {
        playerMove = 'paper';
        resetButtons();
        paperButton.classList.add('selected');
        handleMove(playerMove, score);
    });

    paperButton.addEventListener('mouseleave', event => {
        resetButtons();
    });

    scissorsButton.addEventListener('click', event => {
        playerMove = 'scissors';
        resetButtons();
        scissorsButton.classList.add('selected');
        handleMove(playerMove, score);
    });

    scissorsButton.addEventListener('mouseleave', event => {
        resetButtons();
    });
}

function handleMove(playerMove, score) 
{
    const playText = document.querySelector('.playText');
    const playerScoreText = document.querySelector('.playerScore');
    const aiScoreText = document.querySelector('.aiScore');

    const winningScore = 5;

    let computerMove = computerPlay();

    playText.innerHTML = playRound(playerMove, computerMove, score);

    playerScoreText.innerHTML = `YOU: ${score.playerScore}`;
    aiScoreText.innerHTML = `ME: ${score.computerScore}`;
        
    if(score.playerScore + score.computerScore >= winningScore) 
    {
        if(score.playerScore > score.computerScore)
            playText.innerHTML = `Game Over - You Win ${score.playerScore} to ${score.computerScore}!`;
        else
            playText.innerHTML = `Game Over - You Lose ${score.computerScore} to ${score.playerScore} !`;

        score.playerScore = 0;
        score.computerScore = 0;

        playerScoreText.innerHTML = `YOU: ${score.playerScore}`;
        aiScoreText.innerHTML = `ME: ${score.computerScore}`;

    }
}

game();

