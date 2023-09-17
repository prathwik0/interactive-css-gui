/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class', // or 'media' or 'false'
	theme: {
		extend: {
			colors: {
				primaryLight: '#fffbeb',
				primaryDark: '#121928',
			},
		},
	},
	plugins: [],
};
