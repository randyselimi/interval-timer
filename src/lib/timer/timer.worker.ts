onmessage = ({ data: { message } }: MessageEvent) => {
  switch (message) {
    case 'start':
      startTimer();
      break;
    case 'stop':
      stopTimer();
  }
};

let timer: NodeJS.Timeout | undefined = undefined;

const startTimer = () => (timer = setInterval(() => postMessage({}), 100));

const stopTimer = () => {
  if (!timer) {
    return;
  }
  clearInterval(timer);
  timer = undefined;
};

export {};
