/* +page.server.js for Statistics Page */
/* return percentages , different useful data */

import { mysqlConnectionFn } from '$lib/database/mysql';
import { formatDay } from '$lib/components/formattingDay.js';

export async function load() {
	let mysqlConnection = await mysqlConnectionFn();

	// Get the last day(month)
	const [dayRows] = await mysqlConnection.query(
		'select * from selectedDate order by id desc limit 1'
	);
	const dayObj = dayRows[0];
	let selectedDate = new Date(dayObj.selected_date);
	const month = selectedDate.getMonth() + 1;
	const year = selectedDate.getFullYear();
	selectedDate = formatDay(selectedDate);

	// income & expenses percentage
	const percentage_results = await mysqlConnection.query(
		'SELECT ( SUM(CASE WHEN income IS NOT NULL THEN income ELSE 0 END) / SUM(CASE WHEN income IS NOT NULL THEN income WHEN expense IS NOT NULL THEN expense ELSE 0 END) ) * 100 AS income_percent, ( SUM(CASE WHEN expense IS NOT NULL THEN expense ELSE 0 END) / SUM(CASE WHEN income IS NOT NULL THEN income WHEN expense IS NOT NULL THEN expense ELSE 0 END) ) * 100 AS expense_percent FROM money WHERE month(day_id) = ? AND year(day_id) = ?;',
		[month, year]
	);

	return {
		data: percentage_results[0]
	};
}
