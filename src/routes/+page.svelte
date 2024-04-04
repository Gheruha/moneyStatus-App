<script>
	export let data;
	export let total_data;

	async function addDate(date) {
		const data = JSON.stringify(date);
		await fetch('api/setMonth', {
			method: 'POST',
			body: data,
			headers: {
				'content-type': 'application/json'
			}
		});
	}
	let date = '2024-05-20';
</script>

<button on:click={() => addDate(date)}>Click</button>
{#each data.total_data as total_money}
	<div class="border-b flex justify-between pr-12 pl-12">
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
<div class="flex flex-col justify-center space-y-8 pt-24 pr-20 pl-20">
	{#each data.data as [day, entries]}
		<div class="space-y-4 rounded-lg border pb-16 pr-8 pl-8 bg-slate-50 shadow-lg">
			<h2 class="text-2xl pt-4 font-semibold">{day}</h2>
			{#each entries as entry}
				{#if entry.income != null}
					<div
						class="p-4 flex justify-between hover:scale-105 transition-all duration-300 border-b border-slate-300"
					>
						<p class="text-blue-500 font-semibold">{entry.category}</p>

						<p class="text-blue-500">$ {entry.income}</p>
					</div>
				{/if}
				{#if entry.expense != null}
					<div
						class="p-4 flex justify-between hover:scale-105 transition-all duration-300 border-b border-slate-300"
					>
						<p class="text-red-500 font-semibold">{entry.category}</p>

						<p class="text-red-500">$ {entry.expense}</p>
					</div>
				{/if}
			{/each}
		</div>
	{/each}
</div>
