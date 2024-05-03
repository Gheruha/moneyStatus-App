<script>
	// imports
	import { increaseMonth } from '$lib/components/globalFunctions.js';
	import { decreaseMonth } from '$lib/components/globalFunctions.js';

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
	let width_income = 0;
	let width_expense = 0;
	let income_percent = 0;
	let expense_percent = 0;
	let today = '';

	// functions
	function getPercent(income_perc, expense_perc) {
		income_percent = Math.floor(income_perc);
		expense_percent = Math.floor(expense_perc);
	}

	function increaseWidthIncome() {
		if (income_percent != null) {
			if (width_income != income_percent) {
				width_income++;
			} else if (width_income == income_percent) {
				clearInterval(intervalIdIncome);
			}
		}
	}
	let intervalIdIncome = setInterval(increaseWidthIncome, 5);

	function increaseWidthExpense() {
		if (expense_percent != null) {
			if (width_expense != expense_percent) {
				width_expense++;
			} else if (width_expense == expense_percent) {
				clearInterval(intervalIdExpense);
			}
		}
	}
	let intervalIdExpense = setInterval(increaseWidthExpense, 5);
</script>

<div class="w-4/5 h-full ml-auto flex flex-col pr-36 pl-36 pb-36 pt-36">

	<div class="pr-20 pl-20">
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
				<div class="h-0 opacity-0">
					{getPercent(percentages.income_percent, percentages.expense_percent)}
				</div>
				<p class="text-blue-500">
					Income %: {percentages.income_percent !== null
						? percentages.income_percent.toFixed(2)
						: 'N/A'}
				</p>
				<div
					class="bg-blue-300 rounded-lg"
					style="width: {width_income !== null ? width_income + '%' : '0%'}"
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
					style="width: {width_expense !== null ? width_expense + '%' : '0%'}"
				>
					&nbsp;
				</div>
			{/each}
		</div>
	</div>
</div>
