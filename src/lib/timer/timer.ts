export interface TimerState {
    duration : number,
    elapsed : number,
    running : boolean,
    finished : boolean,
}

export interface Timer {
    state : TimerState;
    start() : void;
    stop() : void;
    toggle() : void;
    reset() : void;
    restart() : void;
    onfinish : (() => void) | undefined
}

export class NodeTimer implements Timer {
    state : TimerState;
    private timer : NodeJS.Timer | undefined = undefined
    
    constructor(state : TimerState) {
        this.state = state
        console.log('here')
    }
    start() {
        if (this.state.finished) {
            return;
        }
 
        this.state.running = true;
        this.timer = setInterval(() => this.handleTick(), 100)  
    }
    stop() {
        if (this.state.finished || !this.timer) {
            return;
        }
        this.state.running = false;
        clearInterval(this.timer);
        this.timer = undefined;
    }
    toggle() {
        (this.state.running) ? this.stop() : this.start();
    }
    reset() {
        this.stop();
        this.state.finished = false;
        this.state.elapsed = 0;
    }
    restart() {
        this.reset();
        this.start();
    }
    onfinish: (() => void) | undefined = undefined;
    private handleTick() {
        this.state.elapsed += 100;
        //finish logic
        if (this.state.elapsed >= this.state.duration) {
            this.stop();
            this.state.finished = true;
            if (this.onfinish != undefined) {
                this.onfinish();
            }
        }
    }
}