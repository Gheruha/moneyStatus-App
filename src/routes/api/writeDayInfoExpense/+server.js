import { json } from '@sveltejs/kit';
import { mysqlConnectionFn } from '$lib/database/mysql.js';

function generateId() {
	const randomString = Math.random().toString(36).substring(2, 15);
	return randomString + Math.random().toString(36).substring(2, 5);
}

const INSERT_MONEY =
	'insert into money(money_id , expense , day_id , category) values(?  , ? , ? , ?)';

export async function POST({ request }) {
	// Necessary stuff for commiting the query
	const { expense, today, category } = await request.json();
	let mysqlConnection = await mysqlConnectionFn();

	// Executing the query
	let results = await mysqlConnection.query(INSERT_MONEY, [generateId(), expense, today, category]);
	return json(results);
}