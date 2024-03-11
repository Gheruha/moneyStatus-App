import { json } from '@sveltejs/kit';
import { mysqlConnectionFn } from '$lib/database/mysql.js';

export async function POST({ request }) {
	const { day } = await request.json();
	const formatted_day = formatDay(day);
	let mysqlConnection = await mysqlConnectionFn();
	console.log(formatted_day);
	let results = await mysqlConnection
		.query("select * from money where day_id = '" + formatted_day + "'")
		.then(function ([rows, fields]) {
			return rows;
		});

	return json(results);
}

function formatDay(dateString) {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}
