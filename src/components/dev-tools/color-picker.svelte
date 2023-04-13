<script lang="ts">
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";

    let open = false;
    let html: HTMLElement;

    let styles = [
        {
            name: "--primary-color",
            raw: "#000000",
            value: "0 0% 0%",
        },
        {
            name: "--secondary-color",
            raw: "#000000",
            value: "0 0% 0%",
        },
        {
            name: "--accent-color",
            raw: "#000000",
            value: "0 0% 0%",
        },
        {
            name: "--accent-invert",
            raw: "#000000",
            value: "0 0% 0%",
        },
        {
            name: "--bg-color",
            raw: "#000000",
            value: "0 0% 0%",
        },
    ];

    function hexToHsl(hex) {
        // Remove "#" from the beginning of the hex code, if present
        hex = hex.replace("#", "");

        // Convert hexadecimal to RGB values
        var r = parseInt(hex.substr(0, 2), 16) / 255;
        var g = parseInt(hex.substr(2, 2), 16) / 255;
        var b = parseInt(hex.substr(4, 2), 16) / 255;

        // Find the maximum and minimum values among r, g, and b
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);

        // Calculate the difference between max and min
        var delta = max - min;

        // Initialize hue, saturation, and lightness
        var h = 0;
        var s = 0;
        var l = (max + min) / 2;

        // Check for grayscale colors (delta = 0)
        if (delta !== 0) {
            // Calculate saturation based on whether lightness is below or above 0.5
            s = delta / (1 - Math.abs(2 * l - 1));

            // Calculate hue based on which RGB value is the maximum
            switch (max) {
                case r:
                    h = ((g - b) / delta) % 6;
                    break;
                case g:
                    h = (b - r) / delta + 2;
                    break;
                case b:
                    h = (r - g) / delta + 4;
                    break;
            }

            // Convert hue to degrees
            h = Math.round(h * 60);

            // Ensure hue is positive
            if (h < 0) {
                h += 360;
            }
        }

        // Round saturation and lightness to percentage values
        s = Math.round(s * 100);
        l = Math.round(l * 100);

        // Return the HSL values as an object
        return { h: h, s: s, l: l };
    }

    function handleKey(e: KeyboardEvent) {
        e = e || window.event;

        if (e.key == "/" && e.ctrlKey && html !== null) {
            open = !open;
        }
    }

    onMount(() => {
        html = document.documentElement;

        // styles.map((element) => {
        //     const color = getComputedStyle(html).getPropertyValue(element.name);
        //     element.value = tinycolor(color.trim()).toHexString();
        // });
        // console.log(styles);
    });

    function setColor(propertyKey: string, value: string) {
        let hsl = `${hexToHsl(value).h} ${hexToHsl(value).s}% ${
            hexToHsl(value).l
        }%`;
        html?.style.setProperty(propertyKey, hsl);
        let index = styles.findIndex((s) => s.name === propertyKey);
        styles[index].value = hsl;
        styles[index].raw = value;
        styles = styles;
    }

    function copy() {
        navigator.clipboard.writeText(JSON.stringify(styles));
    }
</script>

<svelte:window on:keydown={handleKey} />

{#if open}
    <div
        transition:fade={{ duration: 75 }}
        class="fixed flex bg-slate-800/10 shadow-xl shadow-secondary inset-0 z-[99999999999]"
    >
        <div
            transition:fly={{ y: 500, duration: 150 }}
            class="flex flex-col gap-4 mx-auto my-36 w-96 bg-slate-800 p-4 rounded-lg"
        >
            <h1 class="font-mono font-bold text-3xl text-white">Theme Tools</h1>
            <ul class="flex flex-col gap-4">
                {#each styles as style}
                    <li class="flex justify-between items-center text-white">
                        <span>{style.name}</span>
                        <input
                            type="color"
                            name="bg-main"
                            value={style.raw}
                            on:input={(e) =>
                                setColor(style.name, e.target?.value)}
                        />
                    </li>
                {/each}
            </ul>

            <button
                class="p-2 mt-auto bg-slate-950 text-white/60 font-mono font-bold active:text-white hover:text-white/80"
                on:click={copy}>Copy to Clipboard</button
            >
        </div>
    </div>
{/if}
