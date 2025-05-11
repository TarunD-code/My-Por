class TicTacToe {
    constructor() {
        this.cells = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.xScore = 0;
        this.oScore = 0;
        this.themes = ['blue', 'pink', 'green'];
        this.currentTheme = 0;

        this.initGame();
        this.setupEventListeners();
    }

    initGame() {
        this.createGrid();
        this.updateStatus(`${this.currentPlayer}'s turn`);
        this.updateScores();
    }

    createGrid() {
        const grid = document.querySelector('.game-grid');
        grid.innerHTML = '';
        
        this.cells.forEach((_, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = index;
            grid.appendChild(cell);
        });
    }

    setupEventListeners() {
        document.querySelector('.game-grid').addEventListener('click', (e) => this.handleCellClick(e));
        document.querySelector('.reset-btn').addEventListener('click', () => this.resetGame());
        document.querySelector('.theme-btn').addEventListener('click', () => this.changeTheme());
    }

    handleCellClick(e) {
        const cell = e.target;
        const index = cell.dataset.index;

        if (!this.gameActive || cell.textContent !== '') return;

        this.cells[index] = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        cell.style.animation = 'cell-pop 0.3s ease';

        if (this.checkWin()) {
            this.handleWin();
        } else if (this.cells.every(cell => cell !== null)) {
            this.handleDraw();
        } else {
            this.togglePlayer();
        }
    }

    checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winPatterns.some(pattern =>
            pattern.every(index => this.cells[index] === this.currentPlayer)
        );
    }

    handleWin() {
        this.gameActive = false;
        this.currentPlayer === 'X' ? this.xScore++ : this.oScore++;
        this.updateStatus(`${this.currentPlayer} Wins!`);
        this.updateScores();
        this.playWinAnimation();
    }

    handleDraw() {
        this.gameActive = false;
        this.updateStatus("Game Draw!");
    }

    togglePlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatus(`${this.currentPlayer}'s turn`);
    }

    updateStatus(message) {
        document.querySelector('.status').textContent = message;
    }

    updateScores() {
        document.querySelector('.x-score .score-count').textContent = this.xScore;
        document.querySelector('.o-score .score-count').textContent = this.oScore;
    }

    resetGame() {
        this.cells = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.createGrid();
        this.updateStatus(`${this.currentPlayer}'s turn`);
    }

    changeTheme() {
        this.currentTheme = (this.currentTheme + 1) % this.themes.length;
        const root = document.documentElement;
        
        switch(this.themes[this.currentTheme]) {
            case 'pink':
                root.style.setProperty('--neon-blue', '#ff00ff');
                root.style.setProperty('--neon-pink', '#00f3ff');
                break;
            case 'green':
                root.style.setProperty('--neon-blue', '#00ff88');
                root.style.setProperty('--neon-pink', '#ff5500');
                break;
            default:
                root.style.setProperty('--neon-blue', '#00f3ff');
                root.style.setProperty('--neon-pink', '#ff00ff');
        }
    }

    playWinAnimation() {
        const winnerCells = document.querySelectorAll(`.${this.currentPlayer.toLowerCase()}`);
        winnerCells.forEach(cell => {
            cell.style.animation = 'win-glow 1s infinite alternate';
        });
    }
}

// Initialize the game
new TicTacToe();