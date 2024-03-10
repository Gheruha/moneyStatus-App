import { json } from '@sveltejs/kit';
import { mysqlConnectionFn } from '$lib/database/mysql.js';

export async function POST({ request }) {
	const { income, expense, today, category } = await request.json();

	let mysqlConnection = await mysqlConnectionFn();
	let results = await mysqlConnection
		.query(
			"insert into money values('99' ," +
				income +
				',' +
				expense +
				", '" +
				today +
				"' , '" +
				category +
				"')"
		)
		.then(function ([rows, fields]) {
			return rows;
		});

	return json(results);
}
