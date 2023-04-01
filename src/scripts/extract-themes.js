import css from '../styles/themes.css?raw'

export default function extractThemes() {
    const pattern = /\[data-theme="(.*?)"\]/g;
    const rawCss = css;
    const matches = rawCss.matchAll(pattern)

    const themes = []

    for (const match of matches) {
        const dataThemeValue = match[1];
        themes.push(dataThemeValue)
    }

    return themes;
}