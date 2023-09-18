import { writable } from 'svelte/store';
import type { FlexInterface } from './box';

export let boxAdjust = writable<FlexInterface>();
export let count = writable(0);
export let unit = writable('rem');
export let display = writable('block');

export let toggle = writable(false);
