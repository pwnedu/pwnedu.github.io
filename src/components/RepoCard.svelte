<script lang="ts">
    import type { Repository } from "@helpers/types";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import Language from "./icons/Language.svelte";
    import Star from "./icons/Star.svelte";
    import Watcher from "./icons/Watcher.svelte";

    export let repo: Repository;

    let audioHover;
    let isHover = false;

    function hover(e) {
        isHover = true;
        if (audioHover) {
            audioHover.volume = 0.2;
            audioHover.play();
        }
    }

    function changeHoverState(e) {
        isHover = !isHover;
    }

    onMount(() => {
        audioHover = new Audio("/sound.wav");
    });
</script>

<a
    class="relative flex gap-4 p-4 transition-all duration-150 ease-linear outline outline-2 outline-secondary/30 hover:outline-secondary group"
    href={repo.html_url}
    target="_blank"
    rel="noreferrer"
    on:mouseover={hover}
    on:mouseleave={changeHoverState}
    on:focus={hover}
>
    <!-- Tooltip -->
    {#if isHover && repo.readme !== ""}
        <div
            transition:fly={{ y: 100, duration: 150 }}
            class="absolute flex flex-col items-center bg-main/90 border-2 border-secondary top-0 right-0 left-0 -translate-y-[110%] z-[9999] p-2 font-mono"
        >
            <img
                src={repo.img_url?.replace("thumbnail", "screenshot")}
                alt={repo.name}
                class="h-full w-72"
            />
            <h6 class="self-start font-bold my-2 tracking-widest">
                Package Description:
            </h6>
            <span class="italic">{repo.readme}</span>
        </div>
    {/if}
    <!-- Tooltip End-->

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
