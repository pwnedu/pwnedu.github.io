/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: 'hsl(var(--primary-color) / <alpha-value> )',
				secondary: 'hsl(var(--secondary-color) / <alpha-value> )',
				accent: 'hsl(var(--accent-color) / <alpha-value> )',
				'accent-invert': 'hsl(var(--accent-invert) / <alpha-value> )'
			},
			boxShadow: {
				'solid-1': '0 0 0 1pt black',
				'solid-2': '0 0 0 2pt black',

			},
			backgroundColor: {
				main: 'hsl(var(--bg-color) / <alpha-value> )',

			}
		},
	},
	plugins: [],
}
