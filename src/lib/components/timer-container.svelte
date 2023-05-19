<script lang="ts">
  import { onMount } from 'svelte';
  import TimerControls from './timer-controls.svelte';
  import { TimerController, type TimerData } from '../timer/timer-controller';
  import { WorkerTimer } from '$lib/timer/timer';
  import TimerGrid from './timer-grid.svelte';

  let controller: TimerController = new TimerController();
  $: rows = controller.grid.getRows();
  $: running = controller.running;

  function handleStart() {
    controller.start();
  }
  function handleStop() {
    controller.stop();
  }
  function handleReset() {
    controller.reset();
  }

  onMount(async () => {
    const response = await fetch('timer-test-data.json');
    const timerData = await response.json();
    for (const data of timerData) {
      const worker = new Worker(new URL('$lib/timer/timer.worker.ts', import.meta.url), {
        type: 'module'
      });
      const timer = new WorkerTimer(data.state, data.props, worker);
      controller.add(timer);
    }
    const tick = setInterval(() => {
      console.log(running);
      controller = controller;
    }, 100);
    return () => {
      clearInterval(tick);
      controller.stop();
    };
  });
</script>

<TimerControls {running} on:start={handleStart} on:stop={handleStop} on:reset={handleReset} />
<TimerGrid {rows} />
