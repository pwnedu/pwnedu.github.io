<script lang="ts">
    import { inview } from "svelte-inview";

    export let title: string = "";
    export let as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h1";
    export let afterTitle: string = title;
    export let speed: number = 30;
    export let fireOnce: boolean = false;
    export let delay: number = 0;

    let element;
    let interval;

    function effect(e) {
        console.log(element.dataset.value);
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        let iteration = 0;

        interval = setInterval(() => {
            element.innerText = element.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return element.dataset.value[index];
                    }

                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");

            if (iteration >= afterTitle.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, speed);
    }

    function reset(e) {
        element.innerText = afterTitle;
        clearInterval(interval);
    }

    const options = {
        unobserveOnEnter: fireOnce,
    };
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<svelte:element
    this={as}
    bind:this={element}
    data-value={afterTitle}
    on:mouseover={effect}
    class={$$props.class}
    use:inview={options}
    on:enter={effect}
    on:leave={reset}
>
    {title}
</svelte:element>
