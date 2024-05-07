<script>
	export let data;
	import { addIncome } from '../stores/moneyStore';
	import { deleteIncome } from '../stores/moneyStore';
	import { incomes } from '../stores/moneyStore';
	import { loadIncomes } from '../stores/moneyStore';
	let income = 0;

	function handleSubmit() {
		addIncome(income);
		income = 0;
		loadIncomes();
	}
</script>

<div class="w-4/5 h-full ml-auto flex flex-col pl-36 pr-36 pb-36 pt-36">
	<p>Testing</p>

	{#each data.money as money_data}
		<div class="pt-10">
			<div class="border">
				<p>Income:</p>
				<p>{money_data.income}</p>
			</div>
		</div>
	{/each}

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
