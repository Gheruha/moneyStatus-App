<script>
	export let data;
	import { addIncome } from '../stores/moneyStore';
	import { deleteIncome } from '../stores/moneyStore';
	import { incomes } from '../stores/moneyStore';
	import { user } from '../stores/authStore';
	import Auth from '$lib/components/Auth.svelte';
	let income = 0;
	let day_id, category;
	function handleSubmit() {
		addIncome(income, day_id, category, $user.id);
		income = 0;
	}
</script>

<div class="w-4/5 h-full ml-auto flex flex-col pl-36 pr-36 pb-36 pt-36">
	<div class="pt-20">
		<form action="" on:submit|preventDefault={handleSubmit}>
			<label for="income" />
			<input type="number" name="income" bind:value={income} class="bg-zinc-700" />
			<button type="submit" class="bg-blue-500 p-2 rounded-lg">Submit</button>
		</form>
	</div>

	{#each $incomes as income}
		<div class="border rounded-lg flex space-x-4 justify-between">
			<p>{income.money_id}</p>
			<p>{income.income}</p>
			<button class="border rounded-lg bg-red-500" on:click={deleteIncome(income.money_id)}
				>Delete</button
			>
		</div>
	{/each}
</div>
