<script lang="ts">
	import Icon from '@iconify/svelte';
	import {
		MAX_TEMPO_VALUE,
		MIN_TEMPO_VALUE,
		currentTempoStore
	} from '../../stores/currentTempoStore';
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
			? currentTempoStore.update((v) => {
					if (v === MAX_TEMPO_VALUE) return v;

					return v + 1;
			  })
			: currentTempoStore.update((v) => {
					if (v === MIN_TEMPO_VALUE) return v;
					return v - 1;
			  });
	}
</script>

<button on:click={alterTempo}>
	<Icon width="25" color={currentColor} icon={iconMap[direction]} />
</button>
