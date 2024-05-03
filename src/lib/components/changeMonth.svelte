<script>
	import { increaseMonth } from '$lib/components/globalFunctions.js';
	import { decreaseMonth } from '$lib/components/globalFunctions.js';
	export let data;
	let l = '<';
	let r = '>';
	let date = new Date(data.the_date);
	let monthName = new Date(date).toLocaleString('default', {
		month: 'long',
		year: 'numeric'
	});
</script>

<div class="flex justify-between p-4 dark:border-zinc-600">
	<button
		class="p-2 w-10 rounded-full bg-blue-500 transition-all hover:bg-blue-400 hover:scale-110 duration-300 text-white"
		on:click={() => decreaseMonth(date)}>{l}</button
	>
	<h1 class="text-2xl">
		{monthName}
	</h1>
	<button
		class="p-2 w-10 rounded-full bg-blue-500 transition-all hover:bg-blue-400 hover:scale-110 duration-300 text-white"
		on:click={() => increaseMonth(date)}>{r}</button
	>
</div>
