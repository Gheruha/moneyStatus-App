import { json } from '@sveltejs/kit';
import { mysqlConnectionFn } from '$lib/database/mysql.js';

const DELETE_MONEY = 'delete from money where money_id = ?';

export async function POST({ request }) {
	const money_id = await request.json();
	let mysqlConnection = await mysqlConnectionFn();
	let results = await mysqlConnection.query(DELETE_MONEY, money_id);

	return json(results);
}
