<script>
	import { deleteData } from '../routes/stores/moneyStore';
	import { money } from '../routes/stores/moneyStore';
	import { date } from '../routes/stores/dateStore.js';
	import ChangeMonth from '$lib/components/changeMonth.svelte';
	import { fade } from 'svelte/transition';
	import { fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	let groupedByDay = {};
	let month, year, actual_key;
	let total_income, total_expense, total;

	$: {
		total_income = 0;
		total_expense = 0;
		total = 0;

		month = $date.getMonth() + 1;
		year = $date.getFullYear();
		actual_key = `${month}${year}`;
		groupedByDay = {};
		for (const [key, entries] of $money) {
			if (key == actual_key) {
				for (const entry of entries) {
					const day = entry.day_id;
					groupedByDay[day] = groupedByDay[day] || [];
					groupedByDay[day].push(entry);

					total_income += entry.income || 0;
					total_expense += entry.expense || 0;
				}
			}
		}
		total = total_income - total_expense;
	}

	let money_data = false;
	let money_id;

	const editTransaction = (id) => {
		money_id = id;
		money_data = !money_data;
	};

	const deleteTransaction = (id) => {
		money_data = !money_data;
		deleteData(id);
		console.log($money);
	};
</script>

<!-- Transaction options -->
{#if money_data}
	<div class="transparent-div" transition:fade>
		<div
			class="flex flex-col justify-center align-middle w-1/4 h-1/4 border rounded-lg shadow-lg dark:border-zinc-600 bg-slate-100 dark:bg-zinc-800"
			in:fly={{
				x: 300,
				easing: backOut
			}}
			out:fly={{
				x: -300
			}}
		>
			<div>
				<h2 class="text-2xl font-semibold pb-6">EDIT TRANSACTION</h2>
			</div>
			<div class="items-center flex justify-center space-x-4">
				<button on:click={() => editTransaction()} class="close-red-button"> CLOSE </button>
				<button class="red-button" on:click={() => deleteTransaction(money_id)}> DELETE </button>
			</div>
		</div>
	</div>
{/if}

<!-- Main Div -->
<div class="transactions-div w-4/5 h-full ml-auto flex flex-col pb-36 pt-20 space-y-8">
	<!-- Change Month -->
	<div>
		<ChangeMonth data={$date} />
	</div>
	<!-- Change Month -->

	<!-- Totals -->
	<div class="flex justify-between border-b dark:border-zinc-600">
		<div class="text-left">
			<h2>Balance:</h2>
			<p class="text-3xl font-semibold">
				{total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} $
			</p>
		</div>

		<div class="text-right pt-2">
			<p class="text-blue-500">
				+ {total_income.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} $
			</p>
			<p class="text-red-500">
				- {total_expense.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} $
			</p>
		</div>
	</div>
	<!-- Totals -->

	<!-- Main div for transactions -->
	<div class="flex flex-col justify-center space-y-8 pt-8">
		<!-- Div for transactions in a day -->
		{#each Object.entries(groupedByDay) as [day, entries]}
			<div
				class="space-y-4 rounded-lg border pb-16 pr-8 pl-8 bg-slate-50 shadow-md dark:bg-zinc-800 dark:border-zinc-600"
				in:fly={{ y: 100 }}
			>
				<!-- Displaying the days -->
				<div class="flex pt-4">
					<h2 class="text-3xl font-semibold">
						{day.slice(8, 10)}
					</h2>
					<div class="pl-2">
						<p
							class="border rounded-lg bg-zinc-200 shadow-sm dark:bg-zinc-600 dark:border-zinc-600 text-sm"
						>
							{day.slice(5, 7)}/{day.slice(0, 4)}
						</p>
					</div>
				</div>
				<!-- Displaying the days -->
				<!-- Transactions -->
				{#each entries as entry}
					{#if entry.income != null}
						<button
							on:click={() => editTransaction(entry.money_id)}
							class="p-2 flex justify-between hover:bg-slate-200 transition-all duration-300 border-b dark:border-zinc-600 dark:hover:bg-zinc-600 border-slate-300 w-full"
						>
							<p class="text-blue-500 font-semibold">
								{entry.category}
							</p>
							<div class="flex space-x-2">
								<p class="text-blue-500">
									$ {entry.income.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								</p>
							</div>
						</button>
					{/if}
					{#if entry.expense != null}
						<button
							on:click={() => editTransaction(entry.money_id)}
							class="p-2 flex justify-between hover:bg-slate-200 transition-all duration-300 border-b dark:border-zinc-600 dark:hover:bg-zinc-600 border-slate-300 w-full"
						>
							<p class="text-red-500 font-semibold">{entry.category}</p>
							<div class="flex space-x-2">
								<p class="text-red-500">
									$ {entry.expense.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								</p>
							</div></button
						>
					{/if}
					<!-- Transactions -->
				{/each}
			</div>
			<!-- Div for transactions in a day -->
		{/each}

		{#if Object.keys(groupedByDay).length === 0}
			<div class="pt-40">
				<span class="material-symbols-outlined" style="font-size: 60px; color: #a1a1aa">
					database
				</span>
				<p class="text-2xl text-zinc-400">There is no data in this month</p>
			</div>
		{/if}
	</div>
	<!-- Main div for transactions -->
</div>
