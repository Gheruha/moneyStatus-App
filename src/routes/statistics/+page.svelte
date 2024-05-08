<script>
	// local data
	let width_income = 0;
	let width_expense = 0;
	let income_percent = 0;
	let expense_percent = 0;

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

<div class="w-4/5 h-full ml-auto flex flex-col pr-36 pl-36 pb-36 pt-36" />
