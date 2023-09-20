<script lang="ts">
	export let options: string[];
	export let optionNames: string[] = options;
	export let selected = options[0];

	const uniqueID = Math.floor(Math.random() * 100);
	const slugify = (str = '') => str.toLowerCase().replace(/ /g, '-').replace(/\./g, '');
</script>

<div role="radiogroup" class="inline-flex rounded-md shadow-sm" aria-labelledby={`label-${uniqueID}`} id={`group-${uniqueID}`}>
	<div class="contents">
		<input checked class="peer" type="radio" id={slugify(options[0])} bind:group={selected} value={options[0]} />
		<label class="border rounded-l-md" for={slugify(options[0])}> {optionNames[0]} </label>
	</div>

	{#each { length: options.length - 2 } as _, i}
		<div class="contents">
			<input checked class="peer" type="radio" id={slugify(options[i + 1])} bind:group={selected} value={options[i + 1]} />
			<label class="border-t border-b border-r" for={slugify(options[i + 1])}> {optionNames[i + 1]} </label>
		</div>
	{/each}

	<div class="contents">
		<input checked class="peer" type="radio" id={slugify(options[options.length - 1])} bind:group={selected} value={options[options.length - 1]} />
		<label class="border-t border-b border-r rounded-r-md" for={slugify(options[options.length - 1])}> {optionNames[options.length - 1]} </label>
	</div>
</div>

<style lang="postcss">
	input {
		@apply sr-only;
	}
	label {
		@apply px-3 py-2 text-xs sm:text-sm font-medium text-gray-900 bg-white border-gray-200 hover:bg-gray-100 peer-checked:bg-gray-100 hover:text-blue-700 peer-checked:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-blue-400 dark:peer-checked:text-blue-400 dark:hover:bg-gray-800 dark:peer-checked:bg-gray-800;
		@apply transition-colors duration-200 ease-in-out;
	}
</style>
