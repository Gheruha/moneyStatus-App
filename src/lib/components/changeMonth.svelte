<script>
	import { increaseMonth } from '../../routes/stores/dateStore';
	import { decreaseMonth } from '../../routes/stores/dateStore';
	import { date } from '../../routes/stores/dateStore';
</script>

<div class="flex justify-between p-4 dark:border-zinc-600">
	<button
		class="rounded-full transition-all hover:scale-125 duration-300"
		on:click={() => decreaseMonth($date)}
		><span class="material-symbols-outlined"> arrow_back_ios </span></button
	>
	<h1 class="text-2xl">
		{$date.toLocaleString('default', {
			month: 'long',
			year: 'numeric'
		})}
	</h1>
	<button
		class="rounded-full transition-all hover:scale-125 duration-300"
		on:click={() => increaseMonth($date)}
	>
		<span class="material-symbols-outlined"> arrow_forward_ios </span>
	</button>
</div>
