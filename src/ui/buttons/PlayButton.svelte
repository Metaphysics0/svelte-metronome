<script lang="ts">
	import { buttonColorMapping } from '$lib/constants/buttonColorMapping';
	import { currentTempoStore } from '../../stores/currentTempoStore';
	import { isPlayingStore } from '../../stores/isPlayingStore';
	import Icon from '@iconify/svelte';

	// @ts-ignore
	import Tick from '$lib/sounds/tick.m4a';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let audio;
	let audioBuffer: AudioBuffer;
	$: currentColor = buttonColorMapping.default;

	let currentTempo: number;
	let prevTempo: number;

	currentTempoStore.subscribe((v) => {
		prevTempo = currentTempo;
		currentTempo = v;
		// @ts-ignore
		currentColor = buttonColorMapping[v];
	});

	$: {
		if (prevTempo && currentTempo !== prevTempo && isPlaying && audioBuffer) {
			tickInterval = connectAndStart(audioBuffer);
		}
	}

	let isPlaying = false;
	isPlayingStore.subscribe((val) => {
		isPlaying = val;
	});

	async function setIsPlaying(e: any) {
		if (isPlaying) {
			stopMetronome();
			isPlayingStore.set(false);
			return;
		}

		await startMetronome();
		isPlayingStore.set(true);
	}

	onMount(async () => {
		audioBuffer = await loadSound();
	});

	async function loadSound() {
		const audioContext = new AudioContext();
		const res = await fetch(Tick);
		const buffer = await res.arrayBuffer();
		return audioContext.decodeAudioData(buffer);
	}

	let tickInterval: any;
	const startMetronome = async () => {
		if (!browser) return;
		audioBuffer ||= await loadSound();

		tickInterval = connectAndStart(audioBuffer);
	};

	let ticked = 0;
	function connectAndStart(audioBuffer: AudioBuffer) {
		clearInterval(tickInterval);
		if (!browser) return;
		const audioContext = new AudioContext();
		const intervalMs = (60 / currentTempo) * 1000;
		return setInterval(() => {
			const source = audioContext.createBufferSource();
			source.buffer = audioBuffer;
			source.connect(audioContext.destination);
			source.start(0);

			ticked++;
		}, intervalMs);
	}

	const stopMetronome = () => {
		clearInterval(tickInterval);
	};
</script>

<button on:click={setIsPlaying} class="outline-none">
	{#if isPlaying}
		<Icon width="45" color={currentColor} icon="mdi:pause-circle" />
	{:else}
		<Icon width="45" color={currentColor} icon="mdi:play-circle" />
	{/if}
</button>
<audio src={Tick} bind:this={audio} />
