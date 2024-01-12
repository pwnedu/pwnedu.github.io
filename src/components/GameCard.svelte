<script lang="ts">
    import { onMount } from "svelte";

    export let game;

    let audioHover;

    function hover(e) {
        if (audioHover) {
            audioHover.volume = 0.2;
            audioHover.play();
        }
    }

    onMount(() => {
        audioHover = new Audio("/sound.wav");
    });

    console.log(game)
</script>

<a
    href={game.url}
    class="relative group"
    target="_blank"
    rel="noreferrer"
    on:mouseenter={hover}
>
    <div class="overflow-hidden">
        <img
            src={game.cover_url}
            alt={game.title}
            class="object-cover w-full max-w-full transition-transform duration-150 ease-in-out group-hover:scale-110"
        />
    </div>
    <!-- <Title
        title={game.title}
        speed={10}
        fireOnce={true}
        class="p-2 font-mono font-bold bg-accent text-accent-invert"
    /> -->
    <span class="block p-2 font-mono font-bold bg-accent text-accent-invert"
        >{game.title}</span
    >
</a>
