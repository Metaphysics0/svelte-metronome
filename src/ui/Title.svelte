<script>
	import Icon from '@iconify/svelte';
</script>

<div class="flex justify-between mb-7 border-b border-slate-200 px-3 pb-2.9">
	<h3 class="text-xl">Metronome</h3>
	<button on:click={() => alert('you are the best')}>
		<Icon color="#70757a" width="20" icon="material-symbols:share" />
	</button>
</div>
