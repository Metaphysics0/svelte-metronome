<script lang="ts">
	import { audioSrcMap, audioSrcPrefix } from '$lib/constants/audioSrcMap';
	import { buttonColorMapping } from '$lib/constants/buttonColorMapping';
	import { currentTempoStore } from '../../stores/currentTempoStore';
	import { isPlayingStore } from '../../stores/isPlayingStore';
	import Icon from '@iconify/svelte';

	let currentColor: string = buttonColorMapping.default;
	let currentTempo: number;
	currentTempoStore.subscribe((v) => {
		currentTempo = v;
		// @ts-ignore
		currentColor = buttonColorMapping[v];
	});

	let isPlaying = false;
	isPlayingStore.subscribe((val) => {
		isPlaying = val;
	});

	function setIsPlaying(e: any): void {
		isPlaying ? pauseAudio() : playAudio();

		isPlayingStore.set(!isPlaying);
	}

	function playAudio() {
		// @ts-ignore
		console.log('need to implement play');
	}

	function pauseAudio() {
		console.log('need to implement pause');
	}
</script>

<button on:click={setIsPlaying}>
	{#if isPlaying}
		<Icon width="45" color={currentColor} icon="mdi:pause-circle" />
	{:else}
		<Icon width="45" color={currentColor} icon="mdi:play-circle" />
	{/if}
</button>
