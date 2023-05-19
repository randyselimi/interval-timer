<script>
  import { createEventDispatcher } from 'svelte';
  export let running = false;

  const dispatch = createEventDispatcher();

  function start() {
    dispatch('start');
  }
  function stop() {
    dispatch('stop');
  }
  function reset() {
    dispatch('reset');
  }
</script>

{#if !running}
  <button on:click={start}> Play </button>
{:else}
  <button on:click={stop}> Pause </button>
{/if}
<button on:click={reset}> Reset </button>
