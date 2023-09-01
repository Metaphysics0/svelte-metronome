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
			tickInterval = connectAndStart();
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
		playSound(new AudioContext());
		tickInterval = connectAndStart();
	};

	let ticked = 0;
	function connectAndStart() {
		clearInterval(tickInterval);
		if (!browser) return;
		const audioContext = new AudioContext();
		const intervalMs = (60 / currentTempo) * 1000;
		return setInterval(() => {
			playSound(audioContext);
			ticked++;
		}, intervalMs);
	}

	function playSound(audioContext: AudioContext): void {
		const source = audioContext.createBufferSource();
		source.buffer = audioBuffer;
		source.connect(audioContext.destination);
		source.start(0);
	}

	const stopMetronome = () => {
		clearInterval(tickInterval);
	};
</script>

<button
	on:click={setIsPlaying}
	class="relative outline-none rounded-full p-2"
	style={`background-color: ${currentColor}`}
>
	<span
		class="animate-ping duration-75 absolute left-[8px] top-[8px] inline-flex h-2/3 w-2/3 rounded-full opacity-100"
		style={`background-color: ${currentColor}`}
	/>
	<div class="relative">
		{#if isPlaying}
			<!-- <Icon width="50" color={currentColor} icon="mdi:pause-circle" /> -->
			<Icon width="40" color="#fff" icon="mdi:pause" />
		{:else}
			<!-- <Icon width="50" color={currentColor} style="color-red" icon="mdi:play-circle" /> -->
			<Icon width="40" color="#fff" style="color-red" icon="mdi:play" />
		{/if}
	</div>
</button>
<audio src={Tick} bind:this={audio} />
