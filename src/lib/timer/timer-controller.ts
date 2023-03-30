import { TimerGrid } from "./timer-grid";
import { NodeTimer, type ITimer, type TimerProps, type TimerState } from "./timer";

export interface TimerData {
    state: TimerState,
    props : TimerProps,
}

export class TimerController {
    grid : TimerGrid;
    running = false;

    constructor(timerData : TimerData[]) {
        const timers : ITimer[] = [];
        for (const data of timerData) {
            timers.push(new NodeTimer(data.state, data.props))
        }
        this.grid = new TimerGrid(timers);
    }
    start() {
        if (this.running) {
            return
        }
        for (const row of this.grid.getRows()) {
            row.start();
        }   
        this.running = true;
    }
    stop() {
        for (const row of this.grid.getRows()) {
            row.stop();
        }
        this.running = false;
    }
    reset() {
        for (const row of this.grid.getRows()) {
            row.reset();
        }
        this.running = false;
    }
    add(timer : ITimer) {
        this.grid.add(timer);
    }
}