<script lang="ts">
	/*
	 * Terminology
	 * Box: A single box with it's properties
	 * Stack: Recursive stack of boxes at any level
	 */

	import ThemeToggle from '$lib/components/theme/ThemeToggle.svelte';
	import RadioButtonGroup from '$lib/components/radioButton/ButtonGroup.svelte';
	import Slider from './Slider.svelte';

	import ButtonGroup from '$lib/components/button/ButtonGroup.svelte';
	import LeftButton from '$lib/components/button/LeftButton.svelte';
	import RightButton from '$lib/components/button/RightButton.svelte';

	import CSSProperty from './CSSProperty.svelte';
	import BoxComponent from './BoxComponent.svelte';

	import { Stack, options } from './box';
	import { newStack, stackUpdate } from './store';

	let stack: Stack = new Stack();
	let adjusting: Stack = stack;

	/*
	 * This reactive statement toggle $stackUpdate store whenever any value in the stack is updated
	 */
	$: adjusting, stackUpdate.set(!$stackUpdate);

	/*
	 * This reactive statement updates the number of children
	 */
	$: {
		if (adjusting.count > adjusting.children.length) {
			for (let i = adjusting.children.length; i < adjusting.count; i++) {
				adjusting.children.push(structuredClone($newStack));
				adjusting = adjusting;
			}
		} else if (adjusting.count < adjusting.children.length) {
			adjusting.children.splice(adjusting.count);
			adjusting = adjusting;
		}
	}

	/* --------------------------------- */

	let boxModelSelected: 'width' | 'height' | 'padding' | 'border' | 'margin' = 'width';

	/**
	 * names is an array of display names for the boxModel options
	 */
	let names: string[];

	/*
	 * This reactive statement dynamically updates names (display names for the boxModel options) (non essential)
	 */
	$: adjusting, (names = ['width: ' + (adjusting.currentBox.boxModel.width.selected === 'numeric' ? adjusting.currentBox.boxModel.width.numeric.num + adjusting.currentBox.boxModel.width.numeric.unit : adjusting.currentBox.boxModel.width.string), 'height: ' + (adjusting.currentBox.boxModel.height.selected === 'numeric' ? adjusting.currentBox.boxModel.height.numeric.num + adjusting.currentBox.boxModel.height.numeric.unit : adjusting.currentBox.boxModel.height.string), 'padding: ' + (adjusting.currentBox.boxModel.padding.selected === 'numeric' ? adjusting.currentBox.boxModel.padding.numeric.num + adjusting.currentBox.boxModel.padding.numeric.unit : adjusting.currentBox.boxModel.padding.string), 'border: ' + (adjusting.currentBox.boxModel.border.selected === 'numeric' ? adjusting.currentBox.boxModel.border.numeric.num + adjusting.currentBox.boxModel.border.numeric.unit : adjusting.currentBox.boxModel.border.string), 'margin: ' + (adjusting.currentBox.boxModel.margin.selected === 'numeric' ? adjusting.currentBox.boxModel.margin.numeric.num + adjusting.currentBox.boxModel.margin.numeric.unit : adjusting.currentBox.boxModel.margin.string)]);
</script>

<div class="flex flex-col overflow-hidden h-screen">
	<div class="block w-full">
		<div class="flex flex-row justify-between mb-2">
			<div class="flex flex-wrap flex-grow mt-2">
				<div class="grid grid-cols-1 sm:grid-cols-2 content-normal sm:content-center">
					<label for="child count" class="text-xs w-min max-w-fit sm:text-sm lg:text-lg">Children&nbsp;:&nbsp;</label>
					<input id="child count" type="number" bind:value={adjusting.count} min="0" max="20" class="inline-block p-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors duration-200 ease-in-out" />
				</div>

				<div class="flex items-center lg:w-1/2 md:px-12">
					<Slider bind:value={adjusting.currentBox.boxModel[boxModelSelected].numeric.num} min={options.boxModel[boxModelSelected].numeric[adjusting.currentBox.boxModel[boxModelSelected].numeric.unit].range[0]} max={options.boxModel[boxModelSelected].numeric[adjusting.currentBox.boxModel[boxModelSelected].numeric.unit].range[1]} step={options.boxModel[boxModelSelected].numeric[adjusting.currentBox.boxModel[boxModelSelected].numeric.unit].step} />
				</div>

				<ButtonGroup>
					<LeftButton
						><button
							on:click|preventDefault={() => {
								newStack.set(structuredClone(adjusting));
							}}
						>
							Copy Selected Box
						</button></LeftButton
					>
					<RightButton>
						<button
							on:click|preventDefault={() => {
								newStack.set(new Stack());
							}}
						>
							Default Box
						</button>
					</RightButton>
				</ButtonGroup>
			</div>

			<div class="flex justify-end w-24 mt-2 mr-2">
				<ThemeToggle />
			</div>
		</div>

		<div class="flex flex-wrap gap-2">
			<RadioButtonGroup options={options.boxModel.options} optionNames={names} bind:selected={boxModelSelected} />
			<RadioButtonGroup options={options.boxModel[boxModelSelected].numeric.options} bind:selected={adjusting.currentBox.boxModel[boxModelSelected].numeric.unit} />
			<RadioButtonGroup options={['string', 'numeric']} bind:selected={adjusting.currentBox.boxModel[boxModelSelected].selected} />
			<RadioButtonGroup options={['auto', 'max-content', 'min-content']} bind:selected={adjusting.currentBox.boxModel[boxModelSelected].string} />
			<RadioButtonGroup options={options.display.options} bind:selected={adjusting.currentBox.display} />
		</div>

		<div class="flex flex-wrap my-2 w-full">
			{#if adjusting.currentBox.display === 'flex'}
				{#each options.flex.options as property}
					<div class="flex w-1/3 sm:w-36 md:w-48 p-1">
						<CSSProperty title={property} options={options.flex[property].options} bind:selected={adjusting.currentBox.flex[property]} />
					</div>
				{/each}
			{/if}
		</div>

		<hr class="mx-2 mb-2" />
	</div>
	<div class="flex-auto w-full overflow-scroll hideScrollbar">
		<BoxComponent {stack} bind:adjusting />
	</div>
</div>

<style>
	/* Hide scrollbar for Chrome, Safari and Opera */
	.hideScrollbar::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.hideScrollbar {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
