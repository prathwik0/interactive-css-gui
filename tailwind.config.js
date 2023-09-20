/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class', // or 'media' or 'false'
	theme: {
		extend: {
			colors: {
				primaryLight: '#f9fafb',
				primaryDark: '#101623',
			},
		},
	},
	plugins: [],
};
