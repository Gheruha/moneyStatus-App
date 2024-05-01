<script>
	import { goToActualMonth } from '$lib/components/globalFunctions.js';
	import { onMount } from 'svelte';

	let today = '';

	onMount(() => {
		updateDate();
		const intervalId = setInterval(updateDate, 320000); // update every 5 minutes

		// Optionally, clear the interval on component unmount
		return () => clearInterval(intervalId);
	});

	function updateDate() {
		const date = new Date();
		today = date;
	}
</script>

<div class="fixed bottom-52 right-10">
	<button
		on:click={() => goToActualMonth(today)}
		class="p-2 border rounded-full text-2xl w-16 h-16 text-center bg-violet-500 border-violet-500 text-white transition-all hover:scale-110 hover:bg-violet-400 duration-300"
	>
		<span class="material-symbols-outlined pt-2"> calendar_clock </span>
	</button>
</div>
