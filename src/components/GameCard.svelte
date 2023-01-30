<script lang="ts">
    import Title from "./Title.svelte";

    export let game;
</script>

<a href={game.url} class="relative group" target="_blank" rel="noreferrer">
    <div class="overflow-hidden">
        <img
            src={game.cover_url}
            alt={game.title}
            class="w-full max-w-full object-cover group-hover:scale-110 transition-transform duration-150 ease-in-out"
        />
    </div>
    <Title
        title={game.title}
        speed={10}
        class=" bg-white text-black p-2 font-mono font-bold"
    />
</a>
