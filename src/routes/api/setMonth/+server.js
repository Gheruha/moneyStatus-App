import { json } from '@sveltejs/kit';
import { mysqlConnectionFn } from '$lib/database/mysql.js';

const INSERT_DATE = 'insert into selectedDate(selected_date) values (?)';

export async function POST({ request }) {
	const date = await request.json();
	let mysqlConnection = await mysqlConnectionFn();

	let insert_date_results = await mysqlConnection.query(INSERT_DATE, date);

	return json(insert_date_results);
}
