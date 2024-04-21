import { json } from '@sveltejs/kit';
import { mysqlConnectionFn } from '$lib/database/mysql.js';
import { formatDay } from '$lib/components/formattingDay.js';

export async function POST({ request }) {
	const { day } = await request.json();
	const formatted_day = formatDay(day);
	const month = day.substring(5, 7);
	const year = day.substring(0, 5);

	let mysqlConnection = await mysqlConnectionFn();
	let results = await mysqlConnection
		.query(
			'select sum(case when income is not null then income else 0 end) as total_income,   sum(case when expense is not null then  expense else 0 end) as total_expense,  sum(case wehn income is not null then income when expense is not null then -expense else 0 end) as total from money where month(day_id) = ' +
				month +
				'and year(day_id) = ' +
				year
		)
		.then(function ([rows, fields]) {
			return rows;
		});

	return json(results);
}
