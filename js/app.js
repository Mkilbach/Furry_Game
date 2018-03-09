import "../style/style.scss";

class Furry {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.direction = 'right';
    }
}

class Coin {
    constructor() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }
}

class Game {
    constructor() {
        this.board = document.querySelectorAll('#board div');
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
        this.startGame();
    }

    index(x, y) {
        return x + (y * 10);
    }

    showFurry() {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    }

    hideVisibleFurry() {
        (document.querySelector('.furry')) ? document.querySelector('.furry').classList.remove('furry') : 0;
    }

    showCoin() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }

    moveFurry() {
        
        
        if(this.furry.direction === "right") {
            this.furry.x++;
        } else if (this.furry.direction === "left") {
            this.furry.x--;
        } else if (this.furry.direction === "up") {
            this.furry.y--;
        } else if (this.furry.direction === "down") {
            this.furry.y++;
        }
        console.log(this.furry.x, this.furry.y);
        this.gameOver();        
        this.checkCoinCollision();
    }

    checkCoinCollision() {
        if(this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            document.querySelector('.coin').classList.remove('coin');
            this.score++;
            document.querySelector('#score strong').innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    }

    turnFurry(e) {
        switch (e.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    }

    gameOver() {
        if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetinterval);
            this.hideVisibleFurry();
            document.querySelector('#over').classList.remove('invisible');
            document.querySelector("#finalScore").innerText = this.score;
        } else {
            this.showFurry();
        }
    }

    startGame() {
        this.showFurry();
        this.showCoin();
        this.idSetinterval = setInterval(() =>{
            this.moveFurry();
        }, 250);
        document.addEventListener('keydown', (event)=>{
            this.turnFurry(event);
        });
    }
}

const game = new Game();
