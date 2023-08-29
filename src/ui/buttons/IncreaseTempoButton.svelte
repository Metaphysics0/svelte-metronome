<script lang="ts">
	import Icon from '@iconify/svelte';
	import { currentTempoStore } from '../../stores/currentTempoStore';
	import { buttonColorMapping } from '$lib/constants/buttonColorMapping';

	let currentColor: string = buttonColorMapping.default;
	currentTempoStore.subscribe((v) => {
		// @ts-ignore
		currentColor = buttonColorMapping[v];
	});

	function increaseTempoByOne(): void {
		currentTempoStore.update((v) => v + 1);
	}
</script>

<button on:click={increaseTempoByOne}>
	<Icon width="25" color={currentColor} icon="ic:outline-plus" />
</button>
