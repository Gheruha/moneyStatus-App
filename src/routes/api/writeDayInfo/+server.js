import { json } from '@sveltejs/kit';
import { mysqlConnectionFn } from '$lib/database/mysql.js';
import { formatDay } from '$lib/components/globalFunctions.js';
import { supabase } from '$lib/database/supabaseClient.js';

function generateId() {
	const randomString = Math.random().toString(36).substring(2, 15);
	return randomString + Math.random().toString(36).substring(2, 5);
}

const INSERT_MONEY =
	'insert into money(money_id , income , day_id , category) values(?  , ? , ? , ?)';
const grouped_results = new Map();
export async function POST({ request }) {
	// Necessary stuff for commiting the query
	const { income, today, category } = await request.json();
	let mysqlConnection = await mysqlConnectionFn();

	// Executing the query
	let results = await mysqlConnection.query(INSERT_MONEY, [generateId(), income, today, category]);
	return json(results);
}
