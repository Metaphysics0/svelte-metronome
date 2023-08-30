<script>
	import Icon from '@iconify/svelte';
</script>

<div class="flex justify-between mb-7 border-b border-slate-200 px-4 pb-3">
	<h3 class="text-xl">Metronome</h3>
	<button on:click={() => alert('you are the best')}>
		<Icon color="#70757a" width="25" icon="material-symbols:share" />
	</button>
</div>
