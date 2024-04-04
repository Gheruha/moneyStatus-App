import { mysqlConnectionFn } from '$lib/database/mysql';
import { formatDay } from '$lib/components/formattingDay.js';
const grouped_results = new Map();
export async function load() {
	let mysqlConnection = await mysqlConnectionFn();
	// const [dayRows] = await mysqlConnection.query(
	// 	'select * from selectedDate order by selected_date desc limit 1'
	// );
	// const dayObj = dayRows[0];
	// const day = String(dayObj.selected_date);
	// console.log(day);
	const day = '2024-04-01';
	const month = day.substring(5, 7);
	let results = await mysqlConnection
		.query('select * from money where month(day_id) = ' + month + ' order by day_id desc')
		.then(function ([rows, fields]) {
			rows.forEach((row) => {
				const day_id = formatDay(row.day_id);
				const existing_result = grouped_results.get(day_id) || [];
				if (!existing_result.some((existing_entry) => existing_entry.money_id === row.money_id)) {
					existing_result.push(row);
				}

				grouped_results.set(day_id, existing_result);
			});

			return grouped_results;
		});

	let total_results = await mysqlConnection
		.query(
			'select sum(income) as total_income , sum(expense) as total_expense , sum(income) - sum(expense) as total from money where month(day_id) = ' +
				month
		)
		.then(function ([rows, fields]) {
			return rows;
		});

	console.log(total_results);
	return {
		data: results,
		total_data: total_results
	};
}
