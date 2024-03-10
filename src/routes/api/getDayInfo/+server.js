import { json } from '@sveltejs/kit';
import { mysqlConnectionFn } from '$lib/database/mysql.js';

export async function POST({ request }) {
	const { day } = await request.json();
	let mysqlConnection = await mysqlConnectionFn();
	let results = await mysqlConnection
		.query("select * from money where day_id = '" + day + "'")
		.then(function ([rows, fields]) {
			return rows;
		});

	return json(results);
}
