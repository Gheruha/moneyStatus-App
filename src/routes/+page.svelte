<script>
	import { deleteData } from '../routes/stores/moneyStore';
	import { filteredMoney } from '../routes/stores/moneyStore';
	import { date } from '../routes/stores/dateStore.js';
	import ChangeMonth from '$lib/components/changeMonth.svelte';
	import { fade } from 'svelte/transition';
	import { slide } from 'svelte/transition';
	import { fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	let groupedByDay = {};

	$: {
		groupedByDay = {}; // Reset on each update
		$filteredMoney.forEach((entry) => {
			const day = entry.day_id;
			groupedByDay[day] = groupedByDay[day] || [];
			groupedByDay[day].push(entry);
		});
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
	};
</script>

<!-- Transaction options -->
{#if money_data}
	<div
		class="flex fixed w-full h-full justify-center items-center"
		style="background-color: rgba(0,0,0,0.5);"
		transition:fade
	>
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
				<button
					on:click={() => editTransaction()}
					class="w-1/5 border rounded-lg border-red-500 text-red-600 hover:text-red-600 hover:bg-red-300 transition-all hover:scale-110 duration-300"
				>
					CLOSE
				</button>
				<button
					class="w-1/5 border rounded-lg border-red-500 bg-red-500 text-white hover:bg-red-400 transition-all hover:scale-110 duration-300"
					on:click={() => deleteTransaction(money_id)}
				>
					DELETE
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- Main Div -->
<div class="w-4/5 h-full ml-auto flex flex-col pl-36 pr-36 pb-36 pt-28 space-y-8">
	<!-- Change Month -->
	<div>
		<ChangeMonth data={$date} />
	</div>
	<!-- Change Month -->

	<!-- Main div for transactions -->
	<div class="flex flex-col justify-center space-y-8 pr-20 pl-20 pt-8">
		<!-- Div for transactions in a day -->
		{#each Object.entries(groupedByDay) as [day, entries]}
			<div
				class="space-y-4 rounded-lg border pb-16 pr-8 pl-8 bg-slate-50 shadow-lg dark:bg-zinc-800 dark:border-zinc-600"
				in:fly={{ y: 50 }}
				out:slide
			>
				<h2 class="text-2xl pt-4 font-semibold">{day}</h2>
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
								<p class="text-blue-500">$ {entry.income}</p>
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
								<p class="text-red-500">$ {entry.expense}</p>
							</div></button
						>
					{/if}
					<!-- Transactions -->
				{/each}
			</div>
			<!-- Div for transactions in a day -->
		{/each}
	</div>
	<!-- Main div for transactions -->
</div>
