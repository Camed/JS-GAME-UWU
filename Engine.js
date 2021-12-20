const Engine = function(time_step, updateF, renderF) {
    this.totalTime = 0;
    this.animFrameRequest = undefined;
    this.time = undefined;
    this.timeStep = time_step;

    this.isUpdated = false;
    
    this.updateF = updateF;
    this.renderF = renderF;

    this.run = function(timeStamp) {
        this.totalTime += timeStamp - this.time;
        this.time = timeStamp;

        // we dont want lags and burn cpu's
        if(this.totalTime >= this.timeStep * 3) {
            this.totalTime = this.timeStep;
        }

        while(this.totalTime >= this.timeStep) {
            this.totalTime -= this.timeStep;

            this.updateF(timeStamp);

            this.isUpdated = true;
        }

        if(this.isUpdated) {
            this.isUpdated = false;
            this.renderF(timeStamp);
        }
        this.animFrameRequest = window.requestAnimationFrame(this.runHandler);
    }

    this.runHandler = timeStep => this.run(timeStep);
}

Engine.prototype = {
    constructor: Engine,

    start: function() {
        this.totalTime = this.timeStep;
        this.time = window.performance.now();
        this.animFrameRequest = window.requestAnimationFrame(this.runHandler);
    },

    stop: function() {
        window.cancelAnimationFrame(this.animFrameRequest);
    }
}