const Controller = function() {
    this.pressedA = new Controller.ButtonInput();
    this.pressedD = new Controller.ButtonInput();
    this.pressedW = new Controller.ButtonInput();
    this.pressedSpace = new Controller.ButtonInput();

    this.detectKeyDown = function(type, keycode) {
        var pressed = (type=="keydown");
        switch(keycode) {
            case 37:
            case 65:
                this.pressedA.getInput(pressed);
                console.log("hello");
                break;
            case 38:
            case 87:
                this.pressedW.getInput(pressed);
                break;
            case 39:
            case 68:
                this.pressedD.getInput(pressed);
                break;
            case 32:
                this.pressedSpace.getInput(pressed);
                break;
        }
    }
}

Controller.prototype = {
    constructor: Controller
}

Controller.ButtonInput = function() {
    this.active = false;
    this.down = false;
}

Controller.ButtonInput.prototype = {
    constructor: Controller.ButtonInput,

    getInput: function(down){
        if(this.down != down) this.active = down;
        this.down = down;
    }
}