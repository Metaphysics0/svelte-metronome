import { buttonColorMapping } from '$lib/constants/buttonColorMapping';
import { writable } from 'svelte/store';

export const buttonColorStore = writable<string>(buttonColorMapping.default);
