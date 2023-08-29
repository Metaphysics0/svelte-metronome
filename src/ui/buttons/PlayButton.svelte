<script lang="ts">
	import { buttonColorMapping } from '$lib/constants/buttonColorMapping';
	import { currentTempoStore } from '../../stores/currentTempoStore';
	import { isPlayingStore } from '../../stores/isPlayingStore';
	import Icon from '@iconify/svelte';

	let currentColor: string = buttonColorMapping.default;
	currentTempoStore.subscribe((v) => {
		// @ts-ignore
		currentColor = buttonColorMapping[v];
	});

	let isPlaying = false;
	isPlayingStore.subscribe((val) => {
		isPlaying = val;
	});

	function setIsPlaying(e: any): void {
		isPlayingStore.set(!isPlaying);
	}
</script>

<button on:click={setIsPlaying}>
	{#if isPlaying}
		<Icon width="45" color={currentColor} icon="mdi:pause-circle" />
	{:else}
		<Icon width="45" color={currentColor} icon="mdi:play-circle" />
	{/if}
</button>
