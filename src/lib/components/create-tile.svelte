<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let x = 0;
  export let y = 0;
  let formOpened = false;
  console.log(x);
  console.log(y);

  const dispatch = createEventDispatcher();

  function createTimer(e: any) {
    const form = e.target;
  }
</script>

<div>
  {#if formOpened}
    <form method="POST">
      <label>
        Name:
        <input name="name" autocomplete="off" />
      </label>
      <label>
        Duration:
        <input type="number" name="duration" autocomplete="off" />
      </label>
      <label>
        Sound:
        <input name="sound" autocomplete="off" />
      </label>
      <input type="hidden" id="x" name="x" value={x} />
      <input type="hidden" id="y" name="y" value={y} />
      <button>Create Timer</button>
      <button on:click={() => (formOpened = false)}>Cancel</button>
    </form>
  {:else}
    <button on:click={() => (formOpened = true)}>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"
        ><path
          d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
        /></svg
      >
    </button>
  {/if}
</div>
