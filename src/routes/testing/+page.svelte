<script>
	import { deleteIncome } from '../stores/moneyStore';
	import { money } from '../stores/moneyStore';
	import { date } from '../stores/dateStore';
	import ChangeMonth from '$lib/components/changeMonth.svelte';
</script>

<div class="w-4/5 h-full ml-auto flex flex-col pl-36 pr-36 pb-36 pt-28">
	<h1 class="font-semibold text-4xl pb-8">🔨 Testing Page</h1>
	<div>
		<ChangeMonth data={$date} />
	</div>

	{#each $money as income}
		<div class="border rounded-lg flex space-x-4 justify-between">
			<p>{income.money_id}</p>
			<p>{income.income}</p>
			<button class="border rounded-lg bg-red-500" on:click={deleteIncome(income.money_id)}
				>Delete</button
			>
		</div>
	{/each}
</div>
