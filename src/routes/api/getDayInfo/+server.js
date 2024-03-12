import { json } from '@sveltejs/kit';
import { mysqlConnectionFn } from '$lib/database/mysql.js';
import { formatDay } from '$lib/components/formattingDay.js';

export async function POST({ request }) {
	const { day } = await request.json();
	const formatted_day = formatDay(day);
	let mysqlConnection = await mysqlConnectionFn();
	let results = await mysqlConnection
		.query("select * from money where day_id = '" + formatted_day + "'")
		.then(function ([rows, fields]) {
			return rows;
		});

	return json(results);
}
