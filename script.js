const board = document.querySelector('.tic-tac-toe-board');
const messageText = document.querySelector('#message-text');
const resetButton = document.querySelector('#reset-button');
const scoreText = document.querySelector('#score-text');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let playerXScore = 0;
let playerOScore = 0;
let gameActive = true; // To track if the game is active

// Function to handle a player's move
function handleCellClick(index) {
    if (boardState[index] === '' && gameActive) {
        boardState[index] = currentPlayer;
        renderBoard();
        if (isGameWon()) {
            gameActive = false;
            if (currentPlayer === 'X') {
                playerXScore++;
                messageText.textContent = 'Player X wins!';
            } else {
                playerOScore++;
                messageText.textContent = 'Player O wins!';
            }
            scoreText.textContent = `Player X: ${playerXScore} | Player O: ${playerOScore}`;
        } else if (!boardState.includes('')) {
            gameActive = false;
            messageText.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            messageText.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Function to check if a player has won
function isGameWon() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return true;
        }
    }
    return false;
}

// Function to reset the game
function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    renderBoard();
    messageText.textContent = `Player ${currentPlayer}'s turn`;
}

// Add a reset button event listener
resetButton.addEventListener('click', resetGame);

// Function to render the game board
function renderBoard() {
    board.innerHTML = '';
    for (let i = 0; i < boardState.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('tic-tac-toe-cell');
        cell.textContent = boardState[i];
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }
}

// Initial board rendering
renderBoard();
