import { writable } from 'svelte/store';

export const isPlayingStore = writable<boolean>(false);
