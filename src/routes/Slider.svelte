<script lang="ts">
	export let value: number = 10;
	export let step: number = 1;
	export let min: number = 0;
	export let max: number = 100;
</script>

<input name="value" type="number" bind:value {min} {max} {step} class="inline-block p-2 max-w-md text-xs sm:text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
<input name="slider" type="range" bind:value {min} {max} {step} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

<style lang="postcss">
	input {
		@apply transition-colors duration-200 ease-in-out;
	}
</style>
