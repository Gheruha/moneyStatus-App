<script>
	import { onMount } from 'svelte';
	import { date } from '../../routes/stores/dateStore';
	export let showActualMonth;

	let today = '';

	const goToActualMonth = (today) => {
		date.set(today);
	};

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
		class="p-2 border rounded-full text-2xl w-16 h-16 text-center text-white transition-all hover:scale-110 duration-300 {showActualMonth ==
		false
			? 'cursor-not-allowed bg-slate-100 border-slate-200 hover:bg-slate-200 text-black dark:bg-zinc-600 dark:border-zinc-700 dark:text-white'
			: 'bg-violet-500 border-violet-500 hover:bg-violet-400'}
				"
		disabled={!showActualMonth}
	>
		<span class="material-symbols-outlined pt-2"> calendar_clock </span>
	</button>
</div>
