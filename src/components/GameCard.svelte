<script lang="ts">
    import Test from "./Test.svelte";
    import Title from "./Title.svelte";

    export let game;
</script>

<a href={game.url} class="relative group" target="_blank" rel="noreferrer">
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
