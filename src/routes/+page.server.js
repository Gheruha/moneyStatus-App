// @ts-nocheck
import { mysqlConnectionFn } from '../lib/database/mysql';

export async function load() {
	let mysqlConnection = await mysqlConnectionFn();

	try {
		let result = await mysqlConnection
			.query('select * from categories;')
			.then(function ([rows, fields]) {
				return rows;
			});

		return {
			data: result
		};
	} catch (error) {
		console.error('Database Server Error.');
		console.log('Database Server Error.');
		console.log(error);
	}
}
