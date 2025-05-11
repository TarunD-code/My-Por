class RacingGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.road = [];
        this.obstacles = [];
        this.gameTime = 0;
        this.score = 0;
        this.gameActive = true;
        this.initGame();
        this.setupEventListeners();
        this.gameLoop();
    }

    initGame() {
        this.playerCar = {
            x: this.canvas.width/2 - 25,
            y: this.canvas.height - 120,
            width: 50,
            height: 80,
            speed: 5,
            moveSpeed: 0
        };

        this.generateRoad();
        this.lastTime = performance.now();
    }

    generateRoad() {
        // Create road markings
        this.road = [];
        for(let i = 0; i < this.canvas.height; i += 100) {
            this.road.push({
                y: i,
                offset: Math.random() * 100
            });
        }
    }

    generateObstacle() {
        this.obstacles.push({
            x: Math.random() * (this.canvas.width - 60),
            y: -60,
            width: 60,
            height: 60,
            type: Math.floor(Math.random() * 3)
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        document.addEventListener('keydown', (e) => {
            if(!this.gameActive) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    this.playerCar.moveSpeed = -8;
                    break;
                case 'ArrowRight':
                    this.playerCar.moveSpeed = 8;
                    break;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(['ArrowLeft', 'ArrowRight'].includes(e.key)) {
                this.playerCar.moveSpeed = 0;
            }
        });
    }

    checkCollision() {
        return this.obstacles.some(obstacle => {
            return this.playerCar.x < obstacle.x + obstacle.width &&
                   this.playerCar.x + this.playerCar.width > obstacle.x &&
                   this.playerCar.y < obstacle.y + obstacle.height &&
                   this.playerCar.y + this.playerCar.height > obstacle.y;
        });
    }

    update(deltaTime) {
        if(!this.gameActive) return;

        // Move player
        this.playerCar.x += this.playerCar.moveSpeed;
        this.playerCar.x = Math.max(0, 
            Math.min(this.canvas.width - this.playerCar.width, this.playerCar.x));

        // Generate obstacles
        if(Math.random() < 0.02) {
            this.generateObstacle();
        }

        // Update obstacles
        this.obstacles.forEach((obstacle, index) => {
            obstacle.y += this.playerCar.speed;
            
            if(obstacle.y > this.canvas.height) {
                this.obstacles.splice(index, 1);
                this.score += 10;
            }
        });

        // Check collisions
        if(this.checkCollision()) {
            this.gameActive = false;
            document.getElementById('gameOver').style.display = 'block';
        }

        this.gameTime += deltaTime;
    }

    drawRoad() {
        this.ctx.fillStyle = '#444';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw road markings
        this.ctx.strokeStyle = '#fff';
        this.ctx.setLineDash([40, 40]);
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width/2 - 100, 0);
        this.ctx.lineTo(this.canvas.width/2 - 100, this.canvas.height);
        this.ctx.moveTo(this.canvas.width/2 + 100, 0);
        this.ctx.lineTo(this.canvas.width/2 + 100, this.canvas.height);
        this.ctx.stroke();
    }

    drawCar() {
        this.ctx.fillStyle = '#2196F3';
        this.ctx.fillRect(
            this.playerCar.x, 
            this.playerCar.y, 
            this.playerCar.width, 
            this.playerCar.height
        );
    }

    drawObstacles() {
        this.obstacles.forEach(obstacle => {
            this.ctx.fillStyle = ['#ff0000', '#ffff00', '#00ff00'][obstacle.type];
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }

    drawHUD() {
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 20, 40);
        this.ctx.fillText(`Time: ${this.gameTime.toFixed(2)}`, 20, 80);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawRoad();
        this.drawObstacles();
        this.drawCar();
        this.drawHUD();
    }

    gameLoop() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.draw();
        
        if(this.gameActive) {
            requestAnimationFrame(() => this.gameLoop());
        }
    }
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    const game = new RacingGame();
    
    // Restart handler
    document.getElementById('restartBtn').addEventListener('click', () => {
        document.getElementById('gameOver').style.display = 'none';
        game.initGame();
        game.gameActive = true;
        game.gameLoop();
    });
});