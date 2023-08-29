<script lang="ts">
	import Icon from '@iconify/svelte';
	import { currentTempoStore } from '../../stores/currentTempoStore';
	import { buttonColorMapping } from '$lib/constants/buttonColorMapping';

	let currentColor: string = buttonColorMapping.default;
	currentTempoStore.subscribe((v) => {
		// @ts-ignore
		currentColor = buttonColorMapping[v];
	});

	function decreaseTempoByOne(): void {
		currentTempoStore.update((v) => v - 1);
	}
</script>

<button on:click={decreaseTempoByOne}>
	<Icon width="25" color={currentColor} icon="ic:outline-minus" />
</button>
