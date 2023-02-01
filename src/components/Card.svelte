<script lang="ts">
    import { flip } from "svelte/animate";
    import { onMount } from "svelte";
    import Language from "./icons/Language.svelte";
    import Star from "./icons/Star.svelte";
    import Watcher from "./icons/Watcher.svelte";

    export let repo;

    // const name = repo.name;
    // const description = repo.description;
    // const stars = repo.stargazers_count;
    // const watchers = repo.watchers;
    // const url = repo.html_url;
    $: ({ name, description, stargazers_count, watchers, html_url, language } =
        repo);
    async function getImg() {
        const imgSrc =
            `${html_url}/blob/main/Documentation~/Images/thumbnail.png`
                .replace(
                    "https://github.com/",
                    "https://raw.githubusercontent.com/"
                )
                .replace("blob/", "");
        const result = await fetch(imgSrc);

        if (result.ok) {
            return imgSrc;
        } else {
            throw new Error(imgSrc);
        }
    }
    const createdAt = repo.created_at;
    const updatedAt = repo.updated_at;

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
</script>

<a
    class="flex gap-4 p-4 transition-all duration-150 ease-linear outline outline-2 outline-secondary/10 hover:outline-secondary/20 hover:-translate-y-2 group"
    href={html_url}
    target="_blank"
    rel="noreferrer"
    on:mouseover={hover}
    on:focus={hover}
>
    <div class="rounded-sm overflow-hidden w-48">
        {#await getImg()}
            <div class="bg-accent h-full bg-opacity-10 animate-pulse" />
        {:then image}
            <img
                src={image}
                class="h-full aspect-video object-cover object-top"
                alt={description}
            />
        {:catch error}
            <div class="bg-accent h-full bg-opacity-10 animate-pulse" />
        {/await}
    </div>
    <div class="flex flex-col w-full">
        <h3
            class="font-mono text-xl font-bold transition-colors duration-150 ease-linear group-hover:bg-accent group-hover:text-accent-invert"
        >
            {name}
        </h3>
        <div class="flex flex-col justify-between h-full gap-2">
            <p>{description}</p>
            <div class="flex gap-2">
                <span class="flex items-center gap-1 font-semibold">
                    <Star
                        class="w-6 h-6 transition-colors duration-150 ease-in-out fill-secondary group-hover:text-yellow-400"
                    />
                    {stargazers_count}
                </span>
                <span class="flex items-center gap-1">
                    <Watcher
                        class="w-6 h-6 transition-colors duration-150 ease-in-out fill-secondary group-hover:text-rose-400"
                    />
                    {watchers}
                </span>
                {#if language}
                    <span class="flex items-center gap-1 ml-auto">
                        <Language
                            class="w-6 h-6 transition-colors duration-150 ease-in-out fill-secondary group-hover:text-blue-400"
                        />
                        {language}
                    </span>
                {/if}
            </div>
        </div>
    </div>
</a>

<style>
    a > * {
        pointer-events: none;
    }
</style>
