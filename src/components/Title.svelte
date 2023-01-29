<script lang="ts">
    export let title: string = "";
    export let as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h1";
    export let afterTitle: string = title;
    export let speed: number = 30;

    function effect(e) {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let interval = null;
        let iteration = 0;
        interval = setInterval(() => {
            e.target.innerText = e.target.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return e.target.dataset.value[index];
                    }

                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");

            if (iteration >= title.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, speed);
    }
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<svelte:element
    this={as}
    data-value={afterTitle}
    on:mouseover={effect}
    class={$$props.class}
>
    {title}
</svelte:element>
