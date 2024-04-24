<script>
	export let data;
</script>

<div class="w-4/5 h-full ml-auto flex flex-col pl-36 pr-36 pb-36 pt-16">
	<div>
		<h1 class="text-4xl font-semibold">Statistics Page 📊</h1>
	</div>

	<div class="pt-36 pr-36 pl-36">
		<div
			class="p-6 border space-y-4 bg-slate-50 rounded-lg shadow-lg dark:bg-zinc-800 dark:border-zinc-600"
		>
			{#each data.data as percentages}
				<p class="text-blue-500">
					Income %: {percentages.income_percent !== null
						? percentages.income_percent.toFixed(2)
						: 'N/A'}
				</p>
				<div
					class="bg-blue-200 rounded-lg dark:bg-blue-200"
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
					class="bg-red-200 rounded-lg dark:bg-red-200"
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
