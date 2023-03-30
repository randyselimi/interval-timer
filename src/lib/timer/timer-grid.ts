import type { ITimer } from "./timer";

class TimerRow  {
    private timers : ITimer[] = [];

    start() {
        const timer = this.getReadyTimer();
        (timer) ? timer.start() : this.restart();
    }
    stop() {
        for (const timer of this.timers) {
            timer.stop();
        }
    }
    reset() {
        for (const timer of this.timers) {
            timer.reset();
        }
    }
    restart() {
        this.reset();
        this.start();
    }

    add(timer : ITimer) {
        if (this.timers[timer.props.x]) {
            console.log('invalid')
        }
        timer.onfinish.push(() => this.triggerNextTimer())
        this.timers[timer.props.x] = timer;
    }
    get() {
        return this.timers;
    }
    remove(y : number) {
        //this.timers.
    }
    //Gets the first, ready (non-finished) timer in the row
    private getReadyTimer() {
        for (const timer of this.timers) {
            if (!timer.state.finished) {
                return timer;
            }
        }
    }
    private triggerNextTimer() {
        this.start();
    }
}

export class TimerGrid  {
    private rows : TimerRow[] = [];
    constructor(timers : ITimer[]) {
        for (const timer of timers) {
            this.add(timer);
        }
    }
    add(timer : ITimer) {
        const row = this.getRow(timer.props.y);
        (row) ? row.add(timer) : this.createRow(timer)
    }
    getRow(y : number) : TimerRow | undefined {
        if (this.rows[y]) {
            return this.rows[y]
        }
        return undefined;
    }
    getRows() : TimerRow[]{
        return this.rows;
    }
    private createRow(timer : ITimer) {
        const row = new TimerRow();
        row.add(timer);
        this.rows[timer.props.y] = row;
    }
}