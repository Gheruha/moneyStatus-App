<script>
	// imports
	import { formatDay } from '$lib/components/formattingDay.js';

	// Data from server
	export let data;
	export let the_date;

	// local data
	let l = '<';
	let r = '>';
	let date = new Date(data.the_date);
	let monthName = new Date(data.the_date).toLocaleString('default', {
		month: 'long',
		year: 'numeric'
	});

	// Add date in the database
	async function addDate(date) {
		const data = JSON.stringify(date);
		await fetch('api/setMonth', {
			method: 'POST',
			body: data,
			headers: {
				'content-type': 'application/json'
			}
		});
		location.reload();
	}

	// Increasing the month
	function increaseMonth(date) {
		const dateObj = new Date(date);

		dateObj.setMonth(dateObj.getMonth() + 1);
		date = formatDay(dateObj);
		addDate(date);
	}

	// Decreasing the month
	function decreaseMonth(date) {
		const dateObj = new Date(date);
		dateObj.setMonth(dateObj.getMonth() - 1);
		date = formatDay(dateObj);
		addDate(date);
	}
</script>

<div class="w-4/5 h-full ml-auto flex flex-col pr-36 pl-36 pb-36 pt-16">
	<div>
		<h1 class="text-4xl font-semibold">Statistics Page 📊</h1>
	</div>

	<div class="pt-36 pr-20 pl-20">
		<div
			class="p-6 border space-y-4 bg-slate-50 rounded-lg shadow-lg dark:bg-zinc-800 dark:border-zinc-600"
		>
			<div class="flex justify-between p-4 border-b dark:border-zinc-600">
				<button
					class="p-2 w-10 rounded-full bg-blue-500 transition-all hover:bg-blue-400 hover:scale-110 duration-300 text-white"
					on:click={() => decreaseMonth(date)}>{l}</button
				>
				<h1 class="text-2xl">
					{monthName}
				</h1>
				<button
					class="p-2 w-10 rounded-full bg-blue-500 transition-all hover:bg-blue-400 hover:scale-110 duration-300 text-white"
					on:click={() => increaseMonth(date)}>{r}</button
				>
			</div>
			{#each data.data as percentages}
				<p class="text-blue-500">
					Income %: {percentages.income_percent !== null
						? percentages.income_percent.toFixed(2)
						: 'N/A'}
				</p>
				<div
					class="bg-blue-300 rounded-lg"
					style="width: {percentages.income_percent !== null
						? percentages.income_percent + '%'
						: '0%'}"
				>
					&nbsp;
				</div>
				<p class="text-red-500">
					Expense %: {percentages.expense_percent !== null
						? percentages.expense_percent.toFixed(2)
						: 'N/A'}
				</p>
				<div
					class="bg-red-300 rounded-lg"
					style="width: {percentages.expense_percent !== null
						? percentages.expense_percent + '%'
						: '0%'}"
				>
					&nbsp;
				</div>
			{/each}
		</div>
	</div>
</div>
