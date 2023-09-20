import { writable } from 'svelte/store';
import { Stack } from './box';

export let newStack = writable<Stack>(new Stack());
export let stackUpdate = writable<boolean>();
