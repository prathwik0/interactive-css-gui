<script lang="ts">
	/*
	 * Terminology
	 * Box: A single box with it's properties
	 * Stack: Recursive stack of boxes at any level
	 */

	import ThemeToggle from '$lib/components/theme/ThemeToggle.svelte';

	import CSSPropertySlider from './CSSPropertySlider.svelte';
	import CSSProperty from './CSSProperty.svelte';
	import BoxComponent from './BoxComponent.svelte';

	import { initialFlexBox, type FlexStackInterface, Options, smallStack } from './box';
	import { stackUpdate, unit } from './store';

	let stack: FlexStackInterface = { currentBox: structuredClone(initialFlexBox), count: 0, children: [] };
	let adjusting: FlexStackInterface = stack;

	$: adjusting, stackUpdate.set(!$stackUpdate);

	$: {
		if (adjusting.count > adjusting.children.length) {
			for (let i = adjusting.children.length; i < adjusting.count; i++) {
				adjusting.children.push(structuredClone(smallStack));
				adjusting = adjusting;
			}
		} else if (adjusting.count < adjusting.children.length) {
			adjusting.children.splice(adjusting.count);
			adjusting = adjusting;
		}
	}
</script>

<div class="flex justify-between">
	<div class="flex flex-grow justify-evenly p-3">
		<div class="grid grid-cols-1 sm:grid-cols-2 content-normal sm:content-center">
			<label for="child count" class="text-xs w-min max-w-fit sm:text-sm lg:text-lg">Children&nbsp;:&nbsp;</label>
			<input id="child count" type="number" bind:value={adjusting.count} min="0" max="20" class="inline-block p-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 content-normal sm:content-center">
			<label for="unit" class="text-xs w-min max-w-fit sm:text-sm lg:text-lg">Unit&nbsp;:&nbsp;</label>
			<select id="unit" bind:value={$unit} class="inline-block max-w-fit max p-2 mb-1 text-xs sm:text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
				{#each Options.unit.options as option}
					<option value={option}>
						{option}
					</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="flex justify-end w-24 mt-2 mr-2">
		<ThemeToggle />
	</div>
</div>

<div class="flex flex-wrap justify-around">
	<CSSPropertySlider property="width" bind:selectedValue={adjusting.currentBox['width']} />
	<CSSPropertySlider property="height" bind:selectedValue={adjusting.currentBox['height']} />
	<CSSPropertySlider property="border" bind:selectedValue={adjusting.currentBox['border']} />
	<CSSPropertySlider property="margin" bind:selectedValue={adjusting.currentBox['margin']} />
	<CSSPropertySlider property="padding" bind:selectedValue={adjusting.currentBox['padding']} />

	<CSSProperty property="flex-direction" bind:selectedOption={adjusting.currentBox['flex-direction']} />
	<CSSProperty property="flex-wrap" bind:selectedOption={adjusting.currentBox['flex-wrap']} />
	<CSSProperty property="justify-content" bind:selectedOption={adjusting.currentBox['justify-content']} />
	<CSSProperty property="align-items" bind:selectedOption={adjusting.currentBox['align-items']} />
	<CSSProperty property="align-content" bind:selectedOption={adjusting.currentBox['align-content']} />
</div>

<hr class="m-2" />

<div class="flex justify-center">
	<BoxComponent {stack} bind:adjusting />
</div>
