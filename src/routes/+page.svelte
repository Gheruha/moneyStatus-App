<script>
	import { onMount } from 'svelte';

	// export let data;
	let result, totalOfMonth, moneyDayInfo, today;

	async function getMoneyDayInfo(day) {
		const response = await fetch('/api/getDayInfo', {
			method: 'POST',
			body: JSON.stringify({ day }),
			headers: {
				'content-type': 'application/json'
			}
		});

		result = await response.json();
		moneyDayInfo = result;
		getMonthTotalInfo(day);
	}

	async function getMonthTotalInfo(day) {
		const response = await fetch('/api/getTotalOfMonth', {
			method: 'POST',
			body: JSON.stringify({ day }),
			headers: {
				'content-type': 'application/json'
			}
		});

		result = await response.json();
		totalOfMonth = result;
	}

	onMount(() => {
		updateDate();
		const intervalId = setInterval(updateDate, 1000); // Update every second

		// Optionally, clear the interval on component unmount
		return () => clearInterval(intervalId);
	});

	function updateDate() {
		const date = new Date();
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Adjusted for correct month (0-indexed)
		const year = String(date.getFullYear());

		today = `${year}-${month}-${day}`;
	}
</script>

<div class="w-full h-full">
	<h1 class="text-3xl">Daily</h1>
	<button on:click={() => getMoneyDayInfo(today)}>Click to run the getMoneyDayInfo function</button>

	{#if totalOfMonth}
		{#each result as result}
			<div class="border-b flex justify-between pr-12 pl-12">
				<div class="text-center">
					<p class="font-semibold">Income</p>
					<p class="text-blue-500">$ {result.total_income}</p>
				</div>
				<div class="text-center">
					<p class="font-semibold">Expense</p>
					<p class="text-red-500">$ {result.total}</p>
				</div>
				<div class="text-center">
					<p class="font-semibold">Total</p>
					<p class="font-semibold">$ {result.total_income}</p>
				</div>
			</div>
		{/each}
	{/if}
	{#if moneyDayInfo}
		<div class="pt-24 pl-20 pr-20 space-y-16">
			{#each moneyDayInfo as groupedData}
				{#if groupedData.day_id != null}
					<div class="space-y-4 rounded-lg pb-16 pr-8 pl-8 bg-slate-50 shadow-lg">
						<h2 class="text-2xl pt-4 font-semibold">{groupedData.day_id}</h2>
						{#each groupedData.data as entry}
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
				{/if}
			{/each}
		</div>
	{/if}
</div>
