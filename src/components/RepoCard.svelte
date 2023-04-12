<script lang="ts">
    import { Repository } from "@helpers/types";
    import { onMount } from "svelte";
    import Language from "./icons/Language.svelte";
    import Star from "./icons/Star.svelte";
    import Watcher from "./icons/Watcher.svelte";

    export let repo: Repository;

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
    class="flex gap-4 p-4 transition-all duration-150 ease-linear outline outline-2 outline-secondary/30 hover:outline-secondary hover:-translate-y-2 group"
    href={repo.html_url}
    target="_blank"
    rel="noreferrer"
    on:mouseover={hover}
    on:focus={hover}
>
    <div class="rounded-sm overflow-hidden w-48">
        {#if repo.img_url !== ""}
            <img
                src={repo.img_url}
                class="h-full aspect-video object-cover object-top"
                alt={repo.description}
            />
        {/if}
    </div>
    <div class="flex flex-col w-full">
        <h3
            class="font-mono text-xl font-bold transition-colors duration-150 ease-linear group-hover:bg-accent group-hover:text-accent-invert"
        >
            {repo.name}
        </h3>
        <div class="flex flex-col justify-between h-full gap-2">
            <p>{repo.description}</p>
            <div class="flex gap-2">
                <span class="flex items-center gap-1 font-semibold">
                    <Star
                        class="w-6 h-6 transition-colors duration-150 ease-in-out fill-secondary group-hover:text-yellow-400"
                    />
                    {repo.stargazers_count}
                </span>
                <span class="flex items-center gap-1">
                    <Watcher
                        class="w-6 h-6 transition-colors duration-150 ease-in-out fill-secondary group-hover:text-rose-400"
                    />
                    {repo.watchers}
                </span>
                {#if repo.language}
                    <span class="flex items-center gap-1 ml-auto">
                        <Language
                            class="w-6 h-6 transition-colors duration-150 ease-in-out fill-secondary group-hover:text-blue-400"
                        />
                        {repo.language}
                    </span>
                {/if}
            </div>
        </div>
    </div>
</a>

<style>
    a {
        --h-length: 0rem;
        --v-length: 0rem;
        --spread-radius: 0rem;
        box-shadow: var(--h-length) var(--v-length) 0px var(--spread-radius)
            hsl(var(--secondary-color));
        -webkit-box-shadow: var(--h-length) var(--v-length) 0px
            var(--spread-radius) hsl(var(--secondary-color));
        -moz-box-shadow: var(--h-length) var(--v-length) 0px
            var(--spread-radius) hsl(var(--secondary-color));
    }
    a:hover {
        --h-length: 0.375rem;
        --v-length: 0.375rem;
        --spread-radius: 0.075rem;
    }
    a > * {
        pointer-events: none;
    }
</style>
