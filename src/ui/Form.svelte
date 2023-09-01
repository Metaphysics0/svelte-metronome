<script lang="ts">
	import { buttonColorMapping } from '$lib/constants/buttonColorMapping';
	import { MAX_TEMPO_VALUE, MIN_TEMPO_VALUE, currentTempoStore } from '../stores/currentTempoStore';
	import Title from './Title.svelte';
	import IncreaseOrDecreaseTempoButton from './buttons/IncreaseOrDecreaseTempoButton.svelte';
	import PlayButton from './buttons/PlayButton.svelte';

	let currentTempo = 100;

	currentTempoStore.subscribe((v) => {
		currentTempo = v;
	});

	function handleTempoChange(e: any): void {
		const value = Number(e.target.value);
		if (value >= MIN_TEMPO_VALUE && value <= MAX_TEMPO_VALUE) {
			currentTempoStore.set(value);
		}
	}
</script>

<section class="mx-auto mt-10 font-sans border rounded-md border-slate-300 py-3">
	<Title />
	<div class="flex flex-col px-4 pb-3">
		<div class="flex justify-between mb-5">
			<p>
				<strong class="text-4xl">{currentTempo}</strong>
				<span>BPM</span>
			</p>
			<PlayButton />
		</div>
		<div class="flex items-center">
			<IncreaseOrDecreaseTempoButton direction="down" />
			<input
				id="default-range"
				type="range"
				max={MAX_TEMPO_VALUE}
				min={MIN_TEMPO_VALUE}
				style={`accent-color: ${buttonColorMapping[currentTempo]}`}
				on:input={handleTempoChange}
				bind:value={currentTempo}
				class="w-full mx-2 outline-none h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
			/>
			<IncreaseOrDecreaseTempoButton direction="up" />
		</div>
	</div>
</section>

<style>
	section {
		max-width: calc(100% - 20rem);
	}
</style>
