import { writable } from 'svelte/store';

export const currentTempoStore = writable<number>(100);
