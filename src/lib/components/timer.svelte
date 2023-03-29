<script lang="ts">
	import { onMount } from 'svelte';
    import {NodeTimer, type Timer, type TimerState} from '../timer/timer';
    export let duration = 0;
    export let name = "";
    export let sound = "";

    let audio : HTMLAudioElement; 
    let timer : Timer = new NodeTimer({duration : duration, elapsed : 0, running : false, finished : false})
    timer.onfinish = onFinish;

    function onFinish() {
        audio.play();
        timer.restart();
    }
    function toggle() {
        timer.toggle();
    }
    function reset() {
        timer.reset();
    }

    onMount(() => {
        const tick = setInterval(() => {
            timer = timer;
        }, 100)

        return () => {
            clearInterval(tick);
            timer.stop();
        }
    })

</script>

<h3> {name} </h3>
<p>Duration: {timer.state.duration}</p>
<p>Elapsed: {timer.state.elapsed}</p>
<p>Running: {timer.state.running}</p>
<p>Completed: {timer.state.finished}</p>

{#if timer.state.running}
<button on:click={toggle}>
    Pause
</button>
{:else}
<button on:click={toggle}>
    Play
</button>
{/if}
<button on:click={reset}>
    Reset
</button>

<audio src={sound} bind:this={audio}></audio>