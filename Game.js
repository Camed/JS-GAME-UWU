const Game = function() {
    this.world = {
        backgroundColor: "rgba(135, 206, 235, 0.1)",
        friction: 0.9,
        gravity: 1.0,

        player: new Game.Player(),
        height: 200,
        width: 350,

        detectColision: function(object) {
            if(object.x < 0) { object.x = 0; object.velocityX = 0; }
            else if(object.x + object.width > this.width) { object.x = this.width - object.width; object.velocityX = 0; }

            if(object.y < 0) { object.y = 0; object.velocityY = 0; this.player.isDuringJump = false; }
            else if(object.y + object.height> this.height) { object.isDuringJump = false; object.y = this.height - object.height; object.velocityY = 0; this.player.isDuringJump = false; }
        },

        update: function() {
            this.player.velocityY += this.gravity;
            this.player.update();
            this.player.velocityX *= this.friction;

            this.detectColision(this.player);
        }
    }

    this.update = function() {
        this.world.update();
    }
}

Game.prototype = {
    constructor: Game
};

Game.Player = function(x, y) {
    this.color = "rgba(135, 206, 235, 0.1)";
    this.height = 32;
    this.width = 32;
    this.isDuringJump = true;
    this.canDoubleJump = true;
    this.movingLeft = false;
    this.movingRight = false;
    this.Idle = true;
    this.attackLeft = false;
    this.attackRight = false;
    this.velocityX = 0;
    this.velocityY = 0;
    this.x = 30;
    this.y = 50;
}

Game.Player.prototype = {
    constructor: Game.Player,

    jump: function() {
        if(!this.isDuringJump){
            this.canDoubleJump = true;
        }
        if(!this.canDoubleJump) {
            return;
        }
        if(this.isDuringJump) {
            if(this.canDoubleJump) {
                this.canDoubleJump = false;
                this.velocityY -= 5;
                return;
            }
        }
        this.isDuringJump = true;
        this.velocityY -= 5;
    },

    performAttackLeft: function() {
        this.velocityX = 0;
        console.log("atak w lewo");
    },

    performAtackRight: function() {
        this.velocityX = 0;
        console.log("atak w prawo");
    },
    moveLeft: function(speedModifier) {
        this.velocityX -= (0.5 * speedModifier);
    },
    
    moveRight: function(speedModifier) {
        this.velocityX += (0.5 * speedModifier);
    },

    update: function() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }
}