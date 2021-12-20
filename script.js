window.addEventListener("load", function(event) {
    "use strict";

    var keyDownUp = function(event) {
        controller.detectKeyDown(event.type, event.keyCode);
    };

    var resize = function(event) {
        display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
        display.render();
    };

    var render = function() {
        display.fill(game.world.backgroundColor);

        display.drawPlayer(game.world.player.x, game.world.player.y, game.world.player, game.world.player.color);

        display.render();
    };

    var update = function() {
        if(controller.pressedA.active) { 
            game.world.player.moveLeft(1);
            game.world.player.Idle = false;
            game.world.player.movingLeft = true;
            game.world.player.movingRight = false;
            game.world.player.attackLeft = false;
            game.world.player.attackRight = false;
        }
        else if(controller.pressedD.active) { 
            game.world.player.moveRight(1);
            game.world.player.Idle = false;
            game.world.player.movingLeft = false;
            game.world.player.movingRight = true;
            game.world.player.attackLeft = false;
            game.world.player.attackRight = false;
        }
        else if(controller.pressedW.active) { 
            game.world.player.jump();
            controller.pressedW.active = false;
        }
        if(controller.pressedSpace.active) {

            if(game.world.player.movingLeft == true) {
                game.world.player.movingLeft = false;
                game.world.player.attackLeft = true;
                game.world.player.performAttackLeft();
            }
            else if(game.world.player.movingRight == true) {
                game.world.player.movingRight = false;
                game.world.player.attackRight = true;
                game.world.player.performAtackRight();
            }
            else if(game.world.player.Idle == true) {
                game.world.player.Idle = false; 
                let x = Math.floor(Math.random() * 2);
                if(x == 0) { game.world.player.attackLeft = true; game.world.player.performAttackLeft(); }
                else { game.world.player.attackRight = true; game.world.player.performAtackRight();}
            }
        }
        else if(!controller.pressedW.active && !controller.pressedA.active && !controller.pressedD.active) {
            game.world.player.Idle = true;
            game.world.player.movingLeft = false;
            game.world.player.movingRight = false;
            game.world.player.attackLeft = false;
            game.world.player.attackRight = false;
        }
        

        game.update();
    };

    var controller = new Controller();
    var display = new Display(document.querySelector("canvas"));
    var game = new Game();
    var engine = new Engine(1000/30, update, render);

    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;

    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);
    window.addEventListener("resize", resize);

    resize();

    engine.start();

});