import { writable } from 'svelte/store';
import type { FlexInterface } from './box';

export let boxAdjust = writable<{ currentBox: FlexInterface; count: number }>();
export let count = writable(0);
export let unit = writable('rem');

export let toggle = writable(false);
