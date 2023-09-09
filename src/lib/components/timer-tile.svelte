<script lang="ts">
  import { onMount } from 'svelte';
  import type { Tile } from '$lib/tile/tile';
  import type { TimerTile } from '$lib/tile/timer-tile';
  export let tile: Tile;
  let timerTile = tile as TimerTile;

  function start() {
    timerTile.start();
  }
  function stop() {
    timerTile.stop();
  }
  function reset() {
    timerTile.reset();
  }
  function restart() {
    timerTile.restart();
  }
  onMount(() => {
    const tick = setInterval(() => {
      timerTile = timerTile;
    }, 100);

    return () => {
      clearInterval(tick);
      timerTile.stop();
    };
  });
</script>

<div>
  <p>Duration: {timerTile.timer.duration}</p>
  <p>Elapsed: {timerTile.timer.elapsed}</p>
  <p>Running: {timerTile.timer.running}</p>
  <p>Completed: {timerTile.timer.finished}</p>

  {#if timerTile.timer.running}
    <button on:click={stop}> Pause </button>
  {:else}
    <button on:click={start}> Play </button>
  {/if}
  <button on:click={reset}> Reset </button>
  <button on:click={restart}> Restart </button>
</div>
