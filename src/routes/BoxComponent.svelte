<script lang="ts">
	import Box from './BoxComponent.svelte';
	import { boxAdjust, toggle } from './store';

	import { smallStack, type FlexInterface, type FlexStackInterface } from './box';

	export let selected: boolean = false;
	export let stack: FlexStackInterface;
	export let box: FlexInterface;
	export let count: number;

	// whenever the value of the boxAdjust store changes, we refresh the currentBox to check for any changes
	$: $boxAdjust, (stack.currentBox = stack.currentBox);

	$: {
		$toggle, (selected = false);
	}

	/*
	 * Adjust the number of children
	 */
	$: {
		if (selected === true) {
			while (stack.children.length < $boxAdjust.count) {
				if (stack.children.length === 0) {
					stack.children = [...stack.children, structuredClone(smallStack)];
					console.log('run');
				} else {
					stack.children = [...stack.children, structuredClone(stack.children[stack.children.length - 1])];
					console.log('run2');
				}
			}
			while (stack.children.length > $boxAdjust.count) {
				stack.children.pop();
				stack = stack;
			}
		}
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:keydown={() => {
		console.log('keydown');
	}}
	on:click|preventDefault|stopPropagation={() => {
		// toggle to inform other boxes to unselect
		$toggle = !$toggle;

		setTimeout(() => {
			// set count to the correct value! You don't want extra children
			boxAdjust.set({ currentBox: stack.currentBox, count: stack.children.length });
			console.log('$count updated to no. of children -  ' + $boxAdjust.count);

			// update the box and count
			box = stack.currentBox;
			count = stack.children.length;

			selected = true;
		}, 0);
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
		<Box stack={child} bind:box bind:count />
	{/each}
</div>

<style lang="postcss">
	.containerbox {
		@apply border-2 border-black dark:border-white bg-black dark:bg-white bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-20 dark:hover:bg-opacity-20;
	}
</style>
