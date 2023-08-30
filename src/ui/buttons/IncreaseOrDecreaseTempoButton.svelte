<script lang="ts">
	import Icon from '@iconify/svelte';
	import { currentTempoStore } from '../../stores/currentTempoStore';
	import { buttonColorMapping } from '$lib/constants/buttonColorMapping';

	export let direction: IAlterTempoDirection;

	type IAlterTempoDirection = 'up' | 'down';

	const iconMap: Record<IAlterTempoDirection, string> = {
		up: 'ic:outline-plus',
		down: 'ic:outline-minus'
	};

	let currentColor: string = buttonColorMapping.default;
	currentTempoStore.subscribe((v) => {
		// @ts-ignore
		currentColor = buttonColorMapping[v];
	});

	function alterTempo(): void {
		direction === 'up'
			? currentTempoStore.update((v) => v + 1)
			: currentTempoStore.update((v) => v - 1);
	}
</script>

<button on:click={alterTempo}>
	<Icon width="25" color={currentColor} icon={iconMap[direction]} />
</button>
