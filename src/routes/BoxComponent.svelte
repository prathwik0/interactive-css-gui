<script lang="ts">
	import Box from './BoxComponent.svelte';
	import type { Stack } from './box';
	import { stackUpdate } from './store';

	export let stack: Stack;
	export let adjusting: Stack;

	// whenever the value of the stackUpdate store changes, we refresh the currentBox to check for any changes
	$: $stackUpdate, (stack.currentBox = stack.currentBox);

	/** @type {import('svelte/action').Action<HTMLElement, string>}  */
	function style(node: any, box: typeof stack.currentBox) {
		node.style['display'] = box.display;
		node.style['width'] = box.boxModel.width.selected === 'numeric' ? box.boxModel.width.numeric.num + box.boxModel.width.numeric.unit : box.boxModel.width.string;
		node.style['height'] = box.boxModel.height.selected === 'numeric' ? box.boxModel.height.numeric.num + box.boxModel.height.numeric.unit : box.boxModel.height.string;
		node.style['padding'] = box.boxModel.padding.selected === 'numeric' ? box.boxModel.padding.numeric.num + box.boxModel.padding.numeric.unit : box.boxModel.padding.string;
		node.style['border-width'] = box.boxModel.border.selected === 'numeric' ? box.boxModel.border.numeric.num + box.boxModel.border.numeric.unit : box.boxModel.border.string;
		node.style['margin'] = box.boxModel.margin.selected === 'numeric' ? box.boxModel.margin.numeric.num + box.boxModel.margin.numeric.unit : box.boxModel.margin.string;

		if (box.display === 'flex') {
			node.style['flex-direction'] = box.flex['flex-direction'];
			node.style['flex-wrap'] = box.flex['flex-wrap'];
			//node.style['justify-content'] = box.flex?.['justify-content'];
			node.style['align-content'] = box.flex?.['align-content'];
			node.style['align-items'] = box.flex?.['align-items'];
		}

		return {
			update(box: typeof stack.currentBox) {
				node.style['display'] = box.display;
				node.style['width'] = box.boxModel.width.selected === 'numeric' ? box.boxModel.width.numeric.num + box.boxModel.width.numeric.unit : box.boxModel.width.string;
				node.style['height'] = box.boxModel.height.selected === 'numeric' ? box.boxModel.height.numeric.num + box.boxModel.height.numeric.unit : box.boxModel.height.string;
				node.style['padding'] = box.boxModel.padding.selected === 'numeric' ? box.boxModel.padding.numeric.num + box.boxModel.padding.numeric.unit : box.boxModel.padding.string;
				node.style['border-width'] = box.boxModel.border.selected === 'numeric' ? box.boxModel.border.numeric.num + box.boxModel.border.numeric.unit : box.boxModel.border.string;
				node.style['margin'] = box.boxModel.margin.selected === 'numeric' ? box.boxModel.margin.numeric.num + box.boxModel.margin.numeric.unit : box.boxModel.margin.string;

				if (box.display === 'flex') {
					node.style['flex-direction'] = box.flex['flex-direction'];
					node.style['flex-wrap'] = box.flex['flex-wrap'];
					node.style['justify-content'] = box.flex?.['justify-content'];
					node.style['align-content'] = box.flex?.['align-content'];
					node.style['align-items'] = box.flex?.['align-items'];
				}
			},
		};
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:keydown={() => {
		console.log('keydown');
	}}
	on:click|preventDefault|stopPropagation={() => {
		adjusting = stack;
	}}
	class="thebox"
	use:style={stack.currentBox}
>
	{#each stack.children as child}
		<Box stack={child} bind:adjusting />
	{/each}
</div>

<style lang="postcss">
	.thebox {
		@apply border-black dark:border-white bg-black dark:bg-white bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-20 dark:hover:bg-opacity-20;
	}
</style>
