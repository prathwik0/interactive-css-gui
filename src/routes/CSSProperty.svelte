<script lang="ts">
	export let title: string;
	export let options: string[];
	export let selected: string = options[0];
</script>

<select bind:value={selected} class="inline-block max p-2 text-xs sm:text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
	{#each options as option}
		<option value={option}>
			{title + ': ' + option}
		</option>
	{/each}
</select>

<!-- <label class="flex flex-col w-min">
	 <p class="text-xs sm:text-sm">{title}</p> 
</label> -->

<style lang="postcss">
	select {
		@apply transition-colors duration-200 ease-in-out;
	}
</style>
