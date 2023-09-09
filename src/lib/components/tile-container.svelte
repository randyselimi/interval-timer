<script lang="ts">
  import { onMount } from 'svelte';
  import { WorkerTimer } from '$lib/timer/worker-timer';
  import { TimerTile } from '$lib/tile/timer-tile';
  import { TileController } from '$lib/tile/tile-controller';
  import TileControls from './tile-controls.svelte';
  import TileRow from './tile-row.svelte';
  import CreateTile from './create-tile.svelte';
  export let data: any;
  let controller = new TileController();
  $: running = controller.running;
  $: rows = controller.getRows();

  function createTimerTile(
    x: number,
    y: number,
    name: string,
    sound: string,
    duration: number
  ): TimerTile {
    const worker = new Worker(new URL('$lib/timer/timer.worker.ts', import.meta.url), {
      type: 'module'
    });
    const timer = new WorkerTimer(worker, duration);
    return new TimerTile(timer, x, y, name, sound);
  }
  function handleTileCreated(event: any) {
    const tileData = event.detail;
    var tile = createTimerTile(
      tileData.x,
      tileData.y,
      tileData.name,
      tileData.sound,
      tileData.duration
    );
    controller.addTile(tile);
  }

  function handleStart() {
    controller.start();
  }
  function handleStop() {
    controller.stop();
  }
  function handleReset() {
    controller.reset();
  }
  function handleRestart() {
    controller.restart();
  }

  onMount(async () => {
    for (const tileData of data.tiles) {
      const tile = createTimerTile(
        tileData.x,
        tileData.y,
        tileData.name,
        tileData.sound,
        tileData.duration
      );
      controller.addTile(tile);
    }
    const tick = setInterval(() => {
      controller = controller;
    }, 100);
    return () => {
      controller.stop();
      clearInterval(tick);
    };
  });
  console.log(controller);
</script>

<TileControls {running} on:start={handleStart} on:stop={handleStop} on:reset={handleReset} />

{#each rows as row}
  <TileRow {row} on:tileCreated={handleTileCreated} />
{/each}
<CreateTile />
