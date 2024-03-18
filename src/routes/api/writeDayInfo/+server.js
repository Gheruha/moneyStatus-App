import { json } from '@sveltejs/kit';
import { mysqlConnectionFn } from '$lib/database/mysql.js';

function generateId() {
	const randomString = Math.random().toString(36).substring(2, 15);
	return randomString + Math.random().toString(36).substring(2, 5);
}

const INSERT_MONEY = 'insert into money values(? , ? , ? , ? , ?)';
const SEE_IF_THERE_DAY = 'select count(day_id) from days where day_id = ?';
const INSERT_DAY = 'insert into days(day_id) values(?)';

export async function POST({ request }) {
	// Necessary stuff for commiting the query
	const { income, expense, today, category } = await request.json();
	let mysqlConnection = await mysqlConnectionFn();
	await mysqlConnection.beginTransaction();

	// Necessary stuff to see if there is a day_id in the days table
	let existDay = await mysqlConnection.query(SEE_IF_THERE_DAY, [today]);
	const first_element = existDay[0];
	const count_object = first_element[0];
	const count_value = count_object['count(day_id)'];

	if (count_value == 0) {
		await mysqlConnection.query(INSERT_DAY, [today]);
	}

	// Executing the query
	let results = await mysqlConnection.query(INSERT_MONEY, [
		generateId(),
		income,
		expense,
		today,
		category
	]);

	return json(results);
}
