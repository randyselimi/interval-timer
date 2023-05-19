onmessage = ({data: {message}}) => {
    console.log('here')
    switch (message) {
        case 'start':
            startTimer();
            break;
        case 'stop':
            stopTimer();
            break;
        default:
            break;
    }
};

/**
 * @type {NodeJS.Timer | undefined}
 */
let timer = undefined;

const handleTick = () => {
    postMessage({})
}

const startTimer = () => (timer = setInterval(handleTick, 100))

const stopTimer = () => {
    if (!timer) {
        return;
    }
    clearInterval(timer);
    timer = undefined;
}
export {};