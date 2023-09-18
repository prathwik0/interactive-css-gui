import { writable } from 'svelte/store';

export let stackUpdate = writable<boolean>();
export let unit = writable('rem');
