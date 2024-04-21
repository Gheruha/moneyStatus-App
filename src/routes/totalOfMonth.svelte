<script>
	export let data;
	export let total_data;
</script>

{#each data.total_data as total_money}
	<div class="border-b flex justify-between pr-12 pl-12 dark:border-zinc-600">
		<div class="text-center">
			<p class="font-semibold">Income</p>
			<p class="text-blue-500">$ {total_money.total_income || 0}</p>
		</div>
		<div class="text-center">
			<p class="font-semibold">Expense</p>
			<p class="text-red-500">$ {total_money.total_expense || 0}</p>
		</div>
		<div class="text-center">
			<p class="font-semibold">Total</p>
			<p class="font-semibold">$ {total_money.total || 0}</p>
		</div>
	</div>
{/each}
