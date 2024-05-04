<script>
	import { increaseMonth } from '$lib/components/globalFunctions.js';
	import { decreaseMonth } from '$lib/components/globalFunctions.js';
	export let data;

	let date = new Date(data.the_date);
	let monthName = new Date(date).toLocaleString('default', {
		month: 'long',
		year: 'numeric'
	});
</script>

<div class="flex justify-between p-4 dark:border-zinc-600">
	<button
		class="rounded-full transition-all hover:scale-125 duration-300"
		on:click={() => decreaseMonth(date)}
		><span class="material-symbols-outlined"> arrow_back_ios </span></button
	>
	<h1 class="text-2xl">
		{monthName}
	</h1>
	<button
		class="rounded-full transition-all hover:scale-125 duration-300"
		on:click={() => increaseMonth(date)}
	>
		<span class="material-symbols-outlined"> arrow_forward_ios </span>
	</button>
</div>
