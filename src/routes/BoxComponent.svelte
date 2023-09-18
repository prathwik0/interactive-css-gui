<script lang="ts">
	import Box from './BoxComponent.svelte';
	import type { FlexStackInterface } from './box';
	import { stackUpdate } from './store';

	export let stack: FlexStackInterface;
	export let adjusting: FlexStackInterface;

	// whenever the value of the stackUpdate store changes, we refresh the currentBox to check for any changes
	$: $stackUpdate, (stack.currentBox = stack.currentBox);
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:keydown={() => {
		console.log('keydown');
	}}
	on:click|preventDefault|stopPropagation={() => {
		adjusting = stack;
	}}
	class="containerbox"
	style="display: {stack.currentBox.display}; 
            flex-direction: {stack.currentBox['flex-direction']};
            flex-wrap: {stack.currentBox['flex-wrap']};
            justify-content: {stack.currentBox['justify-content']};
            align-items: {stack.currentBox['align-items']};
            align-content:  {stack.currentBox['align-content']};
            width: {stack.currentBox.width.value + stack.currentBox.width.unit};
            height: {stack.currentBox.height.value + stack.currentBox.height.unit};
            border-width: {stack.currentBox.border.value + stack.currentBox.border.unit};
            margin: {stack.currentBox.margin.value + stack.currentBox.margin.unit};
            padding: {stack.currentBox.padding.value + stack.currentBox.padding.unit}"
>
	{#each stack.children as child}
		<Box stack={child} bind:adjusting />
	{/each}
</div>

<style lang="postcss">
	.containerbox {
		@apply border-2 border-black dark:border-white bg-black dark:bg-white bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-20 dark:hover:bg-opacity-20;
	}
</style>
