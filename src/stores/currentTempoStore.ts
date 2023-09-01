import { writable } from 'svelte/store';

export const currentTempoStore = writable<number>(100);

export const MAX_TEMPO_VALUE = 218;
export const MIN_TEMPO_VALUE = 40;
