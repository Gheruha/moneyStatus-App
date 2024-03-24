import { json } from '@sveltejs/kit';
import { mysqlConnectionFn } from '$lib/database/mysql.js';
import { formatDay } from '$lib/components/formattingDay.js';

export async function POST({ request }) {
	const { day } = await request.json();
	const formatted_day = formatDay(day);
	const month = day.substring(5, 7);
	let mysqlConnection = await mysqlConnectionFn();
	let results = await mysqlConnection
		.query('select * from money where month(day_id) = ' + month)
		.then(function ([rows, fields]) {
			const grouped_results = new Map();

			rows.forEach((row) => {
				const day_id = formatDay(row.day_id);
				const existing_result = grouped_results.get(day_id) || [];
				existing_result.push(row);
				grouped_results.set(day_id, existing_result);
			});

			const serialized_data = [];
			for (const [key, value] of grouped_results.entries()) {
				serialized_data.push({ day_id: key, data: value });
			}

			return serialized_data;
		});
	console.log(json(results));
	return json(results);
}
