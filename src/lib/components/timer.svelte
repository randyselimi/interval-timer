<script lang="ts">
  import type { ITimer } from '$lib/timer/timer';
  import { onMount } from 'svelte';
  export let timer: ITimer;
  timer.onfinish.push(onFinish);
  let audio: HTMLAudioElement;

  export function start() {
    timer.start();
  }
  export function stop() {
    timer.stop();
  }
  export function toggle() {
    timer.toggle();
  }
  export function reset() {
    timer.reset();
  }
  export function restart() {
    timer.restart();
  }
  function onFinish() {
    audio.play();
  }

  onMount(() => {
    const tick = setInterval(() => {
      timer = timer;
    }, 100);

    return () => {
      clearInterval(tick);
      timer.stop();
    };
  });
</script>

<h3>{timer.props.name}</h3>
<p>Duration: {timer.state.duration}</p>
<p>Elapsed: {timer.state.elapsed}</p>
<p>Running: {timer.state.running}</p>
<p>Completed: {timer.state.finished}</p>

{#if timer.state.running}
  <button on:click={toggle}> Pause </button>
{:else}
  <button on:click={toggle}> Play </button>
{/if}
<button on:click={reset}> Reset </button>

<audio src={timer.props.sound} bind:this={audio} />
