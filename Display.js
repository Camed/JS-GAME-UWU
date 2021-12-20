const Display = function(canvas) {
    this.buffer = document.createElement("canvas").getContext("2d");
    this.context = canvas.getContext("2d");

    let spriteWidth = 32;
    let spriteHeight = 32;
    
    let playerSprite = document.getElementById("mainSprite");

    this.drawPlayer = function(x, y, playerState, fillColor) {
        this.buffer.fillStyle = fillColor;
        let col = 0;
        let row = 0;
        if(playerState.Idle == true) {
            col = Math.floor(Math.random() * 2);
            row = 0;
        }
        else if(playerState.movingLeft == true) {
            col = 0;
            row = 1;
        }
        else if(playerState.movingRight == true) {
            col = 1;
            row = 1;
        }
        else if(playerState.attackLeft == true) {
            col = 2;
            row = 0;
        }
        else if(playerState.attackRight == true) {
            col = 2;
            row = 1;
        }
        else {
            col = 0;
            row = 0;
        }
        this.buffer.drawImage(playerSprite, col*spriteWidth, row*spriteHeight, spriteWidth, spriteHeight, x, y, spriteWidth, spriteHeight);
    }

    this.fill = function(color) {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    }

    this.render = function() {
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    this.resize = function(width, height, hw_ratio) {
        if(height / width > hw_ratio) {
            this.context.canvas.height = width * hw_ratio;
            this.context.canvas.width = width;
        }
        else {
            this.context.canvas.height = height;
            this.context.canvas.width = height / hw_ratio;
        }
        this.context.imageSmoothingEnabled = false;
    }
}

Display.prototype = {
    constructor: Display
}