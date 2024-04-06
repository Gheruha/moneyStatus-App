import { mysqlConnectionFn } from '$lib/database/mysql';
import { formatDay } from '$lib/components/formattingDay.js';

export async function load() {
	let mysqlConnection = await mysqlConnectionFn();

	// Get the selected month (already correctly calculated in your code)
	const [dayRows] = await mysqlConnection.query(
		'select * from selectedDate order by id desc limit 1'
	);
	const dayObj = dayRows[0];
	const selectedDate = new Date(dayObj.selected_date);
	const month = selectedDate.getMonth() + 1;

	// Retrieve only rows for the selected month
	const [moneyRows] = await mysqlConnection.query(
		'select * from money where month(day_id) = ? order by day_id desc',
		[month]
	);

	const grouped_results = new Map();
	moneyRows.forEach((row) => {
		const day_id = formatDay(row.day_id);
		const existing_result = grouped_results.get(day_id) || [];
		if (!existing_result.some((existing_entry) => existing_entry.money_id === row.money_id)) {
			existing_result.push(row);
		}
		grouped_results.set(day_id, existing_result);
	});

	const total_results = await mysqlConnection.query(
		'select sum(income) as total_income, sum(expense) as total_expense, sum(income) - sum(expense) as total from money where month(day_id) = ?',
		[month] // Use the placeholder for the month here as well
	);

	return {
		data: grouped_results,
		total_data: total_results[0] // Assuming total_results is an array with one row
	};
}
