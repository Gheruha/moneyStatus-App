/* +page.server.js for Daily Page */
/* return grouped results (money data) & totals */

import { mysqlConnectionFn } from '$lib/database/mysql';
import { formatDay } from '$lib/components/formattingDay.js';

export async function load() {
	let mysqlConnection = await mysqlConnectionFn();

	// Get the selected month (already correctly calculated in your code)
	const [dayRows] = await mysqlConnection.query(
		'select * from selectedDate order by id desc limit 1'
	);
	const dayObj = dayRows[0];
	let selectedDate = new Date(dayObj.selected_date);
	const month = selectedDate.getMonth() + 1;
	const year = selectedDate.getFullYear();
	selectedDate = formatDay(selectedDate);

	// Retrieve only rows for the selected month
	const [moneyRows] = await mysqlConnection.query(
		'select * from money where month(day_id) = ? and year(day_id) = ? order by day_id desc',
		[month, year]
	);

	// Grouped results (by date)
	const grouped_results = new Map();
	moneyRows.forEach((row) => {
		const day_id = formatDay(row.day_id);
		const existing_result = grouped_results.get(day_id) || [];
		if (!existing_result.some((existing_entry) => existing_entry.money_id === row.money_id)) {
			existing_result.push(row);
		}
		grouped_results.set(day_id, existing_result);
	});

	// Total money (by month)
	const total_results = await mysqlConnection.query(
		'SELECT   SUM(CASE WHEN income IS NOT NULL THEN income ELSE 0 END) AS total_income,   SUM(CASE WHEN expense IS NOT NULL THEN expense ELSE 0 END) AS total_expense,   SUM(CASE WHEN income IS NOT NULL THEN income WHEN expense IS NOT NULL THEN -expense ELSE 0 END) AS total from money where month(day_id) = ? and year(day_id) = ?',
		[month, year] // Use the placeholder for the month here as well
	);

	// load return data
	return {
		data: grouped_results,
		total_data: total_results[0],
		the_date: selectedDate
	};
}
